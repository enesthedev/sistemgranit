import { Phone, MessageCircle } from 'lucide-react'

import { site, whatsappUrl } from '@/lib/site'
import { Button } from '@/components/ui/button'
import { Reveal } from '@/components/motion/reveal'

type Props = {
  title?: string
  description?: string
}

export function CtaBanner({
  title = 'Mutfağınız için doğru tezgahı birlikte seçelim',
  description = 'Numune, stok durumu ve fiyat teklifi için ekibimizle iletişime geçin. Aynı gün dönüş yapıyoruz.',
}: Props) {
  return (
    <section className="bg-brand text-primary-foreground">
      <div className="container-page flex flex-col items-start justify-between gap-8 py-16 md:flex-row md:items-center md:py-20">
        <Reveal className="max-w-xl">
          <h2 className="font-display text-3xl leading-tight tracking-tight text-balance sm:text-4xl">
            {title}
          </h2>
          <p className="mt-4 text-primary-foreground/80">{description}</p>
        </Reveal>
        <Reveal delay={0.1} className="flex shrink-0 flex-wrap gap-3">
          <Button
            asChild
            size="lg"
            className="bg-graphite text-marble hover:bg-graphite-soft"
          >
            <a href={site.phoneHref}>
              <Phone className="size-4" />
              {site.phoneDisplay}
            </a>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="border-primary-foreground/40 bg-transparent text-primary-foreground hover:bg-primary-foreground hover:text-brand"
          >
            <a href={whatsappUrl('Merhaba, bir projem için teklif almak istiyorum.')}>
              <MessageCircle className="size-4" />
              WhatsApp ile Yaz
            </a>
          </Button>
        </Reveal>
      </div>
    </section>
  )
}
