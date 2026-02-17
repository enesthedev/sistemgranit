import { z } from "zod";

// ============================================================================
// AUTH SCHEMAS
// ============================================================================

export const authSchemas = {
  signIn: z.object({
    email: z
      .string()
      .email("Geçerli bir e-posta adresi girin")
      .min(1, "E-posta adresi zorunludur"),
    password: z
      .string()
      .min(6, "Şifre en az 6 karakter olmalı")
      .min(1, "Şifre zorunludur"),
  }),

  signup: z
    .object({
      fullName: z
        .string()
        .min(2, "Ad Soyad en az 2 karakter olmalı")
        .min(1, "Ad Soyad zorunludur"),
      email: z
        .string()
        .email("Geçerli bir e-posta adresi girin")
        .min(1, "E-posta adresi zorunludur"),
      password: z
        .string()
        .min(8, "Şifre en az 8 karakter olmalı")
        .min(1, "Şifre zorunludur"),
      repeatPassword: z.string().min(1, "Şifre tekrarı zorunludur"),
    })
    .refine((data) => data.password === data.repeatPassword, {
      message: "Şifreler eşleşmiyor",
      path: ["repeatPassword"],
    }),

  updatePassword: z
    .object({
      currentPassword: z.string().min(1, "Mevcut şifre zorunludur"),
      newPassword: z
        .string()
        .min(8, "Yeni şifre en az 8 karakter olmalı")
        .min(1, "Yeni şifre zorunludur"),
      repeatPassword: z.string().min(1, "Şifre tekrarı zorunludur"),
    })
    .refine((data) => data.newPassword === data.repeatPassword, {
      message: "Şifreler eşleşmiyor",
      path: ["repeatPassword"],
    }),
};

// ============================================================================
// PRODUCT SCHEMAS
// ============================================================================

const categoryEnums = [
  "marble",
  "granite",
  "travertine",
  "onyx",
  "limestone",
  "quartzite",
] as const;

const statusEnums = ["active", "draft", "archived"] as const;

const patternEnums = [
  "veined",
  "speckled",
  "uniform",
  "cloudy",
  "flowery",
  "layered",
] as const;

const finishEnums = [
  "polished",
  "honed",
  "brushed",
  "flamed",
  "tumbled",
  "sandblasted",
  "leathered",
] as const;

const applicationEnums = [
  "flooring",
  "wall_cladding",
  "countertops",
  "stairs",
  "bathroom",
  "outdoor",
  "pool",
  "fireplace",
] as const;

const currencyEnums = ["TRY", "USD", "EUR"] as const;

