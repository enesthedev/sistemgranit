import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ChevronRight, MessageCircle, Phone } from 'lucide-react'

import { getProductBySlug, getProducts } from '@/lib/queries'
import { site, whatsappUrl } from '@/lib/site'
import { APPLICATION_LABELS, FINISH_LABELS, labelsFrom } from '@/lib/labels'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ProductGallery } from '@/components/products/product-gallery'
import { ProductGrid } from '@/components/products/product-grid'
import { RichText } from '@/components/rich-text'
import { SectionHeading } from '@/components/section-heading'

type Params = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params
  const product = await getProductBySlug(slug)
  if (!product) return { title: 'Ürün bulunamadı' }
  return {
    title: product.title,
    description:
      [product.color, product.origin].filter(Boolean).join(' · ') ||
      `${product.title} — Sistem Granit doğal taş koleksiyonu.`,
  }
}

export default async function ProductDetailPage({ params }: Params) {
  const { slug } = await params
  const product = await getProductBySlug(slug)
  if (!product) notFound()

  const category = typeof product.category === 'object' ? product.category : null
  const finishes = labelsFrom(FINISH_LABELS, product.finish)
  const applications = labelsFrom(APPLICATION_LABELS, product.applications)

  const specs = [
    { k: 'Kategori', v: category?.name },
    { k: 'Renk', v: product.color },
    { k: 'Menşei', v: product.origin },
    { k: 'Kalınlık', v: product.specs?.thickness },
    { k: 'Ebatlar', v: product.specs?.sizes },
  ].filter((s) => s.v)

  const related = category?.slug
    ? (await getProducts({ category: category.slug, limit: 5 }))
        .filter((p) => p.id !== product.id)
        .slice(0, 4)
    : []

  const inquiry = whatsappUrl(`Merhaba, "${product.title}" ürünü için teklif almak istiyorum.`)

  return (
    <>
      <div className="container-page pt-10">
        <nav className="flex items-center gap-1 font-mono text-xs uppercase tracking-widest text-stone-muted">
          <Link href="/" className="hover:text-foreground">Ana Sayfa</Link>
          <ChevronRight className="size-3.5" />
          <Link href="/urunler" className="hover:text-foreground">Ürünler</Link>
          <ChevronRight className="size-3.5" />
          <span className="text-foreground">{product.title}</span>
        </nav>
      </div>

      <article className="container-page grid gap-12 py-10 lg:grid-cols-2 lg:gap-16">
        <ProductGallery images={product.images ?? []} title={product.title} />

        <div className="lg:py-2">
          {category && (
            <Link
              href={`/urunler?kategori=${category.slug}`}
              className="eyebrow transition-colors hover:text-brand"
            >
              {category.name}
            </Link>
          )}
          <h1 className="mt-3 font-display text-4xl tracking-tight text-balance md:text-5xl">
            {product.title}
          </h1>

          {/* Spec ledger — the datasheet signature */}
          {specs.length > 0 && (
            <dl className="mt-8 border-t border-vein">
              {specs.map((s) => (
                <div
                  key={s.k}
                  className="flex items-baseline justify-between gap-4 border-b border-vein py-3"
                >
                  <dt className="font-mono text-xs uppercase tracking-[0.18em] text-stone-muted">
                    {s.k}
                  </dt>
                  <dd className="text-right text-sm font-medium text-foreground">{s.v}</dd>
                </div>
              ))}
            </dl>
          )}

          {(finishes.length > 0 || applications.length > 0) && (
            <div className="mt-8 space-y-5">
              {finishes.length > 0 && (
                <div>
                  <p className="eyebrow mb-2">Yüzey işlemleri</p>
                  <div className="flex flex-wrap gap-2">
                    {finishes.map((f) => (
                      <Badge key={f} variant="secondary" className="rounded-full font-normal">
                        {f}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
              {applications.length > 0 && (
                <div>
                  <p className="eyebrow mb-2">Kullanım alanları</p>
                  <div className="flex flex-wrap gap-2">
                    {applications.map((a) => (
                      <Badge key={a} variant="outline" className="rounded-full font-normal">
                        {a}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {product.description && (
            <div className="mt-8">
              <RichText data={product.description} />
            </div>
          )}

          <div className="mt-10 flex flex-wrap gap-3">
            <Button asChild size="lg">
              <a href={inquiry}>
                <MessageCircle className="size-4" />
                WhatsApp ile Teklif Al
              </a>
            </Button>
            <Button asChild size="lg" variant="outline">
              <a href={site.phoneHref}>
                <Phone className="size-4" />
                {site.phoneDisplay}
              </a>
            </Button>
          </div>
        </div>
      </article>

      {related.length > 0 && (
        <section className="border-t border-vein bg-marble-raised py-20 md:py-24">
          <div className="container-page">
            <SectionHeading eyebrow="Benzer ürünler" title="Bunları da inceleyin" />
            <div className="mt-12">
              <ProductGrid products={related} />
            </div>
          </div>
        </section>
      )}
    </>
  )
}
