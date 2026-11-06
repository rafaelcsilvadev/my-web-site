# Foundation Tasks

## Execution Protocol (MANDATORY -- do not skip)

Implement these tasks with the `tlc-spec-driven` skill: **activate it by name and follow its Execute flow and Critical Rules.** Do not search for skill files by filesystem path. The skill is the source of truth for the full flow (per-task cycle, sub-agent delegation, adequacy review, Verifier, discrimination sensor).

**If the skill cannot be activated, STOP and tell the user - do not proceed without it.**

---

**Design**: `.specs/features/foundation/design.md`
**Status**: Draft

---

## Test Coverage Matrix

> Generated from project guidelines and the approved design - confirm before Execute. Guidelines found: `CLAUDE.md` (project: Vitest + Testing Library, `tests/` mirrors `src/`, see red first, tests in the same commit as the code) and `design.md` test plan. No existing tests and no test config in the repo yet; stack taken from `CLAUDE.md`, commands from the scripts created in T1.

| Code Layer | Required Test Type | Coverage Expectation | Location Pattern | Run Command |
| ---------- | ------------------ | -------------------- | ---------------- | ----------- |
| Services (pure functions) | unit | All branches; 1:1 to spec ACs; every listed edge case | `tests/services/**/*.test.ts` | `pnpm test` |
| Models / Content (typed data) | unit | Values match the spec/design strings; one test per exported structure | `tests/content/**/*.test.ts` | `pnpm test` |
| Views (`src/components`) | unit | Render with props: one assertion per spec outcome (heading, link, text from props) | `tests/components/**/*.test.tsx` | `pnpm test` |
| App wiring (`src/app` TS/TSX) | unit | Exported `metadata`/`viewport` values; rendered markup of layout/page/not-found; every metadata AC | `tests/app/**/*.test.ts(x)` | `pnpm test` |
| Styles / tokens (`globals.css`) | unit | Parse CSS source: every token value, base rules, contrast ≥ 4.5:1, forbidden text color | `tests/app/tokens.test.ts` | `pnpm test` |
| Tooling config (ESLint, tsconfig, package.json) | unit | Rules exercised through the real tool (ESLint API); JSON fields asserted | `tests/lint/**`, `tests/*.test.ts` | `pnpm test` |
| Static assets (`public/`) | unit | Files exist; `og-image.png` is a PNG of 1200×630 | `tests/app/public-assets.test.ts` | `pnpm test` |
| Config only (postcss, vitest config, docs) | none | - (build gate only; exercised by the tests above) | - | build gate only |

## Gate Check Commands

> Generated from the design; the scripts are created in T1 - confirm before Execute.

| Gate Level | When to Use | Command |
| ---------- | ----------- | ------- |
| Quick | Tasks with unit tests only | `pnpm test` |
| Full | Tasks that touch lint, types or app wiring | `pnpm lint && pnpm typecheck && pnpm test` |
| Build | Config-only tasks after `src/app` exists, and phase completion | `pnpm lint && pnpm typecheck && pnpm test && pnpm build` |

Until T15 there is no `src/app`, so `pnpm build` is not part of any gate before then. From T15 on, tasks gated "build" also run the `curl` checks listed in that task.

---

## Execution Plan

Phases are ordered and run sequentially - each phase completes before the next begins, and tasks within a phase execute in order.

### Phase 1: Toolchain

Tight dependency chain: package and scripts, TypeScript, Vitest, ESLint boundaries.

```
T1 → T2 → T3 → T4
```

### Phase 2: Pure core and assets

Framework-free logic, content and static files. Each task depends only on the Vitest config (T3); they are independent of each other.

```
T3 → T5
T3 → T6
T3 → T7
T3 → T8
```

### Phase 3: Styling and app shell

Tokens, fonts, metadata, views, then the wiring that makes the app run.

