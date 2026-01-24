"use server";

import { createClient } from "@/supabase/server";
import { createProductSchema } from "@/lib/validations/product";
import { generateUniqueSlug } from "@/lib/utils/slug";
import { revalidatePath } from "next/cache";

interface ActionResult {
  success: boolean;
  data?: { id: string; slug: string };
  error?: string;
}

export async function createProduct(input: unknown): Promise<ActionResult> {
  try {
    const supabase = await createClient();

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();
    if (authError || !user) {
      return { success: false, error: "Yetkilendirme gerekli" };
    }

    const validation = createProductSchema.safeParse(input);
    if (!validation.success) {
      return {
        success: false,
        error: validation.error.issues[0]?.message || "Geçersiz veri",
      };
    }

    const validatedData = validation.data;

    const slug = await generateUniqueSlug(supabase, validatedData.name);

    const { data, error } = await supabase
      .from("products")
      .insert({
        name: validatedData.name,
        slug,
        description: validatedData.description || null,
        category: validatedData.category,
        status: validatedData.status,
        price_per_sqm: validatedData.price_per_sqm || null,
        currency: validatedData.currency,
        thumbnail: validatedData.thumbnail || null,
        images: validatedData.images,
        created_by: user.id,
      })
      .select("id, slug")
      .single();

    if (error) {
      console.error("Create product error:", error);
      return { success: false, error: "Ürün oluşturulamadı" };
    }

    revalidatePath("/dashboard/products");
    revalidatePath("/products");

    return { success: true, data: { id: data.id, slug: data.slug } };
  } catch (error) {
    console.error("Create product error:", error);
    return { success: false, error: "Beklenmeyen bir hata oluştu" };
  }
}
