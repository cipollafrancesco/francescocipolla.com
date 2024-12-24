'use client'

import {useLayoutEffect, useRef} from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {ArrowUpRight, Calendar} from 'lucide-react'
import {gsap} from 'gsap'
import {ScrollTrigger} from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const descriptions = [
    'senior software engineer',
    'co-founder of ISAAC',
    'design enthusiast',
    'nice fonts addicted',
    'basketball passionate',
    'beginner kitesurfer',
]

const experiences = [
    {
        company: 'Tech Innovators Inc.',
        logo: '/placeholder.svg?height=50&width=50',
        position: 'Senior Software Engineer',
        period: 'Jan 2020 - Present',
        description: 'Led development of scalable web applications using React and Node.js. Implemented CI/CD pipelines and mentored junior developers.'
    },
    {
        company: 'DataDriven Solutions',
        logo: '/placeholder.svg?height=50&width=50',
        position: 'Full Stack Developer',
        period: 'Mar 2017 - Dec 2019',
        description: 'Developed and maintained multiple client-facing applications. Worked with React, Django, and PostgreSQL to create robust data visualization tools.'
    },
    {
        company: 'StartUp Ventures',
        logo: '/placeholder.svg?height=50&width=50',
        position: 'Junior Developer',
        period: 'Jun 2015 - Feb 2017',
        description: 'Assisted in the development of mobile applications using React Native. Collaborated with the design team to implement user-friendly interfaces.'
    }
]

const projects = [
    {
        id: 1,
        title: 'E-commerce Site',
        image: '/placeholder.svg?height=300&width=400',
        url: 'https://example-ecommerce.com',
        technologies: ['React', 'Node.js', 'MongoDB', 'Stripe']
    },
    {
        id: 2,
        title: 'Blog Platform',
        image: '/placeholder.svg?height=300&width=400',
        url: 'https://example-blog.com',
        technologies: ['Next.js', 'GraphQL', 'PostgreSQL', 'Tailwind CSS']
    },
    {
        id: 3,
        title: 'Portfolio Site',
        image: '/placeholder.svg?height=300&width=400',
        url: 'https://example-portfolio.com',
        technologies: ['React', 'Gatsby', 'Styled Components', 'Netlify CMS']
    },
    {
        id: 4,
        title: 'Restaurant Website',
        image: '/placeholder.svg?height=300&width=400',
        url: 'https://example-restaurant.com',
        technologies: ['Vue.js', 'Nuxt.js', 'Firebase', 'Vuetify']
    },
    {
        id: 5,
        title: 'Fitness App',
        image: '/placeholder.svg?height=300&width=400',
        url: 'https://example-fitness.com',
        technologies: ['React Native', 'Redux', 'Express.js', 'MongoDB']
    },
    {
        id: 6,
        title: 'Travel Blog',
        image: '/placeholder.svg?height=300&width=400',
        url: 'https://example-travel.com',
        technologies: ['WordPress', 'PHP', 'MySQL', 'Custom Theme']
    },
]

