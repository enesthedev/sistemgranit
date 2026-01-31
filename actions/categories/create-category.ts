"use server";

import { createClient } from "@/supabase/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const createCategorySchema = z.object({
  name: z.string().min(2, "Kategori adı en az 2 karakter olmalıdır"),
  slug: z.string().min(2, "Slug en az 2 karakter olmalıdır"),
  description: z.string().optional().nullable(),
  image_url: z.string().optional().nullable(),
  seo_title: z.string().optional().nullable(),
  seo_description: z.string().optional().nullable(),
});

export type CreateCategoryInput = z.infer<typeof createCategorySchema>;

export async function createCategory(input: CreateCategoryInput) {
  const result = createCategorySchema.safeParse(input);

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

  // Check unique slug manually just to be safe (DB also has unique constraint)
  const { data: existing } = await supabase
    .from("categories")
    .select("id")
    .eq("slug", input.slug)
    .single();

  if (existing) {
    return {
      success: false,
      error: "Bu URL (slug) zaten kullanımda.",
    };
  }

  const { error } = await supabase.from("categories").insert({
    name: input.name,
    slug: input.slug,
    description: input.description,
    image_url: input.image_url,
    seo_title: input.seo_title,
    seo_description: input.seo_description,
  });

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
