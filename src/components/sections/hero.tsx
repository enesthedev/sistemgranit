import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Phone } from 'lucide-react'

import { site } from '@/lib/site'
import { Button } from '@/components/ui/button'
import { Reveal } from '@/components/motion/reveal'

const facts = [
  { k: 'Kuruluş', v: String(site.foundedYear) },
  { k: 'İhracat', v: '30+ ülke' },
  { k: 'Üretim', v: 'Kendi tesisi' },
  { k: 'Teslim', v: 'Şantiyeye hazır' },
]

export function Hero() {
  return (
    <section className="relative isolate flex min-h-svh flex-col justify-end overflow-hidden bg-graphite">
      <Image
        src="/seed/hero.jpg"
        alt="Cilalı doğal taş yüzey"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-graphite via-graphite/55 to-graphite/30" />
      <div className="absolute inset-0 bg-gradient-to-r from-graphite/70 to-transparent" />

      <div className="container-page relative z-10 pb-12 pt-32">
        <Reveal delay={0.08}>
          <h1 className="max-w-4xl font-display text-[2.75rem] leading-[1.02] tracking-tight text-marble text-balance sm:text-6xl lg:text-7xl">
            Milyonlarca yılın değeri, projenizin imzası.
          </h1>
        </Reveal>

        <Reveal delay={0.16}>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-marble/70 text-pretty">
            Mermer, granit ve travertende ocaktan şantiyeye uzanan üretim gücü. İhracat
            kalitesinde doğal taşı, projenize özel kesim ve yüzey işlemleriyle buluşturuyoruz.
          </p>
        </Reveal>

        <Reveal delay={0.24}>
          <div className="mt-9 flex flex-wrap gap-3">
            <Button asChild size="lg">
              <Link href="/urunler">
                Koleksiyonu Keşfet
                <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-marble/30 bg-transparent text-marble hover:bg-marble hover:text-graphite"
            >
              <a href={site.phoneHref}>
                <Phone className="size-4" />
                Teklif Al
              </a>
            </Button>
          </div>
        </Reveal>
      </div>

      {/* Hero fact band */}
      <Reveal delay={0.3} className="relative z-10 border-t border-marble/15 backdrop-blur-sm">
        <dl className="container-page grid grid-cols-2 divide-marble/10 py-6 sm:grid-cols-4 sm:divide-x">
          {facts.map((f, i) => (
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
