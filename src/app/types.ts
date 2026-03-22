export interface IProject {
    id: number
    slug: string
    title: string
    client: string
    image: string
    mobileImage: string
    url: string
    role: string
    year: string
    technologies: string[]
    description: string
    highlights: string[]
}

export type DescriptionSegment = { text: string; color?: string }
export type Description = DescriptionSegment[]
