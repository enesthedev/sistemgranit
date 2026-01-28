# 📋 Sistem Granit - Proje Bağlamı

> **Son Güncelleme:** 2026-01-28T19:49:43+03:00  
> **Versiyon:** 1.0.0  
> Bu dosya yapay zeka tarafından her görev başlangıcında kontrol edilir ve görev sonunda güncellenir.

---

## 🎯 Proje Özeti

**Sistem Granit**, doğal taş (mermer, granit, traverten vb.) ürünleri yönetimi için geliştirilmiş B2B odaklı bir web uygulamasıdır. Admin paneli aracılığıyla ürün yönetimi, görsel yükleme ve SEO optimizasyonu sağlar.

---

## 🛠️ Teknoloji Stack'i

| Kategori | Teknoloji | Versiyon |
|----------|-----------|----------|
| **Framework** | Next.js | latest |
| **Runtime** | Bun | - |
| **Dil** | TypeScript | ^5 |
| **Backend** | Supabase (BaaS) | latest |
| **Stil** | Tailwind CSS | ^4.1.18 |
| **UI Kütüphanesi** | Radix UI + Custom Components | - |
| **Form Yönetimi** | Formik + Yup | ^2.4.9 / ^1.7.1 |
| **Validasyon** | Zod | ^4.3.5 |
| **i18n** | next-intl | ^4.7.0 |
| **İkonlar** | Tabler Icons + Lucide React | - |
| **Tablo** | TanStack Table | ^8.21.3 |
| **Grafikler** | Recharts | 2.15.4 |
| **Sürükle-Bırak** | @dnd-kit | ^6.3.1+ |
| **Bildirimler** | Sonner | ^2.0.7 |

---

## 📁 Proje Yapısı

```
sistemgranit/
├── .agent/                    # AI workflow'ları
│   └── workflows/
│       └── supabase-migrations.md
├── .gemini/                   # AI konfigürasyonu
│   └── PROJECT_CONTEXT.md     # ← BU DOSYA
├── actions/                   # Server Actions
│   ├── products/              # Ürün CRUD işlemleri
│   │   ├── create-product.ts
│   │   ├── update-product.ts
│   │   ├── delete-product.ts
│   │   ├── get-product.ts
│   │   └── get-products.ts
│   └── storage/               # Depolama işlemleri
├── app/
│   ├── [locale]/              # i18n route'ları
│   │   ├── auth/              # Kimlik doğrulama sayfaları
│   │   │   ├── sign-in/
│   │   │   ├── confirm/
│   │   │   ├── error/
│   │   │   ├── update-password/
│   │   │   └── sign-up-success/
│   │   ├── dashboard/         # Admin paneli
│   │   │   ├── components/    # Dashboard bileşenleri
│   │   │   │   ├── sidebar/   # Sidebar navigasyon
│   │   │   │   ├── header/
│   │   │   │   ├── cards/
│   │   │   │   ├── charts/
│   │   │   │   └── tables/
│   │   │   ├── products/      # Ürün yönetimi
│   │   │   │   ├── components/
│   │   │   │   │   └── form/  # Multi-step product form
│   │   │   │   ├── [id]/      # Ürün düzenleme
│   │   │   │   └── new/       # Yeni ürün
│   │   │   ├── layout.tsx
│   │   │   └── page.tsx
│   │   ├── onboarding/        # Kullanıcı kayıt
│   │   ├── layout.tsx         # Root layout (i18n)
│   │   └── page.tsx           # Ana sayfa
│   ├── components/            # Paylaşılan bileşenler
│   │   ├── ui/                # UI primitives (26 bileşen)
│   │   └── form/              # Form bileşenleri (12 bileşen)
│   ├── constants/             # Sabitler
│   │   └── product.ts         # Ürün kategorileri, durumlar vb.
│   ├── hooks/                 # Custom hooks
│   │   └── use-current-user.ts
│   ├── proxies/               # Middleware/Guard'lar
│   │   ├── with-auth-guard.ts
│   │   ├── with-guest-guard.ts
│   │   ├── with-i18n.ts
│   │   ├── with-onboarding.ts
│   │   └── with-supabase-session.ts
│   ├── routes/                # Routing konfigürasyonu
│   │   ├── config.ts          # ROUTES objesi
│   │   ├── navigation.ts      # Nav item tanımları
│   │   ├── pathnames.ts       # i18n pathname'ler
│   │   └── types.ts
│   ├── utils/                 # Utility fonksiyonları
│   │   ├── cn.ts              # Class names merger
│   │   ├── slug.ts            # Slug generation
│   │   └── slug-redirect.ts   # Slug redirect helper
│   ├── validations/           # Zod şemaları
│   │   └── product.ts         # Ürün validasyonları
│   ├── env.ts                 # Environment variables (t3-oss/env)
│   └── globals.css            # Tailwind + CSS variables
├── lib/
│   ├── i18n/                  # Internationalization
│   │   ├── routing.ts         # next-intl routing
│   │   ├── request.ts
│   │   ├── navigation.ts
│   │   └── utils/
│   │       └── get-localized-paths.ts  # Lokalize path utility
│   └── proxy-chain/           # Proxy chain utilities
├── supabase/
│   ├── migrations/            # Database migrations
│   ├── database.types.ts      # Generated types
│   ├── browser.ts             # Client-side Supabase
│   ├── server.ts              # Server-side Supabase
│   └── admin.ts               # Admin Supabase client
├── types/                     # TypeScript tipleri
│   └── product.ts             # Ürün tipi
└── public/                    # Statik dosyalar
```

