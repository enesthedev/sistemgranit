"use server";

import { createClient } from "@/supabase/server";
import type { Product, ProductFilters } from "@/types/product";

interface GetProductsParams {
  filters?: ProductFilters;
  page?: number;
  limit?: number;
  orderBy?: keyof Product;
  orderDirection?: "asc" | "desc";
}

interface GetProductsResult {
  success: boolean;
  data?: {
    products: Product[];
    total: number;
    page: number;
    totalPages: number;
  };
  error?: string;
}

export async function getProducts(
  params: GetProductsParams = {},
): Promise<GetProductsResult> {
  try {
    const supabase = await createClient();

    const {
      filters = {},
      page = 1,
      limit = 20,
      orderBy = "created_at",
      orderDirection = "desc",
    } = params;

    let query = supabase.from("products").select("*", { count: "exact" });

    if (filters.category) {
      query = query.eq(
        "category",
        filters.category as
          | "marble"
          | "granite"
          | "travertine"
          | "onyx"
          | "limestone"
          | "quartzite",
      );
    }

    if (filters.status) {
      query = query.eq(
        "status",
        filters.status as "active" | "draft" | "archived",
      );
    }

    if (filters.search) {
      query = query.ilike("name", `%${filters.search}%`);
    }

    query = query.order(orderBy, { ascending: orderDirection === "asc" });

    const from = (page - 1) * limit;
    const to = from + limit - 1;
    query = query.range(from, to);

    const { data, error, count } = await query;

    if (error) {
      console.error("Get products error:", error);
      return { success: false, error: "Ürünler alınamadı" };
    }

    return {
      success: true,
      data: {
        products: data as Product[],
        total: count || 0,
        page,
        totalPages: Math.ceil((count || 0) / limit),
      },
    };
  } catch (error) {
    console.error("Get products error:", error);
    return { success: false, error: "Beklenmeyen bir hata oluştu" };
  }
}
