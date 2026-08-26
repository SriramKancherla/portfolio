# Sriram Kancherla — Portfolio

Minimalist cinematic portfolio for **Sriram Kancherla** — ML Intern @ FlyRank AI and CS undergrad at VIT Vellore.

**Live site:** [sriramkancherla.pages.dev](https://sriramkancherla.pages.dev)

> GitHub Pages stub: [sriramkancherla.github.io/portfolio/](https://sriramkancherla.github.io/portfolio/) redirects to Cloudflare.

---

## Tech stack

| Layer | Choice |
|-------|--------|
| Framework | **Next.js** (App Router) + **TypeScript** |
| Styling | **Tailwind CSS 3** + CSS custom properties |
| UI | **shadcn/ui** (Radix) |
| Fonts | **next/font** — Space Grotesk, Inter, JetBrains Mono |
| Host | **Cloudflare Workers** via [`@opennextjs/cloudflare`](https://opennext.js.org/cloudflare) |
| Contact | Next.js Route Handler → Web3Forms (secret server-side) |

---

## Signature interactions

- **SK curtain intro** (`NameIntro.tsx`) — full-screen preloader: letters fade in, conic glow sweeps once, panel lifts to reveal the hero. Once per session; respects `prefers-reduced-motion`; safety timeout.
- **Kolam band** — single `PatternDivider` after the hero (not tiled on every section).
- **Straw hat** — tiny footer easter egg (not the opening moment).
- **Scroll reveals** (`Reveal.tsx`) — staggered fade/slide-in.
- **Skills marquee** — one ticker in Skills.

Ambient backdrop is **film grain only** — no stacked aurora/blob/node canvases.

---

## Routes

| Path | Purpose |
|------|---------|
| `/` | Home (hero + sections) |
| `/resume` | Embedded PDF viewer |
| `/api/contact` | Contact form proxy (POST) |

---

## Local development

```bash
npm install
npm run dev          # Next.js at http://localhost:3000
```

Optional local contact secret (`.dev.vars`, gitignored):

```
NEXTJS_ENV=development
WEB3FORMS_ACCESS_KEY=your-key
```

Preview in the Workers runtime:

```bash
npm run preview      # opennextjs-cloudflare build + preview
```

---

## Build & deploy (Cloudflare Workers)

```bash
npm run build        # next build (runs prebuild: docs sync, sitemap, OG image)
npm run deploy       # OpenNext build + deploy Worker named sriramkancherla
```

Set secrets / build env:

```bash
wrangler secret put WEB3FORMS_ACCESS_KEY
# Build-time (CI / Cloudflare dashboard):
# NEXT_PUBLIC_SITE_URL=https://sriramkancherla.pages.dev
```

OpenNext deploys a **Worker**, not a static Pages `dist` folder. Point your custom domain / `pages.dev` hostname at the Worker if the dashboard still expects classic Pages.

---

## Environment variables

| Name | Where | Purpose |
|------|--------|---------|
| `NEXT_PUBLIC_SITE_URL` | Build | Canonical / OG / sitemap base URL |
| `WEB3FORMS_ACCESS_KEY` | Runtime secret | Contact form — **never** `NEXT_PUBLIC_` |

---

## Project structure

```
src/app/                 App Router (layout, pages, api/contact)
src/components/          UI sections + shadcn primitives
src/lib/                 site config, intro session helpers
public/                  favicon, patterns, documents, og-image
scripts/                 sync-documents, sitemap, OG image
open-next.config.ts      OpenNext Cloudflare adapter
wrangler.jsonc           Worker config
next.config.ts           Next + security headers + OpenNext dev init
```

---

## Security

- Contact key only on the server (`/api/contact`).
- Security headers in `next.config.ts` (CSP, frame deny, nosniff, referrer, permissions).
- `/documents/*` served with `X-Robots-Tag: noindex`.
- `personal/` and `public/documents/` gitignored for source PDFs; documents sync at build time.

---

## Accessibility

Motion disabled under `prefers-reduced-motion`. Intro never blocks content forever (stall-safety timeout).
