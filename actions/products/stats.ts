"use server";

import { db } from "@/lib/db";
import { products } from "@/lib/db/schema";
import type { ProductStats } from "./types";

export async function getProductStats(): Promise<ProductStats> {
  const allProducts = await db
    .select({
      status: products.status,
      createdAt: products.createdAt,
    })
    .from(products);

  const now = new Date();
  const thisMonthStart = new Date(now.getFullYear(), now.getMonth(), 1);
  const lastMonthStart = new Date(now.getFullYear(), now.getMonth() - 1, 1);

  const thisMonthProducts = allProducts.filter(
    (p) => new Date(p.createdAt) >= thisMonthStart,
  );
  const lastMonthProducts = allProducts.filter(
    (p) =>
      new Date(p.createdAt) >= lastMonthStart &&
      new Date(p.createdAt) < thisMonthStart,
  );

  const growthRate =
    lastMonthProducts.length > 0
      ? ((thisMonthProducts.length - lastMonthProducts.length) /
          lastMonthProducts.length) *
        100
      : thisMonthProducts.length > 0
        ? 100
        : 0;

  return {
    total: allProducts.length,
    active: allProducts.filter((p) => p.status === "active").length,
    draft: allProducts.filter((p) => p.status === "draft").length,
    archived: allProducts.filter((p) => p.status === "archived").length,
    thisMonthNew: thisMonthProducts.length,
    lastMonthNew: lastMonthProducts.length,
    growthRate: Math.round(growthRate * 10) / 10,
  };
}
