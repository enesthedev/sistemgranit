import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'

import type { Product } from '@/payload-types'
import { ProductGrid } from '@/components/products/product-grid'
import { SectionHeading } from '@/components/section-heading'

export function FeaturedProducts({ products }: { products: Product[] }) {
  if (products.length === 0) return null

  return (
    <section className="border-y border-vein bg-marble-raised py-20 md:py-28">
      <div className="container-page">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            eyebrow="Öne Çıkanlar"
            title="Mevsimin seçkisi"
            description="Mimarların ve uygulamacıların en çok tercih ettiği taşlardan bir seçki."
          />
          <Link
            href="/urunler"
            className="group inline-flex shrink-0 items-center gap-2 self-start rounded-full border border-vein px-5 py-2.5 text-sm font-medium tracking-wide text-foreground transition-colors hover:border-brand hover:bg-brand hover:text-white"
          >
            Tümünü gör
            <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

        <div className="mt-12">
          <ProductGrid products={products} />
        </div>
      </div>
    </section>
  )
}
