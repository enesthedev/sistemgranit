import type { CollectionConfig } from 'payload'
import { slugField } from '@/fields/slug'
import { GROUP_CONTENT } from '@/fields/groups'

export const Products: CollectionConfig = {
  slug: 'products',
  labels: {
    singular: { en: 'Product', tr: 'Ürün' },
    plural: { en: 'Products', tr: 'Ürünler' },
  },
  access: { read: () => true },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'featured', 'updatedAt'],
    group: GROUP_CONTENT,
  },
  fields: [
    {
      type: 'row',
      fields: [
        { name: 'title', label: { en: 'Product name', tr: 'Ürün adı' }, type: 'text', required: true },
        {
          name: 'category',
          label: { en: 'Brand', tr: 'Marka' },
          type: 'relationship',
          relationTo: 'categories',
          required: true,
        },
      ],
    },
    slugField('title'),
    {
      name: 'featured',
      label: { en: 'Featured', tr: 'Öne çıkan' },
      type: 'checkbox',
      defaultValue: false,
      admin: {
        position: 'sidebar',
        description: {
          en: 'Shown among the featured items on the homepage.',
          tr: 'Ana sayfada öne çıkanlarda gösterilir.',
        },
      },
    },
    {
      name: 'price',
      label: { en: 'Starting price (₺)', tr: 'Başlangıç fiyatı (₺)' },
      type: 'number',
      min: 0,
      admin: {
        position: 'sidebar',
        step: 50,
        description: {
          en: 'Displayed as a “starting from” price. Leave empty to hide.',
          tr: 'Sitede “…’den başlayan” olarak gösterilir. Boş bırakılırsa gizlenir.',
        },
      },
    },
    {
      name: 'code',
      label: { en: 'Product code', tr: 'Ürün kodu' },
      type: 'text',
      admin: {
        position: 'sidebar',
        description: {
          en: 'Manufacturer reference code (e.g. 10115).',
          tr: 'Üretici referans kodu (örn. 10115).',
        },
      },
    },
    {
      name: 'images',
      label: { en: 'Images', tr: 'Görseller' },
      type: 'array',
      minRows: 1,
      labels: {
        singular: { en: 'Image', tr: 'Görsel' },
        plural: { en: 'Images', tr: 'Görseller' },
      },
      admin: {
        description: {
          en: 'The first image is used as the cover.',
          tr: 'İlk görsel kapak olarak kullanılır.',
        },
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
      type: 'row',
      fields: [
        { name: 'color', label: { en: 'Color', tr: 'Renk' }, type: 'text' },
        {
          name: 'origin',
          label: { en: 'Origin', tr: 'Menşei' },
          type: 'text',
          admin: { description: { en: 'e.g. Afyon, Marmara', tr: 'Örn. Afyon, Marmara' } },
        },
      ],
    },
    {
      name: 'finish',
      label: { en: 'Finishes', tr: 'Yüzey işlemleri' },
      type: 'select',
      hasMany: true,
      options: [
        { label: { en: 'Polished', tr: 'Cilalı' }, value: 'cilali' },
        { label: { en: 'Honed', tr: 'Honlanmış' }, value: 'honlanmis' },
        { label: { en: 'Patinato', tr: 'Patinato' }, value: 'patinato' },
        { label: { en: 'Antiqued', tr: 'Eskitme' }, value: 'eskitme' },
        { label: { en: 'Brushed', tr: 'Fırçalı' }, value: 'fircali' },
        { label: { en: 'Sandblasted', tr: 'Kumlanmış' }, value: 'kumlanmis' },
      ],
    },
    {
      name: 'applications',
      label: { en: 'Applications', tr: 'Kullanım alanları' },
      type: 'select',
      hasMany: true,
      options: [
        { label: { en: 'Flooring', tr: 'Zemin kaplama' }, value: 'zemin' },
        { label: { en: 'Wall cladding', tr: 'Duvar kaplama' }, value: 'duvar' },
        { label: { en: 'Kitchen countertop', tr: 'Mutfak tezgâhı' }, value: 'tezgah' },
        { label: { en: 'Bathroom', tr: 'Banyo' }, value: 'banyo' },
        { label: { en: 'Stairs', tr: 'Merdiven' }, value: 'merdiven' },
        { label: { en: 'Facade', tr: 'Dış cephe' }, value: 'cephe' },
        { label: { en: 'Fireplace', tr: 'Şömine' }, value: 'somine' },
      ],
    },
    {
      name: 'specs',
      label: { en: 'Technical specs', tr: 'Teknik özellikler' },
      type: 'group',
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'thickness',
              label: { en: 'Thickness', tr: 'Kalınlık' },
              type: 'text',
              admin: { description: { en: 'e.g. 2 cm / 3 cm', tr: 'Örn. 2 cm / 3 cm' } },
            },
            {
              name: 'sizes',
              label: { en: 'Sizes', tr: 'Ebatlar' },
              type: 'text',
              admin: { description: { en: 'e.g. 60×60, free slab', tr: 'Örn. 60×60, serbest plaka' } },
            },
          ],
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
