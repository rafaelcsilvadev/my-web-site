# LESSONS - auto-maintained by scripts/lessons.py

> Machine-owned. Do NOT hand-edit. Changes are overwritten on the next `lessons.py` write.
> Canonical state lives in `.specs/lessons.json`. Edit lessons only via the script.
> promote_threshold=2 distinct features · window_days=45 · quarantine_threshold=2

## Confirmed (load these at Specify/Design)

Corroborated across multiple features. Safe to apply as guidance.

_none_

## Candidates (under observation - do NOT load as guidance yet)

Seen once or not yet corroborated. Tracked, not trusted.

### L-001 - Assert the LCP hint (priority/fetchpriority) on hero images, not only alt and dimensions
- signal: `surviving_mutant` · recurrence: 1 feature(s) · scope: `components` · harmful: 0
- features: home
- evidence: M7 src/components/Hero.tsx:37 (components)
- last seen: 2026-11-07T02:24:15Z

### L-002 - Point source-scan guards at every directory the spec names, including src/app
- signal: `spec_precision_gap` · recurrence: 1 feature(s) · scope: `tests` · harmful: 0
- features: home
- evidence: tests/components/HomeView.test.tsx:65-85 (tests)
- last seen: 2026-11-07T02:24:16Z

### L-003 - Define which decorative elements 'number badges' covers in accessibility ACs, so each is asserted aria-hidden or explicitly exempt
- signal: `spec_precision_gap` · recurrence: 1 feature(s) · scope: `components` · harmful: 0
- features: cases
- evidence: validation.md P2 AC3 (src/components/CaseSteps.tsx:19) (components)
- last seen: 2026-11-08T15:03:03Z

### L-004 - When a component gains an optional prop, add a page-level test that renders real content through the parent view and asserts the new output, not only the component and content in isolation
- signal: `ac_gap` · recurrence: 1 feature(s) · scope: `views` · harmful: 0
- features: this-site
- evidence: src/components/CaseView.tsx:99-104 (Chain AC2, AC4) (views)
- last seen: 2026-11-09T23:15:02Z

## Quarantined (failed when applied - ignore)

A confirmed lesson that recurred alongside failure. Kept for the maintainer to review.

_none_
