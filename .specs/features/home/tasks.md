# Home Tasks

## Execution Protocol (MANDATORY -- do not skip)

Implement these tasks with the `tlc-spec-driven` skill: **activate it by name and follow its Execute flow and Critical Rules.** Do not search for skill files by filesystem path. The skill is the source of truth for the full flow (per-task cycle, sub-agent delegation, adequacy review, Verifier, discrimination sensor).

**If the skill cannot be activated, STOP and tell the user - do not proceed without it.**

---

**Design**: `.specs/features/home/design.md`
**Status**: Draft

---

## Test Coverage Matrix

> Generated from project guidelines and existing tests - confirm before Execute. Guidelines found: `CLAUDE.md` (Vitest + Testing Library, `tests/` mirrors `src/`, see red first, tests in the same commit, no PT-BR in components), `vitest.config.ts`, `tests/structure.test.ts` (flat mirror guard), `eslint.config.mjs` (AD-002), `.specs/STATE.md` (AD-001, AD-002). Existing samples: `tests/components/HomePlaceholder.test.tsx`, `tests/app/public-assets.test.ts`, `tests/content/site.test.ts`.

| Code Layer | Required Test Type | Coverage Expectation | Location Pattern | Run Command |
| ---------- | ------------------ | -------------------- | ---------------- | ----------- |
| Content (`src/content/home.ts`) | unit | Every string, link and list the spec names, asserted verbatim; no placeholder text | `tests/content/home.test.ts` | `pnpm test` |
| Models (`src/models/home-content.ts`) | none | Types only; checked by `pnpm typecheck` and by the content tests that satisfy them | - | build gate only |
| ViewModels (`src/viewmodels`) | unit | All branches; 1:1 to spec ACs; every listed edge case (empty period, empty IA, Escape, listener cleanup) | `tests/viewmodels/*.test.ts(x)` | `pnpm test` |
| Views (`src/components`) | unit | Render with props: one assertion per spec outcome (text, role, href, `rel`, `target`, aria attributes); source scan proves no PT-BR literal | `tests/components/*.test.tsx` | `pnpm test` |
| App wiring (`src/app/page.tsx`) | unit | Rendered page shows the Home; Foundation metadata tests stay green | `tests/app/page.test.tsx` | `pnpm test` |
| Static assets (`public/`) | unit | Files exist, valid signature (PNG 1254x1254, PDF `%PDF`), allow-list updated | `tests/app/public-assets.test.ts` | `pnpm test` |

## Gate Check Commands

> Generated from `package.json` scripts - confirm before Execute.

| Gate Level | When to Use | Command |
| ---------- | ----------- | ------- |
| Quick | Tasks with unit tests only | `pnpm test` |
| Full | Tasks that touch types, lint-sensitive code or `src/app` | `pnpm lint && pnpm typecheck && pnpm test` |
| Build | Phase completion and the assembly tasks | `pnpm lint && pnpm typecheck && pnpm test && pnpm build` |

Every task starts with its test written and seen failing for the right reason (project rule "see red first"), then the code that turns it green.

---

## Execution Plan

Phases are ordered and run sequentially - each phase completes before the next begins, and tasks within a phase execute in order.

### Phase 1: Assets, model and primitives

```
T1 → T2
T4 → T5
```

### Phase 2: Page shell

```
T3 → T9
T3 → T10
T4 → T10
T8 → T10
T3 → T11
```

### Phase 3: Hero and Projetos

```
T1 → T12
T5 → T12
T6 → T13
T7 → T14
T13 → T14
```

### Phase 4: Experiência and Stack

```
T6 → T16
T15 → T16
T7 → T17
T16 → T17
T6 → T18
T7 → T18
```

### Phase 5: Método and Contato

```
T15 → T19
T19 → T20
T7 → T21
T20 → T21
T4 → T22
T5 → T23
T7 → T23
T22 → T23
```

### Phase 6: Assembly and guards

```
T9 → T24
T10 → T24
T11 → T24
T12 → T24
T14 → T24
T17 → T24
T18 → T24
T21 → T24
T23 → T24
T24 → T25
```

---

## Task Breakdown

### T1: Add the hero portrait asset

**What**: Copy `ui/images/Retrato Profissional em Setup Roxo.png` to `public/rafael-portrait.png`, and add it to the allow-list of `tests/app/public-assets.test.ts` with a PNG-signature and 1254x1254 check.
**Where**: `public/rafael-portrait.png`
**Depends on**: None
**Reuses**: `tests/app/public-assets.test.ts` (signature/IHDR pattern from the og-image test)
**Requirement**: HOME-01

**Tools**:

- MCP: NONE
- Skill: NONE

