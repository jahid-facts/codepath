# SystemPath UX Improvement Roadmap

## Objective

Move SystemPath from a feature-rich MVP to a trustworthy learning product that helps a new learner choose the right path, practise authentic decisions, and retain knowledge. This roadmap prioritizes learning quality and clarity over adding more surface-level features.

Implementation status: the five recommended release areas below were completed on 30 June 2026. Follow-up architecture work remains intentionally separate.

## Delivery order

### 1. First-time onboarding and diagnostic

Status: Implemented.

- Replace the zero-progress “Continue learning” experience with a clear “Start course” state.
- Ask for learning goal, current experience, and preferred study pace.
- Include a short system-design diagnostic and recommend an appropriate starting topic.
- Allow skipping onboarding and changing preferences later.
- Preserve the normal return-user dashboard for existing learners.

Acceptance: a new learner receives a personalized recommendation; a returning learner does not see onboarding again unless they reset progress or choose to update their learning path.

### 2. Ten deeply authored flagship lessons

Status: Implemented.

Flagship topics: system-design fundamentals, requirements, estimation, load balancing, caching, SQL versus NoSQL, replication and sharding, messaging, CAP/consistency, and URL shortener design.

Each flagship lesson receives unique bilingual material for:

- Concrete scale assumptions and calculations
- API contracts or event contracts
- Data model/schema examples
- Failure scenarios and mitigations
- Decision tables and explicit trade-offs
- Interview walkthrough and production checklist

Acceptance: flagship lessons contain domain-specific material rather than shared generated sections.

### 3. Unique scenario-based flagship exams

Status: Implemented with fifty unique bilingual scenario questions.

- Replace templated questions and repeated distractors for the ten flagship lessons.
- Use realistic incidents, scale changes, API decisions, data choices, and failure diagnosis.
- Give every option a useful explanation, including why incorrect choices fail.
- Preserve retry, best score, review queue, and bilingual behavior.

Acceptance: fifty flagship questions are independently authored and cannot be answered by learning a repeated option pattern.

### 4. Richer practical design labs

Status: Implemented for URL shortener, chat, news feed, payments, and video, with at least eight stages per flagship lab.

Deepen URL shortener, chat, news feed, payments, and video labs with:

- Requirements and capacity estimates
- API and event contract decisions
- Data-model choices
- Scaling and failure injection
- Multiple defensible choices where trade-offs differ
- A final architecture summary and interview rubric

Acceptance: each flagship lab contains at least eight meaningful stages and explains both strong and context-dependent decisions.

### 5. Privacy controls and mobile end-to-end testing

Status: Implemented. Learners can opt out, delete their visitor analytics, and run the course without an account. Playwright covers the critical journeys on desktop, 390×844 mobile, and a 320×568 compact-phone check.

- Surface the existing analytics opt-out preference in the learner profile.
- Explain which data stays local and which technical visit metadata reaches the server.
- Provide a clear path for analytics-data deletion requests.
- Add Playwright journeys for onboarding, language switching, lesson/exam completion, labs, simulator mobile layout, progress backup, and admin login protection.
- Test at 390×844 and 320×568 in addition to desktop.

Acceptance: learners can control analytics collection, and critical desktop/mobile journeys have automated browser coverage.

## Follow-up architecture work

After the learning-quality release:

- Replace hash navigation with real Next.js lesson, exam, and lab routes.
- Split the large client component by domain and move curriculum into typed content modules or MDX.
- Add optional Laravel/PostgreSQL accounts for cross-device progress while preserving guest mode.
- Add automated accessibility checks, focus trapping, and visual-regression testing.

## Success measures

- Onboarding completion and first-lesson start rate
- Lesson-to-exam completion rate
- Exam retry improvement and weak-topic recovery
- Lab completion rate
- Seven-day returning learner rate
- Mobile completion rate versus desktop
- Analytics opt-out rate and privacy-support requests
