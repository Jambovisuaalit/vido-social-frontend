import type { Metadata } from "next";
import Image from "next/image";
import { LeadSection } from "@/components/lead-section";
import { Breadcrumbs, CheckIcon, Container } from "@/components/ui";
import { imageUrls, siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Yritys",
  description:
    "Nyholm Brothers Oy on espoolainen rakennusliike. Tutustu toimintatapaan, jossa vastuu, viestintä ja työn laatu kulkevat yhdessä.",
  alternates: { canonical: "/yritys" },
};

export default function CompanyPage() {
  return (
    <>
      <header className="simple-page-header simple-page-header-dark">
        <Container>
          <Breadcrumbs
            items={[{ label: "Etusivu", href: "/" }, { label: "Yritys" }]}
          />
          <p className="eyebrow eyebrow-light">Nyholm Brothers Oy</p>
          <h1>Kaksi veljestä. Yksi vastuu työn jäljestä.</h1>
          <p>
            Olemme espoolainen rakennusliike, joka rakentaa pitkäaikaisia
            asiakassuhteita samalla tavalla kuin hyviä kohteita: huolellisesti ja
            vaihe kerrallaan.
          </p>
        </Container>
      </header>

      <section className="section company-intro">
        <Container className="company-intro-grid">
          <div className="company-image">
            <Image
              alt="Nyholm Brothersin kunnostama rantasauna"
              fill
              priority
              sizes="(max-width: 900px) 100vw, 48vw"
              src={imageUrls.saunaExterior}
            />
          </div>
          <div>
            <p className="eyebrow">Perustettu Espoossa 2023</p>
            <h2 className="display-heading">Kasvu syntyy suositteluista.</h2>
            <p className="large-copy">
              Patric ja Kasper Nyholm perustivat yrityksen ajatukselle, että
              rakennusliikkeen pitää kantaa vastuu sekä työn jäljestä että
              asiakkaan kokemuksesta.
            </p>
            <p>
              Toteutamme huoneisto- ja märkätiläremontteja,
              korjausrakentamista, terasseja, piharakennuksia sekä vaativia
              saari- ja rantakohteita. Emme pyri olemaan kaikkea kaikille.
              Parhaimmillamme olemme työssä, jossa suunnittelu, käytännön
              ongelmanratkaisu ja huolellinen toteutus kuuluvat samaan urakkaan.
            </p>
            <dl className="company-facts">
              <div>
                <dt>Kotipaikka</dt>
                <dd>Espoo</dd>
              </div>
              <div>
                <dt>Y-tunnus</dt>
                <dd>{siteConfig.businessId}</dd>
              </div>
              <div>
                <dt>Perustettu</dt>
                <dd>2023</dd>
              </div>
            </dl>
          </div>
        </Container>
      </section>

      <section className="section values-section">
        <Container>
          <div className="section-heading">
            <div>
              <p className="eyebrow">Toimintatapamme</p>
              <h2 className="display-heading">Mitä voit meiltä odottaa.</h2>
            </div>
          </div>
          <div className="value-grid">
            {[
              {
                title: "Suora puhe",
                text: "Kerromme vaihtoehdoista, riskeistä ja kustannuksiin vaikuttavista asioista ymmärrettävästi.",
              },
              {
                title: "Näkyvä vastuu",
                text: "Tiedät, kuka projektia johtaa ja keneltä saat vastauksen.",
              },
              {
                title: "Huolellinen jälki",
                text: "Työ ei ole valmis ennen kuin sovittu kokonaisuus on viimeistelty.",
              },
              {
                title: "Joustava ongelmanratkaisu",
                text: "Rakentamisessa tulee yllätyksiä. Ratkaisemme ne yhdessä ennen kuin jatkamme.",
              },
            ].map((value) => (
              <article key={value.title}>
                <CheckIcon />
                <h3>{value.title}</h3>
                <p>{value.text}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <LeadSection
        source="company"
        title="Etsitkö tekijää, jolle voit antaa kokonaisvastuun?"
      />
    </>
  );
}
