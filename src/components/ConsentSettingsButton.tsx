'use client'

export function ConsentSettingsButton({ label }: { label: string }) {
    return (
        <button
            type="button"
            className="underline-offset-2 hover:underline"
            onClick={() => window.dispatchEvent(new Event('open-cookie-preferences'))}
        >
            {label}
        </button>
    )
}
