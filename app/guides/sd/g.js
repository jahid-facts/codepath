// Deep, bilingual (English / Bangla) teaching guides for the System Design
// "Design a system" case studies. Shape mirrors app/course-guides.js and the
// other guide parts: each guide is an array of sections { h, blocks }, rendered
// by GuideBlock in app/LearningApp.js. Facts are drawn from the rawTopics rows in
// app/data.js. Each topic follows: Requirements → Estimation ({ code } capacity
// calc) → High-level design ({ steps }) → Key deep-dive → Scaling & trade-offs
// ({ table }) → Common mistakes ({ list }) → Summary ({ list }). In { code }
// blocks everything is a plain backtick literal — never the dollar-brace form.

const l = (en, bn) => ({ en, bn })

export default {
  // ── Design search & autocomplete ──────────────────────────────────────────
  'search-system': [
    {
      h: l('Requirements: what a search system must do', 'প্রয়োজন: একটি সার্চ সিস্টেমকে যা করতে হবে'),
      blocks: [
        { p: l('Before drawing boxes, pin down what "search" means here. The functional requirements are usually: full-text search over a large corpus (products, documents, posts), autocomplete that suggests completions as the user types each character, ranking so the most relevant results come first, filtering and sorting, and reasonable freshness so a newly added item becomes searchable soon after it is written.', 'বাক্স আঁকার আগে ঠিক করুন এখানে "search" মানে কী। ফাংশনাল প্রয়োজন সাধারণত: বড় corpus-এর (প্রোডাক্ট, ডকুমেন্ট, পোস্ট) ওপর full-text search, ব্যবহারকারী প্রতিটি অক্ষর টাইপ করার সঙ্গে সঙ্গে completion সাজেশন দেওয়া autocomplete, সবচেয়ে প্রাসঙ্গিক ফল আগে আনতে ranking, filter ও sort, এবং যুক্তিসঙ্গত freshness যাতে নতুন যোগ হওয়া আইটেম লেখার অল্প পরেই খুঁজে পাওয়া যায়।') },
        { p: l('The non-functional requirements shape the architecture more than the features do. Search is intensely read-heavy and latency-sensitive: a search page should return in a few hundred milliseconds, and each autocomplete keystroke must respond in well under 100 ms or it feels laggy. It must stay available, scale to billions of documents, and keep serving even while the index is being rebuilt in the background.', 'নন-ফাংশনাল প্রয়োজন ফিচারের চেয়ে বেশি আর্কিটেকচার ঠিক করে। Search প্রবলভাবে read-heavy ও latency-sensitive: একটি search পেজ কয়েকশো মিলিসেকেন্ডে ফেরা উচিত, আর প্রতিটি autocomplete keystroke ১০০ ms-এর অনেক নিচে সাড়া দিতে হবে নইলে ধীর মনে হয়। একে available থাকতে হবে, শত কোটি ডকুমেন্টে scale করতে হবে, এবং background-এ index পুনর্নির্মাণের সময়ও পরিবেশন চালিয়ে যেতে হবে।') },
        { note: l('The key insight: search separates the source-of-truth writes (your product or document database) from the read-optimized inverted index, ranking signals, suggestion structures, and freshness pipeline. Like a library catalog, it transforms book contents into terms, shelves, and popularity signals — you never scan every book to answer a query.', 'মূল অন্তর্দৃষ্টি: search সোর্স-অফ-ট্রুথ write (আপনার প্রোডাক্ট বা ডকুমেন্ট ডেটাবেস)-কে read-optimized inverted index, ranking সংকেত, suggestion কাঠামো ও freshness pipeline থেকে আলাদা করে। লাইব্রেরি ক্যাটালগের মতো এটি বইয়ের বিষয়কে term, তাক ও জনপ্রিয়তার সংকেতে রূপ দেয়—উত্তর দিতে আপনি কখনো প্রতিটি বই স্ক্যান করেন না।'), kind: 'tip' },
      ],
    },
    {
      h: l('Estimation: sizing the corpus and query load', 'আন্দাজ: corpus ও query load-এর মাপ'),
      blocks: [
        { p: l('Rough numbers decide whether one machine can hold the index or you must shard across hundreds. Estimate the corpus size, then the search QPS, then the much larger autocomplete QPS (one search is many keystrokes).', 'মোটামুটি সংখ্যা ঠিক করে এক মেশিনে index ধরবে নাকি শত মেশিনে shard করতে হবে। corpus-এর মাপ আন্দাজ করুন, তারপর search QPS, তারপর অনেক বড় autocomplete QPS (একটি search মানে অনেক keystroke)।') },
        { code: `Corpus
  documents            = 1 billion = 1 × 10^9
  avg text per doc     = 1 KB
  raw text             = 1e9 × 1e3 = 1 × 10^12 B = 1 TB
  inverted index       ~ 30-50% of raw text ≈ 300-500 GB
  (too big for one node → must shard)

Search query load
  daily active users   = 100 M = 1 × 10^8
  searches / user / day= 5
  searches / day       = 5e8
  avg QPS              = 5e8 / 1e5 (secs/day) = 5,000 QPS
  peak QPS             = avg × 3 ≈ 15,000 QPS

Autocomplete load (the real firehose)
  keystrokes / search  ≈ 20 (one request each)
  typeahead / day      = 5e8 × 20 = 1 × 10^10
  avg QPS              = 1e10 / 1e5 = 100,000 QPS
  peak QPS             = 300,000+ QPS`, caption: l('Autocomplete generates ~20× the traffic of full search, so it needs its own cheap, in-memory path — never a database scan per keystroke.', 'Autocomplete পূর্ণ search-এর প্রায় ২০× ট্রাফিক তৈরি করে, তাই এর নিজস্ব সস্তা, in-memory পথ দরকার—প্রতি keystroke-এ কখনো database scan নয়।') },
      ],
    },
    {
      h: l('High-level design', 'হাই-লেভেল ডিজাইন'),
      blocks: [
        { p: l('Split the system into a write/indexing path and a read/serving path. Writes never touch the serving index directly; they flow through an asynchronous pipeline so indexing load can never stall live queries.', 'সিস্টেমকে একটি write/indexing পথ ও একটি read/serving পথে ভাগ করুন। Write কখনো serving index সরাসরি ছোঁয় না; তারা একটি asynchronous pipeline দিয়ে যায় যাতে indexing load কখনো live query আটকাতে না পারে।') },
        { steps: [
          l('Write path — an item is created or edited in the source-of-truth database, which emits a change event to a stream (e.g. Kafka).', 'Write পথ—একটি আইটেম সোর্স-অফ-ট্রুথ ডেটাবেসে তৈরি বা এডিট হয়, যা একটি stream-এ (যেমন Kafka) change event পাঠায়।'),
          l('Indexing pipeline — workers consume the stream, tokenize and normalize the text (lowercase, stemming, remove stop words), and update the inverted index shards asynchronously.', 'Indexing pipeline—worker-রা stream পড়ে, text tokenize ও normalize করে (lowercase, stemming, stop word বাদ), এবং asynchronously inverted index shard আপডেট করে।'),
          l('Query path — a search request hits a query service that parses the query, fans out to all index shards (scatter), and each shard returns its top candidates.', 'Query পথ—একটি search request একটি query service-এ পৌঁছায় যা query parse করে, সব index shard-এ fan out করে (scatter), আর প্রতিটি shard তার top candidate ফেরত দেয়।'),
          l('Rank and merge — a ranking layer scores candidates (BM25 plus signals like popularity and recency), the coordinator merges the shard results (gather), and returns the top-k.', 'Rank ও merge—একটি ranking স্তর candidate-দের score করে (BM25 আর popularity ও recency-র মতো সংকেত), coordinator shard-ফল একত্র করে (gather), ও top-k ফেরত দেয়।'),
          l('Autocomplete path — served from a separate in-memory structure (a trie or precomputed top-queries table), never from the main index or the database.', 'Autocomplete পথ—একটি আলাদা in-memory কাঠামো (trie বা precomputed top-queries টেবিল) থেকে পরিবেশিত, কখনো main index বা ডেটাবেস থেকে নয়।'),
          l('Cache — a query cache in front of serving returns instant results for popular repeated queries.', 'Cache—serving-এর সামনে একটি query cache জনপ্রিয় পুনরাবৃত্ত query-র জন্য তাৎক্ষণিক ফল দেয়।'),
        ] },
      ],
    },
    {
      h: l('Deep dive: the inverted index and autocomplete', 'গভীরে: inverted index ও autocomplete'),
      blocks: [
        { p: l('The heart of any search engine is the inverted index. A normal ("forward") index maps a document to the words it contains; an inverted index flips that around and maps each word (term) to the list of documents that contain it — called a posting list. To answer "red running shoes", you fetch the posting lists for red, running, and shoes and intersect them, instead of scanning a billion documents.', 'যেকোনো search engine-এর হৃদয় হলো inverted index। একটি সাধারণ ("forward") index একটি document-কে তার শব্দগুলোয় map করে; inverted index তা উল্টে প্রতিটি শব্দ (term)-কে সেই document-তালিকায় map করে যারা এটি ধারণ করে—একে posting list বলে। "red running shoes"-এর উত্তর দিতে আপনি red, running ও shoes-এর posting list এনে intersect করেন, শত কোটি document scan করার বদলে।') },
        { code: `Inverted index (term → posting list of doc ids)
  "shoes"   → [12, 87, 204, 5567, ...]
  "running" → [87, 204, 990, ...]
  "red"     → [3, 87, 204, ...]

Query "red running shoes"
  intersect the three posting lists → {87, 204, ...}
  score each survivor with BM25 + popularity + recency
  return the top 10`, caption: l('Posting lists are sorted by doc id so intersection is a fast merge; scores decide the final order.', 'Posting list doc id-তে sorted, তাই intersection একটি দ্রুত merge; score চূড়ান্ত ক্রম ঠিক করে।') },
        { p: l('Because the index is too large for one machine, you shard it. There are two ways. Document sharding (the common choice) puts a subset of documents on each shard, and every shard holds the full term dictionary for its own docs; a query is sent to all shards and results are merged. Term sharding splits the term dictionary itself across shards, so a query only touches the shards that own its terms — but multi-term queries need cross-shard joins and hot terms create hotspots. Most engines use document sharding with replicas for both scale and availability.', 'index এক মেশিনে বড় বলে আপনি একে shard করেন। দুটি উপায়। Document sharding (সাধারণ পছন্দ) প্রতিটি shard-এ document-এর একটি উপসেট রাখে, ও প্রতিটি shard নিজের doc-এর জন্য পূর্ণ term dictionary রাখে; query সব shard-এ যায় ও ফল merge হয়। Term sharding term dictionary-কেই shard-জুড়ে ভাগ করে, তাই query শুধু সেই shard ছোঁয় যারা তার term-এর মালিক—কিন্তু multi-term query-তে cross-shard join লাগে ও hot term hotspot বানায়। বেশিরভাগ engine scale ও availability-দুটোর জন্য replica-সহ document sharding ব্যবহার করে।') },
        { p: l('Autocomplete is a different problem and deserves its own structure. Never run a wildcard LIKE "abc%" scan on the database per keystroke — at 100k+ QPS that will melt any database. Instead, precompute. A trie (prefix tree) stores completions keyed by prefix, and at each node you cache the top-N most popular completions weighted by query frequency. Typing "lap" walks to that node and instantly returns "laptop, laptop stand, lapland". Because popular queries dominate, a small precomputed table in memory (refreshed hourly from query logs) answers the vast majority of keystrokes.', 'Autocomplete ভিন্ন সমস্যা ও নিজস্ব কাঠামোর যোগ্য। প্রতি keystroke-এ ডেটাবেসে wildcard LIKE "abc%" scan কখনো চালাবেন না—১ লক্ষ+ QPS-এ তা যেকোনো ডেটাবেস গলিয়ে দেবে। বরং precompute করুন। একটি trie (prefix tree) prefix দিয়ে key করা completion রাখে, আর প্রতিটি node-এ আপনি query frequency-তে weighted top-N জনপ্রিয় completion cache করেন। "lap" টাইপ করলে সেই node-এ পৌঁছে তাৎক্ষণিক "laptop, laptop stand, lapland" ফেরে। জনপ্রিয় query প্রাধান্য পায় বলে memory-তে একটি ছোট precomputed টেবিল (query log থেকে ঘণ্টায় refresh) বেশিরভাগ keystroke-এর উত্তর দেয়।') },
        { p: l('Freshness comes from indexing changes asynchronously. New writes land in a small, fast "real-time" segment that is merged into the large main index periodically. This is why a just-posted item may take seconds to appear — a deliberate trade of instant visibility for stable, fast serving.', 'Freshness আসে change asynchronously index করা থেকে। নতুন write একটি ছোট, দ্রুত "real-time" segment-এ পড়ে যা পর্যায়ক্রমে বড় main index-এ merge হয়। এ কারণেই সদ্য-পোস্ট করা আইটেম দেখাতে কয়েক সেকেন্ড লাগতে পারে—তাৎক্ষণিক দৃশ্যমানতাকে স্থিতিশীল, দ্রুত serving-এর জন্য ইচ্ছাকৃতভাবে বিনিময়।') },
      ],
    },
    {
      h: l('Scaling and trade-offs', 'Scaling ও trade-off'),
      blocks: [
        { table: {
          head: [l('Decision', 'সিদ্ধান্ত'), l('Option A', 'বিকল্প A'), l('Option B', 'বিকল্প B')],
          rows: [
            [l('Sharding', 'Sharding'), l('Document sharding — simple, scales reads, query hits all shards.', 'Document sharding—সরল, read scale করে, query সব shard-এ যায়।'), l('Term sharding — less fan-out per query, but hard multi-term joins and hot-term skew.', 'Term sharding—query-প্রতি কম fan-out, তবে কঠিন multi-term join ও hot-term skew।')],
            [l('Freshness', 'Freshness'), l('Frequent re-indexing — better relevance for new content.', 'ঘন re-indexing—নতুন কন্টেন্টে ভালো relevance।'), l('Batch indexing — cheaper compute, stabler serving, staler results.', 'Batch indexing—সস্তা compute, স্থিতিশীল serving, পুরনো ফল।')],
            [l('Ranking', 'Ranking'), l('BM25 only — fast, cheap, decent.', 'শুধু BM25—দ্রুত, সস্তা, মোটামুটি।'), l('ML re-rank on top candidates — better relevance, more latency and cost.', 'top candidate-এ ML re-rank—ভালো relevance, বেশি latency ও খরচ।')],
            [l('Availability', 'Availability'), l('Add replicas per shard — survives node loss, serves more QPS.', 'shard-প্রতি replica—node হারালেও টেকে, বেশি QPS দেয়।'), l('Single copy — cheaper storage, but any node loss drops results.', 'একটি কপি—সস্তা storage, তবে node হারালে ফল কমে।')],
          ],
        } },
        { p: l('The central tension, from the topic itself: fresh indexing improves relevance but consumes compute and can destabilize serving. Choose your indexing cadence for the product — a news search needs seconds of freshness; a documentation search can rebuild nightly.', 'মূল টানাপোড়েন, topic থেকেই: দ্রুত indexing relevance বাড়ায় তবে compute খরচ করে ও serving অস্থিতিশীল করতে পারে। পণ্য অনুযায়ী indexing-এর ছন্দ বাছুন—news search-এ সেকেন্ডের freshness দরকার; documentation search রাতে একবার rebuild করতে পারে।') },
      ],
    },
    {
      h: l('Common mistakes', 'সাধারণ ভুল'),
      blocks: [
        { list: [
          l('Running a wildcard database scan (LIKE "abc%") for every autocomplete keystroke — this is the classic failure; use a trie or precomputed top-queries in memory instead.', 'প্রতিটি autocomplete keystroke-এ wildcard database scan (LIKE "abc%") চালানো—এটি ক্লাসিক ব্যর্থতা; বদলে memory-তে trie বা precomputed top-queries ব্যবহার করুন।'),
          l('Indexing synchronously inside the write request, so a slow index rebuild blocks or crashes the app that just wanted to save a record.', 'write request-এর ভেতরে synchronously index করা, যাতে একটি ধীর index rebuild সেই অ্যাপকে আটকায় বা ভাঙে যে শুধু একটি record সেভ করতে চেয়েছিল।'),
          l('Treating search as "just a SQL LIKE query" and scanning the source database — it will not scale, rank, or handle typos and stemming.', 'search-কে "শুধু একটি SQL LIKE query" ধরে source database scan করা—এটি scale, rank, বা typo ও stemming সামলাবে না।'),
          l('Ignoring ranking entirely and returning results in arbitrary order — relevance, not just matching, is what makes search useful.', 'ranking পুরো উপেক্ষা করে যেকোনো ক্রমে ফল দেওয়া—শুধু matching নয়, relevance-ই search-কে কাজের করে।'),
          l('One index, no replicas — a single node failure then takes down search for everyone and blocks rebuilds.', 'একটি index, কোনো replica নেই—তখন একটি node ব্যর্থতা সবার জন্য search নামিয়ে দেয় ও rebuild আটকায়।'),
        ] },
      ],
    },
    {
      h: l('Summary', 'সারসংক্ষেপ'),
      blocks: [
        { list: [
          l('Search separates source-of-truth writes from a read-optimized inverted index, ranking, suggestions, and a freshness pipeline.', 'Search সোর্স-অফ-ট্রুথ write-কে read-optimized inverted index, ranking, suggestion ও freshness pipeline থেকে আলাদা করে।'),
          l('The inverted index maps term → posting list; queries intersect posting lists and rank the survivors instead of scanning documents.', 'inverted index term → posting list map করে; query posting list intersect করে ও বেঁচে থাকাদের rank করে, document scan না করে।'),
          l('Shard by document, replicate for availability, and index changes asynchronously so writes never stall live queries.', 'document দিয়ে shard, availability-র জন্য replicate, ও change asynchronously index করুন যাতে write কখনো live query আটকায় না।'),
          l('Serve autocomplete from a trie or precomputed top-queries in memory — never a per-keystroke database scan.', 'autocomplete memory-তে trie বা precomputed top-queries থেকে দিন—কখনো প্রতি-keystroke database scan নয়।'),
        ] },
      ],
    },
  ],

  // ── Design cloud file storage & sync (object storage) ─────────────────────
  'object-storage': [
    {
      h: l('Requirements: what file storage & sync must do', 'প্রয়োজন: ফাইল storage ও sync-কে যা করতে হবে'),
      blocks: [
        { p: l('A cloud storage and sync product (think Dropbox or Google Drive on top of an object store like S3) must let users upload and download files, sync them across all their devices, keep version history, share files with permissions, and never lose data. The features look simple; the hard part is doing all of it durably, cheaply, and with minimal bandwidth.', 'একটি cloud storage ও sync পণ্য (S3-এর মতো object store-এর ওপর Dropbox বা Google Drive ভাবুন) ব্যবহারকারীকে ফাইল upload/download, সব ডিভাইসে sync, version history রাখা, permission-সহ share, ও ডেটা কখনো না হারানো—এসব করতে দিতে হবে। ফিচার সরল দেখায়; কঠিন অংশ হলো এসব টেকসইভাবে, সস্তায় ও ন্যূনতম bandwidth-এ করা।') },
        { p: l('The non-functional requirements dominate. Durability is paramount — cloud storage targets "eleven nines" (99.999999999%), meaning you would statistically lose one object in many billions per year. It must be highly available, handle very large files, and be bandwidth-efficient — re-uploading a 2 GB file because one paragraph changed is unacceptable.', 'নন-ফাংশনাল প্রয়োজন প্রাধান্য পায়। Durability সর্বোচ্চ—cloud storage "এগারো নাইন" (৯৯.৯৯৯৯৯৯৯৯৯%) লক্ষ্য করে, মানে বছরে শত কোটির মধ্যে একটি object পরিসংখ্যানগতভাবে হারাবেন। একে highly available হতে হবে, খুব বড় ফাইল সামলাতে হবে, ও bandwidth-efficient হতে হবে—এক প্যারা বদলানোয় ২ GB ফাইল আবার upload করা অগ্রহণযোগ্য।') },
        { note: l('The key insight: file sync separates immutable chunks (stored as blobs in the object store) from mutable metadata — the file name, version, permissions, and the ordered list of chunk hashes. Like a moving company that labels boxes, keeps an inventory, and only re-ships the boxes that changed, you only ever move the chunks that differ.', 'মূল অন্তর্দৃষ্টি: file sync অপরিবর্তনীয় chunk (object store-এ blob হিসেবে রাখা)-কে পরিবর্তনীয় metadata—ফাইলের নাম, version, permission ও chunk hash-এর ক্রমিক তালিকা—থেকে আলাদা করে। বাক্সে লেবেল দিয়ে, তালিকা রেখে ও শুধু বদলানো বাক্স আবার পাঠানো মুভিং কোম্পানির মতো আপনি শুধু আলাদা chunk-ই সরান।'), kind: 'tip' },
      ],
    },
    {
      h: l('Estimation: storage and bandwidth', 'আন্দাজ: storage ও bandwidth'),
      blocks: [
        { p: l('Storage is the dominant cost, and it is multiplied by the replication or erasure-coding overhead needed for durability. Estimate raw user data, apply a deduplication saving, then multiply by the durability factor.', 'Storage প্রধান খরচ, আর durability-র জন্য দরকারি replication বা erasure-coding overhead দিয়ে তা গুণ হয়। কাঁচা user ডেটা আন্দাজ করুন, একটি deduplication সাশ্রয় প্রয়োগ করুন, তারপর durability factor দিয়ে গুণ করুন।') },
        { code: `Users and data
  users                = 100 M = 1 × 10^8
  avg stored / user    = 10 GB
  raw user data        = 1e8 × 10 GB = 1 × 10^9 GB = 1 EB (exabyte)

Dedup + durability
  dedup saves          ~ 30% (shared files, versions)
  after dedup          ≈ 0.7 EB
  replication factor   = 3 (three copies)
  physical storage     = 0.7 EB × 3 ≈ 2.1 EB
  (erasure coding ~1.5× would need only ≈ 1.05 EB)

Upload bandwidth
  active uploaders/day = 10 M
  avg upload / user    = 50 MB/day
  bytes / day          = 1e7 × 50 MB = 5 × 10^14 B = 500 TB/day
  avg throughput       = 5e14 / 1e5 ≈ 5 GB/s (peak several × higher)`, caption: l('Replication triples storage; erasure coding cuts overhead to ~1.5× at the cost of more CPU on reads and repairs. That single choice moves petabytes of cost.', 'Replication storage তিন গুণ করে; erasure coding overhead ~১.৫×-এ নামায়, বিনিময়ে read ও repair-এ বেশি CPU। এই একটি পছন্দ পেটাবাইট খরচ সরায়।') },
      ],
    },
    {
      h: l('High-level design', 'হাই-লেভেল ডিজাইন'),
      blocks: [
        { p: l('Two separate services do the work: a blob/object store that keeps the actual file bytes, and a metadata service that tracks what files exist, their versions, and which chunks make them up. The client is smart — it chunks and hashes locally so the network only carries new data.', 'দুটি আলাদা service কাজ করে: একটি blob/object store যা আসল ফাইল বাইট রাখে, ও একটি metadata service যা কোন ফাইল আছে, তাদের version ও কোন chunk দিয়ে গঠিত তা ট্র্যাক করে। client স্মার্ট—এটি locally chunk ও hash করে যাতে network শুধু নতুন ডেটা বহন করে।') },
        { steps: [
          l('Chunk and hash — the client splits the file into fixed or content-defined chunks (e.g. ~4 MB) and computes a hash of each chunk.', 'Chunk ও hash—client ফাইলকে fixed বা content-defined chunk-এ (যেমন ~৪ MB) ভাগ করে ও প্রতিটির hash বের করে।'),
          l('Ask what is new — it sends the chunk hashes to the metadata service, which replies which chunks already exist (deduplication) and which are new.', 'কী নতুন জিজ্ঞাসা—এটি chunk hash metadata service-এ পাঠায়, যা জানায় কোন chunk আগেই আছে (deduplication) ও কোনগুলো নতুন।'),
          l('Upload only new chunks — the client uploads just the missing chunks directly to the blob store (often via presigned URLs), skipping the app servers.', 'শুধু নতুন chunk upload—client শুধু অনুপস্থিত chunk সরাসরি blob store-এ upload করে (প্রায়ই presigned URL দিয়ে), app server এড়িয়ে।'),
          l('Commit metadata atomically — once all chunks are stored, it commits a new file version (the ordered chunk list) in one atomic metadata write.', 'Metadata atomically commit—সব chunk রাখা হলে এটি একটি atomic metadata write-এ নতুন file version (ক্রমিক chunk তালিকা) commit করে।'),
          l('Notify other devices — a change-notification stream tells the user’s other devices a new version exists; they pull only the chunks they are missing.', 'অন্য ডিভাইস notify—একটি change-notification stream ব্যবহারকারীর অন্য ডিভাইসকে জানায় নতুন version আছে; তারা শুধু অনুপস্থিত chunk টানে।'),
          l('Download — a device fetches the chunk list from metadata, pulls chunks from the blob store (CDN-cached for popular files), and reassembles the file.', 'Download—একটি ডিভাইস metadata থেকে chunk তালিকা আনে, blob store থেকে chunk টানে (জনপ্রিয় ফাইলে CDN-cached), ও ফাইল পুনর্গঠন করে।'),
        ] },
      ],
    },
    {
      h: l('Deep dive: how object storage stores and replicates blobs', 'গভীরে: object storage কীভাবে blob রাখে ও replicate করে'),
      blocks: [
        { p: l('A blob (binary large object) is an immutable piece of bytes — here, one chunk — identified by a key, usually the content hash itself. Immutability is the superpower: because a chunk never changes, its hash is a permanent address, identical chunks are stored only once (dedup), and any copy can be cached forever without worrying about staleness.', 'একটি blob (binary large object) হলো অপরিবর্তনীয় কিছু বাইট—এখানে একটি chunk—একটি key দিয়ে চিহ্নিত, সাধারণত content hash নিজেই। অপরিবর্তনীয়তা মহাশক্তি: chunk কখনো বদলায় না বলে তার hash একটি স্থায়ী ঠিকানা, অভিন্ন chunk একবারই রাখা হয় (dedup), ও যেকোনো কপি staleness-এর ভয় ছাড়াই চিরকাল cache করা যায়।') },
        { p: l('Blobs are spread across a large fleet of storage nodes. To decide which nodes hold a given chunk, the system uses a partition map or consistent hashing over the chunk key — this spreads load evenly and lets you add nodes without reshuffling everything. Durability comes from redundancy, and there are two schemes:', 'Blob বড় storage node-এর একটি বহরে ছড়ানো। কোন node একটি নির্দিষ্ট chunk রাখবে তা ঠিক করতে সিস্টেম chunk key-এর ওপর একটি partition map বা consistent hashing ব্যবহার করে—এটি load সমানভাবে ছড়ায় ও সব কিছু নতুন করে না সাজিয়ে node যোগ করতে দেয়। Durability আসে redundancy থেকে, ও দুটি স্কিম আছে:') },
        { list: [
          l('Replication — keep N full copies (typically 3) on different nodes, racks, and availability zones. A write is acknowledged once a quorum of copies is durably stored; simple and fast to read, but 3× the storage.', 'Replication—ভিন্ন node, rack ও availability zone-এ N পূর্ণ কপি (সাধারণত ৩) রাখা। একটি write তখনই acknowledged যখন কপির একটি quorum টেকসইভাবে রাখা হয়; সরল ও পড়তে দ্রুত, তবে ৩× storage।'),
          l('Erasure coding — split each blob into k data fragments plus m parity fragments (e.g. 6+3); any k of the k+m fragments can rebuild the blob. This survives m failures at only ~1.5× overhead instead of 3×, but reads and repairs cost more CPU and network.', 'Erasure coding—প্রতিটি blob-কে k data fragment ও m parity fragment-এ ভাগ (যেমন ৬+৩); k+m-এর যেকোনো k fragment দিয়ে blob পুনর্গঠন। এটি ৩×-এর বদলে ~১.৫× overhead-এ m ব্যর্থতা টেকে, তবে read ও repair-এ বেশি CPU ও network লাগে।'),
        ] },
        { p: l('A background repair process constantly scrubs the fleet: it detects a lost or corrupted replica/fragment (via checksums), and rebuilds it onto a healthy node to restore the target redundancy. This self-healing is what turns cheap, failure-prone disks into eleven-nines durability. Metadata — the small, mutable record of which chunks form which file version — lives in a separate, strongly-consistent database (often replicated and sharded by user or file id), because it is the source of truth you must never corrupt.', 'একটি background repair প্রক্রিয়া অবিরত বহর scrub করে: এটি একটি হারানো বা নষ্ট replica/fragment শনাক্ত করে (checksum দিয়ে), ও target redundancy ফেরাতে একটি সুস্থ node-এ তা পুনর্নির্মাণ করে। এই self-healing সস্তা, ব্যর্থতা-প্রবণ disk-কে এগারো-নাইন durability-তে পরিণত করে। Metadata—কোন chunk কোন file version গঠন করে তার ছোট, পরিবর্তনীয় record—একটি আলাদা, strongly-consistent ডেটাবেসে (প্রায়ই user বা file id-তে replicated ও sharded) থাকে, কারণ এটি সেই সোর্স-অফ-ট্রুথ যা কখনো নষ্ট করা যাবে না।') },
        { p: l('Concurrent edits are the classic sync hazard. If two devices edit offline and both sync, you must not silently overwrite one. Use version vectors (or per-file version numbers) to detect that two changes diverged from a common ancestor, then either merge or keep both as a conflict copy ("file (conflicted copy from laptop)"). Since chunks are immutable and content-addressed, no chunk is ever destroyed by a conflict — only the metadata pointer needs resolving.', 'Concurrent edit ক্লাসিক sync বিপদ। দুটি ডিভাইস offline-এ edit করে দুটোই sync করলে আপনি একটিকে নীরবে overwrite করতে পারবেন না। version vector (বা per-file version number) ব্যবহার করে শনাক্ত করুন দুটি change একটি সাধারণ পূর্বপুরুষ থেকে আলাদা হয়েছে, তারপর merge করুন বা দুটোই conflict copy হিসেবে রাখুন ("file (conflicted copy from laptop)")। chunk অপরিবর্তনীয় ও content-addressed বলে conflict-এ কোনো chunk কখনো ধ্বংস হয় না—শুধু metadata pointer সমাধান দরকার।') },
      ],
    },
    {
      h: l('Scaling and trade-offs', 'Scaling ও trade-off'),
      blocks: [
        { table: {
          head: [l('Decision', 'সিদ্ধান্ত'), l('Choose this', 'এটি বাছুন'), l('When / cost', 'কখন / খরচ')],
          rows: [
            [l('Redundancy', 'Redundancy'), l('Replication (3×)', 'Replication (৩×)'), l('Simple, fast reads; 3× storage cost — good for hot data.', 'সরল, দ্রুত read; ৩× storage খরচ—hot ডেটার জন্য ভালো।')],
            [l('Redundancy', 'Redundancy'), l('Erasure coding (~1.5×)', 'Erasure coding (~১.৫×)'), l('Cheaper storage; more CPU/network on read and repair — good for cold data.', 'সস্তা storage; read ও repair-এ বেশি CPU/network—cold ডেটার জন্য ভালো।')],
            [l('Chunk size', 'Chunk size'), l('Large chunks', 'বড় chunk'), l('Less metadata and overhead, but poorer dedup and more re-upload on small edits.', 'কম metadata ও overhead, তবে দুর্বল dedup ও ছোট edit-এ বেশি re-upload।')],
            [l('Chunk size', 'Chunk size'), l('Small chunks', 'ছোট chunk'), l('Better dedup and delta sync, but much more metadata and assembly work.', 'ভালো dedup ও delta sync, তবে অনেক বেশি metadata ও assembly কাজ।')],
            [l('Metadata', 'Metadata'), l('Strong consistency', 'Strong consistency'), l('No lost updates or corruption, at some write latency — required for the source of truth.', 'কোনো lost update বা corruption নেই, কিছু write latency-তে—সোর্স-অফ-ট্রুথের জন্য আবশ্যক।')],
          ],
        } },
        { p: l('The core trade-off from the topic: chunking saves bandwidth (you resend only changed chunks) but increases metadata, assembly, and garbage-collection work. When a version is deleted, its chunks may still be referenced by other versions or users, so you need reference counting and a background GC to reclaim truly-orphaned chunks safely.', 'topic থেকে মূল trade-off: chunking bandwidth বাঁচায় (শুধু বদলানো chunk পাঠান) তবে metadata, assembly ও garbage-collection কাজ বাড়ায়। একটি version মুছলে তার chunk অন্য version বা user এখনো reference করতে পারে, তাই সত্যিকারের-অনাথ chunk নিরাপদে ফেরাতে reference counting ও একটি background GC লাগে।') },
      ],
    },
    {
      h: l('Common mistakes', 'সাধারণ ভুল'),
      blocks: [
        { list: [
          l('Overwriting concurrent edits silently without version vectors or conflict copies — the single most damaging sync bug, because it loses user data.', 'version vector বা conflict copy ছাড়া concurrent edit নীরবে overwrite করা—সবচেয়ে ক্ষতিকর sync বাগ, কারণ এটি user ডেটা হারায়।'),
          l('Routing file bytes through the application servers instead of letting clients upload chunks directly to the blob store — it wastes bandwidth and turns app servers into a bottleneck.', 'client-কে সরাসরি blob store-এ chunk upload করতে না দিয়ে application server-এর মধ্য দিয়ে ফাইল বাইট পাঠানো—এটি bandwidth নষ্ট করে ও app server-কে bottleneck বানায়।'),
          l('Re-uploading whole files on every edit — without chunking and dedup, one changed byte costs a full transfer.', 'প্রতিটি edit-এ পুরো ফাইল আবার upload—chunking ও dedup ছাড়া একটি বদলানো বাইট একটি পূর্ণ transfer খরচ করে।'),
          l('Storing metadata and blobs in the same store — metadata needs strong consistency and fast small reads; blobs need cheap, durable, high-throughput bytes. Different jobs, different stores.', 'metadata ও blob এক store-এ রাখা—metadata-র strong consistency ও দ্রুত ছোট read দরকার; blob-এর সস্তা, টেকসই, high-throughput বাইট দরকার। ভিন্ন কাজ, ভিন্ন store।'),
          l('Deleting a chunk the moment one file references it no longer exists, without reference counting — you can corrupt other files that share the chunk.', 'reference counting ছাড়া একটি ফাইল আর reference না করার সঙ্গে সঙ্গে chunk মুছে ফেলা—এটি chunk-ভাগ করা অন্য ফাইল নষ্ট করতে পারে।'),
        ] },
      ],
    },
    {
      h: l('Summary', 'সারসংক্ষেপ'),
      blocks: [
        { list: [
          l('File sync separates immutable, content-addressed chunks (blobs) from mutable metadata (version, permissions, chunk list).', 'File sync অপরিবর্তনীয়, content-addressed chunk (blob)-কে পরিবর্তনীয় metadata (version, permission, chunk তালিকা) থেকে আলাদা করে।'),
          l('Clients chunk and hash locally, upload only new chunks directly to the blob store, then commit metadata atomically.', 'client locally chunk ও hash করে, শুধু নতুন chunk সরাসরি blob store-এ upload করে, তারপর metadata atomically commit করে।'),
          l('Object storage spreads blobs across nodes and achieves durability via replication (3×) or erasure coding (~1.5×), with background repair self-healing lost copies.', 'object storage blob-কে node-জুড়ে ছড়ায় ও replication (৩×) বা erasure coding (~১.৫×) দিয়ে durability পায়, background repair হারানো কপি self-heal করে।'),
          l('Resolve concurrent edits with version vectors and conflict copies — never overwrite silently — and GC only truly-orphaned chunks.', 'concurrent edit version vector ও conflict copy দিয়ে সমাধান করুন—কখনো নীরবে overwrite নয়—আর শুধু সত্যিকারের-অনাথ chunk GC করুন।'),
        ] },
      ],
    },
  ],

  // ── Design a video streaming platform ─────────────────────────────────────
  'video-streaming': [
    {
      h: l('Requirements: what a video platform must do', 'প্রয়োজন: একটি ভিডিও প্ল্যাটফর্মকে যা করতে হবে'),
      blocks: [
        { p: l('A video streaming platform (YouTube- or Netflix-style) must let creators upload video, process it into playable formats, and stream it smoothly to millions of viewers on everything from a slow phone to a 4K TV. Functionally that means upload, transcoding into multiple qualities, adaptive playback, seeking, and thumbnails; the viewer should start watching within a second or two and never buffer if their connection is decent.', 'একটি ভিডিও স্ট্রিমিং প্ল্যাটফর্ম (YouTube- বা Netflix-ধাঁচের) নির্মাতাকে ভিডিও upload করতে, playable ফরম্যাটে প্রক্রিয়া করতে, ও ধীর ফোন থেকে ৪K TV—সব কিছুতে লক্ষ লক্ষ দর্শকের কাছে মসৃণভাবে stream করতে দিতে হবে। ফাংশনালি মানে upload, একাধিক মানে transcoding, adaptive playback, seek ও thumbnail; দর্শক এক-দুই সেকেন্ডে দেখা শুরু করবে ও connection ভালো হলে কখনো buffer করবে না।') },
        { p: l('The non-functional side is brutal: read (watch) traffic vastly outweighs writes (uploads), delivery must be global with low start-up latency, and storage plus egress bandwidth are enormous cost centres. The system must ingest a video once and serve it a billion times.', 'নন-ফাংশনাল দিক কঠিন: read (watch) ট্রাফিক write (upload)-কে বহুগুণে ছাড়ায়, delivery কম start-up latency-তে global হতে হবে, ও storage আর egress bandwidth বিশাল খরচকেন্দ্র। সিস্টেমকে একবার ভিডিও ingest করে শত কোটিবার পরিবেশন করতে হবে।') },
        { note: l('The key insight: video platforms ingest once, transcode many renditions asynchronously, and deliver adaptive segments through a CDN. Like a kitchen that prepares several portion sizes in advance while neighbourhood counters hand out the closest match, the heavy work is done offline and the edge serves the right-sized piece.', 'মূল অন্তর্দৃষ্টি: ভিডিও প্ল্যাটফর্ম একবার ingest করে, asynchronously অনেক rendition বানায়, ও CDN দিয়ে adaptive segment দেয়। আগে থেকে নানা আকারের পরিবেশন বানানো রান্নাঘর আর উপযুক্তটি দেওয়া এলাকার কাউন্টারের মতো, ভারী কাজ offline হয় ও edge সঠিক-আকারের টুকরো দেয়।'), kind: 'tip' },
      ],
    },
    {
      h: l('Estimation: storage and delivery bandwidth', 'আন্দাজ: storage ও delivery bandwidth'),
      blocks: [
        { p: l('Two numbers dominate: storage (multiplied by the number of renditions you keep) and peak delivery bandwidth (concurrent viewers times bitrate), which is what makes a CDN mandatory.', 'দুটি সংখ্যা প্রাধান্য পায়: storage (আপনি যত rendition রাখেন তা দিয়ে গুণ) ও peak delivery bandwidth (concurrent দর্শক গুণ bitrate), যা একটি CDN আবশ্যক করে।') },
        { code: `Uploads and storage
  uploads / day        = 500,000
  avg length           = 10 min
  source bitrate       = 10 Mbps
  source size / video  = 10 Mbps × 600 s / 8 ≈ 750 MB
  source / day         = 5e5 × 750 MB ≈ 375 TB/day source
  renditions kept      = ~6 (240p…4K) ≈ 1.5× source total
  stored / day         ≈ 560 TB/day → ~200 PB/year

Peak delivery (why a CDN is non-negotiable)
  concurrent viewers   = 1 M = 1 × 10^6
  avg stream bitrate   = 5 Mbps
  peak egress          = 1e6 × 5 Mbps = 5 × 10^12 bps = 5 Tbps
  (a single origin cannot push 5 Tbps → CDN edges must)`, caption: l('5 Tbps of egress is impossible from one origin; CDN edge caches absorb almost all of it, and the origin only serves cache misses.', 'এক origin থেকে ৫ Tbps egress অসম্ভব; CDN edge cache প্রায় সবটা শুষে নেয়, ও origin শুধু cache miss পরিবেশন করে।') },
      ],
    },
    {
      h: l('High-level design', 'হাই-লেভেল ডিজাইন'),
      blocks: [
        { p: l('Separate the upload/processing pipeline (write, done once, asynchronous) from the delivery pipeline (read, done constantly, cached at the edge). The upload request must return immediately; transcoding happens in the background.', 'upload/processing pipeline (write, একবার, asynchronous)-কে delivery pipeline (read, অবিরত, edge-এ cached) থেকে আলাদা করুন। upload request সঙ্গে সঙ্গে ফিরতে হবে; transcoding background-এ হয়।') },
        { steps: [
          l('Upload — the client uploads the source file in parts (multipart upload) directly to a blob store, resumable and parallel, then notifies the API that upload is complete.', 'Upload—client source ফাইল অংশে (multipart upload) সরাসরি blob store-এ upload করে, resumable ও parallel, তারপর API-কে জানায় upload শেষ।'),
          l('Enqueue processing — the API records the video as "processing" and puts a job on a queue; the upload request returns now, not after transcoding.', 'Processing enqueue—API ভিডিওকে "processing" হিসেবে record করে ও একটি queue-তে job রাখে; upload request এখন ফেরে, transcoding-এর পরে নয়।'),
          l('Transcode — a durable workflow of workers splits the source into short segments and encodes each into multiple renditions (240p, 480p, 720p, 1080p, 4K) and codecs.', 'Transcode—worker-দের একটি টেকসই workflow source-কে ছোট segment-এ ভাগ করে ও প্রতিটিকে একাধিক rendition (২৪০p, ৪৮০p, ৭২০p, ১০৮০p, ৪K) ও codec-এ encode করে।'),
          l('Package and store — segments are packaged into HLS/DASH format with a manifest that lists every rendition and segment URL; all of it is written back to the blob store.', 'Package ও store—segment HLS/DASH ফরম্যাটে package হয় একটি manifest-সহ যা প্রতিটি rendition ও segment URL তালিকাভুক্ত করে; সবটা blob store-এ ফেরত লেখা হয়।'),
          l('Publish — the video is marked "ready", and a thumbnail is generated. Segments are now cacheable static files.', 'Publish—ভিডিও "ready" হয় ও একটি thumbnail তৈরি হয়। segment এখন cacheable static ফাইল।'),
          l('Deliver — the player fetches the manifest, then pulls segments from the nearest CDN edge, choosing quality on the fly (adaptive bitrate). The origin blob store is only hit on a CDN miss.', 'Deliver—player manifest আনে, তারপর কাছের CDN edge থেকে segment টানে, চলতি অবস্থায় মান বেছে (adaptive bitrate)। origin blob store শুধু CDN miss-এ আঘাত পায়।'),
        ] },
      ],
    },
    {
      h: l('Deep dive: adaptive bitrate (ABR) and the CDN', 'গভীরে: adaptive bitrate (ABR) ও CDN'),
      blocks: [
        { p: l('The magic of modern streaming is that the video is not one file but many short segments (typically 2–10 seconds each), and each segment is encoded at several bitrates. A manifest file (HLS uses an .m3u8 playlist; DASH uses an .mpd) lists all the available renditions and the URL of every segment in each. The player downloads the manifest first, then downloads the video one segment at a time.', 'আধুনিক streaming-এর জাদু হলো ভিডিও একটি ফাইল নয় বরং অনেক ছোট segment (সাধারণত প্রতিটি ২–১০ সেকেন্ড), আর প্রতিটি segment কয়েকটি bitrate-এ encode করা। একটি manifest ফাইল (HLS ব্যবহার করে .m3u8 playlist; DASH ব্যবহার করে .mpd) সব available rendition ও প্রতিটির প্রতিটি segment-এর URL তালিকাভুক্ত করে। player আগে manifest download করে, তারপর একবারে এক segment ভিডিও download করে।') },
        { code: `HLS master manifest (renditions)
  #EXT-X-STREAM-INF:BANDWIDTH=800000,RESOLUTION=640x360
  360p/index.m3u8
  #EXT-X-STREAM-INF:BANDWIDTH=2500000,RESOLUTION=1280x720
  720p/index.m3u8
  #EXT-X-STREAM-INF:BANDWIDTH=6000000,RESOLUTION=1920x1080
  1080p/index.m3u8

Per-rendition manifest (segments)
  #EXTINF:6.0
  720p/seg_000.ts
  #EXTINF:6.0
  720p/seg_001.ts   ← player fetches these from the CDN`, caption: l('Each rendition is the same video at a different bitrate; the player mixes segments from different renditions as the network changes.', 'প্রতিটি rendition একই ভিডিও ভিন্ন bitrate-এ; network বদলালে player ভিন্ন rendition-এর segment মিশিয়ে নেয়।') },
        { p: l('Adaptive bitrate is the client-side algorithm that picks a rendition per segment. As it plays, the player measures the recent download throughput and how full its buffer is. If bandwidth is high and the buffer is healthy, it requests the next segment from a higher-quality rendition; if the network drops or the buffer runs low, it steps down to a lower bitrate so playback never stalls. This is why a video can start blurry and sharpen after a second, or drop quality on a train — the picture degrades gracefully instead of freezing.', 'Adaptive bitrate হলো client-side অ্যালগরিদম যা প্রতি segment-এ একটি rendition বাছে। play করার সময় player সাম্প্রতিক download throughput ও তার buffer কতটা ভরা তা মাপে। bandwidth বেশি ও buffer সুস্থ হলে এটি পরের segment একটি উচ্চ-মানের rendition থেকে চায়; network পড়লে বা buffer কমলে এটি একটি নিম্ন bitrate-এ নামে যাতে playback কখনো থামে না। এ কারণেই ভিডিও ঝাপসা শুরু হয়ে এক সেকেন্ড পরে পরিষ্কার হতে পারে, বা ট্রেনে মান কমাতে পারে—ছবি জমে না গিয়ে সুন্দরভাবে অবনত হয়।') },
        { p: l('The CDN is what makes global delivery possible and affordable. Because segments are immutable static files with long cache lifetimes, they cache beautifully at edge servers near users. The first viewer in a region causes a cache miss that pulls the segment from the origin (shielded by a mid-tier cache); every viewer after that is served from the edge, so the origin handles a tiny fraction of the 5 Tbps. Popular content stays hot in cache worldwide; the long tail of rarely-watched videos is fetched on demand. Delivery typically runs over HTTP (so it caches on ordinary CDNs), increasingly on HTTP/3 (QUIC over UDP) for faster start-up and better behaviour on lossy mobile networks.', 'CDN global delivery-কে সম্ভব ও সাশ্রয়ী করে। segment দীর্ঘ cache আয়ুর অপরিবর্তনীয় static ফাইল বলে তারা ব্যবহারকারীর কাছের edge server-এ চমৎকার cache হয়। একটি অঞ্চলের প্রথম দর্শক একটি cache miss ঘটায় যা origin থেকে segment টানে (একটি mid-tier cache দিয়ে shielded); তারপরের প্রতিটি দর্শক edge থেকে পরিবেশিত, তাই origin ৫ Tbps-এর একটি ক্ষুদ্র ভগ্নাংশ সামলায়। জনপ্রিয় কন্টেন্ট বিশ্বজুড়ে cache-এ hot থাকে; কম-দেখা ভিডিওর লম্বা লেজ চাহিদামতো আনা হয়। Delivery সাধারণত HTTP-তে চলে (তাই সাধারণ CDN-এ cache হয়), দ্রুত start-up ও lossy mobile network-এ ভালো আচরণের জন্য ক্রমশ HTTP/3 (UDP-র ওপর QUIC)-এ।') },
      ],
    },
    {
      h: l('Scaling and trade-offs', 'Scaling ও trade-off'),
      blocks: [
        { table: {
          head: [l('Decision', 'সিদ্ধান্ত'), l('More of it', 'বেশি'), l('Cost / trade-off', 'খরচ / trade-off')],
          rows: [
            [l('Renditions', 'Rendition'), l('Encode many qualities and codecs', 'অনেক মান ও codec encode'), l('Smoother playback for every device and network, but multiplied compute and storage.', 'প্রতিটি ডিভাইস ও network-এ মসৃণ playback, তবে বহুগুণ compute ও storage।')],
            [l('Segment length', 'Segment দৈর্ঘ্য'), l('Shorter segments', 'ছোট segment'), l('Faster quality adaptation and start-up, but more requests and manifest overhead.', 'দ্রুত মান adaptation ও start-up, তবে বেশি request ও manifest overhead।')],
            [l('Segment length', 'Segment দৈর্ঘ্য'), l('Longer segments', 'বড় segment'), l('Better compression and fewer requests, but slower to adapt to bandwidth changes.', 'ভালো compression ও কম request, তবে bandwidth বদলে ধীর adaptation।')],
            [l('Storage tier', 'Storage tier'), l('Keep all renditions hot', 'সব rendition hot রাখা'), l('Instant playback, high storage cost; cold tiers cut cost but add first-play latency.', 'তাৎক্ষণিক playback, উচ্চ storage খরচ; cold tier খরচ কমায় তবে প্রথম-play latency বাড়ায়।')],
            [l('CDN fill', 'CDN fill'), l('Pull (cache on miss)', 'Pull (miss-এ cache)'), l('Simple, self-managing; pre-push (push) warms edges for big launches but costs upfront.', 'সরল, স্ব-পরিচালিত; বড় launch-এ pre-push (push) edge গরম করে তবে আগে খরচ।')],
          ],
        } },
        { p: l('The core trade-off from the topic: more renditions improve playback but multiply compute and storage cost. Platforms tune the rendition ladder to the audience — a mobile-heavy market may skip 4K, while a premium film service adds high-bitrate HDR tiers.', 'topic থেকে মূল trade-off: বেশি rendition playback উন্নত করে তবে compute ও storage খরচ বহুগুণ করে। প্ল্যাটফর্ম দর্শক অনুযায়ী rendition ladder tune করে—mobile-ভারী বাজার হয়তো ৪K বাদ দেয়, আর একটি premium film সেবা উচ্চ-bitrate HDR tier যোগ করে।') },
      ],
    },
    {
      h: l('Common mistakes', 'সাধারণ ভুল'),
      blocks: [
        { list: [
          l('Keeping the upload request open until every rendition finishes transcoding — uploads then time out and fail; instead return immediately and transcode asynchronously via a queue.', 'প্রতিটি rendition transcode শেষ না হওয়া পর্যন্ত upload request খোলা রাখা—তখন upload time out হয়ে ব্যর্থ হয়; বরং সঙ্গে সঙ্গে ফিরুন ও queue দিয়ে asynchronously transcode করুন।'),
          l('Serving video straight from the origin or a database instead of a CDN — no single origin can push terabits per second, and viewers far away buffer constantly.', 'CDN-এর বদলে origin বা database থেকে সরাসরি ভিডিও পরিবেশন—কোনো একক origin প্রতি সেকেন্ডে terabit দিতে পারে না, ও দূরের দর্শক অবিরত buffer করে।'),
          l('Storing one giant file per quality and no segments — you lose adaptive bitrate, efficient caching, and fast seeking.', 'প্রতি মানে একটি বিশাল ফাইল ও কোনো segment না রাখা—আপনি adaptive bitrate, দক্ষ caching ও দ্রুত seek হারান।'),
          l('Only offering one bitrate — viewers on slow connections buffer endlessly while viewers on fast ones get needlessly low quality.', 'শুধু একটি bitrate দেওয়া—ধীর connection-এর দর্শক অবিরত buffer করে আর দ্রুত connection-এর দর্শক অকারণে নিম্ন মান পায়।'),
          l('Transcoding on the web server in the request path instead of a separate, scalable, durable worker pool — one big upload can starve all live traffic.', 'একটি আলাদা, scalable, টেকসই worker pool-এর বদলে request পথে web server-এ transcode করা—একটি বড় upload সব live ট্রাফিক অনাহারে ফেলতে পারে।'),
        ] },
      ],
    },
    {
      h: l('Summary', 'সারসংক্ষেপ'),
      blocks: [
        { list: [
          l('Ingest a video once, transcode it into many renditions asynchronously, and deliver adaptive segments through a CDN.', 'একবার ভিডিও ingest করুন, asynchronously অনেক rendition-এ transcode করুন, ও CDN দিয়ে adaptive segment দিন।'),
          l('Uploads return immediately and enqueue a durable transcoding workflow — never block the request on processing.', 'upload সঙ্গে সঙ্গে ফেরে ও একটি টেকসই transcoding workflow enqueue করে—কখনো request-কে processing-এ আটকান না।'),
          l('Video is split into short segments encoded at multiple bitrates; a manifest lists them and the player picks quality per segment (ABR) by measuring bandwidth and buffer.', 'ভিডিও ছোট segment-এ ভাগ, একাধিক bitrate-এ encoded; একটি manifest সেগুলো তালিকাভুক্ত করে ও player bandwidth ও buffer মেপে প্রতি segment-এ মান বাছে (ABR)।'),
          l('The CDN caches immutable segments at the edge so the origin handles only cache misses — the only way to deliver terabits per second globally.', 'CDN edge-এ অপরিবর্তনীয় segment cache করে যাতে origin শুধু cache miss সামলায়—global-ভাবে প্রতি সেকেন্ডে terabit দেওয়ার একমাত্র উপায়।'),
        ] },
      ],
    },
  ],

  // ── Design a notification platform ────────────────────────────────────────
  'notification-platform': [
    {
      h: l('Requirements: what a notification platform must do', 'প্রয়োজন: একটি নোটিফিকেশন প্ল্যাটফর্মকে যা করতে হবে'),
      blocks: [
        { p: l('A notification platform is the shared service every other team calls to reach users across channels — mobile push, email, SMS, in-app, and webhooks. Functionally it must apply user preferences (which channels a user allows), render templates, schedule and respect quiet hours, route to the right third-party provider, retry failures, and deduplicate so a user is not paged twice for the same event.', 'একটি নোটিফিকেশন প্ল্যাটফর্ম হলো সেই শেয়ার্ড service যা প্রতিটি অন্য টিম ব্যবহারকারীর কাছে পৌঁছাতে চ্যানেল-জুড়ে কল করে—mobile push, email, SMS, in-app ও webhook। ফাংশনালি একে user preference (কোন চ্যানেল একজন user অনুমোদন করে) প্রয়োগ করতে, template render করতে, schedule করতে ও quiet hours মানতে, সঠিক third-party provider-এ route করতে, ব্যর্থতা retry করতে, ও deduplicate করতে হবে যাতে একই event-এ একজন user দুবার notified না হয়।') },
        { p: l('Non-functionally it must handle huge, spiky throughput (a marketing campaign can fan out to millions at once), guarantee at-least-once delivery for important messages, keep transactional notifications (a login code, a payment receipt) low-latency, and stay resilient when a downstream provider slows down or fails.', 'নন-ফাংশনালি একে বিশাল, spiky throughput সামলাতে হবে (একটি marketing campaign একবারে লক্ষ লক্ষে fan out করতে পারে), গুরুত্বপূর্ণ বার্তার জন্য at-least-once delivery নিশ্চিত করতে, transactional notification (login code, payment receipt) low-latency রাখতে, ও একটি downstream provider ধীর বা ব্যর্থ হলে resilient থাকতে হবে।') },
        { note: l('The key insight: a notification platform applies preferences, templates, scheduling, provider routing, retries, and deduplication across channels — asynchronously. Like a dispatch desk that chooses the right message, time, courier, and backup courier for each recipient, none of this belongs in the caller’s request path.', 'মূল অন্তর্দৃষ্টি: একটি নোটিফিকেশন প্ল্যাটফর্ম চ্যানেল-জুড়ে preference, template, scheduling, provider routing, retry ও deduplication প্রয়োগ করে—asynchronously। প্রতিটি গ্রাহকের জন্য সঠিক বার্তা, সময়, courier ও backup courier বেছে নেওয়া একটি dispatch desk-এর মতো, এর কিছুই caller-এর request পথে নেই।'), kind: 'tip' },
      ],
    },
    {
      h: l('Estimation: notification volume and fan-out', 'আন্দাজ: notification পরিমাণ ও fan-out'),
      blocks: [
        { p: l('Estimate steady-state volume from events, then account for fan-out — one logical event (a post from a followed account, a broadcast campaign) can generate millions of individual notifications. Peaks, not averages, size the queues.', 'event থেকে steady-state পরিমাণ আন্দাজ করুন, তারপর fan-out হিসাব করুন—একটি logical event (অনুসরণ করা অ্যাকাউন্টের পোস্ট, একটি broadcast campaign) লক্ষ লক্ষ পৃথক notification তৈরি করতে পারে। গড় নয়, peak-ই queue-র মাপ ঠিক করে।') },
        { code: `Steady-state volume
  daily active users   = 100 M = 1 × 10^8
  notifications / user = 5 / day  (across all channels)
  notifications / day  = 5e8
  avg QPS              = 5e8 / 1e5 = 5,000 / s
  peak QPS             = avg × 10 ≈ 50,000 / s

Fan-out spike (a campaign)
  campaign recipients  = 20 M = 2 × 10^7
  desired send window  = 10 min = 600 s
  required send rate    = 2e7 / 600 ≈ 33,000 / s just for one campaign
  → decouple with a queue; workers drain at provider-safe rates

Delivery split
  push  ~ 60%   email ~ 25%   SMS ~ 10%   webhook ~ 5%
  (each channel has its own provider limits and its own queue)`, caption: l('Fan-out and campaign spikes are why sending must be queued and rate-limited per channel — never done inline in the caller’s request.', 'Fan-out ও campaign spike-এর কারণেই sending queue-করা ও channel-প্রতি rate-limited হতে হবে—কখনো caller-এর request-এ inline নয়।') },
      ],
    },
    {
      h: l('High-level design', 'হাই-লেভেল ডিজাইন'),
      blocks: [
        { p: l('Producers hand off an event and return instantly; everything else happens asynchronously in a pipeline of queues and workers, with a channel-specific queue and worker pool at the delivery end.', 'Producer একটি event হস্তান্তর করে ও সঙ্গে সঙ্গে ফেরে; বাকি সব queue ও worker-এর একটি pipeline-এ asynchronously ঘটে, delivery প্রান্তে একটি channel-নির্দিষ্ট queue ও worker pool-সহ।') },
        { steps: [
          l('Ingest — a producing service posts a notification request to the platform’s API, which validates it and drops it on an ingestion queue, then returns immediately.', 'Ingest—একটি producing service প্ল্যাটফর্মের API-তে একটি notification request পাঠায়, যা এটি validate করে একটি ingestion queue-তে রাখে, তারপর সঙ্গে সঙ্গে ফেরে।'),
          l('Fan-out and resolve — workers expand the event to its recipients, look up each user’s preferences and quiet hours, and drop those who opted out.', 'Fan-out ও resolve—worker event-কে তার গ্রাহকে সম্প্রসারিত করে, প্রতিটি user-এর preference ও quiet hours দেখে, ও যারা opt out করেছে তাদের বাদ দেয়।'),
          l('Deduplicate and render — an idempotency key drops duplicates, then the template service renders the message per channel and per locale.', 'Deduplicate ও render—একটি idempotency key duplicate বাদ দেয়, তারপর template service প্রতি channel ও প্রতি locale-এ বার্তা render করে।'),
          l('Enqueue per channel — each rendered message is placed on the queue for its channel (push, email, SMS, webhook), each of which can be drained at its own safe rate.', 'Channel-প্রতি enqueue—প্রতিটি rendered বার্তা তার channel-এর queue-তে রাখা হয় (push, email, SMS, webhook), প্রতিটি নিজের নিরাপদ হারে drain করা যায়।'),
          l('Deliver via provider — channel workers call the third-party provider (APNs/FCM for push, an email provider, an SMS gateway, an HTTP webhook) with timeouts, retries, and circuit breakers.', 'Provider দিয়ে deliver—channel worker third-party provider কল করে (push-এ APNs/FCM, একটি email provider, একটি SMS gateway, একটি HTTP webhook) timeout, retry ও circuit breaker-সহ।'),
          l('Track and feed back — record provider receipts and delivery status, handle bounces and unsubscribes, and update a notification log for auditing and de-duplication.', 'Track ও feed back—provider receipt ও delivery status record করুন, bounce ও unsubscribe সামলান, ও auditing ও de-duplication-এর জন্য একটি notification log আপডেট করুন।'),
        ] },
      ],
    },
    {
      h: l('Deep dive: fan-out and reliable delivery', 'গভীরে: fan-out ও নির্ভরযোগ্য delivery'),
      blocks: [
        { p: l('Fan-out is turning one logical notification into many individual sends. A "your friend went live" event for a creator with 5 million followers becomes 5 million messages. Doing this inline in the caller’s request would block it for minutes and collapse under a spike, so fan-out runs in workers reading from a queue. For very large audiences you fan out in batches — a worker reads a chunk of recipients, resolves and enqueues them, and checkpoints — so the work is parallel, resumable, and back-pressured by queue depth rather than crashing the system.', 'Fan-out হলো একটি logical notification-কে অনেক পৃথক send-এ পরিণত করা। ৫০ লক্ষ follower-যুক্ত একজন creator-এর "আপনার বন্ধু live হয়েছে" event ৫০ লক্ষ বার্তা হয়। caller-এর request-এ inline এটি করলে তা কয়েক মিনিট আটকে থাকত ও spike-এ ভেঙে পড়ত, তাই fan-out একটি queue থেকে পড়া worker-এ চলে। খুব বড় audience-এ আপনি batch-এ fan out করেন—একটি worker গ্রাহকের একটি chunk পড়ে, resolve ও enqueue করে, ও checkpoint দেয়—তাই কাজ parallel, resumable, ও system ভাঙার বদলে queue-গভীরতায় back-pressured।') },
        { p: l('Delivery must be reliable without becoming a duplicate storm. The realistic guarantee is at-least-once: you retry until a provider confirms acceptance, which means a message can be sent more than once. To keep the user from seeing duplicates, every notification carries an idempotency key (derived from event id + user id + channel); workers record delivered keys and skip repeats. Retries use exponential backoff with jitter so a provider outage does not trigger a synchronized retry stampede, and after a capped number of attempts the message goes to a dead-letter queue for inspection rather than looping forever.', 'Delivery-কে duplicate storm না হয়ে নির্ভরযোগ্য হতে হবে। বাস্তব গ্যারান্টি at-least-once: provider গ্রহণ নিশ্চিত না করা পর্যন্ত আপনি retry করেন, মানে একটি বার্তা একাধিকবার পাঠানো যেতে পারে। user যাতে duplicate না দেখে, প্রতিটি notification একটি idempotency key বহন করে (event id + user id + channel থেকে উদ্ভূত); worker delivered key record করে ও পুনরাবৃত্তি এড়ায়। Retry jitter-সহ exponential backoff ব্যবহার করে যাতে একটি provider outage একটি synchronized retry stampede না ঘটায়, ও একটি সীমিত সংখ্যক চেষ্টার পর বার্তা চিরকাল লুপ না করে পরিদর্শনের জন্য একটি dead-letter queue-তে যায়।') },
        { code: `Delivery worker (per channel)
  msg = queue.pull()
  if seen(msg.idempotency_key):        # already delivered
      ack(); return
  try:
      provider.send(msg)               # timeout-guarded
      mark_seen(msg.idempotency_key)
      record_receipt(msg, "sent")
  except ProviderError:
      if msg.attempts < MAX_RETRIES:
          requeue(msg, delay = backoff(msg.attempts) + jitter())
      else:
          dead_letter(msg)             # stop; alert; inspect`, caption: l('At-least-once retries + an idempotency key + a dead-letter queue give reliable delivery without infinite loops or duplicate spam.', 'At-least-once retry + একটি idempotency key + একটি dead-letter queue অসীম লুপ বা duplicate spam ছাড়াই নির্ভরযোগ্য delivery দেয়।') },
        { p: l('Two more pieces make it production-grade. First, provider routing and failover: each channel may have multiple providers, and a worker routes by cost, region, or health, failing over to a backup provider (the "backup courier") when the primary degrades — while a circuit breaker stops hammering a provider that is clearly down so it can recover. Second, rate limiting per provider: providers enforce their own quotas, so each channel queue is drained at a controlled rate to avoid a "provider storm" that gets you throttled or blocked. Transactional messages (a one-time login code) ride a separate high-priority queue so a bulk marketing campaign can never delay them.', 'আরও দুটি অংশ একে production-grade করে। প্রথম, provider routing ও failover: প্রতিটি channel-এর একাধিক provider থাকতে পারে, ও একটি worker cost, region বা health দিয়ে route করে, primary অবনত হলে একটি backup provider-এ ("backup courier") failover করে—আর একটি circuit breaker স্পষ্টভাবে down একটি provider-কে আঘাত করা থামায় যাতে এটি সেরে ওঠে। দ্বিতীয়, provider-প্রতি rate limiting: provider নিজের quota প্রয়োগ করে, তাই প্রতিটি channel queue একটি নিয়ন্ত্রিত হারে drain হয় যাতে একটি "provider storm" এড়ানো যায় যা আপনাকে throttled বা blocked করে। Transactional বার্তা (একটি one-time login code) একটি আলাদা high-priority queue-তে চড়ে যাতে একটি bulk marketing campaign কখনো তাদের দেরি করাতে না পারে।') },
      ],
    },
    {
      h: l('Scaling and trade-offs', 'Scaling ও trade-off'),
      blocks: [
        { table: {
          head: [l('Decision', 'সিদ্ধান্ত'), l('Option', 'বিকল্প'), l('Trade-off', 'Trade-off')],
          rows: [
            [l('Delivery guarantee', 'Delivery গ্যারান্টি'), l('At-least-once + idempotency', 'At-least-once + idempotency'), l('Reliable and practical; needs dedup keys to avoid duplicates. Exactly-once is far costlier and rarely worth it.', 'নির্ভরযোগ্য ও বাস্তব; duplicate এড়াতে dedup key দরকার। Exactly-once অনেক ব্যয়বহুল ও কমই মূল্যবান।')],
            [l('Retries', 'Retry'), l('Aggressive retries', 'আক্রমণাত্মক retry'), l('Higher delivery rate, but risk of duplicates and provider storms; cap attempts and back off.', 'বেশি delivery rate, তবে duplicate ও provider storm-এর ঝুঁকি; চেষ্টা সীমিত করুন ও back off করুন।')],
            [l('Fan-out timing', 'Fan-out সময়'), l('Fan out on write (push)', 'write-এ fan out (push)'), l('Instant delivery; expensive for huge audiences. Batching and queues absorb the spike.', 'তাৎক্ষণিক delivery; বিশাল audience-এ ব্যয়বহুল। Batching ও queue spike শোষে।')],
            [l('Priority', 'Priority'), l('Separate transactional queue', 'আলাদা transactional queue'), l('Login codes and receipts stay fast even during a campaign; more queues to operate.', 'campaign-এর সময়ও login code ও receipt দ্রুত থাকে; পরিচালনায় বেশি queue।')],
            [l('Provider strategy', 'Provider কৌশল'), l('Multi-provider failover', 'Multi-provider failover'), l('Survives a provider outage; adds routing logic, cost tracking, and config complexity.', 'একটি provider outage টেকে; routing logic, cost tracking ও config জটিলতা বাড়ায়।')],
          ],
        } },
        { p: l('The core trade-off from the topic: retries increase delivery but can create duplicates and provider storms. The resolution is not "retry less" but "retry safely" — idempotency keys, capped exponential backoff with jitter, per-provider rate limits, and a dead-letter queue.', 'topic থেকে মূল trade-off: retry delivery বাড়ায় তবে duplicate ও provider storm তৈরি করতে পারে। সমাধান "কম retry" নয় বরং "নিরাপদে retry"—idempotency key, সীমিত jitter-সহ exponential backoff, provider-প্রতি rate limit, ও একটি dead-letter queue।') },
      ],
    },
    {
      h: l('Common mistakes', 'সাধারণ ভুল'),
      blocks: [
        { list: [
          l('Sending synchronously from the product request without preference checks — the request blocks on a slow provider, and users get notifications they opted out of.', 'preference পরীক্ষা ছাড়া product request থেকে synchronously পাঠানো—request একটি ধীর provider-এ আটকায়, ও user সেসব notification পায় যা তারা opt out করেছিল।'),
          l('Retrying without idempotency keys, so every retry becomes a duplicate the user actually sees.', 'idempotency key ছাড়া retry, যাতে প্রতিটি retry একটি duplicate হয় যা user সত্যিই দেখে।'),
          l('Unbounded or synchronized retries — hammering a struggling provider until it rate-limits or bans you (a "provider storm"); use backoff, jitter, and circuit breakers.', 'অসীম বা synchronized retry—একটি সংগ্রামরত provider-কে আঘাত করা যতক্ষণ না এটি আপনাকে rate-limit বা ban করে (একটি "provider storm"); backoff, jitter ও circuit breaker ব্যবহার করুন।'),
          l('Fanning out a million-recipient campaign inline in one request instead of batching through a queue — it times out and takes the caller down with it.', 'একটি queue-এর মাধ্যমে batch না করে এক request-এ দশ লক্ষ-গ্রাহকের campaign inline fan out করা—এটি time out করে ও caller-কে সঙ্গে নিয়ে পড়ে।'),
          l('Mixing transactional and bulk traffic in one queue — a marketing blast then delays login codes and payment receipts that users are actively waiting for.', 'একটি queue-তে transactional ও bulk ট্রাফিক মেশানো—একটি marketing blast তখন সেই login code ও payment receipt দেরি করায় যা user সক্রিয়ভাবে অপেক্ষা করছে।'),
          l('Ignoring quiet hours and per-channel preferences — over-notifying users is the fastest way to mass unsubscribes and spam-folder reputation damage.', 'quiet hours ও per-channel preference উপেক্ষা—user-কে অতি-notify করা mass unsubscribe ও spam-folder সুনাম ক্ষতির দ্রুততম উপায়।'),
        ] },
      ],
    },
    {
      h: l('Summary', 'সারসংক্ষেপ'),
      blocks: [
        { list: [
          l('A notification platform applies preferences, templates, scheduling, provider routing, retries, and deduplication across channels — all asynchronously.', 'একটি নোটিফিকেশন প্ল্যাটফর্ম চ্যানেল-জুড়ে preference, template, scheduling, provider routing, retry ও deduplication প্রয়োগ করে—সবই asynchronously।'),
          l('The producer returns instantly; queues and workers handle fan-out, rendering, and per-channel delivery.', 'producer সঙ্গে সঙ্গে ফেরে; queue ও worker fan-out, rendering ও per-channel delivery সামলায়।'),
          l('Fan out in batches through a queue; deliver at-least-once with idempotency keys, backoff-with-jitter retries, and a dead-letter queue.', 'একটি queue-এর মাধ্যমে batch-এ fan out করুন; idempotency key, jitter-সহ backoff retry ও একটি dead-letter queue দিয়ে at-least-once deliver করুন।'),
          l('Rate-limit and fail over per provider, and give transactional messages their own priority queue so campaigns never delay them.', 'provider-প্রতি rate-limit ও failover করুন, ও transactional বার্তাকে নিজের priority queue দিন যাতে campaign কখনো তাদের দেরি না করায়।'),
        ] },
      ],
    },
  ],
}
