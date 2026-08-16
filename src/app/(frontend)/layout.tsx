import React from 'react'
import type { Metadata } from 'next'
import { Fraunces, Inter, Space_Grotesk } from 'next/font/google'

import './globals.css'
import { SITE_URL, site } from '@/lib/site'
import { jsonLd } from '@/lib/json-ld'
import { SiteHeader } from '@/components/layout/site-header'
import { SiteFooter } from '@/components/layout/site-footer'
import { Toaster } from '@/components/ui/sonner'

const inter = Inter({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-inter',
  display: 'swap',
})

const fraunces = Fraunces({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-fraunces',
  display: 'swap',
  axes: ['opsz', 'SOFT'],
})

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-space-grotesk',
  display: 'swap',
})

const homeTitle = `${site.name} — Kompozit Taş & Mutfak Tezgahı`

// PLACEHOLDER — replace with a dedicated 1200×630 /og.jpg before launch.
// Points at the hero upload (siteMedia.hero) by filename: metadata is static,
// so it cannot resolve the media doc at request time.
const ogImage = {
  url: '/api/media/file/mountains-screw.jpg',
  width: 1200,
  height: 630,
  alt: homeTitle,
}

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: homeTitle,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  // NOTE: no `alternates` here on purpose. Next merges metadata shallowly, so a
  // canonical set on the root layout would be inherited verbatim by every page
  // that doesn't override it. Each page declares its own self-canonical.
  openGraph: {
    type: 'website',
    locale: 'tr_TR',
    siteName: site.name,
    title: homeTitle,
    description: site.description,
    images: [ogImage],
  },
  twitter: {
    card: 'summary_large_image',
    title: homeTitle,
    description: site.description,
    images: [ogImage.url],
  },
  // Favicon is provided by the App Router file convention (src/app/icon.png,
  // src/app/apple-icon.png), generated via `bun run generate:favicon`.
}

/**
 * LocalBusiness schema — a fabricator with a showroom and service area, not a
 * generic Organization.
 *
 * `telephone` and `sameAs` are deliberately omitted while the values in site.ts
 * are still PLACEHOLDER: publishing no NAP is far better for local SEO than
 * publishing a fake number or social links pointing at platform homepages.
 * Re-add both here once the real values land.
 */
const businessJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'HomeAndConstructionBusiness',
  '@id': `${SITE_URL}/#business`,
  name: site.name,
  legalName: site.legalName,
  description: site.description,
  url: SITE_URL,
  logo: `${SITE_URL}/sistem-granit.png`,
  image: `${SITE_URL}/sistem-granit.png`,
  foundingDate: String(site.foundedYear),
  email: site.email,
  priceRange: '₺₺',
  address: {
    '@type': 'PostalAddress',
    streetAddress: site.address.line,
    addressLocality: site.address.district,
    addressCountry: site.address.country,
  },
  areaServed: site.areaServed.map((name) => ({ '@type': 'Place', name })),
  openingHoursSpecification: site.hours.map((h) => ({
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: h.days,
    opens: h.opens,
    closes: h.closes,
  })),
}

export default function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props
  return (
    <html lang="tr" className={`${inter.variable} ${fraunces.variable} ${spaceGrotesk.variable}`}>
      <body className="flex min-h-svh flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={jsonLd(businessJsonLd)}
        />
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
        <Toaster position="top-center" richColors />
      </body>
    </html>
  )
}
