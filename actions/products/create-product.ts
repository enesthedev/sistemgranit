"use server";

import { createClient } from "@/supabase/server";
import { createProductSchema } from "@/app/validations/product";
import { generateUniqueSlug } from "@/app/utils/slug";
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
        category: validatedData.category || "marble", // Fallback for legacy enum
        category_id: validatedData.category_id,
        status: validatedData.status,
        price_per_sqm: validatedData.price_per_sqm || null,
        currency: validatedData.currency,
        thumbnail: validatedData.thumbnail || null,
        images: validatedData.images,
        created_by: user.id,
        // Add other fields that were missing or needed mapping if any
        origin_country: validatedData.origin_country,
        origin_region: validatedData.origin_region,
        color_primary: validatedData.color_primary,
        color_secondary: validatedData.color_secondary,
        pattern: validatedData.pattern,
        finish_types: validatedData.finish_types,
        density: validatedData.density,
        water_absorption: validatedData.water_absorption,
        compressive_strength: validatedData.compressive_strength,
        flexural_strength: validatedData.flexural_strength,
        abrasion_resistance: validatedData.abrasion_resistance,
        hardness_mohs: validatedData.hardness_mohs,
        frost_resistant: validatedData.frost_resistant,
        available_thicknesses: validatedData.available_thicknesses,
        max_slab_width: validatedData.max_slab_width,
        max_slab_length: validatedData.max_slab_length,
        min_order_quantity: validatedData.min_order_quantity,
        applications: validatedData.applications,
        is_suitable_for_exterior: validatedData.is_suitable_for_exterior,
        is_suitable_for_kitchen: validatedData.is_suitable_for_kitchen,
        seo_title: validatedData.seo_title,
        seo_description: validatedData.seo_description,
        tags: validatedData.tags,
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