```
T3 → T9
T7 → T10
T9 → T10
T10 → T11
T5 → T12
T6 → T12
T8 → T12
T10 → T13
T10 → T14
T11 → T15
T12 → T15
T13 → T15
T14 → T16
T15 → T16
```

### Phase 4: Structure guard and docs

```
T16 → T17
T17 → T18
```

---

## Task Breakdown

### T1: Create `package.json` with dependencies and scripts

**What**: Initialize the pnpm project: `packageManager`, runtime deps (`next`, `react`, `react-dom`), dev deps (`typescript`, `@types/node`, `@types/react`, `@types/react-dom`, `tailwindcss`, `@tailwindcss/postcss`, `postcss`, `eslint`, `eslint-config-next`, `vitest`, `vite`, `jsdom`, `@vitejs/plugin-react`, `@testing-library/react`, `@testing-library/dom`, `@testing-library/jest-dom`) and scripts `dev`, `build`, `start`, `lint` (`eslint .`), `typecheck` (`tsc --noEmit`), `test` (`vitest run`). Also add `.next/`, `node_modules/`, `.env*.local`, `next-env.d.ts` to `.gitignore`.
**Where**: `package.json`
**Depends on**: None
**Reuses**: Versions verified in `design.md` (Next 16.4.5, Tailwind 4.3.5, ESLint 10.14, Vitest 5.1.0, Node 24)
**Requirement**: FND-01

**Tools**:

- MCP: NONE
- Skill: NONE

**Done when**:

- [x] `tests/scripts.test.ts` written first and seen failing (scripts missing), then passing
- [x] Test asserts the 6 scripts exist with the commands above
- [x] `pnpm install` succeeds and `pnpm-lock.yaml` is created
- [x] Gate check passes: `pnpm test`
- [x] Test count: 1 test file, 1 test passes (no silent deletions)

**Tests**: unit
**Gate**: quick

**Commit**: `chore: add package.json with pnpm scripts and tooling deps` (lockfile excluded from the size count)

---

### T2: Add strict `tsconfig.json`

**What**: Create `tsconfig.json` with `strict: true`, `@/*` → `src/*` path alias, JSX `preserve`, Next plugin, includes `src`, `tests`, `next-env.d.ts`.
**Where**: `tsconfig.json`
**Depends on**: T1
**Reuses**: Next 16 default tsconfig shape
**Requirement**: FND-02

**Tools**:

- MCP: NONE
- Skill: NONE

**Done when**:

- [x] `tests/tsconfig.test.ts` written first and seen failing, then passing
- [x] Test asserts `compilerOptions.strict === true` and the `@/*` alias
- [x] Gate check passes: `pnpm typecheck && pnpm test` (lint excluded: ESLint 10 exits 2 without `eslint.config.*`, which T4 creates; decision: option A)
- [x] Test count: 2 test files, 3 tests pass

**Tests**: unit
**Gate**: quick + typecheck (lint joins the gate from T4)

**Commit**: `chore: add strict TypeScript config`

---

### T3: Add Vitest config

**What**: Create `vitest.config.ts` with `jsdom` environment, React plugin, `@` alias to `src`, `tests/setup.ts` (loads `@testing-library/jest-dom/vitest`), and `include: ["tests/**/*.test.{ts,tsx}"]`. The first test that imports `@/...` or uses `toBeInTheDocument` (T5, T13) proves it.
**Where**: `vitest.config.ts`
**Depends on**: T2
**Reuses**: Alias from T2
**Requirement**: FND-01

**Tools**:

- MCP: NONE
- Skill: NONE

**Done when**:

- [x] `pnpm test` still passes with the existing tests
- [x] Gate check passes: `pnpm typecheck && pnpm test` (no lint config until T4)
- [x] Test count: 2 test files unchanged (no silent deletions)

**Tests**: none (config; exercised by T5 and T13 per the matrix)
**Gate**: quick + typecheck

**Commit**: `chore: add Vitest config with jsdom and path alias`

---

### T4: Add ESLint config with MVVM boundary rules

