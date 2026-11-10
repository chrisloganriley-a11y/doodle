import type { Metadata } from "next";
import Link from "next/link";
import { Drawing } from "@/components/Drawing";
import { roasts } from "@/components/roasts";
import { SignupForm } from "@/components/SignupForm";

// The page every bag's QR code points to ("say hi →"). The address is printed
// on packaging, so /hi must never move.

export const metadata: Metadata = {
  title: "hi · doodle",
  description: "reorder, brew it well, and find the cart. the page on the back of every doodle bag.",
  alternates: { canonical: "/hi" },
};

// Plain-language starting points. The roaster may tune these once beans are picked.
const brew: Record<string, { method: string; steps: string[] }> = {
  daydream: {
    method: "pour-over",
    steps: [
      "22 g coffee, ground like table salt, to 350 g water just off the boil.",
      "wet the grounds with a splash, wait 30 seconds, then pour the rest slowly in circles.",
      "aim to finish in about 3 minutes. bitter: grind coarser. sour or thin: finer.",
    ],
  },
  "the-usual": {
    method: "espresso, or a latte",
    steps: [
      "18 g coffee in, about 36 g of espresso out, in 25 to 30 seconds.",
      "for a latte, pour it into 150 to 200 g of steamed milk.",
      "no machine: a moka pot or a strong french press works fine.",
    ],
  },
  "late-show": {
    method: "drip machine",
    steps: [
      "about 60 g coffee per litre of water, or two tablespoons per mug.",
      "medium grind, like sand.",
      "drink it after 3pm and sleep anyway.",
    ],
  },
};

export default function Hi() {
  return (
    <>
      <header className="px-[var(--gutter)]">
        <div className="mx-auto flex h-[72px] max-w-[1080px] items-center justify-between">
          <Link href="/" aria-label="doodle, home">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/brand/doodle-wordmark-periwinkle.svg" alt="doodle" className="h-auto w-[104px] sm:w-[124px]" />
          </Link>
          <nav aria-label="on this page" className="flex gap-5 text-[13px] sm:gap-8 sm:text-[15px]">
            <a href="#reorder" className="link-hl inline-flex min-h-11 items-center">reorder</a>
            <a href="#brew" className="link-hl inline-flex min-h-11 items-center">brew</a>
            <a href="#cart" className="link-hl inline-flex min-h-11 items-center">the cart</a>
          </nav>
        </div>
      </header>

      <main className="px-[var(--gutter)]">
        <div className="mx-auto max-w-[1080px]">
          <section className="pb-16 pt-12 sm:pt-20">
            <h1 className="serif text-[clamp(52px,9vw,96px)]">
              hi. you found <span className="hl">us</span>.
            </h1>
            <p className="mt-6 max-w-[44ch] text-[16px]">
              this is the page on the back of every bag. how to get more, how to brew it, and where
              the cart is.
            </p>
          </section>

          <section id="reorder" aria-labelledby="reorder-h" className="border-t border-ink/30 py-16">
            <h2 id="reorder-h" className="serif text-[clamp(36px,5vw,56px)]">reorder</h2>
            <p className="mt-6 max-w-[48ch] text-[15px]">
              the shop isn&apos;t open yet. for now, bags live at the cart. subscriptions are
              coming: pick yours up at the cart each time, or have two or more sent to you. leave
              your email and we&apos;ll tell you when.
            </p>
            <div className="mt-8">
              <SignupForm button="tell me when" />
            </div>
          </section>

          <section id="brew" aria-labelledby="brew-h" className="border-t border-ink/30 py-16">
            <h2 id="brew-h" className="serif text-[clamp(36px,5vw,56px)]">brew it well</h2>
            <p className="mt-6 max-w-[48ch] text-[15px]">
              starting points, not rules. weigh things if you can; it&apos;s the easiest way to get the
              same good cup twice.
            </p>
            <div className="mt-12 grid gap-16">
              {roasts.map((r) => (
                <article
                  key={r.id}
                  id={`brew-${r.id}`}
                  aria-labelledby={`brew-${r.id}-h`}
                  className="grid items-start gap-x-12 gap-y-6 sm:grid-cols-[160px_1fr]"
                >
                  <Drawing d={r.drawing} label={r.drawingLabel} className="w-[120px] sm:w-[160px]" />
                  <div>
                    <h3 id={`brew-${r.id}-h`} className="serif text-[clamp(32px,4vw,44px)]">
                      {r.name}
                    </h3>
                    <p className="mt-3 text-[15px]">
                      {r.level} · {brew[r.id].method}
                    </p>
                    <ol className="mt-6 grid max-w-[56ch] list-decimal gap-3 pl-5 text-[15px] marker:text-ink/70">
                      {brew[r.id].steps.map((s) => (
                        <li key={s} className="pl-1">{s}</li>
                      ))}
                    </ol>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section id="cart" aria-labelledby="cart-h" className="border-t border-ink/30 py-16">
            <h2 id="cart-h" className="serif text-[clamp(36px,5vw,56px)]">the cart</h2>
            <p className="mt-6 max-w-[48ch] text-[15px]">
              no dates yet. we&apos;re sorting out permits and aiming for early spring. the weekend
              schedule goes here as soon as there is one, and on the list first.
            </p>
            <p className="mt-6 text-[15px]">
              <Link href="/#say-hi" className="link-hl">get on the list →</Link>
            </p>
          </section>
        </div>
      </main>

      <footer className="px-[var(--gutter)] pb-10">
        <div className="mx-auto flex max-w-[1080px] flex-col gap-3 border-t border-ink/30 pt-8 text-[13px] sm:flex-row sm:justify-between">
          <p>pretty good coffee, roasted in philly, pa.</p>
          <p>© 2026 doodle</p>
        </div>
      </footer>
    </>
  );
}
