# Production Improvement Release

Status: Implemented on 30 June 2026.

## 1. Real Next.js routes

The core app now uses shareable, reload-safe routes:

- `/learn`
- `/lessons/[topicId]`
- `/exams/[topicId]`
- `/labs` and `/labs/[labId]`
- `/simulator`
- `/review`
- `/library`

Core lesson and exam routes are statically generated with route-specific metadata. Legacy hash links remain readable for backward compatibility.

## 2. Maintainability

The monolithic client file was reduced by extracting versioned progress recovery, onboarding, architecture diagrams, profile/privacy controls, learning statistics, analytics consent, and cloud-sync adapters into focused modules. Remaining page domains can now be migrated independently without changing their data contracts.

## 3. Accessibility

Implemented skip navigation, deterministic route focus, live route announcements, current-page navigation semantics, focus trapping and restoration for dialogs, unique diagram labels, interactive group semantics, reduced-motion support, and a WCAG AA contrast layer. Automated Axe checks cover dashboard, curriculum, flagship lessons, simulator, and privacy on desktop and mobile; keyboard tests cover skipping and modal containment.

## 4. Visual regression

Playwright stores reviewed 390px mobile baselines for the dashboard, flagship lesson, and simulator. JavaScript-driven diagram animation is frozen during capture so diffs are deterministic.

## 5. Laravel/PostgreSQL boundary

Guest mode remains local and account-free. `app/services/progress-sync.js` defines versioned guest and HTTP adapters plus deterministic conflict resolution. `docs/LARAVEL_POSTGRESQL_BACKEND_PLAN.md` defines the future Laravel/Sanctum/PostgreSQL/Redis migration without adding an unused second runtime today.

## 6. Admin content editor

Authenticated administrators can create, update, publish, and delete bilingual supplemental lessons at `/admin/content`. Content is stored in SQLite, published lessons receive `/managed-lessons/[slug]` pages, and `/library` makes them discoverable. This managed library is intentionally separate from the validated forty-topic core curriculum and its five-question-per-topic exam guarantee.

## 7. Privacy and consent

Technical visit analytics is disabled until explicit consent. Learners may decline without losing features, change consent later, delete server-side records for their visitor identifier, and keep learning progress untouched. `/privacy` provides the public policy and Bangla summary.

## Verification commands

```text
npm test
npm run build
npm run test:e2e
npm run test:a11y
npm run test:visual
```

## Dependency advisory

`npm audit --omit=dev` currently reports two moderate findings from the PostCSS version bundled by Next.js. npm offers only a forced, breaking downgrade to Next 9.3.3, so no unsafe automatic fix was applied. Track the upstream Next.js/PostCSS patch and upgrade through a normal tested release.
