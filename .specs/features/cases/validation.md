# Cases Validation

**Date**: 2026-11-08
**Spec**: `.specs/features/cases/spec.md`
**Diff range**: `main..HEAD` (`579e563`); feature commits `ad5ec18`..`579e563` (25 task commits, 67 files changed, +3717/-32 including 7 design PNGs and spec docs)
**Verifier**: independent sub-agent (author != verifier)
**Verdict**: PASS (all ACs traced; 11/11 mutants killed; 3 spec-precision gaps flagged, none blocking)

---

## Task Completion

| Task | Status | Notes |
| ---- | ------ | ----- |
| T1-T25 | ✅ Done | 106 `- [x]` boxes, 0 unchecked in `tasks.md`; one commit per task (T1 `ad5ec18`, T2 `b65a72d`, T3 `ed6a68c`, T4 `86fd609`, T5 `a7f98f9`, T6 `36ebf43`, T7 `1b2e304`, T8 `eb491ad`, T9 `53cbe97`, T10 `7f8e09d`, T11 `d7ee244`, T12 `5b2cfab`, T13 `f708311`, T14 `a3838ad`, T15 `3d2354f`, T16 `f00dc2f`, T17 `731dec9`, T18 `dc856e4`, T19 `7f1e81d`, T20 `e9bd76b`, T21 `269e25a`, T22 `3f4d10f`, T23 `2d6a9f0`, T24 `a11bbdc`, T25 `579e563`) |

Housekeeping: `tasks.md:13` still reads `**Status**: Draft` (Home had `Approved`); `spec.md` traceability table still `Pending`. Non-blocking, update when closing the feature.

---

## Spec-Anchored Acceptance Criteria

### P1: Shared case template and Avaria page

| AC | Spec-defined outcome | `file:line` + assertion | Result |
| -- | -------------------- | ----------------------- | ------ |
| 1 hero + back link | back link "Voltar para o início" -> `/`, eyebrow, title, intro verbatim | `tests/content/avaria-case.test.ts:14` `backLink toEqual({label:"Voltar para o início",href:"/"})`; `:15-19` eyebrow/title/intro `toBe(...)`; render: `tests/components/CaseView.test.tsx:23` (one h1 = title), `:65-68` (back link href), `tests/components/CaseHero.test.tsx:32-33,40` | ✅ PASS |
| 2 facts bar | Empresa/Mobs2, Papel/Proponente e responsável técnico, Estado/Em produção há +4 anos | `tests/content/avaria-case.test.ts:24-28` `toEqual([...3 facts])`; render `tests/components/CaseFacts.test.tsx:21-25` dt/dd pairing | ✅ PASS |
| 3 three numbered sections, 2 cols desktop / 1 mobile | 01 Problema, 02 Decisão, 03 Resultado with paragraphs verbatim | `tests/content/avaria-case.test.ts:34-38` titles+numbers, `:41` `layout === "split"`, `:45-48,52-54,66-68` paragraphs `toEqual`; `tests/components/CaseSection.test.tsx:84-85` `splitClass toContain("lg:grid-cols-")`, stacked `not.toContain`; `tests/components/CaseView.test.tsx:30` section titles in order | ✅ PASS (column count is class-based; jsdom has no layout) |
| 4 callout | "Por que AdonisJS" + 2 reasons verbatim | `tests/content/avaria-case.test.ts:55-62` `toEqual({kind:"callout",label:"Por que AdonisJS",items:[...]})`; render `tests/components/CaseCallout.test.tsx:13,21` | ✅ PASS |
| 5 three metric cards | +4 anos/em produção, +1 mil/clientes, TS/no back e no mobile | `tests/content/avaria-case.test.ts:69-73` `toEqual([...])`; render `tests/components/CaseMetrics.test.tsx:19-22` | ✅ PASS |
| 6 stack chips | TypeScript, React Native, Node.js (AdonisJS), SQL Server | `tests/content/avaria-case.test.ts:81-86` `chips toEqual([...4])`; render `tests/components/CaseStack.test.tsx:32-37` | ✅ PASS |
| 7 next-case card | title, text, 3 actions with hrefs | `tests/content/avaria-case.test.ts:90-102` eyebrow "Próximo caso", title, text, actions `toEqual` (`/casos/my-trello-version`, `/#contato`, `/cv-rafael-couto-silva.pdf` + `download:true`); render `tests/components/CaseClosing.test.tsx:50-67` hrefs and `download` | ✅ PASS |
| 8 all strings from `src/content/`, no PT-BR in components/app | none in `src/components/Case*`, `BackLink`, `src/app` | `tests/components/CaseView.test.tsx:114-125` `expect(offenders).toEqual([])` (Case*/BackLink regex scan); `tests/components/HomeView.test.tsx:74-78` scan extends to `src/app/*.tsx` (Home guard) | ✅ PASS |
| 9 empty list -> no empty container | no container | `tests/components/CaseFacts.test.tsx:33`, `CaseMetrics.test.tsx:29`, `CaseCallout.test.tsx:27`, `CaseCardList.test.tsx:29`, `CaseHighlights.test.tsx:28`, `CaseSteps.test.tsx:48` all `toBeEmptyDOMElement()`; `CaseHero.test.tsx:67-68`, `CaseClosing.test.tsx:84-85` (`:empty` null); `CaseStack.test.tsx:85` empty group renders no list | ✅ PASS |