**What**: Create `eslint.config.mjs`: `eslint-config-next` (core-web-vitals + typescript), plus `no-restricted-imports` for `src/models/**` and `src/services/**` (`react`, `react/*`, `react-dom`, `react-dom/*`, `next`, `next/*`) and for `src/**` (regex `^(\.\./)+ui(/|$)`, `^ui(/|$)`).
**Where**: `eslint.config.mjs`
**Depends on**: T3
**Reuses**: AD-002
**Requirement**: FND-03

**Tools**:

- MCP: NONE
- Skill: NONE

**Done when**:

- [x] `tests/lint/boundaries.test.ts` written first and seen failing (rules absent), then passing
- [x] Uses `ESLint.lintText` with `filePath`: `src/models/x.ts` importing `react` → error; `src/services/x.ts` importing `next/image` → error; `src/app/x.ts` importing `../../ui/a` → error
- [x] Clean files in the same paths → 0 errors; `src/components/ui/button` import → 0 errors (regex anchored)
- [x] Gate check passes: `pnpm lint && pnpm typecheck && pnpm test` (typescript pinned to ~6.0.3: typescript-eslint 8.72 rejects TS 7; decision: option A)
- [x] Test count: 3 test files, 7+ tests pass

**Tests**: unit
**Gate**: full

**Commit**: `feat(lint): enforce MVVM import boundaries with ESLint`

---

### T5: Implement `normalizeSiteUrl`

**What**: Pure function `normalizeSiteUrl(raw: string | undefined): string`: undefined/blank → `http://localhost:3000`; strips trailing slashes; non-http(s) or unparsable → throws an error whose message names `NEXT_PUBLIC_SITE_URL`.
**Where**: `src/services/site-url.ts`
**Depends on**: T3
**Reuses**: Design "Site URL"
**Requirement**: FND-06

**Tools**:

- MCP: NONE
- Skill: NONE

**Done when**:

- [x] `tests/services/site-url.test.ts` written first and seen failing
- [x] Tests: undefined → fallback; `""` and `"  "` → fallback; `https://a.com/` → `https://a.com`; `https://a.com//` → `https://a.com`; `https://a.com` unchanged; `ftp://a.com` throws; `not a url` throws; message contains `NEXT_PUBLIC_SITE_URL`
- [x] Gate check passes: `pnpm test`
- [x] Test count: 8 new tests pass

**Tests**: unit
**Gate**: quick

**Commit**: `feat(site): add site URL normalization`

---

### T6: Add site content and its type

**What**: `SiteContent` interface in `src/models/site-content.ts` and the data in `src/content/site.ts`: name, title "Rafael Couto Silva · Especialista Full Stack", description "Do requisito à produção, guiado por especificações.", OG image alt from `ui/head-snippet.html`, and PT-BR `notFound` copy (title, message, back label).
**Where**: `src/content/site.ts`
**Depends on**: T3
**Reuses**: `ui/head-snippet.html` strings; Design "Site content"
**Requirement**: FND-08

**Tools**:

- MCP: NONE
- Skill: NONE

**Done when**:

- [x] `tests/content/site.test.ts` written first and seen failing
- [x] Tests assert exact name, title, description and OG alt strings, and that every `notFound` field is a non-empty string
- [x] Gate check passes: `pnpm lint && pnpm typecheck && pnpm test`
- [x] Test count: 5 new tests pass

**Tests**: unit
**Gate**: full

**Commit**: `feat(content): add typed site content in PT-BR`

---

### T7: Add WCAG contrast helper for tests

**What**: `contrastRatio(foreground: string, background: string): number` using WCAG relative luminance for 6-digit hex colors, plus `readThemeTokens(css: string): Record<string, string>` that parses `--color-*` declarations from the `@theme` block. Both are test helpers.
**Where**: `tests/helpers/contrast.ts`
**Depends on**: T3
**Reuses**: AD-001
**Requirement**: FND-05

