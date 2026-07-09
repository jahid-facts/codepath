// Deep, bilingual (English / Bangla) teaching guides for System Design ·
// Data & Distributed-systems topics. Shape mirrors app/course-guides.js and
// app/guides/kubernetes/a.js: each guide is an array of sections { h, blocks },
// rendered by GuideBlock in app/LearningApp.js. Facts (insight, analogy, action,
// trade-off, mistake) are drawn from the rawTopics rows in app/data.js. In
// { code } blocks the content is plain SQL / pseudocode — never shell or
// template interpolation.

const l = (en, bn) => ({ en, bn })

export default {
  // ── model-index · Data modeling & indexing ────────────────────────────────
  'model-index': [
    {
      h: l('What is data modeling and indexing?', 'ডেটা মডেলিং ও ইনডেক্সিং কী?'),
      blocks: [
        { p: l('Data modeling is the act of deciding how your entities, their relationships, and their access paths are laid out in a database so that the queries you actually run are both correct and fast. Indexing is the companion technique: you build small auxiliary data structures (usually B-trees) alongside a table so the database can jump straight to the rows a query wants instead of reading every row. The two go together — you model around the questions you will ask, and you index the columns those questions filter and sort on.', 'ডেটা মডেলিং হলো আপনার entity, তাদের সম্পর্ক ও access path কীভাবে একটি ডেটাবেসে সাজানো হবে তা ঠিক করা, যাতে আপনি বাস্তবে যে query চালান তা সঠিক ও দ্রুত—দুটোই হয়। ইনডেক্সিং এর সঙ্গী কৌশল: টেবিলের পাশে ছোট সহায়ক ডেটা স্ট্রাকচার (সাধারণত B-tree) বানান, যাতে ডেটাবেস প্রতিটি row না পড়ে সরাসরি দরকারি row-তে লাফ দিতে পারে। দুটো একসঙ্গে চলে—যে প্রশ্ন করবেন তা ঘিরে মডেল করেন, আর সেই প্রশ্ন যে column-এ filter ও sort করে সেগুলোতে index দেন।') },
        { p: l('The problem they solve is scan cost. Without an index, finding "all orders for user 42" forces a full table scan: the database reads every one of, say, ten million rows to find six. That is fine on your laptop with a hundred rows and catastrophic in production. A good index turns that linear scan into a handful of pointer hops, and a good model makes sure the column you need to filter on even exists in a usable shape.', 'এরা যে সমস্যা সমাধান করে তা হলো scan খরচ। index ছাড়া "user 42-এর সব order" খুঁজতে একটি full table scan লাগে: ডেটাবেস ধরুন এক কোটি row-এর প্রতিটি পড়ে ছয়টি খুঁজে বের করে। ল্যাপটপে একশো row-তে এটা ঠিক, প্রোডাকশনে বিপর্যয়। ভালো index সেই রৈখিক scan-কে কয়েকটি pointer লাফে পরিণত করে, আর ভালো মডেল নিশ্চিত করে যে আপনার filter করার column আদৌ ব্যবহারযোগ্য আকারে আছে।') },
        { note: l('Think of a library catalog. To find a book you do not walk every shelf — you look up the title in the catalog, which points you to an exact shelf. That is an index. But there is a cost: every time a new book arrives, someone must update the catalog too. Indexes speed reads and slow writes for exactly this reason.', 'একটি লাইব্রেরি ক্যাটালগ ভাবুন। একটি বই খুঁজতে আপনি প্রতিটি তাক হাঁটেন না—ক্যাটালগে শিরোনাম খোঁজেন, যা আপনাকে ঠিক তাকে নিয়ে যায়। এটাই index। কিন্তু একটি খরচ আছে: প্রতিবার নতুন বই এলে কাউকে ক্যাটালগও হালনাগাদ করতে হয়। ঠিক এ কারণেই index পড়া দ্রুত ও লেখা ধীর করে।'), kind: 'tip' },
      ],
    },
    {
      h: l('How an index works, step by step', 'একটি index কীভাবে কাজ করে, ধাপে ধাপে'),
      blocks: [
        { p: l('Most database indexes are B-trees: a sorted, balanced tree that keeps keys in order and stays shallow even with billions of rows. Because it is sorted, the database can binary-search it, so a lookup costs about log(n) steps instead of n.', 'বেশিরভাগ ডেটাবেস index হলো B-tree: একটি সাজানো, ভারসাম্যযুক্ত tree যা key-গুলো ক্রমে রাখে ও কোটি কোটি row থাকলেও অগভীর থাকে। সাজানো বলে ডেটাবেস এতে binary-search করতে পারে, তাই একটি lookup-এ n নয়, প্রায় log(n) ধাপ লাগে।') },
        { steps: [
          l('The query planner parses your SQL and looks at which columns appear in WHERE, JOIN, and ORDER BY.', 'query planner আপনার SQL পার্স করে ও দেখে WHERE, JOIN ও ORDER BY-তে কোন column আছে।'),
          l('It checks the table’s available indexes. If one covers the filtered column, it picks an index scan; if not, it falls back to a full sequential scan.', 'এটি টেবিলের বিদ্যমান index দেখে। filter করা column-এ একটি থাকলে index scan নেয়; না থাকলে full sequential scan-এ ফিরে যায়।'),
          l('For an index scan it binary-searches the B-tree down to the matching key — a few pointer hops, not a full read.', 'index scan-এ এটি মিল-থাকা key পর্যন্ত B-tree binary-search করে—পুরো পড়া নয়, কয়েকটি pointer লাফ।'),
          l('The index leaf holds a pointer to the actual row; the engine follows it to fetch the row from the table (a "heap" lookup).', 'index leaf আসল row-এর একটি pointer রাখে; engine তা অনুসরণ করে টেবিল থেকে row আনে (একটি "heap" lookup)।'),
          l('If the index already contains every column the query needs (a covering index), the engine skips the table entirely and answers from the index alone.', 'index-এ যদি query-র দরকারি প্রতিটি column আগেই থাকে (covering index), engine টেবিল একদম এড়িয়ে শুধু index থেকেই উত্তর দেয়।'),
        ] },
        { p: l('You can see all of this yourself with EXPLAIN, which prints the plan the database chose. Watching a "Seq Scan" turn into an "Index Scan" after you add the right index is the fastest way to build intuition.', 'এই সবই আপনি EXPLAIN দিয়ে নিজে দেখতে পারেন, যা ডেটাবেস যে plan বেছেছে তা ছাপে। সঠিক index যোগ করার পর একটি "Seq Scan"-কে "Index Scan"-এ বদলাতে দেখা অন্তর্দৃষ্টি গড়ার দ্রুততম উপায়।') },
        { code: `-- Without an index the planner must read every row
EXPLAIN SELECT * FROM orders WHERE user_id = 42;
  Seq Scan on orders  (cost=0.00..18334.00 rows=6 ...)

-- Add a targeted index on the column you filter by
CREATE INDEX idx_orders_user ON orders (user_id);

EXPLAIN SELECT * FROM orders WHERE user_id = 42;
  Index Scan using idx_orders_user  (cost=0.42..8.44 rows=6 ...)

-- Composite index: column order matters (the left-prefix rule)
CREATE INDEX idx_orders_user_date ON orders (user_id, created_at);
-- Helps:          WHERE user_id = 42 ORDER BY created_at
-- Does NOT help:  a query that filters only on created_at`, caption: l('The cost estimate drops from ~18,000 to ~8 once the index lets the planner seek instead of scan. A composite index only helps queries that use its leftmost column.', 'index planner-কে scan-এর বদলে seek করতে দিলে খরচের আন্দাজ ~১৮,০০০ থেকে ~৮-এ নামে। একটি composite index শুধু সেই query-কে সাহায্য করে যা তার সবচেয়ে-বাঁয়ের column ব্যবহার করে।') },
      ],
    },
    {
      h: l('Index types at a glance', 'index-এর ধরন এক নজরে'),
      blocks: [
        { table: {
          head: [l('Index type', 'index-এর ধরন'), l('Best at', 'কীসে সেরা'), l('Weak at', 'কীসে দুর্বল')],
          rows: [
            [l('B-tree', 'B-tree'), l('Ranges, sorting, equality, prefixes — the default for almost everything.', 'range, sort, সমতা, prefix—প্রায় সবকিছুর জন্য ডিফল্ট।'), l('Nothing common; slightly larger than a hash for pure equality.', 'সাধারণ কিছুই নয়; শুধু-সমতায় hash-এর চেয়ে সামান্য বড়।')],
            [l('Hash', 'Hash'), l('Exact equality lookups (key = value), very fast.', 'হুবহু সমতা lookup (key = value), খুব দ্রুত।'), l('Cannot do ranges, sorting, or prefix matches.', 'range, sort বা prefix মিল পারে না।')],
            [l('Composite (multi-column)', 'Composite (বহু-column)'), l('Queries that filter/sort on several columns in left-to-right order.', 'বাঁ-থেকে-ডান ক্রমে কয়েক column-এ filter/sort করা query।'), l('Queries that skip the leading column get no benefit.', 'নেতৃ column বাদ দেওয়া query কোনো সুবিধা পায় না।')],
            [l('Covering', 'Covering'), l('Answering a query entirely from the index, skipping the table.', 'টেবিল এড়িয়ে পুরো query শুধু index থেকে উত্তর দেওয়া।'), l('Wider index, more storage and slower writes.', 'বড় index, বেশি storage ও ধীর লেখা।')],
            [l('Full-text / GIN', 'Full-text / GIN'), l('Searching inside text or array/JSON documents.', 'text বা array/JSON নথির ভেতরে খোঁজা।'), l('Overkill and slow for simple scalar equality.', 'সাধারণ scalar সমতায় বাড়াবাড়ি ও ধীর।')],
          ],
        } },
        { p: l('Data modeling shapes what you can index. Normalizing splits data into related tables to avoid duplication and keep updates simple; denormalizing folds data back together (or copies it) so one read answers a whole screen. Model around your invariants — the rules that must always hold — and your dominant access patterns, then index those paths.', 'ডেটা মডেলিং ঠিক করে আপনি কী index করতে পারবেন। normalize করা ডেটাকে সম্পর্কিত টেবিলে ভাগ করে নকল এড়ায় ও আপডেট সহজ রাখে; denormalize করা ডেটাকে আবার একসঙ্গে ভাঁজ করে (বা কপি করে) যাতে এক read পুরো একটি স্ক্রিনের উত্তর দেয়। মডেল করুন আপনার invariant—যে নিয়ম সবসময় সত্য থাকতে হবে—ও প্রধান access pattern ঘিরে, তারপর সেই path-এ index দিন।') },
      ],
    },
    {
      h: l('When and where to use indexes', 'কখন ও কোথায় index ব্যবহার করবেন'),
      blocks: [
        { p: l('Add an index when a column is frequently used to filter, join, or sort large tables, and when the column is selective — that is, each value matches only a small fraction of rows. An index on user_id (millions of distinct values) is excellent; an index on a boolean is_active column (two values) rarely helps, because the planner still reads half the table.', 'index যোগ করুন যখন একটি column বড় টেবিলে বারবার filter, join বা sort করতে ব্যবহৃত হয়, এবং column-টি selective—অর্থাৎ প্রতিটি মান row-এর ছোট একটি অংশের সঙ্গেই মেলে। user_id-তে index (লক্ষ লক্ষ ভিন্ন মান) চমৎকার; একটি boolean is_active column-এ (দুটি মান) index কমই সাহায্য করে, কারণ planner তবুও অর্ধেক টেবিল পড়ে।') },
        { p: l('The trade-off is always writes and space. Every index must be updated on every INSERT, UPDATE, and DELETE, so a table with ten indexes writes far slower than one with two. Indexes also consume disk and memory. Denormalizing to speed reads makes this worse: it duplicates data, so a single logical change now means several writes that must all stay in sync. The rule of thumb: index for the reads you actually measure, and keep the smallest set that does the job.', 'ট্রেড-অফ সবসময় লেখা ও জায়গা। প্রতিটি index-কে প্রতিটি INSERT, UPDATE ও DELETE-এ হালনাগাদ করতে হয়, তাই দশটি index-যুক্ত টেবিল দুটির চেয়ে অনেক ধীরে লেখে। index disk ও memory-ও খায়। পড়া দ্রুত করতে denormalize করলে এটি আরও খারাপ হয়: এটি ডেটা নকল করে, তাই একটি যৌক্তিক পরিবর্তন এখন কয়েকটি লেখা মানে যাদের সবাইকে সিঙ্কে থাকতে হয়। মূলমন্ত্র: যে পড়া আপনি সত্যিই মাপেন তার জন্য index দিন, ও কাজ করে এমন সবচেয়ে ছোট সেট রাখুন।') },
      ],
    },
    {
      h: l('Common mistakes', 'সাধারণ ভুল'),
      blocks: [
        { list: [
          l('Adding an index to every column "just in case" without checking real queries — you pay the write cost for indexes the planner never uses.', 'বাস্তব query না দেখে "হয়তো লাগবে" বলে প্রতিটি column-এ index যোগ করা—planner যে index কখনো ব্যবহার করে না তার লেখা-খরচ আপনি দেন।'),
          l('Getting composite-index column order wrong. (user_id, created_at) does not help a query that filters only on created_at — the leftmost column must be used.', 'composite-index-এর column ক্রম ভুল করা। (user_id, created_at) সেই query-কে সাহায্য করে না যা শুধু created_at-এ filter করে—সবচেয়ে-বাঁয়ের column ব্যবহার হতেই হবে।'),
          l('Indexing a low-cardinality column (a boolean, a status with three values) and expecting a speed-up; the planner still scans a large fraction of rows.', 'কম-cardinality column (একটি boolean, তিন-মানের status) index করে গতি বাড়ার আশা করা; planner তবুও row-এর বড় অংশ scan করে।'),
          l('Never running EXPLAIN. You are guessing about performance instead of reading the plan the database actually chose.', 'কখনো EXPLAIN না চালানো। ডেটাবেস আসলে যে plan বেছেছে তা না পড়ে পারফরম্যান্স নিয়ে অনুমান করছেন।'),
          l('Denormalizing early for reads and then discovering every update must touch several copies that drift out of sync.', 'পড়ার জন্য আগেভাগে denormalize করা, তারপর টের পাওয়া যে প্রতিটি আপডেটকে কয়েকটি কপি ছুঁতে হয় যেগুলো সিঙ্ক হারায়।'),
        ] },
      ],
    },
    {
      h: l('Remember in one line', 'এক লাইনে মনে রাখুন'),
      blocks: [
        { list: [
          l('Model around invariants and access patterns; an index trades write cost and disk space for much faster reads.', 'invariant ও access pattern ঘিরে মডেল করুন; index অনেক দ্রুত পড়ার জন্য লেখা-খরচ ও disk জায়গা বিনিময় করে।'),
          l('B-trees turn a full scan into a log(n) seek — but only when the query uses the indexed (leftmost) column.', 'B-tree একটি full scan-কে log(n) seek-এ পরিণত করে—তবে শুধু যখন query index করা (সবচেয়ে-বাঁয়ের) column ব্যবহার করে।'),
          l('Index the reads you measure, keep the set small, and run EXPLAIN before you trust anything.', 'যে পড়া মাপেন তা index করুন, সেট ছোট রাখুন, ও কিছু বিশ্বাস করার আগে EXPLAIN চালান।'),
        ] },
      ],
    },
  ],

  // ── replication-sharding · Replication, partitioning & sharding ────────────
  'replication-sharding': [
    {
      h: l('What are replication and sharding?', 'রেপ্লিকেশন ও শার্ডিং কী?'),
      blocks: [
        { p: l('Replication and sharding are the two fundamental ways a single database grows beyond one machine, and they solve opposite problems. Replication keeps complete copies of the same data on several nodes: every replica holds everything. Sharding (also called horizontal partitioning) splits one dataset into disjoint pieces spread across nodes: each shard holds only a fraction. You often use both at once — shard the data to fit, then replicate each shard so it survives a failure.', 'রেপ্লিকেশন ও শার্ডিং হলো একটি ডেটাবেস এক মেশিনের বাইরে বাড়ার দুটি মৌলিক উপায়, ও এরা বিপরীত সমস্যা সমাধান করে। রেপ্লিকেশন একই ডেটার সম্পূর্ণ কপি কয়েকটি node-এ রাখে: প্রতিটি replica সবকিছু ধরে। শার্ডিং (horizontal partitioning-ও বলে) একটি dataset-কে পরস্পর-বিচ্ছিন্ন টুকরোয় ভাগ করে node-জুড়ে ছড়ায়: প্রতিটি shard শুধু একটি ভগ্নাংশ ধরে। প্রায়ই দুটোই একসঙ্গে ব্যবহার করেন—ডেটা shard করে আঁটান, তারপর প্রতিটি shard replicate করেন যাতে তা একটি ব্যর্থতা থেকে টেকে।') },
        { p: l('The problem is that a single database server eventually hits a wall — on reads, on writes, or on storage. Replication attacks the read and availability wall: more copies means more nodes to serve reads and a standby to take over if one dies. Sharding attacks the write and storage wall: splitting the data means each node handles only its slice, so total write throughput and capacity grow with the number of shards.', 'সমস্যা হলো একটি ডেটাবেস সার্ভার একসময় দেয়ালে ঠেকে—পড়ায়, লেখায় বা storage-এ। রেপ্লিকেশন পড়া ও availability-র দেয়ালে আঘাত করে: বেশি কপি মানে পড়া পরিবেশনে বেশি node ও একটি মরলে দায়িত্ব নেওয়ার standby। শার্ডিং লেখা ও storage-এর দেয়ালে আঘাত করে: ডেটা ভাগ করা মানে প্রতিটি node শুধু তার অংশ সামলায়, তাই মোট write throughput ও ধারণক্ষমতা shard সংখ্যার সঙ্গে বাড়ে।') },
        { note: l('Photocopying a book is replication — every copy is identical and complete, so if one burns you still have the whole book. Splitting an encyclopedia across shelves is sharding — volume A on one shelf, volume B on another; no shelf holds it all, but together they hold far more than one shelf could.', 'একটি বই ফটোকপি করা রেপ্লিকেশন—প্রতিটি কপি অভিন্ন ও সম্পূর্ণ, তাই একটি পুড়লেও পুরো বই থাকে। একটি বিশ্বকোষ বিভিন্ন তাকে ভাগ করা শার্ডিং—খণ্ড A এক তাকে, খণ্ড B আরেকটিতে; কোনো তাক পুরোটা ধরে না, তবে একসঙ্গে এক তাকের চেয়ে অনেক বেশি ধরে।'), kind: 'tip' },
      ],
    },
    {
      h: l('How replication works', 'রেপ্লিকেশন কীভাবে কাজ করে'),
      blocks: [
        { p: l('The most common setup is single-leader replication. One node is the primary (leader); it accepts all writes. Every change is streamed to the replicas (followers) through a replication log, and the replicas apply the same changes to stay in sync. Reads can be served by any replica, which is how replication scales reads.', 'সবচেয়ে সাধারণ ব্যবস্থা single-leader replication। একটি node primary (leader); এটি সব লেখা নেয়। প্রতিটি পরিবর্তন একটি replication log-এর মাধ্যমে replica-দের (follower) কাছে stream হয়, ও replica-রা সিঙ্কে থাকতে একই পরিবর্তন প্রয়োগ করে। পড়া যেকোনো replica পরিবেশন করতে পারে, এভাবেই রেপ্লিকেশন পড়া scale করে।') },
        { steps: [
          l('A client sends a write to the primary. The primary applies it locally and records it in its replication log.', 'একটি client primary-তে একটি লেখা পাঠায়। primary তা স্থানীয়ভাবে প্রয়োগ করে ও তার replication log-এ লেখে।'),
          l('The primary sends the log entry to each replica.', 'primary log entry-টি প্রতিটি replica-তে পাঠায়।'),
          l('In synchronous replication, the primary waits for a replica to confirm before acknowledging the client — safe, but slower.', 'synchronous replication-এ primary client-কে জানানোর আগে একটি replica-র নিশ্চিতকরণের জন্য অপেক্ষা করে—নিরাপদ, তবে ধীর।'),
          l('In asynchronous replication, the primary acknowledges immediately and replicas catch up shortly after — fast, but a reader may briefly see stale data (replication lag).', 'asynchronous replication-এ primary সঙ্গে সঙ্গে জানায় ও replica-রা একটু পরে ধরে ফেলে—দ্রুত, তবে একজন পাঠক ক্ষণিকের জন্য পুরনো ডেটা দেখতে পারে (replication lag)।'),
          l('If the primary fails, a failover promotes an up-to-date replica to become the new primary.', 'primary ব্যর্থ হলে একটি failover একটি হালনাগাদ replica-কে নতুন primary বানায়।'),
        ] },
        { p: l('Replication gives you three things: higher read throughput, high availability (a replica takes over on failure), and durability (data survives losing a node). What it does not give you is more write capacity or more total storage — every replica still holds the entire dataset and applies every write.', 'রেপ্লিকেশন তিনটি জিনিস দেয়: বেশি read throughput, high availability (ব্যর্থতায় একটি replica দায়িত্ব নেয়), ও durability (একটি node হারালেও ডেটা টেকে)। যা এটি দেয় না তা হলো বেশি write capacity বা বেশি মোট storage—প্রতিটি replica তবুও পুরো dataset ধরে ও প্রতিটি লেখা প্রয়োগ করে।') },
      ],
    },
    {
      h: l('How sharding works', 'শার্ডিং কীভাবে কাজ করে'),
      blocks: [
        { p: l('Sharding routes each row to a shard using a shard key — a column such as user_id. A routing rule maps the key to a specific node, so writes and reads for that key go to just one shard. The hard part is choosing the key and the mapping so load spreads evenly and common queries stay on a single shard.', 'শার্ডিং একটি shard key—যেমন user_id column—দিয়ে প্রতিটি row-কে একটি shard-এ পাঠায়। একটি routing নিয়ম key-কে একটি নির্দিষ্ট node-এ ম্যাপ করে, তাই সেই key-এর লেখা ও পড়া শুধু একটি shard-এ যায়। কঠিন অংশ হলো key ও mapping এমনভাবে বাছা যাতে load সমানভাবে ছড়ায় ও সাধারণ query একটি shard-এই থাকে।') },
        { code: `# Hash-based sharding: derive the shard from the key
num_shards = 4
shard = hash(user_id) % num_shards
# user_id 42  ->  shard 2  ->  db-node-2

# Range-based sharding: assign key ranges to shards
# users A-F -> shard 0,  G-M -> shard 1,  N-S -> shard 2,  T-Z -> shard 3

# A query that INCLUDES the shard key hits ONE shard (fast):
SELECT * FROM users WHERE user_id = 42;         -- routed to shard 2

# A query WITHOUT the shard key must fan out to ALL shards (slow):
SELECT * FROM users WHERE signup_country = 'BD';  -- scatter-gather across shards`, caption: l('Hash sharding spreads load evenly but breaks range scans; range sharding keeps ranges together but risks hot shards. Any query missing the shard key becomes a scatter-gather across every node.', 'hash sharding load সমান ছড়ায় কিন্তু range scan ভাঙে; range sharding range একসঙ্গে রাখে কিন্তু hot shard-এর ঝুঁকি। shard key বাদ-পড়া যেকোনো query প্রতিটি node-জুড়ে scatter-gather হয়ে যায়।') },
        { p: l('A good shard key has high cardinality and even access, so no single shard becomes a hotspot, and it aligns with your most common queries so they touch one shard, not all of them. A bad key — say, sharding by country when 60% of users are in one country — piles most traffic onto one node and defeats the whole point.', 'একটি ভালো shard key-এর cardinality বেশি ও access সমান, তাই কোনো একক shard hotspot হয় না, এবং এটি আপনার সবচেয়ে সাধারণ query-র সঙ্গে মেলে যাতে সেগুলো একটি shard ছোঁয়, সবগুলো নয়। একটি খারাপ key—ধরুন দেশ দিয়ে shard করা যখন ৬০% ব্যবহারকারী এক দেশে—বেশিরভাগ ট্রাফিক এক node-এ জমায় ও পুরো উদ্দেশ্য নষ্ট করে।') },
      ],
    },
    {
      h: l('Replication vs sharding', 'রেপ্লিকেশন বনাম শার্ডিং'),
      blocks: [
        { table: {
          head: [l('Aspect', 'দিক'), l('Replication', 'রেপ্লিকেশন'), l('Sharding', 'শার্ডিং')],
          rows: [
            [l('What each node holds', 'প্রতিটি node কী ধরে'), l('A full copy of all the data.', 'সব ডেটার সম্পূর্ণ কপি।'), l('Only its own disjoint slice.', 'শুধু তার নিজের বিচ্ছিন্ন অংশ।')],
            [l('Primary goal', 'মূল লক্ষ্য'), l('Availability, durability, read scaling.', 'availability, durability, পড়া scale।'), l('Write throughput and storage capacity.', 'write throughput ও storage ধারণক্ষমতা।')],
            [l('Scales reads', 'পড়া scale করে'), l('Yes — any replica serves reads.', 'হ্যাঁ—যেকোনো replica পড়া পরিবেশন করে।'), l('Yes — reads spread across shards.', 'হ্যাঁ—পড়া shard-জুড়ে ছড়ায়।')],
            [l('Scales writes', 'লেখা scale করে'), l('No — one primary takes all writes.', 'না—এক primary সব লেখা নেয়।'), l('Yes — each shard takes its own writes.', 'হ্যাঁ—প্রতিটি shard তার নিজের লেখা নেয়।')],
            [l('Main risk', 'প্রধান ঝুঁকি'), l('Replication lag → stale reads.', 'replication lag → পুরনো পড়া।'), l('Bad shard key → hotspots; cross-shard queries.', 'খারাপ shard key → hotspot; cross-shard query।')],
          ],
        } },
        { p: l('Read the table as a division of labour: replication is about copies for safety and read speed, sharding is about division for scale. They compose — a large system shards to fit the data and replicates every shard to keep it available.', 'টেবিলটি কাজের বিভাজন হিসেবে পড়ুন: রেপ্লিকেশন নিরাপত্তা ও পড়ার গতির জন্য কপি নিয়ে, শার্ডিং scale-এর জন্য বিভাজন নিয়ে। এরা একসঙ্গে কাজ করে—একটি বড় সিস্টেম ডেটা আঁটাতে shard করে ও প্রতিটি shard replicate করে available রাখে।') },
      ],
    },
    {
      h: l('When and where to use each', 'কখন ও কোথায় কোনটা ব্যবহার করবেন'),
      blocks: [
        { p: l('Reach for replication first, and almost always. It is the standard answer to "we need to survive a server dying" and "our reads are heavy" — both extremely common. Its cost is replication lag: an asynchronous replica can serve a read that is a few hundred milliseconds behind the primary, so a user might not see their own just-submitted comment. You mitigate this with techniques like read-your-writes routing (send that user’s reads to the primary briefly).', 'প্রথমে ও প্রায় সবসময় রেপ্লিকেশন নিন। "একটি সার্ভার মরলে টিকতে হবে" ও "আমাদের পড়া বেশি"—দুটোই অতি-সাধারণ—এর মানসম্মত উত্তর এটি। এর খরচ replication lag: একটি asynchronous replica primary-র চেয়ে কয়েকশো মিলিসেকেন্ড পিছিয়ে থাকা পড়া পরিবেশন করতে পারে, তাই ব্যবহারকারী তার সদ্য-জমা মন্তব্য না-ও দেখতে পারে। এটি read-your-writes routing-এর মতো কৌশলে সামলান (সেই ব্যবহারকারীর পড়া কিছুক্ষণ primary-তে পাঠান)।') },
        { p: l('Reach for sharding last, only after one well-tuned primary with replicas genuinely cannot hold the data or absorb the writes. Sharding is powerful but expensive in complexity: cross-shard joins and transactions become hard or impossible, re-balancing when you add a shard is painful, and every query that omits the shard key turns into a slow scatter-gather. A single modern server handles far more than beginners expect, so shard because the numbers demand it, not out of habit.', 'সবার শেষে শার্ডিং নিন, শুধু তখন যখন replica-সহ একটি ভালোভাবে-টিউন করা primary সত্যিই ডেটা ধরতে বা লেখা শুষতে পারে না। শার্ডিং শক্তিশালী তবে জটিলতায় ব্যয়বহুল: cross-shard join ও transaction কঠিন বা অসম্ভব হয়, একটি shard যোগ করলে re-balancing যন্ত্রণাদায়ক, ও shard key বাদ-দেওয়া প্রতিটি query একটি ধীর scatter-gather হয়। একটি আধুনিক সার্ভার নতুনদের ধারণার চেয়ে অনেক বেশি সামলায়, তাই অভ্যাসে নয়, সংখ্যা দাবি করলে তবেই shard করুন।') },
      ],
    },
    {
      h: l('Common mistakes', 'সাধারণ ভুল'),
      blocks: [
        { list: [
          l('Sharding too early — before a single well-tuned primary has actually reached its limits. You pay all the complexity for none of the need.', 'খুব আগে shard করা—একটি ভালোভাবে-টিউন করা primary আসলে সীমায় পৌঁছানোর আগেই। দরকার ছাড়াই সব জটিলতার দাম দেন।'),
          l('Picking a low-cardinality or skewed shard key, creating a hot shard that takes most of the traffic while others idle.', 'কম-cardinality বা তির্যক shard key বাছা, একটি hot shard তৈরি করা যা বেশিরভাগ ট্রাফিক নেয় আর বাকিরা অলস।'),
          l('Assuming replicas are always current. An async replica lags, so reads from it can be stale — never rely on one for read-after-write correctness.', 'replica সবসময় বর্তমান ধরে নেওয়া। একটি async replica পিছিয়ে থাকে, তাই তা থেকে পড়া পুরনো হতে পারে—read-after-write সঠিকতায় কখনো এতে ভরসা নয়।'),
          l('Designing queries that need the shard key but not providing it, forcing an expensive scatter-gather across every shard.', 'shard key দরকার এমন query বানানো কিন্তু তা না দেওয়া, প্রতিটি shard-জুড়ে একটি ব্যয়বহুল scatter-gather-এ বাধ্য করা।'),
          l('Expecting cross-shard transactions to "just work." Atomicity across shards needs extra machinery (two-phase commit, sagas) and is often best avoided by design.', '"এমনিতেই কাজ করবে" ভেবে cross-shard transaction আশা করা। shard-জুড়ে atomicity-র জন্য বাড়তি ব্যবস্থা (two-phase commit, saga) লাগে ও প্রায়ই design দিয়ে এড়ানোই ভালো।'),
        ] },
      ],
    },
    {
      h: l('Remember in one line', 'এক লাইনে মনে রাখুন'),
      blocks: [
        { list: [
          l('Replication copies all data for availability and read scaling; sharding divides data to expand write throughput and capacity.', 'রেপ্লিকেশন availability ও পড়া scale-এর জন্য সব ডেটা কপি করে; শার্ডিং write throughput ও ধারণক্ষমতা বাড়াতে ডেটা ভাগ করে।'),
          l('Replication’s cost is lag (stale reads); sharding’s cost is a hard shard-key choice and cross-shard queries.', 'রেপ্লিকেশনের খরচ lag (পুরনো পড়া); শার্ডিংয়ের খরচ কঠিন shard-key পছন্দ ও cross-shard query।'),
          l('Replicate early and often; shard late, only when one tuned primary truly cannot cope, with a high-cardinality key.', 'আগেভাগে ও প্রায়ই replicate করুন; দেরিতে shard করুন, শুধু যখন একটি টিউন করা primary সত্যিই পারে না, একটি বেশি-cardinality key দিয়ে।'),
        ] },
      ],
    },
  ],

  // ── messaging · Queues, Pub/Sub & event streaming ─────────────────────────
  'messaging': [
    {
      h: l('What is asynchronous messaging?', 'অ্যাসিঙ্ক্রোনাস মেসেজিং কী?'),
      blocks: [
        { p: l('Asynchronous messaging lets one part of a system hand work to another through a broker in the middle, instead of calling it directly and waiting for a reply. A producer publishes a message; the broker stores it; a consumer picks it up and processes it later, at its own pace. This decouples the two sides in time (they need not be busy at the same moment), in space (they only know the broker), and in rate (a fast producer and a slow consumer can coexist).', 'অ্যাসিঙ্ক্রোনাস মেসেজিং একটি সিস্টেমের এক অংশকে সরাসরি ডেকে উত্তরের অপেক্ষা না করে মাঝখানের একটি broker-এর মধ্য দিয়ে আরেক অংশকে কাজ দিতে দেয়। একটি producer একটি message publish করে; broker তা জমা রাখে; একটি consumer পরে নিজের গতিতে তা তুলে প্রক্রিয়া করে। এটি দুই পক্ষকে সময়ে (একই মুহূর্তে ব্যস্ত থাকতে হয় না), স্থানে (তারা শুধু broker-কে চেনে), ও গতিতে (দ্রুত producer ও ধীর consumer একসঙ্গে থাকতে পারে) আলাদা করে।') },
        { p: l('The problem it solves is the fragility of synchronous coupling. If your web request must finish sending an email, resizing an image, and charging a card before it returns, then the user waits for the slowest step, and any one downstream failure fails the whole request. A queue lets the request record "do this work" and return immediately, while the slow parts happen in the background — and a traffic spike piles up in the queue as a buffer instead of knocking servers over.', 'এটি যে সমস্যা সমাধান করে তা হলো synchronous coupling-এর ভঙ্গুরতা। যদি আপনার web request ফেরার আগে একটি email পাঠানো, একটি image resize ও একটি card charge শেষ করতে হয়, তবে ব্যবহারকারী সবচেয়ে ধীর ধাপের জন্য অপেক্ষা করে, ও যেকোনো একটি downstream ব্যর্থতা পুরো request ব্যর্থ করে। একটি queue request-কে "এই কাজটি করো" লিখে সঙ্গে সঙ্গে ফিরতে দেয়, আর ধীর অংশগুলো background-এ ঘটে—এবং একটি traffic spike সার্ভার ফেলে না দিয়ে queue-তে buffer হিসেবে জমে।') },
        { note: l('Picture a ticket counter with a numbered-queue machine. Customers keep arriving and pull a ticket without waiting at the desk; the clerks serve the line at a steady, controlled rate. Arrivals (producers) and service (consumers) are decoupled — a rush does not overwhelm the clerks, it just makes the line longer for a while.', 'একটি নম্বর-লাইন যন্ত্রসহ টিকিট কাউন্টার ভাবুন। গ্রাহকরা আসতে থাকে ও ডেস্কে অপেক্ষা না করে একটি টিকিট নেয়; কর্মীরা লাইনটি স্থির, নিয়ন্ত্রিত গতিতে সেবা দেয়। আগমন (producer) ও সেবা (consumer) আলাদা—একটি ভিড় কর্মীদের ভাসিয়ে দেয় না, শুধু কিছুক্ষণের জন্য লাইন লম্বা করে।'), kind: 'tip' },
      ],
    },
    {
      h: l('How a message queue works', 'একটি message queue কীভাবে কাজ করে'),
      blocks: [
        { steps: [
          l('A producer publishes a message (a small record like "order 42 placed") to a named queue or topic on the broker.', 'একটি producer broker-এ একটি নামযুক্ত queue বা topic-এ একটি message ("order 42 placed"-এর মতো ছোট record) publish করে।'),
          l('The broker stores the message durably and returns immediately, so the producer is not blocked.', 'broker message-টি টেকসইভাবে জমা রাখে ও সঙ্গে সঙ্গে ফেরে, তাই producer আটকায় না।'),
          l('A consumer pulls the next message and does the actual work — charging a card, sending an email, updating a search index.', 'একটি consumer পরের message টেনে নেয় ও আসল কাজ করে—card charge, email পাঠানো, search index হালনাগাদ।'),
          l('Only after the work succeeds does the consumer acknowledge (ack) the message, and the broker removes it.', 'কাজ সফল হওয়ার পরই consumer message-টি acknowledge (ack) করে, ও broker তা সরায়।'),
          l('If the consumer crashes or fails to ack, the broker re-delivers the message to another consumer, so nothing is silently lost.', 'consumer ক্র্যাশ করলে বা ack করতে ব্যর্থ হলে broker message-টি আরেকটি consumer-কে আবার দেয়, তাই কিছুই নীরবে হারায় না।'),
          l('A message that keeps failing (a "poison" message) is moved to a dead-letter queue for inspection instead of retrying forever.', 'বারবার ব্যর্থ হওয়া message (একটি "poison" message) চিরকাল retry না করে পরীক্ষার জন্য একটি dead-letter queue-তে সরানো হয়।'),
        ] },
        { code: `# Producer: enqueue and return fast; do NOT do the slow work here
def place_order(order):
    save_to_db(order)
    broker.publish("orders", { "order_id": order.id })   # returns immediately
    return "202 Accepted"

# Consumer: process later, ack ONLY after success so retries are safe
def worker():
    msg = broker.receive("orders")
    try:
        charge_payment(msg.order_id)   # the slow / failure-prone work
        broker.ack(msg)                # success -> remove from queue
    except Exception:
        broker.nack(msg)              # failure -> redeliver, or send to DLQ`, caption: l('The producer returns in milliseconds; the payment happens in the background. Because the consumer may be re-delivered a message, charge_payment must be idempotent — safe to run twice for the same order.', 'producer মিলিসেকেন্ডে ফেরে; payment background-এ ঘটে। consumer-কে একটি message আবার দেওয়া হতে পারে বলে charge_payment-কে idempotent হতে হবে—একই order-এ দুবার চললেও নিরাপদ।') },
      ],
    },
    {
      h: l('Queue vs Pub/Sub vs event streaming', 'Queue বনাম Pub/Sub বনাম event streaming'),
      blocks: [
        { table: {
          head: [l('Model', 'মডেল'), l('Delivery', 'ডেলিভারি'), l('Best for', 'কার জন্য')],
          rows: [
            [l('Work queue', 'work queue'), l('Each message goes to exactly one of many competing workers.', 'প্রতিটি message অনেক প্রতিযোগী worker-এর ঠিক একটিতে যায়।'), l('Distributing tasks: send email, resize image, process order.', 'কাজ বণ্টন: email পাঠানো, image resize, order প্রক্রিয়া।')],
            [l('Pub/Sub', 'Pub/Sub'), l('Each message is fanned out to every subscriber.', 'প্রতিটি message প্রতিটি subscriber-এ ছড়ায়।'), l('One event, many reactions: "order placed" → billing, email, analytics.', 'এক event, বহু প্রতিক্রিয়া: "order placed" → billing, email, analytics।')],
            [l('Event stream', 'event stream'), l('An ordered, durable, replayable log; consumers track their own offset.', 'একটি সাজানো, টেকসই, replay-যোগ্য log; consumer নিজের offset রাখে।'), l('High-throughput pipelines, replay, event sourcing (Kafka).', 'উচ্চ-throughput pipeline, replay, event sourcing (Kafka)।')],
          ],
        } },
        { p: l('The dividing lines: a work queue splits load across workers (one message, one worker); Pub/Sub broadcasts (one message, all subscribers); an event stream is a durable log you can re-read from any point, which lets a brand-new consumer replay history or a broken one catch up after a fix.', 'বিভাজন রেখা: একটি work queue worker-দের মধ্যে load ভাগ করে (এক message, এক worker); Pub/Sub সম্প্রচার করে (এক message, সব subscriber); একটি event stream একটি টেকসই log যা যেকোনো বিন্দু থেকে আবার পড়া যায়, যা একটি একদম-নতুন consumer-কে ইতিহাস replay করতে বা একটি নষ্ট consumer-কে ঠিক হওয়ার পর ধরে ফেলতে দেয়।') },
      ],
    },
    {
      h: l('Delivery semantics: the exactly-once trap', 'ডেলিভারি সেমান্টিক্স: exactly-once ফাঁদ'),
      blocks: [
        { p: l('How hard the broker tries to deliver a message is called its delivery semantics, and confusing these is the single most common messaging mistake.', 'broker একটি message পৌঁছাতে কতটা চেষ্টা করে তাকে তার delivery semantics বলে, ও এগুলো গুলিয়ে ফেলা মেসেজিংয়ের সবচেয়ে সাধারণ ভুল।') },
        { table: {
          head: [l('Guarantee', 'গ্যারান্টি'), l('Meaning', 'অর্থ'), l('You must handle', 'আপনাকে সামলাতে হবে')],
          rows: [
            [l('At-most-once', 'at-most-once'), l('Deliver zero or one time; may drop on failure.', 'শূন্য বা একবার পৌঁছায়; ব্যর্থতায় হারাতে পারে।'), l('Acceptable loss (e.g., metrics samples).', 'গ্রহণযোগ্য ক্ষতি (যেমন metrics নমুনা)।')],
            [l('At-least-once', 'at-least-once'), l('Deliver one or more times; may duplicate on retry.', 'একবার বা বেশি পৌঁছায়; retry-তে নকল হতে পারে।'), l('Idempotent consumers (dedupe by message id).', 'idempotent consumer (message id দিয়ে dedupe)।')],
            [l('Exactly-once', 'exactly-once'), l('Processed once and only once — very hard end-to-end.', 'ঠিক একবারই প্রক্রিয়া—পুরো পথে খুবই কঠিন।'), l('Usually faked: at-least-once + idempotency key.', 'সাধারণত নকল: at-least-once + idempotency key।')],
          ],
        } },
        { note: l('Do not assume a message is delivered exactly once end-to-end. Real brokers give at-least-once, so the same "charge order 42" can arrive twice after a retry. Make consumers idempotent — key each action by message id so processing it twice has the same effect as once. That is how systems get "effectively once".', 'ধরে নেবেন না একটি message পুরো পথে ঠিক একবারই পৌঁছায়। বাস্তব broker at-least-once দেয়, তাই একই "charge order 42" retry-র পর দুবার আসতে পারে। consumer-কে idempotent করুন—প্রতিটি action-কে message id দিয়ে key করুন যাতে দুবার প্রক্রিয়া একবারের মতোই ফল দেয়। এভাবেই সিস্টেম "কার্যত একবার" পায়।'), kind: 'warn' },
      ],
    },
    {
      h: l('When and where to use messaging', 'কখন ও কোথায় মেসেজিং ব্যবহার করবেন'),
      blocks: [
        { p: l('Use asynchronous messaging when work can happen after the response, when the workload is spiky, or when several independent things must react to one event. Sending confirmation emails, generating thumbnails, updating search indexes, running analytics, and smoothing burst traffic are all classic fits. The queue absorbs spikes and isolates failures: if the email service is down, orders still complete and the emails drain out later.', 'অ্যাসিঙ্ক্রোনাস মেসেজিং ব্যবহার করুন যখন কাজ response-এর পরে হতে পারে, workload হঠাৎ-বাড়া, বা কয়েকটি স্বাধীন জিনিসকে এক event-এ প্রতিক্রিয়া দিতে হয়। নিশ্চিতকরণ email পাঠানো, thumbnail বানানো, search index হালনাগাদ, analytics চালানো ও burst traffic মসৃণ করা—সবই ধ্রুপদী উপযুক্ত। queue spike শোষণ করে ও ব্যর্থতা আলাদা করে: email সার্ভিস বন্ধ থাকলেও order সম্পন্ন হয় ও email পরে বেরিয়ে যায়।') },
        { p: l('The trade-off is that you gain resilience but lose immediacy and simplicity. Results are eventual, not instant, so a user cannot be told the outcome synchronously. Debugging is harder: a request no longer has one straight call stack; it becomes an event that fans out across services, and you need correlation ids and good observability to trace it. And you must design for duplicates, retries, ordering limits, and dead letters. If a task is fast and its result is needed in the response, a plain synchronous call is simpler and better.', 'ট্রেড-অফ হলো আপনি সহনশীলতা পান কিন্তু তাৎক্ষণিকতা ও সরলতা হারান। ফল eventual, তাৎক্ষণিক নয়, তাই ব্যবহারকারীকে synchronous-ভাবে ফল জানানো যায় না। ডিবাগিং কঠিন: একটি request-এর আর একটি সরল call stack থাকে না; এটি একটি event হয়ে সার্ভিস-জুড়ে ছড়ায়, ও ট্রেস করতে correlation id ও ভালো observability লাগে। আর আপনাকে নকল, retry, ordering সীমা ও dead letter-এর জন্য design করতে হয়। একটি কাজ দ্রুত হলে ও ফল response-এ দরকার হলে, একটি সাধারণ synchronous call সরল ও ভালো।') },
      ],
    },
    {
      h: l('Common mistakes', 'সাধারণ ভুল'),
      blocks: [
        { list: [
          l('Assuming exactly-once end-to-end delivery. Brokers give at-least-once; without idempotent consumers a retry double-charges or double-emails.', 'পুরো পথে exactly-once ডেলিভারি ধরে নেওয়া। broker at-least-once দেয়; idempotent consumer ছাড়া একটি retry দুবার charge বা দুবার email করে।'),
          l('Expecting global ordering. Order is only guaranteed within a single partition or queue, not across the whole topic.', 'বৈশ্বিক ordering আশা করা। ক্রম শুধু একটি partition বা queue-এর ভেতরে নিশ্চিত, পুরো topic-জুড়ে নয়।'),
          l('Acknowledging a message before the work is done — a crash then loses it, because the broker already dropped it.', 'কাজ শেষ হওয়ার আগে message ack করা—তারপর একটি ক্র্যাশ তা হারায়, কারণ broker আগেই ফেলে দিয়েছে।'),
          l('No dead-letter queue, so one poison message retries forever and blocks or floods the consumers.', 'কোনো dead-letter queue নেই, তাই একটি poison message চিরকাল retry করে ও consumer আটকায় বা ভাসায়।'),
          l('Using a queue for work that needs an instant answer, adding latency and complexity where a synchronous call belonged.', 'তাৎক্ষণিক উত্তর দরকার এমন কাজে queue ব্যবহার করা, যেখানে synchronous call দরকার ছিল সেখানে latency ও জটিলতা যোগ করা।'),
        ] },
      ],
    },
    {
      h: l('Remember in one line', 'এক লাইনে মনে রাখুন'),
      blocks: [
        { list: [
          l('Messaging decouples producers from consumers in time, space, and rate, and buffers uneven traffic.', 'মেসেজিং producer-কে consumer থেকে সময়, স্থান ও গতিতে আলাদা করে, ও অসম traffic buffer করে।'),
          l('Queue = one worker per message; Pub/Sub = all subscribers; stream = a replayable ordered log.', 'Queue = প্রতি message-এ এক worker; Pub/Sub = সব subscriber; stream = একটি replay-যোগ্য সাজানো log।'),
          l('Delivery is at-least-once, so make consumers idempotent, use a dead-letter queue, and never assume exactly-once.', 'ডেলিভারি at-least-once, তাই consumer-কে idempotent করুন, dead-letter queue ব্যবহার করুন, ও কখনো exactly-once ধরে নেবেন না।'),
        ] },
      ],
    },
  ],

  // ── cap-consistency · CAP theorem & consistency models ────────────────────
  'cap-consistency': [
    {
      h: l('What is the CAP theorem?', 'CAP থিওরেম কী?'),
      blocks: [
        { p: l('The CAP theorem is a rule about distributed systems — systems whose data lives on more than one machine. It says that when the network between those machines fails (a partition), the system can guarantee at most one of two things: Consistency (every read sees the latest write) or Availability (every request still gets an answer). It cannot promise both while the partition lasts. CAP is the reason there is no such thing as a perfectly consistent and perfectly available distributed database.', 'CAP থিওরেম distributed সিস্টেম—যাদের ডেটা একাধিক মেশিনে থাকে—নিয়ে একটি নিয়ম। এটি বলে যখন সেই মেশিনগুলোর মধ্যের network ব্যর্থ হয় (একটি partition), সিস্টেম দুটির মধ্যে বড়জোর একটি নিশ্চিত করতে পারে: Consistency (প্রতিটি read সর্বশেষ write দেখে) বা Availability (প্রতিটি request তবুও একটি উত্তর পায়)। partition চলাকালে এটি দুটোই প্রতিশ্রুতি দিতে পারে না। CAP-ই কারণ কেন নিখুঁত-consistent ও নিখুঁত-available distributed ডেটাবেস বলে কিছু নেই।') },
        { p: l('The problem it names is unavoidable. Networks drop and delay messages; nodes lose contact with each other. When two replicas can no longer talk, and a write lands on one of them, the other now holds older data. If a read hits the stale replica, you must decide: answer with possibly-wrong data (choose availability), or refuse to answer until the split heals (choose consistency). There is no third option that is both correct and responsive.', 'এটি যে সমস্যার নাম দেয় তা অনিবার্য। network message ফেলে ও দেরি করায়; node পরস্পরের সঙ্গে যোগাযোগ হারায়। যখন দুটি replica আর কথা বলতে পারে না, ও একটি write তাদের একটিতে পড়ে, অন্যটি এখন পুরনো ডেটা ধরে। একটি read পুরনো replica-তে গেলে, আপনাকে ঠিক করতে হবে: সম্ভবত-ভুল ডেটা দিয়ে উত্তর দেওয়া (availability বাছা), নাকি split সারার আগ পর্যন্ত উত্তর না দেওয়া (consistency বাছা)। এমন তৃতীয় বিকল্প নেই যা সঠিক ও সাড়া-দানকারী দুটোই।') },
        { note: l('Imagine one shop with two branches that share a stock count over a phone line. A storm cuts the line. Each branch can keep selling (available) but their stock counts will drift apart and may oversell; or each branch can pause sales until the line is back (consistent) but customers are turned away. Connected, both work; cut off, you must pick one.', 'একটি দোকান কল্পনা করুন যার দুটি শাখা একটি ফোন লাইনে stock হিসাব ভাগ করে। একটি ঝড় লাইন কেটে দেয়। প্রতিটি শাখা বিক্রি চালিয়ে যেতে পারে (available) কিন্তু তাদের stock হিসাব আলাদা হয়ে যাবে ও oversell হতে পারে; অথবা প্রতিটি শাখা লাইন ফেরার আগ পর্যন্ত বিক্রি থামাতে পারে (consistent) কিন্তু গ্রাহক ফিরে যায়। যুক্ত থাকলে দুটোই চলে; বিচ্ছিন্ন হলে একটি বাছতেই হবে।'), kind: 'tip' },
      ],
    },
    {
      h: l('The three properties: C, A, P', 'তিনটি গুণ: C, A, P'),
      blocks: [
        { table: {
          head: [l('Property', 'গুণ'), l('What it guarantees', 'কী নিশ্চিত করে'), l('Give it up and…', 'ছাড়লে…')],
          rows: [
            [l('C · Consistency', 'C · Consistency'), l('Every read returns the most recent write, or an error — all nodes agree.', 'প্রতিটি read সর্বশেষ write বা একটি error দেয়—সব node একমত।'), l('Reads may return stale (out-of-date) data.', 'read পুরনো (অচল) ডেটা দিতে পারে।')],
            [l('A · Availability', 'A · Availability'), l('Every request receives a non-error response (not necessarily the latest).', 'প্রতিটি request একটি non-error উত্তর পায় (সর্বশেষ না-ও হতে পারে)।'), l('Some requests fail or time out.', 'কিছু request ব্যর্থ হয় বা time out করে।')],
            [l('P · Partition tolerance', 'P · Partition tolerance'), l('The system keeps operating even when messages between nodes are dropped or delayed.', 'node-দের মধ্যে message ফেলা বা দেরি হলেও সিস্টেম চলতে থাকে।'), l('A single dropped link can halt the whole system.', 'একটি ছেঁড়া link পুরো সিস্টেম থামাতে পারে।')],
          ],
        } },
        { p: l('The crucial subtlety: in any real distributed system, partitions will happen — networks are not perfectly reliable — so partition tolerance (P) is not optional. That means the real, live choice is only ever between C and A, and only during a partition. When the network is healthy, a well-built system delivers both consistency and availability at once. CAP is a rule about the bad moment, not about normal operation.', 'গুরুত্বপূর্ণ সূক্ষ্মতা: যেকোনো বাস্তব distributed সিস্টেমে partition ঘটবেই—network নিখুঁতভাবে নির্ভরযোগ্য নয়—তাই partition tolerance (P) ঐচ্ছিক নয়। এর মানে আসল, জীবন্ত পছন্দ সবসময় শুধু C ও A-র মধ্যে, এবং শুধু একটি partition চলাকালে। network সুস্থ থাকলে একটি ভালো-গড়া সিস্টেম consistency ও availability একসঙ্গে দেয়। CAP খারাপ মুহূর্তের নিয়ম, স্বাভাবিক পরিচালনার নয়।') },
      ],
    },
    {
      h: l('The partition choice: CP vs AP', 'partition পছন্দ: CP বনাম AP'),
      blocks: [
        { p: l('Here is how the choice plays out, step by step, when the link between two replicas breaks.', 'দুটি replica-র মধ্যের link ভাঙলে পছন্দটি ধাপে ধাপে কীভাবে ঘটে তা এই যে।') },
        { steps: [
          l('The system runs normally: writes reach every replica and reads are both fresh and available.', 'সিস্টেম স্বাভাবিক চলে: write প্রতিটি replica-তে পৌঁছায় ও read fresh ও available দুটোই।'),
          l('A network partition splits the replicas into two groups that can no longer talk to each other.', 'একটি network partition replica-দের দুটি দলে ভাগ করে যারা আর পরস্পরের সঙ্গে কথা বলতে পারে না।'),
          l('A write arrives on one side. That side now has newer data than the other, which is unreachable.', 'একটি write এক পাশে আসে। সেই পাশে এখন অন্যটির চেয়ে নতুন ডেটা, যা পৌঁছানো যায় না।'),
          l('A read arrives on the other, stale side — and the system must decide right now.', 'অন্য, পুরনো পাশে একটি read আসে—ও সিস্টেমকে এখনই সিদ্ধান্ত নিতে হবে।'),
          l('CP choice: refuse or block the request rather than answer with stale data — consistent, but temporarily unavailable.', 'CP পছন্দ: পুরনো ডেটা দিয়ে উত্তর না দিয়ে request প্রত্যাখ্যান বা আটকায়—consistent, তবে সাময়িকভাবে unavailable।'),
          l('AP choice: answer with the best local data and reconcile the two sides once the partition heals — available, but temporarily stale.', 'AP পছন্দ: সেরা local ডেটা দিয়ে উত্তর দেয় ও partition সারলে দুই পাশ মেলায়—available, তবে সাময়িকভাবে পুরনো।'),
        ] },
        { code: `# What a coordinator does when a read cannot reach a quorum of replicas
def handle_read(key):
    replies = read_from_replicas(key)
    if partitioned() and not has_quorum(replies):
        # CP system: correctness first
        raise Unavailable("cannot confirm latest value")
        # AP system would instead do:
        # return best_local_value(replies)   # maybe stale, reconcile later
    return newest_by_version(replies)`, caption: l('The single branch — raise an error versus return possibly-stale local data — is the whole CP-versus-AP decision, made only while the partition prevents a confident answer.', 'একটিমাত্র শাখা—একটি error তোলা বনাম সম্ভবত-পুরনো local ডেটা ফেরানো—ই পুরো CP-বনাম-AP সিদ্ধান্ত, যা শুধু তখনই নেওয়া হয় যখন partition একটি আত্মবিশ্বাসী উত্তর ঠেকায়।') },
        { table: {
          head: [l('Choice', 'পছন্দ'), l('During a partition it…', 'partition চলাকালে এটি…'), l('Fits', 'উপযুক্ত')],
          rows: [
            [l('CP (consistency)', 'CP (consistency)'), l('Rejects or blocks requests on the disconnected side to avoid serving stale data.', 'পুরনো ডেটা এড়াতে বিচ্ছিন্ন পাশের request প্রত্যাখ্যান বা আটকায়।'), l('Banking, inventory, bookings — being wrong is worse than being down. (etcd, ZooKeeper, HBase)', 'ব্যাংকিং, inventory, booking—ভুল হওয়া বন্ধ থাকার চেয়ে খারাপ। (etcd, ZooKeeper, HBase)')],
            [l('AP (availability)', 'AP (availability)'), l('Keeps answering with the best data it has and reconciles the copies later.', 'তার সেরা ডেটা দিয়ে উত্তর দিতে থাকে ও পরে কপিগুলো মেলায়।'), l('Social feeds, carts, catalogs — a brief staleness is fine, downtime is not. (Cassandra, DynamoDB, Riak)', 'সোশ্যাল ফিড, cart, catalog—সামান্য পুরনো ঠিক আছে, downtime নয়। (Cassandra, DynamoDB, Riak)')],
          ],
        } },
        { p: l('A more complete lens is PACELC: if there is a Partition, choose Availability or Consistency (the CAP part); Else (normal operation), choose lower Latency or stronger Consistency. It reminds you that even with no partition, keeping replicas perfectly in sync costs latency — so the consistency-versus-speed trade-off is always with you, not only during failures.', 'আরও সম্পূর্ণ দৃষ্টিভঙ্গি PACELC: যদি একটি Partition থাকে, Availability বা Consistency বাছুন (CAP অংশ); Else (স্বাভাবিক পরিচালনা), কম Latency বা শক্ত Consistency বাছুন। এটি মনে করায় যে partition না থাকলেও replica নিখুঁতভাবে সিঙ্কে রাখতে latency লাগে—তাই consistency-বনাম-গতির ট্রেড-অফ সবসময় আপনার সঙ্গে, শুধু ব্যর্থতার সময় নয়।') },
      ],
    },
    {
      h: l('Consistency models: a spectrum', 'consistency মডেল: একটি বর্ণালী'),
      blocks: [
        { p: l('"Consistency" is not one thing but a spectrum, from strict to relaxed. Choosing a model is choosing how much staleness the application can tolerate in exchange for lower latency and higher availability.', '"Consistency" একটি জিনিস নয় বরং একটি বর্ণালী, কঠোর থেকে শিথিল। একটি মডেল বাছা মানে কম latency ও বেশি availability-র বিনিময়ে অ্যাপ্লিকেশন কতটা পুরনোত্ব সহ্য করতে পারে তা বাছা।') },
        { list: [
          l('Strong / linearizable — every read sees the latest committed write, as if there were one single copy. Simplest to reason about, most expensive.', 'strong / linearizable—প্রতিটি read সর্বশেষ committed write দেখে, যেন একটিই কপি আছে। বোঝা সবচেয়ে সহজ, সবচেয়ে ব্যয়বহুল।'),
          l('Causal — operations that are cause-and-effect related are seen in order; unrelated ones may differ. Good for comments and replies.', 'causal—কারণ-ও-ফল সম্পর্কিত operation ক্রমে দেখা যায়; অসম্পর্কিতগুলো ভিন্ন হতে পারে। মন্তব্য ও উত্তরের জন্য ভালো।'),
          l('Read-your-writes — a user always sees their own latest change, even if others see it a moment later. Common for profiles and settings.', 'read-your-writes—একজন ব্যবহারকারী সবসময় নিজের সর্বশেষ পরিবর্তন দেখে, অন্যরা একটু পরে দেখলেও। profile ও setting-এ সাধারণ।'),
          l('Eventual — if writes stop, all replicas converge to the same value in time. Cheapest and most available; may briefly return stale data.', 'eventual—write থামলে সব replica সময়ের সঙ্গে একই মানে মেলে। সবচেয়ে সস্তা ও available; ক্ষণিকের জন্য পুরনো ডেটা দিতে পারে।'),
        ] },
      ],
    },
    {
      h: l('When and where — choosing per operation', 'কখন ও কোথায়—প্রতি operation বাছাই'),
      blocks: [
        { p: l('The right choice is rarely system-wide; it is per operation, driven by the business cost of being stale or being rejected. Within one app, a payment or a "buy the last ticket" action wants strong consistency — a wrong answer costs money or double-sells a seat, so you accept the extra latency and the occasional rejection during a partition. On the same app, the like count, the recommendation feed, or the view counter can be eventually consistent — being a few seconds behind is invisible to users and buys availability and speed.', 'সঠিক পছন্দ কমই পুরো-সিস্টেম-জুড়ে; এটি প্রতি operation-ভিত্তিক, পুরনো বা প্রত্যাখ্যাত হওয়ার ব্যবসায়িক খরচে চালিত। একটি অ্যাপের ভেতরে, একটি payment বা "শেষ টিকিটটি কেনা" action শক্ত consistency চায়—একটি ভুল উত্তর টাকা খরচ করায় বা একটি আসন দুবার বেচে, তাই আপনি বাড়তি latency ও partition-এর সময় মাঝেমধ্যে প্রত্যাখ্যান মেনে নেন। একই অ্যাপে, like count, recommendation feed বা view counter eventually consistent হতে পারে—কয়েক সেকেন্ড পিছিয়ে থাকা ব্যবহারকারীর কাছে অদৃশ্য ও availability ও গতি কিনে দেয়।') },
        { p: l('So decide feature by feature: what is the cost of a user seeing slightly old data here, versus the cost of an error or a spinner? Strong consistency simplifies reasoning but adds latency and can reject work during a partition; weaker models stay fast and available at the price of temporary staleness you must design the UI and the reconciliation around.', 'তাই feature ধরে ধরে ঠিক করুন: এখানে একজন ব্যবহারকারীর সামান্য পুরনো ডেটা দেখার খরচ কী, বনাম একটি error বা একটি spinner-এর খরচ? শক্ত consistency বোঝা সহজ করে তবে latency যোগ করে ও partition-এ কাজ প্রত্যাখ্যান করতে পারে; দুর্বল মডেল দ্রুত ও available থাকে সাময়িক পুরনোত্বের বিনিময়ে, যার চারপাশে আপনাকে UI ও reconciliation design করতে হয়।') },
      ],
    },
    {
      h: l('Common mistakes', 'সাধারণ ভুল'),
      blocks: [
        { list: [
          l('Describing CAP as "pick any two of three" during normal operation. You do not choose during healthy running — you get both C and A; the choice is only C vs A, and only during a partition.', 'স্বাভাবিক পরিচালনায় CAP-কে "তিনটির যেকোনো দুটি বাছুন" বলা। সুস্থ চলাকালে আপনি বাছেন না—C ও A দুটোই পান; পছন্দ শুধু C বনাম A, ও শুধু একটি partition-এ।'),
          l('Treating P as optional. In a distributed system partitions are a fact of nature, so you effectively always keep P and trade the other two.', 'P-কে ঐচ্ছিক ধরা। একটি distributed সিস্টেমে partition প্রকৃতির সত্য, তাই আপনি কার্যত সবসময় P রাখেন ও বাকি দুটি বিনিময় করেন।'),
          l('Confusing CAP’s consistency (linearizability) with ACID’s consistency (keeping database invariants). They are different ideas that share a word.', 'CAP-এর consistency (linearizability)-কে ACID-এর consistency (ডেটাবেস invariant রাখা)-র সঙ্গে গুলিয়ে ফেলা। এরা ভিন্ন ধারণা যারা একটি শব্দ ভাগ করে।'),
          l('Assuming eventual consistency means data is wrong or never converges. It converges once writes settle; it is a timing property, not a correctness bug.', 'eventual consistency মানে ডেটা ভুল বা কখনো মেলে না ধরে নেওয়া। write থিতু হলে এটি মেলে; এটি একটি সময়ের গুণ, সঠিকতার bug নয়।'),
          l('Picking one consistency level for the whole system instead of per operation, over-paying for feeds and under-protecting payments.', 'প্রতি operation-এর বদলে পুরো সিস্টেমের জন্য একটি consistency স্তর বাছা, feed-এ বেশি দাম দেওয়া ও payment-এ কম সুরক্ষা।'),
        ] },
      ],
    },
    {
      h: l('Remember in one line', 'এক লাইনে মনে রাখুন'),
      blocks: [
        { list: [
          l('CAP: during a network partition you must choose Consistency (correct but maybe unavailable) or Availability (up but maybe stale).', 'CAP: একটি network partition-এ আপনাকে Consistency (সঠিক তবে হয়তো unavailable) বা Availability (সচল তবে হয়তো পুরনো) বাছতে হবে।'),
          l('Partition tolerance is mandatory, so the real trade-off is C vs A and only while partitioned — normally you get both.', 'Partition tolerance বাধ্যতামূলক, তাই আসল ট্রেড-অফ C বনাম A এবং শুধু partition চলাকালে—সাধারণত দুটোই পান।'),
          l('Consistency is a spectrum (strong → eventual); choose per operation from the business cost of stale or rejected work.', 'Consistency একটি বর্ণালী (strong → eventual); পুরনো বা প্রত্যাখ্যাত কাজের ব্যবসায়িক খরচ থেকে প্রতি operation বাছুন।'),
        ] },
      ],
    },
  ],

  // ── quorums · Quorums & eventual consistency ──────────────────────────────
  'quorums': [
    {
      h: l('What is a quorum?', 'কোরাম কী?'),
      blocks: [
        { p: l('A quorum is the minimum number of replicas that must agree before a read or a write is considered successful. In a system that keeps N copies of each piece of data, you require a write to be acknowledged by W replicas and a read to gather answers from R replicas. By tuning N, W, and R you dial in exactly how fresh, how available, and how fast the system is — instead of accepting one fixed setting.', 'কোরাম হলো একটি read বা write সফল ধরার আগে যত replica-কে একমত হতে হবে তার ন্যূনতম সংখ্যা। যে সিস্টেম প্রতিটি ডেটার N কপি রাখে, সেখানে আপনি চান একটি write W replica দ্বারা acknowledge হোক ও একটি read R replica থেকে উত্তর সংগ্রহ করুক। N, W ও R টিউন করে আপনি ঠিক কতটা fresh, কতটা available ও কতটা দ্রুত তা নির্ধারণ করেন—একটি স্থির setting মেনে নেওয়ার বদলে।') },
        { p: l('The problem quorums solve is the tension between never-stale and always-available. If you demand that every replica confirms each write, one dead node blocks all writes. If you let a single replica answer, a lagging one can hand back old data. A quorum is the middle path: require just enough overlap between the readers and the writers that a read is guaranteed to meet at least one replica that saw the newest write.', 'কোরাম যে সমস্যা সমাধান করে তা হলো কখনো-পুরনো-নয় ও সবসময়-available-এর মধ্যে টানাপোড়েন। যদি চান প্রতিটি replica প্রতিটি write নিশ্চিত করুক, একটি মরা node সব write আটকায়। যদি একটি replica-কে উত্তর দিতে দেন, একটি পিছিয়ে-থাকা replica পুরনো ডেটা ফেরত দিতে পারে। কোরাম মাঝপথ: পাঠক ও লেখকের মধ্যে ঠিক যথেষ্ট overlap চান যাতে একটি read অন্তত একটি replica-র সঙ্গে দেখা করে যে নতুন write দেখেছে।') },
        { note: l('Think of a committee that must carry the latest decision. If enough members who attended the last meeting also attend this one, the current information is guaranteed to be in the room. Overlapping voters — not asking everyone — is what makes the group both informed and able to meet without full attendance.', 'একটি কমিটি ভাবুন যাকে সর্বশেষ সিদ্ধান্ত বহন করতে হবে। শেষ সভায় উপস্থিত যথেষ্ট সদস্য এই সভাতেও এলে বর্তমান তথ্য নিশ্চিতভাবে ঘরে থাকবে। overlap করা ভোটার—সবাইকে না ডাকা—ই দলটিকে অবহিত ও পূর্ণ উপস্থিতি ছাড়া সভা করতে সক্ষম করে।'), kind: 'tip' },
      ],
    },
    {
      h: l('How quorum reads and writes work', 'কোরাম read ও write কীভাবে কাজ করে'),
      blocks: [
        { p: l('The key rule is R + W > N. When the read set and the write set are together larger than the number of replicas, they must overlap by at least one node — and that shared node holds the latest write, so the read can find it. Each replica also tags its data with a version (a timestamp or vector clock), so when a read gathers several answers it can pick the newest.', 'মূল নিয়ম R + W > N। যখন read সেট ও write সেট একসঙ্গে replica সংখ্যার চেয়ে বড়, তাদের অন্তত একটি node-এ overlap করতেই হয়—ও সেই ভাগ-করা node সর্বশেষ write ধরে, তাই read তা খুঁজে পায়। প্রতিটি replica তার ডেটাকে একটি version (একটি timestamp বা vector clock) দিয়ে ট্যাগও করে, তাই একটি read কয়েকটি উত্তর সংগ্রহ করলে নতুনটি বাছতে পারে।') },
        { steps: [
          l('A write is sent to all N replicas; the coordinator waits for W of them to acknowledge, then reports success.', 'একটি write সব N replica-তে পাঠানো হয়; coordinator তাদের W-টির acknowledge-এর জন্য অপেক্ষা করে, তারপর সফল জানায়।'),
          l('A read asks all N replicas but waits for R responses, each carrying a version.', 'একটি read সব N replica-কে জিজ্ঞাসা করে কিন্তু R-টি উত্তরের জন্য অপেক্ষা করে, প্রতিটি একটি version বহন করে।'),
          l('The coordinator compares versions and returns the newest one to the client.', 'coordinator version তুলনা করে ও নতুনটি client-কে ফেরত দেয়।'),
          l('If it notices a replica returned an old version, it writes the fresh value back to it — this is read repair.', 'একটি replica পুরনো version দিলে coordinator টের পেয়ে তাতে নতুন মান আবার লেখে—এটি read repair।'),
          l('When R + W > N, the R responses are guaranteed to include a node with the latest write, so the client sees fresh data.', 'যখন R + W > N, সেই R উত্তরে নিশ্চিতভাবে সর্বশেষ write-যুক্ত একটি node থাকে, তাই client fresh ডেটা দেখে।'),
        ] },
        { code: `# Replication factor N = 3.  Tune R and W to trade freshness vs speed.
N = 3
W = 2     # a write must be acknowledged by 2 of 3 replicas
R = 2     # a read must gather 2 of 3 replicas

# R + W > N   ->   2 + 2 = 4 > 3   ->   read and write sets overlap
# so every read is guaranteed to touch a node with the newest value.

# Fast writes, risky reads:  W = 1, R = 1   (1 + 1 = 2, NOT > 3)  -> may read stale
# Strong reads, slow writes: W = 3, R = 1   (3 + 1 = 4 > 3)       -> every node has it
# Balanced, survives 1 down:  W = 2, R = 2   (the common default)`, caption: l('N is durability and parallelism; W and R slide the balance between write availability, read freshness, and latency. The overlap guarantee only holds when R + W > N.', 'N হলো durability ও সমান্তরালতা; W ও R write availability, read freshness ও latency-র ভারসাম্য সরায়। overlap গ্যারান্টি শুধু তখনই টেকে যখন R + W > N।') },
      ],
    },
    {
      h: l('Quorum configurations at a glance', 'কোরাম কনফিগারেশন এক নজরে'),
      blocks: [
        { table: {
          head: [l('N, R, W', 'N, R, W'), l('R + W > N?', 'R + W > N?'), l('Behaviour', 'আচরণ')],
          rows: [
            [l('N=3, R=2, W=2', 'N=3, R=2, W=2'), l('Yes (4 > 3)', 'হ্যাঁ (4 > 3)'), l('Balanced default; survives one node down for both reads and writes.', 'ভারসাম্যপূর্ণ ডিফল্ট; একটি node down-এও read ও write টেকে।')],
            [l('N=3, R=1, W=3', 'N=3, R=1, W=3'), l('Yes (4 > 3)', 'হ্যাঁ (4 > 3)'), l('Very fast reads; writes need all replicas, so any node down blocks writes.', 'খুব দ্রুত read; write-এ সব replica লাগে, তাই যেকোনো node down write আটকায়।')],
            [l('N=3, R=3, W=1', 'N=3, R=3, W=1'), l('Yes (4 > 3)', 'হ্যাঁ (4 > 3)'), l('Very fast writes; reads need all replicas, so any node down blocks reads.', 'খুব দ্রুত write; read-এ সব replica লাগে, তাই যেকোনো node down read আটকায়।')],
            [l('N=3, R=1, W=1', 'N=3, R=1, W=1'), l('No (2 < 3)', 'না (2 < 3)'), l('Fastest and most available; only eventual consistency — reads may be stale.', 'দ্রুততম ও সবচেয়ে available; শুধু eventual consistency—read পুরনো হতে পারে।')],
          ],
        } },
        { p: l('Read the table as a slider. Push W up for safer, fresher writes but lower write availability; push R up for fresher reads but slower reads. Keep both low and you get maximum speed and availability, but only eventual consistency. The balanced N=3, R=2, W=2 is popular precisely because it tolerates one failure on either side while still satisfying R + W > N.', 'টেবিলটি একটি slider হিসেবে পড়ুন। W বাড়ান নিরাপদ, fresh write-এর জন্য কিন্তু কম write availability; R বাড়ান fresh read-এর জন্য কিন্তু ধীর read। দুটোই কম রাখলে সর্বোচ্চ গতি ও availability পান, তবে শুধু eventual consistency। ভারসাম্যপূর্ণ N=3, R=2, W=2 জনপ্রিয় ঠিক এ কারণেই যে এটি R + W > N মেটানোর পাশাপাশি যেকোনো পাশে একটি ব্যর্থতা সহ্য করে।') },
      ],
    },
    {
      h: l('Eventual consistency and repair', 'eventual consistency ও মেরামত'),
      blocks: [
        { p: l('When R + W is not greater than N (or when a partition forces the system to accept fewer acks), you are running with eventual consistency: replicas may temporarily disagree, but if writes stop they converge to the same value. Systems make this convergence happen with background repair mechanisms rather than hoping.', 'যখন R + W, N-এর চেয়ে বড় নয় (বা যখন একটি partition সিস্টেমকে কম ack মানতে বাধ্য করে), আপনি eventual consistency-তে চলছেন: replica সাময়িকভাবে অমিল থাকতে পারে, কিন্তু write থামলে তারা একই মানে মেলে। সিস্টেম এই মিলন আশা না করে background মেরামত ব্যবস্থা দিয়ে ঘটায়।') },
        { list: [
          l('Read repair — when a read notices some replicas are behind, it writes the newest value back to them on the spot.', 'read repair—একটি read কিছু replica পিছিয়ে দেখলে সঙ্গে সঙ্গে তাদের নতুন মান আবার লেখে।'),
          l('Hinted handoff — if a target replica is down during a write, another node stores a "hint" and delivers it once the replica returns.', 'hinted handoff—write-এর সময় একটি লক্ষ্য replica down থাকলে আরেকটি node একটি "hint" জমা রাখে ও replica ফিরলে পৌঁছে দেয়।'),
          l('Anti-entropy with Merkle trees — replicas periodically compare compact tree hashes to find and heal differences efficiently.', 'Merkle tree দিয়ে anti-entropy—replica পর্যায়ক্রমে সংক্ষিপ্ত tree hash তুলনা করে পার্থক্য খুঁজে দক্ষভাবে সারায়।'),
        ] },
      ],
    },
    {
      h: l('When and where to use quorums', 'কখন ও কোথায় কোরাম ব্যবহার করবেন'),
      blocks: [
        { p: l('Tunable quorums shine in leaderless, replicated stores (Cassandra, DynamoDB, Riak) where you want to choose consistency per query rather than for the whole database. Set N from how many failures you must survive and how many copies you can afford. Then, for each operation, raise R and W for critical writes that must be read fresh, and lower them for high-volume, tolerant traffic where speed and availability matter more than seeing the very latest value.', 'টিউনযোগ্য কোরাম leaderless, replicated store-এ (Cassandra, DynamoDB, Riak) উজ্জ্বল, যেখানে আপনি পুরো ডেটাবেসের বদলে প্রতি query-তে consistency বাছতে চান। কত ব্যর্থতা টিকতে হবে ও কত কপি সামর্থ্য আছে তা থেকে N ঠিক করুন। তারপর প্রতিটি operation-এ, যে গুরুত্বপূর্ণ write fresh পড়তে হবে তার জন্য R ও W বাড়ান, ও উচ্চ-ভলিউম, সহনশীল traffic-এ কমান যেখানে সর্বশেষ মান দেখার চেয়ে গতি ও availability বেশি জরুরি।') },
        { p: l('The trade-off is straightforward: larger quorums raise your confidence in freshness but contact more nodes, which adds latency and lowers availability, because more nodes must be reachable for a request to succeed. Smaller quorums are faster and survive more failures but risk stale reads. There is no universally best setting — only the one that matches the cost of staleness for the operation in front of you.', 'ট্রেড-অফ সোজা: বড় কোরাম freshness-এ আপনার আস্থা বাড়ায় কিন্তু বেশি node-এ যায়, যা latency যোগ করে ও availability কমায়, কারণ একটি request সফল হতে বেশি node-কে পৌঁছানোযোগ্য হতে হয়। ছোট কোরাম দ্রুত ও বেশি ব্যর্থতা টেকে কিন্তু পুরনো read-এর ঝুঁকি। সর্বজনীন সেরা setting নেই—শুধু সামনের operation-এর পুরনোত্বের খরচের সঙ্গে যেটি মেলে সেটি।') },
      ],
    },
    {
      h: l('Common mistakes', 'সাধারণ ভুল'),
      blocks: [
        { list: [
          l('Assuming R + W > N removes every source of stale data. It guarantees overlap, but concurrent writes, clock skew with last-write-wins, sloppy quorums with hinted handoff, and a read before repair can still surface old or conflicting values.', 'R + W > N হলে পুরনো ডেটার সব উৎস দূর হয় ধরে নেওয়া। এটি overlap নিশ্চিত করে, কিন্তু একযোগে write, last-write-wins-এ clock skew, hinted handoff-সহ sloppy quorum, ও মেরামতের আগের read এখনো পুরনো বা সাংঘর্ষিক মান দেখাতে পারে।'),
          l('Treating quorum consistency as linearizability. Overlap ensures a read meets a fresh replica, but without careful versioning it is not the same as a single, always-latest copy.', 'কোরাম consistency-কে linearizability ধরা। overlap নিশ্চিত করে একটি read একটি fresh replica পায়, কিন্তু সতর্ক versioning ছাড়া এটি একটি একক, সবসময়-সর্বশেষ কপির সমান নয়।'),
          l('Setting W = 1 and expecting durability — a single acknowledged copy can be lost if that node dies before the write propagates.', 'W = 1 রেখে durability আশা করা—write ছড়ানোর আগে সেই node মরলে একমাত্র acknowledge-করা কপি হারাতে পারে।'),
          l('Ignoring repair. Without read repair, hinted handoff, or anti-entropy, replicas that miss writes never catch up and divergence grows.', 'মেরামত উপেক্ষা করা। read repair, hinted handoff বা anti-entropy ছাড়া, write মিস-করা replica কখনো ধরে ফেলে না ও পার্থক্য বাড়ে।'),
          l('Choosing one global R/W for everything instead of tuning per operation to the actual cost of stale reads.', 'প্রতি operation-এ পুরনো read-এর আসল খরচে টিউন না করে সবকিছুর জন্য একটি বৈশ্বিক R/W বাছা।'),
        ] },
      ],
    },
    {
      h: l('Remember in one line', 'এক লাইনে মনে রাখুন'),
      blocks: [
        { list: [
          l('A quorum requires W replicas to ack a write and R to answer a read; N is the number of copies.', 'কোরাম চায় W replica একটি write ack করুক ও R একটি read-এর উত্তর দিক; N হলো কপির সংখ্যা।'),
          l('R + W > N forces read/write overlap so a read meets the latest write — but it is not full linearizability.', 'R + W > N read/write overlap বাধ্য করে যাতে একটি read সর্বশেষ write পায়—তবে এটি পূর্ণ linearizability নয়।'),
          l('Bigger quorums = fresher but slower and less available; smaller = faster and more available but eventually consistent; repair keeps replicas converging.', 'বড় কোরাম = fresh তবে ধীর ও কম available; ছোট = দ্রুত ও বেশি available তবে eventually consistent; মেরামত replica-দের মিলিয়ে রাখে।'),
        ] },
      ],
    },
  ],
}
