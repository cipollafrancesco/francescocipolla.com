import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'About — Francesco Cipolla',
    description: 'Senior Frontend Engineer, ISAAC co-founder, design enthusiast, basketball player, and beginner kitesurfer. Learn more about Francesco.',
    openGraph: {
        title: 'About — Francesco Cipolla',
        description: 'Senior Frontend Engineer, ISAAC co-founder, design enthusiast, basketball player, and beginner kitesurfer.',
        url: 'https://francescocipolla.com/about',
    },
    alternates: {
        canonical: 'https://francescocipolla.com/about',
    },
}

export default function AboutLayout({ children }: { children: React.ReactNode }) {
    return children
}
