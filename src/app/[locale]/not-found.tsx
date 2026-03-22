import { getTranslations } from 'next-intl/server'
import { Link } from '@/i18n/navigation'

export default async function NotFound() {
    const t = await getTranslations('notFound')

    return (
        <main className="flex min-h-screen flex-col items-center justify-center px-8 text-center">
            <p className="mb-4 text-sm uppercase tracking-widest text-gray-400">404</p>
            <h1 className="mb-8 text-[80px] font-black leading-none tracking-tighter md:text-[140px] xl:text-[200px]">
                lost?
            </h1>
            <Link
                href="/"
                className="text-lg tracking-tighter underline underline-offset-4 transition-opacity hover:opacity-60"
            >
                {t('back')}
            </Link>
        </main>
    )
}
