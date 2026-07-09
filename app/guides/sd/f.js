// Deep, bilingual (English / Bangla) teaching guides for System Design case
// studies and advanced distributed-systems topics. Shape mirrors
// app/course-guides.js and app/guides/networking/a.js: each guide is an array of
// sections { h, blocks }, rendered by GuideBlock in app/LearningApp.js. Facts
// (definitions, analogies, trade-offs) are drawn from the rawTopics rows in
// app/data.js.

const l = (en, bn) => ({ en, bn })

export default {
  // ── chat · Design chat & notifications ────────────────────────────────────
  'chat': [
    {
      h: l('Step 1 — Nail the requirements', 'ধাপ ১ — প্রয়োজন স্পষ্ট করুন'),
      blocks: [
        { p: l('Before drawing a single box, separate what the system must do (functional) from how well it must do it (non-functional). A chat system has an unusually rich functional list: send and receive one-to-one and group messages, show presence (who is online right now), report delivery and read receipts, keep a durable message history that survives crashes, and deliver messages that arrived while a user was offline. Miss any one of these and it stops feeling like chat.', 'একটি বাক্স আঁকার আগেই আলাদা করুন সিস্টেমকে কী করতে হবে (functional) আর কতটা ভালোভাবে করতে হবে (non-functional)। চ্যাট সিস্টেমের functional তালিকা অস্বাভাবিক সমৃদ্ধ: one-to-one ও group মেসেজ পাঠানো-পাওয়া, presence দেখানো (এখন কে online), delivery ও read receipt জানানো, ক্র্যাশেও টিকে থাকা durable message history রাখা, এবং ব্যবহারকারী offline থাকাকালে আসা মেসেজ পরে ডেলিভার করা। এর যেকোনো একটি বাদ দিলে এটা আর চ্যাট মনে হয় না।') },
        { p: l('The non-functional targets are what make chat hard. Delivery must feel instant (well under a second), the service must be highly available, and every message the server accepts must be durable — losing a "sent" message is unforgivable. You need ordering within a conversation so replies never appear before the question, and you must scale to millions of long-lived connections at once, which normal request/response web servers are not built for.', 'non-functional লক্ষ্যগুলোই চ্যাটকে কঠিন করে। ডেলিভারি তাৎক্ষণিক মনে হতে হবে (এক সেকেন্ডের অনেক নিচে), সার্ভিস highly available হতে হবে, আর সার্ভার যে মেসেজ গ্রহণ করে তার প্রতিটি durable হতে হবে—একটি "sent" মেসেজ হারানো ক্ষমার অযোগ্য। একটি conversation-এর ভেতরে ordering দরকার যাতে প্রশ্নের আগে উত্তর না দেখায়, আর একসঙ্গে লক্ষ লক্ষ দীর্ঘস্থায়ী connection স্কেল করতে হবে, যার জন্য সাধারণ request/response web server তৈরি নয়।') },
        { note: l('Think of two systems glued together. A postal service keeps every letter durable and deliverable even if you are away — that is the message store. A phone line signals whether the other person is present on the wire right now — that is presence. Chat needs both: durable history plus a live "are you there?" channel.', 'দুটি সিস্টেম একসঙ্গে জোড়া ভাবুন। একটি ডাকসেবা প্রতিটি চিঠি durable ও deliverable রাখে যদিও আপনি দূরে থাকেন—এটাই message store। একটি ফোনলাইন সংকেত দেয় অন্য মানুষটি এখন লাইনে আছে কিনা—এটাই presence। চ্যাটে দুটোই দরকার: durable history আর একটি লাইভ "তুমি কি আছো?" চ্যানেল।'), kind: 'tip' },
      ],
    },
    {
      h: l('Step 2 — Estimate the scale', 'ধাপ ২ — স্কেল আন্দাজ করুন'),
      blocks: [
        { p: l('The numbers decide the architecture. Two of them dominate chat: how many connections are open at once (that sizes your gateway fleet) and how many messages per second you accept (that sizes storage and fan-out). Use the anchor of ~10⁵ seconds in a day and round to powers of ten.', 'সংখ্যাই আর্কিটেকচার ঠিক করে। চ্যাটে দুটি সংখ্যা প্রধান: একসঙ্গে কতগুলো connection খোলা (এটি gateway fleet-এর আকার ঠিক করে) আর প্রতি সেকেন্ডে কত মেসেজ গ্রহণ করেন (এটি storage ও fan-out ঠিক করে)। দিনে ~১০⁵ সেকেন্ড অ্যাংকর ধরে দশের ঘাতে গোল করুন।') },
        { code: `Assumptions
  Daily active users (DAU)   = 50 million = 5 x 10^7
  Peak concurrent online     = 20% of DAU = 1 x 10^7
  Messages sent / user / day = 40

Open connections (gateway fleet)
  concurrent WebSockets = 1 x 10^7
  sockets per server    = ~50,000 (tuned kernel + memory)
  gateway servers       = 1e7 / 5e4 = 200 servers

Message write throughput
  messages/day = 5e7 x 40      = 2 x 10^9
  avg QPS      = 2e9 / 1e5      = 20,000 msgs/sec
  peak QPS     = avg x 3        = 60,000 msgs/sec

Storage (1 year of history)
  per message ~ 300 bytes (text + metadata)
  per day  = 2e9 x 300 = 6 x 10^11 B ~ 600 GB/day
  per year = 600 GB x 365           ~ 220 TB`, caption: l('Two numbers drive the design: ~200 gateway servers to hold 10 million live sockets, and ~60k peak writes/sec into a store that grows ~220 TB/year. That rules out a single database.', 'দুটি সংখ্যা ডিজাইন চালায়: ১ কোটি লাইভ socket ধরতে ~২০০ gateway server, আর একটি store-এ ~৬০ হাজার পিক write/sec যা বছরে ~২২০ TB বাড়ে। এতে একক ডেটাবেস বাদ পড়ে।') },
      ],
    },
    {
      h: l('Step 3 — High-level design', 'ধাপ ৩ — হাই-লেভেল ডিজাইন'),
      blocks: [
        { p: l('The key architectural move is to split the stateful live connection from the stateless business logic and the durable store. A thin gateway layer holds the sockets; everything behind it can scale and restart independently.', 'মূল স্থাপত্য চাল হলো stateful লাইভ connection-কে stateless ব্যবসায়িক লজিক ও durable store থেকে আলাদা করা। একটি পাতলা gateway স্তর socket ধরে; এর পেছনের সব কিছু স্বাধীনভাবে স্কেল ও restart করতে পারে।') },
        { steps: [
          l('The client opens a persistent WebSocket to a gateway server (found via a load balancer). This connection stays open for the whole session.', 'ক্লায়েন্ট একটি gateway server-এ (load balancer দিয়ে পাওয়া) একটি persistent WebSocket খোলে। এই connection পুরো session জুড়ে খোলা থাকে।'),
          l('When a user sends a message, the gateway forwards it to a chat service, which assigns a per-conversation sequence number and writes it durably to the message store before acknowledging.', 'ব্যবহারকারী মেসেজ পাঠালে gateway তা একটি chat service-এ পাঠায়, যা প্রতি-conversation sequence number দেয় এবং acknowledge করার আগে message store-এ durable করে লেখে।'),
          l('A presence service tracks which user is connected to which gateway, kept in a fast store (Redis) with short TTLs refreshed by heartbeats.', 'একটি presence service ট্র্যাক করে কোন ব্যবহারকারী কোন gateway-এর সঙ্গে যুক্ত, যা heartbeat দিয়ে রিফ্রেশ হওয়া ছোট TTL সহ একটি দ্রুত store (Redis)-এ থাকে।'),
          l('To deliver, the chat service looks up each recipient in presence and pushes the message — through a durable queue — to the gateway holding that recipient, which writes it down the socket.', 'ডেলিভারির জন্য chat service প্রতিটি recipient-কে presence-এ খোঁজে এবং মেসেজটি—একটি durable queue দিয়ে—সেই recipient ধরে থাকা gateway-এ push করে, যা socket দিয়ে তা পাঠায়।'),
          l('If a recipient is offline, the message is already durable in the store; on reconnect the client asks for everything after its last-seen sequence number and catches up.', 'recipient offline হলে মেসেজটি ইতিমধ্যে store-এ durable; reconnect-এ ক্লায়েন্ট তার last-seen sequence number-এর পরের সব চায় ও ধরে ফেলে।'),
          l('A separate push-notification path (APNs / FCM) alerts a user whose app is fully closed.', 'একটি আলাদা push-notification পথ (APNs / FCM) সেই ব্যবহারকারীকে সতর্ক করে যার অ্যাপ পুরো বন্ধ।'),
        ] },
      ],
    },
    {
      h: l('Deep dive — WebSocket delivery and ordering', 'গভীরে — WebSocket ডেলিভারি ও ordering'),
      blocks: [
        { p: l('The heart of chat is the persistent WebSocket. Unlike HTTP request/response, a WebSocket is a full-duplex channel that stays open, so the server can push a message to the client the instant it arrives — no polling. The cost is state: each open socket ties a user to one specific gateway process, and the system must always know which one. That mapping (user → gateway) is exactly what the presence store holds, and it is why the gateway layer is separate and horizontally scalable.', 'চ্যাটের হৃদয় হলো persistent WebSocket। HTTP request/response-এর মতো নয়, WebSocket একটি full-duplex চ্যানেল যা খোলা থাকে, তাই মেসেজ আসামাত্র সার্ভার তা ক্লায়েন্টে push করতে পারে—কোনো polling নেই। খরচ হলো state: প্রতিটি খোলা socket একজন ব্যবহারকারীকে একটি নির্দিষ্ট gateway process-এর সঙ্গে বাঁধে, আর সিস্টেমকে সবসময় জানতে হয় কোনটি। সেই mapping (user → gateway)-ই presence store ধরে রাখে, আর এ কারণেই gateway স্তর আলাদা ও horizontally scalable।') },
        { p: l('Ordering is the second subtlety. Users expect messages in a conversation to appear in a consistent order, but many devices send concurrently and clocks disagree. The clean answer is to partition by conversation and let the chat service assign a monotonic per-conversation sequence number as it writes. Every client then renders by that server-assigned number. This gives strong ordering where it matters — inside one conversation — without paying for expensive strict global ordering across the whole system.', 'ordering দ্বিতীয় সূক্ষ্মতা। ব্যবহারকারীরা আশা করে একটি conversation-এ মেসেজ সঙ্গতিপূর্ণ ক্রমে দেখাবে, কিন্তু অনেক device একসঙ্গে পাঠায় ও ঘড়ি মেলে না। পরিষ্কার উত্তর হলো conversation দিয়ে partition করা এবং chat service লেখার সময় একটি monotonic প্রতি-conversation sequence number দেওয়া। প্রতিটি ক্লায়েন্ট তখন সেই server-দেওয়া নম্বরে render করে। এতে যেখানে দরকার—একটি conversation-এর ভেতরে—শক্ত ordering মেলে, পুরো সিস্টেমজুড়ে ব্যয়বহুল strict global ordering-এর দাম না দিয়েই।') },
        { p: l('Delivery must be reliable even when a gateway crashes mid-push. So the fan-out from chat service to gateways goes through a durable queue, not a raw network call: the message is safely stored first, then delivered at-least-once. Clients de-duplicate using the sequence number, and unacknowledged messages are retried. Presence, by contrast, is deliberately best-effort — a heartbeat-driven guess that expires — because trying to make "online" perfectly accurate is a losing battle.', 'gateway push-এর মাঝপথে ক্র্যাশ করলেও ডেলিভারি নির্ভরযোগ্য হতে হবে। তাই chat service থেকে gateway-এ fan-out একটি durable queue দিয়ে যায়, কাঁচা network call নয়: মেসেজ আগে নিরাপদে জমা হয়, তারপর at-least-once ডেলিভার হয়। ক্লায়েন্ট sequence number দিয়ে de-duplicate করে, আর unacknowledged মেসেজ retry হয়। বিপরীতে presence ইচ্ছাকৃতভাবে best-effort—একটি heartbeat-চালিত অনুমান যা মেয়াদ শেষ হয়—কারণ "online"-কে নিখুঁত করার চেষ্টা হারা লড়াই।') },
      ],
    },
    {
      h: l('Scaling & trade-offs', 'স্কেলিং ও ট্রেড-অফ'),
      blocks: [
        { table: {
          head: [l('Concern', 'বিষয়'), l('Approach', 'পদ্ধতি'), l('Trade-off', 'ট্রেড-অফ')],
          rows: [
            [l('Millions of sockets', 'লক্ষ লক্ষ socket'), l('Thin stateless gateway fleet; scale by adding gateways.', 'পাতলা stateless gateway fleet; gateway যোগ করে স্কেল।'), l('Must track user → gateway mapping and reroute on reconnect.', 'user → gateway mapping ট্র্যাক ও reconnect-এ reroute করতে হয়।')],
            [l('Message storage', 'মেসেজ স্টোরেজ'), l('Partition (shard) by conversation id; use a write-optimized store.', 'conversation id দিয়ে partition (shard); write-optimized store।'), l('Cross-conversation queries (search) get harder.', 'cross-conversation কুয়েরি (search) কঠিন হয়।')],
            [l('Ordering', 'ordering'), l('Per-conversation sequence numbers.', 'প্রতি-conversation sequence number।'), l('No cheap global order across all conversations.', 'সব conversation জুড়ে সস্তা global order নেই।')],
            [l('Reliable delivery', 'নির্ভরযোগ্য ডেলিভারি'), l('Durable queue, at-least-once, client de-dup by sequence.', 'durable queue, at-least-once, sequence দিয়ে ক্লায়েন্ট de-dup।'), l('At-least-once means clients must handle duplicates.', 'at-least-once মানে ক্লায়েন্টকে duplicate সামলাতে হয়।')],
            [l('Presence', 'presence'), l('Heartbeats + short TTL in a fast store.', 'দ্রুত store-এ heartbeat + ছোট TTL।'), l('Always slightly stale; never treat as ground truth.', 'সবসময় সামান্য stale; একে চূড়ান্ত সত্য ধরবেন না।')],
          ],
        } },
      ],
    },
    {
      h: l('Common mistakes', 'সাধারণ ভুল'),
      blocks: [
        { list: [
          l('Treating presence as permanently accurate state. A phone loses signal without closing the socket cleanly; "online" is always a guess with a TTL, not a fact.', 'presence-কে স্থায়ীভাবে নির্ভুল state ধরা। ফোন socket পরিষ্কারভাবে বন্ধ না করেই signal হারায়; "online" সবসময় TTL সহ একটি অনুমান, তথ্য নয়।'),
          l('Chasing strict global ordering across every conversation. It is enormously expensive and users never notice it — per-conversation order is enough.', 'প্রতিটি conversation জুড়ে strict global ordering তাড়া করা। এটি প্রচণ্ড ব্যয়বহুল ও ব্যবহারকারী কখনো টের পায় না—প্রতি-conversation order যথেষ্ট।'),
          l('Assigning sequence numbers on the client. Devices lie about time and race each other; only the server can assign a trustworthy order.', 'ক্লায়েন্টে sequence number দেওয়া। device সময় নিয়ে মিথ্যা বলে ও একে অপরের সঙ্গে race করে; কেবল সার্ভার নির্ভরযোগ্য order দিতে পারে।'),
          l('Acknowledging a send before the message is durable. If the store write fails after the ack, the message is silently lost.', 'মেসেজ durable হওয়ার আগে send acknowledge করা। ack-এর পর store write ব্যর্থ হলে মেসেজ নীরবে হারায়।'),
          l('Pushing directly from chat service to gateway without a queue, so a gateway crash drops the in-flight message.', 'queue ছাড়া chat service থেকে সরাসরি gateway-এ push করা, ফলে gateway ক্র্যাশে in-flight মেসেজ হারায়।'),
        ] },
      ],
    },
    {
      h: l('Summary', 'সারসংক্ষেপ'),
      blocks: [
        { list: [
          l('Split the design: a stateful gateway layer for live WebSockets, stateless services behind it, and a durable partitioned message store.', 'ডিজাইন ভাগ করুন: লাইভ WebSocket-এর জন্য stateful gateway স্তর, পেছনে stateless service, ও একটি durable partitioned message store।'),
          l('Partition by conversation and assign server-side sequence numbers for cheap, correct per-conversation ordering.', 'conversation দিয়ে partition করুন ও সস্তা, সঠিক প্রতি-conversation ordering-এর জন্য server-side sequence number দিন।'),
          l('Fan out through durable queues so delivery is reliable; let clients catch up from their last sequence after reconnect.', 'durable queue দিয়ে fan-out করুন যাতে ডেলিভারি নির্ভরযোগ্য; reconnect-এর পর ক্লায়েন্ট তার শেষ sequence থেকে ধরে নিক।'),
          l('Presence is best-effort with heartbeats and TTLs — never a source of truth.', 'presence heartbeat ও TTL সহ best-effort—কখনো সত্যের উৎস নয়।'),
        ] },
      ],
    },
  ],

  // ── news-feed · Design a social news feed ─────────────────────────────────
  'news-feed': [
    {
      h: l('Step 1 — Nail the requirements', 'ধাপ ১ — প্রয়োজন স্পষ্ট করুন'),
      blocks: [
        { p: l('A social news feed shows each user a personalized, ranked stream of posts from the accounts they follow. Functionally it must: let users publish posts, let users follow others, and build each viewer a feed that gathers candidate posts, ranks them, and paginates smoothly as they scroll. The subtle requirement is that the feed is different for every single viewer — there is no one global page to cache.', 'একটি social news feed প্রতিটি ব্যবহারকারীকে সে যাদের follow করে তাদের পোস্টের একটি personalized, ranked স্ট্রিম দেখায়। functional দিক থেকে এটিকে: ব্যবহারকারীকে পোস্ট প্রকাশ করতে দিতে হবে, একে অপরকে follow করতে দিতে হবে, এবং প্রতিটি দর্শকের জন্য একটি feed বানাতে হবে যা সম্ভাব্য পোস্ট সংগ্রহ করে, র‍্যাঙ্ক করে ও scroll করার সঙ্গে মসৃণভাবে paginate করে। সূক্ষ্ম প্রয়োজন হলো feed প্রতিটি দর্শকের জন্য আলাদা—cache করার মতো একটি global পেজ নেই।') },
        { p: l('Non-functionally, feeds are extremely read-heavy (people scroll far more than they post), so reads must be fast — opening the app should feel instant. It must stay available (a down feed is a down product), tolerate wildly uneven fan-out (a normal user has 200 followers, a celebrity has 50 million), and it can accept eventual consistency: seeing a brand-new post a few seconds late is fine.', 'non-functional দিক থেকে feed অত্যন্ত read-heavy (মানুষ পোস্টের চেয়ে অনেক বেশি scroll করে), তাই read দ্রুত হতে হবে—অ্যাপ খোলা তাৎক্ষণিক মনে হওয়া উচিত। এটিকে available থাকতে হবে (feed down মানে product down), অত্যন্ত অসম fan-out সামলাতে হবে (সাধারণ ব্যবহারকারীর ২০০ follower, সেলিব্রিটির ৫ কোটি), আর এটি eventual consistency মানতে পারে: একটি একদম নতুন পোস্ট কয়েক সেকেন্ড দেরিতে দেখা ঠিক আছে।') },
        { note: l('A feed is a personalized newspaper. A newspaper does not print one edition for the world; an editor selects which stories matter to you and orders them by importance. The feed is that editor, run per reader, at massive scale.', 'একটি feed একটি personalized সংবাদপত্র। সংবাদপত্র বিশ্বের জন্য একটি সংস্করণ ছাপে না; একজন সম্পাদক বেছে নেন কোন খবর আপনার কাছে গুরুত্বপূর্ণ ও গুরুত্ব অনুযায়ী সাজান। feed হলো সেই সম্পাদক, প্রতি পাঠকের জন্য, বিশাল স্কেলে।'), kind: 'tip' },
      ],
    },
    {
      h: l('Step 2 — Estimate the scale', 'ধাপ ২ — স্কেল আন্দাজ করুন'),
      blocks: [
        { p: l('The estimate that shapes a feed is the read:write ratio and the fan-out multiplier. Reads dwarf writes, and each write can touch hundreds or millions of followers — that product is the real cost.', 'feed-কে যে আন্দাজ গঠন করে তা হলো read:write অনুপাত ও fan-out গুণক। read, write-কে বামন করে, আর প্রতিটি write শত বা কোটি follower স্পর্শ করতে পারে—সেই গুণফলই আসল খরচ।') },
        { code: `Assumptions
  Daily active users (DAU) = 200 million = 2 x 10^8
  Posts / user / day       = 2
  Feed opens / user / day  = 10   (read-heavy)
  Avg followers / user     = 200

Read vs write QPS
  writes/day = 2e8 x 2  = 4 x 10^8 -> 4e8/1e5 =  4,000 posts/sec
  reads/day  = 2e8 x 10 = 2 x 10^9 -> 2e9/1e5 = 20,000 reads/sec
  read : write ~ 5 : 1     (peak x3 -> ~60,000 reads/sec)

Fan-out-on-write cost (the trap)
  timeline inserts/sec = 4,000 posts/sec x 200 followers
                       = 800,000 inserts/sec  (huge, but bounded)
  one celebrity post   = 5 x 10^7 inserts in a burst  (unbounded!)

Timeline cache storage
  entry ~ 40 bytes (post id + rank score)
  keep last ~500 entries/user = 20 KB/user
  x 2e8 users = 4 x 10^12 B ~ 4 TB in memory (shardable)`, caption: l('Fan-out-on-write is cheap for the 200-follower user but explodes for celebrities. That single line is why pure fan-out-on-write fails and a hybrid is needed.', 'fan-out-on-write ২০০-follower ব্যবহারকারীর জন্য সস্তা কিন্তু সেলিব্রিটির জন্য বিস্ফোরিত হয়। ঐ একটি লাইনই কারণ কেন বিশুদ্ধ fan-out-on-write ব্যর্থ হয় ও hybrid দরকার।') },
      ],
    },
    {
      h: l('Step 3 — High-level design', 'ধাপ ৩ — হাই-লেভেল ডিজাইন'),
      blocks: [
        { steps: [
          l('A user publishes a post; the post service writes it once to a durable posts store (the source of truth) and emits a "new post" event.', 'একজন ব্যবহারকারী পোস্ট প্রকাশ করে; post service একে একবার একটি durable posts store (সত্যের উৎস)-এ লেখে ও একটি "new post" event ছাড়ে।'),
          l('A fan-out service reads the author’s follower list and, for ordinary authors, pushes the post id into each follower’s precomputed timeline cache.', 'একটি fan-out service লেখকের follower তালিকা পড়ে এবং সাধারণ লেখকের জন্য প্রতিটি follower-এর precomputed timeline cache-এ পোস্ট id push করে।'),
          l('For celebrity authors, it does NOT fan out; their posts are left in the posts store to be pulled at read time.', 'সেলিব্রিটি লেখকের জন্য এটি fan-out করে না; তাদের পোস্ট read-এর সময় pull করার জন্য posts store-এ থাকে।'),
          l('When a user opens the app, the feed service reads their timeline cache (the precomputed part) and merges in fresh posts from the few celebrities they follow (the pulled part).', 'ব্যবহারকারী অ্যাপ খুললে feed service তাদের timeline cache (precomputed অংশ) পড়ে এবং তারা যে কয়জন সেলিব্রিটি follow করে তাদের টাটকা পোস্ট (pulled অংশ) merge করে।'),
          l('A ranking step scores the merged candidates (recency, affinity, engagement) and returns the top page.', 'একটি ranking ধাপ merge করা candidate-কে score করে (recency, affinity, engagement) ও শীর্ষ পেজ ফেরত দেয়।'),
          l('Pagination uses a stable cursor (a post id or score), not a numeric offset, so scrolling stays consistent as new posts arrive.', 'pagination একটি stable cursor (একটি post id বা score) ব্যবহার করে, numeric offset নয়, যাতে নতুন পোস্ট এলেও scroll সঙ্গতিপূর্ণ থাকে।'),
        ] },
      ],
    },
    {
      h: l('Deep dive — fan-out on write vs on read', 'গভীরে — fan-out on write বনাম on read'),
      blocks: [
        { p: l('The central decision in any feed is when to do the work of assembling a timeline. Fan-out-on-write (push) does it when a post is created: the moment you post, the system copies the post id into every follower’s timeline. Reads are then trivially fast — just read your ready-made list. This is ideal because feeds are read-heavy, and it is why it is the default for ordinary users.', 'যেকোনো feed-এর কেন্দ্রীয় সিদ্ধান্ত হলো timeline সাজানোর কাজ কখন করবেন। fan-out-on-write (push) পোস্ট তৈরির সময় করে: আপনি পোস্ট করামাত্র সিস্টেম প্রতিটি follower-এর timeline-এ পোস্ট id কপি করে। তখন read তুচ্ছভাবে দ্রুত—শুধু আপনার তৈরি তালিকা পড়ুন। এটি আদর্শ কারণ feed read-heavy, আর এ কারণেই সাধারণ ব্যবহারকারীর জন্য এটি default।') },
        { p: l('The problem is the celebrity. If someone with 50 million followers posts, fan-out-on-write must perform 50 million timeline writes in a burst — a "fan-out storm" that overwhelms the system and delays every other write. Fan-out-on-read (pull) is the opposite: write nothing extra on post, and at read time gather posts from everyone the viewer follows and merge them. Pull is cheap for writes but makes reads expensive, especially for users who follow thousands of accounts.', 'সমস্যা হলো সেলিব্রিটি। ৫ কোটি follower-যুক্ত কেউ পোস্ট করলে fan-out-on-write-কে এক ঝলকে ৫ কোটি timeline write করতে হয়—একটি "fan-out storm" যা সিস্টেম ভাসিয়ে দেয় ও অন্য প্রতিটি write বিলম্বিত করে। fan-out-on-read (pull) উল্টো: পোস্টে বাড়তি কিছু write করে না, আর read-এর সময় দর্শক যাদের follow করে তাদের সবার পোস্ট সংগ্রহ করে merge করে। pull write-এ সস্তা কিন্তু read ব্যয়বহুল করে, বিশেষত হাজার account follow করা ব্যবহারকারীর জন্য।') },
        { p: l('The production answer is a hybrid. Use fan-out-on-write for the vast majority of ordinary accounts (bounded fan-out, fast reads), and switch celebrities to fan-out-on-read so their posts are pulled and merged only when a follower actually opens the app. At read time you combine the precomputed timeline with a small pull from the handful of celebrities the viewer follows. This bounds both the write storm and the read cost.', 'উৎপাদনের উত্তর একটি hybrid। বিশাল সংখ্যাগরিষ্ঠ সাধারণ account-এর জন্য fan-out-on-write নিন (bounded fan-out, দ্রুত read), আর সেলিব্রিটিদের fan-out-on-read-এ সরান যাতে তাদের পোস্ট কেবল তখনই pull ও merge হয় যখন কোনো follower আসলে অ্যাপ খোলে। read-এর সময় আপনি precomputed timeline-কে দর্শক যে কয়জন সেলিব্রিটি follow করে তাদের ছোট pull-এর সঙ্গে মেলান। এতে write storm ও read খরচ দুটোই সীমাবদ্ধ হয়।') },
      ],
    },
    {
      h: l('Scaling & trade-offs', 'স্কেলিং ও ট্রেড-অফ'),
      blocks: [
        { table: {
          head: [l('Strategy', 'কৌশল'), l('Read cost', 'read খরচ'), l('Write cost', 'write খরচ'), l('Best for', 'কার জন্য')],
          rows: [
            [l('Fan-out on write (push)', 'fan-out on write (push)'), l('Very low — read a ready list', 'খুব কম—তৈরি তালিকা পড়া'), l('High — N follower writes/post', 'বেশি—প্রতি পোস্টে N follower write'), l('Ordinary users, bounded followers', 'সাধারণ ব্যবহারকারী, সীমিত follower')],
            [l('Fan-out on read (pull)', 'fan-out on read (pull)'), l('High — gather + merge at read', 'বেশি—read-এ সংগ্রহ + merge'), l('Very low — nothing extra', 'খুব কম—বাড়তি কিছু নেই'), l('Celebrities, huge followings', 'সেলিব্রিটি, বিশাল following')],
            [l('Hybrid', 'hybrid'), l('Low — precomputed + small pull', 'কম—precomputed + ছোট pull'), l('Bounded — skip celebrity fan-out', 'সীমিত—সেলিব্রিটি fan-out বাদ'), l('Real-world feeds at scale', 'বাস্তব স্কেলের feed')],
          ],
        } },
        { p: l('The hybrid’s trade-off is complexity: two code paths, a rule for who counts as a "celebrity," and a merge step at read time. That complexity is the price of surviving both the read load and the fan-out storm.', 'hybrid-এর ট্রেড-অফ হলো জটিলতা: দুটি code path, কে "সেলিব্রিটি" তার একটি নিয়ম, ও read-এর সময় একটি merge ধাপ। সেই জটিলতাই read load ও fan-out storm দুটো থেকে টিকে থাকার দাম।') },
      ],
    },
    {
      h: l('Common mistakes', 'সাধারণ ভুল'),
      blocks: [
        { list: [
          l('Paginating a changing ranked feed with numeric offsets (LIMIT/OFFSET). New posts shift every item, so page 2 repeats or skips rows — always use a stable cursor.', 'পরিবর্তনশীল ranked feed-কে numeric offset (LIMIT/OFFSET) দিয়ে paginate করা। নতুন পোস্ট প্রতিটি item সরায়, তাই page 2 সারি পুনরাবৃত্তি বা বাদ দেয়—সবসময় stable cursor নিন।'),
          l('Using pure fan-out-on-write for everyone. One celebrity post triggers a fan-out storm that stalls the whole write pipeline.', 'সবার জন্য বিশুদ্ধ fan-out-on-write ব্যবহার করা। একটি সেলিব্রিটি পোস্ট একটি fan-out storm ঘটায় যা পুরো write pipeline থামিয়ে দেয়।'),
          l('Storing full post copies in each timeline instead of just post ids. It multiplies storage and makes edits or deletes impossible to propagate.', 'প্রতিটি timeline-এ শুধু post id-র বদলে পুরো পোস্ট কপি রাখা। এটি storage বহুগুণ করে ও edit বা delete ছড়ানো অসম্ভব করে।'),
          l('Demanding strong consistency for the feed. A few seconds of delay before a new post appears is perfectly acceptable and buys huge scalability.', 'feed-এর জন্য strong consistency দাবি করা। নতুন পোস্ট দেখানোর আগে কয়েক সেকেন্ড দেরি পুরোপুরি গ্রহণযোগ্য ও বিশাল scalability এনে দেয়।'),
        ] },
      ],
    },
    {
      h: l('Summary', 'সারসংক্ষেপ'),
      blocks: [
        { list: [
          l('A feed gathers candidate posts, ranks them, and serves a stable, personalized page — under wildly uneven fan-out.', 'feed সম্ভাব্য পোস্ট সংগ্রহ করে, র‍্যাঙ্ক করে ও একটি stable, personalized পেজ দেয়—অত্যন্ত অসম fan-out-এর মধ্যে।'),
          l('Feeds are read-heavy, so precompute (fan-out-on-write) for ordinary users to make reads fast.', 'feed read-heavy, তাই read দ্রুত করতে সাধারণ ব্যবহারকারীর জন্য precompute (fan-out-on-write) করুন।'),
          l('Use a hybrid: pull celebrity posts at read time to avoid the fan-out storm.', 'hybrid নিন: fan-out storm এড়াতে সেলিব্রিটি পোস্ট read-এর সময় pull করুন।'),
          l('Store post ids (not copies), paginate with cursors, and accept eventual consistency.', 'post id রাখুন (কপি নয়), cursor দিয়ে paginate করুন, ও eventual consistency মেনে নিন।'),
        ] },
      ],
    },
  ],

  // ── media-search · Design storage, video & search ─────────────────────────
  'media-search': [
    {
      h: l('Step 1 — Nail the requirements', 'ধাপ ১ — প্রয়োজন স্পষ্ট করুন'),
      blocks: [
        { p: l('This system does three jobs at once: store large media (photos and video), process it into usable forms, and make it searchable. Functionally, users must be able to upload a file, have it transcoded into multiple resolutions (renditions), play or view it smoothly, and search for it by title, tags, or spoken/on-screen text. The trick is that these are three very different workloads sharing one product.', 'এই সিস্টেম একসঙ্গে তিনটি কাজ করে: বড় মিডিয়া (ছবি ও ভিডিও) সংরক্ষণ, ব্যবহারযোগ্য রূপে প্রসেস, ও তা searchable করা। functional দিক থেকে ব্যবহারকারী একটি ফাইল upload করতে, তা একাধিক resolution (rendition)-এ transcode হতে, মসৃণভাবে play বা view করতে, এবং title, tag বা কথিত/পর্দার টেক্সট দিয়ে search করতে পারবে। কৌশল হলো এগুলো তিনটি খুব ভিন্ন workload যা একটি product ভাগ করে।') },
        { p: l('Non-functionally: uploads and storage must be durable (never lose a user’s video) and cheap per byte (media is enormous), playback must be low-latency and global (delivered from near the viewer), and search must be fast and reasonably fresh. Heavy processing like transcoding is slow, so the design must not make the user wait for it.', 'non-functional দিক থেকে: upload ও storage durable হতে হবে (ব্যবহারকারীর ভিডিও কখনো হারানো নয়) ও প্রতি byte-এ সস্তা (মিডিয়া বিশাল), playback low-latency ও global হতে হবে (দর্শকের কাছ থেকে ডেলিভার), আর search দ্রুত ও যথেষ্ট fresh হতে হবে। transcoding-এর মতো ভারী প্রসেসিং ধীর, তাই ডিজাইন ব্যবহারকারীকে এর জন্য অপেক্ষা করাতে পারবে না।') },
        { note: l('Picture three buildings. A warehouse stores the raw boxes (object storage for blobs). A workshop transforms them into different sizes (the transcoding pipeline). A catalog helps people find what they want without opening every box (the search index). Keep them separate and each can scale on its own.', 'তিনটি ভবন কল্পনা করুন। একটি গুদাম কাঁচা বাক্স রাখে (blob-এর জন্য object storage)। একটি ওয়ার্কশপ সেগুলো ভিন্ন আকারে রূপান্তর করে (transcoding pipeline)। একটি ক্যাটালগ প্রতিটি বাক্স না খুলেই মানুষকে খুঁজতে সাহায্য করে (search index)। এদের আলাদা রাখুন, প্রতিটি নিজে নিজে স্কেল করতে পারবে।'), kind: 'tip' },
      ],
    },
    {
      h: l('Step 2 — Estimate the scale', 'ধাপ ২ — স্কেল আন্দাজ করুন'),
      blocks: [
        { p: l('Media estimates are dominated by bytes, not requests. A single upload is millions of times larger than a chat message, so storage and bandwidth — not QPS — decide the design.', 'মিডিয়া আন্দাজ byte-প্রধান, request নয়। একটি upload একটি চ্যাট মেসেজের চেয়ে লক্ষ গুণ বড়, তাই QPS নয়—storage ও bandwidth ডিজাইন ঠিক করে।') },
        { code: `Assumptions
  Uploads / day        = 5 million = 5 x 10^6
  Avg raw size         = 40 MB   (photo + short-video mix)
  Renditions / upload  = 4       (thumb, SD, HD, original)

Ingest throughput
  uploads/sec (avg) = 5e6 / 1e5 = 50 uploads/sec
  peak              = x5        = 250 uploads/sec
  raw ingest/day    = 5e6 x 40 MB = 2 x 10^8 MB = 200 TB/day

Storage (1 year, renditions ~1.5x raw)
  per day  = 200 TB x 1.5 = 300 TB/day
  per year = 300 TB x 365 ~ 110 PB   (needs cheap object storage)

Search index (metadata only, not blobs)
  index text/doc  = ~1 KB  (title, tags, transcript)
  daily index add = 5e6 x 1 KB = 5 GB/day
  1 KB vs 40 MB  ->  index is ~40,000x smaller than the media`, caption: l('The media itself needs petabytes of cheap object storage; the search index is tiny by comparison. That size gap is why metadata and blobs live in different systems.', 'মিডিয়া নিজেই petabyte সস্তা object storage চায়; তুলনায় search index ক্ষুদ্র। সেই আকার-ব্যবধানই কারণ কেন metadata ও blob ভিন্ন সিস্টেমে থাকে।') },
      ],
    },
    {
      h: l('Step 3 — High-level design', 'ধাপ ৩ — হাই-লেভেল ডিজাইন'),
      blocks: [
        { steps: [
          l('The client requests a pre-signed URL and uploads the file directly to object storage — bytes never pass through your application servers.', 'ক্লায়েন্ট একটি pre-signed URL চায় ও ফাইলটি সরাসরি object storage-এ upload করে—byte কখনো আপনার application server দিয়ে যায় না।'),
          l('The upload completing emits an event onto a processing queue; the user’s request returns immediately with "processing".', 'upload সম্পন্ন হলে একটি processing queue-তে একটি event ছাড়ে; ব্যবহারকারীর request সঙ্গে সঙ্গে "processing" নিয়ে ফেরে।'),
          l('A fleet of workers pulls jobs, transcodes the raw file into multiple renditions, extracts metadata (and a transcript for video), and writes results back to object storage.', 'worker-এর একটি বহর job টানে, কাঁচা ফাইলকে একাধিক rendition-এ transcode করে, metadata (ও ভিডিওর জন্য transcript) বের করে, ও ফলাফল object storage-এ ফেরত লেখে।'),
          l('Metadata (owner, title, tags, rendition URLs, status) is written to a metadata database — small, structured, and queryable.', 'metadata (owner, title, tag, rendition URL, status) একটি metadata database-এ লেখা হয়—ছোট, structured ও queryable।'),
          l('The workers also push the searchable text asynchronously into a search index (an inverted index) so the item becomes findable.', 'worker searchable টেক্সটও অ্যাসিঙ্কভাবে একটি search index (একটি inverted index)-এ push করে যাতে item খুঁজে পাওয়া যায়।'),
          l('Playback and viewing are served through a CDN: the renditions are cached at edges near viewers, so the origin storage is rarely hit.', 'playback ও viewing একটি CDN দিয়ে পরিবেশিত হয়: rendition দর্শকের কাছের edge-এ cache হয়, তাই origin storage কমই আঘাত পায়।'),
        ] },
      ],
    },
    {
      h: l('Deep dive — the search index (inverted index)', 'গভীরে — search index (inverted index)'),
      blocks: [
        { p: l('You cannot search petabytes of video by scanning it. Search works on a small, separate structure called an inverted index. Instead of mapping each document to its words, it maps each word to the list of documents that contain it. Searching for "sunset" then becomes a single lookup that returns the posting list of every matching item — no scanning required. This is the same structure that powers web search and log search.', 'আপনি petabyte ভিডিও scan করে search করতে পারবেন না। search একটি ছোট, আলাদা structure-এ কাজ করে যাকে inverted index বলে। প্রতিটি document-কে তার শব্দে map করার বদলে এটি প্রতিটি শব্দকে সেই document-এর তালিকায় map করে যারা তা ধারণ করে। "sunset" search তখন একটি lookup হয়ে যায় যা প্রতিটি মিলে যাওয়া item-এর posting list ফেরত দেয়—কোনো scan লাগে না। এটাই সেই structure যা web search ও log search চালায়।') },
        { p: l('The index is built asynchronously, and that is deliberate. When a video finishes transcoding, a worker extracts its text (title, tags, and a speech-to-text transcript), tokenizes it, and adds each term to the index pointing at that document. Because this happens after upload, there is a short window where a video exists and plays but is not yet searchable — an acceptable "indexing state." Searching then runs in two phases: retrieve candidate documents from the posting lists, then rank them by relevance and popularity before returning a page.', 'index অ্যাসিঙ্কভাবে তৈরি হয়, আর তা ইচ্ছাকৃত। একটি ভিডিও transcode শেষ হলে একটি worker তার টেক্সট (title, tag, ও speech-to-text transcript) বের করে, tokenize করে, ও প্রতিটি term-কে সেই document নির্দেশ করে index-এ যোগ করে। এটি upload-এর পরে হয় বলে একটি ছোট সময় থাকে যখন ভিডিও আছে ও চলে কিন্তু এখনো searchable নয়—একটি গ্রহণযোগ্য "indexing state"। search তখন দুই ধাপে চলে: posting list থেকে candidate document আনা, তারপর একটি পেজ ফেরত দেওয়ার আগে relevance ও popularity দিয়ে র‍্যাঙ্ক করা।') },
        { p: l('At scale the index is sharded — split across machines by document or by term — so no single node holds it all, and replicated for availability. Keeping it separate from the metadata database and the blob store lets each grow on its own axis: blobs by petabytes, metadata by rows, the index by terms.', 'স্কেলে index sharded—document বা term দিয়ে মেশিনজুড়ে ভাগ—তাই কোনো একক node পুরোটা ধরে না, আর availability-র জন্য replicated। একে metadata database ও blob store থেকে আলাদা রাখলে প্রতিটি নিজের অক্ষে বাড়ে: blob petabyte-এ, metadata সারিতে, index term-এ।') },
      ],
    },
    {
      h: l('Scaling & trade-offs', 'স্কেলিং ও ট্রেড-অফ'),
      blocks: [
        { table: {
          head: [l('Component', 'উপাদান'), l('Scaling approach', 'স্কেলিং পদ্ধতি'), l('Trade-off', 'ট্রেড-অফ')],
          rows: [
            [l('Blob storage', 'blob storage'), l('Cheap object storage; direct uploads via pre-signed URLs.', 'সস্তা object storage; pre-signed URL দিয়ে সরাসরি upload।'), l('Eventually consistent; not queryable — needs separate metadata.', 'eventually consistent; queryable নয়—আলাদা metadata দরকার।')],
            [l('Transcoding', 'transcoding'), l('Elastic worker fleet pulling from a queue.', 'queue থেকে টানা elastic worker fleet।'), l('Async means a temporary "processing" state after upload.', 'async মানে upload-এর পর সাময়িক "processing" state।')],
            [l('Delivery', 'ডেলিভারি'), l('CDN caches renditions at edges near viewers.', 'CDN rendition দর্শকের কাছের edge-এ cache করে।'), l('Cache invalidation and cost; first view warms the edge.', 'cache invalidation ও খরচ; প্রথম view edge গরম করে।')],
            [l('Search', 'search'), l('Sharded, replicated inverted index built async.', 'sharded, replicated inverted index অ্যাসিঙ্কভাবে তৈরি।'), l('Short window where an item exists but is not yet searchable.', 'ছোট সময় যখন item আছে কিন্তু এখনো searchable নয়।')],
            [l('Metadata', 'metadata'), l('Structured database, partitioned by id.', 'structured database, id দিয়ে partition।'), l('Must stay in sync with blobs and index states.', 'blob ও index state-এর সঙ্গে sync থাকতে হয়।')],
          ],
        } },
      ],
    },
    {
      h: l('Common mistakes', 'সাধারণ ভুল'),
      blocks: [
        { list: [
          l('Sending large uploads through your application servers. Multi-gigabyte files should go straight to object storage via pre-signed URLs; routing them through app servers wastes bandwidth and memory.', 'বড় upload আপনার application server দিয়ে পাঠানো। multi-gigabyte ফাইল pre-signed URL দিয়ে সরাসরি object storage-এ যাওয়া উচিত; এদের app server দিয়ে পাঠানো bandwidth ও memory অপচয় করে।'),
          l('Making users wait for transcoding to finish before the upload "succeeds." Return immediately and process asynchronously with a queue.', 'upload "সফল" হওয়ার আগে ব্যবহারকারীকে transcoding শেষ হওয়ার জন্য অপেক্ষা করানো। সঙ্গে সঙ্গে ফিরুন ও একটি queue দিয়ে অ্যাসিঙ্কভাবে প্রসেস করুন।'),
          l('Trying to search by scanning the blobs or the metadata table. Build a dedicated inverted index instead.', 'blob বা metadata table scan করে search করার চেষ্টা। বরং একটি নিবেদিত inverted index তৈরি করুন।'),
          l('Serving media straight from origin storage instead of a CDN, so every viewer pays the full cross-region latency and the origin melts under load.', 'CDN-এর বদলে সরাসরি origin storage থেকে মিডিয়া পরিবেশন করা, ফলে প্রতিটি দর্শক পূর্ণ cross-region latency দেয় ও origin লোডে গলে যায়।'),
          l('Assuming an item is searchable the instant it uploads. Indexing is asynchronous, so surface a clear "processing" state.', 'item upload-এর সঙ্গে সঙ্গে searchable ধরে নেওয়া। indexing অ্যাসিঙ্ক, তাই একটি স্পষ্ট "processing" state দেখান।'),
        ] },
      ],
    },
    {
      h: l('Summary', 'সারসংক্ষেপ'),
      blocks: [
        { list: [
          l('Separate the three workloads: blobs in cheap object storage, structured metadata in a database, and searchable text in an inverted index.', 'তিনটি workload আলাদা করুন: blob সস্তা object storage-এ, structured metadata একটি database-এ, ও searchable টেক্সট একটি inverted index-এ।'),
          l('Upload directly to object storage and process asynchronously through a queue so users never wait for transcoding.', 'সরাসরি object storage-এ upload করুন ও একটি queue দিয়ে অ্যাসিঙ্কভাবে প্রসেস করুন যাতে ব্যবহারকারী transcoding-এর জন্য অপেক্ষা না করে।'),
          l('Deliver renditions through a CDN; build and update the search index asynchronously and accept a brief indexing lag.', 'CDN দিয়ে rendition ডেলিভার করুন; search index অ্যাসিঙ্কভাবে তৈরি ও আপডেট করুন এবং সংক্ষিপ্ত indexing lag মেনে নিন।'),
          l('Search on a small inverted index, never by scanning the media itself.', 'ছোট inverted index-এ search করুন, কখনো মিডিয়া নিজে scan করে নয়।'),
        ] },
      ],
    },
  ],

  // ── locks-clocks · Distributed locks, leases & clocks ─────────────────────
  'locks-clocks': [
    {
      h: l('What are distributed locks, leases, and clocks?', 'ডিস্ট্রিবিউটেড লক, লিজ ও ক্লক কী?'),
      blocks: [
        { p: l('When many machines work on shared data, three related problems appear. First, exclusivity: sometimes only one worker may act at a time (charge this card once, run this job once). A distributed lock grants that exclusive right across machines. Second, liveness: the lock-holder can crash and never release the lock, freezing everyone. A lease fixes this by making ownership expire after a set time. Third, ordering: without a shared clock, machines disagree on what happened first. Logical clocks order events without trusting wall-clock time.', 'যখন অনেক মেশিন shared data নিয়ে কাজ করে, তিনটি সম্পর্কিত সমস্যা দেখা দেয়। প্রথম, exclusivity: কখনো একসঙ্গে কেবল একজন worker কাজ করতে পারে (এই card একবার charge করো, এই job একবার চালাও)। একটি distributed lock মেশিনজুড়ে সেই একচেটিয়া অধিকার দেয়। দ্বিতীয়, liveness: lock-holder ক্র্যাশ করে lock কখনো ছাড়ে না, সবাইকে জমিয়ে দেয়। একটি lease নির্দিষ্ট সময় পরে মালিকানার মেয়াদ শেষ করে এটি ঠিক করে। তৃতীয়, ordering: একটি shared clock ছাড়া মেশিন একমত হয় না কী আগে ঘটেছে। logical clock দেয়ালঘড়ি বিশ্বাস না করে ইভেন্ট সাজায়।') },
        { p: l('The unifying idea is that coordination between independent machines is never free. A lock is a promise, a lease is a promise with an expiry, and a logical clock is a way to agree on order without a trustworthy global time. Reaching for coordination should always feel like a cost you are choosing to pay.', 'একীভূত ধারণা হলো স্বাধীন মেশিনের মধ্যে coordination কখনো বিনামূল্যে নয়। একটি lock একটি প্রতিশ্রুতি, একটি lease মেয়াদসহ একটি প্রতিশ্রুতি, আর একটি logical clock নির্ভরযোগ্য global time ছাড়া order-এ একমত হওয়ার উপায়। coordination-এর জন্য হাত বাড়ানো সবসময় একটি খরচ মনে হওয়া উচিত যা আপনি দিতে বেছে নিচ্ছেন।') },
        { note: l('Think of a shared meeting room with one key. A plain lock is the key: only the holder can enter. A lease is a key that self-expires after an hour, so a holder who wanders off does not lock the room forever. A fencing token is a number stamped on the key that increases each time it is handed out — so a stale key-holder who comes back is refused.', 'এক চাবিওয়ালা একটি shared মিটিং রুম ভাবুন। সাধারণ lock হলো চাবি: কেবল holder ঢুকতে পারে। lease এমন চাবি যা এক ঘণ্টা পরে নিজে মেয়াদ শেষ হয়, তাই হারিয়ে যাওয়া holder ঘর চিরকাল আটকে রাখে না। fencing token হলো চাবিতে ছাপা একটি সংখ্যা যা প্রতিবার হস্তান্তরে বাড়ে—তাই ফিরে আসা পুরোনো চাবি-holder প্রত্যাখ্যাত হয়।'), kind: 'tip' },
      ],
    },
    {
      h: l('How it works — leases and fencing tokens', 'কীভাবে কাজ করে — lease ও fencing token'),
      blocks: [
        { p: l('The dangerous failure with a plain lock is the "stale owner." A worker acquires the lock, then pauses — a long garbage-collection freeze or a network stall — long enough that the system assumes it died and hands the lock to someone else. Now two workers believe they hold it. Leases and fencing tokens are the standard defence, and every correct locking scheme uses them together.', 'সাধারণ lock-এর বিপজ্জনক ব্যর্থতা হলো "stale owner"। একটি worker lock নেয়, তারপর থামে—একটি দীর্ঘ garbage-collection freeze বা network stall—এত সময় যে সিস্টেম ধরে নেয় এটি মরে গেছে ও lock অন্যকে দেয়। এখন দুটি worker বিশ্বাস করে তারা এটি ধরে আছে। lease ও fencing token আদর্শ প্রতিরক্ষা, আর প্রতিটি সঠিক locking স্কিম এদের একসঙ্গে ব্যবহার করে।') },
        { steps: [
          l('A worker acquires a lease: the lock service grants ownership for a bounded time (say 30s) and returns a fencing token — a number that strictly increases on every grant.', 'একটি worker একটি lease নেয়: lock service একটি সীমিত সময়ের (ধরুন ৩০s) জন্য মালিকানা দেয় ও একটি fencing token ফেরত দেয়—একটি সংখ্যা যা প্রতিটি grant-এ কঠোরভাবে বাড়ে।'),
          l('The worker does its job and includes its token on every write to the protected resource.', 'worker তার কাজ করে ও protected resource-এ প্রতিটি write-এ তার token যুক্ত করে।'),
          l('The resource remembers the highest token it has seen and rejects any write carrying a lower token.', 'resource সে যে সর্বোচ্চ token দেখেছে তা মনে রাখে ও কম token বহনকারী যেকোনো write প্রত্যাখ্যান করে।'),
          l('If the worker pauses past the lease, the service grants a new lease to another worker with a higher token.', 'worker lease-এর বেশি সময় থামলে service উচ্চতর token সহ আরেকটি worker-কে নতুন lease দেয়।'),
          l('When the paused worker wakes and tries to write with its old, lower token, the resource rejects it — the fence holds even though the worker still "thinks" it owns the lock.', 'থেমে থাকা worker জেগে তার পুরোনো, কম token দিয়ে write করার চেষ্টা করলে resource তা প্রত্যাখ্যান করে—worker এখনো মালিক "ভাবলেও" fence টিকে থাকে।'),
        ] },
        { code: `acquire():
  lease = lock_service.acquire("charge:order-42", ttl=30s)
  # lease.token is monotonic: 1, 2, 3, ... never reused

on each write to the resource:
  if write.token < resource.max_seen_token:
      reject   # a newer owner already exists -> we are stale
  else:
      resource.max_seen_token = write.token
      apply(write)

# A paused worker with token=7 cannot overwrite work done by token=8.`, caption: l('The fencing token turns "I still hold the lock" into a checkable fact. The resource, not the worker, has the final say.', 'fencing token "আমি এখনো lock ধরে আছি"-কে একটি যাচাইযোগ্য তথ্যে পরিণত করে। worker নয়, resource-এর চূড়ান্ত কথা।') },
      ],
    },
    {
      h: l('Logical clocks — ordering without trusting time', 'logical clock — সময় বিশ্বাস না করে ordering'),
      blocks: [
        { p: l('Wall-clock time is a trap in distributed systems. Server clocks drift, get corrected by NTP, and can even jump backwards, so you cannot decide which of two events happened first by comparing timestamps. Logical clocks solve this by counting causality instead of seconds. A Lamport clock is a single counter each node bumps on every event and attaches to every message; a receiver sets its counter to max(local, received) + 1. If A causally happened before B, then A’s Lamport number is smaller — a reliable order that never depends on real time.', 'দেয়ালঘড়ির সময় distributed system-এ একটি ফাঁদ। server clock drift করে, NTP দিয়ে ঠিক হয়, এমনকি পেছনে লাফ দিতে পারে, তাই timestamp তুলনা করে দুটি event-এর কোনটি আগে ঘটেছে ঠিক করা যায় না। logical clock এটি সমাধান করে সেকেন্ডের বদলে causality গুনে। একটি Lamport clock একটি একক counter যা প্রতিটি node প্রতিটি event-এ বাড়ায় ও প্রতিটি message-এ যুক্ত করে; একটি receiver তার counter max(local, received) + 1-এ সেট করে। A যদি causally B-এর আগে ঘটে, তবে A-এর Lamport সংখ্যা ছোট—একটি নির্ভরযোগ্য order যা কখনো বাস্তব সময়ের ওপর নির্ভর করে না।') },
        { p: l('A Lamport clock tells you an order but cannot tell whether two events were truly concurrent (neither caused the other). A vector clock can: each node keeps a vector of counters, one per node, so comparing two vectors reveals "A before B," "B before A," or "concurrent." That extra power is what lets systems like Dynamo detect conflicting writes instead of silently losing one. The price is a vector that grows with the number of nodes.', 'একটি Lamport clock একটি order বলে কিন্তু বলতে পারে না দুটি event সত্যিই concurrent ছিল কিনা (কেউ কাউকে ঘটায়নি)। একটি vector clock পারে: প্রতিটি node প্রতি-node একটি করে counter-এর একটি vector রাখে, তাই দুটি vector তুলনায় "A আগে B," "B আগে A," বা "concurrent" প্রকাশ পায়। সেই বাড়তি ক্ষমতাই Dynamo-র মতো সিস্টেমকে conflicting write শনাক্ত করতে দেয়, একটি নীরবে হারানোর বদলে। দাম হলো একটি vector যা node সংখ্যার সঙ্গে বাড়ে।') },
      ],
    },
    {
      h: l('Comparing the mechanisms', 'যন্ত্রগুলো তুলনা'),
      blocks: [
        { table: {
          head: [l('Mechanism', 'যন্ত্র'), l('Gives you', 'যা দেয়'), l('Watch out for', 'যা খেয়াল রাখবেন')],
          rows: [
            [l('Plain lock', 'সাধারণ lock'), l('Mutual exclusion across machines.', 'মেশিনজুড়ে mutual exclusion।'), l('A crashed holder can freeze everyone forever.', 'ক্র্যাশ করা holder সবাইকে চিরকাল জমাতে পারে।')],
            [l('Lease', 'lease'), l('Exclusion that auto-expires, so it self-heals.', 'auto-expire হওয়া exclusion, তাই নিজে সারে।'), l('A paused holder may still act after expiry.', 'থেমে থাকা holder মেয়াদ শেষেও কাজ করতে পারে।')],
            [l('Fencing token', 'fencing token'), l('Rejects stale owners at the resource.', 'resource-এ stale owner প্রত্যাখ্যান করে।'), l('The resource must actually check the token.', 'resource-কে আসলেই token যাচাই করতে হয়।')],
            [l('Lamport clock', 'Lamport clock'), l('A consistent total order of events.', 'event-এর একটি সঙ্গতিপূর্ণ total order।'), l('Cannot tell if two events are concurrent.', 'দুটি event concurrent কিনা বলতে পারে না।')],
            [l('Vector clock', 'vector clock'), l('Detects causality and true concurrency.', 'causality ও সত্যিকার concurrency শনাক্ত করে।'), l('Size grows with the number of nodes.', 'আকার node সংখ্যার সঙ্গে বাড়ে।')],
          ],
        } },
      ],
    },
    {
      h: l('When and where to use them', 'কখন ও কোথায় ব্যবহার করবেন'),
      blocks: [
        { p: l('The first rule is to avoid distributed locking when you can, because it adds latency, a new availability dependency, and stale-owner hazards. Often you can design the problem away: make the operation idempotent (safe to run twice, keyed by a request id) so exactness no longer needs exclusivity, or partition ownership so each key is handled by exactly one worker and no lock is required at all.', 'প্রথম নিয়ম হলো সম্ভব হলে distributed locking এড়ানো, কারণ এটি latency, একটি নতুন availability নির্ভরতা ও stale-owner বিপদ যোগ করে। প্রায়ই আপনি সমস্যাটি ডিজাইন করে সরাতে পারেন: operation-কে idempotent করুন (দুবার চালানো নিরাপদ, একটি request id দিয়ে keyed) যাতে সঠিকতার আর exclusivity লাগে না, অথবা ownership partition করুন যাতে প্রতিটি key ঠিক একটি worker সামলায় ও কোনো lock লাগেই না।') },
        { list: [
          l('Use a lease + fencing token when locking is genuinely unavoidable — a leader election, a single cron runner, a one-time migration.', 'lease + fencing token নিন যখন locking সত্যিই অনিবার্য—একটি leader election, একটি একক cron runner, একটি one-time migration।'),
          l('Use logical clocks when you must order or reconcile events across nodes without a trustworthy shared clock — replication, conflict detection, causal consistency.', 'logical clock নিন যখন একটি নির্ভরযোগ্য shared clock ছাড়া node-জুড়ে event order বা reconcile করতে হয়—replication, conflict detection, causal consistency।'),
          l('Prefer idempotency and partitioned ownership first; treat a lock as the tool of last resort.', 'আগে idempotency ও partitioned ownership নিন; lock-কে শেষ উপায়ের যন্ত্র ধরুন।'),
        ] },
      ],
    },
    {
      h: l('Common mistakes', 'সাধারণ ভুল'),
      blocks: [
        { list: [
          l('Assuming a client that lost its lease immediately stopped executing. It may be frozen and about to wake up — only a fencing token at the resource can stop its stale write.', 'lease হারানো ক্লায়েন্ট তাৎক্ষণিকভাবে কাজ বন্ধ করেছে ধরে নেওয়া। এটি জমে থাকতে ও জাগতে পারে—কেবল resource-এ একটি fencing token তার stale write থামাতে পারে।'),
          l('Using a lock without an expiry (no lease). A crashed holder then blocks the system indefinitely.', 'মেয়াদ ছাড়া lock ব্যবহার (কোনো lease নেই)। তখন ক্র্যাশ করা holder সিস্টেম অনির্দিষ্টকাল আটকে রাখে।'),
          l('Ordering distributed events by wall-clock timestamps. Clocks drift and jump; use logical clocks for causal order.', 'দেয়ালঘড়ির timestamp দিয়ে distributed event সাজানো। ঘড়ি drift করে ও লাফ দেয়; causal order-এর জন্য logical clock নিন।'),
          l('Reaching for a lock when idempotency or partitioning would remove the need entirely.', 'lock-এর জন্য হাত বাড়ানো যখন idempotency বা partitioning পুরো প্রয়োজনটাই সরিয়ে দিত।'),
        ] },
      ],
    },
    {
      h: l('Remember in one line', 'এক লাইনে মনে রাখুন'),
      blocks: [
        { list: [
          l('Locks give exclusivity, leases add an expiry so ownership self-heals, and fencing tokens reject stale owners at the resource.', 'lock exclusivity দেয়, lease একটি মেয়াদ যোগ করে যাতে মালিকানা নিজে সারে, আর fencing token resource-এ stale owner প্রত্যাখ্যান করে।'),
          l('Logical clocks (Lamport, vector) order events by causality, never by untrustworthy wall time.', 'logical clock (Lamport, vector) event-কে causality দিয়ে সাজায়, কখনো অবিশ্বস্ত দেয়ালঘড়ি দিয়ে নয়।'),
          l('Prefer idempotency and partitioned ownership; when you must lock, always use a lease plus a fencing token.', 'আগে idempotency ও partitioned ownership নিন; lock করতেই হলে সবসময় একটি lease ও fencing token নিন।'),
        ] },
      ],
    },
  ],

  // ── probabilistic · Bloom filters & probabilistic structures ──────────────
  'probabilistic': [
    {
      h: l('What are probabilistic data structures?', 'প্রোবাবিলিস্টিক ডেটা স্ট্রাকচার কী?'),
      blocks: [
        { p: l('Probabilistic data structures answer questions about huge data sets using tiny, fixed memory — in exchange for a small, controlled error rate. Instead of storing every item so it can answer exactly, they store a compressed fingerprint and give an approximate answer whose error you can tune. The three you meet most often are the Bloom filter (is this item in the set?), HyperLogLog (how many distinct items are there?), and the count-min sketch (roughly how often has this item appeared?).', 'প্রোবাবিলিস্টিক ডেটা স্ট্রাকচার বিশাল ডেটা সেট নিয়ে প্রশ্নের উত্তর দেয় ক্ষুদ্র, নির্দিষ্ট মেমরি ব্যবহার করে—বিনিময়ে একটি ছোট, নিয়ন্ত্রিত error rate। প্রতিটি item সংরক্ষণ করে হুবহু উত্তর দেওয়ার বদলে এরা একটি compressed fingerprint রাখে ও একটি আনুমানিক উত্তর দেয় যার error আপনি tune করতে পারেন। সবচেয়ে বেশি যে তিনটির দেখা পাবেন: Bloom filter (item কি set-এ আছে?), HyperLogLog (কতগুলো distinct item?), ও count-min sketch (item কতবার এসেছে, মোটামুটি?)।') },
        { p: l('The reason they matter is scale. Tracking whether each of a billion URLs has been seen, or counting the unique visitors to a giant website, would cost gigabytes with an exact set or hash table. A probabilistic structure does it in a few megabytes or less. You accept that the answer is occasionally wrong in a specific, bounded way, and in return you fit the whole problem in memory.', 'এগুলো গুরুত্বপূর্ণ হওয়ার কারণ scale। একশো কোটি URL-এর প্রতিটি দেখা হয়েছে কিনা ট্র্যাক করা, বা একটি বিশাল ওয়েবসাইটের unique visitor গোনা exact set বা hash table দিয়ে gigabyte খরচ করত। একটি probabilistic structure তা কয়েক megabyte বা তার কমে করে। আপনি মেনে নেন উত্তর মাঝেমধ্যে একটি নির্দিষ্ট, সীমিত উপায়ে ভুল, বিনিময়ে পুরো সমস্যা মেমরিতে ধরে।') },
        { note: l('Imagine a bouncer with a quick guest-list screen. Before doing a slow, full lookup in the master ledger, the screen instantly says "definitely not on the list" or "possibly on the list." A "no" is always trustworthy; a "possibly" still needs the full check. That is exactly how a Bloom filter behaves.', 'দ্রুত অতিথি-তালিকা স্ক্রিনওয়ালা একজন bouncer কল্পনা করুন। master ledger-এ ধীর, পূর্ণ খোঁজের আগে স্ক্রিন সঙ্গে সঙ্গে বলে "নিশ্চিত তালিকায় নেই" বা "সম্ভবত তালিকায় আছে।" একটি "না" সবসময় বিশ্বাসযোগ্য; একটি "সম্ভবত"-এর এখনো পূর্ণ যাচাই দরকার। একটি Bloom filter ঠিক এভাবেই আচরণ করে।'), kind: 'tip' },
      ],
    },
    {
      h: l('How a Bloom filter works', 'একটি Bloom filter কীভাবে কাজ করে'),
      blocks: [
        { p: l('A Bloom filter is just a bit array (all zeros to start) plus a handful of independent hash functions. It never stores the items themselves — only bits — which is why it is so small and why it can never list what is inside it.', 'একটি Bloom filter কেবল একটি bit array (শুরুতে সব শূন্য) আর কয়েকটি স্বাধীন hash function। এটি কখনো item নিজে রাখে না—কেবল bit—এ কারণেই এটি এত ছোট ও এ কারণেই এটি কখনো ভেতরে কী আছে তালিকা করতে পারে না।') },
        { steps: [
          l('To add an item, hash it with each of the k hash functions to get k positions, and set those bits to 1.', 'একটি item যোগ করতে, প্রতিটি k hash function দিয়ে hash করে k-টি position পান, ও সেই bit-গুলো 1 করুন।'),
          l('To test an item, hash it the same way and look at those same k positions.', 'একটি item পরীক্ষা করতে, একইভাবে hash করে সেই একই k position দেখুন।'),
          l('If ANY of those bits is 0, the item was definitely never added — a true negative, guaranteed.', 'সেই bit-গুলোর যেকোনো একটি 0 হলে, item নিশ্চিতভাবে কখনো যোগ হয়নি—একটি নিশ্চিত true negative।'),
          l('If ALL of those bits are 1, the item is probably present — but other items may have set those same bits, so it could be a false positive.', 'সেই সব bit 1 হলে, item সম্ভবত উপস্থিত—কিন্তু অন্য item সেই একই bit সেট করে থাকতে পারে, তাই এটি একটি false positive হতে পারে।'),
        ] },
        { code: `bits = [0] * m            # m-bit array, k hash functions

add(x):
  for i in 1..k:
      bits[ hash_i(x) % m ] = 1

might_contain(x):
  for i in 1..k:
      if bits[ hash_i(x) % m ] == 0:
          return "NO   (definitely absent)"
  return "MAYBE (possibly present -> do full lookup)"

# Sizing: for n items and false-positive rate p,
#   m = -n * ln(p) / (ln 2)^2      bits
#   k =  (m / n) * ln 2            hash functions
# e.g. n = 1,000,000 and p = 1%  ->  ~9.6 Mbit (~1.2 MB), k = 7`, caption: l('"NO" is always correct; "MAYBE" means fall back to the real store. Note there is no delete — clearing a bit could break another item that shares it.', '"NO" সবসময় সঠিক; "MAYBE" মানে আসল store-এ ফিরে যান। খেয়াল করুন কোনো delete নেই—একটি bit মোছা তা ভাগ করা অন্য item ভাঙতে পারে।') },
      ],
    },
    {
      h: l('Counting: HyperLogLog and count-min sketch', 'গোনা: HyperLogLog ও count-min sketch'),
      blocks: [
        { p: l('Bloom filters answer membership; two cousins answer counting questions. HyperLogLog estimates the number of distinct items (cardinality) in a stream using a clever observation: if you hash items to random bit patterns, the more distinct items you have seen, the more likely you are to have seen a very rare pattern (like a long run of leading zeros). By tracking only the rarest pattern per bucket, it estimates counts in the billions using around 1.5 KB, with a typical error of about 2%.', 'Bloom filter membership-এর উত্তর দেয়; দুটি জ্ঞাতি গোনার প্রশ্নের উত্তর দেয়। HyperLogLog একটি stream-এ distinct item-এর সংখ্যা (cardinality) আন্দাজ করে একটি চতুর পর্যবেক্ষণ দিয়ে: যদি আপনি item-কে random bit pattern-এ hash করেন, যত বেশি distinct item দেখেছেন, তত বেশি সম্ভাবনা একটি খুব বিরল pattern (যেমন শুরুতে দীর্ঘ শূন্যের সারি) দেখার। প্রতি bucket-এ কেবল বিরলতম pattern ট্র্যাক করে এটি প্রায় ১.৫ KB ব্যবহার করে শত কোটির গণনা আন্দাজ করে, সাধারণ error প্রায় ২%।') },
        { p: l('A count-min sketch estimates frequency: roughly how many times has each item appeared? It is a small 2-D array of counters with several hash functions; to record an item you increment one counter per row, and to query you take the minimum across those rows (the minimum reduces the effect of collisions). It never undercounts — its estimate is always greater than or equal to the truth — which makes it ideal for finding "heavy hitters" like the most frequent search queries or the noisiest IP addresses.', 'একটি count-min sketch frequency আন্দাজ করে: প্রতিটি item মোটামুটি কতবার এসেছে? এটি কয়েকটি hash function সহ counter-এর একটি ছোট 2-D array; একটি item লিপিবদ্ধ করতে প্রতি row-তে একটি counter বাড়ান, আর query করতে সেই row-গুলোর minimum নেন (minimum collision-এর প্রভাব কমায়)। এটি কখনো কম গোনে না—এর আন্দাজ সবসময় সত্যের চেয়ে বেশি বা সমান—যা এটিকে "heavy hitter" খুঁজতে আদর্শ করে, যেমন সবচেয়ে ঘন search query বা সবচেয়ে হৈচৈ করা IP ঠিকানা।') },
      ],
    },
    {
      h: l('Comparing the structures', 'structure-গুলো তুলনা'),
      blocks: [
        { table: {
          head: [l('Structure', 'structure'), l('Question it answers', 'যে প্রশ্নের উত্তর'), l('Error direction', 'error-এর দিক'), l('Typical memory', 'সাধারণ মেমরি')],
          rows: [
            [l('Bloom filter', 'Bloom filter'), l('Is x in the set?', 'x কি set-এ?'), l('False positives only; never a false "no".', 'কেবল false positive; কখনো ভুল "না" নয়।'), l('~1.2 MB for 1M items at 1%', '১% এ ১০ লক্ষ item-এ ~১.২ MB')],
            [l('HyperLogLog', 'HyperLogLog'), l('How many distinct items?', 'কতগুলো distinct item?'), l('~2% over or under.', '~২% বেশি বা কম।'), l('~1.5 KB for billions', 'শত কোটির জন্য ~১.৫ KB')],
            [l('Count-min sketch', 'count-min sketch'), l('How often did x appear?', 'x কতবার এসেছে?'), l('Overestimates; never undercounts.', 'বেশি আন্দাজ; কখনো কম নয়।'), l('KBs, tunable by width/depth', 'KB, width/depth দিয়ে tunable')],
            [l('Exact set / hash map', 'exact set / hash map'), l('Any of the above, exactly.', 'উপরের যেকোনোটি, হুবহু।'), l('None — always correct.', 'নেই—সবসময় সঠিক।'), l('Grows with every item (GBs)', 'প্রতি item-এ বাড়ে (GB)')],
          ],
        } },
      ],
    },
    {
      h: l('When and where to use them', 'কখন ও কোথায় ব্যবহার করবেন'),
      blocks: [
        { p: l('The classic pattern is to place a Bloom filter in front of an expensive lookup that is usually going to miss. Databases like Cassandra keep a Bloom filter per storage file so a read can skip files that definitely do not contain the key, avoiding slow disk reads. A CDN or cache can use one to answer "have we ever seen this URL?" without touching the backing store, and crawlers use them to skip already-visited pages.', 'ক্লাসিক প্যাটার্ন হলো একটি ব্যয়বহুল lookup-এর সামনে একটি Bloom filter রাখা যা সাধারণত miss করবে। Cassandra-র মতো ডেটাবেস প্রতি storage file-এ একটি Bloom filter রাখে যাতে একটি read সেই file এড়াতে পারে যাতে key নিশ্চিতভাবে নেই, ধীর disk read এড়িয়ে। একটি CDN বা cache একটি দিয়ে "আমরা কি এই URL কখনো দেখেছি?" উত্তর দিতে পারে backing store স্পর্শ না করে, আর crawler এগুলো ব্যবহার করে ইতিমধ্যে দেখা পেজ এড়াতে।') },
        { list: [
          l('Reach for a Bloom filter when a "no" lets you skip expensive work, and a rare false "maybe" only costs one extra real lookup.', 'Bloom filter নিন যখন একটি "না" ব্যয়বহুল কাজ এড়াতে দেয়, আর একটি বিরল ভুল "সম্ভবত" কেবল একটি বাড়তি আসল lookup খরচ করে।'),
          l('Size it up front from the item count and the false-positive rate you can tolerate — you cannot resize it cheaply later.', 'আগেভাগে item সংখ্যা ও আপনি যত false-positive সহ্য করতে পারেন তা থেকে আকার ঠিক করুন—পরে সস্তায় resize করা যায় না।'),
          l('Use HyperLogLog for unique counts (visitors, distinct search terms) and count-min for frequency (top queries, rate limiting).', 'unique গণনায় (visitor, distinct search term) HyperLogLog নিন ও frequency-তে (top query, rate limiting) count-min।'),
          l('Never use them where an exact, auditable answer is required — money, security, correctness-critical membership.', 'যেখানে একটি হুবহু, auditable উত্তর দরকার সেখানে কখনো নয়—টাকা, security, সঠিকতা-জরুরি membership।'),
        ] },
      ],
    },
    {
      h: l('Common mistakes', 'সাধারণ ভুল'),
      blocks: [
        { list: [
          l('Treating a Bloom filter’s "possibly present" as proof the record exists. It only rules things out; a "maybe" must still be confirmed against the real store.', 'একটি Bloom filter-এর "সম্ভবত উপস্থিত"-কে রেকর্ড থাকার প্রমাণ ধরা। এটি কেবল জিনিস বাদ দেয়; একটি "সম্ভবত" এখনো আসল store-এ যাচাই করতে হয়।'),
          l('Expecting to delete items from a plain Bloom filter. Clearing bits corrupts other items — use a counting Bloom filter if deletes are required.', 'একটি সাধারণ Bloom filter থেকে item delete করার আশা করা। bit মোছা অন্য item নষ্ট করে—delete দরকার হলে counting Bloom filter নিন।'),
          l('Under-sizing the filter so it fills up; as more bits become 1, the false-positive rate climbs until the filter is useless.', 'filter ছোট বানানো যাতে ভরে যায়; যত বেশি bit 1 হয়, false-positive rate বাড়ে যতক্ষণ না filter অকেজো হয়।'),
          l('Using a probabilistic answer where correctness is non-negotiable, then being surprised by the built-in error.', 'যেখানে সঠিকতা অ-আপোষযোগ্য সেখানে একটি probabilistic উত্তর ব্যবহার করে পরে অন্তর্নিহিত error-এ অবাক হওয়া।'),
        ] },
      ],
    },
    {
      h: l('Remember in one line', 'এক লাইনে মনে রাখুন'),
      blocks: [
        { list: [
          l('Probabilistic structures trade a small, controlled error for enormous memory savings at scale.', 'প্রোবাবিলিস্টিক structure স্কেলে বিশাল মেমরি সাশ্রয়ের বিনিময়ে একটি ছোট, নিয়ন্ত্রিত error নেয়।'),
          l('A Bloom filter says "definitely no" or "maybe yes" — a "maybe" always needs a real lookup, and it has false positives but never false negatives.', 'একটি Bloom filter বলে "নিশ্চিত না" বা "সম্ভবত হ্যাঁ"—একটি "সম্ভবত"-এর সবসময় আসল lookup দরকার, আর এতে false positive আছে কিন্তু কখনো false negative নেই।'),
          l('Use HyperLogLog for distinct counts and count-min for frequencies; never use any of them where the answer must be exact.', 'distinct গণনায় HyperLogLog ও frequency-তে count-min নিন; উত্তর হুবহু হতে হলে এদের কোনোটিই কখনো নয়।'),
        ] },
      ],
    },
  ],
}
