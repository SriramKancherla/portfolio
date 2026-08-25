const LIMITS = { name: 100, email: 254, subject: 200, message: 5000 };

function json(data: unknown, status = 200) {
  return Response.json(data, {
    status,
    headers: { Accept: "application/json" },
  });
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

/** POST /api/contact — proxies to Web3Forms; key stays server-side. */
export async function POST(request: Request) {
  const key = String(process.env.WEB3FORMS_ACCESS_KEY || "").trim();
  if (!key) {
    return json(
      {
        success: false,
        message:
          "Contact form is not configured. Set WEB3FORMS_ACCESS_KEY as a Cloudflare Worker secret (wrangler secret put WEB3FORMS_ACCESS_KEY), then redeploy.",
      },
      503,
    );
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return json({ success: false, message: "Invalid JSON body." }, 400);
  }

  // Honeypot — bots fill this; humans never see it
  if (body?.botcheck) {
    return json({ success: true, message: "OK" });
  }

  const name = String(body?.name ?? "").trim();
  const email = String(body?.email ?? "").trim();
  const subject = String(body?.subject ?? "").trim();
  const message = String(body?.message ?? "").trim();

  if (!email || !isValidEmail(email)) {
    return json({ success: false, message: "A valid email is required." }, 400);
  }
  if (!message) {
    return json({ success: false, message: "Message is required." }, 400);
  }
  if (
    name.length > LIMITS.name ||
    email.length > LIMITS.email ||
    subject.length > LIMITS.subject ||
    message.length > LIMITS.message
  ) {
    return json({ success: false, message: "Message is too long." }, 400);
  }

  const upstream = await fetch("https://api.web3forms.com/submit", {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({
      access_key: key,
      name: name || "Portfolio visitor",
      email,
      subject: subject || "Portfolio contact",
      message,
      replyto: email,
      from_name: "Portfolio — Sriram Kancherla",
    }),
  });

  let result: { success?: boolean; message?: string } = {};
  try {
    result = await upstream.json();
  } catch {
    result = {};
  }

  if (!upstream.ok || !result.success) {
    return json(
      {
        success: false,
        message: result.message || "Failed to send message.",
      },
      upstream.ok ? 502 : upstream.status,
    );
  }

  return json({ success: true, message: "Message sent." });
}
