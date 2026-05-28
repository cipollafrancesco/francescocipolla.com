import { redirect } from 'next/navigation'

interface ServicesPageProps {
    params: Promise<{ lang: string }>
}

export default async function ServicesPage({ params }: ServicesPageProps) {
    const { lang } = await params
    redirect(`/${lang}`)
}
