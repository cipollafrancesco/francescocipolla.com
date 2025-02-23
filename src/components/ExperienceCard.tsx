import React from 'react'
import Image from 'next/image'
import {Calendar} from 'lucide-react'

interface IExperienceCardProps {
    company: string
    logo: string
    position: string
    period: string
    description: string
    techs?: string[]
}

const ExperienceCard: React.FC<IExperienceCardProps> = ({
    company,
    logo,
    position,
    period,
    description
}) => {
    return (
        <div className="flex flex-1 items-start border-2 rounded-2xl border-gray-200 p-4">
            <Image
                src={logo}
                alt={`${company} logo`}
                width={50}
                height={50}
                className="mr-4 rounded-full"
            />
            <div className="flex-1 min-w-0">
                <h3 className="text-lg font-semibold">{company}</h3>
                <p className="text-gray-600 text-sm mb-1">{position}</p>
                <p className="text-xs text-gray-500 mb-2 flex items-center">
                    <Calendar className="w-3 h-3 mr-1"/>
                    {period}
                </p>

                <p className="text-sm hidden md:flex text-gray-500 mb-2 items-center">
                    {description}
                </p>
            </div>
        </div>
    )
}

export default ExperienceCard
