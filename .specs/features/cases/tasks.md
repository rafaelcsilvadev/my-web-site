# Cases Tasks

## Execution Protocol (MANDATORY -- do not skip)

Implement these tasks with the `tlc-spec-driven` skill: **activate it by name and follow its Execute flow and Critical Rules.** Do not search for skill files by filesystem path. The skill is the source of truth for the full flow (per-task cycle, sub-agent delegation, adequacy review, Verifier, discrimination sensor).

**If the skill cannot be activated, STOP and tell the user - do not proceed without it.**

---

**Spec**: `.specs/features/cases/spec.md`
**Design**: none (skipped; decisions are inline in "Design Notes" below)
**Status**: Draft

---

## Design Notes (inline, replaces design.md)

- **Model** `src/models/case-content.ts`: `CaseContent { slug, metadata{title,description}, backLink: Link, eyebrow, title, intro, heroActions: CaseAction[], facts: Fact[], sections: CaseSection[], stack: CaseStack, closing: CaseClosing }`.
  - `CaseAction { link: Link, variant: "primary" | "ghost", icon?: IconName, download?: boolean }` (same props `ButtonLink` takes).
  - `CaseSection { id, number, title, layout: "split" | "stacked", intro?, blocks: CaseBlock[] }`.
  - `CaseBlock` is a discriminated union on `kind`: `paragraphs {items}`, `callout {label, items}`, `metrics {items: Metric[]}`, `cards {items: {label, text}[]}`, `steps {items: {number, title, caption, highlight?}[]}`, `highlights {items: {title, text}[]}`, `figure {src, width, height, alt, caption}`.
  - `CaseStack { label, groups: {label?, chips, mainChips}[], note? }`, `CaseClosing { eyebrow, title, text, actions: CaseAction[] }`.
  - `Fact`/`Metric` reuse `Metric` from `src/models/home-content.ts`.
- **Content**: one file per case under `src/content/`, a registry `src/content/cases.ts` (array + `caseSlugs`), and the case header/footer chrome in `src/content/case-chrome.ts`.
- **ViewModel** `src/viewmodels/case-view-model.ts`: `findCase(cases, slug)` and `hasItems` reuse; `navHref(link)` and `brandHref(chrome)` go in `src/viewmodels/home-view-model.ts` (shared by Home and cases).
- **Header reuse**: nav link gets optional `href` (wins over `#sectionId`) and chrome gets optional `brandHref`; Home content is unchanged, so Home tests stay green.
- **Views** in `src/components/Case*.tsx`, composed by `CaseView`; sections render blocks through a `kind` switch inside `CaseSection`-level view code, never in JSX logic of leaf components.
- **Route** `src/app/casos/[slug]/page.tsx`: `generateStaticParams` from `caseSlugs`, `notFound()` for unknown slug, `generateMetadata` through `src/app/casos/case-metadata.ts`.
- **Copy**: extracted from the four case boards in `ui/Site vitrine pessoal-png/`; `[conferir ...]` marker never copied (spec assumption).

---

## Test Coverage Matrix

> Generated from project guidelines and existing tests - confirm before Execute. Guidelines found: `CLAUDE.md` (Vitest + Testing Library, `tests/` mirrors `src/`, see red first, tests in the same commit, no PT-BR in components), `vitest.config.ts`, `tests/structure.test.ts` (mirror guard), `eslint.config.mjs` (AD-002), `.specs/STATE.md` (AD-001, AD-002). Existing samples: `tests/content/home.test.ts`, `tests/components/StackSection.test.tsx`, `tests/components/HomeView.test.tsx`, `tests/app/page.test.tsx`, `tests/app/public-assets.test.ts`, `tests/app/site-metadata.test.ts`.

