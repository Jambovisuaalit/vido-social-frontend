import Link from "next/link";
import { ArrowIcon, Container } from "@/components/ui";

export default function NotFound() {
  return (
    <section className="not-found-page">
      <Container>
        <p className="eyebrow">404</p>
        <h1>Tätä sivua ei löytynyt.</h1>
        <p>
          Osoite on voinut muuttua. Palaa etusivulle tai tutustu
          palveluihimme.
        </p>
        <Link className="button button-primary" href="/">
          Etusivulle
          <ArrowIcon />
        </Link>
      </Container>
    </section>
  );
}
