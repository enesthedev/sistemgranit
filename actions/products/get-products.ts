"use server";

import { db } from "@/lib/db";
import { categories, products } from "@/lib/db/schema";
import type { ProductFilters, ProductWithCategory } from "@/types/product";
import { and, asc, desc, eq, ilike, inArray, sql } from "drizzle-orm";
import type { AnyColumn } from "drizzle-orm";

interface GetProductsParams {
  filters?: ProductFilters;
  page?: number;
  limit?: number;
  orderBy?: string; // keyof typeof products.$inferSelect; // Use drizzle keys ideally, or map
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
    const {
      filters = {},
      page = 1,
      limit = 20,
      orderBy = "created_at",
      orderDirection = "desc",
    } = params;

    const offset = (page - 1) * limit;

    // Base conditions
    const conditions = [];

    if (filters.category) {
      const categoryIds = Array.isArray(filters.category)
        ? filters.category
        : [filters.category];
      conditions.push(inArray(products.categoryId, categoryIds));
    }

    if (filters.status) {
      const statuses = Array.isArray(filters.status)
        ? filters.status
        : [filters.status];
      // Cast string to enum type if needed, or rely on Drizzle
      conditions.push(
        inArray(
          products.status,
          statuses as (typeof products.status.enumValues)[number][],
        ),
      );
    }

    if (filters.search) {
      conditions.push(ilike(products.name, `%${filters.search}%`));
    }

    const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

    // Count query
    const totalResult = await db
      .select({ count: sql<number>`count(*)` })
      .from(products)
      .where(whereClause);

    const total = Number(totalResult[0]?.count || 0);

    // Data query
    let orderColumn: AnyColumn = products.createdAt;
    if (orderBy === "name") orderColumn = products.name;
    if (orderBy === "price_per_sqm") orderColumn = products.pricePerSqm;
    // ... add others as needed

    const data = await db
      .select({
        product: products,
        category: categories,
      })
      .from(products)
      .leftJoin(categories, eq(products.categoryId, categories.id))
      .where(whereClause)
      .orderBy(orderDirection === "asc" ? asc(orderColumn) : desc(orderColumn))
      .limit(limit)
      .offset(offset);

    // Transform data to match ProductWithCategory interface (snake_case)
    const formattedProducts: ProductWithCategory[] = data.map(
      ({ product, category }) => {
        // Map Drizzle result to snake_case structure
        const p = {
          id: product.id,
          name: product.name,
          slug: product.slug,
          description: product.description,
          category_id: product.categoryId,
          status: product.status,
          price_per_sqm: product.pricePerSqm
            ? Number(product.pricePerSqm)
            : null,
          currency: product.currency,
          thumbnail: product.thumbnail,
          images: product.images,
          origin_country: product.originCountry,
          origin_region: product.originRegion,
          color_primary: product.colorPrimary,
          color_secondary: product.colorSecondary,
          pattern: product.pattern,
          finish_types: product.finishTypes,
          density: product.density ? Number(product.density) : null,
          water_absorption: product.waterAbsorption
            ? Number(product.waterAbsorption)
            : null,
          compressive_strength: product.compressiveStrength
            ? Number(product.compressiveStrength)
            : null,
          flexural_strength: product.flexuralStrength
            ? Number(product.flexuralStrength)
            : null,
          abrasion_resistance: product.abrasionResistance,
          hardness_mohs: product.hardnessMohs
            ? Number(product.hardnessMohs)
            : null,
          frost_resistant: product.frostResistant,
          available_thicknesses: product.availableThicknesses
            ? product.availableThicknesses.map(Number)
            : null,
          max_slab_width: product.maxSlabWidth
            ? Number(product.maxSlabWidth)
            : null,
          max_slab_length: product.maxSlabLength
            ? Number(product.maxSlabLength)
            : null,
          min_order_quantity: product.minOrderQuantity
            ? Number(product.minOrderQuantity)
            : 1,
          applications: product.applications,
          is_suitable_for_exterior: product.isSuitableForExterior,
          is_suitable_for_kitchen: product.isSuitableForKitchen,
          seo_title: product.seoTitle,
          seo_description: product.seoDescription,
          tags: product.tags,
          created_at: product.createdAt?.toISOString(),
          updated_at: product.updatedAt?.toISOString(),
          created_by: product.createdBy,
          // Categories logic
          categories: category
            ? {
                id: category.id,
                name: category.name,
                slug: category.slug,
                description: category.description,
                image_url: category.imageUrl,
                seo_title: category.seoTitle,
                seo_description: category.seoDescription,
                created_at: category.createdAt.toISOString(),
                updated_at: category.updatedAt.toISOString(),
              }
            : null,
        };
        return p as unknown as ProductWithCategory;
      },
    );

    return {
      success: true,
      data: {
        products: formattedProducts,
        total,
        page,
        totalPages: Math.ceil(total / limit),
      },
    };
  } catch (error: unknown) {
    console.error("Get products error:", error);
    return { success: false, error: "Beklenmeyen bir hata oluştu" };
  }
}
