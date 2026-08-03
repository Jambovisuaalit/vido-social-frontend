import AnalyticsConsent from "./AnalyticsConsent";
import LeadForm from "./LeadForm";
import { Badge, Button, Container, SectionTitle, VidoLogo } from "./ui";

const problems = [
  "Työmaakuvat jäävät puhelimeen.",
  "Some päivittyy satunnaisesti kiireen keskellä.",
  "Digitaalinen ensivaikutelma jää työn laatua heikommaksi."
];

const benefits = [
  ["Työ näkyväksi", "Työmaat, valmiit kohteet ja asennukset muuttuvat jatkuvaksi sisältö- ja referenssipankiksi."],
  ["Ei uutta työtehtävää", "Te lähetätte materiaalin WhatsAppilla. VIDO hoitaa tekstit, grafiikat ja sovitun julkaisuprosessin."],
  ["Referenssit ennen somehömppää", "Sisällön tehtävä on näyttää asiakkaalle, mitä osaatte tehdä ja millaista työnjälkeä voi odottaa."]
];

const steps = [
  ["01", "Ota kuvat", "Kuvaa työmaa, valmis kohde, asennus tai muu työnjälki tavalliseen tapaan."],
  ["02", "Lähetä WhatsAppilla", "Lähetä kuvat VIDOlle. Valmiita tekstejä, sisältöideoita tai erillistä järjestelmää ei tarvita."],
  ["03", "VIDO hoitaa loput", "Rakennamme sisällöt, visuaalit ja julkaisukokonaisuuden sovitun hyväksyntämallin mukaan."]
];

const deliverables = [
  ["Materiaali sisään", "Työmaa- ja kohdekuvat sekä tarvittaessa lyhyt konteksti WhatsAppilla."],
  ["VIDO-tuotanto", "Kuvavalinta, teksti, CTA, grafiikka ja kanavakohtainen viimeistely."],
  ["Hyväksyntä", "Sisällöt tarkistetaan sovitulla tavalla ennen julkaisua tai ajastusta."],
  ["Jatkuvuus", "12 valmista julkaisua kuukaudessa Facebookiin ja Instagramiin."]
];

const faqs = [
  ["Meillä ei ole aikaa hoitaa somea.", "Juuri siksi palvelu on rakennettu asynkroniseksi. Teidän tehtävänne on toimittaa materiaali työn yhteydessä. VIDO hoitaa sovitun sisältötuotannon."],
  ["Voisimme julkaista kuvat itse. Miksi maksaisimme tästä?", "Voitte. Palvelun arvo on jatkuvuudessa: materiaali muuttuu järjestelmällisesti julkaisuiksi myös kiireisinä kuukausina."],
  ["Entä jos kuvia ei ole tarpeeksi?", "Työmaat, valmiit kohteet, ennen–jälkeen-kuvat, palvelut, tekijät, kalusto ja käytännön vinkit muodostavat yhdessä sisältöpankin."],
  ["Takaako VIDO uusia asiakkaita?", "Ei. Emme lupaa tiettyä liidi- tai kauppamäärää orgaanisella sisällöllä. Rakennamme jatkuvaa näkyvyyttä ja todistetta osaamisesta."],
  ["Pitääkö sitoutua pitkäksi aikaa?", "Ei. VIDO Social maksaa 500 €/kk + ALV ja on kuukausittain irtisanottava."]
];

