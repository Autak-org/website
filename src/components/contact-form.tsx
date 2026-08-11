"use client";

import { useState } from "react";
import { Rule } from "@/components/ui/section";
import { ArrowRight } from "@/components/icons";
import { site } from "@/lib/site";
import type { Dictionary } from "@/i18n/dictionaries/de";

/**
 * The association has no mail backend, so the form composes a message and
 * hands it to the visitor's mail client. That keeps the data on their machine
 * and means there is no silent failure when a server is down.
 */
export function ContactForm({ dictionary }: { dictionary: Dictionary }) {
  const { contact } = dictionary;
  const [name, setName] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const body = [message, "", name && `— ${name}`].filter(Boolean).join("\n");
  const href =
    `mailto:${site.email}?subject=${encodeURIComponent(subject)}` +
    `&body=${encodeURIComponent(body)}`;

  return (
    <form
      className="rounded-2xl border border-ink-200 bg-white p-6 sm:p-8"
      onSubmit={(event) => {
        event.preventDefault();
        window.location.href = href;
      }}
    >
      <h3 className="text-xl font-bold text-ink-900">{contact.formTitle}</h3>
      <Rule className="mt-5" />
      <p className="mt-5 text-sm leading-relaxed text-ink-500">
        {contact.formIntro}
      </p>

      <div className="mt-7 grid gap-5">
        <div className="grid gap-5 sm:grid-cols-2 sm:items-end">
          <Field
            id="contact-name"
            label={contact.nameLabel}
            value={name}
            onChange={setName}
            autoComplete="name"
          />
          <Field
            id="contact-subject"
            label={contact.subjectLabel}
            value={subject}
            onChange={setSubject}
            required
          />
        </div>

        <div>
          <label
            htmlFor="contact-message"
            className="text-xs font-semibold tracking-[0.16em] text-ink-500 uppercase"
          >
            {contact.messageLabel}
          </label>
          <textarea
            id="contact-message"
            rows={5}
            required
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            className="mt-2 w-full rounded-xl border border-ink-200 bg-white px-4 py-3 text-ink-900 transition-colors outline-none focus:border-brand-500"
          />
        </div>
      </div>

      <button
        type="submit"
        className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand-500 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-600 sm:w-auto"
      >
        {contact.submit}
        <ArrowRight className="h-4 w-4" />
      </button>
    </form>
  );
}

function Field({
  id,
  label,
  value,
  onChange,
  required = false,
  autoComplete,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  autoComplete?: string;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="text-xs font-semibold tracking-[0.16em] text-ink-500 uppercase"
      >
        {label}
      </label>
      <input
        id={id}
        type="text"
        required={required}
        autoComplete={autoComplete}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="mt-2 w-full rounded-xl border border-ink-200 bg-white px-4 py-3 text-ink-900 transition-colors outline-none focus:border-brand-500"
      />
    </div>
  );
}
