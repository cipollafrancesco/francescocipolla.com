import { IProject, Description } from '@/app/types'

export const descriptions: Description[] = [
    [{text: 'senior software engineer'}],
    [{text: 'co-founder of '}, {text: 'ISAAC', color: '#8B5CF6'}],
    [{text: 'design enthusiast'}],
    [{text: 'nice fonts addicted'}],
    [{text: 'basketball passionate'}],
    [{text: 'beginner kitesurfer'}],
]

export const experiences = [
    {
        company: 'FIFA+',
        logo: '/companies/fifa.png',
        position: 'Senior Front-end Engineer (Contractor)',
        period: 'Jun 2023 - Present',
        description: 'Responsible for developing and maintaining a single-page application (SPA) built with React and it\'s core features such as the Player.',
        techs: ['React', 'TypeScript', 'Storybook', 'Jest', 'Playwright'],
    },
    {
        company: 'Globant',
        logo: '/companies/globant.png',
        position: 'Senior Web UI Developer',
        period: 'Aug 2023 - Present',
        description: 'Following the acquisition of CHILI Tech\'s business division by Globant, I persistently contribute to the same projects I previously managed (the streaming platforms CHILI and FIFA+).'
    },
    {
        company: 'CHILI',
        logo: '/companies/chili.png',
        position: 'Senior Front-end Engineer',
        period: 'Nov 2021 - Dec 2024',
        description: 'Developed and Maintained the streaming company’s Website (desktop and mobile) and Smart TV App over several devices (Samsung, LG, Sony, etc).',
        techs: ['React', 'TypeScript', 'Jest', 'Bit.dev', 'RobotFramework'],
    },
    {
        company: 'Softlab S.p.A.',
        logo: '/companies/softlab.png',
        position: 'Front-end Engineer',
        period: 'Nov 2017 - Nov 2021',
        description: `Developed enterprise web applications for a major insurance corporation\nPlayed a key role as a Frontend Vice-Team Leader`,
        techs: ['React', 'TypeScript', 'Angular2+', 'Redux', 'Puppeteer'],
    }
]

export const projects: IProject[] = [
    {
        id: 1,
        title: 'Che Designer Sei? - Talent Garden',
        image: '/projects/chedesignersei.webp',
        mobileImage: '/projects/chedesignersei_mobile.webp',
        url: 'https://chedesignersei.talentgarden.com/',
        technologies: ['Next.js', 'Tailwind CSS', 'Vercel', 'HubSpot CMS']
    },
    {
        id: 2,
        title: 'Hub Lombardini22 - Company Website',
        image: '/projects/hublombardini22.webp',
        mobileImage: '/projects/hublombardini22_mobile.webp',
        url: 'https://hublombardini22.com/',
        technologies: ['Next.js', 'Matter.js', 'Tailwind CSS', 'Vercel', 'Strapi'],
    },
    {
        id: 3,
        title: 'Dpulses - Company Website',
        image: '/projects/dpulses.webp',
        mobileImage: '/projects/dpulses_mobile.webp',
        url: 'https://www.dpulses.com/',
        technologies: ['Next.js', 'Tailwind CSS', 'Vercel'],
    },
    {
        id: 4,
        title: 'DataHause - Company Website',
        image: '/projects/datahause.webp',
        mobileImage: '/projects/datahause_mobile.webp',
        url: 'https://www.datahause.com/',
        technologies: ['Next.js', 'Tailwind CSS', 'Vercel'],
    }
    // {
    //     id: 5,
    //     title: '',
    //     image: '/projects/etc.webp',
    //     mobileImage: '/projects/etc_mobile.webp',
    //     url: '',
    //     technologies: [],
    // },
]
