"use server";

import { deleteImage } from "@/actions/storage/upload-image";
import {
  ActionError,
  errorResponse,
  successResponse,
} from "@/lib/actions/response";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { products } from "@/lib/db/schema";
import type { ActionResponse } from "@/types/api";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { z } from "zod";

const deleteProductSchema = z.object({
  id: z.string().uuid(),
});

export async function deleteProduct(id: string): Promise<ActionResponse> {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      throw new ActionError("Yetkilendirme gerekli", "AUTH_ERROR");
    }

    const validation = deleteProductSchema.safeParse({ id });
    if (!validation.success) {
      throw new ActionError("Geçersiz ürün ID", "VALIDATION_ERROR");
    }

    const product = await db
      .select({
        id: products.id,
        images: products.images,
        thumbnail: products.thumbnail,
      })
      .from(products)
      .where(eq(products.id, id))
      .limit(1)
      .then((res) => res[0]);

    if (!product) {
      throw new ActionError("Ürün bulunamadı", "NOT_FOUND");
    }

    const imagesToDelete = [...(product.images || [])];
    if (product.thumbnail) {
      imagesToDelete.push(product.thumbnail);
    }

    if (imagesToDelete.length > 0) {
      await Promise.all(
        imagesToDelete.map(async (url) => {
          try {
            await deleteImage(url);
          } catch (e) {
            console.error("Failed to delete image:", url, e);
          }
        }),
      );
    }

    await db.delete(products).where(eq(products.id, id));

    revalidatePath("/dashboard/products");
    revalidatePath("/products");

    return successResponse();
  } catch (error: unknown) {
    console.error("[deleteProduct]", error);
    return errorResponse(error);
  }
}
