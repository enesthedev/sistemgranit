import { db } from "@/lib/db";
import { products, slugHistory } from "@/lib/db/schema";
import { eq, ne, and, desc } from "drizzle-orm";
import { slugify } from "./slug";

export async function generateUniqueSlug(
  baseName: string,
  excludeId?: string,
): Promise<string> {
  const baseSlug = slugify(baseName);
  let slug = baseSlug;
  let counter = 1;

  while (true) {
    const query = excludeId
      ? db
          .select({ id: products.id })
          .from(products)
          .where(and(eq(products.slug, slug), ne(products.id, excludeId)))
          .limit(1)
      : db
          .select({ id: products.id })
          .from(products)
          .where(eq(products.slug, slug))
          .limit(1);

    const data = await query;

    if (data.length === 0) break;

    slug = `${baseSlug}-${counter}`;
    counter++;

    if (counter > 100) {
      slug = `${baseSlug}-${Date.now()}`;
      break;
    }
  }

  return slug;
}

type ProductRow = typeof products.$inferSelect;

interface ResolveResult {
  found: boolean;
  redirect?: string;
  product?: ProductRow;
}

export async function resolveSlugWithRedirect(
  slug: string,
): Promise<ResolveResult> {
  const product = await db
    .select()
    .from(products)
    .where(eq(products.slug, slug))
    .limit(1)
    .then((res) => res[0]);

  if (product) {
    return { found: true, product };
  }

  const history = await db
    .select({ newSlug: slugHistory.newSlug })
    .from(slugHistory)
    .where(eq(slugHistory.oldSlug, slug))
    .orderBy(desc(slugHistory.createdAt))
    .limit(1)
    .then((res) => res[0]);

  if (history) {
    return { found: true, redirect: history.newSlug };
  }

  return { found: false };
}
