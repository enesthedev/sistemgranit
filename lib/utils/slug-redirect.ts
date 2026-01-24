"use server";

import { createClient } from "@/supabase/server";
import type { Tables } from "@/supabase/database.types";

type Product = Tables<"products">;

interface ResolveResult {
  found: boolean;
  redirect?: string;
  product?: Product;
}

export async function resolveSlugWithRedirect(
  slug: string,
): Promise<ResolveResult> {
  const supabase = await createClient();

  const { data: product } = await supabase
    .from("products")
    .select("*")
    .eq("slug", slug)
    .single();

  if (product) {
    return { found: true, product };
  }

  const { data: history } = await supabase
    .from("slug_history")
    .select("new_slug")
    .eq("old_slug", slug)
    .order("created_at", { ascending: false })
    .limit(1)
    .single();

  if (history) {
    return { found: true, redirect: history.new_slug };
  }

  return { found: false };
}