**Done when**:

- [ ] Test added first and seen failing (file missing, allow-list rejects nothing yet)
- [ ] `public/rafael-portrait.png` is a PNG, 1254 x 1254
- [ ] The "no image besides the expected ones" test lists the new file
- [ ] Gate check passes: `pnpm test`
- [ ] Test count: previous count + 2 tests, none removed

**Tests**: unit
**Gate**: quick

**Commit**: `feat(assets): add hero portrait to public`

---

### T2: Add the CV PDF asset

**What**: Copy `/home/rafael/Downloads/CUrriculo/Currículo Desenvolvedor Full Stack Pleno - Rafael Couto Silva.pdf` to `public/cv-rafael-couto-silva.pdf`, and extend the same test file with a `%PDF` header check and the allow-list entry.
**Where**: `public/cv-rafael-couto-silva.pdf`
**Depends on**: T1
**Reuses**: `tests/app/public-assets.test.ts`
**Requirement**: HOME-09

**Tools**:

- MCP: NONE
- Skill: NONE

**Done when**:

- [x] Test added first and seen failing (file missing)
- [x] File starts with `%PDF` and is non-empty
- [x] Allow-list test lists the PDF
- [x] Gate check passes: `pnpm test`
- [x] Test count: previous count + 2 tests, none removed

**Tests**: unit
**Gate**: quick

**Commit**: `feat(assets): add CV PDF to public`

---

### T3: Add the home model types and the chrome content

**What**: Create `src/models/home-content.ts` with `Link`, `Metric` and the `HomeContent` shape from the design (sections not built yet use their final type; only `chrome` is filled in `homeContent` for now, so `HomeContent` is declared as `Pick<..., "chrome">`-compatible by building it up per slice). Create `src/content/home.ts` exporting `homeContent` with `chrome`: skip-link label, ids `conteudo`/`top`, nav `aria-label` and five links (Projetos, Experiência, Stack, Método, Contato → `projetos`, `experiencia`, `stack`, `metodo`, `contato`), menu button labels, footer copyright "© 2026 Rafael Couto Silva" and back-to-top link `#top`.
**Where**: `src/content/home.ts`
**Depends on**: None
**Reuses**: `src/content/site.ts` pattern
**Requirement**: HOME-02, HOME-03

**Tools**:

- MCP: NONE
- Skill: NONE

**Done when**:

- [x] `tests/content/home.test.ts` written first and seen failing (module missing)
- [x] Test asserts the five nav labels/section ids in order, footer text, back-to-top href `#top`, main id `conteudo`
- [x] Model file imports nothing from React/Next (ESLint boundary passes)
- [x] Gate check passes: `pnpm lint && pnpm typecheck && pnpm test`
- [x] Test count: previous count + at least 4 tests

**Tests**: unit
**Gate**: full

**Commit**: `feat(content): add home model types and chrome copy`

---

### T4: Create the `Icon` component

**What**: Decorative inline SVG icon set: `download`, `mail`, `linkedin`, `github`, `whatsapp`, `menu`, `close`, `arrow`. Always `aria-hidden="true"` and `focusable="false"`.
**Where**: `src/components/Icon.tsx`
**Depends on**: None
**Reuses**: stroke style from the design board (`stroke-width: 1.8`, round caps)
**Requirement**: HOME-10

**Tools**:

- MCP: NONE
- Skill: NONE

**Done when**:

- [x] `tests/components/Icon.test.tsx` written first and seen failing
- [x] Each name renders one `svg` with `aria-hidden="true"`
- [x] Merges an optional `className`
- [x] Gate check passes: `pnpm test`
- [x] Test count: previous count + at least 3 tests

**Tests**: unit
**Gate**: quick

**Commit**: `feat(ui): add decorative Icon component`

---

### T5: Create the `ButtonLink` component

**What**: Anchor styled as `primary` or `ghost` button. Props: `link: Link`, `variant`, optional `icon`, optional `download`. External links add `target="_blank"` and `rel="noopener noreferrer"`; `download` adds the attribute.
**Where**: `src/components/ButtonLink.tsx`
**Depends on**: T4
**Reuses**: `Icon`, tokens (`bg-brand`, `border-brand-text/50`), design `.btn` rules
**Requirement**: HOME-04, HOME-09

**Tools**:

- MCP: NONE
- Skill: NONE

**Done when**:

- [x] `tests/components/ButtonLink.test.tsx` written first and seen failing
- [x] Internal link has `href` and no `target`/`rel`
- [x] External link has `target="_blank"` and `rel="noopener noreferrer"`
- [x] `download` prop sets the `download` attribute; icon renders when given
- [x] No PT-BR literal in the source (regex scan like `HomePlaceholder.test.tsx`)
- [x] Gate check passes: `pnpm test`
- [x] Test count: previous count + at least 5 tests

