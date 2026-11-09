import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

const root = process.cwd();
const read = (path: string) => readFileSync(join(root, path), "utf8");

const GLOW_BLOCKS = [
  "ProjectCard",
  "StackSection",
  "CaseCardList",
  "CaseHighlights",
  "CaseMetrics",
  "CaseCallout",
  "CaseFacts",
  "MethodStep",
  "CaseSteps",
];

describe("card hover", () => {
  it("defines card-glow with a purple border and glow on hover and focus-within", () => {
    const css = read("src/app/globals.css");
    const block = css.slice(css.indexOf("@utility card-glow"));

    expect(css).toContain("@utility card-glow");
    expect(block).toMatch(/&:hover/);
    expect(block).toMatch(/&:focus-within/);
    expect(block).toMatch(/border-color:\s*var\(--color-brand-text\)/);
    expect(block).toMatch(/box-shadow:/);
  });

  it.each(GLOW_BLOCKS)("%s uses card-glow", (name) => {
    expect(read(`src/components/${name}.tsx`)).toContain("card-glow");
  });

  it.each(["ContactSection", "CaseClosing", "CaseFigure"])(
    "%s parent block does not use card-glow",
    (name) => {
      expect(read(`src/components/${name}.tsx`)).not.toContain("card-glow");
    },
  );

  it("ContactCard tiles highlight only the border on hover", () => {
    const source = read("src/components/ContactCard.tsx");

    expect(source).toContain("hover:border-brand-text");
    expect(source).not.toContain("card-glow");
  });
});