---

## 🗄️ Veritabanı Şeması

### Products Tablosu
| Alan | Tip | Açıklama |
|------|-----|----------|
| `id` | UUID | Primary key |
| `name` | string | Ürün adı (zorunlu) |
| `slug` | string | URL-friendly benzersiz tanımlayıcı |
| `description` | string? | Ürün açıklaması |
| `category` | enum | marble, granite, travertine, onyx, limestone, quartzite |
| `status` | enum | active, draft, archived |
| `price_per_sqm` | number? | m² birim fiyatı |
| `currency` | string? | TRY, USD, EUR |
| `thumbnail` | string? | Kapak görseli URL |
| `images` | string[]? | Ek görseller |
| `origin_country` | string? | Menşei ülke |
| `origin_region` | string? | Menşei bölge |
| `color_primary` | string? | Ana renk |
| `color_secondary` | string? | İkincil renk |
| `pattern` | enum? | veined, speckled, uniform, cloudy, flowery, layered |
| `finish_types` | enum[]? | polished, honed, brushed, flamed, tumbled, sandblasted, leathered |
| `density` | number? | Yoğunluk |
| `water_absorption` | number? | Su emme oranı (%) |
| `compressive_strength` | number? | Basınç dayanımı |
| `flexural_strength` | number? | Eğilme dayanımı |
| `abrasion_resistance` | string? | Aşınma direnci |
| `hardness_mohs` | number? | Mohs sertlik (1-10) |
| `frost_resistant` | boolean | Don dayanımı |
| `available_thicknesses` | number[]? | Mevcut kalınlıklar (mm) |
| `max_slab_width` | number? | Maks plaka genişliği |
| `max_slab_length` | number? | Maks plaka uzunluğu |
| `min_order_quantity` | number | Min sipariş miktarı |
| `applications` | enum[]? | flooring, wall_cladding, countertops, stairs, bathroom, outdoor, pool, fireplace |
| `is_suitable_for_exterior` | boolean | Dış mekan uygunluğu |
| `is_suitable_for_kitchen` | boolean | Mutfak uygunluğu |
| `seo_title` | string? | SEO başlık |
| `seo_description` | string? | SEO açıklama |
| `tags` | string[]? | Etiketler |
| `created_at` | timestamp | Oluşturulma tarihi |
| `updated_at` | timestamp | Güncellenme tarihi |
| `created_by` | UUID? | Oluşturan kullanıcı |

### Slug History Tablosu
| Alan | Tip | Açıklama |
|------|-----|----------|
| `id` | UUID | Primary key |
| `product_id` | UUID | FK → products |
| `old_slug` | string | Eski slug |
| `new_slug` | string | Yeni slug |
| `created_at` | timestamp | Değişiklik tarihi |

---

## 🔐 Kimlik Doğrulama & Yetkilendirme

