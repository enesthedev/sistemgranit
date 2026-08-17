import { OG_CONTENT_TYPE, OG_SIZE, renderCard } from '@/lib/og/card'

export const alt = 'Tezgah uygulama referanslarımız'
export const size = OG_SIZE
export const contentType = OG_CONTENT_TYPE

export default function Image() {
  return renderCard({
    eyebrow: 'Referanslar',
    title: 'Projelerimiz',
    meta: 'Konut · Ticari · Otel',
  })
}
