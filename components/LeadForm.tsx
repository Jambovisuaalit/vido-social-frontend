"use client";

import { FormEvent, useRef, useState } from "react";

function emitAnalytics(name: string, params: Record<string, unknown> = {}) {
  window.dispatchEvent(new CustomEvent("vido:analytics", { detail: { name, params } }));
}

function cleanWhatsAppNumber(value: string) {
  return value.replace(/\D/g, "");
}

export default function LeadForm({ whatsappNumber = "" }: { whatsappNumber?: string }) {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const started = useRef(false);

  function onStart() {
    if (started.current) return;
    started.current = true;
    emitAnalytics("form_start", { form: "startti" });
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setMessage("");

    const form = new FormData(event.currentTarget);
    const params = new URLSearchParams(window.location.search);
    const payload = {
      company: String(form.get("company") || ""),
      name: String(form.get("name") || ""),
      phone: String(form.get("phone") || ""),
      email: String(form.get("email") || ""),
      website: String(form.get("website") || ""),
      source: "website_startti",
      page: window.location.pathname,
      referrer: document.referrer || null,
      utm_source: params.get("utm_source"),
      utm_medium: params.get("utm_medium"),
      utm_campaign: params.get("utm_campaign")
    };

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      const data = (await response.json().catch(() => ({}))) as { error?: string };
      if (!response.ok) throw new Error(data.error || "Lähetys epäonnistui.");

      setStatus("success");
      emitAnalytics("form_submit", { form: "startti" });
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Lähetys epäonnistui. Yritä uudelleen.");
      emitAnalytics("form_error", { form: "startti" });
    }
  }

  const normalizedWhatsApp = cleanWhatsAppNumber(whatsappNumber);
  const whatsappHref = normalizedWhatsApp
    ? `https://wa.me/${normalizedWhatsApp}?text=${encodeURIComponent("Hei, haluan aloittaa VIDO Startin. Yritykseni on ")}`
    : "";

  if (status === "success") {
    return (
      <div className="rounded-xl border border-brand-navy/10 bg-white p-7 shadow-soft sm:p-9" aria-live="polite">
        <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-brand-red text-xl font-black text-white">✓</div>
        <h3 className="mt-5 text-2xl font-black tracking-[-0.03em] text-brand-navy">Pyyntö vastaanotettu.</h3>
        <p className="mt-3 max-w-xl leading-7 text-brand-charcoal/75">
          Olemme saaneet yhteystietosi. Seuraava vaihe on materiaalien aloitus ja ensimmäisten työmaakuvien kerääminen.
        </p>
        {whatsappHref ? (
          <a
            href={whatsappHref}
            data-event="whatsapp_click"
            target="_blank"
            rel="noreferrer"
            className="mt-6 inline-flex min-h-12 items-center justify-center rounded-md bg-brand-red px-5 py-3 text-sm font-semibold text-white hover:bg-brand-red-dark"
          >
            Lähetä ensimmäinen WhatsApp-viesti
          </a>
        ) : (
          <p className="mt-6 rounded-lg bg-brand-light px-4 py-3 text-sm text-brand-charcoal/75">
            WhatsApp-yhteys aktivoidaan, kun julkinen VIDO Business -numero on vahvistettu.
          </p>
        )}
      </div>
    );
  }

  return (
    <form id="start-form" onSubmit={onSubmit} onFocus={onStart} className="rounded-xl border border-brand-navy/10 bg-white p-6 shadow-soft sm:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block">
          <span className="mb-2 block text-sm font-semibold text-brand-navy">Yritys</span>
          <input name="company" required autoComplete="organization" maxLength={160} className="min-h-12 w-full rounded-md border border-brand-navy/15 bg-white px-4 text-base text-brand-navy outline-none transition focus:border-brand-red focus:ring-2 focus:ring-brand-red/10" />
        </label>
        <label className="block">
          <span className="mb-2 block text-sm font-semibold text-brand-navy">Nimi</span>
          <input name="name" required autoComplete="name" maxLength={120} className="min-h-12 w-full rounded-md border border-brand-navy/15 bg-white px-4 text-base text-brand-navy outline-none transition focus:border-brand-red focus:ring-2 focus:ring-brand-red/10" />
        </label>
        <label className="block">
          <span className="mb-2 block text-sm font-semibold text-brand-navy">Puhelin</span>
          <input name="phone" required type="tel" autoComplete="tel" maxLength={40} className="min-h-12 w-full rounded-md border border-brand-navy/15 bg-white px-4 text-base text-brand-navy outline-none transition focus:border-brand-red focus:ring-2 focus:ring-brand-red/10" />
        </label>
        <label className="block">
          <span className="mb-2 block text-sm font-semibold text-brand-navy">Sähköposti</span>
          <input name="email" required type="email" autoComplete="email" maxLength={180} className="min-h-12 w-full rounded-md border border-brand-navy/15 bg-white px-4 text-base text-brand-navy outline-none transition focus:border-brand-red focus:ring-2 focus:ring-brand-red/10" />
        </label>
      </div>

      <label className="absolute left-[-9999px]" aria-hidden="true">
        Website
        <input name="website" type="text" tabIndex={-1} autoComplete="off" />
      </label>

      {status === "error" ? (
        <p className="mt-5 rounded-md border border-brand-red/20 bg-brand-red/5 px-4 py-3 text-sm text-brand-red" role="alert">
          {message}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="mt-6 inline-flex min-h-12 w-full items-center justify-center rounded-md bg-brand-red px-5 py-3 text-sm font-semibold text-white shadow-red transition hover:bg-brand-red-dark disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
      >
        {status === "submitting" ? "Lähetetään…" : "Aloita VIDO Startti — 290 €"}
      </button>

      <p className="mt-4 text-xs leading-5 text-brand-gray">
        Lähettämällä lomakkeen pyydät yhteydenottoa VIDO Startista. Tietojen käsittelystä kerrotaan <a href="/tietosuoja" className="font-semibold text-brand-navy underline underline-offset-4">tietosuojaselosteessa</a>.
      </p>
    </form>
  );
}
