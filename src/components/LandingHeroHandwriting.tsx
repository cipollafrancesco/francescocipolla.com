'use client'
import React from 'react'
import {motion, useTransform, MotionValue, SVGMotionProps} from 'framer-motion'

interface Props {
    scrollYProgress: MotionValue<number>
}

const usePathProgress = (scrollYProgress: MotionValue<number>, index: number, totalPaths: number) => {
    const baseProgress = useTransform(
        scrollYProgress,
        [0, 0.4],
        [0, 1]
    )

    const segmentSize = 1 / totalPaths
    const startAt = index * segmentSize
    const endAt = startAt + segmentSize * 1.5 // Overlap with next path by 50%
    
    return useTransform(
        baseProgress,
        [startAt, endAt],
        [0, 1],
        { clamp: true }
    )
}

type PathProps = SVGMotionProps<SVGPathElement> & {
    d: string;
    className: string;
    index: number;
    totalPaths: number;
    scrollYProgress: MotionValue<number>;
}

const AnimatedPath = ({ d, className, index, totalPaths, scrollYProgress, ...props }: PathProps) => {
    const pathLength = usePathProgress(scrollYProgress, index, totalPaths)
    return (
        <motion.path
            initial={{ pathLength: 0 }}
            style={{
                pathLength,
                strokeDasharray: 1,
                strokeDashoffset: 0,
                opacity: pathLength
            }}
            className={className}
            d={d}
            {...props}
        />
    )
}

