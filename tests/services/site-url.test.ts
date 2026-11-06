import { describe, expect, it } from "vitest";

import { normalizeSiteUrl } from "@/services/site-url";

describe("normalizeSiteUrl", () => {
  it("falls back to localhost when undefined", () => {
    expect(normalizeSiteUrl(undefined)).toBe("http://localhost:3000");
  });

  it("falls back to localhost when empty", () => {
    expect(normalizeSiteUrl("")).toBe("http://localhost:3000");
  });

  it("falls back to localhost when blank", () => {
    expect(normalizeSiteUrl("  ")).toBe("http://localhost:3000");
  });

  it("strips a trailing slash", () => {
    expect(normalizeSiteUrl("https://a.com/")).toBe("https://a.com");
  });

  it("strips multiple trailing slashes", () => {
    expect(normalizeSiteUrl("https://a.com//")).toBe("https://a.com");
  });

  it("keeps a clean URL unchanged", () => {
    expect(normalizeSiteUrl("https://a.com")).toBe("https://a.com");
  });

  it("throws for a non-http(s) protocol", () => {
    expect(() => normalizeSiteUrl("ftp://a.com")).toThrow(
      /NEXT_PUBLIC_SITE_URL/,
    );
  });

  it("throws for an unparsable value naming the env var", () => {
    expect(() => normalizeSiteUrl("not a url")).toThrow(
      /NEXT_PUBLIC_SITE_URL/,
    );
  });
});
