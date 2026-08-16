import type { CSSProperties } from 'react'

/**
 * Per-brand accent tones.
 *
 * The catalogue is four third-party brands, and until now they were rendered
 * identically — one grey eyebrow each — so a product grid read as a single
 * undifferentiated wall. These tones give each brand a recognisable signal.
 *
 * The four values are drawn from the site's own marble/graphite world rather
 * than the brands' corporate colours: four saturated logos' colours would fight
 * the marble ground, and `--brand` (#ce2d1e, the Sistem Granit vermilion) stays
 * reserved for site-level actions, so no brand tone is red.
 */
export type BrandTone = {
  /** Hex, published to CSS as `--brand-accent`. */
  accent: string
}

const STONE: BrandTone = { accent: '#6e655a' }

const TONES: Record<string, BrandTone> = {
  cimstone: { accent: '#16120f' }, // graphite — near-black
  arteo: { accent: '#4d5b62' }, // slate — cool
  belenco: { accent: '#8a6a3f' }, // bronze — warm gold
  coante: STONE, // stone — warm grey
}

/** Falls back to the neutral stone tone for any brand added later. */
export function brandTone(slug?: string | null): BrandTone {
  return (slug && TONES[slug]) || STONE
}

/**
 * Inline style carrying the brand accent into CSS custom properties.
 *
 * Tailwind can't generate class names from runtime values, so components read
 * the tone through `var(--brand-accent)` instead of a `bg-…` class. Cast is
 * needed because React's CSSProperties doesn't type custom properties.
 */
export function brandAccentStyle(slug?: string | null): CSSProperties {
  return { '--brand-accent': brandTone(slug).accent } as CSSProperties
}
