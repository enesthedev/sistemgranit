import type { Metadata } from 'next'

import { getProjects } from '@/lib/queries'

export const revalidate = 60
import { PageHero } from '@/components/page-hero'
import { ProjectCard } from '@/components/projects/project-card'

export const metadata: Metadata = {
  title: 'Projeler — Tezgah Uygulama Referanslarımız',
  description:
    'Konut, otel, ticari ve kamu projelerinde tamamladığımız kompozit taş tezgah uygulamaları. Sistem Granit referans projeleri.',
  alternates: { canonical: '/projeler' },
}

export default async function ProjectsPage() {
  const projects = await getProjects()

  return (
    <>
      <PageHero
        eyebrow="Referanslar"
        title="Projelerimiz"
        description="Tamamladığımız tezgah uygulamalarından bir seçki. Konuttan otele uzanan projelerimizi inceleyin."
      />
      <div className="container-page py-12 md:py-16">
        {projects.length === 0 ? (
          <p className="py-16 text-center font-mono text-sm uppercase tracking-widest text-stone-muted">
            Yakında yeni projeler eklenecek.
          </p>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project, i) => (
              <div
                key={project.id}
                className="rise-in"
                style={{ animationDelay: `${(i % 3) * 80}ms` }}
              >
                <ProjectCard project={project} />
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  )
}
