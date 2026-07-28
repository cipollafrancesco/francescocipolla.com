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

A husky `pre-commit` hook runs `lint-staged`: prettier + `eslint --fix` on staged `.ts/.tsx`, prettier on `.json/.css/.md`. Prettier config is non-default and deliberate: **no semicolons, single quotes, 4-space indent, 100 columns**, plus `prettier-plugin-tailwindcss` for class sorting.

## Stack

Next.js 15 App Router · React 19 · TypeScript (strict) · Tailwind 3 · framer-motion · i18next. Path alias `@/*` → `src/*`.

## Architecture

### Locale routing is the backbone

Every user-facing route lives under `src/app/[lang]/`. Locales are `it` (default) and `en`, defined in `src/i18n/config.ts`.

`src/middleware.ts` guarantees a locale prefix on every request:

- unprefixed paths are redirected to `/{locale}/...`, the locale coming from the `NEXT_LOCALE` cookie or falling back to `it`
- it also sets an `x-locale` request header, because `not-found.tsx` and `error.tsx` receive no route params and that header is their only way to resolve a language
- `/{lang}/about` gets a 307 to `/{lang}` (leftover route; the about content moved to the locale root)

### Copy and project content live in one file

`src/content/site.ts` (~1.5k lines) is the single source of truth for **all** UI strings, page metadata, and project case studies, keyed by locale under `siteContent: Record<Locale, SiteContent>`. The `SiteContent` type is the contract — adding a string means adding it to the type and to _both_ `it` and `en`. Helpers exported from the same file: `getLocalizedProjects/getLocalizedProject/getProjectSlugs(locale)`, `localizedPath(locale, path)`, `absoluteLocalizedUrl(locale, path)`, `baseUrl`.

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

**Copy is prop-drilled, not hooked.** `I18nProvider` and `react-i18next` are wired up in the layout, but no component calls `useTranslation` — every string arrives as a `copy`/`content` prop from a server component. Follow that; don't introduce `useTranslation` for new work.

Interactive pages split into a server `page.tsx` plus a sibling `*Client.tsx` marked `'use client'` (`HomeClient`, `BooksClient`).

### Legacy unprefixed route tree — do not extend

`src/app/{about,blog,projects,services}/` still exist without a locale segment. They are shadowed by the middleware redirect and effectively dead, and they read project data from the older path (`src/lib/projects.ts` → `content/projects/*.json`) rather than from `site.ts`. New pages and edits belong in `src/app/[lang]/`. Treat `content/projects/*.json` + `src/lib/projects.ts` as superseded by `site.ts`.

### Project gallery pipeline

Gallery media is not committed — `public/projects/*/gallery/**` binaries are gitignored. The flow:

1. drop originals in `.media-source/projects/<slug>/{desktop,mobile}/` (gitignored)
2. `pnpm gallery:sync` — requires `ffmpeg`/`ffprobe` on PATH and `BLOB_READ_WRITE_TOKEN`; `--prepare-only` skips the upload
3. it optimises into `.media-output/`, uploads to Vercel Blob, and writes two generated files that **must be committed**: `src/content/project-gallery.generated.json` (the manifest) and `src/content/blob-hosts.generated.json`
4. `next.config.ts` reads `blob-hosts.generated.json` to build `images.remotePatterns` — a missing/stale host there means remote gallery images fail at build

`getProjectGalleryMedia(slug)` (`src/lib/project-gallery.ts`) prefers the manifest and falls back to scanning `public/projects/<slug>/gallery/{desktop,mobile}/`. Media is tagged `desktop`/`mobile` by folder, and detail pages filter on that.

### Books

`src/data/books.json` holds the collection. `category` values are stored in **Italian** and used as lookup keys into `siteContent[lang].books.categories` — never translate the raw values in the JSON, or filtering breaks. `pnpm covers` resolves covers (Apple Books → Open Library → Google Books) into `public/covers` and backfills only missing `isbn`; it never overwrites curated title/author/description.

### Analytics and consent

`src/lib/analytics.ts` is consent-gated: GA is injected lazily and `trackEvent` is a no-op unless the `analytics_consent=accepted` cookie is set (`ConsentBanner` / `ConsentSettingsButton` manage it). New events must be added to the `AnalyticsEvent` union — it's a closed set, not free-form strings.

### Contact form

`src/app/[lang]/contacts/actions.ts` is a server action: zod validation (`src/lib/contact-schema.ts`) → Resend. It returns **error codes** (`'required'`, `'email_invalid'`, `'message_too_short'`), not messages — the client maps them to localized copy. A `website` honeypot field silently returns success.

## Styling conventions

Black-and-white design language: `border-black`/`bg-black` primitives, `font-extrabold`/`font-black` display type, lowercase nav.

`src/components/ui/` (`Button`, `Card`, `Section`, `Badge`, `Eyebrow`, `Accordion`) are **hand-written**, not shadcn CLI output, despite `components.json` being present. Extend them by hand; don't `shadcn add` over them. `globals.css` does define the shadcn-style HSL variable set and Tailwind maps it, but most components use literal Tailwind colors instead — match the surrounding file.

Animation is framer-motion throughout, and `useReducedMotion` is honoured consistently — see `HomeClient.tsx` for the established pattern (`initFade`/`initFadeUp`/`dur()` helpers that collapse to zero when motion is reduced). Preserve that when adding motion.

## Browsing the site

When you need to open, click through, or screenshot the running site, **use the Playwright MCP tools (`mcp__plugin_playwright_playwright__*`), not the Claude in Chrome extension (`mcp__claude-in-chrome__*`)**. Playwright drives its own isolated browser instead of the user's real Chrome session, and its screenshots land in `.playwright-mcp/` (gitignored).

Typical loop: `pnpm dev`, then `browser_navigate` to `http://localhost:3000/it` (or `/en`), `browser_resize` to the viewport you care about, `browser_snapshot` for the accessibility tree, `browser_take_screenshot` for visual checks. Verify both locales for anything touching copy or layout width — Italian strings are consistently longer than English.

## Environment

See `.env.example`. `NEXT_PUBLIC_GA_ID` (optional), `BLOB_STORE_ID`/`BLOB_READ_WRITE_TOKEN` (gallery sync), `RESEND_API_KEY`/`CONTACT_TO_EMAIL`/`CONTACT_FROM_EMAIL` (contact form; Resend needs the domain verified, use `onboarding@resend.dev` as the from-address locally).

## BACKLOG.md

The repo keeps a prioritised backlog (`BACKLOG.md`) with stable item IDs (U1, C3, …). Several code comments reference those IDs (e.g. `Scroll progress indicator — U5` in `layout.tsx`/`globals.css`). Check it before proposing new work, and keep it updated when completing an item.
