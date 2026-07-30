import type { Metadata } from "next";
import { BusinessPremisesForm, ApartmentApplicationForm } from "@/components/RentalForms";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { getSiteContent } from "@/lib/content";

export const metadata: Metadata = {
  title: "Liike-, toimitila- ja asuntovuokraus Jyväskylä",
  description: "JKP Groupin vuokrattavat liike- ja toimitilat sekä asuntovuokrauksen hakemus Jyväskylän alueella.",
  alternates: { canonical: "/vuokraus" },
};
export const dynamic = "force-dynamic";

export default async function VuokrausPage() {
  const content = await getSiteContent();
  return (
    <>
      <Header email={content.company.email} />
      <main>
        <section className="subhero rental-hero">
          <div className="shell subhero-grid">
            <div>
              <p className="eyebrow">Vuokraus</p>
              <h1>{content.rental.title}</h1>
              <p>{content.rental.lead}</p>
              <div className="button-row">
                <a className="button" href="#toimitilakysely">Kysy toimitilaa</a>
                <a className="button button-secondary" href="#vuokrahakemus">Täytä vuokrahakemus</a>
              </div>
            </div>
            <div className="space-visual"><div><span>JKP / SPACE</span><strong>Tilaa toimia.</strong></div></div>
          </div>
        </section>

        <section className="section">
          <div className="shell section-heading">
            <div><p className="eyebrow dark">Vuokrattavat kohteet</p><h2>Kohdelistaus on valmis täytettäväksi.</h2></div>
            <p>Julkaisemme vain JKP Groupin vahvistamat kohde-, hinta- ja saatavuustiedot. Kortit täytetään asiakkaan materiaalitoimituksen jälkeen.</p>
          </div>
          <div className="shell property-grid">
            <article className="property-card"><div className="property-placeholder"><span>KOHDE 01</span></div><div><small>Tiedot odottavat vahvistusta</small><h3>Lomahuoneisto tai kiinteistö</h3><p>Sijainti, kuvat, vuokra, vapautuminen ja lisätiedot lisätään tähän.</p></div></article>
            <article className="property-card"><div className="property-placeholder second"><span>KOHDE 02</span></div><div><small>Tiedot odottavat vahvistusta</small><h3>Liike- tai toimitila</h3><p>Pinta-ala, käyttötarkoitus, saavutettavuus, vuokra ja ehdot lisätään tähän.</p></div></article>
          </div>
        </section>

        <section className="contact-section" id="toimitilakysely">
          <div className="shell contact-grid">
            <div><p className="eyebrow">Yrityksille</p><h2>B2B-toimitilojen tarjouspyyntö</h2><p>Kerro yrityksestä, tilatarpeesta, pinta-alasta, sijainnista ja tavoiteaikataulusta.</p></div>
            <BusinessPremisesForm />
          </div>
        </section>

        <section className="section" id="vuokrahakemus">
          <div className="shell contact-grid">
            <div><p className="eyebrow dark">Asuntovuokraus</p><h2>Vuokralaisen hakemuslomake</h2><p>Täytä hakemus sen jälkeen, kun olet ollut yhteydessä JKP Groupiin ilmoitetusta kohteesta.</p></div>
            <ApartmentApplicationForm />
          </div>
        </section>
      </main>
      <Footer content={content} />
    </>
  );
}
