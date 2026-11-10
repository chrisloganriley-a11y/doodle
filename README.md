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

## Email signup

The form POSTs `email` to `NEXT_PUBLIC_SIGNUP_ENDPOINT`, which is read at build time. Until that's set, the form says signups aren't on yet; it never pretends to save an address. Set it in `.env.local` (dev) and in the build environment (deploy) once a provider is picked.

## Domain: Porkbun → Cloudflare (one time)

1. **Cloudflare:** Add a site → `doodlecoffee.shop` → Free plan. Cloudflare shows two nameservers.
2. **Porkbun:** Domain Management → doodlecoffee.shop → Authoritative Nameservers → replace Porkbun's with the two Cloudflare ones. Delete Porkbun's default parking/URL-forward records first, if any. Turn DNSSEC off at Porkbun until the move is done.
3. Wait for Cloudflare to say the zone is **Active** (minutes to a few hours).
4. `npx wrangler login`, then `npm run deploy`. The `routes` entry in `wrangler.jsonc` attaches `doodlecoffee.shop` and creates its DNS record.
5. **www → bare domain:** in Cloudflare DNS, add `AAAA www 100::` (proxied). Then Rules → Redirect Rules → "Redirect from WWW to root" template → 301 to `https://doodlecoffee.shop${path}`, keeping the query string.
6. SSL/TLS → Edge Certificates: turn on Always Use HTTPS.