export default function Portfolio() {
    const francescoRef = useRef(null)
    const cipoRef = useRef(null)
    const llaRef = useRef(null)
    const cLetterRef = useRef(null)
    const heroSectionRef = useRef(null)
    const contentSectionRef = useRef(null)
    const descriptionsRef = useRef<HTMLParagraphElement | null>(null)
    const experienceRef = useRef(null)
    const projectsRef = useRef(null)

    useLayoutEffect(() => {
        gsap.set(contentSectionRef.current, {opacity: 0})

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: heroSectionRef.current,
                start: 'top top',
                end: '+=300%',
                scrub: 1,
                pin: true,
                anticipatePin: 1,
            }
        })

        tl.to([francescoRef.current, llaRef.current], {opacity: 1, duration: 0.3})
            .to(cipoRef.current, {scale: 50, x: 20, duration: 1}, '+=0.2')
            .to([francescoRef.current, llaRef.current], {opacity: 0, duration: 0.3}, '<')
            .to(cLetterRef.current, {scale: 50, opacity: 0, duration: 1}, '-=0.5')
            .to(heroSectionRef.current, {opacity: 0, duration: 0.5}, '-=0.25')
            .to(contentSectionRef.current, {opacity: 1, duration: 0.5})

        descriptionsRef.current.forEach((desc) => {
            gsap.from(desc, {
                scrollTrigger: {
                    trigger: desc,
                    start: 'top bottom-=100',
                    end: 'top center',
                    scrub: 1
                },
                opacity: 0,
                y: 50,
                duration: 1
            })
        })

        gsap.from(experienceRef.current.children, {
            scrollTrigger: {
                trigger: experienceRef.current,
                start: 'top 80%'
            },
            opacity: 0,
            y: 50,
            duration: 0.8,
            stagger: 0.2,
            ease: 'power3.out'
        })

        gsap.from(projectsRef.current.children, {
            scrollTrigger: {
                trigger: projectsRef.current,
                start: 'top 80%'
            },
            opacity: 0,
            y: 50,
            duration: 0.8,
            stagger: 0.2,
            ease: 'power3.out'
        })

    }, [])

    return (
        <div className="min-h-[300vh] bg-white text-black">
            <main className="relative">

                <section ref={heroSectionRef}
                         className="h-screen w-full flex items-center justify-center overflow-hidden">
                    <h1 ref={cipoRef}
                        className="text-6xl md:text-8xl lg:text-9xl xl:text-[20rem] tracking-[-0.06em] text-nowrap font-black text-center leading-none relative z-10">
                        I&apos;m <span ref={cLetterRef}>C</span>ipo
                    </h1>
                    <span ref={francescoRef}
                          className="absolute left-[40%] top-1/4 text-6xl font-bold tracking-tighter opacity-0 z-10">
            Francesco
          </span>
                    <span ref={llaRef}
                          className="absolute right-20 bottom-1/3 text-6xl font-bold tracking-tighter opacity-0 z-10">
            lla
          </span>
                </section>

                <div ref={contentSectionRef} className="px-8 opacity-0">
                    <div className="max-w-[90vw] mx-auto">
                        <div className="mb-32">
                            {descriptions.map((text, index) => (
                                <p
                                    key={index}
                                    ref={el => descriptionsRef.current[index] = el}
                                    className="text-[2.5rem] md:text-6xl lg:text-7xl xl:text-8xl leading-[1.2] tracking-tighter font-semibold"
                                >
                                    {text}
                                </p>
                            ))}
                        </div>

                        <section className="py-20">
                            <div className="max-w-4xl mx-auto">
                                <h2 className="text-4xl font-bold text-center mb-12">Experience</h2>
                                <div ref={experienceRef} className="space-y-8">
                                    {experiences.map((exp, index) => (
                                        <div key={index}
                                             className="flex items-start border-l-2 border-gray-200 pl-4 ml-2">
                                            <Image
                                                src={exp.logo}
                                                alt={`${exp.company} logo`}
                                                width={50}
                                                height={50}
                                                className="mr-4 rounded-full"
                                            />
                                            <div>
                                                <h3 className="text-xl font-semibold">{exp.company}</h3>
                                                <p className="text-gray-600 mb-2">{exp.position}</p>
                                                <p className="text-sm text-gray-500 mb-2 flex items-center">
                                                    <Calendar className="w-4 h-4 mr-2"/>
                                                    {exp.period}
                                                </p>
                                                <p className="text-gray-700">{exp.description}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </section>

                        <section id="projects" className="py-20 border-t border-gray-200">
                            <h2 className="text-4xl font-bold text-center mb-12">Client Projects</h2>
                            <div ref={projectsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {projects.map((project) => (
                                    <div key={project.id} className="group">
                                        <div className="relative overflow-hidden rounded-lg border border-gray-200">
                                            <Image
                                                src={project.image}
                                                alt={project.title}
                                                width={400}
                                                height={300}
                                                className="w-full h-64 object-cover transition duration-300 group-hover:scale-110"
                                            />
                                            <div
                                                className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition duration-300 flex items-center justify-center">
                                                <Link
                                                    href={project.url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-white text-lg font-semibold flex items-center"
                                                >
                                                    Visit Site <ArrowUpRight className="ml-2 h-5 w-5"/>
                                                </Link>
                                            </div>
                                        </div>
                                        <h3 className="mt-4 text-xl font-semibold">{project.title}</h3>
                                        <p className="mt-2 text-sm text-gray-600">{project.technologies.join(' • ')}</p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>
                </div>
            </main>
        </div>
    )
}
