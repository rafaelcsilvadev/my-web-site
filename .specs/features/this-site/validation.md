# This Site Validation

**Date**: 2026-11-09
**Spec**: `.specs/features/this-site/spec.md`
**Diff range**: `8494c40..838d616` (feature starts at `c924eca` / `8494c40`, the two spec-rename commits; code commits `67736f9..0c35eb9` for T1-T11, plus fix `838d616`)
**Iteration**: re-verify after fix iteration 1/3 (`838d616 fix(case): pass next-case entry from CaseView to closing`)
**Verifier**: independent sub-agent (author ≠ verifier)

## Validation: this-site - PASS ✅

---

## Task Completion

| Task | Status | Notes |
| ---- | ------ | ----- |
| T1 `splitInlineCode` | ✅ Done | `67736f9` |
| T2 inline code in `CaseCallout` | ✅ Done | `1141944` |
| T3 `CaseEvidenceRow` | ✅ Done | `3a151c5` |
| T4 `evidence` block in `CaseView` | ✅ Done | `ac6801d` |
| T5 `CaseClosing.next` | ✅ Done | `4b230df`; wired into `CaseView` by fix `838d616` |
| T6 screenshot asset | ✅ Done | `43fb2a4` |
| T7 Este site content | ✅ Done | `6b9d9ea` |
| T8 register case | ✅ Done | `545fb33` |
| T9 Trello closing → Este site | ✅ Done | `21f5c6f`; rendered on the page since fix `838d616` |
| T10 wide `ProjectCard` | ✅ Done | `0641aee` |
| T11 Home card | ✅ Done | `0c35eb9` |

---

## Spec-Anchored Acceptance Criteria

### P1: Este site case page

