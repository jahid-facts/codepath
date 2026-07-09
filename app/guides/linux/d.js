// Deep, bilingual (English / Bangla) teaching guides for the Linux course —
// Users & permissions and Processes & services. Shape mirrors app/course-guides.js
// and app/guides/git/a.js: each guide is an array of sections { h, blocks }, rendered
// by GuideBlock in app/LearningApp.js. Block types: { p }, { list }, { steps },
// { table:{head,rows} }, { note, kind }, { code, caption }.
// Facts (definitions, analogies, commands, trade-offs, mistakes) come from app/courses/linux.js.

const l = (en, bn) => ({ en, bn })

export default {
  // ── lx-permissions · File permissions (rwx, chmod) ────────────────────────
  'lx-permissions': [
    {
      h: l('What are file permissions?', 'ফাইল পারমিশন কী?'),
      blocks: [
        { p: l('Linux is a multi-user system: many people (and many programs) can share one machine. File permissions are the rules that decide who is allowed to do what with each file and directory. Every single file carries three kinds of permission — read, write, and execute — and each of those is set separately for three classes of people: the file’s owner, the file’s group, and everyone else (often called "others" or "world"). That is nine little on/off switches per file, and together they are Linux’s core protection against one user reading, changing, or running another user’s files by accident or on purpose.', 'লিনাক্স একটি মাল্টি-ইউজার সিস্টেম: অনেক মানুষ (ও অনেক প্রোগ্রাম) একটি মেশিন শেয়ার করতে পারে। ফাইল পারমিশন হলো সেই নিয়ম যা ঠিক করে কে প্রতিটি ফাইল ও ডিরেক্টরির সঙ্গে কী করতে পারবে। প্রতিটি ফাইলে তিন ধরনের পারমিশন থাকে—read, write ও execute—আর এদের প্রতিটি তিন শ্রেণির মানুষের জন্য আলাদাভাবে সেট করা: ফাইলের owner, ফাইলের group, ও বাকি সবাই (যাকে "others" বা "world" বলে)। অর্থাৎ প্রতি ফাইলে নয়টি ছোট অন/অফ সুইচ, আর মিলিতভাবে এগুলোই লিনাক্সের মূল রক্ষাকবচ—যাতে এক ব্যবহারকারী ভুলে বা ইচ্ছে করে অন্যের ফাইল পড়তে, বদলাতে বা চালাতে না পারে।') },
        { p: l('The problem permissions solve is trust on a shared system. Without them, any user could read your private SSH keys, overwrite a service’s config, or delete the system’s own programs. Permissions also protect you from your own mistakes and from malicious files: a script you downloaded cannot run until someone gives it the execute permission, so a stray file cannot silently become a running program. Learning to read and set these bits is one of the first real "sysadmin" skills, and it is unavoidable the moment you touch a server.', 'পারমিশন যে সমস্যা সমাধান করে তা হলো একটি শেয়ার্ড সিস্টেমে বিশ্বাস। এগুলো না থাকলে যেকোনো ব্যবহারকারী আপনার প্রাইভেট SSH কী পড়তে, একটি সার্ভিসের config ওভাররাইট করতে, বা সিস্টেমের নিজস্ব প্রোগ্রাম মুছতে পারত। পারমিশন আপনাকে নিজের ভুল ও ক্ষতিকর ফাইল থেকেও রক্ষা করে: ডাউনলোড করা একটি স্ক্রিপ্ট কেউ execute পারমিশন না দেওয়া পর্যন্ত চলতে পারে না, তাই একটি এলোমেলো ফাইল নীরবে চলমান প্রোগ্রাম হয়ে যায় না। এই বিটগুলো পড়া ও সেট করা শেখা প্রথম আসল "sysadmin" দক্ষতাগুলোর একটি, এবং সার্ভারে হাত দিলেই এটি এড়ানো যায় না।') },
        { note: l('Think of three sets of door locks on every file — one for you (owner), one for your team (group), and one for the public (others). Each lock separately allows three things: look at it (read), change it (write), or run it (execute). Permissions just say which of those nine doors are open.', 'প্রতিটি ফাইলে তিন সেট দরজার তালা ভাবুন—একটি আপনার (owner), একটি দলের (group), একটি জনসাধারণের (others)। প্রতিটি তালা আলাদাভাবে তিনটি জিনিসের অনুমতি দেয়: দেখা (read), বদলানো (write), বা চালানো (execute)। পারমিশন শুধু বলে এই নয়টি দরজার কোনগুলো খোলা।'), kind: 'tip' },
      ],
    },
    {
      h: l('How permissions work', 'পারমিশন কীভাবে কাজ করে'),
      blocks: [
        { steps: [
          l('When you list files with ls -l, the first ten characters describe the permissions. The first character is the type (- for a file, d for a directory); the next nine are three triplets: owner, group, others.', 'ls -l দিয়ে ফাইল তালিকা করলে প্রথম দশটি অক্ষর পারমিশন বর্ণনা করে। প্রথম অক্ষরটি ধরন (ফাইলে -, ডিরেক্টরিতে d); পরের নয়টি তিনটি ট্রিপলেট: owner, group, others।'),
          l('Each triplet reads left to right as r, w, x. A letter means the permission is on; a dash (-) means it is off. So rwxr-xr-- means owner may read/write/execute, group may read/execute, others may only read.', 'প্রতিটি ট্রিপলেট বাঁ থেকে ডানে r, w, x হিসেবে পড়া হয়। একটি অক্ষর মানে পারমিশন চালু; একটি ড্যাশ (-) মানে বন্ধ। তাই rwxr-xr-- মানে owner পড়া/লেখা/চালানো পারে, group পড়া/চালানো পারে, others শুধু পড়তে পারে।'),
          l('When you try to touch a file, Linux checks which class you fall into — are you the owner, a member of its group, or neither? — and applies just that one triplet. The most specific matching class wins; it does not add them up.', 'একটি ফাইলে হাত দিতে চাইলে লিনাক্স দেখে আপনি কোন শ্রেণিতে পড়েন—আপনি কি owner, তার group-এর সদস্য, নাকি কোনোটিই নন?—এবং শুধু সেই একটি ট্রিপলেট প্রয়োগ করে। সবচেয়ে নির্দিষ্ট মিলে যাওয়া শ্রেণিটি জেতে; এদের যোগ করা হয় না।'),
          l('To change permissions you use chmod, either with symbols (chmod +x file) or with three octal digits (chmod 755 file). The digits are the fast, standard way once you can read them.', 'পারমিশন বদলাতে chmod ব্যবহার করুন, হয় সিম্বল দিয়ে (chmod +x file) নয়তো তিনটি octal সংখ্যা দিয়ে (chmod 755 file)। সংখ্যাগুলো পড়তে শিখলে সেগুলোই দ্রুত ও প্রমিত উপায়।'),
        ] },
        { code: `$ ls -l
total 16
-rw-r--r-- 1 ada devs 2048 Jul  9 10:12 notes.txt
-rwxr-xr-x 1 ada devs 4096 Jul  9 10:15 deploy.sh
drwx------ 2 ada devs 4096 Jul  9 10:20 secrets

# owner = ada, group = devs
# notes.txt  -rw-r--r--  owner reads/writes, group + others read only   (644)
# deploy.sh  -rwxr-xr-x  owner full, group + others read + run          (755)
# secrets/   drwx------  a directory only its owner may open            (700)`, caption: l('The leading letter (- or d) is the type; the nine that follow are owner, then group, then others.', 'শুরুর অক্ষর (- বা d) ধরন; পরের নয়টি owner, তারপর group, তারপর others।') },
      ],
    },
    {
      h: l('Reading rwx as octal numbers', 'rwx-কে octal সংখ্যা হিসেবে পড়া'),
      blocks: [
        { p: l('Each of the three permissions has a number: read is 4, write is 2, execute is 1. To describe one triplet you simply add up the ones that are on. rwx is 4+2+1 = 7; rw- is 4+2 = 6; r-x is 4+1 = 5; r-- is 4. A full permission set is three of these digits in a row — owner, group, others — which is why 644 and 755 are the numbers you see everywhere.', 'তিনটি পারমিশনের প্রতিটির একটি সংখ্যা আছে: read হলো 4, write হলো 2, execute হলো 1। একটি ট্রিপলেট বর্ণনা করতে শুধু চালু থাকা সংখ্যাগুলো যোগ করুন। rwx হলো 4+2+1 = 7; rw- হলো 4+2 = 6; r-x হলো 4+1 = 5; r-- হলো 4। একটি পূর্ণ পারমিশন সেট হলো পরপর এই তিনটি সংখ্যা—owner, group, others—এ কারণেই 644 ও 755 সংখ্যাগুলো সর্বত্র দেখেন।') },
        { table: {
          head: [l('Symbol', 'সিম্বল'), l('Name', 'নাম'), l('Number', 'সংখ্যা'), l('What it allows', 'কী অনুমতি দেয়')],
          rows: [
            [l('r', 'r'), l('read', 'read'), l('4', '4'), l('View a file’s contents, or list a directory.', 'একটি ফাইলের বিষয়বস্তু দেখা, বা একটি ডিরেক্টরি তালিকা করা।')],
            [l('w', 'w'), l('write', 'write'), l('2', '2'), l('Change a file, or add/remove files inside a directory.', 'একটি ফাইল বদলানো, বা একটি ডিরেক্টরির ভেতরে ফাইল যোগ/মুছা।')],
            [l('x', 'x'), l('execute', 'execute'), l('1', '1'), l('Run the file as a program, or enter (cd into) a directory.', 'ফাইলটি একটি প্রোগ্রাম হিসেবে চালানো, বা একটি ডিরেক্টরিতে ঢোকা (cd)।')],
          ],
        } },
        { note: l('For directories the bits mean slightly different things: read lets you list names, execute lets you actually go into it and reach files by path. A directory usually needs both (r and x), which is why folders are 755 or 700, not 644.', 'ডিরেক্টরির জন্য বিটগুলোর অর্থ একটু আলাদা: read নাম তালিকা করতে দেয়, execute আসলে এর ভেতরে গিয়ে পাথ দিয়ে ফাইলে পৌঁছাতে দেয়। একটি ডিরেক্টরিতে সাধারণত দুটোই লাগে (r ও x), তাই ফোল্ডার 755 বা 700 হয়, 644 নয়।'), kind: 'tip' },
      ],
    },
    {
      h: l('Common chmod recipes', 'সাধারণ chmod রেসিপি'),
      blocks: [
        { p: l('In practice you reach for the same few numbers again and again. Memorising these three or four covers almost everything a beginner needs, and you can reason out the rest from the 4-2-1 rule.', 'বাস্তবে আপনি বারবার একই কয়েকটি সংখ্যাই ব্যবহার করেন। এই তিন-চারটি মুখস্থ করলে একজন নতুনের প্রায় সব দরকার মিটে যায়, আর বাকিগুলো 4-2-1 নিয়ম থেকে বের করতে পারেন।') },
        { table: {
          head: [l('Command', 'কমান্ড'), l('Result (owner/group/others)', 'ফল (owner/group/others)'), l('Use it for', 'কীসে ব্যবহার')],
          rows: [
            [l('chmod 644 file', 'chmod 644 file'), l('rw- r-- r--', 'rw- r-- r--'), l('Normal files: text, config, images. Owner edits; everyone else can read.', 'সাধারণ ফাইল: টেক্সট, config, ছবি। owner বদলায়; বাকি সবাই পড়তে পারে।')],
            [l('chmod 755 file', 'chmod 755 file'), l('rwx r-x r-x', 'rwx r-x r-x'), l('Scripts, programs, and directories everyone may use but only you may change.', 'স্ক্রিপ্ট, প্রোগ্রাম ও ডিরেক্টরি যা সবাই ব্যবহার করতে পারে কিন্তু শুধু আপনি বদলাতে পারেন।')],
            [l('chmod 700 dir', 'chmod 700 dir'), l('rwx --- ---', 'rwx --- ---'), l('Private files only you may touch, like ~/.ssh — nobody else gets in.', 'শুধু আপনার ছোঁয়ার প্রাইভেট ফাইল, যেমন ~/.ssh—আর কেউ ঢুকতে পারে না।')],
            [l('chmod +x file', 'chmod +x file'), l('adds the execute bit to all three', 'তিনটিতেই execute বিট যোগ করে'), l('Making a downloaded or newly written script runnable.', 'ডাউনলোড করা বা নতুন লেখা একটি স্ক্রিপ্ট চালানোযোগ্য করা।')],
          ],
        } },
        { note: l('Never "fix" a permission problem with chmod 777. That sets rwxrwxrwx — every user on the machine can read, change, and run the file, and a shared web server can turn your uploads into executable code an attacker runs. If something is blocked, correct the owner or use the least-open bits that work, not 777.', 'কখনো chmod 777 দিয়ে পারমিশন সমস্যা "ঠিক" করবেন না। এটি rwxrwxrwx সেট করে—মেশিনের প্রতিটি ব্যবহারকারী ফাইলটি পড়তে, বদলাতে ও চালাতে পারে, আর একটি শেয়ার্ড ওয়েব সার্ভার আপনার আপলোডকে আক্রমণকারীর চালানো এক্সিকিউটেবল কোডে পরিণত করতে পারে। কিছু আটকে গেলে owner ঠিক করুন বা কাজ চলে এমন সবচেয়ে কম-খোলা বিট নিন, 777 নয়।'), kind: 'warn' },
      ],
    },
    {
      h: l('Key commands', 'মূল কমান্ড'),
      blocks: [
        { table: {
          head: [l('Goal', 'লক্ষ্য'), l('Command', 'কমান্ড')],
          rows: [
            [l('View permissions', 'পারমিশন দেখুন'), l('ls -l', 'ls -l')],
            [l('Make a file executable', 'ফাইল এক্সিকিউটেবল করুন'), l('chmod +x file', 'chmod +x file')],
            [l('Standard file (owner writes, rest read)', 'সাধারণ ফাইল (owner লেখে, বাকিরা পড়ে)'), l('chmod 644 file', 'chmod 644 file')],
            [l('Script or directory for everyone to use', 'সবার ব্যবহারের স্ক্রিপ্ট বা ডিরেক্টরি'), l('chmod 755 file', 'chmod 755 file')],
            [l('Owner-only, fully private', 'শুধু owner, পুরোপুরি প্রাইভেট'), l('chmod 700 file', 'chmod 700 file')],
            [l('Apply to a whole folder tree', 'পুরো ফোল্ডার-গাছে প্রয়োগ'), l('chmod -R 755 dir', 'chmod -R 755 dir')],
          ],
        } },
      ],
    },
    {
      h: l('When and where to use it', 'কখন ও কোথায় ব্যবহার করবেন'),
      blocks: [
        { p: l('You set permissions whenever a file needs to be more open or more closed than the default. The two most common moments are: making a script runnable (chmod +x after writing or downloading it), and locking down secrets (chmod 600 or 700 on private keys, tokens, and password files, so only you can read them). SSH is strict about this — it refuses to use a private key that others can read, so ~/.ssh being 700 and the key being 600 is a rule you will meet early.', 'ফাইলটিকে ডিফল্টের চেয়ে বেশি খোলা বা বেশি বন্ধ রাখতে হলেই আপনি পারমিশন সেট করেন। সবচেয়ে সাধারণ দুটি মুহূর্ত: একটি স্ক্রিপ্ট চালানোযোগ্য করা (লেখা বা ডাউনলোডের পর chmod +x), এবং সিক্রেট লক করা (প্রাইভেট কী, টোকেন ও পাসওয়ার্ড ফাইলে chmod 600 বা 700, যাতে শুধু আপনি পড়তে পারেন)। SSH এ ব্যাপারে কড়া—অন্যরা পড়তে পারে এমন প্রাইভেট কী এটি ব্যবহার করতে অস্বীকার করে, তাই ~/.ssh 700 ও কী 600 হওয়া একটি নিয়ম যা তাড়াতাড়ি দেখবেন।') },
        { p: l('On a web or app server, permissions decide what the service account can and cannot do. The safe habit is least privilege: give a process read access to the files it serves, write access only where it truly must write (an uploads or cache folder), and nothing more. When a deploy "cannot write" or a page "403 Forbidden"s, permissions and ownership are the first two things to check with ls -l.', 'একটি ওয়েব বা অ্যাপ সার্ভারে পারমিশন ঠিক করে সার্ভিস অ্যাকাউন্ট কী করতে পারবে ও পারবে না। নিরাপদ অভ্যাস হলো least privilege: প্রসেসকে পরিবেশন করা ফাইলে read দিন, শুধু যেখানে সত্যিই লিখতে হবে সেখানে write (একটি uploads বা cache ফোল্ডার), আর কিছু নয়। কোনো deploy "লিখতে পারছে না" বা একটি পেজ "403 Forbidden" দিলে, ls -l দিয়ে প্রথমে পারমিশন ও ownership দেখুন।') },
      ],
    },
    {
      h: l('Common mistakes', 'সাধারণ ভুল'),
      blocks: [
        { list: [
          l('Running chmod 777 on everything "to make it work". It does silence the error, but it opens the file to modification by any user or process — a serious security hole, not a fix.', 'সবকিছুতে "কাজ করানোর" জন্য chmod 777 চালানো। এটি এররটি থামায় ঠিকই, কিন্তু ফাইলটিকে যেকোনো ব্যবহারকারী বা প্রসেসের পরিবর্তনে খুলে দেয়—এটি একটি গুরুতর নিরাপত্তা ছিদ্র, সমাধান নয়।'),
          l('Confusing the triplets: setting 744 when you meant 774, or forgetting that the middle digit is group, not others. Always read the number as owner-group-others, left to right.', 'ট্রিপলেট গুলিয়ে ফেলা: 774 বোঝাতে গিয়ে 744 সেট করা, বা মাঝের সংখ্যাটি others নয় group এটি ভুলে যাওয়া। সবসময় সংখ্যাটি বাঁ থেকে ডানে owner-group-others হিসেবে পড়ুন।'),
          l('Using chmod -R 777 on a directory tree, which also makes every file inside world-writable and every script executable — usually the opposite of what you want.', 'একটি ডিরেক্টরি-গাছে chmod -R 777 ব্যবহার করা, যা ভেতরের প্রতিটি ফাইলকেও world-writable ও প্রতিটি স্ক্রিপ্টকে এক্সিকিউটেবল করে—সাধারণত আপনি যা চান তার উল্টো।'),
          l('Forgetting the execute bit on a directory. Without x, you cannot cd into it or reach files by path even if you can read the listing.', 'একটি ডিরেক্টরিতে execute বিট ভুলে যাওয়া। x ছাড়া তালিকা পড়তে পারলেও এতে cd করতে বা পাথ দিয়ে ফাইলে পৌঁছাতে পারবেন না।'),
        ] },
      ],
    },
    {
      h: l('Remember in one line', 'এক লাইনে মনে রাখুন'),
      blocks: [
        { list: [
          l('Every file has r/w/x for three classes: owner, group, others — read them in ls -l as three triplets.', 'প্রতি ফাইলে তিন শ্রেণির জন্য r/w/x: owner, group, others—ls -l-এ তিনটি ট্রিপলেট হিসেবে পড়ুন।'),
          l('r=4, w=2, x=1; add them per triplet — 644 is a normal file, 755 a script or folder, 700 fully private.', 'r=4, w=2, x=1; প্রতি ট্রিপলেটে যোগ করুন—644 সাধারণ ফাইল, 755 স্ক্রিপ্ট বা ফোল্ডার, 700 পুরোপুরি প্রাইভেট।'),
          l('Set them with chmod, and never reach for 777 — use the least-open permissions that work.', 'chmod দিয়ে সেট করুন, আর কখনো 777 নেবেন না—কাজ চলে এমন সবচেয়ে কম-খোলা পারমিশন নিন।'),
        ] },
      ],
    },
  ],

  // ── lx-ownership · Ownership (chown, chgrp) ────────────────────────────────
  'lx-ownership': [
    {
      h: l('What is file ownership?', 'ফাইলের মালিকানা কী?'),
      blocks: [
        { p: l('Every file and directory in Linux belongs to exactly one user (the owner) and one group. Ownership is the other half of the permission system: permissions say what the owner, the group, and others may each do, and ownership decides which of those three sets of rules applies to you. Change who owns a file and you change whose "owner" permissions count — even though the rwx bits themselves did not move.', 'লিনাক্সে প্রতিটি ফাইল ও ডিরেক্টরি ঠিক একজন user (owner) ও একটি group-এর। মালিকানা হলো পারমিশন সিস্টেমের বাকি অর্ধেক: পারমিশন বলে owner, group ও others প্রত্যেকে কী করতে পারবে, আর মালিকানা ঠিক করে সেই তিন সেট নিয়মের কোনটি আপনার ওপর প্রযোজ্য। একটি ফাইলের মালিক বদলান আর কার "owner" পারমিশন গোনা হবে তা বদলে যায়—যদিও rwx বিটগুলো নিজে নড়ে না।') },
        { p: l('The commands are chown ("change owner") and chgrp ("change group"). chown sets the owning user (and, with user:group, the group too); chgrp sets only the group. You need these constantly on servers: when you copy files as root, they end up owned by root, and the service that should read them cannot. Setting the right owner and group is how you hand a file to the account that is supposed to use it.', 'কমান্ড দুটি হলো chown ("change owner") ও chgrp ("change group")। chown owner user সেট করে (এবং user:group দিলে group-ও); chgrp শুধু group সেট করে। সার্ভারে এগুলো সারাক্ষণ লাগে: root হিসেবে ফাইল কপি করলে সেগুলোর মালিক হয় root, আর যে সার্ভিসের সেগুলো পড়ার কথা সে পড়তে পারে না। সঠিক owner ও group সেট করাই হলো যে অ্যাকাউন্টের ফাইলটি ব্যবহার করার কথা তার হাতে তুলে দেওয়ার উপায়।') },
        { p: l('Under the hood, Linux stores ownership as numbers, not names: every user has a numeric UID and every group a numeric GID, and the file records those numbers. The names you see in ls -l are just a friendly lookup. This is why a file copied to another machine can suddenly show a strange owner — the same UID maps to a different name there. For everyday work you use names, but knowing the numbers exist explains a lot of "who owns this?" surprises when moving files between systems.', 'ভেতরে, লিনাক্স মালিকানা নাম নয়, সংখ্যা হিসেবে রাখে: প্রতিটি user-এর একটি সংখ্যাসূচক UID ও প্রতিটি group-এর একটি সংখ্যাসূচক GID থাকে, আর ফাইল সেই সংখ্যাই রেকর্ড করে। ls -l-এ যে নাম দেখেন তা শুধু একটি বন্ধুত্বপূর্ণ lookup। এ কারণেই অন্য মেশিনে কপি করা একটি ফাইল হঠাৎ একটি অচেনা owner দেখাতে পারে—সেখানে একই UID ভিন্ন নামে ম্যাপ করে। প্রতিদিনের কাজে নাম ব্যবহার করেন, তবে সংখ্যাগুলো আছে জানলে সিস্টেমের মধ্যে ফাইল সরানোর সময় অনেক "এটি কার?" বিস্ময় ব্যাখ্যা হয়।') },
        { note: l('If permissions are the locks on a door, ownership is whose name is on the key ring. Reassigning the owner with chown is handing the keys to a different person — the locks are unchanged, but now a different person’s "owner" access applies.', 'পারমিশন যদি দরজার তালা হয়, মালিকানা হলো চাবির রিংয়ে কার নাম আছে তা। chown দিয়ে owner পুনর্নির্ধারণ মানে চাবি অন্য একজনকে দেওয়া—তালা অপরিবর্তিত, কিন্তু এখন ভিন্ন একজনের "owner" অ্যাক্সেস প্রযোজ্য।'), kind: 'tip' },
      ],
    },
    {
      h: l('How chown and chgrp work', 'chown ও chgrp কীভাবে কাজ করে'),
      blocks: [
        { steps: [
          l('Run ls -l to see the current owner and group — they are the third and fourth columns of each line (for example "ada devs").', 'বর্তমান owner ও group দেখতে ls -l চালান—এগুলো প্রতিটি লাইনের তৃতীয় ও চতুর্থ কলাম (যেমন "ada devs")।'),
          l('To change the owning user, run sudo chown <user> <file>. Changing ownership almost always needs root, because handing your file to someone else is a privileged act.', 'owner user বদলাতে sudo chown <user> <file> চালান। মালিকানা বদল প্রায় সবসময় root চায়, কারণ নিজের ফাইল অন্যকে দেওয়া একটি বিশেষ-অধিকারের কাজ।'),
          l('To set the user and group at once, use a colon: sudo chown <user>:<group> <file>. To change only the group, use sudo chgrp <group> <file>.', 'একসঙ্গে user ও group সেট করতে কোলন ব্যবহার করুন: sudo chown <user>:<group> <file>। শুধু group বদলাতে sudo chgrp <group> <file>।'),
          l('Add -R to apply the change to a directory and everything inside it, recursively. This is powerful and, on the wrong path, dangerous — check the path first.', 'একটি ডিরেক্টরি ও তার ভেতরের সবকিছুতে রিকার্সিভলি প্রয়োগ করতে -R যোগ করুন। এটি শক্তিশালী এবং ভুল পাথে বিপজ্জনক—আগে পাথ যাচাই করুন।'),
        ] },
        { code: `$ ls -l config.yml
-rw-r--r-- 1 root root 512 Jul  9 09:00 config.yml

$ sudo chown ada config.yml         # owning user -> ada (group unchanged)
$ sudo chown ada:devs config.yml    # owning user -> ada AND group -> devs
$ sudo chgrp devs config.yml        # change only the group
$ sudo chown -R ada:devs /srv/app   # whole tree: files and subfolders

$ ls -l config.yml
-rw-r--r-- 1 ada devs 512 Jul  9 09:05 config.yml`, caption: l('The pair "user group" in ls -l is the ownership; chown/chgrp are the only tools that change it.', 'ls -l-এর "user group" জোড়াটিই মালিকানা; chown/chgrp-ই একমাত্র টুল যা এটি বদলায়।') },
      ],
    },
    {
      h: l('Key commands', 'মূল কমান্ড'),
      blocks: [
        { table: {
          head: [l('Goal', 'লক্ষ্য'), l('Command', 'কমান্ড')],
          rows: [
            [l('See current owner and group', 'বর্তমান owner ও group দেখুন'), l('ls -l', 'ls -l')],
            [l('Change the owning user', 'owner user বদলান'), l('sudo chown user file', 'sudo chown user file')],
            [l('Change user and group together', 'user ও group একসঙ্গে বদলান'), l('sudo chown user:group file', 'sudo chown user:group file')],
            [l('Change only the group', 'শুধু group বদলান'), l('sudo chgrp group file', 'sudo chgrp group file')],
            [l('Apply to a whole directory tree', 'পুরো ডিরেক্টরি-গাছে প্রয়োগ'), l('sudo chown -R user:group dir', 'sudo chown -R user:group dir')],
          ],
        } },
      ],
    },
    {
      h: l('When and where to use it', 'কখন ও কোথায় ব্যবহার করবেন'),
      blocks: [
        { p: l('The classic moment for chown is after moving or copying files between accounts. If you download a project as root, or unpack a tarball with sudo, the files belong to root and your normal user (or a service like www-data) cannot write to them. A single sudo chown -R youruser:yourgroup ./project hands the whole tree back to the right owner and the "permission denied" errors disappear.', 'chown-এর ক্লাসিক মুহূর্ত হলো অ্যাকাউন্টের মধ্যে ফাইল সরানো বা কপি করার পর। root হিসেবে একটি প্রকল্প ডাউনলোড করলে, বা sudo দিয়ে একটি tarball খুললে, ফাইলগুলোর মালিক হয় root আর আপনার সাধারণ user (বা www-data-এর মতো একটি সার্ভিস) তাতে লিখতে পারে না। একটিমাত্র sudo chown -R youruser:yourgroup ./project পুরো গাছটি সঠিক owner-কে ফিরিয়ে দেয় ও "permission denied" এরর মিলিয়ে যায়।') },
        { p: l('On servers, ownership is how you give a service exactly the files it needs. A web app’s upload folder is typically owned by the web server’s user and group so the process can write there, while the code itself stays owned by a deploy user so the web process cannot modify it. Group ownership is especially handy for teams: put several people in one group, chgrp shared files to that group, and everyone in it gets the group permissions without making the files world-accessible.', 'সার্ভারে, মালিকানাই হলো একটি সার্ভিসকে ঠিক তার দরকারি ফাইল দেওয়ার উপায়। একটি ওয়েব অ্যাপের upload ফোল্ডার সাধারণত ওয়েব সার্ভারের user ও group-এর মালিকানায় থাকে যাতে প্রসেস সেখানে লিখতে পারে, আর কোড নিজে একটি deploy user-এর মালিকানায় থাকে যাতে ওয়েব প্রসেস তা বদলাতে না পারে। group মালিকানা দলের জন্য বিশেষ কাজের: কয়েকজনকে এক group-এ রাখুন, শেয়ার্ড ফাইল সেই group-এ chgrp করুন, আর তাতে থাকা সবাই ফাইল world-accessible না করেই group পারমিশন পায়।') },
      ],
    },
    {
      h: l('Common mistakes', 'সাধারণ ভুল'),
      blocks: [
        { list: [
          l('Recursively chowning a system directory (like sudo chown -R ada /usr or /etc) to your own user. Many services expect files to be owned by root, and this can stop them starting — a very hard mess to undo.', 'একটি সিস্টেম ডিরেক্টরি (যেমন sudo chown -R ada /usr বা /etc) রিকার্সিভলি নিজের user-এ chown করা। অনেক সার্ভিস ফাইল root-এর মালিকানায় থাকা আশা করে, আর এটি সেগুলো চালু হওয়া থামাতে পারে—ঠিক করা খুব কঠিন একটি ঝামেলা।'),
          l('Forgetting sudo. Without it, chown usually fails with "Operation not permitted", because a normal user cannot give files away.', 'sudo ভুলে যাওয়া। এটি ছাড়া chown সাধারণত "Operation not permitted" দিয়ে ব্যর্থ হয়, কারণ একজন সাধারণ user ফাইল দিয়ে দিতে পারে না।'),
          l('Changing the owner when you really needed to change permissions (or the reverse). If the right user still cannot read a file, check both — ls -l shows owner, group, and the rwx bits together.', 'যখন আসলে পারমিশন বদলানো দরকার ছিল তখন owner বদলানো (বা উল্টোটা)। সঠিক user-ও যদি ফাইল পড়তে না পারে, দুটোই দেখুন—ls -l owner, group ও rwx বিট একসঙ্গে দেখায়।'),
          l('Using -R on the wrong path, or with a typo, so an unintended tree gets re-owned. Double-check the directory before adding -R.', 'ভুল পাথে, বা একটি টাইপোসহ -R ব্যবহার করা, ফলে একটি অনিচ্ছাকৃত গাছ পুনরায় মালিকানা পায়। -R যোগের আগে ডিরেক্টরিটি ভালো করে দেখুন।'),
        ] },
      ],
    },
    {
      h: l('Remember in one line', 'এক লাইনে মনে রাখুন'),
      blocks: [
        { list: [
          l('Every file has one owning user and one group; ownership decides which permission set applies to you.', 'প্রতি ফাইলের একজন owner user ও একটি group; মালিকানা ঠিক করে কোন পারমিশন সেট আপনার ওপর প্রযোজ্য।'),
          l('chown changes the user (user:group changes both); chgrp changes only the group — both usually need sudo.', 'chown user বদলায় (user:group দুটোই); chgrp শুধু group বদলায়—দুটোতেই সাধারণত sudo লাগে।'),
          l('Use it after copying files between accounts, and never chown -R a system directory to yourself.', 'অ্যাকাউন্টের মধ্যে ফাইল কপির পর ব্যবহার করুন, আর কখনো একটি সিস্টেম ডিরেক্টরি নিজের নামে chown -R করবেন না।'),
        ] },
      ],
    },
  ],

  // ── lx-sudo · sudo & root ──────────────────────────────────────────────────
  'lx-sudo': [
    {
      h: l('What is sudo?', 'sudo কী?'),
      blocks: [
        { p: l('On Linux there is one all-powerful account called root (also called the superuser). Root can read, change, or delete any file, install software, and stop any process — it bypasses every permission check. That power is exactly why you should not log in as root for daily work: a single mistyped command as root can wipe the system with no "are you sure?". sudo ("superuser do") is the safe bridge. It lets a normal user run one command with root privileges, then immediately drop back to being a normal user.', 'লিনাক্সে root (superuser-ও বলে) নামে একটি সর্বশক্তিমান অ্যাকাউন্ট আছে। root যেকোনো ফাইল পড়তে, বদলাতে বা মুছতে, সফটওয়্যার ইনস্টল করতে ও যেকোনো প্রসেস থামাতে পারে—এটি প্রতিটি পারমিশন চেক পাশ কাটিয়ে যায়। এই ক্ষমতার কারণেই প্রতিদিনের কাজে root হিসেবে লগইন করা উচিত নয়: root হিসেবে একটি ভুল-টাইপ করা কমান্ড কোনো "নিশ্চিত?" ছাড়াই সিস্টেম মুছে দিতে পারে। sudo ("superuser do") হলো নিরাপদ সেতু। এটি একজন সাধারণ user-কে একটি কমান্ড root সুবিধায় চালাতে দেয়, তারপরই আবার সাধারণ user-এ ফিরিয়ে দেয়।') },
        { p: l('So the everyday model is: live as a normal, limited user, and reach for sudo only on the specific commands that truly need admin power — installing a package, editing a system config, restarting a service. This keeps you a normal user the other 95% of the time, so an accidental rm or a buggy script can only damage your own files, not the whole machine. As a bonus, every sudo use is logged, so on a shared server there is a record of who did what.', 'তাই প্রতিদিনের মডেল: একজন সাধারণ, সীমিত user হিসেবে থাকুন, আর শুধু যে নির্দিষ্ট কমান্ডে সত্যিই অ্যাডমিন ক্ষমতা দরকার সেখানে sudo নিন—একটি প্যাকেজ ইনস্টল, একটি সিস্টেম config এডিট, একটি সার্ভিস রিস্টার্ট। এতে বাকি ৯৫% সময় আপনি সাধারণ user থাকেন, তাই একটি দুর্ঘটনাজনিত rm বা একটি বাগি স্ক্রিপ্ট শুধু আপনার নিজের ফাইল ক্ষতি করতে পারে, পুরো মেশিন নয়। বাড়তি সুবিধা: প্রতিটি sudo ব্যবহার লগ হয়, তাই একটি শেয়ার্ড সার্ভারে কে কী করেছে তার রেকর্ড থাকে।') },
        { note: l('sudo is like borrowing the building manager’s master key for one specific task and handing it straight back. You are not carrying the master key around all day — you pick it up for a single door, then you are an ordinary keyholder again.', 'sudo হলো একটি নির্দিষ্ট কাজের জন্য ভবন ম্যানেজারের মাস্টার কী ধার নিয়ে সঙ্গে সঙ্গে ফেরত দেওয়ার মতো। আপনি সারাদিন মাস্টার কী নিয়ে ঘোরেন না—একটি দরজার জন্য তোলেন, তারপর আবার সাধারণ চাবিধারী হয়ে যান।'), kind: 'tip' },
      ],
    },
    {
      h: l('How sudo works', 'sudo কীভাবে কাজ করে'),
      blocks: [
        { steps: [
          l('You write a normal command but put sudo in front of it: sudo apt update. sudo checks a config file (/etc/sudoers) to confirm your account is allowed to use it.', 'আপনি একটি সাধারণ কমান্ড লেখেন কিন্তু সামনে sudo দেন: sudo apt update। sudo একটি config ফাইল (/etc/sudoers) দেখে নিশ্চিত করে আপনার অ্যাকাউন্ট এটি ব্যবহারের অনুমতি পেয়েছে।'),
          l('It prompts for YOUR password (not root’s). This proves it is really you sitting at the keyboard, and stops someone walking up to an unlocked terminal from running admin commands.', 'এটি আপনার (root-এর নয়) পাসওয়ার্ড চায়। এটি প্রমাণ করে কীবোর্ডে সত্যিই আপনি বসে আছেন, আর একটি আনলক করা টার্মিনালের সামনে এসে কাউকে অ্যাডমিন কমান্ড চালানো থেকে থামায়।'),
          l('The single command runs as root, does its privileged work, and finishes. Your shell goes right back to being your normal user.', 'একক কমান্ডটি root হিসেবে চলে, তার বিশেষ-অধিকারের কাজ করে ও শেষ হয়। আপনার শেল সঙ্গে সঙ্গে আপনার সাধারণ user-এ ফিরে যায়।'),
          l('For a short window (usually a few minutes) sudo remembers you, so repeated commands do not each re-ask for the password.', 'অল্প সময়ের জন্য (সাধারণত কয়েক মিনিট) sudo আপনাকে মনে রাখে, তাই পরপর কমান্ডগুলো প্রতিবার আবার পাসওয়ার্ড চায় না।'),
        ] },
        { code: `$ apt update
Reading package lists...
E: Could not open lock file /var/lib/apt/lists/lock - Permission denied

$ sudo apt update             # same command, this time as root
[sudo] password for ada:      # type YOUR password, not root's
Reading package lists... Done

$ sudo !!                     # re-run the PREVIOUS command with sudo
$ sudo -l                     # list which commands you are allowed to run
$ sudo -i                     # open a full root shell (type: exit to leave)`, caption: l('The first command fails as a normal user; prefixing sudo runs the exact same command with root power.', 'প্রথম কমান্ডটি সাধারণ user হিসেবে ব্যর্থ হয়; sudo যোগ করলে ঠিক একই কমান্ড root ক্ষমতায় চলে।') },
      ],
    },
    {
      h: l('Key commands', 'মূল কমান্ড'),
      blocks: [
        { table: {
          head: [l('Goal', 'লক্ষ্য'), l('Command', 'কমান্ড')],
          rows: [
            [l('Run one command as root', 'একটি কমান্ড root হিসেবে চালান'), l('sudo <command>', 'sudo <command>')],
            [l('Re-run the last command with sudo', 'শেষ কমান্ড sudo দিয়ে আবার চালান'), l('sudo !!', 'sudo !!')],
            [l('See what you are allowed to run', 'কী চালাতে পারবেন দেখুন'), l('sudo -l', 'sudo -l')],
            [l('Open an interactive root shell', 'ইন্টারঅ্যাকটিভ root শেল খুলুন'), l('sudo -i', 'sudo -i')],
            [l('Edit a system file safely as root', 'সিস্টেম ফাইল নিরাপদে root হিসেবে এডিট'), l('sudo -e /etc/hosts', 'sudo -e /etc/hosts')],
          ],
        } },
        { note: l('sudo <command> runs one command; sudo -i opens a root shell where every command is root until you type exit. Prefer the single-command form — it is easy to forget you are "still root" in an open shell and run something dangerous by habit.', 'sudo <command> একটি কমান্ড চালায়; sudo -i একটি root শেল খোলে যেখানে exit না লেখা পর্যন্ত প্রতিটি কমান্ড root। একক-কমান্ড ফর্মটিই নিন—খোলা শেলে "এখনো root আছি" ভুলে গিয়ে অভ্যাসবশত বিপজ্জনক কিছু চালানো সহজ।'), kind: 'tip' },
      ],
    },
    {
      h: l('When and where to use it', 'কখন ও কোথায় ব্যবহার করবেন'),
      blocks: [
        { p: l('Use sudo for exactly the tasks that touch the whole system rather than your own files: installing or removing software (sudo apt install ...), editing files under /etc, starting and stopping services (sudo systemctl restart nginx), changing ownership of another user’s files, and reading protected logs. If a command fails with "Permission denied" and it genuinely needs admin rights, that is your cue to repeat it with sudo — often just sudo !!.', 'যেসব কাজ আপনার নিজের ফাইলের বদলে পুরো সিস্টেম ছোঁয় ঠিক সেগুলোতেই sudo নিন: সফটওয়্যার ইনস্টল বা রিমুভ (sudo apt install ...), /etc-এর নিচের ফাইল এডিট, সার্ভিস চালু ও বন্ধ (sudo systemctl restart nginx), অন্য user-এর ফাইলের মালিকানা বদল, ও সুরক্ষিত লগ পড়া। কোনো কমান্ড "Permission denied" দিয়ে ব্যর্থ হলে ও তার সত্যিই অ্যাডমিন অধিকার লাগলে, সেটাই sudo দিয়ে আবার চালানোর ইঙ্গিত—প্রায়ই শুধু sudo !!।') },
        { p: l('Just as important is when NOT to use it. Do not run your editor, your build, your git commands, or your everyday scripts under sudo "to avoid permission problems" — that usually creates root-owned files you later cannot edit as yourself, and it defeats the whole point of staying a normal user. The habit to build is: read the command, understand why it needs root, and only then add sudo. On your own machine you might be tempted to just log in as root; resist it, because the safety net of being a limited user is what saves you from your worst typo.', 'সমান গুরুত্বপূর্ণ হলো কখন এটি ব্যবহার করবেন না। "পারমিশন সমস্যা এড়াতে" আপনার এডিটর, build, git কমান্ড বা প্রতিদিনের স্ক্রিপ্ট sudo দিয়ে চালাবেন না—এটি সাধারণত root-মালিকানার ফাইল বানায় যা পরে নিজে হিসেবে এডিট করতে পারবেন না, আর সাধারণ user থাকার পুরো উদ্দেশ্যই নষ্ট করে। যে অভ্যাস গড়বেন: কমান্ডটি পড়ুন, কেন root লাগে বুঝুন, তারপরই sudo যোগ করুন। নিজের মেশিনে হয়তো শুধু root হিসেবে লগইন করতে ইচ্ছে হবে; সামলান, কারণ সীমিত user থাকার সেফটি-নেটই আপনাকে সবচেয়ে খারাপ টাইপো থেকে বাঁচায়।') },
      ],
    },
    {
      h: l('Common mistakes', 'সাধারণ ভুল'),
      blocks: [
        { list: [
          l('Blindly copy-pasting a sudo command from the internet without understanding what it does. Running unknown code as root is how a system gets wiped or backdoored — read every sudo line first.', 'এটি কী করে না বুঝে ইন্টারনেট থেকে একটি sudo কমান্ড অন্ধভাবে কপি-পেস্ট করা। অজানা কোড root হিসেবে চালানোই সিস্টেম মুছে যাওয়া বা backdoor হওয়ার পথ—প্রতিটি sudo লাইন আগে পড়ুন।'),
          l('Piping a random script straight into sudo bash (curl ... | sudo bash). You are handing root to code you never saw. Download it, read it, then run it.', 'একটি এলোমেলো স্ক্রিপ্ট সরাসরি sudo bash-এ পাইপ করা (curl ... | sudo bash)। আপনি না-দেখা কোডকে root দিচ্ছেন। ডাউনলোড করুন, পড়ুন, তারপর চালান।'),
          l('Using sudo for everything "to avoid errors", which litters your project with root-owned files and hides the real permission problem instead of fixing it.', '"এরর এড়াতে" সবকিছুতে sudo ব্যবহার, যা আপনার প্রকল্পে root-মালিকানার ফাইল ছড়ায় ও আসল পারমিশন সমস্যা ঠিক না করে লুকিয়ে ফেলে।'),
          l('Staying in a sudo -i root shell longer than needed, then forgetting you are root and running a destructive command out of habit.', 'দরকারের চেয়ে বেশিক্ষণ sudo -i root শেলে থাকা, তারপর root আছেন ভুলে গিয়ে অভ্যাসবশত একটি ধ্বংসাত্মক কমান্ড চালানো।'),
        ] },
      ],
    },
    {
      h: l('Remember in one line', 'এক লাইনে মনে রাখুন'),
      blocks: [
        { list: [
          l('root is the all-powerful account; sudo lets a normal user run one command as root, then step back down.', 'root হলো সর্বশক্তিমান অ্যাকাউন্ট; sudo একজন সাধারণ user-কে একটি কমান্ড root হিসেবে চালাতে দেয়, তারপর নেমে আসে।'),
          l('sudo asks for YOUR password and logs the action — use it only for tasks that truly need admin power.', 'sudo আপনার পাসওয়ার্ড চায় ও কাজটি লগ করে—শুধু যে কাজে সত্যিই অ্যাডমিন ক্ষমতা লাগে সেখানে ব্যবহার করুন।'),
          l('Always read a command before running it with sudo, and never pipe an unknown script into sudo bash.', 'sudo দিয়ে চালানোর আগে সবসময় কমান্ডটি পড়ুন, আর কখনো অজানা স্ক্রিপ্ট sudo bash-এ পাইপ করবেন না।'),
        ] },
      ],
    },
  ],

  // ── lx-processes · Processes (ps, top) ─────────────────────────────────────
  'lx-processes': [
    {
      h: l('What is a process?', 'প্রসেস কী?'),
      blocks: [
        { p: l('A process is a running program. When you launch anything — a text editor, a web server, even a single ls — Linux loads its code into memory and starts it running, and that live instance is a process. Every process gets a unique number called a PID (process ID) that the system uses to track and control it. The same program can run many times at once, and each run is a separate process with its own PID, its own memory, and its own owner.', 'একটি প্রসেস হলো একটি চলমান প্রোগ্রাম। আপনি যা-ই চালু করুন—একটি টেক্সট এডিটর, একটি ওয়েব সার্ভার, এমনকি একটি ls—লিনাক্স তার কোড মেমরিতে লোড করে চালাতে শুরু করে, আর সেই জীবন্ত instance-টিই একটি প্রসেস। প্রতিটি প্রসেস একটি ইউনিক নম্বর পায় যাকে PID (process ID) বলে, যা দিয়ে সিস্টেম এটিকে ট্র্যাক ও নিয়ন্ত্রণ করে। একই প্রোগ্রাম একসঙ্গে বহুবার চলতে পারে, আর প্রতিটি চালানো নিজস্ব PID, নিজস্ব মেমরি ও নিজস্ব owner সহ আলাদা প্রসেস।') },
        { p: l('Understanding processes matters because a server is really just a collection of them, and most "the machine is slow" or "the app is down" problems come down to a process using too much CPU or memory, or having crashed. The two tools you start with are ps, which prints a snapshot of processes right now, and top, which shows a live, constantly-updating view of which processes are using the most CPU and memory. Between them you can answer "what is running, and what is eating the machine?"', 'প্রসেস বোঝা জরুরি কারণ একটি সার্ভার আসলে এদেরই একটি সংগ্রহ, আর বেশিরভাগ "মেশিন ধীর" বা "অ্যাপ ডাউন" সমস্যা একটি প্রসেসের বেশি CPU বা মেমরি ব্যবহার, বা ক্র্যাশ হওয়ায় নেমে আসে। প্রথমে যে দুটি টুল ধরবেন তা হলো ps, যা এই মুহূর্তের প্রসেসের একটি স্ন্যাপশট ছাপে, আর top, যা কোন প্রসেস সবচেয়ে বেশি CPU ও মেমরি ব্যবহার করছে তার একটি লাইভ, অনবরত-আপডেট হওয়া দৃশ্য দেখায়। এই দুটি দিয়ে "কী চলছে, আর কী মেশিন খাচ্ছে?" উত্তর দিতে পারেন।') },
        { note: l('Picture a control-tower board showing every flight in the air. Each row is a process: its flight number (PID), how much fuel it is burning (CPU and memory), and who is flying it (the owner). ps prints one photo of the board; top is the live screen.', 'একটি কন্ট্রোল-টাওয়ার বোর্ড ভাবুন যা আকাশের প্রতিটি ফ্লাইট দেখায়। প্রতিটি সারি একটি প্রসেস: তার ফ্লাইট নম্বর (PID), কত জ্বালানি পোড়াচ্ছে (CPU ও মেমরি), আর কে চালাচ্ছে (owner)। ps বোর্ডের একটি ছবি ছাপে; top হলো লাইভ স্ক্রিন।'), kind: 'tip' },
      ],
    },
    {
      h: l('How to inspect processes', 'প্রসেস কীভাবে পরীক্ষা করবেন'),
      blocks: [
        { steps: [
          l('Run ps aux to list every process on the machine, with its owner, PID, CPU%, memory%, and the command that started it. It is a one-time snapshot — the moment it prints, it is already history.', 'মেশিনের প্রতিটি প্রসেস তার owner, PID, CPU%, মেমরি% ও যে কমান্ডে শুরু হয়েছে সহ তালিকা করতে ps aux চালান। এটি একবারের স্ন্যাপশট—ছাপার মুহূর্তেই এটি অতীত।'),
          l('Pipe it into grep to find one program: ps aux | grep nginx. Or use pgrep, which searches by name and prints just the PIDs.', 'একটি প্রোগ্রাম খুঁজতে এটি grep-এ পাইপ করুন: ps aux | grep nginx। অথবা pgrep ব্যবহার করুন, যা নামে খোঁজে ও শুধু PID ছাপে।'),
          l('Run top for a live view that refreshes every couple of seconds, sorted by CPU use so the heaviest process is at the top. Press q to quit; on many systems htop is a friendlier, colourful version.', 'একটি লাইভ দৃশ্যে top চালান যা কয়েক সেকেন্ড অন্তর রিফ্রেশ হয়, CPU ব্যবহারে সাজানো যাতে সবচেয়ে ভারী প্রসেসটি ওপরে থাকে। বেরোতে q চাপুন; অনেক সিস্টেমে htop একটি বন্ধুত্বপূর্ণ, রঙিন সংস্করণ।'),
          l('Use pstree to see processes as a family tree — which process started which — because processes have parents and children, and stopping a parent often affects its children.', 'প্রসেসকে একটি পরিবার-গাছ হিসেবে দেখতে pstree ব্যবহার করুন—কোন প্রসেস কোনটি শুরু করেছে—কারণ প্রসেসের parent ও child থাকে, আর একটি parent থামালে প্রায়ই তার child-দের প্রভাবিত করে।'),
        ] },
        { code: `$ ps aux | head -3
USER   PID %CPU %MEM    VSZ   RSS TTY   STAT START   TIME COMMAND
root     1  0.0  0.1 168404 11460 ?     Ss   09:00   0:02 /sbin/init
ada   2451  3.2  1.4 998244 58120 ?     Sl   10:11   0:07 node server.js

$ pgrep -a node          # find PIDs by program name
2451 node server.js

$ pstree -p ada          # the parent/child tree for user ada

$ top                    # live, refreshing view; press q to quit`, caption: l('ps aux is a snapshot with a column per fact (owner, PID, CPU%, MEM%, command); top is the same idea, live.', 'ps aux একটি স্ন্যাপশট, প্রতি তথ্যে একটি কলাম (owner, PID, CPU%, MEM%, command); top একই ধারণা, লাইভ।') },
      ],
    },
    {
      h: l('Key commands', 'মূল কমান্ড'),
      blocks: [
        { table: {
          head: [l('Goal', 'লক্ষ্য'), l('Command', 'কমান্ড')],
          rows: [
            [l('List all processes', 'সব প্রসেস তালিকা'), l('ps aux', 'ps aux')],
            [l('Live, refreshing monitor', 'লাইভ, রিফ্রেশিং মনিটর'), l('top', 'top')],
            [l('Find a process’s PID by name', 'নামে প্রসেসের PID খুঁজুন'), l('pgrep nginx', 'pgrep nginx')],
            [l('Search the full list for a program', 'তালিকায় একটি প্রোগ্রাম খুঁজুন'), l('ps aux | grep nginx', 'ps aux | grep nginx')],
            [l('See the process tree', 'প্রসেস ট্রি দেখুন'), l('pstree', 'pstree')],
          ],
        } },
      ],
    },
    {
      h: l('When and where to use it', 'কখন ও কোথায় ব্যবহার করবেন'),
      blocks: [
        { p: l('You reach for these tools the moment something feels wrong: the server is slow, a fan is spinning up, memory is full, or an app stopped responding. The usual flow is to open top first to see if one process is pinning the CPU or hoarding memory, note its PID and name, then use ps or pgrep to confirm details or find related processes. Once you know the offending PID, you can decide whether to investigate, restart, or (in the signals topic) stop it.', 'কিছু গড়বড় মনে হলেই এই টুল ধরবেন: সার্ভার ধীর, ফ্যান ঘুরছে, মেমরি পূর্ণ, বা একটি অ্যাপ সাড়া দিচ্ছে না। সাধারণ ধারা হলো আগে top খুলে দেখা একটি প্রসেস CPU আটকে রেখেছে নাকি মেমরি জমাচ্ছে, তার PID ও নাম টুকে নেওয়া, তারপর বিস্তারিত নিশ্চিত করতে বা সম্পর্কিত প্রসেস খুঁজতে ps বা pgrep ব্যবহার করা। দোষী PID জানলে ঠিক করতে পারেন তদন্ত করবেন, রিস্টার্ট করবেন, নাকি (signals টপিকে) থামাবেন।') },
        { p: l('These tools are also how you confirm a service is actually running. "Did my server start?" is answered by pgrep -a node or ps aux | grep myapp. And before you kill anything, they let you find the exact PID so you act on the right process — much safer than killing by name, which can catch several unrelated programs that happen to share a word.', 'একটি সার্ভিস সত্যিই চলছে কি না তা নিশ্চিত করার উপায়ও এই টুল। "আমার সার্ভার চালু হয়েছে?" উত্তর দেয় pgrep -a node বা ps aux | grep myapp। আর কিছু kill করার আগে এগুলো ঠিক PID খুঁজে দেয় যাতে আপনি সঠিক প্রসেসে কাজ করেন—নামে kill করার চেয়ে অনেক নিরাপদ, যা একটি শব্দ শেয়ার করা কয়েকটি অসম্পর্কিত প্রোগ্রাম ধরে ফেলতে পারে।') },
      ],
    },
    {
      h: l('Common mistakes', 'সাধারণ ভুল'),
      blocks: [
        { list: [
          l('Trusting a single snapshot. A process may spike for a fraction of a second between samples, or look idle at the instant you looked — watch top for a while before drawing conclusions.', 'একটি স্ন্যাপশটে ভরসা করা। একটি প্রসেস নমুনার মাঝে এক সেকেন্ডের ভগ্নাংশে স্পাইক করতে পারে, বা যে মুহূর্তে দেখলেন তখন idle দেখাতে পারে—সিদ্ধান্তে আসার আগে কিছুক্ষণ top দেখুন।'),
          l('Killing a process "by name" and accidentally stopping several unrelated ones that share that name. Find the exact PID first with ps or pgrep.', 'নাম দিয়ে একটি প্রসেস kill করে ভুলবশত সেই নাম শেয়ার করা কয়েকটি অসম্পর্কিত প্রসেস থামানো। আগে ps বা pgrep দিয়ে ঠিক PID খুঁজুন।'),
          l('Reading CPU% and memory% as the same thing. A process can use almost no CPU yet slowly leak memory until the machine swaps — check both columns.', 'CPU% ও মেমরি%-কে একই ভাবা। একটি প্রসেস প্রায় কোনো CPU ব্যবহার না করেও ধীরে মেমরি লিক করতে পারে যতক্ষণ না মেশিন swap করে—দুটো কলামই দেখুন।'),
          l('Forgetting that ps aux without a filter can print hundreds of lines. Pipe it through grep, less, or head so you actually find what you are looking for.', 'ভুলে যাওয়া যে ফিল্টার ছাড়া ps aux শত শত লাইন ছাপতে পারে। grep, less বা head-এ পাইপ করুন যাতে আপনি যা খুঁজছেন তা সত্যিই পান।'),
        ] },
      ],
    },
    {
      h: l('Remember in one line', 'এক লাইনে মনে রাখুন'),
      blocks: [
        { list: [
          l('A process is a running program with a unique PID; a server is basically a pile of processes.', 'একটি প্রসেস হলো একটি ইউনিক PID সহ চলমান প্রোগ্রাম; একটি সার্ভার মূলত প্রসেসের একটি স্তূপ।'),
          l('ps aux is a snapshot, top is a live view — use them to find what is running and what is eating resources.', 'ps aux একটি স্ন্যাপশট, top একটি লাইভ দৃশ্য—কী চলছে ও কী রিসোর্স খাচ্ছে খুঁজতে ব্যবহার করুন।'),
          l('Always find the exact PID before acting, and do not trust one snapshot — watch for a moment.', 'কাজ করার আগে সবসময় ঠিক PID খুঁজুন, আর একটি স্ন্যাপশটে ভরসা করবেন না—একটু দেখুন।'),
        ] },
      ],
    },
  ],

  // ── lx-signals · Signals & killing processes ───────────────────────────────
  'lx-signals': [
    {
      h: l('What are signals?', 'সিগন্যাল কী?'),
      blocks: [
        { p: l('A signal is a short message the operating system delivers to a running process to tell it something happened or ask it to do something. When you press Ctrl+C in the terminal, you are actually sending the SIGINT (interrupt) signal; when you run kill, you send a signal by hand. Each signal has a name (like SIGTERM) and a number (like 15), and a process can react to most of them however it likes — pausing, reloading its config, cleaning up, or shutting down.', 'একটি সিগন্যাল হলো অপারেটিং সিস্টেম একটি চলমান প্রসেসকে পাঠানো একটি ছোট বার্তা—কিছু ঘটেছে জানাতে বা কিছু করতে বলতে। টার্মিনালে Ctrl+C চাপলে আপনি আসলে SIGINT (interrupt) সিগন্যাল পাঠাচ্ছেন; kill চালালে আপনি হাতে একটি সিগন্যাল পাঠান। প্রতিটি সিগন্যালের একটি নাম (যেমন SIGTERM) ও একটি নম্বর (যেমন 15) আছে, আর একটি প্রসেস এদের বেশিরভাগে নিজের ইচ্ছেমতো সাড়া দিতে পারে—থামা, config রিলোড, পরিষ্কার, বা বন্ধ হওয়া।') },
        { p: l('The everyday use of signals is stopping a process. The command is confusingly named kill, but kill really means "send a signal" — by default it sends SIGTERM, a polite request to shut down. The point of signals is that stopping a program is not one blunt action: there is a gentle "please finish up and exit" and a brutal "stop right now no matter what", and knowing the difference protects your data.', 'সিগন্যালের প্রতিদিনের ব্যবহার হলো একটি প্রসেস থামানো। কমান্ডটির নাম বিভ্রান্তিকরভাবে kill, কিন্তু kill আসলে মানে "একটি সিগন্যাল পাঠাও"—ডিফল্টে এটি SIGTERM পাঠায়, বন্ধ হওয়ার একটি ভদ্র অনুরোধ। সিগন্যালের মূল কথা হলো একটি প্রোগ্রাম থামানো একটি ভোঁতা কাজ নয়: একটি নরম "দয়া করে শেষ করে বেরোও" আর একটি কঠোর "যা-ই হোক এখনই থামো" আছে, আর পার্থক্য জানা আপনার ডেটা রক্ষা করে।') },
        { note: l('SIGTERM is a polite "please close up shop" — the process can lock the till, put things away, and leave cleanly. SIGKILL (kill -9) is pulling the power plug: instant, but whatever it was in the middle of is left half-done.', 'SIGTERM হলো একটি ভদ্র "দয়া করে দোকান বন্ধ করো"—প্রসেস ক্যাশবাক্স লক করে, জিনিস গুছিয়ে পরিষ্কারভাবে বেরোতে পারে। SIGKILL (kill -9) হলো পাওয়ার প্লাগ টানা: তাৎক্ষণিক, কিন্তু যা করছিল তা অর্ধেক-করা অবস্থায় থেকে যায়।'), kind: 'tip' },
      ],
    },
    {
      h: l('How killing a process works', 'একটি প্রসেস kill কীভাবে কাজ করে'),
      blocks: [
        { steps: [
          l('First find the target’s PID with ps, pgrep, or top — you signal a process by its number, so you need the right one.', 'প্রথমে ps, pgrep বা top দিয়ে লক্ষ্যের PID খুঁজুন—আপনি একটি প্রসেসকে তার নম্বর দিয়ে সিগন্যাল দেন, তাই সঠিকটি দরকার।'),
          l('Run kill <pid>. With no options this sends SIGTERM (15): a request to shut down. A well-behaved program catches it, saves its state, closes files, and exits on its own.', 'kill <pid> চালান। কোনো অপশন ছাড়া এটি SIGTERM (15) পাঠায়: বন্ধ হওয়ার একটি অনুরোধ। একটি ভালো-আচরণের প্রোগ্রাম এটি ধরে, স্টেট সেভ করে, ফাইল বন্ধ করে ও নিজে থেকে বেরোয়।'),
          l('Wait a moment and check whether it is gone (ps or pgrep again). Most processes stop within a second or two of SIGTERM.', 'একটু অপেক্ষা করে দেখুন এটি গেছে কি না (আবার ps বা pgrep)। বেশিরভাগ প্রসেস SIGTERM-এর এক-দুই সেকেন্ডের মধ্যে থামে।'),
          l('Only if it is truly stuck and ignoring SIGTERM, escalate to kill -9 <pid>, which sends SIGKILL. The kernel removes the process immediately, giving it no chance to clean up.', 'শুধু যদি এটি সত্যিই আটকে থাকে ও SIGTERM উপেক্ষা করে, তবেই kill -9 <pid>-এ যান, যা SIGKILL পাঠায়। কার্নেল প্রসেসটি সঙ্গে সঙ্গে সরিয়ে দেয়, পরিষ্কার হওয়ার কোনো সুযোগ না দিয়ে।'),
        ] },
        { code: `$ pgrep -a node
2451 node server.js

$ kill 2451           # sends SIGTERM (15): "please shut down cleanly"
$ kill -TERM 2451     # exactly the same as the line above

# ... only if it ignores TERM and is truly stuck:
$ kill -9 2451        # sends SIGKILL (9): forced, no cleanup
$ kill -KILL 2451     # the same signal, named instead of numbered

$ pkill node          # signal every process whose name matches "node"
$ kill -l             # list all signal names and their numbers`, caption: l('Start with plain kill (SIGTERM) and give it a second; reach for kill -9 (SIGKILL) only when TERM fails.', 'সাধারণ kill (SIGTERM) দিয়ে শুরু করে একটু সময় দিন; TERM ব্যর্থ হলে তবেই kill -9 (SIGKILL) নিন।') },
      ],
    },
    {
      h: l('SIGTERM vs SIGKILL', 'SIGTERM বনাম SIGKILL'),
      blocks: [
        { p: l('These are the two signals you will use most, and the difference between them is the single most important thing in this topic. One asks; the other forces.', 'এই দুটি সিগন্যাল আপনি সবচেয়ে বেশি ব্যবহার করবেন, আর এদের মধ্যে পার্থক্যই এই টপিকের সবচেয়ে গুরুত্বপূর্ণ জিনিস। একটি অনুরোধ করে; অন্যটি জোর করে।') },
        { table: {
          head: [l('Aspect', 'দিক'), l('SIGTERM — kill <pid>', 'SIGTERM — kill <pid>'), l('SIGKILL — kill -9 <pid>', 'SIGKILL — kill -9 <pid>')],
          rows: [
            [l('Number', 'নম্বর'), l('15', '15'), l('9', '9')],
            [l('What it does', 'কী করে'), l('Politely asks the process to shut down.', 'প্রসেসকে ভদ্রভাবে বন্ধ হতে বলে।'), l('Forces the kernel to remove the process at once.', 'কার্নেলকে প্রসেসটি সঙ্গে সঙ্গে সরাতে বাধ্য করে।')],
            [l('Can it be caught?', 'ধরা যায়?'), l('Yes — the process can run cleanup handlers.', 'হ্যাঁ—প্রসেস cleanup handler চালাতে পারে।'), l('No — it cannot be caught, blocked, or ignored.', 'না—এটি ধরা, আটকানো বা উপেক্ষা করা যায় না।')],
            [l('Cleanup', 'পরিষ্কার'), l('Saves state, flushes files, releases locks.', 'স্টেট সেভ, ফাইল flush, লক ছেড়ে দেয়।'), l('None — killed instantly, mid-work.', 'কিছুই না—কাজের মাঝে তাৎক্ষণিক kill।')],
            [l('Risk', 'ঝুঁকি'), l('A stuck process may ignore it or take time.', 'একটি আটকে থাকা প্রসেস উপেক্ষা করতে বা সময় নিতে পারে।'), l('Corrupt files, lost data, stale locks.', 'নষ্ট ফাইল, হারানো ডেটা, বাসি লক।')],
            [l('Use when', 'কখন ব্যবহার'), l('Always try this first.', 'সবসময় আগে এটি চেষ্টা করুন।'), l('Only when SIGTERM has failed.', 'শুধু SIGTERM ব্যর্থ হলে।')],
          ],
        } },
        { note: l('Because SIGKILL gives a process no chance to save, using kill -9 first can leave half-written files, a corrupt database, or lock files that block the program from starting again. Treat -9 as the last resort, not the default.', 'যেহেতু SIGKILL প্রসেসকে সেভের কোনো সুযোগ দেয় না, প্রথমেই kill -9 ব্যবহারে অর্ধ-লেখা ফাইল, একটি নষ্ট ডেটাবেস, বা প্রোগ্রামটি আবার চালু হওয়া আটকানো লক ফাইল থেকে যেতে পারে। -9-কে শেষ উপায় ভাবুন, ডিফল্ট নয়।'), kind: 'warn' },
      ],
    },
    {
      h: l('Key commands', 'মূল কমান্ড'),
      blocks: [
        { table: {
          head: [l('Goal', 'লক্ষ্য'), l('Command', 'কমান্ড')],
          rows: [
            [l('Graceful stop (SIGTERM)', 'সুন্দরভাবে থামান (SIGTERM)'), l('kill <pid>', 'kill <pid>')],
            [l('Force kill (SIGKILL)', 'জোর করে kill (SIGKILL)'), l('kill -9 <pid>', 'kill -9 <pid>')],
            [l('Kill every match by name', 'নামে প্রতিটি ম্যাচ kill'), l('pkill nginx', 'pkill nginx')],
            [l('List all signals', 'সব সিগন্যাল তালিকা'), l('kill -l', 'kill -l')],
          ],
        } },
      ],
    },
    {
      h: l('When and where to use it', 'কখন ও কোথায় ব্যবহার করবেন'),
      blocks: [
        { p: l('You send signals whenever a program will not stop on its own or you need to restart it. A frozen editor, a runaway script eating 100% CPU, a server that ignored a normal shutdown — all are jobs for kill. The golden rule is to escalate gently: try kill <pid> (SIGTERM) first and give the process a couple of seconds. The vast majority of programs stop cleanly here, saving their work. Reserve kill -9 for the stubborn case that genuinely ignores TERM.', 'একটি প্রোগ্রাম নিজে না থামলে বা রিস্টার্ট করতে হলেই আপনি সিগন্যাল পাঠান। একটি জমে যাওয়া এডিটর, ১০০% CPU খাওয়া একটি নিয়ন্ত্রণহীন স্ক্রিপ্ট, একটি স্বাভাবিক shutdown উপেক্ষা করা সার্ভার—সবই kill-এর কাজ। সোনালি নিয়ম হলো ধীরে ধীরে বাড়ানো: আগে kill <pid> (SIGTERM) চেষ্টা করুন ও প্রসেসকে কয়েক সেকেন্ড দিন। বেশিরভাগ প্রোগ্রাম এখানেই পরিষ্কারভাবে থামে, কাজ সেভ করে। সত্যিই TERM উপেক্ষা করা একগুঁয়ে ক্ষেত্রের জন্য kill -9 রেখে দিন।') },
        { p: l('Some signals are not about killing at all. SIGHUP (kill -HUP <pid>, or -1) traditionally tells a service to reload its configuration without restarting — handy for web servers after a config edit. To stop many copies of one program at once you can use pkill <name> or killall <name>, but do this carefully: matching by name can hit more processes than you meant, so on a shared server it is safer to target exact PIDs.', 'কিছু সিগন্যাল kill নিয়ে নয়ই। SIGHUP (kill -HUP <pid>, বা -1) ঐতিহ্যগতভাবে একটি সার্ভিসকে রিস্টার্ট না করে config রিলোড করতে বলে—config এডিটের পর ওয়েব সার্ভারে কাজের। একটি প্রোগ্রামের অনেক কপি একসঙ্গে থামাতে pkill <name> বা killall <name> ব্যবহার করতে পারেন, তবে সাবধানে করুন: নামে ম্যাচ ভেবেছিলেন তার চেয়ে বেশি প্রসেস ধরতে পারে, তাই একটি শেয়ার্ড সার্ভারে ঠিক PID লক্ষ্য করা নিরাপদ।') },
      ],
    },
    {
      h: l('Common mistakes', 'সাধারণ ভুল'),
      blocks: [
        { list: [
          l('Reaching straight for kill -9, skipping the graceful SIGTERM the process needed to save its data. It works, but it can corrupt exactly what you were trying to protect.', 'সরাসরি kill -9 ব্যবহার, প্রসেসের ডেটা সেভের দরকারি ভদ্র SIGTERM এড়িয়ে যাওয়া। কাজ করে, কিন্তু আপনি যা রক্ষা করতে চাইছিলেন ঠিক তা নষ্ট করতে পারে।'),
          l('Killing by name with pkill/killall and stopping several unrelated processes that share a word in their name. Prefer the exact PID on a busy system.', 'pkill/killall দিয়ে নামে kill করে নামে একটি শব্দ শেয়ার করা কয়েকটি অসম্পর্কিত প্রসেস থামানো। ব্যস্ত সিস্টেমে ঠিক PID নিন।'),
          l('Trying to kill a process you do not own without sudo — you can only signal your own processes unless you are root.', 'নিজের নয় এমন একটি প্রসেস sudo ছাড়া kill করার চেষ্টা—root না হলে আপনি শুধু নিজের প্রসেসেই সিগন্যাল দিতে পারেন।'),
          l('Expecting kill -9 to always cure a hung process. A process stuck in the kernel (for example on dead disk I/O) can be un-killable even by SIGKILL until the I/O clears.', 'ধরে নেওয়া kill -9 সবসময় একটি হ্যাং প্রসেস সারায়। কার্নেলে আটকে থাকা একটি প্রসেস (যেমন মৃত ডিস্ক I/O-তে) I/O না ছাড়া পর্যন্ত SIGKILL দিয়েও un-killable হতে পারে।'),
        ] },
      ],
    },
    {
      h: l('Remember in one line', 'এক লাইনে মনে রাখুন'),
      blocks: [
        { list: [
          l('A signal is a message to a process; kill really means "send a signal", and by default that signal is SIGTERM.', 'একটি সিগন্যাল হলো একটি প্রসেসকে বার্তা; kill আসলে মানে "সিগন্যাল পাঠাও", আর ডিফল্টে সেই সিগন্যাল SIGTERM।'),
          l('kill <pid> (SIGTERM) asks politely and lets it clean up; kill -9 (SIGKILL) forces it with no cleanup.', 'kill <pid> (SIGTERM) ভদ্রভাবে অনুরোধ করে ও পরিষ্কার হতে দেয়; kill -9 (SIGKILL) কোনো পরিষ্কার ছাড়াই জোর করে।'),
          l('Always try SIGTERM first; keep SIGKILL as the last resort, and target the exact PID.', 'সবসময় আগে SIGTERM চেষ্টা করুন; SIGKILL শেষ উপায় রাখুন, আর ঠিক PID লক্ষ্য করুন।'),
        ] },
      ],
    },
  ],
}
