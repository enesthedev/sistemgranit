'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Phone, MessageCircle, Mail, MapPin } from 'lucide-react'
import { Dialog } from 'radix-ui'

import { cn } from '@/lib/utils'
import { nav, site, whatsappUrl } from '@/lib/site'
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

export function NavOverlay({ triggerClassName }: { triggerClassName?: string }) {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <button
          type="button"
          aria-label="Menüyü aç"
          className={cn(
            'inline-flex items-center px-1 font-mono text-xs uppercase tracking-[0.2em]',
            triggerClassName,
          )}
        >
          MENÜ
        </button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[60] bg-graphite/40 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=open]:fade-in data-[state=closed]:fade-out" />
        <Dialog.Content
          className="fixed inset-0 z-[70] flex flex-col overflow-y-auto bg-graphite text-marble outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=open]:fade-in data-[state=closed]:fade-out data-[state=open]:slide-in-from-top-2"
        >
          <Dialog.Title className="sr-only">Site menüsü</Dialog.Title>

          {/* Overlay top bar */}
          <div className="container-page flex h-20 shrink-0 items-center justify-between">
            <Link href="/" aria-label={site.name} onClick={() => setOpen(false)}>
              <Image
                src="/sistem-granit.png"
                alt={site.name}
                width={150}
                height={56}
                className="h-10 w-auto brightness-0 invert"
              />
            </Link>
            <Dialog.Close asChild>
              <button
                type="button"
                aria-label="Menüyü kapat"
                className="inline-flex items-center font-mono text-xs uppercase tracking-[0.2em] text-marble/80 transition-colors hover:text-marble"
              >
                Kapat
              </button>
            </Dialog.Close>
          </div>

          <div className="container-page grid flex-1 gap-12 py-10 lg:grid-cols-[1.5fr_1fr] lg:py-16">
            {/* Primary navigation */}
            <nav className="flex flex-col justify-center gap-1">
              {nav.map((item, i) => {
                const active =
                  item.href === '/' ? pathname === '/' : pathname.startsWith(item.href)
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      'group flex items-baseline gap-4 border-b border-marble/10 py-4 font-display text-3xl tracking-tight transition-colors sm:text-4xl lg:text-5xl',
                      active ? 'text-brand' : 'text-marble hover:text-brand',
                    )}
                  >
                    <span className="font-mono text-xs text-marble/30">
                      0{i + 1}
                    </span>
                    {item.label}
                  </Link>
                )
              })}
            </nav>

            {/* Contact + social */}
            <div className="flex flex-col justify-center gap-8 lg:border-l lg:border-marble/10 lg:pl-12">
              <div className="flex flex-col gap-4">
                <span className="font-mono text-xs uppercase tracking-[0.25em] text-marble/40">
                  İletişim
                </span>
                <a
                  href={site.phoneHref}
                  className="flex items-center gap-3 text-marble/80 transition-colors hover:text-marble"
                >
                  <Phone className="size-4 shrink-0 text-brand" />
                  {site.phoneDisplay}
                </a>
                <a
                  href={whatsappUrl('Merhaba, bilgi almak istiyorum.')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-marble/80 transition-colors hover:text-marble"
                >
                  <MessageCircle className="size-4 shrink-0 text-brand" />
                  WhatsApp ile yazın
                </a>
                <a
                  href={`mailto:${site.email}`}
                  className="flex items-center gap-3 text-marble/80 transition-colors hover:text-marble"
                >
                  <Mail className="size-4 shrink-0 text-brand" />
                  {site.email}
                </a>
                <p className="flex items-start gap-3 text-marble/60">
                  <MapPin className="mt-0.5 size-4 shrink-0 text-brand" />
                  <span>
                    {site.address.line}
                    <br />
                    {site.address.district}
                  </span>
                </p>
              </div>

              <div className="flex flex-col gap-4">
                <span className="font-mono text-xs uppercase tracking-[0.25em] text-marble/40">
                  Takip edin
                </span>
                <div className="flex items-center gap-3">
                  {socials.map(({ href, label, Icon }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className="inline-flex size-10 items-center justify-center rounded-full border border-marble/20 text-marble/70 transition-colors hover:border-brand hover:bg-brand hover:text-white"
                    >
                      <Icon className="size-4" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
