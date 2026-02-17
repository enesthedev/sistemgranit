"use server";

import { createClient } from "@/supabase/server";
import { subDays } from "date-fns";

export interface PopularPage {
  path: string;
  views: number;
  uniqueVisitors: number;
}

export async function getPopularPages(
  days: number = 30,
  limit: number = 10,
): Promise<PopularPage[]> {
  const supabase = await createClient();

  const startDate = subDays(new Date(), days);

  const { data } = await supabase
    .from("page_views")
    .select("page_path, visitor_id")
    .gte("created_at", startDate.toISOString());

  if (!data || data.length === 0) return [];

  const pageMap: Record<string, { views: number; visitors: Set<string> }> = {};

  data.forEach((pv) => {
    if (!pageMap[pv.page_path]) {
      pageMap[pv.page_path] = { views: 0, visitors: new Set() };
    }
    pageMap[pv.page_path].views += 1;
    pageMap[pv.page_path].visitors.add(pv.visitor_id);
  });

  return Object.entries(pageMap)
    .map(([path, stats]) => ({
      path,
      views: stats.views,
      uniqueVisitors: stats.visitors.size,
    }))
    .sort((a, b) => b.views - a.views)
    .slice(0, limit);
}
