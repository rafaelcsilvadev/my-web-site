import { existsSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { buildSiteMetadata, siteViewport } from "@/app/site-metadata";
import { siteContent } from "@/content/site";
import type { SiteContent } from "@/models/site-content";

const SITE_URL = "https://example.com";
const publicDir = join(process.cwd(), "public");

interface IconEntry {
  url: string;
  type?: string;
  sizes?: string;
}

interface Shape {
  metadataBase: URL;
  title: string;
  description: string;
  icons: { icon: IconEntry[]; apple: IconEntry[] };
  openGraph: {
    type: string;
    locale: string;
    title: string;
    description: string;
    url: string;
    images: { url: string; width: number; height: number; alt: string }[];
  };
  twitter: {
    card: string;
    title: string;
    description: string;
    images: string[];
  };
}

function build(content: SiteContent = siteContent, url = SITE_URL): Shape {
  return buildSiteMetadata(content, url) as unknown as Shape;
}

describe("buildSiteMetadata", () => {
  it("sets metadataBase, title and description from content", () => {
    const meta = build();
    expect(meta.metadataBase.href).toBe("https://example.com/");
    expect(meta.title).toBe("Rafael Couto Silva · Especialista Full Stack");
    expect(meta.description).toBe(
      "Do requisito à produção, guiado por especificações.",
    );
  });

  it("emits Open Graph type, locale, title and description", () => {
    const og = build().openGraph;
    expect(og.type).toBe("website");
    expect(og.locale).toBe("pt_BR");
    expect(og.title).toBe("Rafael Couto Silva · Especialista Full Stack");
    expect(og.description).toBe(
      "Do requisito à produção, guiado por especificações.",
    );
  });

  it("ends og:url with a slash and builds it from the site URL", () => {
    expect(build().openGraph.url).toBe("https://example.com/");
  });

  it("emits the Open Graph image 1200x630 with alt, on the site URL", () => {
    expect(build().openGraph.images).toEqual([
      {
        url: "https://example.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "Rafael Couto Silva, Especialista Full Stack, do requisito à produção",
      },
    ]);
  });

  it("emits Twitter summary_large_image with same title, description and image", () => {
    expect(build().twitter).toEqual({
      card: "summary_large_image",
      title: "Rafael Couto Silva · Especialista Full Stack",
      description: "Do requisito à produção, guiado por especificações.",
      images: ["https://example.com/og-image.png"],
    });
  });

  it("emits svg, ico 48x48, png 32x32 and apple 180x180 icons", () => {
    const { icon, apple } = build().icons;
    expect(icon).toEqual([
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "48x48" },
      { url: "/favicon-32.png", type: "image/png", sizes: "32x32" },
    ]);
    expect(apple).toEqual([{ url: "/favicon-180.png", sizes: "180x180" }]);
  });

  it("uses the given site URL for every absolute URL", () => {
    const meta = build(siteContent, "http://localhost:3000");
    expect(meta.openGraph.url).toBe("http://localhost:3000/");
    expect(meta.openGraph.images[0].url).toBe(
      "http://localhost:3000/og-image.png",
    );
    expect(meta.twitter.images[0]).toBe("http://localhost:3000/og-image.png");
  });

  it("never outputs the SEU-DOMINIO placeholder", () => {
    expect(JSON.stringify(build())).not.toContain("SEU-DOMINIO");
  });

  it("changes title and og:title when the content changes", () => {
    const meta = build({ ...siteContent, title: "Outro título" });
    expect(meta.title).toBe("Outro título");
    expect(meta.openGraph.title).toBe("Outro título");
    expect(meta.twitter.title).toBe("Outro título");
  });

  it("references only files that exist in public/", () => {
    const meta = build();
    const paths = [
      ...meta.icons.icon.map((i) => i.url),
      ...meta.icons.apple.map((i) => i.url),
      new URL(meta.openGraph.images[0].url).pathname,
    ];
    const missing = paths.filter((p) => !existsSync(join(publicDir, p)));
    expect(missing).toEqual([]);
  });
});

describe("siteViewport", () => {
  it("sets theme color #0B0B10", () => {
    expect(siteViewport.themeColor).toBe("#0B0B10");
  });

  it("sets dark color scheme", () => {
    expect(siteViewport.colorScheme).toBe("dark");
  });
});
