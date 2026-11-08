# Foundation Specification

## Problem Statement

The repository has no application yet. Pages (Home, Caso Avaria, Caso My Trello Version) cannot be built until a runnable Next.js app exists with the toolchain, the dark visual system from `ui/Site vitrine pessoal.html`, the shared metadata and the content layer. Foundation delivers that base so every later page spec only adds views, view models and content.

Source of truth for visuals: `ui/Site vitrine pessoal.html` (boards "Sistema visual", "Home", "Caso Avaria", "Caso My Trello Version", desktop and mobile). PNG exports: `ui/Site vitrine pessoal-png/`.

## Goals

- [ ] `pnpm install && pnpm dev` serves a PT-BR dark page with no errors; `pnpm build`, `pnpm lint`, `pnpm typecheck` and `pnpm test` all exit 0.
- [ ] Design tokens (colors, fonts, focus ring, motion rules) from the "Sistema visual" board exist once, in the Tailwind theme, and are covered by tests.
- [ ] Site-wide metadata (favicons, Open Graph, Twitter, theme color) is emitted from the Next.js `metadata` API, matching `ui/head-snippet.html`.
- [ ] Folder structure enforces MVVM and a typed PT-BR content layer, ready for page specs.

## Out of Scope

Explicitly excluded. Documented to prevent scope creep.

| Feature | Reason |
| ------- | ------ |
| Home, Caso Avaria, Caso My Trello Version pages | Separate feature specs (one per page) built on this foundation. |
| Header, mobile menu, footer components | Ship with the Home spec; they need the page anchors and routes. |
| Real page copy (bio, projects, experience, method) | Belongs to each page spec; foundation only defines the content structure. |
| CV PDF file and "Baixar CV" target | No file exists yet; tracked in the Home spec. |
| Deployment, hosting, real domain wiring | Needs a decision on host and domain; separate task. |
| Analytics, contact form, blog, i18n/EN | Not in the design. |

---

## Assumptions & Open Questions

Every ambiguity is either resolved with the user or recorded here - nothing is left silently unclear.

| Assumption / decision | Chosen default | Rationale | Confirmed? |
| --------------------- | -------------- | --------- | ---------- |
| First feature scope | Foundation only, pages later | User chose "Fundação primeiro". | y |
| Design source | Bundled HTML `ui/Site vitrine pessoal.html` | User supplied it; the artifact link is not readable by tools. | y |
| Next.js / Tailwind versions | Latest stable Next.js (App Router), Tailwind CSS 4 | Project CLAUDE.md names Next.js App Router + Tailwind; no version pinned. | n |
| Fonts | Manrope (400-800) and JetBrains Mono (400-600) via `next/font/google`, self-hosted at build | Fonts named in the design; `next/font` avoids runtime requests to Google and layout shift. | n |
| Site domain | `NEXT_PUBLIC_SITE_URL` env var, default `http://localhost:3000` | Real domain unknown; `SEU-DOMINIO` must never ship. | n |
| Test environment | Vitest with `jsdom` and Testing Library | Project CLAUDE.md names Vitest + Testing Library. | y |
| Hero photo size | Source PNG is 2.1 MB; foundation copies it to `public/` and Home spec serves it through `next/image` | Avoid shipping 2 MB unoptimized; image work lands with the page that uses it. | n |
| E-mail in design | Use `rafacsilva016@gmail.com`; the design's `raafacsilva016@gmail.com` is a typo | User confirmed the correct address; applied in the Home spec. | y |
| Placeholders `[PERÍODO]`, `[conferir ...]`, "Baixar CV" `href="#"` in design | Not part of foundation; carried to the Home and case specs as open items | They are page content. | y |
| Color contrast rule | `#881E9B` is never used as text color; text uses `#C77DDB` or lighter | Design board states `#881E9B` fails AA (~2.5:1). | y |

**Open questions:** none - all resolved or logged above.

---

## User Stories

### P1: Runnable app and toolchain ⭐ MVP

**User Story**: As the site author, I want a scaffolded Next.js + TypeScript app with scripts and a tests directory so that every later feature starts from a green, reviewable baseline.

**Why P1**: Nothing else can be built or tested without it.

**Acceptance Criteria** (each line is one EARS pattern):

