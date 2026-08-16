import Link from 'next/link'
import { ArrowRight, Phone } from 'lucide-react'

import { heroFacts, site, siteMedia } from '@/lib/site'
import { getMediaById } from '@/lib/queries'
import { Button } from '@/components/ui/button'
import { PayloadImage } from '@/components/media/payload-image'
import { Reveal } from '@/components/motion/reveal'

export async function Hero() {
  const cover = await getMediaById(siteMedia.hero)

  return (
    <section className="relative isolate flex min-h-svh flex-col justify-end overflow-hidden bg-graphite">
      <PayloadImage
        media={cover}
        size="hero"
        alt="Kompozit taş mutfak tezgahı yüzeyi"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-graphite via-graphite/55 to-graphite/30" />
      <div className="absolute inset-0 bg-gradient-to-r from-graphite/70 to-transparent" />

      <div className="container-page relative z-10 pb-12 pt-32">
        <Reveal delay={0.08} immediate>
          <h1 className="max-w-4xl font-display text-[2.75rem] leading-[1.02] tracking-tight text-marble text-balance sm:text-6xl lg:text-7xl">
            Mutfağınızın en çok dokunulan yüzeyi.
          </h1>
        </Reveal>

        <Reveal delay={0.16} immediate>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-marble/70 text-pretty">
            ARTEO, BELENCO, ÇİMSTONE ve COANTE kompozit taş (quartz) tezgahlarını
            yerinde ölçüden CNC kesime, kesimden montaja kendi atölyemizde hazırlıyoruz.
            Lekelenmeyen, çizilmeye dayanıklı bir mutfak tezgahı için doğru adres.
          </p>
        </Reveal>

        <Reveal delay={0.24} immediate>
          <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3">
            <Button asChild size="lg" className="bg-marble text-graphite hover:bg-marble/90">
              <Link href="/urunler" className="group">
                Koleksiyonu Keşfet
                <ArrowRight className="size-4 text-brand transition-transform duration-300 group-hover:translate-x-0.5" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="ghost"
              className="text-marble/85 hover:bg-transparent hover:text-marble"
            >
              <a href={site.phoneHref} className="group">
                <Phone className="size-4" />
                <span className="underline-offset-[6px] group-hover:underline">Teklif Al</span>
              </a>
            </Button>
          </div>
        </Reveal>
      </div>

      {/* Hero fact band */}
      <Reveal delay={0.3} immediate className="relative z-10 border-t border-marble/15 backdrop-blur-sm">
        <dl className="container-page grid grid-cols-2 divide-marble/10 py-6 sm:grid-cols-4 sm:divide-x">
          {heroFacts.map((f, i) => (
            <div key={f.k} className={i > 0 ? 'sm:pl-6' : ''}>
              <dt className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-marble/45">
                {f.k}
              </dt>
              <dd className="mt-1 font-display text-xl text-marble">{f.v}</dd>
            </div>
          ))}
        </dl>
      </Reveal>
    </section>
  )
}
