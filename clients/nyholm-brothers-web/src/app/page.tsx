import Image from "next/image";
import Link from "next/link";
import { FAQList } from "@/components/faq-list";
import { JsonLd } from "@/components/json-ld";
import { LeadSection } from "@/components/lead-section";
import { TrackedLink } from "@/components/tracked-link";
import {
  ArrowIcon,
  CheckIcon,
  Container,
  MapPinIcon,
  PhoneIcon,
} from "@/components/ui";
import {
  featuredCaseStudies,
  imageUrls,
  serviceLinks,
  siteConfig,
  testimonials,
} from "@/lib/site";

const homeFaqs = [
  {
    question: "Millaisia rakennus- ja remonttikohteita toteutatte?",
    answer:
      "Toteutamme huoneisto-, keittiö- ja kylpyhuoneremontteja, korjausrakentamista, terasseja, piharakennuksia, pohja- ja perustustöitä sekä saaristo- ja rantakohteita.",
  },
  {
    question: "Millä alueilla toimitte?",
    answer:
      "Pääalueemme on Espoo. Palvelemme myös Helsingissä, Vantaalla ja muualla pääkaupunkiseudulla. Saaristo- ja erikoiskohteiden soveltuvuus arvioidaan kohdekohtaisesti.",
  },
  {
    question: "Onko kartoituskäynti maksuton?",
    answer:
      "Kyllä. Ensimmäinen kartoituskäynti on maksuton eikä sido tilaukseen. Käynnillä tarkennamme työn rajauksen ja sopivan etenemistavan.",
  },
  {
    question: "Saanko tarjouksen koko urakasta?",
    answer:
      "Tavoitteena on rajata kokonaisuus mahdollisimman selkeästi ennen aloitusta. Tarjouksessa kerrotaan sovitut työt, ja mahdollisista lisätöistä sovitaan erikseen ennen toteutusta.",
  },
  {
    question: "Kuka vastaa projektin etenemisestä?",
    answer:
      "Saat nimetyn yhteyshenkilön, joka pitää kokonaisuuden hallussa ja viestii työn etenemisestä. Näin vastuu ei hajaannu eri tekijöiden väliin.",
  },
];

const homeFaqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: homeFaqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: { "@type": "Answer", text: faq.answer },
  })),
};

const services = [
  {
    number: "01",
    title: "Huoneistoremontit",
    text: "Kodin pinnat, keittiö, märkätilat ja muutostyöt hallittuna kokonaisuutena.",
    href: "/huoneistoremontti-espoo",
  },
  {
    number: "02",
    title: "Kylpyhuoneet",
    text: "Märkätilän työvaiheet purusta viimeistelyyn selkeästi koordinoituna.",
    href: "/kylpyhuoneremontti-espoo",
  },
  {
    number: "03",
    title: "Korjausrakentaminen",
    text: "Vanhojen rakennusten, saunojen ja rakenteiden korjaukset kohteen ehdoilla.",
    href: "/korjausrakentaminen-espoo",
  },
  {
    number: "04",
    title: "Terassit ja piharakennukset",
    text: "Terassit, saunat, varastot ja pienrakennukset perustuksista valmiiksi.",
    href: "/terassin-rakentaminen-espoo",
  },
  {
    number: "05",
    title: "Saaristorakentaminen",
    text: "Ranta- ja saaristokohteet, joissa logistiikka ja työjärjestys ratkaisevat.",
    href: "/saaristorakentaminen-espoo",
  },
  {
    number: "06",
    title: "Maarakennus ja perustukset",
    text: "Pohjatyöt ja perustukset osana kestävää rakennuskokonaisuutta.",
    href: "/maarakennus-ja-perustukset",
  },
];

