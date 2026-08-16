import type { MetadataRoute } from 'next'

import { getCategories, getProducts, getProjects } from '@/lib/queries'
import { SITE_URL } from '@/lib/site'

/**
 * Static pages change only when we ship, so they carry the build timestamp
 * rather than `new Date()` — reporting "modified just now" on every crawl
 * teaches Google to ignore lastmod entirely.
 */
const BUILD_TIME = new Date()

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    { path: '', priority: 1 },
    { path: '/urunler', priority: 0.9 },
    { path: '/markalar', priority: 0.8 },
    { path: '/projeler', priority: 0.7 },
    { path: '/hakkimizda', priority: 0.5 },
    { path: '/iletisim', priority: 0.5 },
  ].map(({ path, priority }) => ({
    url: `${SITE_URL}${path}`,
    lastModified: BUILD_TIME,
    changeFrequency: 'monthly' as const,
    priority,
  }))

  const [products, projects, categories] = await Promise.all([
    getProducts({ limit: 1000 }),
    getProjects({ limit: 1000 }),
    getCategories(),
  ])

  const categoryRoutes: MetadataRoute.Sitemap = categories
    .filter((c) => c.slug)
    .map((c) => ({
      url: `${SITE_URL}/urunler/kategori/${c.slug}`,
      lastModified: new Date(c.updatedAt),
      changeFrequency: 'weekly',
      priority: 0.8,
    }))

  const productRoutes: MetadataRoute.Sitemap = products
    .filter((p) => p.slug)
    .map((p) => ({
      url: `${SITE_URL}/urunler/${p.slug}`,
      lastModified: new Date(p.updatedAt),
      changeFrequency: 'monthly',
      priority: 0.7,
    }))

  const projectRoutes: MetadataRoute.Sitemap = projects
    .filter((p) => p.slug)
    .map((p) => ({
      url: `${SITE_URL}/projeler/${p.slug}`,
      lastModified: new Date(p.updatedAt),
      changeFrequency: 'monthly',
      priority: 0.6,
    }))

  return [...staticRoutes, ...categoryRoutes, ...productRoutes, ...projectRoutes]
}
