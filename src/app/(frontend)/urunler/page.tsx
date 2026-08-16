import type { Metadata } from 'next'
import Link from 'next/link'
import { X } from 'lucide-react'

import { getCategories, getProducts } from '@/lib/queries'
import { PageHero } from '@/components/page-hero'
import { CategoryFilter } from '@/components/products/category-filter'
import { ProductGrid } from '@/components/products/product-grid'

export const metadata: Metadata = {
  title: 'Ürünler',
  description:
    'ARTEO, BELENCO, ÇİMSTONE ve COANTE markalı kompozit taş (quartz) tezgah koleksiyonumuzu keşfedin. Markaya ve başlangıç fiyatına göre inceleyin.',
}

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ kategori?: string; q?: string }>
}) {
  const { kategori, q } = await searchParams
  const query = q?.trim()
  const [categories, products] = await Promise.all([
    getCategories(),
    getProducts({ category: kategori, search: query }),
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
              <span className="font-medium text-foreground">“{query}”</span> için{' '}
              {products.length} sonuç
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
            <ProductGrid products={products} />
          )}
        </div>
      </div>
    </>
  )
}
