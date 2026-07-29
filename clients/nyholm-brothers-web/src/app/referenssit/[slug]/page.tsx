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

  return {
    title: study.metaTitle,
    description: study.description,
    alternates: { canonical: `/referenssit/${study.slug}` },
    openGraph: {
      title: study.metaTitle,
      description: study.description,
      url: `/referenssit/${study.slug}`,
      images: [{ url: study.images[0].src }],
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
        item: `${siteConfig.url}/referenssit/${study.slug}`,
      },
    ],
  };

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <header className="case-hero">
        <Container>
          <Breadcrumbs
            items={[
              { label: "Etusivu", href: "/" },
              { label: "Referenssit", href: "/referenssit" },
              { label: study.title },
            ]}
          />
          <div className="case-meta">
            <span>{study.category}</span>
            <span>{study.location}</span>
          </div>
          <h1>{study.title}</h1>
          <p>{study.summary}</p>
        </Container>
      </header>

      <section className="case-gallery">
        <Container>
          <div className="case-gallery-grid">
            {study.images.map((image, index) => (
              <div
                className={index === 0 ? "gallery-primary" : "gallery-secondary"}
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

      <section className="section case-content">
        <Container className="case-content-grid">
          <div>
            <p className="eyebrow">Työn sisältö</p>
            <h2 className="display-heading">Lähtötilanteesta valmiiksi.</h2>
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
          </div>
        </Container>
      </section>

      <section className="case-quote">
        <Container>
          <blockquote>“{study.quote}”</blockquote>
          <p>{study.quoteName}</p>
        </Container>
      </section>

      <section className="section next-case">
        <Container>
          <p className="eyebrow">Lisää toteutuksia</p>
          <Link className="text-link text-link-large" href="/referenssit">
            Katso kaikki referenssit
            <ArrowIcon />
          </Link>
        </Container>
      </section>

      <LeadSection
        source={`case_${study.slug}`}
        title="Onko sinulla samankaltainen projekti?"
      />
    </>
  );
}
