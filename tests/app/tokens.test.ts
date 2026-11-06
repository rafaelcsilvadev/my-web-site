import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { contrastRatio, readThemeTokens } from "../helpers/contrast";

const root = join(__dirname, "..", "..");
const css = readFileSync(join(root, "src/app/globals.css"), "utf8");
const tokens = readThemeTokens(css);

function themeBlock(): string {
  return /@theme\s*\{([^}]*)\}/.exec(css)?.[1] ?? "";
}

function ruleBody(selectorPattern: string): string {
  const match = new RegExp(`${selectorPattern}\\s*\\{([^}]*)\\}`).exec(css);
  return match?.[1] ?? "";
}

function sourceFiles(dir: string): string[] {
  return readdirSync(dir).flatMap((entry) => {
    const path = join(dir, entry);
    return statSync(path).isDirectory() ? sourceFiles(path) : [path];
  });
}

describe("design tokens (FND-04)", () => {
  it("imports tailwindcss", () => {
    expect(css).toMatch(/@import\s+["']tailwindcss["']\s*;/);
  });

  it.each([
    ["--color-bg", "#0B0B10"],
    ["--color-card-from", "#16161F"],
    ["--color-card-to", "#101018"],
    ["--color-brand", "#881E9B"],
    ["--color-brand-text", "#C77DDB"],
    ["--color-brand-light", "#E3B5F0"],
    ["--color-brand-hover", "#9B2BAF"],
    ["--color-brand-pressed", "#6F1780"],
    ["--color-fg", "#ECEAF3"],
    ["--color-fg-muted", "#A9A6BA"],
  ])("defines %s as %s", (name, value) => {
    expect(tokens[name].toUpperCase()).toBe(value);
  });

  it("defines --color-line as white at 8% opacity", () => {
    expect(tokens["--color-line"].replace(/\s+/g, " ")).toBe("rgb(255 255 255 / 0.08)");
  });

  it("points --font-sans at the Manrope variable", () => {
    expect(themeBlock()).toMatch(/--font-sans\s*:\s*var\(--font-manrope\)/);
  });

  it("points --font-mono at the JetBrains Mono variable", () => {
    expect(themeBlock()).toMatch(/--font-mono\s*:\s*var\(--font-jetbrains-mono\)/);
  });

  it("sets body background, color, color-scheme dark and font", () => {
    const body = ruleBody("body");
    expect(body).toMatch(/background(-color)?\s*:\s*var\(--color-bg\)/);
    expect(body).toMatch(/(?<![-\w])color\s*:\s*var\(--color-fg\)/);
    expect(body).toMatch(/color-scheme\s*:\s*dark/);
    expect(body).toMatch(/font-family\s*:\s*var\(--font-sans\)/);
  });

  it("does not use the brand fill color as text in src", () => {
    const files = sourceFiles(join(root, "src")).filter((file) => !file.endsWith("globals.css"));
    const offenders = files.filter((file) => {
      const text = readFileSync(file, "utf8");
      return /\btext-brand(?![-\w])/.test(text) || /(?<![-\w])color\s*:\s*var\(--color-brand\)/.test(text);
    });
    expect(offenders).toEqual([]);
  });
});

describe("contrast and accessibility (FND-05)", () => {
  it.each(["--color-fg", "--color-fg-muted", "--color-brand-text"])(
    "%s on --color-bg has contrast of at least 4.5",
    (name) => {
      expect(contrastRatio(tokens[name], tokens["--color-bg"])).toBeGreaterThanOrEqual(4.5);
    },
  );

  it("draws the focus ring as 2px solid #E3B5F0 with 3px offset", () => {
    const focus = ruleBody(":focus-visible");
    expect(focus).toMatch(/outline\s*:\s*2px\s+solid\s+#E3B5F0/i);
    expect(focus).toMatch(/outline-offset\s*:\s*3px/);
  });

  it("disables transitions and animations under prefers-reduced-motion: reduce", () => {
    const block = /@media\s*\(prefers-reduced-motion:\s*reduce\)\s*\{([\s\S]*?\})\s*\}/.exec(css)?.[1] ?? "";
    expect(block).toMatch(/animation[^;]*:\s*none\s*!important/);
    expect(block).toMatch(/transition[^;]*:\s*none\s*!important/);
  });
});
