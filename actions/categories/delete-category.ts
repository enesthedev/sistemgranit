"use server";

import {
  ActionError,
  errorResponse,
  successResponse,
} from "@/lib/actions/response";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { categories, products } from "@/lib/db/schema";
import type { ActionResponse } from "@/types/api";
import { eq, sql } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";

export async function deleteCategory(id: string): Promise<ActionResponse> {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      throw new ActionError("Yetkisiz işlem. Lütfen giriş yapın.", "AUTH_ERROR");
    }

    const productCountResult = await db
      .select({ count: sql<number>`count(*)` })
      .from(products)
      .where(eq(products.categoryId, id));

    const count = Number(productCountResult[0]?.count || 0);

    if (count > 0) {
      throw new ActionError(
        `Bu kategoriye bağlı ${count} adet ürün var. Önce ürünleri başka kategoriye taşıyın veya silin.`,
        "CONFLICT",
      );
    }

    await db.delete(categories).where(eq(categories.id, id));

    revalidatePath("/dashboard/categories");

    return successResponse();
  } catch (error: unknown) {
    console.error("[deleteCategory]", error);
    return errorResponse(error);
  }
}
