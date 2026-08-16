import React from 'react'
import type { Metadata } from 'next'
import { Fraunces, Inter, Space_Grotesk } from 'next/font/google'

import './globals.css'
import { site } from '@/lib/site'
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

export const SITE_URL = 'https://sistemgranit.com'
const homeTitle = `${site.name} — Mermer, Granit & Doğal Taş`

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
  alternates: { canonical: '/' },
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

/** Organization schema for rich results. Contact fields are still PLACEHOLDER in site.ts. */
const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: site.name,
  legalName: site.legalName,
  url: SITE_URL,
  logo: `${SITE_URL}/sistem-granit.png`,
  foundingDate: String(site.foundedYear),
  email: site.email,
  telephone: site.phoneDisplay,
  address: {
    '@type': 'PostalAddress',
    streetAddress: site.address.line,
    addressLocality: site.address.district,
    addressCountry: site.address.country,
  },
  sameAs: Object.values(site.social),
}

export default function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props
  return (
    <html lang="tr" className={`${inter.variable} ${fraunces.variable} ${spaceGrotesk.variable}`}>
      <body className="flex min-h-svh flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
        <Toaster position="top-center" richColors />
      </body>
    </html>
  )
}