export const productSchemas = {
  create: z.object({
    name: z
      .string()
      .min(2, "Ürün adı en az 2 karakter olmalı")
      .max(255, "Ürün adı en fazla 255 karakter olabilir"),
    description: z
      .string()
      .max(5000, "Açıklama en fazla 5000 karakter olabilir")
      .nullable()
      .optional(),
    category: z.enum(categoryEnums).optional(),
    category_id: z.string().uuid("Geçersiz kategori seçimi"),
    status: z.enum(statusEnums, { message: "Geçersiz durum" }).default("draft"),
    price_per_sqm: z
      .number()
      .min(0, "Fiyat 0'dan küçük olamaz")
      .nullable()
      .optional(),
    currency: z
      .enum(currencyEnums, { message: "Geçersiz para birimi" })
      .default("TRY"),
    thumbnail: z.string().url("Geçersiz URL").nullable().optional(),
    images: z.array(z.string().url("Geçersiz URL")).default([]),

    origin_country: z.string().max(100).nullable().optional(),
    origin_region: z.string().max(100).nullable().optional(),
    color_primary: z.string().max(50).nullable().optional(),
    color_secondary: z.string().max(50).nullable().optional(),
    pattern: z.enum(patternEnums).nullable().optional(),
    finish_types: z.array(z.enum(finishEnums)).default([]),

    density: z.number().min(0).nullable().optional(),
    water_absorption: z.number().min(0).max(100).nullable().optional(),
    compressive_strength: z.number().min(0).nullable().optional(),
    flexural_strength: z.number().min(0).nullable().optional(),
    abrasion_resistance: z.string().max(50).nullable().optional(),
    hardness_mohs: z.number().min(1).max(10).nullable().optional(),
    frost_resistant: z.boolean().default(false),

    available_thicknesses: z.array(z.number().min(0)).default([]),
    max_slab_width: z.number().min(0).nullable().optional(),
    max_slab_length: z.number().min(0).nullable().optional(),
    min_order_quantity: z.number().int().min(1).default(1),

    applications: z.array(z.enum(applicationEnums)).default([]),
    is_suitable_for_exterior: z.boolean().default(false),
    is_suitable_for_kitchen: z.boolean().default(false),
    seo_title: z.string().max(255).nullable().optional(),
    seo_description: z.string().max(500).nullable().optional(),
    tags: z.array(z.string()).default([]),
  }),

  update: z.object({
    id: z.string().uuid("Geçersiz ürün ID"),
    name: z
      .string()
      .min(2, "Ürün adı en az 2 karakter olmalı")
      .max(255, "Ürün adı en fazla 255 karakter olabilir")
      .optional(),
    description: z.string().max(5000).nullable().optional(),
    category: z.enum(categoryEnums).optional(),
    category_id: z.string().uuid("Geçersiz kategori seçimi").optional(),
    status: z.enum(statusEnums).optional(),
    price_per_sqm: z.number().min(0).nullable().optional(),
    currency: z.enum(currencyEnums).optional(),
    thumbnail: z.string().url().nullable().optional(),
    images: z.array(z.string().url()).optional(),

    origin_country: z.string().max(100).nullable().optional(),
    origin_region: z.string().max(100).nullable().optional(),
    color_primary: z.string().max(50).nullable().optional(),
    color_secondary: z.string().max(50).nullable().optional(),
    pattern: z.enum(patternEnums).nullable().optional(),
    finish_types: z.array(z.enum(finishEnums)).optional(),

    density: z.number().min(0).nullable().optional(),
    water_absorption: z.number().min(0).max(100).nullable().optional(),
    compressive_strength: z.number().min(0).nullable().optional(),
    flexural_strength: z.number().min(0).nullable().optional(),
    abrasion_resistance: z.string().max(50).nullable().optional(),
    hardness_mohs: z.number().min(1).max(10).nullable().optional(),
    frost_resistant: z.boolean().optional(),

    available_thicknesses: z.array(z.number().min(0)).optional(),
    max_slab_width: z.number().min(0).nullable().optional(),
    max_slab_length: z.number().min(0).nullable().optional(),
    min_order_quantity: z.number().int().min(1).optional(),

    applications: z.array(z.enum(applicationEnums)).optional(),
    is_suitable_for_exterior: z.boolean().optional(),
    is_suitable_for_kitchen: z.boolean().optional(),
    seo_title: z.string().max(255).nullable().optional(),
    seo_description: z.string().max(500).nullable().optional(),
    tags: z.array(z.string()).optional(),
  }),
};

// ============================================================================
// CATEGORY SCHEMAS
// ============================================================================

export const categorySchemas = {
  create: z.object({
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
  }),

  update: z.object({
    id: z.string().uuid("Geçersiz Kategori ID"),
    name: z.string().min(2, "En az 2 karakter").max(255).optional(),
    slug: z
      .string()
      .regex(
        /^[a-z0-9-]+$/,
        "Sadece küçük harf, rakam ve tire (-) kullanılabilir",
      )
      .optional(),
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
  }),
};

// ============================================================================
// TYPE INFERENCE
// ============================================================================

export type SignInInput = z.infer<typeof authSchemas.signIn>;
export type SignUpInput = z.infer<typeof authSchemas.signup>;
export type UpdatePasswordInput = z.infer<typeof authSchemas.updatePassword>;

export type CreateProductInput = z.infer<typeof productSchemas.create>;
export type UpdateProductInput = z.infer<typeof productSchemas.update>;

export type CreateCategoryInput = z.infer<typeof categorySchemas.create>;
export type UpdateCategoryInput = z.infer<typeof categorySchemas.update>;
