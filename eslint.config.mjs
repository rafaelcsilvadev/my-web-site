import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const uiPatterns = [
  {
    regex: "^(\\.\\./)+ui(/|$)",
    message: "ui/ is design input only. Copy assets into public/ instead.",
  },
  {
    regex: "^ui(/|$)",
    message: "ui/ is design input only. Copy assets into public/ instead.",
  },
];

const frameworkPaths = ["react", "react/*", "react-dom", "react-dom/*", "next", "next/*"];

export default defineConfig([
  ...nextVitals,
  ...nextTs,
  globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts", "ui/**"]),
  {
    files: ["src/**"],
    rules: {
      "no-restricted-imports": ["error", { patterns: uiPatterns }],
    },
  },
  {
    files: ["src/models/**", "src/services/**"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          paths: frameworkPaths
            .filter((p) => !p.includes("*"))
            .map((name) => ({
              name,
              message: "Model layer must stay framework-free (no React/Next).",
            })),
          patterns: [
            ...uiPatterns,
            {
              group: frameworkPaths.filter((p) => p.includes("*")),
              message: "Model layer must stay framework-free (no React/Next).",
            },
          ],
        },
      ],
    },
  },
]);
