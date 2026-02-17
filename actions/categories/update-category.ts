"use server";

import { categorySchemas } from "@/app/validations/schemas";
import {
  ActionError,
  errorResponse,
  successResponse,
} from "@/lib/actions/response";
import { validateInput } from "@/lib/actions/validate";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { categories } from "@/lib/db/schema";
import type { ActionResponse } from "@/types/api";
import { and, eq, ne } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";

export async function updateCategory(
  input: unknown,
): Promise<ActionResponse> {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      throw new ActionError("Yetkisiz işlem. Lütfen giriş yapın.", "AUTH_ERROR");
    }

    const validatedData = await validateInput(categorySchemas.update, input);

    const existing = await db
      .select({ id: categories.id })
      .from(categories)
      .where(
        and(
          eq(categories.slug, validatedData.slug ?? ""),
          ne(categories.id, validatedData.id),
        ),
      )
      .limit(1);

    if (existing.length > 0) {
      throw new ActionError("Bu URL (slug) zaten kullanımda.", "CONFLICT");
    }

    await db
      .update(categories)
      .set({
        name: validatedData.name,
        slug: validatedData.slug,
        description: validatedData.description,
        imageUrl: validatedData.image_url,
        seoTitle: validatedData.seo_title,
        seoDescription: validatedData.seo_description,
        updatedAt: new Date(),
      })
      .where(eq(categories.id, validatedData.id));

    revalidatePath("/dashboard/categories");

    return successResponse();
  } catch (error: unknown) {
    console.error("[updateCategory]", error);
    return errorResponse(error);
  }
}
