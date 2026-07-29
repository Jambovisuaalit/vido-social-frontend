import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/json-ld";
import { LeadSection } from "@/components/lead-section";
import { ArrowIcon, Breadcrumbs, CheckIcon, Container } from "@/components/ui";
import {
  caseStudies,
  getCaseStudy,
  getRelatedCaseStudies,
  siteConfig,
} from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return caseStudies.map((study) => ({ slug: study.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) return {};

  const socialImage = study.images[0]?.src ?? "/opengraph-image";

  return {
    title: study.metaTitle,
    description: study.description,
    alternates: { canonical: `/referenssit/${study.slug}` },
    openGraph: {
      title: study.metaTitle,
      description: study.description,
      url: `/referenssit/${study.slug}`,
      images: [{ url: socialImage }],
    },
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) notFound();

  const canonicalUrl = `${siteConfig.url}/referenssit/${study.slug}`;
  const relatedStudies = getRelatedCaseStudies(study.slug);
  const storyItems = [
    {
      number: "01",
      title: "Lähtötilanne",
      text: study.startingPoint,
    },
    {
      number: "02",
      title: "Haaste",
      text: study.challenge,
    },
    {
      number: "03",
      title: "Ratkaisu",
      text: study.solution,
    },
  ];

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
        name: "Referenssit",
        item: `${siteConfig.url}/referenssit`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: study.title,
        item: canonicalUrl,
      },
    ],
  };

  const projectSchema = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "@id": `${canonicalUrl}#project`,
    name: study.title,
    headline: study.title,
    description: study.description,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": canonicalUrl,
    },
    author: { "@id": `${siteConfig.url}/#organization` },
    publisher: { "@id": `${siteConfig.url}/#organization` },
    about: [
      { "@type": "Thing", name: study.category },
      { "@type": "Thing", name: study.propertyType },
    ],
    spatialCoverage: {
      "@type": "Place",
      name: study.location,
    },
    ...(study.images.length > 0
      ? { image: study.images.map((image) => image.src) }
      : {}),
  };

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={projectSchema} />
      <header className="case-hero">
        <Container>
          <Breadcrumbs
            items={[
              { label: "Etusivu", href: "/" },
              { label: "Referenssit", href: "/referenssit" },
              { label: study.title },
            ]}
          />
          <p className="case-number-label">Case {study.caseNumber}</p>
          <div className="case-meta">
            <span>{study.category}</span>
            <span>{study.location}</span>
          </div>
          <h1>{study.title}</h1>
          <p>{study.summary}</p>
          <div className="case-hero-links">
            <Link className="text-link" href={study.serviceLink.href}>
              {study.serviceLink.label}
              <ArrowIcon />
            </Link>
            <Link className="case-all-link" href="/referenssit">
              Kaikki referenssit
            </Link>
          </div>
        </Container>
      </header>

      {study.images.length > 0 ? (
        <section className="case-gallery">
          <Container>
            <div
              className={`case-gallery-grid case-gallery-grid-${study.images.length}`}
            >
              {study.images.map((image, index) => (
                <div
                  className={
                    index === 0 ? "gallery-primary" : "gallery-secondary"
                  }
                  key={image.src}
                >
                  <Image
                    alt={image.alt}
                    fill
                    priority={index === 0}
                    sizes={
                      index === 0
                        ? "(max-width: 900px) 100vw, 65vw"
                        : "(max-width: 900px) 100vw, 30vw"
                    }
                    src={image.src}
                  />
                </div>
              ))}
            </div>
          </Container>
        </section>
      ) : (
        <section className="case-editorial-cover">
          <Container>
            <span>Case {study.caseNumber}</span>
            <div>
              <p>{study.category}</p>
              <strong>{study.propertyType}</strong>
              <small>{study.location}</small>
            </div>
          </Container>
        </section>
      )}

      <section className="case-facts-section">
        <Container>
          <dl className="case-fact-grid">
            {study.facts.map((fact) => (
              <div key={fact.label}>
                <dt>{fact.label}</dt>
                <dd>{fact.value}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      <section className="section case-story-section">
        <Container>
          <div className="section-heading">
            <div>
              <p className="eyebrow">Projektin kokonaisuus</p>
              <h2 className="display-heading">
                Miksi työ tehtiin ja miten se ratkaistiin.
              </h2>
            </div>
            <p>
              Case perustuu kohteeseen yhdistettyihin projektitietoihin ja
              asiakkaan julkaistuun palautteeseen.
            </p>
          </div>
          <div className="case-story-grid">
            {storyItems.map((item) => (
              <article key={item.title}>
                <span>{item.number}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="section case-phases-section">
        <Container>
          <div className="section-heading">
            <div>
              <p className="eyebrow eyebrow-light">Toteutus</p>
              <h2 className="display-heading">Projekti vaihe vaiheelta.</h2>
            </div>
            <p>
              Kokonaisuus pilkottiin ymmärrettäviksi vaiheiksi, jotta työn
              eteneminen ja päätökset pysyivät hallinnassa.
            </p>
          </div>
          <ol className="case-phase-list">
            {study.phases.map((phase, index) => (
              <li key={phase.title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <h3>{phase.title}</h3>
                  <p>{phase.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section className="section case-content">
        <Container className="case-content-grid">
          <div>
            <p className="eyebrow">Työn sisältö</p>
            <h2 className="display-heading">
              Mitä projektiin dokumentoidusti kuului.
            </h2>
          </div>
          <div>
            <ul className="check-list">
              {study.scope.map((item) => (
                <li key={item}>
                  <CheckIcon />
                  {item}
                </li>
              ))}
            </ul>
            <h3>Lopputulos</h3>
            <p>{study.outcome}</p>
            <Link className="text-link" href={study.serviceLink.href}>
              {study.serviceLink.label}
              <ArrowIcon />
            </Link>
          </div>
        </Container>
      </section>

      <section className="case-quote">
        <Container>
          <blockquote>“{study.quote}”</blockquote>
          <p>{study.quoteName}</p>
        </Container>
      </section>

      <section className="section case-value-section">
        <Container>
          <div className="section-heading">
            <div>
              <p className="eyebrow">Arvo tilaajalle</p>
              <h2 className="display-heading">
                Mitä tästä projektista kannattaa huomata.
              </h2>
            </div>
          </div>
          <div className="case-value-grid">
            {study.customerValue.map((item, index) => (
              <article key={item.title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="section related-cases-section">
        <Container>
          <div className="section-heading section-heading-row">
            <div>
              <p className="eyebrow">Seuraavat projektit</p>
              <h2 className="display-heading">Tutustu muihin toteutuksiin.</h2>
            </div>
            <Link className="text-link" href="/referenssit">
              Kaikki referenssit
              <ArrowIcon />
            </Link>
          </div>
          <div className="related-case-grid">
            {relatedStudies.map((related) => (
              <Link
                className="related-case-card"
                href={`/referenssit/${related.slug}`}
                key={related.slug}
              >
                <div
                  className={`related-case-media ${
                    related.images.length === 0
                      ? "related-case-media-editorial"
                      : ""
                  }`}
                >
                  {related.images[0] ? (
                    <Image
                      alt={related.images[0].alt}
                      fill
                      sizes="(max-width: 700px) 100vw, 50vw"
                      src={related.images[0].src}
                    />
                  ) : (
                    <>
                      <span>Case {related.caseNumber}</span>
                      <strong>{related.propertyType}</strong>
                    </>
                  )}
                </div>
                <div className="case-meta">
                  <span>Case {related.caseNumber}</span>
                  <span>{related.location}</span>
                </div>
                <h3>{related.title}</h3>
                <span className="card-link">
                  Avaa projekti
                  <ArrowIcon />
                </span>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <LeadSection
        source={`case_${study.slug}`}
        title="Onko sinulla samankaltainen projekti?"
      />
    </>
  );
}
