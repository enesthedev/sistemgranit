import sharp from 'sharp'

import { SITE_URL } from '@/lib/site'
import type { Media } from '@/payload-types'

type SizeName = 'logo' | 'thumbnail' | 'card' | 'feature' | 'hero'
type MediaLike = Media | number | null | undefined

/**
 * Origin to fetch our own uploads from while rendering a card.
 *
 * Payload stores media URLs as paths (`/api/media/file/…`), and Satori needs
 * bytes, so the card has to fetch them over HTTP. This is a self-fetch that is
 * never emitted into a page, so it targets the deployment that is running —
 * `SITE_URL` (the canonical domain) may not even resolve yet on a preview.
 */
function internalOrigin() {
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`
  if (process.env.NODE_ENV !== 'production') return `http://localhost:${process.env.PORT ?? 3000}`
  return SITE_URL
}

/** Largest upload we are willing to pull down for a card. */
const MAX_BYTES = 12 * 1024 * 1024

function pickUrl(media: MediaLike, sizes: SizeName[]) {
  if (!media || typeof media === 'number') return null
  for (const size of sizes) {
    const url = media.sizes?.[size]?.url
    if (url) return url
  }
  return media.url || null
}

async function fetchUpload(media: MediaLike, sizes: SizeName[]) {
  const url = pickUrl(media, sizes)
  if (!url) return null

  const res = await fetch(url.startsWith('http') ? url : `${internalOrigin()}${url}`)
  if (!res.ok) return null

  const buffer = Buffer.from(await res.arrayBuffer())
  if (buffer.byteLength === 0 || buffer.byteLength > MAX_BYTES) return null
  return buffer
}

/**
 * A slab photo, sized to the card's right panel.
 *
 * Everything goes through sharp first: Satori decodes PNG and JPEG only, and
 * part of the catalogue is uploaded as WebP — those cards used to 500 with
 * "u2 is not iterable". Resizing here also means Satori never holds a 1 MB
 * data URI, and `object-fit` has nothing left to do.
 *
 * Returns `null` on any failure; a card without a photo falls back to its
 * typographic panel, which beats failing the image a crawler asked for.
 */
export async function photoDataUri(
  media: MediaLike,
  sizes: SizeName[],
  box = { width: 492, height: 630 },
): Promise<string | null> {
  try {
    const buffer = await fetchUpload(media, sizes)
    if (!buffer) return null

    const jpeg = await sharp(buffer)
      .rotate()
      .resize({ ...box, fit: 'cover', position: 'centre' })
      .jpeg({ quality: 88 })
      .toBuffer()

    return `data:image/jpeg;base64,${jpeg.toString('base64')}`
  } catch {
    return null
  }
}

/**
 * A brand mark, kept transparent (PNG) so it sits on the panel's own ground.
 * The aspect ratio comes back with it: the card draws every logo at the same
 * width, and the marks are different shapes.
 */
export async function logoDataUri(media: MediaLike): Promise<{ src: string; aspect: number } | null> {
  try {
    const buffer = await fetchUpload(media, ['logo'])
    if (!buffer) return null

    const { data, info } = await sharp(buffer)
      .rotate()
      .resize({ width: 640, withoutEnlargement: true })
      .png()
      .toBuffer({ resolveWithObject: true })

    if (!info.width || !info.height) return null
    return { src: `data:image/png;base64,${data.toString('base64')}`, aspect: info.width / info.height }
  } catch {
    return null
  }
}
