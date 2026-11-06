import type { Metadata, Viewport } from "next";
import type { SiteContent } from "@/models/site-content";

const OG_IMAGE_PATH = "/og-image.png";
const OG_IMAGE_WIDTH = 1200;
const OG_IMAGE_HEIGHT = 630;

export function buildSiteMetadata(
  content: SiteContent,
  siteUrl: string,
): Metadata {
  const ogImageUrl = `${siteUrl}${OG_IMAGE_PATH}`;

  return {
    metadataBase: new URL(siteUrl),
    title: content.title,
    description: content.description,
    icons: {
      icon: [
        { url: "/favicon.svg", type: "image/svg+xml" },
        { url: "/favicon.ico", sizes: "48x48" },
        { url: "/favicon-32.png", type: "image/png", sizes: "32x32" },
      ],
      apple: [{ url: "/favicon-180.png", sizes: "180x180" }],
    },
    openGraph: {
      type: "website",
      locale: "pt_BR",
      title: content.title,
      description: content.description,
      url: `${siteUrl}/`,
      images: [
        {
          url: ogImageUrl,
          width: OG_IMAGE_WIDTH,
          height: OG_IMAGE_HEIGHT,
          alt: content.ogImageAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: content.title,
      description: content.description,
      images: [ogImageUrl],
    },
  };
}

export const siteViewport: Viewport = {
  themeColor: "#0B0B10",
  colorScheme: "dark",
};
