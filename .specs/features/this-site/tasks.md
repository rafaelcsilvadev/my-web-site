# This Site Tasks

## Execution Protocol (MANDATORY -- do not skip)

Implement these tasks with the `tlc-spec-driven` skill: **activate it by name and follow its Execute flow and Critical Rules.** Do not search for skill files by filesystem path. The skill is the source of truth for the full flow (per-task cycle, sub-agent delegation, adequacy review, Verifier, discrimination sensor).

**If the skill cannot be activated, STOP and tell the user - do not proceed without it.**

---

**Design**: `.specs/features/this-site/design.md`
**Status**: Draft

---

## Test Coverage Matrix

> Generated from project guidelines and existing tests - confirm before Execute. Guidelines found: `CLAUDE.md` (Vitest + Testing Library, `tests/` mirrors `src/`, see red first, tests in the same commit, no PT-BR in components), `vitest.config.ts`, `tests/structure.test.ts` (mirror guard), `eslint.config.mjs` (AD-002), `.specs/STATE.md` (AD-001, AD-002). Existing samples: `tests/components/ProjectCard.test.tsx`, `tests/components/CaseClosing.test.tsx`, `tests/components/CaseView.test.tsx`, `tests/content/my-trello-version-case.test.ts`, `tests/content/cases.test.ts`, `tests/app/public-assets.test.ts`.

| Code Layer | Required Test Type | Coverage Expectation | Location Pattern | Run Command |
| ---------- | ------------------ | -------------------- | ---------------- | ----------- |
| Content (`src/content/*`) | unit | Every string, link and list the spec names, asserted verbatim; no `[conferir` | `tests/content/*.test.ts` | `pnpm test` |
| Models (`src/models`) | none | Types only; checked by `pnpm typecheck` and by the tests of the first consumer | - | build gate only |
| ViewModels (`src/viewmodels`) | unit | All branches; every listed edge case (no backtick, unmatched backtick, empty text) | `tests/viewmodels/*.test.ts` | `pnpm test` |
| Views (`src/components`) | unit | One assertion per spec outcome (text, role, href, heading level, `aria-*`, layout class); empty list renders no container; existing tests of the same component stay unchanged and green | `tests/components/*.test.tsx` | `pnpm test` |
| App wiring (`src/app/casos`) | unit | `generateStaticParams` and `generateMetadata` include the new slug; sitemap lists it | `tests/app/**/*.test.ts(x)` | `pnpm test` |
| Static assets (`public/`) | unit | File exists, PNG signature, size 1679x1127, allow-list updated | `tests/app/public-assets.test.ts` | `pnpm test` |

## Gate Check Commands

> Generated from `package.json` scripts - confirm before Execute.

| Gate Level | When to Use | Command |
| ---------- | ----------- | ------- |
| Quick | Tasks with unit tests only | `pnpm test` |
| Full | Tasks that touch types, lint-sensitive code or `src/app` | `pnpm lint && pnpm typecheck && pnpm test` |
| Build | Last task of a phase and the Home assembly | `pnpm lint && pnpm typecheck && pnpm test && pnpm build` |

Every task starts with its test written and seen failing for the right reason (project rule "see red first"), then the code that turns it green. Types added to `src/models` ride with the first task that uses them, so every commit typechecks.

---

## Execution Plan

Phases run in order; tasks run in order inside a phase.

### Phase 1: Case template gaps

```
T1 → T2
T2 → T3
T3 → T4
T4 → T5
```

### Phase 2: Asset, content and wiring

```
T6 → T7
T7 → T8
T8 → T9
```

### Phase 3: Home card

```
T10 → T11
```

---

## Task Breakdown

### T1: Add `splitInlineCode` ViewModel ✅

**What**: Pure function that splits a string with backtick marks into `{ text, code }` segments.
**Where**: `src/viewmodels/inline-code.ts`
**Depends on**: None
**Reuses**: pattern of `src/viewmodels/case-view-model.ts`
**Requirement**: SITE-02, SITE-08

**Tools**:

- MCP: NONE
- Skill: NONE

**Done when**:

