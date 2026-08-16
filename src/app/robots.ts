import type { MetadataRoute } from 'next'

import { SITE_URL } from '@/lib/site'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      // `/api/media/file/` must stay crawlable: it is the origin behind every
      // product photo, so blocking it would make Product.image unreachable for
      // Googlebot-Image and kill rich-result thumbnails.
      allow: ['/', '/api/media/file/'],
      disallow: ['/panel/', '/api/'],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  }
}
