# Home Validation

**Date**: 2026-11-06
**Spec**: `.specs/features/home/spec.md`
**Diff range**: `f074a01..f41a78d` (HEAD; 53 files, +2817/-194). Re-verification iteration 1 of 3; fixes under review: `f0bd0d1`, `2f4fb6e`, `06d4526`, `f8cada4`, `f41a78d`.
**Verifier**: independent sub-agent (author != verifier)
**Verdict**: PASS (all 3 prior gaps closed; 17/17 targeted mutations killed except one non-AC optimization knob, see below)

---

## Task Completion

| Task | Status | Notes |
| ---- | ------ | ----- |
| T1-T25 | ✅ Done | No unchecked box left in `tasks.md` (`grep "- \[ \]"` empty); `tasks.md:12` `**Status**: Approved`; T1 and T9 closed in `f41a78d` |

Prior gaps: (1) M7 survivor -> closed by `tests/components/Hero.test.tsx:54-60`; (2) Hero without `aria-labelledby` -> closed by `src/components/Hero.tsx:13,16` + `tests/components/Hero.test.tsx:62-70`; (3) PT-BR guard skipped `src/app` -> closed by `tests/components/HomeView.test.tsx:74-78`.

---

## Spec-Anchored Acceptance Criteria

### P1: Assets and page shell

| Criterion | Spec-defined outcome | `file:line` + assertion | Result |
| --------- | -------------------- | ----------------------- | ------ |
| 1 assets + next/image with width/height | files in `public/`, `<Image>` with explicit width/height (+ `priority` per Assumptions: LCP element) | `tests/app/public-assets.test.ts:33-46` (PNG 1254x1254, `%PDF`); `tests/components/Hero.test.tsx:50-51` `toHaveAttribute("width","1254")`/`height`; `tests/components/Hero.test.tsx:54-60` `expect(img).not.toHaveAttribute("loading","lazy")` | ✅ PASS |
| 2 alt + caption from content | exact alt and caption strings | `tests/content/home.test.ts:66-73` `toEqual({... alt, caption})`; `tests/components/Hero.test.tsx:47-49,74-75` | ✅ PASS |
| 3 header name + 5 links | brand, 5 links to section ids | `tests/components/SiteHeader.test.tsx:23,30-31`; `tests/content/home.test.ts:8-16` | ✅ PASS |
| 4 footer | "© 2026 Rafael Couto Silva", "Voltar ao topo" -> `#top` | `tests/components/SiteFooter.test.tsx:18,23` | ✅ PASS |
| 5 below md: hide links, show button | `hidden md:flex` / `md:hidden` | `tests/components/SiteHeader.test.tsx:37-38` `toHaveClass("hidden","md:flex")`, `toHaveClass("md:hidden")` | ✅ PASS (class-based; jsdom has no layout) |
| 6 open -> 5 links, aria-expanded=true | `aria-expanded="true"` + 5 links | `tests/components/SiteHeader.test.tsx:59,63` | ✅ PASS |
| 7 click/Escape closes, aria-expanded=false | closed + false | `tests/components/SiteHeader.test.tsx:72,81`; `tests/viewmodels/use-mobile-menu.test.tsx:34-39,47-65` (listener cleanup) | ✅ PASS |
| 8 no hardcoded PT-BR in components/app | none | `tests/components/HomeView.test.tsx:74-78,81-89` - `viewComponents` = components (minus HomeView) + `src/app/*.tsx`; `expect(offenders.map(...)).toEqual([])` | ✅ PASS (re-verified: mutants M15/M16 injecting PT-BR into `src/app/page.tsx` and `layout.tsx` are killed) |

### P1: Hero and Projetos