**Tools**:

- MCP: NONE
- Skill: NONE

**Done when**:

- [x] `tests/helpers/contrast.test.ts` written first and seen failing
- [x] Tests: `#000000` vs `#FFFFFF` = 21; same color = 1; `#881E9B` on `#0B0B10` < 3; `readThemeTokens` returns the declared colors from a sample `@theme` block and ignores other rules
- [x] Gate check passes: `pnpm test`
- [x] Test count: 4+ new tests pass

**Tests**: unit
**Gate**: quick

**Commit**: `test: add contrast and theme token helpers`

---

### T8: Copy public assets and guard them

**What**: Copy `favicon.svg`, `favicon.ico`, `favicon-32.png`, `favicon-180.png`, `favicon-192.png`, `favicon-512.png` and `og-image.png` from `ui/images/` into `public/`. The portrait and Trello screenshot stay out.
**Where**: `public/` (7 binary files)
**Depends on**: T3
**Reuses**: `ui/images/` (read-only input)
**Requirement**: FND-07

**Tools**:

- MCP: NONE
- Skill: NONE

**Done when**:

- [x] `tests/app/public-assets.test.ts` written first and seen failing
- [x] Tests: the 7 files exist; `og-image.png` has the PNG signature and IHDR size 1200×630; no other image is present in `public/`
- [x] Gate check passes: `pnpm test`
- [x] Test count: 3+ new tests pass

**Tests**: unit
**Gate**: quick

**Commit**: `feat(public): add favicons and open graph image`

---

### T9: Add PostCSS config for Tailwind

**What**: Create `postcss.config.mjs` with the `@tailwindcss/postcss` plugin so Tailwind 4 processes `globals.css` at build.
**Where**: `postcss.config.mjs`
**Depends on**: T3
**Reuses**: Tailwind 4 install docs
**Requirement**: FND-04

**Tools**:

- MCP: NONE
- Skill: NONE

**Done when**:

- [x] File exports the `@tailwindcss/postcss` plugin
- [x] Gate check passes: `pnpm lint && pnpm typecheck && pnpm test`
- [x] Test count: unchanged (no silent deletions); effect is verified by the T15 build

**Tests**: none (config; per the matrix)
**Gate**: full

**Commit**: `chore: add PostCSS config for Tailwind`

---

### T10: Define design tokens and base styles

**What**: `globals.css` with `@import "tailwindcss"`, `@theme` colors (`--color-bg`, `--color-card-from`, `--color-card-to`, `--color-brand`, `--color-brand-text`, `--color-brand-light`, `--color-brand-hover`, `--color-brand-pressed`, `--color-fg`, `--color-fg-muted`, `--color-line`), font tokens `--font-sans` / `--font-mono`, and `@layer base`: `body` (background, color, `color-scheme: dark`, font), `:focus-visible` (2px solid `#E3B5F0`, offset 3px), reduced-motion block.
**Where**: `src/app/globals.css`
**Depends on**: T7, T9
**Reuses**: Board "Sistema visual"; AD-001
**Requirement**: FND-04, FND-05

**Tools**:

- MCP: NONE
- Skill: NONE

**Done when**:

- [x] `tests/app/tokens.test.ts` written first and seen failing
- [x] Tests: each color token equals its spec value; `--font-sans` and `--font-mono` reference the font variables; `body` sets bg, fg, `color-scheme: dark`
- [x] Contrast: `fg`, `fg-muted`, `brand-text` on `bg` each ≥ 4.5
- [x] Focus rule is `2px solid #E3B5F0` with `3px` offset; `prefers-reduced-motion: reduce` block disables transition and animation
- [x] No `src/**` file uses `text-brand` (regex `\btext-brand(?![-\w])`) or `color: var(--color-brand)`
- [x] Gate check passes: `pnpm lint && pnpm typecheck && pnpm test`
- [x] Test count: 12+ new tests pass

