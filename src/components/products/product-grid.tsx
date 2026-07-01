import type { Product } from '@/payload-types'
import { ProductCard } from './product-card'
import { Reveal } from '@/components/motion/reveal'

export function ProductGrid({ products }: { products: Product[] }) {
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
        <Reveal key={product.id} delay={(i % 4) * 0.08}>
          <ProductCard product={product} />
        </Reveal>
      ))}
    </div>
  )
}
