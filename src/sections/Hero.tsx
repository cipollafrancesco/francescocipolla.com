'use client'
import React, {useRef} from 'react'

type IHeroProps = unknown
const Hero: React.FC<IHeroProps> = () => {

    const cipoRef = useRef(null)
    const cLetterRef = useRef(null)
    const heroSectionRef = useRef(null)

    return (
        <main className="h-[500vh] w-full">
            <section ref={heroSectionRef} id="hero-section"
                     className="h-screen w-full flex items-center justify-center overflow-hidden">
                <div className="sentence-container relative">
                    <h1 ref={cipoRef}
                        className="relative text-8xl sm:text-[10rem] md:text-[13rem] lg:text-[15rem] xl:text-[16.5rem] tracking-[-0.06em] text-nowrap font-black text-center leading-none z-10">
                        I&apos;m <span className="relative">
                <span className="absolute -top-7 left-0 font-semibold text-3xl lg:text-6xl tracking-tighter">
                Francesco
                </span>
                <span ref={cLetterRef}>C</span>ipo
            </span>
                        <span
                            className="absolute -bottom-8 right-0 lg:bottom-0 lg:-right-20 font-semibold text-3xl lg:text-6xl tracking-tighter">
                            lla
                        </span>
                    </h1>
                </div>
            </section>
        </main>
    )
}

export default Hero
