import type { MetadataRoute } from 'next'

import { getProducts, getProjects } from '@/lib/queries'

const SITE_URL = 'https://sistemgranit.com'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    '',
    '/urunler',
    '/projeler',
    '/hakkimizda',
    '/iletisim',
  ].map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: new Date(),
  }))

  const [products, projects] = await Promise.all([
    getProducts({ limit: 1000 }),
    getProjects({ limit: 1000 }),
  ])

  const productRoutes: MetadataRoute.Sitemap = products
    .filter((p) => p.slug)
    .map((p) => ({
      url: `${SITE_URL}/urunler/${p.slug}`,
      lastModified: new Date(p.updatedAt),
    }))

  const projectRoutes: MetadataRoute.Sitemap = projects
    .filter((p) => p.slug)
    .map((p) => ({
      url: `${SITE_URL}/projeler/${p.slug}`,
      lastModified: new Date(p.updatedAt),
    }))

  return [...staticRoutes, ...productRoutes, ...projectRoutes]
}
