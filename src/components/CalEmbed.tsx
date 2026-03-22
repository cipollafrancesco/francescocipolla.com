'use client'
import Cal, { getCalApi } from '@calcom/embed-react'
import { useEffect } from 'react'

interface CalEmbedProps {
    calLink: string
}

export default function CalEmbed({ calLink }: CalEmbedProps) {
    useEffect(() => {
        ;(async () => {
            const calApi = await getCalApi()
            calApi('ui', { theme: 'light', hideEventTypeDetails: true })
        })()
    }, [])

    return <Cal calLink={calLink} />
}
