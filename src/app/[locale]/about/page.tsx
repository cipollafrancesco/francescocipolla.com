'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { ArrowLeft } from 'lucide-react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { EffectCards } from 'swiper/modules'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'

import 'swiper/css'
import 'swiper/css/effect-cards'

const travelImages = [
    { id: 1, image: '/placeholder.svg?height=400&width=300' },
    { id: 2, image: '/placeholder.svg?height=400&width=300' },
    { id: 3, image: '/placeholder.svg?height=400&width=300' },
    { id: 4, image: '/placeholder.svg?height=400&width=300' },
    { id: 5, image: '/placeholder.svg?height=400&width=300' },
]

const bookCovers = [
    { cover: '/placeholder.svg?height=300&width=225' },
    { cover: '/placeholder.svg?height=300&width=225' },
    { cover: '/placeholder.svg?height=300&width=225' },
]

const channelImages = [
    { image: '/placeholder.svg?height=50&width=50' },
    { image: '/placeholder.svg?height=50&width=50' },
    { image: '/placeholder.svg?height=50&width=50' },
]

type PassionItem = { id: number; text: string; completed: boolean }
type EducationItem = { degree: string; institution: string; year: string; description: string }
type TravelItem = { id: number; place: string }
type BookItem = { title: string; author: string }
type ChannelItem = { name: string; url: string }

