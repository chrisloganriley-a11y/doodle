import { Fragment } from "react";

// A headline that types itself out after the intro (see .type-ch in
// globals.css). Screen readers get the plain sentence; the letters are visual.
// Each line is a list of parts; a part marked `hl` gets the highlighter, which
// swipes in once the typing is done.
type Part = string | { hl: string };

export function TypedLine({ lines }: { lines: Part[][] }) {
  const plain = lines
    .map((parts) => parts.map((p) => (typeof p === "string" ? p : p.hl)).join(""))
    .join(" ");

  let c = 0;
  const chars = (text: string) =>
    [...text].map((ch) => (
      <span key={c} className="type-ch" style={{ "--c": c++ } as React.CSSProperties}>
        {ch}
      </span>
    ));

  return (
    <>
      <span className="sr-only">{plain}</span>
      <span aria-hidden="true">
        {lines.map((parts, li) => (
          <Fragment key={li}>
            {li > 0 && (
              <>
                {/* the space between lines types too, so wrapping still works */}
                {chars(" ")}
                <br className="max-sm:hidden" />
              </>
            )}
            {parts.map((p, pi) =>
              typeof p === "string" ? (
                <Fragment key={pi}>{chars(p)}</Fragment>
              ) : (
                <span key={pi} className="hl type-hl">
                  {chars(p.hl)}
                </span>
              ),
            )}
          </Fragment>
        ))}
      </span>
    </>
  );
}
