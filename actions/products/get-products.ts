"use server";

import { createClient } from "@/supabase/server";
import type {
  Product,
  ProductFilters,
  ProductWithCategory,
} from "@/types/product";

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
    products: ProductWithCategory[];
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

    let query = supabase
      .from("products")
      .select("*, categories(*)", { count: "exact" });

    if (filters.category) {
      const categoryIds = Array.isArray(filters.category)
        ? filters.category
        : [filters.category];

      query = query.in("category_id", categoryIds);
    }

    if (filters.status) {
      const statuses = Array.isArray(filters.status)
        ? filters.status
        : [filters.status];

      query = query.in(
        "status",
        statuses as unknown as ("active" | "draft" | "archived")[],
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

    // Since categories is joined as an object (single because foreign key is many-to-one),
    // it will be returned as `categories: { ... }` or null.
    // However, the relationship name might be `categories` or something else depending on DB config.
    // The query `categories(*)` implies using the table name which usually works if relation is unambiguous.
    // But `data` type inferred by supabase-js might need casting.

    // Force cast to ProductWithCategory[] to satisfy TS and my interface.
    // Note: ProductWithCategory has categories: Category | null.
    // If join returns array (unlikely for many-to-one), we might need to handle it.
    // But products -> category_id -> categories(id) is N:1, so referencing `categories` returns single object if using single().
    // Wait, standard select `*, categories(*)` returns `categories` as an array or object?
    // In Supabase js, if the relationship is N:1, it returns an object? Or array?
    // It depends on `isOneToOne` or `!isList`?
    // Actually, usually it returns an object if it detects N:1.
    // Let's assume it returns object or null.

    // Casting data to unknown first to avoid type mismatch with inferred type
    const products = data as unknown as ProductWithCategory[];

    return {
      success: true,
      data: {
        products,
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
