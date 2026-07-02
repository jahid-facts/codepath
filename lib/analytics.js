import 'server-only'

import { mkdirSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { DatabaseSync } from 'node:sqlite'
import { parseUserAgent } from './user-agent.js'

let database

function getDatabase() {
  if (database) return database
  const filename = process.env.ANALYTICS_DB_PATH || join(process.cwd(), 'data', 'analytics.sqlite')
  mkdirSync(dirname(filename), { recursive: true })
  database = new DatabaseSync(filename)
  database.exec(`
    PRAGMA journal_mode = WAL;
    PRAGMA busy_timeout = 5000;
    CREATE TABLE IF NOT EXISTS visits (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      session_id TEXT NOT NULL UNIQUE,
      visitor_id TEXT NOT NULL,
      ip_address TEXT NOT NULL,
      user_agent TEXT NOT NULL,
      browser TEXT NOT NULL,
      operating_system TEXT NOT NULL,
      device_type TEXT NOT NULL,
      device_name TEXT NOT NULL,
      language TEXT NOT NULL,
      timezone TEXT NOT NULL,
      screen_size TEXT NOT NULL,
      path TEXT NOT NULL,
      referrer TEXT NOT NULL,
      created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))
    );
    CREATE INDEX IF NOT EXISTS visits_created_at_idx ON visits(created_at DESC);
    CREATE INDEX IF NOT EXISTS visits_visitor_id_idx ON visits(visitor_id);
  `)
  return database
}

const clean = (value, fallback, max = 300) => typeof value === 'string' && value.trim() ? value.trim().slice(0, max) : fallback

export function recordVisit(input) {
  const db = getDatabase()
  const retentionDays = Math.min(3650, Math.max(1, Number(process.env.ANALYTICS_RETENTION_DAYS) || 90))
  db.prepare("DELETE FROM visits WHERE created_at < datetime('now', ?)").run(`-${retentionDays} days`)
  const parsed = parseUserAgent(input.userAgent)
  const statement = db.prepare(`
    INSERT OR IGNORE INTO visits (
      session_id, visitor_id, ip_address, user_agent, browser, operating_system,
      device_type, device_name, language, timezone, screen_size, path, referrer
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `)
  const result = statement.run(
    clean(input.sessionId, 'unknown-session', 100),
    clean(input.visitorId, 'unknown-visitor', 100),
    clean(input.ipAddress, 'Unknown', 100),
    clean(input.userAgent, 'Unknown', 700),
    parsed.browser,
    parsed.operatingSystem,
    parsed.deviceType,
    clean(input.deviceName, parsed.deviceName, 100),
    clean(input.language, 'Unknown', 40),
    clean(input.timezone, 'Unknown', 80),
    clean(input.screenSize, 'Unknown', 40),
    clean(input.path, '/', 300),
    clean(input.referrer, 'Direct', 500),
  )
  return result.changes > 0
}

function rows(query, ...params) {
  return getDatabase().prepare(query).all(...params)
}

function scalar(query, ...params) {
  return Number(getDatabase().prepare(query).get(...params)?.value || 0)
}

export function getAnalyticsDashboard() {
  const totalVisits = scalar('SELECT COUNT(*) AS value FROM visits')
  const uniqueVisitors = scalar('SELECT COUNT(DISTINCT visitor_id) AS value FROM visits')
  const todayVisitors = scalar("SELECT COUNT(*) AS value FROM visits WHERE date(created_at) = date('now')")
  const onlineNow = scalar("SELECT COUNT(*) AS value FROM visits WHERE created_at >= strftime('%Y-%m-%dT%H:%M:%fZ', 'now', '-5 minutes')")
  const previousDay = scalar("SELECT COUNT(*) AS value FROM visits WHERE date(created_at) = date('now', '-1 day')")
  const change = previousDay ? Math.round((todayVisitors - previousDay) / previousDay * 100) : (todayVisitors ? 100 : 0)

  const trendRows = rows(`
    WITH RECURSIVE dates(day) AS (
      SELECT date('now', '-6 days') UNION ALL SELECT date(day, '+1 day') FROM dates WHERE day < date('now')
    )
    SELECT dates.day, COUNT(visits.id) AS visits, COUNT(DISTINCT visits.visitor_id) AS unique_visitors
    FROM dates LEFT JOIN visits ON date(visits.created_at) = dates.day
    GROUP BY dates.day ORDER BY dates.day
  `)

  return {
    generatedAt: new Date().toISOString(),
    summary: { totalVisits, uniqueVisitors, todayVisitors, onlineNow, change },
    trend: trendRows.map((row) => ({ day: row.day, visits: Number(row.visits), uniqueVisitors: Number(row.unique_visitors) })),
    devices: rows('SELECT device_type AS name, COUNT(*) AS value FROM visits GROUP BY device_type ORDER BY value DESC').map((row) => ({ ...row, value: Number(row.value) })),
    browsers: rows('SELECT browser AS name, COUNT(*) AS value FROM visits GROUP BY browser ORDER BY value DESC LIMIT 6').map((row) => ({ ...row, value: Number(row.value) })),
    operatingSystems: rows('SELECT operating_system AS name, COUNT(*) AS value FROM visits GROUP BY operating_system ORDER BY value DESC LIMIT 6').map((row) => ({ ...row, value: Number(row.value) })),
    topPages: rows('SELECT path AS name, COUNT(*) AS value FROM visits GROUP BY path ORDER BY value DESC LIMIT 6').map((row) => ({ ...row, value: Number(row.value) })),
    recent: rows(`
      SELECT id, visitor_id, ip_address, browser, operating_system, device_type, device_name,
             language, timezone, screen_size, path, referrer, created_at
      FROM visits ORDER BY created_at DESC LIMIT 100
    `).map((row) => ({ ...row })),
  }
}

export function clearAnalytics() {
  getDatabase().exec('DELETE FROM visits; VACUUM;')
}

export function deleteVisitorAnalytics(visitorId) {
  const cleanVisitorId = clean(visitorId, '', 100)
  if (!cleanVisitorId) return 0
  return Number(getDatabase().prepare('DELETE FROM visits WHERE visitor_id = ?').run(cleanVisitorId).changes || 0)
}

export function analyticsHealth() {
  const result = getDatabase().prepare('PRAGMA quick_check').get()
  return { ok: Object.values(result || {})[0] === 'ok' }
}
