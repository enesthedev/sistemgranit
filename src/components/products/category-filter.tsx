import Link from 'next/link'
import { cn } from '@/lib/utils'
import type { Category } from '@/payload-types'

export function CategoryFilter({
  categories,
  active,
}: {
  categories: Category[]
  active?: string
}) {
  const chip = (href: string, label: string, isActive: boolean) => (
    <Link
      href={href}
      className={cn(
        'rounded-full border px-4 py-2 text-sm transition-colors',
        isActive
          ? 'border-brand bg-brand text-primary-foreground'
          : 'border-vein bg-marble-raised text-stone-muted hover:border-brand hover:text-foreground',
      )}
    >
      {label}
    </Link>
  )

  return (
    <div className="flex flex-wrap gap-2">
      {chip('/urunler', 'Tümü', !active)}
      {categories.map((c) => chip(`/urunler?kategori=${c.slug}`, c.name, active === c.slug))}
    </div>
  )
}
