import { OG_CONTENT_TYPE, OG_SIZE, renderCard } from '@/lib/og/card'

export const alt = 'Kompozit taş tezgah ürünlerimiz'
export const size = OG_SIZE
export const contentType = OG_CONTENT_TYPE

export default function Image() {
  return renderCard({
    eyebrow: 'Koleksiyon',
    title: 'Kompozit taş tezgah ürünlerimiz',
    meta: '4 marka · 150+ model',
  })
}
