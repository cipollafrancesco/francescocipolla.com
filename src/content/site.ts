import type { Metadata } from 'next'
import type { Locale } from '@/i18n/config'

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
        pains: { title: string; description: string }[]
        serviceIntro: {
            eyebrow: string
            title: string
            description: string
            situationLabel: string
            buildLabel: string
            ctaLabel: string
            ctaHelper: string
        }
        buckets: {
            title: string
            label: string
            plainLabel: string
            situation: string
            description: string
            bullets: string[]
        }[]
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
            'Il team puo pubblicare contenuti in autonomia mantenendo una presenza digitale distintiva e performante.',
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
            'Il sito marketing di DataHause, societa di data analytics e business intelligence, progettato per comunicare credibilita tecnica in modo accessibile.',
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
                bookCall: 'Prenota una consulenza',
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
                book: 'Prenota una consulenza',
                project: 'Guarda il progetto',
                liveSite: 'Visita il sito',
                caseStudy: 'Caso studio',
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
                [{ text: 'co-founder di ' }, { text: 'ISAAC', color: '#8B5CF6' }],
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
                    'Sviluppo e manutenzione di una SPA React per lo streaming sportivo, incluse funzionalita core come il player.',
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
                eyebrow: 'Siti web che portano clienti',
                title: 'Non ti serve un sito piu bello. Ti serve un sito che porti clienti.',
                lead: 'Se le persone ti trovano online ma non capiscono subito perche sceglierti, ogni visita diventa un’occasione persa. Progetto e sviluppo siti, applicazioni e automazioni che trasformano attenzione in contatti e lavoro.',
                secondary:
                    'Partiamo da cio che blocca la crescita: messaggio, percorso, dati, processi. Poi costruiamo il sistema digitale piu semplice che puo generare valore.',
            },
            proof: {
                eyebrow: 'Esperienza su prodotti e progetti reali',
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
                    {
                        value: 'TV/Web',
                        label: 'esperienza su piattaforme streaming e siti aziendali',
                    },
                    { value: 'IT/EN', label: 'lavoro con clienti italiani e internazionali' },
                ],
            },
            profile: {
                eyebrow: 'Chi sono',
                title: 'Ingegnere Informatico e partner digitale per progetti web orientati al business.',
                description:
                    'Lavoro da oltre 8 anni su prodotti web in produzione, piattaforme streaming, siti aziendali e applicazioni digitali. Porto insieme visione di prodotto, cura dell’interfaccia e solidita tecnica per aiutare le aziende a trasformare idee, processi e presenza online in sistemi utili.',
                imageAlt: 'Francesco Cipolla, ingegnere informatico e digital product partner',
                imageCaption: 'Francesco Cipolla / prodotto, design, sviluppo',
            },
            pains: [
                {
                    title: 'Il sito non genera richieste',
                    description:
                        'La tua presenza online esiste, ma non spiega abbastanza bene cosa fai, per chi lo fai e perche contattarti.',
                },
                {
                    title: 'Il lavoro e troppo manuale',
                    description:
                        'Preventivi, richieste, dati e aggiornamenti passano da email, fogli e messaggi invece che da un sistema unico.',
                },
                {
                    title: 'Le idee restano ferme',
                    description:
                        'Sai che un portale, una dashboard o una nuova esperienza digitale aiuterebbe il business, ma manca chi la trasformi in prodotto.',
                },
            ],
            serviceIntro: {
                eyebrow: 'Tre modi per lavorare insieme',
                title: 'Scegli da dove partire: contatti, tempo o una nuova idea.',
                description:
                    'Partiamo dal problema che riconosci subito nel tuo business. Poi scegliamo il pezzo digitale piu semplice da costruire per generare valore.',
                situationLabel: 'Quando serve',
                buildLabel: 'Cosa possiamo costruire',
                ctaLabel: 'Parliamo del tuo caso',
                ctaHelper:
                    'Non devi scegliere la soluzione tecnica: basta partire dal problema piu urgente.',
            },
            buckets: [
                {
                    title: 'Growth',
                    label: 'Convertire meglio online',
                    plainLabel: 'Farti contattare meglio',
                    situation:
                        'Le persone arrivano sul sito, ma non capiscono subito perche scegliere te o come fare il passo successivo.',
                    description:
                        'Siti web, landing page e percorsi digitali che spiegano il valore, aumentano la fiducia e rendono piu facile contattarti.',
                    bullets: [
                        'Siti aziendali e landing page',
                        'Messaggi chiari e pulsanti di contatto',
                        'Form collegati agli strumenti che gia usi',
                        'SEO tecnico, velocita e accessibilita',
                    ],
                },
                {
                    title: 'Operations',
                    label: 'Ridurre lavoro manuale',
                    plainLabel: 'Risparmiare tempo operativo',
                    situation:
                        'Il team perde ore tra fogli, email, copia-incolla e strumenti che non parlano tra loro.',
                    description:
                        'Applicazioni interne, dashboard, integrazioni e automazioni per collegare strumenti e rendere i processi piu fluidi.',
                    bullets: [
                        'Dashboard e portali per il team',
                        'Database e pannelli di gestione',
                        'Automazioni tra strumenti esistenti',
                        'Flussi AI pratici dove fanno risparmiare tempo',
                    ],
                },
                {
                    title: 'Product',
                    label: 'Lanciare idee digitali',
                    plainLabel: "Lanciare un'idea digitale",
                    situation:
                        "Hai un'idea per un portale, una web app o un servizio digitale, ma serve trasformarla in qualcosa che le persone possano usare.",
                    description:
                        'MVP, portali clienti e web app costruiti con attenzione a UX, solidita tecnica e possibilita di evolvere nel tempo.',
                    bullets: [
                        'MVP e applicazioni web',
                        'Portali clienti o aree riservate',
                        'Prototipi e flussi facili da usare',
                        'Frontend, backend e messa online',
                    ],
                },
            ],
            cases: {
                eyebrow: 'Casi selezionati',
                title: 'Progetti pubblici che mostrano il metodo.',
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
                            'Capisco obiettivi, vincoli, pubblico e problema reale prima di parlare di soluzione.',
                    },
                    {
                        title: 'Mappa della soluzione',
                        description:
                            'Definiamo priorita, contenuti, funzionalita e primo rilascio utile.',
                    },
                    {
                        title: 'Build iterativa',
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
                        answer: 'No. Il sito e spesso il punto di partenza, ma posso lavorare anche su applicazioni web, dashboard, aree riservate, integrazioni e automazioni.',
                    },
                    {
                        question: 'Puoi seguire anche UX e struttura dei contenuti?',
                        answer: 'Si. Posso aiutarti a chiarire flussi, gerarchia dei contenuti e interfacce. Se serve una direzione visual specialistica, la definiamo nel progetto.',
                    },
                    {
                        question: 'Come funziona la consulenza iniziale?',
                        answer: 'Parliamo del problema, dello stato attuale, degli obiettivi e del primo risultato utile. Da li preparo una proposta coerente con scope e priorita.',
                    },
                    {
                        question: 'Parliamo di budget nella call?',
                        answer: 'Si, ma senza forzare soluzioni preconfezionate. L’obiettivo e capire il perimetro e proporre il percorso piu snello per arrivare a valore.',
                    },
                    {
                        question: 'Puoi lavorare con team o agenzie gia esistenti?',
                        answer: 'Si. Posso integrarmi in processi esistenti oppure gestire direttamente le parti digitali concordate.',
                    },
                ],
            },
            booking: {
                eyebrow: 'Prossimo passo',
                title: 'Prenota una consulenza e capiamo cosa puo sbloccare il digitale per la tua azienda.',
                description:
                    '30 minuti, senza impegno. Portami il problema: sito, processo, idea o progetto in corso.',
            },
        },
        projects: itProjects,
        projectPage: {
            overview: 'Panoramica',
            highlights: 'Punti chiave',
            problem: 'Problema',
            solution: 'Soluzione',
            outcome: 'Risultato',
            gallery: 'Altre immagini',
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
    },
    en: {
        common: {
            nav: {
                about: 'About',
                experiences: 'Experience',
                projects: 'Projects',
                services: 'Services',
                contacts: 'Contacts',
                bookCall: 'Book a call',
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
                book: 'Book a project discovery call',
                project: 'View project',
                liveSite: 'Visit live site',
                caseStudy: 'Case study',
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
                [{ text: 'co-founder of ' }, { text: 'ISAAC', color: '#8B5CF6' }],
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
                lead: 'If people find you online but do not quickly understand why they should choose you, every visit is a missed opportunity. I design and build websites, apps, and automation that turn attention into contacts and work.',
                secondary:
                    'We start from what blocks growth: message, journey, data, workflows. Then we build the simplest digital system that can create value.',
            },
            proof: {
                eyebrow: 'Experience across real products and projects',
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
                    {
                        value: 'TV/Web',
                        label: 'experience across streaming platforms and business websites',
                    },
                    { value: 'IT/EN', label: 'work with Italian and international clients' },
                ],
            },
            profile: {
                eyebrow: 'About me',
                title: 'Senior engineer and digital partner for business-oriented web projects.',
                description:
                    'I have spent 8+ years working on production web products, streaming platforms, business websites, and digital applications. I combine product thinking, interface care, and solid engineering to help companies turn ideas, workflows, and online presence into useful systems.',
                imageAlt: 'Francesco Cipolla, senior engineer and digital product partner',
                imageCaption: 'Francesco Cipolla / product, design, engineering',
            },
            pains: [
                {
                    title: 'The website does not generate enquiries',
                    description:
                        'Your online presence exists, but it does not clearly explain what you do, who it is for, and why people should contact you.',
                },
                {
                    title: 'Too much work is manual',
                    description:
                        'Quotes, requests, data, and updates move through emails, spreadsheets, and messages instead of one reliable system.',
                },
                {
                    title: 'Digital ideas stay stuck',
                    description:
                        'You know a portal, dashboard, or digital experience would help the business, but you need someone to turn it into a real product.',
                },
            ],
            serviceIntro: {
                eyebrow: 'Three ways to work together',
                title: 'Choose where to start: contacts, time, or a new idea.',
                description:
                    'We start from the business problem you can recognize immediately. Then we choose the simplest digital piece to build value.',
                situationLabel: 'When it helps',
                buildLabel: 'What we can build',
                ctaLabel: 'Talk through your case',
                ctaHelper:
                    'You do not need to choose the technical solution: start from the most urgent problem.',
            },
            buckets: [
                {
                    title: 'Growth',
                    label: 'Convert better online',
                    plainLabel: 'Get contacted more easily',
                    situation:
                        'People reach your site, but they do not quickly understand why to choose you or how to take the next step.',
                    description:
                        'Websites, landing pages, and digital journeys that explain the value, build trust, and make it easier to contact you.',
                    bullets: [
                        'Business websites and landing pages',
                        'Clear messaging and contact buttons',
                        'Forms connected to tools you already use',
                        'Technical SEO, speed, and accessibility',
                    ],
                },
                {
                    title: 'Operations',
                    label: 'Reduce manual work',
                    plainLabel: 'Save operational time',
                    situation:
                        'Your team loses hours across spreadsheets, email, copy-paste work, and tools that do not talk to each other.',
                    description:
                        'Internal apps, dashboards, integrations, and automation that connect tools and make processes easier to manage.',
                    bullets: [
                        'Dashboards and team portals',
                        'Databases and admin panels',
                        'Automation across existing tools',
                        'Practical AI flows where they save time',
                    ],
                },
                {
                    title: 'Product',
                    label: 'Launch digital ideas',
                    plainLabel: 'Launch a digital idea',
                    situation:
                        'You have an idea for a portal, web app, or digital service, but it needs to become something people can actually use.',
                    description:
                        'MVPs, customer portals, and web apps built with clear UX, solid engineering, and room to evolve.',
                    bullets: [
                        'MVPs and web applications',
                        'Customer portals and private areas',
                        'Prototypes and easy-to-use flows',
                        'Frontend, backend, and launch',
                    ],
                },
            ],
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
            gallery: 'More images',
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
