import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'

import { cn } from '@/lib/utils'
import type { Category } from '@/payload-types'
import { PayloadImage } from '@/components/media/payload-image'
import { SectionHeading } from '@/components/section-heading'
import { Reveal } from '@/components/motion/reveal'

export function CategoryShowcase({ categories }: { categories: Category[] }) {
  const items = categories.slice(0, 5)
  if (items.length === 0) return null

  return (
    <section className="container-page py-20 md:py-28">
      <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
        <SectionHeading
          eyebrow="Koleksiyonlar"
          title="Her projeye uygun bir doğal taş ailesi"
          description="Mermerden granite, travertenden onikse; ocaktan seçilmiş ve tesisimizde işlenmiş taş gruplarını keşfedin."
        />
        <Link
          href="/urunler"
          className="group inline-flex shrink-0 items-center gap-2 self-start rounded-full border border-vein px-5 py-2.5 text-sm font-medium tracking-wide text-foreground transition-colors hover:border-brand hover:bg-brand hover:text-white"
        >
          Tüm ürünler
          <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
      </div>

      <div className="mt-12 grid auto-rows-[180px] grid-cols-2 gap-4 md:auto-rows-[210px] md:grid-cols-4">
        {items.map((category, i) => (
          <Reveal
            key={category.id}
            delay={(i % 3) * 0.08}
            className={cn(
              'min-h-0',
              i === 0 && 'col-span-2 row-span-2',
            )}
          >
            <Link
              href={`/urunler?kategori=${category.slug}`}
              className="group relative flex h-full w-full overflow-hidden rounded-md bg-graphite"
            >
              <PayloadImage
                media={category.image}
                size="feature"
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-graphite/85 via-graphite/20 to-transparent" />
              <div className="relative z-10 mt-auto flex w-full items-end justify-between p-5">
                <h3 className="font-display text-xl tracking-tight text-marble md:text-2xl">
                  {category.name}
                </h3>
                <ArrowUpRight className="size-5 text-marble/70 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-brand" />
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
