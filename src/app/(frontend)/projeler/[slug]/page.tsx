import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ChevronRight } from 'lucide-react'

import { getProjectBySlug, getProjects } from '@/lib/queries'
import { PROJECT_TYPE_LABELS } from '@/lib/labels'
import { PayloadImage } from '@/components/media/payload-image'
import { RichText } from '@/components/rich-text'
import { Reveal } from '@/components/motion/reveal'
import { CtaBanner } from '@/components/sections/cta-banner'

type Params = { params: Promise<{ slug: string }> }

export const revalidate = 300

export async function generateStaticParams() {
  const projects = await getProjects({ limit: 1000 })
  return projects.filter((p) => p.slug).map((p) => ({ slug: p.slug as string }))
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params
  const project = await getProjectBySlug(slug)
  if (!project) return { title: 'Proje bulunamadı' }
  return {
    title: project.title,
    description:
      [project.location, project.year].filter(Boolean).join(' · ') ||
      `${project.title} — Sistem Granit referans projesi.`,
  }
}

export default async function ProjectDetailPage({ params }: Params) {
  const { slug } = await params
  const project = await getProjectBySlug(slug)
  if (!project) notFound()

  const meta = [
    project.type ? PROJECT_TYPE_LABELS[project.type] : null,
    project.location,
    project.year ? String(project.year) : null,
  ].filter(Boolean)

  const gallery = project.gallery ?? []

  return (
    <>
      <section className="relative isolate flex min-h-[60svh] items-end overflow-hidden bg-graphite">
        <PayloadImage
          media={project.coverImage}
          size="hero"
          fill
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-graphite via-graphite/50 to-graphite/20" />
        <div className="container-page relative z-10 pb-12 pt-32">
          <nav className="mb-6 flex items-center gap-1 font-mono text-xs uppercase tracking-widest text-marble/60">
            <Link href="/projeler" className="hover:text-marble">Projeler</Link>
            <ChevronRight className="size-3.5" />
            <span className="text-marble">{project.title}</span>
          </nav>
          <h1 className="max-w-3xl font-display text-4xl tracking-tight text-marble text-balance md:text-6xl">
            {project.title}
          </h1>
          {meta.length > 0 && (
            <p className="mt-4 font-mono text-sm uppercase tracking-[0.2em] text-marble/60">
              {meta.join('  ·  ')}
            </p>
          )}
        </div>
      </section>

      {project.description && (
        <section className="container-page py-16 md:py-20">
          <div className="max-w-2xl">
            <RichText data={project.description} />
          </div>
        </section>
      )}

      {gallery.length > 0 && (
        <section className="container-page pb-20 md:pb-28">
          <div className="grid gap-4 sm:grid-cols-2">
            {gallery.map((item, i) => (
              <Reveal
                key={item.id ?? i}
                delay={(i % 2) * 0.08}
                className={i % 3 === 0 ? 'sm:col-span-2' : ''}
              >
                <div className="relative aspect-[16/10] overflow-hidden rounded-md bg-secondary">
                  <PayloadImage
                    media={item.image}
                    size="feature"
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    alt={`${project.title} ${i + 1}`}
                  />
                </div>
              </Reveal>
            ))}
          </div>
        </section>
      )}

      <CtaBanner
        title="Benzer bir proje mi planlıyorsunuz?"
        description="Doğru model seçimi, ölçü ve montaj desteği için ekibimizle görüşün."
      />
    </>
  )
}
