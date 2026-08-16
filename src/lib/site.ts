/**
 * Sistem Granit — single source of truth for brand, contact and navigation.
 *
 * NOTE: Contact details below are PLACEHOLDERS. Replace the phone, WhatsApp,
 * e-mail and address with the real values before going live. The WhatsApp
 * number must be in international format with no "+" or spaces (e.g. 905xxxxxxxxx).
 */

/**
 * Canonical origin. Preview/branch deployments set NEXT_PUBLIC_SITE_URL so they
 * never emit production canonicals; production falls back to the real domain.
 */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://sistemgranit.com').replace(
  /\/$/,
  '',
)

export const site = {
  name: 'Sistem Granit',
  legalName: 'Sistem Granit Mermer San. ve Tic.',
  tagline: 'Tezgahın ölçüsünden montajına',
  description:
    'ARTEO, BELENCO, ÇİMSTONE ve COANTE kompozit taş (quartz) tezgahları. Mutfak ve banyo tezgahınızı ölçüden kesime, kesimden montaja Sistem Granit atölyesinde hazırlıyoruz.',
  foundedYear: 1998,
  // Contact — PLACEHOLDER values, update before launch.
  phoneDisplay: '+90 (212) 000 00 00',
  phoneHref: 'tel:+902120000000',
  whatsapp: '905300000000',
  email: 'info@sistemgranit.com',
  address: {
    line: 'Organize Sanayi Bölgesi, Mermerciler Cad. No: 1',
    district: 'Çekmeköy / İstanbul',
    country: 'Türkiye',
    mapsUrl: 'https://maps.google.com/?q=Sistem+Granit',
  },
  workingHours: 'Hafta içi 08:30 – 18:00 · Cumartesi 09:00 – 14:00',
  /** Machine-readable form of `workingHours`, for openingHoursSpecification. */
  hours: [
    { days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '08:30', closes: '18:00' },
    { days: ['Saturday'], opens: '09:00', closes: '14:00' },
  ],
  /** Cities/regions actively served — feeds schema.org areaServed. */
  areaServed: ['İstanbul', 'Kocaeli', 'Tekirdağ', 'Türkiye'],
  social: {
    instagram: 'https://instagram.com/',
    facebook: 'https://facebook.com/',
    linkedin: 'https://linkedin.com/',
    youtube: 'https://youtube.com/',
  },
} as const

export const nav = [
  { label: 'Ana Sayfa', href: '/' },
  { label: 'Ürünler', href: '/urunler' },
  { label: 'Markalar', href: '/markalar' },
  { label: 'Projeler', href: '/projeler' },
  { label: 'Hakkımızda', href: '/hakkimizda' },
  { label: 'İletişim', href: '/iletisim' },
] as const

/**
 * Quick trust facts shown in the hero fact band.
 * Every value here is derivable from the catalogue or the founding year — the
 * old "40+ ülke ihracat" and "CE · TSE" entries were flagged PLACEHOLDER and
 * are not claims a quartz fabricator can support, so they are gone.
 */
export const heroFacts = [
  { k: 'Kuruluş', v: String(site.foundedYear) },
  { k: 'Marka', v: '4 marka' }, // ARTEO · BELENCO · ÇİMSTONE · COANTE
  { k: 'Model', v: '150+ model' }, // catalogue currently holds 158 products
  { k: 'Hizmet', v: 'Ölçü · Montaj' },
] as const

/**
 * Headline numbers shown on the home page and about page.
 * TODO: "Tamamlanan proje" is inherited from the old copy — confirm the real
 * figure before launch, it is the only number here we cannot derive.
 */
export const stats = [
  { value: 28, suffix: '+', label: 'Yıllık tecrübe' },
  { value: 1200, suffix: '+', label: 'Tamamlanan mutfak' },
  { value: 150, suffix: '+', label: 'Tezgah modeli' },
  { value: 4, suffix: '', label: 'Kompozit taş markası' },
] as const

/** Brand promises — the "why us" pillars. */
export const valueProps = [
  {
    title: 'Yetkili marka bayiliği',
    body: 'ARTEO, BELENCO, ÇİMSTONE ve COANTE plakalarını doğrudan tedarik ediyor, orijinal ürün ve marka garantisiyle teslim ediyoruz.',
  },
  {
    title: 'Yerinde ölçü',
    body: 'Mutfağınızın ölçüsünü şablonla biz alırız; dolap üstü, eviye ve ocak boşlukları milimetrik oturur.',
  },
  {
    title: 'Kendi atölyemizde kesim',
    body: 'CNC kesim, pah, damlalık kanalı ve eviye montajı dışarıya verilmez — işin tamamı bizim kontrolümüzde.',
  },
  {
    title: 'Montaj dahil teslim',
    body: 'Sökümden yerleştirmeye, silikon ve ek yeri işçiliğinden temizliğe kadar tezgahı kullanıma hazır bırakırız.',
  },
] as const

/**
 * Media IDs for the two fixed page images, uploaded through the admin panel.
 * They are not editable per-page yet, so they live here rather than in a global.
 */
export const siteMedia = {
  hero: 243,
  about: 244,
} as const

export function whatsappUrl(message?: string) {
  const base = `https://api.whatsapp.com/send?phone=${site.whatsapp}`
  return message ? `${base}&text=${encodeURIComponent(message)}` : base
}
