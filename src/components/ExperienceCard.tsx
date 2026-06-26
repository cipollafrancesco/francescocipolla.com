import React from 'react'
import Image from 'next/image'
import { Calendar } from 'lucide-react'

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
    description,
}) => {
    return (
        <div className="flex flex-1 items-start rounded-2xl border-2 border-gray-200 p-4 transition-[border-color,box-shadow] duration-300 hover:border-gray-400 hover:shadow-sm">
            <Image
                src={logo}
                alt={`${company} logo`}
                width={50}
                height={50}
                className="mr-4 rounded-full"
            />
            <div className="min-w-0 flex-1">
                <h3 className="text-lg font-semibold">{company}</h3>
                <p className="mb-1 text-sm text-gray-600">{position}</p>
                <p className="mb-2 flex items-center text-xs text-gray-500">
                    <Calendar className="mr-1 h-3 w-3" />
                    {period}
                </p>

                <p className="mb-2 hidden items-center text-sm text-gray-500 lg:flex">
                    {description}
                </p>
            </div>
        </div>
    )
}

export default ExperienceCard
