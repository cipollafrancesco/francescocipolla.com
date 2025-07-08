import Header from '@/components/Header'
import React from 'react'
import Link from 'next/link'

export default function RootLayout({children}: {
    children: React.ReactNode
}) {
    return (
        <>
            <Link href="/" className="block top-5 left-4 fixed z-[60] lg:hidden font-extrabold text-2xl mr-auto">cipo.</Link>
            <Header position="static"/>
            {children}
        </>
    )
}
