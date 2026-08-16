import type { Metadata } from 'next'
import Link from 'next/link'
import { X } from 'lucide-react'

import { getCategories, getProductPage } from '@/lib/queries'
import { PageHero } from '@/components/page-hero'
import { CategoryFilter } from '@/components/products/category-filter'
import { ProductGrid } from '@/components/products/product-grid'
import { Pagination } from '@/components/products/pagination'

type SearchParams = Promise<{ kategori?: string; q?: string; sayfa?: string }>

const TITLE = 'Kompozit Taş Tezgah Modelleri ve Fiyatları'
const DESCRIPTION =
  'ARTEO, BELENCO, ÇİMSTONE ve COANTE kompozit taş (quartz) tezgah koleksiyonumuzu keşfedin. Mutfak ve banyo tezgahı modellerini markaya ve fiyata göre inceleyin.'

export async function generateMetadata({
  searchParams,
}: {
  searchParams: SearchParams
}): Promise<Metadata> {
  const { kategori, q, sayfa } = await searchParams
  const page = Number(sayfa) || 1

  // Filtered and search views duplicate /urunler and the brand pages, so they
  // stay out of the index while still passing link equity to the products.
  const faceted = Boolean(kategori || q)

  return {
    title: page > 1 ? `${TITLE} — Sayfa ${page}` : TITLE,
    description: DESCRIPTION,
    alternates: { canonical: page > 1 ? `/urunler?sayfa=${page}` : '/urunler' },
    ...(faceted ? { robots: { index: false, follow: true } } : {}),
  }
}

export default async function ProductsPage({ searchParams }: { searchParams: SearchParams }) {
  const { kategori, q, sayfa } = await searchParams
  const query = q?.trim()
  const [categories, { products, page, totalPages, totalDocs }] = await Promise.all([
    getCategories(),
    getProductPage({ category: kategori, search: query, page: Number(sayfa) || 1 }),
  ])

  return (
    <>
      <PageHero
        eyebrow="Koleksiyon"
        title="Kompozit taş tezgah ürünlerimiz"
        description="ARTEO, BELENCO, ÇİMSTONE ve COANTE markalarının tezgah modelleri. Kesin fiyat ve numune için ürün sayfasından bize ulaşabilirsiniz."
      />
      <div className="container-page py-12 md:py-16">
        {query ? (
          <div className="mb-8 flex flex-wrap items-center justify-between gap-3 border-b border-vein pb-5">
            <p className="text-sm text-stone-muted">
              <span className="font-medium text-foreground">“{query}”</span> için {totalDocs} sonuç
            </p>
            <Link
              href="/urunler"
              className="group inline-flex items-center gap-1.5 text-sm font-medium text-stone-muted transition-colors hover:text-foreground"
            >
              <X className="size-4" />
              Aramayı temizle
            </Link>
          </div>
        ) : (
          <CategoryFilter categories={categories} active={kategori} />
        )}
        <div className="mt-12">
          {products.length === 0 ? (
            <p className="py-16 text-center text-stone-muted">
              {query
                ? `“${query}” için sonuç bulunamadı. Farklı bir arama deneyin.`
                : 'Bu markada henüz ürün bulunmuyor.'}
            </p>
          ) : (
            <>
              {/* Gives the grid a real h2 so the outline doesn't jump h1 → h3. */}
              <h2 className="sr-only">
                {query ? `“${query}” arama sonuçları` : 'Tezgah modelleri'} — sayfa {page}/
                {totalPages}
              </h2>
              <ProductGrid products={products} />
              <Pagination
                page={page}
                totalPages={totalPages}
                basePath="/urunler"
                params={{ kategori, q: query }}
              />
            </>
          )}
        </div>
      </div>
    </>
  )
}
