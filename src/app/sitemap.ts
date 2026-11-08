import type { MetadataRoute } from "next";
import { caseSlugs } from "@/content/cases";
import { normalizeSiteUrl } from "@/services/site-url";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = normalizeSiteUrl(process.env.NEXT_PUBLIC_SITE_URL);

  return [
    { url: `${siteUrl}/`, priority: 1 },
    ...caseSlugs.map((slug) => ({ url: `${siteUrl}/casos/${slug}`, priority: 0.8 })),
  ];
}
