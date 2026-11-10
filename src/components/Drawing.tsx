"use client";

import { useEffect, useRef } from "react";

// Where the pen starts and finishes, as fractions of the viewport height,
// measured on the drawn line itself (not the square box around it).
const START = 0.88; // the whole line is on screen, above 88%: pen down
const END = 0.28; // the line's centre reaches 28% down the screen: finished
// How quickly the pen catches up with the scroll (ms). Smooths out wheel steps.
const LAG_MS = 90;

// One brand drawing whose line follows the scroll: scrolling down draws it
// along its pen path, scrolling back up rubs it out the same way. Server HTML
// shows it finished, so it is never missing without JS or with reduced motion.
export function Drawing({
  d,
  label,
  className = "",
}: {
  d: string;
  label: string;
  className?: string;
}) {
  const svgRef = useRef<SVGSVGElement>(null);
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const svg = svgRef.current;
    const path = pathRef.current;
    if (!svg || !path) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const target = () => {
      // The path's own box, so empty space in the viewBox doesn't count.
      const r = path.getBoundingClientRect();
      const vh = window.innerHeight;
      // Near the foot of the page a drawing may never reach END; finish it.
      const atBottom =
        window.scrollY + vh >= document.documentElement.scrollHeight - 2;
      if (atBottom && r.top < vh) return 1;
      const centre = r.top + r.height / 2;
      const from = START * vh - r.height / 2; // centre when the bottom clears START
      const to = END * vh;
      return Math.min(1, Math.max(0, (from - centre) / (from - to)));
    };

    const paint = (p: number) => {
      path.style.strokeDashoffset = String(1 - p);
      // A zero-length dash with round caps still shows a dot; hide it.
      path.style.opacity = p < 0.002 ? "0" : "1";
    };

    let current = target();
    paint(current);

    let frame = 0;
    let last = 0;
    const tick = (now: number) => {
      const dt = last ? now - last : 16;
      last = now;
      const goal = target();
      current += (goal - current) * (1 - Math.exp(-dt / LAG_MS));
      if (Math.abs(goal - current) < 0.001) current = goal;
      paint(current);
      frame = current === goal ? 0 : requestAnimationFrame(tick);
      if (!frame) last = 0;
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(tick);
    };

    // Only listen while the drawing is near the screen.
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          window.addEventListener("scroll", onScroll, { passive: true });
          window.addEventListener("resize", onScroll);
          onScroll();
        } else {
          window.removeEventListener("scroll", onScroll);
          window.removeEventListener("resize", onScroll);
          // Settle off-screen so it's right when it comes back.
          cancelAnimationFrame(frame);
          frame = 0;
          last = 0;
          current = target();
          paint(current);
        }
      },
      { rootMargin: "20% 0px" },
    );
    io.observe(svg);

    return () => {
      io.disconnect();
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 160 160"
      role="img"
      aria-label={label}
      className={`drawing ${className}`}
    >
      <path
        ref={pathRef}
        d={d}
        pathLength={1}
        fill="none"
        stroke="currentColor"
        strokeWidth={2.6}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
