# Este Site Case Specification

## Problem Statement

The design now has a third case, "Este site" (boards `Caso Este site · desktop.png` and `· mobile.png`), and a closing board, `Fechamento dos casos.png`, that chains the cases: Avaria → My Trello Version → Este site → Home. Today `/casos/este-site` returns the Foundation 404 and the My Trello Version page ends with the "Código aberto" card only, so the reading order stops one case early. This feature adds the third case page on the shared case template and updates the My Trello Version closing so it points to the new case. The updated Home board (`Home · desktop.png`) also shows a third, full-width project card "Este site" under "Projetos em destaque"; without it the new case has no entry point from the Home.

Este site page blocks, in order: Header, back link, case hero (eyebrow, title, intro, GitHub and Contato buttons), 01 Objetivo, 02 Decisões, 03 Evidências (three cards, Home screenshot), Stack, "Fim dos casos" card, Footer.

## Goals

- [ ] `/casos/este-site` renders every block above with PT-BR copy read only from `src/content/`.
- [ ] The page is statically generated, listed in the sitemap and reachable from the Home "Este site" card and from the My Trello Version closing card.
- [ ] The three closing cards match `Fechamento dos casos.png`: Avaria → My Trello Version, My Trello Version → Código aberto plus Este site, Este site → De volta ao início.
- [ ] `pnpm lint && pnpm typecheck && pnpm test && pnpm build` exit 0.

## Out of Scope

| Feature | Reason |
| ------- | ------ |
| The four-step sequence strip at the top of `Fechamento dos casos.png` (01 Avaria → 02 My Trello Version → 03 Este site → Início) | It documents the reading order for review; it is not a block on any page. |
| Other Home changes (Experiência, Stack, Método, Contato, Hero) | Only the "Este site" project card changed in scope; the rest of the Home stays as built. |
| Changes to the Avaria page | Its closing card already matches the board. |
| Case index `/casos`, animations, analytics, EN/i18n | Not in the design. |
| Live commit counter or GitHub API call | The site is static; the number is content. |

---

## Assumptions & Open Questions

