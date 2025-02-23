'use client'

import {useEffect, useState} from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {ArrowLeft} from 'lucide-react'
import {Swiper, SwiperSlide} from 'swiper/react'
import {EffectCards} from 'swiper/modules'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/effect-cards'

const educationData = [
  {
    degree: "Master's Degree in Computer Science",
    institution: "University of Technology",
    year: "2015",
    description: "Specialized in Software Engineering and Machine Learning"
  },
  {
    degree: "Bachelor's Degree in Computer Engineering",
    institution: "State University",
    year: "2013",
    description: "Focus on Web Technologies and Database Management"
  }
]

const favoriteBooks = [
  {
    title: "Clean Code",
    author: "Robert C. Martin",
    cover: "/placeholder.svg?height=300&width=225"
  },
  {
    title: "Design Patterns",
    author: "Erich Gamma et al.",
    cover: "/placeholder.svg?height=300&width=225"
  },
  {
    title: "The Pragmatic Programmer",
    author: "Andrew Hunt, David Thomas",
    cover: "/placeholder.svg?height=300&width=225"
  }
]

const favoriteChannels = [
  {
    name: "Fireship",
    url: "https://www.youtube.com/c/Fireship",
    image: "/placeholder.svg?height=50&width=50"
  },
  {
    name: "Traversy Media",
    url: "https://www.youtube.com/user/TechGuyWeb",
    image: "/placeholder.svg?height=50&width=50"
  },
  {
    name: "The Net Ninja",
    url: "https://www.youtube.com/channel/UCW5YeuERMmlnqo4oq8vwUpg",
    image: "/placeholder.svg?height=50&width=50"
  }
]

const passionsData = [
  { id: 1, text: "Learn kitesurfing", completed: false },
  { id: 2, text: "Master React 18", completed: true },
  { id: 3, text: "Build a successful SaaS product", completed: false },
  { id: 4, text: "Run a marathon", completed: false },
  { id: 5, text: "Contribute to open-source projects", completed: true },
]

const travelsData = [
  { id: 1, place: "Bali, Indonesia", image: "/placeholder.svg?height=400&width=300" },
  { id: 2, place: "Santorini, Greece", image: "/placeholder.svg?height=400&width=300" },
  { id: 3, place: "Tokyo, Japan", image: "/placeholder.svg?height=400&width=300" },
  { id: 4, place: "New York City, USA", image: "/placeholder.svg?height=400&width=300" },
  { id: 5, place: "Cape Town, South Africa", image: "/placeholder.svg?height=400&width=300" },
]

export default function AboutPage() {
  const [passions, setPassions] = useState(passionsData)

  const togglePassionCompletion = (id: number) => {
    setPassions(passions.map(passion =>
      passion.id === id ? { ...passion, completed: !passion.completed } : passion
    ))
  }

  useEffect(() => {
    // This effect is needed to properly initialize Swiper on the client-side
  }, [])

  return (
    <div className="min-h-screen bg-white text-black mt-[88px]">
      <div className="fixed inset-0 z-[-1] opacity-30">
        <svg width="100%" height="100%">
          <defs>
            <filter id="goo">
              <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
              <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="goo" />
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
      <main className="container mx-auto px-4 relative">
        <Link
          href="/"
          className="absolute top-4 left-4 bg-black text-white p-2 rounded-full hover:bg-gray-800 transition duration-300"
        >
          <ArrowLeft className="h-6 w-6" />
        </Link>
        <section className="py-20">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold text-center mb-8">About Me</h1>
            <div className="flex flex-col md:flex-row items-center gap-8 mb-12">
              <Image
                src="/placeholder.svg?height=300&width=300"
                alt="Francesco Cipolla"
                width={300}
                height={300}
                className="rounded-full w-64 h-64 object-cover border-2 border-black"
              />
              <div>
                <p className="text-lg text-gray-700 mb-4">
                  As a Senior Frontend Engineer at FIFA+, I bring years of experience in developing robust, scalable applications for the sports streaming industry. My expertise spans both frontend and backend technologies, allowing me to create comprehensive solutions that meet and exceed client expectations.
                </p>
                <p className="text-lg text-gray-700 mb-4">
                  I&apos;m passionate about clean code, performance optimization, and staying up-to-date with the latest industry trends. My goal is to deliver high-quality software that not only solves complex problems but also provides an excellent user experience. Outside of work, I&apos;m a basketball enthusiast and a beginner kitesurfer, always seeking new challenges both in and out of the office.
                </p>
              </div>
            </div>

            <h2 className="text-3xl font-bold mb-6">Education</h2>
            <div className="space-y-6 mb-12">
              {educationData.map((edu, index) => (
                <div key={index} className="border-l-2 border-gray-200 pl-4">
                  <h3 className="text-xl font-semibold">{edu.degree}</h3>
                  <p className="text-gray-600">{edu.institution}</p>
                  <p className="text-gray-500">{edu.year}</p>
                  <p className="text-gray-700 mt-2">{edu.description}</p>
                </div>
              ))}
            </div>

            <h2 className="text-3xl font-bold mb-6">Passions & Goals</h2>
            <div className="mb-12">
              <ul className="space-y-2">
                {passions.map(passion => (
                  <li
                    key={passion.id}
                    className="flex items-center cursor-pointer"
                    onClick={() => togglePassionCompletion(passion.id)}
                  >
                    <input
                      type="checkbox"
                      checked={passion.completed}
                      onChange={() => {}}
                      className="mr-2"
                    />
                    <span className={passion.completed ? 'line-through text-gray-500' : ''}>
                      {passion.text}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <h2 className="text-3xl font-bold mb-6">Travels</h2>
            <div className="mb-12">
              <Swiper
                effect={'cards'}
                grabCursor={true}
                modules={[EffectCards]}
                className="w-[300px] h-[400px]"
              >
                {travelsData.map((travel) => (
                  <SwiperSlide key={travel.id} className="bg-white rounded-lg shadow-xl">
                    <Image
                      src={travel.image}
                      alt={travel.place}
                      width={300}
                      height={400}
                      className="w-full h-full object-cover rounded-lg"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-4 rounded-b-lg">
                      <p className="text-lg font-semibold">{travel.place}</p>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

            <h2 className="text-3xl font-bold mb-6">Favorite Books</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              {favoriteBooks.map((book, index) => (
                <div key={index} className="flex flex-col items-center">
                  <Image
                    src={book.cover}
                    alt={book.title}
                    width={225}
                    height={300}
                    className="mb-4 shadow-lg"
                  />
                  <h3 className="text-lg font-semibold text-center">{book.title}</h3>
                  <p className="text-gray-600 text-center">{book.author}</p>
                </div>
              ))}
            </div>

            <h2 className="text-3xl font-bold mb-6">Favorite YouTube Channels</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
              {favoriteChannels.map((channel, index) => (
                <a
                  key={index}
                  href={channel.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center p-4 bg-gray-100 rounded-lg hover:bg-gray-200 transition duration-300"
                >
                  <Image
                    src={channel.image}
                    alt={channel.name}
                    width={50}
                    height={50}
                    className="rounded-full mr-4"
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

