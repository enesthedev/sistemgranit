"use server";

import { generateUniqueSlug } from "@/app/utils/slug-server";
import { productSchemas } from "@/app/validations/schemas";
import {
  ActionError,
  errorResponse,
  successResponse,
} from "@/lib/actions/response";
import { validateInput } from "@/lib/actions/validate";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { products } from "@/lib/db/schema";
import type { ActionResponse, CreateProductResponse } from "@/types/api";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";

export async function createProduct(
  input: unknown,
): Promise<ActionResponse<CreateProductResponse>> {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      throw new ActionError("Yetkilendirme gerekli", "AUTH_ERROR");
    }

    const validatedData = await validateInput(productSchemas.create, input);

    const slug = await generateUniqueSlug(validatedData.name);

    const [newProduct] = await db
      .insert(products)
      .values({
        name: validatedData.name,
        slug,
        description: validatedData.description || null,
        categoryId: validatedData.category_id,
        status: validatedData.status,
        pricePerSqm: validatedData.price_per_sqm
          ? String(validatedData.price_per_sqm)
          : null,
        currency: validatedData.currency,
        thumbnail: validatedData.thumbnail || null,
        images: validatedData.images,
        createdBy: session.user.id,
        originCountry: validatedData.origin_country,
        originRegion: validatedData.origin_region,
        colorPrimary: validatedData.color_primary,
        colorSecondary: validatedData.color_secondary,
        pattern: validatedData.pattern,
        finishTypes: validatedData.finish_types,
        density: validatedData.density ? String(validatedData.density) : null,
        waterAbsorption: validatedData.water_absorption
          ? String(validatedData.water_absorption)
          : null,
        compressiveStrength: validatedData.compressive_strength
          ? String(validatedData.compressive_strength)
          : null,
        flexuralStrength: validatedData.flexural_strength
          ? String(validatedData.flexural_strength)
          : null,
        abrasionResistance: validatedData.abrasion_resistance,
        hardnessMohs: validatedData.hardness_mohs
          ? String(validatedData.hardness_mohs)
          : null,
        frostResistant: validatedData.frost_resistant,
        availableThicknesses: validatedData.available_thicknesses
          ? validatedData.available_thicknesses.map(String)
          : null,
        maxSlabWidth: validatedData.max_slab_width
          ? String(validatedData.max_slab_width)
          : null,
        maxSlabLength: validatedData.max_slab_length
          ? String(validatedData.max_slab_length)
          : null,
        minOrderQuantity: validatedData.min_order_quantity
          ? String(validatedData.min_order_quantity)
          : "1",
        applications: validatedData.applications,
        isSuitableForExterior: validatedData.is_suitable_for_exterior,
        isSuitableForKitchen: validatedData.is_suitable_for_kitchen,
        seoTitle: validatedData.seo_title,
        seoDescription: validatedData.seo_description,
        tags: validatedData.tags,
      })
      .returning({ id: products.id, slug: products.slug });

    revalidatePath("/dashboard/products");
    revalidatePath("/products");

    return successResponse({ id: newProduct.id, slug: newProduct.slug });
  } catch (error: unknown) {
    console.error("[createProduct]", error);
    return errorResponse(error);
  }
}
