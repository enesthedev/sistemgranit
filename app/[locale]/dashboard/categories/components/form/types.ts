import { Category } from "@/types/category";

export interface CategoryFormValues {
  id?: string;
  name: string;
  slug: string;
  description: string;
  image_url: string;
  seo_title: string;
  seo_description: string;
}

export interface CategoryFormProps {
  category?: Category;
  mode: "create" | "edit";
}
