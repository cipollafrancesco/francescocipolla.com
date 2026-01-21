import AboutExperience from '@/features/about/AboutExperience'
import {setRequestLocale} from 'next-intl/server'

export default async function AboutPage({params}: {params: Promise<{locale: string}>}) {
    const {locale} = await params;
    setRequestLocale(locale);
    
    return <AboutExperience />
}
