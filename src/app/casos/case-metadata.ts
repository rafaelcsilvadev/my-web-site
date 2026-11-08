import type { Metadata } from "next";
import type { CaseContent } from "@/models/case-content";
import { OG_IMAGE_HEIGHT, OG_IMAGE_PATH, OG_IMAGE_WIDTH } from "../site-metadata";

export function buildCaseMetadata(entry: CaseContent, siteUrl: string): Metadata {
  const { title, description } = entry.metadata;
  const ogImageUrl = `${siteUrl}${OG_IMAGE_PATH}`;

  return {
    title,
    description,
    openGraph: {
      type: "website",
      locale: "pt_BR",
      title,
      description,
      url: `${siteUrl}/casos/${entry.slug}`,
      images: [{ url: ogImageUrl, width: OG_IMAGE_WIDTH, height: OG_IMAGE_HEIGHT, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImageUrl],
    },
  };
}
