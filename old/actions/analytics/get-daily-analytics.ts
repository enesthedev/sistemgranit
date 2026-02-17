"use server";

import { createClient } from "@/supabase/server";
import { format, subDays, eachDayOfInterval, parseISO } from "date-fns";

export interface DailyAnalytics {
  date: string;
  pageViews: number;
  uniqueVisitors: number;
  sessions: number;
}

export async function getDailyAnalytics(
  days: number = 30,
): Promise<DailyAnalytics[]> {
  const supabase = await createClient();

  const endDate = new Date();
  const startDate = subDays(endDate, days);

  const { data: pageViews } = await supabase
    .from("page_views")
    .select("created_at, visitor_id, session_id")
    .gte("created_at", startDate.toISOString());

  const interval = eachDayOfInterval({ start: startDate, end: endDate });

  const dailyMap: Record<
    string,
    { pageViews: number; visitors: Set<string>; sessions: Set<string> }
  > = {};

  interval.forEach((date) => {
    const dateKey = format(date, "yyyy-MM-dd");
    dailyMap[dateKey] = {
      pageViews: 0,
      visitors: new Set(),
      sessions: new Set(),
    };
  });

  (pageViews || []).forEach((pv) => {
    const dateKey = format(parseISO(pv.created_at!), "yyyy-MM-dd");
    if (dailyMap[dateKey]) {
      dailyMap[dateKey].pageViews += 1;
      dailyMap[dateKey].visitors.add(pv.visitor_id);
      dailyMap[dateKey].sessions.add(pv.session_id);
    }
  });

  return interval.map((date) => {
    const dateKey = format(date, "yyyy-MM-dd");
    const day = dailyMap[dateKey];
    return {
      date: dateKey,
      pageViews: day.pageViews,
      uniqueVisitors: day.visitors.size,
      sessions: day.sessions.size,
    };
  });
}
