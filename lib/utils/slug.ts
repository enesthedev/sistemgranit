import type { createClient } from "@/supabase/server";

type TypedSupabaseClient = Awaited<ReturnType<typeof createClient>>;

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/ğ/g, "g")
    .replace(/ü/g, "u")
    .replace(/ş/g, "s")
    .replace(/ı/g, "i")
    .replace(/ö/g, "o")
    .replace(/ç/g, "c")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-+/g, "-");
}

export async function generateUniqueSlug(
  supabase: TypedSupabaseClient,
  baseName: string,
  excludeId?: string,
): Promise<string> {
  const baseSlug = slugify(baseName);
  let slug = baseSlug;
  let counter = 1;

  while (true) {
    let query = supabase.from("products").select("id").eq("slug", slug);

    if (excludeId) {
      query = query.neq("id", excludeId);
    }

    const { data } = await query.single();

    if (!data) break;

    slug = `${baseSlug}-${counter}`;
    counter++;

    if (counter > 100) {
      slug = `${baseSlug}-${Date.now()}`;
      break;
    }
  }

  return slug;
}
