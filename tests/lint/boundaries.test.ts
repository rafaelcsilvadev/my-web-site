import { ESLint } from "eslint";
import { describe, expect, it } from "vitest";

const eslint = new ESLint({ cwd: process.cwd() });

async function lint(filePath: string, code: string) {
  const [result] = await eslint.lintText(code, { filePath });
  return result.messages.filter((m) => m.severity === 2);
}

describe("MVVM import boundaries", () => {
  it("rejects react imports in src/models", async () => {
    const errors = await lint("src/models/x.ts", 'import "react";\n');
    expect(errors.map((e) => e.ruleId)).toContain("no-restricted-imports");
  });

  it("rejects next/* imports in src/services", async () => {
    const errors = await lint("src/services/x.ts", 'import "next/image";\n');
    expect(errors.map((e) => e.ruleId)).toContain("no-restricted-imports");
  });

  it("rejects react-dom subpath imports in src/services", async () => {
    const errors = await lint("src/services/x.ts", 'import "react-dom/client";\n');
    expect(errors.map((e) => e.ruleId)).toContain("no-restricted-imports");
  });

  it("rejects relative imports of ui/ from anywhere in src", async () => {
    const errors = await lint("src/app/x.ts", 'import "../../ui/a";\n');
    expect(errors.map((e) => e.ruleId)).toContain("no-restricted-imports");
  });

  it("rejects bare ui/ imports from anywhere in src", async () => {
    const errors = await lint("src/app/x.ts", 'import "ui/a";\n');
    expect(errors.map((e) => e.ruleId)).toContain("no-restricted-imports");
  });

  it("allows clean files in models and services", async () => {
    expect(await lint("src/models/x.ts", "export const a = 1;\n")).toHaveLength(0);
    expect(await lint("src/services/x.ts", "export const a = 1;\n")).toHaveLength(0);
  });

  it("allows react in view-layer paths", async () => {
    const errors = await lint("src/components/x.tsx", 'import "react";\nexport const a = 1;\n');
    expect(errors).toHaveLength(0);
  });

  it("allows src/components/ui/button (regex is anchored)", async () => {
    const errors = await lint("src/app/x.ts", 'import "../components/ui/button";\nexport const a = 1;\n');
    expect(errors.map((e) => e.ruleId)).not.toContain("no-restricted-imports");
  });
});