- [x] Text without backticks returns one non-code segment
- [x] "Todo texto em um só lugar, em `src/content/`. Nenhum texto fixo nos componentes." returns three segments, the middle one `code: true`
- [x] An unmatched backtick stays literal text; empty text returns `[]`
- [x] No `react` or `next` import (AD-002)
- [x] Gate check passes: `pnpm test`
- [x] Test count: 4 new tests pass (no silent deletions)

**Tests**: unit
**Gate**: quick

**Commit**: `feat(viewmodels): split inline code marks into segments`

---

### T2: Render inline code in `CaseCallout` ✅

**What**: `CaseCallout` renders each item through `splitInlineCode`, code segments in `<code>` with `font-mono`.
**Where**: `src/components/CaseCallout.tsx`
**Depends on**: T1
**Reuses**: `splitInlineCode`; existing `CaseCallout` markup
**Requirement**: SITE-02, SITE-08

**Tools**:

- MCP: NONE
- Skill: NONE

**Done when**:

- [x] An item with backticks renders a `<code>` element holding the marked text, without the backticks
- [x] An item without backticks renders exactly as before; existing `CaseCallout` tests stay unchanged and green
- [x] An empty `items` list still renders no container
- [x] No PT-BR literal in the component
- [x] Gate check passes: `pnpm test`
- [x] Test count: existing + 2 new tests pass

**Tests**: unit
**Gate**: quick

**Commit**: `feat(case): render inline code in callout items`

---

### T3: Add `CaseEvidenceRow` component ✅

**What**: One list of cards, each a metric (`value` + `label`) or a highlight (`title` + `text`), three columns from `md`, one column on mobile.
**Where**: `src/components/CaseEvidenceRow.tsx`
**Depends on**: T2
**Reuses**: card classes of `src/components/CaseMetrics.tsx` and `src/components/CaseHighlights.tsx`
**Requirement**: SITE-02, SITE-08

**Tools**:

- MCP: NONE
- Skill: NONE

**Done when**:

- [x] Renders `193` / "commits", "Testes antes do código" / its text and "Gate único" / its text, in that order, as list items
- [x] The list has `grid-cols-1` and `md:grid-cols-3` classes
- [x] Empty `items` renders no container
- [x] The component declares its own `EvidenceItem` prop type from `@/models/case-content` only after T4; until then it imports nothing from models (type kept local and moved in T4)
- [x] Gate check passes: `pnpm test`
- [x] Test count: 4 new tests pass

**Tests**: unit
**Gate**: quick

**Commit**: `feat(case): add evidence row of three cards`

---

### T4: Add `evidence` block to the case model and `CaseView` ✅

**What**: `EvidenceItem` and the `{ kind: "evidence" }` block in `case-content.ts`; `CaseView` renders it with `CaseEvidenceRow`, whose local prop type now imports `EvidenceItem`.
**Where**: `src/components/CaseView.tsx`
**Depends on**: T3
**Reuses**: `CaseBlockView` switch
**Requirement**: SITE-02

**Tools**:

- MCP: NONE
- Skill: NONE

**Done when**:

- [x] A case with an `evidence` block renders its three cards inside the section
- [x] Existing `CaseView` tests stay unchanged and green
- [x] `pnpm typecheck` passes (the switch handles every `kind`)
- [x] Gate check passes: `pnpm lint && pnpm typecheck && pnpm test`
- [x] Test count: existing + 1 new test pass

**Tests**: unit
**Gate**: full

**Commit**: `feat(case): support evidence block in case view`

---

### T5: Add optional `next` row to `CaseClosing` ✅

**What**: `CaseClosing.next?` in the model; the card renders a divider and a "Próximo caso" row (eyebrow, title, one `ButtonLink`) after the actions when `next` is present.
**Where**: `src/components/CaseClosing.tsx`
**Depends on**: T4
**Reuses**: `ButtonLink`
**Requirement**: SITE-04, SITE-07

**Tools**:

- MCP: NONE
- Skill: NONE

**Done when**:

- [x] With `next`, the card shows its eyebrow, title and a link with the action's label and `href`
- [x] Without `next`, the card renders no divider and no extra row; existing `CaseClosing` tests stay unchanged and green
- [x] No PT-BR literal in the component
- [x] Gate check passes: `pnpm lint && pnpm typecheck && pnpm test`
- [x] Test count: existing + 2 new tests pass

**Tests**: unit
**Gate**: full

**Commit**: `feat(case): render next-case row in closing card`

---

### T6: Serve the Home screenshot ✅

**What**: Copy `~/Pictures/Screenshots/Screenshot from 2026-11-09 19-07-32.png` to `public/this-site-home.png` and add it to the public-assets test.
**Where**: `public/this-site-home.png`
**Depends on**: None
**Reuses**: `tests/app/public-assets.test.ts` (allow-list and PNG-size pattern)
**Requirement**: SITE-03

**Tools**:

- MCP: NONE
- Skill: NONE

**Done when**:

- [x] Test asserts the file exists, has the PNG signature and size 1679x1127, and fails before the copy
- [x] Gate check passes: `pnpm test`
- [x] Test count: 3 new assertions pass

**Tests**: unit
**Gate**: quick

**Commit**: `feat(assets): add Este site Home screenshot`

---

### T7: Write Este site case content ✅

**What**: `esteSiteCase` entry with every string, link, block and chip from the spec; not registered yet.
**Where**: `src/content/this-site-case.ts`
**Depends on**: T6
**Reuses**: Phase 1 types (`evidence` block, inline-code marks) and `src/content/my-trello-version-case.ts` shape and `repoUrl` pattern
**Requirement**: SITE-01, SITE-02, SITE-03, SITE-04, SITE-05

**Tools**:

- MCP: NONE
- Skill: NONE

**Done when**:

- [x] Test asserts verbatim: eyebrow, title, intro, both hero actions (GitHub URL, `/#contato`), the Objetivo text, the three Decisões items (third with backticks around `src/content/`), the three evidence items, the figure (`/this-site-home.png`, 1679x1127, alt, caption "A Home deste site."), the four chips with TypeScript and Next.js as main, and the closing card with its three actions in order
- [x] Test asserts `JSON.stringify` of the entry has no `[conferir`
- [x] The closing has no `next`
- [x] Gate check passes: `pnpm lint && pnpm typecheck && pnpm test`
- [x] Test count: ≥ 10 new tests pass

**Tests**: unit
**Gate**: full

**Commit**: `feat(content): add Este site case copy`

---

### T8: Register the Este site case ✅

**What**: Append the entry to `cases` so the route, the sitemap and the metadata include `este-site`.
**Where**: `src/content/cases.ts`
**Depends on**: T7
**Reuses**: `caseSlugs` derivation; `tests/app/casos/case-metadata.test.ts` (already parametric)
**Requirement**: SITE-06, SITE-08

**Tools**:

- MCP: NONE
- Skill: NONE

**Done when**:

- [x] `tests/content/cases.test.ts` expects `["avaria", "my-trello-version", "este-site"]` and the title "Este site · Rafael Couto Silva" plus the description from the spec; red before the change
- [x] Sitemap test lists `/casos/este-site` with priority 0.8
- [x] The parametric metadata test covers the new slug: title, description, Open Graph `url` under `NEXT_PUBLIC_SITE_URL`, image `/og-image.png`
- [x] A page test renders `/casos/este-site` through `CaseView` and finds the h1 "Este site"; one `h1` only; sections `h2` with `aria-labelledby`
- [x] Unknown slug still reaches `notFound()`
- [x] Gate check passes: `pnpm lint && pnpm typecheck && pnpm test`
- [x] Test count: existing + ≥ 5 new tests pass

**Tests**: unit
**Gate**: full

**Commit**: `feat(cases): register Este site case route`

---

### T9: Point My Trello Version closing to Este site ✅

**What**: Add `next` ("Próximo caso" / "Este site" / "Ver o caso" to `/casos/este-site`) to the My Trello Version closing; "Código aberto" stays as is.
**Where**: `src/content/my-trello-version-case.ts`
**Depends on**: T8
**Reuses**: `CaseClosing.next` from T5
**Requirement**: SITE-07

