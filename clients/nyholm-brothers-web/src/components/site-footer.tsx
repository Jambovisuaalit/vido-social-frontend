import Image from "next/image";
import Link from "next/link";
import { Container, MapPinIcon, PhoneIcon } from "@/components/ui";
import { TrackedLink } from "@/components/tracked-link";
import {
  imageUrls,
  mainNavigation,
  serviceLinks,
  siteConfig,
} from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <Container>
        <div className="footer-cta">
          <div>
            <p className="eyebrow eyebrow-light">Onko projekti mielessä?</p>
            <h2>Käydään kohde läpi ennen päätöksiä.</h2>
          </div>
          <TrackedLink
            className="button button-primary"
            eventName="cta_click"
            eventLabel="footer"
            href="/yhteystiedot#tarjous"
          >
            Varaa maksuton kartoitus
          </TrackedLink>
        </div>

        <div className="footer-grid">
          <div className="footer-brand">
            <Link aria-label="Nyholm Brothers – etusivu" href="/">
              <Image
                alt="Nyholm Brothers"
                height={88}
                src={imageUrls.logoLight}
                width={244}
              />
            </Link>
            <p>
              Espoolainen rakennusliike remontteihin, piharakentamiseen ja
              vaativiin korjaus- ja saaristokohteisiin.
            </p>
          </div>

          <div>
            <h3>Sivut</h3>
            <ul>
              {mainNavigation.map((item) => (
                <li key={item.href}>
                  <Link href={item.href}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3>Palvelut</h3>
            <ul>
              {serviceLinks.slice(0, 6).map((item) => (
                <li key={item.href}>
                  <Link href={item.href}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-contact">
            <h3>Ota yhteyttä</h3>
            <TrackedLink
              eventName="phone_click"
              eventLabel="footer"
              href={siteConfig.phoneHref}
            >
              <PhoneIcon />
              {siteConfig.phoneDisplay}
            </TrackedLink>
            <TrackedLink
              eventName="email_click"
              eventLabel="footer"
              href={`mailto:${siteConfig.email}`}
            >
              {siteConfig.email}
            </TrackedLink>
            <p>
              <MapPinIcon />
              <span>
                {siteConfig.address.street}
                <br />
                {siteConfig.address.postalCode} {siteConfig.address.city}
              </span>
            </p>
          </div>
        </div>

        <div className="footer-legal">
          <p>
            © {new Date().getFullYear()} {siteConfig.legalName} · Y-tunnus{" "}
            {siteConfig.businessId}
          </p>
          <Link href="/tietosuojaseloste">Tietosuojaseloste</Link>
        </div>
      </Container>
    </footer>
  );
}
