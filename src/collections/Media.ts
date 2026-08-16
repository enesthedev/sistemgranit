import type { CollectionConfig } from 'payload'
import { GROUP_CONTENT } from '@/fields/groups'

export const Media: CollectionConfig = {
  slug: 'media',
  labels: {
    singular: { en: 'Media', tr: 'Medya' },
    plural: { en: 'Media', tr: 'Medya' },
  },
  access: {
    read: () => true,
  },
  admin: {
    group: GROUP_CONTENT,
  },
  fields: [
    {
      name: 'alt',
      label: { en: 'Alt text', tr: 'Alternatif metin' },
      type: 'text',
      required: true,
      admin: {
        description: {
          en: 'Briefly describe the image for accessibility and SEO.',
          tr: 'Erişilebilirlik ve SEO için görseli kısaca tanımlayın.',
        },
      },
    },
  ],
  upload: {
    mimeTypes: ['image/*'],
    focalPoint: true,
    imageSizes: [
      // Width-only: keeps the aspect ratio, so brand logos are never cropped.
      { name: 'logo', width: 800 },
      { name: 'thumbnail', width: 400, height: 400, position: 'centre' },
      { name: 'card', width: 768, height: 1024, position: 'centre' },
      { name: 'feature', width: 1280, height: 900, position: 'centre' },
      { name: 'hero', width: 1920, height: 1280, position: 'centre' },
    ],
  },
}
