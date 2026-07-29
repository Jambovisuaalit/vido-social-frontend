import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { JsonLd } from "@/components/json-ld";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { TrackedLink } from "@/components/tracked-link";
import { PhoneIcon } from "@/components/ui";
import { siteConfig } from "@/lib/site";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "Rakennusliike Espoo | Nyholm Brothers",
    template: "%s | Nyholm Brothers",
  },
  description:
    "Espoolainen rakennusliike remontteihin, korjausrakentamiseen, piharakennuksiin ja vaativiin saaristokohteisiin. Varaa maksuton kartoitus.",
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  category: "Rakentaminen",
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
  },
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "fi_FI",
    url: "/",
    siteName: siteConfig.name,
    title: "Rakentamista sovitusti | Nyholm Brothers",
    description:
      "Remontit, piharakennukset ja vaativat rakennuskohteet Espoossa ja pääkaupunkiseudulla.",
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Rakentamista sovitusti | Nyholm Brothers",
    description:
      "Remontit ja rakentaminen Espoossa sekä pääkaupunkiseudulla.",
    images: ["/opengraph-image"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0d0d0d",
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "GeneralContractor"],
  "@id": `${siteConfig.url}/#organization`,
  name: siteConfig.name,
  legalName: siteConfig.legalName,
  url: siteConfig.url,
  telephone: "+358404157543",
  email: siteConfig.email,
  image: `${siteConfig.url}/opengraph-image`,
  address: {
    "@type": "PostalAddress",
    streetAddress: siteConfig.address.street,
    postalCode: siteConfig.address.postalCode,
    addressLocality: siteConfig.address.city,
    addressCountry: siteConfig.address.country,
  },
  areaServed: [
    { "@type": "City", name: "Espoo" },
    { "@type": "City", name: "Helsinki" },
    { "@type": "City", name: "Vantaa" },
  ],
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+358404157543",
    contactType: "sales",
    availableLanguage: ["Finnish", "Swedish", "English"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      className={`${geistSans.variable} ${geistMono.variable}`}
      lang="fi"
    >
      <body>
        <JsonLd data={localBusinessSchema} />
        <SiteHeader />
        <main id="sisalto">{children}</main>
        <SiteFooter />
        <div className="mobile-action-bar">
          <TrackedLink
            eventName="phone_click"
            eventLabel="mobile_sticky"
            href={siteConfig.phoneHref}
          >
            <PhoneIcon />
            Soita
          </TrackedLink>
          <TrackedLink
            eventName="cta_click"
            eventLabel="mobile_sticky"
            href="/yhteystiedot#tarjous"
          >
            Pyydä kartoitus
          </TrackedLink>
        </div>
      </body>
    </html>
  );
}
