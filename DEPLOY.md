# Deploying to Cloudflare Pages

## What changed to make this work

Pages hosts static files. Your app was configured for Cloudflare Workers via
OpenNext, which builds a server bundle Pages can't run. Two changes fixed that:

**`frontend/next.config.ts`** now sets `output: "export"` and
`trailingSlash: true`. Next.js writes a fully static site to `frontend/out/`.

**`frontend/public/_headers`** now carries the security headers. Under
`output: "export"` Next ignores the `headers()` block in `next.config.ts`, so
that file is the only place they're set now — Cloudflare Pages applies it at the
edge. **If you ever change the CSP, change it there.** The `connect-src` line is
what lets the contact form reach Web3Forms; get it wrong and the form dies
silently.

This costs you nothing. Every route in your app already prerendered — there are
no API routes, no middleware, no server actions, no `next/image`. The static
export is the complete site, not a reduced version of it.

> **One thing worth knowing:** Workers *also* deploys from GitHub — it's called
> Workers Builds, and it auto-deploys on push exactly like Pages. GitHub support
> wasn't a reason to prefer Pages. But since your site is fully static, Pages is
> a clean fit and simpler to reason about. The old Workers config is preserved at
> `_to_delete/next.config.workers.ts.bak` if you ever want to switch back.

---

## Setting up Pages

1. Push your commits to GitHub.

2. Cloudflare dashboard → **Workers & Pages** → **Create** → **Pages** →
   **Connect to Git** → authorise GitHub → pick the repo.

3. Configure the build:

   | Setting | Value |
   | --- | --- |
   | Framework preset | **Next.js (Static HTML Export)** |
   | Root directory | **`frontend`** |
   | Build command | `npm run build` |
   | Build output directory | `out` |

   **Root directory is the one people miss.** Your app lives in `frontend/`, not
   at the repo root. Leave it blank and the build fails looking for a
   `package.json` that isn't there.

   The checkout includes the whole repo, so `../data/documents` still resolves
   and the prebuild sync works.

4. Add environment variables **before** the first build — see below.

5. Deploy. You'll get `https://<project>.pages.dev`, and every push to `main`
   redeploys automatically.

---

## Environment variables — the part that fails quietly

Anything prefixed `NEXT_PUBLIC_` is **compiled into the JavaScript at build
time**, not read at runtime. So it has to exist on Cloudflare's build machine.
Setting it anywhere else does nothing.

In **Settings → Environment variables → Production**, add both:

| Variable | Value |
| --- | --- |
| `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY` | your Web3Forms key |
| `NEXT_PUBLIC_SITE_URL` | `https://<project>.pages.dev`, or your custom domain |

Skip the first and the site builds fine, loads fine, and the contact form fails
with "The form isn't connected yet" — with nothing in the logs, because the
failure is a missing compile-time constant.

Skip the second and your sitemap, canonical tags and Open Graph metadata all
point at a URL that doesn't exist.

**Also required:** in the Web3Forms dashboard, add your deployed domain to the
key's allowed domains. The key ships inside your JavaScript by design — the
domain allowlist is the thing actually protecting it.

**And clean up the dead secret** left over from the old server-side form:

```bash
cd frontend
npx wrangler secret delete WEB3FORMS_ACCESS_KEY
```

---

## Custom domain

Pages project → **Custom domains** → **Set up a domain**. If the domain's DNS is
already on Cloudflare the record is created for you.

Then update `NEXT_PUBLIC_SITE_URL` to the custom domain and redeploy, or the
sitemap and OG tags keep pointing at `.pages.dev`.

---

## Building locally first

Worth doing once before you wire up Git, so a failure is on your machine and not
in a build log:

```bash
cd ~/Desktop/Projects/Portfolio/frontend
npm run build
npx serve out        # or: python3 -m http.server -d out 4000
```

`out/` should be ~18 MB and contain `index.html`, `resume/index.html`,
`404.html`, `_headers`, `documents/`, and `_next/`.

---

## After the first deploy

- [ ] Home page loads; hero photo appears; wafer map reacts to the cursor
- [ ] `/resume/` renders the PDF and the download button works
- [ ] A certificate link opens — proves `data/documents` synced during the build
- [ ] A project card's **How it works** expands
- [ ] Contact form sends and the mail actually arrives
- [ ] `/sitemap.xml` shows your real domain
- [ ] Phone check: hero stacks, photo above the name

---

## Notes on your current file state

**Every `/documents/*.pdf` the site links to exists** — I checked all seven
against `data/documents/`. Nothing will 404.

**Three PDFs sit in `data/documents/` unreferenced:**
`iitk-dg-business-analytics-excel.pdf`, `iitk-dg-etl.pdf`, `nptel-hci.pdf`. They
get copied into the build but nothing links to them. Harmless — but if you want
them on the Certifications list, send me the titles, issuers and dates.

**`frontend/docs/`** is leftover GitHub Pages output (`index.html`, `404.html`,
`.nojekyll`) from an older setup. Unused by this build; safe to delete.

**`_to_delete/`** at the repo root is ~311 MB of the old app and stale build
output. Gitignored, so it won't deploy — but it's sitting on your disk. I can't
delete files on your machine; drag it to the trash when you're ready. The Workers
config backup lives in there, so grab that first if you might want it.
