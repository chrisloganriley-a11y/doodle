# doodle — website

pretty good coffee, roasted in philly. The site for [doodlecoffee.shop](https://doodlecoffee.shop).

Next.js static export + Tailwind, served by Cloudflare Workers static assets. Brand kit in `brand/`, product record in `PRODUCT.md`.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # static site in ./out
npm run preview    # build, then serve it the way Cloudflare will
npm run deploy     # build, then wrangler deploy
```

## Pages

- `/` — the launch page
- `/hi` — the page every bag's QR code points to (reorder, brew guide, the cart). **It's printed on packaging, so never move it.**

## Email signup (Kit)

The form POSTs to `/api/subscribe`, handled by the Worker in `worker/index.ts`. The Worker creates the subscriber in Kit and adds them to a form, keeping the API key server-side. It has a honeypot field for bots. Until Kit is configured, it returns 503 and the form says signups aren't on yet, so it never pretends to save an address.

1. Create a free Kit account and a form (Grow → Landing Pages & Forms). Copy the form's id from its URL.
2. Put the id in `wrangler.jsonc` → `vars.KIT_FORM_ID`.
3. Create a v4 API key (Settings → Developer) and run `npx wrangler secret put KIT_API_KEY`.
4. `npm run preview` and submit a real address to test, then `npm run deploy`.

`/api/subscribe` only exists under `npm run preview` or once deployed. Under `npm run dev`, the form shows "not switched on".

## Domain: Porkbun → Cloudflare (one time)

1. **Cloudflare:** Add a site → `doodlecoffee.shop` → Free plan. Cloudflare shows two nameservers.
2. **Porkbun:** Domain Management → doodlecoffee.shop → Authoritative Nameservers → replace Porkbun's with the two Cloudflare ones. Delete Porkbun's default parking/URL-forward records first, if any. Turn DNSSEC off at Porkbun until the move is done.
3. Wait for Cloudflare to say the zone is **Active** (minutes to a few hours).
4. `npx wrangler login`, then `npm run deploy`. The `routes` entry in `wrangler.jsonc` attaches `doodlecoffee.shop` and creates its DNS record.
5. **www → bare domain:** in Cloudflare DNS, add `AAAA www 100::` (proxied). Then Rules → Redirect Rules → "Redirect from WWW to root" template → 301 to `https://doodlecoffee.shop${path}`, keeping the query string.
6. SSL/TLS → Edge Certificates: turn on Always Use HTTPS.
