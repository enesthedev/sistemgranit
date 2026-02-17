# 🗄️ Database & Design

## 📦 Database Schema (Supabase)

### Products Table
| Field | Type | Description |
|-------|------|-------------|
| `id` | UUID | Primary key |
| `name` | string | Product name (required) |
| `slug` | string | URL-friendly unique identifier (UNIQUE) |
| `description` | string? | Product description |
| `category` | enum | *deprecated* marble, granite, travertine... |
| `category_id` | UUID? | FK → categories |
| `status` | enum | active, draft, archived |
| `price_per_sqm` | number? | Unit price per m² |
| `currency` | string? | TRY, USD, EUR |
| `thumbnail` | string? | Cover image URL |
| `images` | string[]? | Additional images |
| `origin_country` | string? | Country of origin |
| `origin_region` | string? | Region of origin |
| `color_primary` | string? | Primary color |
| `color_secondary` | string? | Secondary color |
| `pattern` | enum? | veined, speckled, uniform... |
| `finish_types` | enum[]? | polished, honed, brushed... |
| `density` | number? | Density |
| `water_absorption` | number? | Water absorption rate (%) |
| `compressive_strength` | number? | Compressive strength |
| `flexural_strength` | number? | Flexural strength |
| `abrasion_resistance` | string? | Abrasion resistance |
| `hardness_mohs` | number? | Mohs hardness (1-10) |
| `frost_resistant` | boolean | Frost resistance |
| `available_thicknesses` | number[]? | Available thicknesses (mm) |
| `max_slab_width` | number? | Max slab width |
| `max_slab_length` | number? | Max slab length |
| `min_order_quantity` | number | Min order quantity |
| `applications` | enum[]? | flooring, wall_cladding, countertops... |
| `is_suitable_for_exterior` | boolean | Suitable for exterior |
| `is_suitable_for_kitchen` | boolean | Suitable for kitchen |
| `seo_title` | string? | SEO title |
| `seo_description` | string? | SEO description |
| `tags` | string[]? | Tags |
| `created_at` | timestamp | Creation date |
| `updated_at` | timestamp | Update date |
| `created_by` | UUID? | Creator user |

### Categories Table
| Field | Type | Description |
|-------|------|-------------|
| `id` | UUID | Primary key |
| `name` | string | Category name |
| `slug` | string | URL-friendly unique identifier |
| `description` | string? | Description |
| `image_url` | string? | Cover image (Supabase Storage) |
| `seo_title` | string? | SEO title |
| `seo_description` | string? | SEO description |
| `created_at` | timestamp | Creation date |
| `updated_at` | timestamp | Update date |

### Slug History Table
| Field | Type | Description |
|-------|------|-------------|
| `id` | UUID | Primary key |
| `product_id` | UUID | FK → products |
| `old_slug` | string | Old slug |
| `new_slug` | string | New slug |
| `created_at` | timestamp | Change date |

## 📝 Form Structure

### Product Form (Multi-Step)
**Location:** `app/[locale]/dashboard/products/components/form/`

| Step | Component | Fields |
|------|-----------|--------|
| 1 | BasicInfoStep | name, category_id, status, description, price, images |
| 2 | PhysicalPropertiesStep | origin, colors, pattern, finishes |
| 3 | TechnicalDetailsStep | density, strength, hardness, frost |
| 4 | DimensionsStep | thicknesses, slab dimensions, min order |
| 5 | SeoStep | seo_title, seo_description, tags, applications |

### Category Form (Multi-Step)
**Location:** `app/[locale]/dashboard/categories/components/form/`

| Step | Component | Fields |
|------|-----------|--------|
| 1 | BasicInfoStep | name, slug, description, image_url (FileUpload) |
| 2 | SeoStep | seo_title, seo_description |

**Features:**
- Lazy loading (React.lazy + Suspense)
- Error handling via Error Boundary
- Formik + Zod validation
- URL-based step navigation
- Skeleton loading states

## 🧩 UI Components

### Core UI (`app/components/ui/`)
- alert-dialog, avatar, badge, breadcrumb, button, card
- chart, checkbox, collapsible, drawer, dropdown-menu
- input, label, popover, select, separator, sheet
- sidebar, skeleton, sonner, switch, table, tabs
- toggle, toggle-group, tooltip

### Form Components (`app/components/form/`)
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