| Code Layer | Required Test Type | Coverage Expectation | Location Pattern | Run Command |
| ---------- | ------------------ | -------------------- | ---------------- | ----------- |
| Content (`src/content/*case*.ts`, `cases.ts`, `case-chrome.ts`) | unit | Every string, link and list the spec names, asserted verbatim; no `[conferir` placeholder | `tests/content/*.test.ts` | `pnpm test` |
| Models (`src/models`) | none | Types only; checked by `pnpm typecheck` and by the content tests that satisfy them | - | build gate only |
| ViewModels (`src/viewmodels`) | unit | All branches; 1:1 to spec ACs; every listed edge case (unknown slug, missing `href`, empty list) | `tests/viewmodels/*.test.ts` | `pnpm test` |
| Views (`src/components`) | unit | Render with props: one assertion per spec outcome (text, role, href, `rel`, `target`, aria attributes, heading level); empty list renders no container; source scan proves no PT-BR literal | `tests/components/*.test.tsx` | `pnpm test` |
| App wiring (`src/app/casos`) | unit | `generateStaticParams`, `notFound` for unknown slug, `generateMetadata` per slug; rendered page shows the case | `tests/app/casos/*.test.ts(x)` | `pnpm test` |
| Static assets (`public/`) | unit | File exists, PNG signature and size 1797x915, allow-list updated | `tests/app/public-assets.test.ts` | `pnpm test` |

## Gate Check Commands

> Generated from `package.json` scripts - confirm before Execute.

| Gate Level | When to Use | Command |
| ---------- | ----------- | ------- |
| Quick | Tasks with unit tests only | `pnpm test` |
| Full | Tasks that touch types, lint-sensitive code or `src/app` | `pnpm lint && pnpm typecheck && pnpm test` |
| Build | Phase completion and the assembly tasks | `pnpm lint && pnpm typecheck && pnpm test && pnpm build` |

Every task starts with its test written and seen failing for the right reason (project rule "see red first"), then the code that turns it green. Tasks with `Tests: none` have no test to fail first; the Full gate is their proof.

---

## Execution Plan

Phases are ordered and run sequentially - each phase completes before the next begins, and tasks within a phase execute in order.

### Phase 1: Model, content and assets

```
T1 → T3
T3 → T5
T1 → T4
T2 → T4
T4 → T5
T1 → T6
```

### Phase 2: Header and footer reuse

```
T1 → T7 → T8 → T9
T7 → T10
```

### Phase 3: Page blocks

```
T1 → T11
T1 → T12
T1 → T13
T1 → T14
T1 → T15
T1 → T16
T1 → T17
T1 → T18
```

### Phase 4: Evidence and closing blocks

```
T1 → T19
T1 → T20
T1 → T21
T1 → T22
```

### Phase 5: Assembly and route

```
T6 → T23
T9 → T23
T10 → T23
T11 → T23
T12 → T23
T13 → T23
T14 → T23
T15 → T23
T16 → T23
T17 → T23
T18 → T23
T19 → T23
T20 → T23
T21 → T23
T22 → T23
T5 → T24
T23 → T25
T24 → T25
```

---

## Task Breakdown

### T1: Define case content model

**What**: Types for the case content as in the Design Notes (`CaseContent`, `CaseSection`, `CaseBlock` union, `CaseAction`, `CaseStack`, `CaseClosing`).
**Where**: `src/models/case-content.ts`
**Depends on**: None
**Reuses**: `Link`, `Metric` from `src/models/home-content.ts`; `IconName` type name from `src/components/Icon.tsx` is NOT imported (models stay React-free), so `icon` is a string union copied from the icons used (`arrow`, `download`, `github`).
**Requirement**: CASE-01, CASE-02, CASE-04

**Tools**:

- MCP: `codegraph`
- Skill: NONE

**Done when**:

- [x] File exports every type in the Design Notes and imports nothing from React/Next (ESLint boundary passes)
- [x] Gate check passes: `pnpm lint && pnpm typecheck && pnpm test`
- [x] Test count: same as before (no tests added or removed)

**Tests**: none
**Gate**: full

**Commit**: `feat(cases): add case content model`

---

### T2: Add Trello board screenshot asset

**What**: Copy the board screenshot to `public/` and extend the asset allow-list test.
**Where**: `public/my-trello-version-board.png`
**Depends on**: None
**Reuses**: `tests/app/public-assets.test.ts` (PNG signature and size helpers, allow-list)
**Requirement**: CASE-07

**Tools**:

- MCP: NONE
- Skill: NONE

**Done when**:

