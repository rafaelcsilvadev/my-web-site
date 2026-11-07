# Home Specification

## Problem Statement

`/` still renders `HomePlaceholder`. The portfolio has no real content, so a recruiter or client cannot see who Rafael is, what he built or how to contact him. The Home delivers the single-page landing from the "Home · desktop" and "Home · mobile" boards of `ui/Site vitrine pessoal.html`, built on the Foundation (tokens, metadata, MVVM, content layer).

Sections in the design, in order: Header, Hero, 01 Projetos em destaque, 02 Experiência, 03 Stack, 04 Método (SDD), 05 Contato, Footer.

## Goals

- [ ] `/` renders all eight blocks above with PT-BR copy read only from `src/content/`; `pnpm lint && pnpm typecheck && pnpm test && pnpm build` exit 0.
- [ ] Header and in-page anchors reach every section by keyboard and by mouse, on desktop and mobile.
- [ ] Hero portrait is served optimized from `public/` through `next/image`, with no layout shift.
- [ ] Every contact channel (CV, WhatsApp, e-mail, LinkedIn, GitHub) is a working link.

## Out of Scope

| Feature | Reason |
| ------- | ------ |
| Pages `/casos/avaria` and `/casos/my-trello-version` | Separate feature specs (boards "Caso Avaria" and "Caso My Trello Version"). Home only links to them. |
| Contact form, analytics, blog, EN/i18n | Not in the design. |
| Deployment, domain wiring | Separate task. |
| Scroll animations beyond what the design shows | Not in the design; `prefers-reduced-motion` rule from Foundation stays. |

---

## Assumptions & Open Questions

| Assumption / decision | Chosen default | Rationale | Confirmed? |
| --------------------- | -------------- | --------- | ---------- |
| Source of copy | Texts extracted from the "Home · desktop" board, with the corrected e-mail `rafacsilva016@gmail.com` | Design is the approved source; its e-mail has a typo. | y |
| Periods | Duo Technology "ago. de 2025 - set. de 2026"; Globals · Missão Crítica "nov. de 2022 - jan. de 2023"; Mobs2 keeps "4 anos" from the design | Given by the author. The view still hides the period when a content entry has none. | y |
| Note `[conferir: papel da IA em cada passo e os números]` in Método | Not rendered. Roles and numbers (~456 PRs, ~238 test files, ~1.400 commits) shown as in the design | Author confirmed the content is correct; the note is a design review marker, not site copy. | y |
| "Baixar CV" target | Copy `/home/rafael/Downloads/CUrriculo/Currículo Desenvolvedor Full Stack Pleno - Rafael Couto Silva.pdf` (86.6 KB) to `public/cv-rafael-couto-silva.pdf`; link to `/cv-rafael-couto-silva.pdf` with the `download` attribute | Author supplied the file; an ASCII file name gives a stable URL. | y |
| WhatsApp number | `+55 (24) 99964-4346`, stored in `src/content/` as `https://wa.me/5524999644346`; the card shows the label "Abrir conversa" as in the design | Author supplied the number for the public site. A content constant is simpler than an env var and always renders. | y |
| "Ver o caso" links | Point to `/casos/avaria` and `/casos/my-trello-version`; those routes return the Foundation 404 until their specs land | Avoids rework when case pages ship; known interim state. | n |
| GitHub repository link in My Trello Version card | `https://github.com/rafaelcsilvadev` plus repo name `my-trello-version` | Exact repo URL not in the design; follows the GitHub profile in Contato. | n |
| Mobile navigation | Hamburger button toggles a menu listing the same five anchors; closes on link click or Escape | Board "Home · mobile" shows a collapsed header; foundation spec deferred the menu to Home. | n |
| Portrait | Copy `ui/images/Retrato Profissional em Setup Roxo.png` to `public/` as `rafael-portrait.png`, served via `next/image` with `priority` | 2 MB source must be optimized; it is the LCP element. Caption "Retrato criado com IA a partir de uma foto minha" stays. | y |
| Active section highlight in header | Not included | Not in the design; avoids scroll-spy state. | n |
| Section ids | `projetos`, `experiencia`, `stack`, `metodo`, `contato` (ASCII, no accents) | Stable anchors and URLs. | n |
| Remaining implicit dimensions (auth, concurrency, persistence, lifecycle, idempotency) | N/A: static page, no state, no server calls | Nothing to cover. | y |

**Open questions:** none - all resolved or logged above. Items marked `n` in Confirmed? are defaults the author may still change; the exact My Trello Version repository URL is the only open item.

---

## User Stories

### P1: Assets and page shell ⭐ MVP

**User Story**: As a visitor, I want a page with a header, footer and the hero portrait so that the site feels complete and I can move around.

**Why P1**: Every other section lives inside the shell.

