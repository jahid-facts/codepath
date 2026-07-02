export const PROGRESS_SYNC_VERSION = 1

export function createProgressEnvelope(progress, revision = 0) {
  return {
    schemaVersion: PROGRESS_SYNC_VERSION,
    revision,
    updatedAt: new Date().toISOString(),
    progress,
  }
}

export function resolveProgressConflict(localEnvelope, remoteEnvelope) {
  if (!remoteEnvelope) return localEnvelope
  if (!localEnvelope) return remoteEnvelope
  if (remoteEnvelope.revision !== localEnvelope.revision) return remoteEnvelope.revision > localEnvelope.revision ? remoteEnvelope : localEnvelope
  return new Date(remoteEnvelope.updatedAt) > new Date(localEnvelope.updatedAt) ? remoteEnvelope : localEnvelope
}

export class GuestProgressAdapter {
  async pull() { return null }
  async push(envelope) { return envelope }
}

export class HttpProgressAdapter {
  constructor(baseUrl = '/api/v1') { this.baseUrl = baseUrl }
  async pull() {
    const response = await fetch(`${this.baseUrl}/me/progress`, { credentials: 'include', cache: 'no-store' })
    if (!response.ok) throw new Error('Unable to load cloud progress')
    return response.json()
  }
  async push(envelope) {
    const response = await fetch(`${this.baseUrl}/me/progress`, { method: 'PUT', credentials: 'include', headers: { 'Content-Type': 'application/json', 'If-Match': String(envelope.revision) }, body: JSON.stringify(envelope) })
    if (!response.ok) throw new Error(response.status === 409 ? 'Progress conflict' : 'Unable to save cloud progress')
    return response.json()
  }
}
