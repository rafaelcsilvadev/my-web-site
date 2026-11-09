# Este Site Design

**Spec**: `.specs/features/este-site/spec.md`
**Status**: Draft

---

## Architecture Overview

No new layer and no new route. The page reuses the case template (`CaseContent` → `CaseView`) and the Home project card. Four small gaps in the template are closed, each as an optional or additive change so Avaria, My Trello Version and the current Home keep rendering the same.

```mermaid
graph TD
    C[este-site-case.ts] --> R[cases.ts registry]
    R --> P["casos/[slug]/page.tsx (unchanged)"]
    R --> S[sitemap.ts (unchanged)]
    P --> V[CaseView]
    V --> CC[CaseCallout + inline code]
    V --> ER[CaseEvidenceRow]
    V --> CL[CaseClosing + next row]
    H[home.ts] --> PC[ProjectCard wide + rows]
    VM[inline-code.ts] --> CC
```

### Approaches considered for the template gaps

| Gap | A (recommended) | B | Why A |
| --- | --------------- | - | ----- |
| Inline `src/content/` code inside a callout item | Content stays a `string` with backtick marks; ViewModel `splitInlineCode(text)` returns segments; the view renders `<code>` | Item type becomes `string \| Segment[]`; content writes segments by hand | A keeps content readable and the parsing testable without React (MVVM). B pushes markup structure into every content file. |
| Evidence row of three mixed cards (one metric, two highlights) | New block `evidence` rendered by one `CaseEvidenceRow` (single `ul`, `md:grid-cols-3`) | Reuse `metrics` and `highlights` blocks side by side | The two existing blocks have their own grids (4 and 2 columns); side by side they cannot form one row of three. |
| "Próximo caso" row inside the My Trello Version closing card | Optional `next` field on `CaseClosing`, rendered below a divider in the same card | A second `CaseClosing` card under the first | The board shows one card with a divider. Optional field keeps the other two closings unchanged (spec SITE-07 AC 6). |
| Wide Home card with label/value rows | `ProjectItem.layout?: "wide"` and `metricsStyle: "rows"`; `ProjectCard` picks its classes from a lookup map | New `WideProjectCard` component | One card component, one set of tests; the lookup-map pattern already exists in `CaseSection` (`LAYOUT_CLASS`). |

---

## Code Reuse Analysis

### Existing Components to Leverage

| Component | Location | How to Use |
| --------- | -------- | ---------- |
| `CaseView`, `CaseHero`, `CaseSection`, `CaseStack`, `CaseFigure` | `src/components/` | Unchanged apart from the `evidence` branch in `CaseView`. Este site uses them for hero, Objetivo (`paragraphs` block), Stack and the figure. |
| `CaseCallout` | `src/components/CaseCallout.tsx` | Extend to render inline code segments. |
| `CaseClosing` | `src/components/CaseClosing.tsx` | Extend with optional `next` row. |
| `ProjectCard` | `src/components/ProjectCard.tsx` | Extend with `wide` layout and `rows` metric style. |
| `case-chrome`, `findCase`, `buildCaseMetadata`, `sitemap.ts` | `src/content`, `src/viewmodels`, `src/app` | Unchanged; all derive from the `cases` array. |
| `tests/app/public-assets.test.ts` | `tests/app/` | Add the new PNG to the allow-list and size check. |

### Integration Points

| System | Integration Method |
| ------ | ------------------ |
| Route `/casos/[slug]` | `generateStaticParams` reads `caseSlugs`; adding the entry to `cases` is the whole wiring. |
| Sitemap | `sitemap.ts` maps `caseSlugs`; no change. |
| Home | New item appended to `homeContent.projects.items`; `ProjectsSection` already maps the array. |

---

## Components

### `splitInlineCode` (ViewModel)

- **Purpose**: Split a string with backtick marks into ordered `{ text, code }` segments.
- **Location**: `src/viewmodels/inline-code.ts`
- **Interfaces**: `splitInlineCode(text: string): { text: string; code: boolean }[]`. Text without backticks returns one non-code segment; an unmatched backtick stays literal text; empty text returns `[]`.
- **Dependencies**: none (plain TypeScript).
- **Reuses**: pattern of `findCase` in `src/viewmodels/case-view-model.ts`.

### `CaseCallout` (View, modified)

- **Purpose**: Render each callout item through `splitInlineCode`, code segments in `<code>` with the monospace token.
- **Location**: `src/components/CaseCallout.tsx`
- **Interfaces**: props unchanged (`label`, `items: string[]`).
- **Reuses**: `font-mono` utility used elsewhere for code (`brand-light` color).

### `CaseEvidenceRow` (View, new)

