import { brandTone } from '@/lib/brands'
import { OG_CONTENT_TYPE, OG_SIZE, cardNotFound, renderCard } from '@/lib/og/card'
import { logoDataUri } from '@/lib/og/media'
import { getBrandProductCounts, getCategoryBySlug } from '@/lib/queries'
import { site } from '@/lib/site'

export const alt = `${site.name} — kompozit taş markası`
export const size = OG_SIZE
export const contentType = OG_CONTENT_TYPE

/** Inlines the brand mark from `/api/media/…` — see the product card for why. */
export const dynamic = 'force-dynamic'

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const category = await getCategoryBySlug(slug)
  if (!category) return cardNotFound()

  const [logo, counts] = await Promise.all([logoDataUri(category.logo), getBrandProductCounts()])
  const total = counts[String(category.id)]

  return renderCard({
    eyebrow: 'Marka',
    title: `${category.name} tezgah modelleri`,
    meta: total ? `${total} model · Kompozit taş` : 'Kompozit taş tezgah',
    accent: brandTone(category.slug).accent,
    logo,
  })
}
