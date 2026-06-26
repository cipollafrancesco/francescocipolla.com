import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Check } from 'lucide-react'
import CalEmbed from '@/components/CalEmbed'

export const metadata: Metadata = {
    title: 'Services — Francesco Cipolla',
    description:
        "Freelance frontend engineering services: web apps, design systems, performance optimisation, and consulting. Let's build something great.",
    openGraph: {
        title: 'Services — Francesco Cipolla',
        description:
            'Freelance frontend engineering: web apps, design systems, performance, consulting.',
        url: 'https://francescocipolla.com/services',
    },
    alternates: {
        canonical: 'https://francescocipolla.com/services',
    },
}

const services = [
    {
        title: 'Frontend Architecture',
        description:
            'I design and build scalable React and Next.js applications from the ground up — component systems, state management, routing, and API integration. Clean, maintainable code that grows with your product.',
        bullets: [
            'React / Next.js / TypeScript',
            'Component & design-system setup',
            'API & CMS integration',
            'CI/CD pipeline configuration',
        ],
    },
    {
        title: 'Performance Optimisation',
        description:
            'Slow sites cost conversions. I audit your Core Web Vitals, identify bottlenecks, and ship targeted fixes — image pipelines, code splitting, server-side rendering, and edge delivery.',
        bullets: [
            'Core Web Vitals audit & fix',
            'Bundle analysis & code splitting',
            'Image & font optimisation',
            'Server-side & edge rendering',
        ],
    },
    {
        title: 'Design-to-Code',
        description:
            'I turn Figma (or any design file) into pixel-perfect, fully responsive interfaces — without losing the design intent. I work closely with designers and am comfortable leading the handoff process.',
        bullets: [
            'Figma → production-quality code',
            'Responsive at every breakpoint',
            'Tailwind CSS & CSS Modules',
            'Motion & interaction design',
        ],
    },
    {
        title: 'Technical Consulting',
        description:
            'Need a second opinion before a big architectural decision, a codebase review, or guidance on tooling choices? I offer focused consulting sessions to help teams move faster with more confidence.',
        bullets: [
            'Architecture & tech-stack review',
            'Code quality audit',
            'Tooling & dependency strategy',
            'Team mentorship & pairing',
        ],
    },
]

const process = [
    {
        step: '01',
        title: 'Discovery call',
        description:
            'We map out your goals, constraints, and timeline in a free 30-minute intro call.',
    },
    {
        step: '02',
        title: 'Proposal',
        description:
            'I send a clear scope, timeline, and fixed or time-based pricing — no surprises.',
    },
    {
        step: '03',
        title: 'Build',
        description:
            "Regular check-ins, async updates, and a staging environment so you're never in the dark.",
    },
    {
        step: '04',
        title: 'Launch & handoff',
        description:
            'Clean handoff with documentation, test coverage, and optional retainer support.',
    },
]

const clients = [
    {
        type: 'Startups',
        description: 'Move fast and ship a polished product that scales when you do.',
    },
    {
        type: 'Agencies',
        description:
            'I integrate into your team as a senior IC for overloaded sprints or specialist work.',
    },
    {
        type: 'Scale-ups',
        description: 'Refactor legacy codebases, improve DX, and unblock your engineering team.',
    },
    {
        type: 'Brands',
        description: 'Marketing sites and campaign microsites that load fast and look great.',
    },
]

