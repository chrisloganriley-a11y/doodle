"use client";

import { useId, useState } from "react";

// Signups go to the Cloudflare Worker (worker/index.ts), which adds them to Kit.
// It only exists under `npm run preview` or once deployed, not `npm run dev`.
const ENDPOINT = "/api/subscribe";

type Status = "idle" | "sending" | "done" | "error";

export function SignupForm({ button = "tell me when" }: { button?: string }) {
  const id = useId();
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    setStatus("sending");
    setMessage("");
    try {
      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: new URLSearchParams({
          email: String(data.get("email") ?? ""),
          company: String(data.get("company") ?? ""),
        }),
      });
      if (res.status === 422) {
        setStatus("error");
        setMessage("that address doesn't look right. check it and try once more.");
        return;
      }
      if (res.status === 503 || res.status === 404) {
        setStatus("error");
        setMessage(
          "signups aren't switched on yet. try again in a few days, or catch us at the cart.",
        );
        return;
      }
      if (!res.ok) throw new Error(String(res.status));
      setStatus("done");
      setMessage("you're on the list. we'll write when the cart is out.");
      form.reset();
    } catch {
      setStatus("error");
      setMessage("that didn't go through on our end. try again in a minute.");
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
    <form onSubmit={onSubmit} className="relative w-full max-w-[520px]">
      {/* Hidden from people; bots fill it in and get quietly dropped. */}
      <div aria-hidden="true" className="absolute left-[-9999px] h-px w-px overflow-hidden">
        <label htmlFor={`${id}-company`}>company</label>
        <input id={`${id}-company`} name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>
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
