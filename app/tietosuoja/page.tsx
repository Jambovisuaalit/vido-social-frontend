import type { Metadata } from "next";
import { Container, VidoLogo } from "@/components/ui";

export const metadata: Metadata = {
  title: "Tietosuojaseloste",
  description: "VIDO Socialin tietosuojaseloste."
};

export default function PrivacyPage() {
  const legalEntity = process.env.NEXT_PUBLIC_LEGAL_ENTITY || "Ville Olenius Tmi";
  const businessId = process.env.NEXT_PUBLIC_BUSINESS_ID || "3581471-7";
  const marketingName = process.env.NEXT_PUBLIC_MARKETING_NAME || "VIDO";
  const contactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL || "ville@vidosocial.com";
  const contactPhone = process.env.NEXT_PUBLIC_CONTACT_PHONE || "+358 40 724 7621";
  const postalAddress = process.env.NEXT_PUBLIC_POSTAL_ADDRESS || "Niittytie 4, 03100 NLA";
  const domicile = process.env.NEXT_PUBLIC_DOMICILE || "Vihti";

  return (
    <main className="min-h-screen bg-white py-10 sm:py-16">
      <Container className="max-w-4xl">
        <a href="/" aria-label="Takaisin etusivulle" className="block w-44"><VidoLogo className="h-auto w-full" /></a>
        <article className="mt-12 rounded-2xl border border-brand-navy/10 bg-white p-6 shadow-soft sm:p-10">
          <p className="text-xs font-black uppercase tracking-[0.14em] text-brand-red">Legal</p>
          <h1 className="mt-3 text-4xl font-black tracking-[-0.04em] text-brand-navy">Tietosuojaseloste</h1>
          <p className="mt-3 text-sm text-brand-gray">Päivitetty 2.8.2026</p>

          <div className="mt-10 space-y-9 text-brand-charcoal/80">
            <section>
              <h2 className="text-xl font-bold text-brand-navy">1. Rekisterinpitäjä</h2>
              <p className="mt-3 leading-7">
                {legalEntity}<br />
                Markkinointinimi: {marketingName}<br />
                Y-tunnus: {businessId}<br />
                Yrittäjä: Ville Olenius<br />
                Postiosoite: {postalAddress}<br />
                Kotipaikka: {domicile}<br />
                Sähköposti: {contactEmail}<br />
                Puhelin / WhatsApp Business: {contactPhone}
              </p>
            </section>
            <section>
              <h2 className="text-xl font-bold text-brand-navy">2. Mitä tietoja käsittelemme</h2>
              <p className="mt-3 leading-7">Yhteydenottolomakkeella käsittelemme yrityksen nimeä, yhteyshenkilön nimeä, puhelinnumeroa ja sähköpostiosoitetta. Lisäksi voimme tallentaa teknisiä lähdetietoja, kuten sivun, referrerin ja UTM-kampanjatiedot.</p>
            </section>
            <section>
              <h2 className="text-xl font-bold text-brand-navy">3. Käsittelyn tarkoitus ja oikeusperuste</h2>
              <p className="mt-3 leading-7">Tietoja käytetään VIDO Startti- ja muiden VIDO Social -palveluiden yhteydenottojen käsittelyyn, asiakassuhteen valmisteluun, palvelun toimittamiseen sekä perusteltuun liiketoiminnan seurantaan. Analytiikkaa käytetään vain erillisellä suostumuksella.</p>
            </section>
            <section>
              <h2 className="text-xl font-bold text-brand-navy">4. Palveluntarjoajat</h2>
              <p className="mt-3 leading-7">Tietojen käsittelyssä voidaan käyttää Verceliä verkkopalvelun tekniseen toimittamiseen, Supabasea lead-tietojen tallentamiseen, Resendiä sähköposti-ilmoituksiin ja Google Analyticsia suostumuksen perusteella analytiikkaan.</p>
            </section>
            <section>
              <h2 className="text-xl font-bold text-brand-navy">5. Säilytysaika</h2>
              <p className="mt-3 leading-7">Tietoja säilytetään vain niin kauan kuin yhteydenoton, asiakassuhteen, lakisääteisten velvoitteiden tai perustellun liiketoimintatarpeen hoitaminen edellyttää.</p>
            </section>
            <section>
              <h2 className="text-xl font-bold text-brand-navy">6. Rekisteröidyn oikeudet</h2>
              <p className="mt-3 leading-7">Sinulla on soveltuvan lainsäädännön mukaisesti oikeus pyytää pääsyä tietoihisi, niiden oikaisua tai poistamista sekä tietyissä tilanteissa käsittelyn rajoittamista tai vastustamista. Pyynnöt voi lähettää yllä olevaan sähköpostiosoitteeseen.</p>
            </section>
          </div>
        </article>
      </Container>
    </main>
  );
}
