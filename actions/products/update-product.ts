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
import { products, slugHistory } from "@/lib/db/schema";
import type { ActionResponse } from "@/types/api";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";

interface UpdateProductResponse {
  slug: string;
}

export async function updateProduct(
  input: unknown,
): Promise<ActionResponse<UpdateProductResponse>> {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      throw new ActionError("Yetkilendirme gerekli", "AUTH_ERROR");
    }

    const { id, ...updateData } = await validateInput(
      productSchemas.update,
      input,
    );

    const existing = await db
      .select({ id: products.id, name: products.name, slug: products.slug })
      .from(products)
      .where(eq(products.id, id))
      .limit(1)
      .then((res) => res[0]);

    if (!existing) {
      throw new ActionError("Ürün bulunamadı", "NOT_FOUND");
    }

    let newSlug = existing.slug;
    if (updateData.name && updateData.name !== existing.name) {
      newSlug = await generateUniqueSlug(updateData.name, id);

      await db.insert(slugHistory).values({
        productId: id,
        oldSlug: existing.slug,
        newSlug: newSlug,
      });
    }

    await db
      .update(products)
      .set({
        name: updateData.name,
        slug: newSlug,
        description: updateData.description || null,
        categoryId: updateData.category_id,
        status: updateData.status,
        pricePerSqm: updateData.price_per_sqm
          ? String(updateData.price_per_sqm)
          : null,
        currency: updateData.currency,
        thumbnail: updateData.thumbnail || null,
        images: updateData.images,
        originCountry: updateData.origin_country,
        originRegion: updateData.origin_region,
        colorPrimary: updateData.color_primary,
        colorSecondary: updateData.color_secondary,
        pattern: updateData.pattern,
        finishTypes: updateData.finish_types,
        density: updateData.density ? String(updateData.density) : null,
        waterAbsorption: updateData.water_absorption
          ? String(updateData.water_absorption)
          : null,
        compressiveStrength: updateData.compressive_strength
          ? String(updateData.compressive_strength)
          : null,
        flexuralStrength: updateData.flexural_strength
          ? String(updateData.flexural_strength)
          : null,
        abrasionResistance: updateData.abrasion_resistance,
        hardnessMohs: updateData.hardness_mohs
          ? String(updateData.hardness_mohs)
          : null,
        frostResistant: updateData.frost_resistant,
        availableThicknesses: updateData.available_thicknesses
          ? updateData.available_thicknesses.map(String)
          : null,
        maxSlabWidth: updateData.max_slab_width
          ? String(updateData.max_slab_width)
          : null,
        maxSlabLength: updateData.max_slab_length
          ? String(updateData.max_slab_length)
          : null,
        minOrderQuantity: updateData.min_order_quantity
          ? String(updateData.min_order_quantity)
          : "1",
        applications: updateData.applications,
        isSuitableForExterior: updateData.is_suitable_for_exterior,
        isSuitableForKitchen: updateData.is_suitable_for_kitchen,
        seoTitle: updateData.seo_title,
        seoDescription: updateData.seo_description,
        tags: updateData.tags,
        updatedAt: new Date(),
      })
      .where(eq(products.id, id));

    revalidatePath("/dashboard/products");
    revalidatePath(`/dashboard/products/${id}`);
    revalidatePath(`/dashboard/products/${newSlug}`);
    revalidatePath("/products");
    revalidatePath(`/products/${newSlug}`);

    return successResponse({ slug: newSlug });
  } catch (error: unknown) {
    console.error("[updateProduct]", error);
    return errorResponse(error);
  }
}
