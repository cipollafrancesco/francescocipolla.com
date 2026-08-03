import { z } from 'zod'

export const contactTopics = ['growth', 'operations', 'product', 'support', 'other'] as const
export type ContactTopic = (typeof contactTopics)[number]

// The server action also rate-limits by IP (see `lib/rate-limit.ts`), but the
// upper bounds here matter independently of that — without them a single
// request can still carry an arbitrarily large payload straight through to
// Resend. Overflow on name/email/company has no dedicated copy in
// ContactForm's `getFieldError` and falls back to the generic "required"
// message rather than a precise one; that's an acceptable trade against
// growing the `SiteContent` error-code set for a case that should never come
// up in real usage. `message` gets its own overflow code — reusing
// `message_too_short` there would tell someone who pasted in a wall of text
// that their message is too *short*, the wrong direction entirely.
export const contactSchema = z.object({
    name: z.string().min(2, 'required').max(100, 'required'),
    email: z.string().email('email_invalid').max(254, 'email_invalid'),
    company: z.string().max(100, 'required').optional(),
    topic: z.enum(contactTopics, { message: 'required' }),
    message: z.string().min(10, 'message_too_short').max(5000, 'message_too_long'),
    // honeypot — bots fill this; legitimate users never see it
    website: z.literal('').optional(),
})

export type ContactFormData = z.infer<typeof contactSchema>
