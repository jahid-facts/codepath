// Deep, bilingual (English / Bangla) teaching guides for the Git course —
// module 02 (everyday snapshots) and the start of module 03 (branching & merging).
// Shape mirrors app/course-guides.js: each guide is an array of sections { h, blocks },
// rendered by GuideBlock in app/LearningApp.js. Facts (definitions, analogies,
// trade-offs, and the exact commands) are drawn from app/courses/git.js.

const l = (en, bn) => ({ en, bn })

export default {
  // ── git-status-diff · Inspect changes: status & diff ──────────────────────
  'git-status-diff': [
    {
      h: l('What are git status and git diff?', 'git status ও git diff কী?'),
      blocks: [
        { p: l('git status and git diff are the two commands you use to look at your work before you save it. git status is the big-picture summary: it tells you which files have changed, which of those changes are staged (ready to be committed), and which files Git has never seen before. git diff is the microscope: it shows the exact lines you added and removed inside those files. Together they answer the single most important question in everyday Git — "what exactly am I about to commit?"', 'git status ও git diff হলো সেই দুটি কমান্ড যা দিয়ে সেভ করার আগে নিজের কাজ দেখেন। git status হলো বড় ছবির সারাংশ: এটি বলে কোন ফাইল বদলেছে, সেগুলোর মধ্যে কোন পরিবর্তন staged (কমিটের জন্য প্রস্তুত), আর কোন ফাইল গিট আগে কখনো দেখেনি। git diff হলো অণুবীক্ষণ: এটি সেই ফাইলগুলোর ভেতরে ঠিক কোন লাইন যোগ ও বাদ দিয়েছেন তা দেখায়। একসঙ্গে এরা প্রতিদিনের গিটের সবচেয়ে গুরুত্বপূর্ণ প্রশ্নের উত্তর দেয়—"আমি ঠিক কী কমিট করতে যাচ্ছি?"') },
        { p: l('The problem they solve is committing blind. Without checking, it is dangerously easy to record something you never meant to — a stray console.log, a half-finished edit, a leftover merge conflict marker, or a password you were testing with. Because a commit is a permanent snapshot in history, a two-second look with status and diff is the cheapest possible insurance against a mess you later have to clean up.', 'এরা যে সমস্যা সমাধান করে তা হলো অন্ধভাবে কমিট করা। যাচাই না করলে এমন কিছু রেকর্ড করা বিপজ্জনকভাবে সহজ যা আপনি চাননি—একটি রয়ে-যাওয়া console.log, একটি অর্ধেক এডিট, একটি বাকি থাকা merge conflict marker, বা পরীক্ষার সময় ব্যবহৃত একটি পাসওয়ার্ড। যেহেতু একটি কমিট ইতিহাসে স্থায়ী স্ন্যাপশট, status ও diff দিয়ে দুই সেকেন্ডের একটি দেখা পরে পরিষ্কার করার ঝামেলার বিরুদ্ধে সবচেয়ে সস্তা বীমা।') },
        { note: l('git status is the summary at the top of a document review — "3 pages changed, 1 new page added". git diff is track-changes turned on: it shows every single word you inserted and deleted, line by line.', 'git status হলো ডকুমেন্ট রিভিউর ওপরের সারাংশ—"৩ পৃষ্ঠা বদলেছে, ১ নতুন পৃষ্ঠা যোগ হয়েছে"। git diff হলো track-changes চালু করা: এটি লাইন ধরে ধরে আপনার যোগ ও বাদ দেওয়া প্রতিটি শব্দ দেখায়।'), kind: 'tip' },
      ],
    },
    {
      h: l('How they work', 'এরা কীভাবে কাজ করে'),
      blocks: [
        { p: l('Remember that a change moves through three areas: your working directory (where you edit), the staging area (what you have marked with git add), and the repository (committed history). status and diff report on the gaps between these areas.', 'মনে রাখুন একটি পরিবর্তন তিনটি এলাকার মধ্য দিয়ে যায়: আপনার working directory (যেখানে এডিট করেন), staging area (যা git add দিয়ে চিহ্নিত করেছেন), ও repository (কমিট করা ইতিহাস)। status ও diff এই এলাকাগুলোর মধ্যকার ফারাক জানায়।') },
        { steps: [
          l('Run git status to get the summary: it groups files into "Changes to be committed" (staged), "Changes not staged for commit" (edited but not added), and "Untracked files" (brand new).', 'সারাংশ পেতে git status চালান: এটি ফাইলগুলোকে "Changes to be committed" (staged), "Changes not staged for commit" (এডিট করা কিন্তু add করা নয়), ও "Untracked files" (একদম নতুন) হিসেবে ভাগ করে।'),
          l('Run git diff (with no arguments) to see the exact lines you changed but have NOT yet staged.', 'যে লাইন বদলেছেন কিন্তু এখনো stage করেননি তা দেখতে git diff (কোনো আর্গুমেন্ট ছাড়া) চালান।'),
          l('Run git diff --staged to see the exact lines that ARE staged — this is the true preview of your next commit.', 'যে লাইন stage করা আছে তা দেখতে git diff --staged চালান—এটাই আপনার পরবর্তী কমিটের আসল প্রিভিউ।'),
          l('Stage what looks right with git add, then run git diff --staged one last time before git commit to confirm.', 'যা ঠিক দেখায় তা git add দিয়ে stage করুন, তারপর git commit-এর আগে শেষবার git diff --staged চালিয়ে নিশ্চিত হন।'),
        ] },
        { code: `git status
# On branch main
# Changes to be committed:
#   modified:   app.js
# Changes not staged for commit:
#   modified:   style.css
# Untracked files:
#   notes.txt

git diff style.css     # lines you changed but have NOT staged
git diff --staged      # lines that ARE staged — your real next commit`, caption: l('status groups every file by its area; git diff shows unstaged edits, git diff --staged shows what you are about to commit.', 'status প্রতিটি ফাইলকে তার এলাকা অনুযায়ী ভাগ করে; git diff দেখায় unstaged এডিট, git diff --staged দেখায় আপনি কী কমিট করতে যাচ্ছেন।') },
      ],
    },
    {
      h: l('Key commands', 'মূল কমান্ড'),
      blocks: [
        { table: {
          head: [l('Goal', 'লক্ষ্য'), l('Command', 'কমান্ড')],
          rows: [
            [l('Short, compact status', 'সংক্ষিপ্ত স্ট্যাটাস'), l('git status -sb', 'git status -sb')],
            [l('See unstaged changes', 'আনস্টেজড পরিবর্তন দেখুন'), l('git diff', 'git diff')],
            [l('See staged changes (next commit)', 'স্টেজড পরিবর্তন দেখুন (পরের কমিট)'), l('git diff --staged', 'git diff --staged')],
            [l('Summary of files changed only', 'শুধু কোন ফাইল বদলেছে'), l('git diff --stat', 'git diff --stat')],
          ],
        } },
        { note: l('git status -sb prints a tight one-line-per-file view: a leading M means modified, A means added, ?? means untracked. It is the version experienced users run dozens of times a day.', 'git status -sb প্রতিটি ফাইলের জন্য এক-লাইনের ছোট ভিউ দেখায়: শুরুর M মানে modified, A মানে added, ?? মানে untracked। অভিজ্ঞ ব্যবহারকারীরা দিনে ডজনখানেক বার এটিই চালায়।'), kind: 'tip' },
      ],
    },
    {
      h: l('How to read a diff', 'একটি diff কীভাবে পড়বেন'),
      blocks: [
        { p: l('A diff looks cryptic at first, but it follows a simple grammar. Once you can read the four kinds of lines, you can review any change in seconds.', 'প্রথমে diff দুর্বোধ্য লাগে, তবে এটি একটি সরল ব্যাকরণ অনুসরণ করে। চার ধরনের লাইন পড়তে শিখলে যেকোনো পরিবর্তন সেকেন্ডে রিভিউ করতে পারবেন।') },
        { steps: [
          l('A line starting with a minus (-) was removed — this is the old version of the line.', 'বিয়োগ (-) দিয়ে শুরু হওয়া লাইন বাদ দেওয়া হয়েছে—এটি লাইনের পুরনো সংস্করণ।'),
          l('A line starting with a plus (+) was added — this is the new version of the line.', 'যোগ (+) দিয়ে শুরু হওয়া লাইন যোগ করা হয়েছে—এটি লাইনের নতুন সংস্করণ।'),
          l('A line with a leading space is unchanged context, shown only to help you locate the edit.', 'শুরুতে স্পেস থাকা লাইন অপরিবর্তিত context, শুধু এডিটটি কোথায় তা বুঝতে দেখানো হয়।'),
          l('A line starting with @@ is a "hunk header" that tells you which line numbers the change touches.', '@@ দিয়ে শুরু হওয়া লাইন হলো "hunk header" যা বলে পরিবর্তনটি কোন লাইন নম্বর ছোঁয়।'),
        ] },
        { code: `git diff app.js
diff --git a/app.js b/app.js
@@ -12,7 +12,7 @@ function greet(name) {
-  console.log("Hi")
+  console.log("Hello, " + name)
   return true`, caption: l('The - line is what you deleted, the + line is what you wrote instead, and the plain " return true" line is untouched context.', '- লাইন হলো যা মুছেছেন, + লাইন হলো তার বদলে যা লিখেছেন, আর সাধারণ " return true" লাইন হলো অপরিবর্তিত context।') },
      ],
    },
    {
      h: l('When and where to use them', 'কখন ও কোথায় ব্যবহার করবেন'),
      blocks: [
        { p: l('Reach for git status constantly — after every few edits, whenever you are unsure what state your repo is in, and any time a command surprises you. It is completely read-only and safe, so there is no reason not to run it. It is the fastest way to get your bearings.', 'git status বারবার নিন—প্রতি কয়েকটি এডিটের পর, যখন রিপো কোন অবস্থায় আছে অনিশ্চিত, আর যখনই কোনো কমান্ড আপনাকে অবাক করে। এটি সম্পূর্ণ read-only ও নিরাপদ, তাই না চালানোর কোনো কারণ নেই। অবস্থান বুঝতে এটাই দ্রুততম উপায়।') },
        { p: l('Reach for git diff at two key moments: while you are working, to review a change before you stage it, and right before you commit (as git diff --staged) to confirm the snapshot is exactly what you intend. During a code review of someone else’s pull request, the same diff view is what you read to understand their change. And when a merge conflict appears, git diff helps you see precisely what clashed.', 'git diff দুটি মূল মুহূর্তে নিন: কাজ করার সময়, stage করার আগে একটি পরিবর্তন রিভিউ করতে, আর কমিটের ঠিক আগে (git diff --staged হিসেবে) নিশ্চিত করতে স্ন্যাপশটটি ঠিক আপনার উদ্দিষ্ট। অন্যের pull request রিভিউর সময় একই diff ভিউ পড়ে তাদের পরিবর্তন বোঝেন। আর merge conflict দেখা দিলে git diff ঠিক কী সংঘর্ষ করেছে তা দেখতে সাহায্য করে।') },
      ],
    },
    {
      h: l('Common mistakes', 'সাধারণ ভুল'),
      blocks: [
        { list: [
          l('Committing without ever looking at the diff, so a stray debug line, a leftover TODO, or a conflict marker slips into history.', 'কখনো diff না দেখে কমিট করা, ফলে একটি রয়ে-যাওয়া ডিবাগ লাইন, বাকি থাকা TODO, বা একটি conflict marker ইতিহাসে ঢুকে যায়।'),
          l('Confusing git diff with git diff --staged. Plain git diff shows what is NOT staged; if everything is already staged, git diff prints nothing and beginners wrongly conclude there are no changes.', 'git diff ও git diff --staged গুলিয়ে ফেলা। সাধারণ git diff দেখায় যা stage করা নয়; সব ইতিমধ্যে stage করা থাকলে git diff কিছু দেখায় না ও নতুনরা ভুল করে ভাবে কোনো পরিবর্তন নেই।'),
          l('Relying only on git status. It confirms a file changed but hides the actual lines — you still need diff to catch a bad edit inside a file.', 'শুধু git status-এর ওপর নির্ভর করা। এটি নিশ্চিত করে একটি ফাইল বদলেছে কিন্তু আসল লাইন লুকায়—ফাইলের ভেতরের খারাপ এডিট ধরতে এখনো diff লাগে।'),
          l('Ignoring the "Untracked files" section, then forgetting to add a new file that the rest of the code depends on.', '"Untracked files" অংশ উপেক্ষা করা, তারপর এমন একটি নতুন ফাইল add করতে ভুলে যাওয়া যার ওপর বাকি কোড নির্ভর করে।'),
        ] },
      ],
    },
    {
      h: l('Remember in one line', 'এক লাইনে মনে রাখুন'),
      blocks: [
        { list: [
          l('git status = the summary of what changed and what is staged; git diff = the exact line-by-line changes.', 'git status = কী বদলেছে ও কী staged তার সারাংশ; git diff = লাইন-ধরে ঠিক পরিবর্তন।'),
          l('Always run git diff --staged right before you commit to confirm exactly what you are recording.', 'কমিটের ঠিক আগে সবসময় git diff --staged চালিয়ে নিশ্চিত হন আপনি ঠিক কী রেকর্ড করছেন।'),
          l('In a diff, minus (-) is the old line removed and plus (+) is the new line added.', 'diff-এ বিয়োগ (-) হলো বাদ দেওয়া পুরনো লাইন আর যোগ (+) হলো যোগ করা নতুন লাইন।'),
        ] },
      ],
    },
  ],

  // ── git-gitignore · Ignoring files with .gitignore ────────────────────────
  'git-gitignore': [
    {
      h: l('What is .gitignore?', '.gitignore কী?'),
      blocks: [
        { p: l('A .gitignore is a plain text file, kept in your repository, that lists patterns for files Git should never track. Each line is a rule. When a file matches one of those patterns, Git pretends it does not exist: it will not show up as untracked in git status, and git add will refuse to stage it. This is how you keep noise — secrets, downloaded dependencies, build output, editor junk — out of your project’s history.', '.gitignore হলো আপনার রিপোজিটরিতে রাখা একটি সাধারণ টেক্সট ফাইল, যা এমন ফাইলের প্যাটার্ন তালিকাভুক্ত করে যেগুলো গিট কখনো ট্র্যাক করবে না। প্রতিটি লাইন একটি নিয়ম। কোনো ফাইল সেই প্যাটার্নের সঙ্গে মিললে গিট ভান করে এটি নেই: এটি git status-এ untracked হিসেবে দেখাবে না, আর git add একে stage করতে অস্বীকার করবে। এভাবেই আপনি গোলমাল—সিক্রেট, ডাউনলোড করা ডিপেন্ডেন্সি, বিল্ড আউটপুট, এডিটরের আবর্জনা—প্রকল্পের ইতিহাস থেকে দূরে রাখেন।') },
        { p: l('The problem it solves is a repository cluttered with files that should never be shared. Some files are secret (a .env with passwords or API keys), some are huge and re-creatable (node_modules, which npm can rebuild anytime), and some are personal to your machine (editor settings, OS files like .DS_Store). Committing them bloats the repo, leaks secrets, and causes constant merge conflicts. .gitignore stops all of that at the source.', 'এটি যে সমস্যা সমাধান করে তা হলো কখনো শেয়ার না করার মতো ফাইলে ভরা একটি রিপোজিটরি। কিছু ফাইল সিক্রেট (পাসওয়ার্ড বা API key-সহ একটি .env), কিছু বিশাল ও আবার-বানানো-যায় (node_modules, যা npm যখন খুশি আবার বানাতে পারে), আর কিছু আপনার মেশিনে ব্যক্তিগত (এডিটর সেটিং, .DS_Store-এর মতো OS ফাইল)। এগুলো কমিট করলে রিপো ফুলে যায়, সিক্রেট ফাঁস হয়, ও অবিরত merge conflict হয়। .gitignore এসব উৎসেই থামায়।') },
        { note: l('Think of a "do not pack" list you write before a trip: the things that should stay home and never enter the suitcase. .gitignore is that list for your repository.', 'ভ্রমণের আগে লেখা একটি "প্যাক করবেন না" তালিকা ভাবুন: যেসব জিনিস বাড়িতে থাকবে ও কখনো স্যুটকেসে ঢুকবে না। .gitignore হলো আপনার রিপোজিটরির সেই তালিকা।'), kind: 'tip' },
      ],
    },
    {
      h: l('How it works', 'কীভাবে কাজ করে'),
      blocks: [
        { p: l('You create a file literally named .gitignore in the root of your repository and write one pattern per line. Git reads it and silently filters those files out of everything it does. The patterns are simple glob rules.', 'আপনি রিপোজিটরির root-এ হুবহু .gitignore নামের একটি ফাইল বানান ও প্রতি লাইনে একটি প্যাটার্ন লেখেন। গিট এটি পড়ে ও নীরবে সেই ফাইলগুলো তার সব কাজ থেকে ছেঁকে ফেলে। প্যাটার্নগুলো সরল glob নিয়ম।') },
        { steps: [
          l('A name like node_modules/ (with a trailing slash) ignores an entire folder and everything inside it.', 'node_modules/-এর মতো নাম (শেষে slash সহ) একটি পুরো ফোল্ডার ও তার ভেতরের সব কিছু ignore করে।'),
          l('A pattern with a star, like *.log, ignores every file ending in .log, anywhere it applies.', 'তারকাযুক্ত প্যাটার্ন, যেমন *.log, .log-এ শেষ হওয়া প্রতিটি ফাইল ignore করে।'),
          l('A plain name like .env ignores that specific file.', '.env-এর মতো সাধারণ নাম সেই নির্দিষ্ট ফাইল ignore করে।'),
          l('A line starting with ! is an exception: it re-includes a file that an earlier rule would have ignored.', '! দিয়ে শুরু লাইন একটি ব্যতিক্রম: আগের কোনো নিয়ম যে ফাইল ignore করত তা আবার যুক্ত করে।'),
          l('A line starting with # is just a comment for humans; Git ignores it.', '# দিয়ে শুরু লাইন শুধু মানুষের জন্য একটি কমেন্ট; গিট এটি উপেক্ষা করে।'),
        ] },
        { code: `# .gitignore — one pattern per line
node_modules/     # ignore a whole folder
*.log             # ignore every file ending in .log
.env              # ignore a secrets file
build/            # ignore build output
!keep.log         # exception: DO track this one log

git status        # ignored files no longer appear as untracked`, caption: l('Each line is a rule; a leading ! makes an exception, a leading # is a comment. After adding rules, ignored files vanish from git status.', 'প্রতিটি লাইন একটি নিয়ম; শুরুর ! একটি ব্যতিক্রম বানায়, শুরুর # একটি কমেন্ট। নিয়ম যোগের পর ignored ফাইল git status থেকে উধাও হয়।') },
      ],
    },
    {
      h: l('Common patterns', 'সাধারণ প্যাটার্ন'),
      blocks: [
        { table: {
          head: [l('Goal', 'লক্ষ্য'), l('Pattern / Command', 'প্যাটার্ন / কমান্ড')],
          rows: [
            [l('Ignore a whole folder', 'একটি ফোল্ডার ইগনোর'), l('node_modules/', 'node_modules/')],
            [l('Ignore by file extension', 'এক্সটেনশনে ইগনোর'), l('*.log', '*.log')],
            [l('Re-include one file (exception)', 'একটি ফাইল আবার যোগ (ব্যতিক্রম)'), l('!keep.log', '!keep.log')],
            [l('Stop tracking an already-committed file', 'আগে কমিট করা ফাইল ট্র্যাক বন্ধ'), l('git rm --cached <file>', 'git rm --cached <file>')],
          ],
        } },
      ],
    },
    {
      h: l('The "already tracked" trap', '"আগে থেকে ট্র্যাকড" ফাঁদ'),
      blocks: [
        { p: l('This is the single most confusing thing about .gitignore, so learn it now: .gitignore only affects untracked files. If a file was already committed before you added it to .gitignore, Git keeps tracking it — the ignore rule is silently powerless over it. To actually stop tracking a file that is already in history, you must remove it from Git’s index with git rm --cached, then commit that removal.', '.gitignore নিয়ে সবচেয়ে বিভ্রান্তিকর জিনিসটি এখনই শিখুন: .gitignore শুধু untracked ফাইলে কাজ করে। কোনো ফাইল .gitignore-এ যোগ করার আগেই কমিট হয়ে থাকলে গিট একে ট্র্যাক করতেই থাকে—ignore নিয়ম নীরবে এর ওপর অক্ষম। ইতিহাসে থাকা একটি ফাইল সত্যিই ট্র্যাক করা বন্ধ করতে হলে git rm --cached দিয়ে গিটের index থেকে সরাতে হবে, তারপর সেই সরানোটি কমিট করতে হবে।') },
        { code: `git rm --cached secret.env       # stop tracking, keep the file on disk
echo "secret.env" >> .gitignore  # add a rule so it is never re-added
git commit -m "Stop tracking secret.env"`, caption: l('--cached removes the file from Git tracking but leaves it on your disk; the new ignore rule stops it coming back.', '--cached ফাইলটি গিট ট্র্যাকিং থেকে সরায় কিন্তু ডিস্কে রেখে দেয়; নতুন ignore নিয়ম একে ফিরে আসা থেকে থামায়।') },
        { note: l('Adding a rule after a secret is already committed does NOT hide it — the password still lives in every past commit. If you ever commit a real credential, treat it as leaked: rotate (change) it immediately.', 'সিক্রেট ইতিমধ্যে কমিট হওয়ার পর নিয়ম যোগ করলে তা লুকায় না—পাসওয়ার্ডটি এখনো প্রতিটি অতীত কমিটে থাকে। কখনো আসল credential কমিট করলে একে ফাঁস হয়েছে ধরুন: সঙ্গে সঙ্গে rotate (বদলে) ফেলুন।'), kind: 'warn' },
      ],
    },
    {
      h: l('When and where to use it', 'কখন ও কোথায় ব্যবহার করবেন'),
      blocks: [
        { p: l('Create your .gitignore before your very first commit — that is the ideal moment, because then the noise files never enter history at all. Add the obvious categories up front: dependency folders (node_modules/, vendor/), secret files (.env), build output (dist/, build/), logs (*.log), and machine-specific junk (.DS_Store, .idea/, .vscode/).', 'আপনার একদম প্রথম কমিটের আগে .gitignore বানান—এটাই আদর্শ মুহূর্ত, কারণ তখন গোলমেলে ফাইল ইতিহাসে আদৌ ঢোকে না। স্পষ্ট শ্রেণিগুলো আগেই যোগ করুন: ডিপেন্ডেন্সি ফোল্ডার (node_modules/, vendor/), সিক্রেট ফাইল (.env), বিল্ড আউটপুট (dist/, build/), লগ (*.log), ও মেশিন-নির্দিষ্ট আবর্জনা (.DS_Store, .idea/, .vscode/)।') },
        { p: l('You do not have to write it from scratch. GitHub maintains a collection of ready-made .gitignore templates for every language and framework, and most tools generate a sensible one when you create a project. Commit the .gitignore file itself — unlike the files it lists, .gitignore is meant to be shared so the whole team ignores the same things.', 'শুরু থেকে লিখতে হবে না। গিটহাব প্রতিটি ভাষা ও ফ্রেমওয়ার্কের জন্য তৈরি .gitignore টেমপ্লেটের একটি সংগ্রহ রাখে, আর বেশিরভাগ টুল প্রকল্প বানানোর সময় একটি যুক্তিসঙ্গত .gitignore তৈরি করে। .gitignore ফাইলটি নিজে কমিট করুন—এতে থাকা ফাইলের বিপরীতে, .gitignore শেয়ার করার জন্যই, যাতে পুরো টিম একই জিনিস ignore করে।') },
        { p: l('A useful rule of thumb: if a file can be regenerated (build output, compiled binaries, installed packages), is personal to your machine (editor and OS settings), or is secret (credentials, keys, tokens), it belongs in .gitignore. If a file is source code, configuration the project genuinely needs, or documentation, it belongs in the repository. When in doubt, ask whether a teammate cloning the repo would need that exact file — if not, ignore it.', 'একটি কাজের নিয়ম: ফাইলটি যদি আবার বানানো যায় (বিল্ড আউটপুট, কম্পাইল করা binary, ইনস্টল করা প্যাকেজ), আপনার মেশিনে ব্যক্তিগত হয় (এডিটর ও OS সেটিং), বা সিক্রেট হয় (credential, key, token), তবে তা .gitignore-এ থাকবে। ফাইলটি যদি সোর্স কোড, প্রকল্পের সত্যিই দরকারি কনফিগ, বা ডকুমেন্টেশন হয়, তবে তা রিপোজিটরিতে থাকবে। সন্দেহ হলে ভাবুন রিপো clone করা একজন টিমমেটের ঠিক এই ফাইলটি লাগবে কি না—না লাগলে ignore করুন।') },
      ],
    },
    {
      h: l('Common mistakes', 'সাধারণ ভুল'),
      blocks: [
        { list: [
          l('Assuming that adding a rule hides an already-committed secret. The history still holds it; you must rewrite history or, more practically, rotate the leaked credential.', 'ভাবা যে নিয়ম যোগ করলে ইতিমধ্যে কমিট করা সিক্রেট লুকায়। ইতিহাসে তা থেকেই যায়; আপনাকে ইতিহাস rewrite করতে হবে বা বাস্তবিকভাবে ফাঁস হওয়া credential rotate করতে হবে।'),
          l('Committing node_modules or a build folder because there was no .gitignore, bloating the repo with thousands of re-creatable files.', '.gitignore না থাকায় node_modules বা একটি build ফোল্ডার কমিট করা, হাজার হাজার আবার-বানানো-যায় এমন ফাইলে রিপো ফুলিয়ে ফেলা।'),
          l('Forgetting the trailing slash or path context and being surprised a rule does not match; test with git status after editing it.', 'শেষের slash বা path context ভুলে গিয়ে অবাক হওয়া যে একটি নিয়ম মেলে না; এডিটের পর git status দিয়ে পরীক্ষা করুন।'),
          l('Accidentally ignoring a file the project needs, then wondering why a teammate’s clone is missing it. Use a ! exception or a more specific pattern.', 'ভুলে প্রকল্পের দরকারি একটি ফাইল ignore করা, তারপর ভাবা কেন টিমমেটের clone-এ তা নেই। একটি ! ব্যতিক্রম বা আরও নির্দিষ্ট প্যাটার্ন নিন।'),
        ] },
      ],
    },
    {
      h: l('Remember in one line', 'এক লাইনে মনে রাখুন'),
      blocks: [
        { list: [
          l('.gitignore lists patterns for files Git should never track — secrets, dependencies, and build output.', '.gitignore এমন ফাইলের প্যাটার্ন রাখে যা গিট কখনো ট্র্যাক করবে না—সিক্রেট, ডিপেন্ডেন্সি ও বিল্ড আউটপুট।'),
          l('It only affects untracked files; to untrack something already committed, use git rm --cached <file>.', 'এটি শুধু untracked ফাইলে কাজ করে; ইতিমধ্যে কমিট করা কিছু untrack করতে git rm --cached <file> নিন।'),
          l('Create it before your first commit, and commit the .gitignore itself so the whole team shares it.', 'প্রথম কমিটের আগে এটি বানান, ও .gitignore নিজে কমিট করুন যাতে পুরো টিম শেয়ার করে।'),
        ] },
      ],
    },
  ],

  // ── git-history · Read history: log, show, blame ──────────────────────────
  'git-history': [
    {
      h: l('What is Git history?', 'গিট ইতিহাস কী?'),
      blocks: [
        { p: l('Every commit you make is a permanent, timestamped snapshot with an author, a message, and a unique hash (a long ID like a1b2c3d). Strung together, these commits form your project’s history — a complete, searchable record of every change ever made and why. Three commands let you read that record: git log walks the whole timeline, git show inspects one commit in full, and git blame tells you which commit last touched each individual line of a file.', 'আপনার করা প্রতিটি কমিট হলো একটি স্থায়ী, সময়-চিহ্নিত স্ন্যাপশট যাতে থাকে একজন author, একটি মেসেজ, ও একটি ইউনিক hash (a1b2c3d-এর মতো লম্বা ID)। একসঙ্গে গেঁথে এই কমিটগুলো আপনার প্রকল্পের ইতিহাস গড়ে—কখন কী ও কেন বদলেছে তার সম্পূর্ণ, খোঁজযোগ্য রেকর্ড। তিনটি কমান্ড দিয়ে সেই রেকর্ড পড়েন: git log পুরো টাইমলাইন দেখায়, git show একটি কমিট পূর্ণভাবে দেখায়, ও git blame বলে একটি ফাইলের প্রতিটি লাইন কোন কমিট শেষ ছুঁয়েছে।') },
        { p: l('The problem history solves is answering "how did the code get like this?" Months later, when you find a strange line, a bug, or a decision you do not remember, history lets you travel back and understand it: who wrote it, when, in which commit, and — if the message is good — why. Good history turns debugging from guesswork into detective work with real evidence.', 'ইতিহাস যে সমস্যা সমাধান করে তা হলো "কোড এমন হলো কীভাবে?" মাস পরে যখন একটি অদ্ভুত লাইন, একটি বাগ, বা মনে না থাকা একটি সিদ্ধান্ত পান, ইতিহাস আপনাকে পিছিয়ে গিয়ে তা বুঝতে দেয়: কে লিখেছে, কখন, কোন কমিটে, আর—মেসেজ ভালো হলে—কেন। ভালো ইতিহাস ডিবাগিংকে অনুমান থেকে আসল প্রমাণসহ গোয়েন্দাগিরিতে বদলে দেয়।') },
        { note: l('History is a document’s full edit trail: git log is the timeline of every revision, git show is opening one revision to read it, and git blame is the margin note beside each line saying who wrote it and when.', 'ইতিহাস হলো একটি ডকুমেন্টের পূর্ণ এডিট-পথ: git log প্রতিটি রিভিশনের টাইমলাইন, git show হলো একটি রিভিশন খুলে পড়া, ও git blame হলো প্রতিটি লাইনের পাশে কে কখন লিখেছে তা বলা নোট।'), kind: 'tip' },
      ],
    },
    {
      h: l('How to read history', 'ইতিহাস কীভাবে পড়বেন'),
      blocks: [
        { steps: [
          l('Run git log to scroll the commit timeline, newest first — each entry shows the hash, author, date, and message.', 'কমিট টাইমলাইন দেখতে git log চালান, নতুনটি আগে—প্রতিটি এন্ট্রি hash, author, তারিখ ও মেসেজ দেখায়।'),
          l('Add --oneline to compress each commit to a single line, and --graph --all to draw the branch structure visually.', 'প্রতিটি কমিট এক লাইনে আনতে --oneline যোগ করুন, আর ব্রাঞ্চ গঠন ভিজ্যুয়ালি আঁকতে --graph --all।'),
          l('Copy a hash and run git show <sha> to see that one commit’s full message and its exact line-by-line changes.', 'একটি hash কপি করে git show <sha> চালান, সেই কমিটের পূর্ণ মেসেজ ও লাইন-ধরে ঠিক পরিবর্তন দেখতে।'),
          l('Run git blame <file> to see, for every line, the commit and author that last changed it — perfect for tracing when a line appeared.', 'git blame <file> চালান, প্রতিটি লাইনের জন্য কোন কমিট ও author শেষ বদলেছে দেখতে—একটি লাইন কখন এসেছে খুঁজতে আদর্শ।'),
        ] },
        { code: `git log --oneline --graph --all
* a1b2c3d (HEAD -> main) Add login form
* 9f8e7d6 Fix header typo
* 3c2b1a0 Initial commit

git show a1b2c3d      # full message + patch of that one commit
git blame app.js      # each line tagged with the commit that last changed it`, caption: l('--oneline --graph --all gives a compact visual overview; git show zooms into one commit; git blame attributes each line.', '--oneline --graph --all একটি সংক্ষিপ্ত ভিজ্যুয়াল ওভারভিউ দেয়; git show এক কমিটে জুম করে; git blame প্রতিটি লাইনের দায় দেখায়।') },
      ],
    },
    {
      h: l('Key commands', 'মূল কমান্ড'),
      blocks: [
        { table: {
          head: [l('Goal', 'লক্ষ্য'), l('Command', 'কমান্ড')],
          rows: [
            [l('Compact visual graph of all branches', 'সব ব্রাঞ্চের সংক্ষিপ্ত গ্রাফ'), l('git log --oneline --graph --all', 'git log --oneline --graph --all')],
            [l('Full history of one file (with patches)', 'এক ফাইলের পূর্ণ ইতিহাস (patch সহ)'), l('git log -p <file>', 'git log -p <file>')],
            [l('Inspect a single commit in detail', 'একটি কমিট বিস্তারিত দেখুন'), l('git show <sha>', 'git show <sha>')],
            [l('See who last changed each line', 'কে প্রতিটি লাইন শেষ বদলেছে'), l('git blame <file>', 'git blame <file>')],
          ],
        } },
        { note: l('A hash can be abbreviated: you only need the first 7 or so characters (a1b2c3d) as long as it is unique in the repo. That is why --oneline shows short hashes.', 'একটি hash সংক্ষিপ্ত করা যায়: রিপোতে ইউনিক থাকলে শুধু প্রথম ৭টির মতো অক্ষর (a1b2c3d) লাগে। এ কারণেই --oneline ছোট hash দেখায়।'), kind: 'tip' },
      ],
    },
    {
      h: l('Searching the history', 'ইতিহাসে খোঁজা'),
      blocks: [
        { p: l('History is only powerful if you can search it. Rather than scrolling through hundreds of commits by hand, git log takes filters that narrow the timeline down to exactly what you are looking for. These are the ones worth knowing early.', 'খুঁজতে পারলেই ইতিহাস শক্তিশালী। শত শত কমিট হাতে স্ক্রল না করে, git log এমন filter নেয় যা টাইমলাইনকে ঠিক আপনি যা খুঁজছেন তাতে সংকুচিত করে। এগুলো আগেভাগে জানা মূল্যবান।') },
        { list: [
          l('git log --grep="login" shows only commits whose message contains "login" — great for finding when a feature was added.', 'git log --grep="login" শুধু সেই কমিট দেখায় যার মেসেজে "login" আছে—একটি ফিচার কখন যোগ হয়েছে খুঁজতে দারুণ।'),
          l('git log --author="Rahim" filters to commits by one person.', 'git log --author="Rahim" একজন ব্যক্তির কমিটে ছেঁকে আনে।'),
          l('git log -S"functionName" finds the commits that actually added or removed that piece of code — a "pickaxe" search through the changes themselves.', 'git log -S"functionName" সেই কমিট খুঁজে দেয় যা আসলে সেই কোড টুকরো যোগ বা বাদ দিয়েছে—পরিবর্তনের ভেতর দিয়ে একটি "pickaxe" খোঁজা।'),
          l('git log --since="2 weeks ago" or --oneline -10 limits the log by time or count.', 'git log --since="2 weeks ago" বা --oneline -10 log-কে সময় বা সংখ্যায় সীমিত করে।'),
        ] },
      ],
    },
    {
      h: l('When and where to use it', 'কখন ও কোথায় ব্যবহার করবেন'),
      blocks: [
        { p: l('Use git log to get oriented in an unfamiliar project, to review what changed since yesterday, or to find the commit that introduced a feature. Use git show when you have a specific commit hash — from a log, a bug report, or git blame — and want to see exactly what it did. Use git blame when you are staring at a confusing or broken line and need to know its origin: which commit added it, who wrote it, and (by reading that commit’s message) why.', 'অপরিচিত প্রকল্পে অবস্থান বুঝতে, গতকাল থেকে কী বদলেছে রিভিউ করতে, বা কোন কমিট একটি ফিচার এনেছে খুঁজতে git log নিন। যখন একটি নির্দিষ্ট কমিট hash আছে—log, বাগ রিপোর্ট, বা git blame থেকে—আর ঠিক কী করেছে দেখতে চান তখন git show নিন। যখন একটি বিভ্রান্তিকর বা ভাঙা লাইনের দিকে তাকিয়ে আছেন ও এর উৎস জানা দরকার তখন git blame নিন: কোন কমিট একে যোগ করেছে, কে লিখেছে, ও (সেই কমিটের মেসেজ পড়ে) কেন।') },
        { p: l('A common real workflow chains them: git blame points you to a suspicious commit hash, then git show on that hash reveals the full change and the reasoning behind it. This is how experienced engineers debug code they have never seen before.', 'একটি সাধারণ বাস্তব ওয়ার্কফ্লো এদের জোড়ে: git blame আপনাকে একটি সন্দেহজনক কমিট hash দেখায়, তারপর সেই hash-এ git show পূর্ণ পরিবর্তন ও এর পেছনের যুক্তি প্রকাশ করে। এভাবেই অভিজ্ঞ ইঞ্জিনিয়াররা আগে কখনো না দেখা কোড ডিবাগ করে।') },
      ],
    },
    {
      h: l('Common mistakes', 'সাধারণ ভুল'),
      blocks: [
        { list: [
          l('Writing vague commit messages like "update" or "fix". History is only useful if the messages explain what changed and why — otherwise the log is a wall of noise when you need it most.', '"update" বা "fix"-এর মতো অস্পষ্ট কমিট মেসেজ লেখা। মেসেজ কী ও কেন বদলেছে ব্যাখ্যা করলেই ইতিহাস কাজের—নইলে যখন সবচেয়ে দরকার তখন log শুধু গোলমালের দেয়াল।'),
          l('Making giant commits that bundle many unrelated changes, so git blame points at one commit that touched fifty things and tells you nothing specific.', 'অনেক অসম্পর্কিত পরিবর্তন এক করা বিশাল কমিট বানানো, ফলে git blame এমন এক কমিট দেখায় যা পঞ্চাশটি জিনিস ছুঁয়েছে ও নির্দিষ্ট কিছু বলে না।'),
          l('Treating git blame as blame in the emotional sense. It is a neutral tracing tool for understanding when and why a line appeared, not for pointing fingers.', 'git blame-কে আবেগগত দোষারোপ ভাবা। এটি একটি লাইন কখন ও কেন এসেছে বোঝার নিরপেক্ষ খোঁজার টুল, আঙুল তোলার নয়।'),
          l('Forgetting the built-in navigation of git log — pressing space to page down and q to quit — and thinking the terminal is frozen.', 'git log-এর বিল্ট-ইন নেভিগেশন ভুলে যাওয়া—পেজ নামাতে space ও বেরোতে q—আর টার্মিনাল জমে গেছে ভাবা।'),
        ] },
      ],
    },
    {
      h: l('Remember in one line', 'এক লাইনে মনে রাখুন'),
      blocks: [
        { list: [
          l('git log walks the timeline, git show inspects one commit, git blame shows who last changed each line.', 'git log টাইমলাইন দেখায়, git show এক কমিট দেখায়, git blame প্রতিটি লাইন কে শেষ বদলেছে দেখায়।'),
          l('git log --oneline --graph --all is the everyday command for seeing branches at a glance.', 'git log --oneline --graph --all হলো এক নজরে ব্রাঞ্চ দেখার প্রতিদিনের কমান্ড।'),
          l('History only helps if commits are small and messages are meaningful — write for the person debugging in six months.', 'কমিট ছোট ও মেসেজ অর্থপূর্ণ হলেই ইতিহাস কাজে লাগে—ছয় মাস পর ডিবাগ করা মানুষটির জন্য লিখুন।'),
        ] },
      ],
    },
  ],

  // ── git-branches · Branches & HEAD ────────────────────────────────────────
  'git-branches': [
    {
      h: l('What is a branch?', 'ব্রাঞ্চ কী?'),
      blocks: [
        { p: l('A branch is simply a movable pointer to a commit. That is the whole idea — not a copy of your files, not a folder, just a lightweight label that points at one commit and moves forward as you add new ones. Because a branch is only a pointer, creating one is instant and nearly free, no matter how large the project. Branches let you develop a feature, a fix, or an experiment in complete isolation, without touching the main line of work everyone depends on.', 'ব্রাঞ্চ হলো কেবল একটি কমিটের দিকে সরানো-যোগ্য পয়েন্টার। এটাই পুরো ধারণা—আপনার ফাইলের কপি নয়, একটি ফোল্ডার নয়, শুধু একটি হালকা লেবেল যা এক কমিটের দিকে নির্দেশ করে ও নতুন কমিট যোগ করলে সামনে এগোয়। ব্রাঞ্চ শুধু একটি পয়েন্টার বলে, প্রকল্প যত বড়ই হোক, একটি বানানো তাৎক্ষণিক ও প্রায় বিনামূল্যে। ব্রাঞ্চ আপনাকে একটি ফিচার, ফিক্স বা পরীক্ষা সম্পূর্ণ আলাদাভাবে বানাতে দেয়, সবার নির্ভর করা মূল কাজের রেখা স্পর্শ না করে।') },
        { p: l('The problem branches solve is many changes happening at once without stepping on each other. On a real team, several people build different features simultaneously, and even solo you often juggle a new feature and an urgent bug fix. If everyone committed straight to one line, a half-finished or broken change would block everybody. Branches give each piece of work its own private lane; you merge it back into main only when it is finished and working.', 'ব্রাঞ্চ যে সমস্যা সমাধান করে তা হলো একসঙ্গে অনেক পরিবর্তন একে অপরের ওপর না চড়ে। বাস্তব টিমে কয়েকজন একসঙ্গে ভিন্ন ফিচার বানায়, আর একা থাকলেও প্রায়ই একটি নতুন ফিচার ও একটি জরুরি বাগ ফিক্স সামলান। সবাই এক রেখায় সরাসরি কমিট করলে একটি অর্ধেক বা ভাঙা পরিবর্তন সবাইকে আটকে দিত। ব্রাঞ্চ প্রতিটি কাজকে নিজের ব্যক্তিগত লেন দেয়; শেষ ও সচল হলেই তা main-এ আবার merge করেন।') },
        { note: l('A branch is a parallel draft of a document: experiment freely on your own copy, scribble and rewrite, and merge it back into the master version only when it is ready. The original stays clean the whole time.', 'ব্রাঞ্চ হলো একটি ডকুমেন্টের সমান্তরাল খসড়া: নিজের কপিতে স্বাধীনভাবে পরীক্ষা করুন, লিখুন ও আবার লিখুন, আর প্রস্তুত হলেই মাস্টার সংস্করণে merge করুন। মূলটি পুরো সময় পরিষ্কার থাকে।'), kind: 'tip' },
      ],
    },
    {
      h: l('How branches work', 'ব্রাঞ্চ কীভাবে কাজ করে'),
      blocks: [
        { steps: [
          l('git branch lists your local branches; the current one is marked with an asterisk (*).', 'git branch আপনার লোকাল ব্রাঞ্চ তালিকা করে; বর্তমানটি একটি তারকা (*) দিয়ে চিহ্নিত।'),
          l('git switch -c feature/login creates a new branch pointing at your current commit and moves you onto it in one step.', 'git switch -c feature/login আপনার বর্তমান কমিটে একটি নতুন ব্রাঞ্চ বানায় ও এক ধাপে আপনাকে তাতে নিয়ে যায়।'),
          l('As you commit on the branch, the branch pointer moves forward while main stays exactly where it was.', 'ব্রাঞ্চে কমিট করতে করতে ব্রাঞ্চ পয়েন্টার সামনে এগোয় আর main ঠিক আগের জায়গায় থাকে।'),
          l('git switch main takes you back; your feature commits are safely stored on the feature branch, out of the way.', 'git switch main আপনাকে ফিরিয়ে নেয়; আপনার ফিচার কমিট নিরাপদে ফিচার ব্রাঞ্চে থাকে, পথের বাইরে।'),
          l('Once the work is merged, git branch -d feature/login deletes the now-unneeded pointer.', 'কাজ merge হয়ে গেলে git branch -d feature/login এখন-অপ্রয়োজনীয় পয়েন্টারটি ডিলিট করে।'),
        ] },
        { code: `git branch                    # list branches; * marks the current one
git switch -c feature/login   # create feature/login AND move onto it
# ... edit files and commit here; main is untouched ...
git switch main               # hop back to main
git branch -d feature/login   # delete it once it has been merged`, caption: l('switch -c creates and moves in one step; your commits ride the branch pointer forward while main stays put.', 'switch -c এক ধাপে বানায় ও সরায়; আপনার কমিট ব্রাঞ্চ পয়েন্টারকে সামনে নেয় আর main স্থির থাকে।') },
      ],
    },
    {
      h: l('Key commands', 'মূল কমান্ড'),
      blocks: [
        { table: {
          head: [l('Goal', 'লক্ষ্য'), l('Command', 'কমান্ড')],
          rows: [
            [l('List local branches', 'লোকাল ব্রাঞ্চ তালিকা'), l('git branch', 'git branch')],
            [l('Create a branch and switch to it', 'ব্রাঞ্চ বানিয়ে সুইচ'), l('git switch -c <name>', 'git switch -c <name>')],
            [l('Switch to an existing branch', 'বিদ্যমান ব্রাঞ্চে সুইচ'), l('git switch <name>', 'git switch <name>')],
            [l('Delete a merged branch', 'মার্জড ব্রাঞ্চ ডিলিট'), l('git branch -d <name>', 'git branch -d <name>')],
          ],
        } },
        { note: l('git switch is the modern, purpose-built command for changing branches. You may still see the older git checkout <name> in tutorials — it does the same thing but is overloaded with many other jobs, which is why switch was introduced.', 'git switch হলো ব্রাঞ্চ বদলানোর আধুনিক, উদ্দেশ্য-নির্দিষ্ট কমান্ড। টিউটোরিয়ালে পুরনো git checkout <name>-ও দেখতে পারেন—এটি একই কাজ করে কিন্তু আরও অনেক কাজে ঠাসা, এ কারণেই switch আনা হয়েছে।'), kind: 'tip' },
      ],
    },
    {
      h: l('What is HEAD?', 'HEAD কী?'),
      blocks: [
        { p: l('HEAD is Git’s word for "where you are right now" — a special pointer to the branch (and therefore the commit) you currently have checked out. When you run git switch main, you are moving HEAD to point at the main branch. When you make a new commit, HEAD and the current branch pointer both move forward together to the new commit. Almost every command that talks about "the current commit" really means "wherever HEAD is pointing."', 'HEAD হলো "আপনি এখন কোথায়" বোঝাতে গিটের শব্দ—আপনি বর্তমানে যে ব্রাঞ্চ (আর তাই যে কমিট) checkout করে আছেন তার দিকে একটি বিশেষ পয়েন্টার। git switch main চালালে আপনি HEAD-কে main ব্রাঞ্চের দিকে সরাচ্ছেন। নতুন কমিট করলে HEAD ও বর্তমান ব্রাঞ্চ পয়েন্টার দুটোই একসঙ্গে নতুন কমিটে এগোয়। "বর্তমান কমিট" নিয়ে কথা বলা প্রায় প্রতিটি কমান্ড আসলে "HEAD যেখানে নির্দেশ করছে" বোঝায়।') },
        { p: l('This is why you will see references like HEAD~1 (the commit one step before HEAD) in other commands — they are all measured relative to where you currently stand.', 'এ কারণেই অন্য কমান্ডে HEAD~1-এর মতো রেফারেন্স দেখবেন (HEAD-এর এক ধাপ আগের কমিট)—এসব আপনি এখন যেখানে দাঁড়িয়ে তার সাপেক্ষে মাপা।') },
        { p: l('One warning tied to HEAD: if you switch directly to a specific commit hash instead of a branch, Git puts you in a "detached HEAD" state — HEAD points at a commit with no branch attached. You can look around freely, but any new commits you make there belong to no branch and can be lost when you switch away. If you want to keep work from a detached HEAD, create a branch for it first with git switch -c <name>.', 'HEAD-সংক্রান্ত একটি সতর্কতা: একটি ব্রাঞ্চের বদলে সরাসরি একটি নির্দিষ্ট কমিট hash-এ switch করলে গিট আপনাকে "detached HEAD" অবস্থায় রাখে—HEAD এমন একটি কমিটে নির্দেশ করে যার সঙ্গে কোনো ব্রাঞ্চ নেই। আপনি অবাধে ঘুরে দেখতে পারেন, তবে সেখানে করা নতুন কমিট কোনো ব্রাঞ্চের নয় ও অন্যত্র switch করলে হারিয়ে যেতে পারে। detached HEAD-এর কাজ রাখতে চাইলে আগে git switch -c <name> দিয়ে একটি ব্রাঞ্চ বানান।') },
      ],
    },
    {
      h: l('When and where to use branches', 'কখন ও কোথায় ব্রাঞ্চ ব্যবহার করবেন'),
      blocks: [
        { p: l('Create a fresh branch for every distinct piece of work: one branch per feature, per bug fix, per experiment. A common convention is to name them by intent, like feature/login, fix/header-crash, or chore/update-deps. Keep main always in a working, deployable state, and do your risky or unfinished work on branches. This is the heart of the widely used GitHub Flow: branch, commit, open a pull request, review, and merge.', 'প্রতিটি আলাদা কাজের জন্য একটি নতুন ব্রাঞ্চ বানান: প্রতি ফিচারে, প্রতি বাগ ফিক্সে, প্রতি পরীক্ষায় একটি ব্রাঞ্চ। একটি সাধারণ রীতি হলো উদ্দেশ্য অনুযায়ী নাম দেওয়া, যেমন feature/login, fix/header-crash, বা chore/update-deps। main সবসময় সচল, ডিপ্লয়যোগ্য অবস্থায় রাখুন, আর ঝুঁকিপূর্ণ বা অসমাপ্ত কাজ ব্রাঞ্চে করুন। এটাই ব্যাপক-ব্যবহৃত GitHub Flow-এর মূল: branch, commit, একটি pull request খোলা, রিভিউ, ও merge।') },
        { p: l('Keep branches short-lived. Because a branch drifts away from main as both advance, the longer it lives, the more it diverges and the more painful the eventual merge becomes. Merge finished work back promptly and delete the branch — a tidy branch list is a healthy repository.', 'ব্রাঞ্চ স্বল্পস্থায়ী রাখুন। দুটোই এগোনোর সঙ্গে ব্রাঞ্চ main থেকে সরে যায় বলে, এটি যত বেশি বাঁচে তত বেশি সরে যায় ও শেষমেশ merge তত কষ্টকর হয়। শেষ হওয়া কাজ দ্রুত merge করে ব্রাঞ্চ ডিলিট করুন—পরিপাটি ব্রাঞ্চ তালিকা একটি সুস্থ রিপোজিটরি।') },
      ],
    },
    {
      h: l('Common mistakes', 'সাধারণ ভুল'),
      blocks: [
        { list: [
          l('Committing everything straight to main, so one broken or half-finished change blocks and breaks the whole team.', 'সবকিছু সরাসরি main-এ কমিট করা, ফলে একটি ভাঙা বা অর্ধেক পরিবর্তন পুরো টিমকে আটকে ও ভেঙে দেয়।'),
          l('Letting a branch live for weeks. It drifts far from main and turns the final merge into a conflict-riddled ordeal.', 'একটি ব্রাঞ্চকে সপ্তাহের পর সপ্তাহ বাঁচতে দেওয়া। এটি main থেকে অনেক দূরে সরে যায় ও শেষ merge-কে কনফ্লিক্টে-ভরা যন্ত্রণায় পরিণত করে।'),
          l('Forgetting which branch you are on and committing to the wrong one. Run git status or git branch first — the current branch is right at the top.', 'কোন ব্রাঞ্চে আছেন ভুলে ভুলটায় কমিট করা। আগে git status বা git branch চালান—বর্তমান ব্রাঞ্চ একদম ওপরে থাকে।'),
          l('Trying to delete a branch with unmerged work using -d and being confused by the warning; that warning is protecting you from losing commits.', '-d দিয়ে un-merged কাজসহ একটি ব্রাঞ্চ ডিলিট করতে গিয়ে সতর্কবার্তায় বিভ্রান্ত হওয়া; সেই সতর্কবার্তা আপনাকে কমিট হারানো থেকে বাঁচাচ্ছে।'),
        ] },
      ],
    },
    {
      h: l('Remember in one line', 'এক লাইনে মনে রাখুন'),
      blocks: [
        { list: [
          l('A branch is just a movable pointer to a commit; creating one is instant and lets you work in isolation.', 'ব্রাঞ্চ কেবল একটি কমিটের দিকে সরানো-যোগ্য পয়েন্টার; একটি বানানো তাৎক্ষণিক ও আলাদাভাবে কাজ করতে দেয়।'),
          l('HEAD points to the branch you are currently on; commits move HEAD and that branch forward together.', 'HEAD আপনি এখন যে ব্রাঞ্চে আছেন তার দিকে নির্দেশ করে; কমিট HEAD ও সেই ব্রাঞ্চকে একসঙ্গে সামনে নেয়।'),
          l('One branch per task, keep main always working, and merge and delete branches promptly.', 'প্রতি কাজে এক ব্রাঞ্চ, main সবসময় সচল রাখুন, ও ব্রাঞ্চ দ্রুত merge করে ডিলিট করুন।'),
        ] },
      ],
    },
  ],

  // ── git-merge · Merging & conflicts ───────────────────────────────────────
  'git-merge': [
    {
      h: l('What is git merge?', 'git merge কী?'),
      blocks: [
        { p: l('git merge combines the commits from another branch into the one you are currently on. This is how the work you did in isolation on a feature branch rejoins the main line of the project. You switch to the branch you want to merge into (usually main), run git merge with the name of the other branch, and Git weaves the two histories together — producing a merge commit when both branches have moved forward independently.', 'git merge অন্য একটি ব্রাঞ্চের কমিটগুলো আপনি এখন যেটিতে আছেন তাতে মিলিয়ে দেয়। ফিচার ব্রাঞ্চে আলাদাভাবে করা কাজ এভাবেই প্রকল্পের মূল রেখায় ফিরে যোগ হয়। আপনি যে ব্রাঞ্চে merge করতে চান (সাধারণত main) তাতে switch করেন, অন্য ব্রাঞ্চের নাম দিয়ে git merge চালান, আর গিট দুটি ইতিহাস একসঙ্গে বুনে দেয়—দুই ব্রাঞ্চ স্বাধীনভাবে এগোলে একটি merge commit বানিয়ে।') },
        { p: l('The problem merge solves is bringing parallel work back together safely. Branches let people diverge; merge is how they converge again. Most of the time it is completely automatic — Git is very good at combining changes to different parts of the code. Occasionally two branches change the very same lines, and then Git cannot decide which to keep. That situation is called a merge conflict, and resolving it is a normal, learnable part of the job, not an error you broke something to cause.', 'merge যে সমস্যা সমাধান করে তা হলো সমান্তরাল কাজ নিরাপদে আবার একত্র করা। ব্রাঞ্চ মানুষকে সরে যেতে দেয়; merge হলো আবার মিলে আসার উপায়। বেশিরভাগ সময় এটি সম্পূর্ণ স্বয়ংক্রিয়—কোডের ভিন্ন অংশের পরিবর্তন মেলাতে গিট খুব ভালো। মাঝে মাঝে দুই ব্রাঞ্চ ঠিক একই লাইন বদলায়, তখন গিট কোনটি রাখবে ঠিক করতে পারে না। সেই পরিস্থিতিকে merge conflict বলে, ও তা সমাধান কাজের একটি স্বাভাবিক, শেখার-যোগ্য অংশ, আপনি কিছু ভাঙার ফলে ঘটা কোনো ত্রুটি নয়।') },
        { note: l('Merging is like combining two editors’ versions of the same chapter: where they edited different paragraphs Git merges automatically, and only where they both rewrote the exact same sentence does a human have to reconcile it.', 'merge হলো একই অধ্যায়ের দুই সম্পাদকের সংস্করণ মেলানোর মতো: যেখানে তারা ভিন্ন অনুচ্ছেদ এডিট করেছে সেখানে গিট নিজেই মেলায়, আর শুধু যেখানে দুজনেই ঠিক একই বাক্য আবার লিখেছে সেখানে একজন মানুষকে মেটাতে হয়।'), kind: 'tip' },
      ],
    },
    {
      h: l('How a merge works', 'একটি merge কীভাবে কাজ করে'),
      blocks: [
        { p: l('There are two outcomes. If main has not moved since you branched, Git simply slides main’s pointer forward to your branch — a "fast-forward" with no extra commit. If both branches advanced, Git builds a new "merge commit" that has two parents, tying the histories together. You can force the second style with --no-ff to always keep a visible record that a branch was merged.', 'দুটি ফলাফল হয়। আপনি ব্রাঞ্চ করার পর main না সরলে গিট শুধু main-এর পয়েন্টার আপনার ব্রাঞ্চে সামনে সরিয়ে দেয়—কোনো বাড়তি কমিট ছাড়া একটি "fast-forward"। দুই ব্রাঞ্চ এগোলে গিট দুটি parent-সহ একটি নতুন "merge commit" বানায়, ইতিহাস দুটি একসঙ্গে বাঁধে। --no-ff দিয়ে দ্বিতীয় ধরনটি বাধ্য করতে পারেন, যাতে একটি ব্রাঞ্চ merge হয়েছে তার দৃশ্যমান রেকর্ড সবসময় থাকে।') },
        { steps: [
          l('Switch to the branch you want to merge INTO, for example git switch main.', 'আপনি যে ব্রাঞ্চে merge করতে চান তাতে switch করুন, যেমন git switch main।'),
          l('It is a good habit to pull first, so main is up to date before you merge onto it.', 'একটি ভালো অভ্যাস হলো আগে pull করা, যাতে merge করার আগে main হালনাগাদ থাকে।'),
          l('Run git merge feature/login to bring that branch’s commits in.', 'সেই ব্রাঞ্চের কমিট আনতে git merge feature/login চালান।'),
          l('If there are no clashes, Git completes the merge automatically. If there are, it pauses and asks you to resolve the conflict.', 'কোনো সংঘর্ষ না থাকলে গিট নিজেই merge সম্পন্ন করে। থাকলে এটি থেমে আপনাকে conflict সমাধান করতে বলে।'),
        ] },
        { code: `git switch main            # be on the branch you are merging INTO
git merge feature/login    # bring feature/login's commits into main

# no divergence -> Git fast-forwards:
#   Updating 3c2b1a0..a1b2c3d
#   Fast-forward

# both branches advanced -> Git makes a merge commit:
#   Merge made by the 'ort' strategy.`, caption: l('Merge into main after switching to it. Git fast-forwards when it can, or creates a merge commit when both branches advanced.', 'main-এ switch করে তারপর merge করুন। পারলে গিট fast-forward করে, নইলে দুই ব্রাঞ্চ এগোলে একটি merge commit বানায়।') },
      ],
    },
    {
      h: l('Key commands', 'মূল কমান্ড'),
      blocks: [
        { table: {
          head: [l('Goal', 'লক্ষ্য'), l('Command', 'কমান্ড')],
          rows: [
            [l('Merge a branch into the current one', 'বর্তমান ব্রাঞ্চে merge'), l('git merge <branch>', 'git merge <branch>')],
            [l('Force a merge commit (no fast-forward)', 'merge commit বাধ্য (no fast-forward)'), l('git merge --no-ff <branch>', 'git merge --no-ff <branch>')],
            [l('Abort and undo a conflicted merge', 'কনফ্লিক্ট merge বাতিল ও আনডু'), l('git merge --abort', 'git merge --abort')],
            [l('Mark a conflicted file as resolved', 'কনফ্লিক্ট ফাইল সমাধান চিহ্নিত'), l('git add <file>', 'git add <file>')],
          ],
        } },
        { note: l('If a merge goes wrong or you panic mid-conflict, git merge --abort is your safety hatch: it throws away the half-done merge and returns your branch to exactly how it was before you started.', 'merge ভুল হলে বা conflict-এর মাঝে আতঙ্কিত হলে git merge --abort আপনার নিরাপত্তা-দরজা: এটি অর্ধেক-করা merge ফেলে দিয়ে ব্রাঞ্চকে শুরুর ঠিক আগের অবস্থায় ফিরিয়ে দেয়।'), kind: 'tip' },
      ],
    },
    {
      h: l('Merge vs rebase', 'Merge বনাম rebase'),
      blocks: [
        { p: l('Merge is not the only way to combine branches; rebase is the common alternative, and knowing the trade-off helps you pick.', 'ব্রাঞ্চ মেলানোর একমাত্র উপায় merge নয়; rebase হলো সাধারণ বিকল্প, আর ট্রেড-অফ জানলে বাছতে সুবিধা।') },
        { table: {
          head: [l('Aspect', 'দিক'), l('git merge', 'git merge'), l('git rebase', 'git rebase')],
          rows: [
            [l('History shape', 'ইতিহাসের আকার'), l('Preserves the real branching; can look tangled', 'আসল branching রাখে; জটিল দেখাতে পারে'), l('Rewrites into one straight line', 'এক সরল রেখায় আবার লেখে')],
            [l('Commit hashes', 'কমিট hash'), l('Unchanged; adds a merge commit', 'অপরিবর্তিত; একটি merge commit যোগ করে'), l('Changed; commits are replayed anew', 'বদলে যায়; কমিট নতুন করে বসে')],
            [l('Safe on shared branches?', 'শেয়ার্ড ব্রাঞ্চে নিরাপদ?'), l('Yes — never rewrites history', 'হ্যাঁ—ইতিহাস কখনো বদলায় না'), l('No — never rebase commits others have pulled', 'না—অন্যরা টেনে নেওয়া কমিট rebase নয়')],
          ],
        } },
      ],
    },
    {
      h: l('Reading and resolving a conflict', 'একটি conflict পড়া ও সমাধান'),
      blocks: [
        { p: l('When both branches changed the same lines, Git stops the merge and writes special conflict markers into the file, showing both versions so you can choose. Your job is to edit the file into the one correct final version, remove the markers, and finish the merge. Here is exactly how to read those markers.', 'দুই ব্রাঞ্চ একই লাইন বদলালে গিট merge থামিয়ে ফাইলে বিশেষ conflict marker লেখে, দুটি সংস্করণ দেখায় যাতে আপনি বাছতে পারেন। আপনার কাজ ফাইলটিকে একটি সঠিক চূড়ান্ত সংস্করণে এডিট করা, marker সরানো, ও merge শেষ করা। সেই marker ঠিক কীভাবে পড়বেন এই যে।') },
        { steps: [
          l('Everything between <<<<<<< HEAD and the ======= line is YOUR version — the content already on the branch you are merging into.', '<<<<<<< HEAD ও ======= লাইনের মাঝের সবকিছু আপনার সংস্করণ—আপনি যে ব্রাঞ্চে merge করছেন তাতে ইতিমধ্যে থাকা বিষয়বস্তু।'),
          l('Everything between ======= and >>>>>>> feature/login is THEIR version — the content coming in from the other branch.', '======= ও >>>>>>> feature/login-এর মাঝের সবকিছু তাদের সংস্করণ—অন্য ব্রাঞ্চ থেকে আসা বিষয়বস্তু।'),
          l('Decide the correct result: keep yours, keep theirs, or write a combination that merges both intents.', 'সঠিক ফল ঠিক করুন: আপনারটি রাখুন, তাদেরটি রাখুন, বা দুটির উদ্দেশ্য মেলানো একটি সংমিশ্রণ লিখুন।'),
          l('Delete all three marker lines (<<<<<<<, =======, >>>>>>>) so only the final clean code remains.', 'তিনটি marker লাইন (<<<<<<<, =======, >>>>>>>) মুছুন যাতে শুধু চূড়ান্ত পরিষ্কার কোড থাকে।'),
          l('Run git add <file> to mark it resolved, then git commit to complete the merge.', 'সমাধান চিহ্নিত করতে git add <file> চালান, তারপর merge শেষ করতে git commit।'),
        ] },
        { code: `git merge feature/login
# Auto-merging app.js
# CONFLICT (content): Merge conflict in app.js
# Automatic merge failed; fix conflicts and then commit the result.

# open app.js and you will see the markers Git inserted:
<<<<<<< HEAD
const title = "Home"
=======
const title = "Dashboard"
>>>>>>> feature/login

# edit it down to the single correct line, e.g. const title = "Dashboard"
# then stage and finish:
git add app.js
git commit             # completes the merge`, caption: l('HEAD is your side, the part after ======= is the incoming side. Keep the right lines, delete all markers, then git add and git commit.', 'HEAD আপনার দিক, ======= পরের অংশ আসা দিক। সঠিক লাইন রাখুন, সব marker মুছুন, তারপর git add ও git commit।') },
      ],
    },
    {
      h: l('When and where to use it', 'কখন ও কোথায় ব্যবহার করবেন'),
      blocks: [
        { p: l('Use git merge to bring a finished feature branch back into main — this is the everyday way work lands. On GitHub, clicking "Merge pull request" runs a merge for you after review and checks pass. Prefer merge over rebase whenever the branch is shared with other people, because merge never rewrites existing commits and so can never break a teammate’s copy of the history.', 'একটি শেষ হওয়া ফিচার ব্রাঞ্চ main-এ ফেরাতে git merge নিন—এভাবেই প্রতিদিন কাজ যুক্ত হয়। গিটহাবে রিভিউ ও চেক পাসের পর "Merge pull request"-এ ক্লিক করলে আপনার হয়ে একটি merge চলে। ব্রাঞ্চ অন্য মানুষের সঙ্গে শেয়ার করা থাকলে সবসময় rebase-এর বদলে merge নিন, কারণ merge বিদ্যমান কমিট কখনো rewrite করে না তাই টিমমেটের ইতিহাসের কপি কখনো ভাঙতে পারে না।') },
        { p: l('Use --no-ff when you want the history to explicitly show "these commits came in as one feature." Many teams enable this on main so every merged branch leaves a clear, labelled merge commit that is easy to find and, if needed, revert as a unit.', 'যখন চান ইতিহাস স্পষ্টভাবে দেখাক "এই কমিটগুলো একটি ফিচার হিসেবে এসেছে" তখন --no-ff নিন। অনেক টিম main-এ এটি চালু রাখে যাতে প্রতিটি merge হওয়া ব্রাঞ্চ একটি স্পষ্ট, লেবেলযুক্ত merge commit রেখে যায় যা খুঁজে পাওয়া ও দরকারে এককভাবে revert করা সহজ।') },
      ],
    },
    {
      h: l('Common mistakes', 'সাধারণ ভুল'),
      blocks: [
        { list: [
          l('Committing the conflict markers by accident instead of resolving them. If <<<<<<<, =======, or >>>>>>> ever reach a commit, the file is broken — always search for them before you finish.', 'conflict marker সমাধান না করে ভুলে কমিট করা। <<<<<<<, ======= বা >>>>>>> কখনো একটি কমিটে পৌঁছালে ফাইলটি ভাঙা—শেষ করার আগে সবসময় এগুলো খুঁজুন।'),
          l('Panicking during a conflict and force-deleting files or re-cloning. Just run git merge --abort to return to safety, then try again calmly.', 'conflict-এর সময় আতঙ্কে ফাইল জোর করে মুছে ফেলা বা আবার clone করা। শুধু git merge --abort চালিয়ে নিরাপদে ফিরুন, তারপর শান্তভাবে আবার চেষ্টা করুন।'),
          l('Resolving a conflict by blindly keeping one whole side, silently throwing away the other person’s legitimate change. Read both sides and think about intent.', 'অন্ধভাবে পুরো এক দিক রেখে conflict সমাধান করা, নীরবে অন্যজনের বৈধ পরিবর্তন ফেলে দেওয়া। দুই দিক পড়ুন ও উদ্দেশ্য নিয়ে ভাবুন।'),
          l('Letting branches diverge for a long time before merging, which multiplies the number and size of conflicts. Merge or update from main frequently.', 'merge-এর আগে ব্রাঞ্চ অনেকদিন সরে যেতে দেওয়া, যা conflict-এর সংখ্যা ও আকার বাড়ায়। ঘন ঘন main থেকে merge বা update করুন।'),
        ] },
      ],
    },
    {
      h: l('Remember in one line', 'এক লাইনে মনে রাখুন'),
      blocks: [
        { list: [
          l('git merge combines another branch into your current one, adding a merge commit when both have advanced.', 'git merge অন্য একটি ব্রাঞ্চকে আপনার বর্তমানটিতে মেলায়, দুটোই এগোলে একটি merge commit যোগ করে।'),
          l('A conflict shows both versions between <<<<<<< and >>>>>>>; edit to the right result, delete the markers, git add, then commit.', 'conflict <<<<<<< ও >>>>>>>-এর মাঝে দুটি সংস্করণ দেখায়; সঠিক ফলে এডিট করুন, marker মুছুন, git add, তারপর কমিট।'),
          l('Merge is safe on shared branches because it never rewrites history; git merge --abort always gets you back out.', 'merge শেয়ার্ড ব্রাঞ্চে নিরাপদ কারণ এটি ইতিহাস কখনো rewrite করে না; git merge --abort সবসময় আপনাকে ফিরিয়ে আনে।'),
        ] },
      ],
    },
  ],
}
