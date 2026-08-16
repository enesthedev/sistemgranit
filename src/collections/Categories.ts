import type { CollectionConfig } from 'payload'
import { slugField } from '@/fields/slug'
import { GROUP_CONTENT } from '@/fields/groups'

export const Categories: CollectionConfig = {
  slug: 'categories',
  labels: {
    singular: { en: 'Brand', tr: 'Marka' },
    plural: { en: 'Brands', tr: 'Markalar' },
  },
  access: { read: () => true },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'order', 'updatedAt'],
    group: GROUP_CONTENT,
  },
  defaultSort: 'order',
  fields: [
    { name: 'name', label: { en: 'Brand name', tr: 'Marka adı' }, type: 'text', required: true },
    slugField('name'),
    {
      name: 'description',
      label: { en: 'Description', tr: 'Açıklama' },
      type: 'textarea',
      admin: {
        description: {
          en: 'Shown on category pages and cards.',
          tr: 'Kategori sayfalarında ve kartlarda gösterilir.',
        },
      },
    },
    {
      name: 'image',
      label: { en: 'Image', tr: 'Görsel' },
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'order',
      label: { en: 'Order', tr: 'Sıra' },
      type: 'number',
      defaultValue: 0,
      admin: {
        position: 'sidebar',
        description: {
          en: 'Lower values are shown first.',
          tr: 'Küçük değer önce gösterilir.',
        },
      },
    },
  ],
}