const LandingHeroHandwriting = ({ scrollYProgress }: Props) => {
    const totalPaths = 44

    return (
        <svg
            version="1.1"
            id="Layer_1"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            x="0px"
            y="0px"
            width="100%"
            height="100%"
            viewBox="0 0 1920 1080"
            xmlSpace="preserve"
        >
            <style type="text/css">{`
.st0{fill:none;stroke:#000000;stroke-width:10;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;}
.st1{fill:none;stroke:#000000;stroke-width:8;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;}
.st2{fill:none;stroke:#000000;stroke-width:8;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;}
            `}</style>
            <g id="Francesco">
                <AnimatedPath
                    index={0}
                    totalPaths={totalPaths}
                    scrollYProgress={scrollYProgress}
                    className="st0"
                    d="M918.73,316.5c3.36,13.21,6.71,26.41,10.07,39.62c-6.08-19.87-12.16-39.74-18.24-59.61
		c-0.34-1.11-0.68-2.32-0.31-3.42c0.44-1.3,1.75-2.08,2.96-2.73c11.38-6.07,23.58-10.59,36.17-13.38c1.14,0.79,0.94,2.86-0.34,3.42"
                />
                <AnimatedPath
                    index={1}
                    totalPaths={totalPaths}
                    scrollYProgress={scrollYProgress}
                    className="st0"
                    d="M909.82,327c10.58-4.76,21.55-8.64,32.77-11.6"/>
                <AnimatedPath
                    index={2}
                    totalPaths={totalPaths}
                    scrollYProgress={scrollYProgress}
                    className="st0"
                    d="M958.82,333.75c-0.08,9.84,0.52,19.69,1.81,29.45c-0.78-8.26-1.55-16.51-2.33-24.77
		c-1.2-12.81-1.27-28.21,9.34-35.48c3.39-2.32,9.04-2.84,10.76,0.9c0.54,1.17,0.54,2.52,0.43,3.81
		c-0.86,10.11-7.42,18.67-11.61,27.9c-0.93,2.05-1.76,4.25-1.53,6.49c0.5,4.79,5.57,7.73,10.28,8.72s9.78,0.91,13.98,3.27"/>
                <AnimatedPath
                    index={3}
                    totalPaths={totalPaths}
                    scrollYProgress={scrollYProgress}
                    className="st0"
                    d="M1001.01,321.31c1.29,12.57,2.57,25.14,3.86,37.71c-2.4-19.36-4.66-39.8,3.04-57.73
		c10.01,15.64,18.44,32.28,25.12,49.6c0.47,1.21,1.27,2.66,2.57,2.54c1.29-0.12,0.53-2.81-0.31-1.82"/>
                <AnimatedPath
                    index={4}
                    totalPaths={totalPaths}
                    scrollYProgress={scrollYProgress}
                    className="st0"
                    d="M1002.92,340.65c7.59-2.3,15.18-4.6,22.77-6.9"/>
                <AnimatedPath
                    index={5}
                    totalPaths={totalPaths}
                    scrollYProgress={scrollYProgress}
                    className="st0"
                    d="M1052.61,315.81c-0.24,12.3-0.48,24.59-0.72,36.89c0.85-13.31,1.1-26.65,0.75-39.98
		c6.29,12.42,16.1,23.04,27.99,30.28c2.97,1.81,6.19,3.45,9.66,3.66c3.47,0.21,7.25-1.32,8.77-4.45c1.41-2.91,0.61-6.36-0.22-9.48
		c-3.74-14.14-7.47-28.28-11.21-42.42"/>
                <AnimatedPath
                    index={6}
                    totalPaths={totalPaths}
                    scrollYProgress={scrollYProgress}
                    className="st0"
                    d="M1131.48,307.94c-4.94,3.57-9.96,7.23-13.57,12.14c-3.61,4.91-5.64,11.38-3.84,17.21
		c2.06,6.67,8.98,11.18,15.96,11.49c6.98,0.31,13.78-3.05,18.74-7.97"/>
                <AnimatedPath
                    index={7}
                    totalPaths={totalPaths}
                    scrollYProgress={scrollYProgress}
                    className="st0"
                    d="M1158.21,313.3c-0.9,5.77-1.8,11.65-0.9,17.42s3.92,11.51,9.08,14.24c3.17,1.67,6.88,2.08,10.45,1.81
		c7.76-0.58,15.23-4.35,20.31-10.25"/>
                <AnimatedPath
                    index={8}
                    totalPaths={totalPaths}
                    scrollYProgress={scrollYProgress}
                    className="st0"
                    d="M1150.61,328.23c8.74-2.99,17.48-5.98,26.22-8.97"/>
                <AnimatedPath
                    index={9}
                    totalPaths={totalPaths}
                    scrollYProgress={scrollYProgress}
                    className="st0"
                    d="M1148.62,308.37c10.72-5.44,22.44-8.91,34.39-10.19"/>
                <AnimatedPath
                    index={10}
                    totalPaths={totalPaths}
                    scrollYProgress={scrollYProgress}
                    className="st0"
                    d="M1219.04,301.46c-5.33,3.92-9.76,9.06-12.86,14.9c8.73-0.06,17.46,2.25,25.01,6.61
		c3.28,1.9,6.51,4.39,7.79,7.96c1.88,5.27-1.15,11.13-5.22,14.98c-8.26,7.81-21.25,10.15-31.72,5.71c-1.98-0.84-4.02-2.07-4.76-4.09
		c-0.74-2.02,0.69-4.82,2.83-4.61"/>
                <AnimatedPath
                    index={11}
                    totalPaths={totalPaths}
                    scrollYProgress={scrollYProgress}
                    className="st0"
                    d="M1265.28,313.4c-7.51,2.64-15.41,5.55-20.47,11.71c-5.05,6.16-5.72,16.64,0.75,21.29
		c2.4,1.72,5.39,2.41,8.31,2.8c9.89,1.33,20.16-0.23,29.21-4.46"/>
                <AnimatedPath
                    index={12}
                    totalPaths={totalPaths}
                    scrollYProgress={scrollYProgress}
                    className="st0"
                    d="M1289.93,316.51c0.03,9.62-6.16,20.41-0.28,28.02c3.95,5.1,11.42,5.64,17.82,4.87
		c5.91-0.71,11.91-2.23,16.67-5.8c4.76-3.57,8.06-9.54,7.13-15.42c-1.24-7.9-9.22-12.91-16.88-15.23c-9.24-2.8-19.19-3.25-28.65-1.3
		"/>
            </g>
            <g id="Lla">
                <AnimatedPath
                    index={13}
                    totalPaths={totalPaths}
                    scrollYProgress={scrollYProgress}
                    className="st0"
                    d="M1572.36,604.27c-3.57,13.89-7.13,27.78-10.7,41.67c8.07-1.92,16.13-3.83,24.2-5.75"/>
                <AnimatedPath
                    index={14}
                    totalPaths={totalPaths}
                    scrollYProgress={scrollYProgress}
                    className="st0"
                    d="M1604.41,607.34c-2.29,10.62-4.57,21.25-6.86,31.87c-0.36,1.65-0.57,3.72,0.8,4.72
		c0.78,0.57,1.83,0.57,2.8,0.51c5.98-0.38,11.86-2.21,17-5.29"/>
                <AnimatedPath
                    index={15}
                    totalPaths={totalPaths}
                    scrollYProgress={scrollYProgress}
                    className="st0"
                    d="M1637.22,617.25c-0.64,9.97-1.28,19.94-1.92,29.91c1.85-11.3,3.69-22.61,5.54-33.91
		c0.63-3.87,1.88-8.47,5.64-9.59c3.83,12.63,9.49,24.71,16.74,35.74c0.54-1.76-1.27-3.77-3.08-3.41"/>
                <AnimatedPath
                    index={16}
                    totalPaths={totalPaths}
                    scrollYProgress={scrollYProgress}
                    className="st0"
                    d="M1635.93,631.89c6.35-2.16,12.7-4.32,19.04-6.48"/>
            </g>
            <AnimatedPath
                index={17}
                totalPaths={totalPaths}
                scrollYProgress={scrollYProgress}
                id="Underline"
                className="st1"
                d="M903.19,726.47c278.61,37.19,560.15-60.48,840.35-38.2"/>
            <g id="Meaning">
                <AnimatedPath
                    index={18}
                    totalPaths={totalPaths}
                    scrollYProgress={scrollYProgress}
                    className="st1"
                    d="M1182.54,784.8c-0.5,11.74-1,23.48-1.5,35.21c-2.05-15.52-5.21-30.89-9.46-45.96
		c-1.74,10.94,9.07,21.95,20.04,20.42c10.97-1.53,18.35-15.08,13.68-25.12c-5.89,18.29-4.85,38.72,2.85,56.31"/>
                <AnimatedPath
                    index={19}
                    totalPaths={totalPaths}
                    scrollYProgress={scrollYProgress}
                    className="st1"
                    d="M1224.12,793.35c-0.08,7.54,0.03,15.68,4.57,21.71c4.53,6.02,15.28,7.63,19.08,1.13"/>
                <AnimatedPath
                    index={20}
                    totalPaths={totalPaths}
                    scrollYProgress={scrollYProgress}
                    className="st1"
                    d="M1243.54,797.88c-7.99,1.45-15.98,2.9-25.92-7.71c7.29-5.83,16.58-9.1,25.92-9.11"/>
                <AnimatedPath
                    index={21}
                    totalPaths={totalPaths}
                    scrollYProgress={scrollYProgress}
                    className="st1"
                    d="M1271.13,788.44c-1.8,10.81-3.6,21.62-5.4,32.43c0.27-16.21,2.1-32.4,5.44-48.26
		c4.81,15.19,11.85,29.67,20.82,42.83"/>
                <AnimatedPath
                    index={22}
                    totalPaths={totalPaths}
                    scrollYProgress={scrollYProgress}
                    className="st1"
                    d="M1271.11,809.39c3.87-0.99,7.73-1.98,11.6-2.97"/>
                <AnimatedPath
                    index={23}
                    totalPaths={totalPaths}
                    scrollYProgress={scrollYProgress}
                    className="st1"
                    d="M1304.54,787.71c-2.26,9.62-4.51,19.24-6.77,28.86c1.42-12.23,3.37-24.41,5.83-36.47
		c6.38,12.3,13.8,25.56,26.72,30.57c0.24-12.35-1.19-24.73-4.23-36.69"/>
                <AnimatedPath
                    index={24}
                    totalPaths={totalPaths}
                    scrollYProgress={scrollYProgress}
                    className="st1"
                    d="M1355.57,771.29c-5.76,4.15-10.07,10.25-12.06,17.06c6.24,0.36,12.44,1.39,18.46,3.06
		c2.23,0.62,4.67,1.52,5.69,3.6c1,2.03,0.26,4.49-0.78,6.5c-2.96,5.7-8.44,10.03-14.66,11.61c-1.04,0.26-2.24,0.42-3.1-0.22
		c-0.86-0.65-0.73-2.37,0.33-2.48"/>
                <AnimatedPath
                    index={25}
                    totalPaths={totalPaths}
                    scrollYProgress={scrollYProgress}
                    className="st1"
                    d="M1434.52,748.5c-4.84,6.54-9.68,13.07-14.52,19.61"/>
                <AnimatedPath
                    index={26}
                    totalPaths={totalPaths}
                    scrollYProgress={scrollYProgress}
                    className="st1"
                    d="M1443.97,754.06c-5.07,6.03-9.81,12.34-14.19,18.88"/>
                <AnimatedPath
                    index={27}
                    totalPaths={totalPaths}
                    scrollYProgress={scrollYProgress}
                    className="st1"
                    d="M1461.33,770.93c-2.54,2.79-5.1,5.61-6.99,8.88c-1.89,3.27-3.08,7.06-2.64,10.81c0.44,3.75,2.73,7.4,6.23,8.81
		c2.85,1.15,6.14,0.73,8.95-0.51c4.53-2,8.06-6.16,9.3-10.95c1.24-4.8,0.18-10.14-2.81-14.09c-1.31-1.73-3.04-3.24-5.13-3.83
		c-2.26-0.63-4.73-0.11-6.78,1.03c-2.05,1.14-3.72,2.86-5.19,4.68"/>
                <AnimatedPath
                    index={28}
                    totalPaths={totalPaths}
                    scrollYProgress={scrollYProgress}
                    className="st1"
                    d="M1487.61,779.7c-0.57,7.79-1.14,15.58-1.72,23.38c0.64-8.63,1.29-17.27,1.93-25.9
		c3.42,10.01,11.68,18.25,21.71,21.64c-2.11-9.9-4.23-19.8-6.34-29.7"/>
                <AnimatedPath
                    index={29}
                    totalPaths={totalPaths}
                    scrollYProgress={scrollYProgress}
                    className="st1"
                    d="M1518.58,769.12c2.24,11.89,4.48,23.77,6.72,35.66"/>
                <AnimatedPath
                    index={30}
                    totalPaths={totalPaths}
                    scrollYProgress={scrollYProgress}
                    className="st1"
                    d="M1537.34,776.37c-1.86,4.77-3.74,9.74-3.32,14.84c0.42,5.1,3.9,10.34,8.97,10.99
		c4.74,0.61,9.29-3.09,10.83-7.61s0.62-9.56-1.2-13.98c-1.25-3.04-2.98-5.97-5.58-7.99c-2.59-2.01-6.18-2.97-9.26-1.82
		c-3.08,1.14-5.27,4.69-4.32,7.83"/>
                <AnimatedPath
                    index={31}
                    totalPaths={totalPaths}
                    scrollYProgress={scrollYProgress}
                    className="st1"
                    d="M1566.8,777.35c-1.33,8.39-1.51,16.96-0.53,25.4c-0.08-9.54-0.17-19.08-0.25-28.62
		c5.84,6.91,11.78,13.91,19.19,19.1c-3.39-9.34-6.77-18.68-10.16-28.02"/>
                <AnimatedPath
                    index={32}
                    totalPaths={totalPaths}
                    scrollYProgress={scrollYProgress}
                    className="st1"
                    d="M1591.88,748.58c1.41,5.27,4.57,10.06,8.85,13.44"/>
                <AnimatedPath
                    index={33}
                    totalPaths={totalPaths}
                    scrollYProgress={scrollYProgress}
                    className="st1"
                    d="M1599.52,743.93c4.07,4.78,7.74,9.9,10.97,15.29"/>
            </g>
            <g id="Cipolla">
                <AnimatedPath
                    index={34}
                    totalPaths={totalPaths}
                    scrollYProgress={scrollYProgress}
                    className="st2"
                    d="M271,932.61c-22.65-2.94-45.2-10.7-62.53-25.58c-17.33-14.88-28.78-37.55-26.76-60.3
		c1.59-17.98,11.16-34.36,22.65-48.29c17.65-21.38,40.42-38.51,66.68-49.55c-9.47,12.39-21.01,23.01-31.86,34.22
		s-21.18,23.29-27.52,37.53c-6.35,14.25-8.32,31.05-2.31,45.44c4.38,10.48,12.56,18.88,21.13,26.33
		c15.71,13.66,33.38,25.07,52.3,33.77"/>
                <AnimatedPath
                    index={35}
                    totalPaths={totalPaths}
                    scrollYProgress={scrollYProgress}
                    className="st2"
                    d="M271.95,752.75c-12.85,27.59-26.01,56.81-23.27,87.12c2.9,32.16,23.71,60.46,49.2,80.28"/>
                <AnimatedPath
                    index={36}
                    totalPaths={totalPaths}
                    scrollYProgress={scrollYProgress}
                    className="st2"
                    d="M279.07,760.12c-9.29,54,1.4,111.2,29.57,158.2"/>
                <AnimatedPath
                    index={37}
                    totalPaths={totalPaths}
                    scrollYProgress={scrollYProgress}
                    className="st2"
                    d="M312.97,919.84c16.64-53.27,7.44-113.97-19.45-162.78c15.65,7.83,31.45,15.75,44.99,26.84
		c13.54,11.09,24.83,25.77,28.61,42.85c3.78,17.06-0.27,35.22-8.58,50.59c-8.31,15.37-20.61,28.24-33.86,39.63"/>
                <AnimatedPath
                    index={38}
                    totalPaths={totalPaths}
                    scrollYProgress={scrollYProgress}
                    className="st2"
                    d="M304.66,750.15c22.49,4.89,45.55,10.01,64.78,22.64c19.24,12.63,34.1,34.62,31.56,57.49
		c-1.54,13.84-9.06,26.22-16.82,37.78c-11.71,17.44-24.55,34.4-40.71,47.82"/>
                <AnimatedPath
                    index={39}
                    totalPaths={totalPaths}
                    scrollYProgress={scrollYProgress}
                    className="st2"
                    d="M300.58,743.74c15.37-8.6,34.47-3.29,51.21,2.2c18.1,5.94,36.91,12.3,50.41,25.74
		c14.72,14.65,21.16,36.52,19.05,57.18c-2.1,20.66-12.16,40.03-26.11,55.43c-13.95,15.39-31.63,27.03-50.29,36.14"/>
                <AnimatedPath
                    index={40}
                    totalPaths={totalPaths}
                    scrollYProgress={scrollYProgress}
                    className="st2"
                    d="M272.2,747.6c1.48,7.18,9.06,12.52,16.31,11.51c7.26-1.01,13.09-8.22,12.55-15.53"/>
                <AnimatedPath
                    index={41}
                    totalPaths={totalPaths}
                    scrollYProgress={scrollYProgress}
                    className="st2"
                    d="M345.78,918.53c-25.83-4.41-53.21,0.98-75.45,15c-2.2,2.19-4.4,4.38-6.6,6.57c4.7-1.6,9.41-3.19,14.11-4.79
		c-3.73,7.25-7.45,14.5-11.18,21.76c7.12-8.47,14.23-16.95,21.35-25.42c1.92,10.33,3.84,20.65,5.75,30.98
		c3.61-13.56,9.35-26.56,16.95-38.36c-1.25,12.38-2.5,24.75-3.76,37.13c6.31-10.65,11.31-22.09,14.85-33.95
		c2.02,10.92,5.75,21.52,10.99,31.31c-0.73-12.36-1.47-24.73-2.2-37.09c5.86,8.19,13.31,15.24,21.81,20.65
		c-2.73-7.17-5.46-14.35-8.19-21.52c8.23,5.36,17.65,8.9,27.37,10.28c-5.95-5.6-11.9-11.19-17.85-16.79"/>
                <AnimatedPath
                    index={42}
                    totalPaths={totalPaths}
                    scrollYProgress={scrollYProgress}
                    className="st2"
                    d="M271.19,746.84c-0.41-11.5-4.3-22.67-9.71-32.83c-5.41-10.16-12.31-19.44-18.88-31.32
		c16.65,6.51,30.81,19.2,39.11,35.04c4.4-7.57,6.62-16.39,6.33-25.15c1.35,7.65,3.75,15.12,7.12,22.12
		c2.48-3.89,3.91-8.44,4.11-13.05c-2.53,15.09-2.11,30.67,1.23,45.6"/>
                <AnimatedPath
                    index={43}
                    totalPaths={totalPaths}
                    scrollYProgress={scrollYProgress}
                    className="st2"
                    d="M241.02,679.84c-25.55-26.53-41.59-62.03-43.68-97.16c20.24,33.97,39.41,68.58,57.45,103.76
		c-6.07-25.92-19.01-49.61-29.8-73.95s-19.68-50.64-16.85-77.12c12.23,63.1,60.75,115.03,70.7,178.54
		c-13.28-29.86-26.64-59.95-33.92-91.8s-8.15-65.98,3.3-96.59c-5.64,63.88,30.39,124.67,32.38,188.76
		c3.49-64.9-25.3-130.06-12.12-193.7c14.52,61.35,20.03,124.83,16.29,187.77c6.55-53.07,27.16-104.56,25.54-158.01
		c12.62,25.08,11.2,54.93,5.68,82.45c-5.51,27.53-14.82,54.4-17.15,82.38"/>
            </g>
        </svg>
    )
}

export default LandingHeroHandwriting
