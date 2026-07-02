const url=process.env.HEALTHCHECK_URL||process.argv[2]
if(!url)throw new Error('Set HEALTHCHECK_URL or pass the /api/health URL.')
const started=Date.now(),response=await fetch(url,{headers:{Accept:'application/json'},signal:AbortSignal.timeout(10000)}),body=await response.json().catch(()=>({}))
if(!response.ok||body.status!=='ok')throw new Error(`Health check failed: HTTP ${response.status} ${JSON.stringify(body)}`)
console.log(`Healthy: ${url} (${Date.now()-started}ms)`)
