import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'

import type { Project } from '@/payload-types'
import { ProjectCard } from '@/components/projects/project-card'
import { SectionHeading } from '@/components/section-heading'
import { Reveal } from '@/components/motion/reveal'

export function ProjectsPreview({ projects }: { projects: Project[] }) {
  const items = projects.slice(0, 3)
  if (items.length === 0) return null

  return (
    <section className="container-page py-20 md:py-28">
      <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
        <SectionHeading
          eyebrow="Referans Projeler"
          title="Taşımızın yaşadığı mekânlar"
          description="Konuttan otele, ticari alandan kamu yapılarına; doğal taşın mekâna kattığı kalıcı değer."
        />
        <Link
          href="/projeler"
          className="group inline-flex shrink-0 items-center gap-2 self-start rounded-full border border-vein px-5 py-2.5 text-sm font-medium tracking-wide text-foreground transition-colors hover:border-brand hover:bg-brand hover:text-white"
        >
          Tüm projeler
          <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
      </div>

      <div className="mt-12 grid gap-5 md:grid-cols-3">
        {items.map((project, i) => (
          <Reveal key={project.id} delay={i * 0.1}>
            <ProjectCard project={project} />
          </Reveal>
        ))}
      </div>
    </section>
  )
}
