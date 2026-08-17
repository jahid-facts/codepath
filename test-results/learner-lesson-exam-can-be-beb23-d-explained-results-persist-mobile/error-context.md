# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: learner.spec.js >> lesson exam can be completed and explained results persist
- Location: e2e/learner.spec.js:49:1

# Error details

```
Error: expect(locator).toHaveCount(expected) failed

Locator:  locator('.explanation')
Expected: 5
Received: 15
Timeout:  7000ms

Call log:
  - Expect "toHaveCount" with timeout 7000ms
  - waiting for locator('.explanation')
    18 × locator resolved to 15 elements
       - unexpected value "15"

```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - alert [ref=e2]
  - generic [ref=e3]:
    - link "Skip to main content" [ref=e4] [cursor=pointer]:
      - /url: "#main-content"
    - status [ref=e5]: "Current page: exam"
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
          - button "Back to lesson" [ref=e24] [cursor=pointer]:
            - generic [ref=e25]: ←
            - text: Back to lesson
          - generic [ref=e26]:
            - generic [ref=e27]:
              - strong [ref=e28]: "27"
              - generic [ref=e29]: "%"
            - generic [ref=e30]:
              - generic [ref=e31]: Review and try again
              - heading "What is system design?" [level=1] [ref=e32]
              - paragraph [ref=e33]: You answered 4 of 15 correctly. Use the explanations to strengthen weak concepts.
              - generic [ref=e34]:
                - button "Retry exam" [ref=e35] [cursor=pointer]
                - button "Next lesson" [ref=e36] [cursor=pointer]:
                  - text: Next lesson
                  - generic [ref=e37]: →
            - complementary [ref=e38]:
              - generic [ref=e39]:
                - text: Best score
                - strong [ref=e40]: 27%
              - generic [ref=e41]:
                - text: Attempts
                - strong [ref=e42]: "2"
          - generic [ref=e43]:
            - generic [ref=e44]: Answer review
            - heading "Understand the reason behind each decision" [level=2] [ref=e45]
          - generic [ref=e46]:
            - generic [ref=e47]:
              - generic [ref=e48]:
                - generic [ref=e49]: "01"
                - generic [ref=e50]:
                  - text: Single answer
                  - heading "You are asked to design a flash-sale platform. What should you clarify before drawing services?" [level=2] [ref=e51]
                - generic [ref=e52]: ✓
              - generic [ref=e53]:
                - button "A Peak demand, inventory correctness, and acceptable degradation ✓" [ref=e54] [cursor=pointer]:
                  - generic [ref=e55]: A
                  - paragraph [ref=e56]: Peak demand, inventory correctness, and acceptable degradation
                  - generic [ref=e57]: ✓
                - button "B Which cloud logo the interviewer prefers" [ref=e58] [cursor=pointer]:
                  - generic [ref=e59]: B
                  - paragraph [ref=e60]: Which cloud logo the interviewer prefers
                - button "C The names of every future microservice" [ref=e61] [cursor=pointer]:
                  - generic [ref=e62]: C
                  - paragraph [ref=e63]: The names of every future microservice
              - generic [ref=e64]:
                - strong [ref=e65]: Why?
                - paragraph [ref=e66]: Requirements and constraints determine the architecture. Technology names are downstream decisions.
            - generic [ref=e67]:
              - generic [ref=e68]:
                - generic [ref=e69]: "02"
                - generic [ref=e70]:
                  - text: Single answer
                  - heading "Only 100,000 tickets exist, but 10 million buyers may click at once. Which design protects correctness and capacity?" [level=2] [ref=e71]
                - generic [ref=e72]: ×
              - generic [ref=e73]:
                - button "A Add more frontend animations" [ref=e74] [cursor=pointer]:
                  - generic [ref=e75]: A
                  - paragraph [ref=e76]: Add more frontend animations
                - button "B Use admission control plus transactional inventory holds ✓" [ref=e77] [cursor=pointer]:
                  - generic [ref=e78]: B
                  - paragraph [ref=e79]: Use admission control plus transactional inventory holds
                  - generic [ref=e80]: ✓
                - button "C Cache successful purchases for one day" [ref=e81] [cursor=pointer]:
                  - generic [ref=e82]: C
                  - paragraph [ref=e83]: Cache successful purchases for one day
              - generic [ref=e84]:
                - strong [ref=e85]: Why?
                - paragraph [ref=e86]: Admission control limits work entering the critical path; transactional holds prevent overselling.
            - generic [ref=e87]:
              - generic [ref=e88]:
                - generic [ref=e89]: "03"
                - generic [ref=e90]:
                  - text: Single answer
                  - heading "Which operations belong off the synchronous ticket-purchase path?" [level=2] [ref=e91]
                - generic [ref=e92]: ×
              - generic [ref=e93]:
                - button "A Inventory reservation and payment authorization" [ref=e94] [cursor=pointer]:
                  - generic [ref=e95]: A
                  - paragraph [ref=e96]: Inventory reservation and payment authorization
                - button "B Email receipt and analytics event ✓" [ref=e97] [cursor=pointer]:
                  - generic [ref=e98]: B
                  - paragraph [ref=e99]: Email receipt and analytics event
                  - generic [ref=e100]: ✓
                - button "C Idempotency validation and order commit" [ref=e101] [cursor=pointer]:
                  - generic [ref=e102]: C
                  - paragraph [ref=e103]: Idempotency validation and order commit
              - generic [ref=e104]:
                - strong [ref=e105]: Why?
                - paragraph [ref=e106]: Email and analytics can run from durable events; reservation, payment decision, and order durability determine the user result.
            - generic [ref=e107]:
              - generic [ref=e108]:
                - generic [ref=e109]: "04"
                - generic [ref=e110]:
                  - text: Single answer
                  - heading "The system needs 50 instances normally across three zones and must survive one zone loss. What is the safer capacity plan?" [level=2] [ref=e111]
                - generic [ref=e112]: ✓
              - generic [ref=e113]:
                - button "A About 75 instances, 25 per zone ✓" [ref=e114] [cursor=pointer]:
                  - generic [ref=e115]: A
                  - paragraph [ref=e116]: About 75 instances, 25 per zone
                  - generic [ref=e117]: ✓
                - button "B Exactly 50 instances, evenly split" [ref=e118] [cursor=pointer]:
                  - generic [ref=e119]: B
                  - paragraph [ref=e120]: Exactly 50 instances, evenly split
                - button "C One instance with a larger disk" [ref=e121] [cursor=pointer]:
                  - generic [ref=e122]: C
                  - paragraph [ref=e123]: One instance with a larger disk
              - generic [ref=e124]:
                - strong [ref=e125]: Why?
                - paragraph [ref=e126]: With 75 total, the two surviving zones retain 50 instances of capacity. Fifty total would leave only about 33.
            - generic [ref=e127]:
              - generic [ref=e128]:
                - generic [ref=e129]: "05"
                - generic [ref=e130]:
                  - text: Select two answers
                  - heading "Select the two signals of a strong system-design interview answer." [level=2] [ref=e131]
                - generic [ref=e132]: ×
              - generic [ref=e133]:
                - button "✓ It states scale assumptions before choosing components. ✓" [ref=e134] [cursor=pointer]:
                  - generic [ref=e135]: ✓
                  - paragraph [ref=e136]: It states scale assumptions before choosing components.
                  - generic [ref=e137]: ✓
                - button "It explains overload and failure behavior. ✓" [ref=e138] [cursor=pointer]:
                  - paragraph [ref=e140]: It explains overload and failure behavior.
                  - generic [ref=e141]: ✓
                - button "It uses the maximum possible number of technologies." [ref=e142] [cursor=pointer]:
                  - paragraph [ref=e144]: It uses the maximum possible number of technologies.
                - button "It avoids discussing trade-offs." [ref=e145] [cursor=pointer]:
                  - paragraph [ref=e147]: It avoids discussing trade-offs.
              - generic [ref=e148]:
                - strong [ref=e149]: Why?
                - paragraph [ref=e150]: A strong answer connects assumptions to decisions and covers failure. More technology without justification weakens the design.
            - generic [ref=e151]:
              - generic [ref=e152]:
                - generic [ref=e153]: "06"
                - generic [ref=e154]:
                  - text: Single answer
                  - heading "What is the central idea of What is system design??" [level=2] [ref=e155]
                - generic [ref=e156]: ×
              - generic [ref=e157]:
                - button "A Choose the newest tool before measuring the problem." [ref=e158] [cursor=pointer]:
                  - generic [ref=e159]: A
                  - paragraph [ref=e160]: Choose the newest tool before measuring the problem.
                - button "B Put every responsibility in one server and remove monitoring." [ref=e161] [cursor=pointer]:
                  - generic [ref=e162]: B
                  - paragraph [ref=e163]: Put every responsibility in one server and remove monitoring.
                - button "C System design turns product goals and constraints into components, data flows, and explicit trade-offs. ✓" [ref=e164] [cursor=pointer]:
                  - generic [ref=e165]: C
                  - paragraph [ref=e166]: System design turns product goals and constraints into components, data flows, and explicit trade-offs.
                  - generic [ref=e167]: ✓
                - button "D Assume failures and traffic spikes will not happen." [ref=e168] [cursor=pointer]:
                  - generic [ref=e169]: D
                  - paragraph [ref=e170]: Assume failures and traffic spikes will not happen.
              - generic [ref=e171]:
                - strong [ref=e172]: Why?
                - paragraph [ref=e173]: System design turns product goals and constraints into components, data flows, and explicit trade-offs.
            - generic [ref=e174]:
              - generic [ref=e175]:
                - generic [ref=e176]: "07"
                - generic [ref=e177]:
                  - text: Single answer
                  - heading "Which is the strongest first decision or habit here?" [level=2] [ref=e178]
                - generic [ref=e179]: ×
              - generic [ref=e180]:
                - button "A Put every responsibility in one server and remove monitoring." [ref=e181] [cursor=pointer]:
                  - generic [ref=e182]: A
                  - paragraph [ref=e183]: Put every responsibility in one server and remove monitoring.
                - button "B Assume failures and traffic spikes will not happen." [ref=e184] [cursor=pointer]:
                  - generic [ref=e185]: B
                  - paragraph [ref=e186]: Assume failures and traffic spikes will not happen.
                - button "C Design for peak load without ever measuring real traffic." [ref=e187] [cursor=pointer]:
                  - generic [ref=e188]: C
                  - paragraph [ref=e189]: Design for peak load without ever measuring real traffic.
                - button "D Start with requirements and scale before choosing technology. ✓" [ref=e190] [cursor=pointer]:
                  - generic [ref=e191]: D
                  - paragraph [ref=e192]: Start with requirements and scale before choosing technology.
                  - generic [ref=e193]: ✓
              - generic [ref=e194]:
                - strong [ref=e195]: Why?
                - paragraph [ref=e196]: Start with requirements and scale before choosing technology.
            - generic [ref=e197]:
              - generic [ref=e198]:
                - generic [ref=e199]: "08"
                - generic [ref=e200]:
                  - text: Single answer
                  - heading "Which statement best captures the main trade-off?" [level=2] [ref=e201]
                - generic [ref=e202]: ✓
              - generic [ref=e203]:
                - button "A A design that optimizes one quality often spends cost or complexity elsewhere. ✓" [ref=e204] [cursor=pointer]:
                  - generic [ref=e205]: A
                  - paragraph [ref=e206]: A design that optimizes one quality often spends cost or complexity elsewhere.
                  - generic [ref=e207]: ✓
                - button "B Assume failures and traffic spikes will not happen." [ref=e208] [cursor=pointer]:
                  - generic [ref=e209]: B
                  - paragraph [ref=e210]: Assume failures and traffic spikes will not happen.
                - button "C Design for peak load without ever measuring real traffic." [ref=e211] [cursor=pointer]:
                  - generic [ref=e212]: C
                  - paragraph [ref=e213]: Design for peak load without ever measuring real traffic.
                - button "D Add caches and queues everywhere before finding the bottleneck." [ref=e214] [cursor=pointer]:
                  - generic [ref=e215]: D
                  - paragraph [ref=e216]: Add caches and queues everywhere before finding the bottleneck.
              - generic [ref=e217]:
                - strong [ref=e218]: Why?
                - paragraph [ref=e219]: A design that optimizes one quality often spends cost or complexity elsewhere.
            - generic [ref=e220]:
              - generic [ref=e221]:
                - generic [ref=e222]: "09"
                - generic [ref=e223]:
                  - text: Single answer
                  - heading "Why is this useful — what does it give you?" [level=2] [ref=e224]
                - generic [ref=e225]: ×
              - generic [ref=e226]:
                - button "A Design for peak load without ever measuring real traffic." [ref=e227] [cursor=pointer]:
                  - generic [ref=e228]: A
                  - paragraph [ref=e229]: Design for peak load without ever measuring real traffic.
                - button "B It creates a clear way to reason about what is system design? and its role in a larger architecture. ✓" [ref=e230] [cursor=pointer]:
                  - generic [ref=e231]: B
                  - paragraph [ref=e232]: It creates a clear way to reason about what is system design? and its role in a larger architecture.
                  - generic [ref=e233]: ✓
                - button "C Add caches and queues everywhere before finding the bottleneck." [ref=e234] [cursor=pointer]:
                  - generic [ref=e235]: C
                  - paragraph [ref=e236]: Add caches and queues everywhere before finding the bottleneck.
                - button "D Skip capacity estimates and hope the database keeps up." [ref=e237] [cursor=pointer]:
                  - generic [ref=e238]: D
                  - paragraph [ref=e239]: Skip capacity estimates and hope the database keeps up.
              - generic [ref=e240]:
                - strong [ref=e241]: Why?
                - paragraph [ref=e242]: It creates a clear way to reason about what is system design? and its role in a larger architecture.
            - generic [ref=e243]:
              - generic [ref=e244]:
                - generic [ref=e245]: "10"
                - generic [ref=e246]:
                  - text: Single answer
                  - heading "What should a strong interview answer include?" [level=2] [ref=e247]
                - generic [ref=e248]: ×
              - generic [ref=e249]:
                - button "A Add caches and queues everywhere before finding the bottleneck." [ref=e250] [cursor=pointer]:
                  - generic [ref=e251]: A
                  - paragraph [ref=e252]: Add caches and queues everywhere before finding the bottleneck.
                - button "B Skip capacity estimates and hope the database keeps up." [ref=e253] [cursor=pointer]:
                  - generic [ref=e254]: B
                  - paragraph [ref=e255]: Skip capacity estimates and hope the database keeps up.
                - button "C State assumptions first, draw the simplest what is system design? flow, then explain what changes at 10× scale. ✓" [ref=e256] [cursor=pointer]:
                  - generic [ref=e257]: C
                  - paragraph [ref=e258]: State assumptions first, draw the simplest what is system design? flow, then explain what changes at 10× scale.
                  - generic [ref=e259]: ✓
                - button "D Couple every service tightly so one failure takes down all." [ref=e260] [cursor=pointer]:
                  - generic [ref=e261]: D
                  - paragraph [ref=e262]: Couple every service tightly so one failure takes down all.
              - generic [ref=e263]:
                - strong [ref=e264]: Why?
                - paragraph [ref=e265]: Interviewers value a clear mechanism, the key decision, and an explicit trade-off over memorized syntax.
            - generic [ref=e266]:
              - generic [ref=e267]:
                - generic [ref=e268]: "11"
                - generic [ref=e269]:
                  - text: Single answer
                  - heading "Which analogy is the best mental model?" [level=2] [ref=e270]
                - generic [ref=e271]: ×
              - generic [ref=e272]:
                - button "A Skip capacity estimates and hope the database keeps up." [ref=e273] [cursor=pointer]:
                  - generic [ref=e274]: A
                  - paragraph [ref=e275]: Skip capacity estimates and hope the database keeps up.
                - button "B Couple every service tightly so one failure takes down all." [ref=e276] [cursor=pointer]:
                  - generic [ref=e277]: B
                  - paragraph [ref=e278]: Couple every service tightly so one failure takes down all.
                - button "C Ship without a plan for retries, timeouts, or backpressure." [ref=e279] [cursor=pointer]:
                  - generic [ref=e280]: C
                  - paragraph [ref=e281]: Ship without a plan for retries, timeouts, or backpressure.
                - 'button "D Think of planning a city: roads, utilities, and emergency routes must work together. ✓" [ref=e282] [cursor=pointer]':
                  - generic [ref=e283]: D
                  - paragraph [ref=e284]: "Think of planning a city: roads, utilities, and emergency routes must work together."
                  - generic [ref=e285]: ✓
              - generic [ref=e286]:
                - strong [ref=e287]: Why?
                - paragraph [ref=e288]: "Think of planning a city: roads, utilities, and emergency routes must work together."
            - generic [ref=e289]:
              - generic [ref=e290]:
                - generic [ref=e291]: "12"
                - generic [ref=e292]:
                  - text: Single answer
                  - heading "Which of these is a common mistake?" [level=2] [ref=e293]
                - generic [ref=e294]: ✓
              - generic [ref=e295]:
                - button "A Jumping directly to microservices without defining the problem. ✓" [ref=e296] [cursor=pointer]:
                  - generic [ref=e297]: A
                  - paragraph [ref=e298]: Jumping directly to microservices without defining the problem.
                  - generic [ref=e299]: ✓
                - button "B System design turns product goals and constraints into components, data flows, and explicit trade-offs." [ref=e300] [cursor=pointer]:
                  - generic [ref=e301]: B
                  - paragraph [ref=e302]: System design turns product goals and constraints into components, data flows, and explicit trade-offs.
                - button "C Start with requirements and scale before choosing technology." [ref=e303] [cursor=pointer]:
                  - generic [ref=e304]: C
                  - paragraph [ref=e305]: Start with requirements and scale before choosing technology.
                - button "D A design that optimizes one quality often spends cost or complexity elsewhere." [ref=e306] [cursor=pointer]:
                  - generic [ref=e307]: D
                  - paragraph [ref=e308]: A design that optimizes one quality often spends cost or complexity elsewhere.
              - generic [ref=e309]:
                - strong [ref=e310]: Why?
                - paragraph [ref=e311]: "Avoid this: Jumping directly to microservices without defining the problem."
            - generic [ref=e312]:
              - generic [ref=e313]:
                - generic [ref=e314]: "13"
                - generic [ref=e315]:
                  - text: Single answer
                  - heading "Which practice should you avoid?" [level=2] [ref=e316]
                - generic [ref=e317]: ×
              - generic [ref=e318]:
                - button "A Start with requirements and scale before choosing technology." [ref=e319] [cursor=pointer]:
                  - generic [ref=e320]: A
                  - paragraph [ref=e321]: Start with requirements and scale before choosing technology.
                - button "B Choose the newest tool before measuring the problem. ✓" [ref=e322] [cursor=pointer]:
                  - generic [ref=e323]: B
                  - paragraph [ref=e324]: Choose the newest tool before measuring the problem.
                  - generic [ref=e325]: ✓
                - button "C It creates a clear way to reason about what is system design? and its role in a larger architecture." [ref=e326] [cursor=pointer]:
                  - generic [ref=e327]: C
                  - paragraph [ref=e328]: It creates a clear way to reason about what is system design? and its role in a larger architecture.
                - 'button "D Think of planning a city: roads, utilities, and emergency routes must work together." [ref=e329] [cursor=pointer]':
                  - generic [ref=e330]: D
                  - paragraph [ref=e331]: "Think of planning a city: roads, utilities, and emergency routes must work together."
              - generic [ref=e332]:
                - strong [ref=e333]: Why?
                - paragraph [ref=e334]: "Avoid this: Choose the newest tool before measuring the problem."
            - generic [ref=e335]:
              - generic [ref=e336]:
                - generic [ref=e337]: "14"
                - generic [ref=e338]:
                  - text: Single answer
                  - heading "Which statement is an anti-pattern?" [level=2] [ref=e339]
                - generic [ref=e340]: ×
              - generic [ref=e341]:
                - button "A System design turns product goals and constraints into components, data flows, and explicit trade-offs." [ref=e342] [cursor=pointer]:
                  - generic [ref=e343]: A
                  - paragraph [ref=e344]: System design turns product goals and constraints into components, data flows, and explicit trade-offs.
                - button "B A design that optimizes one quality often spends cost or complexity elsewhere." [ref=e345] [cursor=pointer]:
                  - generic [ref=e346]: B
                  - paragraph [ref=e347]: A design that optimizes one quality often spends cost or complexity elsewhere.
                - button "C Design for peak load without ever measuring real traffic. ✓" [ref=e348] [cursor=pointer]:
                  - generic [ref=e349]: C
                  - paragraph [ref=e350]: Design for peak load without ever measuring real traffic.
                  - generic [ref=e351]: ✓
                - button "D State assumptions first, draw the simplest what is system design? flow, then explain what changes at 10× scale." [ref=e352] [cursor=pointer]:
                  - generic [ref=e353]: D
                  - paragraph [ref=e354]: State assumptions first, draw the simplest what is system design? flow, then explain what changes at 10× scale.
              - generic [ref=e355]:
                - strong [ref=e356]: Why?
                - paragraph [ref=e357]: "Avoid this: Design for peak load without ever measuring real traffic."
            - generic [ref=e358]:
              - generic [ref=e359]:
                - generic [ref=e360]: "15"
                - generic [ref=e361]:
                  - text: Select two answers
                  - heading "Select the two statements that show sound reasoning." [level=2] [ref=e362]
                - generic [ref=e363]: ×
              - generic [ref=e364]:
                - button "✓ System design turns product goals and constraints into components, data flows, and explicit trade-offs. ✓" [ref=e365] [cursor=pointer]:
                  - generic [ref=e366]: ✓
                  - paragraph [ref=e367]: System design turns product goals and constraints into components, data flows, and explicit trade-offs.
                  - generic [ref=e368]: ✓
                - button "Put every responsibility in one server and remove monitoring." [ref=e369] [cursor=pointer]:
                  - paragraph [ref=e371]: Put every responsibility in one server and remove monitoring.
                - button "A design that optimizes one quality often spends cost or complexity elsewhere. ✓" [ref=e372] [cursor=pointer]:
                  - paragraph [ref=e374]: A design that optimizes one quality often spends cost or complexity elsewhere.
                  - generic [ref=e375]: ✓
                - button "Add caches and queues everywhere before finding the bottleneck." [ref=e376] [cursor=pointer]:
                  - paragraph [ref=e378]: Add caches and queues everywhere before finding the bottleneck.
              - generic [ref=e379]:
                - strong [ref=e380]: Why?
                - paragraph [ref=e381]: A sound answer states both what it does and the cost it accepts.
      - contentinfo [ref=e382]:
        - generic [ref=e383]:
          - generic [ref=e384]:
            - generic [ref=e386]: J
            - generic [ref=e387]:
              - strong [ref=e388]: Jahid
              - generic [ref=e389]: Creator & Educator
              - paragraph [ref=e390]: Building free, bilingual, visual courses that make computer science click.
              - generic [ref=e391]:
                - link "GitHub" [ref=e392] [cursor=pointer]:
                  - /url: https://github.com/your-username
                  - img [ref=e393]
                - link "LinkedIn" [ref=e395] [cursor=pointer]:
                  - /url: https://www.linkedin.com/in/your-username
                  - img [ref=e396]
                - link "Facebook" [ref=e398] [cursor=pointer]:
                  - /url: https://www.facebook.com/your-username
                  - img [ref=e399]
                - link "WhatsApp" [ref=e401] [cursor=pointer]:
                  - /url: https://wa.me/8801XXXXXXXXX
                  - img [ref=e402]
                - link "Email" [ref=e404] [cursor=pointer]:
                  - /url: mailto:4khoop@gmail.com
                  - img [ref=e405]
          - navigation "Footer navigation" [ref=e407]:
            - link "All courses" [ref=e408] [cursor=pointer]:
              - /url: /courses
            - link "Learn" [ref=e409] [cursor=pointer]:
              - /url: /learn
            - link "Privacy" [ref=e410] [cursor=pointer]:
              - /url: /privacy
        - generic [ref=e411]:
          - generic [ref=e412]:
            - strong [ref=e413]: CodePath
            - text: — Bilingual visual courses
          - generic [ref=e414]: © 2026 Jahid. Built with care.
    - navigation "Mobile navigation" [ref=e415]:
      - button "Home" [ref=e416] [cursor=pointer]:
        - generic [ref=e417]: ⌂
        - generic [ref=e418]: Home
      - button "Learn" [ref=e419] [cursor=pointer]:
        - generic [ref=e420]: ▤
        - generic [ref=e421]: Learn
      - button "Cases" [ref=e422] [cursor=pointer]:
        - generic [ref=e423]: ◱
        - generic [ref=e424]: Cases
      - button "Tools" [ref=e425] [cursor=pointer]:
        - generic [ref=e426]: ⌁
        - generic [ref=e427]: Tools
      - button "Interview" [ref=e428] [cursor=pointer]:
        - generic [ref=e429]: ◈
        - generic [ref=e430]: Interview
    - complementary [ref=e431]:
      - button "Focus timer" [ref=e432] [cursor=pointer]: ◷
