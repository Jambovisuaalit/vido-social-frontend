import { Badge, Button, Container, SectionTitle } from "./ui";

const problems = [
  "Työmaakuvat jäävät puhelimeen.",
  "Some päivittyy satunnaisesti kiireen keskellä.",
  "Seuraava asiakas ei näe todellista työnjälkeä verkossa."
];

const benefits = [
  ["Työ näkyväksi", "Muutamme työmaat, valmiit kohteet ja asennukset jatkuvaksi sisältö- ja referenssipankiksi."],
  ["Ei uutta markkinointityötä", "Te lähetätte kuvat WhatsAppilla. Me hoidamme tekstit, grafiikat ja julkaisukokonaisuuden."],
  ["Referenssit ennen somehömppää", "Sisällön tehtävä on näyttää mitä yrityksenne tekee ja millaista työnjälkeä asiakas voi odottaa."]
];

const steps = [
  ["01", "Ota kuvat", "Kuvaa työmaa, valmis kohde, asennus tai muu työnne tavalliseen tapaan."],
  ["02", "Lähetä WhatsAppilla", "Lähetä käyttökelpoiset kuvat VIDOlIe. Et tarvitse valmiita kuvatekstejä tai sisältösuunnitelmaa."],
  ["03", "Me hoidamme loput", "VIDO tekee sisällöt, tekstit ja grafiikat valmiiksi. Tarkistat sisällöt ennen julkaisua."]
];

const faqs = [
  ["Meillä ei ole aikaa hoitaa somea. Miksi tämä olisi eri asia?", "Juuri siksi VIDO on rakennettu näin. Teidän ei tarvitse ryhtyä sisällöntuottajaksi: otatte kuvat työstä ja lähetätte materiaalin WhatsAppilla. VIDO hoitaa sisällön tekemisen."],
  ["Me saamme jo asiakkaita suositusten kautta. Tarvitsemmeko tätä?", "Hyvä maine ja suositukset ovat vahva lähtökohta. VIDO tekee saman luottamuksen näkyväksi myös ihmiselle, joka kuulee yrityksestänne ensimmäistä kertaa ja tarkistaa teidät verkosta ennen yhteydenottoa."],
  ["Voisimme julkaista kuvat itse. Miksi maksaisimme siitä?", "Voitte. Kysymys on siitä, tapahtuuko se johdonmukaisesti joka kuukausi muun työn ohessa. VIDO tekee satunnaisista työmaakuvista jatkuvan prosessin."],
  ["Takaako VIDO meille uusia asiakkaita?", "Ei. Emme lupaa tiettyä määrää kauppoja tai liidejä pelkän somesisällön perusteella. Tehtävämme on tehdä osaaminen, aktiivisuus ja työnjälki jatkuvasti näkyväksi ja rakentaa referenssipankkia, joka tukee ostopäätöstä."],
  ["Pitääkö meidän sitoutua pitkäksi aikaa?", "Ei. Voit aloittaa 290 € VIDO Startilla ilman jatkositoutumista. Jatkuva VIDO Social maksaa 500 €/kk + ALV ja on kuukausittain irtisanottava."]
];

