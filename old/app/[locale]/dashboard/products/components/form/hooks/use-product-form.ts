"use client";

import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { FormikHelpers } from "formik";
import { toast } from "sonner";
import { createProduct, updateProduct } from "@/actions/products";
import { ROUTES } from "@/app/routes";
import type { Product } from "@/types/product";
import type { FormValues } from "../types";

interface UseProductFormOptions {
  product?: Product;
  mode: "create" | "edit";
}

interface UseProductFormReturn {
  handleSubmit: (
    values: FormValues,
    formikHelpers: FormikHelpers<FormValues>,
  ) => Promise<void>;
  isEditing: boolean;
}

export function useProductForm({
  product,
  mode,
}: UseProductFormOptions): UseProductFormReturn {
  const router = useRouter();
  const isEditing = mode === "edit" && !!product;

  const handleSubmit = useCallback(
    async (
      values: FormValues,
      { setSubmitting }: FormikHelpers<FormValues>,
    ) => {
      try {
        const submitData = {
          name: values.name,
          description: values.description || null,
          category: undefined, // Legacy enum, we use category_id now
          category_id: values.category_id, // Map the selected UUID to category_id
          status: values.status,
          price_per_sqm: values.price_per_sqm,
          currency: values.currency,
          thumbnail: values.thumbnail || null,
          images: values.images,
          origin_country: values.origin_country || null,
          origin_region: values.origin_region || null,
          color_primary: values.color_primary || null,
          color_secondary: values.color_secondary || null,
          pattern: values.pattern || null,
          finish_types: values.finish_types,
          density: values.density,
          water_absorption: values.water_absorption,
          compressive_strength: values.compressive_strength,
          flexural_strength: values.flexural_strength,
          abrasion_resistance: values.abrasion_resistance || null,
          hardness_mohs: values.hardness_mohs,
          frost_resistant: values.frost_resistant,
          available_thicknesses: values.available_thicknesses,
          max_slab_width: values.max_slab_width,
          max_slab_length: values.max_slab_length,
          min_order_quantity: values.min_order_quantity || 1,
          applications: values.applications,
          is_suitable_for_exterior: values.is_suitable_for_exterior,
          is_suitable_for_kitchen: values.is_suitable_for_kitchen,
          seo_title: values.seo_title || null,
          seo_description: values.seo_description || null,
          tags: values.tags,
        };

        if (isEditing && product) {
          const result = await updateProduct({ id: product.id, ...submitData });
          if (!result.success) {
            toast.error(result.error || "Ürün güncellenemedi");
            return;
          }
          toast.success("Ürün başarıyla güncellendi");
        } else {
          const result = await createProduct(submitData);
          if (!result.success) {
            toast.error(result.error || "Ürün oluşturulamadı");
            return;
          }
          toast.success("Ürün başarıyla oluşturuldu");
        }
        router.push(ROUTES.PRODUCTS.LIST);
        router.refresh();
      } catch {
        toast.error("Bir hata oluştu");
      } finally {
        setSubmitting(false);
      }
    },
    [isEditing, product, router],
  );

  return {
    handleSubmit,
    isEditing,
  };
}
