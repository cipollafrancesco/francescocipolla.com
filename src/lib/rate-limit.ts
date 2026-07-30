// In-memory, per-instance rate limiting — a deterrent for the contact form,
// not a durable defense. On serverless each warm instance has its own memory
// and cold starts reset it, so a determined attacker spread across instances
// isn't stopped by this. A real deployment under sustained abuse should pair
// this with a shared store (Upstash/Vercel KV) or a challenge like Turnstile;
// this is the zero-new-infrastructure baseline against a naive scripted loop.
const WINDOW_MS = 10 * 60 * 1000
const MAX_REQUESTS_PER_WINDOW = 5
const MAX_TRACKED_KEYS = 5000

const hits = new Map<string, number[]>()

export function isRateLimited(key: string): boolean {
    const now = Date.now()
    const recent = (hits.get(key) ?? []).filter((timestamp) => now - timestamp < WINDOW_MS)

    if (recent.length >= MAX_REQUESTS_PER_WINDOW) {
        hits.set(key, recent)
        return true
    }

    recent.push(now)
    hits.set(key, recent)

    // Opportunistic cleanup so the map doesn't grow unboundedly under
    // sustained traffic from many distinct keys.
    if (hits.size > MAX_TRACKED_KEYS) {
        for (const [trackedKey, timestamps] of hits) {
            if (timestamps.every((timestamp) => now - timestamp >= WINDOW_MS)) {
                hits.delete(trackedKey)
            }
        }
    }

    return false
}
