# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: accessibility.spec.js >> simulator has no serious automated accessibility violations
- Location: e2e/accessibility.spec.js:12:3

# Error details

```
Error: expect(received).toEqual(expected) // deep equality

- Expected  -  1
+ Received  + 10

- Array []
+ Array [
+   Object {
+     "id": "color-contrast",
+     "impact": "serious",
+     "targets": Array [
+       ".site-footer-base > span:nth-child(1)",
+       ".site-footer-base > span:nth-child(2)",
+     ],
+   },
+ ]
```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - alert [ref=e2]
  - generic [ref=e3]:
    - link "Skip to main content" [ref=e4] [cursor=pointer]:
      - /url: "#main-content"
    - status [ref=e5]: "Current page: simulator"
    - banner [ref=e6]:
      - button "Open menu" [ref=e7] [cursor=pointer]
      - button "CodePath" [ref=e12] [cursor=pointer]
      - generic [ref=e13]:
        - button "Search lessons" [ref=e14] [cursor=pointer]:
          - generic [ref=e15]: ⌕
        - button "Switch language" [ref=e16] [cursor=pointer]:
          - generic [ref=e17]: বাং
          - generic [ref=e18]: EN
        - button "Local learner profile" [ref=e19] [cursor=pointer]: LP
    - generic [ref=e21]:
      - main [ref=e22]:
        - generic [ref=e23]:
          - generic [ref=e24]:
            - generic [ref=e25]: Build intuition with numbers
            - heading "Architecture simulator" [level=1] [ref=e26]
            - paragraph [ref=e27]: Change traffic, caching, and replicas to see where bottlenecks emerge.
          - generic [ref=e28]: Educational estimate
        - generic [ref=e29]:
          - generic [ref=e30]:
            - heading "Workload controls" [level=2] [ref=e31]
            - generic [ref=e32]:
              - generic [ref=e33]:
                - strong [ref=e34]: Requests / second
                - generic [ref=e35]: 1,200 RPS
              - slider "Requests / second 1,200 RPS" [ref=e36]: "1200"
            - generic [ref=e37]:
              - generic [ref=e38]:
                - strong [ref=e39]: Read traffic
                - generic [ref=e40]: 85%
              - slider "Read traffic 85%" [ref=e41]: "85"
            - generic [ref=e42]:
              - generic [ref=e43]:
                - strong [ref=e44]: Payload size
                - generic [ref=e45]: 12 KB
              - slider "Payload size 12 KB" [ref=e46]: "12"
            - generic [ref=e47]:
              - generic [ref=e48]:
                - strong [ref=e49]: Cache hit rate
                - generic [ref=e50]: 70%
              - slider "Cache hit rate 70%" [ref=e51]: "70"
            - generic [ref=e52]:
              - generic [ref=e53]:
                - generic [ref=e54]: App replicas
                - generic [ref=e55]:
                  - button "−" [ref=e56] [cursor=pointer]
                  - strong [ref=e57]: "4"
                  - button "＋" [ref=e58] [cursor=pointer]
              - generic [ref=e59]:
                - generic [ref=e60]: DB replicas
                - generic [ref=e61]:
                  - button "−" [ref=e62] [cursor=pointer]
                  - strong [ref=e63]: "2"
                  - button "＋" [ref=e64] [cursor=pointer]
            - generic [ref=e65]:
              - generic [ref=e66]:
                - strong [ref=e67]: Capacity per DB
                - generic [ref=e68]: 500 ops/s
              - slider "Capacity per DB 500 ops/s" [ref=e69]: "500"
            - generic [ref=e70]:
              - generic [ref=e71]:
                - strong [ref=e72]: Fail one app server
                - generic [ref=e73]: See the failover impact
              - checkbox "Fail one app server See the failover impact" [ref=e74]
          - generic [ref=e76]:
            - generic [ref=e77]:
              - generic [ref=e78]: ✓
              - generic [ref=e79]:
                - strong [ref=e80]: System looks healthy
                - paragraph [ref=e81]: There is useful headroom under these educational limits.
            - figure "4-step flow—the active component is highlighted." [ref=e82]:
              - generic [ref=e83]:
                - generic [ref=e84]: Live flow
                - button "Next step" [ref=e86] [cursor=pointer]: Next step →
              - 'group "Request flow: App to Cache to Database to Result" [ref=e87]':
                - generic [ref=e88]:
                  - button "01 App" [ref=e89] [cursor=pointer]:
                    - generic [ref=e90]: "01"
                    - strong [ref=e92]: App
                  - generic [ref=e93]: ↓
                - generic [ref=e94]:
                  - button "02 Cache" [ref=e95] [cursor=pointer]:
                    - generic [ref=e96]: "02"
                    - strong [ref=e98]: Cache
                  - generic [ref=e99]: ↓
                - generic [ref=e100]:
                  - button "03 Database" [ref=e101] [cursor=pointer]:
                    - generic [ref=e102]: "03"
                    - strong [ref=e104]: Database
                  - generic [ref=e105]: ↓
                - button "04 Result" [ref=e107] [cursor=pointer]:
                  - generic [ref=e108]: "04"
                  - strong [ref=e110]: Result
              - generic [ref=e111]: 4-step flow—the active component is highlighted.
            - generic [ref=e112]:
              - generic [ref=e113]:
                - generic [ref=e114]: Load / app
                - strong [ref=e115]: "300"
                - text: RPS
              - generic [ref=e116]:
                - generic [ref=e117]: Database load
                - strong [ref=e118]: "486"
                - text: ops/s
              - generic [ref=e119]:
                - generic [ref=e120]: Est. latency
                - strong [ref=e121]: "18"
                - text: ms
              - generic [ref=e122]:
                - generic [ref=e123]: Bandwidth
                - strong [ref=e124]: "14.1"
                - text: MB/s
            - generic [ref=e125]:
              - generic [ref=e126]: ✦
              - generic [ref=e127]:
                - strong [ref=e128]: Recommended next decision
                - paragraph [ref=e129]: Now enable a failure and test the resilience margin.
        - paragraph [ref=e130]: These results are simplified learning estimates, not a substitute for production capacity planning.
      - contentinfo [ref=e131]:
        - generic [ref=e132]:
          - generic [ref=e133]:
            - generic [ref=e135]: J
            - generic [ref=e136]:
              - strong [ref=e137]: Jahid
              - generic [ref=e138]: Creator & Educator
              - paragraph [ref=e139]: Building free, bilingual, visual courses that make computer science click.
              - generic [ref=e140]:
                - link "GitHub" [ref=e141] [cursor=pointer]:
                  - /url: https://github.com/your-username
                  - img [ref=e142]
                - link "LinkedIn" [ref=e144] [cursor=pointer]:
                  - /url: https://www.linkedin.com/in/your-username
                  - img [ref=e145]
                - link "Facebook" [ref=e147] [cursor=pointer]:
                  - /url: https://www.facebook.com/your-username
                  - img [ref=e148]
                - link "WhatsApp" [ref=e150] [cursor=pointer]:
                  - /url: https://wa.me/8801XXXXXXXXX
                  - img [ref=e151]
                - link "Email" [ref=e153] [cursor=pointer]:
                  - /url: mailto:4khoop@gmail.com
                  - img [ref=e154]
          - navigation "Footer navigation" [ref=e156]:
            - link "All courses" [ref=e157] [cursor=pointer]:
              - /url: /courses
            - link "Learn" [ref=e158] [cursor=pointer]:
              - /url: /learn
            - link "Privacy" [ref=e159] [cursor=pointer]:
              - /url: /privacy
        - generic [ref=e160]:
          - generic [ref=e161]:
            - strong [ref=e162]: CodePath
            - text: — Bilingual visual courses
          - generic [ref=e163]: © 2026 Jahid. Built with care.
    - navigation "Mobile navigation" [ref=e164]:
      - button "Home" [ref=e165] [cursor=pointer]:
        - generic [ref=e166]: ⌂
        - generic [ref=e167]: Home
      - button "Learn" [ref=e168] [cursor=pointer]:
        - generic [ref=e169]: ▤
        - generic [ref=e170]: Learn
      - button "Cases" [ref=e171] [cursor=pointer]:
        - generic [ref=e172]: ◱
        - generic [ref=e173]: Cases
      - button "Tools" [ref=e174] [cursor=pointer]:
        - generic [ref=e175]: ⌁
        - generic [ref=e176]: Tools
      - button "Interview" [ref=e177] [cursor=pointer]:
        - generic [ref=e178]: ◈
        - generic [ref=e179]: Interview
    - complementary [ref=e180]:
      - button "Focus timer" [ref=e181] [cursor=pointer]: ◷
