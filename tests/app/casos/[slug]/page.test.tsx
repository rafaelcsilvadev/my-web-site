import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import CasePage, { generateMetadata, generateStaticParams } from "@/app/casos/[slug]/page";
import { buildCaseMetadata } from "@/app/casos/case-metadata";
import { cases } from "@/content/cases";

const NOT_FOUND = "NEXT_NOT_FOUND";

vi.mock("next/navigation", () => ({
  notFound: vi.fn(() => {
    throw new Error("NEXT_NOT_FOUND");
  }),
}));

afterEach(cleanup);

const params = (slug: string) => ({ params: Promise.resolve({ slug }) });

describe("Case route generateStaticParams (CASE-09)", () => {
  it("returns one entry per case slug", () => {
    expect(generateStaticParams()).toEqual([
      { slug: "avaria" },
      { slug: "my-trello-version" },
      { slug: "este-site" },
    ]);
  });
});

describe.each(cases.map((entry) => [entry.slug, entry.title] as const))(
  "Case page %s (CASE-09, CASE-12)",
  (slug, title) => {
    it("renders the case h1", async () => {
      render(await CasePage(params(slug)));
      const headings = screen.getAllByRole("heading", { level: 1 });
      expect(headings).toHaveLength(1);
      expect(headings[0]).toHaveTextContent(title);
    });

    it("returns the case metadata", async () => {
      const entry = cases.find((item) => item.slug === slug)!;
      const meta = await generateMetadata(params(slug));
      expect(meta.title).toBe(entry.metadata.title);
      expect(meta.openGraph).toMatchObject({ url: expect.stringContaining(`/casos/${slug}`) });
      expect(meta).toEqual(buildCaseMetadata(entry, "http://localhost:3000"));
    });
  },
);

describe("Case page este-site sections (SITE-08)", () => {
  it("labels the hero by the h1 and every other section by an h2", async () => {
    const { container } = render(await CasePage(params("este-site")));
    const sections = container.querySelectorAll("section[aria-labelledby]");
    expect(sections.length).toBeGreaterThan(0);
    for (const section of sections) {
      const id = section.getAttribute("aria-labelledby")!;
      const heading = container.querySelector(`#${id}`);
      expect(heading?.tagName).toBe(id === "case-title" ? "H1" : "H2");
    }
  });
});

describe("Case page unknown slug (CASE-10)", () => {
  it("calls notFound for the page", async () => {
    await expect(CasePage(params("does-not-exist"))).rejects.toThrow(NOT_FOUND);
  });

  it("calls notFound for the metadata", async () => {
    await expect(generateMetadata(params("does-not-exist"))).rejects.toThrow(NOT_FOUND);
  });
});
