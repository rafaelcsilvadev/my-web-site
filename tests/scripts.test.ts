import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const pkg = JSON.parse(
  readFileSync(resolve(__dirname, "../package.json"), "utf8"),
) as { scripts?: Record<string, string> };

describe("package.json scripts", () => {
  it("exposes the six project scripts with the expected commands", () => {
    expect(pkg.scripts).toEqual({
      dev: "next dev",
      build: "next build",
      start: "next start",
      lint: "eslint .",
      typecheck: "tsc --noEmit",
      test: "vitest run",
    });
  });
});
