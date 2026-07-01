/**
 * Seeds sample Turkish marble/granite content (categories, products, projects)
 * using the procedural images in public/seed/.
 *
 *   bun scripts/seed.mjs          # seed only if empty
 *   bun scripts/seed.mjs --force  # wipe content collections, then reseed
 */
import { getPayload } from 'payload'
import path from 'node:path'
import config from '../src/payload.config.ts'

const FORCE = process.argv.includes('--force')
const payload = await getPayload({ config })

/** Minimal Lexical editor state from plain paragraphs. */
function lex(paragraphs) {
  return {
    root: {
      type: 'root',
      format: '',
      indent: 0,
      version: 1,
      direction: 'ltr',
      children: paragraphs.map((text) => ({
        type: 'paragraph',
        version: 1,
        format: '',
        indent: 0,
        direction: 'ltr',
        children: [
          { type: 'text', version: 1, text, format: 0, style: '', mode: 'normal', detail: 0 },
        ],
      })),
    },
  }
}

const mediaCache = new Map()
async function img(file, alt) {
  if (mediaCache.has(file)) return mediaCache.get(file)
  const doc = await payload.create({
    collection: 'media',
    data: { alt },
    filePath: path.resolve('public/seed', file),
  })
  mediaCache.set(file, doc.id)
  return doc.id
}

if (FORCE) {
  for (const c of ['products', 'projects', 'categories', 'media', 'contact-submissions']) {
    await payload.delete({ collection: c, where: { id: { exists: true } } })
  }
  console.log('Wiped existing content.')
} else {
  const { totalDocs } = await payload.count({ collection: 'categories' })
  if (totalDocs > 0) {
    console.log('Content already present — run with --force to reseed. Skipping.')
    process.exit(0)
  }
}

// ── Categories ────────────────────────────────────────────────
const categoryDefs = [
  { name: 'Mermer', slug: 'mermer', order: 1, file: 'category-mermer.jpg', description: 'Damarlı dokusu ve sıcak tonlarıyla zamansız bir zarafet.' },
  { name: 'Granit', slug: 'granit', order: 2, file: 'category-granit.jpg', description: 'Yüksek dayanım ve aşınma direnci; yoğun kullanım alanları için ideal.' },
  { name: 'Traverten', slug: 'traverten', order: 3, file: 'category-traverten.jpg', description: 'Doğal gözenekli yapısı ve toprak tonlarıyla Anadolu’nun klasiği.' },
  { name: 'Oniks', slug: 'oniks', order: 4, file: 'category-oniks.jpg', description: 'Işığı geçiren yarı saydam yapısıyla prestijli mekânların tercihi.' },
  { name: 'Quartz', slug: 'quartz', order: 5, file: 'category-quartz.jpg', description: 'Homojen yüzeyi ve düşük bakım ihtiyacıyla modern kompozit taş.' },
]

const categoryIds = {}
for (const c of categoryDefs) {
  const image = await img(c.file, `${c.name} kategori görseli`)
  const doc = await payload.create({
    collection: 'categories',
    data: { name: c.name, slug: c.slug, order: c.order, description: c.description, image },
  })
  categoryIds[c.slug] = doc.id
}
console.log('Categories created.')

