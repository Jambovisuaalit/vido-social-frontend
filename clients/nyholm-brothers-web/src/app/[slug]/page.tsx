import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FAQList } from "@/components/faq-list";
import { JsonLd } from "@/components/json-ld";
import { LeadSection } from "@/components/lead-section";
import { TrackedLink } from "@/components/tracked-link";
import {
  ArrowIcon,
  Breadcrumbs,
  CheckIcon,
  Container,
  PhoneIcon,
} from "@/components/ui";
import {
  caseStudies,
  getServicePage,
  servicePages,
  siteConfig,
} from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return servicePages.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = getServicePage(slug);

  if (!page) return {};

  return {
    title: page.metaTitle,
    description: page.description,
    alternates: { canonical: `/${page.slug}` },
    openGraph: {
      title: page.metaTitle,
      description: page.description,
      url: `/${page.slug}`,
      images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
    },
  };
}

export default async function ServicePageRoute({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = getServicePage(slug);

  if (!page) notFound();

  const relatedCase = caseStudies.find(
    (study) => study.serviceLink.href === `/${page.slug}`,
  );

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: page.eyebrow,
    description: page.description,
    url: `${siteConfig.url}/${page.slug}`,
    provider: { "@id": `${siteConfig.url}/#organization` },
    areaServed: [
      { "@type": "City", name: "Espoo" },
      { "@type": "City", name: "Helsinki" },
      { "@type": "City", name: "Vantaa" },
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: page.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Etusivu",
        item: siteConfig.url,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: page.eyebrow,
        item: `${siteConfig.url}/${page.slug}`,
      },
    ],
  };

  return (
    <>
      <JsonLd data={serviceSchema} />
      <JsonLd data={faqSchema} />
      <JsonLd data={breadcrumbSchema} />

      <section className="page-hero">
        <Image
          alt={page.title}
          className="hero-image"
          fill
          priority
          sizes="100vw"
          src={page.image}
        />
        <div className="hero-scrim" />
        <Container className="page-hero-content">
          <Breadcrumbs
            items={[{ label: "Etusivu", href: "/" }, { label: page.eyebrow }]}
          />
          <p className="eyebrow eyebrow-light">{page.eyebrow}</p>
          <h1>{page.title}</h1>
          <p>{page.hero}</p>
          <div className="hero-actions">
            <TrackedLink
              className="button button-primary button-large"
              eventName="cta_click"
              eventLabel={`${page.slug}_hero`}
              href="#tarjous"
            >
              Varaa maksuton kartoitus
              <ArrowIcon />
            </TrackedLink>
            <TrackedLink
              className="hero-phone"
              eventName="phone_click"
              eventLabel={`${page.slug}_hero`}
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
      </section>

      <section className="section service-intro">
        <Container className="service-intro-grid">
          <div>
            <p className="eyebrow">Selkeä toteutus</p>
            <h2 className="display-heading">
              Kun kokonaisuus on hallussa, työmaa ei hallitse sinua.
            </h2>
          </div>
          <div>
            <p className="large-copy">{page.intro}</p>
            <ul className="check-list">
              {page.benefits.map((benefit) => (
                <li key={benefit}>
                  <CheckIcon />
                  {benefit}
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      <section className="section included-section">
        <Container className="included-grid">
          <div className="included-image">
            <Image
              alt={`${page.eyebrow} – Nyholm Brothersin toteuttama kohde`}
              fill
              sizes="(max-width: 900px) 100vw, 48vw"
              src={page.image}
            />
          </div>
          <div className="included-copy">
            <p className="eyebrow">Mitä voimme toteuttaa</p>
            <h2>Työn sisältö rajataan kohteen mukaan.</h2>
            <div className="included-list">
              {page.included.map((item, index) => (
                <div key={item}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <p>{item}</p>
                </div>
              ))}
            </div>
            <p className="local-note">{page.localNote}</p>
          </div>
        </Container>
      </section>

      <section className="section mini-process">
        <Container>
          <div className="section-heading">
            <div>
              <p className="eyebrow">Ennen ensimmäistä työpäivää</p>
              <h2 className="display-heading">Kolme asiaa selväksi.</h2>
            </div>
          </div>
          <ol>
            <li>
              <span>01</span>
              <h3>Mitä tehdään?</h3>
              <p>Työn tavoite, rajaus ja materiaalit.</p>
            </li>
            <li>
              <span>02</span>
              <h3>Miten edetään?</h3>
              <p>Työjärjestys, aikataulu ja käytännön järjestelyt.</p>
            </li>
            <li>
              <span>03</span>
              <h3>Kuka vastaa?</h3>
              <p>Yhteyshenkilö, viestintä ja muutosten käsittely.</p>
            </li>
          </ol>
        </Container>
      </section>

      <section className="section service-proof">
        <Container>
          <div className="quote-panel">
            <span aria-hidden="true" className="quote-mark">
              “
            </span>
            <blockquote>
              {relatedCase?.quote ??
                "Kommunikaatio eri vaihtoehdoista ja kustannuksista oli erinomaista. Myös ongelmanratkaisu toimi hienosti."}
            </blockquote>
            <p>
              {relatedCase?.quoteName ?? "Paavo, asiakas"} ·{" "}
              {relatedCase?.category.toLocaleLowerCase("fi") ??
                "huoneistoremontti"}
            </p>
            <Link
              className="text-link"
              href={
                relatedCase
                  ? `/referenssit/${relatedCase.slug}`
                  : "/referenssit"
              }
            >
              {relatedCase ? "Lue koko projekti" : "Tutustu töihimme"}
              <ArrowIcon />
            </Link>
          </div>
        </Container>
      </section>

      <section className="section faq-section">
        <Container className="faq-grid">
          <div>
            <p className="eyebrow">Usein kysyttyä</p>
            <h2 className="display-heading">{page.eyebrow}: kysymykset</h2>
          </div>
          <FAQList items={page.faqs} />
        </Container>
      </section>

      <LeadSection
        source={page.slug}
        title={`Suunnitteletko kohdetta? Aloitetaan maksuttomalla kartoituksella.`}
      />
    </>
  );
}
