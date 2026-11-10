"use client";

import { useEffect, useRef } from "react";
import { WORDMARK_LINE } from "./wordmark";


const DRAW_MS = 1900; // the pen writing "doodle"
const HOLD_MS = 250; // a beat with the pen lifted
const MOVE_MS = 850; // the wordmark settling into the header
const RISE_MS = 5600; // long enough for the tagline, the hero and the cart to finish

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
