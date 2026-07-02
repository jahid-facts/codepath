# System Design Learning App — Product and Engineering Plan

## Product goal

Build a beginner-friendly, bilingual learning experience that takes a learner from the first principles of system design to practical interview designs. The application must make abstract architecture visible, let learners practise decisions, assess understanding after every topic, and preserve progress without requiring an account.

## Success criteria

- Forty complete topics are available in Bangla and English.
- Every topic contains objectives, an analogy, explanation, visual flow, trade-offs, mistakes, interview guidance, glossary, recap, and a five-question exam.
- A learner can switch language instantly and the preference survives reloads.
- Exam answers stay hidden until every question is answered and the exam is submitted.
- Scores, attempts, completion, bookmarks, recent lessons, labs, and simulator settings survive reloads.
- Guided labs and an educational capacity simulator turn reading into active practice.
- The core experience is usable with a keyboard and on small mobile screens.

## Audience and learning model

The primary audience is a developer who is new to system design and wants to become interview-ready. All lessons remain open; prerequisites guide rather than gate. The learning loop is: understand a concept, inspect a visual flow, connect it to a practical example, complete an exam, review explanations, and revisit weak areas.

## Curriculum

### Module 1 — Foundations

1. What is system design?
2. Client-server and request lifecycle
3. Functional and non-functional requirements
4. Back-of-the-envelope estimation
5. Latency, throughput, and concurrency
6. Scalability, availability, reliability, and fault tolerance

### Module 2 — Core components

7. DNS, proxies, and reverse proxies
8. Load balancing and service discovery
9. CDN and edge delivery
10. REST, GraphQL, gRPC, and WebSockets
11. Caching strategies
12. SQL versus NoSQL
13. Data modeling and indexing
14. Replication, partitioning, and sharding

### Module 3 — Distributed systems

15. Message queues, Pub/Sub, and event streaming
16. CAP theorem and consistency models
17. Quorums and eventual consistency
18. Consistent hashing
19. Leader election and coordination
20. Rate limiting and backpressure
21. Idempotency, retries, and deduplication
22. Distributed transactions and Saga patterns

### Module 4 — Production architecture

23. Timeouts, circuit breakers, and graceful degradation
24. Logging, metrics, tracing, and alerting
25. Authentication, authorization, and security
26. Microservices and event-driven architecture

### Module 5 — Practical systems

27. Design a URL shortener
28. Design a chat and notification system
29. Design a social news feed
30. Design file storage, video streaming, and search autocomplete

### Module 6 — Architecture mastery

31. Distributed locks, leases, and logical clocks
32. Bloom filters and probabilistic data structures
33. Design search and autocomplete
34. Design cloud file storage and synchronization
35. Design a video streaming platform
36. Design a multi-channel notification platform
37. Design ride sharing and geospatial search
38. Design payments and order workflows
39. Multi-region architecture and disaster recovery
40. Capacity planning, cost, and sustainability

## Screen requirements

### Dashboard

Show overall progress, completed lessons, best average score, module progress, a continue-learning action, recent lessons, bookmarks, the recommended path, lab entry points, and simulator access.

### Lesson

Show prerequisites, objectives, a simple analogy, the core explanation, an animated SVG architecture flow, a request walkthrough, practical use, advantages, trade-offs, common mistakes, an interview note, glossary, recap, bookmark/completion controls, previous/next navigation, and the topic exam entry point.

### Exam

Present five single- or multi-select questions. Require every question before submission. After submission show percentage, pass state, selected and correct answers, an explanation for each question, retry, best/latest scores, and navigation back to the lesson or onward. Record incorrect concepts as review suggestions.

### Guided labs

Provide interactive stages for requirements, scale, API, data, architecture, scaling, failures, and trade-offs. Learners choose a decision at each stage, receive contextual feedback, and compare the complete decision trail with an expert design. Initial scenarios cover URL shortening, realtime chat, and news feed fan-out.

### Architecture simulator

Inputs are requests per second, read percentage, payload size, cache hit rate, app replicas, database capacity, replication factor, and a component failure toggle. Outputs are app load, database load, bandwidth, approximate latency, health, failure impact, and recommended next action. Results are explicitly labelled as educational estimates.

## Content and state interfaces

- `LocalizedText`: `{ en: string, bn: string }`.
- `CourseModule`: identifier, localized title/description, accent, and topic identifiers.
- `Topic`: identifier, module, localized metadata and lesson fields, difficulty, duration, diagram kind, glossary, and exam.
- `ArchitectureDiagram`: diagram kind, localized accessible description, nodes, edges, and visual steps.
- `ExamQuestion`: identifier, type, localized prompt/options/explanation, and one or more correct option identifiers.
- `ExamAttempt`: topic, timestamp, score, total, selected answers, and incorrect concepts.
- `DesignLab`: scenario metadata and ordered decision stages with contextual feedback.
- `SimulatorScenario`: capacity inputs and deterministic derived results.
- `LearnerProgress`: schema version, language, completed topics, attempts, bookmarks, recents, lab decisions, and simulator inputs.

