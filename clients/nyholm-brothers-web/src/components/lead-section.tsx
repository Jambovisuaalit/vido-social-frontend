import { Container, PhoneIcon } from "@/components/ui";
import { LeadForm } from "@/components/lead-form";
import { TrackedLink } from "@/components/tracked-link";
import { siteConfig } from "@/lib/site";

export function LeadSection({
  source = "lead_section",
  title = "Kerro projektistasi. Me kerromme, miten siinä kannattaa edetä.",
}: {
  source?: string;
  title?: string;
}) {
  return (
    <section className="lead-section" id="tarjous">
      <Container className="lead-section-grid">
        <div className="lead-copy">
          <p className="eyebrow eyebrow-light">Maksuton kartoituskäynti</p>
          <h2>{title}</h2>
          <p>
            Täytä perustiedot, niin Patric ottaa yhteyttä. Kartoituksessa
            selvitämme työn rajauksen, tavoitteen ja seuraavan järkevän askeleen.
          </p>
          <ul>
            <li>Ei sitoutumista</li>
            <li>Selkeä arvio sopivasta toteutustavasta</li>
            <li>Yhteys suoraan vastuuhenkilöön</li>
          </ul>
          <TrackedLink
            className="lead-phone"
            eventName="phone_click"
            eventLabel={source}
            href={siteConfig.phoneHref}
          >
            <PhoneIcon />
            <span>
              <small>Soita suoraan Patricille</small>
              {siteConfig.phoneDisplay}
            </span>
          </TrackedLink>
        </div>
        <LeadForm source={source} />
      </Container>
    </section>
  );
}
