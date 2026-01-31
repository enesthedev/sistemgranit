import {
  Product,
  ProductCategory,
  ProductStatus,
  ProductPattern,
  ProductFinish,
  ProductApplication,
  ProductInsert,
  ProductUpdate,
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
// Extend Product to include the joined categories table
import { Database } from "@/supabase/database.types";
export type Category = Database["public"]["Tables"]["categories"]["Row"];

export type ProductWithCategory = Product & {
  categories: Category | null;
};
