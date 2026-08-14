import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ChevronRight } from 'lucide-react'

import { SITE_URL } from '@/app/(frontend)/layout'
import { getCategories, getCategoryBySlug, getProducts } from '@/lib/queries'
import { PageHero } from '@/components/page-hero'
import { CategoryFilter } from '@/components/products/category-filter'
import { ProductGrid } from '@/components/products/product-grid'

type Params = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  const categories = await getCategories()
  return categories.filter((c) => c.slug).map((c) => ({ slug: c.slug as string }))
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params
  const category = await getCategoryBySlug(slug)
  if (!category) return { title: 'Kategori bulunamadı' }

  const description =
    category.description || `${category.name} — Sistem Granit doğal taş koleksiyonu.`
  const cover = typeof category.image === 'object' ? category.image : null

  return {
    title: category.name,
    description,
    alternates: { canonical: `/urunler/kategori/${slug}` },
    openGraph: {
      title: category.name,
      description,
      url: `/urunler/kategori/${slug}`,
      ...(cover?.url ? { images: [{ url: cover.url }] } : {}),
    },
  }
}

export default async function CategoryPage({ params }: Params) {
  const { slug } = await params
  const [category, categories] = await Promise.all([getCategoryBySlug(slug), getCategories()])
  if (!category) notFound()

  const products = await getProducts({ category: slug })

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
    numberOfItems: products.length,
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListLd) }}
      />

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
        eyebrow="Koleksiyon"
        title={category.name}
        description={
          category.description ||
          `${category.name} grubundaki doğal taş çeşitlerimizi inceleyin.`
        }
      />

      <div className="container-page py-12 md:py-16">
        <CategoryFilter categories={categories} active={slug} />
        <div className="mt-12">
          {products.length === 0 ? (
            <p className="py-16 text-center text-stone-muted">
              Bu kategoride henüz ürün bulunmuyor.
            </p>
          ) : (
            <ProductGrid products={products} />
          )}
        </div>
      </div>
    </>
  )
}