export default function Home() {
  return (
    <>
      <JsonLd data={homeFaqSchema} />

      <section className="home-hero">
        <Image
          alt="Nyholm Brothersin rakentama puuterassi ja rakennuskohde"
          className="hero-image"
          fill
          priority
          sizes="100vw"
          src={imageUrls.terrace}
        />
        <div className="hero-scrim" />
        <Container className="hero-content">
          <p className="eyebrow eyebrow-light">
            Rakennusliike · Espoo ja pääkaupunkiseutu
          </p>
          <h1>
            Rakentamista,
            <br />
            joka etenee <em>sovitusti.</em>
          </h1>
          <p className="hero-lead">
            Remontit, piharakennukset ja vaativat kohteet yhdeltä
            vastuulliselta kumppanilta – kartoituksesta valmiiseen työhön.
          </p>
          <div className="hero-actions">
            <TrackedLink
              className="button button-primary button-large"
              eventName="cta_click"
              eventLabel="hero"
              href="/yhteystiedot#tarjous"
            >
              Varaa maksuton kartoitus
              <ArrowIcon />
            </TrackedLink>
            <TrackedLink
              className="hero-phone"
              eventName="phone_click"
              eventLabel="hero"
              href={siteConfig.phoneHref}
            >
              <PhoneIcon />
              <span>
                <small>Soita Patricille</small>
                {siteConfig.phoneDisplay}
              </span>
            </TrackedLink>
          </div>
        </Container>
        <div className="hero-index" aria-hidden="true">
          <span>NB</span>
          <span>01 / 04</span>
        </div>
      </section>

      <section aria-label="Palvelulupaukset" className="proof-strip">
        <Container>
          <div>
            <CheckIcon />
            <span>
              <strong>Yksi yhteyshenkilö</strong>
              projektin alusta loppuun
            </span>
          </div>
          <div>
            <CheckIcon />
            <span>
              <strong>Selkeä eteneminen</strong>
              muutoksista sovitaan
            </span>
          </div>
          <div>
            <MapPinIcon />
            <span>
              <strong>Paikallinen tekijä</strong>
              Espoo · Helsinki · Vantaa
            </span>
          </div>
        </Container>
      </section>

      <section className="section intro-section">
        <Container className="intro-grid">
          <div>
            <p className="eyebrow">Mitä saat meiltä</p>
            <h2 className="display-heading">
              Vähemmän epävarmuutta.
              <br />
              Enemmän valmista.
            </h2>
          </div>
          <div className="intro-copy">
            <p className="large-copy">
              Hyvä lopputulos ei synny vain käsityöstä. Se syntyy siitä, että
              työn rajaus, vastuut ja seuraava vaihe ovat selvillä.
            </p>
            <p>
              Tutustumme kohteeseen ennen ratkaisuja, rakennamme ymmärrettävän
              etenemisen ja pidämme yhteyttä työn aikana. Sinun ei tarvitse
              johtaa eri tekijöitä tai arvailla, missä projekti menee.
            </p>
            <Link className="text-link" href="/yritys">
              Näin työskentelemme
              <ArrowIcon />
            </Link>
          </div>
        </Container>
      </section>

      <section className="section services-section" id="palvelut">
        <Container>
          <div className="section-heading">
            <div>
              <p className="eyebrow">Palvelut</p>
              <h2 className="display-heading">Yksi tekijä. Koko työ.</h2>
            </div>
            <p>
              Toteutamme remontit ja rakennustyöt sovitussa laajuudessa –
              yksittäisestä tilasta laajaan kokonaisuuteen.
            </p>
          </div>
          <div className="service-grid">
            {services.map((service) => (
              <Link
                className="service-card"
                href={service.href}
                key={service.title}
              >
                <span className="service-number">{service.number}</span>
                <h3>{service.title}</h3>
                <p>{service.text}</p>
                <span className="card-link">
                  Tutustu palveluun
                  <ArrowIcon />
                </span>
              </Link>
            ))}
          </div>
          <div className="service-area-links" aria-label="Palvelusivut">
            {serviceLinks.map((link) => (
              <Link href={link.href} key={link.href}>
                {link.label}
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <section className="split-feature" id="miksi-me">
        <div className="split-image">
          <Image
            alt="Huolellisesti viimeistelty kylpyhuoneremontti"
            fill
            sizes="(max-width: 900px) 100vw, 50vw"
            src={imageUrls.bathroom}
          />
          <div className="image-caption">
            <span>02</span>
            <p>Aitoja kohteita. Ei kuvapankkia.</p>
          </div>
        </div>
        <div className="split-copy">
          <p className="eyebrow eyebrow-light">Miksi Nyholm Brothers</p>
          <h2>Työnjälki näkyy. Toimintatapa tuntuu.</h2>
          <p>
            Asiakkaidemme palautteissa toistuvat samat asiat: aktiivinen
            viestintä, joustavuus, ongelmanratkaisu ja sovitusta kiinni
            pitäminen.
          </p>
          <ol className="reason-list">
            <li>
              <span>01</span>
              <div>
                <h3>Ensin ymmärrys, sitten tarjous</h3>
                <p>
                  Käymme kohteen ja tavoitteen läpi ennen työn rajaamista.
                </p>
              </div>
            </li>
            <li>
              <span>02</span>
              <div>
                <h3>Yksi vastuu kokonaisuudesta</h3>
                <p>
                  Saat yhteyshenkilön, joka johtaa työtä ja pitää sinut ajan
                  tasalla.
                </p>
              </div>
            </li>
            <li>
              <span>03</span>
              <div>
                <h3>Muutoksista puhutaan ajoissa</h3>
                <p>
                  Jos työmaalla löytyy uutta, vaihtoehdot ja vaikutukset
                  käydään läpi ennen päätöstä.
                </p>
              </div>
            </li>
          </ol>
        </div>
      </section>

      <section className="section cases-section">
        <Container>
          <div className="section-heading section-heading-row">
            <div>
              <p className="eyebrow">Valittuja töitä</p>
              <h2 className="display-heading">Jälki kertoo olennaisen.</h2>
            </div>
            <Link className="text-link" href="/referenssit">
              Kaikki referenssit
              <ArrowIcon />
            </Link>
          </div>

          <div className="case-grid">
            {featuredCaseStudies.map((study, index) => (
              <Link
                className={`case-card ${index === 0 ? "case-card-large" : ""}`}
                href={`/referenssit/${study.slug}`}
                key={study.slug}
              >
                <div className="case-image">
                  <Image
                    alt={study.images[0].alt}
                    fill
                    sizes={
                      index === 0
                        ? "(max-width: 900px) 100vw, 56vw"
                        : "(max-width: 900px) 100vw, 38vw"
                    }
                    src={study.images[0].src}
                  />
                </div>
                <div className="case-meta">
                  <span>{study.category}</span>
                  <span>{study.location}</span>
                </div>
                <h3>{study.title}</h3>
                <span className="card-link">
                  Katso projekti
                  <ArrowIcon />
                </span>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <section className="section process-section">
        <Container>
          <div className="section-heading">
            <div>
              <p className="eyebrow">Näin projekti etenee</p>
              <h2 className="display-heading">Selkeästi vaihe vaiheelta.</h2>
            </div>
            <p>
              Tiedät alusta asti, mitä tapahtuu seuraavaksi ja milloin päätöksiä
              tarvitaan.
            </p>
          </div>
          <ol className="process-grid">
            {[
              [
                "Yhteydenotto",
                "Kerro kohteesta lomakkeella tai puhelimessa.",
              ],
              [
                "Kartoitus",
                "Käymme paikan päällä läpi lähtötilanteen ja tavoitteen.",
              ],
              [
                "Rajaus ja tarjous",
                "Saat ehdotuksen toteutuksesta, sisällöstä ja etenemisestä.",
              ],
              [
                "Toteutus",
                "Johdamme työn, viestimme etenemisestä ja viimeistelemme sovitun.",
              ],
            ].map(([title, text], index) => (
              <li key={title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section className="section testimonials-section">
        <Container>
          <div className="section-heading section-heading-row">
            <div>
              <p className="eyebrow">Asiakkaiden sanoin</p>
              <h2 className="display-heading">Luottamus ansaitaan työmaalla.</h2>
            </div>
            <p>
              Palautteissa korostuvat työn laatu, viestintä ja sovitun
              pitäminen.
            </p>
          </div>
          <div className="testimonial-grid">
            {testimonials.map((testimonial) => (
              <figure key={testimonial.name}>
                <div aria-label="5/5 tähteä" className="stars">
                  ★ ★ ★ ★ ★
                </div>
                <blockquote>“{testimonial.quote}”</blockquote>
                <figcaption>
                  <strong>{testimonial.name}</strong>
                  <span>{testimonial.project}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </Container>
      </section>

      <section className="areas-section">
        <Container className="areas-grid">
          <div>
            <p className="eyebrow eyebrow-light">Palvelualue</p>
            <h2>Espoosta koko pääkaupunkiseudulle.</h2>
          </div>
          <div className="area-links">
            <Link href="/rakennusliike-espoo">
              <span>Espoo</span>
              <ArrowIcon />
            </Link>
            <Link href="/rakennusliike-helsinki">
              <span>Helsinki</span>
              <ArrowIcon />
            </Link>
            <Link href="/rakennusliike-vantaa">
              <span>Vantaa</span>
              <ArrowIcon />
            </Link>
          </div>
        </Container>
      </section>

      <section className="section faq-section">
        <Container className="faq-grid">
          <div>
            <p className="eyebrow">Usein kysyttyä</p>
            <h2 className="display-heading">Hyvä tietää ennen remonttia.</h2>
            <p>
              Etkö löytänyt vastausta? Soita, niin käydään tilanne läpi ilman
              myyntipuhetta.
            </p>
          </div>
          <FAQList items={homeFaqs} />
        </Container>
      </section>

      <LeadSection source="home" />
    </>
  );
}
