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
        <>
            <div className="flex flex-1 items-center border-2 rounded-2xl border-gray-200 p-4">
                <Image
                    src={logo}
                    alt={`${company} logo`}
                    width={80}
                    height={80}
                    className="mr-4 rounded-full"
                />
                <div>
                    <h3 className="text-xl font-semibold">{company}</h3>
                    <p className="text-gray-600 mb-2">{position}</p>
                    <p className="text-sm text-gray-500 mb-2 flex items-center">
                        <Calendar className="w-4 h-4 mr-2"/>
                        {period}
                    </p>
                    <p className="text-gray-700 whitespace-break-spaces text-ellipsis line-clamp-3">{description}</p>

                    {/*<div className="flex flex-row flex-wrap gap-2 mt-2">
                        {
                            techs?.map((tech, index) => (
                                <span key={index}
                                      className="text-sm text-gray-500 bg-gray-100 rounded-lg px-2 py-1">#{tech}</span>
                            ))
                        }
                    </div>*/}
                </div>
            </div>
        </>
    )
}

export default ExperienceCard
