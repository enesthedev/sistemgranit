"use server";

import { createClient } from "@/supabase/server";
import type { CategoryDistribution } from "./types";

const CATEGORY_COLORS: Record<string, string> = {
  marble: "hsl(210, 40%, 60%)",
  granite: "hsl(220, 35%, 50%)",
  travertine: "hsl(35, 60%, 55%)",
  onyx: "hsl(280, 40%, 50%)",
  limestone: "hsl(45, 50%, 60%)",
  quartzite: "hsl(180, 45%, 50%)",
};

const CATEGORY_LABELS: Record<string, string> = {
  marble: "Mermer",
  granite: "Granit",
  travertine: "Traverten",
  onyx: "Oniks",
  limestone: "Kireçtaşı",
  quartzite: "Kuvarsit",
};

export async function getCategoryDistribution(): Promise<
  CategoryDistribution[]
> {
  const supabase = await createClient();

  const { data, error } = await supabase.from("products").select("category");

  if (error) throw error;

  const total = data?.length || 0;
  if (total === 0) return [];

  const categoryCounts: Record<string, number> = {};
  data?.forEach((p) => {
    const cat = p.category;
    categoryCounts[cat] = (categoryCounts[cat] || 0) + 1;
  });

  return Object.entries(categoryCounts)
    .map(([category, count]) => ({
      category: CATEGORY_LABELS[category] || category,
      count,
      percentage: Math.round((count / total) * 100 * 10) / 10,
      fill: CATEGORY_COLORS[category] || "hsl(0, 0%, 50%)",
    }))
    .sort((a, b) => b.count - a.count);
}
