import { afterEach, describe, expect, it, vi } from "vitest";
import sitemap from "@/app/sitemap";
import { caseSlugs } from "@/content/cases";

afterEach(() => vi.unstubAllEnvs());

describe("sitemap", () => {
  it("lists the home and every case with absolute URLs", () => {
    vi.stubEnv("NEXT_PUBLIC_SITE_URL", "https://example.com");
    const urls = sitemap().map((entry) => entry.url);
    expect(urls).toEqual([
      "https://example.com/",
      ...caseSlugs.map((slug) => `https://example.com/casos/${slug}`),
    ]);
  });
});
