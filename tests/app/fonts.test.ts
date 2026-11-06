import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

const root = join(__dirname, "..", "..");
const srcDir = join(root, "src");

function sourceFiles(dir: string): string[] {
  return readdirSync(dir).flatMap((entry) => {
    const path = join(dir, entry);
    return statSync(path).isDirectory() ? sourceFiles(path) : [path];
  });
}

// next/font/google cannot run under Vitest, so these tests assert on source text.
describe("self-hosted fonts (FND-04)", () => {
  const fonts = readFileSync(join(srcDir, "app/fonts.ts"), "utf8");

  it("imports from next/font/google", () => {
    expect(fonts).toMatch(/from\s+["']next\/font\/google["']/);
  });

  it("declares both CSS variable names", () => {
    expect(fonts).toContain('variable: "--font-manrope"');
    expect(fonts).toContain('variable: "--font-jetbrains-mono"');
  });

  it("references fonts.googleapis.com nowhere under src/", () => {
    const offenders = sourceFiles(srcDir).filter((file) =>
      readFileSync(file, "utf8").includes("fonts.googleapis.com"),
    );
    expect(offenders).toEqual([]);
  });
});