- [ ] Test added first in `tests/app/public-assets.test.ts` and seen failing (file missing, allow-list rejects nothing yet)
- [ ] `public/my-trello-version-board.png` is a PNG, 1797 x 915, copied from `ui/images/Screenshot from 2026-11-05 19-38-39.png`
- [ ] The "no image besides the expected ones" test lists the new file
- [ ] Gate check passes: `pnpm test`
- [ ] Test count: previous count + at least 2 tests, none removed

**Tests**: unit
**Gate**: quick

**Commit**: `feat(cases): add My Trello Version board screenshot`

---

### T3: Add Avaria case content

**What**: PT-BR content for the Avaria page, copied from the board (spec P1 story 1, ACs 1-7).
**Where**: `src/content/avaria-case.ts`
**Depends on**: T1
**Reuses**: `src/content/home.ts` structure and tag/metric wording
**Requirement**: CASE-01, CASE-02, CASE-03, CASE-04

**Tools**:

- MCP: NONE
- Skill: NONE

**Done when**:

- [ ] `tests/content/avaria-case.test.ts` written first and seen failing (module missing)
- [ ] Test asserts verbatim: eyebrow, title, intro, three facts, sections 01 Problema / 02 Decisão / 03 Resultado with their paragraphs, the "Por que AdonisJS" callout and its two reasons, three metrics, four stack chips, and the closing "Próximo caso" card with its three actions and hrefs
- [ ] Test asserts section ids are unique, `href`s are `/`, `/casos/my-trello-version`, `/#contato`, `/cv-rafael-couto-silva.pdf`, and `[conferir` appears nowhere
- [ ] Gate check passes: `pnpm lint && pnpm typecheck && pnpm test`
- [ ] Test count: previous count + at least 6 tests

**Tests**: unit
**Gate**: full

**Commit**: `feat(cases): add Avaria case content`

---

### T4: Add My Trello Version case content

**What**: PT-BR content for the My Trello Version page (spec P1 story 2, ACs 1-10).
**Where**: `src/content/my-trello-version-case.ts`
**Depends on**: T1, T2
**Reuses**: `src/content/home.ts` (repo URL), `src/content/avaria-case.ts` (shape)
**Requirement**: CASE-05, CASE-06, CASE-07, CASE-08

**Tools**:

- MCP: NONE
- Skill: NONE

**Done when**:

- [ ] `tests/content/my-trello-version-case.test.ts` written first and seen failing (module missing)
- [ ] Test asserts verbatim: eyebrow, title, intro, hero actions (GitHub external link, Contato), section 01 Objetivo blocks (A dor, lead-in, Construir, Mostrar), section 02 Processo intro and six steps in order with step 04 highlighted, section 03 Evidências (four metrics, four highlights, figure with src `/my-trello-version-board.png`, 1797x915, alt and caption), four stack groups with main chips, the status note, and the "Código aberto" closing card with three actions
- [ ] Test asserts the GitHub links are external with the repo URL and that `[conferir` appears nowhere
- [ ] Gate check passes: `pnpm lint && pnpm typecheck && pnpm test`
- [ ] Test count: previous count + at least 7 tests

**Tests**: unit
**Gate**: full

**Commit**: `feat(cases): add My Trello Version case content`

---

### T5: Add case registry

**What**: Registry exposing `cases` and `caseSlugs`, with each case's page metadata.
**Where**: `src/content/cases.ts`
**Depends on**: T3, T4
**Reuses**: `src/content/avaria-case.ts`, `src/content/my-trello-version-case.ts`
**Requirement**: CASE-09, CASE-12

**Tools**:

- MCP: NONE
- Skill: NONE

**Done when**:

- [ ] `tests/content/cases.test.ts` written first and seen failing (module missing)
- [ ] Test asserts `caseSlugs` equals `["avaria", "my-trello-version"]`, slugs are unique, and every `/casos/<slug>` link used inside the cases points to a registered slug
- [ ] Test asserts titles "Avaria · Rafael Couto Silva" and "My Trello Version · Rafael Couto Silva" and a non-empty description for each
- [ ] Gate check passes: `pnpm lint && pnpm typecheck && pnpm test`
- [ ] Test count: previous count + at least 3 tests

