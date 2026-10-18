"use client";

import { Check, Copy } from "lucide-react";
import { useState } from "react";

import { cn } from "@/lib/utils";

/** Copies an email address to the clipboard with inline confirmation. */
export default function CopyEmail({
  email,
  className,
}: {
  email: string;
  className?: string;
}) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      /* Clipboard blocked (insecure origin / permissions) — the visible
         address next to this button is still selectable by hand. */
    }
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label={`Copy email address ${email}`}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-md border border-line px-2.5 py-1 text-xs font-medium text-muted transition-colors hover:border-accent hover:text-accent",
        copied && "border-accent text-accent",
        className,
      )}
    >
      {copied ? (
        <Check className="h-3.5 w-3.5" aria-hidden />
      ) : (
        <Copy className="h-3.5 w-3.5" aria-hidden />
      )}
      {copied ? "Copied" : "Copy"}
    </button>
  );
}