### P1: My Trello Version page

| AC | Spec-defined outcome | `file:line` + assertion | Result |
| -- | -------------------- | ----------------------- | ------ |
| 1 hero | eyebrow, title, intro, back link | `tests/content/my-trello-version-case.test.ts:17-22` `toBe/toEqual` verbatim | ✅ PASS |
| 2 hero buttons | primary "Ver no GitHub" -> repo URL, secondary "Contato" -> `/#contato` | `tests/content/my-trello-version-case.test.ts:26-33` `heroActions toEqual([{...primary, external:true, icon:"github"},{...ghost}])`; render: `tests/components/CaseHero.test.tsx:45-50` href, `:58-59` `target="_blank"`, `rel="noopener noreferrer"` | ✅ PASS |
| 3 01 Objetivo | cards A dor / Construir / Mostrar with lead-in before the last two | `tests/content/my-trello-version-case.test.ts:49-76` `blocks toEqual([cards[A dor], paragraphs[lead-in], cards[Construir, Mostrar]])` verbatim | ✅ PASS |
| 4 02 Processo | intro, six steps in order, step 04 highlighted | `tests/content/my-trello-version-case.test.ts:80-91` intro `toBe` and `steps toEqual` (`highlight:true` only on 04); render `tests/components/CaseSteps.test.tsx:22-27` (OL, order), `:37-40` `toHaveClass("bg-brand/15")` only on highlighted | ✅ PASS |
| 5 03 Evidências | 4 metrics + 4 highlights verbatim | `tests/content/my-trello-version-case.test.ts:96-101` metrics `toEqual`; `:106-120` highlights `toEqual` | ✅ PASS |
| 6 screenshot via next/image | width 1797, height 915, alt, caption | `tests/content/my-trello-version-case.test.ts:125-132` figure `toEqual({src,width:1797,height:915,alt,caption})`; `tests/components/CaseFigure.test.tsx:27-28` `toHaveAttribute("width","1797")`/`("height","915")`, `:37` figcaption text | ✅ PASS |
| 7 stack in 4 columns + note | Base/Back-end/Front-end/Infra, mains TypeScript/NestJS/React 19/Docker, note verbatim | `tests/content/my-trello-version-case.test.ts:139-170` `groups toEqual` (incl. `mainChips`), `:174-176` note `toBe`; render `tests/components/CaseStack.test.tsx:44-45` main chip class, `:64` note | ✅ PASS |
| 8 closing "Código aberto" | title, text, 3 actions, GitHub new tab | `tests/content/my-trello-version-case.test.ts:180-196` eyebrow/title/text/actions `toEqual` (`external:true`); render `tests/components/CaseClosing.test.tsx:72-76` `target/_blank`, `rel` | ✅ PASS |
| 9 no `[conferir` | absent | `tests/content/my-trello-version-case.test.ts:205` and `tests/content/avaria-case.test.ts:111` `not.toContain("[conferir")`; rendered `tests/components/CaseView.test.tsx:77` `container.textContent not.toContain("[conferir")`. Also `grep -rn conferir src` is empty | ✅ PASS |
| 10 PNG 1797x915 in `public/` | signature + IHDR size | `tests/app/public-assets.test.ts:46-49` signature `89504e470d0a1a0a`, `readUInt32BE(16)===1797`, `(20)===915`; `:59` allow-list | ✅ PASS |

