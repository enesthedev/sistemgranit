import { ShieldCheck, Globe2, Layers, Ruler } from 'lucide-react'

import { valueProps } from '@/lib/site'
import { Reveal } from '@/components/motion/reveal'

const icons = [ShieldCheck, Globe2, Layers, Ruler]

export function ValueProps() {
  return (
    <section className="container-page py-20 md:py-28">
      <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
        {valueProps.map((vp, i) => {
          const Icon = icons[i] ?? ShieldCheck
          return (
            <Reveal key={vp.title} delay={i * 0.08} className="flex flex-col gap-4">
              <Icon className="size-7 text-brand" strokeWidth={1.5} />
              <div className="vein-rule" />
              <h3 className="font-display text-xl tracking-tight">{vp.title}</h3>
              <p className="text-sm leading-relaxed text-stone-muted">{vp.body}</p>
            </Reveal>
          )
        })}
      </div>
    </section>
  )
}
