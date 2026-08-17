# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: accessibility.spec.js >> dashboard has no serious automated accessibility violations
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
  - generic [ref=e2]:
    - link "Skip to main content" [ref=e3] [cursor=pointer]:
      - /url: "#main-content"
    - status [ref=e4]: "Current page: dashboard"
    - banner [ref=e5]:
      - button "Open menu" [ref=e6] [cursor=pointer]
      - button "CodePath" [ref=e11] [cursor=pointer]
      - generic [ref=e12]:
        - button "Search lessons" [ref=e13] [cursor=pointer]:
          - generic [ref=e14]: ⌕
        - button "Switch language" [ref=e15] [cursor=pointer]:
          - generic [ref=e16]: বাং
          - generic [ref=e17]: EN
        - button "Local learner profile" [ref=e18] [cursor=pointer]: LP
    - generic [ref=e20]:
      - main [ref=e21]:
        - generic [ref=e23]:
          - generic [ref=e24]: Start your learning journey
          - heading "Think in architecture. Design with confidence." [level=1] [ref=e25]:
            - text: Think in architecture.
            - emphasis [ref=e26]: Design with confidence.
          - paragraph [ref=e27]: Make complex systems feel simple with visual explanations, interactive diagrams, and real design challenges.
          - generic [ref=e28]:
            - button "Start first lesson" [ref=e29] [cursor=pointer]:
              - text: Start first lesson
              - generic [ref=e30]: →
            - button "✦ Surprise me" [ref=e31] [cursor=pointer]
        - region "Learning statistics" [ref=e32]:
          - article [ref=e33]:
            - generic [ref=e35]: ▤
            - generic [ref=e36]:
              - strong [ref=e37]: 0/46
              - generic [ref=e38]: Topics completed
          - article [ref=e39]:
            - generic [ref=e41]: ✓
            - generic [ref=e42]:
              - strong [ref=e43]: 0%
              - generic [ref=e44]: Average exam score
          - article [ref=e45]:
            - generic [ref=e47]: ◆
            - generic [ref=e48]:
              - strong [ref=e49]: "0"
              - generic [ref=e50]: Saved lessons
          - article [ref=e51]:
            - generic [ref=e53]: ◇
            - generic [ref=e54]:
              - strong [ref=e55]: "0"
              - generic [ref=e56]: Labs explored
        - generic [ref=e57]:
          - generic [ref=e58]:
            - generic [ref=e59]:
              - generic [ref=e60]:
                - generic [ref=e61]: Your learning path
                - heading "Build knowledge layer by layer" [level=2] [ref=e62]
              - button "View all" [ref=e63] [cursor=pointer]:
                - text: View all
                - generic [ref=e64]: →
            - generic [ref=e65]:
              - button "01 Foundations Learn the language and measurements behind every reliable design." [ref=e66] [cursor=pointer]:
                - generic [ref=e67]: "01"
                - generic [ref=e68]:
                  - strong [ref=e69]: Foundations
                  - generic [ref=e70]: Learn the language and measurements behind every reliable design.
                - generic [ref=e71]: →
              - button "02 Networking basics The internet fundamentals every system design depends on — layers, IP, TCP/UDP, HTTP, TLS, and DNS." [ref=e72] [cursor=pointer]:
                - generic [ref=e73]: "02"
                - generic [ref=e74]:
                  - strong [ref=e75]: Networking basics
                  - generic [ref=e76]: The internet fundamentals every system design depends on — layers, IP, TCP/UDP, HTTP, TLS, and DNS.
                - generic [ref=e77]: →
              - button "03 Core components Understand the building blocks used to serve, store, and move data." [ref=e78] [cursor=pointer]:
                - generic [ref=e79]: "03"
                - generic [ref=e80]:
                  - strong [ref=e81]: Core components
                  - generic [ref=e82]: Understand the building blocks used to serve, store, and move data.
                - generic [ref=e83]: →
              - button "04 Distributed systems Reason about coordination, consistency, and failure across machines." [ref=e84] [cursor=pointer]:
                - generic [ref=e85]: "04"
                - generic [ref=e86]:
                  - strong [ref=e87]: Distributed systems
                  - generic [ref=e88]: Reason about coordination, consistency, and failure across machines.
                - generic [ref=e89]: →
              - button "05 Production architecture Make systems observable, secure, and resilient in the real world." [ref=e90] [cursor=pointer]:
                - generic [ref=e91]: "05"
                - generic [ref=e92]:
                  - strong [ref=e93]: Production architecture
                  - generic [ref=e94]: Make systems observable, secure, and resilient in the real world.
                - generic [ref=e95]: →
              - button "06 Practical systems Combine the pieces in interview-ready architecture case studies." [ref=e96] [cursor=pointer]:
                - generic [ref=e97]: "06"
                - generic [ref=e98]:
                  - strong [ref=e99]: Practical systems
                  - generic [ref=e100]: Combine the pieces in interview-ready architecture case studies.
                - generic [ref=e101]: →
              - button "07 Architecture mastery Master specialized patterns and high-stakes production case studies." [ref=e102] [cursor=pointer]:
                - generic [ref=e103]: "07"
                - generic [ref=e104]:
                  - strong [ref=e105]: Architecture mastery
                  - generic [ref=e106]: Master specialized patterns and high-stakes production case studies.
                - generic [ref=e107]: →
          - complementary [ref=e108]:
            - generic [ref=e109]: Quick practice
            - heading "Learn by doing" [level=2] [ref=e110]
            - button "⌁ Architecture simulator Test load and failures" [ref=e111] [cursor=pointer]:
              - generic [ref=e112]: ⌁
              - generic [ref=e113]:
                - strong [ref=e114]: Architecture simulator
                - generic [ref=e115]: Test load and failures
              - generic [ref=e116]: →
            - button "◇ Guided design labs Decide, compare, improve" [ref=e117] [cursor=pointer]:
              - generic [ref=e118]: ◇
              - generic [ref=e119]:
                - strong [ref=e120]: Guided design labs
                - generic [ref=e121]: Decide, compare, improve
              - generic [ref=e122]: →
            - link "▤ Published lesson library Explore newly authored lessons" [ref=e123] [cursor=pointer]:
              - /url: /library
              - generic [ref=e124]: ▤
              - generic [ref=e125]:
                - strong [ref=e126]: Published lesson library
                - generic [ref=e127]: Explore newly authored lessons
              - generic [ref=e128]: →
            - generic [ref=e129]:
              - strong [ref=e130]: Recently viewed
              - paragraph [ref=e131]: Open a lesson and it will appear here.
      - contentinfo [ref=e132]:
        - generic [ref=e133]:
          - generic [ref=e134]:
            - generic [ref=e136]: J
            - generic [ref=e137]:
              - strong [ref=e138]: Jahid
              - generic [ref=e139]: Creator & Educator
              - paragraph [ref=e140]: Building free, bilingual, visual courses that make computer science click.
              - generic [ref=e141]:
                - link "GitHub" [ref=e142] [cursor=pointer]:
                  - /url: https://github.com/your-username
                  - img [ref=e143]
                - link "LinkedIn" [ref=e145] [cursor=pointer]:
                  - /url: https://www.linkedin.com/in/your-username
                  - img [ref=e146]
                - link "Facebook" [ref=e148] [cursor=pointer]:
                  - /url: https://www.facebook.com/your-username
                  - img [ref=e149]
                - link "WhatsApp" [ref=e151] [cursor=pointer]:
                  - /url: https://wa.me/8801XXXXXXXXX
                  - img [ref=e152]
                - link "Email" [ref=e154] [cursor=pointer]:
                  - /url: mailto:4khoop@gmail.com
                  - img [ref=e155]
          - navigation "Footer navigation" [ref=e157]:
            - link "All courses" [ref=e158] [cursor=pointer]:
              - /url: /courses
            - link "Learn" [ref=e159] [cursor=pointer]:
              - /url: /learn
            - link "Privacy" [ref=e160] [cursor=pointer]:
              - /url: /privacy
        - generic [ref=e161]:
          - generic [ref=e162]:
            - strong [ref=e163]: CodePath
            - text: — Bilingual visual courses
          - generic [ref=e164]: © 2026 Jahid. Built with care.
    - navigation "Mobile navigation" [ref=e165]:
      - button "Home" [ref=e166] [cursor=pointer]:
        - generic [ref=e167]: ⌂
        - generic [ref=e168]: Home
      - button "Learn" [ref=e169] [cursor=pointer]:
        - generic [ref=e170]: ▤
        - generic [ref=e171]: Learn
      - button "Cases" [ref=e172] [cursor=pointer]:
        - generic [ref=e173]: ◱
        - generic [ref=e174]: Cases
      - button "Tools" [ref=e175] [cursor=pointer]:
        - generic [ref=e176]: ⌁
        - generic [ref=e177]: Tools
      - button "Interview" [ref=e178] [cursor=pointer]:
        - generic [ref=e179]: ◈
        - generic [ref=e180]: Interview
    - complementary [ref=e181]:
      - button "Focus timer" [ref=e182] [cursor=pointer]: ◷
  - alert [ref=e183]
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