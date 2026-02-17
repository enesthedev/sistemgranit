"use server";

import { db } from "@/lib/db";
import { products } from "@/lib/db/schema";
import { format, subDays, eachDayOfInterval } from "date-fns";
import { gte } from "drizzle-orm";
import type { ProductTrend } from "./types";

export async function getProductTrend(
  days: number = 30,
): Promise<ProductTrend[]> {
  const endDate = new Date();
  const startDate = subDays(endDate, days);

  const data = await db
    .select({
      createdAt: products.createdAt,
      status: products.status,
    })
    .from(products)
    .where(gte(products.createdAt, startDate));

  const interval = eachDayOfInterval({ start: startDate, end: endDate });

  const trendMap: Record<
    string,
    { newProducts: number; activeProducts: number }
  > = {};

  interval.forEach((date) => {
    const dateKey = format(date, "yyyy-MM-dd");
    trendMap[dateKey] = { newProducts: 0, activeProducts: 0 };
  });

  data.forEach((p) => {
    const dateKey = format(new Date(p.createdAt), "yyyy-MM-dd");
    if (trendMap[dateKey]) {
      trendMap[dateKey].newProducts += 1;
    }
  });

  let cumulativeActive = 0;
  return interval.map((date) => {
    const dateKey = format(date, "yyyy-MM-dd");
    cumulativeActive += trendMap[dateKey].newProducts;
    return {
      date: dateKey,
      newProducts: trendMap[dateKey].newProducts,
      activeProducts: cumulativeActive,
    };
  });
}
