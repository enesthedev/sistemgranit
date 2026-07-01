import type { CollectionConfig } from 'payload'

const adminOnly = ({ req }: { req: { user?: unknown } }) => Boolean(req.user)

export const ContactSubmissions: CollectionConfig = {
  slug: 'contact-submissions',
  labels: { singular: 'Form Mesajı', plural: 'Form Mesajları' },
  access: {
    // Anyone can submit the public contact form…
    create: () => true,
    // …but only authenticated admins can read or manage submissions.
    read: adminOnly,
    update: adminOnly,
    delete: adminOnly,
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'phone', 'email', 'status', 'createdAt'],
    group: 'Form',
    description: 'İletişim formundan gelen mesajlar.',
  },
  fields: [
    {
      type: 'row',
      fields: [
        { name: 'name', label: 'Ad Soyad', type: 'text', required: true },
        {
          name: 'status',
          label: 'Durum',
          type: 'select',
          defaultValue: 'new',
          options: [
            { label: 'Yeni', value: 'new' },
            { label: 'Okundu', value: 'read' },
            { label: 'Arşiv', value: 'archived' },
          ],
          admin: { position: 'sidebar' },
        },
      ],
    },
    {
      type: 'row',
      fields: [
        { name: 'phone', label: 'Telefon', type: 'text' },
        { name: 'email', label: 'E-posta', type: 'email' },
      ],
    },
    { name: 'subject', label: 'Konu', type: 'text' },
    { name: 'message', label: 'Mesaj', type: 'textarea', required: true },
  ],
  timestamps: true,
}
