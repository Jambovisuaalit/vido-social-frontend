import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { LeadSection } from "@/components/lead-section";
import { ArrowIcon, Breadcrumbs, Container } from "@/components/ui";
import { caseStudies } from "@/lib/site";

export const metadata: Metadata = {
  title: "Referenssit",
  description:
    "Tutustu Nyholm Brothersin toteuttamiin remontti-, terassi- ja korjausrakentamisen kohteisiin.",
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
          <h1>Työt, joista meidät muistetaan.</h1>
          <p>
            Jokainen kohde on erilainen. Yhteistä niille on huolellinen rajaus,
            aktiivinen viestintä ja sovitun työn vieminen valmiiksi.
          </p>
        </Container>
      </header>

      <section className="section reference-list">
        <Container>
          {caseStudies.map((study, index) => (
            <article className="reference-row" key={study.slug}>
              <Link
                aria-label={`Avaa referenssi: ${study.title}`}
                className="reference-image"
                href={`/referenssit/${study.slug}`}
              >
                <Image
                  alt={study.images[0].alt}
                  fill
                  priority={index === 0}
                  sizes="(max-width: 900px) 100vw, 54vw"
                  src={study.images[0].src}
                />
              </Link>
              <div className="reference-copy">
                <div className="case-meta">
                  <span>{study.category}</span>
                  <span>{study.location}</span>
                </div>
                <h2>
                  <Link href={`/referenssit/${study.slug}`}>{study.title}</Link>
                </h2>
                <p>{study.summary}</p>
                <Link
                  className="text-link"
                  href={`/referenssit/${study.slug}`}
                >
                  Lue projektista
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
