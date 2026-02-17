"use server";

import { db } from "@/lib/db";
import { categories } from "@/lib/db/schema";
import { asc } from "drizzle-orm";

export async function getCategories() {
  try {
    const data = await db
      .select()
      .from(categories)
      .orderBy(asc(categories.name));

    return data.map((category) => ({
      ...category,
      image_url: category.imageUrl,
      seo_title: category.seoTitle,
      seo_description: category.seoDescription,
      created_at: category.createdAt.toISOString(),
      updated_at: category.updatedAt.toISOString(),
    }));
  } catch (error: unknown) {
    throw new Error(
      error instanceof Error ? error.message : "Bilinmeyen bir hata oluştu",
    );
  }
}
