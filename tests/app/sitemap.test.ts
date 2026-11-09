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

  it("lists /casos/este-site with priority 0.8", () => {
    vi.stubEnv("NEXT_PUBLIC_SITE_URL", "https://example.com");
    const entry = sitemap().find((item) => item.url === "https://example.com/casos/este-site");
    expect(entry?.priority).toBe(0.8);
  });
});
