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
        // Refreshed the same way as the allowed path below, so a key that is
        // actively being hammered can't age out of the map and get a clean slate.
        hits.delete(key)
        hits.set(key, recent)
        return true
    }

    recent.push(now)
    // Delete-then-set, not a plain `set`: updating an existing `Map` key leaves
    // it at its original position, and the eviction below relies on insertion
    // order meaning *recency*. Re-inserting moves this key to the back, so an
    // actively-used key is never the one evicted.
    hits.delete(key)
    hits.set(key, recent)

    // Opportunistic cleanup so the map doesn't grow unboundedly under
    // sustained traffic from many distinct keys.
    if (hits.size > MAX_TRACKED_KEYS) {
        for (const [trackedKey, timestamps] of hits) {
            if (timestamps.every((timestamp) => now - timestamp >= WINDOW_MS)) {
                hits.delete(trackedKey)
            }
        }

        // Expiry alone doesn't guarantee progress: under a burst from many
        // distinct keys — precisely what the cap exists for — nothing is old
        // enough to expire, so the pass above frees nothing and every later
        // request pays a full scan while the map stays over cap indefinitely.
        // Evicting from the front (least recently seen, per the re-insert
        // above) bounds it for real.
        for (const trackedKey of hits.keys()) {
            if (hits.size <= MAX_TRACKED_KEYS) break
            if (trackedKey !== key) hits.delete(trackedKey)
        }
    }

    return false
}
