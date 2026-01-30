-- supabase/migrations/20260130124801_analytics_rls.sql

-- RLS aktifleştir
ALTER TABLE page_views ENABLE ROW LEVEL SECURITY;
ALTER TABLE sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE analytics_events ENABLE ROW LEVEL SECURITY;

-- Insert: Herkes yazabilir (anonim ziyaretçiler dahil)
CREATE POLICY "Anyone can insert page views"
  ON page_views FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Anyone can insert sessions"
  ON sessions FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Anyone can update sessions"
  ON sessions FOR UPDATE
  USING (true);

CREATE POLICY "Anyone can insert events"
  ON analytics_events FOR INSERT
  WITH CHECK (true);

-- Select: Sadece authenticated kullanıcılar okuyabilir
CREATE POLICY "Auth can read page views"
  ON page_views FOR SELECT
  USING (auth.role() = 'authenticated');

CREATE POLICY "Auth can read sessions"
  ON sessions FOR SELECT
  USING (auth.role() = 'authenticated');

CREATE POLICY "Auth can read events"
  ON analytics_events FOR SELECT
  USING (auth.role() = 'authenticated');
