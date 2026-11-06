# Foundation Validation

**Date**: 2026-11-06
**Spec**: `.specs/features/foundation/spec.md`
**Diff range**: `022e796^..d8da720` (foundation tasks T1-T18; spec/design in f6e69f7, e42075f)
**Verifier**: independent sub-agent (author != verifier)
**Verdict**: PASS (with minor gaps listed; no surviving mutants)

---

## Task Completion

All 18 tasks (T1-T18) are checked `[x]` in `tasks.md`; zero unchecked items. Commits map 1:1 (dc8e626 .. d8da720).

---

## Spec-Anchored Acceptance Criteria

Evidence is test `file:line` + assertion. "Build" = `pnpm build` exit 0 in scratch.

### P1: Runnable app and toolchain

| AC | Spec-defined outcome | Evidence | Result |
| -- | -------------------- | -------- | ------ |
| 1 `pnpm dev` serves `/` 200 | HTTP 200 on :3000 | No test; build prerenders `/` as static (build route table). Runtime curl not performed (blocked by auto-mode classifier). | ⚠️ not test-covered |
| 2 `pnpm build` exit 0 | exit 0 | Scratch run: `pnpm build` exit 0, routes `/` and `/_not-found` | ✅ PASS (run evidence) |
| 3 lint/typecheck/test exit 0 | each exit 0 | Scratch run: lint 0, typecheck 0, test 96/96 | ✅ PASS (run evidence) |
| 4 `strict: true` | strict true | `tests/tsconfig.test.ts:15-17` - `expect(tsconfig.compilerOptions?.strict).toBe(true)` | ✅ PASS |
| 5 tests under `tests/` mirroring `src/` | mirror layout | `tests/structure.test.ts:33-36` - `expect(strays).toEqual([])`; `:38-50` - `expect(orphans).toEqual([])` | ✅ PASS |
| 6 six directories exist | 6 dirs | `tests/structure.test.ts:29-31` - `expect(existsSync(join(srcDir, dir))).toBe(true)` (it.each of 6) | ✅ PASS |
| 7 react/next in models/services fails lint | lint error | `tests/lint/boundaries.test.ts:12-25` - `toContain("no-restricted-imports")` (react, next/image, react-dom/client); clean cases `:32-40` | ✅ PASS |
| 8 import of `ui/` fails lint | lint error | `tests/lint/boundaries.test.ts:27-30` - `toContain("no-restricted-imports")` for `../../ui/a`; anchoring `:42-45` (bare `ui/x` pattern in `eslint.config.mjs:6-13` is not tested) | ✅ PASS (minor: bare `ui/` form untested) |

### P1: Dark visual system as tokens

| AC | Spec-defined outcome | Evidence | Result |
| -- | -------------------- | -------- | ------ |
| 1 colors in theme | 10 exact hex + 8% line | `tests/app/tokens.test.ts:31-44` - `expect(tokens[name].toUpperCase()).toBe(value)`; `:46-48` - `toBe("rgb(255 255 255 / 0.08)")` | ✅ PASS |
| 2 body bg/color/color-scheme/Manrope | values | `tests/app/tokens.test.ts:58-64` - four `toMatch` on body rule (regex on CSS text, not computed style) | ✅ PASS |
| 3 JetBrains Mono token | mono token | `tests/app/tokens.test.ts:54-56` - `toMatch(/--font-mono\s*:\s*var\(--font-jetbrains-mono\)/)` | ✅ PASS |
| 4 self-host, no googleapis | no runtime request | `tests/app/fonts.test.ts:19-21` (`next/font/google`), `:28-33` - `expect(offenders).toEqual([])`; build exit 0; `src/app/fonts.ts:3-15` | ✅ PASS |
| 5 focus ring 2px #E3B5F0 offset 3px | exact | `tests/app/tokens.test.ts:84-88` - `toMatch(/outline\s*:\s*2px\s+solid\s+#E3B5F0/i)`, `toMatch(/outline-offset\s*:\s*3px/)` | ✅ PASS |
| 6 reduced motion disables all | animation/transition none | `tests/app/tokens.test.ts:90-94` - `toMatch(/animation[^;]*:\s*none\s*!important/)`, same for transition | ✅ PASS |
| 7 contrast < 4.5 fails token test | contrast >= 4.5 for 3 pairs | `tests/app/tokens.test.ts:77-81` - `expect(contrastRatio(...)).toBeGreaterThanOrEqual(4.5)`; helper tested in `tests/helpers/contrast.test.ts` | ✅ PASS |
| 8 no `#881E9B` as text | no text use | `tests/app/tokens.test.ts:66-73` - `expect(offenders).toEqual([])` (checks `text-brand` and `color: var(--color-brand)` in src) | ✅ PASS |

### P1: Site metadata and static assets

