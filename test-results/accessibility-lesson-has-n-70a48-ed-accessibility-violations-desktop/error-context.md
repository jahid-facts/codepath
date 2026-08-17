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
+ Received  + 20

- Array []
+ Array [
+   Object {
+     "id": "color-contrast",
+     "impact": "serious",
+     "targets": Array [
+       ".top-nav-link:nth-child(6) > span[aria-hidden=\"true\"]",
+       ".open > .docs-group-head > .docs-group-num",
+       ".open > .docs-group-head > .docs-group-count",
+       "li:nth-child(2) > .docs-link > .docs-link-dot",
+       "li:nth-child(3) > .docs-link > .docs-link-dot",
+       "li:nth-child(4) > .docs-link > .docs-link-dot",
+       "li:nth-child(5) > .docs-link > .docs-link-dot",
+       "li:nth-child(6) > .docs-link > .docs-link-dot",
+       ".docs-group:nth-child(2) > .docs-group-head > .docs-group-num",
+       ".docs-group:nth-child(2) > .docs-group-head > .docs-group-count",
+       ".docs-group:nth-child(3) > .docs-group-head > .docs-group-num",
+       ".docs-group:nth-child(3) > .docs-group-head > .docs-group-count",
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
      - button "CodePath" [ref=e8] [cursor=pointer]
      - button "S System design Switch course" [ref=e10] [cursor=pointer]:
        - generic [ref=e11]: S
        - generic [ref=e12]:
          - strong [ref=e13]: System design
          - generic [ref=e14]: Switch course
        - generic [ref=e15]: ⌄
      - navigation "Primary navigation" [ref=e16]:
        - button "Learn" [ref=e17] [cursor=pointer]:
          - generic [ref=e18]: ▤
          - generic [ref=e19]: Learn
        - button "Case studies" [ref=e20] [cursor=pointer]:
          - generic [ref=e21]: ◱
          - generic [ref=e22]: Case studies
        - button "Tools" [ref=e23] [cursor=pointer]:
          - generic [ref=e24]: ⌁
          - generic [ref=e25]: Tools
        - button "Interview" [ref=e26] [cursor=pointer]:
          - generic [ref=e27]: ◈
          - generic [ref=e28]: Interview
        - button "Cheatsheet" [ref=e29] [cursor=pointer]:
          - generic [ref=e30]: ☰
          - generic [ref=e31]: Cheatsheet
        - button "Glossary" [ref=e32] [cursor=pointer]:
          - generic [ref=e33]: 𝐀
          - generic [ref=e34]: Glossary
      - generic [ref=e35]:
        - button "Search lessons" [ref=e36] [cursor=pointer]:
          - generic [ref=e37]: ⌕
          - generic [ref=e38]: Search
          - generic [ref=e39]: ⌘K
        - button "Switch language" [ref=e40] [cursor=pointer]:
          - generic [ref=e41]: বাং
          - generic [ref=e42]: EN
        - button "Local learner profile" [ref=e43] [cursor=pointer]: LP
    - generic [ref=e44]:
      - complementary "Curriculum" [ref=e45]:
        - generic [ref=e46]:
          - button "Full curriculum 0/46" [ref=e47] [cursor=pointer]:
            - generic [ref=e48]: ▤
            - generic [ref=e49]: Full curriculum
            - generic [ref=e50]: 0/46
          - generic [ref=e51]:
            - generic [ref=e52]:
              - button "01 Foundations 0/6" [expanded] [ref=e53] [cursor=pointer]:
                - generic [ref=e54]: "01"
                - generic [ref=e55]: Foundations
                - generic [ref=e56]: 0/6
                - generic [ref=e58]: ⌄
              - list [ref=e59]:
                - listitem [ref=e60]:
                  - button "01 What is system design?" [ref=e61] [cursor=pointer]:
                    - generic [ref=e62]: "01"
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
            - strong [ref=e128]: 0%
            - generic [ref=e129]:
              - strong [ref=e130]: Your progress
              - generic [ref=e131]: 0 complete
      - generic [ref=e132]:
        - main [ref=e133]:
          - article [ref=e134]:
            - button "Back to learning path" [ref=e135] [cursor=pointer]:
              - generic [ref=e136]: ←
              - text: Back to learning path
            - generic [ref=e137]:
              - generic [ref=e138]:
                - generic [ref=e139]: 01 · Foundations
                - heading "What is system design?" [level=1] [ref=e140]
                - paragraph [ref=e141]: System design turns product goals and constraints into components, data flows, and explicit trade-offs.
                - generic [ref=e142]:
                  - generic [ref=e143]: ◷ 12 min
                  - generic [ref=e144]: Beginner
                  - generic [ref=e145]: Lesson 1/46
              - generic [ref=e146]:
                - button "Save" [ref=e147] [cursor=pointer]: ◆ Save
                - button "Mark complete" [ref=e148] [cursor=pointer]: ✓ Mark complete
            - generic [ref=e149]:
              - generic [ref=e150]:
                - generic [ref=e151]:
                  - generic [ref=e152]:
                    - generic [ref=e153]: "01"
                    - heading "Learning objectives" [level=2] [ref=e154]
                  - list [ref=e155]:
                    - listitem [ref=e156]:
                      - generic [ref=e157]: ✓
                      - text: Explain What is system design? in plain language.
                    - listitem [ref=e158]:
                      - generic [ref=e159]: ✓
                      - text: Recognize when this pattern is useful.
                    - listitem [ref=e160]:
                      - generic [ref=e161]: ✓
                      - text: Discuss its most important trade-off.
                - generic [ref=e162]:
                  - generic [ref=e163]:
                    - generic [ref=e164]: "02"
                    - heading "Start with an analogy" [level=2] [ref=e165]
                  - generic [ref=e166]:
                    - generic [ref=e167]: 💡
                    - paragraph [ref=e168]: "Think of planning a city: roads, utilities, and emergency routes must work together."
                - generic [ref=e169]:
                  - generic [ref=e170]:
                    - generic [ref=e171]: "03"
                    - heading "Core idea" [level=2] [ref=e172]
                  - paragraph [ref=e173]: System design turns product goals and constraints into components, data flows, and explicit trade-offs.
                  - generic [ref=e174]:
                    - strong [ref=e175]: Design principle
                    - paragraph [ref=e176]: Start with requirements and scale before choosing technology.
                - generic [ref=e177]:
                  - generic [ref=e178]:
                    - generic [ref=e179]: ◆
                    - heading "In depth" [level=2] [ref=e180]
                  - generic [ref=e181]:
                    - generic [ref=e182]:
                      - heading "What is system design?" [level=3] [ref=e183]
                      - paragraph [ref=e184]: System design is the process of deciding how the pieces of a software system — servers, databases, caches, queues, networks — fit together to meet a set of requirements at a given scale, reliability, and cost. Writing code that works on your laptop is one skill; designing a system that stays fast and available for millions of users is a different one, and that is what system design is about.
                      - paragraph [ref=e185]: "There is rarely a single \"correct\" design. Instead there are trade-offs: make reads faster and writes may get slower; add a cache and you gain speed but risk stale data; choose strong consistency and you may lose some availability. A good design is the one whose trade-offs best fit the specific requirements in front of you."
                    - generic [ref=e186]:
                      - heading "A repeatable framework" [level=3] [ref=e187]
                      - paragraph [ref=e188]: Whether in an interview or on the job, approach any system the same way. Do not jump to a database or a technology first — start with what the system must do and how much of it.
                      - list [ref=e189]:
                        - listitem [ref=e190]: Clarify requirements — what features (functional) and what scale, latency, and availability targets (non-functional).
                        - listitem [ref=e191]: Estimate the scale — rough numbers for users, requests per second, storage, and bandwidth. These numbers decide the design.
                        - listitem [ref=e192]: Draw the high-level design — client, load balancer, app servers, cache, database, and any queues or storage, and how a request flows through them.
                        - listitem [ref=e193]: Deep-dive the hard parts — the data model, the hottest read/write path, and the one or two components that will break first under load.
                        - listitem [ref=e194]: Find the bottlenecks and scale them — add caching, replication, sharding, or async processing where the numbers demand it.
                        - listitem [ref=e195]: State the trade-offs — say out loud what you optimized for and what you gave up.
                    - generic [ref=e196]:
                      - heading "The building blocks you compose" [level=3] [ref=e197]
                      - paragraph [ref=e198]: Almost every large system is built from the same handful of components. Learning what each one does — and its cost — lets you assemble a design quickly.
                      - table [ref=e200]:
                        - rowgroup [ref=e201]:
                          - row "Component Its job" [ref=e202]:
                            - columnheader "Component" [ref=e203]
                            - columnheader "Its job" [ref=e204]
                        - rowgroup [ref=e205]:
                          - row "Load balancer Spreads requests across many app servers and skips unhealthy ones." [ref=e206]:
                            - cell "Load balancer" [ref=e207]
                            - cell "Spreads requests across many app servers and skips unhealthy ones." [ref=e208]
                          - row "Cache Stores hot data in memory so reads avoid the slow database." [ref=e209]:
                            - cell "Cache" [ref=e210]
                            - cell "Stores hot data in memory so reads avoid the slow database." [ref=e211]
                          - row "Database The durable source of truth — SQL for relations, NoSQL for scale/flexibility." [ref=e212]:
                            - cell "Database" [ref=e213]
                            - cell "The durable source of truth — SQL for relations, NoSQL for scale/flexibility." [ref=e214]
                          - row "Queue Decouples producers from consumers so slow work happens asynchronously." [ref=e215]:
                            - cell "Queue" [ref=e216]
                            - cell "Decouples producers from consumers so slow work happens asynchronously." [ref=e217]
                          - row "CDN Serves static content from edges near users to cut latency." [ref=e218]:
                            - cell "CDN" [ref=e219]
                            - cell "Serves static content from edges near users to cut latency." [ref=e220]
                          - row "Blob store Cheap, durable storage for large files, images, and video." [ref=e221]:
                            - cell "Blob store" [ref=e222]
                            - cell "Cheap, durable storage for large files, images, and video." [ref=e223]
                    - generic [ref=e224]:
                      - heading "Non-functional requirements drive the design" [level=3] [ref=e225]
                      - paragraph [ref=e226]: Two apps with identical features can need completely different designs because of their non-functional requirements — scale, latency, availability, consistency, and cost. A note-taking app for 100 users and a chat app for 100 million users both "send messages," but almost nothing else about them is the same.
                      - paragraph [ref=e227]: "So always pin the numbers early: how many users, how many requests per second, how much data, how fast must a response be (p99), and how much downtime is acceptable. Those answers, not your favourite technology, decide the architecture."
                    - generic [ref=e228]:
                      - heading "Common mistakes" [level=3] [ref=e229]
                      - list [ref=e230]:
                        - listitem [ref=e231]: Jumping to a specific database or framework before understanding the requirements and scale.
                        - listitem [ref=e232]: Over-engineering for a scale you will never reach — a single server handles far more than beginners expect.
                        - listitem [ref=e233]: Designing for the average case and ignoring peak load and failures, which are what actually break systems.
                    - generic [ref=e234]:
                      - heading "Remember in one line" [level=3] [ref=e235]
                      - list [ref=e236]:
                        - listitem [ref=e237]: System design = fitting standard building blocks together to meet requirements at scale, reliably, and affordably.
                        - listitem [ref=e238]: Always go requirements → estimation → high-level design → deep dives → bottlenecks → trade-offs.
                        - listitem [ref=e239]: There is no perfect design, only trade-offs that fit the numbers in front of you.
                - generic [ref=e240]:
                  - generic [ref=e241]:
                    - generic [ref=e242]: "04"
                    - heading "Visual request flow" [level=2] [ref=e243]
                  - figure "4-step flow—the active component is highlighted." [ref=e244]:
                    - generic [ref=e245]:
                      - generic [ref=e246]: Live flow
                      - button "Next step" [ref=e248] [cursor=pointer]: Next step →
                    - group "What is system design? architecture Request flows from Client to DNS to API to Database." [ref=e249]:
                      - button "Client 01" [ref=e250] [cursor=pointer]:
                        - generic [ref=e253]: Client
                        - generic [ref=e254]: "01"
                      - button "DNS 02" [ref=e255] [cursor=pointer]:
                        - generic [ref=e258]: DNS
                        - generic [ref=e259]: "02"
                      - button "API 03" [ref=e260] [cursor=pointer]:
                        - generic [ref=e263]: API
                        - generic [ref=e264]: "03"
                      - button "Database 04" [ref=e265] [cursor=pointer]:
                        - generic [ref=e268]: Database
                        - generic [ref=e269]: "04"
                    - generic [ref=e270]: 4-step flow—the active component is highlighted.
                - generic [ref=e271]:
                  - generic [ref=e272]:
                    - generic [ref=e273]: "05"
                    - heading "Walk through the flow" [level=2] [ref=e274]
                  - list [ref=e275]:
                    - listitem [ref=e276]:
                      - generic [ref=e277]: "1"
                      - generic [ref=e278]: System design turns product goals and constraints into components, data flows, and explicit trade-offs.
                    - listitem [ref=e279]:
                      - generic [ref=e280]: "2"
                      - generic [ref=e281]: Start with requirements and scale before choosing technology.
                    - listitem [ref=e282]:
                      - generic [ref=e283]: "3"
                      - generic [ref=e284]: The system returns a result and measures latency, errors, and capacity.
                - generic [ref=e285]:
                  - generic [ref=e286]:
                    - generic [ref=e287]:
                      - generic [ref=e288]: ✦ Flagship deep dive
                      - heading "Flash-sale ticket platform" [level=2] [ref=e289]
                      - paragraph [ref=e290]: Ten million users may arrive for 100,000 tickets. The design must remain responsive, prevent overselling, and degrade safely when demand exceeds supply.
                    - complementary [ref=e291]:
                      - generic [ref=e292]: "✓ Peak: 50,000 requests/second"
                      - generic [ref=e293]: ✓ Inventory correctness is stronger than browsing freshness
                      - generic [ref=e294]: "✓ Target: 99.95% purchase availability"
                  - tablist "Deep-dive sections" [ref=e295]:
                    - tab "∑ Scale & math" [selected] [ref=e296] [cursor=pointer]:
                      - generic [ref=e297]: ∑
                      - text: Scale & math
                    - 'tab "{ } API & data" [ref=e298] [cursor=pointer]':
                      - generic [ref=e299]: "{ }"
                      - text: API & data
                    - tab "⚡ Failure lab" [ref=e300] [cursor=pointer]:
                      - generic [ref=e301]: ⚡
                      - text: Failure lab
                    - tab "◇ Decisions" [ref=e302] [cursor=pointer]:
                      - generic [ref=e303]: ◇
                      - text: Decisions
                  - tabpanel [ref=e304]:
                    - generic [ref=e305]:
                      - article [ref=e306]:
                        - generic [ref=e307]:
                          - generic [ref=e308]: "01"
                          - strong [ref=e309]: Peak capacity
                        - code [ref=e310]: 50,000 RPS ÷ 500 RPS/server
                        - generic [ref=e311]: 100 servers
                        - paragraph [ref=e312]: Add at least 30% tested headroom.
                      - article [ref=e313]:
                        - generic [ref=e314]:
                          - generic [ref=e315]: "02"
                          - strong [ref=e316]: Inventory pressure
                        - code [ref=e317]: 100,000 tickets ÷ 50,000 attempts/s
                        - generic [ref=e318]: 2 seconds
                        - paragraph [ref=e319]: Admission control is mandatory; scaling checkout alone is insufficient.
                      - article [ref=e320]:
                        - generic [ref=e321]:
                          - generic [ref=e322]: "03"
                          - strong [ref=e323]: Availability budget
                        - code [ref=e324]: 30 days × 0.05%
                        - generic [ref=e325]: 21.6 minutes
                        - paragraph [ref=e326]: Every dependency must fit inside the shared downtime budget.
                - generic [ref=e327]:
                  - generic [ref=e328]:
                    - generic [ref=e329]:
                      - generic [ref=e330]: ✦ Flagship deep dive
                      - heading "Flash-sale ticket platform" [level=2] [ref=e331]
                      - paragraph [ref=e332]: Ten million users may arrive for 100,000 tickets. The design must remain responsive, prevent overselling, and degrade safely when demand exceeds supply.
                    - complementary [ref=e333]:
                      - generic [ref=e334]: "✓ Peak: 50,000 requests/second"
                      - generic [ref=e335]: ✓ Inventory correctness is stronger than browsing freshness
                      - generic [ref=e336]: "✓ Target: 99.95% purchase availability"
                  - tablist "Deep-dive sections" [ref=e337]:
                    - tab "∑ Scale & math" [selected] [ref=e338] [cursor=pointer]:
                      - generic [ref=e339]: ∑
                      - text: Scale & math
                    - 'tab "{ } API & data" [ref=e340] [cursor=pointer]':
                      - generic [ref=e341]: "{ }"
                      - text: API & data
                    - tab "⚡ Failure lab" [ref=e342] [cursor=pointer]:
                      - generic [ref=e343]: ⚡
                      - text: Failure lab
                    - tab "◇ Decisions" [ref=e344] [cursor=pointer]:
                      - generic [ref=e345]: ◇
                      - text: Decisions
                  - tabpanel [ref=e346]:
                    - generic [ref=e347]:
                      - article [ref=e348]:
                        - generic [ref=e349]:
                          - generic [ref=e350]: "01"
                          - strong [ref=e351]: Peak capacity
                        - code [ref=e352]: 50,000 RPS ÷ 500 RPS/server
                        - generic [ref=e353]: 100 servers
                        - paragraph [ref=e354]: Add at least 30% tested headroom.
                      - article [ref=e355]:
                        - generic [ref=e356]:
                          - generic [ref=e357]: "02"
                          - strong [ref=e358]: Inventory pressure
                        - code [ref=e359]: 100,000 tickets ÷ 50,000 attempts/s
                        - generic [ref=e360]: 2 seconds
                        - paragraph [ref=e361]: Admission control is mandatory; scaling checkout alone is insufficient.
                      - article [ref=e362]:
                        - generic [ref=e363]:
                          - generic [ref=e364]: "03"
                          - strong [ref=e365]: Availability budget
                        - code [ref=e366]: 30 days × 0.05%
                        - generic [ref=e367]: 21.6 minutes
                        - paragraph [ref=e368]: Every dependency must fit inside the shared downtime budget.
                - generic [ref=e369]:
                  - generic [ref=e370]:
                    - generic [ref=e371]: "06"
                    - heading "Trade-offs" [level=2] [ref=e372]
                  - generic [ref=e373]:
                    - generic [ref=e374]:
                      - strong [ref=e375]: ＋ Why it helps
                      - paragraph [ref=e376]: It creates a clear way to reason about what is system design? and its role in a larger architecture.
                    - generic [ref=e377]:
                      - strong [ref=e378]: △ The cost
                      - paragraph [ref=e379]: A design that optimizes one quality often spends cost or complexity elsewhere.
                - generic [ref=e380]:
                  - generic [ref=e381]:
                    - generic [ref=e382]: ⚡
                    - generic [ref=e383]:
                      - text: 30-second checkpoint
                      - heading "Which design decision would you make?" [level=2] [ref=e384]
                  - generic [ref=e385]:
                    - button "A Jumping directly to microservices without defining the problem." [ref=e386] [cursor=pointer]:
                      - generic [ref=e387]: A
                      - text: Jumping directly to microservices without defining the problem.
                    - button "B Start with requirements and scale before choosing technology." [ref=e388] [cursor=pointer]:
                      - generic [ref=e389]: B
                      - text: Start with requirements and scale before choosing technology.
                  - text: "?"
                - generic [ref=e390]:
                  - generic [ref=e391]:
                    - generic [ref=e392]: "07"
                    - heading "Mistakes & interview tips" [level=2] [ref=e393]
                  - generic [ref=e394]:
                    - strong [ref=e395]: Avoid this
                    - paragraph [ref=e396]: Jumping directly to microservices without defining the problem.
                  - generic [ref=e397]:
                    - strong [ref=e398]: ✦ Interview note
                    - paragraph [ref=e399]: State assumptions first, draw the simplest what is system design? flow, then explain what changes at 10× scale.
                - generic [ref=e400]:
                  - generic [ref=e401]:
                    - generic [ref=e402]: "08"
                    - heading "Glossary & recap" [level=2] [ref=e403]
                  - generic [ref=e404]:
                    - generic [ref=e405]:
                      - strong [ref=e406]: Constraint
                      - paragraph [ref=e407]: A limit the design must respect.
                    - generic [ref=e408]:
                      - strong [ref=e409]: Trade-off
                      - paragraph [ref=e410]: Improving one quality by accepting a cost elsewhere.
                  - generic [ref=e411]:
                    - generic [ref=e412]: ✓
                    - generic [ref=e413]:
                      - strong [ref=e414]: Remember in one sentence
                      - paragraph [ref=e415]: System design turns product goals and constraints into components, data flows, and explicit trade-offs.
                - generic [ref=e416]:
                  - generic [ref=e417]:
                    - generic [ref=e418]: "09"
                    - heading "Personal notes" [level=2] [ref=e419]
                  - generic [ref=e420]:
                    - generic [ref=e421]:
                      - generic [ref=e422]: ✎
                      - generic [ref=e423]:
                        - strong [ref=e424]: What do you want to remember?
                        - generic [ref=e425]: Saved automatically in this browser as you type.
                      - generic [ref=e426]: 0/2000
                    - textbox "Write the concept, a question, or an interview answer in your own words…" [ref=e427]
                - generic [ref=e428]:
                  - generic [ref=e429]:
                    - generic [ref=e430]: Knowledge check
                    - heading "Ready for the 15-question exam?" [level=2] [ref=e431]
                    - paragraph [ref=e432]: Submit all answers, then review an explanation for each one.
                  - button "Start exam" [ref=e433] [cursor=pointer]:
                    - text: Start exam
                    - generic [ref=e434]: →
              - complementary [ref=e435]:
                - strong [ref=e436]: In this lesson
                - generic [ref=e437]:
                  - generic [ref=e438]: "01"
                  - text: Objectives
                - generic [ref=e439]:
                  - generic [ref=e440]: "02"
                  - text: Analogy
                - generic [ref=e441]:
                  - generic [ref=e442]: "03"
                  - text: Core idea
                - generic [ref=e443]:
                  - generic [ref=e444]: "04"
                  - text: Diagram
                - generic [ref=e445]:
                  - generic [ref=e446]: "05"
                  - text: Request flow
                - generic [ref=e447]:
                  - generic [ref=e448]: "06"
                  - text: Trade-offs
                - generic [ref=e449]:
                  - generic [ref=e450]: "07"
                  - text: Interview tips
                - generic [ref=e451]:
                  - generic [ref=e452]: "08"
                  - text: Recap
                - generic [ref=e453]:
                  - generic [ref=e454]: "09"
                  - text: Notes
            - generic [ref=e455]:
              - button "Previous lesson —" [disabled] [ref=e456]:
                - generic [ref=e457]: ←
                - generic [ref=e458]:
                  - generic [ref=e459]: Previous lesson
                  - text: —
              - button "Next lesson Client-server & request lifecycle" [ref=e460] [cursor=pointer]:
                - generic [ref=e461]:
                  - generic [ref=e462]: Next lesson
                  - text: Client-server & request lifecycle
                - generic [ref=e463]: →
        - contentinfo [ref=e464]:
          - generic [ref=e465]:
            - generic [ref=e466]:
              - generic [ref=e468]: J
              - generic [ref=e469]:
                - strong [ref=e470]: Jahid
                - generic [ref=e471]: Creator & Educator
                - paragraph [ref=e472]: Building free, bilingual, visual courses that make computer science click.
                - generic [ref=e473]:
                  - link "GitHub" [ref=e474] [cursor=pointer]:
                    - /url: https://github.com/your-username
                    - img [ref=e475]
                  - link "LinkedIn" [ref=e477] [cursor=pointer]:
                    - /url: https://www.linkedin.com/in/your-username
                    - img [ref=e478]
                  - link "Facebook" [ref=e480] [cursor=pointer]:
                    - /url: https://www.facebook.com/your-username
                    - img [ref=e481]
                  - link "WhatsApp" [ref=e483] [cursor=pointer]:
                    - /url: https://wa.me/8801XXXXXXXXX
                    - img [ref=e484]
                  - link "Email" [ref=e486] [cursor=pointer]:
                    - /url: mailto:4khoop@gmail.com
                    - img [ref=e487]
            - navigation "Footer navigation" [ref=e489]:
              - link "All courses" [ref=e490] [cursor=pointer]:
                - /url: /courses
              - link "Learn" [ref=e491] [cursor=pointer]:
                - /url: /learn
              - link "Privacy" [ref=e492] [cursor=pointer]:
                - /url: /privacy
          - generic [ref=e493]:
            - generic [ref=e494]:
              - strong [ref=e495]: CodePath
              - text: — Bilingual visual courses
            - generic [ref=e496]: © 2026 Jahid. Built with care.
    - complementary [ref=e497]:
      - button "Focus timer" [ref=e498] [cursor=pointer]: ◷
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