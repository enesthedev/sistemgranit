import type { CollectionConfig } from 'payload'
import { slugField } from '@/fields/slug'

export const Categories: CollectionConfig = {
  slug: 'categories',
  labels: { singular: 'Kategori', plural: 'Kategoriler' },
  access: { read: () => true },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'order', 'updatedAt'],
    group: 'İçerik',
  },
  defaultSort: 'order',
  fields: [
    { name: 'name', label: 'Ad', type: 'text', required: true },
    slugField('name'),
    {
      name: 'description',
      label: 'Açıklama',
      type: 'textarea',
      admin: { description: 'Kategori sayfalarında ve kartlarda gösterilir.' },
    },
    {
      name: 'image',
      label: 'Görsel',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'order',
      label: 'Sıra',
      type: 'number',
      defaultValue: 0,
      admin: { position: 'sidebar', description: 'Küçük değer önce gösterilir.' },
    },
  ],
}
