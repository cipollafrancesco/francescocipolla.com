import Link from 'next/link'

export default function NotFound() {
    return (
        <main className="min-h-screen flex flex-col items-center justify-center px-8 text-center">
            <p className="text-sm tracking-widest uppercase text-gray-400 mb-4">404</p>
            <h1 className="text-[80px] md:text-[140px] xl:text-[200px] font-black tracking-tighter leading-none mb-8">
                lost?
            </h1>
            <Link
                href="/"
                className="text-lg tracking-tighter underline underline-offset-4 hover:opacity-60 transition-opacity"
            >
                back to home
            </Link>
        </main>
    )
}
