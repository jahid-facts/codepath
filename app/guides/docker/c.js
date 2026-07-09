// Deep, bilingual (English / Bangla) teaching guides for the Docker course —
// Dockerfile hardening & the container runtime. Shape mirrors app/course-guides.js
// and app/guides/git/a.js: each guide is an array of sections { h, blocks }, rendered
// by GuideBlock in app/LearningApp.js. Block types: { p }, { list }, { steps },
// { table:{head,rows} }, { note, kind }, { code, caption }.
// Facts (definitions, analogies, commands, trade-offs, mistakes) come from app/courses/docker.js.

const l = (en, bn) => ({ en, bn })

export default {
  // ── dk-multistage · Multi-stage builds ────────────────────────────────────
  'dk-multistage': [
    {
      h: l('What is a multi-stage build?', 'মাল্টি-স্টেজ বিল্ড কী?'),
      blocks: [
        { p: l('A multi-stage build is a single Dockerfile that defines more than one build stage, where an early stage does the heavy work of compiling or bundling your app, and a later, much smaller stage copies only the finished artifact out of it. Each stage begins with its own FROM line and can use a completely different base image. The important twist is that only the last stage becomes your final image — everything used to build the app (compilers, package managers, source files, caches) is thrown away with the earlier stages.', 'মাল্টি-স্টেজ বিল্ড হলো একটি একক Dockerfile যা একাধিক build stage সংজ্ঞায়িত করে, যেখানে একটি আগের stage অ্যাপ কম্পাইল বা বান্ডল করার ভারী কাজ করে, আর একটি পরের, অনেক ছোট stage তা থেকে শুধু তৈরি হওয়া artifact কপি করে নেয়। প্রতিটি stage তার নিজের FROM লাইন দিয়ে শুরু হয় ও সম্পূর্ণ ভিন্ন base image ব্যবহার করতে পারে। গুরুত্বপূর্ণ মোড়টি হলো শুধু শেষ stage আপনার চূড়ান্ত image হয়—অ্যাপ বিল্ড করতে ব্যবহৃত সবকিছু (compiler, package manager, source ফাইল, cache) আগের stage-এর সঙ্গে ফেলে দেওয়া হয়।') },
        { p: l('The problem this solves is bloated, insecure production images. To build many apps you need a full toolchain — a Node or Go compiler, build dependencies, dev packages — but at runtime you only need the compiled output and maybe a tiny web server. Without multi-stage builds, all that build machinery ships to production inside your image, making it hundreds of megabytes larger and giving an attacker far more tools to exploit if they break in. A multi-stage build keeps the build tools in a throwaway stage and ships only what actually runs.', 'এটি যে সমস্যা সমাধান করে তা হলো ফোলা, অনিরাপদ production image। অনেক অ্যাপ বিল্ড করতে আপনার একটি পূর্ণ toolchain লাগে—একটি Node বা Go compiler, build dependency, dev package—কিন্তু runtime-এ আপনার শুধু কম্পাইল করা output ও হয়তো একটি ছোট web server লাগে। মাল্টি-স্টেজ বিল্ড ছাড়া, সেই সব build যন্ত্রপাতি আপনার image-এর ভেতরে production-এ যায়, একে শত শত মেগাবাইট বড় করে ও ভেতরে ঢুকে পড়লে আক্রমণকারীকে অনেক বেশি টুল দেয়। মাল্টি-স্টেজ বিল্ড build টুলগুলো একটি ফেলে-দেওয়া stage-এ রাখে ও শুধু যা আসলে চলে তা পাঠায়।') },
        { note: l('Think of cooking in a full commercial kitchen with every pot, oven, and mess, then sending only the finished, plated dish out to the dining room. The customer never sees the kitchen — the build stage — only the clean final plate, which is your runtime image.', 'একটি পূর্ণ বাণিজ্যিক রান্নাঘরে প্রতিটি হাঁড়ি, চুলা ও অগোছালো নিয়ে রাঁধার কথা ভাবুন, তারপর শুধু তৈরি, সাজানো ডিশটি ডাইনিং রুমে পাঠান। গ্রাহক কখনো রান্নাঘর—build stage—দেখে না, শুধু পরিষ্কার চূড়ান্ত প্লেট দেখে, যা আপনার runtime image।'), kind: 'tip' },
      ],
    },
    {
      h: l('How a multi-stage build works', 'মাল্টি-স্টেজ বিল্ড কীভাবে কাজ করে'),
      blocks: [
        { p: l('You name the first stage with AS, build inside it, then start a fresh stage from a slim base and pull the built files across with COPY --from. The daemon runs the stages in order, but only the final stage is tagged as your image.', 'আপনি প্রথম stage-টি AS দিয়ে নাম দেন, তার ভেতরে বিল্ড করেন, তারপর একটি স্লিম base থেকে একটি নতুন stage শুরু করে COPY --from দিয়ে বিল্ড করা ফাইল টেনে আনেন। daemon stage-গুলো ক্রমে চালায়, তবে শুধু চূড়ান্ত stage আপনার image হিসেবে ট্যাগ হয়।') },
        { steps: [
          l('Stage one starts from a full image (for example node:20) that has the compiler and build tools your app needs.', 'stage এক একটি পূর্ণ image (যেমন node:20) থেকে শুরু হয় যাতে আপনার অ্যাপের দরকারি compiler ও build টুল আছে।'),
          l('Inside that stage you install dependencies and run the build (npm ci && npm run build), producing an output folder like dist.', 'সেই stage-এর ভেতরে আপনি dependency ইনস্টল করেন ও build চালান (npm ci && npm run build), dist-এর মতো একটি output ফোল্ডার তৈরি করে।'),
          l('You give the stage a name with AS build so a later stage can refer back to it.', 'AS build দিয়ে stage-টিকে একটি নাম দেন যাতে পরের stage তাকে ফিরে রেফার করতে পারে।'),
          l('A second FROM begins a brand-new stage from a minimal runtime base such as nginx:alpine — none of stage one’s files are here yet.', 'একটি দ্বিতীয় FROM nginx:alpine-এর মতো একটি ন্যূনতম runtime base থেকে একদম নতুন stage শুরু করে—stage এক-এর কোনো ফাইল এখানে এখনো নেই।'),
          l('COPY --from=build copies only the built artifact out of the first stage into this slim image.', 'COPY --from=build প্রথম stage থেকে শুধু বিল্ড করা artifact এই স্লিম image-এ কপি করে।'),
          l('The final image contains just the runtime base plus your output — the compiler, source, and node_modules are all discarded.', 'চূড়ান্ত image-এ থাকে শুধু runtime base ও আপনার output—compiler, source ও node_modules সব বাদ পড়ে।'),
        ] },
        { code: `# ---- build stage: full toolchain, thrown away later ----
FROM node:20 AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build            # produces /app/dist

# ---- runtime stage: only the built output ships ----
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]`, caption: l('The heavy node:20 toolchain lives only in the build stage; the final image is a tiny nginx:alpine serving the built files copied by COPY --from=build.', 'ভারী node:20 toolchain শুধু build stage-এ থাকে; চূড়ান্ত image হলো একটি ছোট nginx:alpine যা COPY --from=build দিয়ে কপি করা বিল্ড ফাইল পরিবেশন করে।') },
      ],
    },
    {
      h: l('COPY --from and naming stages', 'COPY --from ও stage নামকরণ'),
      blocks: [
        { p: l('The bridge between stages is COPY --from. You can copy from a named stage (COPY --from=build /app/dist ./) or even from an external image (COPY --from=nginx:latest /etc/nginx/nginx.conf ./). Naming stages with AS keeps the Dockerfile readable, but if you leave a stage unnamed you can still reference it by its numeric index, starting at 0.', 'stage-গুলোর মধ্যে সেতু হলো COPY --from। আপনি একটি নামযুক্ত stage থেকে কপি করতে পারেন (COPY --from=build /app/dist ./) বা এমনকি একটি বাহ্যিক image থেকেও (COPY --from=nginx:latest /etc/nginx/nginx.conf ./)। AS দিয়ে stage নাম দিলে Dockerfile পাঠযোগ্য থাকে, তবে একটি stage বেনামে রাখলেও আপনি এর সংখ্যাসূচক index দিয়ে রেফার করতে পারেন, ০ থেকে শুরু।') },
        { list: [
          l('COPY --from=<stage> pulls files out of an earlier stage into the current one — this is the whole point of multi-stage.', 'COPY --from=<stage> একটি আগের stage থেকে ফাইল বর্তমান stage-এ টেনে আনে—এটিই মাল্টি-স্টেজের পুরো উদ্দেশ্য।'),
          l('Only the last stage in the file becomes the tagged image; earlier stages exist only to feed it.', 'ফাইলের শুধু শেষ stage ট্যাগ করা image হয়; আগের stage শুধু একে খাওয়াতে থাকে।'),
          l('You can stop the build early at a named stage with docker build --target build, useful for a debug or test image.', 'docker build --target build দিয়ে আপনি একটি নামযুক্ত stage-এ বিল্ড আগেই থামাতে পারেন, একটি debug বা test image-এর জন্য উপযোগী।'),
          l('Each stage has its own cache, so unchanged build stages are reused on the next build.', 'প্রতিটি stage-এর নিজের cache থাকে, তাই অপরিবর্তিত build stage পরের build-এ পুনঃব্যবহৃত হয়।'),
        ] },
      ],
    },
    {
      h: l('Single-stage vs multi-stage', 'সিঙ্গল-স্টেজ বনাম মাল্টি-স্টেজ'),
      blocks: [
        { table: {
          head: [l('Aspect', 'দিক'), l('Single-stage', 'সিঙ্গল-স্টেজ'), l('Multi-stage', 'মাল্টি-স্টেজ')],
          rows: [
            [l('Final image size', 'চূড়ান্ত image সাইজ'), l('Large — build tools and source ship too', 'বড়—build টুল ও source-ও যায়'), l('Small — only the runtime artifact ships', 'ছোট—শুধু runtime artifact যায়')],
            [l('Attack surface', 'আক্রমণ-পৃষ্ঠ'), l('Wider — compilers and dev packages remain', 'প্রশস্ত—compiler ও dev package থেকে যায়'), l('Narrow — no build toolchain at runtime', 'সরু—runtime-এ কোনো build toolchain নেই')],
            [l('Dockerfile complexity', 'Dockerfile জটিলতা'), l('Simpler to read at a glance', 'এক নজরে পড়া সহজ'), l('More stages to reason about', 'ভাবার মতো বেশি stage')],
            [l('Best for', 'কার জন্য'), l('Interpreted apps with no build step', 'build ধাপ ছাড়া interpreted অ্যাপ'), l('Compiled or bundled apps (Go, Java, React)', 'কম্পাইল বা বান্ডল করা অ্যাপ (Go, Java, React)')],
          ],
        } },
      ],
    },
    {
      h: l('When and where to use it', 'কখন ও কোথায় ব্যবহার করবেন'),
      blocks: [
        { p: l('Reach for a multi-stage build whenever building the app and running it need different tools. That covers most compiled languages (Go, Rust, Java) and every front-end app that has a bundling step (React, Vue, Angular): you build with the full SDK, then serve the static output from a tiny web server or a scratch image. It is also the cleanest way to run tests or linting in a dedicated stage that never ships to production.', 'যখনই অ্যাপ বিল্ড করা ও চালানোর জন্য ভিন্ন টুল লাগে তখনই মাল্টি-স্টেজ বিল্ড নিন। এটি বেশিরভাগ কম্পাইল করা ভাষা (Go, Rust, Java) ও প্রতিটি front-end অ্যাপ যার একটি bundling ধাপ আছে (React, Vue, Angular) ঢাকে: আপনি পূর্ণ SDK দিয়ে বিল্ড করেন, তারপর একটি ছোট web server বা একটি scratch image থেকে static output পরিবেশন করেন। এটি একটি ডেডিকেটেড stage-এ test বা linting চালানোর সবচেয়ে পরিষ্কার উপায়ও যা কখনো production-এ যায় না।') },
        { p: l('Where it helps less is a purely interpreted app with no build step at all — a small Python or Node script that just runs its source. There the runtime already needs the interpreter, so there is little to strip out, and a single stage keeps the Dockerfile simpler. Even then, many teams still split a "dependencies" stage from an "app" stage to keep the final image lean and the cache tidy.', 'যেখানে কম সাহায্য করে তা হলো কোনো build ধাপ ছাড়া সম্পূর্ণ interpreted অ্যাপ—একটি ছোট Python বা Node script যা শুধু তার source চালায়। সেখানে runtime-এর আগে থেকেই interpreter দরকার, তাই বাদ দেওয়ার মতো কমই থাকে, আর একটি single stage Dockerfile-কে সরল রাখে। তবুও অনেক টিম চূড়ান্ত image হালকা ও cache পরিপাটি রাখতে একটি "dependencies" stage-কে একটি "app" stage থেকে আলাদা করে।') },
      ],
    },
    {
      h: l('Common mistakes', 'সাধারণ ভুল'),
      blocks: [
        { list: [
          l('Shipping the whole build toolchain in the final image because you never split stages — the image is huge and the attack surface is wide.', 'stage আলাদা না করায় পুরো build toolchain চূড়ান্ত image-এ পাঠানো—image বিশাল ও আক্রমণ-পৃষ্ঠ প্রশস্ত।'),
          l('Copying too much across with COPY --from — pull only the built artifact, not the entire /app directory with its node_modules and source.', 'COPY --from দিয়ে বেশি কপি করা—পুরো /app ডিরেক্টরি তার node_modules ও source সহ নয়, শুধু বিল্ড করা artifact নিন।'),
          l('Choosing a runtime base that is too minimal (scratch or alpine) and missing a library your binary needs at runtime, causing "not found" crashes.', 'অতি-ন্যূনতম runtime base (scratch বা alpine) বাছা ও আপনার binary-র runtime-এ দরকারি একটি লাইব্রেরি মিস করা, "not found" ক্র্যাশ ঘটায়।'),
          l('Forgetting that only the last stage ships — putting the CMD or EXPOSE in the build stage instead of the runtime stage.', 'ভুলে যাওয়া যে শুধু শেষ stage যায়—CMD বা EXPOSE runtime stage-এর বদলে build stage-এ রাখা।'),
        ] },
      ],
    },
    {
      h: l('Remember in one line', 'এক লাইনে মনে রাখুন'),
      blocks: [
        { list: [
          l('Build in a full stage, then COPY --from that stage into a slim runtime stage — only the last stage ships.', 'একটি পূর্ণ stage-এ বিল্ড করুন, তারপর সেই stage থেকে COPY --from দিয়ে একটি স্লিম runtime stage-এ নিন—শুধু শেষ stage যায়।'),
          l('It dramatically shrinks the final image and narrows the attack surface by leaving the toolchain behind.', 'এটি toolchain রেখে চূড়ান্ত image ব্যাপকভাবে ছোট করে ও আক্রমণ-পৃষ্ঠ সরু করে।'),
          l('Ideal for compiled and bundled apps; less needed for a plain interpreted script.', 'কম্পাইল ও বান্ডল করা অ্যাপে আদর্শ; সাধারণ interpreted script-এ কম দরকার।'),
        ] },
      ],
    },
  ],

  // ── dk-dockerignore · .dockerignore & build context ───────────────────────
  'dk-dockerignore': [
    {
      h: l('What is the build context and .dockerignore?', 'বিল্ড কনটেক্সট ও .dockerignore কী?'),
      blocks: [
        { p: l('When you run docker build ., that trailing dot is the build context: the whole directory tree Docker packages up and sends to the daemon before it runs a single instruction. Every COPY and ADD in your Dockerfile can only reach files inside this context. A .dockerignore file, placed next to your Dockerfile, is a list of patterns telling Docker which files and folders to leave out of that context — much like a .gitignore tells Git what to skip.', 'আপনি docker build . চালালে, সেই শেষের ডটটি হলো build context: পুরো ডিরেক্টরি ট্রি যা Docker প্যাকেজ করে ও একটিও নির্দেশ চালানোর আগে daemon-এ পাঠায়। আপনার Dockerfile-এর প্রতিটি COPY ও ADD শুধু এই context-এর ভেতরের ফাইল ছুঁতে পারে। আপনার Dockerfile-এর পাশে রাখা একটি .dockerignore ফাইল হলো প্যাটার্নের একটি তালিকা যা Docker-কে বলে কোন ফাইল ও ফোল্ডার সেই context থেকে বাদ দিতে—অনেকটা .gitignore যেমন Git-কে বলে কী এড়াতে।') },
        { p: l('The problem it solves is twofold: speed and safety. Without a .dockerignore, a folder holding node_modules, a .git history, build output, and a local .env file all gets zipped and shipped to the daemon on every build — that can be hundreds of megabytes, slowing builds and busting the cache. Worse, if your Dockerfile has a COPY . ., that stray .env full of secrets gets baked right into the image, where anyone who pulls it can read it.', 'এটি যে সমস্যা সমাধান করে তা দুই দিকের: গতি ও নিরাপত্তা। .dockerignore ছাড়া, node_modules, একটি .git ইতিহাস, build output ও একটি লোকাল .env ফাইল ধরে রাখা একটি ফোল্ডার প্রতিটি build-এ zip হয়ে daemon-এ যায়—তা শত শত মেগাবাইট হতে পারে, build ধীর করে ও cache ভাঙে। আরও খারাপ, আপনার Dockerfile-এ COPY . . থাকলে, সিক্রেটে ভরা সেই ভুল .env সোজা image-এ বেক হয়ে যায়, যেখানে যে-ই এটি pull করে সে পড়তে পারে।') },
        { note: l('It is a "do not pack" list you write before shipping a box. You leave out the clutter and anything private, so the box stays small, cheap to send, and safe to open in front of strangers.', 'এটি একটি "প্যাক করবেন না" তালিকা যা আপনি একটি বাক্স পাঠানোর আগে লেখেন। আপনি অগোছালো ও ব্যক্তিগত সব বাদ দেন, যাতে বাক্স ছোট, পাঠাতে সস্তা ও অচেনাদের সামনে খোলা নিরাপদ থাকে।'), kind: 'tip' },
      ],
    },
    {
      h: l('How .dockerignore works', '.dockerignore কীভাবে কাজ করে'),
      blocks: [
        { p: l('The file uses simple glob patterns, one per line. Before building, the daemon walks your context directory and drops anything that matches, so those files are never sent and never available to COPY.', 'ফাইলটি সরল glob প্যাটার্ন ব্যবহার করে, প্রতি লাইনে একটি। বিল্ডের আগে daemon আপনার context ডিরেক্টরি হাঁটে ও যা মেলে তা বাদ দেয়, তাই সেই ফাইলগুলো কখনো পাঠানো হয় না ও COPY-র কাছে কখনো পাওয়া যায় না।') },
        { steps: [
          l('Create a file named exactly .dockerignore in the same folder as the Dockerfile (the root of your build context).', 'Dockerfile-এর একই ফোল্ডারে (আপনার build context-এর root) ঠিক .dockerignore নামে একটি ফাইল তৈরি করুন।'),
          l('List one pattern per line: a name like node_modules, a wildcard like *.log, or a path like dist.', 'প্রতি লাইনে একটি প্যাটার্ন দিন: node_modules-এর মতো একটি নাম, *.log-এর মতো একটি wildcard, বা dist-এর মতো একটি path।'),
          l('When you run docker build, the daemon excludes every match from the context it receives.', 'আপনি docker build চালালে, daemon যে context পায় তা থেকে প্রতিটি মিল বাদ দেয়।'),
          l('Because the excluded files are absent, a COPY . . cannot accidentally include them in the image.', 'বাদ দেওয়া ফাইল অনুপস্থিত থাকায়, একটি COPY . . ভুলবশত এদের image-এ ঢোকাতে পারে না।'),
          l('Smaller context means less to upload and hash, so builds start faster and the cache is more stable.', 'ছোট context মানে upload ও hash করার কম, তাই build দ্রুত শুরু হয় ও cache বেশি স্থিতিশীল।'),
        ] },
        { p: l('The pattern syntax is small but worth knowing. A line starting with # is a comment. A trailing wildcard like *.log matches by extension, and **/*.log matches at any depth. A leading exclamation mark negates a rule, so you can exclude a whole folder and then re-include one file inside it — for example ignoring config/* but keeping !config/default.json. Rules are read top to bottom, so a later line can override an earlier one.', 'প্যাটার্ন syntax ছোট কিন্তু জানার মতো। # দিয়ে শুরু হওয়া একটি লাইন একটি comment। *.log-এর মতো একটি শেষ-wildcard extension দিয়ে মেলে, ও **/*.log যেকোনো গভীরতায় মেলে। একটি শুরুর বিস্ময়চিহ্ন একটি নিয়ম উল্টে দেয়, তাই আপনি একটি পুরো ফোল্ডার বাদ দিয়ে তারপর এর ভেতরের একটি ফাইল আবার-অন্তর্ভুক্ত করতে পারেন—যেমন config/* ignore করে কিন্তু !config/default.json রাখা। নিয়ম ওপর থেকে নিচে পড়া হয়, তাই একটি পরের লাইন একটি আগেরটিকে override করতে পারে।') },
        { code: `# .dockerignore — keep junk and secrets out of the build context
node_modules
.git
.env
Dockerfile
*.log
dist`, caption: l('Keeping these out of the build context speeds builds and avoids leaking secrets into the image. Note you can even ignore the Dockerfile itself, since the daemon reads it separately.', 'এগুলো বিল্ড কনটেক্সটের বাইরে রাখা বিল্ড দ্রুত করে ও ইমেজে সিক্রেট ফাঁস এড়ায়। খেয়াল করুন Dockerfile নিজেও ignore করতে পারেন, কারণ daemon তা আলাদাভাবে পড়ে।') },
      ],
    },
    {
      h: l('What to ignore and why', 'কী ignore করবেন ও কেন'),
      blocks: [
        { table: {
          head: [l('Pattern', 'প্যাটার্ন'), l('Why exclude it', 'কেন বাদ দেবেন')],
          rows: [
            [l('node_modules', 'node_modules'), l('Huge and rebuilt inside the image by npm ci — sending it wastes time and can break on OS differences.', 'বিশাল ও npm ci দিয়ে image-এর ভেতরে পুনর্নির্মিত—পাঠানো সময় নষ্ট করে ও OS পার্থক্যে ভাঙতে পারে।')],
            [l('.git', '.git'), l('The entire repo history — big and never needed at build or runtime.', 'পুরো repo ইতিহাস—বড় ও build বা runtime-এ কখনো দরকার নেই।')],
            [l('.env, secrets/', '.env, secrets/'), l('Credentials that must never be baked into an image others can pull and read.', 'ক্রেডেনশিয়াল যা কখনো এমন image-এ বেক হওয়া উচিত নয় যা অন্যরা pull ও পড়তে পারে।')],
            [l('dist, build, *.log', 'dist, build, *.log'), l('Local build output and logs — stale, unneeded, and image-polluting.', 'লোকাল build output ও log—পুরনো, অপ্রয়োজনীয় ও image-দূষণকারী।')],
          ],
        } },
        { note: l('Never let a .env, private key, or cloud credential file reach the build context. If COPY . . picks it up, the secret lives in an image layer forever — even if a later step deletes it, it is still recoverable from history.', 'একটি .env, private key বা cloud credential ফাইল কখনো build context-এ পৌঁছাতে দেবেন না। COPY . . এটি তুলে নিলে, secret চিরকাল একটি image layer-এ থাকে—পরের একটি ধাপ মুছলেও এটি ইতিহাস থেকে পুনরুদ্ধারযোগ্য।'), kind: 'warn' },
      ],
    },
    {
      h: l('When and where to use it', 'কখন ও কোথায় ব্যবহার করবেন'),
      blocks: [
        { p: l('Add a .dockerignore to essentially every project that has a Dockerfile — it is one of the cheapest, highest-value files you can write. Do it early, before your first build, so a bloated context never becomes a habit. The moment your project grows a node_modules, a vendor folder, a .git directory, or any local config, the ignore file starts paying for itself in faster builds and a cleaner image.', 'যে প্রতিটি প্রকল্পে একটি Dockerfile আছে তাতে মোটামুটি একটি .dockerignore যোগ করুন—এটি আপনি লিখতে পারা সবচেয়ে সস্তা, সর্বোচ্চ-মূল্যের ফাইলগুলোর একটি। এটি আগেই করুন, আপনার প্রথম build-এর আগে, যাতে একটি ফোলা context কখনো অভ্যাসে না পরিণত হয়। যে মুহূর্তে আপনার প্রকল্পে একটি node_modules, একটি vendor ফোল্ডার, একটি .git ডিরেক্টরি বা যেকোনো লোকাল config বাড়ে, ignore ফাইলটি দ্রুত build ও একটি পরিষ্কার image দিয়ে নিজের মূল্য দিতে শুরু করে।') },
        { p: l('It matters most on large repos and in CI, where the context is uploaded to a remote daemon over the network — every megabyte you can avoid sending shows up directly as saved build time. It also matters most for security in any repo that holds secrets or keys locally: the .dockerignore is your last line of defence against a careless COPY . . leaking them into a published image.', 'এটি বড় repo ও CI-তে সবচেয়ে গুরুত্বপূর্ণ, যেখানে context নেটওয়ার্কে একটি রিমোট daemon-এ upload হয়—আপনি যত মেগাবাইট পাঠানো এড়াতে পারেন তা সরাসরি বাঁচানো build সময় হিসেবে দেখায়। এটি এমন যেকোনো repo-তে নিরাপত্তার জন্যও সবচেয়ে গুরুত্বপূর্ণ যা লোকালি secret বা key ধরে রাখে: .dockerignore হলো একটি অসাবধান COPY . . এদের একটি প্রকাশিত image-এ ফাঁস করার বিরুদ্ধে আপনার শেষ প্রতিরক্ষা রেখা।') },
      ],
    },
    {
      h: l('Common mistakes', 'সাধারণ ভুল'),
      blocks: [
        { list: [
          l('Leaving out .dockerignore entirely, so a huge context (and a stray .env) gets copied into the image and slows every build.', '.dockerignore একেবারে বাদ দেওয়া, ফলে একটি বিশাল context (ও একটি ভুল .env) image-এ কপি হয় ও প্রতিটি build ধীর করে।'),
          l('Putting the file in the wrong place — it must sit at the root of the build context, not in a subfolder, or Docker ignores it.', 'ফাইলটি ভুল জায়গায় রাখা—এটি build context-এর root-এ থাকতে হবে, একটি subfolder-এ নয়, নইলে Docker এটি উপেক্ষা করে।'),
          l('Forgetting to add node_modules, then wondering why builds are slow and the local, OS-specific modules clash with the ones installed inside.', 'node_modules যোগ করতে ভুলে যাওয়া, তারপর অবাক হওয়া কেন build ধীর ও লোকাল, OS-নির্দিষ্ট module ভেতরে ইনস্টল করা module-এর সঙ্গে সংঘর্ষ করে।'),
          l('Assuming a later RUN rm removes a secret — it only hides it in a new layer; the earlier layer still contains it.', 'ধরে নেওয়া একটি পরের RUN rm একটি secret সরায়—এটি শুধু একটি নতুন layer-এ লুকায়; আগের layer-এ এখনো তা থাকে।'),
        ] },
      ],
    },
    {
      h: l('Remember in one line', 'এক লাইনে মনে রাখুন'),
      blocks: [
        { list: [
          l('The build context is everything sent to the daemon; .dockerignore keeps junk and secrets out of it.', 'বিল্ড কনটেক্সট হলো daemon-এ পাঠানো সব; .dockerignore এতে আবর্জনা ও সিক্রেট ঢুকতে দেয় না।'),
          l('It lives beside the Dockerfile, uses .gitignore-style patterns, and speeds builds while shrinking the image.', 'এটি Dockerfile-এর পাশে থাকে, .gitignore-ধাঁচের প্যাটার্ন ব্যবহার করে, ও build দ্রুত করে ও image ছোট করে।'),
          l('Always ignore node_modules, .git, and .env before your first COPY . . — it is your last defence against leaking secrets.', 'আপনার প্রথম COPY . .-এর আগে সবসময় node_modules, .git ও .env ignore করুন—এটি secret ফাঁসের বিরুদ্ধে আপনার শেষ প্রতিরক্ষা।'),
        ] },
      ],
    },
  ],

  // ── dk-image-best · Image best practices ──────────────────────────────────
  'dk-image-best': [
    {
      h: l('What are image best practices?', 'ইমেজ বেস্ট প্র্যাকটিস কী?'),
      blocks: [
        { p: l('Image best practices are the small set of habits that make a Docker image production-worthy: keep it small, pin your versions, run as a non-root user, use few well-ordered layers, and include only what the app needs at runtime. Any Dockerfile can produce an image that "works," but a good image is also fast to pull, cheap to store, quick to start, and hard to attack. These practices are what separate a demo image from one you would trust in production.', 'ইমেজ বেস্ট প্র্যাকটিস হলো ছোট কয়েকটি অভ্যাস যা একটি Docker image-কে production-উপযোগী করে: এটি ছোট রাখুন, আপনার version পিন করুন, একটি নন-root ব্যবহারকারী হিসেবে চালান, কম সুসজ্জিত layer ব্যবহার করুন, ও শুধু যা অ্যাপের runtime-এ দরকার তা রাখুন। যেকোনো Dockerfile এমন একটি image বানাতে পারে যা "কাজ করে," তবে একটি ভালো image দ্রুত pull হয়, সস্তায় সংরক্ষিত হয়, দ্রুত চালু হয় ও আক্রমণ করা কঠিন। এই চর্চাগুলোই একটি demo image-কে এমন একটি থেকে আলাদা করে যাকে আপনি production-এ বিশ্বাস করবেন।') },
        { p: l('The problem they solve is that naive images tend to be large, slow, and dangerously permissive. A default base image can be 300–900 MB, most of it libraries your app never calls; an unpinned base can change silently between builds; and, by default, the process inside a container runs as root. Each of those is a real cost — in bandwidth, in reproducibility, and in blast radius if the container is ever compromised. Best practices trim every one of them.', 'এগুলো যে সমস্যা সমাধান করে তা হলো সরল image বড়, ধীর ও বিপজ্জনকভাবে উদার হতে থাকে। একটি ডিফল্ট base image ৩০০–৯০০ MB হতে পারে, যার বেশিরভাগ এমন লাইব্রেরি যা আপনার অ্যাপ কখনো ডাকে না; একটি আন-পিনড base build-এর মধ্যে নীরবে বদলাতে পারে; এবং ডিফল্টে, একটি container-এর ভেতরের process root হিসেবে চলে। এদের প্রতিটি একটি আসল খরচ—bandwidth-এ, পুনরুৎপাদনযোগ্যতায়, ও container কখনো আপস হলে blast radius-এ। বেস্ট প্র্যাকটিস এদের প্রতিটি ছাঁটে।') },
        { note: l('Think of packing a travel bag: you take only the small essentials, label them so you know what is inside, and lock it. You do not stuff the whole wardrobe in, and you do not leave the zip open with your passport on top.', 'একটি ভ্রমণ ব্যাগ প্যাক করার কথা ভাবুন: আপনি শুধু ছোট প্রয়োজনীয় জিনিস নেন, লেবেল দেন যাতে ভেতরে কী আছে জানেন, ও তালা দেন। পুরো আলমারি ঠেসে ঢোকান না, ও পাসপোর্ট ওপরে রেখে চেন খোলা রাখেন না।'), kind: 'tip' },
      ],
    },
    {
      h: l('How to harden an image, step by step', 'ইমেজ কীভাবে কঠোর করবেন, ধাপে ধাপে'),
      blocks: [
        { p: l('The changes are small and mostly live in the Dockerfile. Start from a slim base, pin it, install only production dependencies, then drop root before the app runs.', 'পরিবর্তনগুলো ছোট ও বেশিরভাগ Dockerfile-এ থাকে। একটি স্লিম base থেকে শুরু করুন, এটি পিন করুন, শুধু production dependency ইনস্টল করুন, তারপর অ্যাপ চলার আগে root ছাড়ুন।') },
        { steps: [
          l('Pick a slim or alpine base (node:20-slim, not node:20) so you ship a fraction of the size.', 'একটি slim বা alpine base বাছুন (node:20-slim, node:20 নয়) যাতে আপনি সাইজের একটি ভগ্নাংশ পাঠান।'),
          l('Pin the version with an explicit tag (node:20-slim, ideally a digest) so builds are reproducible, not "whatever latest is today".', 'একটি স্পষ্ট tag দিয়ে version পিন করুন (node:20-slim, আদর্শভাবে একটি digest) যাতে build "আজ latest যা তাই" নয়, পুনরুৎপাদনযোগ্য হয়।'),
          l('Install only what runtime needs — npm ci --omit=dev skips dev-only packages.', 'শুধু যা runtime-এ দরকার তা ইনস্টল করুন—npm ci --omit=dev dev-only package বাদ দেয়।'),
          l('Combine related RUN steps and clean up in the same layer so caches and temp files do not linger.', 'সম্পর্কিত RUN ধাপ একত্র করুন ও একই layer-এ পরিষ্কার করুন যাতে cache ও temp ফাইল না থাকে।'),
          l('Create or use a non-root user and switch to it with USER before the CMD.', 'একটি নন-root user তৈরি বা ব্যবহার করুন ও CMD-এর আগে USER দিয়ে তাতে যান।'),
          l('Copy files with the right ownership (COPY --chown) so the non-root user can actually read them.', 'ঠিক মালিকানাসহ ফাইল কপি করুন (COPY --chown) যাতে নন-root user আসলে সেগুলো পড়তে পারে।'),
        ] },
        { code: `FROM node:20-slim
WORKDIR /app
# copy manifests first so the install layer caches well
COPY package*.json ./
RUN npm ci --omit=dev
# copy the app owned by the non-root 'node' user that base ships
COPY --chown=node:node . .
# drop root: the app runs as an unprivileged user
USER node
EXPOSE 3000
CMD ["node", "server.js"]`, caption: l('USER node drops root, so a compromise inside the container is far less dangerous. The slim base, pinned tag, and --omit=dev keep the image small and reproducible.', 'USER node root ছাড়ে, তাই container-এর ভেতরে একটি আপস অনেক কম বিপজ্জনক। slim base, পিন করা tag ও --omit=dev image-কে ছোট ও পুনরুৎপাদনযোগ্য রাখে।') },
      ],
    },
    {
      h: l('The core practices at a glance', 'মূল চর্চা এক নজরে'),
      blocks: [
        { table: {
          head: [l('Practice', 'চর্চা'), l('Why it matters', 'কেন গুরুত্বপূর্ণ')],
          rows: [
            [l('Slim / alpine base', 'Slim / alpine base'), l('Smaller image pulls and starts faster, with fewer packages to patch or exploit.', 'ছোট image দ্রুত pull ও চালু হয়, patch বা exploit করার কম package সহ।')],
            [l('Pin versions (tag or digest)', 'version পিন (tag বা digest)'), l('Reproducible builds — the base cannot change silently under you.', 'পুনরুৎপাদনযোগ্য build—base আপনার নিচে নীরবে বদলাতে পারে না।')],
            [l('Non-root USER', 'নন-root USER'), l('Limits the blast radius: a breakout does not start as root on the host.', 'blast radius সীমিত করে: একটি breakout হোস্টে root হিসেবে শুরু হয় না।')],
            [l('Only runtime deps', 'শুধু runtime dep'), l('Fewer libraries means a smaller image and a narrower attack surface.', 'কম লাইব্রেরি মানে ছোট image ও সরু আক্রমণ-পৃষ্ঠ।')],
            [l('Few, ordered layers', 'কম, সাজানো layer'), l('Better cache reuse and no leftover temp files bloating the image.', 'ভালো cache পুনঃব্যবহার ও image ফোলানো temp ফাইল নেই।')],
          ],
        } },
      ],
    },
    {
      h: l('Why non-root matters most', 'নন-root কেন সবচেয়ে গুরুত্বপূর্ণ'),
      blocks: [
        { p: l('Of all these practices, running as a non-root user gives the biggest security return. By default the process inside a container runs as root, and while container isolation is real, it is not a hard security boundary — a kernel bug or a misconfigured mount can let a root process inside the container act as root on the host. If the app instead runs as an unprivileged user, an attacker who breaks into it lands with far fewer powers and a much longer climb to do real damage.', 'এই সব চর্চার মধ্যে, একটি নন-root user হিসেবে চালানো সবচেয়ে বড় নিরাপত্তা রিটার্ন দেয়। ডিফল্টে container-এর ভেতরের process root হিসেবে চলে, এবং container isolation আসল হলেও, এটি একটি শক্ত নিরাপত্তা সীমানা নয়—একটি kernel bug বা একটি ভুল-কনফিগার করা mount container-এর ভেতরের একটি root process-কে হোস্টে root হিসেবে কাজ করতে দিতে পারে। অ্যাপ যদি বরং একটি unprivileged user হিসেবে চলে, এতে ঢুকে পড়া একজন আক্রমণকারী অনেক কম ক্ষমতা নিয়ে নামে ও আসল ক্ষতি করতে অনেক দীর্ঘ চড়াই পায়।') },
        { note: l('Running every container as root by default means one breakout can compromise shared resources on the whole host. Add a USER line — it is one of the cheapest security wins in the entire Dockerfile.', 'ডিফল্টে প্রতিটি container root হিসেবে চালানো মানে একটি breakout পুরো হোস্টের শেয়ার্ড রিসোর্স আপস করতে পারে। একটি USER লাইন যোগ করুন—এটি পুরো Dockerfile-এর সবচেয়ে সস্তা নিরাপত্তা জয়গুলোর একটি।'), kind: 'warn' },
      ],
    },
    {
      h: l('When and where to apply them', 'কখন ও কোথায় প্রয়োগ করবেন'),
      blocks: [
        { p: l('Apply best practices to anything headed for production or a shared registry — that is the image other people pull, run, and trust. During quick local experiments you can be looser, but the moment an image is deployed, pushed, or run on a host beside other services, size, pinning, and non-root all start to matter. The good news is these are set-once habits: bake them into your Dockerfile template and every future image inherits them.', 'production বা একটি শেয়ার্ড registry-র দিকে যাওয়া যেকোনো কিছুতে বেস্ট প্র্যাকটিস প্রয়োগ করুন—সেটিই সেই image যা অন্য মানুষ pull, run ও বিশ্বাস করে। দ্রুত লোকাল পরীক্ষার সময় আপনি শিথিল থাকতে পারেন, তবে যে মুহূর্তে একটি image deploy, push বা অন্য service-এর পাশে একটি হোস্টে run হয়, size, পিনিং ও নন-root সব গুরুত্বপূর্ণ হতে শুরু করে। সুখবর হলো এগুলো একবার-সেট করা অভ্যাস: আপনার Dockerfile template-এ এদের বেক করুন ও প্রতিটি ভবিষ্যৎ image এগুলো উত্তরাধিকারসূত্রে পায়।') },
        { p: l('Balance is the one caveat. A base can be too minimal: scratch or a bare alpine may lack a shared library, a shell, or CA certificates your app quietly depends on, turning a "smaller is better" win into a runtime crash. Start slim, test that the app actually runs, and only strip further once you know exactly what it needs. Security is also ongoing — a base image that is clean today can have a CVE reported tomorrow, so rebuild and re-scan regularly rather than trusting an old image forever.', 'ভারসাম্য একটি সতর্কতা। একটি base অতি-ন্যূনতম হতে পারে: scratch বা একটি খালি alpine একটি শেয়ার্ড লাইব্রেরি, একটি shell বা CA certificate মিস করতে পারে যার ওপর আপনার অ্যাপ নীরবে নির্ভর করে, একটি "ছোট মানে ভালো" জয়কে একটি runtime ক্র্যাশে পরিণত করে। slim শুরু করুন, অ্যাপ আসলে চলে তা test করুন, ও ঠিক কী দরকার জানার পরেই আরও ছাঁটুন। নিরাপত্তাও চলমান—আজ পরিষ্কার একটি base image-এ কাল একটি CVE রিপোর্ট হতে পারে, তাই একটি পুরনো image চিরকাল বিশ্বাস না করে নিয়মিত rebuild ও re-scan করুন।') },
      ],
    },
    {
      h: l('Common mistakes', 'সাধারণ ভুল'),
      blocks: [
        { list: [
          l('Running the container as root by default, so a compromise inside grants root-level access on shared resources.', 'ডিফল্টে container root হিসেবে চালানো, ফলে ভেতরের একটি আপস শেয়ার্ড রিসোর্সে root-স্তরের অ্যাক্সেস দেয়।'),
          l('Using a full, unpinned base (node:latest) — huge, and it can change to an untested version on the next build.', 'একটি পূর্ণ, আন-পিনড base (node:latest) ব্যবহার করা—বিশাল, ও পরের build-এ একটি অপরীক্ষিত version-এ বদলাতে পারে।'),
          l('Installing dev dependencies and build tools into the runtime image, bloating it and widening the attack surface.', 'runtime image-এ dev dependency ও build টুল ইনস্টল করা, একে ফোলানো ও আক্রমণ-পৃষ্ঠ বাড়ানো।'),
          l('Going too minimal too fast — a scratch base that misses a library or CA certs, crashing the app at runtime.', 'খুব দ্রুত অতি-ন্যূনতম হওয়া—একটি scratch base যা একটি লাইব্রেরি বা CA cert মিস করে, runtime-এ অ্যাপ ক্র্যাশ করে।'),
        ] },
      ],
    },
    {
      h: l('Remember in one line', 'এক লাইনে মনে রাখুন'),
      blocks: [
        { list: [
          l('Small, pinned, non-root, runtime-only — those four habits make an image production-worthy.', 'ছোট, পিন করা, নন-root, শুধু-runtime—এই চারটি অভ্যাস একটি image-কে production-উপযোগী করে।'),
          l('Start from a slim base, pin the tag, npm ci --omit=dev, and add a USER before CMD.', 'একটি slim base থেকে শুরু, tag পিন করুন, npm ci --omit=dev, ও CMD-এর আগে একটি USER যোগ করুন।'),
          l('Never run as root by default; smaller is better, but test that the app still has what it needs.', 'ডিফল্টে কখনো root হিসেবে চালাবেন না; ছোট ভালো, তবে অ্যাপের যা দরকার তা এখনো আছে তা test করুন।'),
        ] },
      ],
    },
  ],

  // ── dk-run-flags · docker run flags ───────────────────────────────────────
  'dk-run-flags': [
    {
      h: l('What are docker run flags?', 'docker run ফ্ল্যাগ কী?'),
      blocks: [
        { p: l('docker run flags are the options you add to a run command to control exactly how a container starts and behaves. The command itself is just docker run <image>, but on its own that gives you a container with default settings: attached to your terminal, no published ports, no name, no configuration, and no persistent storage. Flags are how you dial in the behaviour you actually want — run it in the background, expose a port, feed in settings, give it a name, and attach data.', 'docker run ফ্ল্যাগ হলো সেই অপশন যা আপনি একটি run কমান্ডে যোগ করেন ঠিক কীভাবে একটি container শুরু হয় ও আচরণ করে তা নিয়ন্ত্রণে। কমান্ডটি নিজে শুধু docker run <image>, তবে একা তা আপনাকে ডিফল্ট সেটিংসহ একটি container দেয়: আপনার terminal-এ যুক্ত, কোনো পাবলিশড port নেই, কোনো নাম নেই, কোনো কনফিগারেশন নেই, ও কোনো স্থায়ী storage নেই। ফ্ল্যাগ হলো যেভাবে আপনি আসলে যে আচরণ চান তা সেট করেন—ব্যাকগ্রাউন্ডে চালান, একটি port খুলুন, সেটিং দিন, একটি নাম দিন, ও ডেটা যুক্ত করুন।') },
        { p: l('The problem flags solve is that no two containers need to run the same way. A background API needs a published port and a restart policy; a database needs a volume and an environment password; a one-off debugging shell needs an interactive terminal and to be removed on exit. One command with a handful of composable flags covers all of these, so you rarely need a different tool — you just change the dials.', 'ফ্ল্যাগ যে সমস্যা সমাধান করে তা হলো কোনো দুটি container একইভাবে চলার দরকার হয় না। একটি ব্যাকগ্রাউন্ড API-র একটি পাবলিশড port ও একটি restart policy দরকার; একটি database-এর একটি volume ও একটি environment password দরকার; একটি এককালীন debugging shell-এর একটি interactive terminal ও বেরোনোর সময় রিমুভ হওয়া দরকার। কয়েকটি composable ফ্ল্যাগসহ একটি কমান্ড এই সব ঢাকে, তাই আপনার কদাচিৎ একটি ভিন্ন টুল দরকার হয়—আপনি শুধু ডায়াল বদলান।') },
        { note: l('Think of dials and switches on a machine: the same machine runs quietly in the background, exposes one output port, takes its settings from a panel, and wears a name tag — you set each with one flag.', 'একটি মেশিনের ডায়াল ও সুইচের কথা ভাবুন: একই মেশিন ব্যাকগ্রাউন্ডে চুপচাপ চলে, একটি আউটপুট port খোলে, একটি প্যানেল থেকে সেটিং নেয়, ও একটি নাম-ট্যাগ পরে—আপনি প্রতিটি একটি ফ্ল্যাগ দিয়ে সেট করেন।'), kind: 'tip' },
      ],
    },
    {
      h: l('How the common flags combine', 'সাধারণ ফ্ল্যাগ কীভাবে মেলে'),
      blocks: [
        { p: l('Flags stack on a single run line, each doing one job. A typical production-style container is detached, named, port-mapped, configured by environment, given a volume, and told when to restart.', 'ফ্ল্যাগ একটি একক run লাইনে স্তূপীকৃত হয়, প্রতিটি একটি কাজ করে। একটি সাধারণ production-ধাঁচের container হয় ডিটাচড, নামযুক্ত, port-ম্যাপড, environment দিয়ে কনফিগার, একটি volume দেওয়া, ও কখন restart করতে হবে বলা।') },
        { steps: [
          l('-d (detached) runs the container in the background and returns your terminal instead of streaming its output.', '-d (ডিটাচড) container-কে ব্যাকগ্রাউন্ডে চালায় ও এর output স্ট্রিম না করে আপনার terminal ফেরত দেয়।'),
          l('-p host:container publishes a port, mapping a host port to the container’s port so outside traffic can reach it.', '-p host:container একটি port পাবলিশ করে, একটি হোস্ট port-কে container-এর port-এ ম্যাপ করে যাতে বাইরের ট্রাফিক পৌঁছাতে পারে।'),
          l('-e KEY=value sets an environment variable inside the container, the standard way to pass configuration.', '-e KEY=value container-এর ভেতরে একটি environment variable সেট করে, কনফিগারেশন দেওয়ার প্রমিত উপায়।'),
          l('--name gives the container a stable name so you can refer to it in later commands instead of a random ID.', '--name container-কে একটি স্থিতিশীল নাম দেয় যাতে আপনি পরের কমান্ডে একটি এলোমেলো ID-র বদলে তাকে রেফার করতে পারেন।'),
          l('-v name:/path mounts a volume so data written there survives the container being removed.', '-v name:/path একটি volume মাউন্ট করে যাতে সেখানে লেখা ডেটা container রিমুভ হলেও টিকে থাকে।'),
          l('--restart unless-stopped tells Docker to relaunch it after a crash or host reboot.', '--restart unless-stopped Docker-কে বলে একটি ক্র্যাশ বা হোস্ট রিবুটের পর একে আবার চালাতে।'),
        ] },
        { code: `docker run -d \\
  --name api \\
  -p 8080:3000 \\
  -e NODE_ENV=production \\
  -v api-data:/app/data \\
  --restart unless-stopped \\
  myorg/api:1.4`, caption: l('Detached, named, port-mapped (host 8080 → container 3000), configured by env, with a persistent volume and a restart policy — all in one command.', 'ডিটাচড, নামযুক্ত, port-ম্যাপড (হোস্ট 8080 → container 3000), env দিয়ে কনফিগার, একটি স্থায়ী volume ও একটি restart policy সহ—সব এক কমান্ডে।') },
      ],
    },
    {
      h: l('Key flags', 'মূল ফ্ল্যাগ'),
      blocks: [
        { table: {
          head: [l('Goal', 'লক্ষ্য'), l('Flag', 'ফ্ল্যাগ')],
          rows: [
            [l('Run detached (background)', 'ডিটাচড (ব্যাকগ্রাউন্ড)'), l('-d', '-d')],
            [l('Publish a port (host:container)', 'পোর্ট পাবলিশ (host:container)'), l('-p 8080:80', '-p 8080:80')],
            [l('Set an env var', 'env সেট করুন'), l('-e KEY=val', '-e KEY=val')],
            [l('Name the container', 'container নাম দিন'), l('--name web', '--name web')],
            [l('Mount a volume', 'volume মাউন্ট করুন'), l('-v vol:/data', '-v vol:/data')],
          ],
        } },
        { note: l('A quick starter to memorize: docker run -d -p 8080:80 --name web nginx runs nginx detached, reachable on host port 8080, under the name "web". Read -p as host:container, always.', 'মুখস্থ করার একটি দ্রুত শুরু: docker run -d -p 8080:80 --name web nginx nginx-কে ডিটাচড চালায়, হোস্ট port 8080-এ পৌঁছানোযোগ্য, "web" নামে। -p সবসময় host:container হিসেবে পড়ুন।'), kind: 'tip' },
      ],
    },
    {
      h: l('Detached vs interactive runs', 'ডিটাচড বনাম interactive run'),
      blocks: [
        { p: l('Beyond -d, the other run mode you will use constantly is interactive, built from -i and -t (usually written together as -it). -i keeps the container’s standard input open so you can type into it, and -t allocates a pseudo-terminal so the shell looks and behaves like a normal one. Together they let you drop into a container, poke around, and run commands by hand — the opposite of the fire-and-forget -d.', '-d ছাড়া, আপনি অবিরাম যে অন্য run mode ব্যবহার করবেন তা হলো interactive, -i ও -t দিয়ে তৈরি (সাধারণত একসঙ্গে -it লেখা)। -i container-এর standard input খোলা রাখে যাতে আপনি এতে টাইপ করতে পারেন, ও -t একটি pseudo-terminal বরাদ্দ করে যাতে shell একটি স্বাভাবিক shell-এর মতো দেখায় ও আচরণ করে। একসঙ্গে এরা আপনাকে একটি container-এ নামতে, ঘুরে দেখতে ও হাতে কমান্ড চালাতে দেয়—fire-and-forget -d-এর উল্টো।') },
        { p: l('Pair interactive runs with --rm for anything throwaway. --rm tells Docker to delete the container automatically the moment it exits, so a quick experiment or one-off script does not leave a stopped container behind to clean up later. A common pattern for exploring a base image is docker run -it --rm alpine sh: you get a shell inside a fresh Alpine container, and it vanishes cleanly when you type exit.', 'যেকোনো ফেলে-দেওয়া কিছুর জন্য interactive run-কে --rm-এর সঙ্গে জোড়া দিন। --rm Docker-কে বলে container বেরোনোর মুহূর্তে স্বয়ংক্রিয়ভাবে মুছতে, যাতে একটি দ্রুত পরীক্ষা বা এককালীন script পরে পরিষ্কার করার জন্য একটি থামানো container রেখে না যায়। একটি base image ঘাঁটার একটি সাধারণ প্যাটার্ন হলো docker run -it --rm alpine sh: আপনি একটি তাজা Alpine container-এর ভেতরে একটি shell পান, ও exit টাইপ করলে এটি পরিষ্কারভাবে মিলিয়ে যায়।') },
      ],
    },
    {
      h: l('When and where to use them', 'কখন ও কোথায় ব্যবহার করবেন'),
      blocks: [
        { p: l('Which flags you reach for depends on what the container is for. For a long-running service you almost always want -d, --name, -p, and --restart, plus -e and -v to configure and persist it. For an interactive session — poking around a base image or running a one-off script — you want -it and often --rm so the container is deleted the moment you exit and does not pile up. For a throwaway test you might add nothing but --rm.', 'আপনি কোন ফ্ল্যাগ নেবেন তা নির্ভর করে container কীসের জন্য। একটি দীর্ঘ-চলমান service-এর জন্য আপনি প্রায় সবসময় -d, --name, -p ও --restart চান, সঙ্গে কনফিগার ও স্থায়ী করতে -e ও -v। একটি interactive session-এর জন্য—একটি base image ঘাঁটা বা একটি এককালীন script চালানো—আপনি -it চান ও প্রায়ই --rm যাতে আপনি বেরোনোর মুহূর্তেই container মুছে যায় ও জমে না। একটি ফেলে-দেওয়া test-এর জন্য আপনি --rm ছাড়া কিছুই যোগ নাও করতে পারেন।') },
        { p: l('A practical habit is to keep the flag order and formatting consistent — image last, one flag per line with backslashes for anything non-trivial — because a long run command is exactly where subtle mistakes hide. Once a run line grows past four or five flags and needs to persist between machines or teammates, it is usually a sign to move it into a docker compose file, where the same options become readable, version-controlled YAML.', 'একটি ব্যবহারিক অভ্যাস হলো ফ্ল্যাগ ক্রম ও ফরম্যাটিং সামঞ্জস্যপূর্ণ রাখা—image শেষে, non-trivial কিছুর জন্য backslash সহ প্রতি লাইনে একটি ফ্ল্যাগ—কারণ একটি লম্বা run কমান্ড ঠিক সেখানেই সূক্ষ্ম ভুল লুকায়। একবার একটি run লাইন চার-পাঁচটি ফ্ল্যাগ ছাড়িয়ে বাড়লে ও মেশিন বা টিমমেটদের মধ্যে টিকতে হলে, সাধারণত এটি একটি docker compose ফাইলে সরানোর ইঙ্গিত, যেখানে একই অপশন পাঠযোগ্য, version-নিয়ন্ত্রিত YAML হয়।') },
      ],
    },
    {
      h: l('Common mistakes', 'সাধারণ ভুল'),
      blocks: [
        { list: [
          l('Forgetting -d, so the container attaches to your terminal and blocks it until you Ctrl-C (which may stop the container).', '-d ভুলে যাওয়া, ফলে container আপনার terminal-এ যুক্ত হয় ও Ctrl-C না করা পর্যন্ত আটকায় (যা container থামাতে পারে)।'),
          l('Reversing -p host:container as -p container:host, so the service is published on the wrong port and seems unreachable.', '-p host:container-কে -p container:host হিসেবে উল্টানো, ফলে service ভুল port-এ পাবলিশ হয় ও অপৌঁছানোযোগ্য মনে হয়।'),
          l('Writing one long, unreadable run line where a missing space or wrong flag is easy to overlook and hard to debug.', 'একটি লম্বা, অপাঠ্য run লাইন লেখা যেখানে একটি অনুপস্থিত স্পেস বা ভুল ফ্ল্যাগ সহজে চোখ এড়ায় ও ডিবাগ করা কঠিন।'),
          l('Putting secrets straight in -e on the command line, where they show up in shell history and docker inspect.', '-e-তে সরাসরি command line-এ secret রাখা, যেখানে সেগুলো shell history ও docker inspect-এ দেখা যায়।'),
        ] },
      ],
    },
    {
      h: l('Remember in one line', 'এক লাইনে মনে রাখুন'),
      blocks: [
        { list: [
          l('-d background, -p publish a port, -e set config, --name name it, -v mount data — flags dial in the behaviour.', '-d ব্যাকগ্রাউন্ড, -p port পাবলিশ, -e config সেট, --name নাম, -v ডেটা মাউন্ট—ফ্ল্যাগ আচরণ সেট করে।'),
          l('Always read -p as host:container, and always reach for -d for a service you do not want to block your terminal.', '-p সবসময় host:container হিসেবে পড়ুন, ও terminal আটকানো অবাঞ্ছিত একটি service-এর জন্য সবসময় -d নিন।'),
          l('When the run line grows long, move it into a docker compose file for readability and version control.', 'run লাইন লম্বা হলে, পাঠযোগ্যতা ও version control-এর জন্য একটি docker compose ফাইলে সরান।'),
        ] },
      ],
    },
  ],

  // ── dk-lifecycle · The container lifecycle ────────────────────────────────
  'dk-lifecycle': [
    {
      h: l('What is the container lifecycle?', 'কন্টেইনার লাইফসাইকেল কী?'),
      blocks: [
        { p: l('The container lifecycle is the set of states a container moves through from birth to deletion: it is created from an image, then started so it runs, can be stopped and started again, and is finally removed with docker rm. Understanding these states — and that they are distinct — is what stops Docker from feeling unpredictable. A container is not just "on" or "off"; it can exist in a stopped state, holding its filesystem changes, logs, name, and configuration, ready to run again or waiting to be deleted.', 'কন্টেইনার লাইফসাইকেল হলো একটি container জন্ম থেকে মোছা পর্যন্ত যে অবস্থাগুলোর মধ্য দিয়ে যায় তার সেট: এটি একটি image থেকে তৈরি হয়, তারপর চালু করা হয় যাতে চলে, থামানো ও আবার চালু করা যায়, ও শেষে docker rm দিয়ে রিমুভ করা হয়। এই অবস্থাগুলো বোঝা—এবং যে এগুলো আলাদা—তা Docker-কে অননুমেয় মনে হওয়া থেকে থামায়। একটি container শুধু "চালু" বা "বন্ধ" নয়; এটি একটি থামানো অবস্থায় থাকতে পারে, তার filesystem পরিবর্তন, log, নাম ও কনফিগারেশন ধরে, আবার চলতে প্রস্তুত বা মোছার অপেক্ষায়।') },
        { p: l('The problem this understanding solves is the surprise of "invisible" containers. Beginners run docker ps, see an empty list, and assume everything is gone — but docker ps only shows running containers. Stopped ones are still there, still holding their names and disk space, still blocking you from reusing a name. Knowing the lifecycle means knowing that "not running" is not the same as "does not exist," and that cleanup is a deliberate step, not something that happens automatically.', 'এই বোঝাপড়া যে সমস্যা সমাধান করে তা হলো "অদৃশ্য" container-এর চমক। নতুনরা docker ps চালায়, একটি খালি তালিকা দেখে, ও ধরে নেয় সব চলে গেছে—কিন্তু docker ps শুধু চলমান container দেখায়। থামানোগুলো এখনো সেখানে, এখনো তাদের নাম ও ডিস্ক জায়গা ধরে, এখনো আপনাকে একটি নাম পুনঃব্যবহার থেকে আটকে। লাইফসাইকেল জানা মানে জানা যে "চলছে না" মানে "নেই" নয়, ও পরিষ্কার করা একটি ইচ্ছাকৃত ধাপ, স্বয়ংক্রিয়ভাবে ঘটে এমন কিছু নয়।') },
        { note: l('Picture a machine you power on, pause partway, power on again, and only much later unplug and haul away. Between uses it is switched off but still sitting there taking up floor space — exactly like a stopped container.', 'একটি মেশিনের কথা ভাবুন যা আপনি চালু করেন, মাঝপথে থামান, আবার চালু করেন, ও অনেক পরে খুলে সরিয়ে ফেলেন। ব্যবহারের মধ্যে এটি বন্ধ কিন্তু এখনো সেখানে বসে জায়গা নিচ্ছে—ঠিক একটি থামানো container-এর মতো।'), kind: 'tip' },
      ],
    },
    {
      h: l('How a container moves through its states', 'একটি container কীভাবে তার অবস্থার মধ্য দিয়ে যায়'),
      blocks: [
        { p: l('docker run bundles two steps — create and start — into one, which is why beginners rarely see "created" on its own. From running, stop and start move a container back and forth, and rm ends its life. The commands below walk the full cycle.', 'docker run দুটি ধাপ—create ও start—একটিতে বাঁধে, এ কারণেই নতুনরা কদাচিৎ একা "created" দেখে। running থেকে, stop ও start একটি container-কে সামনে-পিছনে সরায়, ও rm এর জীবন শেষ করে। নিচের কমান্ড পূর্ণ চক্রটি হাঁটে।') },
        { steps: [
          l('Create + start: docker run makes a container from an image and starts it — it is now in the running state.', 'Create + start: docker run একটি image থেকে একটি container বানায় ও চালু করে—এটি এখন running অবস্থায়।'),
          l('Inspect: docker ps shows running containers; docker ps -a shows all of them, including stopped ones.', 'Inspect: docker ps চলমান container দেখায়; docker ps -a সব দেখায়, থামানোগুলোসহ।'),
          l('Stop: docker stop sends the process a shutdown signal and moves the container to the stopped (exited) state, keeping its data and logs.', 'Stop: docker stop process-কে একটি shutdown signal পাঠায় ও container-কে stopped (exited) অবস্থায় নেয়, তার ডেটা ও log রেখে।'),
          l('Start again: docker start relaunches the same stopped container with all its state intact — it is not a fresh container.', 'আবার start: docker start একই থামানো container-কে তার সব state অক্ষত রেখে আবার চালায়—এটি একটি নতুন container নয়।'),
          l('Remove: docker rm deletes a stopped container for good, freeing its name and disk. A running container must be stopped first (or forced with -f).', 'Remove: docker rm একটি থামানো container চিরতরে মোছে, এর নাম ও ডিস্ক মুক্ত করে। একটি চলমান container আগে থামাতে হবে (বা -f দিয়ে জোর করতে হবে)।'),
        ] },
        { code: `# create + start in one step, named "web"
docker run -d --name web nginx

docker ps            # shows "web" as running
docker ps -a         # shows ALL containers, running or stopped

# stop it — state, filesystem, and logs are kept
docker stop web

docker ps            # "web" is gone from here...
docker ps -a         # ...but still listed here as "Exited"

docker start web     # same container runs again, state intact

# finally delete it (must be stopped first)
docker stop web
docker rm web        # frees the name "web" and its disk`, caption: l('docker ps hides stopped containers; docker ps -a is how you see they still exist. rm is the only step that truly deletes one.', 'docker ps থামানো container লুকায়; docker ps -a হলো যেভাবে দেখেন এরা এখনো আছে। rm হলো একমাত্র ধাপ যা সত্যিই একটি মোছে।') },
      ],
    },
    {
      h: l('Key commands', 'মূল কমান্ড'),
      blocks: [
        { table: {
          head: [l('Goal', 'লক্ষ্য'), l('Command', 'কমান্ড')],
          rows: [
            [l('List all containers (incl. stopped)', 'সব container (থামানোসহ)'), l('docker ps -a', 'docker ps -a')],
            [l('Stop a running container', 'চলমান container থামান'), l('docker stop web', 'docker stop web')],
            [l('Start a stopped container again', 'থামানো container আবার চালু'), l('docker start web', 'docker start web')],
            [l('Remove a container', 'container রিমুভ করুন'), l('docker rm web', 'docker rm web')],
          ],
        } },
        { note: l('docker rm removes a container but not the image it ran from. To reclaim many stopped containers at once, docker container prune deletes every stopped container in one command.', 'docker rm একটি container রিমুভ করে কিন্তু যে image থেকে চলেছে তা নয়। একবারে অনেক থামানো container ফেরাতে, docker container prune এক কমান্ডে প্রতিটি থামানো container মোছে।'), kind: 'tip' },
      ],
    },
    {
      h: l('When and where it matters', 'কখন ও কোথায় গুরুত্বপূর্ণ'),
      blocks: [
        { p: l('The lifecycle matters most during development and debugging, when you start and stop containers constantly. The distinction between stop and rm is the key: stop pauses a container but preserves everything, so you can restart it and pick up where you left off, or inspect its logs and filesystem to understand a crash. rm throws all of that away. If a container is misbehaving and you want to keep the evidence, stop it and investigate; if you are truly done, rm it to reclaim the name and disk.', 'লাইফসাইকেল ডেভেলপমেন্ট ও ডিবাগিংয়ের সময় সবচেয়ে গুরুত্বপূর্ণ, যখন আপনি অবিরাম container চালু ও থামান। stop ও rm-এর মধ্যে পার্থক্যই মূল: stop একটি container থামায় কিন্তু সব সংরক্ষণ করে, তাই আপনি একে restart করে যেখানে ছেড়েছিলেন সেখান থেকে শুরু করতে পারেন, বা একটি ক্র্যাশ বুঝতে এর log ও filesystem inspect করতে পারেন। rm সেই সব ফেলে দেয়। একটি container ভুল আচরণ করছে ও আপনি প্রমাণ রাখতে চাইলে, এটি থামান ও তদন্ত করুন; সত্যিই শেষ হলে, নাম ও ডিস্ক ফেরাতে rm করুন।') },
        { p: l('It also matters for keeping a host tidy over time. Every docker run that you do not clean up leaves a container behind, and on a busy machine these quietly accumulate — dozens of exited containers holding disk and cluttering docker ps -a. Making cleanup a habit (or using --rm on throwaway runs so they self-delete) keeps the host healthy. In production, orchestrators and compose manage most of this lifecycle for you, but the same states and rules apply underneath.', 'একটি হোস্ট সময়ের সঙ্গে পরিপাটি রাখতেও এটি গুরুত্বপূর্ণ। প্রতিটি docker run যা আপনি পরিষ্কার করেন না তা একটি container রেখে যায়, ও একটি ব্যস্ত মেশিনে এগুলো নীরবে জমে—কয়েক ডজন exited container ডিস্ক ধরে ও docker ps -a এলোমেলো করে। পরিষ্কার করাকে একটি অভ্যাস করা (বা ফেলে-দেওয়া run-এ --rm ব্যবহার করা যাতে সেগুলো নিজে মোছে) হোস্ট সুস্থ রাখে। production-এ, orchestrator ও compose এই লাইফসাইকেলের বেশিরভাগ আপনার জন্য সামলায়, তবে একই অবস্থা ও নিয়ম নিচে প্রযোজ্য।') },
        { p: l('One more distinction worth holding onto: stopping and removing a container never touches the image it came from. docker rm web deletes the container instance, but the nginx image stays on disk, ready to spin up a fresh container instantly. This is why containers are meant to be disposable — you throw one away and start another from the same image without losing anything that lives in the image itself. Only data you deliberately put in a volume survives the container; everything in its writable layer goes when you rm it.', 'ধরে রাখার মতো আরেকটি পার্থক্য: একটি container থামানো ও রিমুভ করা কখনো যে image থেকে এসেছে তা ছোঁয় না। docker rm web container instance মোছে, তবে nginx image ডিস্কে থাকে, তাৎক্ষণিক একটি তাজা container চালু করতে প্রস্তুত। এ কারণেই container ফেলে-দেওয়া-যোগ্য হওয়ার কথা—আপনি একটি ফেলে দেন ও একই image থেকে আরেকটি শুরু করেন image-এর ভেতরে থাকা কিছু না হারিয়ে। শুধু আপনি ইচ্ছাকৃতভাবে একটি volume-এ রাখা ডেটা container টেকে; এর writable layer-এর সব rm করলে চলে যায়।') },
      ],
    },
    {
      h: l('Common mistakes', 'সাধারণ ভুল'),
      blocks: [
        { list: [
          l('Using only docker ps and thinking a container is gone, not realizing stopped containers still exist and hold names and disk.', 'শুধু docker ps ব্যবহার করে একটি container চলে গেছে ভাবা, না বুঝে যে থামানো container এখনো আছে ও নাম ও ডিস্ক ধরে।'),
          l('Trying to run a new container with a name that a stopped container already holds, hitting a "name already in use" error.', 'একটি নতুন container এমন নামে চালানোর চেষ্টা যা একটি থামানো container আগে থেকে ধরে আছে, একটি "name already in use" এরর পাওয়া।'),
          l('Confusing stop with rm — stopping when you meant to delete, so exited containers pile up and consume disk.', 'stop ও rm গুলিয়ে ফেলা—মুছতে চেয়ে থামানো, ফলে exited container জমে ও ডিস্ক খরচ করে।'),
          l('Running docker rm on a running container without stopping it first and being surprised it refuses (unless you add -f).', 'একটি চলমান container-এ আগে না থামিয়ে docker rm চালানো ও অবাক হওয়া কেন এটি প্রত্যাখ্যান করে (যদি না -f যোগ করেন)।'),
        ] },
      ],
    },
    {
      h: l('Remember in one line', 'এক লাইনে মনে রাখুন'),
      blocks: [
        { list: [
          l('Created → running → stopped → removed: a container has distinct states, and only rm truly deletes it.', 'Created → running → stopped → removed: একটি container-এর আলাদা অবস্থা আছে, ও শুধু rm সত্যিই একে মোছে।'),
          l('docker ps shows running; docker ps -a shows all — stopped containers still exist and hold names and disk.', 'docker ps চলমান দেখায়; docker ps -a সব দেখায়—থামানো container এখনো আছে ও নাম ও ডিস্ক ধরে।'),
          l('stop preserves state for debugging or restart; rm reclaims the name and disk — clean up so containers do not pile up.', 'stop ডিবাগ বা restart-এর জন্য state রাখে; rm নাম ও ডিস্ক ফেরায়—পরিষ্কার করুন যাতে container না জমে।'),
        ] },
      ],
    },
  ],

  // ── dk-exec-logs · Exec & logs ────────────────────────────────────────────
  'dk-exec-logs': [
    {
      h: l('What are docker logs and docker exec?', 'docker logs ও docker exec কী?'),
      blocks: [
        { p: l('docker logs and docker exec are the two commands you reach for when you need to see what a container is doing. docker logs shows you everything the container has printed to its standard output and standard error — the running record of what happened. docker exec goes further: it runs a new command inside an already-running container, most often an interactive shell, so you can look around its filesystem, check processes, and test things from the inside while it keeps running.', 'docker logs ও docker exec হলো সেই দুটি কমান্ড যা আপনি নেন যখন একটি container কী করছে দেখতে হয়। docker logs আপনাকে দেখায় container তার standard output ও standard error-এ যা প্রিন্ট করেছে তার সব—কী ঘটেছে তার চলমান রেকর্ড। docker exec আরও এগোয়: এটি একটি ইতিমধ্যে-চলমান container-এর ভেতরে একটি নতুন কমান্ড চালায়, প্রায়ই একটি interactive shell, যাতে আপনি এর filesystem ঘুরে দেখতে, process যাচাই করতে ও ভেতর থেকে জিনিস test করতে পারেন যখন এটি চলতে থাকে।') },
        { p: l('The problem they solve is visibility into a black box. A container has no window: you cannot double-click it to see what is happening inside. When a service will not respond, crashes on startup, or behaves strangely, these two commands are your primary tools — logs to read the error the app reported, and exec to step inside and investigate the live environment: is the config file there, is the port listening, can it reach the database?', 'এগুলো যে সমস্যা সমাধান করে তা হলো একটি black box-এ দৃশ্যমানতা। একটি container-এর কোনো জানালা নেই: ভেতরে কী ঘটছে দেখতে আপনি একে ডাবল-ক্লিক করতে পারেন না। যখন একটি service সাড়া দেয় না, শুরুতে ক্র্যাশ করে বা অদ্ভুত আচরণ করে, এই দুটি কমান্ড আপনার প্রধান টুল—অ্যাপ যে এরর রিপোর্ট করেছে তা পড়তে logs, ও লাইভ environment তদন্তে ভেতরে ঢুকতে exec: config ফাইল কি সেখানে, port কি listen করছে, এটি কি database-এ পৌঁছাতে পারে?') },
        { note: l('logs is reading the machine’s printout after the fact; exec is opening the panel and reaching inside with your own hands while the machine is still running.', 'logs হলো ঘটনার পর মেশিনের প্রিন্টআউট পড়া; exec হলো মেশিন চলা অবস্থায় প্যানেল খুলে নিজের হাতে ভেতরে পৌঁছানো।'), kind: 'tip' },
      ],
    },
    {
      h: l('How to use them to debug', 'ডিবাগে কীভাবে ব্যবহার করবেন'),
      blocks: [
        { p: l('A typical debugging pass starts with logs to find the error, then uses exec to get a shell and confirm the cause from inside. The -f flag on logs follows new output live; the -it flags on exec give you an interactive terminal.', 'একটি সাধারণ ডিবাগিং পাস logs দিয়ে শুরু হয় এরর খুঁজতে, তারপর exec ব্যবহার করে একটি shell পেতে ও ভেতর থেকে কারণ নিশ্চিত করতে। logs-এ -f ফ্ল্যাগ নতুন output লাইভ follow করে; exec-এ -it ফ্ল্যাগ আপনাকে একটি interactive terminal দেয়।') },
        { steps: [
          l('Read the recent output with docker logs <name> to see what the app printed, including any crash error.', 'docker logs <name> দিয়ে সাম্প্রতিক output পড়ুন অ্যাপ কী প্রিন্ট করেছে দেখতে, যেকোনো ক্র্যাশ এররসহ।'),
          l('Follow output live with docker logs -f <name> while you reproduce the problem, then press Ctrl-C to stop watching (the container keeps running).', 'docker logs -f <name> দিয়ে output লাইভ follow করুন যখন আপনি সমস্যা পুনরুৎপাদন করেন, তারপর দেখা থামাতে Ctrl-C চাপুন (container চলতে থাকে)।'),
          l('Open a shell inside with docker exec -it <name> sh (or bash) to explore the container’s live filesystem and environment.', 'docker exec -it <name> sh (বা bash) দিয়ে ভেতরে একটি shell খুলুন container-এর লাইভ filesystem ও environment ঘুরে দেখতে।'),
          l('Run a single check without a full session using docker exec <name> <command>, for example listing files or printing an env var.', 'docker exec <name> <command> দিয়ে একটি পূর্ণ session ছাড়া একটি যাচাই চালান, যেমন ফাইল তালিকা বা একটি env var প্রিন্ট।'),
          l('Fix the real cause in the image or config and rebuild — do not leave the fix only inside the running container.', 'image বা config-এ আসল কারণ ঠিক করে rebuild করুন—ফিক্স শুধু চলমান container-এর ভেতরে রাখবেন না।'),
        ] },
        { code: `# see everything the container has printed
docker logs web

# stream new output live; Ctrl-C only stops watching, not the container
docker logs -f web

# open an interactive shell inside a RUNNING container
docker exec -it web sh

# run a single one-off command without a shell session
docker exec web ls /app
docker exec web env`, caption: l('logs reads past output; exec runs a command inside the live container. Note exec needs the container to be running — for a stopped one, read its logs instead.', 'logs অতীত output পড়ে; exec লাইভ container-এর ভেতরে একটি কমান্ড চালায়। খেয়াল করুন exec-এর জন্য container চলমান থাকতে হবে—একটি থামানোটির জন্য বরং এর logs পড়ুন।') },
      ],
    },
    {
      h: l('Key commands', 'মূল কমান্ড'),
      blocks: [
        { table: {
          head: [l('Goal', 'লক্ষ্য'), l('Command', 'কমান্ড')],
          rows: [
            [l('View a container’s logs', 'container-এর log দেখুন'), l('docker logs web', 'docker logs web')],
            [l('Follow logs live', 'log লাইভ follow'), l('docker logs -f web', 'docker logs -f web')],
            [l('Open a shell inside', 'ভেতরে shell খুলুন'), l('docker exec -it web sh', 'docker exec -it web sh')],
            [l('Run one command inside', 'ভেতরে এক কমান্ড চালান'), l('docker exec web ls', 'docker exec web ls')],
          ],
        } },
        { p: l('On a chatty container the full log can be overwhelming, so two options narrow it down: docker logs --tail 50 web shows only the last 50 lines, and docker logs --since 10m web shows only output from the last ten minutes. You can combine either with -f to follow just the recent, relevant output rather than scrolling through the container’s entire history.', 'একটি বাচাল container-এ পূর্ণ log অভিভূত করতে পারে, তাই দুটি অপশন একে সংকীর্ণ করে: docker logs --tail 50 web শুধু শেষ ৫০ লাইন দেখায়, ও docker logs --since 10m web শুধু শেষ দশ মিনিটের output দেখায়। container-এর পুরো ইতিহাস স্ক্রল না করে শুধু সাম্প্রতিক, প্রাসঙ্গিক output follow করতে আপনি যেকোনোটিকে -f-এর সঙ্গে মেলাতে পারেন।') },
        { note: l('The -it in exec is two flags: -i keeps input open and -t allocates a terminal. Together they give you a usable interactive shell; drop them for a single non-interactive command like docker exec web ls.', 'exec-এ -it হলো দুটি ফ্ল্যাগ: -i input খোলা রাখে ও -t একটি terminal বরাদ্দ করে। একসঙ্গে এরা আপনাকে একটি ব্যবহারযোগ্য interactive shell দেয়; docker exec web ls-এর মতো একটি একক non-interactive কমান্ডে এদের বাদ দিন।'), kind: 'tip' },
      ],
    },
    {
      h: l('When and where to use them', 'কখন ও কোথায় ব্যবহার করবেন'),
      blocks: [
        { p: l('Reach for docker logs first, almost every time something is wrong — it is non-invasive and usually the fastest way to the answer, because most crashes print a clear error just before exiting. Use docker logs -f when you need to watch behaviour as it happens, for example tailing a request handler while you send it traffic. Because the app should log to stdout and stderr, docker logs is also how you sanity-check a container in staging or wire it into a log collector in production.', 'docker logs আগে নিন, প্রায় প্রতিবার কিছু ভুল হলে—এটি non-invasive ও সাধারণত উত্তরের দ্রুততম পথ, কারণ বেশিরভাগ ক্র্যাশ বেরোনোর ঠিক আগে একটি স্পষ্ট এরর প্রিন্ট করে। docker logs -f ব্যবহার করুন যখন আচরণ ঘটার সঙ্গে সঙ্গে দেখতে হয়, যেমন একটি request handler tail করা যখন আপনি এতে ট্রাফিক পাঠান। যেহেতু অ্যাপের stdout ও stderr-এ log করা উচিত, docker logs হলো staging-এ একটি container যাচাই বা production-এ একটি log collector-এ যুক্ত করারও উপায়।') },
        { p: l('Use docker exec when logs alone are not enough and you need to see the live state from inside — checking whether a file exists, an environment variable is set, a port is listening, or a database is reachable from that container. It is invaluable for debugging, but treat what you do inside as temporary: any file you edit or package you install in a running container vanishes the moment that container is recreated. Exec is for diagnosis; the real fix belongs in the Dockerfile or configuration so it survives a redeploy.', 'docker exec ব্যবহার করুন যখন শুধু logs যথেষ্ট নয় ও আপনার ভেতর থেকে লাইভ অবস্থা দেখতে হয়—একটি ফাইল আছে কি না, একটি environment variable সেট কি না, একটি port listen করছে কি না, বা সেই container থেকে একটি database পৌঁছানোযোগ্য কি না যাচাই করা। এটি ডিবাগিংয়ে অমূল্য, তবে ভেতরে যা করেন তা অস্থায়ী হিসেবে ধরুন: একটি চলমান container-এ আপনি যে ফাইল এডিট করেন বা package ইনস্টল করেন তা container পুনঃতৈরি হওয়ার মুহূর্তে হারায়। exec নির্ণয়ের জন্য; আসল ফিক্স Dockerfile বা কনফিগারেশনে থাকে যাতে এটি একটি redeploy টেকে।') },
      ],
    },
    {
      h: l('Common mistakes', 'সাধারণ ভুল'),
      blocks: [
        { list: [
          l('Fixing a problem by editing files inside a running container instead of the image, so the fix is lost on the next redeploy.', 'ইমেজের বদলে একটি চলমান container-এর ভেতরে ফাইল এডিট করে সমস্যা ঠিক করা, ফলে পরের redeploy-এ ফিক্স হারায়।'),
          l('Trying to docker exec into a stopped or crashed container — exec needs it running; read docker logs to see why it exited.', 'একটি থামানো বা ক্র্যাশ করা container-এ docker exec করার চেষ্টা—exec-এর জন্য এটি চলমান থাকতে হবে; কেন বেরিয়েছে দেখতে docker logs পড়ুন।'),
          l('Running docker exec -it web bash on a slim or alpine image that has no bash, then being confused — use sh instead.', 'bash নেই এমন একটি slim বা alpine image-এ docker exec -it web bash চালানো, তারপর বিভ্রান্ত হওয়া—বরং sh ব্যবহার করুন।'),
          l('Assuming Ctrl-C during docker logs -f stops the container — it only stops the live view; the container keeps running.', 'ধরে নেওয়া docker logs -f-এর সময় Ctrl-C container থামায়—এটি শুধু লাইভ ভিউ থামায়; container চলতে থাকে।'),
        ] },
      ],
    },
    {
      h: l('Remember in one line', 'এক লাইনে মনে রাখুন'),
      blocks: [
        { list: [
          l('docker logs reads what a container printed; docker exec runs a command (often a shell) inside a running one.', 'docker logs একটি container যা প্রিন্ট করেছে পড়ে; docker exec একটি চলমান container-এর ভেতরে একটি কমান্ড (প্রায়ই একটি shell) চালায়।'),
          l('Debug with docker logs -f to follow output, then docker exec -it name sh to look around inside.', 'ডিবাগে docker logs -f দিয়ে output follow, তারপর docker exec -it name sh দিয়ে ভেতরে দেখুন।'),
          l('Exec is for diagnosis only — edits inside a running container vanish on recreate, so fix the image, not the container.', 'exec শুধু নির্ণয়ের জন্য—চলমান container-এর ভেতরের এডিট পুনঃতৈরিতে হারায়, তাই container নয়, image ঠিক করুন।'),
        ] },
      ],
    },
  ],
}
