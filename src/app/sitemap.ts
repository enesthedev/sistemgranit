import type { MetadataRoute } from 'next'

import { getCategories, getProducts, getProjects } from '@/lib/queries'

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
    }))

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

  return [...staticRoutes, ...categoryRoutes, ...productRoutes, ...projectRoutes]
}
