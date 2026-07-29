"use client";

import { useEffect } from "react";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="not-found-page">
      <div className="site-container">
        <p className="eyebrow">Virhe</p>
        <h1>Jokin meni hetkeksi pieleen.</h1>
        <p>Yritä ladata sivu uudelleen tai palaa hetken kuluttua.</p>
        <button className="button button-primary" onClick={reset} type="button">
          Yritä uudelleen
        </button>
      </div>
    </section>
  );
}