| # | Spec-defined outcome | `file:line` + assertion | Result |
| - | -------------------- | ----------------------- | ------ |
| 1 | header, back link "Voltar para o início" → `/`, eyebrow, title "Este site", intro verbatim | `tests/content/this-site-case.test.ts:10-15` - `expect(esteSiteCase.backLink).toEqual({ label: "Voltar para o início", href: "/" })`, `.eyebrow).toBe("Caso · Projeto pessoal, feito sozinho")`, `.title).toBe("Este site")`, `.intro).toBe("O site é a prova…")`; render: `tests/components/CaseView.test.tsx:65` (back link href), `:91-95` (banner before main), `tests/app/casos/[slug]/page.test.tsx:33-36` (h1 = title) | ✅ PASS |
| 2 | primary "Ver no GitHub" → repo URL; secondary "Contato" → `/#contato` | `tests/content/this-site-case.test.ts:19` - `expect(esteSiteCase.heroActions).toEqual([{ link: { label: "Ver no GitHub", href: repoUrl, external: true }, variant: "primary", … }, { link: { label: "Contato", href: "/#contato" }, variant: "ghost" }])`; render: `tests/components/CaseHero.test.tsx:43,55` | ✅ PASS |
| 3 | "01 Objetivo" + paragraph verbatim | `tests/content/this-site-case.test.ts:40,51` - `toEqual([["01","Objetivo"],…])`, `blocks).toEqual([{ kind: "paragraphs", items: ["Um portfólio estático…"] }])`; render: `tests/components/CaseView.test.tsx:44` | ✅ PASS |
| 4 | "02 Decisões", callout "O que decidi", 3 items in order, `src/content/` as inline code | `tests/content/this-site-case.test.ts:63` - `blocks).toEqual([{ kind: "callout", label: "O que decidi", items: [ … "Todo texto em um só lugar, em \`src/content/\`. …" ] }])`; `tests/viewmodels/inline-code.test.ts:12-20` - middle segment `{ text: "src/content/", code: true }`; `tests/components/CaseCallout.test.tsx:29-31` - `code.tagName).toBe("CODE")`, textContent without backticks | ✅ PASS |
| 5 | "03 Evidências", cards in order: `193`/"commits", "Testes antes do código"/text, "Gate único"/text | `tests/content/this-site-case.test.ts:79` - `expect(evidence).toEqual({ kind: "evidence", items: [{ kind: "metric", value: "193", label: "commits" }, …] })`; render: `tests/components/CaseEvidenceRow.test.tsx:27-33`, `tests/components/CaseView.test.tsx:157-159` | ✅ PASS |
| 6 | `next/image`, width/height = PNG dims (1679x1127), alt verbatim, caption "A Home deste site." | `tests/content/this-site-case.test.ts:98` - `toEqual({ kind: "figure", src: "/this-site-home.png", width: 1679, height: 1127, alt: "Tela da Home…", caption: "A Home deste site." })`; `tests/app/public-assets.test.ts:58-59` - `readUInt32BE(16)).toBe(1679)`, `(20)).toBe(1127)`; render: `tests/components/CaseFigure.test.tsx:27-28` | ✅ PASS |
| 7 | served from `public/this-site-home.png` as PNG | `tests/app/public-assets.test.ts:56` - `expect(signature).toBe("89504e470d0a1a0a")` | ✅ PASS |
| 8 | Stack label "Stack", 4 chips, TypeScript + Next.js main, no group label | `tests/content/this-site-case.test.ts:112-124` - `.label).toBe("Stack")`, `groups[0].label).toBeUndefined()`, `chips).toEqual([...4])`, `mainChips).toEqual(["TypeScript","Next.js"])`; render: `tests/components/CaseStack.test.tsx:41,49` | ✅ PASS |
| 9 | closing "Fim dos casos" / "De volta ao início" / text; actions Voltar ao início (`/`, arrow), Contato (primary), Baixar CV (download icon + attr) | `tests/content/this-site-case.test.ts:131-146` - eyebrow/title/text `toBe`, `closing.actions).toEqual([...])`; render: `tests/components/CaseClosing.test.tsx:65-67` | ✅ PASS |
| 10 | no `[conferir` on the page | `tests/content/this-site-case.test.ts:156` - `not.toContain("[conferir")`; `tests/components/CaseView.test.tsx:77`; build HTML `.next/server/app/casos/este-site.html`: 0 hits | ✅ PASS |
| 11 | no PT-BR in `src/components`/`src/app` | `tests/components/CaseView.test.tsx:118-125` - `expect(offenders).toEqual([])` (covers new `CaseEvidenceRow.tsx`); `tests/components/HomeView.test.tsx:88,93` (covers `ProjectCard.tsx`) | ✅ PASS |

### P1: "Este site" card on the Home

| # | Spec-defined outcome | `file:line` + assertion | Result |
| - | -------------------- | ----------------------- | ------ |
| 1 | three cards: Avaria, My Trello Version, Este site | `tests/content/home.test.ts:86`; `tests/components/ProjectsSection.test.tsx:27` - `toEqual(["Avaria", "My Trello Version", "Este site"])`; `tests/components/HomeView.test.tsx:61` | ✅ PASS |
| 2 | context, title, text, chips, main chips verbatim | `tests/content/home.test.ts:127-135` - `site.context).toEqual(["Projeto pessoal · solo", "Portfólio"])`, `title`, `description`, `tags`, `mainTags` | ✅ PASS |
| 3 | rows Commits/193, Testes/Antes do código, Checagens/Gate único | `tests/content/home.test.ts:137` - `site.metrics).toEqual([...])`; render: `tests/components/ProjectCard.test.tsx:140-143` - `dt.tagName).toBe("DT")`, `dt.nextElementSibling).toBe(dd)` | ✅ PASS |
| 4 | "Ver o caso" → `/casos/este-site` | `tests/content/home.test.ts:142` - `caseLink).toEqual({ label: "Ver o caso", href: "/casos/este-site" })`; render: `tests/components/ProjectCard.test.tsx:41`; build `index.html` contains `/casos/este-site` | ✅ PASS |
| 5 | "Repositório no GitHub" → repo URL, new tab, `noopener noreferrer` | `tests/content/home.test.ts:143` - `repoLink).toEqual({ …, external: true })`; render: `tests/components/ProjectCard.test.tsx:52` - `toHaveAttribute("rel", "noopener noreferrer")` | ✅ PASS |
| 6 | 1440 px: spans both columns, below the others | `tests/components/ProjectsSection.test.tsx:38-40` - `site).toHaveClass("md:col-span-2")`, others not; `tests/components/ProjectCard.test.tsx:132` - `md:grid md:grid-cols-2` | ✅ PASS (class-level; visual check is UAT) |
| 7 | 390 px: one column, no horizontal scroll | `src/components/ProjectsSection.tsx:20` `grid gap-8 md:grid-cols-2` (1 col below md); `tests/components/HomeView.test.tsx:114` (no fixed width > 375 px) | ✅ PASS (class-level; scroll needs browser UAT) |
| 8 | Avaria and Trello cards unchanged | existing `tests/components/ProjectCard.test.tsx:11-105` unchanged and green; `tests/content/home.test.ts:151` - `avaria.layout).toBeUndefined()` | ✅ PASS |
| 9 | strings from `src/content/` | `tests/content/home.test.ts:127-147`; `tests/components/HomeView.test.tsx:88,93` | ✅ PASS |

