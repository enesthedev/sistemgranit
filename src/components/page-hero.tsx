import type { ReactNode } from 'react'

import { cn } from '@/lib/utils'
import { Reveal } from '@/components/motion/reveal'

export function PageHero({
  eyebrow,
  title,
  description,
  accent,
  logo,
}: {
  eyebrow: string
  title: string
  description?: string
  /**
   * Overrides the vermilion eyebrow rule — used by brand pages so the header
   * carries the brand's own tone. Any CSS colour.
   */
  accent?: string
  /** Optional mark shown above the heading (brand logo on brand pages). */
  logo?: ReactNode
}) {
  return (
    <section className="border-b border-vein bg-marble-raised">
      <div className="container-page pb-12 pt-16 md:pb-16 md:pt-20">
        <Reveal>
          <span className="eyebrow flex items-center gap-3">
            <span
              className={cn('h-px w-8', !accent && 'bg-brand')}
              style={accent ? { backgroundColor: accent } : undefined}
            />
            {eyebrow}
          </span>
        </Reveal>
        {logo && <Reveal delay={0.04}>{logo}</Reveal>}
        <Reveal delay={0.06}>
          <h1
            className={cn(
              'max-w-3xl font-display text-4xl leading-[1.05] tracking-tight text-balance md:text-5xl',
              logo ? 'mt-6' : 'mt-5',
            )}
          >
            {title}
          </h1>
        </Reveal>
        {description && (
          <Reveal delay={0.12}>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-stone-muted text-pretty">
              {description}
            </p>
          </Reveal>
        )}
      </div>
    </section>
  )
}
