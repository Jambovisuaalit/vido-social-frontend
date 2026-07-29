export const siteConfig = {
  name: "Nyholm Brothers Oy",
  shortName: "Nyholm Brothers",
  legalName: "Nyholm Brothers Oy",
  businessId: "3349819-1",
  url:
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
    "https://www.nyholmbrothers.fi",
  phoneDisplay: "040 415 7543",
  phoneHref: "tel:+358404157543",
  email: "patric.nyholm@nyholmbrothers.fi",
  address: {
    street: "Suvisaarentie 36",
    postalCode: "02380",
    city: "Espoo",
    country: "FI",
  },
  leadEndpoint:
    process.env.NEXT_PUBLIC_LEAD_ENDPOINT ??
    "https://dbfvptbhxqgsanwnwgxy.supabase.co/functions/v1/submit-nyholm-lead",
} as const;

export const imageUrls = {
  logoDark:
    "https://static.wixstatic.com/media/b7526d_300d63f4da7843c1b66375ef0079d216~mv2.png/v1/crop/x_24%2Cy_0%2Cw_802%2Ch_307/fill/w_460%2Ch_176%2Cal_c%2Cq_90%2Cusm_0.66_1.00_0.01%2Cenc_avif%2Cquality_auto/Firman%20logo%20oranssi.png",
  logoLight:
    "https://static.wixstatic.com/media/b7526d_3655b934081545b7995035fc6712c832~mv2.png/v1/fill/w_488%2Ch_176%2Cal_c%2Cq_90%2Cusm_0.66_1.00_0.01%2Cenc_avif%2Cquality_auto/Nyholm%20Brothers%20logo%20oranssi_valkonen.png",
  saunaExterior:
    "https://static.wixstatic.com/media/b7526d_771c7189213545c38eb9ded171dc7f02~mv2.jpeg/v1/fill/w_1372%2Ch_994%2Cal_c%2Cq_85%2Cusm_0.66_1.00_0.01%2Cenc_avif%2Cquality_auto/b7526d_771c7189213545c38eb9ded171dc7f02~mv2.jpeg",
  saunaDetail:
    "https://static.wixstatic.com/media/b7526d_d99104882f18424db0e62c4f13c3cb26~mv2.jpeg/v1/fill/w_1600%2Ch_1160%2Cal_c%2Cq_85%2Cusm_0.66_1.00_0.01%2Cenc_avif%2Cquality_auto/b7526d_d99104882f18424db0e62c4f13c3cb26~mv2.jpeg",
  saunaInterior:
    "https://static.wixstatic.com/media/b7526d_c7a2cfc5eb7d4dd1b6585895b42554d4~mv2.jpg/v1/fill/w_1200%2Ch_1600%2Cal_c%2Cq_85%2Cusm_0.66_1.00_0.01%2Cenc_avif%2Cquality_auto/b7526d_c7a2cfc5eb7d4dd1b6585895b42554d4~mv2.jpg",
  saunaTerrace:
    "https://static.wixstatic.com/media/b7526d_5e34bccadb6841ffa363b02704bb299c~mv2.jpg/v1/fill/w_1200%2Ch_1600%2Cal_c%2Cq_85%2Cusm_0.66_1.00_0.01%2Cenc_avif%2Cquality_auto/b7526d_5e34bccadb6841ffa363b02704bb299c~mv2.jpg",
  bathroom:
    "https://static.wixstatic.com/media/b7526d_6e3e1e650bcc44f9bb30ab9650ed6c9d~mv2.jpg/v1/fill/w_1400%2Ch_1400%2Cal_c%2Cq_85%2Cusm_0.66_1.00_0.01%2Cenc_avif%2Cquality_auto/b7526d_6e3e1e650bcc44f9bb30ab9650ed6c9d~mv2.jpg",
  bathroomDetail:
    "https://static.wixstatic.com/media/b7526d_41e8df59bc294883ab3146d6abe4a657~mv2.jpg/v1/fill/w_1400%2Ch_1400%2Cal_c%2Cq_85%2Cusm_0.66_1.00_0.01%2Cenc_avif%2Cquality_auto/b7526d_41e8df59bc294883ab3146d6abe4a657~mv2.jpg",
  kitchen:
    "https://static.wixstatic.com/media/b7526d_93bb7c3f710a4e59bf4bda112bf7eb6e~mv2.jpg/v1/fill/w_1200%2Ch_1600%2Cal_c%2Cq_85%2Cusm_0.66_1.00_0.01%2Cenc_avif%2Cquality_auto/b7526d_93bb7c3f710a4e59bf4bda112bf7eb6e~mv2.jpg",
  kitchenDetail:
    "https://static.wixstatic.com/media/b7526d_6806d990f35640899ab1582abfd66bdd~mv2.jpg/v1/fill/w_1200%2Ch_1600%2Cal_c%2Cq_85%2Cusm_0.66_1.00_0.01%2Cenc_avif%2Cquality_auto/b7526d_6806d990f35640899ab1582abfd66bdd~mv2.jpg",
  terrace:
    "https://static.wixstatic.com/media/b7526d_9ee9f0a9f0294607b878e12b97a3c0ef~mv2.jpg/v1/fill/w_1600%2Ch_1200%2Cal_c%2Cq_85%2Cusm_0.66_1.00_0.01%2Cenc_avif%2Cquality_auto/b7526d_9ee9f0a9f0294607b878e12b97a3c0ef~mv2.jpg",
  terraceDetail:
    "https://static.wixstatic.com/media/b7526d_a3488fb193524fb7a8260a34ba6da9e1~mv2.jpg/v1/fill/w_1600%2Ch_1200%2Cal_c%2Cq_85%2Cusm_0.66_1.00_0.01%2Cenc_avif%2Cquality_auto/b7526d_a3488fb193524fb7a8260a34ba6da9e1~mv2.jpg",
  roof:
    "https://static.wixstatic.com/media/b7526d_eb9a6a359845456194af5619150322d9~mv2.jpg/v1/fill/w_1200%2Ch_1600%2Cal_c%2Cq_85%2Cusm_0.66_1.00_0.01%2Cenc_avif%2Cquality_auto/b7526d_eb9a6a359845456194af5619150322d9~mv2.jpg",
} as const;