### P1: Case chain and routing

| # | Spec-defined outcome | `file:line` + assertion | Result |
| - | -------------------- | ----------------------- | ------ |
| 1 | SSG `/casos/este-site`; sitemap priority 0.8 | `tests/app/casos/[slug]/page.test.tsx:21-25` - `generateStaticParams()).toEqual([… { slug: "este-site" }])`; `tests/app/sitemap.test.ts:20` - `entry?.priority).toBe(0.8)`; build output lists `● /casos/este-site` | ✅ PASS |
| 2 | Trello page renders "Código aberto" card then "Próximo caso" row, title "Este site", "Ver o caso" → `/casos/este-site` | Content: `tests/content/my-trello-version-case.test.ts:195` - `closing.next).toEqual({ eyebrow: "Próximo caso", title: "Este site", action: { link: { label: "Ver o caso", href: "/casos/este-site" }, … } })`; existing card unchanged: `:175` - `closing.eyebrow).toBe("Código aberto")`. Rendered: `tests/components/CaseView.test.tsx:169-170` - `expect(link).toHaveAttribute("href", "/casos/este-site")`, `getByText(next.title)`; wire at `src/components/CaseView.tsx:104` `next={content.closing.next}`. Build HTML `.next/server/app/casos/my-trello-version.html`: "Código aberto" precedes "Próximo caso", `href="/casos/este-site"` present | ✅ PASS |
| 3 | no "Próximo caso" row on `/casos/este-site` | `tests/content/this-site-case.test.ts:150` - `closing.next).toBeUndefined()`; `tests/components/CaseView.test.tsx:177` - `querySelector('a[href="/casos/este-site"]')).toBeNull()`; build `este-site.html`: 0 "Próximo caso" | ✅ PASS |
| 4 | Avaria → Ver o caso → Ver o caso reaches Trello then Este site | Avaria → Trello: `tests/content/avaria-case.test.ts:95` + registry `tests/content/cases.test.ts:20` - `expect(caseSlugs).toContain(slug)`; Trello → Este site: `tests/components/CaseView.test.tsx:169`; both targets SSG (`tests/app/casos/[slug]/page.test.tsx:21-25`) | ✅ PASS |
| 5 | unknown slug → Foundation 404 | `tests/app/casos/[slug]/page.test.tsx:64` - `rejects.toThrow(NOT_FOUND)` | ✅ PASS |
| 6 | closing without `next` renders no row | `tests/components/CaseClosing.test.tsx:109-110` - `querySelector("hr")).toBeNull()`, one link only | ✅ PASS |

### P2: Metadata, accessibility and responsiveness

