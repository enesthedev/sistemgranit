import { PROJECT_TYPE_LABELS } from '@/lib/labels'
import { OG_CONTENT_TYPE, OG_SIZE, cardNotFound, renderCard } from '@/lib/og/card'
import { photoDataUri } from '@/lib/og/media'
import { getProjectBySlug } from '@/lib/queries'
import { site } from '@/lib/site'

export const alt = `${site.name} — tezgah uygulaması`
export const size = OG_SIZE
export const contentType = OG_CONTENT_TYPE

/** Inlines the cover photo from `/api/media/…` — see the product card for why. */
export const dynamic = 'force-dynamic'

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const project = await getProjectBySlug(slug)
  if (!project) return cardNotFound()

  const photo = await photoDataUri(project.coverImage, ['feature', 'card'])
  const meta = [project.location, project.year].filter(Boolean).join(' · ')

  return renderCard({
    eyebrow: project.type ? PROJECT_TYPE_LABELS[project.type] : 'Referans',
    title: project.title,
    meta: meta || undefined,
    photo,
  })
}
