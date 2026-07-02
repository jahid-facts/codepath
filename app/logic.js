export function sameAnswers(a = [], b = []) {
  if (a.length !== b.length) return false
  const left = [...a].sort()
  const right = [...b].sort()
  return left.every((value, index) => value === right[index])
}

export function calculateSimulation(values) {
  const readRps = Math.round(values.rps * values.reads / 100)
  const writeRps = values.rps - readRps
  const cacheReads = Math.round(readRps * values.cacheHit / 100)
  const dbLoad = writeRps + (readRps - cacheReads)
  const activeReplicas = Math.max(values.replicas - (values.failure ? 1 : 0), 1)
  const appPerNode = Math.ceil(values.rps / activeReplicas)
  const dbTotal = values.dbCapacity * Math.max(values.replication, 1)
  const utilization = Math.round(dbLoad / dbTotal * 100)
  const bandwidth = (values.rps * values.payload / 1024).toFixed(1)
  const latency = Math.round(24 + Math.max(0, utilization - 55) * 1.4 + (values.failure ? 85 : 0) - values.cacheHit * 0.08)
  const overloaded = utilization > 80 || appPerNode > 700 || (values.failure && values.replicas < 2)
  return { readRps, writeRps, cacheReads, dbLoad, appPerNode, utilization, bandwidth, latency, overloaded }
}

export function calculateStreak(activityDates = [], now = new Date()) {
  const days = new Set(activityDates)
  const cursor = new Date(now)
  if (!days.has(cursor.toISOString().slice(0, 10))) cursor.setUTCDate(cursor.getUTCDate() - 1)
  let streak = 0
  while (days.has(cursor.toISOString().slice(0, 10))) {
    streak += 1
    cursor.setUTCDate(cursor.getUTCDate() - 1)
  }
  return streak
}
