export const revalidate = 60

import type { Metadata } from 'next'

import { getBrandLanes, getCategories, getProjects } from '@/lib/queries'
import { Hero } from '@/components/sections/hero'
import { ValueProps } from '@/components/sections/value-props'
import { CategoryShowcase } from '@/components/sections/category-showcase'
import { BrandLanes } from '@/components/sections/brand-lanes'
import { Stats } from '@/components/sections/stats'
import { ProjectsPreview } from '@/components/sections/projects-preview'
import { CtaBanner } from '@/components/sections/cta-banner'

// Title and description come from the root layout; only the canonical is
// page-specific (the layout no longer sets one, so every page declares its own).
export const metadata: Metadata = {
  alternates: { canonical: '/' },
}

export default async function HomePage() {
  const [categories, lanes, projects] = await Promise.all([
    getCategories(),
    getBrandLanes(4),
    getProjects({ limit: 3 }),
  ])

  // The lanes already counted every brand, so the showcase reuses those totals
  // instead of issuing its own count queries.
  const brandCounts = Object.fromEntries(lanes.map((l) => [String(l.brand.id), l.total]))

  return (
    <>
      <Hero />
      <ValueProps />
      <CategoryShowcase categories={categories} counts={brandCounts} />
      <BrandLanes lanes={lanes} />
      <Stats />
      <ProjectsPreview projects={projects} />
      <CtaBanner />
    </>
  )
}
