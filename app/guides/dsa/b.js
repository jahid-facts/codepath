// Deep, structured teaching guides (bilingual) for DSA linear structures,
// searching, and elementary sorts. Rendered as the lesson "In depth" section.
// Each guide is an array of sections; each section = { h, blocks }.
// Facts (Big-O, behaviour) mirror app/courses/dsa.js — keep them accurate.

const l = (en, bn) => ({ en, bn })

export default {
  // ── Stacks ────────────────────────────────────────────────────────────────
  'dsa-stack': [
    {
      h: l('What is a stack?', 'স্ট্যাক কী?'),
      blocks: [
        { p: l('A stack is a linear data structure with one strict rule: last-in, first-out (LIFO). You may only add an item to the top (push) and only remove the item from the top (pop). The element you inserted most recently is always the first one you take out. There is no reaching into the middle and no reaching for the bottom — the top is the only door in and out.', 'স্ট্যাক হলো একটি লিনিয়ার ডেটা স্ট্রাকচার যার একটি কড়া নিয়ম: last-in, first-out (LIFO)। আপনি শুধু ওপরে একটি আইটেম যোগ করতে পারেন (push) এবং শুধু ওপর থেকে আইটেম সরাতে পারেন (pop)। সবচেয়ে সম্প্রতি যা ঢুকিয়েছেন সেটাই সবসময় প্রথমে বের হয়। মাঝে হাত দেওয়া নেই, তলায় হাত দেওয়া নেই—top-ই ভেতরে-বাইরে যাওয়ার একমাত্র দরজা।') },
        { p: l('The problem a stack solves is: "I need to remember things in reverse order — the newest first." Whenever work naturally nests inside other work (a function that calls a function, a bracket that opens inside another bracket, a step you may need to undo), the most recent unfinished item is exactly the one you must deal with next. A stack captures that pattern in the data structure itself, so you never have to hunt for "which item is newest".', 'স্ট্যাক যে সমস্যা সমাধান করে: "আমাকে জিনিস উল্টো ক্রমে মনে রাখতে হবে—নতুনটি আগে।" যখনই কাজ স্বভাবতই অন্য কাজের ভেতরে নেস্ট করে (একটি function আরেকটি function ডাকে, একটি bracket আরেক bracket-এর ভেতরে খোলে, একটি step যা আপনি undo করতে পারেন), তখন সবচেয়ে সাম্প্রতিক অসমাপ্ত আইটেমটিই পরবর্তীতে সামলানোর জিনিস। স্ট্যাক এই প্যাটার্নকে ডেটা স্ট্রাকচারেই ধরে রাখে, তাই "কোন আইটেম নতুন" তা কখনো খুঁজতে হয় না।') },
        { note: l('Think of a stack of plates in a cafeteria. You add a clean plate to the top and take a plate from the top. You never pull one out of the middle, and the plate you just placed is the first one the next person grabs. That is LIFO in real life.', 'ক্যাফেটেরিয়ায় প্লেটের একটি স্তূপ ভাবুন। আপনি ওপরে একটি পরিষ্কার প্লেট রাখেন ও ওপর থেকে একটি প্লেট নেন। কখনো মাঝ থেকে টেনে বের করেন না, আর এইমাত্র রাখা প্লেটটিই পরের ব্যক্তি প্রথমে নেয়। এটাই বাস্তব জীবনে LIFO।'), kind: 'tip' },
      ],
    },
    {
      h: l('How a stack works, step by step', 'স্ট্যাক কীভাবে কাজ করে, ধাপে ধাপে'),
      blocks: [
        { p: l('A stack really only needs three operations, and each one touches only the top. Here is what happens when you push three items and then pop one.', 'একটি স্ট্যাকের আসলে মাত্র তিনটি অপারেশন দরকার, আর প্রতিটি শুধু top স্পর্শ করে। তিনটি আইটেম push করে তারপর একটি pop করলে কী ঘটে তা এখানে।') },
        { steps: [
          l('push(A) — the stack is empty, so A becomes the top. Contents: [A].', 'push(A)—স্ট্যাক খালি, তাই A হয় top। ভেতরে: [A]।'),
          l('push(B) — B goes on top of A. Contents: [A, B], top is B.', 'push(B)—B বসে A-এর ওপর। ভেতরে: [A, B], top হলো B।'),
          l('push(C) — C goes on top of B. Contents: [A, B, C], top is C.', 'push(C)—C বসে B-এর ওপর। ভেতরে: [A, B, C], top হলো C।'),
          l('peek() — look at the top without removing it. It returns C. Contents unchanged.', 'peek()—না সরিয়ে top দেখুন। এটি C ফেরত দেয়। ভেতরে অপরিবর্তিত।'),
          l('pop() — remove and return the top, C (the newest). Contents: [A, B], top is now B.', 'pop()—top, অর্থাৎ C (সবচেয়ে নতুন) সরিয়ে ফেরত দিন। ভেতরে: [A, B], top এখন B।'),
        ] },
        { p: l('Notice C came out before B and A even though A and B were waiting longer. That reversal is the whole point.', 'লক্ষ করুন C বেরিয়েছে B ও A-এর আগে, যদিও A ও B বেশিক্ষণ অপেক্ষায় ছিল। এই উল্টানোটাই আসল উদ্দেশ্য।') },
        { code: `# Array-backed stack — the top is the end of the array
stack = []              # empty stack

def push(x):
    stack.append(x)     # add x to the end  -> O(1)

def pop():
    if is_empty():
        error("stack underflow")
    return stack.pop()  # remove & return last -> O(1)

def peek():
    if is_empty():
        error("stack is empty")
    return stack[-1]    # look at last, do not remove

def is_empty():
    return len(stack) == 0`, caption: l('The end of a dynamic array is the natural "top": append and remove-last are both O(1), so a plain array makes a perfect stack.', 'একটি ডাইনামিক অ্যারের শেষপ্রান্তই স্বাভাবিক "top": append ও remove-last দুটোই O(1), তাই সাধারণ array দিয়েই নিখুঁত স্ট্যাক হয়।') },
      ],
    },
    {
      h: l('Two ways to build one', 'দুইভাবে বানানো যায়'),
      blocks: [
        { p: l('You can back a stack with a dynamic array (push = append to the end, pop = remove the end) or with a singly linked list (push = insert at the head, pop = remove the head). Both give O(1) push and pop. The array version is cache-friendly and simplest; the linked-list version never needs to resize but spends extra memory on a pointer per node.', 'আপনি একটি স্ট্যাক ডাইনামিক array দিয়ে (push = শেষে append, pop = শেষ সরানো) অথবা singly linked list দিয়ে (push = head-এ insert, pop = head সরানো) বানাতে পারেন। দুটোই O(1) push ও pop দেয়। array সংস্করণ cache-বান্ধব ও সবচেয়ে সরল; linked-list সংস্করণে কখনো resize লাগে না তবে প্রতি node-এ একটি pointer-এর অতিরিক্ত মেমরি খরচ হয়।') },
        { note: l('Two errors to guard against: popping or peeking an empty stack (a "stack underflow"), and, in a fixed-size array, pushing onto a full stack (a "stack overflow" — yes, that is where the website name comes from). Always check is_empty() before you pop.', 'দুটি ভুল থেকে সাবধান: খালি স্ট্যাকে pop বা peek করা (একটি "stack underflow"), আর নির্দিষ্ট-সাইজ array-তে ভরা স্ট্যাকে push করা (একটি "stack overflow"—হ্যাঁ, ওয়েবসাইটের নামটি এখান থেকেই)। pop করার আগে সবসময় is_empty() যাচাই করুন।'), kind: 'warn' },
      ],
    },
    {
      h: l('Complexity', 'জটিলতা'),
      blocks: [
        { p: l('Because every operation touches only the top, a stack is one of the fastest structures there is. The one slow operation is searching for a value, which forces you to look past the top.', 'যেহেতু প্রতিটি অপারেশন শুধু top স্পর্শ করে, স্ট্যাক দ্রুততম স্ট্রাকচারগুলোর একটি। একমাত্র ধীর অপারেশন হলো একটি মান খোঁজা, যা আপনাকে top-এর বাইরে দেখতে বাধ্য করে।') },
        { table: {
          head: [l('Operation', 'অপারেশন'), l('Big-O', 'Big-O'), l('Why', 'কেন')],
          rows: [
            [l('Push', 'পুশ'), l('O(1)', 'O(1)'), l('Add to the top; nothing else moves.', 'top-এ যোগ; আর কিছু নড়ে না।')],
            [l('Pop', 'পপ'), l('O(1)', 'O(1)'), l('Remove the top; nothing else moves.', 'top সরানো; আর কিছু নড়ে না।')],
            [l('Peek', 'পিক'), l('O(1)', 'O(1)'), l('Read the top without removing it.', 'না সরিয়ে top পড়া।')],
            [l('Search', 'সার্চ'), l('O(n)', 'O(n)'), l('A value in the middle means popping past everything above it.', 'মাঝের একটি মান মানে তার ওপরের সব পার করা।')],
          ],
        } },
      ],
    },
    {
      h: l('When and where to use a stack', 'কোথায় ও কখন স্ট্যাক ব্যবহার করবেন'),
      blocks: [
        { p: l('Reach for a stack whenever the natural order of processing is "newest first" or work is nested inside work.', 'যখনই প্রক্রিয়ার স্বাভাবিক ক্রম "নতুনটি আগে" বা কাজ কাজের ভেতরে নেস্ট করে, তখন স্ট্যাক নিন।') },
        { list: [
          l('Undo / redo — each action is pushed; Ctrl+Z pops the most recent one first.', 'Undo / redo—প্রতিটি action push হয়; Ctrl+Z সবচেয়ে সাম্প্রতিকটি আগে pop করে।'),
          l('The function call stack — every call pushes a frame; returning pops it. Recursion is a stack you get for free.', 'function call stack—প্রতিটি কল একটি frame push করে; return তা pop করে। Recursion হলো বিনামূল্যে পাওয়া একটি স্ট্যাক।'),
          l('Expression parsing and matching brackets — push each open bracket, pop and check when you meet a closing one.', 'এক্সপ্রেশন পার্সিং ও bracket মেলানো—প্রতিটি খোলা bracket push করুন, বন্ধেরটি এলে pop করে মিলিয়ে দেখুন।'),
          l('Backtracking and DFS (depth-first search) — a stack remembers the path so you can retreat to the last choice point.', 'ব্যাকট্র্যাকিং ও DFS (depth-first search)—একটি স্ট্যাক পথ মনে রাখে যাতে শেষ সিদ্ধান্ত-বিন্দুতে ফিরতে পারেন।'),
          l('Browser history back button — the last page you visited is the first you return to.', 'ব্রাউজার history back বোতাম—শেষ যে পেজ দেখেছেন সেটাই প্রথমে ফেরেন।'),
        ] },
        { p: l('Choose a stack over a queue when order should be reversed (newest first). If instead you must preserve arrival order (oldest first, fairness), you want a queue, not a stack.', 'যখন ক্রম উল্টাতে হবে (নতুনটি আগে) তখন queue-এর বদলে stack নিন। উল্টো, যদি আগমন-ক্রম রাখতে হয় (পুরনোটি আগে, ন্যায্যতা), তবে stack নয়, queue চান।') },
      ],
    },
    {
      h: l('Common mistakes', 'সাধারণ ভুল'),
      blocks: [
        { list: [
          l('Trying to reach an item in the middle or bottom of a stack. If you find yourself wanting that, a stack is the wrong structure — switch to a queue, a deque, or an array with indexing.', 'স্ট্যাকের মাঝ বা তলার একটি আইটেমে পৌঁছানোর চেষ্টা। এমন দরকার হলে স্ট্যাক ভুল স্ট্রাকচার—queue, deque, বা index-সহ array-তে যান।'),
          l('Popping or peeking without checking is_empty() first, which crashes or returns garbage on an empty stack.', 'আগে is_empty() যাচাই না করে pop বা peek করা, যা খালি স্ট্যাকে ক্র্যাশ করে বা আবর্জনা ফেরত দেয়।'),
          l('Confusing a stack with a queue: a stack reverses order (LIFO), a queue preserves it (FIFO). Using the wrong one silently breaks fairness or nesting.', 'স্ট্যাক ও queue গুলিয়ে ফেলা: স্ট্যাক ক্রম উল্টায় (LIFO), queue তা রাখে (FIFO)। ভুলটি ব্যবহার নীরবে ন্যায্যতা বা নেস্টিং ভাঙে।'),
          l('Forgetting that deep recursion pushes many frames onto the real call stack and can overflow it — sometimes an explicit stack in a loop is safer.', 'ভুলে যাওয়া যে গভীর recursion আসল call stack-এ অনেক frame push করে ও তা overflow করতে পারে—কখনো লুপে একটি explicit stack বেশি নিরাপদ।'),
        ] },
      ],
    },
    {
      h: l('Remember in one line', 'এক লাইনে মনে রাখুন'),
      blocks: [
        { list: [
          l('A stack is LIFO: push and pop only at the top, all in O(1).', 'স্ট্যাক হলো LIFO: push ও pop শুধু top-এ, সবই O(1)-এ।'),
          l('Use it for undo, recursion, bracket matching, and backtracking — anything "newest first".', 'undo, recursion, bracket মেলানো ও ব্যাকট্র্যাকিং-এ ব্যবহার করুন—যা কিছু "নতুনটি আগে"।'),
          l('If you need the middle or the oldest item, you want a different structure.', 'মাঝের বা পুরনোতম আইটেম দরকার হলে আপনি অন্য স্ট্রাকচার চান।'),
        ] },
      ],
    },
  ],

  // ── Queues & deques ─────────────────────────────────────────────────────────
  'dsa-queue': [
    {
      h: l('What is a queue?', 'কিউ কী?'),
      blocks: [
        { p: l('A queue is a linear data structure with the opposite rule to a stack: first-in, first-out (FIFO). You add items at the back (enqueue) and remove them from the front (dequeue). Whoever arrived first is served first, so a queue preserves arrival order perfectly. A deque ("double-ended queue") relaxes this slightly, letting you add and remove at both ends.', 'কিউ হলো একটি লিনিয়ার ডেটা স্ট্রাকচার যার নিয়ম স্ট্যাকের উল্টো: first-in, first-out (FIFO)। আপনি পেছনে আইটেম যোগ করেন (enqueue) ও সামনে থেকে সরান (dequeue)। যে আগে এসেছে সে আগে সেবা পায়, তাই কিউ আগমন-ক্রম নিখুঁতভাবে রাখে। একটি deque ("double-ended queue") এটি সামান্য শিথিল করে, দুই প্রান্তেই যোগ ও অপসারণ করতে দেয়।') },
        { p: l('The problem a queue solves is fairness and buffering over time. When work arrives faster than you can handle it, or several producers hand tasks to one worker, you need somewhere to hold the backlog without losing anyone’s place in line. A queue is that holding area, and it guarantees the order in which things arrived is the order in which they are processed.', 'কিউ যে সমস্যা সমাধান করে তা হলো সময়জুড়ে ন্যায্যতা ও buffering। যখন কাজ আপনার সামলানোর চেয়ে দ্রুত আসে, বা কয়েকটি producer একটি worker-কে টাস্ক দেয়, তখন কারও লাইনের জায়গা না হারিয়ে backlog রাখার জায়গা দরকার। কিউ সেই ধরে-রাখার জায়গা, আর এটি নিশ্চিত করে যে ক্রমে জিনিস এসেছে সেই ক্রমেই প্রক্রিয়া হবে।') },
        { note: l('Think of a ticket line at a bank. New people join at the back; the teller calls the person at the front. Nobody jumps the line, and the first to arrive is the first served. That is FIFO — a queue in real life.', 'একটি ব্যাংকের টিকিট লাইন ভাবুন। নতুন মানুষ পেছনে যোগ দেয়; কর্মী সামনের ব্যক্তিকে ডাকেন। কেউ লাইন টপকায় না, আর যে আগে আসে সে আগে সেবা পায়। এটাই FIFO—বাস্তব জীবনে একটি কিউ।'), kind: 'tip' },
      ],
    },
    {
      h: l('How a queue works, step by step', 'কিউ কীভাবে কাজ করে, ধাপে ধাপে'),
      blocks: [
        { p: l('A queue needs two ends: a front to remove from and a back to add to. Here is what happens across a few operations.', 'একটি কিউয়ের দুটি প্রান্ত দরকার: সরানোর জন্য front ও যোগ করার জন্য back। কয়েকটি অপারেশনে কী ঘটে তা এখানে।') },
        { steps: [
          l('enqueue(A) — the queue is empty, A is both front and back. Contents: [A].', 'enqueue(A)—কিউ খালি, A-ই front ও back। ভেতরে: [A]।'),
          l('enqueue(B) — B joins the back. Contents: [A, B], front is A, back is B.', 'enqueue(B)—B পেছনে যোগ দেয়। ভেতরে: [A, B], front হলো A, back হলো B।'),
          l('enqueue(C) — C joins the back. Contents: [A, B, C].', 'enqueue(C)—C পেছনে যোগ দেয়। ভেতরে: [A, B, C]।'),
          l('dequeue() — remove and return the front, A (the oldest). Contents: [B, C], front is now B.', 'dequeue()—front, অর্থাৎ A (পুরনোতম) সরিয়ে ফেরত দিন। ভেতরে: [B, C], front এখন B।'),
          l('dequeue() — remove and return B. Contents: [C]. Order out (A, B, ...) matches order in.', 'dequeue()—B সরিয়ে ফেরত দিন। ভেতরে: [C]। বের হওয়ার ক্রম (A, B, ...) ঢোকার ক্রমের সঙ্গে মেলে।'),
        ] },
        { code: `# Ring-buffer queue on a fixed array — O(1) enqueue and dequeue
capacity = N
data  = array(N)
head  = 0        # index of the front element
size  = 0        # how many items are stored

def enqueue(x):
    if size == capacity:
        error("queue is full")
    tail = (head + size) mod capacity   # wrap around the end
    data[tail] = x
    size = size + 1

def dequeue():
    if size == 0:
        error("queue is empty")
    x = data[head]
    head = (head + 1) mod capacity      # move front forward
    size = size - 1
    return x`, caption: l('The modulo (mod) wraps indices around the array so the front can advance without ever shifting elements — that is what keeps dequeue O(1).', 'modulo (mod) index-গুলোকে array-এর চারপাশে ঘোরায় যাতে front এগোতে পারে কোনো element না সরিয়েই—এটাই dequeue-কে O(1) রাখে।') },
      ],
    },
    {
      h: l('Why not a plain array?', 'সাধারণ অ্যারে কেন নয়?'),
      blocks: [
        { p: l('The obvious way to build a queue is a plain array where dequeue removes index 0. That is a trap: removing the first element of an array forces every remaining element to shift left by one, which is O(n) per dequeue. Do that in a loop and your "simple" queue is quietly O(n²) overall.', 'কিউ বানানোর সহজ উপায় একটি সাধারণ array যেখানে dequeue index 0 সরায়। এটি একটি ফাঁদ: array-এর প্রথম element সরালে বাকি প্রতিটি element এক ঘর বামে সরতে বাধ্য হয়, যা প্রতি dequeue-তে O(n)। এটি লুপে করলে আপনার "সরল" কিউ নীরবে সব মিলিয়ে O(n²) হয়।') },
        { p: l('The fixes are a ring buffer (the circular array above, where head and tail wrap around with modulo) or a linked list with pointers to both head and tail. Both give true O(1) enqueue and dequeue with no shifting. Most languages ship a ready-made deque (for example Python’s collections.deque) that does this for you.', 'সমাধান হলো একটি ring buffer (ওপরের circular array, যেখানে head ও tail modulo দিয়ে ঘোরে) অথবা head ও tail দুটোতেই pointer-সহ একটি linked list। দুটোই কোনো shifting ছাড়াই সত্যিকারের O(1) enqueue ও dequeue দেয়। বেশিরভাগ ভাষায় তৈরি deque থাকে (যেমন Python-এর collections.deque) যা এটি করে দেয়।') },
        { note: l('Never dequeue by calling array.remove(0) or list.pop(0) in a hot loop. It looks fine on 10 items and quietly becomes a bottleneck on 10 million. Use a deque or a ring buffer.', 'হট লুপে কখনো array.remove(0) বা list.pop(0) দিয়ে dequeue করবেন না। এটি ১০ আইটেমে ঠিক দেখায় আর ১ কোটিতে নীরবে বটলনেক হয়। একটি deque বা ring buffer ব্যবহার করুন।'), kind: 'warn' },
      ],
    },
    {
      h: l('Complexity', 'জটিলতা'),
      blocks: [
        { table: {
          head: [l('Operation', 'অপারেশন'), l('Big-O', 'Big-O'), l('Why', 'কেন')],
          rows: [
            [l('Enqueue', 'এনকিউ'), l('O(1)', 'O(1)'), l('Add at the back; nothing else moves.', 'back-এ যোগ; আর কিছু নড়ে না।')],
            [l('Dequeue', 'ডিকিউ'), l('O(1)', 'O(1)'), l('Remove at the front (ring buffer / linked list — no shifting).', 'front-এ সরানো (ring buffer / linked list—shifting নেই)।')],
            [l('Peek front', 'সামনে পিক'), l('O(1)', 'O(1)'), l('Read the front without removing it.', 'না সরিয়ে front পড়া।')],
            [l('Search', 'সার্চ'), l('O(n)', 'O(n)'), l('A value in the middle means scanning through the queue.', 'মাঝের একটি মান মানে কিউ জুড়ে স্ক্যান।')],
          ],
        } },
        { p: l('A deque adds push/pop at both the front and the back, and all four of those are also O(1). What no queue gives you is fast access to an arbitrary middle position — that stays O(n).', 'একটি deque front ও back দুই প্রান্তেই push/pop যোগ করে, আর এই চারটিও O(1)। কোনো কিউ যা দেয় না তা হলো যেকোনো মাঝের অবস্থানে দ্রুত অ্যাক্সেস—তা O(n) থাকে।') },
      ],
    },
    {
      h: l('When and where to use a queue', 'কোথায় ও কখন কিউ ব্যবহার করবেন'),
      blocks: [
        { list: [
          l('Scheduling and task processing — a job queue holds work for a pool of workers, processed in fair arrival order.', 'শিডিউলিং ও টাস্ক প্রসেসিং—একটি job queue worker-দের জন্য কাজ ধরে রাখে, ন্যায্য আগমন-ক্রমে প্রক্রিয়া হয়।'),
          l('Breadth-first search (BFS) — the queue holds the frontier so nodes are visited nearest-first, level by level.', 'Breadth-first search (BFS)—কিউ frontier ধরে রাখে যাতে node-গুলো কাছের-আগে, স্তরে স্তরে দেখা হয়।'),
          l('Buffering between fast producers and slow consumers — keystrokes, print jobs, network packets, message queues.', 'দ্রুত producer ও ধীর consumer-এর মাঝে buffering—keystroke, print job, network packet, message queue।'),
          l('A deque specifically — sliding-window algorithms, or an undo/redo history you can trim from both ends.', 'বিশেষভাবে deque—sliding-window অ্যালগরিদম, বা দুই প্রান্ত থেকে ছাঁটা যায় এমন undo/redo history।'),
        ] },
        { p: l('Pick a queue over a stack whenever order must be preserved (oldest first, fairness). Pick a deque when you genuinely need both ends; otherwise a plain queue is simpler. Note that a priority queue is a different structure (a heap): it serves by importance, not arrival order.', 'যখন ক্রম রাখতে হবে (পুরনোটি আগে, ন্যায্যতা) তখন stack-এর বদলে queue নিন। যখন সত্যিই দুই প্রান্ত দরকার তখন deque নিন; নইলে সাধারণ queue সরল। মনে রাখুন priority queue একটি ভিন্ন স্ট্রাকচার (একটি heap): এটি আগমন-ক্রমে নয়, গুরুত্ব অনুযায়ী সেবা দেয়।') },
      ],
    },
    {
      h: l('Common mistakes', 'সাধারণ ভুল'),
      blocks: [
        { list: [
          l('Implementing a queue on a plain array and shifting every element on each dequeue — O(n) per removal turns the whole thing into O(n²). Use a ring buffer or linked list.', 'সাধারণ array-তে কিউ বানিয়ে প্রতি dequeue-তে সব element shift করা—প্রতি removal-এ O(n) পুরোটাকে O(n²) করে। ring buffer বা linked list ব্যবহার করুন।'),
          l('Expecting to index into the middle of a queue. Queues only expose the ends; if you need arbitrary access, use an array.', 'কিউয়ের মাঝে index করার আশা। কিউ শুধু প্রান্ত দেখায়; যেকোনো অ্যাক্সেস দরকার হলে array ব্যবহার করুন।'),
          l('Confusing a queue (FIFO) with a stack (LIFO) and silently reversing your processing order.', 'কিউ (FIFO) ও স্ট্যাক (LIFO) গুলিয়ে ফেলে নীরবে প্রক্রিয়ার ক্রম উল্টে ফেলা।'),
          l('Forgetting to handle the empty case (dequeuing nothing) or, in a fixed ring buffer, the full case (enqueuing when there is no room).', 'খালি কেস (কিছু না থাকলে dequeue) বা নির্দিষ্ট ring buffer-এ ভরা কেস (জায়গা না থাকলে enqueue) সামলাতে ভুলে যাওয়া।'),
        ] },
      ],
    },
    {
      h: l('Remember in one line', 'এক লাইনে মনে রাখুন'),
      blocks: [
        { list: [
          l('A queue is FIFO: enqueue at the back, dequeue at the front, both O(1) done right.', 'কিউ হলো FIFO: back-এ enqueue, front-এ dequeue, ঠিকভাবে করলে দুটোই O(1)।'),
          l('Use it for fair ordering and buffering — scheduling, BFS, producer/consumer work.', 'ন্যায্য ক্রম ও buffering-এ ব্যবহার করুন—শিডিউলিং, BFS, producer/consumer কাজ।'),
          l('Build it on a ring buffer or linked list, never by shifting a plain array on every dequeue.', 'ring buffer বা linked list দিয়ে বানান, প্রতি dequeue-তে সাধারণ array shift করে কখনো নয়।'),
        ] },
      ],
    },
  ],

  // ── Hash tables ─────────────────────────────────────────────────────────────
  'dsa-hash-table': [
    {
      h: l('What is a hash table?', 'হ্যাশ টেবিল কী?'),
      blocks: [
        { p: l('A hash table stores key–value pairs and lets you look up a value by its key in average O(1) time — effectively instantly, no matter how many items it holds. It is the structure behind dictionaries, maps, sets, and objects in almost every language. The trick is a hash function: it turns any key into a number (a hash) that tells you exactly which slot, called a bucket, holds that key’s value.', 'হ্যাশ টেবিল key–value জোড়া রাখে এবং একটি key দিয়ে গড়ে O(1) সময়ে value খুঁজতে দেয়—কার্যত তাৎক্ষণিক, যত আইটেমই থাকুক। এটি প্রায় প্রতিটি ভাষায় dictionary, map, set ও object-এর পেছনের স্ট্রাকচার। কৌশলটি একটি hash function: এটি যেকোনো key-কে একটি সংখ্যায় (একটি hash) পরিণত করে যা ঠিক বলে দেয় কোন slot—যাকে bucket বলে—সেই key-এর value রাখে।') },
        { p: l('The problem it solves is search speed. In an array you find a value by scanning, which is O(n); in a sorted structure it is O(log n). A hash table skips searching altogether: instead of looking for where the key is, it computes where the key must be. That is the leap from "hunt through the data" to "calculate the answer’s address".', 'এটি যে সমস্যা সমাধান করে তা হলো search গতি। array-তে আপনি scan করে value খোঁজেন, যা O(n); সাজানো স্ট্রাকচারে তা O(log n)। হ্যাশ টেবিল search পুরোপুরি বাদ দেয়: key কোথায় তা খোঁজার বদলে, key অবশ্যই কোথায় থাকবে তা হিসাব করে। এটাই "ডেটার মধ্যে খোঁজা" থেকে "উত্তরের ঠিকানা হিসাব করা"-তে লাফ।') },
        { note: l('Think of a coat check at a theatre. You hand over your coat and get ticket number 47. Later, the number computes exactly which hook (bucket 47) holds your coat — the attendant walks straight to it instead of searching every hook. The ticket number is the hash.', 'একটি থিয়েটারের ক্লোকরুম ভাবুন। আপনি কোট দিয়ে ৪৭ নম্বর টিকিট পান। পরে, নম্বরটি হিসাব করে ঠিক কোন হুক (bucket ৪৭) আপনার কোট রাখে—কর্মী প্রতিটি হুক না খুঁজে সোজা সেটিতে যান। টিকিট নম্বরই hash।'), kind: 'tip' },
      ],
    },
    {
      h: l('How a hash table works, step by step', 'হ্যাশ টেবিল কীভাবে কাজ করে, ধাপে ধাপে'),
      blocks: [
        { p: l('Every operation follows the same recipe: hash the key to a bucket, then act on that bucket.', 'প্রতিটি অপারেশন একই রেসিপি মানে: key-কে hash করে একটি bucket বের করুন, তারপর সেই bucket-এ কাজ করুন।') },
        { steps: [
          l('Hash the key — feed the key into the hash function, which returns a big integer.', 'key hash করুন—key-কে hash function-এ দিন, যা একটি বড় integer ফেরত দেয়।'),
          l('Map to a bucket — take that integer modulo the number of buckets to get an index in range.', 'bucket-এ ম্যাপ করুন—সেই integer-কে bucket সংখ্যার modulo নিয়ে রেঞ্জের মধ্যে একটি index পান।'),
          l('Insert — store the key and value in that bucket. Store the key too, so lookups can confirm they found the right one.', 'insert—key ও value সেই bucket-এ রাখুন। key-ও রাখুন, যাতে lookup নিশ্চিত করতে পারে সঠিকটি পেয়েছে।'),
          l('Look up — hash the same key again, go to the same bucket, and return the stored value.', 'look up—একই key আবার hash করুন, একই bucket-এ যান, ও রাখা value ফেরত দিন।'),
          l('Handle collisions — if two different keys land in the same bucket, store both and tell them apart by comparing the actual keys.', 'collision সামলান—দুটি ভিন্ন key একই bucket-এ পড়লে দুটোই রাখুন ও আসল key তুলনা করে আলাদা করুন।'),
        ] },
        { code: `# Hash map with separate chaining (each bucket holds a small list)
buckets = array of B empty lists

def index_for(key):
    return hash(key) mod B          # big hash -> bucket index

def put(key, value):
    i = index_for(key)
    for pair in buckets[i]:         # key already present? overwrite
        if pair.key == key:
            pair.value = value
            return
    buckets[i].append(Pair(key, value))   # else add to the chain

def get(key):
    i = index_for(key)
    for pair in buckets[i]:         # scan only this one short chain
        if pair.key == key:
            return pair.value
    return NOT_FOUND`, caption: l('With a good hash and enough buckets each chain stays tiny (about one item), so get and put run in average O(1).', 'ভালো hash ও যথেষ্ট bucket থাকলে প্রতিটি chain ছোট থাকে (প্রায় একটি আইটেম), তাই get ও put গড়ে O(1)-এ চলে।') },
      ],
    },
    {
      h: l('Collisions and load factor', 'collision ও load factor'),
      blocks: [
        { p: l('Because a hash function squeezes a huge space of keys into a limited number of buckets, two keys will sometimes land in the same bucket. That is a collision, and it is normal — a hash table is judged by how gracefully it handles them. There are two main strategies.', 'যেহেতু একটি hash function বিশাল key-স্থানকে সীমিত সংখ্যক bucket-এ চাপায়, দুটি key কখনো একই bucket-এ পড়বে। এটি একটি collision, ও এটি স্বাভাবিক—একটি হ্যাশ টেবিলকে বিচার করা হয় এটি কত সুন্দরভাবে সেগুলো সামলায় তা দিয়ে। দুটি প্রধান কৌশল আছে।') },
        { list: [
          l('Chaining — each bucket holds a small list; colliding keys are appended and told apart by comparison.', 'Chaining—প্রতিটি bucket একটি ছোট list রাখে; collide করা key যোগ হয় ও তুলনা করে আলাদা করা হয়।'),
          l('Open addressing — on a collision, probe to the next free slot in the array itself, and search the same way.', 'Open addressing—collision হলে array-তেই পরের খালি slot-এ probe করুন, ও একইভাবে খুঁজুন।'),
        ] },
        { p: l('The load factor — items divided by buckets — controls collision frequency. When it climbs past roughly 0.7, the table resizes: it allocates a larger bucket array and rehashes every existing key into it. That one resize is O(n), but it happens rarely and averages out, which is why lookups are described as amortized O(1).', 'load factor—আইটেম ভাগ bucket—collision-এর হার নিয়ন্ত্রণ করে। এটি প্রায় ০.৭ পার হলে টেবিল resize করে: এটি একটি বড় bucket array বরাদ্দ করে ও প্রতিটি বিদ্যমান key তাতে rehash করে। সেই একটি resize O(n), তবে তা কদাচিৎ ঘটে ও গড়ে মিলিয়ে যায়, এ কারণেই lookup-কে amortized O(1) বলা হয়।') },
      ],
    },
    {
      h: l('Complexity', 'জটিলতা'),
      blocks: [
        { p: l('The headline is O(1) on average, but the worst case is genuinely O(n), and knowing why keeps you honest.', 'শিরোনাম হলো গড়ে O(1), তবে ওয়ার্স্ট-কেস সত্যিই O(n), আর কেন তা জানলে আপনি সৎ থাকেন।') },
        { table: {
          head: [l('Operation', 'অপারেশন'), l('Average', 'গড়'), l('Worst case', 'ওয়ার্স্ট কেস')],
          rows: [
            [l('Lookup', 'লুকআপ'), l('O(1)', 'O(1)'), l('O(n)', 'O(n)')],
            [l('Insert', 'ইনসার্ট'), l('O(1)', 'O(1)'), l('O(n)', 'O(n)')],
            [l('Delete', 'ডিলিট'), l('O(1)', 'O(1)'), l('O(n)', 'O(n)')],
          ],
        } },
        { p: l('The worst case happens when a bad hash function (or an attacker crafting keys) piles most keys into one bucket, so that bucket becomes an O(n) list to scan. A good hash function spreads keys evenly and keeps you on the O(1) average almost always.', 'ওয়ার্স্ট-কেস ঘটে যখন একটি খারাপ hash function (বা key বানানো একজন আক্রমণকারী) বেশিরভাগ key একটি bucket-এ জমায়, তাই সেই bucket scan করার একটি O(n) list হয়। একটি ভালো hash function key সমানভাবে ছড়ায় ও আপনাকে প্রায় সবসময় O(1) গড়ে রাখে।') },
      ],
    },
    {
      h: l('When and where to use a hash table', 'কোথায় ও কখন হ্যাশ টেবিল ব্যবহার করবেন'),
      blocks: [
        { list: [
          l('Fast lookup by a unique key — user by ID, product by SKU, config by name, cache by URL.', 'একটি অনন্য key দিয়ে দ্রুত lookup—ID দিয়ে user, SKU দিয়ে product, নাম দিয়ে config, URL দিয়ে cache।'),
          l('Counting and grouping — tally word frequencies or bucket records by category in one O(n) pass.', 'গণনা ও গ্রুপিং—এক O(n) পাসে শব্দের frequency গোনা বা category অনুযায়ী record ভাগ করা।'),
          l('Deduplication and membership tests — a hash set answers "have I seen this before?" in O(1).', 'ডুপ্লিকেট বাদ ও সদস্যতা যাচাই—একটি hash set O(1)-এ "এটি কি আগে দেখেছি?" উত্তর দেয়।'),
          l('Caches and indexes — map a key to a precomputed result so you never recompute it.', 'cache ও index—একটি key-কে আগে-হিসাব-করা ফলে ম্যাপ করুন যাতে কখনো আবার হিসাব না করেন।'),
        ] },
        { p: l('Choose a hash table when you need speed and do not care about order. Choose a balanced tree or sorted structure (O(log n)) instead when you need keys kept in sorted order, range queries ("all keys between X and Y"), or a guaranteed worst case rather than a fast average.', 'যখন গতি দরকার ও ক্রম নিয়ে ভাবেন না তখন হ্যাশ টেবিল নিন। বদলে balanced tree বা সাজানো স্ট্রাকচার (O(log n)) নিন যখন key সাজানো ক্রমে দরকার, range query ("X ও Y-এর মধ্যে সব key"), বা দ্রুত গড় নয় বরং নিশ্চিত ওয়ার্স্ট-কেস দরকার।') },
      ],
    },
    {
      h: l('Common mistakes', 'সাধারণ ভুল'),
      blocks: [
        { list: [
          l('Assuming a hash table keeps order. It does not — iterating gives no meaningful sequence. If you need order, use a sorted structure or a language-specific ordered map.', 'হ্যাশ টেবিল ক্রম রাখে ধরে নেওয়া। রাখে না—iterate করলে অর্থপূর্ণ ক্রম মেলে না। ক্রম দরকার হলে সাজানো স্ট্রাকচার বা ভাষা-নির্দিষ্ট ordered map ব্যবহার করুন।'),
          l('Assuming lookups are always O(1). With a poor hash or an adversarial input the worst case is O(n); the O(1) is an average, not a guarantee.', 'lookup সবসময় O(1) ধরে নেওয়া। খারাপ hash বা প্রতিকূল ইনপুটে ওয়ার্স্ট-কেস O(n); O(1) একটি গড়, গ্যারান্টি নয়।'),
          l('Using a mutable object as a key and then changing it — its hash changes, and the table can never find it again.', 'একটি mutable object-কে key বানিয়ে তারপর বদলানো—এর hash বদলায়, ও টেবিল একে আর কখনো খুঁজে পায় না।'),
          l('Defining equality without a matching hash (or vice versa). Two keys that are "equal" must hash the same, or duplicates leak in.', 'মিলে যাওয়া hash ছাড়া equality (বা উল্টো) সংজ্ঞায়িত করা। "সমান" দুটি key একই hash দিতে হবে, নইলে duplicate ঢুকে যায়।'),
        ] },
      ],
    },
    {
      h: l('Remember in one line', 'এক লাইনে মনে রাখুন'),
      blocks: [
        { list: [
          l('A hash table computes a key’s bucket, giving average O(1) lookup, insert, and delete.', 'হ্যাশ টেবিল একটি key-এর bucket হিসাব করে—গড়ে O(1) lookup, insert ও delete দেয়।'),
          l('Collisions are normal; chaining or open addressing plus a low load factor keep it fast.', 'collision স্বাভাবিক; chaining বা open addressing এবং কম load factor একে দ্রুত রাখে।'),
          l('It does not keep order, and its worst case is O(n) — use a sorted structure when you need either.', 'এটি ক্রম রাখে না, ও এর ওয়ার্স্ট-কেস O(n)—দুটির যেকোনোটি দরকার হলে সাজানো স্ট্রাকচার নিন।'),
        ] },
      ],
    },
  ],

  // ── Binary search ───────────────────────────────────────────────────────────
  'dsa-binary-search': [
    {
      h: l('What is binary search?', 'বাইনারি সার্চ কী?'),
      blocks: [
        { p: l('Binary search finds a target value inside a sorted collection by repeatedly cutting the search range in half. Each comparison lets you throw away half of what remains, so the number of items you still have to consider shrinks from n to n/2 to n/4 and so on. That is why it finds an item in O(log n) steps instead of the O(n) a plain scan would take.', 'বাইনারি সার্চ একটি সাজানো সংগ্রহের ভেতরে একটি target মান খুঁজে বের করে সার্চ রেঞ্জকে বারবার অর্ধেক কেটে। প্রতিটি তুলনা আপনাকে বাকিটার অর্ধেক ফেলে দিতে দেয়, তাই এখনো বিবেচনার আইটেম সংখ্যা n থেকে n/2, n/4 এভাবে কমে। এ কারণেই এটি সাধারণ scan-এর O(n)-এর বদলে O(log n) ধাপে একটি আইটেম খুঁজে।') },
        { p: l('The problem it solves is search speed on ordered data. On a million sorted items, a linear scan may check up to a million elements; binary search checks about twenty (log₂ of a million ≈ 20). The catch, and the price, is that the data must already be sorted — binary search buys blistering lookups in exchange for keeping the collection in order.', 'এটি যে সমস্যা সমাধান করে তা হলো সাজানো ডেটায় search গতি। দশ লক্ষ সাজানো আইটেমে একটি linear scan দশ লক্ষ পর্যন্ত element দেখতে পারে; বাইনারি সার্চ দেখে প্রায় বিশটি (দশ লক্ষের log₂ ≈ ২০)। শর্ত ও মূল্য হলো ডেটা আগে থেকেই সাজানো থাকতে হবে—বাইনারি সার্চ সংগ্রহ সাজানো রাখার বিনিময়ে অতি-দ্রুত lookup কেনে।') },
        { note: l('Think of finding a word in a paper dictionary. You do not read from page one; you open near the middle, see whether your word comes before or after, and discard the half that cannot contain it. Repeat, and a thousand-page book gives up the word in about ten opens.', 'একটি কাগজের অভিধানে শব্দ খোঁজা ভাবুন। আপনি পৃষ্ঠা এক থেকে পড়েন না; মাঝামাঝি খোলেন, দেখেন আপনার শব্দ আগে না পরে, ও যে অর্ধেকে তা থাকতে পারে না তা বাদ দেন। পুনরাবৃত্তি করুন, আর হাজার পৃষ্ঠার বই প্রায় দশ বার খোলায় শব্দটি ছেড়ে দেয়।'), kind: 'tip' },
      ],
    },
    {
      h: l('How binary search works, step by step', 'বাইনারি সার্চ কীভাবে কাজ করে, ধাপে ধাপে'),
      blocks: [
        { p: l('Keep two bounds, low and high, marking the range that could still contain the target. Look at the middle, then move whichever bound cannot possibly hold the answer.', 'দুটি সীমা রাখুন, low ও high, যা এখনো target থাকতে পারে এমন রেঞ্জ চিহ্নিত করে। মাঝেরটি দেখুন, তারপর যে সীমা কোনোভাবেই উত্তর ধরতে পারে না সেটি সরান।') },
        { steps: [
          l('Set low = 0 and high = last index. The whole array is in play.', 'low = 0 ও high = শেষ index সেট করুন। পুরো array খেলায়।'),
          l('Compute mid = low + (high - low) / 2 (this form avoids overflow) and read the value there.', 'mid = low + (high - low) / 2 হিসাব করুন (এই রূপ overflow এড়ায়) ও সেখানকার value পড়ুন।'),
          l('If the value equals the target, you are done — return mid.', 'value target-এর সমান হলে শেষ—mid ফেরত দিন।'),
          l('If the value is less than the target, the answer must be to the right, so set low = mid + 1.', 'value target-এর ছোট হলে উত্তর ডানে, তাই low = mid + 1 সেট করুন।'),
          l('If the value is greater than the target, the answer must be to the left, so set high = mid - 1.', 'value target-এর বড় হলে উত্তর বামে, তাই high = mid - 1 সেট করুন।'),
          l('Repeat while low <= high. If the bounds cross, the target is not present — return "not found".', 'low <= high যতক্ষণ পুনরাবৃত্তি করুন। সীমা পার হয়ে গেলে target নেই—"not found" ফেরত দিন।'),
        ] },
        { code: `# Iterative binary search on a sorted array -> O(log n)
def binary_search(arr, target):
    low  = 0
    high = len(arr) - 1
    while low <= high:
        mid = low + (high - low) / 2   # avoids low+high overflow
        if arr[mid] == target:
            return mid                 # found it
        elif arr[mid] < target:
            low  = mid + 1             # discard the left half
        else:
            high = mid - 1             # discard the right half
    return -1                          # not present`, caption: l('Each loop discards half the remaining range, so a range of n is exhausted in about log₂(n) iterations.', 'প্রতিটি লুপ বাকি রেঞ্জের অর্ধেক বাদ দেয়, তাই n রেঞ্জ প্রায় log₂(n) iteration-এ শেষ হয়।') },
      ],
    },
    {
      h: l('Complexity, and why sorting matters', 'জটিলতা, ও সাজানো কেন জরুরি'),
      blocks: [
        { table: {
          head: [l('Aspect', 'দিক'), l('Cost', 'খরচ'), l('Note', 'নোট')],
          rows: [
            [l('Search (sorted)', 'সার্চ (সাজানো)'), l('O(log n)', 'O(log n)'), l('Halving the range each step.', 'প্রতি ধাপে রেঞ্জ অর্ধেক।')],
            [l('Space', 'স্পেস'), l('O(1)', 'O(1)'), l('Iterative version uses only a few variables.', 'iterative সংস্করণ কয়েকটি variable-ই ব্যবহার করে।')],
            [l('Linear scan (for contrast)', 'linear scan (তুলনায়)'), l('O(n)', 'O(n)'), l('What binary search replaces on sorted data.', 'সাজানো ডেটায় বাইনারি সার্চ যা প্রতিস্থাপন করে।')],
          ],
        } },
        { p: l('The O(log n) is spectacular, but it is only available if the data is sorted. Sorting first costs O(n log n), so binary search pays off when you search the same sorted collection many times — sort once, then enjoy cheap repeated lookups. If you will search an unsorted list only once, a single O(n) scan is actually cheaper than sorting it just to binary-search it.', 'O(log n) দুর্দান্ত, তবে তা শুধু তখনই মেলে যদি ডেটা সাজানো থাকে। আগে সাজাতে O(n log n) খরচ, তাই বাইনারি সার্চ লাভজনক যখন একই সাজানো সংগ্রহ বহুবার খোঁজেন—একবার সাজান, তারপর সস্তা বারবার lookup উপভোগ করুন। একটি অসাজানো list শুধু একবার খুঁজলে, শুধু বাইনারি-সার্চের জন্য সাজানোর চেয়ে একটি O(n) scan আসলে সস্তা।') },
      ],
    },
    {
      h: l('Variants worth knowing', 'জানার মতো ভ্যারিয়েন্ট'),
      blocks: [
        { p: l('Plain binary search returns any matching position, but the most useful real-world variants find a boundary instead of an exact value. They still halve the range each step; they just keep searching after a match to pin down the edge.', 'সাধারণ বাইনারি সার্চ যেকোনো মিলে-যাওয়া অবস্থান ফেরত দেয়, তবে সবচেয়ে দরকারি বাস্তব ভ্যারিয়েন্টগুলো একটি exact মানের বদলে একটি সীমানা খুঁজে। এরা এখনো প্রতি ধাপে রেঞ্জ অর্ধেক করে; শুধু একটি ম্যাচের পরেও খোঁজা চালিয়ে যায় প্রান্তটি ঠিক করতে।') },
        { list: [
          l('Lower bound — the first position whose value is greater than or equal to the target; where the target starts (or would be inserted).', 'Lower bound—প্রথম অবস্থান যার মান target-এর সমান বা বড়; যেখানে target শুরু হয় (বা insert হতো)।'),
          l('Upper bound — the first position whose value is strictly greater than the target; together with lower bound it counts duplicates.', 'Upper bound—প্রথম অবস্থান যার মান target-এর কড়াভাবে বড়; lower bound-এর সঙ্গে মিলে এটি duplicate গোনে।'),
          l('Binary search on the answer — when a yes/no test is monotonic (false, false, ..., true, true), binary-search the smallest input that passes it, even without an array.', 'উত্তরে বাইনারি সার্চ—যখন একটি হ্যাঁ/না যাচাই monotonic (false, false, ..., true, true), array ছাড়াও পাস করা সবচেয়ে ছোট ইনপুট বাইনারি-সার্চ করুন।'),
        ] },
        { note: l('The reason binary search feels almost free: doubling the data adds just one extra step. A billion sorted items are searched in about 30 comparisons, because 2³⁰ is already over a billion.', 'বাইনারি সার্চ প্রায় বিনামূল্যে মনে হওয়ার কারণ: ডেটা দ্বিগুণ করলে মাত্র একটি বাড়তি ধাপ যোগ হয়। একশ কোটি সাজানো আইটেম প্রায় ৩০ তুলনায় খোঁজা হয়, কারণ ২³⁰ ইতিমধ্যে একশ কোটির বেশি।'), kind: 'tip' },
      ],
    },
    {
      h: l('When and where to use it', 'কোথায় ও কখন ব্যবহার করবেন'),
      blocks: [
        { list: [
          l('Looking up values in a large, already-sorted array or index that you query many times.', 'একটি বড়, আগে-সাজানো array বা index-এ মান খোঁজা যা আপনি বহুবার query করেন।'),
          l('Finding a boundary — the first element that satisfies a condition, or where a value would be inserted to stay sorted.', 'একটি সীমানা খোঁজা—প্রথম element যা একটি শর্ত মানে, বা সাজানো থাকতে একটি মান কোথায় insert হবে।'),
          l('"Binary search on the answer" — guessing a numeric answer (like a minimum capacity) and halving the guess range using a monotonic feasibility check.', '"উত্তরে বাইনারি সার্চ"—একটি সংখ্যাসূচক উত্তর (যেমন সর্বনিম্ন capacity) অনুমান করে একটি monotonic feasibility যাচাই দিয়ে অনুমান-রেঞ্জ অর্ধেক করা।'),
          l('Any log-time lookup where an O(1) hash table will not do because you also need order or nearest-match.', 'যেকোনো log-time lookup যেখানে O(1) hash table চলবে না কারণ আপনার ক্রম বা nearest-match-ও দরকার।'),
        ] },
        { p: l('Prefer a hash table when you only need exact-match lookups and order does not matter — that is O(1). Prefer binary search when the data is sorted and you also need ordering, ranges, or the closest value, not just an exact hit.', 'যখন শুধু exact-match lookup দরকার ও ক্রম গুরুত্বপূর্ণ নয় তখন hash table নিন—তা O(1)। যখন ডেটা সাজানো ও শুধু exact hit নয় বরং ordering, range, বা নিকটতম মানও দরকার তখন বাইনারি সার্চ নিন।') },
      ],
    },
    {
      h: l('Common mistakes', 'সাধারণ ভুল'),
      blocks: [
        { list: [
          l('Running binary search on unsorted data. It will return wrong answers silently — the algorithm assumes order and never checks it.', 'অসাজানো ডেটায় বাইনারি সার্চ চালানো। এটি নীরবে ভুল উত্তর দেবে—অ্যালগরিদম ক্রম ধরে নেয়, কখনো যাচাই করে না।'),
          l('Off-by-one bounds: writing low < high instead of low <= high, or updating low = mid instead of mid + 1, causing missed matches or infinite loops.', 'off-by-one সীমা: low <= high-এর বদলে low < high লেখা, বা low = mid + 1-এর বদলে low = mid, ফলে ম্যাচ মিস বা অনন্ত লুপ।'),
          l('Computing mid as (low + high) / 2, which can overflow for very large indices. Use low + (high - low) / 2.', 'mid-কে (low + high) / 2 হিসাব করা, যা খুব বড় index-এ overflow করতে পারে। low + (high - low) / 2 ব্যবহার করুন।'),
          l('Forgetting the not-found case, so the loop never terminates or returns a garbage index when the target is absent.', 'not-found কেস ভুলে যাওয়া, তাই target না থাকলে লুপ শেষ হয় না বা আবর্জনা index ফেরত দেয়।'),
        ] },
      ],
    },
    {
      h: l('Remember in one line', 'এক লাইনে মনে রাখুন'),
      blocks: [
        { list: [
          l('Binary search halves a sorted range each step, finding a target in O(log n).', 'বাইনারি সার্চ প্রতি ধাপে সাজানো রেঞ্জ অর্ধেক করে—O(log n)-এ target খুঁজে।'),
          l('It only works on sorted data; move the bound that cannot contain the target.', 'এটি শুধু সাজানো ডেটায় চলে; target থাকতে পারে না এমন সীমা সরান।'),
          l('Guard the edges: use low <= high, mid + 1 / mid - 1, and an overflow-safe mid.', 'প্রান্ত সামলান: low <= high, mid + 1 / mid - 1, ও overflow-নিরাপদ mid ব্যবহার করুন।'),
        ] },
      ],
    },
  ],

  // ── Elementary sorts ────────────────────────────────────────────────────────
  'dsa-elementary-sorts': [
    {
      h: l('What are the elementary sorts?', 'প্রাথমিক সর্ট কী?'),
      blocks: [
        { p: l('The elementary sorts — bubble sort, selection sort, and insertion sort — are the three simplest ways to put a list in order. They all work by comparing pairs of elements and swapping or shifting them, using only a constant amount of extra memory (they sort in place). They are called "elementary" because they are easy to understand and write, and because they share the same limitation: on average and in the worst case they run in O(n²) time.', 'প্রাথমিক সর্ট—bubble sort, selection sort ও insertion sort—একটি list সাজানোর তিনটি সরলতম উপায়। এগুলো সবই element-এর জোড়া তুলনা করে ও swap বা shift করে কাজ করে, শুধু ধ্রুবক পরিমাণ অতিরিক্ত মেমরি ব্যবহার করে (এরা in place সাজায়)। এদের "প্রাথমিক" বলা হয় কারণ এগুলো বোঝা ও লেখা সহজ, এবং কারণ এদের একই সীমাবদ্ধতা: গড়ে ও ওয়ার্স্ট-কেসে এরা O(n²) সময়ে চলে।') },
        { p: l('The problem they solve is ordering small or nearly-sorted data with the least possible code and memory. They will never sort a million records quickly, but on a handful of items — or a list that is already almost in order — their tiny overhead actually beats the "smarter" O(n log n) algorithms. Learning them also builds the intuition you need for the faster sorts.', 'এরা যে সমস্যা সমাধান করে তা হলো সবচেয়ে কম কোড ও মেমরিতে ছোট বা প্রায়-সাজানো ডেটা সাজানো। এরা কখনো দশ লক্ষ record দ্রুত সাজাবে না, তবে গুটিকয় আইটেমে—বা প্রায় সাজানো একটি list-এ—এদের ক্ষুদ্র overhead আসলে "চতুর" O(n log n) অ্যালগরিদমকে হারায়। এগুলো শেখা দ্রুত সর্টের জন্য দরকারি অন্তর্দৃষ্টিও গড়ে।') },
        { note: l('Insertion sort is exactly how most people sort a hand of playing cards: you pick up cards one at a time and slide each into its correct place among the cards you already hold. You never look at the whole hand at once — just one new card against a sorted group.', 'Insertion sort ঠিক যেভাবে বেশিরভাগ মানুষ হাতের তাস সাজায়: আপনি একবারে একটি করে তাস তোলেন ও প্রতিটি ইতিমধ্যে ধরা তাসের মধ্যে সঠিক জায়গায় ঢোকান। আপনি কখনো পুরো হাত একসঙ্গে দেখেন না—শুধু একটি নতুন তাস একটি সাজানো দলের বিপরীতে।'), kind: 'tip' },
      ],
    },
    {
      h: l('How the three sorts work', 'তিনটি সর্ট কীভাবে কাজ করে'),
      blocks: [
        { steps: [
          l('Bubble sort — repeatedly walk the list, swapping any adjacent pair that is out of order. Each full pass "bubbles" the next-largest value to the end. Stop early if a pass makes no swaps.', 'Bubble sort—বারবার list হাঁটুন, ক্রমের বাইরে থাকা যেকোনো পাশাপাশি জোড়া swap করুন। প্রতিটি পূর্ণ পাস পরবর্তী-বৃহত্তম মানকে শেষে "bubble" করে। একটি পাস কোনো swap না করলে আগেই থামুন।'),
          l('Selection sort — repeatedly find the smallest remaining element and swap it into the next position. It makes few swaps but always scans the rest to find the minimum.', 'Selection sort—বারবার বাকি সবচেয়ে ছোট element খুঁজে পরবর্তী অবস্থানে swap করুন। এটি কম swap করে তবে minimum খুঁজতে সবসময় বাকিটা scan করে।'),
          l('Insertion sort — grow a sorted region at the front; take the next element and shift it left past larger ones until it sits in its correct spot.', 'Insertion sort—সামনে একটি সাজানো অঞ্চল বাড়ান; পরের element নিন ও বড়গুলো পার করে বামে shift করুন যতক্ষণ না এটি সঠিক জায়গায় বসে।'),
        ] },
        { code: `# Insertion sort — best of the three on small / nearly-sorted data
def insertion_sort(arr):
    for i from 1 to len(arr) - 1:
        key = arr[i]           # the card we are placing
        j   = i - 1
        # shift larger elements one step right to open a gap
        while j >= 0 and arr[j] > key:
            arr[j + 1] = arr[j]
            j = j - 1
        arr[j + 1] = key       # drop key into the gap
    return arr

# On an already-sorted array the while loop never runs,
# so this is O(n) best case.`, caption: l('If the input is already sorted, the inner loop does no shifting, so insertion sort runs in O(n) — its best case and its main strength.', 'ইনপুট আগে থেকেই সাজানো থাকলে ভেতরের লুপ কোনো shift করে না, তাই insertion sort O(n)-এ চলে—এর বেস্ট-কেস ও প্রধান শক্তি।') },
      ],
    },
    {
      h: l('Complexity', 'জটিলতা'),
      blocks: [
        { p: l('All three share the same asymptotic profile. The best case of O(n) applies to insertion (and optimized bubble) sort on already-sorted input; selection sort is O(n²) even then, because it always scans for the minimum.', 'তিনটিই একই asymptotic প্রোফাইল ভাগ করে। O(n)-এর বেস্ট-কেস আগে-সাজানো ইনপুটে insertion (ও অপ্টিমাইজড bubble) sort-এ প্রযোজ্য; selection sort তখনও O(n²), কারণ এটি সবসময় minimum-এর জন্য scan করে।') },
        { table: {
          head: [l('Case', 'কেস'), l('Time', 'সময়'), l('Note', 'নোট')],
          rows: [
            [l('Best case', 'বেস্ট কেস'), l('O(n)', 'O(n)'), l('Nearly-sorted input, insertion sort.', 'প্রায়-সাজানো ইনপুট, insertion sort।')],
            [l('Average', 'গড়'), l('O(n²)', 'O(n²)'), l('Roughly n²/2 comparisons.', 'প্রায় n²/2 তুলনা।')],
            [l('Worst case', 'ওয়ার্স্ট কেস'), l('O(n²)', 'O(n²)'), l('Reverse-ordered input.', 'উল্টো-সাজানো ইনপুট।')],
            [l('Space', 'স্পেস'), l('O(1)', 'O(1)'), l('In place — no extra array needed.', 'in place—অতিরিক্ত array লাগে না।')],
          ],
        } },
        { p: l('Compare that with merge sort or quick sort at O(n log n): on a thousand items O(n²) is about a million operations while O(n log n) is about ten thousand — a 100× gap that only widens as n grows. That is why elementary sorts are for small n only.', 'তুলনা করুন merge sort বা quick sort-এর O(n log n)-এর সঙ্গে: হাজার আইটেমে O(n²) প্রায় দশ লক্ষ অপারেশন আর O(n log n) প্রায় দশ হাজার—একটি ১০০× ব্যবধান যা n বাড়লে শুধু বাড়ে। এ কারণেই প্রাথমিক সর্ট শুধু ছোট n-এর জন্য।') },
      ],
    },
    {
      h: l('Which of the three, and stability', 'কোনটি, ও stability'),
      blocks: [
        { p: l('The three are not interchangeable. Insertion sort is usually the best default among them: it is adaptive (fast on nearly-sorted data) and stable (equal elements keep their original relative order, which matters when you sort by one field after another). Selection sort makes the fewest swaps, useful when a swap is very expensive, but it is neither adaptive nor stable. Bubble sort is mainly a teaching tool.', 'তিনটি বিনিময়যোগ্য নয়। Insertion sort সাধারণত এদের মধ্যে সেরা ডিফল্ট: এটি adaptive (প্রায়-সাজানো ডেটায় দ্রুত) ও stable (সমান element মূল আপেক্ষিক ক্রম রাখে, যা এক field-এর পর আরেকটিতে সাজালে গুরুত্বপূর্ণ)। Selection sort সবচেয়ে কম swap করে, যখন একটি swap খুব ব্যয়বহুল তখন কাজের, তবে এটি adaptive নয়, stable নয়। Bubble sort মূলত একটি শেখানোর হাতিয়ার।') },
        { table: {
          head: [l('Sort', 'সর্ট'), l('Best case', 'বেস্ট কেস'), l('Stable?', 'stable?'), l('Adaptive?', 'adaptive?')],
          rows: [
            [l('Bubble', 'Bubble'), l('O(n)', 'O(n)'), l('Yes', 'হ্যাঁ'), l('Yes (with early-exit)', 'হ্যাঁ (early-exit সহ)')],
            [l('Selection', 'Selection'), l('O(n²)', 'O(n²)'), l('No', 'না'), l('No', 'না')],
            [l('Insertion', 'Insertion'), l('O(n)', 'O(n)'), l('Yes', 'হ্যাঁ'), l('Yes', 'হ্যাঁ')],
          ],
        } },
      ],
    },
    {
      h: l('When and where to use them', 'কোথায় ও কখন ব্যবহার করবেন'),
      blocks: [
        { list: [
          l('Small inputs — for a few dozen items the low overhead beats the setup cost of a fancier sort.', 'ছোট ইনপুট—গুটিকয় ডজন আইটেমে কম overhead একটি জটিল সর্টের setup খরচকে হারায়।'),
          l('Nearly-sorted data — insertion sort is close to O(n) when few elements are out of place.', 'প্রায়-সাজানো ডেটা—কম element জায়গার বাইরে থাকলে insertion sort প্রায় O(n)।'),
          l('As a helper inside faster sorts — real-world quick sort and merge sort switch to insertion sort on small sub-arrays.', 'দ্রুত সর্টের ভেতরে সহায়ক হিসেবে—বাস্তব quick sort ও merge sort ছোট sub-array-তে insertion sort-এ যায়।'),
          l('Teaching and reasoning — they make the ideas of comparisons, swaps, stability, and in-place sorting concrete.', 'শেখানো ও যুক্তি—এরা তুলনা, swap, stability ও in-place সর্টিংয়ের ধারণা মূর্ত করে।'),
        ] },
        { p: l('For anything large, reach for an O(n log n) sort — in practice, your language’s built-in sort, which is already a highly tuned hybrid. Choose an elementary sort only when n is small, memory is extremely tight, or the data is already almost in order.', 'বড় যেকোনো কিছুর জন্য একটি O(n log n) সর্ট নিন—বাস্তবে, আপনার ভাষার built-in sort, যা ইতিমধ্যে একটি ভালোভাবে টিউন করা hybrid। প্রাথমিক সর্ট শুধু তখন নিন যখন n ছোট, মেমরি অত্যন্ত কড়া, বা ডেটা আগে থেকেই প্রায় সাজানো।') },
      ],
    },
    {
      h: l('Common mistakes', 'সাধারণ ভুল'),
      blocks: [
        { list: [
          l('Using bubble sort (or any O(n²) sort) on large data instead of an O(n log n) algorithm — the quadratic cost makes it unusable at scale.', 'বড় ডেটায় O(n log n) অ্যালগরিদমের বদলে bubble sort (বা যেকোনো O(n²) সর্ট) ব্যবহার করা—quadratic খরচ একে বড় স্কেলে অকার্যকর করে।'),
          l('Reinventing a sort at all when a well-tested built-in exists that is faster and correct.', 'একটি দ্রুত ও সঠিক পরীক্ষিত built-in থাকা সত্ত্বেও একটি সর্ট নতুন করে বানানো।'),
          l('Assuming all three are equal: selection sort has no O(n) best case, and only insertion (among these) is naturally stable and adaptive.', 'তিনটিকে সমান ধরে নেওয়া: selection sort-এর O(n) বেস্ট-কেস নেই, ও এদের মধ্যে শুধু insertion স্বভাবতই stable ও adaptive।'),
          l('Getting the swap or shift boundaries wrong (off-by-one on the last index), which leaves the array partly unsorted.', 'swap বা shift-এর সীমানা ভুল করা (শেষ index-এ off-by-one), যা array আংশিক অসাজানো রেখে দেয়।'),
        ] },
      ],
    },
    {
      h: l('Remember in one line', 'এক লাইনে মনে রাখুন'),
      blocks: [
        { list: [
          l('Bubble, selection, and insertion sort are simple, in-place O(n²) methods.', 'bubble, selection ও insertion sort সরল, in-place O(n²) পদ্ধতি।'),
          l('They shine only on small or nearly-sorted data, where insertion sort nears O(n).', 'এরা শুধু ছোট বা প্রায়-সাজানো ডেটায় ভালো, যেখানে insertion sort O(n)-এর কাছে।'),
          l('For large inputs use an O(n log n) sort — usually your language’s built-in.', 'বড় ইনপুটে একটি O(n log n) সর্ট নিন—সাধারণত আপনার ভাষার built-in।'),
        ] },
      ],
    },
  ],
}