**Tests**: unit
**Gate**: full

**Commit**: `feat(ui): add dark design tokens and base styles`

---

### T11: Configure self-hosted fonts

**What**: `fonts.ts` exporting `manrope` (weights 400-800) and `jetbrainsMono` (400-600) from `next/font/google`, `display: "swap"`, subsets `latin` and `latin-ext`, `variable` set to `--font-manrope` and `--font-jetbrains-mono`.
**Where**: `src/app/fonts.ts`
**Depends on**: T10
**Reuses**: Token names from T10
**Requirement**: FND-04

**Tools**:

- MCP: NONE
- Skill: NONE

**Done when**:

- [x] `tests/app/fonts.test.ts` written first and seen failing; it asserts on source text because `next/font/google` cannot run under Vitest
- [x] Tests: `fonts.ts` imports from `next/font/google`; declares both CSS variable names; no file under `src/` references `fonts.googleapis.com`
- [x] Gate check passes: `pnpm lint && pnpm typecheck && pnpm test`
- [x] Test count: 3 new tests pass

**Tests**: unit
**Gate**: full

**Commit**: `feat(ui): load Manrope and JetBrains Mono with next/font`

---

### T12: Build site metadata and viewport

**What**: `buildSiteMetadata(content, siteUrl): Metadata` and `siteViewport` per the design: `metadataBase`, title, description, icons (svg, ico 48x48, png 32x32, apple 180x180), Open Graph (website, `pt_BR`, url `siteUrl/`, image 1200×630 with alt), Twitter `summary_large_image`; viewport `themeColor #0B0B10`, `colorScheme dark`.
**Where**: `src/app/site-metadata.ts`
**Depends on**: T5, T6, T8
**Reuses**: `normalizeSiteUrl` (T5), `siteContent` (T6), assets (T8)
**Requirement**: FND-06, FND-07

**Tools**:

- MCP: NONE
- Skill: NONE

**Done when**:

- [x] `tests/app/site-metadata.test.ts` written first and seen failing
- [x] Tests: every OG and Twitter value from the spec; `og:url` ends with `/`; image and `og:url` use the given `siteUrl`; serialized object does not contain `SEU-DOMINIO`; injecting alternate content changes title and OG title; every icon and image path resolves to a file in `public/`
- [x] Gate check passes: `pnpm lint && pnpm typecheck && pnpm test`
- [x] Test count: 12+ new tests pass

**Tests**: unit
**Gate**: full

**Commit**: `feat(seo): build site metadata from content`

---

### T13: Create `HomePlaceholder` view

**What**: Dumb component `HomePlaceholder({ title })` rendering `<main>` with one `<h1>` using token classes (dark background, Manrope).
**Where**: `src/components/HomePlaceholder.tsx`
**Depends on**: T10
**Reuses**: Tokens (T10)
**Requirement**: FND-09

**Tools**:

- MCP: NONE
- Skill: NONE

**Done when**:

- [x] `tests/components/HomePlaceholder.test.tsx` written first and seen failing
- [x] Tests: exactly one `h1` with the given title; `main` landmark present; no hardcoded text (title comes from props)
- [x] Gate check passes: `pnpm lint && pnpm typecheck && pnpm test`
- [x] Test count: 3 new tests pass

**Tests**: unit
**Gate**: full

**Commit**: `feat(ui): add home placeholder view`

---

### T14: Create `NotFoundView` view

**What**: Dumb component `NotFoundView({ title, message, backLabel })` rendering `<main>` with `<h1>`, message and a link to `/`.
**Where**: `src/components/NotFoundView.tsx`
**Depends on**: T10
**Reuses**: Tokens (T10)
**Requirement**: FND-09

**Tools**:

- MCP: NONE
- Skill: NONE

**Done when**:

- [x] `tests/components/NotFoundView.test.tsx` written first and seen failing
- [x] Tests: `h1` shows the title; message shown; link with `href="/"` shows the back label
- [x] Gate check passes: `pnpm lint && pnpm typecheck && pnpm test`
- [x] Test count: 3 new tests pass

