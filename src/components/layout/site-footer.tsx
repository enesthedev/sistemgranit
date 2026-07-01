import Link from 'next/link'
import { MapPin, Phone, Mail } from 'lucide-react'

import { nav, site } from '@/lib/site'
import {
  InstagramIcon,
  FacebookIcon,
  LinkedinIcon,
  YoutubeIcon,
} from '@/components/icons/social'

const socials = [
  { href: site.social.instagram, label: 'Instagram', Icon: InstagramIcon },
  { href: site.social.facebook, label: 'Facebook', Icon: FacebookIcon },
  { href: site.social.linkedin, label: 'LinkedIn', Icon: LinkedinIcon },
  { href: site.social.youtube, label: 'YouTube', Icon: YoutubeIcon },
]

export function SiteFooter() {
  return (
    <footer className="bg-graphite text-marble">
      <div className="container-page py-16">
        <div className="grid gap-12 md:grid-cols-12">
          {/* Brand */}
          <div className="md:col-span-5">
            <Link href="/" className="font-display text-3xl tracking-tight text-marble">
              Sistem<span className="text-brand">.</span>Granit
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-marble/60">
              {site.description}
            </p>
            <div className="mt-6 flex gap-2">
              {socials.map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex size-10 items-center justify-center rounded-md border border-marble/15 text-marble/70 transition-colors hover:border-brand hover:text-brand"
                >
                  <Icon className="size-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Nav */}
          <div className="md:col-span-3">
            <h3 className="eyebrow text-marble/40">Site Haritası</h3>
            <ul className="mt-4 space-y-3">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-marble/70 transition-colors hover:text-marble"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="md:col-span-4">
            <h3 className="eyebrow text-marble/40">İletişim</h3>
            <ul className="mt-4 space-y-4 text-sm text-marble/70">
              <li className="flex gap-3">
                <MapPin className="mt-0.5 size-4 shrink-0 text-brand" />
                <span>
                  {site.address.line}
                  <br />
                  {site.address.district}
                </span>
              </li>
              <li>
                <a href={site.phoneHref} className="flex gap-3 transition-colors hover:text-marble">
                  <Phone className="mt-0.5 size-4 shrink-0 text-brand" />
                  {site.phoneDisplay}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="flex gap-3 transition-colors hover:text-marble"
                >
                  <Mail className="mt-0.5 size-4 shrink-0 text-brand" />
                  {site.email}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-marble/10">
        <div className="container-page flex flex-col items-center justify-between gap-2 py-6 text-xs text-marble/40 sm:flex-row">
          <p>
            © {site.foundedYear}–2026 {site.legalName}. Tüm hakları saklıdır.
          </p>
          <p className="font-mono uppercase tracking-widest">{site.tagline}</p>
        </div>
      </div>
    </footer>
  )
}
