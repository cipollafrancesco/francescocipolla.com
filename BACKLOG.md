# Backlog — francescocipolla.com

> Living document. Updated as we work through improvements.
> **Priority:** P0 = must-have · P1 = should-have · P2 = nice-to-have
> **Scope:** S = <1 day · M = 1–3 days · L = 3+ days

---

## UX / UI

| #   | Priority         | Scope | Item                        | Description                                                                                                                                                                     |
| --- | ---------------- | ----- | --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| U1  | ~~P0~~ **Done**  | S     | Mobile navigation           | Working drawer nav shipped in `src/components/Header.tsx`.                                                                                                                      |
| U2  | ~~P0~~ **Done**  | M     | Hero animation refinement   | `useHeroAnimations` reworked; `prefers-reduced-motion` honoured via the `initFade`/`initFadeUp`/`dur()` pattern (see `HomeClient.tsx`).                                         |
| U3  | ~~P1~~ **Done**  | S     | Page transitions            | `src/app/[lang]/template.tsx`, gated on reduced motion.                                                                                                                         |
| U4  | **P1** (partial) | M     | Experience section redesign | Redesigned in `src/sections/Experiences.tsx` (floating cards, corner-anchored title). Description text is still `hidden lg:flex` in `ExperienceCard.tsx` — not shown on mobile. |
| U5  | ~~P1~~ **Done**  | S     | Scroll progress indicator   | `#scroll-progress` in `layout.tsx` / `globals.css`.                                                                                                                             |
| U6  | ~~P2~~ **Done**  | S     | Micro-interactions          | Hover/focus-visible states throughout `ui/`, `Header`, `LanguageSwitcher`, project cards.                                                                                       |
| U7  | **P2**           | S     | Dark / light mode toggle    | Not started — the site has since committed to a deliberate black-and-white design language (see CLAUDE.md), which may supersede this rather than leave it pending.              |
| U8  | **P2**           | S     | Custom cursor               | Not started.                                                                                                                                                                    |

---

## Content & Pages

| #   | Priority        | Scope | Item                       | Description                                                                                                                                                                                                                                                                               |
| --- | --------------- | ----- | -------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| C1  | ~~P0~~ **Done** | L     | Freelance / Services page  | Shipped as `src/app/[lang]/services/page.tsx`.                                                                                                                                                                                                                                            |
| C2  | ~~P0~~ **Done** | M     | Project detail pages       | Shipped as `src/app/[lang]/projects/[slug]/page.tsx`, covering all 6 current projects.                                                                                                                                                                                                    |
| C3  | **P1**          | M     | Blog — MDX infrastructure  | Not started — blog still reads plain `.md` via `gray-matter`/`react-markdown` (`src/lib/blog.ts`).                                                                                                                                                                                        |
| C4  | ~~P1~~ **Done** | S     | Project data restructure   | Landed differently than scoped here: project content now lives in `src/content/site.ts` (typed, localized) rather than per-project JSON/MDX files under `content/projects/` — that path was tried and then superseded; the legacy JSON files and `src/lib/projects.ts` have been removed. |
| C5  | ~~P1~~ **Done** | S     | Footer expansion           | `src/app/[lang]/layout.tsx` footer has nav links, socials, and a tagline.                                                                                                                                                                                                                 |
| C6  | **P2**          | S     | Testimonials               | Not started.                                                                                                                                                                                                                                                                              |
| C7  | **P2**          | S     | Resume / CV download       | Not started — `common.nav.resume` copy exists but nothing renders it yet.                                                                                                                                                                                                                 |
| C8  | **P2**          | S     | Newsletter / email capture | Not started.                                                                                                                                                                                                                                                                              |

---

## Infrastructure & DX

| #   | Priority        | Scope | Item                               | Description                                                                                                                                                                                                                                                                                 |
| --- | --------------- | ----- | ---------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| I1  | ~~P0~~ **Done** | S     | Remove unused dependencies         | `three`/`gsap`/`react-fast-marquee` are gone; `fs`/`path`/`class-variance-authority` (which had crept back in as bogus deps) were also removed. Superseded PNG covers (`reclamigaseluce`, `dpulses2.0`, `che-designer-sei`) and the orphaned `public/projects/etc/` asset dir were removed. |
| I2  | ~~P0~~ **Done** | S     | Fix `dangerouslySetInnerHTML`      | `constants.ts` is gone; the one remaining `dangerouslySetInnerHTML` (`app/layout.tsx`) is `JSON.stringify` of a static, non-user-derived JSON-LD object.                                                                                                                                    |
| I3  | ~~P1~~ **Done** | S     | Custom 404 page                    | `src/app/not-found.tsx`.                                                                                                                                                                                                                                                                    |
| I4  | ~~P1~~ **Done** | S     | Error boundaries                   | `src/app/error.tsx`.                                                                                                                                                                                                                                                                        |
| I5  | ~~P1~~ **Done** | S     | Loading states                     | `src/app/loading.tsx`.                                                                                                                                                                                                                                                                      |
| I6  | ~~P1~~ **Done** | M     | Content layer                      | `src/content/site.ts` — typed `SiteContent`, one object per locale.                                                                                                                                                                                                                         |
| I7  | ~~P1~~ **Done** | S     | Analytics — GA4 + Vercel Analytics | Both wired up and consent-gated (`src/lib/analytics.ts`, `ConsentBanner`, `ConsentedVercelAnalytics`); event tracking via the closed `AnalyticsEvent` union.                                                                                                                                |
| I8  | ~~P2~~ **Done** | S     | Prettier + lint-staged             | `.prettierrc`, `husky`, `lint-staged` all in place (now also covering `*.mjs` scripts).                                                                                                                                                                                                     |
| I9  | **P2**          | S     | Bundle analysis                    | Not started.                                                                                                                                                                                                                                                                                |

