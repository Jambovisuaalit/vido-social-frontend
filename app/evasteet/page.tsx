import type { Metadata } from "next";
import { Container, VidoLogo } from "@/components/ui";

export const metadata: Metadata = {
  title: "Evästekäytäntö",
  description: "VIDO Socialin eväste- ja analytiikkakäytäntö."
};

export default function CookiePage() {
  return (
    <main className="min-h-screen bg-white py-10 sm:py-16">
      <Container className="max-w-4xl">
        <a href="/" aria-label="Takaisin etusivulle" className="block w-44"><VidoLogo className="h-auto w-full" /></a>
        <article className="mt-12 rounded-2xl border border-brand-navy/10 bg-white p-6 shadow-soft sm:p-10">
          <p className="text-xs font-black uppercase tracking-[0.14em] text-brand-red">Legal</p>
          <h1 className="mt-3 text-4xl font-black tracking-[-0.04em] text-brand-navy">Evästeet ja analytiikka</h1>
          <p className="mt-3 text-sm text-brand-gray">Päivitetty 2.8.2026</p>

          <div className="mt-10 space-y-9 text-brand-charcoal/80">
            <section>
              <h2 className="text-xl font-bold text-brand-navy">Välttämättömät toiminnot</h2>
              <p className="mt-3 leading-7">Sivusto voi käyttää teknisesti välttämättömiä tallennuksia palvelun toiminnan, turvallisuuden ja käyttäjän tekemien valintojen muistamiseen. Analytiikkavalinta tallennetaan selaimen paikalliseen tallennustilaan.</p>
            </section>
            <section>
              <h2 className="text-xl font-bold text-brand-navy">Google Analytics</h2>
              <p className="mt-3 leading-7">Google Analytics käynnistetään vain, jos käyttäjä valitsee “Hyväksy analytiikka”. Ennen suostumusta GA4-skriptiä ei ladata. Mittaamme sivuston käyttöä ja konversiotapahtumia kuten CTA-klikkejä, lomakkeen aloituksia, lomakkeen lähetyksiä ja WhatsApp-klikkejä.</p>
            </section>
            <section>
              <h2 className="text-xl font-bold text-brand-navy">Suostumuksen muuttaminen</h2>
              <p className="mt-3 leading-7">Voit poistaa sivuston paikallisen tallennuksen selaimesi sivustotiedoista, jolloin suostumusvalinta kysytään uudelleen seuraavalla käynnillä.</p>
            </section>
          </div>
        </article>
      </Container>
    </main>
  );
}
