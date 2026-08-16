import Link from 'next/link'

import { cn } from '@/lib/utils'
import type { Project } from '@/payload-types'
import { PayloadImage } from '@/components/media/payload-image'

const TYPE_LABELS: Record<string, string> = {
  konut: 'Konut',
  ticari: 'Ticari',
  otel: 'Otel',
  kamu: 'Kamu',
  peyzaj: 'Peyzaj',
}

type Props = {
  project: Project
  /** Lead slot on the home page: wider crop and a larger title. Defaults to the uniform grid card. */
  featured?: boolean
}

export function ProjectCard({ project, featured = false }: Props) {
  const meta = [project.location, project.year].filter(Boolean).join(' · ')

  return (
    <Link
      href={`/projeler/${project.slug}`}
      className={cn(
        'group relative block overflow-hidden rounded-md bg-graphite',
        featured && 'h-full',
      )}
    >
      <div
        className={cn(
          'relative overflow-hidden',
          featured ? 'aspect-[4/5] md:aspect-auto md:h-full' : 'aspect-[4/5]',
        )}
      >
        <PayloadImage
          media={project.coverImage}
          size="feature"
          fill
          sizes={featured ? '(max-width: 768px) 90vw, 60vw' : '(max-width: 768px) 90vw, 45vw'}
          className="transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-graphite via-graphite/30 to-transparent" />
      </div>

      <div className="absolute inset-x-0 bottom-0 p-6">
        {project.type && TYPE_LABELS[project.type] && (
          <span className="eyebrow text-marble/70">{TYPE_LABELS[project.type]}</span>
        )}
        <h3
          className={cn(
            'mt-2 font-display tracking-tight text-marble',
            featured ? 'text-2xl md:text-3xl' : 'text-2xl',
          )}
        >
          {project.title}
        </h3>
        {meta && <p className="mt-1 font-mono text-xs text-marble/60">{meta}</p>}
      </div>
    </Link>
  )
}
