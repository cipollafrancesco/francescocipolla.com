export default function Loading() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-white">
            {/* `inline-block` so the rotation applies — transforms are ignored on
                inline boxes, and the flex parent blockifying this is incidental. */}
            <span className="loading-mark inline-block text-2xl font-extrabold">cipo.</span>
        </div>
    )
}
