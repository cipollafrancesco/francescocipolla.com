'use server'

import { Resend } from 'resend'
import { contactSchema } from '@/lib/contact-schema'

const resend = new Resend(process.env.RESEND_API_KEY)

export type ContactFormState = {
    ok: boolean
    fieldErrors?: Partial<Record<string, string>>
    genericError?: boolean
}

export async function submitContactForm(
    _prevState: ContactFormState | null,
    formData: FormData
): Promise<ContactFormState> {
    const raw = {
        name: (formData.get('name') as string | null) ?? '',
        email: (formData.get('email') as string | null) ?? '',
        company: (formData.get('company') as string | null) ?? undefined,
        topic: (formData.get('topic') as string | null) ?? '',
        message: (formData.get('message') as string | null) ?? '',
        website: (formData.get('website') as string | null) ?? '',
    }

    // Honeypot check — silently succeed to not signal the bot
    if (raw.website) {
        return { ok: true }
    }

    const result = contactSchema.safeParse(raw)

    if (!result.success) {
        const fieldErrors: Partial<Record<string, string>> = {}
        for (const [key, issues] of Object.entries(result.error.flatten().fieldErrors)) {
            const msg = issues?.[0]
            if (msg) fieldErrors[key] = msg
        }
        return { ok: false, fieldErrors }
    }

    const { name, email, company, topic, message } = result.data

    const to = process.env.CONTACT_TO_EMAIL ?? 'info@francescocipolla.com'
    const from = process.env.CONTACT_FROM_EMAIL ?? 'onboarding@resend.dev'

    try {
        await resend.emails.send({
            to,
            from,
            replyTo: email,
            subject: `[francescocipolla.com] ${topic} — ${name}`,
            text: [
                `Nome: ${name}`,
                `Email: ${email}`,
                company ? `Azienda: ${company}` : null,
                `Tipo di esigenza: ${topic}`,
                '',
                message,
            ]
                .filter((line): line is string => line !== null)
                .join('\n'),
        })
        return { ok: true }
    } catch {
        return { ok: false, genericError: true }
    }
}