1. WHEN `pnpm dev` runs THEN the system SHALL serve `/` with HTTP 200 on port 3000.  <!-- event-driven -->
2. WHEN `pnpm build` runs on a clean checkout THEN the system SHALL exit with code 0 and produce a production build.  <!-- event-driven -->
3. WHEN `pnpm lint`, `pnpm typecheck` and `pnpm test` run THEN each SHALL exit with code 0 on the committed code.  <!-- event-driven -->
4. The system SHALL compile TypeScript with `strict: true`.  <!-- ubiquitous -->
5. The system SHALL keep all tests under a top-level `tests/` directory that mirrors the layout of `src/`.  <!-- ubiquitous -->
6. The system SHALL provide the directories `src/models/`, `src/services/`, `src/viewmodels/`, `src/components/`, `src/content/` and `src/app/`.  <!-- ubiquitous -->
7. IF a file under `src/models/` or `src/services/` imports from `react` or `next` THEN `pnpm lint` SHALL fail.  <!-- unwanted-behavior, protects Model layer purity -->
8. IF any file under `src/` imports from the `ui/` directory THEN `pnpm lint` SHALL fail.  <!-- unwanted-behavior -->

**Independent Test**: Fresh clone, `pnpm install`, run the five scripts, see exit code 0 each; add a forbidden import and see lint fail.

---

### P1: Dark visual system as tokens ⭐ MVP

**User Story**: As the site author, I want the "Sistema visual" tokens defined once so that every page renders the same black-and-purple look and meets contrast rules.

**Why P1**: All page views consume these tokens; changing them later means touching every component.

**Acceptance Criteria**:

1. The system SHALL define these colors in the Tailwind theme: background `#0B0B10`, card gradient `#16161F` to `#101018`, brand purple `#881E9B`, text purple `#C77DDB`, light purple `#E3B5F0`, button hover `#9B2BAF`, button pressed `#6F1780`, text `#ECEAF3`, secondary text `#A9A6BA`, thin border white at 8% opacity.  <!-- ubiquitous -->
2. The system SHALL render the page body with background `#0B0B10`, text color `#ECEAF3`, `color-scheme: dark` and font family Manrope.  <!-- ubiquitous -->
3. The system SHALL expose JetBrains Mono as a mono font token for labels and code.  <!-- ubiquitous -->
4. The system SHALL self-host both fonts at build time, with no request to `fonts.googleapis.com` at runtime.  <!-- ubiquitous -->
5. WHEN an interactive element receives keyboard focus THEN the system SHALL draw a 2 px outline in `#E3B5F0` offset by 3 px.  <!-- event-driven -->
6. WHERE the user agent reports `prefers-reduced-motion: reduce` the system SHALL disable all CSS transitions and animations.  <!-- optional-feature -->
7. IF a design token pair used for text on the page background has contrast below 4.5:1 THEN the token test SHALL fail.  <!-- unwanted-behavior, covers `#C77DDB`, `#ECEAF3`, `#A9A6BA` on `#0B0B10` -->
8. The system SHALL NOT use `#881E9B` as a text color.  <!-- ubiquitous -->

**Independent Test**: Unit test reads the token module and asserts values and contrast ratios; render the layout and check body styles and focus outline in jsdom/CSS assertions.

---

### P1: Site metadata and static assets ⭐ MVP

**User Story**: As a visitor sharing the link, I want the right title, icons and preview image so that the site looks professional in browsers and social networks.

**Why P1**: Metadata is shared by every route and is part of the delivered head snippet.

**Acceptance Criteria**:

1. The system SHALL set `<html lang="pt-BR">`.  <!-- ubiquitous -->
2. The system SHALL emit `color-scheme` `dark` and `theme-color` `#0B0B10`.  <!-- ubiquitous -->
3. The system SHALL emit `og:type` `website`, `og:locale` `pt_BR`, `og:title` "Rafael Couto Silva · Especialista Full Stack", `og:description` "Do requisito à produção, guiado por especificações.", `og:image` with width 1200 and height 630 and the alt text from `ui/head-snippet.html`.  <!-- ubiquitous -->
4. The system SHALL emit `twitter:card` `summary_large_image` with the same title, description and image.  <!-- ubiquitous -->
5. The system SHALL build every absolute URL (`og:url`, `og:image`, `twitter:image`) from `NEXT_PUBLIC_SITE_URL`.  <!-- ubiquitous -->
6. IF `NEXT_PUBLIC_SITE_URL` is unset THEN the system SHALL fall back to `http://localhost:3000` and SHALL NOT output the string `SEU-DOMINIO`.  <!-- unwanted-behavior -->
7. The system SHALL serve `favicon.svg`, `favicon.ico`, `favicon-32.png`, `favicon-180.png`, `favicon-192.png`, `favicon-512.png` and `og-image.png` from `public/`, copied from `ui/images/`.  <!-- ubiquitous -->
8. WHEN `GET /og-image.png` is requested THEN the system SHALL respond with HTTP 200 and content type `image/png`.  <!-- event-driven -->

