import { OG_CONTENT_TYPE, OG_SIZE, renderCard } from '@/lib/og/card'
import { site } from '@/lib/site'

/**
 * Site-wide default card.
 *
 * `opengraph-image` is inherited down the segment tree, so this covers the home
 * page and every route that does not ship its own file. It reads nothing but
 * local files, so it is prerendered at build.
 */
export const alt = `${site.name} — ${site.tagline}`
export const size = OG_SIZE
export const contentType = OG_CONTENT_TYPE

export default function Image() {
  return renderCard({
    eyebrow: 'Kompozit taş tezgah',
    title: site.tagline,
    meta: 'Arteo · Belenco · Çimstone · Coante',
  })
}
