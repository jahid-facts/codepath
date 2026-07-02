# SystemPath

A bilingual Bangla/English system-design learning application built with Next.js. It includes forty visual lessons, 200 exam questions, eight guided design labs, browser-saved progress, an architecture simulator, global search, personal review coaching, achievements, notes, focus tools, and portable progress backups.

## Commands

- `npm run dev` — start the local development server.
- `npm test` — validate curriculum, exams, labs, scoring, and simulator logic.
- `npm run build` — create a production build.
- `npm run test:e2e` — run desktop and mobile Playwright journeys against a production server (run the build first).
- `npm run test:e2e:mobile` — run the focused mobile browser suite.
- `npm run test:a11y` — run WCAG and keyboard checks.
- `npm run test:performance` — enforce browser performance budgets.
- `npm run data:backup` / `npm run data:verify` — create and verify SQLite snapshots.
- `npm run health:check` — check a deployed `/api/health` endpoint.
- `npm run security:audit` — fail on high/critical production dependency advisories.

The product and engineering specification is in `docs/SYSTEM_DESIGN_LEARNING_APP_PLAN.md`.

## Private admin analytics

The protected `/admin` dashboard provides visitor totals, today’s traffic, IP addresses, inferred device names, browser/OS breakdowns, entry paths, trends, search, and CSV export. Configure `ADMIN_PASSWORD`, `ADMIN_SESSION_SECRET`, and a persistent `ANALYTICS_DB_PATH` using `.env.example` before opening `/admin/login`.

Deployment and privacy details are documented in `docs/ADMIN_ANALYTICS.md`.

## Production routes and authoring

Lessons, exams, labs, simulator, and review now use real Next.js routes. Authenticated administrators can create bilingual supplemental lessons at `/admin/content`; published content appears in `/library`. The seven-part release is documented in `docs/PRODUCTION_IMPROVEMENT_RELEASE.md`, and the optional future Laravel/PostgreSQL boundary is documented in `docs/LARAVEL_POSTGRESQL_BACKEND_PLAN.md`.
