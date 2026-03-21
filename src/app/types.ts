export interface IProject {
    id: number
    title: string
    image: string
    mobileImage: string
    url: string
    technologies: string[]
}

export type DescriptionSegment = { text: string; color?: string }
export type Description = DescriptionSegment[]
