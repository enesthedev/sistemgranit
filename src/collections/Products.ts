import type { CollectionConfig } from 'payload'
import { slugField } from '@/fields/slug'

export const Products: CollectionConfig = {
  slug: 'products',
  labels: { singular: 'Ürün', plural: 'Ürünler' },
  access: { read: () => true },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'featured', 'updatedAt'],
    group: 'İçerik',
  },
  fields: [
    {
      type: 'row',
      fields: [
        { name: 'title', label: 'Ürün adı', type: 'text', required: true },
        {
          name: 'category',
          label: 'Kategori',
          type: 'relationship',
          relationTo: 'categories',
          required: true,
        },
      ],
    },
    slugField('title'),
    {
      name: 'featured',
      label: 'Öne çıkan',
      type: 'checkbox',
      defaultValue: false,
      admin: { position: 'sidebar', description: 'Ana sayfada öne çıkanlarda gösterilir.' },
    },
    {
      name: 'images',
      label: 'Görseller',
      type: 'array',
      minRows: 1,
      labels: { singular: 'Görsel', plural: 'Görseller' },
      admin: { description: 'İlk görsel kapak olarak kullanılır.' },
      fields: [
        { name: 'image', label: 'Görsel', type: 'upload', relationTo: 'media', required: true },
      ],
    },
    {
      type: 'row',
      fields: [
        { name: 'color', label: 'Renk', type: 'text' },
        { name: 'origin', label: 'Menşei', type: 'text', admin: { description: 'Örn. Afyon, Marmara' } },
      ],
    },
    {
      name: 'finish',
      label: 'Yüzey işlemleri',
      type: 'select',
      hasMany: true,
      options: [
        { label: 'Cilalı', value: 'cilali' },
        { label: 'Honlanmış', value: 'honlanmis' },
        { label: 'Patinato', value: 'patinato' },
        { label: 'Eskitme', value: 'eskitme' },
        { label: 'Fırçalı', value: 'fircali' },
        { label: 'Kumlanmış', value: 'kumlanmis' },
      ],
    },
    {
      name: 'applications',
      label: 'Kullanım alanları',
      type: 'select',
      hasMany: true,
      options: [
        { label: 'Zemin kaplama', value: 'zemin' },
        { label: 'Duvar kaplama', value: 'duvar' },
        { label: 'Mutfak tezgâhı', value: 'tezgah' },
        { label: 'Banyo', value: 'banyo' },
        { label: 'Merdiven', value: 'merdiven' },
        { label: 'Dış cephe', value: 'cephe' },
        { label: 'Şömine', value: 'somine' },
      ],
    },
    {
      name: 'specs',
      label: 'Teknik özellikler',
      type: 'group',
      fields: [
        {
          type: 'row',
          fields: [
            { name: 'thickness', label: 'Kalınlık', type: 'text', admin: { description: 'Örn. 2 cm / 3 cm' } },
            { name: 'sizes', label: 'Ebatlar', type: 'text', admin: { description: 'Örn. 60×60, serbest plaka' } },
          ],
        },
      ],
    },
    {
      name: 'description',
      label: 'Açıklama',
      type: 'richText',
    },
  ],
}
