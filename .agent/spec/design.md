# 🗄️ Veritabanı ve Tasarım

## 📦 Veritabanı Şeması (Supabase)

### Products Tablosu
| Alan | Tip | Açıklama |
|------|-----|----------|
| `id` | UUID | Primary key |
| `name` | string | Ürün adı (zorunlu) |
| `slug` | string | URL-friendly benzersiz tanımlayıcı (UNIQUE) |
| `description` | string? | Ürün açıklaması |
| `category` | enum | *deprecated* marble, granite, travertine... |
| `category_id` | UUID? | FK → categories |
| `status` | enum | active, draft, archived |
| `price_per_sqm` | number? | m² birim fiyatı |
| `currency` | string? | TRY, USD, EUR |
| `thumbnail` | string? | Kapak görseli URL |
| `images` | string[]? | Ek görseller |
| `origin_country` | string? | Menşei ülke |
| `origin_region` | string? | Menşei bölge |
| `color_primary` | string? | Ana renk |
| `color_secondary` | string? | İkincil renk |
| `pattern` | enum? | veined, speckled, uniform... |
| `finish_types` | enum[]? | polished, honed, brushed... |
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
| `applications` | enum[]? | flooring, wall_cladding, countertops... |
| `is_suitable_for_exterior` | boolean | Dış mekan uygunluğu |
| `is_suitable_for_kitchen` | boolean | Mutfak uygunluğu |
| `seo_title` | string? | SEO başlık |
| `seo_description` | string? | SEO açıklama |
| `tags` | string[]? | Etiketler |
| `created_at` | timestamp | Oluşturulma tarihi |
| `updated_at` | timestamp | Güncellenme tarihi |
| `created_by` | UUID? | Oluşturan kullanıcı |

### Categories Tablosu
| Alan | Tip | Açıklama |
|------|-----|----------|
| `id` | UUID | Primary key |
| `name` | string | Kategori adı |
| `slug` | string | URL-friendly benzersiz tanımlayıcı |
| `description` | string? | Açıklama |
| `image_url` | string? | Kapak görseli (Supabase Storage) |
| `seo_title` | string? | SEO başlık |
| `seo_description` | string? | SEO açıklama |
| `created_at` | timestamp | Oluşturulma tarihi |
| `updated_at` | timestamp | Güncellenme tarihi |

### Slug History Tablosu
| Alan | Tip | Açıklama |
|------|-----|----------|
| `id` | UUID | Primary key |
| `product_id` | UUID | FK → products |
| `old_slug` | string | Eski slug |
| `new_slug` | string | Yeni slug |
| `created_at` | timestamp | Değişiklik tarihi |

## 📝 Form Yapısı

### Product Form (Multi-Step)
**Konum:** `app/[locale]/dashboard/products/components/form/`

| Adım | Component | Alanlar |
|------|-----------|---------|
| 1 | BasicInfoStep | name, category_id, status, description, price, images |
| 2 | PhysicalPropertiesStep | origin, colors, pattern, finishes |
| 3 | TechnicalDetailsStep | density, strength, hardness, frost |
| 4 | DimensionsStep | thicknesses, slab dimensions, min order |
| 5 | SeoStep | seo_title, seo_description, tags, applications |

### Category Form (Multi-Step)
**Konum:** `app/[locale]/dashboard/categories/components/form/`

| Adım | Component | Alanlar |
|------|-----------|---------|
| 1 | BasicInfoStep | name, slug, description, image_url (FileUpload) |
| 2 | SeoStep | seo_title, seo_description |

**Özellikler:**
- Lazy loading (React.lazy + Suspense)
- Error boundary ile hata yönetimi
- Formik + Zod validasyon
- URL-based step navigation
- Skeleton loading states

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

## ⚙️ Environment Variables

```env
NEXT_PUBLIC_SUPABASE_URL=<supabase_url>
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=<anon_key>
SUPABASE_SERVICE_ROLE_OR_SECRET_KEY=<service_key>
```
