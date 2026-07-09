// Deep, structured teaching guides (bilingual) for DSA topics — batch "d".
// Each guide is an array of sections; each section has a heading (h) and ordered
// content blocks: { p } paragraph, { list } bullets, { steps } numbered,
// { table } {head, rows}, { code, caption } code, or { note, kind } callout.
// Keyed by topic id and merged into the shared `guides` map. Additive and safe.

const l = (en, bn) => ({ en, bn })

export default {
  // ── Balanced search trees (AVL & red-black) ───────────────────────────────
  'dsa-balanced-trees': [
    {
      h: l('What is a balanced search tree?', 'ব্যালান্সড সার্চ ট্রি কী?'),
      blocks: [
        { p: l('A balanced search tree is a binary search tree (BST) that actively keeps itself short. After every insert and delete it performs small local fixes — called rotations — so the tree never grows into a tall, lopsided shape. AVL trees and red-black trees are the two classic self-balancing designs.', 'ব্যালান্সড সার্চ ট্রি হলো এমন একটি binary search tree (BST) যা নিজেকে সক্রিয়ভাবে খাটো রাখে। প্রতিটি insert ও delete-এর পর এটি ছোট স্থানীয় সংশোধন করে—যাকে rotation বলে—যাতে tree কখনো লম্বা, একপেশে আকার না নেয়। AVL tree ও red-black tree হলো দুটি ক্লাসিক সেলফ-ব্যালান্সিং ডিজাইন।') },
        { p: l('The problem it solves is the biggest weakness of a plain BST: its speed depends entirely on its shape. A BST gives O(log n) search only when it stays bushy. Feed it already-sorted data and every new key hangs off the right side, turning the whole tree into a straight line — effectively a linked list with O(n) search. A balanced tree guarantees the height stays O(log n) no matter what order the data arrives in, even from an adversary deliberately trying to slow you down.', 'এটি যে সমস্যা সমাধান করে তা হলো সাধারণ BST-এর সবচেয়ে বড় দুর্বলতা: এর গতি পুরোপুরি এর আকৃতির ওপর নির্ভর করে। BST শুধু তখনই O(log n) search দেয় যখন এটি ঝোপালো থাকে। এতে আগে-সাজানো ডেটা দিলে প্রতিটি নতুন key ডান পাশে ঝোলে, পুরো tree-কে একটি সোজা লাইনে পরিণত করে—কার্যত O(n) search-যুক্ত একটি linked list। ব্যালান্সড tree নিশ্চিত করে ডেটা যে ক্রমেই আসুক height O(log n) থাকে, এমনকি ইচ্ছাকৃতভাবে ধীর করতে চাওয়া কোনো প্রতিপক্ষের কাছ থেকেও।') },
        { note: l('Think of a librarian who re-shelves after every single returned book, so no one aisle ever grows too long to walk from end to end. That constant tidying is exactly what rotations do — a little work on every change keeps every future lookup fast.', 'এমন একজন গ্রন্থাগারিকের কথা ভাবুন যিনি প্রতিটি ফেরত আসা বইয়ের পর পুনরায় সাজান, যাতে কোনো একটি সারি এক প্রান্ত থেকে আরেক প্রান্তে হাঁটার জন্য কখনো বেশি লম্বা না হয়। সেই ক্রমাগত গোছানোই ঠিক যা rotation করে—প্রতিটি পরিবর্তনে সামান্য কাজ ভবিষ্যতের প্রতিটি lookup দ্রুত রাখে।'), kind: 'tip' },
      ],
    },
    {
      h: l('How it works, step by step', 'কীভাবে কাজ করে, ধাপে ধাপে'),
      blocks: [
        { p: l('A balanced tree inserts exactly like a normal BST first, then checks whether that insert made any node too lopsided, and if so rebalances with one or two rotations. A rotation re-arranges three nodes so the middle-valued one becomes the parent — it preserves the BST ordering while lowering the height.', 'একটি ব্যালান্সড tree প্রথমে সাধারণ BST-এর মতোই insert করে, তারপর যাচাই করে সেই insert কোনো node-কে খুব একপেশে করেছে কি না, এবং করলে এক বা দুটি rotation দিয়ে পুনরায় ব্যালান্স করে। একটি rotation তিনটি node পুনর্বিন্যাস করে যাতে মধ্য-মানেরটি parent হয়—এটি height কমায় অথচ BST-এর ক্রম রক্ষা করে।') },
        { steps: [
          l('Insert the new key exactly as in a plain BST: go left for smaller keys, right for larger, until you reach an empty spot, and place the node there.', 'সাধারণ BST-এর মতো নতুন key insert করুন: ছোট key-এর জন্য বামে, বড়র জন্য ডানে যান, যতক্ষণ না একটি খালি জায়গা পান, ও সেখানে node বসান।'),
          l('Walk back up toward the root, updating each ancestor’s height or colour information as you go.', 'root-এর দিকে ফিরে ওপরে উঠুন, পথে প্রতিটি ancestor-এর height বা colour তথ্য হালনাগাদ করতে করতে।'),
          l('At each ancestor, check the balance condition — for AVL, that the two subtree heights differ by at most 1; for red-black, that the colour rules hold.', 'প্রতিটি ancestor-এ ব্যালান্স শর্ত যাচাই করুন—AVL-এর জন্য দুই subtree-এর height সর্বোচ্চ ১ পার্থক্য; red-black-এর জন্য colour নিয়ম বজায় আছে কি না।'),
          l('If a node violates the rule, apply a single or double rotation to that small local cluster to restore balance.', 'কোনো node নিয়ম ভাঙলে সেই ছোট স্থানীয় গুচ্ছে single বা double rotation প্রয়োগ করে ব্যালান্স পুনরুদ্ধার করুন।'),
          l('Because each fix is local and the path back to the root is only O(log n) long, the whole insert still costs O(log n).', 'যেহেতু প্রতিটি সংশোধন স্থানীয় এবং root পর্যন্ত ফেরার পথ মাত্র O(log n) লম্বা, পুরো insert তবুও O(log n) খরচ করে।'),
        ] },
        { code: `# Left rotation: pivot x's right child y moves up to become the new par.
function rotateLeft(x):
    y = x.right          # y will move up
    x.right = y.left     # y's left subtree becomes x's right subtree
    y.left = x           # x becomes y's left child
    updateHeight(x)      # x is now lower, recompute first
    updateHeight(y)      # then the new parent above it
    return y             # y is the new root of this subtree

# After a normal BST insert, rebalance on the way back up:
function insert(node, key):
    if node is null: return newNode(key)
    if key < node.key: node.left  = insert(node.left, key)
    else:              node.right = insert(node.right, key)
    updateHeight(node)
    return rebalance(node)   # rotate if the subtree got too lopsided`, caption: l('A left rotation plus where rebalancing hooks into a BST insert. A right rotation is the mirror image.', 'একটি left rotation এবং BST insert-এ rebalancing কোথায় যুক্ত হয়। right rotation এর আয়না-প্রতিচ্ছবি।') },
      ],
    },
    {
      h: l('Complexity', 'জটিলতা'),
      blocks: [
        { p: l('Because the height is forced to stay O(log n), every core operation is bounded by that height. This is the whole point: the guarantee holds in the worst case, not just on average.', 'যেহেতু height-কে O(log n)-এ থাকতে বাধ্য করা হয়, প্রতিটি core operation সেই height দ্বারা সীমাবদ্ধ। এটাই মূল কথা: গ্যারান্টি শুধু গড়ে নয়, ওয়ার্স্ট-কেসেও টেকে।') },
        { table: {
          head: [l('Operation', 'অপারেশন'), l('Cost', 'খরচ')],
          rows: [
            [l('Search', 'সার্চ'), l('O(log n)', 'O(log n)')],
            [l('Insert', 'ইনসার্ট'), l('O(log n)', 'O(log n)')],
            [l('Delete', 'ডিলিট'), l('O(log n)', 'O(log n)')],
            [l('Height', 'উচ্চতা'), l('O(log n)', 'O(log n)')],
          ],
        } },
        { p: l('Compare this with a plain BST, whose search is O(log n) only when balanced and degrades to O(n) when skewed. The balanced tree pays a small constant-factor overhead on writes (the rotations) to buy that worst-case guarantee.', 'এটি সাধারণ BST-এর সঙ্গে তুলনা করুন, যার search শুধু ব্যালান্সড থাকলে O(log n) এবং হেলে গেলে O(n)-এ নামে। ব্যালান্সড tree সেই ওয়ার্স্ট-কেস গ্যারান্টি কেনার জন্য লেখায় একটি ছোট ধ্রুবক-ফ্যাক্টর ওভারহেড (rotation) দেয়।') },
      ],
    },
    {
      h: l('AVL vs red-black: which one?', 'AVL বনাম red-black: কোনটি?'),
      blocks: [
        { p: l('Both keep height logarithmic, but they strike a different balance between how strictly they stay balanced and how much work each write costs.', 'দুটোই height লগারিদমিক রাখে, তবে কতটা কঠোরভাবে ব্যালান্সড থাকে ও প্রতিটি লেখায় কত কাজ লাগে—এ দুইয়ের মধ্যে ভিন্নভাবে ভারসাম্য টানে।') },
        { table: {
          head: [l('Aspect', 'দিক'), l('AVL tree', 'AVL tree'), l('Red-black tree', 'Red-black tree')],
          rows: [
            [l('Balance', 'ব্যালান্স'), l('Stricter — shorter trees', 'কঠোর—খাটো tree'), l('Looser — slightly taller', 'শিথিল—একটু লম্বা')],
            [l('Search', 'সার্চ'), l('Faster (shorter height)', 'দ্রুত (খাটো height)'), l('Slightly slower', 'একটু ধীর')],
            [l('Insert / delete', 'ইনসার্ট / ডিলিট'), l('More rotations', 'বেশি rotation'), l('Fewer rotations', 'কম rotation')],
            [l('Best for', 'কার জন্য'), l('Read-heavy workloads', 'পড়া-প্রধান কাজ'), l('Write-heavy, general purpose', 'লেখা-প্রধান, সাধারণ কাজ')],
          ],
        } },
        { p: l('This is why most standard libraries pick red-black trees for their ordered map/set (Java TreeMap, C++ std::map): balanced enough for fast lookups, cheap enough on writes for general use.', 'এ কারণেই বেশিরভাগ স্ট্যান্ডার্ড লাইব্রেরি তাদের ordered map/set-এর জন্য red-black tree বাছে (Java TreeMap, C++ std::map): দ্রুত lookup-এর জন্য যথেষ্ট ব্যালান্সড, সাধারণ ব্যবহারে লেখায় যথেষ্ট সস্তা।') },
      ],
    },
    {
      h: l('When and where to use it', 'কখন ও কোথায় ব্যবহার করবেন'),
      blocks: [
        { p: l('Reach for a balanced tree — or, in practice, your language’s built-in ordered map/set — when you need ordered operations with a guaranteed logarithmic bound: keys kept in sorted order, range queries ("all keys between 10 and 50"), floor/ceiling lookups, or an in-order walk that yields sorted output.', 'ব্যালান্সড tree—বা বাস্তবে আপনার ভাষার built-in ordered map/set—নিন যখন আপনার নিশ্চিত লগারিদমিক সীমায় সাজানো অপারেশন দরকার: key সাজানো ক্রমে রাখা, range query ("১০ থেকে ৫০-এর মধ্যে সব key"), floor/ceiling lookup, বা in-order হাঁটা যা সাজানো আউটপুট দেয়।') },
        { list: [
          l('Use it over a hash table when you need order — hash tables give O(1) lookup but keep no order and cannot answer range queries.', 'ক্রম দরকার হলে hash table-এর বদলে এটি নিন—hash table O(1) lookup দেয় কিন্তু কোনো ক্রম রাখে না ও range query-র উত্তর দিতে পারে না।'),
          l('Use it over a plain BST whenever the input order is untrusted or possibly sorted, so you cannot risk the O(n) skewed worst case.', 'input-এর ক্রম অবিশ্বস্ত বা সম্ভবত সাজানো হলে সাধারণ BST-এর বদলে এটি নিন, যাতে O(n) হেলানো ওয়ার্স্ট-কেসের ঝুঁকি না নিতে হয়।'),
          l('Prefer the library implementation over hand-rolling one — self-balancing delete logic is genuinely tricky to get right.', 'নিজে বানানোর চেয়ে লাইব্রেরির implementation নিন—সেলফ-ব্যালান্সিং delete লজিক সঠিক করা সত্যিই জটিল।'),
        ] },
      ],
    },
    {
      h: l('Common mistakes', 'সাধারণ ভুল'),
      blocks: [
        { list: [
          l('Hand-rolling a plain BST for untrusted input when a balanced ordered map was already available — sorted or adversarial input then silently degrades it to an O(n) linked list.', 'ব্যালান্সড ordered map থাকা সত্ত্বেও অবিশ্বস্ত input-এ নিজে সাধারণ BST বানানো—সাজানো বা প্রতিকূল input তখন নীরবে একে O(n) linked list-এ নামায়।'),
          l('Forgetting to update height or colour metadata on the way back up, so the rebalance check reads stale values and never triggers.', 'ওপরে ফেরার পথে height বা colour metadata হালনাগাদ করতে ভুলে যাওয়া, ফলে rebalance যাচাই পুরনো মান পড়ে ও কখনো চালু হয় না।'),
          l('Assuming "balanced" means perfectly balanced. It means the height is bounded to O(log n), not that both sides are always equal.', '"ব্যালান্সড" মানে নিখুঁতভাবে ব্যালান্সড ধরে নেওয়া। এর মানে height O(log n)-এ সীমাবদ্ধ, দুই দিক সবসময় সমান নয়।'),
          l('Paying for a balanced tree when a simple hash map would do — if you never need order or range queries, the ordering guarantee is wasted overhead.', 'সাধারণ hash map যথেষ্ট হলেও ব্যালান্সড tree-এর খরচ দেওয়া—যদি কখনো ক্রম বা range query দরকার না হয়, ক্রমের গ্যারান্টি অপচয়ী ওভারহেড।'),
        ] },
      ],
    },
    {
      h: l('Remember in one line', 'এক লাইনে মনে রাখুন'),
      blocks: [
        { list: [
          l('A balanced search tree rotates on insert and delete to keep its height O(log n), so search stays fast even on adversarial input.', 'ব্যালান্সড সার্চ tree insert ও delete-এ rotate করে height O(log n) রাখে, তাই প্রতিকূল input-এও search দ্রুত থাকে।'),
          l('It buys a worst-case O(log n) guarantee at the price of small rotation overhead and real code complexity over a plain BST.', 'এটি সাধারণ BST-এর চেয়ে ছোট rotation ওভারহেড ও বাস্তব কোড জটিলতার বিনিময়ে ওয়ার্স্ট-কেস O(log n) গ্যারান্টি কেনে।'),
          l('Need ordered keys with a hard bound? Use your language’s ordered map/set instead of rolling your own.', 'কঠিন সীমাসহ সাজানো key দরকার? নিজে বানানোর বদলে আপনার ভাষার ordered map/set ব্যবহার করুন।'),
        ] },
      ],
    },
  ],

  // ── Tree traversals ───────────────────────────────────────────────────────
  'dsa-traversals': [
    {
      h: l('What are tree traversals?', 'ট্রি ট্রাভার্সাল কী?'),
      blocks: [
        { p: l('A traversal is a systematic way to visit every node of a tree exactly once, in a well-defined order. Unlike an array, a tree has no single "next" — from any node you could go to a left child, a right child, or back up. A traversal is the rule that decides that order so you never miss a node and never visit one twice.', 'ট্রাভার্সাল হলো একটি tree-এর প্রতিটি node ঠিক একবার একটি সুনির্দিষ্ট ক্রমে দেখার একটি নিয়মতান্ত্রিক উপায়। array-এর মতো নয়, tree-তে একটিমাত্র "পরবর্তী" নেই—যেকোনো node থেকে আপনি left child, right child, বা ওপরে ফিরে যেতে পারেন। ট্রাভার্সাল হলো সেই নিয়ম যা এই ক্রম ঠিক করে যাতে আপনি কোনো node বাদ না দেন ও একটিও দুবার না দেখেন।') },
        { p: l('The four classic orders are pre-order, in-order, post-order, and level-order. The first three are depth-first (they plunge down one branch before backing up) and differ only in when you "process" a node relative to its children. Level-order is breadth-first: it sweeps the tree row by row.', 'চারটি ক্লাসিক ক্রম হলো pre-order, in-order, post-order ও level-order। প্রথম তিনটি depth-first (এরা ওপরে ফেরার আগে এক শাখা ধরে নিচে ডুব দেয়) এবং শুধু এতেই ভিন্ন যে আপনি একটি node-কে তার child-দের তুলনায় কখন "প্রসেস" করেন। level-order হলো breadth-first: এটি tree-কে সারি-ধরে-সারি ঝাড়ে।') },
        { note: l('Picture reading every room in a building by a fixed rule. "Always finish the left wing before the right" is a depth-first traversal; "walk the whole ground floor, then the whole first floor" is level-order. Same rooms, different visiting order.', 'নির্দিষ্ট নিয়মে একটি ভবনের প্রতিটি ঘর দেখার কথা ভাবুন। "সবসময় ডানের আগে বাম উইং শেষ করো" হলো depth-first ট্রাভার্সাল; "পুরো নিচতলা হাঁটো, তারপর পুরো একতলা" হলো level-order। একই ঘর, ভিন্ন দেখার ক্রম।'), kind: 'tip' },
      ],
    },
    {
      h: l('How it works, step by step', 'কীভাবে কাজ করে, ধাপে ধাপে'),
      blocks: [
        { p: l('The three depth-first orders share one recursive skeleton — visit the node, recurse left, recurse right — and differ only in where the "visit this node" line sits. Level-order needs a queue instead of recursion.', 'তিনটি depth-first ক্রম একটি recursive কাঠামো ভাগ করে—node দেখো, বামে recurse করো, ডানে recurse করো—এবং শুধু "এই node দেখো" লাইনটি কোথায় বসে তাতেই ভিন্ন। level-order-এর recursion-এর বদলে একটি queue দরকার।') },
        { steps: [
          l('Pre-order (Node → Left → Right): process the node first, before its children. Good for copying a tree or writing out its structure top-down.', 'Pre-order (Node → Left → Right): child-দের আগে node আগে প্রসেস করো। tree কপি বা এর গঠন ওপর-থেকে লেখায় ভালো।'),
          l('In-order (Left → Node → Right): process the node between its two subtrees. On a BST this yields the keys in fully sorted order.', 'In-order (Left → Node → Right): দুই subtree-এর মাঝে node প্রসেস করো। একটি BST-তে এটি key-গুলো সম্পূর্ণ সাজানো ক্রমে দেয়।'),
          l('Post-order (Left → Right → Node): process the node last, after both children. Good for deleting or freeing a tree, or computing a folder’s total size from its contents.', 'Post-order (Left → Right → Node): দুই child-এর পর node শেষে প্রসেস করো। tree মুছতে/মুক্ত করতে, বা একটি ফোল্ডারের ভেতরের থেকে মোট আকার হিসাবে ভালো।'),
          l('Level-order (breadth-first): use a queue. Dequeue a node, process it, then enqueue its children. This visits nearest nodes first, level by level.', 'Level-order (breadth-first): একটি queue ব্যবহার করো। একটি node dequeue করো, প্রসেস করো, তারপর তার child-দের enqueue করো। এটি কাছের node আগে দেখে, স্তর-ধরে-স্তর।'),
        ] },
        { code: `# The three depth-first orders — one shape, the visit line moves.
function preOrder(node):
    if node is null: return
    visit(node)              # <-- process BEFORE children
    preOrder(node.left)
    preOrder(node.right)

function inOrder(node):
    if node is null: return
    inOrder(node.left)
    visit(node)              # <-- process BETWEEN children
    inOrder(node.right)

function postOrder(node):
    if node is null: return
    postOrder(node.left)
    postOrder(node.right)
    visit(node)              # <-- process AFTER children

# Level-order uses a queue instead of recursion.
function levelOrder(root):
    q = queue with root
    while q not empty:
        node = q.dequeue()
        visit(node)
        if node.left:  q.enqueue(node.left)
        if node.right: q.enqueue(node.right)`, caption: l('The three DFS orders are identical except for where visit(node) sits. Level-order is BFS with a queue.', 'তিনটি DFS ক্রম visit(node) কোথায় বসে তা ছাড়া অভিন্ন। level-order হলো queue-সহ BFS।') },
      ],
    },
    {
      h: l('The four orders compared', 'চারটি ক্রমের তুলনা'),
      blocks: [
        { p: l('Every traversal visits n nodes once, so all four run in O(n) time. They differ in the output order and in how much extra memory the "waiting" nodes take.', 'প্রতিটি ট্রাভার্সাল n-টি node একবার দেখে, তাই চারটিই O(n) সময়ে চলে। এরা আউটপুট ক্রমে এবং "অপেক্ষমাণ" node কত অতিরিক্ত মেমরি নেয় তাতে ভিন্ন।') },
        { table: {
          head: [l('Order', 'ক্রম'), l('Visit pattern', 'দেখার প্যাটার্ন'), l('Time', 'সময়'), l('Extra space', 'অতিরিক্ত স্পেস'), l('Typical use', 'সাধারণ ব্যবহার')],
          rows: [
            [l('Pre-order', 'Pre-order'), l('Node, Left, Right', 'Node, Left, Right'), l('O(n)', 'O(n)'), l('O(h)', 'O(h)'), l('Copy / serialize a tree', 'tree কপি / serialize')],
            [l('In-order', 'In-order'), l('Left, Node, Right', 'Left, Node, Right'), l('O(n)', 'O(n)'), l('O(h)', 'O(h)'), l('Sorted output from a BST', 'BST থেকে সাজানো আউটপুট')],
            [l('Post-order', 'Post-order'), l('Left, Right, Node', 'Left, Right, Node'), l('O(n)', 'O(n)'), l('O(h)', 'O(h)'), l('Delete / aggregate children', 'delete / child যোগফল')],
            [l('Level-order', 'Level-order'), l('Row by row (BFS)', 'সারি-ধরে-সারি (BFS)'), l('O(n)', 'O(n)'), l('O(w)', 'O(w)'), l('Nearest-first, shortest path', 'কাছের-আগে, ছোট পথ')],
          ],
        } },
        { p: l('Here h is the tree’s height and w is its maximum width. For DFS the extra space is the call stack, at most one path deep (O(h)). For level-order it is the queue, which can hold an entire level at once (O(w)).', 'এখানে h হলো tree-এর height ও w এর সর্বোচ্চ width। DFS-এ অতিরিক্ত স্পেস হলো call stack, সর্বোচ্চ এক পথ গভীর (O(h))। level-order-এ এটি queue, যা একবারে একটি পুরো স্তর ধরতে পারে (O(w))।') },
      ],
    },
    {
      h: l('Recursive vs iterative traversal', 'Recursive বনাম iterative ট্রাভার্সাল'),
      blocks: [
        { p: l('The recursive versions above are the clearest to read, but recursion quietly uses the call stack — one frame per level of depth. On a balanced tree that is fine (O(log n) frames), but on a deep or skewed tree of height n it can blow the stack and crash. When that risk is real, rewrite the traversal iteratively with an explicit stack you control, or use a queue for level-order.', 'ওপরের recursive সংস্করণগুলো পড়তে সবচেয়ে পরিষ্কার, কিন্তু recursion নীরবে call stack ব্যবহার করে—প্রতি গভীরতার স্তরে একটি frame। একটি ব্যালান্সড tree-তে এটি ঠিক আছে (O(log n) frame), কিন্তু n উচ্চতার গভীর বা হেলানো tree-তে এটি stack উপচে ক্র্যাশ করতে পারে। সেই ঝুঁকি বাস্তব হলে, ট্রাভার্সালটি আপনার নিয়ন্ত্রিত একটি স্পষ্ট stack দিয়ে iteratively আবার লিখুন, বা level-order-এর জন্য একটি queue ব্যবহার করুন।') },
        { p: l('The mental trick: recursion is just an implicit stack. An iterative pre-order pushes the root, then repeatedly pops a node, visits it, and pushes its right child then its left child (so left is processed first). The output is identical — you have only moved the stack from the language runtime into your own variable.', 'মানসিক কৌশল: recursion আসলে একটি অন্তর্নিহিত stack। একটি iterative pre-order root push করে, তারপর বারবার একটি node pop করে, দেখে, এবং এর right child তারপর left child push করে (যাতে left আগে প্রসেস হয়)। আউটপুট অভিন্ন—আপনি শুধু stack-টি ভাষার runtime থেকে নিজের একটি variable-এ সরিয়েছেন।') },
        { note: l('If an interviewer asks you to traverse "without recursion," they are testing whether you understand that recursion and an explicit stack are the same idea. Reach for a stack for DFS orders and a queue for level-order.', 'একজন ইন্টারভিউয়ার "recursion ছাড়া" ট্রাভার্স করতে বললে, তিনি যাচাই করছেন আপনি বোঝেন কি না যে recursion ও স্পষ্ট stack একই ধারণা। DFS ক্রমে stack ও level-order-এ queue নিন।'), kind: 'tip' },
      ],
    },
    {
      h: l('When and where to use each', 'কখন ও কোথায় কোনটি ব্যবহার করবেন'),
      blocks: [
        { list: [
          l('Want sorted keys out of a BST? Use in-order — it is the one traversal that produces them in ascending order.', 'BST থেকে সাজানো key চান? in-order নিন—একমাত্র ট্রাভার্সাল যা এগুলো ঊর্ধ্বক্রমে দেয়।'),
          l('Copying, cloning, or printing structure top-down? Use pre-order, because you see a parent before its children.', 'ওপর-থেকে কপি, ক্লোন বা গঠন প্রিন্ট? pre-order নিন, কারণ child-দের আগে parent দেখেন।'),
          l('Freeing a tree, or computing a value that depends on children (folder size, expression evaluation)? Use post-order, so children are done before the parent.', 'tree মুক্ত করা, বা child-নির্ভর মান হিসাব (ফোল্ডার সাইজ, expression মূল্যায়ন)? post-order নিন, যাতে parent-এর আগে child শেষ হয়।'),
          l('Need "closest first" or shortest path in an unweighted tree/graph? Use level-order (BFS).', 'আনওয়েটেড tree/graph-এ "কাছের আগে" বা ছোট পথ দরকার? level-order (BFS) নিন।'),
        ] },
      ],
    },
    {
      h: l('Common mistakes', 'সাধারণ ভুল'),
      blocks: [
        { list: [
          l('Expecting sorted output from a tree that is not a BST. In-order only yields sorted keys when the tree obeys the BST ordering; on a random binary tree it is just "left, node, right" order.', 'BST নয় এমন tree থেকে সাজানো আউটপুট আশা করা। in-order শুধু তখনই সাজানো key দেয় যখন tree BST-এর ক্রম মানে; এলোমেলো binary tree-তে এটি শুধু "left, node, right" ক্রম।'),
          l('Mixing up the four orders — the only thing that changes among pre/in/post is where you visit the node; do not swap the left/right recursion order by accident.', 'চারটি ক্রম গুলিয়ে ফেলা—pre/in/post-এর মধ্যে একমাত্র যা বদলায় তা হলো node কোথায় দেখেন; ভুলে left/right recursion ক্রম অদলবদল করবেন না।'),
          l('Letting a deep tree overflow the call stack. Recursive DFS uses O(h) stack; on a skewed tree of height n it can crash — switch to an explicit stack or iterative version.', 'গভীর tree-কে call stack overflow করতে দেওয়া। recursive DFS O(h) stack নেয়; n উচ্চতার হেলানো tree-তে এটি ক্র্যাশ করতে পারে—স্পষ্ট stack বা iterative সংস্করণে যান।'),
          l('Using recursion for level-order. Level-order needs a queue (FIFO); a recursive/stack approach gives depth-first, not breadth-first.', 'level-order-এর জন্য recursion ব্যবহার। level-order-এর একটি queue (FIFO) দরকার; recursive/stack পদ্ধতি breadth-first নয়, depth-first দেয়।'),
        ] },
      ],
    },
    {
      h: l('Remember in one line', 'এক লাইনে মনে রাখুন'),
      blocks: [
        { list: [
          l('Pre/in/post-order share one recursive shape and differ only in when the node is visited; level-order uses a queue.', 'pre/in/post-order একটি recursive কাঠামো ভাগ করে ও শুধু node কখন দেখা হয় তাতে ভিন্ন; level-order queue ব্যবহার করে।'),
          l('All four are O(n) time; in-order on a BST gives sorted output, level-order gives nearest-first.', 'চারটিই O(n) সময়; BST-তে in-order সাজানো আউটপুট দেয়, level-order কাছের-আগে দেয়।'),
          l('Recursive DFS costs O(h) stack — beware overflow on deep, skewed trees.', 'recursive DFS O(h) stack খরচ করে—গভীর, হেলানো tree-তে overflow সাবধান।'),
        ] },
      ],
    },
  ],

  // ── Heaps & priority queues ───────────────────────────────────────────────
  'dsa-heap': [
    {
      h: l('What is a heap?', 'হিপ কী?'),
      blocks: [
        { p: l('A heap is a complete binary tree with one simple rule: every parent "beats" its children. In a min-heap the parent is always smaller than its children, so the smallest value sits at the root; in a max-heap the parent is always larger, so the largest sits at the root. "Complete" means every level is full except possibly the last, which fills left to right — that shape lets a heap live inside a plain array with no pointers at all.', 'হিপ হলো একটি সম্পূর্ণ binary tree, একটি সরল নিয়মসহ: প্রতিটি parent তার child-দের "হারায়"। min-heap-এ parent সবসময় child-দের চেয়ে ছোট, তাই সবচেয়ে ছোট মান root-এ বসে; max-heap-এ parent সবসময় বড়, তাই সবচেয়ে বড়টি root-এ। "সম্পূর্ণ" মানে শেষটি বাদে প্রতিটি স্তর পূর্ণ, শেষটি বাম-থেকে-ডান ভরে—সেই আকৃতি হিপকে কোনো pointer ছাড়াই একটি সাধারণ array-তে থাকতে দেয়।') },
        { p: l('The problem it solves is "give me the most important item, fast, over and over." A sorted array keeps everything in order but is expensive to keep sorted after each insert; an unsorted array is cheap to add to but slow to search. A heap is the sweet spot: it does not fully sort, it just guarantees the single extreme element is always instantly at the top, with cheap O(log n) inserts and removals.', 'এটি যে সমস্যা সমাধান করে তা হলো "সবচেয়ে গুরুত্বপূর্ণ আইটেমটি দ্রুত, বারবার দাও।" সাজানো array সব ক্রমে রাখে কিন্তু প্রতি insert-এর পর সাজানো রাখা ব্যয়বহুল; অসাজানো array-তে যোগ সস্তা কিন্তু search ধীর। হিপ হলো মধ্যবিন্দু: এটি পুরোপুরি সাজায় না, শুধু নিশ্চিত করে একমাত্র চরম উপাদানটি সবসময় তাৎক্ষণিক ওপরে থাকে, সস্তা O(log n) insert ও removal-সহ।') },
        { note: l('Think of a hospital emergency room. Patients do not get seen in arrival order — the most urgent case is always taken next, no matter who walked in when. A heap is that triage rule turned into a data structure.', 'একটি হাসপাতালের জরুরি বিভাগের কথা ভাবুন। রোগীদের আগমন-ক্রমে দেখা হয় না—কে কখন এসেছে তা যাই হোক, সবচেয়ে জরুরি কেসটি সবসময় পরে নেওয়া হয়। হিপ হলো সেই triage নিয়মকে একটি ডেটা স্ট্রাকচারে রূপ দেওয়া।'), kind: 'tip' },
      ],
    },
    {
      h: l('How it works, step by step', 'কীভাবে কাজ করে, ধাপে ধাপে'),
      blocks: [
        { p: l('Two operations do all the work, and both restore the heap rule by moving one element along a single root-to-leaf path — never touching the whole tree. Because the tree is stored in an array, a node at index i finds its children at 2i+1 and 2i+2 with plain arithmetic.', 'দুটি অপারেশন সব কাজ করে, এবং দুটোই একটি উপাদানকে একটিমাত্র root-থেকে-leaf পথ ধরে সরিয়ে হিপ নিয়ম পুনরুদ্ধার করে—কখনো পুরো tree ছোঁয় না। যেহেতু tree একটি array-তে রাখা, index i-এর একটি node তার child-দের সাধারণ গণিতে 2i+1 ও 2i+2-এ পায়।') },
        { steps: [
          l('Push (insert): put the new element at the end of the array (the next open leaf), then "sift up" — swap it with its parent while it beats the parent — until the heap rule holds. At most O(log n) swaps, one per level.', 'Push (insert): নতুন উপাদান array-এর শেষে রাখো (পরের খালি leaf), তারপর "sift up"—parent-কে হারানো পর্যন্ত parent-এর সঙ্গে অদলবদল করো—যতক্ষণ না হিপ নিয়ম টেকে। সর্বোচ্চ O(log n) swap, প্রতি স্তরে একটি।'),
          l('Peek: the extreme element is always at index 0, so reading it is O(1) with no changes to the structure.', 'Peek: চরম উপাদান সবসময় index 0-এ, তাই এটি পড়া O(1), গঠনে কোনো পরিবর্তন ছাড়া।'),
          l('Pop (remove top): take the root, move the last leaf into the root slot, then "sift down" — swap it with its stronger child until the rule holds again. Again O(log n).', 'Pop (top সরানো): root নাও, শেষ leaf-কে root স্লটে সরাও, তারপর "sift down"—নিয়ম আবার টেকা পর্যন্ত এর শক্তিশালী child-এর সঙ্গে অদলবদল করো। আবারও O(log n)।'),
          l('Build-heap: given n items at once, sift down from the last parent up to the root. Cleverly, this is O(n) overall, not O(n log n).', 'Build-heap: একবারে n আইটেম দিলে, শেষ parent থেকে root পর্যন্ত sift down করো। চতুরভাবে এটি সব মিলিয়ে O(n), O(n log n) নয়।'),
        ] },
        { code: `# Array-backed min-heap. Children of index i are 2i+1 and 2i+2.
function push(heap, value):
    heap.append(value)
    i = len(heap) - 1
    while i > 0 and heap[i] < heap[parent(i)]:   # smaller than parent?
        swap(heap, i, parent(i))                  # bubble it up
        i = parent(i)

function pop(heap):                # removes and returns the minimum
    top = heap[0]
    heap[0] = heap.pop_last()      # move last leaf to the root
    siftDown(heap, 0)              # push it down to its place
    return top

function siftDown(heap, i):
    n = len(heap)
    while true:
        smallest = i
        L = 2*i + 1; R = 2*i + 2
        if L < n and heap[L] < heap[smallest]: smallest = L
        if R < n and heap[R] < heap[smallest]: smallest = R
        if smallest == i: break     # heap rule restored
        swap(heap, i, smallest)
        i = smallest`, caption: l('Push sifts up, pop sifts down. Both walk one root-to-leaf path, so both are O(log n).', 'Push উপরে ওঠায়, pop নিচে নামায়। দুটোই এক root-থেকে-leaf পথ হাঁটে, তাই দুটোই O(log n)।') },
      ],
    },
    {
      h: l('Complexity', 'জটিলতা'),
      blocks: [
        { table: {
          head: [l('Operation', 'অপারেশন'), l('Cost', 'খরচ')],
          rows: [
            [l('Peek min / max', 'পিক মিন / ম্যাক্স'), l('O(1)', 'O(1)')],
            [l('Push', 'পুশ'), l('O(log n)', 'O(log n)')],
            [l('Pop', 'পপ'), l('O(log n)', 'O(log n)')],
            [l('Build heap', 'হিপ তৈরি'), l('O(n)', 'O(n)')],
          ],
        } },
        { p: l('Note the two things beginners get wrong: peek is O(1) because the extreme is always at the root, and building a heap from n items at once is O(n) — cheaper than inserting them one by one (which would be O(n log n)). Searching for an arbitrary (non-extreme) value, though, is O(n): a heap gives you no help finding anything but the top.', 'নতুনরা দুটি জিনিস ভুল করে খেয়াল করুন: peek O(1) কারণ চরমটি সবসময় root-এ, এবং একবারে n আইটেম থেকে হিপ বানানো O(n)—এক-এক করে insert করার চেয়ে সস্তা (যা O(n log n) হতো)। তবে যেকোনো (চরম নয় এমন) মান খোঁজা O(n): top ছাড়া কিছু খুঁজতে হিপ কোনো সাহায্য করে না।') },
      ],
    },
    {
      h: l('When and where to use it', 'কখন ও কোথায় ব্যবহার করবেন'),
      blocks: [
        { list: [
          l('Priority queues — process work by urgency, not arrival order: OS schedulers, event simulations, Dijkstra’s and Prim’s algorithms all lean on a heap.', 'Priority queue—আগমন-ক্রম নয়, জরুরিতা অনুযায়ী কাজ প্রসেস: OS scheduler, event simulation, Dijkstra ও Prim অ্যালগরিদম সবই হিপের ওপর নির্ভর করে।'),
          l('Top-K problems — keep a heap of size k to find the k largest/smallest of a huge stream in O(n log k) without sorting everything.', 'Top-K সমস্যা—সবকিছু না সাজিয়ে বিশাল stream-এর k বৃহত্তম/ক্ষুদ্রতম O(n log k)-এ পেতে k আকারের একটি হিপ রাখো।'),
          l('Streaming medians and merging k sorted lists — a heap always surfaces the next needed element cheaply.', 'Streaming median ও k সাজানো লিস্ট merge—হিপ সবসময় পরের দরকারি উপাদান সস্তায় সামনে আনে।'),
          l('Reach for your language’s built-in (Python heapq, Java PriorityQueue, C++ priority_queue) rather than reimplementing it.', 'নিজে আবার না লিখে আপনার ভাষার built-in (Python heapq, Java PriorityQueue, C++ priority_queue) নিন।'),
        ] },
      ],
    },
    {
      h: l('Heap vs BST: do not confuse them', 'হিপ বনাম BST: গুলিয়ে ফেলবেন না'),
      blocks: [
        { table: {
          head: [l('Question', 'প্রশ্ন'), l('Heap', 'Heap'), l('Balanced BST', 'Balanced BST')],
          rows: [
            [l('Get the min/max', 'min/max পাওয়া'), l('O(1) peek', 'O(1) peek'), l('O(log n)', 'O(log n)')],
            [l('Search any value', 'যেকোনো মান search'), l('O(n)', 'O(n)'), l('O(log n)', 'O(log n)')],
            [l('Sorted iteration', 'সাজানো iteration'), l('Not supported', 'সমর্থিত নয়'), l('O(n) in-order', 'O(n) in-order')],
            [l('Ordering kept', 'ক্রম রাখা'), l('Only heap rule (partial)', 'শুধু হিপ নিয়ম (আংশিক)'), l('Full order', 'পূর্ণ ক্রম')],
          ],
        } },
        { p: l('Use a heap when you only ever need the single extreme element repeatedly. Use a BST/ordered map when you need to search arbitrary keys or walk everything in sorted order.', 'শুধু একমাত্র চরম উপাদান বারবার দরকার হলে হিপ নিন। যেকোনো key search বা সবকিছু সাজানো ক্রমে হাঁটা দরকার হলে BST/ordered map নিন।') },
      ],
    },
    {
      h: l('Common mistakes', 'সাধারণ ভুল'),
      blocks: [
        { list: [
          l('Expecting a heap to support fast search or sorted iteration like a BST. It only orders parent-vs-child — finding a middle value means scanning all n elements.', 'হিপ BST-এর মতো দ্রুত search বা সাজানো iteration দেবে আশা করা। এটি শুধু parent-বনাম-child সাজায়—একটি মধ্য মান খুঁজতে সব n উপাদান স্ক্যান করতে হয়।'),
          l('Reaching for the wrong kind — using a max-heap when you needed the smallest element. Pick min-heap vs max-heap by which extreme you pop.', 'ভুল ধরন নেওয়া—সবচেয়ে ছোট উপাদান দরকার হলেও max-heap ব্যবহার। কোন চরম pop করেন তা দিয়ে min-heap বনাম max-heap বাছুন।'),
          l('Building by inserting one at a time when all data is available up front — build-heap is O(n), but n separate pushes cost O(n log n).', 'সব ডেটা আগেই থাকলেও এক-এক করে insert করে বানানো—build-heap O(n), কিন্তু n-টি আলাদা push O(n log n) খরচ করে।'),
          l('Assuming the second element is at index 1 of the array in sorted terms — array order is not sorted order; only index 0 is guaranteed to be the extreme.', 'array-এর index 1-এ দ্বিতীয় সাজানো উপাদান আছে ধরে নেওয়া—array ক্রম সাজানো ক্রম নয়; শুধু index 0 চরম হওয়ার নিশ্চয়তা।'),
        ] },
      ],
    },
    {
      h: l('Remember in one line', 'এক লাইনে মনে রাখুন'),
      blocks: [
        { list: [
          l('A heap is a complete tree where each parent beats its children: O(1) peek, O(log n) push/pop, O(n) build.', 'হিপ একটি সম্পূর্ণ tree যেখানে প্রতিটি parent তার child-দের হারায়: O(1) peek, O(log n) push/pop, O(n) build।'),
          l('It surfaces the single extreme element cheaply but keeps nothing else in order — no fast search.', 'এটি একমাত্র চরম উপাদান সস্তায় সামনে আনে কিন্তু আর কিছুই ক্রমে রাখে না—দ্রুত search নেই।'),
          l('It is the natural implementation of a priority queue: process by urgency, not arrival order.', 'এটি একটি priority queue-এর স্বাভাবিক implementation: আগমন-ক্রম নয়, জরুরিতা অনুযায়ী প্রসেস।'),
        ] },
      ],
    },
  ],

  // ── Tries (prefix trees) ──────────────────────────────────────────────────
  'dsa-trie': [
    {
      h: l('What is a trie?', 'ট্রাই কী?'),
      blocks: [
        { p: l('A trie (pronounced "try", short for reTRIEval, also called a prefix tree) is a tree that stores a set of strings by their shared prefixes. Instead of one node per string, there is one node per character, and words that begin the same way share the same path from the root. The word "cat" is the path root → c → a → t; "car" reuses root → c → a and then branches to r. A boolean flag marks which nodes complete a real word.', 'ট্রাই (উচ্চারণ "ট্রাই", reTRIEval-এর সংক্ষিপ্ত, prefix tree-ও বলা হয়) হলো একটি tree যা একগুচ্ছ string তাদের শেয়ার্ড prefix দিয়ে রাখে। প্রতি string-এ একটি node নয়, বরং প্রতি character-এ একটি node, এবং একইভাবে শুরু হওয়া শব্দগুলো root থেকে একই পথ ভাগ করে। "cat" শব্দটি হলো পথ root → c → a → t; "car" root → c → a পুনঃব্যবহার করে তারপর r-এ শাখা হয়। একটি boolean flag চিহ্নিত করে কোন node একটি আসল শব্দ শেষ করে।') },
        { p: l('The problem it solves is fast prefix queries. To ask "which words start with ca?" in a hash set you would scan every key. In a trie you just walk the three... two nodes c → a and everything below that point is your answer. That is what powers autocomplete, spell-checkers, and IP routing tables.', 'এটি যে সমস্যা সমাধান করে তা হলো দ্রুত prefix query। একটি hash set-এ "কোন শব্দ ca দিয়ে শুরু?" জিজ্ঞাসা করতে আপনাকে প্রতিটি key স্ক্যান করতে হতো। একটি trie-তে আপনি শুধু c → a দুটি node হাঁটেন এবং সেই বিন্দুর নিচের সবকিছু আপনার উত্তর। এটিই autocomplete, spell-checker ও IP routing table চালায়।') },
        { note: l('Think of a phone contact search: type "Ra" and the list instantly narrows to Rahim, Rana, Rashida. Each extra letter walks one step deeper down a shared path and prunes everything that no longer matches. That is a trie in action.', 'একটি ফোন কন্টাক্ট সার্চ ভাবুন: "Ra" টাইপ করুন আর তালিকা তাৎক্ষণিক Rahim, Rana, Rashida-তে সংকীর্ণ হয়। প্রতিটি অতিরিক্ত অক্ষর একটি শেয়ার্ড পথে এক ধাপ গভীরে হাঁটে ও আর না-মেলা সব ছেঁটে ফেলে। এটাই কাজ-করা একটি trie।'), kind: 'tip' },
      ],
    },
    {
      h: l('How it works, step by step', 'কীভাবে কাজ করে, ধাপে ধাপে'),
      blocks: [
        { p: l('Every node holds a small map from a character to a child node, plus a flag saying "a word ends here." Insert and search both just walk that map one character at a time.', 'প্রতিটি node একটি character থেকে একটি child node-এ একটি ছোট map রাখে, সঙ্গে একটি flag যা বলে "এখানে একটি শব্দ শেষ হয়।" insert ও search দুটোই সেই map একবারে একটি character করে হাঁটে।') },
        { steps: [
          l('Insert a word: start at the root. For each character, if a child for it exists follow it, otherwise create it. After the last character, set that node’s "end of word" flag to true.', 'একটি শব্দ insert: root থেকে শুরু। প্রতিটি character-এর জন্য, তার child থাকলে অনুসরণ করো, নইলে বানাও। শেষ character-এর পর সেই node-এর "শব্দ শেষ" flag true করো।'),
          l('Search a full word: walk character by character. If a link is ever missing, the word is not present. If you reach the end, it exists only if that node’s "end of word" flag is set.', 'একটি পূর্ণ শব্দ search: character-ধরে-character হাঁটো। কোনো link অনুপস্থিত হলে শব্দটি নেই। শেষে পৌঁছালে, শুধু তখনই আছে যদি সেই node-এর "শব্দ শেষ" flag সেট থাকে।'),
          l('Prefix search: walk the prefix the same way. If you can follow every character, the prefix exists — and everything in the subtree below is a word that starts with it.', 'Prefix search: prefix-টি একইভাবে হাঁটো। প্রতিটি character অনুসরণ করতে পারলে prefix-টি আছে—এবং নিচের subtree-এর সবকিছু তা দিয়ে শুরু হওয়া শব্দ।'),
          l('Autocomplete: reach the prefix node, then run a traversal of its subtree collecting every node with the end-of-word flag set.', 'Autocomplete: prefix node-এ পৌঁছাও, তারপর এর subtree ট্রাভার্স করে "শব্দ শেষ" flag-সেট প্রতিটি node সংগ্রহ করো।'),
        ] },
        { code: `# Each node: a map of char -> child, and a flag for word endings.
node = { children: {}, isEnd: false }

function insert(root, word):
    cur = root
    for ch in word:
        if ch not in cur.children:
            cur.children[ch] = newNode()   # grow the path
        cur = cur.children[ch]
    cur.isEnd = true                       # mark the last node

function search(root, word):
    cur = root
    for ch in word:
        if ch not in cur.children:
            return false                   # path breaks -> not present
        cur = cur.children[ch]
    return cur.isEnd                       # present only if a word ends here

function startsWith(root, prefix):
    cur = root
    for ch in prefix:
        if ch not in cur.children:
            return false
        cur = cur.children[ch]
    return true                            # the prefix path exists`, caption: l('Insert grows a path; search and startsWith walk it. Each is O(L) in the length L of the query word.', 'insert একটি পথ বাড়ায়; search ও startsWith তা হাঁটে। প্রতিটি query শব্দের দৈর্ঘ্য L-এ O(L)।') },
      ],
    },
    {
      h: l('Complexity', 'জটিলতা'),
      blocks: [
        { p: l('The key insight: a trie’s operations cost depends on the length L of the word, not on how many words n are stored. Whether the dictionary holds 100 words or 100 million, looking up a 5-letter word touches 5 nodes.', 'মূল অন্তর্দৃষ্টি: একটি trie-এর অপারেশনের খরচ শব্দের দৈর্ঘ্য L-এর ওপর নির্ভর করে, কতগুলো শব্দ n রাখা তার ওপর নয়। অভিধানে ১০০ শব্দ থাক বা ১০ কোটি, একটি ৫-অক্ষরের শব্দ খুঁজতে ৫টি node ছোঁয়া হয়।') },
        { table: {
          head: [l('Operation', 'অপারেশন'), l('Cost', 'খরচ')],
          rows: [
            [l('Insert word', 'শব্দ ইনসার্ট'), l('O(L)', 'O(L)')],
            [l('Search word', 'শব্দ সার্চ'), l('O(L)', 'O(L)')],
            [l('Prefix search', 'প্রিফিক্স সার্চ'), l('O(L)', 'O(L)')],
          ],
        } },
        { p: l('Here L is the length of the word or prefix. The trade-off lives in space, not time: each node carries a child map, so a trie can use far more memory than a hash set for the same words — especially when keys share few prefixes.', 'এখানে L হলো শব্দ বা prefix-এর দৈর্ঘ্য। ট্রেড-অফ থাকে স্পেসে, সময়ে নয়: প্রতিটি node একটি child map বহন করে, তাই একই শব্দের জন্য একটি trie একটি hash set-এর চেয়ে অনেক বেশি মেমরি নিতে পারে—বিশেষত যখন key-রা কম prefix ভাগ করে।') },
        { p: l('One more thing to notice: a hash set can answer "is this exact word present?" in O(L) too, because it still has to hash all L characters. So a trie is not asymptotically faster for exact lookups — its real advantage is that a prefix walk stops early and hands you an entire subtree of matches, something a hash set simply cannot do without scanning every key.', 'আরেকটি লক্ষণীয় বিষয়: একটি hash set-ও "এই ঠিক শব্দটি আছে কি?" O(L)-এ উত্তর দিতে পারে, কারণ এটিকেও সব L character hash করতে হয়। তাই exact lookup-এ trie অ্যাসিম্পটোটিকভাবে দ্রুত নয়—এর আসল সুবিধা হলো একটি prefix হাঁটা আগেই থামে ও আপনাকে ম্যাচের একটি পুরো subtree দেয়, যা প্রতিটি key স্ক্যান না করে একটি hash set করতেই পারে না।') },
      ],
    },
    {
      h: l('When and where to use it', 'কখন ও কোথায় ব্যবহার করবেন'),
      blocks: [
        { list: [
          l('Autocomplete and type-ahead — the flagship use: find all completions of a prefix instantly.', 'Autocomplete ও type-ahead—প্রধান ব্যবহার: একটি prefix-এর সব সম্পূর্ণরূপ তাৎক্ষণিক খুঁজুন।'),
          l('Spell-checkers and dictionaries — fast membership plus "did you mean" prefix suggestions.', 'Spell-checker ও অভিধান—দ্রুত membership এবং "আপনি কি বোঝাতে চেয়েছেন" prefix পরামর্শ।'),
          l('Prefix or wildcard matching — IP routing (longest-prefix match), phone directories, T9 text entry.', 'Prefix বা wildcard ম্যাচিং—IP routing (দীর্ঘতম-prefix ম্যাচ), ফোন ডিরেক্টরি, T9 টেক্সট।'),
          l('Choose a trie over a hash set specifically when you need prefix queries. If you only ever ask "is this exact word present?", a hash set is simpler, smaller, and just as fast.', 'শুধু prefix query দরকার হলে hash set-এর বদলে trie নিন। যদি কেবল "এই ঠিক শব্দটি আছে কি?" জিজ্ঞাসা করেন, hash set সরল, ছোট ও সমান দ্রুত।'),
        ] },
      ],
    },
    {
      h: l('Common mistakes', 'সাধারণ ভুল'),
      blocks: [
        { list: [
          l('Using a trie where a hash set suffices — paying memory for prefix machinery you never query. If there are no prefix questions, a hash set wins on both memory and simplicity.', 'hash set যথেষ্ট হলেও trie ব্যবহার—যে prefix-যন্ত্র কখনো খোঁজেন না তার জন্য মেমরি দেওয়া। prefix প্রশ্ন না থাকলে hash set মেমরি ও সরলতা দুটোতেই জেতে।'),
          l('Forgetting the end-of-word flag. Without it you cannot tell a stored word from a mere prefix — "car" being present does not mean "ca" was ever inserted.', '"শব্দ শেষ" flag ভুলে যাওয়া। এটি ছাড়া একটি রাখা শব্দকে নিছক prefix থেকে আলাদা করতে পারবেন না—"car" থাকা মানে "ca" কখনো insert হয়েছে নয়।'),
          l('Ignoring the alphabet size. A fixed 26-slot array per node is fast but wastes space for sparse data; a hash map per node saves memory but adds overhead. Pick to match your key set.', 'বর্ণমালার আকার উপেক্ষা করা। প্রতি node-এ নির্দিষ্ট ২৬-স্লট array দ্রুত কিন্তু বিরল ডেটায় স্পেস অপচয় করে; প্রতি node-এ hash map মেমরি বাঁচায় কিন্তু ওভারহেড যোগ করে। key সেটের সঙ্গে মিলিয়ে বাছুন।'),
          l('Deleting a word by removing nodes that another word still uses. Only prune a node if no other word passes through it and it ends nothing.', 'অন্য শব্দ এখনো ব্যবহার করে এমন node সরিয়ে একটি শব্দ delete করা। কোনো node শুধু তখনই ছাঁটুন যদি অন্য কোনো শব্দ এর মধ্য দিয়ে না যায় ও এটি কিছু শেষ না করে।'),
        ] },
      ],
    },
    {
      h: l('Remember in one line', 'এক লাইনে মনে রাখুন'),
      blocks: [
        { list: [
          l('A trie stores strings by shared prefixes, one node per character, making search and prefix queries O(L) regardless of how many words it holds.', 'trie শব্দ শেয়ার্ড prefix দিয়ে রাখে, প্রতি character-এ এক node, যা কতগুলো শব্দ ধরে তা নির্বিশেষে search ও prefix query O(L) করে।'),
          l('It is the go-to structure for autocomplete, spell-check, and prefix/wildcard matching.', 'এটি autocomplete, spell-check ও prefix/wildcard ম্যাচিংয়ের প্রধান স্ট্রাকচার।'),
          l('It trades memory for prefix power — if you never query prefixes, use a hash set instead.', 'এটি prefix-শক্তির বিনিময়ে মেমরি দেয়—prefix কখনো না খুঁজলে বরং hash set ব্যবহার করুন।'),
        ] },
      ],
    },
  ],

  // ── Graph representations ─────────────────────────────────────────────────
  'dsa-graph-basics': [
    {
      h: l('What is a graph, and how do you store one?', 'গ্রাফ কী, এবং কীভাবে রাখবেন?'),
      blocks: [
        { p: l('A graph is the most general way to model relationships: a set of nodes (also called vertices) joined by edges. Unlike a tree, a graph has no root, no required hierarchy, and can contain cycles. Edges may be directed (a one-way follow on social media) or undirected (a mutual friendship), and weighted (a road with a distance) or unweighted (just "connected or not").', 'গ্রাফ হলো সম্পর্ক মডেল করার সবচেয়ে সাধারণ উপায়: edge দিয়ে যুক্ত একগুচ্ছ node (vertex-ও বলা হয়)। tree-এর মতো নয়, গ্রাফের কোনো root নেই, কোনো আবশ্যক শ্রেণিবিন্যাস নেই, এবং cycle থাকতে পারে। edge directed (সোশ্যাল মিডিয়ায় একমুখী follow) বা undirected (পারস্পরিক বন্ধুত্ব) হতে পারে, এবং weighted (দূরত্বসহ একটি সড়ক) বা unweighted (শুধু "যুক্ত কি না") হতে পারে।') },
        { p: l('The problem this topic solves is not "what is a graph" but "how do I put one in memory?" The abstract graph is the same, but the two standard representations — an adjacency list and an adjacency matrix — make very different trade-offs, and picking the wrong one can waste enormous memory or make your algorithm slow.', 'এই টপিক যে সমস্যা সমাধান করে তা "গ্রাফ কী" নয় বরং "কীভাবে একে মেমরিতে রাখব?" বিমূর্ত গ্রাফ একই, তবে দুটি স্ট্যান্ডার্ড রিপ্রেজেন্টেশন—adjacency list ও adjacency matrix—খুব ভিন্ন ট্রেড-অফ করে, এবং ভুলটি বাছলে বিশাল মেমরি অপচয় বা অ্যালগরিদম ধীর হতে পারে।') },
        { note: l('Picture a map of cities connected by roads — some direct, some one-way, some marked with a distance. The cities are nodes and the roads are edges. How you write that map down — a list of each city’s neighbours, or a giant grid of every city-pair — is the representation choice.', 'সড়কে যুক্ত শহরের মানচিত্র ভাবুন—কিছু সরাসরি, কিছু একমুখী, কিছুতে দূরত্ব লেখা। শহরগুলো node ও সড়কগুলো edge। সেই মানচিত্র কীভাবে লিখবেন—প্রতিটি শহরের প্রতিবেশীর একটি তালিকা, নাকি প্রতিটি শহর-জোড়ার একটি বিশাল গ্রিড—এটাই রিপ্রেজেন্টেশন পছন্দ।'), kind: 'tip' },
      ],
    },
    {
      h: l('The two representations', 'দুটি রিপ্রেজেন্টেশন'),
      blocks: [
        { steps: [
          l('Adjacency list: for each node, store a list of the nodes it connects to. Total memory is O(V + E) — one entry per node plus one per edge — so it stays small on sparse graphs (few edges).', 'Adjacency list: প্রতিটি node-এর জন্য, এটি যে node-দের সঙ্গে যুক্ত তার একটি তালিকা রাখো। মোট মেমরি O(V + E)—প্রতি node-এ একটি এন্ট্রি এবং প্রতি edge-এ একটি—তাই বিরল গ্রাফে (কম edge) এটি ছোট থাকে।'),
          l('Adjacency matrix: a V×V grid where cell [i][j] is 1 (or the weight) if an edge goes from i to j, else 0. Memory is always O(V²), regardless of how few edges there are.', 'Adjacency matrix: একটি V×V গ্রিড যেখানে cell [i][j] হলো 1 (বা weight) যদি i থেকে j-তে একটি edge যায়, নইলে 0। edge যত কমই থাক, মেমরি সবসময় O(V²)।'),
          l('To check "is there an edge i→j?": the matrix answers in O(1) by direct index; the list must scan node i’s neighbours, O(degree).', '"i→j edge আছে কি?" যাচাইয়ে: matrix সরাসরি index-এ O(1)-এ উত্তর দেয়; list-কে node i-এর প্রতিবেশী স্ক্যান করতে হয়, O(degree)।'),
          l('To iterate a node’s neighbours: the list gives exactly them; the matrix must scan a whole row of V cells even if only two are edges.', 'একটি node-এর প্রতিবেশী iterate করতে: list ঠিক তাদের দেয়; matrix-কে পুরো V-cell সারি স্ক্যান করতে হয় এমনকি মাত্র দুটি edge হলেও।'),
        ] },
        { code: `# Same 4-node graph, two representations.
# Edges: 0-1, 0-2, 1-2, 2-3  (undirected)

# Adjacency list — one list of neighbours per node. O(V + E) space.
adj = {
  0: [1, 2],
  1: [0, 2],
  2: [0, 1, 3],
  3: [2],
}
hasEdge(u, v):  return v in adj[u]        # O(degree of u)

# Adjacency matrix — a V x V grid. O(V^2) space, always.
#     0  1  2  3
# 0 [ 0, 1, 1, 0 ]
# 1 [ 1, 0, 1, 0 ]
# 2 [ 1, 1, 0, 1 ]
# 3 [ 0, 0, 1, 0 ]
hasEdge(u, v):  return matrix[u][v] == 1  # O(1) direct lookup`, caption: l('The same graph as an adjacency list (compact, O(V+E)) and an adjacency matrix (O(1) edge test, O(V²) space).', 'একই গ্রাফ adjacency list (কম্প্যাক্ট, O(V+E)) ও adjacency matrix (O(1) edge টেস্ট, O(V²) স্পেস) হিসেবে।') },
      ],
    },
    {
      h: l('List vs matrix: the trade-off', 'List বনাম matrix: ট্রেড-অফ'),
      blocks: [
        { p: l('There is no complexity table baked into this lesson because the whole topic is the comparison. Let V be the number of nodes and E the number of edges.', 'এই লেসনে কোনো জটিলতা টেবিল নেই কারণ পুরো টপিকটাই তুলনা। V হোক node সংখ্যা ও E হোক edge সংখ্যা।') },
        { table: {
          head: [l('Aspect', 'দিক'), l('Adjacency list', 'Adjacency list'), l('Adjacency matrix', 'Adjacency matrix')],
          rows: [
            [l('Space', 'স্পেস'), l('O(V + E)', 'O(V + E)'), l('O(V²)', 'O(V²)')],
            [l('Check edge i→j', 'edge i→j যাচাই'), l('O(degree)', 'O(degree)'), l('O(1)', 'O(1)')],
            [l('Iterate a node’s neighbours', 'একটি node-এর প্রতিবেশী iterate'), l('O(degree)', 'O(degree)'), l('O(V)', 'O(V)')],
            [l('Add an edge', 'একটি edge যোগ'), l('O(1)', 'O(1)'), l('O(1)', 'O(1)')],
            [l('Best for', 'কার জন্য'), l('Sparse graphs (E ≪ V²)', 'বিরল গ্রাফ (E ≪ V²)'), l('Dense graphs, frequent edge tests', 'ঘন গ্রাফ, ঘন edge টেস্ট')],
          ],
        } },
        { p: l('Most real-world graphs — road networks, social graphs, the web — are sparse: each node connects to a handful of others, not to nearly everyone. That is why the adjacency list is the default choice in practice, and why traversals like BFS and DFS run in O(V + E) on it.', 'বেশিরভাগ বাস্তব গ্রাফ—সড়ক নেটওয়ার্ক, সোশ্যাল গ্রাফ, ওয়েব—বিরল: প্রতিটি node হাতেগোনা কয়েকটির সঙ্গে যুক্ত, প্রায় সবার সঙ্গে নয়। এ কারণেই adjacency list বাস্তবে ডিফল্ট পছন্দ, এবং এ কারণেই BFS ও DFS-এর মতো traversal এতে O(V + E)-এ চলে।') },
        { p: l('There is a third, lighter option worth knowing: an edge list — just an array of (u, v) pairs (plus a weight if any). It uses O(E) space and is the simplest to build, but answering "are u and v connected?" means scanning every edge. It shines for algorithms that process all edges in bulk, such as Kruskal’s MST, which sorts the edge list once and never asks about a single pair.', 'জানার মতো একটি তৃতীয়, হালকা বিকল্প আছে: একটি edge list—শুধু (u, v) জোড়ার একটি array (থাকলে একটি weight-সহ)। এটি O(E) স্পেস নেয় ও বানানো সবচেয়ে সরল, কিন্তু "u ও v যুক্ত কি?" উত্তর দিতে প্রতিটি edge স্ক্যান করতে হয়। এটি এমন অ্যালগরিদমে ভালো যা সব edge একসঙ্গে প্রসেস করে, যেমন Kruskal-এর MST, যা edge list একবার সাজায় ও কখনো একটি জোড়া সম্পর্কে জিজ্ঞাসা করে না।') },
      ],
    },
    {
      h: l('When and where to use which', 'কখন ও কোথায় কোনটি ব্যবহার করবেন'),
      blocks: [
        { list: [
          l('Default to an adjacency list. Most graphs are sparse, and it keeps memory at O(V + E) while letting traversals iterate neighbours efficiently.', 'ডিফল্ট হিসেবে adjacency list নিন। বেশিরভাগ গ্রাফ বিরল, এবং এটি মেমরি O(V + E)-এ রাখে আর traversal-কে দক্ষভাবে প্রতিবেশী iterate করতে দেয়।'),
          l('Use an adjacency matrix when the graph is dense (E approaches V²), or when you repeatedly ask "is there an edge between these two?" and need that in O(1).', 'গ্রাফ ঘন হলে (E, V²-এর কাছে যায়), বা বারবার "এই দুইয়ের মধ্যে edge আছে কি?" জিজ্ঞাসা করে O(1)-এ দরকার হলে adjacency matrix নিন।'),
          l('A matrix also shines for small graphs and for algorithms expressed in matrix terms (like Floyd-Warshall all-pairs shortest paths).', 'ছোট গ্রাফে এবং matrix-ভিত্তিক অ্যালগরিদমে (যেমন Floyd-Warshall all-pairs shortest path) matrix-ও ভালো।'),
          l('Always note two properties up front: is the graph directed or undirected, and are edges weighted or not? They change how you store each edge and which algorithms apply.', 'সবসময় আগে দুটি ধর্ম লক্ষ করুন: গ্রাফ directed না undirected, এবং edge weighted কি না? এরা প্রতিটি edge কীভাবে রাখবেন ও কোন অ্যালগরিদম খাটবে তা বদলায়।'),
        ] },
      ],
    },
    {
      h: l('Common mistakes', 'সাধারণ ভুল'),
      blocks: [
        { list: [
          l('Using an adjacency matrix for a huge sparse graph and wasting O(V²) memory — a million nodes would need a trillion cells, almost all zeros.', 'বিশাল বিরল গ্রাফে adjacency matrix ব্যবহার করে O(V²) মেমরি অপচয়—দশ লক্ষ node-এর জন্য এক ট্রিলিয়ন cell লাগত, প্রায় সবই শূন্য।'),
          l('Forgetting to add both directions for an undirected edge in an adjacency list — an edge u-v must appear in both u’s and v’s lists.', 'adjacency list-এ একটি undirected edge-এর দুই দিক যোগ করতে ভুলে যাওয়া—একটি edge u-v অবশ্যই u ও v দুটোর তালিকায় থাকতে হবে।'),
          l('Confusing "sparse" with "small". A sparse graph can have millions of nodes; sparse means few edges relative to V², not few nodes.', '"বিরল"-কে "ছোট" ভাবা। একটি বিরল গ্রাফে লক্ষ লক্ষ node থাকতে পারে; বিরল মানে V²-এর তুলনায় কম edge, কম node নয়।'),
          l('Picking a representation before knowing your access pattern — the right choice depends on whether you scan neighbours (list) or test individual edges (matrix) more often.', 'অ্যাক্সেস প্যাটার্ন জানার আগে রিপ্রেজেন্টেশন বাছা—সঠিক পছন্দ নির্ভর করে আপনি প্রতিবেশী স্ক্যান (list) নাকি আলাদা edge টেস্ট (matrix) বেশি করেন তার ওপর।'),
        ] },
      ],
    },
    {
      h: l('Remember in one line', 'এক লাইনে মনে রাখুন'),
      blocks: [
        { list: [
          l('A graph is nodes joined by edges; the two ways to store it are an adjacency list (O(V+E) space) and an adjacency matrix (O(V²) space, O(1) edge test).', 'গ্রাফ হলো edge দিয়ে যুক্ত node; এটি রাখার দুই উপায় adjacency list (O(V+E) স্পেস) ও adjacency matrix (O(V²) স্পেস, O(1) edge টেস্ট)।'),
          l('Default to the adjacency list — most real graphs are sparse; reach for a matrix only when the graph is dense or edge tests must be O(1).', 'ডিফল্ট adjacency list—বেশিরভাগ বাস্তব গ্রাফ বিরল; শুধু গ্রাফ ঘন হলে বা edge টেস্ট O(1) হতে হলে matrix নিন।'),
          l('Always note whether edges are directed and weighted — it drives both storage and algorithm choice.', 'সবসময় লক্ষ করুন edge directed ও weighted কি না—এটি storage ও অ্যালগরিদম পছন্দ দুটোই চালায়।'),
        ] },
      ],
    },
  ],
}