**Tests**: unit
**Gate**: quick

**Commit**: `feat(ui): add ButtonLink component`

---

### T6: Create the `Chip` component

**What**: Mono tag with the default and `main` (brand) variants; renders its `label` prop.
**Where**: `src/components/Chip.tsx`
**Depends on**: None
**Reuses**: design `.chip` / `.chip-main`
**Requirement**: HOME-05

**Tools**:

- MCP: NONE
- Skill: NONE

**Done when**:

- [x] `tests/components/Chip.test.tsx` written first and seen failing
- [x] Renders the label text; `main` adds the brand border class, default does not
- [x] Gate check passes: `pnpm test`
- [x] Test count: previous count + at least 2 tests

**Tests**: unit
**Gate**: quick

**Commit**: `feat(ui): add Chip component`

---

### T7: Create the `SectionHeading` component

**What**: Eyebrow plus `h2`. The eyebrow's number (text before the first ` · `) goes in an `aria-hidden="true"` span; the `h2` gets the given `id`.
**Where**: `src/components/SectionHeading.tsx`
**Depends on**: None
**Reuses**: design `.eyebrow` and `.h2`
**Requirement**: HOME-10

**Tools**:

- MCP: NONE
- Skill: NONE

**Done when**:

- [x] `tests/components/SectionHeading.test.tsx` written first and seen failing
- [x] `"01 · Destaques"` renders "01" in an `aria-hidden` span and "Destaques" visible; `h2` has the id and the title
- [x] An eyebrow with no ` · ` renders fully visible, with no empty `aria-hidden` span
- [x] Gate check passes: `pnpm test`
- [x] Test count: previous count + at least 3 tests

**Tests**: unit
**Gate**: quick

**Commit**: `feat(ui): add SectionHeading component`

---

### T8: Create the `useMobileMenu` ViewModel

**What**: Hook returning `{ isOpen, toggle, close }`. Starts closed. While open, pressing Escape closes it. The `keydown` listener is added only while open and removed on close and unmount.
**Where**: `src/viewmodels/use-mobile-menu.ts`
**Depends on**: None
**Reuses**: n/a
**Requirement**: HOME-02

**Tools**:

- MCP: NONE
- Skill: NONE

**Done when**:

- [x] `tests/viewmodels/use-mobile-menu.test.tsx` written first (`renderHook`) and seen failing
- [x] Initial state closed; `toggle` opens, second `toggle` closes; `close` closes
- [x] Escape closes when open and does nothing when closed
- [x] After close and after unmount no `keydown` listener remains (spy on `add/removeEventListener`)
- [x] Gate check passes: `pnpm lint && pnpm typecheck && pnpm test`
- [x] Test count: previous count + at least 6 tests

**Tests**: unit
**Gate**: full

**Commit**: `feat(viewmodels): add mobile menu state hook`

---

### T9: Create the `SkipLink` component

**What**: Anchor with `href="#conteudo"` (target id from props), visually hidden until focused.
**Where**: `src/components/SkipLink.tsx`
**Depends on**: T3
**Reuses**: `homeContent.chrome.skipLinkLabel` shape
**Requirement**: HOME-10

**Tools**:

- MCP: NONE
- Skill: NONE

**Done when**:

- [ ] `tests/components/SkipLink.test.tsx` written first and seen failing
- [ ] Renders a link with the given label and `href="#conteudo"`; has the focus-reveal class (`sr-only` + `focus:not-sr-only`)
- [ ] No PT-BR literal in source
- [ ] Gate check passes: `pnpm test`
- [ ] Test count: previous count + at least 3 tests

**Tests**: unit
**Gate**: quick

**Commit**: `feat(ui): add skip link`

---

### T10: Create the `SiteHeader` component

**What**: Client component. Brand link to `#top`, `nav` with `aria-label` and five links (hidden below `md`), menu button (`aria-expanded`, `aria-controls`, label from content) and the panel with the same links, shown only while open. Uses `useMobileMenu`; clicking a panel link closes it.
**Where**: `src/components/SiteHeader.tsx`
**Depends on**: T3, T4, T8
**Reuses**: `useMobileMenu`, `Icon`, `homeContent.chrome`
**Requirement**: HOME-02

**Tools**:

- MCP: NONE
- Skill: NONE

**Done when**:

