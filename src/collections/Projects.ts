import type { CollectionConfig } from 'payload'
import { slugField } from '@/fields/slug'

export const Projects: CollectionConfig = {
  slug: 'projects',
  labels: { singular: 'Proje', plural: 'Projeler' },
  access: { read: () => true },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'location', 'year', 'featured', 'updatedAt'],
    group: 'İçerik',
  },
  fields: [
    { name: 'title', label: 'Proje adı', type: 'text', required: true },
    slugField('title'),
    {
      name: 'featured',
      label: 'Öne çıkan',
      type: 'checkbox',
      defaultValue: false,
      admin: { position: 'sidebar' },
    },
    {
      type: 'row',
      fields: [
        { name: 'location', label: 'Konum', type: 'text' },
        { name: 'year', label: 'Yıl', type: 'number' },
        {
          name: 'type',
          label: 'Proje türü',
          type: 'select',
          options: [
            { label: 'Konut', value: 'konut' },
            { label: 'Ticari', value: 'ticari' },
            { label: 'Otel', value: 'otel' },
            { label: 'Kamu', value: 'kamu' },
            { label: 'Peyzaj', value: 'peyzaj' },
          ],
        },
      ],
    },
    {
      name: 'coverImage',
      label: 'Kapak görseli',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'gallery',
      label: 'Galeri',
      type: 'array',
      labels: { singular: 'Görsel', plural: 'Görseller' },
      fields: [
        { name: 'image', label: 'Görsel', type: 'upload', relationTo: 'media', required: true },
      ],
    },
    {
      name: 'description',
      label: 'Açıklama',
      type: 'richText',
    },
  ],
}
