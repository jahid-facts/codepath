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
+ Received  + 11

- Array []
+ Array [
+   Object {
+     "id": "color-contrast",
+     "impact": "serious",
+     "targets": Array [
+       ".top-nav-link:nth-child(6) > span[aria-hidden=\"true\"]",
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
      - button "CodePath" [ref=e7] [cursor=pointer]
      - button "S System design Switch course" [ref=e9] [cursor=pointer]:
        - generic [ref=e10]: S
        - generic [ref=e11]:
          - strong [ref=e12]: System design
          - generic [ref=e13]: Switch course
        - generic [ref=e14]: ⌄
      - navigation "Primary navigation" [ref=e15]:
        - button "Learn" [ref=e16] [cursor=pointer]:
          - generic [ref=e17]: ▤
          - generic [ref=e18]: Learn
        - button "Case studies" [ref=e19] [cursor=pointer]:
          - generic [ref=e20]: ◱
          - generic [ref=e21]: Case studies
        - button "Tools" [ref=e22] [cursor=pointer]:
          - generic [ref=e23]: ⌁
          - generic [ref=e24]: Tools
        - button "Interview" [ref=e25] [cursor=pointer]:
          - generic [ref=e26]: ◈
          - generic [ref=e27]: Interview
        - button "Cheatsheet" [ref=e28] [cursor=pointer]:
          - generic [ref=e29]: ☰
          - generic [ref=e30]: Cheatsheet
        - button "Glossary" [ref=e31] [cursor=pointer]:
          - generic [ref=e32]: 𝐀
          - generic [ref=e33]: Glossary
      - generic [ref=e34]:
        - button "Search lessons" [ref=e35] [cursor=pointer]:
          - generic [ref=e36]: ⌕
          - generic [ref=e37]: Search
          - generic [ref=e38]: ⌘K
        - button "Switch language" [ref=e39] [cursor=pointer]:
          - generic [ref=e40]: বাং
          - generic [ref=e41]: EN
        - button "Local learner profile" [ref=e42] [cursor=pointer]: LP
    - generic [ref=e44]:
      - main [ref=e45]:
        - generic [ref=e46]:
          - generic [ref=e47]:
            - generic [ref=e48]: Build intuition with numbers
            - heading "Architecture simulator" [level=1] [ref=e49]
            - paragraph [ref=e50]: Change traffic, caching, and replicas to see where bottlenecks emerge.
          - generic [ref=e51]: Educational estimate
        - generic [ref=e52]:
          - generic [ref=e53]:
            - heading "Workload controls" [level=2] [ref=e54]
            - generic [ref=e55]:
              - generic [ref=e56]:
                - strong [ref=e57]: Requests / second
                - generic [ref=e58]: 1,200 RPS
              - slider "Requests / second 1,200 RPS" [ref=e59]: "1200"
            - generic [ref=e60]:
              - generic [ref=e61]:
                - strong [ref=e62]: Read traffic
                - generic [ref=e63]: 85%
              - slider "Read traffic 85%" [ref=e64]: "85"
            - generic [ref=e65]:
              - generic [ref=e66]:
                - strong [ref=e67]: Payload size
                - generic [ref=e68]: 12 KB
              - slider "Payload size 12 KB" [ref=e69]: "12"
            - generic [ref=e70]:
              - generic [ref=e71]:
                - strong [ref=e72]: Cache hit rate
                - generic [ref=e73]: 70%
              - slider "Cache hit rate 70%" [ref=e74]: "70"
            - generic [ref=e75]:
              - generic [ref=e76]:
                - generic [ref=e77]: App replicas
                - generic [ref=e78]:
                  - button "−" [ref=e79] [cursor=pointer]
                  - strong [ref=e80]: "4"
                  - button "＋" [ref=e81] [cursor=pointer]
              - generic [ref=e82]:
                - generic [ref=e83]: DB replicas
                - generic [ref=e84]:
                  - button "−" [ref=e85] [cursor=pointer]
                  - strong [ref=e86]: "2"
                  - button "＋" [ref=e87] [cursor=pointer]
            - generic [ref=e88]:
              - generic [ref=e89]:
                - strong [ref=e90]: Capacity per DB
                - generic [ref=e91]: 500 ops/s
              - slider "Capacity per DB 500 ops/s" [ref=e92]: "500"
            - generic [ref=e93]:
              - generic [ref=e94]:
                - strong [ref=e95]: Fail one app server
                - generic [ref=e96]: See the failover impact
              - checkbox "Fail one app server See the failover impact" [ref=e97]
          - generic [ref=e99]:
            - generic [ref=e100]:
              - generic [ref=e101]: ✓
              - generic [ref=e102]:
                - strong [ref=e103]: System looks healthy
                - paragraph [ref=e104]: There is useful headroom under these educational limits.
            - figure "4-step flow—the active component is highlighted." [ref=e105]:
              - generic [ref=e106]:
                - generic [ref=e107]: Live flow
                - button "Next step" [ref=e109] [cursor=pointer]: Next step →
              - group "Simulated cache-aside system architecture Request flows from App to Cache to Database to Result." [ref=e110]:
                - button "App 01" [ref=e111] [cursor=pointer]:
                  - generic [ref=e114]: App
                  - generic [ref=e115]: "01"
                - button "Cache 02" [ref=e116] [cursor=pointer]:
                  - generic [ref=e119]: Cache
                  - generic [ref=e120]: "02"
                - button "Database 03" [ref=e121] [cursor=pointer]:
                  - generic [ref=e124]: Database
                  - generic [ref=e125]: "03"
                - button "Result 04" [ref=e126] [cursor=pointer]:
                  - generic [ref=e129]: Result
                  - generic [ref=e130]: "04"
              - generic [ref=e131]: 4-step flow—the active component is highlighted.
            - generic [ref=e132]:
              - generic [ref=e133]:
                - generic [ref=e134]: Load / app
                - strong [ref=e135]: "300"
                - text: RPS
              - generic [ref=e136]:
                - generic [ref=e137]: Database load
                - strong [ref=e138]: "486"
                - text: ops/s
              - generic [ref=e139]:
                - generic [ref=e140]: Est. latency
                - strong [ref=e141]: "18"
                - text: ms
              - generic [ref=e142]:
                - generic [ref=e143]: Bandwidth
                - strong [ref=e144]: "14.1"
                - text: MB/s
            - generic [ref=e145]:
              - generic [ref=e146]: ✦
              - generic [ref=e147]:
                - strong [ref=e148]: Recommended next decision
                - paragraph [ref=e149]: Now enable a failure and test the resilience margin.
        - paragraph [ref=e150]: These results are simplified learning estimates, not a substitute for production capacity planning.
      - contentinfo [ref=e151]:
        - generic [ref=e152]:
          - generic [ref=e153]:
            - generic [ref=e155]: J
            - generic [ref=e156]:
              - strong [ref=e157]: Jahid
              - generic [ref=e158]: Creator & Educator
              - paragraph [ref=e159]: Building free, bilingual, visual courses that make computer science click.
              - generic [ref=e160]:
                - link "GitHub" [ref=e161] [cursor=pointer]:
                  - /url: https://github.com/your-username
                  - img [ref=e162]
                - link "LinkedIn" [ref=e164] [cursor=pointer]:
                  - /url: https://www.linkedin.com/in/your-username
                  - img [ref=e165]
                - link "Facebook" [ref=e167] [cursor=pointer]:
                  - /url: https://www.facebook.com/your-username
                  - img [ref=e168]
                - link "WhatsApp" [ref=e170] [cursor=pointer]:
                  - /url: https://wa.me/8801XXXXXXXXX
                  - img [ref=e171]
                - link "Email" [ref=e173] [cursor=pointer]:
                  - /url: mailto:4khoop@gmail.com
                  - img [ref=e174]
          - navigation "Footer navigation" [ref=e176]:
            - link "All courses" [ref=e177] [cursor=pointer]:
              - /url: /courses
            - link "Learn" [ref=e178] [cursor=pointer]:
              - /url: /learn
            - link "Privacy" [ref=e179] [cursor=pointer]:
              - /url: /privacy
        - generic [ref=e180]:
          - generic [ref=e181]:
            - strong [ref=e182]: CodePath
            - text: — Bilingual visual courses
          - generic [ref=e183]: © 2026 Jahid. Built with care.
    - complementary [ref=e184]:
      - button "Focus timer" [ref=e185] [cursor=pointer]: ◷
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