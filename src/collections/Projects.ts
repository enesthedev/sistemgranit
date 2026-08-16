import type { CollectionConfig } from 'payload'
import { slugField } from '@/fields/slug'
import { GROUP_CONTENT } from '@/fields/groups'

export const Projects: CollectionConfig = {
  slug: 'projects',
  labels: {
    singular: { en: 'Project', tr: 'Proje' },
    plural: { en: 'Projects', tr: 'Projeler' },
  },
  access: { read: () => true },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'location', 'year', 'featured', 'updatedAt'],
    group: GROUP_CONTENT,
  },
  fields: [
    { name: 'title', label: { en: 'Project name', tr: 'Proje adı' }, type: 'text', required: true },
    slugField('title'),
    {
      name: 'featured',
      label: { en: 'Featured', tr: 'Öne çıkan' },
      type: 'checkbox',
      defaultValue: false,
      admin: { position: 'sidebar' },
    },
    {
      type: 'row',
      fields: [
        { name: 'location', label: { en: 'Location', tr: 'Konum' }, type: 'text' },
        { name: 'year', label: { en: 'Year', tr: 'Yıl' }, type: 'number' },
        {
          name: 'type',
          label: { en: 'Project type', tr: 'Proje türü' },
          type: 'select',
          options: [
            { label: { en: 'Residential', tr: 'Konut' }, value: 'konut' },
            { label: { en: 'Commercial', tr: 'Ticari' }, value: 'ticari' },
            { label: { en: 'Hotel', tr: 'Otel' }, value: 'otel' },
            { label: { en: 'Public', tr: 'Kamu' }, value: 'kamu' },
            { label: { en: 'Landscape', tr: 'Peyzaj' }, value: 'peyzaj' },
          ],
        },
      ],
    },
    {
      name: 'coverImage',
      label: { en: 'Cover image', tr: 'Kapak görseli' },
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'gallery',
      label: { en: 'Gallery', tr: 'Galeri' },
      type: 'array',
      labels: {
        singular: { en: 'Image', tr: 'Görsel' },
        plural: { en: 'Images', tr: 'Görseller' },
      },
      fields: [
        {
          name: 'image',
          label: { en: 'Image', tr: 'Görsel' },
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
      ],
    },
    {
      name: 'description',
      label: { en: 'Description', tr: 'Açıklama' },
      type: 'richText',
    },
  ],
}
