import type { SupabaseClient } from "@supabase/supabase-js";
export type {
  Database,
  Tables,
  TablesInsert,
  TablesUpdate,
  Enums,
} from "./database.types";
import type { Database } from "./database.types";

export type TypedSupabaseClient = SupabaseClient<Database>;

export type ProductCategory = Database["public"]["Enums"]["product_category"];
export type ProductStatus = Database["public"]["Enums"]["product_status"];
export type ProductPattern = Database["public"]["Enums"]["product_pattern"];
export type ProductFinish = Database["public"]["Enums"]["product_finish"];
export type ProductApplication =
  Database["public"]["Enums"]["product_application"];

export type Product = Database["public"]["Tables"]["products"]["Row"];
export type ProductInsert = Database["public"]["Tables"]["products"]["Insert"];
export type ProductUpdate = Database["public"]["Tables"]["products"]["Update"];

export type Category = Database["public"]["Tables"]["categories"]["Row"];
export type CategoryInsert =
  Database["public"]["Tables"]["categories"]["Insert"];
export type CategoryUpdate =
  Database["public"]["Tables"]["categories"]["Update"];
