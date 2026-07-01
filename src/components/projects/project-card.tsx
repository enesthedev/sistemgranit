import Link from 'next/link'

import type { Project } from '@/payload-types'
import { PayloadImage } from '@/components/media/payload-image'

const TYPE_LABELS: Record<string, string> = {
  konut: 'Konut',
  ticari: 'Ticari',
  otel: 'Otel',
  kamu: 'Kamu',
  peyzaj: 'Peyzaj',
}

export function ProjectCard({ project }: { project: Project }) {
  const meta = [project.location, project.year].filter(Boolean).join(' · ')

  return (
    <Link
      href={`/projeler/${project.slug}`}
      className="group relative block overflow-hidden rounded-md bg-graphite"
    >
      <div className="relative aspect-[4/5] overflow-hidden">
        <PayloadImage
          media={project.coverImage}
          size="feature"
          fill
          sizes="(max-width: 768px) 90vw, 45vw"
          className="transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-graphite via-graphite/30 to-transparent" />
      </div>

      <div className="absolute inset-x-0 bottom-0 p-6">
        {project.type && TYPE_LABELS[project.type] && (
          <span className="eyebrow text-marble/70">{TYPE_LABELS[project.type]}</span>
        )}
        <h3 className="mt-2 font-display text-2xl tracking-tight text-marble">{project.title}</h3>
        {meta && <p className="mt-1 font-mono text-xs text-marble/60">{meta}</p>}
      </div>
    </Link>
  )
}
