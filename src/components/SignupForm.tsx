"use client";

import { useId, useState } from "react";

// Where signups go. Undecided (Kit, Buttondown, or a Cloudflare Worker), so it
// is read from the environment at build time. Any endpoint that accepts a
// form POST with an `email` field works.
const ENDPOINT = process.env.NEXT_PUBLIC_SIGNUP_ENDPOINT ?? "";

type Status = "idle" | "sending" | "done" | "error";

export function SignupForm({ button = "tell me when" }: { button?: string }) {
  const id = useId();
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const email = new FormData(form).get("email");

    if (!ENDPOINT) {
      setStatus("error");
      setMessage(
        "signups aren't switched on yet. try again in a few days, or catch us at the cart.",
      );
      return;
    }

    setStatus("sending");
    setMessage("");
    try {
      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: new URLSearchParams({ email: String(email) }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus("done");
      setMessage("you're on the list. we'll write when the cart is out.");
      form.reset();
    } catch {
      setStatus("error");
      setMessage("that didn't go through. check the address and try once more.");
    }
  }

  if (status === "done") {
    return (
      <p role="status" className="max-w-[34ch] text-[15px]">
        {message}
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate={false} className="w-full max-w-[520px]">
      <label htmlFor={`${id}-email`} className="mb-2 block text-[13px] font-medium">
        your email
      </label>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
        <input
          id={`${id}-email`}
          name="email"
          type="email"
          required
          autoComplete="email"
          inputMode="email"
          placeholder="you@somewhere.com"
          aria-describedby={`${id}-msg`}
          aria-invalid={status === "error" || undefined}
          className="min-h-11 flex-1 border-0 border-b-2 border-dashed border-ink bg-transparent px-0 pb-1 text-[16px] text-ink normal-case outline-none placeholder:text-ink/60 focus-visible:border-solid focus-visible:outline-none"
        />
        <button
          type="submit"
          disabled={status === "sending"}
          className="inline-flex min-h-11 shrink-0 cursor-pointer items-center justify-center rounded-doodle bg-ink px-6 text-[15px] text-paper transition-colors duration-200 hover:bg-navy disabled:cursor-wait disabled:opacity-70"
        >
          {status === "sending" ? "sending…" : button}
        </button>
      </div>
      <p id={`${id}-msg`} role={status === "error" ? "alert" : undefined} className="mt-3 min-h-[1.65em] text-[13px]">
        {message || "one email when the cart rolls out. maybe a few after that."}
      </p>
    </form>
  );
}
