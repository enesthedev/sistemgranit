'use server'

import { getPayloadClient } from '@/lib/payload'
import { contactSchema, type ContactInput } from '@/lib/contact-schema'

export type ContactResult = { success: boolean; message: string }

export async function submitContact(input: ContactInput): Promise<ContactResult> {
  const parsed = contactSchema.safeParse(input)
  if (!parsed.success) {
    return { success: false, message: 'Lütfen formdaki alanları kontrol edin.' }
  }

  const { name, phone, email, subject, message } = parsed.data

  try {
    const payload = await getPayloadClient()
    await payload.create({
      collection: 'contact-submissions',
      data: {
        name,
        phone: phone || undefined,
        email: email || undefined,
        subject: subject || undefined,
        message,
        status: 'new',
      },
    })
    return { success: true, message: 'Mesajınız alındı. En kısa sürede size dönüş yapacağız.' }
  } catch {
    return {
      success: false,
      message: 'Mesaj gönderilemedi. Lütfen telefonla ulaşmayı deneyin.',
    }
  }
}
