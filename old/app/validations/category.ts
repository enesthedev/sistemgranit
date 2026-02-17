import { z } from "zod";

export const categorySchema = z.object({
  name: z
    .string()
    .min(2, "En az 2 karakter")
    .max(255)
    .min(1, "Kategori adı zorunludur"),
  slug: z
    .string()
    .min(1, "URL (Slug) zorunludur")
    .regex(
      /^[a-z0-9-]+$/,
      "Sadece küçük harf, rakam ve tire (-) kullanılabilir",
    ),
  description: z.string().nullable().optional(),
  image_url: z.string().nullable().optional(),
  seo_title: z
    .string()
    .max(70, "SEO başlığı 70 karakterden fazla olamaz")
    .nullable()
    .optional(),
  seo_description: z
    .string()
    .max(160, "SEO açıklaması 160 karakterden fazla olamaz")
    .nullable()
    .optional(),
});

export const updateCategorySchema = categorySchema.extend({
  id: z.string().uuid("Geçersiz Kategori ID"),
});

export type CategoryFormValues = z.infer<typeof categorySchema>;
export type UpdateCategoryInput = z.infer<typeof updateCategorySchema>;
