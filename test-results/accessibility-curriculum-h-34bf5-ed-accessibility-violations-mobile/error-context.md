# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: accessibility.spec.js >> curriculum has no serious automated accessibility violations
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
    - status [ref=e4]: "Current page: curriculum"
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
          - generic [ref=e24]: 46 complete lessons
          - heading "System Design" [level=1] [ref=e25]
          - paragraph [ref=e26]: Design scalable, reliable architectures from first principles to interview-ready case studies.
        - generic [ref=e27]:
          - generic [ref=e28]:
            - generic [ref=e29]:
              - generic [ref=e30]: "01"
              - heading "Foundations" [level=2] [ref=e32]
              - strong [ref=e33]: 0/6
            - generic [ref=e34]:
              - button "01 What is system design? 12 min · Beginner" [ref=e35] [cursor=pointer]:
                - generic [ref=e36]: "01"
                - generic [ref=e37]:
                  - strong [ref=e38]: What is system design?
                  - generic [ref=e39]: ◷ 12 min · Beginner
                - generic [ref=e41]: →
              - button "02 Client-server & request lifecycle 15 min · Beginner" [ref=e42] [cursor=pointer]:
                - generic [ref=e43]: "02"
                - generic [ref=e44]:
                  - strong [ref=e45]: Client-server & request lifecycle
                  - generic [ref=e46]: ◷ 15 min · Beginner
                - generic [ref=e48]: →
              - button "03 Functional & non-functional requirements 14 min · Beginner" [ref=e49] [cursor=pointer]:
                - generic [ref=e50]: "03"
                - generic [ref=e51]:
                  - strong [ref=e52]: Functional & non-functional requirements
                  - generic [ref=e53]: ◷ 14 min · Beginner
                - generic [ref=e55]: →
              - button "04 Back-of-the-envelope estimation 18 min · Beginner" [ref=e56] [cursor=pointer]:
                - generic [ref=e57]: "04"
                - generic [ref=e58]:
                  - strong [ref=e59]: Back-of-the-envelope estimation
                  - generic [ref=e60]: ◷ 18 min · Beginner
                - generic [ref=e62]: →
              - button "05 Latency, throughput & concurrency 16 min · Beginner" [ref=e63] [cursor=pointer]:
                - generic [ref=e64]: "05"
                - generic [ref=e65]:
                  - strong [ref=e66]: Latency, throughput & concurrency
                  - generic [ref=e67]: ◷ 16 min · Beginner
                - generic [ref=e69]: →
              - button "06 Scale, availability & fault tolerance 18 min · Intermediate" [ref=e70] [cursor=pointer]:
                - generic [ref=e71]: "06"
                - generic [ref=e72]:
                  - strong [ref=e73]: Scale, availability & fault tolerance
                  - generic [ref=e74]: ◷ 18 min · Intermediate
                - generic [ref=e76]: →
          - generic [ref=e77]:
            - generic [ref=e78]:
              - generic [ref=e79]: "02"
              - heading "Networking basics" [level=2] [ref=e81]
              - strong [ref=e82]: 0/6
            - generic [ref=e83]:
              - button "07 Network layers (OSI & TCP/IP) 14 min · Beginner" [ref=e84] [cursor=pointer]:
                - generic [ref=e85]: "07"
                - generic [ref=e86]:
                  - strong [ref=e87]: Network layers (OSI & TCP/IP)
                  - generic [ref=e88]: ◷ 14 min · Beginner
                - generic [ref=e90]: →
              - button "08 IP addresses & subnets 15 min · Beginner" [ref=e91] [cursor=pointer]:
                - generic [ref=e92]: "08"
                - generic [ref=e93]:
                  - strong [ref=e94]: IP addresses & subnets
                  - generic [ref=e95]: ◷ 15 min · Beginner
                - generic [ref=e97]: →
              - button "09 TCP vs UDP 16 min · Beginner" [ref=e98] [cursor=pointer]:
                - generic [ref=e99]: "09"
                - generic [ref=e100]:
                  - strong [ref=e101]: TCP vs UDP
                  - generic [ref=e102]: ◷ 16 min · Beginner
                - generic [ref=e104]: →
              - button "10 HTTP & HTTPS 15 min · Beginner" [ref=e105] [cursor=pointer]:
                - generic [ref=e106]: "10"
                - generic [ref=e107]:
                  - strong [ref=e108]: HTTP & HTTPS
                  - generic [ref=e109]: ◷ 15 min · Beginner
                - generic [ref=e111]: →
              - button "11 TLS & the handshake 16 min · Intermediate" [ref=e112] [cursor=pointer]:
                - generic [ref=e113]: "11"
                - generic [ref=e114]:
                  - strong [ref=e115]: TLS & the handshake
                  - generic [ref=e116]: ◷ 16 min · Intermediate
                - generic [ref=e118]: →
              - button "12 DNS resolution 14 min · Beginner" [ref=e119] [cursor=pointer]:
                - generic [ref=e120]: "12"
                - generic [ref=e121]:
                  - strong [ref=e122]: DNS resolution
                  - generic [ref=e123]: ◷ 14 min · Beginner
                - generic [ref=e125]: →
          - generic [ref=e126]:
            - generic [ref=e127]:
              - generic [ref=e128]: "03"
              - heading "Core components" [level=2] [ref=e130]
              - strong [ref=e131]: 0/8
            - generic [ref=e132]:
              - button "13 DNS, proxies & reverse proxies 17 min · Beginner" [ref=e133] [cursor=pointer]:
                - generic [ref=e134]: "13"
                - generic [ref=e135]:
                  - strong [ref=e136]: DNS, proxies & reverse proxies
                  - generic [ref=e137]: ◷ 17 min · Beginner
                - generic [ref=e139]: →
              - button "14 Load balancing & service discovery 18 min · Intermediate" [ref=e140] [cursor=pointer]:
                - generic [ref=e141]: "14"
                - generic [ref=e142]:
                  - strong [ref=e143]: Load balancing & service discovery
                  - generic [ref=e144]: ◷ 18 min · Intermediate
                - generic [ref=e146]: →
              - button "15 CDN & edge delivery 15 min · Intermediate" [ref=e147] [cursor=pointer]:
                - generic [ref=e148]: "15"
                - generic [ref=e149]:
                  - strong [ref=e150]: CDN & edge delivery
                  - generic [ref=e151]: ◷ 15 min · Intermediate
                - generic [ref=e153]: →
              - button "16 REST, GraphQL, gRPC & WebSockets 22 min · Intermediate" [ref=e154] [cursor=pointer]:
                - generic [ref=e155]: "16"
                - generic [ref=e156]:
                  - strong [ref=e157]: REST, GraphQL, gRPC & WebSockets
                  - generic [ref=e158]: ◷ 22 min · Intermediate
                - generic [ref=e160]: →
              - button "17 Caching strategies 20 min · Intermediate" [ref=e161] [cursor=pointer]:
                - generic [ref=e162]: "17"
                - generic [ref=e163]:
                  - strong [ref=e164]: Caching strategies
                  - generic [ref=e165]: ◷ 20 min · Intermediate
                - generic [ref=e167]: →
              - button "18 SQL versus NoSQL 20 min · Intermediate" [ref=e168] [cursor=pointer]:
                - generic [ref=e169]: "18"
                - generic [ref=e170]:
                  - strong [ref=e171]: SQL versus NoSQL
                  - generic [ref=e172]: ◷ 20 min · Intermediate
                - generic [ref=e174]: →
              - button "19 Data modeling & indexing 22 min · Intermediate" [ref=e175] [cursor=pointer]:
                - generic [ref=e176]: "19"
                - generic [ref=e177]:
                  - strong [ref=e178]: Data modeling & indexing
                  - generic [ref=e179]: ◷ 22 min · Intermediate
                - generic [ref=e181]: →
              - button "20 Replication, partitioning & sharding 24 min · Advanced" [ref=e182] [cursor=pointer]:
                - generic [ref=e183]: "20"
                - generic [ref=e184]:
                  - strong [ref=e185]: Replication, partitioning & sharding
                  - generic [ref=e186]: ◷ 24 min · Advanced
                - generic [ref=e188]: →
          - generic [ref=e189]:
            - generic [ref=e190]:
              - generic [ref=e191]: "04"
              - heading "Distributed systems" [level=2] [ref=e193]
              - strong [ref=e194]: 0/8
            - generic [ref=e195]:
              - button "21 Queues, Pub/Sub & event streaming 21 min · Intermediate" [ref=e196] [cursor=pointer]:
                - generic [ref=e197]: "21"
                - generic [ref=e198]:
                  - strong [ref=e199]: Queues, Pub/Sub & event streaming
                  - generic [ref=e200]: ◷ 21 min · Intermediate
                - generic [ref=e202]: →
              - button "22 CAP theorem & consistency models 23 min · Advanced" [ref=e203] [cursor=pointer]:
                - generic [ref=e204]: "22"
                - generic [ref=e205]:
                  - strong [ref=e206]: CAP theorem & consistency models
                  - generic [ref=e207]: ◷ 23 min · Advanced
                - generic [ref=e209]: →
              - button "23 Quorums & eventual consistency 20 min · Advanced" [ref=e210] [cursor=pointer]:
                - generic [ref=e211]: "23"
                - generic [ref=e212]:
                  - strong [ref=e213]: Quorums & eventual consistency
                  - generic [ref=e214]: ◷ 20 min · Advanced
                - generic [ref=e216]: →
              - button "24 Consistent hashing 19 min · Advanced" [ref=e217] [cursor=pointer]:
                - generic [ref=e218]: "24"
                - generic [ref=e219]:
                  - strong [ref=e220]: Consistent hashing
                  - generic [ref=e221]: ◷ 19 min · Advanced
                - generic [ref=e223]: →
              - button "25 Leader election & coordination 22 min · Advanced" [ref=e224] [cursor=pointer]:
                - generic [ref=e225]: "25"
                - generic [ref=e226]:
                  - strong [ref=e227]: Leader election & coordination
                  - generic [ref=e228]: ◷ 22 min · Advanced
                - generic [ref=e230]: →
              - button "26 Rate limiting & backpressure 18 min · Intermediate" [ref=e231] [cursor=pointer]:
                - generic [ref=e232]: "26"
                - generic [ref=e233]:
                  - strong [ref=e234]: Rate limiting & backpressure
                  - generic [ref=e235]: ◷ 18 min · Intermediate
                - generic [ref=e237]: →
              - button "27 Idempotency, retries & deduplication 20 min · Advanced" [ref=e238] [cursor=pointer]:
                - generic [ref=e239]: "27"
                - generic [ref=e240]:
                  - strong [ref=e241]: Idempotency, retries & deduplication
                  - generic [ref=e242]: ◷ 20 min · Advanced
                - generic [ref=e244]: →
              - button "28 Distributed transactions & Sagas 25 min · Advanced" [ref=e245] [cursor=pointer]:
                - generic [ref=e246]: "28"
                - generic [ref=e247]:
                  - strong [ref=e248]: Distributed transactions & Sagas
                  - generic [ref=e249]: ◷ 25 min · Advanced
                - generic [ref=e251]: →
          - generic [ref=e252]:
            - generic [ref=e253]:
              - generic [ref=e254]: "05"
              - heading "Production architecture" [level=2] [ref=e256]
              - strong [ref=e257]: 0/4
            - generic [ref=e258]:
              - button "29 Timeouts, circuit breakers & degradation 22 min · Advanced" [ref=e259] [cursor=pointer]:
                - generic [ref=e260]: "29"
                - generic [ref=e261]:
                  - strong [ref=e262]: Timeouts, circuit breakers & degradation
                  - generic [ref=e263]: ◷ 22 min · Advanced
                - generic [ref=e265]: →
              - button "30 Logs, metrics, traces & alerts 20 min · Intermediate" [ref=e266] [cursor=pointer]:
                - generic [ref=e267]: "30"
                - generic [ref=e268]:
                  - strong [ref=e269]: Logs, metrics, traces & alerts
                  - generic [ref=e270]: ◷ 20 min · Intermediate
                - generic [ref=e272]: →
              - button "31 Authentication, authorization & security 24 min · Intermediate" [ref=e273] [cursor=pointer]:
                - generic [ref=e274]: "31"
                - generic [ref=e275]:
                  - strong [ref=e276]: Authentication, authorization & security
                  - generic [ref=e277]: ◷ 24 min · Intermediate
                - generic [ref=e279]: →
              - button "32 Microservices & event-driven architecture 25 min · Advanced" [ref=e280] [cursor=pointer]:
                - generic [ref=e281]: "32"
                - generic [ref=e282]:
                  - strong [ref=e283]: Microservices & event-driven architecture
                  - generic [ref=e284]: ◷ 25 min · Advanced
                - generic [ref=e286]: →
          - generic [ref=e287]:
            - generic [ref=e288]:
              - generic [ref=e289]: "06"
              - heading "Practical systems" [level=2] [ref=e291]
              - strong [ref=e292]: 0/4
            - generic [ref=e293]:
              - button "33 Design a URL shortener 30 min · Case study" [ref=e294] [cursor=pointer]:
                - generic [ref=e295]: "33"
                - generic [ref=e296]:
                  - strong [ref=e297]: Design a URL shortener
                  - generic [ref=e298]: ◷ 30 min · Case study
                - generic [ref=e300]: →
              - button "34 Design chat & notifications 32 min · Case study" [ref=e301] [cursor=pointer]:
                - generic [ref=e302]: "34"
                - generic [ref=e303]:
                  - strong [ref=e304]: Design chat & notifications
                  - generic [ref=e305]: ◷ 32 min · Case study
                - generic [ref=e307]: →
              - button "35 Design a social news feed 32 min · Case study" [ref=e308] [cursor=pointer]:
                - generic [ref=e309]: "35"
                - generic [ref=e310]:
                  - strong [ref=e311]: Design a social news feed
                  - generic [ref=e312]: ◷ 32 min · Case study
                - generic [ref=e314]: →
              - button "36 Design storage, video & search 35 min · Case study" [ref=e315] [cursor=pointer]:
                - generic [ref=e316]: "36"
                - generic [ref=e317]:
                  - strong [ref=e318]: Design storage, video & search
                  - generic [ref=e319]: ◷ 35 min · Case study
                - generic [ref=e321]: →
          - generic [ref=e322]:
            - generic [ref=e323]:
              - generic [ref=e324]: "07"
              - heading "Architecture mastery" [level=2] [ref=e326]
              - strong [ref=e327]: 0/10
            - generic [ref=e328]:
              - button "37 Distributed locks, leases & clocks 24 min · Advanced" [ref=e329] [cursor=pointer]:
                - generic [ref=e330]: "37"
                - generic [ref=e331]:
                  - strong [ref=e332]: Distributed locks, leases & clocks
                  - generic [ref=e333]: ◷ 24 min · Advanced
                - generic [ref=e335]: →
              - button "38 Bloom filters & probabilistic structures 20 min · Advanced" [ref=e336] [cursor=pointer]:
                - generic [ref=e337]: "38"
                - generic [ref=e338]:
                  - strong [ref=e339]: Bloom filters & probabilistic structures
                  - generic [ref=e340]: ◷ 20 min · Advanced
                - generic [ref=e342]: →
              - button "39 Design search & autocomplete 30 min · Case study" [ref=e343] [cursor=pointer]:
                - generic [ref=e344]: "39"
                - generic [ref=e345]:
                  - strong [ref=e346]: Design search & autocomplete
                  - generic [ref=e347]: ◷ 30 min · Case study
                - generic [ref=e349]: →
              - button "40 Design cloud file storage & sync 32 min · Case study" [ref=e350] [cursor=pointer]:
                - generic [ref=e351]: "40"
                - generic [ref=e352]:
                  - strong [ref=e353]: Design cloud file storage & sync
                  - generic [ref=e354]: ◷ 32 min · Case study
                - generic [ref=e356]: →
              - button "41 Design a video streaming platform 34 min · Case study" [ref=e357] [cursor=pointer]:
                - generic [ref=e358]: "41"
                - generic [ref=e359]:
                  - strong [ref=e360]: Design a video streaming platform
                  - generic [ref=e361]: ◷ 34 min · Case study
                - generic [ref=e363]: →
              - button "42 Design a notification platform 28 min · Case study" [ref=e364] [cursor=pointer]:
                - generic [ref=e365]: "42"
                - generic [ref=e366]:
                  - strong [ref=e367]: Design a notification platform
                  - generic [ref=e368]: ◷ 28 min · Case study
                - generic [ref=e370]: →
              - button "43 Design ride sharing & geospatial search 35 min · Case study" [ref=e371] [cursor=pointer]:
                - generic [ref=e372]: "43"
                - generic [ref=e373]:
                  - strong [ref=e374]: Design ride sharing & geospatial search
                  - generic [ref=e375]: ◷ 35 min · Case study
                - generic [ref=e377]: →
              - button "44 Design payments & order workflows 36 min · Case study" [ref=e378] [cursor=pointer]:
                - generic [ref=e379]: "44"
                - generic [ref=e380]:
                  - strong [ref=e381]: Design payments & order workflows
                  - generic [ref=e382]: ◷ 36 min · Case study
                - generic [ref=e384]: →
              - button "45 Multi-region architecture & disaster recovery 30 min · Advanced" [ref=e385] [cursor=pointer]:
                - generic [ref=e386]: "45"
                - generic [ref=e387]:
                  - strong [ref=e388]: Multi-region architecture & disaster recovery
                  - generic [ref=e389]: ◷ 30 min · Advanced
                - generic [ref=e391]: →
              - button "46 Capacity planning, cost & sustainability 24 min · Advanced" [ref=e392] [cursor=pointer]:
                - generic [ref=e393]: "46"
                - generic [ref=e394]:
                  - strong [ref=e395]: Capacity planning, cost & sustainability
                  - generic [ref=e396]: ◷ 24 min · Advanced
                - generic [ref=e398]: →
      - contentinfo [ref=e399]:
        - generic [ref=e400]:
          - generic [ref=e401]:
            - generic [ref=e403]: J
            - generic [ref=e404]:
              - strong [ref=e405]: Jahid
              - generic [ref=e406]: Creator & Educator
              - paragraph [ref=e407]: Building free, bilingual, visual courses that make computer science click.
              - generic [ref=e408]:
                - link "GitHub" [ref=e409] [cursor=pointer]:
                  - /url: https://github.com/your-username
                  - img [ref=e410]
                - link "LinkedIn" [ref=e412] [cursor=pointer]:
                  - /url: https://www.linkedin.com/in/your-username
                  - img [ref=e413]
                - link "Facebook" [ref=e415] [cursor=pointer]:
                  - /url: https://www.facebook.com/your-username
                  - img [ref=e416]
                - link "WhatsApp" [ref=e418] [cursor=pointer]:
                  - /url: https://wa.me/8801XXXXXXXXX
                  - img [ref=e419]
                - link "Email" [ref=e421] [cursor=pointer]:
                  - /url: mailto:4khoop@gmail.com
                  - img [ref=e422]
          - navigation "Footer navigation" [ref=e424]:
            - link "All courses" [ref=e425] [cursor=pointer]:
              - /url: /courses
            - link "Learn" [ref=e426] [cursor=pointer]:
              - /url: /learn
            - link "Privacy" [ref=e427] [cursor=pointer]:
              - /url: /privacy
        - generic [ref=e428]:
          - generic [ref=e429]:
            - strong [ref=e430]: CodePath
            - text: — Bilingual visual courses
          - generic [ref=e431]: © 2026 Jahid. Built with care.
    - navigation "Mobile navigation" [ref=e432]:
      - button "Home" [ref=e433] [cursor=pointer]:
        - generic [ref=e434]: ⌂
        - generic [ref=e435]: Home
      - button "Learn" [ref=e436] [cursor=pointer]:
        - generic [ref=e437]: ▤
        - generic [ref=e438]: Learn
      - button "Cases" [ref=e439] [cursor=pointer]:
        - generic [ref=e440]: ◱
        - generic [ref=e441]: Cases
      - button "Tools" [ref=e442] [cursor=pointer]:
        - generic [ref=e443]: ⌁
        - generic [ref=e444]: Tools
      - button "Interview" [ref=e445] [cursor=pointer]:
        - generic [ref=e446]: ◈
        - generic [ref=e447]: Interview
    - complementary [ref=e448]:
      - button "Focus timer" [ref=e449] [cursor=pointer]: ◷
  - alert [ref=e450]
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