| Criterion | Spec-defined outcome | `file:line` + assertion | Result |
| --------- | -------------------- | ----------------------- | ------ |
| 1 hero texts | label, h1, badge, intro, stack line | `tests/components/Hero.test.tsx:15,20-30` | ✅ PASS |
| 2 exactly one h1 | 1 | `tests/components/HomeView.test.tsx:53`; `tests/app/page.test.tsx:11` `toHaveLength(1)` | ✅ PASS |
| 3 hero actions | Contato `#contato`, CV `/cv-rafael-couto-silva.pdf` | `tests/components/Hero.test.tsx:35,41-42` | ✅ PASS |
| 4 projects section + 2 cards | id `projetos`, Avaria, My Trello Version | `tests/components/ProjectsSection.test.tsx:13-15`; `tests/content/home.test.ts:82-85` | ✅ PASS |
| 5 Avaria card | context, description, metrics, tags | `tests/content/home.test.ts:89-98` (verbatim `toEqual`); render `tests/components/ProjectCard.test.tsx` metrics/tags tests | ✅ PASS |
| 6 Trello card | same for Trello | `tests/content/home.test.ts:104-113` | ✅ PASS |
| 7 case links + repo external | hrefs; `rel`, `target` | `tests/content/home.test.ts:99,114-119`; `tests/components/ProjectCard.test.tsx:41,50-52` | ✅ PASS |

### P1: Experiência and Stack

| Criterion | Spec-defined outcome | `file:line` + assertion | Result |
| --------- | -------------------- | ----------------------- | ------ |
| 1 section + 3 entries in order | id `experiencia`; Mobs2, Duo, Globals | `tests/components/ExperienceSection.test.tsx:14,29-33` | ✅ PASS |
| 2 role, achievements, tags | verbatim | `tests/content/home.test.ts:145-206` | ✅ PASS |
| 3 Mobs2 bold lead-ins + case link | 4 leads, link `/casos/avaria` | `tests/content/home.test.ts:152-179`; render `tests/components/ExperienceEntry.test.tsx:44-45` (`<strong>` lead) | ✅ PASS |
| 4 no period -> no element | no text, no empty element | `tests/components/ExperienceEntry.test.tsx:37-38` `querySelector("[data-period]")` null | ✅ PASS |
| 5 stack | 3 main "fio principal", 9 others | `tests/components/StackSection.test.tsx:31,36`; `tests/content/home.test.ts:223-242` | ✅ PASS |

### P1: Método and Contato

| Criterion | Spec-defined outcome | `file:line` + assertion | Result |
| --------- | -------------------- | ----------------------- | ------ |
| 1 six steps 01-06 | titles and numbers in order | `tests/content/home.test.ts:278-285`; `tests/components/MethodSection.test.tsx:38-45` | ✅ PASS |
| 2 Eu/IA exact, no IA row when absent | verbatim; no row | `tests/content/home.test.ts:289-299`; `tests/components/MethodStep.test.tsx:37-40` `it.each([undefined,"","   "])` | ✅ PASS |
| 3 summary + link | exact text, `/casos/my-trello-version` | `tests/components/MethodSection.test.tsx:51,53-56` | ✅ PASS |
| 4 no "[conferir" | absent | `tests/components/MethodSection.test.tsx:61`; `tests/components/ContactSection.test.tsx:75`; `tests/components/HomeView.test.tsx:101-105` (content files) | ✅ PASS |
| 5 contact section | id `contato`, lead, CV button | `tests/components/ContactSection.test.tsx:16,24,30` | ✅ PASS |
| 6 e-mail/LinkedIn/GitHub | mailto, URLs, `rel` | `tests/components/ContactSection.test.tsx:53,60-62,68-70` | ✅ PASS |
| 7 WhatsApp button + card | href, `rel`, `target` | `tests/components/ContactSection.test.tsx:37-39,45-47` | ✅ PASS |
| 8 every Baixar CV has `download` | href + download | `tests/components/Hero.test.tsx:41-42`; `tests/components/ContactSection.test.tsx:30-31` | ✅ PASS |

### P2: Accessibility and responsiveness