export default function AboutPage() {
    const t = useTranslations('about')

    const [passions, setPassions] = useState<PassionItem[]>(
        () => t.raw('passions') as PassionItem[]
    )

    const educationData = t.raw('education') as EducationItem[]
    const travelsData = (t.raw('travels') as TravelItem[]).map((item, i) => ({
        ...item,
        image: travelImages[i]?.image ?? '/placeholder.svg?height=400&width=300',
    }))
    const favoriteBooks = (t.raw('books') as BookItem[]).map((book, i) => ({
        ...book,
        cover: bookCovers[i]?.cover ?? '/placeholder.svg?height=300&width=225',
    }))
    const favoriteChannels = (t.raw('channels') as ChannelItem[]).map((ch, i) => ({
        ...ch,
        image: channelImages[i]?.image ?? '/placeholder.svg?height=50&width=50',
    }))

    const togglePassionCompletion = (id: number) => {
        setPassions(
            passions.map((passion) =>
                passion.id === id ? { ...passion, completed: !passion.completed } : passion
            )
        )
    }

    useEffect(() => {
        // Ensures Swiper initialises correctly on the client
    }, [])

    return (
        <div className="mt-[88px] min-h-screen bg-white text-black">
            <div className="fixed inset-0 z-[-1] opacity-30">
                <svg width="100%" height="100%">
                    <defs>
                        <filter id="goo">
                            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
                            <feColorMatrix
                                in="blur"
                                mode="matrix"
                                values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"
                                result="goo"
                            />
                        </filter>
                    </defs>
                    <g filter="url(#goo)">
                        <circle cx="10%" cy="10%" r="80" fill="#f3f4f6" />
                        <circle cx="60%" cy="30%" r="120" fill="#e5e7eb" />
                        <circle cx="90%" cy="80%" r="100" fill="#d1d5db" />
                        <circle cx="30%" cy="70%" r="70" fill="#9ca3af" />
                    </g>
                </svg>
            </div>
            <main className="container relative mx-auto px-4">
                <Link
                    href="/"
                    className="absolute left-4 top-4 rounded-full bg-black p-2 text-white transition duration-300 hover:bg-gray-800"
                >
                    <ArrowLeft className="h-6 w-6" />
                </Link>
                <section className="py-20">
                    <div className="mx-auto max-w-4xl">
                        <h1 className="mb-8 text-center text-4xl font-bold">{t('heading')}</h1>
                        <div className="mb-12 flex flex-col items-center gap-8 md:flex-row">
                            <Image
                                src="/placeholder.svg?height=300&width=300"
                                alt="Francesco Cipolla"
                                width={300}
                                height={300}
                                className="h-64 w-64 rounded-full border-2 border-black object-cover"
                            />
                            <div>
                                <p className="mb-4 text-lg text-gray-700">{t('intro1')}</p>
                                <p className="mb-4 text-lg text-gray-700">{t('intro2')}</p>
                            </div>
                        </div>

                        <h2 className="mb-6 text-3xl font-bold">{t('sections.education')}</h2>
                        <div className="mb-12 space-y-6">
                            {educationData.map((edu, index) => (
                                <div key={index} className="border-l-2 border-gray-200 pl-4">
                                    <h3 className="text-xl font-semibold">{edu.degree}</h3>
                                    <p className="text-gray-600">{edu.institution}</p>
                                    <p className="text-gray-500">{edu.year}</p>
                                    <p className="mt-2 text-gray-700">{edu.description}</p>
                                </div>
                            ))}
                        </div>

                        <h2 className="mb-6 text-3xl font-bold">{t('sections.passions')}</h2>
                        <div className="mb-12">
                            <ul className="space-y-2">
                                {passions.map((passion) => (
                                    <li
                                        key={passion.id}
                                        className="flex cursor-pointer items-center"
                                        onClick={() => togglePassionCompletion(passion.id)}
                                    >
                                        <input
                                            type="checkbox"
                                            checked={passion.completed}
                                            onChange={() => {}}
                                            className="mr-2"
                                        />
                                        <span
                                            className={
                                                passion.completed
                                                    ? 'text-gray-500 line-through'
                                                    : ''
                                            }
                                        >
                                            {passion.text}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <h2 className="mb-6 text-3xl font-bold">{t('sections.travels')}</h2>
                        <div className="mb-12">
                            <Swiper
                                effect={'cards'}
                                grabCursor={true}
                                modules={[EffectCards]}
                                className="h-[400px] w-[300px]"
                            >
                                {travelsData.map((travel) => (
                                    <SwiperSlide
                                        key={travel.id}
                                        className="rounded-lg bg-white shadow-xl"
                                    >
                                        <Image
                                            src={travel.image}
                                            alt={travel.place}
                                            width={300}
                                            height={400}
                                            className="h-full w-full rounded-lg object-cover"
                                        />
                                        <div className="absolute bottom-0 left-0 right-0 rounded-b-lg bg-black bg-opacity-50 p-4 text-white">
                                            <p className="text-lg font-semibold">{travel.place}</p>
                                        </div>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>

                        <h2 className="mb-6 text-3xl font-bold">{t('sections.books')}</h2>
                        <div className="mb-12 grid grid-cols-1 gap-8 md:grid-cols-3">
                            {favoriteBooks.map((book, index) => (
                                <div key={index} className="flex flex-col items-center">
                                    <Image
                                        src={book.cover}
                                        alt={book.title}
                                        width={225}
                                        height={300}
                                        className="mb-4 shadow-lg"
                                    />
                                    <h3 className="text-center text-lg font-semibold">
                                        {book.title}
                                    </h3>
                                    <p className="text-center text-gray-600">{book.author}</p>
                                </div>
                            ))}
                        </div>

                        <h2 className="mb-6 text-3xl font-bold">{t('sections.channels')}</h2>
                        <div className="mb-12 grid grid-cols-1 gap-4 md:grid-cols-3">
                            {favoriteChannels.map((channel, index) => (
                                <a
                                    key={index}
                                    href={channel.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center rounded-lg bg-gray-100 p-4 transition duration-300 hover:bg-gray-200"
                                >
                                    <Image
                                        src={channel.image}
                                        alt={channel.name}
                                        width={50}
                                        height={50}
                                        className="mr-4 rounded-full"
                                    />
                                    <span className="text-lg font-medium">{channel.name}</span>
                                </a>
                            ))}
                        </div>
                    </div>
                </section>
            </main>
        </div>
    )
}
