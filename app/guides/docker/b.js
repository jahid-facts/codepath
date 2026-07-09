// Deep, bilingual (English / Bangla) teaching guides for the Docker course —
// Images (tags, registries, inspection) & Dockerfiles (anatomy, instructions, cache).
// Shape mirrors app/course-guides.js and app/guides/git/a.js: each guide is an array of
// sections { h, blocks }, rendered by GuideBlock in app/LearningApp.js. Block types:
// { p }, { list }, { steps }, { table:{head,rows} }, { note, kind }, { code, caption }.
// Facts (definitions, analogies, commands, trade-offs, mistakes) come from app/courses/docker.js.

const l = (en, bn) => ({ en, bn })

export default {
  // ── dk-tags · Image tags & versions ───────────────────────────────────────
  'dk-tags': [
    {
      h: l('What is an image tag?', 'ইমেজ ট্যাগ কী?'),
      blocks: [
        { p: l('An image tag is a human-readable label attached to a specific version of a Docker image. A full image reference has two parts joined by a colon: the repository name and the tag, like nginx:1.25 or node:20-slim. The part before the colon (nginx) says which image; the part after (1.25) says which exact version of it you want. If you leave the tag off and just write nginx, Docker silently assumes the tag latest — so nginx and nginx:latest mean the same thing.', 'ইমেজ ট্যাগ হলো একটি Docker ইমেজের নির্দিষ্ট সংস্করণে লাগানো একটি মানুষ-পাঠযোগ্য লেবেল। একটি পূর্ণ ইমেজ রেফারেন্সে কোলন দিয়ে যুক্ত দুটি অংশ থাকে: repository নাম ও tag, যেমন nginx:1.25 বা node:20-slim। কোলনের আগের অংশ (nginx) বলে কোন ইমেজ; পরের অংশ (1.25) বলে ঠিক কোন সংস্করণ চান। ট্যাগ বাদ দিয়ে শুধু nginx লিখলে Docker নীরবে latest ট্যাগ ধরে নেয়—তাই nginx ও nginx:latest একই জিনিস।') },
        { p: l('The single most important thing to understand is that latest does not mean "the newest version." It is just an ordinary tag whose name happens to be the word "latest." Whoever publishes the image decides which build gets that label, and they can move it to a different build at any time. So the same command, docker pull nginx, can quietly give you a different image next week than it gave you today. Explicit tags like nginx:1.25 avoid that surprise because they point at one fixed build.', 'সবচেয়ে গুরুত্বপূর্ণ বিষয়টি হলো latest মানে "সর্বশেষ সংস্করণ" নয়। এটি শুধু একটি সাধারণ ট্যাগ যার নাম কাকতালীয়ভাবে "latest"। যে ইমেজ প্রকাশ করে সে-ই ঠিক করে কোন build এই লেবেল পাবে, এবং যেকোনো সময় তা অন্য build-এ সরাতে পারে। তাই একই কমান্ড docker pull nginx আজ যা দেয় আগামী সপ্তাহে নীরবে অন্য একটি ইমেজ দিতে পারে। nginx:1.25-এর মতো স্পষ্ট ট্যাগ এই চমক এড়ায়, কারণ তা একটি নির্দিষ্ট build-এ নির্দেশ করে।') },
        { note: l('Think of version stickers on jars in a pantry. "v1.25" is an exact sticker that always marks the same jar. "latest" is whichever jar someone last slapped the sticker on — useful, but it can move to a new jar without telling you.', 'প্যান্ট্রিতে জারে লাগানো ভার্সন স্টিকার ভাবুন। "v1.25" একটি নির্দিষ্ট স্টিকার যা সবসময় একই জার চিহ্নিত করে। "latest" হলো যে জারে কেউ শেষবার স্টিকারটি লাগিয়েছে—কাজের, তবে তা না জানিয়ে নতুন জারে সরে যেতে পারে।'), kind: 'tip' },
      ],
    },
    {
      h: l('How tagging works, step by step', 'ট্যাগিং কীভাবে কাজ করে, ধাপে ধাপে'),
      blocks: [
        { steps: [
          l('You build or pull an image. It gets an image ID (a long hash) that never changes, plus zero or more tags that point at that ID.', 'আপনি একটি ইমেজ build বা pull করেন। এটি একটি image ID (একটি লম্বা hash) পায় যা কখনো বদলায় না, সঙ্গে শূন্য বা তার বেশি ট্যাগ যা সেই ID-তে নির্দেশ করে।'),
          l('You add a friendly tag with docker tag, giving the same underlying image a new name or version label.', 'docker tag দিয়ে একটি সুবিধাজনক ট্যাগ যোগ করেন, একই অন্তর্নিহিত ইমেজকে নতুন নাম বা ভার্সন লেবেল দেন।'),
          l('When you run a container, you name the exact tag you want, for example docker run nginx:1.25, and Docker resolves that tag to its image ID.', 'কন্টেইনার চালানোর সময় আপনি ঠিক যে ট্যাগ চান তার নাম দেন, যেমন docker run nginx:1.25, আর Docker সেই ট্যাগকে তার image ID-তে রিজলভ করে।'),
          l('You can list what you have with docker images to see every repository:tag pair on your machine.', 'docker images দিয়ে দেখতে পারেন আপনার মেশিনে থাকা প্রতিটি repository:tag জোড়া।'),
          l('When a tag is no longer needed you remove it with docker rmi; if it was the last tag pointing at an image, the image data is freed too.', 'একটি ট্যাগ আর দরকার না হলে docker rmi দিয়ে সরান; সেটি যদি ইমেজে নির্দেশ করা শেষ ট্যাগ হয়, ইমেজ ডেটাও মুক্ত হয়।'),
        ] },
        { code: `# Give a built image a version tag (same image, new label)
docker tag app app:1.0

# Run a specific, pinned version instead of "latest"
docker run nginx:1.25

# See every repository:tag you have locally
docker images

# Remove a tag (and the image if it was the last tag)
docker rmi app:1.0`, caption: l('docker tag never copies the image — it only adds another name that points at the same image ID.', 'docker tag কখনো ইমেজ কপি করে না—এটি শুধু একই image ID-তে নির্দেশ করা আরেকটি নাম যোগ করে।') },
      ],
    },
    {
      h: l('Key tag commands', 'মূল ট্যাগ কমান্ড'),
      blocks: [
        { table: {
          head: [l('Goal', 'লক্ষ্য'), l('Command', 'কমান্ড')],
          rows: [
            [l('Tag an image', 'ইমেজ ট্যাগ করুন'), l('docker tag app app:1.0', 'docker tag app app:1.0')],
            [l('Run a pinned version', 'পিন করা সংস্করণ চালান'), l('docker run nginx:1.25', 'docker run nginx:1.25')],
            [l('List local images', 'লোকাল ইমেজ দেখুন'), l('docker images', 'docker images')],
            [l('Remove an image', 'ইমেজ রিমুভ করুন'), l('docker rmi app:1.0', 'docker rmi app:1.0')],
          ],
        } },
        { note: l('One image can wear many tags at once. After docker tag app app:1.0, the tags app:latest and app:1.0 point at the exact same bytes — docker images shows two rows with an identical IMAGE ID.', 'একটি ইমেজ একসঙ্গে অনেক ট্যাগ পরতে পারে। docker tag app app:1.0-এর পর app:latest ও app:1.0 ট্যাগ দুটি ঠিক একই bytes-এ নির্দেশ করে—docker images একই IMAGE ID-সহ দুটি রো দেখায়।'), kind: 'tip' },
      ],
    },
    {
      h: l('Tags vs digests — the truly immutable reference', 'ট্যাগ বনাম digest—সত্যিকারের অপরিবর্তনীয় রেফারেন্স'),
      blocks: [
        { p: l('Even a version tag like 1.25 can technically be re-pushed to point at a rebuilt image, so a tag is a movable label, not a fingerprint. When you need an absolutely fixed reference — for example in production or in a security-sensitive build — you can pin by digest instead: an image@sha256:... reference that is computed from the image content itself and can never point anywhere else. Tags are for humans; digests are for guarantees.', 'এমনকি 1.25-এর মতো একটি ভার্সন ট্যাগও প্রযুক্তিগতভাবে একটি রিবিল্ড করা ইমেজে নির্দেশ করতে আবার push করা যায়, তাই ট্যাগ একটি সরানো-যোগ্য লেবেল, fingerprint নয়। যখন একেবারে নির্দিষ্ট রেফারেন্স দরকার—যেমন production-এ বা নিরাপত্তা-সংবেদনশীল build-এ—তখন digest দিয়ে pin করতে পারেন: একটি image@sha256:... রেফারেন্স যা ইমেজের বিষয়বস্তু থেকে গণনা করা হয় ও কখনো অন্য কোথাও নির্দেশ করতে পারে না। ট্যাগ মানুষের জন্য; digest নিশ্চয়তার জন্য।') },
        { table: {
          head: [l('Reference', 'রেফারেন্স'), l('Example', 'উদাহরণ'), l('Can it move?', 'সরতে পারে?')],
          rows: [
            [l('latest tag', 'latest ট্যাগ'), l('nginx', 'nginx'), l('Yes — changes whenever the publisher moves it', 'হ্যাঁ—প্রকাশক সরালেই বদলায়')],
            [l('Version tag', 'ভার্সন ট্যাগ'), l('nginx:1.25', 'nginx:1.25'), l('Rarely, but technically yes', 'কদাচিৎ, তবে প্রযুক্তিগতভাবে হ্যাঁ')],
            [l('Digest', 'Digest'), l('nginx@sha256:…', 'nginx@sha256:…'), l('Never — tied to exact content', 'কখনো নয়—নির্দিষ্ট বিষয়বস্তুর সঙ্গে বাঁধা')],
          ],
        } },
      ],
    },
    {
      h: l('When and where to pin tags', 'কখন ও কোথায় ট্যাগ পিন করবেন'),
      blocks: [
        { p: l('Use explicit, pinned tags anywhere a build must be reproducible: in production deployments, in your Dockerfile FROM line, and in CI pipelines. If your Dockerfile starts with FROM node:20-slim instead of FROM node, then everyone who builds it — you, a teammate, the CI server next month — starts from the same base and gets the same result. Pinning is what turns "it works on my machine" into "it works everywhere," because there is no hidden variable silently changing under you.', 'যেখানে একটি build পুনরুৎপাদনযোগ্য হতে হবে সেখানে স্পষ্ট, পিন করা ট্যাগ ব্যবহার করুন: production ডিপ্লয়মেন্টে, আপনার Dockerfile-এর FROM লাইনে, ও CI পাইপলাইনে। Dockerfile যদি FROM node-এর বদলে FROM node:20-slim দিয়ে শুরু হয়, তাহলে যে-ই এটি build করুক—আপনি, একজন টিমমেট, পরের মাসের CI সার্ভার—সবাই একই base থেকে শুরু করে ও একই ফল পায়। পিন করাই "আমার মেশিনে চলে"-কে "সব জায়গায় চলে"-তে বদলায়, কারণ নীরবে বদলানো কোনো লুকানো ভ্যারিয়েবল থাকে না।') },
        { p: l('The looser latest tag is fine for a quick experiment or a throwaway demo where you genuinely want whatever the newest build happens to be and do not care about repeatability. A good middle ground is your own release scheme: tag your app image with a version number or the Git commit SHA on every build, so each deploy is traceable and you can roll back to an exact, known image if something breaks.', 'ঢিলেঢালা latest ট্যাগ একটি দ্রুত পরীক্ষা বা ফেলে-দেওয়া demo-তে ঠিক আছে যেখানে আপনি সত্যিই সর্বশেষ যে build তা-ই চান ও পুনরাবৃত্তি নিয়ে ভাবেন না। একটি ভালো মধ্যপথ হলো নিজের release স্কিম: প্রতিটি build-এ আপনার অ্যাপ ইমেজকে একটি ভার্সন নম্বর বা Git commit SHA দিয়ে ট্যাগ করুন, যাতে প্রতিটি ডিপ্লয় ট্রেসযোগ্য হয় ও কিছু ভাঙলে একটি নির্দিষ্ট, জানা ইমেজে রোলব্যাক করতে পারেন।') },
      ],
    },
    {
      h: l('Common mistakes', 'সাধারণ ভুল'),
      blocks: [
        { list: [
          l('Deploying image:latest to production and getting a different, untested version on the next pull — the classic cause of "it worked yesterday."', 'production-এ image:latest ডিপ্লয় করা ও পরের pull-এ একটি ভিন্ন, অপরীক্ষিত সংস্করণ পাওয়া—"গতকাল তো চলছিল"-এর ক্লাসিক কারণ।'),
          l('Believing latest means "newest." It is just a label the publisher can point at any build, old or new.', 'latest মানে "সর্বশেষ" ভাবা। এটি শুধু একটি লেবেল যা প্রকাশক পুরনো বা নতুন যেকোনো build-এ নির্দেশ করতে পারে।'),
          l('Thinking docker tag makes a copy. It only adds another name to the same image, so editing one "copy" is impossible — there is just one image.', 'ভাবা docker tag একটি কপি বানায়। এটি শুধু একই ইমেজে আরেকটি নাম যোগ করে, তাই এক "কপি" এডিট করা অসম্ভব—একটিই ইমেজ আছে।'),
          l('Reusing the same tag (like app:1.0) for two different builds, so nobody can tell which code a running container actually contains.', 'একই ট্যাগ (যেমন app:1.0) দুটি ভিন্ন build-এ পুনঃব্যবহার করা, ফলে চলমান কন্টেইনারে আসলে কোন কোড আছে কেউ বলতে পারে না।'),
        ] },
      ],
    },
    {
      h: l('Remember in one line', 'এক লাইনে মনে রাখুন'),
      blocks: [
        { list: [
          l('A tag is a movable label on an image; repository:tag (like nginx:1.25) names the exact version you want.', 'ট্যাগ একটি ইমেজে সরানো-যোগ্য লেবেল; repository:tag (যেমন nginx:1.25) আপনার চাওয়া নির্দিষ্ট সংস্করণ নাম দেয়।'),
          l('latest is not "newest" — it is just a tag the publisher can move at any time.', 'latest মানে "সর্বশেষ" নয়—এটি শুধু একটি ট্যাগ যা প্রকাশক যেকোনো সময় সরাতে পারে।'),
          l('Pin explicit tags (or a digest) for anything reproducible; save latest for throwaway experiments.', 'পুনরুৎপাদনযোগ্য যেকোনো কিছুতে স্পষ্ট ট্যাগ (বা digest) পিন করুন; latest ফেলে-দেওয়া পরীক্ষার জন্য রাখুন।'),
        ] },
      ],
    },
  ],

  // ── dk-registry · Registries & Docker Hub ─────────────────────────────────
  'dk-registry': [
    {
      h: l('What is a registry?', 'রেজিস্ট্রি কী?'),
      blocks: [
        { p: l('A registry is a server that stores and distributes Docker images. It is to images what a package repository (npm, PyPI) is to libraries: a central place where images are uploaded, versioned by tag, and downloaded on demand. Docker Hub is the default public registry — when you run docker pull nginx, Docker fetches it from Docker Hub without you saying so. Other registries exist too: GitHub Container Registry (ghcr.io), Amazon ECR, Google Artifact Registry, and self-hosted ones for private company images.', 'রেজিস্ট্রি হলো একটি সার্ভার যা Docker ইমেজ সংরক্ষণ ও বিতরণ করে। ইমেজের কাছে এটি যা, লাইব্রেরির কাছে একটি package repository (npm, PyPI) তা-ই: একটি কেন্দ্রীয় জায়গা যেখানে ইমেজ আপলোড হয়, ট্যাগ দিয়ে ভার্সন হয়, ও দরকারমতো ডাউনলোড হয়। Docker Hub হলো ডিফল্ট পাবলিক রেজিস্ট্রি—docker pull nginx চালালে Docker না বললেও Docker Hub থেকে তা আনে। অন্য রেজিস্ট্রিও আছে: GitHub Container Registry (ghcr.io), Amazon ECR, Google Artifact Registry, ও প্রাইভেট কোম্পানি ইমেজের জন্য নিজে-হোস্ট করা রেজিস্ট্রি।') },
        { p: l('The core job of a registry is sharing. Without one, an image would live only on the machine that built it, and moving it elsewhere would mean exporting a tar file and copying it by hand. A registry replaces that with two simple verbs: docker push uploads your image, and docker pull downloads someone else’s. That is how a base image someone built once ends up running on millions of machines.', 'রেজিস্ট্রির মূল কাজ হলো শেয়ারিং। এটি ছাড়া একটি ইমেজ শুধু যে মেশিন এটি build করেছে সেখানেই থাকত, আর অন্য কোথাও নিতে হলে একটি tar ফাইল export করে হাতে কপি করতে হতো। রেজিস্ট্রি সেটিকে দুটি সরল ক্রিয়ায় বদলায়: docker push আপনার ইমেজ আপলোড করে, ও docker pull অন্যের ইমেজ ডাউনলোড করে। এভাবেই কারো একবার build করা একটি base ইমেজ লক্ষ লক্ষ মেশিনে চলতে শুরু করে।') },
        { note: l('Think of a registry as an app store for images: publish yours so others can install it with one command, and install theirs the same way. Docker Hub is the big public store; private registries are your company’s internal store.', 'রেজিস্ট্রিকে ইমেজের জন্য একটি অ্যাপ স্টোর ভাবুন: আপনারটি প্রকাশ করুন যাতে অন্যরা এক কমান্ডে ইনস্টল করতে পারে, ও তাদেরটি একইভাবে ইনস্টল করুন। Docker Hub হলো বড় পাবলিক স্টোর; প্রাইভেট রেজিস্ট্রি হলো আপনার কোম্পানির অভ্যন্তরীণ স্টোর।'), kind: 'tip' },
      ],
    },
    {
      h: l('How push and pull work, step by step', 'push ও pull কীভাবে কাজ করে, ধাপে ধাপে'),
      blocks: [
        { steps: [
          l('You authenticate to the registry once with docker login, so it knows you are allowed to push.', 'docker login দিয়ে একবার রেজিস্ট্রিতে authenticate করেন, যাতে এটি জানে আপনি push করার অনুমতিপ্রাপ্ত।'),
          l('You tag your image with the registry’s naming scheme — usually your username or organization, then the image name and version.', 'রেজিস্ট্রির নামকরণ স্কিম দিয়ে ইমেজ ট্যাগ করেন—সাধারণত আপনার username বা organization, তারপর ইমেজ নাম ও ভার্সন।'),
          l('You run docker push, which uploads the image layers the registry does not already have.', 'docker push চালান, যা রেজিস্ট্রিতে আগে থেকে না থাকা লেয়ারগুলো আপলোড করে।'),
          l('On another machine, docker pull downloads those layers, and docker run starts a container from the pulled image.', 'অন্য মেশিনে docker pull সেই লেয়ার নামায়, ও docker run নামানো ইমেজ থেকে একটি কন্টেইনার চালু করে।'),
          l('Because layers are content-addressed, only new or changed layers move over the network — shared base layers are reused, not re-downloaded.', 'লেয়ার content-addressed হওয়ায় শুধু নতুন বা বদলানো লেয়ার নেটওয়ার্কে যায়—শেয়ার্ড base লেয়ার পুনঃব্যবহৃত হয়, আবার ডাউনলোড হয় না।'),
        ] },
        { code: `# 1. Sign in to the registry (Docker Hub by default)
docker login

# 2. Tag your local image with your namespace and a version
docker tag app myorg/app:1.0

# 3. Upload it so others (and your servers) can pull it
docker push myorg/app:1.0

# 4. Anywhere else, download and run that exact image
docker pull myorg/app:1.0
docker run -d myorg/app:1.0`, caption: l('The image name myorg/app:1.0 tells Docker the namespace (myorg), the repository (app), and the tag (1.0) to push to and pull from.', 'ইমেজ নাম myorg/app:1.0 Docker-কে বলে কোন namespace (myorg), repository (app) ও tag (1.0)-এ push ও pull করতে হবে।') },
      ],
    },
    {
      h: l('Key registry commands', 'মূল রেজিস্ট্রি কমান্ড'),
      blocks: [
        { table: {
          head: [l('Goal', 'লক্ষ্য'), l('Command', 'কমান্ড')],
          rows: [
            [l('Sign in to a registry', 'রেজিস্ট্রিতে সাইন ইন'), l('docker login', 'docker login')],
            [l('Name an image for a registry', 'রেজিস্ট্রির জন্য নাম দিন'), l('docker tag app myorg/app:1.0', 'docker tag app myorg/app:1.0')],
            [l('Upload an image', 'ইমেজ আপলোড'), l('docker push myorg/app:1.0', 'docker push myorg/app:1.0')],
            [l('Download an image', 'ইমেজ ডাউনলোড'), l('docker pull nginx:1.25', 'docker pull nginx:1.25')],
          ],
        } },
        { note: l('To push somewhere other than Docker Hub, put the registry host in the name, for example docker tag app ghcr.io/you/app:1.0. No host prefix means Docker Hub.', 'Docker Hub ছাড়া অন্য কোথাও push করতে নামে রেজিস্ট্রি host দিন, যেমন docker tag app ghcr.io/you/app:1.0। কোনো host উপসর্গ না থাকলে তা Docker Hub।'), kind: 'tip' },
      ],
    },
    {
      h: l('Public vs private registries', 'পাবলিক বনাম প্রাইভেট রেজিস্ট্রি'),
      blocks: [
        { p: l('Registries come in two flavours, and most teams use both. Public registries like Docker Hub host official base images (nginx, node, postgres) and open-source projects anyone can pull. Private registries hold your proprietary application images, gated behind authentication so only your team and your servers can pull them. A typical setup pulls its base image from a public registry and pushes the finished app image to a private one.', 'রেজিস্ট্রি দুই ধরনের, আর বেশিরভাগ টিম দুটোই ব্যবহার করে। Docker Hub-এর মতো পাবলিক রেজিস্ট্রি অফিসিয়াল base ইমেজ (nginx, node, postgres) ও ওপেন-সোর্স প্রকল্প হোস্ট করে যা যে কেউ pull করতে পারে। প্রাইভেট রেজিস্ট্রি আপনার মালিকানা অ্যাপ্লিকেশন ইমেজ রাখে, authentication-এর পেছনে আটকে যাতে শুধু আপনার টিম ও সার্ভার pull করতে পারে। সাধারণ সেটআপে base ইমেজ একটি পাবলিক রেজিস্ট্রি থেকে pull হয় ও তৈরি অ্যাপ ইমেজ একটি প্রাইভেটে push হয়।') },
        { table: {
          head: [l('Aspect', 'দিক'), l('Public (Docker Hub)', 'পাবলিক (Docker Hub)'), l('Private (ECR, ghcr, self-hosted)', 'প্রাইভেট (ECR, ghcr, নিজে-হোস্ট)')],
          rows: [
            [l('Who can pull', 'কে pull করতে পারে'), l('Anyone', 'যে কেউ'), l('Only authenticated users', 'শুধু authenticate করা ব্যবহারকারী')],
            [l('Best for', 'কার জন্য'), l('Base images, open-source', 'base ইমেজ, ওপেন-সোর্স'), l('Proprietary app images', 'মালিকানা অ্যাপ ইমেজ')],
            [l('Login needed to pull?', 'pull-এ login লাগে?'), l('No (for public images)', 'না (পাবলিক ইমেজে)'), l('Yes', 'হ্যাঁ')],
          ],
        } },
      ],
    },
    {
      h: l('Where registries fit, and the security angle', 'রেজিস্ট্রি কোথায় খাপ খায়, ও নিরাপত্তার দিক'),
      blocks: [
        { p: l('Registries sit at the heart of every deployment pipeline. In CI/CD, a build server builds your image, tags it (often by Git commit SHA so every deploy is traceable), and pushes it to a registry; your production servers then pull that exact image and run it. This is how the thing you tested is provably the same thing you ship — the registry is the single source of truth that both CI and production agree on. It is also what lets you roll back instantly: because every past build still sits in the registry under its own tag, recovering from a bad release is just pulling and running the previous tag.', 'রেজিস্ট্রি প্রতিটি ডিপ্লয়মেন্ট পাইপলাইনের কেন্দ্রে বসে। CI/CD-তে একটি build সার্ভার আপনার ইমেজ build করে, ট্যাগ দেয় (প্রায়ই Git commit SHA দিয়ে যাতে প্রতিটি ডিপ্লয় ট্রেসযোগ্য হয়), ও একটি রেজিস্ট্রিতে push করে; তারপর আপনার production সার্ভার সেই নির্দিষ্ট ইমেজ pull করে চালায়। এভাবেই আপনি যা টেস্ট করেছেন তা প্রমাণসহ ঠিক সেই জিনিস যা ship করছেন—রেজিস্ট্রি একটিমাত্র সত্যের উৎস যা CI ও production দুজনই মানে। এটিই তাৎক্ষণিক রোলব্যাকও সম্ভব করে: প্রতিটি পুরনো build এখনো রেজিস্ট্রিতে নিজের ট্যাগে থাকে বলে, একটি খারাপ release থেকে ফিরে আসা মানে আগের ট্যাগটি pull করে চালানো।') },
        { p: l('Which registry you reach for depends on what the image is for. Base images and open-source tools come from public registries like Docker Hub, usually with no login at all. Your own application images — which may bundle proprietary code — belong in a private registry gated behind authentication, whether that is Docker Hub private repos, a cloud provider’s registry (ECR, Artifact Registry), or one you host yourself. Many teams also mirror or cache public images internally so that a Docker Hub rate limit or outage never blocks a deploy.', 'কোন রেজিস্ট্রি নেবেন তা নির্ভর করে ইমেজটি কীসের জন্য। base ইমেজ ও ওপেন-সোর্স টুল Docker Hub-এর মতো পাবলিক রেজিস্ট্রি থেকে আসে, সাধারণত কোনো login ছাড়াই। আপনার নিজের অ্যাপ্লিকেশন ইমেজ—যা মালিকানা কোড বহন করতে পারে—authentication-এর পেছনে একটি প্রাইভেট রেজিস্ট্রিতে থাকে, তা Docker Hub প্রাইভেট repo হোক, একটি cloud provider-এর রেজিস্ট্রি (ECR, Artifact Registry) হোক, বা নিজে হোস্ট করা একটি। অনেক টিম পাবলিক ইমেজ অভ্যন্তরীণভাবে mirror বা cache-ও করে যাতে একটি Docker Hub rate limit বা outage কখনো একটি ডিপ্লয় আটকে না দেয়।') },
        { note: l('Pulling untrusted images is a real risk: a random unofficial image can carry vulnerabilities or malware, and running it with full access can compromise your host. Prefer official or verified images, pin versions, and scan images before trusting them.', 'অবিশ্বস্ত ইমেজ pull করা সত্যিকারের ঝুঁকি: একটি এলোমেলো অনানুষ্ঠানিক ইমেজ দুর্বলতা বা ম্যালওয়্যার বহন করতে পারে, আর পূর্ণ অ্যাক্সেসে চালালে হোস্ট আপস হতে পারে। অফিসিয়াল বা verified ইমেজ নিন, ভার্সন পিন করুন, ও বিশ্বাস করার আগে ইমেজ scan করুন।'), kind: 'warn' },
      ],
    },
    {
      h: l('Common mistakes', 'সাধারণ ভুল'),
      blocks: [
        { list: [
          l('Pulling a random unofficial image and running it with full access without ever checking its contents or source.', 'একটি এলোমেলো অনানুষ্ঠানিক ইমেজ pull করে বিষয়বস্তু বা উৎস না দেখেই পূর্ণ অ্যাক্সেসে চালানো।'),
          l('Forgetting to tag with your namespace before pushing, so docker push cannot tell which repository to upload to.', 'push-এর আগে namespace দিয়ে ট্যাগ করতে ভুলে যাওয়া, ফলে docker push বুঝতে পারে না কোন repository-তে আপলোড করবে।'),
          l('Pushing a private application image to a public repository by accident, leaking proprietary code or secrets baked into it.', 'ভুল করে একটি প্রাইভেট অ্যাপ ইমেজ পাবলিক repository-তে push করা, মালিকানা কোড বা ভেতরে বেক করা সিক্রেট ফাঁস করা।'),
          l('Assuming an image is safe just because it pulled successfully — a successful pull says nothing about what is inside.', 'ইমেজ সফলভাবে pull হয়েছে বলেই নিরাপদ ভাবা—সফল pull ভেতরে কী আছে সে সম্পর্কে কিছুই বলে না।'),
        ] },
      ],
    },
    {
      h: l('Remember in one line', 'এক লাইনে মনে রাখুন'),
      blocks: [
        { list: [
          l('A registry stores and distributes images; docker push uploads yours, docker pull downloads others.', 'রেজিস্ট্রি ইমেজ সংরক্ষণ ও বিতরণ করে; docker push আপনারটি তোলে, docker pull অন্যেরটি নামায়।'),
          l('Docker Hub is the default public registry; use a private one for proprietary images.', 'Docker Hub হলো ডিফল্ট পাবলিক রেজিস্ট্রি; মালিকানা ইমেজে একটি প্রাইভেট নিন।'),
          l('Tag with your namespace before pushing, and never trust an untrusted image just because it pulled.', 'push-এর আগে namespace দিয়ে ট্যাগ করুন, আর pull হয়েছে বলেই অবিশ্বস্ত ইমেজ বিশ্বাস করবেন না।'),
        ] },
      ],
    },
  ],

  // ── dk-inspect · Inspecting & cleaning up images ──────────────────────────
  'dk-inspect': [
    {
      h: l('What is inspecting and cleaning up?', 'পরিদর্শন ও পরিষ্কার কী?'),
      blocks: [
        { p: l('Over time, building and pulling images quietly fills your disk. Every build leaves behind old layers, every pull adds an image, and stopped containers keep their writable layers around. Inspecting means looking at what you actually have and what it is costing you; cleaning up means reclaiming the space taken by things you no longer need. Three commands cover almost everything: docker images lists what you have, docker inspect shows the details of one image, and docker image prune reclaims disk space.', 'সময়ের সঙ্গে ইমেজ build ও pull করা নীরবে আপনার ডিস্ক ভরে ফেলে। প্রতিটি build পুরনো লেয়ার রেখে যায়, প্রতিটি pull একটি ইমেজ যোগ করে, আর থামানো কন্টেইনার তাদের লেখনযোগ্য লেয়ার ধরে রাখে। পরিদর্শন মানে আপনার আসলে কী আছে ও তার খরচ কত দেখা; পরিষ্কার মানে আর দরকার নেই এমন জিনিসের নেওয়া জায়গা ফিরিয়ে আনা। তিনটি কমান্ড প্রায় সবকিছু ঢাকে: docker images যা আছে তালিকা করে, docker inspect একটি ইমেজের বিস্তারিত দেখায়, ও docker image prune ডিস্ক জায়গা ফিরিয়ে আনে।') },
        { p: l('This matters because Docker never cleans up automatically. It optimizes for speed — keeping layers cached so the next build is fast — which means it errs on the side of keeping everything. On a busy development machine or a CI host, images and dead containers can silently grow to tens of gigabytes until a build fails with "no space left on device." Knowing how to inspect and prune is basic Docker hygiene.', 'এটি গুরুত্বপূর্ণ কারণ Docker কখনো স্বয়ংক্রিয়ভাবে পরিষ্কার করে না। এটি গতির জন্য optimize করে—লেয়ার cached রাখে যাতে পরের build দ্রুত হয়—মানে এটি সবকিছু রাখার দিকেই ঝোঁকে। একটি ব্যস্ত ডেভেলপমেন্ট মেশিন বা CI হোস্টে ইমেজ ও মৃত কন্টেইনার নীরবে দশ গিগাবাইট পর্যন্ত বাড়তে পারে যতক্ষণ না একটি build "no space left on device" দিয়ে ব্যর্থ হয়। পরিদর্শন ও prune জানা মৌলিক Docker স্বাস্থ্যবিধি।') },
        { note: l('Think of it as a pantry audit: see what is on the shelves (docker images), read each label to know what it is (docker inspect), and throw out what is expired or unused (docker image prune) before the shelves overflow.', 'এটিকে একটি প্যান্ট্রি অডিট ভাবুন: তাকে কী আছে দেখুন (docker images), প্রতিটি লেবেল পড়ে জানুন এটি কী (docker inspect), ও তাক উপচে পড়ার আগে মেয়াদোত্তীর্ণ বা অব্যবহৃত ফেলে দিন (docker image prune)।'), kind: 'tip' },
      ],
    },
    {
      h: l('How to inspect and clean, step by step', 'পরিদর্শন ও পরিষ্কার কীভাবে, ধাপে ধাপে'),
      blocks: [
        { steps: [
          l('List your images with docker images to see repository, tag, image ID, age, and size.', 'docker images দিয়ে ইমেজ তালিকা করুন—repository, tag, image ID, বয়স ও size দেখতে।'),
          l('Check overall disk usage with docker system df, which breaks down space by images, containers, and volumes and shows how much is reclaimable.', 'docker system df দিয়ে সামগ্রিক ডিস্ক ব্যবহার দেখুন, যা ইমেজ, কন্টেইনার ও ভলিউম অনুযায়ী জায়গা ভাগ করে ও কতটা reclaimable দেখায়।'),
          l('Dig into one image with docker inspect to read its layers, environment variables, entrypoint, and configuration.', 'docker inspect দিয়ে একটি ইমেজে ঢুকুন—এর লেয়ার, environment variable, entrypoint ও কনফিগারেশন পড়তে।'),
          l('Reclaim space with docker image prune to delete dangling images (untagged leftovers from rebuilds).', 'docker image prune দিয়ে জায়গা ফেরান—dangling ইমেজ (রিবিল্ডের অ-ট্যাগড অবশিষ্ট) মুছতে।'),
          l('For a deeper clean, prune stopped containers and unused images too — but review carefully before deleting more than dangling layers.', 'গভীর পরিষ্কারে থামানো কন্টেইনার ও অব্যবহৃত ইমেজও prune করুন—তবে dangling লেয়ারের বেশি মোছার আগে সাবধানে দেখুন।'),
        ] },
        { code: `# What images do I have, and how big are they?
docker images

# Where is my disk going? (images, containers, volumes)
docker system df

# Everything about one image: layers, env, entrypoint
docker inspect app

# Reclaim space by deleting dangling (untagged) images
docker image prune`, caption: l('docker system df is the fastest way to answer "why is my disk full?" before you decide what to prune.', 'docker system df হলো "আমার ডিস্ক কেন ভরা?" প্রশ্নের দ্রুততম উত্তর—কী prune করবেন ঠিক করার আগে।') },
      ],
    },
    {
      h: l('Key inspection and cleanup commands', 'মূল পরিদর্শন ও পরিষ্কার কমান্ড'),
      blocks: [
        { table: {
          head: [l('Goal', 'লক্ষ্য'), l('Command', 'কমান্ড')],
          rows: [
            [l('List images', 'ইমেজ তালিকা'), l('docker images', 'docker images')],
            [l('Show disk usage', 'ডিস্ক ব্যবহার দেখুন'), l('docker system df', 'docker system df')],
            [l('Inspect details', 'বিস্তারিত দেখুন'), l('docker inspect app', 'docker inspect app')],
            [l('Reclaim disk', 'ডিস্ক ফেরান'), l('docker image prune', 'docker image prune')],
          ],
        } },
        { note: l('docker inspect outputs JSON. To pull out one field instead of scrolling, use a format string, e.g. docker inspect --format "{{.Config.Env}}" app to see just the environment variables.', 'docker inspect JSON আউটপুট দেয়। স্ক্রল না করে একটি ফিল্ড বের করতে format string ব্যবহার করুন, যেমন docker inspect --format "{{.Config.Env}}" app দিয়ে শুধু environment variable দেখুন।'), kind: 'tip' },
      ],
    },
    {
      h: l('Prune safely — know what each command removes', 'নিরাপদে prune করুন—কোনটি কী মোছে জানুন'),
      blocks: [
        { p: l('Not all prunes are equal, and the difference is the gap between "freed some junk" and "deleted things I needed." A dangling image is an untagged leftover — usually the old version of an image after you rebuilt it — and pruning those is almost always safe. But adding -a widens the target to every image not currently used by a container, which can include base images your builds depend on, forcing slow re-pulls later.', 'সব prune এক নয়, আর পার্থক্যটি হলো "কিছু আবর্জনা মুক্ত করা" ও "দরকারি জিনিস মোছা"-র মধ্যকার ব্যবধান। একটি dangling ইমেজ হলো একটি অ-ট্যাগড অবশিষ্ট—সাধারণত রিবিল্ডের পর একটি ইমেজের পুরনো সংস্করণ—আর সেগুলো prune করা প্রায় সবসময় নিরাপদ। কিন্তু -a যোগ করলে লক্ষ্য প্রসারিত হয় বর্তমানে কোনো কন্টেইনার ব্যবহার করছে না এমন প্রতিটি ইমেজে, যা আপনার build-এর নির্ভরশীল base ইমেজ অন্তর্ভুক্ত করতে পারে, পরে ধীর রি-pull ঘটায়।') },
        { table: {
          head: [l('Command', 'কমান্ড'), l('What it deletes', 'কী মোছে'), l('Safety', 'নিরাপত্তা')],
          rows: [
            [l('docker image prune', 'docker image prune'), l('Dangling (untagged) images only', 'শুধু dangling (অ-ট্যাগড) ইমেজ'), l('Usually safe', 'সাধারণত নিরাপদ')],
            [l('docker image prune -a', 'docker image prune -a'), l('Every image not used by a container', 'কন্টেইনার ব্যবহার করছে না এমন প্রতিটি ইমেজ'), l('Aggressive — review first', 'আক্রমণাত্মক—আগে দেখুন')],
            [l('docker system prune -a', 'docker system prune -a'), l('Unused images, containers, networks, build cache', 'অব্যবহৃত ইমেজ, কন্টেইনার, নেটওয়ার্ক, build cache'), l('Very aggressive', 'খুব আক্রমণাত্মক')],
          ],
        } },
        { note: l('On a busy shared host, docker system prune -a can delete base images every build depended on and wipe the build cache, turning fast rebuilds into slow ones. Run it deliberately, not as a reflex.', 'একটি ব্যস্ত শেয়ার্ড হোস্টে docker system prune -a প্রতিটি build-এর নির্ভরশীল base ইমেজ মুছে ও build cache মুছে দ্রুত রিবিল্ডকে ধীর করতে পারে। প্রতিফলনে নয়, ভেবেচিন্তে চালান।'), kind: 'warn' },
      ],
    },
    {
      h: l('When and where this matters', 'কখন ও কোথায় এটি গুরুত্বপূর্ণ'),
      blocks: [
        { p: l('You reach for inspection when something is wrong or mysterious: a container behaves unexpectedly and you want to see the exact environment variables, entrypoint, or exposed ports baked into its image; or you are auditing an image someone else built before trusting it. docker inspect is your window into what an image really contains, without running it. It is the difference between guessing and knowing.', 'কিছু ভুল বা রহস্যময় হলে পরিদর্শনে যান: একটি কন্টেইনার অপ্রত্যাশিত আচরণ করছে ও আপনি তার ইমেজে বেক করা ঠিক environment variable, entrypoint বা exposed port দেখতে চান; অথবা অন্য কারো build করা একটি ইমেজ বিশ্বাস করার আগে audit করছেন। docker inspect হলো একটি ইমেজে আসলে কী আছে তা না চালিয়েই দেখার জানালা। এটি অনুমান করা ও জানার মধ্যে পার্থক্য।') },
        { p: l('You reach for cleanup on a schedule or when disk warnings appear — most often on CI servers and long-lived development machines, which churn through hundreds of builds. A good habit is to run docker system df first to see where the space actually went, prune dangling images regularly, and reserve the aggressive -a flags for when you genuinely want a clean slate and can afford the re-pulls afterward.', 'একটি সময়সূচি অনুযায়ী বা ডিস্ক সতর্কতা দেখা দিলে পরিষ্কারে যান—প্রায়ই CI সার্ভার ও দীর্ঘজীবী ডেভেলপমেন্ট মেশিনে, যা শত শত build চালায়। একটি ভালো অভ্যাস হলো আগে docker system df চালিয়ে জায়গা আসলে কোথায় গেল দেখা, নিয়মিত dangling ইমেজ prune করা, ও আক্রমণাত্মক -a ফ্ল্যাগ সেই সময়ের জন্য রাখা যখন সত্যিই একটি পরিষ্কার শুরু চান ও পরে রি-pull সামলাতে পারবেন।') },
      ],
    },
    {
      h: l('Common mistakes', 'সাধারণ ভুল'),
      blocks: [
        { list: [
          l('Running docker system prune -a on a busy host and deleting base images every build depended on, forcing slow re-pulls.', 'একটি ব্যস্ত হোস্টে docker system prune -a চালিয়ে প্রতিটি build-এর নির্ভরশীল base ইমেজ মোছা, ধীর রি-pull ঘটানো।'),
          l('Only using docker ps and never docker ps -a, so you forget stopped containers still exist and quietly hold disk.', 'শুধু docker ps ব্যবহার করা, docker ps -a কখনো নয়, ফলে ভুলে যাওয়া যে থামানো কন্টেইনার এখনো আছে ও নীরবে ডিস্ক ধরে রাখে।'),
          l('Blaming a full disk on images alone, when stopped containers, unused volumes, and the build cache are often the real culprits — check docker system df first.', 'ভরা ডিস্কের দোষ শুধু ইমেজকে দেওয়া, যখন থামানো কন্টেইনার, অব্যবহৃত ভলিউম ও build cache-ই প্রায়ই আসল অপরাধী—আগে docker system df দেখুন।'),
          l('Pruning aggressively right before a deploy, then waiting for gigabytes of base images to re-download at the worst moment.', 'ডিপ্লয়ের ঠিক আগে আক্রমণাত্মকভাবে prune করা, তারপর সবচেয়ে খারাপ মুহূর্তে গিগাবাইট base ইমেজ আবার ডাউনলোডের জন্য অপেক্ষা করা।'),
        ] },
      ],
    },
    {
      h: l('Remember in one line', 'এক লাইনে মনে রাখুন'),
      blocks: [
        { list: [
          l('docker images lists what you have, docker inspect shows one image’s details, docker image prune reclaims space.', 'docker images যা আছে তালিকা করে, docker inspect একটি ইমেজের বিস্তারিত দেখায়, docker image prune জায়গা ফেরায়।'),
          l('Run docker system df first to find where the disk actually went before you delete anything.', 'কিছু মোছার আগে ডিস্ক আসলে কোথায় গেল খুঁজতে আগে docker system df চালান।'),
          l('Pruning dangling images is safe; prune -a and system prune -a are aggressive — review before running them.', 'dangling ইমেজ prune করা নিরাপদ; prune -a ও system prune -a আক্রমণাত্মক—চালানোর আগে দেখুন।'),
        ] },
      ],
    },
  ],

  // ── dk-dockerfile · Anatomy of a Dockerfile ───────────────────────────────
  'dk-dockerfile': [
    {
      h: l('What is a Dockerfile?', 'Dockerfile কী?'),
      blocks: [
        { p: l('A Dockerfile is a plain text file containing a recipe for building an image: an ordered list of instructions that Docker executes from top to bottom. Each instruction — FROM, COPY, RUN, CMD and a handful of others — performs one step of assembling your application into a self-contained image. You run docker build, Docker reads the Dockerfile line by line, and out comes an image you can run anywhere. The whole point is to turn "set up this environment by hand" into a repeatable, version-controlled script.', 'Dockerfile হলো একটি সাধারণ টেক্সট ফাইল যাতে একটি ইমেজ build করার রেসিপি থাকে: নির্দেশের একটি ক্রমিক তালিকা যা Docker ওপর থেকে নিচে চালায়। প্রতিটি নির্দেশ—FROM, COPY, RUN, CMD ও আরও কয়েকটি—আপনার অ্যাপ্লিকেশনকে একটি স্বয়ংসম্পূর্ণ ইমেজে জড়ো করার একটি ধাপ সম্পাদন করে। আপনি docker build চালান, Docker লাইন ধরে Dockerfile পড়ে, আর বেরিয়ে আসে একটি ইমেজ যা যেকোনো জায়গায় চালাতে পারেন। মূল উদ্দেশ্য হলো "এই পরিবেশ হাতে সেট করো"-কে একটি পুনরাবৃত্তিযোগ্য, version-controlled স্ক্রিপ্টে বদলানো।') },
        { p: l('Because the Dockerfile lives in your repository alongside the code, the build becomes reproducible and reviewable: a teammate can read exactly how the image is assembled, and a code review can catch a bad choice before it ships. That is a huge upgrade over the old way, where the recipe for a server lived only in one person’s memory or a wiki page nobody kept up to date.', 'Dockerfile কোডের পাশে আপনার repository-তে থাকে বলে build পুনরুৎপাদনযোগ্য ও রিভিউযোগ্য হয়: একজন টিমমেট ঠিক কীভাবে ইমেজ জড়ো হয় তা পড়তে পারে, আর একটি code review ship হওয়ার আগে একটি খারাপ সিদ্ধান্ত ধরতে পারে। এটি পুরনো পদ্ধতির চেয়ে বিশাল উন্নতি, যেখানে একটি সার্ভারের রেসিপি শুধু একজনের স্মৃতিতে বা কেউ হালনাগাদ না-রাখা একটি wiki পেজে থাকত।') },
        { note: l('Think of a Dockerfile as a step-by-step recipe card: start from a base, add your ingredients, run a few preparation steps, and set the default action — and you have a finished dish (the image) that anyone can reproduce exactly.', 'Dockerfile-কে একটি ধাপে-ধাপে রেসিপি কার্ড ভাবুন: একটি base থেকে শুরু, উপকরণ যোগ, কয়েকটি প্রস্তুতি ধাপ চালান, ও ডিফল্ট ক্রিয়া সেট করুন—আর হয়ে গেল একটি তৈরি ডিশ (ইমেজ) যা যে কেউ হুবহু পুনরুৎপাদন করতে পারে।'), kind: 'tip' },
      ],
    },
    {
      h: l('How a build works, step by step', 'একটি build কীভাবে কাজ করে, ধাপে ধাপে'),
      blocks: [
        { steps: [
          l('Docker reads the first instruction, FROM, and pulls the base image it names to start from.', 'Docker প্রথম নির্দেশ FROM পড়ে ও এটি যে base ইমেজ নাম দেয় তা pull করে শুরু করে।'),
          l('It executes each following instruction in order, and each one that changes the filesystem produces a new read-only layer stacked on the previous one.', 'তারপর প্রতিটি নির্দেশ ক্রমে চালায়, আর filesystem বদলানো প্রতিটি নির্দেশ আগেরটির ওপর স্তূপীকৃত একটি নতুন read-only লেয়ার তৈরি করে।'),
          l('COPY brings your files into the image; RUN executes build commands like installing dependencies inside a temporary container.', 'COPY আপনার ফাইল ইমেজে আনে; RUN একটি অস্থায়ী কন্টেইনারের ভেতরে ডিপেন্ডেন্সি ইনস্টলের মতো build কমান্ড চালায়।'),
          l('CMD (or ENTRYPOINT) records the default command to run — but does not run it now; it runs only when a container starts from the image.', 'CMD (বা ENTRYPOINT) চালানোর ডিফল্ট কমান্ড রেকর্ড করে—কিন্তু এখন চালায় না; এটি শুধু ইমেজ থেকে কন্টেইনার চালু হলে চলে।'),
          l('When the last instruction finishes, Docker tags the final layer stack as your image, ready to run or push.', 'শেষ নির্দেশ শেষ হলে Docker চূড়ান্ত লেয়ার স্তূপকে আপনার ইমেজ হিসেবে ট্যাগ করে, চালাতে বা push করতে প্রস্তুত।'),
        ] },
        { code: `# Start from an official, slim Node base image (pinned version)
FROM node:20-slim

# All following paths are relative to /app inside the image
WORKDIR /app

# Copy only the dependency manifests first (for better caching)
COPY package*.json ./

# Install dependencies as a build step
RUN npm ci

# Now copy the rest of the source code
COPY . .

# Document the port the app listens on (metadata)
EXPOSE 3000

# The default command run when a container starts
CMD ["node", "server.js"]`, caption: l('Each line is one instruction; FROM/WORKDIR/COPY/RUN build the image, while EXPOSE documents and CMD sets what runs at container start.', 'প্রতিটি লাইন একটি নির্দেশ; FROM/WORKDIR/COPY/RUN ইমেজ build করে, আর EXPOSE নথিভুক্ত করে ও CMD কন্টেইনার শুরুতে কী চলবে সেট করে।') },
      ],
    },
    {
      h: l('Anatomy — reading the file line by line', 'গঠন—লাইন ধরে ফাইল পড়া'),
      blocks: [
        { p: l('Every Dockerfile follows the same rough shape: pick a base, set up the working directory, bring in dependencies and code, then declare how the app runs. Reading the annotated file above from top to bottom, here is what each line contributes.', 'প্রতিটি Dockerfile একই মোটামুটি আকার অনুসরণ করে: একটি base বাছুন, working directory সেট করুন, ডিপেন্ডেন্সি ও কোড আনুন, তারপর অ্যাপ কীভাবে চলে ঘোষণা করুন। ওপরের annotated ফাইলটি ওপর থেকে নিচে পড়লে প্রতিটি লাইন কী যোগ করে তা এখানে।') },
        { table: {
          head: [l('Line', 'লাইন'), l('What it does', 'কী করে')],
          rows: [
            [l('FROM node:20-slim', 'FROM node:20-slim'), l('Chooses the starting base image and pins its version.', 'শুরুর base ইমেজ বাছে ও এর ভার্সন পিন করে।')],
            [l('WORKDIR /app', 'WORKDIR /app'), l('Sets the directory where later commands run.', 'পরের কমান্ড কোথায় চলবে সেই ডিরেক্টরি সেট করে।')],
            [l('COPY package*.json ./', 'COPY package*.json ./'), l('Copies just the dependency manifests, first, for caching.', 'শুধু ডিপেন্ডেন্সি manifest, আগে, caching-এর জন্য কপি করে।')],
            [l('RUN npm ci', 'RUN npm ci'), l('Installs dependencies as a build step, creating a layer.', 'একটি build ধাপ হিসেবে ডিপেন্ডেন্সি ইনস্টল করে, একটি লেয়ার বানায়।')],
            [l('COPY . .', 'COPY . .'), l('Copies the rest of the source into the image.', 'বাকি সোর্স ইমেজে কপি করে।')],
            [l('CMD ["node", "server.js"]', 'CMD ["node", "server.js"]'), l('Declares the default command run at container start.', 'কন্টেইনার শুরুতে চালানোর ডিফল্ট কমান্ড ঘোষণা করে।')],
          ],
        } },
      ],
    },
    {
      h: l('Each instruction adds a layer', 'প্রতিটি নির্দেশ একটি লেয়ার যোগ করে'),
      blocks: [
        { p: l('The most important mental model for a Dockerfile is that the image it produces is not one flat blob but a stack of layers, one per instruction that changes the filesystem. This is why order and size matter so much: a small, well-ordered Dockerfile builds fast and caches well, while a sprawling one is slow to build, large to ship, and hard to debug. Because layers are cached and shared between images, a change low in the file forces every layer after it to be rebuilt — a fact the build-cache topic explores in depth.', 'Dockerfile-এর সবচেয়ে গুরুত্বপূর্ণ মানসিক মডেল হলো এটি যে ইমেজ বানায় তা একটি সমতল blob নয় বরং লেয়ারের একটি স্তূপ, filesystem বদলানো প্রতিটি নির্দেশ পিছু একটি। এ কারণেই ক্রম ও আকার এত গুরুত্বপূর্ণ: একটি ছোট, সুসজ্জিত Dockerfile দ্রুত build হয় ও ভালো cache করে, আর একটি এলোমেলো ফাইল ধীরে build হয়, বড় হয়ে ship হয়, ও ডিবাগ করা কঠিন। লেয়ার cached ও ইমেজের মধ্যে শেয়ার্ড হওয়ায়, ফাইলের নিচে একটি পরিবর্তন তার পরের প্রতিটি লেয়ার রিবিল্ড করায়—build-cache টপিক এটি গভীরে দেখে।') },
        { note: l('Do not cram everything into one giant RUN to "save layers." Readability and caching matter more than layer count; a clear file where related steps are grouped sensibly beats a single unreadable command.', '"লেয়ার বাঁচাতে" সবকিছু একটি বিশাল RUN-এ ঠাসবেন না। লেয়ার সংখ্যার চেয়ে পাঠযোগ্যতা ও caching বেশি গুরুত্বপূর্ণ; যেখানে সম্পর্কিত ধাপ যুক্তিসঙ্গতভাবে দলবদ্ধ এমন একটি পরিষ্কার ফাইল একটি অপাঠ্য কমান্ডকে হারায়।'), kind: 'tip' },
      ],
    },
    {
      h: l('When and where you write a Dockerfile', 'কখন ও কোথায় Dockerfile লেখেন'),
      blocks: [
        { p: l('You write a Dockerfile whenever you want your application itself packaged as an image — not just running a pre-built image someone else made, but shipping your own code. It lives at the root of your project, next to package.json or requirements.txt, and it is committed to version control so the build travels with the code. From that one file, docker build produces an identical image on your laptop, in CI, and on a production server.', 'যখনই আপনি নিজের অ্যাপ্লিকেশনকে একটি ইমেজ হিসেবে প্যাকেজ করতে চান—অন্যের বানানো একটি প্রি-বিল্ট ইমেজ চালানো নয়, বরং নিজের কোড ship করা—তখন একটি Dockerfile লেখেন। এটি আপনার প্রকল্পের root-এ, package.json বা requirements.txt-এর পাশে থাকে, ও version control-এ commit হয় যাতে build কোডের সঙ্গে যায়। সেই একটি ফাইল থেকে docker build আপনার ল্যাপটপে, CI-তে ও production সার্ভারে একটি অভিন্ন ইমেজ বানায়।') },
        { p: l('You do not need to write one for every scenario. If you only want to run a database or an off-the-shelf tool, pull its published image and skip the Dockerfile entirely. The Dockerfile earns its place the moment there is custom setup to capture: your source code, your dependencies, your configuration — anything that makes the image yours rather than a stock one.', 'প্রতিটি পরিস্থিতির জন্য একটি লেখার দরকার নেই। শুধু একটি ডেটাবেস বা একটি তৈরি টুল চালাতে চাইলে এর প্রকাশিত ইমেজ pull করুন ও Dockerfile পুরোপুরি বাদ দিন। যেই মুহূর্তে ধরার মতো কাস্টম সেটআপ থাকে—আপনার সোর্স কোড, ডিপেন্ডেন্সি, কনফিগারেশন, যা কিছু ইমেজকে একটি স্টক ইমেজের বদলে আপনার করে—তখনই Dockerfile তার জায়গা অর্জন করে।') },
      ],
    },
    {
      h: l('Common mistakes', 'সাধারণ ভুল'),
      blocks: [
        { list: [
          l('Writing one giant RUN with everything in it, making the image hard to cache, read, and debug.', 'সবকিছু নিয়ে একটি বিশাল RUN লেখা, ইমেজকে cache, পড়া ও ডিবাগ করা কঠিন করা।'),
          l('Copying all source before installing dependencies, so every code edit throws away the cached install (see build cache).', 'ডিপেন্ডেন্সি ইনস্টলের আগে সব সোর্স কপি করা, ফলে প্রতিটি কোড এডিট cached ইনস্টল ফেলে দেয় (build cache দেখুন)।'),
          l('Using an unpinned base like FROM node, so the same Dockerfile builds differently over time.', 'FROM node-এর মতো একটি unpinned base ব্যবহার করা, ফলে একই Dockerfile সময়ের সঙ্গে ভিন্নভাবে build হয়।'),
          l('Expecting CMD to run during the build. It only sets the default command for when a container starts, not at build time.', 'আশা করা CMD build-এর সময় চলবে। এটি শুধু কন্টেইনার চালু হলে চলার ডিফল্ট কমান্ড সেট করে, build-এর সময় নয়।'),
        ] },
      ],
    },
    {
      h: l('Remember in one line', 'এক লাইনে মনে রাখুন'),
      blocks: [
        { list: [
          l('A Dockerfile is an ordered recipe of instructions Docker runs top-to-bottom to build an image.', 'Dockerfile হলো নির্দেশের একটি ক্রমিক রেসিপি যা Docker ওপর-থেকে-নিচে চালিয়ে একটি ইমেজ build করে।'),
          l('The usual shape: FROM a base, WORKDIR, COPY deps, RUN install, COPY code, then CMD to launch.', 'সাধারণ আকার: একটি base FROM, WORKDIR, deps COPY, RUN ইনস্টল, code COPY, তারপর চালাতে CMD।'),
          l('Each instruction adds a layer, so order and size decide build speed, image size, and readability.', 'প্রতিটি নির্দেশ একটি লেয়ার যোগ করে, তাই ক্রম ও আকার build গতি, ইমেজ আকার ও পাঠযোগ্যতা ঠিক করে।'),
        ] },
      ],
    },
  ],

  // ── dk-instructions · Key Dockerfile instructions ─────────────────────────
  'dk-instructions': [
    {
      h: l('What are Dockerfile instructions?', 'Dockerfile নির্দেশ কী?'),
      blocks: [
        { p: l('Dockerfile instructions are the keywords — FROM, RUN, COPY, WORKDIR, CMD, ENTRYPOINT, and a few more — that make up the recipe. Each one is a verb that tells Docker to do one specific thing while building the image or, in the case of CMD and ENTRYPOINT, to record what should happen when a container later starts. Learning the handful of core instructions and exactly what each does is most of what you need to read and write real Dockerfiles.', 'Dockerfile নির্দেশ হলো সেই keyword—FROM, RUN, COPY, WORKDIR, CMD, ENTRYPOINT ও আরও কয়েকটি—যা রেসিপি গঠন করে। প্রতিটি একটি ক্রিয়া যা Docker-কে বলে ইমেজ build করার সময় একটি নির্দিষ্ট কাজ করতে, অথবা CMD ও ENTRYPOINT-এর ক্ষেত্রে, পরে কন্টেইনার চালু হলে কী ঘটবে তা রেকর্ড করতে। মূল কয়েকটি নির্দেশ ও প্রতিটি ঠিক কী করে শেখাই বাস্তব Dockerfile পড়া ও লেখার বেশিরভাগ।') },
        { note: l('Think of each instruction as a verb in the recipe: start from this base, do this, copy that, set the working spot, then run this by default. Read top to bottom and the recipe tells its own story.', 'প্রতিটি নির্দেশকে রেসিপির একটি ক্রিয়া ভাবুন: এই base থেকে শুরু করো, এটি করো, ওটা কপি করো, কাজের জায়গা সেট করো, তারপর ডিফল্টে এটি চালাও। ওপর থেকে নিচে পড়ুন, রেসিপি নিজেই তার গল্প বলে।'), kind: 'tip' },
      ],
    },
    {
      h: l('The core instructions at a glance', 'মূল নির্দেশ এক নজরে'),
      blocks: [
        { table: {
          head: [l('Instruction', 'নির্দেশ'), l('When it acts', 'কখন কাজ করে'), l('What it means', 'কী বোঝায়')],
          rows: [
            [l('FROM', 'FROM'), l('Build time (first)', 'Build সময় (প্রথম)'), l('Sets the base image to build on top of.', 'যার ওপর build হবে সেই base ইমেজ সেট করে।')],
            [l('WORKDIR', 'WORKDIR'), l('Build time', 'Build সময়'), l('Sets the directory for later COPY, RUN, CMD.', 'পরের COPY, RUN, CMD-এর জন্য ডিরেক্টরি সেট করে।')],
            [l('COPY', 'COPY'), l('Build time', 'Build সময়'), l('Copies files from the build context into the image.', 'build context থেকে ফাইল ইমেজে কপি করে।')],
            [l('RUN', 'RUN'), l('Build time', 'Build সময়'), l('Executes a command and saves the result as a layer.', 'একটি কমান্ড চালায় ও ফলকে একটি লেয়ার হিসেবে সেভ করে।')],
            [l('CMD', 'CMD'), l('Container start', 'কন্টেইনার শুরু'), l('Default command/args, easily overridden at run.', 'ডিফল্ট কমান্ড/আর্গুমেন্ট, চালানোর সময় সহজে override।')],
            [l('ENTRYPOINT', 'ENTRYPOINT'), l('Container start', 'কন্টেইনার শুরু'), l('The fixed executable the container always runs.', 'কন্টেইনার সবসময় চালায় এমন নির্দিষ্ট executable।')],
          ],
        } },
        { note: l('The key split: FROM, WORKDIR, COPY and RUN all act at build time to assemble the image, while CMD and ENTRYPOINT only describe what happens later, when a container starts.', 'মূল বিভাজন: FROM, WORKDIR, COPY ও RUN সব build সময়ে কাজ করে ইমেজ জড়ো করতে, আর CMD ও ENTRYPOINT শুধু বর্ণনা করে পরে কী ঘটবে, যখন একটি কন্টেইনার চালু হয়।'), kind: 'tip' },
      ],
    },
    {
      h: l('RUN vs CMD — build time vs run time', 'RUN বনাম CMD—build সময় বনাম run সময়'),
      blocks: [
        { p: l('The single most confusing pair for beginners is RUN versus CMD, because both seem to "run a command." The difference is when. RUN executes during the build, and whatever it produces is baked into a layer of the image — you use it to install packages, compile code, or set files up. CMD does not execute during the build at all; it only records the default command that will run when someone later starts a container from the image. Confuse them and you will bake a one-off command into your image or fail to start your app.', 'নতুনদের জন্য সবচেয়ে বিভ্রান্তিকর জোড়া হলো RUN বনাম CMD, কারণ দুটোই যেন "একটি কমান্ড চালায়।" পার্থক্য হলো কখন। RUN build-এর সময় চালায়, আর যা তৈরি করে তা ইমেজের একটি লেয়ারে বেক হয়—প্যাকেজ ইনস্টল, কোড কম্পাইল বা ফাইল সেটআপে ব্যবহার করেন। CMD build-এর সময় একেবারেই চালায় না; এটি শুধু ডিফল্ট কমান্ড রেকর্ড করে যা পরে কেউ ইমেজ থেকে কন্টেইনার চালু করলে চলবে। গুলিয়ে ফেললে একটি এককালীন কমান্ড ইমেজে বেক করবেন বা অ্যাপ চালু করতে ব্যর্থ হবেন।') },
        { code: `FROM python:3.12-slim
WORKDIR /app
COPY requirements.txt ./

# RUN acts NOW, during the build — installs into the image
RUN pip install -r requirements.txt

COPY . .

# CMD does NOT run now — it is the default command at start
CMD ["python", "app.py"]`, caption: l('RUN pip install happens while building; CMD ["python", "app.py"] is stored and only executes when a container starts.', 'RUN pip install build করার সময় ঘটে; CMD ["python", "app.py"] সংরক্ষিত থাকে ও শুধু কন্টেইনার চালু হলে চলে।') },
      ],
    },
    {
      h: l('CMD vs ENTRYPOINT — and exec vs shell form', 'CMD বনাম ENTRYPOINT—ও exec বনাম shell form'),
      blocks: [
        { p: l('CMD and ENTRYPOINT both concern what runs when the container starts, but they play different roles. ENTRYPOINT sets the fixed executable — the thing this container is fundamentally for — while CMD supplies default arguments that a user can override on the command line. Used together, ENTRYPOINT ["python"] with CMD ["app.py"] means "always run python, defaulting to app.py, but let me pass a different file if I want." A plain CMD alone is fully overridable; a plain ENTRYPOINT alone is not.', 'CMD ও ENTRYPOINT দুটোই কন্টেইনার চালু হলে কী চলবে তা নিয়ে, তবে ভিন্ন ভূমিকা রাখে। ENTRYPOINT নির্দিষ্ট executable সেট করে—এই কন্টেইনার মূলত যার জন্য—আর CMD ডিফল্ট আর্গুমেন্ট দেয় যা ব্যবহারকারী কমান্ড লাইনে override করতে পারে। একসঙ্গে ব্যবহারে, ENTRYPOINT ["python"] ও CMD ["app.py"] মানে "সবসময় python চালাও, ডিফল্টে app.py, তবে চাইলে ভিন্ন ফাইল দিতে দাও।" শুধু CMD পুরোপুরি override-যোগ্য; শুধু ENTRYPOINT নয়।') },
        { p: l('There is also a form choice that trips people up. The exec form, written as a JSON array like CMD ["node", "server.js"], runs the program directly and is the recommended default because it handles signals (like Ctrl-C and container stop) correctly. The shell form, written as CMD node server.js, wraps the command in a shell, which can swallow those signals and leave your app slow to stop. Prefer the bracketed exec form unless you specifically need shell features.', 'একটি form বাছাইও মানুষকে ফেলে দেয়। exec form, JSON array হিসেবে লেখা যেমন CMD ["node", "server.js"], প্রোগ্রামটি সরাসরি চালায় ও প্রস্তাবিত ডিফল্ট কারণ এটি signal (যেমন Ctrl-C ও container stop) সঠিকভাবে সামলায়। shell form, CMD node server.js হিসেবে লেখা, কমান্ডটি একটি shell-এ মোড়ায়, যা সেই signal গিলে ফেলতে পারে ও অ্যাপকে থামতে ধীর করে। বিশেষভাবে shell ফিচার দরকার না হলে bracket দেওয়া exec form নিন।') },
      ],
    },
    {
      h: l('When and where to use each', 'কখন ও কোথায় কোনটি ব্যবহার করবেন'),
      blocks: [
        { p: l('In practice you reach for these instructions in a predictable rhythm, and knowing which one fits each job keeps a Dockerfile clean. The build-time instructions (FROM, WORKDIR, COPY, RUN) do all the assembly work, and you sequence them for good caching. The start-time instructions (CMD, ENTRYPOINT) appear once, at the very end, to declare how the container behaves when it launches. A few supporting instructions round things out: ENV sets environment variables baked into the image, EXPOSE documents which port the app listens on, and ARG passes build-only values you do not want to persist in the final image.', 'বাস্তবে আপনি এই নির্দেশগুলো একটি অনুমেয় ছন্দে ব্যবহার করেন, আর কোন কাজে কোনটি খাপ খায় জানলে Dockerfile পরিষ্কার থাকে। build-সময়ের নির্দেশ (FROM, WORKDIR, COPY, RUN) সব জোড়ার কাজ করে, আর ভালো caching-এর জন্য আপনি সেগুলো ক্রমে সাজান। start-সময়ের নির্দেশ (CMD, ENTRYPOINT) একবার, একদম শেষে আসে, কন্টেইনার চালু হলে কীভাবে আচরণ করবে ঘোষণা করতে। কয়েকটি সহায়ক নির্দেশ বাকিটা পূর্ণ করে: ENV ইমেজে বেক করা environment variable সেট করে, EXPOSE অ্যাপ কোন port-এ শোনে তা নথিভুক্ত করে, ও ARG build-only মান পাস করে যা চূড়ান্ত ইমেজে রাখতে চান না।') },
        { list: [
          l('Use FROM to pick a small, pinned base — it decides the OS, tools, and starting size of your image.', 'একটি ছোট, পিন করা base বাছতে FROM ব্যবহার করুন—এটি আপনার ইমেজের OS, টুল ও শুরুর আকার ঠিক করে।'),
          l('Use RUN for build-time work only: installing dependencies, compiling, generating files that belong in the image.', 'RUN শুধু build-সময়ের কাজে ব্যবহার করুন: ডিপেন্ডেন্সি ইনস্টল, কম্পাইল, ইমেজে থাকা ফাইল তৈরি।'),
          l('Use COPY to bring code and manifests in; order it carefully so dependency installs stay cached (see build cache).', 'কোড ও manifest আনতে COPY ব্যবহার করুন; ক্রম যত্নে সাজান যাতে ডিপেন্ডেন্সি ইনস্টল cached থাকে (build cache দেখুন)।'),
          l('Use CMD for the default run command when the container is essentially "one app"; add ENTRYPOINT when you want a fixed executable with overridable arguments.', 'কন্টেইনার মূলত "একটি অ্যাপ" হলে ডিফল্ট run কমান্ডে CMD ব্যবহার করুন; override-যোগ্য আর্গুমেন্টসহ একটি নির্দিষ্ট executable চাইলে ENTRYPOINT যোগ করুন।'),
        ] },
      ],
    },
    {
      h: l('Common mistakes', 'সাধারণ ভুল'),
      blocks: [
        { list: [
          l('Using RUN (build time) when you meant CMD (run time), baking a one-off startup command into the image itself.', 'CMD (run সময়) বোঝাতে RUN (build সময়) ব্যবহার করা, একটি এককালীন startup কমান্ড ইমেজেই বেক করা।'),
          l('Writing two CMD instructions and expecting both to run — only the last CMD in a Dockerfile takes effect.', 'দুটি CMD লিখে দুটোই চলবে আশা করা—Dockerfile-এ শুধু শেষ CMD কার্যকর হয়।'),
          l('Using the shell form (CMD node server.js) and then wondering why the container ignores stop signals or lingers on shutdown.', 'shell form (CMD node server.js) ব্যবহার করা, তারপর ভাবা কন্টেইনার কেন stop signal উপেক্ষা করে বা shutdown-এ ঝুলে থাকে।'),
          l('Confusing COPY with a link — COPY takes a snapshot at build time; editing the host file afterward does not change the image.', 'COPY-কে একটি link ভাবা—COPY build সময়ে একটি snapshot নেয়; পরে হোস্ট ফাইল এডিট করলে ইমেজ বদলায় না।'),
        ] },
      ],
    },
    {
      h: l('Remember in one line', 'এক লাইনে মনে রাখুন'),
      blocks: [
        { list: [
          l('FROM sets the base, WORKDIR the directory, COPY brings files, RUN builds, and CMD/ENTRYPOINT define what runs.', 'FROM base সেট করে, WORKDIR ডিরেক্টরি, COPY ফাইল আনে, RUN build করে, ও CMD/ENTRYPOINT কী চলবে ঠিক করে।'),
          l('RUN acts at build time and bakes into a layer; CMD/ENTRYPOINT only describe what happens at container start.', 'RUN build সময়ে কাজ করে ও একটি লেয়ারে বেক হয়; CMD/ENTRYPOINT শুধু কন্টেইনার শুরুতে কী ঘটবে বর্ণনা করে।'),
          l('ENTRYPOINT is the fixed executable, CMD its overridable arguments — and prefer the bracketed exec form.', 'ENTRYPOINT নির্দিষ্ট executable, CMD তার override-যোগ্য আর্গুমেন্ট—ও bracket দেওয়া exec form নিন।'),
        ] },
      ],
    },
  ],

  // ── dk-build-cache · Build cache & layer ordering ─────────────────────────
  'dk-build-cache': [
    {
      h: l('What is the build cache?', 'Build cache কী?'),
      blocks: [
        { p: l('The build cache is Docker’s memory of previous builds. Because an image is a stack of layers — one per instruction — Docker can cache each layer and reuse it on the next build instead of redoing the work. When you run docker build again, Docker walks the Dockerfile from the top and, for each instruction, checks: has this instruction and its inputs changed since last time? If not, it reuses the cached layer instantly. The first instruction that has changed breaks the cache, and everything after it is rebuilt from scratch.', 'Build cache হলো আগের build-এর Docker-এর স্মৃতি। একটি ইমেজ লেয়ারের স্তূপ—প্রতি নির্দেশ পিছু একটি—হওয়ায় Docker প্রতিটি লেয়ার cache করে ও কাজ আবার না করে পরের build-এ পুনঃব্যবহার করতে পারে। আবার docker build চালালে Docker ওপর থেকে Dockerfile ধরে হাঁটে ও প্রতিটি নির্দেশে যাচাই করে: এই নির্দেশ ও এর ইনপুট কি গতবারের পর বদলেছে? না বদলালে সঙ্গে সঙ্গে cached লেয়ার পুনঃব্যবহার করে। যে প্রথম নির্দেশ বদলেছে সেটি cache ভাঙে, আর তার পরের সব নতুন করে build হয়।') },
        { p: l('This one behaviour — reuse until the first change, then rebuild everything after — is the key to fast builds, and it is entirely under your control through the order of your instructions. Order them well and a rebuild takes seconds; order them badly and every trivial code edit reinstalls all your dependencies from zero.', 'এই একটি আচরণ—প্রথম পরিবর্তন পর্যন্ত পুনঃব্যবহার, তারপর পরের সব রিবিল্ড—দ্রুত build-এর চাবিকাঠি, আর এটি সম্পূর্ণভাবে আপনার নির্দেশের ক্রমের মাধ্যমে আপনার নিয়ন্ত্রণে। ভালোভাবে সাজান, রিবিল্ড সেকেন্ডে হয়; খারাপভাবে সাজান, প্রতিটি তুচ্ছ কোড এডিট আপনার সব ডিপেন্ডেন্সি শূন্য থেকে রি-ইনস্টল করে।') },
        { note: l('Think of a checkpoint save in a game: unchanged early steps load instantly from the checkpoint, but the moment something changes, you have to replay everything from that point onward.', 'একটি গেমে চেকপয়েন্ট সেভ ভাবুন: অপরিবর্তিত শুরুর ধাপ চেকপয়েন্ট থেকে তাৎক্ষণিক লোড হয়, তবে যেই কিছু বদলায়, সেখান থেকে সবকিছু আবার রিপ্লে করতে হয়।'), kind: 'tip' },
      ],
    },
    {
      h: l('How layer caching works, step by step', 'লেয়ার caching কীভাবে কাজ করে, ধাপে ধাপে'),
      blocks: [
        { steps: [
          l('Docker processes the Dockerfile top to bottom, one instruction at a time.', 'Docker ওপর থেকে নিচে Dockerfile প্রসেস করে, একবারে একটি নির্দেশ।'),
          l('For each instruction, it computes a cache key from the instruction text and its inputs (for COPY, the contents of the copied files).', 'প্রতিটি নির্দেশে এটি নির্দেশ টেক্সট ও এর ইনপুট (COPY-এর জন্য কপি করা ফাইলের বিষয়বস্তু) থেকে একটি cache key গণনা করে।'),
          l('If a layer with that exact key already exists from a previous build, Docker reuses it and moves on — no work done.', 'সেই নির্দিষ্ট key-সহ একটি লেয়ার আগের build থেকে থাকলে Docker তা পুনঃব্যবহার করে ও এগোয়—কোনো কাজ হয় না।'),
          l('The first instruction whose key differs is a cache miss; Docker rebuilds that layer.', 'যে প্রথম নির্দেশের key ভিন্ন সেটি একটি cache miss; Docker সেই লেয়ার রিবিল্ড করে।'),
          l('Every instruction after a cache miss is also rebuilt, because each layer is stacked on the one before it — a change below invalidates everything above.', 'একটি cache miss-এর পরের প্রতিটি নির্দেশও রিবিল্ড হয়, কারণ প্রতিটি লেয়ার আগেরটির ওপর স্তূপীকৃত—নিচে একটি পরিবর্তন ওপরের সব বাতিল করে।'),
        ] },
      ],
    },
    {
      h: l('Layer ordering — the cache-friendly pattern', 'লেয়ার ক্রম—cache-বান্ধব প্যাটার্ন'),
      blocks: [
        { p: l('The golden rule follows directly from how the cache works: put the things that rarely change early, and the things that change often late. In almost every app, your dependencies change far less often than your source code. So you copy just the dependency manifests, install them, and only then copy the rest of your source. That way, editing your code — which you do constantly — does not invalidate the expensive dependency-install layer.', 'সোনালি নিয়মটি cache কীভাবে কাজ করে তা থেকেই আসে: যা কদাচিৎ বদলায় তা আগে রাখুন, যা প্রায়ই বদলায় তা পরে। প্রায় প্রতিটি অ্যাপে আপনার ডিপেন্ডেন্সি সোর্স কোডের চেয়ে অনেক কম বদলায়। তাই শুধু ডিপেন্ডেন্সি manifest কপি করুন, ইনস্টল করুন, ও তারপরই বাকি সোর্স কপি করুন। এভাবে কোড এডিট করা—যা আপনি অবিরত করেন—ব্যয়বহুল ডিপেন্ডেন্সি-ইনস্টল লেয়ার বাতিল করে না।') },
        { code: `# 1. copy only dependency manifests first
COPY package*.json ./
RUN npm ci

# 2. copy the rest of the source last
COPY . .`, caption: l('Because the source is copied last, editing code does not invalidate the cached npm ci layer — dependencies are not reinstalled.', 'সোর্স শেষে কপি হওয়ায় কোড এডিট cached npm ci লেয়ার বাতিল করে না—ডিপেন্ডেন্সি রি-ইনস্টল হয় না।') },
        { p: l('Contrast that with the wrong order below. Here COPY . . comes before the install, so the cache key for that layer depends on every file in your project. Change a single line of code and the COPY layer misses, which forces npm ci to run all over again on every build — turning a two-second rebuild into a two-minute one.', 'নিচের ভুল ক্রমের সঙ্গে তুলনা করুন। এখানে COPY . . ইনস্টলের আগে আসে, তাই সেই লেয়ারের cache key আপনার প্রকল্পের প্রতিটি ফাইলের ওপর নির্ভর করে। এক লাইন কোড বদলান আর COPY লেয়ার miss করে, যা প্রতিটি build-এ npm ci আবার চালাতে বাধ্য করে—একটি দুই-সেকেন্ডের রিবিল্ডকে দুই-মিনিটের করে।') },
        { code: `# ANTI-PATTERN: source copied before installing deps
COPY . .
RUN npm ci      # re-runs on EVERY code change`, caption: l('Any edit to any file busts the COPY . . layer, so the dependency install below it can never stay cached.', 'যেকোনো ফাইলে যেকোনো এডিট COPY . . লেয়ার নষ্ট করে, তাই এর নিচের ডিপেন্ডেন্সি ইনস্টল কখনো cached থাকতে পারে না।') },
      ],
    },
    {
      h: l('What invalidates a cached layer', 'একটি cached লেয়ার কী বাতিল করে'),
      blocks: [
        { table: {
          head: [l('Change', 'পরিবর্তন'), l('Effect on cache', 'cache-এ প্রভাব')],
          rows: [
            [l('Editing the instruction text in the Dockerfile', 'Dockerfile-এ নির্দেশ টেক্সট এডিট'), l('That layer and all after it rebuild.', 'সেই লেয়ার ও তার পরের সব রিবিল্ড হয়।')],
            [l('Changing a file that a COPY brings in', 'একটি COPY যে ফাইল আনে তা বদলানো'), l('That COPY layer and all after it rebuild.', 'সেই COPY লেয়ার ও তার পরের সব রিবিল্ড হয়।')],
            [l('Editing source copied by a later COPY . .', 'পরের COPY . . দিয়ে কপি করা সোর্স এডিট'), l('Only layers from that COPY down rebuild.', 'শুধু সেই COPY থেকে নিচের লেয়ার রিবিল্ড হয়।')],
            [l('No changes at all', 'কোনো পরিবর্তন নেই'), l('Every layer is reused; build is near-instant.', 'প্রতিটি লেয়ার পুনঃব্যবহৃত; build প্রায়-তাৎক্ষণিক।')],
          ],
        } },
        { note: l('A subtle trap: RUN apt-get install with no pinned versions caches the layer, so a rebuild weeks later can still install old packages. When you deliberately want fresh installs, change the instruction or build with --no-cache.', 'একটি সূক্ষ্ম ফাঁদ: পিন না-করা ভার্সনে RUN apt-get install লেয়ার cache করে, তাই সপ্তাহ পরের একটি রিবিল্ড এখনো পুরনো প্যাকেজ ইনস্টল করতে পারে। ইচ্ছাকৃতভাবে তাজা ইনস্টল চাইলে নির্দেশ বদলান বা --no-cache দিয়ে build করুন।'), kind: 'warn' },
      ],
    },
    {
      h: l('When and where cache ordering pays off', 'কখন ও কোথায় cache ক্রম কাজে দেয়'),
      blocks: [
        { p: l('Cache-friendly ordering pays off every time you rebuild, which in practice is dozens of times a day during development and on every push in CI. The tighter your inner loop — edit code, build, test — the more a well-ordered Dockerfile saves you, because the slow dependency install runs only when dependencies actually change. On a CI server building the same project hundreds of times, good layer ordering is the difference between pipelines measured in seconds and pipelines measured in minutes.', 'Cache-বান্ধব ক্রম প্রতিবার রিবিল্ডে কাজে দেয়, যা বাস্তবে ডেভেলপমেন্টের সময় দিনে কয়েক ডজন বার ও CI-তে প্রতিটি push-এ। আপনার ভেতরের লুপ—কোড এডিট, build, test—যত টাইট, একটি সুসজ্জিত Dockerfile তত বেশি বাঁচায়, কারণ ধীর ডিপেন্ডেন্সি ইনস্টল শুধু ডিপেন্ডেন্সি আসলে বদলালে চলে। একই প্রকল্প শত শত বার build করা একটি CI সার্ভারে, ভালো লেয়ার ক্রম সেকেন্ডে-মাপা পাইপলাইন ও মিনিটে-মাপা পাইপলাইনের মধ্যে পার্থক্য।') },
        { p: l('The same principle generalizes beyond npm: copy requirements.txt before your Python source and pip install first; copy go.mod before your Go source and download modules first. In every ecosystem, the pattern is identical — bring in the slow-changing dependency manifest, install, then bring in the fast-changing source. When you find a rebuild is slow, the fix is almost always to move a COPY line down.', 'একই নীতি npm-এর বাইরেও সাধারণীকৃত হয়: Python সোর্সের আগে requirements.txt কপি করে আগে pip install করুন; Go সোর্সের আগে go.mod কপি করে আগে module ডাউনলোড করুন। প্রতিটি ecosystem-এ প্যাটার্ন অভিন্ন—ধীরে-বদলানো ডিপেন্ডেন্সি manifest আনুন, ইনস্টল করুন, তারপর দ্রুত-বদলানো সোর্স আনুন। একটি রিবিল্ড ধীর মনে হলে সমাধান প্রায় সবসময় একটি COPY লাইন নিচে সরানো।') },
      ],
    },
    {
      h: l('Common mistakes', 'সাধারণ ভুল'),
      blocks: [
        { list: [
          l('Running COPY . . before installing dependencies, so any code edit reinstalls everything from scratch.', 'ডিপেন্ডেন্সি ইনস্টলের আগে COPY . . চালানো, ফলে যেকোনো কোড এডিট সব নতুন করে ইনস্টল করে।'),
          l('Putting a frequently-changing instruction early, busting the cache for every layer after it on each build.', 'একটি ঘন-বদলানো নির্দেশ শুরুতে রাখা, প্রতিটি build-এ তার পরের প্রতিটি লেয়ারের cache নষ্ট করা।'),
          l('Forgetting a .dockerignore, so unrelated files (logs, node_modules) sneak into COPY . . and silently bust its cache.', 'একটি .dockerignore ভুলে যাওয়া, ফলে অসম্পর্কিত ফাইল (log, node_modules) COPY . .-তে ঢুকে নীরবে এর cache নষ্ট করে।'),
          l('Assuming the cache always reflects the latest packages — an unchanged RUN install layer can serve stale versions until you bust it.', 'ধরে নেওয়া cache সবসময় সর্বশেষ প্যাকেজ দেখায়—একটি অপরিবর্তিত RUN ইনস্টল লেয়ার পুরনো ভার্সন দিতে পারে যতক্ষণ না আপনি তা নষ্ট করেন।'),
        ] },
      ],
    },
    {
      h: l('Remember in one line', 'এক লাইনে মনে রাখুন'),
      blocks: [
        { list: [
          l('Docker caches each layer and reuses it until an instruction or its inputs change, then rebuilds everything after.', 'Docker প্রতিটি লেয়ার cache করে ও একটি নির্দেশ বা তার ইনপুট না বদলানো পর্যন্ত পুনঃব্যবহার করে, তারপর পরের সব রিবিল্ড করে।'),
          l('Order instructions rarely-changing first, so copy and install dependencies before copying your source.', 'নির্দেশ কম-বদলানো আগে সাজান, তাই সোর্স কপির আগে ডিপেন্ডেন্সি কপি ও ইনস্টল করুন।'),
          l('A change low in the Dockerfile invalidates every layer above it — move COPY . . as late as possible.', 'Dockerfile-এর নিচে একটি পরিবর্তন তার ওপরের প্রতিটি লেয়ার বাতিল করে—COPY . . যতটা সম্ভব দেরিতে সরান।'),
        ] },
      ],
    },
  ],
}
