import { l } from '../data.js'

// Data Structures & Algorithms course — bilingual (English / Bangla).
// Topic rows mirror the System Design course shape so lesson rendering stays data-driven.

export const dsaModules = [
  { id: 'dsa-foundations', number: '01', title: l('Foundations & complexity', 'ভিত্তি ও জটিলতা'), description: l('Learn how algorithms and data structures are measured before you write a line of code.', 'কোড লেখার আগে অ্যালগরিদম ও ডেটা স্ট্রাকচার কীভাবে পরিমাপ করা হয় তা শিখুন।'), color: '#6c5ce7' },
  { id: 'dsa-linear', number: '02', title: l('Linear data structures', 'লিনিয়ার ডেটা স্ট্রাকচার'), description: l('Master arrays, linked lists, stacks, queues, and hash tables.', 'অ্যারে, লিংকড লিস্ট, স্ট্যাক, কিউ ও হ্যাশ টেবিল আয়ত্ত করুন।'), color: '#0284c7' },
  { id: 'dsa-searching-sorting', number: '03', title: l('Searching & sorting', 'সার্চিং ও সর্টিং'), description: l('Find and order data efficiently with the classic algorithms.', 'ক্লাসিক অ্যালগরিদম দিয়ে দক্ষতার সঙ্গে ডেটা খুঁজুন ও সাজান।'), color: '#0f9f78' },
  { id: 'dsa-trees', number: '04', title: l('Trees & heaps', 'ট্রি ও হিপ'), description: l('Organize hierarchical data for fast search, ordering, and priority.', 'দ্রুত সার্চ, অর্ডার ও প্রায়োরিটির জন্য শ্রেণিবদ্ধ ডেটা সাজান।'), color: '#d97706' },
  { id: 'dsa-graphs', number: '05', title: l('Graphs', 'গ্রাফ'), description: l('Model networks and relationships, then traverse and search them.', 'নেটওয়ার্ক ও সম্পর্ক মডেল করুন, তারপর ট্রাভার্স ও সার্চ করুন।'), color: '#e34b87' },
  { id: 'dsa-techniques', number: '06', title: l('Algorithmic techniques', 'অ্যালগরিদমিক কৌশল'), description: l('Reusable problem-solving patterns for interviews and real work.', 'ইন্টারভিউ ও বাস্তব কাজের জন্য পুনঃব্যবহারযোগ্য সমস্যা-সমাধান প্যাটার্ন।'), color: '#7c3aed' },
]