| # | Spec-defined outcome | `file:line` + assertion | Result |
| - | -------------------- | ----------------------- | ------ |
| 1 | title, description from content, OG url, OG image `/og-image.png` | `tests/content/cases.test.ts:29-30` - `bySlug["este-site"].title).toBe("Este site · Rafael Couto Silva")`, description `toBe(...)`; `tests/app/casos/case-metadata.test.ts:42,47` (parametric over `cases`) - `openGraph.url).toBe(\`https://example.com/casos/${slug}\`)`, `image.url).toBe("https://example.com/og-image.png")` | ✅ PASS |
| 2 | one `h1`; numbered sections `h2` via `aria-labelledby` | `tests/app/casos/[slug]/page.test.tsx:35,57` - `headings).toHaveLength(1)`, `heading?.tagName).toBe(id === "case-title" ? "H1" : "H2")`; `tests/components/CaseView.test.tsx:30` | ✅ PASS |
| 3 | number badges `aria-hidden="true"` | `tests/components/CaseSection.test.tsx:38` - `badge).toHaveAttribute("aria-hidden", "true")` | ✅ PASS |
| 4 | 390 px: Objetivo/Decisões and evidence stack to one column | `tests/components/CaseEvidenceRow.test.tsx:52` - `toHaveClass("grid-cols-1")`; `tests/components/CaseSection.test.tsx:84` (`lg:grid-cols-` only for split) | ✅ PASS (class-level; scroll needs browser UAT) |
| 5 | 1440 px: three evidence cards in one row | `tests/components/CaseEvidenceRow.test.tsx:53` - `toHaveClass("md:grid-cols-3")` | ✅ PASS |
| 6 | inline code monospace with the shared code style | `tests/components/CaseCallout.test.tsx:30` - `code).toHaveClass("font-mono")` | ✅ PASS |

**Status**: ✅ All ACs covered (iteration 1 gaps on Chain AC2/AC4 closed by `838d616`).

---

## Discrimination Sensor

Scratch: `git worktree add --detach <scratchpad>/wt2 838d616` (node_modules symlinked), one mutation at a time, file restored with `git checkout` inside the worktree, worktree removed with `git worktree remove --force`. Real tree `git status --porcelain` before = after = empty.

| Mutation | File:line | Description | Killed? |
| -------- | --------- | ----------- | ------- |
| 1 | `src/viewmodels/inline-code.ts:12` | `index % 2 === 1` → `=== 0` (code/plain swapped) | ✅ Killed (4 failed) |
| 2 | `src/components/CaseClosing.tsx:33` | `next` row never rendered | ✅ Killed (1 failed) |
| 3 | `src/components/CaseView.tsx:49` | `evidence` block returns `null` | ✅ Killed (1 failed) |
| 4 | `src/components/CaseEvidenceRow.tsx:14` | `md:grid-cols-3` → `md:grid-cols-2` | ✅ Killed (1 failed) |
| 5 | `src/components/ProjectCard.tsx:11` | wide card loses `md:col-span-2` | ✅ Killed (3 failed) |
| 6 | `src/content/my-trello-version-case.ts:179` | next href → `/casos/este-sitex` | ✅ Killed (2 failed) |
| 7 | `src/content/cases.ts:7` | `esteSiteCase` unregistered | ✅ Killed (6 failed) |
| 8 | `src/components/CaseCallout.tsx:18` | code segments rendered as plain text | ✅ Killed (1 failed) |
| 9 | `src/content/this-site-case.ts:105` | closing "Voltar ao início" loses arrow icon | ✅ Killed (1 failed) |
| 10 | `src/components/CaseView.tsx:104` | drop `next={content.closing.next}` (the iteration-1 defect) | ✅ Killed (1 failed) |
| 11 | `src/components/CaseView.tsx:104` | pass `next` with its action href rewritten to `/` | ✅ Killed (1 failed) |

**Sensor depth**: lightweight+ (11 mutations; not a P0 path)
**Sensor outcome**: 11/11 killed (no surviving mutant)

Note: iteration 1 found that the sensor alone missed a missing wire (`CaseView` → `CaseClosing.next`). Mutations 10-11 now target that wire and are killed by `tests/components/CaseView.test.tsx:164-170`.

---

## Code Quality

