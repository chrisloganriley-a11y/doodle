"use client";

import { useEffect, useState } from "react";
import { roasts } from "./roasts";

// Where each roast sits along the day, as a share of the line's width.
const STOPS = [0, 0.5, 1];

// A hand-wobbled line the width of the page; y stays within ±2 of 18.
const LINE =
  "M 2 19 C 120 16, 230 21, 350 18 S 560 16, 700 18.5 S 930 21, 1060 17.5 S 1290 17, 1398 19";

function useActiveRoast() {
  const [active, setActive] = useState(-1);
  useEffect(() => {
    const sections = roasts
      .map((r) => document.getElementById(r.id))
      .filter((el): el is HTMLElement => el !== null);
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setActive(roasts.findIndex((r) => r.id === e.target.id));
          }
        }
      },
      // A section counts as "now" while it crosses the middle of the screen.
      { rootMargin: "-45% 0px -45% 0px" },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);
  return active;
}

export function DayLine({ compact = false }: { compact?: boolean }) {
  const active = useActiveRoast();
  const dotAt = active >= 0 ? STOPS[active] : null;

  return (
    <nav aria-label="the day, by roast" className="relative w-full">
      {!compact && (
        <div aria-hidden="true" className="mb-3 grid grid-cols-3">
          {roasts.map((r, i) => (
            <svg
              key={r.id}
              viewBox="0 0 160 160"
              className={`w-14 sm:w-20 ${
                i === 0
                  ? "justify-self-start"
                  : i === 1
                    ? "justify-self-center"
                    : "justify-self-end"
              }`}
            >
              <path
                d={r.drawing}
                fill="none"
                stroke="currentColor"
                strokeWidth={4}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          ))}
        </div>
      )}
      <div className="relative">
        <svg
          viewBox="0 0 1400 36"
          preserveAspectRatio="none"
          aria-hidden="true"
          className={compact ? "block h-4 w-full" : "block h-9 w-full"}
        >
          <path
            d={LINE}
            fill="none"
            stroke="currentColor"
            strokeWidth={compact ? 1.25 : 2}
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
        <span
          aria-hidden="true"
          className="absolute rounded-full bg-ink transition-[left,opacity] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none"
          style={{
            width: compact ? 9 : 13,
            height: compact ? 9 : 13,
            top: compact ? 8 - 4.5 : 18 - 6.5,
            // Sit on the line at the stop, kept inside the line's ends.
            left: `calc(${(dotAt ?? 0) * 100}% - ${(dotAt ?? 0) * (compact ? 9 : 13)}px)`,
            opacity: dotAt === null ? 0 : 1,
          }}
        />
      </div>
      <ol className="relative mt-1 grid grid-cols-3">
        {roasts.map((r, i) => (
          <li
            key={r.id}
            className={
              i === 0
                ? "justify-self-start"
                : i === 1
                  ? "justify-self-center"
                  : "justify-self-end"
            }
          >
            <a
              href={`#${r.id}`}
              aria-current={active === i ? "location" : undefined}
              className={`group flex flex-col no-underline ${
                i === 0 ? "items-start" : i === 1 ? "items-center" : "items-end"
              } ${compact ? "py-1" : "min-h-11 py-2"}`}
            >
              <span
                className={`tabular-nums ${compact ? "text-[12px]" : "text-[13px] sm:text-[15px]"} ${
                  active === i ? "font-medium" : ""
                }`}
              >
                {r.time}
              </span>
              {!compact && (
                <span className="serif text-[20px] group-hover:underline group-hover:decoration-1 group-hover:underline-offset-4 sm:text-[26px]">
                  {r.name}
                </span>
              )}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
