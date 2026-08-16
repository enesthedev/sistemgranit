import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'

import type { BrandLane } from '@/lib/queries'
import { brandAccentStyle } from '@/lib/brands'
import { PayloadImage } from '@/components/media/payload-image'
import { ProductCard } from '@/components/products/product-card'
import { SectionHeading } from '@/components/section-heading'

/**
 * Homepage product showcase, split into one lane per brand.
 *
 * Replaces a single flat grid: the catalogue is four brands, and a flat grid
 * said nothing about that. Each lane header carries the brand's logo, its size,
 * and a link to its page — so the cards themselves don't repeat the brand
 * (`showBrand={false}`), and the homepage gains four brand-page links.
 */
export function BrandLanes({ lanes }: { lanes: BrandLane[] }) {
  if (lanes.length === 0) return null

  return (
    <section className="border-y border-vein bg-marble-raised py-20 md:py-28">
      <div className="container-page">
        {/*
          No section-level "Tüm Ürünler" button: every lane already ends in its
          own "Tüm <marka> modelleri" link, which is the more useful path.
        */}
        <SectionHeading
          eyebrow="Öne Çıkanlar"
          title="Markalarımızdan seçkiler"
          description="Çalıştığımız dört kompozit taş markasının mutfaklarda en çok tercih edilen tezgah modelleri."
        />

        <div className="mt-14 flex flex-col gap-14 md:gap-16">
          {lanes.map((lane) => (
            <Lane key={lane.brand.id} lane={lane} />
          ))}
        </div>
      </div>
    </section>
  )
}

function Lane({ lane: { brand, total, products } }: { lane: BrandLane }) {
  return (
    <article style={brandAccentStyle(brand.slug)}>
      <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3">
        <div className="flex items-center gap-4">
          <span aria-hidden className="h-8 w-0.5 rounded-full bg-[var(--brand-accent)]" />
          {brand.logo ? (
            <PayloadImage
              media={brand.logo}
              size="logo"
              alt={`${brand.name} logosu`}
              sizes="200px"
              className="h-6 w-auto max-w-[9rem] object-contain object-left md:h-7"
            />
          ) : (
            <h3 className="font-display text-2xl tracking-tight text-foreground">{brand.name}</h3>
          )}
          <span className="font-mono text-xs uppercase tracking-[0.18em] text-stone-muted">
            {total} model
          </span>
        </div>

        <Link
          href={`/urunler/kategori/${brand.slug}`}
          className="group inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-[0.18em] text-stone-muted transition-colors hover:text-[var(--brand-accent)]"
        >
          Tüm {brand.name} modelleri
          <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
      </div>

      {/* Hairline in the brand's own tone, fading out like `.vein-rule`. */}
      <div
        aria-hidden
        className="mt-4 h-px"
        style={{
          background:
            'linear-gradient(to right, color-mix(in oklab, var(--brand-accent) 40%, transparent), var(--vein) 45%, transparent)',
        }}
      />

      {/*
        Horizontal snap-scroller on phones, a four-up grid from md.
        Four lanes × four cards would otherwise stack into eight rows on mobile.
        overflow-y is pinned to hidden so the `.rise-in` entrance can't spawn a
        transient vertical scrollbar inside the scroller.
      */}
      <div className="mt-6 flex snap-x snap-mandatory gap-4 overflow-x-auto overflow-y-hidden pb-2 md:mt-8 md:grid md:grid-cols-4 md:gap-x-5 md:overflow-visible md:pb-0">
        {products.map((product, i) => (
          <div
            key={product.id}
            className="rise-in w-[62%] shrink-0 snap-start md:w-auto"
            style={{ animationDelay: `${(i % 4) * 80}ms` }}
          >
            <ProductCard product={product} showBrand={false} />
          </div>
        ))}
      </div>
    </article>
  )
}
