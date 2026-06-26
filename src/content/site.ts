import type { Locale } from '@/i18n/config'
import type { Metadata } from 'next'

const baseUrl = 'https://francescocipolla.com'

export type LocalizedProject = {
    id: number
    slug: string
    title: string
    client: string
    image: string
    mobileImage: string
    url: string
    role: string
    year: string
    technologies: string[]
    description: string
    highlights: string[]
    problem: string
    solution: string
    outcome: string
    showcaseOutcome?: string
}

export type SiteContent = {
    common: {
        nav: {
            about: string
            experiences: string
            projects: string
            services: string
            contacts: string
            bookCall: string
            resume: string
            openMenu: string
            closeMenu: string
            switchLanguage: string
        }
        footer: {
            tagline: string
            links: {
                about: string
                experiences: string
                projects: string
                blog: string
                contacts: string
                services: string
            }
            socials: {
                linkedin: string
                github: string
                email: string
            }
            privacySettings: string
            rights: string
        }
        cta: {
            book: string
            bookMicrocopy: string
            tellProject: string
            project: string
            liveSite: string
            caseStudy: string
            backHome: string
            backProjects: string
        }
    }
    metadata: {
        home: Metadata
        services: Metadata
        about: Metadata
        projects: Metadata
        contacts: Metadata
        blog: Metadata
    }
    home: {
        heroDisclaimer: string
        descriptions: { text: string; color?: string }[][]
        projectsTitle: string
        contactsTitle: string
        scheduleTitle: string
    }
    experiences: {
        company: string
        logo: string
        position: string
        period: string
        description: string
        techs?: string[]
    }[]
    services: {
        hero: {
            eyebrow: string
            title: string
            lead: string
            secondary: string
        }
        proof: {
            eyebrow: string
            names: string[]
            stats: { value: string; label: string }[]
        }
        profile: {
            eyebrow: string
            title: string
            description: string
            imageAlt: string
            imageCaption: string
        }
        serviceIntro: {
            eyebrow: string
            title: string
            description: string
            ctaLabel: string
            ctaHelperTitle: string
            ctaHelper: string
        }
        buckets: {
            title: string
            label: string
            plainLabel: string
            situation: string
            description: string
        }[]
        capabilities: {
            eyebrow: string
            title: string
            description: string
            items: { key: string; name: string; description: string }[]
        }
        cases: {
            eyebrow: string
            title: string
            description: string
        }
        process: {
            eyebrow: string
            title: string
            steps: { title: string; description: string }[]
        }
        faq: {
            eyebrow: string
            title: string
            items: { question: string; answer: string }[]
        }
        booking: {
            eyebrow: string
            title: string
            description: string
        }
    }
    projects: LocalizedProject[]
    projectPage: {
        overview: string
        highlights: string
        problem: string
        solution: string
        outcome: string
        gallery: string
        galleryView: string
        galleryDesktop: string
        galleryMobile: string
        galleryPrevious: string
        galleryNext: string
    }
    blog: {
        title: string
        empty: string
    }
    notFound: {
        title: string
        label: string
    }
    consent: {
        title: string
        description: string
        accept: string
        reject: string
    }
    contact: {
        form: {
            eyebrow: string
            title: string
            intro: string
            fields: {
                name: string
                namePlaceholder: string
                email: string
                emailPlaceholder: string
                company: string
                companyPlaceholder: string
                topic: string
                message: string
                messagePlaceholder: string
                submit: string
                submitting: string
            }
            topics: {
                growth: string
                operations: string
                product: string
                support: string
            }
            success: {
                title: string
                body: string
            }
            errors: {
                required: string
                emailInvalid: string
                messageTooShort: string
                generic: string
            }
        }
    }
}

const sharedProjects = {
    cheDesignerSei: {
        id: 1,
        slug: 'che-designer-sei',
        title: 'Che Designer Sei?',
        client: 'Talent Garden',
        image: '/projects/che-designer-sei/cover.webp',
        mobileImage: '/projects/che-designer-sei/mobile.webp',
        url: 'https://chedesignersei.talentgarden.com/',
        year: '2023',
        technologies: ['Next.js', 'Tailwind CSS', 'Vercel', 'HubSpot CMS'],
    },
    hubLombardini22: {
        id: 2,
        slug: 'hub-lombardini22',
        title: 'Hub Lombardini22',
        client: 'Lombardini22',
        image: '/projects/hub-lombardini22/cover.webp',
        mobileImage: '/projects/hub-lombardini22/mobile.webp',
        url: 'https://hublombardini22.com/',
        year: '2023',
        technologies: ['Next.js', 'Matter.js', 'Tailwind CSS', 'Vercel', 'Strapi'],
    },
    dpulses: {
        id: 3,
        slug: 'dpulses',
        title: 'Dpulses',
        client: 'Dpulses',
        image: '/projects/dpulses/cover.webp',
        mobileImage: '/projects/dpulses/mobile.webp',
        url: 'https://www.dpulses.com/',
        year: '2024',
        technologies: ['Next.js', 'Tailwind CSS', 'Vercel'],
    },
    datahause: {
        id: 4,
        slug: 'datahause',
        title: 'DataHause',
        client: 'DataHause',
        image: '/projects/datahause/cover.webp',
        mobileImage: '/projects/datahause/mobile.webp',
        url: 'https://www.datahause.com/',
        year: '2024',
        technologies: ['Next.js', 'Tailwind CSS', 'Vercel'],
    },
    reclamiGasELuce: {
        id: 5,
        slug: 'reclamigaseluce',
        title: 'Reclami Gas e Luce',
        client: 'Reclami Gas e Luce',
        image: '/projects/reclamigaseluce/cover.webp',
        mobileImage: '/projects/reclamigaseluce/mobile.webp',
        url: 'https://www.reclamigaseluce.it/',
        year: '2026',
        technologies: ['Next.js', 'Tailwind CSS', 'Vercel'],
    },
}

