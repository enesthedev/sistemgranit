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
      <div className="grid gap-10 lg:grid-cols-[minmax(0,20rem)_1fr] lg:items-start lg:gap-16">
        {/* Left rail — holds while the brand block scrolls past on wide screens. */}
        <div className="lg:sticky lg:top-28">
          <SectionHeading
            eyebrow="Markalar"
            title="Çalıştığımız kompozit taş markaları"
            description="ARTEO, BELENCO, ÇİMSTONE ve COANTE — güvenilir kompozit taş (quartz) markalarının tezgah koleksiyonlarını keşfedin."
          />
          <Reveal delay={0.12}>
            <Link
              href="/markalar"
              className="group mt-8 inline-flex items-center gap-2 rounded-full border border-vein px-5 py-2.5 text-sm font-medium tracking-wide text-foreground transition-colors hover:border-brand hover:bg-brand hover:text-white"
            >
              Tüm Markalar
              <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </Reveal>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {items.map((category, i) => (
            <div
              key={category.id}
              className="rise-in min-h-0"
              style={{ animationDelay: `${(i % 4) * 80}ms` }}
            >
              <BrandCard
                brand={category}
                count={counts?.[String(category.id)]}
                sizes="(max-width: 1024px) 45vw, 26vw"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
