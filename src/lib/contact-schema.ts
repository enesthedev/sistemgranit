import { z } from 'zod'

export const contactSchema = z
  .object({
    name: z.string().min(2, 'Lütfen adınızı girin.'),
    phone: z.string().max(40).optional().or(z.literal('')),
    email: z
      .string()
      .email('Geçerli bir e-posta adresi girin.')
      .optional()
      .or(z.literal('')),
    subject: z.string().max(120).optional().or(z.literal('')),
    message: z.string().min(5, 'Lütfen mesajınızı biraz daha açar mısınız?').max(2000),
  })
  .refine((d) => Boolean(d.phone?.trim()) || Boolean(d.email?.trim()), {
    message: 'En az bir iletişim bilgisi (telefon veya e-posta) girin.',
    path: ['phone'],
  })

export type ContactInput = z.infer<typeof contactSchema>
