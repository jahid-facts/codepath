// Deep, bilingual (English / Bangla) teaching guides for the Git & GitHub course —
// Foundations & the everyday snapshot loop. Shape mirrors app/course-guides.js and
// app/guides/dsa/a.js: each guide is an array of sections { h, blocks }, rendered by
// GuideBlock in app/LearningApp.js. Block types: { p }, { list }, { steps },
// { table:{head,rows} }, { note, kind }, { code, caption }.
// Facts (definitions, analogies, commands, trade-offs, mistakes) come from app/courses/git.js.

const l = (en, bn) => ({ en, bn })

export default {
  // ── git-what · What are Git & GitHub? ─────────────────────────────────────
  'git-what': [
    {
      h: l('What are Git and GitHub?', 'গিট ও গিটহাব কী?'),
      blocks: [
        { p: l('Git is a version control system: a tool that runs on your own computer and saves snapshots of your project every time you ask it to. Each snapshot, called a commit, records exactly what every file looked like at that moment, who made the change, and a message describing why. Because Git keeps the full history, you can go back to any past version, compare two versions line by line, and see who changed what — all without ever leaving your machine.', 'গিট একটি ভার্সন কন্ট্রোল সিস্টেম: একটি টুল যা আপনার নিজের কম্পিউটারে চলে এবং আপনি চাইলেই প্রকল্পের স্ন্যাপশট সংরক্ষণ করে। প্রতিটি স্ন্যাপশট—যাকে commit বলে—ঠিক সেই মুহূর্তে প্রতিটি ফাইল কেমন ছিল, কে পরিবর্তন করেছে ও কেন করেছে তার একটি মেসেজ রেকর্ড করে। গিট পুরো ইতিহাস রাখে বলে আপনি যেকোনো পুরনো সংস্করণে ফিরতে পারেন, দুটি সংস্করণ লাইন-ধরে তুলনা করতে পারেন, এবং কে কী বদলেছে দেখতে পারেন—সবই মেশিন না ছেড়ে।') },
        { p: l('GitHub is a separate thing: a website that hosts Git repositories in the cloud and adds a collaboration layer on top. It stores a copy of your project online so it is backed up and shareable, and it adds features Git alone does not have — pull requests for code review, issues for tracking bugs and tasks, and automated checks (CI) that run on every change. The key idea to hold onto is that Git is the engine and GitHub is one popular place to park what the engine produces.', 'গিটহাব একটি আলাদা জিনিস: একটি ওয়েবসাইট যা গিট রিপোজিটরি ক্লাউডে হোস্ট করে এবং তার ওপর একটি সহযোগিতার স্তর যোগ করে। এটি আপনার প্রকল্পের একটি কপি অনলাইনে রাখে যাতে তা ব্যাকআপ ও শেয়ারযোগ্য থাকে, এবং এমন ফিচার যোগ করে যা শুধু গিটে নেই—কোড রিভিউর জন্য pull request, বাগ ও কাজ ট্র্যাক করতে issue, ও প্রতিটি পরিবর্তনে চলা স্বয়ংক্রিয় চেক (CI)। মূল ধারণাটি মনে রাখুন: গিট হলো ইঞ্জিন আর গিটহাব হলো সেই ইঞ্জিনের তৈরি জিনিস রাখার একটি জনপ্রিয় জায়গা।') },
        { note: l('Think of Git as the save-game system built into your code: it records checkpoints you can reload at any time. GitHub is the cloud where you upload those saves so teammates can download them, comment on them, and continue the game with you.', 'গিটকে ভাবুন আপনার কোডে বসানো সেভ-গেম সিস্টেম হিসেবে: এটি চেকপয়েন্ট রেকর্ড করে যা আপনি যেকোনো সময় আবার লোড করতে পারেন। গিটহাব হলো সেই ক্লাউড যেখানে আপনি এই সেভ আপলোড করেন যাতে টিমমেটরা ডাউনলোড করতে, মন্তব্য করতে ও আপনার সঙ্গে খেলা চালিয়ে যেতে পারে।'), kind: 'tip' },
      ],
    },
    {
      h: l('Git vs GitHub — two different things', 'গিট বনাম গিটহাব—দুটি ভিন্ন জিনিস'),
      blocks: [
        { p: l('Beginners often treat "Git" and "GitHub" as the same word, but they are not, and the difference matters the moment something goes wrong. Git is free software you install; GitHub is a company and a service. You can use Git for years with no GitHub account at all, and you could host your repositories on GitLab, Bitbucket, or your own server instead.', 'নতুনরা প্রায়ই "গিট" ও "গিটহাব"-কে একই শব্দ ভাবে, কিন্তু এরা এক নয়, এবং কিছু ভুল হলে এই পার্থক্য গুরুত্বপূর্ণ হয়ে ওঠে। গিট হলো ফ্রি সফটওয়্যার যা আপনি ইনস্টল করেন; গিটহাব হলো একটি কোম্পানি ও সেবা। আপনি বছরের পর বছর গিট ব্যবহার করতে পারেন কোনো গিটহাব অ্যাকাউন্ট ছাড়াই, এবং চাইলে GitLab, Bitbucket বা নিজের সার্ভারে রিপোজিটরি হোস্ট করতে পারতেন।') },
        { table: {
          head: [l('Aspect', 'দিক'), l('Git', 'গিট'), l('GitHub', 'গিটহাব')],
          rows: [
            [l('What it is', 'কী'), l('A version control tool on your computer', 'আপনার কম্পিউটারে একটি ভার্সন কন্ট্রোল টুল'), l('A website that hosts Git repositories', 'একটি ওয়েবসাইট যা গিট রিপোজিটরি হোস্ট করে')],
            [l('Where it runs', 'কোথায় চলে'), l('Locally, fully offline', 'লোকালি, পুরোপুরি অফলাইনে'), l('In the cloud, needs the internet', 'ক্লাউডে, ইন্টারনেট লাগে')],
            [l('Made by', 'কে বানিয়েছে'), l('Open-source, created by Linus Torvalds', 'ওপেন-সোর্স, Linus Torvalds নির্মিত'), l('A company (owned by Microsoft)', 'একটি কোম্পানি (Microsoft-এর মালিকানাধীন)')],
            [l('Core job', 'মূল কাজ'), l('Track changes, make commits, branch and merge', 'পরিবর্তন ট্র্যাক, commit বানানো, branch ও merge'), l('Backup, sharing, pull requests, issues, CI', 'ব্যাকআপ, শেয়ার, pull request, issue, CI')],
            [l('Required?', 'বাধ্যতামূলক?'), l('Yes — it is the actual engine', 'হ্যাঁ—এটিই আসল ইঞ্জিন'), l('Optional — one host among several', 'ঐচ্ছিক—কয়েকটি হোস্টের একটি')],
          ],
        } },
        { note: l('Your work is not backed up just because you committed it. A commit is local; until you push to GitHub, a lost laptop means lost work. "Committed" and "pushed" are two different levels of safety.', 'আপনি commit করেছেন বলেই কাজ ব্যাকআপ হয়ে যায় না। commit লোকাল; গিটহাবে push না করা পর্যন্ত ল্যাপটপ হারালে কাজও হারায়। "committed" ও "pushed" নিরাপত্তার দুটি ভিন্ন স্তর।'), kind: 'warn' },
      ],
    },
    {
      h: l('How a change travels from laptop to GitHub', 'একটি পরিবর্তন ল্যাপটপ থেকে গিটহাবে কীভাবে যায়'),
      blocks: [
        { steps: [
          l('You edit files in your project folder — this is ordinary work, Git is not involved yet.', 'আপনি প্রকল্প ফোল্ডারে ফাইল এডিট করেন—এটি সাধারণ কাজ, গিট এখনো জড়িত নয়।'),
          l('You stage and commit with Git, creating a snapshot that lives only on your machine.', 'আপনি গিট দিয়ে stage ও commit করেন, একটি স্ন্যাপশট বানান যা শুধু আপনার মেশিনে থাকে।'),
          l('You connect the local repository to a GitHub repository by adding a remote (usually named origin).', 'আপনি একটি remote (সাধারণত origin নামে) যোগ করে লোকাল রিপোজিটরিকে একটি গিটহাব রিপোজিটরির সঙ্গে যুক্ত করেন।'),
          l('You push, which uploads your commits to GitHub so they are backed up and visible to others.', 'আপনি push করেন, যা আপনার commit গিটহাবে তোলে যাতে তা ব্যাকআপ হয় ও অন্যদের কাছে দৃশ্যমান হয়।'),
          l('Teammates pull those commits down, work, and push their own — and the cycle repeats.', 'টিমমেটরা সেই commit pull করে নামায়, কাজ করে ও নিজেদেরটা push করে—চক্র চলতে থাকে।'),
        ] },
        { code: `# Git lives on your computer and works fully offline
git --version                 # git version 2.43.0
git init                      # start tracking a project
git add .                     # stage your files
git commit -m "First commit"  # save a snapshot locally

# GitHub is the online host — publish your local repo to it
git remote add origin https://github.com/you/project.git
git push -u origin main       # now your commits also live on GitHub`, caption: l('Everything above the blank line is pure Git and needs no internet. Only remote and push involve GitHub.', 'ফাঁকা লাইনের ওপরের সব বিশুদ্ধ গিট ও এতে ইন্টারনেট লাগে না। শুধু remote ও push গিটহাবের সঙ্গে জড়িত।') },
      ],
    },
    {
      h: l('When and where to use each', 'কখন ও কোথায় কোনটি ব্যবহার করবেন'),
      blocks: [
        { p: l('Use Git locally all the time — from your very first line of code, even for a throwaway experiment nobody else will see. It costs nothing, works offline, and gives you a safety net of checkpoints you can return to. Reach for GitHub the moment you want to back your work up, share it, or collaborate: to protect against a dead hard drive, to show your code to others, to review changes as a team, or to run automated tests on every push.', 'গিট লোকালি সবসময় ব্যবহার করুন—আপনার একদম প্রথম লাইন কোড থেকেই, এমনকি এমন ফেলে-দেওয়া পরীক্ষাতেও যা আর কেউ দেখবে না। এতে কোনো খরচ নেই, অফলাইনে চলে, এবং চেকপয়েন্টের একটি সেফটি-নেট দেয় যেখানে আপনি ফিরতে পারেন। কাজ ব্যাকআপ, শেয়ার বা সহযোগিতা করতে চাইলেই গিটহাব নিন: নষ্ট হার্ড ড্রাইভ থেকে রক্ষা পেতে, অন্যদের কোড দেখাতে, টিম হিসেবে পরিবর্তন রিভিউ করতে, বা প্রতিটি push-এ স্বয়ংক্রিয় টেস্ট চালাতে।') },
        { list: [
          l('Solo project on a plane with no wifi → Git alone is enough; commit freely, push later.', 'উড়োজাহাজে wifi ছাড়া একক প্রকল্প → শুধু গিটই যথেষ্ট; স্বাধীনভাবে commit করুন, পরে push করুন।'),
          l('You want a backup of your code that survives a broken laptop → push to GitHub.', 'ভাঙা ল্যাপটপেও টিকে থাকা কোডের ব্যাকআপ চান → গিটহাবে push করুন।'),
          l('Two people editing the same project → GitHub, so both can pull and push shared history.', 'দুজন একই প্রকল্প এডিট করছেন → গিটহাব, যাতে দুজনেই শেয়ার্ড ইতিহাস pull ও push করতে পারে।'),
          l('You need code review, issue tracking, or CI on every change → GitHub features, not Git itself.', 'প্রতি পরিবর্তনে কোড রিভিউ, issue ট্র্যাকিং বা CI দরকার → গিটহাব ফিচার, গিট নিজে নয়।'),
        ] },
      ],
    },
    {
      h: l('Common mistakes', 'সাধারণ ভুল'),
      blocks: [
        { list: [
          l('Thinking Git and GitHub are the same thing, then being confused when Git works offline or when another host like GitLab appears.', 'গিট ও গিটহাবকে এক ভাবা, তারপর গিট অফলাইনে চললে বা GitLab-এর মতো অন্য হোস্ট এলে বিভ্রান্ত হওয়া।'),
          l('Believing your work is safe as soon as you commit. A commit is only on your disk; a lost or reformatted machine takes it with it unless you have pushed.', 'commit করলেই কাজ নিরাপদ ভাবা। commit শুধু আপনার ডিস্কে থাকে; push না করলে হারানো বা রিফরম্যাট করা মেশিন তা সঙ্গে নিয়ে যায়।'),
          l('Waiting days to push, so a whole session of work exists in exactly one place — your laptop.', 'দিনের পর দিন push না করা, ফলে পুরো একটি সেশনের কাজ ঠিক একটিমাত্র জায়গায় থাকে—আপনার ল্যাপটপ।'),
          l('Assuming git commit updates GitHub. It does not — commits stay local until you explicitly push them.', 'ধরে নেওয়া git commit গিটহাব আপডেট করে। করে না—স্পষ্টভাবে push না করা পর্যন্ত commit লোকালই থাকে।'),
        ] },
      ],
    },
    {
      h: l('Remember in one line', 'এক লাইনে মনে রাখুন'),
      blocks: [
        { list: [
          l('Git = the version control engine on your computer; GitHub = a cloud host that adds backup and collaboration.', 'গিট = আপনার কম্পিউটারে ভার্সন কন্ট্রোল ইঞ্জিন; গিটহাব = একটি ক্লাউড হোস্ট যা ব্যাকআপ ও সহযোগিতা যোগ করে।'),
          l('Git works fully offline and is required; GitHub is optional but is where reviews, issues, and CI live.', 'গিট পুরোপুরি অফলাইনে চলে ও আবশ্যক; গিটহাব ঐচ্ছিক তবে রিভিউ, issue ও CI সেখানেই থাকে।'),
          l('Committed is not the same as safe — your work is only backed up once you push.', 'committed মানেই নিরাপদ নয়—push করার পরেই কাজ ব্যাকআপ হয়।'),
        ] },
      ],
    },
  ],

  // ── git-install-config · Install & configure Git ──────────────────────────
  'git-install-config': [
    {
      h: l('What is Git configuration?', 'গিট কনফিগারেশন কী?'),
      blocks: [
        { p: l('Once Git is installed, it needs to know a few things about you before it can work well — chiefly, who you are. Every commit you create is permanently stamped with an author name and email address, so before your first commit you set those once with git config. This is a one-time setup per computer, not something you repeat for every project. Configuration also lets you set sensible defaults, like naming the first branch main instead of the older master.', 'গিট ইনস্টল হয়ে গেলে ভালোভাবে কাজ করার আগে এটিকে আপনার সম্পর্কে কয়েকটি জিনিস জানতে হয়—প্রধানত, আপনি কে। আপনার তৈরি প্রতিটি commit-এ স্থায়ীভাবে একটি author নাম ও ইমেইল বসে, তাই প্রথম commit-এর আগে git config দিয়ে একবার সেগুলো সেট করুন। এটি প্রতি কম্পিউটারে একবারের সেটআপ, প্রতিটি প্রকল্পে বারবার করার কিছু নয়। কনফিগারেশন যুক্তিসঙ্গত ডিফল্টও সেট করতে দেয়, যেমন প্রথম branch-কে পুরনো master-এর বদলে main নাম দেওয়া।') },
        { p: l('The problem this solves is attribution and trust. When you and three teammates all push to the same repository, Git and GitHub use the email on each commit to decide who wrote it. Set the wrong email — or none at all — and your commits are credited to a stranger or to nobody, and GitHub cannot link the green squares on your profile to your work. Getting this right at the start saves a painful cleanup later.', 'এটি যে সমস্যা সমাধান করে তা হলো কৃতিত্ব ও বিশ্বাস। আপনি ও তিনজন টিমমেট একই রিপোজিটরিতে push করলে, গিট ও গিটহাব প্রতিটি commit-এর ইমেইল দেখে ঠিক করে কে লিখেছে। ভুল ইমেইল—বা কোনোটিই না—দিলে আপনার commit অচেনা কারো বা কারোরই নামে জমা হয়, এবং গিটহাব আপনার প্রোফাইলের সবুজ ঘরগুলো আপনার কাজের সঙ্গে যুক্ত করতে পারে না। শুরুতেই এটি ঠিক করলে পরে কষ্টকর পরিষ্কার এড়ানো যায়।') },
        { p: l('It helps to know that git config does not do anything magical: it just writes plain text lines into a config file, and every Git command reads that file when it runs. There are three levels — system (the whole machine), global (your user account), and local (one repository) — and Git checks them from most specific to least, so a local value overrides a global one, which overrides a system one. When you understand it as a stack of simple text files, config stops feeling mysterious and becomes something you can inspect and fix by hand.', 'জানা ভালো যে git config জাদুকরি কিছু করে না: এটি শুধু একটি config ফাইলে সাধারণ টেক্সট লাইন লেখে, আর প্রতিটি গিট কমান্ড চলার সময় সেই ফাইল পড়ে। তিনটি স্তর আছে—system (পুরো মেশিন), global (আপনার user অ্যাকাউন্ট), ও local (একটি রিপোজিটরি)—আর গিট এদের সবচেয়ে-নির্দিষ্ট থেকে সবচেয়ে-সাধারণ ক্রমে দেখে, তাই local মান global-কে override করে, যা system-কে override করে। এটিকে সরল টেক্সট ফাইলের একটি স্তূপ হিসেবে বুঝলে config আর রহস্যময় লাগে না, বরং হাতে দেখা ও ঠিক করার মতো জিনিস হয়।') },
        { note: l('Setting your name and email is like signing the inside cover of every book before you start writing. From then on, your identity travels automatically with every page — every commit — you produce.', 'নাম ও ইমেইল সেট করা লেখা শুরুর আগে প্রতিটি বইয়ের ভেতরের মলাটে সই করার মতো। এরপর থেকে আপনার পরিচয় স্বয়ংক্রিয়ভাবে আপনার তৈরি প্রতিটি পৃষ্ঠার—প্রতিটি commit-এর—সঙ্গে যায়।'), kind: 'tip' },
      ],
    },
    {
      h: l('How to configure Git after installing', 'ইনস্টলের পর গিট কীভাবে কনফিগার করবেন'),
      blocks: [
        { steps: [
          l('Confirm Git installed correctly by checking its version.', 'ভার্সন দেখে নিশ্চিত করুন গিট ঠিকভাবে ইনস্টল হয়েছে।'),
          l('Set your name globally so it is stamped on commits in every repository on this machine.', 'নাম গ্লোবালি সেট করুন যাতে এই মেশিনের প্রতিটি রিপোজিটরির commit-এ তা বসে।'),
          l('Set your email — use the same address as your GitHub account so commits link to your profile.', 'ইমেইল সেট করুন—গিটহাব অ্যাকাউন্টের একই ঠিকানা দিন যাতে commit আপনার প্রোফাইলে যুক্ত হয়।'),
          l('Set the default branch name to main so new repositories start there.', 'ডিফল্ট branch নাম main সেট করুন যাতে নতুন রিপোজিটরি সেখানে শুরু হয়।'),
          l('List your settings to verify everything is correct and to see which file each value came from.', 'সেটিং তালিকা করে যাচাই করুন সব ঠিক আছে ও প্রতিটি মান কোন ফাইল থেকে এসেছে দেখুন।'),
        ] },
        { code: `# 1. Check Git is installed and see its version
git --version

# 2. Set your identity — stamped on every commit you make
git config --global user.name "Ada Lovelace"
git config --global user.email "ada@example.com"

# 3. Make new repositories start on 'main'
git config --global init.defaultBranch main

# 4. Verify what is set, and which file each value lives in
git config --list --show-origin`, caption: l('The --global flag writes to your user config (~/.gitconfig), so these settings apply to every repo on the machine.', '--global ফ্ল্যাগ আপনার user config (~/.gitconfig)-এ লেখে, তাই এই সেটিং মেশিনের প্রতিটি রিপোতে প্রযোজ্য।') },
      ],
    },
    {
      h: l('Key configuration commands', 'মূল কনফিগারেশন কমান্ড'),
      blocks: [
        { table: {
          head: [l('Goal', 'লক্ষ্য'), l('Command', 'কমান্ড')],
          rows: [
            [l('Set your name', 'নাম সেট করুন'), l('git config --global user.name "…"', 'git config --global user.name "…"')],
            [l('Set your email', 'ইমেইল সেট করুন'), l('git config --global user.email "…"', 'git config --global user.email "…"')],
            [l('Default branch name', 'ডিফল্ট branch নাম'), l('git config --global init.defaultBranch main', 'git config --global init.defaultBranch main')],
            [l('List all settings', 'সব সেটিং দেখুন'), l('git config --list --show-origin', 'git config --list --show-origin')],
          ],
        } },
      ],
    },
    {
      h: l('Global vs local config — where settings live', 'গ্লোবাল বনাম লোকাল কনফিগ—সেটিং কোথায় থাকে'),
      blocks: [
        { p: l('Git reads configuration from several files, and a more specific one overrides a more general one. The two you will touch most are global (your user account, applied everywhere) and local (a single repository, applied only there). You normally set your identity globally, then override it locally in the rare repo that needs a different name or email — for example a work project that must use your company address instead of your personal one.', 'গিট কয়েকটি ফাইল থেকে কনফিগারেশন পড়ে, এবং বেশি-নির্দিষ্টটি বেশি-সাধারণটিকে override করে। যে দুটি আপনি সবচেয়ে বেশি নাড়বেন তা হলো global (আপনার user অ্যাকাউন্ট, সর্বত্র প্রযোজ্য) ও local (একটি রিপোজিটরি, শুধু সেখানে প্রযোজ্য)। সাধারণত পরিচয় গ্লোবালি সেট করেন, তারপর যে বিরল রিপোতে আলাদা নাম বা ইমেইল লাগে সেখানে লোকালি override করেন—যেমন এমন একটি কর্ম-প্রকল্প যাকে ব্যক্তিগত ঠিকানার বদলে কোম্পানির ঠিকানা ব্যবহার করতে হয়।') },
        { table: {
          head: [l('Scope', 'পরিসর'), l('Flag', 'ফ্ল্যাগ'), l('Applies to', 'প্রযোজ্য')],
          rows: [
            [l('Global', 'গ্লোবাল'), l('--global', '--global'), l('Every repository for your user account', 'আপনার user অ্যাকাউন্টের প্রতিটি রিপোজিটরি')],
            [l('Local', 'লোকাল'), l('--local (the default inside a repo)', '--local (রিপোর ভেতরে ডিফল্ট)'), l('Only the current repository', 'শুধু বর্তমান রিপোজিটরি')],
          ],
        } },
        { note: l('To use a different identity for one project, run the same command without --global from inside that repo: git config user.email "work@company.com". The local value quietly wins there.', 'একটি প্রকল্পে আলাদা পরিচয় ব্যবহার করতে, সেই রিপোর ভেতর থেকে --global ছাড়া একই কমান্ড চালান: git config user.email "work@company.com"। লোকাল মানটি সেখানে নীরবে জেতে।'), kind: 'tip' },
      ],
    },
    {
      h: l('When and where to configure', 'কখন ও কোথায় কনফিগার করবেন'),
      blocks: [
        { p: l('Do the global setup once, right after installing Git on a new computer, before you make your first commit. That single step covers every project you will ever create on that machine. Come back to local config only for the exception: a specific repository that needs a different identity, or one that needs a project-specific setting a teammate expects. If you ever notice your GitHub contribution graph is empty despite lots of commits, the cause is almost always a mismatched email — fix it in config and future commits will link correctly.', 'নতুন কম্পিউটারে গিট ইনস্টলের ঠিক পরে, প্রথম commit-এর আগে গ্লোবাল সেটআপ একবার করুন। সেই একটি ধাপ সেই মেশিনে আপনার তৈরি করা প্রতিটি প্রকল্প ঢেকে ফেলে। লোকাল কনফিগে ফিরুন শুধু ব্যতিক্রমের জন্য: এমন একটি নির্দিষ্ট রিপোজিটরি যার আলাদা পরিচয় লাগে, বা এমন একটি যার প্রকল্প-নির্দিষ্ট সেটিং টিমমেট আশা করে। অনেক commit সত্ত্বেও গিটহাব কন্ট্রিবিউশন গ্রাফ খালি দেখলে, কারণ প্রায় সবসময় একটি অমিল ইমেইল—config-এ ঠিক করুন, ভবিষ্যতের commit ঠিকভাবে যুক্ত হবে।') },
        { p: l('Beyond name and email, a few more global settings are worth doing on day one because they smooth over everyday friction. Setting core.editor picks which editor opens for commit messages, so you are not stranded in an unfamiliar one. On Windows, core.autocrlf handles line-ending differences so files do not show up as changed for no reason. And aliases let you shorten commands you type constantly. None of these are required, but each removes a small daily annoyance once and for all.', 'নাম ও ইমেইলের বাইরে, আরও কয়েকটি গ্লোবাল সেটিং প্রথম দিনেই করা মূল্যবান কারণ এগুলো প্রতিদিনের ঝামেলা মসৃণ করে। core.editor সেট করলে commit মেসেজের জন্য কোন এডিটর খোলে তা ঠিক হয়, তাই অচেনা এডিটরে আটকে যান না। Windows-এ core.autocrlf line-ending পার্থক্য সামলায় যাতে ফাইল অকারণে বদলানো না দেখায়। আর alias আপনার বারবার টাইপ করা কমান্ড ছোট করে। এগুলোর কোনোটিই আবশ্যক নয়, তবে প্রতিটি একটি ছোট দৈনন্দিন বিরক্তি একবারেই দূর করে।') },
        { code: `# A few quality-of-life global settings (optional but handy)
git config --global core.editor "code --wait"   # use VS Code for messages
git config --global core.autocrlf input          # sane line endings (macOS/Linux)
git config --global alias.st status              # now 'git st' means 'git status'
git config --global alias.lg "log --oneline --graph --all"`, caption: l('Aliases and editor/line-ending settings are one-time conveniences that pay off on every commit afterwards.', 'alias এবং editor/line-ending সেটিং একবারের সুবিধা যা এরপর প্রতিটি commit-এ কাজে লাগে।') },
      ],
    },
    {
      h: l('Common mistakes', 'সাধারণ ভুল'),
      blocks: [
        { list: [
          l('Committing for weeks or months with a wrong or missing email, so GitHub never links those commits to you — and the fix requires rewriting history, which is painful.', 'সপ্তাহ বা মাস ধরে ভুল বা অনুপস্থিত ইমেইলে commit করা, ফলে গিটহাব সেই commit কখনো আপনার সঙ্গে যুক্ত করে না—আর সংশোধনে ইতিহাস বদলাতে হয়, যা কষ্টকর।'),
          l('Forgetting the --global flag, so your carefully typed name and email apply to only one repository instead of all of them.', '--global ফ্ল্যাগ ভুলে যাওয়া, ফলে যত্নে টাইপ করা নাম ও ইমেইল সব রিপোর বদলে শুধু একটিতে প্রযোজ্য হয়।'),
          l('Using a fake or placeholder email; some hosts reject it, and you lose the link between your commits and your account.', 'নকল বা প্লেসহোল্ডার ইমেইল ব্যবহার করা; কিছু হোস্ট তা প্রত্যাখ্যান করে, আর আপনি commit ও অ্যাকাউন্টের মধ্যে সংযোগ হারান।'),
          l('Assuming config must be repeated per project — it does not; global settings already cover every new repo.', 'ধরে নেওয়া প্রতি প্রকল্পে config আবার করতে হবে—হয় না; গ্লোবাল সেটিং আগেই প্রতিটি নতুন রিপো ঢাকে।'),
        ] },
      ],
    },
    {
      h: l('Remember in one line', 'এক লাইনে মনে রাখুন'),
      blocks: [
        { list: [
          l('After installing Git, set user.name and user.email once with --global before your first commit.', 'গিট ইনস্টলের পর প্রথম commit-এর আগে --global দিয়ে user.name ও user.email একবার সেট করুন।'),
          l('Use the same email as your GitHub account so commits are credited to you.', 'গিটহাব অ্যাকাউন্টের একই ইমেইল দিন যাতে commit আপনার নামে যায়।'),
          l('Global config applies everywhere; drop --global inside a repo when one project needs a different identity.', 'গ্লোবাল কনফিগ সর্বত্র প্রযোজ্য; কোনো প্রকল্পে আলাদা পরিচয় লাগলে রিপোর ভেতরে --global বাদ দিন।'),
        ] },
      ],
    },
  ],

  // ── git-three-areas · Working, staging, repository ────────────────────────
  'git-three-areas': [
    {
      h: l('What are the three areas?', 'তিন এলাকা কী?'),
      blocks: [
        { p: l('In Git, every tracked file exists in one of three areas, and understanding them is the single most important mental model in the whole tool. The working directory is the folder you actually edit — the real files on disk. The staging area (also called the index) is a holding zone where you gather exactly the changes you want in your next snapshot. The repository is the permanent history of committed snapshots, stored in the hidden .git folder. A change moves working directory → staging area → repository as you go.', 'গিটে প্রতিটি ট্র্যাক করা ফাইল তিন এলাকার একটিতে থাকে, এবং এগুলো বোঝা পুরো টুলটির সবচেয়ে গুরুত্বপূর্ণ মানসিক মডেল। working directory হলো আপনি যে ফোল্ডার আসলে এডিট করেন—ডিস্কের আসল ফাইল। staging area (index-ও বলে) হলো একটি জমা-করার এলাকা যেখানে আপনার পরের স্ন্যাপশটে ঠিক যে পরিবর্তন চান তা জড়ো করেন। repository হলো commit করা স্ন্যাপশটের স্থায়ী ইতিহাস, লুকানো .git ফোল্ডারে রাখা। কাজের সঙ্গে একটি পরিবর্তন working directory → staging area → repository ক্রমে যায়।') },
        { p: l('The problem this three-step design solves is control over what goes into each commit. Without a staging area you would have to commit either everything or nothing. The staging area lets you edit ten files but commit only the three that belong together, leaving the rest for a separate, cleaner commit. That extra room is what turns a messy afternoon of edits into a tidy, readable history.', 'এই তিন-ধাপ নকশা যে সমস্যা সমাধান করে তা হলো প্রতিটি commit-এ কী যাবে তার নিয়ন্ত্রণ। staging area ছাড়া হয় সবকিছু নয়তো কিছুই commit করতে হতো। staging area দশটি ফাইল এডিট করে শুধু একসঙ্গে যাওয়া তিনটি commit করতে দেয়, বাকিগুলো আলাদা, পরিষ্কার commit-এর জন্য রেখে। সেই বাড়তি জায়গাই এডিটে ভরা এলোমেলো বিকেলকে একটি পরিপাটি, পাঠযোগ্য ইতিহাসে বদলে দেয়।') },
        { note: l('Picture a supermarket. The shelves are your working directory (everything available to change). The trolley is the staging area — you place into it only the items you actually want. Checkout, where the receipt is printed, is the commit: a permanent record of exactly what was in the trolley.', 'একটি সুপারমার্কেট ভাবুন। তাক হলো আপনার working directory (বদলানোর জন্য সব উপলব্ধ)। ট্রলি হলো staging area—শুধু যা সত্যিই চান তা তাতে রাখেন। checkout, যেখানে রসিদ ছাপা হয়, তা হলো commit: ট্রলিতে ঠিক কী ছিল তার স্থায়ী রেকর্ড।'), kind: 'tip' },
      ],
    },
    {
      h: l('How a change moves through the areas', 'একটি পরিবর্তন এলাকাগুলোর মধ্য দিয়ে কীভাবে যায়'),
      blocks: [
        { steps: [
          l('You edit or create a file. It now differs from the last commit and shows up as modified or untracked in the working directory.', 'আপনি একটি ফাইল এডিট বা তৈরি করেন। এটি এখন শেষ commit থেকে আলাদা ও working directory-তে modified বা untracked দেখায়।'),
          l('You run git add on the changes you want to include. They move into the staging area, ready for the next commit.', 'যেগুলো রাখতে চান সেগুলোতে git add চালান। সেগুলো staging area-তে যায়, পরের commit-এর জন্য প্রস্তুত।'),
          l('You run git commit. Everything staged is written to the repository as one snapshot with a message, and the staging area clears.', 'git commit চালান। staged সব একটি মেসেজসহ এক স্ন্যাপশট হিসেবে repository-তে লেখা হয়, আর staging area খালি হয়।'),
          l('Anything you edited but did not stage stays in the working directory, untouched — it simply was not part of this commit.', 'যা এডিট করেছেন কিন্তু stage করেননি তা working directory-তে অক্ষত থাকে—এটি শুধু এই commit-এর অংশ ছিল না।'),
        ] },
        { code: `# 1. Working directory — create and edit a file
echo "hello" > app.txt
git status          # app.txt appears as "Untracked"

# 2. Staging area — prepare exactly what to include
git add app.txt
git status          # now app.txt is "Changes to be committed"

# 3. Repository — record the staged snapshot permanently
git commit -m "add app.txt"
git status          # "nothing to commit, working tree clean"`, caption: l('git status is your map: it always tells you which area each file is currently in.', 'git status আপনার মানচিত্র: এটি সবসময় বলে প্রতিটি ফাইল এই মুহূর্তে কোন এলাকায় আছে।') },
      ],
    },
    {
      h: l('Key commands', 'মূল কমান্ড'),
      blocks: [
        { table: {
          head: [l('Goal', 'লক্ষ্য'), l('Command', 'কমান্ড')],
          rows: [
            [l('Stage a file', 'ফাইল স্টেজ করুন'), l('git add <file>', 'git add <file>')],
            [l('Unstage a file', 'ফাইল আনস্টেজ করুন'), l('git restore --staged <file>', 'git restore --staged <file>')],
            [l('See the three states', 'তিন অবস্থা দেখুন'), l('git status', 'git status')],
          ],
        } },
        { note: l('git restore --staged <file> is the exact reverse of git add: it moves a change from the staging area back to the working directory, without deleting your edits.', 'git restore --staged <file> git add-এর ঠিক উল্টো: এটি একটি পরিবর্তন staging area থেকে আবার working directory-তে নেয়, আপনার এডিট না মুছে।'), kind: 'tip' },
      ],
    },
    {
      h: l('Reading the areas in git status', 'git status-এ এলাকা পড়া'),
      blocks: [
        { p: l('Because files live in different areas, git status groups them under different headings. Learning to read those headings tells you at a glance what will and will not be captured by your next commit.', 'ফাইল ভিন্ন এলাকায় থাকে বলে git status এদের ভিন্ন শিরোনামে সাজায়। সেই শিরোনাম পড়া শিখলে এক নজরে বুঝবেন পরের commit কী ধরবে ও কী ধরবে না।') },
        { table: {
          head: [l('git status says', 'git status বলে'), l('Which area', 'কোন এলাকা'), l('Meaning', 'অর্থ')],
          rows: [
            [l('Untracked files', 'Untracked files'), l('Working directory', 'Working directory'), l('New file Git has never seen; not staged yet.', 'নতুন ফাইল গিট কখনো দেখেনি; এখনো stage হয়নি।')],
            [l('Changes not staged for commit', 'Changes not staged for commit'), l('Working directory', 'Working directory'), l('An edited tracked file you have not yet added.', 'একটি এডিট করা ট্র্যাকড ফাইল যা এখনো add করেননি।')],
            [l('Changes to be committed', 'Changes to be committed'), l('Staging area', 'Staging area'), l('Staged and ready; the next commit will include it.', 'staged ও প্রস্তুত; পরের commit এটি ধরবে।')],
            [l('nothing to commit, working tree clean', 'nothing to commit, working tree clean'), l('Repository', 'Repository'), l('Everything is committed; no pending changes.', 'সব commit হয়ে গেছে; কোনো বাকি পরিবর্তন নেই।')],
          ],
        } },
      ],
    },
    {
      h: l('When and where this matters', 'কখন ও কোথায় এটি গুরুত্বপূর্ণ'),
      blocks: [
        { p: l('The three-area model matters every single time you commit, but it earns its keep when your working directory is messy. Say you fixed a bug and also, in the same session, started an unrelated experiment. You want the bug fix in its own clean commit and the experiment kept separate. The staging area makes this trivial: git add only the bug-fix files, commit, and the experiment stays untouched in the working directory for later. Reviewers and your future self will thank you for commits that each do exactly one thing.', 'তিন-এলাকা মডেল প্রতিবার commit করার সময়ই গুরুত্বপূর্ণ, তবে working directory এলোমেলো হলে এটি সত্যিকার কাজে আসে। ধরুন আপনি একটি বাগ ঠিক করেছেন এবং একই সেশনে একটি অসম্পর্কিত পরীক্ষাও শুরু করেছেন। আপনি বাগ ফিক্সটি তার নিজের পরিষ্কার commit-এ চান আর পরীক্ষাটি আলাদা রাখতে চান। staging area এটি সহজ করে: শুধু বাগ-ফিক্স ফাইলগুলো git add করে commit করুন, আর পরীক্ষাটি পরের জন্য working directory-তে অক্ষত থাকে। প্রতিটি ঠিক একটি কাজ করা commit-এর জন্য রিভিউয়ার ও ভবিষ্যতের আপনি কৃতজ্ঞ থাকবে।') },
        { p: l('This same model also explains a moment that confuses almost every beginner: you stage a file, then edit it again, and git status now lists the file twice — once under "Changes to be committed" and once under "Changes not staged for commit." That is not a bug. Staging captured the file as it was at the moment you ran git add; the newer edit lives only in the working directory until you add it again. Once you see the file as living in two areas at once, the double listing makes perfect sense.', 'এই মডেল সেই মুহূর্তটিও ব্যাখ্যা করে যা প্রায় প্রতিটি নতুনকে বিভ্রান্ত করে: আপনি একটি ফাইল stage করেন, তারপর আবার এডিট করেন, আর git status এখন ফাইলটি দুবার দেখায়—একবার "Changes to be committed"-এ ও একবার "Changes not staged for commit"-এ। এটি বাগ নয়। git add চালানোর মুহূর্তে ফাইলটি যেমন ছিল staging তা ধরেছে; নতুন এডিটটি আবার add না করা পর্যন্ত শুধু working directory-তে থাকে। ফাইলটিকে একসঙ্গে দুটি এলাকায় থাকা হিসেবে দেখলে দ্বিগুণ তালিকা পুরোপুরি অর্থবহ হয়।') },
      ],
    },
    {
      h: l('Common mistakes', 'সাধারণ ভুল'),
      blocks: [
        { list: [
          l('Running git add . blindly and committing files you never meant to include — secrets like .env, build output, or huge node_modules folders. Always glance at git status first.', 'অন্ধভাবে git add . চালিয়ে এমন ফাইল commit করা যা রাখার কথা ছিল না—.env-এর মতো সিক্রেট, বিল্ড আউটপুট বা বিশাল node_modules ফোল্ডার। সবসময় আগে git status দেখুন।'),
          l('Forgetting that git add takes a snapshot at that moment. If you edit a file again after staging it, you must git add it once more or the newer edit is left out of the commit.', 'ভুলে যাওয়া যে git add সেই মুহূর্তের স্ন্যাপশট নেয়। stage করার পর ফাইল আবার এডিট করলে আবার git add করতে হবে, নইলে নতুন এডিট commit থেকে বাদ পড়ে।'),
          l('Thinking a commit saves your whole working directory. It saves only what is staged; unstaged edits are simply not recorded.', 'ধরে নেওয়া commit পুরো working directory সেভ করে। এটি শুধু staged অংশ সেভ করে; unstaged এডিট রেকর্ডই হয় না।'),
          l('Confusing "committed" with "clean." A file can be committed and still have newer unstaged edits sitting in the working directory.', '"committed" ও "clean" গুলিয়ে ফেলা। একটি ফাইল commit হতে পারে অথচ working directory-তে তার নতুন unstaged এডিট থাকতে পারে।'),
        ] },
      ],
    },
    {
      h: l('Remember in one line', 'এক লাইনে মনে রাখুন'),
      blocks: [
        { list: [
          l('Three areas: working directory (you edit) → staging area (you prepare) → repository (you commit).', 'তিন এলাকা: working directory (এডিট করেন) → staging area (প্রস্তুত করেন) → repository (commit করেন)।'),
          l('git add moves changes into staging; git commit records exactly what is staged.', 'git add পরিবর্তন staging-এ নেয়; git commit ঠিক যা staged তা রেকর্ড করে।'),
          l('The staging area is a feature, not a chore — it lets you build clean, focused commits from a messy working directory.', 'staging area একটি সুবিধা, বোঝা নয়—এটি এলোমেলো working directory থেকে পরিষ্কার, নির্দিষ্ট commit বানাতে দেয়।'),
        ] },
      ],
    },
  ],

  // ── git-init-clone · Create or clone a repository ─────────────────────────
  'git-init-clone': [
    {
      h: l('What are init and clone?', 'init ও clone কী?'),
      blocks: [
        { p: l('There are exactly two ways to get a Git repository onto your machine, and every project you ever start begins with one of them. git init turns an ordinary folder into a brand-new, empty repository — it creates the hidden .git directory that holds all the history, starting from nothing. git clone does the opposite: it copies an existing repository, usually from GitHub, down to your computer, bringing every commit, branch, and file of its full history with it.', 'আপনার মেশিনে একটি গিট রিপোজিটরি আনার ঠিক দুটি উপায় আছে, এবং আপনি যত প্রকল্প শুরু করবেন প্রতিটি এদের একটি দিয়ে শুরু হয়। git init একটি সাধারণ ফোল্ডারকে একদম নতুন, খালি রিপোজিটরিতে পরিণত করে—এটি লুকানো .git ডিরেক্টরি বানায় যা সব ইতিহাস ধরে, শূন্য থেকে শুরু করে। git clone উল্টোটা করে: এটি একটি বিদ্যমান রিপোজিটরি, সাধারণত গিটহাব থেকে, আপনার কম্পিউটারে কপি করে, তার পূর্ণ ইতিহাসের প্রতিটি commit, branch ও ফাইল সঙ্গে এনে।') },
        { p: l('The problem these two commands solve is simply "how do I begin?" You use init when the project is yours and does not exist anywhere yet — a fresh idea on an empty folder. You use clone when the project already exists remotely and you want your own working copy — joining a team, contributing to open source, or setting up an existing app on a new laptop. Choosing the wrong one is a common beginner stumble that leads to confusing setups.', 'এই দুটি কমান্ড যে সমস্যা সমাধান করে তা সহজভাবে "আমি কীভাবে শুরু করব?" প্রকল্প আপনার ও এখনো কোথাও নেই—খালি ফোল্ডারে একটি তাজা ধারণা—তখন init নিন। প্রকল্প আগে থেকেই রিমোটে আছে ও আপনি নিজের ওয়ার্কিং কপি চান—টিমে যোগ দেওয়া, ওপেন সোর্সে অবদান, বা নতুন ল্যাপটপে বিদ্যমান অ্যাপ সেটআপ—তখন clone নিন। ভুলটি বাছা নতুনদের একটি সাধারণ হোঁচট যা বিভ্রান্তিকর সেটআপে নিয়ে যায়।') },
        { note: l('git init starts a blank notebook — clean pages, nothing written yet. git clone photocopies an existing notebook cover to cover, so you get every page of its history the moment you open it.', 'git init একটি ফাঁকা খাতা শুরু করে—পরিষ্কার পৃষ্ঠা, এখনো কিছু লেখা নেই। git clone একটি বিদ্যমান খাতা মলাট-থেকে-মলাট ফটোকপি করে, তাই খোলার সঙ্গে সঙ্গে তার ইতিহাসের প্রতিটি পৃষ্ঠা পান।'), kind: 'tip' },
      ],
    },
    {
      h: l('How init and clone work', 'init ও clone কীভাবে কাজ করে'),
      blocks: [
        { steps: [
          l('For a new project: make (or enter) a folder, run git init, and Git creates a .git directory — the folder is now a repository with no commits yet.', 'নতুন প্রকল্পের জন্য: একটি ফোল্ডার বানান (বা ঢুকুন), git init চালান, গিট একটি .git ডিরেক্টরি বানায়—ফোল্ডারটি এখন একটি রিপোজিটরি, এখনো কোনো commit নেই।'),
          l('You then add files, stage, and make your first commit to begin the history yourself.', 'তারপর ফাইল যোগ করে, stage করে, প্রথম commit করে নিজেই ইতিহাস শুরু করেন।'),
          l('For an existing project: copy the repository URL from GitHub and run git clone <url>.', 'বিদ্যমান প্রকল্পের জন্য: গিটহাব থেকে রিপোজিটরি URL কপি করে git clone <url> চালান।'),
          l('Git downloads the whole repository into a new folder, checks out the default branch, and automatically sets up origin pointing back to where you cloned from.', 'গিট পুরো রিপোজিটরি একটি নতুন ফোল্ডারে নামায়, ডিফল্ট branch checkout করে, এবং স্বয়ংক্রিয়ভাবে origin সেট করে যা আপনি যেখান থেকে clone করেছেন সেখানে নির্দেশ করে।'),
          l('You can start working immediately — the full history is already local and pushing back is pre-wired.', 'আপনি সঙ্গে সঙ্গে কাজ শুরু করতে পারেন—পূর্ণ ইতিহাস আগেই লোকাল ও push করা আগে থেকেই যুক্ত।'),
        ] },
        { code: `# Start a brand-new repository from an empty folder
mkdir my-app && cd my-app
git init                       # creates the hidden .git/ folder
git status                     # "On branch main / No commits yet"

# Or copy an existing project from GitHub, full history included
git clone https://github.com/octocat/Hello-World.git
cd Hello-World
git log --oneline              # you already have every past commit
git remote -v                  # 'origin' is set up for you`, caption: l('init begins an empty history you fill; clone hands you a complete history plus a ready-made origin remote.', 'init একটি খালি ইতিহাস শুরু করে যা আপনি ভরেন; clone আপনাকে সম্পূর্ণ ইতিহাস ও প্রস্তুত origin remote দেয়।') },
      ],
    },
    {
      h: l('Key commands', 'মূল কমান্ড'),
      blocks: [
        { table: {
          head: [l('Goal', 'লক্ষ্য'), l('Command', 'কমান্ড')],
          rows: [
            [l('New repo here', 'এখানে নতুন রিপো'), l('git init', 'git init')],
            [l('Clone a remote', 'রিমোট ক্লোন'), l('git clone <url>', 'git clone <url>')],
            [l('Shallow clone', 'শ্যালো ক্লোন'), l('git clone --depth 1 <url>', 'git clone --depth 1 <url>')],
            [l('Clone one branch', 'এক branch ক্লোন'), l('git clone -b dev --single-branch <url>', 'git clone -b dev --single-branch <url>')],
          ],
        } },
        { note: l('A shallow clone (--depth 1) downloads only the latest commit, not the full history. It is fast and small — great for CI or a quick look — but drops the old history some operations (like git log far back or certain merges) rely on.', 'শ্যালো ক্লোন (--depth 1) শুধু সর্বশেষ commit নামায়, পূর্ণ ইতিহাস নয়। এটি দ্রুত ও ছোট—CI বা দ্রুত দেখার জন্য দারুণ—তবে পুরনো ইতিহাস বাদ দেয় যা কিছু অপারেশন (যেমন বহু পিছনের git log বা কিছু merge) নির্ভর করে।'), kind: 'tip' },
      ],
    },
    {
      h: l('init vs clone — which to use', 'init বনাম clone—কোনটি ব্যবহার করবেন'),
      blocks: [
        { table: {
          head: [l('Situation', 'পরিস্থিতি'), l('Use', 'ব্যবহার'), l('Why', 'কেন')],
          rows: [
            [l('Brand-new project, nothing online yet', 'একদম নতুন প্রকল্প, অনলাইনে কিছু নেই'), l('git init', 'git init'), l('Starts a fresh, empty history you own.', 'আপনার একটি তাজা, খালি ইতিহাস শুরু করে।')],
            [l('Joining a project that lives on GitHub', 'গিটহাবে থাকা প্রকল্পে যোগ দেওয়া'), l('git clone <url>', 'git clone <url>'), l('Copies all history and wires up origin for you.', 'সব ইতিহাস কপি করে ও আপনার জন্য origin যুক্ত করে।')],
            [l('CI job or one-off checkout, history not needed', 'CI job বা এককালীন checkout, ইতিহাস দরকার নেই'), l('git clone --depth 1 <url>', 'git clone --depth 1 <url>'), l('Faster and smaller by skipping old history.', 'পুরনো ইতিহাস বাদ দিয়ে দ্রুত ও ছোট।')],
            [l('You only need one branch of a big repo', 'বড় রিপোর শুধু একটি branch দরকার'), l('git clone -b <name> --single-branch', 'git clone -b <name> --single-branch'), l('Downloads just that branch, not all of them.', 'সব নয়, শুধু সেই branch নামায়।')],
          ],
        } },
      ],
    },
    {
      h: l('When and where to use each', 'কখন ও কোথায় কোনটি ব্যবহার করবেন'),
      blocks: [
        { p: l('Reach for git init at the very start of something new — a personal project, a fresh service, a coding exercise. You will typically init locally, make a few commits, then create an empty repository on GitHub and connect them with git remote add and git push. Reach for git clone whenever the code already exists somewhere: you are onboarding onto a team codebase, contributing to an open-source project, or simply setting up a project you already have on GitHub onto a second machine. Because clone sets up origin automatically, it is the smoother path when a remote already exists.', 'একদম নতুন কিছুর শুরুতে git init নিন—ব্যক্তিগত প্রকল্প, তাজা সার্ভিস, কোডিং অনুশীলন। সাধারণত লোকালি init করে, কয়েকটি commit করে, তারপর গিটহাবে একটি খালি রিপোজিটরি বানিয়ে git remote add ও git push দিয়ে যুক্ত করবেন। কোড আগে থেকেই কোথাও থাকলেই git clone নিন: একটি টিম কোডবেসে যোগ দিচ্ছেন, ওপেন-সোর্স প্রকল্পে অবদান রাখছেন, বা গিটহাবে থাকা প্রকল্প দ্বিতীয় মেশিনে সেটআপ করছেন। clone স্বয়ংক্রিয়ভাবে origin সেট করে বলে, remote আগে থেকে থাকলে এটিই মসৃণ পথ।') },
        { p: l('In practice, most beginners meet clone far more often than init, because the world is full of existing repositories to join and study. A useful habit when cloning something large is to think about depth: if you only want to read the current code or run a one-off build, a shallow clone saves time and disk; if you plan to explore history, bisect a bug, or work long-term, take the full clone. Either way, always run the clone command in the folder where you want the project to land — clone creates a new sub-folder named after the repository, so you do not need to make one first.', 'বাস্তবে, বেশিরভাগ নতুন init-এর চেয়ে clone অনেক বেশি দেখে, কারণ যোগ দেওয়া ও পড়ার মতো বিদ্যমান রিপোজিটরিতে পৃথিবী ভরা। বড় কিছু clone করার সময় একটি কাজের অভ্যাস হলো depth নিয়ে ভাবা: শুধু বর্তমান কোড পড়তে বা একবার build চালাতে চাইলে শ্যালো clone সময় ও ডিস্ক বাঁচায়; ইতিহাস ঘাঁটতে, বাগ bisect করতে বা দীর্ঘমেয়াদে কাজ করতে চাইলে পূর্ণ clone নিন। যেভাবেই হোক, প্রকল্পটি যেখানে নামাতে চান সেই ফোল্ডারে clone কমান্ড চালান—clone রিপোজিটরির নামে একটি নতুন সাব-ফোল্ডার বানায়, তাই আগে একটি বানানোর দরকার নেই।') },
      ],
    },
    {
      h: l('Common mistakes', 'সাধারণ ভুল'),
      blocks: [
        { list: [
          l('Running git init inside a folder you already cloned, creating a confusing repository nested inside another repository. If .git already exists, you do not need init.', 'ইতিমধ্যে clone করা ফোল্ডারের ভেতরে git init চালানো, একটি রিপোর ভেতরে আরেকটি রিপো বানিয়ে বিভ্রান্তি তৈরি। .git আগে থেকে থাকলে init লাগে না।'),
          l('Accidentally running git init in your home directory or Desktop, so Git starts trying to track thousands of unrelated files. Always init inside the specific project folder.', 'ভুলে home ডিরেক্টরি বা Desktop-এ git init চালানো, ফলে গিট হাজার হাজার অসম্পর্কিত ফাইল ট্র্যাক করার চেষ্টা করে। সবসময় নির্দিষ্ট প্রকল্প ফোল্ডারের ভেতরে init করুন।'),
          l('Doing a shallow clone (--depth 1) and later being surprised that history-dependent commands or deep git log fail — the old commits were never downloaded.', 'শ্যালো clone (--depth 1) করে পরে অবাক হওয়া যে ইতিহাস-নির্ভর কমান্ড বা গভীর git log ব্যর্থ হয়—পুরনো commit কখনো নামেইনি।'),
          l('Cloning over HTTPS when your account needs SSH or a token, then being unable to push. Match the clone URL to your authentication method.', 'অ্যাকাউন্টে SSH বা টোকেন লাগলেও HTTPS-এ clone করা, তারপর push করতে না পারা। clone URL আপনার অথেন্টিকেশন পদ্ধতির সঙ্গে মেলান।'),
        ] },
      ],
    },
    {
      h: l('Remember in one line', 'এক লাইনে মনে রাখুন'),
      blocks: [
        { list: [
          l('git init starts a new, empty repository in a folder; git clone copies an existing remote one, history and all.', 'git init একটি ফোল্ডারে নতুন, খালি রিপোজিটরি শুরু করে; git clone একটি বিদ্যমান রিমোট রিপো ইতিহাসসহ কপি করে।'),
          l('Use init for a brand-new project, clone <url> to start from a repo that already exists on GitHub.', 'নতুন প্রকল্পে init নিন, গিটহাবে আগে থেকে থাকা রিপো থেকে শুরু করতে clone <url>।'),
          l('Do not init inside an already-cloned repo, and remember a shallow clone trades away old history for speed.', 'ইতিমধ্যে clone করা রিপোর ভেতরে init করবেন না, আর মনে রাখুন শ্যালো clone গতির বিনিময়ে পুরনো ইতিহাস ছাড়ে।'),
        ] },
      ],
    },
  ],

  // ── git-staging-commit · Stage & commit changes ───────────────────────────
  'git-staging-commit': [
    {
      h: l('What is staging and committing?', 'স্টেজিং ও কমিটিং কী?'),
      blocks: [
        { p: l('Staging and committing are the two-step heartbeat of everyday Git — the loop you will run more than any other. git add moves your chosen changes from the working directory into the staging area, marking them as "part of the next snapshot." git commit then records everything staged as a permanent commit, together with a message explaining what changed and why. That message and the snapshot become a fixed point in your history that you can always return to, compare against, or share.', 'স্টেজিং ও কমিটিং হলো প্রতিদিনের গিটের দুই-ধাপের হৃৎস্পন্দন—যে লুপ আপনি অন্য যেকোনো কিছুর চেয়ে বেশি চালাবেন। git add আপনার বাছাই করা পরিবর্তন working directory থেকে staging area-তে নেয়, "পরের স্ন্যাপশটের অংশ" হিসেবে চিহ্নিত করে। তারপর git commit staged সব একটি স্থায়ী commit হিসেবে রেকর্ড করে, সঙ্গে কী ও কেন বদলালো ব্যাখ্যা করা একটি মেসেজসহ। সেই মেসেজ ও স্ন্যাপশট আপনার ইতিহাসে একটি স্থির বিন্দু হয় যেখানে আপনি সবসময় ফিরতে, তুলনা করতে বা শেয়ার করতে পারেন।') },
        { p: l('The problem this loop solves is turning ongoing edits into a meaningful, reversible record. Files change constantly as you work; a commit freezes a coherent set of those changes into one labelled snapshot. Done well, your history becomes a story anyone can read — "add login form," "fix off-by-one in pagination," "update README" — where each entry is small enough to understand and safe to undo on its own.', 'এই লুপ যে সমস্যা সমাধান করে তা হলো চলমান এডিটকে অর্থপূর্ণ, বিপরীতযোগ্য রেকর্ডে পরিণত করা। কাজের সঙ্গে ফাইল অবিরাম বদলায়; একটি commit সেই পরিবর্তনের একটি সুসংগত সেটকে একটি লেবেলযুক্ত স্ন্যাপশটে জমাট বাঁধে। ভালোভাবে করলে আপনার ইতিহাস এমন একটি গল্প হয় যা যে কেউ পড়তে পারে—"add login form," "fix off-by-one in pagination," "update README"—যেখানে প্রতিটি এন্ট্রি বোঝার মতো ছোট ও একা আনডু করার মতো নিরাপদ।') },
        { note: l('git add is like loading and framing the shot in a camera — deciding exactly what will be in the picture. git commit is pressing the shutter: it captures that exact moment permanently, and the message is the caption written on the back.', 'git add হলো ক্যামেরায় শট লোড করে ফ্রেম সাজানোর মতো—ঠিক কী ছবিতে থাকবে তা ঠিক করা। git commit হলো শাটার চাপা: এটি ঠিক সেই মুহূর্তটি স্থায়ীভাবে ধরে, আর মেসেজ হলো পিছনে লেখা ক্যাপশন।'), kind: 'tip' },
      ],
    },
    {
      h: l('How the add-then-commit loop works', 'add-তারপর-commit লুপ কীভাবে কাজ করে'),
      blocks: [
        { steps: [
          l('Make your edits, then decide which changes belong together in one snapshot.', 'এডিট করুন, তারপর ঠিক করুন কোন পরিবর্তনগুলো একসঙ্গে এক স্ন্যাপশটে যায়।'),
          l('Stage exactly those files with git add, grouping related work and leaving unrelated work for later.', 'ঠিক সেই ফাইলগুলো git add দিয়ে stage করুন, সম্পর্কিত কাজ একসঙ্গে রেখে অসম্পর্কিত কাজ পরের জন্য রেখে।'),
          l('Review what is staged with git diff --staged so no stray change sneaks in.', 'git diff --staged দিয়ে কী staged দেখুন যাতে কোনো এলোমেলো পরিবর্তন গলে না ঢোকে।'),
          l('Commit with a clear, imperative message that finishes the sentence "This commit will…".', '"This commit will…" বাক্যটি শেষ করে এমন একটি স্পষ্ট, ইম্পারেটিভ মেসেজে commit করুন।'),
          l('Repeat. Many small, focused commits are far easier to review and undo than one giant one.', 'পুনরাবৃত্তি করুন। অনেক ছোট, নির্দিষ্ট commit একটি বিশাল commit-এর চেয়ে রিভিউ ও আনডু করা অনেক সহজ।'),
        ] },
        { code: `# Stage related changes, then check what is staged
git add login.js styles.css
git status
git diff --staged             # review the exact lines you will commit

# Commit with a clear, imperative message
git commit -m "add login form"

# Forgot a file, or a typo in the message? Fold it into the last commit
git add forgot.js
git commit --amend --no-edit  # replaces the previous commit`, caption: l('git commit --amend rewrites the most recent commit. Use it only before pushing — it changes the commit, which is unsafe once others have it.', 'git commit --amend সবশেষ commit-টি নতুন করে লেখে। শুধু push-এর আগে ব্যবহার করুন—এটি commit বদলায়, যা অন্যরা পেয়ে গেলে অনিরাপদ।') },
      ],
    },
    {
      h: l('Key commands', 'মূল কমান্ড'),
      blocks: [
        { table: {
          head: [l('Goal', 'লক্ষ্য'), l('Command', 'কমান্ড')],
          rows: [
            [l('Stage everything', 'সব স্টেজ'), l('git add -A', 'git add -A')],
            [l('Stage interactively', 'ইন্টারেক্টিভ স্টেজ'), l('git add -p', 'git add -p')],
            [l('Commit staged changes', 'স্টেজড কমিট'), l('git commit -m "message"', 'git commit -m "message"')],
            [l('Amend the last commit', 'শেষ কমিট সংশোধন'), l('git commit --amend', 'git commit --amend')],
          ],
        } },
        { note: l('git add -p ("patch" mode) walks you through each change hunk by hunk, so you can stage some edits in a file while leaving others behind. It is the cleanest way to split a messy file into focused commits.', 'git add -p ("patch" মোড) প্রতিটি পরিবর্তন hunk-ধরে দেখায়, যাতে একটি ফাইলের কিছু এডিট stage করে বাকিগুলো রেখে দিতে পারেন। একটি এলোমেলো ফাইলকে নির্দিষ্ট commit-এ ভাগ করার সবচেয়ে পরিষ্কার উপায়।'), kind: 'tip' },
      ],
    },
    {
      h: l('What makes a good commit', 'একটি ভালো কমিট কী দিয়ে হয়'),
      blocks: [
        { p: l('A good commit does exactly one logical thing and describes it clearly. The widely used convention is to write the subject line in the imperative mood — as if completing "If applied, this commit will…" — so "add login form" and "fix null crash on empty cart," not "added stuff" or "changes." Keep the subject short (around 50 characters), and if more explanation is needed, add a blank line and a longer body. Small, single-purpose commits are the ones your teammates can actually review and that you can safely revert one at a time.', 'একটি ভালো commit ঠিক একটি যৌক্তিক কাজ করে ও তা স্পষ্টভাবে বর্ণনা করে। বহুল-ব্যবহৃত কনভেনশন হলো subject লাইন ইম্পারেটিভ মুডে লেখা—যেন "If applied, this commit will…" সম্পূর্ণ করছেন—তাই "add login form" ও "fix null crash on empty cart," "added stuff" বা "changes" নয়। subject ছোট রাখুন (প্রায় ৫০ অক্ষর), আর বেশি ব্যাখ্যা লাগলে একটি ফাঁকা লাইন ও একটি লম্বা body যোগ করুন। ছোট, এক-উদ্দেশ্যের commit-ই টিমমেটরা আসলে রিভিউ করতে পারে ও আপনি একে একে নিরাপদে revert করতে পারেন।') },
        { list: [
          l('Good: "add password reset endpoint" — one change, imperative, specific.', 'ভালো: "add password reset endpoint"—একটি পরিবর্তন, ইম্পারেটিভ, নির্দিষ্ট।'),
          l('Bad: "stuff" or "wip" — tells a future reader nothing about what or why.', 'খারাপ: "stuff" বা "wip"—ভবিষ্যতের পাঠককে কী বা কেন কিছুই বলে না।'),
          l('Bad: one commit that adds a feature, fixes an unrelated bug, and reformats a file — impossible to revert cleanly.', 'খারাপ: একটি commit যা একটি ফিচার যোগ করে, একটি অসম্পর্কিত বাগ ঠিক করে ও একটি ফাইল রিফরম্যাট করে—পরিষ্কারভাবে revert করা অসম্ভব।'),
        ] },
        { note: l('A helpful rule of thumb is the "atomic commit": each commit should be complete on its own, leaving the project in a working state. If you cannot describe a commit without using the word "and," it is probably doing too much and should be split into two.', 'একটি কাজের নিয়ম হলো "atomic commit": প্রতিটি commit নিজে থেকে সম্পূর্ণ হওয়া উচিত, প্রকল্পকে একটি সচল অবস্থায় রেখে। "and" শব্দ ছাড়া একটি commit বর্ণনা করতে না পারলে, সম্ভবত এটি বেশি কাজ করছে ও দুটিতে ভাগ করা উচিত।'), kind: 'tip' },
      ],
    },
    {
      h: l('When and where to use it', 'কখন ও কোথায় ব্যবহার করবেন'),
      blocks: [
        { p: l('Commit early and often — any time you reach a small, coherent stopping point that works, such as finishing a function, fixing one bug, or updating the docs. Frequent commits give you more checkpoints to fall back to and a clearer history. Prefer several small commits over one enormous one: small commits are quick to review, easy to understand months later, and trivial to revert individually if one turns out to be wrong. A giant "end of day" commit is fast to make but bundles unrelated work, so undoing one part means losing the others. The only real trade-off is discipline — grouping changes thoughtfully takes a moment, but it pays back every time you or a teammate reads the log.', 'তাড়াতাড়ি ও ঘন ঘন commit করুন—যখনই একটি ছোট, সুসংগত থামার বিন্দুতে পৌঁছান যা কাজ করে, যেমন একটি ফাংশন শেষ করা, একটি বাগ ঠিক করা, বা ডকস আপডেট করা। ঘন commit আপনাকে ফিরে যাওয়ার বেশি চেকপয়েন্ট ও পরিষ্কার ইতিহাস দেয়। একটি বিশাল commit-এর চেয়ে কয়েকটি ছোট commit নিন: ছোট commit দ্রুত রিভিউ হয়, মাস পরেও সহজে বোঝা যায়, এবং একটি ভুল হলে আলাদাভাবে revert করা সহজ। একটি বিশাল "দিন শেষের" commit বানানো দ্রুত কিন্তু অসম্পর্কিত কাজ জড়ো করে, তাই একটি অংশ আনডু করা মানে বাকিগুলো হারানো। একমাত্র আসল ট্রেড-অফ হলো শৃঙ্খলা—চিন্তা করে পরিবর্তন গোছাতে একটু সময় লাগে, তবে প্রতিবার আপনি বা টিমমেট log পড়লে তা ফেরত দেয়।') },
      ],
    },
    {
      h: l('Common mistakes', 'সাধারণ ভুল'),
      blocks: [
        { list: [
          l('Bundling unrelated changes into one commit, so you cannot revert one without losing the others. Keep each commit to a single purpose.', 'অসম্পর্কিত পরিবর্তন এক commit-এ জড়ো করা, ফলে একটি revert করলে বাকিগুলোও হারায়। প্রতিটি commit এক উদ্দেশ্যে রাখুন।'),
          l('Writing vague messages like "update" or "fix" that tell nobody — including future you — what actually changed.', '"update" বা "fix"-এর মতো অস্পষ্ট মেসেজ লেখা যা কাউকে—ভবিষ্যতের আপনিসহ—কী আসলে বদলালো তা বলে না।'),
          l('Committing without reviewing git diff --staged first, so a debug print, a secret, or a leftover conflict marker slips in.', 'আগে git diff --staged না দেখে commit করা, ফলে একটি ডিবাগ প্রিন্ট, সিক্রেট বা রয়ে-যাওয়া কনফ্লিক্ট মার্কার গলে ঢোকে।'),
          l('Using git commit --amend on a commit you have already pushed. Amend rewrites the commit, so anyone who pulled the old one now has a diverging history — only amend un-pushed commits.', 'ইতিমধ্যে push করা commit-এ git commit --amend ব্যবহার করা। amend commit-টি নতুন করে লেখে, তাই যে পুরনোটি pull করেছে তার ইতিহাস এখন আলাদা—শুধু আন-পুশড commit amend করুন।'),
        ] },
      ],
    },
    {
      h: l('Remember in one line', 'এক লাইনে মনে রাখুন'),
      blocks: [
        { list: [
          l('git add stages the changes you choose; git commit records exactly those as a snapshot with a message.', 'git add আপনার বাছা পরিবর্তন stage করে; git commit ঠিক সেগুলো একটি মেসেজসহ স্ন্যাপশট হিসেবে রেকর্ড করে।'),
          l('Stage related changes together and write a clear, imperative message like "add login form".', 'সম্পর্কিত পরিবর্তন একসঙ্গে stage করুন ও "add login form"-এর মতো স্পষ্ট ইম্পারেটিভ মেসেজ লিখুন।'),
          l('Small, focused commits are easy to review and revert; --amend fixes the last commit but only before you push.', 'ছোট, নির্দিষ্ট commit রিভিউ ও revert করা সহজ; --amend শেষ commit ঠিক করে তবে শুধু push-এর আগে।'),
        ] },
      ],
    },
  ],
}
