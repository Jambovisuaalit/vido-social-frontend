import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://vido-social-frontend.vercel.app";
  const now = new Date();

  return [
    { url: siteUrl, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${siteUrl}/tietosuoja`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
    { url: `${siteUrl}/evasteet`, lastModified: now, changeFrequency: "yearly", priority: 0.2 }
  ];
}