| Principle | Status |
| --------- | ------ |
| Minimum code | ✅ |
| Surgical changes | ✅ |
| No scope creep | ✅ |
| Matches patterns | ✅ (lookup maps in `ProjectCard`, block switch in `CaseView`) |
| Spec-anchored outcome check (asserted values match spec) | ✅ |
| Per-layer Coverage Expectation met | ✅ (`next` now rendered through `CaseView` with real content) |
| Every test maps to a spec requirement - no unclaimed tests | ✅ |
| Documented guidelines followed: `CLAUDE.md` (tests in `tests/` mirroring `src/`, Vitest, no PT-BR in components) | ✅ |

Minor (still present): `src/components/ProjectCard.tsx:58-95` inner JSX was not re-indented after wrapping it in the new body `div`. Style only.

Minor (still present): the parametric `CaseView` test `tests/components/CaseView.test.tsx:42-58` has no `evidence` branch, so the real Este site evidence block is not asserted at view level for the registered content (covered by the synthetic test at `:130-160`).

---

## Edge Cases

- [x] Screenshot fails to load: explicit `width`/`height` (`tests/components/CaseFigure.test.tsx:27-28`), caption in `figcaption` (`:31`)
- [x] Callout with no items renders nothing: `tests/components/CaseCallout.test.tsx:43`
- [x] Empty content list renders no container: `tests/components/CaseEvidenceRow.test.tsx:59`, `tests/components/CaseClosing.test.tsx:86`
- [x] No JS: static SSG HTML holds all content (`.next/server/app/casos/este-site.html`: hero, Decisões `<code>`, Evidências, closing all present)

---

## Gate Check

- **Gate command**: `pnpm lint && pnpm typecheck && pnpm test && pnpm build`
- **Gate outcome**: exit 0; 500 passed, 0 failed, 0 skipped (63 files), at `838d616`
- **Test count before feature** (`8494c40`): 442
- **Test count after feature**: 500
- **Delta**: +58 new tests
- **Skipped tests**: none
- **Failures**: none

---

## Fix Plans

### Fix 1 (iteration 1): My Trello Version page did not render the "Próximo caso" row - ✅ Resolved

- **Root cause**: `CaseView` built `<CaseClosing>` without `next`.
- **Resolution**: `838d616` adds `next={content.closing.next}` at `src/components/CaseView.tsx:104` and view-level tests at `tests/components/CaseView.test.tsx:163-181`. Re-verified: mutations 10-11 killed; build HTML has the link.

### Open minor items (non-blocking, optional)

- Add an `evidence` branch to the parametric block check in `tests/components/CaseView.test.tsx:42-58`.
- Re-indent `src/components/ProjectCard.tsx:58-95` in a separate `style`/`refactor` commit.

---

## Requirement Traceability Update

| Requirement | Previous Status | New Status |
| ----------- | --------------- | ---------- |
| SITE-01 | Pending | ✅ Verified |
| SITE-02 | Pending | ✅ Verified |
| SITE-03 | Pending | ✅ Verified |
| SITE-04 | Pending | ✅ Verified |
| SITE-05 | Pending | ✅ Verified |
| SITE-06 | Pending | ✅ Verified |
| SITE-07 | Pending | ✅ Verified (after fix `838d616`) |
| SITE-08 | Pending | ✅ Verified (horizontal scroll pending browser UAT) |
| SITE-09 | Pending | ✅ Verified |
| SITE-10 | Pending | ✅ Verified (visual pending browser UAT) |

(The Verifier writes only this file; `spec.md` statuses are left to the orchestrator.)

---

## Summary

**Overall**: ✅ Ready

**Spec-anchored check**: 32/32 ACs matched spec outcome; 0 spec-precision gaps
**Sensor**: 11/11 mutations killed
**Gate**: 500 passed, exit 0

**What works**: Este site page content and rendering, screenshot asset, inline code, evidence row, routing/SSG/sitemap/metadata, Home wide card, full case chain Avaria → My Trello Version → Este site → Home.

**Issues found**: none blocking. Two minor items listed under Fix Plans.

**Next steps**: offer browser UAT for 390 px / 1440 px layout; optionally address the two minor items.
