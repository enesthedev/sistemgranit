"use server";

import { createClient } from "@/supabase/server";
import { format, subDays, eachDayOfInterval } from "date-fns";
import type { ProductTrend } from "./types";

export async function getProductTrend(
  days: number = 30,
): Promise<ProductTrend[]> {
  const supabase = await createClient();

  const endDate = new Date();
  const startDate = subDays(endDate, days);

  const { data, error } = await supabase
    .from("products")
    .select("created_at, status")
    .gte("created_at", startDate.toISOString());

  if (error) throw error;

  const interval = eachDayOfInterval({ start: startDate, end: endDate });

  const trendMap: Record<
    string,
    { newProducts: number; activeProducts: number }
  > = {};

  interval.forEach((date) => {
    const dateKey = format(date, "yyyy-MM-dd");
    trendMap[dateKey] = { newProducts: 0, activeProducts: 0 };
  });

  data?.forEach((p) => {
    const dateKey = format(new Date(p.created_at!), "yyyy-MM-dd");
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
