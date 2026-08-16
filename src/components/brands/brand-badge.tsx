import { cn } from '@/lib/utils'
import { brandAccentStyle } from '@/lib/brands'
import type { Category } from '@/payload-types'

type Props = {
  brand: Category
  className?: string
}

/**
 * Brand marker for a product card.
 *
 * Renders a `<span>`, never a link: `ProductCard` is a single `<Link>`, and an
 * anchor nested inside an anchor is invalid HTML and breaks hydration. Brands
 * stay clickable where they already are — lane headers, filter chips,
 * breadcrumbs and brand cards.
 *
 * Sits on the photo rather than in the meta block: that's where the eye is
 * while scanning a grid of slabs, and it keeps the text stack from shifting.
 */
export function BrandBadge({ brand, className }: Props) {
  return (
    <span
      style={brandAccentStyle(brand.slug)}
      className={cn(
        'pointer-events-none inline-flex items-center gap-1.5 rounded-full bg-marble/90 px-2.5 py-1 font-mono text-[10px] uppercase leading-none tracking-[0.18em] text-foreground backdrop-blur-sm',
        className,
      )}
    >
      <span
        aria-hidden
        className="size-1.5 shrink-0 rounded-full bg-[var(--brand-accent)]"
      />
      {brand.name}
    </span>
  )
}
