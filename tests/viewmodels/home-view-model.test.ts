import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import type { ExperienceEntry, MethodStep } from "@/models/home-content";
import {
  brandHref,
  hasItems,
  navHref,
  splitNavLinks,
  toExperienceEntryView,
  toMethodStepView,
} from "@/viewmodels/home-view-model";

const entry: ExperienceEntry = {
  company: "DUO Technology",
  period: "ago. de 2025 - set. de 2026",
  duration: "1 ano",
  role: "Desenvolvedor Full Stack",
  achievements: [{ lead: "FOCO.", text: "Plataforma interna." }, { text: "Coral." }],
  tags: ["Node.js", "Jest"],
  mainTags: ["Node.js"],
  note: "Nota.",
  link: { label: "Ver o caso", href: "/casos/x" },
};

describe("toExperienceEntryView", () => {
  it("keeps a filled period", () => {
    expect(toExperienceEntryView(entry).period).toBe("ago. de 2025 - set. de 2026");
  });

  it.each([
    ["empty", ""],
    ["whitespace", "   "],
    ["missing", undefined],
  ])("turns a %s period into undefined", (_label, period) => {
    expect(toExperienceEntryView({ ...entry, period }).period).toBeUndefined();
  });

  it("passes the other fields through unchanged", () => {
    const view = toExperienceEntryView(entry);
    expect(view.company).toBe("DUO Technology");
    expect(view.duration).toBe("1 ano");
    expect(view.role).toBe("Desenvolvedor Full Stack");
    expect(view.achievements).toEqual(entry.achievements);
    expect(view.tags).toEqual(["Node.js", "Jest"]);
    expect(view.note).toBe("Nota.");
    expect(view.link).toEqual(entry.link);
  });
});

const step: MethodStep = {
  number: "04",
  title: "Teste vermelho",
  human: "Reviso os testes no PR.",
  ai: "Cria os testes com TDD.",
  highlight: true,
};

describe("toMethodStepView", () => {
  it("keeps a filled ai text", () => {
    expect(toMethodStepView(step).ai).toBe("Cria os testes com TDD.");
  });

  it.each([
    ["empty", ""],
    ["whitespace", "   "],
    ["missing", undefined],
  ])("turns a %s ai text into undefined", (_label, ai) => {
    expect(toMethodStepView({ ...step, ai }).ai).toBeUndefined();
  });

  it("passes number, title, human and highlight through", () => {
    const view = toMethodStepView(step);
    expect(view.number).toBe("04");
    expect(view.title).toBe("Teste vermelho");
    expect(view.human).toBe("Reviso os testes no PR.");
    expect(view.highlight).toBe(true);
  });

  it("defaults highlight to false", () => {
    expect(toMethodStepView({ ...step, highlight: undefined }).highlight).toBe(false);
  });
});

describe("hasItems", () => {
  it("is false for undefined", () => {
    expect(hasItems(undefined)).toBe(false);
  });

  it("is false for an empty list", () => {
    expect(hasItems([])).toBe(false);
  });

  it("is true for a non-empty list", () => {
    expect(hasItems(["a"])).toBe(true);
  });
});

describe("home-view-model source", () => {
  it("imports nothing from React or Next", () => {
    const source = readFileSync(resolve(__dirname, "../../src/viewmodels/home-view-model.ts"), "utf8");
    expect(source).not.toMatch(/from\s+["'](react|next)/);
  });
});

describe("splitNavLinks", () => {
  const links = [
    { label: "A", sectionId: "a" },
    { label: "B", sectionId: "b" },
  ];

  it("separates the CTA link from the inline links", () => {
    expect(splitNavLinks({ ctaSectionId: "b", links })).toEqual({
      inlineLinks: [links[0]],
      cta: links[1],
    });
  });

  it("returns no CTA when none matches", () => {
    expect(splitNavLinks({ ctaSectionId: "x", links })).toEqual({ inlineLinks: links, cta: undefined });
  });
});

describe("navHref", () => {
  it("uses the explicit href when present", () => {
    expect(navHref({ label: "Home", href: "/", sectionId: "x" })).toBe("/");
  });

  it("falls back to the section anchor", () => {
    expect(navHref({ label: "A", sectionId: "a" })).toBe("#a");
  });
});

describe("brandHref", () => {
  it("uses the explicit brand href when present", () => {
    expect(brandHref({ topId: "top", brandHref: "/" })).toBe("/");
  });

  it("falls back to the top anchor", () => {
    expect(brandHref({ topId: "top" })).toBe("#top");
  });
});