**Acceptance Criteria**:

1. The system SHALL serve the CV at `public/cv-rafael-couto-silva.pdf` and the portrait at `public/rafael-portrait.png`, and SHALL render the portrait in the hero through `next/image` with explicit width and height.
2. The system SHALL render the portrait with alt text "Retrato profissional de Rafael Couto Silva em um setup roxo" and the visible caption "Retrato criado com IA a partir de uma foto minha", both read from `src/content/`.
3. The system SHALL render a header with the name "Rafael Couto Silva" (monospace, followed by a decorative cursor block), four inline links (Projetos, Experiência, Stack, Método) and a primary "Contato" button, each pointing to its section id. The "Contato" button stays visible on every viewport.
4. The system SHALL render a footer with "© 2026 Rafael Couto Silva" and a "Voltar ao topo" link pointing to `#top`.
5. WHEN the viewport is narrower than the `md` breakpoint THEN the system SHALL hide the four inline header links and show a menu button next to the "Contato" button.
6. WHEN the visitor activates the menu button THEN the system SHALL show the five links and set `aria-expanded="true"` on the button.
7. WHEN the menu is open and the visitor clicks a link or presses Escape THEN the system SHALL close the menu and set `aria-expanded="false"`.
8. The system SHALL contain no hardcoded PT-BR strings in `src/components/` or `src/app/`.

**Independent Test**: Render the page, assert header links/anchors, footer text, portrait alt/caption, and menu toggle behavior.

---

### P1: Hero and Projetos em destaque ⭐ MVP

**User Story**: As a recruiter, I want to see who Rafael is and his two flagship projects at a glance so that I decide quickly whether to read more.

**Why P1**: First screen and main proof of work.

**Acceptance Criteria**:

1. The system SHALL render in the hero the label "Desenvolvedor de software", the h1 "Especialista Full Stack do requisito à produção", the SDD badge text, the intro sentence and the stack line "TypeScript · React · Node".
2. The system SHALL render exactly one h1 on the page.
3. The system SHALL render two hero actions: "Contato" linking to `#contato` and "Baixar CV" linking to `/cv-rafael-couto-silva.pdf`.
4. The system SHALL render the "01 · Destaques / Projetos em destaque" section with id `projetos` and two cards: Avaria and My Trello Version.
5. The system SHALL render in the Avaria card its context ("Trabalho · Mobs2", "App + API"), description, metrics "Em produção +4 anos", "Clientes +1 mil", "Decisão de stack AdonisJS", and tags TypeScript, React Native, Node.js · AdonisJS, SQL Server.
6. The system SHALL render in the My Trello Version card its context ("Projeto pessoal · solo", "Código aberto"), description, metrics "~456 PRs mergeados", "~1.400 commits na main", "~238 arquivos de teste", and tags NestJS, React 19, PostgreSQL, Docker.
7. The system SHALL link "Ver o caso" to `/casos/avaria` in the Avaria card and `/casos/my-trello-version` in the other, and render "Repositório no GitHub" as an external link with `rel="noopener noreferrer"` and `target="_blank"`.

**Independent Test**: Render the sections from content and assert texts, link targets and h1 count.

---

### P1: Experiência and Stack ⭐ MVP

**User Story**: As a recruiter, I want to see where Rafael worked and what he is strongest in so that I can match him to a role.

**Why P1**: Core hiring information.

**Acceptance Criteria**:

1. The system SHALL render the "02 · Experiência / Onde construí" section with id `experiencia` and three entries in order: Mobs2 (4 anos), Duo Technology, Globals · Missão Crítica.
2. The system SHALL render for each entry the role "Desenvolvedor Full Stack", its achievements, and its technology tags, as written in the design.
3. The system SHALL render the Mobs2 entry with bold lead-ins Avaria., REALI., M2, produto principal da empresa. and MyMobs, MobsTrack, Mobs2 School e Boletim Diário., plus the "Ver o caso Avaria" link to `/casos/avaria`.
4. IF an entry has no period in `src/content/` THEN the system SHALL render no period text and no empty element for it.
5. The system SHALL render the "03 · Stack / Onde sou mais forte" section with id `stack`, with TypeScript, React and Node marked "fio principal", and Next.js, React Native, Flutter, Laravel, Vue.js, AdonisJS, .NET, Angular, SQL Server under "também já trabalhei com".

**Independent Test**: Render both sections; assert entry order, tag lists, absence of period elements when empty.

---

### P1: Método and Contato ⭐ MVP

**User Story**: As a client, I want to understand Rafael's working method and reach him through my preferred channel so that I can start a conversation.

**Why P1**: Conversion goal of the site.

**Acceptance Criteria**:

