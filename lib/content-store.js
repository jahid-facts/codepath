import 'server-only'

import { mkdirSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { DatabaseSync } from 'node:sqlite'
import { parseQuiz, validateManagedLesson } from './content-validation.js'

let database
const clean = (value, max) => typeof value === 'string' ? value.trim().slice(0, max) : ''

function ensureColumn(databaseHandle, name, definition) {
  const columns = databaseHandle.prepare('PRAGMA table_info(managed_lessons)').all().map((column) => column.name)
  if (!columns.includes(name)) databaseHandle.exec(`ALTER TABLE managed_lessons ADD COLUMN ${name} ${definition}`)
}

function db() {
  if (database) return database
  const filename = process.env.ANALYTICS_DB_PATH || join(process.cwd(), 'data', 'analytics.sqlite')
  mkdirSync(dirname(filename), { recursive: true })
  database = new DatabaseSync(filename)
  database.exec(`PRAGMA journal_mode=WAL; PRAGMA busy_timeout=5000;
    CREATE TABLE IF NOT EXISTS managed_lessons (
      slug TEXT PRIMARY KEY, module_id TEXT NOT NULL, title_en TEXT NOT NULL, title_bn TEXT NOT NULL,
      summary_en TEXT NOT NULL, summary_bn TEXT NOT NULL, body_en TEXT NOT NULL, body_bn TEXT NOT NULL,
      status TEXT NOT NULL CHECK(status IN ('draft','published')),
      created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ','now')),
      updated_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ','now')));
    CREATE TABLE IF NOT EXISTS managed_lesson_versions (
      id INTEGER PRIMARY KEY AUTOINCREMENT, slug TEXT NOT NULL, version INTEGER NOT NULL,
      action TEXT NOT NULL, snapshot_json TEXT NOT NULL,
      created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ','now')),
      UNIQUE(slug,version));
    CREATE INDEX IF NOT EXISTS lesson_versions_slug_idx ON managed_lesson_versions(slug,version DESC);
    CREATE TABLE IF NOT EXISTS content_audit_logs (
      id INTEGER PRIMARY KEY AUTOINCREMENT, slug TEXT NOT NULL, action TEXT NOT NULL, details TEXT NOT NULL,
      created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ','now')));
    CREATE INDEX IF NOT EXISTS content_audit_slug_idx ON content_audit_logs(slug,created_at DESC);`)
  ensureColumn(database, 'diagram_kind', "TEXT NOT NULL DEFAULT 'request'")
  ensureColumn(database, 'quiz_json', "TEXT NOT NULL DEFAULT '[]'")
  ensureColumn(database, 'bangla_reviewed', 'INTEGER NOT NULL DEFAULT 0')
  ensureColumn(database, 'technical_reviewed', 'INTEGER NOT NULL DEFAULT 0')
  ensureColumn(database, 'version', 'INTEGER NOT NULL DEFAULT 0')
  ensureColumn(database, 'published_at', 'TEXT')
  return database
}

export function listManagedLessons({ publishedOnly = false } = {}) {
  return db().prepare(`SELECT * FROM managed_lessons ${publishedOnly ? "WHERE status='published'" : ''} ORDER BY updated_at DESC`).all()
}

export function getManagedLesson(slug, { includeDraft = false } = {}) {
  return db().prepare(`SELECT * FROM managed_lessons WHERE slug=? ${includeDraft ? '' : "AND status='published'"}`).get(clean(slug,80)) || null
}

function toInput(row) {
  return { slug:row.slug,moduleId:row.module_id,titleEn:row.title_en,titleBn:row.title_bn,summaryEn:row.summary_en,summaryBn:row.summary_bn,bodyEn:row.body_en,bodyBn:row.body_bn,status:row.status,diagramKind:row.diagram_kind,quizJson:row.quiz_json,banglaReviewed:Boolean(row.bangla_reviewed),technicalReviewed:Boolean(row.technical_reviewed) }
}

export function saveManagedLesson(input, { action = 'save' } = {}) {
  const lesson = { slug:clean(input.slug,80).toLowerCase(),moduleId:clean(input.moduleId,40),titleEn:clean(input.titleEn,180),titleBn:clean(input.titleBn,180),summaryEn:clean(input.summaryEn,500),summaryBn:clean(input.summaryBn,500),bodyEn:clean(input.bodyEn,20000),bodyBn:clean(input.bodyBn,20000),status:input.status==='published'?'published':'draft',diagramKind:clean(input.diagramKind,30)||'request',quizJson:JSON.stringify(parseQuiz(input.quizJson)||[]),banglaReviewed:Boolean(input.banglaReviewed),technicalReviewed:Boolean(input.technicalReviewed) }
  const validation = validateManagedLesson(lesson)
  if (!validation.valid) { const error = new Error(validation.errors.join(' ')); error.validation = validation; throw error }
  const current = getManagedLesson(lesson.slug,{includeDraft:true})
  const version = Number(current?.version || 0) + 1
  const databaseHandle = db()
  databaseHandle.exec('BEGIN IMMEDIATE')
  try {
    databaseHandle.prepare(`INSERT INTO managed_lessons(slug,module_id,title_en,title_bn,summary_en,summary_bn,body_en,body_bn,status,diagram_kind,quiz_json,bangla_reviewed,technical_reviewed,version,published_at) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,CASE WHEN ?='published' THEN strftime('%Y-%m-%dT%H:%M:%fZ','now') ELSE NULL END)
      ON CONFLICT(slug) DO UPDATE SET module_id=excluded.module_id,title_en=excluded.title_en,title_bn=excluded.title_bn,summary_en=excluded.summary_en,summary_bn=excluded.summary_bn,body_en=excluded.body_en,body_bn=excluded.body_bn,status=excluded.status,diagram_kind=excluded.diagram_kind,quiz_json=excluded.quiz_json,bangla_reviewed=excluded.bangla_reviewed,technical_reviewed=excluded.technical_reviewed,version=excluded.version,published_at=CASE WHEN excluded.status='published' THEN COALESCE(managed_lessons.published_at,strftime('%Y-%m-%dT%H:%M:%fZ','now')) ELSE NULL END,updated_at=strftime('%Y-%m-%dT%H:%M:%fZ','now')`).run(lesson.slug,lesson.moduleId,lesson.titleEn,lesson.titleBn,lesson.summaryEn,lesson.summaryBn,lesson.bodyEn,lesson.bodyBn,lesson.status,lesson.diagramKind,lesson.quizJson,Number(lesson.banglaReviewed),Number(lesson.technicalReviewed),version,lesson.status)
    const saved = getManagedLesson(lesson.slug,{includeDraft:true})
    databaseHandle.prepare('INSERT INTO managed_lesson_versions(slug,version,action,snapshot_json) VALUES(?,?,?,?)').run(lesson.slug,version,action,JSON.stringify(saved))
    databaseHandle.prepare('INSERT INTO content_audit_logs(slug,action,details) VALUES(?,?,?)').run(lesson.slug,action,JSON.stringify({version,status:lesson.status,previousVersion:current?.version||null}))
    databaseHandle.exec('COMMIT')
    return { lesson:saved, validation }
  } catch (error) { databaseHandle.exec('ROLLBACK'); throw error }
}

export function listLessonVersions(slug) {
  return db().prepare('SELECT id,slug,version,action,created_at FROM managed_lesson_versions WHERE slug=? ORDER BY version DESC').all(clean(slug,80))
}

export function getContentAudit(slug, limit = 30) {
  return db().prepare('SELECT id,slug,action,details,created_at FROM content_audit_logs WHERE slug=? ORDER BY id DESC LIMIT ?').all(clean(slug,80),Math.min(100,Math.max(1,Number(limit)||30)))
}

export function rollbackManagedLesson(slug, version) {
  const row = db().prepare('SELECT snapshot_json FROM managed_lesson_versions WHERE slug=? AND version=?').get(clean(slug,80),Number(version))
  if (!row) throw new Error('Content version not found.')
  return saveManagedLesson(toInput(JSON.parse(row.snapshot_json)),{action:`rollback:${version}`})
}

export function deleteManagedLesson(slug) {
  const safeSlug=clean(slug,80),databaseHandle=db(),current=getManagedLesson(safeSlug,{includeDraft:true})
  if (!current) return 0
  databaseHandle.prepare('INSERT INTO content_audit_logs(slug,action,details) VALUES(?,?,?)').run(safeSlug,'delete',JSON.stringify({version:current.version,status:current.status}))
  return Number(databaseHandle.prepare('DELETE FROM managed_lessons WHERE slug=?').run(safeSlug).changes||0)
}

export function contentStoreHealth() {
  const result=db().prepare('PRAGMA quick_check').get()
  return {ok:Object.values(result||{})[0]==='ok',managedLessons:Number(db().prepare('SELECT COUNT(*) AS count FROM managed_lessons').get()?.count||0)}
}
