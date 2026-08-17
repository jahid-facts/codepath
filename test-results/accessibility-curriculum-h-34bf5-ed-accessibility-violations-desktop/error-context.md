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
+ Received  + 20

- Array []
+ Array [
+   Object {
+     "id": "color-contrast",
+     "impact": "serious",
+     "targets": Array [
+       ".top-nav-link:nth-child(6) > span[aria-hidden=\"true\"]",
+       ".docs-group.open:nth-child(1) > .docs-group-head > .docs-group-num",
+       ".docs-group.open:nth-child(1) > .docs-group-head > .docs-group-count",
+       ".docs-group.open:nth-child(1) > ul > li:nth-child(1) > .docs-link > .docs-link-dot",
+       ".docs-group.open:nth-child(1) > ul > li:nth-child(2) > .docs-link > .docs-link-dot",
+       ".docs-group.open:nth-child(1) > ul > li:nth-child(3) > .docs-link > .docs-link-dot",
+       ".docs-group.open:nth-child(1) > ul > li:nth-child(4) > .docs-link > .docs-link-dot",
+       ".docs-group.open:nth-child(1) > ul > li:nth-child(5) > .docs-link > .docs-link-dot",
+       ".docs-group.open:nth-child(1) > ul > li:nth-child(6) > .docs-link > .docs-link-dot",
+       ".docs-group.open:nth-child(2) > .docs-group-head > .docs-group-num",
+       ".docs-group.open:nth-child(2) > .docs-group-head > .docs-group-count",
+       ".docs-group.open:nth-child(2) > ul > li:nth-child(1) > .docs-link > .docs-link-dot",
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
    - generic [ref=e42]:
      - complementary "Curriculum" [ref=e43]:
        - generic [ref=e44]:
          - button "Full curriculum 0/46" [ref=e45] [cursor=pointer]:
            - generic [ref=e46]: ▤
            - generic [ref=e47]: Full curriculum
            - generic [ref=e48]: 0/46
          - generic [ref=e49]:
            - generic [ref=e50]:
              - button "01 Foundations 0/6" [expanded] [ref=e51] [cursor=pointer]:
                - generic [ref=e52]: "01"
                - generic [ref=e53]: Foundations
                - generic [ref=e54]: 0/6
                - generic [ref=e56]: ⌄
              - list [ref=e57]:
                - listitem [ref=e58]:
                  - button "01 What is system design?" [ref=e59] [cursor=pointer]:
                    - generic [ref=e60]: "01"
                    - generic [ref=e61]: What is system design?
                - listitem [ref=e62]:
                  - button "02 Client-server & request lifecycle" [ref=e63] [cursor=pointer]:
                    - generic [ref=e64]: "02"
                    - generic [ref=e65]: Client-server & request lifecycle
                - listitem [ref=e66]:
                  - button "03 Functional & non-functional requirements" [ref=e67] [cursor=pointer]:
                    - generic [ref=e68]: "03"
                    - generic [ref=e69]: Functional & non-functional requirements
                - listitem [ref=e70]:
                  - button "04 Back-of-the-envelope estimation" [ref=e71] [cursor=pointer]:
                    - generic [ref=e72]: "04"
                    - generic [ref=e73]: Back-of-the-envelope estimation
                - listitem [ref=e74]:
                  - button "05 Latency, throughput & concurrency" [ref=e75] [cursor=pointer]:
                    - generic [ref=e76]: "05"
                    - generic [ref=e77]: Latency, throughput & concurrency
                - listitem [ref=e78]:
                  - button "06 Scale, availability & fault tolerance" [ref=e79] [cursor=pointer]:
                    - generic [ref=e80]: "06"
                    - generic [ref=e81]: Scale, availability & fault tolerance
            - generic [ref=e82]:
              - button "02 Networking basics 0/6" [expanded] [ref=e83] [cursor=pointer]:
                - generic [ref=e84]: "02"
                - generic [ref=e85]: Networking basics
                - generic [ref=e86]: 0/6
                - generic [ref=e88]: ⌄
              - list [ref=e89]:
                - listitem [ref=e90]:
                  - button "07 Network layers (OSI & TCP/IP)" [ref=e91] [cursor=pointer]:
                    - generic [ref=e92]: "07"
                    - generic [ref=e93]: Network layers (OSI & TCP/IP)
                - listitem [ref=e94]:
                  - button "08 IP addresses & subnets" [ref=e95] [cursor=pointer]:
                    - generic [ref=e96]: "08"
                    - generic [ref=e97]: IP addresses & subnets
                - listitem [ref=e98]:
                  - button "09 TCP vs UDP" [ref=e99] [cursor=pointer]:
                    - generic [ref=e100]: "09"
                    - generic [ref=e101]: TCP vs UDP
                - listitem [ref=e102]:
                  - button "10 HTTP & HTTPS" [ref=e103] [cursor=pointer]:
                    - generic [ref=e104]: "10"
                    - generic [ref=e105]: HTTP & HTTPS
                - listitem [ref=e106]:
                  - button "11 TLS & the handshake" [ref=e107] [cursor=pointer]:
                    - generic [ref=e108]: "11"
                    - generic [ref=e109]: TLS & the handshake
                - listitem [ref=e110]:
                  - button "12 DNS resolution" [ref=e111] [cursor=pointer]:
                    - generic [ref=e112]: "12"
                    - generic [ref=e113]: DNS resolution
            - generic [ref=e114]:
              - button "03 Core components 0/8" [expanded] [ref=e115] [cursor=pointer]:
                - generic [ref=e116]: "03"
                - generic [ref=e117]: Core components
                - generic [ref=e118]: 0/8
                - generic [ref=e120]: ⌄
              - list [ref=e121]:
                - listitem [ref=e122]:
                  - button "13 DNS, proxies & reverse proxies" [ref=e123] [cursor=pointer]:
                    - generic [ref=e124]: "13"
                    - generic [ref=e125]: DNS, proxies & reverse proxies
                - listitem [ref=e126]:
                  - button "14 Load balancing & service discovery" [ref=e127] [cursor=pointer]:
                    - generic [ref=e128]: "14"
                    - generic [ref=e129]: Load balancing & service discovery
                - listitem [ref=e130]:
                  - button "15 CDN & edge delivery" [ref=e131] [cursor=pointer]:
                    - generic [ref=e132]: "15"
                    - generic [ref=e133]: CDN & edge delivery
                - listitem [ref=e134]:
                  - button "16 REST, GraphQL, gRPC & WebSockets" [ref=e135] [cursor=pointer]:
                    - generic [ref=e136]: "16"
                    - generic [ref=e137]: REST, GraphQL, gRPC & WebSockets
                - listitem [ref=e138]:
                  - button "17 Caching strategies" [ref=e139] [cursor=pointer]:
                    - generic [ref=e140]: "17"
                    - generic [ref=e141]: Caching strategies
                - listitem [ref=e142]:
                  - button "18 SQL versus NoSQL" [ref=e143] [cursor=pointer]:
                    - generic [ref=e144]: "18"
                    - generic [ref=e145]: SQL versus NoSQL
                - listitem [ref=e146]:
                  - button "19 Data modeling & indexing" [ref=e147] [cursor=pointer]:
                    - generic [ref=e148]: "19"
                    - generic [ref=e149]: Data modeling & indexing
                - listitem [ref=e150]:
                  - button "20 Replication, partitioning & sharding" [ref=e151] [cursor=pointer]:
                    - generic [ref=e152]: "20"
                    - generic [ref=e153]: Replication, partitioning & sharding
            - generic [ref=e154]:
              - button "04 Distributed systems 0/8" [expanded] [ref=e155] [cursor=pointer]:
                - generic [ref=e156]: "04"
                - generic [ref=e157]: Distributed systems
                - generic [ref=e158]: 0/8
                - generic [ref=e160]: ⌄
              - list [ref=e161]:
                - listitem [ref=e162]:
                  - button "21 Queues, Pub/Sub & event streaming" [ref=e163] [cursor=pointer]:
                    - generic [ref=e164]: "21"
                    - generic [ref=e165]: Queues, Pub/Sub & event streaming
                - listitem [ref=e166]:
                  - button "22 CAP theorem & consistency models" [ref=e167] [cursor=pointer]:
                    - generic [ref=e168]: "22"
                    - generic [ref=e169]: CAP theorem & consistency models
                - listitem [ref=e170]:
                  - button "23 Quorums & eventual consistency" [ref=e171] [cursor=pointer]:
                    - generic [ref=e172]: "23"
                    - generic [ref=e173]: Quorums & eventual consistency
                - listitem [ref=e174]:
                  - button "24 Consistent hashing" [ref=e175] [cursor=pointer]:
                    - generic [ref=e176]: "24"
                    - generic [ref=e177]: Consistent hashing
                - listitem [ref=e178]:
                  - button "25 Leader election & coordination" [ref=e179] [cursor=pointer]:
                    - generic [ref=e180]: "25"
                    - generic [ref=e181]: Leader election & coordination
                - listitem [ref=e182]:
                  - button "26 Rate limiting & backpressure" [ref=e183] [cursor=pointer]:
                    - generic [ref=e184]: "26"
                    - generic [ref=e185]: Rate limiting & backpressure
                - listitem [ref=e186]:
                  - button "27 Idempotency, retries & deduplication" [ref=e187] [cursor=pointer]:
                    - generic [ref=e188]: "27"
                    - generic [ref=e189]: Idempotency, retries & deduplication
                - listitem [ref=e190]:
                  - button "28 Distributed transactions & Sagas" [ref=e191] [cursor=pointer]:
                    - generic [ref=e192]: "28"
                    - generic [ref=e193]: Distributed transactions & Sagas
            - generic [ref=e194]:
              - button "05 Production architecture 0/4" [expanded] [ref=e195] [cursor=pointer]:
                - generic [ref=e196]: "05"
                - generic [ref=e197]: Production architecture
                - generic [ref=e198]: 0/4
                - generic [ref=e200]: ⌄
              - list [ref=e201]:
                - listitem [ref=e202]:
                  - button "29 Timeouts, circuit breakers & degradation" [ref=e203] [cursor=pointer]:
                    - generic [ref=e204]: "29"
                    - generic [ref=e205]: Timeouts, circuit breakers & degradation
                - listitem [ref=e206]:
                  - button "30 Logs, metrics, traces & alerts" [ref=e207] [cursor=pointer]:
                    - generic [ref=e208]: "30"
                    - generic [ref=e209]: Logs, metrics, traces & alerts
                - listitem [ref=e210]:
                  - button "31 Authentication, authorization & security" [ref=e211] [cursor=pointer]:
                    - generic [ref=e212]: "31"
                    - generic [ref=e213]: Authentication, authorization & security
                - listitem [ref=e214]:
                  - button "32 Microservices & event-driven architecture" [ref=e215] [cursor=pointer]:
                    - generic [ref=e216]: "32"
                    - generic [ref=e217]: Microservices & event-driven architecture
            - generic [ref=e218]:
              - button "06 Practical systems 0/4" [expanded] [ref=e219] [cursor=pointer]:
                - generic [ref=e220]: "06"
                - generic [ref=e221]: Practical systems
                - generic [ref=e222]: 0/4
                - generic [ref=e224]: ⌄
              - list [ref=e225]:
                - listitem [ref=e226]:
                  - button "33 Design a URL shortener" [ref=e227] [cursor=pointer]:
                    - generic [ref=e228]: "33"
                    - generic [ref=e229]: Design a URL shortener
                - listitem [ref=e230]:
                  - button "34 Design chat & notifications" [ref=e231] [cursor=pointer]:
                    - generic [ref=e232]: "34"
                    - generic [ref=e233]: Design chat & notifications
                - listitem [ref=e234]:
                  - button "35 Design a social news feed" [ref=e235] [cursor=pointer]:
                    - generic [ref=e236]: "35"
                    - generic [ref=e237]: Design a social news feed
                - listitem [ref=e238]:
                  - button "36 Design storage, video & search" [ref=e239] [cursor=pointer]:
                    - generic [ref=e240]: "36"
                    - generic [ref=e241]: Design storage, video & search
            - generic [ref=e242]:
              - button "07 Architecture mastery 0/10" [expanded] [ref=e243] [cursor=pointer]:
                - generic [ref=e244]: "07"
                - generic [ref=e245]: Architecture mastery
                - generic [ref=e246]: 0/10
                - generic [ref=e248]: ⌄
              - list [ref=e249]:
                - listitem [ref=e250]:
                  - button "37 Distributed locks, leases & clocks" [ref=e251] [cursor=pointer]:
                    - generic [ref=e252]: "37"
                    - generic [ref=e253]: Distributed locks, leases & clocks
                - listitem [ref=e254]:
                  - button "38 Bloom filters & probabilistic structures" [ref=e255] [cursor=pointer]:
                    - generic [ref=e256]: "38"
                    - generic [ref=e257]: Bloom filters & probabilistic structures
                - listitem [ref=e258]:
                  - button "39 Design search & autocomplete" [ref=e259] [cursor=pointer]:
                    - generic [ref=e260]: "39"
                    - generic [ref=e261]: Design search & autocomplete
                - listitem [ref=e262]:
                  - button "40 Design cloud file storage & sync" [ref=e263] [cursor=pointer]:
                    - generic [ref=e264]: "40"
                    - generic [ref=e265]: Design cloud file storage & sync
                - listitem [ref=e266]:
                  - button "41 Design a video streaming platform" [ref=e267] [cursor=pointer]:
                    - generic [ref=e268]: "41"
                    - generic [ref=e269]: Design a video streaming platform
                - listitem [ref=e270]:
                  - button "42 Design a notification platform" [ref=e271] [cursor=pointer]:
                    - generic [ref=e272]: "42"
                    - generic [ref=e273]: Design a notification platform
                - listitem [ref=e274]:
                  - button "43 Design ride sharing & geospatial search" [ref=e275] [cursor=pointer]:
                    - generic [ref=e276]: "43"
                    - generic [ref=e277]: Design ride sharing & geospatial search
                - listitem [ref=e278]:
                  - button "44 Design payments & order workflows" [ref=e279] [cursor=pointer]:
                    - generic [ref=e280]: "44"
                    - generic [ref=e281]: Design payments & order workflows
                - listitem [ref=e282]:
                  - button "45 Multi-region architecture & disaster recovery" [ref=e283] [cursor=pointer]:
                    - generic [ref=e284]: "45"
                    - generic [ref=e285]: Multi-region architecture & disaster recovery
                - listitem [ref=e286]:
                  - button "46 Capacity planning, cost & sustainability" [ref=e287] [cursor=pointer]:
                    - generic [ref=e288]: "46"
                    - generic [ref=e289]: Capacity planning, cost & sustainability
          - generic [ref=e290]:
            - strong [ref=e292]: 0%
            - generic [ref=e293]:
              - strong [ref=e294]: Your progress
              - generic [ref=e295]: 0 complete
      - generic [ref=e296]:
        - main [ref=e297]:
          - generic [ref=e299]:
            - generic [ref=e300]: 46 complete lessons
            - heading "System Design" [level=1] [ref=e301]
            - paragraph [ref=e302]: Design scalable, reliable architectures from first principles to interview-ready case studies.
          - generic [ref=e303]:
            - generic [ref=e304]:
              - generic [ref=e305]:
                - generic [ref=e306]: "01"
                - generic [ref=e307]:
                  - heading "Foundations" [level=2] [ref=e308]
                  - paragraph [ref=e309]: Learn the language and measurements behind every reliable design.
                - strong [ref=e310]: 0/6
              - generic [ref=e311]:
                - button "01 What is system design? 12 min · Beginner" [ref=e312] [cursor=pointer]:
                  - generic [ref=e313]: "01"
                  - generic [ref=e314]:
                    - strong [ref=e315]: What is system design?
                    - generic [ref=e316]: ◷ 12 min · Beginner
                  - generic [ref=e318]: →
                - button "02 Client-server & request lifecycle 15 min · Beginner" [ref=e319] [cursor=pointer]:
                  - generic [ref=e320]: "02"
                  - generic [ref=e321]:
                    - strong [ref=e322]: Client-server & request lifecycle
                    - generic [ref=e323]: ◷ 15 min · Beginner
                  - generic [ref=e325]: →
                - button "03 Functional & non-functional requirements 14 min · Beginner" [ref=e326] [cursor=pointer]:
                  - generic [ref=e327]: "03"
                  - generic [ref=e328]:
                    - strong [ref=e329]: Functional & non-functional requirements
                    - generic [ref=e330]: ◷ 14 min · Beginner
                  - generic [ref=e332]: →
                - button "04 Back-of-the-envelope estimation 18 min · Beginner" [ref=e333] [cursor=pointer]:
                  - generic [ref=e334]: "04"
                  - generic [ref=e335]:
                    - strong [ref=e336]: Back-of-the-envelope estimation
                    - generic [ref=e337]: ◷ 18 min · Beginner
                  - generic [ref=e339]: →
                - button "05 Latency, throughput & concurrency 16 min · Beginner" [ref=e340] [cursor=pointer]:
                  - generic [ref=e341]: "05"
                  - generic [ref=e342]:
                    - strong [ref=e343]: Latency, throughput & concurrency
                    - generic [ref=e344]: ◷ 16 min · Beginner
                  - generic [ref=e346]: →
                - button "06 Scale, availability & fault tolerance 18 min · Intermediate" [ref=e347] [cursor=pointer]:
                  - generic [ref=e348]: "06"
                  - generic [ref=e349]:
                    - strong [ref=e350]: Scale, availability & fault tolerance
                    - generic [ref=e351]: ◷ 18 min · Intermediate
                  - generic [ref=e353]: →
            - generic [ref=e354]:
              - generic [ref=e355]:
                - generic [ref=e356]: "02"
                - generic [ref=e357]:
                  - heading "Networking basics" [level=2] [ref=e358]
                  - paragraph [ref=e359]: The internet fundamentals every system design depends on — layers, IP, TCP/UDP, HTTP, TLS, and DNS.
                - strong [ref=e360]: 0/6
              - generic [ref=e361]:
                - button "07 Network layers (OSI & TCP/IP) 14 min · Beginner" [ref=e362] [cursor=pointer]:
                  - generic [ref=e363]: "07"
                  - generic [ref=e364]:
                    - strong [ref=e365]: Network layers (OSI & TCP/IP)
                    - generic [ref=e366]: ◷ 14 min · Beginner
                  - generic [ref=e368]: →
                - button "08 IP addresses & subnets 15 min · Beginner" [ref=e369] [cursor=pointer]:
                  - generic [ref=e370]: "08"
                  - generic [ref=e371]:
                    - strong [ref=e372]: IP addresses & subnets
                    - generic [ref=e373]: ◷ 15 min · Beginner
                  - generic [ref=e375]: →
                - button "09 TCP vs UDP 16 min · Beginner" [ref=e376] [cursor=pointer]:
                  - generic [ref=e377]: "09"
                  - generic [ref=e378]:
                    - strong [ref=e379]: TCP vs UDP
                    - generic [ref=e380]: ◷ 16 min · Beginner
                  - generic [ref=e382]: →
                - button "10 HTTP & HTTPS 15 min · Beginner" [ref=e383] [cursor=pointer]:
                  - generic [ref=e384]: "10"
                  - generic [ref=e385]:
                    - strong [ref=e386]: HTTP & HTTPS
                    - generic [ref=e387]: ◷ 15 min · Beginner
                  - generic [ref=e389]: →
                - button "11 TLS & the handshake 16 min · Intermediate" [ref=e390] [cursor=pointer]:
                  - generic [ref=e391]: "11"
                  - generic [ref=e392]:
                    - strong [ref=e393]: TLS & the handshake
                    - generic [ref=e394]: ◷ 16 min · Intermediate
                  - generic [ref=e396]: →
                - button "12 DNS resolution 14 min · Beginner" [ref=e397] [cursor=pointer]:
                  - generic [ref=e398]: "12"
                  - generic [ref=e399]:
                    - strong [ref=e400]: DNS resolution
                    - generic [ref=e401]: ◷ 14 min · Beginner
                  - generic [ref=e403]: →
            - generic [ref=e404]:
              - generic [ref=e405]:
                - generic [ref=e406]: "03"
                - generic [ref=e407]:
                  - heading "Core components" [level=2] [ref=e408]
                  - paragraph [ref=e409]: Understand the building blocks used to serve, store, and move data.
                - strong [ref=e410]: 0/8
              - generic [ref=e411]:
                - button "13 DNS, proxies & reverse proxies 17 min · Beginner" [ref=e412] [cursor=pointer]:
                  - generic [ref=e413]: "13"
                  - generic [ref=e414]:
                    - strong [ref=e415]: DNS, proxies & reverse proxies
                    - generic [ref=e416]: ◷ 17 min · Beginner
                  - generic [ref=e418]: →
                - button "14 Load balancing & service discovery 18 min · Intermediate" [ref=e419] [cursor=pointer]:
                  - generic [ref=e420]: "14"
                  - generic [ref=e421]:
                    - strong [ref=e422]: Load balancing & service discovery
                    - generic [ref=e423]: ◷ 18 min · Intermediate
                  - generic [ref=e425]: →
                - button "15 CDN & edge delivery 15 min · Intermediate" [ref=e426] [cursor=pointer]:
                  - generic [ref=e427]: "15"
                  - generic [ref=e428]:
                    - strong [ref=e429]: CDN & edge delivery
                    - generic [ref=e430]: ◷ 15 min · Intermediate
                  - generic [ref=e432]: →
                - button "16 REST, GraphQL, gRPC & WebSockets 22 min · Intermediate" [ref=e433] [cursor=pointer]:
                  - generic [ref=e434]: "16"
                  - generic [ref=e435]:
                    - strong [ref=e436]: REST, GraphQL, gRPC & WebSockets
                    - generic [ref=e437]: ◷ 22 min · Intermediate
                  - generic [ref=e439]: →
                - button "17 Caching strategies 20 min · Intermediate" [ref=e440] [cursor=pointer]:
                  - generic [ref=e441]: "17"
                  - generic [ref=e442]:
                    - strong [ref=e443]: Caching strategies
                    - generic [ref=e444]: ◷ 20 min · Intermediate
                  - generic [ref=e446]: →
                - button "18 SQL versus NoSQL 20 min · Intermediate" [ref=e447] [cursor=pointer]:
                  - generic [ref=e448]: "18"
                  - generic [ref=e449]:
                    - strong [ref=e450]: SQL versus NoSQL
                    - generic [ref=e451]: ◷ 20 min · Intermediate
                  - generic [ref=e453]: →
                - button "19 Data modeling & indexing 22 min · Intermediate" [ref=e454] [cursor=pointer]:
                  - generic [ref=e455]: "19"
                  - generic [ref=e456]:
                    - strong [ref=e457]: Data modeling & indexing
                    - generic [ref=e458]: ◷ 22 min · Intermediate
                  - generic [ref=e460]: →
                - button "20 Replication, partitioning & sharding 24 min · Advanced" [ref=e461] [cursor=pointer]:
                  - generic [ref=e462]: "20"
                  - generic [ref=e463]:
                    - strong [ref=e464]: Replication, partitioning & sharding
                    - generic [ref=e465]: ◷ 24 min · Advanced
                  - generic [ref=e467]: →
            - generic [ref=e468]:
              - generic [ref=e469]:
                - generic [ref=e470]: "04"
                - generic [ref=e471]:
                  - heading "Distributed systems" [level=2] [ref=e472]
                  - paragraph [ref=e473]: Reason about coordination, consistency, and failure across machines.
                - strong [ref=e474]: 0/8
              - generic [ref=e475]:
                - button "21 Queues, Pub/Sub & event streaming 21 min · Intermediate" [ref=e476] [cursor=pointer]:
                  - generic [ref=e477]: "21"
                  - generic [ref=e478]:
                    - strong [ref=e479]: Queues, Pub/Sub & event streaming
                    - generic [ref=e480]: ◷ 21 min · Intermediate
                  - generic [ref=e482]: →
                - button "22 CAP theorem & consistency models 23 min · Advanced" [ref=e483] [cursor=pointer]:
                  - generic [ref=e484]: "22"
                  - generic [ref=e485]:
                    - strong [ref=e486]: CAP theorem & consistency models
                    - generic [ref=e487]: ◷ 23 min · Advanced
                  - generic [ref=e489]: →
                - button "23 Quorums & eventual consistency 20 min · Advanced" [ref=e490] [cursor=pointer]:
                  - generic [ref=e491]: "23"
                  - generic [ref=e492]:
                    - strong [ref=e493]: Quorums & eventual consistency
                    - generic [ref=e494]: ◷ 20 min · Advanced
                  - generic [ref=e496]: →
                - button "24 Consistent hashing 19 min · Advanced" [ref=e497] [cursor=pointer]:
                  - generic [ref=e498]: "24"
                  - generic [ref=e499]:
                    - strong [ref=e500]: Consistent hashing
                    - generic [ref=e501]: ◷ 19 min · Advanced
                  - generic [ref=e503]: →
                - button "25 Leader election & coordination 22 min · Advanced" [ref=e504] [cursor=pointer]:
                  - generic [ref=e505]: "25"
                  - generic [ref=e506]:
                    - strong [ref=e507]: Leader election & coordination
                    - generic [ref=e508]: ◷ 22 min · Advanced
                  - generic [ref=e510]: →
                - button "26 Rate limiting & backpressure 18 min · Intermediate" [ref=e511] [cursor=pointer]:
                  - generic [ref=e512]: "26"
                  - generic [ref=e513]:
                    - strong [ref=e514]: Rate limiting & backpressure
                    - generic [ref=e515]: ◷ 18 min · Intermediate
                  - generic [ref=e517]: →
                - button "27 Idempotency, retries & deduplication 20 min · Advanced" [ref=e518] [cursor=pointer]:
                  - generic [ref=e519]: "27"
                  - generic [ref=e520]:
                    - strong [ref=e521]: Idempotency, retries & deduplication
                    - generic [ref=e522]: ◷ 20 min · Advanced
                  - generic [ref=e524]: →
                - button "28 Distributed transactions & Sagas 25 min · Advanced" [ref=e525] [cursor=pointer]:
                  - generic [ref=e526]: "28"
                  - generic [ref=e527]:
                    - strong [ref=e528]: Distributed transactions & Sagas
                    - generic [ref=e529]: ◷ 25 min · Advanced
                  - generic [ref=e531]: →
            - generic [ref=e532]:
              - generic [ref=e533]:
                - generic [ref=e534]: "05"
                - generic [ref=e535]:
                  - heading "Production architecture" [level=2] [ref=e536]
                  - paragraph [ref=e537]: Make systems observable, secure, and resilient in the real world.
                - strong [ref=e538]: 0/4
              - generic [ref=e539]:
                - button "29 Timeouts, circuit breakers & degradation 22 min · Advanced" [ref=e540] [cursor=pointer]:
                  - generic [ref=e541]: "29"
                  - generic [ref=e542]:
                    - strong [ref=e543]: Timeouts, circuit breakers & degradation
                    - generic [ref=e544]: ◷ 22 min · Advanced
                  - generic [ref=e546]: →
                - button "30 Logs, metrics, traces & alerts 20 min · Intermediate" [ref=e547] [cursor=pointer]:
                  - generic [ref=e548]: "30"
                  - generic [ref=e549]:
                    - strong [ref=e550]: Logs, metrics, traces & alerts
                    - generic [ref=e551]: ◷ 20 min · Intermediate
                  - generic [ref=e553]: →
                - button "31 Authentication, authorization & security 24 min · Intermediate" [ref=e554] [cursor=pointer]:
                  - generic [ref=e555]: "31"
                  - generic [ref=e556]:
                    - strong [ref=e557]: Authentication, authorization & security
                    - generic [ref=e558]: ◷ 24 min · Intermediate
                  - generic [ref=e560]: →
                - button "32 Microservices & event-driven architecture 25 min · Advanced" [ref=e561] [cursor=pointer]:
                  - generic [ref=e562]: "32"
                  - generic [ref=e563]:
                    - strong [ref=e564]: Microservices & event-driven architecture
                    - generic [ref=e565]: ◷ 25 min · Advanced
                  - generic [ref=e567]: →
            - generic [ref=e568]:
              - generic [ref=e569]:
                - generic [ref=e570]: "06"
                - generic [ref=e571]:
                  - heading "Practical systems" [level=2] [ref=e572]
                  - paragraph [ref=e573]: Combine the pieces in interview-ready architecture case studies.
                - strong [ref=e574]: 0/4
              - generic [ref=e575]:
                - button "33 Design a URL shortener 30 min · Case study" [ref=e576] [cursor=pointer]:
                  - generic [ref=e577]: "33"
                  - generic [ref=e578]:
                    - strong [ref=e579]: Design a URL shortener
                    - generic [ref=e580]: ◷ 30 min · Case study
                  - generic [ref=e582]: →
                - button "34 Design chat & notifications 32 min · Case study" [ref=e583] [cursor=pointer]:
                  - generic [ref=e584]: "34"
                  - generic [ref=e585]:
                    - strong [ref=e586]: Design chat & notifications
                    - generic [ref=e587]: ◷ 32 min · Case study
                  - generic [ref=e589]: →
                - button "35 Design a social news feed 32 min · Case study" [ref=e590] [cursor=pointer]:
                  - generic [ref=e591]: "35"
                  - generic [ref=e592]:
                    - strong [ref=e593]: Design a social news feed
                    - generic [ref=e594]: ◷ 32 min · Case study
                  - generic [ref=e596]: →
                - button "36 Design storage, video & search 35 min · Case study" [ref=e597] [cursor=pointer]:
                  - generic [ref=e598]: "36"
                  - generic [ref=e599]:
                    - strong [ref=e600]: Design storage, video & search
                    - generic [ref=e601]: ◷ 35 min · Case study
                  - generic [ref=e603]: →
            - generic [ref=e604]:
              - generic [ref=e605]:
                - generic [ref=e606]: "07"
                - generic [ref=e607]:
                  - heading "Architecture mastery" [level=2] [ref=e608]
                  - paragraph [ref=e609]: Master specialized patterns and high-stakes production case studies.
                - strong [ref=e610]: 0/10
              - generic [ref=e611]:
                - button "37 Distributed locks, leases & clocks 24 min · Advanced" [ref=e612] [cursor=pointer]:
                  - generic [ref=e613]: "37"
                  - generic [ref=e614]:
                    - strong [ref=e615]: Distributed locks, leases & clocks
                    - generic [ref=e616]: ◷ 24 min · Advanced
                  - generic [ref=e618]: →
                - button "38 Bloom filters & probabilistic structures 20 min · Advanced" [ref=e619] [cursor=pointer]:
                  - generic [ref=e620]: "38"
                  - generic [ref=e621]:
                    - strong [ref=e622]: Bloom filters & probabilistic structures
                    - generic [ref=e623]: ◷ 20 min · Advanced
                  - generic [ref=e625]: →
                - button "39 Design search & autocomplete 30 min · Case study" [ref=e626] [cursor=pointer]:
                  - generic [ref=e627]: "39"
                  - generic [ref=e628]:
                    - strong [ref=e629]: Design search & autocomplete
                    - generic [ref=e630]: ◷ 30 min · Case study
                  - generic [ref=e632]: →
                - button "40 Design cloud file storage & sync 32 min · Case study" [ref=e633] [cursor=pointer]:
                  - generic [ref=e634]: "40"
                  - generic [ref=e635]:
                    - strong [ref=e636]: Design cloud file storage & sync
                    - generic [ref=e637]: ◷ 32 min · Case study
                  - generic [ref=e639]: →
                - button "41 Design a video streaming platform 34 min · Case study" [ref=e640] [cursor=pointer]:
                  - generic [ref=e641]: "41"
                  - generic [ref=e642]:
                    - strong [ref=e643]: Design a video streaming platform
                    - generic [ref=e644]: ◷ 34 min · Case study
                  - generic [ref=e646]: →
                - button "42 Design a notification platform 28 min · Case study" [ref=e647] [cursor=pointer]:
                  - generic [ref=e648]: "42"
                  - generic [ref=e649]:
                    - strong [ref=e650]: Design a notification platform
                    - generic [ref=e651]: ◷ 28 min · Case study
                  - generic [ref=e653]: →
                - button "43 Design ride sharing & geospatial search 35 min · Case study" [ref=e654] [cursor=pointer]:
                  - generic [ref=e655]: "43"
                  - generic [ref=e656]:
                    - strong [ref=e657]: Design ride sharing & geospatial search
                    - generic [ref=e658]: ◷ 35 min · Case study
                  - generic [ref=e660]: →
                - button "44 Design payments & order workflows 36 min · Case study" [ref=e661] [cursor=pointer]:
                  - generic [ref=e662]: "44"
                  - generic [ref=e663]:
                    - strong [ref=e664]: Design payments & order workflows
                    - generic [ref=e665]: ◷ 36 min · Case study
                  - generic [ref=e667]: →
                - button "45 Multi-region architecture & disaster recovery 30 min · Advanced" [ref=e668] [cursor=pointer]:
                  - generic [ref=e669]: "45"
                  - generic [ref=e670]:
                    - strong [ref=e671]: Multi-region architecture & disaster recovery
                    - generic [ref=e672]: ◷ 30 min · Advanced
                  - generic [ref=e674]: →
                - button "46 Capacity planning, cost & sustainability 24 min · Advanced" [ref=e675] [cursor=pointer]:
                  - generic [ref=e676]: "46"
                  - generic [ref=e677]:
                    - strong [ref=e678]: Capacity planning, cost & sustainability
                    - generic [ref=e679]: ◷ 24 min · Advanced
                  - generic [ref=e681]: →
        - contentinfo [ref=e682]:
          - generic [ref=e683]:
            - generic [ref=e684]:
              - generic [ref=e686]: J
              - generic [ref=e687]:
                - strong [ref=e688]: Jahid
                - generic [ref=e689]: Creator & Educator
                - paragraph [ref=e690]: Building free, bilingual, visual courses that make computer science click.
                - generic [ref=e691]:
                  - link "GitHub" [ref=e692] [cursor=pointer]:
                    - /url: https://github.com/your-username
                    - img [ref=e693]
                  - link "LinkedIn" [ref=e695] [cursor=pointer]:
                    - /url: https://www.linkedin.com/in/your-username
                    - img [ref=e696]
                  - link "Facebook" [ref=e698] [cursor=pointer]:
                    - /url: https://www.facebook.com/your-username
                    - img [ref=e699]
                  - link "WhatsApp" [ref=e701] [cursor=pointer]:
                    - /url: https://wa.me/8801XXXXXXXXX
                    - img [ref=e702]
                  - link "Email" [ref=e704] [cursor=pointer]:
                    - /url: mailto:4khoop@gmail.com
                    - img [ref=e705]
            - navigation "Footer navigation" [ref=e707]:
              - link "All courses" [ref=e708] [cursor=pointer]:
                - /url: /courses
              - link "Learn" [ref=e709] [cursor=pointer]:
                - /url: /learn
              - link "Privacy" [ref=e710] [cursor=pointer]:
                - /url: /privacy
          - generic [ref=e711]:
            - generic [ref=e712]:
              - strong [ref=e713]: CodePath
              - text: — Bilingual visual courses
            - generic [ref=e714]: © 2026 Jahid. Built with care.
    - complementary [ref=e715]:
      - button "Focus timer" [ref=e716] [cursor=pointer]: ◷
  - alert [ref=e717]
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