| Assumption / decision | Chosen default | Rationale | Confirmed? |
| --------------------- | -------------- | --------- | ---------- |
| Slug and order | Slug `este-site`; `cases` becomes `[avaria, my-trello-version, este-site]` | Matches the reading order in the closing board; routes, sitemap and `generateStaticParams` already derive from `cases`. | n |
| Review markers on the boards (`[conferir: as duas primeiras decisões chegaram cortadas no briefing]`, `[conferir os números antes de publicar, eles crescem]`, `[conferir: o briefing cortou parte da stack]`) | Not rendered. Decisões shows the three decisions in the board; Stack shows the four chips in the board | Same decision as the Trello and Home markers: they are design review notes. The content is limited to what the board approved. | n |
| Commit count | Card shows `193` / `commits`, the value on the board; it is the current `git log --oneline` count of the repository | Verified against git. The value is static content and grows; the author updates it when publishing. | n |
| GitHub link | `https://github.com/rafaelcsilvadev/my-web-site`, new tab, `rel="noopener noreferrer"` | Read from `git remote -v`. | y |
| Home screenshot asset | `public/este-site-home.png`, served via `next/image` with explicit width and height equal to the PNG's own dimensions. Source: the author's capture of the Home hero at `~/Pictures/Screenshots/Screenshot from 2026-11-09 19-07-32.png`, copied into `public/` (never imported from `ui/` or `~`) | The author supplied the capture; `ui/` is read-only input and the app serves from `public/`. | y |
| Screenshot alt text | "Tela da Home deste site, com o título Desenvolvedor Full Stack do requisito à produção e o retrato de Rafael" | Describes the content for screen readers. | n |
| Evidence cards layout | The three cards (metric `193 commits`, "Testes antes do código", "Gate único") sit in one row of three on desktop and stack in one column on mobile, as the boards show | Existing blocks use a 4-column metric grid and a 2-column highlight grid; this page needs one row, so the template gains a combined evidence row (decided in Design). | n |
| Home card layout | The "Este site" card spans both grid columns on desktop (text and chips on the left, three label/value rows on the right) and stacks in one column on mobile. The rows are "Commits" `193`, "Testes" "Antes do código", "Checagens" "Gate único" | Matches `Home · desktop.png`. The existing metric styles ("text", "number") do not fit; Design adds a third style. | n |
| Home card copy | Context "Projeto pessoal · solo" and "Portfólio"; title "Este site"; text "O próprio portfólio, feito do jeito que eu trabalho: spec, teste vermelho primeiro e commits pequenos, com a IA executando e eu revisando."; chips TypeScript, Next.js, Tailwind CSS, pnpm (TypeScript and Next.js main); actions "Ver o caso" to `/casos/este-site` and "Repositório no GitHub" to the repo URL | Read from the board; `[conferir` markers on the Home board are not rendered. | n |
| Closing cards | My Trello Version keeps "Código aberto" and gains a second row "Próximo caso" / "Este site" with "Ver o caso" to `/casos/este-site`. Este site shows "Fim dos casos" / "De volta ao início" with "Voltar ao início" to `/`, "Contato" to `/#contato`, "Baixar CV" | Matches `Fechamento dos casos.png` and the Este site boards. | n |
| Page metadata | Title "Este site · Rafael Couto Silva"; description "Caso Este site: o portfólio feito com spec, teste vermelho primeiro e commits pequenos, com a IA executando e revisão humana de cada mudança."; Open Graph image `/og-image.png` | The design has no description; this one repeats the board intro. | n |
| Header, footer, skip link, a11y rules | Same as the `cases` feature (CASE-10, CASE-11) | Shared template. | y |
| Remaining implicit dimensions (input validation, auth, concurrency, persistence, lifecycle, idempotency, observability, external calls) | N/A: static page with no input, state or server calls | Nothing to cover. | y |

**Open questions:** none - all resolved or logged above. Items marked `n` are defaults the author may still change.

---

## User Stories

### P1: Este site case page ⭐ MVP

**User Story**: As a visitor, I want to open the "Este site" case so that I can see the decisions and the evidence behind how this portfolio was built.

**Why P1**: It is the third and last case in the design and the proof that the process applies to this very site.

**Acceptance Criteria**:

1. WHEN a visitor opens `/casos/este-site` THEN the system SHALL render the header, a "Voltar para o início" link to `/`, the eyebrow "Caso · Projeto pessoal, feito sozinho", the title "Este site" and the intro "O site é a prova do meu jeito de trabalhar. Fiz com spec, teste vermelho primeiro e commits pequenos, com a IA executando e eu revisando.".
2. The system SHALL render in the hero a primary "Ver no GitHub" button to `https://github.com/rafaelcsilvadev/my-web-site` and a secondary "Contato" button to `/#contato`.
3. The system SHALL render "01 Objetivo" with the text "Um portfólio estático, rápido e acessível, que mostra o trabalho com evidência e não com adjetivo.".
4. The system SHALL render "02 Decisões" with a callout titled "O que decidi" holding three items in this order: "Next.js App Router, com Server Components por padrão e Client Components só onde precisa.", "Arquitetura MVVM: Model, ViewModel e View. As regras de importação são checadas pelo ESLint." and "Todo texto em um só lugar, em `src/content/`. Nenhum texto fixo nos componentes.", with `src/content/` rendered as inline code.
5. The system SHALL render "03 Evidências" with three cards in this order: metric `193` / "commits", "Testes antes do código" / "O teste vermelho vem primeiro, em cada feature." and "Gate único" / "Lint, typecheck, testes e build.".
6. The system SHALL render the Home screenshot through `next/image` with explicit width and height equal to the PNG's own dimensions, the alt text from the Assumptions table and the caption "A Home deste site.".
7. The system SHALL serve the screenshot from `public/este-site-home.png` as a PNG.
8. The system SHALL render a Stack block labeled "Stack" with the chips TypeScript, Next.js, Tailwind CSS and pnpm, marking TypeScript and Next.js as main chips and rendering no group label.
9. The system SHALL render a closing card with the eyebrow "Fim dos casos", the title "De volta ao início", the text "Projetos, experiência, stack e método em uma página." and three actions in this order: "Voltar ao início" to `/` (secondary, arrow icon), "Contato" to `/#contato` (primary) and "Baixar CV" to `/cv-rafael-couto-silva.pdf` (secondary, download icon, `download` attribute).
10. The system SHALL NOT render the text `[conferir` anywhere on the page.
11. The system SHALL read every user-facing string of the page from `src/content/`; no component under `src/components/` or `src/app/` holds PT-BR text.

