import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter"
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://vidosocial.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "VIDO Social | Työmaat näkyviksi",
    template: "%s | VIDO Social"
  },
  description:
    "VIDO Social muuttaa rakennus-, LVI-, sähkö- ja saneerausyritysten työmaakuvat jatkuvaksi näkyvyydeksi ja digitaalisiksi referensseiksi.",
  alternates: {
    canonical: "/"
  },
  openGraph: {
    type: "website",
    locale: "fi_FI",
    url: "/",
    siteName: "VIDO Social",
    title: "VIDO Social | Työmaat näkyviksi",
    description: "Työmaakuvat WhatsAppiin. VIDO hoitaa yrityksesi jatkuvan somenäkyvyyden.",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "VIDO Social — Työmaat näkyviksi"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "VIDO Social | Työmaat näkyviksi",
    description: "Työmaakuvat WhatsAppiin. VIDO hoitaa yrityksesi jatkuvan somenäkyvyyden.",
    images: ["/opengraph-image"]
  },
  verification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
    ? { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION }
    : undefined,
  robots: {
    index: true,
    follow: true
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fi" className={inter.variable}>
      <body className="bg-white font-sans text-brand-navy antialiased">{children}</body>
    </html>
  );
}
