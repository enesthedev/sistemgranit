import { Category } from "@/types/category";

import { z } from "zod";
import { categorySchema } from "@/app/validations/category";

export type CategoryFormValues = z.infer<typeof categorySchema> & {
  id?: string;
};

export interface CategoryFormProps {
  category?: Category;
  mode: "create" | "edit";
}
