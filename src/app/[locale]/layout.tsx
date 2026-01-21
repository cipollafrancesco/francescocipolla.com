import './globals.css'
import {Inter} from 'next/font/google'
import Header from '@/components/Header'
import {NextIntlClientProvider} from 'next-intl';
import {getMessages, setRequestLocale} from 'next-intl/server';
import {routing} from '@/i18n/routing';
import {notFound} from 'next/navigation';

const inter = Inter({subsets: ['latin'], weight: ['400', '500', '700', '900']})

export function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}));
}

export async function generateMetadata({params}: {params: Promise<{locale: string}>}) {
    const {locale} = await params;
    
    const titles: Record<string, string> = {
        en: 'Francesco Cipolla - Senior Full-Stack Engineer in Trapani',
        it: 'Francesco Cipolla - Senior Full-Stack Engineer a Trapani'
    };
    
    const descriptions: Record<string, string> = {
        en: 'Senior Full-Stack Engineer & Freelance Developer based in Trapani, Italy. Building digital products, AI solutions, and high-performance platforms.',
        it: 'Senior Full-Stack Engineer & Freelance Developer a Trapani. Sviluppo prodotti digitali, soluzioni AI e piattaforme web ad alte prestazioni.'
    };

    return {
        title: titles[locale] || titles.en,
        description: descriptions[locale] || descriptions.en,
    }
}

export default async function LocaleLayout({
    children,
    params
}: {
    children: React.ReactNode;
    params: Promise<{locale: string}>;
}) {
    const {locale} = await params;
    
    // Ensure that the incoming `locale` is valid
    if (!routing.locales.includes(locale as any)) {
        notFound();
    }

    // Enable static rendering
    setRequestLocale(locale);

    // Providing all messages to the client
    // side is the easiest way to get started
    const messages = await getMessages();

    return (
        <html lang={locale}>
        <body className={`${inter.className}`}>
            <NextIntlClientProvider messages={messages}>
                <Header/>
                {children}
                <footer className="bg-white py-8">
                    <div className="mx-auto px-4 text-center">
                        <p className="text-xs">&copy; {new Date().getFullYear()} Francesco Cipolla. All rights reserved.</p>
                    </div>
                </footer>
            </NextIntlClientProvider>
        </body>
        </html>
    )
}
