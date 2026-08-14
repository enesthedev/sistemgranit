'use server'

import { getFeaturedProducts, getProducts } from '@/lib/queries'
import type { Media, Product } from '@/payload-types'

export type SearchHit = {
  id: number
  title: string
  slug: string
  categoryName: string | null
  cover: Media | number | null
}

function toHit(p: Product): SearchHit {
  return {
    id: p.id,
    title: p.title,
    slug: p.slug as string,
    categoryName: typeof p.category === 'object' ? p.category.name : null,
    cover: p.images?.[0]?.image ?? null,
  }
}

/** As-you-type product search for the header. Returns a light DTO. */
export async function searchProducts(query: string): Promise<SearchHit[]> {
  const q = query.trim()
  if (q.length < 2) return []

  const products = await getProducts({ search: q, limit: 6 })
  return products.filter((p) => p.slug).map(toHit)
}

/** Default suggestions shown when the header search is focused but empty. */
export async function suggestedProducts(): Promise<SearchHit[]> {
  let products = await getFeaturedProducts(6)
  if (products.length === 0) products = await getProducts({ limit: 6 })
  return products.filter((p) => p.slug).map(toHit)
}
