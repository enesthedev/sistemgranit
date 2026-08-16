import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'

import type { Product } from '@/payload-types'
import { PayloadImage } from '@/components/media/payload-image'

export function ProductCard({ product }: { product: Product }) {
  const cover = product.images?.[0]?.image
  const category = typeof product.category === 'object' ? product.category : null

  return (
    <Link
      href={`/urunler/${product.slug}`}
      className="group flex flex-col"
    >
      <div className="relative aspect-[3/4] overflow-hidden rounded-md bg-secondary">
        <PayloadImage
          media={cover}
          size="card"
          fill
          sizes="(max-width: 640px) 80vw, (max-width: 1024px) 40vw, 24vw"
          className="transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-graphite/40 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        <span className="absolute right-3 top-3 flex size-9 items-center justify-center rounded-full bg-marble/90 text-foreground opacity-0 translate-y-1 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
          <ArrowUpRight className="size-4" />
        </span>
      </div>

      <div className="mt-4 flex flex-col gap-1">
        {category && <span className="eyebrow">{category.name}</span>}
        <h3 className="font-display text-xl tracking-tight text-foreground transition-colors group-hover:text-brand">
          {product.title}
        </h3>
        {(product.color || product.origin) && (
          <p className="font-mono text-xs text-stone-muted">
            {[product.color, product.origin].filter(Boolean).join(' · ')}
          </p>
        )}
        {typeof product.price === 'number' && (
          <p className="font-mono text-xs text-brand">
            {product.price.toLocaleString('tr-TR')} ₺
          </p>
        )}
      </div>
    </Link>
  )
}
