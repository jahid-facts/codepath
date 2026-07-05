import { allTopics as topics, getCourse } from './course-registry.js'

export const STORAGE_KEY = 'system-design-path-v1'

export const defaults = {
  version: 1,
  language: 'en',
  activeCourse: 'system-design',
  completed: [],
  bookmarks: [],
  recents: [],
  attempts: {},
  labProgress: {},
  notes: {},
  activityDates: [],
  analyticsOptOut: false,
  analyticsConsent: 'unset',
  onboarding: { completed: false, retake: false, goal: '', experience: '', pace: '', diagnosticScore: 0, recommendedTopic: 'system-design' },
  simulator: { rps: 1200, reads: 85, payload: 12, cacheHit: 70, replicas: 4, dbCapacity: 500, replication: 2, failure: false },
}

export function normalizeProgress(value) {
  if (!value || value.version !== 1) return { ...defaults }
  const validTopic = (id) => topics.some((topic) => topic.id === id)
  const simulator = Object.fromEntries(Object.entries(defaults.simulator).map(([key, fallback]) => {
    const incoming = value.simulator?.[key]
    return [key, typeof fallback === 'boolean' ? Boolean(incoming) : (Number.isFinite(Number(incoming)) ? Number(incoming) : fallback)]
  }))
  return {
    ...defaults,
    language: value.language === 'bn' ? 'bn' : 'en',
    activeCourse: getCourse(value.activeCourse)?.available ? value.activeCourse : 'system-design',
    completed: Array.isArray(value.completed) ? [...new Set(value.completed.filter(validTopic))] : [],
    bookmarks: Array.isArray(value.bookmarks) ? [...new Set(value.bookmarks.filter(validTopic))] : [],
    recents: Array.isArray(value.recents) ? [...new Set(value.recents.filter(validTopic))].slice(0, 5) : [],
    attempts: value.attempts && typeof value.attempts === 'object' ? Object.fromEntries(Object.entries(value.attempts).filter(([id, attempts]) => validTopic(id) && Array.isArray(attempts))) : {},
    labProgress: value.labProgress && typeof value.labProgress === 'object' ? value.labProgress : {},
    notes: value.notes && typeof value.notes === 'object' ? Object.fromEntries(Object.entries(value.notes).filter(([id, note]) => validTopic(id) && typeof note === 'string').map(([id, note]) => [id, note.slice(0, 2000)])) : {},
    activityDates: Array.isArray(value.activityDates) ? value.activityDates.filter((date) => typeof date === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(date)).slice(-120) : [],
    analyticsOptOut: value.analyticsOptOut === true,
    analyticsConsent: ['granted', 'denied'].includes(value.analyticsConsent) ? value.analyticsConsent : (value.analyticsOptOut ? 'denied' : 'unset'),
    onboarding: value.onboarding && typeof value.onboarding === 'object' ? { ...defaults.onboarding, ...value.onboarding, completed: value.onboarding.completed === true } : { ...defaults.onboarding },
    simulator,
  }
}

export function loadProgress() {
  if (typeof window === 'undefined') return defaults
  try { return normalizeProgress(JSON.parse(window.localStorage.getItem(STORAGE_KEY))) } catch { return defaults }
}

export const todayKey = () => new Date().toISOString().slice(0, 10)
