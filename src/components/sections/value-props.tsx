import { valueProps } from '@/lib/site'
import { Reveal } from '@/components/motion/reveal'

/**
 * Sits directly under the hero and deliberately continues its fact band: the same
 * hairline-divided columns in the same datasheet voice, so the two read as one
 * opening statement rather than two separate sections. Dividers only appear at the
 * 4-across width, where every item shares a single row (as in the hero band); the
 * columns are padded symmetrically so no item's text touches a divider.
 */
export function ValueProps() {
  return (
    <section className="container-page py-16 md:py-20">
      <h2 className="sr-only">Neden Sistem Granit?</h2>
      <div className="grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-x-0 lg:divide-x lg:divide-vein">
        {valueProps.map((vp, i) => (
          <Reveal
            key={vp.title}
            delay={i * 0.08}
            className="lg:px-7 lg:first:pl-0 lg:last:pr-0"
          >
            <h3 className="font-display text-xl leading-snug tracking-tight text-balance">
              {vp.title}
            </h3>
            {/* Short brand rule: separates title from body and carries the accent the icons used to. */}
            <span aria-hidden className="mt-5 block h-px w-8 bg-brand/60" />
            <p className="mt-5 max-w-[36ch] text-sm leading-[1.75] text-stone-muted">{vp.body}</p>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
