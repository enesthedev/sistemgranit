import { Reveal } from '@/components/motion/reveal'

export function PageHero({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string
  title: string
  description?: string
}) {
  return (
    <section className="border-b border-vein bg-marble-raised">
      <div className="container-page pb-12 pt-16 md:pb-16 md:pt-20">
        <Reveal>
          <span className="eyebrow flex items-center gap-3">
            <span className="h-px w-8 bg-brand" />
            {eyebrow}
          </span>
        </Reveal>
        <Reveal delay={0.06}>
          <h1 className="mt-5 max-w-3xl font-display text-4xl leading-[1.05] tracking-tight text-balance md:text-5xl">
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
