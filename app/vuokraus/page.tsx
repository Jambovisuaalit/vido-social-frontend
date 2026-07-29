import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { getSiteContent } from "@/lib/content";

export const metadata: Metadata = {
  title: "Liike- ja toimitilojen vuokraus Jyväskylä",
  description: "JKP Groupin vuokrattavat liike- ja toimitilat Jyväskylän alueella. Kysy vapaita kohteita suoraan omistajalta.",
  alternates: { canonical: "/vuokraus" },
};
export const dynamic = "force-dynamic";

export default async function VuokrausPage() {
  const content = await getSiteContent();
  return (
    <>
      <Header email={content.company.email} />
      <main>
        <section className="subhero rental-hero"><div className="shell subhero-grid"><div><p className="eyebrow">Liike- ja toimitilat</p><h1>{content.rental.title}</h1><p>{content.rental.lead}</p><a className="button" href="#tilakysely">Kysy vapaita tiloja</a></div><div className="space-visual"><div><span>JKP / SPACE</span><strong>Tilaa toimia.</strong></div></div></div></section>
        <section className="section"><div className="shell section-heading"><div><p className="eyebrow dark">Vuokrattavat kohteet</p><h2>Kohdelistaus on valmis täytettäväksi.</h2></div><p>Emme julkaise keksittyjä neliöitä, hintoja tai saatavuustietoja. Kortit korvataan vahvistetuilla kohdetiedoilla asiakkaan materiaalitoimituksen jälkeen.</p></div><div className="shell property-grid"><article className="property-card"><div className="property-placeholder"><span>KOHDE 01</span></div><div><small>Tiedot odottavat vahvistusta</small><h3>Liike- tai toimitila</h3><p>Sijainti, pinta-ala, vuokra, vapautuminen ja kuvat lisätään tähän.</p></div></article><article className="property-card"><div className="property-placeholder second"><span>KOHDE 02</span></div><div><small>Tiedot odottavat vahvistusta</small><h3>Varasto- tai tuotantotila</h3><p>Kohteen tekniset ominaisuudet, saavutettavuus ja ehdot lisätään tähän.</p></div></article></div></section>
        <section className="contact-section" id="tilakysely"><div className="shell contact-grid"><div><p className="eyebrow">Tilakysely</p><h2>Kuvaa käyttötarkoitus ja tarvittava koko.</h2><p>Ilmoita toimiala, tilatyyppi, toivottu sijainti, neliöt ja tavoiteaikataulu.</p></div><ContactForm subject="Liike- tai toimitilan vuokrauskysely" /></div></section>
      </main>
      <Footer content={content} />
    </>
  );
}
