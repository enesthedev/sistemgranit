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
  title: 'Hakkımızda',
  description:
    'Sistem Granit; ocaktan şantiyeye uzanan üretim gücüyle mermer, granit ve traverten sunan bir doğal taş üreticisidir.',
}

const principles = [
  {
    title: 'Ocaktan başlayan kalite',
    body: 'Blokları kaynağında seçer, kendi tesisimizde işleriz. Böylece renk ve doku tutarlılığını uçtan uca koruruz.',
  },
  {
    title: 'Söz verdiğimiz gün teslim',
    body: 'Planlanan üretim takvimi ve ihracat tecrübesiyle projelerin zamanında ilerlemesini önceliklendiririz.',
  },
  {
    title: 'Projeye özel çözüm',
    body: 'Ebatlama, yüzey işlemi ve özel kesimlerle taşı, mekânın ve uygulamacının ihtiyacına göre hazırlarız.',
  },
]

const steps = [
  { n: '01', title: 'Seçim & Numune', body: 'İhtiyacınıza uygun taşı belirler, numune ve blok görsellerini paylaşırız.' },
  { n: '02', title: 'Üretim & Kesim', body: 'Onaylanan ürünü tesisimizde ebatlar, yüzey işlemlerini uygularız.' },
  { n: '03', title: 'Teslimat', body: 'Şantiyeye hazır şekilde, güvenli ambalajla yurt içi ve yurt dışına sevk ederiz.' },
]

export default async function AboutPage() {
  const story = await getMediaById(siteMedia.about)

  return (
    <>
      <PageHero
        eyebrow="Hakkımızda"
        title="Doğal taşı, mimarinin kalıcı diline çeviriyoruz"
        description={`${site.foundedYear} yılından bu yana mermer, granit ve travertende üretici güvencesiyle çalışıyoruz.`}
      />

      {/* Story */}
      <section className="container-page grid items-center gap-12 py-16 md:py-24 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <div className="relative aspect-[4/5] overflow-hidden rounded-md bg-secondary">
            <PayloadImage
              media={story}
              size="card"
              alt="Doğal taş işleme tesisi"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </Reveal>
        <div>
          <SectionHeading
            eyebrow="Hikâyemiz"
            title="Taşı tanıyan bir ekibin işi"
          />
          <div className="mt-6 space-y-4 text-base leading-relaxed text-stone-muted">
            <p>
              Sistem Granit, küçük bir atölyeden bugünün modern üretim tesisine uzanan bir yolda,
              doğal taşı işleme sanatını nesilden nesile aktararak büyüdü. Mermerin damarını,
              granitin sertliğini ve travertenin sıcaklığını tanıyan bir ekiple çalışıyoruz.
            </p>
            <p>
              Ocaktan seçtiğimiz blokları kendi tesisimizde plakaya, ebada ve yüzeye dönüştürüyor;
              konut projelerinden otellere, ticari alanlardan kamu yapılarına kadar geniş bir
              yelpazede doğal taş tedarik ediyoruz. Otuza yakın ülkeye yaptığımız sevkiyatlarla
              uluslararası kalite standartlarını günlük işimizin parçası hâline getirdik.
            </p>
            <p>
              Bizim için doğal taş yalnızca bir malzeme değil; mekâna kalıcılık ve karakter katan
              bir imzadır. Her projede bu imzanın arkasında durmak için üretimin her adımını kendi
              kontrolümüzde tutarız.
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
          description="Doğru taş seçiminden şantiyeye teslime kadar şeffaf ve takip edilebilir bir akış."
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