- **Provider:** Supabase Auth
- **Akış:**
  1. `/auth/sign-in` - Email/Password login
  2. `/onboarding` - Yeni kullanıcı kaydı
  3. `/auth/confirm` - Email doğrulama
  4. `/auth/update-password` - Şifre sıfırlama
- **Guard'lar:**
  - `with-auth-guard.ts` - Auth gerektiren sayfalar
  - `with-guest-guard.ts` - Sadece guest erişim
  - `with-onboarding.ts` - Onboarding kontrolü

---

## 🌐 Internationalization (i18n)

- **Kütüphane:** next-intl ^4.7.0
- **Desteklenen Diller:** Türkçe (tr) - varsayılan
- **Locale Prefix:** `as-needed`
- **Yapı:**
  - `lib/i18n/routing.ts` - Route tanımları
  - `lib/i18n/utils/get-localized-paths.ts` - Lokalize path helper
  - `app/routes/pathnames.ts` - Lokalize URL'ler
  - `app/routes/navigation.ts` - Navigasyon itemleri

---

## 📝 Form Yapısı

### Product Form (Multi-Step)
**Konum:** `app/[locale]/dashboard/products/components/form/`

| Adım | Component | Alanlar |
|------|-----------|---------|
| 1 | BasicInfoStep | name, category, status, description, price, images |
| 2 | PhysicalPropertiesStep | origin, colors, pattern, finishes |
| 3 | TechnicalDetailsStep | density, strength, hardness, frost |
| 4 | DimensionsStep | thicknesses, slab dimensions, min order |
| 5 | SeoStep | seo_title, seo_description, tags, applications |

**Özellikler:**
- Lazy loading (React.lazy + Suspense)
- Error boundary ile hata yönetimi
- Formik + Yup validasyon
- URL-based step navigation
- Skeleton loading states

---

## 🧩 UI Bileşenleri

### Core UI (`app/components/ui/`)
- alert-dialog, avatar, badge, breadcrumb, button, card
- chart, checkbox, collapsible, drawer, dropdown-menu
- input, label, popover, select, separator, sheet
- sidebar, skeleton, sonner, switch, table, tabs
- toggle, toggle-group, tooltip

### Form Bileşenleri (`app/components/form/`)
- form-array-number, form-checkbox, form-field
- form-file-upload/, form-input, form-multi-select
- form-number-input, form-select, form-switch
- form-tag-input, form-textarea

---

## ⚙️ Environment Variables

```env
NEXT_PUBLIC_SUPABASE_URL=<supabase_url>
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=<anon_key>
SUPABASE_SERVICE_ROLE_OR_SECRET_KEY=<service_key>
```

---

## 📜 Komutlar

```bash
# Development
bun run dev

# Build
bun run build

# Lint
bun run lint

# Supabase CLI
bunx supabase migration new <name>
bunx supabase db push
bunx supabase gen types typescript --project-id <id> > supabase/database.types.ts
```

---

## 📌 Kodlama Standartları

1. **Dosya Adlandırma:** kebab-case (örn: `form-input.tsx`)
2. **Component Adlandırma:** PascalCase (örn: `FormInput`)
3. **Dil:** Türkçe UI metinleri, İngilizce kod
4. **Import Sırası:** 
   - React/Next.js
   - External packages
   - Internal modules (@ alias)
   - Relative imports
5. **Component Yapısı:**
   - Props interface
   - Component function
   - Helper functions
6. **Server Actions:** `"use server"` direktifi ile
7. **Client Components:** `"use client"` direktifi ile

---

## 🚧 Bilinen Sorunlar & TODO

1. ~~FilePond entegrasyonu~~ → Custom file upload'a geçildi
2. Multi-language desteği genişletilecek (en, de)
3. Product image drag-and-drop sıralama
4. Bulk product import/export
5. Analytics dashboard

---

## 📚 Referans Dökümanlar

- `.agent/workflows/supabase-migrations.md` - Migration workflow'u
- `PRODUCT_FORM_FIX.md` - Form refactoring planı (mevcut ise)

---

## 🔄 Güncelleme Geçmişi

| Tarih | Değişiklik |
|-------|------------|
| 2026-01-28 | İlk versiyon oluşturuldu |
| 2026-01-28 | Sidebar navigasyon active state düzeltildi - `getLocalizedPaths` utility kullanılarak dashboard ve alt sayfalar için doğru active state belirleme |
