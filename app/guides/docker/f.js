// Deep, bilingual (English / Bangla) teaching guides for the Docker Compose
// topics, keyed by topic id. Shape mirrors app/course-guides.js and
// app/guides/git/f.js: each guide is an array of sections { h, blocks },
// rendered by GuideBlock in app/LearningApp.js. Facts are drawn from the
// rawTopics + commands + examples in app/courses/docker.js.
//
// IMPORTANT: every { code } value is a backtick template literal, so it must
// never contain the two-character sequence of a dollar sign followed by an
// open brace — that is both Compose's env-interpolation syntax and JS template
// interpolation, and it would break this file. Inside code blocks we always
// write plain KEY=value pairs or reference variables by bare name (the service
// name "db", the file .env), never the brace-wrapped substitution form.

const l = (en, bn) => ({ en, bn })

export default {
  // ── dk-compose-intro · What is Docker Compose? ────────────────────────────
  'dk-compose-intro': [
    {
      h: l('What is Docker Compose?', 'ডকার কম্পোজ কী?'),
      blocks: [
        { p: l('Docker Compose is a tool for defining and running an application made of several containers at once. Instead of typing a long docker run command for each container — the web server, the database, the cache — and remembering to wire them together in the right order, you describe every service once in a single YAML file (compose.yaml) and bring the whole thing to life with one command: docker compose up. Compose reads the file, creates a shared network, builds or pulls each image, and starts every container for you.', 'ডকার কম্পোজ হলো একাধিক কন্টেইনার দিয়ে তৈরি একটি অ্যাপ্লিকেশন সংজ্ঞায়িত ও একসঙ্গে চালানোর একটি টুল। প্রতিটি কন্টেইনারের জন্য—ওয়েব সার্ভার, ডেটাবেস, ক্যাশ—আলাদা একটি লম্বা docker run কমান্ড টাইপ করে সঠিক ক্রমে জুড়ে দেওয়ার কথা মনে রাখার বদলে, আপনি প্রতিটি service একটিমাত্র YAML ফাইলে (compose.yaml) একবার বর্ণনা করেন এবং এক কমান্ডে পুরোটা চালু করেন: docker compose up। Compose ফাইলটি পড়ে, একটি shared network তৈরি করে, প্রতিটি image বিল্ড বা পুল করে, এবং আপনার হয়ে প্রতিটি কন্টেইনার চালু করে।') },
        { p: l('The problem Compose solves is the pain of orchestrating a multi-container app by hand. A modern app is rarely one container — it is an API, a database, maybe a cache and a background worker — and running them individually means long, error-prone commands, manual network creation, and a fragile mental checklist of what must start before what. Compose turns all of that into one readable, version-controlled file that any teammate can run identically. Check the file into git and "how do I run this locally?" has a one-line answer.', 'Compose যে সমস্যা সমাধান করে তা হলো হাতে একটি মাল্টি-কন্টেইনার অ্যাপ সাজানোর যন্ত্রণা। একটি আধুনিক অ্যাপ কদাচিৎ একটি কন্টেইনার—এটি একটি API, একটি ডেটাবেস, হয়তো একটি ক্যাশ ও একটি background worker—আর এগুলো আলাদা চালানো মানে লম্বা, ভুল-প্রবণ কমান্ড, হাতে network তৈরি, এবং কোনটির আগে কোনটি চালু হবে তার একটি ভঙ্গুর মানসিক তালিকা। Compose এই সবকিছুকে একটি পাঠযোগ্য, ভার্সন-নিয়ন্ত্রিত ফাইলে পরিণত করে যা যেকোনো সহকর্মী হুবহু একইভাবে চালাতে পারে। ফাইলটি git-এ রাখুন, আর "এটি লোকালি কীভাবে চালাই?" প্রশ্নের উত্তর হয় এক লাইনের।') },
        { note: l('Think of a single "start the band" button that powers on the drummer, guitarist, and singer together, in tune. Each musician (service) could be switched on by hand, but the one button makes them play as one group, every time, without you remembering the order.', 'একটি "ব্যান্ড শুরু" বোতাম ভাবুন যা ড্রামার, গিটারিস্ট ও গায়ককে একসঙ্গে, সুরে চালু করে। প্রতিটি বাদক (service) হাতে চালু করা যেত, কিন্তু একটি বোতাম তাদের প্রতিবার এক দল হিসেবে বাজায়, ক্রম মনে রাখা ছাড়াই।'), kind: 'tip' },
      ],
    },
    {
      h: l('How Compose works, step by step', 'Compose কীভাবে কাজ করে, ধাপে ধাপে'),
      blocks: [
        { steps: [
          l('You write a compose.yaml at the root of your project that lists each service under a services: key.', 'আপনি প্রকল্পের রুটে একটি compose.yaml লেখেন যা services: কী-এর অধীনে প্রতিটি service তালিকা করে।'),
          l('For each service you say where the image comes from — build: to build from a local Dockerfile, or image: to pull a prebuilt one — plus its ports, environment, and volumes.', 'প্রতিটি service-এর জন্য বলেন image কোথা থেকে আসে—লোকাল Dockerfile থেকে বিল্ড করতে build:, বা প্রি-বিল্ট একটি পুল করতে image:—সঙ্গে তার ports, environment ও volumes।'),
          l('You run docker compose up. Compose reads the file and creates one private network that all the services share.', 'আপনি docker compose up চালান। Compose ফাইলটি পড়ে ও একটি প্রাইভেট network তৈরি করে যা সব service ভাগ করে।'),
          l('Compose builds or pulls every image, then starts one container per service, attaching each to that shared network.', 'Compose প্রতিটি image বিল্ড বা পুল করে, তারপর প্রতি service-এ একটি করে কন্টেইনার চালু করে, প্রত্যেককে সেই shared network-এ যুক্ত করে।'),
          l('The services can now reach each other by name, and Compose streams all their logs into one terminal. Stop the whole stack together with Ctrl+C or docker compose down.', 'service-গুলো এখন নাম দিয়ে একে অপরকে পৌঁছাতে পারে, আর Compose সবার logs এক টার্মিনালে স্ট্রিম করে। Ctrl+C বা docker compose down দিয়ে পুরো স্ট্যাক একসঙ্গে থামান।'),
        ] },
        { code: `# compose.yaml — the whole app described in one file
services:
  web:
    build: .
    ports:
      - "8080:3000"
    depends_on:
      - redis
  redis:
    image: redis:7

# then one command builds and starts everything:
#   docker compose up`, caption: l('Two services in one file: web builds from the local Dockerfile and depends on redis, which is pulled ready-made. docker compose up starts them both on a shared network.', 'এক ফাইলে দুটি service: web লোকাল Dockerfile থেকে বিল্ড হয় ও redis-এর ওপর নির্ভর করে, যা তৈরি অবস্থায় পুল হয়। docker compose up দুটোকেই একটি shared network-এ চালু করে।') },
      ],
    },
    {
      h: l('Key ideas at a glance', 'মূল ধারণা এক নজরে'),
      blocks: [
        { table: {
          head: [l('Piece', 'অংশ'), l('What it does', 'যা করে')],
          rows: [
            [l('compose.yaml', 'compose.yaml'), l('One YAML file that declares the whole multi-container app.', 'একটি YAML ফাইল যা পুরো মাল্টি-কন্টেইনার অ্যাপ ঘোষণা করে।')],
            [l('services:', 'services:'), l('The top-level key; each entry under it becomes one container.', 'শীর্ষ-স্তরের কী; এর অধীনে প্রতিটি এন্ট্রি একটি কন্টেইনার হয়।')],
            [l('docker compose up', 'docker compose up'), l('Builds or pulls images and starts every service together.', 'image বিল্ড বা পুল করে ও প্রতিটি service একসঙ্গে চালু করে।')],
            [l('docker compose down', 'docker compose down'), l('Stops and removes the containers and the shared network.', 'কন্টেইনার ও shared network থামায় ও মুছে ফেলে।')],
            [l('shared network', 'shared network'), l('Created automatically so services reach each other by name.', 'স্বয়ংক্রিয়ভাবে তৈরি হয় যাতে service নাম দিয়ে একে অপরকে পৌঁছায়।')],
          ],
        } },
      ],
    },
    {
      h: l('When and where to use Compose', 'কখন ও কোথায় Compose ব্যবহার করবেন'),
      blocks: [
        { p: l('Reach for Compose the moment your app needs more than one container on a single machine. It is the default tool for local development environments (spin up your API plus its Postgres and Redis with one command), for automated tests in CI (bring up the real dependencies, run the suite, tear it down), and for small single-server deployments where a full orchestrator would be overkill. If a new teammate should be able to clone the repo and run the whole system in one step, Compose is the answer.', 'আপনার অ্যাপে একটি মেশিনে একের বেশি কন্টেইনার দরকার হলেই Compose নিন। এটি লোকাল ডেভেলপমেন্ট এনভায়রনমেন্টের ডিফল্ট টুল (আপনার API-এর সঙ্গে তার Postgres ও Redis এক কমান্ডে চালু করুন), CI-তে অটোমেটেড টেস্টের জন্য (আসল dependency চালু করুন, স্যুট চালান, বন্ধ করুন), এবং ছোট সিঙ্গল-সার্ভার ডিপ্লয়ের জন্য যেখানে একটি পূর্ণ অর্কেস্ট্রেটর বাড়াবাড়ি হতো। নতুন সহকর্মী রিপো ক্লোন করে এক ধাপে পুরো সিস্টেম চালাতে পারা উচিত হলে, Compose-ই উত্তর।') },
        { p: l('Where Compose is the wrong tool is multi-machine production at scale. Compose runs everything on one host, so it cannot spread containers across a cluster, restart them on a healthy node when a machine dies, or perform rolling zero-downtime updates. Those are the jobs of an orchestrator like Kubernetes. Think of Compose as the perfect tool for one machine, and an orchestrator for a whole fleet.', 'Compose যেখানে ভুল টুল তা হলো স্কেলে মাল্টি-মেশিন প্রোডাকশন। Compose সবকিছু এক হোস্টে চালায়, তাই এটি একটি ক্লাস্টারজুড়ে কন্টেইনার ছড়াতে, একটি মেশিন মরে গেলে সুস্থ node-এ আবার চালাতে, বা rolling zero-downtime আপডেট করতে পারে না। এগুলো কুবারনেটিসের মতো একটি অর্কেস্ট্রেটরের কাজ। Compose-কে এক মেশিনের জন্য নিখুঁত টুল, আর একটি পুরো fleet-এর জন্য অর্কেস্ট্রেটর ভাবুন।') },
      ],
    },
    {
      h: l('Compose vs a pile of docker run commands', 'Compose বনাম গাদা গাদা docker run কমান্ড'),
      blocks: [
        { p: l('Everything Compose does, you could technically do by hand: create a network with docker network create, then run each container with a long docker run line, remembering the right flags, ports, volumes, and start order every single time. The difference is that those commands live in your shell history and your head, while a compose file lives in the repository. It is declarative — you describe the desired end state and Compose makes reality match it — instead of imperative, where you list the exact commands to type.', 'Compose যা করে তার সবই আপনি চাইলে হাতে করতে পারতেন: docker network create দিয়ে একটি network বানিয়ে, তারপর প্রতিটি কন্টেইনার একটি লম্বা docker run লাইন দিয়ে চালিয়ে, প্রতিবার সঠিক flag, ports, volumes ও শুরুর ক্রম মনে রেখে। পার্থক্য হলো সেই কমান্ডগুলো আপনার shell history ও মাথায় থাকে, আর একটি compose ফাইল রিপোজিটরিতে থাকে। এটি declarative—আপনি কাঙ্ক্ষিত শেষ অবস্থা বর্ণনা করেন ও Compose বাস্তবকে তার সঙ্গে মেলায়—imperative নয়, যেখানে আপনি ঠিক কোন কমান্ড টাইপ করবেন তা তালিকা করেন।') },
        { p: l('That shift has real payoffs: the setup is reproducible on every machine, reviewable in a pull request, and self-documenting — the file is the documentation. Compose also namespaces everything under a project name, so up and down operate on the whole group cleanly, without stray containers or networks left behind.', 'এই বদলের বাস্তব লাভ আছে: সেটআপ প্রতিটি মেশিনে পুনরুৎপাদনযোগ্য, একটি pull request-এ রিভিউযোগ্য, ও স্ব-নথিভুক্ত—ফাইলটাই ডকুমেন্টেশন। Compose সবকিছু একটি project নামের অধীনে namespace করে, তাই up ও down পুরো দলে পরিষ্কারভাবে কাজ করে, কোনো এলোমেলো কন্টেইনার বা network পড়ে থাকে না।') },
      ],
    },
    {
      h: l('Common mistakes', 'সাধারণ ভুল'),
      blocks: [
        { list: [
          l('Mixing tabs and spaces, or misaligning indentation, so Compose reads a completely different structure than you meant — YAML is defined by indentation, so use two spaces per level and never a tab.', 'ট্যাব ও স্পেস মেশানো, বা ইনডেন্টেশন ভুল সারিবদ্ধ করা, ফলে Compose আপনার উদ্দেশ্যের চেয়ে পুরো ভিন্ন গঠন পড়ে—YAML ইনডেন্টেশন দিয়ে সংজ্ঞায়িত, তাই প্রতি স্তরে দুই স্পেস নিন, কখনো ট্যাব নয়।'),
          l('Expecting Compose to scale across many servers; it is single-host by design, so multi-machine production needs an orchestrator.', 'Compose অনেক সার্ভারজুড়ে স্কেল করবে আশা করা; এটি ডিজাইনেই সিঙ্গল-হোস্ট, তাই মাল্টি-মেশিন প্রোডাকশনে অর্কেস্ট্রেটর লাগে।'),
          l('Forgetting that docker compose up reuses an existing image by default — add --build when you change a Dockerfile, or your edit seems to do nothing.', 'ভুলে যাওয়া যে docker compose up ডিফল্টে একটি বিদ্যমান image পুনঃব্যবহার করে—Dockerfile বদলালে --build যোগ করুন, নইলে আপনার এডিট কিছুই করে না বলে মনে হয়।'),
          l('Leaving containers from an old run around because you stopped them with Ctrl+C but never ran docker compose down to remove the network and containers.', 'পুরনো রানের কন্টেইনার পড়ে থাকতে দেওয়া কারণ আপনি Ctrl+C দিয়ে থামিয়েছেন কিন্তু network ও কন্টেইনার মুছতে docker compose down চালাননি।'),
          l('Putting the file in the wrong place or misnaming it; Compose looks for compose.yaml (or docker-compose.yml) in the current directory.', 'ফাইলটি ভুল জায়গায় রাখা বা ভুল নাম দেওয়া; Compose বর্তমান ডিরেক্টরিতে compose.yaml (বা docker-compose.yml) খোঁজে।'),
        ] },
      ],
    },
    {
      h: l('Remember in one line', 'এক লাইনে মনে রাখুন'),
      blocks: [
        { list: [
          l('Docker Compose defines a multi-container app in one YAML file and runs the whole stack with docker compose up.', 'ডকার কম্পোজ একটি YAML ফাইলে একটি মাল্টি-কন্টেইনার অ্যাপ সংজ্ঞায়িত করে ও docker compose up দিয়ে পুরো স্ট্যাক চালায়।'),
          l('It is declarative and single-host: perfect for local dev, tests, and small deployments — not a multi-machine orchestrator.', 'এটি declarative ও সিঙ্গল-হোস্ট: লোকাল dev, টেস্ট ও ছোট ডিপ্লয়ের জন্য নিখুঁত—মাল্টি-মেশিন অর্কেস্ট্রেটর নয়।'),
          l('Indentation is meaning in YAML: two spaces per level, never tabs.', 'YAML-এ ইনডেন্টেশনই অর্থ: প্রতি স্তরে দুই স্পেস, কখনো ট্যাব নয়।'),
        ] },
      ],
    },
  ],

  // ── dk-compose-file · The compose file ────────────────────────────────────
  'dk-compose-file': [
    {
      h: l('What is the compose file?', 'কম্পোজ ফাইল কী?'),
      blocks: [
        { p: l('The compose file (compose.yaml, historically docker-compose.yml) is the single declarative document that describes your entire multi-container application. Its heart is the services: block, where each named entry becomes one container. Alongside services you can declare a top-level volumes: block for persistent data and networks: for custom wiring. Everything Compose needs to know about your app — which images to run, which ports to open, what configuration to inject, what data to keep — is written here, in plain YAML, and checked into your repository.', 'কম্পোজ ফাইল (compose.yaml, ঐতিহাসিকভাবে docker-compose.yml) হলো একটিমাত্র declarative নথি যা আপনার পুরো মাল্টি-কন্টেইনার অ্যাপ্লিকেশন বর্ণনা করে। এর হৃদয় হলো services: ব্লক, যেখানে প্রতিটি নামযুক্ত এন্ট্রি একটি কন্টেইনার হয়। services-এর পাশাপাশি আপনি স্থায়ী ডেটার জন্য একটি শীর্ষ-স্তরের volumes: ব্লক ও কাস্টম সংযোগের জন্য networks: ঘোষণা করতে পারেন। আপনার অ্যাপ সম্পর্কে Compose-এর যা জানা দরকার—কোন image চালাতে হবে, কোন ports খুলতে হবে, কী কনফিগারেশন দিতে হবে, কোন ডেটা রাখতে হবে—সব এখানে, সাধারণ YAML-এ লেখা ও রিপোজিটরিতে রাখা।') },
        { p: l('The problem it solves is capturing a whole system as code. Without it, the knowledge of how to run your app lives in scattered shell commands and someone\'s memory. The compose file gathers all of that into one reviewable, versioned file: the ports, the environment, the volume mounts, the start-order dependencies. Read the file top to bottom and you understand the shape of the whole application.', 'এটি যে সমস্যা সমাধান করে তা হলো একটি পুরো সিস্টেমকে কোড হিসেবে ধরে রাখা। এটি ছাড়া, আপনার অ্যাপ কীভাবে চালাতে হয় সেই জ্ঞান ছড়ানো shell কমান্ড ও কারো স্মৃতিতে থাকে। compose ফাইল এই সবকিছু একটি রিভিউযোগ্য, ভার্সনযুক্ত ফাইলে জড়ো করে: ports, environment, volume mount, শুরুর-ক্রমের নির্ভরতা। ফাইলটি ওপর থেকে নিচে পড়ুন আর পুরো অ্যাপ্লিকেশনের আকৃতি বুঝে যাবেন।') },
        { note: l('A compose file is a cast list for a play: each actor (service) has a role, a costume, and cues defined in one script. Anyone can pick up the script and stage the same production, because every part is written down in one place.', 'একটি compose ফাইল হলো একটি নাটকের কাস্ট তালিকা: প্রতিটি অভিনেতা (service)-এর ভূমিকা, পোশাক ও কিউ এক স্ক্রিপ্টে সংজ্ঞায়িত। যে কেউ স্ক্রিপ্টটি নিয়ে একই প্রযোজনা মঞ্চস্থ করতে পারে, কারণ প্রতিটি অংশ এক জায়গায় লেখা।'), kind: 'tip' },
      ],
    },
    {
      h: l('How the file is structured, step by step', 'ফাইল কীভাবে গঠিত, ধাপে ধাপে'),
      blocks: [
        { steps: [
          l('At the top level you usually have services: (required), and optionally volumes: and networks:.', 'শীর্ষ স্তরে সাধারণত থাকে services: (আবশ্যক), এবং ঐচ্ছিকভাবে volumes: ও networks:।'),
          l('Under services, each key you invent (web, db, api) names a service and becomes a container.', 'services-এর অধীনে আপনার বানানো প্রতিটি কী (web, db, api) একটি service-এর নাম দেয় ও একটি কন্টেইনার হয়।'),
          l('Inside a service, image: pulls a prebuilt image or build: . builds from a Dockerfile in that directory — you pick one.', 'একটি service-এর ভেতরে, image: একটি প্রি-বিল্ট image পুল করে বা build: . সেই ডিরেক্টরির একটি Dockerfile থেকে বিল্ড করে—আপনি একটি বাছেন।'),
          l('Add ports: to publish "host:container" ports, environment: for configuration, and volumes: to mount named volumes or bind mounts.', '"host:container" ports পাবলিশ করতে ports:, কনফিগারেশনের জন্য environment:, ও named volume বা bind mount মাউন্ট করতে volumes: যোগ করুন।'),
          l('Use depends_on: to declare that this service should start after another, and list any named volume again under the top-level volumes: key so Compose creates it.', 'এই service অন্যটির পরে চালু হবে তা বলতে depends_on: ব্যবহার করুন, ও যেকোনো named volume আবার শীর্ষ-স্তরের volumes: কী-এর অধীনে তালিকা করুন যাতে Compose তা তৈরি করে।'),
        ] },
        { code: `services:
  web:
    build: .
    ports:
      - "8080:3000"
    environment:
      - NODE_ENV=production
    depends_on:
      - db
  db:
    image: postgres:16
    environment:
      - POSTGRES_PASSWORD=secret
    volumes:
      - pgdata:/var/lib/postgresql/data

volumes:
  pgdata:`, caption: l('web builds from the local Dockerfile, publishes container port 3000 on host 8080, and reaches Postgres at the hostname "db". The named volume pgdata is declared at the bottom so the database data survives a restart or rebuild.', 'web লোকাল Dockerfile থেকে বিল্ড হয়, কন্টেইনার পোর্ট 3000 হোস্টের 8080-এ পাবলিশ করে, ও "db" হোস্টনামে Postgres-এ পৌঁছায়। named volume pgdata নিচে ঘোষণা করা যাতে ডেটাবেস ডেটা রিস্টার্ট বা রিবিল্ডেও টিকে থাকে।') },
      ],
    },
    {
      h: l('Key compose file keys', 'কম্পোজ ফাইলের মূল কী'),
      blocks: [
        { table: {
          head: [l('Key', 'কী'), l('What it means', 'যা বোঝায়')],
          rows: [
            [l('image: postgres:16', 'image: postgres:16'), l('Pull a prebuilt image at a pinned tag.', 'একটি পিন করা ট্যাগে প্রি-বিল্ট image পুল করে।')],
            [l('build: .', 'build: .'), l('Build this service from a Dockerfile in the given directory.', 'দেওয়া ডিরেক্টরির একটি Dockerfile থেকে এই service বিল্ড করে।')],
            [l('ports: ["8080:3000"]', 'ports: ["8080:3000"]'), l('Publish host port 8080 to the container\'s port 3000.', 'হোস্ট পোর্ট 8080 কন্টেইনারের পোর্ট 3000-এ পাবলিশ করে।')],
            [l('environment:', 'environment:'), l('Set environment variables for the service.', 'service-এর জন্য environment ভ্যারিয়েবল সেট করে।')],
            [l('volumes:', 'volumes:'), l('Mount a named volume or a host path to persist or share data.', 'ডেটা স্থায়ী বা শেয়ার করতে একটি named volume বা host path মাউন্ট করে।')],
            [l('depends_on:', 'depends_on:'), l('Start this service after the ones it lists.', 'এটি যেগুলো তালিকা করে তার পরে এই service চালু করে।')],
          ],
        } },
      ],
    },
    {
      h: l('image vs build: two ways to get a container', 'image বনাম build: কন্টেইনার পাওয়ার দুই উপায়'),
      blocks: [
        { p: l('Every service needs an image to run, and there are two ways to supply one. image: nginx:1.25 tells Compose to pull a ready-made image from a registry at an exact tag — ideal for off-the-shelf pieces like databases, caches, and proxies that you do not write yourself. build: . tells Compose to build the image from a Dockerfile in the given directory when you run docker compose build (or up --build) — this is how you package your own application code.', 'প্রতিটি service-এর চলতে একটি image লাগে, ও তা দেওয়ার দুটি উপায় আছে। image: nginx:1.25 Compose-কে বলে একটি রেজিস্ট্রি থেকে ঠিক একটি ট্যাগে তৈরি image পুল করতে—ডেটাবেস, ক্যাশ ও proxy-এর মতো তৈরি অংশের জন্য আদর্শ, যা আপনি নিজে লেখেন না। build: . Compose-কে বলে দেওয়া ডিরেক্টরির একটি Dockerfile থেকে image বিল্ড করতে যখন আপনি docker compose build (বা up --build) চালান—এভাবেই আপনি নিজের অ্যাপ্লিকেশন কোড প্যাকেজ করেন।') },
        { p: l('A typical stack mixes both: your own web or api service uses build:, while its supporting db and redis services use image: with pinned versions. Pinning those tags (postgres:16, not postgres:latest) keeps the stack reproducible, so a teammate who runs it next month gets the same database version you tested against.', 'একটি সাধারণ স্ট্যাক দুটোই মেশায়: আপনার নিজের web বা api service build: ব্যবহার করে, আর তার সহায়ক db ও redis service পিন করা ভার্সনসহ image: ব্যবহার করে। সেই ট্যাগ পিন করা (postgres:16, postgres:latest নয়) স্ট্যাক পুনরুৎপাদনযোগ্য রাখে, তাই পরের মাসে যে সহকর্মী চালায় সে আপনার টেস্ট করা একই ডেটাবেস ভার্সন পায়।') },
      ],
    },
    {
      h: l('When and where to shape the file this way', 'কখন ও কোথায় ফাইলটি এভাবে সাজাবেন'),
      blocks: [
        { p: l('Keep one compose file per project at the repository root so cloning and running are a single step. Group everything one app needs — its own service plus every backing store it talks to — into that file, and use pinned image tags for the parts you do not build. Declare a named volume for any service that must not lose data (databases, upload stores) and list it under the top-level volumes: key.', 'প্রতি প্রকল্পে একটি compose ফাইল রিপোজিটরির রুটে রাখুন যাতে ক্লোন ও চালানো এক ধাপ হয়। একটি অ্যাপের দরকারি সবকিছু—তার নিজের service ও যে সব backing store-এর সঙ্গে কথা বলে—সেই ফাইলে জড়ো করুন, ও যে অংশ আপনি বিল্ড করেন না তার জন্য পিন করা image ট্যাগ ব্যবহার করুন। যে service-এর ডেটা হারানো চলবে না (ডেটাবেস, আপলোড স্টোর) তার জন্য একটি named volume ঘোষণা করুন ও শীর্ষ-স্তরের volumes: কী-এর অধীনে তালিকা করুন।') },
        { p: l('For different environments, keep a base compose.yaml with what is common, and layer environment-specific overrides in a second file (for example compose.override.yaml for local development) rather than copying the whole file. This keeps the shared shape in one place and the differences small and visible.', 'ভিন্ন এনভায়রনমেন্টের জন্য, একটি বেস compose.yaml রাখুন যাতে সাধারণ যা তা থাকে, ও এনভায়রনমেন্ট-নির্দিষ্ট override একটি দ্বিতীয় ফাইলে স্তর করুন (যেমন লোকাল ডেভেলপমেন্টের জন্য compose.override.yaml) পুরো ফাইল কপি করার বদলে। এটি শেয়ার্ড আকৃতি এক জায়গায় ও পার্থক্য ছোট ও দৃশ্যমান রাখে।') },
      ],
    },
    {
      h: l('Common mistakes', 'সাধারণ ভুল'),
      blocks: [
        { list: [
          l('Indenting with tabs or inconsistent spaces, so a key lands at the wrong level and Compose silently reads a different structure — always two spaces per level, never a tab.', 'ট্যাব বা অসামঞ্জস্য স্পেসে ইনডেন্ট করা, ফলে একটি কী ভুল স্তরে পড়ে ও Compose নীরবে একটি ভিন্ন গঠন পড়ে—সবসময় প্রতি স্তরে দুই স্পেস, কখনো ট্যাব নয়।'),
          l('Forgetting the space after a colon (image:postgres instead of image: postgres), which is invalid YAML.', 'কোলনের পরে স্পেস ভুলে যাওয়া (image: postgres-এর বদলে image:postgres), যা অবৈধ YAML।'),
          l('Declaring a named volume under a service but forgetting to also list it under the top-level volumes: key, so Compose errors or does not persist it.', 'একটি service-এর অধীনে named volume ঘোষণা করে শীর্ষ-স্তরের volumes: কী-এর অধীনে তালিকা করতে ভুলে যাওয়া, ফলে Compose error দেয় বা তা স্থায়ী করে না।'),
          l('Writing ports as container:host by habit; the mapping is "host:container", so 8080:3000 exposes container port 3000 on host 8080.', 'অভ্যাসে ports কে container:host লেখা; ম্যাপিং হলো "host:container", তাই 8080:3000 কন্টেইনার পোর্ট 3000 হোস্টের 8080-এ খোলে।'),
          l('Using image: latest for a database, so the version silently changes on the next machine and breaks reproducibility.', 'একটি ডেটাবেসে image: latest ব্যবহার করা, ফলে পরের মেশিনে ভার্সন নীরবে বদলায় ও পুনরুৎপাদনযোগ্যতা ভাঙে।'),
        ] },
      ],
    },
    {
      h: l('Remember in one line', 'এক লাইনে মনে রাখুন'),
      blocks: [
        { list: [
          l('The compose file declares every service under services:, plus optional top-level volumes: and networks:.', 'compose ফাইল services:-এর অধীনে প্রতিটি service ঘোষণা করে, সঙ্গে ঐচ্ছিক শীর্ষ-স্তরের volumes: ও networks:।'),
          l('Each service uses image: to pull or build: to build; add ports, environment, volumes, and depends_on as needed.', 'প্রতিটি service পুল করতে image: বা বিল্ড করতে build: ব্যবহার করে; দরকারমতো ports, environment, volumes ও depends_on যোগ করুন।'),
          l('YAML is indentation-defined: two spaces per level, a space after every colon, and never a tab.', 'YAML ইনডেন্টেশন-নির্ভর: প্রতি স্তরে দুই স্পেস, প্রতি কোলনের পরে একটি স্পেস, ও কখনো ট্যাব নয়।'),
        ] },
      ],
    },
  ],

  // ── dk-compose-multi · Multi-container apps ───────────────────────────────
  'dk-compose-multi': [
    {
      h: l('What is a multi-container app in Compose?', 'Compose-এ মাল্টি-কন্টেইনার অ্যাপ কী?'),
      blocks: [
        { p: l('A real application is usually several cooperating processes: a web front end, an API, a database, a cache, maybe a background worker. In Compose, each of those is a service, and Compose\'s job is to make them behave as one coordinated system. Two features do most of the work: a shared network that lets services find each other by name, and depends_on, which controls the order in which they start.', 'একটি বাস্তব অ্যাপ্লিকেশন সাধারণত কয়েকটি সহযোগী প্রসেস: একটি web front end, একটি API, একটি ডেটাবেস, একটি ক্যাশ, হয়তো একটি background worker। Compose-এ এদের প্রত্যেকটি একটি service, আর Compose-এর কাজ এদের একটি সমন্বিত সিস্টেম হিসেবে আচরণ করানো। দুটি বৈশিষ্ট্য বেশিরভাগ কাজ করে: একটি shared network যা service-দের নাম দিয়ে একে অপরকে খুঁজতে দেয়, ও depends_on, যা এরা কোন ক্রমে চালু হবে তা নিয়ন্ত্রণ করে।') },
        { p: l('The problem this solves is wiring. Run those containers separately and you must create a network, connect each container to it, discover each container\'s IP address (which changes on restart), and hand-hold the start order. Compose does all of that automatically: every service in one compose file joins a single private network, gets a DNS name equal to its service name, and starts in an order you can influence. Your web service simply connects to the host "db" and it works.', 'এটি যে সমস্যা সমাধান করে তা হলো সংযোগ (wiring)। সেই কন্টেইনারগুলো আলাদা চালালে আপনাকে একটি network বানাতে, প্রতিটি কন্টেইনার তাতে যুক্ত করতে, প্রতিটি কন্টেইনারের IP ঠিকানা খুঁজতে (যা রিস্টার্টে বদলায়), ও শুরুর ক্রম হাতে সামলাতে হয়। Compose এই সবই স্বয়ংক্রিয়ভাবে করে: এক compose ফাইলের প্রতিটি service একটি প্রাইভেট network-এ যোগ দেয়, তার service নামের সমান একটি DNS নাম পায়, ও এমন একটি ক্রমে চালু হয় যা আপনি প্রভাবিত করতে পারেন। আপনার web service শুধু "db" হোস্টে সংযোগ করে আর কাজ হয়ে যায়।') },
        { note: l('Picture an assembly line where each station knows the next by name and waits for the previous one to be ready before it begins. The stations do not need each other\'s exact location — a name is enough — and the order of work is built into the line.', 'একটি অ্যাসেম্বলি লাইন ভাবুন যেখানে প্রতিটি স্টেশন পরেরটিকে নামে চেনে ও শুরুর আগে আগেরটি প্রস্তুত হওয়ার জন্য অপেক্ষা করে। স্টেশনগুলোর একে অপরের ঠিক অবস্থান লাগে না—একটি নামই যথেষ্ট—আর কাজের ক্রম লাইনের মধ্যেই গাঁথা।'), kind: 'tip' },
      ],
    },
    {
      h: l('How services find and wait for each other', 'service-রা কীভাবে একে অপরকে খোঁজে ও অপেক্ষা করে'),
      blocks: [
        { steps: [
          l('When you run docker compose up, Compose creates one private network and attaches every service to it.', 'আপনি docker compose up চালালে, Compose একটি প্রাইভেট network তৈরি করে ও প্রতিটি service তাতে যুক্ত করে।'),
          l('Each service is registered in that network\'s DNS under its service name, so web can reach the database at the hostname "db" — no IP needed.', 'প্রতিটি service সেই network-এর DNS-এ তার service নামে নিবন্ধিত হয়, তাই web ডেটাবেসকে "db" হোস্টনামে পৌঁছাতে পারে—কোনো IP লাগে না।'),
          l('You put the service name into your connection string or config — for example postgres://app:secret@db:5432/app — where db is the service, not a machine.', 'আপনি service নামটি আপনার connection string বা config-এ বসান—যেমন postgres://app:secret@db:5432/app—যেখানে db একটি service, একটি মেশিন নয়।'),
          l('Adding depends_on: [db] to the web service tells Compose to start db first, then web.', 'web service-এ depends_on: [db] যোগ করলে Compose-কে বলা হয় আগে db, তারপর web চালু করতে।'),
          l('Compose starts them in dependency order and streams the combined logs, so you watch the whole system boot in one place.', 'Compose এদের নির্ভরতার ক্রমে চালু করে ও মিলিত logs স্ট্রিম করে, তাই আপনি এক জায়গায় পুরো সিস্টেম boot হতে দেখেন।'),
        ] },
        { code: `services:
  api:
    build: .
    depends_on:
      - db
    environment:
      - DATABASE_URL=postgres://app:secret@db:5432/app
  db:
    image: postgres:16
    environment:
      - POSTGRES_USER=app
      - POSTGRES_PASSWORD=secret
      - POSTGRES_DB=app`, caption: l('The api service reaches Postgres through the hostname "db" — the service name — inside its DATABASE_URL. depends_on starts db before api. No IP address is ever written down.', 'api service তার DATABASE_URL-এর ভেতরে "db" হোস্টনাম—service নাম—দিয়ে Postgres-এ পৌঁছায়। depends_on api-এর আগে db চালু করে। কোনো IP ঠিকানা কখনো লেখা হয় না।') },
      ],
    },
    {
      h: l('Key multi-service pieces', 'মাল্টি-সার্ভিসের মূল অংশ'),
      blocks: [
        { table: {
          head: [l('Piece', 'অংশ'), l('What it does', 'যা করে')],
          rows: [
            [l('shared network', 'shared network'), l('Compose creates one automatically; all services join it.', 'Compose স্বয়ংক্রিয়ভাবে একটি বানায়; সব service তাতে যোগ দেয়।')],
            [l('service name as hostname', 'হোস্টনাম হিসেবে service নাম'), l('Reach another service by its name, for example the host "db".', 'অন্য একটি service-কে তার নামে পৌঁছান, যেমন হোস্ট "db"।')],
            [l('depends_on: [db]', 'depends_on: [db]'), l('Start this service after db has started.', 'db চালু হওয়ার পরে এই service চালু করে।')],
            [l('healthcheck + condition', 'healthcheck + condition'), l('Wait until a service is actually ready, not just started.', 'একটি service শুধু চালু নয়, আসলে প্রস্তুত হওয়া পর্যন্ত অপেক্ষা করে।')],
            [l('internal vs published', 'ভেতরের বনাম পাবলিশড'), l('Services talk internally by name; only publish ports you need outside.', 'service-রা ভেতরে নাম দিয়ে কথা বলে; শুধু বাইরে দরকারি ports পাবলিশ করুন।')],
          ],
        } },
      ],
    },
    {
      h: l('depends_on starts, it does not wait for ready', 'depends_on চালু করে, প্রস্তুতির জন্য অপেক্ষা করে না'),
      blocks: [
        { p: l('The single most important subtlety in multi-container Compose is what depends_on actually guarantees. It controls start order — Compose will not start web until the db container has started — but "started" is not the same as "ready". A Postgres container reports as started the instant its process launches, several seconds before the database is actually accepting connections. So a web service that connects on boot can still race ahead and fail with "connection refused", even though depends_on is set correctly.', 'মাল্টি-কন্টেইনার Compose-এর সবচেয়ে গুরুত্বপূর্ণ সূক্ষ্মতা হলো depends_on আসলে কী নিশ্চিত করে। এটি শুরুর ক্রম নিয়ন্ত্রণ করে—db কন্টেইনার চালু না হওয়া পর্যন্ত Compose web চালু করবে না—কিন্তু "চালু" আর "প্রস্তুত" এক নয়। একটি Postgres কন্টেইনার তার প্রসেস চালু হওয়ার মুহূর্তেই "চালু" জানায়, ডেটাবেস আসলে সংযোগ নেওয়ার কয়েক সেকেন্ড আগে। তাই boot-এ সংযোগ করা একটি web service এগিয়ে গিয়ে "connection refused" দিয়ে ব্যর্থ হতে পারে, যদিও depends_on ঠিকভাবে সেট করা।') },
        { p: l('There are two robust fixes. The simplest is to make your application retry its database connection on startup with a short backoff — good practice regardless, because databases restart in production too. The more precise fix is to give the db a healthcheck and use the long form of depends_on with condition: service_healthy, so Compose waits until the healthcheck passes before starting web.', 'দুটি মজবুত সমাধান আছে। সবচেয়ে সরলটি হলো আপনার অ্যাপ্লিকেশনকে চালুতে একটি ছোট backoff-সহ ডেটাবেস সংযোগ retry করানো—যেভাবেই হোক ভালো চর্চা, কারণ প্রোডাকশনেও ডেটাবেস রিস্টার্ট করে। আরও নির্দিষ্ট সমাধান হলো db-কে একটি healthcheck দেওয়া ও condition: service_healthy সহ depends_on-এর লম্বা রূপ ব্যবহার করা, যাতে web চালুর আগে Compose healthcheck পাস হওয়া পর্যন্ত অপেক্ষা করে।') },
        { note: l('depends_on only waits for a container to START, not to be READY to serve. Never assume the database is accepting connections just because depends_on is set — add a healthcheck condition or retry logic, or your app will intermittently crash on boot.', 'depends_on শুধু একটি কন্টেইনার START হওয়ার জন্য অপেক্ষা করে, সেবা দিতে READY হওয়ার জন্য নয়। depends_on সেট আছে বলেই ধরে নেবেন না ডেটাবেস সংযোগ নিচ্ছে—একটি healthcheck condition বা retry logic যোগ করুন, নইলে আপনার অ্যাপ boot-এ মাঝেমধ্যে ক্র্যাশ করবে।'), kind: 'warn' },
      ],
    },
    {
      h: l('When and where this matters', 'এটি কখন ও কোথায় গুরুত্বপূর্ণ'),
      blocks: [
        { p: l('Every non-trivial app is multi-container, so this is the everyday case. Reach for service-name networking any time one service must talk to another: the API to its database, the web app to a cache, a worker to a message queue. Prefer names over hard-coded IPs always — Compose assigns IPs dynamically and they change on restart, so a name is the only stable address.', 'প্রতিটি উল্লেখযোগ্য অ্যাপ মাল্টি-কন্টেইনার, তাই এটি প্রতিদিনের ঘটনা। যখনই একটি service অন্যটির সঙ্গে কথা বলবে তখনই service-নাম networking নিন: API তার ডেটাবেসে, web অ্যাপ একটি ক্যাশে, একটি worker একটি message queue-তে। সবসময় হার্ড-কোড করা IP-এর বদলে নাম নিন—Compose গতিশীলভাবে IP বরাদ্দ করে ও রিস্টার্টে এরা বদলায়, তাই নামই একমাত্র স্থিতিশীল ঠিকানা।') },
        { p: l('Reach for depends_on to express real ordering (start the database before the app that needs it), but pair it with a healthcheck or retry whenever the dependent service connects immediately on startup. Keep services that do not need to be reachable from outside unpublished — they can still talk to each other over the internal network, and not publishing their ports keeps them off the host and safer.', 'সত্যিকারের ক্রম প্রকাশ করতে depends_on নিন (যে অ্যাপের দরকার তার আগে ডেটাবেস চালু করুন), তবে নির্ভরশীল service চালুতেই সংযোগ করলে এটিকে একটি healthcheck বা retry-এর সঙ্গে জোড়া দিন। যে service-দের বাইরে থেকে পৌঁছানোর দরকার নেই সেগুলো unpublished রাখুন—এরা এখনো ভেতরের network-এ একে অপরের সঙ্গে কথা বলতে পারে, ও তাদের ports পাবলিশ না করা এদের হোস্ট থেকে দূরে ও নিরাপদ রাখে।') },
      ],
    },
    {
      h: l('Common mistakes', 'সাধারণ ভুল'),
      blocks: [
        { list: [
          l('Assuming depends_on waits for readiness; it only waits for the container to start, so add a healthcheck condition or connection retries.', 'ধরে নেওয়া depends_on প্রস্তুতির জন্য অপেক্ষা করে; এটি শুধু কন্টেইনার চালুর জন্য অপেক্ষা করে, তাই একটি healthcheck condition বা সংযোগ retry যোগ করুন।'),
          l('Hard-coding a container\'s IP address instead of using the service name, then breaking when Docker assigns a new IP on the next restart.', 'service নামের বদলে একটি কন্টেইনারের IP ঠিকানা হার্ড-কোড করা, তারপর পরের রিস্টার্টে ডকার নতুন IP দিলে ভাঙা।'),
          l('Misindenting depends_on or the service block so it attaches to the wrong service — keep two-space steps and never mix tabs.', 'depends_on বা service ব্লক ভুল ইনডেন্ট করা যাতে তা ভুল service-এ যুক্ত হয়—দুই-স্পেস ধাপ রাখুন ও কখনো ট্যাব মেশাবেন না।'),
          l('Publishing a database\'s port to the host when only another container needs it, exposing it unnecessarily instead of relying on the internal network.', 'শুধু অন্য একটি কন্টেইনারের দরকার হলেও একটি ডেটাবেসের পোর্ট হোস্টে পাবলিশ করা, ভেতরের network-এ নির্ভর করার বদলে অপ্রয়োজনে খোলা।'),
          l('Putting the list-item dash at the wrong indentation under depends_on:, so YAML parses it as a sibling key rather than a list entry.', 'depends_on:-এর অধীনে list-item ড্যাশ ভুল ইনডেন্টে রাখা, ফলে YAML একে একটি list এন্ট্রি নয়, বরং একটি সহোদর কী হিসেবে পড়ে।'),
        ] },
      ],
    },
    {
      h: l('Remember in one line', 'এক লাইনে মনে রাখুন'),
      blocks: [
        { list: [
          l('Compose puts every service on one network and gives each a DNS name equal to its service name — reach "db" by name, never by IP.', 'Compose প্রতিটি service একটি network-এ রাখে ও প্রত্যেককে তার service নামের সমান একটি DNS নাম দেয়—"db"-তে নামে পৌঁছান, কখনো IP-তে নয়।'),
          l('depends_on sets start order but not readiness; add a healthcheck condition or retry logic for real dependencies.', 'depends_on শুরুর ক্রম সেট করে কিন্তু প্রস্তুতি নয়; সত্যিকারের নির্ভরতার জন্য একটি healthcheck condition বা retry logic যোগ করুন।'),
          l('Only publish the ports you need outside; services talk to each other over the internal network for free.', 'শুধু বাইরে দরকারি ports পাবলিশ করুন; service-রা ভেতরের network-এ বিনামূল্যে একে অপরের সঙ্গে কথা বলে।'),
        ] },
      ],
    },
  ],

  // ── dk-compose-env · Env & config in Compose ──────────────────────────────
  'dk-compose-env': [
    {
      h: l('What is environment & config in Compose?', 'Compose-এ environment ও config কী?'),
      blocks: [
        { p: l('Configuration is everything about your app that changes between environments but not between runs: database URLs, ports, feature flags, and secrets like passwords and API keys. The golden rule is to keep this out of the image and inject it at run time, so one image runs unchanged in development, staging, and production. Compose gives you several ways to do that: the environment: key to set variables inline, the env_file: key to load a whole file of variables into a service, and a special .env file that Compose reads automatically.', 'কনফিগারেশন হলো আপনার অ্যাপের সেই সব কিছু যা এনভায়রনমেন্টের মধ্যে বদলায় কিন্তু রানের মধ্যে নয়: ডেটাবেস URL, ports, feature flag, ও পাসওয়ার্ড ও API key-এর মতো সিক্রেট। সোনালি নিয়ম হলো এগুলো image-এর বাইরে রাখা ও রান-টাইমে দেওয়া, যাতে একটি image ডেভেলপমেন্ট, staging ও প্রোডাকশনে অপরিবর্তিত চলে। Compose এর কয়েকটি উপায় দেয়: ভ্যারিয়েবল inline সেট করতে environment: কী, একটি service-এ একটি পুরো ফাইলের ভ্যারিয়েবল লোড করতে env_file: কী, ও একটি বিশেষ .env ফাইল যা Compose স্বয়ংক্রিয়ভাবে পড়ে।') },
        { p: l('The problem this solves is baking config into images. If your database password is hard-coded in the Dockerfile, you need a different image per environment and your secret is frozen into a shareable artifact — a security and maintenance nightmare. Externalizing config means the same tested image is promoted from dev to prod with only its environment changing, and secrets live in files that never enter the image or the registry.', 'এটি যে সমস্যা সমাধান করে তা হলো config-কে image-এ বেক করা। আপনার ডেটাবেস পাসওয়ার্ড Dockerfile-এ হার্ড-কোড করা থাকলে প্রতি এনভায়রনমেন্টে একটি ভিন্ন image লাগে ও আপনার সিক্রেট একটি শেয়ারযোগ্য artifact-এ জমাট হয়ে যায়—একটি নিরাপত্তা ও রক্ষণাবেক্ষণ দুঃস্বপ্ন। config বাইরে রাখা মানে একই টেস্ট করা image dev থেকে prod-এ শুধু তার environment বদলে উন্নীত হয়, ও সিক্রেট এমন ফাইলে থাকে যা কখনো image বা রেজিস্ট্রিতে ঢোকে না।') },
        { note: l('Think of a settings panel per service, plus one shared settings file the whole app reads from. You ship the same appliance everywhere and change only the dials and the settings card at each location — you never rebuild the appliance itself.', 'প্রতি service-এ একটি সেটিংস প্যানেল ভাবুন, সঙ্গে একটি শেয়ার্ড সেটিংস ফাইল যা পুরো অ্যাপ পড়ে। আপনি একই যন্ত্র সর্বত্র পাঠান ও প্রতিটি জায়গায় শুধু ডায়াল ও সেটিংস কার্ড বদলান—যন্ত্রটি নিজে কখনো পুনর্নির্মাণ করেন না।'), kind: 'tip' },
      ],
    },
    {
      h: l('How config flows in, step by step', 'config কীভাবে ঢোকে, ধাপে ধাপে'),
      blocks: [
        { steps: [
          l('Put per-environment values and secrets in a file named .env (or a custom name), one KEY=value per line.', 'প্রতি-এনভায়রনমেন্ট মান ও সিক্রেট .env নামের একটি ফাইলে (বা একটি কাস্টম নাম) রাখুন, প্রতি লাইনে একটি KEY=value।'),
          l('In a service, use env_file: to load that whole file\'s variables into the container\'s environment.', 'একটি service-এ, সেই পুরো ফাইলের ভ্যারিয়েবল কন্টেইনারের environment-এ লোড করতে env_file: ব্যবহার করুন।'),
          l('Use environment: for a few explicit values you want visible right in the compose file — non-secret defaults like POSTGRES_DB.', 'কয়েকটি স্পষ্ট মানের জন্য environment: ব্যবহার করুন যা আপনি compose ফাইলেই দৃশ্যমান চান—POSTGRES_DB-এর মতো নন-সিক্রেট ডিফল্ট।'),
          l('Compose also auto-reads a .env file in the project directory and can substitute those values into the compose file itself, filling in placeholders you write there.', 'Compose প্রকল্প ডিরেক্টরির একটি .env ফাইলও স্বয়ংক্রিয়ভাবে পড়ে ও সেই মান compose ফাইলেই বসাতে পারে, সেখানে লেখা placeholder ভরে।'),
          l('Your application reads its configuration from these environment variables at startup, so the same image behaves correctly in every environment.', 'আপনার অ্যাপ্লিকেশন চালুতে এই environment ভ্যারিয়েবল থেকে তার কনফিগারেশন পড়ে, তাই একই image প্রতিটি এনভায়রনমেন্টে সঠিক আচরণ করে।'),
        ] },
        { code: `# compose.yaml — load secrets from a file, set plain defaults inline
services:
  db:
    image: postgres:16
    env_file:
      - .env
    environment:
      - POSTGRES_DB=app

# .env — one KEY=value per line; keep this out of git
POSTGRES_USER=app
POSTGRES_PASSWORD=super-secret-value`, caption: l('env_file loads every KEY=value from .env into the db container, while environment: sets a non-secret default (POSTGRES_DB) right in the file. The .env holds the real secret and must be gitignored, never committed.', 'env_file .env থেকে প্রতিটি KEY=value db কন্টেইনারে লোড করে, আর environment: একটি নন-সিক্রেট ডিফল্ট (POSTGRES_DB) ফাইলেই সেট করে। .env আসল সিক্রেট ধরে ও অবশ্যই gitignore করতে হবে, কখনো কমিট নয়।') },
      ],
    },
    {
      h: l('Key config keys', 'মূল config কী'),
      blocks: [
        { table: {
          head: [l('Key', 'কী'), l('What it does', 'যা করে')],
          rows: [
            [l('environment:', 'environment:'), l('Set variables inline in the compose file, per service.', 'compose ফাইলে inline, প্রতি service-এ ভ্যারিয়েবল সেট করে।')],
            [l('env_file:', 'env_file:'), l('Load a whole file of KEY=value pairs into the service.', 'KEY=value জোড়ার একটি পুরো ফাইল service-এ লোড করে।')],
            [l('.env (auto-loaded)', '.env (auto-loaded)'), l('Compose reads it from the project directory automatically.', 'Compose প্রকল্প ডিরেক্টরি থেকে স্বয়ংক্রিয়ভাবে এটি পড়ে।')],
            [l('secrets:', 'secrets:'), l('Mount sensitive values as files, kept out of environment and logs.', 'সংবেদনশীল মান ফাইল হিসেবে মাউন্ট করে, environment ও logs থেকে দূরে রাখে।')],
            [l('.gitignore the .env', '.env কে .gitignore করুন'), l('Never commit real secrets to version control.', 'আসল সিক্রেট কখনো ভার্সন কন্ট্রোলে কমিট করবেন না।')],
          ],
        } },
      ],
    },
    {
      h: l('environment vs env_file vs .env: which is which', 'environment বনাম env_file বনাম .env: কোনটি কী'),
      blocks: [
        { p: l('These three are easy to confuse because they all deal with variables. environment: lists variables directly inside a service in the compose file — good for a handful of non-secret, self-documenting values. env_file: points a service at an external file whose KEY=value lines are all loaded into that container — good when there are many variables, or when they are secret and should not sit in the committed compose file. The top-level .env file is different again: Compose reads it automatically and uses it to fill in variable substitutions in the compose file itself, and it is the default source when you do not name a file.', 'এই তিনটি সহজে গুলিয়ে যায় কারণ সবগুলোই ভ্যারিয়েবল নিয়ে কাজ করে। environment: compose ফাইলে একটি service-এর ভেতরে সরাসরি ভ্যারিয়েবল তালিকা করে—কয়েকটি নন-সিক্রেট, স্ব-নথিভুক্ত মানের জন্য ভালো। env_file: একটি service-কে একটি বাহ্যিক ফাইলের দিকে নির্দেশ করে যার KEY=value লাইনগুলো সব সেই কন্টেইনারে লোড হয়—যখন অনেক ভ্যারিয়েবল থাকে, বা এরা সিক্রেট ও কমিট করা compose ফাইলে থাকা উচিত নয় তখন ভালো। শীর্ষ-স্তরের .env ফাইল আবার ভিন্ন: Compose একে স্বয়ংক্রিয়ভাবে পড়ে ও compose ফাইলেই ভ্যারিয়েবল substitution ভরতে ব্যবহার করে, আর আপনি কোনো ফাইলের নাম না দিলে এটি ডিফল্ট উৎস।') },
        { p: l('A clean setup uses all three deliberately: a small environment: block for obvious defaults, an env_file: pointing at an uncommitted secrets file for passwords and keys, and a .env for values that parameterize the compose file. The rule of thumb: the more sensitive a value, the further it should live from the committed compose file.', 'একটি পরিচ্ছন্ন সেটআপ তিনটিই সচেতনভাবে ব্যবহার করে: স্পষ্ট ডিফল্টের জন্য একটি ছোট environment: ব্লক, পাসওয়ার্ড ও key-এর জন্য একটি আন-কমিটেড সিক্রেট ফাইলের দিকে নির্দেশ করা একটি env_file:, ও compose ফাইল প্যারামিটারাইজ করা মানের জন্য একটি .env। মোটা দাগের নিয়ম: একটি মান যত সংবেদনশীল, কমিট করা compose ফাইল থেকে তত দূরে থাকা উচিত।') },
      ],
    },
    {
      h: l('Where secrets should live', 'সিক্রেট কোথায় থাকা উচিত'),
      blocks: [
        { p: l('Treat secrets with special care. Anything sensitive — database passwords, API tokens, signing keys — belongs in a file that is listed in .gitignore and never committed, or in a dedicated secrets manager, not inline in the compose file that lives in your repository. Commit an example template (.env.example) with the keys and dummy values so teammates know what to fill in, but keep the real .env local.', 'সিক্রেটকে বিশেষ যত্নে সামলান। যেকোনো সংবেদনশীল জিনিস—ডেটাবেস পাসওয়ার্ড, API token, signing key—এমন একটি ফাইলে থাকা উচিত যা .gitignore-এ তালিকাভুক্ত ও কখনো কমিট করা হয় না, অথবা একটি নিবেদিত secrets manager-এ, আপনার রিপোজিটরিতে থাকা compose ফাইলে inline নয়। key ও ডামি মানসহ একটি উদাহরণ টেমপ্লেট (.env.example) কমিট করুন যাতে সহকর্মীরা জানে কী ভরতে হবে, কিন্তু আসল .env লোকাল রাখুন।') },
        { p: l('For production, prefer Docker\'s secrets: mechanism or your platform\'s secret store over plain environment variables, because variables can leak through docker inspect, process listings, and logs. In development an uncommitted .env is usually fine; the danger is letting that habit follow you into production, where a leaked secret is a real breach.', 'প্রোডাকশনের জন্য, সাধারণ environment ভ্যারিয়েবলের চেয়ে ডকারের secrets: প্রক্রিয়া বা আপনার প্ল্যাটফর্মের secret store নিন, কারণ ভ্যারিয়েবল docker inspect, process তালিকা ও logs দিয়ে ফাঁস হতে পারে। ডেভেলপমেন্টে একটি আন-কমিটেড .env সাধারণত ঠিক আছে; বিপদ হলো সেই অভ্যাসকে প্রোডাকশন পর্যন্ত টেনে নেওয়া, যেখানে একটি ফাঁস হওয়া সিক্রেট একটি সত্যিকারের breach।') },
        { note: l('A committed .env full of production secrets is one of the most common and most damaging mistakes — anyone with repo access, now or in the git history forever, can read it. Add .env to .gitignore before your first commit, and rotate any secret that has ever been committed.', 'প্রোডাকশন সিক্রেটে ভরা একটি কমিট করা .env সবচেয়ে সাধারণ ও সবচেয়ে ক্ষতিকর ভুলগুলোর একটি—রিপো অ্যাক্সেস থাকা যে কেউ, এখন বা git history-তে চিরকাল, এটি পড়তে পারে। প্রথম কমিটের আগে .env কে .gitignore-এ যোগ করুন, ও কখনো কমিট হওয়া যেকোনো সিক্রেট rotate করুন।'), kind: 'warn' },
      ],
    },
    {
      h: l('Common mistakes', 'সাধারণ ভুল'),
      blocks: [
        { list: [
          l('Committing a .env full of real secrets to git, exposing them to everyone with repo access and leaving them in history forever.', 'আসল সিক্রেটে ভরা একটি .env git-এ কমিট করা, রিপো অ্যাক্সেস থাকা সবার কাছে ফাঁস ও চিরকাল history-তে রেখে দেওয়া।'),
          l('Baking environment-specific config into the image, so you need a separate build per environment instead of one image everywhere.', 'এনভায়রনমেন্ট-নির্দিষ্ট config image-এ বেক করা, ফলে সর্বত্র এক image-এর বদলে প্রতি এনভায়রনমেন্টে একটি আলাদা বিল্ড লাগে।'),
          l('Misindenting the environment: list so a value attaches to the wrong service — keep two-space indentation and never tabs.', 'environment: তালিকা ভুল ইনডেন্ট করা যাতে একটি মান ভুল service-এ যুক্ত হয়—দুই-স্পেস ইনডেন্টেশন রাখুন ও কখনো ট্যাব নয়।'),
          l('Confusing environment: (inline values) with env_file: (a loaded file) and putting secrets inline in the committed compose file.', 'environment: (inline মান) ও env_file: (একটি লোড করা ফাইল) গুলিয়ে ফেলা ও কমিট করা compose ফাইলে সিক্রেট inline রাখা।'),
          l('Assuming environment variables are private; they can leak via docker inspect and logs, so use secrets for truly sensitive values.', 'ধরে নেওয়া environment ভ্যারিয়েবল প্রাইভেট; এরা docker inspect ও logs দিয়ে ফাঁস হতে পারে, তাই সত্যিই সংবেদনশীল মানে secrets ব্যবহার করুন।'),
        ] },
      ],
    },
    {
      h: l('Remember in one line', 'এক লাইনে মনে রাখুন'),
      blocks: [
        { list: [
          l('Keep config out of the image and inject it at run time with environment:, env_file:, and the auto-loaded .env.', 'config image-এর বাইরে রাখুন ও environment:, env_file: ও অটো-লোড হওয়া .env দিয়ে রান-টাইমে দিন।'),
          l('Secrets go in an uncommitted, gitignored file (or a secrets manager) — never inline in the committed compose file.', 'সিক্রেট একটি আন-কমিটেড, gitignore-করা ফাইলে (বা একটি secrets manager-এ) যায়—কখনো কমিট করা compose ফাইলে inline নয়।'),
          l('One image, many environments: only the injected configuration changes between dev, staging, and prod.', 'এক image, অনেক এনভায়রনমেন্ট: dev, staging ও prod-এর মধ্যে শুধু দেওয়া কনফিগারেশন বদলায়।'),
        ] },
      ],
    },
  ],

  // ── dk-compose-scale · Scaling & lifecycle ────────────────────────────────
  'dk-compose-scale': [
    {
      h: l('What are scaling & lifecycle in Compose?', 'Compose-এ scaling ও lifecycle কী?'),
      blocks: [
        { p: l('Once your stack is defined, you spend most of your time managing its lifecycle: bringing it up, watching its logs, and tearing it down. Compose gives you a small, memorable set of commands for this — up to start everything, down to stop and remove it, logs to watch, and ps to list what is running. Scaling is one more dial on top: the --scale flag runs several identical replicas of a single service behind Compose\'s internal network.', 'আপনার স্ট্যাক একবার সংজ্ঞায়িত হলে, বেশিরভাগ সময় আপনি এর lifecycle সামলান: এটি চালু করা, এর logs দেখা, ও বন্ধ করা। Compose এর জন্য একটি ছোট, মনে রাখার মতো কমান্ড-সেট দেয়—সব চালু করতে up, থামিয়ে মুছতে down, দেখতে logs, ও কী চলছে তালিকা করতে ps। Scaling তার ওপর আরেকটি ডায়াল: --scale flag একটি single service-এর কয়েকটি অভিন্ন replica Compose-এর ভেতরের network-এর পেছনে চালায়।') },
        { p: l('The problem this solves is operating a multi-container app as one unit. Without Compose you would start, stop, and inspect each container individually and try to keep them in sync. Compose treats the whole stack as a single named project, so one command acts on all of it at once — start the group, tail the group\'s logs, or remove the group cleanly with nothing left behind.', 'এটি যে সমস্যা সমাধান করে তা হলো একটি মাল্টি-কন্টেইনার অ্যাপকে এক একক হিসেবে চালানো। Compose ছাড়া আপনি প্রতিটি কন্টেইনার আলাদা চালু, থামানো ও পরিদর্শন করতেন ও এদের সিংকে রাখার চেষ্টা করতেন। Compose পুরো স্ট্যাককে একটি নামযুক্ত project হিসেবে ধরে, তাই একটি কমান্ড একবারে পুরোটায় কাজ করে—দল চালু করুন, দলের logs দেখুন, বা কিছু পড়ে না থেকে দল পরিষ্কারভাবে মুছুন।') },
        { note: l('Think of a master switch for the whole stack, plus a dial to add more copies of any one worker. One switch controls the group; the dial lets you turn up how many of a single service are running.', 'পুরো স্ট্যাকের জন্য একটি মাস্টার সুইচ ভাবুন, সঙ্গে যেকোনো একটি worker-এর বেশি কপি যোগ করার একটি ডায়াল। একটি সুইচ দল নিয়ন্ত্রণ করে; ডায়াল একটি single service-এর কতগুলো চলছে তা বাড়াতে দেয়।'), kind: 'tip' },
      ],
    },
    {
      h: l('The lifecycle, step by step', 'lifecycle, ধাপে ধাপে'),
      blocks: [
        { steps: [
          l('docker compose up -d builds or pulls every image and starts the whole stack in the background (detached).', 'docker compose up -d প্রতিটি image বিল্ড বা পুল করে ও পুরো স্ট্যাক ব্যাকগ্রাউন্ডে (ডিটাচড) চালু করে।'),
          l('docker compose ps shows which services are running, and docker compose logs -f streams their combined output so you can follow what is happening.', 'docker compose ps দেখায় কোন service চলছে, ও docker compose logs -f তাদের মিলিত আউটপুট স্ট্রিম করে যাতে আপনি কী ঘটছে follow করতে পারেন।'),
          l('docker compose up --scale web=3 runs three replicas of the web service, all sharing the internal network.', 'docker compose up --scale web=3 web service-এর তিনটি replica চালায়, সবাই ভেতরের network ভাগ করে।'),
          l('docker compose stop pauses the containers without removing them; docker compose start brings them back.', 'docker compose stop কন্টেইনার মুছে না ফেলে থামায়; docker compose start এদের ফিরিয়ে আনে।'),
          l('docker compose down stops and removes the containers and the network — and, only if you add -v, the named volumes and their data too.', 'docker compose down কন্টেইনার ও network থামায় ও মুছে ফেলে—এবং, শুধু -v যোগ করলে, named volume ও তাদের ডেটাও।'),
        ] },
        { code: `docker compose up -d              # start the whole stack in the background
docker compose ps                 # list the running services
docker compose logs -f            # follow the combined logs
docker compose up --scale web=3   # run 3 replicas of the web service
docker compose down               # stop and remove containers + network (keeps volumes)`, caption: l('The everyday lifecycle: up -d starts detached, ps and logs -f let you observe, --scale adds replicas, and down tears the stack down while keeping your named volumes.', 'প্রতিদিনের lifecycle: up -d ডিটাচড চালু করে, ps ও logs -f পর্যবেক্ষণ করতে দেয়, --scale replica যোগ করে, ও down আপনার named volume রেখে স্ট্যাক বন্ধ করে।') },
        { note: l('docker compose down -v deletes the named volumes and everything in them — including your database. Run a plain docker compose down to keep your data; add -v only when you truly want the volumes and their contents gone, and there is no undo.', 'docker compose down -v named volume ও তার সব কিছু মুছে ফেলে—আপনার ডেটাবেসসহ। ডেটা রাখতে সাধারণ docker compose down চালান; volume ও তার বিষয়বস্তু সত্যিই মুছতে চাইলে তবেই -v দিন, আর কোনো undo নেই।'), kind: 'warn' },
      ],
    },
    {
      h: l('Key lifecycle commands', 'মূল lifecycle কমান্ড'),
      blocks: [
        { table: {
          head: [l('Goal', 'লক্ষ্য'), l('Command', 'কমান্ড')],
          rows: [
            [l('Start the stack in the background', 'স্ট্যাক ব্যাকগ্রাউন্ডে চালু'), l('docker compose up -d', 'docker compose up -d')],
            [l('List the running services', 'চলমান service তালিকা'), l('docker compose ps', 'docker compose ps')],
            [l('Follow all logs', 'সব logs follow'), l('docker compose logs -f', 'docker compose logs -f')],
            [l('Scale a service', 'একটি service স্কেল'), l('docker compose up --scale web=3', 'docker compose up --scale web=3')],
            [l('Stop and remove (keeps volumes)', 'থামিয়ে রিমুভ (volume রাখে)'), l('docker compose down', 'docker compose down')],
            [l('Also delete volumes (dangerous)', 'volume-ও মোছে (বিপজ্জনক)'), l('docker compose down -v', 'docker compose down -v')],
          ],
        } },
      ],
    },
    {
      h: l('What --scale can and cannot do', '--scale কী পারে ও কী পারে না'),
      blocks: [
        { p: l('--scale is genuinely useful but often misunderstood. It launches N copies of one service on the same host, and because they all sit on Compose\'s internal network, other services can still reach that service by name — Compose load-balances DNS across the replicas. This is great for locally testing that your app is stateless and behaves correctly with multiple instances, or for squeezing more throughput out of a worker on one machine.', '--scale সত্যিই কাজের কিন্তু প্রায়ই ভুল বোঝা হয়। এটি একই হোস্টে একটি service-এর N কপি চালু করে, ও এরা সবাই Compose-এর ভেতরের network-এ থাকায় অন্য service-রা এখনো সেই service-কে নামে পৌঁছাতে পারে—Compose replica-গুলোর মধ্যে DNS লোড-ব্যালান্স করে। এটি লোকালি পরীক্ষা করতে দারুণ যে আপনার অ্যাপ stateless ও একাধিক instance-এ সঠিক আচরণ করে, বা এক মেশিনে একটি worker থেকে বেশি throughput বের করতে।') },
        { p: l('What --scale cannot do is spread those replicas across multiple machines, restart a replica on another node when a host dies, or give you rolling updates — those are orchestrator features. You also cannot scale a service that publishes a fixed host port, because two containers cannot both bind host port 8080; scale services that are reached internally by name, or put a load balancer or reverse proxy in front. Treat --scale as a single-host convenience, not a production scaling strategy.', '--scale যা পারে না তা হলো সেই replica-গুলো একাধিক মেশিনজুড়ে ছড়ানো, একটি হোস্ট মরে গেলে অন্য node-এ একটি replica রিস্টার্ট করা, বা rolling update দেওয়া—এগুলো অর্কেস্ট্রেটরের বৈশিষ্ট্য। আপনি একটি স্থির হোস্ট পোর্ট পাবলিশ করা service-ও স্কেল করতে পারবেন না, কারণ দুটি কন্টেইনার একসঙ্গে হোস্ট পোর্ট 8080 bind করতে পারে না; নামে ভেতরে পৌঁছানো service স্কেল করুন, বা সামনে একটি load balancer বা reverse proxy বসান। --scale-কে একটি সিঙ্গল-হোস্ট সুবিধা ভাবুন, একটি প্রোডাকশন scaling কৌশল নয়।') },
      ],
    },
    {
      h: l('When and where to use these commands', 'এই কমান্ডগুলো কখন ও কোথায় ব্যবহার করবেন'),
      blocks: [
        { p: l('Use up -d for day-to-day work so your terminal stays free, and reserve plain up (foreground) for when you want to watch the logs live and stop with Ctrl+C. Use logs -f constantly while debugging — it is the fastest way to see why a service crashed. Use down at the end of a work session to clean up containers and the network, and add --build to up whenever you have changed a Dockerfile and need the image rebuilt.', 'প্রতিদিনের কাজে up -d ব্যবহার করুন যাতে আপনার টার্মিনাল মুক্ত থাকে, আর সাধারণ up (foreground) তখনকার জন্য রাখুন যখন আপনি logs লাইভ দেখতে ও Ctrl+C দিয়ে থামাতে চান। ডিবাগ করার সময় ক্রমাগত logs -f ব্যবহার করুন—একটি service কেন ক্র্যাশ করল তা দেখার দ্রুততম উপায়। কাজের সেশন শেষে কন্টেইনার ও network পরিষ্কার করতে down ব্যবহার করুন, ও যখনই একটি Dockerfile বদলেছেন ও image রিবিল্ড দরকার তখন up-এ --build যোগ করুন।') },
        { p: l('Be deliberate and careful with down -v. Reach for it only when you genuinely want a clean slate — resetting a corrupted local database, for example. In any shared or production-like environment, double-check which project you are pointed at before running it, because it silently deletes the named volumes and the data inside them with no undo.', 'down -v নিয়ে সচেতন ও সতর্ক থাকুন। শুধু তখনই এটি নিন যখন আপনি সত্যিই একটি পরিষ্কার শুরু চান—যেমন একটি নষ্ট লোকাল ডেটাবেস রিসেট করা। যেকোনো শেয়ার্ড বা প্রোডাকশন-সদৃশ এনভায়রনমেন্টে, চালানোর আগে আপনি কোন project-এ আছেন দুবার যাচাই করুন, কারণ এটি নীরবে named volume ও ভেতরের ডেটা কোনো undo ছাড়াই মুছে ফেলে।') },
      ],
    },
    {
      h: l('Common mistakes', 'সাধারণ ভুল'),
      blocks: [
        { list: [
          l('Running docker compose down -v in the wrong environment and wiping a database volume you needed — there is no undo.', 'ভুল এনভায়রনমেন্টে docker compose down -v চালিয়ে দরকারি একটি ডেটাবেস volume মুছে ফেলা—কোনো undo নেই।'),
          l('Trying to --scale a service that publishes a fixed host port, so the extra replicas fail to bind the port.', 'একটি স্থির হোস্ট পোর্ট পাবলিশ করা service --scale করার চেষ্টা, ফলে অতিরিক্ত replica পোর্ট bind করতে ব্যর্থ হয়।'),
          l('Forgetting -d and blocking your terminal, then closing it and accidentally stopping the foreground stack.', '-d ভুলে টার্মিনাল আটকানো, তারপর তা বন্ধ করে দুর্ঘটনাক্রমে foreground স্ট্যাক থামানো।'),
          l('Changing a Dockerfile but running up without --build, so Compose keeps using the old cached image and your change seems to do nothing.', 'একটি Dockerfile বদলে --build ছাড়া up চালানো, ফলে Compose পুরনো ক্যাশড image ব্যবহার করে যায় ও আপনার পরিবর্তন কিছুই করে না বলে মনে হয়।'),
          l('Editing the compose file with a stray tab or wrong indentation so the command acts on a different structure than you expect — two spaces per level, never tabs.', 'একটি ভুল ট্যাব বা ভুল ইনডেন্টেশন দিয়ে compose ফাইল এডিট করা যাতে কমান্ড প্রত্যাশার চেয়ে ভিন্ন গঠনে কাজ করে—প্রতি স্তরে দুই স্পেস, কখনো ট্যাব নয়।'),
        ] },
      ],
    },
    {
      h: l('Remember in one line', 'এক লাইনে মনে রাখুন'),
      blocks: [
        { list: [
          l('up -d starts the stack detached, logs -f follows it, ps lists it, and down stops and removes it.', 'up -d স্ট্যাক ডিটাচড চালু করে, logs -f follow করে, ps তালিকা করে, ও down থামিয়ে মুছে ফেলে।'),
          l('--scale runs multiple replicas on one host for services reached by name — it is not multi-machine production scaling.', '--scale নামে পৌঁছানো service-এর জন্য এক হোস্টে একাধিক replica চালায়—এটি মাল্টি-মেশিন প্রোডাকশন scaling নয়।'),
          l('down keeps your named volumes; down -v deletes them and their data, so use -v only when you truly mean it.', 'down আপনার named volume রাখে; down -v এদের ও তাদের ডেটা মোছে, তাই সত্যিই বোঝালে তবেই -v দিন।'),
        ] },
      ],
    },
  ],
}
