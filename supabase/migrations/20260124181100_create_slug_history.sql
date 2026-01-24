-- Slug History Tablosu
-- Ürün ismi değiştiğinde eski slug'ların takibi için
-- SEO redirect desteği sağlar

CREATE TABLE slug_history (
  id uuid default gen_random_uuid() primary key,
  product_id uuid references products(id) on delete cascade not null,
  old_slug varchar(255) not null,
  new_slug varchar(255) not null,
  created_at timestamptz default now() not null
);

CREATE INDEX idx_slug_history_old_slug ON slug_history(old_slug);
CREATE INDEX idx_slug_history_product_id ON slug_history(product_id);

comment on table slug_history is 'Ürün slug değişiklik geçmişi - SEO redirect için';
comment on column slug_history.old_slug is 'Değiştirilen eski slug';
comment on column slug_history.new_slug is 'Yeni atanan slug';

ALTER TABLE slug_history ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Slug history viewable by everyone" ON slug_history
  FOR SELECT USING (true);

CREATE POLICY "Authenticated users can insert slug history" ON slug_history
  FOR INSERT TO authenticated
  WITH CHECK (true);