**Tests**: unit
**Gate**: full

**Commit**: `feat(cases): add case registry and page metadata`

---

### T6: Add case view model

**What**: `findCase(cases, slug)` returning the entry or `undefined`.
**Where**: `src/viewmodels/case-view-model.ts`
**Depends on**: T1
**Reuses**: `hasItems` in `src/viewmodels/home-view-model.ts`
**Requirement**: CASE-09

**Tools**:

- MCP: NONE
- Skill: NONE

**Done when**:

- [ ] `tests/viewmodels/case-view-model.test.ts` written first and seen failing (module missing)
- [ ] Test covers a known slug, an unknown slug, an empty string and a different-case slug (`AVARIA`) returning `undefined`
- [ ] Gate check passes: `pnpm test`
- [ ] Test count: previous count + at least 3 tests

**Tests**: unit
**Gate**: quick

**Commit**: `feat(cases): add case lookup view model`

---

### T7: Allow nav links with explicit href and a brand href

**What**: Make `sectionId` optional and add optional `href` on nav links, and optional `brandHref` on chrome.
**Where**: `src/models/home-content.ts` (modify)
**Depends on**: T1
**Reuses**: Existing `HomeContent["chrome"]` type
**Requirement**: CASE-10

**Tools**:

- MCP: `codegraph`
- Skill: NONE

**Done when**:

- [ ] Types updated; Home content compiles unchanged
- [ ] `splitNavLinks` still type-checks (it filters on `sectionId`)
- [ ] Gate check passes: `pnpm lint && pnpm typecheck && pnpm test`
- [ ] Test count: same as before (no tests added or removed)

**Tests**: none
**Gate**: full

**Commit**: `refactor(home): allow explicit href on nav links`

---

### T8: Add nav href helpers

**What**: `navHref(link)` (explicit `href`, else `#sectionId`) and `brandHref(chrome)` (explicit `brandHref`, else `#topId`).
**Where**: `src/viewmodels/home-view-model.ts` (modify)
**Depends on**: T7
**Reuses**: `splitNavLinks` in the same file
**Requirement**: CASE-10

**Tools**:

- MCP: NONE
- Skill: NONE

**Done when**:

- [ ] Tests added first to `tests/viewmodels/home-view-model.test.ts` and seen failing (functions missing)
- [ ] Tests cover: link with `href`, link with only `sectionId`, chrome with `brandHref`, chrome without it
- [ ] Gate check passes: `pnpm test`
- [ ] Test count: previous count + at least 4 tests, none removed

**Tests**: unit
**Gate**: quick

**Commit**: `feat(home): add nav href view model helpers`

---

### T9: Use href helpers in the header

**What**: `SiteHeader` builds desktop, mobile and brand links through `navHref` and `brandHref`.
**Where**: `src/components/SiteHeader.tsx` (modify)
**Depends on**: T8
**Reuses**: `useMobileMenu`, existing header markup
**Requirement**: CASE-10

**Tools**:

- MCP: NONE
- Skill: NONE

**Done when**:

- [ ] Tests added first to `tests/components/SiteHeader.test.tsx` and seen failing (explicit hrefs ignored)
- [ ] Tests cover a nav with `Início` (`/`), `/#projetos`, `/#contato` CTA and `brandHref` `/`, in the desktop nav, the mobile menu and the brand link; existing Home tests unchanged and green
- [ ] Gate check passes: `pnpm lint && pnpm typecheck && pnpm test`
- [ ] Test count: previous count + at least 3 tests, none removed

**Tests**: unit
**Gate**: full

**Commit**: `feat(home): let the header take explicit link targets`

---

### T10: Add case chrome content

**What**: Header nav and footer content for case pages (Início, Projetos, Experiência, Stack, Método, Contato CTA; footer with `#top`).
**Where**: `src/content/case-chrome.ts`
**Depends on**: T7
**Reuses**: `chrome` in `src/content/home.ts` (skip link, menu labels, footer text)
**Requirement**: CASE-10

**Tools**:

- MCP: NONE
- Skill: NONE

**Done when**:

- [ ] `tests/content/case-chrome.test.ts` written first and seen failing (module missing)
- [ ] Test asserts hrefs `/`, `/#projetos`, `/#experiencia`, `/#stack`, `/#metodo`, CTA `/#contato`, `brandHref` `/`, footer "© 2026 Rafael Couto Silva" and "Voltar ao topo" to `#top`
- [ ] Gate check passes: `pnpm lint && pnpm typecheck && pnpm test`
- [ ] Test count: previous count + at least 3 tests

**Tests**: unit
**Gate**: full

**Commit**: `feat(cases): add case header and footer content`

---

### T11: Create BackLink component

**What**: "Voltar para o início" link with the left arrow icon.
**Where**: `src/components/BackLink.tsx`
**Depends on**: T1
**Reuses**: `Icon` (`arrow`), `NotFoundView` link styling
**Requirement**: CASE-10

**Tools**:

- MCP: NONE
- Skill: NONE

**Done when**:

- [ ] `tests/components/BackLink.test.tsx` written first and seen failing (file missing)
- [ ] Test asserts the link name, `href` `/` and an `aria-hidden` icon
- [ ] Gate check passes: `pnpm test`
- [ ] Test count: previous count + at least 2 tests

**Tests**: unit
**Gate**: quick

**Commit**: `feat(cases): add back link component`

---

### T12: Create CaseHero component

**What**: Eyebrow, `h1` title, intro and the optional action buttons.
**Where**: `src/components/CaseHero.tsx`
**Depends on**: T1
**Reuses**: `ButtonLink`, `Hero` typography
**Requirement**: CASE-01, CASE-05

**Tools**:

- MCP: NONE
- Skill: NONE

**Done when**:

- [ ] `tests/components/CaseHero.test.tsx` written first and seen failing (file missing)
- [ ] Test asserts the eyebrow, one `h1` with the title, the intro, buttons with `href`, `rel="noopener noreferrer"` and `target="_blank"` on the external one
- [ ] Test asserts no actions container renders when `actions` is empty
- [ ] Gate check passes: `pnpm test`
- [ ] Test count: previous count + at least 4 tests

**Tests**: unit
**Gate**: quick

**Commit**: `feat(cases): add case hero component`

---

### T13: Create CaseFacts component

**What**: Facts bar rendered as a description list (Empresa, Papel, Estado).
**Where**: `src/components/CaseFacts.tsx`
**Depends on**: T1
**Reuses**: Card border/background tokens from `ProjectCard`
**Requirement**: CASE-01, CASE-11

**Tools**:

- MCP: NONE
- Skill: NONE

**Done when**:

- [ ] `tests/components/CaseFacts.test.tsx` written first and seen failing (file missing)
- [ ] Test asserts each label/value pair through `dt`/`dd` and that nothing renders when the list is empty
- [ ] Gate check passes: `pnpm test`
- [ ] Test count: previous count + at least 2 tests

**Tests**: unit
**Gate**: quick

**Commit**: `feat(cases): add case facts component`

---

### T14: Create CaseSection component

**What**: Numbered section wrapper: number badge (`aria-hidden`), `h2`, optional intro, and a `children` slot, in `split` (two columns on desktop) or `stacked` layout.
**Where**: `src/components/CaseSection.tsx`
**Depends on**: T1
**Reuses**: `SectionHeading` scroll margin and spacing
**Requirement**: CASE-02, CASE-11

**Tools**:

- MCP: NONE
- Skill: NONE

**Done when**:

- [ ] `tests/components/CaseSection.test.tsx` written first and seen failing (file missing)
- [ ] Test asserts a `section` labelled by its `h2` through `aria-labelledby`, the number badge with `aria-hidden="true"`, the optional intro, children rendered, and a layout class difference between `split` and `stacked`
- [ ] Gate check passes: `pnpm test`
- [ ] Test count: previous count + at least 4 tests

**Tests**: unit
**Gate**: quick

**Commit**: `feat(cases): add case section component`

---

### T15: Create CaseCallout component

**What**: Callout with a mono label and a list of reasons separated by a divider.
**Where**: `src/components/CaseCallout.tsx`
**Depends on**: T1
**Reuses**: Card tokens
**Requirement**: CASE-02

