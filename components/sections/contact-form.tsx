"use client";

import { CircleCheck, LoaderCircle, TriangleAlert } from "lucide-react";
import { useState, type FormEvent } from "react";

import { contact, profile, site } from "@/content/site";
import { cn } from "@/lib/utils";

type Status = "idle" | "submitting" | "success" | "error";

const FIELD_CLASS =
  "w-full rounded-md border border-line bg-surface px-3.5 py-2.5 text-sm text-ink placeholder:text-muted transition-colors focus:border-accent";

const LABEL_CLASS = "text-sm text-ink";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [feedback, setFeedback] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const data = new FormData(form);
    const senderName = String(data.get("name") ?? "").trim();

    if (!site.formspreeId) {
      setStatus("error");
      setFeedback(
        `This form isn't connected yet. Please email me directly at ${profile.email}.`,
      );
      return;
    }

    setStatus("submitting");
    setFeedback("");

    try {
      const response = await fetch(
        `https://formspree.io/f/${site.formspreeId}`,
        {
          method: "POST",
          headers: { Accept: "application/json" },
          body: data,
        },
      );

      if (response.ok) {
        setStatus("success");
        setFeedback(
          `Thanks${senderName ? `, ${senderName}` : ""}. Your message is on its way and I'll reply as soon as I can.`,
        );
        form.reset();
        return;
      }

      const payload = (await response.json().catch(() => null)) as {
        errors?: Array<{ message?: string }>;
      } | null;

      setStatus("error");
      setFeedback(
        payload?.errors?.[0]?.message ??
          `Something went wrong. Please email me at ${profile.email}.`,
      );
    } catch {
      setStatus("error");
      setFeedback(
        `Network error. Please check your connection, or email me at ${profile.email}.`,
      );
    }
  }

  const isSubmitting = status === "submitting";

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label htmlFor="contact-name" className={LABEL_CLASS}>
            Name
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            required
            autoComplete="name"
            placeholder="Falano Mancha"
            className={FIELD_CLASS}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="contact-email" className={LABEL_CLASS}>
            Email
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="falanomancha@example.com"
            className={FIELD_CLASS}
          />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="contact-subject" className={LABEL_CLASS}>
          Subject
        </label>
        <select
          id="contact-subject"
          name="subject"
          required
          defaultValue={contact.subjects[0]}
          className={FIELD_CLASS}
        >
          {contact.subjects.map((subject) => (
            <option key={subject} value={subject}>
              {subject}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="contact-message" className={LABEL_CLASS}>
          Message
        </label>
        <textarea
          id="contact-message"
          name="message"
          required
          rows={6}
          placeholder="Tell me a little about what you have in mind…"
          className={cn(FIELD_CLASS, "resize-y")}
        />
      </div>

      {/* Subject line used in the notification email. */}
      <input
        type="hidden"
        name="_subject"
        value={`New message from ${profile.name}'s portfolio`}
      />
      {/* Formspree honeypot — bots fill this, humans never see it. */}
      <input
        type="text"
        name="_gotcha"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden
        className="hidden"
      />

      <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex items-center justify-center gap-2 rounded-md bg-accent px-4 py-2.5 text-sm font-medium text-accent-fg transition-colors duration-200 hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? (
            <LoaderCircle className="h-4 w-4 animate-spin" aria-hidden />
          ) : null}
          {isSubmitting ? "Sending…" : "Send message"}
        </button>

        <p className="text-xs text-muted">
          Your details are only used to reply to you.
        </p>
      </div>

      <p
        role="status"
        aria-live="polite"
        className={cn(
          "flex items-start gap-2 text-sm",
          status === "success" && "text-accent",
          status === "error" && "text-ink",
          (status === "idle" || status === "submitting") && "sr-only",
        )}
      >
        {status === "success" ? (
          <CircleCheck className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
        ) : null}
        {status === "error" ? (
          <TriangleAlert
            className="mt-0.5 h-4 w-4 shrink-0 text-accent"
            aria-hidden
          />
        ) : null}
        {feedback}
      </p>
    </form>
  );
}
