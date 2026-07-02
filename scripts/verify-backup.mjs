import { createHash } from 'node:crypto'
import { existsSync, readFileSync, readdirSync } from 'node:fs'
import { join, resolve } from 'node:path'
import { DatabaseSync } from 'node:sqlite'

const root=resolve(process.env.BACKUP_DIR||join(process.cwd(),'backups'))
const latest=existsSync(root)?readdirSync(root,{withFileTypes:true}).filter((entry)=>entry.isDirectory()).map((entry)=>entry.name).sort().at(-1):null
const directory=resolve(process.argv[2]||join(root,latest||'')),manifestPath=join(directory,'manifest.json')
if(!existsSync(manifestPath))throw new Error(`Backup manifest not found: ${manifestPath}`)
const manifest=JSON.parse(readFileSync(manifestPath,'utf8')),filename=join(directory,manifest.filename),bytes=readFileSync(filename)
if(createHash('sha256').update(bytes).digest('hex')!==manifest.sha256)throw new Error('Backup checksum does not match its manifest.')
const db=new DatabaseSync(filename,{readOnly:true}),integrity=Object.values(db.prepare('PRAGMA integrity_check').get()||{})[0]
db.close();if(integrity!=='ok')throw new Error(`Backup SQLite integrity check failed: ${integrity}`)
console.log(`Backup verified: ${directory} (${bytes.length} bytes)`)
