"use client";

import { useEffect, useState } from "react";

const CONSENT_KEY = "vido_analytics_consent";
const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "";

type ConsentState = "accepted" | "denied" | null;

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

function loadGoogleAnalytics() {
  if (!measurementId || document.getElementById("vido-ga-script")) return;

  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag(...args: unknown[]) {
    window.dataLayer.push(args);
  };
  window.gtag("js", new Date());
  window.gtag("config", measurementId, { anonymize_ip: true });

  const script = document.createElement("script");
  script.id = "vido-ga-script";
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  document.head.appendChild(script);
}

function track(name: string, params: Record<string, unknown> = {}) {
  if (!measurementId || !window.gtag) return;
  window.gtag("event", name, params);
}

export default function AnalyticsConsent() {
  const [consent, setConsent] = useState<ConsentState>(null);

  useEffect(() => {
    const saved = localStorage.getItem(CONSENT_KEY) as ConsentState;
    if (saved === "accepted" || saved === "denied") {
      setConsent(saved);
      if (saved === "accepted") loadGoogleAnalytics();
    }

    const clickHandler = (event: MouseEvent) => {
      const target = event.target instanceof Element ? event.target.closest<HTMLElement>("[data-event]") : null;
      const eventName = target?.dataset.event;
      if (eventName && localStorage.getItem(CONSENT_KEY) === "accepted") {
        track(eventName, { path: window.location.pathname });
      }
    };

    const customHandler = (event: Event) => {
      const detail = (event as CustomEvent<{ name?: string; params?: Record<string, unknown> }>).detail;
      if (detail?.name && localStorage.getItem(CONSENT_KEY) === "accepted") {
        track(detail.name, detail.params);
      }
    };

    document.addEventListener("click", clickHandler);
    window.addEventListener("vido:analytics", customHandler);

    return () => {
      document.removeEventListener("click", clickHandler);
      window.removeEventListener("vido:analytics", customHandler);
    };
  }, []);

  if (!measurementId || consent !== null) return null;

  function choose(next: Exclude<ConsentState, null>) {
    localStorage.setItem(CONSENT_KEY, next);
    setConsent(next);
    if (next === "accepted") loadGoogleAnalytics();
  }

  return (
    <div className="fixed inset-x-4 bottom-4 z-[80] mx-auto max-w-3xl rounded-xl border border-brand-navy/10 bg-white p-5 shadow-soft sm:p-6" role="dialog" aria-label="Eväste- ja analytiikkavalinnat">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="max-w-xl">
          <p className="font-semibold text-brand-navy">Analytiikka ja evästevalinnat</p>
          <p className="mt-2 text-sm leading-6 text-brand-charcoal/75">
            Käytämme Google Analyticsia vain suostumuksellasi sivuston toimivuuden ja konversioiden mittaamiseen. Välttämättömät toiminnot toimivat ilman analytiikkaa.
          </p>
          <a href="/evasteet" className="mt-2 inline-block text-sm font-semibold text-brand-red underline underline-offset-4">
            Lue evästekäytännöstä
          </a>
        </div>
        <div className="flex shrink-0 flex-col gap-2 sm:min-w-44">
          <button type="button" onClick={() => choose("accepted")} className="min-h-11 rounded-md bg-brand-red px-4 py-2.5 text-sm font-semibold text-white hover:bg-brand-red-dark">
            Hyväksy analytiikka
          </button>
          <button type="button" onClick={() => choose("denied")} className="min-h-11 rounded-md border border-brand-navy/15 bg-white px-4 py-2.5 text-sm font-semibold text-brand-navy hover:bg-brand-light">
            Vain välttämättömät
          </button>
        </div>
      </div>
    </div>
  );
}