- [x] `tests/components/SiteHeader.test.tsx` written first and seen failing
- [x] Nav shows the five links with hrefs `#projetos`, `#experiencia`, `#stack`, `#metodo`, `#contato`
- [x] Inline nav has the `hidden md:flex` classes; menu button has `md:hidden`
- [x] Clicking the button: `aria-expanded="true"` and the panel lists five links; clicking a panel link closes it (`aria-expanded="false"`); Escape closes it
- [x] Header has sticky positioning class; no PT-BR literal in source
- [x] Gate check passes: `pnpm lint && pnpm typecheck && pnpm test`
- [x] Test count: previous count + at least 7 tests

**Tests**: unit
**Gate**: full

**Commit**: `feat(ui): add site header with mobile menu`

---

### T11: Create the `SiteFooter` component

**What**: Footer with the copyright text and the "Voltar ao topo" link to `#top`, both from props.
**Where**: `src/components/SiteFooter.tsx`
**Depends on**: T3
**Reuses**: `homeContent.chrome.footer`
**Requirement**: HOME-02

**Tools**:

- MCP: NONE
- Skill: NONE

**Done when**:

- [x] `tests/components/SiteFooter.test.tsx` written first and seen failing
- [x] Renders a `contentinfo` landmark, "© 2026 Rafael Couto Silva" and a link "Voltar ao topo" with `href="#top"`
- [x] No PT-BR literal in source
- [x] Gate check passes: `pnpm test`
- [x] Test count: previous count + at least 3 tests

**Tests**: unit
**Gate**: quick

**Commit**: `feat(ui): add site footer`

---

### T12: Create the `Hero` component and hero content

**What**: Add the hero slice to model and `homeContent`: label "Desenvolvedor de software", headline "Especialista Full Stack do requisito à produção", badge "SDD" + text "Especialista em desenvolvimento guiado por especificações", intro "Construo software de ponta a ponta, do requisito à produção, guiado por especificações.", stack line `TypeScript · React · Node`, actions (Contato → `#contato`, Baixar CV → `/cv-rafael-couto-silva.pdf`), portrait (`/rafael-portrait.png`, 1254x1254, alt "Retrato profissional de Rafael Couto Silva em um setup roxo", caption "Retrato criado com IA a partir de uma foto minha"). `Hero` renders the only `h1`, two `ButtonLink`s and the portrait via `next/image` with `priority`, `width`, `height`, `sizes`, plus a `figcaption`.
**Where**: `src/components/Hero.tsx`
**Depends on**: T1, T5
**Reuses**: `ButtonLink`, `next/image`
**Requirement**: HOME-01, HOME-04

**Tools**:

- MCP: NONE
- Skill: NONE

**Done when**:

- [x] Tests written first and seen failing: `tests/content/home.test.ts` (hero strings, hrefs, portrait path/size/alt/caption) and `tests/components/Hero.test.tsx`
- [x] Exactly one `h1` with the headline; label, badge, intro and stack line render
- [x] "Contato" has `href="#contato"`; "Baixar CV" has `href="/cv-rafael-couto-silva.pdf"` and `download`
- [x] Portrait `img` has the alt text, width/height attributes and a `figcaption` with the caption
- [x] No PT-BR literal in source
- [x] Gate check passes: `pnpm lint && pnpm typecheck && pnpm test`
- [x] Test count: previous count + at least 8 tests

**Tests**: unit
**Gate**: full

**Commit**: `feat(ui): add hero section with portrait and actions`

---

### T13: Create the `ProjectCard` component and projects content

**What**: Add the projects slice to model and content. Avaria: context "Trabalho · Mobs2" / "App + API", description, metrics (Em produção +4 anos; Clientes +1 mil; Decisão de stack AdonisJS), tags (TypeScript, React Native, Node.js · AdonisJS, SQL Server), case link → `/casos/avaria`. My Trello Version: "Projeto pessoal · solo" / "Código aberto", description, metrics (~456 PRs mergeados; ~1.400 commits na main; ~238 arquivos de teste), tags (NestJS, React 19, PostgreSQL, Docker), case link → `/casos/my-trello-version`, repo link "Repositório no GitHub" → `https://github.com/rafaelcsilvadev/my-trello-version`. `ProjectCard` renders an `article` with `h3`, metrics, `Chip`s, a stretched case link and the optional repo link above the overlay.
**Where**: `src/components/ProjectCard.tsx`
**Depends on**: T6
**Reuses**: `Chip`
**Requirement**: HOME-05

**Tools**:

- MCP: NONE
- Skill: NONE

**Done when**:

- [x] Tests written first and seen failing: content test (all strings above verbatim) and `tests/components/ProjectCard.test.tsx`
- [x] Card shows context, `h3` title, description, every metric label and value, every tag
- [x] "Ver o caso" link has the card's `caseLink` href; repo link has `target="_blank"` and `rel="noopener noreferrer"`; without `repoLink` no repo link renders
- [x] Empty `metrics` or `tags` renders no container for them
- [x] No PT-BR literal in source
- [x] Gate check passes: `pnpm lint && pnpm typecheck && pnpm test`
- [x] Test count: previous count + at least 9 tests

**Tests**: unit
**Gate**: full

**Commit**: `feat(ui): add project card with featured projects content`

---

### T14: Create the `ProjectsSection` component

**What**: `section#projetos` with `aria-labelledby` pointing at the `SectionHeading` id, `scroll-mt-24`, heading "01 · Destaques" / "Projetos em destaque", and the two cards.
**Where**: `src/components/ProjectsSection.tsx`
**Depends on**: T7, T13
**Reuses**: `SectionHeading`, `ProjectCard`
**Requirement**: HOME-05, HOME-10

**Tools**:

- MCP: NONE
- Skill: NONE

**Done when**:

- [x] `tests/components/ProjectsSection.test.tsx` written first and seen failing
- [x] Region found by name "Projetos em destaque"; `id="projetos"`; `scroll-mt-24`
- [x] Two `h3` (Avaria, My Trello Version) under one `h2`, in that order
- [x] No PT-BR literal in source
- [x] Gate check passes: `pnpm test`
- [x] Test count: previous count + at least 4 tests

**Tests**: unit
**Gate**: quick

**Commit**: `feat(ui): add projects section`

---

### T15: Add experience model type and `toExperienceEntryView`

**What**: Add `ExperienceEntry` (and `ExperienceEntryView`) to `src/models/home-content.ts`. Create `src/viewmodels/home-view-model.ts` with `toExperienceEntryView` (empty or whitespace `period` becomes `undefined`) and `hasItems`.
**Where**: `src/viewmodels/home-view-model.ts`
**Depends on**: None
**Reuses**: n/a
**Requirement**: HOME-06

**Tools**:

- MCP: NONE
- Skill: NONE

**Done when**:

- [ ] `tests/viewmodels/home-view-model.test.ts` written first and seen failing
- [ ] `period: "ago. de 2025 - set. de 2026"` is kept; `""`, `"   "` and missing become `undefined`
- [ ] Other fields pass through unchanged; `hasItems` is false for `undefined` and `[]`, true otherwise
- [ ] File imports nothing from React/Next
- [ ] Gate check passes: `pnpm lint && pnpm typecheck && pnpm test`
- [ ] Test count: previous count + at least 5 tests

**Tests**: unit
**Gate**: full

**Commit**: `feat(viewmodels): add experience entry view model`

---

### T16: Create the `ExperienceEntry` component and experience content

**What**: Add the experience slice to content. Mobs2 (duration "4 anos"): achievements Avaria., REALI., "M2, produto principal da empresa.", "MyMobs, MobsTrack, Mobs2 School e Boletim Diário." as bold lead-ins, tags (React Native, Node.js, React, Next.js, Flutter, Laravel, Vue.js, SQL Server, Azure DevOps), note "Squads com UX, QA e back-end. Entregas por CI/CD e queries otimizadas.", link "Ver o caso Avaria" → `/casos/avaria`. Duo Technology ("ago. de 2025 - set. de 2026"): FOCO and Coral achievements, tags (Node.js, React Native, Angular, Jest, DDD · SOLID), note "Claude Code no dia a dia, com revisão de todo código gerado antes do PR." Globals · Missão Crítica ("nov. de 2022 - jan. de 2023"): 3-month road-monitoring system achievements, tags (.NET, Angular, Integração com hardware). All with role "Desenvolvedor Full Stack". `ExperienceEntry` renders `h3` company, role, optional period/duration, achievements with `<strong>` lead-in, `Chip`s, note and link, using `toExperienceEntryView`.
**Where**: `src/components/ExperienceEntry.tsx`
**Depends on**: T6, T15
**Reuses**: `Chip`, `toExperienceEntryView`
**Requirement**: HOME-06

**Tools**:

- MCP: NONE
- Skill: NONE

**Done when**:

- [ ] Tests written first and seen failing: content test (three entries, order, periods, every achievement and tag verbatim, no `[PERÍODO]`) and `tests/components/ExperienceEntry.test.tsx`
- [ ] Lead-in renders inside `<strong>` followed by the text
- [ ] With no period no period element renders; with a period it renders
- [ ] Link renders only when the entry has one; empty `tags` renders no tag container
- [ ] No PT-BR literal in source
- [ ] Gate check passes: `pnpm lint && pnpm typecheck && pnpm test`
- [ ] Test count: previous count + at least 10 tests

