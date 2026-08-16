import Link from 'next/link'
import { cn } from '@/lib/utils'
import { brandAccentStyle } from '@/lib/brands'
import type { Category } from '@/payload-types'

export function CategoryFilter({
  categories,
  active,
}: {
  categories: Category[]
  active?: string
}) {
  return (
    <div className="flex flex-wrap gap-2">
      <Link
        href="/urunler"
        className={cn(
          'rounded-full border px-4 py-2 text-sm transition-colors',
          !active
            ? 'border-brand bg-brand text-primary-foreground'
            : 'border-vein bg-marble-raised text-stone-muted hover:border-brand hover:text-foreground',
        )}
      >
        Tümü
      </Link>

      {categories.map((c) => {
        const isActive = active === c.slug
        return (
          <Link
            key={c.slug ?? String(c.id)}
            href={`/urunler/kategori/${c.slug}`}
            style={brandAccentStyle(c.slug)}
            className={cn(
              // Each chip wears its brand's own tone, so the filter row itself
              // reads as four distinct brands rather than one repeated accent.
              'inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm transition-colors',
              isActive
                ? 'border-[var(--brand-accent)] bg-[var(--brand-accent)] text-marble'
                : 'border-vein bg-marble-raised text-stone-muted hover:border-[var(--brand-accent)] hover:text-foreground',
            )}
          >
            <span
              aria-hidden
              className={cn(
                'size-1.5 shrink-0 rounded-full',
                isActive ? 'bg-marble/70' : 'bg-[var(--brand-accent)]',
              )}
            />
            {c.name}
          </Link>
        )
      })}
    </div>
  )
}
