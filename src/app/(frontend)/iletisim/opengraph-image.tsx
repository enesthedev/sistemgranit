import { OG_CONTENT_TYPE, OG_SIZE, renderCard } from '@/lib/og/card'

export const alt = 'Sistem Granit iletişim'
export const size = OG_SIZE
export const contentType = OG_CONTENT_TYPE

export default function Image() {
  return renderCard({
    eyebrow: 'İletişim',
    title: 'Bize ulaşın',
    // No phone number here on purpose — the one in site.ts is still a placeholder.
    meta: 'Numune · Fiyat teklifi · Yerinde ölçü',
  })
}
