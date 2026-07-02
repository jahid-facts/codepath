import { createHash } from 'node:crypto'
import { existsSync, mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from 'node:fs'
import { join, resolve } from 'node:path'
import { DatabaseSync } from 'node:sqlite'

const source=resolve(process.env.ANALYTICS_DB_PATH||join(process.cwd(),'data','analytics.sqlite'))
if(!existsSync(source)){console.error(`Database not found: ${source}`);process.exit(1)}
const stamp=new Date().toISOString().replace(/[:.]/g,'-'),root=resolve(process.env.BACKUP_DIR||join(process.cwd(),'backups'))
const destinationDir=join(root,stamp),destination=join(destinationDir,'systempath.sqlite')
mkdirSync(destinationDir,{recursive:true})
const db=new DatabaseSync(source),integrity=Object.values(db.prepare('PRAGMA quick_check').get()||{})[0]
if(integrity!=='ok'){db.close();throw new Error(`Source database integrity check failed: ${integrity}`)}
db.exec('PRAGMA wal_checkpoint(FULL)');db.exec(`VACUUM INTO '${destination.replaceAll("'","''")}'`);db.close()
const bytes=readFileSync(destination),sha256=createHash('sha256').update(bytes).digest('hex')
writeFileSync(join(destinationDir,'manifest.json'),JSON.stringify({createdAt:new Date().toISOString(),source,filename:'systempath.sqlite',bytes:bytes.length,sha256,node:process.version},null,2))
const retention=Math.max(1,Number(process.env.BACKUP_RETENTION_COUNT)||14)
const directories=readdirSync(root,{withFileTypes:true}).filter((entry)=>entry.isDirectory()).map((entry)=>entry.name).sort().reverse()
for(const stale of directories.slice(retention))rmSync(join(root,stale),{recursive:true,force:true})
console.log(`Backup created: ${destinationDir}`)
