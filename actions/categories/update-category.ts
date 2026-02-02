"use server";

import { createClient } from "@/supabase/server";
import { revalidatePath } from "next/cache";
import {
  updateCategorySchema,
  UpdateCategoryInput,
} from "@/app/validations/category";

export async function updateCategory(input: UpdateCategoryInput) {
  const result = updateCategorySchema.safeParse(input);

  if (!result.success) {
    return {
      success: false,
      error: "Geçersiz veri girişi",
    };
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return {
      success: false,
      error: "Yetkisiz işlem. Lütfen giriş yapın.",
    };
  }

  // Slug değiştiyse unique kontrolü
  const { data: existing } = await supabase
    .from("categories")
    .select("id")
    .eq("slug", input.slug)
    .neq("id", input.id) // Kendisi hariç
    .single();

  if (existing) {
    return {
      success: false,
      error: "Bu URL (slug) zaten kullanımda.",
    };
  }

  const { error } = await supabase
    .from("categories")
    .update({
      name: input.name,
      slug: input.slug,
      description: input.description,
      image_url: input.image_url,
      seo_title: input.seo_title,
      seo_description: input.seo_description,
      updated_at: new Date().toISOString(),
    })
    .eq("id", input.id);

  if (error) {
    return {
      success: false,
      error: error.message,
    };
  }

  revalidatePath("/dashboard/categories");

  return {
    success: true,
  };
}
