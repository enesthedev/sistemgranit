-- supabase/migrations/20260203165951_create_analytics_mat_view.sql

-- Materialized view for daily stats
CREATE MATERIALIZED VIEW IF NOT EXISTS analytics_daily_stats AS
SELECT
  date_trunc('day', created_at)::date as date,
  COUNT(id) as page_views,
  COUNT(DISTINCT visitor_id) as unique_visitors,
  COUNT(DISTINCT session_id) as sessions
FROM page_views
GROUP BY 1;

-- Index for faster range queries
CREATE UNIQUE INDEX IF NOT EXISTS idx_analytics_daily_date ON analytics_daily_stats(date);

-- Function to refresh the view
CREATE OR REPLACE FUNCTION refresh_analytics_daily_stats()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  REFRESH MATERIALIZED VIEW CONCURRENTLY analytics_daily_stats;
END;
$$;

-- Grant access
GRANT SELECT ON analytics_daily_stats TO authenticated, service_role;
GRANT EXECUTE ON FUNCTION refresh_analytics_daily_stats TO authenticated, service_role;
