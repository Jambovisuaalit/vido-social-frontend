import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { getSiteContent } from "@/lib/content";

export const metadata: Metadata = {
  title: "Referenssit",
  description: "JKP Group Oy:n talotekniset rakennuttamis-, valvonta- ja suunnittelureferenssit.",
  alternates: { canonical: "/referenssit" },
};
export const dynamic = "force-dynamic";

export default async function ReferenssitPage() {
  const content = await getSiteContent();
  return (
    <>
      <Header email={content.company.email} />
      <main>
        <section className="subhero"><div className="shell narrow"><p className="eyebrow">Referenssit</p><h1>Työn näyttö kuuluu faktoihin, ei yleisiin väitteisiin.</h1><p>Referenssikehys on toteutettu valmiiksi. Kohteet julkaistaan vasta, kun projektin nimi, rooli, laajuus ja julkaisulupa on vahvistettu.</p></div></section>
        <section className="section"><div className="shell reference-grid"><article className="reference-placeholder"><span>01</span><small>RAKENNUTTAMINEN</small><h2>Referenssikohde lisätään</h2><p>Kohteen nimi, sijainti, toteutusvuosi, JKP Groupin vastuu ja lopputulos.</p></article><article className="reference-placeholder"><span>02</span><small>VALVONTA</small><h2>Referenssikohde lisätään</h2><p>Hankkeen laajuus, keskeiset valvontatehtävät ja hyväksytty asiakashyöty.</p></article><article className="reference-placeholder"><span>03</span><small>LVI-SUUNNITTELU</small><h2>Referenssikohde lisätään</h2><p>Suunnittelutehtävä, tekninen ratkaisu ja toteutuksen erityispiirteet.</p></article></div></section>
        <section className="contact-section"><div className="shell contact-grid"><div><p className="eyebrow">Kysy soveltuvuudesta</p><h2>Tarvitsetko kokemusta vastaavasta hankkeesta?</h2><p>Kerro hanketyyppi. JKP Group voi arvioida suoraan, vastaako osaaminen tarpeeseen.</p></div><ContactForm subject="Referenssi- ja osaamiskysely" /></div></section>
      </main>
      <Footer content={content} />
    </>
  );
}
