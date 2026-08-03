'use server'

import { headers } from 'next/headers'
import { Resend } from 'resend'
import { siteLinks } from '@/content/site'
import { contactSchema } from '@/lib/contact-schema'
import { isRateLimited } from '@/lib/rate-limit'

// Lazily constructed rather than at module scope: `RESEND_API_KEY` is optional
// locally, and building the client eagerly would throw on import. Cached so a
// warm instance doesn't rebuild it on every submission. The `!` is safe — the
// only caller is past the missing-key guard below.
let resend: Resend | undefined

function getResend() {
    resend ??= new Resend(process.env.RESEND_API_KEY!)
    return resend
}

export type ContactFormState = {
    ok: boolean
    fieldErrors?: Partial<Record<string, string>>
    genericError?: boolean
}

export async function submitContactForm(
    _prevState: ContactFormState | null,
    formData: FormData
): Promise<ContactFormState> {
    // No fallback bucket for a missing IP: Vercel always sets `x-forwarded-for`
    // in production, so this only matters locally or behind an unusual proxy —
    // and sharing one 'unknown' bucket across every such request would let
    // unrelated visitors lock each other out instead of just going unlimited.
    const ip = (await headers()).get('x-forwarded-for')?.split(',')[0]?.trim()

    if (ip && isRateLimited(ip)) {
        return { ok: false, genericError: true }
    }

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

    if (!process.env.RESEND_API_KEY) {
        return { ok: false, genericError: true }
    }

    const to = process.env.CONTACT_TO_EMAIL ?? siteLinks.email
    const from = process.env.CONTACT_FROM_EMAIL ?? 'onboarding@resend.dev'

    try {
        await getResend().emails.send({
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
