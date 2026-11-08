# Case Pages Specification

## Problem Statement

The Home links "Ver o caso" to `/casos/avaria` and `/casos/my-trello-version`, but both routes return the Foundation 404. A recruiter who wants proof behind the two featured projects hits a dead end. The design has two boards for them ("Caso Avaria" and "Caso My Trello Version", desktop and mobile in `ui/Site vitrine pessoal-png/`). This feature builds both pages on the existing Foundation and Home components.

Avaria page blocks, in order: Header, back link, case hero (eyebrow, title, intro, facts bar), 01 Problema, 02 Decisão, 03 Resultado, Stack, "Próximo caso" card, Footer.

My Trello Version page blocks, in order: Header, back link, case hero (eyebrow, title, intro, GitHub and Contato buttons), 01 Objetivo, 02 Processo, 03 Evidências (metrics, highlights, board screenshot), Stack grouped by area, status note, "Código aberto" card, Footer.

## Goals

- [ ] `/casos/avaria` and `/casos/my-trello-version` render every block above with PT-BR copy read only from `src/content/`.
- [ ] Both pages are statically generated and reachable from the Home "Ver o caso" links.
- [ ] Every link on the case pages works: back to Home, header anchors, Contato, CV, GitHub, next case.
- [ ] `pnpm lint && pnpm typecheck && pnpm test && pnpm build` exit 0.

## Out of Scope

| Feature | Reason |
| ------- | ------ |
| Redesign of Home sections or the Home links | Home is validated; only the header/footer links need to work from a sub-route. |
| Mobile screenshot or video of Avaria | Not in the design; Avaria shows no image. |
| Case index page `/casos` | Not in the design. |
| Scroll animations, analytics, comments, EN/i18n | Not in the design. |
| Deployment, domain wiring | Separate task. |

---

## Assumptions & Open Questions

| Assumption / decision | Chosen default | Rationale | Confirmed? |
| --------------------- | -------------- | --------- | ---------- |
| One spec for both pages | A single feature `cases` with one shared case template and two content entries | Both boards share header, back link, hero, numbered sections, stack and closing card. Splitting duplicates the template work. | n |
| Route shape | Dynamic segment `src/app/casos/[slug]/page.tsx` with `generateStaticParams` over the two slugs (`avaria`, `my-trello-version`); any other slug returns the Foundation 404 | Static output, one wiring file, unknown slugs handled by `notFound()`. | n |
| Source of copy | Texts extracted from the four case boards and from the Home content (same numbers as Home cards) | Design is the approved source. | y |
| Placeholder `[conferir os números antes de publicar, eles crescem]` on the Trello board | Not rendered; numbers shown as in the design (~456 PRs, ~1.400 commits, ~238 test files, 7 back-end features) | Same decision as Home Método: the note is a design review marker. | n |
| Trello board screenshot | Copy `ui/images/Screenshot from 2026-11-05 19-38-39.png` (1797x915) to `public/my-trello-version-board.png`, served via `next/image` with explicit width and height; caption "O quadro do My Trello Version: colunas, etiquetas, prazos e checklists." | It is the board image shown in the design; `ui/` is read-only input, so the app serves a copy from `public/`. | n |
| Screenshot alt text | "Tela do My Trello Version mostrando o quadro Product launch com as colunas To do, Doing e Done" | Describes the content; the app UI inside the image is in English. | n |
| GitHub repository link | `https://github.com/rafaelcsilvadev/my-trello-version`, opened in a new tab with `rel="noopener noreferrer"` | Same URL already used by the Home card. | n |
| Header and footer on case pages | Same Header and Footer components; section links become `/#projetos`, `/#experiencia`, `/#stack`, `/#metodo`, `/#contato`; brand and "Voltar para o início" go to `/`; "Voltar ao topo" goes to `#top` of the current page | Anchors in the Home header only work on `/`. The design shows the same header on case pages. | n |
| Header nav "Início" link | Not added; the design's case header shows "Início" first, so the case header lists Início (`/`), Projetos, Experiência, Stack, Método plus the Contato button | The design board shows this nav on case pages. Home keeps its current nav. | n |
| "Contato" buttons and "Baixar CV" | Contato goes to `/#contato`; CV is `/cv-rafael-couto-silva.pdf` with `download` | Reuses Home targets. | y |
| Next-case card | Avaria points to My Trello Version ("Próximo caso", "Ver o caso" to `/casos/my-trello-version`). My Trello Version has no next case and shows the "Código aberto" card with "Ver no GitHub", Contato and Baixar CV | Matches the two boards. | n |
| Process steps highlight | Step 04 "Teste vermelho" is highlighted, as in the design | Same pattern as Home Método (`highlight`). | n |
| Page metadata | Each case sets its own `<title>` ("Avaria · Rafael Couto Silva", "My Trello Version · Rafael Couto Silva") and description from `src/content/`; Open Graph image reuses `/og-image.png` | Distinct titles per route; no extra image asset in the design. | n |
| Remaining implicit dimensions (input validation, auth, concurrency, persistence, lifecycle, idempotency, observability) | N/A: static pages with no input, state or server calls | Nothing to cover. | y |