**Tools**:

- MCP: NONE
- Skill: NONE

**Done when**:

- [ ] `tests/components/CaseCallout.test.tsx` written first and seen failing (file missing)
- [ ] Test asserts the label, each reason as a list item, and that nothing renders when the reasons list is empty
- [ ] Gate check passes: `pnpm test`
- [ ] Test count: previous count + at least 3 tests

**Tests**: unit
**Gate**: quick

**Commit**: `feat(cases): add case callout component`

---

### T16: Create CaseMetrics component

**What**: Grid of metric cards (mono value, muted label) as a list.
**Where**: `src/components/CaseMetrics.tsx`
**Depends on**: T1
**Reuses**: Number-style metric markup from `ProjectCard`
**Requirement**: CASE-02, CASE-06

**Tools**:

- MCP: NONE
- Skill: NONE

**Done when**:

- [ ] `tests/components/CaseMetrics.test.tsx` written first and seen failing (file missing)
- [ ] Test asserts every value/label pair and that nothing renders when the list is empty
- [ ] Gate check passes: `pnpm test`
- [ ] Test count: previous count + at least 2 tests

**Tests**: unit
**Gate**: quick

**Commit**: `feat(cases): add case metrics component`

---

### T17: Create CaseCardList component

**What**: Cards with a mono label and text ("A dor", "Construir", "Mostrar").
**Where**: `src/components/CaseCardList.tsx`
**Depends on**: T1
**Reuses**: Card tokens
**Requirement**: CASE-06

**Tools**:

- MCP: NONE
- Skill: NONE

**Done when**:

- [ ] `tests/components/CaseCardList.test.tsx` written first and seen failing (file missing)
- [ ] Test asserts each label and text and that nothing renders when the list is empty
- [ ] Gate check passes: `pnpm test`
- [ ] Test count: previous count + at least 2 tests

**Tests**: unit
**Gate**: quick

**Commit**: `feat(cases): add case card list component`

---

### T18: Create CaseSteps component

**What**: Ordered grid of process steps (number, title, caption) with an optional highlighted step.
**Where**: `src/components/CaseSteps.tsx`
**Depends on**: T1
**Reuses**: `MethodStep` highlight classes
**Requirement**: CASE-06

**Tools**:

- MCP: NONE
- Skill: NONE

**Done when**:

- [ ] `tests/components/CaseSteps.test.tsx` written first and seen failing (file missing)
- [ ] Test asserts an ordered list with six items in order, number text, title and caption, the highlight class only on the step marked `highlight`, and no container when empty
- [ ] Gate check passes: `pnpm test`
- [ ] Test count: previous count + at least 3 tests

**Tests**: unit
**Gate**: quick

**Commit**: `feat(cases): add case steps component`

---

### T19: Create CaseHighlights component

**What**: Cards with a bold title and a muted description.
**Where**: `src/components/CaseHighlights.tsx`
**Depends on**: T1
**Reuses**: Card tokens, `StackSection` list styling
**Requirement**: CASE-06

**Tools**:

- MCP: NONE
- Skill: NONE

**Done when**:

- [ ] `tests/components/CaseHighlights.test.tsx` written first and seen failing (file missing)
- [ ] Test asserts each title and text and that nothing renders when the list is empty
- [ ] Gate check passes: `pnpm test`
- [ ] Test count: previous count + at least 2 tests

**Tests**: unit
**Gate**: quick

**Commit**: `feat(cases): add case highlights component`

---

### T20: Create CaseFigure component

**What**: Board screenshot through `next/image` with explicit size and a `figcaption`.
**Where**: `src/components/CaseFigure.tsx`
**Depends on**: T1
**Reuses**: `Hero` portrait `next/image` usage
**Requirement**: CASE-07

**Tools**:

- MCP: NONE
- Skill: NONE

**Done when**:

- [ ] `tests/components/CaseFigure.test.tsx` written first and seen failing (file missing)
- [ ] Test asserts the `img` alt, `width` 1797, `height` 915, a `figure` with the caption in a `figcaption`
- [ ] Gate check passes: `pnpm lint && pnpm typecheck && pnpm test`
- [ ] Test count: previous count + at least 3 tests