**Independent Test**: Run `pnpm build && pnpm start`, request `/casos/este-site` with `curl` and find every string above in the HTML; assert no `[conferir`; confirm the PNG header dimensions match the `width` and `height` in the content.

---

### P1: "Este site" card on the Home ⭐ MVP

**User Story**: As a visitor on the Home, I want to see "Este site" among the featured projects so that I can open its case from there.

**Why P1**: It is the Home entry point of the new case, shown in the updated Home board.

**Acceptance Criteria**:

1. WHEN a visitor opens `/` THEN the system SHALL render three project cards in this order: Avaria, My Trello Version, Este site.
2. The system SHALL render the Este site card with the context "Projeto pessoal · solo" and "Portfólio", the title "Este site", the text "O próprio portfólio, feito do jeito que eu trabalho: spec, teste vermelho primeiro e commits pequenos, com a IA executando e eu revisando." and the chips TypeScript, Next.js, Tailwind CSS and pnpm, marking TypeScript and Next.js as main chips.
3. The system SHALL render in the Este site card three label/value rows in this order: "Commits" / "193", "Testes" / "Antes do código", "Checagens" / "Gate único".
4. WHEN a visitor clicks "Ver o caso" on the Este site card THEN the system SHALL navigate to `/casos/este-site`.
5. The system SHALL render in the Este site card a "Repositório no GitHub" link to `https://github.com/rafaelcsilvadev/my-web-site`, opening in a new tab with `rel="noopener noreferrer"`.
6. WHILE the viewport is 1440 px wide, the system SHALL render the Este site card across both grid columns, below the Avaria and My Trello Version cards.
7. WHILE the viewport is 390 px wide, the system SHALL render the three cards stacked in one column without horizontal scroll.
8. The system SHALL render the Avaria and My Trello Version cards exactly as before.
9. The system SHALL read every string of the card from `src/content/`.

**Independent Test**: Vitest renders the Home and asserts card order, strings, rows and hrefs; `curl` on `/` finds `/casos/este-site`.

---

### P1: Case chain and routing ⭐ MVP

**User Story**: As a visitor finishing a case, I want the closing card to lead me to the next case so that I can read all three in order and end on the Home.

**Why P1**: Without the link from My Trello Version the new page is reachable only by typing the URL.

**Acceptance Criteria**:

1. The system SHALL generate `/casos/este-site` statically at build time and include `/casos/este-site` in the sitemap with priority 0.8.
2. WHEN a visitor opens `/casos/my-trello-version` THEN the system SHALL render, in the closing area, the "Código aberto" card unchanged followed by a "Próximo caso" row with the title "Este site" and the action "Ver o caso" to `/casos/este-site`.
3. The system SHALL render no "Próximo caso" row on `/casos/este-site`; its closing card is "Fim dos casos".
4. WHEN a visitor follows `/casos/avaria` → "Ver o caso" → "Ver o caso" THEN the system SHALL load My Trello Version and then Este site, never the 404.
5. IF a visitor opens `/casos/<unknown-slug>` THEN the system SHALL respond with the Foundation 404 page.
6. IF a case closing has no next-case entry THEN the system SHALL render no "Próximo caso" row for it.