The browser store uses a versioned key. Reads validate shape and merge safe defaults; malformed or old data never prevents rendering. Browser-only reads happen after hydration.

## Visual and interaction system

Use a dark ink and warm ivory foundation with indigo, violet, cyan, mint, and amber accents. Typography uses a clean Latin/Bengali-compatible sans stack. Cards use restrained borders and shadows, diagrams use reusable accessible SVG primitives, and progress is reinforced with consistent color and iconography. Focus states, semantic headings, labels, reduced-motion behavior, and sufficient color contrast are required.

## Architecture diagrams

Reusable diagram presets cover request flow, load balancing, CDN, cache-aside, database replication/sharding, queue processing, URL shortening, chat, feed fan-out, file delivery, video processing, and search autocomplete. Each diagram includes bilingual labels, arrows, a legend, sequential highlighting, responsive scaling, and an equivalent text description.

## Delivery phases

1. Establish this specification and the data contracts.
2. Consolidate the repository on the Next.js App Router.
3. Implement the bilingual shell, dashboard, navigation, and course data.
4. Implement lessons and reusable diagrams.
5. Implement exam scoring, explanations, attempts, and browser persistence.
6. Implement guided labs and the architecture simulator.
7. Add responsive, accessibility, SEO, error, and storage-recovery polish.
8. Verify content integrity, interaction flows, and the production build.

## Testing and acceptance checklist

- Assert exactly 40 unique topic identifiers and five questions per topic.
- Assert every learner-facing localized value includes non-empty Bangla and English text.
- Test scoring for single- and multi-select questions, unanswered validation, retries, and best-score selection.
- Test progress serialization, corrupted-state recovery, completion, bookmarks, recents, and language persistence.
- Test deterministic simulator capacity, latency, bottleneck, and failure calculations.
- Exercise dashboard → lesson → exam → result → retry, a complete lab, simulator controls, and reload recovery.
- Confirm diagram descriptions, keyboard focus, reduced motion, mobile layouts, metadata, and a successful production build.

## MVP boundaries and future expansion

The MVP has no authentication, backend database, payments, certificates, community, or content administration. A future backend can replace the storage adapter without changing topic or assessment contracts, adding accounts, cloud synchronization, authored content management, analytics, certificates, and team learning while retaining the offline-first browser experience.

## Professional learning expansion

The implemented return-user experience adds shareable hash deep links with browser history, global Bangla/English search (`Ctrl/Cmd + K` or `/`), autosaved lesson notes, daily challenges, XP and levels, activity streaks, milestone achievements, active-recall flashcards, and a weak-topic review queue derived from exam attempts. A local learner panel provides privacy messaging plus JSON backup, restore, and reset controls. Production hardening includes safe storage failure behavior, a web app manifest, loading/error/not-found states, compressed output, hidden framework headers, and baseline security response headers.

The expanded engagement layer adds eight guided labs (URL shortener, realtime chat, news feed, notifications, rate limiting, video streaming, search, and payments), in-lesson decision checkpoints, a 25-minute focus timer, surprise-topic discovery, reading progress, and perfect-score celebration. Course totals are data-driven so curriculum additions automatically update navigation, dashboards, achievements, and progress percentages.

The June 2026 learning-quality release adds first-run goal and experience onboarding, a three-question diagnostic, personalized starting-topic and pace recommendations, ten deeply authored bilingual flagship lessons, fifty unique scenario questions, and eight-stage versions of the URL shortener, chat, news feed, video, and payments labs. Learners can rerun onboarding from their local profile without losing progress.

Browser-level Playwright coverage now exercises onboarding, language persistence, lesson-to-exam completion, lab persistence, progress export, admin-login protection, and simulator layout at 390×844 and 320×568. The mobile onboarding body scrolls independently from its controls so diagnostic choices remain reachable on short screens.

## Private analytics administration

The production expansion includes an isolated `/admin` area protected by a signed HTTP-only session and server-configured credentials. A same-origin ingestion endpoint deduplicates browser sessions and records server-observed IP, browser, OS, inferred device, language, timezone, screen, entry path, referrer, and time in a retention-controlled SQLite database. The dashboard provides summary statistics, seven-day trends, technology and page breakdowns, masked/revealable IPs, recent-session filtering, pagination, automatic refresh, and CSV export. The implementation respects Do Not Track and requires a persistent writable deployment plus an appropriate public privacy notice.

The local learner profile also provides a visible analytics toggle and self-service deletion. Deletion removes rows for the browser’s visitor ID, clears local/session analytics identifiers, and disables future collection while leaving learning progress intact.

## Production improvement release

The seven-part production improvement is implemented and documented in `docs/PRODUCTION_IMPROVEMENT_RELEASE.md`. It adds real Next.js course routes, extracted client modules, automated WCAG/keyboard checks, mobile visual baselines, a future Laravel/PostgreSQL synchronization boundary, a protected SQLite-backed bilingual content editor, a public managed-lesson library, explicit analytics consent, and the public privacy page.
