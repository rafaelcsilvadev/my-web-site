import { describe, expect, it } from "vitest";

import { contrastRatio, readThemeTokens } from "./contrast";

describe("contrastRatio", () => {
  it("returns 21 for black on white", () => {
    expect(contrastRatio("#000000", "#FFFFFF")).toBeCloseTo(21, 5);
  });

  it("returns 1 for the same color", () => {
    expect(contrastRatio("#0B0B10", "#0B0B10")).toBeCloseTo(1, 5);
  });

  it("is symmetric in its arguments", () => {
    expect(contrastRatio("#FFFFFF", "#000000")).toBeCloseTo(21, 5);
  });

  it("returns less than 3 for #881E9B on #0B0B10", () => {
    expect(contrastRatio("#881E9B", "#0B0B10")).toBeLessThan(3);
  });
});

describe("readThemeTokens", () => {
  const css = `
    @import "tailwindcss";
    @theme {
      --color-bg: #0B0B10;
      --color-fg: #F4F4F8;
      --font-sans: var(--font-manrope);
    }
    @layer base {
      body { --color-ignored: #FFFFFF; color: var(--color-fg); }
    }
  `;

  it("returns the --color-* declarations of the @theme block", () => {
    expect(readThemeTokens(css)).toEqual({
      "--color-bg": "#0B0B10",
      "--color-fg": "#F4F4F8",
    });
  });

  it("ignores declarations outside the @theme block", () => {
    expect(readThemeTokens(css)).not.toHaveProperty("--color-ignored");
  });
});
