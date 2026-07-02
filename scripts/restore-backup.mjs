import { createHash } from 'node:crypto'
import { copyFileSync, existsSync, readFileSync } from 'node:fs'
import { join, resolve } from 'node:path'
import { DatabaseSync } from 'node:sqlite'

const directory=process.argv[2]&&resolve(process.argv[2])
if(!directory||!process.argv.includes('--confirm'))throw new Error('Usage: npm run data:restore -- <backup-directory> --confirm')
const manifest=JSON.parse(readFileSync(join(directory,'manifest.json'),'utf8')),backup=join(directory,manifest.filename),bytes=readFileSync(backup)
if(createHash('sha256').update(bytes).digest('hex')!==manifest.sha256)throw new Error('Backup checksum mismatch; restore cancelled.')
const verification=new DatabaseSync(backup,{readOnly:true}),integrity=Object.values(verification.prepare('PRAGMA integrity_check').get()||{})[0]
verification.close();if(integrity!=='ok')throw new Error(`Backup integrity failed: ${integrity}`)
const destination=resolve(process.env.ANALYTICS_DB_PATH||join(process.cwd(),'data','analytics.sqlite'))
if(existsSync(`${destination}-wal`)||existsSync(`${destination}-shm`))throw new Error('Stop the application and remove active WAL/SHM state before restoring.')
if(existsSync(destination))copyFileSync(destination,`${destination}.pre-restore-${Date.now()}`)
copyFileSync(backup,destination)
console.log(`Database restored to ${destination}. Start the app and run a health check.`)
