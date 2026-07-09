// Deep, bilingual (English / Bangla) teaching guides for Git collaboration & undo
// topics. Shape mirrors app/course-guides.js: each guide is an array of sections
// { h, blocks }, rendered by GuideBlock in app/LearningApp.js. Facts (definitions,
// analogies, trade-offs, commands) are drawn from app/courses/git.js.

const l = (en, bn) => ({ en, bn })

export default {
  // ── git-pull-requests · Pull requests & code review ───────────────────────
  'git-pull-requests': [
    {
      h: l('What is a pull request?', 'পুল রিকোয়েস্ট কী?'),
      blocks: [
        { p: l('A pull request (PR) is a proposal to merge the commits on one branch into another — usually your feature branch into main. It is not a Git command; it is a feature that hosting platforms like GitHub, GitLab, and Bitbucket build on top of Git. When you open a PR, the platform shows the exact diff your branch would introduce, runs any automated checks (tests, linters, builds), and invites teammates to review before a single line lands on the main branch.', 'পুল রিকোয়েস্ট (PR) হলো একটি ব্রাঞ্চের কমিটগুলো আরেকটিতে—সাধারণত আপনার ফিচার ব্রাঞ্চ main-এ—মার্জ করার প্রস্তাব। এটি কোনো Git কমান্ড নয়; এটি GitHub, GitLab, Bitbucket-এর মতো হোস্টিং প্ল্যাটফর্মের একটি ফিচার যা Git-এর ওপর তৈরি। PR খুললে প্ল্যাটফর্ম আপনার ব্রাঞ্চ ঠিক কী diff আনবে তা দেখায়, স্বয়ংক্রিয় চেক (test, linter, build) চালায়, এবং main-এ এক লাইন ঢোকার আগেই সতীর্থদের রিভিউতে আহ্বান করে।') },
        { p: l('The problem a pull request solves is safe, reviewable collaboration. Without it, everyone would push straight to main and mistakes would go live unnoticed. A PR turns a change into a small, visible unit that others can read, question, and improve first. It also creates a durable record: months later you can open the PR and see what changed, why, who approved it, and which issue it closed.', 'পুল রিকোয়েস্ট যে সমস্যা সমাধান করে তা হলো নিরাপদ, রিভিউযোগ্য সহযোগিতা। এটি ছাড়া সবাই সরাসরি main-এ push করত ও ভুল অলক্ষিতে লাইভ হয়ে যেত। PR একটি পরিবর্তনকে ছোট, দৃশ্যমান একক করে যা অন্যরা আগে পড়তে, প্রশ্ন করতে ও উন্নত করতে পারে। এটি একটি টেকসই রেকর্ডও বানায়: কয়েক মাস পরে PR খুলে দেখতে পারেন কী বদলেছে, কেন, কে অনুমোদন করেছে, ও কোন issue বন্ধ হয়েছে।') },
        { note: l('A pull request is like submitting an article to an editor. You do not publish straight to the front page — you hand in a draft, the editor reads it, leaves comments, asks for changes, and only then does it go to print. The PR is that editorial gate for code.', 'পুল রিকোয়েস্ট একজন সম্পাদকের কাছে নিবন্ধ জমা দেওয়ার মতো। আপনি সরাসরি প্রথম পাতায় ছাপান না—একটি খসড়া জমা দেন, সম্পাদক পড়েন, মন্তব্য দেন, পরিবর্তন চান, তারপরই তা ছাপা হয়। কোডের জন্য PR সেই সম্পাদকীয় ফটক।'), kind: 'tip' },
      ],
    },
    {
      h: l('The GitHub Flow, step by step', 'GitHub Flow, ধাপে ধাপে'),
      blocks: [
        { p: l('Most teams follow a simple loop called the GitHub Flow: branch, push, open a PR, review, merge. Learning this cycle once gives you the pattern for almost every change you will ever ship on a team.', 'বেশিরভাগ টিম GitHub Flow নামের একটি সরল চক্র অনুসরণ করে: branch, push, PR খোলা, review, merge। এই চক্র একবার শিখলে টিমে আপনি যত পরিবর্তন পাঠাবেন তার প্রায় সবটির প্যাটার্ন পেয়ে যান।') },
        { steps: [
          l('Branch — create a short-lived branch off the latest main for one focused change, so main always stays deployable.', 'Branch—একটি নির্দিষ্ট পরিবর্তনের জন্য সর্বশেষ main থেকে একটি স্বল্পস্থায়ী ব্রাঞ্চ বানান, যাতে main সবসময় deploy-যোগ্য থাকে।'),
          l('Push — commit your work and push the branch to the remote so it exists on GitHub.', 'Push—কাজ commit করে ব্রাঞ্চটি remote-এ push করুন যাতে তা GitHub-এ থাকে।'),
          l('Open a PR — propose merging the branch, with a clear title and description of what changed and why.', 'PR খুলুন—কী বদলেছে ও কেন তার স্পষ্ট শিরোনাম ও বর্ণনাসহ ব্রাঞ্চ মার্জের প্রস্তাব দিন।'),
          l('Review — teammates read the diff, leave comments, and automated checks (CI) run. You push more commits to address feedback.', 'Review—সতীর্থরা diff পড়ে মন্তব্য দেন ও স্বয়ংক্রিয় চেক (CI) চলে। ফিডব্যাক সামলাতে আপনি আরও commit push করেন।'),
          l('Merge — once it is approved and the checks are green, merge it into main and delete the branch.', 'Merge—অনুমোদিত ও চেক সবুজ হলে এটি main-এ মার্জ করুন ও ব্রাঞ্চটি মুছুন।'),
        ] },
        { code: `# 1. branch off the latest main for one change
git switch -c fix-login-bug

# 2. commit, then push the branch to GitHub
git push -u origin fix-login-bug

# 3. open a pull request from that branch
gh pr create --fill

# 4. after approval and green CI, merge and clean up
gh pr merge --squash --delete-branch`, caption: l('The gh CLI opens and merges PRs from your terminal; --fill reuses your commit messages as the PR title and body.', 'gh CLI টার্মিনাল থেকেই PR খোলে ও মার্জ করে; --fill আপনার commit message-কেই PR-এর শিরোনাম ও বডি হিসেবে ব্যবহার করে।') },
      ],
    },
    {
      h: l('Merge methods compared', 'মার্জ পদ্ধতির তুলনা'),
      blocks: [
        { p: l('When a PR is approved, you usually get three ways to bring its commits into main. They differ in how much of the branch history they keep. Pick based on whether the individual commits are worth preserving.', 'PR অনুমোদিত হলে সাধারণত এর কমিটগুলো main-এ আনার তিনটি উপায় পান। এরা ব্রাঞ্চের ইতিহাস কতটা রাখে তাতে ভিন্ন। আলাদা কমিটগুলো রাখার যোগ্য কি না তার ওপর ভিত্তি করে বাছুন।') },
        { table: {
          head: [l('Method', 'পদ্ধতি'), l('What it does', 'কী করে'), l('Best for', 'কার জন্য')],
          rows: [
            [l('Merge commit', 'Merge commit'), l('Keeps every commit from the branch and adds one merge commit tying them together.', 'ব্রাঞ্চের প্রতিটি commit রাখে ও সেগুলো বাঁধতে একটি merge commit যোগ করে।'), l('Preserving the full, true history of how the work happened.', 'কাজ কীভাবে হয়েছে তার পূর্ণ, সত্য ইতিহাস রাখা।')],
            [l('Squash', 'Squash'), l('Collapses all of the branch commits into a single clean commit on main.', 'ব্রাঞ্চের সব commit একত্র করে main-এ একটি পরিষ্কার commit বানায়।'), l('A tidy main history when the branch had messy work-in-progress commits.', 'ব্রাঞ্চে অগোছালো work-in-progress commit থাকলে পরিচ্ছন্ন main ইতিহাস।')],
            [l('Rebase', 'Rebase'), l('Replays the branch commits onto main one by one, with no merge commit.', 'ব্রাঞ্চের commit একে একে main-এর ওপর পুনরায় বসায়, কোনো merge commit ছাড়া।'), l('A perfectly linear history when each commit is already meaningful.', 'প্রতিটি commit ইতিমধ্যে অর্থবহ হলে সম্পূর্ণ রৈখিক ইতিহাস।')],
          ],
        } },
        { note: l('When in doubt, squash. It keeps main readable — one PR becomes one commit — and hides the noisy "fix typo", "oops", "wip" commits that pile up while you work.', 'সন্দেহ হলে squash করুন। এটি main পড়ার যোগ্য রাখে—এক PR হয় এক commit—আর কাজের সময় জমা "fix typo", "oops", "wip"-এর মতো গোলমেলে commit লুকায়।'), kind: 'tip' },
      ],
    },
    {
      h: l('Key pull-request commands', 'মূল পুল-রিকোয়েস্ট কমান্ড'),
      blocks: [
        { table: {
          head: [l('Goal', 'লক্ষ্য'), l('Command', 'কমান্ড')],
          rows: [
            [l('Open a PR from the current branch', 'বর্তমান ব্রাঞ্চ থেকে PR খোলা'), l('gh pr create --fill', 'gh pr create --fill')],
            [l('Check out a teammate’s PR locally to test it', 'সতীর্থের PR লোকালি চেকআউট করে টেস্ট করা'), l('gh pr checkout <number>', 'gh pr checkout <number>')],
            [l('Merge with a squash and delete the branch', 'squash-সহ মার্জ ও ব্রাঞ্চ মুছে ফেলা'), l('gh pr merge --squash --delete-branch', 'gh pr merge --squash --delete-branch')],
            [l('Auto-close an issue when the PR merges', 'PR মার্জ হলে একটি issue স্বয়ংক্রিয় বন্ধ করা'), l('Closes #12 (in the PR description)', 'Closes #12 (PR বর্ণনায়)')],
          ],
        } },
        { p: l('Writing "Closes #12" (or "Fixes #12") in the PR body links the PR to that issue and automatically closes the issue the moment the PR merges — a small habit that keeps your tracker honest.', 'PR বডিতে "Closes #12" (বা "Fixes #12") লিখলে PR-টি সেই issue-র সঙ্গে যুক্ত হয় এবং PR মার্জ হওয়ামাত্র issue-টি স্বয়ংক্রিয়ভাবে বন্ধ হয়—একটি ছোট অভ্যাস যা আপনার tracker সঠিক রাখে।') },
      ],
    },
    {
      h: l('When and where to use pull requests', 'কখন ও কোথায় পুল রিকোয়েস্ট ব্যবহার করবেন'),
      blocks: [
        { p: l('Use a PR for essentially every change on a shared repository — team projects, open-source contributions, anything with more than one person or a protected main branch. The review step catches bugs before they ship and spreads knowledge of the codebase across the team, which is often as valuable as the bug-catching itself.', 'একটি শেয়ার্ড রিপোজিটরিতে মূলত প্রতিটি পরিবর্তনের জন্য PR ব্যবহার করুন—টিম প্রজেক্ট, ওপেন-সোর্স অবদান, একাধিক ব্যক্তি বা protected main ব্রাঞ্চযুক্ত যেকোনো কিছু। রিভিউ ধাপ পাঠানোর আগে বাগ ধরে ও কোডবেসের জ্ঞান পুরো টিমে ছড়ায়, যা প্রায়ই বাগ ধরার মতোই মূল্যবান।') },
        { p: l('The one real cost is latency: a PR sits waiting for a human to review it. The fix is not to skip review but to keep each PR small and focused, so it is quick to read and quick to approve. A tiny solo experiment on your own throwaway repo is the rare case where a PR adds no value — there commit straight to main.', 'একমাত্র আসল খরচ হলো দেরি: একটি PR মানুষের রিভিউর অপেক্ষায় বসে থাকে। সমাধান রিভিউ এড়ানো নয় বরং প্রতিটি PR ছোট ও কেন্দ্রীভূত রাখা, যাতে তা দ্রুত পড়া ও দ্রুত অনুমোদন করা যায়। আপনার নিজের ফেলে-দেওয়া রিপোতে ছোট একক পরীক্ষা সেই বিরল ক্ষেত্র যেখানে PR কোনো মূল্য যোগ করে না—সেখানে সরাসরি main-এ commit করুন।') },
      ],
    },
    {
      h: l('Common mistakes', 'সাধারণ ভুল'),
      blocks: [
        { list: [
          l('Opening one huge PR touching dozens of files — reviewers cannot truly read it, so they rubber-stamp it and bugs slip through.', 'কয়েক ডজন ফাইল স্পর্শ করা একটি বিশাল PR খোলা—রিভিউয়াররা সত্যিই পড়তে পারে না, তাই না দেখে অনুমোদন করে ও বাগ পার হয়ে যায়।'),
          l('Writing an empty or vague description. A good PR explains what changed and why, so a reviewer does not have to reverse-engineer your intent.', 'ফাঁকা বা অস্পষ্ট বর্ণনা লেখা। ভালো PR কী বদলেছে ও কেন তা ব্যাখ্যা করে, যাতে রিভিউয়ারকে আপনার উদ্দেশ্য উল্টো করে বের করতে না হয়।'),
          l('Merging before checks are green, letting a failing build or broken test reach main.', 'চেক সবুজ হওয়ার আগেই মার্জ করা, ফলে একটি ব্যর্থ build বা ভাঙা test main-এ পৌঁছায়।'),
          l('Ignoring review comments or arguing instead of addressing them — the point of the gate is to improve the change, not to defend it.', 'রিভিউ মন্তব্য উপেক্ষা করা বা সামলানোর বদলে তর্ক করা—ফটকের উদ্দেশ্য পরিবর্তন উন্নত করা, রক্ষা করা নয়।'),
        ] },
      ],
    },
    {
      h: l('Remember in one line', 'এক লাইনে মনে রাখুন'),
      blocks: [
        { list: [
          l('A pull request proposes merging your branch, showing the diff and inviting review and checks before it lands.', 'পুল রিকোয়েস্ট আপনার ব্রাঞ্চ মার্জের প্রস্তাব দেয়, diff দেখায় ও মার্জের আগে রিভিউ ও চেক আহ্বান করে।'),
          l('Follow the GitHub Flow: branch → push → open PR → review → merge.', 'GitHub Flow অনুসরণ করুন: branch → push → PR → review → merge।'),
          l('Keep PRs small and green; squash for a tidy main, and link issues with "Closes #12".', 'PR ছোট ও সবুজ রাখুন; পরিচ্ছন্ন main-এর জন্য squash করুন, আর "Closes #12" দিয়ে issue যুক্ত করুন।'),
        ] },
      ],
    },
  ],

  // ── git-forks · Forks & contributing ──────────────────────────────────────
  'git-forks': [
    {
      h: l('What is a fork?', 'ফর্ক কী?'),
      blocks: [
        { p: l('A fork is your own complete copy of someone else’s repository, made on the server (for example on GitHub) under your account. It is not the same as a branch or a clone: a clone is a copy on your laptop, while a fork is a copy on the hosting platform that you fully own and can push to. Forking is what lets you contribute to a project you do not have write access to — you change your copy, then propose your changes back to the original.', 'ফর্ক হলো অন্যের রিপোজিটরির আপনার নিজস্ব সম্পূর্ণ কপি, যা সার্ভারে (যেমন GitHub-এ) আপনার অ্যাকাউন্টের অধীনে তৈরি হয়। এটি branch বা clone-এর মতো নয়: clone হলো আপনার ল্যাপটপে একটি কপি, আর fork হলো হোস্টিং প্ল্যাটফর্মে একটি কপি যা আপনি পুরোপুরি মালিক ও push করতে পারেন। ফর্কই আপনাকে এমন প্রজেক্টে অবদান রাখতে দেয় যাতে আপনার write access নেই—নিজের কপি বদলান, তারপর মূলটিতে পরিবর্তন প্রস্তাব করেন।') },
        { p: l('The problem forks solve is open contribution without trust. A popular open-source project cannot hand push access to thousands of strangers. Forks flip the model: anyone can copy the repo, do whatever they like in their own copy, and offer changes through a pull request — which the maintainers review and accept or reject. You get to contribute; they keep control of the original.', 'ফর্ক যে সমস্যা সমাধান করে তা হলো বিশ্বাস ছাড়াই উন্মুক্ত অবদান। একটি জনপ্রিয় ওপেন-সোর্স প্রজেক্ট হাজার হাজার অচেনা মানুষকে push access দিতে পারে না। ফর্ক মডেলটি উল্টে দেয়: যে কেউ রিপো কপি করে নিজের কপিতে যা খুশি করতে পারে ও একটি PR দিয়ে পরিবর্তন প্রস্তাব করে—যা maintainer রিভিউ করে গ্রহণ বা প্রত্যাখ্যান করে। আপনি অবদান রাখতে পারেন; তারা মূলটির নিয়ন্ত্রণ রাখে।') },
        { note: l('A fork is like photocopying a shared recipe to tweak at home. You scribble your own improvements on your copy without touching the original in the library, then suggest those improvements back to the author.', 'ফর্ক একটি শেয়ার্ড রেসিপি বাড়িতে বদলানোর জন্য ফটোকপি করার মতো। লাইব্রেরির মূলটি না ছুঁয়ে নিজের কপিতে উন্নতি লেখেন, তারপর সেই উন্নতিগুলো লেখকের কাছে প্রস্তাব করেন।'), kind: 'tip' },
      ],
    },
    {
      h: l('How the fork workflow works', 'ফর্ক ওয়ার্কফ্লো কীভাবে কাজ করে'),
      blocks: [
        { p: l('After forking you end up with two remotes: origin (your fork, which you can push to) and upstream (the original repo, which you can only pull from). Keeping these straight is the whole skill.', 'ফর্ক করার পর আপনার দুটি remote থাকে: origin (আপনার fork, যাতে push করতে পারেন) ও upstream (মূল রিপো, যা থেকে শুধু pull করতে পারেন)। এদুটো গুলিয়ে না ফেলাই পুরো দক্ষতা।') },
        { steps: [
          l('Fork the original repo on the platform, creating a copy under your account, and clone that copy to your machine.', 'প্ল্যাটফর্মে মূল রিপো fork করুন, আপনার অ্যাকাউন্টে একটি কপি তৈরি করে, ও সেই কপি আপনার মেশিনে clone করুন।'),
          l('Add the original repository as a second remote named upstream, so you can pull its updates later.', 'মূল রিপোজিটরিকে upstream নামের দ্বিতীয় remote হিসেবে যোগ করুন, যাতে পরে এর আপডেট pull করতে পারেন।'),
          l('Create a branch, make your change, and push it to your fork (origin).', 'একটি ব্রাঞ্চ বানান, পরিবর্তন করুন, ও তা আপনার fork (origin)-এ push করুন।'),
          l('Open a pull request from your fork’s branch to the original repo’s main branch.', 'আপনার fork-এর ব্রাঞ্চ থেকে মূল রিপোর main ব্রাঞ্চে একটি PR খুলুন।'),
          l('Regularly fetch from upstream and merge it into your main so your fork does not drift out of date.', 'নিয়মিত upstream থেকে fetch করে তা আপনার main-এ merge করুন যাতে আপনার fork পুরনো না হয়।'),
        ] },
        { code: `# fork the repo and clone your copy in one step
gh repo fork owner/repo --clone

# add the ORIGINAL repo as a remote called upstream
git remote add upstream https://github.com/owner/repo.git

# later: pull the latest upstream changes into your main
git fetch upstream
git merge upstream/main

# push your feature branch to YOUR fork, then open a PR
git push origin my-feature`, caption: l('origin is your fork (you push here); upstream is the original (you only pull from it).', 'origin হলো আপনার fork (এখানে push করেন); upstream হলো মূলটি (শুধু pull করেন)।') },
      ],
    },
    {
      h: l('Key fork commands', 'মূল ফর্ক কমান্ড'),
      blocks: [
        { table: {
          head: [l('Goal', 'লক্ষ্য'), l('Command', 'কমান্ড')],
          rows: [
            [l('Fork a repo and clone your copy', 'রিপো fork ও নিজের কপি clone করা'), l('gh repo fork owner/repo --clone', 'gh repo fork owner/repo --clone')],
            [l('Add the original as the upstream remote', 'মূলটিকে upstream remote হিসেবে যোগ করা'), l('git remote add upstream <url>', 'git remote add upstream <url>')],
            [l('Sync your main from upstream', 'upstream থেকে main সিংক করা'), l('git fetch upstream && git merge upstream/main', 'git fetch upstream && git merge upstream/main')],
          ],
        } },
        { p: l('Run git remote -v to confirm you have both origin (your fork) and upstream (the original) pointing where you expect before you push.', 'push করার আগে git remote -v চালিয়ে নিশ্চিত করুন origin (আপনার fork) ও upstream (মূলটি) দুটোই প্রত্যাশিত জায়গায় নির্দেশ করছে।') },
      ],
    },
    {
      h: l('Fork vs branch', 'ফর্ক বনাম ব্রাঞ্চ'),
      blocks: [
        { p: l('Beginners often confuse forks and branches because both isolate work. The difference is ownership and access: a branch lives inside one repo, a fork is a whole separate repo.', 'নতুনরা প্রায়ই fork ও branch গুলিয়ে ফেলে কারণ দুটোই কাজ আলাদা রাখে। পার্থক্য মালিকানা ও access-এ: branch এক রিপোর ভেতরে থাকে, fork একটি সম্পূর্ণ আলাদা রিপো।') },
        { table: {
          head: [l('Aspect', 'দিক'), l('Fork', 'Fork'), l('Branch', 'Branch')],
          rows: [
            [l('Where it lives', 'কোথায় থাকে'), l('A separate copy under your account on the server', 'সার্ভারে আপনার অ্যাকাউন্টে একটি আলাদা কপি'), l('Inside the same repository', 'একই রিপোজিটরির ভেতরে')],
            [l('Needs write access?', 'write access লাগে?'), l('No — that is the whole point', 'না—এটাই মূল কথা'), l('Yes, to push it', 'হ্যাঁ, push করতে')],
            [l('Best for', 'কার জন্য'), l('Contributing to repos you do not own (open source)', 'যে রিপো আপনার নয় তাতে অবদান (ওপেন সোর্স)'), l('Everyday work in your own team’s repo', 'নিজের টিমের রিপোতে দৈনন্দিন কাজ')],
            [l('Kept in sync by', 'সিংক রাখা হয়'), l('Fetching from an upstream remote', 'একটি upstream remote থেকে fetch করে'), l('Merging or rebasing from main', 'main থেকে merge বা rebase করে')],
          ],
        } },
      ],
    },
    {
      h: l('When and where to use a fork', 'কখন ও কোথায় ফর্ক ব্যবহার করবেন'),
      blocks: [
        { p: l('Fork when you want to contribute to a repository you do not have write access to — the classic case is an open-source project on GitHub. You fork it, make your fix or feature in your own copy, and send it back as a pull request for the maintainers to review.', 'যখন এমন রিপোতে অবদান রাখতে চান যাতে আপনার write access নেই তখন fork করুন—ক্লাসিক উদাহরণ GitHub-এ একটি ওপেন-সোর্স প্রজেক্ট। এটি fork করেন, নিজের কপিতে fix বা feature বানান, ও maintainer-দের রিভিউর জন্য PR হিসেবে ফেরত পাঠান।') },
        { p: l('Do not reach for a fork when you already have write access — inside your own team’s repo, a plain branch is simpler and keeps everyone’s work in one place. Forks add the overhead of a second remote and constant syncing, which is only worth it when you genuinely cannot push to the original.', 'যখন ইতিমধ্যে write access আছে তখন fork-এ হাত দেবেন না—নিজের টিমের রিপোতে সাধারণ branch সহজ ও সবার কাজ এক জায়গায় রাখে। Fork একটি দ্বিতীয় remote ও অবিরাম সিংকের বাড়তি ঝামেলা যোগ করে, যা কেবল তখনই মূল্যবান যখন সত্যিই মূলটিতে push করতে পারেন না।') },
        { p: l('A good habit before starting real work is to open an issue or read the project’s contributing guide first, so your effort matches what the maintainers actually want to merge. Then keep each contribution to one small, focused pull request from a dedicated branch on your fork — it is far easier to review and much more likely to be accepted than a sprawling change that touches everything at once.', 'আসল কাজ শুরুর আগে একটি ভালো অভ্যাস হলো প্রথমে একটি issue খোলা বা প্রজেক্টের contributing guide পড়া, যাতে আপনার শ্রম maintainer-রা আসলে যা merge করতে চান তার সঙ্গে মেলে। তারপর প্রতিটি অবদান আপনার fork-এর একটি নিবেদিত branch থেকে একটি ছোট, কেন্দ্রীভূত pull request-এ রাখুন—একসঙ্গে সবকিছু স্পর্শ করা বিশাল পরিবর্তনের চেয়ে এটি রিভিউ করা অনেক সহজ ও গ্রহণযোগ্য হওয়ার সম্ভাবনা অনেক বেশি।') },
      ],
    },
    {
      h: l('Common mistakes', 'সাধারণ ভুল'),
      blocks: [
        { list: [
          l('Working for weeks on a stale fork, then hitting massive conflicts because upstream moved far ahead — sync early and often.', 'সপ্তাহের পর সপ্তাহ পুরনো fork-এ কাজ করা, তারপর upstream অনেক এগিয়ে যাওয়ায় বিশাল conflict-এ পড়া—আগে ও ঘন ঘন সিংক করুন।'),
          l('Forgetting to add upstream at all, so you have no way to pull the original’s new changes.', 'upstream যোগ করতেই ভুলে যাওয়া, ফলে মূলটির নতুন পরিবর্তন pull করার উপায় থাকে না।'),
          l('Committing straight to your fork’s main instead of a feature branch, which makes syncing and clean PRs painful.', 'ফিচার ব্রাঞ্চের বদলে সরাসরি fork-এর main-এ commit করা, যা সিংক ও পরিচ্ছন্ন PR কষ্টকর করে।'),
          l('Confusing origin and upstream and accidentally trying to push to the original repo, which fails on access.', 'origin ও upstream গুলিয়ে ভুলে মূল রিপোতে push করার চেষ্টা করা, যা access-এ ব্যর্থ হয়।'),
        ] },
      ],
    },
    {
      h: l('Remember in one line', 'এক লাইনে মনে রাখুন'),
      blocks: [
        { list: [
          l('A fork is your own server-side copy of someone else’s repo, letting you contribute without write access.', 'ফর্ক হলো অন্যের রিপোর আপনার নিজস্ব সার্ভার-সাইড কপি, যা write access ছাড়াই অবদান রাখতে দেয়।'),
          l('Fork → clone → add upstream → branch → push to your fork → open a PR to the original.', 'Fork → clone → upstream যোগ → branch → নিজের fork-এ push → মূলটিতে PR।'),
          l('Fetch upstream regularly, or your fork drifts out of date and conflicts pile up.', 'নিয়মিত upstream fetch করুন, নইলে fork পুরনো হয়ে conflict জমে।'),
        ] },
      ],
    },
  ],

  // ── git-restore · Discard & unstage: restore ──────────────────────────────
  'git-restore': [
    {
      h: l('What is git restore?', 'git restore কী?'),
      blocks: [
        { p: l('git restore is the modern, focused command for undoing changes in your working files and staging area — without ever touching your commit history. It does two jobs: it can throw away unstaged edits in a file (returning it to its last committed state), and it can unstage a file you had added with git add. Both operations move data around between Git’s three areas; neither creates or deletes commits.', 'git restore হলো আপনার ওয়ার্কিং ফাইল ও staging area-র পরিবর্তন আনডু করার আধুনিক, কেন্দ্রীভূত কমান্ড—কমিট ইতিহাস কখনো স্পর্শ না করে। এটি দুটি কাজ করে: একটি ফাইলের আনস্টেজড এডিট ফেলে দিতে পারে (শেষ commit করা অবস্থায় ফিরিয়ে), এবং git add দিয়ে যোগ করা একটি ফাইল আনস্টেজ করতে পারে। দুই অপারেশনই Git-এর তিনটি area-র মধ্যে ডেটা সরায়; কোনোটিই commit বানায় বা মোছে না।') },
        { p: l('The problem it solves is safe, surgical cleanup of local mess. You edited the wrong file, or staged something by accident, and you want it gone — but you do not want to rewrite history or affect any commit. Older Git overloaded git checkout and git reset for this, which confused everyone. git restore was introduced to give this one job a clear, dedicated name.', 'এটি যে সমস্যা সমাধান করে তা হলো লোকাল গোলমালের নিরাপদ, নিখুঁত পরিষ্কার। ভুল ফাইল এডিট করেছেন, বা ভুলে কিছু stage করেছেন, ও তা সরাতে চান—কিন্তু ইতিহাস বদলাতে বা কোনো commit-এ প্রভাব ফেলতে চান না। পুরনো Git এর জন্য git checkout ও git reset-কে ওভারলোড করত, যা সবাইকে বিভ্রান্ত করত। এই একটি কাজকে স্পষ্ট, নিবেদিত নাম দিতে git restore আনা হয়েছে।') },
        { note: l('Think of git restore as the undo button in a text editor — but only for changes you have not saved to history yet. It quietly rewinds your unsaved edits; it cannot undo something you already committed.', 'git restore-কে একটি টেক্সট এডিটরের আনডো বোতাম ভাবুন—তবে শুধু সেই পরিবর্তনের জন্য যা এখনো ইতিহাসে সেভ করেননি। এটি নীরবে আপনার আনসেভড এডিট রিওয়াইন্ড করে; ইতিমধ্যে commit করা কিছু আনডু করতে পারে না।'), kind: 'tip' },
      ],
    },
    {
      h: l('How git restore works', 'git restore কীভাবে কাজ করে'),
      blocks: [
        { p: l('Git holds your project in three places: the working tree (the files you edit), the staging area (what you have git added, ready to commit), and the commit history. git restore moves content into the first two from a source, defaulting to the last commit.', 'Git আপনার প্রজেক্ট তিন জায়গায় রাখে: working tree (যে ফাইল এডিট করেন), staging area (যা git add করেছেন, commit-এর জন্য প্রস্তুত), ও commit history। git restore একটি source থেকে প্রথম দুটিতে কন্টেন্ট সরায়, ডিফল্টে শেষ commit থেকে।') },
        { steps: [
          l('git restore <file> overwrites that file in your working tree with its version from the last commit — your unstaged edits are discarded.', 'git restore <file> সেই ফাইলটিকে working tree-তে শেষ commit-এর সংস্করণ দিয়ে overwrite করে—আপনার আনস্টেজড এডিট বাতিল হয়।'),
          l('git restore --staged <file> moves the file out of the staging area but leaves your edits in the working tree — it only unstages.', 'git restore --staged <file> ফাইলটিকে staging area থেকে সরায় কিন্তু এডিট working tree-তে রেখে দেয়—শুধু আনস্টেজ করে।'),
          l('git restore --source=<sha> <file> pulls that file’s content from a specific past commit into your working tree.', 'git restore --source=<sha> <file> সেই ফাইলের কন্টেন্ট একটি নির্দিষ্ট পুরনো commit থেকে working tree-তে আনে।'),
          l('In every case the commit history is untouched — restore never adds, removes, or rewrites a commit.', 'প্রতিক্ষেত্রেই commit history অক্ষত থাকে—restore কখনো commit যোগ, মোছা বা পুনর্লিখন করে না।'),
        ] },
        { code: `# see what is modified and staged first
git status

# throw away unstaged edits in one file (irreversible)
git restore app.js

# unstage a file but KEEP the edits in your working tree
git restore --staged app.js

# bring back a file's content from an earlier commit
git restore --source=HEAD~2 app.js`, caption: l('Without a flag, restore rewrites the working file; with --staged it only unstages; with --source it pulls from another commit.', 'flag ছাড়া restore working ফাইল বদলায়; --staged দিলে শুধু আনস্টেজ; --source দিলে অন্য commit থেকে আনে।') },
      ],
    },
    {
      h: l('Key restore commands', 'মূল restore কমান্ড'),
      blocks: [
        { table: {
          head: [l('Goal', 'লক্ষ্য'), l('Command', 'কমান্ড')],
          rows: [
            [l('Discard a file’s unstaged changes', 'একটি ফাইলের আনস্টেজড পরিবর্তন বাতিল'), l('git restore <file>', 'git restore <file>')],
            [l('Unstage a file but keep the edits', 'ফাইল আনস্টেজ কিন্তু এডিট রাখা'), l('git restore --staged <file>', 'git restore --staged <file>')],
            [l('Restore a file from a past commit', 'পুরনো commit থেকে ফাইল রিস্টোর'), l('git restore --source=<sha> <file>', 'git restore --source=<sha> <file>')],
          ],
        } },
        { note: l('git restore <file> permanently deletes your uncommitted edits to that file — Git has no copy to give back, because they were never committed. Run git status and be sure before you discard.', 'git restore <file> সেই ফাইলের আনকমিটেড এডিট স্থায়ীভাবে মুছে দেয়—Git-এর কাছে ফেরত দেওয়ার কপি নেই, কারণ সেগুলো কখনো commit হয়নি। বাতিলের আগে git status চালিয়ে নিশ্চিত হন।'), kind: 'warn' },
      ],
    },
    {
      h: l('restore vs reset vs checkout', 'restore বনাম reset বনাম checkout'),
      blocks: [
        { p: l('These three commands overlap, which is exactly why restore was created. Here is who does what, so you reach for the right one.', 'এই তিনটি কমান্ড একে অপরের সঙ্গে মিলে যায়, ঠিক এ কারণেই restore তৈরি হয়েছে। কে কী করে তা এখানে, যাতে সঠিকটি বেছে নেন।') },
        { table: {
          head: [l('Command', 'কমান্ড'), l('What it changes', 'কী বদলায়'), l('Touches history?', 'ইতিহাস স্পর্শ করে?')],
          rows: [
            [l('git restore <file>', 'git restore <file>'), l('The working-tree file content', 'working-tree ফাইলের কন্টেন্ট'), l('No', 'না')],
            [l('git restore --staged <file>', 'git restore --staged <file>'), l('The staging area only', 'শুধু staging area'), l('No', 'না')],
            [l('git reset', 'git reset'), l('The branch pointer (HEAD) and staging area', 'ব্রাঞ্চ pointer (HEAD) ও staging area'), l('Yes — it moves commits', 'হ্যাঁ—commit সরায়')],
            [l('git checkout <branch>', 'git checkout <branch>'), l('Which branch you are currently on', 'আপনি এখন কোন ব্রাঞ্চে আছেন'), l('No', 'না')],
          ],
        } },
      ],
    },
    {
      h: l('When and where to use restore', 'কখন ও কোথায় restore ব্যবহার করবেন'),
      blocks: [
        { p: l('Reach for git restore for everyday local cleanup that must not affect history: you started editing the wrong file and want it back, you staged a file too early and want to unstage it, or you want one file to match an older commit while leaving everything else alone. Because it never rewrites commits, it is completely safe to use even on branches you have already pushed — it only ever changes your local working files and staging.', 'ইতিহাসে প্রভাব ফেলবে না এমন দৈনন্দিন লোকাল পরিষ্কারের জন্য git restore নিন: ভুল ফাইল এডিট শুরু করে ফেরত চান, একটি ফাইল খুব আগে stage করে আনস্টেজ করতে চান, বা একটি ফাইলকে পুরনো commit-এর সঙ্গে মেলাতে চান বাকি সব অক্ষত রেখে। এটি কখনো commit বদলায় না বলে ইতিমধ্যে push করা ব্রাঞ্চেও ব্যবহার সম্পূর্ণ নিরাপদ—এটি শুধু আপনার লোকাল working ফাইল ও staging বদলায়।') },
        { p: l('Do not use restore when your goal is to undo an actual commit — that is a job for git reset (local) or git revert (shared). restore stops at the boundary of history; it works on files, not on commits.', 'যখন আপনার লক্ষ্য একটি আসল commit আনডু করা তখন restore ব্যবহার করবেন না—সেটি git reset (লোকাল) বা git revert (শেয়ার্ড)-এর কাজ। restore ইতিহাসের সীমানায় থামে; এটি commit নয়, ফাইল নিয়ে কাজ করে।') },
        { p: l('A practical rhythm is to run git status, decide file by file what should go, and only then restore the exact ones you name. Because you pass explicit filenames, restore is precise: it changes just those files and leaves the rest of your working tree exactly as it was. If you are ever unsure whether an edit is worth keeping, commit or stash it first — that turns an irreversible discard into something you can always recover.', 'একটি ব্যবহারিক ছন্দ হলো git status চালানো, ফাইল ধরে ধরে ঠিক করা কোনটা যাবে, তারপরই আপনি নাম দেওয়া ঠিক ফাইলগুলো restore করা। আপনি স্পষ্ট filename দেন বলে restore নিখুঁত: এটি শুধু সেই ফাইলগুলো বদলায় ও working tree-র বাকিটা যেমন ছিল তেমন রাখে। কোনো এডিট রাখার যোগ্য কি না অনিশ্চিত হলে আগে commit বা stash করুন—তাতে একটি অপরিবর্তনীয় বাতিল সবসময় ফিরে পাওয়ার মতো কিছু হয়ে যায়।') },
      ],
    },
    {
      h: l('Common mistakes', 'সাধারণ ভুল'),
      blocks: [
        { list: [
          l('Running git restore on a file with hours of uncommitted work, expecting to get it back — the edits were never committed, so they are gone for good.', 'ঘণ্টার পর ঘণ্টার আনকমিটেড কাজসহ ফাইলে git restore চালিয়ে ফেরত পাওয়ার আশা করা—এডিট কখনো commit হয়নি, তাই চিরতরে গেছে।'),
          l('Confusing git restore <file> (discards edits) with git restore --staged <file> (keeps edits, only unstages) — the flag changes everything.', 'git restore <file> (এডিট বাতিল) আর git restore --staged <file> (এডিট রাখে, শুধু আনস্টেজ) গুলিয়ে ফেলা—flag-ই সব বদলায়।'),
          l('Forgetting to check git status first, so you discard changes in a file you did not mean to.', 'আগে git status না দেখা, ফলে যে ফাইল বোঝাননি তার পরিবর্তন বাতিল করা।'),
          l('Expecting restore to undo a commit — it only affects the working tree and staging, never history.', 'restore একটি commit আনডু করবে ভাবা—এটি শুধু working tree ও staging বদলায়, কখনো ইতিহাস নয়।'),
        ] },
      ],
    },
    {
      h: l('Remember in one line', 'এক লাইনে মনে রাখুন'),
      blocks: [
        { list: [
          l('git restore discards unstaged edits or unstages files, without touching your commit history.', 'git restore আনস্টেজড এডিট বাতিল করে বা ফাইল আনস্টেজ করে, কমিট ইতিহাস স্পর্শ না করে।'),
          l('git restore <file> throws edits away; git restore --staged <file> only unstages and keeps them.', 'git restore <file> এডিট ফেলে দেয়; git restore --staged <file> শুধু আনস্টেজ করে ও রাখে।'),
          l('It is history-safe, but discarded working changes are irreversible — they were never committed.', 'এটি ইতিহাস-নিরাপদ, তবে বাতিল করা working পরিবর্তন অপরিবর্তনীয়—সেগুলো কখনো commit হয়নি।'),
        ] },
      ],
    },
  ],

  // ── git-reset · Move HEAD: reset (soft/mixed/hard) ─────────────────────────
  'git-reset': [
    {
      h: l('What is git reset?', 'git reset কী?'),
      blocks: [
        { p: l('git reset moves the tip of your current branch to an earlier commit, effectively rewinding history to that point. What happens to the changes from the commits you rewound past depends on the mode you choose: --soft keeps those changes staged, --mixed (the default) leaves them in your working tree but unstaged, and --hard deletes them entirely. It is the primary tool for undoing local commits and reshaping recent history.', 'git reset আপনার বর্তমান ব্রাঞ্চের tip-কে একটি আগের commit-এ সরায়, কার্যত ইতিহাসকে সেই বিন্দুতে রিওয়াইন্ড করে। যে commit-গুলো পার হয়ে এলেন তাদের পরিবর্তনের কী হবে তা আপনার বাছা mode-এর ওপর নির্ভর করে: --soft সেই পরিবর্তন staged রাখে, --mixed (ডিফল্ট) working tree-তে রাখে কিন্তু আনস্টেজড, ও --hard পুরোপুরি মুছে ফেলে। এটি লোকাল commit আনডু ও সাম্প্রতিক ইতিহাস নতুন আকার দেওয়ার প্রধান হাতিয়ার।') },
        { p: l('The problem reset solves is fixing your local history before anyone sees it: you committed too early, wrote a bad message, bundled two ideas into one commit, or want to undo the last few commits and try again. Because it moves the branch pointer, reset actually rewrites history — which makes it powerful locally but dangerous on commits you have already shared.', 'reset যে সমস্যা সমাধান করে তা হলো কেউ দেখার আগে আপনার লোকাল ইতিহাস ঠিক করা: খুব আগে commit করেছেন, খারাপ message লিখেছেন, দুটি ধারণা এক commit-এ জড়িয়েছেন, বা শেষ কয়েকটি commit আনডু করে আবার চেষ্টা করতে চান। এটি ব্রাঞ্চ pointer সরায় বলে reset আসলে ইতিহাস পুনর্লিখন করে—যা লোকালি শক্তিশালী কিন্তু ইতিমধ্যে শেয়ার করা commit-এ বিপজ্জনক।') },
        { note: l('Think of git reset as rewinding a tape. --soft and --mixed rewind but keep the footage in your hand to re-record; --hard rewinds and erases the tape entirely, so the footage is gone.', 'git reset-কে একটি টেপ রিওয়াইন্ড ভাবুন। --soft ও --mixed রিওয়াইন্ড করে কিন্তু ফুটেজ হাতে রাখে আবার রেকর্ড করতে; --hard রিওয়াইন্ড করে টেপ পুরো মুছে দেয়, তাই ফুটেজ চলে যায়।'), kind: 'tip' },
      ],
    },
    {
      h: l('How git reset works', 'git reset কীভাবে কাজ করে'),
      blocks: [
        { p: l('Reset touches up to three things in order: the branch pointer (HEAD), the staging area, and the working tree. Each mode stops at a different depth, which is the entire difference between them.', 'reset ক্রমে তিনটি জিনিস পর্যন্ত স্পর্শ করে: ব্রাঞ্চ pointer (HEAD), staging area, ও working tree। প্রতিটি mode ভিন্ন গভীরতায় থামে, এটাই এদের মধ্যে পুরো পার্থক্য।') },
        { steps: [
          l('First, reset moves your branch (HEAD) back to the target commit — all three modes do this.', 'প্রথমে reset আপনার ব্রাঞ্চ (HEAD)-কে target commit-এ ফেরায়—তিনটি mode-ই এটি করে।'),
          l('--soft stops there: the changes from the undone commits are left in the staging area, ready to re-commit.', '--soft সেখানেই থামে: আনডু করা commit-এর পরিবর্তন staging area-তে থাকে, আবার commit করার জন্য প্রস্তুত।'),
          l('--mixed (the default) also clears the staging area, so those changes sit in your working tree, unstaged.', '--mixed (ডিফল্ট) staging area-ও পরিষ্কার করে, তাই সেই পরিবর্তন working tree-তে থাকে, আনস্টেজড।'),
          l('--hard goes all the way and overwrites the working tree too, so those changes are permanently deleted.', '--hard পুরোটা যায় ও working tree-ও overwrite করে, তাই সেই পরিবর্তন স্থায়ীভাবে মুছে যায়।'),
        ] },
        { code: `# undo the last commit but keep its changes STAGED
git reset --soft HEAD~1

# undo the last commit and UNSTAGE its changes (default)
git reset HEAD~1

# undo the last commit and DELETE its changes (irreversible)
git reset --hard HEAD~1

# force your branch to match the remote exactly
git reset --hard origin/main`, caption: l('HEAD~1 means "one commit before HEAD". The mode decides whether the undone changes are kept staged, unstaged, or destroyed.', 'HEAD~1 মানে "HEAD-এর এক commit আগে"। mode ঠিক করে আনডু করা পরিবর্তন staged থাকবে, আনস্টেজড থাকবে, নাকি ধ্বংস হবে।') },
      ],
    },
    {
      h: l('--soft vs --mixed vs --hard', '--soft বনাম --mixed বনাম --hard'),
      blocks: [
        { p: l('The three modes differ only in how far they reach. Read this table as "how much do I want to keep?" — soft keeps the most, hard keeps nothing.', 'তিনটি mode শুধু কতদূর পৌঁছায় তাতে ভিন্ন। এই টেবিল "আমি কতটা রাখতে চাই?" হিসেবে পড়ুন—soft সবচেয়ে বেশি রাখে, hard কিছুই রাখে না।') },
        { table: {
          head: [l('Mode', 'Mode'), l('Moves HEAD?', 'HEAD সরায়?'), l('Staging area', 'Staging area'), l('Working files', 'Working ফাইল')],
          rows: [
            [l('--soft', '--soft'), l('Yes', 'হ্যাঁ'), l('Kept — changes stay staged', 'রাখে—পরিবর্তন staged থাকে'), l('Untouched', 'অক্ষত')],
            [l('--mixed (default)', '--mixed (ডিফল্ট)'), l('Yes', 'হ্যাঁ'), l('Cleared — changes unstaged', 'পরিষ্কার—পরিবর্তন আনস্টেজড'), l('Untouched', 'অক্ষত')],
            [l('--hard', '--hard'), l('Yes', 'হ্যাঁ'), l('Cleared', 'পরিষ্কার'), l('Overwritten — changes deleted', 'overwrite—পরিবর্তন মুছে যায়')],
          ],
        } },
        { note: l('git reset --hard is the single most destructive everyday Git command: it silently and permanently deletes any uncommitted work in your working tree, with no undo and no confirmation. Commit or stash first, and never run it unless you are certain you want those changes gone.', 'git reset --hard দৈনন্দিন Git-এর একক সবচেয়ে ধ্বংসাত্মক কমান্ড: এটি নীরবে ও স্থায়ীভাবে working tree-র যেকোনো আনকমিটেড কাজ মুছে দেয়, কোনো আনডু বা নিশ্চিতকরণ ছাড়া। আগে commit বা stash করুন, আর সেই পরিবর্তন সত্যিই ফেলতে চান নিশ্চিত না হলে কখনো চালাবেন না।'), kind: 'warn' },
      ],
    },
    {
      h: l('Key reset commands', 'মূল reset কমান্ড'),
      blocks: [
        { table: {
          head: [l('Goal', 'লক্ষ্য'), l('Command', 'কমান্ড')],
          rows: [
            [l('Undo the last commit, keep changes staged', 'শেষ commit আনডু, পরিবর্তন staged রাখা'), l('git reset --soft HEAD~1', 'git reset --soft HEAD~1')],
            [l('Undo the last commit, unstage changes', 'শেষ commit আনডু, পরিবর্তন আনস্টেজ'), l('git reset HEAD~1', 'git reset HEAD~1')],
            [l('Undo the last commit and discard its changes', 'শেষ commit আনডু ও পরিবর্তন বাতিল'), l('git reset --hard HEAD~1', 'git reset --hard HEAD~1')],
            [l('Force your branch to match the remote', 'ব্রাঞ্চকে রিমোটের সঙ্গে জোর করে মেলানো'), l('git reset --hard origin/main', 'git reset --hard origin/main')],
          ],
        } },
        { p: l('git reset --soft HEAD~1 is the friendliest of these: it "undoes" your last commit while leaving every change staged, so you can immediately re-commit with a better message or fold in one more edit.', 'git reset --soft HEAD~1 এদের মধ্যে সবচেয়ে বন্ধুত্বপূর্ণ: এটি প্রতিটি পরিবর্তন staged রেখে আপনার শেষ commit "আনডু" করে, যাতে সঙ্গে সঙ্গে ভালো message দিয়ে বা আরেকটি এডিট যোগ করে আবার commit করতে পারেন।') },
      ],
    },
    {
      h: l('When and where to use reset', 'কখন ও কোথায় reset ব্যবহার করবেন'),
      blocks: [
        { p: l('Use reset for local cleanup before you share your work: redo the last commit’s message with --soft, unstage a batch of files with the default mode, or wipe the last few local commits with --hard when you want a clean slate. It shines when the commits exist only on your machine.', 'কাজ শেয়ার করার আগে লোকাল পরিষ্কারে reset নিন: --soft দিয়ে শেষ commit-এর message আবার করুন, ডিফল্ট mode দিয়ে একগুচ্ছ ফাইল আনস্টেজ করুন, বা পরিষ্কার শুরু চাইলে --hard দিয়ে শেষ কয়েকটি লোকাল commit মুছুন। commit শুধু আপনার মেশিনে থাকলে এটি জ্বলে ওঠে।') },
        { p: l('The hard rule: do not reset commits you have already pushed to a shared branch. Because reset rewrites history, your branch will diverge from the remote, and pushing means a force-push that can clobber teammates’ work. For anything already public, undo it with git revert instead, which adds a new commit and keeps history intact.', 'কঠিন নিয়ম: ইতিমধ্যে শেয়ার্ড ব্রাঞ্চে push করা commit reset করবেন না। reset ইতিহাস বদলায় বলে আপনার ব্রাঞ্চ রিমোট থেকে সরে যাবে, ও push মানে একটি force-push যা সতীর্থদের কাজ নষ্ট করতে পারে। ইতিমধ্যে পাবলিক যেকোনো কিছুর জন্য বরং git revert দিয়ে আনডু করুন, যা একটি নতুন commit যোগ করে ও ইতিহাস অক্ষত রাখে।') },
        { p: l('One reassuring detail: even a --hard reset does not immediately erase the commits it moved past. They become unreferenced but linger for a while, and git reflog lists where your branch pointed recently, so you can often recover a commit you reset away by resetting back to its SHA. This safety net covers committed work only — it cannot bring back uncommitted edits that --hard overwrote, which is why committing or stashing before a risky reset is the real protection.', 'একটি আশ্বস্তকর বিবরণ: এমনকি একটি --hard reset-ও যে commit-গুলো পার করে তা সঙ্গে সঙ্গে মোছে না। সেগুলো unreferenced হয় কিন্তু কিছুক্ষণ থেকে যায়, ও git reflog দেখায় আপনার ব্রাঞ্চ সম্প্রতি কোথায় নির্দেশ করেছিল, তাই reset করে সরানো একটি commit-কে তার SHA-তে আবার reset করে প্রায়ই ফিরে পেতে পারেন। এই নিরাপত্তা-জাল শুধু commit করা কাজ ঢাকে—এটি --hard যে আনকমিটেড এডিট overwrite করেছে তা ফেরাতে পারে না, এ কারণেই ঝুঁকিপূর্ণ reset-এর আগে commit বা stash করাই আসল সুরক্ষা।') },
      ],
    },
    {
      h: l('Common mistakes', 'সাধারণ ভুল'),
      blocks: [
        { list: [
          l('Running git reset --hard with uncommitted work in the tree, permanently losing it with no way back.', 'ট্রিতে আনকমিটেড কাজ থাকা অবস্থায় git reset --hard চালিয়ে ফেরার উপায় ছাড়াই তা স্থায়ীভাবে হারানো।'),
          l('Using reset on commits already pushed to a shared branch, forcing a rewrite that disrupts everyone else.', 'শেয়ার্ড ব্রাঞ্চে ইতিমধ্যে push করা commit-এ reset ব্যবহার করা, একটি পুনর্লিখন চাপিয়ে যা বাকি সবার কাজ ব্যাহত করে।'),
          l('Reaching for --hard when --soft or --mixed would do — you rarely need to destroy the changes, only to move the pointer.', '--soft বা --mixed যথেষ্ট হলেও --hard-এ হাত দেওয়া—আপনার খুব কমই পরিবর্তন ধ্বংস দরকার, শুধু pointer সরানো।'),
          l('Forgetting the default is --mixed, then wondering why your changes are suddenly unstaged after a plain git reset HEAD~1.', 'ভুলে যাওয়া যে ডিফল্ট --mixed, তারপর সাধারণ git reset HEAD~1-এর পর পরিবর্তন হঠাৎ আনস্টেজড কেন তা ভাবা।'),
        ] },
      ],
    },
    {
      h: l('Remember in one line', 'এক লাইনে মনে রাখুন'),
      blocks: [
        { list: [
          l('git reset moves the branch to an earlier commit; --soft keeps changes staged, --mixed unstages, --hard deletes them.', 'git reset ব্রাঞ্চকে আগের commit-এ সরায়; --soft পরিবর্তন staged রাখে, --mixed আনস্টেজ করে, --hard মুছে ফেলে।'),
          l('--hard is destructive and has no undo — commit or stash before you use it.', '--hard ধ্বংসাত্মক ও এর কোনো আনডু নেই—ব্যবহারের আগে commit বা stash করুন।'),
          l('reset rewrites history, so keep it local; for pushed commits use git revert instead.', 'reset ইতিহাস বদলায়, তাই এটি লোকাল রাখুন; push করা commit-এর জন্য বরং git revert নিন।'),
        ] },
      ],
    },
  ],

  // ── git-revert · Safe undo: revert ────────────────────────────────────────
  'git-revert': [
    {
      h: l('What is git revert?', 'git revert কী?'),
      blocks: [
        { p: l('git revert undoes a commit by creating a brand-new commit that applies the exact opposite changes. If the original commit added three lines and deleted one, the revert commit deletes those three lines and adds the one back. The mistake is cancelled out, but nothing is erased: both the original commit and its reversal stay in the history, in order.', 'git revert একটি একদম নতুন commit বানিয়ে ঠিক বিপরীত পরিবর্তন প্রয়োগ করে একটি commit আনডু করে। মূল commit যদি তিন লাইন যোগ ও এক লাইন মুছত, revert commit সেই তিন লাইন মোছে ও একটি ফেরত যোগ করে। ভুলটি বাতিল হয়, কিন্তু কিছুই মুছে যায় না: মূল commit ও তার বিপরীত—দুটোই ক্রমে ইতিহাসে থাকে।') },
        { p: l('The problem revert solves is undoing a change safely on history that other people already have. git reset would rewind the branch and rewrite history — fine on your own machine, but a disaster on a shared branch. revert instead moves history forward with a new commit, so everyone can simply pull it like any other change. It is the correct way to undo something that has already been pushed.', 'revert যে সমস্যা সমাধান করে তা হলো অন্যদের কাছে ইতিমধ্যে থাকা ইতিহাসে নিরাপদে একটি পরিবর্তন আনডু করা। git reset ব্রাঞ্চ রিওয়াইন্ড করে ইতিহাস পুনর্লিখন করত—নিজের মেশিনে ঠিক, কিন্তু শেয়ার্ড ব্রাঞ্চে বিপর্যয়। revert বরং একটি নতুন commit দিয়ে ইতিহাস সামনে এগোয়, তাই সবাই অন্য যেকোনো পরিবর্তনের মতোই এটি pull করতে পারে। ইতিমধ্যে push করা কিছু আনডুর সঠিক উপায় এটি।') },
        { note: l('git revert is like publishing a correction notice in a printed book instead of tearing the wrong page out. Everyone who owns a copy already has the mistake; you cannot un-print it. You issue a correction that everyone can add — the record stays honest and complete.', 'git revert একটি ছাপা বইয়ের ভুল পৃষ্ঠা ছিঁড়ে ফেলার বদলে একটি সংশোধনী প্রকাশের মতো। যাদের কপি আছে তাদের কাছে ভুলটি ইতিমধ্যে আছে; আপনি তা আন-প্রিন্ট করতে পারেন না। আপনি একটি সংশোধনী জারি করেন যা সবাই যোগ করতে পারে—রেকর্ড সৎ ও সম্পূর্ণ থাকে।'), kind: 'tip' },
      ],
    },
    {
      h: l('How git revert works', 'git revert কীভাবে কাজ করে'),
      blocks: [
        { p: l('You point revert at a specific commit, and Git figures out the inverse of that commit’s diff and commits it on top of your current branch. Your history only grows; the branch tip keeps moving forward.', 'আপনি revert-কে একটি নির্দিষ্ট commit-এ নির্দেশ করেন, ও Git সেই commit-এর diff-এর বিপরীত বের করে আপনার বর্তমান ব্রাঞ্চের ওপর commit করে। আপনার ইতিহাস শুধু বাড়ে; ব্রাঞ্চ tip সামনে এগোতে থাকে।') },
        { steps: [
          l('Identify the commit you want to undo — its SHA (hash) from git log, or a reference like HEAD.', 'যে commit আনডু করতে চান তা শনাক্ত করুন—git log থেকে এর SHA (hash), বা HEAD-এর মতো একটি reference।'),
          l('Run git revert <sha>. Git computes the reverse of that commit’s changes.', 'git revert <sha> চালান। Git সেই commit-এর পরিবর্তনের বিপরীত হিসাব করে।'),
          l('Git creates a new commit applying that reverse, and opens an editor for its message (a sensible default is prefilled).', 'Git সেই বিপরীত প্রয়োগ করে একটি নতুন commit বানায়, ও এর message-এর জন্য একটি editor খোলে (একটি যুক্তিসঙ্গত ডিফল্ট আগে থেকে ভরা)।'),
          l('Push the new commit like any normal change — teammates pull it and the mistake is undone for everyone.', 'নতুন commit-টি সাধারণ পরিবর্তনের মতো push করুন—সতীর্থরা এটি pull করে ও সবার জন্য ভুল আনডু হয়।'),
        ] },
        { code: `# find the commit you want to undo
git log --oneline

# create a new commit that undoes an earlier one
git revert 9f2c1a4

# apply the reversal but do NOT commit yet (stage only)
git revert --no-commit 9f2c1a4

# then review, maybe combine, and commit yourself
git commit -m "Revert broken payment change"`, caption: l('git revert makes a new commit; --no-commit stages the reversal so you can review or batch it before committing.', 'git revert একটি নতুন commit বানায়; --no-commit বিপরীতটি stage করে যাতে commit-এর আগে রিভিউ বা একত্র করতে পারেন।') },
      ],
    },
    {
      h: l('revert vs reset', 'revert বনাম reset'),
      blocks: [
        { p: l('These are the two ways to undo a commit, and choosing correctly comes down to one question: has this commit been shared yet? revert is the safe public undo; reset is the private rewrite.', 'একটি commit আনডুর এই দুটি উপায়, ও সঠিক বাছাই একটি প্রশ্নে নেমে আসে: এই commit কি ইতিমধ্যে শেয়ার হয়েছে? revert নিরাপদ পাবলিক আনডু; reset ব্যক্তিগত পুনর্লিখন।') },
        { table: {
          head: [l('Aspect', 'দিক'), l('git revert', 'git revert'), l('git reset', 'git reset')],
          rows: [
            [l('Effect on history', 'ইতিহাসে প্রভাব'), l('Adds a new commit; nothing is erased', 'একটি নতুন commit যোগ করে; কিছু মোছে না'), l('Moves the branch back; commits disappear', 'ব্রাঞ্চ পেছনে সরায়; commit উধাও হয়')],
            [l('Safe on pushed / shared branches?', 'push করা / শেয়ার্ড ব্রাঞ্চে নিরাপদ?'), l('Yes', 'হ্যাঁ'), l('No — it rewrites history', 'না—এটি ইতিহাস বদলায়')],
            [l('What it undoes', 'কী আনডু করে'), l('One (or more) specific commit', 'এক (বা একাধিক) নির্দিষ্ট commit'), l('Everything back to a chosen commit', 'একটি বাছা commit পর্যন্ত সবকিছু')],
            [l('Result on the remote', 'রিমোটে ফলাফল'), l('Pushes cleanly as a normal commit', 'সাধারণ commit হিসেবে পরিষ্কার push হয়'), l('Diverges; needs a risky force-push', 'সরে যায়; ঝুঁকিপূর্ণ force-push লাগে')],
          ],
        } },
      ],
    },
    {
      h: l('Key revert commands', 'মূল revert কমান্ড'),
      blocks: [
        { table: {
          head: [l('Goal', 'লক্ষ্য'), l('Command', 'কমান্ড')],
          rows: [
            [l('Revert one commit safely', 'একটি commit নিরাপদে revert'), l('git revert <sha>', 'git revert <sha>')],
            [l('Stage the reversal without committing yet', 'commit ছাড়াই বিপরীতটি stage করা'), l('git revert --no-commit <sha>', 'git revert --no-commit <sha>')],
          ],
        } },
        { p: l('--no-commit is handy when you want to revert several commits and bundle their reversal into a single tidy commit, or review the reversal before it is recorded.', 'কয়েকটি commit revert করে তাদের বিপরীত একটি পরিচ্ছন্ন commit-এ বাঁধতে চাইলে, বা রেকর্ড হওয়ার আগে বিপরীতটি রিভিউ করতে চাইলে --no-commit কাজে আসে।') },
      ],
    },
    {
      h: l('When and where to use revert', 'কখন ও কোথায় revert ব্যবহার করবেন'),
      blocks: [
        { p: l('Use git revert whenever you need to undo a commit that is already on a shared branch — pushed to main, merged, or otherwise in other people’s hands. A bad deploy, a feature that broke production, a change that has to come out: revert cleanly cancels it while preserving the full record of what happened and when.', 'যখন একটি শেয়ার্ড ব্রাঞ্চে ইতিমধ্যে থাকা commit আনডু করতে হবে—main-এ push, merge, বা অন্যদের হাতে—তখন git revert নিন। একটি খারাপ deploy, production ভাঙা একটি feature, যে পরিবর্তন সরাতেই হবে: revert পরিষ্কারভাবে তা বাতিল করে যখন কী ও কখন ঘটেছে তার পূর্ণ রেকর্ড রক্ষা করে।') },
        { p: l('It is less suited to tidying up local commits nobody has seen — there, git reset is cleaner because it leaves no revert commit behind. And be aware revert leaves both the mistake and its reversal visible in the log, which is honest but can look noisy; on a private branch that clutter is avoidable with reset.', 'কেউ দেখেনি এমন লোকাল commit গোছাতে এটি কম উপযুক্ত—সেখানে git reset পরিষ্কার কারণ এটি কোনো revert commit রেখে যায় না। আর জেনে রাখুন revert ভুল ও তার বিপরীত—দুটোই log-এ দৃশ্যমান রাখে, যা সৎ তবে গোলমেলে দেখাতে পারে; প্রাইভেট ব্রাঞ্চে reset দিয়ে সেই জঞ্জাল এড়ানো যায়।') },
        { p: l('Because a revert is itself just an ordinary commit, it is fully undoable: if you reverted something by mistake, you can revert the revert to bring the change back, and even re-apply the original later once it is fixed. That composability is why revert is the trusted default for production incidents — every step forward is recorded, reversible, and shared the same safe way, with no history rewriting and no force-pushing to coordinate across the team.', 'একটি revert নিজেই একটি সাধারণ commit বলে এটি পুরোপুরি আনডু-যোগ্য: ভুলে কিছু revert করলে, revert-টিকে revert করে পরিবর্তন ফিরিয়ে আনতে পারেন, এমনকি ঠিক হওয়ার পর মূলটি আবার প্রয়োগও করতে পারেন। এই composability-ই revert-কে production সমস্যার বিশ্বস্ত ডিফল্ট করে—প্রতিটি সামনের ধাপ রেকর্ড হয়, বিপরীতযোগ্য, ও একই নিরাপদ উপায়ে শেয়ার হয়, কোনো ইতিহাস পুনর্লিখন ও টিমজুড়ে সমন্বয়ের force-push ছাড়া।') },
      ],
    },
    {
      h: l('Common mistakes', 'সাধারণ ভুল'),
      blocks: [
        { list: [
          l('Using git reset to "undo" a pushed commit, diverging from the remote instead of reverting cleanly — then needing a dangerous force-push.', 'push করা commit "আনডু" করতে git reset ব্যবহার করা, পরিষ্কারভাবে revert না করে রিমোট থেকে সরে যাওয়া—তারপর একটি বিপজ্জনক force-push দরকার হওয়া।'),
          l('Expecting revert to delete the original commit — it does not; both the commit and its reversal stay in the history.', 'revert মূল commit মুছবে ভাবা—তা করে না; commit ও তার বিপরীত দুটোই ইতিহাসে থাকে।'),
          l('Reverting a merge commit without the -m flag to say which parent to keep, which fails or does the wrong thing.', 'কোন parent রাখতে হবে বলার -m flag ছাড়া একটি merge commit revert করা, যা ব্যর্থ হয় বা ভুল কাজ করে।'),
          l('Reaching for revert on purely local, unshared commits where a simple git reset would be tidier.', 'পুরোপুরি লোকাল, শেয়ার-না-করা commit-এ revert-এ হাত দেওয়া যেখানে সাধারণ git reset পরিচ্ছন্ন হতো।'),
        ] },
      ],
    },
    {
      h: l('Remember in one line', 'এক লাইনে মনে রাখুন'),
      blocks: [
        { list: [
          l('git revert undoes a commit by adding a new commit that applies the opposite changes, leaving history intact.', 'git revert একটি নতুন commit যোগ করে বিপরীত পরিবর্তন প্রয়োগ করে commit আনডু করে, ইতিহাস অক্ষত রেখে।'),
          l('It is the safe way to undo shared, pushed commits; reset is for local history only.', 'শেয়ার্ড, push করা commit আনডুর নিরাপদ উপায় এটি; reset শুধু লোকাল ইতিহাসের জন্য।'),
          l('Ask one question: is the commit already shared? Yes → revert. No → reset.', 'একটি প্রশ্ন করুন: commit কি ইতিমধ্যে শেয়ার হয়েছে? হ্যাঁ → revert। না → reset।'),
        ] },
      ],
    },
  ],
}
