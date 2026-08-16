import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'

import { cn } from '@/lib/utils'
import type { Project } from '@/payload-types'
import { ProjectCard } from '@/components/projects/project-card'
import { SectionHeading } from '@/components/section-heading'

export function ProjectsPreview({ projects }: { projects: Project[] }) {
  const items = projects.slice(0, 3)
  if (items.length === 0) return null
  const isAsymmetric = items.length === 3

  return (
    <section className="container-page py-24 md:py-32">
      <SectionHeading
        align="center"
        eyebrow="Referans Projeler"
        title="Tezgahlarımızın yaşadığı mutfaklar"
        description="Konuttan otele, ticari alandan kamu yapılarına; tamamladığımız tezgah uygulamalarından bir seçki."
      />

      {/*
        With a full set of three, the first project leads: it spans both rows and the
        other two stack beside it. Fewer than three would leave a hole in that grid, so
        those fall back to an even row.
      */}
      <div
        className={cn(
          'mt-14 grid gap-5',
          isAsymmetric ? 'md:grid-cols-3 md:grid-rows-2' : 'md:grid-cols-3',
        )}
      >
        {items.map((project, i) => {
          const lead = isAsymmetric && i === 0
          return (
            <div
              key={project.id}
              className={cn('rise-in', lead && 'md:col-span-2 md:row-span-2 md:h-full')}
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <ProjectCard project={project} featured={lead} />
            </div>
          )
        })}
      </div>

      <div className="mt-12 flex justify-center">
        <Link
          href="/projeler"
          className="group inline-flex items-center gap-2 rounded-full border border-vein px-5 py-2.5 text-sm font-medium tracking-wide text-foreground transition-colors hover:border-brand hover:bg-brand hover:text-white"
        >
          Tüm projeler
          <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
      </div>
    </section>
  )
}