| AC | Spec-defined outcome | Evidence | Result |
| -- | -------------------- | -------- | ------ |
| 1 `<html lang="pt-BR">` | lang attr | `tests/app/layout.test.tsx:22-24` - `toContain('<html lang="pt-BR"')` | ✅ PASS |
| 2 color-scheme dark, theme-color #0B0B10 | values | `tests/app/site-metadata.test.ts:129-135` - `toBe("#0B0B10")`, `toBe("dark")`; wired `tests/app/layout.test.tsx:44-46` | ✅ PASS |
| 3 OG type/locale/title/description/image 1200x630/alt | exact strings | `tests/app/site-metadata.test.ts:52-60` and `:66-75` - `toEqual([{url, width: 1200, height: 630, alt}])` | ✅ PASS |
| 4 twitter card same title/desc/image | exact | `tests/app/site-metadata.test.ts:77-84` - `toEqual({card: "summary_large_image", ...})` | ✅ PASS |
| 5 absolute URLs from `NEXT_PUBLIC_SITE_URL` | og:url, og:image, twitter:image | `tests/app/site-metadata.test.ts:62-64`, `:96-103`; env wiring `tests/app/layout.test.tsx:35-42` | ✅ PASS |
| 6 fallback localhost, no SEU-DOMINIO | fallback + absent | `tests/services/site-url.test.ts:6-16` - `toBe("http://localhost:3000")`; `tests/app/site-metadata.test.ts:105-107` - `not.toContain("SEU-DOMINIO")` | ✅ PASS |
| 7 seven assets in `public/` | files exist | `tests/app/public-assets.test.ts:18-20` - `existsSync(...)toBe(true)`; `:31-33` exact dir listing | ✅ PASS |
| 8 `GET /og-image.png` 200 image/png | HTTP 200 + type | Indirect only: `tests/app/public-assets.test.ts:22-29` asserts PNG signature and 1200x630 bytes. HTTP status/content-type not tested. | ⚠️ not test-covered |

### P2: Typed PT-BR content layer

| AC | Spec-defined outcome | Evidence | Result |
| -- | -------------------- | -------- | ------ |
| 1 strings in typed `src/content/` modules | PT-BR, typed | `src/content/site.ts:3` typed `SiteContent`; `tests/content/site.test.ts:5-30` exact strings | ✅ PASS |
| 2 site content exported and consumed by metadata | name/title/description/alt | `tests/content/site.test.ts:6-22` - `toBe(...)`; `tests/app/site-metadata.test.ts:109-114` - `toBe("Outro título")` for title, og, twitter | ✅ PASS |
| 3 hardcoded-string rule recorded in CLAUDE.md | rule text | `CLAUDE.md:70`; partial automated guard `tests/components/HomePlaceholder.test.tsx:22-30` (spec says no automated check required) | ✅ PASS |

### P2: Root layout and placeholder home

| AC | Spec-defined outcome | Evidence | Result |
| -- | -------------------- | -------- | ------ |
| 1 `/` Server Component, one `<h1>` = site name | one h1 | `tests/app/page.test.tsx:10-13` - `toHaveLength(1)`, `toHaveTextContent(siteContent.name)`; `src/app/page.tsx` has no `"use client"` (not asserted by a test) | ✅ PASS |
| 2 `#0B0B10` bg + Manrope | classes `bg-bg`, `font-sans` | `src/components/HomePlaceholder.tsx:7-8`; body styling asserted `tests/app/tokens.test.ts:58-64`; no test on component classes | ✅ PASS (indirect) |
| 3 unknown path: 404 + dark PT-BR page | HTTP 404 | `tests/app/not-found.test.tsx:9-20` - h1 `toHaveTextContent(siteContent.notFound.title)`, link `href="/"`. HTTP 404 status not tested; build lists `/_not-found`. | ⚠️ status not test-covered |

**Status**: all ACs have evidence except three that need a running server (P1-toolchain AC1, metadata AC8, home AC3 status). They are framework behavior and the build succeeds, but evidence-or-zero marks them uncovered by tests. Not a spec-precision gap (spec is precise). No spec-precision gaps.

---

## Edge Cases

- [x] Missing public asset fails a test: `tests/app/site-metadata.test.ts:116-125` (`expect(missing).toEqual([])`) and `tests/app/public-assets.test.ts:18-20`.
- [x] Tests need no network: no test fetches; fonts mocked in `tests/app/layout.test.tsx:8-11`; suite passed (not run offline explicitly).
- [x] Trailing slash: `tests/services/site-url.test.ts:18-24` - `toBe("https://a.com")`.
- [x] Invalid URL throws naming the variable: `tests/services/site-url.test.ts:30-40` - `toThrow(/NEXT_PUBLIC_SITE_URL/)`.

---

## Discrimination Sensor

