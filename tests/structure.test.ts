import { existsSync, readdirSync, statSync } from "node:fs";
import { basename, dirname, extname, join, relative, sep } from "node:path";
import { describe, expect, it } from "vitest";

const root = process.cwd();
const srcDir = join(root, "src");
const testsDir = join(root, "tests");

const SRC_DIRECTORIES = ["app", "components", "content", "models", "services", "viewmodels"];
const INFRA_DIRECTORIES = ["helpers", "lint"];
// Cross-cutting tests that cover non-code sources (CSS tokens, public/ assets).
const UNMIRRORED_TESTS = ["app/tokens.test.ts", "app/public-assets.test.ts"];

function listFiles(dir: string): string[] {
  return readdirSync(dir).flatMap((name) => {
    const full = join(dir, name);
    return statSync(full).isDirectory() ? listFiles(full) : [full];
  });
}

const testFiles = listFiles(testsDir)
  .map((file) => relative(testsDir, file).split(sep).join("/"))
  .filter((file) => /\.test\.tsx?$/.test(file))
  // Root-level tests (scripts, tsconfig, this file) are exempt.
  .filter((file) => file.includes("/"))
  .filter((file) => !INFRA_DIRECTORIES.includes(file.split("/")[0]));

describe("Folder structure (FND-02)", () => {
  it.each(SRC_DIRECTORIES)("has src/%s/", (dir) => {
    expect(existsSync(join(srcDir, dir))).toBe(true);
  });

  it("keeps every test in a directory that mirrors a src/ directory", () => {
    const strays = testFiles.filter((file) => !SRC_DIRECTORIES.includes(file.split("/")[0]));
    expect(strays).toEqual([]);
  });

  it("gives every mirrored test a matching source file", () => {
    const orphans = testFiles
      .filter((file) => !UNMIRRORED_TESTS.includes(file))
      .filter((file) => {
        const dir = dirname(file);
        const stem = basename(file).replace(/\.test\.tsx?$/, "");
        const candidates = existsSync(join(srcDir, dir))
          ? readdirSync(join(srcDir, dir)).filter((name) => basename(name, extname(name)) === stem)
          : [];
        return candidates.length === 0;
      });
    expect(orphans).toEqual([]);
  });
});
