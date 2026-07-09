// Deep, bilingual (English / Bangla) teaching guides for production & practical
// system-design topics, keyed by topic id. Shape mirrors app/course-guides.js:
// each guide is an array of sections { h, blocks }, rendered by GuideBlock in
// app/LearningApp.js. Facts (definitions, analogies, trade-offs, mistakes) are
// drawn from the rawTopics rows in app/data.js.

const l = (en, bn) => ({ en, bn })

export default {
  // ── resilience · Timeouts, circuit breakers & degradation ─────────────────
  resilience: [
    {
      h: l('What is resilience?', 'Resilience কী?'),
      blocks: [
        { p: l('Resilience is a system’s ability to keep serving users even when the things it depends on fail, slow down, or misbehave. At any real scale a dependency is always in trouble somewhere — a database is overloaded, a payment API is timing out, a network link is flaky. Resilience is not about making failures impossible; it is about making sure one failing dependency cannot drag the whole system down with it.', 'Resilience হলো একটি সিস্টেমের সেই ক্ষমতা যা এর নির্ভরতা (dependency) ব্যর্থ, ধীর বা অস্বাভাবিক আচরণ করলেও ব্যবহারকারীকে পরিবেশন করতে থাকে। বাস্তব যেকোনো স্কেলে কোনো না কোনো dependency সবসময় সমস্যায় থাকে—একটি database ওভারলোডেড, একটি payment API টাইমআউট করছে, একটি নেটওয়ার্ক লিংক অস্থির। Resilience মানে ব্যর্থতা অসম্ভব করা নয়; মানে নিশ্চিত করা যেন একটি ব্যর্থ dependency পুরো সিস্টেমকে নিজের সঙ্গে টেনে না নামায়।') },
        { p: l('The core idea is captured in three moves: bounded waiting, failure isolation, and fallbacks. Bounded waiting means never wait forever for a slow call. Failure isolation means a fault in one component stays contained. Fallbacks mean having a degraded-but-useful answer ready when the perfect one is unavailable. Together these stop one dependency from exhausting the system’s threads, memory, and connections.', 'মূল ধারণাটি তিনটি পদক্ষেপে ধরা যায়: সীমিত অপেক্ষা (bounded waiting), ব্যর্থতা আলাদা রাখা (failure isolation), ও fallback। সীমিত অপেক্ষা মানে একটি ধীর কলের জন্য কখনো অসীম অপেক্ষা নয়। Failure isolation মানে একটি উপাদানের ত্রুটি সীমাবদ্ধ থাকে। Fallback মানে নিখুঁত উত্তর না মিললে একটি ডিগ্রেডেড-কিন্তু-কাজের উত্তর প্রস্তুত রাখা। একসঙ্গে এগুলো একটি dependency-কে সিস্টেমের thread, memory ও connection নিঃশেষ করতে বাধা দেয়।') },
        { note: l('Think of the electrical breaker in your house. When one appliance shorts out, the breaker trips and cuts just that circuit — before the fault overheats the wiring and burns down the whole building. A circuit breaker in software does exactly this: it isolates one faulty dependency so the rest of the system keeps running.', 'আপনার বাড়ির বৈদ্যুতিক breaker-এর কথা ভাবুন। একটি যন্ত্র শর্ট করলে breaker ট্রিপ করে শুধু সেই circuit বন্ধ করে দেয়—ত্রুটি তারকে গরম করে পুরো ভবন পুড়িয়ে ফেলার আগেই। সফটওয়্যারে একটি circuit breaker ঠিক এটাই করে: এটি একটি ত্রুটিপূর্ণ dependency-কে আলাদা করে যাতে সিস্টেমের বাকি অংশ চলতে থাকে।'), kind: 'tip' },
      ],
    },
    {
      h: l('How the patterns work together', 'প্যাটার্নগুলো কীভাবে একসঙ্গে কাজ করে'),
      blocks: [
        { p: l('Resilience is a small toolkit of patterns layered around every risky outbound call. Applied in order, each one catches a failure the previous one let through.', 'Resilience হলো প্রতিটি ঝুঁকিপূর্ণ বাইরের কলের চারপাশে সাজানো কয়েকটি প্যাটার্নের ছোট টুলকিট। ক্রমে প্রয়োগ করলে প্রতিটি প্যাটার্ন আগেরটির ছেড়ে দেওয়া একটি ব্যর্থতা ধরে।') },
        { steps: [
          l('Set a timeout (deadline). Derive it from a latency budget: if the user must get a page in 300 ms and you make two calls, each gets far less than 300 ms. Never leave a call to hang indefinitely — a hung call holds a thread hostage.', 'একটি timeout (deadline) ঠিক করুন। এটি একটি latency budget থেকে বের করুন: ব্যবহারকারীকে যদি ৩০০ ms-এ পেজ দিতে হয় ও আপনি দুটি কল করেন, প্রতিটি পায় ৩০০ ms-এর অনেক কম। কোনো কলকে কখনো অসীম ঝুলতে দেবেন না—ঝুলে থাকা কল একটি thread-কে জিম্মি করে রাখে।'),
          l('Retry — but carefully. Retry only idempotent operations, only a few times, and only with exponential backoff plus jitter so a thousand clients do not retry in lockstep and hammer a recovering server.', 'Retry করুন—কিন্তু সাবধানে। শুধু idempotent অপারেশন, শুধু কয়েকবার, ও শুধু exponential backoff সহ jitter দিয়ে retry করুন যাতে হাজারটি ক্লায়েন্ট একসঙ্গে retry করে একটি সেরে-ওঠা সার্ভারকে না পেটায়।'),
          l('Wrap the dependency in a circuit breaker. It counts recent failures; once they cross a threshold it "opens" and fails fast for a cooldown window instead of calling the dead dependency, then "half-opens" to test if it has recovered.', 'Dependency-কে একটি circuit breaker-এ মোড়ান। এটি সাম্প্রতিক ব্যর্থতা গোনে; একটি threshold পার হলে এটি "open" হয় ও মৃত dependency-কে কল না করে একটি cooldown সময় দ্রুত fail করে, তারপর সেরে উঠেছে কিনা পরীক্ষায় "half-open" হয়।'),
          l('Isolate with a bulkhead. Give each dependency its own limited pool of threads or connections, so a slow dependency can only exhaust its own pool — not the resources every other request needs.', 'একটি bulkhead দিয়ে আলাদা করুন। প্রতিটি dependency-কে thread বা connection-এর নিজস্ব সীমিত pool দিন, যাতে একটি ধীর dependency শুধু নিজের pool নিঃশেষ করতে পারে—অন্য প্রতিটি রিকোয়েস্টের দরকারি রিসোর্স নয়।'),
          l('Provide a fallback / graceful degradation. When the call still fails, return something useful: a cached value, a default, or a partial page — not a blank error screen.', 'একটি fallback / graceful degradation দিন। কল তবুও ব্যর্থ হলে কিছু কাজের ফেরত দিন: একটি cached মান, একটি default, বা আংশিক পেজ—ফাঁকা error স্ক্রিন নয়।'),
        ] },
        { code: `# Layered resilience around one risky call (pseudocode)

recommendations = breaker.call(function() {
    return withTimeout(200, function() {          # deadline: 200 ms
      return retry(times=2, backoff="exp+jitter", function() {
        return recsService.fetch(userId)           # the risky dependency
      })
    })
})
# breaker is OPEN or every attempt failed -> degrade, do not crash:
if recommendations == FAILED:
    recommendations = cache.get(userId) or POPULAR_DEFAULTS`, caption: l('The user still gets a page: a personalized list on the happy path, a cached or default list when the dependency is down.', 'ব্যবহারকারী তবুও একটি পেজ পায়: happy path-এ পার্সোনালাইজড তালিকা, dependency ডাউন থাকলে cached বা default তালিকা।') },
      ],
    },
    {
      h: l('The resilience patterns at a glance', 'Resilience প্যাটার্ন এক নজরে'),
      blocks: [
        { table: {
          head: [l('Pattern', 'প্যাটার্ন'), l('What it does', 'কী করে'), l('Protects against', 'কীসের থেকে রক্ষা করে')],
          rows: [
            [l('Timeout', 'Timeout'), l('Caps how long you wait for a response.', 'একটি রেসপন্সের জন্য কত অপেক্ষা তা সীমিত করে।'), l('Slow dependencies holding threads forever.', 'ধীর dependency চিরকাল thread ধরে রাখা।')],
            [l('Retry + backoff', 'Retry + backoff'), l('Re-attempts a failed idempotent call a few times.', 'একটি ব্যর্থ idempotent কল কয়েকবার আবার চেষ্টা করে।'), l('Brief, transient blips and packet loss.', 'সংক্ষিপ্ত, ক্ষণস্থায়ী গোলযোগ ও packet loss।')],
            [l('Circuit breaker', 'Circuit breaker'), l('Fails fast after repeated failures; probes to recover.', 'বারবার ব্যর্থতার পর দ্রুত fail করে; সেরে উঠতে probe করে।'), l('Hammering a dependency that is already down.', 'ইতিমধ্যে ডাউন dependency-কে পেটানো।')],
            [l('Bulkhead', 'Bulkhead'), l('Gives each dependency its own resource pool.', 'প্রতিটি dependency-কে নিজস্ব resource pool দেয়।'), l('One slow call draining shared threads.', 'একটি ধীর কল শেয়ার্ড thread শুষে নেওয়া।')],
            [l('Fallback', 'Fallback'), l('Returns a degraded but useful answer.', 'একটি ডিগ্রেডেড কিন্তু কাজের উত্তর ফেরত দেয়।'), l('Showing users a hard error page.', 'ব্যবহারকারীকে কড়া error পেজ দেখানো।')],
          ],
        } },
      ],
    },
    {
      h: l('When and where to use it', 'কখন ও কোথায় ব্যবহার করবেন'),
      blocks: [
        { p: l('Apply resilience patterns at every network boundary — any call that leaves your process to reach another service, a database, a cache, or a third-party API. These calls can fail or stall in ways an in-memory function call cannot, so each one needs at least a timeout and a fallback.', 'প্রতিটি নেটওয়ার্ক সীমায় resilience প্যাটার্ন প্রয়োগ করুন—যে কল আপনার process ছেড়ে আরেকটি service, database, cache বা third-party API-তে যায়। এই কলগুলো এমনভাবে ব্যর্থ বা আটকে যেতে পারে যা একটি in-memory function কল পারে না, তাই প্রতিটির অন্তত একটি timeout ও একটি fallback দরকার।') },
        { p: l('Match the effort to the blast radius. A payment call or a shared upstream that many features depend on deserves the full stack — timeout, retry, breaker, bulkhead, fallback. A rarely-used, non-critical call may only need a timeout and a sensible default. You do not need every pattern everywhere; you need bounded waiting everywhere.', 'ঝুঁকির পরিধির সঙ্গে পরিশ্রম মেলান। একটি payment কল বা অনেক ফিচার নির্ভর করে এমন একটি শেয়ার্ড upstream পুরো stack প্রাপ্য—timeout, retry, breaker, bulkhead, fallback। একটি কম-ব্যবহৃত, অ-গুরুত্বপূর্ণ কলে শুধু একটি timeout ও একটি বুদ্ধিমান default লাগতে পারে। সব জায়গায় প্রতিটি প্যাটার্ন দরকার নেই; সব জায়গায় bounded waiting দরকার।') },
      ],
    },
    {
      h: l('The trade-off: fast failure', 'ট্রেড-অফ: দ্রুত ব্যর্থতা'),
      blocks: [
        { p: l('Resilience patterns deliberately choose to fail fast, and that has a cost. An open circuit breaker protects your capacity by rejecting calls — but during the short window while a dependency is actually recovering, it may reject work that would have succeeded. You are trading a few rejected requests for the guarantee that a struggling dependency cannot take everything else down. That is almost always the right trade: a fast, clear failure is far better than a slow collapse that spreads.', 'Resilience প্যাটার্ন ইচ্ছাকৃতভাবে দ্রুত fail করা বেছে নেয়, আর তার একটি খরচ আছে। একটি open circuit breaker কল প্রত্যাখ্যান করে আপনার ক্ষমতা রক্ষা করে—কিন্তু একটি dependency আসলে সেরে ওঠার সংক্ষিপ্ত সময়টিতে এটি এমন কাজ প্রত্যাখ্যান করতে পারে যা সফল হতো। আপনি কয়েকটি প্রত্যাখ্যাত রিকোয়েস্টের বিনিময়ে এই গ্যারান্টি নিচ্ছেন যে একটি সংগ্রামরত dependency বাকি সব নামিয়ে দিতে পারবে না। এটি প্রায় সবসময়ই সঠিক ট্রেড: একটি দ্রুত, স্পষ্ট ব্যর্থতা একটি ধীর, ছড়িয়ে পড়া ধসের চেয়ে অনেক ভালো।') },
        { p: l('The best way to trust these patterns is to test them deliberately. Inject latency and errors (chaos testing) in staging, watch the breaker open, and confirm the fallback path actually renders. A fallback you have never exercised is a fallback you cannot rely on.', 'এই প্যাটার্নগুলোতে ভরসা করার সেরা উপায় হলো সেগুলো সচেতনভাবে পরীক্ষা করা। staging-এ latency ও error inject করুন (chaos testing), breaker খুলতে দেখুন, ও নিশ্চিত করুন fallback path আসলে render হয়। যে fallback কখনো চালিয়ে দেখেননি, সেটি এমন fallback যাতে ভরসা করা যায় না।') },
      ],
    },
    {
      h: l('Common mistakes', 'সাধারণ ভুল'),
      blocks: [
        { list: [
          l('Stacking independent retries at every service layer. If A retries B 3 times, B retries C 3 times, and C retries the database 3 times, one slow database sees 27× the load — retries amplify an outage into a "retry storm" that prevents recovery. Retry at one layer, not all of them.', 'প্রতিটি service স্তরে স্বাধীন retry স্তূপ করা। A যদি B-কে ৩ বার, B যদি C-কে ৩ বার, ও C যদি database-কে ৩ বার retry করে, একটি ধীর database ২৭× লোড দেখে—retry একটি outage-কে "retry storm"-এ বাড়িয়ে দেয় যা সেরে ওঠা আটকায়। এক স্তরে retry করুন, সব স্তরে নয়।'),
          l('No timeout, or a timeout longer than the user’s patience. A 30-second timeout on a page the user abandons in 3 seconds just holds resources for nothing.', 'কোনো timeout নেই, বা ব্যবহারকারীর ধৈর্যের চেয়ে লম্বা timeout। একটি পেজে ৩০-সেকেন্ড timeout যেখানে ব্যবহারকারী ৩ সেকেন্ডে চলে যায়—তা শুধু বৃথা রিসোর্স ধরে রাখে।'),
          l('Retrying non-idempotent operations (like "charge the card"), which can double-charge or duplicate side effects.', 'non-idempotent অপারেশন (যেমন "কার্ড চার্জ") retry করা, যা দুবার চার্জ বা side effect ডুপ্লিকেট করতে পারে।'),
          l('A fallback that quietly hides a real outage, so no alert fires and the problem festers for hours.', 'একটি fallback যা নীরবে আসল outage লুকায়, তাই কোনো alert বাজে না ও সমস্যা ঘণ্টার পর ঘণ্টা পচতে থাকে।'),
        ] },
      ],
    },
    {
      h: l('Remember in one line', 'এক লাইনে মনে রাখুন'),
      blocks: [
        { list: [
          l('Resilience = bounded waiting + failure isolation + fallbacks, so one bad dependency cannot exhaust the system.', 'Resilience = bounded waiting + failure isolation + fallback, যাতে একটি খারাপ dependency সিস্টেম নিঃশেষ করতে না পারে।'),
          l('Timeout every call, retry carefully with backoff, break the circuit, bulkhead the pools, and degrade gracefully.', 'প্রতিটি কলে timeout দিন, backoff দিয়ে সাবধানে retry করুন, circuit ভাঙুন, pool bulkhead করুন, ও graceful-ভাবে degrade করুন।'),
          l('Fast, clear failure beats a slow collapse — set deadlines from a latency budget and test degraded behavior on purpose.', 'দ্রুত, স্পষ্ট ব্যর্থতা ধীর ধসের চেয়ে ভালো—latency budget থেকে deadline দিন ও degraded আচরণ ইচ্ছা করে পরীক্ষা করুন।'),
        ] },
      ],
    },
  ],

  // ── observability · Logs, metrics, traces & alerts ────────────────────────
  observability: [
    {
      h: l('What is observability?', 'Observability কী?'),
      blocks: [
        { p: l('Observability is the property of a system that lets you understand what is happening inside it purely from the data it emits — its logs, metrics, and traces — without having to attach a debugger or guess. A system is "observable" when, faced with a brand-new problem you have never seen before, you can answer "what is broken and why?" from the telemetry alone.', 'Observability হলো একটি সিস্টেমের সেই বৈশিষ্ট্য যা আপনাকে শুধু এটির নির্গত ডেটা—log, metric ও trace—থেকে ভেতরে কী ঘটছে তা বুঝতে দেয়, কোনো debugger যুক্ত না করে বা অনুমান না করে। একটি সিস্টেম "observable" তখন, যখন আগে কখনো দেখেননি এমন একদম নতুন সমস্যার মুখে আপনি শুধু telemetry থেকে "কী ভেঙেছে ও কেন?" উত্তর দিতে পারেন।') },
        { p: l('It is more than monitoring. Monitoring watches for known, predefined problems ("is CPU above 80%?"). Observability is about answering unknown questions after the fact — connecting individual events, aggregate trends, and the exact path a single request took, so an operator can explain the system’s behavior rather than just notice that something is wrong.', 'এটি নিছক monitoring-এর চেয়ে বেশি। Monitoring পরিচিত, পূর্বনির্ধারিত সমস্যা খোঁজে ("CPU কি ৮০%-এর উপরে?")। Observability হলো ঘটনার পরে অজানা প্রশ্নের উত্তর দেওয়া—আলাদা event, সামগ্রিক প্রবণতা ও একটি রিকোয়েস্টের নেওয়া সঠিক পথ যুক্ত করা, যাতে একজন operator শুধু কিছু ভুল আছে তা লক্ষ না করে সিস্টেমের আচরণ ব্যাখ্যা করতে পারে।') },
        { note: l('Think of a good doctor. They do not diagnose from a single number. They combine your written history (logs), your vital signs trending over time (metrics), and a scan that follows one system through your body (a trace). Any one alone can mislead; together they explain what is really going on. Observability gives operators the same three views of a system.', 'একজন ভালো চিকিৎসকের কথা ভাবুন। তিনি একটিমাত্র সংখ্যা থেকে রোগ নির্ণয় করেন না। তিনি একত্র করেন আপনার লিখিত ইতিহাস (log), সময়ের সঙ্গে বদলানো vital sign (metric), ও শরীরের এক সিস্টেম অনুসরণকারী scan (একটি trace)। যেকোনো একটি একা বিভ্রান্ত করতে পারে; একসঙ্গে তারা আসলে কী ঘটছে তা ব্যাখ্যা করে। Observability operator-কে একটি সিস্টেমের একই তিনটি দৃশ্য দেয়।'), kind: 'tip' },
      ],
    },
    {
      h: l('The three pillars, and how to wire them', 'তিন স্তম্ভ, ও কীভাবে যুক্ত করবেন'),
      blocks: [
        { p: l('Observability rests on three kinds of telemetry, and the magic is not any one of them — it is being able to jump between them using shared identifiers.', 'Observability তিন ধরনের telemetry-র উপর দাঁড়ায়, আর জাদু কোনো একটিতে নয়—শেয়ার্ড identifier দিয়ে এদের মধ্যে লাফ দিতে পারায়।') },
        { steps: [
          l('Instrument your code to emit all three: structured logs (discrete events), metrics (numbers aggregated over time), and traces (the end-to-end path of one request across services).', 'তিনটিই নির্গত করতে কোড instrument করুন: structured log (আলাদা event), metric (সময়ে সমষ্টিকৃত সংখ্যা), ও trace (service-জুড়ে এক রিকোয়েস্টের এন্ড-টু-এন্ড পথ)।'),
          l('Generate a trace ID at the entry point (say, the load balancer or gateway) and propagate it through every downstream call in a header.', 'entry point-এ (ধরুন load balancer বা gateway) একটি trace ID তৈরি করুন ও প্রতিটি নিচের কলে একটি header-এ তা প্রবাহিত করুন।'),
          l('Stamp that same trace ID onto every log line and every span, so all telemetry for one request shares one key.', 'সেই একই trace ID প্রতিটি log লাইন ও প্রতিটি span-এ ছাপুন, যাতে এক রিকোয়েস্টের সব telemetry একটি key শেয়ার করে।'),
          l('Collect and store it centrally (an agent ships to a backend). Now a metric alert points to a time window, the trace shows which service was slow, and its logs show the exact error — a straight line from symptom to cause.', 'কেন্দ্রীয়ভাবে সংগ্রহ ও সংরক্ষণ করুন (একটি agent একটি backend-এ পাঠায়)। এখন একটি metric alert একটি সময়সীমায় নির্দেশ করে, trace দেখায় কোন service ধীর ছিল, ও তার log দেখায় সঠিক error—লক্ষণ থেকে কারণে একটি সরল রেখা।'),
        ] },
        { code: `# One structured log line, correlated by trace_id
{ "ts": "2026-07-09T10:12:03Z", "level": "error",
  "service": "checkout", "trace_id": "a1b2c3", "span_id": "d4e5",
  "msg": "payment call failed", "dep": "payments-api",
  "http_status": 503, "latency_ms": 1980, "user_id": "u_42" }

# Because trace_id "a1b2c3" is on the metric spike, the trace,
# AND this log, you pivot symptom -> cause in one query:
#   metric: p99 latency spiked at 10:12
#   trace : 1.98s spent inside payments-api
#   log   : payments-api returned 503`, caption: l('The shared trace_id is what turns three separate data sources into one story. Without it you are grepping blind.', 'শেয়ার্ড trace_id-ই তিনটি আলাদা ডেটা উৎসকে একটি গল্পে পরিণত করে। এটি ছাড়া আপনি অন্ধভাবে grep করছেন।') },
      ],
    },
    {
      h: l('Metrics vs logs vs traces', 'Metric বনাম log বনাম trace'),
      blocks: [
        { table: {
          head: [l('Pillar', 'স্তম্ভ'), l('What it is', 'কী'), l('Best for', 'কীসের জন্য সেরা'), l('Cost / cardinality', 'খরচ / cardinality')],
          rows: [
            [l('Metrics', 'Metric'), l('Numbers aggregated over time (counts, rates, percentiles).', 'সময়ে সমষ্টিকৃত সংখ্যা (গণনা, হার, percentile)।'), l('Dashboards, trends, alerting — "is it happening, and how much?"', 'dashboard, প্রবণতা, alert—"এটা কি ঘটছে, ও কতটা?"'), l('Cheap and compact; poor for high-cardinality detail.', 'সস্তা ও ছোট; উচ্চ-cardinality বিস্তারিততে দুর্বল।')],
            [l('Logs', 'Log'), l('Discrete, timestamped event records (ideally structured).', 'আলাদা, timestamp-যুক্ত event রেকর্ড (আদর্শত structured)।'), l('The exact detail of one event — "what precisely happened here?"', 'একটি event-এর সঠিক বিস্তারিত—"এখানে ঠিক কী ঘটল?"'), l('Verbose and costly at volume; searchable.', 'বেশি ও ভলিউমে ব্যয়বহুল; খোঁজযোগ্য।')],
            [l('Traces', 'Trace'), l('The end-to-end path of one request across all services.', 'সব service-জুড়ে এক রিকোয়েস্টের এন্ড-টু-এন্ড পথ।'), l('Latency and failures in distributed systems — "where did the time go?"', 'distributed সিস্টেমে latency ও ব্যর্থতা—"সময় কোথায় গেল?"'), l('Often sampled to control cost; shows dependencies.', 'খরচ নিয়ন্ত্রণে প্রায়ই sample করা; dependency দেখায়।')],
          ],
        } },
      ],
    },
    {
      h: l('When and where to use it', 'কখন ও কোথায় ব্যবহার করবেন'),
      blocks: [
        { p: l('You need observability the moment a system is more than one process or serves real users — but it is non-negotiable for distributed systems and microservices, where a single user action fans out across many services and no single machine holds the whole story. There, traces are the only practical way to see the full path, and correlated logs are the only way to find the one service that failed.', 'একটি সিস্টেম একটি process-এর বেশি হলে বা বাস্তব ব্যবহারকারী পরিবেশন করলেই observability দরকার—কিন্তু distributed সিস্টেম ও microservices-এ এটি আপসহীন, যেখানে একটি ব্যবহারকারী-ক্রিয়া অনেক service-এ ছড়ায় ও কোনো একটি মেশিন পুরো গল্প ধরে না। সেখানে trace-ই পুরো পথ দেখার একমাত্র বাস্তব উপায়, ও correlated log-ই ব্যর্থ হওয়া একটি service খুঁজে পাওয়ার একমাত্র উপায়।') },
        { p: l('Build it in from the start, not after the first outage. Instrumenting a running system under fire is painful; a request already carrying a trace ID and structured logs turns a two-hour incident into a two-minute query. The best signal to alert on is the user-visible symptom (error rate, latency, "SLO burn") — not raw internals.', 'শুরু থেকেই এটি বানান, প্রথম outage-এর পরে নয়। চাপের মধ্যে চলমান সিস্টেম instrument করা কষ্টকর; আগে থেকেই trace ID ও structured log বহনকারী একটি রিকোয়েস্ট দুই-ঘণ্টার incident-কে দুই-মিনিটের query-তে পরিণত করে। alert করার সেরা সংকেত হলো ব্যবহারকারী-দৃশ্যমান লক্ষণ (error rate, latency, "SLO burn")—কাঁচা internals নয়।') },
      ],
    },
    {
      h: l('Alert on symptoms, not noise', 'noise নয়, লক্ষণে alert করুন'),
      blocks: [
        { p: l('Telemetry is only useful if the right alert reaches a human at the right time. The failure mode here is alert fatigue: page someone for every transient error and they will start ignoring the pager — including the one alert that mattered. Instead, alert on symptoms users actually feel, and tie alerts to your SLO (service-level objective).', 'Telemetry তখনই কাজের যখন সঠিক alert সঠিক সময়ে একজন মানুষের কাছে পৌঁছায়। এখানে ব্যর্থতার ধরন হলো alert fatigue: প্রতিটি ক্ষণস্থায়ী error-এ কাউকে page করলে তারা pager উপেক্ষা করতে শুরু করবে—যে একটি alert গুরুত্বপূর্ণ ছিল তা সহ। বরং ব্যবহারকারী আসলে যে লক্ষণ অনুভব করে তাতে alert করুন, ও alert-কে আপনার SLO (service-level objective)-এর সঙ্গে বাঁধুন।') },
        { list: [
          l('Alert on the "golden signals": latency, traffic, errors, and saturation — the things users and capacity actually depend on.', '"golden signal"-এ alert করুন: latency, traffic, error ও saturation—যার উপর ব্যবহারকারী ও ক্ষমতা আসলে নির্ভর করে।'),
          l('Use SLO burn-rate alerts: page when you are consuming your error budget fast enough to breach the target, not on every single error.', 'SLO burn-rate alert ব্যবহার করুন: প্রতিটি error-এ নয়, লক্ষ্য ভাঙার মতো দ্রুত error budget খরচ করলে page করুন।'),
          l('Make every page actionable and link it to the trace and dashboard, so the on-call engineer starts investigating, not guessing.', 'প্রতিটি page কর্মযোগ্য করুন ও এটিকে trace ও dashboard-এর সঙ্গে লিংক করুন, যাতে on-call ইঞ্জিনিয়ার অনুমান নয়, তদন্ত শুরু করে।'),
        ] },
      ],
    },
    {
      h: l('Common mistakes', 'সাধারণ ভুল'),
      blocks: [
        { list: [
          l('Alerting on every error instead of user-visible symptoms and SLO burn — the fastest route to a team that ignores its alerts.', 'ব্যবহারকারী-দৃশ্যমান লক্ষণ ও SLO burn-এর বদলে প্রতিটি error-এ alert করা—alert উপেক্ষাকারী টিমের দ্রুততম পথ।'),
          l('Unstructured logs (free-text strings) you cannot query or aggregate. Log structured key-value JSON instead.', 'unstructured log (মুক্ত-টেক্সট string) যা query বা aggregate করা যায় না। বরং structured key-value JSON log করুন।'),
          l('No trace ID propagated across services, so you can never reconstruct one request’s full journey.', 'service-জুড়ে কোনো trace ID প্রবাহিত না করা, তাই এক রিকোয়েস্টের পূর্ণ যাত্রা কখনো পুনর্গঠন করতে পারেন না।'),
          l('Logging secrets or personal data (passwords, tokens, full card numbers) — a privacy and compliance breach waiting to happen.', 'secret বা ব্যক্তিগত ডেটা (password, token, পূর্ণ কার্ড নম্বর) log করা—ঘটতে যাওয়া একটি privacy ও compliance লঙ্ঘন।'),
        ] },
      ],
    },
    {
      h: l('Remember in one line', 'এক লাইনে মনে রাখুন'),
      blocks: [
        { list: [
          l('Observability = explaining a system’s behavior from its telemetry: metrics (trends), logs (events), traces (request paths).', 'Observability = telemetry থেকে সিস্টেমের আচরণ ব্যাখ্যা: metric (প্রবণতা), log (event), trace (রিকোয়েস্ট পথ)।'),
          l('Correlate all three with a shared trace ID so you can pivot from symptom to root cause in one hop.', 'তিনটিই একটি শেয়ার্ড trace ID দিয়ে correlate করুন যাতে এক লাফে লক্ষণ থেকে মূল কারণে যেতে পারেন।'),
          l('More telemetry improves diagnosis but costs money and risks privacy — sample wisely and alert on symptoms and SLO burn, not every error.', 'বেশি telemetry নির্ণয় উন্নত করে কিন্তু খরচ ও privacy ঝুঁকি বাড়ায়—বুদ্ধিমানভাবে sample করুন ও প্রতিটি error নয়, লক্ষণ ও SLO burn-এ alert করুন।'),
        ] },
      ],
    },
  ],

  // ── security · Authentication, authorization & security ───────────────────
  security: [
    {
      h: l('What is application security?', 'অ্যাপ্লিকেশন security কী?'),
      blocks: [
        { p: l('Application security is the practice of protecting your system and its data from misuse — making sure only the right people can reach it, they can only do what they are allowed to, and the damage is contained even when one control fails. It rests on two ideas that beginners constantly confuse: authentication and authorization. Authentication proves who you are; authorization decides what you are allowed to do.', 'অ্যাপ্লিকেশন security হলো আপনার সিস্টেম ও ডেটাকে অপব্যবহার থেকে রক্ষার চর্চা—নিশ্চিত করা যেন শুধু সঠিক মানুষ এতে পৌঁছাতে পারে, তারা শুধু অনুমোদিত কাজ করতে পারে, ও একটি নিয়ন্ত্রণ ব্যর্থ হলেও ক্ষতি সীমাবদ্ধ থাকে। এটি দুটি ধারণার উপর দাঁড়ায় যা নতুনরা অবিরত গুলিয়ে ফেলে: authentication ও authorization। Authentication প্রমাণ করে আপনি কে; authorization ঠিক করে আপনি কী করতে অনুমোদিত।') },
        { p: l('A third idea ties them together: defense in depth. No single control is trusted to be perfect, so you layer many independent controls — encryption, input validation, least privilege, audit logs — so that if one is bypassed, the others still limit the "blast radius," the amount of harm a single breach can cause.', 'একটি তৃতীয় ধারণা এদের বাঁধে: defense in depth। কোনো একক নিয়ন্ত্রণকে নিখুঁত ধরে ভরসা করা হয় না, তাই আপনি অনেক স্বাধীন নিয়ন্ত্রণ স্তরে সাজান—encryption, input validation, least privilege, audit log—যাতে একটি পাশ কাটালেও বাকিগুলো "blast radius", অর্থাৎ একটি breach যত ক্ষতি করতে পারে, তা সীমিত করে।') },
        { note: l('Think of a secure office building. At the front door a guard checks your ID card — that is authentication, proving who you are. But your card does not open every door: it unlocks only the floors and rooms you are cleared for, and the server room checks your permission again — that is authorization. Identity at the entrance, permission at each door.', 'একটি নিরাপদ অফিস ভবনের কথা ভাবুন। সামনের দরজায় একজন guard আপনার ID card যাচাই করে—এটি authentication, আপনি কে তা প্রমাণ। কিন্তু আপনার card প্রতিটি দরজা খোলে না: এটি শুধু আপনার অনুমোদিত ফ্লোর ও কক্ষ খোলে, ও server room আবার আপনার অনুমতি যাচাই করে—এটি authorization। প্রবেশে পরিচয়, প্রতিটি দরজায় অনুমতি।'), kind: 'tip' },
      ],
    },
    {
      h: l('How a secure request flows', 'একটি নিরাপদ রিকোয়েস্ট কীভাবে চলে'),
      blocks: [
        { p: l('Every protected action runs through the same ordered gauntlet of checks. Skip or reorder them and you have a vulnerability.', 'প্রতিটি সুরক্ষিত কাজ একই ক্রমের যাচাই-শৃঙ্খলের মধ্য দিয়ে চলে। এগুলো বাদ দিলে বা ক্রম বদলালে আপনার একটি vulnerability তৈরি হয়।') },
        { steps: [
          l('Transport security first — the request arrives over TLS (HTTPS), so credentials and data are encrypted in transit and cannot be read on the wire.', 'প্রথমে transport security—রিকোয়েস্ট TLS (HTTPS)-এ আসে, তাই credential ও ডেটা পথে encrypt থাকে ও তারে পড়া যায় না।'),
          l('Authenticate — verify the caller’s identity from a credential: a session cookie, or a signed token (like a JWT) the server can validate. If it is missing or invalid, reject with 401 Unauthorized.', 'Authenticate—একটি credential থেকে কলারের পরিচয় যাচাই: একটি session cookie, বা সার্ভার যাচাই করতে পারে এমন একটি signed token (যেমন JWT)। এটি না থাকলে বা অবৈধ হলে 401 Unauthorized দিয়ে প্রত্যাখ্যান করুন।'),
          l('Authorize — on the server, check that this identity has permission for this specific action and resource ("can user 42 delete order 99?"). If not, reject with 403 Forbidden.', 'Authorize—সার্ভারে যাচাই করুন এই পরিচয়ের এই নির্দিষ্ট কাজ ও resource-এর অনুমতি আছে কিনা ("user 42 কি order 99 মুছতে পারে?")। না থাকলে 403 Forbidden দিয়ে প্রত্যাখ্যান করুন।'),
          l('Validate input — treat all incoming data as hostile; validate and sanitize it, and use parameterized queries so a malicious value cannot become code (SQL injection, XSS).', 'input যাচাই করুন—সব আসা ডেটাকে বৈরী গণ্য করুন; যাচাই ও sanitize করুন, ও parameterized query ব্যবহার করুন যাতে একটি ক্ষতিকর মান কোড হয়ে না ওঠে (SQL injection, XSS)।'),
          l('Act and audit — perform the operation, then write an audit log entry (who did what, when) so the action is traceable after the fact.', 'কাজ ও audit করুন—অপারেশন সম্পাদন করুন, তারপর একটি audit log এন্ট্রি লিখুন (কে কী করল, কখন) যাতে কাজটি পরে খুঁজে বের করা যায়।'),
        ] },
        { code: `# Authorization MUST live on the server, checked per request.
# The UI hiding a button is convenience, not security.

function deleteOrder(request, orderId) {
    user = authenticate(request.token)      # who are you?  (401 if invalid)
    order = db.getOrder(orderId)
    if order.ownerId != user.id and not user.isAdmin:
      return http(403, "Forbidden")         # not allowed  -> stop here
    db.delete(orderId)
    audit.log(user.id, "delete_order", orderId)
    return http(200, "OK")
}
# An attacker can call this endpoint directly with any orderId,
# bypassing your UI entirely -- so the check has to be HERE.`, caption: l('The permission check sits on the server, on every request. A hidden button in the browser stops nobody who calls the API directly.', 'অনুমতি যাচাই সার্ভারে, প্রতিটি রিকোয়েস্টে বসে। ব্রাউজারে লুকানো একটি বোতাম সরাসরি API কল করা কাউকে থামায় না।') },
      ],
    },
    {
      h: l('Authentication vs authorization', 'Authentication বনাম authorization'),
      blocks: [
        { table: {
          head: [l('Aspect', 'দিক'), l('Authentication', 'Authentication'), l('Authorization', 'Authorization')],
          rows: [
            [l('Question it answers', 'যে প্রশ্নের উত্তর দেয়'), l('Who are you?', 'আপনি কে?'), l('What are you allowed to do?', 'আপনি কী করতে পারেন?')],
            [l('Happens', 'ঘটে'), l('First — at the entrance.', 'প্রথমে—প্রবেশে।'), l('After — at every protected action.', 'পরে—প্রতিটি সুরক্ষিত কাজে।')],
            [l('Based on', 'ভিত্তি'), l('Credentials: password, token, biometrics, MFA.', 'credential: password, token, biometric, MFA।'), l('Rules: roles, ownership, policies (RBAC/ABAC).', 'নিয়ম: role, ownership, policy (RBAC/ABAC)।')],
            [l('Failure code', 'ব্যর্থতা কোড'), l('401 Unauthorized', '401 Unauthorized'), l('403 Forbidden', '403 Forbidden')],
            [l('Analogy', 'উপমা'), l('Showing your ID at the door.', 'দরজায় আপনার ID দেখানো।'), l('Which rooms your badge unlocks.', 'আপনার badge কোন কক্ষ খোলে।')],
          ],
        } },
      ],
    },
    {
      h: l('Principles that guide every decision', 'যে নীতি প্রতিটি সিদ্ধান্ত চালায়'),
      blocks: [
        { p: l('You cannot memorize a rule for every threat, but a handful of principles make most secure choices obvious.', 'প্রতিটি হুমকির জন্য একটি নিয়ম মুখস্থ করা যায় না, তবে কয়েকটি নীতি বেশিরভাগ নিরাপদ পছন্দ স্পষ্ট করে দেয়।') },
        { list: [
          l('Least privilege — give every user, service, and token the minimum access it needs, and nothing more. A leaked read-only key cannot delete your database.', 'Least privilege—প্রতিটি user, service ও token-কে দরকারি ন্যূনতম access দিন, তার বেশি নয়। ফাঁস হওয়া একটি read-only key আপনার database মুছতে পারে না।'),
          l('Secure by default — the default configuration should be the safe one; security must not depend on remembering to turn it on.', 'Secure by default—default কনফিগারেশনই নিরাপদটি হওয়া উচিত; security চালু করার কথা মনে রাখার উপর নির্ভর করা উচিত নয়।'),
          l('Encrypt everywhere — TLS for data in transit, encryption at rest for stored data, and never store passwords except as a salted slow hash (bcrypt/argon2).', 'সর্বত্র encrypt—পথের ডেটায় TLS, সংরক্ষিত ডেটায় encryption at rest, ও password কখনো salted slow hash (bcrypt/argon2) ছাড়া সংরক্ষণ নয়।'),
          l('Validate all input and audit all sensitive actions — trust nothing from the client, and keep a trail of who did what.', 'সব input যাচাই ও সব সংবেদনশীল কাজ audit করুন—ক্লায়েন্টের কিছুতে ভরসা নয়, ও কে কী করল তার হদিস রাখুন।'),
        ] },
      ],
    },
    {
      h: l('The trade-off, and when to invest', 'ট্রেড-অফ, ও কখন বিনিয়োগ করবেন'),
      blocks: [
        { p: l('Security is never free: every extra check adds friction for users (another login, an MFA prompt) and a little latency to each request. The art is proportionality — spend the friction where the value is. A bank transfer or an admin action deserves strong controls (MFA, re-authentication, tight authorization); a public read of non-sensitive content needs almost none. Adding heavy checks everywhere trains users to click through prompts blindly, which is its own risk.', 'Security কখনো বিনামূল্যে নয়: প্রতিটি বাড়তি যাচাই ব্যবহারকারীর জন্য ঘর্ষণ (আরেকটি login, একটি MFA prompt) ও প্রতিটি রিকোয়েস্টে সামান্য latency যোগ করে। শিল্পটি হলো আনুপাতিকতা—যেখানে মূল্য সেখানে ঘর্ষণ খরচ করুন। একটি ব্যাংক transfer বা admin কাজ শক্ত নিয়ন্ত্রণ প্রাপ্য (MFA, re-authentication, কঠোর authorization); অ-সংবেদনশীল কন্টেন্টের public পঠন প্রায় কিছুই নয়। সর্বত্র ভারী যাচাই যোগ করলে ব্যবহারকারী অন্ধভাবে prompt-এ ক্লিক করা শেখে, যা নিজেই একটি ঝুঁকি।') },
        { p: l('It also helps to know the handful of attack classes that cause most real breaches, so you can spend your defense-in-depth budget where attackers actually push. The recurring ones are injection (untrusted input treated as code, as in SQL injection or XSS), broken authentication (weak passwords, leaked tokens, no MFA), and broken access control (the authorization check that was skipped or done only in the UI). Notice that all three are defeated by the same disciplines already covered — validate every input, protect and scope credentials, and enforce authorization on the server for every request.', 'কোন কয়েকটি আক্রমণ-শ্রেণি বেশিরভাগ বাস্তব breach ঘটায় তা জানাও সাহায্য করে, যাতে আক্রমণকারী যেখানে আসলে চাপ দেয় সেখানে defense-in-depth বাজেট খরচ করতে পারেন। বারবার আসা শ্রেণিগুলো হলো injection (untrusted input কোড হিসেবে গণ্য, যেমন SQL injection বা XSS), broken authentication (দুর্বল password, ফাঁস token, MFA নেই), ও broken access control (যে authorization যাচাই বাদ পড়েছে বা শুধু UI-তে করা হয়েছে)। লক্ষ করুন, তিনটিই আগে-আলোচিত একই নীতি দিয়ে পরাজিত হয়—প্রতিটি input যাচাই করুন, credential রক্ষা ও scope করুন, ও প্রতিটি রিকোয়েস্টে সার্ভারে authorization প্রয়োগ করুন।') },
      ],
    },
    {
      h: l('Common mistakes', 'সাধারণ ভুল'),
      blocks: [
        { list: [
          l('Checking permissions only in the browser interface. Hiding a button is UX, not security — an attacker calls the API directly and skips your UI entirely. Authorization must be enforced on the server, every time.', 'শুধু ব্রাউজার interface-এ অনুমতি যাচাই করা। একটি বোতাম লুকানো UX, security নয়—আক্রমণকারী সরাসরি API কল করে ও আপনার UI পুরো এড়ায়। Authorization প্রতিবার সার্ভারে প্রয়োগ করতেই হবে।'),
          l('Trusting client input — building SQL by string concatenation (injection) or rendering user text as HTML (XSS). Always validate and use parameterized queries.', 'ক্লায়েন্ট input-এ ভরসা—string জোড়া দিয়ে SQL বানানো (injection) বা user টেক্সট HTML হিসেবে render (XSS)। সবসময় যাচাই ও parameterized query ব্যবহার করুন।'),
          l('Storing passwords in plaintext or with fast hashes like MD5; secrets committed into source code or config.', 'plaintext-এ বা MD5-এর মতো দ্রুত hash দিয়ে password সংরক্ষণ; secret source কোড বা config-এ commit করা।'),
          l('One over-privileged account or token used everywhere, so a single leak compromises the whole system.', 'সর্বত্র ব্যবহৃত একটি অতি-অনুমোদিত account বা token, তাই একটি ফাঁস পুরো সিস্টেম আপস করে।'),
        ] },
      ],
    },
    {
      h: l('Remember in one line', 'এক লাইনে মনে রাখুন'),
      blocks: [
        { list: [
          l('Authentication proves who you are; authorization limits what you can do; layered controls shrink the blast radius.', 'Authentication প্রমাণ করে আপনি কে; authorization সীমিত করে কী করতে পারেন; স্তরভিত্তিক নিয়ন্ত্রণ blast radius ছোট করে।'),
          l('Enforce authorization on the server on every request — the browser UI is never a security boundary.', 'প্রতিটি রিকোয়েস্টে সার্ভারে authorization প্রয়োগ করুন—ব্রাউজার UI কখনো security সীমা নয়।'),
          l('Least privilege, secure defaults, encrypt everywhere, validate input, and audit — extra checks cost friction but protect what matters.', 'Least privilege, secure default, সর্বত্র encrypt, input যাচাই ও audit—বাড়তি যাচাই ঘর্ষণ খরচ করে তবে যা গুরুত্বপূর্ণ তা রক্ষা করে।'),
        ] },
      ],
    },
  ],

  // ── microservices · Microservices & event-driven architecture ─────────────
  microservices: [
    {
      h: l('What are microservices?', 'Microservices কী?'),
      blocks: [
        { p: l('A microservices architecture builds an application as a set of small, independent services, each owning one business capability and deployable on its own — instead of one large "monolith" where all the code ships together. An e-commerce site might split into separate Orders, Payments, Inventory, and Notifications services, each with its own codebase, its own database, and its own deployment schedule.', 'একটি microservices architecture একটি অ্যাপ্লিকেশনকে ছোট, স্বাধীন service-এর সেট হিসেবে বানায়, প্রতিটি একটি ব্যবসায়িক সক্ষমতার মালিক ও নিজে ডিপ্লয়যোগ্য—একটি বড় "monolith"-এর বদলে যেখানে সব কোড একসঙ্গে যায়। একটি e-commerce সাইট আলাদা Orders, Payments, Inventory ও Notifications service-এ ভাগ হতে পারে, প্রতিটির নিজস্ব codebase, নিজস্ব database ও নিজস্ব ডিপ্লয় সূচি।') },
        { p: l('The guiding rule for where to draw the lines is business ownership: a service boundary should follow a stable business domain owned by one team, not a technical layer or a database table. These services often coordinate through events — one service announces "an order was placed," and others react on their own — which decouples the reaction from the initiating action.', 'সীমা কোথায় টানবেন তার মূল নিয়ম হলো ব্যবসায়িক মালিকানা: একটি service সীমা একটি দল-মালিকানাধীন স্থিতিশীল ব্যবসায়িক ডোমেইন অনুসরণ করা উচিত, একটি টেকনিক্যাল স্তর বা database টেবিল নয়। এই service-গুলো প্রায়ই event দিয়ে সমন্বয় করে—একটি service ঘোষণা করে "একটি order দেওয়া হয়েছে," ও অন্যরা নিজে থেকে প্রতিক্রিয়া দেয়—যা প্রতিক্রিয়াকে মূল কাজ থেকে decouple করে।') },
        { note: l('Think of a busy marketplace. Each stall is independently owned and run — the baker does not need the butcher’s permission to bake — yet they share common rules and a common space. When a big event happens, an announcement goes out over the loudspeaker and every stall that cares reacts in its own way. Microservices are independent stalls; events are the announcements.', 'একটি ব্যস্ত বাজারের কথা ভাবুন। প্রতিটি দোকান স্বাধীনভাবে মালিকানাধীন ও পরিচালিত—রুটিওয়ালার রুটি বানাতে কসাইয়ের অনুমতি লাগে না—তবু তারা সাধারণ নিয়ম ও সাধারণ জায়গা ভাগ করে। একটি বড় ঘটনা ঘটলে লাউডস্পিকারে একটি ঘোষণা যায় ও আগ্রহী প্রতিটি দোকান নিজের মতো প্রতিক্রিয়া দেয়। Microservices স্বাধীন দোকান; event সেই ঘোষণা।'), kind: 'tip' },
      ],
    },
    {
      h: l('How event-driven services work', 'Event-driven service কীভাবে কাজ করে'),
      blocks: [
        { p: l('Services can talk two ways: synchronously (one calls another’s API and waits) or asynchronously through events on a message broker (Kafka, RabbitMQ). Event-driven communication is what makes services truly independent. Here is the flow when an order is placed.', 'Service দুইভাবে কথা বলতে পারে: synchronous (একটি অন্যটির API কল করে ও অপেক্ষা করে) বা একটি message broker-এ (Kafka, RabbitMQ) event দিয়ে asynchronous। Event-driven যোগাযোগই service-কে সত্যিকার স্বাধীন করে। একটি order দেওয়া হলে প্রবাহটি এই।') },
        { steps: [
          l('The Orders service does its one job — saves the order to its own database — and publishes an "OrderPlaced" event to a message broker. Then it immediately returns success to the user.', 'Orders service তার একটি কাজ করে—order তার নিজের database-এ সংরক্ষণ করে—ও একটি message broker-এ একটি "OrderPlaced" event publish করে। তারপর সঙ্গে সঙ্গে user-কে success ফেরত দেয়।'),
          l('The broker durably stores the event and delivers it to every subscriber. The Orders service does not know or care who is listening.', 'Broker event-টি টেকসইভাবে সংরক্ষণ করে ও প্রতিটি subscriber-কে পৌঁছায়। কে শুনছে তা Orders service জানে না বা পরোয়া করে না।'),
          l('Independent consumers react on their own: Payments charges the card, Inventory decrements stock, Notifications emails a receipt — in parallel, each at its own pace.', 'স্বাধীন consumer নিজে থেকে প্রতিক্রিয়া দেয়: Payments কার্ড চার্জ করে, Inventory stock কমায়, Notifications রসিদ email করে—সমান্তরালে, প্রতিটি নিজের গতিতে।'),
          l('If Notifications is down, the event waits in the broker and is processed when it recovers — the order still succeeded. That is the resilience payoff of decoupling.', 'Notifications ডাউন থাকলে event broker-এ অপেক্ষা করে ও সেরে উঠলে প্রসেস হয়—order তবুও সফল হয়েছিল। এটাই decoupling-এর resilience লাভ।'),
        ] },
        { code: `# Orders service: do one job, announce it, return fast.
function placeOrder(cart, user) {
    order = db.save({ userId: user.id, items: cart, status: "PLACED" })
    broker.publish("OrderPlaced", {           # fire-and-forget event
      orderId: order.id, userId: user.id, total: cart.total
    })
    return order                              # user is NOT blocked on
}                                             # payment/email/inventory

# Three independent services each subscribe and react on their own:
#   payments-svc     on "OrderPlaced" -> chargeCard(...)
#   inventory-svc    on "OrderPlaced" -> decrementStock(...)
#   notification-svc on "OrderPlaced" -> sendReceiptEmail(...)`, caption: l('Publishing an event decouples the reaction from the action: add a new consumer (say, analytics) without touching the Orders service at all.', 'একটি event publish করা প্রতিক্রিয়াকে কাজ থেকে decouple করে: Orders service স্পর্শ না করেই একটি নতুন consumer (যেমন analytics) যোগ করুন।') },
      ],
    },
    {
      h: l('Monolith vs microservices', 'Monolith বনাম microservices'),
      blocks: [
        { table: {
          head: [l('Aspect', 'দিক'), l('Monolith', 'Monolith'), l('Microservices', 'Microservices')],
          rows: [
            [l('Deployment', 'ডিপ্লয়মেন্ট'), l('One unit — everything ships together.', 'একটি একক—সব একসঙ্গে যায়।'), l('Independent — each service deploys on its own.', 'স্বাধীন—প্রতিটি service নিজে ডিপ্লয় হয়।')],
            [l('Scaling', 'স্কেলিং'), l('Scale the whole app, even one hot part.', 'একটি ব্যস্ত অংশের জন্যও পুরো অ্যাপ স্কেল।'), l('Scale only the busy service.', 'শুধু ব্যস্ত service স্কেল।')],
            [l('Data', 'ডেটা'), l('One shared database; easy transactions.', 'একটি শেয়ার্ড database; সহজ transaction।'), l('A database per service; no cross-service joins.', 'প্রতি service-এ database; cross-service join নেই।')],
            [l('Failure', 'ব্যর্থতা'), l('A crash can take down the whole app.', 'একটি ক্র্যাশ পুরো অ্যাপ নামাতে পারে।'), l('One service can fail in isolation.', 'একটি service আলাদাভাবে ব্যর্থ হতে পারে।')],
            [l('Operations', 'অপারেশন'), l('Simple to run, deploy, and debug.', 'চালানো, ডিপ্লয় ও ডিবাগ সহজ।'), l('Complex: networking, discovery, distributed tracing.', 'জটিল: networking, discovery, distributed tracing।')],
            [l('Best when', 'কখন সেরা'), l('Small team, early product, one domain.', 'ছোট দল, প্রারম্ভিক পণ্য, একটি ডোমেইন।'), l('Many teams, distinct domains, independent scaling.', 'অনেক দল, স্বতন্ত্র ডোমেইন, স্বাধীন স্কেলিং।')],
          ],
        } },
      ],
    },
    {
      h: l('When and where to use it', 'কখন ও কোথায় ব্যবহার করবেন'),
      blocks: [
        { p: l('Reach for microservices when the organization, not just the code, demands it: many teams that keep colliding in one codebase, distinct business domains that scale and change at different rates, and a real operational need for independent deployment. The classic advice is to start with a well-structured monolith and split off services only when a boundary has proven stable and a team clearly owns it.', 'Microservices-এ যান যখন শুধু কোড নয়, সংগঠনই এটি দাবি করে: একটি codebase-এ বারবার সংঘর্ষ করা অনেক দল, ভিন্ন হারে স্কেল ও বদলানো স্বতন্ত্র ব্যবসায়িক ডোমেইন, ও স্বাধীন ডিপ্লয়মেন্টের বাস্তব অপারেশনাল প্রয়োজন। ক্লাসিক পরামর্শ হলো একটি সুগঠিত monolith দিয়ে শুরু করুন ও শুধু তখনই service আলাদা করুন যখন একটি সীমা স্থিতিশীল প্রমাণিত ও একটি দল স্পষ্টভাবে এর মালিক।') },
        { p: l('For a small team or an early product, a monolith is usually the right call — you get simple transactions, easy local debugging, and no network between your components. Splitting too early pays all the operational cost of distribution before you have the team size or the stable boundaries to benefit from it.', 'একটি ছোট দল বা প্রারম্ভিক পণ্যের জন্য monolith সাধারণত সঠিক পছন্দ—আপনি সহজ transaction, সহজ local ডিবাগিং ও উপাদানের মধ্যে কোনো নেটওয়ার্ক পান না। খুব আগে ভাগ করলে দলের আকার বা স্থিতিশীল সীমা থেকে উপকৃত হওয়ার আগেই distribution-এর সব অপারেশনাল খরচ দিতে হয়।') },
      ],
    },
    {
      h: l('The trade-off you are accepting', 'যে ট্রেড-অফ মেনে নিচ্ছেন'),
      blocks: [
        { p: l('Independent deployment improves team autonomy — but it does not remove complexity, it moves it into the network and operations. Calls that were fast in-process function calls become network requests that can be slow, fail, or arrive out of order. A single database transaction becomes a distributed workflow across services that can each fail halfway. You now need service discovery, distributed tracing, retries, and patterns like the saga to keep data consistent across services. Microservices trade local simplicity for organizational scalability; only take that trade when the organization actually needs it.', 'স্বাধীন ডিপ্লয়মেন্ট দলের স্বায়ত্তশাসন বাড়ায়—কিন্তু এটি জটিলতা সরায় না, নেটওয়ার্ক ও অপারেশনে সরিয়ে দেয়। যে কল in-process function কল হিসেবে দ্রুত ছিল তা নেটওয়ার্ক রিকোয়েস্ট হয় যা ধীর, ব্যর্থ বা ক্রমের বাইরে আসতে পারে। একটি একক database transaction একটি distributed workflow হয় যেখানে প্রতিটি service অর্ধেক পথে ব্যর্থ হতে পারে। এখন আপনার service discovery, distributed tracing, retry ও saga-র মতো প্যাটার্ন লাগে service-জুড়ে ডেটা consistent রাখতে। Microservices local সরলতার বিনিময়ে সাংগঠনিক scalability নেয়; সংগঠনের সত্যিই দরকার হলেই সেই ট্রেড নিন।') },
      ],
    },
    {
      h: l('Common mistakes', 'সাধারণ ভুল'),
      blocks: [
        { list: [
          l('Creating one microservice per database table. That gives you the worst of both worlds — tiny services chattering constantly over the network to do one logical operation. Split by business capability, not by table.', 'প্রতি database টেবিলের জন্য একটি microservice তৈরি করা। এতে দুই জগতের সবচেয়ে খারাপটি পান—একটি যৌক্তিক অপারেশনের জন্য ছোট service নেটওয়ার্কে অবিরত বকবক করে। টেবিল নয়, ব্যবসায়িক সক্ষমতা দিয়ে ভাগ করুন।'),
          l('A shared database across services, which secretly re-couples them: now they cannot deploy or change schema independently.', 'service-জুড়ে একটি শেয়ার্ড database, যা গোপনে তাদের আবার couple করে: এখন তারা স্বাধীনভাবে ডিপ্লয় বা schema বদলাতে পারে না।'),
          l('A "distributed monolith" — services so chatty and interdependent that they must all deploy together, giving you all the cost and none of the autonomy.', 'একটি "distributed monolith"—service এত বকবকে ও পরস্পরনির্ভর যে সব একসঙ্গে ডিপ্লয় করতে হয়, সব খরচ দেয় কিন্তু কোনো স্বায়ত্তশাসন নয়।'),
          l('Adopting microservices for a tiny team or product before the boundaries are stable — paying distribution’s tax with none of its benefit.', 'সীমা স্থিতিশীল হওয়ার আগে একটি ছোট দল বা পণ্যের জন্য microservices নেওয়া—distribution-এর কর দেওয়া কিন্তু কোনো সুবিধা ছাড়াই।'),
        ] },
      ],
    },
    {
      h: l('Remember in one line', 'এক লাইনে মনে রাখুন'),
      blocks: [
        { list: [
          l('Microservices = small, independently deployable services split around business ownership, not database tables.', 'Microservices = ব্যবসায়িক মালিকানার চারপাশে ভাগ করা ছোট, স্বাধীনভাবে ডিপ্লয়যোগ্য service, database টেবিল নয়।'),
          l('Events decouple the reaction from the action, so services react independently and survive each other’s outages.', 'Event প্রতিক্রিয়াকে কাজ থেকে decouple করে, তাই service স্বাধীনভাবে প্রতিক্রিয়া দেয় ও একে অপরের outage টিকিয়ে রাখে।'),
          l('Independent deployment buys autonomy but moves complexity into networks and operations — start with a monolith, split when a boundary and a team demand it.', 'স্বাধীন ডিপ্লয়মেন্ট স্বায়ত্তশাসন কেনে কিন্তু জটিলতা নেটওয়ার্ক ও অপারেশনে সরায়—monolith দিয়ে শুরু করুন, সীমা ও দল দাবি করলে ভাগ করুন।'),
        ] },
      ],
    },
  ],

  // ── url-shortener · Design a URL shortener ────────────────────────────────
  'url-shortener': [
    {
      h: l('Requirements', 'প্রয়োজন'),
      blocks: [
        { p: l('A URL shortener turns a long URL into a short one (like short.ly/aX9bQ2) and redirects anyone who visits the short link back to the original. It is the classic "small but deep" system-design question: the feature list is tiny, but the scale, the read-heavy traffic, and the key-generation problem hide real depth. Start, as always, by separating functional from non-functional requirements.', 'একটি URL shortener একটি দীর্ঘ URL-কে ছোট করে (যেমন short.ly/aX9bQ2) ও যে কেউ short link-এ গেলে তাকে মূলটিতে redirect করে। এটি ক্লাসিক "ছোট কিন্তু গভীর" system-design প্রশ্ন: ফিচার তালিকা ছোট, কিন্তু স্কেল, read-heavy ট্রাফিক ও key-generation সমস্যা আসল গভীরতা লুকায়। যথারীতি functional ও non-functional প্রয়োজন আলাদা করে শুরু করুন।') },
        { list: [
          l('Functional — create a short code for a long URL; redirect a short code to its long URL; optionally support custom aliases, expiry, and click analytics.', 'Functional—একটি দীর্ঘ URL-এর জন্য একটি short code বানানো; একটি short code তার দীর্ঘ URL-এ redirect করা; ঐচ্ছিকভাবে custom alias, expiry ও click analytics।'),
          l('Non-functional — extremely read-heavy (redirects vastly outnumber creations, often 100:1); very low read latency (a redirect must feel instant); high availability (a dead redirect breaks every link ever shared); and short codes should not be guessable or enumerable.', 'Non-functional—অত্যন্ত read-heavy (redirect তৈরির চেয়ে বহু গুণ বেশি, প্রায়ই ১০০:১); খুব কম read latency (একটি redirect তাৎক্ষণিক লাগতে হবে); উচ্চ availability (একটি মৃত redirect শেয়ার করা প্রতিটি লিংক ভাঙে); ও short code অনুমানযোগ্য বা enumerable হওয়া উচিত নয়।'),
          l('The read/write asymmetry is the single most important fact: design the redirect path to be blindingly fast, and accept that creation can be a little slower.', 'read/write অসমতাই সবচেয়ে গুরুত্বপূর্ণ তথ্য: redirect path-কে অত্যন্ত দ্রুত ডিজাইন করুন, ও মেনে নিন যে তৈরি একটু ধীর হতে পারে।'),
        ] },
        { note: l('The mental model is a coat-check counter: you hand over a big coat and get back a tiny numbered ticket. The ticket carries no information itself — it is just a key. Later you present the small ticket and get the large item back. A short code is that ticket, and the database is the coat rack.', 'মানসিক মডেলটি একটি ক্লোকরুম কাউন্টার: আপনি একটি বড় কোট দেন ও একটি ছোট নম্বরযুক্ত টিকিট ফেরত পান। টিকিটটি নিজে কোনো তথ্য বহন করে না—এটি শুধু একটি key। পরে ছোট টিকিট দেখিয়ে বড় জিনিসটি ফেরত পান। একটি short code সেই টিকিট, ও database হলো কোট র‍্যাক।'), kind: 'tip' },
      ],
    },
    {
      h: l('Estimation', 'Estimation'),
      blocks: [
        { p: l('Numbers decide the design, so estimate before drawing anything. Use the anchor that there are about 10⁵ seconds in a day, round to powers of 10, and separate reads from writes.', 'সংখ্যা ডিজাইন ঠিক করে, তাই কিছু আঁকার আগে estimate করুন। দিনে প্রায় ১০⁵ সেকেন্ড—এই anchor ব্যবহার করুন, দশের ঘাতে গোল করুন, ও read-কে write থেকে আলাদা করুন।') },
        { code: `Assumptions
  New short URLs created = 100 million / month
  Read:write ratio      = 100 : 1  (redirects >> creations)

Write QPS
  writes/sec = 1e8 / (30 days x 1e5 s/day)
             = 1e8 / 3e6  ~= 35 writes/sec   (tiny)

Read QPS
  reads/sec  = 35 x 100   ~= 3,500 redirects/sec
  peak (x3)  ~= 10,000 redirects/sec

Storage (5 years)
  rows in 5 yrs = 1e8/mo x 12 x 5   = 6e9 rows (~6 billion)
  per row       ~= 500 bytes (short code + long URL + metadata)
  total         = 6e9 x 500 = 3e12 B ~= 3 TB

Key space
  6-char code, alphabet of 62 (a-z A-Z 0-9)
  62^6 ~= 56 billion codes  >>  6 billion rows  -> 6 chars is plenty`, caption: l('The takeaway: writes are trivial (~35/s), reads dominate (~10k/s at peak), storage fits on one large disk, and a 6-character code gives ~56 billion combinations — far more than we need.', 'সারকথা: write নগণ্য (~৩৫/s), read প্রধান (পিকে ~১০k/s), storage একটি বড় ডিস্কে ধরে, ও ৬-অক্ষরের code দেয় ~৫৬ বিলিয়ন সমন্বয়—আমাদের দরকারের চেয়ে অনেক বেশি।') },
      ],
    },
    {
      h: l('High-level design', 'হাই-লেভেল ডিজাইন'),
      blocks: [
        { p: l('Because reads dominate, the architecture is built around a cache in front of a simple key-value lookup. Two paths matter: the rare write (create) and the very hot read (redirect).', 'read প্রধান বলে architecture একটি সরল key-value lookup-এর সামনে একটি cache ঘিরে বানানো। দুটি path গুরুত্বপূর্ণ: দুর্লভ write (তৈরি) ও অত্যন্ত ব্যস্ত read (redirect)।') },
        { steps: [
          l('Create — the user POSTs a long URL. A load balancer routes to an app server, which generates a unique short code, stores the code-to-URL mapping in the database, and returns the short URL.', 'তৈরি—user একটি দীর্ঘ URL POST করে। একটি load balancer একটি app server-এ রাউট করে, যা একটি ইউনিক short code তৈরি করে, code-to-URL mapping database-এ সংরক্ষণ করে ও short URL ফেরত দেয়।'),
          l('Redirect — a visitor hits short.ly/aX9bQ2. The app server looks up the code, first in the cache.', 'Redirect—একজন দর্শক short.ly/aX9bQ2-এ যায়। app server code খোঁজে, প্রথমে cache-এ।'),
          l('Cache hit (the common case for popular links) returns the long URL from memory in microseconds — no database touched.', 'Cache hit (জনপ্রিয় লিংকের সাধারণ ক্ষেত্র) মেমরি থেকে মাইক্রোসেকেন্ডে দীর্ঘ URL ফেরত দেয়—database স্পর্শ হয় না।'),
          l('Cache miss reads the row from the database, stores it in the cache for next time, and continues.', 'Cache miss database থেকে row পড়ে, পরের বারের জন্য cache-এ রাখে ও এগোয়।'),
          l('The server replies with an HTTP 301/302 redirect to the long URL, and the browser follows it to the destination. (301 is cacheable and fastest; 302 lets you keep counting clicks.)', 'server দীর্ঘ URL-এ একটি HTTP 301/302 redirect দিয়ে উত্তর দেয়, ও browser গন্তব্যে যায়। (301 cache-যোগ্য ও দ্রুততম; 302 click গোনা চালিয়ে যেতে দেয়।)'),
        ] },
        { note: l('Choose the redirect status carefully. A 301 (permanent) is cached by browsers, so later clicks may never reach your server — fastest, but you lose analytics. A 302 (temporary) routes every click through you, so you can count clicks at the cost of more traffic.', 'redirect status সাবধানে বাছুন। একটি 301 (স্থায়ী) browser cache করে, তাই পরের click হয়তো কখনো আপনার server-এ আসে না—দ্রুততম, কিন্তু analytics হারান। একটি 302 (অস্থায়ী) প্রতিটি click আপনার মধ্য দিয়ে রাউট করে, তাই বেশি ট্রাফিকের বিনিময়ে click গুনতে পারেন।'), kind: 'tip' },
      ],
    },
    {
      h: l('Data model & generating the short code', 'ডেটা মডেল ও short code তৈরি'),
      blocks: [
        { p: l('The data model is trivially simple — a key-value mapping — which is exactly why a URL shortener scales so well. The interesting design decision is how you generate the short code, and each approach has a clear trade-off.', 'ডেটা মডেল অত্যন্ত সরল—একটি key-value mapping—আর ঠিক এ কারণেই একটি URL shortener এত ভালো স্কেল করে। আকর্ষণীয় ডিজাইন সিদ্ধান্ত হলো আপনি কীভাবে short code তৈরি করেন, ও প্রতিটি উপায়ের একটি স্পষ্ট ট্রেড-অফ আছে।') },
        { table: {
          head: [l('Approach', 'উপায়'), l('How', 'কীভাবে'), l('Trade-off', 'ট্রেড-অফ')],
          rows: [
            [l('Auto-increment + Base62', 'Auto-increment + Base62'), l('Take a global counter ID and encode it in base 62 (a-z A-Z 0-9).', 'একটি global counter ID নিয়ে base 62 (a-z A-Z 0-9)-এ encode করুন।'), l('Guaranteed unique and short, but sequential codes leak volume and are trivially enumerable.', 'নিশ্চিত ইউনিক ও ছোট, কিন্তু ক্রমিক code ভলিউম ফাঁস করে ও সহজে enumerable।')],
            [l('Random / hash', 'Random / hash'), l('Generate a random 6–7 char string (or hash the URL and take a slice).', 'একটি র‍্যান্ডম ৬–৭ অক্ষর string তৈরি করুন (বা URL hash করে একটি slice নিন)।'), l('Not enumerable, needs no coordination — but you must check for collisions on insert.', 'enumerable নয়, কোনো সমন্বয় লাগে না—কিন্তু insert-এ collision যাচাই করতে হবে।')],
            [l('Pre-generated key pool', 'Pre-generated key pool'), l('A background service pre-makes unique keys; app servers just claim one.', 'একটি background service আগেভাগে ইউনিক key বানায়; app server শুধু একটি দাবি করে।'), l('Fast, collision-free at write time — but adds a service to run and keys to manage.', 'দ্রুত, write-এ collision-মুক্ত—কিন্তু চালানোর একটি service ও ব্যবস্থাপনার key যোগ করে।')],
          ],
        } },
        { code: `# Random-key generation with a collision check on insert
ALPHABET = "abc...XYZ0...9"          # 62 characters

function createShortUrl(longUrl) {
    for attempt in 1..5 {
      code = randomString(ALPHABET, length=7)   # 62^7 ~= 3.5 trillion
      if db.insertIfAbsent(code, longUrl):       # atomic: only if unused
        return code
    }
    throw "could not allocate a code"           # astronomically unlikely
}`, caption: l('With 62^7 ≈ 3.5 trillion possibilities against billions of rows, collisions are rare — but insertIfAbsent must be atomic so two writers never claim the same code.', '62^7 ≈ ৩.৫ ট্রিলিয়ন সম্ভাবনার বিপরীতে বিলিয়ন row থাকায় collision দুর্লভ—কিন্তু insertIfAbsent atomic হতে হবে যাতে দুই writer কখনো একই code দাবি না করে।') },
      ],
    },
    {
      h: l('Scaling & trade-offs', 'স্কেলিং ও ট্রেড-অফ'),
      blocks: [
        { p: l('The estimates say writes are tiny but reads are large and must be fast, so scaling effort goes almost entirely into the read path.', 'Estimate বলে write ছোট কিন্তু read বড় ও দ্রুত হতে হবে, তাই স্কেলিং পরিশ্রম প্রায় পুরোটাই read path-এ যায়।') },
        { list: [
          l('Cache aggressively. A small set of links gets most of the traffic, so an in-memory cache (Redis) in front of the database serves the vast majority of redirects. This is the single biggest lever.', 'আক্রমণাত্মকভাবে cache করুন। অল্প কিছু লিংক বেশিরভাগ ট্রাফিক পায়, তাই database-এর সামনে একটি in-memory cache (Redis) বেশিরভাগ redirect পরিবেশন করে। এটিই সবচেয়ে বড় lever।'),
          l('Use a CDN and 301s for the hottest links so redirects resolve at the edge, near the user, without reaching your servers.', 'সবচেয়ে ব্যস্ত লিংকে CDN ও 301 ব্যবহার করুন যাতে redirect edge-এ, ব্যবহারকারীর কাছে, আপনার server-এ না পৌঁছেই resolve হয়।'),
          l('Partition (shard) the database by the short code, so 6 billion rows and the read load spread evenly across nodes. A key-value store (or read replicas) fits this access pattern perfectly.', 'database-কে short code দিয়ে partition (shard) করুন, যাতে ৬ বিলিয়ন row ও read লোড node-জুড়ে সমানভাবে ছড়ায়। একটি key-value store (বা read replica) এই access প্যাটার্নে নিখুঁত মানায়।'),
          l('The core trade-off in code generation: random keys avoid all coordination between servers but require collision checks or enough entropy; sequential keys need no checks but leak information. Most designs pick random/hashed keys to stay unguessable.', 'code generation-এ মূল ট্রেড-অফ: random key server-এর মধ্যে সব সমন্বয় এড়ায় কিন্তু collision check বা যথেষ্ট entropy দরকার; ক্রমিক key কোনো check লাগে না কিন্তু তথ্য ফাঁস করে। বেশিরভাগ ডিজাইন unguessable থাকতে random/hashed key বাছে।'),
        ] },
      ],
    },
    {
      h: l('Common mistakes', 'সাধারণ ভুল'),
      blocks: [
        { list: [
          l('Using sequential identifiers as the public code. short.ly/1, /2, /3… lets anyone enumerate every link in your system and reveals exactly how many URLs you have created — a privacy and security leak.', 'public code হিসেবে ক্রমিক identifier ব্যবহার। short.ly/1, /2, /3… যে কাউকে আপনার সিস্টেমের প্রতিটি লিংক enumerate করতে দেয় ও আপনি ঠিক কতগুলো URL বানিয়েছেন তা প্রকাশ করে—একটি privacy ও security ফাঁস।'),
          l('Designing the write path for scale and neglecting the read path, when reads outnumber writes ~100:1. The redirect is what must be fast.', 'read যখন write-এর ~১০০:১ বেশি, তখন write path স্কেলের জন্য ডিজাইন করে read path অবহেলা করা। redirect-ই দ্রুত হতে হবে।'),
          l('Forgetting collision handling on random keys — without an atomic insert-if-absent, two creates can overwrite each other and one link silently points to the wrong URL.', 'random key-তে collision সামলানো ভুলে যাওয়া—একটি atomic insert-if-absent ছাড়া দুটি create একে অপরকে overwrite করতে পারে ও একটি লিংক নীরবে ভুল URL-এ নির্দেশ করে।'),
          l('Not validating or normalizing the input URL, allowing open redirects to malicious sites or storing junk.', 'input URL যাচাই বা normalize না করা, ক্ষতিকর সাইটে open redirect বা আবর্জনা সংরক্ষণের সুযোগ দেয়।'),
        ] },
      ],
    },
    {
      h: l('Summary', 'সারসংক্ষেপ'),
      blocks: [
        { list: [
          l('A URL shortener maps a compact unique key to a long URL and redirects with very low read latency — a key-value lookup at heart.', 'একটি URL shortener একটি ছোট ইউনিক key-কে একটি দীর্ঘ URL-এ ম্যাপ করে ও খুব কম read latency-তে redirect করে—মূলে একটি key-value lookup।'),
          l('It is overwhelmingly read-heavy (~100:1), so the design centers on caching, CDNs, and sharding the read path; writes are trivial.', 'এটি প্রবলভাবে read-heavy (~১০০:১), তাই ডিজাইন cache, CDN ও read path shard করাকে কেন্দ্র করে; write নগণ্য।'),
          l('Generate collision-safe keys (random or base62) that stay unguessable — never sequential IDs — and partition by key to scale.', 'collision-নিরাপদ key (random বা base62) তৈরি করুন যা unguessable থাকে—কখনো ক্রমিক ID নয়—ও স্কেল করতে key দিয়ে partition করুন।'),
        ] },
      ],
    },
  ],
}
