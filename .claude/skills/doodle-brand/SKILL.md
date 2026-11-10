---
name: doodle-brand
description: Brand rules for doodle coffee (pretty good coffee, roasted in philly). Use whenever building or editing anything visual or written for doodle — the website, landing pages, subscription flow, emails, social posts, labels, menus — so colors, fonts, logo use, voice and illustrations stay on brand.
---

# doodle brand

Before designing or writing anything for doodle, read `brand/BRAND_GUIDELINES.md` (rules) and skim `brand/DESIGN_BRIEF.md` (who it's for). Use the files in `brand/assets/` and the tokens in `brand/tokens/` — never redraw or recolor them.

## Non-negotiables

1. **Logo:** use `brand/assets/logo/doodle-wordmark-periwinkle.svg` as an image. Never type "doodle" in a font as the logo; never add effects.
2. **Color:** white background, periwinkle `#4F57D6` for all text, lines and the logo. Pastels (`blush` #FFB8CD, `butter` #FFE066, `lilac` #CFC6FF) only as a highlighter stroke under a word — never as text color, button fill, card fill or pill.
3. **Type:** headlines and roast names in Fraunces italic, weight 600, `font-variation-settings: "SOFT" 100, "WONK" 1, "opsz" 144`, lowercase. Everything else in DM Mono. No other fonts, no handwriting fonts.
4. **Lowercase** for the wordmark, roast names, nav, buttons, labels and taglines.
5. **Voice:** plain, warm, a little wry. Short sentences. No exclamation marks, no coffee jargon, no emoji. Tagline: "pretty good coffee, roasted in philly."
6. **Roasts:** *daydream* (light, floral; drip; bird; blush), *the usual* (house blend; espresso and lattes; mug; butter), *late show* (decaf; moon; lilac). Drawings live in `brand/assets/drawings/`.
7. **Highlighter:** at most one per view area — under a roast name or the key word of a hero headline. Use the SVGs in `brand/assets/highlighters/` or the `.doodle-highlight` class in `brand/tokens/tokens.css`.
8. **Never:** gradients, drop shadows on brand marks, emoji, stock icons beside the drawings, colored circles behind drawings, red/tomato, cream backgrounds.

## Setup for a web project

- Import `brand/tokens/tokens.css` (or use `brand/tokens/tailwind.preset.js` as a Tailwind preset).
- Copy `brand/assets/icons/*` to the site's public root and paste `brand/assets/icons/head-snippet.html` into `<head>`.
- Buttons: `.doodle-button` (periwinkle fill, white mono lowercase text, 10px corners, 44px tall).
- Text contrast: periwinkle on white is 5.8:1; on `mist` use `navy` for small text.

## Check before calling something done

Lowercase? One ink? At most one highlighter in view? Logo is the SVG file, not text? No pills, gradients or emoji? Copy short and unfussy?
