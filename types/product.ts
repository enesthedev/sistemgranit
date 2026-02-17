// Mock types or use inferred Drizzle types to decouple from Supabase
// Ideally, we import these from a central Drizzle schema definition type file

export type ProductCategory =
  | "marble"
  | "granite"
  | "travertine"
  | "onyx"
  | "limestone"
  | "quartzite";
export type ProductStatus = "active" | "draft" | "archived";
export type ProductPattern =
  | "veined"
  | "speckled"
  | "uniform"
  | "cloudy"
  | "flowery"
  | "layered";
export type ProductFinish =
  | "polished"
  | "honed"
  | "brushed"
  | "flamed"
  | "tumbled"
  | "sandblasted"
  | "leathered";
export type ProductApplication =
  | "flooring"
  | "wall_cladding"
  | "countertops"
  | "stairs"
  | "bathroom"
  | "outdoor"
  | "pool"
  | "fireplace";

import type { Category } from "./category";

// export interface Category { ... } removed

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  category: ProductCategory; // Deprecated enum column in DB, but type exists
  category_id: string;
  status: ProductStatus;
  price_per_sqm: number | null;
  currency: "TRY" | "USD" | "EUR";
  thumbnail: string | null;
  images: string[] | null;
  origin_country: string | null;
  origin_region: string | null;
  color_primary: string | null;
  color_secondary: string | null;
  pattern: ProductPattern | null;
  finish_types: ProductFinish[] | null;
  density: number | null;
  water_absorption: number | null;
  compressive_strength: number | null;
  flexural_strength: number | null;
  abrasion_resistance: string | null;
  hardness_mohs: number | null;
  frost_resistant: boolean | null;
  available_thicknesses: number[] | null;
  max_slab_width: number | null;
  max_slab_length: number | null;
  min_order_quantity: number | null;
  applications: ProductApplication[] | null;
  is_suitable_for_exterior: boolean | null;
  is_suitable_for_kitchen: boolean | null;
  seo_title: string | null;
  seo_description: string | null;
  tags: string[] | null;
  created_at: string;
  updated_at: string;
  created_by: string | null;
}

export interface ProductFilters {
  category?: string | string[];
  status?: string | string[];
  search?: string;
  origin_country?: string;
  pattern?: string;
  applications?: string[];
}

export type ProductWithCategory = Product & {
  categories: Category | null;
};
