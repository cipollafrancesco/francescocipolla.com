import BusinessHero from '@/sections/BusinessHero'
import ProofStrip from '@/sections/ProofStrip'
import Services from '@/sections/Services'
import StackedProjects from '@/components/StackedProjects'
import Process from '@/sections/Process'
import EngagementModels from '@/sections/EngagementModels'
import ContactsWrapper from '@/sections/ContactsWrapper'
import {setRequestLocale, getTranslations} from 'next-intl/server'

export default async function HomePage({params}: {params: Promise<{locale: string}>}) {
    const {locale} = await params;
    setRequestLocale(locale);
    const t = await getTranslations('home.projects_section');

    return (
        <main className="bg-white">
            <BusinessHero />
            <ProofStrip />
            <Services />
            
            <section id="projects" className="py-24 bg-gray-50 overflow-hidden">
                <div className="max-w-screen-xl mx-auto px-4 mb-16">
                    <h2 className="text-4xl md:text-5xl font-black tracking-tighter mb-4">{t('title')}</h2>
                    <p className="text-gray-500 max-w-2xl">
                        {t('subtitle')}
                    </p>
                </div>
                <StackedProjects />
            </section>

            <Process />
            <EngagementModels />
            
            <ContactsWrapper />
        </main>
    )
}
