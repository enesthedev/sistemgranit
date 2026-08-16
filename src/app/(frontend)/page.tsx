export const revalidate = 60

import {
  getBrandProductCounts,
  getCategories,
  getFeaturedProducts,
  getProducts,
  getProjects,
} from '@/lib/queries'
import { Hero } from '@/components/sections/hero'
import { ValueProps } from '@/components/sections/value-props'
import { CategoryShowcase } from '@/components/sections/category-showcase'
import { FeaturedProducts } from '@/components/sections/featured-products'
import { Stats } from '@/components/sections/stats'
import { ProjectsPreview } from '@/components/sections/projects-preview'
import { CtaBanner } from '@/components/sections/cta-banner'

export default async function HomePage() {
  const [categories, brandCounts, featured, fallbackProducts, projects] = await Promise.all([
    getCategories(),
    getBrandProductCounts(),
    getFeaturedProducts(8),
    getProducts({ limit: 8 }),
    getProjects({ limit: 3 }),
  ])

  // If nothing is flagged featured yet, show the latest products instead.
  const products = featured.length > 0 ? featured : fallbackProducts

  return (
    <>
      <Hero />
      <ValueProps />
      <CategoryShowcase categories={categories} counts={brandCounts} />
      <FeaturedProducts products={products} />
      <Stats />
      <ProjectsPreview projects={projects} />
      <CtaBanner />
    </>
  )
}
