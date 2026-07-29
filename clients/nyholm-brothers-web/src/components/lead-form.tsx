"use client";

import Link from "next/link";
import { FormEvent, useEffect, useRef, useState } from "react";
import { trackEvent } from "@/lib/analytics";
import { siteConfig } from "@/lib/site";

type FormState =
  | { status: "idle"; message: "" }
  | { status: "submitting"; message: "" }
  | { status: "success"; message: string }
  | { status: "error"; message: string };

const serviceOptions = [
  "Huoneistoremontti",
  "Kylpyhuone tai märkätila",
  "Keittiöremontti",
  "Korjausrakentaminen",
  "Terassi tai piharakennus",
  "Saaristokohde",
  "Maarakennus tai perustukset",
  "Muu rakennustyö",
];

export function LeadForm({
  compact = false,
  source = "website",
}: {
  compact?: boolean;
  source?: string;
}) {
  const [state, setState] = useState<FormState>({
    status: "idle",
    message: "",
  });
  const startedAt = useRef<number | null>(null);

  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    if (!data.get("consent")) {
      setState({
        status: "error",
        message: "Hyväksy tietojen käsittely, jotta voimme vastata.",
      });
      return;
    }

    setState({ status: "submitting", message: "" });

    const params = new URLSearchParams(window.location.search);
    const payload = {
      name: String(data.get("name") ?? "").trim(),
      email: String(data.get("email") ?? "").trim(),
      phone: String(data.get("phone") ?? "").trim(),
      service_interest: String(data.get("service") ?? "").trim(),
      city: String(data.get("city") ?? "").trim(),
      message: String(data.get("message") ?? "").trim(),
      consent: true,
      website: String(data.get("website") ?? ""),
      source,
      landing_page: window.location.href.slice(0, 500),
      utm_source: params.get("utm_source"),
      utm_medium: params.get("utm_medium"),
      utm_campaign: params.get("utm_campaign"),
      utm_content: params.get("utm_content"),
      utm_term: params.get("utm_term"),
      started_at: startedAt.current ?? Date.now(),
      consent_version: "2026-07-29",
    };

    try {
      const response = await fetch(siteConfig.leadEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`Lead endpoint returned ${response.status}`);
      }

      trackEvent("lead_submit", {
        service_interest: payload.service_interest,
        source,
      });
      setState({
        status: "success",
        message:
          "Kiitos – yhteydenottosi on vastaanotettu. Patric palaa asiaan mahdollisimman pian.",
      });
      form.reset();
      startedAt.current = Date.now();
    } catch {
      trackEvent("lead_error", { source });
      setState({
        status: "error",
        message:
          "Lähetys ei juuri nyt onnistunut. Soita numeroon 040 415 7543 tai lähetä sähköpostia.",
      });
    }
  }

  if (state.status === "success") {
    return (
      <div aria-live="polite" className="form-success" role="status">
        <span aria-hidden="true">✓</span>
        <h3>Yhteydenotto vastaanotettu</h3>
        <p>{state.message}</p>
        <a href={siteConfig.phoneHref}>Kiireellinen asia? Soita Patricille</a>
      </div>
    );
  }

  return (
    <form
      className={`lead-form ${compact ? "lead-form-compact" : ""}`.trim()}
      onSubmit={handleSubmit}
    >
      <div className="form-grid">
        <label>
          <span>Nimi *</span>
          <input
            autoComplete="name"
            maxLength={120}
            name="name"
            placeholder="Etunimi Sukunimi"
            required
            type="text"
          />
        </label>

        <label>
          <span>Puhelin *</span>
          <input
            autoComplete="tel"
            inputMode="tel"
            maxLength={40}
            name="phone"
            placeholder="040 123 4567"
            required
            type="tel"
          />
        </label>

        <label>
          <span>Sähköposti *</span>
          <input
            autoComplete="email"
            maxLength={160}
            name="email"
            placeholder="nimi@esimerkki.fi"
            required
            type="email"
          />
        </label>

        <label>
          <span>Kohteen sijainti *</span>
          <input
            autoComplete="address-level2"
            maxLength={100}
            name="city"
            placeholder="Esim. Espoo, Tapiola"
            required
            type="text"
          />
        </label>

        <label className="form-span">
          <span>Mitä olet suunnittelemassa? *</span>
          <select defaultValue="" name="service" required>
            <option disabled value="">
              Valitse palvelu
            </option>
            {serviceOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>

        <label className="form-span">
          <span>Kerro kohteesta</span>
          <textarea
            maxLength={2000}
            name="message"
            placeholder="Mitä haluat tehdä, milloin ja onko kohteesta jo suunnitelmia?"
            rows={compact ? 4 : 5}
          />
        </label>

        <label aria-hidden="true" className="honey-field">
          <span>Verkkosivu</span>
          <input autoComplete="off" name="website" tabIndex={-1} type="text" />
        </label>
      </div>

      <label className="consent-field">
        <input name="consent" required type="checkbox" />
        <span>
          Hyväksyn, että Nyholm Brothers käsittelee tietoni yhteydenottoon
          vastaamista varten. Katso{" "}
          <Link href="/tietosuojaseloste">tietosuojaseloste</Link>.
        </span>
      </label>

      {state.status === "error" ? (
        <p aria-live="assertive" className="form-error" role="alert">
          {state.message}
        </p>
      ) : null}

      <button
        className="button button-primary form-submit"
        disabled={state.status === "submitting"}
        type="submit"
      >
        {state.status === "submitting"
          ? "Lähetetään…"
          : "Pyydä maksuton kartoitus"}
      </button>
      <p className="form-note">
        Ei sitoutumista. Käymme ensin läpi kohteen ja sopivan etenemisen.
      </p>
    </form>
  );
}