export const mainNavigation = [
  { label: "Palvelut", href: "/#palvelut" },
  { label: "Referenssit", href: "/referenssit" },
  { label: "Miksi me", href: "/#miksi-me" },
  { label: "Yritys", href: "/yritys" },
  { label: "Yhteystiedot", href: "/yhteystiedot" },
] as const;

export const serviceLinks = [
  { label: "Rakennusliike Espoo", href: "/rakennusliike-espoo" },
  { label: "Huoneistoremontti", href: "/huoneistoremontti-espoo" },
  { label: "Kylpyhuoneremontti", href: "/kylpyhuoneremontti-espoo" },
  { label: "Korjausrakentaminen", href: "/korjausrakentaminen-espoo" },
  { label: "Terassit", href: "/terassin-rakentaminen-espoo" },
  { label: "Piharakennukset", href: "/piharakennukset-espoo" },
  { label: "Saaristorakentaminen", href: "/saaristorakentaminen-espoo" },
  { label: "Maarakennus ja perustukset", href: "/maarakennus-ja-perustukset" },
] as const;

export type FAQ = {
  question: string;
  answer: string;
};

export type ServicePage = {
  slug: string;
  eyebrow: string;
  title: string;
  metaTitle: string;
  description: string;
  hero: string;
  intro: string;
  benefits: string[];
  included: string[];
  localNote: string;
  faqs: FAQ[];
  image: string;
};

const sharedFaqs: FAQ[] = [
  {
    question: "Mitä maksuton kartoituskäynti sisältää?",
    answer:
      "Käymme kohteessa läpi työn rajauksen, lähtötilanteen, toiveet ja mahdolliset riskikohdat. Saat tämän pohjalta selkeän etenemisehdotuksen ja tarjouksen.",
  },
  {
    question: "Voitteko hoitaa koko urakan avaimet käteen?",
    answer:
      "Kyllä. Sovimme vastuut ennen aloitusta ja koordinoimme työt sekä tarvittavat tekijät yhtenä kokonaisuutena. Sinulla on yksi yhteyshenkilö koko hankkeen ajan.",
  },
  {
    question: "Miten työn aikataulu ja muutokset viestitään?",
    answer:
      "Sovimme aikataulun ennen aloitusta ja pidämme yhteyttä työn aikana. Mahdolliset lisätyöt tai suunnitelmamuutokset käydään läpi ennen toteutusta.",
  },
];