const itProjects: LocalizedProject[] = [
    {
        ...sharedProjects.cheDesignerSei,
        role: 'Digital product partner',
        description:
            "Un'esperienza interattiva per Talent Garden pensata per promuovere corsi di design e raccogliere lead qualificati attraverso un quiz guidato.",
        highlights: [
            'Flusso quiz completo con transizioni animate tra le domande',
            'Integrazione HubSpot CMS per acquisizione lead nelle pagine risultato',
            'Caricamento sotto il secondo su edge network Vercel',
            'Consegna end-to-end in meno di 3 settimane, dal brief alla produzione',
        ],
        problem:
            'Talent Garden aveva bisogno di trasformare una campagna formativa in un percorso digitale coinvolgente e misurabile.',
        solution:
            'Ho costruito un quiz interattivo con risultato personalizzato, pagine dinamiche e integrazione HubSpot per la raccolta contatti.',
        outcome:
            'La campagna ha unito esperienza editoriale, lead generation e autonomia di gestione dei contenuti in un unico prodotto web.',
        showcaseOutcome:
            'Esperienza interattiva, lead generation e contenuti gestibili in un unico prodotto web.',
    },
    {
        ...sharedProjects.hubLombardini22,
        role: 'Digital product partner',
        description:
            "Un sito showcase per l'hub di innovazione di Lombardini22, con animazioni interattive, contenuti gestibili da CMS e un impianto editoriale coerente con il brand.",
        highlights: [
            'Animazione hero fisica costruita con Matter.js',
            'Integrazione Strapi per pubblicazione autonoma dei contenuti',
            'Transizioni scroll-driven per una lettura immersiva',
            'Layout responsive ottimizzato per desktop e mobile',
        ],
        problem:
            "Lombardini22 doveva raccontare un progetto di innovazione con un'esperienza digitale curata e facile da aggiornare.",
        solution:
            'Ho sviluppato un sito Next.js con CMS headless, animazioni interattive e componenti editoriali riutilizzabili.',
        outcome:
            'Il team può pubblicare contenuti in autonomia mantenendo una presenza digitale distintiva e performante.',
        showcaseOutcome:
            'Contenuti gestibili in autonomia dentro una presenza digitale distintiva e performante.',
    },
    {
        ...sharedProjects.dpulses,
        role: 'Digital product partner',
        description:
            "Il sito aziendale di Dpulses, uno studio brand-first che aveva bisogno di una presenza web veloce, chiara e coerente con un'identita visiva forte.",
        highlights: [
            'Traduzione fedele del concept Figma in un sito Next.js production-ready',
            'Core Web Vitals ottimizzati in verde',
            'Approccio mobile-first su tutti i breakpoint',
            'Preview deployment automatiche per il ciclo di revisione cliente',
        ],
        problem:
            'Dpulses aveva bisogno di rendere credibile e immediata la propria proposta online, senza appesantire il messaggio.',
        solution:
            'Ho trasformato il design in un sito veloce, responsive e semplice da far evolvere durante le revisioni.',
        outcome:
            'Il brand dispone di una presenza digitale essenziale, riconoscibile e pronta a convertire interesse in contatto.',
        showcaseOutcome:
            'Presenza digitale essenziale, riconoscibile e pronta a convertire interesse in contatto.',
    },
    {
        ...sharedProjects.datahause,
        role: 'Digital product partner',
        description:
            'Il sito marketing di DataHause, società di data analytics e business intelligence, progettato per comunicare credibilità tecnica in modo accessibile.',
        highlights: [
            'Sistema component-driven per assemblare rapidamente le pagine',
            'Structured data JSON-LD per migliorare la visibilita search',
            'Sezione metriche animata per valorizzare risultati e numeri chiave',
            'Accessibilita WCAG AA sugli elementi interattivi',
        ],
        problem:
            'DataHause doveva spiegare servizi tecnici a un pubblico business senza rendere il sito freddo o complesso.',
        solution:
            'Ho costruito un impianto chiaro con sezioni strutturate, CTA leggibili e componenti riutilizzabili.',
        outcome:
            'Il sito aiuta i visitatori a capire rapidamente il valore del servizio e a muoversi verso il contatto.',
        showcaseOutcome:
            'Offerta tecnica resa chiara per il pubblico business e orientata al contatto.',
    },
    {
        ...sharedProjects.reclamiGasELuce,
        role: 'Digital product partner',
        description:
            'ReclamiGasELuce.it è una piattaforma digitale pensata per semplificare la gestione dei reclami verso fornitori di luce e gas. Il progetto nasce con l’obiettivo di trasformare un processo spesso complesso, frammentato e poco accessibile in un’esperienza guidata, chiara e automatizzata, dalla compilazione del reclamo fino all’invio formale tramite PEC o alla successiva gestione della pratica.',
        highlights: [
            'UX guidata per la compilazione del reclamo',
            'Flusso personalizzato in base a fornitore, problema e modello selezionato',
            'Pagamenti online integrati',
            'Possibilità di invio autonomo o delegato tramite PEC',
            'Integrazione con Notion come CRM e backoffice operativo',
            'Gestione utenti con area personale e accesso tramite credenziali',
            'Upload documenti e archiviazione file',
            'Integrazione con firma digitale e prenotazione consulenze',
            'Tracciamento analytics tramite Google Tag Manager e Meta Pixel',
            'Architettura pensata per scalare verso servizi aggiuntivi e automazioni future',
        ],
        problem:
            'Gli utenti che devono presentare un reclamo al proprio fornitore di energia si trovano spesso davanti a moduli poco chiari, procedure diverse da azienda ad azienda e passaggi burocratici difficili da gestire in autonomia. Allo stesso tempo, il team interno aveva bisogno di un sistema più strutturato per raccogliere i dati, qualificare le pratiche, monitorare lo stato dei reclami e ridurre il lavoro manuale operativo.',
        solution:
            'È stata progettata e sviluppata una piattaforma web con un flusso guidato per la creazione del reclamo, basato su società, problematiche e modelli predefiniti. L’utente può compilare i dati necessari, caricare eventuali documenti, effettuare il pagamento online e scegliere se inviare autonomamente il reclamo o delegarne l’invio. La piattaforma integra strumenti esterni per la gestione dei pagamenti, l’invio email, la firma digitale, la prenotazione di consulenze e il tracciamento analytics. Il backoffice è collegato a Notion, utilizzato come CRM operativo per gestire le pratiche, assegnare ID identificativi e monitorare l’avanzamento dei casi.',
        outcome:
            'Il risultato è un MVP evoluto che digitalizza un processo tradizionalmente manuale, migliorando l’esperienza utente e riducendo il carico operativo del team. La piattaforma permette di raccogliere reclami in modo strutturato, automatizzare parte del processo di gestione e abilitare nuovi servizi come consulenze, conciliazione ARERA e gestione avanzata delle pratiche.',
        showcaseOutcome:
            'MVP evoluto che raccoglie reclami strutturati e riduce il lavoro operativo del team.',
    },
]

