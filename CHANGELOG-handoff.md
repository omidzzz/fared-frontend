# CHANGELOG — handoff stabilization

Exactly what changed to reach the stable handoff snapshot. **No application
code was modified** — the project already built and type-checked cleanly. All
changes are config/docs/cruft only.

- **Added `.env.example`** — lists the two referenced env var names
  (`NEXT_PUBLIC_BACKEND_URL`, `NEXT_PUBLIC_MEDUSA_URL`) with notes, no values.
  Required because no env template existed. (Neither var is needed to run the
  current mock-data app.)
- **`.gitignore`** — added `!.env.example` so the template is committable while
  real `.env*` stay ignored; added `.claude/settings.local.json` so the local
  agent override doesn't leak into the snapshot.
- **Removed `public/75105856.txt`** — 0-byte stray file, not project work.
- **Added `HANDOFF.md`** — install/run/build, env vars, implemented-vs-not
  summary, route inventory, known issues, and what the client must own.
- **Added `CHANGELOG-handoff.md`** — this file.

## Verified after changes
- `npx tsc --noEmit` → no errors.
- `npx next build` → ✓ Compiled successfully, 63 routes, 0 errors / 0 warnings.
- All reachable routes return HTTP 200 (no hard crashes on main flows).

## Deliberately NOT changed (flagged, left for client decision)
- Orphaned/scratch routes (`/test*`, `/shop/*-v2|-v3`, redirect-shadowed
  `app/tahririye/*` & `app/editorial/*`) — build fine, unlinked; left in place so
  no source is lost.
- `/tahrirye` card → 404 broken flow — left as-is (a 404 is not a crash); see
  HANDOFF.md §6 for the one-line fix.
- Missing `package-lock.json` (deleted from working tree) — NOT regenerated to
  avoid changing dependency resolution at handoff; recommend the client run
  `npm install` to restore a lockfile.