---

## SEO & Performance

| #   | Priority        | Scope | Item                        | Description                                                                                                                                                                              |
| --- | --------------- | ----- | --------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| S1  | ~~P0~~ **Done** | S     | `robots.txt` + sitemap      | `public/robots.txt` + `src/app/sitemap.ts`.                                                                                                                                              |
| S2  | ~~P0~~ **Done** | M     | Per-page metadata           | Every `[lang]` route exports `generateMetadata()` through `withLocaleMetadata` (`src/lib/metadata.ts`), including hreflang alternates.                                                   |
| S3  | ~~P1~~ **Done** | S     | Canonical URLs              | Handled by `withLocaleMetadata`.                                                                                                                                                         |
| S4  | ~~P1~~ **Done** | S     | Structured data (JSON-LD)   | `Person`/`WebSite` in `app/layout.tsx`. `Article`/`Service` markup not added.                                                                                                            |
| S5  | ~~P1~~ **Done** | S     | Company logo images to WebP | `public/companies/*.webp` in place; the legacy PNGs (and the profile photo and book cover JPGs, swept up in the same pass) have been removed — every raster under `public/` is now WebP. |
| S6  | ~~P1~~ **Done** | S     | OG image per route          | Root, `[lang]/services`, and `[lang]/projects/[slug]` each have an `opengraph-image.tsx`. Blog posts still fall back to the root image.                                                  |
| S7  | **P2**          | S     | Performance monitoring      | Not started.                                                                                                                                                                             |
| S8  | ~~P2~~ **Done** | S     | `next.config.ts` hardening  | `images.formats`, security headers, and `poweredByHeader: false` all present.                                                                                                            |

---

## Accessibility

| #   | Priority         | Scope | Item                          | Description                                                                                                                                                                                                             |
| --- | ---------------- | ----- | ----------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| A1  | **P0** (partial) | S     | Keyboard navigation audit     | Substantially improved (`LanguageSwitcher`, bookshelf, `BookDetailsPanel` focus trap) but not exhaustively audited — e.g. the mobile drawer still lacks `aria-expanded`/Escape handling.                                |
| A2  | ~~P1~~ **Done**  | S     | Skip-to-content link          | First element in `app/[lang]/layout.tsx` (not the root layout — it needs the `lang` route param to stay localized without a request-time cost), via `common.skipToContent`.                                             |
| A3  | ~~P1~~ **Done**  | S     | `prefers-reduced-motion`      | Consistently honoured via the `initFade`/`initFadeUp`/`dur()` pattern; see CLAUDE.md.                                                                                                                                   |
| A4  | **P1** (partial) | S     | ARIA labels audit             | Most icon-only controls now have `aria-label`s; a few gaps remain (star ratings, company-logo marquee list — both use `aria-label` on a role-less `<div>`, which isn't exposed to assistive tech without `role="img"`). |
| A5  | ~~P1~~ **Done**  | S     | Focus ring styles             | `focus-visible:` rings applied consistently across `ui/` and interactive components.                                                                                                                                    |
| A6  | **P2**           | S     | Colour contrast check         | Not formally audited.                                                                                                                                                                                                   |
| A7  | **P2**           | S     | Route change focus management | Not done.                                                                                                                                                                                                               |

---

## Suggested Implementation Phases

Phases 1–3 below are done — the site now has locale routing (`it`/`en`), a services
page, project detail pages, a bookshelf feature, error/404/loading boundaries, and
per-page metadata, none of which were scoped item-by-item in this backlog when the
work started. What's left is mostly Phase 4 polish plus the two carried-over items:

- `C3` Blog MDX infrastructure — still plain markdown
- `U4` Experience card descriptions on mobile — still hidden below `lg`

### Remaining — Polish & Growth

`U7` Dark/light mode (superseded — see U7 above) · `U8` Custom cursor · `C6` Testimonials
· `C7` Resume/CV download · `C8` Newsletter · `I9` Bundle analysis · `S7` Performance
monitoring / Lighthouse CI · `A1`/`A4` finish the accessibility audit · `A6` colour
contrast audit · `A7` route-change focus management

- Improve the 404 page by showing the logo and make the retry button a primary CTA