**Tests**: unit
**Gate**: full

**Commit**: `feat(ui): add experience entry with experience content`

---

### T17: Create the `ExperienceSection` component

**What**: `section#experiencia` with heading "02 · Experiência" / "Onde construí" and the three entries in order, `scroll-mt-24`.
**Where**: `src/components/ExperienceSection.tsx`
**Depends on**: T7, T16
**Reuses**: `SectionHeading`, `ExperienceEntry`
**Requirement**: HOME-06, HOME-10

**Tools**:

- MCP: NONE
- Skill: NONE

**Done when**:

- [ ] `tests/components/ExperienceSection.test.tsx` written first and seen failing
- [ ] Region named "Onde construí", `id="experiencia"`, `scroll-mt-24`
- [ ] Three `h3` in order: Mobs2, Duo Technology, Globals · Missão Crítica
- [ ] No PT-BR literal in source
- [ ] Gate check passes: `pnpm test`
- [ ] Test count: previous count + at least 4 tests

**Tests**: unit
**Gate**: quick

**Commit**: `feat(ui): add experience section`

---

### T18: Create the `StackSection` component and stack content

**What**: Stack slice: heading "03 · Stack" / "Onde sou mais forte"; main TypeScript, React, Node each with note "fio principal" (as `Chip` `main`); "também já trabalhei com" followed by Next.js, React Native, Flutter, Laravel, Vue.js, AdonisJS, .NET, Angular, SQL Server. `section#stack`, `scroll-mt-24`.
**Where**: `src/components/StackSection.tsx`
**Depends on**: T6, T7
**Reuses**: `Chip`, `SectionHeading`
**Requirement**: HOME-07, HOME-10

**Tools**:

- MCP: NONE
- Skill: NONE

**Done when**:

- [ ] Tests written first and seen failing: content test (3 main + 9 others verbatim, in order) and `tests/components/StackSection.test.tsx`
- [ ] Three "fio principal" labels; nine secondary chips; `id="stack"`
- [ ] Empty `others` renders no secondary container
- [ ] No PT-BR literal in source
- [ ] Gate check passes: `pnpm lint && pnpm typecheck && pnpm test`
- [ ] Test count: previous count + at least 7 tests

**Tests**: unit
**Gate**: full

**Commit**: `feat(ui): add stack section`

---

### T19: Add method model type and `toMethodStepView`

**What**: Add `MethodStep` / `MethodStepView` to the model. Add `toMethodStepView` to `home-view-model.ts`: empty or whitespace `ai` becomes `undefined`; `human` and `highlight` pass through.
**Where**: `src/viewmodels/home-view-model.ts` (modify)
**Depends on**: T15
**Reuses**: `home-view-model.ts` from T15
**Requirement**: HOME-08

**Tools**:

- MCP: NONE
- Skill: NONE

**Done when**:

- [ ] Tests added first to `tests/viewmodels/home-view-model.test.ts` and seen failing
- [ ] `ai: "text"` kept; `ai: ""`, whitespace and missing become `undefined`; `highlight` defaults to `false`
- [ ] Gate check passes: `pnpm lint && pnpm typecheck && pnpm test`
- [ ] Test count: previous count + at least 4 tests, none removed

**Tests**: unit
**Gate**: full

**Commit**: `feat(viewmodels): add method step view model`

---

### T20: Create the `MethodStep` component and method content

**What**: Method slice with six steps: 01 Spec (Eu: "Entendo o projeto e decido o que cada feature precisa."; IA: "Me ajuda a entender o projeto e cria a spec de cada feature."), 02 Design (Eu: "Decido a arquitetura e os contratos."), 03 Tarefas (Eu: "Aprovo o recorte: uma tarefa por branch e por PR."), 04 Teste vermelho (Eu: "Reviso os testes no PR."; IA: "Cria os testes com TDD: o teste vermelho vem antes do código."; `highlight`), 05 Código (Eu: "Exijo commits pequenos."; IA: "Implementa até o teste passar."), 06 PR com revisão humana (Eu: "Reviso cada Pull Request antes do merge."; IA: "Me envia o link do PR."). `MethodStep` renders the number, `h3` title, "Eu" row and optional "IA" row using `toMethodStepView`.
**Where**: `src/components/MethodStep.tsx`
**Depends on**: T19
**Reuses**: `toMethodStepView`
**Requirement**: HOME-08

**Tools**:

- MCP: NONE
- Skill: NONE

**Done when**:

- [ ] Tests written first and seen failing: content test (six steps, numbers 01-06, every Eu/IA line verbatim; Design and Tarefas have no IA) and `tests/components/MethodStep.test.tsx`
- [ ] "Eu" row always renders; "IA" row renders only when text exists
- [ ] `highlight` adds the red-test style class; default does not
- [ ] No PT-BR literal in source
- [ ] Gate check passes: `pnpm lint && pnpm typecheck && pnpm test`
- [ ] Test count: previous count + at least 8 tests

**Tests**: unit
**Gate**: full

**Commit**: `feat(ui): add method step with method content`

---

### T21: Create the `MethodSection` component

**What**: `section#metodo` with heading "04 · Método (SDD)" / "Especificação antes do código", the intro "Desenvolvimento guiado por especificações, com a IA onde ela ajuda e eu revisando cada PR antes do merge. É o ciclo que uso no My Trello Version.", six steps, summary "~456 PRs mergeados · ~238 arquivos de teste · CI com checagens obrigatórias" and link "Ver o método no My Trello Version" → `/casos/my-trello-version`. `scroll-mt-24`.
**Where**: `src/components/MethodSection.tsx`
**Depends on**: T7, T20
**Reuses**: `SectionHeading`, `MethodStep`
**Requirement**: HOME-08, HOME-10

**Tools**:

- MCP: NONE
- Skill: NONE

**Done when**:

- [ ] Tests written first and seen failing: content test (intro, summary, link href; text never contains `[conferir`) and `tests/components/MethodSection.test.tsx`
- [ ] Region named "Especificação antes do código", `id="metodo"`; six `h3` in order
- [ ] Summary and link render; rendered HTML never contains `[conferir`
- [ ] No PT-BR literal in source
- [ ] Gate check passes: `pnpm lint && pnpm typecheck && pnpm test`
- [ ] Test count: previous count + at least 6 tests

**Tests**: unit
**Gate**: full

**Commit**: `feat(ui): add method section`

---

### T22: Create the `ContactCard` component

**What**: Link card with an `Icon`, a label and a value. Props: `icon`, `label`, `value`, `href`, `external?`. External cards add `target="_blank"` and `rel="noopener noreferrer"`.
**Where**: `src/components/ContactCard.tsx`
**Depends on**: T4
**Reuses**: `Icon`, design `.contact`
**Requirement**: HOME-09

**Tools**:

- MCP: NONE
- Skill: NONE

**Done when**:

- [ ] `tests/components/ContactCard.test.tsx` written first and seen failing
- [ ] Renders label, value and a link with the given `href`
- [ ] `external` adds `target="_blank"` and `rel="noopener noreferrer"`; without it neither attribute is present (mailto)
- [ ] No PT-BR literal in source
- [ ] Gate check passes: `pnpm test`
- [ ] Test count: previous count + at least 4 tests

**Tests**: unit
**Gate**: quick

**Commit**: `feat(ui): add contact card`

---

### T23: Create the `ContactSection` component and contact content

**What**: Contact slice: heading "05 · Contato" / "Vamos conversar", lead "Para vaga ou projeto, escolha o canal.", "Baixar CV" (`/cv-rafael-couto-silva.pdf`, download), "Chamar no WhatsApp" (`https://wa.me/5524999644346`, external), cards E-mail `rafacsilva016@gmail.com` (`mailto:`), LinkedIn `linkedin.com/in/rafa-couto` (`https://linkedin.com/in/rafa-couto`), GitHub `github.com/rafaelcsilvadev` (`https://github.com/rafaelcsilvadev`), WhatsApp "Abrir conversa" (`https://wa.me/5524999644346`). `section#contato`, `scroll-mt-24`.
**Where**: `src/components/ContactSection.tsx`
**Depends on**: T5, T7, T22
**Reuses**: `ButtonLink`, `ContactCard`, `SectionHeading`
**Requirement**: HOME-09, HOME-10

**Tools**:

- MCP: NONE
- Skill: NONE

**Done when**:

- [ ] Tests written first and seen failing: content test (every value and href above verbatim; e-mail is `rafacsilva016@gmail.com`, not the design typo) and `tests/components/ContactSection.test.tsx`
- [ ] "Baixar CV" has the PDF `href` and `download`
- [ ] The WhatsApp button and card both point to `https://wa.me/5524999644346` with `rel="noopener noreferrer"` and `target="_blank"`
- [ ] LinkedIn and GitHub cards are external; e-mail card is `mailto:` with no `target`
- [ ] `id="contato"`, `scroll-mt-24`; no PT-BR literal in source
- [ ] Gate check passes: `pnpm lint && pnpm typecheck && pnpm test`
- [ ] Test count: previous count + at least 9 tests

**Tests**: unit
**Gate**: full

**Commit**: `feat(ui): add contact section with contact content`

---