Scratch: temp git worktree of HEAD (removed afterwards), deps via `CI=true pnpm install --offline --frozen-lockfile`. Depth: lightweight+ (7 mutations).

| # | File:line | Mutation | Killed? |
| - | --------- | -------- | ------- |
| 1 | `src/services/site-url.ts:23` | removed trailing-slash strip (`return value;`) | Killed (2 failed) |
| 2 | `src/app/site-metadata.ts:5` | OG height 630 -> 631 | Killed (1 failed) |
| 3 | `eslint.config.mjs:30` | dropped `src/services/**` from Model-layer restriction | Killed (2 failed) |
| 4 | `src/app/globals.css` | focus `outline-offset` 3px -> 4px | Killed (1 failed) |
| 5 | `src/app/globals.css` | `--color-brand-text` -> `#881E9B` (fails contrast) | Killed (2 failed) |
| 6 | `src/app/site-metadata.ts` | `locale` pt_BR -> en_US | Killed (1 failed) |
| 7 | `src/app/layout.tsx` | `lang` pt-BR -> en | Killed (1 failed) |

**Result**: 7/7 killed - PASS. Real-tree `git status --porcelain` before and after: only `?? "ui/Site vitrine pessoal.html"` (matches baseline).

---

## Code Quality

| Principle | Status |
| --------- | ------ |
| Minimum code / no scope creep | Pass |
| Surgical changes, matches patterns | Pass (MVVM folders respected; `src/viewmodels/.gitkeep` only) |
| Spec-anchored outcome check | Pass, except three runtime-HTTP ACs above |
| Every test maps to an AC/edge case | Pass (`tests/scripts.test.ts` maps to the scripts goal, `tests/helpers/contrast.test.ts` to token AC7) |
| Guidelines followed | CLAUDE.md (tests apart, MVVM, content in `src/content/`) |

Observations: tests for CSS/font ACs assert on source text with regexes, not rendered/computed styles (acceptable given `next/font` cannot run in Vitest; spec Independent Test allows "CSS assertions").

---

## Gate Check

- **Gate command**: `pnpm lint && pnpm typecheck && pnpm test && pnpm build` (scratch worktree)
- **Result**: lint exit 0, typecheck exit 0, test 96 passed / 0 failed / 0 skipped (16 files), build exit 0
- **Test count before feature**: 0 (no app existed)
- **Test count after feature**: 96
- **Skipped tests**: none
- **Failures**: none
- Note: `pnpm build` rewrote `tsconfig.json` in scratch (set `jsx: react-jsx`, `incremental: true`, added `.next/dev/types/**/*.ts` to `include`). The committed `tsconfig.json` is out of sync with what Next wants, so every build dirties the tree.
- Note: Vitest prints a Vite warning that `vitest.config.ts` is ESM in a CommonJS package (no `"type": "module"`); harmless today.

---

## Fix Plans

### Fix 1 (Minor): commit the Next-normalized `tsconfig.json`
- Root cause: committed tsconfig lacks `jsx: react-jsx`, `incremental`, and `.next/dev/types/**/*.ts` include that `next build` adds.
- Fix task: apply those three changes in `tsconfig.json`, re-run `pnpm build` and confirm `git status` stays clean.
- Priority: Minor

### Fix 2 (Minor): runtime HTTP evidence for 3 ACs
- Root cause: ACs on HTTP status (`/` 200, `/og-image.png` 200 image/png, `/nao-existe` 404) have no automated or recorded evidence.
- Fix task: run `pnpm build && pnpm start` then `curl -i` on the three URLs and record in this file, or add a smoke script.
- Priority: Minor

### Fix 3 (Cosmetic): bare `ui/` lint pattern untested
- `eslint.config.mjs:6-13` second pattern `^ui(/|$)` (e.g. `import "ui/x"`) has no test.

---

## Requirement Traceability Update

| Requirement | New Status |
| ----------- | ---------- |
| FND-01 | Verified (AC1 pending runtime curl) |
| FND-02 | Verified |
| FND-03 | Verified |
| FND-04 | Verified |
| FND-05 | Verified |
| FND-06 | Verified |
| FND-07 | Verified (AC8 pending runtime curl) |
| FND-08 | Verified |
| FND-09 | Verified (AC3 status pending runtime curl) |

(spec.md not modified by the Verifier.)

---

## Summary

**Overall**: Ready, with minor gaps

**Spec-anchored check**: 29/32 ACs matched spec outcome with test `file:line`; 3 need runtime HTTP evidence; 0 spec-precision gaps
**Sensor**: 7/7 mutations killed
**Gate**: 96 passed, 0 failed; lint, typecheck, build exit 0

**What works**: toolchain, tokens, metadata, content layer, MVVM lint boundaries, structure guard.

**Issues found**: Fix 1-3 above.

**Next steps**: close Fix 1 and Fix 2, then commit.
