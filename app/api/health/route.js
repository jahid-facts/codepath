import { NextResponse } from 'next/server'
import { analyticsHealth } from '../../../lib/analytics'
import { contentStoreHealth } from '../../../lib/content-store'
import { monitoringHealth } from '../../../lib/monitoring'

export const runtime='nodejs';export const dynamic='force-dynamic'
export async function GET(){const started=Date.now();try{const internal={analytics:analyticsHealth(),content:contentStoreHealth(),monitoring:monitoringHealth()},checks=Object.fromEntries(Object.entries(internal).map(([name,check])=>[name,{ok:check.ok}]));const ok=Object.values(checks).every((check)=>check.ok);return NextResponse.json({status:ok?'ok':'degraded',checks,durationMs:Date.now()-started,timestamp:new Date().toISOString()},{status:ok?200:503,headers:{'Cache-Control':'no-store'}})}catch(error){console.error(JSON.stringify({level:'error',event:'health_check_failed',message:error.message,timestamp:new Date().toISOString()}));return NextResponse.json({status:'unhealthy',durationMs:Date.now()-started,timestamp:new Date().toISOString()},{status:503,headers:{'Cache-Control':'no-store'}})}}
