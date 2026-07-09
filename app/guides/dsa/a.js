// Deep, bilingual (English / Bangla) teaching guides for DSA foundations & linear
// structures. Shape mirrors app/course-guides.js: each guide is an array of
// sections { h, blocks }, rendered by GuideBlock in app/LearningApp.js.
// Facts (definitions, analogies, trade-offs, Big-O) are drawn from app/courses/dsa.js.

const l = (en, bn) => ({ en, bn })

export default {
  // ── dsa-intro · What are data structures & algorithms? ────────────────────
  'dsa-intro': [
    {
      h: l('What are data structures & algorithms?', 'ডেটা স্ট্রাকচার ও অ্যালগরিদম কী?'),
      blocks: [
        { p: l('A data structure is a way of organizing data in memory so a program can use it efficiently. An algorithm is the step-by-step recipe that operates on that data to get a result. The two are inseparable: the structure decides what is cheap or expensive to do, and the algorithm is the procedure you run on top of it. Almost every program you will ever write is some data held in a structure, with algorithms reading and changing it.', 'ডেটা স্ট্রাকচার হলো মেমরিতে ডেটা সাজানোর একটি উপায় যাতে একটি প্রোগ্রাম তা দক্ষতার সঙ্গে ব্যবহার করতে পারে। অ্যালগরিদম হলো সেই ডেটার ওপর কাজ করে ফলাফল বের করার ধাপে-ধাপে রেসিপি। দুটি অবিচ্ছেদ্য: স্ট্রাকচার ঠিক করে কোন কাজ সস্তা বা ব্যয়বহুল, আর অ্যালগরিদম হলো তার ওপর চালানো পদ্ধতি। আপনি যত প্রোগ্রাম লিখবেন তার প্রায় সবই একটি স্ট্রাকচারে রাখা কিছু ডেটা, আর তা পড়া ও বদলানো অ্যালগরিদম।') },
        { p: l('The problem this pairing solves is efficiency at scale. A brute-force program that works fine on ten items can freeze on ten million if the data is stored the wrong way. Choosing the right structure and algorithm is how you turn a program that "runs" into a program that runs fast enough to be usable, without buying a bigger machine. This is why interviewers and real engineering teams care about it so much. The encouraging part is that a small toolbox — a handful of structures and a handful of algorithm patterns — covers the vast majority of problems you will ever meet, so learning them once pays off for years.', 'এই জোড়া যে সমস্যা সমাধান করে তা হলো স্কেলে দক্ষতা। দশটি আইটেমে ভালো চলা একটি ব্রুট-ফোর্স প্রোগ্রাম এক কোটি আইটেমে জমে যেতে পারে যদি ডেটা ভুলভাবে রাখা হয়। সঠিক স্ট্রাকচার ও অ্যালগরিদম বাছাই-ই "চলে" এমন প্রোগ্রামকে বড় মেশিন না কিনেই যথেষ্ট দ্রুত ব্যবহারযোগ্য প্রোগ্রামে পরিণত করে। এ কারণেই ইন্টারভিউয়ার ও বাস্তব ইঞ্জিনিয়ারিং টিম এটিকে এত গুরুত্ব দেয়। উৎসাহজনক দিক হলো একটি ছোট টুলবক্স—কয়েকটি স্ট্রাকচার ও কয়েকটি অ্যালগরিদম প্যাটার্ন—আপনি যত সমস্যা দেখবেন তার বেশিরভাগই ঢেকে ফেলে, তাই একবার শিখলে বছরের পর বছর কাজে লাগে।') },
        { note: l('Think of a kitchen. How you store your ingredients — a labelled spice rack versus one giant unsorted box — shapes how fast you can cook the recipe. The recipe is the algorithm; the storage is the data structure. A great recipe run against a chaotic pantry is still slow.', 'একটি রান্নাঘর ভাবুন। উপকরণ কীভাবে রাখেন—লেবেল করা মসলার তাক বনাম একটি বিশাল অগোছালো বাক্স—তা রেসিপি কত দ্রুত রাঁধবেন তা ঠিক করে। রেসিপি হলো অ্যালগরিদম; সংরক্ষণ হলো ডেটা স্ট্রাকচার। এলোমেলো প্যান্ট্রিতে চালানো দারুণ রেসিপিও ধীরই থাকে।'), kind: 'tip' },
      ],
    },
    {
      h: l('How they work together', 'এরা কীভাবে একসঙ্গে কাজ করে'),
      blocks: [
        { p: l('You do not pick a structure at random. You start from the operations your program repeats most — does it read by position, search by value, insert at the front, or always take the most recent item? — and choose the structure that makes those specific operations cheap. Then you pick an algorithm that fits that structure.', 'আপনি এলোমেলোভাবে স্ট্রাকচার বাছেন না। শুরু করেন আপনার প্রোগ্রাম সবচেয়ে বেশি যে অপারেশন করে তা থেকে—এটি কি অবস্থান দিয়ে পড়ে, মান দিয়ে সার্চ করে, সামনে ইনসার্ট করে, নাকি সবসময় সাম্প্রতিক আইটেম নেয়?—আর সেই নির্দিষ্ট অপারেশনগুলো সস্তা করে এমন স্ট্রাকচার বাছেন। তারপর সেই স্ট্রাকচারের সঙ্গে মানানসই অ্যালগরিদম নেন।') },
        { steps: [
          l('Write down the operations you will do most often, and roughly how many items you expect.', 'সবচেয়ে বেশি যে অপারেশন করবেন তা লিখুন, আর মোটামুটি কত আইটেম আশা করেন তাও।'),
          l('Pick the data structure whose cheap operations match your hot path (for example an array for index access, a hash table for lookup by key).', 'যে স্ট্রাকচারের সস্তা অপারেশন আপনার হট পাথের সঙ্গে মেলে তা বাছুন (যেমন ইনডেক্স অ্যাক্সেসে array, কী দিয়ে লুকআপে hash table)।'),
          l('Choose an algorithm that exploits that structure — you cannot binary-search data that is not stored in sorted, indexable order.', 'সেই স্ট্রাকচারকে কাজে লাগায় এমন অ্যালগরিদম বাছুন—সাজানো, ইনডেক্সযোগ্য ক্রমে না রাখা ডেটা আপনি binary-search করতে পারবেন না।'),
          l('Estimate the cost in Big-O, and if the hot path is too slow, change the structure and repeat.', 'Big-O-তে খরচ আন্দাজ করুন, আর হট পাথ বেশি ধীর হলে স্ট্রাকচার বদলে আবার করুন।'),
        ] },
        { code: `function solve(problem):
    # 1. choose a structure for the operations you repeat most
    data = chooseStructure(problem)     # array, hash table, list, ...

    # 2. run an algorithm that fits that structure
    result = init()
    while not done(data):
        item   = nextStep(data)         # cost depends on the structure
        result = combine(result, item)

    return result`, caption: l('The structure (chooseStructure) silently sets the cost of every nextStep. Same algorithm, different structure, wildly different speed.', 'স্ট্রাকচার (chooseStructure) নীরবে প্রতিটি nextStep-এর খরচ ঠিক করে। একই অ্যালগরিদম, ভিন্ন স্ট্রাকচার, বিশাল ভিন্ন গতি।') },
      ],
    },
    {
      h: l('The same job, different structures', 'একই কাজ, ভিন্ন স্ট্রাকচার'),
      blocks: [
        { p: l('One task — "find and use an item" — costs very different amounts depending on where the data lives. These are the real costs from the structures in this course, and they show why the choice matters.', 'একটি কাজ—"একটি আইটেম খুঁজে ব্যবহার করা"—ডেটা কোথায় থাকে তার ওপর নির্ভর করে খুব ভিন্ন খরচ হয়। এই কোর্সের স্ট্রাকচার থেকে নেওয়া এই আসল খরচগুলো দেখায় কেন বাছাই গুরুত্বপূর্ণ।') },
        { table: {
          head: [l('Structure', 'স্ট্রাকচার'), l('Access by index', 'ইনডেক্সে অ্যাক্সেস'), l('Search by value', 'মান দিয়ে সার্চ'), l('Insert in middle / front', 'মাঝে / সামনে ইনসার্ট')],
          rows: [
            [l('Array', 'Array'), l('O(1)', 'O(1)'), l('O(n)', 'O(n)'), l('O(n)', 'O(n)')],
            [l('Linked list', 'Linked list'), l('O(n)', 'O(n)'), l('O(n)', 'O(n)'), l('O(1) at a known node', 'জানা node-এ O(1)')],
            [l('Hash table', 'Hash table'), l('n/a (no order)', 'প্রযোজ্য নয় (ক্রম নেই)'), l('O(1) average', 'গড়ে O(1)'), l('O(1) average', 'গড়ে O(1)')],
          ],
        } },
        { p: l('None of these is "the best." An array wins for reading by position; a hash table wins for lookup by key; a linked list wins for cheap splicing at a known spot. The winner depends entirely on which operation you do most.', 'এদের কোনোটিই "সেরা" নয়। অবস্থান দিয়ে পড়ায় array জেতে; কী দিয়ে লুকআপে hash table জেতে; জানা জায়গায় সস্তা স্প্লাইসিংয়ে linked list জেতে। বিজয়ী পুরোপুরি নির্ভর করে আপনি কোন অপারেশন সবচেয়ে বেশি করেন তার ওপর।') },
      ],
    },
    {
      h: l('When and where to use this thinking', 'কখন ও কোথায় এই চিন্তা ব্যবহার করবেন'),
      blocks: [
        { p: l('Use structure-first thinking whenever performance or scale could matter: data that grows with users, a loop that runs on every request, or code inside a hot path. For a throwaway script over a handful of items, almost any structure is fine — reach for the simplest one and move on. The skill is knowing which situation you are in.', 'পারফরম্যান্স বা স্কেল গুরুত্বপূর্ণ হতে পারে এমন যেকোনো সময় স্ট্রাকচার-আগে চিন্তা ব্যবহার করুন: ব্যবহারকারীর সঙ্গে বাড়া ডেটা, প্রতি রিকোয়েস্টে চলা একটি লুপ, বা হট পাথের ভেতরের কোড। কয়েকটি আইটেমের ফেলে-দেওয়া স্ক্রিপ্টে প্রায় যেকোনো স্ট্রাকচারই ঠিক আছে—সবচেয়ে সরলটি নিন ও এগিয়ে যান। দক্ষতা হলো আপনি কোন পরিস্থিতিতে আছেন তা জানা।') },
        { list: [
          l('Reading by position a lot, rarely inserting in the middle → array.', 'অবস্থান দিয়ে অনেক পড়া, মাঝে কম ইনসার্ট → array।'),
          l('Looking things up by a key → hash table.', 'কী দিয়ে জিনিস খোঁজা → hash table।'),
          l('Constant inserts and removes at known positions → linked list.', 'জানা অবস্থানে নিয়মিত ইনসার্ট ও রিমুভ → linked list।'),
          l('Always needing the most-recent or most-urgent item → stack, queue, or heap.', 'সবসময় সাম্প্রতিক বা সবচেয়ে জরুরি আইটেম দরকার → stack, queue বা heap।'),
        ] },
      ],
    },
    {
      h: l('Common mistakes', 'সাধারণ ভুল'),
      blocks: [
        { list: [
          l('Reaching for a fancy structure before knowing which operations actually dominate. Profile or reason about the hot path first; a plain array often beats a clever tree in practice.', 'কোন অপারেশন আসলে প্রধান তা না জেনেই জটিল স্ট্রাকচার বেছে নেওয়া। আগে হট পাথ নিয়ে ভাবুন বা প্রোফাইল করুন; বাস্তবে সাধারণ array প্রায়ই চতুর tree-কে হারায়।'),
          l('Forgetting that making one operation fast usually makes another slower — there is no free lunch, only trade-offs.', 'ভুলে যাওয়া যে একটি অপারেশন দ্রুত করলে সাধারণত অন্যটি ধীর হয়—বিনামূল্যে কিছু নেই, শুধু ট্রেড-অফ।'),
          l('Memorizing code without understanding the cost, so you cannot tell why it is slow when the input grows.', 'খরচ না বুঝে কোড মুখস্থ করা, ফলে ইনপুট বাড়লে কেন ধীর তা বলতে পারেন না।'),
          l('Optimizing constant factors before fixing an algorithm that is fundamentally the wrong shape for the data.', 'ডেটার জন্য মৌলিকভাবে ভুল আকারের অ্যালগরিদম ঠিক করার আগেই ধ্রুবক ফ্যাক্টর অপটিমাইজ করা।'),
        ] },
      ],
    },
    {
      h: l('Remember in one line', 'এক লাইনে মনে রাখুন'),
      blocks: [
        { list: [
          l('Data structure = how data is organized; algorithm = the recipe that runs on it. They are chosen together.', 'ডেটা স্ট্রাকচার = ডেটা কীভাবে সাজানো; অ্যালগরিদম = তার ওপর চলা রেসিপি। এদের একসঙ্গে বাছা হয়।'),
          l('Pick the structure from the operations you repeat most, then an algorithm that fits it.', 'সবচেয়ে বেশি যে অপারেশন করেন তা থেকে স্ট্রাকচার বাছুন, তারপর তার সঙ্গে মানানসই অ্যালগরিদম।'),
          l('The right structure makes some operations fast but usually makes others slower — always a trade-off.', 'সঠিক স্ট্রাকচার কিছু অপারেশন দ্রুত করে তবে সাধারণত অন্যগুলো ধীর করে—সবসময় একটি ট্রেড-অফ।'),
        ] },
      ],
    },
  ],

  // ── dsa-bigo · Big-O & complexity analysis ────────────────────────────────
  'dsa-bigo': [
    {
      h: l('What is Big-O?', 'বিগ-ও কী?'),
      blocks: [
        { p: l('Big-O notation describes how the running time or memory of an algorithm grows as the input grows, ignoring constant factors and lower-order terms. It answers one question: if the input doubles, does the work stay the same, double, quadruple, or explode? That growth rate — not the exact seconds on your laptop — is what tells you whether an algorithm will survive real-world data.', 'বিগ-ও নোটেশন বর্ণনা করে ইনপুট বাড়লে একটি অ্যালগরিদমের চলার সময় বা মেমরি কীভাবে বাড়ে—ধ্রুবক ফ্যাক্টর ও নিম্ন-ক্রমের পদ বাদ দিয়ে। এটি একটি প্রশ্নের উত্তর দেয়: ইনপুট দ্বিগুণ হলে কাজ কি একই থাকে, দ্বিগুণ হয়, চারগুণ হয়, নাকি বিস্ফোরিত হয়? সেই বৃদ্ধির হার—আপনার ল্যাপটপের ঠিক সেকেন্ড নয়—বলে দেয় অ্যালগরিদমটি বাস্তব ডেটায় টিকবে কি না।') },
        { p: l('The problem Big-O solves is fair comparison. Machine speed, language, and compiler all change how many seconds a program takes, so raw timing cannot compare two algorithms honestly. Big-O strips all of that away and keeps only how the cost scales with input size n. That makes it a machine-independent, future-proof way to say "this approach will get slow, that one will not."', 'বিগ-ও যে সমস্যা সমাধান করে তা হলো ন্যায্য তুলনা। মেশিনের গতি, ভাষা ও কম্পাইলার সবই একটি প্রোগ্রামে কত সেকেন্ড লাগে তা বদলায়, তাই কাঁচা সময় দিয়ে দুটি অ্যালগরিদম সৎভাবে তুলনা করা যায় না। বিগ-ও এসব সরিয়ে শুধু ইনপুট আকার n-এর সঙ্গে খরচ কীভাবে বাড়ে তা রাখে। এতে এটি মেশিন-নিরপেক্ষ, ভবিষ্যৎ-প্রুফ উপায় হয়ে বলে "এই পথ ধীর হবে, ওটা হবে না।"') },
        { note: l('Big-O is like comparing two routes by how they scale with distance, not by today’s traffic on one trip. A shortcut that is quick today but jams solid as the city grows is a worse route than a highway that stays steady — even if the highway loses a single quiet-morning race.', 'বিগ-ও দুটি পথকে দূরত্ব বাড়লে কীভাবে বাড়ে তা দিয়ে তুলনা করার মতো, একটি যাত্রার আজকের ট্রাফিক দিয়ে নয়। আজ দ্রুত কিন্তু শহর বাড়লে জ্যাম হয়ে যাওয়া একটি শর্টকাট, স্থির থাকা একটি হাইওয়ের চেয়ে খারাপ পথ—হাইওয়ে একটি নিরিবিলি-সকালের দৌড়ে হারলেও।'), kind: 'tip' },
      ],
    },
    {
      h: l('How to work out an algorithm’s Big-O', 'একটি অ্যালগরিদমের বিগ-ও কীভাবে বের করবেন'),
      blocks: [
        { steps: [
          l('Count the work in terms of the input size n — how many times the basic operation runs.', 'ইনপুট আকার n-এর সাপেক্ষে কাজ গুনুন—মৌলিক অপারেশন কতবার চলে।'),
          l('A single loop over n items is O(n); a loop nested inside another over the same n is O(n²).', 'n আইটেমের ওপর একটি লুপ O(n); একই n-এর ওপর আরেকটির ভেতরে নেস্ট করা লুপ O(n²)।'),
          l('If each step halves the remaining data (like binary search), that is O(log n).', 'প্রতিটি ধাপ বাকি ডেটা অর্ধেক করলে (binary search-এর মতো) তা O(log n)।'),
          l('Add the pieces, then keep only the fastest-growing term and drop constants: O(n) + O(n²) + O(50) becomes O(n²).', 'অংশগুলো যোগ করুন, তারপর শুধু দ্রুততম-বৃদ্ধিমান পদ রাখুন ও ধ্রুবক ফেলে দিন: O(n) + O(n²) + O(50) হয় O(n²)।'),
        ] },
        { code: `# O(n): touches each item once
function hasZero(a):
    for x in a:            # runs n times
        if x == 0: return true
    return false

# O(n^2): a loop inside a loop over the same data
function hasDuplicate(a):
    for i in a:            # n times
        for j in a:        # n times each  ->  n * n
            if i is not j and i == j: return true
    return false`, caption: l('One loop over n is O(n); a loop inside a loop over n is O(n²). Constants and the return statements do not change the class.', 'n-এর ওপর এক লুপ O(n); n-এর ওপর লুপের ভেতরে লুপ O(n²)। ধ্রুবক ও return স্টেটমেন্ট ক্লাস বদলায় না।') },
      ],
    },
    {
      h: l('The common complexity classes', 'সাধারণ কমপ্লেক্সিটি ক্লাস'),
      blocks: [
        { p: l('These are the growth rates you will meet again and again, from fastest-growing-slowest to worst. Each step down the table gets dramatically more expensive as n grows.', 'এই বৃদ্ধির হারগুলো বারবার দেখবেন, সবচেয়ে-ধীরে-বাড়া থেকে সবচেয়ে খারাপ পর্যন্ত। n বাড়লে টেবিলের প্রতিটি ধাপ নাটকীয়ভাবে বেশি ব্যয়বহুল হয়।') },
        { table: {
          head: [l('Big-O', 'বিগ-ও'), l('Name', 'নাম'), l('Example from this course', 'এই কোর্স থেকে উদাহরণ')],
          rows: [
            [l('O(1)', 'O(1)'), l('Constant', 'ধ্রুবক'), l('Array access by index; hash table lookup (average)', 'ইনডেক্সে array অ্যাক্সেস; hash table লুকআপ (গড়)')],
            [l('O(log n)', 'O(log n)'), l('Logarithmic', 'লগারিদমিক'), l('Binary search on a sorted array', 'সাজানো array-তে binary search')],
            [l('O(n)', 'O(n)'), l('Linear', 'লিনিয়ার'), l('Scanning a list to find a value', 'একটি মান খুঁজতে লিস্ট স্ক্যান')],
            [l('O(n log n)', 'O(n log n)'), l('Linearithmic', 'লিনিয়ারিদমিক'), l('Merge sort, heap sort', 'Merge sort, heap sort')],
            [l('O(n²)', 'O(n²)'), l('Quadratic', 'কোয়াড্রাটিক'), l('Bubble sort; a loop inside a loop', 'Bubble sort; লুপের ভেতরে লুপ')],
            [l('O(2ⁿ)', 'O(2ⁿ)'), l('Exponential', 'এক্সপোনেনশিয়াল'), l('Naive recursive subsets; unpruned backtracking', 'নেইভ রিকার্সিভ subset; প্রুন-না-করা backtracking')],
          ],
        } },
      ],
    },
    {
      h: l('Best, average, and worst case', 'বেস্ট, গড় ও ওয়ার্স্ট কেস'),
      blocks: [
        { p: l('The same algorithm can have different costs depending on the input. Linear search finds the target on the first try in the best case (O(1)) but scans everything in the worst case (O(n)). Quick sort averages O(n log n) but degrades to O(n²) on an unlucky pivot. When people say "Big-O" they usually mean the worst case, because that is the guarantee — the promise that it will never be slower than this.', 'একই অ্যালগরিদমের খরচ ইনপুটের ওপর নির্ভর করে ভিন্ন হতে পারে। লিনিয়ার সার্চ বেস্ট কেসে প্রথম চেষ্টায় টার্গেট পায় (O(1)) কিন্তু ওয়ার্স্ট কেসে সব স্ক্যান করে (O(n))। কুইক সর্ট গড়ে O(n log n) কিন্তু দুর্ভাগ্যজনক pivot-এ O(n²)-এ নামে। মানুষ "বিগ-ও" বললে সাধারণত ওয়ার্স্ট কেস বোঝায়, কারণ সেটাই গ্যারান্টি—প্রতিশ্রুতি যে এর চেয়ে ধীর কখনো হবে না।') },
        { note: l('Reporting only the best case is a classic trap: an algorithm that is O(1) "if you are lucky" but O(n) when you are not will still break the system on the unlucky requests. Design for the worst case that actually happens under load.', 'শুধু বেস্ট কেস বলা একটি ক্লাসিক ফাঁদ: "ভাগ্য ভালো হলে" O(1) কিন্তু নাহলে O(n) এমন অ্যালগরিদম দুর্ভাগ্যজনক রিকোয়েস্টে সিস্টেম ভাঙবেই। লোডে আসলে যে ওয়ার্স্ট কেস ঘটে তার জন্য ডিজাইন করুন।'), kind: 'warn' },
      ],
    },
    {
      h: l('When and where Big-O matters', 'কখন ও কোথায় বিগ-ও গুরুত্বপূর্ণ'),
      blocks: [
        { p: l('Use Big-O whenever the input can grow: server code handling more users, a data pipeline processing more records, or any loop on a hot path. It is the first thing to reason about before writing code, and the first thing an interviewer asks about after you write it. But remember its blind spot — Big-O ignores constants, so on small inputs a "worse" O(n²) algorithm with tiny overhead can beat a "better" O(n log n) one whose constants are large. Insertion sort beating merge sort on ten items is exactly this.', 'ইনপুট বাড়তে পারে এমন যেকোনো সময় বিগ-ও ব্যবহার করুন: বেশি ব্যবহারকারী সামলানো সার্ভার কোড, বেশি রেকর্ড প্রসেস করা ডেটা পাইপলাইন, বা হট পাথের যেকোনো লুপ। কোড লেখার আগে এটিই প্রথম যা নিয়ে ভাবতে হয়, আর লেখার পর ইন্টারভিউয়ার প্রথম যা জিজ্ঞাসা করে। তবে এর অন্ধ-বিন্দু মনে রাখুন—বিগ-ও ধ্রুবক উপেক্ষা করে, তাই ছোট ইনপুটে ক্ষুদ্র ওভারহেডের "খারাপ" O(n²) অ্যালগরিদম বড় ধ্রুবকের "ভালো" O(n log n)-কে হারাতে পারে। দশটি আইটেমে insertion sort merge sort-কে হারানো ঠিক এটাই।') },
      ],
    },
    {
      h: l('Common mistakes', 'সাধারণ ভুল'),
      blocks: [
        { list: [
          l('Reporting the best-case time and ignoring the worst case that actually breaks the system under load.', 'বেস্ট-কেস সময় বলা আর যে ওয়ার্স্ট-কেস লোডে আসলে সিস্টেম ভাঙে তা উপেক্ষা করা।'),
          l('Keeping constants and lower-order terms: O(2n + 5) is just O(n). Big-O is about growth, not exact counts.', 'ধ্রুবক ও নিম্ন-ক্রমের পদ রাখা: O(2n + 5) আসলে O(n)। বিগ-ও বৃদ্ধি নিয়ে, ঠিক গণনা নিয়ে নয়।'),
          l('Trusting a lower Big-O on small inputs, where constant factors dominate and the "slower" algorithm actually wins.', 'ছোট ইনপুটে কম বিগ-ও-তে ভরসা করা, যেখানে ধ্রুবক ফ্যাক্টর প্রাধান্য পায় ও "ধীর" অ্যালগরিদম আসলে জেতে।'),
          l('Forgetting hidden costs: a nested library call or a sort inside your loop can raise the true complexity above what the visible loops suggest.', 'লুকানো খরচ ভুলে যাওয়া: আপনার লুপের ভেতরে একটি নেস্টেড লাইব্রেরি কল বা sort দৃশ্যমান লুপের ইঙ্গিতের চেয়ে আসল জটিলতা বাড়াতে পারে।'),
        ] },
      ],
    },
    {
      h: l('Remember in one line', 'এক লাইনে মনে রাখুন'),
      blocks: [
        { list: [
          l('Big-O = how cost grows with input size n, ignoring constants; count loops, keep the fastest-growing term.', 'বিগ-ও = ইনপুট আকার n-এর সঙ্গে খরচ কীভাবে বাড়ে, ধ্রুবক বাদ দিয়ে; লুপ গুনুন, দ্রুততম-বৃদ্ধিমান পদ রাখুন।'),
          l('Design for the worst case, not the best; that is the guarantee you can rely on.', 'বেস্ট নয়, ওয়ার্স্ট কেসের জন্য ডিজাইন করুন; সেটাই আপনার নির্ভরযোগ্য গ্যারান্টি।'),
          l('On small inputs, constants can beat a better Big-O — the asymptotic winner is not always the fastest.', 'ছোট ইনপুটে ধ্রুবক ভালো বিগ-ও-কে হারাতে পারে—অ্যাসিম্পটোটিক বিজয়ী সবসময় দ্রুততম নয়।'),
        ] },
      ],
    },
  ],

  // ── dsa-recursion · Recursion & the call stack ────────────────────────────
  'dsa-recursion': [
    {
      h: l('What is recursion?', 'রিকার্শন কী?'),
      blocks: [
        { p: l('Recursion is when a function solves a problem by calling itself on a smaller version of the same problem, until it reaches a case small enough to answer directly. That direct, non-recursive case is the base case, and it is what stops the process. Every recursive solution has two parts: a base case that halts, and a recursive case that shrinks the input and calls itself again.', 'রিকার্শন হলো যখন একটি ফাংশন একই সমস্যার ছোট সংস্করণে নিজেকে ডেকে সমস্যা সমাধান করে, যতক্ষণ না এমন ছোট কেসে পৌঁছায় যার উত্তর সরাসরি দেওয়া যায়। সেই সরাসরি, নন-রিকার্সিভ কেসই base case, আর এটিই প্রক্রিয়া থামায়। প্রতিটি রিকার্সিভ সমাধানের দুটি অংশ: একটি base case যা থামে, আর একটি recursive case যা ইনপুট ছোট করে নিজেকে আবার ডাকে।') },
        { p: l('The problem recursion solves is naturally self-similar structure. Some problems contain smaller copies of themselves — a folder holds folders, a tree node holds subtrees, a sorted merge combines two smaller sorted merges. For these, a loop can feel awkward while recursion mirrors the shape of the problem almost exactly, making the code shorter and clearer. The mental shift is to trust the recursive call: assume it already returns the correct answer for the smaller input, and just describe how to combine that answer with the current step.', 'রিকার্শন যে সমস্যা সমাধান করে তা হলো স্বভাবতই স্ব-সদৃশ গঠন। কিছু সমস্যা নিজেদের ছোট কপি ধারণ করে—একটি ফোল্ডারে ফোল্ডার থাকে, একটি tree node-এ subtree থাকে, একটি সাজানো merge দুটি ছোট সাজানো merge মেলায়। এদের জন্য একটি লুপ অস্বস্তিকর লাগতে পারে, যেখানে রিকার্শন সমস্যার আকার প্রায় হুবহু প্রতিফলিত করে, কোড ছোট ও পরিষ্কার করে। মানসিক পরিবর্তনটি হলো রিকার্সিভ কলকে বিশ্বাস করা: ধরে নিন এটি ছোট ইনপুটের জন্য ইতিমধ্যে সঠিক উত্তর দেয়, আর শুধু বর্ণনা করুন সেই উত্তরকে বর্তমান ধাপের সঙ্গে কীভাবে মেলাবেন।') },
        { note: l('Recursion is like a set of Russian nesting dolls: you open one doll to find a smaller, identical doll inside, and you keep opening until you reach the tiny solid one that cannot open — the base case. Each doll is the same problem, just smaller.', 'রিকার্শন রাশিয়ান নেস্টিং পুতুলের সেটের মতো: একটি পুতুল খুললে ভেতরে একই রকম ছোট পুতুল মেলে, আর খুলতেই থাকেন যতক্ষণ না সেই ক্ষুদ্র নিরেট পুতুলে পৌঁছান যা খোলে না—base case। প্রতিটি পুতুল একই সমস্যা, শুধু ছোট।'), kind: 'tip' },
      ],
    },
    {
      h: l('How it works: the call stack', 'কীভাবে কাজ করে: কল স্ট্যাক'),
      blocks: [
        { p: l('Every time a function calls itself, the computer pauses the current call and pushes a new frame onto the call stack — a record holding that call’s arguments and where to return. The calls pile up until the base case returns a real value; then the stack unwinds, each paused call resuming with the answer from the one below it. Understanding this stack is the key to understanding recursion.', 'প্রতিবার একটি ফাংশন নিজেকে ডাকলে, কম্পিউটার বর্তমান কলটি থামিয়ে call stack-এ একটি নতুন frame পুশ করে—সেই কলের আর্গুমেন্ট ও কোথায় ফিরতে হবে তার রেকর্ড। base case একটি আসল মান ফেরত না দেওয়া পর্যন্ত কল জমতে থাকে; তারপর stack খুলে যায়, প্রতিটি থামানো কল নিচেরটির উত্তর নিয়ে আবার শুরু হয়। এই stack বোঝাই রিকার্শন বোঝার চাবি।') },
        { steps: [
          l('The function is called; if the input satisfies the base case, it returns an answer immediately — no further calls.', 'ফাংশন কল হয়; ইনপুট base case মেটালে সঙ্গে সঙ্গে উত্তর ফেরত দেয়—আর কোনো কল নয়।'),
          l('Otherwise it does a small piece of work and calls itself on a smaller input; the current call pauses on the stack.', 'নাহলে এটি একটু কাজ করে ও ছোট ইনপুটে নিজেকে ডাকে; বর্তমান কল stack-এ থামে।'),
          l('This repeats, stacking frames, until a call finally hits the base case.', 'এটি চলতে থাকে, frame জমিয়ে, যতক্ষণ না একটি কল অবশেষে base case-এ পৌঁছায়।'),
          l('The base case returns; the stack unwinds top to bottom, each frame combining its work with the returned value until the original call produces the final answer.', 'base case ফেরত দেয়; stack ওপর থেকে নিচে খুলে যায়, প্রতিটি frame নিজের কাজ ফেরত-আসা মানের সঙ্গে মিলিয়ে যায় যতক্ষণ না মূল কল চূড়ান্ত উত্তর দেয়।'),
        ] },
        { code: `# factorial(n) = n * (n-1) * ... * 1
function factorial(n):
    if n <= 1:              # base case: stops the recursion
        return 1
    return n * factorial(n - 1)   # recursive case: smaller input

# call stack for factorial(3):
#   factorial(3) waits on 3 * factorial(2)
#     factorial(2) waits on 2 * factorial(1)
#       factorial(1) -> 1        (base case, returns)
#     factorial(2) -> 2 * 1 = 2
#   factorial(3) -> 3 * 2 = 6`, caption: l('The calls stack up going down, then unwind going up. Without the n <= 1 base case, it would call itself forever.', 'কলগুলো নিচে নামার সময় জমে, তারপর ওপরে ওঠার সময় খোলে। n <= 1 base case ছাড়া এটি চিরকাল নিজেকে ডাকত।') },
      ],
    },
    {
      h: l('Recursion vs iteration', 'রিকার্শন বনাম ইটারেশন'),
      blocks: [
        { p: l('Anything you can do with recursion you can also do with a loop, and vice versa. The difference is not power but memory and clarity. Recursion uses call-stack space that a loop does not, but for self-similar problems it can be far easier to read and write.', 'রিকার্শন দিয়ে যা করা যায় তা লুপ দিয়েও করা যায়, উল্টোটাও। পার্থক্য ক্ষমতায় নয়, মেমরি ও স্পষ্টতায়। রিকার্শন এমন call-stack স্পেস ব্যবহার করে যা লুপ করে না, তবে স্ব-সদৃশ সমস্যায় এটি পড়া ও লেখা অনেক সহজ হতে পারে।') },
        { table: {
          head: [l('Aspect', 'দিক'), l('Recursion', 'রিকার্শন'), l('Iteration (loop)', 'ইটারেশন (লুপ)')],
          rows: [
            [l('Extra memory', 'অতিরিক্ত মেমরি'), l('O(depth) on the call stack', 'call stack-এ O(depth)'), l('O(1) — no stack frames', 'O(1)—কোনো stack frame নেই')],
            [l('Readability for self-similar problems', 'স্ব-সদৃশ সমস্যায় পঠনযোগ্যতা'), l('Often clearer, mirrors the structure', 'প্রায়ই পরিষ্কার, গঠন প্রতিফলিত করে'), l('Can get tangled', 'জটিল হয়ে যেতে পারে')],
            [l('Risk', 'ঝুঁকি'), l('Stack overflow if too deep', 'বেশি গভীর হলে stack overflow'), l('No stack-overflow risk', 'stack-overflow ঝুঁকি নেই')],
            [l('Best fit', 'সবচেয়ে মানানসই'), l('Trees, divide-and-conquer, backtracking', 'tree, divide-and-conquer, backtracking'), l('Simple linear passes', 'সরল লিনিয়ার পাস')],
          ],
        } },
        { p: l('Because the call stack grows with the depth of recursion, a very deep recursion (say a million nested calls) can exhaust the stack and crash. Deep, linear recursions are often better written as loops; naturally branching problems like trees are better left recursive.', 'call stack রিকার্শনের গভীরতার সঙ্গে বাড়ে বলে খুব গভীর রিকার্শন (ধরুন দশ লক্ষ নেস্টেড কল) stack শেষ করে ক্র্যাশ করতে পারে। গভীর, লিনিয়ার রিকার্শন প্রায়ই লুপ হিসেবে লেখা ভালো; tree-র মতো স্বভাবতই শাখাযুক্ত সমস্যা রিকার্সিভ রাখাই ভালো।') },
      ],
    },
    {
      h: l('When and where to use recursion', 'কখন ও কোথায় রিকার্শন ব্যবহার করবেন'),
      blocks: [
        { list: [
          l('Tree and graph traversals — each node’s children are themselves smaller trees.', 'tree ও graph ট্রাভার্সাল—প্রতিটি node-এর child নিজেই ছোট tree।'),
          l('Divide-and-conquer algorithms like merge sort and quick sort that split a problem in half.', 'merge sort ও quick sort-এর মতো divide-and-conquer অ্যালগরিদম যা সমস্যা অর্ধেক করে।'),
          l('Backtracking problems — permutations, N-Queens, subsets — where you explore and undo choices.', 'backtracking সমস্যা—permutation, N-Queens, subset—যেখানে পছন্দ অন্বেষণ ও আনডু করেন।'),
          l('Nested or self-similar data such as file systems, JSON, and nested comments.', 'নেস্টেড বা স্ব-সদৃশ ডেটা যেমন file system, JSON ও নেস্টেড কমেন্ট।'),
          l('Prefer a loop for simple linear counting or summing, and when recursion depth could be huge.', 'সরল লিনিয়ার গণনা বা যোগে লুপ নিন, আর যখন রিকার্শন গভীরতা বিশাল হতে পারে তখনও।'),
        ] },
      ],
    },
    {
      h: l('Common mistakes', 'সাধারণ ভুল'),
      blocks: [
        { list: [
          l('Forgetting the base case entirely, so the function calls itself forever and overflows the stack.', 'base case পুরোপুরি ভুলে যাওয়া, ফলে ফাংশন চিরকাল নিজেকে ডাকে ও stack overflow করে।'),
          l('Having a base case but never actually moving toward it — not shrinking the input on each call — which also overflows.', 'base case থাকা তবু কখনো তার দিকে না এগোনো—প্রতি কলে ইনপুট ছোট না করা—যা-ও overflow করে।'),
          l('Ignoring the hidden memory cost: deep recursion is not "free," it consumes stack space proportional to its depth.', 'লুকানো মেমরি খরচ উপেক্ষা করা: গভীর রিকার্শন "বিনামূল্যে" নয়, এটি গভীরতার সমানুপাতিক stack স্পেস খায়।'),
          l('Recomputing the same subproblem exponentially (naive Fibonacci) instead of memoizing the results.', 'ফলাফল memoize না করে একই subproblem এক্সপোনেনশিয়ালভাবে বারবার হিসাব করা (নেইভ Fibonacci)।'),
        ] },
      ],
    },
    {
      h: l('Remember in one line', 'এক লাইনে মনে রাখুন'),
      blocks: [
        { list: [
          l('Recursion = a function calling itself on a smaller input until a base case stops it.', 'রিকার্শন = একটি ফাংশন ছোট ইনপুটে নিজেকে ডাকে যতক্ষণ না base case তা থামায়।'),
          l('Always define a correct base case first, then make every call shrink the input toward it.', 'সবসময় আগে সঠিক base case ঠিক করুন, তারপর প্রতিটি কল ইনপুটকে তার দিকে ছোট করুক।'),
          l('It is often clearer than a loop, but the call stack costs O(depth) memory and can overflow.', 'এটি প্রায়ই লুপের চেয়ে পরিষ্কার, তবে call stack O(depth) মেমরি খরচ করে ও overflow করতে পারে।'),
        ] },
      ],
    },
  ],

  // ── dsa-arrays · Arrays & strings ─────────────────────────────────────────
  'dsa-arrays': [
    {
      h: l('What is an array?', 'অ্যারে কী?'),
      blocks: [
        { p: l('An array stores its elements in contiguous memory — one right after another in a single unbroken block. Because the elements are the same size and sit side by side, the computer can jump straight to any element by computing its address from the index in a single step. This is what gives arrays their signature power: instant, O(1) access by position. A string is just an array of characters, so everything here applies to strings too.', 'অ্যারে তার উপাদানগুলো contiguous মেমরিতে রাখে—একটি অবিচ্ছিন্ন ব্লকে একটির পর একটি। উপাদানগুলো একই আকারের ও পাশাপাশি বসে বলে কম্পিউটার ইনডেক্স থেকে ঠিকানা হিসাব করে এক ধাপেই যেকোনো উপাদানে সরাসরি লাফ দিতে পারে। এটাই অ্যারেকে তার স্বাক্ষর ক্ষমতা দেয়: অবস্থান দিয়ে তাৎক্ষণিক, O(1) অ্যাক্সেস। একটি string শুধু অক্ষরের array, তাই এখানকার সব string-এও প্রযোজ্য।') },
        { p: l('The problem arrays solve is fast, predictable reads of indexed data. When you have a list of things and you frequently need "the item at position i," nothing beats an array. The cost of that layout shows up elsewhere: because everything is packed tightly, inserting or deleting in the middle forces every later element to shift over to keep the block contiguous.', 'অ্যারে যে সমস্যা সমাধান করে তা হলো ইনডেক্সড ডেটার দ্রুত, পূর্বানুমেয় পড়া। যখন আপনার কাছে জিনিসের একটি তালিকা আছে ও ঘন ঘন "অবস্থান i-এর আইটেম" দরকার, তখন অ্যারেকে হারানো যায় না। সেই লেআউটের খরচ অন্যত্র দেখা যায়: সব শক্তভাবে গোছানো বলে মাঝে ইনসার্ট বা ডিলিট করলে ব্লক contiguous রাখতে পরের প্রতিটি উপাদানকে সরে যেতে হয়।') },
        { note: l('Picture a row of numbered lockers. You can walk straight to locker 42 without touching the others — that is O(1) index access. But to squeeze a new locker in between 20 and 21, you must shift every locker from 21 onward down by one — that is the O(n) middle insert.', 'সারিতে নম্বরযুক্ত লকার ভাবুন। অন্যগুলো না ছুঁয়ে সরাসরি ৪২ নম্বর লকারে যেতে পারেন—এটি O(1) ইনডেক্স অ্যাক্সেস। কিন্তু ২০ ও ২১-এর মাঝে একটি নতুন লকার ঢোকাতে হলে ২১ থেকে পরের প্রতিটি লকার এক করে সরাতে হবে—এটাই O(n) মাঝ-ইনসার্ট।'), kind: 'tip' },
      ],
    },
    {
      h: l('How array operations work', 'অ্যারে অপারেশন কীভাবে কাজ করে'),
      blocks: [
        { p: l('Access is pure arithmetic: the address of element i is the base address plus i times the element size, computed instantly. Insertion and deletion in the middle are the opposite — they are dominated by the shifting of every element after the target position.', 'অ্যাক্সেস বিশুদ্ধ পাটিগণিত: উপাদান i-এর ঠিকানা হলো base ঠিকানা যোগ i গুণ উপাদান-আকার, তাৎক্ষণিক হিসাব করা। মাঝে ইনসার্ট ও ডিলিট উল্টো—টার্গেট অবস্থানের পরের প্রতিটি উপাদান সরানোই এতে প্রধান।') },
        { steps: [
          l('To read index i: compute its address in one step and return the value — no scanning, O(1).', 'ইনডেক্স i পড়তে: এক ধাপে ঠিকানা হিসাব করে মান ফেরত দিন—কোনো স্ক্যান নেই, O(1)।'),
          l('To append at the end: place the value in the next free slot — O(1) when there is spare capacity.', 'শেষে append করতে: পরের ফাঁকা স্লটে মান রাখুন—অতিরিক্ত ক্যাপাসিটি থাকলে O(1)।'),
          l('To insert at position i: shift every element from the end down to i one step right, then place the new value — O(n).', 'অবস্থান i-তে ইনসার্ট করতে: শেষ থেকে i পর্যন্ত প্রতিটি উপাদান এক ধাপ ডানে সরান, তারপর নতুন মান রাখুন—O(n)।'),
          l('To delete at position i: shift every later element one step left to close the gap — O(n).', 'অবস্থান i-তে ডিলিট করতে: ফাঁক বন্ধ করতে পরের প্রতিটি উপাদান এক ধাপ বামে সরান—O(n)।'),
        ] },
        { code: `# insert value v at index i in an array of length n
function insertAt(a, i, v):
    a.length = a.length + 1
    j = a.length - 1
    while j > i:              # shift the tail right by one
        a[j] = a[j - 1]       # this loop is the O(n) cost
        j = j - 1
    a[i] = v                  # now the slot is free

# access is the easy one -- no loop at all
function get(a, i):
    return a[i]               # O(1): direct address arithmetic`, caption: l('Access has no loop (O(1)); a middle insert must shift the tail, so its loop makes it O(n).', 'অ্যাক্সেসে কোনো লুপ নেই (O(1)); মাঝ-ইনসার্টকে tail সরাতে হয়, তাই এর লুপ একে O(n) করে।') },
      ],
    },
    {
      h: l('Complexity', 'কমপ্লেক্সিটি'),
      blocks: [
        { p: l('These are the operation costs for an array. Notice the sharp split: reading by index is constant, but anything that disturbs the middle is linear.', 'এগুলো একটি অ্যারের অপারেশন খরচ। তীক্ষ্ণ বিভাজন লক্ষ করুন: ইনডেক্সে পড়া ধ্রুবক, তবে মাঝ নাড়ায় এমন যেকোনো কিছু লিনিয়ার।') },
        { table: {
          head: [l('Operation', 'অপারেশন'), l('Time', 'সময়')],
          rows: [
            [l('Access by index', 'ইনডেক্সে অ্যাক্সেস'), l('O(1)', 'O(1)')],
            [l('Search (by value)', 'সার্চ (মান দিয়ে)'), l('O(n)', 'O(n)')],
            [l('Insert / delete at end', 'শেষে ইনসার্ট / ডিলিট'), l('O(1)*', 'O(1)*')],
            [l('Insert / delete in middle', 'মাঝে ইনসার্ট / ডিলিট'), l('O(n)', 'O(n)')],
          ],
        } },
        { note: l('The star on end-insert means amortized O(1): a dynamic array occasionally fills up and must allocate a bigger block and copy everything over — an O(n) resize — but this happens so rarely that the average cost per append is still constant.', 'end-insert-এর তারকা মানে amortized O(1): একটি dynamic array মাঝে মাঝে ভরে যায় ও একটি বড় ব্লক বরাদ্দ করে সব কপি করতে হয়—একটি O(n) resize—তবে এটি এত কদাচিৎ ঘটে যে প্রতি append-এর গড় খরচ এখনো ধ্রুবক।'), kind: 'tip' },
      ],
    },
    {
      h: l('When and where to use an array', 'কখন ও কোথায় অ্যারে ব্যবহার করবেন'),
      blocks: [
        { p: l('Reach for an array when you read by index a lot and rarely insert or delete in the middle. Because the elements sit together in memory, arrays are also cache-friendly: scanning one is fast because the CPU loads neighbouring elements together. That makes arrays the default choice for lists you iterate over, lookup tables, matrices, buffers, and the characters of a string. In most languages the dynamic array — Python’s list, JavaScript’s array, Java’s ArrayList — is exactly this structure, which is why it is the workhorse you reach for by default.', 'যখন ইনডেক্স দিয়ে অনেক পড়েন ও মাঝে কম ইনসার্ট/ডিলিট করেন তখন অ্যারে নিন। উপাদানগুলো মেমরিতে একসঙ্গে বসে বলে অ্যারে cache-বান্ধবও: একটি স্ক্যান করা দ্রুত কারণ CPU প্রতিবেশী উপাদান একসঙ্গে লোড করে। এতে অ্যারে হয় iterate করা তালিকা, lookup table, matrix, buffer ও string-এর অক্ষরের জন্য ডিফল্ট পছন্দ। বেশিরভাগ ভাষায় dynamic array—Python-এর list, JavaScript-এর array, Java-র ArrayList—ঠিক এই স্ট্রাকচার, এ কারণেই এটি ডিফল্টভাবে নেওয়া প্রধান হাতিয়ার।') },
        { p: l('Choose something else when your workload is dominated by inserts and deletes in the middle or at the front — that is where a linked list’s O(1) splicing wins. And if your main operation is "find by key" rather than "find by position," a hash table beats a raw array’s O(n) search.', 'অন্য কিছু বাছুন যখন আপনার কাজ মাঝে বা সামনে ইনসার্ট ও ডিলিটে প্রধান—সেখানে linked list-এর O(1) স্প্লাইসিং জেতে। আর যদি আপনার মূল অপারেশন "অবস্থান দিয়ে খোঁজা" নয় বরং "কী দিয়ে খোঁজা" হয়, তবে hash table কাঁচা অ্যারের O(n) সার্চকে হারায়।') },
      ],
    },
    {
      h: l('Common mistakes', 'সাধারণ ভুল'),
      blocks: [
        { list: [
          l('Treating an array like a list and inserting at the front inside a hot loop — every front insert is O(n), so the loop silently becomes O(n²).', 'অ্যারেকে list-এর মতো ধরে হট লুপের ভেতরে সামনে ইনসার্ট করা—প্রতিটি front insert O(n), তাই লুপ নীরবে O(n²) হয়ে যায়।'),
          l('Repeatedly searching an unsorted array by value (O(n) each) when a hash table would give O(1) lookups.', 'একটি অসাজানো অ্যারেতে বারবার মান দিয়ে সার্চ করা (প্রতিটি O(n)) যেখানে hash table O(1) লুকআপ দিত।'),
          l('Forgetting that a resize copies the whole array; growing one element at a time in a tight loop can trigger many reallocations — reserve capacity up front if you know the size.', 'ভুলে যাওয়া যে resize পুরো অ্যারে কপি করে; কড়া লুপে একবারে এক উপাদান বাড়ালে অনেক reallocation হতে পারে—আকার জানলে আগেই ক্যাপাসিটি রিজার্ভ করুন।'),
          l('Reading or writing out of bounds — index errors and, in low-level languages, memory corruption.', 'সীমার বাইরে পড়া বা লেখা—ইনডেক্স ত্রুটি এবং নিম্ন-স্তরের ভাষায় মেমরি corruption।'),
        ] },
      ],
    },
    {
      h: l('Remember in one line', 'এক লাইনে মনে রাখুন'),
      blocks: [
        { list: [
          l('Arrays store elements contiguously, giving O(1) index access but O(n) middle inserts and deletes.', 'অ্যারে উপাদান contiguous রাখে—O(1) ইনডেক্স অ্যাক্সেস কিন্তু O(n) মাঝ-ইনসার্ট ও ডিলিট।'),
          l('Use them when you read by position often and rarely reshuffle the middle.', 'যখন অবস্থান দিয়ে প্রায়ই পড়েন ও মাঝ কম নাড়েন তখন এগুলো ব্যবহার করুন।'),
          l('Contiguous layout is cache-friendly and fast, but front/middle inserts and resizes cost O(n).', 'contiguous লেআউট cache-বান্ধব ও দ্রুত, তবে front/middle ইনসার্ট ও resize O(n) খরচ।'),
        ] },
      ],
    },
  ],

  // ── dsa-linked-list · Linked lists ────────────────────────────────────────
  'dsa-linked-list': [
    {
      h: l('What is a linked list?', 'লিংকড লিস্ট কী?'),
      blocks: [
        { p: l('A linked list is a chain of nodes, where each node holds a value and a pointer to the next node. Unlike an array, the nodes are not stored side by side in memory — they can live anywhere, connected only by their pointers. To find the nth element you must start at the head and follow the pointers one by one; there is no jumping straight to a position. In exchange, once you are holding a node, inserting or removing next to it is instant.', 'লিংকড লিস্ট হলো node-এর একটি শৃঙ্খল, যেখানে প্রতিটি node একটি মান ও পরের node-এর দিকে একটি pointer ধারণ করে। অ্যারের বিপরীতে, node-গুলো মেমরিতে পাশাপাশি রাখা হয় না—এরা যেকোনো জায়গায় থাকতে পারে, শুধু pointer দিয়ে যুক্ত। n-তম উপাদান পেতে হলে head থেকে শুরু করে একে একে pointer অনুসরণ করতে হয়; কোনো অবস্থানে সরাসরি লাফ নেই। বিনিময়ে, একটি node ধরে থাকলে তার পাশে ইনসার্ট বা রিমুভ করা তাৎক্ষণিক।') },
        { p: l('The problem linked lists solve is cheap insertion and deletion. In an array, adding an element in the middle shifts everything after it (O(n)); in a linked list you just rewire a couple of pointers (O(1)) once you are at the spot. The trade-off is that you lose the array’s instant random access — the two structures are almost mirror images of each other.', 'লিংকড লিস্ট যে সমস্যা সমাধান করে তা হলো সস্তা ইনসার্ট ও ডিলিট। একটি অ্যারেতে মাঝে একটি উপাদান যোগ করলে তার পরের সব সরে যায় (O(n)); লিংকড লিস্টে জায়গায় পৌঁছালে শুধু কয়েকটি pointer পুনরায় জুড়ে দেন (O(1))। ট্রেড-অফ হলো আপনি অ্যারের তাৎক্ষণিক random access হারান—দুটি স্ট্রাকচার প্রায় একে অপরের আয়না-প্রতিবিম্ব।') },
        { note: l('A linked list is like a treasure hunt: each clue points to where the next clue is. To reach the fifth clue you must follow the first four in order. But to add a new stop in the middle, you only rewrite two clues — the one before it and the new one — and everything else stays put.', 'লিংকড লিস্ট গুপ্তধন খোঁজার মতো: প্রতিটি সূত্র পরের সূত্র কোথায় তা দেখায়। পঞ্চম সূত্রে পৌঁছাতে হলে প্রথম চারটি ক্রমে অনুসরণ করতে হয়। কিন্তু মাঝে একটি নতুন স্টপ যোগ করতে শুধু দুটি সূত্র বদলান—আগেরটি ও নতুনটি—আর বাকি সব যেমন আছে থাকে।'), kind: 'tip' },
      ],
    },
    {
      h: l('How insertion and traversal work', 'ইনসার্ট ও ট্রাভার্সাল কীভাবে কাজ করে'),
      blocks: [
        { p: l('The core operation is rewiring pointers. To insert a new node after a node you already hold, you point the new node at whatever came next, then point the current node at the new node — two assignments, no shifting. Traversal, by contrast, is a walk from the head following next pointers until you reach what you want.', 'মূল অপারেশন হলো pointer পুনরায় জোড়া। আপনার ধরা একটি node-এর পরে একটি নতুন node ইনসার্ট করতে, নতুন node-কে যা পরে ছিল তার দিকে নির্দেশ করান, তারপর বর্তমান node-কে নতুন node-এর দিকে নির্দেশ করান—দুটি অ্যাসাইনমেন্ট, কোনো শিফট নেই। ট্রাভার্সাল বিপরীতে head থেকে next pointer অনুসরণ করে হাঁটা, যতক্ষণ না চাওয়া জিনিসে পৌঁছান।') },
        { steps: [
          l('To insert after a known node cur: set newNode.next to cur.next, then set cur.next to newNode — O(1).', 'জানা node cur-এর পরে ইনসার্ট করতে: newNode.next-কে cur.next করুন, তারপর cur.next-কে newNode করুন—O(1)।'),
          l('To delete the node after cur: set cur.next to cur.next.next, unlinking it — O(1).', 'cur-এর পরের node ডিলিট করতে: cur.next-কে cur.next.next করুন, তা খুলে যায়—O(1)।'),
          l('To access index i: start at head and follow next i times — O(n), because there is no direct addressing.', 'ইনডেক্স i অ্যাক্সেস করতে: head থেকে শুরু করে i বার next অনুসরণ করুন—O(n), কারণ সরাসরি ঠিকানা নেই।'),
          l('To search for a value: walk from the head comparing each node until found or the list ends — O(n).', 'একটি মান সার্চ করতে: head থেকে হেঁটে প্রতিটি node তুলনা করুন, না পাওয়া বা লিস্ট শেষ পর্যন্ত—O(n)।'),
        ] },
        { code: `# node has two fields: value and next

# insert v right after the node 'cur' -- O(1)
function insertAfter(cur, v):
    newNode = Node(v)
    newNode.next = cur.next     # new node points to the rest
    cur.next = newNode          # cur now points to new node

# find the value at index i -- O(n), no shortcut
function get(head, i):
    node = head
    steps = 0
    while node != null and steps < i:
        node = node.next        # must walk one link at a time
        steps = steps + 1
    return node.value`, caption: l('Insertion at a known node is two pointer writes (O(1)); reaching an index means walking the chain (O(n)).', 'জানা node-এ ইনসার্ট দুটি pointer লেখা (O(1)); একটি ইনডেক্সে পৌঁছানো মানে শৃঙ্খল ধরে হাঁটা (O(n))।') },
      ],
    },
    {
      h: l('Complexity: linked list vs array', 'কমপ্লেক্সিটি: লিংকড লিস্ট বনাম অ্যারে'),
      blocks: [
        { p: l('The clearest way to understand a linked list is to place its costs next to an array’s. They are almost exact opposites — each one is fast exactly where the other is slow.', 'লিংকড লিস্ট বোঝার সবচেয়ে পরিষ্কার উপায় হলো এর খরচ অ্যারের পাশে রাখা। এরা প্রায় হুবহু বিপরীত—একটি ঠিক সেখানে দ্রুত যেখানে অন্যটি ধীর।') },
        { table: {
          head: [l('Operation', 'অপারেশন'), l('Linked list', 'লিংকড লিস্ট'), l('Array', 'অ্যারে')],
          rows: [
            [l('Access by index', 'ইনডেক্সে অ্যাক্সেস'), l('O(n)', 'O(n)'), l('O(1)', 'O(1)')],
            [l('Search by value', 'মান দিয়ে সার্চ'), l('O(n)', 'O(n)'), l('O(n)', 'O(n)')],
            [l('Insert / delete at head', 'হেডে ইনসার্ট / ডিলিট'), l('O(1)', 'O(1)'), l('O(n)', 'O(n)')],
            [l('Insert / delete at a known node', 'জানা নোডে ইনসার্ট / ডিলিট'), l('O(1)', 'O(1)'), l('O(n)', 'O(n)')],
          ],
        } },
        { note: l('The catch: those O(1) inserts assume you are already holding the node. If you first have to search or walk to that position, you pay O(n) to get there — so the win is real only when you already have the reference (for example, the head, or a node you just visited).', 'ধরা: সেই O(1) ইনসার্টগুলো ধরে নেয় আপনি ইতিমধ্যে node-টি ধরে আছেন। সেই অবস্থানে পৌঁছাতে আগে সার্চ বা হাঁটতে হলে সেখানে যেতে O(n) দিতে হয়—তাই জয় বাস্তব শুধু তখনই যখন রেফারেন্স ইতিমধ্যে আছে (যেমন head, বা এইমাত্র দেখা একটি node)।'), kind: 'warn' },
      ],
    },
    {
      h: l('When and where to use a linked list', 'কখন ও কোথায় লিংকড লিস্ট ব্যবহার করবেন'),
      blocks: [
        { p: l('Reach for a linked list when you insert or remove at known positions — especially the front — far more often than you index into the middle. Because a new node can be linked in without moving anything else, linked lists shine as the backbone of queues, stacks, and other structures where elements constantly arrive and leave at the ends. They also never need a costly resize-and-copy the way a dynamic array does.', 'ইনডেক্সের চেয়ে জানা অবস্থানে—বিশেষত সামনে—অনেক বেশি ইনসার্ট বা রিমুভ করলে লিংকড লিস্ট নিন। কিছু না সরিয়ে একটি নতুন node জোড়া যায় বলে queue, stack ও প্রান্তে উপাদান নিয়মিত আসা-যাওয়া করা অন্য স্ট্রাকচারের মেরুদণ্ড হিসেবে লিংকড লিস্ট ভালো। এদের dynamic array-র মতো ব্যয়বহুল resize-and-copy কখনো লাগে না।') },
        { p: l('Prefer an array when you need random access by index, when you iterate a lot (arrays are cache-friendly and linked lists are not, because their nodes are scattered across memory), or when memory is tight — every node carries an extra pointer, and following those pointers causes cache misses that make traversal slower in practice than the same walk over an array.', 'অ্যারে নিন যখন ইনডেক্সে random access দরকার, যখন অনেক iterate করেন (অ্যারে cache-বান্ধব, লিংকড লিস্ট নয়, কারণ এদের node মেমরিজুড়ে ছড়ানো), বা যখন মেমরি কম—প্রতিটি node একটি অতিরিক্ত pointer বহন করে, আর সেই pointer অনুসরণে cache miss হয় যা বাস্তবে ট্রাভার্সালকে একই অ্যারে-হাঁটার চেয়ে ধীর করে।') },
      ],
    },
    {
      h: l('Common mistakes', 'সাধারণ ভুল'),
      blocks: [
        { list: [
          l('Using a linked list for index-heavy access, then scanning from the head every time — turning what feels like a[i] into a hidden O(n) walk on every lookup.', 'ইনডেক্স-হেভি অ্যাক্সেসে লিংকড লিস্ট ব্যবহার করে প্রতিবার head থেকে স্ক্যান করা—যা a[i]-এর মতো মনে হয় তা প্রতি লুকআপে লুকানো O(n) হাঁটায় পরিণত করা।'),
          l('Assuming inserts are O(1) even when you must first search for the position — locating the node is O(n), only the rewiring is O(1).', 'ইনসার্ট O(1) ধরে নেওয়া যখন অবস্থান আগে সার্চ করতে হয়—node খোঁজা O(n), শুধু পুনরায়-জোড়া O(1)।'),
          l('Losing the rest of the list by reassigning a pointer in the wrong order — always link the new node to the tail before you overwrite the old link.', 'ভুল ক্রমে pointer পুনর্নির্ধারণ করে বাকি লিস্ট হারানো—পুরনো link overwrite করার আগে সবসময় নতুন node-কে tail-এ জোড়ুন।'),
          l('Ignoring the extra memory and poor cache locality: for small values, the per-node pointer overhead can dwarf the data itself.', 'অতিরিক্ত মেমরি ও দুর্বল cache locality উপেক্ষা করা: ছোট মানে প্রতি-node pointer ওভারহেড ডেটার চেয়েও বড় হতে পারে।'),
        ] },
      ],
    },
    {
      h: l('Remember in one line', 'এক লাইনে মনে রাখুন'),
      blocks: [
        { list: [
          l('A linked list chains nodes by pointers: O(1) insert/delete at a known node, but O(n) access and search.', 'লিংকড লিস্ট pointer দিয়ে node যুক্ত করে: জানা node-এ O(1) ইনসার্ট/ডিলিট, তবে O(n) অ্যাক্সেস ও সার্চ।'),
          l('It is the mirror image of an array — fast where the array is slow, and slow where the array is fast.', 'এটি অ্যারের আয়না-প্রতিবিম্ব—অ্যারে যেখানে ধীর সেখানে দ্রুত, অ্যারে যেখানে দ্রুত সেখানে ধীর।'),
          l('Cheap splicing costs extra pointer memory and poor cache locality; use it when inserts beat index access.', 'সস্তা স্প্লাইসিং অতিরিক্ত pointer মেমরি ও দুর্বল cache locality খরচ করে; ইনসার্ট যখন ইনডেক্স অ্যাক্সেসকে হারায় তখন ব্যবহার করুন।'),
        ] },
      ],
    },
  ],
}
