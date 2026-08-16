import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'

import type { Category } from '@/payload-types'
import { SectionHeading } from '@/components/section-heading'
import { Reveal } from '@/components/motion/reveal'
import { BrandCard } from '@/components/brands/brand-card'

export function CategoryShowcase({
  categories,
  counts,
}: {
  categories: Category[]
  counts?: Record<string, number>
}) {
  const items = categories.slice(0, 4)
  if (items.length === 0) return null

  return (
    <section className="container-page py-20 md:py-28">
      <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
        <SectionHeading
          eyebrow="Markalar"
          title="Çalıştığımız kompozit taş markaları"
          description="ARTEO, BELENCO, ÇİMSTONE ve COANTE — güvenilir kompozit taş (quartz) markalarının tezgah koleksiyonlarını keşfedin."
        />
        <Link
          href="/markalar"
          className="group inline-flex shrink-0 items-center gap-2 self-start rounded-full border border-vein px-5 py-2.5 text-sm font-medium tracking-wide text-foreground transition-colors hover:border-brand hover:bg-brand hover:text-white"
        >
          Tüm Markalar
          <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
      </div>

      <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4">
        {items.map((category, i) => (
          <Reveal key={category.id} delay={(i % 4) * 0.08} className="min-h-0">
            <BrandCard
              brand={category}
              index={i + 1}
              count={counts?.[String(category.id)]}
              sizes="(max-width: 768px) 45vw, 22vw"
            />
          </Reveal>
        ))}
      </div>
    </section>
  )
}
