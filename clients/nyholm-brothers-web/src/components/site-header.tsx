import Image from "next/image";
import Link from "next/link";
import { Container, PhoneIcon } from "@/components/ui";
import { TrackedLink } from "@/components/tracked-link";
import { imageUrls, mainNavigation, siteConfig } from "@/lib/site";

export function SiteHeader() {
  return (
    <>
      <a className="skip-link" href="#sisalto">
        Siirry sisältöön
      </a>
      <div className="utility-bar">
        <Container className="utility-inner">
          <p>Rakentamista sovitusti Espoossa ja pääkaupunkiseudulla</p>
          <TrackedLink
            eventName="phone_click"
            eventLabel="utility"
            href={siteConfig.phoneHref}
          >
            <PhoneIcon />
            {siteConfig.phoneDisplay}
          </TrackedLink>
        </Container>
      </div>
      <header className="site-header">
        <Container className="header-inner">
          <Link aria-label="Nyholm Brothers – etusivu" className="brand" href="/">
            <Image
              alt="Nyholm Brothers"
              height={70}
              priority
              sizes="(max-width: 640px) 170px, 210px"
              src={imageUrls.logoDark}
              width={184}
            />
          </Link>

          <nav aria-label="Päänavigaatio" className="desktop-nav">
            {mainNavigation.map((item) => (
              <Link href={item.href} key={item.href}>
                {item.label}
              </Link>
            ))}
          </nav>

          <TrackedLink
            className="button button-primary header-cta"
            eventName="cta_click"
            eventLabel="header"
            href="/yhteystiedot#tarjous"
          >
            Pyydä kartoitus
          </TrackedLink>

          <details className="mobile-menu">
            <summary aria-label="Avaa valikko">
              <span />
              <span />
              <span />
            </summary>
            <nav aria-label="Mobiilinavigaatio">
              {mainNavigation.map((item) => (
                <Link href={item.href} key={item.href}>
                  {item.label}
                </Link>
              ))}
              <TrackedLink
                className="button button-primary"
                eventName="cta_click"
                eventLabel="mobile_menu"
                href="/yhteystiedot#tarjous"
              >
                Pyydä kartoitus
              </TrackedLink>
            </nav>
          </details>
        </Container>
      </header>
    </>
  );
}
