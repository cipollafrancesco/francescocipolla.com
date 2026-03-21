# Backlog — francescocipolla.com

> Living document. Updated as we work through improvements.
> **Priority:** P0 = must-have · P1 = should-have · P2 = nice-to-have
> **Scope:** S = <1 day · M = 1–3 days · L = 3+ days

---

## UX / UI

| # | Priority | Scope | Item | Description |
|---|----------|-------|------|-------------|
| U1 | **P0** | S | Mobile navigation | Hamburger menu is commented out and non-functional. Implement a minimal mobile drawer or slide-in nav consistent with the b&w theme. |
| U2 | **P0** | M | Hero animation refinement | Smooth out the scroll-driven zoom animation. Tune spring physics (currently stiffness: 30 / damping: 15 / mass: 1.2). Reduce layout jank from the 300vh scroll hack. Add `will-change: transform` where appropriate. Respect `prefers-reduced-motion`. |
| U3 | **P1** | S | Page transitions | Subtle fade or slide transition between routes using Framer Motion `AnimatePresence`. Gives the site a more polished, app-like feel without heavy overhead. |
| U4 | **P1** | M | Experience section redesign | Move from a flat 2×2 grid to a more expressive layout — vertical timeline, expandable cards, or inline tech tag pills. Show descriptions on mobile (currently hidden). |
| U5 | **P1** | S | Scroll progress indicator | Thin line at the top of the viewport showing reading/scroll progress. Lean CSS-based approach, no extra libraries. |
| U6 | **P2** | S | Micro-interactions | Hover states on experience cards, animated underlines on nav links, icon scale on contact links. All via Tailwind transitions — no new deps. |
| U7 | **P2** | S | Dark / light mode toggle | CSS variable theming is already wired up with a `.dark` class in Tailwind config. Just needs a toggle button and `localStorage` persistence. |
| U8 | **P2** | S | Custom cursor | Subtle branded cursor on desktop. Pure CSS + minimal JS. Ties into the design personality without being intrusive. |

---

## Content & Pages

| # | Priority | Scope | Item | Description |
|---|----------|-------|------|-------------|
| C1 | **P0** | L | Freelance / Services page | New `/services` route. Business-oriented: what you offer (consulting, frontend architecture, design systems, etc.), who you work with, your process, and a clear CTA to the Cal.com booking. Should work as a standalone link you can share with prospects. |
| C2 | **P0** | M | Project detail pages | Dynamic `/projects/[slug]` pages. Each project gets a full write-up: context, your role, tech stack, challenges, outcomes, screenshots. Start with the 4 current freelance projects and make it easy to add more. |
| C3 | **P1** | M | Blog — MDX infrastructure | Migrate from `react-markdown` + plain `.md` files to MDX (`next-mdx-remote` or `@next/mdx`). Support custom components, syntax-highlighted code blocks (Shiki or rehype-highlight), and embeds. Blog stays hidden from nav but the plumbing is ready. |
| C4 | **P1** | S | Project data restructure | Move project content out of `constants.ts` into individual JSON or MDX files under `content/projects/`. Scales better as you add detail pages and more projects. |
| C5 | **P1** | S | Footer expansion | Add quick links, social icons, and a one-liner tagline. Currently just a copyright string. |
| C6 | **P2** | S | Testimonials | Short client quotes on the Services page and optionally as a homepage strip. Even a single strong testimonial adds credibility when sharing your freelance link. |
| C7 | **P2** | S | Resume / CV download | PDF link in the header or About page. Low effort, high utility for recruiters and prospects. |
| C8 | **P2** | S | Newsletter / email capture | Minimal email subscribe form for when the blog goes public. Buttondown or Resend — one endpoint, no heavy integrations. |

---

## Infrastructure & DX

| # | Priority | Scope | Item | Description |
|---|----------|-------|------|-------------|
| I1 | **P0** | S | Remove unused dependencies | `three` (0.171.0), `gsap` (3.12.5), and `react-fast-marquee` are in `package.json` but not actively used. Drop them. Estimated bundle savings: 300–500 kB before gzip. Also remove `chedesignersei.png` (superseded by `.webp`). |
| I2 | **P0** | S | Fix `dangerouslySetInnerHTML` | Descriptions in `constants.ts` use raw HTML strings rendered via `dangerouslySetInnerHTML`. Replace with a small component that accepts structured data (e.g. `{ text: string, highlight?: boolean }[]`) and renders colored spans safely. |
| I3 | **P1** | S | Custom 404 page | Add `src/app/not-found.tsx`. Brand-consistent, on-theme design with a link back home. Currently falls back to Next.js default. |
| I4 | **P1** | S | Error boundaries | Add `src/app/error.tsx` (and per-route where needed) for graceful error handling in production. |
| I5 | **P1** | S | Loading states | Add `src/app/loading.tsx` skeletons for route transitions. Keeps perceived performance high on slower connections. |
| I6 | **P1** | M | Content layer | Centralise all structured content (projects, experiences, blog posts) in a `content/` directory with typed schemas. Could be plain TypeScript objects, JSON files, or a lightweight lib like Contentlayer. Replaces the scattered `constants.ts` pattern. |
| I7 | **P1** | S | Analytics — GA4 + Vercel Analytics | Integrate Google Analytics 4 for full traffic tracking (sessions, sources, page views, events). Layer on Vercel Analytics for Core Web Vitals and real-user performance data. Track key interactions: Cal.com booking clicks, project link opens, contact link taps, and blog post reads. |
| I8 | **P2** | S | Prettier + lint-staged | Consistent formatting enforced on commit. Add `.prettierrc`, `husky`, and `lint-staged`. Zero friction after setup. |
| I9 | **P2** | S | Bundle analysis | Add `@next/bundle-analyzer` as a dev dependency. Run it once after the dependency cleanup (I1) to validate and catch future regressions. |

