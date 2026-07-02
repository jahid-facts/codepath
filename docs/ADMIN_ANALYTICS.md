# SystemPath Admin Analytics

## Overview

The private `/admin` area records and reports visitor sessions separately from the learning application. It shows total and unique visitors, today’s traffic, visitors active within five minutes, seven-day trends, device/browser/OS distribution, entry pages, IP addresses, screen size, language, timezone, referrer, and recent session details.

## Required configuration

Copy `.env.example` to `.env.local` for local development and set strong values:

```env
ADMIN_PASSWORD=a-long-random-password
ADMIN_SESSION_SECRET=a-different-long-random-secret
ANALYTICS_DB_PATH=./data/analytics.sqlite
ANALYTICS_RETENTION_DAYS=90
```

Then restart the Next.js server and open `/admin/login`. The session cookie is HTTP-only, SameSite Strict, secure in production, signed, and valid for twelve hours. Five failed logins from one IP within fifteen minutes trigger a temporary lockout.

## Storage and deployment

Analytics use Node’s built-in SQLite API, so Node 22.5 or newer and a writable persistent filesystem are required. For containers or virtual machines, point `ANALYTICS_DB_PATH` to a mounted persistent volume. Ephemeral/serverless filesystems will lose data when the instance is recycled; use a persistent deployment or replace the storage adapter with a managed analytics database before deploying there.

SQLite database, WAL, environment, and local secret files are excluded from version control. Session IDs are unique, so the same browser tab session is not counted twice. Records older than `ANALYTICS_RETENTION_DAYS` are deleted during new visit ingestion.

## Privacy behavior

- Visitor tracking respects the browser’s Do Not Track setting.
- Learning progress and notes remain in the learner’s browser; only technical visit metadata is sent to the analytics endpoint.
- IP addresses are stored for the configured retention period but masked by default in the admin table.
- Revealing IPs and CSV export require an authenticated administrator.
- The learner profile exposes an analytics on/off control and explains the difference between local learning data and server visit metadata.
- “Delete my analytics” removes every server record for that browser visitor ID through `POST /api/analytics/delete`, clears the identifiers, and opts the browser out of future collection.
- Exact hardware names are often unavailable because modern browsers intentionally reduce user-agent detail; the dashboard labels inferred device/platform names accordingly.
- Before public launch, publish an appropriate privacy notice and confirm consent, retention, and IP-processing requirements for the countries where the product operates.

## Operations

The dashboard refreshes automatically every thirty seconds and can be refreshed manually. CSV export applies the current search and device filters. Set up normal encrypted backups for the SQLite file and terminate all production traffic with HTTPS.

Health checks, structured errors, Core Web Vitals, backup/restore commands, uptime alerts, and release operations are documented in `docs/PRODUCTION_OPERATIONS.md`.