const rawTopics = [
  // ── Foundations ───────────────────────────────────────────────────────────
  ['dsa-intro', 'dsa-foundations', 'What are data structures & algorithms?', 'ডেটা স্ট্রাকচার ও অ্যালগরিদম কী?', 'Beginner', 10, 'algo-flow',
    'A data structure organizes data in memory; an algorithm is the step-by-step recipe that operates on it.', 'ডেটা স্ট্রাকচার মেমরিতে ডেটা সাজায়; অ্যালগরিদম হলো তার ওপর কাজ করা ধাপে-ধাপে রেসিপি।',
    'A kitchen: how you store ingredients (structure) shapes how fast you can cook the recipe (algorithm).', 'একটি রান্নাঘর: উপকরণ কীভাবে রাখেন (স্ট্রাকচার) তা রেসিপি কত দ্রুত রাঁধবেন (অ্যালগরিদম) তা ঠিক করে।',
    'Pick the structure from the operations you repeat most, then choose an algorithm that fits it.', 'সবচেয়ে বেশি যে অপারেশন করেন তা থেকে স্ট্রাকচার বাছুন, তারপর তার সঙ্গে মানানসই অ্যালগরিদম নিন।',
    'The right structure makes some operations fast but usually makes others slower.', 'সঠিক স্ট্রাকচার কিছু অপারেশন দ্রুত করে, তবে সাধারণত অন্যগুলো ধীর করে।',
    'Reaching for a fancy structure before knowing which operations actually dominate.', 'কোন অপারেশন আসলে প্রধান তা না জেনেই জটিল স্ট্রাকচার বেছে নেওয়া।'],
  ['dsa-bigo', 'dsa-foundations', 'Big-O & complexity analysis', 'বিগ-ও ও জটিলতা বিশ্লেষণ', 'Beginner', 16, 'complexity',
    'Big-O describes how running time or memory grows as the input grows, ignoring constants.', 'বিগ-ও বর্ণনা করে ইনপুট বাড়লে চলার সময় বা মেমরি কীভাবে বাড়ে—ধ্রুবক বাদ দিয়ে।',
    'Comparing routes by how they scale with distance, not by today’s traffic on one trip.', 'একটি যাত্রার আজকের ট্রাফিক নয়, দূরত্ব বাড়লে পথগুলো কীভাবে বাড়ে তা দিয়ে তুলনা।',
    'Count the work inside loops and recursion, then keep only the fastest-growing term.', 'লুপ ও রিকার্শনের ভেতরের কাজ গুনুন, তারপর শুধু দ্রুততম-বৃদ্ধিমান পদটি রাখুন।',
    'Lower asymptotic cost can still lose on small inputs where constants dominate.', 'ছোট ইনপুটে যেখানে ধ্রুবক প্রাধান্য পায়, সেখানে কম অ্যাসিম্পটোটিক খরচও হেরে যেতে পারে।',
    'Reporting best-case time and ignoring the worst case that actually breaks the system.', 'বেস্ট-কেস সময় বলা আর যে ওয়ার্স্ট-কেস আসলে সিস্টেম ভাঙে তা উপেক্ষা করা।'],
  ['dsa-recursion', 'dsa-foundations', 'Recursion & the call stack', 'রিকার্শন ও কল স্ট্যাক', 'Beginner', 15, 'recursion',
    'Recursion solves a problem by calling itself on smaller inputs until it reaches a base case.', 'রিকার্শন ছোট ইনপুটে নিজেকে ডেকে সমস্যা সমাধান করে, যতক্ষণ না বেস কেস আসে।',
    'Russian nesting dolls: open one to find a smaller identical problem inside.', 'রাশিয়ান নেস্টিং পুতুল: একটি খুললে ভেতরে একই ধরনের ছোট সমস্যা মেলে।',
    'Define a correct base case first, then shrink the input on every recursive call.', 'আগে সঠিক বেস কেস ঠিক করুন, তারপর প্রতিটি রিকার্সিভ কলে ইনপুট ছোট করুন।',
    'Recursion is often clearer than loops but adds call-stack memory and overhead.', 'রিকার্শন প্রায়ই লুপের চেয়ে পরিষ্কার, তবে কল-স্ট্যাক মেমরি ও ওভারহেড যোগ করে।',
    'Forgetting the base case or not reducing the input, causing a stack overflow.', 'বেস কেস ভুলে যাওয়া বা ইনপুট ছোট না করা, ফলে স্ট্যাক ওভারফ্লো।'],

  // ── Linear structures ─────────────────────────────────────────────────────
  ['dsa-arrays', 'dsa-linear', 'Arrays & strings', 'অ্যারে ও স্ট্রিং', 'Beginner', 15, 'array',
    'An array stores elements in contiguous memory, giving instant index access but costly middle inserts.', 'অ্যারে উপাদানগুলো পাশাপাশি মেমরিতে রাখে—তাৎক্ষণিক ইনডেক্স অ্যাক্সেস দেয়, কিন্তু মাঝে ইনসার্ট ব্যয়বহুল।',
    'Numbered lockers in a row: jump straight to locker 42, but inserting between them shifts everyone.', 'সারিতে নম্বরযুক্ত লকার: সরাসরি ৪২ নম্বরে যান, কিন্তু মাঝে ঢোকালে সবাইকে সরাতে হয়।',
    'Use arrays when you read by index a lot and rarely insert or delete in the middle.', 'যখন ইনডেক্স দিয়ে অনেক পড়েন এবং মাঝে খুব কম ইনসার্ট/ডিলিট করেন তখন অ্যারে ব্যবহার করুন।',
    'Contiguous layout is cache-friendly and fast to read, but resizing and mid-shifts cost O(n).', 'পাশাপাশি লেআউট ক্যাশ-বান্ধব ও দ্রুত পড়া, তবে রিসাইজ ও মাঝ-শিফট O(n) খরচ।',
    'Treating an array like a list and inserting at the front inside a hot loop.', 'অ্যারেকে লিস্টের মতো ধরে হট লুপের ভেতরে সামনে ইনসার্ট করা।'],
  ['dsa-linked-list', 'dsa-linear', 'Linked lists', 'লিংকড লিস্ট', 'Beginner', 16, 'linked-list',
    'A linked list chains nodes by pointers, making inserts and deletes O(1) but losing random access.', 'লিংকড লিস্ট পয়েন্টার দিয়ে নোড যুক্ত করে—ইনসার্ট/ডিলিট O(1), কিন্তু র‍্যান্ডম অ্যাক্সেস হারায়।',
    'A treasure hunt: each clue points to the next; add a stop by rewriting two clues.', 'গুপ্তধন খোঁজা: প্রতিটি সূত্র পরেরটি দেখায়; দুটি সূত্র বদলে একটি স্টপ যোগ করুন।',
    'Reach for linked lists when you insert or remove at known positions far more than you index.', 'ইনডেক্সের চেয়ে জানা অবস্থানে অনেক বেশি ইনসার্ট/রিমুভ করলে লিংকড লিস্ট নিন।',
    'Cheap splicing comes at the cost of extra pointer memory and poor cache locality.', 'সস্তা স্প্লাইসিং আসে অতিরিক্ত পয়েন্টার মেমরি ও দুর্বল ক্যাশ লোকালিটির বিনিময়ে।',
    'Using a linked list for index-heavy access, then scanning from the head every time.', 'ইনডেক্স-হেভি অ্যাক্সেসে লিংকড লিস্ট ব্যবহার করে প্রতিবার হেড থেকে স্ক্যান করা।'],
  ['dsa-stack', 'dsa-linear', 'Stacks', 'স্ট্যাক', 'Beginner', 12, 'stack',
    'A stack is last-in, first-out: you only ever push to or pop from the top.', 'স্ট্যাক লাস্ট-ইন, ফার্স্ট-আউট: আপনি শুধু ওপরে পুশ বা ওপর থেকে পপ করেন।',
    'A stack of plates: you add and take from the top, never the middle.', 'প্লেটের স্তূপ: ওপর থেকে যোগ ও নেন, মাঝ থেকে কখনো নয়।',
    'Use a stack for undo, backtracking, expression parsing, and function-call handling.', 'আনডু, ব্যাকট্র্যাকিং, এক্সপ্রেশন পার্সিং ও ফাংশন-কল সামলাতে স্ট্যাক ব্যবহার করুন।',
    'LIFO makes recent items instant to reach but hides everything below the top.', 'LIFO সাম্প্রতিক আইটেম তাৎক্ষণিক করে, তবে ওপরের নিচের সব লুকিয়ে রাখে।',
    'Reaching for the bottom of a stack instead of switching to a queue or deque.', 'কিউ বা ডেক-এ না গিয়ে স্ট্যাকের তলায় পৌঁছানোর চেষ্টা করা।'],
  ['dsa-queue', 'dsa-linear', 'Queues & deques', 'কিউ ও ডেক', 'Beginner', 13, 'queue',
    'A queue is first-in, first-out; a deque allows adding and removing at both ends.', 'কিউ ফার্স্ট-ইন, ফার্স্ট-আউট; ডেক দুই প্রান্তেই যোগ ও অপসারণ করতে দেয়।',
    'A ticket line: the first to arrive is the first served.', 'টিকিট লাইন: যে আগে আসে সে আগে সেবা পায়।',
    'Use queues for scheduling, BFS, and buffering work that must keep its arrival order.', 'শিডিউলিং, BFS ও আগমন-ক্রম রাখা কাজ বাফার করতে কিউ ব্যবহার করুন।',
    'Fair ordering is preserved, but you cannot jump to arbitrary positions inside.', 'ন্যায্য ক্রম রক্ষা হয়, তবে ভেতরের যেকোনো অবস্থানে লাফ দেওয়া যায় না।',
    'Implementing a queue on a plain array and shifting every element on each dequeue.', 'সাধারণ অ্যারেতে কিউ বানিয়ে প্রতি ডিকিউতে সব উপাদান শিফট করা।'],
  ['dsa-hash-table', 'dsa-linear', 'Hash tables', 'হ্যাশ টেবিল', 'Intermediate', 18, 'hash-table',
    'A hash table maps keys to buckets with a hash function, giving average O(1) lookup, insert, and delete.', 'হ্যাশ টেবিল হ্যাশ ফাংশন দিয়ে কী-কে বাকেটে ম্যাপ করে—গড়ে O(1) লুকআপ, ইনসার্ট ও ডিলিট।',
    'A coat check: your ticket number computes exactly which hook holds your coat.', 'ক্লোকরুম: আপনার টিকিট নম্বর হিসাব করে ঠিক কোন হুকে কোট আছে।',
    'Choose a good hash and load factor, and pick a collision strategy like chaining or open addressing.', 'ভালো হ্যাশ ও লোড ফ্যাক্টর বাছুন, এবং চেইনিং বা ওপেন অ্যাড্রেসিংয়ের মতো কলিশন কৌশল নিন।',
    'Average lookups are constant, but collisions and resizing can spike to O(n) and cost memory.', 'গড় লুকআপ ধ্রুবক, তবে কলিশন ও রিসাইজ O(n)-এ যেতে পারে ও মেমরি খরচ করে।',
    'Assuming hash tables keep order or that worst-case lookups are always O(1).', 'হ্যাশ টেবিল ক্রম রাখে বা ওয়ার্স্ট-কেস লুকআপ সবসময় O(1) ধরে নেওয়া।'],

  // ── Searching & sorting ───────────────────────────────────────────────────
  ['dsa-binary-search', 'dsa-searching-sorting', 'Binary search', 'বাইনারি সার্চ', 'Beginner', 15, 'binary-search',
    'Binary search halves a sorted range each step, finding a target in O(log n) instead of O(n).', 'বাইনারি সার্চ প্রতি ধাপে সাজানো রেঞ্জ অর্ধেক করে, O(n)-এর বদলে O(log n)-এ টার্গেট খুঁজে।',
    'Finding a word in a dictionary by opening the middle and discarding half each time.', 'অভিধানে মাঝ খুলে প্রতিবার অর্ধেক বাদ দিয়ে শব্দ খোঁজা।',
    'Keep clear low/high bounds and a mid; move the bound that cannot contain the target.', 'স্পষ্ট low/high সীমা ও mid রাখুন; টার্গেট থাকতে পারে না এমন সীমা সরান।',
    'It is far faster than scanning, but only works on data kept sorted, which has its own cost.', 'এটি স্ক্যানের চেয়ে অনেক দ্রুত, তবে শুধু সাজানো ডেটায় চলে, যার নিজস্ব খরচ আছে।',
    'Off-by-one bounds or running binary search on unsorted data.', 'অফ-বাই-ওয়ান সীমা বা অসাজানো ডেটায় বাইনারি সার্চ চালানো।'],
  ['dsa-elementary-sorts', 'dsa-searching-sorting', 'Elementary sorts', 'প্রাথমিক সর্ট', 'Beginner', 16, 'sorting',
    'Bubble, selection, and insertion sort are simple O(n²) methods that shine on tiny or nearly-sorted data.', 'বাবল, সিলেকশন ও ইনসার্শন সর্ট সরল O(n²) পদ্ধতি, যা ছোট বা প্রায়-সাজানো ডেটায় ভালো কাজ করে।',
    'Sorting a hand of cards: pick each card and slide it into its right place.', 'হাতের তাস সাজানো: প্রতিটি তাস নিয়ে সঠিক জায়গায় ঢোকান।',
    'Use insertion sort for small or almost-sorted inputs where its low overhead wins.', 'ছোট বা প্রায়-সাজানো ইনপুটে ইনসার্শন সর্ট ব্যবহার করুন, যেখানে কম ওভারহেড জেতে।',
    'They are easy to write and in-place, but O(n²) makes them unusable on large inputs.', 'এগুলো লেখা সহজ ও ইন-প্লেস, তবে O(n²) বড় ইনপুটে অকার্যকর করে।',
    'Using bubble sort on large data instead of an O(n log n) algorithm.', 'বড় ডেটায় O(n log n) অ্যালগরিদমের বদলে বাবল সর্ট ব্যবহার করা।'],
  ['dsa-merge-sort', 'dsa-searching-sorting', 'Merge sort', 'মার্জ সর্ট', 'Intermediate', 16, 'sorting',
    'Merge sort splits the array in half, sorts each half, and merges them in guaranteed O(n log n).', 'মার্জ সর্ট অ্যারে অর্ধেক করে, প্রতিটি অর্ধেক সাজায় এবং নিশ্চিত O(n log n)-এ মার্জ করে।',
    'Two sorted stacks of papers combined by repeatedly taking the smaller top sheet.', 'দুটি সাজানো কাগজের স্তূপ—বারবার ছোট ওপরের শিটটি নিয়ে একত্র করা।',
    'Choose merge sort when you need stable, predictable sorting or are sorting linked lists.', 'স্থিতিশীল, পূর্বানুমানযোগ্য সর্ট দরকার হলে বা লিংকড লিস্ট সাজাতে মার্জ সর্ট নিন।',
    'Its worst case stays O(n log n) and it is stable, but it needs O(n) extra memory.', 'এর ওয়ার্স্ট-কেস O(n log n) থাকে ও স্থিতিশীল, তবে O(n) অতিরিক্ত মেমরি লাগে।',
    'Ignoring the extra memory it allocates when working under tight space limits.', 'কড়া মেমরি সীমায় কাজের সময় এর বরাদ্দ করা অতিরিক্ত মেমরি উপেক্ষা করা।'],
  ['dsa-quick-sort', 'dsa-searching-sorting', 'Quick sort', 'কুইক সর্ট', 'Intermediate', 17, 'sorting',
    'Quick sort partitions around a pivot and recurses, averaging O(n log n) in place.', 'কুইক সর্ট একটি পিভটের চারপাশে ভাগ করে ও রিকার্স করে—গড়ে ইন-প্লেস O(n log n)।',
    'Organizing a crowd by height: pick one person, put shorter left and taller right, repeat.', 'উচ্চতায় ভিড় সাজানো: একজন বাছুন, খাটোদের বামে, লম্বাদের ডানে, তারপর পুনরাবৃত্তি।',
    'Randomize or use median-of-three pivots to avoid the O(n²) worst case on sorted input.', 'সাজানো ইনপুটে O(n²) ওয়ার্স্ট-কেস এড়াতে র‍্যান্ডম বা মিডিয়ান-অফ-থ্রি পিভট নিন।',
    'It is fast and in-place on average, but a bad pivot degrades it to O(n²).', 'গড়ে দ্রুত ও ইন-প্লেস, তবে খারাপ পিভট একে O(n²)-এ নামায়।',
    'Always taking the first element as pivot, causing worst case on already-sorted data.', 'সবসময় প্রথম উপাদানকে পিভট নেওয়া, ফলে আগে-সাজানো ডেটায় ওয়ার্স্ট-কেস।'],
  ['dsa-heap-sort', 'dsa-searching-sorting', 'Heap sort', 'হিপ সর্ট', 'Intermediate', 15, 'heap',
    'Heap sort builds a max-heap, then repeatedly extracts the largest element, sorting in O(n log n) with O(1) extra space.', 'হিপ সর্ট একটি ম্যাক্স-হিপ বানায়, তারপর বারবার বৃহত্তম উপাদান বের করে—O(1) অতিরিক্ত স্পেসে O(n log n)-এ সাজায়।',
    'A tournament bracket: the champion surfaces to the top, is removed, and the next strongest rises to take its place.', 'একটি টুর্নামেন্ট ব্র্যাকেট: চ্যাম্পিয়ন ওপরে ওঠে, সরানো হয়, পরের সেরা তার জায়গা নিতে ওঠে।',
    'Heapify the array in O(n), then swap the root to the end and sift down, shrinking the heap by one each time.', 'অ্যারেকে O(n)-এ হিপিফাই করুন, তারপর রুট শেষে অদলবদল করে সিফট-ডাউন করুন, প্রতিবার হিপ এক করে ছোট করুন।',
    'It sorts in place with a guaranteed O(n log n) worst case, but it is not stable and its scattered access hurts cache locality.', 'এটি ইন-প্লেসে নিশ্চিত O(n log n) ওয়ার্স্ট-কেসে সাজায়, তবে স্থিতিশীল নয় ও এর ছড়ানো অ্যাক্সেস ক্যাশ লোকালিটি নষ্ট করে।',
    'Expecting stability, or the cache-friendly real-world speed of quick sort, from heap sort.', 'হিপ সর্ট থেকে স্থিতিশীলতা বা কুইক সর্টের ক্যাশ-বান্ধব বাস্তব গতি আশা করা।'],

  // ── Trees & heaps ─────────────────────────────────────────────────────────
  ['dsa-trees', 'dsa-trees', 'Trees & binary trees', 'ট্রি ও বাইনারি ট্রি', 'Beginner', 15, 'binary-tree',
    'A tree is a hierarchy of nodes with one root; a binary tree limits each node to two children.', 'ট্রি হলো এক রুটসহ নোডের শ্রেণিবিন্যাস; বাইনারি ট্রি প্রতিটি নোডকে দুই চাইল্ডে সীমিত করে।',
    'A family tree or a company org chart branching from a single top.', 'একটি বংশতালিকা বা কোম্পানির অর্গ চার্ট, একটি শীর্ষ থেকে শাখা।',
    'Model naturally hierarchical data as trees and reason about height, not just count.', 'স্বভাবতই শ্রেণিবদ্ধ ডেটাকে ট্রি হিসেবে মডেল করুন এবং শুধু সংখ্যা নয়, উচ্চতা নিয়ে ভাবুন।',
    'Trees express hierarchy cleanly, but performance depends on staying balanced.', 'ট্রি শ্রেণিবিন্যাস পরিষ্কারভাবে প্রকাশ করে, তবে পারফরম্যান্স ভারসাম্যের ওপর নির্ভর করে।',
    'Confusing a general tree with a binary tree, or ignoring depth when analyzing cost.', 'সাধারণ ট্রি ও বাইনারি ট্রি গুলিয়ে ফেলা, বা খরচ বিশ্লেষণে গভীরতা উপেক্ষা করা।'],
  ['dsa-bst', 'dsa-trees', 'Binary search trees', 'বাইনারি সার্চ ট্রি', 'Intermediate', 17, 'bst',
    'A BST keeps smaller keys left and larger keys right, giving O(log n) search when balanced.', 'BST ছোট কী বামে ও বড় কী ডানে রাখে—ভারসাম্য থাকলে O(log n) সার্চ দেয়।',
    'A guessing game where each answer tells you to go higher or lower.', 'একটি অনুমান খেলা যেখানে প্রতিটি উত্তর বলে বেশি না কম যেতে হবে।',
    'Keep the tree balanced (AVL, red-black) so height stays logarithmic under many inserts.', 'অনেক ইনসার্টেও উচ্চতা লগারিদমিক রাখতে ট্রি ভারসাম্যপূর্ণ (AVL, রেড-ব্ল্যাক) রাখুন।',
    'Ordered structure enables range queries, but an unbalanced BST degrades to a O(n) list.', 'সাজানো স্ট্রাকচার রেঞ্জ কুয়েরি দেয়, তবে ভারসাম্যহীন BST O(n) লিস্টে নামে।',
    'Inserting sorted data into a plain BST and turning it into a linked list.', 'সাধারণ BST-তে সাজানো ডেটা ইনসার্ট করে একে লিংকড লিস্টে পরিণত করা।'],
  ['dsa-balanced-trees', 'dsa-trees', 'Balanced search trees (AVL & red-black)', 'ব্যালান্সড সার্চ ট্রি (AVL ও রেড-ব্ল্যাক)', 'Advanced', 18, 'bst',
    'Self-balancing trees rotate nodes on insert and delete to keep height O(log n), guaranteeing fast search even on adversarial input.', 'সেলফ-ব্যালান্সিং ট্রি ইনসার্ট ও ডিলিটে নোড রোটেট করে উচ্চতা O(log n) রাখে—প্রতিকূল ইনপুটেও দ্রুত সার্চ নিশ্চিত করে।',
    'A librarian who re-shelves after every book so no single aisle ever grows too long to walk.', 'একজন গ্রন্থাগারিক প্রতিটি বইয়ের পর পুনরায় সাজান, যাতে কোনো একটি সারি হাঁটার জন্য বেশি লম্বা না হয়।',
    'Reach for a balanced tree—or your language’s ordered map/set—when you need ordered operations with a guaranteed logarithmic bound.', 'নিশ্চিত লগারিদমিক সীমায় সাজানো অপারেশন দরকার হলে ব্যালান্সড ট্রি—বা আপনার ভাষার অর্ডারড ম্যাপ/সেট—নিন।',
    'Balancing guarantees O(log n) operations, but rotations add constant-factor overhead and real code complexity over a plain BST.', 'ব্যালান্সিং O(log n) অপারেশন নিশ্চিত করে, তবে রোটেশন সাধারণ BST-এর চেয়ে ধ্রুবক-ফ্যাক্টর ওভারহেড ও বাস্তব কোড জটিলতা যোগ করে।',
    'Hand-rolling a plain BST for untrusted input when a balanced ordered map was already available.', 'ব্যালান্সড অর্ডারড ম্যাপ থাকা সত্ত্বেও অবিশ্বস্ত ইনপুটে নিজে সাধারণ BST বানানো।'],
  ['dsa-traversals', 'dsa-trees', 'Tree traversals', 'ট্রি ট্রাভার্সাল', 'Intermediate', 14, 'traversal',
    'Traversals visit every node in a defined order: pre-order, in-order, post-order, or level-order.', 'ট্রাভার্সাল প্রতিটি নোড নির্দিষ্ট ক্রমে দেখে: প্রি-অর্ডার, ইন-অর্ডার, পোস্ট-অর্ডার বা লেভেল-অর্ডার।',
    'Reading every room in a building by a fixed rule: left rooms first, or floor by floor.', 'নির্দিষ্ট নিয়মে ভবনের প্রতিটি ঘর দেখা: আগে বাম ঘর, বা তলা ধরে ধরে।',
    'Pick the order by need: in-order for sorted output, level-order (BFS) for nearest-first.', 'প্রয়োজন অনুযায়ী ক্রম বাছুন: সাজানো আউটপুটে ইন-অর্ডার, কাছের-আগে লেভেল-অর্ডার (BFS)।',
    'Recursive traversals are concise, but deep trees can overflow the call stack.', 'রিকার্সিভ ট্রাভার্সাল সংক্ষিপ্ত, তবে গভীর ট্রি কল স্ট্যাক ওভারফ্লো করতে পারে।',
    'Expecting in-order output from a tree that is not a BST, or mixing up the four orders.', 'BST নয় এমন ট্রি থেকে ইন-অর্ডার সাজানো আউটপুট আশা করা, বা চার ক্রম গুলিয়ে ফেলা।'],
  ['dsa-heap', 'dsa-trees', 'Heaps & priority queues', 'হিপ ও প্রায়োরিটি কিউ', 'Intermediate', 17, 'heap',
    'A heap is a complete tree where each parent beats its children, giving O(1) peek and O(log n) push/pop.', 'হিপ একটি সম্পূর্ণ ট্রি যেখানে প্রতিটি প্যারেন্ট চাইল্ডকে হারায়—O(1) পিক ও O(log n) পুশ/পপ।',
    'An emergency room: the most urgent patient is always seen next, whoever arrived when.', 'জরুরি বিভাগ: যে-ই যখন আসুক, সবচেয়ে জরুরি রোগী সবসময় পরে দেখা হয়।',
    'Use a heap for priority queues, top-K problems, and scheduling by urgency.', 'প্রায়োরিটি কিউ, টপ-K সমস্যা ও জরুরিতা অনুযায়ী শিডিউলিংয়ে হিপ ব্যবহার করুন।',
    'A heap gives the extreme element fast, but it does not keep the full set sorted.', 'হিপ চরম উপাদান দ্রুত দেয়, তবে পুরো সেট সাজানো রাখে না।',
    'Expecting a heap to support fast search or ordered iteration like a BST.', 'হিপ BST-এর মতো দ্রুত সার্চ বা সাজানো ইটারেশন দেবে ধরে নেওয়া।'],
  ['dsa-trie', 'dsa-trees', 'Tries (prefix trees)', 'ট্রাই (প্রিফিক্স ট্রি)', 'Intermediate', 15, 'trie',
    'A trie stores strings by shared prefixes, making prefix search and autocomplete O(length).', 'ট্রাই স্ট্রিং শেয়ার্ড প্রিফিক্স দিয়ে রাখে—প্রিফিক্স সার্চ ও অটোকমপ্লিট O(length)।',
    'A phone contact search that narrows results with each letter you type.', 'একটি ফোন কন্টাক্ট সার্চ যা প্রতিটি অক্ষরে ফল সংকীর্ণ করে।',
    'Choose a trie for dictionaries, autocomplete, and prefix or wildcard matching.', 'অভিধান, অটোকমপ্লিট এবং প্রিফিক্স বা ওয়াইল্ডকার্ড ম্যাচিংয়ে ট্রাই বাছুন।',
    'Prefix queries are very fast, but tries can use a lot of memory for sparse key sets.', 'প্রিফিক্স কুয়েরি খুব দ্রুত, তবে বিরল কী সেটে ট্রাই অনেক মেমরি ব্যবহার করতে পারে।',
    'Using a trie where a hash set suffices, paying memory for prefixes you never query.', 'হ্যাশ সেট যথেষ্ট হলেও ট্রাই ব্যবহার করা, যে প্রিফিক্স কখনো খোঁজেন না তার জন্য মেমরি দেওয়া।'],

  // ── Graphs ────────────────────────────────────────────────────────────────
  ['dsa-graph-basics', 'dsa-graphs', 'Graph representations', 'গ্রাফ রিপ্রেজেন্টেশন', 'Intermediate', 16, 'graph',
    'A graph is nodes joined by edges; store it as an adjacency list for sparse or a matrix for dense graphs.', 'গ্রাফ হলো এজ দিয়ে যুক্ত নোড; বিরল গ্রাফে অ্যাডজেসেন্সি লিস্ট, ঘন গ্রাফে ম্যাট্রিক্স হিসেবে রাখুন।',
    'A map of cities connected by roads—some direct, some one-way, some with distances.', 'সড়কে যুক্ত শহরের মানচিত্র—কিছু সরাসরি, কিছু একমুখী, কিছুতে দূরত্ব।',
    'Pick adjacency lists for most real graphs; note whether edges are directed and weighted.', 'বেশিরভাগ বাস্তব গ্রাফে অ্যাডজেসেন্সি লিস্ট নিন; এজ ডিরেক্টেড ও ওয়েটেড কি না লক্ষ করুন।',
    'Adjacency lists save memory on sparse graphs, but matrices give O(1) edge lookups.', 'বিরল গ্রাফে অ্যাডজেসেন্সি লিস্ট মেমরি বাঁচায়, তবে ম্যাট্রিক্স O(1) এজ লুকআপ দেয়।',
    'Using an adjacency matrix for a huge sparse graph and wasting O(V²) memory.', 'বিশাল বিরল গ্রাফে অ্যাডজেসেন্সি ম্যাট্রিক্স ব্যবহার করে O(V²) মেমরি অপচয়।'],
  ['dsa-bfs', 'dsa-graphs', 'Breadth-first search (BFS)', 'ব্রেডথ-ফার্স্ট সার্চ (BFS)', 'Intermediate', 16, 'bfs',
    'BFS explores a graph level by level with a queue, finding shortest paths in unweighted graphs.', 'BFS কিউ দিয়ে স্তর-ধরে গ্রাফ অন্বেষণ করে—আনওয়েটেড গ্রাফে সবচেয়ে ছোট পথ খুঁজে।',
    'Ripples from a stone in water expanding outward one ring at a time.', 'পানিতে পাথরের ঢেউ একবারে একটি বলয় করে বাইরে ছড়ায়।',
    'Use BFS for shortest paths in unweighted graphs and for nearest-first exploration.', 'আনওয়েটেড গ্রাফে সবচেয়ে ছোট পথ ও কাছের-আগে অন্বেষণে BFS ব্যবহার করুন।',
    'BFS guarantees fewest edges to each node, but its queue can hold a whole frontier in memory.', 'BFS প্রতিটি নোডে সবচেয়ে কম এজ নিশ্চিত করে, তবে এর কিউ পুরো ফ্রন্টিয়ার মেমরিতে রাখতে পারে।',
    'Forgetting a visited set and revisiting nodes, causing infinite loops on cycles.', 'ভিজিটেড সেট ভুলে গিয়ে নোড পুনরায় দেখা, ফলে সাইকেলে অনন্ত লুপ।'],
  ['dsa-dfs', 'dsa-graphs', 'Depth-first search (DFS)', 'ডেপথ-ফার্স্ট সার্চ (DFS)', 'Intermediate', 16, 'dfs',
    'DFS follows one path as deep as possible before backtracking, using recursion or a stack.', 'DFS ব্যাকট্র্যাক করার আগে একটি পথ যতটা সম্ভব গভীরে অনুসরণ করে—রিকার্শন বা স্ট্যাক দিয়ে।',
    'Exploring a maze by always taking a turn until you hit a dead end, then stepping back.', 'গোলকধাঁধায় প্রতিবার এক দিকে যাওয়া, ডেড-এন্ডে পৌঁছে পিছিয়ে আসা।',
    'Use DFS for cycle detection, topological sort, connected components, and path existence.', 'সাইকেল শনাক্ত, টপোলজিক্যাল সর্ট, কানেক্টেড কম্পোনেন্ট ও পথ থাকা যাচাইয়ে DFS ব্যবহার করুন।',
    'DFS uses little frontier memory, but recursion can overflow the stack on deep graphs.', 'DFS কম ফ্রন্টিয়ার মেমরি নেয়, তবে গভীর গ্রাফে রিকার্শন স্ট্যাক ওভারফ্লো করতে পারে।',
    'Assuming DFS finds shortest paths—it does not, unlike BFS on unweighted graphs.', 'DFS সবচেয়ে ছোট পথ খুঁজে ধরে নেওয়া—আনওয়েটেড গ্রাফে BFS-এর মতো এটি করে না।'],
  ['dsa-topological-sort', 'dsa-graphs', 'Topological sort', 'টপোলজিক্যাল সর্ট', 'Intermediate', 15, 'dfs',
    'Topological sort orders the nodes of a directed acyclic graph so every edge points forward, respecting all dependencies.', 'টপোলজিক্যাল সর্ট একটি ডিরেক্টেড অ্যাসাইক্লিক গ্রাফের নোড এমনভাবে সাজায় যাতে প্রতিটি এজ সামনে নির্দেশ করে—সব নির্ভরতা মেনে।',
    'Scheduling course prerequisites so you never take a class before the one it depends on.', 'কোর্স প্রি-রিকুইজিট সাজানো, যাতে নির্ভরশীল ক্লাসের আগে কখনো সেটি না নেন।',
    'Use DFS post-order (then reverse it), or Kahn’s algorithm with in-degrees and a queue, to produce the ordering.', 'ক্রম তৈরিতে DFS পোস্ট-অর্ডার (তারপর উল্টো করুন), বা ইন-ডিগ্রি ও কিউসহ কানের অ্যালগরিদম ব্যবহার করুন।',
    'It runs in O(V + E), but a valid ordering exists only for a DAG—any cycle makes one impossible.', 'এটি O(V + E)-এ চলে, তবে বৈধ ক্রম শুধু DAG-এর জন্য আছে—যেকোনো সাইকেল তা অসম্ভব করে।',
    'Running it on a graph with a cycle and not detecting that no valid order exists.', 'সাইকেলযুক্ত গ্রাফে চালিয়ে বৈধ ক্রম নেই তা শনাক্ত না করা।'],
  ['dsa-shortest-path', 'dsa-graphs', 'Shortest paths (Dijkstra)', 'সবচেয়ে ছোট পথ (ডাইক্সট্রা)', 'Advanced', 18, 'weighted-graph',
    'Dijkstra’s algorithm finds shortest paths from a source in weighted graphs with non-negative edges.', 'ডাইক্সট্রা অ্যালগরিদম নন-নেগেটিভ এজসহ ওয়েটেড গ্রাফে সোর্স থেকে সবচেয়ে ছোট পথ খুঁজে।',
    'A GPS choosing the fastest route by always expanding the currently cheapest known road.', 'একটি GPS বর্তমানে জানা সস্তা সড়ক বাড়িয়ে দ্রুততম পথ বাছে।',
    'Use a min-heap to always expand the closest unsettled node, and relax its neighbors.', 'সবসময় সবচেয়ে কাছের অমীমাংসিত নোড বাড়াতে মিন-হিপ ব্যবহার করুন এবং প্রতিবেশী রিল্যাক্স করুন।',
    'It is efficient for non-negative weights, but negative edges break it—use Bellman-Ford instead.', 'নন-নেগেটিভ ওজনে এটি দক্ষ, তবে নেগেটিভ এজ একে ভাঙে—তখন বেলম্যান-ফোর্ড নিন।',
    'Running Dijkstra on a graph with negative edges and trusting the wrong result.', 'নেগেটিভ এজসহ গ্রাফে ডাইক্সট্রা চালিয়ে ভুল ফল বিশ্বাস করা।'],
  ['dsa-union-find', 'dsa-graphs', 'Union-Find (disjoint sets)', 'ইউনিয়ন-ফাইন্ড (ডিসজয়েন্ট সেট)', 'Advanced', 16, 'graph',
    'Union-Find tracks which elements share a group, merging sets and answering “same group?” in near-constant amortized time.', 'ইউনিয়ন-ফাইন্ড কোন উপাদান একই গ্রুপে তা ট্র্যাক করে—সেট মার্জ করে ও “একই গ্রুপ?” প্রায়-ধ্রুবক অ্যামর্টাইজড সময়ে উত্তর দেয়।',
    'Merging friend circles: introduce two people and their two whole circles instantly become one.', 'বন্ধু-বৃত্ত মেলানো: দুজনকে পরিচয় করান, তাদের দুটি পুরো বৃত্ত তাৎক্ষণিক এক হয়ে যায়।',
    'Store a parent pointer per element, then apply path compression with union by rank to keep the trees flat.', 'প্রতি উপাদানে একটি প্যারেন্ট পয়েন্টার রাখুন, তারপর ট্রি সমতল রাখতে পাথ কম্প্রেশন ও ইউনিয়ন-বাই-র‍্যাঙ্ক প্রয়োগ করুন।',
    'With both optimizations operations are nearly O(1) amortized, but it only answers connectivity—it cannot reconstruct a path.', 'দুই অপ্টিমাইজেশনসহ অপারেশন প্রায় O(1) অ্যামর্টাইজড, তবে এটি শুধু কানেক্টিভিটি বলে—পথ পুনর্গঠন করতে পারে না।',
    'Skipping path compression or union by rank and letting the structure degrade toward O(n) chains.', 'পাথ কম্প্রেশন বা ইউনিয়ন-বাই-র‍্যাঙ্ক বাদ দিয়ে স্ট্রাকচারকে O(n) চেইনে নামতে দেওয়া।'],
  ['dsa-mst', 'dsa-graphs', 'Minimum spanning trees', 'মিনিমাম স্প্যানিং ট্রি', 'Advanced', 17, 'weighted-graph',
    'A minimum spanning tree connects every node with the least total edge weight and no cycles; Kruskal and Prim both find it greedily.', 'একটি মিনিমাম স্প্যানিং ট্রি সব নোডকে সর্বনিম্ন মোট এজ-ওজনে ও সাইকেল ছাড়া যুক্ত করে; ক্রুসকাল ও প্রিম দুটোই গ্রিডিভাবে এটি খুঁজে।',
    'Laying the cheapest cable that still reaches every house, with no wasteful loops.', 'সবচেয়ে সস্তা তার বসানো যা তবু প্রতিটি বাড়িতে পৌঁছায়, অপচয়ী লুপ ছাড়া।',
    'Use Kruskal (sort edges, add each with union-find) for sparse graphs, or Prim (grow from a node with a min-heap) for dense ones.', 'বিরল গ্রাফে ক্রুসকাল (এজ সাজান, প্রতিটি ইউনিয়ন-ফাইন্ড দিয়ে যোগ করুন), ঘন গ্রাফে প্রিম (মিন-হিপ দিয়ে এক নোড থেকে বাড়ান) ব্যবহার করুন।',
    'Both are greedy yet provably optimal, but an MST minimizes total weight—not the distance between any specific pair of nodes.', 'দুটোই গ্রিডি তবু প্রমাণযোগ্যভাবে অপটিমাল, তবে MST মোট ওজন কমায়—কোনো নির্দিষ্ট জোড়া নোডের মধ্যে দূরত্ব নয়।',
    'Expecting the MST to give the shortest path between two nodes—that is Dijkstra’s job, not an MST’s.', 'MST দুটি নোডের মধ্যে সবচেয়ে ছোট পথ দেবে আশা করা—তা MST নয়, ডাইক্সট্রার কাজ।'],

  // ── Techniques ────────────────────────────────────────────────────────────
  ['dsa-two-pointer', 'dsa-techniques', 'Two pointers & sliding window', 'টু পয়েন্টার ও স্লাইডিং উইন্ডো', 'Intermediate', 16, 'two-pointer',
    'Two pointers and sliding windows scan arrays in O(n) by moving indices instead of nesting loops.', 'টু পয়েন্টার ও স্লাইডিং উইন্ডো লুপ নেস্ট না করে ইনডেক্স সরিয়ে O(n)-এ অ্যারে স্ক্যান করে।',
    'Two people closing in from both ends of a line to meet in the middle.', 'দুজন লাইনের দুই প্রান্ত থেকে এগিয়ে মাঝে মেলে।',
    'Use them for pair sums, palindromes, and contiguous subarray or substring problems.', 'পেয়ার সাম, প্যালিনড্রোম ও ধারাবাহিক সাবঅ্যারে/সাবস্ট্রিং সমস্যায় এগুলো ব্যবহার করুন।',
    'They turn many O(n²) scans into O(n), but usually require sorted or monotonic structure.', 'এগুলো অনেক O(n²) স্ক্যানকে O(n) করে, তবে সাধারণত সাজানো বা মনোটনিক স্ট্রাকচার দরকার।',
    'Applying a sliding window to a problem lacking the monotonic property it relies on.', 'যে সমস্যায় নির্ভরযোগ্য মনোটনিক ধর্ম নেই সেখানে স্লাইডিং উইন্ডো প্রয়োগ করা।'],
  ['dsa-backtracking', 'dsa-techniques', 'Recursion & backtracking', 'রিকার্শন ও ব্যাকট্র্যাকিং', 'Advanced', 18, 'backtracking',
    'Backtracking builds candidates step by step and abandons a path as soon as it cannot succeed.', 'ব্যাকট্র্যাকিং ধাপে ধাপে ক্যান্ডিডেট বানায় এবং সফল হতে না পারলে সঙ্গে সঙ্গে পথ ছাড়ে।',
    'Solving a maze by trying a turn, and reversing the moment you hit a wall.', 'গোলকধাঁধা সমাধানে এক দিক চেষ্টা করা, দেয়ালে ঠেকলেই সঙ্গে সঙ্গে ফিরে আসা।',
    'Prune invalid branches early to shrink the search tree for permutations, N-Queens, and subsets.', 'পারমুটেশন, N-কুইন্স ও সাবসেটে সার্চ ট্রি ছোট করতে অবৈধ শাখা আগেই ছেঁটে ফেলুন।',
    'Pruning explores far fewer states, but the worst case is still exponential.', 'প্রুনিং অনেক কম স্টেট অন্বেষণ করে, তবে ওয়ার্স্ট-কেস এখনো এক্সপোনেনশিয়াল।',
    'Failing to undo state changes when backtracking, so branches corrupt each other.', 'ব্যাকট্র্যাক করার সময় স্টেট পরিবর্তন আনডু না করা, ফলে শাখাগুলো একে অপরকে নষ্ট করে।'],
  ['dsa-greedy', 'dsa-techniques', 'Greedy algorithms', 'গ্রিডি অ্যালগরিদম', 'Intermediate', 15, 'greedy',
    'A greedy algorithm takes the best local choice at each step, hoping it leads to a global optimum.', 'গ্রিডি অ্যালগরিদম প্রতি ধাপে সেরা স্থানীয় পছন্দ নেয়, আশা করে তা গ্লোবাল অপটিমামে নিয়ে যাবে।',
    'Making change by always handing over the largest coin that still fits.', 'সবসময় মানানসই বৃহত্তম মুদ্রা দিয়ে খুচরা ফেরত দেওয়া।',
    'Use greedy when a local-optimum choice is provably safe, as in interval scheduling.', 'যখন স্থানীয়-অপটিমাম পছন্দ প্রমাণযোগ্যভাবে নিরাপদ (যেমন ইন্টারভাল শিডিউলিং) তখন গ্রিডি নিন।',
    'Greedy is simple and fast, but without a proof it can silently return a wrong answer.', 'গ্রিডি সরল ও দ্রুত, তবে প্রমাণ ছাড়া এটি নীরবে ভুল উত্তর দিতে পারে।',
    'Assuming greedy works without proving it, when only DP gives the true optimum.', 'প্রমাণ ছাড়া গ্রিডি চলে ধরে নেওয়া, যেখানে শুধু DP সত্যিকারের অপটিমাম দেয়।'],
  ['dsa-bit-manipulation', 'dsa-techniques', 'Bit manipulation', 'বিট ম্যানিপুলেশন', 'Intermediate', 14, 'algo-flow',
    'Bit manipulation uses AND, OR, XOR, and shifts to pack flags compactly and compute in O(1) what a loop would do in O(n).', 'বিট ম্যানিপুলেশন AND, OR, XOR ও শিফট দিয়ে ফ্ল্যাগ কমপ্যাক্টভাবে রাখে এবং লুপ যা O(n)-এ করত তা O(1)-এ হিসাব করে।',
    'A row of light switches: one integer holds many on/off states you can flip and read all at once.', 'সারিবদ্ধ লাইট সুইচ: একটি ইন্টিজার অনেক অন/অফ অবস্থা রাখে যা একসঙ্গে বদলাতে ও পড়তে পারেন।',
    'Learn the core moves: x & 1 tests parity, x & (x - 1) clears the lowest set bit, and XOR cancels duplicate values.', 'মূল কৌশল শিখুন: x & 1 প্যারিটি দেখে, x & (x - 1) সর্বনিম্ন সেট বিট মোছে, এবং XOR ডুপ্লিকেট মান বাতিল করে।',
    'Bit tricks are extremely fast and memory-tight, but they hurt readability and are easy to get wrong on signed or oversized integers.', 'বিট ট্রিক অত্যন্ত দ্রুত ও মেমরি-সাশ্রয়ী, তবে পঠনযোগ্যতা কমায় এবং সাইনড বা অতি-বড় ইন্টিজারে সহজে ভুল হয়।',
    'Assuming shifts and masks are safe on signed integers, then hitting overflow or sign-extension bugs.', 'সাইনড ইন্টিজারে শিফট ও মাস্ক নিরাপদ ধরে নেওয়া, তারপর ওভারফ্লো বা সাইন-এক্সটেনশন বাগে পড়া।'],
  ['dsa-dp', 'dsa-techniques', 'Dynamic programming', 'ডাইনামিক প্রোগ্রামিং', 'Advanced', 20, 'dp',
    'Dynamic programming solves overlapping subproblems once and reuses the answers via memoization or tables.', 'ডাইনামিক প্রোগ্রামিং ওভারল্যাপিং সাবপ্রবলেম একবার সমাধান করে এবং মেমোাইজেশন বা টেবিল দিয়ে উত্তর পুনঃব্যবহার করে।',
    'Climbing stairs where each step’s count reuses the two steps already computed below it.', 'সিঁড়ি ওঠা—প্রতি ধাপের হিসাব নিচের ইতিমধ্যে গোনা দুই ধাপ পুনঃব্যবহার করে।',
    'Define the state and recurrence, then fill a table bottom-up or memoize top-down.', 'স্টেট ও রিকারেন্স সংজ্ঞায়িত করুন, তারপর নিচ-থেকে টেবিল ভরুন বা ওপর-থেকে মেমোাইজ করুন।',
    'DP turns exponential recursion into polynomial time, at the cost of extra memory for the table.', 'DP এক্সপোনেনশিয়াল রিকার্শনকে পলিনোমিয়াল সময়ে নামায়, বিনিময়ে টেবিলের অতিরিক্ত মেমরি।',
    'Applying DP without a correct recurrence, or recomputing subproblems you already solved.', 'সঠিক রিকারেন্স ছাড়া DP প্রয়োগ, বা ইতিমধ্যে সমাধান করা সাবপ্রবলেম আবার হিসাব করা।'],
]

