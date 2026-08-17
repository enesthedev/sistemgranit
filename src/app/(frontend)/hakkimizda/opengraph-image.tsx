import { OG_CONTENT_TYPE, OG_SIZE, renderCard } from '@/lib/og/card'
import { site } from '@/lib/site'

export const alt = 'Sistem Granit hakkında'
export const size = OG_SIZE
export const contentType = OG_CONTENT_TYPE

export default function Image() {
  return renderCard({
    eyebrow: 'Hakkımızda',
    title: 'Tezgahı baştan sona kendi işimiz olarak görüyoruz',
    meta: `${site.foundedYear}'den beri · Ölçü · Kesim · Montaj`,
  })
}
