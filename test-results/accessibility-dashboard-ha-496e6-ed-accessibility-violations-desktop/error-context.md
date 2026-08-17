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
  - generic [ref=e2]:
    - link "Skip to main content" [ref=e3] [cursor=pointer]:
      - /url: "#main-content"
    - status [ref=e4]: "Current page: dashboard"
    - banner [ref=e5]:
      - button "CodePath" [ref=e6] [cursor=pointer]
      - button "S System design Switch course" [ref=e8] [cursor=pointer]:
        - generic [ref=e9]: S
        - generic [ref=e10]:
          - strong [ref=e11]: System design
          - generic [ref=e12]: Switch course
        - generic [ref=e13]: ⌄
      - navigation "Primary navigation" [ref=e14]:
        - button "Learn" [ref=e15] [cursor=pointer]:
          - generic [ref=e16]: ▤
          - generic [ref=e17]: Learn
        - button "Case studies" [ref=e18] [cursor=pointer]:
          - generic [ref=e19]: ◱
          - generic [ref=e20]: Case studies
        - button "Tools" [ref=e21] [cursor=pointer]:
          - generic [ref=e22]: ⌁
          - generic [ref=e23]: Tools
        - button "Interview" [ref=e24] [cursor=pointer]:
          - generic [ref=e25]: ◈
          - generic [ref=e26]: Interview
        - button "Cheatsheet" [ref=e27] [cursor=pointer]:
          - generic [ref=e28]: ☰
          - generic [ref=e29]: Cheatsheet
        - button "Glossary" [ref=e30] [cursor=pointer]:
          - generic [ref=e31]: 𝐀
          - generic [ref=e32]: Glossary
      - generic [ref=e33]:
        - button "Search lessons" [ref=e34] [cursor=pointer]:
          - generic [ref=e35]: ⌕
          - generic [ref=e36]: Search
          - generic [ref=e37]: ⌘K
        - button "Switch language" [ref=e38] [cursor=pointer]:
          - generic [ref=e39]: বাং
          - generic [ref=e40]: EN
        - button "Local learner profile" [ref=e41] [cursor=pointer]: LP
    - generic [ref=e43]:
      - main [ref=e44]:
        - generic [ref=e45]:
          - generic [ref=e46]:
            - generic [ref=e47]: Start your learning journey
            - heading "Think in architecture. Design with confidence." [level=1] [ref=e48]:
              - text: Think in architecture.
              - emphasis [ref=e49]: Design with confidence.
            - paragraph [ref=e50]: Make complex systems feel simple with visual explanations, interactive diagrams, and real design challenges.
            - generic [ref=e51]:
              - button "Start first lesson" [ref=e52] [cursor=pointer]:
                - text: Start first lesson
                - generic [ref=e53]: →
              - button "✦ Surprise me" [ref=e54] [cursor=pointer]
          - generic [ref=e55]:
            - generic [ref=e56]:
              - generic [ref=e57]: API
              - generic [ref=e58]: DB
            - generic [ref=e59]:
              - generic [ref=e60]: CDN
              - generic [ref=e61]: Queue
            - generic [ref=e62]:
              - strong [ref=e63]: "0"
              - generic [ref=e64]: / 46
              - generic [ref=e65]: complete
        - region "Learning statistics" [ref=e66]:
          - article [ref=e67]:
            - generic [ref=e69]: ▤
            - generic [ref=e70]:
              - strong [ref=e71]: 0/46
              - generic [ref=e72]: Topics completed
          - article [ref=e73]:
            - generic [ref=e75]: ✓
            - generic [ref=e76]:
              - strong [ref=e77]: 0%
              - generic [ref=e78]: Average exam score
          - article [ref=e79]:
            - generic [ref=e81]: ◆
            - generic [ref=e82]:
              - strong [ref=e83]: "0"
              - generic [ref=e84]: Saved lessons
          - article [ref=e85]:
            - generic [ref=e87]: ◇
            - generic [ref=e88]:
              - strong [ref=e89]: "0"
              - generic [ref=e90]: Labs explored
        - generic [ref=e91]:
          - generic [ref=e92]:
            - generic [ref=e93]:
              - generic [ref=e94]:
                - generic [ref=e95]: Your learning path
                - heading "Build knowledge layer by layer" [level=2] [ref=e96]
              - button "View all" [ref=e97] [cursor=pointer]:
                - text: View all
                - generic [ref=e98]: →
            - generic [ref=e99]:
              - button "01 Foundations Learn the language and measurements behind every reliable design. 0/6" [ref=e100] [cursor=pointer]:
                - generic [ref=e101]: "01"
                - generic [ref=e102]:
                  - strong [ref=e103]: Foundations
                  - generic [ref=e104]: Learn the language and measurements behind every reliable design.
                - generic [ref=e107]: 0/6
                - generic [ref=e108]: →
              - button "02 Networking basics The internet fundamentals every system design depends on — layers, IP, TCP/UDP, HTTP, TLS, and DNS. 0/6" [ref=e109] [cursor=pointer]:
                - generic [ref=e110]: "02"
                - generic [ref=e111]:
                  - strong [ref=e112]: Networking basics
                  - generic [ref=e113]: The internet fundamentals every system design depends on — layers, IP, TCP/UDP, HTTP, TLS, and DNS.
                - generic [ref=e116]: 0/6
                - generic [ref=e117]: →
              - button "03 Core components Understand the building blocks used to serve, store, and move data. 0/8" [ref=e118] [cursor=pointer]:
                - generic [ref=e119]: "03"
                - generic [ref=e120]:
                  - strong [ref=e121]: Core components
                  - generic [ref=e122]: Understand the building blocks used to serve, store, and move data.
                - generic [ref=e125]: 0/8
                - generic [ref=e126]: →
              - button "04 Distributed systems Reason about coordination, consistency, and failure across machines. 0/8" [ref=e127] [cursor=pointer]:
                - generic [ref=e128]: "04"
                - generic [ref=e129]:
                  - strong [ref=e130]: Distributed systems
                  - generic [ref=e131]: Reason about coordination, consistency, and failure across machines.
                - generic [ref=e134]: 0/8
                - generic [ref=e135]: →
              - button "05 Production architecture Make systems observable, secure, and resilient in the real world. 0/4" [ref=e136] [cursor=pointer]:
                - generic [ref=e137]: "05"
                - generic [ref=e138]:
                  - strong [ref=e139]: Production architecture
                  - generic [ref=e140]: Make systems observable, secure, and resilient in the real world.
                - generic [ref=e143]: 0/4
                - generic [ref=e144]: →
              - button "06 Practical systems Combine the pieces in interview-ready architecture case studies. 0/4" [ref=e145] [cursor=pointer]:
                - generic [ref=e146]: "06"
                - generic [ref=e147]:
                  - strong [ref=e148]: Practical systems
                  - generic [ref=e149]: Combine the pieces in interview-ready architecture case studies.
                - generic [ref=e152]: 0/4
                - generic [ref=e153]: →
              - button "07 Architecture mastery Master specialized patterns and high-stakes production case studies. 0/10" [ref=e154] [cursor=pointer]:
                - generic [ref=e155]: "07"
                - generic [ref=e156]:
                  - strong [ref=e157]: Architecture mastery
                  - generic [ref=e158]: Master specialized patterns and high-stakes production case studies.
                - generic [ref=e161]: 0/10
                - generic [ref=e162]: →
          - complementary [ref=e163]:
            - generic [ref=e164]: Quick practice
            - heading "Learn by doing" [level=2] [ref=e165]
            - button "⌁ Architecture simulator Test load and failures" [ref=e166] [cursor=pointer]:
              - generic [ref=e167]: ⌁
              - generic [ref=e168]:
                - strong [ref=e169]: Architecture simulator
                - generic [ref=e170]: Test load and failures
              - generic [ref=e171]: →
            - button "◇ Guided design labs Decide, compare, improve" [ref=e172] [cursor=pointer]:
              - generic [ref=e173]: ◇
              - generic [ref=e174]:
                - strong [ref=e175]: Guided design labs
                - generic [ref=e176]: Decide, compare, improve
              - generic [ref=e177]: →
            - link "▤ Published lesson library Explore newly authored lessons" [ref=e178] [cursor=pointer]:
              - /url: /library
              - generic [ref=e179]: ▤
              - generic [ref=e180]:
                - strong [ref=e181]: Published lesson library
                - generic [ref=e182]: Explore newly authored lessons
              - generic [ref=e183]: →
            - generic [ref=e184]:
              - strong [ref=e185]: Recently viewed
              - paragraph [ref=e186]: Open a lesson and it will appear here.
      - contentinfo [ref=e187]:
        - generic [ref=e188]:
          - generic [ref=e189]:
            - generic [ref=e191]: J
            - generic [ref=e192]:
              - strong [ref=e193]: Jahid
              - generic [ref=e194]: Creator & Educator
              - paragraph [ref=e195]: Building free, bilingual, visual courses that make computer science click.
              - generic [ref=e196]:
                - link "GitHub" [ref=e197] [cursor=pointer]:
                  - /url: https://github.com/your-username
                  - img [ref=e198]
                - link "LinkedIn" [ref=e200] [cursor=pointer]:
                  - /url: https://www.linkedin.com/in/your-username
                  - img [ref=e201]
                - link "Facebook" [ref=e203] [cursor=pointer]:
                  - /url: https://www.facebook.com/your-username
                  - img [ref=e204]
                - link "WhatsApp" [ref=e206] [cursor=pointer]:
                  - /url: https://wa.me/8801XXXXXXXXX
                  - img [ref=e207]
                - link "Email" [ref=e209] [cursor=pointer]:
                  - /url: mailto:4khoop@gmail.com
                  - img [ref=e210]
          - navigation "Footer navigation" [ref=e212]:
            - link "All courses" [ref=e213] [cursor=pointer]:
              - /url: /courses
            - link "Learn" [ref=e214] [cursor=pointer]:
              - /url: /learn
            - link "Privacy" [ref=e215] [cursor=pointer]:
              - /url: /privacy
        - generic [ref=e216]:
          - generic [ref=e217]:
            - strong [ref=e218]: CodePath
            - text: — Bilingual visual courses
          - generic [ref=e219]: © 2026 Jahid. Built with care.
    - complementary [ref=e220]:
      - button "Focus timer" [ref=e221] [cursor=pointer]: ◷
  - alert [ref=e222]
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