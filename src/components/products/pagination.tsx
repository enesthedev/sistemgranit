import Link from 'next/link'
import { ChevronLeft, ChevronRight } from 'lucide-react'

import { cn } from '@/lib/utils'

type Props = {
  page: number
  totalPages: number
  /** Base path without the page param, e.g. `/urunler/kategori/arteo`. */
  basePath: string
  /** Extra query params to preserve across pages (search term, filters). */
  params?: Record<string, string | undefined>
}

/**
 * Server-rendered pagination. Real `<a href>`s, so every page is a crawlable
 * link — the whole point is giving Googlebot a path to products beyond the
 * first screen.
 */
export function Pagination({ page, totalPages, basePath, params }: Props) {
  if (totalPages <= 1) return null

  const href = (target: number) => {
    const q = new URLSearchParams()
    for (const [k, v] of Object.entries(params ?? {})) if (v) q.set(k, v)
    if (target > 1) q.set('sayfa', String(target))
    const s = q.toString()
    return s ? `${basePath}?${s}` : basePath
  }

  // Window of pages around the current one, always including first and last.
  const windowed = new Set<number>([1, totalPages, page - 1, page, page + 1])
  const pages = [...windowed].filter((p) => p >= 1 && p <= totalPages).sort((a, b) => a - b)

  const step =
    'inline-flex h-10 min-w-10 items-center justify-center rounded-full border px-3 text-sm transition-colors'

  return (
    <nav aria-label="Sayfalama" className="mt-16 flex flex-wrap items-center justify-center gap-2">
      {page > 1 ? (
        <Link href={href(page - 1)} rel="prev" aria-label="Önceki sayfa" className={cn(step, 'border-vein hover:border-brand hover:text-brand')}>
          <ChevronLeft className="size-4" />
        </Link>
      ) : (
        <span aria-hidden className={cn(step, 'border-vein/60 text-stone-muted/40')}>
          <ChevronLeft className="size-4" />
        </span>
      )}

      {pages.map((p, i) => (
        <span key={p} className="flex items-center gap-2">
          {i > 0 && p - pages[i - 1] > 1 && (
            <span className="px-1 font-mono text-xs text-stone-muted">…</span>
          )}
          <Link
            href={href(p)}
            aria-label={`Sayfa ${p}`}
            aria-current={p === page ? 'page' : undefined}
            className={cn(
              step,
              p === page
                ? 'border-brand bg-brand font-medium text-primary-foreground'
                : 'border-vein text-stone-muted hover:border-brand hover:text-foreground',
            )}
          >
            {p}
          </Link>
        </span>
      ))}

      {page < totalPages ? (
        <Link href={href(page + 1)} rel="next" aria-label="Sonraki sayfa" className={cn(step, 'border-vein hover:border-brand hover:text-brand')}>
          <ChevronRight className="size-4" />
        </Link>
      ) : (
        <span aria-hidden className={cn(step, 'border-vein/60 text-stone-muted/40')}>
          <ChevronRight className="size-4" />
        </span>
      )}
    </nav>
  )
}
