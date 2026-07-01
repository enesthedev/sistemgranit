import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true,
  },
  admin: {
    group: 'İçerik',
  },
  fields: [
    {
      name: 'alt',
      label: 'Alternatif metin',
      type: 'text',
      required: true,
      admin: {
        description: 'Erişilebilirlik ve SEO için görseli kısaca tanımlayın.',
      },
    },
  ],
  upload: {
    mimeTypes: ['image/*'],
    focalPoint: true,
    imageSizes: [
      { name: 'thumbnail', width: 400, height: 400, position: 'centre' },
      { name: 'card', width: 768, height: 1024, position: 'centre' },
      { name: 'feature', width: 1280, height: 900, position: 'centre' },
      { name: 'hero', width: 1920, height: 1280, position: 'centre' },
    ],
  },
}
