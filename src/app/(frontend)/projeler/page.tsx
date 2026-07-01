import type { Metadata } from 'next'

import { getProjects } from '@/lib/queries'

export const revalidate = 60
import { PageHero } from '@/components/page-hero'
import { ProjectCard } from '@/components/projects/project-card'
import { Reveal } from '@/components/motion/reveal'

export const metadata: Metadata = {
  title: 'Projeler',
  description:
    'Konut, otel, ticari ve kamu projelerinde doğal taş uygulamalarımız. Sistem Granit referans projeleri.',
}

export default async function ProjectsPage() {
  const projects = await getProjects()

  return (
    <>
      <PageHero
        eyebrow="Referanslar"
        title="Projelerimiz"
        description="Taşımızın mimariyle buluştuğu mekânlardan bir seçki. Konuttan otele uzanan uygulamalarımızı inceleyin."
      />
      <div className="container-page py-12 md:py-16">
        {projects.length === 0 ? (
          <p className="py-16 text-center font-mono text-sm uppercase tracking-widest text-stone-muted">
            Yakında yeni projeler eklenecek.
          </p>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project, i) => (
              <Reveal key={project.id} delay={(i % 3) * 0.08}>
                <ProjectCard project={project} />
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </>
  )
}
