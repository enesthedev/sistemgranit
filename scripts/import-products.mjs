/**
 * Imports the real product catalogue from the brand photo folders under
 * `public/internet sitesi için fotoğraflar/`.
 *
 * Folder shape:
 *   <BRAND>/<PRICE TIER>/<product>.jpg   → price taken from the tier folder name
 *   <BRAND>/<product>.jpg                → no price tier (price left empty)
 *
 * Product name + code are parsed from the file name. Each brand becomes a
 * `categories` doc (the site groups/filters products by brand).
 *
 * WARNING: this wipes products, projects, categories, media and contact
 * submissions, then reseeds brand assets + brands + products.
 *
 *   bun run import:products
 */
import { getPayload } from 'payload'
import fs from 'node:fs'
import path from 'node:path'
import config from '../src/payload.config.ts'
import { slugify } from '../src/lib/slugify.ts'

const ROOT = path.resolve('public/internet sitesi için fotoğraflar')
const IMAGE_RE = /\.(jpe?g|webp|png)$/i

const payload = await getPayload({ config })

/** Brands in display order. Slugs are explicit (Turkish chars → ascii). */
const BRANDS = [
  { name: 'ARTEO', slug: 'arteo', dir: 'ARTEO', order: 1 },
  { name: 'BELENCO', slug: 'belenco', dir: 'BELENCO', order: 2 },
  { name: 'ÇİMSTONE', slug: 'cimstone', dir: 'ÇİMSTONE', order: 3 },
  { name: 'COANTE', slug: 'coante', dir: 'COANTE', order: 4 },
]

/** First integer (3–6 digits) in a price-tier folder name, else undefined. */
function parsePrice(dirName) {
  const m = dirName.match(/(\d{3,6})/)
  return m ? parseInt(m[1], 10) : undefined
}

/** Turkish-aware title case for a single word. */
function titleWord(w) {
  if (!w) return w
  return w.charAt(0).toLocaleUpperCase('tr') + w.slice(1).toLocaleLowerCase('tr')
}

/** Parse a file name into { title, code }. Code may be a leading or trailing number. */
function parseName(fileName) {
  let base = fileName.replace(IMAGE_RE, '')
  base = base.replace(/^[\s,._-]+/, '').trim()

  let code
  let rest = base
  let m
  if ((m = base.match(/^(\d{2,6})[\s._-]+(.+)$/))) {
    code = m[1]
    rest = m[2]
  } else if ((m = base.match(/^(.+?)[\s._-]+(\d{2,6})$/))) {
    rest = m[1]
    code = m[2]
  } else if ((m = base.match(/^(\d{2,6})([A-Za-zçÇğĞıİöÖşŞüÜ].*)$/))) {
    // digits glued to the name, e.g. "2219calacattavenezia"
    code = m[1]
    rest = m[2]
  }

  const title = rest
    .replace(/[_-]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .split(' ')
    .map(titleWord)
    .join(' ')

  return { title, code }
}

/** Collect { brand, file (abs), fileName, price } for every product image. */
function collectProducts() {
  const items = []
  const brandCover = {}
  for (const brand of BRANDS) {
    const brandPath = path.join(ROOT, brand.dir)
    for (const entry of fs.readdirSync(brandPath, { withFileTypes: true })) {
      if (entry.name === '.DS_Store') continue
      if (entry.isDirectory()) {
        const price = parsePrice(entry.name)
        // "çok satan" tiers are the shop's best-sellers → surface on the homepage.
        // Folder names come from macOS in decomposed form (NFD); normalise first.
        const featured = /çok\s*satan/i.test(entry.name.normalize('NFC'))
        const tierPath = path.join(brandPath, entry.name)
        for (const f of fs.readdirSync(tierPath)) {
          if (!IMAGE_RE.test(f)) continue
          const file = path.join(tierPath, f)
          items.push({ brand: brand.slug, file, fileName: f, price, featured })
          brandCover[brand.slug] ??= file
        }
      } else if (IMAGE_RE.test(entry.name)) {
        const file = path.join(brandPath, entry.name)
        items.push({ brand: brand.slug, file, fileName: entry.name, price: undefined, featured: false })
        brandCover[brand.slug] ??= file
      }
    }
  }
  return { items, brandCover }
}

async function createMedia(filePath, alt) {
  const doc = await payload.create({ collection: 'media', data: { alt }, filePath })
  return doc.id
}

// ── Wipe ──────────────────────────────────────────────────────
for (const c of ['products', 'projects', 'categories', 'media', 'contact-submissions']) {
  await payload.delete({ collection: c, where: { id: { exists: true } } })
}
console.log('Wiped existing content.')

// ── Brand assets (logo + favicon) ─────────────────────────────
for (const [repoPath, alt] of [
  ['public/sistem-granit.png', 'Sistem Granit logo'],
  ['src/app/icon.png', 'Sistem Granit favicon'],
]) {
  const abs = path.resolve(repoPath)
  if (fs.existsSync(abs)) await createMedia(abs, alt)
}
console.log('Brand assets created.')

// ── Brands (as categories) ────────────────────────────────────
const { items, brandCover } = collectProducts()

const brandIds = {}
for (const brand of BRANDS) {
  const coverFile = brandCover[brand.slug]
  const image = coverFile ? await createMedia(coverFile, `${brand.name} marka görseli`) : undefined
  const doc = await payload.create({
    collection: 'categories',
    data: { name: brand.name, slug: brand.slug, order: brand.order, image },
  })
  brandIds[brand.slug] = doc.id
}
console.log(`Brands created: ${BRANDS.map((b) => b.name).join(', ')}`)

// ── Products ──────────────────────────────────────────────────
const usedSlugs = new Set()
function uniqueSlug(baseParts, brandSlug) {
  const base = slugify(baseParts.filter(Boolean).join(' '))
  let slug = base
  if (usedSlugs.has(slug)) slug = `${base}-${brandSlug}`
  let i = 2
  while (usedSlugs.has(slug)) slug = `${base}-${brandSlug}-${i++}`
  usedSlugs.add(slug)
  return slug
}

let created = 0
let priceless = 0
for (const item of items) {
  const { title, code } = parseName(item.fileName)
  const slug = uniqueSlug([title, code], item.brand)
  const media = await createMedia(item.file, title)
  await payload.create({
    collection: 'products',
    data: {
      title,
      slug,
      category: brandIds[item.brand],
      ...(item.price != null ? { price: item.price } : {}),
      ...(code ? { code } : {}),
      images: [{ image: media }],
      featured: item.featured,
    },
  })
  created++
  if (item.price == null) priceless++
}

console.log(`Products created: ${created} (${priceless} without price).`)
console.log('Import complete.')
process.exit(0)
