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
    - generic [ref=e43]:
      - complementary "Curriculum" [ref=e44]:
        - generic [ref=e45]:
          - button "Full curriculum 1/46" [ref=e46] [cursor=pointer]:
            - generic [ref=e47]: ▤
            - generic [ref=e48]: Full curriculum
            - generic [ref=e49]: 1/46
          - generic [ref=e50]:
            - generic [ref=e51]:
              - button "01 Foundations 1/6" [expanded] [ref=e52] [cursor=pointer]:
                - generic [ref=e53]: "01"
                - generic [ref=e54]: Foundations
                - generic [ref=e55]: 1/6
                - generic [ref=e57]: ⌄
              - list [ref=e58]:
                - listitem [ref=e59]:
                  - button "What is system design?" [ref=e60] [cursor=pointer]:
                    - generic [ref=e62]: ✓
                    - generic [ref=e63]: What is system design?
                - listitem [ref=e64]:
                  - button "02 Client-server & request lifecycle" [ref=e65] [cursor=pointer]:
                    - generic [ref=e66]: "02"
                    - generic [ref=e67]: Client-server & request lifecycle
                - listitem [ref=e68]:
                  - button "03 Functional & non-functional requirements" [ref=e69] [cursor=pointer]:
                    - generic [ref=e70]: "03"
                    - generic [ref=e71]: Functional & non-functional requirements
                - listitem [ref=e72]:
                  - button "04 Back-of-the-envelope estimation" [ref=e73] [cursor=pointer]:
                    - generic [ref=e74]: "04"
                    - generic [ref=e75]: Back-of-the-envelope estimation
                - listitem [ref=e76]:
                  - button "05 Latency, throughput & concurrency" [ref=e77] [cursor=pointer]:
                    - generic [ref=e78]: "05"
                    - generic [ref=e79]: Latency, throughput & concurrency
                - listitem [ref=e80]:
                  - button "06 Scale, availability & fault tolerance" [ref=e81] [cursor=pointer]:
                    - generic [ref=e82]: "06"
                    - generic [ref=e83]: Scale, availability & fault tolerance
            - button "02 Networking basics 0/6" [ref=e85] [cursor=pointer]:
              - generic [ref=e86]: "02"
              - generic [ref=e87]: Networking basics
              - generic [ref=e88]: 0/6
              - generic [ref=e90]: ⌄
            - button "03 Core components 0/8" [ref=e92] [cursor=pointer]:
              - generic [ref=e93]: "03"
              - generic [ref=e94]: Core components
              - generic [ref=e95]: 0/8
              - generic [ref=e97]: ⌄
            - button "04 Distributed systems 0/8" [ref=e99] [cursor=pointer]:
              - generic [ref=e100]: "04"
              - generic [ref=e101]: Distributed systems
              - generic [ref=e102]: 0/8
              - generic [ref=e104]: ⌄
            - button "05 Production architecture 0/4" [ref=e106] [cursor=pointer]:
              - generic [ref=e107]: "05"
              - generic [ref=e108]: Production architecture
              - generic [ref=e109]: 0/4
              - generic [ref=e111]: ⌄
            - button "06 Practical systems 0/4" [ref=e113] [cursor=pointer]:
              - generic [ref=e114]: "06"
              - generic [ref=e115]: Practical systems
              - generic [ref=e116]: 0/4
              - generic [ref=e118]: ⌄
            - button "07 Architecture mastery 0/10" [ref=e120] [cursor=pointer]:
              - generic [ref=e121]: "07"
              - generic [ref=e122]: Architecture mastery
              - generic [ref=e123]: 0/10
              - generic [ref=e125]: ⌄
          - generic [ref=e126]:
            - strong [ref=e128]: 2%
            - generic [ref=e129]:
              - strong [ref=e130]: Your progress
              - generic [ref=e131]: 1 complete
      - generic [ref=e132]:
        - main [ref=e133]:
          - generic [ref=e134]:
            - button "Back to lesson" [ref=e135] [cursor=pointer]:
              - generic [ref=e136]: ←
              - text: Back to lesson
            - generic [ref=e137]:
              - generic [ref=e138]:
                - strong [ref=e139]: "27"
                - generic [ref=e140]: "%"
              - generic [ref=e141]:
                - generic [ref=e142]: Review and try again
                - heading "What is system design?" [level=1] [ref=e143]
                - paragraph [ref=e144]: You answered 4 of 15 correctly. Use the explanations to strengthen weak concepts.
                - generic [ref=e145]:
                  - button "Retry exam" [ref=e146] [cursor=pointer]
                  - button "Next lesson" [ref=e147] [cursor=pointer]:
                    - text: Next lesson
                    - generic [ref=e148]: →
              - complementary [ref=e149]:
                - generic [ref=e150]:
                  - text: Best score
                  - strong [ref=e151]: 27%
                - generic [ref=e152]:
                  - text: Attempts
                  - strong [ref=e153]: "2"
            - generic [ref=e154]:
              - generic [ref=e155]: Answer review
              - heading "Understand the reason behind each decision" [level=2] [ref=e156]
            - generic [ref=e157]:
              - generic [ref=e158]:
                - generic [ref=e159]:
                  - generic [ref=e160]: "01"
                  - generic [ref=e161]:
                    - text: Single answer
                    - heading "You are asked to design a flash-sale platform. What should you clarify before drawing services?" [level=2] [ref=e162]
                  - generic [ref=e163]: ✓
                - generic [ref=e164]:
                  - button "A Peak demand, inventory correctness, and acceptable degradation ✓" [ref=e165] [cursor=pointer]:
                    - generic [ref=e166]: A
                    - paragraph [ref=e167]: Peak demand, inventory correctness, and acceptable degradation
                    - generic [ref=e168]: ✓
                  - button "B Which cloud logo the interviewer prefers" [ref=e169] [cursor=pointer]:
                    - generic [ref=e170]: B
                    - paragraph [ref=e171]: Which cloud logo the interviewer prefers
                  - button "C The names of every future microservice" [ref=e172] [cursor=pointer]:
                    - generic [ref=e173]: C
                    - paragraph [ref=e174]: The names of every future microservice
                - generic [ref=e175]:
                  - strong [ref=e176]: Why?
                  - paragraph [ref=e177]: Requirements and constraints determine the architecture. Technology names are downstream decisions.
              - generic [ref=e178]:
                - generic [ref=e179]:
                  - generic [ref=e180]: "02"
                  - generic [ref=e181]:
                    - text: Single answer
                    - heading "Only 100,000 tickets exist, but 10 million buyers may click at once. Which design protects correctness and capacity?" [level=2] [ref=e182]
                  - generic [ref=e183]: ×
                - generic [ref=e184]:
                  - button "A Add more frontend animations" [ref=e185] [cursor=pointer]:
                    - generic [ref=e186]: A
                    - paragraph [ref=e187]: Add more frontend animations
                  - button "B Use admission control plus transactional inventory holds ✓" [ref=e188] [cursor=pointer]:
                    - generic [ref=e189]: B
                    - paragraph [ref=e190]: Use admission control plus transactional inventory holds
                    - generic [ref=e191]: ✓
                  - button "C Cache successful purchases for one day" [ref=e192] [cursor=pointer]:
                    - generic [ref=e193]: C
                    - paragraph [ref=e194]: Cache successful purchases for one day
                - generic [ref=e195]:
                  - strong [ref=e196]: Why?
                  - paragraph [ref=e197]: Admission control limits work entering the critical path; transactional holds prevent overselling.
              - generic [ref=e198]:
                - generic [ref=e199]:
                  - generic [ref=e200]: "03"
                  - generic [ref=e201]:
                    - text: Single answer
                    - heading "Which operations belong off the synchronous ticket-purchase path?" [level=2] [ref=e202]
                  - generic [ref=e203]: ×
                - generic [ref=e204]:
                  - button "A Inventory reservation and payment authorization" [ref=e205] [cursor=pointer]:
                    - generic [ref=e206]: A
                    - paragraph [ref=e207]: Inventory reservation and payment authorization
                  - button "B Email receipt and analytics event ✓" [ref=e208] [cursor=pointer]:
                    - generic [ref=e209]: B
                    - paragraph [ref=e210]: Email receipt and analytics event
                    - generic [ref=e211]: ✓
                  - button "C Idempotency validation and order commit" [ref=e212] [cursor=pointer]:
                    - generic [ref=e213]: C
                    - paragraph [ref=e214]: Idempotency validation and order commit
                - generic [ref=e215]:
                  - strong [ref=e216]: Why?
                  - paragraph [ref=e217]: Email and analytics can run from durable events; reservation, payment decision, and order durability determine the user result.
              - generic [ref=e218]:
                - generic [ref=e219]:
                  - generic [ref=e220]: "04"
                  - generic [ref=e221]:
                    - text: Single answer
                    - heading "The system needs 50 instances normally across three zones and must survive one zone loss. What is the safer capacity plan?" [level=2] [ref=e222]
                  - generic [ref=e223]: ✓
                - generic [ref=e224]:
                  - button "A About 75 instances, 25 per zone ✓" [ref=e225] [cursor=pointer]:
                    - generic [ref=e226]: A
                    - paragraph [ref=e227]: About 75 instances, 25 per zone
                    - generic [ref=e228]: ✓
                  - button "B Exactly 50 instances, evenly split" [ref=e229] [cursor=pointer]:
                    - generic [ref=e230]: B
                    - paragraph [ref=e231]: Exactly 50 instances, evenly split
                  - button "C One instance with a larger disk" [ref=e232] [cursor=pointer]:
                    - generic [ref=e233]: C
                    - paragraph [ref=e234]: One instance with a larger disk
                - generic [ref=e235]:
                  - strong [ref=e236]: Why?
                  - paragraph [ref=e237]: With 75 total, the two surviving zones retain 50 instances of capacity. Fifty total would leave only about 33.
              - generic [ref=e238]:
                - generic [ref=e239]:
                  - generic [ref=e240]: "05"
                  - generic [ref=e241]:
                    - text: Select two answers
                    - heading "Select the two signals of a strong system-design interview answer." [level=2] [ref=e242]
                  - generic [ref=e243]: ×
                - generic [ref=e244]:
                  - button "✓ It states scale assumptions before choosing components. ✓" [ref=e245] [cursor=pointer]:
                    - generic [ref=e246]: ✓
                    - paragraph [ref=e247]: It states scale assumptions before choosing components.
                    - generic [ref=e248]: ✓
                  - button "It explains overload and failure behavior. ✓" [ref=e249] [cursor=pointer]:
                    - paragraph [ref=e251]: It explains overload and failure behavior.
                    - generic [ref=e252]: ✓
                  - button "It uses the maximum possible number of technologies." [ref=e253] [cursor=pointer]:
                    - paragraph [ref=e255]: It uses the maximum possible number of technologies.
                  - button "It avoids discussing trade-offs." [ref=e256] [cursor=pointer]:
                    - paragraph [ref=e258]: It avoids discussing trade-offs.
                - generic [ref=e259]:
                  - strong [ref=e260]: Why?
                  - paragraph [ref=e261]: A strong answer connects assumptions to decisions and covers failure. More technology without justification weakens the design.
              - generic [ref=e262]:
                - generic [ref=e263]:
                  - generic [ref=e264]: "06"
                  - generic [ref=e265]:
                    - text: Single answer
                    - heading "What is the central idea of What is system design??" [level=2] [ref=e266]
                  - generic [ref=e267]: ×
                - generic [ref=e268]:
                  - button "A Choose the newest tool before measuring the problem." [ref=e269] [cursor=pointer]:
                    - generic [ref=e270]: A
                    - paragraph [ref=e271]: Choose the newest tool before measuring the problem.
                  - button "B Put every responsibility in one server and remove monitoring." [ref=e272] [cursor=pointer]:
                    - generic [ref=e273]: B
                    - paragraph [ref=e274]: Put every responsibility in one server and remove monitoring.
                  - button "C System design turns product goals and constraints into components, data flows, and explicit trade-offs. ✓" [ref=e275] [cursor=pointer]:
                    - generic [ref=e276]: C
                    - paragraph [ref=e277]: System design turns product goals and constraints into components, data flows, and explicit trade-offs.
                    - generic [ref=e278]: ✓
                  - button "D Assume failures and traffic spikes will not happen." [ref=e279] [cursor=pointer]:
                    - generic [ref=e280]: D
                    - paragraph [ref=e281]: Assume failures and traffic spikes will not happen.
                - generic [ref=e282]:
                  - strong [ref=e283]: Why?
                  - paragraph [ref=e284]: System design turns product goals and constraints into components, data flows, and explicit trade-offs.
              - generic [ref=e285]:
                - generic [ref=e286]:
                  - generic [ref=e287]: "07"
                  - generic [ref=e288]:
                    - text: Single answer
                    - heading "Which is the strongest first decision or habit here?" [level=2] [ref=e289]
                  - generic [ref=e290]: ×
                - generic [ref=e291]:
                  - button "A Put every responsibility in one server and remove monitoring." [ref=e292] [cursor=pointer]:
                    - generic [ref=e293]: A
                    - paragraph [ref=e294]: Put every responsibility in one server and remove monitoring.
                  - button "B Assume failures and traffic spikes will not happen." [ref=e295] [cursor=pointer]:
                    - generic [ref=e296]: B
                    - paragraph [ref=e297]: Assume failures and traffic spikes will not happen.
                  - button "C Design for peak load without ever measuring real traffic." [ref=e298] [cursor=pointer]:
                    - generic [ref=e299]: C
                    - paragraph [ref=e300]: Design for peak load without ever measuring real traffic.
                  - button "D Start with requirements and scale before choosing technology. ✓" [ref=e301] [cursor=pointer]:
                    - generic [ref=e302]: D
                    - paragraph [ref=e303]: Start with requirements and scale before choosing technology.
                    - generic [ref=e304]: ✓
                - generic [ref=e305]:
                  - strong [ref=e306]: Why?
                  - paragraph [ref=e307]: Start with requirements and scale before choosing technology.
              - generic [ref=e308]:
                - generic [ref=e309]:
                  - generic [ref=e310]: "08"
                  - generic [ref=e311]:
                    - text: Single answer
                    - heading "Which statement best captures the main trade-off?" [level=2] [ref=e312]
                  - generic [ref=e313]: ✓
                - generic [ref=e314]:
                  - button "A A design that optimizes one quality often spends cost or complexity elsewhere. ✓" [ref=e315] [cursor=pointer]:
                    - generic [ref=e316]: A
                    - paragraph [ref=e317]: A design that optimizes one quality often spends cost or complexity elsewhere.
                    - generic [ref=e318]: ✓
                  - button "B Assume failures and traffic spikes will not happen." [ref=e319] [cursor=pointer]:
                    - generic [ref=e320]: B
                    - paragraph [ref=e321]: Assume failures and traffic spikes will not happen.
                  - button "C Design for peak load without ever measuring real traffic." [ref=e322] [cursor=pointer]:
                    - generic [ref=e323]: C
                    - paragraph [ref=e324]: Design for peak load without ever measuring real traffic.
                  - button "D Add caches and queues everywhere before finding the bottleneck." [ref=e325] [cursor=pointer]:
                    - generic [ref=e326]: D
                    - paragraph [ref=e327]: Add caches and queues everywhere before finding the bottleneck.
                - generic [ref=e328]:
                  - strong [ref=e329]: Why?
                  - paragraph [ref=e330]: A design that optimizes one quality often spends cost or complexity elsewhere.
              - generic [ref=e331]:
                - generic [ref=e332]:
                  - generic [ref=e333]: "09"
                  - generic [ref=e334]:
                    - text: Single answer
                    - heading "Why is this useful — what does it give you?" [level=2] [ref=e335]
                  - generic [ref=e336]: ×
                - generic [ref=e337]:
                  - button "A Design for peak load without ever measuring real traffic." [ref=e338] [cursor=pointer]:
                    - generic [ref=e339]: A
                    - paragraph [ref=e340]: Design for peak load without ever measuring real traffic.
                  - button "B It creates a clear way to reason about what is system design? and its role in a larger architecture. ✓" [ref=e341] [cursor=pointer]:
                    - generic [ref=e342]: B
                    - paragraph [ref=e343]: It creates a clear way to reason about what is system design? and its role in a larger architecture.
                    - generic [ref=e344]: ✓
                  - button "C Add caches and queues everywhere before finding the bottleneck." [ref=e345] [cursor=pointer]:
                    - generic [ref=e346]: C
                    - paragraph [ref=e347]: Add caches and queues everywhere before finding the bottleneck.
                  - button "D Skip capacity estimates and hope the database keeps up." [ref=e348] [cursor=pointer]:
                    - generic [ref=e349]: D
                    - paragraph [ref=e350]: Skip capacity estimates and hope the database keeps up.
                - generic [ref=e351]:
                  - strong [ref=e352]: Why?
                  - paragraph [ref=e353]: It creates a clear way to reason about what is system design? and its role in a larger architecture.
              - generic [ref=e354]:
                - generic [ref=e355]:
                  - generic [ref=e356]: "10"
                  - generic [ref=e357]:
                    - text: Single answer
                    - heading "What should a strong interview answer include?" [level=2] [ref=e358]
                  - generic [ref=e359]: ×
                - generic [ref=e360]:
                  - button "A Add caches and queues everywhere before finding the bottleneck." [ref=e361] [cursor=pointer]:
                    - generic [ref=e362]: A
                    - paragraph [ref=e363]: Add caches and queues everywhere before finding the bottleneck.
                  - button "B Skip capacity estimates and hope the database keeps up." [ref=e364] [cursor=pointer]:
                    - generic [ref=e365]: B
                    - paragraph [ref=e366]: Skip capacity estimates and hope the database keeps up.
                  - button "C State assumptions first, draw the simplest what is system design? flow, then explain what changes at 10× scale. ✓" [ref=e367] [cursor=pointer]:
                    - generic [ref=e368]: C
                    - paragraph [ref=e369]: State assumptions first, draw the simplest what is system design? flow, then explain what changes at 10× scale.
                    - generic [ref=e370]: ✓
                  - button "D Couple every service tightly so one failure takes down all." [ref=e371] [cursor=pointer]:
                    - generic [ref=e372]: D
                    - paragraph [ref=e373]: Couple every service tightly so one failure takes down all.
                - generic [ref=e374]:
                  - strong [ref=e375]: Why?
                  - paragraph [ref=e376]: Interviewers value a clear mechanism, the key decision, and an explicit trade-off over memorized syntax.
              - generic [ref=e377]:
                - generic [ref=e378]:
                  - generic [ref=e379]: "11"
                  - generic [ref=e380]:
                    - text: Single answer
                    - heading "Which analogy is the best mental model?" [level=2] [ref=e381]
                  - generic [ref=e382]: ×
                - generic [ref=e383]:
                  - button "A Skip capacity estimates and hope the database keeps up." [ref=e384] [cursor=pointer]:
                    - generic [ref=e385]: A
                    - paragraph [ref=e386]: Skip capacity estimates and hope the database keeps up.
                  - button "B Couple every service tightly so one failure takes down all." [ref=e387] [cursor=pointer]:
                    - generic [ref=e388]: B
                    - paragraph [ref=e389]: Couple every service tightly so one failure takes down all.
                  - button "C Ship without a plan for retries, timeouts, or backpressure." [ref=e390] [cursor=pointer]:
                    - generic [ref=e391]: C
                    - paragraph [ref=e392]: Ship without a plan for retries, timeouts, or backpressure.
                  - 'button "D Think of planning a city: roads, utilities, and emergency routes must work together. ✓" [ref=e393] [cursor=pointer]':
                    - generic [ref=e394]: D
                    - paragraph [ref=e395]: "Think of planning a city: roads, utilities, and emergency routes must work together."
                    - generic [ref=e396]: ✓
                - generic [ref=e397]:
                  - strong [ref=e398]: Why?
                  - paragraph [ref=e399]: "Think of planning a city: roads, utilities, and emergency routes must work together."
              - generic [ref=e400]:
                - generic [ref=e401]:
                  - generic [ref=e402]: "12"
                  - generic [ref=e403]:
                    - text: Single answer
                    - heading "Which of these is a common mistake?" [level=2] [ref=e404]
                  - generic [ref=e405]: ✓
                - generic [ref=e406]:
                  - button "A Jumping directly to microservices without defining the problem. ✓" [ref=e407] [cursor=pointer]:
                    - generic [ref=e408]: A
                    - paragraph [ref=e409]: Jumping directly to microservices without defining the problem.
                    - generic [ref=e410]: ✓
                  - button "B System design turns product goals and constraints into components, data flows, and explicit trade-offs." [ref=e411] [cursor=pointer]:
                    - generic [ref=e412]: B
                    - paragraph [ref=e413]: System design turns product goals and constraints into components, data flows, and explicit trade-offs.
                  - button "C Start with requirements and scale before choosing technology." [ref=e414] [cursor=pointer]:
                    - generic [ref=e415]: C
                    - paragraph [ref=e416]: Start with requirements and scale before choosing technology.
                  - button "D A design that optimizes one quality often spends cost or complexity elsewhere." [ref=e417] [cursor=pointer]:
                    - generic [ref=e418]: D
                    - paragraph [ref=e419]: A design that optimizes one quality often spends cost or complexity elsewhere.
                - generic [ref=e420]:
                  - strong [ref=e421]: Why?
                  - paragraph [ref=e422]: "Avoid this: Jumping directly to microservices without defining the problem."
              - generic [ref=e423]:
                - generic [ref=e424]:
                  - generic [ref=e425]: "13"
                  - generic [ref=e426]:
                    - text: Single answer
                    - heading "Which practice should you avoid?" [level=2] [ref=e427]
                  - generic [ref=e428]: ×
                - generic [ref=e429]:
                  - button "A Start with requirements and scale before choosing technology." [ref=e430] [cursor=pointer]:
                    - generic [ref=e431]: A
                    - paragraph [ref=e432]: Start with requirements and scale before choosing technology.
                  - button "B Choose the newest tool before measuring the problem. ✓" [ref=e433] [cursor=pointer]:
                    - generic [ref=e434]: B
                    - paragraph [ref=e435]: Choose the newest tool before measuring the problem.
                    - generic [ref=e436]: ✓
                  - button "C It creates a clear way to reason about what is system design? and its role in a larger architecture." [ref=e437] [cursor=pointer]:
                    - generic [ref=e438]: C
                    - paragraph [ref=e439]: It creates a clear way to reason about what is system design? and its role in a larger architecture.
                  - 'button "D Think of planning a city: roads, utilities, and emergency routes must work together." [ref=e440] [cursor=pointer]':
                    - generic [ref=e441]: D
                    - paragraph [ref=e442]: "Think of planning a city: roads, utilities, and emergency routes must work together."
                - generic [ref=e443]:
                  - strong [ref=e444]: Why?
                  - paragraph [ref=e445]: "Avoid this: Choose the newest tool before measuring the problem."
              - generic [ref=e446]:
                - generic [ref=e447]:
                  - generic [ref=e448]: "14"
                  - generic [ref=e449]:
                    - text: Single answer
                    - heading "Which statement is an anti-pattern?" [level=2] [ref=e450]
                  - generic [ref=e451]: ×
                - generic [ref=e452]:
                  - button "A System design turns product goals and constraints into components, data flows, and explicit trade-offs." [ref=e453] [cursor=pointer]:
                    - generic [ref=e454]: A
                    - paragraph [ref=e455]: System design turns product goals and constraints into components, data flows, and explicit trade-offs.
                  - button "B A design that optimizes one quality often spends cost or complexity elsewhere." [ref=e456] [cursor=pointer]:
                    - generic [ref=e457]: B
                    - paragraph [ref=e458]: A design that optimizes one quality often spends cost or complexity elsewhere.
                  - button "C Design for peak load without ever measuring real traffic. ✓" [ref=e459] [cursor=pointer]:
                    - generic [ref=e460]: C
                    - paragraph [ref=e461]: Design for peak load without ever measuring real traffic.
                    - generic [ref=e462]: ✓
                  - button "D State assumptions first, draw the simplest what is system design? flow, then explain what changes at 10× scale." [ref=e463] [cursor=pointer]:
                    - generic [ref=e464]: D
                    - paragraph [ref=e465]: State assumptions first, draw the simplest what is system design? flow, then explain what changes at 10× scale.
                - generic [ref=e466]:
                  - strong [ref=e467]: Why?
                  - paragraph [ref=e468]: "Avoid this: Design for peak load without ever measuring real traffic."
              - generic [ref=e469]:
                - generic [ref=e470]:
                  - generic [ref=e471]: "15"
                  - generic [ref=e472]:
                    - text: Select two answers
                    - heading "Select the two statements that show sound reasoning." [level=2] [ref=e473]
                  - generic [ref=e474]: ×
                - generic [ref=e475]:
                  - button "✓ System design turns product goals and constraints into components, data flows, and explicit trade-offs. ✓" [ref=e476] [cursor=pointer]:
                    - generic [ref=e477]: ✓
                    - paragraph [ref=e478]: System design turns product goals and constraints into components, data flows, and explicit trade-offs.
                    - generic [ref=e479]: ✓
                  - button "Put every responsibility in one server and remove monitoring." [ref=e480] [cursor=pointer]:
                    - paragraph [ref=e482]: Put every responsibility in one server and remove monitoring.
                  - button "A design that optimizes one quality often spends cost or complexity elsewhere. ✓" [ref=e483] [cursor=pointer]:
                    - paragraph [ref=e485]: A design that optimizes one quality often spends cost or complexity elsewhere.
                    - generic [ref=e486]: ✓
                  - button "Add caches and queues everywhere before finding the bottleneck." [ref=e487] [cursor=pointer]:
                    - paragraph [ref=e489]: Add caches and queues everywhere before finding the bottleneck.
                - generic [ref=e490]:
                  - strong [ref=e491]: Why?
                  - paragraph [ref=e492]: A sound answer states both what it does and the cost it accepts.
        - contentinfo [ref=e493]:
          - generic [ref=e494]:
            - generic [ref=e495]:
              - generic [ref=e497]: J
              - generic [ref=e498]:
                - strong [ref=e499]: Jahid
                - generic [ref=e500]: Creator & Educator
                - paragraph [ref=e501]: Building free, bilingual, visual courses that make computer science click.
                - generic [ref=e502]:
                  - link "GitHub" [ref=e503] [cursor=pointer]:
                    - /url: https://github.com/your-username
                    - img [ref=e504]
                  - link "LinkedIn" [ref=e506] [cursor=pointer]:
                    - /url: https://www.linkedin.com/in/your-username
                    - img [ref=e507]
                  - link "Facebook" [ref=e509] [cursor=pointer]:
                    - /url: https://www.facebook.com/your-username
                    - img [ref=e510]
                  - link "WhatsApp" [ref=e512] [cursor=pointer]:
                    - /url: https://wa.me/8801XXXXXXXXX
                    - img [ref=e513]
                  - link "Email" [ref=e515] [cursor=pointer]:
                    - /url: mailto:4khoop@gmail.com
                    - img [ref=e516]
            - navigation "Footer navigation" [ref=e518]:
              - link "All courses" [ref=e519] [cursor=pointer]:
                - /url: /courses
              - link "Learn" [ref=e520] [cursor=pointer]:
                - /url: /learn
              - link "Privacy" [ref=e521] [cursor=pointer]:
                - /url: /privacy
          - generic [ref=e522]:
            - generic [ref=e523]:
              - strong [ref=e524]: CodePath
              - text: — Bilingual visual courses
            - generic [ref=e525]: © 2026 Jahid. Built with care.
    - complementary [ref=e526]:
      - button "Focus timer" [ref=e527] [cursor=pointer]: ◷
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