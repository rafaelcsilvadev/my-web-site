# STATE

## Decisions

### AD-001
- **Decision**: Design tokens live only in `src/app/globals.css` (`@theme`); tests parse the CSS instead of mirroring values in a TypeScript module.
- **Reason**: Tailwind 4 reads tokens from CSS, so a TS twin would drift from the real source.
- **Trade-off**: Token tests depend on CSS structure and need a small parsing helper.
- **Scope**: All features that add or change colors, fonts or base styles.
- **Date**: 2026-11-06
- **Status**: active

### AD-002
- **Decision**: MVVM layer boundaries (no `react`/`next` in `src/models` and `src/services`, no imports from `ui/`) are enforced by ESLint `no-restricted-imports`, and the rules themselves are tested through the ESLint API.
- **Reason**: A convention only written in `CLAUDE.md` erodes; a failing `pnpm lint` does not.
- **Trade-off**: One more config file to maintain, and view-layer purity (no logic in JSX) stays a review rule.
- **Scope**: Every feature under `src/`.
- **Date**: 2026-11-06
- **Status**: active

## Handoff