| Criterion | Spec-defined outcome | `file:line` + assertion | Result |
| --------- | -------------------- | ----------------------- | ------ |
| 1 sections are landmarks with `aria-labelledby`; nav `aria-label` | each section named by its heading | `tests/components/Hero.test.tsx:62-70` - `getByRole("region",{name: h1.textContent})` has `aria-labelledby === h1.id`; `tests/components/ProjectsSection.test.tsx:11-13` and the 4 sibling section tests; `tests/components/SiteHeader.test.tsx:28` | ✅ PASS (Hero now named: `src/components/Hero.tsx:13,16`) |
| 2 skip link first, target `#conteudo` | first focusable, href | `tests/components/HomeView.test.tsx:20-22` | ✅ PASS |
| 3 heading outline | 1 h1, 5 h2, h3 for cards | `tests/components/HomeView.test.tsx:53-55` (h3 only `> 0`) | ✅ PASS (h3 count loose, covered per-section) |
| 4 section numbers aria-hidden | `aria-hidden="true"` | `tests/components/SectionHeading.test.tsx:11,29` | ✅ PASS |
| 5 no `text-brand` | none | `tests/components/HomeView.test.tsx:91-94` regex over all components | ✅ PASS |
| 6 no fixed width > 375 px | none | `tests/components/HomeView.test.tsx:107-114` | ✅ PASS (static, as spec asks) |

### P3: Metadata

| Criterion | Spec-defined outcome | `file:line` + assertion | Result |
| --------- | -------------------- | ----------------------- | ------ |
| 1 Foundation metadata unchanged | `site-metadata.test.ts` green | `tests/app/site-metadata.test.ts` passes in full gate (278/278); `src/app/site-metadata.ts` untouched by the range | ✅ PASS |

### Edge cases

- [x] Empty lists render no container: `ProjectCard.test.tsx:62` (dl), `ExperienceEntry.test.tsx:61`, `StackSection.test.tsx:54-55`.
- [x] No-JS: page is a static server render; only `SiteHeader` is a client component and links are plain anchors. No dedicated test (not testable in jsdom).
- [x] Sticky header offset: `scroll-mt-24` asserted on all five sections (`ProjectsSection.test.tsx:15`, `ExperienceSection.test.tsx:15`, `StackSection.test.tsx:15`, `MethodSection.test.tsx:15`, `ContactSection.test.tsx:17`) and `sticky` at `SiteHeader.test.tsx:43`.

**Status**: ✅ All ACs covered with spec-matching assertions; no spec-precision gap remains

---

## Discrimination Sensor

Scratch: temporary `git worktree --detach` at HEAD (`f41a78d`) with `node_modules` symlinked, mutated one line at a time, full `vitest run` (278 tests) per mutant, file restored after each, worktree removed and pruned. Real tree `git status --porcelain` identical to baseline afterwards (only the 4 untracked files: `.specs/LESSONS.md`, `.specs/features/home/validation.md`, `.specs/lessons.json`, `ui/Site vitrine pessoal.html`). No `git stash` used.

| Mutation | File:line | Description | Killed? |
| -------- | --------- | ----------- | ------- |
| M1 | `src/viewmodels/use-mobile-menu.ts:14` | Escape check -> `"Enter"` | ✅ Killed (2 failed) |
| M2 | `src/components/ExperienceEntry.tsx:26` | `{period ?` -> `{true ?` | ✅ Killed (1 failed) |
| M3 | `src/components/MethodStep.tsx:24` | `{ai ?` -> `{true ?` | ✅ Killed (3 failed) |
| M4 | `src/components/ContactCard.tsx:12` | `rel` drops `noreferrer` | ✅ Killed (4 failed) |
| M5 | `src/components/SiteHeader.tsx:35` | `aria-expanded={isOpen}` -> `{false}` | ✅ Killed (1 failed) |
| M6 | `src/content/home.ts:218-219` | e-mail typo `gmai.com` | ✅ Killed (2 failed) |
| M7 | `src/components/Hero.tsx:37` | removed `priority` from portrait `<Image>` (previous survivor) | ✅ Killed (1 failed: `Hero.test.tsx` "serves the portrait with priority") |
| M8 | `src/components/SectionHeading.tsx:26` | removed `aria-hidden` from section number | ✅ Killed (2 failed) |
| M9 | `src/viewmodels/home-view-model.ts:17` | `hasItems` drops `length > 0` | ✅ Killed (2 failed) |
| M10 | `src/components/ProjectsSection.tsx:15` | removed `aria-labelledby` | ✅ Killed (1 failed) |
| M11 | `src/components/ProjectCard.tsx:48` | repo link never rendered | ✅ Killed (1 failed) |
| M12 | `src/components/SkipLink.tsx:9` | skip link href -> `#top` | ✅ Killed (2 failed) |
| M13 | `src/components/Hero.tsx:13` | removed `aria-labelledby` from hero section (new) | ✅ Killed (1 failed: "names the hero section by its h1") |
| M14 | `src/components/Hero.tsx:16` | h1 id changed so it no longer matches `aria-labelledby` (new) | ✅ Killed (1 failed) |
| M15 | `src/app/page.tsx:6` | injected PT-BR literal `<p>Olá mundo</p>` in `src/app` (new) | ✅ Killed (3 failed, incl. the PT-BR guard) |
| M16 | `src/app/layout.tsx:20` | injected PT-BR literal `<p>Rodapé do site</p>` in layout (new) | ✅ Killed (1 failed: guard "keeps PT-BR text out of JSX children") |
| M17 | `src/components/Hero.tsx:36` | removed `sizes` prop from portrait `<Image>` | ❌ Survived (278 passed) - informational, see note |