**Tests**: unit
**Gate**: full

**Commit**: `feat(ui): add not-found view`

---

### T15: Wire root layout and home page

**What**: `layout.tsx` exports `metadata` (from `buildSiteMetadata` with `normalizeSiteUrl(process.env.NEXT_PUBLIC_SITE_URL)`) and `viewport`, renders `<html lang="pt-BR">` with both font variables and imports `globals.css`. `page.tsx` renders `<HomePlaceholder title={siteContent.name} />`. Add `.env.example` documenting `NEXT_PUBLIC_SITE_URL`. Layout and page ship together because `next build` needs both.
**Where**: `src/app/layout.tsx`
**Depends on**: T11, T12, T13
**Reuses**: T5, T6, T11, T12, T13
**Requirement**: FND-01, FND-06, FND-09

**Tools**:

- MCP: NONE
- Skill: NONE

**Done when**:

- [x] `tests/app/layout.test.tsx` and `tests/app/page.test.tsx` written first and seen failing (fonts mocked with `vi.mock`)
- [x] Tests: `renderToStaticMarkup` of the layout contains `<html lang="pt-BR"` and both font variable classes and the children; exported `metadata` equals `buildSiteMetadata` output; exported `viewport` has theme color `#0B0B10`; page renders one `h1` with the site name
- [x] Gate check passes: `pnpm lint && pnpm typecheck && pnpm test && pnpm build`
- [x] `pnpm start` then `curl -s -o /dev/null -w "%{http_code}" localhost:3000/` returns `200`, and the HTML contains `<html lang="pt-BR"`, `og:title`, `theme-color`
- [x] Test count: 5+ new tests pass

**Tests**: unit
**Gate**: build

**Commit**: `feat(app): wire root layout and home placeholder`

---

### T16: Add not-found page

**What**: `not-found.tsx` renders `<NotFoundView {...siteContent.notFound} />`.
**Where**: `src/app/not-found.tsx`
**Depends on**: T14, T15
**Reuses**: T14, T6
**Requirement**: FND-09, FND-07

**Tools**:

- MCP: NONE
- Skill: NONE

**Done when**:

- [x] `tests/app/not-found.test.tsx` written first and seen failing
- [x] Test: output shows the `notFound` title and a link to `/`
- [x] Gate check passes: `pnpm lint && pnpm typecheck && pnpm test && pnpm build`
- [x] `pnpm start` then `curl` checks: `/nao-existe` → `404`; `/og-image.png` → `200` with `content-type: image/png`; `/favicon.svg` → `200`; `/` → `200`; the page and CSS contain no `fonts.googleapis.com`
- [x] Test count: 2+ new tests pass

**Tests**: unit
**Gate**: build

**Commit**: `feat(app): add PT-BR not-found page`

---

### T17: Guard the folder structure

**What**: Create `src/viewmodels/.gitkeep` and the structure test asserting the six `src/` directories exist and every test file under `tests/` mirrors a `src/` path (infra folders `helpers/`, `lint/` and root-level `*.test.ts` are exempt).
**Where**: `src/viewmodels/.gitkeep`
**Depends on**: T16
**Reuses**: Layout from `design.md`
**Requirement**: FND-02

**Tools**:

- MCP: NONE
- Skill: NONE

**Done when**:

- [ ] `tests/structure.test.ts` written first and seen failing (`src/viewmodels/` missing), then passing
- [ ] Tests: the six directories exist; every mirrored test has a matching source file
- [ ] Gate check passes: `pnpm lint && pnpm typecheck && pnpm test && pnpm build`
- [ ] Test count: 2+ new tests pass

**Tests**: unit
**Gate**: build

**Commit**: `test: guard MVVM folder structure`

---

### T18: Record scripts and content rule in `CLAUDE.md`

