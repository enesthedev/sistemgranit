"use server";

import { db } from "@/lib/db";
import { products } from "@/lib/db/schema";
import type { Product } from "@/types/product";
import { eq } from "drizzle-orm";

interface GetProductResult {
  success: boolean;
  data?: Product;
  error?: string;
}

export async function getProduct(idOrSlug: string): Promise<GetProductResult> {
  try {
    const isUUID =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(
        idOrSlug,
      );

    const result = await db
      .select({
        id: products.id,
        name: products.name,
        slug: products.slug,
        description: products.description,
        categoryId: products.categoryId,
        status: products.status,
        pricePerSqm: products.pricePerSqm,
        currency: products.currency,
        thumbnail: products.thumbnail,
        images: products.images,
        originCountry: products.originCountry,
        originRegion: products.originRegion,
        colorPrimary: products.colorPrimary,
        colorSecondary: products.colorSecondary,
        pattern: products.pattern,
        finishTypes: products.finishTypes,
        density: products.density,
        waterAbsorption: products.waterAbsorption,
        compressiveStrength: products.compressiveStrength,
        flexuralStrength: products.flexuralStrength,
        abrasionResistance: products.abrasionResistance,
        hardnessMohs: products.hardnessMohs,
        frostResistant: products.frostResistant,
        availableThicknesses: products.availableThicknesses,
        maxSlabWidth: products.maxSlabWidth,
        maxSlabLength: products.maxSlabLength,
        minOrderQuantity: products.minOrderQuantity,
        applications: products.applications,
        isSuitableForExterior: products.isSuitableForExterior,
        isSuitableForKitchen: products.isSuitableForKitchen,
        seoTitle: products.seoTitle,
        seoDescription: products.seoDescription,
        tags: products.tags,
        createdAt: products.createdAt,
        updatedAt: products.updatedAt,
        createdBy: products.createdBy,
        // Categories join fields if needed? No, single product usually just needs ID or basic join.
        // But type `Product` usually expects snake_case if it matches Supabase types.
      })
      .from(products)
      .where(isUUID ? eq(products.id, idOrSlug) : eq(products.slug, idOrSlug))
      .limit(1)
      .then((res) => res[0]);

    if (!result) {
      return { success: false, error: "Ürün bulunamadı" };
    }

    const mappedProduct = {
      ...result,
      category_id: result.categoryId ?? "",
      price_per_sqm: result.pricePerSqm ? Number(result.pricePerSqm) : null,
      origin_country: result.originCountry,
      origin_region: result.originRegion,
      color_primary: result.colorPrimary,
      color_secondary: result.colorSecondary,
      finish_types: result.finishTypes as Product["finish_types"],
      water_absorption: result.waterAbsorption
        ? Number(result.waterAbsorption)
        : null,
      compressive_strength: result.compressiveStrength
        ? Number(result.compressiveStrength)
        : null,
      flexural_strength: result.flexuralStrength
        ? Number(result.flexuralStrength)
        : null,
      abrasion_resistance: result.abrasionResistance,
      hardness_mohs: result.hardnessMohs ? Number(result.hardnessMohs) : null,
      frost_resistant: result.frostResistant,
      available_thicknesses: result.availableThicknesses
        ? result.availableThicknesses.map(Number)
        : null,
      max_slab_width: result.maxSlabWidth ? Number(result.maxSlabWidth) : null,
      max_slab_length: result.maxSlabLength
        ? Number(result.maxSlabLength)
        : null,
      min_order_quantity: result.minOrderQuantity
        ? Number(result.minOrderQuantity)
        : 1,
      is_suitable_for_exterior: result.isSuitableForExterior,
      is_suitable_for_kitchen: result.isSuitableForKitchen,
      seo_title: result.seoTitle,
      seo_description: result.seoDescription,
      created_at: result.createdAt ? result.createdAt.toISOString() : "",
      updated_at: result.updatedAt ? result.updatedAt.toISOString() : "",
      created_by: result.createdBy,
    };

    return { success: true, data: mappedProduct as unknown as Product };
  } catch (error) {
    console.error("Get product error:", error);
    return { success: false, error: "Beklenmeyen bir hata oluştu" };
  }
}
