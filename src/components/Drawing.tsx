"use client";

import { useEffect, useRef } from "react";

// Where the pen starts and finishes, as fractions of the viewport height,
// measured on the drawn line itself (not the square box around it).
const START = 0.88; // the whole line is on screen, above 88%: pen down
const END = 0.28; // the line's centre reaches 28% down the screen: finished
// How quickly the pen catches up with the scroll (ms). Smooths out wheel steps.
const LAG_MS = 90;
// After a jump link lands on a drawing, it finishes itself at this slower pace.
const JUMP_LAG_MS = 320;

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

    // Where the scroll alone puts the pen. Not clamped: below 0 and above 1
    // still say how far off the drawing span the scroll is.
    const scrolled = () => {
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
      return (from - centre) / (from - to);
    };
    const clamp = (n: number) => Math.min(1, Math.max(0, n));

    // Arriving by a link (the day line, or a #roast address) can land short of
    // END, which would leave the drawing half done. So a jump finishes it, and
    // afterwards scrolling up from that spot rubs it out over the same span.
    let jumping = false;
    let base: number | null = null; // scroll progress where the jump landed
    // Scrolling up from a landing rubs the line out at the usual pace; scrolling
    // back down past the landing spot is fully drawn again. Once rubbed out (or
    // scrolled past the end), it's back to plain scroll and nothing jumps.

    const onScreen = () => {
      const r = svg.getBoundingClientRect();
      return r.bottom > 0 && r.top < window.innerHeight;
    };

    const target = () => {
      const raw = scrolled();
      if (jumping) return onScreen() ? 1 : clamp(raw);
      if (base === null) return clamp(raw);
      const p = raw >= base ? 1 : 1 - (base - raw);
      if (p <= 0 || raw >= 1) base = null;
      return clamp(p);
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
      const lag = jumping && goal > current ? JUMP_LAG_MS : LAG_MS;
      current += (goal - current) * (1 - Math.exp(-dt / lag));
      if (Math.abs(goal - current) < 0.001) current = goal;
      paint(current);
      frame = current === goal ? 0 : requestAnimationFrame(tick);
      if (!frame) last = 0;
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(tick);
    };

    // A jump is over once the (smooth) scroll has been still for a moment.
    let settle = 0;
    const onJumpScroll = () => {
      clearTimeout(settle);
      settle = window.setTimeout(() => {
        window.removeEventListener("scroll", onJumpScroll);
        const raw = scrolled();
        base = raw < 1 ? raw : null;
        jumping = false;
        onScroll();
      }, 180);
      onScroll();
    };
    const jump = () => {
      jumping = true;
      base = null;
      window.addEventListener("scroll", onJumpScroll, { passive: true });
      onJumpScroll();
    };
    const containsMe = (hash: string) => {
      const el = hash.length > 1 ? document.getElementById(decodeURIComponent(hash.slice(1))) : null;
      return !!el && el.contains(svg);
    };
    const onClick = (e: MouseEvent) => {
      const a = (e.target as Element | null)?.closest?.("a[href^='#']");
      if (a instanceof HTMLAnchorElement && containsMe(a.hash)) jump();
    };
    document.addEventListener("click", onClick);
    if (containsMe(location.hash)) jump();

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
          if (!jumping) {
            current = target();
            paint(current);
          }
        }
      },
      { rootMargin: "20% 0px" },
    );
    io.observe(svg);

    return () => {
      io.disconnect();
      clearTimeout(settle);
      document.removeEventListener("click", onClick);
      window.removeEventListener("scroll", onJumpScroll);
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