// Time-complexity reference tables shown as an extra lesson section (DSA-specific).
const complexity = {
  'dsa-arrays': [['Access by index', 'ইনডেক্সে অ্যাক্সেস', 'O(1)'], ['Search', 'সার্চ', 'O(n)'], ['Insert / delete at end', 'শেষে ইনসার্ট / ডিলিট', 'O(1)*'], ['Insert / delete in middle', 'মাঝে ইনসার্ট / ডিলিট', 'O(n)']],
  'dsa-linked-list': [['Access by index', 'ইনডেক্সে অ্যাক্সেস', 'O(n)'], ['Search', 'সার্চ', 'O(n)'], ['Insert / delete at head', 'হেডে ইনসার্ট / ডিলিট', 'O(1)'], ['Insert / delete at known node', 'জানা নোডে ইনসার্ট / ডিলিট', 'O(1)']],
  'dsa-stack': [['Push', 'পুশ', 'O(1)'], ['Pop', 'পপ', 'O(1)'], ['Peek', 'পিক', 'O(1)'], ['Search', 'সার্চ', 'O(n)']],
  'dsa-queue': [['Enqueue', 'এনকিউ', 'O(1)'], ['Dequeue', 'ডিকিউ', 'O(1)'], ['Peek front', 'সামনে পিক', 'O(1)'], ['Search', 'সার্চ', 'O(n)']],
  'dsa-hash-table': [['Lookup (avg)', 'লুকআপ (গড়)', 'O(1)'], ['Insert (avg)', 'ইনসার্ট (গড়)', 'O(1)'], ['Delete (avg)', 'ডিলিট (গড়)', 'O(1)'], ['Worst case', 'ওয়ার্স্ট কেস', 'O(n)']],
  'dsa-binary-search': [['Search (sorted)', 'সার্চ (সাজানো)', 'O(log n)'], ['Space', 'স্পেস', 'O(1)']],
  'dsa-elementary-sorts': [['Best case', 'বেস্ট কেস', 'O(n)'], ['Average', 'গড়', 'O(n²)'], ['Worst case', 'ওয়ার্স্ট কেস', 'O(n²)'], ['Space', 'স্পেস', 'O(1)']],
  'dsa-merge-sort': [['Best / avg / worst', 'বেস্ট / গড় / ওয়ার্স্ট', 'O(n log n)'], ['Space', 'স্পেস', 'O(n)'], ['Stable', 'স্থিতিশীল', 'Yes']],
  'dsa-quick-sort': [['Average', 'গড়', 'O(n log n)'], ['Worst case', 'ওয়ার্স্ট কেস', 'O(n²)'], ['Space', 'স্পেস', 'O(log n)']],
  'dsa-heap-sort': [['Best / avg / worst', 'বেস্ট / গড় / ওয়ার্স্ট', 'O(n log n)'], ['Space', 'স্পেস', 'O(1)'], ['Stable', 'স্থিতিশীল', 'No']],
  'dsa-bst': [['Search (balanced)', 'সার্চ (ভারসাম্য)', 'O(log n)'], ['Insert (balanced)', 'ইনসার্ট (ভারসাম্য)', 'O(log n)'], ['Worst (skewed)', 'ওয়ার্স্ট (হেলানো)', 'O(n)']],
  'dsa-balanced-trees': [['Search', 'সার্চ', 'O(log n)'], ['Insert', 'ইনসার্ট', 'O(log n)'], ['Delete', 'ডিলিট', 'O(log n)'], ['Height', 'উচ্চতা', 'O(log n)']],
  'dsa-heap': [['Peek min / max', 'পিক মিন / ম্যাক্স', 'O(1)'], ['Push', 'পুশ', 'O(log n)'], ['Pop', 'পপ', 'O(log n)'], ['Build heap', 'হিপ তৈরি', 'O(n)']],
  'dsa-trie': [['Insert word', 'শব্দ ইনসার্ট', 'O(L)'], ['Search word', 'শব্দ সার্চ', 'O(L)'], ['Prefix search', 'প্রিফিক্স সার্চ', 'O(L)']],
  'dsa-bfs': [['Time', 'সময়', 'O(V + E)'], ['Space', 'স্পেস', 'O(V)']],
  'dsa-dfs': [['Time', 'সময়', 'O(V + E)'], ['Space', 'স্পেস', 'O(V)']],
  'dsa-topological-sort': [['Time', 'সময়', 'O(V + E)'], ['Space', 'স্পেস', 'O(V)']],
  'dsa-shortest-path': [['Time (heap)', 'সময় (হিপ)', 'O((V+E) log V)'], ['Space', 'স্পেস', 'O(V)']],
  'dsa-union-find': [['Find (amortized)', 'ফাইন্ড (অ্যামর্টাইজড)', 'O(α(n))'], ['Union (amortized)', 'ইউনিয়ন (অ্যামর্টাইজড)', 'O(α(n))'], ['Space', 'স্পেস', 'O(n)']],
  'dsa-mst': [['Kruskal', 'ক্রুসকাল', 'O(E log E)'], ['Prim (heap)', 'প্রিম (হিপ)', 'O((V+E) log V)'], ['Space', 'স্পেস', 'O(V + E)']],
  'dsa-bit-manipulation': [['Test / set / clear bit', 'বিট টেস্ট / সেট / ক্লিয়ার', 'O(1)'], ['Count set bits', 'সেট বিট গণনা', 'O(k)'], ['Space', 'স্পেস', 'O(1)']],
  'dsa-dp': [['Time', 'সময়', 'O(states × work)'], ['Space', 'স্পেস', 'O(states)']],
}