**Independent Test**: Vitest asserts `caseSlugs`, the sitemap entries and the closing content of each case; `curl` returns 200 for the three slugs and 404 for `/casos/x`.

---

### P2: Metadata, accessibility and responsiveness

**User Story**: As someone sharing the link, or using a keyboard, a screen reader or a phone, I want a specific preview and a usable page.

**Why P2**: The page works without it, but it is the same quality bar as the other cases.

**Acceptance Criteria**:

1. The system SHALL set `<title>` to "Este site · Rafael Couto Silva", a `description` read from `src/content/`, the Open Graph `url` to `/casos/este-site` under `NEXT_PUBLIC_SITE_URL` and the Open Graph image `/og-image.png`.
2. The system SHALL render exactly one `h1` (the case title) and the numbered sections as `h2` labelled by their headings through `aria-labelledby`.
3. The system SHALL mark the section number badges `aria-hidden="true"`.
4. WHILE the viewport is 390 px wide, the system SHALL stack the Objetivo and Decisões columns and the three evidence cards into one column and SHALL NOT scroll horizontally.
5. WHILE the viewport is 1440 px wide, the system SHALL render the three evidence cards in one row.
6. The system SHALL render inline code in the Decisões item with a monospace font through the same style used elsewhere for code.

**Independent Test**: Vitest calls `generateMetadata` for the slug and asserts heading levels, `aria-labelledby`, `aria-hidden` and layout classes; horizontal scroll needs a browser check, offered after the build.

---

## Edge Cases

- IF the screenshot fails to load THEN the system SHALL keep the caption and the alt text visible in its place, with no layout shift (explicit `width` and `height`).
- IF the callout has no items THEN the system SHALL render no empty callout.
- IF a content list is empty THEN the system SHALL render no empty container for it.
- WHEN JavaScript is unavailable THEN the system SHALL still render all content and links; only the mobile menu toggle needs JavaScript.

---

## Requirement Traceability

| Requirement ID | Story | Phase | Status |
| -------------- | ----- | ----- | ------ |
| SITE-01 | P1: Este site case page (AC 1-2 hero) | Design | Pending |
| SITE-02 | P1: Este site case page (AC 3-5 Objetivo, Decisões, Evidências) | Design | Pending |
| SITE-03 | P1: Este site case page (AC 6-7 screenshot asset) | Design | Pending |
| SITE-04 | P1: Este site case page (AC 8-9 stack, closing card) | Design | Pending |
| SITE-05 | P1: Este site case page (AC 10-11 no marker, content-only strings) | Design | Pending |
| SITE-06 | P1: Case chain and routing (AC 1, 5 static params, sitemap, 404) | Design | Pending |
| SITE-07 | P1: Case chain and routing (AC 2-4, 6 closing chain) | Design | Pending |
| SITE-08 | P2: Metadata, accessibility and responsiveness | Design | Pending |
| SITE-09 | P1: "Este site" card on the Home (AC 1-5, 9 content, order, links) | Design | Pending |
| SITE-10 | P1: "Este site" card on the Home (AC 6-8 layout, existing cards untouched) | Design | Pending |

**Coverage:** 10 total, 0 mapped to tasks, 10 unmapped ⚠️

---

## Success Criteria

- [ ] `/casos/este-site` renders every block with the board's copy, verified by tests that read the strings from `src/content/`.
- [ ] The Home lists the Este site card and its "Ver o caso" reaches the new page.
- [ ] The My Trello Version closing leads to Este site; Este site closes on the Home.
- [ ] `pnpm lint && pnpm typecheck && pnpm test && pnpm build` exit 0.
- [ ] No placeholder text (`[conferir`, `SEU-DOMINIO`) appears in the rendered HTML of the new page.
