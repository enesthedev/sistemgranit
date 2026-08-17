'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

import { cn } from '@/lib/utils'
import { site } from '@/lib/site'
import { NavOverlay } from './nav-overlay'
import { HeaderSearch } from './header-search'

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
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-colors duration-300',
        transparent
          ? 'bg-transparent'
          : 'border-b border-vein bg-marble/90 backdrop-blur-md',
      )}
    >
      <div className="container-page flex h-20 items-center justify-between">
        {/* Left — logo */}
        <Link href="/" aria-label={site.name} className="flex">
          <Image
            src="/sistem-granit.png"
            alt={site.name}
            width={160}
            height={60}
            // Only the home page preloads the mark. Elsewhere it would compete
            // with the page's real LCP element for early bandwidth.
            priority={isHome}
            className={cn(
              'h-10 w-auto md:h-12',
              transparent && 'brightness-0 invert',
            )}
          />
        </Link>

        {/* Right — search + menu */}
        <div className={cn('flex items-center gap-5 sm:gap-8', tone)}>
          <HeaderSearch transparent={transparent} />
          <NavOverlay triggerClassName="transition-colors hover:text-brand" />
        </div>
      </div>
    </header>
  )
}
