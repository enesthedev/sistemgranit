import type { Metadata } from 'next'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

import { SITE_URL } from '@/lib/site'
import { jsonLd } from '@/lib/json-ld'
import { getBrandProductCounts, getCategories } from '@/lib/queries'
import { PageHero } from '@/components/page-hero'
import { BrandCard } from '@/components/brands/brand-card'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'Markalar — ARTEO, BELENCO, ÇİMSTONE, COANTE',
  description:
    'Çalıştığımız kompozit taş (quartz) markaları — ARTEO, BELENCO, ÇİMSTONE ve COANTE tezgah koleksiyonlarını keşfedin.',
  alternates: { canonical: '/markalar' },
}

export default async function MarkalarPage() {
  const [categories, counts] = await Promise.all([getCategories(), getBrandProductCounts()])

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Ana Sayfa', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Markalar', item: `${SITE_URL}/markalar` },
    ],
  }

  const itemListLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Markalar',
    numberOfItems: categories.length,
    itemListElement: categories
      .filter((c) => c.slug)
      .map((c, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: c.name,
        url: `${SITE_URL}/urunler/kategori/${c.slug}`,
      })),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd(breadcrumbLd)}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd(itemListLd)}
      />

      <div className="container-page pt-10">
        <nav className="flex items-center gap-1 font-mono text-xs uppercase tracking-widest text-stone-muted">
          <Link href="/" className="hover:text-foreground">
            Ana Sayfa
          </Link>
          <ChevronRight className="size-3.5" />
          <span className="text-foreground">Markalar</span>
        </nav>
      </div>

      <PageHero
        eyebrow="Markalar"
        title="Markalar"
        description="Çalıştığımız kompozit taş (quartz) markalarını keşfedin — her markanın tezgah koleksiyonuna göz atın."
      />

      <div className="container-page py-12 md:py-16">
        {categories.length === 0 ? (
          <p className="py-16 text-center text-stone-muted">Henüz marka eklenmemiş.</p>
        ) : (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {categories.map((category, i) => (
              <div
                key={category.id}
                className="rise-in min-h-0"
                style={{ animationDelay: `${(i % 4) * 60}ms` }}
              >
                <BrandCard
                  brand={category}
                  count={counts[String(category.id)] ?? 0}
                  sizes="(max-width: 768px) 45vw, (max-width: 1024px) 30vw, 22vw"
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  )
}
