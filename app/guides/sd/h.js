// Deep, bilingual (English / Bangla) teaching guides for advanced system-design
// case studies & strategy topics, keyed by topic id. Shape mirrors
// app/course-guides.js: each guide is an array of sections { h, blocks }, rendered
// by GuideBlock in app/LearningApp.js. Facts (definitions, analogies, trade-offs,
// mistakes) are drawn from the rawTopics rows in app/data.js.

const l = (en, bn) => ({ en, bn })

export default {
  // ── geo-ride · Design ride sharing & geospatial search ────────────────────
  'geo-ride': [
    {
      h: l('Requirements & scope', 'প্রয়োজন ও পরিসর'),
      blocks: [
        { p: l('A ride-sharing backend (think Uber, Pathao, or Bolt) has one deceptively hard job at its centre: given a rider standing at a point on the map, find nearby available drivers within a second, offer the trip, and then track that trip reliably from request to drop-off. Everything else — pricing, ratings, payments — hangs off that core matching loop.', 'একটি রাইড-শেয়ারিং ব্যাকএন্ডের (Uber, Pathao বা Bolt ভাবুন) কেন্দ্রে একটি আপাত-সহজ কিন্তু কঠিন কাজ থাকে: ম্যাপের একটি বিন্দুতে দাঁড়ানো রাইডার দিলে, এক সেকেন্ডের মধ্যে কাছের ফ্রি ড্রাইভার খুঁজে বের করা, ট্রিপ অফার করা, এবং রিকোয়েস্ট থেকে ড্রপ-অফ পর্যন্ত সেই ট্রিপ নির্ভরযোগ্যভাবে ট্র্যাক করা। বাকি সব—প্রাইসিং, রেটিং, পেমেন্ট—এই মূল ম্যাচিং লুপের সঙ্গে ঝোলে।') },
        { p: l('Before designing anything, separate what the system must do (functional) from how well it must do it (non-functional). Beginners rush to a database; the numbers below are what actually decide the shape of the system.', 'কিছু ডিজাইন করার আগে সিস্টেম কী করবে (functional) আর তা কতটা ভালোভাবে করবে (non-functional) আলাদা করুন। নতুনরা তাড়াহুড়ো করে ডেটাবেসে যায়; নিচের সংখ্যাগুলোই আসলে সিস্টেমের আকৃতি ঠিক করে।') },
        { list: [
          l('Functional — drivers stream live location; riders request a ride; the system finds nearby drivers and offers the trip; one driver accepts; both sides track the trip through a state machine (requested → accepted → arrived → in-trip → completed); fares are computed at the end.', 'Functional—ড্রাইভাররা লাইভ লোকেশন পাঠায়; রাইডার রাইড চায়; সিস্টেম কাছের ড্রাইভার খুঁজে ট্রিপ অফার করে; একজন ড্রাইভার গ্রহণ করে; দুই পক্ষ একটি স্টেট মেশিন দিয়ে ট্রিপ ট্র্যাক করে (requested → accepted → arrived → in-trip → completed); শেষে ভাড়া হিসাব হয়।'),
          l('Non-functional — matching must feel instant (p99 under ~1 second); location updates arrive at a massive, constant write rate; the system must stay available even if a region fails; a trip, once accepted, must never be double-assigned.', 'Non-functional—ম্যাচিং সঙ্গে সঙ্গে মনে হতে হবে (p99 ~১ সেকেন্ডের নিচে); লোকেশন আপডেট বিশাল ও অবিরাম রাইট রেটে আসে; একটি রিজিয়ন ফেল করলেও সিস্টেম সচল থাকতে হবে; একবার গৃহীত ট্রিপ কখনো দুবার অ্যাসাইন হওয়া চলবে না।'),
        ] },
      ],
    },
    {
      h: l('Estimation — sizing the write storm', 'এস্টিমেশন — রাইট ঝড়ের আকার'),
      blocks: [
        { p: l('The single most important number here is not ride requests — it is the flood of GPS pings from every online driver. Estimate it first, because it dictates that driver locations cannot live in your transactional database.', 'এখানে সবচেয়ে গুরুত্বপূর্ণ সংখ্যা রাইড রিকোয়েস্ট নয়—এটি প্রতিটি অনলাইন ড্রাইভারের GPS পিং-এর বন্যা। এটি আগে হিসাব করুন, কারণ এটিই ঠিক করে দেয় যে ড্রাইভার লোকেশন আপনার ট্রানজ্যাকশনাল ডেটাবেসে থাকতে পারে না।') },
        { code: `Assumptions
  Concurrent online drivers  : 1,000,000
  GPS ping interval          : every 4 seconds
  Rides per day              : 8,000,000
  Peak factor                : 5x average

Location-update throughput  (the write storm)
  1,000,000 drivers / 4 s  = 250,000 writes/sec   -> in-memory geo index

Ride-request throughput
  8,000,000 / 86,400 s     = ~93 requests/sec   (average)
  93 x 5                   = ~465 requests/sec  (peak)

Match search fan-out
  each request scans ~9 cells (target cell + 8 neighbours)
  465 x 9                  = ~4,200 cell reads/sec (peak)`, caption: l('250k location writes/sec vs ~465 ride requests/sec: location updates outnumber matches ~500:1, so they need a different store than trips.', '২৫০k লোকেশন রাইট/সেকেন্ড বনাম ~৪৬৫ রাইড রিকোয়েস্ট/সেকেন্ড: লোকেশন আপডেট ম্যাচের চেয়ে ~৫০০:১ বেশি, তাই এদের ট্রিপের চেয়ে ভিন্ন স্টোর দরকার।') },
        { p: l('The lesson from the math: 250,000 writes per second, most of which are overwritten within seconds, must never touch a durable SQL database — it would melt. They belong in an in-memory spatial index (Redis, or a dedicated location service) where only the latest position matters.', 'হিসাবের শিক্ষা: প্রতি সেকেন্ডে ২৫০,০০০ রাইট, যার বেশিরভাগ কয়েক সেকেন্ডেই ওভাররাইট হয়, কখনো একটি টেকসই SQL ডেটাবেসে যাওয়া উচিত নয়—এটি গলে যাবে। এদের জায়গা একটি ইন-মেমরি spatial index-এ (Redis, বা আলাদা location service) যেখানে শুধু সর্বশেষ অবস্থানই গুরুত্বপূর্ণ।') },
      ],
    },
    {
      h: l('High-level design', 'হাই-লেভেল ডিজাইন'),
      blocks: [
        { p: l('Split the system by write pattern. Location updates are high-volume and disposable; trips are low-volume and precious. Give each its own path.', 'সিস্টেমকে রাইট প্যাটার্ন দিয়ে ভাগ করুন। লোকেশন আপডেট উচ্চ-ভলিউম ও ফেলে-দেওয়া-যোগ্য; ট্রিপ কম-ভলিউম ও মূল্যবান। প্রতিটিকে আলাদা পথ দিন।') },
        { steps: [
          l('Drivers hold a persistent connection (WebSocket) to a Location Service and stream their GPS every few seconds.', 'ড্রাইভাররা একটি Location Service-এর সঙ্গে স্থায়ী সংযোগ (WebSocket) রাখে এবং প্রতি কয়েক সেকেন্ডে তাদের GPS পাঠায়।'),
          l('The Location Service writes each position into an in-memory geospatial index keyed by geohash (or an equivalent spatial structure), keeping only the newest point per driver.', 'Location Service প্রতিটি অবস্থান geohash দিয়ে কী-করা একটি ইন-মেমরি geospatial index-এ লেখে (বা সমতুল্য spatial structure), প্রতি ড্রাইভারের শুধু নতুনতম বিন্দু রেখে।'),
          l('A rider requests a trip; the Matching Service computes the rider’s geohash cell, reads that cell plus its 8 neighbours, and gets a candidate list of nearby available drivers.', 'একজন রাইডার ট্রিপ চায়; Matching Service রাইডারের geohash সেল বের করে, সেই সেল ও তার ৮টি প্রতিবেশী পড়ে, এবং কাছের ফ্রি ড্রাইভারের একটি candidate তালিকা পায়।'),
          l('Candidates are ranked (by ETA, not just straight-line distance) and the trip is offered to the best one; if they decline or time out, it moves to the next.', 'candidate-দের র‍্যাঙ্ক করা হয় (সরলরেখা দূরত্ব নয়, ETA দিয়ে) এবং সেরা জনকে ট্রিপ অফার করা হয়; সে না করলে বা টাইম-আউট হলে পরের জনে যায়।'),
          l('On acceptance, a Trip Service writes an authoritative trip row in a durable database and drives the state machine; this write is serialized so one trip maps to exactly one driver.', 'গ্রহণ করলে, একটি Trip Service একটি টেকসই ডেটাবেসে একটি নির্ভরযোগ্য ট্রিপ রো লেখে এবং স্টেট মেশিন চালায়; এই রাইট সিরিয়ালাইজড, তাই এক ট্রিপ ঠিক এক ড্রাইভারে ম্যাপ হয়।'),
          l('Live trip updates flow over the connection; the fare is calculated at completion and handed to a separate payments flow.', 'লাইভ ট্রিপ আপডেট সংযোগের ওপর দিয়ে যায়; ভাড়া completion-এ হিসাব হয় ও আলাদা পেমেন্ট ফ্লো-তে দেওয়া হয়।'),
        ] },
      ],
    },
    {
      h: l('Deep dive — geospatial indexing & matching', 'গভীর ডাইভ — geospatial indexing ও ম্যাচিং'),
      blocks: [
        { p: l('The heart of the design is answering "who is near this point?" quickly. A naive approach computes the distance from the rider to every online driver — that is 1,000,000 distance calculations per request, which is hopeless. Spatial indexing turns that global scan into a lookup of a tiny local neighbourhood.', 'ডিজাইনের হৃৎপিণ্ড হলো "এই বিন্দুর কাছে কে আছে?" দ্রুত উত্তর দেওয়া। সরল পদ্ধতি রাইডার থেকে প্রতিটি অনলাইন ড্রাইভারের দূরত্ব হিসাব করে—তা প্রতি রিকোয়েস্টে ১,০০০,০০০ দূরত্ব হিসাব, যা অসম্ভব। Spatial indexing সেই গ্লোবাল স্ক্যানকে একটি ছোট স্থানীয় প্রতিবেশীর লুকআপে পরিণত করে।') },
        { note: l('A geohash encodes a latitude/longitude into a short string where a shared prefix means physical closeness: "w21z8" and "w21z9" sit in adjacent cells. So "find nearby drivers" becomes "find drivers whose geohash starts with the same prefix" — a fast key lookup instead of a math sweep over a million points.', 'একটি geohash অক্ষাংশ/দ্রাঘিমাংশকে একটি ছোট স্ট্রিং-এ এনকোড করে যেখানে অভিন্ন prefix মানে ভৌত নৈকট্য: "w21z8" ও "w21z9" পাশাপাশি সেলে থাকে। তাই "কাছের ড্রাইভার খোঁজো" হয়ে যায় "একই prefix দিয়ে শুরু হওয়া geohash-এর ড্রাইভার খোঁজো"—দশ লক্ষ বিন্দুর ওপর গণিত-ঝাড়ু নয়, একটি দ্রুত key লুকআপ।'), kind: 'tip' },
        { steps: [
          l('Bucket every driver into a geohash cell as their pings arrive; the cell length controls precision (a longer geohash = a smaller, more precise cell).', 'পিং আসার সঙ্গে সঙ্গে প্রতিটি ড্রাইভারকে একটি geohash সেলে রাখুন; সেলের দৈর্ঘ্য নির্ভুলতা নিয়ন্ত্রণ করে (লম্বা geohash = ছোট, বেশি নির্ভুল সেল)।'),
          l('To match, look up the rider’s cell and its 8 surrounding cells — always search neighbours too, or a driver just across a cell boundary is invisible.', 'ম্যাচ করতে রাইডারের সেল ও তার চারপাশের ৮টি সেল দেখুন—প্রতিবেশীও সবসময় খুঁজুন, নইলে সেল সীমানার ঠিক ওপারের ড্রাইভার অদৃশ্য থাকবে।'),
          l('If too few candidates are found, widen the search by shortening the prefix (a coarser cell covering more area); if too many, tighten it.', 'যথেষ্ট candidate না পেলে prefix ছোট করে সার্চ বাড়ান (বেশি এলাকা ঢাকা মোটা সেল); বেশি পেলে সংকুচিত করুন।'),
          l('Rank the survivors by real ETA using road distance and current traffic, not by straight-line distance — the closest car may be across a river.', 'বেঁচে থাকাদের সরলরেখা দূরত্ব নয়, রাস্তার দূরত্ব ও বর্তমান ট্রাফিক দিয়ে বাস্তব ETA দিয়ে র‍্যাঙ্ক করুন—সবচেয়ে কাছের গাড়িটি হয়তো নদীর ওপারে।'),
        ] },
        { p: l('An alternative to geohash is a quadtree, which recursively splits the map into four quadrants and subdivides only where drivers are dense. Geohash shines for uniform, prefix-based lookups (easy to store in Redis); a quadtree adapts to uneven density (a packed city centre vs empty outskirts) but is more complex to update under a 250k-writes-per-second storm. Most production systems lean on geohash-style cells for exactly that write simplicity.', 'geohash-এর একটি বিকল্প হলো quadtree, যা ম্যাপকে বারবার চার ভাগে ভাগ করে এবং শুধু যেখানে ড্রাইভার ঘন সেখানে উপবিভক্ত করে। geohash সমান, prefix-ভিত্তিক লুকআপে ভালো (Redis-এ রাখা সহজ); quadtree অসম ঘনত্বে মানিয়ে নেয় (ঠাসা শহরকেন্দ্র বনাম খালি উপকণ্ঠ) কিন্তু ২৫০k-রাইট-প্রতি-সেকেন্ড ঝড়ে আপডেট করা জটিল। বেশিরভাগ প্রোডাকশন সিস্টেম সেই রাইট-সরলতার জন্যই geohash-ধাঁচের সেলে ঝোঁকে।') },
      ],
    },
    {
      h: l('Scaling & trade-offs', 'স্কেলিং ও ট্রেড-অফ'),
      blocks: [
        { p: l('The biggest tuning knob is the geo-cell size, and it cuts both ways. Smaller cells give sharper matches but force more boundary searches and more index churn — exactly the trade-off to say out loud in an interview.', 'সবচেয়ে বড় টিউনিং নব হলো geo-সেলের আকার, আর এটি দুদিকেই কাটে। ছোট সেল ধারালো ম্যাচ দেয় কিন্তু বেশি সীমানা-সার্চ ও বেশি index পরিবর্তন চাপায়—ইন্টারভিউতে ঠিক এই ট্রেড-অফটাই স্পষ্ট বলা উচিত।') },
        { table: {
          head: [l('Decision', 'সিদ্ধান্ত'), l('Option A', 'বিকল্প A'), l('Option B', 'বিকল্প B'), l('Trade-off', 'ট্রেড-অফ')],
          rows: [
            [l('Geo-cell size', 'geo-সেল আকার'), l('Small cell — precise, few candidates', 'ছোট সেল—নির্ভুল, কম candidate'), l('Large cell — more candidates, coarse', 'বড় সেল—বেশি candidate, মোটা'), l('Small raises boundary searches & index churn; large adds distance re-ranking work.', 'ছোট সীমানা-সার্চ ও index churn বাড়ায়; বড় দূরত্ব পুনঃ-র‍্যাঙ্কিং বাড়ায়।')],
            [l('Location store', 'লোকেশন স্টোর'), l('In-memory geo index (Redis)', 'ইন-মেমরি geo index (Redis)'), l('Durable SQL rows', 'টেকসই SQL রো'), l('Memory absorbs 250k writes/s but is volatile; SQL is durable but cannot take the load.', 'মেমরি ২৫০k রাইট/সে শুষে নেয় কিন্তু volatile; SQL টেকসই কিন্তু লোড নিতে পারে না।')],
            [l('Sharding key', 'শার্ডিং কী'), l('Shard by geography (region)', 'ভূগোল দিয়ে শার্ড (রিজিয়ন)'), l('Shard by driver id (hash)', 'ড্রাইভার id দিয়ে শার্ড (hash)'), l('Geo-sharding keeps a match in one shard; id-hashing scatters neighbours and forces fan-out.', 'geo-শার্ডিং ম্যাচকে এক শার্ডে রাখে; id-hash প্রতিবেশী ছড়ায় ও fan-out চাপায়।')],
            [l('Trip write', 'ট্রিপ রাইট'), l('Serialized single-driver assign', 'সিরিয়ালাইজড একক-ড্রাইভার অ্যাসাইন'), l('Optimistic parallel offers', 'অপটিমিস্টিক সমান্তরাল অফার'), l('Serializing prevents double-booking but adds a little latency at accept time.', 'সিরিয়ালাইজেশন ডাবল-বুকিং ঠেকায় কিন্তু accept-এ সামান্য latency যোগ করে।')],
          ],
        } },
        { note: l('Shard the location index by geography, not by driver id: a match only ever reads one small region, so geo-sharding keeps every search inside a single shard. Hashing by driver id would scatter neighbours across shards and force every match to fan out everywhere.', 'লোকেশন index ড্রাইভার id নয়, ভূগোল দিয়ে শার্ড করুন: একটি ম্যাচ শুধু একটি ছোট রিজিয়ন পড়ে, তাই geo-শার্ডিং প্রতিটি সার্চকে একটি শার্ডের ভেতরে রাখে। ড্রাইভার id দিয়ে hash করলে প্রতিবেশীরা নানা শার্ডে ছড়িয়ে পড়বে ও প্রতিটি ম্যাচকে সর্বত্র fan-out করতে হবে।'), kind: 'tip' },
      ],
    },
    {
      h: l('Common mistakes', 'সাধারণ ভুল'),
      blocks: [
        { list: [
          l('Persisting every GPS update through the transactional trip database — 250k durable writes/sec will crush it; keep live locations in memory and only persist the trip.', 'প্রতিটি GPS আপডেট ট্রানজ্যাকশনাল ট্রিপ ডেটাবেসে সংরক্ষণ করা—২৫০k টেকসই রাইট/সে একে গুঁড়িয়ে দেবে; লাইভ লোকেশন মেমরিতে রাখুন ও শুধু ট্রিপ persist করুন।'),
          l('Searching only the rider’s own cell and ignoring the 8 neighbours, so a driver right across a boundary is never matched.', 'শুধু রাইডারের নিজের সেল খোঁজা ও ৮টি প্রতিবেশী উপেক্ষা করা, ফলে সীমানার ঠিক ওপারের ড্রাইভার কখনো ম্যাচ হয় না।'),
          l('Ranking by straight-line distance instead of ETA, so you dispatch the car that is closest on the map but 20 minutes away by road.', 'ETA-র বদলে সরলরেখা দূরত্ব দিয়ে র‍্যাঙ্ক করা, ফলে ম্যাপে সবচেয়ে কাছের কিন্তু রাস্তায় ২০ মিনিট দূরের গাড়ি পাঠানো।'),
          l('Not serializing the accept step, letting two riders both "win" the same driver.', 'accept ধাপ সিরিয়ালাইজ না করা, দুই রাইডারকে একই ড্রাইভার "জিততে" দেওয়া।'),
        ] },
      ],
    },
    {
      h: l('Remember in one line', 'এক লাইনে মনে রাখুন'),
      blocks: [
        { list: [
          l('The write storm (250k location pings/sec) lives in an in-memory geo index; only accepted trips touch a durable database.', 'রাইট ঝড় (২৫০k লোকেশন পিং/সে) থাকে একটি ইন-মেমরি geo index-এ; শুধু গৃহীত ট্রিপ টেকসই ডেটাবেস ছোঁয়।'),
          l('Geohash (or quadtree) turns "nearest driver" from a million-point scan into a small neighbourhood lookup — always include the 8 neighbour cells.', 'geohash (বা quadtree) "কাছের ড্রাইভার"-কে দশ লক্ষ-বিন্দু স্ক্যান থেকে একটি ছোট প্রতিবেশী লুকআপে পরিণত করে—৮টি প্রতিবেশী সেল সবসময় যোগ করুন।'),
          l('Shard by geography, rank by ETA, and serialize the trip accept so one trip means exactly one driver.', 'ভূগোল দিয়ে শার্ড, ETA দিয়ে র‍্যাঙ্ক, ও ট্রিপ accept সিরিয়ালাইজ করুন যাতে এক ট্রিপ মানে ঠিক এক ড্রাইভার।'),
        ] },
      ],
    },
  ],

  // ── payments-orders · Design payments & order workflows ───────────────────
  'payments-orders': [
    {
      h: l('Requirements & scope', 'প্রয়োজন ও পরিসর'),
      blocks: [
        { p: l('A payments and orders system is where a business touches real money, so the rules are different from a normal CRUD app. The overriding requirement is correctness: no money may be created or destroyed, every rupee must be traceable, and charging a customer twice for one order is unacceptable even under retries and network failures.', 'একটি পেমেন্ট ও অর্ডার সিস্টেম হলো যেখানে একটি ব্যবসা বাস্তব টাকা ছোঁয়, তাই নিয়ম একটি সাধারণ CRUD অ্যাপের চেয়ে ভিন্ন। প্রধান প্রয়োজন হলো correctness: কোনো টাকা তৈরি বা ধ্বংস হবে না, প্রতিটি টাকা ট্রেসযোগ্য হতে হবে, এবং রিট্রাই ও নেটওয়ার্ক ব্যর্থতার মধ্যেও এক অর্ডারে গ্রাহককে দুবার চার্জ করা অগ্রহণযোগ্য।') },
        { list: [
          l('Functional — create an order; authorize a payment (a hold on funds); capture it (actually move the money); handle refunds and cancellations; reconcile against the payment provider; expose an auditable history.', 'Functional—অর্ডার তৈরি; পেমেন্ট authorize (তহবিলে hold); capture (আসলে টাকা সরানো); refund ও cancellation সামলানো; পেমেন্ট প্রোভাইডারের সঙ্গে reconcile; একটি auditable ইতিহাস দেখানো।'),
          l('Non-functional — strong correctness and durability over raw speed; every operation must be idempotent (safe to retry); the full money trail must be immutable and auditable; the order lifecycle must move through explicit, legal states only.', 'Non-functional—কাঁচা গতির চেয়ে শক্ত correctness ও durability; প্রতিটি অপারেশন idempotent হতে হবে (রিট্রাই নিরাপদ); পুরো টাকার হিসাব অপরিবর্তনীয় ও auditable হতে হবে; অর্ডার lifecycle শুধু স্পষ্ট, বৈধ state-এর মধ্য দিয়ে যাবে।'),
        ] },
        { note: l('Unlike a social feed where a lost like is forgivable, in payments a single wrong number is a real financial loss and a compliance problem. Design for "slow and always right," not "fast and usually right."', 'একটি সোশ্যাল ফিডে যেখানে একটি হারানো like ক্ষমাযোগ্য, পেমেন্টে সেখানে একটিমাত্র ভুল সংখ্যা একটি বাস্তব আর্থিক ক্ষতি ও কমপ্লায়েন্স সমস্যা। "ধীর কিন্তু সবসময় সঠিক"-এর জন্য ডিজাইন করুন, "দ্রুত কিন্তু সাধারণত সঠিক" নয়।'), kind: 'warn' },
      ],
    },
    {
      h: l('Estimation — throughput & the ledger’s growth', 'এস্টিমেশন — throughput ও ledger-এর বৃদ্ধি'),
      blocks: [
        { p: l('Payments volume is modest compared to something like ride pings, but each order fans out into several immutable ledger entries, and those entries are kept forever for audit. Size the write rate at peak (flash sales) and the append-only storage over time.', 'রাইড পিং-এর মতো কিছুর তুলনায় পেমেন্ট ভলিউম কম, কিন্তু প্রতিটি অর্ডার কয়েকটি অপরিবর্তনীয় ledger এন্ট্রিতে ছড়ায়, এবং সেই এন্ট্রি অডিটের জন্য চিরকাল রাখা হয়। পিক-এ (flash sale) রাইট রেট ও সময়ের সঙ্গে append-only স্টোরেজ হিসাব করুন।') },
        { code: `Assumptions
  Orders per day             : 5,000,000
  Ledger postings per order  : 4    (auth + capture, double-entry: 2 each)
  Avg ledger row size        : 300 bytes
  Peak factor (flash sale)   : 10x average

Write throughput
  5,000,000 / 86,400 s     = ~58 orders/sec   (average)
  58 x 10                  = ~580 orders/sec  (peak)
  580 x 4                  = ~2,320 ledger writes/sec (peak)

Append-only ledger storage per year
  5,000,000 x 365 x 4      = 7,300,000,000 rows/year
  7,300,000,000 x 300 B    = ~2.0 TB/year   (never updated, only appended)`, caption: l('~2,320 ledger writes/sec at peak is easily within a well-indexed SQL database; the real design pressure is the ~2 TB/year of immutable history that must stay queryable for audits.', 'পিক-এ ~২,৩২০ ledger রাইট/সে একটি ভালো-ইনডেক্সড SQL ডেটাবেসের নাগালেই; আসল ডিজাইন চাপ হলো ~২ TB/বছর অপরিবর্তনীয় ইতিহাস যা অডিটের জন্য queryable থাকতে হবে।') },
        { p: l('The takeaway: payments rarely need exotic scaling — a transactional SQL database handles thousands of writes per second fine. The engineering effort goes into correctness (idempotency, double-entry, reconciliation) and into managing an ever-growing immutable ledger, not into raw throughput.', 'সারমর্ম: পেমেন্টে কদাচিৎ বিদেশি স্কেলিং লাগে—একটি ট্রানজ্যাকশনাল SQL ডেটাবেস প্রতি সেকেন্ডে হাজার হাজার রাইট ভালোভাবে সামলায়। প্রকৌশল প্রচেষ্টা যায় correctness-এ (idempotency, double-entry, reconciliation) ও একটি ক্রমবর্ধমান অপরিবর্তনীয় ledger সামলাতে, কাঁচা throughput-এ নয়।') },
      ],
    },
    {
      h: l('High-level design', 'হাই-লেভেল ডিজাইন'),
      blocks: [
        { steps: [
          l('The client sends an order request carrying a unique idempotency key (for example a UUID it generated once); the same key is reused on every retry.', 'ক্লায়েন্ট একটি অনন্য idempotency key বহনকারী অর্ডার রিকোয়েস্ট পাঠায় (যেমন একবার তৈরি করা একটি UUID); প্রতিটি রিট্রাইতে একই key পুনঃব্যবহৃত হয়।'),
          l('An Order Service records the order and its state; the state machine is explicit (created → pending → paid → fulfilled, plus cancelled/refunded branches) and only legal transitions are allowed.', 'একটি Order Service অর্ডার ও তার state লিখে রাখে; state মেশিন স্পষ্ট (created → pending → paid → fulfilled, সঙ্গে cancelled/refunded শাখা) এবং শুধু বৈধ transition অনুমোদিত।'),
          l('A Payment Service talks to the external provider in two steps: authorize (reserve the funds) and later capture (move them), so you can cancel a reservation cheaply before capture.', 'একটি Payment Service বাহ্যিক প্রোভাইডারের সঙ্গে দুই ধাপে কথা বলে: authorize (তহবিল সংরক্ষণ) ও পরে capture (সরানো), তাই capture-এর আগে একটি সংরক্ষণ সস্তায় বাতিল করা যায়।'),
          l('Every monetary movement is written as immutable double-entry rows into an append-only ledger — debit one account, credit another, in the same transaction.', 'প্রতিটি অর্থ চলাচল একটি append-only ledger-এ অপরিবর্তনীয় double-entry রো হিসেবে লেখা হয়—একই ট্রানজ্যাকশনে একটি account debit, আরেকটি credit।'),
          l('Provider callbacks (webhooks) arrive asynchronously; a Reconciliation job continuously compares your ledger against the provider’s report and flags any mismatch.', 'প্রোভাইডার callback (webhook) অ্যাসিঙ্কভাবে আসে; একটি Reconciliation জব অবিরাম আপনার ledger-কে প্রোভাইডারের রিপোর্টের সঙ্গে তুলনা করে ও যেকোনো অমিল flag করে।'),
        ] },
      ],
    },
    {
      h: l('Deep dive — consistency, idempotency & ledgers', 'গভীর ডাইভ — consistency, idempotency ও ledger'),
      blocks: [
        { p: l('Three ideas carry the correctness of the whole system. Get these right and the rest is plumbing.', 'তিনটি ধারণা পুরো সিস্টেমের correctness বহন করে। এগুলো ঠিক করুন, বাকিটা নিছক নলকাজ।') },
        { list: [
          l('Idempotency — the client sends a key with each request; the server records "this key was processed" atomically with the effect. A retried request with a seen key returns the original result instead of charging again. This is what makes a flaky network safe.', 'Idempotency—ক্লায়েন্ট প্রতিটি রিকোয়েস্টে একটি key পাঠায়; সার্ভার প্রভাবের সঙ্গে অ্যাটমিকভাবে "এই key প্রসেস হয়েছে" লেখে। দেখা key-সহ একটি রিট্রাই আবার চার্জ না করে মূল ফলাফল ফেরত দেয়। এটিই একটি অস্থির নেটওয়ার্ককে নিরাপদ করে।'),
          l('Immutable double-entry ledger — never update a mutable "balance" field. Instead append a debit and an equal credit for every event; the balance is the sum of all rows. Corrections are new reversing entries, never edits, so history is always intact and auditable.', 'অপরিবর্তনীয় double-entry ledger—কখনো একটি পরিবর্তনযোগ্য "balance" ফিল্ড আপডেট করবেন না। বরং প্রতিটি ইভেন্টের জন্য একটি debit ও একটি সমান credit যোগ করুন; balance হলো সব রো-র যোগফল। সংশোধন হলো নতুন reversing এন্ট্রি, কখনো edit নয়, তাই ইতিহাস সবসময় অক্ষত ও auditable।'),
          l('Reconciliation — your system and the payment provider are two separate databases that can drift (a webhook is lost, a capture times out). A scheduled job matches both sides transaction by transaction and surfaces gaps for a human or an automated fix.', 'Reconciliation—আপনার সিস্টেম ও পেমেন্ট প্রোভাইডার দুটি আলাদা ডেটাবেস যা সরে যেতে পারে (একটি webhook হারায়, একটি capture টাইম-আউট হয়)। একটি নির্ধারিত জব দুই দিককে ট্রানজ্যাকশন ধরে ধরে মিলায় ও ফাঁকগুলো মানুষ বা স্বয়ংক্রিয় সংশোধনের জন্য তুলে ধরে।'),
        ] },
        { code: `-- Double-entry: a captured payment is TWO rows, summing to zero
-- (money is moved, never created)
INSERT INTO ledger (txn_id, account,          direction, amount)
VALUES             ('t_92', 'customer_wallet', 'debit',   1000),
                   ('t_92', 'merchant_payable','credit',  1000);

-- Balance is derived, not stored:
--   SELECT SUM(CASE WHEN direction='credit' THEN amount ELSE -amount END)
--   FROM ledger WHERE account = 'merchant_payable';`, caption: l('Each event is balanced debit/credit rows that net to zero, and the balance is computed by summing rows — so no single UPDATE can silently corrupt a total.', 'প্রতিটি ইভেন্ট হলো সমতুল্য debit/credit রো যা শূন্যে মেলে, আর balance রো যোগ করে হিসাব হয়—তাই কোনো একক UPDATE নীরবে মোট নষ্ট করতে পারে না।') },
        { note: l('Combine an idempotency key with a state machine that rejects illegal transitions and you get defence in depth: even a duplicated webhook or a double-clicked "Pay" button cannot move an already-paid order into "paid" a second time.', 'একটি idempotency key-এর সঙ্গে অবৈধ transition প্রত্যাখ্যানকারী একটি state মেশিন যোগ করলে আপনি স্তরে-স্তরে প্রতিরক্ষা পান: একটি ডুপ্লিকেট webhook বা দুবার-ক্লিক করা "Pay" বোতামও একটি already-paid অর্ডারকে দ্বিতীয়বার "paid"-এ নিতে পারে না।'), kind: 'tip' },
      ],
    },
    {
      h: l('Scaling & trade-offs', 'স্কেলিং ও ট্রেড-অফ'),
      blocks: [
        { p: l('Here you deliberately trade speed for certainty. The table names the choices that keep money correct, and what each one costs.', 'এখানে আপনি ইচ্ছাকৃতভাবে গতির বদলে নিশ্চয়তা নেন। টেবিলটি টাকা সঠিক রাখা পছন্দগুলো ও প্রতিটির খরচ বলে।') },
        { table: {
          head: [l('Decision', 'সিদ্ধান্ত'), l('Choice', 'পছন্দ'), l('Why', 'কেন'), l('Cost', 'খরচ')],
          rows: [
            [l('Balance model', 'balance মডেল'), l('Append-only ledger, derived balance', 'append-only ledger, derived balance'), l('Full audit trail; corrections are reversals, not edits.', 'পূর্ণ audit trail; সংশোধন reversal, edit নয়।'), l('Storage grows forever; balances are computed or snapshotted.', 'স্টোরেজ চিরকাল বাড়ে; balance হিসাব বা snapshot করতে হয়।')],
            [l('Consistency', 'consistency'), l('Strong (single-node SQL transaction)', 'শক্ত (single-node SQL ট্রানজ্যাকশন)'), l('Money must never be double-spent or lost.', 'টাকা কখনো double-spend বা হারানো চলবে না।'), l('Harder to scale horizontally than eventual consistency.', 'eventual consistency-র চেয়ে horizontally স্কেল করা কঠিন।')],
            [l('Provider calls', 'প্রোভাইডার কল'), l('Authorize then capture', 'authorize তারপর capture'), l('Reserve funds early, commit only on fulfilment.', 'তহবিল আগে সংরক্ষণ, শুধু fulfilment-এ commit।'), l('A two-step flow with more states to manage.', 'বেশি state সামলানো দুই-ধাপ ফ্লো।')],
            [l('Sync vs async', 'sync বনাম async'), l('Capture inline, reconcile async', 'capture inline, reconcile async'), l('User gets a fast answer; drift is caught later.', 'ব্যবহারকারী দ্রুত উত্তর পায়; drift পরে ধরা পড়ে।'), l('Needs a reliable reconciliation job and alerting.', 'একটি নির্ভরযোগ্য reconciliation জব ও alert দরকার।')],
          ],
        } },
      ],
    },
    {
      h: l('Common mistakes', 'সাধারণ ভুল'),
      blocks: [
        { list: [
          l('Updating a mutable balance column instead of appending an immutable transaction history — one bad write silently corrupts the total with no trail to recover it.', 'অপরিবর্তনীয় ট্রানজ্যাকশন ইতিহাস যোগ না করে একটি পরিবর্তনযোগ্য balance কলাম আপডেট করা—একটি খারাপ রাইট নীরবে মোট নষ্ট করে, ফেরানোর কোনো চিহ্ন থাকে না।'),
          l('Skipping idempotency keys, so a retry after a timeout charges the customer a second time.', 'idempotency key বাদ দেওয়া, ফলে টাইম-আউটের পর একটি রিট্রাই গ্রাহককে দ্বিতীয়বার চার্জ করে।'),
          l('Trusting the provider and never reconciling, so lost webhooks leave your ledger permanently out of sync with reality.', 'প্রোভাইডারকে বিশ্বাস করে কখনো reconcile না করা, ফলে হারানো webhook আপনার ledger-কে বাস্তবতার সঙ্গে স্থায়ীভাবে অমিল রাখে।'),
          l('Treating money as a float; use integer minor units (paisa/cents) or a decimal type, never binary floating point.', 'টাকাকে float ধরা; integer ছোট একক (পয়সা/সেন্ট) বা একটি decimal টাইপ ব্যবহার করুন, কখনো binary floating point নয়।'),
        ] },
      ],
    },
    {
      h: l('Remember in one line', 'এক লাইনে মনে রাখুন'),
      blocks: [
        { list: [
          l('Correctness beats speed: an immutable double-entry ledger is the source of truth, and the balance is derived from it.', 'correctness গতিকে হারায়: একটি অপরিবর্তনীয় double-entry ledger হলো সত্যের উৎস, আর balance তা থেকে derived।'),
          l('Idempotency keys plus an explicit state machine make retries and duplicate callbacks safe.', 'idempotency key ও একটি স্পষ্ট state মেশিন রিট্রাই ও ডুপ্লিকেট callback-কে নিরাপদ করে।'),
          l('Authorize then capture, and always reconcile against the provider — never assume the two ledgers agree.', 'authorize তারপর capture, এবং সবসময় প্রোভাইডারের সঙ্গে reconcile করুন—কখনো ধরে নেবেন না দুই ledger একমত।'),
        ] },
      ],
    },
  ],

  // ── multi-region · Multi-region architecture & disaster recovery ──────────
  'multi-region': [
    {
      h: l('What is multi-region architecture?', 'মাল্টি-রিজিয়ন আর্কিটেকচার কী?'),
      blocks: [
        { p: l('Multi-region architecture means running your system in more than one geographic region (say Singapore and Frankfurt) instead of a single data-centre location. Teams do this for three reasons: to put servers closer to users and cut latency, to survive the failure of an entire region, and sometimes to satisfy data-residency laws that require a country’s data to stay inside its borders.', 'মাল্টি-রিজিয়ন আর্কিটেকচার মানে একটি ডেটা-সেন্টার অবস্থানের বদলে একাধিক ভৌগোলিক রিজিয়নে (ধরুন সিঙ্গাপুর ও ফ্রাঙ্কফুর্ট) আপনার সিস্টেম চালানো। টিম এটি তিন কারণে করে: সার্ভার ব্যবহারকারীর কাছে এনে latency কমাতে, একটি পুরো রিজিয়নের ব্যর্থতা টিকে থাকতে, আর কখনো data-residency আইন মানতে যা একটি দেশের ডেটা তার সীমানার ভেতরে রাখতে বলে।') },
        { p: l('Closely tied to it is disaster recovery (DR): the plan and machinery for bringing the system back after a region-wide outage — a flood, a fibre cut, a cloud-provider zone failure. Multi-region is one of the strongest DR strategies, because a second live region is a recovery target that already exists.', 'এর সঙ্গে ঘনিষ্ঠভাবে যুক্ত disaster recovery (DR): একটি রিজিয়ন-ব্যাপী outage-এর পর সিস্টেম ফিরিয়ে আনার পরিকল্পনা ও যন্ত্রপাতি—একটি বন্যা, একটি ফাইবার কাটা, একটি cloud-provider zone ব্যর্থতা। মাল্টি-রিজিয়ন সবচেয়ে শক্তিশালী DR কৌশলগুলোর একটি, কারণ একটি দ্বিতীয় লাইভ রিজিয়ন একটি recovery target যা ইতিমধ্যে বিদ্যমান।') },
        { note: l('Think of independent emergency shelters in different towns. Each needs current supplies (replicated data), practised evacuation routes (a tested failover), and clear rules for who takes charge when the main shelter is cut off (leader election). A shelter you have never actually run a drill in is not really a backup.', 'ভিন্ন শহরে স্বাধীন জরুরি আশ্রয় ভাবুন। প্রতিটির দরকার বর্তমান সরবরাহ (রেপ্লিকেটেড ডেটা), অনুশীলিত সরিয়ে-নেওয়ার পথ (একটি tested failover), এবং মূল আশ্রয় বিচ্ছিন্ন হলে কে দায়িত্ব নেবে তার স্পষ্ট নিয়ম (leader election)। যে আশ্রয়ে আপনি কখনো সত্যিকারের মহড়া চালাননি তা আসলে backup নয়।'), kind: 'tip' },
      ],
    },
    {
      h: l('How it works — RPO, RTO & failover', 'কীভাবে কাজ করে — RPO, RTO ও failover'),
      blocks: [
        { p: l('Two numbers define any DR plan, and every design choice is really a way of buying smaller values for them.', 'দুটি সংখ্যা যেকোনো DR পরিকল্পনা সংজ্ঞায়িত করে, আর প্রতিটি ডিজাইন পছন্দ আসলে এদের ছোট মান কেনার উপায়।') },
        { list: [
          l('RPO (Recovery Point Objective) — how much recent data you can afford to lose, measured in time. RPO of 5 minutes means an outage may cost up to the last 5 minutes of writes. It is set by how often and how synchronously you replicate.', 'RPO (Recovery Point Objective)—সময়ে মাপা, কত সাম্প্রতিক ডেটা হারানো আপনি সইতে পারেন। ৫ মিনিটের RPO মানে একটি outage সর্বশেষ ৫ মিনিটের রাইট পর্যন্ত খরচ করতে পারে। আপনি কত ঘন ও কত synchronously রেপ্লিকেট করেন তা এটি ঠিক করে।'),
          l('RTO (Recovery Time Objective) — how long you can be down before you are back up. RTO of 1 minute means traffic must be serving from the healthy region within a minute of the failure.', 'RTO (Recovery Time Objective)—ফিরে আসার আগে কতক্ষণ down থাকতে পারেন। ১ মিনিটের RTO মানে ব্যর্থতার এক মিনিটের মধ্যে ট্রাফিক সুস্থ রিজিয়ন থেকে পরিবেশিত হতে হবে।'),
        ] },
        { steps: [
          l('Pick a topology per workload: active-passive (one region serves, another stands by) or active-active (both serve traffic at once).', 'প্রতি ওয়ার্কলোডে একটি topology বাছুন: active-passive (এক রিজিয়ন পরিবেশন করে, আরেকটি standby) বা active-active (দুটোই একসঙ্গে ট্রাফিক দেয়)।'),
          l('Replicate data between regions — synchronously for the smallest RPO (but higher write latency) or asynchronously for speed (but you may lose the last few seconds on failover).', 'রিজিয়নের মধ্যে ডেটা রেপ্লিকেট করুন—সবচেয়ে ছোট RPO-র জন্য synchronously (কিন্তু বেশি রাইট latency) বা গতির জন্য asynchronously (কিন্তু failover-এ সর্বশেষ কয়েক সেকেন্ড হারাতে পারেন)।'),
          l('Health-check each region continuously and route users with a global load balancer or DNS that can steer traffic away from a sick region.', 'প্রতিটি রিজিয়ন অবিরাম health-check করুন এবং একটি global load balancer বা DNS দিয়ে ব্যবহারকারীদের রাউট করুন যা একটি অসুস্থ রিজিয়ন থেকে ট্রাফিক সরাতে পারে।'),
          l('On failure, execute failover: promote the standby (or shift all traffic to the surviving active region), and elect a single writer so two regions never both think they are in charge.', 'ব্যর্থতায় failover চালান: standby-কে promote করুন (বা সব ট্রাফিক টিকে থাকা active রিজিয়নে সরান), এবং একটি একক writer নির্বাচন করুন যাতে দুই রিজিয়ন কখনো দুজনেই নিজেকে দায়িত্বে না ভাবে।'),
          l('Regularly rehearse the whole thing — actually restore data and shift live traffic — because an untested DR plan is a guess, not a guarantee.', 'পুরো ব্যাপারটা নিয়মিত মহড়া দিন—আসলে ডেটা রিস্টোর ও লাইভ ট্রাফিক সরান—কারণ একটি untested DR পরিকল্পনা একটি অনুমান, গ্যারান্টি নয়।'),
        ] },
      ],
    },
    {
      h: l('Active-active vs active-passive', 'active-active বনাম active-passive'),
      blocks: [
        { p: l('The core topology choice trades cost and complexity against how fast and cleanly you recover. Choose per workload, not once for the whole company.', 'মূল topology পছন্দ খরচ ও জটিলতাকে আপনি কত দ্রুত ও পরিষ্কারভাবে recover করেন তার বিপরীতে ট্রেড করে। পুরো কোম্পানির জন্য একবার নয়, প্রতি ওয়ার্কলোডে বাছুন।') },
        { table: {
          head: [l('Aspect', 'দিক'), l('Active-passive', 'active-passive'), l('Active-active', 'active-active')],
          rows: [
            [l('Traffic', 'ট্রাফিক'), l('One region serves; the other waits.', 'এক রিজিয়ন পরিবেশন করে; অন্যটি অপেক্ষা করে।'), l('Both regions serve users at the same time.', 'দুই রিজিয়ন একসঙ্গে ব্যবহারকারী পরিবেশন করে।')],
            [l('RTO', 'RTO'), l('Higher — you must promote the standby first.', 'বেশি—আগে standby promote করতে হয়।'), l('Near-zero — the other region is already live.', 'প্রায়-শূন্য—অন্য রিজিয়ন ইতিমধ্যে লাইভ।')],
            [l('Cost', 'খরচ'), l('Cheaper — standby can be smaller or idle.', 'সস্তা—standby ছোট বা idle হতে পারে।'), l('Expensive — full capacity running in both.', 'ব্যয়বহুল—দুটোতেই পূর্ণ ক্ষমতা চলছে।')],
            [l('Complexity', 'জটিলতা'), l('Simpler — one writer, one-way replication.', 'সরল—এক writer, একমুখী রেপ্লিকেশন।'), l('Hard — concurrent writes risk conflicts.', 'কঠিন—concurrent রাইটে conflict-এর ঝুঁকি।')],
            [l('Best for', 'কার জন্য'), l('Most systems; strong-consistency databases.', 'বেশিরভাগ সিস্টেম; strong-consistency ডেটাবেস।'), l('Global low-latency apps that can tolerate conflict resolution.', 'গ্লোবাল low-latency অ্যাপ যা conflict resolution সইতে পারে।')],
          ],
        } },
        { note: l('Active-active sounds ideal but hides a hard problem: if both regions accept writes to the same record, you get conflicts. You then need either partitioned ownership (each region owns certain data), conflict-free data types (CRDTs), or a single elected writer — none of which are free.', 'active-active আদর্শ শোনায় কিন্তু একটি কঠিন সমস্যা লুকায়: দুই রিজিয়ন একই record-এ রাইট গ্রহণ করলে conflict হয়। তখন হয় partitioned ownership (প্রতি রিজিয়ন নির্দিষ্ট ডেটার মালিক), conflict-free ডেটা টাইপ (CRDT), বা একটি একক নির্বাচিত writer লাগে—কোনোটিই বিনামূল্যে নয়।'), kind: 'warn' },
      ],
    },
    {
      h: l('When & where to go multi-region', 'কখন ও কোথায় মাল্টি-রিজিয়ন যাবেন'),
      blocks: [
        { p: l('Multi-region is powerful but expensive, so it is a decision to justify with numbers, not to reach for by default. The question is always whether the cost of an outage, the pain of latency, or a legal mandate is large enough to pay for a second live footprint.', 'মাল্টি-রিজিয়ন শক্তিশালী কিন্তু ব্যয়বহুল, তাই এটি সংখ্যা দিয়ে যুক্তিসঙ্গত করার সিদ্ধান্ত, ডিফল্টে হাত বাড়ানোর নয়। প্রশ্ন সবসময় হলো একটি outage-এর খরচ, latency-র যন্ত্রণা, বা একটি আইনি বাধ্যবাধকতা একটি দ্বিতীয় লাইভ উপস্থিতির দাম দেওয়ার মতো যথেষ্ট বড় কিনা।') },
        { list: [
          l('Go multi-region when downtime is genuinely expensive (payments, healthcare, large-scale commerce), when users are spread across continents and latency hurts, or when law forces data to stay in a region.', 'মাল্টি-রিজিয়ন যান যখন downtime সত্যিই ব্যয়বহুল (পেমেন্ট, স্বাস্থ্যসেবা, বড় বাণিজ্য), ব্যবহারকারী মহাদেশজুড়ে ছড়ানো ও latency ব্যথা দেয়, বা আইন ডেটা একটি রিজিয়নে রাখতে বাধ্য করে।'),
          l('For most early-stage products, multi-AZ (multiple data centres within one region) already survives the common failures at a fraction of the cost and complexity — reach for full multi-region only when the numbers justify it.', 'বেশিরভাগ প্রারম্ভিক প্রোডাক্টের জন্য multi-AZ (এক রিজিয়নের ভেতরে একাধিক ডেটা সেন্টার) সাধারণ ব্যর্থতাগুলো ভগ্নাংশ খরচ ও জটিলতায় টিকে যায়—সংখ্যা যুক্তি দিলে তবেই পূর্ণ মাল্টি-রিজিয়নে যান।'),
          l('Match the tier to the value: cheap cold backups for archival data, warm standby for important services, and full active-active only for the few workloads that truly cannot blink.', 'মূল্যের সঙ্গে tier মেলান: আর্কাইভাল ডেটায় সস্তা cold backup, গুরুত্বপূর্ণ সেবায় warm standby, আর সত্যিই থামতে-না-পারা অল্প কিছু ওয়ার্কলোডেই পূর্ণ active-active।'),
        ] },
      ],
    },
    {
      h: l('Common mistakes', 'সাধারণ ভুল'),
      blocks: [
        { list: [
          l('Claiming disaster recovery without ever restoring data or shifting traffic in a drill — the first real test then happens during the real disaster.', 'একটি মহড়ায় কখনো ডেটা রিস্টোর বা ট্রাফিক না সরিয়ে disaster recovery দাবি করা—প্রথম আসল পরীক্ষা তখন আসল বিপর্যয়ের সময়েই ঘটে।'),
          l('Choosing active-active for the prestige and then discovering write conflicts you have no strategy to resolve.', 'মর্যাদার জন্য active-active বেছে তারপর write conflict আবিষ্কার করা যা সমাধানের কোনো কৌশল নেই।'),
          l('Replicating the database but forgetting everything else a region needs to actually serve — secrets, config, DNS, TLS certs, container images.', 'ডেটাবেস রেপ্লিকেট করে একটি রিজিয়নের আসলে পরিবেশনের জন্য দরকারি বাকি সব ভুলে যাওয়া—secret, config, DNS, TLS cert, container image।'),
          l('Setting an aggressive RPO/RTO on paper without paying for the synchronous replication and standby capacity that make it real.', 'কাগজে আক্রমণাত্মক RPO/RTO ঠিক করে তা বাস্তব করার synchronous রেপ্লিকেশন ও standby ক্ষমতার দাম না দেওয়া।'),
        ] },
      ],
    },
    {
      h: l('Remember in one line', 'এক লাইনে মনে রাখুন'),
      blocks: [
        { list: [
          l('Multi-region buys lower latency and survival of a whole-region failure — at real cost and coordination.', 'মাল্টি-রিজিয়ন কম latency ও পুরো-রিজিয়ন ব্যর্থতা টিকে থাকা কেনে—বাস্তব খরচ ও সমন্বয়ের বিনিময়ে।'),
          l('RPO is data you may lose, RTO is time you may be down; smaller values cost sharply more.', 'RPO হলো যে ডেটা হারাতে পারেন, RTO হলো যে সময় down থাকতে পারেন; ছোট মানের দাম দ্রুত বাড়ে।'),
          l('A DR plan you have not rehearsed is not a plan — pick active-active vs active-passive per workload and drill it.', 'যে DR পরিকল্পনা মহড়া দেননি তা পরিকল্পনা নয়—প্রতি ওয়ার্কলোডে active-active বনাম active-passive বাছুন ও মহড়া দিন।'),
        ] },
      ],
    },
  ],

  // ── cost-capacity · Capacity planning, cost & sustainability ──────────────
  'cost-capacity': [
    {
      h: l('What is capacity planning & cost engineering?', 'ক্যাপাসিটি প্ল্যানিং ও কস্ট ইঞ্জিনিয়ারিং কী?'),
      blocks: [
        { p: l('Capacity planning is deciding how much compute, memory, storage, and bandwidth your system needs to meet demand — with enough spare headroom to survive spikes — without buying so much that you burn money on idle machines. Cost engineering is the discipline of connecting those capacity decisions to a dollar figure and to the energy the system consumes, so architecture is judged not only by whether it works but by what it costs to run.', 'ক্যাপাসিটি প্ল্যানিং হলো আপনার সিস্টেমের চাহিদা মেটাতে কত compute, memory, storage ও bandwidth লাগবে তা ঠিক করা—স্পাইক টিকে থাকতে যথেষ্ট বাড়তি headroom-সহ—কিন্তু এত বেশি না কিনে যে idle মেশিনে টাকা পোড়ে। কস্ট ইঞ্জিনিয়ারিং হলো সেই ক্যাপাসিটি সিদ্ধান্তগুলোকে একটি টাকার অঙ্ক ও সিস্টেমের খরচ করা শক্তির সঙ্গে যুক্ত করার শৃঙ্খলা, যাতে আর্কিটেকচার শুধু কাজ করে কিনা নয়, চালাতে কত খরচ তা দিয়েও বিচার হয়।') },
        { p: l('In the cloud, capacity is elastic and billed by the second, which changes the game: over-provisioning is no longer a one-time hardware purchase but a bill that arrives every month forever. So a good production architecture ties together demand forecasts, headroom, unit economics, scaling signals, and raw resource efficiency.', 'ক্লাউডে ক্যাপাসিটি স্থিতিস্থাপক ও সেকেন্ডে বিল হয়, যা খেলা বদলায়: over-provisioning আর একবারের হার্ডওয়্যার কেনা নয়, বরং একটি বিল যা চিরকাল প্রতি মাসে আসে। তাই একটি ভালো প্রোডাকশন আর্কিটেকচার চাহিদার পূর্বাভাস, headroom, unit economics, scaling signal ও কাঁচা resource দক্ষতা একসঙ্গে বাঁধে।') },
        { note: l('A hotel plans rooms for ordinary nights, festival surges, and rooms closed for maintenance — while paying for every empty bed. Too few rooms and guests are turned away (dropped requests); too many and the owner pays for beds nobody sleeps in (wasted spend). Capacity planning is running that hotel well.', 'একটি হোটেল সাধারণ রাত, উৎসবের ঢল, ও রক্ষণাবেক্ষণে বন্ধ রুম ধরে পরিকল্পনা করে—প্রতিটি খালি বিছানার দাম দিতে দিতে। খুব কম রুম হলে অতিথি ফিরে যায় (dropped রিকোয়েস্ট); খুব বেশি হলে মালিক কেউ না-ঘুমানো বিছানার দাম দেয় (অপচয়)। ক্যাপাসিটি প্ল্যানিং হলো সেই হোটেল ভালোভাবে চালানো।'), kind: 'tip' },
      ],
    },
    {
      h: l('How it works — from forecast to headroom', 'কীভাবে কাজ করে — পূর্বাভাস থেকে headroom'),
      blocks: [
        { p: l('Capacity planning is a loop, not a one-time calculation: you predict demand, measure what one unit can really handle, provision for the peak with a margin, then keep correcting as reality drifts. The steps below are that loop, and skipping any one of them is how teams end up either paying for idle machines or falling over during a spike.', 'ক্যাপাসিটি প্ল্যানিং একটি লুপ, একবারের হিসাব নয়: আপনি চাহিদা অনুমান করেন, একটি ইউনিট আসলে কতটা সামলায় মাপেন, একটি মার্জিনসহ পিকের জন্য provision করেন, তারপর বাস্তবতা সরার সঙ্গে সংশোধন করতে থাকেন। নিচের ধাপগুলো সেই লুপ, আর এর যেকোনো একটি বাদ দেওয়াই টিমগুলোকে হয় idle মেশিনের দাম দেওয়ায় বা একটি স্পাইকে ভেঙে পড়ায়।') },
        { steps: [
          l('Forecast demand — project traffic from history and known events (a sale, a launch), and separate steady baseline load from short bursts.', 'চাহিদা পূর্বাভাস দিন—ইতিহাস ও জানা ঘটনা (একটি sale, একটি launch) থেকে ট্রাফিক আন্দাজ করুন, এবং স্থির baseline লোডকে ছোট burst থেকে আলাদা করুন।'),
          l('Load-test to find the ceiling — measure how many requests per second one instance handles before latency degrades; that is your real per-unit capacity, not the vendor’s brochure.', 'সিলিং খুঁজতে load-test করুন—latency খারাপ হওয়ার আগে একটি instance প্রতি সেকেন্ডে কত রিকোয়েস্ট সামলায় মাপুন; সেটাই আপনার আসল per-unit ক্ষমতা, ভেন্ডরের ব্রোশিওর নয়।'),
          l('Add tested headroom — keep a deliberate margin (often 30–50%) above expected peak so a spike or a failed node does not tip you over. Headroom you have never load-tested is a hope, not a margin.', 'পরীক্ষিত headroom যোগ করুন—প্রত্যাশিত পিকের ওপর একটি সচেতন মার্জিন (প্রায়ই ৩০–৫০%) রাখুন যাতে একটি স্পাইক বা ব্যর্থ node আপনাকে উল্টে না দেয়। যে headroom কখনো load-test করেননি তা আশা, মার্জিন নয়।'),
          l('Right-size continuously — real usage drifts, so revisit instance types and counts regularly and shrink what is over-provisioned; last quarter’s size is rarely this quarter’s.', 'নিয়মিত right-size করুন—আসল ব্যবহার সরে যায়, তাই instance টাইপ ও সংখ্যা নিয়মিত পুনর্বিবেচনা করুন ও over-provisioned যা তা ছোট করুন; গত ত্রৈমাসিকের আকার কদাচিৎ এই ত্রৈমাসিকের।'),
          l('Autoscale on the right signal — scale on queue depth, latency, or requests in flight, and account for startup time, not on CPU alone.', 'সঠিক signal-এ autoscale করুন—queue depth, latency বা in-flight রিকোয়েস্টে স্কেল করুন এবং startup সময় ধরুন, শুধু CPU-তে নয়।'),
        ] },
        { code: `Right-sizing from measured capacity
  Peak demand              : 12,000 requests/sec
  Tested capacity / node   : 1,000 requests/sec
  Nodes for peak           : 12,000 / 1,000 = 12 nodes
  + 40% headroom           : 12 x 1.4       = ~17 nodes

Unit economics
  Node cost                : $0.10 / hour
  Fleet cost               : 17 x $0.10 x 24 x 30 = ~$1,224 / month
  Useful requests / month  : 12,000 x 60 x 60 x 24 x 30 = ~31.1 billion
  Cost per million requests: 1,224 / 31,100 = ~$0.039`, caption: l('Turning capacity into a cost-per-request makes the trade-off concrete: you can now see exactly what 40% headroom costs and whether a spike is worth paying to survive.', 'ক্যাপাসিটিকে cost-per-request-এ পরিণত করলে ট্রেড-অফ বাস্তব হয়: এখন আপনি ঠিক দেখতে পান ৪০% headroom-এর খরচ কত ও একটি স্পাইক টিকে থাকার দাম দেওয়ার যোগ্য কিনা।') },
      ],
    },
    {
      h: l('Cost levers you can pull', 'যে cost lever টানতে পারেন'),
      blocks: [
        { p: l('Cost is not one number to shrink blindly; it is a set of levers, each with a trade-off. The table lists the main ones and what you give up by pulling them.', 'খরচ অন্ধভাবে কমানোর একটি সংখ্যা নয়; এটি lever-এর একটি সেট, প্রতিটির একটি ট্রেড-অফ। টেবিলটি প্রধানগুলো ও টানলে কী ছাড়েন তা তালিকাভুক্ত করে।') },
        { table: {
          head: [l('Lever', 'lever'), l('What it does', 'কী করে'), l('Trade-off', 'ট্রেড-অফ')],
          rows: [
            [l('Right-sizing', 'right-sizing'), l('Match instance size to measured need.', 'measured প্রয়োজনের সঙ্গে instance আকার মেলায়।'), l('Too tight leaves no room for spikes.', 'বেশি আঁটসাঁট স্পাইকের জায়গা রাখে না।')],
            [l('Autoscaling', 'autoscaling'), l('Add/remove capacity with demand.', 'চাহিদার সঙ্গে ক্ষমতা যোগ/বাদ।'), l('Cold-start lag; scales late if the signal is wrong.', 'cold-start দেরি; signal ভুল হলে দেরিতে স্কেল।')],
            [l('Reserved / spot', 'reserved / spot'), l('Commit or use spare capacity for big discounts.', 'কমিট বা বাড়তি ক্ষমতা নিয়ে বড় ছাড়।'), l('Reserved locks you in; spot can be reclaimed anytime.', 'reserved আটকে রাখে; spot যেকোনো সময় ফিরিয়ে নেওয়া হয়।')],
            [l('Baseline vs burst', 'baseline বনাম burst'), l('Reserve the steady base, burst on-demand.', 'স্থির base রিজার্ভ, burst on-demand।'), l('Needs accurate separation of the two.', 'দুটির নির্ভুল বিভাজন দরকার।')],
            [l('Caching / CDN', 'caching / CDN'), l('Serve repeat work without recomputing.', 'পুনঃগণনা ছাড়া বারবার কাজ পরিবেশন।'), l('Stale-data risk; another system to run.', 'পুরনো-ডেটার ঝুঁকি; চালানোর আরেকটি সিস্টেম।')],
            [l('Efficient code / storage tiers', 'দক্ষ কোড / storage tier'), l('Do the same work on fewer resources; move cold data to cheap tiers.', 'কম resource-এ একই কাজ; ঠান্ডা ডেটা সস্তা tier-এ।'), l('Engineering time; slower access to archived data.', 'প্রকৌশল সময়; আর্কাইভড ডেটায় ধীর access।')],
          ],
        } },
      ],
    },
    {
      h: l('When & where it matters most', 'কোথায় ও কখন সবচেয়ে জরুরি'),
      blocks: [
        { list: [
          l('At scale, small per-request waste multiplies into a huge bill; a 20% saving on cost-per-request across billions of requests dwarfs almost any single feature’s value.', 'বড় স্কেলে, প্রতি-রিকোয়েস্টে সামান্য অপচয় বিশাল বিলে গুণিত হয়; কোটি কোটি রিকোয়েস্টে cost-per-request-এ ২০% সাশ্রয় প্রায় যেকোনো একক ফিচারের মূল্যকে ছাপিয়ে যায়।'),
          l('Track cost per useful request (or per order, per user) rather than the raw monthly total — a rising total is fine if the business grew faster than it; a rising per-unit cost is the real warning.', 'কাঁচা মাসিক মোটের বদলে প্রতি কার্যকর রিকোয়েস্টের (বা প্রতি অর্ডার, প্রতি ব্যবহারকারী) খরচ ট্র্যাক করুন—মোট বাড়া ঠিক আছে যদি ব্যবসা তার চেয়ে দ্রুত বাড়ে; per-unit খরচ বাড়াই আসল সতর্কবার্তা।'),
          l('Sustainability rides along with cost: fewer idle machines means less wasted energy, so right-sizing is both a cheaper and a greener decision.', 'সাসটেইনেবিলিটি খরচের সঙ্গে চলে: কম idle মেশিন মানে কম অপচয়ী শক্তি, তাই right-sizing একইসঙ্গে সস্তা ও সবুজ সিদ্ধান্ত।'),
        ] },
      ],
    },
    {
      h: l('Common mistakes', 'সাধারণ ভুল'),
      blocks: [
        { list: [
          l('Autoscaling on CPU alone while ignoring queue depth, latency, and startup time, so the system scales up long after users already feel the slowdown.', 'queue depth, latency ও startup সময় উপেক্ষা করে শুধু CPU-তে autoscale করা, ফলে ব্যবহারকারীরা ধীরগতি টের পাওয়ার অনেক পরে সিস্টেম স্কেল-আপ করে।'),
          l('Keeping huge safety margins "to be safe" — they cut incidents but quietly waste money and energy every hour of every day.', '"নিরাপদ থাকতে" বিশাল safety margin রাখা—এগুলো ঘটনা কমায় কিন্তু প্রতিদিন প্রতি ঘণ্টায় নীরবে টাকা ও শক্তি অপচয় করে।'),
          l('Planning for average load and getting crushed at peak, or planning only for peak and paying for that capacity 24/7 when the peak lasts an hour.', 'গড় লোডের জন্য পরিকল্পনা করে পিক-এ গুঁড়িয়ে যাওয়া, বা শুধু পিকের জন্য পরিকল্পনা করে সেই ক্ষমতার দাম ২৪/৭ দেওয়া যখন পিক এক ঘণ্টা থাকে।'),
          l('Never load-testing, so the "capacity per instance" used in every calculation is a guess that reality disproves during an incident.', 'কখনো load-test না করা, ফলে প্রতিটি হিসাবে ব্যবহৃত "per-instance ক্ষমতা" একটি অনুমান যা বাস্তবতা একটি incident-এ ভুল প্রমাণ করে।'),
        ] },
      ],
    },
    {
      h: l('Remember in one line', 'এক লাইনে মনে রাখুন'),
      blocks: [
        { list: [
          l('Provision for tested peak plus deliberate headroom — never for the average, and never for a margin you have not load-tested.', 'পরীক্ষিত পিক ও সচেতন headroom-এর জন্য provision করুন—কখনো গড়ের জন্য নয়, আর কখনো load-test-না-করা মার্জিনের জন্য নয়।'),
          l('Judge architecture by cost per useful request, and autoscale on queue depth and latency, not on CPU alone.', 'আর্কিটেকচারকে প্রতি কার্যকর রিকোয়েস্টের খরচ দিয়ে বিচার করুন, এবং queue depth ও latency-তে autoscale করুন, শুধু CPU-তে নয়।'),
          l('Big safety margins buy fewer incidents but waste money and energy — right-sizing is the cheaper and greener middle path.', 'বড় safety margin কম ঘটনা কেনে কিন্তু টাকা ও শক্তি অপচয় করে—right-sizing হলো সস্তা ও সবুজ মধ্যপথ।'),
        ] },
      ],
    },
  ],
}
