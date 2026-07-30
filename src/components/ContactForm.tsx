'use client'

import { useActionState, useEffect, useRef } from 'react'
import { ArrowRight, CheckCircle } from 'lucide-react'
import { submitContactForm } from '@/app/[lang]/contacts/actions'
import { contactTopics } from '@/lib/contact-schema'
import { trackEvent } from '@/lib/analytics'
import type { SiteContent } from '@/content/site'

interface ContactFormProps {
    form: SiteContent['contact']['form']
    lang: string
}

const inputClasses =
    'mt-1.5 w-full border border-black bg-white px-4 py-3 text-sm text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black'
const labelClasses = 'block text-xs font-semibold uppercase tracking-[0.12em] text-gray-500'
const errorClasses = 'mt-1.5 text-xs text-red-600'

export function ContactForm({ form, lang }: ContactFormProps) {
    const [state, formAction, isPending] = useActionState(submitContactForm, null)
    const trackedRef = useRef(false)

    useEffect(() => {
        if (state?.ok && !trackedRef.current) {
            trackedRef.current = true
            trackEvent('contact_form_submit', { locale: lang })
        }
    }, [state?.ok, lang])

    if (state?.ok) {
        return (
            <div className="border border-black p-8 md:p-10">
                <CheckCircle className="h-8 w-8" aria-hidden="true" />
                <h3 className="mt-4 text-2xl font-black tracking-tight">{form.success.title}</h3>
                <p className="mt-3 text-base leading-7 text-gray-700">{form.success.body}</p>
            </div>
        )
    }

    const getFieldError = (field: string): string | null => {
        const code = state?.fieldErrors?.[field]
        if (!code) return null
        if (code === 'email_invalid') return form.errors.emailInvalid
        if (code === 'message_too_short') return form.errors.messageTooShort
        if (code === 'message_too_long') return form.errors.messageTooLong
        return form.errors.required
    }

    return (
        <form action={formAction} noValidate>
            {/* Honeypot — hidden from users, catches bots */}
            <div className="hidden" aria-hidden="true">
                <label htmlFor="cf-website">Website</label>
                <input
                    id="cf-website"
                    type="text"
                    name="website"
                    tabIndex={-1}
                    autoComplete="off"
                />
            </div>

            <div className="grid gap-5 md:grid-cols-2">
                <div>
                    <label htmlFor="cf-name" className={labelClasses}>
                        {form.fields.name}
                    </label>
                    <input
                        id="cf-name"
                        name="name"
                        type="text"
                        autoComplete="name"
                        placeholder={form.fields.namePlaceholder}
                        className={inputClasses}
                        required
                    />
                    {getFieldError('name') && (
                        <p className={errorClasses} role="alert">
                            {getFieldError('name')}
                        </p>
                    )}
                </div>

                <div>
                    <label htmlFor="cf-email" className={labelClasses}>
                        {form.fields.email}
                    </label>
                    <input
                        id="cf-email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        placeholder={form.fields.emailPlaceholder}
                        className={inputClasses}
                        required
                    />
                    {getFieldError('email') && (
                        <p className={errorClasses} role="alert">
                            {getFieldError('email')}
                        </p>
                    )}
                </div>

                <div>
                    <label htmlFor="cf-company" className={labelClasses}>
                        {form.fields.company}
                    </label>
                    <input
                        id="cf-company"
                        name="company"
                        type="text"
                        autoComplete="organization"
                        placeholder={form.fields.companyPlaceholder}
                        className={inputClasses}
                    />
                </div>

                <div>
                    <label htmlFor="cf-topic" className={labelClasses}>
                        {form.fields.topic}
                    </label>
                    <select
                        id="cf-topic"
                        name="topic"
                        defaultValue=""
                        className={inputClasses}
                        required
                    >
                        <option value="" disabled>
                            —
                        </option>
                        {contactTopics.map((t) => (
                            <option key={t} value={t}>
                                {form.topics[t]}
                            </option>
                        ))}
                    </select>
                    {getFieldError('topic') && (
                        <p className={errorClasses} role="alert">
                            {getFieldError('topic')}
                        </p>
                    )}
                </div>
            </div>

            <div className="mt-5">
                <label htmlFor="cf-message" className={labelClasses}>
                    {form.fields.message}
                </label>
                <textarea
                    id="cf-message"
                    name="message"
                    rows={5}
                    placeholder={form.fields.messagePlaceholder}
                    className={inputClasses + ' resize-y'}
                    required
                />
                {getFieldError('message') && (
                    <p className={errorClasses} role="alert">
                        {getFieldError('message')}
                    </p>
                )}
            </div>

            {state?.genericError && (
                <p className="mt-4 text-sm text-red-600" role="alert">
                    {form.errors.generic}
                </p>
            )}

            <div className="mt-6">
                <button
                    type="submit"
                    disabled={isPending}
                    className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md border border-black bg-black px-5 py-2.5 text-sm font-semibold text-white transition-[color,background-color,border-color,transform] duration-200 hover:bg-white hover:text-black active:scale-[0.96] disabled:cursor-not-allowed disabled:opacity-60"
                >
                    {isPending ? form.fields.submitting : form.fields.submit}
                    {!isPending && <ArrowRight className="h-4 w-4" aria-hidden="true" />}
                </button>
            </div>
        </form>
    )
}
