import 'server-only'

import { mkdirSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { DatabaseSync } from 'node:sqlite'

let database
const clean=(value,max=500)=>typeof value==='string'?value.trim().slice(0,max):''
function db(){if(database)return database;const filename=process.env.ANALYTICS_DB_PATH||join(process.cwd(),'data','analytics.sqlite');mkdirSync(dirname(filename),{recursive:true});database=new DatabaseSync(filename);database.exec(`PRAGMA journal_mode=WAL;PRAGMA busy_timeout=5000;CREATE TABLE IF NOT EXISTS app_events(id INTEGER PRIMARY KEY AUTOINCREMENT,kind TEXT NOT NULL,name TEXT NOT NULL,value REAL,rating TEXT NOT NULL,path TEXT NOT NULL,message TEXT NOT NULL,stack TEXT NOT NULL,user_agent TEXT NOT NULL,ip_address TEXT NOT NULL,created_at TEXT NOT NULL DEFAULT(strftime('%Y-%m-%dT%H:%M:%fZ','now')));CREATE INDEX IF NOT EXISTS app_events_created_idx ON app_events(created_at DESC);`);return database}
export function recordAppEvent(input){const retention=Math.min(365,Math.max(1,Number(process.env.MONITORING_RETENTION_DAYS)||30)),databaseHandle=db();databaseHandle.prepare("DELETE FROM app_events WHERE created_at<datetime('now',?)").run(`-${retention} days`);databaseHandle.prepare('INSERT INTO app_events(kind,name,value,rating,path,message,stack,user_agent,ip_address) VALUES(?,?,?,?,?,?,?,?,?)').run(clean(input.kind,30)||'error',clean(input.name,100)||'unknown',Number.isFinite(Number(input.value))?Number(input.value):null,clean(input.rating,30),clean(input.path,300)||'/',clean(input.message,800),clean(input.stack,3000),clean(input.userAgent,700),clean(input.ipAddress,100));return true}
export function monitoringHealth(){const result=db().prepare('PRAGMA quick_check').get(),recentErrors=Number(db().prepare("SELECT COUNT(*) AS count FROM app_events WHERE kind='error' AND created_at>=datetime('now','-1 hour')").get()?.count||0);return{ok:Object.values(result||{})[0]==='ok',recentErrors}}
