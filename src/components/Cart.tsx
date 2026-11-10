import { WORDMARK_LINE } from "./wordmark";

// The cart, in the same single periwinkle line as the roast drawings, with the
// wordmark big on the front (brand guidelines: white cart, large wordmark).
// After the intro it rolls in from the right as the wordmark settles
// (.cart-roll in globals.css); otherwise it's simply there.
const STROKES = [
  // the pavement
  "M 18 354 C 130 350, 280 356, 404 351",
  // wheels, each a loop with a hub
  "M 134 326 C 134 340, 123 350, 110 350 C 96 350, 86 340, 86 326 C 86 312, 97 302, 110 302 C 124 302, 134 312, 134 326 M 112 326 C 112 328, 108 328, 108 326 C 108 324, 112 324, 112 326",
  "M 334 326 C 334 340, 323 350, 310 350 C 296 350, 286 340, 286 326 C 286 312, 297 302, 310 302 C 324 302, 334 312, 334 326 M 312 326 C 312 328, 308 328, 308 326 C 308 324, 312 324, 312 326",
  // the body, and the counter on top
  "M 64 176 C 62 216, 61 256, 62 292 C 62 299, 66 302, 74 302 C 160 301, 260 302, 346 300 C 354 300, 358 296, 358 289 C 359 252, 358 214, 356 176",
  "M 40 174 C 140 170, 280 172, 382 169",
  // poles and the scalloped awning
  "M 80 170 C 79 144, 80 118, 78 92 M 340 168 C 341 142, 340 116, 342 92",
  "M 52 84 C 50 62, 58 44, 76 42 C 160 37, 260 38, 344 41 C 362 43, 370 62, 368 84 q -31.6 22 -63.2 0 q -31.6 22 -63.2 0 q -31.6 22 -63.2 0 q -31.6 22 -63.2 0 q -31.6 22 -63.2 0",
  // the handle, with a little loop for a grip
  "M 358 208 C 376 206, 390 198, 396 180 C 399 170, 410 168, 409 178 C 408 186, 398 186, 397 178",
];

// Indices into STROKES: what stays put, what turns, what rides along.
const PAVEMENT = STROKES[0];
const WHEELS = [
  { d: STROKES[1], hub: "110px 326px" },
  { d: STROKES[2], hub: "310px 326px" },
];
const BODY = STROKES.slice(3);

export function Cart({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 420 380"
      role="img"
      aria-label="the doodle cart: a little white cart with an awning and the doodle wordmark on the front"
      className={`cart ${className}`}
    >
      <g
        fill="none"
        stroke="currentColor"
        strokeWidth={2.8}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d={PAVEMENT} />
        {/* after the intro, everything here rolls in from the right (.cart-roll in globals.css) */}
        <g className="cart-roll">
          <g className="cart-rock">
            {BODY.map((d, k) => (
              <path key={k} d={d} />
            ))}
            {/* the wordmark on the front, centred on the panel; writes itself once the cart parks */}
            <path
              d={WORDMARK_LINE}
              pathLength={1}
              transform="translate(100 196) scale(0.8)"
              strokeWidth={3.2}
              className="cart-mark"
            />
          </g>
          {WHEELS.map((w) => (
            <path
              key={w.hub}
              d={w.d}
              className="cart-wheel"
              style={{ transformOrigin: w.hub }}
            />
          ))}
        </g>
      </g>
    </svg>
  );
}
