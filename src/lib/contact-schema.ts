import { z } from 'zod'

export const contactTopics = ['growth', 'operations', 'product', 'support'] as const
export type ContactTopic = (typeof contactTopics)[number]

export const contactSchema = z.object({
    name: z.string().min(2, 'required'),
    email: z.string().email('email_invalid'),
    company: z.string().optional(),
    topic: z.enum(contactTopics, { message: 'required' }),
    message: z.string().min(10, 'message_too_short'),
    // honeypot — bots fill this; legitimate users never see it
    website: z.literal('').optional(),
})

export type ContactFormData = z.infer<typeof contactSchema>