### P1: Routing and navigation

| AC | Spec-defined outcome | `file:line` + assertion | Result |
| -- | -------------------- | ----------------------- | ------ |
| 1 static params | `/casos/avaria`, `/casos/my-trello-version` | `tests/app/casos/[slug]/page.test.tsx:21-24` `generateStaticParams() toEqual([{slug:"avaria"},{slug:"my-trello-version"}])`; `tests/content/cases.test.ts:7`; `next build` output lists both as SSG (`●`) | ✅ PASS |
| 2 unknown slug -> 404 | `notFound()` | `tests/app/casos/[slug]/page.test.tsx:50` `rejects.toThrow("NEXT_NOT_FOUND")` (page) and `:54` (metadata); `tests/viewmodels/case-view-model.test.ts:12,16,20` `findCase ... toBeUndefined()`; `dynamicParams = false` at `src/app/casos/[slug]/page.tsx:15` (no test; build-level) | ✅ PASS |
| 3 header links | `/`, `/#projetos`, `/#experiencia`, `/#stack`, `/#metodo`, Contato `/#contato` | `tests/content/case-chrome.test.ts:9-16` `toEqual([[label,href]...])`, `:22` cta `toMatchObject({label:"Contato",href:"/#contato"})`; render `tests/components/CaseView.test.tsx:101-105` | ✅ PASS |
| 4 brand/back -> `/` | `/` | `tests/content/case-chrome.test.ts:33` `brandHref toBe("/")`; `tests/components/SiteHeader.test.tsx:124` brand `href "/"`; `tests/components/CaseView.test.tsx:106-109`; back link `:65-68` | ✅ PASS |
| 5 "Voltar ao topo" -> `#top` | `#top` of current page | `tests/content/case-chrome.test.ts:38-39` `backToTop toEqual({label:"Voltar ao topo",href:"#top"})`, `topId toBe("top")`; `tests/components/CaseView.test.tsx:82` `#top` exists | ✅ PASS |
| 6 mobile menu same links, close on click/Escape | same hrefs; close | `tests/components/SiteHeader.test.tsx:142-146` panel hrefs `toEqual(["/","/#projetos","/#contato"])`; close behaviour is unchanged shared code covered by `:86-100` (click, Escape) | ✅ PASS |
| 7 Home links reach case page | Home `caseLink` hrefs are registered slugs | `tests/content/home.test.ts:102,121` `caseLink toEqual({... href:"/casos/avaria"})` / `my-trello-version`; `tests/content/cases.test.ts:14-22` every internal `/casos/<slug>` is registered; `generateStaticParams` above | ✅ PASS |

### P2: Accessibility and responsiveness

| AC | Spec-defined outcome | `file:line` + assertion | Result |
| -- | -------------------- | ----------------------- | ------ |
| 1 one h1, numbered headings h2 | 1 h1; h2 per section | `tests/components/CaseView.test.tsx:22` `h1s toHaveLength(1)`, `:30,33` `sectionTitles toEqual(...)`, `h2s toHaveLength(sections+1)` | ✅ PASS |
| 2 section `aria-labelledby` | labelled by heading | `tests/components/CaseSection.test.tsx:24-26` `tagName "SECTION"`, `toHaveAttribute("aria-labelledby", heading.id)` | ✅ PASS |
| 3 lists/dl with names; decorative icons and number badges `aria-hidden` | dl/lists named; aria-hidden on icons and badges | facts `tests/components/CaseFacts.test.tsx:21-25` (dl/dt/dd); stack groups `tests/components/CaseStack.test.tsx:24-37` (list named by label); section badge `tests/components/CaseSection.test.tsx:38` `aria-hidden "true"`; icon `tests/components/BackLink.test.tsx:21` | ⚠️ Spec-precision gap: "numbers badges" is not defined. The step numbers `01..06` in `src/components/CaseSteps.tsx:19` are not `aria-hidden` (they are announced inside an `ol`). Section badge is hidden and tested |
| 4 visible focus outline; skip link first and targets main | outline on links/buttons; skip link first | focus: global rule `tests/app/tokens.test.ts:86-87` `:focus-visible` `outline: 2px solid #E3B5F0`; skip link `tests/components/CaseView.test.tsx:83-86` first `a[href], button` has skip label and `href "#main"`; `:86` main id | ⚠️ Spec-precision gap: "move focus to the main content" is only verified as an anchor target (no focus assertion; same as Home); outline is a global CSS rule, not per case component |
| 5 390 px one column, no horizontal scroll | one column | layout classes only (`CaseSection.tsx:13-14`, `CaseSteps.tsx:12` `grid-cols-2 md:grid-cols-3 lg:grid-cols-6`); `tests/components/CaseSection.test.tsx:84-85` | ⚠️ Spec-precision gap: not verifiable in jsdom; "one column" is not literally true for steps (2 columns at 390 px) and no horizontal-scroll assertion exists. Needs a manual or browser check |
| 6 reduced motion | Foundation rule applies | Foundation `tests/app/tokens.test.ts` (existing); no new animation added by cases (no `transition`/`animate` in `Case*.tsx`) | ✅ PASS (inherited) |