const enProjects: LocalizedProject[] = [
    {
        ...sharedProjects.cheDesignerSei,
        role: 'Digital product partner',
        description:
            'An interactive campaign experience for Talent Garden, built to promote design courses and capture qualified leads through a guided quiz.',
        highlights: [
            'Designed and built the full quiz flow with animated transitions',
            'Integrated HubSpot CMS for lead capture on result pages',
            "Achieved sub-second loading on Vercel's edge network",
            'Shipped end-to-end in under 3 weeks, from brief to production',
        ],
        problem:
            'Talent Garden needed to turn an education campaign into a measurable digital experience that people would actually complete.',
        solution:
            'I built an interactive quiz with personalized results, dynamic pages, and HubSpot lead capture.',
        outcome:
            'The campaign connected editorial experience, lead generation, and content autonomy in one web product.',
        showcaseOutcome:
            'Interactive experience, lead generation, and managed content in one web product.',
    },
    {
        ...sharedProjects.hubLombardini22,
        role: 'Digital product partner',
        description:
            "A showcase website for Lombardini22's innovation hub, with interactive animation, CMS-managed content, and an editorial structure aligned with the brand.",
        highlights: [
            'Built a physics-based hero animation with Matter.js',
            'Integrated Strapi so the team can publish content independently',
            'Implemented scroll-driven transitions for immersive reading',
            'Delivered a responsive layout for desktop and mobile use',
        ],
        problem:
            'Lombardini22 needed to present an innovation initiative through a distinctive digital experience that could stay easy to update.',
        solution:
            'I developed a Next.js site with a headless CMS, interactive animation, and reusable editorial components.',
        outcome:
            'The team can publish independently while keeping a polished, performant digital presence.',
        showcaseOutcome:
            'Independent publishing inside a distinctive, polished, and performant digital presence.',
    },
    {
        ...sharedProjects.dpulses,
        role: 'Digital product partner',
        description:
            'The company website for Dpulses, a brand-first studio that needed a fast, clear web presence aligned with a bold visual identity.',
        highlights: [
            'Translated the Figma concept into a production-ready Next.js build',
            'Optimized Core Web Vitals to green',
            'Built mobile-first across breakpoints',
            'Used Vercel preview deployments for client review',
        ],
        problem:
            'Dpulses needed to make its online positioning clear and credible without overcomplicating the message.',
        solution:
            'I turned the design into a fast, responsive site that could evolve smoothly during reviews.',
        outcome:
            'The brand now has a concise, recognizable presence ready to convert interest into contact.',
        showcaseOutcome:
            'A concise, recognizable digital presence ready to convert interest into contact.',
    },
    {
        ...sharedProjects.datahause,
        role: 'Digital product partner',
        description:
            'The marketing website for DataHause, a data analytics and BI consultancy, built to communicate technical credibility in accessible language.',
        highlights: [
            'Created a component-driven layout system for fast page assembly',
            'Implemented JSON-LD structured data for search visibility',
            'Built animated metrics to highlight business value',
            'Checked interactive elements against WCAG AA accessibility expectations',
        ],
        problem:
            'DataHause needed to explain technical services to business buyers without making the site feel cold or complex.',
        solution:
            'I built a clear structure with readable sections, visible CTAs, and reusable components.',
        outcome: 'The site helps visitors quickly understand the offer and move toward contact.',
        showcaseOutcome:
            'A technical offer made clear for business buyers and oriented toward contact.',
    },
    {
        ...sharedProjects.reclamiGasELuce,
        role: 'Digital product partner',
        description:
            'ReclamiGasELuce.it is a digital platform designed to simplify the management of complaints against gas and electricity suppliers. The project was created to turn a process that is often complex, fragmented, and hard to access into a guided, clear, and automated experience, from complaint completion through formal PEC submission or the later management of the case.',
        highlights: [
            'Guided UX for completing the complaint',
            'Personalized flow based on supplier, issue, and selected template',
            'Integrated online payments',
            'Option for autonomous or delegated PEC submission',
            'Notion integration as CRM and operational backoffice',
            'User management with personal area and credential-based access',
            'Document upload and file storage',
            'Digital signature and consultation booking integrations',
            'Analytics tracking through Google Tag Manager and Meta Pixel',
            'Architecture designed to scale toward additional services and future automation',
        ],
        problem:
            'Users who need to submit a complaint to their energy supplier often face unclear forms, procedures that vary from company to company, and bureaucratic steps that are difficult to manage independently. At the same time, the internal team needed a more structured system to collect data, qualify cases, monitor complaint status, and reduce manual operational work.',
        solution:
            'A web platform was designed and developed with a guided flow for creating a complaint, based on companies, issues, and predefined templates. Users can enter the required data, upload supporting documents, complete online payment, and choose whether to send the complaint themselves or delegate the submission. The platform integrates external tools for payments, email sending, digital signature, consultation booking, and analytics tracking. The backoffice is connected to Notion, used as an operational CRM to manage cases, assign identifying IDs, and monitor progress.',
        outcome:
            'The result is an evolved MVP that digitalizes a traditionally manual process, improving the user experience and reducing the team’s operational workload. The platform makes it possible to collect complaints in a structured way, automate part of the management process, and enable new services such as consultations, ARERA conciliation, and advanced case management.',
        showcaseOutcome:
            'An evolved MVP that collects structured complaints and reduces team workload.',
    },
]

