// Cloudflare Worker in front of the static site. It handles POST /api/subscribe
// and hands every other request to the static assets in ./out.
//
// Kit (kit.com) keeps the list. The API key stays here, server-side:
//   npx wrangler secret put KIT_API_KEY      (Kit → Settings → Developer → API keys, v4)
//   KIT_FORM_ID is set under "vars" in wrangler.jsonc (Kit → Grow → Landing Pages & Forms → the form's id)

interface Env {
  ASSETS: { fetch(request: Request): Promise<Response> };
  KIT_API_KEY?: string;
  KIT_FORM_ID?: string;
}

const KIT = "https://api.kit.com/v4";
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function json(body: Record<string, unknown>, status: number) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json", "cache-control": "no-store" },
  });
}

async function subscribe(request: Request, env: Env): Promise<Response> {
  if (request.method !== "POST") return json({ error: "method" }, 405);
  if (!env.KIT_API_KEY || !env.KIT_FORM_ID) return json({ error: "not_configured" }, 503);

  const form = await request.formData().catch(() => null);
  if (!form) return json({ error: "bad_request" }, 400);

  // A field people can't see. Bots fill it in; tell them it worked and move on.
  if (String(form.get("company") ?? "") !== "") return json({ ok: true }, 200);

  const email = String(form.get("email") ?? "").trim().toLowerCase();
  if (!EMAIL.test(email) || email.length > 254) return json({ error: "invalid_email" }, 422);

  const headers = { "content-type": "application/json", "X-Kit-Api-Key": env.KIT_API_KEY };
  const referrer = request.headers.get("referer") ?? undefined;

  // Kit only adds existing subscribers to a form, so create (or find) them first.
  const created = await fetch(`${KIT}/subscribers`, {
    method: "POST",
    headers,
    body: JSON.stringify({ email_address: email }),
  });
  if (!created.ok) return json({ error: "upstream", step: "subscriber", status: created.status }, 502);

  const added = await fetch(`${KIT}/forms/${encodeURIComponent(env.KIT_FORM_ID)}/subscribers`, {
    method: "POST",
    headers,
    body: JSON.stringify({ email_address: email, referrer }),
  });
  if (!added.ok) return json({ error: "upstream", step: "form", status: added.status }, 502);

  return json({ ok: true }, 200);
}

const worker = {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    if (url.pathname === "/api/subscribe") return subscribe(request, env);
    return env.ASSETS.fetch(request);
  },
};

export default worker;
