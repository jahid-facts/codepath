// Deep, structured teaching guides (bilingual) for DSA graph topics.
// Each guide is an array of sections; each section has a heading (h) and ordered
// content blocks: { p } paragraph, { list } bullets, { steps } numbered,
// { table } {head, rows}, { note, kind } callout, or { code, caption }.
// Facts (complexity, behaviour) mirror app/courses/dsa.js.

const l = (en, bn) => ({ en, bn })

export default {
  // ── Breadth-first search (BFS) ────────────────────────────────────────────
  'dsa-bfs': [
    {
      h: l('What is BFS?', 'BFS কী?'),
      blocks: [
        { p: l('Breadth-first search (BFS) is a way to visit every reachable node of a graph, starting from one node and expanding outward one layer at a time. It explores all nodes one edge away first, then everything two edges away, then three, and so on — never going deep until the current level is fully explored.', 'ব্রেডথ-ফার্স্ট সার্চ (BFS) হলো একটি গ্রাফের প্রতিটি পৌঁছানো-যায় এমন নোড দেখার উপায়, যা একটি নোড থেকে শুরু করে একবারে একটি স্তর করে বাইরের দিকে ছড়ায়। এটি আগে এক এজ দূরের সব নোড দেখে, তারপর দুই এজ দূরের সব, তারপর তিন—বর্তমান স্তর পুরো শেষ না হওয়া পর্যন্ত কখনো গভীরে যায় না।') },
        { p: l('The core problem BFS solves is finding the shortest path in an unweighted graph — the path that uses the fewest edges. Because BFS reaches every node in increasing order of distance from the start, the very first time it touches a node, it has found the shortest possible route to it. That single guarantee is what makes BFS the go-to tool for "how far apart are these two things?" questions.', 'BFS যে মূল সমস্যা সমাধান করে তা হলো আনওয়েটেড গ্রাফে সবচেয়ে ছোট পথ খোঁজা—যে পথে সবচেয়ে কম এজ লাগে। যেহেতু BFS প্রতিটি নোডে শুরুর বিন্দু থেকে দূরত্বের ক্রমবর্ধমান ক্রমে পৌঁছায়, প্রথমবার যখন এটি কোনো নোড স্পর্শ করে, তখনই সেটিতে সম্ভাব্য সবচেয়ে ছোট পথ পেয়ে যায়। এই একটি গ্যারান্টিই BFS-কে "এই দুটি জিনিস কত দূরে?" প্রশ্নের প্রধান হাতিয়ার বানায়।') },
        { note: l('Picture dropping a stone in still water. The ripples spread outward one ring at a time — every point on the first ring is reached before any point on the second. BFS explores a graph exactly like those expanding rings.', 'শান্ত পানিতে একটি পাথর ফেলার কথা ভাবুন। ঢেউ একবারে একটি বলয় করে বাইরে ছড়ায়—প্রথম বলয়ের প্রতিটি বিন্দু দ্বিতীয়টির কোনো বিন্দুর আগে পৌঁছায়। BFS ঠিক সেই ছড়ানো বলয়ের মতো গ্রাফ অন্বেষণ করে।'), kind: 'tip' },
      ],
    },
    {
      h: l('How BFS works, step by step', 'BFS কীভাবে কাজ করে, ধাপে ধাপে'),
      blocks: [
        { p: l('BFS relies on two things: a queue (first-in, first-out) that holds the nodes waiting to be explored, and a visited set that stops you from processing the same node twice. The queue is what enforces level-by-level order.', 'BFS দুটি জিনিসের ওপর নির্ভর করে: একটি queue (ফার্স্ট-ইন, ফার্স্ট-আউট) যা অন্বেষণের অপেক্ষায় থাকা নোডগুলো ধরে রাখে, আর একটি visited সেট যা একই নোড দুবার প্রসেস করা থেকে আটকায়। queue-ই স্তর-ধরে-স্তর ক্রম নিশ্চিত করে।') },
        { steps: [
          l('Put the start node in the queue and mark it visited.', 'শুরুর নোডটি queue-তে রাখুন ও visited চিহ্নিত করুন।'),
          l('Take the node at the front of the queue (dequeue it) and process it — for shortest paths, record its distance.', 'queue-এর সামনের নোডটি নিন (dequeue) ও প্রসেস করুন—সবচেয়ে ছোট পথের জন্য এর দূরত্ব লিখে রাখুন।'),
          l('Look at each of its neighbors. For every neighbor not yet visited, mark it visited and add it to the back of the queue.', 'এর প্রতিটি প্রতিবেশী দেখুন। যে প্রতিবেশী এখনো visited নয়, তাকে visited চিহ্নিত করে queue-এর পেছনে যোগ করুন।'),
          l('Marking a node visited the moment you enqueue it (not when you dequeue it) is what prevents adding the same node many times.', 'একটি নোডকে enqueue করার মুহূর্তেই visited চিহ্নিত করা (dequeue করার সময় নয়) একই নোড বহুবার যোগ হওয়া থেকে আটকায়।'),
          l('Repeat until the queue is empty. By then every reachable node has been visited in order of distance.', 'queue খালি না হওয়া পর্যন্ত পুনরাবৃত্তি করুন। ততক্ষণে প্রতিটি পৌঁছানো-যায় নোড দূরত্বের ক্রমে দেখা হয়ে গেছে।'),
        ] },
        { code: `BFS(graph, start):
  visited = empty set
  queue   = empty queue
  dist    = map, default infinity

  add start to visited
  enqueue start
  dist[start] = 0

  while queue is not empty:
    node = dequeue()                 # front of the queue
    for each neighbor of node:
      if neighbor not in visited:
        add neighbor to visited      # mark on enqueue, not dequeue
        dist[neighbor] = dist[node] + 1
        enqueue neighbor

  return dist`, caption: l('The first time a node is reached, dist already holds its shortest (fewest-edge) distance from start.', 'একটি নোডে প্রথমবার পৌঁছানোর সময়ই dist-এ শুরু থেকে তার সবচেয়ে ছোট (সবচেয়ে কম এজ) দূরত্ব থাকে।') },
      ],
    },
    {
      h: l('Complexity', 'জটিলতা'),
      blocks: [
        { p: l('BFS visits each node once and looks at each edge once, so its cost is linear in the size of the graph. V is the number of vertices (nodes) and E the number of edges.', 'BFS প্রতিটি নোড একবার দেখে ও প্রতিটি এজ একবার দেখে, তাই এর খরচ গ্রাফের আকারে লিনিয়ার। V হলো ভার্টেক্স (নোড) সংখ্যা ও E হলো এজ সংখ্যা।') },
        { table: {
          head: [l('Measure', 'পরিমাপ'), l('Cost', 'খরচ'), l('Why', 'কেন')],
          rows: [
            [l('Time', 'সময়'), l('O(V + E)', 'O(V + E)'), l('Each vertex is dequeued once; each edge is examined once.', 'প্রতিটি ভার্টেক্স একবার dequeue হয়; প্রতিটি এজ একবার পরীক্ষা হয়।')],
            [l('Space', 'স্পেস'), l('O(V)', 'O(V)'), l('The queue and visited set can hold up to a whole level of nodes.', 'queue ও visited সেট একটি পুরো স্তরের নোড পর্যন্ত ধরতে পারে।')],
          ],
        } },
        { note: l('The O(V) space is BFS’s real cost: on a wide graph, one "frontier" level can contain a huge fraction of all nodes at once. If memory is tight and you only need to know a path exists, DFS may fit better.', 'O(V) স্পেসই BFS-এর আসল খরচ: একটি চওড়া গ্রাফে একটি "frontier" স্তর একসঙ্গে সব নোডের বিরাট অংশ ধরতে পারে। মেমরি কম হলে আর শুধু পথ আছে কি না জানতে চাইলে DFS বেশি মানানসই হতে পারে।'), kind: 'warn' },
      ],
    },
    {
      h: l('When and where to use BFS', 'BFS কোথায় ও কখন ব্যবহার করবেন'),
      blocks: [
        { p: l('Reach for BFS whenever "fewest steps" or "nearest first" is the question, and every edge counts the same.', 'যখন প্রশ্নটি "সবচেয়ে কম ধাপ" বা "কাছেরটি আগে" আর প্রতিটি এজের ওজন সমান, তখন BFS নিন।') },
        { list: [
          l('Shortest path in an unweighted graph — the shortest route in a maze, fewest hops in a network, degrees of separation between two people.', 'আনওয়েটেড গ্রাফে সবচেয়ে ছোট পথ—গোলকধাঁধায় সবচেয়ে ছোট পথ, নেটওয়ার্কে সবচেয়ে কম হপ, দুই ব্যক্তির মধ্যে সংযোগের দূরত্ব।'),
          l('Nearest-first exploration — find the closest item matching some rule, like the nearest open cell or the friend-of-a-friend most likely to know you.', 'কাছের-আগে অন্বেষণ—কোনো নিয়ম মেলানো সবচেয়ে কাছের আইটেম খোঁজা, যেমন সবচেয়ে কাছের খালি সেল বা সবচেয়ে সম্ভাব্য পরিচিত বন্ধুর-বন্ধু।'),
          l('Level-order traversal of a tree — visiting nodes floor by floor.', 'ট্রি-র লেভেল-অর্ডার ট্রাভার্সাল—তলা ধরে ধরে নোড দেখা।'),
          l('Grid problems — flood fill, spreading infections, or shortest steps for a piece on a board.', 'গ্রিড সমস্যা—flood fill, সংক্রমণ ছড়ানো, বা বোর্ডে একটি ঘুঁটির সবচেয়ে কম ধাপ।'),
        ] },
        { p: l('Pick BFS over DFS when you need the shortest path or nearest results; pick DFS when you only need to reach everything, want to detect cycles, or need a topological order. And if edges carry different weights, plain BFS no longer gives the shortest path — you need Dijkstra instead.', 'DFS-এর বদলে BFS নিন যখন সবচেয়ে ছোট পথ বা কাছের ফল দরকার; DFS নিন যখন শুধু সবকিছুতে পৌঁছাতে চান, সাইকেল শনাক্ত করতে চান, বা টপোলজিক্যাল ক্রম দরকার। আর এজে ভিন্ন ওজন থাকলে সাধারণ BFS আর সবচেয়ে ছোট পথ দেয় না—তখন Dijkstra লাগবে।') },
      ],
    },
    {
      h: l('Common mistakes', 'সাধারণ ভুল'),
      blocks: [
        { list: [
          l('Forgetting the visited set. On a graph with cycles this makes BFS revisit nodes endlessly, looping forever or exploding in memory.', 'visited সেট ভুলে যাওয়া। সাইকেলযুক্ত গ্রাফে এটি BFS-কে নোড বারবার দেখায়, অনন্তকাল লুপ করে বা মেমরিতে বিস্ফোরিত হয়।'),
          l('Marking a node visited when you dequeue it instead of when you enqueue it — the same node then gets pushed multiple times before it is processed.', 'dequeue করার সময় নোড visited চিহ্নিত করা, enqueue করার সময় নয়—তখন প্রসেস হওয়ার আগেই একই নোড বহুবার পুশ হয়।'),
          l('Using a stack (or recursion) instead of a queue. That turns the algorithm into DFS and quietly breaks the shortest-path guarantee.', 'queue-এর বদলে stack (বা রিকার্শন) ব্যবহার করা। এটি অ্যালগরিদমকে DFS বানায় ও নীরবে সবচেয়ে ছোট পথের গ্যারান্টি ভাঙে।'),
          l('Expecting BFS to give shortest paths on a weighted graph. It counts edges, not weights, so a 3-edge cheap path loses to a 2-edge expensive one.', 'ওয়েটেড গ্রাফে BFS সবচেয়ে ছোট পথ দেবে আশা করা। এটি ওজন নয়, এজ গোনে, তাই ৩-এজের সস্তা পথ ২-এজের ব্যয়বহুল পথের কাছে হারে।'),
        ] },
      ],
    },
    {
      h: l('Remember in one line', 'এক লাইনে মনে রাখুন'),
      blocks: [
        { list: [
          l('BFS explores level by level with a queue, so the first time it reaches a node it has the fewest-edge path to it.', 'BFS queue দিয়ে স্তর-ধরে অন্বেষণ করে, তাই একটি নোডে প্রথমবার পৌঁছানোর সময়ই তার সবচেয়ে-কম-এজ পথ থাকে।'),
          l('Cost is O(V + E) time and O(V) space; always keep a visited set to avoid infinite loops on cycles.', 'খরচ O(V + E) সময় ও O(V) স্পেস; সাইকেলে অনন্ত লুপ এড়াতে সবসময় visited সেট রাখুন।'),
          l('Use it for shortest paths in unweighted graphs; switch to Dijkstra the moment edges have weights.', 'আনওয়েটেড গ্রাফে সবচেয়ে ছোট পথে ব্যবহার করুন; এজে ওজন এলেই Dijkstra-তে যান।'),
        ] },
      ],
    },
  ],

  // ── Depth-first search (DFS) ──────────────────────────────────────────────
  'dsa-dfs': [
    {
      h: l('What is DFS?', 'DFS কী?'),
      blocks: [
        { p: l('Depth-first search (DFS) visits every reachable node of a graph, but instead of spreading outward like BFS, it commits to one path and follows it as deep as possible. Only when it hits a dead end — a node with no unvisited neighbors — does it back up to the last junction and try the next unexplored branch.', 'ডেপথ-ফার্স্ট সার্চ (DFS) একটি গ্রাফের প্রতিটি পৌঁছানো-যায় নোড দেখে, কিন্তু BFS-এর মতো বাইরে না ছড়িয়ে এটি একটি পথ বেছে নিয়ে যতটা সম্ভব গভীরে অনুসরণ করে। শুধু যখন একটি ডেড-এন্ডে পৌঁছায়—যে নোডের কোনো অ-দেখা প্রতিবেশী নেই—তখনই এটি শেষ সংযোগস্থলে ফিরে গিয়ে পরের অ-অন্বেষিত শাখা চেষ্টা করে।') },
        { p: l('The problem DFS solves is thorough exploration: reaching every corner of a structure and understanding how it is connected. It is the natural engine behind cycle detection, topological sorting, finding connected components, and answering "is there any path from A to B?". It shines when you must exhaust possibilities rather than find the closest one.', 'DFS যে সমস্যা সমাধান করে তা হলো সম্পূর্ণ অন্বেষণ: একটি স্ট্রাকচারের প্রতিটি কোণে পৌঁছানো ও এটি কীভাবে যুক্ত তা বোঝা। এটি সাইকেল শনাক্ত, টপোলজিক্যাল সর্ট, কানেক্টেড কম্পোনেন্ট খোঁজা ও "A থেকে B-তে কোনো পথ আছে কি?" উত্তরের স্বাভাবিক ইঞ্জিন। কাছেরটি খোঁজার বদলে যখন সব সম্ভাবনা নিঃশেষ করতে হয় তখন এটি উজ্জ্বল।') },
        { note: l('Think of exploring a maze with one hand always on the wall. You walk forward down a corridor until it dead-ends, then step back to the last fork and take a different turn. You never teleport to a far part of the maze — you unwind exactly one step at a time.', 'একটি গোলকধাঁধা অন্বেষণের কথা ভাবুন যেখানে একটি হাত সবসময় দেয়ালে। আপনি একটি করিডোর ধরে এগোতে থাকেন যতক্ষণ না ডেড-এন্ড আসে, তারপর শেষ মোড়ে ফিরে গিয়ে ভিন্ন দিকে যান। আপনি কখনো গোলকধাঁধার দূরের অংশে টেলিপোর্ট করেন না—একবারে ঠিক এক ধাপ পিছিয়ে আসেন।'), kind: 'tip' },
      ],
    },
    {
      h: l('How DFS works, step by step', 'DFS কীভাবে কাজ করে, ধাপে ধাপে'),
      blocks: [
        { p: l('DFS can be written two ways: recursively (letting the function call stack remember where to back up to) or iteratively with an explicit stack. Both use a visited set for the same reason BFS does — to avoid looping forever on cycles.', 'DFS দুইভাবে লেখা যায়: রিকার্সিভভাবে (ফাংশনের call stack মনে রাখে কোথায় ফিরতে হবে) বা একটি স্পষ্ট stack দিয়ে ইটারেটিভভাবে। BFS-এর মতো একই কারণে দুটোই visited সেট ব্যবহার করে—সাইকেলে চিরকাল লুপ করা এড়াতে।') },
        { steps: [
          l('Start at a node, mark it visited, and process it.', 'একটি নোডে শুরু করুন, visited চিহ্নিত করুন ও প্রসেস করুন।'),
          l('Pick any unvisited neighbor and recurse into it — going one step deeper.', 'যেকোনো অ-দেখা প্রতিবেশী বাছুন ও তার ভেতরে রিকার্স করুন—এক ধাপ গভীরে যান।'),
          l('Keep going deeper until you reach a node whose neighbors are all visited (a dead end).', 'গভীরে যেতে থাকুন যতক্ষণ না এমন নোডে পৌঁছান যার সব প্রতিবেশী visited (একটি ডেড-এন্ড)।'),
          l('Return (backtrack) to the previous node and try its next unvisited neighbor.', 'আগের নোডে ফিরুন (backtrack) ও তার পরের অ-দেখা প্রতিবেশী চেষ্টা করুন।'),
          l('When every branch from the start has been exhausted, DFS is done and has touched every reachable node.', 'শুরু থেকে প্রতিটি শাখা নিঃশেষ হলে DFS শেষ এবং প্রতিটি পৌঁছানো-যায় নোড স্পর্শ করেছে।'),
        ] },
        { code: `# Recursive form
DFS(graph, node, visited):
  add node to visited
  process(node)
  for each neighbor of node:
    if neighbor not in visited:
      DFS(graph, neighbor, visited)

# Iterative form with an explicit stack
DFS_iter(graph, start):
  visited = empty set
  stack   = [start]
  while stack is not empty:
    node = stack.pop()               # top of the stack (LIFO)
    if node in visited: continue
    add node to visited
    process(node)
    for each neighbor of node:
      if neighbor not in visited:
        stack.push(neighbor)`, caption: l('The only structural difference from BFS is a stack (LIFO) instead of a queue (FIFO) — that one swap turns "nearest first" into "deepest first".', 'BFS থেকে একমাত্র কাঠামোগত পার্থক্য হলো queue (FIFO)-র বদলে stack (LIFO)—সেই একটি অদলবদল "কাছেরটি আগে"-কে "গভীরতমটি আগে" বানায়।') },
      ],
    },
    {
      h: l('Complexity', 'জটিলতা'),
      blocks: [
        { p: l('Like BFS, DFS touches every node once and every edge once, so time is linear. Its space is the depth of the recursion (or the stack), which in the worst case is every node on one long path.', 'BFS-এর মতো DFS প্রতিটি নোড একবার ও প্রতিটি এজ একবার স্পর্শ করে, তাই সময় লিনিয়ার। এর স্পেস হলো রিকার্শনের (বা stack-এর) গভীরতা, যা ওয়ার্স্ট-কেসে একটি লম্বা পথের প্রতিটি নোড।') },
        { table: {
          head: [l('Measure', 'পরিমাপ'), l('Cost', 'খরচ'), l('Why', 'কেন')],
          rows: [
            [l('Time', 'সময়'), l('O(V + E)', 'O(V + E)'), l('Every vertex and every edge is processed once.', 'প্রতিটি ভার্টেক্স ও প্রতিটি এজ একবার প্রসেস হয়।')],
            [l('Space', 'স্পেস'), l('O(V)', 'O(V)'), l('The call stack (or explicit stack) can grow to the length of the deepest path.', 'call stack (বা স্পষ্ট stack) সবচেয়ে গভীর পথের দৈর্ঘ্য পর্যন্ত বাড়তে পারে।')],
          ],
        } },
        { note: l('DFS usually keeps fewer nodes in memory at once than BFS, because it holds only one path rather than a whole frontier. But on a very deep graph, recursion can overflow the call stack — switch to the iterative stack version when depth may be huge.', 'DFS সাধারণত BFS-এর চেয়ে একসঙ্গে কম নোড মেমরিতে রাখে, কারণ এটি পুরো frontier নয় শুধু একটি পথ ধরে রাখে। তবে খুব গভীর গ্রাফে রিকার্শন call stack ওভারফ্লো করতে পারে—গভীরতা বিশাল হতে পারলে ইটারেটিভ stack সংস্করণে যান।'), kind: 'warn' },
      ],
    },
    {
      h: l('When and where to use DFS', 'DFS কোথায় ও কখন ব্যবহার করবেন'),
      blocks: [
        { p: l('DFS is the right tool when you need to explore fully, not shortest-path. Because it naturally remembers the current path, it excels at questions about structure and reachability.', 'DFS সঠিক হাতিয়ার যখন সম্পূর্ণ অন্বেষণ দরকার, সবচেয়ে ছোট পথ নয়। যেহেতু এটি স্বাভাবিকভাবেই বর্তমান পথ মনে রাখে, এটি স্ট্রাকচার ও পৌঁছানোর প্রশ্নে চমৎকার।') },
        { list: [
          l('Cycle detection — if DFS meets a node that is still on the current path, there is a cycle.', 'সাইকেল শনাক্ত—DFS যদি এমন নোডে পৌঁছায় যা এখনো বর্তমান পথে আছে, তবে একটি সাইকেল আছে।'),
          l('Topological sort — DFS post-order (reversed) yields a valid ordering of a DAG.', 'টপোলজিক্যাল সর্ট—DFS পোস্ট-অর্ডার (উল্টানো) একটি DAG-এর বৈধ ক্রম দেয়।'),
          l('Connected components — run DFS from each unvisited node to label separate groups.', 'কানেক্টেড কম্পোনেন্ট—আলাদা গ্রুপ চিহ্নিত করতে প্রতিটি অ-দেখা নোড থেকে DFS চালান।'),
          l('Path existence and enumeration — "is there any path from A to B?" and generating all paths or solutions (backtracking).', 'পথ থাকা ও গণনা—"A থেকে B-তে কোনো পথ আছে কি?" এবং সব পথ বা সমাধান তৈরি (backtracking)।'),
        ] },
        { p: l('Choose DFS over BFS when memory for a wide frontier would be too large, when you need one of the structural results above, or when any path (not the shortest) is fine. Choose BFS when the shortest or nearest answer is what matters.', 'BFS-এর বদলে DFS নিন যখন চওড়া frontier-এর মেমরি বেশি হতো, যখন ওপরের কাঠামোগত ফলগুলোর একটি দরকার, বা যেকোনো পথ (সবচেয়ে ছোট নয়) চললে। BFS নিন যখন সবচেয়ে ছোট বা কাছের উত্তরই গুরুত্বপূর্ণ।') },
        { p: l('A helpful way to remember the pairing: BFS and DFS have identical O(V + E) time and differ only in one data structure — a queue versus a stack — yet that single difference changes everything about the order they discover nodes and the problems each is good at. Learn both as two sides of the same traversal coin.', 'জোড়াটি মনে রাখার একটি সহায়ক উপায়: BFS ও DFS-এর একই O(V + E) সময় ও পার্থক্য শুধু একটি ডেটা স্ট্রাকচারে—queue বনাম stack—তবু সেই একটি পার্থক্য নোড আবিষ্কারের ক্রম ও প্রতিটি কোন সমস্যায় ভালো তার সবকিছু বদলে দেয়। দুটোকে একই ট্রাভার্সাল মুদ্রার দুই পিঠ হিসেবে শিখুন।') },
      ],
    },
    {
      h: l('Common mistakes', 'সাধারণ ভুল'),
      blocks: [
        { list: [
          l('Assuming DFS finds shortest paths. It does not — the first path it finds to a node can be far longer than necessary. For fewest edges, use BFS.', 'DFS সবচেয়ে ছোট পথ খুঁজে ধরে নেওয়া। এটি করে না—কোনো নোডে এটি প্রথমে যে পথ পায় তা দরকারের চেয়ে অনেক লম্বা হতে পারে। সবচেয়ে কম এজে BFS নিন।'),
          l('Recursing on a deep graph and overflowing the call stack; use an explicit stack when depth can be large.', 'গভীর গ্রাফে রিকার্স করে call stack ওভারফ্লো করা; গভীরতা বড় হতে পারলে স্পষ্ট stack ব্যবহার করুন।'),
          l('Forgetting the visited set, so cycles trap DFS in an endless loop.', 'visited সেট ভুলে যাওয়া, ফলে সাইকেল DFS-কে অনন্ত লুপে আটকায়।'),
          l('For cycle detection, confusing "already visited" with "still on the current path". A finished branch is visited but is not a cycle.', 'সাইকেল শনাক্তে "ইতিমধ্যে visited"-কে "এখনো বর্তমান পথে আছে"-র সঙ্গে গুলিয়ে ফেলা। একটি শেষ হওয়া শাখা visited তবে সাইকেল নয়।'),
        ] },
      ],
    },
    {
      h: l('Remember in one line', 'এক লাইনে মনে রাখুন'),
      blocks: [
        { list: [
          l('DFS goes as deep as possible, then backtracks — powered by recursion or an explicit stack.', 'DFS যতটা সম্ভব গভীরে যায়, তারপর backtrack করে—রিকার্শন বা স্পষ্ট stack দিয়ে চলে।'),
          l('Cost is O(V + E) time and O(V) space; keep a visited set and beware deep recursion.', 'খরচ O(V + E) সময় ও O(V) স্পেস; visited সেট রাখুন ও গভীর রিকার্শনে সতর্ক থাকুন।'),
          l('Use it for cycle detection, topological sort, and connected components — not for shortest paths.', 'সাইকেল শনাক্ত, টপোলজিক্যাল সর্ট ও কানেক্টেড কম্পোনেন্টে ব্যবহার করুন—সবচেয়ে ছোট পথে নয়।'),
        ] },
      ],
    },
  ],

  // ── Topological sort ──────────────────────────────────────────────────────
  'dsa-topological-sort': [
    {
      h: l('What is topological sort?', 'টপোলজিক্যাল সর্ট কী?'),
      blocks: [
        { p: l('Topological sort takes a directed acyclic graph (a DAG) and produces a linear ordering of its nodes such that every edge points forward — if there is an edge from A to B, then A appears before B in the order. It is a way to turn a web of dependencies into a straight, safe to-do list.', 'টপোলজিক্যাল সর্ট একটি ডিরেক্টেড অ্যাসাইক্লিক গ্রাফ (একটি DAG) নেয় ও এর নোডের একটি রৈখিক ক্রম তৈরি করে যাতে প্রতিটি এজ সামনে নির্দেশ করে—A থেকে B-তে এজ থাকলে ক্রমে A, B-এর আগে আসে। এটি নির্ভরতার জাল-কে একটি সোজা, নিরাপদ করণীয়-তালিকায় পরিণত করার উপায়।') },
        { p: l('The problem it solves is ordering tasks that depend on one another. Whenever "you must do X before Y", you have a dependency graph, and a topological order is a sequence that never violates a single "before" rule. If any such order exists, the graph must have no cycle — a cycle would mean X depends on Y and Y depends on X, which can never be scheduled.', 'এটি যে সমস্যা সমাধান করে তা হলো পরস্পর-নির্ভর কাজ সাজানো। যখনই "Y-এর আগে X করতে হবে", আপনার একটি dependency graph আছে, আর টপোলজিক্যাল ক্রম হলো এমন একটি ক্রম যা একটিও "আগে" নিয়ম ভাঙে না। এমন কোনো ক্রম থাকলে গ্রাফে কোনো সাইকেল থাকতে পারে না—একটি সাইকেল মানে X, Y-এর ওপর ও Y, X-এর ওপর নির্ভর করে, যা কখনো শিডিউল করা যায় না।') },
        { note: l('Think of university course prerequisites. You cannot take Algorithms before Data Structures, or Data Structures before Programming 101. A topological sort is a valid order to take every course so that each prerequisite is always finished first.', 'বিশ্ববিদ্যালয়ের কোর্স প্রি-রিকুইজিটের কথা ভাবুন। Data Structures-এর আগে Algorithms নেওয়া যায় না, বা Programming 101-এর আগে Data Structures নয়। টপোলজিক্যাল সর্ট হলো প্রতিটি কোর্স নেওয়ার একটি বৈধ ক্রম যাতে প্রতিটি প্রি-রিকুইজিট সবসময় আগে শেষ হয়।'), kind: 'tip' },
      ],
    },
    {
      h: l('How it works: Kahn’s algorithm', 'কীভাবে কাজ করে: কানের অ্যালগরিদম'),
      blocks: [
        { p: l('There are two standard methods. Kahn’s algorithm is the easiest to reason about: it repeatedly removes nodes that have no remaining prerequisites. The in-degree of a node is the number of edges pointing into it — how many things must come before it.', 'দুটি প্রমিত পদ্ধতি আছে। কানের অ্যালগরিদম বোঝা সবচেয়ে সহজ: এটি বারবার সেই নোডগুলো সরায় যাদের কোনো বাকি প্রি-রিকুইজিট নেই। একটি নোডের in-degree হলো এর দিকে নির্দেশ করা এজের সংখ্যা—এর আগে কতগুলো জিনিস আসতে হবে।') },
        { steps: [
          l('Compute the in-degree of every node.', 'প্রতিটি নোডের in-degree হিসাব করুন।'),
          l('Put every node with in-degree 0 (no prerequisites) into a queue.', 'in-degree 0 (কোনো প্রি-রিকুইজিট নেই) এমন প্রতিটি নোড একটি queue-তে রাখুন।'),
          l('Dequeue a node, append it to the output order, and "remove" it: for each neighbor, decrease its in-degree by one.', 'একটি নোড dequeue করুন, আউটপুট ক্রমে যোগ করুন, ও এটি "সরান": প্রতিটি প্রতিবেশীর in-degree এক কমান।'),
          l('Whenever a neighbor’s in-degree drops to 0, all its prerequisites are done, so enqueue it.', 'যখন কোনো প্রতিবেশীর in-degree 0-তে নামে, এর সব প্রি-রিকুইজিট শেষ, তাই একে enqueue করুন।'),
          l('Repeat until the queue is empty. If you output fewer nodes than the graph has, a cycle exists and no valid order is possible.', 'queue খালি না হওয়া পর্যন্ত পুনরাবৃত্তি করুন। গ্রাফের চেয়ে কম নোড আউটপুট করলে একটি সাইকেল আছে ও কোনো বৈধ ক্রম সম্ভব নয়।'),
        ] },
        { code: `Kahn(graph):
  indegree[v] = number of incoming edges, for every v
  queue = every v with indegree[v] == 0
  order = empty list

  while queue is not empty:
    node = dequeue()
    append node to order
    for each neighbor of node:
      indegree[neighbor] -= 1        # "remove" node's edge
      if indegree[neighbor] == 0:
        enqueue neighbor

  if length(order) < number of nodes:
    return "cycle detected: no valid ordering"
  return order`, caption: l('The cycle check is free: if some nodes never reach in-degree 0, they are stuck in a cycle and are never added to the order.', 'সাইকেল যাচাই বিনামূল্যে: কিছু নোড কখনো in-degree 0-তে না পৌঁছালে তারা একটি সাইকেলে আটকে ও ক্রমে কখনো যোগ হয় না।') },
        { p: l('The other method is DFS-based: run DFS, and as each node finishes (all its descendants explored), push it onto a stack. Reversing that stack — the post-order reversed — gives a valid topological order.', 'অন্য পদ্ধতিটি DFS-ভিত্তিক: DFS চালান, ও প্রতিটি নোড শেষ হলে (এর সব বংশধর অন্বেষিত) একে একটি stack-এ পুশ করুন। সেই stack উল্টানো—পোস্ট-অর্ডার উল্টানো—একটি বৈধ টপোলজিক্যাল ক্রম দেয়।') },
      ],
    },
    {
      h: l('Complexity', 'জটিলতা'),
      blocks: [
        { p: l('Both methods are just a graph traversal with a little bookkeeping, so they run in linear time.', 'দুটি পদ্ধতিই সামান্য হিসাব রাখাসহ একটি গ্রাফ ট্রাভার্সাল মাত্র, তাই এরা লিনিয়ার সময়ে চলে।') },
        { table: {
          head: [l('Measure', 'পরিমাপ'), l('Cost', 'খরচ'), l('Why', 'কেন')],
          rows: [
            [l('Time', 'সময়'), l('O(V + E)', 'O(V + E)'), l('Each node is added once; each edge is relaxed once when its source is removed.', 'প্রতিটি নোড একবার যোগ হয়; প্রতিটি এজ তার উৎস সরানোর সময় একবার রিল্যাক্স হয়।')],
            [l('Space', 'স্পেস'), l('O(V)', 'O(V)'), l('For the in-degree table, the queue (or DFS stack), and the output order.', 'in-degree টেবিল, queue (বা DFS stack) ও আউটপুট ক্রমের জন্য।')],
          ],
        } },
        { note: l('A DAG can have many valid topological orders, not just one. Kahn’s algorithm gives whichever order its queue happens to produce; both algorithms return a correct one, just not necessarily the same one.', 'একটি DAG-এর একটি নয়, অনেক বৈধ টপোলজিক্যাল ক্রম থাকতে পারে। কানের অ্যালগরিদম এর queue যে ক্রম তৈরি করে তা দেয়; দুটি অ্যালগরিদমই একটি সঠিক ক্রম দেয়, কিন্তু অগত্যা একই নয়।'), kind: 'tip' },
      ],
    },
    {
      h: l('When and where to use it', 'কোথায় ও কখন ব্যবহার করবেন'),
      blocks: [
        { p: l('Use topological sort anywhere tasks have "must-come-before" relationships and you need a safe order to run them.', 'যেখানে কাজের "আগে-আসতে-হবে" সম্পর্ক আছে ও চালানোর একটি নিরাপদ ক্রম দরকার, সেখানে টপোলজিক্যাল সর্ট ব্যবহার করুন।') },
        { list: [
          l('Build systems and package managers — compile or install dependencies before the things that need them.', 'বিল্ড সিস্টেম ও প্যাকেজ ম্যানেজার—যেগুলোর দরকার তার আগে নির্ভরতা কম্পাইল বা ইনস্টল করা।'),
          l('Task and job schedulers — run steps of a pipeline in dependency order.', 'টাস্ক ও জব শিডিউলার—নির্ভরতার ক্রমে একটি পাইপলাইনের ধাপ চালানো।'),
          l('Course prerequisites, spreadsheet cell recalculation, and resolving symbol or module references.', 'কোর্স প্রি-রিকুইজিট, স্প্রেডশিট সেল পুনর্গণনা, ও সিম্বল বা মডিউল রেফারেন্স সমাধান।'),
          l('Detecting whether a dependency graph even can be scheduled — the failure to sort tells you a cycle exists.', 'একটি dependency graph আদৌ শিডিউল করা যায় কি না শনাক্ত—সর্ট করতে না পারা মানে একটি সাইকেল আছে।'),
        ] },
        { p: l('It only applies to directed graphs, and only to acyclic ones. If your relationships can form a loop, topological sort is exactly the tool that will detect it and refuse to give a false answer.', 'এটি শুধু ডিরেক্টেড গ্রাফে ও শুধু অ্যাসাইক্লিক গ্রাফে প্রযোজ্য। আপনার সম্পর্ক একটি লুপ তৈরি করতে পারলে টপোলজিক্যাল সর্ট ঠিক সেই হাতিয়ার যা তা শনাক্ত করবে ও ভুল উত্তর দিতে অস্বীকার করবে।') },
        { p: l('Between the two methods, prefer Kahn’s algorithm when you also want easy cycle detection or a natural way to process nodes as they become ready — it reads like a real scheduler draining a work queue. Prefer the DFS approach when you are already doing a DFS for another reason, or want a compact recursive implementation. Both are O(V + E) and equally correct; the choice is about which fits the surrounding code.', 'দুই পদ্ধতির মধ্যে কানের অ্যালগরিদম নিন যখন সহজ সাইকেল শনাক্ত বা নোড প্রস্তুত হওয়ার সঙ্গে সঙ্গে প্রসেস করার স্বাভাবিক উপায়ও চান—এটি একটি বাস্তব শিডিউলারের work queue খালি করার মতো পড়ে। DFS পদ্ধতি নিন যখন অন্য কারণে ইতিমধ্যে DFS করছেন, বা একটি সংক্ষিপ্ত রিকার্সিভ বাস্তবায়ন চান। দুটোই O(V + E) ও সমানভাবে সঠিক; পছন্দ হলো কোনটি আশপাশের কোডের সঙ্গে মেলে।') },
      ],
    },
    {
      h: l('Common mistakes', 'সাধারণ ভুল'),
      blocks: [
        { list: [
          l('Running it on a graph with a cycle and not checking for one. The expanded mistake: silently returning a partial or wrong order instead of reporting that no valid order exists.', 'সাইকেলযুক্ত গ্রাফে চালিয়ে সাইকেল যাচাই না করা। বিস্তারিত ভুল: বৈধ ক্রম নেই তা না জানিয়ে নীরবে একটি আংশিক বা ভুল ক্রম ফেরত দেওয়া।'),
          l('Forgetting the cycle guard: with Kahn’s algorithm, always check that the output length equals the node count.', 'সাইকেল-রক্ষা ভুলে যাওয়া: কানের অ্যালগরিদমে সবসময় যাচাই করুন আউটপুটের দৈর্ঘ্য নোড সংখ্যার সমান কি না।'),
          l('Reversing the DFS order the wrong way — the topological order is the reverse of the finish (post-order), not the pre-order.', 'DFS ক্রম ভুলভাবে উল্টানো—টপোলজিক্যাল ক্রম হলো শেষ হওয়ার (পোস্ট-অর্ডার) উল্টো, প্রি-অর্ডারের নয়।'),
          l('Applying it to an undirected graph, where "before" and "after" are not defined and the concept does not apply.', 'আনডিরেক্টেড গ্রাফে প্রয়োগ করা, যেখানে "আগে" ও "পরে" সংজ্ঞায়িত নয় ও ধারণাটি খাটে না।'),
        ] },
      ],
    },
    {
      h: l('Remember in one line', 'এক লাইনে মনে রাখুন'),
      blocks: [
        { list: [
          l('Topological sort linearizes a DAG so every dependency comes before what needs it.', 'টপোলজিক্যাল সর্ট একটি DAG-কে রৈখিক করে যাতে প্রতিটি নির্ভরতা যা তা প্রয়োজন করে তার আগে আসে।'),
          l('Do it with Kahn’s algorithm (in-degrees + queue) or DFS post-order reversed, both O(V + E).', 'কানের অ্যালগরিদম (in-degree + queue) বা DFS পোস্ট-অর্ডার উল্টে করুন, দুটোই O(V + E)।'),
          l('It works only on a DAG — any cycle makes a valid order impossible, and a good implementation detects that.', 'এটি শুধু DAG-এ চলে—যেকোনো সাইকেল বৈধ ক্রম অসম্ভব করে, আর ভালো বাস্তবায়ন তা শনাক্ত করে।'),
        ] },
      ],
    },
  ],

  // ── Shortest paths (Dijkstra) ─────────────────────────────────────────────
  'dsa-shortest-path': [
    {
      h: l('What is Dijkstra’s algorithm?', 'ডাইক্সট্রা অ্যালগরিদম কী?'),
      blocks: [
        { p: l('Dijkstra’s algorithm finds the shortest path from one source node to every other node in a weighted graph, as long as all edge weights are non-negative. "Shortest" here means least total weight — the cheapest sum of edge costs — not the fewest edges.', 'ডাইক্সট্রা অ্যালগরিদম একটি ওয়েটেড গ্রাফে একটি সোর্স নোড থেকে বাকি প্রতিটি নোডে সবচেয়ে ছোট পথ খোঁজে, যতক্ষণ সব এজ-ওজন নন-নেগেটিভ। এখানে "সবচেয়ে ছোট" মানে সর্বনিম্ন মোট ওজন—এজ-খরচের সবচেয়ে সস্তা যোগফল—সবচেয়ে কম এজ নয়।') },
        { p: l('This is the weighted version of the problem BFS solves. BFS treats every edge as one step, so it fails the moment steps cost different amounts — a road that is 3 short hops may be far quicker than one that is 2 long ones. Dijkstra handles those weights by always expanding the cheapest-known node next, guaranteeing that once a node is settled, its recorded distance is truly the minimum.', 'এটি BFS যে সমস্যা সমাধান করে তার ওয়েটেড সংস্করণ। BFS প্রতিটি এজকে এক ধাপ ধরে, তাই ধাপের খরচ ভিন্ন হলেই এটি ব্যর্থ হয়—৩ ছোট হপের একটি পথ ২ লম্বা হপের চেয়ে অনেক দ্রুত হতে পারে। ডাইক্সট্রা সবসময় পরবর্তীতে সবচেয়ে-সস্তা-জানা নোড বাড়িয়ে সেই ওজন সামলায়, নিশ্চিত করে একবার একটি নোড মীমাংসিত হলে এর লেখা দূরত্বই সত্যিকারের সর্বনিম্ন।') },
        { note: l('It works like a GPS finding the fastest route. From where you are, it keeps expanding the cheapest road it knows about so far, filling in the shortest travel time to each intersection until it reaches your destination.', 'এটি একটি GPS-এর দ্রুততম পথ খোঁজার মতো কাজ করে। আপনি যেখানে আছেন সেখান থেকে এটি এ পর্যন্ত জানা সবচেয়ে সস্তা সড়ক বাড়াতে থাকে, প্রতিটি সংযোগস্থলে সবচেয়ে ছোট ভ্রমণ-সময় ভরে ফেলে যতক্ষণ না গন্তব্যে পৌঁছায়।'), kind: 'tip' },
      ],
    },
    {
      h: l('How it works, step by step', 'কীভাবে কাজ করে, ধাপে ধাপে'),
      blocks: [
        { p: l('Dijkstra keeps a tentative shortest distance to every node, starting at 0 for the source and infinity for everything else. A min-heap (priority queue) always hands back the unsettled node with the smallest tentative distance. The key operation is relaxation: checking whether going through the current node gives a neighbor a cheaper distance.', 'ডাইক্সট্রা প্রতিটি নোডে একটি সাময়িক সবচেয়ে ছোট দূরত্ব রাখে, সোর্সে 0 ও বাকি সবে infinity দিয়ে শুরু। একটি min-heap (priority queue) সবসময় সবচেয়ে ছোট সাময়িক দূরত্বযুক্ত অমীমাংসিত নোডটি ফেরত দেয়। মূল অপারেশন হলো relaxation: বর্তমান নোড দিয়ে গেলে একটি প্রতিবেশী সস্তা দূরত্ব পায় কি না তা যাচাই।') },
        { steps: [
          l('Set dist[source] = 0 and dist[everything else] = infinity. Put (0, source) in a min-heap.', 'dist[source] = 0 ও dist[বাকি সব] = infinity সেট করুন। min-heap-এ (0, source) রাখুন।'),
          l('Pop the node with the smallest distance from the heap. That distance is now final (settled).', 'heap থেকে সবচেয়ে ছোট দূরত্বের নোডটি pop করুন। সেই দূরত্ব এখন চূড়ান্ত (মীমাংসিত)।'),
          l('For each neighbor, relax the edge: if dist[node] + edge weight is less than dist[neighbor], update dist[neighbor] and push it on the heap.', 'প্রতিটি প্রতিবেশীর জন্য এজ relax করুন: dist[node] + এজ-ওজন যদি dist[neighbor]-এর চেয়ে কম হয়, dist[neighbor] হালনাগাদ করে heap-এ পুশ করুন।'),
          l('Skip any popped entry whose stored distance is larger than the best already known — it is a stale leftover.', 'যে pop-করা এন্ট্রির সঞ্চিত দূরত্ব ইতিমধ্যে জানা সেরার চেয়ে বড় তা বাদ দিন—এটি একটি পুরনো অবশিষ্ট।'),
          l('Repeat until the heap is empty. Then dist holds the shortest distance from the source to every reachable node.', 'heap খালি না হওয়া পর্যন্ত পুনরাবৃত্তি করুন। তারপর dist-এ সোর্স থেকে প্রতিটি পৌঁছানো-যায় নোডের সবচেয়ে ছোট দূরত্ব থাকে।'),
        ] },
        { code: `Dijkstra(graph, source):
  dist[v] = infinity for every v
  dist[source] = 0
  heap = min-heap holding (0, source)

  while heap is not empty:
    (d, u) = pop smallest from heap
    if d > dist[u]: continue          # stale entry, skip
    for each (v, weight) in neighbors(u):
      if dist[u] + weight < dist[v]:
        dist[v] = dist[u] + weight    # relax the edge
        push (dist[v], v) onto heap

  return dist`, caption: l('"Relaxing" an edge just means: if I can reach v more cheaply by going through u, write down that cheaper distance.', '"Relax" করা মানে শুধু: u দিয়ে গিয়ে v-তে সস্তায় পৌঁছাতে পারলে সেই সস্তা দূরত্ব লিখে রাখুন।') },
      ],
    },
    {
      h: l('Complexity', 'জটিলতা'),
      blocks: [
        { p: l('With a binary min-heap, every edge can push a new entry onto the heap, and each heap operation costs O(log V). That gives the standard bound below.', 'একটি বাইনারি min-heap দিয়ে প্রতিটি এজ heap-এ একটি নতুন এন্ট্রি পুশ করতে পারে, ও প্রতিটি heap অপারেশনের খরচ O(log V)। এটি নিচের প্রমিত সীমা দেয়।') },
        { table: {
          head: [l('Measure', 'পরিমাপ'), l('Cost', 'খরচ'), l('Why', 'কেন')],
          rows: [
            [l('Time (with heap)', 'সময় (হিপসহ)'), l('O((V + E) log V)', 'O((V + E) log V)'), l('Each vertex and edge triggers heap operations that cost O(log V) each.', 'প্রতিটি ভার্টেক্স ও এজ heap অপারেশন ঘটায় যার প্রতিটির খরচ O(log V)।')],
            [l('Space', 'স্পেস'), l('O(V)', 'O(V)'), l('For the distance table plus the heap of pending nodes.', 'দূরত্ব টেবিল ও অপেক্ষমাণ নোডের heap-এর জন্য।')],
          ],
        } },
        { note: l('Dijkstra is efficient only because it never revisits a settled node. That optimization is exactly why a negative edge breaks it: a negative weight could make an already-settled node cheaper later, but Dijkstra will never look again.', 'ডাইক্সট্রা দক্ষ শুধু এ কারণে যে এটি কখনো একটি মীমাংসিত নোড আবার দেখে না। সেই অপ্টিমাইজেশনই ঠিক কেন একটি নেগেটিভ এজ একে ভাঙে: একটি নেগেটিভ ওজন পরে একটি ইতিমধ্যে-মীমাংসিত নোডকে সস্তা করতে পারত, কিন্তু ডাইক্সট্রা আর কখনো দেখবে না।'), kind: 'warn' },
      ],
    },
    {
      h: l('Why the greedy choice is safe', 'গ্রিডি পছন্দ কেন নিরাপদ'),
      blocks: [
        { p: l('Dijkstra is greedy: at each step it commits to the closest unsettled node and never revisits it. Why is that safe? Because all weights are non-negative, no path discovered later can ever be shorter than the one already found to the closest node. Any alternative route to it would have to leave through some other unsettled node that is already at least as far away, and adding more non-negative edges can only make it longer. So the moment a node is popped as the cheapest, its distance is provably final.', 'ডাইক্সট্রা গ্রিডি: প্রতি ধাপে এটি সবচেয়ে কাছের অমীমাংসিত নোডে স্থির হয় ও কখনো আবার দেখে না। এটি কেন নিরাপদ? কারণ সব ওজন নন-নেগেটিভ, পরে আবিষ্কৃত কোনো পথ সবচেয়ে কাছের নোডে ইতিমধ্যে পাওয়া পথের চেয়ে ছোট হতে পারে না। এটিতে যেকোনো বিকল্প পথকে অন্য কোনো অমীমাংসিত নোড দিয়ে বেরোতে হবে যা ইতিমধ্যে অন্তত ততটা দূরে, আর আরও নন-নেগেটিভ এজ যোগ করলে তা শুধু লম্বাই হয়। তাই যে মুহূর্তে একটি নোড সবচেয়ে সস্তা হিসেবে pop হয়, এর দূরত্ব প্রমাণযোগ্যভাবে চূড়ান্ত।') },
        { p: l('This is exactly the assumption a negative edge violates. A negative weight could make a far-looking node suddenly cheaper after it was already settled — so the "provably final" guarantee collapses, and that is why Dijkstra returns wrong answers on negative edges rather than simply running slower.', 'এটিই ঠিক সেই অনুমান যা একটি নেগেটিভ এজ ভাঙে। একটি নেগেটিভ ওজন একটি দূর-মনে-হওয়া নোডকে মীমাংসিত হওয়ার পরে হঠাৎ সস্তা করতে পারে—তাই "প্রমাণযোগ্যভাবে চূড়ান্ত" গ্যারান্টি ভেঙে পড়ে, আর এ কারণেই ডাইক্সট্রা নেগেটিভ এজে শুধু ধীর না চলে ভুল উত্তর দেয়।') },
      ],
    },
    {
      h: l('When and where to use it', 'কোথায় ও কখন ব্যবহার করবেন'),
      blocks: [
        { p: l('Use Dijkstra whenever edges have non-negative weights and you need the least-cost path from a source.', 'যখন এজে নন-নেগেটিভ ওজন থাকে ও একটি সোর্স থেকে সর্বনিম্ন-খরচ পথ দরকার তখন ডাইক্সট্রা ব্যবহার করুন।') },
        { list: [
          l('Routing and navigation — fastest driving route, network packet routing by latency or cost.', 'রাউটিং ও নেভিগেশন—দ্রুততম ড্রাইভিং পথ, latency বা খরচ ধরে নেটওয়ার্ক প্যাকেট রাউটিং।'),
          l('Any least-cost problem on a weighted graph — cheapest flights, minimum-toll roads, lowest-latency server.', 'ওয়েটেড গ্রাফে যেকোনো সর্বনিম্ন-খরচ সমস্যা—সবচেয়ে সস্তা ফ্লাইট, সর্বনিম্ন-টোল সড়ক, সবচেয়ে কম-latency সার্ভার।'),
          l('Games and maps for weighted movement costs (though A* adds a heuristic to reach a single goal faster).', 'ওয়েটেড চলাচল-খরচের জন্য গেম ও ম্যাপ (যদিও একক লক্ষ্যে দ্রুত পৌঁছাতে A* একটি heuristic যোগ করে)।'),
        ] },
        { table: {
          head: [l('Situation', 'পরিস্থিতি'), l('Use', 'ব্যবহার')],
          rows: [
            [l('All edges cost the same (unweighted)', 'সব এজের খরচ সমান (আনওয়েটেড)'), l('BFS — simpler and faster', 'BFS—সরল ও দ্রুত')],
            [l('Non-negative weights', 'নন-নেগেটিভ ওজন'), l('Dijkstra', 'ডাইক্সট্রা')],
            [l('Some negative edges', 'কিছু নেগেটিভ এজ'), l('Bellman-Ford', 'বেলম্যান-ফোর্ড')],
          ],
        } },
      ],
    },
    {
      h: l('Common mistakes', 'সাধারণ ভুল'),
      blocks: [
        { list: [
          l('Running Dijkstra on a graph with negative edges and trusting the wrong result. It will finish and return numbers, but they can be silently incorrect — use Bellman-Ford when weights can be negative.', 'নেগেটিভ এজসহ গ্রাফে ডাইক্সট্রা চালিয়ে ভুল ফল বিশ্বাস করা। এটি শেষ হবে ও সংখ্যা দেবে, কিন্তু সেগুলো নীরবে ভুল হতে পারে—ওজন নেগেটিভ হতে পারলে বেলম্যান-ফোর্ড নিন।'),
          l('Using it on an unweighted graph where BFS would be simpler and faster.', 'আনওয়েটেড গ্রাফে ব্যবহার করা যেখানে BFS সরল ও দ্রুত হতো।'),
          l('Forgetting to skip stale heap entries — without the "if d > dist[u]: continue" check, the algorithm still works but does needless extra work.', 'পুরনো heap এন্ট্রি বাদ দিতে ভুলে যাওয়া—"if d > dist[u]: continue" যাচাই ছাড়া অ্যালগরিদম তবু চলে কিন্তু অপ্রয়োজনীয় বাড়তি কাজ করে।'),
          l('Confusing least total weight with fewest edges — Dijkstra minimizes summed cost, not hop count.', 'সর্বনিম্ন মোট ওজন ও সবচেয়ে কম এজ গুলিয়ে ফেলা—ডাইক্সট্রা যোগফল-খরচ কমায়, হপ সংখ্যা নয়।'),
        ] },
      ],
    },
    {
      h: l('Remember in one line', 'এক লাইনে মনে রাখুন'),
      blocks: [
        { list: [
          l('Dijkstra finds least-total-weight paths from a source, always expanding the cheapest unsettled node via a min-heap.', 'ডাইক্সট্রা একটি সোর্স থেকে সর্বনিম্ন-মোট-ওজন পথ খোঁজে, min-heap দিয়ে সবসময় সবচেয়ে সস্তা অমীমাংসিত নোড বাড়িয়ে।'),
          l('Cost is O((V + E) log V) with a heap and O(V) space; the core step is relaxing edges.', 'খরচ heap-সহ O((V + E) log V) ও O(V) স্পেস; মূল ধাপ হলো এজ relax করা।'),
          l('Non-negative weights only — use BFS if edges are unweighted, Bellman-Ford if any weight is negative.', 'শুধু নন-নেগেটিভ ওজন—এজ আনওয়েটেড হলে BFS, কোনো ওজন নেগেটিভ হলে বেলম্যান-ফোর্ড নিন।'),
        ] },
      ],
    },
  ],

  // ── Union-Find (disjoint sets) ────────────────────────────────────────────
  'dsa-union-find': [
    {
      h: l('What is Union-Find?', 'ইউনিয়ন-ফাইন্ড কী?'),
      blocks: [
        { p: l('Union-Find, also called a disjoint-set data structure, keeps track of a collection of elements partitioned into non-overlapping groups. It answers one kind of question extremely fast: "are these two elements in the same group?" — and lets you merge two groups into one. Its two operations are find (which group is x in?) and union (merge the groups of a and b).', 'ইউনিয়ন-ফাইন্ড, যাকে disjoint-set ডেটা স্ট্রাকচারও বলে, একগুচ্ছ উপাদানকে অ-পরস্পরব্যাপী গ্রুপে ভাগ করে ট্র্যাক করে। এটি এক ধরনের প্রশ্নের অত্যন্ত দ্রুত উত্তর দেয়: "এই দুটি উপাদান কি একই গ্রুপে?"—এবং দুটি গ্রুপকে একটিতে মার্জ করতে দেয়। এর দুটি অপারেশন হলো find (x কোন গ্রুপে?) ও union (a ও b-এর গ্রুপ মার্জ করা)।') },
        { p: l('The problem it solves is dynamic connectivity: as connections are added over time, you want to keep answering "is A connected to B?" without re-scanning the whole graph each time. A plain graph search would cost O(V + E) per query; Union-Find answers each query and each merge in almost constant time.', 'এটি যে সমস্যা সমাধান করে তা হলো dynamic connectivity: সময়ের সঙ্গে সংযোগ যোগ হতে থাকলে আপনি প্রতিবার পুরো গ্রাফ আবার না স্ক্যান করে "A কি B-এর সঙ্গে যুক্ত?" উত্তর দিতে চান। একটি সাধারণ গ্রাফ সার্চে প্রতি কুয়েরিতে O(V + E) খরচ হতো; ইউনিয়ন-ফাইন্ড প্রতিটি কুয়েরি ও প্রতিটি মার্জ প্রায় ধ্রুবক সময়ে উত্তর দেয়।') },
        { note: l('Think of merging circles of friends. When you introduce two people, their two entire friend circles instantly become one. To check if two people share a circle, you just ask "do you have the same leader?" — you never walk the whole social network.', 'বন্ধু-বৃত্ত মেলানোর কথা ভাবুন। যখন আপনি দুজনকে পরিচয় করান, তাদের দুটি পুরো বন্ধু-বৃত্ত তাৎক্ষণিক এক হয়ে যায়। দুজন একই বৃত্তে কি না যাচাই করতে শুধু জিজ্ঞাসা করুন "তোমাদের কি একই নেতা?"—আপনি কখনো পুরো সামাজিক নেটওয়ার্ক হাঁটেন না।'), kind: 'tip' },
      ],
    },
    {
      h: l('How it works, step by step', 'কীভাবে কাজ করে, ধাপে ধাপে'),
      blocks: [
        { p: l('Each element points to a parent. Following parents upward leads to a root, and the root is the identity of the whole group — two elements are in the same group exactly when they share a root. Two optimizations keep the trees flat: path compression and union by rank.', 'প্রতিটি উপাদান একটি parent-এর দিকে নির্দেশ করে। parent ধরে ওপরে গেলে একটি root-এ পৌঁছায়, ও root হলো পুরো গ্রুপের পরিচয়—দুটি উপাদান একই গ্রুপে ঠিক তখনই যখন তারা একটি root ভাগ করে। দুটি অপ্টিমাইজেশন ট্রি সমতল রাখে: path compression ও union by rank।') },
        { steps: [
          l('find(x): follow parent pointers up until you reach the root (a node that is its own parent).', 'find(x): parent পয়েন্টার ধরে ওপরে যান যতক্ষণ না root-এ পৌঁছান (যে নোড নিজেরই parent)।'),
          l('Path compression: on the way back, point every node you passed directly at the root, so future finds are almost instant.', 'Path compression: ফেরার পথে আপনি যে প্রতিটি নোড অতিক্রম করেছেন তা সরাসরি root-এর দিকে নির্দেশ করান, যাতে ভবিষ্যতের find প্রায় তাৎক্ষণিক হয়।'),
          l('union(a, b): find the root of each. If they are already the same, do nothing (they are one group).', 'union(a, b): প্রতিটির root খুঁজুন। ইতিমধ্যে একই হলে কিছু করবেন না (তারা এক গ্রুপ)।'),
          l('Union by rank: attach the shorter tree under the taller one’s root, so the merged tree never grows taller than necessary.', 'Union by rank: খাটো ট্রি-কে লম্বাটির root-এর নিচে যুক্ত করুন, যাতে মার্জ করা ট্রি দরকারের চেয়ে লম্বা না হয়।'),
          l('Together these keep every tree nearly flat, so both operations run in near-constant amortized time.', 'একসঙ্গে এরা প্রতিটি ট্রি প্রায় সমতল রাখে, তাই দুটি অপারেশনই প্রায়-ধ্রুবক অ্যামর্টাইজড সময়ে চলে।'),
        ] },
        { code: `make_set(n):
  parent[i] = i for every i          # each element is its own group
  rank[i]   = 0

find(x):                             # with path compression
  if parent[x] != x:
    parent[x] = find(parent[x])      # re-point x straight at the root
  return parent[x]

union(a, b):                         # with union by rank
  ra = find(a)
  rb = find(b)
  if ra == rb: return                # already the same group
  if rank[ra] < rank[rb]: swap ra, rb
  parent[rb] = ra                    # hang the shorter tree under the taller
  if rank[ra] == rank[rb]: rank[ra] += 1`, caption: l('Path compression flattens the tree during find; union by rank keeps merges balanced. Each alone helps; together they give near-constant time.', 'Path compression find-এর সময় ট্রি সমতল করে; union by rank মার্জ ভারসাম্যপূর্ণ রাখে। প্রতিটি একা সাহায্য করে; একসঙ্গে এরা প্রায়-ধ্রুবক সময় দেয়।') },
      ],
    },
    {
      h: l('Complexity', 'জটিলতা'),
      blocks: [
        { p: l('With both optimizations, each operation costs O(α(n)) amortized, where α is the inverse Ackermann function. That function grows so unimaginably slowly that α(n) is at most 4 for any n you could ever store — effectively a constant.', 'দুটি অপ্টিমাইজেশনসহ প্রতিটি অপারেশনের খরচ O(α(n)) অ্যামর্টাইজড, যেখানে α হলো inverse Ackermann ফাংশন। এই ফাংশন এত অকল্পনীয়ভাবে ধীরে বাড়ে যে আপনি কখনো রাখতে পারেন এমন যেকোনো n-এর জন্য α(n) বড়জোর 4—কার্যত একটি ধ্রুবক।') },
        { table: {
          head: [l('Operation', 'অপারেশন'), l('Cost', 'খরচ')],
          rows: [
            [l('find (amortized)', 'find (অ্যামর্টাইজড)'), l('O(α(n)) — effectively O(1)', 'O(α(n))—কার্যত O(1)')],
            [l('union (amortized)', 'union (অ্যামর্টাইজড)'), l('O(α(n)) — effectively O(1)', 'O(α(n))—কার্যত O(1)')],
            [l('Space', 'স্পেস'), l('O(n)', 'O(n)')],
          ],
        } },
        { note: l('Skip both optimizations and the trees can degrade into long chains, dragging find down toward O(n) per call. The near-constant guarantee is not automatic — it comes from path compression and union by rank together.', 'দুটি অপ্টিমাইজেশন বাদ দিলে ট্রি লম্বা চেইনে নামতে পারে, প্রতি কলে find-কে O(n)-এর দিকে টেনে নেয়। প্রায়-ধ্রুবক গ্যারান্টি স্বয়ংক্রিয় নয়—এটি path compression ও union by rank একসঙ্গে থেকে আসে।'), kind: 'warn' },
      ],
    },
    {
      h: l('When and where to use it', 'কোথায় ও কখন ব্যবহার করবেন'),
      blocks: [
        { p: l('Reach for Union-Find whenever the question is about grouping or connectivity and connections only ever get added, never removed.', 'যখন প্রশ্নটি গ্রুপিং বা connectivity নিয়ে ও সংযোগ শুধু যোগ হয়, কখনো সরানো হয় না, তখন ইউনিয়ন-ফাইন্ড নিন।') },
        { list: [
          l('Kruskal’s algorithm for minimum spanning trees uses Union-Find to detect whether adding an edge would form a cycle.', 'মিনিমাম স্প্যানিং ট্রি-র জন্য ক্রুসকাল অ্যালগরিদম একটি এজ যোগ করলে সাইকেল হবে কি না শনাক্ত করতে ইউনিয়ন-ফাইন্ড ব্যবহার করে।'),
          l('Detecting cycles in an undirected graph — if two endpoints of a new edge already share a root, the edge closes a cycle.', 'আনডিরেক্টেড গ্রাফে সাইকেল শনাক্ত—একটি নতুন এজের দুই প্রান্ত ইতিমধ্যে একটি root ভাগ করলে এজটি একটি সাইকেল বন্ধ করে।'),
          l('Counting connected components, network connectivity, and grouping accounts or pixels (like flood-based image segmentation).', 'কানেক্টেড কম্পোনেন্ট গণনা, নেটওয়ার্ক connectivity, ও অ্যাকাউন্ট বা পিক্সেল গ্রুপ করা (যেমন flood-ভিত্তিক ইমেজ সেগমেন্টেশন)।'),
          l('"Friend circles", equivalence classes, and percolation-style problems.', '"বন্ধু-বৃত্ত", equivalence class, ও percolation-ধরনের সমস্যা।'),
        ] },
        { p: l('Its one hard limit: it tells you whether two nodes are connected, but not how. It cannot reconstruct the path between them or the distance. When you need the actual route, use BFS (unweighted) or Dijkstra (weighted) instead.', 'এর একটি কঠিন সীমা: এটি বলে দুটি নোড যুক্ত কি না, কিন্তু কীভাবে নয়। এটি তাদের মধ্যে পথ বা দূরত্ব পুনর্গঠন করতে পারে না। আসল পথ দরকার হলে BFS (আনওয়েটেড) বা Dijkstra (ওয়েটেড) ব্যবহার করুন।') },
        { p: l('The classic pairing is Kruskal’s minimum-spanning-tree algorithm. It sorts all edges by weight and walks through them cheapest first; for each edge it asks Union-Find whether the two endpoints are already connected. If find(a) equals find(b), adding the edge would create a cycle, so it is skipped; otherwise a union merges them into the growing tree. Union-Find is what makes that cycle test fast enough to run on every edge.', 'ক্লাসিক জোড়াটি হলো ক্রুসকালের মিনিমাম-স্প্যানিং-ট্রি অ্যালগরিদম। এটি সব এজ ওজন দিয়ে সাজিয়ে সস্তা-আগে হাঁটে; প্রতিটি এজে ইউনিয়ন-ফাইন্ডকে জিজ্ঞাসা করে দুই প্রান্ত ইতিমধ্যে যুক্ত কি না। find(a) ও find(b) সমান হলে এজ যোগ করলে একটি সাইকেল হতো, তাই বাদ দেওয়া হয়; নইলে একটি union তাদের বাড়ন্ত ট্রি-তে মার্জ করে। ইউনিয়ন-ফাইন্ডই সেই সাইকেল-যাচাইকে প্রতিটি এজে চালানোর মতো দ্রুত বানায়।') },
      ],
    },
    {
      h: l('Common mistakes', 'সাধারণ ভুল'),
      blocks: [
        { list: [
          l('Skipping path compression or union by rank. Without them the structure degrades toward O(n) chains and loses its whole speed advantage.', 'path compression বা union by rank বাদ দেওয়া। এগুলো ছাড়া স্ট্রাকচার O(n) চেইনে নামে ও এর পুরো গতি-সুবিধা হারায়।'),
          l('Expecting it to reconstruct a path. Union-Find answers connectivity only; it never stores how two nodes are linked.', 'এটি একটি পথ পুনর্গঠন করবে আশা করা। ইউনিয়ন-ফাইন্ড শুধু connectivity বলে; দুটি নোড কীভাবে যুক্ত তা কখনো রাখে না।'),
          l('Comparing parent pointers instead of roots. Two elements can have different immediate parents yet still share the same root — always compare find(a) with find(b).', 'root-এর বদলে parent পয়েন্টার তুলনা করা। দুটি উপাদানের ভিন্ন তাৎক্ষণিক parent থাকতে পারে তবু একই root ভাগ করে—সবসময় find(a) ও find(b) তুলনা করুন।'),
          l('Trying to "un-union" groups. Standard Union-Find cannot split a group back apart; if you need deletions, you need a different structure.', 'গ্রুপ "un-union" করার চেষ্টা করা। প্রমিত ইউনিয়ন-ফাইন্ড একটি গ্রুপ আবার ভাগ করতে পারে না; মোছা দরকার হলে ভিন্ন স্ট্রাকচার লাগবে।'),
        ] },
      ],
    },
    {
      h: l('Remember in one line', 'এক লাইনে মনে রাখুন'),
      blocks: [
        { list: [
          l('Union-Find tracks groups with parent pointers, answering "same group?" and merging in near-constant time.', 'ইউনিয়ন-ফাইন্ড parent পয়েন্টার দিয়ে গ্রুপ ট্র্যাক করে, "একই গ্রুপ?" উত্তর দেয় ও প্রায়-ধ্রুবক সময়ে মার্জ করে।'),
          l('Path compression + union by rank give O(α(n)) amortized per operation, effectively O(1), with O(n) space.', 'path compression + union by rank প্রতি অপারেশনে O(α(n)) অ্যামর্টাইজড দেয়, কার্যত O(1), O(n) স্পেসসহ।'),
          l('It answers connectivity, not paths — great for Kruskal, cycle detection, and connected components.', 'এটি connectivity বলে, পথ নয়—ক্রুসকাল, সাইকেল শনাক্ত ও কানেক্টেড কম্পোনেন্টে দারুণ।'),
        ] },
      ],
    },
  ],
}
