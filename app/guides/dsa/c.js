// Deep, bilingual (English / Bangla) teaching guides for DSA sorting & tree topics.
// Each guide is an array of sections; each section = { h, blocks }.
// Block types: { p }, { list }, { steps }, { table:{head,rows} }, { note, kind }, { code, caption }.
// Facts (complexities, behaviour) mirror app/courses/dsa.js — do not diverge from them.

const l = (en, bn) => ({ en, bn })

export default {
  // ── Merge sort ────────────────────────────────────────────────────────────
  'dsa-merge-sort': [
    {
      h: l('What is merge sort?', 'মার্জ সর্ট কী?'),
      blocks: [
        { p: l('Merge sort is a sorting algorithm that splits the array in half, sorts each half, and then merges the two sorted halves back together. It is the classic example of the divide-and-conquer strategy: a big problem you cannot solve directly is broken into smaller copies of the same problem until each copy is trivial, and then the small answers are combined into the full answer.', 'মার্জ সর্ট এমন একটি সর্টিং অ্যালগরিদম যা অ্যারেকে অর্ধেক করে, প্রতিটি অর্ধেক আলাদাভাবে সাজায়, তারপর দুটি সাজানো অর্ধেককে আবার একত্র (merge) করে। এটি divide-and-conquer কৌশলের ক্লাসিক উদাহরণ: যে বড় সমস্যা সরাসরি সমাধান করা যায় না তাকে একই সমস্যার ছোট কপিতে ভাঙা হয়, যতক্ষণ না প্রতিটি কপি একদম সহজ হয়, তারপর ছোট উত্তরগুলো জুড়ে পুরো উত্তর বানানো হয়।') },
        { p: l('The problem it solves is that simple sorts like bubble or insertion sort compare nearly every pair of elements, costing O(n squared) time — unusable when n is large. Merge sort guarantees O(n log n) time in every case, so it stays fast even on huge inputs and never suffers a bad-luck slowdown.', 'এটি যে সমস্যা সমাধান করে তা হলো: বাবল বা ইনসার্শন সর্টের মতো সরল পদ্ধতি প্রায় প্রতিটি জোড়া উপাদান তুলনা করে, খরচ O(n squared)—n বড় হলে অকেজো। মার্জ সর্ট প্রতিটি ক্ষেত্রে নিশ্চিত O(n log n) সময় দেয়, তাই বিশাল ইনপুটেও দ্রুত থাকে এবং কখনো দুর্ভাগ্যজনক ধীরগতিতে পড়ে না।') },
        { note: l('Picture two already-sorted stacks of papers on your desk. To combine them, you keep comparing the two top sheets and taking whichever is smaller. Each step is one glance and one move, and the merged stack comes out perfectly sorted. That merge of two sorted piles is the whole trick behind merge sort.', 'ভাবুন আপনার টেবিলে দুটি ইতিমধ্যে সাজানো কাগজের স্তূপ আছে। এদের একত্র করতে আপনি বারবার দুটি ওপরের শিট তুলনা করেন ও যেটি ছোট সেটি নেন। প্রতিটি ধাপ একটি দেখা ও একটি নড়াচড়া, আর মিলিত স্তূপটি নিখুঁতভাবে সাজানো বের হয়। দুটি সাজানো স্তূপের সেই merge-ই মার্জ সর্টের পুরো কৌশল।'), kind: 'tip' },
      ],
    },
    {
      h: l('How merge sort works', 'মার্জ সর্ট কীভাবে কাজ করে'),
      blocks: [
        { p: l('There are two phases: splitting on the way down, and merging on the way back up. The splitting does no real sorting — the actual ordering all happens inside the merge step.', 'দুটি ধাপ আছে: নিচে নামার পথে ভাগ করা, আর ওপরে ফেরার পথে merge করা। ভাগ করা আসলে কোনো সর্ট করে না—আসল সাজানো পুরোটাই merge ধাপের ভেতরে ঘটে।') },
        { steps: [
          l('If the array has 0 or 1 element, it is already sorted — return it as-is. This is the base case that stops the recursion.', 'অ্যারেতে ০ বা ১টি উপাদান থাকলে তা আগে থেকেই সাজানো—যেমন আছে ফেরত দিন। এটাই বেস কেস যা রিকার্শন থামায়।'),
          l('Otherwise find the middle index and split the array into a left half and a right half.', 'নইলে মাঝের ইনডেক্স বের করুন ও অ্যারেকে একটি বাম অর্ধেক ও একটি ডান অর্ধেকে ভাগ করুন।'),
          l('Recursively merge-sort the left half, then recursively merge-sort the right half. Each recursive call splits again, until every piece is a single element.', 'রিকার্সিভভাবে বাম অর্ধেক মার্জ-সর্ট করুন, তারপর রিকার্সিভভাবে ডান অর্ধেক। প্রতিটি রিকার্সিভ কল আবার ভাগ করে, যতক্ষণ না প্রতিটি টুকরো একটিমাত্র উপাদান হয়।'),
          l('Now merge the two sorted halves: compare their front elements and repeatedly copy the smaller one into a result array.', 'এখন দুটি সাজানো অর্ধেক merge করুন: এদের সামনের উপাদান তুলনা করে বারবার ছোটটি একটি result অ্যারেতে কপি করুন।'),
          l('When one half runs out, copy the rest of the other half over. The result is one fully sorted array, which is returned up to the caller.', 'একটি অর্ধেক শেষ হলে, অন্য অর্ধেকের বাকিটা কপি করুন। ফল একটি সম্পূর্ণ সাজানো অ্যারে, যা কলারের কাছে ফেরত যায়।'),
        ] },
        { code: `function mergeSort(arr):
  if length(arr) <= 1:
    return arr                 // base case: already sorted

  mid   = length(arr) / 2
  left  = mergeSort(arr[0 .. mid-1])
  right = mergeSort(arr[mid .. end])
  return merge(left, right)    // combine two sorted halves

function merge(left, right):
  result = []
  i = 0; j = 0
  while i < length(left) and j < length(right):
    if left[i] <= right[j]:    // <= (not <) keeps equal keys stable
      append left[i] to result; i = i + 1
    else:
      append right[j] to result; j = j + 1
  append any leftover items from left, then from right
  return result`, caption: l('The whole array is split log n times (each split halves it), and each of those levels does O(n) work to merge — that is where O(n log n) comes from.', 'পুরো অ্যারে log n বার ভাগ হয় (প্রতিটি ভাগ অর্ধেক করে), আর সেই প্রতিটি স্তরে merge করতে O(n) কাজ লাগে—সেখান থেকেই O(n log n) আসে।') },
      ],
    },
    {
      h: l('The merge step is the heart of it', 'merge ধাপই এর মূল'),
      blocks: [
        { p: l('Merging two sorted lists into one is fast because each list is already ordered: the smallest remaining item is always at the front of one of the two lists. You never have to look further than the two front elements, so merging n total items takes exactly O(n) comparisons — one linear pass.', 'দুটি সাজানো লিস্টকে একটিতে merge করা দ্রুত, কারণ প্রতিটি লিস্ট আগে থেকেই সাজানো: সবচেয়ে ছোট বাকি উপাদান সবসময় দুটি লিস্টের একটির সামনে থাকে। দুটি সামনের উপাদানের বেশি কখনো দেখতে হয় না, তাই মোট n উপাদান merge করতে ঠিক O(n) তুলনা লাগে—একটি লিনিয়ার পাস।') },
        { p: l('Using <= rather than < when the two fronts are equal makes merge sort stable: elements that compare equal keep their original relative order. That property matters when you sort records by one field but want ties to stay in their earlier order (for example, sort by date, keeping same-date rows in input order).', 'দুটি সামনের উপাদান সমান হলে < নয় বরং <= ব্যবহার করা মার্জ সর্টকে stable করে: সমান তুলনা হওয়া উপাদানগুলো তাদের মূল আপেক্ষিক ক্রম রাখে। এই ধর্ম তখন গুরুত্বপূর্ণ যখন আপনি এক ফিল্ড দিয়ে রেকর্ড সাজান কিন্তু চান টাই আগের ক্রমে থাকুক (যেমন তারিখ দিয়ে সাজানো, একই-তারিখের সারি ইনপুট-ক্রমে রেখে)।') },
      ],
    },
    {
      h: l('Complexity', 'জটিলতা'),
      blocks: [
        { table: {
          head: [l('Measure', 'পরিমাপ'), l('Cost', 'খরচ'), l('Why', 'কেন')],
          rows: [
            [l('Best / average / worst time', 'বেস্ট / গড় / ওয়ার্স্ট সময়'), l('O(n log n)', 'O(n log n)'), l('log n levels of splitting, O(n) merge work per level — no input can make it worse.', 'log n স্তর ভাগ, প্রতি স্তরে O(n) merge কাজ—কোনো ইনপুট একে খারাপ করতে পারে না।')],
            [l('Space', 'স্পেস'), l('O(n)', 'O(n)'), l('It needs an extra array of size n to hold merged output.', 'merge করা আউটপুট রাখতে size n-এর একটি অতিরিক্ত অ্যারে লাগে।')],
            [l('Stable?', 'স্থিতিশীল?'), l('Yes', 'হ্যাঁ'), l('Equal keys keep their original order (thanks to the <= tie-break).', 'সমান কী মূল ক্রম রাখে (<= টাই-ব্রেকের কারণে)।')],
          ],
        } },
        { note: l('Notice the worst case is the same as the best case — O(n log n) always. This predictability is merge sort’s biggest selling point over quick sort, whose worst case is O(n squared).', 'লক্ষ করুন ওয়ার্স্ট কেস বেস্ট কেসের সমান—সবসময় O(n log n)। এই পূর্বানুমেয়তা কুইক সর্টের ওপর মার্জ সর্টের সবচেয়ে বড় সুবিধা, যার ওয়ার্স্ট কেস O(n squared)।'), kind: 'tip' },
      ],
    },
    {
      h: l('When and where to use it', 'কখন ও কোথায় ব্যবহার করবেন'),
      blocks: [
        { p: l('Choose merge sort when you need stable, predictable sorting, or when you are sorting a linked list. For linked lists it is often the best choice: merging just relinks nodes, so it needs no random access and no extra array, sidestepping its usual space cost.', 'যখন আপনার stable, পূর্বানুমেয় সর্ট দরকার, বা যখন আপনি একটি linked list সাজাচ্ছেন তখন মার্জ সর্ট নিন। linked list-এর জন্য এটি প্রায়ই সেরা পছন্দ: merge শুধু node পুনরায় লিংক করে, তাই random access বা অতিরিক্ত অ্যারে লাগে না, স্বাভাবিক স্পেস খরচ এড়িয়ে যায়।') },
        { list: [
          l('Pick merge sort over quick sort when the worst case must stay O(n log n) — for example on adversarial or untrusted input.', 'কুইক সর্টের বদলে মার্জ সর্ট নিন যখন ওয়ার্স্ট কেস O(n log n) থাকতেই হবে—যেমন প্রতিকূল বা অবিশ্বস্ত ইনপুটে।'),
          l('Pick it when stability matters: you are sorting by a secondary key and must preserve the primary order of equal elements.', 'stability দরকার হলে নিন: আপনি একটি secondary key দিয়ে সাজাচ্ছেন ও সমান উপাদানের primary ক্রম রাখতেই হবে।'),
          l('It underlies external sorting — sorting data too big for memory — because merging streams from disk is natural.', 'এটি external sorting-এর ভিত্তি—মেমরিতে না-আঁটা ডেটা সাজানো—কারণ disk থেকে stream merge করা স্বাভাবিক।'),
          l('Prefer quick sort or heap sort instead when memory is tight, since merge sort’s O(n) extra array can be a dealbreaker.', 'মেমরি কড়া হলে বরং কুইক সর্ট বা হিপ সর্ট নিন, কারণ মার্জ সর্টের O(n) অতিরিক্ত অ্যারে সমস্যা হতে পারে।'),
        ] },
      ],
    },
    {
      h: l('Common mistakes', 'সাধারণ ভুল'),
      blocks: [
        { list: [
          l('Ignoring the extra memory it allocates. Merge sort needs O(n) additional space; under tight space limits this can be the reason it is the wrong choice.', 'এর বরাদ্দ করা অতিরিক্ত মেমরি উপেক্ষা করা। মার্জ সর্টের O(n) বাড়তি স্পেস লাগে; কড়া স্পেস সীমায় এটাই একে ভুল পছন্দ করার কারণ হতে পারে।'),
          l('Allocating a brand-new array inside every merge call instead of reusing one buffer, which multiplies the memory churn.', 'একটি buffer পুনঃব্যবহারের বদলে প্রতিটি merge কলে একদম নতুন অ্যারে বরাদ্দ করা, যা মেমরি অপচয় বাড়ায়।'),
          l('Using < instead of <= in the merge comparison, which quietly breaks stability without changing the sorted result.', 'merge তুলনায় <= এর বদলে < ব্যবহার করা, যা সাজানো ফল না বদলেই নীরবে stability ভাঙে।'),
          l('Forgetting to copy the leftover tail of the non-empty half after the main merge loop ends, dropping elements.', 'মূল merge লুপ শেষে খালি-না-হওয়া অর্ধেকের বাকি লেজ কপি করতে ভুলে যাওয়া, ফলে উপাদান হারানো।'),
        ] },
      ],
    },
    {
      h: l('Remember in one line', 'এক লাইনে মনে রাখুন'),
      blocks: [
        { list: [
          l('Split in half, sort each half, merge — guaranteed O(n log n) in every case.', 'অর্ধেক করুন, প্রতিটি অর্ধেক সাজান, merge করুন—প্রতিটি ক্ষেত্রে নিশ্চিত O(n log n)।'),
          l('It is stable but needs O(n) extra memory; that trade is its defining feature.', 'এটি stable কিন্তু O(n) অতিরিক্ত মেমরি লাগে; সেই ট্রেড-অফই এর মূল বৈশিষ্ট্য।'),
          l('Reach for it for stability, predictable timing, and sorting linked lists.', 'stability, পূর্বানুমেয় সময় ও linked list সাজাতে এটি নিন।'),
        ] },
      ],
    },
  ],

  // ── Quick sort ────────────────────────────────────────────────────────────
  'dsa-quick-sort': [
    {
      h: l('What is quick sort?', 'কুইক সর্ট কী?'),
      blocks: [
        { p: l('Quick sort is a divide-and-conquer sorting algorithm that picks one element as a pivot, partitions the array so that everything smaller than the pivot ends up on its left and everything larger on its right, and then recursively sorts the two sides. On average it runs in O(n log n) and, crucially, it sorts in place — it rearranges the array itself instead of building a separate copy.', 'কুইক সর্ট একটি divide-and-conquer সর্টিং অ্যালগরিদম যা একটি উপাদানকে pivot হিসেবে বাছে, অ্যারেকে এমনভাবে partition করে যাতে pivot-এর চেয়ে ছোট সব বামে ও বড় সব ডানে পড়ে, তারপর দুই পাশ রিকার্সিভভাবে সাজায়। গড়ে এটি O(n log n)-এ চলে এবং গুরুত্বপূর্ণভাবে in-place সাজায়—আলাদা কপি না বানিয়ে অ্যারেকেই পুনর্বিন্যাস করে।') },
        { p: l('The key difference from merge sort is where the work happens. Merge sort does its ordering while combining halves; quick sort does its ordering while splitting, inside the partition step. Because it needs no big auxiliary array and touches memory in a cache-friendly way, quick sort is usually the fastest general-purpose sort in practice — which is why most standard-library sorts are built on a quick-sort variant.', 'মার্জ সর্ট থেকে মূল পার্থক্য হলো কাজটা কোথায় ঘটে। মার্জ সর্ট অর্ধেক জোড়ার সময় সাজায়; কুইক সর্ট ভাগ করার সময়, partition ধাপের ভেতরে সাজায়। বড় auxiliary অ্যারে লাগে না ও cache-বান্ধবভাবে মেমরি ছোঁয় বলে বাস্তবে কুইক সর্ট সাধারণত দ্রুততম সাধারণ-উদ্দেশ্য সর্ট—এ কারণেই বেশিরভাগ standard-library সর্ট কুইক-সর্ট ভ্যারিয়েন্টে তৈরি।') },
        { note: l('Imagine organizing a crowd by height. You pick one person as a reference (the pivot), tell everyone shorter to stand on the left and everyone taller on the right. Now that person is in their final spot, and you repeat the same trick on the left group and the right group until everyone is ordered.', 'ভাবুন একটি ভিড়কে উচ্চতায় সাজাচ্ছেন। আপনি একজনকে রেফারেন্স হিসেবে বাছেন (pivot), সবাইকে বলেন খাটোরা বামে দাঁড়াও ও লম্বারা ডানে। এখন সেই ব্যক্তি তার চূড়ান্ত জায়গায়, আর আপনি একই কৌশল বাম দল ও ডান দলে পুনরাবৃত্তি করেন যতক্ষণ না সবাই সাজানো হয়।'), kind: 'tip' },
      ],
    },
    {
      h: l('How quick sort works', 'কুইক সর্ট কীভাবে কাজ করে'),
      blocks: [
        { steps: [
          l('If the range has 0 or 1 element, it is already sorted — stop. This is the base case.', 'রেঞ্জে ০ বা ১টি উপাদান থাকলে তা আগে থেকেই সাজানো—থামুন। এটাই বেস কেস।'),
          l('Choose a pivot element from the range (a good implementation randomizes this choice).', 'রেঞ্জ থেকে একটি pivot উপাদান বাছুন (ভালো implementation এই বাছাই randomize করে)।'),
          l('Partition: walk through the range and move every element smaller than the pivot to the left region, larger to the right.', 'Partition: রেঞ্জ ধরে হাঁটুন ও pivot-এর চেয়ে ছোট প্রতিটি উপাদান বাম অঞ্চলে, বড়টি ডানে সরান।'),
          l('Swap the pivot into the boundary between the two regions. The pivot is now in its final sorted position and never moves again.', 'দুই অঞ্চলের সীমানায় pivot অদলবদল করুন। pivot এখন তার চূড়ান্ত সাজানো অবস্থানে ও আর কখনো নড়ে না।'),
          l('Recursively quick-sort the left part (before the pivot) and the right part (after the pivot).', 'রিকার্সিভভাবে বাম অংশ (pivot-এর আগে) ও ডান অংশ (pivot-এর পরে) কুইক-সর্ট করুন।'),
        ] },
        { code: `function quickSort(arr, lo, hi):
  if lo >= hi:
    return                       // 0 or 1 element: already sorted

  p = partition(arr, lo, hi)     // p = pivot's final index
  quickSort(arr, lo, p - 1)      // sort the smaller-than-pivot side
  quickSort(arr, p + 1, hi)      // sort the larger-than-pivot side

function partition(arr, lo, hi):
  pivot = arr[hi]                // pick a pivot (randomize in practice)
  i = lo                         // boundary of the "smaller" region
  for j from lo to hi - 1:
    if arr[j] < pivot:
      swap arr[i], arr[j]
      i = i + 1
  swap arr[i], arr[hi]           // drop pivot into its sorted place
  return i`, caption: l('Each partition pass is O(n). If the pivot splits the range roughly in half each time, there are log n levels, giving O(n log n).', 'প্রতিটি partition পাস O(n)। pivot যদি প্রতিবার রেঞ্জকে মোটামুটি অর্ধেক ভাগ করে, তবে log n স্তর হয়, দেয় O(n log n)।') },
      ],
    },
    {
      h: l('Why the pivot decides everything', 'কেন pivot-ই সব ঠিক করে'),
      blocks: [
        { p: l('Quick sort’s speed lives and dies by the pivot. A good pivot splits the range into two roughly equal halves, so the recursion is only about log n deep and the total work is O(n log n). A bad pivot — say the smallest or largest element — puts everything on one side, so each call only shaves off one element. That makes the recursion n levels deep and the work O(n squared): the exact same cost as bubble sort.', 'কুইক সর্টের গতি pivot-এর ওপর নির্ভর করে বাঁচে ও মরে। ভালো pivot রেঞ্জকে দুটি মোটামুটি সমান অর্ধেকে ভাগ করে, তাই রিকার্শন প্রায় log n গভীর ও মোট কাজ O(n log n)। খারাপ pivot—ধরুন সবচেয়ে ছোট বা বড় উপাদান—সব এক পাশে ফেলে, তাই প্রতিটি কল মাত্র একটি উপাদান কমায়। এতে রিকার্শন n স্তর গভীর ও কাজ O(n squared): বাবল সর্টের ঠিক সমান খরচ।') },
        { p: l('The classic trap: always taking the first (or last) element as the pivot. On data that is already sorted — a very common real-world case — that pivot is always the extreme value, triggering the O(n squared) worst case exactly when you least expect it. The fix is to randomize the pivot or use the median-of-three (first, middle, last) so no single input order can reliably defeat it.', 'ক্লাসিক ফাঁদ: সবসময় প্রথম (বা শেষ) উপাদানকে pivot নেওয়া। আগে থেকে সাজানো ডেটায়—খুব সাধারণ বাস্তব ক্ষেত্র—সেই pivot সবসময় চরম মান, ঠিক যখন আশা করেন না তখনই O(n squared) ওয়ার্স্ট কেস ঘটায়। সমাধান: pivot randomize করুন বা median-of-three (প্রথম, মাঝ, শেষ) নিন, যাতে কোনো একটি ইনপুট-ক্রম নিশ্চিতভাবে একে হারাতে না পারে।') },
      ],
    },
    {
      h: l('Complexity', 'জটিলতা'),
      blocks: [
        { table: {
          head: [l('Measure', 'পরিমাপ'), l('Cost', 'খরচ'), l('Why', 'কেন')],
          rows: [
            [l('Average time', 'গড় সময়'), l('O(n log n)', 'O(n log n)'), l('A balanced pivot gives log n levels of O(n) partitioning.', 'ভারসাম্যপূর্ণ pivot O(n) partition-এর log n স্তর দেয়।')],
            [l('Worst-case time', 'ওয়ার্স্ট-কেস সময়'), l('O(n squared)', 'O(n squared)'), l('A consistently bad pivot peels off one element per call — n levels.', 'ধারাবাহিক খারাপ pivot প্রতি কলে একটি উপাদান তোলে—n স্তর।')],
            [l('Space', 'স্পেস'), l('O(log n)', 'O(log n)'), l('In-place; the only extra memory is the recursion stack of depth log n.', 'In-place; একমাত্র অতিরিক্ত মেমরি হলো log n গভীরতার রিকার্শন স্ট্যাক।')],
          ],
        } },
        { note: l('Quick sort is NOT stable in its usual in-place form — equal keys can be reordered by the swaps. If you need stability, use merge sort instead.', 'কুইক সর্ট তার স্বাভাবিক in-place রূপে stable নয়—swap সমান কী-কে এলোমেলো করতে পারে। stability দরকার হলে বরং মার্জ সর্ট নিন।'), kind: 'warn' },
      ],
    },
    {
      h: l('When and where to use it', 'কখন ও কোথায় ব্যবহার করবেন'),
      blocks: [
        { p: l('Reach for quick sort as your default in-memory sort when average speed and low memory use matter and you do not need stability. It beats merge sort in practice because it sorts in place (only O(log n) stack space versus O(n)) and its sequential access is kind to the CPU cache.', 'গড় গতি ও কম মেমরি ব্যবহার গুরুত্বপূর্ণ এবং stability দরকার না হলে ইন-মেমরি সর্টের ডিফল্ট হিসেবে কুইক সর্ট নিন। এটি বাস্তবে মার্জ সর্টকে হারায় কারণ in-place সাজায় (শুধু O(log n) স্ট্যাক স্পেস, O(n) নয়) এবং এর ধারাবাহিক access CPU cache-এর প্রতি সদয়।') },
        { list: [
          l('Use it for large in-memory arrays where you can tolerate a rare slow case and stability is not required.', 'বড় ইন-মেমরি অ্যারেতে ব্যবহার করুন যেখানে বিরল ধীর ক্ষেত্র সহ্য করা যায় ও stability দরকার নেই।'),
          l('Always randomize the pivot (or use median-of-three) in production so no input order forces the O(n squared) case.', 'প্রোডাকশনে সবসময় pivot randomize করুন (বা median-of-three) যাতে কোনো ইনপুট-ক্রম O(n squared) ঘটাতে না পারে।'),
          l('Prefer merge sort when you need guaranteed O(n log n) or stability; prefer heap sort when you need in-place AND a guaranteed worst case.', 'নিশ্চিত O(n log n) বা stability দরকার হলে মার্জ সর্ট নিন; in-place এবং নিশ্চিত ওয়ার্স্ট কেস দুটোই দরকার হলে হিপ সর্ট নিন।'),
          l('The same partition idea powers quickselect, which finds the k-th smallest element in average O(n) without fully sorting.', 'একই partition ধারণা quickselect চালায়, যা সম্পূর্ণ না সাজিয়েই গড়ে O(n)-এ k-তম ছোট উপাদান খুঁজে।'),
        ] },
      ],
    },
    {
      h: l('Common mistakes', 'সাধারণ ভুল'),
      blocks: [
        { list: [
          l('Always taking the first element as the pivot, which causes the O(n squared) worst case on already-sorted data — a very common real input.', 'সবসময় প্রথম উপাদানকে pivot নেওয়া, যা আগে-সাজানো ডেটায় O(n squared) ওয়ার্স্ট কেস ঘটায়—খুব সাধারণ বাস্তব ইনপুট।'),
          l('Assuming quick sort is stable. It is not; do not use it when equal elements must keep their order.', 'কুইক সর্ট stable ধরে নেওয়া। এটি নয়; সমান উপাদানের ক্রম রাখতে হলে এটি ব্যবহার করবেন না।'),
          l('Off-by-one errors in the partition bounds or recursive ranges, which corrupt the array or loop forever.', 'partition সীমা বা রিকার্সিভ রেঞ্জে off-by-one ভুল, যা অ্যারে নষ্ট করে বা চিরকাল লুপ করে।'),
          l('Ignoring worst-case depth: recursing on the larger side first on adversarial input can blow the call stack — recurse on the smaller side first, or randomize.', 'ওয়ার্স্ট-কেস গভীরতা উপেক্ষা করা: প্রতিকূল ইনপুটে বড় পাশে আগে রিকার্স করলে call stack উপচে পড়তে পারে—ছোট পাশে আগে রিকার্স করুন, বা randomize করুন।'),
        ] },
      ],
    },
    {
      h: l('Remember in one line', 'এক লাইনে মনে রাখুন'),
      blocks: [
        { list: [
          l('Partition around a pivot, recurse on both sides — average O(n log n), in place.', 'একটি pivot ঘিরে partition করুন, দুই পাশে রিকার্স করুন—গড়ে O(n log n), in-place।'),
          l('A bad pivot degrades it to O(n squared); randomize or use median-of-three to avoid that.', 'খারাপ pivot একে O(n squared)-এ নামায়; এড়াতে randomize করুন বা median-of-three নিন।'),
          l('Fast and cache-friendly but not stable — merge sort is the stable, predictable alternative.', 'দ্রুত ও cache-বান্ধব কিন্তু stable নয়—মার্জ সর্ট হলো stable, পূর্বানুমেয় বিকল্প।'),
        ] },
      ],
    },
  ],

  // ── Heap sort ─────────────────────────────────────────────────────────────
  'dsa-heap-sort': [
    {
      h: l('What is heap sort?', 'হিপ সর্ট কী?'),
      blocks: [
        { p: l('Heap sort is a sorting algorithm that first rearranges the array into a max-heap — a structure where every parent is at least as large as its children, so the biggest element sits at the very top (the root). It then repeatedly extracts that maximum, places it at the end, and rebuilds the heap on the remaining elements. It sorts in O(n log n) using only O(1) extra space, which makes it the go-to when you need a worst-case guarantee AND cannot spare extra memory.', 'হিপ সর্ট এমন একটি সর্টিং অ্যালগরিদম যা প্রথমে অ্যারেকে একটি max-heap-এ সাজায়—এমন একটি structure যেখানে প্রতিটি parent তার child-দের চেয়ে অন্তত সমান বড়, তাই সবচেয়ে বড় উপাদান একদম ওপরে (root) বসে। তারপর বারবার সেই সর্বোচ্চটি বের করে শেষে রাখে ও বাকি উপাদানে heap পুনর্গঠন করে। এটি শুধু O(1) অতিরিক্ত স্পেসে O(n log n)-এ সাজায়, যা তখন সেরা পছন্দ যখন ওয়ার্স্ট-কেস গ্যারান্টি এবং অতিরিক্ত মেমরি না-থাকা দুটোই দরকার।') },
        { p: l('A max-heap is stored not as a tree of pointers but inside the plain array itself, using index arithmetic: the children of index i live at 2i+1 and 2i+2, and the parent of i is at (i-1)/2. Because the heap lives in the same array being sorted, heap sort needs no second array — that is the source of its tiny O(1) space cost.', 'একটি max-heap pointer-এর tree হিসেবে নয়, বরং সাধারণ অ্যারের ভেতরেই index পাটিগণিত দিয়ে রাখা হয়: index i-এর child থাকে 2i+1 ও 2i+2-এ, আর i-এর parent থাকে (i-1)/2-এ। heap যেহেতু যে অ্যারে সাজানো হচ্ছে তার ভেতরেই থাকে, হিপ সর্টের দ্বিতীয় কোনো অ্যারে লাগে না—এটাই এর ক্ষুদ্র O(1) স্পেস খরচের উৎস।') },
        { note: l('Think of a tournament bracket. The champion fights their way to the top; you crown them and remove them, and the next-strongest player rises to take the top spot. Repeat, and the players come out in order of strength — that removal-and-rebuild loop is exactly heap sort.', 'একটি টুর্নামেন্ট ব্র্যাকেট ভাবুন। চ্যাম্পিয়ন লড়ে ওপরে ওঠে; আপনি তাকে মুকুট দিয়ে সরান, আর পরের-সেরা খেলোয়াড় ওপরের জায়গা নিতে ওঠে। পুনরাবৃত্তি করুন, খেলোয়াড়রা শক্তির ক্রমে বেরিয়ে আসে—সেই সরানো-ও-পুনর্গঠন লুপই ঠিক হিপ সর্ট।'), kind: 'tip' },
      ],
    },
    {
      h: l('How heap sort works', 'হিপ সর্ট কীভাবে কাজ করে'),
      blocks: [
        { steps: [
          l('Build a max-heap from the whole array. Starting from the last non-leaf node and moving up to the root, sift each node down into place. This whole build is O(n).', 'পুরো অ্যারে থেকে একটি max-heap বানান। শেষ non-leaf node থেকে শুরু করে root পর্যন্ত ওপরে গিয়ে প্রতিটি node নিচে sift করে জায়গামতো বসান। এই পুরো build O(n)।'),
          l('The root now holds the maximum. Swap it with the last element of the heap, so the biggest value lands in its final sorted position at the end.', 'root এখন সর্বোচ্চ ধরে রাখে। একে heap-এর শেষ উপাদানের সঙ্গে অদলবদল করুন, যাতে সবচেয়ে বড় মান শেষে তার চূড়ান্ত সাজানো অবস্থানে বসে।'),
          l('Shrink the heap by one (the sorted tail is now off-limits) and sift the new root down to restore the max-heap property.', 'heap এক করে ছোট করুন (সাজানো লেজ এখন নিষিদ্ধ) ও নতুন root নিচে sift করে max-heap ধর্ম ফেরান।'),
          l('Repeat the swap-and-sift until the heap has one element left. The array is now fully sorted in ascending order.', 'heap-এ একটি উপাদান বাকি থাকা পর্যন্ত swap-ও-sift পুনরাবৃত্তি করুন। অ্যারে এখন আরোহী ক্রমে সম্পূর্ণ সাজানো।'),
        ] },
        { code: `function heapSort(arr):
  n = length(arr)

  // Phase 1: build a max-heap in O(n)
  for i from n/2 - 1 down to 0:
    siftDown(arr, i, n)

  // Phase 2: pull the max out, one at a time
  for end from n - 1 down to 1:
    swap arr[0], arr[end]        // max goes to its final slot
    siftDown(arr, 0, end)        // restore heap on the shrunk range

function siftDown(arr, root, size):
  while true:
    largest = root
    left  = 2*root + 1
    right = 2*root + 2
    if left  < size and arr[left]  > arr[largest]: largest = left
    if right < size and arr[right] > arr[largest]: largest = right
    if largest == root: break     // node is in place
    swap arr[root], arr[largest]
    root = largest`, caption: l('Building the heap is O(n); each of the n extractions costs O(log n) to sift down, so the sort phase is O(n log n) overall.', 'heap বানানো O(n); n-টি extraction-এর প্রতিটিতে sift-down O(log n) খরচ, তাই সর্ট ধাপ সব মিলিয়ে O(n log n)।') },
      ],
    },
    {
      h: l('Why sift-down keeps it O(n log n)', 'কেন sift-down একে O(n log n) রাখে'),
      blocks: [
        { p: l('A heap over n elements has height about log n, because it is a complete binary tree. Sifting one element down can, at worst, travel from the root to a leaf — that is log n swaps. Since you extract the maximum n times and each extraction triggers one sift-down, the sorting phase is n times log n. Unlike quick sort, there is no pivot to get unlucky with, so the O(n log n) bound holds in the best, average, AND worst case.', 'n উপাদানের একটি heap-এর উচ্চতা প্রায় log n, কারণ এটি একটি complete binary tree। একটি উপাদান নিচে sift করলে সর্বোচ্চ ক্ষেত্রে root থেকে leaf পর্যন্ত যেতে পারে—তা log n swap। যেহেতু আপনি n বার সর্বোচ্চ extract করেন ও প্রতিটি extraction একটি sift-down ঘটায়, সর্ট ধাপ n গুণ log n। কুইক সর্টের মতো এখানে দুর্ভাগ্যজনক pivot নেই, তাই O(n log n) সীমা বেস্ট, গড় এবং ওয়ার্স্ট সব ক্ষেত্রে থাকে।') },
      ],
    },
    {
      h: l('Complexity', 'জটিলতা'),
      blocks: [
        { table: {
          head: [l('Measure', 'পরিমাপ'), l('Cost', 'খরচ'), l('Why', 'কেন')],
          rows: [
            [l('Best / average / worst time', 'বেস্ট / গড় / ওয়ার্স্ট সময়'), l('O(n log n)', 'O(n log n)'), l('n extractions, each an O(log n) sift-down — no input makes it worse.', 'n-টি extraction, প্রতিটি O(log n) sift-down—কোনো ইনপুট একে খারাপ করে না।')],
            [l('Space', 'স্পেস'), l('O(1)', 'O(1)'), l('Sorts in place inside the same array; needs no auxiliary storage.', 'একই অ্যারের ভেতরে in-place সাজায়; কোনো auxiliary storage লাগে না।')],
            [l('Stable?', 'স্থিতিশীল?'), l('No', 'না'), l('Swaps across the array can reorder equal keys.', 'অ্যারে জুড়ে swap সমান কী-কে এলোমেলো করতে পারে।')],
          ],
        } },
        { p: l('Compared with the other O(n log n) sorts: heap sort matches quick sort’s O(1)-ish space but, unlike quick sort, guarantees O(n log n) in the worst case; and it uses far less memory than merge sort’s O(n). Its cost is that it is not stable and it is slower in practice than quick sort.', 'অন্য O(n log n) সর্টের সঙ্গে তুলনায়: হিপ সর্ট কুইক সর্টের O(1)-মতো স্পেসের সমান কিন্তু কুইক সর্টের বিপরীতে ওয়ার্স্ট কেসে O(n log n) নিশ্চিত করে; আর মার্জ সর্টের O(n)-এর চেয়ে অনেক কম মেমরি ব্যবহার করে। এর খরচ হলো এটি stable নয় ও বাস্তবে কুইক সর্টের চেয়ে ধীর।') },
      ],
    },
    {
      h: l('When and where to use it', 'কখন ও কোথায় ব্যবহার করবেন'),
      blocks: [
        { p: l('Choose heap sort when you need both an in-place sort and a guaranteed O(n log n) worst case — the combination quick sort cannot promise and merge sort cannot do without O(n) memory. It is the safe choice for memory-constrained or hard-real-time systems where a surprise O(n squared) is unacceptable.', 'হিপ সর্ট নিন যখন আপনার in-place সর্ট এবং নিশ্চিত O(n log n) ওয়ার্স্ট কেস দুটোই দরকার—যে সমন্বয় কুইক সর্ট দিতে পারে না ও মার্জ সর্ট O(n) মেমরি ছাড়া পারে না। মেমরি-সীমিত বা hard-real-time সিস্টেমে যেখানে হঠাৎ O(n squared) অগ্রহণযোগ্য সেখানে এটি নিরাপদ পছন্দ।') },
        { list: [
          l('Use it when memory is tight and a guaranteed worst case matters more than raw average speed.', 'যখন মেমরি কড়া ও নিশ্চিত ওয়ার্স্ট কেস কাঁচা গড় গতির চেয়ে বেশি গুরুত্বপূর্ণ তখন এটি ব্যবহার করুন।'),
          l('The underlying heap also gives you a priority queue and an efficient top-K: you often want the heap, not the full sort.', 'অন্তর্নিহিত heap আপনাকে একটি priority queue ও দক্ষ top-K-ও দেয়: আপনি প্রায়ই পুরো সর্ট নয়, heap-টাই চান।'),
          l('Prefer quick sort when average speed and cache performance matter most and the worst case is acceptable.', 'গড় গতি ও cache পারফরম্যান্স সবচেয়ে জরুরি ও ওয়ার্স্ট কেস গ্রহণযোগ্য হলে বরং কুইক সর্ট নিন।'),
          l('Prefer merge sort when you need stability, or when sorting linked lists rather than arrays.', 'stability দরকার হলে, বা অ্যারের বদলে linked list সাজালে বরং মার্জ সর্ট নিন।'),
        ] },
      ],
    },
    {
      h: l('Common mistakes', 'সাধারণ ভুল'),
      blocks: [
        { list: [
          l('Expecting stability from heap sort. It is not stable — if equal elements must keep their input order, use merge sort.', 'হিপ সর্ট থেকে stability আশা করা। এটি stable নয়—সমান উপাদানের ইনপুট-ক্রম রাখতে হলে মার্জ সর্ট নিন।'),
          l('Expecting quick sort’s cache-friendly real-world speed. Heap sort jumps around the array (parent-to-child index leaps), hurting cache locality, so it is usually slower in wall-clock time.', 'কুইক সর্টের cache-বান্ধব বাস্তব গতি আশা করা। হিপ সর্ট অ্যারেতে লাফায় (parent-থেকে-child index লাফ), cache locality নষ্ট করে, তাই সাধারণত বাস্তব সময়ে ধীর।'),
          l('Building the heap by inserting elements one by one in O(n log n) instead of the O(n) bottom-up siftDown build.', 'O(n) bottom-up siftDown build-এর বদলে একটি একটি করে উপাদান ঢুকিয়ে O(n log n)-এ heap বানানো।'),
          l('Getting the child index arithmetic wrong (2i+1 and 2i+2) or forgetting to shrink the heap range after each extraction.', 'child index পাটিগণিত ভুল করা (2i+1 ও 2i+2) বা প্রতিটি extraction-এর পর heap রেঞ্জ ছোট করতে ভুলে যাওয়া।'),
        ] },
      ],
    },
    {
      h: l('Remember in one line', 'এক লাইনে মনে রাখুন'),
      blocks: [
        { list: [
          l('Build a max-heap, then repeatedly swap the root to the end and sift down — O(n log n), O(1) space.', 'একটি max-heap বানান, তারপর বারবার root শেষে swap করে sift down করুন—O(n log n), O(1) স্পেস।'),
          l('Guaranteed worst case AND in-place — the pair quick sort and merge sort each miss one of.', 'নিশ্চিত ওয়ার্স্ট কেস এবং in-place—যে জোড়া কুইক সর্ট ও মার্জ সর্ট প্রত্যেকে একটি করে হারায়।'),
          l('The price is no stability and poor cache locality, so it trails quick sort in practice.', 'দাম হলো stability নেই ও দুর্বল cache locality, তাই বাস্তবে কুইক সর্টের পেছনে থাকে।'),
        ] },
      ],
    },
  ],

  // ── Trees & binary trees ──────────────────────────────────────────────────
  'dsa-trees': [
    {
      h: l('What is a tree?', 'ট্রি কী?'),
      blocks: [
        { p: l('A tree is a way of organizing data as a hierarchy of nodes. One node is the root, and every other node hangs below it through parent-child links, with no cycles. A binary tree is the most common special case: each node has at most two children, usually called left and right. Trees are how you model anything that is naturally nested or branching rather than laid out in a straight line.', 'ট্রি হলো ডেটাকে node-এর একটি শ্রেণিবিন্যাস হিসেবে সাজানোর উপায়। একটি node হলো root, আর বাকি প্রতিটি node parent-child লিংক দিয়ে তার নিচে ঝোলে, কোনো cycle ছাড়া। binary tree হলো সবচেয়ে সাধারণ বিশেষ ক্ষেত্র: প্রতিটি node-এর সর্বোচ্চ দুটি child, সাধারণত left ও right বলা হয়। যা সরলরেখায় নয় বরং স্বভাবতই nested বা শাখাযুক্ত তা মডেল করতে ট্রি ব্যবহৃত হয়।') },
        { p: l('The problem trees solve is that linear structures — arrays and linked lists — force one item after another, which is a poor fit for hierarchical data. A file system, an HTML page, a company org chart, or a family tree all branch: one thing contains several things, each of which contains more. A tree captures that shape directly and lets you search, insert, and organize along the branches instead of scanning a flat list.', 'ট্রি যে সমস্যা সমাধান করে তা হলো: লিনিয়ার structure—অ্যারে ও linked list—একটির পর একটি আইটেম বসায়, যা শ্রেণিবদ্ধ ডেটার জন্য বেমানান। একটি file system, একটি HTML পেজ, কোম্পানির org chart, বা একটি বংশতালিকা সবই শাখা ছড়ায়: একটি জিনিস কয়েকটি জিনিস ধারণ করে, প্রতিটি আরও ধারণ করে। ট্রি সেই আকৃতি সরাসরি ধরে ও একটি flat লিস্ট স্ক্যান না করে শাখা ধরে খুঁজতে, ঢোকাতে ও সাজাতে দেয়।') },
        { note: l('A company org chart is a tree: the CEO is the root, each manager is a node, and their reports are children. To find someone you follow the branches down — you never read the whole company as one long list.', 'একটি কোম্পানির org chart একটি ট্রি: CEO হলো root, প্রতিটি ম্যানেজার একটি node, আর তাদের অধীনস্থরা child। কাউকে খুঁজতে আপনি শাখা ধরে নিচে নামেন—পুরো কোম্পানিকে কখনো এক লম্বা লিস্ট হিসেবে পড়েন না।'), kind: 'tip' },
      ],
    },
    {
      h: l('The vocabulary you need', 'যে শব্দভাণ্ডার লাগবে'),
      blocks: [
        { list: [
          l('Root — the single top node with no parent; every tree has exactly one.', 'Root—উপরের একমাত্র node যার parent নেই; প্রতিটি ট্রিতে ঠিক একটি।'),
          l('Parent and child — a node directly above (parent) or below (child) another along an edge.', 'Parent ও child—একটি edge ধরে অন্যটির ঠিক ওপরের (parent) বা নিচের (child) node।'),
          l('Leaf — a node with no children; the tips of the branches.', 'Leaf—child ছাড়া node; শাখার ডগা।'),
          l('Height — the length of the longest path from the root down to a leaf. Depth is the distance of a node from the root.', 'Height—root থেকে একটি leaf পর্যন্ত সবচেয়ে লম্বা পথের দৈর্ঘ্য। Depth হলো root থেকে একটি node-এর দূরত্ব।'),
          l('Subtree — any node together with all of its descendants; the recursive nature of trees means every child is itself the root of a subtree.', 'Subtree—যেকোনো node তার সব বংশধরসহ; ট্রির রিকার্সিভ প্রকৃতির মানে প্রতিটি child নিজেই একটি subtree-এর root।'),
        ] },
      ],
    },
    {
      h: l('How you represent and walk a tree', 'ট্রি কীভাবে রিপ্রেজেন্ট ও হাঁটবেন'),
      blocks: [
        { p: l('Each node is a small record holding a value and references to its children. For a binary tree that is a value plus a left and a right pointer, either of which may be null. Because a tree is defined recursively — a node plus its subtrees — almost every tree operation is naturally written with recursion.', 'প্রতিটি node একটি ছোট record যা একটি value ও তার child-দের reference ধরে রাখে। একটি binary tree-এর জন্য তা হলো একটি value এবং একটি left ও একটি right pointer, যার যেকোনোটি null হতে পারে। যেহেতু ট্রি রিকার্সিভভাবে সংজ্ঞায়িত—একটি node ও তার subtree—প্রায় প্রতিটি ট্রি অপারেশন স্বভাবতই রিকার্শন দিয়ে লেখা হয়।') },
        { code: `node = { value, left, right }   // left / right are child nodes or null

// Visit every node: left subtree, then node, then right subtree
function inOrder(node):
  if node is null:
    return                       // empty subtree: nothing to do
  inOrder(node.left)
  visit(node.value)
  inOrder(node.right)

// Height = longest path from this node down to a leaf
function height(node):
  if node is null:
    return -1                    // empty tree has height -1
  return 1 + max(height(node.left), height(node.right))`, caption: l('Both routines touch every node once, so each is O(n) for a tree of n nodes. There are four standard orders to visit nodes: pre-order, in-order, post-order, and level-order.', 'দুটি routine-ই প্রতিটি node একবার ছোঁয়, তাই n node-এর ট্রিতে প্রতিটি O(n)। node দেখার চারটি প্রমিত ক্রম আছে: pre-order, in-order, post-order ও level-order।') },
      ],
    },
    {
      h: l('Why height, not count, decides speed', 'কেন সংখ্যা নয়, উচ্চতাই গতি ঠিক করে'),
      blocks: [
        { p: l('The cost of searching or inserting in a tree depends on its height, not on how many nodes it holds. If a binary tree is balanced — both sides kept roughly even — its height is only about log n, so a path from root to leaf is short. But a plain binary tree has no ordering rule and no balance guarantee, so a search that must find a particular value may have to visit every node: that is O(n).', 'একটি ট্রিতে খোঁজা বা ঢোকানোর খরচ তার উচ্চতার ওপর নির্ভর করে, কতগুলো node ধরে তার ওপর নয়। একটি binary tree balanced হলে—দুই পাশ মোটামুটি সমান রাখা—এর উচ্চতা প্রায় log n, তাই root থেকে leaf পর্যন্ত পথ ছোট। কিন্তু সাধারণ binary tree-তে কোনো ordering নিয়ম বা balance গ্যারান্টি নেই, তাই একটি নির্দিষ্ট value খুঁজতে প্রতিটি node দেখতে হতে পারে: তা O(n)।') },
        { table: {
          head: [l('Shape', 'আকৃতি'), l('Height', 'উচ্চতা'), l('What it means', 'অর্থ')],
          rows: [
            [l('Balanced binary tree', 'ব্যালান্সড বাইনারি ট্রি'), l('~log n', '~log n'), l('Short root-to-leaf paths; the foundation for fast tree operations.', 'ছোট root-থেকে-leaf পথ; দ্রুত ট্রি অপারেশনের ভিত্তি।')],
            [l('Skewed / degenerate tree', 'হেলানো / ডিজেনারেট ট্রি'), l('~n', '~n'), l('Every node has one child — it behaves like a linked list.', 'প্রতিটি node-এর একটি child—linked list-এর মতো আচরণ।')],
            [l('Any binary tree, full traversal', 'যেকোনো বাইনারি ট্রি, পূর্ণ ট্রাভার্সাল'), l('O(n)', 'O(n)'), l('Visiting all nodes is always O(n) regardless of shape.', 'সব node দেখা আকৃতি নির্বিশেষে সবসময় O(n)।')],
          ],
        } },
        { note: l('This table is about tree shape and height, not a fixed Big-O per operation: a plain binary tree imposes no ordering, so a targeted search is O(n). Adding an ordering rule is exactly what a Binary Search Tree does — the next topic.', 'এই টেবিল ট্রির আকৃতি ও উচ্চতা নিয়ে, প্রতি অপারেশনে নির্দিষ্ট Big-O নয়: সাধারণ binary tree কোনো ordering চাপায় না, তাই লক্ষ্যভিত্তিক search O(n)। একটি ordering নিয়ম যোগ করাই ঠিক যা Binary Search Tree করে—পরের টপিক।'), kind: 'tip' },
      ],
    },
    {
      h: l('When and where to use trees', 'কখন ও কোথায় ট্রি ব্যবহার করবেন'),
      blocks: [
        { list: [
          l('Model naturally hierarchical data as a tree: file systems, the DOM of a web page, org charts, folder structures, and category trees.', 'স্বভাবতই শ্রেণিবদ্ধ ডেটা ট্রি হিসেবে মডেল করুন: file system, ওয়েব পেজের DOM, org chart, folder structure ও category tree।'),
          l('Reach for specialized trees when you need order and speed: a binary search tree for ordered lookups, a heap for priorities, a trie for prefixes.', 'ক্রম ও গতি দরকার হলে বিশেষায়িত ট্রি নিন: সাজানো lookup-এ binary search tree, প্রায়োরিটিতে heap, prefix-এ trie।'),
          l('Use a tree when relationships branch and you traverse along those branches — not when you mostly index into a flat sequence (an array is better there).', 'যখন সম্পর্ক শাখা ছড়ায় ও আপনি সেই শাখা ধরে traverse করেন তখন ট্রি নিন—যখন বেশিরভাগ একটি flat sequence-এ index করেন তখন নয় (সেখানে অ্যারে ভালো)।'),
          l('Whenever performance matters, ask about balance: an unbalanced tree can silently degrade into a slow linked-list shape.', 'যখনই পারফরম্যান্স জরুরি, balance নিয়ে ভাবুন: একটি unbalanced ট্রি নীরবে ধীর linked-list আকৃতিতে নেমে যেতে পারে।'),
        ] },
      ],
    },
    {
      h: l('Common mistakes', 'সাধারণ ভুল'),
      blocks: [
        { list: [
          l('Confusing a general tree with a binary tree. A general tree lets a node have any number of children; a binary tree caps it at two. Their algorithms and bounds differ.', 'সাধারণ ট্রি ও binary tree গুলিয়ে ফেলা। সাধারণ ট্রিতে একটি node-এর যেকোনো সংখ্যক child থাকতে পারে; binary tree তা দুইয়ে সীমিত করে। এদের অ্যালগরিদম ও সীমা ভিন্ন।'),
          l('Ignoring depth when analyzing cost. Tree performance is about height, so a bound like "O(log n)" quietly assumes the tree is balanced.', 'খরচ বিশ্লেষণে গভীরতা উপেক্ষা করা। ট্রি পারফরম্যান্স উচ্চতা নিয়ে, তাই "O(log n)"-এর মতো সীমা নীরবে ধরে নেয় ট্রি balanced।'),
          l('Expecting in-order (sorted) output from a tree that is not a binary search tree — ordering only holds if the tree enforces it.', 'binary search tree নয় এমন ট্রি থেকে in-order (সাজানো) আউটপুট আশা করা—ordering শুধু তখনই থাকে যখন ট্রি তা চাপায়।'),
          l('Writing deep recursive traversals without considering stack depth; a very tall (skewed) tree can overflow the call stack.', 'stack গভীরতা না ভেবে গভীর রিকার্সিভ ট্রাভার্সাল লেখা; খুব উঁচু (হেলানো) ট্রি call stack উপচে ফেলতে পারে।'),
        ] },
      ],
    },
    {
      h: l('Remember in one line', 'এক লাইনে মনে রাখুন'),
      blocks: [
        { list: [
          l('A tree is a hierarchy of nodes with one root; a binary tree limits each node to two children.', 'ট্রি হলো এক root-সহ node-এর শ্রেণিবিন্যাস; binary tree প্রতিটি node-কে দুই child-এ সীমিত করে।'),
          l('Trees are defined recursively, so traversals and height are naturally recursive and O(n) to visit all nodes.', 'ট্রি রিকার্সিভভাবে সংজ্ঞায়িত, তাই ট্রাভার্সাল ও উচ্চতা স্বভাবতই রিকার্সিভ এবং সব node দেখতে O(n)।'),
          l('Performance depends on height, not count — so reason about balance, and confusing general with binary trees will bite you.', 'পারফরম্যান্স উচ্চতার ওপর নির্ভর করে, সংখ্যার নয়—তাই balance নিয়ে ভাবুন, আর সাধারণ ও binary ট্রি গুলিয়ে ফেললে বিপদ।'),
        ] },
      ],
    },
  ],

  // ── Binary search trees ───────────────────────────────────────────────────
  'dsa-bst': [
    {
      h: l('What is a binary search tree?', 'বাইনারি সার্চ ট্রি কী?'),
      blocks: [
        { p: l('A binary search tree (BST) is a binary tree with one extra rule that makes it powerful: for every node, all keys in its left subtree are smaller and all keys in its right subtree are larger. That single ordering invariant means the tree is sorted by structure, so searching for a key becomes a series of go-left-or-go-right decisions instead of a scan. When the tree is balanced, that finds any key in O(log n) time.', 'বাইনারি সার্চ ট্রি (BST) হলো একটি binary tree যার একটি অতিরিক্ত নিয়ম একে শক্তিশালী করে: প্রতিটি node-এর জন্য, তার left subtree-এর সব key ছোট ও right subtree-এর সব key বড়। সেই একটিমাত্র ordering invariant-এর মানে ট্রি গঠন দিয়েই সাজানো, তাই একটি key খোঁজা স্ক্যানের বদলে বাম-নাকি-ডান সিদ্ধান্তের একটি ধারা হয়ে যায়। ট্রি balanced হলে তা যেকোনো key O(log n) সময়ে খুঁজে দেয়।') },
        { p: l('A BST solves the problem of keeping data both sorted and quick to update. A sorted array gives O(log n) search via binary search, but inserting a new value means shifting elements — O(n). A BST keeps the sorted order while allowing O(log n) inserts and deletes too (when balanced), and it supports ordered operations a hash table cannot: finding the minimum, the next-larger key, or every key within a range.', 'একটি BST ডেটাকে একই সঙ্গে সাজানো ও দ্রুত আপডেটযোগ্য রাখার সমস্যা সমাধান করে। একটি সাজানো অ্যারে binary search দিয়ে O(log n) search দেয়, কিন্তু নতুন value ঢোকানো মানে উপাদান সরানো—O(n)। একটি BST সাজানো ক্রম রাখে এবং O(log n) insert ও delete-ও দেয় (balanced হলে), আর হ্যাশ টেবিল যা পারে না এমন ordered অপারেশন সমর্থন করে: সর্বনিম্ন খোঁজা, পরের-বড় key, বা একটি range-এর প্রতিটি key।') },
        { note: l('A BST is like a number-guessing game. You guess 50; you are told "higher." You guess 75; "lower." Each answer throws away half the remaining range. Searching a balanced BST does exactly this, one node at a time.', 'একটি BST একটি সংখ্যা-অনুমান খেলার মতো। আপনি ৫০ অনুমান করেন; বলা হয় "বেশি।" আপনি ৭৫ অনুমান করেন; "কম।" প্রতিটি উত্তর বাকি range-এর অর্ধেক ফেলে দেয়। একটি balanced BST খোঁজা ঠিক এটাই করে, একবারে একটি node।'), kind: 'tip' },
      ],
    },
    {
      h: l('How search and insert work', 'search ও insert কীভাবে কাজ করে'),
      blocks: [
        { steps: [
          l('To search, start at the root and compare your key with the node’s key.', 'search করতে root থেকে শুরু করুন ও আপনার key-কে node-এর key-এর সঙ্গে তুলনা করুন।'),
          l('If they are equal, you found it. If your key is smaller, move to the left child; if larger, move to the right child.', 'সমান হলে পেয়ে গেছেন। আপনার key ছোট হলে left child-এ যান; বড় হলে right child-এ যান।'),
          l('Repeat until you match or reach a null link, which means the key is not in the tree. Each step drops down one level.', 'যতক্ষণ না মেলে বা একটি null লিংকে পৌঁছান পুনরাবৃত্তি করুন, যা মানে key ট্রিতে নেই। প্রতিটি ধাপ এক স্তর নিচে নামে।'),
          l('To insert, follow the same path as a search; when you reach the empty (null) spot where the key would have been, create the new node there.', 'insert করতে search-এর মতো একই পথ অনুসরণ করুন; key যেখানে থাকত সেই খালি (null) জায়গায় পৌঁছে সেখানে নতুন node বানান।'),
          l('An in-order traversal (left, node, right) of a BST visits keys in ascending sorted order — a free sorted listing.', 'একটি BST-এর in-order traversal (left, node, right) key-গুলো আরোহী সাজানো ক্রমে দেখে—একটি বিনামূল্যের সাজানো তালিকা।'),
        ] },
        { code: `// Search: at each node go left OR right, never both
function search(node, key):
  while node is not null:
    if key == node.value: return node       // found it
    if key <  node.value: node = node.left  // target is smaller
    else:                 node = node.right // target is larger
  return null                               // not present

// Insert: walk to the empty spot, then create the node there
function insert(node, key):
  if node is null:
    return newNode(key)                     // empty slot -> new node
  if key < node.value:
    node.left  = insert(node.left, key)
  else if key > node.value:
    node.right = insert(node.right, key)
  return node                               // equal key: ignore duplicate`, caption: l('Both operations follow one root-to-leaf path, so their cost equals the tree’s height: O(log n) when balanced, O(n) when skewed.', 'দুটি অপারেশনই একটি root-থেকে-leaf পথ অনুসরণ করে, তাই এদের খরচ ট্রির উচ্চতার সমান: balanced হলে O(log n), হেলানো হলে O(n)।') },
      ],
    },
    {
      h: l('Complexity', 'জটিলতা'),
      blocks: [
        { table: {
          head: [l('Operation', 'অপারেশন'), l('Cost', 'খরচ'), l('Condition', 'শর্ত')],
          rows: [
            [l('Search (balanced)', 'সার্চ (ব্যালান্সড)'), l('O(log n)', 'O(log n)'), l('Height is ~log n, so one root-to-leaf path is short.', 'উচ্চতা ~log n, তাই একটি root-থেকে-leaf পথ ছোট।')],
            [l('Insert (balanced)', 'ইনসার্ট (ব্যালান্সড)'), l('O(log n)', 'O(log n)'), l('Follows the same short search path to the empty slot.', 'খালি জায়গা পর্যন্ত একই ছোট search পথ অনুসরণ করে।')],
            [l('Worst (skewed)', 'ওয়ার্স্ট (হেলানো)'), l('O(n)', 'O(n)'), l('Inserting sorted data makes a one-sided chain — a linked list.', 'সাজানো ডেটা ঢোকালে একপাশের চেইন হয়—একটি linked list।')],
          ],
        } },
        { note: l('The gap between O(log n) and O(n) is entirely about balance. A BST is only as fast as it is bushy; let it grow lopsided and it decays into a linked list.', 'O(log n) ও O(n)-এর ফারাক পুরোটাই balance নিয়ে। একটি BST যতটা ঝোপালো ততটাই দ্রুত; একে একপেশে বাড়তে দিলে এটি linked list-এ ক্ষয়ে যায়।'), kind: 'warn' },
      ],
    },
    {
      h: l('Why balance is everything', 'কেন balance-ই সব'),
      blocks: [
        { p: l('The O(log n) promise holds only while the tree stays roughly balanced. Here is the trap: if you insert already-sorted data into a plain BST — 1, 2, 3, 4, 5 — each new key is larger than everything before it, so it always goes right. The tree becomes a single right-leaning chain with height n. Now every search walks all n nodes, and you have paid for a tree while getting a linked list.', 'O(log n) প্রতিশ্রুতি শুধু ততক্ষণ থাকে যতক্ষণ ট্রি মোটামুটি balanced থাকে। এই যে ফাঁদ: একটি সাধারণ BST-তে আগে-সাজানো ডেটা ঢোকালে—১, ২, ৩, ৪, ৫—প্রতিটি নতুন key তার আগের সবকিছুর চেয়ে বড়, তাই সবসময় ডানে যায়। ট্রি একটি একক ডান-হেলানো চেইন হয়ে যায়, উচ্চতা n। এখন প্রতিটি search সব n node হাঁটে, আর আপনি ট্রির দাম দিয়ে একটি linked list পেয়েছেন।') },
        { p: l('The fix is a self-balancing BST — an AVL tree or a red-black tree — which rotates nodes during insert and delete to keep the height logarithmic no matter what order the data arrives in. In real code you rarely hand-roll this; you use your language’s ordered map or set (such as a TreeMap or std::map), which is a balanced BST underneath.', 'সমাধান হলো একটি self-balancing BST—একটি AVL tree বা red-black tree—যা insert ও delete-এর সময় node rotate করে উচ্চতা logarithmic রাখে, ডেটা যে ক্রমেই আসুক। বাস্তব কোডে আপনি এটি কমই নিজে বানান; আপনি আপনার ভাষার ordered map বা set (যেমন TreeMap বা std::map) ব্যবহার করেন, যা ভেতরে একটি balanced BST।') },
      ],
    },
    {
      h: l('When and where to use it', 'কখন ও কোথায় ব্যবহার করবেন'),
      blocks: [
        { p: l('Use a BST (in practice, a balanced one) when you need keys kept in sorted order together with fast lookups, inserts, and deletes. Its superpower over a hash table is ordered operations: min and max, the next key above or below a value, and range queries like "every key between 20 and 40". A hash table gives O(1) point lookups but knows nothing about order.', 'একটি BST (বাস্তবে balanced) ব্যবহার করুন যখন key সাজানো ক্রমে রাখা ও দ্রুত lookup, insert ও delete দুটোই দরকার। হ্যাশ টেবিলের ওপর এর সুপারপাওয়ার হলো ordered অপারেশন: min ও max, একটি value-এর ঠিক ওপর বা নিচের key, ও "২০ থেকে ৪০-এর মধ্যে প্রতিটি key"-র মতো range query। হ্যাশ টেবিল O(1) point lookup দেয় কিন্তু ক্রম সম্পর্কে কিছু জানে না।') },
        { list: [
          l('Choose a BST when you need sorted iteration or range queries — a hash table cannot do these.', 'সাজানো iteration বা range query দরকার হলে BST নিন—হ্যাশ টেবিল এগুলো পারে না।'),
          l('Choose a hash table instead when you only need unordered point lookups and want average O(1).', 'শুধু ক্রমহীন point lookup ও গড় O(1) চাইলে বরং হ্যাশ টেবিল নিন।'),
          l('Always use a self-balancing variant (AVL, red-black) or your standard library’s ordered map for untrusted or possibly-sorted input.', 'অবিশ্বস্ত বা সম্ভবত-সাজানো ইনপুটে সবসময় একটি self-balancing রূপ (AVL, red-black) বা standard library-র ordered map ব্যবহার করুন।'),
          l('Reach for a BST to maintain a running sorted set — leaderboards, schedulers, and interval problems where order and updates both matter.', 'একটি চলমান সাজানো set রাখতে BST নিন—leaderboard, scheduler ও interval সমস্যা যেখানে ক্রম ও আপডেট দুটোই জরুরি।'),
        ] },
      ],
    },
    {
      h: l('Common mistakes', 'সাধারণ ভুল'),
      blocks: [
        { list: [
          l('Inserting sorted data into a plain BST and turning it into a linked list, so every operation quietly becomes O(n).', 'একটি সাধারণ BST-তে সাজানো ডেটা ঢুকিয়ে একে linked list-এ পরিণত করা, ফলে প্রতিটি অপারেশন নীরবে O(n) হয়।'),
          l('Assuming a BST is automatically balanced. A plain BST is not — you need an AVL or red-black tree, or a library ordered map, for a guarantee.', 'একটি BST স্বয়ংক্রিয়ভাবে balanced ধরে নেওয়া। সাধারণ BST নয়—গ্যারান্টির জন্য একটি AVL বা red-black tree, বা library ordered map লাগে।'),
          l('Breaking the ordering invariant during insert or delete (especially the delete case with two children), which corrupts every later search.', 'insert বা delete-এর সময় ordering invariant ভাঙা (বিশেষত দুই child-সহ delete ক্ষেত্র), যা পরের প্রতিটি search নষ্ট করে।'),
          l('Confusing a BST with a heap: a heap only guarantees parent-vs-child order and gives O(1) min/max, but it cannot do O(log n) search for an arbitrary key.', 'একটি BST-কে heap-এর সঙ্গে গুলিয়ে ফেলা: heap শুধু parent-বনাম-child ক্রম নিশ্চিত করে ও O(1) min/max দেয়, কিন্তু যেকোনো key-এর জন্য O(log n) search করতে পারে না।'),
        ] },
      ],
    },
    {
      h: l('Remember in one line', 'এক লাইনে মনে রাখুন'),
      blocks: [
        { list: [
          l('A BST keeps smaller keys left and larger keys right, giving O(log n) search, insert, and delete when balanced.', 'BST ছোট key বামে ও বড় key ডানে রাখে—balanced হলে O(log n) search, insert ও delete দেয়।'),
          l('Its cost is fragility: an unbalanced BST degrades to an O(n) linked list, so use a self-balancing variant.', 'এর খরচ হলো ভঙ্গুরতা: একটি unbalanced BST O(n) linked list-এ নামে, তাই একটি self-balancing রূপ নিন।'),
          l('Pick a BST over a hash table when you need order: sorted iteration, min/max, successor, and range queries.', 'ক্রম দরকার হলে হ্যাশ টেবিলের বদলে BST নিন: সাজানো iteration, min/max, successor ও range query।'),
        ] },
      ],
    },
  ],
}
