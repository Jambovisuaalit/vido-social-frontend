import type { Metadata } from "next";
import { LeadForm } from "@/components/lead-form";
import { TrackedLink } from "@/components/tracked-link";
import {
  Breadcrumbs,
  Container,
  MapPinIcon,
  PhoneIcon,
} from "@/components/ui";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Yhteystiedot ja maksuton kartoitus",
  description:
    "Ota yhteyttä Nyholm Brothersiin ja varaa maksuton kartoituskäynti remontti- tai rakennusprojektiisi Espoossa ja pääkaupunkiseudulla.",
  alternates: { canonical: "/yhteystiedot" },
};

export default function ContactPage() {
  return (
    <>
      <header className="simple-page-header contact-header">
        <Container>
          <Breadcrumbs
            items={[{ label: "Etusivu", href: "/" }, { label: "Yhteystiedot" }]}
          />
          <p className="eyebrow">Ota yhteyttä</p>
          <h1>Aloitetaan kohteesta, ei myyntipuheesta.</h1>
          <p>
            Kerro lyhyesti mitä suunnittelet. Selvitämme, onko kohde meille
            sopiva ja mitä kannattaa tehdä seuraavaksi.
          </p>
        </Container>
      </header>

      <section className="contact-section" id="tarjous">
        <Container className="contact-grid">
          <div className="contact-card">
            <p className="eyebrow eyebrow-light">Suora yhteys</p>
            <h2>Patric Nyholm</h2>
            <p>Yrittäjä · projektit ja kartoitukset</p>
            <TrackedLink
              className="contact-link"
              eventName="phone_click"
              eventLabel="contact"
              href={siteConfig.phoneHref}
            >
              <PhoneIcon />
              <span>
                <small>Puhelin</small>
                {siteConfig.phoneDisplay}
              </span>
            </TrackedLink>
            <TrackedLink
              className="contact-link"
              eventName="email_click"
              eventLabel="contact"
              href={`mailto:${siteConfig.email}`}
            >
              <span aria-hidden="true" className="mail-icon">
                @
              </span>
              <span>
                <small>Sähköposti</small>
                {siteConfig.email}
              </span>
            </TrackedLink>
            <div className="contact-link">
              <MapPinIcon />
              <span>
                <small>Osoite</small>
                {siteConfig.address.street}
                <br />
                {siteConfig.address.postalCode} {siteConfig.address.city}
              </span>
            </div>
            <p className="contact-note">
              Työmaalla emme aina pysty vastaamaan heti. Jätä viesti tai
              lomakeyhteydenotto, niin palaamme asiaan.
            </p>
          </div>

          <div className="contact-form-wrap">
            <p className="eyebrow">Maksuton kartoitus</p>
            <h2>Kerro projektistasi</h2>
            <p>
              Mitä tarkemmin kuvaat kohteen ja tavoitteen, sitä paremmin
              pystymme valmistautumaan ensimmäiseen keskusteluun.
            </p>
            <LeadForm compact source="contact" />
          </div>
        </Container>
      </section>
    </>
  );
}
