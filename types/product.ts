import {
  Product,
  ProductCategory,
  ProductStatus,
  ProductPattern,
  ProductFinish,
  ProductApplication,
  ProductInsert,
  ProductUpdate,
  Category,
} from "@/supabase/types";

export type {
  ProductCategory,
  ProductStatus,
  ProductPattern,
  ProductFinish,
  ProductApplication,
  Product,
  ProductInsert,
  ProductUpdate,
};

export interface ProductFilters {
  category?: string;
  status?: string;
  search?: string;
  origin_country?: string;
  pattern?: string;
  applications?: string[];
}

export type ProductWithCategory = Product & {
  categories: Category | null;
};