// ── Products ──────────────────────────────────────────────────
const productDefs = [
  { title: 'Afyon Beyazı', slug: 'afyon-beyazi', cat: 'mermer', color: 'Beyaz', origin: 'Afyon', finish: ['cilali', 'honlanmis'], applications: ['zemin', 'duvar', 'merdiven'], thickness: '2 cm / 3 cm', sizes: 'Serbest plaka, 60×60', featured: true, desc: ['Afyon Beyazı, ince gri damarlarıyla sade ve aydınlık mekânlar için ideal bir mermerdir.', 'Cilalı yüzeyiyle ışığı yumuşakça yansıtır; iç mekân zeminlerinde ve duvar kaplamalarında tercih edilir.'] },
  { title: 'Marmara Beyazı', slug: 'marmara-beyazi', cat: 'mermer', color: 'Beyaz-Gri', origin: 'Marmara', finish: ['cilali', 'eskitme'], applications: ['duvar', 'banyo', 'tezgah'], thickness: '2 cm', sizes: 'Serbest plaka', featured: true, desc: ['Belirgin gri damarlarıyla Marmara Beyazı, hareketli ve karakterli bir görünüm sunar.', 'Banyo ve ıslak hacimlerde şık bir bütünlük oluşturur.'] },
  { title: 'Emperador Mermer', slug: 'emperador', cat: 'mermer', color: 'Kahve', origin: 'İspanya', finish: ['cilali'], applications: ['duvar', 'somine'], thickness: '2 cm', sizes: 'Serbest plaka', featured: false, desc: ['Koyu kahve zemini ve altın damarlarıyla sıcak, lüks bir atmosfer yaratır.'] },
  { title: 'Absolute Black Granit', slug: 'absolute-black', cat: 'granit', color: 'Siyah', origin: 'Hindistan', finish: ['cilali', 'honlanmis'], applications: ['tezgah', 'zemin', 'cephe'], thickness: '2 cm / 3 cm', sizes: 'Serbest plaka', featured: true, desc: ['Derin, homojen siyahıyla Absolute Black; mutfak tezgâhı ve prestijli cephelerde standart hâline gelmiş bir granittir.', 'Yüksek dayanımı sayesinde yoğun kullanım alanlarında uzun ömür sağlar.'] },
  { title: 'Bordo Granit', slug: 'bordo-granit', cat: 'granit', color: 'Bordo', origin: 'Türkiye', finish: ['cilali', 'fircali'], applications: ['cephe', 'zemin'], thickness: '3 cm', sizes: '60×60, 30×60', featured: false, desc: ['Kırmızı-bordo tonları ve kristal dokusuyla dış cephelerde güçlü bir karakter sunar.'] },
  { title: 'Gri Granit', slug: 'gri-granit', cat: 'granit', color: 'Gri', origin: 'Türkiye', finish: ['honlanmis', 'kumlanmis'], applications: ['zemin', 'merdiven', 'cephe'], thickness: '2 cm / 3 cm', sizes: 'Serbest plaka', featured: false, desc: ['Nötr gri tonuyla her tasarıma uyum sağlayan, dayanıklı bir dış mekân granitidir.'] },
  { title: 'Klasik Traverten', slug: 'klasik-traverten', cat: 'traverten', color: 'Bej', origin: 'Denizli', finish: ['honlanmis', 'eskitme'], applications: ['duvar', 'cephe', 'zemin'], thickness: '2 cm / 3 cm', sizes: '40×60, serbest', featured: true, desc: ['Sıcak bej tonu ve doğal gözenekleriyle Klasik Traverten, iç ve dış mekânda Anadolu sıcaklığını taşır.', 'Eskitme yüzeyiyle rustik projelerde sıkça kullanılır.'] },
  { title: 'Ceviz Traverten', slug: 'ceviz-traverten', cat: 'traverten', color: 'Kahve', origin: 'Sivas', finish: ['honlanmis', 'patinato'], applications: ['duvar', 'cephe'], thickness: '3 cm', sizes: 'Serbest plaka', featured: false, desc: ['Koyu ceviz tonlarıyla cephelerde derinlik ve karakter oluşturur.'] },
  { title: 'Bal Oniksi', slug: 'bal-oniks', cat: 'oniks', color: 'Bal', origin: 'İran', finish: ['cilali'], applications: ['duvar', 'banyo'], thickness: '2 cm', sizes: 'Serbest plaka', featured: true, desc: ['Arkadan aydınlatıldığında ışığı geçiren Bal Oniksi, resepsiyon ve banyolarda gösterişli bir odak yaratır.', 'Her plaka kendine özgü desene sahiptir.'] },
  { title: 'Yeşil Oniks', slug: 'yesil-oniks', cat: 'oniks', color: 'Yeşil', origin: 'Pakistan', finish: ['cilali'], applications: ['duvar', 'tezgah'], thickness: '2 cm', sizes: 'Serbest plaka', featured: false, desc: ['Derin yeşil tonları ve damarlı yapısıyla lüks iç mekânların prestij taşıdır.'] },
  { title: 'Beyaz Quartz', slug: 'beyaz-quartz', cat: 'quartz', color: 'Beyaz', origin: 'Kompozit', finish: ['cilali'], applications: ['tezgah', 'banyo'], thickness: '2 cm / 3 cm', sizes: '320×160 plaka', featured: false, desc: ['Homojen beyaz yüzeyi, lekeye dayanıklı yapısıyla mutfak tezgâhlarında pratik ve hijyenik bir seçimdir.'] },
  { title: 'Gri Quartz', slug: 'gri-quartz', cat: 'quartz', color: 'Gri', origin: 'Kompozit', finish: ['cilali', 'honlanmis'], applications: ['tezgah', 'zemin'], thickness: '2 cm', sizes: '320×160 plaka', featured: false, desc: ['Modern gri tonu ve düşük bakım ihtiyacıyla çağdaş mutfaklarda öne çıkar.'] },
]

