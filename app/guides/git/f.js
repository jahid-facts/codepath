// Deep, bilingual (English / Bangla) teaching guides for the Advanced Git and
// GitHub Actions topics. Shape mirrors app/course-guides.js and app/guides/dsa/a.js:
// each guide is an array of sections { h, blocks }, rendered by GuideBlock in
// app/LearningApp.js. Facts are drawn from the rawTopics + commands in
// app/courses/git.js. In { code } blocks, GitHub Actions expressions are written
// bare (for example secrets.NPM_TOKEN) and must be placed inside the Actions
// expression wrapper — a dollar sign followed by double curly braces — in real files.

const l = (en, bn) => ({ en, bn })

export default {
  // ── git-submodules-worktree · Submodules & worktrees ──────────────────────
  'git-submodules-worktree': [
    {
      h: l('What are submodules & worktrees?', 'সাবমডিউল ও ওয়ার্কট্রি কী?'),
      blocks: [
        { p: l('A submodule and a worktree solve two different Git problems that beginners often confuse. A submodule embeds another Git repository inside your own at one fixed commit — your repo does not copy that project’s files, it records a pointer to an exact commit in it. A worktree does the opposite kind of thing: it lets a single repository have two (or more) working directories on disk at once, each checked out to a different branch, all sharing the same history.', 'একটি সাবমডিউল ও একটি ওয়ার্কট্রি গিটের দুটি ভিন্ন সমস্যা সমাধান করে যা নতুনরা প্রায়ই গুলিয়ে ফেলে। সাবমডিউল আপনার নিজের রিপোর ভেতরে অন্য একটি গিট রিপোজিটরিকে একটি নির্দিষ্ট কমিটে বসায়—আপনার রিপো সেই প্রকল্পের ফাইল কপি করে না, বরং তার ঠিক একটি কমিটের দিকে একটি পয়েন্টার রাখে। ওয়ার্কট্রি উল্টো কাজ করে: এটি একটি রিপোকে একই সময়ে ডিস্কে দুটি (বা তার বেশি) ওয়ার্কিং ডিরেক্টরি রাখতে দেয়, প্রতিটি আলাদা ব্রাঞ্চে চেকআউট করা, সবাই একই ইতিহাস ভাগ করে।') },
        { p: l('The problem a submodule solves is depending on external code without vendoring a frozen copy. You want to reuse a shared library or a theme, keep it in its own repository, and pin your project to a version you have tested. The problem a worktree solves is context-switching without stashing: when an urgent hotfix arrives while your working directory is full of half-done changes, you can check out the release branch in a second folder instead of shelving everything and switching branches in place.', 'সাবমডিউল যে সমস্যা সমাধান করে তা হলো বাহ্যিক কোডের ওপর নির্ভর করা—একটি জমাট কপি ভেন্ডর না করেই। আপনি একটি শেয়ার্ড লাইব্রেরি বা থিম পুনঃব্যবহার করতে চান, সেটি তার নিজের রিপোজিটরিতে রাখতে চান, এবং আপনার প্রকল্পকে একটি পরীক্ষিত ভার্সনে পিন করতে চান। ওয়ার্কট্রি যে সমস্যা সমাধান করে তা হলো স্ট্যাশ ছাড়া কনটেক্সট বদল: যখন আপনার ওয়ার্কিং ডিরেক্টরি অর্ধেক-করা পরিবর্তনে ভরা অবস্থায় একটি জরুরি হটফিক্স আসে, তখন সব শেলভ করে জায়গায় ব্রাঞ্চ বদলানোর বদলে আপনি দ্বিতীয় একটি ফোল্ডারে রিলিজ ব্রাঞ্চ চেকআউট করতে পারেন।') },
        { note: l('A submodule is a book that cites another book by its exact edition and page — it does not reprint the text, it references a fixed version. A worktree is a second desk in the same office: same filing cabinet (history), but a different document open on each desk so you can work on two tasks side by side.', 'সাবমডিউল হলো এমন একটি বই যা অন্য একটি বইকে তার ঠিক সংস্করণ ও পৃষ্ঠা ধরে উদ্ধৃত করে—এটি লেখা আবার ছাপে না, একটি নির্দিষ্ট ভার্সনকে নির্দেশ করে। ওয়ার্কট্রি হলো একই অফিসে দ্বিতীয় একটি ডেস্ক: একই ফাইলিং ক্যাবিনেট (ইতিহাস), তবে প্রতিটি ডেস্কে আলাদা ডকুমেন্ট খোলা, যাতে আপনি পাশাপাশি দুটি কাজ করতে পারেন।'), kind: 'tip' },
      ],
    },
    {
      h: l('How they work, step by step', 'কীভাবে কাজ করে, ধাপে ধাপে'),
      blocks: [
        { steps: [
          l('Adding a submodule clones the external repo into a subfolder and records its URL and current commit in a .gitmodules file plus a special gitlink entry.', 'সাবমডিউল যোগ করলে বাহ্যিক রিপোটি একটি সাবফোল্ডারে ক্লোন হয় এবং তার URL ও বর্তমান কমিট একটি .gitmodules ফাইল ও একটি বিশেষ gitlink এন্ট্রিতে রেকর্ড হয়।'),
          l('Your main repo now tracks only that pointer — the exact commit — not the submodule’s files. Committing in your repo saves "use commit abc123 of ui-kit", nothing more.', 'আপনার প্রধান রিপো এখন শুধু সেই পয়েন্টার—ঠিক কমিটটি—ট্র্যাক করে, সাবমডিউলের ফাইল নয়। আপনার রিপোতে কমিট করলে তা রাখে "ui-kit-এর abc123 কমিটটি ব্যবহার করো", এর বেশি কিছু নয়।'),
          l('When someone clones your project, the submodule folder is empty until they run the init/update command that fetches the pinned commit — this is the step people forget.', 'কেউ আপনার প্রকল্প ক্লোন করলে সাবমডিউল ফোল্ডার খালি থাকে, যতক্ষণ না তারা init/update কমান্ড চালিয়ে পিন করা কমিটটি আনে—এই ধাপটিই মানুষ ভুলে যায়।'),
          l('Adding a worktree creates a new folder linked to the same repository and checks out the branch you name there, so both folders stay in sync through one shared history.', 'ওয়ার্কট্রি যোগ করলে একই রিপোজিটরির সঙ্গে যুক্ত একটি নতুন ফোল্ডার তৈরি হয় ও সেখানে আপনার বলা ব্রাঞ্চটি চেকআউট হয়, তাই দুটি ফোল্ডার একটি শেয়ার্ড ইতিহাসের মধ্য দিয়ে সিংকে থাকে।'),
          l('You fix the bug in the second folder, commit and push, then remove the worktree — your original folder never lost its in-progress changes.', 'আপনি দ্বিতীয় ফোল্ডারে বাগ ঠিক করেন, কমিট ও পুশ করেন, তারপর ওয়ার্কট্রি সরিয়ে ফেলেন—আপনার মূল ফোল্ডার তার চলমান পরিবর্তন কখনো হারায় না।'),
        ] },
        { code: `# add an external repo, pinned at its current commit
git submodule add https://github.com/acme/ui-kit vendor/ui-kit
git commit -m "add ui-kit submodule at v2.1"

# clone a project that already contains submodules
git clone --recurse-submodules https://github.com/acme/app

# forgot the flag? fill the empty submodule folders after the fact
git submodule update --init --recursive

# open a second working directory to hotfix main, no stashing
git worktree add ../app-hotfix main
# ...fix, commit, push in ../app-hotfix, then clean up:
git worktree remove ../app-hotfix`, caption: l('The submodule commands pin and fetch an external repo; the worktree commands give you a second checkout of the same repo for parallel work.', 'সাবমডিউল কমান্ডগুলো একটি বাহ্যিক রিপো পিন ও ফেচ করে; ওয়ার্কট্রি কমান্ডগুলো সমান্তরাল কাজের জন্য একই রিপোর দ্বিতীয় একটি চেকআউট দেয়।') },
      ],
    },
    {
      h: l('Key commands', 'মূল কমান্ড'),
      blocks: [
        { table: {
          head: [l('Goal', 'লক্ষ্য'), l('Command', 'কমান্ড')],
          rows: [
            [l('Add a submodule', 'সাবমডিউল যোগ করুন'), l('git submodule add <url> <path>', 'git submodule add <url> <path>')],
            [l('Clone a repo with its submodules', 'সাবমডিউলসহ রিপো ক্লোন করুন'), l('git clone --recurse-submodules <url>', 'git clone --recurse-submodules <url>')],
            [l('Fill submodules after a plain clone', 'সাধারণ ক্লোনের পর সাবমডিউল ভরুন'), l('git submodule update --init --recursive', 'git submodule update --init --recursive')],
            [l('Add a second working directory', 'দ্বিতীয় ওয়ার্কিং ডিরেক্টরি যোগ করুন'), l('git worktree add ../hotfix main', 'git worktree add ../hotfix main')],
            [l('List all worktrees', 'সব ওয়ার্কট্রি দেখুন'), l('git worktree list', 'git worktree list')],
          ],
        } },
      ],
    },
    {
      h: l('When and where to use each', 'কখন ও কোথায় কোনটি ব্যবহার করবেন'),
      blocks: [
        { p: l('Reach for a worktree freely — it is cheap, safe, and local. Any time you need to be on two branches at once (review a colleague’s branch while your feature is half-built, run a long build on main while you keep coding on a branch, or apply a fast hotfix), a worktree is almost always nicer than stashing and switching. When you finish, remove it and nothing is left behind.', 'ওয়ার্কট্রি অবাধে নিন—এটি সস্তা, নিরাপদ ও লোকাল। যখনই একসঙ্গে দুই ব্রাঞ্চে থাকা দরকার (আপনার ফিচার অর্ধেক তৈরি অবস্থায় সহকর্মীর ব্রাঞ্চ রিভিউ করা, একটি ব্রাঞ্চে কোডিং চালিয়ে যেতে যেতে main-এ লম্বা বিল্ড চালানো, বা দ্রুত হটফিক্স দেওয়া), তখন স্ট্যাশ করে সুইচ করার চেয়ে ওয়ার্কট্রি প্রায় সবসময়ই ভালো। কাজ শেষে সরিয়ে দিন, কিছুই পড়ে থাকে না।') },
        { p: l('Be more cautious with submodules. Use one only when you genuinely need a separate repository pinned to an exact version — a shared design system across several apps, a private dependency not on any package registry, or a vendored tool you must lock down for security. If a normal package manager (npm, pip, Cargo) can express the dependency, prefer that: it is simpler than the submodule workflow. Submodules shine when the pinned commit itself is the point.', 'সাবমডিউলে বেশি সতর্ক থাকুন। শুধু তখনই একটি ব্যবহার করুন যখন আপনার সত্যিই একটি আলাদা রিপোজিটরি ঠিক একটি ভার্সনে পিন করা দরকার—কয়েকটি অ্যাপ জুড়ে একটি শেয়ার্ড ডিজাইন সিস্টেম, কোনো প্যাকেজ রেজিস্ট্রিতে না থাকা একটি প্রাইভেট ডিপেন্ডেন্সি, বা নিরাপত্তার জন্য লক করে রাখা একটি ভেন্ডরড টুল। যদি একটি সাধারণ প্যাকেজ ম্যানেজার (npm, pip, Cargo) ডিপেন্ডেন্সিটি প্রকাশ করতে পারে, তবে সেটাই নিন: এটি সাবমডিউল ওয়ার্কফ্লোর চেয়ে সরল। যখন পিন করা কমিটটাই আসল উদ্দেশ্য, তখনই সাবমডিউল উজ্জ্বল হয়।') },
        { note: l('The classic trap: cloning a project that has submodules with a plain git clone leaves the submodule folders empty, and the build fails with confusing "file not found" errors. Always clone with --recurse-submodules, or run git submodule update --init --recursive right after.', 'ক্লাসিক ফাঁদ: সাবমডিউলযুক্ত একটি প্রকল্প সাধারণ git clone দিয়ে ক্লোন করলে সাবমডিউল ফোল্ডার খালি থাকে, আর বিল্ড বিভ্রান্তিকর "file not found" ত্রুটিতে ব্যর্থ হয়। সবসময় --recurse-submodules দিয়ে ক্লোন করুন, অথবা ঠিক পরেই git submodule update --init --recursive চালান।'), kind: 'warn' },
      ],
    },
    {
      h: l('Common mistakes', 'সাধারণ ভুল'),
      blocks: [
        { list: [
          l('Cloning a repo with submodules and forgetting --recurse-submodules, ending up with empty submodule folders and a broken build.', 'সাবমডিউলসহ রিপো ক্লোন করে --recurse-submodules ভুলে যাওয়া, ফলে খালি সাবমডিউল ফোল্ডার ও ভাঙা বিল্ড।'),
          l('Editing files inside a submodule and committing only in the outer repo — the submodule’s own commit and push are separate steps that are easy to skip.', 'সাবমডিউলের ভেতরে ফাইল এডিট করে শুধু বাইরের রিপোতে কমিট করা—সাবমডিউলের নিজের কমিট ও পুশ আলাদা ধাপ যা সহজেই বাদ পড়ে।'),
          l('Reaching for a submodule when a package manager would do, adding clone-and-update complexity for no real gain.', 'যেখানে একটি প্যাকেজ ম্যানেজারই যথেষ্ট সেখানে সাবমডিউল নেওয়া, বিনা লাভে ক্লোন-ও-আপডেট জটিলতা যোগ করা।'),
          l('Trying to check out the same branch in two worktrees at once — Git refuses this on purpose to protect the shared history.', 'একই ব্রাঞ্চ একসঙ্গে দুটি ওয়ার্কট্রিতে চেকআউট করার চেষ্টা—গিট শেয়ার্ড ইতিহাস রক্ষায় ইচ্ছাকৃতভাবে এটি প্রত্যাখ্যান করে।'),
          l('Deleting a worktree folder by hand instead of git worktree remove, leaving a stale registration behind.', 'git worktree remove-এর বদলে হাতে ওয়ার্কট্রি ফোল্ডার মোছা, ফলে একটি পুরনো রেজিস্ট্রেশন পড়ে থাকা।'),
        ] },
      ],
    },
    {
      h: l('Remember in one line', 'এক লাইনে মনে রাখুন'),
      blocks: [
        { list: [
          l('Submodule = another repo pinned at an exact commit inside yours; worktree = a second folder for a second branch of the same repo.', 'সাবমডিউল = আপনার রিপোর ভেতরে ঠিক একটি কমিটে পিন করা অন্য একটি রিপো; ওয়ার্কট্রি = একই রিপোর দ্বিতীয় ব্রাঞ্চের জন্য দ্বিতীয় ফোল্ডার।'),
          l('Use worktrees freely to avoid stashing; use submodules only when you truly need a pinned external repository.', 'স্ট্যাশ এড়াতে ওয়ার্কট্রি অবাধে নিন; সত্যিই একটি পিন করা বাহ্যিক রিপো লাগলে তবেই সাবমডিউল নিন।'),
          l('Always clone submodule projects with --recurse-submodules, or the folders come up empty.', 'সাবমডিউল প্রকল্প সবসময় --recurse-submodules দিয়ে ক্লোন করুন, নইলে ফোল্ডার খালি আসে।'),
        ] },
      ],
    },
  ],

  // ── git-actions-intro · GitHub Actions & YAML basics ──────────────────────
  'git-actions-intro': [
    {
      h: l('What is GitHub Actions?', 'গিটহাব অ্যাকশন কী?'),
      blocks: [
        { p: l('GitHub Actions is the automation built into GitHub. You describe jobs in YAML files placed under .github/workflows/ in your repository, and GitHub runs them automatically when an event you chose happens — a push, a pull request, a new tag, a schedule, or a manual click. Instead of remembering to run tests, lint, or deploy by hand, the robot does it for you on every change, and reports back with a green check or a red X.', 'গিটহাব অ্যাকশন হলো গিটহাবের ভেতরে তৈরি অটোমেশন। আপনি আপনার রিপোজিটরির .github/workflows/-এর নিচে রাখা YAML ফাইলে job বর্ণনা করেন, আর আপনার বাছাই করা একটি ইভেন্ট ঘটলে গিটহাব সেগুলো স্বয়ংক্রিয়ভাবে চালায়—একটি push, একটি pull request, একটি নতুন tag, একটি schedule, বা একটি ম্যানুয়াল ক্লিক। হাতে টেস্ট, লিন্ট বা ডিপ্লয় চালানোর কথা মনে রাখার বদলে, রোবট প্রতিটি পরিবর্তনে তা আপনার জন্য করে এবং একটি সবুজ চেক বা লাল X দিয়ে জানায়।') },
        { p: l('The problem it solves is human forgetfulness and inconsistency. Manual steps get skipped, run differently on each laptop, or done only when someone remembers. A workflow turns those steps into code that lives beside your project, runs the same way every time, and blocks a broken change before it reaches the main branch. On public repositories this automation is free, which is why almost every open-source project has a .github/workflows/ folder.', 'এটি যে সমস্যা সমাধান করে তা হলো মানুষের ভুলে যাওয়া ও অসামঞ্জস্য। হাতে-করা ধাপ বাদ পড়ে, প্রতিটি ল্যাপটপে ভিন্নভাবে চলে, বা শুধু কেউ মনে রাখলে হয়। একটি ওয়ার্কফ্লো সেই ধাপগুলোকে কোডে পরিণত করে যা আপনার প্রকল্পের পাশে থাকে, প্রতিবার একইভাবে চলে, এবং একটি ভাঙা পরিবর্তন main ব্রাঞ্চে পৌঁছানোর আগেই আটকায়। পাবলিক রিপোজিটরিতে এই অটোমেশন বিনামূল্যে, এ কারণেই প্রায় প্রতিটি ওপেন-সোর্স প্রকল্পে একটি .github/workflows/ ফোল্ডার থাকে।') },
        { note: l('Think of a set of "if this happens, do that" recipes pinned to your kitchen wall, and a tireless robot assistant who reads them on every push. You never chop the vegetables yourself again — but the robot only follows the recipe exactly as written, whitespace and all.', '"এটা ঘটলে ওটা করো" ধরনের কিছু রেসিপি রান্নাঘরের দেয়ালে আটকানো, আর একটি ক্লান্তিহীন রোবট সহকারী যে প্রতি পুশে সেগুলো পড়ে—এমন ভাবুন। আপনি আর কখনো নিজে সবজি কাটেন না—তবে রোবট রেসিপি ঠিক যেমন লেখা তেমনই অনুসরণ করে, হোয়াইটস্পেসসহ সব মিলিয়ে।'), kind: 'tip' },
      ],
    },
    {
      h: l('How a workflow runs, step by step', 'একটি ওয়ার্কফ্লো কীভাবে চলে, ধাপে ধাপে'),
      blocks: [
        { steps: [
          l('You commit a YAML file into .github/workflows/ — for example ci.yml. GitHub reads every file in that folder.', 'আপনি .github/workflows/-এ একটি YAML ফাইল কমিট করেন—যেমন ci.yml। গিটহাব সেই ফোল্ডারের প্রতিটি ফাইল পড়ে।'),
          l('An event happens that matches the file’s on: trigger — say someone pushes a commit or opens a pull request.', 'ফাইলের on: ট্রিগারের সঙ্গে মেলে এমন একটি ইভেন্ট ঘটে—ধরুন কেউ একটি কমিট push করে বা একটি pull request খোলে।'),
          l('GitHub spins up a fresh virtual machine (a runner), typically ubuntu-latest, with nothing but a clean OS.', 'গিটহাব একটি টাটকা ভার্চুয়াল মেশিন (একটি runner) চালু করে, সাধারণত ubuntu-latest, যাতে একটি পরিষ্কার OS ছাড়া কিছুই নেই।'),
          l('It runs your steps in order: first checking out your code, then installing, testing, or building it.', 'এটি আপনার step-গুলো ক্রমে চালায়: প্রথমে আপনার কোড চেকআউট, তারপর ইনস্টল, টেস্ট বা বিল্ড।'),
          l('If every step exits successfully the run is green; if any step fails, the run is red and (with branch protection) can block the merge.', 'প্রতিটি step সফলভাবে শেষ হলে রান সবুজ; কোনো step ব্যর্থ হলে রান লাল এবং (branch protection সহ) মার্জ আটকাতে পারে।'),
        ] },
        { code: `name: CI
on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm ci
      - run: npm test`, caption: l('A minimal .github/workflows/ci.yml: it runs on every push and pull request, checks out the code, installs dependencies, and runs the tests.', 'একটি ন্যূনতম .github/workflows/ci.yml: এটি প্রতি push ও pull request-এ চলে, কোড চেকআউট করে, ডিপেন্ডেন্সি ইনস্টল করে ও টেস্ট চালায়।') },
      ],
    },
    {
      h: l('The YAML indentation rule: spaces, never tabs', 'YAML ইনডেন্টেশন নিয়ম: স্পেস, কখনো ট্যাব নয়'),
      blocks: [
        { p: l('YAML expresses structure entirely through indentation — how deeply a line is indented decides what it belongs to. There are two ironclad rules. First, indent with spaces only, never tab characters; a single tab makes GitHub reject the whole file, and because a tab can look identical to spaces in your editor, the error is maddening to spot. Second, be consistent: the community standard is two spaces per level, and every sibling key must line up in the same column.', 'YAML সম্পূর্ণভাবে ইনডেন্টেশন দিয়ে গঠন প্রকাশ করে—একটি লাইন কতটা গভীরে ইনডেন্ট তা ঠিক করে এটি কীসের অন্তর্গত। দুটি অটল নিয়ম আছে। প্রথমত, শুধু স্পেস দিয়ে ইনডেন্ট করুন, কখনো ট্যাব অক্ষর নয়; একটিমাত্র ট্যাব গিটহাবকে পুরো ফাইল প্রত্যাখ্যান করায়, আর এডিটরে ট্যাব দেখতে স্পেসের মতোই হতে পারে বলে ত্রুটিটি খুঁজে বের করা যন্ত্রণাদায়ক। দ্বিতীয়ত, সামঞ্জস্য রাখুন: কমিউনিটি স্ট্যান্ডার্ড হলো প্রতি স্তরে দুই স্পেস, আর প্রতিটি সহোদর কী একই কলামে সারিবদ্ধ হতে হবে।') },
        { p: l('A list item begins with a dash and a space (- ), and a mapping is written as key: value with a space after the colon. Nesting a list inside a key, or a key inside a list item, is just one more level of indentation. Set your editor to insert spaces when you press Tab and to show whitespace, and this whole class of "the workflow silently did not run" problems disappears.', 'একটি লিস্ট আইটেম একটি ড্যাশ ও একটি স্পেস (- ) দিয়ে শুরু হয়, আর একটি ম্যাপিং লেখা হয় key: value হিসেবে, কোলনের পরে একটি স্পেস দিয়ে। একটি কী-এর ভেতরে একটি লিস্ট, বা একটি লিস্ট আইটেমের ভেতরে একটি কী নেস্ট করা মানে শুধু আরও এক স্তর ইনডেন্টেশন। আপনার এডিটরকে Tab চাপলে স্পেস বসাতে ও হোয়াইটস্পেস দেখাতে সেট করুন, তাহলে "ওয়ার্কফ্লো নীরবে চলল না" এই পুরো শ্রেণির সমস্যা মিলিয়ে যায়।') },
        { note: l('If a push does not trigger anything, do not assume Actions is broken. Nine times out of ten it is a tab or a misaligned key. Paste the file into a YAML validator, or turn on "render whitespace" in your editor, to find the stray character.', 'একটি push কিছু ট্রিগার না করলে ধরে নেবেন না যে Actions ভেঙে গেছে। দশবারের নয়বারই এটি একটি ট্যাব বা একটি ভুল-সারিবদ্ধ কী। ভুল অক্ষরটি খুঁজতে ফাইলটি একটি YAML ভ্যালিডেটরে পেস্ট করুন, অথবা এডিটরে "render whitespace" চালু করুন।'), kind: 'warn' },
      ],
    },
    {
      h: l('Key YAML keys and triggers', 'মূল YAML কী ও ট্রিগার'),
      blocks: [
        { table: {
          head: [l('YAML key', 'YAML কী'), l('What it means', 'যা বোঝায়')],
          rows: [
            [l('.github/workflows/', '.github/workflows/'), l('The folder where every workflow file must live for GitHub to find it.', 'যে ফোল্ডারে প্রতিটি ওয়ার্কফ্লো ফাইল থাকলে গিটহাব তা খুঁজে পায়।')],
            [l('name:', 'name:'), l('A human-readable label for the workflow, shown in the Actions tab.', 'ওয়ার্কফ্লোর একটি মানুষ-পাঠযোগ্য লেবেল, Actions ট্যাবে দেখানো হয়।')],
            [l('on: [push, pull_request]', 'on: [push, pull_request]'), l('The events that trigger this workflow to run.', 'যে ইভেন্টগুলো এই ওয়ার্কফ্লো চালাতে ট্রিগার করে।')],
            [l('on: workflow_dispatch', 'on: workflow_dispatch'), l('Adds a manual "Run workflow" button in the Actions UI.', 'Actions UI-তে একটি ম্যানুয়াল "Run workflow" বোতাম যোগ করে।')],
            [l('on: schedule with cron: "0 6 * * 1"', 'on: schedule সহ cron: "0 6 * * 1"'), l('Runs on a timed schedule (here, 06:00 UTC every Monday).', 'একটি নির্ধারিত সময়সূচিতে চলে (এখানে প্রতি সোমবার 06:00 UTC)।')],
          ],
        } },
      ],
    },
    {
      h: l('When and where to use Actions', 'কখন ও কোথায় Actions ব্যবহার করবেন'),
      blocks: [
        { p: l('Add a workflow as soon as a project has tests or a build worth protecting. The highest-value first workflow is continuous integration: run your tests and linter on every push and pull request so a broken change is caught before it merges. From there, teams add workflows to publish packages, deploy on a tag, run scheduled maintenance, or auto-label issues. If you find yourself doing the same manual steps after every change, that is the signal to move them into a workflow.', 'একটি প্রকল্পে টেস্ট বা রক্ষা করার মতো বিল্ড থাকলেই একটি ওয়ার্কফ্লো যোগ করুন। সর্বোচ্চ-মূল্যের প্রথম ওয়ার্কফ্লো হলো কন্টিনিউয়াস ইন্টিগ্রেশন: প্রতি push ও pull request-এ আপনার টেস্ট ও লিন্টার চালান যাতে একটি ভাঙা পরিবর্তন মার্জের আগেই ধরা পড়ে। সেখান থেকে টিম প্যাকেজ প্রকাশ, একটি tag-এ ডিপ্লয়, নির্ধারিত রক্ষণাবেক্ষণ বা স্বয়ংক্রিয় ইস্যু-লেবেলিংয়ের জন্য ওয়ার্কফ্লো যোগ করে। প্রতিটি পরিবর্তনের পর একই হাতে-করা ধাপ করতে দেখলে সেটাই সংকেত যে সেগুলো একটি ওয়ার্কফ্লোতে নেওয়ার সময়।') },
        { p: l('You do not need Actions for a throwaway script or a repo no one else touches — the setup cost outweighs the benefit. But the moment more than one person, or more than one machine, works on the code, the consistency a workflow enforces pays for itself quickly.', 'একটি ফেলে-দেওয়া স্ক্রিপ্ট বা এমন রিপো যেখানে আর কেউ হাত দেয় না তার জন্য Actions লাগে না—সেটআপ খরচ সুবিধার চেয়ে বেশি। কিন্তু যেই মুহূর্তে একজনের বেশি মানুষ, বা একটির বেশি মেশিন কোডে কাজ করে, একটি ওয়ার্কফ্লো যে সামঞ্জস্য রক্ষা করে তা দ্রুত নিজের খরচ তুলে আনে।') },
      ],
    },
    {
      h: l('Common mistakes', 'সাধারণ ভুল'),
      blocks: [
        { list: [
          l('Indenting with tabs or inconsistent spaces, so GitHub rejects the file and the whole workflow silently never runs.', 'ট্যাব বা অসামঞ্জস্য স্পেসে ইনডেন্ট করা, ফলে গিটহাব ফাইল প্রত্যাখ্যান করে ও পুরো ওয়ার্কফ্লো নীরবে কখনো চলে না।'),
          l('Putting the YAML file anywhere other than .github/workflows/ — a file in the repo root is never picked up.', 'YAML ফাইলটি .github/workflows/ ছাড়া অন্য কোথাও রাখা—রিপো রুটের একটি ফাইল কখনো নেওয়া হয় না।'),
          l('Forgetting the space after a colon (key:value instead of key: value), which is invalid YAML.', 'কোলনের পরে স্পেস ভুলে যাওয়া (key: value-এর বদলে key:value), যা অবৈধ YAML।'),
          l('Choosing triggers too broadly, so a docs-only change runs the full pipeline and wastes minutes.', 'ট্রিগার খুব প্রশস্তভাবে বাছা, ফলে শুধু ডকস-পরিবর্তনও পুরো পাইপলাইন চালিয়ে মিনিট নষ্ট করে।'),
        ] },
      ],
    },
    {
      h: l('Remember in one line', 'এক লাইনে মনে রাখুন'),
      blocks: [
        { list: [
          l('GitHub Actions runs YAML workflows in .github/workflows/ automatically when a chosen event fires.', 'গিটহাব অ্যাকশন একটি বাছাই করা ইভেন্ট ঘটলে .github/workflows/-এর YAML ওয়ার্কফ্লো স্বয়ংক্রিয়ভাবে চালায়।'),
          l('YAML is indentation-based: use spaces, never tabs, and two spaces per level, consistently.', 'YAML ইনডেন্টেশন-নির্ভর: স্পেস নিন, কখনো ট্যাব নয়, আর ধারাবাহিকভাবে প্রতি স্তরে দুই স্পেস।'),
          l('Start with a CI workflow that tests every push and pull request, then automate more from there.', 'প্রতি push ও pull request টেস্ট করা একটি CI ওয়ার্কফ্লো দিয়ে শুরু করুন, তারপর সেখান থেকে আরও অটোমেট করুন।'),
        ] },
      ],
    },
  ],

  // ── git-workflow-anatomy · Anatomy of a workflow ──────────────────────────
  'git-workflow-anatomy': [
    {
      h: l('What makes up a workflow?', 'একটি ওয়ার্কফ্লো কী দিয়ে গঠিত?'),
      blocks: [
        { p: l('Every GitHub Actions workflow is built from the same four nested parts, and knowing them turns YAML from a wall of text into a readable outline. At the top is name (a label) and on (the triggers that start it). Below that come jobs — one or more units of work. Each job declares runs-on (which kind of runner machine to use) and holds an ordered list of steps. Each step either uses a prebuilt action or runs a shell command.', 'প্রতিটি গিটহাব অ্যাকশন ওয়ার্কফ্লো একই চারটি নেস্টেড অংশ দিয়ে তৈরি, আর এগুলো জানলে YAML একটি টেক্সটের দেয়াল থেকে একটি পাঠযোগ্য রূপরেখায় পরিণত হয়। ওপরে থাকে name (একটি লেবেল) ও on (যে ট্রিগার এটি শুরু করে)। তার নিচে আসে jobs—এক বা একাধিক কাজের একক। প্রতিটি job ঘোষণা করে runs-on (কোন ধরনের রানার মেশিন ব্যবহার হবে) এবং একটি ক্রমিক step-এর তালিকা ধারণ করে। প্রতিটি step হয় একটি প্রি-বিল্ট অ্যাকশন uses করে অথবা একটি শেল কমান্ড run করে।') },
        { p: l('The problem this structure solves is organizing automation that has both parallel and sequential parts. Jobs run in parallel by default so independent work (say, tests on Linux and tests on Windows) finishes fast, while the steps inside one job always run in strict order so each can rely on the last. Understanding which is which — jobs parallel, steps sequential — is the single most useful mental model for reading and writing workflows.', 'এই গঠন যে সমস্যা সমাধান করে তা হলো এমন অটোমেশন সংগঠিত করা যাতে সমান্তরাল ও ক্রমিক দুই অংশই থাকে। job ডিফল্টে সমান্তরালে চলে যাতে স্বাধীন কাজ (ধরুন Linux-এ টেস্ট আর Windows-এ টেস্ট) দ্রুত শেষ হয়, আর একটি job-এর ভেতরের step সবসময় কঠোর ক্রমে চলে যাতে প্রতিটি আগেরটির ওপর নির্ভর করতে পারে। কোনটি কী—job সমান্তরাল, step ক্রমিক—তা বোঝাই ওয়ার্কফ্লো পড়া ও লেখার সবচেয়ে কাজের মানসিক মডেল।') },
        { note: l('Picture a recipe card. name and on say what dish and when to cook it; each job is a cooking station (grill, salad, dessert) that can work at the same time as the others; and the steps are the numbered instructions at one station, done strictly in order.', 'একটি রেসিপি কার্ড ভাবুন। name ও on বলে কোন পদ ও কখন রাঁধবেন; প্রতিটি job হলো একটি রান্নার স্টেশন (গ্রিল, স্যালাড, ডেজার্ট) যা অন্যগুলোর সঙ্গে একই সময়ে কাজ করতে পারে; আর step হলো একটি স্টেশনের নম্বরযুক্ত নির্দেশ, কঠোরভাবে ক্রমে করা।'), kind: 'tip' },
      ],
    },
    {
      h: l('How the parts fit together', 'অংশগুলো কীভাবে একসঙ্গে বসে'),
      blocks: [
        { steps: [
          l('name and on sit at the top level and decide the workflow’s label and its triggers.', 'name ও on শীর্ষ স্তরে বসে এবং ওয়ার্কফ্লোর লেবেল ও ট্রিগার ঠিক করে।'),
          l('Under jobs you list one or more jobs by an id you choose (build, test, deploy).', 'jobs-এর নিচে আপনি আপনার বাছাই করা একটি id (build, test, deploy) দিয়ে এক বা একাধিক job তালিকা করেন।'),
          l('Each job sets runs-on to pick its runner, then lists steps that run top to bottom on that machine.', 'প্রতিটি job তার রানার বাছতে runs-on সেট করে, তারপর সেই মেশিনে ওপর থেকে নিচে চলা step তালিকা করে।'),
          l('The first step is almost always actions/checkout, which copies your repository onto the empty runner.', 'প্রথম step প্রায় সবসময় actions/checkout, যা আপনার রিপোজিটরি খালি রানারে কপি করে।'),
          l('If one job must wait for another, add needs: to name the job it depends on, turning parallel jobs into a sequence.', 'একটি job অন্যটির জন্য অপেক্ষা করতে হলে needs: যোগ করে যে job-এর ওপর নির্ভর করে তার নাম দিন, সমান্তরাল job-কে একটি ক্রমে পরিণত করে।'),
        ] },
        { code: `name: Build and test
on:
  push:
    branches: [main]
  pull_request:

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm ci
      - run: npm run build

  test:
    needs: build
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm ci
      - run: npm test`, caption: l('Two jobs: build runs first, and test waits for it via needs: build. Inside each job the steps run in order, starting with checkout.', 'দুটি job: build আগে চলে, আর test needs: build দিয়ে তার জন্য অপেক্ষা করে। প্রতিটি job-এর ভেতরে step ক্রমে চলে, checkout দিয়ে শুরু।') },
      ],
    },
    {
      h: l('Key keys of a workflow', 'একটি ওয়ার্কফ্লোর মূল কী'),
      blocks: [
        { table: {
          head: [l('YAML key', 'YAML কী'), l('What it means', 'যা বোঝায়')],
          rows: [
            [l('runs-on: ubuntu-latest', 'runs-on: ubuntu-latest'), l('Chooses the runner OS the job executes on.', 'job কোন রানার OS-এ চলবে তা বাছে।')],
            [l('uses: actions/checkout@v4', 'uses: actions/checkout@v4'), l('Runs a prebuilt action; checkout copies your repo onto the runner.', 'একটি প্রি-বিল্ট অ্যাকশন চালায়; checkout আপনার রিপো রানারে কপি করে।')],
            [l('run: npm test', 'run: npm test'), l('Runs a shell command on the runner.', 'রানারে একটি শেল কমান্ড চালায়।')],
            [l('needs: build', 'needs: build'), l('Makes this job wait until the named job finishes successfully.', 'নামযুক্ত job সফলভাবে শেষ না হওয়া পর্যন্ত এই job-কে অপেক্ষা করায়।')],
            [l('steps:', 'steps:'), l('The ordered list of work inside a single job.', 'একটি job-এর ভেতরের ক্রমিক কাজের তালিকা।')],
          ],
        } },
      ],
    },
    {
      h: l('When and where the anatomy matters', 'গঠন কখন ও কোথায় গুরুত্বপূর্ণ'),
      blocks: [
        { p: l('Reach for multiple jobs when parts of your pipeline are independent and can run at the same time — lint, unit tests, and a type check have no reason to wait for one another, so splitting them into parallel jobs makes the whole run finish sooner and shows a clear green or red per job. Reach for needs when there is a real dependency: you should not deploy until the build and tests have passed, so a deploy job with needs: [build, test] runs only after both succeed.', 'একাধিক job নিন যখন আপনার পাইপলাইনের অংশগুলো স্বাধীন ও একই সময়ে চলতে পারে—lint, ইউনিট টেস্ট ও একটি টাইপ চেকের একে অন্যের জন্য অপেক্ষা করার কারণ নেই, তাই এগুলো সমান্তরাল job-এ ভাগ করলে পুরো রান দ্রুত শেষ হয় ও প্রতি job-এ স্পষ্ট সবুজ বা লাল দেখায়। needs নিন যখন সত্যিকারের নির্ভরতা থাকে: build ও টেস্ট পাস না হওয়া পর্যন্ত ডিপ্লয় করা উচিত নয়, তাই needs: [build, test] সহ একটি deploy job শুধু দুটোই সফল হলেই চলে।') },
        { p: l('Keep steps within a job for work that must share the same machine and state — checkout, install, then test all rely on the files the previous step produced, so they belong in one job as ordered steps. A good default shape is: a few parallel check jobs on pull requests, and a single deploy job gated by needs on the branch you release from.', 'একটি job-এর মধ্যে step রাখুন এমন কাজের জন্য যা একই মেশিন ও অবস্থা ভাগ করতেই হবে—checkout, install, তারপর test সবাই আগের step-এর তৈরি করা ফাইলের ওপর নির্ভর করে, তাই এগুলো ক্রমিক step হিসেবে এক job-এ থাকে। একটি ভালো ডিফল্ট আকার হলো: pull request-এ কয়েকটি সমান্তরাল চেক job, আর যে ব্রাঞ্চ থেকে রিলিজ করেন সেখানে needs দিয়ে গেট করা একটি deploy job।') },
      ],
    },
    {
      h: l('uses vs run: the two kinds of step', 'uses বনাম run: দুই ধরনের step'),
      blocks: [
        { p: l('Every step does one of two things. A uses step pulls in a prebuilt, shareable action — a small program someone published, like actions/checkout or actions/setup-node — and the @v4 after its name pins the major version so a surprise update cannot break your build. A run step executes a raw shell command on the runner, exactly as you would type it in a terminal. Most workflows are a handful of uses steps for setup wrapped around a few run steps that do your actual work.', 'প্রতিটি step দুটির একটি করে। একটি uses step একটি প্রি-বিল্ট, শেয়ারযোগ্য অ্যাকশন টেনে আনে—কারো প্রকাশ করা একটি ছোট প্রোগ্রাম, যেমন actions/checkout বা actions/setup-node—আর নামের পরের @v4 মেজর ভার্সন পিন করে যাতে একটি আকস্মিক আপডেট আপনার বিল্ড ভাঙতে না পারে। একটি run step রানারে একটি কাঁচা শেল কমান্ড চালায়, ঠিক যেমন আপনি টার্মিনালে টাইপ করতেন। বেশিরভাগ ওয়ার্কফ্লো হলো সেটআপের জন্য কয়েকটি uses step, যা আপনার আসল কাজ করা কয়েকটি run step-কে ঘিরে থাকে।') },
        { p: l('Choose uses when a well-maintained action already solves the problem — checking out code, installing a language, uploading an artifact, deploying to a cloud — because it hides the fiddly details and gets security fixes for free. Choose run for project-specific commands like npm test or a custom script. A good habit is to pin actions to a version tag you trust and to keep run steps short and readable, since anyone reviewing the workflow reads them like a recipe.', 'uses নিন যখন একটি ভালো-রক্ষণাবেক্ষণ করা অ্যাকশন ইতিমধ্যে সমস্যাটি সমাধান করে—কোড চেকআউট, একটি ভাষা ইনস্টল, একটি artifact আপলোড, একটি ক্লাউডে ডিপ্লয়—কারণ এটি খুঁটিনাটি লুকায় ও বিনামূল্যে নিরাপত্তা ফিক্স পায়। run নিন প্রকল্প-নির্দিষ্ট কমান্ডের জন্য যেমন npm test বা একটি কাস্টম স্ক্রিপ্ট। একটি ভালো অভ্যাস হলো অ্যাকশনগুলো আপনার বিশ্বাস করা একটি ভার্সন ট্যাগে পিন করা ও run step ছোট ও পাঠযোগ্য রাখা, কারণ ওয়ার্কফ্লো রিভিউ করা যে কেউ এগুলো একটি রেসিপির মতো পড়ে।') },
      ],
    },
    {
      h: l('Common mistakes', 'সাধারণ ভুল'),
      blocks: [
        { list: [
          l('Forgetting the checkout step, so the job runs against an empty workspace with none of your code and fails immediately.', 'checkout ধাপ ভুলে যাওয়া, ফলে job আপনার কোড ছাড়া একটি খালি ওয়ার্কস্পেসে চলে ও সঙ্গে সঙ্গে ব্যর্থ হয়।'),
          l('Assuming jobs run in order — they run in parallel unless you connect them with needs:.', 'ধরে নেওয়া job ক্রমে চলে—needs: দিয়ে যুক্ত না করলে এগুলো সমান্তরালে চলে।'),
          l('Expecting files or installed tools to survive from one job to the next; each job starts on a fresh runner with nothing shared.', 'আশা করা যে ফাইল বা ইনস্টল করা টুল এক job থেকে পরের job-এ টিকে থাকবে; প্রতিটি job একটি টাটকা রানারে শুরু হয়, কিছুই ভাগ করা থাকে না।'),
          l('Repeating checkout and install correctly in each job but forgetting that steps, not jobs, are where sequential state lives.', 'প্রতিটি job-এ checkout ও install ঠিকভাবে পুনরাবৃত্তি করা কিন্তু ভুলে যাওয়া যে ক্রমিক অবস্থা job-এ নয়, step-এ থাকে।'),
        ] },
      ],
    },
    {
      h: l('Remember in one line', 'এক লাইনে মনে রাখুন'),
      blocks: [
        { list: [
          l('A workflow = name + on + jobs; each job has runs-on and ordered steps that either use an action or run a command.', 'একটি ওয়ার্কফ্লো = name + on + jobs; প্রতিটি job-এ runs-on ও ক্রমিক step থাকে যা হয় একটি অ্যাকশন uses করে বা একটি কমান্ড run করে।'),
          l('Jobs run in parallel; steps within a job run in strict order — wire dependencies with needs:.', 'job সমান্তরালে চলে; একটি job-এর step কঠোর ক্রমে চলে—নির্ভরতা needs: দিয়ে যুক্ত করুন।'),
          l('Start almost every job with actions/checkout, or the runner has none of your code.', 'প্রায় প্রতিটি job actions/checkout দিয়ে শুরু করুন, নইলে রানারে আপনার কোড থাকে না।'),
        ] },
      ],
    },
  ],

  // ── git-ci-pipeline · Build a CI pipeline ─────────────────────────────────
  'git-ci-pipeline': [
    {
      h: l('What is a CI pipeline?', 'একটি CI পাইপলাইন কী?'),
      blocks: [
        { p: l('A continuous integration (CI) pipeline is a workflow that automatically checks every change to your code the moment it is pushed or proposed in a pull request. A typical pipeline installs dependencies, runs the linter, runs the tests, and builds the project — and only reports green if all of them pass. Its whole purpose is to catch broken code early, automatically, so problems are found in minutes by a machine rather than days later by a user.', 'একটি কন্টিনিউয়াস ইন্টিগ্রেশন (CI) পাইপলাইন হলো একটি ওয়ার্কফ্লো যা আপনার কোডে করা প্রতিটি পরিবর্তন push করা বা pull request-এ প্রস্তাব করার মুহূর্তেই স্বয়ংক্রিয়ভাবে যাচাই করে। একটি সাধারণ পাইপলাইন ডিপেন্ডেন্সি ইনস্টল করে, লিন্টার চালায়, টেস্ট চালায় ও প্রকল্প বিল্ড করে—আর সব পাস করলেই কেবল সবুজ দেখায়। এর পুরো উদ্দেশ্য হলো ভাঙা কোড আগেভাগে, স্বয়ংক্রিয়ভাবে ধরা, যাতে সমস্যা কয়েক দিন পরে একজন ব্যবহারকারী নয়, বরং কয়েক মিনিটে একটি মেশিন খুঁজে পায়।') },
        { p: l('The problem CI solves is integration pain. When many people merge changes into one codebase, small incompatibilities pile up silently until something breaks and no one knows which change did it. CI attacks this by testing every change in isolation before it merges, keeping the main branch always in a known-good, buildable state. Combined with branch protection, a red pipeline can block a merge outright, so broken code physically cannot reach main.', 'CI যে সমস্যা সমাধান করে তা হলো ইন্টিগ্রেশনের যন্ত্রণা। যখন অনেকে একটি কোডবেসে পরিবর্তন মার্জ করে, ছোট ছোট অসঙ্গতি নীরবে জমতে থাকে যতক্ষণ না কিছু ভেঙে যায় ও কেউ জানে না কোন পরিবর্তনটি করেছে। CI এতে আঘাত করে প্রতিটি পরিবর্তন মার্জের আগে আলাদাভাবে টেস্ট করে, main ব্রাঞ্চকে সবসময় একটি জানা-ভালো, বিল্ডযোগ্য অবস্থায় রেখে। branch protection-এর সঙ্গে মিলে একটি লাল পাইপলাইন সরাসরি মার্জ আটকাতে পারে, তাই ভাঙা কোড শারীরিকভাবে main-এ পৌঁছাতে পারে না।') },
        { note: l('A CI pipeline is an assembly-line inspector: every part is checked at the gate before it is allowed onto the main track. A defective part is stopped at the inspection station, not discovered later in a customer’s hands.', 'একটি CI পাইপলাইন হলো একটি অ্যাসেম্বলি-লাইন পরিদর্শক: প্রতিটি অংশ মূল ট্র্যাকে ওঠার আগে গেটে যাচাই হয়। একটি ত্রুটিপূর্ণ অংশ পরিদর্শন স্টেশনেই থামানো হয়, পরে গ্রাহকের হাতে ধরা পড়ে না।'), kind: 'tip' },
      ],
    },
    {
      h: l('How to build one, step by step', 'কীভাবে একটি বানাবেন, ধাপে ধাপে'),
      blocks: [
        { steps: [
          l('Trigger the pipeline on push and pull_request so every change is checked before and after review.', 'push ও pull_request-এ পাইপলাইন ট্রিগার করুন যাতে প্রতিটি পরিবর্তন রিভিউর আগে ও পরে যাচাই হয়।'),
          l('Check out the code, then set up your language with a caching action so dependencies are not re-downloaded every run.', 'কোড চেকআউট করুন, তারপর একটি ক্যাশিং অ্যাকশন দিয়ে আপনার ভাষা সেট করুন যাতে প্রতি রানে ডিপেন্ডেন্সি আবার ডাউনলোড না হয়।'),
          l('Install dependencies with a reproducible command — npm ci, not npm install — so the build matches the lockfile exactly.', 'একটি পুনরুৎপাদনযোগ্য কমান্ড দিয়ে ডিপেন্ডেন্সি ইনস্টল করুন—npm ci, npm install নয়—যাতে বিল্ড ঠিক লকফাইলের সঙ্গে মেলে।'),
          l('Run the quality gates in order: lint, then test, then build. Any failure turns the run red.', 'মান-গেটগুলো ক্রমে চালান: lint, তারপর test, তারপর build। যেকোনো ব্যর্থতা রানকে লাল করে।'),
          l('Optionally use a matrix to run the same steps across several language versions in parallel, and upload reports as artifacts.', 'ঐচ্ছিকভাবে একটি matrix ব্যবহার করে একই step কয়েকটি ভাষা-ভার্সনে সমান্তরালে চালান, ও রিপোর্ট artifact হিসেবে আপলোড করুন।'),
        ] },
        { code: `name: CI
on: [push, pull_request]

jobs:
  verify:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        node: [18, 20, 22]
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: matrix.node
          cache: npm
      - run: npm ci
      - run: npm run lint
      - run: npm test
      - run: npm run build
      - uses: actions/upload-artifact@v4
        with:
          name: coverage
          path: coverage/`, caption: l('The matrix runs the whole job three times in parallel, once per Node version. Write node-version: matrix.node bare here — in a real file matrix.node goes inside the Actions expression wrapper so GitHub substitutes each value.', 'matrix পুরো job তিনবার সমান্তরালে চালায়, প্রতি Node ভার্সনে একবার। এখানে node-version: matrix.node বেয়ার লিখুন—বাস্তব ফাইলে matrix.node Actions এক্সপ্রেশন র‍্যাপারের ভেতরে বসে যাতে গিটহাব প্রতিটি মান বসায়।') },
      ],
    },
    {
      h: l('Key pieces of a pipeline', 'একটি পাইপলাইনের মূল অংশ'),
      blocks: [
        { table: {
          head: [l('Goal', 'লক্ষ্য'), l('YAML / command', 'YAML / কমান্ড')],
          rows: [
            [l('Set up the language + cache deps', 'ভাষা সেট + ডিপেন্ডেন্সি ক্যাশ'), l('uses: actions/setup-node@v4', 'uses: actions/setup-node@v4')],
            [l('Install reproducibly from the lockfile', 'লকফাইল থেকে পুনরুৎপাদনযোগ্য ইনস্টল'), l('run: npm ci', 'run: npm ci')],
            [l('Test across several versions', 'কয়েকটি ভার্সনে টেস্ট'), l('strategy: matrix', 'strategy: matrix')],
            [l('Save a build or test report', 'একটি বিল্ড বা টেস্ট রিপোর্ট রাখা'), l('uses: actions/upload-artifact@v4', 'uses: actions/upload-artifact@v4')],
            [l('Run the quality gates', 'মান-গেট চালান'), l('run: npm run lint / npm test / npm run build', 'run: npm run lint / npm test / npm run build')],
          ],
        } },
      ],
    },
    {
      h: l('When and where to use a pipeline', 'কখন ও কোথায় পাইপলাইন ব্যবহার করবেন'),
      blocks: [
        { p: l('Add CI as early as the project has a test suite or a build worth protecting, and certainly the moment a second person joins. The value grows with the team: the more contributors and the faster the merge rate, the more a pipeline saves you from broken builds and mystery regressions. Pair it with branch protection so pull requests cannot merge until the pipeline is green, and CI stops being advisory and becomes a real gate.', 'প্রকল্পে একটি টেস্ট সুইট বা রক্ষা করার মতো বিল্ড থাকলেই CI যোগ করুন, আর অবশ্যই যেই মুহূর্তে দ্বিতীয় একজন যোগ দেয়। মূল্য টিমের সঙ্গে বাড়ে: যত বেশি অবদানকারী ও যত দ্রুত মার্জ হার, একটি পাইপলাইন তত বেশি আপনাকে ভাঙা বিল্ড ও রহস্যময় রিগ্রেশন থেকে বাঁচায়। এটিকে branch protection-এর সঙ্গে জুড়ুন যাতে পাইপলাইন সবুজ না হওয়া পর্যন্ত pull request মার্জ করা না যায়, তখন CI পরামর্শ থেকে একটি সত্যিকারের গেট হয়ে ওঠে।') },
        { note: l('A slow or flaky pipeline is worse than none, because developers start ignoring it or merging around it. Keep runs fast (cache dependencies, run jobs in parallel) and fix flaky tests promptly, or the team loses trust in the green check.', 'একটি ধীর বা ফ্লেকি পাইপলাইন না থাকার চেয়েও খারাপ, কারণ ডেভেলপাররা এটি উপেক্ষা করতে বা এর চারপাশ দিয়ে মার্জ করতে শুরু করে। রান দ্রুত রাখুন (ডিপেন্ডেন্সি ক্যাশ করুন, job সমান্তরালে চালান) ও ফ্লেকি টেস্ট দ্রুত ঠিক করুন, নইলে টিম সবুজ চেকের ওপর আস্থা হারায়।'), kind: 'warn' },
      ],
    },
    {
      h: l('Making the pipeline fast and trustworthy', 'পাইপলাইন দ্রুত ও নির্ভরযোগ্য করা'),
      blocks: [
        { p: l('A pipeline is only useful if people trust it and it does not slow them down. Two things earn that trust: speed and reliability. For speed, cache dependencies (the setup-node action can cache your npm downloads), run independent checks as parallel jobs or a matrix instead of one long chain, and only trigger the heavy pipeline on changes that need it. For reliability, hunt down flaky tests — ones that pass and fail on the same code — because a single unreliable test teaches everyone to ignore red runs.', 'একটি পাইপলাইন তখনই কাজের যখন মানুষ এতে আস্থা রাখে ও এটি তাদের ধীর করে না। দুটি জিনিস সেই আস্থা অর্জন করে: গতি ও নির্ভরযোগ্যতা। গতির জন্য ডিপেন্ডেন্সি ক্যাশ করুন (setup-node অ্যাকশন আপনার npm ডাউনলোড ক্যাশ করতে পারে), স্বাধীন চেকগুলো একটি লম্বা শৃঙ্খলের বদলে সমান্তরাল job বা একটি matrix হিসেবে চালান, ও শুধু যেসব পরিবর্তনে দরকার সেখানেই ভারী পাইপলাইন ট্রিগার করুন। নির্ভরযোগ্যতার জন্য ফ্লেকি টেস্ট খুঁজে বের করুন—যেগুলো একই কোডে পাস ও ফেল করে—কারণ একটিমাত্র অনির্ভরযোগ্য টেস্ট সবাইকে লাল রান উপেক্ষা করতে শেখায়।') },
        { list: [
          l('Cache dependencies so each run does not re-download everything from scratch.', 'ডিপেন্ডেন্সি ক্যাশ করুন যাতে প্রতি রান শূন্য থেকে সবকিছু আবার ডাউনলোড না করে।'),
          l('Split independent checks (lint, test, type-check) into parallel jobs so the slowest one sets the total time.', 'স্বাধীন চেক (lint, test, type-check) সমান্তরাল job-এ ভাগ করুন যাতে সবচেয়ে ধীরটিই মোট সময় ঠিক করে।'),
          l('Make the pipeline a required status check with branch protection, so red truly blocks the merge.', 'branch protection দিয়ে পাইপলাইনকে একটি প্রয়োজনীয় status চেক করুন, যাতে লাল সত্যিই মার্জ আটকায়।'),
          l('Fix or quarantine flaky tests immediately; a pipeline no one trusts is quietly worked around.', 'ফ্লেকি টেস্ট সঙ্গে সঙ্গে ঠিক বা আলাদা করুন; যে পাইপলাইনে কেউ আস্থা রাখে না তার চারপাশ দিয়ে নীরবে কাজ চলে।'),
        ] },
      ],
    },
    {
      h: l('Common mistakes', 'সাধারণ ভুল'),
      blocks: [
        { list: [
          l('Running npm install instead of npm ci in CI, so builds are non-reproducible and silent lockfile drift slips through.', 'CI-তে npm ci-এর বদলে npm install চালানো, ফলে বিল্ড পুনরুৎপাদনযোগ্য নয় ও নীরব লকফাইল ড্রিফট গলে যায়।'),
          l('Not caching dependencies, so every run re-downloads everything and the pipeline crawls.', 'ডিপেন্ডেন্সি ক্যাশ না করা, ফলে প্রতি রান সবকিছু আবার ডাউনলোড করে ও পাইপলাইন হামাগুড়ি দেয়।'),
          l('Tolerating flaky tests that fail at random, which trains everyone to re-run until green and ignore real failures.', 'এলোমেলোভাবে ব্যর্থ হওয়া ফ্লেকি টেস্ট সহ্য করা, যা সবাইকে সবুজ না হওয়া পর্যন্ত আবার চালাতে ও আসল ব্যর্থতা উপেক্ষা করতে শেখায়।'),
          l('Building a giant single job when parallel jobs or a matrix would finish far faster and pinpoint failures better.', 'যেখানে সমান্তরাল job বা একটি matrix অনেক দ্রুত শেষ করত ও ব্যর্থতা ভালোভাবে চিহ্নিত করত সেখানে একটি বিশাল একক job বানানো।'),
        ] },
      ],
    },
    {
      h: l('Remember in one line', 'এক লাইনে মনে রাখুন'),
      blocks: [
        { list: [
          l('A CI pipeline installs, lints, tests, and builds on every push and pull request to catch breakage before it merges.', 'একটি CI পাইপলাইন প্রতি push ও pull request-এ ইনস্টল, লিন্ট, টেস্ট ও বিল্ড করে যাতে ভাঙন মার্জের আগে ধরা পড়ে।'),
          l('Use npm ci for reproducible installs, cache dependencies, and a matrix to test several versions in parallel.', 'পুনরুৎপাদনযোগ্য ইনস্টলে npm ci নিন, ডিপেন্ডেন্সি ক্যাশ করুন, ও কয়েকটি ভার্সন সমান্তরালে টেস্ট করতে একটি matrix নিন।'),
          l('Keep it fast and reliable, and gate merges on it — a slow or flaky pipeline gets ignored.', 'এটি দ্রুত ও নির্ভরযোগ্য রাখুন, ও এর ওপর মার্জ গেট করুন—ধীর বা ফ্লেকি পাইপলাইন উপেক্ষিত হয়।'),
        ] },
      ],
    },
  ],

  // ── git-secrets-deploy · Secrets, artifacts & deploy ──────────────────────
  'git-secrets-deploy': [
    {
      h: l('What are secrets and deploys in Actions?', 'Actions-এ সিক্রেট ও ডিপ্লয় কী?'),
      blocks: [
        { p: l('Deploying from a workflow needs credentials — an API token, a registry password, a cloud key — and those must never be written into your YAML, because the file is committed and often public. GitHub solves this with secrets: encrypted values you store in the repository or environment settings. A job reads a secret through the secrets context at run time, GitHub injects it into the step, and it is automatically masked in the logs so it never appears in plain text.', 'একটি ওয়ার্কফ্লো থেকে ডিপ্লয় করতে ক্রেডেনশিয়াল দরকার—একটি API টোকেন, একটি রেজিস্ট্রি পাসওয়ার্ড, একটি ক্লাউড কী—আর সেগুলো কখনো আপনার YAML-এ লেখা যাবে না, কারণ ফাইলটি কমিট হয় ও প্রায়ই পাবলিক। গিটহাব এটি সমাধান করে সিক্রেট দিয়ে: এনক্রিপ্টেড মান যা আপনি রিপোজিটরি বা environment সেটিংসে রাখেন। একটি job চলার সময় secrets কনটেক্সট দিয়ে একটি সিক্রেট পড়ে, গিটহাব তা step-এ ঢোকায়, আর এটি লগে স্বয়ংক্রিয়ভাবে মাস্ক করা হয় যাতে কখনো প্লেইন টেক্সটে না দেখায়।') },
        { p: l('Two more pieces complete the deploy story. Permissions let you scope the automatic GITHUB_TOKEN to the least access a job needs, shrinking the damage if a step is ever compromised. Environments (like production) add protection rules — required reviewers, wait timers, and environment-specific secrets — so a deploy can be gated behind an approval. Together, secrets, permissions, and environments let a workflow deploy safely without ever exposing a credential.', 'আরও দুটি অংশ ডিপ্লয়ের গল্প সম্পূর্ণ করে। permission আপনাকে স্বয়ংক্রিয় GITHUB_TOKEN-কে একটি job-এর ন্যূনতম প্রয়োজনীয় অ্যাক্সেসে সীমিত করতে দেয়, কোনো step আপস হলে ক্ষতি ছোট করে। environment (যেমন production) সুরক্ষা নিয়ম যোগ করে—প্রয়োজনীয় রিভিউয়ার, অপেক্ষা টাইমার ও environment-নির্দিষ্ট সিক্রেট—যাতে একটি ডিপ্লয় একটি অনুমোদনের পেছনে গেট করা যায়। একসঙ্গে সিক্রেট, permission ও environment একটি ওয়ার্কফ্লোকে কখনো একটি ক্রেডেনশিয়াল ফাঁস না করেই নিরাপদে ডিপ্লয় করতে দেয়।') },
        { note: l('A secret is a sealed envelope the workflow can use but never read aloud — GitHub hands it to the step and masks it in the logs. An artifact or a step output is a shared clipboard: a place to hand a file or a value from one step or job to the next.', 'একটি সিক্রেট হলো একটি সিলড খাম যা ওয়ার্কফ্লো ব্যবহার করতে পারে কিন্তু কখনো জোরে পড়ে না—গিটহাব এটি step-কে দেয় ও লগে মাস্ক করে। একটি artifact বা একটি step আউটপুট হলো একটি শেয়ার্ড ক্লিপবোর্ড: এক step বা job থেকে পরেরটিতে একটি ফাইল বা একটি মান হস্তান্তরের জায়গা।'), kind: 'tip' },
      ],
    },
    {
      h: l('How a gated deploy works, step by step', 'একটি গেট-করা ডিপ্লয় কীভাবে কাজ করে, ধাপে ধাপে'),
      blocks: [
        { steps: [
          l('Store the credential once in Settings as a repository or environment secret — it is encrypted and never shown again.', 'ক্রেডেনশিয়ালটি একবার Settings-এ একটি রিপোজিটরি বা environment সিক্রেট হিসেবে রাখুন—এটি এনক্রিপ্টেড ও আর কখনো দেখানো হয় না।'),
          l('At the top of the workflow, set permissions to the minimum the job needs (for example contents: read).', 'ওয়ার্কফ্লোর ওপরে permission-কে job-এর ন্যূনতম প্রয়োজনে সেট করুন (যেমন contents: read)।'),
          l('Put the deploy in a job that names an environment, so GitHub applies that environment’s approval and protection rules first.', 'ডিপ্লয়টি এমন একটি job-এ রাখুন যা একটি environment নাম দেয়, যাতে গিটহাব প্রথমে সেই environment-এর অনুমোদন ও সুরক্ষা নিয়ম প্রয়োগ করে।'),
          l('Pass the secret into the step as an env value, then reference the environment variable in your run command — never echo the secret itself.', 'সিক্রেটটি step-এ একটি env মান হিসেবে পাঠান, তারপর আপনার run কমান্ডে সেই environment ভেরিয়েবলটি রেফার করুন—কখনো সিক্রেটটি নিজে echo করবেন না।'),
          l('Hand values or files between steps and jobs through the GITHUB_OUTPUT file or uploaded artifacts, not by printing them.', 'GITHUB_OUTPUT ফাইল বা আপলোড করা artifact দিয়ে step ও job-এর মধ্যে মান বা ফাইল হস্তান্তর করুন, প্রিন্ট করে নয়।'),
        ] },
        { code: `name: Deploy
on:
  push:
    tags: ['v*']

permissions:
  contents: read

jobs:
  publish:
    runs-on: ubuntu-latest
    environment: production
    steps:
      - uses: actions/checkout@v4
      - name: Publish package
        env:
          NPM_TOKEN: secrets.NPM_TOKEN
        run: npm publish
      - name: Record deployed commit
        id: meta
        run: echo "sha=$GITHUB_SHA" >> "$GITHUB_OUTPUT"`, caption: l('Write NPM_TOKEN: secrets.NPM_TOKEN bare here — in a real file secrets.NPM_TOKEN goes inside the Actions expression wrapper. The run command uses the env var, never the secret directly, and $GITHUB_SHA / $GITHUB_OUTPUT are ordinary shell variables on the runner.', 'এখানে NPM_TOKEN: secrets.NPM_TOKEN বেয়ার লিখুন—বাস্তব ফাইলে secrets.NPM_TOKEN Actions এক্সপ্রেশন র‍্যাপারের ভেতরে বসে। run কমান্ড env ভেরিয়েবল ব্যবহার করে, কখনো সিক্রেট সরাসরি নয়, আর $GITHUB_SHA / $GITHUB_OUTPUT রানারে সাধারণ শেল ভেরিয়েবল।') },
      ],
    },
    {
      h: l('Key keys for secure deploys', 'নিরাপদ ডিপ্লয়ের মূল কী'),
      blocks: [
        { table: {
          head: [l('Goal', 'লক্ষ্য'), l('YAML / command', 'YAML / কমান্ড')],
          rows: [
            [l('Read a stored secret', 'সংরক্ষিত সিক্রেট পড়ুন'), l('secrets.TOKEN (inside the Actions expression wrapper)', 'secrets.TOKEN (Actions এক্সপ্রেশন র‍্যাপারের ভেতরে)')],
            [l('Limit the token scope', 'টোকেন স্কোপ সীমিত করুন'), l('permissions: contents: read', 'permissions: contents: read')],
            [l('Pass data between steps', 'step-এর মধ্যে ডেটা পাঠান'), l('echo "k=v" >> "$GITHUB_OUTPUT"', 'echo "k=v" >> "$GITHUB_OUTPUT"')],
            [l('Gate a job behind approval', 'অনুমোদনের পেছনে job গেট করুন'), l('environment: production', 'environment: production')],
            [l('Persist a build output', 'একটি বিল্ড আউটপুট রাখুন'), l('uses: actions/upload-artifact@v4', 'uses: actions/upload-artifact@v4')],
          ],
        } },
      ],
    },
    {
      h: l('When and where to use these', 'কখন ও কোথায় এগুলো ব্যবহার করবেন'),
      blocks: [
        { p: l('Use a secret for any credential a workflow needs — publishing tokens, deploy keys, cloud credentials — the instant the value is sensitive. Use least-privilege permissions on every workflow, not just deploys: defaulting the GITHUB_TOKEN to read-only and granting write only where required limits how much a malicious or buggy step can do. Reserve environments for the deploys that matter, especially production, where a required reviewer and environment-scoped secrets give you an approval gate and an audit trail.', 'একটি ওয়ার্কফ্লোর প্রয়োজনীয় যেকোনো ক্রেডেনশিয়ালের জন্য একটি সিক্রেট ব্যবহার করুন—পাবলিশিং টোকেন, ডিপ্লয় কী, ক্লাউড ক্রেডেনশিয়াল—যেই মুহূর্তে মানটি সংবেদনশীল। শুধু ডিপ্লয় নয়, প্রতিটি ওয়ার্কফ্লোতে least-privilege permission নিন: GITHUB_TOKEN-কে ডিফল্টে রিড-অনলি রেখে শুধু যেখানে দরকার সেখানে write দিলে একটি ক্ষতিকর বা বাগযুক্ত step কতটা করতে পারে তা সীমিত হয়। যে ডিপ্লয়গুলো গুরুত্বপূর্ণ, বিশেষত production, তার জন্য environment রাখুন, যেখানে একটি প্রয়োজনীয় রিভিউয়ার ও environment-স্কোপড সিক্রেট আপনাকে একটি অনুমোদন গেট ও একটি অডিট ট্রেইল দেয়।') },
        { note: l('The one unforgivable mistake is printing a secret. Running echo on a secret, or dumping the whole environment, writes it into the build log — which on a public repo is visible to the world forever. Pass secrets only as env values and reference the variable; never log the value itself.', 'একমাত্র ক্ষমার অযোগ্য ভুল হলো একটি সিক্রেট প্রিন্ট করা। একটি সিক্রেটে echo চালানো, বা পুরো environment ডাম্প করা, তা বিল্ড লগে লিখে দেয়—যা একটি পাবলিক রিপোতে চিরকাল বিশ্বের কাছে দৃশ্যমান। সিক্রেট শুধু env মান হিসেবে পাঠান ও ভেরিয়েবলটি রেফার করুন; কখনো মানটি নিজে লগ করবেন না।'), kind: 'warn' },
      ],
    },
    {
      h: l('Artifacts vs step outputs: passing data along', 'artifact বনাম step আউটপুট: ডেটা এগিয়ে দেওয়া'),
      blocks: [
        { p: l('Because every job starts on a fresh runner with nothing shared, you need explicit ways to hand data forward, and there are two. A step output is for a small value — a version string, a computed tag, a short flag — written to the GITHUB_OUTPUT file in one step and read by a later step. An artifact is for files: a built bundle, a coverage report, a compiled binary, uploaded with the upload-artifact action so a later job (or a human) can download it after the run.', 'যেহেতু প্রতিটি job একটি টাটকা রানারে শুরু হয় যাতে কিছুই ভাগ করা থাকে না, আপনার ডেটা সামনে হস্তান্তরের স্পষ্ট উপায় দরকার, আর দুটি আছে। একটি step আউটপুট একটি ছোট মানের জন্য—একটি ভার্সন স্ট্রিং, একটি হিসাব-করা tag, একটি ছোট ফ্ল্যাগ—যা এক step-এ GITHUB_OUTPUT ফাইলে লেখা হয় ও পরের একটি step পড়ে। একটি artifact ফাইলের জন্য: একটি বিল্ট বান্ডল, একটি coverage রিপোর্ট, একটি কম্পাইল করা বাইনারি, upload-artifact অ্যাকশন দিয়ে আপলোড করা যাতে পরের একটি job (বা একজন মানুষ) রানের পরে তা ডাউনলোড করতে পারে।') },
        { p: l('The rule of thumb: outputs for tiny strings, artifacts for whole files. A common pattern is a build job that compiles the app and uploads the result as an artifact, and a separate deploy job that downloads that same artifact and ships it — so the exact bytes that were tested are the bytes that go live. Neither path ever requires printing a secret, which keeps sensitive values out of the shared clipboard entirely.', 'মোটা দাগে নিয়ম: ছোট স্ট্রিংয়ে আউটপুট, পুরো ফাইলে artifact। একটি সাধারণ প্যাটার্ন হলো একটি build job যা অ্যাপ কম্পাইল করে ও ফলটি একটি artifact হিসেবে আপলোড করে, আর একটি আলাদা deploy job যা সেই একই artifact ডাউনলোড করে শিপ করে—যাতে যে বাইটগুলো টেস্ট হয়েছিল সেই বাইটগুলোই লাইভ যায়। কোনো পথেই কখনো একটি সিক্রেট প্রিন্ট করার দরকার হয় না, যা সংবেদনশীল মান পুরোপুরি শেয়ার্ড ক্লিপবোর্ডের বাইরে রাখে।') },
      ],
    },
    {
      h: l('Common mistakes', 'সাধারণ ভুল'),
      blocks: [
        { list: [
          l('Printing a secret with echo in a step, exposing it in the public build logs forever.', 'একটি step-এ echo দিয়ে সিক্রেট প্রিন্ট করা, তা চিরকালের জন্য পাবলিক বিল্ড লগে ফাঁস করা।'),
          l('Hard-coding a token directly in the YAML instead of storing it as a secret — it is then committed into history.', 'সিক্রেট হিসেবে না রেখে সরাসরি YAML-এ একটি টোকেন হার্ড-কোড করা—তখন এটি ইতিহাসে কমিট হয়ে যায়।'),
          l('Granting the workflow broad write or admin permissions when it only needs to read, widening the blast radius.', 'ওয়ার্কফ্লোকে শুধু পড়া দরকার যখন তখন প্রশস্ত write বা admin permission দেওয়া, ক্ষতির পরিধি বাড়ানো।'),
          l('Deploying to production straight from a job with no environment gate, so nothing stands between a merge and a live release.', 'কোনো environment গেট ছাড়া সরাসরি একটি job থেকে production-এ ডিপ্লয় করা, ফলে একটি মার্জ ও একটি লাইভ রিলিজের মধ্যে কিছুই থাকে না।'),
        ] },
      ],
    },
    {
      h: l('Remember in one line', 'এক লাইনে মনে রাখুন'),
      blocks: [
        { list: [
          l('Store credentials as encrypted secrets and read them via the secrets context — never hard-code or print them.', 'ক্রেডেনশিয়াল এনক্রিপ্টেড সিক্রেট হিসেবে রাখুন ও secrets কনটেক্সট দিয়ে পড়ুন—কখনো হার্ড-কোড বা প্রিন্ট করবেন না।'),
          l('Scope permissions to least privilege, and pass data between steps through $GITHUB_OUTPUT or artifacts.', 'permission-কে least privilege-এ সীমিত করুন, ও step-এর মধ্যে ডেটা $GITHUB_OUTPUT বা artifact দিয়ে পাঠান।'),
          l('Gate real deploys behind an environment for approvals and protection — over-broad access or a leaked secret is a serious risk.', 'অনুমোদন ও সুরক্ষার জন্য আসল ডিপ্লয় একটি environment-এর পেছনে গেট করুন—অতি-প্রশস্ত অ্যাক্সেস বা ফাঁস সিক্রেট গুরুতর ঝুঁকি।'),
        ] },
      ],
    },
  ],

  // ── git-dependabot-conventions · Dependabot & commit conventions ──────────
  'git-dependabot-conventions': [
    {
      h: l('What are Dependabot & Conventional Commits?', 'Dependabot ও Conventional Commits কী?'),
      blocks: [
        { p: l('These are two conventions that let machines help maintain your project. Dependabot is a GitHub bot you configure with a .github/dependabot.yml file; it watches your dependencies and automatically opens pull requests to upgrade them — especially security patches — so you are never quietly running an outdated, vulnerable library. Conventional Commits is a simple format for commit messages: each message starts with a type like feat:, fix:, or docs:, which gives your history a structured, machine-readable shape.', 'এগুলো দুটি কনভেনশন যা মেশিনকে আপনার প্রকল্প রক্ষণাবেক্ষণে সাহায্য করতে দেয়। Dependabot হলো একটি গিটহাব বট যা আপনি একটি .github/dependabot.yml ফাইল দিয়ে কনফিগার করেন; এটি আপনার ডিপেন্ডেন্সি নজরে রাখে ও সেগুলো আপগ্রেড করতে স্বয়ংক্রিয়ভাবে pull request খোলে—বিশেষত নিরাপত্তা প্যাচ—যাতে আপনি কখনো নীরবে একটি পুরনো, দুর্বল লাইব্রেরি চালাচ্ছেন না। Conventional Commits হলো কমিট মেসেজের একটি সরল ফরম্যাট: প্রতিটি মেসেজ feat:, fix: বা docs:-এর মতো একটি টাইপ দিয়ে শুরু হয়, যা আপনার ইতিহাসকে একটি কাঠামোবদ্ধ, মেশিন-পাঠযোগ্য আকার দেয়।') },
        { p: l('The problem they solve together is manual, error-prone maintenance work. Upgrading dependencies by hand is tedious and easy to postpone until a security hole is months old; Dependabot makes each upgrade a small, reviewable PR. Writing free-form commit messages makes it impossible for tools to generate a changelog or decide the next version number; Conventional Commits encodes intent into the message so automation can read it. Both only pay off with consistency — the whole team has to follow them.', 'এরা একসঙ্গে যে সমস্যা সমাধান করে তা হলো হাতে-করা, ভুল-প্রবণ রক্ষণাবেক্ষণের কাজ। হাতে ডিপেন্ডেন্সি আপগ্রেড করা ক্লান্তিকর ও একটি নিরাপত্তা ছিদ্র কয়েক মাস পুরনো না হওয়া পর্যন্ত পিছিয়ে দেওয়া সহজ; Dependabot প্রতিটি আপগ্রেডকে একটি ছোট, রিভিউযোগ্য PR করে। মুক্ত-রূপের কমিট মেসেজ লিখলে টুলের পক্ষে একটি চেঞ্জলগ তৈরি বা পরের ভার্সন নম্বর ঠিক করা অসম্ভব; Conventional Commits উদ্দেশ্যকে মেসেজে এনকোড করে যাতে অটোমেশন তা পড়তে পারে। দুটোই শুধু সামঞ্জস্যে ফল দেয়—পুরো টিমকে এগুলো মানতে হয়।') },
        { note: l('Dependabot is a subscription that mails you upgrade suggestions you can accept with a click. Conventional Commits are a filing system with labelled folders (feat, fix, docs): a machine can sort and summarize your history because every entry is tagged.', 'Dependabot হলো একটি সাবস্ক্রিপশন যা আপনাকে আপগ্রেড পরামর্শ পাঠায় যা আপনি এক ক্লিকে গ্রহণ করতে পারেন। Conventional Commits হলো লেবেলযুক্ত ফোল্ডারের (feat, fix, docs) একটি ফাইলিং সিস্টেম: একটি মেশিন আপনার ইতিহাস বাছাই ও সারসংক্ষেপ করতে পারে কারণ প্রতিটি এন্ট্রি ট্যাগ করা।'), kind: 'tip' },
      ],
    },
    {
      h: l('How to set them up, step by step', 'কীভাবে সেট করবেন, ধাপে ধাপে'),
      blocks: [
        { steps: [
          l('Add a .github/dependabot.yml file with version: 2 at the top — this is the config Dependabot reads.', 'ওপরে version: 2 সহ একটি .github/dependabot.yml ফাইল যোগ করুন—এটাই সেই কনফিগ যা Dependabot পড়ে।'),
          l('For each ecosystem you use, add an updates entry naming package-ecosystem (npm, pip, github-actions), the directory, and a schedule.', 'আপনার ব্যবহৃত প্রতিটি ইকোসিস্টেমের জন্য একটি updates এন্ট্রি যোগ করুন যা package-ecosystem (npm, pip, github-actions), directory ও একটি schedule নাম দেয়।'),
          l('Dependabot then checks on that schedule and opens a small PR per available update, each with release notes.', 'Dependabot তখন সেই schedule-এ যাচাই করে ও প্রতিটি উপলব্ধ আপডেটে একটি ছোট PR খোলে, প্রতিটিতে রিলিজ নোটসহ।'),
          l('For your own commits, write the message as a type, an optional scope, and a short summary: feat(auth): add password reset.', 'নিজের কমিটের জন্য মেসেজটি একটি টাইপ, একটি ঐচ্ছিক স্কোপ ও একটি ছোট সারাংশ হিসেবে লিখুন: feat(auth): add password reset।'),
          l('Let CI, a changelog generator, or a release tool read those prefixes to automate versioning and release notes.', 'CI, একটি চেঞ্জলগ জেনারেটর বা একটি রিলিজ টুলকে সেই প্রিফিক্স পড়ে ভার্সনিং ও রিলিজ নোট অটোমেট করতে দিন।'),
        ] },
        { code: `# .github/dependabot.yml
version: 2
updates:
  - package-ecosystem: npm
    directory: /
    schedule:
      interval: weekly
  - package-ecosystem: github-actions
    directory: /
    schedule:
      interval: weekly

# Conventional Commit messages you write by hand:
#   feat(auth): add password reset flow
#   fix(api): handle null user on /profile
#   docs(readme): document the setup steps
#   chore(deps): bump eslint to 9.0.0`, caption: l('The dependabot.yml keeps both your npm packages and your workflow actions up to date weekly; the commit examples show the type(scope): summary format that tools can parse.', 'dependabot.yml আপনার npm প্যাকেজ ও ওয়ার্কফ্লো অ্যাকশন দুটোই সাপ্তাহিক হালনাগাদ রাখে; কমিট উদাহরণগুলো type(scope): summary ফরম্যাট দেখায় যা টুল পার্স করতে পারে।') },
      ],
    },
    {
      h: l('Key keys and commit types', 'মূল কী ও কমিট টাইপ'),
      blocks: [
        { table: {
          head: [l('Key / prefix', 'কী / প্রিফিক্স'), l('What it means', 'যা বোঝায়')],
          rows: [
            [l('.github/dependabot.yml', '.github/dependabot.yml'), l('The config file that turns Dependabot on for a repo.', 'যে কনফিগ ফাইল একটি রিপোতে Dependabot চালু করে।')],
            [l('package-ecosystem: npm', 'package-ecosystem: npm'), l('Which dependency system to watch (npm, pip, github-actions, ...).', 'কোন ডিপেন্ডেন্সি সিস্টেম নজরে রাখবে (npm, pip, github-actions, ...)।')],
            [l('feat(scope): message', 'feat(scope): message'), l('A commit that adds a new feature.', 'একটি কমিট যা একটি নতুন ফিচার যোগ করে।')],
            [l('fix(scope): message', 'fix(scope): message'), l('A commit that fixes a bug.', 'একটি কমিট যা একটি বাগ ঠিক করে।')],
            [l('docs: / chore:', 'docs: / chore:'), l('Documentation-only, or maintenance work like dependency bumps.', 'শুধু ডকুমেন্টেশন, বা ডিপেন্ডেন্সি বাম্পের মতো রক্ষণাবেক্ষণের কাজ।')],
          ],
        } },
      ],
    },
    {
      h: l('When and where to use them', 'কখন ও কোথায় ব্যবহার করবেন'),
      blocks: [
        { p: l('Turn on Dependabot for almost any real project with third-party dependencies — the security-update PRs alone justify it, and keeping small upgrades flowing steadily is far less painful than a giant catch-up months later. Tune the schedule (weekly is a sane default) and group or limit updates if the PR volume feels noisy, but do not switch it off; ignoring it just recreates the problem it solves.', 'তৃতীয়-পক্ষ ডিপেন্ডেন্সিযুক্ত প্রায় যেকোনো বাস্তব প্রকল্পে Dependabot চালু করুন—শুধু নিরাপত্তা-আপডেট PR-ই এটিকে যৌক্তিক করে, আর ছোট আপগ্রেড ধীরে ধীরে বইতে দেওয়া কয়েক মাস পরে একটি বিশাল ধরাধরির চেয়ে অনেক কম যন্ত্রণাদায়ক। schedule টিউন করুন (সাপ্তাহিক একটি বিচক্ষণ ডিফল্ট) ও PR-এর পরিমাণ ঘিঞ্জি মনে হলে আপডেট গ্রুপ বা সীমিত করুন, তবে বন্ধ করবেন না; উপেক্ষা করলে এটি যে সমস্যা সমাধান করে তা-ই ফিরে আসে।') },
        { p: l('Adopt Conventional Commits when a team wants automated changelogs, semantic version bumps, or simply a history that is easy to scan and filter. The catch is that the value comes only from consistency: if half the team writes feat: and the other half writes "stuff", the tooling breaks and the tags become noise. Agree on the format, enforce it with a commit-lint check in CI if you can, and it quietly powers your releases.', 'যখন একটি টিম স্বয়ংক্রিয় চেঞ্জলগ, semantic ভার্সন বাম্প, বা শুধু স্ক্যান ও ফিল্টার করা সহজ একটি ইতিহাস চায়, তখন Conventional Commits গ্রহণ করুন। বাধা হলো মূল্য শুধু সামঞ্জস্য থেকে আসে: টিমের অর্ধেক feat: লিখলে ও বাকি অর্ধেক "stuff" লিখলে টুলিং ভেঙে পড়ে ও ট্যাগ শব্দে পরিণত হয়। ফরম্যাটে একমত হন, পারলে CI-তে একটি commit-lint চেক দিয়ে তা প্রয়োগ করুন, তখন এটি নীরবে আপনার রিলিজ চালায়।') },
      ],
    },
    {
      h: l('Anatomy of a Conventional Commit', 'একটি Conventional Commit-এর গঠন'),
      blocks: [
        { p: l('A Conventional Commit message has a strict but simple shape: a type, an optional scope in parentheses, a colon and space, then a short imperative summary — for example fix(api): handle null user on /profile. The type is the important part: feat and fix are the two you will use most, while docs, chore, refactor, test, and style cover the rest. The optional scope narrows down which part of the code changed, which makes the history easy to filter.', 'একটি Conventional Commit মেসেজের একটি কঠোর কিন্তু সরল আকার আছে: একটি type, বন্ধনীতে একটি ঐচ্ছিক scope, একটি কোলন ও স্পেস, তারপর একটি ছোট ইম্পারেটিভ সারাংশ—যেমন fix(api): handle null user on /profile। type হলো গুরুত্বপূর্ণ অংশ: feat ও fix দুটি আপনি সবচেয়ে বেশি ব্যবহার করবেন, আর docs, chore, refactor, test ও style বাকিটা ঢাকে। ঐচ্ছিক scope কোডের কোন অংশ বদলেছে তা সংকীর্ণ করে, যা ইতিহাস ফিল্টার করা সহজ করে।') },
        { p: l('This structure is what lets release tooling work automatically. A run of fix: commits since the last release means the next version bumps its patch number; a feat: means a minor bump; and a breaking change — signalled by a ! after the type, as in feat!:, or a BREAKING CHANGE footer — means a major bump. The changelog then almost writes itself, grouping features and fixes from the exact same messages. That is the whole payoff: write the message in a fixed shape, and machines handle versioning and release notes for you.', 'এই গঠনই রিলিজ টুলিংকে স্বয়ংক্রিয়ভাবে কাজ করতে দেয়। শেষ রিলিজের পর থেকে fix: কমিটের একটি সারি মানে পরের ভার্সন তার patch নম্বর বাড়ায়; একটি feat: মানে একটি minor বাম্প; আর একটি breaking change—type-এর পর একটি ! দিয়ে সংকেত দেওয়া, যেমন feat!:, বা একটি BREAKING CHANGE ফুটার—মানে একটি major বাম্প। চেঞ্জলগ তখন প্রায় নিজেই লেখা হয়, ঠিক একই মেসেজ থেকে ফিচার ও ফিক্স গ্রুপ করে। এটাই পুরো লাভ: মেসেজটি একটি নির্দিষ্ট আকারে লিখুন, আর মেশিন আপনার জন্য ভার্সনিং ও রিলিজ নোট সামলায়।') },
      ],
    },
    {
      h: l('Common mistakes', 'সাধারণ ভুল'),
      blocks: [
        { list: [
          l('Ignoring Dependabot PRs for months, letting security patches and easy upgrades pile into a risky backlog.', 'মাসের পর মাস Dependabot PR উপেক্ষা করা, নিরাপত্তা প্যাচ ও সহজ আপগ্রেড ঝুঁকিপূর্ণ ব্যাকলগে জমতে দেওয়া।'),
          l('Merging a Dependabot PR blindly without letting CI run — an upgrade can still introduce a breaking change.', 'CI চালাতে না দিয়ে অন্ধভাবে একটি Dependabot PR মার্জ করা—একটি আপগ্রেড এখনো একটি breaking change আনতে পারে।'),
          l('Adopting Conventional Commits only halfway, so the mix of tagged and untagged messages breaks the tooling.', 'Conventional Commits শুধু অর্ধেক গ্রহণ করা, ফলে ট্যাগ করা ও ট্যাগ-না-করা মেসেজের মিশ্রণ টুলিং ভাঙে।'),
          l('Misplacing the config: it must be .github/dependabot.yml, and its indentation must be spaces, like any YAML.', 'কনফিগ ভুল জায়গায় রাখা: এটি অবশ্যই .github/dependabot.yml হতে হবে, ও যেকোনো YAML-এর মতো এর ইনডেন্টেশন স্পেস হতে হবে।'),
        ] },
      ],
    },
    {
      h: l('Remember in one line', 'এক লাইনে মনে রাখুন'),
      blocks: [
        { list: [
          l('Dependabot (.github/dependabot.yml) opens automated dependency-update PRs, especially security patches.', 'Dependabot (.github/dependabot.yml) স্বয়ংক্রিয় ডিপেন্ডেন্সি-আপডেট PR খোলে, বিশেষত নিরাপত্তা প্যাচ।'),
          l('Conventional Commits (feat:, fix:, docs:) give messages a structured, machine-readable format.', 'Conventional Commits (feat:, fix:, docs:) মেসেজকে একটি কাঠামোবদ্ধ, মেশিন-পাঠযোগ্য ফরম্যাট দেয়।'),
          l('Both enable automation like changelogs and version bumps, but only if the whole team follows them consistently.', 'দুটোই চেঞ্জলগ ও ভার্সন বাম্পের মতো অটোমেশন সম্ভব করে, তবে শুধু পুরো টিম ধারাবাহিকভাবে মানলে।'),
        ] },
      ],
    },
  ],
}
