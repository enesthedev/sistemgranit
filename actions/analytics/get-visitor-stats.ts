"use server";

import { createClient } from "@/supabase/server";

export interface VisitorStats {
  totalPageViews: number;
  uniqueVisitors: number;
  totalSessions: number;
  avgSessionDuration: number;
  bounceRate: number;
  pageViewsGrowth: number;
  visitorsGrowth: number;
}

export async function getVisitorStats(
  days: number = 30,
): Promise<VisitorStats> {
  const supabase = await createClient();

  const now = new Date();
  const periodStart = new Date(now);
  periodStart.setDate(periodStart.getDate() - days);

  const prevPeriodStart = new Date(periodStart);
  prevPeriodStart.setDate(prevPeriodStart.getDate() - days);

  const [currentPageViews, prevPageViews, currentSessions] = await Promise.all([
    supabase
      .from("page_views")
      .select("visitor_id", { count: "exact" })
      .gte("created_at", periodStart.toISOString()),
    supabase
      .from("page_views")
      .select("visitor_id", { count: "exact" })
      .gte("created_at", prevPeriodStart.toISOString())
      .lt("created_at", periodStart.toISOString()),
    supabase
      .from("sessions")
      .select("duration_seconds, is_bounce, visitor_id")
      .gte("started_at", periodStart.toISOString()),
  ]);

  const totalPageViews = currentPageViews.count || 0;
  const prevTotalPageViews = prevPageViews.count || 0;

  const uniqueVisitors = new Set(
    (currentPageViews.data || []).map((p) => p.visitor_id),
  ).size;
  const prevUniqueVisitors = new Set(
    (prevPageViews.data || []).map((p) => p.visitor_id),
  ).size;

  const sessions = currentSessions.data || [];
  const totalSessions = sessions.length;

  const avgSessionDuration =
    sessions.length > 0
      ? sessions.reduce((sum, s) => sum + (s.duration_seconds || 0), 0) /
        sessions.length
      : 0;

  const bouncedSessions = sessions.filter((s) => s.is_bounce).length;
  const bounceRate =
    totalSessions > 0 ? (bouncedSessions / totalSessions) * 100 : 0;

  const pageViewsGrowth =
    prevTotalPageViews > 0
      ? ((totalPageViews - prevTotalPageViews) / prevTotalPageViews) * 100
      : totalPageViews > 0
        ? 100
        : 0;

  const visitorsGrowth =
    prevUniqueVisitors > 0
      ? ((uniqueVisitors - prevUniqueVisitors) / prevUniqueVisitors) * 100
      : uniqueVisitors > 0
        ? 100
        : 0;

  return {
    totalPageViews,
    uniqueVisitors,
    totalSessions,
    avgSessionDuration: Math.round(avgSessionDuration),
    bounceRate: Math.round(bounceRate * 10) / 10,
    pageViewsGrowth: Math.round(pageViewsGrowth * 10) / 10,
    visitorsGrowth: Math.round(visitorsGrowth * 10) / 10,
  };
}