**Tests**: unit
**Gate**: full

**Commit**: `feat(cases): add case figure component`

---

### T21: Create CaseStack component

**What**: Stack block with its label, labeled or unlabeled chip groups, main chips marked, and an optional status note.
**Where**: `src/components/CaseStack.tsx`
**Depends on**: T1
**Reuses**: `Chip`
**Requirement**: CASE-02, CASE-08

**Tools**:

- MCP: NONE
- Skill: NONE

**Done when**:

- [ ] `tests/components/CaseStack.test.tsx` written first and seen failing (file missing)
- [ ] Test asserts the label, a group label per labeled group, every chip, main chips marked, the note when present, and no empty group container
- [ ] Gate check passes: `pnpm test`
- [ ] Test count: previous count + at least 4 tests

**Tests**: unit
**Gate**: quick

**Commit**: `feat(cases): add case stack component`

---

### T22: Create CaseClosing component

**What**: Closing card with eyebrow, title, text and action buttons.
**Where**: `src/components/CaseClosing.tsx`
**Depends on**: T1
**Reuses**: `ButtonLink`
**Requirement**: CASE-03, CASE-08

**Tools**:

- MCP: NONE
- Skill: NONE

**Done when**:

- [ ] `tests/components/CaseClosing.test.tsx` written first and seen failing (file missing)
- [ ] Test asserts eyebrow, title, text, each action `href`, `download` on the CV action, `target="_blank"` and `rel` on the external one, and no actions container when empty
- [ ] Gate check passes: `pnpm test`
- [ ] Test count: previous count + at least 4 tests

**Tests**: unit
**Gate**: quick

**Commit**: `feat(cases): add case closing component`

---

### T23: Create CaseView component

**What**: Page composition: skip link, header, main (back link, hero, facts, sections with their blocks, stack, closing) and footer, for any `CaseContent`.
**Where**: `src/components/CaseView.tsx`
**Depends on**: T6, T9, T10, T11, T12, T13, T14, T15, T16, T17, T18, T19, T20, T21, T22
**Reuses**: `HomeView`, `SkipLink`, `SiteHeader`, `SiteFooter`
**Requirement**: CASE-01, CASE-02, CASE-03, CASE-04, CASE-05, CASE-06, CASE-07, CASE-08, CASE-11

**Tools**:

- MCP: `codegraph`
- Skill: NONE

**Done when**:

- [ ] `tests/components/CaseView.test.tsx` written first and seen failing (file missing)
- [ ] Test renders both real cases and asserts: one `h1`, the numbered `h2` sections in order (three per case), every block kind renders, `[conferir` absent, skip link is the first focusable element and targets `main`, the page root has id `top`, header hrefs come from the case chrome
- [ ] Test asserts a source scan: no PT-BR literal in `src/components/Case*.tsx` and `src/components/BackLink.tsx` (same technique as `tests/components/HomeView.test.tsx`)
- [ ] Gate check passes: `pnpm lint && pnpm typecheck && pnpm test`
- [ ] Test count: previous count + at least 6 tests

**Tests**: unit
**Gate**: full

**Commit**: `feat(cases): compose the case view`

---

### T24: Add case metadata builder

**What**: `buildCaseMetadata(entry, siteUrl)` returning title, description, canonical-style Open Graph URL for the case path and the shared OG image.
**Where**: `src/app/casos/case-metadata.ts`
**Depends on**: T5
**Reuses**: `src/app/site-metadata.ts` (OG image constants)
**Requirement**: CASE-12

**Tools**:

- MCP: NONE
- Skill: NONE

**Done when**:

- [ ] `tests/app/casos/case-metadata.test.ts` written first and seen failing (module missing)
- [ ] Test asserts, for each real case, the title, the description, the Open Graph `url` `<site>/casos/<slug>` and the `/og-image.png` image
- [ ] Gate check passes: `pnpm lint && pnpm typecheck && pnpm test`
- [ ] Test count: previous count + at least 4 tests

**Tests**: unit
**Gate**: full

**Commit**: `feat(cases): add per-case page metadata`

---

