import type { Where } from 'payload'

import { getPayloadClient } from './payload'
import type { Category, Product, Project } from '@/payload-types'

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

export async function getProducts(opts?: {
  category?: string
  search?: string
  limit?: number
}): Promise<Product[]> {
  const payload = await getPayloadClient()

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
  const where: Where | undefined =
    conditions.length === 0
      ? undefined
      : conditions.length === 1
        ? conditions[0]
        : { and: conditions }

  const { docs } = await payload.find({
    collection: 'products',
    where,
    sort: '-updatedAt',
    limit: opts?.limit ?? 100,
    depth: 2,
  })
  return docs
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
