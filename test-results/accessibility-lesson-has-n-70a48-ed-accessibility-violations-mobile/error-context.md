# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: accessibility.spec.js >> lesson has no serious automated accessibility violations
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
    - status [ref=e5]: "Current page: lesson"
    - banner [ref=e7]:
      - button "Open menu" [ref=e8] [cursor=pointer]
      - button "CodePath" [ref=e13] [cursor=pointer]
      - generic [ref=e14]:
        - button "Search lessons" [ref=e15] [cursor=pointer]:
          - generic [ref=e16]: ⌕
        - button "Switch language" [ref=e17] [cursor=pointer]:
          - generic [ref=e18]: বাং
          - generic [ref=e19]: EN
        - button "Local learner profile" [ref=e20] [cursor=pointer]: LP
    - generic [ref=e22]:
      - main [ref=e23]:
        - article [ref=e24]:
          - button "Back to learning path" [ref=e25] [cursor=pointer]:
            - generic [ref=e26]: ←
            - text: Back to learning path
          - generic [ref=e27]:
            - generic [ref=e28]:
              - generic [ref=e29]: 01 · Foundations
              - heading "What is system design?" [level=1] [ref=e30]
              - paragraph [ref=e31]: System design turns product goals and constraints into components, data flows, and explicit trade-offs.
              - generic [ref=e32]:
                - generic [ref=e33]: ◷ 12 min
                - generic [ref=e34]: Beginner
                - generic [ref=e35]: Lesson 1/46
            - generic [ref=e36]:
              - button "Save" [ref=e37] [cursor=pointer]: ◆ Save
              - button "Mark complete" [ref=e38] [cursor=pointer]: ✓ Mark complete
          - generic [ref=e40]:
            - generic [ref=e41]:
              - generic [ref=e42]:
                - generic [ref=e43]: "01"
                - heading "Learning objectives" [level=2] [ref=e44]
              - list [ref=e45]:
                - listitem [ref=e46]:
                  - generic [ref=e47]: ✓
                  - text: Explain What is system design? in plain language.
                - listitem [ref=e48]:
                  - generic [ref=e49]: ✓
                  - text: Recognize when this pattern is useful.
                - listitem [ref=e50]:
                  - generic [ref=e51]: ✓
                  - text: Discuss its most important trade-off.
            - generic [ref=e52]:
              - generic [ref=e53]:
                - generic [ref=e54]: "02"
                - heading "Start with an analogy" [level=2] [ref=e55]
              - generic [ref=e56]:
                - generic [ref=e57]: 💡
                - paragraph [ref=e58]: "Think of planning a city: roads, utilities, and emergency routes must work together."
            - generic [ref=e59]:
              - generic [ref=e60]:
                - generic [ref=e61]: "03"
                - heading "Core idea" [level=2] [ref=e62]
              - paragraph [ref=e63]: System design turns product goals and constraints into components, data flows, and explicit trade-offs.
              - generic [ref=e64]:
                - strong [ref=e65]: Design principle
                - paragraph [ref=e66]: Start with requirements and scale before choosing technology.
            - generic [ref=e67]:
              - generic [ref=e68]:
                - generic [ref=e69]: ◆
                - heading "In depth" [level=2] [ref=e70]
              - generic [ref=e71]:
                - generic [ref=e72]:
                  - heading "What is system design?" [level=3] [ref=e73]
                  - paragraph [ref=e74]: System design is the process of deciding how the pieces of a software system — servers, databases, caches, queues, networks — fit together to meet a set of requirements at a given scale, reliability, and cost. Writing code that works on your laptop is one skill; designing a system that stays fast and available for millions of users is a different one, and that is what system design is about.
                  - paragraph [ref=e75]: "There is rarely a single \"correct\" design. Instead there are trade-offs: make reads faster and writes may get slower; add a cache and you gain speed but risk stale data; choose strong consistency and you may lose some availability. A good design is the one whose trade-offs best fit the specific requirements in front of you."
                - generic [ref=e76]:
                  - heading "A repeatable framework" [level=3] [ref=e77]
                  - paragraph [ref=e78]: Whether in an interview or on the job, approach any system the same way. Do not jump to a database or a technology first — start with what the system must do and how much of it.
                  - list [ref=e79]:
                    - listitem [ref=e80]: Clarify requirements — what features (functional) and what scale, latency, and availability targets (non-functional).
                    - listitem [ref=e81]: Estimate the scale — rough numbers for users, requests per second, storage, and bandwidth. These numbers decide the design.
                    - listitem [ref=e82]: Draw the high-level design — client, load balancer, app servers, cache, database, and any queues or storage, and how a request flows through them.
                    - listitem [ref=e83]: Deep-dive the hard parts — the data model, the hottest read/write path, and the one or two components that will break first under load.
                    - listitem [ref=e84]: Find the bottlenecks and scale them — add caching, replication, sharding, or async processing where the numbers demand it.
                    - listitem [ref=e85]: State the trade-offs — say out loud what you optimized for and what you gave up.
                - generic [ref=e86]:
                  - heading "The building blocks you compose" [level=3] [ref=e87]
                  - paragraph [ref=e88]: Almost every large system is built from the same handful of components. Learning what each one does — and its cost — lets you assemble a design quickly.
                  - table [ref=e90]:
                    - rowgroup [ref=e91]:
                      - row "Component Its job" [ref=e92]:
                        - columnheader "Component" [ref=e93]
                        - columnheader "Its job" [ref=e94]
                    - rowgroup [ref=e95]:
                      - row "Load balancer Spreads requests across many app servers and skips unhealthy ones." [ref=e96]:
                        - cell "Load balancer" [ref=e97]
                        - cell "Spreads requests across many app servers and skips unhealthy ones." [ref=e98]
                      - row "Cache Stores hot data in memory so reads avoid the slow database." [ref=e99]:
                        - cell "Cache" [ref=e100]
                        - cell "Stores hot data in memory so reads avoid the slow database." [ref=e101]
                      - row "Database The durable source of truth — SQL for relations, NoSQL for scale/flexibility." [ref=e102]:
                        - cell "Database" [ref=e103]
                        - cell "The durable source of truth — SQL for relations, NoSQL for scale/flexibility." [ref=e104]
                      - row "Queue Decouples producers from consumers so slow work happens asynchronously." [ref=e105]:
                        - cell "Queue" [ref=e106]
                        - cell "Decouples producers from consumers so slow work happens asynchronously." [ref=e107]
                      - row "CDN Serves static content from edges near users to cut latency." [ref=e108]:
                        - cell "CDN" [ref=e109]
                        - cell "Serves static content from edges near users to cut latency." [ref=e110]
                      - row "Blob store Cheap, durable storage for large files, images, and video." [ref=e111]:
                        - cell "Blob store" [ref=e112]
                        - cell "Cheap, durable storage for large files, images, and video." [ref=e113]
                - generic [ref=e114]:
                  - heading "Non-functional requirements drive the design" [level=3] [ref=e115]
                  - paragraph [ref=e116]: Two apps with identical features can need completely different designs because of their non-functional requirements — scale, latency, availability, consistency, and cost. A note-taking app for 100 users and a chat app for 100 million users both "send messages," but almost nothing else about them is the same.
                  - paragraph [ref=e117]: "So always pin the numbers early: how many users, how many requests per second, how much data, how fast must a response be (p99), and how much downtime is acceptable. Those answers, not your favourite technology, decide the architecture."
                - generic [ref=e118]:
                  - heading "Common mistakes" [level=3] [ref=e119]
                  - list [ref=e120]:
                    - listitem [ref=e121]: Jumping to a specific database or framework before understanding the requirements and scale.
                    - listitem [ref=e122]: Over-engineering for a scale you will never reach — a single server handles far more than beginners expect.
                    - listitem [ref=e123]: Designing for the average case and ignoring peak load and failures, which are what actually break systems.
                - generic [ref=e124]:
                  - heading "Remember in one line" [level=3] [ref=e125]
                  - list [ref=e126]:
                    - listitem [ref=e127]: System design = fitting standard building blocks together to meet requirements at scale, reliably, and affordably.
                    - listitem [ref=e128]: Always go requirements → estimation → high-level design → deep dives → bottlenecks → trade-offs.
                    - listitem [ref=e129]: There is no perfect design, only trade-offs that fit the numbers in front of you.
            - generic [ref=e130]:
              - generic [ref=e131]:
                - generic [ref=e132]: "04"
                - heading "Visual request flow" [level=2] [ref=e133]
              - figure "4-step flow—the active component is highlighted." [ref=e134]:
                - generic [ref=e135]:
                  - generic [ref=e136]: Live flow
                  - button "Next step" [ref=e138] [cursor=pointer]: Next step →
                - 'group "Request flow: Client to DNS to API to Database" [ref=e139]':
                  - generic [ref=e140]:
                    - button "01 Client" [ref=e141] [cursor=pointer]:
                      - generic [ref=e142]: "01"
                      - strong [ref=e144]: Client
                    - generic [ref=e145]: ↓
                  - generic [ref=e146]:
                    - button "02 DNS" [ref=e147] [cursor=pointer]:
                      - generic [ref=e148]: "02"
                      - strong [ref=e150]: DNS
                    - generic [ref=e151]: ↓
                  - generic [ref=e152]:
                    - button "03 API" [ref=e153] [cursor=pointer]:
                      - generic [ref=e154]: "03"
                      - strong [ref=e156]: API
                    - generic [ref=e157]: ↓
                  - button "04 Database" [ref=e159] [cursor=pointer]:
                    - generic [ref=e160]: "04"
                    - strong [ref=e162]: Database
                - generic [ref=e163]: 4-step flow—the active component is highlighted.
            - generic [ref=e164]:
              - generic [ref=e165]:
                - generic [ref=e166]: "05"
                - heading "Walk through the flow" [level=2] [ref=e167]
              - list [ref=e168]:
                - listitem [ref=e169]:
                  - generic [ref=e170]: "1"
                  - generic [ref=e171]: System design turns product goals and constraints into components, data flows, and explicit trade-offs.
                - listitem [ref=e172]:
                  - generic [ref=e173]: "2"
                  - generic [ref=e174]: Start with requirements and scale before choosing technology.
                - listitem [ref=e175]:
                  - generic [ref=e176]: "3"
                  - generic [ref=e177]: The system returns a result and measures latency, errors, and capacity.
            - generic [ref=e178]:
              - generic [ref=e179]:
                - generic [ref=e180]:
                  - generic [ref=e181]: ✦ Flagship deep dive
                  - heading "Flash-sale ticket platform" [level=2] [ref=e182]
                  - paragraph [ref=e183]: Ten million users may arrive for 100,000 tickets. The design must remain responsive, prevent overselling, and degrade safely when demand exceeds supply.
                - complementary [ref=e184]:
                  - generic [ref=e185]: "✓ Peak: 50,000 requests/second"
                  - generic [ref=e186]: ✓ Inventory correctness is stronger than browsing freshness
                  - generic [ref=e187]: "✓ Target: 99.95% purchase availability"
              - tablist "Deep-dive sections" [ref=e188]:
                - tab "∑ Scale & math" [selected] [ref=e189] [cursor=pointer]:
                  - generic [ref=e190]: ∑
                  - text: Scale & math
                - 'tab "{ } API & data" [ref=e191] [cursor=pointer]':
                  - generic [ref=e192]: "{ }"
                  - text: API & data
                - tab "⚡ Failure lab" [ref=e193] [cursor=pointer]:
                  - generic [ref=e194]: ⚡
                  - text: Failure lab
                - tab "◇ Decisions" [ref=e195] [cursor=pointer]:
                  - generic [ref=e196]: ◇
                  - text: Decisions
              - tabpanel [ref=e197]:
                - generic [ref=e198]:
                  - article [ref=e199]:
                    - generic [ref=e200]:
                      - generic [ref=e201]: "01"
                      - strong [ref=e202]: Peak capacity
                    - code [ref=e203]: 50,000 RPS ÷ 500 RPS/server
                    - generic [ref=e204]: 100 servers
                    - paragraph [ref=e205]: Add at least 30% tested headroom.
                  - article [ref=e206]:
                    - generic [ref=e207]:
                      - generic [ref=e208]: "02"
                      - strong [ref=e209]: Inventory pressure
                    - code [ref=e210]: 100,000 tickets ÷ 50,000 attempts/s
                    - generic [ref=e211]: 2 seconds
                    - paragraph [ref=e212]: Admission control is mandatory; scaling checkout alone is insufficient.
                  - article [ref=e213]:
                    - generic [ref=e214]:
                      - generic [ref=e215]: "03"
                      - strong [ref=e216]: Availability budget
                    - code [ref=e217]: 30 days × 0.05%
                    - generic [ref=e218]: 21.6 minutes
                    - paragraph [ref=e219]: Every dependency must fit inside the shared downtime budget.
            - generic [ref=e220]:
              - generic [ref=e221]:
                - generic [ref=e222]:
                  - generic [ref=e223]: ✦ Flagship deep dive
                  - heading "Flash-sale ticket platform" [level=2] [ref=e224]
                  - paragraph [ref=e225]: Ten million users may arrive for 100,000 tickets. The design must remain responsive, prevent overselling, and degrade safely when demand exceeds supply.
                - complementary [ref=e226]:
                  - generic [ref=e227]: "✓ Peak: 50,000 requests/second"
                  - generic [ref=e228]: ✓ Inventory correctness is stronger than browsing freshness
                  - generic [ref=e229]: "✓ Target: 99.95% purchase availability"
              - tablist "Deep-dive sections" [ref=e230]:
                - tab "∑ Scale & math" [selected] [ref=e231] [cursor=pointer]:
                  - generic [ref=e232]: ∑
                  - text: Scale & math
                - 'tab "{ } API & data" [ref=e233] [cursor=pointer]':
                  - generic [ref=e234]: "{ }"
                  - text: API & data
                - tab "⚡ Failure lab" [ref=e235] [cursor=pointer]:
                  - generic [ref=e236]: ⚡
                  - text: Failure lab
                - tab "◇ Decisions" [ref=e237] [cursor=pointer]:
                  - generic [ref=e238]: ◇
                  - text: Decisions
              - tabpanel [ref=e239]:
                - generic [ref=e240]:
                  - article [ref=e241]:
                    - generic [ref=e242]:
                      - generic [ref=e243]: "01"
                      - strong [ref=e244]: Peak capacity
                    - code [ref=e245]: 50,000 RPS ÷ 500 RPS/server
                    - generic [ref=e246]: 100 servers
                    - paragraph [ref=e247]: Add at least 30% tested headroom.
                  - article [ref=e248]:
                    - generic [ref=e249]:
                      - generic [ref=e250]: "02"
                      - strong [ref=e251]: Inventory pressure
                    - code [ref=e252]: 100,000 tickets ÷ 50,000 attempts/s
                    - generic [ref=e253]: 2 seconds
                    - paragraph [ref=e254]: Admission control is mandatory; scaling checkout alone is insufficient.
                  - article [ref=e255]:
                    - generic [ref=e256]:
                      - generic [ref=e257]: "03"
                      - strong [ref=e258]: Availability budget
                    - code [ref=e259]: 30 days × 0.05%
                    - generic [ref=e260]: 21.6 minutes
                    - paragraph [ref=e261]: Every dependency must fit inside the shared downtime budget.
            - generic [ref=e262]:
              - generic [ref=e263]:
                - generic [ref=e264]: "06"
                - heading "Trade-offs" [level=2] [ref=e265]
              - generic [ref=e266]:
                - generic [ref=e267]:
                  - strong [ref=e268]: ＋ Why it helps
                  - paragraph [ref=e269]: It creates a clear way to reason about what is system design? and its role in a larger architecture.
                - generic [ref=e270]:
                  - strong [ref=e271]: △ The cost
                  - paragraph [ref=e272]: A design that optimizes one quality often spends cost or complexity elsewhere.
            - generic [ref=e273]:
              - generic [ref=e274]:
                - generic [ref=e275]: ⚡
                - generic [ref=e276]:
                  - text: 30-second checkpoint
                  - heading "Which design decision would you make?" [level=2] [ref=e277]
              - generic [ref=e278]:
                - button "A Jumping directly to microservices without defining the problem." [ref=e279] [cursor=pointer]:
                  - generic [ref=e280]: A
                  - text: Jumping directly to microservices without defining the problem.
                - button "B Start with requirements and scale before choosing technology." [ref=e281] [cursor=pointer]:
                  - generic [ref=e282]: B
                  - text: Start with requirements and scale before choosing technology.
              - text: "?"
            - generic [ref=e283]:
              - generic [ref=e284]:
                - generic [ref=e285]: "07"
                - heading "Mistakes & interview tips" [level=2] [ref=e286]
              - generic [ref=e287]:
                - strong [ref=e288]: Avoid this
                - paragraph [ref=e289]: Jumping directly to microservices without defining the problem.
              - generic [ref=e290]:
                - strong [ref=e291]: ✦ Interview note
                - paragraph [ref=e292]: State assumptions first, draw the simplest what is system design? flow, then explain what changes at 10× scale.
            - generic [ref=e293]:
              - generic [ref=e294]:
                - generic [ref=e295]: "08"
                - heading "Glossary & recap" [level=2] [ref=e296]
              - generic [ref=e297]:
                - generic [ref=e298]:
                  - strong [ref=e299]: Constraint
                  - paragraph [ref=e300]: A limit the design must respect.
                - generic [ref=e301]:
                  - strong [ref=e302]: Trade-off
                  - paragraph [ref=e303]: Improving one quality by accepting a cost elsewhere.
              - generic [ref=e304]:
                - generic [ref=e305]: ✓
                - generic [ref=e306]:
                  - strong [ref=e307]: Remember in one sentence
                  - paragraph [ref=e308]: System design turns product goals and constraints into components, data flows, and explicit trade-offs.
            - generic [ref=e309]:
              - generic [ref=e310]:
                - generic [ref=e311]: "09"
                - heading "Personal notes" [level=2] [ref=e312]
              - generic [ref=e313]:
                - generic [ref=e314]:
                  - generic [ref=e315]: ✎
                  - generic [ref=e316]:
                    - strong [ref=e317]: What do you want to remember?
                    - generic [ref=e318]: Saved automatically in this browser as you type.
                  - generic [ref=e319]: 0/2000
                - textbox "Write the concept, a question, or an interview answer in your own words…" [ref=e320]
            - generic [ref=e321]:
              - generic [ref=e322]:
                - generic [ref=e323]: Knowledge check
                - heading "Ready for the 15-question exam?" [level=2] [ref=e324]
                - paragraph [ref=e325]: Submit all answers, then review an explanation for each one.
              - button "Start exam" [ref=e326] [cursor=pointer]:
                - text: Start exam
                - generic [ref=e327]: →
          - generic [ref=e328]:
            - button "Previous lesson —" [disabled] [ref=e329]:
              - generic [ref=e330]: ←
              - generic [ref=e331]:
                - generic [ref=e332]: Previous lesson
                - text: —
            - button "Next lesson Client-server & request lifecycle" [ref=e333] [cursor=pointer]:
              - generic [ref=e334]:
                - generic [ref=e335]: Next lesson
                - text: Client-server & request lifecycle
              - generic [ref=e336]: →
      - contentinfo [ref=e337]:
        - generic [ref=e338]:
          - generic [ref=e339]:
            - generic [ref=e341]: J
            - generic [ref=e342]:
              - strong [ref=e343]: Jahid
              - generic [ref=e344]: Creator & Educator
              - paragraph [ref=e345]: Building free, bilingual, visual courses that make computer science click.
              - generic [ref=e346]:
                - link "GitHub" [ref=e347] [cursor=pointer]:
                  - /url: https://github.com/your-username
                  - img [ref=e348]
                - link "LinkedIn" [ref=e350] [cursor=pointer]:
                  - /url: https://www.linkedin.com/in/your-username
                  - img [ref=e351]
                - link "Facebook" [ref=e353] [cursor=pointer]:
                  - /url: https://www.facebook.com/your-username
                  - img [ref=e354]
                - link "WhatsApp" [ref=e356] [cursor=pointer]:
                  - /url: https://wa.me/8801XXXXXXXXX
                  - img [ref=e357]
                - link "Email" [ref=e359] [cursor=pointer]:
                  - /url: mailto:4khoop@gmail.com
                  - img [ref=e360]
          - navigation "Footer navigation" [ref=e362]:
            - link "All courses" [ref=e363] [cursor=pointer]:
              - /url: /courses
            - link "Learn" [ref=e364] [cursor=pointer]:
              - /url: /learn
            - link "Privacy" [ref=e365] [cursor=pointer]:
              - /url: /privacy
        - generic [ref=e366]:
          - generic [ref=e367]:
            - strong [ref=e368]: CodePath
            - text: — Bilingual visual courses
          - generic [ref=e369]: © 2026 Jahid. Built with care.
    - navigation "Mobile navigation" [ref=e370]:
      - button "Home" [ref=e371] [cursor=pointer]:
        - generic [ref=e372]: ⌂
        - generic [ref=e373]: Home
      - button "Learn" [ref=e374] [cursor=pointer]:
        - generic [ref=e375]: ▤
        - generic [ref=e376]: Learn
      - button "Cases" [ref=e377] [cursor=pointer]:
        - generic [ref=e378]: ◱
        - generic [ref=e379]: Cases
      - button "Tools" [ref=e380] [cursor=pointer]:
        - generic [ref=e381]: ⌁
        - generic [ref=e382]: Tools
      - button "Interview" [ref=e383] [cursor=pointer]:
        - generic [ref=e384]: ◈
        - generic [ref=e385]: Interview
    - complementary [ref=e386]:
      - button "Focus timer" [ref=e387] [cursor=pointer]: ◷
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