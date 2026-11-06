import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";
import { buildSiteMetadata } from "@/app/site-metadata";
import { siteContent } from "@/content/site";
import { normalizeSiteUrl } from "@/services/site-url";

// next/font/google cannot run under Vitest, so the font modules are replaced.
vi.mock("@/app/fonts", () => ({
  manrope: { variable: "font-manrope-test" },
  jetbrainsMono: { variable: "font-mono-test" },
}));

import RootLayout, { metadata, viewport } from "@/app/layout";

describe("RootLayout (FND-01, FND-06, FND-09)", () => {
  const markup = renderToStaticMarkup(
    <RootLayout>
      <p>child content</p>
    </RootLayout>,
  );

  it("renders html with lang pt-BR", () => {
    expect(markup).toContain('<html lang="pt-BR"');
  });

  it("applies both font variable classes to html", () => {
    expect(markup).toContain("font-manrope-test");
    expect(markup).toContain("font-mono-test");
  });

  it("renders the children", () => {
    expect(markup).toContain("<p>child content</p>");
  });

  it("exports metadata built from the site content and the normalized site URL", () => {
    expect(metadata).toEqual(
      buildSiteMetadata(
        siteContent,
        normalizeSiteUrl(process.env.NEXT_PUBLIC_SITE_URL),
      ),
    );
  });

  it("exports a viewport with theme color #0B0B10", () => {
    expect(viewport.themeColor).toBe("#0B0B10");
  });
});
