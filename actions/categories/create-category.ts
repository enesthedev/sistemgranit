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
import type { ActionResponse, CreateCategoryResponse } from "@/types/api";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { z } from "zod";

export type CreateCategoryInput = z.infer<typeof categorySchemas.create>;

export async function createCategory(
  input: unknown,
): Promise<ActionResponse<CreateCategoryResponse>> {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      throw new ActionError("Yetkisiz işlem. Lütfen giriş yapın.", "AUTH_ERROR");
    }

    const validatedData = await validateInput(categorySchemas.create, input);

    const existing = await db
      .select({ id: categories.id })
      .from(categories)
      .where(eq(categories.slug, validatedData.slug))
      .limit(1);

    if (existing.length > 0) {
      throw new ActionError("Bu URL (slug) zaten kullanımda.", "CONFLICT");
    }

    const [newCategory] = await db
      .insert(categories)
      .values({
        name: validatedData.name,
        slug: validatedData.slug,
        description: validatedData.description,
        imageUrl: validatedData.image_url,
        seoTitle: validatedData.seo_title,
        seoDescription: validatedData.seo_description,
      })
      .returning({ id: categories.id, slug: categories.slug });

    revalidatePath("/dashboard/categories");

    return successResponse({ id: newCategory.id, slug: newCategory.slug });
  } catch (error: unknown) {
    console.error("[createCategory]", error);
    return errorResponse(error);
  }
}
