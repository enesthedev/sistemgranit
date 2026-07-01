'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

import { cn } from '@/lib/utils'
import { site } from '@/lib/site'
import { HeaderSearch } from './header-search'
import { NavOverlay } from './nav-overlay'

export function SiteHeader() {
  const pathname = usePathname()
  const isHome = pathname === '/'
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Transparent, light-on-dark only over the homepage hero before scrolling.
  const transparent = isHome && !scrolled
  const tone = transparent ? 'text-marble' : 'text-foreground'

  return (
    <>
      <header
        className={cn(
          'fixed inset-x-0 top-0 z-50 transition-colors duration-300',
          transparent
            ? 'bg-transparent'
            : 'border-b border-vein bg-marble/90 backdrop-blur-md',
        )}
      >
        <div className="container-page grid h-20 grid-cols-[1fr_auto_1fr] items-center">
          {/* Left — menu + search */}
          <div className={cn('flex items-center gap-1 sm:gap-3', tone)}>
            <NavOverlay triggerClassName="transition-colors hover:text-brand" />
            <HeaderSearch triggerClassName="transition-colors hover:text-brand" />
          </div>

          {/* Center — logo */}
          <Link href="/" aria-label={site.name} className="flex justify-center">
            <Image
              src="/sistem-granit.png"
              alt={site.name}
              width={160}
              height={60}
              priority
              className={cn(
                'h-10 w-auto md:h-12',
                transparent && 'brightness-0 invert',
              )}
            />
          </Link>

          {/* Right — contact */}
          <div className={cn('flex items-center justify-end gap-4', tone)}>
            <Link
              href="/iletisim"
              className="font-mono text-xs uppercase tracking-[0.2em] transition-colors hover:text-brand"
            >
              İletişim
            </Link>
          </div>
        </div>
      </header>

      {/* Spacer pushes inner-page content below the fixed header (home hero sits behind it). */}
      {!isHome && <div className="h-20" aria-hidden />}
    </>
  )
}
