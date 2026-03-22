import { IProject } from '@/app/types'

// Import all project JSON files statically so they bundle correctly in the edge runtime
import cheDesignerSei from '../../content/projects/che-designer-sei.json'
import hubLombardini22 from '../../content/projects/hub-lombardini22.json'
import dpulses from '../../content/projects/dpulses.json'
import datahause from '../../content/projects/datahause.json'

const allProjects: IProject[] = [
    cheDesignerSei,
    hubLombardini22,
    dpulses,
    datahause,
]

export function getProjects(): IProject[] {
    return allProjects
}

export function getProject(slug: string): IProject | undefined {
    return allProjects.find((p) => p.slug === slug)
}

export function getProjectSlugs(): string[] {
    return allProjects.map((p) => p.slug)
}
