# Frontend — Sriram Kancherla Portfolio

Next.js App Router site deployed to Cloudflare Workers via [`@opennextjs/cloudflare`](https://opennext.js.org/cloudflare).

**Live:** [sriramkancherla.pages.dev](https://sriramkancherla.pages.dev)

## Tech stack

| Layer | Choice |
|-------|--------|
| Framework | Next.js (App Router) + TypeScript |
| Styling | Tailwind CSS + design tokens in `globals.css` |
| Fonts | `next/font` — Inter, Inter Tight, JetBrains Mono |
| Host | Cloudflare Workers (OpenNext) |
| Contact | Client → Web3Forms API |

## Signature interactions

- **SK curtain intro** — once per session; respects `prefers-reduced-motion`
- **WaferField** — interactive wafer die-map in the hero (cursor reveal)
- **Scroll reveals** — staggered section entrances
- **Expandable project cards** — problem / approach / status detail

## Routes

| Path | Purpose |
|------|---------|
| `/` | Home |
| `/resume` | PDF viewer |

## Local development

```bash
npm install
cp .env.example .env.local   # fill in keys
npm run dev                  # http://localhost:3000
```

Preview in the Workers runtime:

```bash
npm run preview
```

## Deploy

```bash
npm run deploy
```

Set in `.env.local` (or CI) before build:

```
NEXT_PUBLIC_SITE_URL=https://sriramkancherla.pages.dev
NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY=your-key
```

Enable **domain restriction** for the Web3Forms key in their dashboard.

## Environment variables

| Name | When | Purpose |
|------|------|---------|
| `NEXT_PUBLIC_SITE_URL` | Build | Canonical, OG, sitemap |
| `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY` | Build | Contact form (public by design — domain-restrict in Web3Forms) |

## Security

- Security headers in `next.config.ts` (CSP, `X-Frame-Options`, nosniff, referrer, permissions)
- `/documents/*` served with `X-Robots-Tag: noindex`
- Private PDFs stay in `data/documents/_originals/` — never synced to `public/`