for (const p of productDefs) {
  const images = [
    { image: await img(`${p.slug}.jpg`, `${p.title} doğal taş plaka`) },
    { image: await img(`${p.slug}-2.jpg`, `${p.title} yüzey detayı`) },
  ]
  await payload.create({
    collection: 'products',
    data: {
      title: p.title,
      slug: p.slug,
      category: categoryIds[p.cat],
      color: p.color,
      origin: p.origin,
      finish: p.finish,
      applications: p.applications,
      specs: { thickness: p.thickness, sizes: p.sizes },
      featured: p.featured,
      images,
      description: lex(p.desc),
    },
  })
}
console.log('Products created.')

// ── Projects ──────────────────────────────────────────────────
const projectDefs = [
  { title: 'Bahçeşehir Konut Projesi', slug: 'bahcesehir-konut', type: 'konut', location: 'İstanbul', year: 2024, cover: 'project-1.jpg', gallery: ['afyon-beyazi.jpg', 'marmara-beyazi.jpg'], featured: true, desc: ['Lüks bir konut projesinin ortak alanlarında Afyon Beyazı mermer zemin ve duvar kaplamaları uygulandı.', 'Aydınlık lobiler ve zarif merdiven detaylarıyla mekâna zamansız bir karakter kazandırıldı.'] },
  { title: 'Bodrum Butik Otel', slug: 'bodrum-butik-otel', type: 'otel', location: 'Muğla', year: 2023, cover: 'project-3.jpg', gallery: ['bal-oniks.jpg', 'klasik-traverten.jpg'], featured: true, desc: ['Resepsiyon bankosunda arkadan aydınlatmalı Bal Oniksi, dış alanlarda traverten kullanıldı.', 'Akdeniz dokusuyla modern lüksü buluşturan bir uygulama gerçekleştirildi.'] },
  { title: 'Levent Ofis Lobisi', slug: 'levent-ofis-lobisi', type: 'ticari', location: 'İstanbul', year: 2024, cover: 'project-4.jpg', gallery: ['absolute-black.jpg', 'gri-granit.jpg'], featured: true, desc: ['Yoğun yaya trafiğine sahip ofis lobisinde Absolute Black granit zemin tercih edildi.', 'Dayanıklılık ve prestij ön planda tutuldu.'] },
  { title: 'Çeşme Villa', slug: 'cesme-villa', type: 'konut', location: 'İzmir', year: 2022, cover: 'project-5.jpg', gallery: ['marmara-beyazi.jpg', 'beyaz-quartz.jpg'], featured: false, desc: ['Deniz manzaralı villada açık-gri mermer ve quartz tezgâhlarla ferah bir iç mekân kurgulandı.'] },
  { title: 'Ankara Kültür Merkezi', slug: 'ankara-kultur-merkezi', type: 'kamu', location: 'Ankara', year: 2023, cover: 'project-2.jpg', gallery: ['klasik-traverten.jpg', 'ceviz-traverten.jpg'], featured: false, desc: ['Kamuya açık bir kültür yapısının cephe ve fuayelerinde traverten kaplamalar kullanıldı.'] },
  { title: 'Eskişehir Meydan Peyzajı', slug: 'eskisehir-meydan-peyzaji', type: 'peyzaj', location: 'Eskişehir', year: 2021, cover: 'project-6.jpg', gallery: ['gri-granit.jpg', 'bordo-granit.jpg'], featured: false, desc: ['Kentsel meydan düzenlemesinde dış mekâna dayanıklı granit döşeme ve bordür uygulandı.'] },
]

for (const pr of projectDefs) {
  const coverImage = await img(pr.cover, `${pr.title} kapak görseli`)
  const gallery = []
  for (const g of pr.gallery) gallery.push({ image: await img(g, `${pr.title} detay`) })
  await payload.create({
    collection: 'projects',
    data: {
      title: pr.title,
      slug: pr.slug,
      type: pr.type,
      location: pr.location,
      year: pr.year,
      featured: pr.featured,
      coverImage,
      gallery,
      description: lex(pr.desc),
    },
  })
}
console.log('Projects created.')

console.log('Seed complete.')
process.exit(0)