```

# Test source

```ts
  1  | import AxeBuilder from '@axe-core/playwright'
  2  | import { expect, test } from '@playwright/test'
  3  | 
  4  | const progress = { version:1, language:'en', completed:[], bookmarks:[], recents:[], attempts:{}, labProgress:{}, notes:{}, activityDates:[], analyticsOptOut:true, analyticsConsent:'denied', onboarding:{completed:true,retake:false,goal:'both',experience:'new',pace:'steady',diagnosticScore:0,recommendedTopic:'system-design'} }
  5  | 
  6  | async function loadLearner(page, path = '/') {
  7  |   await page.addInitScript((value) => localStorage.setItem('system-design-path-v1', JSON.stringify(value)), progress)
  8  |   await page.goto(path)
  9  | }
  10 | 
  11 | for (const [name, path] of [['dashboard','/'],['curriculum','/learn'],['lesson','/lessons/system-design'],['simulator','/simulator'],['privacy','/privacy']]) {
  12 |   test(`${name} has no serious automated accessibility violations`, async ({ page }) => {
  13 |     await loadLearner(page, path)
  14 |     const results = await new AxeBuilder({ page }).withTags(['wcag2a','wcag2aa','wcag21a','wcag21aa']).analyze()
  15 |     const failures = results.violations.filter((violation) => ['serious','critical'].includes(violation.impact)).map((violation) => ({ id: violation.id, impact: violation.impact, targets: violation.nodes.map((node) => node.target.join(' ')).slice(0, 12) }))
> 16 |     expect(failures).toEqual([])
     |                      ^ Error: expect(received).toEqual(expected) // deep equality
  17 |   })
  18 | }
  19 | 
  20 | test('keyboard users can skip navigation and remain trapped in dialogs', async ({ page }) => {
  21 |   await loadLearner(page)
  22 |   await page.keyboard.press('Tab')
  23 |   await expect(page.getByRole('link', { name: 'Skip to main content' })).toBeFocused()
  24 |   await page.keyboard.press('Enter')
  25 |   await expect(page.locator('#main-content')).toBeFocused()
  26 |   await page.getByRole('button', { name: 'Local learner profile' }).click()
  27 |   await expect(page.locator('.profile-panel')).toBeVisible()
  28 |   for (let index = 0; index < 15; index += 1) await page.keyboard.press('Tab')
  29 |   await expect(page.locator('.profile-panel').locator(':focus')).toHaveCount(1)
  30 |   await page.keyboard.press('Escape')
  31 |   await expect(page.locator('.profile-panel')).toBeHidden()
  32 | })
  33 | 
```