**Sensor depth**: expanded (17 mutations)
**Result**: 16/17 killed - ✅ PASS (the survivor is not tied to an AC)

M17 note: `sizes` is a responsive-image optimization hint. No spec AC, Goal or Assumption requires it (Goal 3 asks for `next/image` + no layout shift, which `width`/`height` asserted at `Hero.test.tsx:50-51` already guarantee). Not a gap; optional hardening only.

---

## Code Quality

| Principle | Status |
| --------- | ------ |
| Minimum code | ✅ |
| Surgical changes (fix commits touch only Hero, Hero test, HomeView test, content line breaks, tasks/spec status) | ✅ |
| No scope creep | ✅ |
| Matches patterns (`aria-labelledby` + `id` pattern as sibling sections) | ✅ |
| Spec-anchored outcome check (asserted values match spec) | ✅ |
| Per-layer Coverage Expectation met (content 1:1 verbatim, components render/edge, viewmodels unit) | ✅ |
| Every test maps to a spec requirement - no unclaimed tests | ✅ |
| Documented guidelines followed: `CLAUDE.md` (tests apart in `tests/`, English code, PT-BR only in `src/content/`) | ✅ |

---

## Edge Cases

- [x] Empty lists render no container: `tests/components/ProjectCard.test.tsx:60-69`, `tests/components/ExperienceEntry.test.tsx:59-62`, `tests/components/StackSection.test.tsx:52-55`.
- [x] No-JS: static server render; only `SiteHeader` is a client component, links are plain anchors. Not testable in jsdom; covered by design.
- [x] Sticky header offset: `scroll-mt-24` asserted on all five sections (`ProjectsSection.test.tsx:13`, `ExperienceSection.test.tsx:15`, `StackSection.test.tsx:15`, `MethodSection.test.tsx:15`, `ContactSection.test.tsx:17`), `sticky` at `SiteHeader.test.tsx:43`.

---

## Gate Check

- **Gate command**: `pnpm lint && pnpm typecheck && pnpm test && pnpm build`
- **Result**: exit 0; 278 passed, 0 failed, 0 skipped (36 test files); `next build` prerendered `/` and `/_not-found` static
- **Test count before this iteration**: 276 (previous report); **after**: 278; **Delta**: +2 (priority guard, hero landmark); the `src/app` scan extends two existing tests
- **Skipped tests**: none
- **Failures**: none

---

## Fix Plans

None required. Optional (non-blocking): assert `sizes` on the hero portrait (M17).

---

## Requirement Traceability Update

| Requirement | Previous Status | New Status |
| ----------- | --------------- | ---------- |
| HOME-01 to HOME-11 | Pending | ✅ Verified |

---

## Summary

**Overall**: ✅ Ready

**Spec-anchored check**: 35/35 ACs matched spec outcome (8 + 7 + 5 + 8 + 6 + 1); 0 spec-precision gaps
**Sensor**: 16/17 mutations killed (survivor M17 outside any AC)
**Gate**: 278 passed, 0 failed

**What works**: all eight blocks, links, a11y landmarks, PT-BR content guard across `src/components` and `src/app`, hero LCP priority.

**Issues found**: none blocking.

**Next steps**: open the PR (ask the user first, per `CLAUDE.md`); optionally verify in a browser.
