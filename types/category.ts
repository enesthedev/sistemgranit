import {
  Category,
  CategoryInsert as DbCategoryInsert,
  CategoryUpdate as DbCategoryUpdate,
} from "@/supabase/types";

export type { Category };

export interface CategoryInsert extends DbCategoryInsert {
  name: string;
  slug: string;
}

export interface CategoryUpdate extends DbCategoryUpdate {
  id: string;
}