- **Purpose**: One list of cards, each either a metric (`value` + `label`) or a highlight (`title` + `text`), three columns from `md`.
- **Location**: `src/components/CaseEvidenceRow.tsx`
- **Interfaces**: `items: EvidenceItem[]`; empty list renders nothing.
- **Reuses**: card classes from `CaseMetrics` and `CaseHighlights` (same `card-glow` surface).

### `CaseClosing` (View, modified)

- **Purpose**: When `next` is present, render a divider and a row with eyebrow, title and one `ButtonLink` after the actions.
- **Location**: `src/components/CaseClosing.tsx`
- **Interfaces**: `next?: { eyebrow: string; title: string; action: CaseAction }`.
- **Reuses**: `ButtonLink`.

### `ProjectCard` (View, modified)

- **Purpose**: `layout: "wide"` spans two grid columns from `md` and splits text and rows into two columns; `metricsStyle: "rows"` renders label/value rows (label left, value right).
- **Location**: `src/components/ProjectCard.tsx`
- **Interfaces**: reads `project.layout` and `project.metricsStyle`; absent `layout` keeps the current classes.
- **Reuses**: existing `dl` markup for metrics.

---

## Data Models

```typescript
// src/models/case-content.ts (additive)
export type EvidenceItem =
  | { kind: "metric"; value: string; label: string }
  | { kind: "highlight"; title: string; text: string };

export type CaseBlock =
  | /* existing kinds */
  | { kind: "evidence"; items: EvidenceItem[] };

export interface CaseClosing {
  /* existing fields */
  next?: { eyebrow: string; title: string; action: CaseAction };
}

// src/models/home-content.ts (additive)
export interface ProjectItem {
  /* existing fields */
  metricsStyle: "text" | "number" | "rows";
  layout?: "wide";
}
```

**Relationships**: `EvidenceItem` metric shape equals `Metric`; `CaseAction` is the existing type.

### Content: Este site (`src/content/este-site-case.ts`)

- `slug: "este-site"`, `backLink`, `eyebrow`, `title`, `intro`, `heroActions` (GitHub primary with `github` icon, Contato ghost), `facts: []`.
- Section 01 Objetivo: `layout: "split"`, one `paragraphs` block.
- Section 02 Decisões: `layout: "split"`, one `callout` block "O que decidi" with three items (third with backticks around `src/content/`).
- Section 03 Evidências: `layout: "stacked"`, an `evidence` block (3 items) and a `figure` block (`/este-site-home.png`, 1679x1127).
- `stack`: label "Stack", one unlabeled group (4 chips, 2 main), no note.
- `closing`: eyebrow "Fim dos casos", three actions; no `next`.

---

## Error Handling Strategy

| Error Scenario | Handling | User Impact |
| -------------- | -------- | ----------- |
| Unknown slug | `dynamicParams = false` plus `notFound()` (already in place) | Foundation 404 |
| Screenshot fails to load | `next/image` with explicit `width`/`height`; caption and alt stay | No layout shift |
| Empty `items` in callout, evidence or closing `next` | Components return `null` for the container | No empty box |
| Unmatched backtick in a callout item | `splitInlineCode` keeps it as literal text | Text shown as written |

---

## Risks & Concerns

| Concern | Location (file:line) | Impact | Mitigation |
| ------- | -------------------- | ------ | ---------- |
| Tests assert the exact slug list and project count | `tests/content/cases.test.ts:7`, `tests/content/home.test.ts` | Fail when the third entry is added | Each registering task updates its own test in the same commit (T8, T11). |
| The `CaseBlock` switch has no default branch | `src/components/CaseView.tsx:CaseBlockView` | A new `kind` without a branch returns `undefined` and breaks typecheck or render | The `evidence` kind and its `CaseView` branch land in one task (T4). |
| `193` commits is static and grows | `src/content/este-site-case.ts` | Number goes stale | Logged in the spec Assumptions; the author updates it on publish. |
| Public asset allow-list | `tests/app/public-assets.test.ts` | New PNG fails the allow-list test | T6 updates the list with the PNG. |
| `ProjectCard` is shared by the two validated cards | `src/components/ProjectCard.tsx` | Regression in Avaria and Trello cards | Existing `ProjectCard` tests stay unchanged and green; new behavior only behind `layout` and `rows` (spec SITE-10 AC 8). |

---

## Tech Decisions (only non-obvious ones)

| Decision | Choice | Rationale |
| -------- | ------ | --------- |
| Inline code markup | Backticks in content strings, parsed in a ViewModel | Content stays plain text; logic out of JSX (MVVM, AD-002 boundaries respected: no React in `src/viewmodels` function). |
| Conformance with STATE.md | AD-001 (tokens only in `globals.css`): no new token, existing `brand-light`/`font-mono` reused. AD-002 (MVVM boundaries): models stay React-free; the new ViewModel has no React import | Both active decisions are conformed to; none superseded. |
| No new `AD-NNN` | Decisions above are feature-local | They set no convention for other features. |