1. The system SHALL render the "04 · Método (SDD) / Especificação antes do código" section with id `metodo` and six steps in order: Spec, Design, Tarefas, Teste vermelho, Código, PR com revisão humana, numbered 01 to 06.
2. The system SHALL render for each step the "Eu" and "IA" lines exactly as in the design; steps with no "IA" line (Design, Tarefas) SHALL render no "IA" row.
3. The system SHALL render the summary line "~456 PRs mergeados · ~238 arquivos de teste · CI com checagens obrigatórias" and the link "Ver o método no My Trello Version".
4. The system SHALL NOT render the text "[conferir" anywhere on the page.
5. The system SHALL render the "05 · Contato / Vamos conversar" section with id `contato`, the lead "Para vaga ou projeto, escolha o canal." and a "Baixar CV" button.
6. The system SHALL render the e-mail as `mailto:rafacsilva016@gmail.com`, LinkedIn as `https://linkedin.com/in/rafa-couto` and GitHub as `https://github.com/rafaelcsilvadev`, the last two with `rel="noopener noreferrer"`.
7. The system SHALL render the "Chamar no WhatsApp" button and the WhatsApp card ("Abrir conversa") both linking to `https://wa.me/5524999644346`, with `rel="noopener noreferrer"` and `target="_blank"`.
8. The system SHALL link every "Baixar CV" button to `/cv-rafael-couto-silva.pdf` with the `download` attribute.

**Independent Test**: Render the sections; assert step order, row presence, link targets and the absence of "[conferir".

---

### P2: Accessibility and responsiveness

**User Story**: As a visitor using keyboard, screen reader or phone, I want the page to work for me so that no content is out of reach.

**Why P2**: Required quality bar, but the page is useful without polishing.

**Acceptance Criteria**:

1. The system SHALL render each section as a landmark with an `aria-labelledby` pointing to its heading, and the header nav with `aria-label` from `src/content/`.
2. The system SHALL render a skip link as the first focusable element, targeting `#conteudo`.
3. The system SHALL render the sections with an ordered heading outline: one h1, section titles as h2, cards and entries as h3.
4. The system SHALL render decorative section numbers ("01", "02", ...) with `aria-hidden="true"`.
5. The system SHALL NOT use `--color-brand` (`#881E9B`) as a text color on the Home.
6. The system SHALL render a layout with no horizontal scroll at 375 px width, verified by the absence of fixed widths above 375 px in the Home components.

**Independent Test**: Landmark/heading queries in Testing Library; static check for forbidden color class on text.

---

### P3: Page metadata for Home

**User Story**: As a visitor sharing the link, I want a correct title and description so that previews look right.

**Why P3**: Already provided by the Foundation; only a regression guard.

**Acceptance Criteria**:

1. The system SHALL keep the Foundation metadata (title, description, Open Graph, Twitter) for `/` unchanged.

**Independent Test**: Existing `site-metadata.test.ts` stays green.

---

## Edge Cases

- IF a content list (tags, metrics, steps) is empty THEN the system SHALL render no empty container for it.
- WHEN JavaScript is unavailable THEN the system SHALL still render all content and anchor links; only the mobile menu toggle needs JavaScript.
- WHEN the visitor follows a `#section` link THEN the system SHALL scroll the section below the sticky header without covering its heading.

---

## Requirement Traceability

| Requirement ID | Story | Phase | Status |
| -------------- | ----- | ----- | ------ |
| HOME-01 | P1: Assets and page shell (AC 1-2 portrait) | Design | Pending |
| HOME-02 | P1: Assets and page shell (AC 3-7 header, footer, menu) | Design | Pending |
| HOME-03 | P1: Assets and page shell (AC 8 no hardcoded strings) | Design | Pending |
| HOME-04 | P1: Hero and Projetos (AC 1-3 hero) | Design | Pending |
| HOME-05 | P1: Hero and Projetos (AC 4-7 project cards) | Design | Pending |
| HOME-06 | P1: Experiência and Stack (AC 1-4 experience) | Design | Pending |
| HOME-07 | P1: Experiência and Stack (AC 5 stack) | Design | Pending |
| HOME-08 | P1: Método and Contato (AC 1-4 method) | Design | Pending |
| HOME-09 | P1: Método and Contato (AC 5-8 contact) | Design | Pending |
| HOME-10 | P2: Accessibility and responsiveness | Design | Pending |
| HOME-11 | P3: Page metadata for Home | Design | Pending |

**Coverage:** 11 total, 0 mapped to tasks, 11 unmapped ⚠️

---

## Success Criteria

- [ ] All eight blocks render at `/` with the design's copy, verified by tests that read the strings from `src/content/`.
- [ ] `pnpm lint && pnpm typecheck && pnpm test && pnpm build` exit 0.
- [ ] No placeholder text (`[PERÍODO]`, `[conferir`, `SEU-DOMINIO`) appears in the rendered HTML.
