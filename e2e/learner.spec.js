import { expect, test } from '@playwright/test'

const storageKey = 'system-design-path-v1'
const returningProgress = {
  version: 1,
  language: 'en',
  completed: [],
  bookmarks: [],
  recents: [],
  attempts: {},
  labProgress: {},
  notes: {},
  activityDates: [],
  analyticsOptOut: true,
  onboarding: { completed: true, retake: false, goal: 'both', experience: 'new', pace: 'steady', diagnosticScore: 0, recommendedTopic: 'system-design' },
}

async function enterAsReturningLearner(page) {
  await page.addInitScript(([key, value]) => {
    if (!localStorage.getItem(key)) localStorage.setItem(key, JSON.stringify(value))
  }, [storageKey, returningProgress])
}

test('first-time learner completes onboarding and receives a lesson recommendation', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByRole('heading', { name: 'What are you learning system design for?' })).toBeVisible()
  await page.getByRole('button', { name: /Both/ }).click()
  await page.getByRole('button', { name: /Continue/ }).click()
  await page.getByRole('button', { name: /New to backend architecture/ }).click()
  await page.getByRole('button', { name: /Continue/ }).click()
  for (const fieldset of await page.locator('.diagnostic-list fieldset').all()) await fieldset.locator('button').first().click()
  await page.getByRole('button', { name: /Continue/ }).click()
  await expect(page.getByRole('heading', { name: 'Your path is ready.' })).toBeVisible()
  await page.getByRole('button', { name: /Steady/ }).click()
  await page.getByRole('button', { name: /Start my path/ }).click()
  await expect(page).toHaveURL(/\/lessons\//)
  await expect(page.locator('.lesson-layout')).toBeVisible()
})

test('language choice updates the complete shell and survives reload', async ({ page }) => {
  await enterAsReturningLearner(page)
  await page.goto('/')
  await page.getByRole('button', { name: 'Switch language' }).click()
  await expect(page.getByRole('heading', { name: /আর্কিটেকচার ভাবুন/ })).toBeVisible()
  await page.reload()
  await expect(page.getByRole('heading', { name: /আর্কিটেকচার ভাবুন/ })).toBeVisible()
})

test('lesson exam can be completed and explained results persist', async ({ page }) => {
  await enterAsReturningLearner(page)
  await page.goto('/lessons/system-design')
  await page.getByRole('button', { name: /Start exam/ }).click()
  for (const question of await page.locator('.question-card').all()) await question.locator('.options button').first().click()
  await page.getByRole('button', { name: /Submit answers/ }).click()
  await expect(page.locator('.result-hero')).toBeVisible()
  await expect(page.locator('.explanation')).toHaveCount(5)
  const saved = await page.evaluate((key) => JSON.parse(localStorage.getItem(key)), storageKey)
  expect(saved.attempts['system-design']).toHaveLength(1)
})

test('guided lab decisions persist after reload', async ({ page }) => {
  await enterAsReturningLearner(page)
  await page.goto('/labs')
  await page.getByRole('button', { name: /URL Shortener Lab/ }).click()
  await page.locator('.lab-stage .lab-options button').first().click()
  await expect(page.locator('.lab-feedback')).toBeVisible()
  await page.reload()
  await expect(page).toHaveURL(/\/labs\/url-lab$/)
  await expect(page.locator('.lab-stage .lab-options button.selected')).toHaveCount(1)
})

test('simulator remains within a mobile viewport and reacts deterministically', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'mobile', 'Mobile layout assertion')
  await enterAsReturningLearner(page)
  await page.goto('/simulator')
  await expect(page.getByRole('heading', { name: 'Architecture simulator' })).toBeVisible()
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth)
  expect(overflow).toBeLessThanOrEqual(1)
  await page.getByText('Fail one app server').click()
  await expect(page.locator('.health-banner strong')).toBeVisible()
})

test('compact phone keeps onboarding and simulator controls usable', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'mobile', 'Compact mobile layout assertion')
  await page.setViewportSize({ width: 320, height: 568 })
  await enterAsReturningLearner(page)
  await page.goto('/simulator')
  await expect(page.getByText('Requests / second')).toBeVisible()
  expect(await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth)).toBeLessThanOrEqual(1)
})

test('learner can download a portable progress backup', async ({ page }) => {
  await enterAsReturningLearner(page)
  await page.goto('/')
  await page.getByRole('button', { name: 'Local learner profile' }).click()
  const downloadPromise = page.waitForEvent('download')
  await page.getByRole('button', { name: /Download progress/ }).click()
  const download = await downloadPromise
  expect(download.suggestedFilename()).toMatch(/^systempath-progress-\d{4}-\d{2}-\d{2}\.json$/)
})

test('admin dashboard redirects unauthenticated visitors to sign in', async ({ page }) => {
  await page.goto('/admin')
  await expect(page).toHaveURL(/\/admin\/login$/)
  await expect(page.getByRole('heading', { name: 'Admin access' })).toBeVisible()
  await expect(page.getByLabel('Admin password')).toBeVisible()
})

test('analytics requires explicit consent and remembers a decline', async ({ page }) => {
  await page.addInitScript(([key, value]) => { if (!localStorage.getItem(key)) localStorage.setItem(key, JSON.stringify({ ...value, analyticsConsent: 'unset', analyticsOptOut: false })) }, [storageKey, returningProgress])
  await page.goto('/')
  await expect(page.getByRole('region', { name: 'Analytics consent' })).toBeVisible()
  await page.getByRole('button', { name: 'Decline' }).click()
  await expect(page.getByRole('region', { name: 'Analytics consent' })).toBeHidden()
  await page.reload()
  await expect(page.getByRole('region', { name: 'Analytics consent' })).toBeHidden()
  const saved = await page.evaluate((key) => JSON.parse(localStorage.getItem(key)), storageKey)
  expect(saved.analyticsConsent).toBe('denied')
  expect(saved.analyticsOptOut).toBe(true)
})
