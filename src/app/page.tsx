import { Cart } from "@/components/Cart";
import { DayLine } from "@/components/DayLine";
import { Drawing } from "@/components/Drawing";
import { Intro, INTRO_SCRIPT } from "@/components/Intro";
import { roasts } from "@/components/roasts";
import { SignupForm } from "@/components/SignupForm";
import { TypedLine } from "@/components/TypedLine";

function Wordmark(props: React.ImgHTMLAttributes<HTMLImageElement> & Record<`data-${string}`, string>) {
  // The drawn wordmark, as drawn. Never retyped.
  // eslint-disable-next-line @next/next/no-img-element
  return <img src="/brand/doodle-wordmark-periwinkle.svg" alt="doodle" {...props} />;
}

export default function Home() {
  return (
    <>
      {/* Decides before first paint whether the intro plays (see Intro.tsx). */}
      <script dangerouslySetInnerHTML={{ __html: INTRO_SCRIPT }} />
      <Intro />
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-doodle focus:bg-paper focus:px-4 focus:py-2"
      >
        skip to the coffee
      </a>

      <header className="sticky top-0 z-40 bg-paper/95 px-[var(--gutter)]">
        <div className="mx-auto flex h-[72px] max-w-[1280px] lg:h-[88px] items-center justify-between gap-8">
          <a href="#top" aria-label="doodle, back to the top" className="shrink-0">
            <Wordmark data-intro-target="" className="h-auto w-[112px] sm:w-[132px] lg:w-[164px]" />
          </a>
          <div className="intro-rise hidden w-full max-w-[340px] md:block">
            <DayLine compact />
          </div>
          <a
            href="#say-hi"
            className="link-hl intro-rise inline-flex min-h-11 shrink-0 items-center text-[15px]"
          >
            say hi →
          </a>
        </div>
      </header>

      <main id="main">
        {/* first viewport: the offer, the action, and the day */}
        <section
          id="top"
          className="hero flex min-h-[calc(100svh-72px)] lg:min-h-[calc(100svh-88px)] flex-col justify-between px-[var(--gutter)] pb-8 pt-10 sm:pt-16"
        >
          <div className="mx-auto w-full max-w-[1280px] lg:grid lg:grid-cols-[1fr_auto] lg:items-center lg:gap-12">
            <div>
            {/* the tagline types itself out once the wordmark lands */}
            <h1 className="serif text-[clamp(40px,6.4vw,76px)] leading-[0.98]">
              <TypedLine lines={[["pretty good coffee,"], ["roasted in ", { hl: "philly" }, "."]]} />
            </h1>
            <p
              style={{ "--i": 0 } as React.CSSProperties}
              className="intro-rise serif mt-7 text-[clamp(24px,3vw,34px)]"
            >
              coffee for every part of your day.
            </p>
            <p
              style={{ "--i": 1 } as React.CSSProperties}
              className="intro-rise mt-6 max-w-[46ch] text-[15px] sm:text-[16px]"
            >
              a little cart is coming to philly sidewalks, with three bags you can take home.
            </p>
            <div style={{ "--i": 2 } as React.CSSProperties} className="intro-rise mt-8">
              <SignupForm />
            </div>
            </div>
            {/* the cart, where a wide screen has room for it */}
            <Cart className="hidden h-auto w-[min(36vw,500px)] lg:block" />
          </div>
          <div style={{ "--i": 3 } as React.CSSProperties} className="intro-rise mx-auto mt-14 w-full max-w-[1280px]">
            <DayLine />
          </div>
        </section>

        {/* the day, one roast at a time */}
        {roasts.map((r, i) => {
          const flip = i % 2 === 1;
          return (
            <section
              key={r.id}
              id={r.id}
              aria-labelledby={`${r.id}-name`}
              className="px-[var(--gutter)] py-20 sm:py-28"
            >
              <div className="mx-auto grid max-w-[1280px] items-center gap-x-16 gap-y-6 md:grid-cols-2">
                <div className={flip ? "md:order-2" : ""}>
                  <Drawing
                    d={r.drawing}
                    label={r.drawingLabel}
                    className="mx-auto block w-[min(68vw,300px)] md:w-[min(38vw,440px)]"
                  />
                </div>
                <div className={flip ? "md:order-1 md:justify-self-end" : ""}>
                  <h2
                    id={`${r.id}-name`}
                    className="serif text-[clamp(52px,7vw,84px)]"
                  >
                    <span className="hl" data-roast={r.id}>
                      {r.name}
                    </span>
                  </h2>
                  <p className="mt-4 text-[15px]">{r.level}</p>
                  <p className="mt-8 max-w-[40ch] text-[16px] lowercase">{r.moment}</p>
                  <dl className="mt-8 grid max-w-[44ch] gap-5 text-[15px]">
                    <div>
                      <dt className="font-medium">tastes like</dt>
                      <dd>{r.tastesLike}</dd>
                    </div>
                    <div>
                      <dt className="font-medium">best for</dt>
                      <dd>{r.bestFor}</dd>
                    </div>
                  </dl>
                </div>
              </div>
            </section>
          );
        })}

        {/* the cart, and the bag you take home */}
        <section aria-labelledby="cart" className="bg-mist px-[var(--gutter)] py-20 text-navy sm:py-28">
          <div className="mx-auto grid max-w-[1280px] gap-x-16 gap-y-12 md:grid-cols-[1.1fr_1fr]">
            <div>
              <h2 id="cart" className="serif max-w-[12ch] text-[clamp(40px,5.4vw,68px)] text-ink">
                a white cart, three bags and a few good cups.
              </h2>
            </div>
            <div className="grid gap-10 self-end text-[15px]">
              <div>
                <h3 className="font-medium">the cart</h3>
                <p className="mt-2 max-w-[48ch]">
                  a little white cart with a big doodle on the front. we&apos;re still working out
                  the menu, and sorting out the permits. once we&apos;re rolling, this is where
                  you&apos;ll find what we&apos;re pouring and where we&apos;re parked each weekend.
                </p>
              </div>
              <div>
                <h3 className="font-medium">the bag</h3>
                <p className="mt-2 max-w-[48ch]">
                  12 oz of whole bean, roasted in philly. take one home from the cart. soon you can
                  subscribe and pick yours up at the cart each time, or have two or more sent to
                  you.
                </p>
              </div>
              <div>
                <h3 className="font-medium">where, roughly</h3>
                <p className="mt-2 max-w-[48ch]">
                  we&apos;re eyeing fishtown, northern liberties, passyunk and a farmers market or
                  two. nothing&apos;s booked yet.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* the close */}
        <section
          id="say-hi"
          aria-labelledby="say-hi-heading"
          className="px-[var(--gutter)] pb-16 pt-24 sm:pt-32"
        >
          <div className="mx-auto max-w-[1280px]">
            <h2 id="say-hi-heading" className="serif max-w-[14ch] text-[clamp(44px,7vw,84px)]">
              see you tomorrow morning.
            </h2>
            <p className="mt-6 max-w-[44ch] text-[15px]">
              or the morning after. leave your email and we&apos;ll tell you when and where the cart
              is out.
            </p>
            <div className="mt-8">
              <SignupForm />
            </div>
          </div>
        </section>
      </main>

      <footer className="px-[var(--gutter)] pb-10">
        <div className="mx-auto flex max-w-[1280px] flex-col gap-6 border-t border-ink/30 pt-8 text-[13px] sm:flex-row sm:items-end sm:justify-between">
          <Wordmark className="h-auto w-[96px]" />
          <p>pretty good coffee, roasted in philly, pa.</p>
          <p>© 2026 doodle</p>
        </div>
      </footer>
    </>
  );
}
