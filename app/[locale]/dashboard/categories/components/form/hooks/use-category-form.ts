"use client";

import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { createCategory, updateCategory } from "@/actions/categories";
import { Category } from "@/types/category";
import { CategoryFormValues } from "../types";

interface UseCategoryFormOptionsProps {
  category?: Category;
  mode: "create" | "edit";
}

export function useCategoryForm({
  category,
  mode,
}: UseCategoryFormOptionsProps) {
  const router = useRouter();
  const isEditing = mode === "edit" && !!category;

  const handleSubmit = useCallback(
    async (values: CategoryFormValues) => {
      try {
        const submitData = {
          name: values.name,
          slug: values.slug,
          description: values.description || null,
          image_url: values.image_url || null,
          seo_title: values.seo_title || null,
          seo_description: values.seo_description || null,
        };

        if (isEditing && category) {
          const result = await updateCategory({
            id: category.id,
            ...submitData,
          });
          if (!result.success) {
            toast.error(result.error || "Kategori güncellenemedi");
            return;
          }
          toast.success("Kategori başarıyla güncellendi");
        } else {
          const result = await createCategory(submitData);
          if (!result.success) {
            toast.error(result.error || "Kategori oluşturulamadı");
            return;
          }
          toast.success("Kategori başarıyla oluşturuldu");
        }

        router.push("/dashboard/categories");
        router.refresh();
      } catch (error) {
        toast.error("Bir hata oluştu");
        console.error(error);
      }
    },
    [isEditing, category, router],
  );

  return {
    handleSubmit,
    isEditing,
  };
}
