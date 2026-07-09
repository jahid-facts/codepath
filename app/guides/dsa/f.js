// Deep, bilingual (English + Bangla) teaching guides for DSA techniques & graphs.
// Same block schema as app/course-guides.js — rendered by GuideBlock in LearningApp.js.
// Blocks: { p }, { list }, { steps }, { table:{head,rows} }, { note, kind }, { code, caption }.

const l = (en, bn) => ({ en, bn })

export default {
  // ── Minimum spanning trees (Kruskal & Prim) ───────────────────────────────
  'dsa-mst': [
    {
      h: l('What is a minimum spanning tree?', 'মিনিমাম স্প্যানিং ট্রি কী?'),
      blocks: [
        { p: l('A minimum spanning tree (MST) is a way to connect every node of a weighted, undirected graph using a subset of its edges so that (1) all nodes are reachable, (2) there are no cycles, and (3) the total weight of the chosen edges is as small as possible. "Spanning" means it touches every node; "tree" means it has no cycles; "minimum" means no other cycle-free connecting set is cheaper.', 'মিনিমাম স্প্যানিং ট্রি (MST) হলো একটি ওয়েটেড, আনডিরেক্টেড গ্রাফের প্রতিটি নোডকে তার কিছু এজ দিয়ে যুক্ত করার উপায়, যাতে (১) সব নোডে পৌঁছানো যায়, (২) কোনো সাইকেল না থাকে, এবং (৩) বাছাই করা এজের মোট ওজন যতটা সম্ভব কম হয়। "Spanning" মানে এটি প্রতিটি নোড ছোঁয়; "tree" মানে কোনো সাইকেল নেই; "minimum" মানে অন্য কোনো সাইকেল-মুক্ত সংযোগকারী সেট এর চেয়ে সস্তা নয়।') },
        { p: l('The problem it solves is "connect everything for the least cost." Given houses to wire, cities to link with fibre, or components to bridge on a circuit board, an MST tells you exactly which links to build so nothing is left out and not a single taka is wasted on a redundant loop. For a graph with V nodes, an MST always has exactly V − 1 edges.', 'এটি যে সমস্যা সমাধান করে তা হলো "সবচেয়ে কম খরচে সব যুক্ত করা।" তার দিয়ে জুড়তে হবে এমন বাড়ি, ফাইবার দিয়ে জুড়তে হবে এমন শহর, বা সার্কিট বোর্ডে সেতু বাঁধতে হবে এমন কম্পোনেন্ট—MST ঠিক বলে দেয় কোন লিংকগুলো বানাবেন যাতে কিছু বাদ না পড়ে ও একটি টাকাও অপ্রয়োজনীয় লুপে নষ্ট না হয়। V নোডের গ্রাফে MST-তে সবসময় ঠিক V − 1টি এজ থাকে।') },
        { note: l('Think of laying the cheapest cable that still reaches every house in a neighbourhood, with no wasteful loops. You want every home online, but you never pay to run two cables where one would do — that "cheapest connect-all wiring" is exactly an MST.', 'একটি এলাকার প্রতিটি বাড়িতে পৌঁছায় এমন সবচেয়ে সস্তা তার বসানোর কথা ভাবুন, কোনো অপচয়ী লুপ ছাড়া। আপনি চান প্রতিটি বাড়ি অনলাইনে থাকুক, কিন্তু যেখানে একটি তার যথেষ্ট সেখানে দুটি চালাতে কখনো খরচ করেন না—সেই "সবচেয়ে সস্তা সব-যুক্ত ওয়্যারিং"-ই MST।'), kind: 'tip' },
      ],
    },
    {
      h: l('How Kruskal and Prim build it', 'ক্রুসকাল ও প্রিম কীভাবে বানায়'),
      blocks: [
        { p: l('Two classic algorithms find an MST, and both are greedy — they repeatedly grab the cheapest edge that is still "safe" to add. They differ in how they define "safe."', 'দুটি ক্লাসিক অ্যালগরিদম MST খুঁজে, ও দুটোই greedy—তারা বারবার সবচেয়ে সস্তা এজ নেয় যা যোগ করা এখনো "নিরাপদ।" তারা "নিরাপদ" কীভাবে সংজ্ঞায়িত করে তাতে পার্থক্য।') },
        { steps: [
          l('Kruskal: sort every edge by weight, from cheapest to most expensive.', 'ক্রুসকাল: প্রতিটি এজকে ওজন অনুযায়ী সাজান, সস্তা থেকে দামি।'),
          l('Walk the sorted edges. Add an edge only if its two endpoints are not already connected — otherwise it would form a cycle. A union-find (disjoint-set) structure answers "already connected?" in near-constant time.', 'সাজানো এজগুলো ধরে এগোন। একটি এজ তখনই যোগ করুন যখন তার দুই প্রান্ত এখনো যুক্ত নয়—নইলে সাইকেল হতো। একটি union-find (disjoint-set) স্ট্রাকচার "ইতিমধ্যে যুক্ত?" প্রায়-ধ্রুবক সময়ে উত্তর দেয়।'),
          l('Stop once you have added V − 1 edges; the tree now spans every node.', 'V − 1টি এজ যোগ হলে থামুন; ট্রি এখন প্রতিটি নোড স্প্যান করে।'),
          l('Prim: instead of sorting all edges, grow one tree from a starting node, and each step add the cheapest edge that leaves the tree and reaches a new node.', 'প্রিম: সব এজ সাজানোর বদলে একটি শুরুর নোড থেকে একটি ট্রি বাড়ান, ও প্রতি ধাপে সবচেয়ে সস্তা এজ যোগ করুন যা ট্রি ছেড়ে একটি নতুন নোডে পৌঁছায়।'),
          l('Prim uses a min-heap of candidate edges so the cheapest crossing edge is always found fast.', 'প্রিম প্রার্থী এজের একটি min-heap ব্যবহার করে যাতে সবচেয়ে সস্তা crossing এজ সবসময় দ্রুত মেলে।'),
        ] },
        { code: `Kruskal(graph):
  sort all edges by weight, ascending
  make each node its own set        # union-find init
  mst = empty list

  for each edge (u, v, w) in sorted order:
    if find(u) != find(v):          # u and v not yet connected
      union(u, v)                   # merge the two sets
      mst.add((u, v, w))            # keep this edge
      if size(mst) == V - 1:        # tree is complete
        break

  return mst`, caption: l('Kruskal in pseudocode. The union-find check "find(u) != find(v)" is what prevents cycles: if two endpoints already share a set, the edge would close a loop, so we skip it.', 'ছদ্মকোডে ক্রুসকাল। union-find যাচাই "find(u) != find(v)"-ই সাইকেল ঠেকায়: দুই প্রান্ত ইতিমধ্যে একই সেটে থাকলে এজটি একটি লুপ বন্ধ করত, তাই আমরা তা এড়াই।') },
      ],
    },
    {
      h: l('Kruskal vs Prim — which and when', 'ক্রুসকাল বনাম প্রিম—কোনটা ও কখন'),
      blocks: [
        { table: {
          head: [l('Algorithm', 'অ্যালগরিদম'), l('How it grows', 'কীভাবে বাড়ে'), l('Best for', 'কার জন্য')],
          rows: [
            [l('Kruskal', 'ক্রুসকাল'), l('Sort all edges, add the cheapest that does not make a cycle (union-find).', 'সব এজ সাজান, সাইকেল না বানানো সবচেয়ে সস্তাটি যোগ করুন (union-find)।'), l('Sparse graphs (few edges); when edges are easy to sort.', 'বিরল গ্রাফ (কম এজ); যখন এজ সাজানো সহজ।')],
            [l('Prim (with heap)', 'প্রিম (হিপসহ)'), l('Grow one tree from a node, always adding the cheapest edge leaving it (min-heap).', 'এক নোড থেকে একটি ট্রি বাড়ান, সবসময় সেটি ছেড়ে যাওয়া সস্তা এজ যোগ করুন (min-heap)।'), l('Dense graphs (many edges); when the graph is one connected blob.', 'ঘন গ্রাফ (অনেক এজ); যখন গ্রাফ একটি যুক্ত পিণ্ড।')],
          ],
        } },
      ],
    },
    {
      h: l('Complexity', 'জটিলতা'),
      blocks: [
        { p: l('Both algorithms are dominated by the cost of finding cheap edges — sorting for Kruskal, heap operations for Prim.', 'দুটো অ্যালগরিদমই সস্তা এজ খোঁজার খরচে প্রভাবিত—ক্রুসকালে সর্টিং, প্রিমে heap অপারেশন।') },
        { table: {
          head: [l('Operation', 'অপারেশন'), l('Complexity', 'জটিলতা')],
          rows: [
            [l('Kruskal (sort edges + union-find)', 'ক্রুসকাল (এজ সর্ট + union-find)'), l('O(E log E)', 'O(E log E)')],
            [l('Prim (with a binary min-heap)', 'প্রিম (বাইনারি min-heap সহ)'), l('O((V + E) log V)', 'O((V + E) log V)')],
            [l('Space', 'স্পেস'), l('O(V + E)', 'O(V + E)')],
          ],
        } },
        { p: l('Because E can be at most about V² and log E is within a constant factor of log V, on sparse graphs Kruskal often wins and on dense graphs Prim often wins — but both are close, and both are provably optimal in the weight they produce.', 'যেহেতু E সর্বোচ্চ প্রায় V² হতে পারে এবং log E, log V-এর একটি ধ্রুবক ফ্যাক্টরের মধ্যে থাকে, বিরল গ্রাফে ক্রুসকাল প্রায়ই জেতে ও ঘন গ্রাফে প্রিম প্রায়ই জেতে—তবে দুটোই কাছাকাছি, ও দুটোই যে ওজন তৈরি করে তাতে প্রমাণযোগ্যভাবে অপটিমাল।') },
      ],
    },
    {
      h: l('When and where to use an MST', 'কোথায় ও কখন MST ব্যবহার করবেন'),
      blocks: [
        { list: [
          l('Network design: the cheapest set of cables, pipes, or roads that still connects every location.', 'নেটওয়ার্ক ডিজাইন: সবচেয়ে সস্তা তার, পাইপ বা সড়কের সেট যা তবু প্রতিটি অবস্থান যুক্ত করে।'),
          l('Clustering: build the MST, then cut the few heaviest edges — each remaining piece is a natural cluster.', 'ক্লাস্টারিং: MST বানান, তারপর সবচেয়ে ভারী কয়েকটি এজ কাটুন—প্রতিটি অবশিষ্ট অংশ একটি স্বাভাবিক ক্লাস্টার।'),
          l('Approximation: an MST is a building block for approximate solutions to harder problems like the travelling salesman.', 'অ্যাপ্রক্সিমেশন: MST কঠিনতর সমস্যা যেমন travelling salesman-এর আনুমানিক সমাধানের একটি বিল্ডিং ব্লক।'),
          l('Pick Kruskal for sparse graphs and Prim for dense ones; if you already have edges in a sorted or streamable form, Kruskal is natural.', 'বিরল গ্রাফে ক্রুসকাল ও ঘন গ্রাফে প্রিম নিন; এজ যদি ইতিমধ্যে সাজানো বা স্ট্রিমযোগ্য থাকে, ক্রুসকাল স্বাভাবিক।'),
        ] },
        { note: l('An MST minimizes total weight, not the distance between any specific pair of nodes. If you need the shortest route from A to B, that is Dijkstra, not an MST — the MST path between two nodes can be far longer than their true shortest path.', 'MST মোট ওজন কমায়, কোনো নির্দিষ্ট জোড়া নোডের মধ্যে দূরত্ব নয়। A থেকে B-র সবচেয়ে ছোট পথ দরকার হলে তা Dijkstra, MST নয়—দুটি নোডের মধ্যে MST-পথ তাদের প্রকৃত সবচেয়ে ছোট পথের চেয়ে অনেক লম্বা হতে পারে।'), kind: 'warn' },
      ],
    },
    {
      h: l('Common mistakes', 'সাধারণ ভুল'),
      blocks: [
        { list: [
          l('Expecting the MST to give the shortest path between two nodes. It minimizes the total tree weight — for point-to-point shortest paths use Dijkstra instead.', 'MST দুটি নোডের মধ্যে সবচেয়ে ছোট পথ দেবে আশা করা। এটি মোট ট্রি-ওজন কমায়—বিন্দু-থেকে-বিন্দু সবচেয়ে ছোট পথের জন্য বরং Dijkstra নিন।'),
          l('Running Kruskal without a union-find (or a broken one): you must reject any edge whose endpoints are already connected, or you create cycles.', 'union-find ছাড়া (বা ভাঙা একটি দিয়ে) ক্রুসকাল চালানো: যে এজের প্রান্ত ইতিমধ্যে যুক্ত তা প্রত্যাখ্যান করতেই হবে, নইলে সাইকেল তৈরি হয়।'),
          l('Forgetting the graph may be disconnected. If no spanning tree exists you get a minimum spanning forest, not one tree.', 'গ্রাফ বিচ্ছিন্ন হতে পারে তা ভুলে যাওয়া। কোনো spanning tree না থাকলে আপনি একটি minimum spanning forest পান, একটি ট্রি নয়।'),
          l('Applying MST logic to a directed graph. MST is defined for undirected graphs; the directed analogue is a different problem (minimum arborescence).', 'ডিরেক্টেড গ্রাফে MST যুক্তি প্রয়োগ। MST আনডিরেক্টেড গ্রাফের জন্য সংজ্ঞায়িত; ডিরেক্টেড সংস্করণ ভিন্ন সমস্যা (minimum arborescence)।'),
        ] },
      ],
    },
    {
      h: l('Remember in one line', 'এক লাইনে মনে রাখুন'),
      blocks: [
        { list: [
          l('An MST connects every node with the least total edge weight and no cycles — exactly V − 1 edges.', 'MST প্রতিটি নোডকে সর্বনিম্ন মোট এজ-ওজনে ও সাইকেল ছাড়া যুক্ত করে—ঠিক V − 1টি এজ।'),
          l('Kruskal sorts edges + union-find (great for sparse); Prim grows from a node + min-heap (great for dense). Both greedy, both optimal.', 'ক্রুসকাল এজ সাজায় + union-find (বিরলে ভালো); প্রিম নোড থেকে বাড়ে + min-heap (ঘনে ভালো)। দুটোই greedy, দুটোই অপটিমাল।'),
          l('MST minimizes total weight, not any single pair’s distance — for that use Dijkstra.', 'MST মোট ওজন কমায়, কোনো একক জোড়ার দূরত্ব নয়—তার জন্য Dijkstra।'),
        ] },
      ],
    },
  ],

  // ── Two pointers & sliding window ─────────────────────────────────────────
  'dsa-two-pointer': [
    {
      h: l('What are two pointers and sliding windows?', 'টু পয়েন্টার ও স্লাইডিং উইন্ডো কী?'),
      blocks: [
        { p: l('Two pointers and the sliding window are techniques for scanning an array or string using a small number of moving indices instead of nested loops. Two pointers keeps two indices that move toward each other (or in the same direction) based on a condition; a sliding window keeps a left and right index that mark a contiguous range you grow and shrink as you sweep across the data.', 'টু পয়েন্টার ও স্লাইডিং উইন্ডো হলো একটি অ্যারে বা স্ট্রিং স্ক্যান করার কৌশল, যেখানে নেস্টেড লুপের বদলে অল্প কয়েকটি চলমান ইনডেক্স ব্যবহার হয়। টু পয়েন্টার একটি শর্ত অনুযায়ী দুটি ইনডেক্স রাখে যা পরস্পরের দিকে (বা একই দিকে) সরে; স্লাইডিং উইন্ডো একটি left ও right ইনডেক্স রাখে যা একটি ধারাবাহিক রেঞ্জ চিহ্নিত করে, যা ডেটা জুড়ে চলার সময় বাড়ান ও ছোট করেন।') },
        { p: l('The problem they solve is speed. A naive approach to questions like "find a pair that sums to a target" or "find the longest substring without repeats" checks every pair or every subarray — that is O(n²) or worse. By moving indices cleverly and never re-examining what you have already ruled out, these techniques answer the same questions in a single O(n) pass.', 'তারা যে সমস্যা সমাধান করে তা হলো গতি। "টার্গেটে যোগফল দেয় এমন জোড়া খুঁজুন" বা "পুনরাবৃত্তি ছাড়া সবচেয়ে দীর্ঘ সাবস্ট্রিং খুঁজুন" প্রশ্নের সরল পদ্ধতি প্রতিটি জোড়া বা প্রতিটি সাবঅ্যারে যাচাই করে—তা O(n²) বা তারও খারাপ। চতুরভাবে ইনডেক্স সরিয়ে ও যা আগেই বাদ দিয়েছেন তা আর না দেখে, এই কৌশল একই প্রশ্নের উত্তর একটিমাত্র O(n) পাসে দেয়।') },
        { note: l('Picture two people starting at opposite ends of a line and walking toward the middle to meet — that is the two-pointer idea. For a sliding window, picture a fixed-length ruler you slide along a shelf, only ever looking at the books currently under it.', 'একটি লাইনের দুই প্রান্ত থেকে দুজন মানুষ মাঝে মেলার জন্য হাঁটছে—এটাই টু পয়েন্টারের ধারণা। স্লাইডিং উইন্ডোর জন্য একটি নির্দিষ্ট-দৈর্ঘ্যের রুলার একটি তাকের ওপর সরাচ্ছেন ভাবুন, যা কেবল এই মুহূর্তে তার নিচে থাকা বইগুলোই দেখে।'), kind: 'tip' },
      ],
    },
    {
      h: l('How they work', 'কীভাবে কাজ করে'),
      blocks: [
        { steps: [
          l('Two pointers (converging): put left at the start and right at the end of a sorted array. Compare the pair; if the sum is too small move left rightward to increase it, if too big move right leftward to decrease it.', 'টু পয়েন্টার (converging): একটি সাজানো অ্যারের শুরুতে left ও শেষে right রাখুন। জোড়া তুলনা করুন; যোগফল খুব ছোট হলে বাড়াতে left ডানে সরান, খুব বড় হলে কমাতে right বামে সরান।'),
          l('Because the array is sorted, each move safely discards possibilities you never need to revisit — that is why one pass suffices.', 'অ্যারে সাজানো বলে প্রতিটি সরণ নিরাপদে এমন সম্ভাবনা বাদ দেয় যা আর কখনো দেখার দরকার নেই—এ কারণেই একটি পাস যথেষ্ট।'),
          l('Sliding window: move a right index forward to grow the window and include a new element.', 'স্লাইডিং উইন্ডো: উইন্ডো বাড়াতে ও একটি নতুন উপাদান যোগ করতে right ইনডেক্স সামনে সরান।'),
          l('Whenever the window violates its rule (sum too large, a duplicate appears, more than k distinct items), move the left index forward to shrink it until the rule holds again.', 'যখনই উইন্ডো তার নিয়ম ভাঙে (যোগফল খুব বড়, ডুপ্লিকেট আসে, k-এর বেশি ভিন্ন আইটেম), নিয়ম আবার সত্য হওয়া পর্যন্ত ছোট করতে left ইনডেক্স সামনে সরান।'),
          l('Track the best answer (longest length, smallest window, count) as the window slides across.', 'উইন্ডো পিছলে যাওয়ার সময় সেরা উত্তর (সবচেয়ে দীর্ঘ দৈর্ঘ্য, ক্ষুদ্রতম উইন্ডো, গণনা) ট্র্যাক করুন।'),
        ] },
        { code: `# Two pointers — find a pair summing to target in a SORTED array
twoSum(arr, target):
  left  = 0
  right = length(arr) - 1
  while left < right:
    sum = arr[left] + arr[right]
    if sum == target: return (left, right)
    if sum < target:  left  = left + 1     # need a bigger sum
    else:             right = right - 1    # need a smaller sum
  return none

# Sliding window — longest contiguous subarray with sum <= limit
longestWindow(arr, limit):
  start = 0
  windowSum = 0
  best = 0
  for end from 0 to length(arr) - 1:
    windowSum = windowSum + arr[end]       # grow the window on the right
    while windowSum > limit:
      windowSum = windowSum - arr[start]   # shrink from the left
      start = start + 1
    best = max(best, end - start + 1)
  return best`, caption: l('Each index only ever moves forward, so across the whole run left and right advance at most n times combined — that is the O(n) guarantee.', 'প্রতিটি ইনডেক্স কেবল সামনে সরে, তাই পুরো চলার সময় left ও right মিলিয়ে সর্বোচ্চ n বার এগোয়—এটাই O(n) নিশ্চয়তা।') },
      ],
    },
    {
      h: l('Complexity vs the brute-force scan', 'ব্রুট-ফোর্স স্ক্যানের বিপরীতে জটিলতা'),
      blocks: [
        { table: {
          head: [l('Approach', 'পদ্ধতি'), l('Time', 'সময়'), l('Space', 'স্পেস')],
          rows: [
            [l('Brute force (check every pair / subarray)', 'ব্রুট ফোর্স (প্রতিটি জোড়া / সাবঅ্যারে যাচাই)'), l('O(n²) or worse', 'O(n²) বা তারও খারাপ'), l('O(1)', 'O(1)')],
            [l('Two pointers / sliding window', 'টু পয়েন্টার / স্লাইডিং উইন্ডো'), l('O(n) (one pass)', 'O(n) (একটি পাস)'), l('O(1) to O(k)', 'O(1) থেকে O(k)')],
            [l('If sorting is required first', 'যদি আগে সর্ট লাগে'), l('O(n log n) for the sort', 'সর্টে O(n log n)'), l('O(1) to O(n)', 'O(1) থেকে O(n)')],
          ],
        } },
        { p: l('The scan itself is O(n). If the input is not already sorted and the technique needs sorted data (as converging two-pointer sums do), the sort adds O(n log n) — still far better than O(n²). A sliding window that tracks distinct characters uses O(k) extra space for a small counter or set.', 'স্ক্যান নিজে O(n)। ইনপুট যদি আগে থেকে সাজানো না থাকে ও কৌশলে সাজানো ডেটা লাগে (converging two-pointer sum যেমন চায়), সর্ট O(n log n) যোগ করে—তবু O(n²)-এর চেয়ে অনেক ভালো। ভিন্ন অক্ষর ট্র্যাক করা স্লাইডিং উইন্ডো একটি ছোট counter বা set-এর জন্য O(k) অতিরিক্ত স্পেস নেয়।') },
      ],
    },
    {
      h: l('When and where to use them', 'কোথায় ও কখন ব্যবহার করবেন'),
      blocks: [
        { list: [
          l('Pair and triple sums in a sorted array (two-sum, three-sum) — converging two pointers.', 'সাজানো অ্যারেতে জোড়া ও ত্রয়ী যোগফল (two-sum, three-sum)—converging টু পয়েন্টার।'),
          l('Palindrome checks and reversing in place — pointers from both ends.', 'প্যালিনড্রোম যাচাই ও ইন-প্লেস রিভার্স—দুই প্রান্ত থেকে পয়েন্টার।'),
          l('Longest / shortest / count of contiguous subarray or substring under a constraint — sliding window.', 'একটি শর্তে সবচেয়ে দীর্ঘ / ছোট / গণনা ধারাবাহিক সাবঅ্যারে বা সাবস্ট্রিং—স্লাইডিং উইন্ডো।'),
          l('Merging two sorted lists, or partitioning (Dutch-flag) problems — same-direction two pointers.', 'দুটি সাজানো লিস্ট মার্জ, বা partition (Dutch-flag) সমস্যা—একই দিকের টু পয়েন্টার।'),
        ] },
        { p: l('The key precondition is a monotonic or sorted structure: moving a pointer must let you safely discard a whole region of possibilities. When growing the window can only help and shrinking can only hurt (or vice versa), a window works. When that property is missing, the technique quietly gives wrong answers.', 'মূল পূর্বশর্ত হলো একটি monotonic বা সাজানো স্ট্রাকচার: একটি পয়েন্টার সরালে যেন নিরাপদে সম্ভাবনার একটি পুরো অঞ্চল বাদ দিতে পারেন। যখন উইন্ডো বাড়ালে শুধু সাহায্য হয় ও ছোট করলে শুধু ক্ষতি (বা উল্টো), তখন উইন্ডো কাজ করে। সেই ধর্ম না থাকলে কৌশলটি নীরবে ভুল উত্তর দেয়।') },
      ],
    },
    {
      h: l('Common mistakes', 'সাধারণ ভুল'),
      blocks: [
        { list: [
          l('Applying a sliding window to a problem that lacks the monotonic property it relies on — for example, values that can be negative, where growing the window does not monotonically increase the sum.', 'যে সমস্যায় নির্ভরযোগ্য monotonic ধর্ম নেই সেখানে স্লাইডিং উইন্ডো প্রয়োগ—যেমন নেগেটিভ হতে পারা মান, যেখানে উইন্ডো বাড়ালে যোগফল একঘেয়েভাবে বাড়ে না।'),
          l('Running converging two-pointer sums on unsorted data — the discard logic is only valid when the array is sorted.', 'অসাজানো ডেটায় converging two-pointer sum চালানো—বাদ-দেওয়া যুক্তি কেবল অ্যারে সাজানো থাকলেই বৈধ।'),
          l('Off-by-one errors in the window bounds; length is end − start + 1, and loop conditions like left < right vs left <= right matter.', 'উইন্ডো সীমায় অফ-বাই-ওয়ান ভুল; দৈর্ঘ্য end − start + 1, এবং left < right বনাম left <= right-এর মতো লুপ শর্ত গুরুত্বপূর্ণ।'),
          l('Forgetting to update the window state (sum, counts, set) both when adding on the right and removing on the left.', 'ডানে যোগ ও বামে অপসারণ—দুই সময়েই উইন্ডো স্টেট (sum, count, set) হালনাগাদ করতে ভুলে যাওয়া।'),
        ] },
      ],
    },
    {
      h: l('Remember in one line', 'এক লাইনে মনে রাখুন'),
      blocks: [
        { list: [
          l('Two pointers and sliding windows turn many O(n²) scans into a single O(n) pass by moving indices, never re-checking ruled-out work.', 'টু পয়েন্টার ও স্লাইডিং উইন্ডো ইনডেক্স সরিয়ে অনেক O(n²) স্ক্যানকে একটিমাত্র O(n) পাসে নামায়, বাদ-দেওয়া কাজ আর যাচাই না করে।'),
          l('Two pointers for pairs/palindromes on sorted data; sliding window for best contiguous subarray/substring.', 'সাজানো ডেটায় জোড়া/প্যালিনড্রোমে টু পয়েন্টার; সেরা ধারাবাহিক সাবঅ্যারে/সাবস্ট্রিংয়ে স্লাইডিং উইন্ডো।'),
          l('They require a sorted or monotonic structure — without it, the shortcut is simply wrong.', 'এদের একটি সাজানো বা monotonic স্ট্রাকচার দরকার—তা ছাড়া শর্টকাটটি স্রেফ ভুল।'),
        ] },
      ],
    },
  ],

  // ── Recursion & backtracking ──────────────────────────────────────────────
  'dsa-backtracking': [
    {
      h: l('What is backtracking?', 'ব্যাকট্র্যাকিং কী?'),
      blocks: [
        { p: l('Backtracking is a systematic way to search for solutions by building a candidate one piece at a time and abandoning (backtracking from) a partial candidate the moment it cannot possibly lead to a valid full solution. It is a refined brute force: you explore a tree of choices, but you cut off — "prune" — whole branches as soon as they are proven hopeless.', 'ব্যাকট্র্যাকিং হলো সমাধান খোঁজার একটি সুশৃঙ্খল উপায়, যেখানে একটি ক্যান্ডিডেট এক টুকরো করে বানানো হয় এবং একটি আংশিক ক্যান্ডিডেট যেই মুহূর্তে বৈধ পূর্ণ সমাধানে যেতে পারবে না, সেই মুহূর্তে তা ছেড়ে দেওয়া (ব্যাকট্র্যাক করা) হয়। এটি পরিশোধিত brute force: আপনি পছন্দের একটি ট্রি অন্বেষণ করেন, তবে যেই শাখা হতাশ প্রমাণিত হয় সেই মুহূর্তে তা কেটে ফেলেন—"prune" করেন।') },
        { p: l('The problem it solves is exploring a huge space of combinations without generating all of them blindly. Puzzles like placing N queens on a chessboard, generating every subset or permutation, solving Sudoku, or fitting words in a crossword all have exponentially many possible arrangements. Backtracking visits only the arrangements that stay valid so far, which in practice can be a tiny fraction of the whole.', 'এটি যে সমস্যা সমাধান করে তা হলো সমন্বয়ের একটি বিশাল জগৎ অন্বেষণ করা—সবগুলো অন্ধভাবে তৈরি না করে। দাবার বোর্ডে N-কুইন্স বসানো, প্রতিটি সাবসেট বা পারমুটেশন তৈরি, Sudoku সমাধান, বা crossword-এ শব্দ বসানোর মতো ধাঁধায় সম্ভাব্য বিন্যাস এক্সপোনেনশিয়াল সংখ্যক। ব্যাকট্র্যাকিং কেবল সেই বিন্যাসগুলো দেখে যা এখন পর্যন্ত বৈধ, যা বাস্তবে পুরোটার একটি ক্ষুদ্র ভগ্নাংশ হতে পারে।') },
        { p: l('Recursion is the engine, backtracking is the strategy. Every backtracking algorithm is a recursion where each call represents "I have committed to some choices; now let me try the next decision." The recursion goes deeper as the partial solution grows, and it returns — unwinding one level — whenever a branch is complete or hopeless. What makes it backtracking rather than plain recursion is the deliberate undo of state before trying a sibling choice, and the early validity test that stops doomed branches before they waste any more work.', 'রিকার্শন হলো ইঞ্জিন, ব্যাকট্র্যাকিং হলো কৌশল। প্রতিটি ব্যাকট্র্যাকিং অ্যালগরিদম একটি রিকার্শন যেখানে প্রতিটি কল বোঝায় "আমি কিছু পছন্দে অটল হয়েছি; এবার পরের সিদ্ধান্ত চেষ্টা করি।" আংশিক সমাধান বাড়ার সঙ্গে রিকার্শন গভীরে যায়, ও একটি শাখা সম্পূর্ণ বা হতাশ হলেই এক স্তর গুটিয়ে ফেরে। সাধারণ রিকার্শন নয়, একে ব্যাকট্র্যাকিং করে তোলে sibling পছন্দ চেষ্টার আগে স্টেটের ইচ্ছাকৃত undo, ও ডুবতে বসা শাখাকে আরও কাজ নষ্টের আগেই থামানো আগেভাগের বৈধতা যাচাই।') },
        { note: l('Think of solving a maze: you try a turn and walk down it, and the moment you hit a wall you reverse back to the last junction and try a different turn. Backtracking is exactly that "try, fail, undo, try the next option" loop, applied to any decision tree.', 'একটি গোলকধাঁধা সমাধানের কথা ভাবুন: আপনি এক দিকে বাঁক নিয়ে এগোন, আর দেয়ালে ঠেকলেই শেষ সংযোগস্থলে ফিরে গিয়ে ভিন্ন বাঁক চেষ্টা করেন। ব্যাকট্র্যাকিং ঠিক সেই "চেষ্টা, ব্যর্থ, আনডু, পরের বিকল্প"—যেকোনো সিদ্ধান্ত-ট্রিতে প্রয়োগ করা।'), kind: 'tip' },
      ],
    },
    {
      h: l('How it works', 'কীভাবে কাজ করে'),
      blocks: [
        { steps: [
          l('At each step, look at the choices available to extend the current partial solution.', 'প্রতি ধাপে, বর্তমান আংশিক সমাধান বাড়ানোর জন্য যে পছন্দগুলো আছে তা দেখুন।'),
          l('For each choice, first check whether it is still valid (does it break a rule?). If invalid, skip it — this is the pruning that makes backtracking fast.', 'প্রতিটি পছন্দের জন্য প্রথমে যাচাই করুন এটি এখনো বৈধ কি না (কোনো নিয়ম ভাঙে?)। অবৈধ হলে বাদ দিন—এই pruning-ই ব্যাকট্র্যাকিং দ্রুত করে।'),
          l('If valid, apply the choice (place the queen, add the number), recording the change in your state.', 'বৈধ হলে পছন্দটি প্রয়োগ করুন (কুইন বসান, সংখ্যা যোগ করুন), স্টেটে পরিবর্তন লিপিবদ্ধ করে।'),
          l('Recurse to fill the next position with the updated state. If it returns a full solution, record or return it.', 'হালনাগাদ স্টেট নিয়ে পরের অবস্থান ভরতে recurse করুন। পূর্ণ সমাধান ফিরলে তা লিপিবদ্ধ বা ফেরত দিন।'),
          l('Crucially, undo the choice before trying the next one, so the state is clean for sibling branches. This "undo" is what the word backtrack means.', 'গুরুত্বপূর্ণভাবে, পরেরটি চেষ্টার আগে পছন্দটি আনডু করুন, যাতে sibling শাখার জন্য স্টেট পরিষ্কার থাকে। এই "আনডু"-ই backtrack শব্দের অর্থ।'),
        ] },
        { code: `# Generic backtracking template
backtrack(state):
  if isComplete(state):
    record(state)                 # found a full valid solution
    return

  for choice in choicesFor(state):
    if not isValid(choice, state):
      continue                    # PRUNE: skip a dead branch early
    apply(choice, state)          # make the move
    backtrack(state)              # recurse one level deeper
    undo(choice, state)           # UNDO — restore state for the next choice`, caption: l('The pattern is always the same: choose, explore, un-choose. Miss the final undo and branches corrupt each other; miss the isValid prune and you fall back to slow brute force.', 'প্যাটার্ন সবসময় এক: choose, explore, un-choose। শেষ আনডু বাদ দিলে শাখাগুলো একে অপরকে নষ্ট করে; isValid prune বাদ দিলে ধীর brute force-এ ফিরে যান।') },
      ],
    },
    {
      h: l('Cost: pruning helps, but the worst case is exponential', 'খরচ: pruning সাহায্য করে, তবে ওয়ার্স্ট-কেস এক্সপোনেনশিয়াল'),
      blocks: [
        { table: {
          head: [l('Problem', 'সমস্যা'), l('Search-space size', 'সার্চ-স্পেসের আকার')],
          rows: [
            [l('All subsets of n items', 'n আইটেমের সব সাবসেট'), l('O(2^n)', 'O(2^n)')],
            [l('All permutations of n items', 'n আইটেমের সব পারমুটেশন'), l('O(n!)', 'O(n!)')],
            [l('N-Queens (n×n board)', 'N-Queens (n×n বোর্ড)'), l('Exponential; pruning cuts it far below n^n', 'এক্সপোনেনশিয়াল; pruning একে n^n-এর অনেক নিচে নামায়')],
          ],
        } },
        { p: l('Pruning explores far fewer states than a blind enumeration, and for many real inputs that difference is enormous. But it changes the constant and the practical speed, not the worst-case class: if nothing can be pruned, backtracking still visits the whole exponential tree. Always assume exponential worst case and rely on good pruning to make typical cases fast.', 'Pruning অন্ধ enumeration-এর চেয়ে অনেক কম স্টেট অন্বেষণ করে, ও অনেক বাস্তব ইনপুটে সেই পার্থক্য বিশাল। কিন্তু এটি ধ্রুবক ও ব্যবহারিক গতি বদলায়, ওয়ার্স্ট-কেস শ্রেণি নয়: কিছুই prune করা না গেলে ব্যাকট্র্যাকিং এখনো পুরো এক্সপোনেনশিয়াল ট্রি দেখে। সবসময় এক্সপোনেনশিয়াল ওয়ার্স্ট-কেস ধরে নিন ও সাধারণ কেস দ্রুত করতে ভালো pruning-এর ওপর নির্ভর করুন।') },
      ],
    },
    {
      h: l('When and where to use it', 'কোথায় ও কখন ব্যবহার করবেন'),
      blocks: [
        { list: [
          l('Generate all combinations, subsets, or permutations of a set.', 'একটি সেটের সব কম্বিনেশন, সাবসেট বা পারমুটেশন তৈরি।'),
          l('Constraint puzzles: N-Queens, Sudoku, crosswords, graph colouring.', 'কনস্ট্রেইন্ট ধাঁধা: N-Queens, Sudoku, crossword, graph colouring।'),
          l('Path and word-search problems where you explore, hit a dead end, and retreat.', 'পথ ও শব্দ-খোঁজা সমস্যা যেখানে অন্বেষণ করেন, ডেড-এন্ডে ঠেকেন, ও পিছিয়ে আসেন।'),
          l('Any "find all valid arrangements" or "does at least one valid arrangement exist" question over discrete choices.', 'বিচ্ছিন্ন পছন্দের ওপর যেকোনো "সব বৈধ বিন্যাস খুঁজুন" বা "অন্তত একটি বৈধ বিন্যাস আছে কি" প্রশ্ন।'),
        ] },
        { p: l('Choose backtracking when the answer is built from a sequence of discrete decisions and you can test a partial choice for validity early. If the problem instead has overlapping subproblems whose answers repeat, dynamic programming may be far faster; if a provably safe local choice exists, a greedy algorithm may skip the search entirely.', 'ব্যাকট্র্যাকিং নিন যখন উত্তর বিচ্ছিন্ন সিদ্ধান্তের একটি ধারা থেকে তৈরি হয় ও একটি আংশিক পছন্দের বৈধতা আগেভাগে যাচাই করা যায়। বরং সমস্যায় যদি ওভারল্যাপিং সাবপ্রবলেম থাকে যাদের উত্তর পুনরাবৃত্ত হয়, dynamic programming অনেক দ্রুত হতে পারে; আর প্রমাণযোগ্যভাবে নিরাপদ স্থানীয় পছন্দ থাকলে একটি greedy অ্যালগরিদম পুরো সার্চ এড়িয়ে যেতে পারে।') },
      ],
    },
    {
      h: l('Common mistakes', 'সাধারণ ভুল'),
      blocks: [
        { list: [
          l('Failing to undo state changes when backtracking, so a choice from one branch leaks into its siblings and corrupts them. Every apply needs a matching undo.', 'ব্যাকট্র্যাক করার সময় স্টেট পরিবর্তন আনডু না করা, ফলে এক শাখার একটি পছন্দ তার sibling-এ ঢুকে তাদের নষ্ট করে। প্রতিটি apply-এর একটি মিলে যাওয়া undo দরকার।'),
          l('Pruning too late (or not at all): checking validity only at the leaf wastes the whole point and drops you back to brute force.', 'খুব দেরিতে (বা একদমই না) prune করা: বৈধতা কেবল পাতায় যাচাই করলে পুরো উদ্দেশ্য নষ্ট হয় ও brute force-এ ফিরে যান।'),
          l('A wrong or missing base case, so recursion never stops or records incomplete answers.', 'ভুল বা অনুপস্থিত base case, ফলে রিকার্শন কখনো থামে না বা অসম্পূর্ণ উত্তর লিপিবদ্ধ করে।'),
          l('Sharing a mutable object across branches without cloning when needed, so recorded solutions all point at the same, later-mutated state.', 'দরকার হলে clone না করে শাখাজুড়ে একটি mutable object শেয়ার করা, ফলে লিপিবদ্ধ সমাধানগুলো সবাই একই, পরে-বদলানো স্টেট নির্দেশ করে।'),
        ] },
      ],
    },
    {
      h: l('Remember in one line', 'এক লাইনে মনে রাখুন'),
      blocks: [
        { list: [
          l('Backtracking = build a candidate step by step, and abandon a branch the instant it cannot succeed.', 'ব্যাকট্র্যাকিং = ধাপে ধাপে ক্যান্ডিডেট বানান, আর যেই মুহূর্তে সফল হতে পারবে না সেই মুহূর্তে শাখা ছাড়ুন।'),
          l('The loop is always choose → explore → un-choose; the undo is non-negotiable.', 'লুপ সবসময় choose → explore → un-choose; আনডু বাধ্যতামূলক।'),
          l('Pruning makes typical cases fast, but the worst case stays exponential.', 'Pruning সাধারণ কেস দ্রুত করে, তবে ওয়ার্স্ট-কেস এক্সপোনেনশিয়াল থাকে।'),
        ] },
      ],
    },
  ],

  // ── Greedy algorithms ─────────────────────────────────────────────────────
  'dsa-greedy': [
    {
      h: l('What is a greedy algorithm?', 'গ্রিডি অ্যালগরিদম কী?'),
      blocks: [
        { p: l('A greedy algorithm builds a solution one step at a time, and at each step it takes the choice that looks best right now — the best local option — without reconsidering earlier decisions. It never looks back and never explores alternatives, betting that a sequence of locally optimal choices adds up to a globally optimal answer.', 'গ্রিডি অ্যালগরিদম এক ধাপে এক করে সমাধান বানায়, ও প্রতি ধাপে সেই পছন্দ নেয় যা এই মুহূর্তে সেরা দেখায়—সেরা স্থানীয় বিকল্প—আগের সিদ্ধান্ত পুনর্বিবেচনা না করে। এটি কখনো পিছনে তাকায় না ও বিকল্প অন্বেষণ করে না, বাজি ধরে যে স্থানীয়ভাবে অপটিমাল পছন্দের একটি ধারা মিলে গ্লোবালি অপটিমাল উত্তরে পৌঁছাবে।') },
        { p: l('The problem it solves is optimization done cheaply. When the greedy bet is valid, you get the optimal answer in a single fast pass — no big search tree, no table of subproblems. The catch is the word "when": greedy is only correct for problems that have a specific structure, and telling those apart from look-alikes is the whole skill.', 'এটি যে সমস্যা সমাধান করে তা হলো সস্তায় অপটিমাইজেশন। গ্রিডি বাজি বৈধ হলে আপনি একটিমাত্র দ্রুত পাসে অপটিমাল উত্তর পান—কোনো বড় সার্চ ট্রি নেই, সাবপ্রবলেমের কোনো টেবিল নেই। মারপ্যাঁচ হলো "যখন" শব্দটি: গ্রিডি কেবল সেই সমস্যার জন্য সঠিক যাদের একটি নির্দিষ্ট গঠন আছে, আর সেগুলোকে দেখতে-একই সমস্যা থেকে আলাদা করাই পুরো দক্ষতা।') },
        { note: l('Think of making change by always handing over the largest coin that still fits under the amount owed. With standard coin systems this simple rule really does use the fewest coins — a perfect little greedy algorithm.', 'পাওনা অঙ্কের নিচে মানানসই সবচেয়ে বড় মুদ্রা সবসময় দিয়ে খুচরা ফেরত দেওয়ার কথা ভাবুন। প্রমিত মুদ্রা ব্যবস্থায় এই সরল নিয়ম সত্যিই সবচেয়ে কম মুদ্রা ব্যবহার করে—একটি নিখুঁত ছোট গ্রিডি অ্যালগরিদম।'), kind: 'tip' },
        { p: l('But that same coin rule fails on other coin systems — with coins of 1, 3, and 4, paying 6 greedily gives 4 + 1 + 1 (three coins) when 3 + 3 (two coins) is better. That single counter-example captures the entire personality of greedy algorithms: dazzlingly simple and fast when the structure is right, and quietly wrong when it is not. So the real work with greedy is never writing the loop — it is proving that grabbing the local best can never cost you the global best.', 'কিন্তু সেই একই মুদ্রা-নিয়ম অন্য মুদ্রা ব্যবস্থায় ব্যর্থ হয়—১, ৩ ও ৪ মুদ্রায় ৬ গ্রিডিভাবে দিলে হয় ৪ + ১ + ১ (তিন মুদ্রা), যেখানে ৩ + ৩ (দুই মুদ্রা) ভালো। ওই একটিমাত্র পাল্টা-উদাহরণ গ্রিডি অ্যালগরিদমের পুরো স্বভাব ধরে: গঠন ঠিক থাকলে চমকপ্রদভাবে সরল ও দ্রুত, আর না থাকলে নীরবে ভুল। তাই গ্রিডির আসল কাজ কখনো লুপ লেখা নয়—তা হলো প্রমাণ করা যে স্থানীয় সেরা নেওয়া কখনো আপনার গ্লোবাল সেরাকে ব্যয় করাবে না।') },
      ],
    },
    {
      h: l('How it works', 'কীভাবে কাজ করে'),
      blocks: [
        { steps: [
          l('Define what "best local choice" means — usually via a sort key (earliest finish time, highest value-to-weight ratio, smallest cost).', '"সেরা স্থানীয় পছন্দ" মানে কী তা সংজ্ঞায়িত করুন—সাধারণত একটি sort key দিয়ে (সবচেয়ে আগের finish time, সর্বোচ্চ value-to-weight অনুপাত, ক্ষুদ্রতম খরচ)।'),
          l('Sort or use a heap so you can always pull the current best candidate quickly.', 'সাজান বা একটি heap ব্যবহার করুন যাতে বর্তমান সেরা প্রার্থী সবসময় দ্রুত টানতে পারেন।'),
          l('Walk through the candidates in that order, taking each one that is compatible with the choices already made.', 'সেই ক্রমে প্রার্থীদের ধরে এগোন, ইতিমধ্যে নেওয়া পছন্দের সঙ্গে সঙ্গতিপূর্ণ প্রতিটি নিন।'),
          l('Never undo a taken choice and never revisit a rejected one — that commitment is what makes greedy fast.', 'নেওয়া পছন্দ কখনো আনডু নয় ও প্রত্যাখ্যাত কোনোটি কখনো আবার দেখা নয়—সেই অঙ্গীকারই গ্রিডিকে দ্রুত করে।'),
          l('Before trusting the result, confirm the problem actually has the greedy-choice property and optimal substructure (ideally with a proof).', 'ফলে ভরসা করার আগে নিশ্চিত করুন সমস্যায় সত্যিই greedy-choice property ও optimal substructure আছে (আদর্শভাবে একটি প্রমাণসহ)।'),
        ] },
        { code: `# Activity selection — pick the most non-overlapping intervals
greedyIntervals(intervals):
  sort intervals by finish time, ascending    # the greedy key
  chosen = empty list
  lastEnd = -infinity

  for (start, end) in intervals:
    if start >= lastEnd:        # does not overlap what we already took
      chosen.add((start, end))  # safe local choice
      lastEnd = end             # commit; never reconsider
  return chosen`, caption: l('Choosing the interval that finishes earliest leaves the most room for the rest — a greedy choice that is provably optimal for interval scheduling.', 'যে ইন্টারভাল সবচেয়ে আগে শেষ হয় তা নেওয়া বাকিদের জন্য সবচেয়ে বেশি জায়গা রাখে—interval scheduling-এ প্রমাণযোগ্যভাবে অপটিমাল একটি গ্রিডি পছন্দ।') },
      ],
    },
    {
      h: l('Greedy vs dynamic programming', 'গ্রিডি বনাম dynamic programming'),
      blocks: [
        { table: {
          head: [l('Aspect', 'দিক'), l('Greedy', 'গ্রিডি'), l('Dynamic programming', 'Dynamic programming')],
          rows: [
            [l('Choice at each step', 'প্রতি ধাপের পছন্দ'), l('Commit to the best local option, never revisit', 'সেরা স্থানীয় বিকল্পে অটল, আর দেখে না'), l('Try all options, keep the best via subproblems', 'সব বিকল্প চেষ্টা, সাবপ্রবলেম দিয়ে সেরাটি রাখে')],
            [l('Speed', 'গতি'), l('Fast: often O(n log n)', 'দ্রুত: প্রায়ই O(n log n)'), l('Slower: fills a table of states', 'ধীর: স্টেটের একটি টেবিল ভরে')],
            [l('Correctness', 'সঠিকতা'), l('Only when the greedy-choice property holds', 'কেবল greedy-choice property থাকলে'), l('Always optimal if the recurrence is right', 'recurrence ঠিক হলে সবসময় অপটিমাল')],
          ],
        } },
        { p: l('Greedy is the special case that works when a local optimum is guaranteed to be part of a global optimum. When that guarantee is missing — the classic example is the 0/1 knapsack — greedy can return a wrong answer and you must fall back to dynamic programming, which considers combinations greedy skips.', 'গ্রিডি হলো সেই বিশেষ কেস যা তখন কাজ করে যখন একটি স্থানীয় অপটিমাম গ্লোবাল অপটিমামের অংশ হওয়ার নিশ্চয়তা থাকে। সেই নিশ্চয়তা না থাকলে—ক্লাসিক উদাহরণ 0/1 knapsack—গ্রিডি ভুল উত্তর দিতে পারে ও আপনাকে dynamic programming-এ ফিরতে হয়, যা গ্রিডি যে সমন্বয় বাদ দেয় তা বিবেচনা করে।') },
      ],
    },
    {
      h: l('When and where to use it', 'কোথায় ও কখন ব্যবহার করবেন'),
      blocks: [
        { list: [
          l('Interval scheduling — select the maximum number of non-overlapping activities.', 'Interval scheduling—সর্বোচ্চ সংখ্যক নন-ওভারল্যাপিং কাজ বাছুন।'),
          l('Huffman coding — repeatedly merge the two least-frequent symbols to build an optimal prefix code.', 'Huffman coding—অপটিমাল prefix code বানাতে বারবার দুটি সবচেয়ে কম-ঘন প্রতীক মার্জ করুন।'),
          l('MST algorithms (Kruskal, Prim) and Dijkstra’s shortest paths are greedy at their core.', 'MST অ্যালগরিদম (Kruskal, Prim) ও Dijkstra-র shortest path মূলে greedy।'),
          l('Fractional knapsack, and many "hand out the largest/earliest/cheapest first" scheduling rules.', 'Fractional knapsack, ও অনেক "সবচেয়ে বড়/আগের/সস্তা আগে দাও" শিডিউলিং নিয়ম।'),
        ] },
        { p: l('Use greedy when you can argue that the locally optimal choice is safe — that taking it never rules out an optimal solution. This is the greedy-choice property, and it usually comes with an exchange argument or a proof. Without that proof, treat any greedy solution as a guess to verify, not an answer to trust.', 'গ্রিডি নিন যখন যুক্তি দিতে পারেন যে স্থানীয়ভাবে অপটিমাল পছন্দ নিরাপদ—তা নিলে কখনো একটি অপটিমাল সমাধান বাদ পড়ে না। এটাই greedy-choice property, ও সাধারণত এটি একটি exchange argument বা প্রমাণসহ আসে। সেই প্রমাণ ছাড়া যেকোনো গ্রিডি সমাধানকে যাচাই করার একটি অনুমান ধরুন, ভরসা করার উত্তর নয়।') },
      ],
    },
    {
      h: l('Common mistakes', 'সাধারণ ভুল'),
      blocks: [
        { list: [
          l('Assuming greedy works without proving it, when only dynamic programming gives the true optimum — the most common and most dangerous greedy error, because it fails silently.', 'প্রমাণ ছাড়া গ্রিডি চলে ধরে নেওয়া, যেখানে কেবল dynamic programming সত্যিকারের অপটিমাম দেয়—সবচেয়ে সাধারণ ও বিপজ্জনক গ্রিডি ভুল, কারণ এটি নীরবে ব্যর্থ হয়।'),
          l('Using greedy on 0/1 knapsack (whole items) — the highest ratio first is not optimal there; that is a DP problem.', '0/1 knapsack (পূর্ণ আইটেম)-এ গ্রিডি ব্যবহার—সেখানে সর্বোচ্চ অনুপাত আগে অপটিমাল নয়; ওটি একটি DP সমস্যা।'),
          l('Choosing the wrong greedy key: sorting by start time instead of finish time in interval scheduling gives a non-optimal set.', 'ভুল গ্রিডি key বাছা: interval scheduling-এ finish time-এর বদলে start time দিয়ে সাজালে একটি অ-অপটিমাল সেট পাওয়া যায়।'),
          l('Not testing against brute force on small inputs — the cheapest way to catch a greedy strategy that is subtly wrong.', 'ছোট ইনপুটে brute force-এর সঙ্গে যাচাই না করা—একটি সূক্ষ্মভাবে ভুল গ্রিডি কৌশল ধরার সবচেয়ে সস্তা উপায়।'),
        ] },
      ],
    },
    {
      h: l('Remember in one line', 'এক লাইনে মনে রাখুন'),
      blocks: [
        { list: [
          l('Greedy takes the best local choice at each step and never looks back — simple and fast when it is valid.', 'গ্রিডি প্রতি ধাপে সেরা স্থানীয় পছন্দ নেয় ও পিছনে তাকায় না—বৈধ হলে সরল ও দ্রুত।'),
          l('It is correct only with the greedy-choice property; without a proof it can silently return a wrong answer.', 'এটি কেবল greedy-choice property থাকলে সঠিক; প্রমাণ ছাড়া নীরবে ভুল উত্তর দিতে পারে।'),
          l('When a safe local choice does not exist, reach for dynamic programming instead.', 'নিরাপদ স্থানীয় পছন্দ না থাকলে বরং dynamic programming নিন।'),
        ] },
      ],
    },
  ],

  // ── Bit manipulation ──────────────────────────────────────────────────────
  'dsa-bit-manipulation': [
    {
      h: l('What is bit manipulation?', 'বিট ম্যানিপুলেশন কী?'),
      blocks: [
        { p: l('Bit manipulation is working directly on the individual binary digits (bits) of an integer using the bitwise operators AND (&), OR (|), XOR (^), NOT (~), and the left/right shifts (<<, >>). Instead of treating a number as a single value, you treat its bits as a compact row of switches you can test, set, clear, and flip.', 'বিট ম্যানিপুলেশন হলো একটি ইন্টিজারের পৃথক binary অঙ্ক (bit)-এর ওপর সরাসরি কাজ করা—bitwise অপারেটর AND (&), OR (|), XOR (^), NOT (~) ও left/right shift (<<, >>) দিয়ে। একটি সংখ্যাকে একক মান হিসেবে না দেখে আপনি তার bit-গুলোকে সুইচের একটি কমপ্যাক্ট সারি হিসেবে দেখেন, যা test, set, clear ও flip করতে পারেন।') },
        { p: l('The problem it solves is doing certain work with almost no time or memory. Packing many yes/no flags into one integer saves space, and some computations a loop would do in O(n) collapse to a single O(1) bitwise trick. XOR, in particular, has a magic property: any value XOR-ed with itself becomes 0, which lets duplicates cancel out.', 'এটি যে সমস্যা সমাধান করে তা হলো নির্দিষ্ট কিছু কাজ প্রায় কোনো সময় বা মেমরি ছাড়াই করা। অনেক হ্যাঁ/না flag একটি ইন্টিজারে packing করলে জায়গা বাঁচে, আর কিছু গণনা যা একটি লুপ O(n)-এ করত তা একটিমাত্র O(1) bitwise ট্রিকে নেমে আসে। বিশেষত XOR-এর একটি জাদুকরী ধর্ম আছে: যেকোনো মান নিজের সঙ্গে XOR করলে 0 হয়, যা ডুপ্লিকেটকে বাতিল হতে দেয়।') },
        { note: l('Picture a row of light switches. A single integer holds many on/off states at once, and one bitwise operation can flip or read all of them together — far faster than touching each switch in a loop.', 'সারিবদ্ধ লাইট সুইচ ভাবুন। একটি ইন্টিজার একসঙ্গে অনেক অন/অফ অবস্থা ধরে, ও একটি bitwise অপারেশন সবগুলো একসঙ্গে flip বা read করতে পারে—লুপে প্রতিটি সুইচ ছোঁয়ার চেয়ে অনেক দ্রুত।'), kind: 'tip' },
      ],
    },
    {
      h: l('The core moves', 'মূল কৌশল'),
      blocks: [
        { steps: [
          l('Test a bit: x & 1 is 1 when x is odd, 0 when even — a parity check. More generally (x >> i) & 1 reads bit i.', 'একটি bit test: x & 1, x বিজোড় হলে 1, জোড় হলে 0—একটি parity যাচাই। আরও সাধারণভাবে (x >> i) & 1, bit i পড়ে।'),
          l('Set a bit: x | (1 << i) turns bit i on. Clear a bit: x & ~(1 << i) turns it off. Toggle a bit: x ^ (1 << i) flips it.', 'একটি bit set: x | (1 << i), bit i চালু করে। একটি bit clear: x & ~(1 << i), বন্ধ করে। একটি bit toggle: x ^ (1 << i), উল্টে দেয়।'),
          l('Multiply or divide by powers of two with shifts: x << 1 doubles, x >> 1 halves (for non-negative integers).', 'shift দিয়ে দুইয়ের ঘাত দিয়ে গুণ বা ভাগ: x << 1 দ্বিগুণ, x >> 1 অর্ধেক (নন-নেগেটিভ ইন্টিজারে)।'),
          l('Clear the lowest set bit: x & (x - 1). Isolate the lowest set bit: x & -x. These power fast bit-counting.', 'সর্বনিম্ন set bit clear: x & (x - 1)। সর্বনিম্ন set bit isolate: x & -x। এগুলো দ্রুত bit-গণনা চালায়।'),
          l('Cancel duplicates with XOR: XOR-ing every element leaves only the value that appears an odd number of times.', 'XOR দিয়ে ডুপ্লিকেট বাতিল: প্রতিটি উপাদান XOR করলে কেবল বিজোড়বার আসা মানটি থাকে।'),
        ] },
        { code: `x & 1            # 1 if x is odd, 0 if even  (parity)
x >> 1           # divide by 2 (drop the lowest bit)
x << 1           # multiply by 2
x & (x - 1)      # clear the lowest set bit
x & -x           # isolate the lowest set bit

# Count how many bits are set (Brian Kernighan's trick)
countSetBits(x):
  count = 0
  while x != 0:
    x = x & (x - 1)      # removes exactly one set bit per loop
    count = count + 1
  return count

# Find the single number that is not duplicated (all others appear twice)
findUnique(arr):
  result = 0
  for v in arr:
    result = result ^ v  # XOR: equal values cancel to 0
  return result`, caption: l('countSetBits loops only once per set bit, so it is O(k) where k is the number of 1s. findUnique is a classic O(n) time, O(1) space use of XOR’s self-cancelling property.', 'countSetBits প্রতি set bit-এ কেবল একবার লুপ করে, তাই এটি O(k) যেখানে k হলো 1-এর সংখ্যা। findUnique হলো XOR-এর নিজে-বাতিল ধর্মের একটি ক্লাসিক O(n) সময়, O(1) স্পেস ব্যবহার।') },
      ],
    },
    {
      h: l('Complexity', 'জটিলতা'),
      blocks: [
        { table: {
          head: [l('Operation', 'অপারেশন'), l('Complexity', 'জটিলতা')],
          rows: [
            [l('Test / set / clear a bit', 'একটি bit test / set / clear'), l('O(1)', 'O(1)')],
            [l('Count set bits (k = number of 1s)', 'set bit গণনা (k = 1-এর সংখ্যা)'), l('O(k)', 'O(k)')],
            [l('Space', 'স্পেস'), l('O(1)', 'O(1)')],
          ],
        } },
        { p: l('Single bitwise operations are constant time — the CPU does them in one instruction. Counting set bits with the x & (x - 1) trick costs O(k), one iteration per 1-bit, which is at most the word size (32 or 64). Storing flags in one integer uses O(1) space instead of an array of booleans.', 'একক bitwise অপারেশন ধ্রুবক সময়—CPU একটি instruction-এ করে। x & (x - 1) ট্রিক দিয়ে set bit গণনা O(k) খরচ করে, প্রতি 1-bit-এ এক iteration, যা সর্বোচ্চ word size (32 বা 64)। একটি ইন্টিজারে flag রাখা boolean-এর অ্যারের বদলে O(1) স্পেস নেয়।') },
      ],
    },
    {
      h: l('When and where to use it', 'কোথায় ও কখন ব্যবহার করবেন'),
      blocks: [
        { list: [
          l('Bitmasks: represent a subset of up to ~64 items as one integer; iterating all subsets is a bitmask DP staple.', 'Bitmask: প্রায় ৬৪টি পর্যন্ত আইটেমের একটি সাবসেটকে একটি ইন্টিজার হিসেবে উপস্থাপন; সব সাবসেট iterate করা bitmask DP-র প্রধান কৌশল।'),
          l('Flags and permissions packed into a single field (read/write/execute bits).', 'একটি field-এ packed flag ও permission (read/write/execute bit)।'),
          l('The XOR trick to find a missing or non-duplicated number in O(1) space.', 'O(1) স্পেসে একটি অনুপস্থিত বা অ-ডুপ্লিকেটেড সংখ্যা খুঁজতে XOR ট্রিক।'),
          l('Low-level and performance-critical code: hashing, compression, graphics, embedded systems.', 'নিম্ন-স্তর ও পারফরম্যান্স-সংকটপূর্ণ কোড: hashing, compression, graphics, embedded system।'),
        ] },
        { p: l('Reach for bit manipulation when memory or speed is genuinely tight, when a problem is naturally about subsets or on/off states, or when the XOR cancellation trick fits. For ordinary application logic, prefer clear code — a boolean array is easier to read than a mask, and readability usually matters more than a few saved bytes.', 'বিট ম্যানিপুলেশন নিন যখন মেমরি বা গতি সত্যিই কড়া, যখন সমস্যা স্বভাবতই সাবসেট বা অন/অফ অবস্থা নিয়ে, বা যখন XOR বাতিল ট্রিক মানায়। সাধারণ অ্যাপ্লিকেশন লজিকে পরিষ্কার কোড নিন—একটি boolean অ্যারে mask-এর চেয়ে পড়া সহজ, ও পঠনযোগ্যতা সাধারণত কয়েক বাইট বাঁচানোর চেয়ে বেশি গুরুত্বপূর্ণ।') },
      ],
    },
    {
      h: l('Common mistakes', 'সাধারণ ভুল'),
      blocks: [
        { list: [
          l('Assuming shifts and masks are safe on signed integers, then hitting overflow or sign-extension bugs — a right shift on a negative number may fill with 1s, not 0s.', 'সাইনড ইন্টিজারে shift ও mask নিরাপদ ধরে নেওয়া, তারপর overflow বা sign-extension বাগে পড়া—একটি নেগেটিভ সংখ্যায় right shift 0 নয়, 1 দিয়ে ভরতে পারে।'),
          l('Shifting by more than or equal to the type’s bit width, which is undefined or implementation-defined in many languages.', 'টাইপের bit width-এর সমান বা বেশি shift করা, যা অনেক ভাষায় undefined বা implementation-defined।'),
          l('Mixing up operator precedence: bitwise operators often bind looser than comparisons, so (x & mask == 0) is not what you meant — parenthesize.', 'অপারেটর precedence গুলিয়ে ফেলা: bitwise অপারেটর প্রায়ই comparison-এর চেয়ে ঢিলেভাবে বাঁধে, তাই (x & mask == 0) আপনি যা চেয়েছেন তা নয়—বন্ধনী দিন।'),
          l('Confusing XOR (^) with exponentiation, or logical AND/OR (&&, ||) with bitwise AND/OR (&, |).', 'XOR (^)-কে exponentiation, বা logical AND/OR (&&, ||)-কে bitwise AND/OR (&, |) ভেবে গুলিয়ে ফেলা।'),
        ] },
      ],
    },
    {
      h: l('Remember in one line', 'এক লাইনে মনে রাখুন'),
      blocks: [
        { list: [
          l('Bit manipulation treats an integer as a row of switches, using &, |, ^, ~, <<, >> to test, set, clear, and flip bits in O(1).', 'বিট ম্যানিপুলেশন একটি ইন্টিজারকে সুইচের সারি হিসেবে দেখে, &, |, ^, ~, <<, >> দিয়ে O(1)-এ bit test, set, clear ও flip করে।'),
          l('Key moves: x & 1 (parity), x & (x - 1) (clear lowest set bit), XOR (cancel duplicates).', 'মূল কৌশল: x & 1 (parity), x & (x - 1) (সর্বনিম্ন set bit clear), XOR (ডুপ্লিকেট বাতিল)।'),
          l('It is fast and memory-tight but error-prone on signed/oversized integers, and it hurts readability — use it deliberately.', 'এটি দ্রুত ও মেমরি-সাশ্রয়ী তবে signed/অতি-বড় ইন্টিজারে ভুলপ্রবণ, ও পঠনযোগ্যতা কমায়—ভেবেচিন্তে ব্যবহার করুন।'),
        ] },
      ],
    },
  ],

  // ── Dynamic programming ───────────────────────────────────────────────────
  'dsa-dp': [
    {
      h: l('What is dynamic programming?', 'ডাইনামিক প্রোগ্রামিং কী?'),
      blocks: [
        { p: l('Dynamic programming (DP) is a technique for solving a problem by breaking it into smaller subproblems, solving each subproblem only once, and reusing (remembering) its answer instead of recomputing it. It applies whenever a problem has two features: overlapping subproblems (the same smaller problems come up again and again) and optimal substructure (the best answer is built from best answers to those subproblems).', 'ডাইনামিক প্রোগ্রামিং (DP) হলো একটি সমস্যা সমাধানের কৌশল, যেখানে সমস্যাকে ছোট সাবপ্রবলেমে ভাঙা হয়, প্রতিটি সাবপ্রবলেম কেবল একবার সমাধান করা হয়, ও তার উত্তর আবার হিসাব না করে পুনঃব্যবহার (মনে রাখা) হয়। এটি তখনই প্রযোজ্য যখন সমস্যায় দুটি বৈশিষ্ট্য থাকে: overlapping subproblem (একই ছোট সমস্যা বারবার আসে) ও optimal substructure (সেরা উত্তর সেই সাবপ্রবলেমের সেরা উত্তর থেকে তৈরি)।') },
        { p: l('The problem it solves is wasted, repeated work. A plain recursion for something like Fibonacci or the longest common subsequence recomputes the same subproblems an exponential number of times. DP stores each subproblem’s answer the first time it is computed, turning exponential recursion into polynomial time — often the difference between a program that finishes instantly and one that never finishes at all.', 'এটি যে সমস্যা সমাধান করে তা হলো অপচয়ী, পুনরাবৃত্ত কাজ। Fibonacci বা longest common subsequence-এর মতো কিছুর সরল রিকার্শন একই সাবপ্রবলেম এক্সপোনেনশিয়াল সংখ্যক বার আবার হিসাব করে। DP প্রতিটি সাবপ্রবলেমের উত্তর প্রথমবার হিসাব করার সময় সংরক্ষণ করে, এক্সপোনেনশিয়াল রিকার্শনকে পলিনোমিয়াল সময়ে নামায়—প্রায়ই এটাই সঙ্গে সঙ্গে শেষ হওয়া প্রোগ্রাম ও কখনো শেষ না হওয়া প্রোগ্রামের মধ্যে পার্থক্য।') },
        { note: l('Think of climbing stairs where you can take 1 or 2 steps: the number of ways to reach step n is just the ways to reach step n−1 plus the ways to reach step n−2. Once you have computed the lower steps, every higher step reuses them — that reuse is the whole idea of DP.', 'সিঁড়ি ওঠার কথা ভাবুন যেখানে ১ বা ২ ধাপ নিতে পারেন: n ধাপে পৌঁছানোর উপায় সংখ্যা কেবল n−1 ধাপে পৌঁছানোর উপায় যোগ n−2 ধাপে পৌঁছানোর উপায়। নিচের ধাপগুলো একবার হিসাব করলে প্রতিটি উঁচু ধাপ সেগুলো পুনঃব্যবহার করে—সেই পুনঃব্যবহারই DP-র পুরো ধারণা।'), kind: 'tip' },
      ],
    },
    {
      h: l('How it works: two styles', 'কীভাবে কাজ করে: দুটি ধরন'),
      blocks: [
        { steps: [
          l('Define the state: what parameters uniquely describe a subproblem (for stairs, just the step number n).', 'State সংজ্ঞায়িত করুন: কোন প্যারামিটার একটি সাবপ্রবলেমকে অনন্যভাবে বর্ণনা করে (সিঁড়িতে কেবল ধাপ সংখ্যা n)।'),
          l('Write the recurrence: express a state’s answer in terms of smaller states (ways(n) = ways(n−1) + ways(n−2)).', 'Recurrence লিখুন: একটি state-এর উত্তরকে ছোট state-এর ভাষায় প্রকাশ করুন (ways(n) = ways(n−1) + ways(n−2))।'),
          l('Pin the base cases: the smallest states you know outright (ways(0) = 1, ways(1) = 1).', 'Base case ঠিক করুন: সবচেয়ে ছোট state যা সরাসরি জানেন (ways(0) = 1, ways(1) = 1)।'),
          l('Top-down (memoization): keep the natural recursion but cache each answer in a map/array; return the cached value on repeat calls.', 'Top-down (memoization): স্বাভাবিক রিকার্শন রাখুন কিন্তু প্রতিটি উত্তর একটি map/অ্যারেতে cache করুন; পুনরাবৃত্ত কলে cached মান ফেরত দিন।'),
          l('Bottom-up (tabulation): fill a table starting from the base cases, iterating upward until you reach the target state.', 'Bottom-up (tabulation): base case থেকে শুরু করে একটি টেবিল ভরুন, টার্গেট state-এ পৌঁছানো পর্যন্ত ওপরের দিকে iterate করে।'),
        ] },
        { code: `# Top-down: recursion + memoization
memo = empty map
fib(n):
  if n <= 1: return n
  if n in memo: return memo[n]        # reuse an already-solved subproblem
  memo[n] = fib(n - 1) + fib(n - 2)   # solve once, then store it
  return memo[n]

# Bottom-up: fill a table from the base cases upward
fibTable(n):
  if n <= 1: return n
  dp = array of size n + 1
  dp[0] = 0
  dp[1] = 1
  for i from 2 to n:
    dp[i] = dp[i - 1] + dp[i - 2]     # each state uses smaller states
  return dp[n]`, caption: l('Both compute the same answers; memoization solves subproblems lazily on demand, while tabulation solves them all in a fixed order. Naive fib is O(2^n); either DP form is O(n).', 'দুটোই একই উত্তর হিসাব করে; memoization চাহিদামতো অলসভাবে সাবপ্রবলেম সমাধান করে, tabulation সবগুলো একটি নির্দিষ্ট ক্রমে সমাধান করে। সরল fib হলো O(2^n); যেকোনো DP রূপ O(n)।') },
      ],
    },
    {
      h: l('Complexity', 'জটিলতা'),
      blocks: [
        { p: l('DP’s cost follows a simple rule: you never solve a state twice, so the total time is the number of distinct states multiplied by the work to combine each one.', 'DP-র খরচ একটি সরল নিয়ম মানে: একটি state আপনি কখনো দুইবার সমাধান করেন না, তাই মোট সময় হলো ভিন্ন state-এর সংখ্যা গুণ প্রতিটি সমন্বয় করার কাজ।') },
        { table: {
          head: [l('Measure', 'পরিমাপ'), l('Complexity', 'জটিলতা')],
          rows: [
            [l('Time', 'সময়'), l('O(states × work per state)', 'O(states × প্রতি state-এর কাজ)')],
            [l('Space', 'স্পেস'), l('O(states)', 'O(states)')],
          ],
        } },
        { p: l('For example, the longest common subsequence of two strings of lengths m and n has m×n states and O(1) work each, so O(m·n) time and space. Space can often be reduced when each state only depends on the previous row or the last few values — Fibonacci, for instance, needs only two variables, giving O(1) space.', 'উদাহরণস্বরূপ, m ও n দৈর্ঘ্যের দুটি স্ট্রিংয়ের longest common subsequence-এ m×n state ও প্রতিটিতে O(1) কাজ, তাই O(m·n) সময় ও স্পেস। প্রতিটি state যখন কেবল আগের row বা শেষ কয়েকটি মানের ওপর নির্ভর করে তখন স্পেস প্রায়ই কমানো যায়—যেমন Fibonacci-তে কেবল দুটি variable লাগে, যা O(1) স্পেস দেয়।') },
      ],
    },
    {
      h: l('When and where to use it', 'কোথায় ও কখন ব্যবহার করবেন'),
      blocks: [
        { list: [
          l('Optimization over sequences: longest common/increasing subsequence, edit distance, matrix-chain multiplication.', 'সিকোয়েন্সের ওপর অপটিমাইজেশন: longest common/increasing subsequence, edit distance, matrix-chain multiplication।'),
          l('Counting problems: number of ways to climb stairs, make change, or reach a grid cell.', 'গণনা সমস্যা: সিঁড়ি ওঠা, খুচরা ফেরত, বা একটি grid cell-এ পৌঁছানোর উপায় সংখ্যা।'),
          l('Resource-allocation optima: 0/1 knapsack, coin change (minimum coins), partition problems.', 'রিসোর্স-বণ্টন অপটিমা: 0/1 knapsack, coin change (ন্যূনতম মুদ্রা), partition সমস্যা।'),
          l('Anywhere a recursion recomputes the same subproblems and the best answer is built from best sub-answers.', 'যেখানেই একটি রিকার্শন একই সাবপ্রবলেম আবার হিসাব করে ও সেরা উত্তর সেরা সাব-উত্তর থেকে তৈরি হয়।'),
        ] },
        { p: l('Reach for DP when you spot overlapping subproblems and optimal substructure together. If subproblems do not repeat, plain divide-and-conquer or recursion is enough. If a provably safe local choice exists, greedy is faster and simpler. DP is the middle ground: it must consider multiple options at each state, but it avoids the exponential blow-up by never recomputing.', 'DP নিন যখন overlapping subproblem ও optimal substructure একসঙ্গে দেখেন। সাবপ্রবলেম পুনরাবৃত্ত না হলে সাধারণ divide-and-conquer বা রিকার্শনই যথেষ্ট। প্রমাণযোগ্যভাবে নিরাপদ স্থানীয় পছন্দ থাকলে greedy দ্রুত ও সরল। DP মাঝের অবস্থান: এটিকে প্রতিটি state-এ একাধিক বিকল্প বিবেচনা করতে হয়, তবে কখনো আবার হিসাব না করে এক্সপোনেনশিয়াল বিস্ফোরণ এড়ায়।') },
      ],
    },
    {
      h: l('Common mistakes', 'সাধারণ ভুল'),
      blocks: [
        { list: [
          l('Applying DP without a correct recurrence: if the relationship between states is wrong, the whole table is wrong. Get the recurrence right before writing code.', 'সঠিক recurrence ছাড়া DP প্রয়োগ: state-এর মধ্যে সম্পর্ক ভুল হলে পুরো টেবিল ভুল। কোড লেখার আগে recurrence ঠিক করুন।'),
          l('Recomputing subproblems you already solved — forgetting to actually store and reuse answers turns DP back into slow exponential recursion.', 'ইতিমধ্যে সমাধান করা সাবপ্রবলেম আবার হিসাব করা—উত্তর সত্যিই সংরক্ষণ ও পুনঃব্যবহার করতে ভুলে গেলে DP আবার ধীর এক্সপোনেনশিয়াল রিকার্শনে ফেরে।'),
          l('Wrong or missing base cases, so the recurrence has no correct starting point and fills the table with garbage.', 'ভুল বা অনুপস্থিত base case, ফলে recurrence-এর সঠিক শুরু নেই ও টেবিল আবর্জনায় ভরে।'),
          l('Choosing a state that does not capture everything the answer depends on, so different situations collide in the same cell.', 'এমন state বাছা যা উত্তর যার ওপর নির্ভর করে তার সবকিছু ধরে না, ফলে ভিন্ন পরিস্থিতি একই cell-এ সংঘর্ষ করে।'),
        ] },
      ],
    },
    {
      h: l('Remember in one line', 'এক লাইনে মনে রাখুন'),
      blocks: [
        { list: [
          l('DP solves each overlapping subproblem once and reuses the answer, turning exponential recursion into polynomial time.', 'DP প্রতিটি overlapping সাবপ্রবলেম একবার সমাধান করে ও উত্তর পুনঃব্যবহার করে, এক্সপোনেনশিয়াল রিকার্শনকে পলিনোমিয়াল সময়ে নামায়।'),
          l('Two styles: top-down memoization (cache a recursion) and bottom-up tabulation (fill a table); both need state, recurrence, and base cases.', 'দুটি ধরন: top-down memoization (একটি রিকার্শন cache) ও bottom-up tabulation (একটি টেবিল ভরা); দুটোরই state, recurrence ও base case দরকার।'),
          l('Time = states × work per state; use DP when you see overlapping subproblems plus optimal substructure.', 'সময় = states × প্রতি state-এর কাজ; overlapping subproblem ও optimal substructure দেখলে DP নিন।'),
        ] },
      ],
    },
  ],
}