export const servicePages: ServicePage[] = [
  {
    slug: "rakennusliike-espoo",
    eyebrow: "Rakennusliike Espoo",
    title: "Rakennusliike Espoossa, kun työn pitää edetä sovitusti",
    metaTitle: "Rakennusliike Espoo | Remontit ja rakentaminen",
    description:
      "Nyholm Brothers on espoolainen rakennusliike remontteihin, piharakentamiseen, korjausrakentamiseen ja vaativiin kohteisiin. Varaa maksuton kartoitus.",
    hero:
      "Yksi vastuullinen kumppani kodin remontteihin, piharakennuksiin ja vaativiin rakennuskohteisiin Espoossa.",
    intro:
      "Hyvä rakennusurakka alkaa rajauksesta, joka ymmärretään samalla tavalla molemmin puolin. Selvitämme ensin kohteen, tavoitteen ja riskit. Sen jälkeen saat konkreettisen ehdotuksen työn toteutuksesta – ilman turhaa kiertelyä.",
    benefits: [
      "Yksi yhteyshenkilö suunnittelusta luovutukseen",
      "Selkeä työn rajaus ja sovittu eteneminen",
      "Kokemus remonteista, piharakentamisesta ja saaristokohteista",
    ],
    included: [
      "Huoneisto- ja pintaremontit",
      "Kylpyhuoneet ja märkätilat",
      "Korjausrakentaminen",
      "Terassit ja piharakennukset",
      "Maarakennus ja perustukset",
      "Saaristo- ja rantakohteet",
    ],
    localNote:
      "Kotipaikkamme on Espoo. Palvelemme Suvisaariston, Etelä-Espoon, Tapiolan, Leppävaaran ja muun Espoon kohteita sekä koko pääkaupunkiseutua.",
    faqs: sharedFaqs,
    image: imageUrls.saunaExterior,
  },
  {
    slug: "rakennusliike-helsinki",
    eyebrow: "Rakennusliike Helsinki",
    title: "Rakennusliike Helsinkiin – selkeä urakka alusta loppuun",
    metaTitle: "Rakennusliike Helsinki | Remontit ja rakennustyöt",
    description:
      "Rakennusliike Helsingin remontteihin ja korjausrakentamiseen. Selkeä työnjohto, avoin viestintä ja maksuton kartoituskäynti.",
    hero:
      "Toteutamme huoneisto-, keittiö- ja korjausrakentamisen työt Helsingissä selkeällä vastuunjaolla.",
    intro:
      "Helsingin kohteissa vanhat rakenteet, taloyhtiön käytännöt ja tiukka ympäristö vaativat ennakointia. Käymme lähtötilanteen läpi ennen tarjousta ja sovimme, mitä työhön kuuluu, kuka vastaa mistä ja miten etenemisestä viestitään.",
    benefits: [
      "Kohteen lähtötilanne huomioidaan ennen tarjousta",
      "Taloyhtiökohteisiin sopiva suunnitelmallinen toteutus",
      "Työmaan etenemisestä viestitään aktiivisesti",
    ],
    included: [
      "Huoneistoremontit",
      "Keittiöremontit",
      "Kylpyhuone- ja märkätilatyöt",
      "Pintaremontit",
      "Korjaus- ja muutostyöt",
      "Työvaiheiden koordinointi",
    ],
    localNote:
      "Palvelemme Helsingin keskustan, kantakaupungin ja muiden kaupunginosien remonttikohteita Espoosta käsin.",
    faqs: sharedFaqs,
    image: imageUrls.kitchen,
  },
  {
    slug: "rakennusliike-vantaa",
    eyebrow: "Rakennusliike Vantaa",
    title: "Rakennusliike Vantaalle – tekijä, joka kantaa vastuun",
    metaTitle: "Rakennusliike Vantaa | Remontit ja rakentaminen",
    description:
      "Nyholm Brothers toteuttaa remontit ja rakennustyöt Vantaalla. Yksi yhteyshenkilö, selkeä eteneminen ja maksuton kartoituskäynti.",
    hero:
      "Remontit ja rakentaminen Vantaalla yhdeltä vastuulliselta toteuttajalta.",
    intro:
      "Kun työ sisältää useita vaiheita, kokonaisuuden johtaminen ratkaisee. Me sovimme rajauksen, aikataulun ja vastuut ennen aloitusta ja pidämme sinut ajan tasalla työn edetessä.",
    benefits: [
      "Kokonaisuus suunnitellaan ennen työmaan aloitusta",
      "Sovittu yhteyshenkilö koko projektin ajan",
      "Muutoksista sovitaan ennen toteutusta",
    ],
    included: [
      "Huoneisto- ja pintaremontit",
      "Keittiö- ja kylpyhuoneremontit",
      "Korjausrakentaminen",
      "Terassit ja piharakennukset",
      "Pohja- ja perustustyöt",
      "Pienet uudisrakennukset",
    ],
    localNote:
      "Toteutamme Vantaan kohteita osana pääkaupunkiseudun palvelualuettamme. Kartoituskäynnillä varmistamme kohteen ja aikataulun sopivuuden.",
    faqs: sharedFaqs,
    image: imageUrls.terrace,
  },
  {
    slug: "huoneistoremontti-espoo",
    eyebrow: "Huoneistoremontti Espoo",
    title: "Huoneistoremontti Espoossa ilman epäselviä vastuita",
    metaTitle: "Huoneistoremontti Espoo | Maksuton kartoitus",
    description:
      "Huoneistoremontti Espoossa yhdeltä toteuttajalta. Pintojen, keittiön ja märkätilojen remontit selkeästi johdettuna.",
    hero:
      "Suunnittelemme työn rajauksen, koordinoimme työvaiheet ja pidämme sinut ajan tasalla.",
    intro:
      "Huoneistoremontissa yksittäiset työvaiheet vaikuttavat toisiinsa. Siksi käymme toiveet, rakenteet ja käytännön järjestelyt läpi kokonaisuutena ennen töiden aloitusta.",
    benefits: [
      "Yksi suunnitelma eri työvaiheille",
      "Asumisen ja taloyhtiön käytännöt huomioiva toteutus",
      "Selkeä viestintä kustannuksiin vaikuttavista valinnoista",
    ],
    included: [
      "Seinä- ja kattopinnat",
      "Lattiat ja listoitukset",
      "Keittiön uudistus",
      "Kylpyhuone ja märkätilat",
      "Väliseinä- ja muutostyöt",
      "Purkutyöt ja loppusiivous sovitusti",
    ],
    localNote:
      "Espoolaisena yrityksenä tunnemme alueen kohteet pienistä kerrostaloasunnoista omakotitaloihin.",
    faqs: sharedFaqs,
    image: imageUrls.kitchenDetail,
  },
  {
    slug: "huoneistoremontti-helsinki",
    eyebrow: "Huoneistoremontti Helsinki",
    title: "Huoneistoremontti Helsingissä hallitulla kokonaisuudella",
    metaTitle: "Huoneistoremontti Helsinki | Nyholm Brothers",
    description:
      "Huoneistoremontit Helsingissä: keittiöt, pinnat, märkätilat ja muutostyöt. Yksi yhteyshenkilö ja maksuton kartoitus.",
    hero:
      "Vanhan asunnon remontissa ennakointi, järjestys ja aktiivinen viestintä säästävät yllätyksiltä.",
    intro:
      "Helsingin huoneistoissa vastaan tulee eri aikakausien rakenteita ja ratkaisuja. Kartoitamme lähtötilanteen, sovimme ilmoituksista ja rajauksesta sekä rakennamme realistisen etenemisen ennen ensimmäistä työpäivää.",
    benefits: [
      "Vanhan rakennuskannan erityispiirteet huomioiva kartoitus",
      "Työvaiheet järkevässä järjestyksessä",
      "Valinnoista ja vaikutuksista keskustellaan ajoissa",
    ],
    included: [
      "Kokonaiset huoneistoremontit",
      "Keittiöremontit",
      "Pintojen uusiminen",
      "Kylpyhuoneremontit",
      "Purkutyöt",
      "Projektin koordinointi",
    ],
    localNote:
      "Palvelemme Helsingissä esimerkiksi kantakaupungin ja lähialueiden asunto-osakeyhtiökohteita.",
    faqs: sharedFaqs,
    image: imageUrls.bathroom,
  },
  {
    slug: "huoneistoremontti-vantaa",
    eyebrow: "Huoneistoremontti Vantaa",
    title: "Huoneistoremontti Vantaalla yhdeltä vastuulliselta tekijältä",
    metaTitle: "Huoneistoremontti Vantaa | Pyydä kartoitus",
    description:
      "Huoneistoremontti Vantaalla avaimet käteen -mallilla. Selkeä tarjous, sovitut vaiheet ja aktiivinen yhteydenpito.",
    hero:
      "Kodin remontti, jossa tiedät mitä tapahtuu seuraavaksi ja keneen olet yhteydessä.",
    intro:
      "Toteutamme huoneiston remontin sovitussa laajuudessa ja johdamme työvaiheet kokonaisuutena. Ennen tarjousta selvitämme toiveet, lähtötilanteen ja käytännön järjestelyt.",
    benefits: [
      "Kokonaisuus yhdellä yhteydenotolla",
      "Sovittu rajaus ja työjärjestys",
      "Kustannuksiin vaikuttavat muutokset käsitellään avoimesti",
    ],
    included: [
      "Pinta- ja lattiatyöt",
      "Keittiöt",
      "Kylpyhuoneet",
      "Väliseinämuutokset",
      "Purkutyöt",
      "Viimeistely",
    ],
    localNote:
      "Vantaan kohteet palvelemme osana pääkaupunkiseutua. Kohteen soveltuvuus varmistetaan maksuttomalla kartoituskäynnillä.",
    faqs: sharedFaqs,
    image: imageUrls.kitchen,
  },
  {
    slug: "kylpyhuoneremontti-espoo",
    eyebrow: "Kylpyhuoneremontti Espoo",
    title: "Kylpyhuoneremontti Espoossa suunnitelmallisesti",
    metaTitle: "Kylpyhuoneremontti Espoo | Maksuton kartoitus",
    description:
      "Kylpyhuoneremontti Espoossa: purku, rakenteet, pinnat ja kalusteet hallittuna kokonaisuutena. Varaa maksuton kartoitus.",
    hero:
      "Märkätiläremontissa jokaisen piiloon jäävänkin työvaiheen pitää olla hallittu.",
    intro:
      "Kylpyhuoneremontti suunnitellaan lähtötilanteen mukaan. Selvitämme rakenteet ja toiveet, rajaamme työn sekä sovimme toteutuksesta ennen purun aloitusta.",
    benefits: [
      "Työvaiheiden selkeä dokumentointi ja koordinointi",
      "Materiaalivalinnat käydään läpi ennen aloitusta",
      "Yksi yhteyshenkilö koko remontin ajan",
    ],
    included: [
      "Purkutyöt",
      "Pohja- ja rakennetyöt",
      "Vedeneristys ja laatoitus",
      "Kalusteiden asennukset",
      "Sauna- ja pesutilat",
      "Viimeistely ja luovutus",
    ],
    localNote:
      "Toteutamme kylpyhuoneremontteja Espoon asuntoihin ja omakotitaloihin. Tarjouksen sisältö täsmennetään aina kohdekohtaisesti.",
    faqs: [
      {
        question: "Kuinka kauan kylpyhuoneremontti kestää?",
        answer:
          "Kesto riippuu lähtötilanteesta, rakenteista ja työn laajuudesta. Saat kohdekohtaisen aikataulun kartoituksen ja rajauksen jälkeen.",
      },
      ...sharedFaqs,
    ],
    image: imageUrls.bathroomDetail,
  },
  {
    slug: "korjausrakentaminen-espoo",
    eyebrow: "Korjausrakentaminen Espoo",
    title: "Korjausrakentaminen Espoossa – vanhaa kunnioittaen",
    metaTitle: "Korjausrakentaminen Espoo | Nyholm Brothers",
    description:
      "Korjausrakentaminen Espoossa vanhoihin taloihin, saunoihin ja piharakennuksiin. Lähtötilanteen kartoitus ja selkeä eteneminen.",
    hero:
      "Korjaamme käyttökelpoista, uusimme tarpeellisen ja sovitamme uuden vanhaan.",
    intro:
      "Korjausrakentamisessa lopputulos riippuu siitä, miten hyvin olemassa oleva rakenne ymmärretään. Tutustumme kohteeseen ennen ratkaisujen lukitsemista ja varaudumme löydöksiin avoimesti.",
    benefits: [
      "Lähtötilanne tutkitaan ennen toteutusta",
      "Ratkaisut sovitetaan olemassa olevaan rakennukseen",
      "Havaituista lisätarpeista viestitään ennen työtä",
    ],
    included: [
      "Vanhat omakotitalot",
      "Saunat ja piharakennukset",
      "Vesikattojen korjaukset",
      "Lattia- ja runkorakenteet",
      "Sisäpuoliset muutostyöt",
      "Terassien uusiminen",
    ],
    localNote:
      "Espoossa kohteet vaihtelevat vanhoista huviloista uudempaan pientalokantaan. Toteutus määritetään aina rakennuksen ehdoilla.",
    faqs: sharedFaqs,
    image: imageUrls.roof,
  },
  {
    slug: "terassin-rakentaminen-espoo",
    eyebrow: "Terassin rakentaminen Espoo",
    title: "Terassi Espooseen, joka istuu taloon ja pihaan",
    metaTitle: "Terassin rakentaminen Espoo | Pyydä kartoitus",
    description:
      "Terassin rakentaminen Espoossa: purku, perustukset, runko ja viimeistely yhtenä kokonaisuutena. Varaa maksuton kartoitus.",
    hero:
      "Suunnittelemme terassin käytön, maaston ja rakennuksen mukaan – perustuksista viimeistelyyn.",
    intro:
      "Toimiva terassi ei ole vain pinta. Käymme läpi koon, kulkureitit, korkeudet, perustamistavan ja yksityiskohdat, jotta kokonaisuus toimii käytössä ja näyttää kuuluvan paikalleen.",
    benefits: [
      "Perustamistapa valitaan maaston mukaan",
      "Käyttö ja kulkureitit huomioidaan suunnittelussa",
      "Purku ja uusi toteutus samalta tekijältä",
    ],
    included: [
      "Vanhan terassin purku",
      "Pohja- ja perustustyöt",
      "Runko",
      "Laudoitus",
      "Portaat ja kaiteet",
      "Viimeistely",
    ],
    localNote:
      "Toteutamme terasseja Espoon pihoihin, ranta- ja saaristokohteisiin sekä pääkaupunkiseudulle.",
    faqs: sharedFaqs,
    image: imageUrls.terrace,
  },
  {
    slug: "piharakennukset-espoo",
    eyebrow: "Piharakennukset Espoo",
    title: "Piharakennus Espooseen kokonaisuutena",
    metaTitle: "Piharakennukset Espoo | Saunat ja varastot",
    description:
      "Piharakennukset Espoossa: saunat, varastot ja muut pienrakennukset perustuksista viimeistelyyn.",
    hero:
      "Sauna, varasto tai muu piharakennus toteutettuna tontin ja käyttötarpeen ehdoilla.",
    intro:
      "Piharakennuksen onnistuminen alkaa sijoituksesta, käyttötarkoituksesta ja perustuksista. Kartoitamme kohteen, sovimme kokonaisuuden rajauksen ja etenemme vaiheittain valmiiseen rakennukseen.",
    benefits: [
      "Pohjatyöt ja rakennus yhtenä kokonaisuutena",
      "Käyttötarpeeseen sopiva ratkaisu",
      "Selkeä vastuunjako projektin alusta loppuun",
    ],
    included: [
      "Pihasaunat",
      "Varastot",
      "Katokset",
      "Pienet vapaa-ajan rakennukset",
      "Perustukset",
      "Ulkopuoliset viimeistelytyöt",
    ],
    localNote:
      "Espoon vaihtelevat tontit ja rannikon olosuhteet huomioidaan jo kartoituksessa.",
    faqs: sharedFaqs,
    image: imageUrls.saunaExterior,
  },
  {
    slug: "saaristorakentaminen-espoo",
    eyebrow: "Saaristorakentaminen Espoo",
    title: "Saaristorakentaminen Espoossa käytännön ehdoilla",
    metaTitle: "Saaristorakentaminen Espoo | Nyholm Brothers",
    description:
      "Saaristo- ja rantakohteiden rakentaminen Espoossa. Saunat, terassit, korjaukset ja vesikatot logistisesti hallittuna.",
    hero:
      "Vaativa sijainti ei saa tarkoittaa epäselvää projektia. Suunnittelemme työn, materiaalit ja etenemisen olosuhteiden mukaan.",
    intro:
      "Saaristossa työn laatu syntyy myös logistiikan ja työjärjestyksen suunnittelusta. Arvioimme kuljetukset, olosuhteet ja työvaiheet ennen toteutusta.",
    benefits: [
      "Sijainnin ja kuljetusten huomioiva suunnittelu",
      "Kokemusta sauna-, terassi- ja kattokohteista",
      "Työvaiheet sovitetaan olosuhteisiin",
    ],
    included: [
      "Rantasaunat",
      "Terassit",
      "Vesikatot",
      "Korjausrakentaminen",
      "Piharakennukset",
      "Perustus- ja pohjatyöt",
    ],
    localNote:
      "Palvelemme Espoon saaristo- ja rantakohteita sekä sovitusti muita pääkaupunkiseudun vaikeasti saavutettavia kohteita.",
    faqs: [
      {
        question: "Miten materiaalikuljetukset järjestetään?",
        answer:
          "Kuljetustapa ja työjärjestys suunnitellaan kohteen sijainnin, laiturin, tieyhteyden ja tarvittavan kaluston perusteella. Ratkaisu täsmennetään kartoituksen jälkeen.",
      },
      ...sharedFaqs,
    ],
    image: imageUrls.saunaTerrace,
  },
  {
    slug: "maarakennus-ja-perustukset",
    eyebrow: "Maarakennus ja perustukset",
    title: "Pohjatyöt ja perustukset osana toimivaa kokonaisuutta",
    metaTitle: "Maarakennus ja perustukset | Pääkaupunkiseutu",
    description:
      "Maarakennus- ja perustustyöt piharakennuksiin, terasseihin ja pieniin rakennuskohteisiin pääkaupunkiseudulla.",
    hero:
      "Rakennuksen pitkä käyttöikä alkaa oikein valitusta perustamistavasta ja huolellisista pohjatöistä.",
    intro:
      "Arvioimme maaston, kuormituksen ja rakennettavan kokonaisuuden ennen perustamistavan valintaa. Näin pohjatyöt tukevat muuta rakentamista eikä vastuu jää työvaiheiden väliin.",
    benefits: [
      "Pohjatyöt suunnitellaan rakennuksen mukaan",
      "Perustukset ja jatkorakentaminen voidaan toteuttaa yhtenä urakkana",
      "Kohdekohtainen ratkaisu maaston ehdoilla",
    ],
    included: [
      "Kaivu- ja pohjatyöt",
      "Massanvaihdot",
      "Pienrakennusten perustukset",
      "Terassien perustukset",
      "Ruuvipaaluratkaisut kohteen mukaan",
      "Pihan rakennustyöt",
    ],
    localNote:
      "Palvelemme Espoon, Helsingin ja Vantaan kohteita. Toteutus ja tarvittava kalusto varmistetaan kartoituksessa.",
    faqs: sharedFaqs,
    image: imageUrls.terraceDetail,
  },
];

