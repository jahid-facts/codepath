import { spawnSync } from 'node:child_process'
const result=spawnSync('npm',['audit','--omit=dev','--json'],{encoding:'utf8'}),report=JSON.parse(result.stdout||'{}'),counts=report.metadata?.vulnerabilities||{}
console.log(`Production dependency audit: ${counts.critical||0} critical, ${counts.high||0} high, ${counts.moderate||0} moderate, ${counts.low||0} low`)
if((counts.critical||0)+(counts.high||0)>0)process.exit(1)
if(counts.moderate)console.warn('Moderate advisories remain; review docs/PRODUCTION_OPERATIONS.md before upgrading.')
