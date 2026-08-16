'use client'

import { useEffect, useRef, useState } from 'react'
import { useInView, useReducedMotion } from 'motion/react'

import { stats } from '@/lib/site'

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const reduce = useReducedMotion()
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (!inView) return
    if (reduce) {
      setDisplay(value)
      return
    }
    let raf = 0
    const duration = 1600
    let start: number | null = null
    const step = (t: number) => {
      if (start === null) start = t
      const p = Math.min((t - start) / duration, 1)
      const eased = 1 - Math.pow(1 - p, 3)
      setDisplay(Math.round(eased * value))
      if (p < 1) raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [inView, value, reduce])

  return (
    <span ref={ref}>
      {display.toLocaleString('tr-TR')}
      <span className="text-brand">{suffix}</span>
    </span>
  )
}

export function Stats() {
  return (
    <section className="bg-graphite py-16 text-marble md:py-20">
      <div className="container-page">
        <h2 className="sr-only">Rakamlarla Sistem Granit</h2>
        <dl className="grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="flex flex-col gap-2 border-l border-marble/15 pl-5">
              <dt className="font-display text-5xl tracking-tight md:text-6xl">
                <Counter value={s.value} suffix={s.suffix} />
              </dt>
              <dd className="font-mono text-xs uppercase tracking-[0.2em] text-marble/50">
                {s.label}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
