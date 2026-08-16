import Image from 'next/image'
import type { Media } from '@/payload-types'
import { cn } from '@/lib/utils'

type SizeName = 'logo' | 'thumbnail' | 'card' | 'feature' | 'hero'

type MediaLike = Media | number | null | undefined

function resolve(media: MediaLike, size?: SizeName) {
  if (!media || typeof media === 'number') return null
  const sized = size && media.sizes?.[size]
  const url = (sized?.url ?? media.url) || undefined
  if (!url) return null
  return {
    url,
    alt: media.alt || '',
    width: sized?.width ?? media.width ?? 1280,
    height: sized?.height ?? media.height ?? 960,
  }
}

type Props = {
  media: MediaLike
  size?: SizeName
  /** Use absolute fill — parent must be `relative` with a set size. */
  fill?: boolean
  className?: string
  sizes?: string
  priority?: boolean
  /** Fallback alt when the media has none. */
  alt?: string
}

export function PayloadImage({ media, size, fill, className, sizes, priority, alt }: Props) {
  const img = resolve(media, size)

  if (!img) {
    return (
      <div
        className={cn(
          'flex items-center justify-center bg-secondary text-stone-muted',
          fill && 'absolute inset-0',
          className,
        )}
        aria-hidden
      >
        <span className="font-mono text-xs uppercase tracking-widest">Görsel yok</span>
      </div>
    )
  }

  if (fill) {
    return (
      <Image
        src={img.url}
        alt={alt || img.alt}
        fill
        sizes={sizes ?? '100vw'}
        priority={priority}
        className={cn('object-cover', className)}
      />
    )
  }

  return (
    <Image
      src={img.url}
      alt={alt || img.alt}
      width={img.width}
      height={img.height}
      sizes={sizes}
      priority={priority}
      className={className}
    />
  )
}
