import { describe, expect, it } from "vitest";
import { buildPersonJsonLd } from "@/services/person-json-ld";

describe("buildPersonJsonLd", () => {
  it("builds a schema.org Person with profile links", () => {
    const json = buildPersonJsonLd({
      name: "Ana",
      jobTitle: "Dev",
      description: "Desc",
      siteUrl: "https://example.com",
      sameAs: ["https://github.com/ana"],
    });
    expect(json).toEqual({
      "@context": "https://schema.org",
      "@type": "Person",
      name: "Ana",
      jobTitle: "Dev",
      description: "Desc",
      url: "https://example.com/",
      image: "https://example.com/rafael-portrait.png",
      sameAs: ["https://github.com/ana"],
    });
  });
});
