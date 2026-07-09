// Deep, bilingual (English / Bangla) teaching guides for the Docker course —
// Persisting & sharing data, backups, and container networking. Shape mirrors
// app/course-guides.js and app/guides/git/a.js: each guide is an array of
// sections { h, blocks }, rendered by GuideBlock in app/LearningApp.js.
// Block types: { p }, { list }, { steps }, { table:{head,rows} }, { note, kind }, { code, caption }.
// Facts (definitions, analogies, commands, trade-offs, mistakes) come from app/courses/docker.js.

const l = (en, bn) => ({ en, bn })

export default {
  // ── dk-persistence · Persisting & sharing data ────────────────────────────
  'dk-persistence': [
    {
      h: l('What is data persistence in Docker?', 'ডকারে ডেটা পারসিস্টেন্স কী?'),
      blocks: [
        { p: l('A container is ephemeral by design. When you remove it — or when it crashes and the platform recreates it — everything written inside the container’s own writable layer disappears with it. That is a feature, not a bug: it is exactly what lets you throw a container away and start a clean one in seconds. But real applications produce data you must keep: database rows, uploaded files, generated reports. Anything you need to survive a container’s death, or share between several containers, belongs in a volume, not inside the container.', 'একটি কন্টেইনার ডিজাইনগতভাবেই ক্ষণস্থায়ী। আপনি যখন এটি রিমুভ করেন—বা এটি ক্র্যাশ করলে প্ল্যাটফর্ম আবার বানায়—কন্টেইনারের নিজের লেখনযোগ্য লেয়ারে লেখা সবকিছু তার সঙ্গে মুছে যায়। এটি বাগ নয়, বরং একটি সুবিধা: এ কারণেই আপনি একটি কন্টেইনার ফেলে দিয়ে কয়েক সেকেন্ডে একটি পরিষ্কার কন্টেইনার শুরু করতে পারেন। কিন্তু বাস্তব অ্যাপ্লিকেশন এমন ডেটা তৈরি করে যা রাখতেই হবে: ডেটাবেস রো, আপলোড করা ফাইল, তৈরি করা রিপোর্ট। কন্টেইনারের মৃত্যুর পরও যা টিকতে হবে, বা কয়েকটি কন্টেইনারের মধ্যে শেয়ার করতে হবে, তা কন্টেইনারের ভেতরে নয়, একটি volume-এ থাকে।') },
        { p: l('A volume is storage that Docker manages outside any single container’s lifecycle. You create it once, mount it into one or more containers at a path, and the application reads and writes there as if it were an ordinary directory. Because the volume lives independently, you can delete the container, upgrade its image, or run three containers against the same data — and the data stays put. This separation of "the program" (the container) from "its state" (the volume) is the core idea behind running stateful software in Docker.', 'একটি volume হলো এমন স্টোরেজ যা ডকার কোনো একক কন্টেইনারের লাইফসাইকেলের বাইরে পরিচালনা করে। আপনি একবার এটি তৈরি করেন, এক বা একাধিক কন্টেইনারে একটি পাথে মাউন্ট করেন, আর অ্যাপ্লিকেশন সেখানে এমনভাবে পড়ে ও লেখে যেন এটি একটি সাধারণ ডিরেক্টরি। volume স্বাধীনভাবে থাকে বলে আপনি কন্টেইনার মুছতে, তার image আপগ্রেড করতে, বা একই ডেটার বিপরীতে তিনটি কন্টেইনার চালাতে পারেন—আর ডেটা জায়গায় থাকে। "প্রোগ্রাম" (কন্টেইনার) থেকে "তার state" (volume) আলাদা করার এই ধারণাই ডকারে stateful সফটওয়্যার চালানোর মূল ভিত্তি।') },
        { note: l('Think of a hotel. The room (the container) is cleaned and reset between guests — nothing you leave there is guaranteed to survive. The safe (the volume) keeps your valuables no matter who checks into the room next. Keep state in the safe, never in the room.', 'একটি হোটেল ভাবুন। রুম (কন্টেইনার) অতিথিদের মধ্যে পরিষ্কার ও রিসেট হয়—সেখানে রেখে যাওয়া কিছুই টিকে থাকার নিশ্চয়তা নেই। সেফ (volume) আপনার মূল্যবান জিনিস রাখে, পরে যে-ই রুমে উঠুক না কেন। state সেফে রাখুন, কখনো রুমে নয়।'), kind: 'tip' },
      ],
    },
    {
      h: l('How persistence works, step by step', 'পারসিস্টেন্স কীভাবে কাজ করে, ধাপে ধাপে'),
      blocks: [
        { steps: [
          l('Create a named volume with docker volume create. Docker allocates a managed storage area on the host, identified by the name you give it.', 'docker volume create দিয়ে একটি named volume তৈরি করুন। ডকার হোস্টে একটি পরিচালিত স্টোরেজ এলাকা বরাদ্দ করে, যা আপনার দেওয়া নামে চিহ্নিত।'),
          l('Mount the volume into a container with -v name:/path. The application inside sees /path as a normal directory and writes its state there.', '-v name:/path দিয়ে volume-টি একটি কন্টেইনারে মাউন্ট করুন। ভেতরের অ্যাপ্লিকেশন /path-কে একটি সাধারণ ডিরেক্টরি হিসেবে দেখে ও সেখানে তার state লেখে।'),
          l('Remove the container whenever you like. Because the data was written to the volume, not the container’s layer, none of it is lost.', 'যখন খুশি কন্টেইনার রিমুভ করুন। ডেটা কন্টেইনারের লেয়ারে নয়, volume-এ লেখা হয়েছিল বলে কিছুই হারায় না।'),
          l('Start a fresh container on the same volume. It picks up exactly the data the previous one left behind — every row, every file.', 'একই volume-এ একটি নতুন কন্টেইনার শুরু করুন। এটি আগেরটির রেখে যাওয়া ঠিক সেই ডেটা তুলে নেয়—প্রতিটি রো, প্রতিটি ফাইল।'),
          l('To share data, mount the same volume into several containers at once — they all read and write the one underlying store.', 'ডেটা শেয়ার করতে, একই volume একসঙ্গে কয়েকটি কন্টেইনারে মাউন্ট করুন—তারা সবাই সেই একটি স্টোরে পড়ে ও লেখে।'),
        ] },
        { code: `# 1. create a named volume that outlives any container
docker volume create pgdata

# 2. run a database that writes its state into the volume
docker run -d --name db \\
  -e POSTGRES_PASSWORD=secret \\
  -v pgdata:/var/lib/postgresql/data \\
  postgres:16

# 3. destroy the container — the data stays in the volume
docker rm -f db

# 4. recreate it on the same volume; every row is still there
docker run -d --name db \\
  -e POSTGRES_PASSWORD=secret \\
  -v pgdata:/var/lib/postgresql/data \\
  postgres:16`, caption: l('The container is disposable; pgdata is not. Remove and recreate db as often as you like — the database keeps its data.', 'কন্টেইনার ফেলে-দেওয়া-যোগ্য; pgdata নয়। যত খুশি db রিমুভ ও পুনঃতৈরি করুন—ডেটাবেস তার ডেটা রাখে।') },
      ],
    },
    {
      h: l('Named volumes vs the container layer', 'named volume বনাম কন্টেইনার লেয়ার'),
      blocks: [
        { p: l('It helps to see the two places data can live side by side. Writing to the container’s own filesystem feels identical while the container runs, but it is tied to that one container’s life. A volume is decoupled, portable, and the thing you actually back up.', 'ডেটা যে দুটি জায়গায় থাকতে পারে তা পাশাপাশি দেখা সাহায্য করে। কন্টেইনারের নিজের ফাইলসিস্টেমে লেখা কন্টেইনার চলার সময় হুবহু একই মনে হয়, কিন্তু তা সেই একটি কন্টেইনারের জীবনের সঙ্গে বাঁধা। একটি volume আলাদা, পোর্টেবল, এবং যেটা আপনি আসলে ব্যাকআপ করেন।') },
        { table: {
          head: [l('Aspect', 'দিক'), l('Container layer', 'কন্টেইনার লেয়ার'), l('Named volume', 'named volume')],
          rows: [
            [l('Survives docker rm?', 'docker rm-এ টেকে?'), l('No — deleted with the container', 'না—কন্টেইনারের সঙ্গে মুছে যায়'), l('Yes — independent of the container', 'হ্যাঁ—কন্টেইনার থেকে স্বাধীন')],
            [l('Shareable between containers', 'কন্টেইনারের মধ্যে শেয়ারযোগ্য'), l('No', 'না'), l('Yes — mount it into several', 'হ্যাঁ—কয়েকটিতে মাউন্ট করুন')],
            [l('Managed by Docker', 'ডকার পরিচালিত'), l('Part of the writable layer', 'লেখনযোগ্য লেয়ারের অংশ'), l('Yes, under docker volume', 'হ্যাঁ, docker volume-এর অধীনে')],
            [l('Good for', 'উপযুক্ত'), l('Temporary scratch data', 'অস্থায়ী স্ক্র্যাচ ডেটা'), l('Databases, uploads, anything to keep', 'ডেটাবেস, আপলোড, রাখার মতো সব')],
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
            [l('Create a volume', 'ভলিউম তৈরি'), l('docker volume create data', 'docker volume create data')],
            [l('Mount it into a container', 'কন্টেইনারে মাউন্ট'), l('-v data:/var/lib', '-v data:/var/lib')],
            [l('List volumes', 'ভলিউম তালিকা'), l('docker volume ls', 'docker volume ls')],
            [l('Remove a volume', 'ভলিউম রিমুভ'), l('docker volume rm data', 'docker volume rm data')],
          ],
        } },
        { note: l('docker volume rm permanently deletes the data inside the volume, and it will refuse while a container is still using it. Removing a volume is not undoable — there is no trash can.', 'docker volume rm volume-এর ভেতরের ডেটা স্থায়ীভাবে মুছে ফেলে, এবং কোনো কন্টেইনার এখনো এটি ব্যবহার করলে এটি অস্বীকার করবে। একটি volume রিমুভ করা ফেরানো যায় না—কোনো ট্র্যাশ ক্যান নেই।'), kind: 'warn' },
      ],
    },
    {
      h: l('When and where to use volumes', 'কখন ও কোথায় ভলিউম ব্যবহার করবেন'),
      blocks: [
        { p: l('Reach for a volume the moment a container produces state you cannot afford to lose, or state that more than one container needs to see. Design your applications so that all durable data — the database directory, the uploads folder, a cache you want to keep warm — is written to a mounted volume path, never to a random directory in the container. When you do this consistently, containers become truly disposable: you can upgrade the Postgres image from 15 to 16 simply by stopping the old container and starting a new one on the same pgdata volume.', 'কন্টেইনার যখন এমন state তৈরি করে যা হারানোর সামর্থ্য আপনার নেই, বা একাধিক কন্টেইনারের দেখা দরকার এমন state, তখনই একটি volume নিন। আপনার অ্যাপ্লিকেশন এমনভাবে ডিজাইন করুন যাতে সব টেকসই ডেটা—ডেটাবেস ডিরেক্টরি, আপলোড ফোল্ডার, গরম রাখতে চাওয়া একটি cache—একটি মাউন্ট করা volume পাথে লেখা হয়, কখনো কন্টেইনারের এলোমেলো ডিরেক্টরিতে নয়। এটি ধারাবাহিকভাবে করলে কন্টেইনার সত্যিই ফেলে-দেওয়া-যোগ্য হয়: একই pgdata volume-এ পুরনো কন্টেইনার থামিয়ে নতুন একটি শুরু করেই আপনি Postgres image 15 থেকে 16-তে আপগ্রেড করতে পারেন।') },
        { list: [
          l('A database container (Postgres, MySQL, Mongo) → always mount its data directory on a named volume.', 'একটি ডেটাবেস কন্টেইনার (Postgres, MySQL, Mongo) → এর ডেটা ডিরেক্টরি সবসময় একটি named volume-এ মাউন্ট করুন।'),
          l('User-uploaded files or generated media → a volume, so a redeploy does not wipe them.', 'ব্যবহারকারীর আপলোড করা ফাইল বা তৈরি মিডিয়া → একটি volume, যাতে redeploy সেগুলো মুছে না ফেলে।'),
          l('Two containers that must read the same files (an app and a sidecar) → mount one shared volume into both.', 'দুটি কন্টেইনার যাদের একই ফাইল পড়তে হবে (একটি অ্যাপ ও একটি sidecar) → একটি শেয়ার্ড volume দুটিতেই মাউন্ট করুন।'),
          l('Purely temporary scratch data you never need again → the container layer is fine; no volume needed.', 'সম্পূর্ণ অস্থায়ী স্ক্র্যাচ ডেটা যা আর কখনো লাগবে না → কন্টেইনার লেয়ারই যথেষ্ট; volume লাগে না।'),
        ] },
      ],
    },
    {
      h: l('Sharing data safely', 'নিরাপদে ডেটা শেয়ার করা'),
      blocks: [
        { p: l('Mounting one volume into several containers is powerful but comes with a sharp edge: if two containers write to the same files at the same time, you can corrupt the data. Volumes give you shared storage, not automatic coordination. For read-heavy sharing this is usually fine, and you can mount a volume read-only for consumers. For write sharing, let exactly one container own the writes, or use software (like a database) that is built to handle concurrent access itself.', 'একটি volume কয়েকটি কন্টেইনারে মাউন্ট করা শক্তিশালী কিন্তু এর একটি ধারালো দিক আছে: দুটি কন্টেইনার একই সময়ে একই ফাইলে লিখলে ডেটা নষ্ট হতে পারে। volume আপনাকে শেয়ার্ড স্টোরেজ দেয়, স্বয়ংক্রিয় সমন্বয় নয়। পড়া-বেশি শেয়ারিংয়ে এটি সাধারণত ঠিক, এবং আপনি কনজিউমারদের জন্য একটি volume read-only মাউন্ট করতে পারেন। লেখা শেয়ারিংয়ে, ঠিক একটি কন্টেইনারকে লেখার মালিক হতে দিন, অথবা এমন সফটওয়্যার (যেমন একটি ডেটাবেস) ব্যবহার করুন যা নিজেই একসঙ্গে অ্যাক্সেস সামলাতে তৈরি।') },
        { note: l('You can also back up a live volume with a throwaway helper container — a technique covered in the next lesson. In short: docker run --rm mounts the volume and archives it to a file on the host.', 'একটি চলমান volume আপনি একটি ফেলে-দেওয়া হেল্পার কন্টেইনার দিয়েও ব্যাকআপ করতে পারেন—পরের পাঠে এই কৌশল আছে। সংক্ষেপে: docker run --rm volume মাউন্ট করে হোস্টের একটি ফাইলে আর্কাইভ করে।'), kind: 'tip' },
        { code: `# a throwaway alpine container archives the volume to a host file
docker run --rm \\
  -v pgdata:/data \\
  -v "$PWD":/backup \\
  alpine tar czf /backup/pgdata.tar.gz -C /data .`, caption: l('The --rm container mounts pgdata read/write and writes a compressed copy into the current host directory, then deletes itself.', '--rm কন্টেইনার pgdata পড়া/লেখায় মাউন্ট করে বর্তমান হোস্ট ডিরেক্টরিতে একটি কম্প্রেসড কপি লেখে, তারপর নিজেকে মুছে ফেলে।') },
      ],
    },
    {
      h: l('Common mistakes', 'সাধারণ ভুল'),
      blocks: [
        { list: [
          l('Treating a container as permanent storage, then losing all state the first time it must be recreated or rescheduled.', 'একটি কন্টেইনারকে স্থায়ী স্টোরেজ ভাবা, তারপর প্রথমবার পুনঃতৈরি বা পুনঃশিডিউলের সময় সব state হারানো।'),
          l('Writing important data to a path that is not on a mounted volume — it silently lands in the disposable container layer.', 'গুরুত্বপূর্ণ ডেটা এমন একটি পাথে লেখা যা মাউন্ট করা volume-এ নেই—এটি নীরবে ফেলে-দেওয়া-যোগ্য কন্টেইনার লেয়ারে যায়।'),
          l('Sharing one writable volume between two writers and corrupting data through concurrent writes.', 'দুটি লেখকের মধ্যে একটি লেখনযোগ্য volume শেয়ার করে একসঙ্গে-লেখার মাধ্যমে ডেটা নষ্ট করা।'),
          l('Running docker volume rm (or compose down -v) on the wrong environment and deleting production data with no backup.', 'ভুল এনভায়রনমেন্টে docker volume rm (বা compose down -v) চালিয়ে ব্যাকআপ ছাড়াই প্রোডাকশন ডেটা মুছে ফেলা।'),
        ] },
      ],
    },
    {
      h: l('Remember in one line', 'এক লাইনে মনে রাখুন'),
      blocks: [
        { list: [
          l('Containers are disposable; keep state in a volume, not inside the container.', 'কন্টেইনার ফেলে-দেওয়া-যোগ্য; state কন্টেইনারের ভেতরে নয়, একটি volume-এ রাখুন।'),
          l('Mount a named volume with -v name:/path; remove and recreate the container freely and the data stays.', '-v name:/path দিয়ে একটি named volume মাউন্ট করুন; স্বাধীনভাবে কন্টেইনার রিমুভ ও পুনঃতৈরি করুন, ডেটা থাকে।'),
          l('Share a volume across containers for reads; be careful with concurrent writes, and never delete a volume without a backup.', 'পড়ার জন্য কন্টেইনারজুড়ে একটি volume শেয়ার করুন; একসঙ্গে-লেখায় সতর্ক থাকুন, আর ব্যাকআপ ছাড়া কখনো একটি volume মুছবেন না।'),
        ] },
      ],
    },
  ],

  // ── dk-backup · Backing up volume data ────────────────────────────────────
  'dk-backup': [
    {
      h: l('What is a volume backup?', 'ভলিউম ব্যাকআপ কী?'),
      blocks: [
        { p: l('A volume keeps your data safe from a container being removed — but it does not protect you from a failed disk, a fat-fingered docker volume rm, or a machine that dies. For that you need a backup: a copy of the volume’s contents stored somewhere else, that you can restore from later. Docker does not back volumes up automatically, so backing up is an explicit step you script and schedule yourself.', 'একটি volume আপনার ডেটাকে একটি কন্টেইনার রিমুভ হওয়া থেকে নিরাপদ রাখে—কিন্তু এটি আপনাকে একটি নষ্ট ডিস্ক, একটি ভুল করে চালানো docker volume rm, বা একটি মরে-যাওয়া মেশিন থেকে রক্ষা করে না। এর জন্য আপনার একটি backup দরকার: volume-এর বিষয়বস্তুর একটি কপি অন্য কোথাও রাখা, যা থেকে আপনি পরে রিস্টোর করতে পারেন। ডকার volume স্বয়ংক্রিয়ভাবে ব্যাকআপ করে না, তাই ব্যাকআপ একটি স্পষ্ট ধাপ যা আপনি নিজে স্ক্রিপ্ট ও শিডিউল করেন।') },
        { p: l('The standard technique is elegant precisely because volumes are just storage: you run a small, temporary container, mount the volume you want to save into it, mount a directory from the host as well, and use a tool like tar to archive the volume’s files into a compressed file on the host. That archive is your backup. Restoring is the same idea in reverse — mount the volume and the archive, and extract the files back in.', 'প্রমিত কৌশলটি সুন্দর ঠিক এ কারণে যে volume শুধুই স্টোরেজ: আপনি একটি ছোট, অস্থায়ী কন্টেইনার চালান, যে volume সংরক্ষণ করতে চান তা এতে মাউন্ট করেন, হোস্ট থেকে একটি ডিরেক্টরিও মাউন্ট করেন, এবং tar-এর মতো একটি টুল দিয়ে volume-এর ফাইলগুলো হোস্টের একটি কম্প্রেসড ফাইলে আর্কাইভ করেন। সেই আর্কাইভই আপনার backup। রিস্টোর করা একই ধারণা উল্টো করে—volume ও আর্কাইভ মাউন্ট করে ফাইলগুলো আবার ভেতরে এক্সট্র্যাক্ট করুন।') },
        { note: l('A backup is like copying the contents of a safe into a labeled box you store off-site. The safe (volume) might still be destroyed by a fire, but because you kept a copy elsewhere, you can rebuild from the box later.', 'একটি backup হলো একটি সেফের বিষয়বস্তু একটি লেবেলযুক্ত বাক্সে কপি করে অফ-সাইটে রাখার মতো। সেফ (volume) হয়তো এখনো আগুনে ধ্বংস হতে পারে, কিন্তু আপনি অন্য কোথাও একটি কপি রেখেছেন বলে পরে বাক্স থেকে আবার গড়তে পারেন।'), kind: 'tip' },
      ],
    },
    {
      h: l('How to back up a volume, step by step', 'কীভাবে একটি ভলিউম ব্যাকআপ করবেন, ধাপে ধাপে'),
      blocks: [
        { steps: [
          l('Pick the volume to back up (for example pgdata) and, ideally, stop or quiesce the app writing to it so the copy is consistent.', 'ব্যাকআপ করার volume বাছুন (যেমন pgdata) এবং আদর্শভাবে, যে অ্যাপ এতে লিখছে তা থামান বা শান্ত করুন যাতে কপিটি সামঞ্জস্যপূর্ণ হয়।'),
          l('Run a throwaway container (alpine is tiny and has tar) with the volume mounted at /data.', 'একটি ফেলে-দেওয়া কন্টেইনার (alpine ছোট ও এতে tar আছে) চালান, /data-তে volume মাউন্ট করা।'),
          l('Also mount a host directory (the current directory) at /backup so the archive lands on the host, not inside the container.', 'একটি হোস্ট ডিরেক্টরি (বর্তমান ডিরেক্টরি)-ও /backup-এ মাউন্ট করুন যাতে আর্কাইভ কন্টেইনারের ভেতরে নয়, হোস্টে যায়।'),
          l('Run tar to compress /data into /backup/pgdata.tar.gz. The --rm flag deletes the helper container the moment it finishes.', '/data-কে /backup/pgdata.tar.gz-এ কম্প্রেস করতে tar চালান। --rm ফ্ল্যাগ হেল্পার কন্টেইনারটি শেষ হওয়ার সঙ্গে সঙ্গে মুছে ফেলে।'),
          l('Copy the resulting archive off the host — to object storage or another machine — so it survives losing this server.', 'ফলাফল আর্কাইভটি হোস্ট থেকে সরান—object storage বা অন্য মেশিনে—যাতে এই সার্ভার হারালেও তা টেকে।'),
        ] },
        { code: `# archive the pgdata volume into the current host directory
docker run --rm \\
  -v pgdata:/data \\
  -v "$PWD":/backup \\
  alpine tar czf /backup/pgdata.tar.gz -C /data .`, caption: l('A throwaway alpine container mounts the volume and writes a compressed archive to the host. -C /data . archives the contents, not the folder name.', 'একটি ফেলে-দেওয়া alpine কন্টেইনার volume মাউন্ট করে ও হোস্টে একটি কম্প্রেসড আর্কাইভ লেখে। -C /data . ফোল্ডারের নাম নয়, বিষয়বস্তু আর্কাইভ করে।') },
      ],
    },
    {
      h: l('How to restore from a backup', 'ব্যাকআপ থেকে কীভাবে রিস্টোর করবেন'),
      blocks: [
        { p: l('A backup you have never restored is only a hope, not a plan. Restoring runs the same pattern backwards: create (or reuse) the target volume, mount it and the archive into a helper container, and untar the files back into the volume. Practise this at least once so you know the command works before a real emergency.', 'যে backup আপনি কখনো রিস্টোর করেননি তা শুধু একটি আশা, পরিকল্পনা নয়। রিস্টোর একই প্যাটার্ন উল্টো চালায়: লক্ষ্য volume তৈরি করুন (বা পুনঃব্যবহার করুন), এটি ও আর্কাইভ একটি হেল্পার কন্টেইনারে মাউন্ট করুন, এবং ফাইলগুলো volume-এ untar করুন। এটি অন্তত একবার অনুশীলন করুন যাতে সত্যিকার জরুরি অবস্থার আগে জানেন কমান্ডটি কাজ করে।') },
        { code: `# create the destination volume (if it does not exist yet)
docker volume create pgdata

# extract the archive back into the volume
docker run --rm \\
  -v pgdata:/data \\
  -v "$PWD":/backup \\
  alpine sh -c "tar xzf /backup/pgdata.tar.gz -C /data"`, caption: l('Same helper-container trick in reverse: xzf extracts the archive from the host into the mounted volume at /data.', 'একই হেল্পার-কন্টেইনার কৌশল উল্টো: xzf হোস্ট থেকে আর্কাইভটি /data-তে মাউন্ট করা volume-এ এক্সট্র্যাক্ট করে।') },
      ],
    },
    {
      h: l('Backup vs restore at a glance', 'ব্যাকআপ বনাম রিস্টোর এক নজরে'),
      blocks: [
        { table: {
          head: [l('Step', 'ধাপ'), l('Backup', 'ব্যাকআপ'), l('Restore', 'রিস্টোর')],
          rows: [
            [l('Volume mount', 'ভলিউম মাউন্ট'), l('-v pgdata:/data (read source)', '-v pgdata:/data (সোর্স পড়া)'), l('-v pgdata:/data (write target)', '-v pgdata:/data (লক্ষ্যে লেখা)')],
            [l('Host mount', 'হোস্ট মাউন্ট'), l('-v "$PWD":/backup', '-v "$PWD":/backup'), l('-v "$PWD":/backup', '-v "$PWD":/backup')],
            [l('tar action', 'tar ক্রিয়া'), l('tar czf … create archive', 'tar czf … আর্কাইভ তৈরি'), l('tar xzf … extract archive', 'tar xzf … আর্কাইভ এক্সট্র্যাক্ট')],
            [l('Container', 'কন্টেইনার'), l('alpine, --rm (throwaway)', 'alpine, --rm (ফেলে-দেওয়া)'), l('alpine, --rm (throwaway)', 'alpine, --rm (ফেলে-দেওয়া)')],
          ],
        } },
        { note: l('czf = create + gzip + file; xzf = extract + gzip + file. The pattern is identical both ways — only the tar verb and the direction of data change.', 'czf = create + gzip + file; xzf = extract + gzip + file। প্যাটার্ন দুই দিকেই একই—শুধু tar verb ও ডেটার দিক বদলায়।'), kind: 'tip' },
      ],
    },
    {
      h: l('When and where to back up', 'কখন ও কোথায় ব্যাকআপ করবেন'),
      blocks: [
        { p: l('Back up any volume whose loss would hurt: databases, uploaded files, anything a user or the business depends on. How often depends on how much data you can afford to lose — a busy database might be backed up hourly, a small side project nightly. The key operational rule is that a backup only counts if it lives somewhere other than the machine it came from; a backup file sitting on the same disk as the volume disappears with that disk. Push the archive to object storage (S3 and friends) or another host as part of the same job.', 'যে volume হারালে ক্ষতি হবে তা ব্যাকআপ করুন: ডেটাবেস, আপলোড করা ফাইল, ব্যবহারকারী বা ব্যবসা নির্ভর করে এমন যেকোনো কিছু। কত ঘন ঘন তা নির্ভর করে আপনি কত ডেটা হারানোর সামর্থ্য রাখেন তার ওপর—একটি ব্যস্ত ডেটাবেস হয়তো ঘণ্টায়, একটি ছোট সাইড প্রজেক্ট রাতে ব্যাকআপ হয়। মূল অপারেশনাল নিয়ম হলো একটি backup তখনই গণনায় আসে যখন তা যে মেশিন থেকে এসেছে তার বাইরে কোথাও থাকে; volume-এর একই ডিস্কে থাকা একটি backup ফাইল সেই ডিস্কের সঙ্গে হারায়। একই কাজের অংশ হিসেবে আর্কাইভটি object storage (S3 ও অন্যান্য) বা অন্য হোস্টে পাঠান।') },
        { p: l('For databases specifically, a file-level tar of the data directory is safest when the database is stopped or quiesced, because copying files that are being written can capture a half-finished state. Many teams therefore prefer the database’s own dump tool (like pg_dump) for a consistent logical backup, and use the tar-the-volume trick for everything else. Either way, the discipline is the same: automate it, store it off-host, and test a restore regularly.', 'বিশেষ করে ডেটাবেসের জন্য, ডেটা ডিরেক্টরির একটি ফাইল-লেভেল tar সবচেয়ে নিরাপদ যখন ডেটাবেস থামানো বা শান্ত থাকে, কারণ লেখা-চলা ফাইল কপি করলে একটি অর্ধ-সম্পন্ন state ধরা পড়তে পারে। তাই অনেক টিম একটি সামঞ্জস্যপূর্ণ লজিক্যাল ব্যাকআপের জন্য ডেটাবেসের নিজের dump টুল (যেমন pg_dump) পছন্দ করে, আর বাকি সবকিছুতে volume-tar কৌশল ব্যবহার করে। যেভাবেই হোক, শৃঙ্খলা একই: এটি স্বয়ংক্রিয় করুন, হোস্টের বাইরে রাখুন, ও নিয়মিত একটি রিস্টোর পরীক্ষা করুন।') },
      ],
    },
    {
      h: l('Common mistakes', 'সাধারণ ভুল'),
      blocks: [
        { list: [
          l('Assuming a volume is automatically backed up, then discovering there is no recovery after a disk failure.', 'ধরে নেওয়া একটি volume স্বয়ংক্রিয় ব্যাকআপ হয়, তারপর একটি ডিস্ক ব্যর্থতার পর কোনো পুনরুদ্ধার নেই আবিষ্কার করা।'),
          l('Storing the backup file on the same host and disk as the volume, so a hardware failure takes both at once.', 'ব্যাকআপ ফাইলটি volume-এর একই হোস্ট ও ডিস্কে রাখা, ফলে একটি হার্ডওয়্যার ব্যর্থতা দুটোই একসঙ্গে নেয়।'),
          l('Never testing a restore, then finding the archive is empty, corrupt, or missing files exactly when you need it.', 'কখনো একটি রিস্টোর পরীক্ষা না করা, তারপর ঠিক যখন দরকার তখন আর্কাইভ খালি, নষ্ট বা ফাইল-অনুপস্থিত পাওয়া।'),
          l('Backing up a database’s files while it is writing, capturing an inconsistent, half-written snapshot.', 'একটি ডেটাবেসের ফাইল লেখা-চলা অবস্থায় ব্যাকআপ করা, একটি অসামঞ্জস্যপূর্ণ, অর্ধ-লেখা স্ন্যাপশট ধরা।'),
        ] },
      ],
    },
    {
      h: l('Remember in one line', 'এক লাইনে মনে রাখুন'),
      blocks: [
        { list: [
          l('Docker does not back volumes up for you — do it yourself with a throwaway container and tar.', 'ডকার আপনার জন্য volume ব্যাকআপ করে না—একটি ফেলে-দেওয়া কন্টেইনার ও tar দিয়ে নিজে করুন।'),
          l('Backup = tar czf the volume to a host file; restore = tar xzf it back into the volume.', 'ব্যাকআপ = volume-কে একটি হোস্ট ফাইলে tar czf; রিস্টোর = তা আবার volume-এ tar xzf।'),
          l('Store backups off-host and test a restore regularly — an untested backup is not a backup.', 'ব্যাকআপ হোস্টের বাইরে রাখুন ও নিয়মিত একটি রিস্টোর পরীক্ষা করুন—একটি অপরীক্ষিত ব্যাকআপ ব্যাকআপ নয়।'),
        ] },
      ],
    },
  ],

  // ── dk-network-basics · Container networking basics ───────────────────────
  'dk-network-basics': [
    {
      h: l('What is container networking?', 'কন্টেইনার নেটওয়ার্কিং কী?'),
      blocks: [
        { p: l('When Docker starts a container it also connects it to a virtual network, exactly like plugging a computer into a switch. By default every container joins a bridge network: Docker creates a private virtual subnet on the host, gives each container its own private IP address on it, and lets the containers reach each other and reach the internet through the host. Networking is what turns a pile of isolated containers into a working system where a web app can talk to its database.', 'ডকার যখন একটি কন্টেইনার শুরু করে তখন এটিকে একটি ভার্চুয়াল নেটওয়ার্কেও যুক্ত করে, ঠিক যেন একটি কম্পিউটার একটি switch-এ প্লাগ করা। ডিফল্টে প্রতিটি কন্টেইনার একটি bridge নেটওয়ার্কে যোগ দেয়: ডকার হোস্টে একটি প্রাইভেট ভার্চুয়াল সাবনেট তৈরি করে, প্রতিটি কন্টেইনারকে তার নিজের প্রাইভেট IP ঠিকানা দেয়, এবং কন্টেইনারগুলোকে একে অপরকে ও হোস্টের মাধ্যমে ইন্টারনেটে পৌঁছাতে দেয়। নেটওয়ার্কিংই একগাদা আলাদা কন্টেইনারকে একটি কার্যকর সিস্টেমে পরিণত করে যেখানে একটি web অ্যাপ তার ডেটাবেসের সঙ্গে কথা বলতে পারে।') },
        { p: l('The important mental shift is that a container’s IP is private and internal by default. From inside the network containers can freely reach each other on their private IPs, but nothing outside the host can — the world cannot see a container unless you deliberately publish a port (the next lesson). So networking has two halves: the private wiring between containers, and the controlled openings you punch through to the outside.', 'গুরুত্বপূর্ণ মানসিক পরিবর্তন হলো একটি কন্টেইনারের IP ডিফল্টে প্রাইভেট ও অভ্যন্তরীণ। নেটওয়ার্কের ভেতর থেকে কন্টেইনার স্বাধীনভাবে একে অপরকে তাদের প্রাইভেট IP-তে পৌঁছাতে পারে, কিন্তু হোস্টের বাইরের কিছুই পারে না—আপনি ইচ্ছাকৃতভাবে একটি port publish না করলে (পরের পাঠ) বাইরের জগৎ একটি কন্টেইনার দেখতে পায় না। তাই নেটওয়ার্কিংয়ের দুটি অংশ: কন্টেইনারের মধ্যে প্রাইভেট তার, এবং বাইরের দিকে খোঁচানো নিয়ন্ত্রিত ছিদ্র।') },
        { note: l('A Docker bridge network is like an internal office phone system: everyone gets an extension and can call each other directly, without going through the outside line. To take a call from the public, you need a specific number forwarded in — a published port.', 'একটি ডকার bridge নেটওয়ার্ক একটি অভ্যন্তরীণ অফিস ফোন সিস্টেমের মতো: সবাই একটি এক্সটেনশন পায় ও বাইরের লাইন ছাড়াই সরাসরি একে অপরকে কল করতে পারে। জনসাধারণের কাছ থেকে একটি কল নিতে, আপনার একটি নির্দিষ্ট নম্বর ভেতরে ফরওয়ার্ড করা দরকার—একটি published port।'), kind: 'tip' },
      ],
    },
    {
      h: l('How container networking works', 'কন্টেইনার নেটওয়ার্কিং কীভাবে কাজ করে'),
      blocks: [
        { steps: [
          l('Docker ships with a few networks out of the box; docker network ls shows them, including the default bridge, host, and none.', 'ডকার কয়েকটি নেটওয়ার্ক সঙ্গে নিয়ে আসে; docker network ls সেগুলো দেখায়, ডিফল্ট bridge, host ও none সহ।'),
          l('Create your own bridge network so related containers share a private subnet and get automatic name-based DNS.', 'নিজের একটি bridge নেটওয়ার্ক তৈরি করুন যাতে সম্পর্কিত কন্টেইনার একটি প্রাইভেট সাবনেট শেয়ার করে ও স্বয়ংক্রিয় নাম-ভিত্তিক DNS পায়।'),
          l('Start containers with --network <name>. Each gets a private IP on that network and can reach the others on it.', '--network <name> দিয়ে কন্টেইনার শুরু করুন। প্রতিটি সেই নেটওয়ার্কে একটি প্রাইভেট IP পায় ও এর অন্যদের পৌঁছাতে পারে।'),
          l('Containers on the same network talk directly by name; containers on different networks are isolated from each other.', 'একই নেটওয়ার্কের কন্টেইনার সরাসরি নাম দিয়ে কথা বলে; ভিন্ন নেটওয়ার্কের কন্টেইনার একে অপর থেকে আলাদা।'),
          l('Use docker network inspect to see which containers are attached and what private IP each was assigned.', 'কোন কন্টেইনার যুক্ত ও প্রতিটিকে কোন প্রাইভেট IP দেওয়া হয়েছে দেখতে docker network inspect ব্যবহার করুন।'),
        ] },
        { code: `# see the networks Docker manages
docker network ls

# create your own bridge network
docker network create app

# run two containers on it — they share a private subnet
docker run -d --name web --network app nginx
docker run -d --name api --network app myorg/api

# from web, reach api directly by its name (no IP needed)
docker exec web ping -c 1 api

# inspect to see both containers and their private IPs
docker network inspect app`, caption: l('Both containers sit on the app network, so web can reach api by the name "api". Nothing outside the host can see either yet.', 'দুটি কন্টেইনারই app নেটওয়ার্কে বসে, তাই web "api" নামে api-তে পৌঁছাতে পারে। হোস্টের বাইরের কিছুই এখনো কাউকে দেখতে পায় না।') },
      ],
    },
    {
      h: l('Key commands', 'মূল কমান্ড'),
      blocks: [
        { table: {
          head: [l('Goal', 'লক্ষ্য'), l('Command', 'কমান্ড')],
          rows: [
            [l('List networks', 'নেটওয়ার্ক তালিকা'), l('docker network ls', 'docker network ls')],
            [l('Create a network', 'নেটওয়ার্ক তৈরি'), l('docker network create app', 'docker network create app')],
            [l('Connect a container', 'কন্টেইনার যুক্ত'), l('docker network connect app web', 'docker network connect app web')],
            [l('Inspect a network', 'নেটওয়ার্ক দেখুন'), l('docker network inspect app', 'docker network inspect app')],
          ],
        } },
        { note: l('docker network connect attaches an already-running container to another network without recreating it — a container can be on several networks at once, which is how you bridge two otherwise-isolated groups.', 'docker network connect একটি ইতিমধ্যে-চলমান কন্টেইনারকে পুনঃতৈরি না করেই আরেকটি নেটওয়ার্কে যুক্ত করে—একটি কন্টেইনার একসঙ্গে কয়েকটি নেটওয়ার্কে থাকতে পারে, এভাবেই আপনি দুটি অন্যথায়-আলাদা দলকে সেতু করেন।'), kind: 'tip' },
      ],
    },
    {
      h: l('Network drivers you will meet', 'যে নেটওয়ার্ক ড্রাইভার দেখবেন'),
      blocks: [
        { p: l('Docker networks come in a few types called drivers. For single-host work you almost always want bridge; the others solve narrower problems. Knowing they exist helps you read docker network ls without confusion.', 'ডকার নেটওয়ার্ক কয়েকটি ধরনে আসে যাদের driver বলে। সিঙ্গল-হোস্ট কাজে আপনি প্রায় সবসময় bridge চান; বাকিগুলো সংকীর্ণ সমস্যা সমাধান করে। এগুলো আছে জানা docker network ls বিভ্রান্তি ছাড়া পড়তে সাহায্য করে।') },
        { table: {
          head: [l('Driver', 'ড্রাইভার'), l('What it does', 'কী করে'), l('Use when', 'কখন ব্যবহার')],
          rows: [
            [l('bridge', 'bridge'), l('Private subnet on one host; the default for most containers.', 'এক হোস্টে প্রাইভেট সাবনেট; বেশিরভাগ কন্টেইনারের ডিফল্ট।'), l('Normal single-host apps.', 'সাধারণ সিঙ্গল-হোস্ট অ্যাপ।')],
            [l('host', 'host'), l('Container shares the host’s network directly, no isolation.', 'কন্টেইনার সরাসরি হোস্টের নেটওয়ার্ক শেয়ার করে, কোনো আইসোলেশন নেই।'), l('You need raw host performance and accept no isolation.', 'কাঁচা হোস্ট পারফরম্যান্স দরকার ও আইসোলেশন ছাড়া মানেন।')],
            [l('none', 'none'), l('No networking at all; fully isolated.', 'কোনো নেটওয়ার্কিং নেই; পুরোপুরি আলাদা।'), l('A container that must not touch any network.', 'যে কন্টেইনার কোনো নেটওয়ার্ক ছোঁবে না।')],
            [l('overlay', 'overlay'), l('One network spanning many hosts (Swarm/orchestrators).', 'অনেক হোস্টজুড়ে একটি নেটওয়ার্ক (Swarm/অর্কেস্ট্রেটর)।'), l('Multi-host clusters, not plain Docker.', 'মাল্টি-হোস্ট ক্লাস্টার, সাধারণ ডকার নয়।')],
          ],
        } },
      ],
    },
    {
      h: l('When and where it matters', 'কখন ও কোথায় এটি গুরুত্বপূর্ণ'),
      blocks: [
        { p: l('Networking matters the moment your app is more than one container — which is nearly always. A typical web app is at least a web/api container plus a database container, and the two must talk. The right instinct is to put them on a shared user-defined network and let them reach each other privately by name, while publishing to the host only the one port the outside world truly needs (usually the web front door). Everything internal — the database, a cache, a queue — should stay on the private network with no published port at all.', 'নেটওয়ার্কিং তখনই গুরুত্বপূর্ণ যখন আপনার অ্যাপ একটির বেশি কন্টেইনার—যা প্রায় সবসময়ই। একটি সাধারণ web অ্যাপ অন্তত একটি web/api কন্টেইনার ও একটি ডেটাবেস কন্টেইনার, আর দুটিকে কথা বলতে হবে। সঠিক প্রবৃত্তি হলো এদের একটি শেয়ার্ড user-defined নেটওয়ার্কে রাখা ও প্রাইভেটভাবে নাম দিয়ে একে অপরকে পৌঁছাতে দেওয়া, আর হোস্টে শুধু সেই একটি port publish করা যা বাইরের জগতের সত্যিই দরকার (সাধারণত web সদর দরজা)। সব অভ্যন্তরীণ—ডেটাবেস, একটি cache, একটি queue—কোনো published port ছাড়াই প্রাইভেট নেটওয়ার্কে থাকা উচিত।') },
        { list: [
          l('An app plus a database → one shared network; the app reaches the database by name, nothing is published for the DB.', 'একটি অ্যাপ ও একটি ডেটাবেস → একটি শেয়ার্ড নেটওয়ার্ক; অ্যাপ নাম দিয়ে ডেটাবেসে পৌঁছায়, DB-এর জন্য কিছু publish হয় না।'),
          l('Two unrelated apps on one host → separate networks, so a break-in in one cannot reach the other.', 'এক হোস্টে দুটি অসম্পর্কিত অ্যাপ → আলাদা নেটওয়ার্ক, যাতে একটিতে অনুপ্রবেশ অন্যটিতে পৌঁছাতে না পারে।'),
          l('Only the front-end port needs to be reachable from outside → publish just that one, keep the rest private.', 'শুধু front-end port বাইরে থেকে পৌঁছানো দরকার → শুধু সেটিই publish করুন, বাকি প্রাইভেট রাখুন।'),
        ] },
        { p: l('In everyday practice you rarely wire these networks up by hand for long — Docker Compose builds a network for your project automatically and attaches every service to it. But knowing the underlying mechanics is what lets you debug when a container "cannot connect": the first questions to ask are whether both containers are on the same network, whether you are using the right name, and whether you accidentally published something you meant to keep internal. The plumbing you learn here is exactly the plumbing Compose and orchestrators automate on top.', 'দৈনন্দিন কাজে আপনি খুব কমই এই নেটওয়ার্ক দীর্ঘক্ষণ হাতে যুক্ত করেন—Docker Compose আপনার প্রজেক্টের জন্য স্বয়ংক্রিয়ভাবে একটি নেটওয়ার্ক বানায় ও প্রতিটি সার্ভিস এতে যুক্ত করে। কিন্তু অন্তর্নিহিত কৌশল জানাই আপনাকে ডিবাগ করতে দেয় যখন একটি কন্টেইনার "connect করতে পারে না": প্রথম প্রশ্নগুলো হলো দুটি কন্টেইনার একই নেটওয়ার্কে আছে কিনা, আপনি সঠিক নাম ব্যবহার করছেন কিনা, এবং ভুল করে এমন কিছু publish করেছেন কিনা যা অভ্যন্তরীণ রাখার কথা ছিল। এখানে যে প্লাম্বিং শেখেন তা ঠিক সেই প্লাম্বিং যা Compose ও অর্কেস্ট্রেটর ওপরে স্বয়ংক্রিয় করে।') },
      ],
    },
    {
      h: l('Common mistakes', 'সাধারণ ভুল'),
      blocks: [
        { list: [
          l('Publishing a database port to the host when only the app container needs it, exposing it to the whole network.', 'শুধু অ্যাপ কন্টেইনারের দরকার হলেও একটি ডেটাবেস port হোস্টে publish করা, পুরো নেটওয়ার্কে খোলা।'),
          l('Relying on the default bridge, which does not give containers name-based DNS, then wondering why "db" does not resolve.', 'ডিফল্ট bridge-এর ওপর নির্ভর করা, যা কন্টেইনারকে নাম-ভিত্তিক DNS দেয় না, তারপর অবাক হওয়া কেন "db" রিজলভ হয় না।'),
          l('Putting every container on one flat network, so a compromise of one reaches all the others.', 'প্রতিটি কন্টেইনার একটি সমতল নেটওয়ার্কে রাখা, ফলে একটির আপস বাকি সবগুলোতে পৌঁছায়।'),
          l('Assuming containers are reachable from outside by default — they are not until you publish a port.', 'ধরে নেওয়া কন্টেইনার ডিফল্টে বাইরে থেকে পৌঁছানো যায়—আপনি একটি port publish না করা পর্যন্ত যায় না।'),
        ] },
      ],
    },
    {
      h: l('Remember in one line', 'এক লাইনে মনে রাখুন'),
      blocks: [
        { list: [
          l('Containers join a bridge network and get private IPs; on the same network they reach each other directly.', 'কন্টেইনার একটি bridge নেটওয়ার্কে যোগ দেয় ও প্রাইভেট IP পায়; একই নেটওয়ার্কে তারা সরাসরি একে অপরকে পৌঁছায়।'),
          l('Nothing is reachable from outside the host until you publish a port on purpose.', 'আপনি ইচ্ছা করে একটি port publish না করা পর্যন্ত হোস্টের বাইরে থেকে কিছুই পৌঁছানো যায় না।'),
          l('Group related containers on one network, isolate unrelated ones on separate networks.', 'সম্পর্কিত কন্টেইনার এক নেটওয়ার্কে দলবদ্ধ করুন, অসম্পর্কিতগুলো আলাদা নেটওয়ার্কে আলাদা করুন।'),
        ] },
      ],
    },
  ],

  // ── dk-ports · Publishing ports ───────────────────────────────────────────
  'dk-ports': [
    {
      h: l('What does publishing a port mean?', 'একটি পোর্ট পাবলিশ করা মানে কী?'),
      blocks: [
        { p: l('A container listens on a port inside its private network — an nginx container serves on port 80, a Node app on 3000 — but by default that port is invisible from the host and the outside world. Publishing a port opens a controlled hole: it maps a port on the host to a port inside the container, so traffic that arrives at the host is forwarded into the container. The flag is -p host:container, and reading it in that order, host first, is the single most important habit in this whole topic.', 'একটি কন্টেইনার তার প্রাইভেট নেটওয়ার্কের ভেতরে একটি port-এ শোনে—একটি nginx কন্টেইনার port 80-এ পরিবেশন করে, একটি Node অ্যাপ 3000-এ—কিন্তু ডিফল্টে সেই port হোস্ট ও বাইরের জগৎ থেকে অদৃশ্য। একটি port publish করা একটি নিয়ন্ত্রিত ছিদ্র খোলে: এটি হোস্টের একটি port-কে কন্টেইনারের ভেতরের একটি port-এ ম্যাপ করে, যাতে হোস্টে আসা ট্রাফিক কন্টেইনারে ফরওয়ার্ড হয়। ফ্ল্যাগটি -p host:container, আর সেই ক্রমে—আগে host—পড়া এই পুরো টপিকের সবচেয়ে গুরুত্বপূর্ণ অভ্যাস।') },
        { p: l('So docker run -p 8080:80 nginx means "take traffic that hits port 8080 on the host and send it to port 80 inside the container." A browser visiting http://localhost:8080 reaches the nginx serving on 80. The container did not change at all — it still listens on 80 — you simply chose which host port acts as its public entrance. Without -p, that nginx runs perfectly but no one outside can reach it.', 'তাই docker run -p 8080:80 nginx মানে "হোস্টের port 8080-এ আসা ট্রাফিক নাও ও কন্টেইনারের ভেতরের port 80-এ পাঠাও।" http://localhost:8080-এ যাওয়া একটি ব্রাউজার 80-এ পরিবেশন-করা nginx-এ পৌঁছায়। কন্টেইনার একটুও বদলায়নি—এটি এখনো 80-এ শোনে—আপনি শুধু বেছেছেন কোন host port তার পাবলিক প্রবেশদ্বার হবে। -p ছাড়া, সেই nginx নিখুঁতভাবে চলে কিন্তু বাইরের কেউ তাতে পৌঁছাতে পারে না।') },
        { p: l('It is worth separating two related instructions people often confuse. EXPOSE in a Dockerfile is only documentation — it records which port the image intends to listen on, but it does not open anything by itself. Actually forwarding traffic is always the job of -p (or -P) at run time. So a container can EXPOSE 80 and still be unreachable from the host until you add -p on docker run. Publishing is the deliberate act; EXPOSE is just a note about intent.', 'দুটি সম্পর্কিত নির্দেশ আলাদা করা মূল্যবান যা মানুষ প্রায়ই গুলিয়ে ফেলে। একটি Dockerfile-এ EXPOSE শুধু ডকুমেন্টেশন—এটি রেকর্ড করে image কোন port-এ শুনতে চায়, কিন্তু নিজে কিছু খোলে না। আসলে ট্রাফিক ফরওয়ার্ড করা সবসময় রান টাইমে -p (বা -P)-এর কাজ। তাই একটি কন্টেইনার EXPOSE 80 করতে পারে ও তবুও হোস্ট থেকে অপৌঁছনীয় থাকতে পারে যতক্ষণ না আপনি docker run-এ -p যোগ করেন। পাবলিশিং হলো ইচ্ছাকৃত কাজ; EXPOSE শুধু উদ্দেশ্য সম্পর্কে একটি নোট।') },
        { note: l('Publishing is like a call-forwarding number. The container’s port 80 is a private internal extension; -p 8080:80 gives the public a number (host 8080) that rings straight through to that extension.', 'পাবলিশিং একটি কল-ফরওয়ার্ডিং নম্বরের মতো। কন্টেইনারের port 80 একটি প্রাইভেট অভ্যন্তরীণ এক্সটেনশন; -p 8080:80 জনসাধারণকে একটি নম্বর (host 8080) দেয় যা সরাসরি সেই এক্সটেনশনে বাজে।'), kind: 'tip' },
      ],
    },
    {
      h: l('How publishing works', 'পাবলিশিং কীভাবে কাজ করে'),
      blocks: [
        { steps: [
          l('The container process listens on a port inside the container — say 80 for a web server.', 'কন্টেইনার প্রসেস কন্টেইনারের ভেতরে একটি port-এ শোনে—ধরুন একটি web সার্ভারের জন্য 80।'),
          l('You pass -p 8080:80 to docker run. Docker sets up forwarding from host port 8080 to container port 80.', 'আপনি docker run-এ -p 8080:80 দেন। ডকার host port 8080 থেকে container port 80-এ ফরওয়ার্ডিং সেট করে।'),
          l('A request arrives at the host on 8080; Docker relays it into the container’s 80 and the reply travels back the same way.', 'একটি রিকোয়েস্ট হোস্টে 8080-এ আসে; ডকার তা কন্টেইনারের 80-এ পাঠায় ও উত্তর একই পথে ফিরে আসে।'),
          l('Optionally bind to one host interface (127.0.0.1:8080:80) so only the local machine, not the whole network, can reach it.', 'ঐচ্ছিকভাবে একটি host ইন্টারফেসে বাঁধুন (127.0.0.1:8080:80) যাতে শুধু লোকাল মেশিন, পুরো নেটওয়ার্ক নয়, পৌঁছাতে পারে।'),
          l('Verify with docker ps or docker port, which show exactly which host port maps to which container port.', 'docker ps বা docker port দিয়ে যাচাই করুন, যা ঠিক দেখায় কোন host port কোন container port-এ ম্যাপ করে।'),
        ] },
        { code: `# publish container port 80 on host port 8080  (host:container)
docker run -d --name web -p 8080:80 nginx

# now reachable from the host and the network
curl http://localhost:8080

# bind to localhost only, so it is NOT exposed on the network
docker run -d --name web2 -p 127.0.0.1:8080:80 nginx

# let Docker pick a random free host port, then look it up
docker run -d --name web3 -p 80 nginx
docker port web3        # e.g. 80/tcp -> 0.0.0.0:49153`, caption: l('Read every mapping as host:container. Leaving the host part off (-p 80) lets Docker assign a random free host port.', 'প্রতিটি ম্যাপিং host:container হিসেবে পড়ুন। host অংশ বাদ দিলে (-p 80) ডকার একটি এলোমেলো ফ্রি host port বরাদ্দ করে।') },
      ],
    },
    {
      h: l('Port mapping forms', 'পোর্ট ম্যাপিংয়ের রূপ'),
      blocks: [
        { table: {
          head: [l('Flag', 'ফ্ল্যাগ'), l('Meaning', 'অর্থ')],
          rows: [
            [l('-p 8080:80', '-p 8080:80'), l('Host 8080 → container 80, on all host interfaces.', 'Host 8080 → container 80, সব host ইন্টারফেসে।')],
            [l('-p 127.0.0.1:8080:80', '-p 127.0.0.1:8080:80'), l('Only the local machine can reach it, not the network.', 'শুধু লোকাল মেশিন পৌঁছাতে পারে, নেটওয়ার্ক নয়।')],
            [l('-p 80', '-p 80'), l('Docker picks a random free host port for container 80.', 'ডকার container 80-এর জন্য একটি এলোমেলো ফ্রি host port বাছে।')],
            [l('-P (capital)', '-P (বড় হাতের)'), l('Publish every EXPOSEd port to random host ports.', 'প্রতিটি EXPOSE করা port এলোমেলো host port-এ publish করে।')],
          ],
        } },
        { note: l('The order never changes: host comes first, container second. -p 8080:80 and -p 80:8080 are opposite mappings, and mixing them up is the most common port bug.', 'ক্রম কখনো বদলায় না: host আগে, container পরে। -p 8080:80 ও -p 80:8080 উল্টো ম্যাপিং, আর এগুলো গুলিয়ে ফেলা সবচেয়ে সাধারণ port বাগ।'), kind: 'warn' },
      ],
    },
    {
      h: l('Publishing vs internal networking', 'পাবলিশিং বনাম অভ্যন্তরীণ নেটওয়ার্কিং'),
      blocks: [
        { p: l('A crucial point that trips up beginners: containers on the same Docker network do not need any published port to talk to each other. Publishing is only for reaching a container from the host or the outside world. Your web container reaches your database on the internal network by name, whether or not the database publishes a port — and it should not. Reserve -p for the handful of services that genuinely must face the outside.', 'একটি গুরুত্বপূর্ণ বিষয় যা নতুনদের হোঁচট খাওয়ায়: একই ডকার নেটওয়ার্কের কন্টেইনারের একে অপরের সঙ্গে কথা বলতে কোনো published port লাগে না। পাবলিশিং শুধু হোস্ট বা বাইরের জগৎ থেকে একটি কন্টেইনারে পৌঁছানোর জন্য। আপনার web কন্টেইনার অভ্যন্তরীণ নেটওয়ার্কে নাম দিয়ে আপনার ডেটাবেসে পৌঁছায়, ডেটাবেস একটি port publish করুক বা না করুক—আর করা উচিত নয়। বাইরের মুখোমুখি হওয়া সত্যিই দরকার এমন গুটিকয় সার্ভিসের জন্য -p তুলে রাখুন।') },
        { list: [
          l('Web app that users hit in a browser → publish it, e.g. -p 80:80 or -p 443:443.', 'ব্যবহারকারীরা ব্রাউজারে যে web অ্যাপে যায় → এটি publish করুন, যেমন -p 80:80 বা -p 443:443।'),
          l('Database only the app talks to → do NOT publish; let the app reach it on the private network by name.', 'শুধু অ্যাপ যে ডেটাবেসের সঙ্গে কথা বলে → publish করবেন না; অ্যাপকে প্রাইভেট নেটওয়ার্কে নাম দিয়ে পৌঁছাতে দিন।'),
          l('A local dev tool you want only on your machine → bind to 127.0.0.1 so the network cannot see it.', 'একটি লোকাল dev টুল যা শুধু আপনার মেশিনে চান → 127.0.0.1-এ বাঁধুন যাতে নেটওয়ার্ক দেখতে না পায়।'),
        ] },
        { p: l('The security consequence follows directly: every published port is an opening in your host that must be firewalled and justified. Publishing a database or an admin dashboard binds it to all host interfaces by default, which can quietly expose it to your whole local network or even the internet if the host has a public IP. A good rule of thumb is to publish the fewest ports possible, always ask "who actually needs to reach this from outside," and reach for 127.0.0.1 binding whenever the answer is "only me, locally." Fewer doors means fewer things to lock.', 'নিরাপত্তার পরিণতি সরাসরি আসে: প্রতিটি published port আপনার হোস্টে একটি ছিদ্র যা ফায়ারওয়াল ও যুক্তিসঙ্গত করতে হবে। একটি ডেটাবেস বা একটি admin ড্যাশবোর্ড publish করলে তা ডিফল্টে সব host ইন্টারফেসে বাঁধে, যা নীরবে আপনার পুরো লোকাল নেটওয়ার্কে বা হোস্টের পাবলিক IP থাকলে এমনকি ইন্টারনেটে খুলে দিতে পারে। একটি ভালো নিয়ম হলো যত কম সম্ভব port publish করা, সবসময় জিজ্ঞাসা করা "বাইরে থেকে এটিতে আসলে কার পৌঁছানো দরকার," এবং উত্তর "শুধু আমি, লোকালি" হলেই 127.0.0.1 বাইন্ডিং নেওয়া। কম দরজা মানে তালা দেওয়ার কম জিনিস।') },
      ],
    },
    {
      h: l('Common mistakes', 'সাধারণ ভুল'),
      blocks: [
        { list: [
          l('Reversing the mapping (-p 80:8080) and wondering why the service is unreachable on the expected port.', 'ম্যাপিং উল্টানো (-p 80:8080) আর অবাক হওয়া কেন সার্ভিস প্রত্যাশিত port-এ পৌঁছানো যায় না।'),
          l('Publishing internal services (databases, caches) that only other containers need, opening them to the network needlessly.', 'শুধু অন্য কন্টেইনারের দরকার এমন অভ্যন্তরীণ সার্ভিস (ডেটাবেস, cache) publish করা, অকারণে নেটওয়ার্কে খোলা।'),
          l('Forgetting -p entirely, then being confused that a perfectly running container is unreachable from the browser.', '-p পুরো ভুলে যাওয়া, তারপর বিভ্রান্ত হওয়া যে একটি নিখুঁতভাবে চলা কন্টেইনার ব্রাউজার থেকে পৌঁছানো যায় না।'),
          l('Two containers both publishing the same host port, so the second fails with a "port is already allocated" error.', 'দুটি কন্টেইনার একই host port publish করা, ফলে দ্বিতীয়টি "port is already allocated" ত্রুটিতে ব্যর্থ হয়।'),
        ] },
      ],
    },
    {
      h: l('Remember in one line', 'এক লাইনে মনে রাখুন'),
      blocks: [
        { list: [
          l('-p host:container maps a host port to a container port; always read host first.', '-p host:container একটি host port-কে একটি container port-এ ম্যাপ করে; সবসময় আগে host পড়ুন।'),
          l('Publish only what the outside world needs; containers on the same network reach each other without publishing.', 'শুধু বাইরের জগতের যা দরকার তা publish করুন; একই নেটওয়ার্কের কন্টেইনার publish ছাড়াই একে অপরকে পৌঁছায়।'),
          l('Every published port is an opening to firewall and justify — bind to 127.0.0.1 when only local access is needed.', 'প্রতিটি published port একটি ছিদ্র যা ফায়ারওয়াল ও যুক্তিসঙ্গত করতে হয়—শুধু লোকাল অ্যাক্সেস দরকার হলে 127.0.0.1-এ বাঁধুন।'),
        ] },
      ],
    },
  ],

  // ── dk-custom-networks · Custom networks & service discovery ──────────────
  'dk-custom-networks': [
    {
      h: l('What are custom networks and service discovery?', 'কাস্টম নেটওয়ার্ক ও সার্ভিস ডিসকভারি কী?'),
      blocks: [
        { p: l('A custom (user-defined) network is a bridge network you create yourself instead of relying on Docker’s default one. It does two valuable things at once: it isolates the group of containers you attach to it from everything else on the host, and it gives that group automatic DNS — an internal name service. Service discovery is the payoff of that DNS: containers on the same user-defined network can reach each other by container name, with no need to know or hard-code any IP address.', 'একটি custom (user-defined) নেটওয়ার্ক হলো একটি bridge নেটওয়ার্ক যা আপনি নিজে তৈরি করেন, ডকারের ডিফল্টটির ওপর নির্ভর না করে। এটি একসঙ্গে দুটি মূল্যবান কাজ করে: এতে যুক্ত কন্টেইনারের দলকে হোস্টের বাকি সবকিছু থেকে আলাদা করে, এবং সেই দলকে স্বয়ংক্রিয় DNS দেয়—একটি অভ্যন্তরীণ নাম সার্ভিস। Service discovery হলো সেই DNS-এর ফল: একই user-defined নেটওয়ার্কের কন্টেইনার কন্টেইনারের নাম দিয়ে একে অপরকে পৌঁছাতে পারে, কোনো IP ঠিকানা জানা বা হার্ড-কোড করার দরকার ছাড়াই।') },
        { p: l('This matters because container IPs are not stable. Every time Docker recreates a container it may hand out a different private IP, so wiring services together by IP is fragile and breaks on the next restart. Names, by contrast, are stable: a container named db is always reachable as db on its network. Connection strings become clean and portable — postgres://user:pass@db:5432/app — and they keep working no matter how many times the database container is recreated.', 'এটি গুরুত্বপূর্ণ কারণ কন্টেইনার IP স্থিতিশীল নয়। ডকার যতবার একটি কন্টেইনার পুনঃতৈরি করে ততবার একটি ভিন্ন প্রাইভেট IP দিতে পারে, তাই IP দিয়ে সার্ভিস যুক্ত করা ভঙ্গুর ও পরের রিস্টার্টে ভাঙে। বিপরীতে, নাম স্থিতিশীল: db নামের একটি কন্টেইনার তার নেটওয়ার্কে সবসময় db হিসেবে পৌঁছানো যায়। Connection string পরিষ্কার ও পোর্টেবল হয়—postgres://user:pass@db:5432/app—আর ডেটাবেস কন্টেইনার যতবারই পুনঃতৈরি হোক, তারা কাজ করতে থাকে।') },
        { note: l('A custom network is like a private team channel with a built-in directory. Instead of memorizing someone’s phone number (an IP), you just call "database" by name, and the directory routes you to whoever holds that role right now.', 'একটি custom নেটওয়ার্ক একটি বিল্ট-ইন ডিরেক্টরিসহ ব্যক্তিগত টিম চ্যানেলের মতো। কারো ফোন নম্বর (একটি IP) মুখস্থ করার বদলে, আপনি শুধু নাম দিয়ে "database" কল করেন, আর ডিরেক্টরি আপনাকে এই মুহূর্তে সেই ভূমিকায় থাকা যে-কারো কাছে রুট করে।'), kind: 'tip' },
      ],
    },
    {
      h: l('How custom networks and DNS work', 'কাস্টম নেটওয়ার্ক ও DNS কীভাবে কাজ করে'),
      blocks: [
        { steps: [
          l('Create a user-defined bridge network with docker network create. This is where the built-in DNS lives.', 'docker network create দিয়ে একটি user-defined bridge নেটওয়ার্ক তৈরি করুন। এখানেই বিল্ট-ইন DNS থাকে।'),
          l('Start each related container with --network <name> and a clear --name, since that name becomes its hostname.', 'প্রতিটি সম্পর্কিত কন্টেইনার --network <name> ও একটি স্পষ্ট --name দিয়ে শুরু করুন, কারণ সেই নামই তার hostname হয়।'),
          l('Inside any container on the network, the others resolve by name automatically — db, api, cache all just work.', 'নেটওয়ার্কের যেকোনো কন্টেইনারের ভেতরে, অন্যরা স্বয়ংক্রিয়ভাবে নাম দিয়ে রিজলভ করে—db, api, cache সব কেবল কাজ করে।'),
          l('Use the name (not an IP) in every connection string and config, so restarts and new IPs never break the wiring.', 'প্রতিটি connection string ও কনফিগে নাম (IP নয়) ব্যবহার করুন, যাতে রিস্টার্ট ও নতুন IP কখনো সংযোগ না ভাঙে।'),
          l('Attach an already-running container to the network later with docker network connect if you need to join it in.', 'পরে একটি ইতিমধ্যে-চলমান কন্টেইনারকে docker network connect দিয়ে নেটওয়ার্কে যুক্ত করুন যদি এটিকে যোগ করতে হয়।'),
        ] },
        { code: `# create an isolated user-defined network (gives DNS between containers)
docker network create backend

# attach a database and an app to it, each with a clear --name
docker run -d --name db  --network backend postgres:16
docker run -d --name api --network backend myorg/api

# the app reaches the database by NAME, never by IP:
#   postgres://user:pass@db:5432/app
docker exec api ping -c 1 db

# join an already-running container to the network too
docker network connect backend web`, caption: l('Because db and api share the backend network, "db" resolves to the database container automatically — no IP anywhere.', 'db ও api backend নেটওয়ার্ক শেয়ার করে বলে "db" স্বয়ংক্রিয়ভাবে ডেটাবেস কন্টেইনারে রিজলভ করে—কোথাও কোনো IP নেই।') },
      ],
    },
    {
      h: l('Key commands', 'মূল কমান্ড'),
      blocks: [
        { table: {
          head: [l('Goal', 'লক্ষ্য'), l('Command', 'কমান্ড')],
          rows: [
            [l('Create a network', 'নেটওয়ার্ক তৈরি'), l('docker network create app', 'docker network create app')],
            [l('Run a container on it', 'এতে কন্টেইনার চালান'), l('docker run --network app --name web nginx', 'docker run --network app --name web nginx')],
            [l('Connect a running container', 'চলমান কন্টেইনার যুক্ত'), l('docker network connect app web', 'docker network connect app web')],
            [l('Inspect the network', 'নেটওয়ার্ক দেখুন'), l('docker network inspect app', 'docker network inspect app')],
          ],
        } },
        { note: l('The legacy default bridge network deliberately does NOT provide name-based DNS between containers — that is one of the main reasons to always create your own user-defined network.', 'লিগ্যাসি ডিফল্ট bridge নেটওয়ার্ক ইচ্ছাকৃতভাবে কন্টেইনারের মধ্যে নাম-ভিত্তিক DNS দেয় না—এটিই সবসময় নিজের একটি user-defined নেটওয়ার্ক তৈরি করার অন্যতম প্রধান কারণ।'), kind: 'tip' },
      ],
    },
    {
      h: l('How the name actually resolves', 'নামটি আসলে কীভাবে রিজলভ হয়'),
      blocks: [
        { p: l('When your app opens a connection to db, it is doing an ordinary DNS lookup — the same mechanism your browser uses for a website — but answered by a tiny DNS server Docker runs at a fixed address inside every user-defined network. That resolver knows the current IP of every container attached to the network and maps each container’s name (and any network alias) to its live IP. Because the lookup happens fresh each time, a restarted container that got a new IP is found correctly without you changing a single line of configuration. This is why "connect by name" is not just tidier than hard-coding an IP; it is fundamentally more robust.', 'আপনার অ্যাপ যখন db-তে একটি সংযোগ খোলে, এটি একটি সাধারণ DNS লুকআপ করছে—আপনার ব্রাউজার একটি ওয়েবসাইটের জন্য যে কৌশল ব্যবহার করে সেটাই—কিন্তু উত্তর দেয় একটি ছোট DNS সার্ভার যা ডকার প্রতিটি user-defined নেটওয়ার্কের ভেতরে একটি নির্দিষ্ট ঠিকানায় চালায়। সেই resolver নেটওয়ার্কে যুক্ত প্রতিটি কন্টেইনারের বর্তমান IP জানে ও প্রতিটি কন্টেইনারের নাম (ও যেকোনো network alias)-কে তার লাইভ IP-তে ম্যাপ করে। লুকআপ প্রতিবার নতুন করে হয় বলে, নতুন IP পাওয়া একটি রিস্টার্ট করা কন্টেইনার সঠিকভাবে পাওয়া যায়, আপনার একটি লাইন কনফিগারেশনও না বদলে। এ কারণেই "নাম দিয়ে সংযোগ" শুধু একটি IP হার্ড-কোড করার চেয়ে পরিপাটি নয়; এটি মৌলিকভাবে বেশি মজবুত।') },
      ],
    },
    {
      h: l('Default bridge vs user-defined network', 'ডিফল্ট bridge বনাম user-defined নেটওয়ার্ক'),
      blocks: [
        { table: {
          head: [l('Aspect', 'দিক'), l('Default bridge', 'ডিফল্ট bridge'), l('User-defined network', 'user-defined নেটওয়ার্ক')],
          rows: [
            [l('Name-based DNS', 'নাম-ভিত্তিক DNS'), l('No — reach others only by IP', 'না—শুধু IP দিয়ে অন্যদের পৌঁছান'), l('Yes — reach others by container name', 'হ্যাঁ—কন্টেইনারের নাম দিয়ে পৌঁছান')],
            [l('Isolation', 'আইসোলেশন'), l('All default containers share it', 'সব ডিফল্ট কন্টেইনার এটি শেয়ার করে'), l('Only containers you attach', 'শুধু আপনি যাদের যুক্ত করেন')],
            [l('Attach/detach live', 'চালু অবস্থায় যুক্ত/বিচ্ছিন্ন'), l('Limited', 'সীমিত'), l('docker network connect / disconnect', 'docker network connect / disconnect')],
            [l('Recommended?', 'সুপারিশকৃত?'), l('Legacy default, avoid for apps', 'লিগ্যাসি ডিফল্ট, অ্যাপে এড়ান'), l('Yes, for any real multi-container app', 'হ্যাঁ, যেকোনো বাস্তব মাল্টি-কন্টেইনার অ্যাপে')],
          ],
        } },
      ],
    },
    {
      h: l('When and where to use custom networks', 'কখন ও কোথায় কাস্টম নেটওয়ার্ক ব্যবহার করবেন'),
      blocks: [
        { p: l('Create a user-defined network for essentially every multi-container application you run by hand. The moment two containers must talk — an api and its db, a web server and a cache — put them on a shared custom network and connect by name. This gives you both isolation from unrelated containers and the stable, readable service discovery that keeps your configuration working across restarts and redeploys. If you use Docker Compose, you get this for free: Compose creates a network per project and registers each service under its service name, which is exactly the same mechanism you are setting up manually here.', 'হাতে চালানো প্রায় প্রতিটি মাল্টি-কন্টেইনার অ্যাপ্লিকেশনের জন্য একটি user-defined নেটওয়ার্ক তৈরি করুন। দুটি কন্টেইনারকে যে মুহূর্তে কথা বলতে হবে—একটি api ও তার db, একটি web সার্ভার ও একটি cache—তাদের একটি শেয়ার্ড custom নেটওয়ার্কে রাখুন ও নাম দিয়ে সংযোগ করুন। এটি আপনাকে অসম্পর্কিত কন্টেইনার থেকে আইসোলেশন এবং স্থিতিশীল, পাঠযোগ্য service discovery দুটোই দেয় যা রিস্টার্ট ও redeploy জুড়ে আপনার কনফিগারেশন কাজ করা রাখে। আপনি Docker Compose ব্যবহার করলে এটি বিনামূল্যে পান: Compose প্রতি প্রজেক্টে একটি নেটওয়ার্ক তৈরি করে ও প্রতিটি সার্ভিসকে তার service নামে নিবন্ধন করে, যা ঠিক সেই একই কৌশল যা আপনি এখানে হাতে সেট করছেন।') },
        { p: l('You can also use multiple networks to build tiers of isolation. A common pattern is a frontend network holding the web server and a reverse proxy, and a separate backend network holding the app and the database, with the app container attached to both. The database then sits only on the backend network, unreachable from anything on the frontend — a clean, defence-in-depth layout that mirrors how production systems separate public-facing services from private data stores.', 'আপনি আইসোলেশনের স্তর গড়তে একাধিক নেটওয়ার্কও ব্যবহার করতে পারেন। একটি সাধারণ প্যাটার্ন হলো একটি frontend নেটওয়ার্ক যা web সার্ভার ও একটি reverse proxy ধরে, এবং একটি আলাদা backend নেটওয়ার্ক যা অ্যাপ ও ডেটাবেস ধরে, অ্যাপ কন্টেইনার দুটিতেই যুক্ত। ডেটাবেস তখন শুধু backend নেটওয়ার্কে বসে, frontend-এর কিছু থেকে অপৌঁছনীয়—একটি পরিষ্কার, defence-in-depth বিন্যাস যা প্রোডাকশন সিস্টেম কীভাবে পাবলিক-মুখী সার্ভিসকে প্রাইভেট ডেটা স্টোর থেকে আলাদা করে তার প্রতিফলন।') },
      ],
    },
    {
      h: l('Common mistakes', 'সাধারণ ভুল'),
      blocks: [
        { list: [
          l('Hard-coding a container IP instead of its name, then breaking when Docker assigns a different IP on restart.', 'নামের বদলে একটি কন্টেইনার IP হার্ড-কোড করা, তারপর রিস্টার্টে ডকার ভিন্ন IP দিলে ভাঙা।'),
          l('Relying on the legacy default bridge and expecting name resolution, which it does not provide between containers.', 'লিগ্যাসি ডিফল্ট bridge-এর ওপর নির্ভর করে নাম রিজলিউশন আশা করা, যা এটি কন্টেইনারের মধ্যে দেয় না।'),
          l('Forgetting to put two containers on the same network, so name lookups fail even though both are running.', 'দুটি কন্টেইনার একই নেটওয়ার্কে রাখতে ভুলে যাওয়া, ফলে দুটোই চললেও নাম লুকআপ ব্যর্থ হয়।'),
          l('Not giving containers clear --name values, leaving auto-generated names that are awkward to reference in config.', 'কন্টেইনারকে স্পষ্ট --name মান না দেওয়া, স্বয়ংক্রিয়-তৈরি নাম রেখে দেওয়া যা কনফিগে রেফার করা অস্বস্তিকর।'),
        ] },
      ],
    },
    {
      h: l('Remember in one line', 'এক লাইনে মনে রাখুন'),
      blocks: [
        { list: [
          l('A user-defined network isolates a group of containers and gives them DNS, so they reach each other by name.', 'একটি user-defined নেটওয়ার্ক একদল কন্টেইনারকে আলাদা করে ও DNS দেয়, তাই তারা নাম দিয়ে একে অপরকে পৌঁছায়।'),
          l('Always connect by container/service name, never by IP — names are stable, IPs change on restart.', 'সবসময় কন্টেইনার/সার্ভিস নাম দিয়ে সংযোগ করুন, কখনো IP দিয়ে নয়—নাম স্থিতিশীল, IP রিস্টার্টে বদলায়।'),
          l('Create your own network for any multi-container app; the legacy default bridge lacks name-based DNS.', 'যেকোনো মাল্টি-কন্টেইনার অ্যাপে নিজের নেটওয়ার্ক তৈরি করুন; লিগ্যাসি ডিফল্ট bridge-এ নাম-ভিত্তিক DNS নেই।'),
        ] },
      ],
    },
  ],
}
