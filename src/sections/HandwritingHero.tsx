'use client'
import React, {useLayoutEffect, useRef} from 'react'
import Francesco from '@/components/handwritings/Francesco'
import Underline from '@/components/handwritings/Underline'
import Meaning from '@/components/handwritings/Meaning'
import Lla from '@/components/handwritings/Lla'
import Onion from '@/components/handwritings/Onion'
import gsap from 'gsap'

type IHeroProps = unknown
const HandwritingHero: React.FC<IHeroProps> = () => {

    const cipoRef = useRef(null)
    const cLetterRef = useRef(null)
    const heroSectionRef = useRef(null)

    useLayoutEffect(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: heroSectionRef.current,
                start: 'top top',
                end: '+=150%',
                scrub: 1,
                pin: true,
                anticipatePin: 1,
            }
        })

        tl
            .fromTo(`#hero-section path`,
                {strokeDasharray: 2000, strokeDashoffset: 2000},
                {strokeDashoffset: 0, stagger: 0.25, ease: 'sine.inOut'}
            )
            .to(['#hero-section'], {opacity: 1, duration: 0.3})
            // .to("#hero-section", {opacity: 0, duration: 0})
            .to(cipoRef.current, {scale: 44, transformOrigin: '53% 50%', duration: 1}, '+=0')
    }, [])

    return (
        <main className="h-[500vh] w-full">
            <section ref={heroSectionRef} id="hero-section"
                     className="h-screen w-full flex items-center justify-center overflow-hidden">
                <div className="sentence-container relative">
                    <h1 ref={cipoRef}
                        className="relative text-6xl md:text-[13rem] lg:text-[15rem] xl:text-[16.5rem] tracking-[-0.06em] text-nowrap font-black text-center leading-none z-10">
                        I&apos;m <span className="relative">
                <Francesco className="absolute -top-14 left-0 md:w-[350px] xl:w-auto"/>
                <span ref={cLetterRef}>C</span>ipo
                  <Underline className="absolute hidden lg:block -right-20 w-full"/>
                  <Meaning className="absolute hidden lg:block mt-12 -right-5 md:w-[350px] xl:w-auto"/>
            </span>
                        <Lla className="absolute bottom-0 -right-24 md:w-[90px] xl:w-auto"/>
                    </h1>
                </div>
                <Onion className="absolute left-10 bottom-0 hidden lg:block lg:w-[200px] xl:w-auto"/>
            </section>
        </main>
    )
}

export default HandwritingHero