export default function ServicesPage() {
    return (
        <div className="mt-[88px] min-h-screen bg-white text-black">
            <main id="main-content">
                {/* ── Hero ───────────────────────────────────────────────── */}
                <section className="mx-auto max-w-5xl px-6 pb-32 pt-20">
                    <p className="mb-6 text-sm uppercase tracking-widest text-gray-400">
                        Freelance services
                    </p>
                    <h1 className="mb-8 text-5xl font-extrabold leading-none tracking-tighter md:text-7xl xl:text-8xl">
                        Let&apos;s build
                        <br />
                        something
                        <br />
                        <span className="font-semibold italic">great.</span>
                    </h1>
                    <p className="mb-10 max-w-xl text-lg leading-relaxed text-gray-600 md:text-xl">
                        I&apos;m a Senior Frontend Engineer with 8+ years of experience shipping
                        production-grade web applications for streaming platforms, architecture
                        firms, and digital studios. Available for freelance projects.
                    </p>
                    <a
                        href="#book"
                        className="inline-flex items-center gap-2 rounded-full bg-black px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-gray-800"
                    >
                        Book a free intro call <ArrowRight className="h-4 w-4" />
                    </a>
                </section>

                {/* ── Services grid ──────────────────────────────────────── */}
                <section className="border-t border-gray-100 py-24">
                    <div className="mx-auto max-w-5xl px-6">
                        <h2 className="mb-16 text-3xl font-bold tracking-tight">What I offer</h2>
                        <div className="grid gap-12 md:grid-cols-2">
                            {services.map((svc) => (
                                <div
                                    key={svc.title}
                                    className="rounded-2xl border border-gray-100 p-8 transition-[border-color,box-shadow] duration-300 hover:border-gray-300 hover:shadow-sm"
                                >
                                    <h3 className="mb-3 text-xl font-bold">{svc.title}</h3>
                                    <p className="mb-6 text-sm leading-relaxed text-gray-600">
                                        {svc.description}
                                    </p>
                                    <ul className="space-y-2">
                                        {svc.bullets.map((b) => (
                                            <li
                                                key={b}
                                                className="flex items-center gap-2 text-sm text-gray-700"
                                            >
                                                <Check className="h-3.5 w-3.5 shrink-0 text-gray-400" />
                                                {b}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ── Who I work with ────────────────────────────────────── */}
                <section className="border-t border-gray-100 bg-gray-50 py-24">
                    <div className="mx-auto max-w-5xl px-6">
                        <h2 className="mb-16 text-3xl font-bold tracking-tight">Who I work with</h2>
                        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                            {clients.map((c) => (
                                <div key={c.type}>
                                    <p className="mb-2 text-lg font-bold">{c.type}</p>
                                    <p className="text-sm leading-relaxed text-gray-600">
                                        {c.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ── Process ────────────────────────────────────────────── */}
                <section className="border-t border-gray-100 py-24">
                    <div className="mx-auto max-w-5xl px-6">
                        <h2 className="mb-16 text-3xl font-bold tracking-tight">How it works</h2>
                        <div className="grid gap-8 md:grid-cols-4">
                            {process.map((p) => (
                                <div key={p.step}>
                                    <span className="text-4xl font-extrabold text-gray-100">
                                        {p.step}
                                    </span>
                                    <h3 className="mb-2 mt-2 font-bold">{p.title}</h3>
                                    <p className="text-sm leading-relaxed text-gray-600">
                                        {p.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ── Work samples ───────────────────────────────────────── */}
                <section className="border-t border-gray-100 bg-gray-50 py-24">
                    <div className="mx-auto flex max-w-5xl flex-col justify-between gap-8 px-6 md:flex-row md:items-center">
                        <div>
                            <h2 className="mb-4 text-3xl font-bold tracking-tight">See my work</h2>
                            <p className="max-w-md text-gray-600">
                                Case studies from recent freelance projects — streaming platforms,
                                architecture firms, and digital agencies.
                            </p>
                        </div>
                        <Link
                            href="/#projects"
                            className="inline-flex shrink-0 items-center gap-2 rounded-full border border-black px-6 py-3 text-sm font-medium transition-colors hover:bg-black hover:text-white"
                        >
                            View projects <ArrowRight className="h-4 w-4" />
                        </Link>
                    </div>
                </section>

                {/* ── Book a call ────────────────────────────────────────── */}
                <section id="book" className="border-t border-gray-100 py-24">
                    <div className="mx-auto max-w-5xl px-6">
                        <h2 className="mb-4 text-3xl font-bold tracking-tight">
                            Book a free intro call
                        </h2>
                        <p className="mb-12 max-w-md text-gray-600">
                            30 minutes. No commitment. We&apos;ll talk about your project and see if
                            we&apos;re a good fit.
                        </p>
                        <CalEmbed calLink="francescocipolla/free-intro-call-30-minutes" />
                    </div>
                </section>
            </main>
        </div>
    )
}
