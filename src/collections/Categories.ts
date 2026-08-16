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
      name: 'logo',
      label: { en: 'Brand logo', tr: 'Marka logosu' },
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: {
          en: 'Transparent PNG, 1600×480 px canvas, artwork centred inside 1280×320 px. Dark artwork only — cards sit on an off-white surface. Run scripts/normalize-brand-logo.mjs to produce it.',
          tr: 'Şeffaf PNG, 1600×480 px tuval, logo 1280×320 px alan içinde ortalanmış. Kartlar kırık beyaz zemin üzerinde durduğu için logo koyu renk olmalı. Dosyayı scripts/normalize-brand-logo.mjs ile hazırlayabilirsiniz.',
        },
      },
    },
    {
      name: 'image',
      label: { en: 'Image', tr: 'Görsel' },
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: {
          en: 'Optional photo used as a soft backdrop behind the logo on brand cards.',
          tr: 'İsteğe bağlı. Marka kartlarında logonun arkasında hafif bir doku olarak kullanılır.',
        },
      },
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