// DSA-flavoured distractors for generated exams.
const distractors = [
  l('Pick the structure with the fanciest name regardless of the operations.', 'অপারেশন যাই হোক, সবচেয়ে জমকালো নামের স্ট্রাকচার বেছে নিন।'),
  l('Assume every operation is O(1) and never analyze the worst case.', 'ধরে নিন প্রতিটি অপারেশন O(1) এবং ওয়ার্স্ট কেস কখনো বিশ্লেষণ করবেন না।'),
  l('Optimize constant factors before fixing an exponential algorithm.', 'এক্সপোনেনশিয়াল অ্যালগরিদম ঠিক করার আগে ধ্রুবক ফ্যাক্টর অপটিমাইজ করুন।'),
]

function makeExam(topic) {
  const correct = {
    purpose: l(topic.insight.en, topic.insight.bn),
    action: l(topic.action.en, topic.action.bn),
    tradeoff: l(topic.tradeoff.en, topic.tradeoff.bn),
    mistake: l(topic.mistake.en, topic.mistake.bn),
  }
  const optionSet = (answer, offset = 0) => {
    const answerIndex = offset % 4
    const values = [...distractors]
    values.splice(answerIndex, 0, answer)
    return {
      options: values.map((text, index) => ({ id: String.fromCharCode(97 + index), text })),
      correct: [String.fromCharCode(97 + answerIndex)],
    }
  }
  const purpose = optionSet(correct.purpose, topic.order)
  const action = optionSet(correct.action, topic.order + 1)
  const mistake = optionSet(correct.mistake, topic.order + 2)
  const interview = optionSet(l(`State the complexity, the core operation, and this trade-off: ${topic.tradeoff.en}`, `জটিলতা, মূল অপারেশন এবং এই ট্রেড-অফ বলুন: ${topic.tradeoff.bn}`), topic.order + 3)

  return [
    { id: 'q1', type: 'single', concept: topic.title, prompt: l(`What is the central idea of ${topic.title.en}?`, `${topic.title.bn}-এর মূল ধারণা কী?`), ...purpose, explanation: correct.purpose },
    { id: 'q2', type: 'single', concept: topic.title, prompt: l('Which approach is the strongest starting decision?', 'কোন পদ্ধতিটি সবচেয়ে শক্তিশালী শুরুর সিদ্ধান্ত?'), ...action, explanation: correct.action },
    { id: 'q3', type: 'multi', concept: topic.title, prompt: l('Select both statements that show sound algorithmic reasoning.', 'সঠিক অ্যালগরিদমিক চিন্তা দেখায়—এমন দুটি বক্তব্য বাছুন।'), options: [
      { id: 'a', text: correct.purpose }, { id: 'b', text: distractors[0] }, { id: 'c', text: correct.tradeoff }, { id: 'd', text: distractors[1] },
    ], correct: ['a', 'c'], explanation: l(`A sound answer states both the mechanism and its trade-off: ${topic.tradeoff.en}`, `সঠিক উত্তরে প্রক্রিয়া ও ট্রেড-অফ দুটিই থাকে: ${topic.tradeoff.bn}`) },
    { id: 'q4', type: 'single', concept: topic.title, prompt: l('Which choice is a common mistake?', 'কোনটি সাধারণ ভুল?'), ...mistake, explanation: l(`Avoid this mistake: ${topic.mistake.en}`, `এই ভুল এড়িয়ে চলুন: ${topic.mistake.bn}`) },
    { id: 'q5', type: 'single', concept: topic.title, prompt: l('What should a strong interview answer include?', 'একটি ভালো ইন্টারভিউ উত্তরে কী থাকা উচিত?'), ...interview, explanation: l('Interviewers value stated complexity, the key operation, and an explicit trade-off over memorized code.', 'ইন্টারভিউয়ার মুখস্থ কোডের চেয়ে বলা জটিলতা, মূল অপারেশন ও স্পষ্ট ট্রেড-অফকে বেশি মূল্য দেন।') },
  ]
}

