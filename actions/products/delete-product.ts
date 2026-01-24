"use server";

import { createClient } from "@/supabase/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const deleteProductSchema = z.object({
  id: z.string().uuid(),
});

interface ActionResult {
  success: boolean;
  error?: string;
}

export async function deleteProduct(id: string): Promise<ActionResult> {
  try {
    const supabase = await createClient();

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();
    if (authError || !user) {
      return { success: false, error: "Yetkilendirme gerekli" };
    }

    const validation = deleteProductSchema.safeParse({ id });
    if (!validation.success) {
      return { success: false, error: "Geçersiz ürün ID" };
    }

    const { data: product, error: fetchError } = await supabase
      .from("products")
      .select("id, images, thumbnail")
      .eq("id", id)
      .single();

    if (fetchError || !product) {
      return { success: false, error: "Ürün bulunamadı" };
    }

    const imagesToDelete = [...(product.images || [])];
    if (product.thumbnail) {
      imagesToDelete.push(product.thumbnail);
    }

    if (imagesToDelete.length > 0) {
      const filePaths = imagesToDelete
        .map((url) => {
          try {
            const urlObj = new URL(url);
            const parts = urlObj.pathname.split(
              "/storage/v1/object/public/products/",
            );
            return parts.length === 2 ? parts[1] : null;
          } catch {
            return null;
          }
        })
        .filter(Boolean) as string[];

      if (filePaths.length > 0) {
        await supabase.storage.from("products").remove(filePaths);
      }
    }

    const { error } = await supabase.from("products").delete().eq("id", id);

    if (error) {
      console.error("Delete product error:", error);
      return { success: false, error: "Ürün silinemedi" };
    }

    revalidatePath("/dashboard/products");
    revalidatePath("/products");

    return { success: true };
  } catch (error) {
    console.error("Delete product error:", error);
    return { success: false, error: "Beklenmeyen bir hata oluştu" };
  }
}
