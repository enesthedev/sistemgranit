import type { Field } from 'payload'
import { slugify } from '@/lib/slugify'

/**
 * Reusable slug field. Auto-fills from `sourceField` when left blank,
 * so editors normally never touch it but can override when needed.
 */
export function slugField(sourceField = 'title'): Field {
  return {
    name: 'slug',
    type: 'text',
    unique: true,
    index: true,
    admin: {
      position: 'sidebar',
      description: 'Boş bırakılırsa başlıktan otomatik üretilir.',
    },
    hooks: {
      beforeValidate: [
        ({ value, data }) => {
          if (typeof value === 'string' && value.length > 0) return slugify(value)
          const source = data?.[sourceField]
          if (typeof source === 'string' && source.length > 0) return slugify(source)
          return value
        },
      ],
    },
  }
}
