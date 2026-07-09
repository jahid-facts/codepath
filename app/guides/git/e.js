// Deep, bilingual (English / Bangla) teaching guides for advanced Git topics.
// Shape mirrors app/course-guides.js and app/guides/dsa/a.js: each guide is an
// array of sections { h, blocks }, rendered by GuideBlock in app/LearningApp.js.
// Facts (definitions, analogies, commands, trade-offs) are drawn from
// app/courses/git.js.

const l = (en, bn) => ({ en, bn })

export default {
  // ── git-stash · Shelve work: stash ────────────────────────────────────────
  'git-stash': [
    {
      h: l('What is git stash?', 'git stash কী?'),
      blocks: [
        { p: l('git stash takes all the uncommitted changes in your working directory and staging area, saves them onto a separate stack, and resets your working tree back to the last commit — a clean state. Your changes are not lost; they are set aside so you can return to them later. The moment you stash, git status shows a clean working directory, exactly as if you had never started the work.', 'git stash আপনার working directory ও staging area-র সব uncommitted পরিবর্তন নিয়ে একটি আলাদা stack-এ জমা করে, আর আপনার working tree-কে শেষ commit-এ ফিরিয়ে দেয়—একটি পরিষ্কার অবস্থায়। আপনার পরিবর্তন হারায় না; সেগুলো সরিয়ে রাখা হয় যাতে পরে ফিরে আসতে পারেন। stash করার সঙ্গে সঙ্গে git status একটি পরিষ্কার working directory দেখায়, যেন আপনি কাজটি শুরুই করেননি।') },
        { p: l('The problem git stash solves is the interrupted task. You are halfway through a feature, the code does not compile yet, and suddenly you must fix an urgent bug on another branch. You cannot commit half-broken code, and you cannot switch branches while your changes get in the way. Stash shelves the mess in one command, lets you switch cleanly, and hands it all back when you return.', 'git stash যে সমস্যা সমাধান করে তা হলো বাধাপ্রাপ্ত কাজ। আপনি একটি feature-এর অর্ধেক করেছেন, কোড এখনো compile হয় না, আর হঠাৎ অন্য branch-এ একটি জরুরি bug ঠিক করতে হবে। আপনি অর্ধেক-ভাঙা কোড commit করতে পারবেন না, আবার আপনার পরিবর্তন বাধা দিলে branch বদলাতেও পারবেন না। stash এক command-এ এই এলোমেলো কাজ শেলভ করে, পরিষ্কারভাবে branch বদলাতে দেয়, আর ফিরে এলে সব ফিরিয়ে দেয়।') },
        { note: l('Sweeping your half-done work into a drawer to clear the desk for an urgent job. The desk (your working directory) is clean for the new task, and everything you swept away waits in the drawer, in order, whenever you open it again.', 'জরুরি কাজের জন্য ডেস্ক খালি করতে আপনার অর্ধেক-করা কাজ একটি ড্রয়ারে ঢুকিয়ে রাখা। ডেস্ক (আপনার working directory) নতুন কাজের জন্য পরিষ্কার, আর যা সরিয়েছেন সব ড্রয়ারে ক্রমে অপেক্ষা করে, যখনই আবার খুলবেন।'), kind: 'tip' },
      ],
    },
    {
      h: l('How git stash works, step by step', 'git stash কীভাবে কাজ করে, ধাপে ধাপে'),
      blocks: [
        { p: l('A stash is stored as a stack — the most recent stash sits on top as stash@{0}, the one before it as stash@{1}, and so on. push adds to the top; pop removes from the top and re-applies it.', 'একটি stash একটি stack হিসেবে রাখা হয়—সবচেয়ে সাম্প্রতিক stash উপরে থাকে stash@{0} হিসেবে, তার আগেরটি stash@{1} হিসেবে, এভাবে। push উপরে যোগ করে; pop উপর থেকে সরিয়ে আবার প্রয়োগ করে।') },
        { steps: [
          l('Check what will be stashed with git status — stash saves tracked, modified files (both staged and unstaged) by default.', 'git status দিয়ে দেখুন কী stash হবে—stash ডিফল্টে tracked, modified ফাইল (staged ও unstaged দুটোই) সংরক্ষণ করে।'),
          l('Run git stash push -m "message" to move those changes onto the stash stack and clean your working directory.', 'সেই পরিবর্তনগুলো stash stack-এ সরাতে ও working directory পরিষ্কার করতে git stash push -m "message" চালান।'),
          l('Switch branches, pull, or do the urgent task — your tree is clean, so nothing gets in the way.', 'branch বদলান, pull করুন বা জরুরি কাজটি করুন—আপনার tree পরিষ্কার, তাই কিছুই বাধা দেয় না।'),
          l('Return to your branch and run git stash pop to re-apply the top stash and remove it (or git stash apply to re-apply but keep it).', 'আপনার branch-এ ফিরে git stash pop চালান উপরের stash আবার প্রয়োগ ও মুছে ফেলতে (অথবা git stash apply দিয়ে প্রয়োগ করুন কিন্তু রেখে দিন)।'),
          l('If the re-applied changes clash with newer commits, git marks conflicts just like a merge; resolve them, then carry on.', 'আবার-প্রয়োগ করা পরিবর্তন নতুন commit-এর সঙ্গে সংঘর্ষ করলে git merge-এর মতোই conflict চিহ্নিত করে; সেগুলো মিটিয়ে এগিয়ে যান।'),
        ] },
        { code: `# shelve your current work with a clear label
git stash push -m "wip: login form validation"

# the working tree is now clean -- switch and fix the urgent bug
git switch main
git switch -c hotfix
# ...fix, commit, done...

# come back and restore the shelved work
git switch feature-login
git stash pop        # re-apply the top stash and drop it`, caption: l('Stash, switch away, do the urgent job, switch back, pop. The work you shelved returns exactly where you left it.', 'stash করুন, সরে যান, জরুরি কাজ করুন, ফিরে আসুন, pop করুন। শেলভ করা কাজ যেখানে ছেড়েছিলেন ঠিক সেখানে ফিরে আসে।') },
      ],
    },
    {
      h: l('Key commands', 'মূল কমান্ড'),
      blocks: [
        { table: {
          head: [l('Goal', 'লক্ষ্য'), l('Command', 'কমান্ড')],
          rows: [
            [l('Shelve changes with a note', 'একটি নোটসহ পরিবর্তন শেলভ'), l('git stash push -m "note"', 'git stash push -m "note"')],
            [l('Include untracked (brand-new) files too', 'untracked (একদম নতুন) ফাইলসহ'), l('git stash -u', 'git stash -u')],
            [l('List every stash on the stack', 'stack-এর প্রতিটি stash তালিকা'), l('git stash list', 'git stash list')],
            [l('Re-apply the latest stash and remove it', 'সর্বশেষ stash আবার প্রয়োগ ও মুছুন'), l('git stash pop', 'git stash pop')],
            [l('Re-apply but keep the stash', 'প্রয়োগ করুন কিন্তু stash রাখুন'), l('git stash apply', 'git stash apply')],
            [l('Preview what a stash contains', 'একটি stash-এ কী আছে দেখুন'), l('git stash show -p stash@{0}', 'git stash show -p stash@{0}')],
            [l('Delete one stash / all stashes', 'একটি stash / সব stash মুছুন'), l('git stash drop stash@{0} / git stash clear', 'git stash drop stash@{0} / git stash clear')],
          ],
        } },
      ],
    },
    {
      h: l('When and where to use git stash', 'কখন ও কোথায় git stash ব্যবহার করবেন'),
      blocks: [
        { p: l('Reach for stash whenever you need a clean working tree right now but are not ready to commit. The classic case is an urgent context switch: an interruption arrives mid-feature and you must jump to another branch. It is also handy for pulling remote changes when local edits are in the way (stash, pull, pop), or for quickly checking how the branch behaves without your changes applied.', 'যখনই এখনই একটি পরিষ্কার working tree দরকার কিন্তু commit করার জন্য প্রস্তুত নন, তখন stash নিন। ক্লাসিক ক্ষেত্র হলো জরুরি context switch: feature-এর মাঝখানে একটি বাধা আসে আর আপনাকে অন্য branch-এ লাফ দিতে হয়। এটি local edit বাধা দিলে remote পরিবর্তন pull করতেও (stash, pull, pop) কাজে লাগে, বা আপনার পরিবর্তন ছাড়া branch কেমন আচরণ করে তা দ্রুত দেখতে।') },
        { p: l('Prefer a real commit — even a scrappy "WIP" commit on a throwaway branch — when the work is substantial or you might need it for more than a few hours. Commits are safer: they are part of history, they can be pushed as a backup, and they survive far better than a stash you might forget. Stash is best for short, local, throwaway detours.', 'যখন কাজ বড় বা কয়েক ঘণ্টার বেশি দরকার হতে পারে, তখন একটি আসল commit—এমনকি throwaway branch-এ একটি এলোমেলো "WIP" commit—নেওয়াই ভালো। commit বেশি নিরাপদ: এটি history-র অংশ, backup হিসেবে push করা যায়, আর আপনি ভুলে যেতে পারেন এমন stash-এর চেয়ে অনেক ভালো টেকে। stash সবচেয়ে ভালো ছোট, local, ফেলে-দেওয়া বাঁকের জন্য।') },
        { p: l('A few tricks make stash more powerful in practice: git stash -p shelves only the hunks you pick interactively, git stash show -p stash@{1} lets you inspect any entry before restoring it, and git stash branch <name> creates a fresh branch straight from a stash — the cleanest fix when the code you shelved no longer applies to the branch you are on.', 'কয়েকটি কৌশল বাস্তবে stash-কে আরও শক্তিশালী করে: git stash -p শুধু আপনার interactively বাছা hunk শেলভ করে, git stash show -p stash@{1} ফেরানোর আগে যেকোনো এন্ট্রি দেখতে দেয়, আর git stash branch <name> একটি stash থেকে সরাসরি নতুন branch তৈরি করে—শেলভ করা কোড আপনার branch-এ আর না মিললে এটাই সবচেয়ে পরিষ্কার সমাধান।') },
      ],
    },
    {
      h: l('Common mistakes', 'সাধারণ ভুল'),
      blocks: [
        { list: [
          l('Piling up many stashes without messages, then not knowing which one holds the work you need. Always label with git stash push -m "clear note".', 'মেসেজ ছাড়া অনেক stash জমানো, তারপর কোনটিতে দরকারি কাজ আছে না জানা। সবসময় git stash push -m "পরিষ্কার নোট" দিয়ে লেবেল দিন।'),
          l('Forgetting that stash ignores untracked (brand-new) files by default — you need git stash -u, or those new files stay behind.', 'ভুলে যাওয়া যে stash ডিফল্টে untracked (একদম নতুন) ফাইল বাদ দেয়—git stash -u লাগে, নাহলে সেই নতুন ফাইল পিছনে থেকে যায়।'),
          l('Treating stash as long-term storage. Stashes are local and never pushed; a lost or re-cloned repo takes them with it. For anything important, commit instead.', 'stash-কে দীর্ঘমেয়াদি সংরক্ষণ ভাবা। stash local ও কখনো push হয় না; হারানো বা আবার-clone করা repo সেগুলো নিয়ে যায়। গুরুত্বপূর্ণ কিছুর জন্য বরং commit করুন।'),
          l('Running git stash pop when the branch has moved on, hitting unexpected conflicts, then panicking. A pop can conflict just like a merge — read the markers and resolve calmly.', 'branch এগিয়ে যাওয়ার পর git stash pop চালিয়ে অপ্রত্যাশিত conflict-এ পড়া, তারপর আতঙ্কিত হওয়া। pop merge-এর মতোই conflict করতে পারে—marker পড়ুন ও শান্তভাবে মেটান।'),
          l('Using git stash apply again and again and leaving stale copies piling up, because apply (unlike pop) never removes the stash from the stack.', 'বারবার git stash apply ব্যবহার করে পুরনো কপি জমতে দেওয়া, কারণ apply (pop-এর মতো নয়) কখনো stack থেকে stash সরায় না।'),
        ] },
      ],
    },
    {
      h: l('Remember in one line', 'এক লাইনে মনে রাখুন'),
      blocks: [
        { list: [
          l('git stash shelves your uncommitted changes and cleans the working directory so you can switch tasks and restore later.', 'git stash আপনার uncommitted পরিবর্তন শেলভ করে ও working directory পরিষ্কার করে যাতে কাজ বদলে পরে ফিরিয়ে আনতে পারেন।'),
          l('push adds to the stack, pop re-applies and removes, apply re-applies and keeps; always label with -m.', 'push stack-এ যোগ করে, pop আবার প্রয়োগ করে ও সরায়, apply প্রয়োগ করে ও রাখে; সবসময় -m দিয়ে লেবেল দিন।'),
          l('Stashes are local and easy to forget — for anything important or long-lived, make a real commit instead.', 'stash local ও ভুলে যাওয়া সহজ—গুরুত্বপূর্ণ বা দীর্ঘস্থায়ী কিছুর জন্য বরং একটি আসল commit করুন।'),
        ] },
      ],
    },
  ],

  // ── git-reflog · Recover anything: reflog ─────────────────────────────────
  'git-reflog': [
    {
      h: l('What is git reflog?', 'git reflog কী?'),
      blocks: [
        { p: l('git reflog is a private, local log of every position HEAD (your current checkout) has ever pointed to in this repository. Every time you commit, switch branches, merge, rebase, reset, or pull, git quietly records where HEAD was before and after. That log is the reflog, and it is your safety net: even when a commit disappears from every branch, the reflog still remembers it, so you can jump back to it.', 'git reflog হলো এই repository-তে HEAD (আপনার বর্তমান checkout) যত জায়গায় নির্দেশ করেছে তার একটি ব্যক্তিগত, local লগ। প্রতিবার commit, branch বদল, merge, rebase, reset বা pull করলে git নীরবে রেকর্ড করে HEAD আগে ও পরে কোথায় ছিল। সেই লগই reflog, আর এটি আপনার সেফটি-নেট: একটি commit প্রতিটি branch থেকে হারিয়ে গেলেও reflog তা মনে রাখে, তাই আপনি সেখানে ফিরে যেতে পারেন।') },
        { p: l('The problem reflog solves is recovery from "lost" work. A bad git reset --hard, a rebase gone wrong, a branch deleted too soon, an accidental checkout — all of these can make commits vanish from your normal history. But git almost never deletes a commit immediately; it just stops pointing at it. As long as the reflog still has the commit id, the work is recoverable, usually in seconds.', 'reflog যে সমস্যা সমাধান করে তা হলো "হারানো" কাজ পুনরুদ্ধার। একটি খারাপ git reset --hard, একটি ভুল rebase, খুব তাড়াতাড়ি মুছে ফেলা branch, একটি ভুল checkout—এসব commit-কে আপনার স্বাভাবিক history থেকে উধাও করতে পারে। কিন্তু git প্রায় কখনোই সঙ্গে সঙ্গে commit মোছে না; শুধু তার দিকে নির্দেশ করা বন্ধ করে। যতক্ষণ reflog-এ commit id থাকে, ততক্ষণ কাজ পুনরুদ্ধারযোগ্য, সাধারণত সেকেন্ডে।') },
        { note: l('A security-camera log of everywhere you have been — rewind to the exact moment before the mistake. Even if you tidied the room afterwards (rewrote history), the footage still shows where everything was, so you can put it back.', 'আপনি যেখানে গেছেন তার একটি নিরাপত্তা-ক্যামেরা লগ—ভুলের ঠিক আগের মুহূর্তে ফিরে যান। এমনকি পরে ঘর গুছিয়ে ফেললেও (history বদলালেও) ফুটেজ দেখায় সব কোথায় ছিল, তাই আপনি তা আবার বসাতে পারেন।'), kind: 'tip' },
      ],
    },
    {
      h: l('How the reflog works', 'reflog কীভাবে কাজ করে'),
      blocks: [
        { p: l('Each reflog entry has a shorthand name: HEAD@{0} is where HEAD is now, HEAD@{1} is where it was one move ago, HEAD@{2} two moves ago, and so on. Branches keep their own reflogs too, for example main@{1}.', 'প্রতিটি reflog এন্ট্রির একটি সংক্ষিপ্ত নাম আছে: HEAD@{0} হলো HEAD এখন যেখানে, HEAD@{1} এক move আগে যেখানে ছিল, HEAD@{2} দুই move আগে, এভাবে। branch-এরও নিজস্ব reflog থাকে, যেমন main@{1}।') },
        { steps: [
          l('Every move of HEAD — commit, checkout, reset, merge, rebase, pull — appends a new entry with the commit id and a description of what happened.', 'HEAD-এর প্রতিটি move—commit, checkout, reset, merge, rebase, pull—commit id ও কী ঘটেছে তার বর্ণনাসহ একটি নতুন এন্ট্রি যোগ করে।'),
          l('Run git reflog to list those entries, newest first, each tagged HEAD@{0}, HEAD@{1}, and so on.', 'git reflog চালান সেই এন্ট্রিগুলো তালিকা করতে, নতুনটি আগে, প্রতিটি HEAD@{0}, HEAD@{1} ইত্যাদি দিয়ে চিহ্নিত।'),
          l('Read the descriptions to find the state just before the mistake — for example the entry right before "reset: moving to HEAD~3".', 'ভুলের ঠিক আগের অবস্থা খুঁজতে বর্ণনাগুলো পড়ুন—যেমন "reset: moving to HEAD~3"-এর ঠিক আগের এন্ট্রি।'),
          l('Use that entry’s HEAD@{n} name or its commit id to inspect, branch from, or reset back to that exact state.', 'সেই এন্ট্রির HEAD@{n} নাম বা তার commit id ব্যবহার করুন ঠিক সেই অবস্থা পরিদর্শন, সেখান থেকে branch তৈরি বা সেখানে reset করতে।'),
          l('The reflog is local to your clone and entries expire after a while (about 90 days for reachable, 30 for unreachable), so recover sooner rather than later.', 'reflog আপনার clone-এর জন্য local ও এন্ট্রি কিছুদিন পর মেয়াদ হারায় (reachable-এর জন্য প্রায় ৯০ দিন, unreachable-এর জন্য ৩০), তাই দেরি না করে দ্রুত পুনরুদ্ধার করুন।'),
        ] },
      ],
    },
    {
      h: l('Recovering a lost commit', 'হারানো commit পুনরুদ্ধার'),
      blocks: [
        { p: l('Suppose you ran git reset --hard HEAD~3 and then realised you needed those three commits after all. They are gone from the branch, but not from the reflog — HEAD still remembers where it was before the reset.', 'ধরুন আপনি git reset --hard HEAD~3 চালিয়েছেন, তারপর বুঝলেন সেই তিনটি commit আসলে দরকার। branch থেকে সেগুলো গেছে, কিন্তু reflog থেকে নয়—reset-এর আগে HEAD কোথায় ছিল তা এখনো মনে আছে।') },
        { steps: [
          l('Run git reflog and read the list; find the entry showing where HEAD was just before the bad reset.', 'git reflog চালান ও তালিকা পড়ুন; খারাপ reset-এর ঠিক আগে HEAD কোথায় ছিল সেই এন্ট্রি খুঁজুন।'),
          l('Confirm it is the right state with git show HEAD@{1} or git log HEAD@{1}, checking the commit message and diff.', 'git show HEAD@{1} বা git log HEAD@{1} দিয়ে নিশ্চিত করুন এটাই সঠিক অবস্থা, commit message ও diff যাচাই করে।'),
          l('Bring it back safely by creating a branch pointing at the lost commit, so you cannot lose it again: git branch recovered HEAD@{1}.', 'হারানো commit-এ নির্দেশ করা একটি branch তৈরি করে নিরাপদে ফিরিয়ে আনুন, যাতে আবার হারাতে না পারেন: git branch recovered HEAD@{1}।'),
          l('Or, if you are sure, move your current branch straight back with git reset --hard HEAD@{1}.', 'অথবা, নিশ্চিত হলে, git reset --hard HEAD@{1} দিয়ে বর্তমান branch সরাসরি ফিরিয়ে নিন।'),
          l('Verify with git log that the commits have returned, then delete the temporary branch if you no longer need it.', 'git log দিয়ে যাচাই করুন commit ফিরে এসেছে, তারপর আর দরকার না থাকলে অস্থায়ী branch মুছে দিন।'),
        ] },
        { code: `# after a bad reset that dropped 3 commits:
git reflog
# 9f2c1a0 HEAD@{0}: reset: moving to HEAD~3
# 4b7e8d2 HEAD@{1}: commit: add password reset email   <- the lost tip

# option A -- safest: park the lost work on a new branch
git branch recovered 4b7e8d2      # or: git branch recovered HEAD@{1}

# option B -- move this branch straight back to it
git reset --hard HEAD@{1}

git log --oneline                 # verify the commits are back`, caption: l('The reflog still holds 4b7e8d2 even though no branch points to it. Branch from it (safe) or reset to it (direct) to get the work back.', 'কোনো branch নির্দেশ না করলেও reflog-এ 4b7e8d2 এখনো আছে। কাজ ফিরে পেতে এটি থেকে branch করুন (নিরাপদ) বা এতে reset করুন (সরাসরি)।') },
      ],
    },
    {
      h: l('Key commands', 'মূল কমান্ড'),
      blocks: [
        { table: {
          head: [l('Goal', 'লক্ষ্য'), l('Command', 'কমান্ড')],
          rows: [
            [l('Show HEAD’s full move history', 'HEAD-এর সম্পূর্ণ move ইতিহাস দেখুন'), l('git reflog', 'git reflog')],
            [l('Show a branch’s own reflog', 'একটি branch-এর নিজস্ব reflog দেখুন'), l('git reflog show main', 'git reflog show main')],
            [l('Inspect a past state', 'অতীত অবস্থা পরিদর্শন করুন'), l('git show HEAD@{2}', 'git show HEAD@{2}')],
            [l('Recover work onto a new branch', 'নতুন branch-এ কাজ পুনরুদ্ধার করুন'), l('git branch <name> HEAD@{n}', 'git branch <name> HEAD@{n}')],
            [l('Jump this branch back to a point', 'এই branch একটি বিন্দুতে ফিরিয়ে নিন'), l('git reset --hard HEAD@{n}', 'git reset --hard HEAD@{n}')],
          ],
        } },
      ],
    },
    {
      h: l('When and where to use the reflog', 'কখন ও কোথায় reflog ব্যবহার করবেন'),
      blocks: [
        { p: l('Turn to the reflog the instant work seems lost: after a hard reset, a botched rebase, a branch you deleted too soon, a merge you regret, or a detached-HEAD checkout where you made commits and then wandered off. If the work was ever committed — even briefly — the reflog can almost certainly bring it back. Reach for it before you panic, and definitely before you re-clone.', 'কাজ হারানো মনে হওয়ার সঙ্গে সঙ্গে reflog-এর দিকে যান: একটি hard reset, একটি বিগড়ে যাওয়া rebase, খুব তাড়াতাড়ি মোছা branch, আফসোসের merge, বা detached-HEAD checkout যেখানে commit করে সরে গেছেন তার পর। কাজটি কখনো commit হয়ে থাকলে—অল্প সময়ের জন্যও—reflog প্রায় নিশ্চিতভাবে তা ফিরিয়ে আনতে পারে। আতঙ্কিত হওয়ার আগে, আর অবশ্যই আবার clone করার আগে এটি ব্যবহার করুন।') },
        { p: l('The one thing reflog cannot save is work that was never committed. Uncommitted edits wiped by git reset --hard or git checkout -- file leave no reflog entry, because HEAD never moved. This is the strongest argument for committing early and often: a commit, even a messy one, is protected by the reflog; unsaved edits are not.', 'reflog যে একটি জিনিস বাঁচাতে পারে না তা হলো কখনো commit না-করা কাজ। git reset --hard বা git checkout -- file দিয়ে মুছে যাওয়া uncommitted edit কোনো reflog এন্ট্রি রাখে না, কারণ HEAD নড়েনি। এটাই আগে ও ঘন ঘন commit করার সবচেয়ে জোরালো যুক্তি: একটি commit, এলোমেলো হলেও, reflog-এ সুরক্ষিত; save-না-করা edit নয়।') },
      ],
    },
    {
      h: l('Common mistakes', 'সাধারণ ভুল'),
      blocks: [
        { list: [
          l('Panicking after a bad reset and re-cloning the whole repo, when git reflog would have restored everything in seconds.', 'খারাপ reset-এর পর আতঙ্কে পুরো repo আবার clone করা, যেখানে git reflog সেকেন্ডেই সব ফিরিয়ে দিত।'),
          l('Assuming reflog can recover uncommitted changes — it only tracks where HEAD (committed history) has been, not unsaved edits.', 'ধরে নেওয়া reflog uncommitted পরিবর্তন উদ্ধার করতে পারে—এটি শুধু HEAD (committed history) কোথায় ছিল তা রাখে, save-না-করা edit নয়।'),
          l('Waiting too long: reflog entries expire (30–90 days by default) and git gc can prune unreachable commits, so recover promptly.', 'বেশি দেরি করা: reflog এন্ট্রি মেয়াদ হারায় (ডিফল্টে ৩০–৯০ দিন) আর git gc unreachable commit ছেঁটে ফেলতে পারে, তাই দ্রুত পুনরুদ্ধার করুন।'),
          l('Forgetting the reflog is local — it is not pushed and does not exist on a fresh clone, so it only helps in the same working copy where the loss happened.', 'ভুলে যাওয়া যে reflog local—এটি push হয় না ও নতুন clone-এ থাকে না, তাই এটি শুধু সেই working copy-তে সাহায্য করে যেখানে ক্ষতি ঘটেছে।'),
          l('Running git reset --hard onto a reflog entry without first checking git show, and landing on the wrong state.', 'আগে git show যাচাই না করে একটি reflog এন্ট্রিতে git reset --hard চালিয়ে ভুল অবস্থায় গিয়ে পড়া।'),
        ] },
      ],
    },
    {
      h: l('Remember in one line', 'এক লাইনে মনে রাখুন'),
      blocks: [
        { list: [
          l('git reflog records every position HEAD has held, so you can recover commits or branches lost to a bad reset or rebase.', 'git reflog HEAD-এর প্রতিটি অবস্থান রাখে, যাতে খারাপ reset বা rebase-এ হারানো commit বা branch ফিরে পেতে পারেন।'),
          l('Find the state before the mistake in git reflog, then git branch <name> HEAD@{n} (safe) or git reset --hard HEAD@{n}.', 'git reflog-এ ভুলের আগের অবস্থা খুঁজুন, তারপর git branch <name> HEAD@{n} (নিরাপদ) বা git reset --hard HEAD@{n}।'),
          l('It rescues committed work only, is local, and expires — so commit early and recover soon.', 'এটি শুধু committed কাজ উদ্ধার করে, local, ও মেয়াদ হারায়—তাই আগে commit করুন ও দ্রুত পুনরুদ্ধার করুন।'),
        ] },
      ],
    },
  ],

  // ── git-interactive-rebase · Interactive rebase ───────────────────────────
  'git-interactive-rebase': [
    {
      h: l('What is interactive rebase?', 'interactive rebase কী?'),
      blocks: [
        { p: l('Interactive rebase (git rebase -i) lets you rewrite a series of your recent commits before you share them: reorder them, reword their messages, combine several into one, split one apart, or drop them entirely. Instead of applying the commits as-is, git opens an editor with a "todo list" — one line per commit — and rewrites history according to the instructions you leave there.', 'interactive rebase (git rebase -i) শেয়ার করার আগে আপনার সাম্প্রতিক commit-এর একটি সিরিজ পুনর্লিখন করতে দেয়: পুনর্বিন্যাস, message পুনঃশব্দ, কয়েকটিকে একটিতে মেলানো, একটিকে ভাগ করা, বা পুরোপুরি বাদ দেওয়া। commit-গুলো যেমন-আছে প্রয়োগ না করে git একটি "todo list" নিয়ে একটি editor খোলে—প্রতি commit-এ একটি লাইন—আর সেখানে রাখা নির্দেশ অনুযায়ী history পুনর্লিখন করে।') },
        { p: l('The problem it solves is messy local history. As you work you make small, imperfect commits: "wip", "fix typo", "actually fix it", "oops". That is fine while you experiment, but reviewers and future readers want a clean story: a few well-described commits that each do one thing. Interactive rebase turns your rough working history into that clean, reviewable history — before anyone else sees it.', 'এটি যে সমস্যা সমাধান করে তা হলো এলোমেলো local history। কাজ করতে করতে আপনি ছোট, অপূর্ণ commit করেন: "wip", "fix typo", "actually fix it", "oops"। পরীক্ষা করার সময় এটি ঠিক আছে, কিন্তু reviewer ও ভবিষ্যৎ পাঠক একটি পরিষ্কার গল্প চায়: কয়েকটি ভালো-বর্ণিত commit যার প্রতিটি একটি করে কাজ করে। interactive rebase আপনার এলোমেলো কাজের history-কে সেই পরিষ্কার, review-যোগ্য history-তে পরিণত করে—অন্য কেউ দেখার আগে।') },
        { note: l('Editing a rough draft before submission — merge paragraphs, fix titles, cut the filler. The reader should see the polished essay, not every crossed-out sentence you wrote along the way.', 'জমা দেওয়ার আগে একটি খসড়া সম্পাদনা—অনুচ্ছেদ মেলান, শিরোনাম ঠিক করুন, বাড়তি কাটুন। পাঠকের পরিপাটি রচনাটি দেখা উচিত, পথে লেখা প্রতিটি কাটা বাক্য নয়।'), kind: 'tip' },
      ],
    },
    {
      h: l('How interactive rebase works', 'interactive rebase কীভাবে কাজ করে'),
      blocks: [
        { p: l('You tell git how far back to go, usually with HEAD~n (the last n commits). Git opens the todo list with those commits in order, oldest at the top. You edit each line’s verb, save, and close the editor; git then replays the commits following your instructions.', 'আপনি git-কে বলেন কতটা পিছনে যেতে হবে, সাধারণত HEAD~n (শেষ n commit) দিয়ে। git সেই commit-গুলো ক্রমে নিয়ে todo list খোলে, সবচেয়ে পুরনোটি উপরে। আপনি প্রতিটি লাইনের verb সম্পাদনা করেন, save করে editor বন্ধ করেন; তারপর git আপনার নির্দেশ মেনে commit-গুলো আবার চালায়।') },
        { p: l('One subtle detail trips up beginners: the todo list is ordered oldest-first, the opposite of git log, so the line at the top is the earliest commit. Because squash and fixup always fold a line into the commit directly above it, the line order decides which commit absorbs which. Reordering is just moving lines, but always re-read the order before you save.', 'একটি সূক্ষ্ম বিষয় নতুনদের বিভ্রান্ত করে: todo list পুরনো-আগে ক্রমে সাজানো, git log-এর উল্টো, তাই উপরের লাইনটি সবচেয়ে পুরনো commit। squash ও fixup সবসময় একটি লাইনকে ঠিক উপরের commit-এ মেলায় বলে লাইনের ক্রমই ঠিক করে কোন commit কোনটিকে শোষণ করে। পুনর্বিন্যাস মানে শুধু লাইন সরানো, তবে save করার আগে সবসময় ক্রম আবার পড়ুন।') },
        { steps: [
          l('Run git rebase -i HEAD~n to open the todo list for your last n commits (oldest first).', 'আপনার শেষ n commit-এর জন্য todo list খুলতে git rebase -i HEAD~n চালান (পুরনোটি আগে)।'),
          l('Change the verb at the start of each line — leave pick to keep it, or use reword, edit, squash, fixup, or drop.', 'প্রতিটি লাইনের শুরুতে verb বদলান—রাখতে pick রাখুন, নাহলে reword, edit, squash, fixup বা drop ব্যবহার করুন।'),
          l('To reorder commits, move whole lines up or down. To delete a commit, delete its line (or mark it drop).', 'commit পুনর্বিন্যাসে পুরো লাইন উপরে বা নিচে সরান। commit মুছতে তার লাইন মুছুন (বা drop চিহ্নিত করুন)।'),
          l('Save and close the editor. Git replays the commits top to bottom, pausing when a verb needs input (like reword or edit).', 'save করে editor বন্ধ করুন। git commit-গুলো উপর থেকে নিচে আবার চালায়, verb-এর input লাগলে (যেমন reword বা edit) থামে।'),
          l('If a replayed commit conflicts, resolve the files, git add them, and run git rebase --continue; use git rebase --abort at any time to bail out unchanged.', 'কোনো replay-করা commit conflict করলে ফাইল মিটিয়ে git add করুন, ও git rebase --continue চালান; অপরিবর্তিত অবস্থায় বেরোতে যেকোনো সময় git rebase --abort নিন।'),
        ] },
        { code: `# git rebase -i HEAD~4  opens this todo list:

pick   a1b2c3d  add login form
squash 4d5e6f7  wip styling
reword 7a8b9c0  add validation
drop   0c1d2e3  debug console log

# Rebase a1b2c3d..0c1d2e3 onto 9f8e7d6
#
# Commands:
# p, pick   = use commit
# r, reword = use commit, but edit the commit message
# e, edit   = use commit, but stop for amending
# s, squash = meld into previous commit, keep both messages
# f, fixup  = like squash, but discard this commit message
# d, drop   = remove commit`, caption: l('One line per commit, oldest at the top. Change the verb, reorder lines, or delete a line, then save and close to rewrite history.', 'প্রতি commit-এ একটি লাইন, পুরনোটি উপরে। verb বদলান, লাইন পুনর্বিন্যাস করুন বা লাইন মুছুন, তারপর save করে বন্ধ করলে history পুনর্লিখন হয়।') },
      ],
    },
    {
      h: l('The rebase verbs', 'rebase verb-গুলো'),
      blocks: [
        { table: {
          head: [l('Verb', 'verb'), l('What it does', 'যা করে')],
          rows: [
            [l('pick', 'pick'), l('Keep the commit exactly as it is (the default for every line).', 'commit ঠিক যেমন আছে তেমন রাখে (প্রতিটি লাইনের ডিফল্ট)।')],
            [l('reword', 'reword'), l('Keep the commit and its changes, but stop to edit its commit message.', 'commit ও তার পরিবর্তন রাখে, তবে তার commit message সম্পাদনা করতে থামে।')],
            [l('edit', 'edit'), l('Stop at this commit so you can amend its contents, split it, or change files, then continue.', 'এই commit-এ থামে যাতে তার বিষয়বস্তু amend, ভাগ বা ফাইল বদলাতে পারেন, তারপর চালিয়ে যান।')],
            [l('squash', 'squash'), l('Meld this commit into the one above it, combining both commit messages into one.', 'এই commit-কে উপরেরটির সঙ্গে মেলায়, দুটি commit message একটিতে মিলিয়ে।')],
            [l('fixup', 'fixup'), l('Like squash, but throw away this commit’s message and keep only the one above’s.', 'squash-এর মতো, তবে এই commit-এর message ফেলে দেয় ও শুধু উপরেরটির রাখে।')],
            [l('drop', 'drop'), l('Remove this commit entirely, as if it never happened (same as deleting the line).', 'এই commit পুরোপুরি সরায়, যেন কখনো ছিলই না (লাইন মোছার সমান)।')],
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
            [l('Edit the last n commits', 'শেষ n commit সম্পাদনা'), l('git rebase -i HEAD~n', 'git rebase -i HEAD~n')],
            [l('Continue after resolving a conflict', 'conflict মেটানোর পর চালিয়ে যান'), l('git rebase --continue', 'git rebase --continue')],
            [l('Cancel the rebase, tree unchanged', 'rebase বাতিল, tree অপরিবর্তিত'), l('git rebase --abort', 'git rebase --abort')],
            [l('Make a commit that targets an earlier one', 'আগের একটিকে লক্ষ্য করে commit'), l('git commit --fixup=<sha>', 'git commit --fixup=<sha>')],
            [l('Auto-arrange and squash those fixups', 'সেই fixup অটো-সাজিয়ে squash'), l('git rebase -i --autosquash main', 'git rebase -i --autosquash main')],
          ],
        } },
      ],
    },
    {
      h: l('When and where to use interactive rebase', 'কখন ও কোথায় interactive rebase ব্যবহার করবেন'),
      blocks: [
        { p: l('Use interactive rebase to tidy your own branch just before you open a pull request or push for review: squash the "wip" commits, reword vague messages, drop debug commits, and reorder so the history reads logically. It also powers a fixup workflow — commit small corrections with git commit --fixup=<sha>, then git rebase -i --autosquash to fold each one into the right commit automatically.', 'pull request খোলার বা review-এর জন্য push করার ঠিক আগে নিজের branch গোছাতে interactive rebase নিন: "wip" commit squash করুন, অস্পষ্ট message reword করুন, debug commit drop করুন, ও history যেন যুক্তিসঙ্গতভাবে পড়া যায় তেমন পুনর্বিন্যাস করুন। এটি একটি fixup workflow-ও চালায়—git commit --fixup=<sha> দিয়ে ছোট সংশোধন commit করুন, তারপর git rebase -i --autosquash দিয়ে প্রতিটি সঠিক commit-এ আপনাআপনি মিলিয়ে দিন।') },
        { note: l('The golden rule: only interactive-rebase commits you have not yet shared. Rebasing rewrites commits and gives them new ids, so if teammates already based work on the old commits you will diverge and force everyone into painful reconciliation. On shared history, prefer git revert instead.', 'সোনালি নিয়ম: শুধু যেসব commit এখনো শেয়ার করেননি সেগুলোতে interactive-rebase করুন। rebase commit পুনর্লিখন করে ও নতুন id দেয়, তাই সতীর্থরা পুরনো commit-এর উপর কাজ করে থাকলে আপনি সরে যাবেন ও সবাইকে কষ্টকর মিলমিশে ঠেলবেন। শেয়ার করা history-তে বরং git revert নিন।'), kind: 'warn' },
      ],
    },
    {
      h: l('Common mistakes', 'সাধারণ ভুল'),
      blocks: [
        { list: [
          l('Interactive-rebasing commits that are already pushed and shared, breaking everyone else’s branch. Only rewrite un-pushed history.', 'ইতিমধ্যে push ও শেয়ার হওয়া commit-এ interactive-rebase করা, বাকিদের branch ভাঙা। শুধু un-pushed history পুনর্লিখন করুন।'),
          l('Squashing in the wrong direction — squash and fixup meld into the commit above, so order matters; put the keeper on top.', 'ভুল দিকে squash করা—squash ও fixup উপরের commit-এ মেলায়, তাই ক্রম গুরুত্বপূর্ণ; যেটি রাখবেন তা উপরে রাখুন।'),
          l('Abandoning a rebase midway and leaving the repo half-rebased. If unsure, git rebase --abort returns you to exactly where you started.', 'মাঝপথে rebase ছেড়ে repo অর্ধেক-rebased রেখে দেওয়া। নিশ্চিত না হলে git rebase --abort আপনাকে ঠিক শুরুর জায়গায় ফেরায়।'),
          l('Force-pushing a rewritten branch with git push --force and clobbering a teammate’s new commits; prefer --force-with-lease, which refuses if the remote moved.', 'git push --force দিয়ে পুনর্লিখিত branch force-push করে সতীর্থের নতুন commit মুছে ফেলা; বরং --force-with-lease নিন, যা remote নড়লে থেমে যায়।'),
          l('Trying to reorder commits that depend on each other and hitting a cascade of conflicts; go one step at a time and resolve carefully.', 'পরস্পর-নির্ভর commit পুনর্বিন্যাসের চেষ্টা করে একের পর এক conflict-এ পড়া; এক ধাপে এগোন ও সাবধানে মেটান।'),
        ] },
      ],
    },
    {
      h: l('Remember in one line', 'এক লাইনে মনে রাখুন'),
      blocks: [
        { list: [
          l('Interactive rebase (git rebase -i HEAD~n) lets you reorder, reword, squash, fixup, edit, or drop recent commits.', 'interactive rebase (git rebase -i HEAD~n) সাম্প্রতিক commit পুনর্বিন্যাস, reword, squash, fixup, edit বা drop করতে দেয়।'),
          l('The verb on each todo line decides its fate; squash and fixup merge into the line above.', 'প্রতিটি todo লাইনের verb তার ভাগ্য ঠিক করে; squash ও fixup উপরের লাইনে মেলে।'),
          l('It rewrites commit ids — only ever do it on your own un-pushed branch, never on shared history.', 'এটি commit id পুনর্লিখন করে—শুধু নিজের un-pushed branch-এ করুন, শেয়ার করা history-তে কখনো নয়।'),
        ] },
      ],
    },
  ],

  // ── git-cherry-pick · Cherry-pick & bisect ────────────────────────────────
  'git-cherry-pick': [
    {
      h: l('What are cherry-pick and bisect?', 'cherry-pick ও bisect কী?'),
      blocks: [
        { p: l('These are two precise, surgical git tools. git cherry-pick copies a single commit from anywhere in your history and applies it onto your current branch as a new commit. git bisect is a debugging tool that binary-searches your history to find the exact commit that introduced a bug. They solve different problems but share a theme: pinpoint accuracy on individual commits.', 'এগুলো দুটি নিখুঁত, শল্যচিকিৎসার মতো git টুল। git cherry-pick আপনার history-র যেকোনো জায়গা থেকে একটি commit কপি করে বর্তমান branch-এ একটি নতুন commit হিসেবে প্রয়োগ করে। git bisect একটি debugging টুল যা bug ঢোকানো ঠিক commit-টি খুঁজতে history-তে binary-search করে। এরা ভিন্ন সমস্যা সমাধান করে কিন্তু একটি বিষয় ভাগ করে: আলাদা commit-এ নিখুঁত নিশানা।') },
        { p: l('The problem cherry-pick solves is "I need just this one commit, not the whole branch." Maybe a bug fix landed on main and you need it on a release branch without pulling in everything else. The problem bisect solves is "something broke, but which of the last 200 commits did it?" Instead of checking them one by one, bisect halves the search each step, finding the culprit in about log2(n) tries.', 'cherry-pick যে সমস্যা সমাধান করে তা হলো "আমার শুধু এই একটি commit দরকার, পুরো branch নয়।" হয়তো একটি bug fix main-এ এসেছে ও আপনার তা release branch-এ দরকার, বাকি সব না টেনে। bisect যে সমস্যা সমাধান করে: "কিছু ভেঙেছে, কিন্তু শেষ ২০০ commit-এর কোনটি করল?" একে একে যাচাই না করে bisect প্রতি ধাপে খোঁজ অর্ধেক করে, প্রায় log2(n) চেষ্টায় দোষীকে পায়।') },
        { note: l('Cherry-pick lifts one paragraph into another document; bisect plays "hot or cold" to locate the broken line. One copies a single piece; the other narrows a search by half each guess.', 'cherry-pick এক document থেকে একটি অনুচ্ছেদ তুলে আরেকটিতে বসায়; bisect ভাঙা লাইন খুঁজতে "গরম না ঠান্ডা" খেলে। একটি একটি টুকরো কপি করে; অন্যটি প্রতিটি আন্দাজে খোঁজ অর্ধেক করে সরু করে।'), kind: 'tip' },
      ],
    },
    {
      h: l('How cherry-pick works', 'cherry-pick কীভাবে কাজ করে'),
      blocks: [
        { p: l('Cherry-pick takes the diff a commit introduced and re-applies it on top of your current branch, creating a brand-new commit with a new id. The changes are the same, but the commit is a copy — a different point in history.', 'cherry-pick একটি commit যে diff এনেছিল তা নিয়ে আপনার বর্তমান branch-এর উপরে আবার প্রয়োগ করে, একটি নতুন id-সহ একদম নতুন commit তৈরি করে। পরিবর্তন একই, কিন্তু commit একটি কপি—history-র ভিন্ন একটি বিন্দু।') },
        { steps: [
          l('Find the commit id you want with git log on the branch that has it.', 'যে branch-এ আছে সেখানে git log দিয়ে দরকারি commit id খুঁজুন।'),
          l('Switch to the branch that should receive it, for example git switch release.', 'যে branch-এ নিতে হবে সেখানে যান, যেমন git switch release।'),
          l('Run git cherry-pick <sha> to apply that commit’s changes as a new commit here.', 'git cherry-pick <sha> চালান সেই commit-এর পরিবর্তন এখানে নতুন commit হিসেবে প্রয়োগ করতে।'),
          l('If it conflicts, resolve the files, git add them, and run git cherry-pick --continue (or git cherry-pick --abort to cancel).', 'conflict হলে ফাইল মিটিয়ে git add করুন, ও git cherry-pick --continue চালান (বা বাতিল করতে git cherry-pick --abort)।'),
          l('Cherry-pick a range with git cherry-pick A..B, or apply the changes without committing using git cherry-pick -n.', 'git cherry-pick A..B দিয়ে একটি পরিসর cherry-pick করুন, বা git cherry-pick -n দিয়ে commit না করেই পরিবর্তন প্রয়োগ করুন।'),
        ] },
        { code: `# copy one bug-fix commit from main onto the release branch
git switch release
git log --oneline main        # find the fix, say 3f9a1c2
git cherry-pick 3f9a1c2       # applies it here as a NEW commit

# if it conflicts:
# ...edit files to resolve...
git add .
git cherry-pick --continue`, caption: l('The fix is now on release as a new commit with a different id. The change is identical; the commit is a copy.', 'fix এখন release-এ একটি ভিন্ন id-সহ নতুন commit হিসেবে আছে। পরিবর্তন হুবহু; commit একটি কপি।') },
      ],
    },
    {
      h: l('How bisect works', 'bisect কীভাবে কাজ করে'),
      blocks: [
        { p: l('Bisect needs two reference points: a commit you know is good (bug absent) and one you know is bad (bug present). It then checks out a commit halfway between them and asks whether it is good or bad, halving the range each time until only the first bad commit remains.', 'bisect-এর দুটি রেফারেন্স বিন্দু লাগে: একটি commit যা ভালো জানেন (bug নেই) ও একটি যা খারাপ জানেন (bug আছে)। তারপর এটি তাদের মাঝামাঝি একটি commit checkout করে জিজ্ঞাসা করে এটি ভালো না খারাপ, প্রতিবার পরিসর অর্ধেক করে যতক্ষণ শুধু প্রথম খারাপ commit থাকে।') },
        { steps: [
          l('Start with git bisect start, then mark the current broken state git bisect bad and a known-good older commit git bisect good <sha>.', 'git bisect start দিয়ে শুরু করুন, তারপর বর্তমান ভাঙা অবস্থা git bisect bad ও একটি জানা-ভালো পুরনো commit git bisect good <sha> চিহ্নিত করুন।'),
          l('Git checks out a commit in the middle; test it (run the app or the test) and tell git the result with git bisect good or git bisect bad.', 'git মাঝের একটি commit checkout করে; এটি পরীক্ষা করুন (app বা test চালান) ও git bisect good বা git bisect bad দিয়ে git-কে ফল বলুন।'),
          l('Repeat — each answer halves the remaining range — until git names the first bad commit.', 'পুনরাবৃত্তি করুন—প্রতিটি উত্তর বাকি পরিসর অর্ধেক করে—যতক্ষণ git প্রথম খারাপ commit নাম বলে।'),
          l('Run git bisect reset to return to where you started.', 'শুরুর জায়গায় ফিরতে git bisect reset চালান।'),
          l('To automate, let a test script decide each step: git bisect run <command> marks good or bad by the command’s exit code.', 'অটোমেট করতে একটি test script প্রতিটি ধাপ ঠিক করতে দিন: git bisect run <command> command-এর exit code দিয়ে good বা bad চিহ্নিত করে।'),
        ] },
        { code: `git bisect start
git bisect bad                 # current commit is broken
git bisect good v1.4.0         # this old tag worked

# git checks out a midpoint; test it, then answer:
git bisect good   # or: git bisect bad

# ...repeat until git prints "<sha> is the first bad commit"...

git bisect reset               # go back to where you began

# or fully automate with a test command:
git bisect run npm test`, caption: l('Each answer halves the search, so bisect finds the culprit among hundreds of commits in only a handful of steps.', 'প্রতিটি উত্তর খোঁজ অর্ধেক করে, তাই bisect শত শত commit-এর মধ্যে মাত্র কয়েক ধাপে দোষীকে পায়।') },
      ],
    },
    {
      h: l('Key commands', 'মূল কমান্ড'),
      blocks: [
        { table: {
          head: [l('Goal', 'লক্ষ্য'), l('Command', 'কমান্ড')],
          rows: [
            [l('Copy one commit here', 'একটি commit এখানে কপি'), l('git cherry-pick <sha>', 'git cherry-pick <sha>')],
            [l('Copy a range of commits', 'একটি পরিসর commit কপি'), l('git cherry-pick A..B', 'git cherry-pick A..B')],
            [l('Apply changes without committing', 'commit না করে পরিবর্তন প্রয়োগ'), l('git cherry-pick -n <sha>', 'git cherry-pick -n <sha>')],
            [l('Start a bug hunt', 'বাগ খোঁজা শুরু'), l('git bisect start', 'git bisect start')],
            [l('Mark commits good / bad', 'commit ভালো / খারাপ চিহ্নিত'), l('git bisect good <sha> / git bisect bad', 'git bisect good <sha> / git bisect bad')],
            [l('Automate the hunt with a test', 'test দিয়ে খোঁজা অটোমেট'), l('git bisect run npm test', 'git bisect run npm test')],
            [l('End the hunt', 'খোঁজা শেষ'), l('git bisect reset', 'git bisect reset')],
          ],
        } },
      ],
    },
    {
      h: l('When and where to use them', 'কখন ও কোথায় ব্যবহার করবেন'),
      blocks: [
        { p: l('Reach for cherry-pick when you need one specific commit somewhere else: back-porting a hotfix to a maintenance branch, pulling a single useful commit out of an abandoned branch, or moving a commit you accidentally made on the wrong branch. Use bisect whenever a bug appeared "sometime recently" and you cannot tell which change caused it — especially in a long history where reading diffs by hand would take hours.', 'যখন অন্য কোথাও একটি নির্দিষ্ট commit দরকার তখন cherry-pick নিন: একটি hotfix maintenance branch-এ back-port করা, একটি পরিত্যক্ত branch থেকে একটি কাজের commit তোলা, বা ভুল branch-এ করা commit সরানো। যখন একটি bug "সম্প্রতি কখনো" এসেছে ও কোন পরিবর্তন করেছে বলতে পারছেন না তখন bisect নিন—বিশেষত লম্বা history-তে যেখানে হাতে diff পড়তে ঘণ্টা লাগত।') },
        { p: l('Prefer a normal merge or rebase over cherry-picking many commits. Cherry-pick is for the occasional single commit; picking a long series one by one duplicates commits under new ids and can confuse a later merge, because git may see the "same" change twice. If you find yourself cherry-picking a whole feature, a merge is almost always cleaner.', 'অনেক commit cherry-pick করার চেয়ে সাধারণ merge বা rebase নেওয়া ভালো। cherry-pick মাঝেমধ্যে একটি একক commit-এর জন্য; একে একে লম্বা সিরিজ নেওয়া নতুন id-তে commit নকল করে ও পরের merge-এ বিভ্রান্তি আনতে পারে, কারণ git "একই" পরিবর্তন দুবার দেখতে পারে। পুরো একটি feature cherry-pick করতে দেখলে merge প্রায় সবসময় বেশি পরিষ্কার।') },
      ],
    },
    {
      h: l('Common mistakes', 'সাধারণ ভুল'),
      blocks: [
        { list: [
          l('Cherry-picking many commits one by one when a proper merge or rebase would have been cleaner and kept a single lineage.', 'একটি সঠিক merge বা rebase বেশি পরিষ্কার হতো ও একটিই বংশধারা রাখত, সেখানে একে একে অনেক commit cherry-pick করা।'),
          l('Forgetting that cherry-pick creates a new commit id; the same change now exists twice in different branches, which can cause confusing conflicts when they later merge.', 'ভুলে যাওয়া যে cherry-pick নতুন commit id তৈরি করে; একই পরিবর্তন এখন ভিন্ন branch-এ দুবার থাকে, যা পরে merge করলে বিভ্রান্তিকর conflict ঘটাতে পারে।'),
          l('Starting a bisect and giving a wrong good/bad answer, sending the search down the wrong half — test carefully at each step.', 'bisect শুরু করে ভুল good/bad উত্তর দেওয়া, খোঁজকে ভুল অর্ধেকে পাঠানো—প্রতি ধাপে সাবধানে পরীক্ষা করুন।'),
          l('Forgetting git bisect reset when done, and staying stranded on an old checked-out commit.', 'শেষে git bisect reset ভুলে যাওয়া, ও একটি পুরনো checkout-করা commit-এ আটকে থাকা।'),
          l('Assuming a clean cherry-pick means correct behaviour — the code applied without conflict, but it may still depend on other commits you did not bring along.', 'ধরে নেওয়া পরিষ্কার cherry-pick মানে সঠিক আচরণ—কোড conflict ছাড়া প্রয়োগ হলো, তবে এটি এখনো অন্য commit-এর উপর নির্ভর করতে পারে যা আপনি আনেননি।'),
        ] },
      ],
    },
    {
      h: l('Remember in one line', 'এক লাইনে মনে রাখুন'),
      blocks: [
        { list: [
          l('git cherry-pick copies one commit onto your current branch as a new commit; git bisect binary-searches history to find a bug’s origin.', 'git cherry-pick একটি commit আপনার বর্তমান branch-এ নতুন commit হিসেবে কপি করে; git bisect bug-এর উৎস খুঁজতে history-তে binary-search করে।'),
          l('Cherry-pick single, occasional commits; for a whole series, merge or rebase instead.', 'একক, মাঝেমধ্যের commit cherry-pick করুন; পুরো সিরিজের জন্য বরং merge বা rebase নিন।'),
          l('Bisect with good/bad marks (or git bisect run) finds the first bad commit in about log2(n) steps — then git bisect reset.', 'good/bad চিহ্ন দিয়ে (বা git bisect run) bisect প্রায় log2(n) ধাপে প্রথম খারাপ commit পায়—তারপর git bisect reset।'),
        ] },
      ],
    },
  ],

  // ── git-hooks-signing · Hooks & signed commits ────────────────────────────
  'git-hooks-signing': [
    {
      h: l('What are git hooks and signed commits?', 'git hook ও signed commit কী?'),
      blocks: [
        { p: l('These are two separate ideas that both harden your workflow. Git hooks are scripts that git runs automatically at certain moments — before a commit, before a push, after a merge — so you can enforce checks or automate steps without having to remember. Signing commits attaches a cryptographic signature to each commit that proves it genuinely came from you and was not tampered with.', 'এই দুটি আলাদা ধারণা দুটোই আপনার workflow শক্ত করে। git hook হলো এমন script যা git কিছু মুহূর্তে আপনাআপনি চালায়—commit-এর আগে, push-এর আগে, merge-এর পরে—যাতে মনে রাখার দরকার ছাড়াই check প্রয়োগ বা ধাপ অটোমেট করতে পারেন। commit signing প্রতিটি commit-এ একটি cryptographic signature যোগ করে যা প্রমাণ করে সেটি সত্যিই আপনার থেকে এসেছে ও কেউ বদলায়নি।') },
        { p: l('The problem hooks solve is "the rule everyone forgets." You want tests to pass, code to be linted, and commit messages to follow a format — but relying on humans to remember is unreliable. A hook makes the check happen automatically at the right moment. The problem signing solves is authorship and trust: a commit’s author field is just plain text anyone can fake, so a signature is the proof that a commit is really yours, which platforms like GitHub display as a "Verified" badge.', 'hook যে সমস্যা সমাধান করে তা হলো "যে নিয়ম সবাই ভোলে।" আপনি চান test পাস হোক, কোড lint হোক, ও commit message একটি format মানুক—কিন্তু মানুষের মনে রাখার উপর নির্ভর করা অনির্ভরযোগ্য। hook সঠিক মুহূর্তে check-টি আপনাআপনি ঘটায়। signing যে সমস্যা সমাধান করে তা হলো লেখকত্ব ও আস্থা: একটি commit-এর author ফিল্ড শুধু সাধারণ টেক্সট যা যে কেউ নকল করতে পারে, তাই signature হলো প্রমাণ যে commit সত্যিই আপনার, যা GitHub-এর মতো প্ল্যাটফর্ম "Verified" ব্যাজ হিসেবে দেখায়।') },
        { note: l('A hook is an automatic quality gate at the door; a signature is the wax seal proving authorship. The gate stops bad work from getting through; the seal proves who sent what.', 'hook হলো দরজায় একটি স্বয়ংক্রিয় মান-গেট; signature হলো লেখকত্ব প্রমাণকারী মোমের সিল। গেট খারাপ কাজ ঢুকতে দেয় না; সিল প্রমাণ করে কে কী পাঠিয়েছে।'), kind: 'tip' },
      ],
    },
    {
      h: l('How git hooks work', 'git hook কীভাবে কাজ করে'),
      blocks: [
        { p: l('Hooks live in the .git/hooks/ directory of every repository as executable scripts named after the event they fire on — pre-commit, commit-msg, pre-push, and more. Git ships sample files (with a .sample suffix) you can rename to activate. A hook that exits with a non-zero status blocks the action, so a failing pre-commit stops the commit.', 'hook প্রতিটি repository-র .git/hooks/ ডিরেক্টরিতে থাকে, executable script হিসেবে, যে event-এ চলে তার নামে নামকৃত—pre-commit, commit-msg, pre-push ও আরও। git নমুনা ফাইল (.sample suffix-সহ) দেয় যা rename করে চালু করা যায়। যে hook non-zero status-এ শেষ হয় তা কাজটি আটকায়, তাই একটি ব্যর্থ pre-commit commit থামায়।') },
        { steps: [
          l('Look in .git/hooks/ — git puts sample hooks there for every event (pre-commit.sample, pre-push.sample, and so on).', '.git/hooks/-এ দেখুন—git প্রতিটি event-এর জন্য নমুনা hook সেখানে রাখে (pre-commit.sample, pre-push.sample ইত্যাদি)।'),
          l('Create an executable script named exactly after the event, for example .git/hooks/pre-commit, and make it executable with chmod +x.', 'event-এর ঠিক নামে একটি executable script তৈরি করুন, যেমন .git/hooks/pre-commit, ও chmod +x দিয়ে executable করুন।'),
          l('Inside, run whatever check you want (a linter, a test, a format check). Exit 0 to allow the action; exit non-zero to block it.', 'ভিতরে যে check চান চালান (একটি linter, test, format check)। কাজ চালাতে exit 0; আটকাতে exit non-zero।'),
          l('Because .git/hooks/ is not committed, hooks are local by default. To share them with a team, keep scripts in a tracked folder and point git at it with git config core.hooksPath .githooks.', '.git/hooks/ commit হয় না বলে hook ডিফল্টে local। টিমের সঙ্গে শেয়ার করতে script একটি tracked folder-এ রাখুন ও git config core.hooksPath .githooks দিয়ে git-কে সেদিকে নির্দেশ করুন।'),
          l('Tools like Husky wrap this pattern for JavaScript projects, installing shared hooks automatically.', 'Husky-র মতো টুল JavaScript প্রকল্পের জন্য এই প্যাটার্ন মুড়ে দেয়, শেয়ার্ড hook আপনাআপনি ইনস্টল করে।'),
        ] },
        { code: `# a simple pre-commit hook: block the commit if linting fails
# save as .git/hooks/pre-commit, then: chmod +x .git/hooks/pre-commit

#!/bin/sh
npm run lint || exit 1     # a non-zero exit blocks the commit

# to share hooks with your whole team, track them and point git at them:
git config core.hooksPath .githooks`, caption: l('A non-zero exit blocks the action. Because .git/hooks/ is not committed, use core.hooksPath to share hooks across a team.', 'non-zero exit কাজটি আটকায়। .git/hooks/ commit হয় না বলে টিমজুড়ে hook শেয়ার করতে core.hooksPath ব্যবহার করুন।') },
      ],
    },
    {
      h: l('How commit signing works', 'commit signing কীভাবে কাজ করে'),
      blocks: [
        { p: l('Signing uses a key (GPG, SSH, or S/MIME) that only you hold. When you sign a commit, git records a signature computed from the commit and your private key; anyone with your public key can then verify it was you and that nothing changed. GitHub shows verified signatures with a green "Verified" badge.', 'signing এমন একটি key (GPG, SSH বা S/MIME) ব্যবহার করে যা শুধু আপনার কাছে। commit sign করলে git commit ও আপনার private key থেকে হিসাব করা একটি signature রাখে; আপনার public key যার কাছে আছে সে যাচাই করতে পারে এটি আপনিই ও কিছু বদলায়নি। GitHub যাচাইকৃত signature-কে একটি সবুজ "Verified" ব্যাজ দিয়ে দেখায়।') },
        { steps: [
          l('Create or choose a signing key (a GPG key or, more simply, an SSH key) and tell git which key to use.', 'একটি signing key তৈরি বা বাছুন (একটি GPG key বা আরও সহজে একটি SSH key) ও git-কে বলুন কোন key ব্যবহার করবে।'),
          l('Sign a single commit on demand with git commit -S, or sign every commit automatically with git config --global commit.gpgsign true.', 'চাহিদামতো একটি commit sign করুন git commit -S দিয়ে, বা git config --global commit.gpgsign true দিয়ে প্রতিটি commit আপনাআপনি sign করুন।'),
          l('Upload your public key to GitHub so it can verify your signatures and show the "Verified" badge.', 'আপনার public key GitHub-এ আপলোড করুন যাতে এটি আপনার signature যাচাই করে "Verified" ব্যাজ দেখাতে পারে।'),
          l('Verify signatures locally with git log --show-signature.', 'git log --show-signature দিয়ে local-এ signature যাচাই করুন।'),
        ] },
        { code: `# sign one commit
git commit -S -m "add payment webhook"

# sign every commit from now on, everywhere
git config --global commit.gpgsign true

# check signatures in the log
git log --show-signature`, caption: l('-S signs a single commit; commit.gpgsign true signs them all. Add your public key to GitHub to earn the "Verified" badge.', '-S একটি commit sign করে; commit.gpgsign true সব sign করে। "Verified" ব্যাজ পেতে আপনার public key GitHub-এ যোগ করুন।') },
      ],
    },
    {
      h: l('Key commands', 'মূল কমান্ড'),
      blocks: [
        { table: {
          head: [l('Goal', 'লক্ষ্য'), l('Command', 'কমান্ড')],
          rows: [
            [l('Find where hooks live', 'hook কোথায় থাকে দেখুন'), l('.git/hooks/', '.git/hooks/')],
            [l('Point git at a shared hooks folder', 'একটি শেয়ার্ড hook folder-এ নির্দেশ'), l('git config core.hooksPath .githooks', 'git config core.hooksPath .githooks')],
            [l('Sign one commit', 'একটি commit sign'), l('git commit -S', 'git commit -S')],
            [l('Sign every commit automatically', 'প্রতিটি commit আপনাআপনি sign'), l('git config --global commit.gpgsign true', 'git config --global commit.gpgsign true')],
            [l('Verify commit signatures', 'commit signature যাচাই'), l('git log --show-signature', 'git log --show-signature')],
          ],
        } },
      ],
    },
    {
      h: l('When and where to use them', 'কখন ও কোথায় ব্যবহার করবেন'),
      blocks: [
        { p: l('Use a pre-commit hook to catch problems before they enter history — linting, formatting, running fast unit tests, or blocking secrets and huge files. Use a commit-msg hook to enforce a message format, and a pre-push hook for slower checks you only want before code leaves your machine. For a team, put the scripts under version control and set core.hooksPath (or adopt Husky) so everyone runs the same gates.', 'history-তে ঢোকার আগে সমস্যা ধরতে একটি pre-commit hook ব্যবহার করুন—lint, format, দ্রুত unit test চালানো, বা secret ও বিশাল ফাইল আটকানো। message format প্রয়োগে commit-msg hook নিন, আর কোড আপনার মেশিন ছাড়ার আগে চাওয়া ধীর check-এর জন্য pre-push hook। টিমের জন্য script version control-এ রাখুন ও core.hooksPath সেট করুন (বা Husky নিন) যাতে সবাই একই গেট চালায়।') },
        { p: l('Use commit signing when authorship and trust matter: open-source projects where anyone can open a pull request, regulated or security-sensitive codebases, and any team that wants the "Verified" badge to distinguish real commits from spoofed ones. For a solo hobby project it is optional; for shared or public work it is a cheap, strong guarantee.', 'যখন লেখকত্ব ও আস্থা গুরুত্বপূর্ণ তখন commit signing ব্যবহার করুন: open-source প্রকল্প যেখানে যে কেউ pull request খুলতে পারে, নিয়ন্ত্রিত বা নিরাপত্তা-সংবেদনশীল codebase, ও যেকোনো টিম যারা আসল commit-কে নকল থেকে আলাদা করতে "Verified" ব্যাজ চায়। একক শখের প্রকল্পে এটি ঐচ্ছিক; শেয়ার্ড বা পাবলিক কাজে এটি একটি সস্তা, শক্তিশালী নিশ্চয়তা।') },
      ],
    },
    {
      h: l('Common mistakes', 'সাধারণ ভুল'),
      blocks: [
        { list: [
          l('Relying on a personal pre-commit hook for a team rule, so teammates without it bypass the check entirely — enforce shared rules in CI too, not just locally.', 'টিম নিয়মের জন্য ব্যক্তিগত pre-commit hook-এ নির্ভর করা, ফলে যাদের নেই তারা check পুরো এড়ায়—শেয়ার্ড নিয়ম শুধু local-এ নয়, CI-তেও প্রয়োগ করুন।'),
          l('Forgetting to make the hook file executable, so git silently ignores it and the check never runs.', 'hook ফাইল executable করতে ভুলে যাওয়া, ফলে git নীরবে তা উপেক্ষা করে ও check কখনো চলে না।'),
          l('Putting slow tests in pre-commit and making every commit painful; keep pre-commit fast and move heavy checks to pre-push or CI.', 'pre-commit-এ ধীর test রেখে প্রতিটি commit যন্ত্রণাদায়ক করা; pre-commit দ্রুত রাখুন ও ভারী check pre-push বা CI-তে সরান।'),
          l('Treating client-side hooks as security — a developer can skip any local hook with git commit --no-verify, so real enforcement belongs on the server or in CI.', 'client-side hook-কে নিরাপত্তা ভাবা—একজন ডেভেলপার git commit --no-verify দিয়ে যেকোনো local hook এড়াতে পারে, তাই আসল প্রয়োগ server বা CI-তে।'),
          l('Enabling commit.gpgsign but never uploading the public key to GitHub, so commits are signed locally yet still show as "Unverified".', 'commit.gpgsign চালু করা কিন্তু public key কখনো GitHub-এ আপলোড না করা, ফলে commit local-এ signed তবু "Unverified" দেখায়।'),
        ] },
      ],
    },
    {
      h: l('Remember in one line', 'এক লাইনে মনে রাখুন'),
      blocks: [
        { list: [
          l('Git hooks run scripts on events like commit or push; signing commits proves they genuinely came from you.', 'git hook commit বা push-এর মতো event-এ script চালায়; commit sign করা প্রমাণ করে সেগুলো সত্যিই আপনার থেকে এসেছে।'),
          l('Hooks live in .git/hooks/ and are local — share them with core.hooksPath or Husky, and back them with CI since --no-verify skips them.', 'hook .git/hooks/-এ থাকে ও local—core.hooksPath বা Husky দিয়ে শেয়ার করুন, আর CI দিয়ে সমর্থন দিন কারণ --no-verify এদের এড়ায়।'),
          l('git commit -S signs one commit and commit.gpgsign true signs them all; add your public key to GitHub for the "Verified" badge.', 'git commit -S একটি commit sign করে ও commit.gpgsign true সব sign করে; "Verified" ব্যাজের জন্য আপনার public key GitHub-এ যোগ করুন।'),
        ] },
      ],
    },
  ],
}
