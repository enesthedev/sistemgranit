import type { Product } from '@/payload-types'
import { ProductCard } from './product-card'

export function ProductGrid({
  products,
  showBrand = true,
}: {
  products: Product[]
  /** Passed straight to the cards — see `ProductCard`. */
  showBrand?: boolean
}) {
  if (products.length === 0) {
    return (
      <p className="py-16 text-center font-mono text-sm uppercase tracking-widest text-stone-muted">
        Bu kategoride henüz ürün eklenmedi.
      </p>
    )
  }

  return (
    <div className="grid grid-cols-2 gap-x-5 gap-y-10 md:grid-cols-3 lg:grid-cols-4">
      {products.map((product, i) => (
        // CSS-only stagger — see `.rise-in` in globals.css. Using the JS Reveal
        // here would mean one hydrating client component per card.
        <div key={product.id} className="rise-in" style={{ animationDelay: `${(i % 4) * 80}ms` }}>
          <ProductCard product={product} showBrand={showBrand} />
        </div>
      ))}
    </div>
  )
}