---

## SEO & Performance

| # | Priority | Scope | Item | Description |
|---|----------|-------|------|-------------|
| S1 | **P0** | S | `robots.txt` + sitemap | Neither exists. Add `public/robots.txt` and configure `src/app/sitemap.ts` using the Next.js Metadata API for automatic generation. |
| S2 | **P0** | M | Per-page metadata | Each route needs its own `generateMetadata()` export with tailored `title`, `description`, and Open Graph data. Currently only the root layout has a static metadata object. Blog posts and project pages should generate metadata from their content. |
| S3 | **P1** | S | Canonical URLs | Set `<link rel="canonical">` on all pages via the metadata API to prevent duplicate-content issues (e.g. trailing slashes, query strings). |
| S4 | **P1** | S | Structured data (JSON-LD) | Add schema.org markup: `Person` on homepage, `WebSite` globally, `Article` on blog posts, `Service` on the services page. Improves rich results in search. |
| S5 | **P1** | S | Company logo images to WebP | `public/companies/` still has PNGs (`fifa.png`, `globant.png`, `chili.png`, `softlab.png`). Convert to WebP for consistency and slightly better compression. |
| S6 | **P1** | S | OG image per route | `opengraph-image.tsx` only exists at the root. Add per-route OG images for the services page, project detail pages, and blog posts using the Next.js ImageResponse API. |
| S7 | **P2** | S | Performance monitoring | Set up Lighthouse CI on PRs (GitHub Action) or at minimum connect Vercel Speed Insights. Prevents performance regressions from slipping in unnoticed. |
| S8 | **P2** | S | `next.config.ts` hardening | Enable `images.formats: ['image/avif', 'image/webp']`, set security headers (`X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`), and add `poweredByHeader: false`. |

---

## Accessibility

| # | Priority | Scope | Item | Description |
|---|----------|-------|------|-------------|
| A1 | **P0** | S | Keyboard navigation audit | Verify every interactive element (nav links, project cards, contact links, Cal.com embed) is reachable and operable with keyboard only. Fix any focus traps or skipped elements. |
| A2 | **P1** | S | Skip-to-content link | Add a visually hidden `<a href="#main-content">Skip to content</a>` as the first element in the DOM. Essential for screen reader and keyboard users. |
| A3 | **P1** | S | `prefers-reduced-motion` | All Framer Motion animations should check `useReducedMotion()` and degrade gracefully. Currently the hero animation plays regardless of system preferences. |
| A4 | **P1** | S | ARIA labels audit | Several icon-only links and interactive elements are missing `aria-label`. Run an axe-core or similar audit and patch the findings. |
| A5 | **P1** | S | Focus ring styles | Custom `outline` styles are missing in several places. Ensure a consistent, visible focus ring exists across all interactive elements (can be styled to match the b&w theme). |
| A6 | **P2** | S | Colour contrast check | `text-gray-500` on white backgrounds may fall below WCAG AA (4.5:1). Audit with Colour Contrast Analyser and adjust where needed — likely a minor shade bump. |
| A7 | **P2** | S | Route change focus management | When navigating between pages, focus should move to a logical starting point (e.g. `<h1>`). Next.js App Router doesn't handle this automatically. |

---

## Suggested Implementation Phases

### Phase 1 — Foundations (fix what's broken / most impactful)
`U1` Mobile nav · `I1` Remove unused deps · `I2` Fix dangerouslySetInnerHTML · `S1` robots.txt + sitemap · `A1` Keyboard nav audit · `A3` prefers-reduced-motion

### Phase 2 — Core Features
`U2` Hero animation · `C1` Services page · `C2` Project detail pages · `S2` Per-page metadata

### Phase 3 — Blog & Content
`C3` MDX infrastructure · `C4` Project data restructure · `I3` 404 page · `I4` Error boundaries · `I5` Loading states

### Phase 4 — Polish & Growth
Remaining P1s and P2s — testimonials, analytics, dark mode, micro-interactions, newsletter, Lighthouse CI
