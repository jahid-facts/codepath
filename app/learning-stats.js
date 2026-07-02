import { calculateStreak } from './logic.js'

export function learningStats(progress) {
  const attempts = Object.values(progress.attempts || {}).flat()
  const answeredLabSteps = Object.values(progress.labProgress || {}).reduce((sum, answers) => sum + Object.keys(answers || {}).length, 0)
  const passed = attempts.filter((attempt) => attempt.score / attempt.total >= 0.6).length
  const xp = progress.completed.length * 50 + attempts.length * 20 + answeredLabSteps * 10 + progress.bookmarks.length * 5
  return { attempts, answeredLabSteps, passed, xp, level: Math.floor(xp / 300) + 1, streak: calculateStreak(progress.activityDates) }
}