export type CaseStudy = {
  slug: string;
  title: string;
  metaTitle: string;
  description: string;
  category: string;
  location: string;
  summary: string;
  scope: string[];
  outcome: string;
  quote: string;
  quoteName: string;
  images: { src: string; alt: string }[];
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "rantasaunan-kunnostus",
    title: "Lähes satavuotiaan rantasaunan kunnostus",
    metaTitle: "Rantasaunan kunnostus | Referenssi",
    description:
      "Vanhan hirsirantasaunan vesikaton, lattian ja terassin kunnostus. Tutustu Nyholm Brothersin toteuttamaan projektiin.",
    category: "Korjausrakentaminen",
    location: "Rantakohde",
    summary:
      "Lähes satavuotias hirsirantasauna sai uuden vesikaton, saunahuoneen lattian ja suuren terassin. Vanha rakennus vaati joustavaa ongelmanratkaisua työn aikana.",
    scope: [
      "Vesikaton uusiminen",
      "Saunahuoneen lattian uusiminen",
      "Suuren terassin rakentaminen ruuvipaaluille",
      "Lisätyönä penkkien ja piipun viimeistelyä",
    ],
    outcome:
      "Kohteen toimivuus parani, mutta vanhan hirsisaunan luonne säilyi. Työ eteni asiakkaan kanssa aktiivisesti viestien myös silloin, kun suunnitelmia täsmennettiin.",
    quote:
      "Erityiskiitos hyvästä viestinnästä ja joustavuudesta matkan varrella.",
    quoteName: "Juhani, asiakas",
    images: [
      {
        src: imageUrls.saunaExterior,
        alt: "Kunnostettu hirsinen rantasauna ulkoa",
      },
      {
        src: imageUrls.saunaDetail,
        alt: "Rantasaunan kunnostettu ulkopinta ja katto",
      },
      {
        src: imageUrls.saunaTerrace,
        alt: "Rantasaunan terassin rakennustyö",
      },
    ],
  },
  {
    slug: "terassin-rakentaminen-espoo",
    title: "Vanhan terassin purku ja uuden rakentaminen",
    metaTitle: "Terassin rakentaminen Espoo | Referenssi",
    description:
      "Vanhan terassin purku ja uuden terassin toteutus Espoossa. Katso Nyholm Brothersin referenssi.",
    category: "Terassit",
    location: "Espoo",
    summary:
      "Vanhentunut terassi purettiin ja tilalle rakennettiin uusi kokonaisuus. Työn rajaus ja eteneminen sovittiin asiakkaan kanssa ennen aloitusta.",
    scope: [
      "Vanhan terassin purku",
      "Uuden terassin runko",
      "Terassilaudoitus ja viimeistely",
      "Työmaan siistiminen",
    ],
    outcome:
      "Uusi terassi valmistui sovitusti ja palvelee pihan oleskelutilana. Asiakas nosti palautteessaan esiin sekä työn laadun että sovituissa asioissa pysymisen.",
    quote: "Kaikki sujui sovitusti ja työn laatu oli erinomaista.",
    quoteName: "Jukka-Pekka, asiakas",
    images: [
      {
        src: imageUrls.terrace,
        alt: "Uusi puuterassi Espoossa",
      },
      {
        src: imageUrls.terraceDetail,
        alt: "Terassin laudoitus ja rakennuksen liitos",
      },
    ],
  },
  {
    slug: "keittioremontti-espoo",
    title: "Keittiöremontti sujuvalla projektinjohdolla",
    metaTitle: "Keittiöremontti Espoo | Referenssi",
    description:
      "Keittiöremontti, jossa asiakas arvosti ammattitaitoa, joustavuutta ja aktiivista viestintää.",
    category: "Huoneistoremontit",
    location: "Espoo",
    summary:
      "Keittiön uudistus toteutettiin asiakkaan toiveiden mukaan. Projektissa korostuivat joustavuus, ratkaisukeskeisyys ja aktiivinen yhteydenpito.",
    scope: [
      "Vanhan keittiön purkutyöt",
      "Pintojen valmistelu",
      "Uuden kokonaisuuden asennustyöt",
      "Työvaiheiden koordinointi",
    ],
    outcome:
      "Asiakas koki remontin etenemisen stressittömäksi, koska työn etenemisestä viestittiin ja muutoksiin reagoitiin joustavasti.",
    quote:
      "Koko remontti alusta loppuun sujui hyvin. Ammattitaitoisia, ystävällisiä ja joustavia tekijöitä.",
    quoteName: "Ann, asiakas",
    images: [
      {
        src: imageUrls.kitchen,
        alt: "Keittiöremontin työvaihe Espoossa",
      },
      {
        src: imageUrls.kitchenDetail,
        alt: "Keittiöremontin asennusvaihe",
      },
    ],
  },
];

export const testimonials = [
  {
    quote:
      "Kommunikaatio eri vaihtoehdoista ja kustannuksista oli erinomaista. Myös ongelmanratkaisu toimi hienosti.",
    name: "Paavo",
    project: "Huoneistoremontti, Kallio",
  },
  {
    quote:
      "Koko remontti alusta loppuun sujui hyvin. Ammattitaitoisia, ystävällisiä ja joustavia tekijöitä.",
    name: "Ann",
    project: "Keittiöremontti",
  },
  {
    quote:
      "Kaikki sujui sovitusti ja työn laatu oli erinomaista.",
    name: "Jukka-Pekka",
    project: "Terassin uusiminen",
  },
] as const;

export const getServicePage = (slug: string) =>
  servicePages.find((page) => page.slug === slug);

export const getCaseStudy = (slug: string) =>
  caseStudies.find((study) => study.slug === slug);
