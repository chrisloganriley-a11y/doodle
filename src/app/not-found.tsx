// Path copied as drawn from brand/assets/drawings/alt-sleeping-cat.svg.
import Link from "next/link";
import { Drawing } from "@/components/Drawing";

const SLEEPING_CAT =
  "M 26 118 C 48 130, 112 132, 132 116 C 148 102, 142 72, 114 64 C 96 60, 80 64, 72 72 C 70 64, 68 58, 64 52 C 60 58, 58 64, 58 70 C 52 66, 46 62, 40 60 C 42 68, 44 74, 46 80 C 40 92, 46 106, 62 106 C 74 106, 80 98, 80 92 C 92 100, 108 104, 120 98 C 128 94, 126 84, 118 86 C 112 88, 116 98, 126 100 M 52 88 C 56 91, 60 91, 64 88";

export default function NotFound() {
  return (
    <main className="flex min-h-svh flex-col items-start justify-center gap-6 px-[var(--gutter)] py-16">
      <Drawing d={SLEEPING_CAT} label="a sleeping cat" className="w-[200px]" />
      <h1 className="serif text-[clamp(44px,7vw,80px)]">nothing here.</h1>
      <p className="max-w-[40ch] text-[15px]">
        this page is asleep, or never existed. the coffee is back this way.
      </p>
      <Link
        href="/"
        className="inline-flex min-h-11 items-center rounded-doodle bg-ink px-6 text-[15px] text-paper no-underline hover:bg-navy"
      >
        back to doodle
      </Link>
    </main>
  );
}
