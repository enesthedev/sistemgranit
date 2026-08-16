import type { MetadataRoute } from 'next'

const SITE_URL = 'https://sistemgranit.com'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/panel', '/api'],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  }
}
