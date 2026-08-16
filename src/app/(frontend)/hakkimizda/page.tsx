import type { Metadata } from 'next'

import { site, siteMedia } from '@/lib/site'
import { getMediaById } from '@/lib/queries'
import { PageHero } from '@/components/page-hero'
import { PayloadImage } from '@/components/media/payload-image'
import { SectionHeading } from '@/components/section-heading'
import { Stats } from '@/components/sections/stats'
import { CtaBanner } from '@/components/sections/cta-banner'
import { Reveal } from '@/components/motion/reveal'

export const metadata: Metadata = {
  title: 'Hakkımızda — Kompozit Taş Tezgah Üretimi',
  description:
    'Sistem Granit; ARTEO, BELENCO, ÇİMSTONE ve COANTE kompozit taş (quartz) tezgahlarını ölçüden montaja kendi atölyesinde işleyen bir tezgah üreticisidir.',
  alternates: { canonical: '/hakkimizda' },
}

const principles = [
  {
    title: 'Orijinal plaka, marka garantisi',
    body: 'Plakaları yetkili kanaldan tedarik ederiz. Aldığınız tezgah, seçtiğiniz markanın kendi garantisiyle gelir.',
  },
  {
    title: 'Ölçü hatası bizim sorunumuz',
    body: 'Ölçüyü şablonla biz alırız. Eviye, ocak ve duvar payı tutmazsa düzeltmek müşterinin değil bizim işimizdir.',
  },
  {
    title: 'Tek elden sorumluluk',
    body: 'Kesim de montaj da bize ait. Arada taşeron olmadığı için sorun çıktığında muhatap aramak zorunda kalmazsınız.',
  },
]

const steps = [
  {
    n: '01',
    title: 'Seçim & Numune',
    body: 'Mutfağınıza uygun markayı ve modeli birlikte belirler, karar öncesi elinize numune ulaştırırız.',
  },
  {
    n: '02',
    title: 'Yerinde Ölçü',
    body: 'Dolaplar takıldıktan sonra şablonla ölçü alır; eviye, ocak ve armatür boşluklarını netleştiririz.',
  },
  {
    n: '03',
    title: 'Kesim & Montaj',
    body: 'Plakayı atölyemizde CNC ile keser, pah ve damlalık kanalını açar, tezgahı yerine monte edip teslim ederiz.',
  },
]

export default async function AboutPage() {
  const story = await getMediaById(siteMedia.about)

  return (
    <>
      <PageHero
        eyebrow="Hakkımızda"
        title="Tezgahı baştan sona kendi işimiz olarak görüyoruz"
        description={`${site.foundedYear} yılından bu yana kompozit taş tezgahta ölçü, kesim ve montajı tek elden yapıyoruz.`}
      />

      {/* Story */}
      <section className="container-page grid items-center gap-12 py-16 md:py-24 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <div className="relative aspect-[4/5] overflow-hidden rounded-md bg-secondary">
            <PayloadImage
              media={story}
              size="card"
              alt="Kompozit taş tezgah kesim atölyesi"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </Reveal>
        <div>
          <SectionHeading
            eyebrow="Hikâyemiz"
            title="Taşı da mutfağı da tanıyan bir ekip"
          />
          <div className="mt-6 space-y-4 text-base leading-relaxed text-stone-muted">
            <p>
              Sistem Granit, küçük bir taş atölyesi olarak başladı. Yıllar içinde işin ağırlığı
              mutfak ve banyo tezgahına kaydı; bugün kompozit taş (quartz) tezgah üretimi ve
              montajı yapan bir atölyeyiz.
            </p>
            <p>
              ARTEO, BELENCO, ÇİMSTONE ve COANTE plakalarını yetkili kanaldan tedarik ediyor,
              işin geri kalanını kendimiz yapıyoruz: mutfağınızın ölçüsünü şablonla alıyor,
              plakayı atölyemizde CNC ile kesiyor, pah ve damlalık kanalını açıyor, eviyeyi
              monte edip tezgahı yerine yerleştiriyoruz.
            </p>
            <p>
              Kompozit taşı tercih etmemizin sebebi basit: gözeneksiz olduğu için leke tutmaz,
              doğal taşa göre çok daha az bakım ister ve renk tutarlılığı plakadan plakaya
              değişmez. Mutfak tezgahı günde onlarca kez dokunulan bir yüzey; bizim işimiz onu
              yıllarca ilk günkü gibi tutmak.
            </p>
          </div>
        </div>
      </section>

      {/* Principles */}
      <section className="border-y border-vein bg-marble-raised py-16 md:py-24">
        <div className="container-page">
          <SectionHeading
            eyebrow="İlkelerimiz"
            title="Neden Sistem Granit?"
            align="center"
          />
          <div className="mt-12 grid gap-x-8 gap-y-10 md:grid-cols-3">
            {principles.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.08} className="flex flex-col gap-3">
                <div className="vein-rule" />
                <h3 className="font-display text-xl tracking-tight">{p.title}</h3>
                <p className="text-sm leading-relaxed text-stone-muted">{p.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Stats />

      {/* Process — a genuine sequence, so numbered */}
      <section className="container-page py-16 md:py-24">
        <SectionHeading
          eyebrow="Süreç"
          title="Numuneden teslimata"
          description="Model seçiminden montaja kadar şeffaf ve takip edilebilir bir akış."
        />
        <ol className="mt-12 grid gap-8 md:grid-cols-3">
          {steps.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.08} as="li" className="relative">
              <span className="font-mono text-sm text-brand">{s.n}</span>
              <h3 className="mt-3 font-display text-2xl tracking-tight">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-stone-muted">{s.body}</p>
            </Reveal>
          ))}
        </ol>
      </section>

      <CtaBanner />
    </>
  )
}
