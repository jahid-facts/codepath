import { expect, test } from '@playwright/test'

const progress = { version:1, language:'en', completed:['system-design'], bookmarks:['caching'], recents:['system-design'], attempts:{}, labProgress:{}, notes:{}, activityDates:['2026-06-30'], analyticsOptOut:true, analyticsConsent:'denied', onboarding:{completed:true,retake:false,goal:'both',experience:'new',pace:'steady',diagnosticScore:1,recommendedTopic:'request-lifecycle'} }

test.beforeEach(async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'mobile', 'Mobile visual baseline')
  await page.addInitScript((value) => localStorage.setItem('system-design-path-v1', JSON.stringify(value)), progress)
  await page.addInitScript(() => { window.setInterval = () => 0 })
})

test('mobile dashboard visual baseline', async ({ page }) => {
  await page.goto('/')
  await expect(page).toHaveScreenshot('dashboard-mobile.png', { fullPage: true, animations: 'disabled' })
})

test('mobile flagship lesson visual baseline', async ({ page }) => {
  await page.goto('/lessons/system-design')
  await page.waitForLoadState('networkidle')
  await expect(page).toHaveScreenshot('lesson-mobile.png', { fullPage: true, animations: 'disabled' })
})

test('mobile simulator visual baseline', async ({ page }) => {
  await page.goto('/simulator')
  await expect(page).toHaveScreenshot('simulator-mobile.png', { fullPage: true, animations: 'disabled' })
})
