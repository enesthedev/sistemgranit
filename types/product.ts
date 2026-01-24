export type {
  ProductCategory,
  ProductStatus,
  ProductPattern,
  ProductFinish,
  ProductApplication,
  Product,
  ProductInsert,
  ProductUpdate,
} from "@/supabase/types";

export interface ProductFilters {
  category?: string;
  status?: string;
  search?: string;
  origin_country?: string;
  pattern?: string;
  applications?: string[];
}
