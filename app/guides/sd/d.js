// Deep, bilingual (English / Bangla) teaching guides for the System Design course —
// Distributed-systems building blocks: consistent hashing, leader election, rate
// limiting, idempotency, and sagas. Shape mirrors app/course-guides.js and
// app/guides/docker/a.js: each guide is an array of sections { h, blocks }, rendered
// by GuideBlock in app/LearningApp.js. Block types: { p }, { list }, { steps },
// { table:{head,rows} }, { note, kind }, { code, caption }.
// Facts (definitions, analogies, trade-offs, mistakes) come from app/data.js rawTopics.

const l = (en, bn) => ({ en, bn })

export default {
  // ── consistent-hashing · Consistent hashing ───────────────────────────────
  'consistent-hashing': [
    {
      h: l('What is consistent hashing?', 'কনসিস্টেন্ট হ্যাশিং কী?'),
      blocks: [
        { p: l('Consistent hashing is a technique for deciding which server owns a given piece of data, in a way that barely changes when servers are added or removed. It solves one specific pain: in a distributed cache or database, you must map millions of keys onto a handful of nodes, and that mapping has to survive nodes joining and failing without shuffling almost everything around.', 'কনসিস্টেন্ট হ্যাশিং হলো একটি কৌশল যা ঠিক করে কোন সার্ভার একটি নির্দিষ্ট ডেটার মালিক, এমনভাবে যাতে সার্ভার যোগ বা বাদ হলে মালিকানা প্রায় বদলায় না। এটি একটি নির্দিষ্ট সমস্যা সমাধান করে: একটি ডিস্ট্রিবিউটেড cache বা database-এ লক্ষ লক্ষ key কয়েকটি node-এ ম্যাপ করতে হয়, আর সেই ম্যাপিংকে node যোগ বা fail হওয়ার সময়ও প্রায় সবকিছু এলোমেলো না করে টিকে থাকতে হয়।') },
        { p: l('The naive approach is server = hash(key) % N, where N is the number of servers. It works until N changes. Add or remove one server and N becomes N±1, so hash(key) % N gives a different answer for almost every key. In a cache that means a near-total miss storm; in a sharded database it means moving most of your data. Consistent hashing exists to make that cost proportional to the change, not catastrophic.', 'সরল উপায় হলো server = hash(key) % N, যেখানে N হলো সার্ভার সংখ্যা। N না বদলানো পর্যন্ত এটি চলে। একটি সার্ভার যোগ বা বাদ দিলে N হয়ে যায় N±1, তাই প্রায় প্রতিটি key-এর জন্য hash(key) % N ভিন্ন উত্তর দেয়। cache-এ এর মানে প্রায়-সম্পূর্ণ miss ঝড়; sharded database-এ এর মানে বেশিরভাগ ডেটা সরানো। কনসিস্টেন্ট হ্যাশিং এই খরচকে পরিবর্তনের অনুপাতে রাখে, বিপর্যয়কর নয়।') },
        { note: l('Adding a new librarian to a library should only move the shelves nearest to them — not force a reorganization of the entire building. Consistent hashing makes a new node take over just the slice of keys next to it, leaving every other node untouched.', 'একটি লাইব্রেরিতে নতুন লাইব্রেরিয়ান এলে শুধু তার সবচেয়ে কাছের তাকগুলো বদলানো উচিত—পুরো ভবন নতুন করে সাজানো নয়। কনসিস্টেন্ট হ্যাশিং একটি নতুন node-কে শুধু তার পাশের key-এর অংশটুকুর দায়িত্ব দেয়, বাকি প্রতিটি node অস্পর্শিত থাকে।'), kind: 'tip' },
      ],
    },
    {
      h: l('How it works, step by step', 'কীভাবে কাজ করে, ধাপে ধাপে'),
      blocks: [
        { p: l('The core idea is a ring. Imagine a circle of hash values from 0 up to a very large number (say 2^32) that wraps back to 0. Both servers and keys are hashed onto positions on this same ring, and a key belongs to the first server you meet walking clockwise from the key.', 'মূল ধারণা হলো একটি ring। ০ থেকে খুব বড় একটি সংখ্যা (ধরুন 2^32) পর্যন্ত hash মানের একটি বৃত্ত কল্পনা করুন যা আবার ০-তে ফিরে আসে। সার্ভার ও key দুটোই এই একই ring-এর অবস্থানে hash করা হয়, আর একটি key সেই প্রথম সার্ভারের অন্তর্গত যাকে key থেকে clockwise হাঁটলে পাওয়া যায়।') },
        { steps: [
          l('Hash each server (by its id or IP) onto a position on the ring.', 'প্রতিটি সার্ভারকে (তার id বা IP দিয়ে) ring-এর একটি অবস্থানে hash করুন।'),
          l('Hash each key onto the ring the same way, using the same hash function.', 'একই hash function দিয়ে প্রতিটি key-কেও একইভাবে ring-এ hash করুন।'),
          l('To find a key’s owner, walk clockwise from the key’s position until you hit the first server. That server owns the key.', 'একটি key-এর মালিক খুঁজতে, key-এর অবস্থান থেকে clockwise হাঁটুন যতক্ষণ না প্রথম সার্ভার পান। সেই সার্ভার key-এর মালিক।'),
          l('When a server is added, only the keys between it and its previous neighbour move to it — every other key stays put.', 'একটি সার্ভার যোগ হলে শুধু তার ও তার আগের প্রতিবেশীর মধ্যকার key-গুলো তার কাছে যায়—বাকি প্রতিটি key যেখানে ছিল থাকে।'),
          l('When a server leaves, only its keys shift to the next server clockwise. On average each change touches about K/N keys, where K is total keys and N is server count.', 'একটি সার্ভার চলে গেলে শুধু তার key-গুলো clockwise পরের সার্ভারে যায়। গড়ে প্রতিটি পরিবর্তন প্রায় K/N key স্পর্শ করে, যেখানে K মোট key ও N সার্ভার সংখ্যা।'),
        ] },
        { code: `RING = 2^32                       # positions 0 .. RING-1, wrapping at the top
ring = sorted list of (position, server)

# place each server on the ring (V virtual nodes each — see below)
for server in servers:
  for v in range(V):              # V = a few hundred, e.g. 150
    pos = hash(server.id + "#" + v) mod RING
    ring.insert(pos, server)

# find the owner of a key
def owner(key):
  h = hash(key) mod RING
  i = first index in ring whose position >= h   # binary search
  if i == len(ring): i = 0        # walked off the end -> wrap to the start
  return ring[i].server`, caption: l('The key belongs to the first server clockwise; adding a server only re-homes the slice just behind it.', 'key সেই প্রথম clockwise সার্ভারের; একটি সার্ভার যোগ করলে শুধু তার ঠিক পেছনের অংশটুকু নতুন মালিক পায়।') },
      ],
    },
    {
      h: l('Virtual nodes: fixing uneven load', 'ভার্চুয়াল নোড: অসম লোড ঠিক করা'),
      blocks: [
        { p: l('A plain ring has a flaw: with only a few servers, their random positions leave big and small gaps, so one server can own a huge arc of the ring and become a hotspot. The fix is virtual nodes — instead of placing each physical server once, you place it at many positions (tokens) scattered around the ring. Now each physical server owns many small arcs instead of one big one, and the load evens out.', 'সাধারণ ring-এর একটি ত্রুটি আছে: কম সার্ভার থাকলে তাদের এলোমেলো অবস্থান বড় ও ছোট ফাঁক রেখে দেয়, তাই একটি সার্ভার ring-এর বিশাল একটি অংশের মালিক হয়ে hotspot হতে পারে। সমাধান হলো virtual node—প্রতিটি ফিজিক্যাল সার্ভারকে একবার না বসিয়ে ring-জুড়ে ছড়ানো অনেক অবস্থানে (token) বসান। এখন প্রতিটি ফিজিক্যাল সার্ভার একটি বড় অংশের বদলে অনেক ছোট অংশের মালিক, আর লোড সমান হয়।') },
        { list: [
          l('More virtual nodes per server → smoother distribution, at the cost of a slightly larger ring to search.', 'প্রতি সার্ভারে বেশি virtual node → বেশি মসৃণ বণ্টন, বিনিময়ে খোঁজার জন্য ring একটু বড়।'),
          l('Capacity-aware placement: give a bigger machine more tokens so it earns a proportionally larger share of keys.', 'ক্ষমতা-সচেতন প্লেসমেন্ট: বড় মেশিনকে বেশি token দিন যাতে সে অনুপাতে বেশি key পায়।'),
          l('When a server dies, its many small arcs spread across all remaining servers, so no single neighbour is overwhelmed.', 'একটি সার্ভার মারা গেলে তার অনেক ছোট অংশ বাকি সব সার্ভারে ছড়ায়, তাই কোনো একক প্রতিবেশী চাপে পড়ে না।'),
        ] },
      ],
    },
    {
      h: l('Modulo hashing vs consistent hashing', 'Modulo হ্যাশিং বনাম কনসিস্টেন্ট হ্যাশিং'),
      blocks: [
        { table: {
          head: [l('Aspect', 'দিক'), l('Modulo (hash % N)', 'Modulo (hash % N)'), l('Consistent hashing', 'কনসিস্টেন্ট হ্যাশিং')],
          rows: [
            [l('Keys moved when a node is added/removed', 'node যোগ/বাদে সরানো key'), l('Almost all of them', 'প্রায় সবগুলো'), l('Only about K/N — a small slice', 'শুধু প্রায় K/N—একটি ছোট অংশ')],
            [l('Load balance', 'লোড ব্যালান্স'), l('Even while N is fixed', 'N স্থির থাকলে সমান'), l('Even only with virtual nodes', 'শুধু virtual node দিয়ে সমান')],
            [l('Scaling out', 'স্কেল আউট'), l('Forces a near-total reshuffle', 'প্রায়-সম্পূর্ণ পুনর্বণ্টন বাধ্য করে'), l('Add a node; it steals one slice from neighbours', 'একটি node যোগ; প্রতিবেশীর একটি অংশ নেয়')],
            [l('Lookup cost', 'lookup খরচ'), l('O(1) modulo', 'O(1) modulo'), l('O(log V·N) binary search on the ring', 'ring-এ O(log V·N) binary search')],
            [l('Used by', 'যারা ব্যবহার করে'), l('Simple fixed-size shard sets', 'সরল স্থির-সংখ্যক shard'), l('Dynamo, Cassandra, Riak, memcached clients, CDNs', 'Dynamo, Cassandra, Riak, memcached client, CDN')],
          ],
        } },
      ],
    },
    {
      h: l('When and where to use it', 'কখন ও কোথায় ব্যবহার করবেন'),
      blocks: [
        { p: l('Reach for consistent hashing whenever a fleet of nodes owns partitioned data and the fleet size changes at runtime: distributed caches (so a dead cache node does not invalidate everything), sharded databases and key-value stores, and CDN or load-balancer request routing that must stay sticky as capacity flexes. If your node set is small and truly fixed, plain modulo hashing is simpler and fine.', 'যখন একদল node পার্টিশনড ডেটার মালিক এবং দলের আকার runtime-এ বদলায় তখন কনসিস্টেন্ট হ্যাশিং নিন: ডিস্ট্রিবিউটেড cache (যাতে একটি মৃত cache node সবকিছু invalidate না করে), sharded database ও key-value store, এবং CDN বা load-balancer রিকোয়েস্ট রাউটিং যাকে ক্ষমতা বদলালেও sticky থাকতে হয়। node সংখ্যা কম ও সত্যিই স্থির হলে সাধারণ modulo হ্যাশিং সহজ ও যথেষ্ট।') },
        { note: l('Consistent hashing minimizes movement, but minimal movement does not automatically mean even load. Without enough virtual nodes you can still end up with hotspots — always pair the ring with virtual nodes and, ideally, capacity-aware tokens.', 'কনসিস্টেন্ট হ্যাশিং স্থানান্তর কমায়, কিন্তু কম স্থানান্তর মানেই সমান লোড নয়। যথেষ্ট virtual node ছাড়া এখনো hotspot হতে পারে—ring-এর সঙ্গে সবসময় virtual node এবং আদর্শভাবে ক্ষমতা-সচেতন token রাখুন।'), kind: 'warn' },
      ],
    },
    {
      h: l('Common mistakes', 'সাধারণ ভুল'),
      blocks: [
        { list: [
          l('Using one token per physical node. With few nodes this creates large, uneven arcs and hot ranges. Use a few hundred virtual nodes each.', 'প্রতি ফিজিক্যাল node-এ একটি token ব্যবহার করা। কম node-এ এটি বড়, অসম অংশ ও hot range তৈরি করে। প্রতিটিতে কয়েকশ virtual node ব্যবহার করুন।'),
          l('Assuming minimal key movement equals balanced load — they are different properties; verify the distribution.', 'কম key স্থানান্তরকেই সমান লোড ধরা—এগুলো ভিন্ন বৈশিষ্ট্য; বণ্টন যাচাই করুন।'),
          l('Changing the hash function or ring size later — it re-homes everything, defeating the whole point. Pin them up front.', 'পরে hash function বা ring size বদলানো—এটি সবকিছুর মালিক বদলায়, পুরো উদ্দেশ্য নষ্ট করে। শুরুতেই ঠিক করুন।'),
          l('Ignoring skew from a few very hot keys; consistent hashing balances key ranges, not per-key traffic.', 'কয়েকটি অতি-হট key-এর কারণে skew উপেক্ষা করা; কনসিস্টেন্ট হ্যাশিং key-range সমান করে, প্রতি-key ট্রাফিক নয়।'),
        ] },
      ],
    },
    {
      h: l('Remember in one line', 'এক লাইনে মনে রাখুন'),
      blocks: [
        { list: [
          l('Map servers and keys onto one ring; a key belongs to the first server clockwise.', 'সার্ভার ও key একটি ring-এ বসান; key সেই প্রথম clockwise সার্ভারের।'),
          l('Adding or removing a node moves only about K/N keys, not almost all of them.', 'একটি node যোগ বা বাদে প্রায় K/N key সরে, প্রায় সব নয়।'),
          l('Always use virtual nodes for even load; more tokens = smoother distribution.', 'সমান লোডের জন্য সবসময় virtual node ব্যবহার করুন; বেশি token = মসৃণ বণ্টন।'),
        ] },
      ],
    },
  ],

  // ── leader-election · Leader election & coordination ──────────────────────
  'leader-election': [
    {
      h: l('What is leader election?', 'লিডার নির্বাচন কী?'),
      blocks: [
        { p: l('Leader election is how a group of identical servers agrees that exactly one of them is in charge of a particular job at a particular time. In a distributed system you often run several copies of a service for availability, but some tasks must be done by only one of them — assigning work, writing to a shared resource, or being the single source of truth. Leader election picks that one, and re-picks a new one if it dies.', 'লিডার নির্বাচন হলো একদল অভিন্ন সার্ভার কীভাবে সম্মত হয় যে একটি নির্দিষ্ট সময়ে একটি নির্দিষ্ট কাজের দায়িত্বে ঠিক তাদের একজন। availability-র জন্য প্রায়ই একটি সার্ভিসের কয়েকটি কপি চালানো হয়, কিন্তু কিছু কাজ শুধু একজনকেই করতে হয়—কাজ বণ্টন, একটি shared resource-এ লেখা, বা একমাত্র সত্যের উৎস হওয়া। লিডার নির্বাচন সেই একজনকে বাছে, আর সে মারা গেলে নতুন একজন বাছে।') },
        { p: l('The hard part is not choosing a leader when everyone is healthy — it is agreeing on one leader when the network is dropping messages and nodes are pausing. Two nodes must never both believe they are the leader at the same moment; that is called split-brain and it corrupts data. So leader election is really about safe agreement under failure, which is why it leans on leases (time-limited authority) and terms (a version number for each leadership).', 'কঠিন অংশ সবাই সুস্থ থাকলে একজন লিডার বাছা নয়—নেটওয়ার্ক মেসেজ হারাচ্ছে ও node থামছে তখন একজন লিডারে একমত হওয়া। দুটি node কখনো একই মুহূর্তে দুজনেই নিজেকে লিডার ভাবতে পারবে না; একে split-brain বলে ও এটি ডেটা নষ্ট করে। তাই লিডার নির্বাচন আসলে ব্যর্থতার মধ্যে নিরাপদ ঐকমত্য, এ কারণেই এটি lease (সময়-সীমিত ক্ষমতা) ও term (প্রতিটি নেতৃত্বের একটি ভার্সন নম্বর)-এর ওপর নির্ভর করে।') },
        { note: l('A team appoints one shift lead so there is a single point of decision — but the badge must expire when the shift ends. If the old lead wanders back after their shift, their expired badge no longer opens any doors. A lease is that expiring badge.', 'একটি দল একজন shift lead দেয় যাতে সিদ্ধান্তের একটি বিন্দু থাকে—কিন্তু shift শেষে ব্যাজের মেয়াদ শেষ হতে হয়। পুরোনো lead shift শেষে ফিরে এলে তার মেয়াদোত্তীর্ণ ব্যাজ আর কোনো দরজা খোলে না। lease হলো সেই মেয়াদ-শেষ-হওয়া ব্যাজ।'), kind: 'tip' },
      ],
    },
    {
      h: l('Why you need a single leader', 'কেন একজন লিডার দরকার'),
      blocks: [
        { list: [
          l('Assigning work: one coordinator hands out partitions or tasks so two workers do not grab the same one.', 'কাজ বণ্টন: একজন coordinator partition বা task বিলি করে যাতে দুই worker একই কাজ না নেয়।'),
          l('Ordering writes: a single primary decides the order of updates to a replicated database or log.', 'লেখার ক্রম: একটি single primary একটি রেপ্লিকেটেড database বা log-এ আপডেটের ক্রম ঠিক করে।'),
          l('Owning a resource: one node runs a scheduled job or holds a lock so it does not run twice.', 'একটি resource-এর মালিকানা: একটি node একটি scheduled job চালায় বা একটি lock ধরে যাতে তা দুবার না চলে।'),
          l('Cluster management: one controller reacts to nodes joining and leaving (this is what Kubernetes, Kafka, and databases do internally).', 'ক্লাস্টার ব্যবস্থাপনা: একটি controller node যোগ ও বাদে সাড়া দেয় (Kubernetes, Kafka ও database ভেতরে এটাই করে)।'),
        ] },
      ],
    },
    {
      h: l('How an election works, step by step', 'একটি নির্বাচন কীভাবে হয়, ধাপে ধাপে'),
      blocks: [
        { steps: [
          l('Every node connects to a shared coordination service (like ZooKeeper or etcd) that can make one atomic decision.', 'প্রতিটি node একটি shared coordination service-এ (যেমন ZooKeeper বা etcd) যুক্ত হয় যা একটি atomic সিদ্ধান্ত নিতে পারে।'),
          l('Each node tries to acquire the leadership lock — for example by creating the same well-known key. Only one write can win.', 'প্রতিটি node নেতৃত্বের lock নিতে চেষ্টা করে—যেমন একই well-known key তৈরি করে। শুধু একটি write জিততে পারে।'),
          l('The winner becomes leader and is granted a lease: authority that is valid only for a short TTL (say 10 seconds).', 'বিজয়ী লিডার হয় ও একটি lease পায়: এমন ক্ষমতা যা শুধু একটি ছোট TTL (ধরুন ১০ সেকেন্ড) পর্যন্ত বৈধ।'),
          l('The leader keeps sending heartbeats to renew its lease before it expires, proving it is still alive and in charge.', 'লিডার তার lease মেয়াদ শেষের আগে renew করতে heartbeat পাঠাতে থাকে, প্রমাণ করে সে এখনো জীবিত ও দায়িত্বে।'),
          l('If heartbeats stop and the lease expires, the coordination service releases the lock and the remaining nodes race to become the new leader — with a higher term number.', 'heartbeat থামলে ও lease-এর মেয়াদ শেষ হলে coordination service lock ছেড়ে দেয় ও বাকি node-রা নতুন লিডার হতে দৌড়ায়—একটি বড় term নম্বর নিয়ে।'),
          l('Every action the leader takes carries its term, so downstream systems can reject anything stamped with an old term.', 'লিডারের প্রতিটি কাজ তার term বহন করে, তাই downstream সিস্টেম পুরোনো term-চিহ্নিত যেকোনো কিছু প্রত্যাখ্যান করতে পারে।'),
        ] },
        { note: l('Do not build election yourself with ad-hoc timeouts. Use a battle-tested consensus service (ZooKeeper, etcd, Consul) — they implement the hard math (Raft/Paxos/ZAB) that keeps agreement safe under partitions.', 'নিজে ad-hoc timeout দিয়ে নির্বাচন বানাবেন না। একটি প্রমাণিত consensus service (ZooKeeper, etcd, Consul) ব্যবহার করুন—তারা সেই কঠিন গণিত (Raft/Paxos/ZAB) বাস্তবায়ন করে যা partition-এর মধ্যেও ঐকমত্য নিরাপদ রাখে।'), kind: 'tip' },
      ],
    },
    {
      h: l('Coordination tools compared', 'coordination টুল তুলনা'),
      blocks: [
        { table: {
          head: [l('Tool', 'টুল'), l('Consensus', 'consensus'), l('How election is done', 'নির্বাচন কীভাবে হয়')],
          rows: [
            [l('ZooKeeper', 'ZooKeeper'), l('ZAB', 'ZAB'), l('Ephemeral sequential znodes; lowest sequence wins, disappears on disconnect.', 'Ephemeral sequential znode; সর্বনিম্ন sequence জেতে, সংযোগ ছুটলে মুছে যায়।')],
            [l('etcd', 'etcd'), l('Raft', 'Raft'), l('Keys with a lease/TTL; a campaign API grants leadership on a compare-and-swap.', 'lease/TTL সহ key; একটি campaign API compare-and-swap-এ নেতৃত্ব দেয়।')],
            [l('Consul', 'Consul'), l('Raft', 'Raft'), l('Sessions plus lock keys; the session holder is leader until its health check fails.', 'session ও lock key; session-ধারী লিডার যতক্ষণ তার health check ঠিক থাকে।')],
            [l('Redis (with care)', 'Redis (সাবধানে)'), l('None (single node)', 'নেই (single node)'), l('SET NX with expiry as a lock — simple, but needs fencing and is not true consensus.', 'SET NX ও expiry দিয়ে lock—সরল, তবে fencing দরকার ও এটি প্রকৃত consensus নয়।')],
          ],
        } },
      ],
    },
    {
      h: l('The split-brain trap and fencing tokens', 'split-brain ফাঁদ ও fencing token'),
      blocks: [
        { p: l('Here is the trap the mistake column warns about: a heartbeat timeout does not prove the old leader stopped. A leader can freeze on a long garbage-collection pause or a network blip, its lease expires, a new leader is elected — and then the old leader wakes up still believing it is in charge and writes to the database. Now two leaders have acted. The defence is a fencing token: a number that increases every time leadership changes. The protected resource remembers the highest token it has seen and rejects any write carrying a lower one.', 'এই সেই ফাঁদ যা mistake কলাম সতর্ক করে: heartbeat timeout প্রমাণ করে না পুরোনো লিডার থেমেছে। একটি লিডার একটি লম্বা garbage-collection pause বা নেটওয়ার্ক ঝলকে জমে যেতে পারে, তার lease-এর মেয়াদ শেষ হয়, নতুন লিডার নির্বাচিত হয়—তারপর পুরোনো লিডার জেগে ওঠে এখনো নিজেকে দায়িত্বে ভেবে database-এ লেখে। এখন দুই লিডার কাজ করল। প্রতিরক্ষা হলো fencing token: এমন একটি সংখ্যা যা প্রতিবার নেতৃত্ব বদলালে বাড়ে। সুরক্ষিত resource তার দেখা সর্বোচ্চ token মনে রাখে ও কম token-বাহী যেকোনো write প্রত্যাখ্যান করে।') },
        { code: `# the coordinator hands the winner a token that increases each term
lease = coordinator.acquire_leadership()
token = lease.fencing_token          # e.g. 33, then 34 for the next leader

# every protected write must carry the token
storage.write(data, token)

# on the storage side, a paused old leader is fenced out:
def write(data, token):
  if token < highest_token_seen:
    reject("stale leader")           # old leader woke up with token 33; we are at 34
  highest_token_seen = token
  apply(data)`, caption: l('Fencing tokens make the resource itself reject a stale leader, so you do not have to trust timeouts alone.', 'fencing token resource-কেই একটি stale লিডার প্রত্যাখ্যান করায়, তাই শুধু timeout-এর ওপর নির্ভর করতে হয় না।') },
      ],
    },
    {
      h: l('When and where to use it', 'কখন ও কোথায় ব্যবহার করবেন'),
      blocks: [
        { p: l('Use leader election when a job must have exactly one owner: a singleton scheduler, a primary database replica, a partition assigner, or a controller loop. Coordination gives you clear ownership and removes duplicate work — but it adds latency (every leadership check crosses the network to the coordination service) and a critical dependency: if that service is down, you may be unable to elect a leader at all. Weigh whether you truly need one leader, or whether idempotency and partitioned ownership could let every node act safely without electing anyone.', 'একটি কাজের ঠিক একজন মালিক লাগলে লিডার নির্বাচন ব্যবহার করুন: একটি singleton scheduler, একটি primary database replica, একটি partition assigner, বা একটি controller loop। coordination স্পষ্ট মালিকানা দেয় ও ডুপ্লিকেট কাজ দূর করে—কিন্তু এটি latency যোগ করে (প্রতিটি নেতৃত্ব যাচাই নেটওয়ার্ক পেরিয়ে coordination service-এ যায়) এবং একটি গুরুত্বপূর্ণ নির্ভরতা: সেই service বন্ধ থাকলে হয়তো কোনো লিডারই নির্বাচন করা যাবে না। ভাবুন সত্যিই একজন লিডার লাগে কিনা, নাকি idempotency ও partitioned মালিকানা প্রতিটি node-কে কাউকে নির্বাচন ছাড়াই নিরাপদে কাজ করতে দিতে পারত।') },
      ],
    },
    {
      h: l('Common mistakes', 'সাধারণ ভুল'),
      blocks: [
        { list: [
          l('Believing a heartbeat timeout proves the old leader has stopped — it may just be paused. Always use fencing tokens.', 'heartbeat timeout মানেই পুরোনো লিডার থেমেছে ধরা—সে হয়তো শুধু paused। সবসময় fencing token ব্যবহার করুন।'),
          l('Rolling your own election with timers instead of a proven consensus service; it will race and split-brain under load.', 'প্রমাণিত consensus service-এর বদলে timer দিয়ে নিজের নির্বাচন বানানো; লোডে এটি race ও split-brain করবে।'),
          l('Setting the lease TTL too short (flapping leaders under a hiccup) or too long (slow failover when a leader really dies).', 'lease TTL খুব ছোট (সামান্য hiccup-এ লিডার বদলাতে থাকে) বা খুব বড় (লিডার সত্যিই মরলে ধীর failover) করা।'),
          l('Forgetting that the coordination service is now a single point of failure — run it as a fault-tolerant cluster (an odd number of nodes).', 'coordination service এখন একটি single point of failure তা ভুলে যাওয়া—এটিকে একটি fault-tolerant ক্লাস্টার (বিজোড় সংখ্যক node) হিসেবে চালান।'),
        ] },
      ],
    },
    {
      h: l('Remember in one line', 'এক লাইনে মনে রাখুন'),
      blocks: [
        { list: [
          l('Leader election picks exactly one coordinator and re-picks a new one when it fails.', 'লিডার নির্বাচন ঠিক একজন coordinator বাছে ও সে fail করলে নতুন একজন বাছে।'),
          l('Leases (expiring authority) and terms (version numbers) keep a stale leader from acting.', 'lease (মেয়াদ-শেষ ক্ষমতা) ও term (ভার্সন নম্বর) একটি stale লিডারকে কাজ করা থেকে আটকায়।'),
          l('A timeout is not proof of death; fence writes with an increasing token, and lean on ZooKeeper/etcd/Consul, not your own timers.', 'timeout মৃত্যুর প্রমাণ নয়; বাড়তে থাকা token দিয়ে write fence করুন, আর নিজের timer নয়—ZooKeeper/etcd/Consul-এর ওপর নির্ভর করুন।'),
        ] },
      ],
    },
  ],

  // ── rate-limit · Rate limiting & backpressure ─────────────────────────────
  'rate-limit': [
    {
      h: l('What is rate limiting?', 'রেট লিমিটিং কী?'),
      blocks: [
        { p: l('Rate limiting caps how many requests a client can make in a given window of time. Its job is to protect fairness and capacity: without a limit, one buggy script, one aggressive scraper, or one traffic spike can consume all your servers’ capacity and starve every other user. A rate limiter decides, per request, whether to allow it now or reject it with a "slow down" signal.', 'রেট লিমিটিং সীমা দেয় একটি client নির্দিষ্ট সময়ের মধ্যে কতগুলো রিকোয়েস্ট করতে পারবে। এর কাজ ন্যায্যতা ও ক্ষমতা রক্ষা: সীমা ছাড়া একটি buggy script, একটি আক্রমণাত্মক scraper, বা একটি ট্রাফিক spike আপনার সব সার্ভারের ক্ষমতা খেয়ে ফেলে বাকি প্রতিটি ব্যবহারকারীকে বঞ্চিত করতে পারে। একটি rate limiter প্রতিটি রিকোয়েস্টে ঠিক করে এখন অনুমতি দেবে নাকি একটি "ধীরে করো" সংকেত দিয়ে প্রত্যাখ্যান করবে।') },
        { p: l('Backpressure is the same idea flowing backwards through a system: when a downstream consumer cannot keep up, it signals upstream producers to slow down instead of silently piling work into an unbounded queue that eventually crashes. Rate limiting guards the front door; backpressure keeps the internal pipeline from overflowing.', 'Backpressure একই ধারণা একটি সিস্টেমের ভেতর দিয়ে উল্টো বয়ে যাওয়া: একটি downstream consumer তাল মেলাতে না পারলে সে upstream producer-কে ধীর হতে সংকেত দেয়, নীরবে একটি সীমাহীন queue-তে কাজ জমিয়ে শেষে crash করার বদলে। রেট লিমিটিং সামনের দরজা পাহারা দেয়; backpressure ভেতরের pipeline উপচে পড়া থেকে ঠেকায়।') },
        { note: l('A concert venue controls entry at the gate when people arrive faster than they can be seated. It does not turn everyone away — it admits a steady stream and asks the rest to wait. A rate limiter is that gate: it smooths a flood into a flow.', 'একটি কনসার্ট ভেন্যু গেটে প্রবেশ নিয়ন্ত্রণ করে যখন মানুষ বসার চেয়ে দ্রুত আসে। এটি সবাইকে ফেরায় না—একটি স্থির স্রোত ঢোকায় ও বাকিদের অপেক্ষা করতে বলে। একটি rate limiter হলো সেই গেট: এটি একটি বন্যাকে একটি প্রবাহে রূপ দেয়।'), kind: 'tip' },
      ],
    },
    {
      h: l('How a token bucket works, step by step', 'token bucket কীভাবে কাজ করে, ধাপে ধাপে'),
      blocks: [
        { p: l('The token bucket is the most popular algorithm because it allows short bursts while enforcing a steady long-term rate. Picture a bucket that holds up to N tokens and is refilled at a fixed rate, say 10 tokens per second. Each request must take one token to proceed.', 'token bucket সবচেয়ে জনপ্রিয় algorithm কারণ এটি দীর্ঘমেয়াদে একটি স্থির হার বজায় রেখেও ছোট burst অনুমোদন করে। একটি bucket কল্পনা করুন যা সর্বোচ্চ N token ধরে ও একটি স্থির হারে ভরে, ধরুন প্রতি সেকেন্ডে ১০ token। প্রতিটি রিকোয়েস্টকে এগোতে একটি token নিতে হয়।') },
        { steps: [
          l('The bucket starts full with its capacity of tokens (this capacity is the maximum burst size).', 'bucket তার ধারণক্ষমতার token নিয়ে পূর্ণ শুরু হয় (এই ধারণক্ষমতাই সর্বোচ্চ burst আকার)।'),
          l('Tokens are added back at a steady refill rate, up to the capacity — never more.', 'token একটি স্থির refill হারে ফিরে যোগ হয়, ধারণক্ষমতা পর্যন্ত—তার বেশি কখনো নয়।'),
          l('When a request arrives, check the bucket. If at least one token is available, remove one and allow the request.', 'একটি রিকোয়েস্ট এলে bucket যাচাই করুন। অন্তত একটি token থাকলে একটি সরান ও রিকোয়েস্ট অনুমোদন করুন।'),
          l('If the bucket is empty, reject the request (or queue it) — the client has spent its allowance faster than it refills.', 'bucket খালি হলে রিকোয়েস্ট প্রত্যাখ্যান করুন (বা queue করুন)—client refill-এর চেয়ে দ্রুত তার বরাদ্দ খরচ করেছে।'),
          l('A client that pauses lets tokens build back up to the cap, so occasional bursts are fine but sustained overuse is throttled.', 'যে client থামে তার token আবার সীমা পর্যন্ত জমে, তাই মাঝেমধ্যে burst ঠিক কিন্তু টানা অতিব্যবহার throttle হয়।'),
        ] },
        { code: `# token bucket: 'capacity' tokens, refilled at 'refill_per_second'
bucket = { tokens: capacity, last: now() }

def allow(bucket, cost = 1):
  now = current_time()
  elapsed = now - bucket.last
  # refill for the time that passed, but never above capacity
  bucket.tokens = min(capacity, bucket.tokens + elapsed * refill_per_second)
  bucket.last = now
  if bucket.tokens >= cost:
    bucket.tokens = bucket.tokens - cost
    return ALLOW
  return REJECT     # respond 429 Too Many Requests with a Retry-After header`, caption: l('Refill lazily on each request by measuring elapsed time — no background timer needed.', 'প্রতিটি রিকোয়েস্টে elapsed সময় মেপে অলসভাবে refill করুন—কোনো background timer লাগে না।') },
      ],
    },
    {
      h: l('The four common algorithms', 'চারটি সাধারণ algorithm'),
      blocks: [
        { table: {
          head: [l('Algorithm', 'algorithm'), l('How it works', 'কীভাবে কাজ করে'), l('Bursts', 'burst'), l('Trade-off', 'ট্রেড-অফ')],
          rows: [
            [l('Fixed window', 'Fixed window'), l('Count requests per fixed clock window (e.g. per minute); reset at the boundary.', 'প্রতি স্থির clock window-এ রিকোয়েস্ট গোনা (যেমন প্রতি মিনিটে); সীমানায় reset।'), l('Allows 2x at the edge', 'সীমানায় 2x দেয়'), l('Simplest, but a burst straddling the reset can double the limit.', 'সবচেয়ে সরল, তবে reset ঘেঁষা burst সীমা দ্বিগুণ করতে পারে।')],
            [l('Sliding window', 'Sliding window'), l('Count over a rolling window (log of timestamps, or a weighted counter).', 'একটি চলমান window-তে গোনা (timestamp-এর log, বা weighted counter)।'), l('Smooth, no edge spike', 'মসৃণ, সীমানায় spike নেই'), l('More accurate but more memory/compute per client.', 'বেশি নির্ভুল তবে প্রতি client-এ বেশি memory/compute।')],
            [l('Token bucket', 'Token bucket'), l('Tokens refill at a steady rate; each request spends one; bucket caps the burst.', 'token স্থির হারে ভরে; প্রতিটি রিকোয়েস্ট একটি খরচ করে; bucket burst সীমিত করে।'), l('Allows controlled bursts', 'নিয়ন্ত্রিত burst দেয়'), l('Great default; needs shared state to be global.', 'দারুণ default; global হতে shared state দরকার।')],
            [l('Leaky bucket', 'Leaky bucket'), l('Requests enter a queue and drain (leak) at a fixed rate; overflow is dropped.', 'রিকোয়েস্ট একটি queue-তে ঢোকে ও স্থির হারে বেরোয় (leak); উপচে পড়া drop হয়।'), l('No bursts — perfectly smooth output', 'burst নেই—পুরো মসৃণ output'), l('Steady outflow, but adds queueing latency.', 'স্থির বহিঃপ্রবাহ, তবে queue latency যোগ করে।')],
          ],
        } },
        { p: l('Token bucket and leaky bucket look similar but differ in intent: token bucket limits the average rate while permitting bursts; leaky bucket forces a perfectly constant output rate. Fixed and sliding windows are counters over time rather than continuous flows.', 'token bucket ও leaky bucket দেখতে একরকম কিন্তু উদ্দেশ্যে ভিন্ন: token bucket গড় হার সীমিত করে burst অনুমোদন করে; leaky bucket একটি পুরো ধ্রুব output হার বাধ্য করে। fixed ও sliding window সময়ের ওপর counter, ধারাবাহিক প্রবাহ নয়।') },
      ],
    },
    {
      h: l('Where to enforce it, and the right response', 'কোথায় প্রয়োগ করবেন ও সঠিক উত্তর'),
      blocks: [
        { p: l('Enforce limits by a meaningful identity — an API key, a user id, or an IP — not just globally, so one heavy user cannot exhaust everyone’s quota. When you reject, return HTTP 429 (Too Many Requests) with a Retry-After header telling the client exactly how long to wait; this is what the mistake column means by a "retryable" response. A well-behaved client backs off and retries; a generic 500 tells it nothing and often triggers an immediate, harmful retry storm.', 'অর্থপূর্ণ পরিচয় দিয়ে সীমা প্রয়োগ করুন—একটি API key, user id, বা IP—শুধু globally নয়, যাতে একজন ভারী ব্যবহারকারী সবার quota শেষ না করে। প্রত্যাখ্যানে HTTP 429 (Too Many Requests) ও একটি Retry-After হেডার দিন যা client-কে ঠিক কতক্ষণ অপেক্ষা করতে হবে বলে; mistake কলাম এই "retryable" উত্তরই বোঝায়। ভদ্র client পিছিয়ে গিয়ে আবার চেষ্টা করে; একটি সাধারণ 500 তাকে কিছুই বলে না ও প্রায়ই একটি তাৎক্ষণিক, ক্ষতিকর retry ঝড় ডেকে আনে।') },
        { list: [
          l('Local (per-instance) limits are cheap and fast but let the true global rate drift up with the number of servers.', 'Local (প্রতি-instance) সীমা সস্তা ও দ্রুত কিন্তু সার্ভার সংখ্যার সঙ্গে প্রকৃত global হার বাড়তে দেয়।'),
          l('Global limits (counters in a shared store like Redis) are accurate but require coordination on every request — a latency and availability cost.', 'Global সীমা (Redis-এর মতো shared store-এ counter) নির্ভুল কিন্তু প্রতিটি রিকোয়েস্টে সমন্বয় দরকার—একটি latency ও availability খরচ।'),
          l('Add jitter to Retry-After so throttled clients do not all retry at the exact same instant (a thundering herd).', 'Retry-After-এ jitter যোগ করুন যাতে throttle হওয়া client-রা সবাই একদম একই মুহূর্তে retry না করে (thundering herd)।'),
        ] },
      ],
    },
    {
      h: l('When and where to use it', 'কখন ও কোথায় ব্যবহার করবেন'),
      blocks: [
        { p: l('Rate-limit any public or shared API, login and signup endpoints (to blunt brute-force and abuse), expensive operations, and any third-party integration you must stay under quota with. Use backpressure inside pipelines: bounded queues, blocking when full, and consumer-driven pull so a fast producer cannot bury a slow consumer. The choice between strict global accuracy and cheap local approximation is the central trade-off — pick based on how costly a little overshoot really is.', 'যেকোনো public বা shared API, login ও signup endpoint (brute-force ও অপব্যবহার ঠেকাতে), ব্যয়বহুল অপারেশন, এবং যে third-party integration-এর quota-র নিচে থাকতে হবে—সব rate-limit করুন। pipeline-এর ভেতরে backpressure ব্যবহার করুন: সীমিত queue, পূর্ণ হলে block, ও consumer-চালিত pull যাতে দ্রুত producer একটি ধীর consumer-কে চাপা না দেয়। কঠোর global নির্ভুলতা ও সস্তা local আনুমানিকতার মধ্যে বাছাই মূল ট্রেড-অফ—সামান্য overshoot আসলে কতটা ব্যয়বহুল তার ভিত্তিতে বাছুন।') },
      ],
    },
    {
      h: l('Common mistakes', 'সাধারণ ভুল'),
      blocks: [
        { list: [
          l('Returning a generic 500/503 instead of a 429 with Retry-After — clients cannot tell they were throttled and retry blindly.', 'Retry-After সহ 429-এর বদলে সাধারণ 500/503 দেওয়া—client বুঝতে পারে না তারা throttle হয়েছে ও অন্ধভাবে retry করে।'),
          l('Rate-limiting by IP alone: NAT and proxies put many users behind one IP, and attackers rotate IPs.', 'শুধু IP দিয়ে rate-limit: NAT ও proxy অনেক ব্যবহারকারীকে একটি IP-র পেছনে রাখে, আর আক্রমণকারী IP বদলায়।'),
          l('Using a fixed window and forgetting the 2x burst possible right across the window boundary.', 'fixed window ব্যবহার করে window সীমানা ঘেঁষে সম্ভব 2x burst ভুলে যাওয়া।'),
          l('Per-instance counters that let the real global limit grow every time you add a server.', 'প্রতি-instance counter যা সার্ভার যোগ করলেই প্রকৃত global সীমা বাড়তে দেয়।'),
          l('No backpressure: an unbounded internal queue that hides overload until it runs out of memory.', 'কোনো backpressure নেই: একটি সীমাহীন ভেতরের queue যা memory শেষ হওয়া পর্যন্ত overload লুকায়।'),
        ] },
      ],
    },
    {
      h: l('Remember in one line', 'এক লাইনে মনে রাখুন'),
      blocks: [
        { list: [
          l('Rate limiting caps requests per identity to protect fairness and capacity; backpressure slows producers when consumers fall behind.', 'রেট লিমিটিং প্রতি পরিচয়ে রিকোয়েস্ট সীমিত করে ন্যায্যতা ও ক্ষমতা রক্ষা করে; consumer পিছিয়ে পড়লে backpressure producer-কে ধীর করে।'),
          l('Token bucket allows bursts with a steady average; leaky bucket forces smooth output; windows are time counters.', 'token bucket স্থির গড়সহ burst দেয়; leaky bucket মসৃণ output বাধ্য করে; window হলো সময়-counter।'),
          l('Always reject with 429 + Retry-After (plus jitter), not a generic error.', 'সবসময় সাধারণ error নয়—429 + Retry-After (ও jitter) দিয়ে প্রত্যাখ্যান করুন।'),
        ] },
      ],
    },
  ],

  // ── idempotency · Idempotency, retries & deduplication ────────────────────
  'idempotency': [
    {
      h: l('What is idempotency?', 'আইডেমপোটেন্সি কী?'),
      blocks: [
        { p: l('An operation is idempotent if doing it many times has the same effect as doing it once. This matters because networks are unreliable: a client sends a request, the response is lost, and the client cannot tell whether the server processed it or not. Its only safe move is to retry — and if the operation is not idempotent, that retry might charge a card twice, place two orders, or send two emails.', 'একটি অপারেশন idempotent যদি এটি বহুবার করা একবার করার মতোই একই ফল দেয়। এটি গুরুত্বপূর্ণ কারণ নেটওয়ার্ক অনির্ভরযোগ্য: একটি client একটি রিকোয়েস্ট পাঠায়, উত্তর হারায়, ও client বুঝতে পারে না সার্ভার তা প্রক্রিয়া করেছে কিনা। এর একমাত্র নিরাপদ পদক্ষেপ retry—আর অপারেশন idempotent না হলে সেই retry একটি card দুবার charge, দুটি order, বা দুটি email পাঠাতে পারে।') },
        { p: l('An idempotency key is how you make an unsafe operation safe to retry. The client generates a unique key (a UUID) for one logical action and sends it with every attempt, including retries. The server uses that key to recognize a repeat and produce exactly one logical effect, returning the original result the second time instead of doing the work again. Deduplication is the same mechanism applied to messages and events: a duplicate delivery is detected by a key and collapsed into one.', 'একটি idempotency key দিয়ে আপনি একটি অনিরাপদ অপারেশনকে retry-নিরাপদ করেন। client একটি যৌক্তিক কাজের জন্য একটি unique key (একটি UUID) তৈরি করে ও প্রতিটি চেষ্টায়, retry-সহ, তা পাঠায়। সার্ভার সেই key দিয়ে একটি পুনরাবৃত্তি চেনে ও ঠিক একটি যৌক্তিক ফল দেয়, দ্বিতীয়বার আবার কাজ না করে আগের ফল ফেরত দেয়। Deduplication হলো একই কৌশল message ও event-এ প্রয়োগ: একটি ডুপ্লিকেট ডেলিভারি একটি key দিয়ে শনাক্ত হয়ে একটিতে মিশে যায়।') },
        { note: l('Pressing an elevator button ten times still requests one elevator — the button is idempotent. Your create-order and charge endpoints should behave the same: repeat the request, get one order and one charge.', 'একটি লিফটের বোতাম দশবার চাপলেও একটি লিফটই ডাকে—বোতামটি idempotent। আপনার create-order ও charge endpoint-ও একইভাবে আচরণ করা উচিত: রিকোয়েস্ট পুনরাবৃত্তি করুন, একটি order ও একটি charge পান।'), kind: 'tip' },
      ],
    },
    {
      h: l('The idempotency-key flow, step by step', 'idempotency-key প্রবাহ, ধাপে ধাপে'),
      blocks: [
        { steps: [
          l('The client generates a unique key for one logical operation (for example a UUID) and sends it in a header like Idempotency-Key.', 'client একটি যৌক্তিক অপারেশনের জন্য একটি unique key (যেমন একটি UUID) তৈরি করে ও Idempotency-Key-এর মতো একটি হেডারে পাঠায়।'),
          l('The server looks the key up in a store. If it has never seen it, it atomically claims the key as "in progress".', 'সার্ভার key-টি একটি store-এ খোঁজে। কখনো না দেখে থাকলে atomically key-টিকে "in progress" হিসেবে দাবি করে।'),
          l('The server performs the work exactly once — charging the card, creating the order — then saves the key together with the final response.', 'সার্ভার কাজটি ঠিক একবার করে—card charge, order তৈরি—তারপর key ও চূড়ান্ত উত্তর একসঙ্গে সংরক্ষণ করে।'),
          l('It returns the result to the client.', 'এটি client-কে ফল ফেরত দেয়।'),
          l('If the client retries with the same key and the work is already done, the server skips the work and replays the stored response.', 'client একই key দিয়ে retry করলে ও কাজ ইতিমধ্যে হয়ে থাকলে, সার্ভার কাজ এড়িয়ে সংরক্ষিত উত্তর আবার দেয়।'),
          l('If a retry arrives while the first is still in progress, the server returns a 409 Conflict (or waits) so the operation never runs twice concurrently.', 'প্রথমটি চলার মধ্যেই একটি retry এলে সার্ভার একটি 409 Conflict দেয় (বা অপেক্ষা করে) যাতে অপারেশন কখনো একসঙ্গে দুবার না চলে।'),
          l('Keys expire after a defined deduplication window (say 24 hours), after which the store can forget them.', 'key একটি নির্ধারিত deduplication window (ধরুন ২৪ ঘণ্টা) পর মেয়াদ শেষ হয়, তারপর store সেগুলো ভুলতে পারে।'),
        ] },
        { code: `def handle(request):
  key = request.header("Idempotency-Key")
  existing = store.get(key)

  if existing and existing.status == "done":
    return existing.response          # replay the original result, do NOT re-run

  if existing and existing.status == "in_progress":
    return http(409, "a retry is already in flight")

  store.put_if_absent(key, status = "in_progress")   # atomic claim
  result = do_work(request)           # charge the card ONCE
  store.put(key, status = "done", response = result, ttl = "24h")
  return result`, caption: l('The key is claimed atomically before the work runs, so two concurrent retries cannot both execute.', 'কাজ চলার আগে key atomically দাবি করা হয়, তাই দুটি একসঙ্গে আসা retry দুটোই চলতে পারে না।') },
      ],
    },
    {
      h: l('Which HTTP methods are already idempotent?', 'কোন HTTP method আগে থেকেই idempotent?'),
      blocks: [
        { p: l('HTTP defines idempotency for its methods. Knowing which are naturally safe to retry tells you exactly where you must add an idempotency key yourself — chiefly POST.', 'HTTP তার method-গুলোর জন্য idempotency সংজ্ঞায়িত করে। কোনগুলো স্বভাবতই retry-নিরাপদ জানলে বুঝবেন ঠিক কোথায় নিজে একটি idempotency key যোগ করতে হবে—মূলত POST-এ।') },
        { table: {
          head: [l('Method', 'method'), l('Idempotent?', 'idempotent?'), l('Why', 'কেন')],
          rows: [
            [l('GET', 'GET'), l('Yes (and safe)', 'হ্যাঁ (ও নিরাপদ)'), l('Reads nothing changes, so any number of calls return the same state.', 'পড়ে, কিছু বদলায় না, তাই যতবার call একই state দেয়।')],
            [l('PUT', 'PUT'), l('Yes', 'হ্যাঁ'), l('Replaces a resource with a full value; repeating sets the same value.', 'একটি resource-কে পূর্ণ মান দিয়ে প্রতিস্থাপন করে; পুনরাবৃত্তি একই মান বসায়।')],
            [l('DELETE', 'DELETE'), l('Yes', 'হ্যাঁ'), l('Deleting an already-deleted resource leaves the same end state.', 'ইতিমধ্যে মোছা resource মুছলে একই শেষ state থাকে।')],
            [l('POST', 'POST'), l('No', 'না'), l('Creates a new resource each time — this is exactly what needs an idempotency key.', 'প্রতিবার একটি নতুন resource তৈরি করে—এখানেই idempotency key দরকার।')],
          ],
        } },
      ],
    },
    {
      h: l('Delivery semantics: why exactly-once is a myth', 'delivery semantics: exactly-once কেন একটি মিথ'),
      blocks: [
        { p: l('Idempotency exists because true "exactly-once delivery" over a network is essentially impossible. A sender can never be sure a message arrived, so it must either give up after one try (risking loss) or retry (risking duplicates). Real systems therefore pick at-least-once and remove the duplicates on the receiving side — and idempotency keys are exactly how you do that. The phrase "exactly-once" you see in some tools really means at-least-once delivery plus deduplication, which is what an idempotency key gives you.', 'Idempotency আছে কারণ একটি নেটওয়ার্কে প্রকৃত "exactly-once delivery" মূলত অসম্ভব। প্রেরক কখনো নিশ্চিত হতে পারে না message পৌঁছেছে, তাই তাকে হয় একবার চেষ্টা করে থেমে যেতে হয় (হারানোর ঝুঁকি) নয়তো retry করতে হয় (ডুপ্লিকেটের ঝুঁকি)। তাই বাস্তব সিস্টেম at-least-once বাছে ও গ্রহণকারী দিকে ডুপ্লিকেট সরায়—আর idempotency key ঠিক এভাবেই তা করে। কিছু টুলে দেখা "exactly-once" আসলে at-least-once delivery ও deduplication বোঝায়, যা একটি idempotency key আপনাকে দেয়।') },
        { table: {
          head: [l('Semantic', 'semantic'), l('Meaning', 'অর্থ'), l('Risk', 'ঝুঁকি')],
          rows: [
            [l('At-most-once', 'At-most-once'), l('Send once, never retry.', 'একবার পাঠাও, কখনো retry নয়।'), l('Messages can be silently lost.', 'message নীরবে হারাতে পারে।')],
            [l('At-least-once', 'At-least-once'), l('Retry until acknowledged.', 'acknowledge না হওয়া পর্যন্ত retry।'), l('Duplicates arrive — needs deduplication.', 'ডুপ্লিকেট আসে—deduplication দরকার।')],
            [l('Effectively-once', 'Effectively-once'), l('At-least-once plus an idempotency/dedup key.', 'At-least-once ও একটি idempotency/dedup key।'), l('Safe, at the cost of storing keys.', 'নিরাপদ, key সংরক্ষণের খরচে।')],
          ],
        } },
      ],
    },
    {
      h: l('When and where to use it', 'কখন ও কোথায় ব্যবহার করবেন'),
      blocks: [
        { p: l('Add idempotency keys to any operation that changes state and could be retried: payments and charges, order and account creation, sending money or messages, and webhook handlers (providers deliberately deliver webhooks at-least-once, so duplicates are guaranteed). For asynchronous queues, assume at-least-once delivery and deduplicate on a message id. The trade-off is real: you must persist keys and results and set an expiry window — that costs storage and adds a lookup on every write. But for anything involving money or user-visible side effects, that cost is trivial next to a double charge.', 'যেকোনো state-বদলানো ও retry-হতে-পারা অপারেশনে idempotency key যোগ করুন: payment ও charge, order ও account তৈরি, টাকা বা message পাঠানো, এবং webhook handler (provider ইচ্ছাকৃতভাবে webhook at-least-once দেয়, তাই ডুপ্লিকেট নিশ্চিত)। asynchronous queue-এ at-least-once ডেলিভারি ধরুন ও একটি message id-তে deduplicate করুন। ট্রেড-অফ বাস্তব: key ও ফল সংরক্ষণ ও একটি expiry window ঠিক করতে হয়—এতে storage খরচ ও প্রতিটি write-এ একটি lookup যোগ হয়। কিন্তু টাকা বা ব্যবহারকারী-দৃশ্যমান পার্শ্বপ্রতিক্রিয়াযুক্ত যেকোনো কিছুর জন্য সেই খরচ একটি double charge-এর তুলনায় নগণ্য।') },
      ],
    },
    {
      h: l('Common mistakes', 'সাধারণ ভুল'),
      blocks: [
        { list: [
          l('Retrying a non-idempotent payment request without a stable key — the classic cause of double charges.', 'একটি স্থায়ী key ছাড়া একটি non-idempotent payment রিকোয়েস্ট retry করা—double charge-এর ক্লাসিক কারণ।'),
          l('Generating a new key on each retry. The key must be stable across all attempts of the same logical operation.', 'প্রতিটি retry-তে একটি নতুন key তৈরি করা। key একই যৌক্তিক অপারেশনের সব চেষ্টায় স্থায়ী থাকতে হবে।'),
          l('Not claiming the key atomically, so two concurrent retries both pass the check and both execute (a race).', 'key atomically দাবি না করা, তাই দুটি একসঙ্গে আসা retry দুটোই check পেরিয়ে দুটোই চলে (একটি race)।'),
          l('Treating a client timeout as proof of failure and re-issuing without a key — a timeout means unknown, not failed.', 'একটি client timeout-কে ব্যর্থতার প্রমাণ ধরে key ছাড়া আবার পাঠানো—timeout মানে অজানা, ব্যর্থ নয়।'),
          l('Storing keys forever with no expiry — set a deduplication window so the store does not grow without bound.', 'key চিরকাল expiry ছাড়া রাখা—একটি deduplication window দিন যাতে store সীমাহীন না বাড়ে।'),
        ] },
      ],
    },
    {
      h: l('Remember in one line', 'এক লাইনে মনে রাখুন'),
      blocks: [
        { list: [
          l('Idempotent = doing it many times has the same effect as doing it once.', 'Idempotent = বহুবার করা একবার করার মতোই একই ফল।'),
          l('A stable idempotency key lets clients safely retry; the server does the work once and replays the stored result.', 'একটি স্থায়ী idempotency key client-কে নিরাপদে retry করতে দেয়; সার্ভার কাজটি একবার করে ও সংরক্ষিত ফল আবার দেয়।'),
          l('GET/PUT/DELETE are idempotent by nature; POST is not, so give it a key — and expire keys after a window.', 'GET/PUT/DELETE স্বভাবতই idempotent; POST নয়, তাই একে একটি key দিন—আর একটি window পর key-এর মেয়াদ শেষ করুন।'),
        ] },
      ],
    },
  ],

  // ── sagas · Distributed transactions & Sagas ──────────────────────────────
  'sagas': [
    {
      h: l('What is a saga?', 'সাগা কী?'),
      blocks: [
        { p: l('A saga is a way to carry out a business transaction that spans several services, each with its own database, without holding one giant lock across all of them. On a single database you get ACID transactions: a set of changes either all commit or all roll back. Across microservices that guarantee disappears — there is no shared transaction that can atomically update the order service, the payment service, and the inventory service at once.', 'সাগা হলো একাধিক সার্ভিসজুড়ে (প্রতিটির নিজস্ব database) একটি business transaction চালানোর উপায়, সবগুলোর ওপর একটি বিশাল lock না ধরে। একটি single database-এ ACID transaction পান: একগুচ্ছ পরিবর্তন হয় সব commit নয়তো সব roll back হয়। microservices-জুড়ে সেই গ্যারান্টি হারিয়ে যায়—এমন কোনো shared transaction নেই যা একসঙ্গে atomically order service, payment service ও inventory service আপডেট করতে পারে।') },
        { p: l('The old answer, a two-phase commit (2PC), tries to hold a distributed lock across all services until everyone agrees — but it is slow, and if the coordinator dies mid-way it can leave resources locked and the system stuck. A saga takes the opposite approach: break the work into a sequence of local transactions, one per service, each committing independently. If a later step fails, you do not roll back a lock — you run compensating transactions that semantically undo the earlier steps.', 'পুরোনো উত্তর, two-phase commit (2PC), সবাই সম্মত না হওয়া পর্যন্ত সব সার্ভিসজুড়ে একটি distributed lock ধরার চেষ্টা করে—কিন্তু এটি ধীর, আর মাঝপথে coordinator মরলে resource lock ও সিস্টেম আটকে যেতে পারে। সাগা উল্টো পথ নেয়: কাজটিকে একগুচ্ছ local transaction-এ ভাগ করে, প্রতি সার্ভিসে একটি, প্রতিটি স্বাধীনভাবে commit করে। পরের একটি ধাপ fail করলে আপনি একটি lock roll back করেন না—আপনি compensating transaction চালান যা আগের ধাপগুলো semantically বাতিল করে।') },
        { note: l('Booking a trip confirms the flight, then the hotel, then the car separately. If the car fails, you do not freeze the whole travel agency — you cancel the hotel and cancel the flight. Those cancellations are compensating actions.', 'একটি ভ্রমণ বুকিং আলাদাভাবে ফ্লাইট, তারপর হোটেল, তারপর গাড়ি নিশ্চিত করে। গাড়ি fail করলে আপনি পুরো ট্রাভেল এজেন্সি জমিয়ে রাখেন না—হোটেল বাতিল ও ফ্লাইট বাতিল করেন। সেই বাতিলগুলোই compensating action।'), kind: 'tip' },
      ],
    },
    {
      h: l('How a saga works: compensating actions', 'সাগা কীভাবে কাজ করে: compensating action'),
      blocks: [
        { steps: [
          l('Break the business transaction into an ordered list of steps, each a local transaction in one service (reserve inventory, charge payment, create shipment).', 'business transaction-কে একটি ক্রমিক ধাপের তালিকায় ভাগ করুন, প্রতিটি এক সার্ভিসে একটি local transaction (inventory reserve, payment charge, shipment তৈরি)।'),
          l('For every step, define its compensating action — the operation that semantically undoes it (release inventory, refund payment, cancel shipment).', 'প্রতিটি ধাপের জন্য তার compensating action সংজ্ঞায়িত করুন—যে অপারেশন একে semantically বাতিল করে (inventory release, payment refund, shipment বাতিল)।'),
          l('Run the steps in order; each one commits its own local transaction as it succeeds.', 'ধাপগুলো ক্রমে চালান; প্রতিটি সফল হলে তার নিজের local transaction commit করে।'),
          l('If a step fails, stop moving forward and run the compensating actions for all already-completed steps, in reverse order.', 'একটি ধাপ fail করলে সামনে এগোনো থামান ও ইতিমধ্যে সম্পন্ন সব ধাপের compensating action উল্টো ক্রমে চালান।'),
          l('Make every step and every compensation idempotent, because retries after crashes will re-deliver them.', 'প্রতিটি ধাপ ও প্রতিটি compensation-কে idempotent করুন, কারণ crash-এর পর retry এগুলো আবার পাঠাবে।'),
          l('Persist the saga’s state after each step so that after a crash it can resume or compensate from exactly where it stopped.', 'প্রতিটি ধাপের পর সাগার state সংরক্ষণ করুন যাতে crash-এর পর এটি ঠিক যেখানে থেমেছিল সেখান থেকে resume বা compensate করতে পারে।'),
        ] },
        { note: l('A compensating action is a semantic undo, not a literal rollback. You cannot un-send an email — you send a correction; you cannot un-charge — you issue a refund. Not every action has a clean inverse, and designing those compensations is the real work of a saga.', 'একটি compensating action একটি semantic undo, আক্ষরিক rollback নয়। একটি পাঠানো email ফেরানো যায় না—আপনি একটি সংশোধন পাঠান; charge ফেরানো যায় না—আপনি একটি refund দেন। প্রতিটি কাজের একটি পরিষ্কার বিপরীত নেই, আর সেই compensation ডিজাইন করাই সাগার আসল কাজ।'), kind: 'warn' },
      ],
    },
    {
      h: l('Choreography vs orchestration', 'Choreography বনাম orchestration'),
      blocks: [
        { p: l('There are two ways to drive a saga forward: let the services coordinate themselves by reacting to each other’s events (choreography), or put one component in charge that tells each service what to do next (orchestration).', 'একটি সাগা এগিয়ে নেওয়ার দুটি উপায়: সার্ভিসগুলো একে অন্যের event-এ সাড়া দিয়ে নিজেরাই সমন্বয় করুক (choreography), অথবা একটি component-কে দায়িত্বে বসান যে প্রতিটি সার্ভিসকে পরের কাজ বলে দেয় (orchestration)।') },
        { table: {
          head: [l('Aspect', 'দিক'), l('Choreography', 'Choreography'), l('Orchestration', 'Orchestration')],
          rows: [
            [l('Control', 'নিয়ন্ত্রণ'), l('Decentralized — each service reacts to events and emits its own.', 'বিকেন্দ্রীভূত—প্রতিটি সার্ভিস event-এ সাড়া দেয় ও নিজের event ছাড়ে।'), l('Centralized — an orchestrator issues commands and tracks progress.', 'কেন্দ্রীভূত—একটি orchestrator command দেয় ও অগ্রগতি ট্র্যাক করে।')],
            [l('Coupling', 'coupling'), l('Loose; services only know events, not each other.', 'শিথিল; সার্ভিস শুধু event জানে, একে অন্যকে নয়।'), l('The orchestrator knows every step; services stay simple.', 'orchestrator প্রতিটি ধাপ জানে; সার্ভিস সরল থাকে।')],
            [l('Visibility', 'দৃশ্যমানতা'), l('Hard — the flow is spread across many event handlers.', 'কঠিন—প্রবাহ অনেক event handler-এ ছড়ানো।'), l('Easy — the whole flow lives in one place.', 'সহজ—পুরো প্রবাহ এক জায়গায়।')],
            [l('Best for', 'কার জন্য'), l('Few steps, loosely related services.', 'কম ধাপ, শিথিলভাবে সম্পর্কিত সার্ভিস।'), l('Many steps or complex conditional logic.', 'অনেক ধাপ বা জটিল conditional logic।')],
          ],
        } },
      ],
    },
    {
      h: l('An orchestrated saga in code', 'কোডে একটি orchestrated সাগা'),
      blocks: [
        { p: l('An orchestrator makes the logic easy to follow: run each step, remember which succeeded, and on any failure compensate the completed steps in reverse.', 'একটি orchestrator যুক্তি অনুসরণ সহজ করে: প্রতিটি ধাপ চালান, কোনগুলো সফল হলো মনে রাখুন, ও যেকোনো ব্যর্থতায় সম্পন্ন ধাপগুলো উল্টো ক্রমে compensate করুন।') },
        { code: `steps         = [reserve_inventory, charge_payment, create_shipment]
compensations = [release_inventory, refund_payment, cancel_shipment]

def run_saga(order):
  done = []
  for i in range(len(steps)):
    try:
      steps[i].run(order)          # each is a local, idempotent transaction
      done.append(i)
      save_state(order, completed = done)
    except StepFailed:
      # roll forward failed: undo completed steps in reverse order
      for j in reversed(done):
        compensations[j].run(order)   # refund, release, cancel ...
      return "FAILED (compensated)"
  return "SUCCESS"`, caption: l('State is saved after each step, so a crash mid-saga can resume or compensate on restart.', 'প্রতিটি ধাপের পর state সংরক্ষিত হয়, তাই সাগার মাঝপথে crash হলে restart-এ resume বা compensate করা যায়।') },
      ],
    },
    {
      h: l('When and where to use it', 'কখন ও কোথায় ব্যবহার করবেন'),
      blocks: [
        { p: l('Use a saga when one business operation must update several services that each own their own data and you cannot (or should not) use a distributed lock: checkout across order/payment/inventory, travel or multi-vendor bookings, or any long-running workflow. The payoff is autonomy — each service commits independently and stays available. The price is that the system is only eventually consistent: for a moment, payment may be charged while inventory is not yet reserved, and users or other services can observe that in-between state. If your operation lives inside a single database, do not reach for a saga — a plain ACID transaction is simpler and stronger.', 'একটি saga ব্যবহার করুন যখন একটি business অপারেশনকে এমন কয়েকটি সার্ভিস আপডেট করতে হবে যাদের প্রত্যেকের নিজস্ব ডেটা এবং আপনি একটি distributed lock ব্যবহার করতে পারেন না (বা উচিত নয়): order/payment/inventory-জুড়ে checkout, ভ্রমণ বা multi-vendor booking, বা যেকোনো দীর্ঘ workflow। লাভ হলো স্বায়ত্তশাসন—প্রতিটি সার্ভিস স্বাধীনভাবে commit করে ও available থাকে। মূল্য হলো সিস্টেম শুধু eventually consistent: এক মুহূর্তের জন্য payment charge হতে পারে যখন inventory এখনো reserve হয়নি, ও ব্যবহারকারী বা অন্য সার্ভিস সেই মাঝামাঝি state দেখতে পারে। আপনার অপারেশন একটি single database-এর ভেতরে থাকলে saga নেবেন না—একটি সাধারণ ACID transaction সহজ ও শক্তিশালী।') },
      ],
    },
    {
      h: l('Common mistakes', 'সাধারণ ভুল'),
      blocks: [
        { list: [
          l('Assuming every real-world action has a perfect inverse. Some cannot be undone — design for correction (refunds, apologetic emails), or reorder steps so the irreversible one runs last.', 'প্রতিটি বাস্তব কাজের একটি নিখুঁত বিপরীত আছে ধরা। কিছু বাতিল করা যায় না—সংশোধনের জন্য ডিজাইন করুন (refund, দুঃখপ্রকাশী email), বা ধাপ সাজান যাতে অপরিবর্তনীয়টি সবশেষে চলে।'),
          l('Making steps or compensations non-idempotent, so a retry double-charges or double-refunds.', 'ধাপ বা compensation-কে non-idempotent করা, তাই একটি retry double-charge বা double-refund করে।'),
          l('Not persisting saga state — after a crash you cannot tell which steps ran or which need compensating.', 'সাগার state সংরক্ষণ না করা—crash-এর পর বলতে পারবেন না কোন ধাপ চলেছে বা কোনটি compensate দরকার।'),
          l('Ignoring the temporary inconsistency window and exposing half-finished state to users as if it were final.', 'সাময়িক inconsistency window উপেক্ষা করে অর্ধ-সম্পন্ন state ব্যবহারকারীকে চূড়ান্ত মনে করিয়ে দেখানো।'),
          l('Reaching for a saga when a single-database ACID transaction would do the job far more simply.', 'একটি single-database ACID transaction যেখানে অনেক সহজে কাজ করত সেখানে saga নেওয়া।'),
        ] },
      ],
    },
    {
      h: l('Remember in one line', 'এক লাইনে মনে রাখুন'),
      blocks: [
        { list: [
          l('A saga replaces one distributed lock with a sequence of local transactions plus compensating actions to undo them.', 'সাগা একটি distributed lock-কে একগুচ্ছ local transaction ও তা বাতিল করার compensating action দিয়ে প্রতিস্থাপন করে।'),
          l('Choreography = services react to events; orchestration = one coordinator drives the steps.', 'Choreography = সার্ভিস event-এ সাড়া দেয়; orchestration = একটি coordinator ধাপ চালায়।'),
          l('You gain autonomy and availability but accept eventual consistency; make every step idempotent and persist state.', 'স্বায়ত্তশাসন ও availability পান কিন্তু eventual consistency মানেন; প্রতিটি ধাপ idempotent করুন ও state সংরক্ষণ করুন।'),
        ] },
      ],
    },
  ],
}
