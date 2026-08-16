import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ChevronRight } from 'lucide-react'

import { SITE_URL } from '@/lib/site'
import { jsonLd } from '@/lib/json-ld'
import { getCategories, getCategoryBySlug, getProductPage } from '@/lib/queries'
import { PageHero } from '@/components/page-hero'
import { CategoryFilter } from '@/components/products/category-filter'
import { ProductGrid } from '@/components/products/product-grid'
import { Pagination } from '@/components/products/pagination'

type Params = {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ sayfa?: string }>
}

export async function generateStaticParams() {
  const categories = await getCategories()
  return categories.filter((c) => c.slug).map((c) => ({ slug: c.slug as string }))
}

export async function generateMetadata({ params, searchParams }: Params): Promise<Metadata> {
  const { slug } = await params
  const { sayfa } = await searchParams
  const category = await getCategoryBySlug(slug)
  if (!category) return { title: 'Marka bulunamadı', robots: { index: false, follow: true } }

  const page = Number(sayfa) || 1
  const base = `/urunler/kategori/${slug}`
  const title = `${category.name} Kompozit Tezgah Modelleri ve Fiyatları`
  const description =
    category.description ||
    `${category.name} kompozit taş (quartz) tezgah modelleri, renkleri ve fiyatları. Mutfak ve banyo tezgahı için ölçü, kesim ve montaj Sistem Granit güvencesiyle.`
  const cover = typeof category.image === 'object' ? category.image : null

  return {
    title: page > 1 ? `${title} — Sayfa ${page}` : title,
    description,
    alternates: { canonical: page > 1 ? `${base}?sayfa=${page}` : base },
    openGraph: {
      title,
      description,
      url: base,
      ...(cover?.url ? { images: [{ url: cover.url, alt: category.name }] } : {}),
    },
  }
}

export default async function CategoryPage({ params, searchParams }: Params) {
  const { slug } = await params
  const { sayfa } = await searchParams
  const [category, categories] = await Promise.all([getCategoryBySlug(slug), getCategories()])
  if (!category) notFound()

  const { products, page, totalPages, totalDocs } = await getProductPage({
    category: slug,
    page: Number(sayfa) || 1,
  })

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Ana Sayfa', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Ürünler', item: `${SITE_URL}/urunler` },
      {
        '@type': 'ListItem',
        position: 3,
        name: category.name,
        item: `${SITE_URL}/urunler/kategori/${slug}`,
      },
    ],
  }

  const itemListLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `${category.name} — Ürünler`,
    numberOfItems: totalDocs,
    itemListElement: products
      .filter((p) => p.slug)
      .map((p, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: p.title,
        url: `${SITE_URL}/urunler/${p.slug}`,
      })),
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(breadcrumbLd)} />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(itemListLd)} />

      <div className="container-page pt-10">
        <nav className="flex items-center gap-1 font-mono text-xs uppercase tracking-widest text-stone-muted">
          <Link href="/" className="hover:text-foreground">
            Ana Sayfa
          </Link>
          <ChevronRight className="size-3.5" />
          <Link href="/urunler" className="hover:text-foreground">
            Ürünler
          </Link>
          <ChevronRight className="size-3.5" />
          <span className="text-foreground">{category.name}</span>
        </nav>
      </div>

      <PageHero
        eyebrow="Marka"
        title={category.name}
        description={
          category.description ||
          `${category.name} markası kompozit taş (quartz) tezgah çeşitlerimizi inceleyin.`
        }
      />

      <div className="container-page py-12 md:py-16">
        <CategoryFilter categories={categories} active={slug} />
        <div className="mt-12">
          {products.length === 0 ? (
            <p className="py-16 text-center text-stone-muted">
              Bu markada henüz ürün bulunmuyor.
            </p>
          ) : (
            <>
              <h2 className="sr-only">
                {category.name} tezgah modelleri — sayfa {page}/{totalPages}
              </h2>
              <ProductGrid products={products} />
              <Pagination
                page={page}
                totalPages={totalPages}
                basePath={`/urunler/kategori/${slug}`}
              />
            </>
          )}
        </div>
      </div>
    </>
  )
}
