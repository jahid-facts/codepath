// Deep, bilingual (English / Bangla) teaching guides for the Docker "Production
// & operations" topics. Shape mirrors app/course-guides.js and app/guides/git/f.js:
// each guide is an array of sections { h, blocks }, rendered by GuideBlock in
// app/LearningApp.js. Facts are drawn from the rawTopics + commands + examples in
// app/courses/docker.js. In { code } blocks everything is a plain backtick
// literal; shell variables are written as $NAME or $(...) (never the brace
// form), and secrets are referenced by name and injected at runtime.

const l = (en, bn) => ({ en, bn })

export default {
  // ── dk-optimize · Optimizing images for production ────────────────────────
  'dk-optimize': [
    {
      h: l('What is image optimization?', 'ইমেজ অপটিমাইজেশন কী?'),
      blocks: [
        { p: l('Image optimization is the practice of making the Docker image you ship to production as small and as clean as possible — carrying only the files the application actually needs to run, and nothing that was merely needed to build it. A naive image built straight from a full base and a "COPY everything, install everything" Dockerfile can easily reach one or two gigabytes: it drags along compilers, package caches, dev dependencies, documentation, and your entire git history. An optimized image of the same app is often 10–50x smaller.', 'ইমেজ অপটিমাইজেশন হলো প্রোডাকশনে পাঠানো Docker image-কে যতটা সম্ভব ছোট ও পরিষ্কার করার চর্চা—শুধু সেই ফাইলগুলো বহন করা যা অ্যাপ্লিকেশন চালাতে সত্যিই দরকার, আর যা শুধু বিল্ড করতে লেগেছিল তা কিছুই নয়। একটি পূর্ণ base ও "সব COPY করো, সব install করো" ধরনের Dockerfile থেকে সরাসরি বানানো একটি সাদামাটা image সহজেই এক-দুই গিগাবাইট হতে পারে: এটি compiler, package cache, dev dependency, ডকুমেন্টেশন ও আপনার পুরো git ইতিহাস টেনে আনে। একই অ্যাপের একটি অপটিমাইজড image প্রায়ই ১০–৫০ গুণ ছোট হয়।') },
        { p: l('Why does size matter so much? Every deploy, every autoscale event, and every new server pulls the image over the network before it can start. A 1 GB image makes each of those slow; a 60 MB image starts almost instantly. Smaller images also mean a smaller attack surface — fewer packages installed means fewer known vulnerabilities to patch and fewer tools an attacker can abuse if they get inside. Speed and security both improve from the same discipline: ship the finished product, not the factory.', 'সাইজ এত গুরুত্বপূর্ণ কেন? প্রতিটি deploy, প্রতিটি autoscale ঘটনা, ও প্রতিটি নতুন সার্ভার চালু হওয়ার আগে নেটওয়ার্কে image টেনে আনে। একটি ১ GB image এদের প্রতিটিকে ধীর করে; একটি ৬০ MB image প্রায় সঙ্গে সঙ্গে চালু হয়। ছোট image মানে কম attack surface—কম package ইনস্টল মানে patch করার মতো কম পরিচিত দুর্বলতা এবং কেউ ভেতরে ঢুকলে অপব্যবহারের মতো কম টুল। একই শৃঙ্খলা থেকে গতি ও নিরাপত্তা দুটোই বাড়ে: কারখানা নয়, তৈরি পণ্যটাই পাঠান।') },
        { note: l('Think of shipping only the finished product in minimal packaging — no factory equipment, no packing peanuts. The customer wants the running app, not the compiler, the test suite, or the box of build tools it was assembled with.', 'শুধু তৈরি পণ্যটি ন্যূনতম প্যাকেজিংয়ে পাঠানোর কথা ভাবুন—কোনো কারখানার যন্ত্র নয়, কোনো প্যাকিং উপকরণ নয়। গ্রাহক চলমান অ্যাপ চায়, compiler, test suite বা যে বিল্ড-টুলের বাক্স দিয়ে এটি জোড়া হয়েছিল তা নয়।'), kind: 'tip' },
      ],
    },
    {
      h: l('How it works: multi-stage + a slim base', 'কীভাবে কাজ করে: multi-stage + slim base'),
      blocks: [
        { p: l('The two biggest wins come from a multi-stage build and a slim base image. A multi-stage build uses one temporary stage that holds the full toolchain to compile or bundle your app, then copies only the finished output into a second, tiny runtime stage. Everything heavy — compilers, dev dependencies, build caches — stays behind in the discarded first stage and never reaches the image you ship.', 'সবচেয়ে বড় দুটি লাভ আসে একটি multi-stage build ও একটি slim base image থেকে। একটি multi-stage build একটি অস্থায়ী stage ব্যবহার করে যা আপনার অ্যাপ compile বা bundle করার পূর্ণ toolchain ধরে রাখে, তারপর শুধু তৈরি output-টি একটি দ্বিতীয়, ক্ষুদ্র runtime stage-এ কপি করে। ভারী সবকিছু—compiler, dev dependency, build cache—বাতিল হওয়া প্রথম stage-এ পড়ে থাকে ও আপনার পাঠানো image-এ কখনো পৌঁছায় না।') },
        { steps: [
          l('Pick a full base for the build stage (for example node:20) so all the build tools are available while you compile.', 'build stage-এর জন্য একটি পূর্ণ base বাছুন (যেমন node:20) যাতে compile করার সময় সব build tool হাতের কাছে থাকে।'),
          l('Copy the dependency manifests first, install, then copy the source and build — this keeps the dependency layer cached across code edits.', 'আগে dependency manifest কপি করুন, install করুন, তারপর source কপি করে build করুন—এতে কোড এডিট জুড়ে dependency layer cache-এ থাকে।'),
          l('Start a second stage FROM a slim base (node:20-slim or an alpine variant) that has only a minimal OS and runtime.', 'একটি দ্বিতীয় stage শুরু করুন slim base থেকে (node:20-slim বা একটি alpine variant) যাতে শুধু ন্যূনতম OS ও runtime থাকে।'),
          l('COPY --from=build the compiled output and the production-only dependencies into this runtime stage — nothing else.', 'COPY --from=build দিয়ে compile করা output ও শুধু production dependency এই runtime stage-এ আনুন—আর কিছু নয়।'),
          l('Add a .dockerignore so node_modules, .git, and local .env never even enter the build context, and verify the result with docker images.', 'একটি .dockerignore যোগ করুন যাতে node_modules, .git ও লোকাল .env build context-এ ঢোকেই না, আর ফল docker images দিয়ে যাচাই করুন।'),
        ] },
        { code: `# ---- build stage: full toolchain, thrown away ----
FROM node:20 AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# ---- runtime stage: slim base, only what runs ----
FROM node:20-slim AS runtime
WORKDIR /app
ENV NODE_ENV=production
COPY package*.json ./
RUN npm ci --omit=dev
COPY --from=build /app/dist ./dist
USER node
CMD ["node", "dist/server.js"]`, caption: l('The compiler and dev dependencies live only in the build stage. The final image carries a slim base, the production dependencies, and the built dist/ folder — often a fraction of the naive size.', 'compiler ও dev dependency শুধু build stage-এ থাকে। চূড়ান্ত image বহন করে একটি slim base, production dependency ও build করা dist/ ফোল্ডার—প্রায়ই সাদামাটা সাইজের একটি ভগ্নাংশ।') },
      ],
    },
    {
      h: l('Techniques that shrink an image', 'যে কৌশলগুলো image ছোট করে'),
      blocks: [
        { table: {
          head: [l('Technique', 'কৌশল'), l('What it removes', 'কী সরায়')],
          rows: [
            [l('Slim / alpine base', 'slim / alpine base'), l('The extra OS packages a full base carries; alpine is only a few MB.', 'পূর্ণ base যে বাড়তি OS package বহন করে; alpine মাত্র কয়েক MB।')],
            [l('Multi-stage build', 'multi-stage build'), l('Compilers, dev dependencies, and build caches — left in the discarded stage.', 'compiler, dev dependency ও build cache—বাতিল stage-এ ফেলে রাখা।')],
            [l('.dockerignore', '.dockerignore'), l('node_modules, .git, logs, and .env — kept out of the build context entirely.', 'node_modules, .git, log ও .env—build context থেকে পুরোপুরি বাইরে।')],
            [l('--omit=dev / prod deps', '--omit=dev / prod deps'), l('Test and build-only packages you never need at runtime.', 'test ও শুধু-বিল্ডের package যা runtime-এ কখনো লাগে না।')],
            [l('Combine RUN + clean cache', 'RUN একত্র + cache পরিষ্কার'), l('Package-manager caches, by cleaning them in the same layer that created them.', 'package-manager cache, যে layer বানিয়েছে সেখানেই পরিষ্কার করে।')],
          ],
        } },
        { note: l('Order your Dockerfile from least-changing to most-changing: base and dependencies near the top, your source near the bottom. Editing a line of code then only rebuilds the cheap final layers, not the whole dependency install.', 'আপনার Dockerfile সবচেয়ে-কম-বদলানো থেকে সবচেয়ে-বেশি-বদলানো ক্রমে সাজান: base ও dependency ওপরে, আপনার source নিচে। এক লাইন কোড এডিট করলে তখন শুধু সস্তা শেষ layer আবার build হয়, পুরো dependency install নয়।'), kind: 'tip' },
      ],
    },
    {
      h: l('Slim vs full base images', 'slim বনাম full base image'),
      blocks: [
        { p: l('A "full" base like node:20 or python:3.12 ships a complete Debian userland: a shell, build tools, and dozens of libraries. That is convenient while building, but wasteful at runtime. A slim base (node:20-slim) strips the extras down to what the runtime needs; an alpine base goes further, using a tiny musl-libc distribution measured in single-digit megabytes.', 'node:20 বা python:3.12-এর মতো একটি "full" base একটি সম্পূর্ণ Debian userland পাঠায়: একটি shell, build tool ও ডজনখানেক library। build করার সময় এটি সুবিধাজনক, কিন্তু runtime-এ অপচয়। একটি slim base (node:20-slim) বাড়তি অংশ ছেঁটে runtime-এর যা দরকার তাতে নামায়; একটি alpine base আরও এগিয়ে যায়, একক-অঙ্কের মেগাবাইটে মাপা একটি ক্ষুদ্র musl-libc distribution ব্যবহার করে।') },
        { p: l('Alpine is the smallest, but its musl C library occasionally breaks native modules that expect the more common glibc, and debugging inside a bare alpine image is harder because familiar tools are missing. A safe default is: build on the full base, run on the slim base. Reach for alpine only when you have tested that your dependencies behave on it and the extra few megabytes truly matter.', 'alpine সবচেয়ে ছোট, তবে এর musl C library মাঝেমধ্যে সেসব native module ভাঙে যেগুলো বেশি প্রচলিত glibc আশা করে, আর একটি খালি alpine image-এর ভেতরে debug করা কঠিন কারণ চেনা টুল থাকে না। একটি নিরাপদ ডিফল্ট হলো: full base-এ build, slim base-এ run। alpine তখনই নিন যখন যাচাই করেছেন আপনার dependency এতে ঠিক চলে ও ওই বাড়তি কয়েক মেগাবাইট সত্যিই গুরুত্বপূর্ণ।') },
      ],
    },
    {
      h: l('When and where to optimize', 'কখন ও কোথায় অপটিমাইজ করবেন'),
      blocks: [
        { p: l('Optimize the images you deploy, run at scale, or pull often — production services, anything behind an autoscaler, and base images your whole team shares. There the payoff is real: faster deploys, faster scale-ups, lower registry storage and bandwidth bills, and a smaller surface to secure. Combine multi-stage builds, a slim base, and a .dockerignore, and confirm the win with docker images so you can see the number drop.', 'যেসব image আপনি deploy করেন, স্কেলে চালান বা প্রায়ই pull করেন সেগুলো অপটিমাইজ করুন—production service, autoscaler-এর পেছনের যেকোনো কিছু, ও পুরো টিমের শেয়ার করা base image। সেখানে লাভ বাস্তব: দ্রুত deploy, দ্রুত scale-up, কম registry storage ও bandwidth খরচ, ও সুরক্ষিত করার মতো ছোট পৃষ্ঠ। multi-stage build, একটি slim base ও একটি .dockerignore মেলান, আর docker images দিয়ে লাভ নিশ্চিত করুন যাতে সংখ্যাটি কমতে দেখেন।') },
        { p: l('You can relax on throwaway images — a quick local experiment or a short-lived CI helper that never leaves the build machine. There the extra effort is not worth it. And do not over-trim: over-aggressive slimming can strip a shared library your app loads at runtime, producing a container that builds fine but crashes on start. Optimize deliberately, then test that the slim image actually runs.', 'ফেলে-দেওয়া image-এ আপনি শিথিল থাকতে পারেন—একটি দ্রুত লোকাল পরীক্ষা বা এমন একটি স্বল্পস্থায়ী CI helper যা build মেশিন ছাড়ে না। সেখানে বাড়তি পরিশ্রম মূল্যবান নয়। আর অতি-ছাঁটাই করবেন না: অতি-আক্রমণাত্মক slimming এমন একটি shared library সরাতে পারে যা আপনার অ্যাপ runtime-এ load করে, ফলে একটি container যা ঠিক build হয় কিন্তু চালু হতেই crash করে। ইচ্ছাকৃতভাবে অপটিমাইজ করুন, তারপর টেস্ট করুন slim image আসলে চলে কিনা।') },
      ],
    },
    {
      h: l('Common mistakes', 'সাধারণ ভুল'),
      blocks: [
        { list: [
          l('Shipping a multi-gigabyte image full of build tools, which slows every deploy and every image pull.', 'বিল্ড টুলে ভরা একটি মাল্টি-গিগাবাইট image পাঠানো, যা প্রতিটি deploy ও প্রতিটি image pull ধীর করে।'),
          l('Copying the whole source before installing dependencies, so any code change invalidates the cached install layer and rebuilds it every time.', 'dependency install-এর আগে পুরো source কপি করা, ফলে যেকোনো কোড পরিবর্তন cached install layer বাতিল করে ও প্রতিবার আবার build করে।'),
          l('Forgetting a .dockerignore, so node_modules and .git bloat the build context and secrets in .env can leak into the image.', 'একটি .dockerignore ভুলে যাওয়া, ফলে node_modules ও .git build context ফোলায় এবং .env-এর secret image-এ ফাঁস হতে পারে।'),
          l('Installing dev and test dependencies in the runtime image instead of using --omit=dev for production-only packages.', 'production-only package-এর জন্য --omit=dev ব্যবহার না করে runtime image-এ dev ও test dependency ইনস্টল করা।'),
          l('Over-trimming to alpine without testing, then finding native modules fail because they expected glibc.', 'যাচাই ছাড়াই alpine-এ অতি-ছাঁটাই করা, তারপর দেখা native module ব্যর্থ কারণ তারা glibc আশা করেছিল।'),
        ] },
      ],
    },
    {
      h: l('Remember in one line', 'এক লাইনে মনে রাখুন'),
      blocks: [
        { list: [
          l('Ship the finished product, not the factory: multi-stage build to leave the toolchain behind, slim base to shrink the rest.', 'কারখানা নয়, তৈরি পণ্য পাঠান: toolchain পিছনে ফেলতে multi-stage build, বাকিটা ছোট করতে slim base।'),
          l('Order layers least-changing to most-changing and add a .dockerignore so the cache and the context both stay lean.', 'layer সাজান কম-বদলানো থেকে বেশি-বদলানো ক্রমে ও একটি .dockerignore দিন যাতে cache ও context দুটোই হালকা থাকে।'),
          l('Smaller = faster deploys and a smaller attack surface — but always test that the trimmed image still runs.', 'ছোট = দ্রুত deploy ও ছোট attack surface—তবে সবসময় টেস্ট করুন ছাঁটা image এখনো চলে কিনা।'),
        ] },
      ],
    },
  ],

  // ── dk-security · Container security ──────────────────────────────────────
  'dk-security': [
    {
      h: l('What is container security?', 'কন্টেইনার নিরাপত্তা কী?'),
      blocks: [
        { p: l('Container security is the set of habits that make a container hard to break into and cheap to contain if it is breached. A container is not a full virtual machine — it shares the host’s kernel — so a process that escapes a weakly configured container can reach further than beginners expect. Hardening does not rely on a single switch; it is several small, layered defenses: run as a non-root user, start from a trusted minimal base, scan images for known vulnerabilities, and keep secrets out of the image entirely.', 'কন্টেইনার নিরাপত্তা হলো সেই অভ্যাসগুলোর সমষ্টি যা একটি container-এ ঢোকা কঠিন ও ভাঙা হলে সামলানো সস্তা করে। একটি container পূর্ণ virtual machine নয়—এটি host-এর kernel শেয়ার করে—তাই দুর্বলভাবে কনফিগার করা container থেকে পালানো একটি process নতুনদের ধারণার চেয়ে দূর পর্যন্ত পৌঁছাতে পারে। কঠোরকরণ একটিমাত্র সুইচে নির্ভর করে না; এটি কয়েকটি ছোট, স্তরিত প্রতিরক্ষা: non-root ব্যবহারকারী হিসেবে চালান, একটি বিশ্বস্ত ন্যূনতম base থেকে শুরু করুন, পরিচিত দুর্বলতার জন্য image scan করুন, ও secret পুরোপুরি image-এর বাইরে রাখুন।') },
        { p: l('The point of layering is that no single control is perfect, but together they raise the cost of an attack sharply. If one layer fails — a fresh CVE appears in a package, say — the others still stand: a non-root process cannot install tools or touch host files it does not own, a minimal image gives an attacker almost nothing to pivot with, and secrets that were never baked in cannot be stolen from the image at all.', 'স্তরিতকরণের মূল কথা হলো কোনো একটি নিয়ন্ত্রণই নিখুঁত নয়, কিন্তু একসঙ্গে তারা আক্রমণের খরচ তীব্রভাবে বাড়ায়। একটি স্তর ব্যর্থ হলে—ধরুন একটি package-এ নতুন CVE আসে—বাকিগুলো তখনও দাঁড়িয়ে থাকে: একটি non-root process যা তার নয় এমন host ফাইল ছুঁতে বা টুল ইনস্টল করতে পারে না, একটি minimal image আক্রমণকারীকে pivot করার প্রায় কিছুই দেয় না, আর যে secret কখনো bake করা হয়নি তা image থেকে চুরিই করা যায় না।') },
        { note: l('Picture locking a shipping container: minimal contents, a verified seal, an inspection at the gate, and — crucially — no keys taped inside. Even if a thief opens one lock, there is little to steal and nothing to unlock the next door with.', 'একটি শিপিং কন্টেইনার তালা দেওয়ার কথা ভাবুন: ন্যূনতম বিষয়বস্তু, একটি যাচাই করা সিল, গেটে একটি পরিদর্শন, ও—সবচেয়ে জরুরি—ভেতরে কোনো চাবি টেপ করা নয়। একজন চোর একটি তালা খুললেও চুরি করার মতো সামান্যই থাকে ও পরের দরজা খোলার কিছু থাকে না।'), kind: 'tip' },
      ],
    },
    {
      h: l('How to harden a container, step by step', 'কীভাবে container কঠোর করবেন, ধাপে ধাপে'),
      blocks: [
        { steps: [
          l('Start from a trusted, minimal, pinned base — an official image at a specific version (node:20-slim), not a vague :latest from an unknown author.', 'একটি বিশ্বস্ত, ন্যূনতম, পিন করা base থেকে শুরু করুন—একটি নির্দিষ্ট ভার্সনের অফিসিয়াল image (node:20-slim), অজানা লেখকের অস্পষ্ট :latest নয়।'),
          l('Install only production dependencies, then create or use an unprivileged user and switch to it with USER before the app runs.', 'শুধু production dependency ইনস্টল করুন, তারপর একটি unprivileged user তৈরি বা ব্যবহার করুন এবং অ্যাপ চালুর আগে USER দিয়ে তাতে বদলান।'),
          l('Copy files with the right ownership (COPY --chown) so the non-root user can read them without making everything world-writable.', 'সঠিক মালিকানায় ফাইল কপি করুন (COPY --chown) যাতে non-root user সব world-writable না করেই সেগুলো পড়তে পারে।'),
          l('Never COPY a .env or bake a password with ENV — pass secrets at runtime instead, with -e, --env-file, or your platform’s secret store.', '.env কখনো COPY করবেন না বা ENV দিয়ে password bake করবেন না—বরং runtime-এ secret দিন, -e, --env-file বা আপনার প্ল্যাটফর্মের secret store দিয়ে।'),
          l('Scan the finished image for known CVEs (docker scout or trivy) and rescan regularly, because a base that is clean today can have a vulnerability tomorrow.', 'তৈরি image পরিচিত CVE-র জন্য scan করুন (docker scout বা trivy) ও নিয়মিত পুনরায় scan করুন, কারণ আজ পরিষ্কার একটি base-এ কাল দুর্বলতা থাকতে পারে।'),
        ] },
        { code: `FROM node:20-slim
WORKDIR /app

# install production deps only
COPY package*.json ./
RUN npm ci --omit=dev

# copy source owned by the built-in unprivileged "node" user
COPY --chown=node:node . .

# drop root: everything below runs as an ordinary user
USER node
CMD ["node", "server.js"]`, caption: l('USER node drops root before the app starts, so a compromise inside the container cannot install packages or touch host files it does not own. Secrets are NOT in this file — they arrive at runtime.', 'USER node অ্যাপ চালুর আগে root ছাড়ে, তাই container-এর ভেতরে একটি আপস package ইনস্টল করতে বা তার নয় এমন host ফাইল ছুঁতে পারে না। secret এই ফাইলে নেই—এগুলো runtime-এ আসে।') },
      ],
    },
    {
      h: l('Keep secrets out of the image', 'image থেকে secret দূরে রাখুন'),
      blocks: [
        { p: l('This is the mistake with the widest blast radius, so it gets its own section. Anything you COPY into an image or set with ENV becomes a permanent, readable layer — anyone who can pull the image can run docker history or unpack the layers and read your database password or API key. Deleting the file in a later instruction does not help: the earlier layer still holds it. So a secret must never enter the build at all.', 'এটি সবচেয়ে বিস্তৃত ক্ষতির ভুল, তাই এটির নিজস্ব একটি অংশ। image-এ যা COPY করেন বা ENV দিয়ে সেট করেন তা একটি স্থায়ী, পাঠযোগ্য layer হয়ে যায়—যে কেউ image pull করতে পারে সে docker history চালিয়ে বা layer খুলে আপনার database password বা API key পড়তে পারে। পরের নির্দেশে ফাইলটি মুছলেও লাভ নেই: আগের layer এখনও তা ধরে রাখে। তাই একটি secret কখনোই build-এ ঢুকবে না।') },
        { code: `# inject secrets at run time, never in the image:
docker run -d --name api \\
  -e DB_PASSWORD \\
  --env-file ./prod.env \\
  myorg/api:1.4

# -e DB_PASSWORD (no value) passes it through from the host env
# --env-file reads KEY=VALUE lines from a file kept OUT of git`, caption: l('Pass secrets from the host environment or an env file that lives outside the repository and outside the image. In production, a real secret manager (your cloud provider’s, or Docker/Kubernetes secrets) is better still.', 'secret দিন host environment থেকে বা এমন একটি env file থেকে যা repository ও image দুটোরই বাইরে থাকে। production-এ একটি আসল secret manager (আপনার cloud provider-এর, বা Docker/Kubernetes secret) আরও ভালো।') },
        { note: l('Never COPY .env into an image and never write ENV DB_PASSWORD=... in a Dockerfile. The value is baked into a layer forever and readable by anyone who pulls the image, even after you "remove" it in a later line. Add .env to both .gitignore and .dockerignore.', '.env কখনো image-এ COPY করবেন না ও Dockerfile-এ কখনো ENV DB_PASSWORD=... লিখবেন না। মানটি চিরকালের জন্য একটি layer-এ bake হয় ও image pull করা যে কারো কাছে পাঠযোগ্য, পরের লাইনে "সরিয়ে" দিলেও। .env-কে .gitignore ও .dockerignore দুটোতেই যোগ করুন।'), kind: 'warn' },
      ],
    },
    {
      h: l('The layers of container hardening', 'container কঠোরকরণের স্তরগুলো'),
      blocks: [
        { table: {
          head: [l('Control', 'নিয়ন্ত্রণ'), l('Why it matters', 'কেন গুরুত্বপূর্ণ')],
          rows: [
            [l('Non-root USER', 'non-root USER'), l('A breakout as an ordinary user cannot install tools or write host files it does not own.', 'সাধারণ user হিসেবে breakout টুল ইনস্টল করতে বা তার নয় এমন host ফাইল লিখতে পারে না।')],
            [l('Trusted minimal base', 'বিশ্বস্ত ন্যূনতম base'), l('Fewer packages = fewer CVEs to patch and less for an attacker to use inside.', 'কম package = patch করার মতো কম CVE ও ভেতরে আক্রমণকারীর কম ব্যবহারযোগ্য জিনিস।')],
            [l('Pinned version', 'পিন করা ভার্সন'), l('node:20-slim, not :latest — so a build is reproducible and not silently changed.', 'node:20-slim, :latest নয়—যাতে build পুনরুৎপাদনযোগ্য ও নীরবে না বদলায়।')],
            [l('Vulnerability scanning', 'দুর্বলতা scan'), l('docker scout / trivy surface known CVEs before they reach production; rescan often.', 'docker scout / trivy production-এ পৌঁছানোর আগে পরিচিত CVE দেখায়; প্রায়ই পুনরায় scan করুন।')],
            [l('Secrets at runtime', 'runtime-এ secret'), l('-e / --env-file / a secret store — nothing sensitive is ever baked into a layer.', '-e / --env-file / একটি secret store—সংবেদনশীল কিছু কখনো একটি layer-এ bake হয় না।')],
          ],
        } },
      ],
    },
    {
      h: l('When and where security effort pays off', 'নিরাপত্তা পরিশ্রম কখন ও কোথায় ফল দেয়'),
      blocks: [
        { p: l('Apply the full checklist to anything internet-facing or handling real user data: production APIs, web servers, and any image built into your deploy pipeline. Non-root, a pinned minimal base, a scan step in CI, and runtime secrets should be defaults there, not afterthoughts — the cost is a few lines of Dockerfile and one pipeline step, and the downside of skipping them is a single breakout compromising the whole host.', 'ইন্টারনেট-মুখী বা আসল ব্যবহারকারীর ডেটা সামলানো যেকোনো কিছুতে পুরো checklist প্রয়োগ করুন: production API, web server, ও deploy pipeline-এ বানানো যেকোনো image। non-root, একটি পিন করা ন্যূনতম base, CI-তে একটি scan ধাপ, ও runtime secret সেখানে ডিফল্ট হওয়া উচিত, পরে-ভাবার বিষয় নয়—খরচ কয়েক লাইন Dockerfile ও একটি pipeline ধাপ, আর এগুলো বাদ দেওয়ার ক্ষতি হলো একটিমাত্র breakout পুরো host আপস করা।') },
        { p: l('A quick local demo can be looser — but the habits are cheap enough that building them in from the start costs almost nothing and means your throwaway experiment does not become an insecure production template by copy-paste. Remember security is ongoing: pin and scan on a schedule, because a base image that is safe today can carry a new CVE tomorrow.', 'একটি দ্রুত লোকাল ডেমো আলগা হতে পারে—তবে অভ্যাসগুলো এত সস্তা যে শুরু থেকে গড়ে নিলে প্রায় কিছুই খরচ হয় না ও মানে আপনার ফেলে-দেওয়া পরীক্ষাটি copy-paste-এ একটি অনিরাপদ production template হয়ে ওঠে না। মনে রাখুন নিরাপত্তা চলমান: একটি সূচি ধরে pin ও scan করুন, কারণ আজ নিরাপদ একটি base image কাল একটি নতুন CVE বহন করতে পারে।') },
      ],
    },
    {
      h: l('Common mistakes', 'সাধারণ ভুল'),
      blocks: [
        { list: [
          l('Running every container as root with baked-in secrets, so a single breakout compromises the whole host.', 'বেক-ইন secret সহ প্রতিটি container root হিসেবে চালানো, ফলে একটি breakout পুরো host আপস করে।'),
          l('Copying .env into the image or setting a password with ENV — the value lives in a layer forever, readable by anyone who pulls it.', '.env image-এ কপি করা বা ENV দিয়ে password সেট করা—মানটি চিরকাল একটি layer-এ থাকে, pull করা যে কারো কাছে পাঠযোগ্য।'),
          l('Using :latest or an untrusted image, so you cannot reproduce a build and inherit whatever a stranger shipped.', ':latest বা একটি অবিশ্বস্ত image ব্যবহার করা, ফলে build পুনরুৎপাদন করা যায় না ও একজন অচেনা যা পাঠিয়েছে তা উত্তরাধিকারে পাওয়া।'),
          l('Never scanning images, so known CVEs in dependencies quietly ride into production.', 'image কখনো scan না করা, ফলে dependency-র পরিচিত CVE নীরবে production-এ চলে যায়।'),
          l('Treating security as one-time — a base that was clean at build can have a fresh vulnerability weeks later.', 'নিরাপত্তাকে একবারের কাজ ভাবা—build-এর সময় পরিষ্কার একটি base-এ সপ্তাহখানেক পর নতুন দুর্বলতা থাকতে পারে।'),
        ] },
      ],
    },
    {
      h: l('Remember in one line', 'এক লাইনে মনে রাখুন'),
      blocks: [
        { list: [
          l('Harden in layers: non-root USER, a trusted minimal pinned base, image scanning, and secrets injected at runtime.', 'স্তরে কঠোর করুন: non-root USER, একটি বিশ্বস্ত ন্যূনতম পিন করা base, image scan, ও runtime-এ দেওয়া secret।'),
          l('Anything COPYd or ENVd is a permanent readable layer — a secret must never enter the build at all.', 'যা COPY বা ENV করা হয় তা একটি স্থায়ী পাঠযোগ্য layer—একটি secret কখনোই build-এ ঢুকবে না।'),
          l('No single control is enough and security is ongoing: pin, scan on a schedule, and assume today’s safe image needs tomorrow’s patch.', 'একটি নিয়ন্ত্রণই যথেষ্ট নয় ও নিরাপত্তা চলমান: pin করুন, সূচি ধরে scan করুন, ও ধরে নিন আজকের নিরাপদ image-এ কালকের patch লাগবে।'),
        ] },
      ],
    },
  ],

  // ── dk-healthcheck-logs · Healthchecks & logging ──────────────────────────
  'dk-healthcheck-logs': [
    {
      h: l('What are healthchecks and logging?', 'হেলথচেক ও লগিং কী?'),
      blocks: [
        { p: l('Healthchecks and logging are how a container tells the outside world how it is doing. A HEALTHCHECK is a small command Docker runs inside the container on a schedule to answer one question: is this app actually working, or just technically alive? Logging is how the app reports what it is doing — and the container convention is to write those logs to standard output (stdout) and standard error (stderr) so the engine collects them, rather than tucking them into a file inside the container where nobody can find them.', 'হেলথচেক ও লগিং হলো একটি container বাইরের জগৎকে কীভাবে জানায় সে কেমন আছে। একটি HEALTHCHECK হলো একটি ছোট কমান্ড যা Docker container-এর ভেতরে একটি সূচি ধরে চালায় একটি প্রশ্নের উত্তর দিতে: এই অ্যাপ কি সত্যিই কাজ করছে, নাকি শুধু কারিগরিভাবে জীবিত? লগিং হলো অ্যাপ কী করছে তা জানানোর উপায়—আর container-এর প্রথা হলো সেই log standard output (stdout) ও standard error (stderr)-এ লেখা যাতে engine সেগুলো সংগ্রহ করে, container-এর ভেতরে একটি ফাইলে গুঁজে না রাখা যেখানে কেউ খুঁজে পায় না।') },
        { p: l('The distinction a healthcheck draws is between "running" and "healthy". A container can be running while the app inside is deadlocked, out of memory, or unable to reach its database — a plain process check would still call it fine. A healthcheck probes a real endpoint, so the platform learns the truth and can act: restart the container, stop sending it traffic, or hold back a rollout. Logging to stdout, meanwhile, means one standard place to read what happened, no matter which of a hundred containers it was.', 'একটি healthcheck যে পার্থক্য টানে তা হলো "running" ও "healthy"-র মধ্যে। একটি container running থাকতে পারে যখন ভেতরের অ্যাপ deadlock, memory-শেষ, বা তার database-এ পৌঁছাতে অক্ষম—একটি সাদামাটা process check তখনও একে ঠিক বলবে। একটি healthcheck একটি আসল endpoint প্রোব করে, তাই platform সত্যটা জানে ও ব্যবস্থা নিতে পারে: container restart করা, তাকে traffic পাঠানো বন্ধ করা, বা একটি rollout আটকে রাখা। এদিকে stdout-এ log করা মানে কী ঘটেছে পড়ার একটি প্রমিত জায়গা, শত container-এর যেটাই হোক না কেন।') },
        { note: l('Think of a dashboard warning light and a diagnostic port on a machine: the healthcheck is the light that turns red when something is wrong, and stdout logging is the port that streams a running record anyone can plug into and read.', 'একটি যন্ত্রের ড্যাশবোর্ড সতর্ক-বাতি ও একটি ডায়াগনস্টিক পোর্টের কথা ভাবুন: healthcheck হলো সেই বাতি যা কিছু ভুল হলে লাল হয়, আর stdout logging হলো সেই পোর্ট যা একটি চলমান রেকর্ড স্ট্রিম করে যাতে যে কেউ প্লাগ করে পড়তে পারে।'), kind: 'tip' },
      ],
    },
    {
      h: l('How they work, step by step', 'কীভাবে কাজ করে, ধাপে ধাপে'),
      blocks: [
        { steps: [
          l('Add a HEALTHCHECK instruction to the Dockerfile with a command that probes a real endpoint (for example curl the /health route).', 'Dockerfile-এ একটি HEALTHCHECK নির্দেশ যোগ করুন এমন একটি কমান্ড দিয়ে যা একটি আসল endpoint প্রোব করে (যেমন /health route curl করা)।'),
          l('Docker runs that command on the --interval you set; if it exits 0 the container is "healthy", if it exits non-zero enough times it becomes "unhealthy".', 'আপনার সেট করা --interval-এ Docker সেই কমান্ড চালায়; এটি 0 দিয়ে শেষ হলে container "healthy", যথেষ্টবার non-zero দিলে "unhealthy" হয়।'),
          l('docker ps shows the health state in its STATUS column, so an operator or a script can see it at a glance.', 'docker ps তার STATUS কলামে health অবস্থা দেখায়, তাই একজন operator বা একটি script এক নজরে দেখতে পারে।'),
          l('The app writes its logs to stdout and stderr — not to a file inside the container — so the Docker engine captures every line.', 'অ্যাপ তার log stdout ও stderr-এ লেখে—container-এর ভেতরে ফাইলে নয়—তাই Docker engine প্রতিটি লাইন ধরে রাখে।'),
          l('You read them with docker logs (or -f to follow), and in production a logging driver ships them off to a central system for search and alerts.', 'আপনি docker logs দিয়ে পড়েন (বা follow করতে -f), আর production-এ একটি logging driver সেগুলো search ও alert-এর জন্য একটি কেন্দ্রীয় সিস্টেমে পাঠায়।'),
        ] },
        { code: `FROM node:20-slim
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev
COPY . .

# probe a real endpoint, not just "is the process alive"
HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 \\
  CMD curl -f http://localhost:3000/health || exit 1

# the app logs to stdout/stderr; Docker collects it
CMD ["node", "server.js"]`, caption: l('The probe hits /health every 30s; after 3 failed tries Docker marks the container "unhealthy" so a platform can restart it or route around it. --start-period gives the app 10s to boot before failures count.', 'প্রোবটি প্রতি 30s-এ /health-এ যায়; 3 বার ব্যর্থ হলে Docker container-কে "unhealthy" চিহ্নিত করে যাতে platform restart বা এড়াতে পারে। --start-period অ্যাপকে boot করতে 10s দেয়, তার আগে ব্যর্থতা গোনা হয় না।') },
      ],
    },
    {
      h: l('Anatomy of a HEALTHCHECK', 'একটি HEALTHCHECK-এর গঠন'),
      blocks: [
        { table: {
          head: [l('Option', 'অপশন'), l('What it controls', 'কী নিয়ন্ত্রণ করে')],
          rows: [
            [l('--interval', '--interval'), l('How often the probe runs (e.g. every 30s).', 'প্রোবটি কত ঘন ঘন চলে (যেমন প্রতি 30s)।')],
            [l('--timeout', '--timeout'), l('How long to wait before a single probe is treated as failed.', 'একটি প্রোবকে ব্যর্থ ধরার আগে কতক্ষণ অপেক্ষা করা হবে।')],
            [l('--start-period', '--start-period'), l('A grace window at startup where failures do not count against the container.', 'startup-এ একটি ছাড়ের সময় যেখানে ব্যর্থতা container-এর বিরুদ্ধে গোনা হয় না।')],
            [l('--retries', '--retries'), l('How many consecutive failures flip the state to "unhealthy".', 'কতবার টানা ব্যর্থতা অবস্থাকে "unhealthy"-তে বদলায়।')],
            [l('CMD ... || exit 1', 'CMD ... || exit 1'), l('The probe itself: exit 0 = healthy, non-zero = a failed check.', 'প্রোবটি নিজে: exit 0 = healthy, non-zero = একটি ব্যর্থ check।')],
          ],
        } },
        { note: l('Probe something meaningful. A /health route that also checks the database connection tells you far more than one that just returns 200 no matter what — but keep the probe fast and cheap, since it runs on every interval for the life of the container.', 'অর্থপূর্ণ কিছু প্রোব করুন। একটি /health route যা database সংযোগও যাচাই করে তা এমন একটির চেয়ে অনেক বেশি বলে যা যা-ই হোক শুধু 200 ফেরায়—তবে প্রোবটি দ্রুত ও সস্তা রাখুন, কারণ এটি container-এর সারা জীবন প্রতি interval-এ চলে।'), kind: 'tip' },
      ],
    },
    {
      h: l('Why log to stdout, not a file', 'কেন file নয়, stdout-এ log করবেন'),
      blocks: [
        { p: l('Containers are ephemeral: they are created, destroyed, and replaced constantly, and a container’s filesystem vanishes when it is removed. If your app writes logs to a file inside the container, those logs die with it — and the platform never sees them, because it only watches stdout and stderr. Writing to a file also invites a slow disk to fill up unnoticed inside a container nobody is monitoring.', 'container ক্ষণস্থায়ী: এগুলো ক্রমাগত তৈরি, ধ্বংস ও প্রতিস্থাপিত হয়, আর একটি container-এর filesystem সরিয়ে ফেললে তা মিলিয়ে যায়। আপনার অ্যাপ যদি container-এর ভেতরে একটি ফাইলে log লেখে, সেই log এটির সঙ্গে মরে যায়—আর platform কখনো তা দেখে না, কারণ এটি শুধু stdout ও stderr দেখে। একটি ফাইলে লেখা এমন একটি container-এর ভেতরে একটি ধীর disk অলক্ষিতে ভরে ওঠারও আমন্ত্রণ জানায় যা কেউ পর্যবেক্ষণ করছে না।') },
        { p: l('The container-native pattern is: the app just prints to stdout/stderr, the engine captures the stream, and a logging driver forwards it to wherever you actually read logs — the terminal in development, or a central system like a cloud log service or an ELK/Loki stack in production. This gives you one uniform place to search, tail, and alert on, no matter how many containers there are or how often they are replaced. Your app stays simple; the platform owns log delivery.', 'container-নেটিভ প্যাটার্ন হলো: অ্যাপ শুধু stdout/stderr-এ print করে, engine stream ধরে রাখে, ও একটি logging driver এটি সেখানে পাঠায় যেখানে আপনি সত্যিই log পড়েন—development-এ terminal, বা production-এ একটি cloud log service বা একটি ELK/Loki stack-এর মতো কেন্দ্রীয় সিস্টেম। এটি আপনাকে search, tail ও alert করার একটি অভিন্ন জায়গা দেয়, যত container-ই থাকুক বা যত ঘন ঘন প্রতিস্থাপিত হোক। আপনার অ্যাপ সরল থাকে; platform log পৌঁছানোর দায়িত্ব নেয়।') },
      ],
    },
    {
      h: l('When and where to use them', 'কখন ও কোথায় ব্যবহার করবেন'),
      blocks: [
        { p: l('Add a healthcheck to any long-running service that an orchestrator or restart policy will manage — a web server, an API, a worker. That is exactly where "running but broken" hurts, and where a red health state lets the platform restart or route around the container automatically. A short-lived batch job that runs once and exits does not need one; it either succeeds or fails on its own.', 'যেকোনো দীর্ঘ-চলমান service-এ একটি healthcheck যোগ করুন যা একটি orchestrator বা restart policy সামলাবে—একটি web server, একটি API, একটি worker। ঠিক সেখানেই "running কিন্তু ভাঙা" ক্ষতি করে, ও সেখানে একটি লাল health অবস্থা platform-কে স্বয়ংক্রিয়ভাবে container restart বা এড়াতে দেয়। একটি স্বল্পস্থায়ী batch job যা একবার চলে ও শেষ হয় তার এটি লাগে না; এটি নিজেই সফল বা ব্যর্থ হয়।') },
        { p: l('Log to stdout everywhere, from day one — it costs nothing and it is what every container platform expects. Tune the healthcheck to the app: a fast, cheap probe on a real endpoint, with a --start-period long enough for the app to boot so a slow startup is not mistaken for a failure. Standard logging and healthchecks are what make containers observable and self-healing; the only real cost is that overly chatty logs and heavy probes waste resources, so keep both lean.', 'সব জায়গায়, প্রথম দিন থেকে stdout-এ log করুন—এতে কিছু খরচ হয় না ও এটাই প্রতিটি container platform আশা করে। healthcheck-কে অ্যাপের সঙ্গে মানান: একটি আসল endpoint-এ একটি দ্রুত, সস্তা প্রোব, একটি --start-period সহ যা অ্যাপ boot হওয়ার মতো যথেষ্ট লম্বা যাতে একটি ধীর startup ব্যর্থতা বলে ভুল না হয়। প্রমিত logging ও healthcheck-ই container-কে observable ও স্ব-নিরাময়ী করে; একমাত্র আসল খরচ হলো অতি-বাচাল log ও ভারী প্রোব রিসোর্স নষ্ট করে, তাই দুটোই হালকা রাখুন।') },
      ],
    },
    {
      h: l('Common mistakes', 'সাধারণ ভুল'),
      blocks: [
        { list: [
          l('Writing logs to a file inside the container, so they disappear when the container is removed and the platform never sees them.', 'container-এর ভেতরে একটি ফাইলে log লেখা, ফলে container সরালে তারা মিলিয়ে যায় ও platform কখনো দেখে না।'),
          l('Having no healthcheck, so a deadlocked or database-less app is reported as "running" while it silently serves errors.', 'কোনো healthcheck না রাখা, ফলে একটি deadlock বা database-হীন অ্যাপ "running" বলে জানানো হয় যখন এটি নীরবে error দেয়।'),
          l('Writing a fake healthcheck that returns 200 unconditionally, which reports healthy even when the app cannot do its real job.', 'একটি নকল healthcheck লেখা যা শর্তহীনভাবে 200 ফেরায়, যা অ্যাপ তার আসল কাজ না পারলেও healthy জানায়।'),
          l('Forgetting --start-period, so a slow-booting app is flagged unhealthy and restarted before it ever finishes starting.', '--start-period ভুলে যাওয়া, ফলে একটি ধীর-boot অ্যাপ চালু শেষ করার আগেই unhealthy চিহ্নিত ও restart হয়।'),
          l('Logging so verbosely, or probing so heavily, that the observability itself becomes a resource drain.', 'এত বাচালভাবে log করা বা এত ভারীভাবে প্রোব করা যে observability নিজেই একটি রিসোর্স-নিষ্কাশক হয়ে ওঠে।'),
        ] },
      ],
    },
    {
      h: l('Remember in one line', 'এক লাইনে মনে রাখুন'),
      blocks: [
        { list: [
          l('A HEALTHCHECK probes a real endpoint so the platform knows "healthy", not just "running", and can restart or route around a bad container.', 'একটি HEALTHCHECK একটি আসল endpoint প্রোব করে যাতে platform "running" নয়, "healthy" জানে, ও একটি খারাপ container restart বা এড়াতে পারে।'),
          l('Log to stdout/stderr, never to a file inside the container, so the engine collects every line and it survives the container.', 'stdout/stderr-এ log করুন, container-এর ভেতরে ফাইলে কখনো নয়, যাতে engine প্রতিটি লাইন ধরে ও তা container-এর পরেও টিকে থাকে।'),
          l('Keep probes fast and meaningful and logs lean — observability should help, not cost, resources.', 'প্রোব দ্রুত ও অর্থপূর্ণ এবং log হালকা রাখুন—observability রিসোর্স খরচ নয়, সাহায্য করবে।'),
        ] },
      ],
    },
  ],

  // ── dk-registry-ci · Registries & CI/CD ───────────────────────────────────
  'dk-registry-ci': [
    {
      h: l('What are registries and CI/CD for Docker?', 'Docker-এ registry ও CI/CD কী?'),
      blocks: [
        { p: l('A registry is a storage service for Docker images — Docker Hub, GitHub Container Registry, or your cloud provider’s — where you push images so other machines can pull them. CI/CD (continuous integration / continuous delivery) is the automation that turns a code change into a running deployment. Put together, the Docker CI/CD flow is a short, disciplined pipeline: build an image, tag it (usually with the commit), push it to a registry, and then deploy that exact tag. The whole point is that the artifact you test is byte-for-byte the artifact you run.', 'একটি registry হলো Docker image-এর একটি storage service—Docker Hub, GitHub Container Registry, বা আপনার cloud provider-এর—যেখানে আপনি image push করেন যাতে অন্য মেশিন pull করতে পারে। CI/CD (continuous integration / continuous delivery) হলো সেই অটোমেশন যা একটি কোড পরিবর্তনকে একটি চলমান deployment-এ পরিণত করে। একসঙ্গে, Docker CI/CD flow হলো একটি ছোট, শৃঙ্খলাবদ্ধ pipeline: একটি image build করুন, ট্যাগ দিন (সাধারণত commit দিয়ে), একটি registry-তে push করুন, তারপর ঠিক সেই tag deploy করুন। পুরো মূল কথা হলো আপনি যে artifact টেস্ট করেন সেটাই byte-for-byte যা চালান।') },
        { p: l('The problem this solves is drift between test and production. If you build the image separately on your laptop, in CI, and again on the production server, three subtly different images can result — and the one that failed in production is not the one you tested. Building once, tagging it immutably, and deploying that identical tag removes the guesswork: what passed the tests is precisely what ships, and rolling back is just deploying a previous tag.', 'এটি যে সমস্যা সমাধান করে তা হলো test ও production-এর মধ্যে drift। যদি আপনি image আলাদাভাবে আপনার laptop-এ, CI-তে ও আবার production server-এ build করেন, তিনটি সূক্ষ্মভাবে ভিন্ন image হতে পারে—আর production-এ যেটি ব্যর্থ হলো সেটি আপনি টেস্ট করা image নয়। একবার build করা, immutable-ভাবে tag দেওয়া, ও সেই অভিন্ন tag deploy করা অনুমান দূর করে: যা test পাস করেছে ঠিক তাই যায়, আর rollback মানে শুধু একটি আগের tag deploy করা।') },
        { note: l('Picture a factory line that stamps each batch with a unique serial number, stores it in the warehouse, and ships that exact batch. If a defect appears, you know precisely which serial to recall — and you can re-ship a known-good earlier one instantly.', 'একটি কারখানা লাইনের কথা ভাবুন যা প্রতিটি ব্যাচে একটি অনন্য সিরিয়াল নম্বর দেয়, গুদামে রাখে, ও ঠিক সেই ব্যাচ শিপ করে। একটি ত্রুটি দেখা দিলে আপনি ঠিক জানেন কোন সিরিয়াল ফেরত ডাকতে হবে—আর একটি জানা-ভালো আগের ব্যাচ সঙ্গে সঙ্গে আবার শিপ করতে পারেন।'), kind: 'tip' },
      ],
    },
    {
      h: l('The build → tag → push → deploy flow', 'build → tag → push → deploy প্রবাহ'),
      blocks: [
        { steps: [
          l('Build the image once in CI, from the exact commit that triggered the pipeline.', 'CI-তে ঠিক যে commit pipeline চালু করেছে তা থেকে image একবার build করুন।'),
          l('Tag it with an immutable identifier — the commit SHA — so this build has a name that will never point to anything else.', 'একটি immutable শনাক্তকারী দিয়ে tag দিন—commit SHA—যাতে এই build-এর একটি নাম থাকে যা কখনো অন্য কিছু নির্দেশ করবে না।'),
          l('Log in to the registry and push that tag, so the tested artifact is stored where every environment can pull it.', 'registry-তে log in করুন ও সেই tag push করুন, যাতে test করা artifact এমন জায়গায় থাকে যেখান থেকে প্রতিটি environment pull করতে পারে।'),
          l('On the server, pull the same SHA tag and run it — never rebuild locally at deploy time.', 'server-এ একই SHA tag pull করে চালান—deploy-এর সময় কখনো লোকালভাবে আবার build করবেন না।'),
          l('To roll back, deploy a previous SHA tag; because tags are immutable, that older image is exactly what it was when it passed.', 'rollback করতে একটি আগের SHA tag deploy করুন; tag immutable বলে সেই পুরনো image ঠিক তেমনই যেমন এটি পাস করার সময় ছিল।'),
        ] },
        { code: `# --- in CI ---
# derive an immutable tag from the commit
GIT_SHA=$(git rev-parse --short HEAD)

# 1. build the image, tagged by commit SHA
docker build -t myorg/api:$GIT_SHA .

# 2. push that immutable tag to the registry
docker login registry.example.com
docker push myorg/api:$GIT_SHA

# --- on the server ---
# 3. pull and run the EXACT tag CI tested
docker pull myorg/api:$GIT_SHA
docker run -d --name api --restart unless-stopped myorg/api:$GIT_SHA

# 4. roll back later by deploying a previous SHA
# docker run -d --name api myorg/api:$OLD_SHA`, caption: l('Tagging by commit SHA makes every deploy traceable and easy to roll back to a known image. The $(...) is a shell command substitution and $GIT_SHA a shell variable — real CI systems expose the commit as a built-in variable (for example $GITHUB_SHA on GitHub Actions).', 'commit SHA দিয়ে tag করলে প্রতিটি deploy ট্রেসযোগ্য ও একটি জানা image-এ rollback করা সহজ। $(...) একটি shell command substitution ও $GIT_SHA একটি shell variable—আসল CI সিস্টেম commit-কে একটি বিল্ট-ইন variable হিসেবে দেয় (যেমন GitHub Actions-এ $GITHUB_SHA)।') },
      ],
    },
    {
      h: l('Tagging strategy: why SHA, not latest', 'ট্যাগিং কৌশল: কেন SHA, latest নয়'),
      blocks: [
        { table: {
          head: [l('Tag style', 'ট্যাগের ধরন'), l('Behaviour', 'আচরণ')],
          rows: [
            [l(':latest', ':latest'), l('A floating tag that silently changes under you — you never know which build is actually running.', 'একটি ভাসমান tag যা নীরবে বদলায়—কোন build আসলে চলছে আপনি কখনো জানেন না।')],
            [l(':1.4 (semver)', ':1.4 (semver)'), l('Good for humans and releases, but can be re-pointed; pair it with an immutable tag.', 'মানুষ ও release-এর জন্য ভালো, তবে পুনঃনির্দেশ করা যায়; একটি immutable tag-এর সঙ্গে জুড়ুন।')],
            [l(':$GIT_SHA', ':$GIT_SHA'), l('Immutable and unique per commit — fully traceable and the basis for safe rollback.', 'প্রতি commit-এ immutable ও অনন্য—পুরোপুরি ট্রেসযোগ্য ও নিরাপদ rollback-এর ভিত্তি।')],
            [l('@sha256 digest', '@sha256 digest'), l('The strongest guarantee: pins the exact image content, not even a re-pushable tag.', 'সবচেয়ে শক্ত নিশ্চয়তা: ঠিক image বিষয়বস্তু পিন করে, একটি পুনঃ-push-যোগ্য tag-ও নয়।')],
          ],
        } },
        { note: l('Deploying image:latest means the image can change under you between two identical deploy commands, so you can never be sure what is actually running or reproduce a bug. Deploy by commit SHA or digest for anything that matters.', 'image:latest deploy করা মানে দুটি অভিন্ন deploy কমান্ডের মধ্যে image আপনার অজান্তে বদলাতে পারে, তাই আসলে কী চলছে কখনো নিশ্চিত হতে বা একটি bug পুনরুৎপাদন করতে পারবেন না। গুরুত্বপূর্ণ যেকোনো কিছু commit SHA বা digest দিয়ে deploy করুন।'), kind: 'warn' },
      ],
    },
    {
      h: l('When and where to use a registry pipeline', 'কখন ও কোথায় registry pipeline ব্যবহার করবেন'),
      blocks: [
        { p: l('Use a registry-driven pipeline for any app that is deployed by more than one person, to more than one environment, or more than once — which is almost every real project. Building and pushing an immutable tag in CI, then deploying by that tag or its digest, gives you reproducible deploys and instant rollback: the exact image that passed your tests is the exact image that runs, on staging and in production alike. This is the single biggest reliability upgrade most teams make.', 'একটি registry-চালিত pipeline ব্যবহার করুন এমন যেকোনো অ্যাপের জন্য যা একজনের বেশি মানুষ, একটির বেশি environment-এ, বা একবারের বেশি deploy করে—যা প্রায় প্রতিটি বাস্তব প্রকল্প। CI-তে একটি immutable tag build ও push করা, তারপর সেই tag বা তার digest দিয়ে deploy করা, আপনাকে পুনরুৎপাদনযোগ্য deploy ও তাৎক্ষণিক rollback দেয়: আপনার test পাস করা ঠিক image-টিই staging ও production-এ একইভাবে চলে। এটিই বেশিরভাগ টিমের করা সবচেয়ে বড় নির্ভরযোগ্যতা-উন্নয়ন।') },
        { p: l('The trade-off is that a pipeline adds infrastructure and credentials to secure — a registry to run or pay for, and push/pull secrets to protect. For a solo experiment on one machine that may be overkill. But the moment you have staging and production, or a teammate, the cost pays for itself, and the crucial rule stands: build the image in CI and pull the tested one, never build it fresh on the production host at deploy time.', 'ট্রেড-অফ হলো একটি pipeline সুরক্ষিত করার মতো অবকাঠামো ও credential যোগ করে—চালাতে বা টাকা দিতে হয় এমন একটি registry, ও রক্ষা করার push/pull secret। এক মেশিনে একজনের একটি পরীক্ষার জন্য এটি অতিরিক্ত হতে পারে। কিন্তু যেই মুহূর্তে আপনার staging ও production, বা একজন সহকর্মী থাকে, খরচ নিজেই উঠে আসে, আর জরুরি নিয়মটি দাঁড়িয়ে থাকে: CI-তে image build করুন ও test করা-টি pull করুন, deploy-এর সময় production host-এ কখনো নতুন করে build করবেন না।') },
      ],
    },
    {
      h: l('Common mistakes', 'সাধারণ ভুল'),
      blocks: [
        { list: [
          l('Building the image on the production host at deploy time instead of pulling a tested one from a registry, so prod runs an untested build.', 'registry থেকে একটি test করা image pull না করে deploy-এর সময় production host-এ image build করা, ফলে prod একটি untested build চালায়।'),
          l('Deploying :latest, so the image can silently change and you cannot tell which build is running or reproduce a failure.', ':latest deploy করা, ফলে image নীরবে বদলাতে পারে ও কোন build চলছে বলতে বা একটি ব্যর্থতা পুনরুৎপাদন করতে পারবেন না।'),
          l('Tagging by a mutable branch name (like main) instead of an immutable commit SHA, which breaks traceability and rollback.', 'একটি immutable commit SHA-র বদলে একটি mutable branch নাম (যেমন main) দিয়ে tag করা, যা traceability ও rollback ভাঙে।'),
          l('Baking registry credentials or secrets into the image or committing them, instead of using CI secrets and docker login.', 'CI secret ও docker login ব্যবহার না করে registry credential বা secret image-এ bake করা বা commit করা।'),
          l('Rebuilding for a rollback instead of just redeploying a previous immutable tag that you know already worked.', 'একটি rollback-এর জন্য আবার build করা, একটি আগের immutable tag পুনরায় deploy না করে যা আপনি জানেন আগেই কাজ করেছে।'),
        ] },
      ],
    },
    {
      h: l('Remember in one line', 'এক লাইনে মনে রাখুন'),
      blocks: [
        { list: [
          l('Build once in CI, tag by commit SHA, push to a registry, and deploy that exact tag — what you tested is what runs.', 'CI-তে একবার build, commit SHA দিয়ে tag, একটি registry-তে push, ও ঠিক সেই tag deploy—যা test করলেন তাই চলে।'),
          l('Immutable tags make every deploy traceable and turn rollback into redeploying a known-good previous tag.', 'immutable tag প্রতিটি deploy ট্রেসযোগ্য করে ও rollback-কে একটি জানা-ভালো আগের tag পুনরায় deploy করায় পরিণত করে।'),
          l('Never build on the production host and never deploy :latest — pull the tested image, pinned by SHA or digest.', 'production host-এ কখনো build করবেন না ও :latest deploy করবেন না—SHA বা digest দিয়ে পিন করা test করা image pull করুন।'),
        ] },
      ],
    },
  ],

  // ── dk-orchestration · Beyond Docker: orchestration ───────────────────────
  'dk-orchestration': [
    {
      h: l('What is orchestration?', 'অর্কেস্ট্রেশন কী?'),
      blocks: [
        { p: l('Orchestration is running containers across many machines automatically, instead of by hand on one. Docker itself is brilliant at building an image and running a container on a single host — but once you need dozens of containers spread over a fleet of servers, staying up through crashes and traffic spikes, someone has to decide which container runs where, restart the ones that die, add copies when load rises, and route traffic between them. An orchestrator like Kubernetes is the system that does all of that for you, continuously.', 'অর্কেস্ট্রেশন হলো এক মেশিনে হাতে না চালিয়ে অনেক মেশিনজুড়ে স্বয়ংক্রিয়ভাবে container চালানো। Docker নিজে একটি single host-এ একটি image build ও একটি container চালাতে দুর্দান্ত—কিন্তু যখন আপনার একটি server-বহরজুড়ে ছড়ানো ডজনখানেক container দরকার, crash ও traffic spike-এর মধ্যেও সচল থাকা, তখন কাউকে ঠিক করতে হয় কোন container কোথায় চলবে, যেগুলো মরে সেগুলো restart করতে হয়, load বাড়লে কপি যোগ করতে হয়, ও এদের মধ্যে traffic route করতে হয়। কুবারনেটিসের মতো একটি orchestrator হলো সেই সিস্টেম যা এই সবকিছু আপনার জন্য অবিরাম করে।') },
        { p: l('The way an orchestrator works is declarative: you describe the desired state ("run 3 replicas of this image, keep them healthy, expose them on this port") and the orchestrator’s job is to make reality match that description and keep it matched. If a container crashes, it starts a new one. If a whole machine dies, it reschedules that machine’s containers onto healthy ones. If you change the desired image, it rolls the update out gradually and can roll it back. You stop managing individual containers and start managing intent.', 'একটি orchestrator যেভাবে কাজ করে তা declarative: আপনি কাঙ্ক্ষিত অবস্থা বর্ণনা করেন ("এই image-এর 3টি replica চালাও, সেগুলো সুস্থ রাখো, এই port-এ প্রকাশ করো") আর orchestrator-এর কাজ হলো বাস্তবকে সেই বর্ণনার সঙ্গে মেলানো ও মিলিয়ে রাখা। একটি container crash করলে এটি একটি নতুন চালু করে। একটি পুরো মেশিন মরলে এটি সেই মেশিনের container সুস্থ মেশিনে পুনঃশিডিউল করে। আপনি কাঙ্ক্ষিত image বদলালে এটি update ধীরে ধীরে rollout করে ও rollback করতে পারে। আপনি পৃথক container সামলানো ছেড়ে intent সামলানো শুরু করেন।') },
        { note: l('Docker builds and runs one container; an orchestrator is the air-traffic control for a whole fleet of them — deciding which plane lands on which runway, rerouting around a closed airport, and adding flights when demand surges, all without a human directing each one.', 'Docker একটি container build ও run করে; একটি orchestrator হলো তাদের পুরো বহরের এয়ার-ট্রাফিক কন্ট্রোল—কোন প্লেন কোন রানওয়েতে নামবে ঠিক করা, একটি বন্ধ বিমানবন্দর এড়িয়ে পুনঃপথ করা, ও চাহিদা বাড়লে ফ্লাইট যোগ করা, সবই প্রতিটির জন্য একজন মানুষ নির্দেশ না দিয়ে।'), kind: 'tip' },
      ],
    },
    {
      h: l('What an orchestrator does, step by step', 'একটি orchestrator কী করে, ধাপে ধাপে'),
      blocks: [
        { steps: [
          l('You submit a declarative spec — for example a Kubernetes Deployment that asks for 3 replicas of an image.', 'আপনি একটি declarative spec জমা দেন—যেমন একটি Kubernetes Deployment যা একটি image-এর 3টি replica চায়।'),
          l('The scheduler places each container (pod) onto a node that has room, spreading them for resilience.', 'scheduler প্রতিটি container (pod) এমন একটি node-এ বসায় যার জায়গা আছে, স্থিতিস্থাপকতার জন্য ছড়িয়ে।'),
          l('It watches health continuously; if a container fails its healthcheck or a node goes down, it reschedules a replacement automatically — self-healing.', 'এটি অবিরাম health দেখে; একটি container তার healthcheck-এ ব্যর্থ হলে বা একটি node পড়ে গেলে, এটি স্বয়ংক্রিয়ভাবে একটি বিকল্প পুনঃশিডিউল করে—স্ব-নিরাময়।'),
          l('When you change the desired image, it performs a rolling update: new containers come up and old ones drain, with no downtime, and it can roll back if the new version is bad.', 'আপনি কাঙ্ক্ষিত image বদলালে এটি একটি rolling update করে: নতুন container ওঠে ও পুরনোগুলো নিষ্কাশিত হয়, কোনো downtime ছাড়া, আর নতুন version খারাপ হলে rollback করতে পারে।'),
          l('It gives the set of replicas one stable address (a Service) and load-balances traffic across them, and can autoscale the count with demand.', 'এটি replica-গুলোর সেটকে একটি স্থিতিশীল address (একটি Service) দেয় ও তাদের জুড়ে traffic load-balance করে, এবং চাহিদার সঙ্গে সংখ্যা autoscale করতে পারে।'),
        ] },
        { code: `# a minimal Kubernetes Deployment: desired state, declared
apiVersion: apps/v1
kind: Deployment
metadata:
  name: api
spec:
  replicas: 3
  selector:
    matchLabels:
      app: api
  template:
    metadata:
      labels:
        app: api
    spec:
      containers:
        - name: api
          image: myorg/api:1.4
          ports:
            - containerPort: 3000`, caption: l('You declare "I want 3 replicas of myorg/api:1.4"; Kubernetes schedules them, restarts any that die, and keeps exactly 3 running across the cluster. Contrast this with docker run, which starts one container on one host and forgets about it.', 'আপনি ঘোষণা করেন "আমি myorg/api:1.4-এর 3টি replica চাই"; Kubernetes সেগুলো schedule করে, যেগুলো মরে restart করে, ও cluster জুড়ে ঠিক 3টি চালু রাখে। এর বিপরীতে docker run এক host-এ একটি container চালু করে ও ভুলে যায়।') },
      ],
    },
    {
      h: l('Docker alone vs an orchestrator', 'শুধু Docker বনাম একটি orchestrator'),
      blocks: [
        { table: {
          head: [l('Concern', 'বিষয়'), l('Docker alone', 'শুধু Docker'), l('Orchestrator (Kubernetes)', 'orchestrator (Kubernetes)')],
          rows: [
            [l('Machines', 'মেশিন'), l('One host you manage by hand.', 'একটি host যা আপনি হাতে সামলান।'), l('Many nodes managed as one cluster.', 'অনেক node একটি cluster হিসেবে সামলানো।')],
            [l('Scaling', 'স্কেলিং'), l('Manual: docker run or compose --scale on that host.', 'হাতে: সেই host-এ docker run বা compose --scale।'), l('Declared replica count, plus autoscaling with load.', 'ঘোষিত replica সংখ্যা, সঙ্গে load-এ autoscaling।')],
            [l('Healing', 'নিরাময়'), l('A restart policy, but only on the one surviving host.', 'একটি restart policy, তবে শুধু একটি টিকে থাকা host-এ।'), l('Reschedules containers onto other healthy nodes.', 'container অন্য সুস্থ node-এ পুনঃশিডিউল করে।')],
            [l('Rollout', 'রোলআউট'), l('Manual stop and start; downtime is easy to cause.', 'হাতে stop ও start; downtime সহজেই ঘটে।'), l('Rolling updates and one-command rollback, no downtime.', 'rolling update ও এক-কমান্ড rollback, downtime ছাড়া।')],
            [l('Networking / LB', 'নেটওয়ার্কিং / LB'), l('You wire ports and a load balancer yourself.', 'আপনি নিজে port ও একটি load balancer জোড়েন।'), l('Built-in service discovery and load balancing.', 'বিল্ট-ইন service discovery ও load balancing।')],
          ],
        } },
      ],
    },
    {
      h: l('When to move up to an orchestrator', 'কখন একটি orchestrator-এ উঠবেন'),
      blocks: [
        { p: l('Master containers with Docker first. For a single server, a handful of services, and modest traffic, Docker plus Docker Compose is genuinely enough — one machine can handle far more than beginners expect, and Compose already gives you multi-container startup, a shared network, and simple scaling of one service. Adding Kubernetes here buys you very little and costs a great deal of new complexity.', 'আগে Docker দিয়ে container আয়ত্ত করুন। একটি single server, গুটিকয়েক service ও পরিমিত traffic-এর জন্য Docker সঙ্গে Docker Compose সত্যিই যথেষ্ট—একটি মেশিন নতুনদের ধারণার চেয়ে অনেক বেশি সামলায়, আর Compose আপনাকে ইতিমধ্যে multi-container startup, একটি শেয়ার্ড network ও একটি service-এর সরল scaling দেয়। এখানে Kubernetes যোগ করা খুব সামান্য দেয় ও প্রচুর নতুন জটিলতা খরচ করে।') },
        { p: l('Move up to an orchestrator when the requirements genuinely demand it: you need to run across multiple machines, survive a whole node failing without downtime, autoscale with traffic, or ship frequent zero-downtime rolling updates and rollbacks across a large team. Those are exactly the problems orchestration solves well. The signal is real operational pain — a single host you keep outgrowing, or downtime you cannot afford — not resume-driven curiosity. Orchestrators unlock resilient scale, but they add major operational complexity that many small apps simply do not need.', 'একটি orchestrator-এ উঠুন যখন প্রয়োজন সত্যিই তা দাবি করে: আপনাকে একাধিক মেশিনজুড়ে চালাতে হবে, একটি পুরো node ব্যর্থ হলেও downtime ছাড়া টিকতে হবে, traffic-এর সঙ্গে autoscale করতে হবে, বা একটি বড় টিমজুড়ে ঘন ঘন zero-downtime rolling update ও rollback পাঠাতে হবে। এগুলোই ঠিক সেই সমস্যা যা orchestration ভালোভাবে সমাধান করে। সংকেত হলো আসল অপারেশনাল যন্ত্রণা—একটি single host যা আপনি বারবার ছাড়িয়ে যাচ্ছেন, বা যে downtime আপনি বহন করতে পারেন না—resume-চালিত কৌতূহল নয়। orchestrator স্থিতিস্থাপক স্কেল খোলে, তবে বড় অপারেশনাল জটিলতা যোগ করে যা অনেক ছোট অ্যাপের কেবল দরকার নেই।') },
      ],
    },
    {
      h: l('Common mistakes', 'সাধারণ ভুল'),
      blocks: [
        { list: [
          l('Reaching for Kubernetes for a simple single-server app, taking on huge operational complexity for no real benefit.', 'একটি সরল single-server অ্যাপে Kubernetes ব্যবহার করা, বিনা লাভে বিশাল অপারেশনাল জটিলতা নেওয়া।'),
          l('Skipping the Docker fundamentals and trying to learn orchestration first — the pod is still just a container, and it will not make sense without that base.', 'Docker-এর মূল বিষয় বাদ দিয়ে আগে orchestration শেখার চেষ্টা—pod এখনও শুধু একটি container, ও সেই ভিত্তি ছাড়া তা অর্থপূর্ণ হবে না।'),
          l('Assuming an orchestrator is free once installed — running a cluster is itself an ongoing operational job.', 'ধরে নেওয়া একবার ইনস্টল হলে একটি orchestrator বিনামূল্যে—একটি cluster চালানো নিজেই একটি চলমান অপারেশনাল কাজ।'),
          l('Outgrowing a single host but refusing to move up, then hand-scripting failover and scaling that an orchestrator does reliably.', 'একটি single host ছাড়িয়ে গিয়েও উঠতে অস্বীকার করা, তারপর failover ও scaling হাতে-script করা যা একটি orchestrator নির্ভরযোগ্যভাবে করে।'),
          l('Treating Kubernetes as a replacement for Docker rather than a layer above it — you still build Docker images to run on it.', 'Kubernetes-কে Docker-এর ওপরের একটি স্তর নয়, বরং Docker-এর বিকল্প ভাবা—আপনি এখনও এর ওপর চালাতে Docker image build করেন।'),
        ] },
      ],
    },
    {
      h: l('Remember in one line', 'এক লাইনে মনে রাখুন'),
      blocks: [
        { list: [
          l('Docker runs a container on one host; an orchestrator like Kubernetes runs many across a fleet, scheduling, scaling, healing, and networking them.', 'Docker এক host-এ একটি container চালায়; Kubernetes-এর মতো একটি orchestrator একটি বহরজুড়ে অনেক চালায়, schedule, scale, heal ও network করে।'),
          l('Orchestration is declarative: you describe the desired state and it continuously makes reality match.', 'orchestration declarative: আপনি কাঙ্ক্ষিত অবস্থা বর্ণনা করেন ও এটি অবিরাম বাস্তবকে মেলায়।'),
          l('Master Docker first; move up only when multi-host scale, self-healing, or zero-downtime rollouts truly justify the added complexity.', 'আগে Docker আয়ত্ত করুন; শুধু তখনই উঠুন যখন multi-host স্কেল, স্ব-নিরাময় বা zero-downtime rollout সত্যিই বাড়তি জটিলতাকে যুক্তিযুক্ত করে।'),
        ] },
      ],
    },
  ],
}
