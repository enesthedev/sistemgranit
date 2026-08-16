import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ChevronRight, MessageCircle, Phone } from 'lucide-react'

import type { Product } from '@/payload-types'

import { getProductBySlug, getProducts } from '@/lib/queries'
import { SITE_URL, site, whatsappUrl } from '@/lib/site'
import { jsonLd } from '@/lib/json-ld'
import { APPLICATION_LABELS, FINISH_LABELS, labelsFrom } from '@/lib/labels'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ProductGallery } from '@/components/products/product-gallery'
import { ProductGrid } from '@/components/products/product-grid'
import { RichText } from '@/components/rich-text'
import { SectionHeading } from '@/components/section-heading'

type Params = { params: Promise<{ slug: string }> }

// The 158 product pages are the catalogue's main organic entry points, so they
// are prerendered and then kept fresh with ISR rather than hitting Postgres on
// every request. `dynamicParams` stays on by default, so a product added in the
// panel still resolves on first request and is cached from then on.
export const revalidate = 300

export async function generateStaticParams() {
  const products = await getProducts({ limit: 1000 })
  return products.filter((p) => p.slug).map((p) => ({ slug: p.slug as string }))
}

/**
 * Builds a distinct, intent-carrying description per product. The old template
 * ("X — Sistem Granit doğal taş koleksiyonu.") was 45 characters and identical
 * across all 158 pages, so every SERP snippet looked like a duplicate.
 */
function productDescription(product: Product, brand?: string | null) {
  const facts = [
    brand && `${brand} markalı kompozit taş (quartz) tezgah`,
    product.color && `${product.color} rengi`,
    product.specs?.thickness && `${product.specs.thickness} kalınlık`,
  ].filter(Boolean)

  const price =
    typeof product.price === 'number'
      ? ` Fiyat: ${product.price.toLocaleString('tr-TR')} ₺.`
      : ''

  return `${product.title}: ${facts.join(', ')}. Mutfak ve banyo tezgahı için ölçü, kesim ve montaj dahil.${price}`.slice(
    0,
    300,
  )
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params
  const product = await getProductBySlug(slug)
  if (!product) return { title: 'Ürün bulunamadı', robots: { index: false, follow: true } }

  const brand = typeof product.category === 'object' ? product.category?.name : null
  const description = productDescription(product, brand)
  const title = brand ? `${product.title} — ${brand} Kompozit Tezgah` : `${product.title} Tezgah`
  const cover = product.images?.[0]?.image
  const coverUrl = typeof cover === 'object' && cover ? cover.url : null

  return {
    title,
    description,
    alternates: { canonical: `/urunler/${slug}` },
    openGraph: {
      type: 'website',
      title,
      description,
      url: `/urunler/${slug}`,
      ...(coverUrl ? { images: [{ url: coverUrl, alt: product.title }] } : {}),
    },
  }
}

