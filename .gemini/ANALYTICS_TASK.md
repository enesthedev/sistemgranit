# 📊 Analytics Dashboard - Geliştirme Planı

> **Oluşturma Tarihi:** 2026-01-28  
> **Son Güncelleme:** 2026-01-28T20:41:30+03:00  
> **Kaynak:** PROJECT_CONTEXT.md - Bilinen Sorunlar & TODO - 5. Madde  
> **Öncelik:** Orta-Yüksek  
> **Tahmini Süre:** 4 Faz (~6-8 Hafta)

---

## 📋 İçindekiler

1. [Özet](#-özet)
2. [Mevcut Durum](#-mevcut-durum-analizi)
3. [Faz 1: Temel Altyapı](#-faz-1-temel-altyapı--ürün-analytics)
4. [Faz 2: Ziyaretçi Tracking Sistemi](#-faz-2-ziyaretçi-tracking-sistemi)
5. [Faz 3: Analytics Dashboard UI](#-faz-3-analytics-dashboard-ui)
6. [Faz 4: Optimizasyon & Polish](#-faz-4-optimizasyon--polish)
7. [Teknik Referans](#-teknik-referans)

---

## 🎯 Özet

### Hedefler
1. ✅ Mevcut mock data'yı gerçek Supabase verisine bağlama
2. ✅ Ürün istatistikleri dashboard'u (mevcut bileşenleri güncelleme)
3. ✅ Custom ziyaretçi analitikleri sistemi (Cookie-less, GDPR uyumlu)
4. ✅ Performans optimizasyonları (Materialized Views, Caching)

### Gerekli Paketler
```bash
bun add swr @number-flow/react date-fns
```

| Paket | Amaç | Boyut |
|-------|------|-------|
| `swr` | Data fetching & caching | ~5.3KB |
| `@number-flow/react` | Animasyonlu sayaçlar | Minimal |
| `date-fns` | Tarih formatlama | Tree-shakeable |

**Toplam Ek Bundle Size:** ~10-15KB (gzip)

---

## 📋 Mevcut Durum Analizi

### Mevcut Bileşenler (Mock Data ile)

| Bileşen | Konum | Durum |
|---------|-------|-------|
| `ChartAreaInteractive` | `dashboard/components/charts/` | ✅ Var (mock data) |
| `SectionCards` | `dashboard/components/cards/` | ✅ Var (statik değerler) |
| `DataTable` | `dashboard/components/tables/` | ✅ Var (data.json ile) |

### Mevcut Paketler (Kullanılabilir)
- `recharts` 2.15.4 ✅
- `@tanstack/react-table` ^8.21.3 ✅
- `@supabase/supabase-js` latest ✅
- `sonner` ^2.0.7 ✅

### Silinecek Mock Dosyalar
- `app/[locale]/dashboard/data.json` (68 satırlık demo veri)
- `chart-area-interactive.tsx` içindeki 90+ satır mock data

---

## 🚀 Faz 1: Temel Altyapı & Ürün Analytics

> **Süre:** 1-2 Hafta  
> **Öncelik:** Kritik  
> **Bağımlılık:** Yok

### 1.1 Paket Kurulumu

```bash
bun add swr @number-flow/react date-fns
```

### 1.2 Server Actions Oluşturma

**Dosya Yapısı:**
```
actions/analytics/
├── get-product-stats.ts        # Ürün özet istatistikleri
├── get-category-distribution.ts # Kategori dağılımı
├── get-product-trend.ts        # Aylık ürün trendi
├── get-price-analytics.ts      # Fiyat analizi
└── get-finish-popularity.ts    # Finish popülerliği
```

**Örnek Implementation:**
```typescript
// actions/analytics/get-product-stats.ts
"use server";

import { createClient } from "@/supabase/server";

export interface ProductStats {
  total: number;
  active: number;
  draft: number;
  archived: number;
  thisMonthNew: number;
  growthRate: number;
}

export async function getProductStats(): Promise<ProductStats> {
  const supabase = await createClient();
  
  const { data, error } = await supabase
    .from("products")
    .select("status, created_at");
  
  if (error) throw error;
  
  const now = new Date();
  const thisMonthStart = new Date(now.getFullYear(), now.getMonth(), 1);
  const lastMonthStart = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  
  const thisMonthProducts = data.filter(
    (p) => new Date(p.created_at!) >= thisMonthStart
  );
  const lastMonthProducts = data.filter(
    (p) => new Date(p.created_at!) >= lastMonthStart && 
           new Date(p.created_at!) < thisMonthStart
  );
  
  return {
    total: data.length,
    active: data.filter((p) => p.status === "active").length,
    draft: data.filter((p) => p.status === "draft").length,
    archived: data.filter((p) => p.status === "archived").length,
    thisMonthNew: thisMonthProducts.length,
    growthRate: lastMonthProducts.length > 0 
      ? ((thisMonthProducts.length - lastMonthProducts.length) / lastMonthProducts.length) * 100 
      : 0,
  };
}
```

### 1.3 Mevcut Bileşenleri Güncelleme

#### `section-cards.tsx` Güncelleme
```typescript
// ✅ YENİ: Server action ile veri çek
import { getProductStats } from "@/actions/analytics/get-product-stats";
import NumberFlow from "@number-flow/react";

export async function SectionCards() {
  const stats = await getProductStats();
  
  return (
    <div className="grid grid-cols-4 gap-4">
      <StatCard title="Toplam Ürün" value={stats.total} trend={stats.growthRate} />
      <StatCard title="Aktif Ürünler" value={stats.active} />
      <StatCard title="Taslak" value={stats.draft} />
      <StatCard title="Arşivlenmiş" value={stats.archived} />
    </div>
  );
}
```

#### `chart-area-interactive.tsx` Güncelleme
- Mock data kaldır
- Props veya SWR hook ile veri al

### 1.4 Sidebar Güncelleme
- Analytics sayfası linki ekle

### Faz 1 Checklist

- [ ] `bun add swr @number-flow/react date-fns`
- [ ] `actions/analytics/get-product-stats.ts` oluştur
- [ ] `actions/analytics/get-category-distribution.ts` oluştur
- [ ] `actions/analytics/get-product-trend.ts` oluştur
- [ ] `section-cards.tsx` → Supabase verisine bağla
- [ ] `chart-area-interactive.tsx` → Mock data kaldır
- [ ] Sidebar'a Analytics link ekle
- [ ] `data.json` sil
- [ ] Build & lint kontrolü

---

## 🔍 Faz 2: Ziyaretçi Tracking Sistemi

> **Süre:** 2-3 Hafta  
> **Öncelik:** Yüksek  
> **Bağımlılık:** Faz 1 tamamlanmış olmalı

### Neden Custom Çözüm?

| Özellik | Değer |
|---------|-------|
| **Maliyet** | Sıfır (Supabase planı içinde) |
| **Kontrol** | Tam kontrol |
| **GDPR** | Cookie-less, IP hash ile anonim |
| **Entegrasyon** | Native Next.js |

### 2.1 Database Migration'ları

#### Migration 1: Ana Tablolar
```sql
-- supabase/migrations/XXXXXX_create_visitor_analytics.sql

-- Sayfa Görüntüleme Tablosu
CREATE TABLE page_views (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  visitor_id VARCHAR(64) NOT NULL,
  session_id UUID NOT NULL,
  page_path VARCHAR(500) NOT NULL,
  page_title VARCHAR(255),
  referrer VARCHAR(500),
  referrer_domain VARCHAR(255),
  user_agent VARCHAR(500),
  device_type VARCHAR(20),
  browser VARCHAR(50),
  browser_version VARCHAR(20),
  os VARCHAR(50),
  os_version VARCHAR(20),
  screen_width INTEGER,
  screen_height INTEGER,
  viewport_width INTEGER,
  viewport_height INTEGER,
  timezone VARCHAR(50),
  language VARCHAR(10),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Oturum Tablosu
CREATE TABLE sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  visitor_id VARCHAR(64) NOT NULL,
  started_at TIMESTAMPTZ DEFAULT NOW(),
  ended_at TIMESTAMPTZ,
  duration_seconds INTEGER DEFAULT 0,
  page_count INTEGER DEFAULT 1,
  entry_page VARCHAR(500),
  exit_page VARCHAR(500),
  referrer VARCHAR(500),
  referrer_domain VARCHAR(255),
  is_bounce BOOLEAN DEFAULT TRUE,
  device_type VARCHAR(20),
  browser VARCHAR(50),
  os VARCHAR(50),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Custom Events Tablosu
CREATE TABLE analytics_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  visitor_id VARCHAR(64) NOT NULL,
  session_id UUID NOT NULL,
  event_name VARCHAR(100) NOT NULL,
  event_data JSONB DEFAULT '{}',
  page_path VARCHAR(500),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- İndeksler
CREATE INDEX idx_page_views_created_at ON page_views(created_at);
CREATE INDEX idx_page_views_visitor ON page_views(visitor_id);
CREATE INDEX idx_page_views_session ON page_views(session_id);
CREATE INDEX idx_page_views_path ON page_views(page_path);
CREATE INDEX idx_sessions_visitor ON sessions(visitor_id);
CREATE INDEX idx_sessions_started ON sessions(started_at);
CREATE INDEX idx_events_name ON analytics_events(event_name);
CREATE INDEX idx_events_created ON analytics_events(created_at);
```

#### Migration 2: RLS Policies
```sql
-- supabase/migrations/XXXXXX_analytics_rls.sql

ALTER TABLE page_views ENABLE ROW LEVEL SECURITY;
ALTER TABLE sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE analytics_events ENABLE ROW LEVEL SECURITY;

-- Insert: Herkes yazabilir
CREATE POLICY "Anyone can insert page views" ON page_views FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can insert sessions" ON sessions FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can update sessions" ON sessions FOR UPDATE USING (true);
CREATE POLICY "Anyone can insert events" ON analytics_events FOR INSERT WITH CHECK (true);

-- Select: Sadece authenticated
CREATE POLICY "Auth can read page views" ON page_views FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Auth can read sessions" ON sessions FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Auth can read events" ON analytics_events FOR SELECT USING (auth.role() = 'authenticated');
```

### 2.2 Client-Side Tracking Library

**Dosya Yapısı:**
```
lib/analytics/
├── index.ts           # Public API export
├── tracker.ts         # Ana tracking logic
├── fingerprint.ts     # Visitor ID oluşturma (Cookie-less)
├── session.ts         # Session yönetimi
├── parser.ts          # User-Agent parsing
└── types.ts           # TypeScript tipleri
```

#### Fingerprint Oluşturma (GDPR Uyumlu)
```typescript
// lib/analytics/fingerprint.ts
export async function generateVisitorId(): Promise<string> {
  const components = [
    navigator.userAgent,
    navigator.language,
    screen.width,
    screen.height,
    screen.colorDepth,
    new Date().getTimezoneOffset(),
    navigator.hardwareConcurrency || 0,
    navigator.maxTouchPoints || 0,
  ];
  
  const fingerprint = components.join("|");
  const encoder = new TextEncoder();
  const data = encoder.encode(fingerprint);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  
  return hashArray.map(b => b.toString(16).padStart(2, "0")).join("");
}
```

#### Session Yönetimi
```typescript
// lib/analytics/session.ts
const SESSION_KEY = "sg_session_id";
const SESSION_TIMEOUT = 30 * 60 * 1000; // 30 dakika

export function getOrCreateSessionId(): string {
  if (typeof window === "undefined") return "";
  
  const now = Date.now();
  const lastActivity = parseInt(sessionStorage.getItem("sg_last_activity") || "0");
  let sessionId = sessionStorage.getItem(SESSION_KEY);
  
  if (sessionId && (now - lastActivity) > SESSION_TIMEOUT) {
    sessionId = null;
  }
  
  if (!sessionId) {
    sessionId = crypto.randomUUID();
    sessionStorage.setItem(SESSION_KEY, sessionId);
  }
  
  sessionStorage.setItem("sg_last_activity", now.toString());
  return sessionId;
}
```

### 2.3 Analytics Provider

```tsx
// app/components/analytics-provider.tsx
"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { trackPageView } from "@/lib/analytics";

export function AnalyticsProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  useEffect(() => {
    // Dashboard ve auth sayfalarını takip etme
    if (pathname.includes("/dashboard") || pathname.includes("/auth")) {
      return;
    }
    trackPageView(pathname);
  }, [pathname]);
  
  return <>{children}</>;
}
```

### 2.4 Server Actions (Ziyaretçi)

```
actions/analytics/
├── get-visitor-stats.ts       # Toplam ziyaretçi istatistikleri
├── get-daily-analytics.ts     # Günlük trend
├── get-popular-pages.ts       # Popüler sayfalar
├── get-referrer-stats.ts      # Referrer kaynakları
├── get-device-stats.ts        # Cihaz dağılımı
└── get-realtime-visitors.ts   # Anlık ziyaretçi sayısı
```

### Faz 2 Checklist

- [ ] Migration: `page_views` tablosu
- [ ] Migration: `sessions` tablosu
- [ ] Migration: `analytics_events` tablosu
- [ ] Migration: RLS policies
- [ ] `lib/analytics/fingerprint.ts`
- [ ] `lib/analytics/parser.ts`
- [ ] `lib/analytics/session.ts`
- [ ] `lib/analytics/tracker.ts`
- [ ] `app/components/analytics-provider.tsx`
- [ ] Root layout'a provider ekle
- [ ] `get-visitor-stats.ts`
- [ ] `get-daily-analytics.ts`
- [ ] `get-popular-pages.ts`
- [ ] Build & test

---

## 🎨 Faz 3: Analytics Dashboard UI

> **Süre:** 2 Hafta  
> **Öncelik:** Yüksek  
> **Bağımlılık:** Faz 2 tamamlanmış olmalı

### 3.1 Sayfa Yapısı

```
app/[locale]/dashboard/analytics/
├── page.tsx                    # Ana analytics sayfası
├── loading.tsx                 # Skeleton loading
└── components/
    ├── product-stats-cards.tsx # Ürün istatistik kartları
    ├── visitor-stats-cards.tsx # Ziyaretçi istatistik kartları
    ├── daily-trend-chart.tsx   # Günlük trend grafiği
    ├── category-pie-chart.tsx  # Kategori dağılımı
    ├── popular-pages-table.tsx # Popüler sayfalar tablosu
    ├── referrer-chart.tsx      # Referrer dağılımı
    ├── device-breakdown.tsx    # Cihaz dağılımı
    └── realtime-counter.tsx    # Anlık ziyaretçi sayacı
```

### 3.2 Ana Sayfa Layout

```
┌──────────────────────────────────────────────────────────────────┐
│                        ANALYTICS DASHBOARD                        │
├─────────────────┬─────────────────┬─────────────────┬────────────┤
│ Toplam Ziyaretçi│ Sayfa Görüntüleme│ Ort. Oturum    │ Bounce Rate│
│     ▲ 1,234     │      ▲ 5,678     │    2:34        │    42%     │
│   +15.2% ↑      │     +8.5% ↑      │                │   -3.2% ↓  │
├─────────────────┴─────────────────┴─────────────────┴────────────┤
│ Ürün Kartları                                                     │
├──────────────────────────────────────────┬───────────────────────┤
│ Günlük Trend Grafiği (Area Chart)        │ Kategori Dağılımı     │
│                                          │     (Pie Chart)       │
│    ▁▂▃▄▅▆▇█▇▆▅▄▃▂▁                       │      ╭────╮           │
│                                          │     │ 35% │marble     │
├──────────────────────────────────────────┼───────────────────────┤
│ Popüler Sayfalar Tablosu                 │ Cihaz Dağılımı        │
│                                          │ Desktop: 65%          │
│ 1. /products/marble-xyz     1,234 views  │ Mobile:  30%          │
│ 2. /products/granite-abc      987 views  │ Tablet:   5%          │
└──────────────────────────────────────────┴───────────────────────┘
```

### 3.3 Bileşen Detayları

#### Visitor Stats Cards
```tsx
// Animasyonlu sayaçlar ile ziyaretçi istatistikleri
- Toplam Ziyaretçi (NumberFlow)
- Sayfa Görüntüleme (NumberFlow)
- Ort. Oturum Süresi
- Bounce Rate
- Değişim yüzdeleri (Badge)
```

#### Daily Trend Chart
```tsx
// Recharts Area Chart
- Son 30 gün
- Pageviews & Visitors çizgileri
- Tooltip & Legend
- Responsive
```

### 3.4 CSS Variables (Chart Colors)

```css
:root {
  --chart-marble: hsl(210, 40%, 60%);
  --chart-granite: hsl(220, 35%, 50%);
  --chart-travertine: hsl(35, 60%, 55%);
  --chart-onyx: hsl(280, 40%, 50%);
  --chart-limestone: hsl(45, 50%, 60%);
  --chart-quartzite: hsl(180, 45%, 50%);
}
```

### Faz 3 Checklist

- [ ] `analytics/page.tsx` - Ana sayfa
- [ ] `analytics/loading.tsx` - Skeleton
- [ ] `product-stats-cards.tsx`
- [ ] `visitor-stats-cards.tsx`
- [ ] `daily-trend-chart.tsx`
- [ ] `category-pie-chart.tsx`
- [ ] `popular-pages-table.tsx`
- [ ] `referrer-chart.tsx`
- [ ] `device-breakdown.tsx`
- [ ] `realtime-counter.tsx`
- [ ] CSS variables ekle
- [ ] Mobile responsive
- [ ] i18n labels

---

## ⚡ Faz 4: Optimizasyon & Polish

> **Süre:** 1-2 Hafta  
> **Öncelik:** Orta  
> **Bağımlılık:** Faz 3 tamamlanmış olmalı

### 4.1 Materialized Views

```sql
-- supabase/migrations/XXXXXX_create_analytics_views.sql

-- Günlük Özet
CREATE MATERIALIZED VIEW daily_analytics AS
SELECT 
  DATE_TRUNC('day', created_at)::DATE as date,
  COUNT(*) as total_pageviews,
  COUNT(DISTINCT visitor_id) as unique_visitors,
  COUNT(DISTINCT session_id) as total_sessions
FROM page_views
WHERE created_at >= NOW() - INTERVAL '90 days'
GROUP BY DATE_TRUNC('day', created_at)
ORDER BY date DESC;

CREATE UNIQUE INDEX ON daily_analytics (date);

-- Popüler Sayfalar
CREATE MATERIALIZED VIEW popular_pages AS
SELECT 
  page_path,
  COUNT(*) as views,
  COUNT(DISTINCT visitor_id) as unique_visitors
FROM page_views
WHERE created_at >= NOW() - INTERVAL '30 days'
GROUP BY page_path
ORDER BY views DESC
LIMIT 50;

CREATE UNIQUE INDEX ON popular_pages (page_path);

-- Referrer Analizi
CREATE MATERIALIZED VIEW referrer_analytics AS
SELECT 
  COALESCE(referrer_domain, 'Direct') as source,
  COUNT(*) as visits,
  COUNT(DISTINCT visitor_id) as unique_visitors
FROM page_views
WHERE created_at >= NOW() - INTERVAL '30 days'
GROUP BY referrer_domain
ORDER BY visits DESC
LIMIT 20;

CREATE UNIQUE INDEX ON referrer_analytics (source);

-- Cihaz Dağılımı
CREATE MATERIALIZED VIEW device_analytics AS
SELECT 
  device_type,
  browser,
  os,
  COUNT(*) as sessions
FROM sessions
WHERE started_at >= NOW() - INTERVAL '30 days'
GROUP BY device_type, browser, os
ORDER BY sessions DESC;

CREATE UNIQUE INDEX ON device_analytics (device_type, browser, os);

-- Yenileme Fonksiyonu
CREATE OR REPLACE FUNCTION refresh_analytics_views()
RETURNS void AS $$
BEGIN
  REFRESH MATERIALIZED VIEW CONCURRENTLY daily_analytics;
  REFRESH MATERIALIZED VIEW CONCURRENTLY popular_pages;
  REFRESH MATERIALIZED VIEW CONCURRENTLY referrer_analytics;
  REFRESH MATERIALIZED VIEW CONCURRENTLY device_analytics;
END;
$$ LANGUAGE plpgsql;
```

### 4.2 Ürün Analytics Views

```sql
-- Ürün İstatistikleri
CREATE MATERIALIZED VIEW product_analytics_summary AS
SELECT 
  COUNT(*) as total_products,
  COUNT(*) FILTER (WHERE status = 'active') as active_count,
  COUNT(*) FILTER (WHERE status = 'draft') as draft_count,
  COUNT(*) FILTER (WHERE status = 'archived') as archived_count,
  ROUND(AVG(price_per_sqm)::numeric, 2) as avg_price,
  MIN(price_per_sqm) as min_price,
  MAX(price_per_sqm) as max_price
FROM products;

CREATE UNIQUE INDEX ON product_analytics_summary ((1));

-- Kategori Dağılımı
CREATE MATERIALIZED VIEW category_distribution AS
SELECT 
  category,
  COUNT(*) as count,
  ROUND((COUNT(*) * 100.0 / (SELECT COUNT(*) FROM products))::numeric, 1) as percentage
FROM products
GROUP BY category
ORDER BY count DESC;

CREATE UNIQUE INDEX ON category_distribution (category);
```

### 4.3 Auto-Refresh (pg_cron veya Edge Function)

```sql
-- pg_cron ile (Supabase Pro gerekli)
SELECT cron.schedule('refresh-analytics', '0 */6 * * *', 'SELECT refresh_analytics_views()');
```

Veya Edge Function ile:
```typescript
// supabase/functions/refresh-analytics/index.ts
Deno.serve(async () => {
  const supabase = createClient(...);
  await supabase.rpc('refresh_analytics_views');
  return new Response('OK');
});
```

### 4.4 Custom Events

```typescript
// Ürün görüntüleme
trackEvent("product_view", { productId, category });

// Kategori tıklama
trackEvent("category_click", { category });

// Arama
trackEvent("search", { query, resultsCount });
```

### 4.5 Opt-out Mekanizması

```typescript
// lib/analytics/tracker.ts
export function isOptedOut(): boolean {
  if (typeof window === "undefined") return false;
  return localStorage.getItem("sg_analytics_optout") === "true";
}

export function optOut(): void {
  localStorage.setItem("sg_analytics_optout", "true");
}

export function optIn(): void {
  localStorage.removeItem("sg_analytics_optout");
}
```

### Faz 4 Checklist

- [ ] `daily_analytics` materialized view
- [ ] `popular_pages` materialized view
- [ ] `referrer_analytics` materialized view
- [ ] `device_analytics` materialized view
- [ ] `product_analytics_summary` view
- [ ] `category_distribution` view
- [ ] `refresh_analytics_views()` function
- [ ] Auto-refresh setup (cron/edge function)
- [ ] Custom events: product_view
- [ ] Custom events: category_click
- [ ] Custom events: search
- [ ] Opt-out mekanizması
- [ ] Error boundaries
- [ ] Performance testing
- [ ] Documentation

---

## 📚 Teknik Referans

### Dosya Yapısı (Tam)

```
lib/
└── analytics/
    ├── index.ts
    ├── tracker.ts
    ├── fingerprint.ts
    ├── session.ts
    ├── parser.ts
    └── types.ts

actions/analytics/
├── get-product-stats.ts
├── get-category-distribution.ts
├── get-product-trend.ts
├── get-price-analytics.ts
├── get-finish-popularity.ts
├── get-visitor-stats.ts
├── get-daily-analytics.ts
├── get-popular-pages.ts
├── get-referrer-stats.ts
├── get-device-stats.ts
├── get-realtime-visitors.ts
└── refresh-views.ts

app/[locale]/dashboard/analytics/
├── page.tsx
├── loading.tsx
└── components/
    ├── product-stats-cards.tsx
    ├── visitor-stats-cards.tsx
    ├── daily-trend-chart.tsx
    ├── category-pie-chart.tsx
    ├── popular-pages-table.tsx
    ├── referrer-chart.tsx
    ├── device-breakdown.tsx
    └── realtime-counter.tsx

app/components/
└── analytics-provider.tsx

supabase/migrations/
├── XXXXXX_create_visitor_analytics.sql
├── XXXXXX_analytics_rls.sql
├── XXXXXX_create_analytics_views.sql
└── XXXXXX_create_product_views.sql
```

### Toplanan Veriler (Ziyaretçi)

| Veri | Kaynak | GDPR Uyumlu |
|------|--------|-------------|
| Visitor ID | Browser Fingerprint (hash) | ✅ |
| Session ID | SessionStorage | ✅ |
| Page Path | URL | ✅ |
| Referrer | document.referrer | ✅ |
| Device Type | User-Agent parse | ✅ |
| Browser/Version | User-Agent parse | ✅ |
| OS/Version | User-Agent parse | ✅ |
| Screen Size | window.screen | ✅ |
| Viewport Size | window.innerWidth/Height | ✅ |
| Timezone | Intl API | ✅ |
| Language | navigator.language | ✅ |

**NOT:** IP adresi ve cookie kullanılmıyor.

### Supabase Limitleri

| Tier | Database | Bandwidth |
|------|----------|-----------|
| Free | 500MB | 2GB |
| Pro | 8GB | 50GB |

**Öneriler:**
- Yüksek trafik için Pro plan
- Materialized view refresh CPU yoğun olabilir
- Analytics tabloları için ayrı partition düşünülebilir

### Kaynaklar

| Kaynak | Link |
|--------|------|
| SWR Docs | https://swr.vercel.app |
| Recharts Docs | https://recharts.org |
| NumberFlow | https://number-flow.barvian.me |
| date-fns | https://date-fns.org |
| Supabase Materialized Views | https://supabase.com/docs/guides/database/tables |
| Supabase RLS | https://supabase.com/docs/guides/auth/row-level-security |
| Web Crypto API | https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto |

---

## 📊 İlerleme Takibi

### Faz 1: Temel Altyapı & Ürün Analytics
| Görev | Durum | Tarih |
|-------|-------|-------|
| Paket kurulumu | ⏳ Bekliyor | - |
| Server actions | ⏳ Bekliyor | - |
| Bileşen güncelleme | ⏳ Bekliyor | - |
| Mock data temizliği | ⏳ Bekliyor | - |

### Faz 2: Ziyaretçi Tracking Sistemi
| Görev | Durum | Tarih |
|-------|-------|-------|
| Database migration | ⏳ Bekliyor | - |
| Tracking library | ⏳ Bekliyor | - |
| Analytics provider | ⏳ Bekliyor | - |
| Server actions | ⏳ Bekliyor | - |

### Faz 3: Analytics Dashboard UI
| Görev | Durum | Tarih |
|-------|-------|-------|
| Sayfa yapısı | ⏳ Bekliyor | - |
| Stat kartları | ⏳ Bekliyor | - |
| Grafikler | ⏳ Bekliyor | - |
| Tablolar | ⏳ Bekliyor | - |

### Faz 4: Optimizasyon & Polish
| Görev | Durum | Tarih |
|-------|-------|-------|
| Materialized views | ⏳ Bekliyor | - |
| Auto-refresh | ⏳ Bekliyor | - |
| Custom events | ⏳ Bekliyor | - |
| Performance test | ⏳ Bekliyor | - |

---

> **Sonraki Adım:** Faz 1 ile başlamak için `bun add swr @number-flow/react date-fns` komutunu çalıştırın.
