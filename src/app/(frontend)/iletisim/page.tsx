import type { Metadata } from 'next'
import { Phone, MessageCircle, Mail, MapPin, Clock } from 'lucide-react'

import { site, whatsappUrl } from '@/lib/site'
import { PageHero } from '@/components/page-hero'
import { Button } from '@/components/ui/button'
import { ContactForm } from '@/components/contact/contact-form'

export const metadata: Metadata = {
  title: 'İletişim',
  description:
    'Sistem Granit ile iletişime geçin. Telefon, WhatsApp veya formla numune ve fiyat teklifi talep edin.',
}

export default function ContactPage() {
  const mapSrc = `https://maps.google.com/maps?q=${encodeURIComponent(
    `${site.address.line} ${site.address.district}`,
  )}&output=embed`

  return (
    <>
      <PageHero
        eyebrow="İletişim"
        title="Bize ulaşın"
        description="Numune talebi, stok durumu veya fiyat teklifi için en hızlı yol telefon ve WhatsApp. Dilerseniz formu da doldurabilirsiniz."
      />

      <div className="container-page grid gap-12 py-12 md:py-16 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
        {/* Contact details */}
        <div className="flex flex-col gap-8">
          <div className="flex flex-wrap gap-3">
            <Button asChild size="lg">
              <a href={site.phoneHref}>
                <Phone className="size-4" />
                Hemen Ara
              </a>
            </Button>
            <Button asChild size="lg" variant="outline">
              <a href={whatsappUrl('Merhaba, bilgi almak istiyorum.')}>
                <MessageCircle className="size-4" />
                WhatsApp
              </a>
            </Button>
          </div>

          <dl className="divide-y divide-vein border-y border-vein">
            <ContactRow icon={Phone} label="Telefon">
              <a href={site.phoneHref} className="hover:text-brand">{site.phoneDisplay}</a>
            </ContactRow>
            <ContactRow icon={Mail} label="E-posta">
              <a href={`mailto:${site.email}`} className="hover:text-brand">{site.email}</a>
            </ContactRow>
            <ContactRow icon={MapPin} label="Adres">
              <a
                href={site.address.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-brand"
              >
                {site.address.line}, {site.address.district}
              </a>
            </ContactRow>
            <ContactRow icon={Clock} label="Çalışma Saatleri">
              {site.workingHours}
            </ContactRow>
          </dl>

          <div className="relative aspect-[16/10] overflow-hidden rounded-md border border-vein bg-secondary">
            <iframe
              title="Harita"
              src={mapSrc}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 h-full w-full"
            />
          </div>
        </div>

        {/* Form */}
        <div className="rounded-lg border border-vein bg-marble-raised p-6 sm:p-8">
          <h2 className="font-display text-2xl tracking-tight">Teklif & Bilgi Formu</h2>
          <p className="mt-2 text-sm text-stone-muted">
            Formu doldurun, ekibimiz en kısa sürede dönüş yapsın.
          </p>
          <div className="mt-6">
            <ContactForm />
          </div>
        </div>
      </div>
    </>
  )
}

function ContactRow({
  icon: Icon,
  label,
  children,
}: {
  icon: React.ElementType
  label: string
  children: React.ReactNode
}) {
  return (
    <div className="flex items-start gap-4 py-5">
      <Icon className="mt-0.5 size-5 shrink-0 text-brand" strokeWidth={1.5} />
      <div>
        <dt className="font-mono text-xs uppercase tracking-[0.18em] text-stone-muted">{label}</dt>
        <dd className="mt-1 text-sm text-foreground">{children}</dd>
      </div>
    </div>
  )
}
