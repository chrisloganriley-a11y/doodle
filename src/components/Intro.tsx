"use client";

import { useEffect, useRef } from "react";

// The wordmark as one continuous pen line (brand/assets/logo/doodle-wordmark-editable-line.svg).
// Same viewBox and weight as the outlined file in the header, so it lands on it exactly.
const WORDMARK_LINE =
  "M 41.3 75.6 C 38.8 70.0, 28.1 68.4, 22.4 75.6 C 14.9 85.2, 18.7 100, 30 100 C 37.6 100, 43.2 92.4, 43.9 85.2 C 45.9 63.9, 52.9 30.3, 48.9 19.2 C 46.9 14, 38.9 15.7, 38.9 26.9 C 38.9 50.1, 40.9 82.8, 44.9 96 C 46.9 104, 54.9 104, 60.9 98 C 64.9 92, 72.1 77, 78.1 76 C 68.5 74.8, 66.3 89.0, 68.5 96.2 C 71.0 103.5, 85.2 103.5, 88.8 93.8 C 92.3 84.2, 85.2 74.8, 78.1 76 C 82.8 76, 87.7 78.5, 94.6 77.2 C 104.4 74.0, 126.7 68.9, 115.8 70 C 105.5 68.7, 103.0 84.0, 105.5 91.9 C 108.1 99.7, 123.5 99.7, 127.3 89.2 C 131.1 78.9, 123.5 68.7, 115.8 70 C 120.9 70, 126.1 72.7, 133.7 71.3 C 141.7 68.3, 154.2 65.0, 164.2 73.0 C 161.4 66.8, 149.5 65.0, 143.2 73.0 C 134.9 83.6, 139.1 100, 151.6 100 C 160.0 100, 166.3 91.6, 167.0 83.6 C 169.0 57.2, 176.0 17.4, 172.0 4.1 C 170.0 -2, 162.0 0.0, 162.0 13.3 C 162.0 40.8, 164.0 79.6, 168.0 96 C 170.0 106, 181.0 106, 188.0 97 C 195.0 88, 213.0 52.2, 212.0 25.9 C 212.0 14, 202.0 12, 201.0 24.2 C 200.0 48.0, 201.0 79.5, 204.0 93 C 206.0 101, 213.0 101, 218.0 95 C 224.0 93, 236.0 83.9, 236.0 80.1 C 236.0 75.0, 226.0 75.0, 224.0 83.9 C 222.0 94.0, 230.0 101.9, 242.0 95.9 C 250.0 92.1, 256.0 83.9, 260.0 77.9";

const DRAW_MS = 1900; // the pen writing "doodle"
const HOLD_MS = 250; // a beat with the pen lifted
const MOVE_MS = 850; // the wordmark settling into the header
const RISE_MS = 4000; // long enough for the tagline to type and the hero to rise

// Runs before first paint (see page.tsx). Plays the intro only on a fresh,
// full load of the top of the page, once per tab, and never for reduced motion.
export const INTRO_SCRIPT = `(function(){try{
var d=document.documentElement;
if(location.hash||matchMedia("(prefers-reduced-motion: reduce)").matches)return;
if(sessionStorage.getItem("doodle-intro"))return;
sessionStorage.setItem("doodle-intro","1");
d.dataset.intro="play";
}catch(e){}})();`;

// Draws the wordmark in the middle of a blank page, then moves it into the
// header and lets the rest of the page in. Hidden unless html[data-intro="play"].
export function Intro() {
  const svgRef = useRef<SVGSVGElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = document.documentElement;
    if (root.dataset.intro !== "play") return;
    const svg = svgRef.current;
    const overlay = overlayRef.current;
    const target = document.querySelector<HTMLElement>("[data-intro-target]");
    if (!svg || !overlay || !target) {
      root.dataset.intro = "done";
      return;
    }

    const timers: number[] = [];
    const later = (fn: () => void, ms: number) => timers.push(window.setTimeout(fn, ms));
    let finished = false;

    // Swap the drawn line for the real header wordmark and drop the overlay.
    const land = () => {
      target.dataset.landed = "";
      overlay.dataset.phase = "landed";
    };
    svg.addEventListener("transitionend", (e) => e.propertyName === "transform" && land());

    const finish = () => {
      if (finished) return;
      finished = true;
      root.dataset.intro = "done";
      // Clear the flag once the hero has risen, so soft navigations back here
      // don't replay the entrance.
      later(() => delete root.dataset.intro, RISE_MS);
    };

    const move = () => {
      const from = svg.getBoundingClientRect();
      const to = target.getBoundingClientRect();
      const s = to.width / from.width;
      svg.style.transition = `transform ${MOVE_MS}ms var(--ease-out)`;
      svg.style.transform = `translate(${to.left - from.left}px, ${to.top - from.top}px) scale(${s})`;
      overlay.dataset.phase = "moving";
      // Start the page rising a touch before the wordmark lands.
      later(finish, MOVE_MS * 0.6);
    };

    // Let the erased frame paint, then draw.
    requestAnimationFrame(() =>
      requestAnimationFrame(() => {
        svg.dataset.state = "drawing";
        later(move, DRAW_MS + HOLD_MS);
      }),
    );

    // Any key or tap skips straight to the page.
    const skip = () => {
      land();
      if (finished) return;
      timers.forEach(clearTimeout);
      finish();
    };
    window.addEventListener("keydown", skip, { once: true });
    overlay.addEventListener("pointerdown", skip, { once: true });

    return () => {
      timers.forEach(clearTimeout);
      window.removeEventListener("keydown", skip);
    };
  }, []);

  return (
    <div ref={overlayRef} aria-hidden="true" className="intro">
      <svg
        ref={svgRef}
        viewBox="8.9 -8 257.1 120"
        className="intro-mark"
        style={{ "--draw-ms": `${DRAW_MS}ms` } as React.CSSProperties}
      >
        <path
          d={WORDMARK_LINE}
          pathLength={1}
          fill="none"
          stroke="currentColor"
          strokeWidth={2.4}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}
