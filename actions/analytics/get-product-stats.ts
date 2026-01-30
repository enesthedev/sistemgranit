"use server";

import { createClient } from "@/supabase/server";
import type { ProductStats } from "./types";

export async function getProductStats(): Promise<ProductStats> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("products")
    .select("status, created_at");

  if (error) throw error;

  const now = new Date();
  const thisMonthStart = new Date(now.getFullYear(), now.getMonth(), 1);
  const lastMonthStart = new Date(now.getFullYear(), now.getMonth() - 1, 1);

  const thisMonthProducts = (data || []).filter(
    (p) => new Date(p.created_at!) >= thisMonthStart,
  );
  const lastMonthProducts = (data || []).filter(
    (p) =>
      new Date(p.created_at!) >= lastMonthStart &&
      new Date(p.created_at!) < thisMonthStart,
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
    total: data?.length || 0,
    active: data?.filter((p) => p.status === "active").length || 0,
    draft: data?.filter((p) => p.status === "draft").length || 0,
    archived: data?.filter((p) => p.status === "archived").length || 0,
    thisMonthNew: thisMonthProducts.length,
    lastMonthNew: lastMonthProducts.length,
    growthRate: Math.round(growthRate * 10) / 10,
  };
}
