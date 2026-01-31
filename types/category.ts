import { Tables } from "@/supabase/types";

export type Category = Tables<"categories">;

export interface CategoryInsert extends Partial<Category> {
  name: string;
  slug: string;
}

export interface CategoryUpdate extends Partial<Category> {
  id: string;
}
