import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "static.wixstatic.com",
      },
    ],
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    return [
      {
        source: "/rakennusurakointi-rakennusliike-espoo",
        destination: "/rakennusliike-espoo",
        permanent: true,
      },
      {
        source: "/rakennusliike/rakennusliike-espoo",
        destination: "/rakennusliike-espoo",
        permanent: true,
      },
      {
        source: "/huoneistoremontti/huoneistoremontti-helsinki",
        destination: "/huoneistoremontti-helsinki",
        permanent: true,
      },
      {
        source: "/kartoituskaynti",
        destination: "/yhteystiedot#tarjous",
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value:
              "camera=(), microphone=(), geolocation=(), payment=(), usb=()",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=31536000; includeSubDomains",
          },
          {
            key: "Content-Security-Policy",
            value:
              "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob: https://static.wixstatic.com; font-src 'self' data:; connect-src 'self' https://dbfvptbhxqgsanwnwgxy.supabase.co; frame-ancestors 'self'; base-uri 'self'; form-action 'self' mailto:; object-src 'none'; upgrade-insecure-requests",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
