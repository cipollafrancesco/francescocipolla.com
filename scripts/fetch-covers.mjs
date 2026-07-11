#!/usr/bin/env node
/**
 * Fetch real book covers and self-host them under /public/covers, then rewrite
 * each book's `coverUrl` in src/data/books.json to the local path.
 *
 * The collection is mostly Italian editions. Resolver order, best Italian
 * coverage first:
 *   1. Apple Books / iTunes Search API (country=it, no key) — artwork upscaled.
 *   2. Open Library search (language:ita preferred) — high-res cover-by-id.
 *   3. Google Books (country=IT) — with backoff (often rate-limited).
 *
 * Backfills ONLY missing `isbn`; never overwrites curated title/author/description.
 * No cover found → keeps the placeholder (→ generated cover at runtime).
 *
 * Usage:  node scripts/fetch-covers.mjs   (or: npm run covers)  — needs Node 18+.
 */
import { readFile, writeFile, mkdir } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')
const BOOKS_JSON = join(ROOT, 'src', 'data', 'books.json')
const COVERS_DIR = join(ROOT, 'public', 'covers')

const UA = 'v0-portfolio-bookshelf/1.0 (cover fetch script)'
const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

/** Extra search terms for books whose title alone is ambiguous. */
const QUERIES = {
  'startup-hoepli': 'Startup Chioda Hoepli',
  'il-piacere-del-vino': 'Il piacere del vino',
  'kobe-bryant-il-basket': "Kobe Bryant l'uomo che ha incantato il basket",
}

const termFor = (book) =>
  QUERIES[book.id] || `${book.title} ${book.author.split(',')[0]}`

/** fetch JSON with a couple of retries for transient network failures. */
async function getJson(url) {
  for (let i = 0; i < 3; i++) {
    try {
      const res = await fetch(url, { headers: { 'User-Agent': UA } })
      if (res.status === 429) {
        await sleep(2000 * (i + 1))
        continue
      }
      if (!res.ok) return null
      return await res.json()
    } catch {
      await sleep(800 * (i + 1))
    }
  }
  return null
}

async function getImage(url) {
  for (let i = 0; i < 3; i++) {
    try {
      const res = await fetch(url, { headers: { 'User-Agent': UA } })
      if (!res.ok) return null
      if (!(res.headers.get('content-type') || '').startsWith('image/')) return null
      const buf = Buffer.from(await res.arrayBuffer())
      return buf.byteLength > 3000 ? buf : null
    } catch {
      await sleep(800 * (i + 1))
    }
  }
  return null
}

const upscaleArt = (art) =>
  art.replace(/\/\d+x\d+bb\.(jpg|png)/, '/600x600bb.$1')

/** Apple Books / iTunes lookup by ISBN — exact edition match. */
async function appleByIsbn(isbn) {
  const data = await getJson(
    `https://itunes.apple.com/lookup?isbn=${encodeURIComponent(isbn)}&country=it`,
  )
  const hit = (data?.results || []).find((r) => r.artworkUrl100)
  return hit ? getImage(upscaleArt(hit.artworkUrl100)) : null
}

/** Open Library — direct cover-by-ISBN (exact edition). */
async function openLibraryByIsbn(isbn) {
  return getImage(
    `https://covers.openlibrary.org/b/isbn/${isbn}-L.jpg?default=false`,
  )
}

/** Google Books — image for an exact ISBN. */
async function googleByIsbn(isbn) {
  const data = await getJson(
    `https://www.googleapis.com/books/v1/volumes?country=IT&q=isbn:${isbn}`,
  )
  const hit = (data?.items || []).find((it) => it.volumeInfo?.imageLinks)
  if (!hit) return null
  const image =
    hit.volumeInfo.imageLinks.thumbnail || hit.volumeInfo.imageLinks.smallThumbnail
  return getImage(
    image.replace(/^http:\/\//, 'https://').replace(/&edge=curl/, '').replace(/zoom=\d/, 'zoom=2'),
  )
}

/** Score an Apple result against the wanted book; reject summaries/wrong matches. */
function scoreApple(r, book) {
  const name = (r.trackName || '').toLowerCase()
  const artist = (r.artistName || '').toLowerCase()
  if (/summary|shortcut|riassunto|analysis|sidekick/.test(name)) return -1
  let s = 0
  for (const w of book.title.toLowerCase().split(/\W+/)) {
    if (w.length > 3 && name.includes(w)) s++
  }
  const surname = book.author.split(',')[0].trim().split(/\s+/).pop().toLowerCase()
  if (surname.length > 2 && artist.includes(surname)) s += 3
  return s
}

/** Apple Books / iTunes term search — best Italian coverage, hi-res artwork. */
async function appleCover(book) {
  const data = await getJson(
    'https://itunes.apple.com/search?media=ebook&country=it&limit=8&term=' +
      encodeURIComponent(termFor(book)),
  )
  const cands = (data?.results || []).filter((r) => r.artworkUrl100)
  if (!cands.length) return null
  cands.sort((a, b) => scoreApple(b, book) - scoreApple(a, book))
  // Require a confident match (multiple title words, or author surname).
  if (scoreApple(cands[0], book) < 2) return null
  return getImage(upscaleArt(cands[0].artworkUrl100))
}

/** Google Books fallback (frequently rate-limited). */
async function googleCover(book) {
  const q = book.isbn
    ? `isbn:${book.isbn}`
    : `intitle:${book.title} inauthor:${book.author.split(',')[0]}`
  const data = await getJson(
    'https://www.googleapis.com/books/v1/volumes?country=IT&maxResults=5&q=' +
      encodeURIComponent(q),
  )
  const hit = (data?.items || []).find((it) => it.volumeInfo?.imageLinks)
  if (!hit) return null
  const image =
    hit.volumeInfo.imageLinks.thumbnail || hit.volumeInfo.imageLinks.smallThumbnail
  return getImage(
    image
      .replace(/^http:\/\//, 'https://')
      .replace(/&edge=curl/, '')
      .replace(/zoom=\d/, 'zoom=2'),
  )
}

async function main() {
  await mkdir(COVERS_DIR, { recursive: true })
  const books = JSON.parse(await readFile(BOOKS_JSON, 'utf8'))

  const found = []
  const missing = []

  for (const book of books) {
    // Keep already-validated covers; only (re)fetch placeholders.
    if (typeof book.coverUrl === 'string' && book.coverUrl.startsWith('/covers/')) {
      continue
    }

    process.stdout.write(`• ${book.title} … `)
    let buf = null
    let source = ''
    try {
      if (book.isbn && (buf = await appleByIsbn(book.isbn))) source = 'apple/isbn'
      if (!buf && (buf = await appleCover(book))) source = 'apple'
      if (!buf && book.isbn && (buf = await googleByIsbn(book.isbn))) source = 'google/isbn'
      if (!buf && (buf = await googleCover(book))) source = 'google'
    } catch (err) {
      console.log(`error: ${err.message}`)
    }

    if (buf) {
      await writeFile(join(COVERS_DIR, `${book.id}.jpg`), buf)
      book.coverUrl = `/covers/${book.id}.jpg`
      found.push(book.title)
      console.log(`ok (${source})`)
    } else {
      missing.push(book.title)
      console.log('no cover — keeping fallback')
    }
    await sleep(400)
  }

  await writeFile(BOOKS_JSON, JSON.stringify(books, null, 2) + '\n', 'utf8')

  console.log(`\nDone. ${found.length} cover(s) saved, ${missing.length} missing.`)
  if (missing.length) console.log('Missing:', missing.join(', '))
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
