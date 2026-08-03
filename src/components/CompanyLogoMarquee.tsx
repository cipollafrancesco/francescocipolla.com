import Image from 'next/image'

interface CompanyLogoMarqueeProps {
    names: string[]
}

const logoSources: Record<string, string> = {
    'FIFA+': '/companies/fifa.webp',
    CHILI: '/companies/chili.webp',
    'Talent Garden': '/companies/TAG.webp',
    Lombardini22: '/companies/hublombardini22.webp',
    Groupama: '/companies/groupama.webp',
    'Reclami Gas e Luce': '/companies/reclamigaseluce.webp',
    Dpulses: '/companies/dpulses.svg',
    DataHause: '/companies/datahause.svg',
}

function CompanyMark({ name }: { name: string }) {
    const logoSrc = logoSources[name]

    return (
        <div className="flex h-14 items-center justify-center px-4 md:h-16 md:px-6">
            {logoSrc ? (
                <Image
                    src={logoSrc}
                    alt={name}
                    width={180}
                    height={72}
                    className="max-h-9 w-auto max-w-[140px] object-contain opacity-80 grayscale transition-[filter,opacity] duration-200 hover:opacity-100 hover:grayscale-0 md:max-h-11 md:max-w-[160px]"
                />
            ) : (
                <span className="text-sm font-black uppercase tracking-tight text-black md:text-base">
                    {name}
                </span>
            )}
        </div>
    )
}

export function CompanyLogoMarquee({ names }: CompanyLogoMarqueeProps) {
    const repeatedNames = [...names, ...names]

    return (
        <div
            className="company-marquee mt-5 overflow-hidden bg-white/75 py-4 backdrop-blur-sm"
            aria-label={names.join(', ')}
        >
            <div className="company-marquee__track flex w-max gap-12">
                {repeatedNames.map((name, index) => (
                    <div key={`${name}-${index}`} aria-hidden={index >= names.length}>
                        <CompanyMark name={name} />
                    </div>
                ))}
            </div>
        </div>
    )
}
