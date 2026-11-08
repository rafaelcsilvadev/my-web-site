import { describe, expect, it } from "vitest";
import { buildCaseMetadata } from "@/app/casos/case-metadata";
import { cases } from "@/content/cases";

const SITE_URL = "https://example.com";

interface Shape {
  title: string;
  description: string;
  openGraph: {
    type: string;
    locale: string;
    title: string;
    description: string;
    url: string;
    images: { url: string; width: number; height: number; alt: string }[];
  };
  twitter: { card: string; title: string; description: string; images: string[] };
}

function build(index: number, url = SITE_URL): Shape {
  return buildCaseMetadata(cases[index], url) as unknown as Shape;
}

describe.each(cases.map((entry, index) => [entry.slug, index] as const))(
  "buildCaseMetadata %s",
  (slug, index) => {
    it("uses the case metadata title and description", () => {
      const meta = build(index);
      expect(meta.title).toBe(cases[index].metadata.title);
      expect(meta.description).toBe(cases[index].metadata.description);
      expect(meta.openGraph.title).toBe(cases[index].metadata.title);
      expect(meta.openGraph.description).toBe(cases[index].metadata.description);
    });

    it("builds the Open Graph url as <site>/casos/<slug>", () => {
      expect(build(index).openGraph.url).toBe(`https://example.com/casos/${slug}`);
    });

    it("emits the shared /og-image.png 1200x630 on the site URL", () => {
      const [image] = build(index).openGraph.images;
      expect(image.url).toBe("https://example.com/og-image.png");
      expect(image.width).toBe(1200);
      expect(image.height).toBe(630);
    });

    it("emits Twitter summary_large_image with the case title, description and image", () => {
      expect(build(index).twitter).toEqual({
        card: "summary_large_image",
        title: cases[index].metadata.title,
        description: cases[index].metadata.description,
        images: ["https://example.com/og-image.png"],
      });
    });
  },
);

describe("buildCaseMetadata site URL", () => {
  it("uses the given site URL for every absolute URL", () => {
    const meta = build(0, "http://localhost:3000");
    expect(meta.openGraph.url).toBe(`http://localhost:3000/casos/${cases[0].slug}`);
    expect(meta.openGraph.images[0].url).toBe("http://localhost:3000/og-image.png");
  });
});
