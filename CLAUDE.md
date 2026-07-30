# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

Package manager is **pnpm** (`node_modules/.pnpm` present; `pnpm-lock.yaml` is the lockfile kept current — the tracked `package-lock.json` is stale, don't update it).

```bash
pnpm dev            # dev server on :3000
pnpm build          # production build — the only real typecheck/verification gate
pnpm start          # serve the production build
pnpm lint           # next lint
pnpm covers         # refetch book covers into public/covers + backfill src/data/books.json
pnpm gallery:sync   # optimise + upload project gallery media (see "Project gallery pipeline")
```

There is **no test suite**. `pnpm build` is what catches breakage — run it after non-trivial changes.

A husky `pre-commit` hook runs `lint-staged`: prettier + `eslint --fix` on staged `.ts/.tsx/.mjs`, prettier on `.json/.css/.md`. Prettier config is non-default and deliberate: **no semicolons, single quotes, 4-space indent, 100 columns**, plus `prettier-plugin-tailwindcss` for class sorting.

## Stack

Next.js 15 App Router · React 19 · TypeScript (strict) · Tailwind 3 · framer-motion. Path alias `@/*` → `src/*`. There is no i18n library — see "Copy is prop-drilled" below.

## Architecture

### Locale routing is the backbone

Every user-facing route lives under `src/app/[lang]/`. Locales are `it` (default) and `en`, defined in `src/i18n/config.ts`.

`src/middleware.ts` guarantees a locale prefix on every request:

- unprefixed paths are redirected to `/{locale}/...`, the locale coming from the `NEXT_LOCALE` cookie or falling back to `it`
- it also sets an `x-locale` request header, because `global-not-found.tsx` receives no route params and isn't nested under `[lang]`, so that header is its only way to resolve a language (`error.tsx` is a client component and reads the locale off `usePathname()` instead)
- `/{lang}/about` gets a 307 to `/{lang}` (leftover route; the about content moved to the locale root)

Its `matcher` excludes anything containing a dot, so static assets never cost a middleware invocation. That's why **route slugs must not contain dots** — `dpulses-2-0` is deliberately dash-only. Asset folders under `public/projects/` match the slug exactly; keep it that way rather than reintroducing a slug→folder mapping.

### Copy and project content live in one file

`src/content/site.ts` (~1.5k lines) is the single source of truth for **all** UI strings, page metadata, and project case studies, keyed by locale under `siteContent: Record<Locale, SiteContent>`. **The Italian literal `it` is the schema** — `SiteContent` is derived from it (`typeof it`, with a few fields restated where inference is too narrow or too wide), so adding a string means adding it to `it` and then to `en`, which fails to compile until you do. Don't hand-maintain a parallel type. Helpers exported from the same file: `getLocalizedProjects/getLocalizedProject/getProjectSlugs(locale)`, `localizedPath(locale, path)`, `absoluteLocalizedUrl(locale, path)`, `baseUrl`.

### Page pattern

Server page → resolve locale → pass copy down as props:

```tsx
export async function generateMetadata({ params }) {
    const { lang, content } = await getI18nContent((await params).lang)
    return withLocaleMetadata(content.metadata.books, lang, '/books')
}

export default async function Page({ params }) {
    const { lang: langParam } = await params
    if (!isLocale(langParam)) notFound()
    const { lang, content } = await getI18nContent(langParam)
    return <BooksClient lang={lang} copy={content.books} />
}
```

`withLocaleMetadata` (`src/lib/metadata.ts`) is what produces canonical URLs, `hreflang` alternates, and OG locale — always route page metadata through it rather than hand-writing `alternates`.

**Copy is prop-drilled, not hooked.** There is no i18next in the project — `i18next`/`react-i18next` and the old `I18nProvider` are gone. Every string arrives as a `copy`/`content` prop from a server component that read `siteContent[lang]`. Follow that; don't introduce `useTranslation`.

The one deliberate exception is `src/content/system-copy.ts`, which holds the error-boundary strings. `app/error.tsx` must be a client component, and importing `site.ts` there would ship all ~1.5k lines of copy and case studies to the browser for three strings — so those live in a tiny module that `site.ts` re-exports into `siteContent.error`. Single source, two module boundaries. `global-not-found.tsx` needs no such split: it's a Server Component and reads `siteContent` directly.

Interactive pages split into a server `page.tsx` plus a sibling `*Client.tsx` marked `'use client'` (`HomeClient`, `BooksClient`).

### Project gallery pipeline

Gallery media is not committed — `public/projects/*/gallery/**` binaries are gitignored. The flow:

1. drop originals in `.media-source/projects/<slug>/{desktop,mobile}/` (gitignored)
2. `pnpm gallery:sync` — requires `ffmpeg`/`ffprobe` on PATH and `BLOB_READ_WRITE_TOKEN`; `--prepare-only` skips the upload
3. it optimises into `.media-output/`, uploads to Vercel Blob, and writes one generated file that **must be committed**: `src/content/project-gallery.generated.json` (the manifest)
4. `next.config.ts` derives `images.remotePatterns` from the absolute URLs in that manifest, so there is no separate host list that can go stale against it

`getProjectGalleryMedia(slug)` (`src/lib/project-gallery.ts`) reads the manifest. It also falls back to scanning `public/projects/<slug>/gallery/{desktop,mobile}/`, but **only in development** — those binaries are gitignored, so on a deployed build the scan can never return anything; it exists so dropping files straight into `public/` previews locally. Media is tagged `desktop`/`mobile` by folder, and detail pages filter on that.

### Books

`src/data/books.json` holds the collection. `category` values are stored in **Italian** and used as lookup keys into `siteContent[lang].books.categories` — never translate the raw values in the JSON, or filtering breaks. `pnpm covers` resolves covers (IBS/laFeltrinelli by ISBN → Apple Books → Google Books) into `public/covers` and backfills only missing `isbn`; it never overwrites curated title/author/description.

### Analytics and consent

`src/lib/analytics.ts` is consent-gated: GA is injected lazily and `trackEvent` is a no-op unless the `analytics_consent=accepted` cookie is set (`ConsentBanner` / `ConsentSettingsButton` manage it). New events must be added to the `AnalyticsEvent` union — it's a closed set, not free-form strings.

### Contact form

`src/app/[lang]/contacts/actions.ts` is a server action: zod validation (`src/lib/contact-schema.ts`) → Resend. It returns **error codes** (`'required'`, `'email_invalid'`, `'message_too_short'`, `'message_too_long'`), not messages — the client maps them to localized copy in `ContactForm`'s `getFieldError`. A `website` honeypot field silently returns success. Submissions are also IP-rate-limited in-process by `src/lib/rate-limit.ts` — a per-instance deterrent, not a durable defence; see the note at the top of that file.

## Styling conventions

Black-and-white design language: `border-black`/`bg-black` primitives, `font-extrabold`/`font-black` display type, lowercase nav.

`src/components/ui/` (`Button`, `Section`, `Badge`, `Eyebrow`, `Accordion`) are **hand-written**, not shadcn CLI output. Extend them by hand; don't `shadcn add` over them (`components.json` was deleted precisely so that can't silently overwrite them). `globals.css` keeps only the handful of HSL variables Tailwind actually consumes (`--background`, `--foreground`, `--border`, `--radius`) — components use literal Tailwind colors, matching the black-and-white design language.

