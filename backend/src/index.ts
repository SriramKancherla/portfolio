/**
 * Portfolio backend — Cloudflare Worker.
 *
 * Deployed separately from the frontend. Add routes to the `routes` map below;
 * CORS, method matching, and JSON error shapes are handled for you.
 */

export interface Env {
  /** Comma-separated origins allowed to call this Worker. */
  ALLOWED_ORIGINS: string;
}

type Handler = (request: Request, env: Env, ctx: ExecutionContext) => Promise<Response> | Response;

/** `"METHOD /path"` → handler. */
const routes: Record<string, Handler> = {
  "GET /health": () => json({ ok: true, service: "portfolio-backend" }),
};

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const origin = request.headers.get("Origin");
    const allowed = resolveOrigin(origin, env);

    // Preflight
    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: corsHeaders(allowed) });
    }

    // A browser request from a disallowed origin is rejected outright, rather
    // than being answered and then blocked client-side.
    if (origin && !allowed) {
      return withCors(json({ error: "Origin not allowed" }, 403), null);
    }

    const { pathname } = new URL(request.url);
    const handler = routes[`${request.method} ${pathname}`];

    if (!handler) {
      const methodMismatch = Object.keys(routes).some((key) => key.endsWith(` ${pathname}`));
      return withCors(
        methodMismatch
          ? json({ error: `${request.method} not allowed on ${pathname}` }, 405)
          : json({ error: `No route for ${pathname}` }, 404),
        allowed
      );
    }

    try {
      return withCors(await handler(request, env, ctx), allowed);
    } catch (error) {
      // Log the real error; return a generic one. Never leak internals.
      console.error("Unhandled error:", error);
      return withCors(json({ error: "Internal error" }, 500), allowed);
    }
  },
} satisfies ExportedHandler<Env>;

function resolveOrigin(origin: string | null, env: Env): string | null {
  if (!origin) return null;
  const allowList = (env.ALLOWED_ORIGINS ?? "")
    .split(",")
    .map((value) => value.trim())
    .filter(Boolean);
  return allowList.includes(origin) ? origin : null;
}

function corsHeaders(origin: string | null): Record<string, string> {
  if (!origin) return { Vary: "Origin" };
  return {
    "Access-Control-Allow-Origin": origin,
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Max-Age": "86400",
    Vary: "Origin",
  };
}

function withCors(response: Response, origin: string | null): Response {
  const headers = new Headers(response.headers);
  for (const [key, value] of Object.entries(corsHeaders(origin))) {
    headers.set(key, value);
  }
  return new Response(response.body, { status: response.status, headers });
}

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json; charset=utf-8" },
  });
}
