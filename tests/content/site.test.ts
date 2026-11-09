import { describe, expect, it } from "vitest";

import { siteContent } from "@/content/site";

describe("siteContent", () => {
  it("has the site name", () => {
    expect(siteContent.name).toBe("Rafael Couto Silva");
  });

  it("has the site title", () => {
    expect(siteContent.title).toBe("Rafael Couto Silva · Desenvolvedor Full Stack");
  });

  it("has the site description", () => {
    expect(siteContent.description).toBe("Desenvolvedor Full Stack. Especificação, teste e revisão. Qualidade desde o primeiro commit.");
  });

  it("has the Open Graph image alt text", () => {
    expect(siteContent.ogImageAlt).toBe(
      "Rafael Couto Silva, Desenvolvedor Full Stack, do requisito à produção",
    );
  });

  it("has non-empty not-found copy", () => {
    const { title, message, backLabel } = siteContent.notFound;
    for (const value of [title, message, backLabel]) {
      expect(value.trim()).not.toBe("");
    }
  });
});
