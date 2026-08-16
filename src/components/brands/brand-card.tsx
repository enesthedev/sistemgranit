import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'

import { cn } from '@/lib/utils'
import type { Category } from '@/payload-types'
import { PayloadImage } from '@/components/media/payload-image'

type Props = {
  brand: Category
  /** 1-based position, rendered as the mono index in the corner. */
  index: number
  /** Product count for the brand; the label falls back to "Koleksiyon" when absent. */
  count?: number
  className?: string
  sizes?: string
}

/**
 * Logo-first brand card. The logo is the subject: it sits on a calm off-white
 * surface, with the brand photo (when set) dropped far back as material texture
 * so it never competes with the mark. Logos are expected to follow the shared
 * canvas standard (transparent PNG, 1600×480, artwork inside 1280×320), which
 * is what makes marks of different shapes read at the same optical weight.
 */
export function BrandCard({ brand, index, count, className, sizes }: Props) {
  const hasLogo = Boolean(brand.logo)

  return (
    <Link
      href={`/urunler/kategori/${brand.slug}`}
      className={cn(
        'group relative flex aspect-[4/3] flex-col overflow-hidden rounded-md border border-vein bg-marble-raised transition-colors duration-300 hover:border-brand',
        className,
      )}
    >
      {brand.image && (
        <PayloadImage
          media={brand.image}
          size="card"
          fill
          sizes={sizes ?? '(max-width: 768px) 50vw, 25vw'}
          className="opacity-[0.09] grayscale transition-opacity duration-500 group-hover:opacity-[0.16]"
        />
      )}

      <span className="absolute left-4 top-4 z-10 font-mono text-[11px] tracking-[0.2em] text-stone-muted/60">
        {String(index).padStart(2, '0')}
      </span>

      <div className="relative z-10 flex flex-1 items-center justify-center px-5">
        {hasLogo ? (
          <PayloadImage
            media={brand.logo}
            size="logo"
            alt={`${brand.name} logosu`}
            sizes={sizes ?? '(max-width: 768px) 50vw, 25vw'}
            className="h-16 w-auto max-w-full object-contain transition-transform duration-500 group-hover:scale-[1.04] md:h-20"
          />
        ) : (
          <span className="text-center font-display text-2xl tracking-tight text-graphite md:text-3xl">
            {brand.name}
          </span>
        )}
      </div>

      <div className="relative z-10 flex items-center justify-between gap-2 border-t border-vein px-4 py-3 font-mono text-[11px] uppercase tracking-[0.18em] text-stone-muted transition-colors group-hover:text-brand">
        <span>{count != null ? `${count} ürün` : 'Koleksiyon'}</span>
        <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </div>
    </Link>
  )
}
