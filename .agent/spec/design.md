
# 🗄️ Database & Design

## 📦 Database Schema (Neon / Drizzle)

### Products Table
| Field | Type | Description |
|-------|------|-------------|
| `id` | UUID | Primary key |
| `name` | string | Product name (required) |
| `slug` | string | URL-friendly unique identifier (UNIQUE) |
| `description` | string? | Product description |
| `categoryId` | UUID | FK → categories (id) |
| `status` | enum | active, draft, archived |
| `pricePerSqm` | decimal? | Unit price per m² |
| `currency` | string? | TRY, USD, EUR |
| `thumbnail` | string? | Cover image URL (Vercel Blob) |
| `images` | string[]? | Additional images |
| `originCountry` | string? | Country of origin |
| `originRegion` | string? | Region of origin |
| `colorPrimary` | string? | Primary color |
| `colorSecondary` | string? | Secondary color |
| `pattern` | enum? | veined, speckled, uniform... |
| `finishTypes` | enum[]? | polished, honed, brushed... |
| `density` | decimal? | Density |
| `waterAbsorption` | decimal? | Water absorption rate (%) |
| `compressiveStrength` | decimal? | Compressive strength |
| `flexuralStrength` | decimal? | Flexural strength |
| `abrasionResistance` | string? | Abrasion resistance |
| `hardnessMohs` | decimal? | Mohs hardness (1-10) |
| `frostResistant` | boolean | Frost resistance |
| `availableThicknesses` | decimal[]? | Available thicknesses (mm) |
| `maxSlabWidth` | decimal? | Max slab width |
| `maxSlabLength` | decimal? | Max slab length |
| `minOrderQuantity` | decimal | Min order quantity |
| `applications` | enum[]? | flooring, wall_cladding, countertops... |
| `isSuitableForExterior` | boolean | Suitable for exterior |
| `isSuitableForKitchen` | boolean | Suitable for kitchen |
| `seoTitle` | string? | SEO title |
| `seoDescription` | string? | SEO description |
| `tags` | string[]? | Tags |
| `createdAt` | timestamp | Creation date |
| `updatedAt` | timestamp | Update date |
| `createdBy` | string? | Creator user ID |

### Categories Table
| Field | Type | Description |
|-------|------|-------------|
| `id` | UUID | Primary key |
| `name` | string | Category name |
| `slug` | string | URL-friendly unique identifier |
| `description` | string? | Description |
| `imageUrl` | string? | Cover image (Vercel Blob) |
| `seoTitle` | string? | SEO title |
| `seoDescription` | string? | SEO description |
| `createdAt` | timestamp | Creation date |
| `updatedAt` | timestamp | Update date |

### Auth Tables (Better Auth)
- `user`, `session`, `account`, `verification` standard tables.



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

## ⚙️ Environment Variables

```env
DATABASE_URL=<neon_connection_string>
BETTER_AUTH_SECRET=<random_secret>
BLOB_READ_WRITE_TOKEN=<vercel_blob_token>
NEXT_PUBLIC_APP_URL=<app_url>
```
