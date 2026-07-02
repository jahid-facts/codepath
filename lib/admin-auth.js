import 'server-only'

import { createHmac, timingSafeEqual } from 'node:crypto'

export const ADMIN_COOKIE = 'systempath_admin'
const SESSION_SECONDS = 60 * 60 * 12

function secret() {
  return process.env.ADMIN_SESSION_SECRET || process.env.ADMIN_PASSWORD || ''
}

function sign(value) {
  return createHmac('sha256', secret()).update(value).digest('hex')
}

export function adminIsConfigured() {
  return Boolean(process.env.ADMIN_PASSWORD && secret())
}

export function createAdminSession() {
  const expires = Math.floor(Date.now() / 1000) + SESSION_SECONDS
  return `${expires}.${sign(String(expires))}`
}

export function verifyAdminSession(token = '') {
  if (!adminIsConfigured()) return false
  const [expires, signature] = token.split('.')
  if (!expires || !signature || Number(expires) < Date.now() / 1000) return false
  const expected = sign(expires)
  if (signature.length !== expected.length) return false
  return timingSafeEqual(Buffer.from(signature), Buffer.from(expected))
}

export function verifyAdminPassword(value = '') {
  const expected = process.env.ADMIN_PASSWORD || ''
  if (!expected || value.length !== expected.length) return false
  return timingSafeEqual(Buffer.from(value), Buffer.from(expected))
}