### P3: Per-page metadata

| AC | Spec-defined outcome | `file:line` + assertion | Result |
| -- | -------------------- | ----------------------- | ------ |
| 1 titles | "Avaria · Rafael Couto Silva" / "My Trello Version · Rafael Couto Silva" | `tests/content/cases.test.ts:27-28` `title toBe(...)`; `tests/app/casos/case-metadata.test.ts:30` `meta.title toBe(cases[i].metadata.title)`; `tests/app/casos/[slug]/page.test.tsx:41` | ✅ PASS |
| 2 description + OG url | description from content; `url = <site>/casos/<slug>` | `tests/app/casos/case-metadata.test.ts:31,37` `description toBe(...)`, `openGraph.url toBe("https://example.com/casos/${slug}")`; `:61` localhost fallback; `tests/app/casos/[slug]/page.test.tsx:42-43` | ✅ PASS |
| 3 OG image `/og-image.png` | shared image | `tests/app/casos/case-metadata.test.ts:42-44` `image.url toBe("https://example.com/og-image.png")`, `width 1200`, `height 630` | ✅ PASS |

### Edge cases

- [x] No `repoLink` -> no GitHub button: `CaseHero`/`CaseClosing` render only the supplied actions; empty list renders nothing (`CaseHero.test.tsx:67-68`, `CaseClosing.test.tsx:84-85`); Avaria `heroActions toEqual([])` (`avaria-case.test.ts:20`).
- [x] Next-case absent -> content-defined closing card: closing is a required per-case content field (`CaseContent.closing`), My Trello Version carries "Código aberto" (`my-trello-version-case.test.ts:180-196`).
- [x] No JS -> content renders: Server Components, static build; only the menu toggle is client.
- [x] `/#projetos` scroll under sticky header: `scroll-mt-24` on Home sections (existing tests `ExperienceSection.test.tsx:17`, `ContactSection.test.tsx:17`); `CaseSection.tsx:24` has the same class (not asserted in `CaseSection.test.tsx`, minor).
- [x] Screenshot fails to load: explicit width/height (`CaseFigure.test.tsx:27-28`), alt and caption in DOM (`:19,37`). Browser-only behavior not exercised.

**Status**: ✅ All ACs covered; ⚠️ 3 spec-precision gaps flagged (P2 AC3, AC4, AC5), none blocking.

---

## Discrimination Sensor

Run in a temporary `git worktree` (`HEAD`, `node_modules` symlinked), one mutation at a time, full `vitest run` per mutant, worktree removed afterwards. Real-tree `git status --porcelain` is identical to the baseline taken before the sensor.

