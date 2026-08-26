# backend/

A standalone Cloudflare Worker. It deploys on its own, separately from the
frontend, and today it exists so there is somewhere obvious to put server code
as the site grows.

## What is and isn't here

`GET /health` is the only route. The contact form is **not** here — it lives at
`frontend/src/app/api/contact/route.ts`, because Next.js route handlers have to
sit inside the Next app to be deployed with it. Moving it here would mean a
second deploy, a CORS round trip, and an environment variable, all for one form.
When there's a real reason to move it, the CORS layer below is already built.

## Running it

```bash
cd backend
npm install
cp .dev.vars.example .dev.vars   # then fill in any secrets
npm run dev                      # http://localhost:8787/health
```

## Adding a route

Add an entry to the `routes` map in `src/index.ts`, keyed `"METHOD /path"`:

```ts
const routes: Record<string, Handler> = {
  "GET /health": () => json({ ok: true, service: "portfolio-backend" }),
  "POST /subscribe": async (request, env) => {
    const body = await request.json();
    // ...
    return json({ ok: true });
  },
};
```

CORS, preflight, 404s, 405s, and error handling are applied around every route.
A request from an origin not in `ALLOWED_ORIGINS` is rejected with a 403 rather
than answered and blocked in the browser.

## Configuration

| Name | Where it lives | Purpose |
| --- | --- | --- |
| `ALLOWED_ORIGINS` | `vars` in `wrangler.jsonc` | Comma-separated origins permitted to call the Worker. **Add the deployed frontend origin before going live** — it currently only allows `localhost:3000`. |
| Secrets | `wrangler secret put NAME`, or `.dev.vars` locally | API keys and tokens. Never put a secret in `wrangler.jsonc` — that file is committed. |

## Deploying

```bash
cd backend
npm run deploy      # wrangler deploy
npm run tail        # live logs
```
