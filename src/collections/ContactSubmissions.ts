import type { CollectionConfig } from 'payload'
import { GROUP_FORMS } from '@/fields/groups'

const adminOnly = ({ req }: { req: { user?: unknown } }) => Boolean(req.user)

export const ContactSubmissions: CollectionConfig = {
  slug: 'contact-submissions',
  labels: {
    singular: { en: 'Form Message', tr: 'Form Mesajı' },
    plural: { en: 'Form Messages', tr: 'Form Mesajları' },
  },
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
    group: GROUP_FORMS,
    description: {
      en: 'Messages received from the contact form.',
      tr: 'İletişim formundan gelen mesajlar.',
    },
  },
  fields: [
    {
      type: 'row',
      fields: [
        { name: 'name', label: { en: 'Full name', tr: 'Ad Soyad' }, type: 'text', required: true },
        {
          name: 'status',
          label: { en: 'Status', tr: 'Durum' },
          type: 'select',
          defaultValue: 'new',
          options: [
            { label: { en: 'New', tr: 'Yeni' }, value: 'new' },
            { label: { en: 'Read', tr: 'Okundu' }, value: 'read' },
            { label: { en: 'Archived', tr: 'Arşiv' }, value: 'archived' },
          ],
          admin: { position: 'sidebar' },
        },
      ],
    },
    {
      type: 'row',
      fields: [
        { name: 'phone', label: { en: 'Phone', tr: 'Telefon' }, type: 'text' },
        { name: 'email', label: { en: 'Email', tr: 'E-posta' }, type: 'email' },
      ],
    },
    { name: 'subject', label: { en: 'Subject', tr: 'Konu' }, type: 'text' },
    { name: 'message', label: { en: 'Message', tr: 'Mesaj' }, type: 'textarea', required: true },
  ],
  timestamps: true,
}
