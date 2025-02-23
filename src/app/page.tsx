'use client'
import React, { useRef } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import LandingHeroHandwriting from '@/components/LandingHeroHandwriting'
import { descriptions } from '@/app/constants'
import Contacts from '@/sections/Contacts'
import FreelanceProjects from '@/sections/FreelanceProjects'
import Experiences from '@/sections/Experiences'

export default function Portfolio() {
    const mainContainerRef = useRef<HTMLDivElement>(null)
    const handwritingRef = useRef<HTMLDivElement>(null)
    const cipoRef = useRef<HTMLHeadingElement>(null)
    const cLetterRef = useRef<HTMLSpanElement>(null)
    const heroSectionRef = useRef<HTMLElement>(null)
    const descriptionsSectionRef = useRef<HTMLElement>(null)
    const descriptionsRef = useRef<(HTMLParagraphElement | null)[]>([])
    const experienceRef = useRef<HTMLDivElement>(null)
    const freelanceProjectsRef = useRef<HTMLDivElement>(null)
    const contactsRef = useRef<HTMLDivElement>(null)

    // Main scroll progress for the entire page
    const { scrollYProgress } = useScroll({
        target: mainContainerRef,
        offset: ["start start", "end end"]
    })

    // Hero section specific scroll progress
    const { scrollYProgress: heroScrollProgress } = useScroll({
        target: heroSectionRef,
        offset: ["start start", "end start"]
    })

    // Add spring animation to the scroll progress for smooth control
    const smoothScrollProgress = useSpring(heroScrollProgress, {
        stiffness: 30,    // Lower stiffness for smoother movement
        damping: 15,      // Lower damping for more fluid motion
        mass: 1.2,        // Slightly more mass for more controlled inertia
        restDelta: 0.001  // Precision of final resting position
    })

    // Animation sequence timing:
    // 0-0.3: SVG path drawing
    // 0.3-0.45: Hold completed drawing
    // 0.45-0.6: Fade out handwriting
    // 0.6-0.8: Zoom in to "C"
    // 0.8-0.9: Fade out text

    // Handwriting animation timing
    const handwritingOpacityValue = useTransform(smoothScrollProgress,
        [0, 0.3, 0.45, 0.6],
        [1, 1, 1, 0]
    )

    // Spring config for individual animations
    const springConfig = {
        stiffness: 80,
        damping: 25,
        mass: 0.8,
        restDelta: 0.001
    }

    // Apply spring animation to handwriting opacity
    const handwritingOpacity = useSpring(handwritingOpacityValue, springConfig)

    // Text scale and position animation (delayed start)
    const scale = useTransform(smoothScrollProgress,
        [0.6, 0.75],
        [1, 44]
    )
    const xPosition = useTransform(smoothScrollProgress,
        [0.6, 0.75],
        [0, -1800]
    )
    const yPosition = useTransform(smoothScrollProgress,
        [0.6, 0.75],
        [0, -500]
    )
    const textOpacity = useTransform(smoothScrollProgress,
        [0.6, 0.75, 0.8],
        [1, 1, 0]
    )

    const springScale = useSpring(scale, springConfig)
    const springX = useSpring(xPosition, springConfig)
    const springY = useSpring(yPosition, springConfig)

    // Content fade in (delayed until after zoom)
    const contentOpacity = useTransform(smoothScrollProgress,
        [0.85, 0.95],
        [0, 1]
    )

    // Scroll indicator opacity
    const scrollIndicatorOpacity = useTransform(
        smoothScrollProgress,
        [0, 0.1, 0.95, 1],
        [1, 1, 1, 0]
    )

    // Hero section visibility
    const heroVisibility = useTransform(
        smoothScrollProgress,
        [0, 0.8, 0.801],
        ['visible', 'visible', 'hidden']
    )
    
    const heroPointerEvents = useTransform(
        smoothScrollProgress,
        [0, 0.8, 0.801],
        ['auto', 'auto', 'none']
    )

    return (
        <>
            <div ref={mainContainerRef} className="min-h-[300vh] bg-white text-black">
                <main className="relative">
                    {/* SCROLL DOWN LABEL */}
                    <motion.div
                        style={{ opacity: scrollIndicatorOpacity }}
                        className="fixed right-4 top-1/2 z-20"
                    >
                        <svg width="24" height="133" viewBox="0 0 24 133" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clip-path="url(#clip0_46_52)">
                                <path d="M13.4659 9.26136L13.0398 7.75568C13.2907 7.66098 13.5346 7.52131 13.7713 7.33665C14.0128 7.15672 14.2116 6.91051 14.3679 6.59801C14.5241 6.28551 14.6023 5.88542 14.6023 5.39773C14.6023 4.73011 14.4484 4.17377 14.1406 3.72869C13.8376 3.28835 13.4517 3.06818 12.983 3.06818C12.5663 3.06818 12.2372 3.2197 11.9957 3.52273C11.7543 3.82576 11.553 4.29924 11.392 4.94318L10.9943 6.5625C10.7576 7.53788 10.3954 8.26468 9.90767 8.7429C9.42472 9.22112 8.80208 9.46023 8.03977 9.46023C7.41477 9.46023 6.85606 9.2803 6.36364 8.92045C5.87121 8.56534 5.48295 8.06818 5.19886 7.42898C4.91477 6.78977 4.77273 6.0464 4.77273 5.19886C4.77273 4.08617 5.0142 3.16525 5.49716 2.43608C5.98011 1.70691 6.68561 1.24526 7.61364 1.05114L8.01136 2.64204C7.42424 2.79356 6.9839 3.08002 6.69034 3.50142C6.39678 3.92756 6.25 4.4839 6.25 5.17045C6.25 5.9517 6.41572 6.57197 6.74716 7.03125C7.08333 7.49526 7.4858 7.72727 7.95455 7.72727C8.33333 7.72727 8.65057 7.5947 8.90625 7.32954C9.16667 7.06439 9.3608 6.6572 9.48864 6.10795L9.91477 4.28977C10.1515 3.29072 10.5185 2.55682 11.0156 2.08807C11.5175 1.62405 12.1449 1.39204 12.8977 1.39204C13.5133 1.39205 14.0578 1.56487 14.5312 1.91051C15.0047 2.26089 15.3764 2.73674 15.6463 3.33807C15.9162 3.94413 16.0511 4.63068 16.0511 5.39773C16.0511 6.47727 15.8144 7.32481 15.3409 7.94034C14.8674 8.56061 14.2424 9.00095 13.4659 9.26136ZM4.77273 14.8151C4.77273 13.7924 5.0142 12.9117 5.49716 12.1731C5.98011 11.4344 6.64536 10.8663 7.4929 10.4685C8.34044 10.0708 9.30871 9.87195 10.3977 9.87195C11.5057 9.87195 12.4834 10.0755 13.331 10.4827C14.1832 10.8947 14.8485 11.4676 15.3267 12.2015C15.8097 12.9401 16.0511 13.8019 16.0511 14.7867C16.0511 15.5538 15.9091 16.2451 15.625 16.8606C15.3409 17.4761 14.9432 17.9804 14.4318 18.3734C13.9205 18.7664 13.3239 19.0102 12.642 19.1049L12.642 17.4288C13.1392 17.3009 13.5795 17.0168 13.9631 16.5765C14.3513 16.1409 14.5455 15.5538 14.5455 14.8151C14.5455 14.1617 14.375 13.5888 14.0341 13.0964C13.6979 12.6087 13.2221 12.2275 12.6065 11.9529C11.9957 11.683 11.2784 11.5481 10.4545 11.5481C9.61174 11.5481 8.87784 11.6807 8.25284 11.9458C7.62784 12.2157 7.14252 12.5945 6.79687 13.0822C6.45123 13.5746 6.27841 14.1522 6.27841 14.8151C6.27841 15.2507 6.35417 15.6461 6.50568 16.0012C6.6572 16.3563 6.875 16.657 7.15909 16.9032C7.44318 17.1494 7.78409 17.3246 8.18182 17.4288L8.18182 19.1049C7.53788 19.0102 6.95786 18.7758 6.44176 18.4018C5.9304 18.0325 5.5232 17.5424 5.22017 16.9316C4.92187 16.3255 4.77273 15.6201 4.77273 14.8151ZM5 19.9552L15.9091 19.9552L15.9091 21.5745L14.2614 21.5745L14.2614 21.6881C14.8011 21.887 15.2391 22.2469 15.5753 22.7677C15.9115 23.2885 16.0795 23.8756 16.0795 24.529C16.0795 24.6522 16.0772 24.806 16.0724 24.9907C16.0677 25.1754 16.0606 25.315 16.0511 25.4097L14.3466 25.4097C14.3608 25.3529 14.3821 25.2227 14.4105 25.0191C14.4437 24.8202 14.4602 24.6095 14.4602 24.387C14.4602 23.8567 14.349 23.3832 14.1264 22.9665C13.9086 22.5546 13.6056 22.2279 13.2173 21.9864C12.8338 21.7497 12.3958 21.6313 11.9034 21.6313L5 21.6313L5 19.9552ZM4.77273 29.8964C4.77273 28.9115 5.0071 28.0474 5.47585 27.304C5.9446 26.5654 6.60038 25.9878 7.44318 25.5711C8.28598 25.1592 9.27083 24.9532 10.3977 24.9532C11.5341 24.9532 12.526 25.1592 13.3736 25.5711C14.2211 25.9878 14.8793 26.5654 15.348 27.304C15.8168 28.0474 16.0511 28.9115 16.0511 29.8964C16.0511 30.8812 15.8168 31.743 15.348 32.4816C14.8793 33.225 14.2211 33.8026 13.3736 34.2146C12.526 34.6312 11.5341 34.8396 10.3977 34.8396C9.27083 34.8396 8.28598 34.6312 7.44318 34.2146C6.60038 33.8026 5.9446 33.225 5.47585 32.4816C5.0071 31.743 4.77273 30.8812 4.77273 29.8964ZM6.27841 29.8964C6.27841 30.6445 6.47017 31.26 6.85369 31.743C7.23721 32.2259 7.74148 32.5834 8.36648 32.8154C8.99148 33.0474 9.66856 33.1634 10.3977 33.1634C11.1269 33.1634 11.8063 33.0474 12.4361 32.8154C13.0658 32.5834 13.5748 32.2259 13.9631 31.743C14.3513 31.26 14.5455 30.6445 14.5455 29.8964C14.5455 29.1483 14.3513 28.5327 13.9631 28.0498C13.5748 27.5668 13.0658 27.2094 12.4361 26.9773C11.8063 26.7453 11.1269 26.6293 10.3977 26.6293C9.66856 26.6293 8.99148 26.7453 8.36648 26.9773C7.74148 27.2094 7.23721 27.5668 6.85369 28.0498C6.47017 28.5327 6.27841 29.1483 6.27841 29.8964ZM19.5455 37.4743L5 37.4743L5 35.7982L19.5455 35.7982L19.5455 37.4743ZM19.5455 40.6204L5 40.6204L5 38.9442L19.5455 38.9442L19.5455 40.6204ZM4.77273 50.2347C4.77273 49.3256 5.00237 48.523 5.46165 47.827C5.92566 47.131 6.57907 46.5865 7.42187 46.1935C8.26941 45.8005 9.27083 45.604 10.4261 45.604C11.572 45.604 12.5663 45.8005 13.4091 46.1935C14.2519 46.5865 14.9029 47.1333 15.3622 47.8341C15.8215 48.5348 16.0511 49.3445 16.0511 50.2631C16.0511 50.9733 15.9328 51.5344 15.696 51.9463C15.464 52.363 15.1989 52.6802 14.9006 52.898C14.607 53.1205 14.3655 53.2934 14.1761 53.4165L14.1761 53.5585L19.5455 53.5585L19.5455 55.2347L5 55.2347L5 53.6153L6.67613 53.6153L6.67613 53.4165C6.47727 53.2934 6.22632 53.1182 5.92329 52.8909C5.625 52.6636 5.35748 52.3393 5.12074 51.9179C4.88873 51.4965 4.77273 50.9354 4.77273 50.2347ZM6.27841 50.4619C6.27841 51.1343 6.4536 51.7025 6.80398 52.1665C7.15909 52.6305 7.64915 52.9832 8.27415 53.2247C8.90388 53.4662 9.63068 53.5869 10.4545 53.5869C11.2689 53.5869 11.9815 53.4686 12.5923 53.2318C13.2079 52.9951 13.6861 52.6447 14.027 52.1807C14.3726 51.7167 14.5455 51.1437 14.5455 50.4619C14.5455 49.7517 14.3632 49.1598 13.9986 48.6864C13.6387 48.2176 13.1487 47.8649 12.5284 47.6281C11.9129 47.3961 11.2216 47.2801 10.4545 47.2801C9.67803 47.2801 8.97254 47.3985 8.33807 47.6352C7.70833 47.8767 7.20644 48.2318 6.83238 48.7006C6.46307 49.1741 6.27841 49.7612 6.27841 50.4619ZM4.77272 61.369C4.77272 60.3842 5.0071 59.5201 5.47585 58.7767C5.9446 58.0381 6.60038 57.4604 7.44318 57.0438C8.28598 56.6318 9.27083 56.4259 10.3977 56.4259C11.5341 56.4259 12.526 56.6318 13.3736 57.0438C14.2211 57.4604 14.8793 58.0381 15.348 58.7767C15.8168 59.5201 16.0511 60.3842 16.0511 61.369C16.0511 62.3539 15.8168 63.2156 15.348 63.9543C14.8793 64.6976 14.2211 65.2753 13.3736 65.6872C12.526 66.1039 11.5341 66.3122 10.3977 66.3122C9.27083 66.3122 8.28598 66.1039 7.44318 65.6872C6.60038 65.2753 5.9446 64.6976 5.47585 63.9543C5.0071 63.2156 4.77272 62.3539 4.77272 61.369ZM6.27841 61.369C6.27841 62.1171 6.47017 62.7327 6.85369 63.2156C7.23721 63.6986 7.74147 64.0561 8.36647 64.2881C8.99147 64.5201 9.66856 64.6361 10.3977 64.6361C11.1269 64.6361 11.8063 64.5201 12.4361 64.2881C13.0658 64.0561 13.5748 63.6986 13.9631 63.2156C14.3513 62.7327 14.5455 62.1171 14.5455 61.369C14.5455 60.6209 14.3513 60.0054 13.9631 59.5224C13.5748 59.0395 13.0658 58.682 12.4361 58.45C11.8063 58.218 11.1269 58.102 10.3977 58.102C9.66856 58.102 8.99147 58.218 8.36647 58.45C7.74147 58.682 7.23721 59.0395 6.85369 59.5224C6.47017 60.0054 6.27841 60.6209 6.27841 61.369ZM5 69.3713L15.9091 66.0474L15.9091 67.8088L7.55682 70.1668L7.55682 70.2804L15.9091 72.6099L15.9091 74.3997L7.58522 76.7009L7.58522 76.8145L15.9091 79.1724L15.9091 80.9338L5 77.6099L5 75.9622L13.3807 73.5759L13.3807 73.4054L5 71.019L5 69.3713ZM11.5625 83.2259L5 83.2259L5 81.5497L15.9091 81.5497L15.9091 83.169L14.2045 83.169L14.2045 83.3111C14.7585 83.5668 15.2036 83.955 15.5398 84.4759C15.8807 84.9967 16.0511 85.669 16.0511 86.4929C16.0511 87.2315 15.8996 87.8778 15.5966 88.4318C15.2983 88.9858 14.8437 89.4167 14.233 89.7244C13.6269 90.0322 12.8598 90.1861 11.9318 90.1861L5 90.1861L5 88.5099L11.8182 88.5099C12.6752 88.5099 13.3428 88.2874 13.821 87.8423C14.304 87.3973 14.5455 86.7865 14.5455 86.0099C14.5455 85.4749 14.4294 84.9967 14.1974 84.5753C13.9654 84.1586 13.6269 83.8295 13.1818 83.5881C12.7367 83.3466 12.197 83.2259 11.5625 83.2259Z" fill="black" />
                                <path d="M10.6569 132.707C11.0474 133.098 11.6806 133.098 12.0711 132.707L18.4351 126.343C18.8256 125.953 18.8256 125.319 18.4351 124.929C18.0445 124.538 17.4114 124.538 17.0209 124.929L11.364 130.586L5.70711 124.929C5.31658 124.538 4.68342 124.538 4.29289 124.929C3.90237 125.319 3.90237 125.953 4.29289 126.343L10.6569 132.707ZM10.364 100V132H12.364V100H10.364Z" fill="black" />
                            </g>
                            <defs>
                                <clipPath id="clip0_46_52">
                                    <rect width="24" height="133" fill="white" />
                                </clipPath>
                            </defs>
                        </svg>
                    </motion.div>

                    <motion.section
                        ref={heroSectionRef}
                        className="h-screen w-full flex items-center justify-center overflow-hidden"
                        style={{
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            right: 0,
                            visibility: heroVisibility,
                            pointerEvents: heroPointerEvents
                        }}
                    >
                        <motion.h1
                            ref={cipoRef}
                            style={{
                                scale: springScale,
                                x: springX,
                                y: springY,
                                opacity: textOpacity
                            }}
                            className="text-6xl md:text-8xl lg:text-9xl xl:text-[16.5rem] tracking-[-0.06em] text-nowrap font-black text-center leading-none relative z-10"
                        >
                            I&apos;m <span className="relative">
                                <span ref={cLetterRef}>C</span>ipo
                            </span>
                        </motion.h1>
                        <motion.div
                            ref={handwritingRef}
                            id="handwriting-container"
                            style={{ opacity: handwritingOpacity }}
                            className="fixed top-0 w-full h-full z-20"
                        >
                            <LandingHeroHandwriting scrollYProgress={smoothScrollProgress} />
                        </motion.div>
                    </motion.section>

                    <motion.section
                        ref={descriptionsSectionRef}
                        style={{ opacity: contentOpacity }}
                        className="px-8 mt-[100vh]"
                    >
                        <div className="max-w-[90vw] mx-auto">
                            <div className="mb-32">
                                {descriptions.map((text, index) => (
                                    <motion.p
                                        key={index}
                                        ref={el => {
                                            if (descriptionsRef.current) {
                                                descriptionsRef.current[index] = el
                                            }
                                        }}
                                        initial={{ opacity: 0, y: 50 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true, margin: "-100px" }}
                                        transition={{ duration: 0.8, delay: index * 0.2 }}
                                        className="text-[2.5rem] md:text-6xl lg:text-7xl xl:text-8xl leading-[1.2] tracking-tighter font-semibold"
                                        dangerouslySetInnerHTML={{ __html: text }}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* SPACER */}
                        <div className="h-[50vh]" />

                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true, margin: "-20%" }}
                            transition={{ duration: 0.8 }}
                        >
                            <Experiences ref={experienceRef} />
                        </motion.div>

                        {/* SPACER */}
                        <div className="h-[20vh]" />

                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            <FreelanceProjects ref={freelanceProjectsRef} />
                        </motion.div>

                        {/* SPACER */}
                        <div className="h-[20vh]" />

                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            <Contacts ref={contactsRef} />
                        </motion.div>
                    </motion.section>
                </main>
            </div>
        </>
    )
}
