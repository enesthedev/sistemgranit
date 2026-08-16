import type { Where } from 'payload'

import { getPayloadClient } from './payload'
import type { Category, Media, Product, Project } from '@/payload-types'

/** Resolves one media doc, e.g. the fixed page imagery listed in `siteMedia`. */
export async function getMediaById(id: number): Promise<Media | null> {
  const payload = await getPayloadClient()
  try {
    return await payload.findByID({ collection: 'media', id })
  } catch {
    // Deleted or replaced in the panel — callers fall back to a placeholder.
    return null
  }
}

export async function getCategories(): Promise<Category[]> {
  const payload = await getPayloadClient()
  const { docs } = await payload.find({
    collection: 'categories',
    sort: 'order',
    limit: 100,
    depth: 1,
  })
  return docs
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  const payload = await getPayloadClient()
  const { docs } = await payload.find({
    collection: 'categories',
    where: { slug: { equals: slug } },
    limit: 1,
    depth: 1,
  })
  return docs[0] ?? null
}

/**
 * Product count per brand. Uses one `limit: 0` count query per brand rather
 * than pulling every product row just to tally four integers.
 */
export async function getBrandProductCounts(): Promise<Record<string, number>> {
  const payload = await getPayloadClient()
  const categories = await getCategories()

  const results = await Promise.all(
    categories.map(async (c) => {
      const { totalDocs } = await payload.find({
        collection: 'products',
        where: { category: { equals: c.id } },
        depth: 0,
        limit: 0,
      })
      return [String(c.id), totalDocs] as const
    }),
  )

  return Object.fromEntries(results)
}

/** How many products a listing page shows before paginating. */
export const PRODUCTS_PER_PAGE = 24

export type ProductPage = {
  products: Product[]
  page: number
  totalPages: number
  totalDocs: number
}

function productWhere(opts?: { category?: string; search?: string }): Where | undefined {
  const conditions: Where[] = []
  if (opts?.category) {
    conditions.push({ 'category.slug': { equals: opts.category } })
  }
  const search = opts?.search?.trim()
  if (search) {
    conditions.push({
      or: [
        { title: { like: search } },
        { color: { like: search } },
        { origin: { like: search } },
      ],
    })
  }
  return conditions.length === 0
    ? undefined
    : conditions.length === 1
      ? conditions[0]
      : { and: conditions }
}

export async function getProducts(opts?: {
  category?: string
  search?: string
  limit?: number
}): Promise<Product[]> {
  const payload = await getPayloadClient()
  const { docs } = await payload.find({
    collection: 'products',
    where: productWhere(opts),
    sort: '-updatedAt',
    limit: opts?.limit ?? 100,
    depth: 2,
  })
  return docs
}

/**
 * Paginated variant for the listing pages. The unpaginated `getProducts` capped
 * at 100, which silently hid 58 of the 158 products from both users and
 * crawlers — every product must be reachable by following links.
 */
export async function getProductPage(opts?: {
  category?: string
  search?: string
  page?: number
  perPage?: number
}): Promise<ProductPage> {
  const payload = await getPayloadClient()
  const perPage = opts?.perPage ?? PRODUCTS_PER_PAGE
  const requested = Math.max(1, Math.trunc(opts?.page ?? 1) || 1)

  const result = await payload.find({
    collection: 'products',
    where: productWhere(opts),
    sort: '-updatedAt',
    limit: perPage,
    page: requested,
    depth: 2,
  })

  return {
    products: result.docs,
    page: result.page ?? requested,
    totalPages: result.totalPages,
    totalDocs: result.totalDocs,
  }
}

export async function getFeaturedProducts(limit = 6): Promise<Product[]> {
  const payload = await getPayloadClient()
  const { docs } = await payload.find({
    collection: 'products',
    where: { featured: { equals: true } },
    sort: '-updatedAt',
    limit,
    depth: 2,
  })
  return docs
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const payload = await getPayloadClient()
  const { docs } = await payload.find({
    collection: 'products',
    where: { slug: { equals: slug } },
    limit: 1,
    depth: 2,
  })
  return docs[0] ?? null
}

export async function getProjects(opts?: { limit?: number; featured?: boolean }): Promise<Project[]> {
  const payload = await getPayloadClient()
  const { docs } = await payload.find({
    collection: 'projects',
    where: opts?.featured ? { featured: { equals: true } } : undefined,
    sort: '-year',
    limit: opts?.limit ?? 100,
    depth: 1,
  })
  return docs
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const payload = await getPayloadClient()
  const { docs } = await payload.find({
    collection: 'projects',
    where: { slug: { equals: slug } },
    limit: 1,
    depth: 2,
  })
  return docs[0] ?? null
}
