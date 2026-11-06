import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const tsconfig = JSON.parse(
  readFileSync(resolve(__dirname, "../tsconfig.json"), "utf8"),
) as {
  compilerOptions?: {
    strict?: boolean;
    paths?: Record<string, string[]>;
  };
};

describe("tsconfig.json", () => {
  it("enables strict mode", () => {
    expect(tsconfig.compilerOptions?.strict).toBe(true);
  });

  it("maps the @/* alias to src/*", () => {
    expect(tsconfig.compilerOptions?.paths?.["@/*"]).toEqual(["./src/*"]);
  });
});
