import { describe, expect, it } from "vitest";

import { caseSlugs, cases } from "@/content/cases";

describe("case registry", () => {
  it("lists the slugs in order", () => {
    expect(caseSlugs).toEqual(["avaria", "my-trello-version", "este-site"]);
  });

  it("has unique slugs", () => {
    expect(new Set(caseSlugs).size).toBe(caseSlugs.length);
  });

  it("points every internal case link to a registered slug", () => {
    const text = JSON.stringify(cases);
    const linked = [...text.matchAll(/"\/casos\/([^"#?/]+)/g)].map((match) => match[1]);

    expect(linked.length).toBeGreaterThan(0);
    for (const slug of linked) {
      expect(caseSlugs).toContain(slug);
    }
  });

  it("exposes the page metadata of each case", () => {
    const bySlug = Object.fromEntries(cases.map((entry) => [entry.slug, entry.metadata]));

    expect(bySlug["avaria"].title).toBe("Avaria · Rafael Couto Silva");
    expect(bySlug["my-trello-version"].title).toBe("My Trello Version · Rafael Couto Silva");
    expect(bySlug["este-site"].title).toBe("Este site · Rafael Couto Silva");
    expect(bySlug["este-site"].description).toBe(
      "Caso Este site: portfólio projetado e entregue de ponta a ponta, com spec, teste vermelho primeiro, arquitetura MVVM com fronteiras checadas por lint e revisão humana de cada mudança.",
    );
    for (const entry of cases) {
      expect(entry.metadata.description.trim()).not.toBe("");
    }
  });
});
