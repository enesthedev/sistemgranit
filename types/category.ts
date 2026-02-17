export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  image_url: string | null;
  seo_title: string | null;
  seo_description: string | null;
  created_at: string;
  updated_at: string;
}

export type CategoryInsert = Omit<Category, "id" | "created_at" | "updated_at">;
export type CategoryUpdate = Partial<CategoryInsert> & { id: string };
