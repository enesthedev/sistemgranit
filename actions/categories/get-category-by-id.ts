"use server";

import { db } from "@/lib/db";
import { categories } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export async function getCategoryById(id: string) {
  try {
    const data = await db
      .select()
      .from(categories)
      .where(eq(categories.id, id))
      .limit(1);

    if (data.length === 0) {
      return null;
    }

    const category = data[0];

    // Drizzle uses camelCase column names by default with pgTable definition (e.g. imageUrl vs image_url)
    // But the frontend likely expects database snake_case columns if it was using Supabase types directly,
    // OR it uses camelCase if mapped.
    // Let's check the schema definition.
    // Schema: imageUrl: text("image_url")
    // Drizzle returns the object key as `imageUrl`.
    // The previous implementation returned `select("*")` from Supabase which returned snake_case `image_url`.
    // We might need to map it back to snake_case to avoid breaking frontend components using `category.image_url`.

    return {
      ...category,
      // Map camelCase Drizzle result to snake_case expected by frontend (if needed)
      // Check usages in frontend to be sure, but let's be safe.
      image_url: category.imageUrl,
      seo_title: category.seoTitle,
      seo_description: category.seoDescription,
      created_at: category.createdAt.toISOString(),
      updated_at: category.updatedAt.toISOString(),
    };
  } catch {
    return null;
  }
}