**Tools**:

- MCP: NONE
- Skill: NONE

**Done when**:

- [x] Test asserts the `next` fields verbatim and that the existing closing eyebrow, title, text and three actions are unchanged
- [x] Avaria and Este site closings have no `next`
- [x] The registry link test still passes (`/casos/este-site` is a registered slug)
- [x] Gate check passes: `pnpm lint && pnpm typecheck && pnpm test && pnpm build`
- [x] Test count: existing + 3 new tests pass

**Tests**: unit
**Gate**: build

**Commit**: `feat(content): link My Trello Version closing to Este site`

---

### T10: Add wide layout and rows metrics to `ProjectCard`

**What**: `ProjectItem.layout?: "wide"` and `metricsStyle: "rows"` in the model; `ProjectCard` spans two columns from `md`, splits text and rows, and renders label/value rows when asked.
**Where**: `src/components/ProjectCard.tsx`
**Depends on**: None
**Reuses**: existing `dl` markup; lookup-map pattern of `CaseSection`
**Requirement**: SITE-10

**Tools**:

- MCP: NONE
- Skill: NONE

**Done when**:

- [ ] A `wide` card has the `md:col-span-2` class; a card without `layout` keeps its current classes
- [ ] With `rows`, each metric renders its label and its value as `dt` / `dd` in label-then-value order
- [ ] Existing `ProjectCard` tests stay unchanged and green (Avaria and Trello render as before)
- [ ] No PT-BR literal in the component
- [ ] Gate check passes: `pnpm lint && pnpm typecheck && pnpm test`
- [ ] Test count: existing + 3 new tests pass

**Tests**: unit
**Gate**: full

**Commit**: `feat(home): support wide project card with label-value rows`

---

### T11: Add the Este site card to the Home

**What**: Append the third project item to `homeContent.projects.items`.
**Where**: `src/content/home.ts`
**Depends on**: T10
**Reuses**: `ProjectsSection` (maps the array); `ProjectItem` shape of the Trello item
**Requirement**: SITE-09, SITE-10

**Tools**:

- MCP: NONE
- Skill: NONE

**Done when**:

- [ ] `tests/content/home.test.ts` expects three items in order Avaria, My Trello Version, Este site, and asserts verbatim the context, title, text, four chips (two main), three rows (`Commits` / `193`, `Testes` / "Antes do código", `Checagens` / "Gate único"), `caseLink` to `/casos/este-site` and `repoLink` to `https://github.com/rafaelcsilvadev/my-web-site` with `external: true`; red before the change
- [ ] The Avaria and Trello items are unchanged
- [ ] `ProjectsSection` and `HomeView` tests render three cards, the last one spanning both columns
- [ ] `[conferir` appears nowhere in the Home content
- [ ] Gate check passes: `pnpm lint && pnpm typecheck && pnpm test && pnpm build`
- [ ] Test count: existing + ≥ 4 new tests pass

**Tests**: unit
**Gate**: build

**Commit**: `feat(home): add Este site project card`

---

## Phase Execution Map

```
Phase 1 → Phase 2 → Phase 3

Phase 1:  T1 → T2 → T3 → T4 → T5
Phase 2:  T6 → T7 → T8 → T9
Phase 3:  T10 → T11
```

Execution is strictly sequential. 11 tasks: more than one task-budgeted batch (~7), so the sub-agent offer applies at Execute. Whole-phase packing gives Phase 1 (5) + Phase 2 (4) = 9 > 7, so batches are Phase 1 | Phase 2 + Phase 3 (6).

---

## Requirement Coverage

| Requirement | Tasks |
| ----------- | ----- |
| SITE-01 | T7 |
| SITE-02 | T1, T2, T3, T4, T7 |
| SITE-03 | T6, T7 |
| SITE-04 | T5, T7 |
| SITE-05 | T7 |
| SITE-06 | T8 |
| SITE-07 | T5, T9 |
| SITE-08 | T1, T2, T3, T8 |
| SITE-09 | T11 |
| SITE-10 | T10, T11 |

**Coverage:** 10 total, 10 mapped to tasks, 0 unmapped.