**Independent Test**: Unit test on the metadata object; `curl` the running app for the head tags and asset URLs.

---

### P2: Typed PT-BR content layer

**User Story**: As the site author, I want all user-facing text in `src/content/` so that components never hardcode copy and page specs have a place to put it.

**Why P2**: Needed by the first page, but the foundation page can ship without real copy.

**Acceptance Criteria**:

1. The system SHALL keep all user-facing strings in typed modules under `src/content/`, written in PT-BR.  <!-- ubiquitous -->
2. The system SHALL export site-level content (site name, title, description, OG image alt text) from `src/content/` and consume it in the metadata.  <!-- ubiquitous -->
3. IF a component under `src/components/` contains a hardcoded PT-BR string literal THEN code review SHALL reject it (rule recorded in `CLAUDE.md`, no automated check).  <!-- unwanted-behavior -->

**Independent Test**: Change the site title in `src/content/` and see `og:title` change.

---

### P2: Root layout and placeholder home

**User Story**: As the site author, I want a root layout and a minimal `/` page so that the foundation can be demoed and deployed before the real Home exists.

**Why P2**: Proves tokens, fonts and metadata work together end to end.

**Acceptance Criteria**:

1. WHEN `/` is requested THEN the system SHALL render a Server Component page with one `<h1>` containing the site name from `src/content/`.  <!-- event-driven -->
2. The system SHALL render the placeholder page on the `#0B0B10` background with Manrope text.  <!-- ubiquitous -->
3. WHEN a path that does not exist is requested THEN the system SHALL respond with HTTP 404 and a dark-themed not-found page in PT-BR.  <!-- event-driven -->

**Independent Test**: Testing Library render of the page; `curl -i` on `/` (200) and `/nao-existe` (404).

---

## Edge Cases

- IF `public/` is missing an asset referenced by metadata THEN a test SHALL fail listing the missing file.
- IF `pnpm test` runs with no network THEN it SHALL still pass (fonts are build-time, tests do not fetch).
- WHEN `NEXT_PUBLIC_SITE_URL` has a trailing slash THEN the system SHALL emit URLs without a double slash.
- IF `NEXT_PUBLIC_SITE_URL` is set but is not a valid absolute http(s) URL THEN the system SHALL throw an error that names the variable, so the build fails instead of shipping broken URLs.

---

## Implicit-requirement dimensions

| Dimension | Resolution |
| --------- | ---------- |
| Input validation & bounds | N/A because foundation has no user input. Env var handling covered by metadata ACs 5-6 and the trailing-slash edge case. |
| Failure / partial-failure states | 404 page (home AC 3); missing asset test (edge cases). |
| Idempotency / retry / duplicate handling | N/A because there are no writes or retries. |
| Auth boundaries & rate limits | N/A because the site is public and static. |
| Concurrency / ordering | N/A because there is no shared mutable state. |
| Data lifecycle / expiry | N/A because there is no stored data. |
| Observability | N/A because analytics and logging are out of scope. |
| External-dependency failure | Fonts are self-hosted at build (visual AC 4); tests need no network (edge cases). |
| State-transition integrity | N/A because foundation has no stateful UI (menu state arrives with the Home spec). |

---

## Requirement Traceability

Each requirement gets a unique ID for tracking across design, tasks, and validation.

| Requirement ID | Story | Phase | Status |
| -------------- | ----- | ----- | ------ |
| FND-01 | P1: Runnable app and toolchain (AC 1-3) | Design | Pending |
| FND-02 | P1: Runnable app and toolchain (AC 4-6) | Design | Pending |
| FND-03 | P1: Runnable app and toolchain (AC 7-8) | Design | Pending |
| FND-04 | P1: Dark visual system (AC 1-4, 8) | Design | Pending |
| FND-05 | P1: Dark visual system (AC 5-7) | Design | Pending |
| FND-06 | P1: Site metadata and static assets (AC 1-6) | Design | Pending |
| FND-07 | P1: Site metadata and static assets (AC 7-8) | Design | Pending |
| FND-08 | P2: Typed PT-BR content layer | - | Pending |
| FND-09 | P2: Root layout and placeholder home | - | Pending |

**Coverage:** 9 total, 0 mapped to tasks, 9 unmapped ⚠️

---

## Success Criteria

- [ ] A fresh clone reaches a green `pnpm lint && pnpm typecheck && pnpm test && pnpm build` with no manual steps beyond `pnpm install`.
- [ ] Opening `/` shows the dark placeholder page and the shared link preview shows `og-image.png` with the correct title.
- [ ] A new page spec can be written using only `src/content/`, tokens and the MVVM folders, without touching tooling.