| # | File | Description | Killed? |
| - | ---- | ----------- | ------- |
| M1 | `src/viewmodels/case-view-model.ts:5` | `entry.slug === slug` -> `!==` | ✅ Killed (10 failed) |
| M2 | `src/viewmodels/home-view-model.ts:33` | `navHref` ignores explicit `href` (always `#sectionId`) | ✅ Killed (5 failed) |
| M3 | `src/viewmodels/home-view-model.ts:37` | `brandHref` ignores `chrome.brandHref` | ✅ Killed (4 failed) |
| M4 | `src/app/casos/[slug]/page.tsx:18` | `generateStaticParams` returns only the first slug | ✅ Killed (1 failed) |
| M5 | `src/app/casos/[slug]/page.tsx:24` | unknown slug returns `cases[0]` instead of `notFound()` | ✅ Killed (2 failed) |
| M6 | `src/app/casos/case-metadata.ts:17` | OG url drops `/casos/` segment | ✅ Killed (5 failed) |
| M7 | `src/components/CaseView.tsx:44` | `steps` block kind renders `null` | ✅ Killed (1 failed) |
| M8 | `src/components/CaseSection.tsx:13` | `split` layout loses its two-column class | ✅ Killed (1 failed) |
| M9 | `src/components/CaseSteps.tsx:16` | highlight condition inverted | ✅ Killed (1 failed) |
| M10 | `src/content/case-chrome.ts:20` | Método href `/#metodo` -> `#metodo` | ✅ Killed (1 failed) |
| M11 | `src/components/CaseView.tsx:40` | `metrics` block kind renders an empty card list | ✅ Killed (2 failed) |

**Sensor depth**: lightweight (default tier; static content pages, no P0 path)
**Result**: 11/11 killed - PASS ✅

---

## Code Quality

| Principle | Status |
| --------- | ------ |
| Minimum code | ✅ |
| Surgical changes (Home content untouched except `home.ts` +1 line; header gets optional `href`/`brandHref`) | ✅ |
| No scope creep | ✅ |
| Matches patterns (MVVM, tests mirror `src/`, one component per file) | ✅ |
| Spec-anchored outcome check (asserted values match spec) | ✅ (3 precision gaps flagged) |
| Per-layer Coverage Expectation (content verbatim, view-model branches, app wiring, assets) | ✅ |
| Every test maps to a spec requirement | ✅ |
| Documented guidelines followed: `CLAUDE.md` (MVVM, no PT-BR in components, `tests/` mirror guard `tests/structure.test.ts`), AD-001, AD-002 | ✅ |

---

## Gate Check

- **Gate command**: `pnpm lint && pnpm typecheck && pnpm test && pnpm build`
- **Result**: exit 0; lint clean, typecheck clean, 415 passed, 0 failed, 0 skipped (56 test files); `next build` OK, `/`, `/_not-found` static and `/casos/avaria`, `/casos/my-trello-version` SSG (`●`)
- **Test count before feature**: not re-measured (Home report: 278 + intermediate Home work); **after**: 415
- **Skipped tests**: none
- **Failures**: none

---

## Fix Plans

None required. Optional, non-blocking:

1. Mark the `CaseSteps` number badges `aria-hidden="true"` (or amend P2 AC3 to say only the section badge) - `src/components/CaseSteps.tsx:19`.
2. Clarify P2 AC4/AC5 in the spec (focus assertion, steps grid at 390 px) or cover them with a browser check when authorized.
3. Close housekeeping: `tasks.md:13` status, `spec.md` traceability table.

---

## Requirement Traceability Update

| Requirement | Previous Status | New Status |
| ----------- | --------------- | ---------- |
| CASE-01 to CASE-10, CASE-12 | Pending | ✅ Verified |
| CASE-11 | Pending | ✅ Verified with 3 spec-precision gaps (AC3, AC4, AC5) |

---

## Summary

**Overall**: ✅ Ready

**Spec-anchored check**: 38/38 ACs traced to `file:line` (9 + 10 + 7 + 6 + 3 + 3 edge areas); 3 spec-precision gaps (P2 AC3, AC4, AC5), 0 failed
**Sensor**: 11/11 mutations killed
**Gate**: 415 passed, 0 failed; lint, typecheck, build exit 0

**What works**: both case pages and the shared template, content verbatim with no `[conferir` leak, static params and 404, header/footer/menu hrefs on sub-routes, per-case metadata, PNG asset 1797x915.

**Issues found**: none blocking; see Fix Plans.

**Next steps**: ask the user before pushing and opening the PR; optionally verify layout at 390 px in a browser (requires authorization).
