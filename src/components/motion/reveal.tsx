'use client'

import { motion, useReducedMotion } from 'motion/react'
import type { ReactNode } from 'react'

type Props = {
  children: ReactNode
  delay?: number
  y?: number
  className?: string
  as?: 'div' | 'li' | 'span'
  /** Animate on mount instead of on scroll-into-view (for above-the-fold content). */
  immediate?: boolean
}

/** Subtle reveal. Scroll-into-view by default; on mount with `immediate`. Honours prefers-reduced-motion. */
export function Reveal({
  children,
  delay = 0,
  y = 24,
  className,
  as = 'div',
  immediate = false,
}: Props) {
  const reduce = useReducedMotion()
  const MotionTag = motion[as]
  const target = reduce ? undefined : { opacity: 1, y: 0 }

  return (
    <MotionTag
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      {...(immediate
        ? { animate: target }
        : { whileInView: target, viewport: { once: true, margin: '-80px' } })}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </MotionTag>
  )
}