Anything that looks like a button goes through `ui/Button` — `Button`, `ButtonLink`, or `buttonClasses()` for elements that own their own tag (e.g. `TrackedLink`). The focus ring lives in its base classes, and the several hand-copied class strings that dropped it were shipping CTAs with no visible focus state.

Animation is framer-motion throughout, and `useReducedMotion` is honoured via three helpers in `src/lib/motion.ts` rather than re-typing `reduced ? 0 : x`:

- `motionPresets(reduced)` — `initFade`/`initFadeUp`/`dur()` for one-off `motion.*` props (`HomeClient.tsx` is the reference call site)
- `revealProps(reduced, {delay, y, margin})` — the whole fade-and-rise-on-scroll bundle; `Reveal` is its wrapper form, for content that can take an extra `<div>`
- `useSectionScrollFade()` — the scroll-linked section fade, owning its own ref

Note `useSectionScrollFade` flattens its `useTransform` output ranges under reduced motion instead of returning plain numbers. It must stay a `MotionValue`: the server renders the style at scroll progress 0, and React does not patch a mismatched `style` attribute during hydration, so a plain `{opacity: 1}` would never overwrite the SSR-baked `opacity:0` and the section would stay invisible.

Note the asymmetry `dur()` exists to preserve: collapse the _duration_, don't disable the trigger. Dropping `whileInView` under reduced motion leaves variant-driven styles stuck at their unanimated values, which has already silently broken contrast once.

Route transitions are the exception to "framer-motion throughout": `app/[lang]/template.tsx` is a Server Component and the fade-and-rise is the `.page-enter` CSS class in `globals.css`, so navigation costs no client JS.

## Browsing the site

When you need to open, click through, or screenshot the running site, **use the Playwright MCP tools (`mcp__plugin_playwright_playwright__*`), not the Claude in Chrome extension (`mcp__claude-in-chrome__*`)**. Playwright drives its own isolated browser instead of the user's real Chrome session, and its screenshots land in `.playwright-mcp/` (gitignored).

Typical loop: `pnpm dev`, then `browser_navigate` to `http://localhost:3000/it` (or `/en`), `browser_resize` to the viewport you care about, `browser_snapshot` for the accessibility tree, `browser_take_screenshot` for visual checks. Verify both locales for anything touching copy or layout width — Italian strings are consistently longer than English.

## Environment

See `.env.example`. `NEXT_PUBLIC_GA_ID` (optional), `BLOB_STORE_ID`/`BLOB_READ_WRITE_TOKEN` (gallery sync), `RESEND_API_KEY`/`CONTACT_TO_EMAIL`/`CONTACT_FROM_EMAIL` (contact form; Resend needs the domain verified, use `onboarding@resend.dev` as the from-address locally).

## BACKLOG.md

The repo keeps a prioritised backlog (`BACKLOG.md`) with stable item IDs (U1, C3, …). Several code comments reference those IDs (e.g. `Scroll progress indicator — U5` in `layout.tsx`/`globals.css`). Check it before proposing new work, and keep it updated when completing an item.
