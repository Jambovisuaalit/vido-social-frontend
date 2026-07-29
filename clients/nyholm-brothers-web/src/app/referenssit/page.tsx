import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { LeadSection } from "@/components/lead-section";
import { ArrowIcon, Breadcrumbs, Container } from "@/components/ui";
import { caseStudies } from "@/lib/site";

export const metadata: Metadata = {
  title: "Referenssit",
  description:
    "Tutustu Nyholm Brothersin remontti-, terassi- ja korjausrakentamisen case study -sivuihin: lähtötilanne, ratkaisu, työvaiheet ja asiakaskokemus.",
  alternates: { canonical: "/referenssit" },
};

export default function ReferencesPage() {
  return (
    <>
      <header className="simple-page-header">
        <Container>
          <Breadcrumbs
            items={[{ label: "Etusivu", href: "/" }, { label: "Referenssit" }]}
          />
          <p className="eyebrow">Referenssit</p>
          <h1>Projektit lähtötilanteesta lopputulokseen.</h1>
          <p>
            Tutustu kohteiden lähtötilanteeseen, ratkaisuihin, työvaiheisiin ja
            asiakkaan kokemukseen. Julkaisemme vain projektiin yhdistetyt kuvat
            ja todennetut tiedot.
          </p>
        </Container>
      </header>

      <section className="section reference-list">
        <Container>
          {caseStudies.map((study, index) => (
            <article className="reference-row" key={study.slug}>
              <Link
                aria-label={`Avaa referenssi: ${study.title}`}
                className={`reference-image ${
                  study.images.length === 0
                    ? "reference-image-editorial"
                    : ""
                }`}
                href={`/referenssit/${study.slug}`}
              >
                {study.images[0] ? (
                  <Image
                    alt={study.images[0].alt}
                    fill
                    priority={index === 0}
                    sizes="(max-width: 900px) 100vw, 54vw"
                    src={study.images[0].src}
                  />
                ) : (
                  <>
                    <span className="editorial-case-label">
                      Case {study.caseNumber}
                    </span>
                    <strong className="editorial-case-title">
                      {study.propertyType}
                    </strong>
                    <span className="editorial-case-location">
                      {study.location}
                    </span>
                  </>
                )}
              </Link>
              <div className="reference-copy">
                <div className="case-meta">
                  <span>Case {study.caseNumber}</span>
                  <span>{study.category}</span>
                  <span>{study.location}</span>
                </div>
                <h2>
                  <Link href={`/referenssit/${study.slug}`}>{study.title}</Link>
                </h2>
                <p>{study.summary}</p>
                <dl className="reference-project-facts">
                  {study.facts.slice(0, 2).map((fact) => (
                    <div key={fact.label}>
                      <dt>{fact.label}</dt>
                      <dd>{fact.value}</dd>
                    </div>
                  ))}
                </dl>
                <Link
                  className="text-link"
                  href={`/referenssit/${study.slug}`}
                >
                  Avaa koko projekti
                  <ArrowIcon />
                </Link>
              </div>
            </article>
          ))}
        </Container>
      </section>

      <LeadSection
        source="references"
        title="Haluatko vastaavan lopputuloksen omaan kohteeseesi?"
      />
    </>
  );
}