export const dsaTopics = rawTopics.map((row, index) => {
  const [id, moduleId, en, bn, difficulty, minutes, diagram, insightEn, insightBn, analogyEn, analogyBn, actionEn, actionBn, tradeoffEn, tradeoffBn, mistakeEn, mistakeBn] = row
  const topic = {
    id, order: index + 1, moduleId, title: l(en, bn), difficulty, minutes, diagram, deepDive: null,
    insight: l(insightEn, insightBn), analogy: l(analogyEn, analogyBn), action: l(actionEn, actionBn), tradeoff: l(tradeoffEn, tradeoffBn), mistake: l(mistakeEn, mistakeBn),
    complexity: (complexity[id] || []).map(([opEn, opBn, value]) => ({ op: l(opEn, opBn), value })),
    objectives: [
      l(`Explain ${en} in plain language.`, `সহজ ভাষায় ${bn} ব্যাখ্যা করতে পারবেন।`),
      l('Recognize when this structure or technique is the right tool.', 'কখন এই স্ট্রাকচার বা কৌশল সঠিক টুল তা বুঝতে পারবেন।'),
      l('State its time/space cost and most important trade-off.', 'এর সময়/স্পেস খরচ ও সবচেয়ে গুরুত্বপূর্ণ ট্রেড-অফ বলতে পারবেন।'),
    ],
    advantages: l(`It gives a clear, reusable way to reason about ${en.toLowerCase()} and its cost.`, `এটি ${bn} ও এর খরচ নিয়ে ভাবার একটি পরিষ্কার, পুনঃব্যবহারযোগ্য উপায় দেয়।`),
    interview: l(`State the operations you need, name ${en.toLowerCase()} with its complexity, then justify it against one alternative.`, `যে অপারেশন দরকার তা বলুন, ${bn} ও তার জটিলতা উল্লেখ করুন, তারপর একটি বিকল্পের সঙ্গে যুক্তি দিন।`),
    glossary: [
      { term: l('Time complexity', 'টাইম কমপ্লেক্সিটি'), definition: l('How running time grows with input size.', 'ইনপুট আকার বাড়লে চলার সময় কীভাবে বাড়ে।') },
      { term: l('Trade-off', 'ট্রেড-অফ'), definition: l('Improving one operation by accepting a cost elsewhere.', 'অন্যদিকে খরচ মেনে একটি অপারেশন উন্নত করা।') },
    ],
  }
  topic.exam = makeExam(topic).map((question) => ({ ...question, concept: topic.title }))
  return topic
})

