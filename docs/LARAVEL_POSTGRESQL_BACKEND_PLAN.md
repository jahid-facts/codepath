# Laravel/PostgreSQL Backend Boundary

## Decision

Keep the current account-free browser experience as the default. Introduce Laravel and PostgreSQL only when authenticated cross-device progress, teams, certificates, or centrally managed publication are required. SQLite remains appropriate for the current single-instance private analytics and content-authoring console.

## Stable client contract

`app/services/progress-sync.js` defines a versioned progress envelope and two interchangeable adapters:

- `GuestProgressAdapter`: current offline-first behavior with no network dependency.
- `HttpProgressAdapter`: future authenticated API behavior.

The client contract uses `GET /api/v1/me/progress` and `PUT /api/v1/me/progress`. Updates include an `If-Match` revision so concurrent devices receive `409 Conflict` instead of silently overwriting newer learning history.

## Recommended Laravel stack

- Laravel API with Sanctum cookie authentication
- PostgreSQL for users, progress snapshots, attempts, content versions, and audit logs
- Redis for sessions, queues, rate limiting, and short-lived caches
- Object storage for content assets and exported reports
- Queue workers for email, certificates, imports, and analytics aggregation

## Core tables

- `users`
- `learner_progress` (`user_id`, `schema_version`, `revision`, `payload`, timestamps)
- `exam_attempts` with immutable answers and score snapshots
- `course_topics` and `course_topic_versions`
- `content_publications` and `content_audit_logs`
- `user_consents` with purpose, policy version, and timestamps

## Migration sequence

1. Deploy Laravel behind `/api/v1` without changing guest behavior.
2. Add optional sign-in and explicit “sync this device” action.
3. Upload the local progress envelope after consent.
4. Resolve the first conflict explicitly; never discard either device silently.
5. Move managed content publication from local SQLite to PostgreSQL.
6. Retain JSON export and account deletion as portability and privacy controls.

No Laravel runtime is added to this repository yet because the product currently promises no accounts. The adapter boundary prevents that future backend from forcing a learner-facing rewrite.