export const siteContent: Record<Locale, SiteContent> = {
    it: {
        common: {
            nav: {
                about: 'Chi sono',
                experiences: 'Esperienze',
                projects: 'Progetti',
                services: 'Servizi',
                contacts: 'Contatti',
                bookCall: 'Consulenza gratuita',
                resume: 'CV',
                openMenu: 'Apri menu',
                closeMenu: 'Chiudi menu',
                switchLanguage: 'Cambia lingua',
            },
            footer: {
                tagline:
                    'Creo siti e prodotti digitali che aiutano le aziende a farsi scegliere, lavorare meglio e crescere.',
                links: {
                    about: 'Chi sono',
                    experiences: 'Esperienze',
                    projects: 'Progetti',
                    blog: 'Blog',
                    contacts: 'Contatti',
                    services: 'Servizi',
                },
                socials: {
                    linkedin: 'LinkedIn',
                    github: 'GitHub',
                    email: 'Email',
                },
                privacySettings: 'Impostazioni privacy',
                rights: 'Realizzato in Italia, per aziende che vogliono crescere online.',
            },
            cta: {
                book: 'Prenota una consulenza gratuita',
                bookMicrocopy: '30 minuti · senza impegno · nessun preventivo a sorpresa',
                tellProject: 'Raccontami il tuo progetto',
                project: 'Vedi il progetto',
                liveSite: 'Visita il sito',
                caseStudy: 'Vedi il progetto',
                backHome: 'Torna alla home',
                backProjects: 'Torna ai progetti',
            },
        },
        metadata: {
            home: {
                title: 'Francesco Cipolla - Digital Product Partner',
                description:
                    'Aiuto aziende e professionisti a trasformare siti, applicazioni e processi digitali in strumenti concreti di crescita.',
            },
            services: {
                title: 'Siti web e digitalizzazione per aziende - Francesco Cipolla',
                description:
                    'Consulenza digitale, siti web per aziende, applicazioni web e automazioni per trasformare visite, processi e idee in risultati concreti.',
            },
            about: {
                title: 'Chi sono - Francesco Cipolla',
                description:
                    'Digital product partner e ingegnere informatico: esperienza in prodotti web, streaming, design e sistemi digitali.',
            },
            projects: {
                title: 'Progetti - Francesco Cipolla',
                description:
                    'Una selezione di progetti web, applicazioni e piattaforme digitali realizzate per aziende, studi e prodotti in produzione.',
            },
            contacts: {
                title: 'Contatti - Francesco Cipolla',
                description:
                    'Contatta Francesco Cipolla o prenota una consulenza per parlare di siti, applicazioni, automazioni e progetti digitali.',
            },
            blog: {
                title: 'Blog - Francesco Cipolla',
                description: 'Appunti su prodotto digitale, sviluppo web, design e tecnologia.',
            },
        },
        home: {
            heroDisclaimer:
                'Costruisco prodotti digitali, siti e sistemi web con Next.js, React e attenzione al risultato di business.',
            descriptions: [
                [{ text: 'digital product partner' }],
                [{ text: 'Ingegnere Informatico' }],
                [{ text: 'appassionato di design' }],
                [{ text: 'basketball passionate' }],
                [{ text: 'beginner kitesurfer' }],
            ],
            projectsTitle: 'progetti freelance',
            contactsTitle: 'contatti',
            scheduleTitle: 'Prenota una consulenza',
        },
        experiences: [
            {
                company: 'FIFA+',
                logo: '/companies/fifa.webp',
                position: 'Senior Front-end Engineer (Contractor)',
                period: 'Giu 2023 - Presente',
                description:
                    'Sviluppo e manutenzione di una SPA React per lo streaming sportivo, incluse funzionalità core come il player.',
                techs: ['React', 'TypeScript', 'Storybook', 'Jest', 'Playwright'],
            },
            {
                company: 'Globant',
                logo: '/companies/globant.webp',
                position: 'Senior Web UI Developer',
                period: 'Ago 2023 - Presente',
                description:
                    "Dopo l'acquisizione della divisione CHILI Tech da parte di Globant, continuo a contribuire agli stessi prodotti streaming.",
            },
            {
                company: 'CHILI',
                logo: '/companies/chili.webp',
                position: 'Senior Front-end Engineer',
                period: 'Nov 2021 - Dic 2024',
                description:
                    'Sviluppo e manutenzione del sito web e della Smart TV app su dispositivi Samsung, LG, Sony e altri.',
                techs: ['React', 'TypeScript', 'Jest', 'Bit.dev', 'RobotFramework'],
            },
            {
                company: 'Softlab S.p.A.',
                logo: '/companies/softlab.webp',
                position: 'Front-end Engineer',
                period: 'Nov 2017 - Nov 2021',
                description:
                    'Sviluppo di applicazioni enterprise per un grande gruppo assicurativo e ruolo di vice team leader frontend.',
                techs: ['React', 'TypeScript', 'Angular2+', 'Redux', 'Puppeteer'],
            },
        ],
        services: {
            hero: {
                eyebrow: 'Siti, web app e automazioni AI',
                title: 'Non ti serve un sito più bello. Ti serve un sito che porti clienti.',
                lead: 'Se ti trovano online ma non capiscono subito perché scegliere te, ogni visita è un’occasione persa.',
                secondary:
                    'Aiuto aziende e professionisti a trasformare le visite in contatti, i processi manuali in ore risparmiate e le idee in prodotti.',
            },
            proof: {
                eyebrow: 'Esperienza su prodotti e aziende reali',
                names: [
                    'FIFA+',
                    'CHILI',
                    'Talent Garden',
                    'Lombardini22',
                    'Groupama',
                    'Reclami Gas e Luce',
                    'Dpulses',
                    'DataHause',
                ],
                stats: [
                    { value: '8+', label: 'anni su prodotti web in produzione' },
                    { value: '20+', label: 'progetti web consegnati' },
                    { value: 'IT/EN', label: 'lavoro con clienti italiani e internazionali' },
                ],
            },
            profile: {
                eyebrow: 'Chi sono',
                title: 'Lavori con una persona sola, dall’idea alla messa online.',
                description:
                    'Da oltre 8 anni costruisco prodotti web che vanno in produzione: piattaforme di streaming, siti aziendali e applicazioni su misura. Unisco visione di prodotto, cura dell’interfaccia e basi tecniche solide, così non devi coordinare più figure diverse.',
                imageAlt: 'Francesco Cipolla, ingegnere informatico e digital product partner',
                imageCaption: 'Francesco Cipolla / prodotto, design, sviluppo',
            },
            serviceIntro: {
                eyebrow: 'Soluzioni',
                title: 'Parto dal problema che riconosci, non dalla soluzione tecnica.',
                description:
                    'Scegliamo insieme il pezzo digitale più piccolo e concreto che porta un risultato, senza costruire più del necessario.',
                ctaLabel: 'Parliamo del tuo caso',
                ctaHelperTitle: 'Non devi scegliere nulla.',
                ctaHelper: 'In call capiamo insieme da dove partire.',
            },
            buckets: [
                {
                    title: 'Growth',
                    label: 'Convertire meglio online',
                    plainLabel: 'Farti contattare meglio',
                    situation:
                        "La tua presenza online c'è, ma non dice abbastanza in fretta cosa fai e perché scegliere te. Chi arriva, se ne va.",
                    description:
                        'Siti web, landing page e percorsi digitali che spiegano il valore, aumentano la fiducia e rendono più facile contattarti.',
                },
                {
                    title: 'Operations',
                    label: 'Ridurre lavoro manuale',
                    plainLabel: 'Risparmiare tempo operativo',
                    situation:
                        'Preventivi, richieste e dati rimbalzano tra email, fogli e chat invece di stare in un unico posto. Il team perde ore in copia-incolla.',
                    description:
                        'Applicazioni interne, dashboard, integrazioni e automazioni per collegare strumenti e rendere i processi più fluidi.',
                },
                {
                    title: 'Product',
                    label: 'Lanciare idee digitali',
                    plainLabel: "Lanciare un'idea digitale",
                    situation:
                        'Hai in testa un portale, una dashboard o un nuovo strumento digitale, ma manca chi lo trasformi da idea a prodotto che la gente usa davvero.',
                    description:
                        'MVP, portali clienti e web app costruiti con attenzione a UX, solidità tecnica e possibilità di evolvere nel tempo.',
                },
                {
                    title: 'Support',
                    label: 'Migliorare quello che hai',
                    plainLabel: 'Migliorare quello che hai già',
                    situation:
                        "Hai già un sito, un'app o un flusso di lavoro, ma è lento, fragile o non fa più quello che ti serve.",
                    description:
                        'Interventi su prodotti esistenti: correzioni, miglioramenti e nuove funzionalità senza ripartire da zero.',
                },
            ],
            capabilities: {
                eyebrow: 'Cosa costruisco',
                title: "Dalla prima landing page all'app che usano i tuoi clienti.",
                description:
                    'La soluzione tecnica la scegliamo sul tuo problema — questi sono i mattoni con cui la costruisco.',
                items: [
                    {
                        key: 'websites',
                        name: 'Siti web & Landing page',
                        description:
                            'Pagine veloci e chiare, pensate per trasformare i visitatori in contatti.',
                    },
                    {
                        key: 'webApps',
                        name: 'Web app & Portali',
                        description:
                            'MVP, portali clienti e aree riservate su misura, pronti a crescere.',
                    },
                    {
                        key: 'mobile',
                        name: 'App mobile cross-platform',
                        description:
                            "Un'unica app per iOS e Android: un solo sviluppo, meno costi.",
                    },
                    {
                        key: 'ai',
                        name: 'Automazioni AI',
                        description:
                            "Attività ripetitive automatizzate dove l'AI fa davvero risparmiare tempo.",
                    },
                ],
            },
            cases: {
                eyebrow: 'Casi selezionati',
                title: 'Progetti reali che puoi visitare online.',
                description:
                    'Ogni progetto parte da un bisogno diverso: acquisire contatti, raccontare un brand, pubblicare contenuti o rendere chiara una proposta tecnica.',
            },
            process: {
                eyebrow: 'Metodo',
                title: 'Un percorso semplice, dall’idea alla produzione.',
                steps: [
                    {
                        title: 'Consulenza iniziale',
                        description:
                            'Capisco obiettivi, vincoli, pubblico e qual è il problema vero da risolvere.',
                    },
                    {
                        title: 'Mappa della soluzione',
                        description:
                            'Definiamo priorità, contenuti, funzionalità e primo rilascio utile.',
                    },
                    {
                        title: 'Sviluppo iterativo',
                        description:
                            'Progetto e sviluppo con review frequenti, preview online e scelte tecniche spiegate in modo chiaro.',
                    },
                    {
                        title: 'Lancio e miglioramento',
                        description:
                            'Portiamo online, misuriamo le azioni importanti e decidiamo cosa ottimizzare dopo.',
                    },
                ],
            },
            faq: {
                eyebrow: 'Domande frequenti',
                title: 'Prima della consulenza.',
                items: [
                    {
                        question: 'Lavori solo su siti web?',
                        answer: 'No. Il sito è spesso il punto di partenza, ma posso lavorare anche su applicazioni web, dashboard, aree riservate, integrazioni e automazioni.',
                    },
                    {
                        question: 'Puoi seguire anche UX e struttura dei contenuti?',
                        answer: 'Sì. Posso aiutarti a chiarire flussi, gerarchia dei contenuti e interfacce. Se serve una direzione visual specialistica, la definiamo nel progetto.',
                    },
                    {
                        question: 'Come funziona la consulenza iniziale?',
                        answer: 'Parliamo del problema, dello stato attuale, degli obiettivi e del primo risultato utile. Da lì preparo una proposta coerente con scope e priorità.',
                    },
                    {
                        question: 'Parliamo di budget nella call?',
                        answer: 'Sì, ma senza pacchetti preconfezionati. Prima capiamo il perimetro, poi ti propongo la strada più breve per ottenere un risultato.',
                    },
                    {
                        question: 'Puoi lavorare con team o agenzie già esistenti?',
                        answer: 'Sì. Posso integrarmi in processi esistenti oppure gestire direttamente le parti digitali concordate.',
                    },
                ],
            },
            booking: {
                eyebrow: 'Prossimo passo',
                title: 'Parliamone: porta il tuo problema, esci con una direzione.',
                description:
                    "Senza impegno e senza preventivi a sorpresa. Sito, processo o idea: dimmi dov'è il blocco.",
            },
        },
        projects: itProjects,
        projectPage: {
            overview: 'Panoramica',
            highlights: 'Punti chiave',
            problem: 'Problema',
            solution: 'Soluzione',
            outcome: 'Risultato',
            gallery: 'Galleria',
            galleryView: 'Formato',
            galleryDesktop: 'Desktop',
            galleryMobile: 'Mobile',
            galleryPrevious: 'Media precedente',
            galleryNext: 'Media successivo',
        },
        blog: {
            title: 'Blog',
            empty: 'Nessun articolo pubblicato.',
        },
        notFound: {
            title: 'perso?',
            label: '404',
        },
        consent: {
            title: 'Privacy e analytics',
            description:
                'Uso Google Analytics solo se accetti, per capire quali pagine e azioni aiutano davvero i visitatori. Puoi rifiutare e usare il sito normalmente.',
            accept: 'Accetta analytics',
            reject: 'Rifiuta',
        },
        contact: {
            form: {
                eyebrow: 'Scrivi',
                title: 'Dimmi come posso aiutarti.',
                intro: 'Compila il form e ti rispondo entro 24 ore. Se preferisci parlare subito, usa il calendario qui sotto.',
                fields: {
                    name: 'Nome',
                    namePlaceholder: 'Mario Rossi',
                    email: 'Email',
                    emailPlaceholder: 'mario@azienda.it',
                    company: 'Azienda (opzionale)',
                    companyPlaceholder: 'Nome azienda',
                    topic: 'Di cosa hai bisogno?',
                    message: 'Messaggio',
                    messagePlaceholder: 'Descrivi brevemente il tuo progetto o problema...',
                    submit: 'Invia il messaggio',
                    submitting: 'Invio in corso...',
                },
                topics: {
                    growth: 'Farmi trovare e contattare meglio online',
                    operations: 'Ridurre il lavoro manuale nei processi',
                    product: 'Costruire un prodotto o app web',
                    support: 'Supporto tecnico su un progetto esistente',
                },
                success: {
                    title: 'Messaggio ricevuto.',
                    body: 'Ti rispondo entro 24 ore. Se il progetto è urgente, usa il calendario qui sotto per fissare subito una call.',
                },
                errors: {
                    required: 'Campo obbligatorio',
                    emailInvalid: 'Inserisci un indirizzo email valido',
                    messageTooShort: 'Il messaggio è troppo corto (minimo 10 caratteri)',
                    generic:
                        'Si è verificato un errore. Riprova o scrivimi direttamente a info@francescocipolla.com.',
                },
            },
        },
    },
    en: {
        common: {
            nav: {
                about: 'About',
                experiences: 'Experience',
                projects: 'Projects',
                services: 'Services',
                contacts: 'Contacts',
                bookCall: 'Free call',
                resume: 'Resume',
                openMenu: 'Open menu',
                closeMenu: 'Close menu',
                switchLanguage: 'Switch language',
            },
            footer: {
                tagline:
                    'I build websites and digital products that help businesses get chosen, work better, and grow.',
                links: {
                    about: 'About',
                    experiences: 'Experience',
                    projects: 'Projects',
                    blog: 'Blog',
                    contacts: 'Contacts',
                    services: 'Services',
                },
                socials: {
                    linkedin: 'LinkedIn',
                    github: 'GitHub',
                    email: 'Email',
                },
                privacySettings: 'Privacy settings',
                rights: 'Built in Italy for businesses that want to grow online.',
            },
            cta: {
                book: 'Book a free call',
                bookMicrocopy: '30 minutes · no commitment · no surprise quotes',
                tellProject: 'Tell me about your project',
                project: 'View project',
                liveSite: 'Visit live site',
                caseStudy: 'See the project',
                backHome: 'Back to home',
                backProjects: 'Back to projects',
            },
        },
        metadata: {
            home: {
                title: 'Francesco Cipolla - Digital Product Partner',
                description:
                    'I help businesses turn websites, applications, and digital workflows into practical tools for growth.',
            },
            services: {
                title: 'Websites and digitalization for businesses - Francesco Cipolla',
                description:
                    'Digital consulting, business websites, web applications, and automation for turning visits, workflows, and ideas into measurable outcomes.',
            },
            about: {
                title: 'About - Francesco Cipolla',
                description:
                    'Digital product partner and senior engineer with experience across web products, streaming platforms, design, and business systems.',
            },
            projects: {
                title: 'Projects - Francesco Cipolla',
                description:
                    'A selection of websites, applications, and digital platforms built for companies, studios, and production products.',
            },
            contacts: {
                title: 'Contacts - Francesco Cipolla',
                description:
                    'Contact Francesco Cipolla or book a project discovery call for websites, applications, automation, and digital product work.',
            },
            blog: {
                title: 'Blog - Francesco Cipolla',
                description:
                    'Notes on digital product, frontend engineering, design, and technology.',
            },
        },
        home: {
            heroDisclaimer:
                'I build digital products, websites, and business systems with Next.js, React, and a practical focus on outcomes.',
            descriptions: [
                [{ text: 'digital product partner' }],
                [{ text: 'senior software engineer' }],
                [{ text: 'design enthusiast' }],
                [{ text: 'basketball passionate' }],
                [{ text: 'beginner kitesurfer' }],
            ],
            projectsTitle: 'freelance projects',
            contactsTitle: 'contacts',
            scheduleTitle: 'Book a project discovery call',
        },
        experiences: [
            {
                company: 'FIFA+',
                logo: '/companies/fifa.webp',
                position: 'Senior Front-end Engineer (Contractor)',
                period: 'Jun 2023 - Present',
                description:
                    'Development and maintenance of a React SPA for sports streaming, including core features such as the player.',
                techs: ['React', 'TypeScript', 'Storybook', 'Jest', 'Playwright'],
            },
            {
                company: 'Globant',
                logo: '/companies/globant.webp',
                position: 'Senior Web UI Developer',
                period: 'Aug 2023 - Present',
                description:
                    "After Globant acquired CHILI Tech's business division, I continue contributing to the same streaming products.",
            },
            {
                company: 'CHILI',
                logo: '/companies/chili.webp',
                position: 'Senior Front-end Engineer',
                period: 'Nov 2021 - Dec 2024',
                description:
                    "Developed and maintained the company's website and Smart TV app across Samsung, LG, Sony, and other devices.",
                techs: ['React', 'TypeScript', 'Jest', 'Bit.dev', 'RobotFramework'],
            },
            {
                company: 'Softlab S.p.A.',
                logo: '/companies/softlab.webp',
                position: 'Front-end Engineer',
                period: 'Nov 2017 - Nov 2021',
                description:
                    'Built enterprise applications for a major insurance group and served as frontend vice-team leader.',
                techs: ['React', 'TypeScript', 'Angular2+', 'Redux', 'Puppeteer'],
            },
        ],
        services: {
            hero: {
                eyebrow: 'Websites that bring clients',
                title: 'You do not need a prettier website. You need one that brings clients.',
                lead: 'If people find you online but do not quickly understand why they should choose you, every visit is a missed opportunity.',
                secondary:
                    'I design and build Websites, Apps, and AI Automations to help businesses get chosen, work better, and grow.',
            },
            proof: {
                eyebrow: 'On real products and clients',
                names: [
                    'FIFA+',
                    'CHILI',
                    'Talent Garden',
                    'Lombardini22',
                    'Groupama',
                    'Reclami Gas e Luce',
                    'Dpulses',
                    'DataHause',
                ],
                stats: [
                    { value: '8+', label: 'years on production web products' },
                    { value: '20+', label: 'web projects delivered' },
                    { value: 'IT/EN', label: 'work with Italian and international clients' },
                ],
            },
            profile: {
                eyebrow: 'About me',
                title: 'Digital partner for businesses that want to grow online.',
                description:
                    'I have spent 8+ years working on production web products, streaming platforms, business websites, and digital applications. I combine product thinking, interface care, and solid engineering to help companies turn ideas, workflows, and online presence into useful systems.',
                imageAlt: 'Francesco Cipolla, senior engineer and digital product partner',
                imageCaption: 'Francesco Cipolla / product, design, engineering',
            },
            serviceIntro: {
                eyebrow: 'Solutions',
                title: 'I start from the problem you recognise, not the technical solution.',
                description:
                    'I start from the business problem you can recognize immediately. Then we choose together the simplest digital piece to build value.',
                ctaLabel: 'Talk through your case',
                ctaHelperTitle: 'You don’t need to figure it out first.',
                ctaHelper: 'We’ll work out where to start together on a call.',
            },
            buckets: [
                {
                    title: 'Growth',
                    label: 'Convert better online',
                    plainLabel: 'Get contacted more easily',
                    situation:
                        'Your online presence exists, but it does not clearly explain what you do, who it is for, and why people should contact you — every visit becomes a missed opportunity.',
                    description:
                        'Websites, landing pages, and digital journeys that explain the value, build trust, and make it easier to contact you.',
                },
                {
                    title: 'Operations',
                    label: 'Reduce manual work',
                    plainLabel: 'Save operational time',
                    situation:
                        'Quotes, requests, data, and updates move through emails, spreadsheets, and messages instead of one reliable system — your team loses hours on work that could be automated.',
                    description:
                        'Internal apps, dashboards, integrations, and automation that connect tools and make processes easier to manage.',
                },
                {
                    title: 'Product',
                    label: 'Launch digital ideas',
                    plainLabel: 'Launch a digital idea',
                    situation:
                        'You know a portal, dashboard, or digital experience would help the business, but you need someone to turn it into a real product people can actually use.',
                    description:
                        'MVPs, customer portals, and web apps built with clear UX, solid engineering, and room to evolve.',
                },
                {
                    title: 'Support',
                    label: 'Improve what you already have',
                    plainLabel: 'Improve what you already have',
                    situation:
                        'You already have a site, an app, or a workflow, but it is slow, fragile, or no longer does what you need.',
                    description:
                        'Work on existing products: fixes, improvements, and new features without starting from scratch.',
                },
            ],
            capabilities: {
                eyebrow: 'What I build',
                title: 'From your first landing page to the app your customers use.',
                description:
                    'We pick the technical solution around your problem — these are the building blocks I work with.',
                items: [
                    {
                        key: 'websites',
                        name: 'Websites & Landing pages',
                        description: 'Fast, clear pages designed to turn visitors into contacts.',
                    },
                    {
                        key: 'webApps',
                        name: 'Web apps & Portals',
                        description:
                            'MVPs, customer portals, and private areas built to grow with you.',
                    },
                    {
                        key: 'mobile',
                        name: 'Cross-platform mobile apps',
                        description: 'One app for iOS and Android: one codebase, lower cost.',
                    },
                    {
                        key: 'ai',
                        name: 'AI automations',
                        description: 'Repetitive tasks automated where AI genuinely saves time.',
                    },
                ],
            },
            cases: {
                eyebrow: 'Selected cases',
                title: 'Public projects that show the method.',
                description:
                    'Each project starts from a different need: capturing leads, presenting a brand, publishing content, or making a technical offer clear.',
            },
            process: {
                eyebrow: 'Process',
                title: 'A simple path from idea to production.',
                steps: [
                    {
                        title: 'Discovery call',
                        description:
                            'I understand goals, constraints, audience, and the real problem before talking about a solution.',
                    },
                    {
                        title: 'Solution map',
                        description:
                            'We define priorities, content, features, and the first useful release.',
                    },
                    {
                        title: 'Iterative build',
                        description:
                            'I design and develop with frequent reviews, online previews, and clear technical decisions.',
                    },
                    {
                        title: 'Launch and improve',
                        description:
                            'We go live, measure the important actions, and decide what to optimize next.',
                    },
                ],
            },
            faq: {
                eyebrow: 'FAQ',
                title: 'Before the discovery call.',
                items: [
                    {
                        question: 'Do you only work on websites?',
                        answer: 'No. A website is often the starting point, but I can also work on web apps, dashboards, private areas, integrations, and automation.',
                    },
                    {
                        question: 'Can you help with UX and content structure?',
                        answer: 'Yes. I can help clarify flows, content hierarchy, and interfaces. If specialist visual direction is needed, we define that inside the project.',
                    },
                    {
                        question: 'How does the first call work?',
                        answer: 'We discuss the problem, current situation, goals, and first useful outcome. From there I prepare a proposal aligned with scope and priorities.',
                    },
                    {
                        question: 'Do we discuss budget on the call?',
                        answer: 'Yes, but without forcing predefined solutions. The goal is to understand the scope and propose the leanest path to value.',
                    },
                    {
                        question: 'Can you work with existing teams or agencies?',
                        answer: 'Yes. I can integrate into existing processes or directly handle the agreed digital parts.',
                    },
                ],
            },
            booking: {
                eyebrow: 'Next step',
                title: 'Book a project discovery call and let’s see what digital can unlock for your business.',
                description:
                    '30 minutes, no commitment. Bring the problem: website, workflow, idea, or project in progress.',
            },
        },
        projects: enProjects,
        projectPage: {
            overview: 'Overview',
            highlights: 'Highlights',
            problem: 'Problem',
            solution: 'Solution',
            outcome: 'Outcome',
            gallery: 'Gallery',
            galleryView: 'Format',
            galleryDesktop: 'Desktop',
            galleryMobile: 'Mobile',
            galleryPrevious: 'Previous media',
            galleryNext: 'Next media',
        },
        blog: {
            title: 'Blog',
            empty: 'No posts published yet.',
        },
        notFound: {
            title: 'lost?',
            label: '404',
        },
        consent: {
            title: 'Privacy and analytics',
            description:
                'I use Google Analytics only if you accept it, to understand which pages and actions are actually useful to visitors. You can reject it and use the site normally.',
            accept: 'Accept analytics',
            reject: 'Reject',
        },
        contact: {
            form: {
                eyebrow: 'Write',
                title: 'Tell me how I can help.',
                intro: "Fill in the form and I'll get back to you within 24 hours. If you'd rather talk straight away, use the calendar below.",
                fields: {
                    name: 'Name',
                    namePlaceholder: 'John Smith',
                    email: 'Email',
                    emailPlaceholder: 'john@company.com',
                    company: 'Company (optional)',
                    companyPlaceholder: 'Company name',
                    topic: 'What do you need?',
                    message: 'Message',
                    messagePlaceholder: 'Briefly describe your project or challenge...',
                    submit: 'Send message',
                    submitting: 'Sending...',
                },
                topics: {
                    growth: 'Get found and contacted more online',
                    operations: 'Reduce manual work in processes',
                    product: 'Build a product or web app',
                    support: 'Technical support on an existing project',
                },
                success: {
                    title: 'Message received.',
                    body: "I'll get back to you within 24 hours. If it's urgent, use the calendar below to book a call straight away.",
                },
                errors: {
                    required: 'This field is required',
                    emailInvalid: 'Please enter a valid email address',
                    messageTooShort: 'Message is too short (minimum 10 characters)',
                    generic:
                        'Something went wrong. Please try again or email me directly at info@francescocipolla.com.',
                },
            },
        },
    },
}

export function getLocalizedProjects(locale: Locale) {
    return siteContent[locale].projects
}

export function getLocalizedProject(locale: Locale, slug: string) {
    return getLocalizedProjects(locale).find((project) => project.slug === slug)
}

export function getProjectSlugs(locale: Locale) {
    return getLocalizedProjects(locale).map((project) => project.slug)
}

export function localizedPath(locale: Locale, path = '') {
    const normalized = path.startsWith('/') ? path : `/${path}`
    return `/${locale}${normalized === '/' ? '' : normalized}`
}

export function absoluteLocalizedUrl(locale: Locale, path = '') {
    return `${baseUrl}${localizedPath(locale, path)}`
}

export { baseUrl }
