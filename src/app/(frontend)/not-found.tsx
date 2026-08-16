import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'

import { PageHero } from '@/components/page-hero'

export const metadata: Metadata = {
  title: 'Sayfa bulunamadı',
  robots: { index: false, follow: true },
}

const links = [
  { href: '/urunler', label: 'Tezgah modelleri', hint: 'Kompozit taş koleksiyonunun tamamı' },
  { href: '/markalar', label: 'Markalar', hint: 'ARTEO · BELENCO · ÇİMSTONE · COANTE' },
  { href: '/projeler', label: 'Projeler', hint: 'Tamamladığımız uygulamalar' },
  { href: '/iletisim', label: 'İletişim', hint: 'Fiyat teklifi ve numune talebi' },
]

export default function NotFound() {
  return (
    <>
      <PageHero
        eyebrow="404"
        title="Aradığınız sayfa bulunamadı"
        description="Bağlantı taşınmış, adres yanlış yazılmış ya da ürün kaldırılmış olabilir. Aşağıdan devam edebilirsiniz."
      />

      <div className="container-page py-12 md:py-16">
        <ul className="grid gap-4 sm:grid-cols-2">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className="group flex items-center justify-between gap-4 rounded-md border border-vein bg-marble-raised px-5 py-5 transition-colors hover:border-brand"
              >
                <span>
                  <span className="block font-display text-xl tracking-tight transition-colors group-hover:text-brand">
                    {l.label}
                  </span>
                  <span className="mt-1 block text-sm text-stone-muted">{l.hint}</span>
                </span>
                <ArrowUpRight className="size-5 shrink-0 text-stone-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand" />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}