// ── Guided design labs (bilingual) ──────────────────────────────────────────
export const dsaLabs = [
  {
    id: 'dsa-structure-lab', icon: '▦', title: l('Choose the Data Structure', 'ডেটা স্ট্রাকচার বাছাই ল্যাব'), subtitle: l('Match the right structure to each access pattern.', 'প্রতিটি অ্যাক্সেস প্যাটার্নে সঠিক স্ট্রাকচার মেলান।'),
    stages: [
      ['Random access', 'র‍্যান্ডম অ্যাক্সেস', 'You mostly read elements by index. Which structure?', 'আপনি বেশিরভাগ ইনডেক্স দিয়ে পড়েন। কোন স্ট্রাকচার?', ['Array', 'Singly linked list'], ['অ্যারে', 'সিঙ্গলি লিংকড লিস্ট'], 0, 'Arrays give O(1) index access; linked lists need an O(n) scan.', 'অ্যারে O(1) ইনডেক্স অ্যাক্সেস দেয়; লিংকড লিস্টে O(n) স্ক্যান লাগে।'],
      ['Frequent front inserts', 'ঘন ঘন সামনে ইনসার্ট', 'You insert and remove at the front constantly. Which structure?', 'আপনি অবিরত সামনে ইনসার্ট ও রিমুভ করেন। কোন স্ট্রাকচার?', ['Linked list / deque', 'Plain array'], ['লিংকড লিস্ট / ডেক', 'সাধারণ অ্যারে'], 0, 'Front operations are O(1) on a linked list or deque, O(n) on an array.', 'সামনের অপারেশন লিংকড লিস্ট/ডেকে O(1), অ্যারেতে O(n)।'],
      ['Fast membership', 'দ্রুত মেম্বারশিপ', 'You need “does this key exist?” in average O(1). Which structure?', 'গড় O(1)-এ “এই কী আছে কি?” দরকার। কোন স্ট্রাকচার?', ['Hash set', 'Sorted array with scan'], ['হ্যাশ সেট', 'সাজানো অ্যারে স্ক্যান'], 0, 'A hash set answers membership in average O(1).', 'হ্যাশ সেট গড় O(1)-এ মেম্বারশিপ বলে।'],
      ['Always the smallest', 'সবসময় সবচেয়ে ছোট', 'You repeatedly need the current minimum. Which structure?', 'আপনি বারবার বর্তমান সর্বনিম্ন চান। কোন স্ট্রাকচার?', ['Min-heap', 'Unsorted list'], ['মিন-হিপ', 'অসাজানো লিস্ট'], 0, 'A heap peeks the min in O(1) and pops in O(log n).', 'হিপ O(1)-এ মিন দেখে ও O(log n)-এ পপ করে।'],
      ['Ordered range queries', 'সাজানো রেঞ্জ কুয়েরি', 'You need keys in sorted order and range scans. Which structure?', 'আপনি সাজানো ক্রমে কী ও রেঞ্জ স্ক্যান চান। কোন স্ট্রাকচার?', ['Balanced BST', 'Hash table'], ['ব্যালান্সড BST', 'হ্যাশ টেবিল'], 0, 'A balanced BST keeps order for range queries; hash tables do not.', 'ব্যালান্সড BST রেঞ্জ কুয়েরির জন্য ক্রম রাখে; হ্যাশ টেবিল রাখে না।'],
    ],
  },
  {
    id: 'dsa-search-lab', icon: '⌕', title: l('Search & Sort Strategy', 'সার্চ ও সর্ট কৌশল ল্যাব'), subtitle: l('Pick the fastest correct algorithm for each case.', 'প্রতিটি ক্ষেত্রে দ্রুততম সঠিক অ্যালগরিদম বাছুন।'),
    stages: [
      ['Sorted lookup', 'সাজানো লুকআপ', 'Data is already sorted and you search often. How do you search?', 'ডেটা আগেই সাজানো, আপনি প্রায়ই সার্চ করেন। কীভাবে সার্চ?', ['Binary search', 'Linear scan every time'], ['বাইনারি সার্চ', 'প্রতিবার লিনিয়ার স্ক্যান'], 0, 'Binary search is O(log n) on sorted data; scanning is O(n).', 'সাজানো ডেটায় বাইনারি সার্চ O(log n); স্ক্যান O(n)।'],
      ['Large unsorted array', 'বড় অসাজানো অ্যারে', 'You must sort a large array. Which class of algorithm?', 'আপনাকে বড় অ্যারে সাজাতে হবে। কোন শ্রেণির অ্যালগরিদম?', ['O(n log n) sort', 'Bubble sort'], ['O(n log n) সর্ট', 'বাবল সর্ট'], 0, 'Merge or quick sort scales; bubble sort’s O(n²) does not.', 'মার্জ/কুইক সর্ট স্কেল করে; বাবল সর্টের O(n²) করে না।'],
      ['Stability required', 'স্থিতিশীলতা দরকার', 'Equal keys must keep their original order. Which sort?', 'সমান কী মূল ক্রম রাখতে হবে। কোন সর্ট?', ['Merge sort', 'Plain quick sort'], ['মার্জ সর্ট', 'সাধারণ কুইক সর্ট'], 0, 'Merge sort is stable; classic quick sort is not.', 'মার্জ সর্ট স্থিতিশীল; ক্লাসিক কুইক সর্ট নয়।'],
      ['Tight memory', 'কড়া মেমরি', 'You must sort in place with minimal extra memory. Which sort?', 'ন্যূনতম অতিরিক্ত মেমরিতে ইন-প্লেস সাজাতে হবে। কোন সর্ট?', ['Quick sort', 'Merge sort'], ['কুইক সর্ট', 'মার্জ সর্ট'], 0, 'Quick sort is in-place; merge sort needs O(n) extra space.', 'কুইক সর্ট ইন-প্লেস; মার্জ সর্টে O(n) অতিরিক্ত স্পেস লাগে।'],
    ],
  },
  {
    id: 'dsa-graph-lab', icon: '◎', title: l('Model It as a Graph', 'গ্রাফ হিসেবে মডেল ল্যাব'), subtitle: l('Choose the right traversal for each goal.', 'প্রতিটি লক্ষ্যে সঠিক ট্রাভার্সাল বাছুন।'),
    stages: [
      ['Fewest hops', 'সবচেয়ে কম হপ', 'Find the shortest path in an unweighted graph. Which search?', 'আনওয়েটেড গ্রাফে সবচেয়ে ছোট পথ খুঁজুন। কোন সার্চ?', ['BFS', 'DFS'], ['BFS', 'DFS'], 0, 'BFS explores level by level, giving fewest-edge paths.', 'BFS স্তর-ধরে খোঁজে, সবচেয়ে কম-এজ পথ দেয়।'],
      ['Detect a cycle', 'সাইকেল শনাক্ত', 'You must detect cycles or order dependencies. Which search?', 'সাইকেল বা নির্ভরতার ক্রম শনাক্ত করতে হবে। কোন সার্চ?', ['DFS', 'BFS'], ['DFS', 'BFS'], 0, 'DFS naturally supports cycle detection and topological sort.', 'DFS স্বভাবতই সাইকেল শনাক্ত ও টপোলজিক্যাল সর্ট সমর্থন করে।'],
      ['Weighted shortest path', 'ওয়েটেড ছোট পথ', 'Roads have positive distances. Which algorithm?', 'সড়কে ধনাত্মক দূরত্ব আছে। কোন অ্যালগরিদম?', ['Dijkstra', 'Plain BFS'], ['ডাইক্সট্রা', 'সাধারণ BFS'], 0, 'Dijkstra handles non-negative weights; plain BFS ignores them.', 'ডাইক্সট্রা নন-নেগেটিভ ওজন সামলায়; সাধারণ BFS উপেক্ষা করে।'],
      ['Avoid infinite loops', 'অনন্ত লুপ এড়ান', 'Your graph has cycles. What must every traversal keep?', 'আপনার গ্রাফে সাইকেল আছে। প্রতিটি ট্রাভার্সালে কী রাখতে হবে?', ['A visited set', 'Nothing extra'], ['একটি ভিজিটেড সেট', 'অতিরিক্ত কিছু নয়'], 0, 'A visited set prevents revisiting nodes and infinite loops.', 'ভিজিটেড সেট নোড পুনরায় দেখা ও অনন্ত লুপ ঠেকায়।'],
    ],
  },
  {
    id: 'dsa-lru-lab', icon: '⟳', title: l('Design an LRU Cache', 'LRU ক্যাশ ডিজাইন ল্যাব'), subtitle: l('Combine two structures for O(1) get and put.', 'O(1) get ও put-এর জন্য দুটি স্ট্রাকচার মেলান।'),
    stages: [
      ['O(1) lookup', 'O(1) লুকআপ', 'You need get(key) in O(1). Which structure holds the keys?', 'get(key) O(1)-এ দরকার। কোন স্ট্রাকচার কী রাখে?', ['Hash map', 'Sorted array'], ['হ্যাশ ম্যাপ', 'সাজানো অ্যারে'], 0, 'A hash map gives O(1) access to each cached entry.', 'হ্যাশ ম্যাপ প্রতিটি ক্যাশড এন্ট্রিতে O(1) অ্যাক্সেস দেয়।'],
      ['Track recency', 'সাম্প্রতিকতা ট্র্যাক', 'You must know the least-recently-used item instantly. What orders usage?', 'সবচেয়ে কম-ব্যবহৃত আইটেম তাৎক্ষণিক জানতে হবে। কী ব্যবহার সাজায়?', ['Doubly linked list', 'Static array'], ['ডাবলি লিংকড লিস্ট', 'স্ট্যাটিক অ্যারে'], 0, 'A doubly linked list moves used nodes to the front in O(1).', 'ডাবলি লিংকড লিস্ট ব্যবহৃত নোড O(1)-এ সামনে আনে।'],
      ['On access', 'অ্যাক্সেসে', 'When an item is read, what happens to it?', 'একটি আইটেম পড়া হলে তার কী হয়?', ['Move it to the most-recent end', 'Leave it in place'], ['সবচেয়ে-সাম্প্রতিক প্রান্তে সরান', 'যেখানে আছে রাখুন'], 0, 'Marking it most-recent keeps eviction order correct.', 'একে সবচেয়ে-সাম্প্রতিক করা eviction ক্রম সঠিক রাখে।'],
      ['On overflow', 'ওভারফ্লোতে', 'The cache is full and a new key arrives. What do you evict?', 'ক্যাশ পূর্ণ, নতুন কী এলো। কী evict করবেন?', ['The least-recently-used tail', 'A random entry'], ['সবচেয়ে কম-ব্যবহৃত টেইল', 'র‍্যান্ডম এন্ট্রি'], 0, 'Evicting the LRU tail keeps the most useful items cached.', 'LRU টেইল evict করলে সবচেয়ে দরকারি আইটেম ক্যাশে থাকে।'],
    ],
  },
].map((lab) => ({ ...lab, stages: lab.stages.map((s, i) => ({ id: `${lab.id}-${i}`, title: l(s[0], s[1]), question: l(s[2], s[3]), options: s[4].map((en, x) => l(en, s[5][x])), correct: s[6], feedback: l(s[7], s[8]) })) }))
