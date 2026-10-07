"use client";

import { Check, Copy } from "lucide-react";
import { useState } from "react";

/** Copies an email address to the clipboard, confirming with a brief check. */
export function CopyEmailButton({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      // Clipboard unavailable (insecure context or denied); the address stays visible to copy by hand.
    }
  };

  return (
    <button
      type="button"
      onClick={copy}
      title="Copy Email"
      aria-label={copied ? "Email copied" : "Copy email address"}
      className="flex shrink-0 items-center justify-center rounded-lg border border-white/8 bg-white/4 p-2 text-slate-400 transition-all outline-none hover:bg-vermilion hover:text-white focus-visible:shadow-glow-focus"
    >
      {copied ? <Check className="size-4" aria-hidden /> : <Copy className="size-4" aria-hidden />}
    </button>
  );
}