**What**: Replace the "record here once the app is scaffolded" note with the real scripts (`dev`, `build`, `start`, `lint`, `typecheck`, `test`), the `NEXT_PUBLIC_SITE_URL` variable, and the review rule that components hold no hardcoded PT-BR strings.
**Where**: `CLAUDE.md`
**Depends on**: T17
**Reuses**: Scripts from T1
**Requirement**: FND-08

**Tools**:

- MCP: NONE
- Skill: NONE

**Done when**:

- [ ] Every script named in `CLAUDE.md` exists in `package.json`
- [ ] Full build gate passes: `pnpm lint && pnpm typecheck && pnpm test && pnpm build`
- [ ] Test count: all earlier tests still pass (no silent deletions)

**Tests**: none (docs; per the matrix)
**Gate**: build

**Commit**: `docs: record scripts and content rule in CLAUDE.md`

---

## Phase Execution Map

```
Phase 1 → Phase 2 → Phase 3 → Phase 4
```

Execution is strictly sequential, in task-number order. 18 tasks pack into 3 batches at the Execute step (Phases 1+2 = 8 tasks, Phase 3 = 8 tasks, Phase 4 = 2 tasks).

---

## Diagram-Definition Cross-Check

| Task | Depends On (task body) | Diagram Shows | Status |
| ---- | ---------------------- | ------------- | ------ |
| T1 | None | none | ✅ Match |
| T2 | T1 | T1 → T2 | ✅ Match |
| T3 | T2 | T2 → T3 | ✅ Match |
| T4 | T3 | T3 → T4 | ✅ Match |
| T5 | T3 | T3 → T5 | ✅ Match |
| T6 | T3 | T3 → T6 | ✅ Match |
| T7 | T3 | T3 → T7 | ✅ Match |
| T8 | T3 | T3 → T8 | ✅ Match |
| T9 | T3 | T3 → T9 | ✅ Match |
| T10 | T7, T9 | T7 → T10, T9 → T10 | ✅ Match |
| T11 | T10 | T10 → T11 | ✅ Match |
| T12 | T5, T6, T8 | T5, T6, T8 → T12 | ✅ Match |
| T13 | T10 | T10 → T13 | ✅ Match |
| T14 | T10 | T10 → T14 | ✅ Match |
| T15 | T11, T12, T13 | T11, T12, T13 → T15 | ✅ Match |
| T16 | T14, T15 | T14 → T16, T15 → T16 | ✅ Match |
| T17 | T16 | T16 → T17 | ✅ Match |
| T18 | T17 | T17 → T18 | ✅ Match |

## Test Co-location Validation

| Task | Code Layer Created/Modified | Matrix Requires | Task Says | Status |
| ---- | --------------------------- | --------------- | --------- | ------ |
| T1 | Tooling config (package.json) | unit | unit | ✅ OK |
| T2 | Tooling config (tsconfig) | unit | unit | ✅ OK |
| T3 | Config only (vitest) | none | none | ✅ OK |
| T4 | Tooling config (ESLint) | unit | unit | ✅ OK |
| T5 | Services | unit | unit | ✅ OK |
| T6 | Models / Content | unit | unit | ✅ OK |
| T7 | Test helper | unit | unit | ✅ OK |
| T8 | Static assets | unit | unit | ✅ OK |
| T9 | Config only (postcss) | none | none | ✅ OK |
| T10 | Styles / tokens | unit | unit | ✅ OK |
| T11 | App wiring (fonts) | unit | unit | ✅ OK |
| T12 | App wiring (metadata) | unit | unit | ✅ OK |
| T13 | Views | unit | unit | ✅ OK |
| T14 | Views | unit | unit | ✅ OK |
| T15 | App wiring | unit | unit | ✅ OK |
| T16 | App wiring | unit | unit | ✅ OK |
| T17 | Structure guard | unit | unit | ✅ OK |
| T18 | Docs only | none | none | ✅ OK |
