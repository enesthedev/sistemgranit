/**
 * Sistem Granit — single source of truth for brand, contact and navigation.
 *
 * NOTE: Contact details below are PLACEHOLDERS. Replace the phone, WhatsApp,
 * e-mail and address with the real values before going live. The WhatsApp
 * number must be in international format with no "+" or spaces (e.g. 905xxxxxxxxx).
 */

export const site = {
  name: 'Sistem Granit',
  legalName: 'Sistem Granit Mermer San. ve Tic.',
  tagline: 'Doğal taşın mimariyle buluştuğu yer',
  description:
    'Mermer, granit ve traverten üretimi ve satışı. Ocaktan şantiyeye, ihracat kalitesinde doğal taş çözümleri sunan Sistem Granit ile projelerinize kalıcı bir değer katın.',
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
  { label: 'Projeler', href: '/projeler' },
  { label: 'Hakkımızda', href: '/hakkimizda' },
  { label: 'İletişim', href: '/iletisim' },
] as const

/** Quick trust facts shown in the hero fact band. */
export const heroFacts = [
  { k: 'Kuruluş', v: String(site.foundedYear) }, // real (1998)
  { k: 'İhracat', v: '40+ ülke' }, // PLACEHOLDER — confirm real count
  { k: 'Taş çeşidi', v: '80+ çeşit' }, // matches `stats`
  { k: 'Kalite', v: 'CE · TSE' }, // PLACEHOLDER — confirm real certifications
] as const

/** Headline numbers shown on the home page and about page. */
export const stats = [
  { value: 28, suffix: '+', label: 'Yıllık tecrübe' },
  { value: 1200, suffix: '+', label: 'Tamamlanan proje' },
  { value: 80, suffix: '+', label: 'Taş çeşidi' },
  { value: 40, suffix: '', label: 'İhracat ülkesi' },
] as const

/** Brand promises — the "why us" pillars. */
export const valueProps = [
  {
    title: 'Üretici güvencesi',
    body: 'Kendi tesisimizde işlenen bloklar; aracısız fiyat ve uçtan uca kalite kontrolü.',
  },
  {
    title: 'İhracat standardı',
    body: 'Kırka yakın ülkeye sevkiyat yapan ekibimizle uluslararası tolerans ve ambalaj normları.',
  },
  {
    title: 'Geniş stok',
    body: 'Mermer, granit, traverten ve oniks gruplarında sürekli güncellenen blok ve plaka stoğu.',
  },
  {
    title: 'Projeye özel kesim',
    body: 'Ebatlama, pah, su kanalı ve özel yüzey işlemleri ile şantiyeye hazır teslim.',
  },
] as const

export function whatsappUrl(message?: string) {
  const base = `https://api.whatsapp.com/send?phone=${site.whatsapp}`
  return message ? `${base}&text=${encodeURIComponent(message)}` : base
}
