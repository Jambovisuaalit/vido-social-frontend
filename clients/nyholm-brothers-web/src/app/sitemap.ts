import type { MetadataRoute } from "next";
import { caseStudies, servicePages, siteConfig } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticPages = [
    { path: "", priority: 1, changeFrequency: "weekly" as const },
    {
      path: "/referenssit",
      priority: 0.8,
      changeFrequency: "monthly" as const,
    },
    { path: "/yritys", priority: 0.6, changeFrequency: "yearly" as const },
    {
      path: "/yhteystiedot",
      priority: 0.8,
      changeFrequency: "yearly" as const,
    },
    {
      path: "/tietosuojaseloste",
      priority: 0.2,
      changeFrequency: "yearly" as const,
    },
  ];

  return [
    ...staticPages.map((page) => ({
      url: `${siteConfig.url}${page.path}`,
      lastModified: now,
      changeFrequency: page.changeFrequency,
      priority: page.priority,
    })),
    ...servicePages.map((page) => ({
      url: `${siteConfig.url}/${page.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    })),
    ...caseStudies.map((study) => ({
      url: `${siteConfig.url}/referenssit/${study.slug}`,
      lastModified: now,
      changeFrequency: "yearly" as const,
      priority: 0.7,
    })),
  ];
}
