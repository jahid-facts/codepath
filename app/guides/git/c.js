// Deep, bilingual (English / Bangla) teaching guides for Git branching, tags,
// remotes, syncing, and authentication. Shape mirrors app/course-guides.js and
// app/guides/dsa/a.js: each guide is an array of sections { h, blocks }, rendered
// by GuideBlock in app/LearningApp.js. Facts (definitions, analogies, trade-offs,
// commands, flags) are drawn from app/courses/git.js.

const l = (en, bn) => ({ en, bn })

export default {
  // ── git-rebase · Rebase & a linear history ────────────────────────────────
  'git-rebase': [
    {
      h: l('What is git rebase?', 'git rebase কী?'),
      blocks: [
        { p: l('git rebase takes the commits you made on your branch and replays them, one by one, on top of a different base commit — usually the latest tip of main. The result is a clean, linear history: your work looks as if you had started it from the newest version of main, with no merge commit tying the two lines together. Where a merge weaves two histories into a Y shape, a rebase straightens them into a single line.', 'git rebase আপনার ব্রাঞ্চে করা কমিটগুলো নিয়ে একে একে অন্য একটি base কমিটের ওপরে আবার বসায়—সাধারণত main-এর সর্বশেষ মাথায়। ফলাফল একটি পরিষ্কার, লিনিয়ার ইতিহাস: আপনার কাজ এমন দেখায় যেন আপনি main-এর নতুন সংস্করণ থেকেই শুরু করেছিলেন, দুই রেখা জোড়া দেওয়ার কোনো merge কমিট ছাড়া। merge যেখানে দুটি ইতিহাসকে Y আকারে বোনে, rebase সেখানে সেগুলোকে একটি সরল রেখায় সোজা করে।') },
        { p: l('The problem rebase solves is a tangled history. When many people branch off main and merge back, the commit graph fills with crisscrossing merge commits that are hard to read. Rebase keeps history readable by making each feature a straight run of commits sitting cleanly on top of everything that came before. The catch — and it is a big one — is that replaying commits creates brand-new commits with new hashes, so the old commits are effectively rewritten.', 'rebase যে সমস্যা সমাধান করে তা হলো জট পাকানো ইতিহাস। যখন অনেকে main থেকে ব্রাঞ্চ কেটে আবার merge করে, কমিট গ্রাফ এলোমেলো merge কমিটে ভরে যায় যা পড়া কঠিন। rebase প্রতিটি ফিচারকে আগের সবকিছুর ওপরে পরিষ্কারভাবে বসা কমিটের সরল সারি বানিয়ে ইতিহাস পাঠযোগ্য রাখে। খটকা—আর সেটি বড়—হলো কমিট আবার বসানো নতুন hash-সহ একদম নতুন কমিট তৈরি করে, তাই পুরনো কমিটগুলো কার্যত নতুন করে লেখা হয়।') },
        { note: l('Rebase is like re-writing your handwritten notes onto the latest master copy of a document, so everything reads in one straight line instead of as scribbles in the margin. The words are the same, but every page is copied fresh — which is exactly why you never do this to a page a teammate is already reading from.', 'rebase হলো আপনার হাতে লেখা নোট একটি ডকুমেন্টের সর্বশেষ মাস্টার কপির ওপরে আবার লেখার মতো, যাতে সব মার্জিনের হিজিবিজি না হয়ে এক সরল রেখায় পড়া যায়। শব্দ একই, তবে প্রতিটি পৃষ্ঠা নতুন করে কপি হয়—আর ঠিক এ কারণেই একজন টিমমেট যে পৃষ্ঠা থেকে ইতিমধ্যে পড়ছে তাতে এটি কখনো করবেন না।'), kind: 'tip' },
      ],
    },
    {
      h: l('How rebase works, step by step', 'rebase কীভাবে কাজ করে, ধাপে ধাপে'),
      blocks: [
        { p: l('Suppose you branched off main, made three commits, and meanwhile a teammate pushed new commits to main. Your branch is now "behind." A rebase updates your branch by lifting your three commits off, fast-forwarding to the new main, and re-applying your commits on top.', 'ধরুন আপনি main থেকে ব্রাঞ্চ কেটে তিনটি কমিট করেছেন, আর এর মধ্যে একজন টিমমেট main-এ নতুন কমিট পুশ করেছে। আপনার ব্রাঞ্চ এখন "পিছিয়ে"। একটি rebase আপনার তিনটি কমিট তুলে নিয়ে, নতুন main-এ fast-forward করে, তারপর আপনার কমিটগুলো ওপরে আবার প্রয়োগ করে ব্রাঞ্চ আপডেট করে।') },
        { steps: [
          l('Git finds the common ancestor where your branch and main diverged, and sets aside each of your commits as a patch.', 'আপনার ব্রাঞ্চ ও main যেখানে আলাদা হয়েছে সেই সাধারণ পূর্বপুরুষ Git খুঁজে বের করে, ও আপনার প্রতিটি কমিটকে একটি patch হিসেবে আলাদা করে রাখে।'),
          l('It moves your branch pointer to the tip of main — the new base — as if you were starting from there.', 'এটি আপনার ব্রাঞ্চ পয়েন্টার main-এর মাথায়—নতুন base-এ—সরিয়ে নেয়, যেন আপনি সেখান থেকেই শুরু করছেন।'),
          l('It replays your saved patches one at a time on top of the new base, creating a new commit (a new hash) for each.', 'এটি আপনার সংরক্ষিত patch গুলো একে একে নতুন base-এর ওপরে আবার প্রয়োগ করে, প্রতিটির জন্য একটি নতুন কমিট (নতুন hash) বানায়।'),
          l('If a patch clashes with main’s changes, the rebase pauses so you can resolve the conflict, git add the fixed files, then git rebase --continue.', 'একটি patch main-এর পরিবর্তনের সঙ্গে সংঘর্ষ করলে rebase থামে যাতে আপনি conflict মেটাতে পারেন, ঠিক করা ফাইল git add করে git rebase --continue করেন।'),
          l('When the last commit is replayed, your branch is linear and up to date; if things go wrong, git rebase --abort returns you to exactly where you started.', 'শেষ কমিট আবার বসলে আপনার ব্রাঞ্চ লিনিয়ার ও হালনাগাদ; কিছু ভুল হলে git rebase --abort আপনাকে ঠিক শুরুর জায়গায় ফিরিয়ে দেয়।'),
        ] },
        { code: `# your feature branch is behind the latest main
git switch feature/login
git fetch origin

# replay your commits on top of the newest main
git rebase origin/main

# if a commit conflicts, Git pauses — fix the files, then:
git add <resolved-file>
git rebase --continue

# changed your mind mid-rebase? undo it completely:
git rebase --abort`, caption: l('git rebase origin/main lifts your commits and re-applies them on the newest main; --continue resumes after a conflict, --abort rewinds to the start.', 'git rebase origin/main আপনার কমিট তুলে নতুন main-এ আবার বসায়; conflict-এর পর --continue চালিয়ে যায়, --abort শুরুতে ফিরিয়ে নেয়।') },
      ],
    },
    {
      h: l('The golden rule of rebase', 'rebase-এর সোনালি নিয়ম'),
      blocks: [
        { p: l('Because rebase replaces old commits with new ones that have different hashes, it rewrites history. That is perfectly safe on commits that live only on your own machine — but dangerous the moment those commits are shared. If you rebase commits that others have already pulled, their copy and your rewritten copy disagree, and Git can no longer line them up. Fixing that requires everyone to untangle duplicated commits by hand.', 'যেহেতু rebase পুরনো কমিটকে ভিন্ন hash-যুক্ত নতুন কমিট দিয়ে প্রতিস্থাপন করে, এটি ইতিহাস নতুন করে লেখে। শুধু আপনার নিজের মেশিনে থাকা কমিটে এটি পুরোপুরি নিরাপদ—কিন্তু সেই কমিট শেয়ার হওয়ার মুহূর্তেই বিপজ্জনক। অন্যরা ইতিমধ্যে টেনে নিয়েছে এমন কমিট rebase করলে তাদের কপি ও আপনার নতুন-লেখা কপি মেলে না, ও Git আর সেগুলো সারিবদ্ধ করতে পারে না। তা ঠিক করতে সবাইকে হাতে হাতে নকল কমিট ছাড়াতে হয়।') },
        { note: l('Never rebase commits that have been pushed and shared. Golden rule: rebase only your own local, un-pushed work. If a branch is public — main, or a branch a teammate has pulled — use git merge or git revert instead, which add history rather than rewriting it.', 'পুশ ও শেয়ার হওয়া কমিট কখনো rebase করবেন না। সোনালি নিয়ম: শুধু আপনার নিজের লোকাল, আন-পুশড কাজ rebase করুন। একটি ব্রাঞ্চ পাবলিক হলে—main, বা কোনো টিমমেট টেনে নিয়েছে এমন ব্রাঞ্চ—বরং git merge বা git revert ব্যবহার করুন, যা ইতিহাস নতুন করে না লিখে যোগ করে।'), kind: 'warn' },
      ],
    },
    {
      h: l('Merge vs rebase', 'merge বনাম rebase'),
      blocks: [
        { p: l('Merge and rebase both combine work from two branches; they differ in what the history looks like afterwards and how safe they are on shared branches.', 'merge ও rebase দুটোই দুই ব্রাঞ্চের কাজ মেলায়; পার্থক্য হলো এরপর ইতিহাস দেখতে কেমন হয় ও শেয়ার্ড ব্রাঞ্চে এরা কতটা নিরাপদ।') },
        { table: {
          head: [l('Aspect', 'দিক'), l('git merge', 'git merge'), l('git rebase', 'git rebase')],
          rows: [
            [l('History shape', 'ইতিহাসের আকার'), l('Preserves both lines; adds a merge commit (a Y branch).', 'দুই রেখা রাখে; একটি merge কমিট যোগ করে (Y শাখা)।'), l('Straightens into one linear line; no merge commit.', 'এক লিনিয়ার রেখায় সোজা করে; কোনো merge কমিট নেই।')],
            [l('Commit hashes', 'কমিট hash'), l('Unchanged — existing commits are kept as-is.', 'অপরিবর্তিত—বিদ্যমান কমিট যেমন আছে তেমন থাকে।'), l('Rewritten — replayed commits get new hashes.', 'নতুন করে লেখা—আবার বসানো কমিট নতুন hash পায়।')],
            [l('Records what really happened', 'যা আসলে ঘটেছে তা রাখে'), l('Yes — the exact branching is visible.', 'হ্যাঁ—ঠিক কীভাবে ব্রাঞ্চ হয়েছে দেখা যায়।'), l('No — it looks like linear work that never branched.', 'না—দেখে মনে হয় লিনিয়ার কাজ যা কখনো ব্রাঞ্চ হয়নি।')],
            [l('Safe on shared branches', 'শেয়ার্ড ব্রাঞ্চে নিরাপদ'), l('Yes — safe to merge public branches.', 'হ্যাঁ—পাবলিক ব্রাঞ্চ merge করা নিরাপদ।'), l('No — never rebase commits others have pulled.', 'না—অন্যরা টেনে নিয়েছে এমন কমিট কখনো rebase নয়।')],
            [l('Best for', 'কার জন্য সেরা'), l('Integrating shared branches; keeping a true record.', 'শেয়ার্ড ব্রাঞ্চ একত্র করা; সত্যিকারের রেকর্ড রাখা।'), l('Tidying your own branch before a pull request.', 'পুল রিকোয়েস্টের আগে নিজের ব্রাঞ্চ পরিপাটি করা।')],
          ],
        } },
      ],
    },
    {
      h: l('Key commands', 'মূল কমান্ড'),
      blocks: [
        { table: {
          head: [l('Goal', 'লক্ষ্য'), l('Command', 'কমান্ড')],
          rows: [
            [l('Rebase your branch onto main', 'আপনার ব্রাঞ্চ main-এ রিবেস'), l('git rebase main', 'git rebase main')],
            [l('Continue after fixing a conflict', 'conflict ঠিক করে চালিয়ে যান'), l('git rebase --continue', 'git rebase --continue')],
            [l('Cancel and return to the start', 'বাতিল করে শুরুতে ফিরুন'), l('git rebase --abort', 'git rebase --abort')],
            [l('Pull with rebase instead of merge', 'merge-এর বদলে rebase দিয়ে pull'), l('git pull --rebase', 'git pull --rebase')],
          ],
        } },
        { note: l('git pull --rebase fetches new commits and rebases your local work on top of them, avoiding the noisy "Merge branch main" commits that a plain git pull creates on every sync.', 'git pull --rebase নতুন কমিট এনে আপনার লোকাল কাজ তার ওপরে rebase করে, প্রতিবার sync-এ সাধারণ git pull যে ঘিঞ্জি "Merge branch main" কমিট বানায় তা এড়ায়।'), kind: 'tip' },
      ],
    },
    {
      h: l('When and where to use rebase', 'কখন ও কোথায় rebase ব্যবহার করবেন'),
      blocks: [
        { p: l('Reach for rebase to tidy your own feature branch before you share it. The classic workflow: you have been working on a branch for a day or two, main has moved on, and you want to open a pull request. Rebasing your branch onto the latest main first means your PR contains only your changes, applied cleanly on top of current main, so reviewers see a straight, easy-to-read history and the merge is trivial.', 'নিজের ফিচার ব্রাঞ্চ শেয়ারের আগে পরিপাটি করতে rebase নিন। ক্লাসিক ওয়ার্কফ্লো: আপনি এক-দুদিন একটি ব্রাঞ্চে কাজ করেছেন, main এগিয়ে গেছে, ও আপনি একটি পুল রিকোয়েস্ট খুলতে চান। আগে নিজের ব্রাঞ্চকে সর্বশেষ main-এ rebase করলে আপনার PR-এ শুধু আপনার পরিবর্তন থাকে, বর্তমান main-এর ওপরে পরিষ্কারভাবে বসানো, তাই রিভিউয়াররা একটি সরল, সহজ-পাঠ্য ইতিহাস দেখে ও merge সহজ হয়।') },
        { p: l('Prefer merge when integrating a shared or long-lived branch, or any time you want the history to record exactly how work came together — merges are honest and safe on public branches. And if you need to undo a commit that is already on a shared branch, use git revert, not a rebase or reset, because revert adds a new commit rather than rewriting the shared line.', 'একটি শেয়ার্ড বা দীর্ঘস্থায়ী ব্রাঞ্চ একত্র করার সময়, বা যখনই কাজ ঠিক কীভাবে একসঙ্গে এসেছে ইতিহাসে রাখতে চান তখন merge নিন—merge সৎ ও পাবলিক ব্রাঞ্চে নিরাপদ। আর শেয়ার্ড ব্রাঞ্চে থাকা কমিট আনডু করতে হলে rebase বা reset নয়, git revert ব্যবহার করুন, কারণ revert শেয়ার্ড রেখা নতুন করে না লিখে একটি নতুন কমিট যোগ করে।') },
      ],
    },
    {
      h: l('Common mistakes', 'সাধারণ ভুল'),
      blocks: [
        { list: [
          l('Rebasing a shared branch and force-pushing, which forces painful conflicts on everyone who had already pulled it.', 'শেয়ার্ড ব্রাঞ্চ rebase করে force-push করা, যা যারা ইতিমধ্যে টেনে নিয়েছে তাদের সবাইকে কষ্টকর conflict-এ ফেলে।'),
          l('Rebasing main itself instead of your feature branch — you almost always rebase your branch onto main, not the reverse.', 'ফিচার ব্রাঞ্চের বদলে main নিজেই rebase করা—আপনি প্রায় সবসময় নিজের ব্রাঞ্চকে main-এ rebase করেন, উল্টোটা নয়।'),
          l('Abandoning a rebase halfway with conflicts unresolved, leaving the branch in a confusing half-rebased state instead of running --continue or --abort.', 'conflict না মিটিয়ে rebase মাঝপথে ছেড়ে দেওয়া, --continue বা --abort না চালিয়ে ব্রাঞ্চকে বিভ্রান্তিকর অর্ধ-rebased অবস্থায় রাখা।'),
          l('Using git push --force after a rebase; prefer git push --force-with-lease, which refuses to overwrite work you have not seen.', 'rebase-এর পর git push --force ব্যবহার করা; বরং git push --force-with-lease নিন, যা আপনি দেখেননি এমন কাজ মুছতে অস্বীকার করে।'),
        ] },
      ],
    },
    {
      h: l('Remember in one line', 'এক লাইনে মনে রাখুন'),
      blocks: [
        { list: [
          l('Rebase replays your commits on a new base, giving a clean linear history with no merge commit.', 'rebase আপনার কমিট নতুন base-এ আবার বসায়, merge কমিট ছাড়া পরিষ্কার লিনিয়ার ইতিহাস দেয়।'),
          l('Golden rule: rebase only your own un-pushed work; never rebase shared or pushed history.', 'সোনালি নিয়ম: শুধু নিজের আন-পুশড কাজ rebase করুন; শেয়ার্ড বা পুশড ইতিহাস কখনো rebase নয়।'),
          l('Rebase to tidy a branch before a PR; merge to combine shared branches; revert to undo a public commit.', 'PR-এর আগে ব্রাঞ্চ পরিপাটি করতে rebase; শেয়ার্ড ব্রাঞ্চ মেলাতে merge; পাবলিক কমিট আনডু করতে revert।'),
        ] },
      ],
    },
  ],

  // ── git-tags · Tags & releases ────────────────────────────────────────────
  'git-tags': [
    {
      h: l('What is a git tag?', 'git tag কী?'),
      blocks: [
        { p: l('A tag is a permanent, human-friendly name pinned to one specific commit. While branches move forward every time you commit, a tag stays fixed on the exact commit it was created on — forever. Tags are almost always used to mark release versions, like v1.2.0, so that months later you can point to the precise snapshot of code that shipped as that version.', 'tag হলো একটি নির্দিষ্ট কমিটে আটকানো স্থায়ী, মানুষ-বান্ধব নাম। ব্রাঞ্চ প্রতিবার কমিট করলে সামনে এগোয়, কিন্তু tag যে ঠিক কমিটে বানানো হয়েছে তাতেই স্থির থাকে—চিরকাল। tag প্রায় সবসময় রিলিজ ভার্সন চিহ্নিত করতে ব্যবহৃত হয়, যেমন v1.2.0, যাতে মাস পরেও আপনি ঠিক যে কোডের স্ন্যাপশট সেই ভার্সন হিসেবে গেছে তা দেখাতে পারেন।') },
        { p: l('The problem tags solve is finding a meaningful point in history. A commit hash like 9f2c3ab is precise but meaningless to humans; "v1.2.0" says exactly what it is. When a bug report says "broken since v1.2.0," a tag lets you check out that exact code in one command. Tags are how releases, deployments, and rollbacks refer to fixed points instead of ever-moving branch tips.', 'tag যে সমস্যা সমাধান করে তা হলো ইতিহাসে একটি অর্থপূর্ণ বিন্দু খুঁজে পাওয়া। 9f2c3ab-এর মতো একটি কমিট hash নিখুঁত কিন্তু মানুষের কাছে অর্থহীন; "v1.2.0" ঠিক কী তা বলে দেয়। একটি বাগ রিপোর্টে "v1.2.0 থেকে ভাঙা" বললে একটি কমান্ডেই সেই ঠিক কোড check out করতে দেয় tag। রিলিজ, ডিপ্লয়মেন্ট ও রোলব্যাক সবসময়-নড়া ব্রাঞ্চের মাথার বদলে স্থির বিন্দুকে যেভাবে বোঝায়, তা-ই tag।') },
        { note: l('A tag is like a bookmark labelled "final edition" pinned to one exact page of a book’s history. New pages keep getting written (new commits), but the bookmark never moves — it always points to that one page you marked.', 'tag হলো একটি বইয়ের ইতিহাসের ঠিক একটি পৃষ্ঠায় আটকানো "ফাইনাল সংস্করণ" লেখা বুকমার্কের মতো। নতুন পৃষ্ঠা লেখা হতেই থাকে (নতুন কমিট), তবে বুকমার্ক কখনো নড়ে না—এটি সবসময় আপনার চিহ্নিত সেই এক পৃষ্ঠাকেই দেখায়।'), kind: 'tip' },
      ],
    },
    {
      h: l('How tagging works, step by step', 'ট্যাগিং কীভাবে কাজ করে, ধাপে ধাপে'),
      blocks: [
        { p: l('The usual flow is: finish and test the code you want to release, tag that commit with a version name, then push the tag to GitHub so it becomes a shared, visible release point.', 'সাধারণ প্রবাহ: যে কোড রিলিজ করতে চান তা শেষ করে টেস্ট করুন, সেই কমিটকে একটি ভার্সন নাম দিয়ে tag করুন, তারপর tag-টি GitHub-এ push করুন যাতে তা একটি শেয়ার্ড, দৃশ্যমান রিলিজ বিন্দু হয়।') },
        { steps: [
          l('Make sure you are on the commit you want to release (usually the tip of main after merging your release work).', 'নিশ্চিত করুন আপনি যে কমিট রিলিজ করতে চান তাতে আছেন (সাধারণত রিলিজ কাজ merge করার পর main-এর মাথা)।'),
          l('Create an annotated tag with a version name and a message: git tag -a v1.0.0 -m "First stable release".', 'একটি ভার্সন নাম ও মেসেজসহ annotated tag বানান: git tag -a v1.0.0 -m "First stable release"।'),
          l('Verify it locally with git tag (lists all tags) and git show v1.0.0 (shows the tag and the commit it points to).', 'লোকালি যাচাই করুন git tag (সব tag দেখায়) ও git show v1.0.0 (tag ও যে কমিটকে দেখায় তা দেখায়) দিয়ে।'),
          l('Push the tag — tags are not sent by a normal git push. Use git push origin v1.0.0 for one tag, or git push --follow-tags to send commits plus your annotated tags together.', 'tag push করুন—সাধারণ git push tag পাঠায় না। এক tag-এ git push origin v1.0.0 নিন, বা কমিট ও annotated tag একসঙ্গে পাঠাতে git push --follow-tags।'),
          l('On GitHub, the pushed tag appears under Releases, where you can attach notes and downloadable assets.', 'GitHub-এ পুশ করা tag Releases-এর নিচে দেখা যায়, যেখানে নোট ও ডাউনলোডযোগ্য অ্যাসেট যুক্ত করতে পারেন।'),
        ] },
        { code: `# tag the current commit as a release
git tag -a v1.0.0 -m "First stable release"

# see it and inspect what it points to
git tag
git show v1.0.0

# push it — a plain git push does NOT send tags
git push origin v1.0.0

# or push your commits and annotated tags together
git push --follow-tags`, caption: l('git tag -a creates an annotated tag; git push origin <tag> or git push --follow-tags publishes it — a normal push leaves tags behind.', 'git tag -a একটি annotated tag বানায়; git push origin <tag> বা git push --follow-tags তা প্রকাশ করে—সাধারণ push tag রেখে যায়।') },
      ],
    },
    {
      h: l('Annotated vs lightweight tags', 'annotated বনাম lightweight tag'),
      blocks: [
        { p: l('Git has two kinds of tags. For releases you almost always want annotated tags, which store real metadata; lightweight tags are just a bare pointer with no extra information.', 'Git-এ দুই ধরনের tag আছে। রিলিজের জন্য আপনি প্রায় সবসময় annotated tag চান, যা আসল metadata রাখে; lightweight tag শুধু একটি খালি পয়েন্টার, কোনো বাড়তি তথ্য নেই।') },
        { table: {
          head: [l('Aspect', 'দিক'), l('Annotated (git tag -a)', 'Annotated (git tag -a)'), l('Lightweight (git tag)', 'Lightweight (git tag)')],
          rows: [
            [l('Stores author, date, message', 'লেখক, তারিখ, মেসেজ রাখে'), l('Yes — a full tag object.', 'হ্যাঁ—একটি পূর্ণ tag অবজেক্ট।'), l('No — just a name pointing at a commit.', 'না—শুধু একটি কমিটকে দেখানো নাম।')],
            [l('Powers GitHub Releases', 'GitHub Releases চালায়'), l('Yes — the recommended choice.', 'হ্যাঁ—সুপারিশকৃত পছন্দ।'), l('Poorly — treated as a plain reference.', 'দুর্বলভাবে—সাধারণ রেফারেন্স হিসেবে গণ্য।')],
            [l('How to create', 'কীভাবে বানাবেন'), l('git tag -a v1.0.0 -m "..."', 'git tag -a v1.0.0 -m "..."'), l('git tag v1.0.0', 'git tag v1.0.0')],
            [l('Best for', 'কার জন্য সেরা'), l('Public releases and versioned milestones.', 'পাবলিক রিলিজ ও ভার্সনড মাইলস্টোন।'), l('Quick, private, throwaway bookmarks.', 'দ্রুত, ব্যক্তিগত, ফেলে-দেওয়া বুকমার্ক।')],
          ],
        } },
      ],
    },
    {
      h: l('Key commands', 'মূল কমান্ড'),
      blocks: [
        { table: {
          head: [l('Goal', 'লক্ষ্য'), l('Command', 'কমান্ড')],
          rows: [
            [l('Create an annotated tag', 'annotated tag বানান'), l('git tag -a v1.0.0 -m "…"', 'git tag -a v1.0.0 -m "…"')],
            [l('List all tags', 'সব tag তালিকা'), l('git tag', 'git tag')],
            [l('Push one specific tag', 'একটি নির্দিষ্ট tag push'), l('git push origin v1.0.0', 'git push origin v1.0.0')],
            [l('Push commits and tags together', 'কমিট ও tag একসঙ্গে push'), l('git push --follow-tags', 'git push --follow-tags')],
          ],
        } },
      ],
    },
    {
      h: l('When and where to use tags', 'কখন ও কোথায় tag ব্যবহার করবেন'),
      blocks: [
        { p: l('Tag whenever you cut a release or reach a milestone worth returning to: shipping v2.0.0, marking a version deployed to production, or pinning a snapshot before a risky change. Because a tag is a fixed name, your CI/CD pipeline, changelog, and rollback scripts can all refer to "v1.2.0" and always mean the same commit. Semantic versioning — MAJOR.MINOR.PATCH, like v1.4.2 — is the common naming scheme.', 'যখনই একটি রিলিজ কাটেন বা ফিরে আসার মতো একটি মাইলস্টোনে পৌঁছান তখন tag করুন: v2.0.0 শিপ করা, প্রোডাকশনে ডিপ্লয় করা একটি ভার্সন চিহ্নিত করা, বা ঝুঁকিপূর্ণ পরিবর্তনের আগে একটি স্ন্যাপশট পিন করা। tag একটি স্থির নাম বলে আপনার CI/CD পাইপলাইন, changelog ও রোলব্যাক স্ক্রিপ্ট সবাই "v1.2.0" বলতে পারে ও সবসময় একই কমিট বোঝায়। সিমান্টিক ভার্সনিং—MAJOR.MINOR.PATCH, যেমন v1.4.2—সাধারণ নামকরণ পদ্ধতি।') },
        { p: l('You do not tag every commit — that would make tags meaningless. Reserve tags for points you genuinely need to name and return to. For day-to-day "where am I" work, branches and commit hashes are enough; tags are for the small set of moments that matter to users and releases.', 'আপনি প্রতিটি কমিট tag করেন না—তাতে tag অর্থহীন হয়ে যেত। যেসব বিন্দু সত্যিই নাম দিয়ে ফিরে আসা দরকার সেগুলোর জন্য tag রাখুন। প্রতিদিনের "আমি কোথায়" কাজে ব্রাঞ্চ ও কমিট hash যথেষ্ট; tag হলো ব্যবহারকারী ও রিলিজের কাছে গুরুত্বপূর্ণ ছোট কিছু মুহূর্তের জন্য।') },
      ],
    },
    {
      h: l('Common mistakes', 'সাধারণ ভুল'),
      blocks: [
        { list: [
          l('Forgetting that tags are not pushed by default — a normal git push sends commits but leaves tags behind, so your release never appears on GitHub. Push them with git push origin <tag> or git push --follow-tags.', 'ভুলে যাওয়া যে tag ডিফল্টে push হয় না—সাধারণ git push কমিট পাঠায় কিন্তু tag রেখে যায়, তাই রিলিজ GitHub-এ আসে না। git push origin <tag> বা git push --follow-tags দিয়ে পাঠান।'),
          l('Using a lightweight tag for a real release, so it carries no author, date, or message and does not power GitHub Releases well.', 'আসল রিলিজে lightweight tag ব্যবহার করা, ফলে তাতে কোনো লেখক, তারিখ বা মেসেজ থাকে না ও GitHub Releases ভালোভাবে চালায় না।'),
          l('Moving or reusing a tag name after it is published; a released tag should be permanent — cut a new version instead.', 'প্রকাশের পর একটি tag নাম সরানো বা আবার ব্যবহার করা; প্রকাশিত tag স্থায়ী হওয়া উচিত—বরং একটি নতুন ভার্সন কাটুন।'),
          l('Inconsistent version names (v1, version-1.0, rel_1) that break tooling; pick one scheme like vMAJOR.MINOR.PATCH and stick to it.', 'অসামঞ্জস্য ভার্সন নাম (v1, version-1.0, rel_1) যা টুলিং ভাঙে; vMAJOR.MINOR.PATCH-এর মতো একটি পদ্ধতি বেছে তাতে অটল থাকুন।'),
        ] },
      ],
    },
    {
      h: l('Remember in one line', 'এক লাইনে মনে রাখুন'),
      blocks: [
        { list: [
          l('A tag is a permanent name pinned to one commit, used mainly for release versions like v1.2.0.', 'tag হলো এক কমিটে আটকানো স্থায়ী নাম, মূলত v1.2.0-এর মতো রিলিজ ভার্সনে ব্যবহৃত।'),
          l('Prefer annotated tags (git tag -a) — they store author, date, and message and power GitHub Releases.', 'annotated tag (git tag -a) নিন—এগুলো লেখক, তারিখ ও মেসেজ রাখে ও GitHub Releases চালায়।'),
          l('Tags are not pushed by default; publish them with git push origin <tag> or git push --follow-tags.', 'tag ডিফল্টে push হয় না; git push origin <tag> বা git push --follow-tags দিয়ে প্রকাশ করুন।'),
        ] },
      ],
    },
  ],

  // ── git-remotes · Remotes: origin & upstream ──────────────────────────────
  'git-remotes': [
    {
      h: l('What is a remote?', 'remote কী?'),
      blocks: [
        { p: l('A remote is a named URL that points at another copy of your repository — usually one hosted on GitHub. Instead of typing a long URL every time you sync, you give it a short name and use that. By convention, origin is the name for your main remote (the repo you cloned from or pushed to), and upstream is the name for the original repo you forked from, when you are contributing to someone else’s project.', 'remote হলো একটি নামযুক্ত URL যা আপনার রিপোজিটরির আরেকটি কপিকে নির্দেশ করে—সাধারণত GitHub-এ হোস্ট করা একটি। প্রতিবার sync করতে লম্বা URL না লিখে আপনি একে একটি ছোট নাম দিয়ে তা ব্যবহার করেন। প্রথা অনুযায়ী origin হলো আপনার প্রধান remote-এর নাম (যে রিপো থেকে clone করেছেন বা যাতে push করেছেন), আর upstream হলো যে মূল রিপো থেকে fork করেছেন তার নাম, যখন অন্যের প্রকল্পে অবদান রাখছেন।') },
        { p: l('The problem remotes solve is coordination between separate copies. Git is distributed: everyone has a full copy of the repo on their own machine, and a remote is the shared meeting point they all sync through. Your commits stay entirely on your machine until you explicitly send them to a remote — this is why understanding remotes is the difference between "saved locally" and "shared with the team."', 'remote যে সমস্যা সমাধান করে তা হলো আলাদা কপিগুলোর মধ্যে সমন্বয়। Git বিতরণকৃত: প্রত্যেকের নিজের মেশিনে রিপোর একটি পূর্ণ কপি থাকে, আর remote হলো সেই শেয়ার্ড মিলনস্থল যার মধ্য দিয়ে সবাই sync করে। স্পষ্টভাবে remote-এ না পাঠানো পর্যন্ত আপনার কমিট পুরোপুরি আপনার মেশিনেই থাকে—এ কারণেই remote বোঝাই "লোকালি সেভড" ও "টিমের সঙ্গে শেয়ারড"-এর পার্থক্য।') },
        { note: l('Remotes are like saved addresses in your phone’s contacts. You do not memorize a long URL any more than you memorize a phone number — you save it once under a short name like origin or upstream, and from then on you just use the name.', 'remote হলো আপনার ফোনের কন্টাক্টে সংরক্ষিত ঠিকানার মতো। ফোন নম্বর মুখস্থ না করার মতোই আপনি একটি লম্বা URL মুখস্থ করেন না—একবার origin বা upstream-এর মতো ছোট নামে সেভ করেন, তারপর থেকে শুধু নামটাই ব্যবহার করেন।'), kind: 'tip' },
      ],
    },
    {
      h: l('How remotes work, step by step', 'remote কীভাবে কাজ করে, ধাপে ধাপে'),
      blocks: [
        { p: l('When you clone a repo, Git sets up origin for you automatically. When you start a repo locally with git init, there is no remote yet — you add one to connect it to GitHub. Contributing to someone else’s project adds a second remote, upstream.', 'একটি রিপো clone করলে Git স্বয়ংক্রিয়ভাবে আপনার জন্য origin সেট করে। git init দিয়ে লোকালি রিপো শুরু করলে এখনো কোনো remote নেই—GitHub-এ যুক্ত করতে আপনি একটি যোগ করেন। অন্যের প্রকল্পে অবদান রাখলে দ্বিতীয় একটি remote, upstream, যোগ হয়।') },
        { steps: [
          l('See what remotes you already have: git remote -v lists each name with its fetch and push URLs.', 'কোন remote আছে দেখুন: git remote -v প্রতিটি নাম তার fetch ও push URL সহ দেখায়।'),
          l('If you started locally, connect it to GitHub: git remote add origin <url> creates the origin remote.', 'লোকালি শুরু করলে GitHub-এ যুক্ত করুন: git remote add origin <url> origin remote বানায়।'),
          l('When contributing to a fork, add the original project as a second remote: git remote add upstream <url>.', 'একটি fork-এ অবদান রাখলে মূল প্রকল্পকে দ্বিতীয় remote হিসেবে যোগ করুন: git remote add upstream <url>।'),
          l('If a URL changes (for example switching from HTTPS to SSH), update it in place: git remote set-url origin <url>.', 'একটি URL বদলালে (যেমন HTTPS থেকে SSH-এ যাওয়া) জায়গায় আপডেট করুন: git remote set-url origin <url>।'),
          l('From then on, fetch, pull, and push all refer to the remote by its short name, e.g. git push origin main.', 'তারপর থেকে fetch, pull ও push সবাই remote-কে তার ছোট নামে বোঝায়, যেমন git push origin main।'),
        ] },
        { code: `# what remotes does this repo know about?
git remote -v

# connect a brand-new local repo to GitHub
git remote add origin git@github.com:you/project.git

# contributing to a fork? add the original as upstream
git remote add upstream https://github.com/original/project.git

# switched from HTTPS to SSH? update the URL in place
git remote set-url origin git@github.com:you/project.git`, caption: l('git remote -v shows your remotes; add creates one, set-url changes an existing one — origin is yours, upstream is the repo you forked from.', 'git remote -v আপনার remote দেখায়; add একটি বানায়, set-url বিদ্যমানটি বদলায়—origin আপনার, upstream যেখান থেকে fork করেছেন।') },
      ],
    },
    {
      h: l('origin vs upstream', 'origin বনাম upstream'),
      blocks: [
        { p: l('These two names are just conventions, but following them keeps every project readable. Here is what each one means in a typical fork-and-contribute workflow.', 'এই দুটি নাম শুধু প্রথা, তবে এগুলো মানলে প্রতিটি প্রকল্প পাঠযোগ্য থাকে। একটি সাধারণ fork-ও-অবদান ওয়ার্কফ্লোতে প্রতিটি কী বোঝায় তা এই।') },
        { table: {
          head: [l('Name', 'নাম'), l('What it points to', 'কী নির্দেশ করে'), l('You use it to', 'যা করতে ব্যবহার করেন')],
          rows: [
            [l('origin', 'origin'), l('Your own copy — the repo you cloned or your personal fork on GitHub.', 'আপনার নিজের কপি—যে রিপো clone করেছেন বা GitHub-এ আপনার ব্যক্তিগত fork।'), l('Push your commits and pull your own branches.', 'আপনার কমিট push ও নিজের ব্রাঞ্চ pull করা।')],
            [l('upstream', 'upstream'), l('The original project you forked from.', 'যে মূল প্রকল্প থেকে fork করেছেন।'), l('Fetch the latest official changes to stay in sync.', 'sync-এ থাকতে সর্বশেষ অফিসিয়াল পরিবর্তন fetch করা।')],
          ],
        } },
        { note: l('You typically pull from upstream (to get the project’s latest work) and push to origin (your own fork). You cannot push to upstream unless you have write access — that is exactly why forks and pull requests exist.', 'আপনি সাধারণত upstream থেকে pull করেন (প্রকল্পের সর্বশেষ কাজ পেতে) ও origin-এ push করেন (আপনার নিজের fork)। রাইট অ্যাক্সেস না থাকলে upstream-এ push করতে পারবেন না—ঠিক এ কারণেই fork ও পুল রিকোয়েস্ট আছে।'), kind: 'tip' },
      ],
    },
    {
      h: l('Key commands', 'মূল কমান্ড'),
      blocks: [
        { table: {
          head: [l('Goal', 'লক্ষ্য'), l('Command', 'কমান্ড')],
          rows: [
            [l('List your remotes', 'আপনার remote তালিকা'), l('git remote -v', 'git remote -v')],
            [l('Add a remote named origin', 'origin নামে remote যোগ'), l('git remote add origin <url>', 'git remote add origin <url>')],
            [l('Change a remote’s URL', 'একটি remote-এর URL বদলান'), l('git remote set-url origin <url>', 'git remote set-url origin <url>')],
            [l('Add the upstream remote', 'upstream remote যোগ'), l('git remote add upstream <url>', 'git remote add upstream <url>')],
          ],
        } },
      ],
    },
    {
      h: l('When and where to use remotes', 'কখন ও কোথায় remote ব্যবহার করবেন'),
      blocks: [
        { p: l('You interact with remotes any time work needs to leave or enter your machine: backing up to GitHub, sharing a branch, collaborating with a team, or contributing to open source. A solo project on one laptop technically needs no remote — Git works fully offline — but you add one the moment you want a backup or a second machine. For team work, remotes are the shared source of truth everyone fetches from and pushes to.', 'যখনই কাজ আপনার মেশিন ছাড়তে বা ঢুকতে হয় তখনই আপনি remote-এর সঙ্গে কাজ করেন: GitHub-এ ব্যাকআপ, একটি ব্রাঞ্চ শেয়ার, একটি টিমের সঙ্গে সহযোগিতা, বা ওপেন সোর্সে অবদান। এক ল্যাপটপে একক প্রকল্পে কারিগরিভাবে কোনো remote লাগে না—Git পুরোপুরি অফলাইনে চলে—তবে ব্যাকআপ বা দ্বিতীয় মেশিন চাওয়ার মুহূর্তেই একটি যোগ করেন। টিম কাজে remote হলো শেয়ার্ড সত্যের উৎস যা থেকে সবাই fetch ও যাতে push করে।') },
        { p: l('The two-remote setup (origin + upstream) is specifically for the fork workflow used across open source: you fork a project to your account (origin), clone your fork, add the original as upstream, and regularly fetch upstream so your fork does not drift out of date while you work.', 'দুই-remote সেটআপ (origin + upstream) নির্দিষ্টভাবে ওপেন সোর্সজুড়ে ব্যবহৃত fork ওয়ার্কফ্লোর জন্য: আপনি একটি প্রকল্প নিজের অ্যাকাউন্টে fork করেন (origin), নিজের fork clone করেন, মূলটিকে upstream হিসেবে যোগ করেন, ও নিয়মিত upstream fetch করেন যাতে কাজ করার সময় আপনার fork পুরনো হয়ে না যায়।') },
      ],
    },
    {
      h: l('Common mistakes', 'সাধারণ ভুল'),
      blocks: [
        { list: [
          l('Assuming git commit updates GitHub — commits stay entirely local until you explicitly git push them to a remote.', 'git commit GitHub আপডেট করে ভাবা—স্পষ্টভাবে remote-এ git push না করা পর্যন্ত কমিট পুরোপুরি লোকালই থাকে।'),
          l('Adding a second origin instead of upstream, or mixing the two up, so you push to the wrong repo or cannot find the project’s latest work.', 'upstream-এর বদলে দ্বিতীয় একটি origin যোগ করা, বা দুটো গুলিয়ে ফেলা, ফলে ভুল রিপোতে push করা বা প্রকল্পের সর্বশেষ কাজ খুঁজে না পাওয়া।'),
          l('Cloning over SSH but then pasting an HTTPS URL (or vice versa), causing authentication failures — fix with git remote set-url.', 'SSH দিয়ে clone করে পরে একটি HTTPS URL বসানো (বা উল্টো), যা authentication ব্যর্থতা ঘটায়—git remote set-url দিয়ে ঠিক করুন।'),
          l('Forgetting to fetch upstream for weeks, so your fork drifts far behind and later merges become painful.', 'সপ্তাহের পর সপ্তাহ upstream fetch করতে ভুলে যাওয়া, ফলে fork অনেক পিছিয়ে পড়ে ও পরে merge কষ্টকর হয়।'),
        ] },
      ],
    },
    {
      h: l('Remember in one line', 'এক লাইনে মনে রাখুন'),
      blocks: [
        { list: [
          l('A remote is a named URL for a copy of your repo; origin is yours, upstream is the repo you forked from.', 'remote হলো আপনার রিপোর একটি কপির নামযুক্ত URL; origin আপনার, upstream যেখান থেকে fork করেছেন।'),
          l('Your commits stay local until you push; a remote is how work is shared between machines and people.', 'push না করা পর্যন্ত কমিট লোকাল থাকে; remote হলো মেশিন ও মানুষের মধ্যে কাজ শেয়ারের উপায়।'),
          l('Use git remote -v to inspect, git remote add to connect, and git remote set-url to fix a URL.', 'দেখতে git remote -v, যুক্ত করতে git remote add, ও URL ঠিক করতে git remote set-url ব্যবহার করুন।'),
        ] },
      ],
    },
  ],

  // ── git-push-pull · Sync: fetch, pull, push ───────────────────────────────
  'git-push-pull': [
    {
      h: l('What are fetch, pull, and push?', 'fetch, pull ও push কী?'),
      blocks: [
        { p: l('These three commands move commits between your machine and a remote. git fetch downloads new commits from the remote but does not touch your working files — it just updates your local copy of the remote’s branches. git pull does a fetch and then integrates those commits into your current branch. git push does the opposite direction: it uploads your local commits to the remote so others can see them.', 'এই তিনটি কমান্ড আপনার মেশিন ও একটি remote-এর মধ্যে কমিট সরায়। git fetch remote থেকে নতুন কমিট নামায় কিন্তু আপনার ওয়ার্কিং ফাইল স্পর্শ করে না—এটি শুধু remote-এর ব্রাঞ্চের আপনার লোকাল কপি আপডেট করে। git pull একটি fetch করে তারপর সেই কমিটগুলো আপনার বর্তমান ব্রাঞ্চে যুক্ত করে। git push উল্টো দিকে করে: এটি আপনার লোকাল কমিট remote-এ তোলে যাতে অন্যরা দেখতে পারে।') },
        { p: l('The problem these solve is keeping separate copies in sync. Everyone works on their own machine, so the remote and your local repo constantly drift apart as people commit. Fetch and pull bring their work down to you; push sends yours up to them. Getting the timing right — pull before you start, pull again before you push — is what keeps a team from stepping on each other.', 'এগুলো যে সমস্যা সমাধান করে তা হলো আলাদা কপিগুলো sync-এ রাখা। প্রত্যেকে নিজের মেশিনে কাজ করে, তাই মানুষ কমিট করার সঙ্গে সঙ্গে remote ও আপনার লোকাল রিপো অবিরত আলাদা হতে থাকে। fetch ও pull তাদের কাজ আপনার কাছে নামায়; push আপনারটা তাদের কাছে পাঠায়। সময় ঠিক রাখা—শুরুর আগে pull, push-এর আগে আবার pull—একটি টিমকে একে অপরের ওপর পা দেওয়া থেকে বাঁচায়।') },
        { note: l('Think of a shared drive. You pull to get everyone’s latest work before you begin, and you push to publish yours when you are done. Skip the pull and you build on a stale copy; skip the push and nobody ever sees what you did.', 'একটি শেয়ার্ড ড্রাইভ ভাবুন। শুরুর আগে সবার সর্বশেষ কাজ পেতে pull করেন, আর শেষ হলে নিজেরটা প্রকাশ করতে push করেন। pull বাদ দিলে পুরনো কপির ওপর বানান; push বাদ দিলে আপনি কী করলেন তা কেউ কখনো দেখে না।'), kind: 'tip' },
      ],
    },
    {
      h: l('How syncing works, step by step', 'sync কীভাবে কাজ করে, ধাপে ধাপে'),
      blocks: [
        { p: l('A healthy daily rhythm looks like this: pull the latest before you start, do your work in commits, then pull once more and push. The first-ever push of a new branch needs one extra flag to link it to the remote.', 'একটি সুস্থ দৈনিক ছন্দ এমন: শুরুর আগে সর্বশেষটা pull করুন, কমিটে কাজ করুন, তারপর আরেকবার pull করে push করুন। একটি নতুন ব্রাঞ্চের একদম প্রথম push-এ remote-এর সঙ্গে যুক্ত করতে একটি বাড়তি ফ্ল্যাগ লাগে।') },
        { steps: [
          l('Before starting, pull the latest so you build on current work: git pull (or git fetch to preview first).', 'শুরুর আগে সর্বশেষটা pull করুন যাতে বর্তমান কাজের ওপর বানান: git pull (বা আগে দেখতে git fetch)।'),
          l('Do your work, making one or more commits locally. Nothing has left your machine yet.', 'কাজ করুন, লোকালি এক বা একাধিক কমিট করুন। এখনো কিছুই আপনার মেশিন ছাড়েনি।'),
          l('Before pushing, pull again to fold in anything teammates pushed while you worked; resolve any conflicts now.', 'push-এর আগে আবার pull করুন যাতে আপনি কাজ করার সময় টিমমেটরা যা push করেছে তা যুক্ত হয়; এখনই যেকোনো conflict মেটান।'),
          l('Push your commits. The first time on a new branch, use git push -u origin <branch> to set its upstream link.', 'আপনার কমিট push করুন। নতুন ব্রাঞ্চে প্রথমবার git push -u origin <branch> দিয়ে এর upstream লিংক সেট করুন।'),
          l('After that first push, a plain git push and git pull know which remote branch to use automatically.', 'সেই প্রথম push-এর পর সাধারণ git push ও git pull স্বয়ংক্রিয়ভাবে জানে কোন remote ব্রাঞ্চ ব্যবহার করতে হবে।'),
        ] },
        { code: `# get the latest before you start
git pull

# ... make your commits ...

# preview remote changes without merging them (safe)
git fetch --prune

# first push of a new branch: link it to origin
git push -u origin feature/login

# after that, a plain push is enough
git push`, caption: l('git fetch only downloads (safe); git pull downloads and integrates; git push -u origin <branch> links a new branch so later pushes are just git push.', 'git fetch শুধু নামায় (নিরাপদ); git pull নামিয়ে যুক্ত করে; git push -u origin <branch> নতুন ব্রাঞ্চ যুক্ত করে যাতে পরে শুধু git push যথেষ্ট।') },
      ],
    },
    {
      h: l('fetch vs pull vs push', 'fetch বনাম pull বনাম push'),
      blocks: [
        { table: {
          head: [l('Command', 'কমান্ড'), l('Direction', 'দিক'), l('Changes your files?', 'আপনার ফাইল বদলায়?'), l('When to use', 'কখন ব্যবহার')],
          rows: [
            [l('git fetch', 'git fetch'), l('Remote → local (download only)', 'Remote → লোকাল (শুধু ডাউনলোড)'), l('No — updates remote-tracking branches only.', 'না—শুধু remote-tracking ব্রাঞ্চ আপডেট করে।'), l('To safely see what changed before integrating.', 'যুক্ত করার আগে কী বদলেছে নিরাপদে দেখতে।')],
            [l('git pull', 'git pull'), l('Remote → local, then merge/rebase', 'Remote → লোকাল, তারপর merge/rebase'), l('Yes — integrates commits into your branch.', 'হ্যাঁ—কমিট আপনার ব্রাঞ্চে যুক্ত করে।'), l('To update your branch with the latest work.', 'সর্বশেষ কাজ দিয়ে ব্রাঞ্চ আপডেট করতে।')],
            [l('git push', 'git push'), l('Local → remote (upload)', 'লোকাল → Remote (আপলোড)'), l('Yes — on the remote, publishes your commits.', 'হ্যাঁ—remote-এ, আপনার কমিট প্রকাশ করে।'), l('To share your commits with everyone else.', 'আপনার কমিট বাকিদের সঙ্গে শেয়ার করতে।')],
          ],
        } },
        { note: l('git fetch is always safe because it changes nothing in your working directory — it only updates your view of the remote. git pull is convenient but, because it integrates immediately, it can trigger a merge conflict you must resolve on the spot.', 'git fetch সবসময় নিরাপদ কারণ এটি আপনার ওয়ার্কিং ডিরেক্টরিতে কিছুই বদলায় না—শুধু remote সম্পর্কে আপনার দৃশ্য আপডেট করে। git pull সুবিধাজনক তবে সঙ্গে সঙ্গে যুক্ত করে বলে একটি merge conflict আনতে পারে যা তখনই মেটাতে হয়।'), kind: 'tip' },
      ],
    },
    {
      h: l('Key commands', 'মূল কমান্ড'),
      blocks: [
        { table: {
          head: [l('Goal', 'লক্ষ্য'), l('Command', 'কমান্ড')],
          rows: [
            [l('Download remote changes only', 'শুধু remote পরিবর্তন নামান'), l('git fetch --prune', 'git fetch --prune')],
            [l('Fetch and integrate (linear)', 'fetch করে যুক্ত (লিনিয়ার)'), l('git pull --rebase', 'git pull --rebase')],
            [l('Push a new branch the first time', 'নতুন ব্রাঞ্চ প্রথমবার push'), l('git push -u origin <branch>', 'git push -u origin <branch>')],
            [l('Force-push safely after a rebase', 'rebase-এর পর নিরাপদে force-push'), l('git push --force-with-lease', 'git push --force-with-lease')],
          ],
        } },
        { note: l('git push --force-with-lease is the safe way to overwrite a branch you rewrote: it refuses to push if the remote has commits you have not seen, so you cannot silently erase a teammate’s work — unlike the blunt git push --force.', 'git push --force-with-lease হলো আপনি নতুন করে লেখা একটি ব্রাঞ্চ মুছে লেখার নিরাপদ উপায়: remote-এ আপনি দেখেননি এমন কমিট থাকলে এটি push করতে অস্বীকার করে, তাই আপনি নীরবে টিমমেটের কাজ মুছতে পারেন না—ভোঁতা git push --force-এর বিপরীতে।'), kind: 'warn' },
      ],
    },
    {
      h: l('When and where to sync', 'কখন ও কোথায় sync করবেন'),
      blocks: [
        { p: l('Fetch or pull at the start of every work session and again right before you push, so you are always building on the newest code and your push lands without a rejection. Push whenever you have committed work worth sharing or backing up — small, frequent pushes are far easier to reconcile than one giant push after days of silence. Use git fetch when you just want to look before you leap, and git pull when you are ready to integrate.', 'প্রতিটি কাজের সেশনের শুরুতে ও push-এর ঠিক আগে আবার fetch বা pull করুন, যাতে সবসময় নতুন কোডের ওপর বানান ও আপনার push প্রত্যাখ্যান ছাড়া নামে। শেয়ার বা ব্যাকআপ করার মতো কাজ কমিট করলেই push করুন—ছোট, ঘন push দিনের পর দিন নীরবতার পর এক বিশাল push-এর চেয়ে অনেক সহজে মেলে। শুধু লাফানোর আগে দেখতে চাইলে git fetch, আর যুক্ত করতে প্রস্তুত হলে git pull ব্যবহার করুন।') },
        { p: l('When a push is rejected, it almost always means the remote has commits you do not have yet. The right response is to pull (or fetch and rebase) to bring them in, resolve any conflict, then push — never to force the push, which would erase whatever the remote had.', 'একটি push প্রত্যাখ্যাত হলে তা প্রায় সবসময় মানে remote-এ এমন কমিট আছে যা আপনার এখনো নেই। সঠিক প্রতিক্রিয়া হলো সেগুলো আনতে pull (বা fetch করে rebase) করা, যেকোনো conflict মেটানো, তারপর push করা—কখনো push force করা নয়, যা remote-এ যা ছিল তা মুছে ফেলত।') },
      ],
    },
    {
      h: l('Common mistakes', 'সাধারণ ভুল'),
      blocks: [
        { list: [
          l('Reaching for git push --force to fix a rejected push, silently erasing a teammate’s commits — pull first, or use --force-with-lease.', 'প্রত্যাখ্যাত push ঠিক করতে git push --force নেওয়া, নীরবে টিমমেটের কমিট মুছে ফেলা—আগে pull করুন, বা --force-with-lease ব্যবহার করুন।'),
          l('Never pulling before pushing, so your push is rejected again and again because the remote has moved ahead.', 'push-এর আগে কখনো pull না করা, ফলে remote এগিয়ে যাওয়ায় আপনার push বারবার প্রত্যাখ্যাত হয়।'),
          l('Forgetting the -u flag on a new branch’s first push, so plain git push and git pull do not know which remote branch to use.', 'নতুন ব্রাঞ্চের প্রথম push-এ -u ফ্ল্যাগ ভুলে যাওয়া, ফলে সাধারণ git push ও git pull জানে না কোন remote ব্রাঞ্চ ব্যবহার করতে হবে।'),
          l('Confusing fetch with pull — fetch is a safe preview that changes nothing, while pull immediately merges and can create conflicts.', 'fetch-কে pull-এর সঙ্গে গুলিয়ে ফেলা—fetch একটি নিরাপদ পূর্বরূপ যা কিছুই বদলায় না, আর pull সঙ্গে সঙ্গে merge করে ও conflict বানাতে পারে।'),
        ] },
      ],
    },
    {
      h: l('Remember in one line', 'এক লাইনে মনে রাখুন'),
      blocks: [
        { list: [
          l('fetch downloads only (safe); pull fetches and integrates; push uploads your commits to the remote.', 'fetch শুধু নামায় (নিরাপদ); pull নামিয়ে যুক্ত করে; push আপনার কমিট remote-এ তোলে।'),
          l('Pull before you start and before you push; use git push -u origin <branch> the first time.', 'শুরুর আগে ও push-এর আগে pull করুন; প্রথমবার git push -u origin <branch> ব্যবহার করুন।'),
          l('If a push is rejected, pull to integrate — never git push --force, which erases the remote’s commits.', 'push প্রত্যাখ্যাত হলে যুক্ত করতে pull করুন—কখনো git push --force নয়, যা remote-এর কমিট মুছে দেয়।'),
        ] },
      ],
    },
  ],

  // ── git-auth · Authentication: SSH, HTTPS, tokens ─────────────────────────
  'git-auth': [
    {
      h: l('What is Git authentication?', 'Git authentication কী?'),
      blocks: [
        { p: l('Authentication is how GitHub proves you are you before letting you push code or access private repos. Crucially, GitHub no longer accepts your account password over Git — you must use one of two methods: an SSH key pair, or an HTTPS personal access token (PAT). Both replace the password with a credential that is safer, revocable, and scoped to Git operations.', 'authentication হলো কোড push করতে বা প্রাইভেট রিপোতে ঢুকতে দেওয়ার আগে GitHub কীভাবে প্রমাণ করে আপনি আপনিই। গুরুত্বপূর্ণ: GitHub আর Git-এর মাধ্যমে আপনার অ্যাকাউন্ট পাসওয়ার্ড গ্রহণ করে না—আপনাকে দুটি পদ্ধতির একটি ব্যবহার করতে হবে: একটি SSH key জোড়া, বা একটি HTTPS personal access token (PAT)। দুটোই পাসওয়ার্ডকে এমন একটি credential দিয়ে বদলায় যা নিরাপদ, বাতিলযোগ্য ও Git অপারেশনে সীমিত।') },
        { p: l('The problem authentication solves is proving identity without handing over your master password. Your account password unlocks everything — billing, settings, every repo — so leaking it is catastrophic. SSH keys and tokens are narrower credentials: a token can be limited to certain scopes and expired on a schedule, and an SSH key can be revoked from GitHub without changing anything else. If one leaks, you remove just that one credential, not your whole account.', 'authentication যে সমস্যা সমাধান করে তা হলো মাস্টার পাসওয়ার্ড হস্তান্তর না করে পরিচয় প্রমাণ করা। আপনার অ্যাকাউন্ট পাসওয়ার্ড সবকিছু খোলে—বিলিং, সেটিংস, প্রতিটি রিপো—তাই তা ফাঁস হওয়া বিপর্যয়কর। SSH key ও token সংকীর্ণ credential: একটি token নির্দিষ্ট scope-এ সীমিত ও নির্ধারিত সময়ে মেয়াদোত্তীর্ণ করা যায়, আর একটি SSH key অন্য কিছু না বদলে GitHub থেকে বাতিল করা যায়। একটি ফাঁস হলে আপনি শুধু সেই একটি credential সরান, পুরো অ্যাকাউন্ট নয়।') },
        { note: l('Using a key card (SSH) or a single-use guest pass (token) is like getting into a building without shouting your master password at the front desk. If you lose the card, security deactivates just that card — your master password is never at risk.', 'একটি কী-কার্ড (SSH) বা এককালীন গেস্ট পাস (token) ব্যবহার করা হলো সামনের ডেস্কে মাস্টার পাসওয়ার্ড না চেঁচিয়ে একটি ভবনে ঢোকার মতো। কার্ড হারালে নিরাপত্তা শুধু সেই কার্ডটি নিষ্ক্রিয় করে—আপনার মাস্টার পাসওয়ার্ড কখনো ঝুঁকিতে পড়ে না।'), kind: 'tip' },
      ],
    },
    {
      h: l('How SSH key authentication works', 'SSH key authentication কীভাবে কাজ করে'),
      blocks: [
        { p: l('SSH uses a pair of keys: a private key that never leaves your machine, and a public key you give to GitHub. When you connect, the two are checked against each other cryptographically — GitHub confirms you hold the matching private key without it ever being sent. You set this up once, and from then on push and pull work with no password prompts.', 'SSH একটি key জোড়া ব্যবহার করে: একটি private key যা কখনো আপনার মেশিন ছাড়ে না, ও একটি public key যা আপনি GitHub-কে দেন। সংযোগ করলে দুটি ক্রিপ্টোগ্রাফিকভাবে একে অপরের সঙ্গে যাচাই হয়—GitHub নিশ্চিত করে আপনি মিলিয়ে-যাওয়া private key ধরে আছেন, তা কখনো না পাঠিয়েই। আপনি একবার এটি সেট করেন, তারপর থেকে push ও pull পাসওয়ার্ড ছাড়াই কাজ করে।') },
        { steps: [
          l('Generate a key pair with ssh-keygen -t ed25519 -C "email"; press Enter to accept the default file location.', 'ssh-keygen -t ed25519 -C "email" দিয়ে একটি key জোড়া বানান; ডিফল্ট ফাইল অবস্থান নিতে Enter চাপুন।'),
          l('This creates two files: a private key (keep secret) and a public key ending in .pub (safe to share).', 'এটি দুটি ফাইল বানায়: একটি private key (গোপন রাখুন) ও .pub-এ শেষ হওয়া একটি public key (শেয়ার করা নিরাপদ)।'),
          l('Copy the contents of the .pub file and paste it into GitHub under Settings → SSH and GPG keys → New SSH key.', '.pub ফাইলের বিষয়বস্তু কপি করে GitHub-এ Settings → SSH and GPG keys → New SSH key-তে বসান।'),
          l('Test the connection with ssh -T git@github.com; a success message greets you by username.', 'ssh -T git@github.com দিয়ে সংযোগ পরীক্ষা করুন; একটি সফল বার্তা ইউজারনেম দিয়ে আপনাকে অভিবাদন জানায়।'),
          l('Make sure your remote uses the SSH URL (git@github.com:...), not the HTTPS one, so Git uses the key.', 'নিশ্চিত করুন আপনার remote SSH URL (git@github.com:...) ব্যবহার করে, HTTPS নয়, যাতে Git key ব্যবহার করে।'),
        ] },
        { code: `# 1. create a modern SSH key pair
ssh-keygen -t ed25519 -C "you@example.com"

# 2. show the PUBLIC key, then paste it into GitHub settings
cat ~/.ssh/id_ed25519.pub

# 3. verify GitHub recognizes your key
ssh -T git@github.com
# -> "Hi <username>! You've successfully authenticated..."

# 4. make sure the remote uses the SSH URL
git remote set-url origin git@github.com:you/project.git`, caption: l('ssh-keygen -t ed25519 makes the key pair; only the .pub (public) half goes to GitHub; ssh -T tests it. The private key never leaves your machine.', 'ssh-keygen -t ed25519 key জোড়া বানায়; শুধু .pub (public) অংশ GitHub-এ যায়; ssh -T পরীক্ষা করে। private key কখনো আপনার মেশিন ছাড়ে না।') },
      ],
    },
    {
      h: l('SSH keys vs HTTPS tokens', 'SSH key বনাম HTTPS token'),
      blocks: [
        { p: l('Both methods authenticate you; they differ in setup, day-to-day feel, and which networks they work on. Many developers use SSH on their own machine and a token for scripts or CI.', 'দুটি পদ্ধতিই আপনাকে যাচাই করে; পার্থক্য সেটআপ, প্রতিদিনের অনুভূতি ও কোন নেটওয়ার্কে কাজ করে তাতে। অনেক ডেভেলপার নিজের মেশিনে SSH ও স্ক্রিপ্ট বা CI-এর জন্য একটি token ব্যবহার করে।') },
        { table: {
          head: [l('Aspect', 'দিক'), l('SSH key', 'SSH key'), l('HTTPS token (PAT)', 'HTTPS token (PAT)')],
          rows: [
            [l('Setup', 'সেটআপ'), l('Generate a key pair once, add the public key to GitHub.', 'একবার key জোড়া বানান, public key GitHub-এ যোগ করুন।'), l('Generate a token in GitHub settings, paste it when Git asks.', 'GitHub সেটিংসে একটি token বানান, Git চাইলে বসান।')],
            [l('Daily use', 'প্রতিদিনের ব্যবহার'), l('No prompts once set up — silent and fast.', 'একবার সেট হলে কোনো প্রম্পট নেই—নীরব ও দ্রুত।'), l('Used like a password; a credential helper can cache it.', 'পাসওয়ার্ডের মতো ব্যবহৃত; credential helper cache করতে পারে।')],
            [l('Works on locked-down networks', 'সীমাবদ্ধ নেটওয়ার্কে কাজ করে'), l('Sometimes blocked (port 22 firewalled).', 'কখনো ব্লকড (port 22 ফায়ারওয়ালড)।'), l('Usually works — rides over HTTPS (port 443).', 'সাধারণত কাজ করে—HTTPS (port 443)-এ চলে।')],
            [l('Expiry', 'মেয়াদ'), l('No expiry unless you revoke the key.', 'key বাতিল না করলে মেয়াদ নেই।'), l('Expires on a schedule and must be rotated.', 'নির্ধারিত সময়ে শেষ হয় ও বদলাতে হয়।')],
            [l('Best for', 'কার জন্য সেরা'), l('Your own daily-driver machine.', 'আপনার নিজের প্রতিদিনের মেশিন।'), l('CI, scripts, or restrictive corporate networks.', 'CI, স্ক্রিপ্ট বা সীমাবদ্ধ কর্পোরেট নেটওয়ার্ক।')],
          ],
        } },
      ],
    },
    {
      h: l('Key commands', 'মূল কমান্ড'),
      blocks: [
        { table: {
          head: [l('Goal', 'লক্ষ্য'), l('Command', 'কমান্ড')],
          rows: [
            [l('Create an SSH key', 'একটি SSH key বানান'), l('ssh-keygen -t ed25519 -C "email"', 'ssh-keygen -t ed25519 -C "email"')],
            [l('Test the SSH connection', 'SSH সংযোগ পরীক্ষা'), l('ssh -T git@github.com', 'ssh -T git@github.com')],
            [l('Log in via the GitHub CLI', 'GitHub CLI দিয়ে লগইন'), l('gh auth login', 'gh auth login')],
          ],
        } },
        { note: l('gh auth login (the GitHub CLI) walks you through authentication interactively and can set up either SSH or HTTPS for you — the easiest path if you would rather not configure keys by hand.', 'gh auth login (GitHub CLI) ইন্টারেক্টিভভাবে authentication-এর মধ্য দিয়ে নিয়ে যায় ও আপনার জন্য SSH বা HTTPS যেকোনোটি সেট করতে পারে—হাতে key কনফিগার না করতে চাইলে সবচেয়ে সহজ পথ।'), kind: 'tip' },
      ],
    },
    {
      h: l('When and where to use each', 'কখন ও কোথায় কোনটি ব্যবহার করবেন'),
      blocks: [
        { p: l('Use SSH keys on your own regular machine, where the one-time setup pays off in never seeing a password prompt again. It is the smoothest option for daily development. Reach for an HTTPS token when SSH is blocked — some corporate or public networks firewall the SSH port — or when you need a credential for a script, a CI job, or a server, where you want something scoped and expirable rather than a personal key.', 'নিজের নিয়মিত মেশিনে SSH key ব্যবহার করুন, যেখানে একবারের সেটআপের ফল হলো আর কখনো পাসওয়ার্ড প্রম্পট না দেখা। প্রতিদিনের ডেভেলপমেন্টে এটি মসৃণতম বিকল্প। SSH ব্লকড হলে HTTPS token নিন—কিছু কর্পোরেট বা পাবলিক নেটওয়ার্ক SSH port ফায়ারওয়াল করে—বা যখন একটি স্ক্রিপ্ট, CI job বা সার্ভারের জন্য credential দরকার, যেখানে ব্যক্তিগত key নয় বরং scope-করা ও মেয়াদযোগ্য কিছু চান।') },
        { p: l('Whichever you choose, keep the secret half safe: your SSH private key and your access token are both as powerful as a password for the access they grant. Store them only where they belong — the private key in ~/.ssh, the token in a credential manager or CI secret — and never in your code or commits.', 'যেটাই বাছুন, গোপন অংশটি নিরাপদ রাখুন: আপনার SSH private key ও access token দুটোই তারা যে অ্যাক্সেস দেয় তার জন্য পাসওয়ার্ডের মতোই শক্তিশালী। শুধু যেখানে থাকা উচিত সেখানে রাখুন—private key ~/.ssh-এ, token একটি credential manager বা CI secret-এ—কখনো আপনার কোড বা কমিটে নয়।') },
      ],
    },
    {
      h: l('Common mistakes', 'সাধারণ ভুল'),
      blocks: [
        { list: [
          l('Pasting a personal access token into code or a commit, leaking access to your whole account — anyone who reads the repo gets it.', 'একটি personal access token কোড বা কমিটে বসানো, পুরো অ্যাকাউন্টের অ্যাক্সেস ফাঁস করা—যে রিপো পড়ে সে-ই পায়।'),
          l('Sharing or committing the private SSH key instead of only the .pub public half — the private key must never leave your machine.', '.pub public অংশের বদলে private SSH key শেয়ার বা কমিট করা—private key কখনো আপনার মেশিন ছাড়া উচিত নয়।'),
          l('Trying to authenticate with your account password over Git and being confused when it fails — GitHub requires an SSH key or token.', 'Git-এ অ্যাকাউন্ট পাসওয়ার্ড দিয়ে authenticate করার চেষ্টা করে ব্যর্থ হলে বিভ্রান্ত হওয়া—GitHub একটি SSH key বা token দাবি করে।'),
          l('Setting an HTTPS token but leaving the remote on the SSH URL (or vice versa), so the credential is never actually used.', 'একটি HTTPS token সেট করে remote SSH URL-এ রেখে দেওয়া (বা উল্টো), ফলে credential আসলে কখনো ব্যবহৃত হয় না।'),
        ] },
      ],
    },
    {
      h: l('Remember in one line', 'এক লাইনে মনে রাখুন'),
      blocks: [
        { list: [
          l('GitHub authenticates you with an SSH key or an HTTPS token — never your account password.', 'GitHub আপনাকে একটি SSH key বা HTTPS token দিয়ে যাচাই করে—কখনো অ্যাকাউন্ট পাসওয়ার্ড দিয়ে নয়।'),
          l('SSH: generate with ssh-keygen -t ed25519, add the .pub key to GitHub, test with ssh -T git@github.com.', 'SSH: ssh-keygen -t ed25519 দিয়ে বানান, .pub key GitHub-এ যোগ করুন, ssh -T git@github.com দিয়ে পরীক্ষা করুন।'),
          l('SSH is smoothest on your own machine; HTTPS tokens suit locked-down networks and CI but expire and must be rotated.', 'নিজের মেশিনে SSH মসৃণতম; HTTPS token সীমাবদ্ধ নেটওয়ার্ক ও CI-তে মানানসই তবে মেয়াদ শেষ হয় ও বদলাতে হয়।'),
        ] },
      ],
    },
  ],
}