```

# Test source

```ts
  1   | import { expect, test } from '@playwright/test'
  2   | 
  3   | const storageKey = 'system-design-path-v1'
  4   | const returningProgress = {
  5   |   version: 1,
  6   |   language: 'en',
  7   |   completed: [],
  8   |   bookmarks: [],
  9   |   recents: [],
  10  |   attempts: {},
  11  |   labProgress: {},
  12  |   notes: {},
  13  |   activityDates: [],
  14  |   analyticsOptOut: true,
  15  |   onboarding: { completed: true, retake: false, goal: 'both', experience: 'new', pace: 'steady', diagnosticScore: 0, recommendedTopic: 'system-design' },
  16  | }
  17  | 
  18  | async function enterAsReturningLearner(page) {
  19  |   await page.addInitScript(([key, value]) => {
  20  |     if (!localStorage.getItem(key)) localStorage.setItem(key, JSON.stringify(value))
  21  |   }, [storageKey, returningProgress])
  22  | }
  23  | 
  24  | test('first-time learner completes onboarding and receives a lesson recommendation', async ({ page }) => {
  25  |   await page.goto('/')
  26  |   await expect(page.getByRole('heading', { name: 'What are you learning system design for?' })).toBeVisible()
  27  |   await page.getByRole('button', { name: /Both/ }).click()
  28  |   await page.getByRole('button', { name: /Continue/ }).click()
  29  |   await page.getByRole('button', { name: /New to backend architecture/ }).click()
  30  |   await page.getByRole('button', { name: /Continue/ }).click()
  31  |   for (const fieldset of await page.locator('.diagnostic-list fieldset').all()) await fieldset.locator('button').first().click()
  32  |   await page.getByRole('button', { name: /Continue/ }).click()
  33  |   await expect(page.getByRole('heading', { name: 'Your path is ready.' })).toBeVisible()
  34  |   await page.getByRole('button', { name: /Steady/ }).click()
  35  |   await page.getByRole('button', { name: /Start my path/ }).click()
  36  |   await expect(page).toHaveURL(/\/lessons\//)
  37  |   await expect(page.locator('.lesson-layout')).toBeVisible()
  38  | })
  39  | 
  40  | test('language choice updates the complete shell and survives reload', async ({ page }) => {
  41  |   await enterAsReturningLearner(page)
  42  |   await page.goto('/')
  43  |   await page.getByRole('button', { name: 'Switch language' }).click()
  44  |   await expect(page.getByRole('heading', { name: /আর্কিটেকচার ভাবুন/ })).toBeVisible()
  45  |   await page.reload()
  46  |   await expect(page.getByRole('heading', { name: /আর্কিটেকচার ভাবুন/ })).toBeVisible()
  47  | })
  48  | 
  49  | test('lesson exam can be completed and explained results persist', async ({ page }) => {
  50  |   await enterAsReturningLearner(page)
  51  |   await page.goto('/lessons/system-design')
  52  |   await page.getByRole('button', { name: /Start exam/ }).click()
  53  |   for (const question of await page.locator('.question-card').all()) await question.locator('.options button').first().click()
  54  |   await page.getByRole('button', { name: /Submit answers/ }).click()
  55  |   await expect(page.locator('.result-hero')).toBeVisible()
> 56  |   await expect(page.locator('.explanation')).toHaveCount(5)
      |                                              ^ Error: expect(locator).toHaveCount(expected) failed
  57  |   const saved = await page.evaluate((key) => JSON.parse(localStorage.getItem(key)), storageKey)
  58  |   expect(saved.attempts['system-design']).toHaveLength(1)
  59  | })
  60  | 
  61  | test('guided lab decisions persist after reload', async ({ page }) => {
  62  |   await enterAsReturningLearner(page)
  63  |   await page.goto('/labs')
  64  |   await page.getByRole('button', { name: /URL Shortener Lab/ }).click()
  65  |   await page.locator('.lab-stage .lab-options button').first().click()
  66  |   await expect(page.locator('.lab-feedback')).toBeVisible()
  67  |   await page.reload()
  68  |   await expect(page).toHaveURL(/\/labs\/url-lab$/)
  69  |   await expect(page.locator('.lab-stage .lab-options button.selected')).toHaveCount(1)
  70  | })
  71  | 
  72  | test('simulator remains within a mobile viewport and reacts deterministically', async ({ page }, testInfo) => {
  73  |   test.skip(testInfo.project.name !== 'mobile', 'Mobile layout assertion')
  74  |   await enterAsReturningLearner(page)
  75  |   await page.goto('/simulator')
  76  |   await expect(page.getByRole('heading', { name: 'Architecture simulator' })).toBeVisible()
  77  |   const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth)
  78  |   expect(overflow).toBeLessThanOrEqual(1)
  79  |   await page.getByText('Fail one app server').click()
  80  |   await expect(page.locator('.health-banner strong')).toBeVisible()
  81  | })
  82  | 
  83  | test('compact phone keeps onboarding and simulator controls usable', async ({ page }, testInfo) => {
  84  |   test.skip(testInfo.project.name !== 'mobile', 'Compact mobile layout assertion')
  85  |   await page.setViewportSize({ width: 320, height: 568 })
  86  |   await enterAsReturningLearner(page)
  87  |   await page.goto('/simulator')
  88  |   await expect(page.getByText('Requests / second')).toBeVisible()
  89  |   expect(await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth)).toBeLessThanOrEqual(1)
  90  | })
  91  | 
  92  | test('learner can download a portable progress backup', async ({ page }) => {
  93  |   await enterAsReturningLearner(page)
  94  |   await page.goto('/')
  95  |   await page.getByRole('button', { name: 'Local learner profile' }).click()
  96  |   const downloadPromise = page.waitForEvent('download')
  97  |   await page.getByRole('button', { name: /Download progress/ }).click()
  98  |   const download = await downloadPromise
  99  |   expect(download.suggestedFilename()).toMatch(/^systempath-progress-\d{4}-\d{2}-\d{2}\.json$/)
  100 | })
  101 | 
  102 | test('admin dashboard redirects unauthenticated visitors to sign in', async ({ page }) => {
  103 |   await page.goto('/admin')
  104 |   await expect(page).toHaveURL(/\/admin\/login$/)
  105 |   await expect(page.getByRole('heading', { name: 'Admin access' })).toBeVisible()
  106 |   await expect(page.getByLabel('Admin password')).toBeVisible()
  107 | })
  108 | 
  109 | test('analytics requires explicit consent and remembers a decline', async ({ page }) => {
  110 |   await page.addInitScript(([key, value]) => { if (!localStorage.getItem(key)) localStorage.setItem(key, JSON.stringify({ ...value, analyticsConsent: 'unset', analyticsOptOut: false })) }, [storageKey, returningProgress])
  111 |   await page.goto('/')
  112 |   await expect(page.getByRole('region', { name: 'Analytics consent' })).toBeVisible()
  113 |   await page.getByRole('button', { name: 'Decline' }).click()
  114 |   await expect(page.getByRole('region', { name: 'Analytics consent' })).toBeHidden()
  115 |   await page.reload()
  116 |   await expect(page.getByRole('region', { name: 'Analytics consent' })).toBeHidden()
  117 |   const saved = await page.evaluate((key) => JSON.parse(localStorage.getItem(key)), storageKey)
  118 |   expect(saved.analyticsConsent).toBe('denied')
  119 |   expect(saved.analyticsOptOut).toBe(true)
  120 | })
  121 | 
```