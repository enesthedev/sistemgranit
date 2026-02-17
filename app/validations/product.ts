import { z } from "zod";

const categories = [
  "marble",
  "granite",
  "travertine",
  "onyx",
  "limestone",
  "quartzite",
] as const;

const statuses = ["active", "draft", "archived"] as const;

const patterns = [
  "veined",
  "speckled",
  "uniform",
  "cloudy",
  "flowery",
  "layered",
] as const;

const finishes = [
  "polished",
  "honed",
  "brushed",
  "flamed",
  "tumbled",
  "sandblasted",
  "leathered",
] as const;

const applications = [
  "flooring",
  "wall_cladding",
  "countertops",
  "stairs",
  "bathroom",
  "outdoor",
  "pool",
  "fireplace",
] as const;

const currencies = ["TRY", "USD", "EUR"] as const;

export const createProductSchema = z.object({
  name: z
    .string()
    .min(2, "Ürün adı en az 2 karakter olmalı")
    .max(255, "Ürün adı en fazla 255 karakter olabilir"),
  description: z
    .string()
    .max(5000, "Açıklama en fazla 5000 karakter olabilir")
    .nullable()
    .optional(),
  category: z.enum(categories).optional(),
  category_id: z.string().uuid("Geçersiz kategori seçimi"),
  status: z.enum(statuses, { message: "Geçersiz durum" }).default("draft"),
  price_per_sqm: z
    .number()
    .min(0, "Fiyat 0'dan küçük olamaz")
    .nullable()
    .optional(),
  currency: z
    .enum(currencies, { message: "Geçersiz para birimi" })
    .default("TRY"),
  thumbnail: z.string().url("Geçersiz URL").nullable().optional(),
  images: z.array(z.string().url("Geçersiz URL")).default([]),

  origin_country: z.string().max(100).nullable().optional(),
  origin_region: z.string().max(100).nullable().optional(),
  color_primary: z.string().max(50).nullable().optional(),
  color_secondary: z.string().max(50).nullable().optional(),
  pattern: z.enum(patterns).nullable().optional(),
  finish_types: z.array(z.enum(finishes)).default([]),

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

  applications: z.array(z.enum(applications)).default([]),
  is_suitable_for_exterior: z.boolean().default(false),
  is_suitable_for_kitchen: z.boolean().default(false),
  seo_title: z.string().max(255).nullable().optional(),
  seo_description: z.string().max(500).nullable().optional(),
  tags: z.array(z.string()).default([]),
});

export const updateProductSchema = z.object({
  id: z.string().uuid("Geçersiz ürün ID"),
  name: z
    .string()
    .min(2, "Ürün adı en az 2 karakter olmalı")
    .max(255, "Ürün adı en fazla 255 karakter olabilir")
    .optional(),
  description: z.string().max(5000).nullable().optional(),
  category: z.enum(categories).optional(),
  category_id: z.string().uuid("Geçersiz kategori seçimi").optional(),
  status: z.enum(statuses).optional(),
  price_per_sqm: z.number().min(0).nullable().optional(),
  currency: z.enum(currencies).optional(),
  thumbnail: z.string().url().nullable().optional(),
  images: z.array(z.string().url()).optional(),

  origin_country: z.string().max(100).nullable().optional(),
  origin_region: z.string().max(100).nullable().optional(),
  color_primary: z.string().max(50).nullable().optional(),
  color_secondary: z.string().max(50).nullable().optional(),
  pattern: z.enum(patterns).nullable().optional(),
  finish_types: z.array(z.enum(finishes)).optional(),

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

  applications: z.array(z.enum(applications)).optional(),
  is_suitable_for_exterior: z.boolean().optional(),
  is_suitable_for_kitchen: z.boolean().optional(),
  seo_title: z.string().max(255).nullable().optional(),
  seo_description: z.string().max(500).nullable().optional(),
  tags: z.array(z.string()).optional(),
});

export type CreateProductInput = z.infer<typeof createProductSchema>;
export type UpdateProductInput = z.infer<typeof updateProductSchema>;
