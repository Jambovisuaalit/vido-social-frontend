import LandingPage from "@/components/LandingPage";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://vidosocial.com";

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      name: "VIDO",
      alternateName: "VIDO Social",
      legalName: "Ville Olenius Tmi",
      taxID: "3581471-7",
      url: siteUrl,
      logo: `${siteUrl}/brand/VIDO_Social_Primary_Horizontal.svg`,
      email: "ville@vidosocial.com",
      telephone: "+358407247621",
      founder: {
        "@type": "Person",
        name: "Ville Olenius"
      },
      address: {
        "@type": "PostalAddress",
        streetAddress: "Niittytie 4",
        postalCode: "03100",
        addressLocality: "NLA",
        addressRegion: "Vihti",
        addressCountry: "FI"
      },
      areaServed: "FI"
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: "VIDO Social",
      inLanguage: "fi-FI",
      publisher: { "@id": `${siteUrl}/#organization` }
    },
    {
      "@type": "Service",
      "@id": `${siteUrl}/#service`,
      name: "VIDO Social",
      serviceType: "Sosiaalisen median sisällöntuotanto ja digitaalinen näkyvyys",
      provider: { "@id": `${siteUrl}/#organization` },
      areaServed: { "@type": "Country", name: "Finland" },
      audience: {
        "@type": "BusinessAudience",
        audienceType: "Rakennus-, LVI-, sähkö-, saneeraus- ja paikalliset palveluyritykset"
      },
      offers: {
        "@type": "Offer",
        name: "VIDO Social",
        price: "500",
        priceCurrency: "EUR",
        description: "12 julkaisua kuukaudessa Facebookiin ja Instagramiin; kuukausittain irtisanottava."
      }
    }
  ]
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <LandingPage />
    </>
  );
}
