import type { Metadata } from "next";
import { Breadcrumbs, Container } from "@/components/ui";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Tietosuojaseloste",
  description: "Nyholm Brothers Oy:n verkkosivuston tietosuojaseloste.",
  alternates: { canonical: "/tietosuojaseloste" },
  robots: { index: true, follow: true },
};

export default function PrivacyPage() {
  return (
    <article className="legal-page">
      <Container>
        <Breadcrumbs
          items={[
            { label: "Etusivu", href: "/" },
            { label: "Tietosuojaseloste" },
          ]}
        />
        <p className="eyebrow">Päivitetty 29.7.2026</p>
        <h1>Tietosuojaseloste</h1>
        <p className="legal-lead">
          Tässä selosteessa kerromme, miten Nyholm Brothers Oy käsittelee
          verkkosivuston kautta saatuja henkilötietoja.
        </p>

        <h2>1. Rekisterinpitäjä</h2>
        <p>
          {siteConfig.legalName}, Y-tunnus {siteConfig.businessId}
          <br />
          {siteConfig.address.street}, {siteConfig.address.postalCode}{" "}
          {siteConfig.address.city}
          <br />
          Sähköposti: {siteConfig.email}
          <br />
          Puhelin: {siteConfig.phoneDisplay}
        </p>

        <h2>2. Käsiteltävät tiedot</h2>
        <p>
          Yhteydenottolomakkeella voimme kerätä nimen, puhelinnumeron,
          sähköpostiosoitteen, kohteen sijainnin, kiinnostavan palvelun,
          viestin sekä tekniset tiedot yhteydenoton lähteestä. Roskapostin ja
          väärinkäytön torjumiseksi käsittelemme rajatusti myös teknisiä
          lokitietoja ja yksisuuntaisesti tiivistettyä IP-osoitetta.
        </p>

        <h2>3. Käsittelyn tarkoitus ja peruste</h2>
        <p>
          Tietoja käytetään yhteydenottoon vastaamiseen, kartoituksen ja
          tarjouksen valmisteluun sekä tietoturvan varmistamiseen. Lomakkeen
          tiedot käsitellään antamasi suostumuksen perusteella. Kun keskustelu
          etenee sopimusneuvotteluksi, käsittely voi perustua myös sopimuksen
          valmisteluun.
        </p>

        <h2>4. Säilytysaika</h2>
        <p>
          Yhteydenottotietoja säilytetään vain niin kauan kuin asian
          käsitteleminen ja mahdollinen asiakassuhde edellyttävät,
          pääsääntöisesti enintään 24 kuukautta viimeisestä yhteydenotosta.
          Lakisääteiset tiedot säilytetään sovellettavan lain vaatiman ajan.
        </p>

        <h2>5. Palveluntarjoajat ja tietojen sijainti</h2>
        <p>
          Verkkosivuston teknisessä toteutuksessa käytetään Verceliä ja
          yhteydenottojen turvallisessa tallennuksessa Supabasea. Palveluita
          käytetään tietojen käsittelijöinä asianmukaisin sopimusjärjestelyin.
          Pyrimme käsittelemään yhteydenottotiedot EU/ETA-alueella. Mahdolliset
          siirrot alueen ulkopuolelle suojataan sovellettavan tietosuojalain
          mukaisesti.
        </p>

        <h2>6. Tietojen luovutukset</h2>
        <p>
          Emme myy henkilötietoja. Tietoja luovutetaan ulkopuolisille vain,
          kun palvelun toteuttaminen tai laki sitä edellyttää. Käyttöoikeudet
          rajataan työn kannalta tarpeellisiin henkilöihin ja järjestelmiin.
        </p>

        <h2>7. Oikeutesi</h2>
        <p>
          Sinulla on tilanteesta riippuen oikeus tarkastaa tietosi, pyytää
          niiden oikaisua tai poistamista, rajoittaa käsittelyä, vastustaa
          käsittelyä ja peruuttaa suostumuksesi. Voit käyttää oikeuksiasi
          ottamalla yhteyttä yllä olevaan sähköpostiosoitteeseen. Sinulla on
          myös oikeus tehdä valitus tietosuojavaltuutetun toimistolle.
        </p>

        <h2>8. Evästeet ja tekniset lokit</h2>
        <p>
          Sivusto ei tässä versiossa käytä markkinointievästeitä. Tekninen
          alusta voi käsitellä välttämättömiä lokitietoja palvelun
          turvallisuuden, toimintavarmuuden ja väärinkäytön torjunnan vuoksi.
          Jos analytiikkaa tai markkinointiteknologiaa otetaan myöhemmin
          käyttöön, tietosuojaseloste ja suostumuksenhallinta päivitetään ennen
          käyttöönottoa.
        </p>

        <h2>9. Muutokset</h2>
        <p>
          Voimme päivittää tätä selostetta, jos palvelut tai käsittelytavat
          muuttuvat. Ajantasainen versio julkaistaan tällä sivulla.
        </p>
      </Container>
    </article>
  );
}