### T24: Compose `HomeView`, wire `page.tsx` and remove the placeholder

**What**: `HomeView` renders `div#top` (gradient/grid background class), `SkipLink` first, `SiteHeader`, `main#conteudo` with `Hero`, `ProjectsSection`, `ExperienceSection`, `StackSection`, `MethodSection`, `ContactSection`, then `SiteFooter`. `src/app/page.tsx` renders `<HomeView content={homeContent} />`. Delete `HomePlaceholder.tsx` and its test; update `tests/app/page.test.tsx`.
**Where**: `src/components/HomeView.tsx`
**Depends on**: T9, T10, T11, T12, T14, T17, T18, T21, T23
**Reuses**: all components above; Foundation metadata untouched
**Requirement**: HOME-02, HOME-10, HOME-11

**Tools**:

- MCP: NONE
- Skill: NONE

**Done when**:

- [ ] Tests written first and seen failing: `tests/components/HomeView.test.tsx` and updated `tests/app/page.test.tsx`
- [ ] First focusable element is the skip link; one `main` with `id="conteudo"`; one `h1`
- [ ] Sections appear in order: Hero, Projetos, Experiência, Stack, Método, Contato; `#top` exists
- [ ] Heading outline: one `h1`, five `h2`, `h3` for cards, entries and steps
- [ ] `src/components/HomePlaceholder.tsx` and `tests/components/HomePlaceholder.test.tsx` deleted; no references remain
- [ ] `tests/app/site-metadata.test.ts` and the other Foundation tests pass unchanged
- [ ] Gate check passes: `pnpm lint && pnpm typecheck && pnpm test && pnpm build`
- [ ] `pnpm start` then `curl -s localhost:3000` returns HTML containing "Especialista Full Stack" and "Vamos conversar" and no `[PERÍODO]`, `[conferir` or `SEU-DOMINIO`

**Tests**: unit
**Gate**: build

**Commit**: `feat(home): compose the home page and remove the placeholder`

---

### T25: Add page-level guards

**What**: Guard tests over the whole Home source and content: no hardcoded PT-BR text in any `src/components/*.tsx` JSX (except `HomeView` composing props), no `text-brand` utility without a suffix (AD-001), every `src/components/` file has no `<img` outside `next/image`, content has no placeholder text, and no fixed width above 375 px in component class names.
**Where**: `tests/components/HomeView.test.tsx` (modify)
**Depends on**: T24
**Reuses**: regex-scan pattern from `HomePlaceholder.test.tsx`; `tests/helpers/contrast.ts`
**Requirement**: HOME-03, HOME-10

**Tools**:

- MCP: NONE
- Skill: NONE

**Done when**:

- [ ] Each guard seen failing by temporarily injecting one violation (a PT-BR literal, `text-brand`, `w-[400px]`, `[PERÍODO]`) and then reverting it
- [ ] All guards pass on the real source
- [ ] Gate check passes: `pnpm lint && pnpm typecheck && pnpm test && pnpm build`
- [ ] Test count: previous count + at least 5 tests, none removed

**Tests**: unit
**Gate**: build

**Commit**: `test(home): guard copy, brand color and layout rules`

---

## Phase Execution Map

```
Phase 1 → Phase 2 → Phase 3 → Phase 4 → Phase 5 → Phase 6
```

Run order inside each phase (a comma list, not a dependency chain; real dependencies are the `Depends on` fields):

| Phase | Run order |
| ----- | --------- |
| 1 | T1, T2, T3, T4, T5, T6, T7 |
| 2 | T8, T9, T10, T11 |
| 3 | T12, T13, T14 |
| 4 | T15, T16, T17, T18 |
| 5 | T19, T20, T21, T22, T23 |
| 6 | T24, T25 |

Execution is strictly sequential; the listed order is the run order. Task count: 25 (about 4 worker batches if sub-agents are accepted: Phases 1, 2+3, 4+5, 6 give 7, 7, 9, 2 tasks).

---

## Requirement coverage

| Requirement | Tasks |
| ----------- | ----- |
| HOME-01 | T1, T12 |
| HOME-02 | T3, T8, T10, T11, T24 |
| HOME-03 | T3, T25 |
| HOME-04 | T5, T12 |
| HOME-05 | T6, T13, T14 |
| HOME-06 | T15, T16, T17 |
| HOME-07 | T18 |
| HOME-08 | T19, T20, T21 |
| HOME-09 | T2, T5, T22, T23 |
| HOME-10 | T4, T7, T9, T14, T17, T18, T21, T23, T24, T25 |
| HOME-11 | T24 |

Coverage: 11 total, 11 mapped to tasks, 0 unmapped.
