import { brandTone } from '@/lib/brands'
import { OG_CONTENT_TYPE, OG_SIZE, cardNotFound, renderCard } from '@/lib/og/card'
import { photoDataUri } from '@/lib/og/media'
import { getProductBySlug } from '@/lib/queries'
import { site } from '@/lib/site'

export const alt = `${site.name} — kompozit taş tezgah modeli`
export const size = OG_SIZE
export const contentType = OG_CONTENT_TYPE

/**
 * Not prerendered: the card inlines the slab photo, which it fetches from our
 * own `/api/media/…` route — and during `next build` this deployment is not
 * serving yet, so 158 cards would silently come out photoless. It is generated
 * on the first crawl instead and then lives in the CDN (see `OG_CACHE_CONTROL`).
 */
export const dynamic = 'force-dynamic'

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const product = await getProductBySlug(slug)
  if (!product) return cardNotFound()

  const category = typeof product.category === 'object' ? product.category : null
  const photo = await photoDataUri(product.images?.[0]?.image, ['card'])

  const meta = [
    typeof product.price === 'number' ? `${product.price.toLocaleString('tr-TR')} ₺` : null,
    product.code ? `Kod ${product.code}` : null,
  ]
    .filter(Boolean)
    .join(' · ')

  return renderCard({
    eyebrow: category?.name ?? 'Kompozit taş',
    title: product.title,
    meta: meta || undefined,
    accent: brandTone(category?.slug).accent,
    photo,
  })
}
