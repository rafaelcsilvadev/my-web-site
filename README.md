# my-web-site

Personal portfolio of Rafael Couto Silva. Static-first site with public content in PT-BR, featuring a home page and three case studies (Avaria, My Trello Version and this site).

🌐 **Live site:** [rafacoutodev.dev.br](https://rafacoutodev.dev.br)

## Stack

- [Next.js](https://nextjs.org) (App Router) + React 19
- TypeScript (strict)
- Tailwind CSS 4
- Vitest + Testing Library
- pnpm

## Getting started

Requirements: Node.js and pnpm (see `packageManager` in `package.json`).

```bash
pnpm install
cp .env.example .env.local   # optional
pnpm dev                     # http://localhost:3000
```

### Environment

| Variable               | Description                                                                                       |
| ---------------------- | ------------------------------------------------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL` | Public origin (http/https) used for canonical, Open Graph and Twitter URLs. Defaults to `http://localhost:3000` when empty. |

## Scripts

| Command          | Description                                         |
| ---------------- | --------------------------------------------------- |
| `pnpm dev`       | Start the dev server.                               |
| `pnpm build`     | Production build.                                   |
| `pnpm start`     | Serve the production build.                         |
| `pnpm lint`      | ESLint (also enforces the MVVM import boundaries).  |
| `pnpm typecheck` | `tsc --noEmit`.                                     |
| `pnpm test`      | Vitest, single run.                                 |

Full gate before a PR:

```bash
pnpm lint && pnpm typecheck && pnpm test && pnpm build
```

## Architecture (MVVM)

Dependencies point one way: View → ViewModel → Model.

| Layer     | Path                                         | Role                                                                 |
| --------- | -------------------------------------------- | -------------------------------------------------------------------- |
| Model     | `src/models/`, `src/services/`               | Plain TypeScript types, domain rules and data access. No React.      |
| ViewModel | `src/viewmodels/`                            | `useXxxViewModel` hooks or plain functions with all presentation logic. |
| View      | `src/components/`, `src/app/**/page.tsx`     | Dumb React components that render Tailwind markup.                   |

Other folders:

- `src/app/`: routing, layouts, metadata (`site-metadata.ts`, `robots.ts`, `sitemap.ts`) and wiring. Prefers Server Components.
- `src/content/`: all user-facing PT-BR text. Components never hardcode copy.
- `tests/`: Vitest tests, mirroring `src/`.
- `public/`: static assets served by the app.
- `ui/`: external design inputs, read-only (see below).

## Design inputs (`ui/`)

- `ui/boards/`: design boards exported as PNG (Home, case pages, closing), desktop and mobile. Visual source of truth for the UI.
- `ui/images/`: photos, favicons and OG image sources. Copy what the app serves into `public/`; never import from `ui/`.
- `ui/head-snippet.html`: reference for `<head>` metadata.
- `ui/site-rafael-couto-silva/`: static site reference export.

## Spec-driven development (SDD)

Feature work follows the `tlc-spec-driven` skill, in four adaptive phases:

1. **Specify**: testable requirements in EARS notation.
2. **Design**: technical approach, sized to the complexity of the feature.
3. **Tasks**: atomic tasks, each one a small Conventional Commit.
4. **Execute**: implement task by task, with tests, verification and requirement traceability.

Decisions are recorded in `STATE.md` (decision log). An independent verifier checks the work against the spec before it is considered done. The development workflow and commit rules in `CLAUDE.md` complement the skill; for task commits, the skill's Execute contract wins.

## Conventions

- Code, identifiers, comments, tests and commits are in English; user-facing text is in PT-BR.
- Conventional Commits, small and reviewable, with tests in the same commit as the code they cover.
- Tests first: see the test fail for the right reason before writing production code.

See `CLAUDE.md` for the full project guidelines.
