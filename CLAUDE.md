<!-- claude-kit:begin (managed by bootstrap.sh; edit outside this block, re-run to update) -->
## Development workflow

- **See red first.** Write the test, run it, and confirm it fails for the right reason before writing production code. If it passes right away, stop: either the test is wrong or the behavior already exists.
- **Tests live apart from production code**, in their own test project, package or directory (`*.Tests`, `tests/`, `src/test/`), never mixed with the main code.
- **Propose, don't just ask.** Every design question comes with a concrete recommendation and the reason. When there are distinct paths, name them (A, B, C) with their trade-offs and mark the recommended one. Disagree with an argument (a failing case, a maintenance cost); once the user decides, record it and move on.
- **Pull Request.** Ask before pushing and opening the PR. The description lists the tasks/commits, the decisions taken and the open items. Address each review comment in its own commit and reply to the comment.

## Commits: small, for easy code review

- One logical change per commit. Each commit is reviewable on its own in a few minutes. Aim for roughly ≤ 200 changed lines, excluding generated files and lockfiles.
- Split by concern: refactor/rename/formatting go in separate commits from behavior changes, and dependency bumps go in their own commit.
- Tests go in the same commit as the code they cover.
- Every commit must build and pass the tests. Never commit a broken intermediate state.
- Use Conventional Commits (`feat:`, `fix:`, `refactor:`, `test:`, `chore:`, `docs:`) with an imperative, specific subject.
- If a change grows too big, stop, propose a split into a commit sequence, and confirm it before continuing.
- Commit only when the user asks or when an approved workflow authorizes it (e.g. tlc-spec-driven tasks). Never push without an explicit request.

### Commit suggestions (always)

After any change to files in a git repository, and when you did not commit yourself, end the reply with a commit suggestion that is ready to copy and paste:

- Run `git status` and `git diff --stat` first, so the suggestion matches the real changes.
- Split the changes into small commits following the rules above. Order them so each commit builds on its own.
- Give one bash block per commit. Stage explicit paths with `git add <path> ...` and never use `git add .` or `git add -A`. Use `git add -p <file>` when one file mixes two concerns, and say which hunks belong to which commit.
- Write the message with `git commit -m "<type>(<scope>): <subject>"`. Add a second `-m` for the body only when the "why" isn't obvious.
- Mention files that must not be committed, such as secrets, `design-mcp.md` with a real access code, or local configs.
- Don't run these commands yourself unless the user asks.

Example:
```bash
git add src/Debts/RegisterDebt.cs tests/Debts/RegisterDebtTests.cs
git commit -m "feat(debts): register debt with amount validation"
```

## Spec-driven development

Feature work in this project follows the `tlc-spec-driven` skill, used as-is. The Development workflow and Commits rules complement it; when they overlap, the skill's Execute contract wins for task commits.
<!-- claude-kit:end -->

## Project: personal portfolio (Rafael Couto Silva)

Static-first portfolio site. Public content is in PT-BR.

### Stack

- Next.js (App Router) + TypeScript (strict) + Tailwind CSS.
- Tests: Vitest + Testing Library, in a top-level `tests/` directory that mirrors `src/`.
- Package manager: pnpm. Exact scripts (dev, build, lint, test): record here once the app is scaffolded.

### Architecture: MVVM

- **Model** (`src/models/`, `src/services/`): plain TypeScript types, domain rules and data access. No React.
- **ViewModel** (`src/viewmodels/`): custom hooks or plain functions (`useXxxViewModel`) that expose state and actions to a view. All presentation logic lives here, never in JSX. Tested with Vitest without rendering real UI where possible.
- **View** (`src/components/`, `src/app/**/page.tsx`): dumb React components. They receive data and callbacks from a ViewModel and render Tailwind markup. No business logic, no data fetching inside leaf components.
- `src/app/` holds only routing, layouts, metadata and wiring (Server Components fetch data and pass it to Views). Prefer Server Components; add `"use client"` only where a ViewModel needs state or effects.
- Dependencies point one way: View → ViewModel → Model.

### Language

- Code, identifiers, comments, tests and commits: English.
- All user-facing text: PT-BR, kept in one place (`src/content/`), never hardcoded in components. `<html lang="pt-BR">`.

### External design inputs: `ui/`

`ui/` is the source for everything that comes from outside the code. Treat it as read-only input.

- `ui/images/`: photos, favicons, OG image. Copy what the app serves into `public/`; do not import from `ui/`.
- `ui/claude-design-link.md`: link to the design (currently empty; ask the user for it before building UI).
- `ui/head-snippet.html`: reference for `<head>` metadata (theme color, favicons, Open Graph, Twitter). Port it to the Next.js `metadata` API and replace `https://SEU-DOMINIO` with the real domain.
- Visual direction from the snippet: dark color scheme, `#0B0B10` theme color.
