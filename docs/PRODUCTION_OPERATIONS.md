# SystemPath Production Operations

## Health and uptime

`GET /api/health` performs SQLite quick checks for analytics, managed content, and monitoring. It returns HTTP 200 with `status: ok` or HTTP 503 without exposing record counts. Configure an external uptime monitor to request it every one to five minutes and alert the operator after two consecutive failures.

Manual check:

```text
HEALTHCHECK_URL=https://your-domain.example/api/health npm run health:check
```

## Error and Web Vitals monitoring

After analytics consent, the client records sanitized runtime errors and TTFB, FCP, LCP, and CLS measurements through `/api/monitoring/event`. Records use the same persistent SQLite database and default to 30-day retention. Server-side client errors are also written as structured JSON on stderr so the deployment log collector can alert on `event=client_error` or `event=health_check_failed`.

Set `MONITORING_RETENTION_DAYS` to the approved retention period. Alerting belongs in the hosting/log platform; application code cannot guarantee delivery when its own host is unavailable.

## Backups

`npm run data:backup` performs `quick_check`, checkpoints WAL, creates a consistent SQLite snapshot with `VACUUM INTO`, writes a SHA-256 manifest, and retains the newest fourteen backups by default. `npm run data:verify -- <directory>` verifies both checksum and SQLite integrity.

Recommended schedule: encrypted daily backups copied to storage outside the application host, plus a monthly restore drill.

Restore only while the application is stopped:

```text
npm run data:restore -- backups/<timestamp> --confirm
```

Restore validates the snapshot and preserves the current database as a timestamped pre-restore copy. Never treat an untested backup as recoverable.

## Performance budgets

Budgets live in `performance-budgets.json`. `npm run test:performance` checks dashboard, flagship lesson, and simulator on desktop and mobile for TTFB, DOM readiness, load time, LCP, CLS, request count, and transfer size. Review budget changes in code review; do not increase limits merely to silence a regression.

## Dependency security

`npm run security:audit` fails on high or critical production advisories and reports moderate findings. Dependabot checks weekly. The currently bundled Next.js PostCSS advisory has only an unsafe breaking downgrade suggested by npm, so it remains tracked rather than force-fixed. Upgrade through a tested upstream release.

## Release checklist

1. Run unit tests and production build.
2. Run full Playwright, accessibility, performance, and visual checks.
3. Verify `/api/health` against the release candidate.
4. Create and verify an off-host database backup.
5. Confirm HTTPS, persistent disk, environment secrets, retention, and uptime alerts.
6. Review database migration and content-version rollback behavior.
