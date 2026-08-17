import { withPayload } from '@payloadcms/next/withPayload'
import type { NextConfig } from 'next'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(__filename)

const nextConfig: NextConfig = {
  async redirects() {
    // Old English admin base path → Turkish /panel (keeps existing bookmarks working).
    return [
      { source: '/admin', destination: '/panel', permanent: true },
      { source: '/admin/:path*', destination: '/panel/:path*', permanent: true },
    ]
  },
  images: {
    localPatterns: [
      { pathname: '/api/media/file/**' },
      { pathname: '/sistem-granit.png' },
    ],
  },
  // The OG cards read their fonts and the logo mark off disk at request time.
  // Next's tracer can't follow those `fs.readFile` calls, so without this the
  // files are missing from the deployed bundle and the cards fail in production
  // only. See src/lib/og/fonts.ts. The key is deliberately every route rather
  // than the image routes alone: their paths carry a build-generated hash
  // (`/urunler/[slug]/opengraph-image-1o7b5p`) that no glob here can rely on,
  // and 100 KB in each bundle is the cheaper mistake.
  outputFileTracingIncludes: {
    '/**': ['./src/lib/og/fonts/**', './public/sistem-granit.png'],
  },
  webpack: (webpackConfig) => {
    webpackConfig.resolve.extensionAlias = {
      '.cjs': ['.cts', '.cjs'],
      '.js': ['.ts', '.tsx', '.js', '.jsx'],
      '.mjs': ['.mts', '.mjs'],
    }

    return webpackConfig
  },
  turbopack: {
    root: path.resolve(dirname),
  },
}

export default withPayload(nextConfig, { devBundleServerPackages: false })