export default function LandingPage() {
  return <main className="overflow-hidden">
    <header className="sticky top-0 z-50 border-b border-line-subtle bg-bg-950/90 backdrop-blur-xl">
      <Container className="flex h-16 items-center justify-between">
        <a href="#top" className="text-base font-bold tracking-[0.14em]">VIDO <span className="text-cyan-300">SOCIAL</span></a>
        <nav className="hidden items-center gap-7 md:flex">
          <a href="#solution" className="text-sm text-ink-secondary hover:text-ink-primary">Ratkaisu</a>
          <a href="#how" className="text-sm text-ink-secondary hover:text-ink-primary">Miten toimii</a>
          <a href="#proof" className="text-sm text-ink-secondary hover:text-ink-primary">Todisteet</a>
          <a href="#pricing" className="text-sm text-ink-secondary hover:text-ink-primary">Hinnoittelu</a>
        </nav>
        <Button href="#pricing">Aloita 290 €</Button>
      </Container>
    </header>

    <section id="top" className="relative border-b border-line-subtle py-20 sm:py-28 lg:py-32">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_.9fr]">
          <div>
            <Badge>Rakennus • LVI • Sähkö • Saneeraus</Badge>
            <h1 className="mt-6 max-w-4xl text-4xl font-bold leading-[1.02] tracking-[-0.045em] sm:text-6xl lg:text-7xl">Työmaakuvat WhatsAppiin. <span className="text-cyan-300">Me hoidamme yrityksesi somen.</span></h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-ink-secondary">Rakennus- ja palveluyritysten jatkuva somenäkyvyys ilman, että yrittäjän tarvitsee käyttää aikaansa sisällöntuotantoon.</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row"><Button href="#pricing">Aloita 290 €</Button><Button href="#how" variant="secondary">Katso miten toimii</Button></div>
            <p className="mt-4 text-sm text-ink-muted">Ei pitkää sopimusta. Hyväksyt sisällöt ennen julkaisua.</p>
          </div>
          <div className="relative mx-auto w-full max-w-xl">
            <div className="absolute -inset-12 bg-cyan-500/10 blur-3xl" />
            <div className="relative grid gap-3 rounded-xl border border-line bg-bg-850 p-4 shadow-panel sm:grid-cols-2">
              <div className="min-h-72 rounded-lg border border-line-subtle bg-bg-900 p-5">
                <div className="text-xs font-semibold uppercase tracking-wider text-ink-muted">Työmaalta</div>
                <div className="mt-12 grid grid-cols-3 gap-2">
                  {[1,2,3,4,5,6].map((item) => <div key={item} className="aspect-square rounded-md border border-line bg-surface-700" />)}
                </div>
                <p className="mt-6 text-sm text-ink-muted">Kuvat, jotka muuten jäävät kamerarullaan.</p>
              </div>
              <div className="min-h-72 rounded-lg border border-cyan-600/40 bg-bg-900 p-5 shadow-cyan">
                <div className="text-xs font-semibold uppercase tracking-wider text-cyan-300">VIDO-julkaisu</div>
                <div className="mt-8 rounded-lg border border-line bg-bg-850 p-4">
                  <div className="h-32 rounded-md bg-gradient-to-br from-surface-600 to-bg-800" />
                  <div className="mt-4 h-3 w-3/4 rounded bg-ink-primary/80" />
                  <div className="mt-2 h-2 w-full rounded bg-ink-muted/30" />
                  <div className="mt-2 h-2 w-5/6 rounded bg-ink-muted/30" />
                </div>
                <p className="mt-6 text-sm text-ink-secondary">Työ → sisältö → julkaisu → referenssi.</p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>

    <section className="border-b border-line-subtle py-10">
      <Container><div className="grid gap-4 text-center text-sm text-ink-muted sm:grid-cols-3"><div>12 valmista julkaisua / kk</div><div>Instagram + Facebook</div><div>Materiaalit helposti WhatsAppilla</div></div></Container>
    </section>

    <section className="py-20 sm:py-28">
      <Container>
        <SectionTitle eyebrow="Ongelma" title="Hyvä työ ei auta markkinoinnissa, jos se jää puhelimeen." body="Työmaa valmistuu, kuvat otetaan ja seuraava kohde alkaa. Samaan aikaan potentiaalinen asiakas arvioi yritystänne sen perusteella, mitä verkossa sattuu juuri silloin olemaan." />
        <div className="mt-10 grid gap-4 md:grid-cols-3">{problems.map((p,i)=><div key={p} className="rounded-lg border border-line-subtle bg-bg-850 p-6"><div className="text-sm font-semibold text-cyan-300">0{i+1}</div><p className="mt-10 text-xl font-semibold tracking-tight">{p}</p></div>)}</div>
      </Container>
    </section>

    <section className="border-y border-line-subtle bg-bg-900 py-20 sm:py-28">
      <Container>
        <SectionTitle eyebrow="Agitaatio" title="Kun some jää yrittäjän vastuulle, se jää helposti tekemättä." body="Materiaalia syntyy jo joka päivä. Ongelma alkaa sen jälkeen: jonkun pitäisi valita kuvat, kirjoittaa tekstit, tehdä grafiikat ja pitää näkyvyys käynnissä myös ensi kuussa." />
        <div className="mt-10 max-w-3xl border-l-2 border-cyan-500 pl-6 text-2xl font-semibold leading-9">Jokainen puhelimeen jäävä valmis kohde on käyttämätön referenssi.</div>
      </Container>
    </section>

    <section id="solution" className="py-20 sm:py-28">
      <Container>
        <SectionTitle eyebrow="Ratkaisu" title="Te teette työn. Me teemme sen näkyväksi." body="Teidän ei tarvitse opetella uusia ohjelmistoja, suunnitella sisältökalenteria tai keksiä joka viikko jotain julkaistavaa." />
        <div className="mt-10 grid gap-4 lg:grid-cols-3">{benefits.map(([title,body])=><div key={title} className="rounded-lg border border-line-subtle bg-bg-850 p-7 transition hover:border-line-strong"><h3 className="text-xl font-semibold">{title}</h3><p className="mt-4 leading-7 text-ink-secondary">{body}</p></div>)}</div>
      </Container>
    </section>

    <section id="how" className="border-y border-line-subtle bg-bg-900 py-20 sm:py-28">
      <Container>
        <SectionTitle eyebrow="Miten toimii" title="Kolme vaihetta. Ei markkinointiprojektia johdettavaksi." />
        <div className="mt-12 grid gap-px overflow-hidden rounded-xl border border-line-subtle bg-line-subtle lg:grid-cols-3">{steps.map(([num,title,body])=><div key={num} className="bg-bg-850 p-7 sm:p-8"><div className="font-mono text-sm text-cyan-300">{num}</div><h3 className="mt-10 text-2xl font-semibold">{title}</h3><p className="mt-4 leading-7 text-ink-secondary">{body}</p></div>)}</div>
        <div className="mt-8"><Button href="#pricing">Aloita VIDO Startti</Button></div>
      </Container>
    </section>

    <section id="proof" className="py-20 sm:py-28">
      <Container>
        <SectionTitle eyebrow="Todisteet" title="Tavallisesta työmaakuvasta valmiiksi referenssiksi." body="VIDOn lähtökohta ei ole geneerinen somesisältö. Lähtökohta on yrityksenne oikea työ." />
        <div className="mt-12 grid gap-4 lg:grid-cols-2">
          <div className="rounded-xl border border-line-subtle bg-bg-850 p-6"><div className="text-xs font-semibold uppercase tracking-wider text-ink-muted">Ennen</div><div className="mt-5 aspect-[4/3] rounded-lg border border-line bg-surface-700" /><p className="mt-5 text-ink-secondary">Tavallinen työmaakuva asiakkaan puhelimesta.</p></div>
          <div className="rounded-xl border border-cyan-600/40 bg-bg-850 p-6 shadow-cyan"><div className="text-xs font-semibold uppercase tracking-wider text-cyan-300">Jälkeen</div><div className="mt-5 aspect-[4/3] rounded-lg border border-line bg-gradient-to-br from-surface-600 to-bg-900 p-6"><div className="flex h-full flex-col justify-end"><Badge>Valmis kohde</Badge><div className="mt-4 text-2xl font-bold">Työnjälki näkyväksi.</div><p className="mt-2 max-w-sm text-sm text-ink-secondary">Selkeä julkaisu, oikea konteksti ja yrityksen oma työnjälki.</p></div></div><p className="mt-5 text-ink-secondary">Työ → sisältö → julkaisu → referenssi.</p></div>
        </div>
        <p className="mt-6 max-w-3xl text-sm leading-6 text-ink-muted">VIDO ei vielä väitä tiettyä ROI- tai liiditulosta ilman dokumentoitua asiakasdataa. Todisteena näytämme sen, minkä voimme oikeasti toimittaa: prosessin, sisällöt ja työnäytteet.</p>
      </Container>
    </section>

    <section id="pricing" className="border-y border-line-subtle bg-bg-900 py-20 sm:py-28">
      <Container>
        <SectionTitle eyebrow="Hinnoittelu" title="Aloita pienellä riskillä." body="Valitse kertaluonteinen Startti tai ulkoista jatkuva sisällöntuotanto kuukausipalveluna." />
        <div className="mt-12 grid gap-5 lg:grid-cols-2">
          <div className="rounded-xl border border-line-strong bg-bg-850 p-7 sm:p-8"><div className="text-sm font-semibold text-ink-secondary">VIDO Startti</div><div className="mt-4 text-5xl font-bold">290 € <span className="text-sm font-normal text-ink-muted">+ ALV</span></div><p className="mt-5 leading-7 text-ink-secondary">Sopii yritykselle, joka haluaa ensin nähdä käytännössä, mitä omasta materiaalista voidaan tehdä.</p><ul className="mt-7 space-y-3 text-sm text-ink-secondary"><li>✓ Ensimmäinen sisältöpaketti</li><li>✓ Asiakkaan omasta materiaalista</li><li>✓ Sisällöt hyväksyttäväksi</li><li>✓ Ei jatkositoutumista</li></ul><div className="mt-8"><Button href="#contact">Aloita 290 €</Button></div></div>
          <div className="relative rounded-xl border border-cyan-600/50 bg-bg-850 p-7 shadow-cyan sm:p-8"><div className="absolute right-6 top-6"><Badge>Jatkuva näkyvyys</Badge></div><div className="text-sm font-semibold text-ink-secondary">VIDO Social</div><div className="mt-4 text-5xl font-bold">500 € <span className="text-sm font-normal text-ink-muted">/ kk + ALV</span></div><p className="mt-5 leading-7 text-ink-secondary">Jatkuva Instagram- ja Facebook-sisältö ilman yrittäjän omaa sisällöntuotantoa.</p><ul className="mt-7 space-y-3 text-sm text-ink-secondary"><li>✓ 12 valmista julkaisua / kk</li><li>✓ Instagram + Facebook</li><li>✓ Tekstit ja grafiikat</li><li>✓ Julkaisukalenteri</li><li>✓ WhatsApp-materiaalivirta</li><li>✓ 1 korjauskierros</li><li>✓ Kuukausittain irtisanottava</li></ul><div className="mt-8"><Button href="#contact">Valitse VIDO Social</Button></div></div>
        </div>
      </Container>
    </section>

    <section className="py-20 sm:py-28">
      <Container>
        <SectionTitle eyebrow="FAQ" title="Kysymykset, jotka kannattaa ratkaista ennen ostamista." />
        <div className="mt-10 divide-y divide-line-subtle border-y border-line-subtle">{faqs.map(([q,a])=><details key={q} className="group py-6"><summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-lg font-semibold"><span>{q}</span><span className="text-cyan-300 transition group-open:rotate-45">+</span></summary><p className="mt-4 max-w-3xl leading-7 text-ink-secondary">{a}</p></details>)}</div>
      </Container>
    </section>

    <section id="contact" className="border-t border-line-subtle py-20 sm:py-28">
      <Container>
        <div className="grid gap-10 rounded-xl border border-cyan-600/40 bg-bg-850 p-7 shadow-cyan sm:p-10 lg:grid-cols-[1fr_.8fr] lg:p-12">
          <div><Badge>Seuraava askel</Badge><h2 className="mt-6 text-4xl font-bold tracking-[-0.04em] sm:text-5xl">Seuraava työmaa voi olla myös seuraava referenssinne.</h2><p className="mt-5 max-w-2xl text-lg leading-8 text-ink-secondary">Teidän ei tarvitse keksiä lisää markkinointia. Teette jo joka päivä sen materiaalin, jota yrityksenne tarvitsee.</p><p className="mt-6 font-semibold">Ota kuvat. Lähetä ne WhatsAppilla. <span className="text-cyan-300">Me hoidamme loput.</span></p></div>
          <form className="space-y-4 rounded-lg border border-line-subtle bg-bg-900 p-5 sm:p-6" action="mailto:hello@vidosocial.fi" method="post" encType="text/plain">
            <div><label className="mb-2 block text-sm font-medium text-ink-secondary" htmlFor="company">Yritys</label><input id="company" name="company" required className="w-full rounded-md border border-line bg-bg-950 px-4 py-3 text-ink-primary outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20" /></div>
            <div><label className="mb-2 block text-sm font-medium text-ink-secondary" htmlFor="name">Nimi</label><input id="name" name="name" required className="w-full rounded-md border border-line bg-bg-950 px-4 py-3 text-ink-primary outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20" /></div>
            <div><label className="mb-2 block text-sm font-medium text-ink-secondary" htmlFor="contact">Puhelin tai sähköposti</label><input id="contact" name="contact" required className="w-full rounded-md border border-line bg-bg-950 px-4 py-3 text-ink-primary outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20" /></div>
            <button type="submit" className="w-full rounded-md bg-cyan-glow px-5 py-3 text-sm font-semibold text-ink-inverse shadow-cyan transition hover:brightness-110 active:scale-[0.99]">Aloita 290 €</button>
            <p className="text-xs leading-5 text-ink-muted">Ei pitkää sopimusta. Ei jatkuvia palavereita. Hyväksyt sisällöt ennen julkaisua.</p>
          </form>
        </div>
      </Container>
    </section>

    <footer className="border-t border-line-subtle py-10"><Container className="flex flex-col gap-4 text-sm text-ink-muted sm:flex-row sm:items-center sm:justify-between"><div><span className="font-bold tracking-wider text-ink-primary">VIDO SOCIAL</span> — työmaat näkyviksi.</div><div>Rakennus • LVI • Sähkö • Saneeraus</div></Container></footer>
  </main>;
}