### T25: Add the case route

**What**: Route `/casos/[slug]` with `generateStaticParams`, `notFound()` for unknown slugs and `generateMetadata`.
**Where**: `src/app/casos/[slug]/page.tsx`
**Depends on**: T23, T24
**Reuses**: `src/app/page.tsx`, `src/app/not-found.tsx`
**Requirement**: CASE-09, CASE-10, CASE-12

**Tools**:

- MCP: `codegraph`
- Skill: NONE

**Done when**:

- [ ] `tests/app/casos/page.test.tsx` written first and seen failing (module missing)
- [ ] Test asserts `generateStaticParams` returns both slugs, the page for `avaria` and for `my-trello-version` renders their `h1`, an unknown slug calls `notFound`, and `generateMetadata` returns the metadata for each slug
- [ ] Gate check passes: `pnpm lint && pnpm typecheck && pnpm test && pnpm build`
- [ ] `pnpm build` lists `/casos/avaria` and `/casos/my-trello-version` as statically generated
- [ ] Test count: previous count + at least 5 tests

**Tests**: unit
**Gate**: build

**Commit**: `feat(cases): add case pages route`

---

## Phase Execution Map

Phase 1 → Phase 2 → Phase 3 → Phase 4 → Phase 5 (arrows per task are in each phase's diagram above).

Execution is strictly sequential, in task-number order. 25 tasks: at Execute the skill packs whole phases into ~7-task batches (here P1+P2 = 10, P3 = 8, P4+P5 = 7 → 3 batches) and offers sub-agents before starting.

---

## Task Granularity Check

| Task | Scope | Status |
| ---- | ----- | ------ |
| T1 | 1 model file | ✅ Granular |
| T2 | 1 asset + its allow-list test | ✅ Granular |
| T3, T4 | 1 content file each | ✅ Granular |
| T5 | 1 registry file | ✅ Granular |
| T6 | 1 view model, 1 function | ✅ Granular |
| T7 | 1 model file, type-only edit | ✅ Granular |
| T8 | 2 cohesive helpers in one file | ✅ Granular |
| T9 | 1 component edit | ✅ Granular |
| T10 | 1 content file | ✅ Granular |
| T11-T22 | 1 component each | ✅ Granular |
| T23 | 1 composing component | ✅ Granular |
| T24 | 1 function | ✅ Granular |
| T25 | 1 route file | ✅ Granular |

## Diagram-Definition Cross-Check

| Task | Depends On (task body) | Diagram Shows | Status |
| ---- | ---------------------- | ------------- | ------ |
| T1, T2 | None | root | ✅ Match |
| T7 | T1 | T1 → T7 | ✅ Match |
| T3 | T1 | T1 → T3 | ✅ Match |
| T4 | T1, T2 | T1 → T4, T2 → T4 | ✅ Match |
| T5 | T3, T4 | T3 → T5, T4 → T5 | ✅ Match |
| T6 | T1 | T1 → T6 | ✅ Match |
| T8 | T7 | T7 → T8 | ✅ Match |
| T9 | T8 | T8 → T9 | ✅ Match |
| T10 | T7 | T7 → T10 | ✅ Match |
| T11-T22 | T1 (earlier phase) | T1 → each task | ✅ Match |
| T23 | T6, T9-T22 (earlier phases) | each → T23, T23 → T25 | ✅ Match |
| T24 | T5 (earlier phase) | T5 → T24, T24 → T25 | ✅ Match |
| T25 | T23, T24 | T23 → T25, T24 → T25 | ✅ Match |

## Test Co-location Validation

| Task | Code Layer Created/Modified | Matrix Requires | Task Says | Status |
| ---- | --------------------------- | --------------- | --------- | ------ |
| T1 | Models | none | none | ✅ OK |
| T2 | Static assets | unit | unit | ✅ OK |
| T3, T4, T5, T10 | Content | unit | unit | ✅ OK |
| T6, T8 | ViewModels | unit | unit | ✅ OK |
| T7 | Models | none | none | ✅ OK |
| T9, T11-T23 | Views | unit | unit | ✅ OK |
| T24, T25 | App wiring | unit | unit | ✅ OK |
