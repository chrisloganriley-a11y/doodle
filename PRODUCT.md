# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Next.js (App Router) static export + Tailwind v4, deployed as Cloudflare Workers static assets (`wrangler.jsonc`, `./out`), the same pattern as the owner's `coffee` repo. Domain: doodlecoffee.shop (registered at Porkbun, DNS on a free Cloudflare account). The bare domain is the main address and `www` redirects to it.

## Users

Primary: urban 28–40-year-olds in Philadelphia who make coffee at home every morning. They buy specialty coffee but aren't coffee nerds, and they choose things partly by how they look on the counter. Many first meet doodle at the cart, or scan the QR code on a bag's back label.

Secondary: gift buyers, and cafe regulars who meet doodle at the cart.

## Product Purpose

doodle is a coffee cart and drop-ship coffee brand in Philadelphia, white-labeled from a local Philly roaster. The cart is where people try it; the bag at home, bought at the cart or by subscription, is the business.

Site v1 is a launch page, not a shop. It introduces the brand and the three roasts, says where the cart will be, collects emails during the 1–3 months of permits, and holds the page the bag's QR code points to (reorder, brew guide, cart schedule).

Success, first season: people who try a cup at the cart buy a bag, and bag buyers come back for a second. Track bags sold per cart weekend, and the share of first-time buyers who reorder within six weeks.

## Positioning

Specialty coffee without the snobbery, drawn by hand, roasted in Philly. A pantry brand people leave on display (the Graza move) applied to the morning bag. "pretty good coffee" undersells on purpose and lets the coffee prove itself. Philly's scene is cafes and hybrid shops; no one owns a playful coffee brand you take home.

## Operating Context

- People reach the site from the cart (word of mouth, cups), from Instagram, and from the QR code on the back of a bag ("say hi →").
- Mostly on phones, often outdoors at the cart or in a kitchen in the morning.

## Capabilities and Constraints

- v1 has no checkout. A shop and subscriptions come later, once the roaster confirms fulfillment.
- Email signup: provider undecided. The form is built against a placeholder endpoint.
- Lineup at launch: *daydream* (light roast, drip/pour-over), *the usual* (house medium blend, espresso or latte), *late show* (decaf, after 3pm). Tasting notes are placeholders until the roaster picks the beans.
- Cart schedule: no dates or locations confirmed yet. Don't invent them.
- Prices are not final. Don't publish them.
- Trademark for "doodle" not yet cleared.

## Brand Commitments

Binding: `brand/BRAND_GUIDELINES.md`, `brand/DESIGN_BRIEF.md`, `brand/tokens/`, and the `doodle-brand` skill.

- Voice: plain, warm, a little wry. Lowercase everywhere for the wordmark, roast names, labels, buttons and taglines. Short sentences, no exclamation marks, no coffee jargon, no emoji.
- Logo: use the drawn SVG; never retype "doodle" in a font.
- Feel: like a note someone left you, not an ad. Calm, handmade, one ink. Not kraft-paper serious, maximalist, cartoonish, techy, or generated-looking.

## Evidence on Hand

- Logo, symbol, icons: `brand/assets/logo/`, `brand/assets/icons/`
- Drawings: `brand/assets/drawings/` (bird, mug, moon; spare fish and cat)
- Highlighter strokes: `brand/assets/highlighters/`
- Bag lineup mockup: `brand/assets/mockups/bag-lineup.png`
- No photos yet. Don't use stock photos as stand-ins.
- No customers, testimonials, press, or cart dates exist. Don't fabricate any.

## Product Principles

1. The bag is the business. Every part of the site leads toward taking coffee home.
2. Undersell, then deliver. Never claim more than "pretty good."
3. Honest about being early: say what's coming without inventing dates, prices or reviews.
4. Phone first. The visitor is at the cart or in a kitchen.

## Accessibility & Inclusion

WCAG 2.1 AA. Periwinkle on white is 5.8:1. No text on pastel. Touch targets at least 44px.
