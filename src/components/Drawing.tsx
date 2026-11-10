"use client";

import { useEffect, useRef, useState } from "react";

type State = "rest" | "armed" | "drawn";

// One brand drawing that draws itself in a single stroke the first time it
// scrolls into view. Server HTML shows it finished, so it is never missing.
export function Drawing({
  d,
  label,
  className = "",
}: {
  d: string;
  label: string;
  className?: string;
}) {
  const ref = useRef<SVGSVGElement>(null);
  const [state, setState] = useState<State>("rest");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // Already on screen at load: leave it drawn rather than erase it.
    if (el.getBoundingClientRect().top < window.innerHeight) return;

    setState("armed");
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Let the armed (erased) frame paint before drawing.
          requestAnimationFrame(() => setState("drawn"));
          io.disconnect();
        }
      },
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <svg
      ref={ref}
      viewBox="0 0 160 160"
      role="img"
      aria-label={label}
      data-state={state}
      className={`drawing ${className}`}
    >
      <path
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
