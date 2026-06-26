import type { ReactNode } from 'react'

interface AccordionItemProps {
    question: string
    children: ReactNode
}

export function AccordionItem({ question, children }: AccordionItemProps) {
    return (
        <details className="group border-b border-gray-200 py-6 transition-colors duration-300 open:border-black">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-left text-lg font-semibold transition-colors duration-300 hover:text-gray-600 group-open:text-black">
                <span>{question}</span>
                <span
                    aria-hidden="true"
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-gray-200 text-xl leading-none transition-[transform,background-color,border-color,color] duration-300 group-open:rotate-45 group-open:border-black group-open:bg-black group-open:text-white"
                >
                    +
                </span>
            </summary>
            <div className="grid grid-rows-[1fr] transition-[grid-template-rows] duration-300">
                <div className="overflow-hidden">
                    <div className="mt-4 max-w-3xl text-base leading-7 text-gray-600">
                        {children}
                    </div>
                </div>
            </div>
        </details>
    )
}
