'use client'

import { useState } from 'react'

import { cn } from '@/lib/utils'
import type { Media } from '@/payload-types'
import { PayloadImage } from '@/components/media/payload-image'

type Img = { image: Media | number; id?: string | null }

export function ProductGallery({ images, title }: { images: Img[]; title: string }) {
  const [active, setActive] = useState(0)
  const safe = images?.length ? images : []
  const current = safe[active]?.image

  return (
    <div className="flex flex-col gap-4">
      <div className="relative aspect-[4/5] overflow-hidden rounded-md bg-secondary">
        <PayloadImage
          media={current}
          size="feature"
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 50vw"
          alt={title}
        />
      </div>

      {safe.length > 1 && (
        <div className="grid grid-cols-5 gap-3">
          {safe.map((img, i) => (
            <button
              key={img.id ?? i}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`${title} görsel ${i + 1}`}
              className={cn(
                'relative aspect-square overflow-hidden rounded-md bg-secondary ring-offset-2 ring-offset-marble transition-all',
                i === active ? 'ring-2 ring-brand' : 'opacity-70 hover:opacity-100',
              )}
            >
              <PayloadImage
                media={img.image}
                size="thumbnail"
                fill
                sizes="120px"
                alt={`${title} ${i + 1}`}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