export default async function ProductDetailPage({ params }: Params) {
  const { slug } = await params
  const product = await getProductBySlug(slug)
  if (!product) notFound()

  const category = typeof product.category === 'object' ? product.category : null
  const finishes = labelsFrom(FINISH_LABELS, product.finish)
  const applications = labelsFrom(APPLICATION_LABELS, product.applications)

  const specs = [
    {
      k: 'Fiyat',
      v:
        typeof product.price === 'number'
          ? `${product.price.toLocaleString('tr-TR')} ₺`
          : undefined,
    },
    { k: 'Marka', v: category?.name },
    { k: 'Renk', v: product.color },
    { k: 'Menşei', v: product.origin },
    { k: 'Kalınlık', v: product.specs?.thickness },
    { k: 'Ebatlar', v: product.specs?.sizes },
  ].filter((s) => s.v)

  const related = category?.slug
    ? (await getProducts({ category: category.slug, limit: 5 }))
        .filter((p) => p.id !== product.id)
        .slice(0, 4)
    : []

  const inquiry = whatsappUrl(`Merhaba, "${product.title}" ürünü için teklif almak istiyorum.`)

  const cover = product.images?.[0]?.image
  const coverUrl = typeof cover === 'object' && cover ? cover.url : null
  const productUrl = `${SITE_URL}/urunler/${product.slug}`

  const productLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.title,
    // Absolute — schema.org image URLs must be resolvable on their own.
    ...(coverUrl ? { image: [`${SITE_URL}${coverUrl}`] } : {}),
    ...(product.color ? { color: product.color } : {}),
    ...(product.code ? { sku: product.code, mpn: product.code } : {}),
    description: productDescription(product, category?.name),
    ...(category ? { category: category.name } : {}),
    // The manufacturer's brand, not ours — we fabricate and install it.
    brand: { '@type': 'Brand', name: category?.name ?? site.name },
    ...(typeof product.price === 'number'
      ? {
          // A plain Offer, matching the definite price shown on the page.
          // Google flags structured data whose price disagrees with the visible
          // one, so these two must be changed together.
          offers: {
            '@type': 'Offer',
            priceCurrency: 'TRY',
            price: product.price,
            availability: 'https://schema.org/InStock',
            url: productUrl,
            seller: { '@type': 'Organization', name: site.name },
          },
        }
      : {}),
    url: productUrl,
  }
  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Ana Sayfa', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Ürünler', item: `${SITE_URL}/urunler` },
      ...(category?.slug
        ? [
            {
              '@type': 'ListItem',
              position: 3,
              name: category.name,
              item: `${SITE_URL}/urunler/kategori/${category.slug}`,
            },
          ]
        : []),
      {
        '@type': 'ListItem',
        position: category?.slug ? 4 : 3,
        name: product.title,
        item: `${SITE_URL}/urunler/${product.slug}`,
      },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(productLd)} />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(breadcrumbLd)} />

      <div className="container-page pt-10">
        {/* Mirrors breadcrumbLd exactly — Google expects the visible trail and
            the BreadcrumbList to agree, so the brand step belongs here too. */}
        <nav
          aria-label="Site haritası"
          className="flex flex-wrap items-center gap-1 font-mono text-xs uppercase tracking-widest text-stone-muted"
        >
          <Link href="/" className="hover:text-foreground">Ana Sayfa</Link>
          <ChevronRight className="size-3.5" />
          <Link href="/urunler" className="hover:text-foreground">Ürünler</Link>
          {category?.slug && (
            <>
              <ChevronRight className="size-3.5" />
              <Link href={`/urunler/kategori/${category.slug}`} className="hover:text-foreground">
                {category.name}
              </Link>
            </>
          )}
          <ChevronRight className="size-3.5" />
          <span className="text-foreground">{product.title}</span>
        </nav>
      </div>

      <article className="container-page grid gap-12 py-10 lg:grid-cols-2 lg:gap-16">
        <ProductGallery images={product.images ?? []} title={product.title} />

        <div className="lg:py-2">
          {category && (
            <Link
              href={`/urunler/kategori/${category.slug}`}
              className="eyebrow transition-colors hover:text-brand"
            >
              {category.name}
            </Link>
          )}
          <h1 className="mt-3 font-display text-4xl tracking-tight text-balance md:text-5xl">
            {product.title}
          </h1>

          {/* Spec ledger — the datasheet signature */}
          {specs.length > 0 && (
            <dl className="mt-8 border-t border-vein">
              {specs.map((s) => (
                <div
                  key={s.k}
                  className="flex items-baseline justify-between gap-4 border-b border-vein py-3"
                >
                  <dt className="font-mono text-xs uppercase tracking-[0.18em] text-stone-muted">
                    {s.k}
                  </dt>
                  <dd className="text-right text-sm font-medium text-foreground">{s.v}</dd>
                </div>
              ))}
            </dl>
          )}

          {(finishes.length > 0 || applications.length > 0) && (
            <div className="mt-8 space-y-5">
              {finishes.length > 0 && (
                <div>
                  <p className="eyebrow mb-2">Yüzey işlemleri</p>
                  <div className="flex flex-wrap gap-2">
                    {finishes.map((f) => (
                      <Badge key={f} variant="secondary" className="rounded-full font-normal">
                        {f}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
              {applications.length > 0 && (
                <div>
                  <p className="eyebrow mb-2">Kullanım alanları</p>
                  <div className="flex flex-wrap gap-2">
                    {applications.map((a) => (
                      <Badge key={a} variant="outline" className="rounded-full font-normal">
                        {a}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {product.description && (
            <div className="mt-8">
              <RichText data={product.description} />
            </div>
          )}

          <div className="mt-10 flex flex-wrap gap-3">
            <Button asChild size="lg">
              <a href={inquiry}>
                <MessageCircle className="size-4" />
                WhatsApp ile Teklif Al
              </a>
            </Button>
            <Button asChild size="lg" variant="outline">
              <a href={site.phoneHref}>
                <Phone className="size-4" />
                {site.phoneDisplay}
              </a>
            </Button>
          </div>
        </div>
      </article>

      {related.length > 0 && (
        <section className="border-t border-vein bg-marble-raised py-20 md:py-24">
          <div className="container-page">
            <SectionHeading
              eyebrow="Benzer ürünler"
              title={category ? `Diğer ${category.name} modelleri` : 'Bunları da inceleyin'}
            />
            <div className="mt-12">
              {/* Related products are all from this brand — the heading says so. */}
              <ProductGrid products={related} showBrand={false} />
            </div>
          </div>
        </section>
      )}
    </>
  )
}
