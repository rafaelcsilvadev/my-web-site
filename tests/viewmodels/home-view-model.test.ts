import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import type { ExperienceEntry } from "@/models/home-content";
import { hasItems, toExperienceEntryView } from "@/viewmodels/home-view-model";

const entry: ExperienceEntry = {
  company: "Duo Technology",
  period: "ago. de 2025 - set. de 2026",
  duration: "1 ano",
  role: "Desenvolvedor Full Stack",
  achievements: [{ lead: "FOCO.", text: "Plataforma interna." }, { text: "Coral." }],
  tags: ["Node.js", "Jest"],
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
    expect(view.company).toBe("Duo Technology");
    expect(view.duration).toBe("1 ano");
    expect(view.role).toBe("Desenvolvedor Full Stack");
    expect(view.achievements).toEqual(entry.achievements);
    expect(view.tags).toEqual(["Node.js", "Jest"]);
    expect(view.note).toBe("Nota.");
    expect(view.link).toEqual(entry.link);
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
