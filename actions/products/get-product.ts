"use server";

import { createClient } from "@/supabase/server";
import type { Product } from "@/types/product";

interface GetProductResult {
  success: boolean;
  data?: Product;
  error?: string;
}

export async function getProduct(idOrSlug: string): Promise<GetProductResult> {
  try {
    const supabase = await createClient();

    const isUUID =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(
        idOrSlug,
      );

    const query = supabase
      .from("products")
      .select("*")
      .eq(isUUID ? "id" : "slug", idOrSlug)
      .single();

    const { data, error } = await query;

    if (error) {
      console.error("Get product error:", error);
      return { success: false, error: "Ürün bulunamadı" };
    }

    return { success: true, data: data as Product };
  } catch (error) {
    console.error("Get product error:", error);
    return { success: false, error: "Beklenmeyen bir hata oluştu" };
  }
}
