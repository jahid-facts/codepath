import AxeBuilder from '@axe-core/playwright'
import { expect, test } from '@playwright/test'

const progress = { version:1, language:'en', completed:[], bookmarks:[], recents:[], attempts:{}, labProgress:{}, notes:{}, activityDates:[], analyticsOptOut:true, analyticsConsent:'denied', onboarding:{completed:true,retake:false,goal:'both',experience:'new',pace:'steady',diagnosticScore:0,recommendedTopic:'system-design'} }

async function loadLearner(page, path = '/') {
  await page.addInitScript((value) => localStorage.setItem('system-design-path-v1', JSON.stringify(value)), progress)
  await page.goto(path)
}

for (const [name, path] of [['dashboard','/'],['curriculum','/learn'],['lesson','/lessons/system-design'],['simulator','/simulator'],['privacy','/privacy']]) {
  test(`${name} has no serious automated accessibility violations`, async ({ page }) => {
    await loadLearner(page, path)
    const results = await new AxeBuilder({ page }).withTags(['wcag2a','wcag2aa','wcag21a','wcag21aa']).analyze()
    const failures = results.violations.filter((violation) => ['serious','critical'].includes(violation.impact)).map((violation) => ({ id: violation.id, impact: violation.impact, targets: violation.nodes.map((node) => node.target.join(' ')).slice(0, 12) }))
    expect(failures).toEqual([])
  })
}

test('keyboard users can skip navigation and remain trapped in dialogs', async ({ page }) => {
  await loadLearner(page)
  await page.keyboard.press('Tab')
  await expect(page.getByRole('link', { name: 'Skip to main content' })).toBeFocused()
  await page.keyboard.press('Enter')
  await expect(page.locator('#main-content')).toBeFocused()
  await page.getByRole('button', { name: 'Local learner profile' }).click()
  await expect(page.locator('.profile-panel')).toBeVisible()
  for (let index = 0; index < 15; index += 1) await page.keyboard.press('Tab')
  await expect(page.locator('.profile-panel').locator(':focus')).toHaveCount(1)
  await page.keyboard.press('Escape')
  await expect(page.locator('.profile-panel')).toBeHidden()
})