export default function LandingPage() {
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "+358 40 724 7621";
  const contactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL || "ville@vidosocial.com";
  const contactPhone = process.env.NEXT_PUBLIC_CONTACT_PHONE || "+358 40 724 7621";
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://vidosocial.com";
  const linkedinUrl = process.env.NEXT_PUBLIC_VILLE_LINKEDIN || "https://www.linkedin.com/in/ville1";
  const legalEntity = process.env.NEXT_PUBLIC_LEGAL_ENTITY || "Ville Olenius Tmi";
  const businessId = process.env.NEXT_PUBLIC_BUSINESS_ID || "3581471-7";

  const normalizedWhatsApp = whatsappNumber.replace(/\D/g, "");
  const whatsappHref = `https://wa.me/${normalizedWhatsApp}?text=${encodeURIComponent("Hei, haluan kuulla lisää VIDO Socialista.")}`;
  const telephoneHref = `tel:${contactPhone.replace(/[^+\d]/g, "")}`;

  return (
    <main className="overflow-x-clip bg-white">
      <header className="sticky top-0 z-50 border-b border-brand-navy/8 bg-white/95 backdrop-blur-xl">
        <Container className="flex h-18 items-center justify-between gap-5">
          <a href="#top" aria-label="VIDO Social etusivulle" className="block w-36 sm:w-44">
            <VidoLogo className="h-auto w-full" />
          </a>
          <nav aria-label="Päänavigaatio" className="hidden items-center gap-7 lg:flex">
            <a href="#how" className="text-sm font-medium text-brand-charcoal/75 hover:text-brand-navy">Miten toimii</a>
            <a href="#delivery" className="text-sm font-medium text-brand-charcoal/75 hover:text-brand-navy">Mitä saat</a>
            <a href="#pricing" className="text-sm font-medium text-brand-charcoal/75 hover:text-brand-navy">Hinnasto</a>
            <a href="#faq" className="text-sm font-medium text-brand-charcoal/75 hover:text-brand-navy">FAQ</a>
          </nav>
          <Button href="#start" event="hero_cta" className="hidden sm:inline-flex">Pyydä aloitus</Button>
        </Container>
      </header>

      <section id="top" className="hero-grid relative border-b border-brand-navy/8 py-18 sm:py-24 lg:py-30">
        <div aria-hidden="true" className="absolute right-[-120px] top-[-80px] h-80 w-80 rounded-full bg-brand-red/8 blur-3xl" />
        <Container>
          <div className="grid items-center gap-14 lg:grid-cols-[1.1fr_.9fr]">
            <div>
              <Badge>Rakennus · LVI · Sähkö · Saneeraus</Badge>
              <h1 className="mt-6 max-w-4xl text-4xl font-black leading-[1.02] tracking-[-0.05em] text-brand-navy sm:text-6xl lg:text-7xl">
                Työmaakuvat WhatsAppiin.
                <span className="mt-2 block text-brand-red">Me hoidamme yrityksesi somen.</span>
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-brand-charcoal/80 sm:text-xl">
                Jatkuva näkyvyys paikalliselle palveluyritykselle ilman sisällöntuotantoa, IT-säätöä tai turhia palavereita.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button href="#start" event="hero_cta">Pyydä aloitus — 500 €/kk</Button>
                <Button href="#how" variant="secondary">Katso miten toimii</Button>
              </div>
              <p className="mt-4 text-sm text-brand-gray">Kuukausittain irtisanottava. Hyväksyt sisällöt ennen julkaisua.</p>
            </div>

            <div className="rounded-2xl bg-brand-navy p-6 text-white shadow-soft sm:p-8">
              <div className="flex items-center justify-between gap-4">
                <Badge inverse>VIDO-prosessi</Badge>
                <span className="text-xs font-semibold uppercase tracking-[0.14em] text-white/45">Asynkroninen</span>
              </div>
              <div className="mt-9 space-y-4">
                {steps.map(([number, title, body]) => (
                  <div key={number} className="grid grid-cols-[42px_1fr] gap-4 rounded-xl border border-white/10 bg-white/[0.04] p-4">
                    <div className="font-black text-brand-red">{number}</div>
                    <div>
                      <p className="font-semibold">{title}</p>
                      <p className="mt-1 text-sm leading-6 text-white/60">{body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="border-b border-brand-navy/8 bg-white py-8">
        <Container>
          <div className="grid gap-4 text-center text-sm font-semibold text-brand-charcoal/75 sm:grid-cols-3">
            <div>12 valmista julkaisua / kk</div>
            <div>Facebook + Instagram</div>
            <div>Materiaalit WhatsAppilla</div>
          </div>
        </Container>
      </section>

      <section className="py-20 sm:py-28">
        <Container>
          <SectionTitle eyebrow="Ongelma" title="Hyvä työ ei auta myyntiä, jos kukaan ei näe sitä." body="Materiaalia syntyy jo joka päivä. Ongelma alkaa sen jälkeen: jonkun pitäisi valita kuvat, kirjoittaa tekstit, tehdä visuaalit ja pitää näkyvyys käynnissä myös ensi kuussa." />
          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {problems.map((problem, index) => (
              <article key={problem} className="rounded-xl border border-brand-navy/10 bg-white p-6 shadow-[0_10px_35px_rgba(15,23,42,0.05)]">
                <p className="text-sm font-black text-brand-red">0{index + 1}</p>
                <p className="mt-10 text-xl font-bold tracking-[-0.02em] text-brand-navy">{problem}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="brand-noise bg-brand-navy py-20 sm:py-28">
        <Container>
          <SectionTitle inverse eyebrow="Ratkaisu" title="Te teette työn. Me teemme sen näkyväksi." body="VIDO on ulkoistettu näkyvyysprosessi yrityksille, joilla on oikeita töitä ja referenssejä, mutta ei aikaa pyörittää omaa sisältötuotantoa." />
          <div className="mt-12 grid gap-4 lg:grid-cols-3">
            {benefits.map(([title, body]) => (
              <article key={title} className="rounded-xl border border-white/10 bg-white/[0.04] p-7">
                <h3 className="text-xl font-bold text-white">{title}</h3>
                <p className="mt-4 leading-7 text-white/65">{body}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section id="how" className="py-20 sm:py-28">
        <Container>
          <SectionTitle eyebrow="Miten toimii" title="Kolme vaihetta. Ei markkinointiprojektia johdettavaksi." />
          <div className="mt-12 grid gap-px overflow-hidden rounded-xl border border-brand-navy/10 bg-brand-navy/10 lg:grid-cols-3">
            {steps.map(([number, title, body]) => (
              <article key={number} className="bg-white p-7 sm:p-8">
                <p className="text-sm font-black text-brand-red">{number}</p>
                <h3 className="mt-10 text-2xl font-bold tracking-[-0.025em] text-brand-navy">{title}</h3>
                <p className="mt-4 leading-7 text-brand-charcoal/75">{body}</p>
              </article>
            ))}
          </div>
          <div className="mt-8"><Button href="#start" event="pricing_cta">Pyydä aloitus</Button></div>
        </Container>
      </section>

      <section id="delivery" className="border-y border-brand-navy/8 bg-brand-light py-20 sm:py-28">
        <Container>
          <SectionTitle eyebrow="Mitä saat" title="Selkeä tuotantoprosessi materiaalista valmiiksi julkaisuksi." body="Aloitamme ilman asiakaslogoja, referenssiväitteitä tai before–after-caseja. Sivusto näyttää täsmällisesti palvelun toimitusmallin ja sen, mitä asiakas saa." />
          <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {deliverables.map(([title, body], index) => (
              <article key={title} className="rounded-xl border border-brand-navy/10 bg-white p-6 shadow-[0_10px_35px_rgba(15,23,42,0.05)]">
                <p className="text-sm font-black text-brand-red">0{index + 1}</p>
                <h3 className="mt-8 text-xl font-bold tracking-[-0.02em] text-brand-navy">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-brand-charcoal/75">{body}</p>
              </article>
            ))}
          </div>
          <div className="mt-8 rounded-xl bg-brand-navy p-6 text-white sm:p-8">
            <p className="text-xs font-black uppercase tracking-[0.14em] text-brand-red">MVP-periaate</p>
            <p className="mt-3 max-w-3xl text-lg font-semibold leading-8">Emme julkaise keksittyjä asiakastarinoita. Oikeat caset lisätään myöhemmin vain asiakkaan luvalla, eikä niiden puuttuminen estä VIDO Socialin käynnistämistä.</p>
          </div>
        </Container>
      </section>

      <section className="py-20 sm:py-28">
        <Container>
          <div className="grid items-center gap-10 rounded-2xl border border-brand-navy/10 bg-white p-7 shadow-soft lg:grid-cols-[220px_1fr] lg:p-10">
            <div className="flex aspect-square items-center justify-center rounded-xl bg-brand-navy text-6xl font-black tracking-[-0.08em] text-white">VO<span className="text-brand-red">.</span></div>
            <div>
              <p className="text-xs font-black uppercase tracking-[0.14em] text-brand-red">VIDO Socialin perustaja</p>
              <h2 className="mt-3 text-3xl font-black tracking-[-0.035em] text-brand-navy">Ville Olenius</h2>
              <p className="mt-1 font-semibold text-brand-gray">Co-Founder & Head of Sales</p>
              <p className="mt-5 max-w-3xl leading-7 text-brand-charcoal/75">
                Ville vastaa VIDO Socialin myynnistä, asiakkuuksista ja kaupallisesta kehityksestä. Hänen taustansa yhdistää yrittäjyyden, myynnin johtamisen, digitaalisen markkinoinnin sekä teknologia- ja prosessiosaamisen.
              </p>
              <div className="mt-5 flex flex-wrap gap-x-5 gap-y-3 text-sm font-bold">
                <a href={linkedinUrl} data-event="linkedin_click" target="_blank" rel="noreferrer" className="text-brand-navy underline decoration-brand-red decoration-2 underline-offset-4">Ville LinkedInissä</a>
                <a href={`mailto:${contactEmail}`} className="text-brand-navy underline decoration-brand-red decoration-2 underline-offset-4">{contactEmail}</a>
                <a href={telephoneHref} className="text-brand-navy underline decoration-brand-red decoration-2 underline-offset-4">{contactPhone}</a>
                <a href={whatsappHref} data-event="whatsapp_click" target="_blank" rel="noreferrer" className="text-brand-navy underline decoration-brand-red decoration-2 underline-offset-4">WhatsApp Business</a>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section id="pricing" className="bg-brand-navy py-20 sm:py-28">
        <Container>
          <SectionTitle inverse eyebrow="Hinnoittelu" title="Yksi paketti. Yksi kuukausihinta." body="Jatkuva näkyvyys ilman raskasta tarjousprosessia tai pitkäaikaista sitoutumista." />
          <div className="mt-12 max-w-2xl">
            <article className="rounded-xl border border-brand-red/50 bg-white/[0.05] p-7 text-white shadow-red sm:p-8">
              <Badge inverse>Jatkuva näkyvyys</Badge>
              <p className="mt-5 text-sm font-semibold text-white/60">VIDO Social</p>
              <p className="mt-3 text-5xl font-black tracking-[-0.05em]">500 € <span className="text-sm font-medium tracking-normal text-white/50">/ kk + ALV</span></p>
              <p className="mt-5 leading-7 text-white/70">Kun haluat tehdä näkyvyydestä jatkuvaa ilman uutta työtehtävää yrittäjälle.</p>
              <ul className="mt-7 space-y-3 text-sm text-white/75">
                <li>✓ 12 julkaisua / kk</li>
                <li>✓ Facebook + Instagram</li>
                <li>✓ Tekstit + grafiikat</li>
                <li>✓ WhatsApp-materiaalivirta</li>
                <li>✓ Julkaisukalenteri ja hyväksyntä ennen julkaisua</li>
                <li>✓ 1 korjauskierros / sisältö</li>
                <li>✓ Kuukausittain irtisanottava</li>
              </ul>
              <div className="mt-8"><Button href="#start" event="pricing_cta">Pyydä aloitus — 500 €/kk</Button></div>
            </article>
          </div>
        </Container>
      </section>

      <section id="faq" className="py-20 sm:py-28">
        <Container>
          <SectionTitle eyebrow="FAQ" title="Yleisimmät kysymykset ennen aloittamista." />
          <div className="mt-12 max-w-4xl divide-y divide-brand-navy/10 border-y border-brand-navy/10">
            {faqs.map(([question, answer]) => (
              <details key={question} className="group py-6">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-lg font-bold text-brand-navy">
                  <span>{question}</span>
                  <span aria-hidden="true" className="text-2xl text-brand-red transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="mt-4 max-w-3xl leading-7 text-brand-charcoal/75">{answer}</p>
              </details>
            ))}
          </div>
        </Container>
      </section>

      <section id="start" className="border-t border-brand-navy/8 bg-brand-light py-20 sm:py-28">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[.8fr_1.2fr] lg:items-start">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.14em] text-brand-red">Aloita tästä</p>
              <h2 className="mt-4 text-4xl font-black tracking-[-0.045em] text-brand-navy sm:text-5xl">Seuraava työmaa voi olla myös seuraava referenssinne.</h2>
              <p className="mt-5 text-lg leading-8 text-brand-charcoal/75">Täytä neljä tietoa. Emme ohjaa tässä vaiheessa verkkomaksuun — vahvistamme palvelun, laskutuksen ja aloitusajan henkilökohtaisesti.</p>
              <div className="mt-6 space-y-2 text-sm font-semibold text-brand-charcoal/80">
                <p>Sähköposti: <a href={`mailto:${contactEmail}`} className="text-brand-navy underline underline-offset-4">{contactEmail}</a></p>
                <p>Puhelin / WhatsApp: <a href={whatsappHref} data-event="whatsapp_click" target="_blank" rel="noreferrer" className="text-brand-navy underline underline-offset-4">{contactPhone}</a></p>
              </div>
            </div>
            <LeadForm whatsappNumber={whatsappNumber} />
          </div>
        </Container>
      </section>

      <footer className="border-t border-brand-navy/8 bg-white py-10 pb-24 sm:pb-10">
        <Container>
          <div className="flex flex-col gap-7 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <VidoLogo className="h-auto w-40" />
              <p className="mt-4 text-sm text-brand-gray">Työmaat näkyviksi. Referenssit myyntiin.</p>
              <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-xs text-brand-charcoal/70">
                <a href={`mailto:${contactEmail}`} className="hover:text-brand-navy">{contactEmail}</a>
                <a href={telephoneHref} className="hover:text-brand-navy">{contactPhone}</a>
                <a href={whatsappHref} data-event="whatsapp_click" target="_blank" rel="noreferrer" className="hover:text-brand-navy">WhatsApp Business</a>
                <a href={siteUrl} className="hover:text-brand-navy">vidosocial.com</a>
              </div>
              <p className="mt-3 text-xs text-brand-gray">{legalEntity} · Y-tunnus {businessId}</p>
            </div>
            <nav aria-label="Lakilinkit" className="flex flex-wrap gap-5 text-sm font-semibold text-brand-charcoal/70">
              <a href="/tietosuoja" className="hover:text-brand-navy">Tietosuoja</a>
              <a href="/evasteet" className="hover:text-brand-navy">Evästeet</a>
              <a href="#start" className="hover:text-brand-navy">Yhteys</a>
            </nav>
          </div>
        </Container>
      </footer>

      <div className="fixed inset-x-3 bottom-3 z-40 sm:hidden">
        <Button href="#start" event="sticky_cta" className="w-full shadow-[0_12px_35px_rgba(15,23,42,0.22)]">Pyydä aloitus — 500 €/kk</Button>
      </div>

      <AnalyticsConsent />
    </main>
  );
}
