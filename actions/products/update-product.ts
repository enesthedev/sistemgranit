"use server";

import { createClient } from "@/supabase/server";
import { updateProductSchema } from "@/lib/validations/product";
import { generateUniqueSlug } from "@/lib/utils/slug";
import { revalidatePath } from "next/cache";

interface ActionResult {
  success: boolean;
  data?: { slug: string };
  error?: string;
}

export async function updateProduct(input: unknown): Promise<ActionResult> {
  try {
    const supabase = await createClient();

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();
    if (authError || !user) {
      return { success: false, error: "Yetkilendirme gerekli" };
    }

    const validation = updateProductSchema.safeParse(input);
    if (!validation.success) {
      return {
        success: false,
        error: validation.error.issues[0]?.message || "Geçersiz veri",
      };
    }

    const { id, ...updateData } = validation.data;

    const { data: existing, error: fetchError } = await supabase
      .from("products")
      .select("id, name, slug, created_by")
      .eq("id", id)
      .single();

    if (fetchError || !existing) {
      return { success: false, error: "Ürün bulunamadı" };
    }

    let newSlug = existing.slug;
    if (updateData.name && updateData.name !== existing.name) {
      newSlug = await generateUniqueSlug(supabase, updateData.name, id);

      await supabase.from("slug_history").insert({
        product_id: id,
        old_slug: existing.slug,
        new_slug: newSlug,
      });
    }

    const { error } = await supabase
      .from("products")
      .update({ ...updateData, slug: newSlug })
      .eq("id", id);

    if (error) {
      console.error("Update product error:", error);
      return { success: false, error: "Ürün güncellenemedi" };
    }

    revalidatePath("/dashboard/products");
    revalidatePath(`/dashboard/products/${id}`);
    revalidatePath(`/dashboard/products/${newSlug}`);
    revalidatePath("/products");
    revalidatePath(`/products/${newSlug}`);

    return { success: true, data: { slug: newSlug } };
  } catch (error) {
    console.error("Update product error:", error);
    return { success: false, error: "Beklenmeyen bir hata oluştu" };
  }
}
