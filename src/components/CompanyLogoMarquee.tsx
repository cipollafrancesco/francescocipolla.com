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
}

function CompanyMark({ name }: { name: string }) {
    const logoSrc = logoSources[name]

    return (
        <div className="flex h-14 min-w-[180px] items-center justify-center border border-black/10 bg-white px-6 md:h-16 md:min-w-[210px]">
            {logoSrc ? (
                <Image
                    src={logoSrc}
                    alt={name}
                    width={180}
                    height={72}
                    className="max-h-8 w-auto max-w-[140px] object-contain grayscale md:max-h-9 md:max-w-[160px]"
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
            className="company-marquee mt-4 overflow-hidden border-y border-black/15 py-3"
            aria-label={names.join(', ')}
        >
            <div className="company-marquee__track flex w-max gap-3">
                {repeatedNames.map((name, index) => (
                    <div key={`${name}-${index}`} aria-hidden={index >= names.length}>
                        <CompanyMark name={name} />
                    </div>
                ))}
            </div>
        </div>
    )
}
