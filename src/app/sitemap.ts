import type { MetadataRoute } from "next";
import { getPrisma } from "@/lib/prisma";
import { MARYLAND_COUNTIES, slugifyCounty } from "@/lib/md-counties";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com";
  const now = new Date();

  const prisma = getPrisma();
  const listings = await prisma.listing.findMany({
    where: { displayAllowed: true },
    select: { urlPath: true, updatedAt: true },
    take: 50000, // safety cap; can paginate for very large MLS
    orderBy: { updatedAt: "desc" },
  });

  const countyUrls = MARYLAND_COUNTIES.map((name) => {
    const shortName = name.replace(/ County$/i, "");
    const slug = slugifyCounty(shortName);
    return {
      url: `${siteUrl}/maryland/${slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.6,
    };
  });

  return [
    { url: `${siteUrl}/`, lastModified: now, changeFrequency: "daily", priority: 1 },
    { url: `${siteUrl}/buy`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${siteUrl}/sell`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${siteUrl}/rent`, lastModified: now, changeFrequency: "weekly", priority: 0.6 },
    { url: `${siteUrl}/invest`, lastModified: now, changeFrequency: "weekly", priority: 0.6 },
    { url: `${siteUrl}/services`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${siteUrl}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.4 },
    { url: `${siteUrl}/agents`, lastModified: now, changeFrequency: "weekly", priority: 0.6 },
    { url: `${siteUrl}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.4 },
    { url: `${siteUrl}/maryland`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    ...countyUrls,
    ...listings.map((l) => ({
      url: `${siteUrl}${l.urlPath}`,
      lastModified: l.updatedAt,
      changeFrequency: "hourly" as const,
      priority: 0.8,
    })),
  ];
}