**Open questions:** none - all resolved or logged above. Items marked `n` in Confirmed? are defaults the author may still change.

---

## User Stories

### P1: Shared case template and Avaria page ⭐ MVP

**User Story**: As a visitor, I want to open the Avaria case from the Home so that I can see the problem, the decision and the result behind the project.

**Why P1**: It delivers a full vertical slice (route, template, content) and fixes the first dead "Ver o caso" link.

**Acceptance Criteria**:

1. WHEN a visitor opens `/casos/avaria` THEN the system SHALL render the header, a "Voltar para o início" link to `/`, the eyebrow "Caso · Mobs2", the title "Avaria" and the intro "Uma versão difícil de manter virou um sistema que rodou em produção por mais de 4 anos, para mais de 1 mil clientes. A melhoria foi proposta por mim, ainda como dev júnior.".
2. The system SHALL render a facts bar with three labeled items: Empresa "Mobs2", Papel "Proponente e responsável técnico", Estado "Em produção há +4 anos".
3. The system SHALL render three numbered sections, "01 Problema", "02 Decisão" and "03 Resultado", each with its heading and its paragraphs as written in the board, in two columns on desktop and one column on mobile.
4. The system SHALL render in "02 Decisão" a callout titled "Por que AdonisJS" with the two reasons "Parecido com o Laravel, que era a stack principal da empresa." and "Mantém TypeScript no back-end e no mobile, e o time já conhecia JS.".
5. The system SHALL render in "03 Resultado" three metric cards: "+4 anos" / "em produção", "+1 mil" / "clientes", "TS" / "no back e no mobile".
6. The system SHALL render a Stack block with the chips TypeScript, React Native, Node.js (AdonisJS) and SQL Server.
7. The system SHALL render a "Próximo caso" card with the title "My Trello Version", the text "Projeto pessoal, feito sozinho, do requisito ao código." and three actions: "Ver o caso" to `/casos/my-trello-version`, "Contato" to `/#contato` and "Baixar CV" to `/cv-rafael-couto-silva.pdf`.
8. The system SHALL read every user-facing string of the page from `src/content/`; no component under `src/components/` or `src/app/` holds PT-BR text.
9. IF a content list (metrics, chips, paragraphs, callout reasons) is empty THEN the system SHALL render no empty container for it.

**Independent Test**: Run `pnpm build && pnpm start`, request `/casos/avaria` with `curl` and find every string above in the HTML; the Vitest page test asserts the same strings from `src/content/`.

---

### P1: My Trello Version page ⭐ MVP

**User Story**: As a visitor, I want to open the My Trello Version case so that I can see the evidence of how Rafael builds software and read the code.

**Why P1**: It fixes the second dead "Ver o caso" link and holds the strongest proof (PRs, tests, open code).

**Acceptance Criteria**:

1. WHEN a visitor opens `/casos/my-trello-version` THEN the system SHALL render the header, the back link, the eyebrow "Caso · Projeto pessoal, feito sozinho", the title "My Trello Version" and the intro "Uma versão própria de um quadro estilo Trello, do requisito ao código. A prova aberta do ciclo completo de construir software.".
2. The system SHALL render in the hero a primary "Ver no GitHub" button to `https://github.com/rafaelcsilvadev/my-trello-version` and a secondary "Contato" button to `/#contato`.
3. The system SHALL render "01 Objetivo" with three cards labeled "A dor", "Construir" and "Mostrar" and their texts as written in the board, plus the lead-in "Em cima dessa dor, dois propósitos no mesmo projeto." before the last two.
4. The system SHALL render "02 Processo" with the intro "Desenvolvimento guiado por especificações. Uma tarefa por branch e por PR, com commits pequenos e o teste vermelho antes do código." and six numbered steps in this order: Spec, Design, Tarefas, Teste vermelho, Código, PR, each with its caption; step 04 SHALL render highlighted.
5. The system SHALL render "03 Evidências" with four metric cards (`~456` Pull Requests mergeados, `~1.400` commits na branch principal, `~238` arquivos de teste, `7` funcionalidades no back-end) and four highlight cards (Back-end e front-end separados, Três níveis de teste, CI com checagens obrigatórias, Funcionalidades entregues) with their descriptions.
6. The system SHALL render the board screenshot through `next/image` with explicit width 1797 and height 915, the alt text from the Assumptions table and the caption "O quadro do My Trello Version: colunas, etiquetas, prazos e checklists.".
7. The system SHALL render the Stack grouped in four labeled columns (Base, Back-end, Front-end, Infra) with the chips from the board, marking TypeScript, NestJS, React 19 and Docker as main chips, followed by the note "Estado: a versão web está completa. O app mobile não foi iniciado, em coerência com o foco em web.".
8. The system SHALL render a closing "Código aberto" card with the title "Leia o código e o histórico", the text "Cada Pull Request está no repositório." and three actions: "Ver no GitHub" (new tab), "Contato" and "Baixar CV".
9. The system SHALL NOT render the text `[conferir` anywhere on the page.
10. The system SHALL serve the screenshot from `public/my-trello-version-board.png` as a PNG of 1797x915.

**Independent Test**: Request `/casos/my-trello-version` with `curl` and find every string above; assert no `[conferir` in the HTML; open `public/my-trello-version-board.png` header and confirm PNG with 1797x915.

---

### P1: Routing and navigation from the case pages ⭐ MVP

**User Story**: As a visitor on a case page, I want the header, the footer and the links to take me where they say so that I never get stuck.

**Why P1**: Home anchors are `#section`; copied as-is they break on a sub-route.

**Acceptance Criteria**:

1. The system SHALL generate `/casos/avaria` and `/casos/my-trello-version` statically at build time through `generateStaticParams`.
2. IF a visitor opens `/casos/<unknown-slug>` THEN the system SHALL respond with the Foundation 404 page.
3. The system SHALL render the case header links as `/` (Início), `/#projetos`, `/#experiencia`, `/#stack`, `/#metodo` and the "Contato" button to `/#contato`.
4. WHEN a visitor clicks the brand or "Voltar para o início" THEN the system SHALL navigate to `/`.
5. WHEN a visitor clicks "Voltar ao topo" in the footer THEN the system SHALL scroll to the top of the current case page (`#top`).
6. WHILE the viewport is below the `md` breakpoint, WHEN a visitor opens the menu button THEN the system SHALL list the same links as the desktop header and close on link click or Escape (same behavior as Home).
7. WHEN the Home "Ver o caso" links are followed THEN the system SHALL load the matching case page instead of the 404.

**Independent Test**: Vitest renders the header with the case nav and asserts every `href`; `curl` returns 200 for both slugs and 404 for `/casos/x`.

---

### P2: Accessibility and responsiveness

**User Story**: As a visitor using a keyboard, a screen reader or a phone, I want the case pages to be usable so that no content or action is out of reach.

**Why P2**: The pages work without it, but it is part of the quality bar already set by Home.

**Acceptance Criteria**:

1. The system SHALL render exactly one `h1` per page (the case title) and the numbered section headings as `h2`.
2. The system SHALL render each numbered section as a `section` labelled by its heading through `aria-labelledby`.
3. The system SHALL render the facts bar, metric cards and stack groups as description lists or lists with accessible names, and SHALL mark decorative icons and number badges (the section number badge and the step numbers in the process list) `aria-hidden="true"`; the ordered list and the heading text already carry the order.
4. WHEN a visitor presses Tab THEN the system SHALL show a visible focus outline on every link and button, and the "Pular para o conteúdo" skip link SHALL be the first focusable element and SHALL target the main content (`href="#main"`, `id="main"`), leaving the focus move to the browser's native anchor behavior. The focus outline is a global `:focus-visible` rule, not per component.
5. WHILE the viewport is 390 px wide, the system SHALL stack the two-column sections into one column and SHALL NOT scroll horizontally; the process steps grid MAY use two compact columns. Column counts are asserted by layout classes; horizontal scroll needs a browser check.
6. WHEN the visitor prefers reduced motion THEN the system SHALL not animate; the Foundation `prefers-reduced-motion` rule applies.

**Independent Test**: Vitest asserts heading levels, `aria-labelledby`, skip link order and `aria-hidden`; layout classes are checked per component.

---

### P3: Per-page metadata

**User Story**: As someone sharing a case link, I want a specific title and description so that the preview names the project.

**Why P3**: Nice for sharing; the pages work without it.

**Acceptance Criteria**:

1. The system SHALL set `<title>` to "Avaria · Rafael Couto Silva" for `/casos/avaria` and "My Trello Version · Rafael Couto Silva" for `/casos/my-trello-version`.
2. The system SHALL set a `description` for each case, read from `src/content/`, and the Open Graph `url` to the case path under `NEXT_PUBLIC_SITE_URL`.
3. The system SHALL reuse `/og-image.png` as Open Graph image on both pages.

**Independent Test**: Vitest calls `generateMetadata` for each slug and asserts title, description and Open Graph URL.

---

## Edge Cases

- IF a case entry has no `repoLink` THEN the system SHALL render no GitHub button in the hero or the closing card.
- IF the next-case entry is absent THEN the system SHALL render the closing card defined for that case instead of "Próximo caso".
- WHEN JavaScript is unavailable THEN the system SHALL still render all content and links; only the mobile menu toggle needs JavaScript.
- WHEN a visitor follows `/#projetos` from a case page THEN the system SHALL scroll the Home section below the sticky header without covering its heading.
- IF the screenshot fails to load THEN the system SHALL keep the caption and the alt text visible in its place, with no layout shift.

---

## Requirement Traceability

| Requirement ID | Story | Phase | Status |
| -------------- | ----- | ----- | ------ |
| CASE-01 | P1: Shared case template and Avaria page (AC 1-2 hero and facts) | Design | Verified |
| CASE-02 | P1: Shared case template and Avaria page (AC 3-6 sections and stack) | Design | Verified |
| CASE-03 | P1: Shared case template and Avaria page (AC 7 next case) | Design | Verified |
| CASE-04 | P1: Shared case template and Avaria page (AC 8-9 content-only strings, empty lists) | Design | Verified |
| CASE-05 | P1: My Trello Version page (AC 1-2 hero) | Design | Verified |
| CASE-06 | P1: My Trello Version page (AC 3-5 Objetivo, Processo, Evidências) | Design | Verified |
| CASE-07 | P1: My Trello Version page (AC 6, 10 screenshot asset) | Design | Verified |
| CASE-08 | P1: My Trello Version page (AC 7-9 stack, note, closing card, no marker) | Design | Verified |
| CASE-09 | P1: Routing and navigation (AC 1-2 static params, 404) | Design | Verified |
| CASE-10 | P1: Routing and navigation (AC 3-7 header, footer, links) | Design | Verified |
| CASE-11 | P2: Accessibility and responsiveness | Design | Verified |
| CASE-12 | P3: Per-page metadata | Design | Verified |

**Coverage:** 12 total, 0 mapped to tasks, 12 unmapped ⚠️

---

## Success Criteria

- [ ] Both case routes render every block with the design's copy, verified by tests that read the strings from `src/content/`.
- [ ] The two Home "Ver o caso" links no longer reach the 404.
- [ ] `pnpm lint && pnpm typecheck && pnpm test && pnpm build` exit 0.
- [ ] No placeholder text (`[conferir`, `SEU-DOMINIO`) appears in the rendered HTML of either case page.
