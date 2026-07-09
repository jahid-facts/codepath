// Deep, bilingual (English / Bangla) teaching guides for the Docker course —
// containers configuration, resilience, and storage. Shape mirrors
// app/course-guides.js and app/guides/git/a.js: each guide is an array of
// sections { h, blocks }, rendered by GuideBlock in app/LearningApp.js.
// Block types: { p }, { list }, { steps }, { table:{head,rows} },
// { note, kind }, { code, caption }.
// Facts (definitions, analogies, commands, examples, trade-offs, mistakes)
// come from app/courses/docker.js.

const l = (en, bn) => ({ en, bn })

export default {
  // ── dk-env-config · Environment & configuration ───────────────────────────
  'dk-env-config': [
    {
      h: l('What is environment-based configuration?', 'এনভায়রনমেন্ট-ভিত্তিক কনফিগারেশন কী?'),
      blocks: [
        { p: l('Environment-based configuration means keeping the settings a program needs — the database URL, the port, an API key, whether it runs in development or production mode — outside the image and passing them in when the container starts. You build one image, and that same image behaves differently in each environment purely because of the environment variables you hand it at run time. The two everyday ways to supply them are the -e flag for a single value and --env-file for a whole file of values.', 'এনভায়রনমেন্ট-ভিত্তিক কনফিগারেশন মানে একটি প্রোগ্রামের দরকারি সেটিং—ডেটাবেস URL, পোর্ট, API key, এটি development না production মোডে চলবে—ইমেজের বাইরে রেখে কন্টেইনার চালু হওয়ার সময় ভেতরে দেওয়া। আপনি একটি ইমেজ বানান, আর সেই একই ইমেজ প্রতিটি এনভায়রনমেন্টে ভিন্নভাবে আচরণ করে শুধু run time-এ দেওয়া environment variable-এর কারণে। এদের দেওয়ার দুটি সাধারণ উপায়: একটি মানের জন্য -e ফ্ল্যাগ এবং পুরো এক ফাইল মানের জন্য --env-file।') },
        { p: l('The problem this solves is that configuration changes far more often than code. Your app is byte-for-byte identical in staging and production, but the database it talks to is not. If you bake those differences into the image you must rebuild — and re-test — a separate image per environment, and any secret you hard-code becomes permanently embedded in a layer that anyone who pulls the image can read. Reading config from environment variables keeps the image generic and the environment-specific details where they belong: in the deploy, not the build.', 'এটি যে সমস্যা সমাধান করে তা হলো কনফিগারেশন কোডের চেয়ে অনেক বেশি বদলায়। আপনার অ্যাপ staging ও production-এ হুবহু এক, কিন্তু যে ডেটাবেসের সঙ্গে কথা বলে তা এক নয়। এই পার্থক্য ইমেজে বেক করলে প্রতি এনভায়রনমেন্টে আলাদা ইমেজ রিবিল্ড ও পুনঃটেস্ট করতে হয়, আর হার্ড-কোড করা যেকোনো সিক্রেট স্থায়ীভাবে একটি লেয়ারে বসে যায় যা ইমেজ pull করা যে কেউ পড়তে পারে। environment variable থেকে কনফিগ পড়লে ইমেজ থাকে জেনেরিক আর এনভায়রনমেন্ট-নির্দিষ্ট বিষয় থাকে যেখানে তার থাকা উচিত: deploy-তে, build-এ নয়।') },
        { note: l('Think of one appliance shipped worldwide and configured by the plug and dial settings at each location, not rebuilt for each country. The device is the image; the local voltage and dials are the environment variables.', 'একটি যন্ত্র বিশ্বজুড়ে পাঠানো ও প্রতিটি জায়গায় প্লাগ ও ডায়াল সেটিং দিয়ে কনফিগার করা ভাবুন, প্রতি দেশের জন্য পুনর্নির্মাণ নয়। যন্ত্রটি হলো ইমেজ; স্থানীয় ভোল্টেজ ও ডায়াল হলো environment variable।'), kind: 'tip' },
      ],
    },
    {
      h: l('How it works, step by step', 'কীভাবে কাজ করে, ধাপে ধাপে'),
      blocks: [
        { steps: [
          l('Write your app so it reads settings from environment variables (for example process.env.PORT or os.environ) rather than from hard-coded constants.', 'আপনার অ্যাপ এমনভাবে লিখুন যাতে এটি হার্ড-কোড করা ধ্রুবকের বদলে environment variable থেকে সেটিং পড়ে (যেমন process.env.PORT বা os.environ)।'),
          l('Build one image that contains no environment-specific values at all.', 'একটি ইমেজ বানান যাতে কোনো এনভায়রনমেন্ট-নির্দিষ্ট মান একেবারেই না থাকে।'),
          l('At run time, pass each value with -e KEY=value, or point --env-file at a file of KEY=value lines.', 'run time-এ প্রতিটি মান -e KEY=value দিয়ে দিন, অথবা --env-file দিয়ে KEY=value লাইনের একটি ফাইলে নির্দেশ করুন।'),
          l('Docker injects those variables into the container process environment before your program starts.', 'ডকার আপনার প্রোগ্রাম শুরুর আগে সেই ভ্যারিয়েবলগুলো কন্টেইনার প্রসেসের environment-এ ঢুকিয়ে দেয়।'),
          l('The same image, run with different variables, becomes your dev, staging, or production instance.', 'একই ইমেজ ভিন্ন ভ্যারিয়েবল দিয়ে চালালে তা হয় আপনার dev, staging বা production instance।'),
        ] },
        { code: `# one variable at a time
docker run -d --name api \\
  -e NODE_ENV=production \\
  -e PORT=3000 \\
  myorg/api:1.4

# many variables from a file (one KEY=value per line)
docker run -d --name api --env-file ./prod.env myorg/api:1.4

# see exactly what a running container received
docker exec api env`, caption: l('-e sets one variable; --env-file loads a whole file; docker exec api env prints what the container actually got.', '-e একটি ভ্যারিয়েবল সেট করে; --env-file পুরো একটি ফাইল লোড করে; docker exec api env দেখায় কন্টেইনার আসলে কী পেয়েছে।') },
      ],
    },
    {
      h: l('Key configuration flags', 'মূল কনফিগারেশন ফ্ল্যাগ'),
      blocks: [
        { table: {
          head: [l('Goal', 'লক্ষ্য'), l('Command', 'কমান্ড')],
          rows: [
            [l('Set one variable', 'একটি ভ্যারিয়েবল সেট'), l('-e KEY=value', '-e KEY=value')],
            [l('Load a whole file', 'পুরো ফাইল লোড'), l('--env-file ./prod.env', '--env-file ./prod.env')],
            [l('Forward a host variable', 'হোস্ট ভ্যারিয়েবল ফরওয়ার্ড'), l('-e KEY (value taken from your shell)', '-e KEY (মান আপনার shell থেকে নেওয়া)')],
            [l('Inspect what a container got', 'কন্টেইনার কী পেল দেখুন'), l('docker exec api env', 'docker exec api env')],
          ],
        } },
        { note: l('An --env-file line is plain KEY=value with no quotes and no export keyword — for example DATABASE_URL=postgres://db:5432/app. Blank lines and lines starting with # are ignored.', '--env-file-এর একটি লাইন হলো সাধারণ KEY=value, কোনো কোট বা export কীওয়ার্ড ছাড়া—যেমন DATABASE_URL=postgres://db:5432/app। ফাঁকা লাইন ও # দিয়ে শুরু হওয়া লাইন উপেক্ষা করা হয়।'), kind: 'tip' },
      ],
    },
    {
      h: l('When and where to use it', 'কখন ও কোথায় ব্যবহার করবেন'),
      blocks: [
        { p: l('Use environment variables for anything that differs between environments or between deployments: hostnames, ports, feature flags, log levels, and connection strings. This is the twelve-factor way to configure an app, and every orchestrator — Compose, Kubernetes, ECS — is built around it. Reach for --env-file when the list grows long or you want to keep a non-secret template in version control; reach for -e for a value or two on the command line. Values set with -e at run time also override any default an image baked in with the Dockerfile ENV instruction, so you can ship sane defaults and still tune them per deploy.', 'যা এনভায়রনমেন্ট বা deploy-এর মধ্যে বদলায় তার সবকিছুর জন্য environment variable ব্যবহার করুন: hostname, পোর্ট, feature flag, log level ও connection string। এটি একটি অ্যাপ কনফিগার করার twelve-factor পদ্ধতি, আর প্রতিটি orchestrator—Compose, Kubernetes, ECS—এর চারপাশে গড়া। তালিকা লম্বা হলে বা version control-এ একটি নন-সিক্রেট টেমপ্লেট রাখতে চাইলে --env-file নিন; কমান্ড লাইনে দু-একটি মানের জন্য -e নিন। run time-এ -e দিয়ে সেট করা মান Dockerfile-এর ENV নির্দেশে বেক করা যেকোনো ডিফল্টকেও override করে, তাই আপনি যুক্তিসঙ্গত ডিফল্ট পাঠিয়েও প্রতি deploy-তে টিউন করতে পারেন।') },
        { p: l('When the same variable is set in more than one place, Docker follows a clear precedence: a value passed with -e on the command line wins over one from --env-file, which in turn overrides a default baked in with the Dockerfile ENV instruction. That ordering is exactly what lets an image ship safe defaults while a deploy overrides only the few values it actually needs, and it is worth remembering the moment a variable is mysteriously not the value you expected — trace it back up that chain and you will find where it was set last.', 'একই ভ্যারিয়েবল একাধিক জায়গায় সেট থাকলে ডকার একটি স্পষ্ট অগ্রাধিকার মানে: কমান্ড লাইনে -e দিয়ে দেওয়া মান --env-file-এর মানকে হারায়, যা আবার Dockerfile-এর ENV-তে বেক করা ডিফল্টকে override করে। এই ক্রমই একটি ইমেজকে নিরাপদ ডিফল্ট পাঠাতে দেয় অথচ deploy শুধু দরকারি কয়েকটি মান override করে, আর একটি ভ্যারিয়েবল রহস্যজনকভাবে প্রত্যাশিত মান না হলে এটি মনে রাখা মূল্যবান—এই শৃঙ্খল ধরে ওপরে গেলে দেখবেন সবশেষে কোথায় সেট হয়েছিল।') },
      ],
    },
    {
      h: l('Are environment variables safe for secrets?', 'সিক্রেটের জন্য environment variable কি নিরাপদ?'),
      blocks: [
        { p: l('Environment variables are convenient, but they are visible. Anyone who can run docker inspect on the container, read its logs, see a crash dump, or list a child process can often read them in plain text. That is fine for a port or a log level; it is risky for a database password or an API token.', 'environment variable সুবিধাজনক, তবে দৃশ্যমান। কন্টেইনারে docker inspect চালাতে পারা, এর log পড়তে পারা, crash dump দেখতে পারা বা একটি child process তালিকা করতে পারা যে কেউ প্রায়ই এগুলো plain text-এ পড়তে পারে। একটি পোর্ট বা log level-এর জন্য তা ঠিক আছে; একটি ডেটাবেস পাসওয়ার্ড বা API token-এর জন্য ঝুঁকিপূর্ণ।') },
        { note: l('An environment variable is not a vault. For real secrets prefer Docker/Kubernetes secrets, a mounted secret file, or a secrets manager, and keep every .env file out of your image (add it to .dockerignore) and out of git (add it to .gitignore).', 'environment variable কোনো vault নয়। আসল সিক্রেটের জন্য Docker/Kubernetes secrets, একটি mounted secret ফাইল, বা একটি secrets manager নিন, এবং প্রতিটি .env ফাইল ইমেজের বাইরে (.dockerignore-এ যোগ করুন) ও git-এর বাইরে (.gitignore-এ যোগ করুন) রাখুন।'), kind: 'warn' },
      ],
    },
    {
      h: l('Common mistakes', 'সাধারণ ভুল'),
      blocks: [
        { list: [
          l('Baking environment-specific config or secrets into the image, so you need a brand-new build for every environment.', 'এনভায়রনমেন্ট-নির্দিষ্ট কনফিগ বা সিক্রেট ইমেজে বেক করা, ফলে প্রতি এনভায়রনমেন্টে একদম নতুন বিল্ড লাগে।'),
          l('Committing a .env full of real credentials to git, or copying it into the image with COPY . . — always list it in .gitignore and .dockerignore.', 'আসল credential ভরা একটি .env git-এ commit করা, বা COPY . . দিয়ে ইমেজে কপি করা—সবসময় এটি .gitignore ও .dockerignore-এ রাখুন।'),
          l('Assuming a value set with the Dockerfile ENV can change without rebuilding; ENV is baked into the image, while -e at run time overrides it without a rebuild.', 'ধরে নেওয়া Dockerfile-এর ENV দিয়ে সেট করা মান রিবিল্ড ছাড়া বদলানো যায়; ENV ইমেজে বেক হয়, আর run time-এ -e রিবিল্ড ছাড়াই তা override করে।'),
          l('Putting a secret directly in -e on the command line, where it is saved to your shell history and shows up in docker inspect.', 'কমান্ড লাইনে সরাসরি -e-তে একটি সিক্রেট দেওয়া, যা shell history-তে জমা হয় ও docker inspect-এ দেখা যায়।'),
        ] },
      ],
    },
    {
      h: l('Remember in one line', 'এক লাইনে মনে রাখুন'),
      blocks: [
        { list: [
          l('Read config from environment variables and supply it per environment with -e or --env-file — never by rebuilding.', 'environment variable থেকে কনফিগ পড়ুন ও প্রতি এনভায়রনমেন্টে -e বা --env-file দিয়ে দিন—কখনো রিবিল্ড করে নয়।'),
          l('One generic image plus different variables gives you dev, staging, and prod from a single build.', 'একটি জেনেরিক ইমেজ ও ভিন্ন ভ্যারিয়েবল মিলে একটি বিল্ড থেকে dev, staging ও prod দেয়।'),
          l('Environment variables are convenient but visible — never treat them as a secure store for secrets.', 'environment variable সুবিধাজনক তবে দৃশ্যমান—এদের কখনো সিক্রেটের নিরাপদ ভাণ্ডার ভাববেন না।'),
        ] },
      ],
    },
  ],

  // ── dk-restart · Restart policies & healthchecks ──────────────────────────
  'dk-restart': [
    {
      h: l('What are restart policies and healthchecks?', 'রিস্টার্ট পলিসি ও হেলথচেক কী?'),
      blocks: [
        { p: l('A restart policy is a rule you attach to a container that tells Docker what to do when the process inside exits or the whole host reboots: leave it stopped, or bring it back automatically. A healthcheck is a separate command Docker runs on a schedule inside the container to decide whether the app is not merely running but actually healthy — answering requests, connected to its database, ready to serve. Together they keep long-running services both alive and honest.', 'রিস্টার্ট পলিসি হলো একটি কন্টেইনারে লাগানো নিয়ম যা ডকারকে বলে ভেতরের প্রসেস বেরিয়ে গেলে বা পুরো হোস্ট রিবুট করলে কী করতে হবে: থামিয়ে রাখা, নাকি স্বয়ংক্রিয়ভাবে ফিরিয়ে আনা। হেলথচেক হলো একটি আলাদা কমান্ড যা ডকার নির্দিষ্ট সময় অন্তর কন্টেইনারের ভেতরে চালিয়ে ঠিক করে অ্যাপটি শুধু চলছে না, আসলে সুস্থ কি না—রিকোয়েস্টের উত্তর দিচ্ছে, ডেটাবেসে যুক্ত, পরিবেশনে প্রস্তুত। এই দুটি একসঙ্গে দীর্ঘ-চলমান সার্ভিসকে সচল ও সৎ রাখে।') },
        { p: l('The problem they solve is that "the container is running" and "the app works" are not the same thing. A web-server process can be alive while the app inside is deadlocked, out of database connections, or returning 500s to every request. Without a restart policy a crash means downtime until a human notices; without a healthcheck a broken-but-running container looks perfectly fine to Docker and to any load balancer sitting in front of it.', 'এরা যে সমস্যা সমাধান করে তা হলো "কন্টেইনার চলছে" ও "অ্যাপ কাজ করছে" এক জিনিস নয়। একটি web-server প্রসেস জীবিত থাকতে পারে অথচ ভেতরের অ্যাপ deadlock-এ, ডেটাবেস কানেকশন ফুরিয়ে, বা প্রতিটি রিকোয়েস্টে 500 ফেরত দিচ্ছে। রিস্টার্ট পলিসি ছাড়া একটি ক্র্যাশ মানে মানুষ খেয়াল করা পর্যন্ত downtime; হেলথচেক ছাড়া ভাঙা-অথচ-চলমান কন্টেইনার ডকার ও সামনের যেকোনো load balancer-এর কাছে নিখুঁত মনে হয়।') },
        { note: l('Think of a pilot light that relights the burner automatically, plus a sensor confirming the flame is truly on. The restart policy relights; the healthcheck confirms the flame.', 'একটি পাইলট লাইট ভাবুন যা বার্নার স্বয়ংক্রিয়ভাবে আবার জ্বালায়, সঙ্গে একটি সেন্সর নিশ্চিত করে শিখা সত্যিই জ্বলছে। রিস্টার্ট পলিসি আবার জ্বালায়; হেলথচেক শিখা নিশ্চিত করে।'), kind: 'tip' },
      ],
    },
    {
      h: l('How restart policies work', 'রিস্টার্ট পলিসি কীভাবে কাজ করে'),
      blocks: [
        { steps: [
          l('You start a container with a --restart policy, for example --restart unless-stopped.', 'আপনি একটি --restart পলিসি দিয়ে কন্টেইনার চালু করেন, যেমন --restart unless-stopped।'),
          l('If the process exits with an error, Docker relaunches it, waiting a little longer between repeated attempts.', 'প্রসেস এরর দিয়ে বেরোলে ডকার একে আবার চালায়, বারবার চেষ্টার মাঝে একটু বেশি করে অপেক্ষা করে।'),
          l('If the Docker daemon or the whole host restarts, containers set to always or unless-stopped come back on their own.', 'ডকার daemon বা পুরো হোস্ট রিস্টার্ট করলে always বা unless-stopped সেট করা কন্টেইনার নিজে থেকেই ফিরে আসে।'),
          l('A container you stop by hand with docker stop stays stopped under unless-stopped — that is exactly how it differs from always.', 'docker stop দিয়ে হাতে থামানো কন্টেইনার unless-stopped-এ থামানোই থাকে—এটিই always থেকে এর পার্থক্য।'),
          l('docker ps shows the current state, and the STATUS column also shows health once a healthcheck is defined.', 'docker ps বর্তমান অবস্থা দেখায়, আর হেলথচেক সংজ্ঞায়িত হলে STATUS কলামে health-ও দেখায়।'),
        ] },
        { code: `# relaunch automatically after a crash or a host reboot
docker run -d --name api \\
  --restart unless-stopped \\
  -p 8080:3000 \\
  myorg/api:1.4

# the current state (and health) shows in the STATUS column
docker ps`, caption: l('unless-stopped survives crashes and reboots but respects a manual docker stop — the sensible default for a service.', 'unless-stopped ক্র্যাশ ও রিবুট টেকে কিন্তু হাতে করা docker stop মানে—একটি সার্ভিসের জন্য যুক্তিসঙ্গত ডিফল্ট।') },
      ],
    },
    {
      h: l('The four restart policies', 'চারটি রিস্টার্ট পলিসি'),
      blocks: [
        { table: {
          head: [l('Policy', 'পলিসি'), l('Flag', 'ফ্ল্যাগ'), l('When it restarts', 'কখন রিস্টার্ট হয়')],
          rows: [
            [l('no (default)', 'no (ডিফল্ট)'), l('--restart no', '--restart no'), l('Never — you start and stop it yourself.', 'কখনো নয়—আপনি নিজে চালু ও থামান।')],
            [l('on-failure', 'on-failure'), l('--restart on-failure:5', '--restart on-failure:5'), l('Only on a non-zero exit, up to the retry limit.', 'শুধু non-zero exit-এ, retry সীমা পর্যন্ত।')],
            [l('always', 'always'), l('--restart always', '--restart always'), l('On any exit and on daemon start, even after a manual stop.', 'যেকোনো exit ও daemon চালুতে, হাতে থামানোর পরও।')],
            [l('unless-stopped', 'unless-stopped'), l('--restart unless-stopped', '--restart unless-stopped'), l('Like always, but stays down if you stopped it by hand.', 'always-এর মতো, তবে হাতে থামালে থামানোই থাকে।')],
          ],
        } },
      ],
    },
    {
      h: l('Healthchecks: proving the app is really alive', 'হেলথচেক: অ্যাপ সত্যিই জীবিত তা প্রমাণ'),
      blocks: [
        { p: l('A restart policy reacts to a process that has exited. A healthcheck catches the subtler failure where the process is still up but the app is broken. You define a command that succeeds (exit 0) when the app is healthy and fails (non-zero) when it is not; Docker runs it every --interval, gives it --timeout to answer, and marks the container starting, then healthy or unhealthy.', 'রিস্টার্ট পলিসি বেরিয়ে যাওয়া প্রসেসে সাড়া দেয়। হেলথচেক সেই সূক্ষ্মতর ব্যর্থতা ধরে যেখানে প্রসেস চালু অথচ অ্যাপ ভাঙা। আপনি এমন একটি কমান্ড ঠিক করেন যা অ্যাপ সুস্থ হলে সফল (exit 0) ও না হলে ব্যর্থ (non-zero) হয়; ডকার একে প্রতি --interval-এ চালায়, উত্তর দিতে --timeout দেয়, এবং কন্টেইনারকে starting, তারপর healthy বা unhealthy চিহ্নিত করে।') },
        { code: `HEALTHCHECK --interval=30s --timeout=3s \\
  CMD curl -f http://localhost:3000/health || exit 1`, caption: l('Docker marks the container "unhealthy" if the probe fails, so platforms can restart or route around it.', 'প্রোব ব্যর্থ হলে ডকার কন্টেইনারকে "unhealthy" চিহ্নিত করে, যাতে প্ল্যাটফর্ম রিস্টার্ট বা এড়িয়ে যেতে পারে।') },
        { note: l('A standalone --restart policy does not restart a container just for being unhealthy — it only reacts to the process exiting. To act on health you need an orchestrator (Compose condition, Swarm, or a Kubernetes liveness probe) or a check that exits the process on failure.', 'একক --restart পলিসি শুধু unhealthy হওয়ার জন্য কন্টেইনার রিস্টার্ট করে না—এটি শুধু প্রসেস বেরোলে সাড়া দেয়। health-এর ওপর কাজ করতে একটি orchestrator (Compose condition, Swarm, বা Kubernetes liveness probe) বা ব্যর্থতায় প্রসেস বন্ধ করা একটি check লাগে।'), kind: 'tip' },
      ],
    },
    {
      h: l('When and where to use them', 'কখন ও কোথায় ব্যবহার করবেন'),
      blocks: [
        { p: l('Add a restart policy to every long-running service — web servers, APIs, workers, databases — so a transient crash or a server reboot does not become an outage; unless-stopped is the sensible default because it survives reboots yet respects a manual stop. Skip restart policies for short-lived, run-once containers such as a migration or a batch job, where exiting is the correct end state — use --rm instead so the container cleans itself up. Add a healthcheck whenever something downstream needs to know the app is ready: a load balancer, a Compose depends_on condition, or a rolling deploy that must wait for the new container to be healthy before retiring the old one.', 'প্রতিটি দীর্ঘ-চলমান সার্ভিসে রিস্টার্ট পলিসি দিন—web server, API, worker, ডেটাবেস—যাতে ক্ষণস্থায়ী ক্র্যাশ বা সার্ভার রিবুট outage না হয়; unless-stopped যুক্তিসঙ্গত ডিফল্ট কারণ এটি রিবুট টেকে অথচ হাতে থামানো মানে। migration বা batch job-এর মতো স্বল্পস্থায়ী, একবার-চলা কন্টেইনারে রিস্টার্ট পলিসি বাদ দিন, যেখানে বেরিয়ে যাওয়াই সঠিক শেষ—বরং --rm দিন যাতে কন্টেইনার নিজেকে পরিষ্কার করে। যখন downstream কিছুর অ্যাপ প্রস্তুত কি না জানা দরকার তখন হেলথচেক দিন: একটি load balancer, একটি Compose depends_on condition, বা এমন একটি rolling deploy যাকে পুরনোটি সরানোর আগে নতুন কন্টেইনার সুস্থ হওয়া পর্যন্ত অপেক্ষা করতে হয়।') },
        { p: l('You are not locked into your first choice, either. docker update --restart unless-stopped api changes the policy on an already-running container without recreating it, which is handy when you started something quickly and only later decided it should survive reboots. And remember that a restart policy is not a substitute for fixing the underlying problem: if a container keeps exiting, the policy will loyally keep restarting it, so the moment you see a container flip-flopping between "Restarting" and "Exited" in docker ps, stop and read docker logs before adding yet more resilience on top of a real bug.', 'আপনি প্রথম পছন্দে আটকে নেই। docker update --restart unless-stopped api একটি ইতিমধ্যে-চলমান কন্টেইনারের পলিসি পুনঃতৈরি ছাড়াই বদলায়, যা কাজে লাগে যখন আপনি দ্রুত কিছু চালু করে পরে ঠিক করেন এটি রিবুট টেকা উচিত। আর মনে রাখুন রিস্টার্ট পলিসি মূল সমস্যা সমাধানের বিকল্প নয়: একটি কন্টেইনার বারবার বেরোতে থাকলে পলিসি বিশ্বস্তভাবে একে রিস্টার্ট করতেই থাকবে, তাই docker ps-এ একটি কন্টেইনারকে "Restarting" ও "Exited"-এর মধ্যে দুলতে দেখলে আরও resilience যোগ করার আগে থামুন ও docker logs পড়ুন।') },
      ],
    },
    {
      h: l('Common mistakes', 'সাধারণ ভুল'),
      blocks: [
        { list: [
          l('Relying on "running" status when the app inside is actually broken, because there is no healthcheck.', 'হেলথচেক না থাকায় ভেতরের অ্যাপ আসলে ভাঙা হলেও "running" স্ট্যাটাসে ভরসা করা।'),
          l('Setting --restart always on a container with a broken image or bad config, so it crash-loops forever and buries the real error — read docker logs instead of just watching it restart.', 'ভাঙা ইমেজ বা খারাপ কনফিগসহ কন্টেইনারে --restart always দেওয়া, ফলে এটি চিরকাল crash-loop করে ও আসল এরর চাপা দেয়—শুধু রিস্টার্ট দেখার বদলে docker logs পড়ুন।'),
          l('Expecting a standalone --restart policy to react to an unhealthy healthcheck; by itself it only reacts to the process exiting, not to health.', 'ধরে নেওয়া একক --restart পলিসি unhealthy হেলথচেকে সাড়া দেবে; নিজে এটি শুধু প্রসেস বেরোলে সাড়া দেয়, health-এ নয়।'),
          l('Writing a healthcheck that is too aggressive (tiny interval, short timeout), so a briefly slow app is wrongly marked unhealthy.', 'খুব আক্রমণাত্মক হেলথচেক লেখা (ছোট interval, ছোট timeout), ফলে সামান্য ধীর অ্যাপ ভুল করে unhealthy চিহ্নিত হয়।'),
        ] },
      ],
    },
    {
      h: l('Remember in one line', 'এক লাইনে মনে রাখুন'),
      blocks: [
        { list: [
          l('A restart policy relaunches a container after it exits or the host reboots; --restart unless-stopped is the everyday default.', 'রিস্টার্ট পলিসি কন্টেইনার বেরোলে বা হোস্ট রিবুট করলে একে আবার চালায়; --restart unless-stopped দৈনন্দিন ডিফল্ট।'),
          l('A healthcheck reports whether the app truly works, not just whether the process is alive.', 'হেলথচেক বলে অ্যাপ সত্যিই কাজ করছে কি না, শুধু প্রসেস জীবিত কি না নয়।'),
          l('Use both together — the policy keeps it running, the healthcheck keeps it honest — and watch the logs so you are not just restarting a broken image.', 'দুটি একসঙ্গে নিন—পলিসি চালু রাখে, হেলথচেক সৎ রাখে—আর logs দেখুন যাতে শুধু একটি ভাঙা ইমেজ রিস্টার্ট না করেন।'),
        ] },
      ],
    },
  ],

  // ── dk-resources · Resource limits (CPU, memory) ──────────────────────────
  'dk-resources': [
    {
      h: l('What are resource limits?', 'রিসোর্স লিমিট কী?'),
      blocks: [
        { p: l('By default a container is not fenced off from the host CPU and memory — it can use as much as it wants, right up to everything the machine has. Resource limits change that. --memory sets a hard ceiling on how much RAM a container may use, and --cpus caps how much CPU time it may take, expressed in fractions of a core. You are telling Docker: this container gets at most this much, no matter how greedy the code inside becomes.', 'ডিফল্টে একটি কন্টেইনার হোস্টের CPU ও মেমরি থেকে আলাদা করা থাকে না—এটি যত খুশি ব্যবহার করতে পারে, মেশিনে যা আছে তার পুরোটা পর্যন্ত। রিসোর্স লিমিট এটি বদলায়। --memory একটি কন্টেইনার কতটা RAM নিতে পারবে তার একটি শক্ত সিলিং দেয়, আর --cpus কতটা CPU সময় নিতে পারবে তা সীমিত করে, কোরের ভগ্নাংশে প্রকাশ করা। আপনি ডকারকে বলছেন: ভেতরের কোড যতই লোভী হোক, এই কন্টেইনার সর্বোচ্চ এতটুকু পাবে।') },
        { p: l('The problem this solves is the "noisy neighbour." On a shared host you run several containers, and without limits a single one with a memory leak or a runaway loop can swallow all the RAM or pin every core, starving every other container and sometimes the host itself. Limits turn each container into a well-behaved tenant that cannot bring down its neighbours.', 'এটি যে সমস্যা সমাধান করে তা হলো "noisy neighbour"। একটি শেয়ার্ড হোস্টে আপনি কয়েকটি কন্টেইনার চালান, আর লিমিট ছাড়া একটি মেমরি লিক বা runaway loop-যুক্ত কন্টেইনার সব RAM গিলে বা প্রতিটি কোর দখল করে অন্য সব কন্টেইনার—কখনো হোস্টকেও—অভুক্ত করতে পারে। লিমিট প্রতিটি কন্টেইনারকে এমন একজন ভদ্র ভাড়াটে বানায় যে প্রতিবেশীদের ফেলে দিতে পারে না।') },
        { note: l('Think of a fuse and a speed limiter: one appliance cannot draw all the power or run away with the whole engine. --memory is the fuse; --cpus is the speed limiter.', 'একটি ফিউজ ও একটি স্পিড লিমিটার ভাবুন: একটি যন্ত্র সব শক্তি টানতে বা পুরো ইঞ্জিন নিয়ে ছুটতে পারে না। --memory হলো ফিউজ; --cpus হলো স্পিড লিমিটার।'), kind: 'tip' },
      ],
    },
    {
      h: l('How limits work', 'লিমিট কীভাবে কাজ করে'),
      blocks: [
        { steps: [
          l('You pass --memory and --cpus when you start the container.', 'কন্টেইনার চালু করার সময় আপনি --memory ও --cpus দেন।'),
          l('Docker configures the Linux kernel cgroups to enforce those ceilings on the container processes.', 'ডকার Linux kernel-এর cgroups কনফিগার করে যাতে ওই সিলিং কন্টেইনার প্রসেসে প্রয়োগ হয়।'),
          l('If the container tries to allocate more memory than its --memory limit, the kernel OOM killer terminates a process inside it — usually the main one — and the container stops.', 'কন্টেইনার তার --memory সীমার বেশি মেমরি নিতে চাইলে kernel-এর OOM killer ভেতরের একটি প্রসেস—সাধারণত প্রধানটি—বন্ধ করে দেয় ও কন্টেইনার থেমে যায়।'),
          l('If it wants more CPU than --cpus allows, it is not killed; it is throttled — simply made to wait — so it just runs slower.', '--cpus যতটা দেয় তার বেশি CPU চাইলে একে মারা হয় না; একে throttle করা হয়—শুধু অপেক্ষা করানো হয়—তাই এটি শুধু ধীরে চলে।'),
          l('docker stats shows live CPU and memory use against the limits, so you can right-size them.', 'docker stats লিমিটের বিপরীতে সরাসরি CPU ও মেমরি ব্যবহার দেখায়, যাতে আপনি সেগুলো ঠিকমতো মাপতে পারেন।'),
        ] },
        { code: `# cap memory at 512 MB and CPU at 1.5 cores
docker run -d --name api \\
  --memory 512m \\
  --cpus 1.5 \\
  myorg/api:1.4

# watch live resource usage against those limits
docker stats api`, caption: l('--memory is a hard cap enforced by the OOM killer; --cpus 1.5 means at most one and a half cores of CPU time.', '--memory একটি শক্ত সীমা যা OOM killer প্রয়োগ করে; --cpus 1.5 মানে সর্বোচ্চ দেড় কোর CPU সময়।') },
      ],
    },
    {
      h: l('Key limit flags', 'মূল লিমিট ফ্ল্যাগ'),
      blocks: [
        { table: {
          head: [l('Goal', 'লক্ষ্য'), l('Flag', 'ফ্ল্যাগ')],
          rows: [
            [l('Hard memory ceiling', 'শক্ত মেমরি সিলিং'), l('--memory 512m', '--memory 512m')],
            [l('Soft memory reservation', 'নরম মেমরি রিজার্ভেশন'), l('--memory-reservation 256m', '--memory-reservation 256m')],
            [l('Limit CPU to N cores', 'CPU N কোরে সীমিত'), l('--cpus 1.5', '--cpus 1.5')],
            [l('Relative CPU weight under contention', 'প্রতিযোগিতায় আপেক্ষিক CPU ওজন'), l('--cpu-shares 512', '--cpu-shares 512')],
          ],
        } },
        { note: l('--memory is a hard cap; --memory-reservation is only a soft target the kernel enforces when the host is under memory pressure. --cpus is a hard limit in cores; --cpu-shares (default 1024) is only a relative weight that matters when the CPU is contended.', '--memory একটি শক্ত সীমা; --memory-reservation শুধু একটি নরম লক্ষ্য যা হোস্ট মেমরি চাপে থাকলে kernel প্রয়োগ করে। --cpus কোরে একটি শক্ত সীমা; --cpu-shares (ডিফল্ট 1024) শুধু একটি আপেক্ষিক ওজন যা CPU-তে প্রতিযোগিতা থাকলে গুরুত্বপূর্ণ।'), kind: 'tip' },
      ],
    },
    {
      h: l('The OOM killer: what happens at the memory limit', 'OOM killer: মেমরি সীমায় পৌঁছালে যা ঘটে'),
      blocks: [
        { p: l('The most important thing to understand about --memory is what happens when a container reaches it. Unlike CPU, memory cannot be throttled — you cannot make a process wait for RAM it already needs to hold data. So when a container exceeds its memory limit, the Linux out-of-memory (OOM) killer steps in and kills a process inside the container to reclaim memory. That almost always kills your main application, and the container exits, typically with code 137.', '--memory সম্পর্কে সবচেয়ে গুরুত্বপূর্ণ যা বোঝার তা হলো কন্টেইনার সীমায় পৌঁছালে কী ঘটে। CPU-এর মতো নয়, মেমরি throttle করা যায় না—একটি প্রসেসকে তার দরকারি RAM-এর জন্য অপেক্ষা করানো যায় না। তাই কন্টেইনার মেমরি সীমা পার করলে Linux out-of-memory (OOM) killer এসে মেমরি ফেরাতে কন্টেইনারের ভেতরের একটি প্রসেস মেরে ফেলে। এটি প্রায় সবসময় আপনার প্রধান অ্যাপ মারে, ও কন্টেইনার সাধারণত কোড 137 দিয়ে বেরিয়ে যায়।') },
        { note: l('Set --memory too low and your container is silently OOM-killed the moment it spikes — you will see exit code 137 and "OOMKilled": true in docker inspect, often mistaken for a random crash. Always measure real usage with docker stats and leave headroom above the peak, not just the average.', '--memory খুব কম দিলে spike হওয়ার মুহূর্তেই আপনার কন্টেইনার নীরবে OOM-killed হয়—docker inspect-এ exit code 137 ও "OOMKilled": true দেখবেন, যা প্রায়ই এলোমেলো ক্র্যাশ ভাবা হয়। সবসময় docker stats দিয়ে আসল ব্যবহার মাপুন ও গড় নয়, peak-এর ওপরে জায়গা রাখুন।'), kind: 'warn' },
      ],
    },
    {
      h: l('When and where to use limits', 'কখন ও কোথায় লিমিট ব্যবহার করবেন'),
      blocks: [
        { p: l('Set limits on any host that runs more than one container, and especially in production, so one service cannot starve the rest. Base the numbers on measured usage: run the app under realistic load, watch docker stats, and set --memory a little above the observed peak and --cpus around the sustained need. On a single-purpose host running just one container you can be more relaxed, but a memory limit is still worth setting as a safety net against leaks. In Docker Compose and Kubernetes the same idea appears as resource limits and requests, so getting comfortable with --memory and --cpus here pays off everywhere.', 'একের বেশি কন্টেইনার চালায় এমন যেকোনো হোস্টে, বিশেষ করে production-এ লিমিট সেট করুন, যাতে একটি সার্ভিস বাকিদের অভুক্ত না করে। সংখ্যা মাপা ব্যবহারের ওপর ভিত্তি করুন: বাস্তব লোডে অ্যাপ চালান, docker stats দেখুন, এবং --memory পর্যবেক্ষণ করা peak-এর একটু ওপরে ও --cpus টেকসই প্রয়োজনের কাছাকাছি সেট করুন। শুধু একটি কন্টেইনার চালানো একক-উদ্দেশ্য হোস্টে আপনি বেশি শিথিল হতে পারেন, তবে লিক থেকে সুরক্ষার জাল হিসেবে একটি মেমরি লিমিট তখনো মূল্যবান। Docker Compose ও Kubernetes-এ একই ধারণা resource limits ও requests হিসেবে আসে, তাই এখানে --memory ও --cpus-এ স্বচ্ছন্দ হলে সর্বত্র কাজে লাগে।') },
        { p: l('When a container does get OOM-killed, resist the urge to just raise the limit blindly. First confirm with docker inspect that OOMKilled really is true, then decide whether the app genuinely needs more memory for its workload or is leaking memory that no limit will ever be big enough to contain. Raising the ceiling on a leaking app only delays the crash and hides the real bug. The same discipline applies to CPU: if a container is constantly throttled, check whether the work is truly CPU-bound before handing it more cores that another service may need.', 'একটি কন্টেইনার সত্যিই OOM-killed হলে কেবল সীমা বাড়িয়ে দেওয়ার তাড়না দমন করুন। প্রথমে docker inspect দিয়ে নিশ্চিত করুন OOMKilled সত্যিই true, তারপর ঠিক করুন অ্যাপের কাজের জন্য সত্যিই বেশি মেমরি দরকার নাকি এটি মেমরি leak করছে যা কোনো সীমাই যথেষ্ট বড় হয়ে ধরে রাখতে পারবে না। leak করা অ্যাপে সিলিং বাড়ানো শুধু ক্র্যাশ পেছায় ও আসল বাগ লুকায়। একই নিয়ম CPU-তেও: একটি কন্টেইনার সবসময় throttle হলে অন্য সার্ভিসের দরকারি কোর দেওয়ার আগে দেখুন কাজটি সত্যিই CPU-bound কি না।') },
      ],
    },
    {
      h: l('Common mistakes', 'সাধারণ ভুল'),
      blocks: [
        { list: [
          l('Running unbounded containers, so one memory leak takes down every service on the host.', 'সীমাহীন কন্টেইনার চালানো, ফলে একটি মেমরি লিক হোস্টের প্রতিটি সার্ভিস ফেলে দেয়।'),
          l('Setting --memory too low, so the container is OOM-killed (exit 137) under normal spikes and looks like a mysterious crash.', '--memory খুব কম সেট করা, ফলে সাধারণ spike-এ কন্টেইনার OOM-killed (exit 137) হয় ও রহস্যময় ক্র্যাশের মতো দেখায়।'),
          l('Guessing the numbers instead of measuring with docker stats under real load — too low throttles or kills, too high defeats the purpose.', 'বাস্তব লোডে docker stats দিয়ে মাপার বদলে সংখ্যা আন্দাজ করা—খুব কম হলে throttle বা kill, খুব বেশি হলে উদ্দেশ্যই ব্যর্থ।'),
          l('Confusing --cpus (a hard limit in cores) with --cpu-shares (only a relative weight that matters when the CPU is contended).', '--cpus (কোরে শক্ত সীমা) ও --cpu-shares (শুধু আপেক্ষিক ওজন যা CPU প্রতিযোগিতায় কাজে লাগে) গুলিয়ে ফেলা।'),
        ] },
      ],
    },
    {
      h: l('Remember in one line', 'এক লাইনে মনে রাখুন'),
      blocks: [
        { list: [
          l('--memory caps RAM and --cpus caps CPU, so one container cannot starve the others on a shared host.', '--memory RAM সীমিত করে ও --cpus CPU সীমিত করে, তাই একটি কন্টেইনার শেয়ার্ড হোস্টে অন্যদের অভুক্ত করতে পারে না।'),
          l('Over the memory limit the OOM killer kills the process (exit 137); over the CPU limit it is only throttled.', 'মেমরি সীমার ওপরে OOM killer প্রসেস মারে (exit 137); CPU সীমার ওপরে শুধু throttle হয়।'),
          l('Measure with docker stats and size the limits above the real peak with headroom — never guess.', 'docker stats দিয়ে মাপুন ও লিমিট আসল peak-এর ওপরে জায়গাসহ সেট করুন—কখনো আন্দাজ নয়।'),
        ] },
      ],
    },
  ],

  // ── dk-volumes · Named volumes ────────────────────────────────────────────
  'dk-volumes': [
    {
      h: l('What is a named volume?', 'নেমড ভলিউম কী?'),
      blocks: [
        { p: l('A named volume is a piece of storage that Docker creates and manages for you, living outside any single container in an area Docker controls on the host. You give it a name, mount it into a container at a path, and everything the container writes there is stored in the volume instead of in the container thin, throwaway layer. Because the volume is separate, the data outlives the container: stop it, remove it, recreate it from a newer image, and the volume — and every byte in it — is still there.', 'নেমড ভলিউম হলো ডকারের তৈরি ও পরিচালিত এক টুকরো স্টোরেজ, যা হোস্টে ডকারের নিয়ন্ত্রিত একটি জায়গায় যেকোনো একক কন্টেইনারের বাইরে থাকে। আপনি এটিকে একটি নাম দেন, একটি path-এ কন্টেইনারে মাউন্ট করেন, আর কন্টেইনার সেখানে যা লেখে তা কন্টেইনারের পাতলা, ফেলে-দেওয়া লেয়ারের বদলে ভলিউমে জমা হয়। ভলিউম আলাদা বলে ডেটা কন্টেইনারের চেয়ে বেশি বাঁচে: থামান, রিমুভ করুন, নতুন ইমেজ থেকে পুনঃতৈরি করুন—ভলিউম ও তার প্রতিটি বাইট তখনো থাকে।') },
        { p: l('The problem this solves is that a container own filesystem is ephemeral. When you docker rm a container, its writable layer is deleted with it, and anything the app wrote inside — database rows, uploaded files — is gone. Since containers are meant to be disposable and replaced on every deploy, you need a place to keep data that does not vanish when the container does. That place is a volume.', 'এটি যে সমস্যা সমাধান করে তা হলো একটি কন্টেইনারের নিজের filesystem ক্ষণস্থায়ী। কন্টেইনার docker rm করলে তার লেখার-যোগ্য লেয়ার এর সঙ্গে মুছে যায়, আর অ্যাপ ভেতরে যা লিখেছিল—ডেটাবেস রো, আপলোড করা ফাইল—হারিয়ে যায়। কন্টেইনার যেহেতু ফেলে-দেওয়ার মতো ও প্রতি deploy-তে বদলানো হয়, তাই এমন জায়গা দরকার যেখানে ডেটা কন্টেইনার গেলেও মুছে না যায়। সেই জায়গাই ভলিউম।') },
        { note: l('Think of an external hard drive you plug into any machine — the data stays even after the machine is scrapped. The machine is the container; the drive is the volume.', 'একটি বাহ্যিক হার্ড ড্রাইভ ভাবুন যা যেকোনো মেশিনে যুক্ত করেন—মেশিন বাতিল হলেও ডেটা থাকে। মেশিন হলো কন্টেইনার; ড্রাইভ হলো ভলিউম।'), kind: 'tip' },
      ],
    },
    {
      h: l('How named volumes work', 'নেমড ভলিউম কীভাবে কাজ করে'),
      blocks: [
        { steps: [
          l('You create a volume, or let -v create it automatically the first time you use its name.', 'আপনি একটি ভলিউম তৈরি করেন, অথবা নাম প্রথমবার ব্যবহারের সময় -v-কে স্বয়ংক্রিয়ভাবে তৈরি করতে দেন।'),
          l('You mount it into a container with -v name:/path, where /path is where the app expects its data.', '-v name:/path দিয়ে একে কন্টেইনারে মাউন্ট করেন, যেখানে /path হলো অ্যাপ তার ডেটা যেখানে আশা করে।'),
          l('The app reads and writes at that path exactly as if it were an ordinary directory — it does not know a volume is behind it.', 'অ্যাপ সেই path-এ ঠিক সাধারণ ডিরেক্টরির মতোই পড়ে ও লেখে—পেছনে যে একটি ভলিউম আছে তা জানে না।'),
          l('When you remove the container, the volume and its contents remain untouched.', 'আপনি কন্টেইনার রিমুভ করলে ভলিউম ও তার বিষয়বস্তু অক্ষত থাকে।'),
          l('Mount the same volume into a new container and the data is instantly back.', 'একই ভলিউম একটি নতুন কন্টেইনারে মাউন্ট করলে ডেটা সঙ্গে সঙ্গে ফিরে আসে।'),
        ] },
        { code: `docker volume create pgdata

docker run -d --name db \\
  -e POSTGRES_PASSWORD=secret \\
  -v pgdata:/var/lib/postgresql/data \\
  postgres:16`, caption: l('The data lives in pgdata, so removing and recreating the db container keeps every row.', 'ডেটা pgdata-তে থাকে, তাই db কন্টেইনার রিমুভ ও পুনঃতৈরি করলেও প্রতিটি রো থাকে।') },
      ],
    },
    {
      h: l('Key commands', 'মূল কমান্ড'),
      blocks: [
        { table: {
          head: [l('Goal', 'লক্ষ্য'), l('Command', 'কমান্ড')],
          rows: [
            [l('Create a volume', 'ভলিউম তৈরি'), l('docker volume create data', 'docker volume create data')],
            [l('Mount it', 'মাউন্ট করুন'), l('-v data:/var/lib', '-v data:/var/lib')],
            [l('List volumes', 'ভলিউম তালিকা'), l('docker volume ls', 'docker volume ls')],
            [l('Remove a volume', 'ভলিউম রিমুভ'), l('docker volume rm data', 'docker volume rm data')],
          ],
        } },
      ],
    },
    {
      h: l('Named volumes vs bind mounts', 'নেমড ভলিউম বনাম বাইন্ড মাউন্ট'),
      blocks: [
        { p: l('Both put data at a path inside the container, but they differ in who owns the storage and how portable it is. A named volume is managed by Docker; a bind mount points at a folder you choose on the host. Knowing which is which decides whether your setup travels cleanly to another machine.', 'দুটোই কন্টেইনারের ভেতরে একটি path-এ ডেটা রাখে, তবে স্টোরেজের মালিক কে ও তা কতটা পোর্টেবল তাতে পার্থক্য। নেমড ভলিউম ডকার পরিচালনা করে; বাইন্ড মাউন্ট আপনার বেছে নেওয়া হোস্টের একটি ফোল্ডারে নির্দেশ করে। কোনটি কী জানা ঠিক করে আপনার সেটআপ অন্য মেশিনে পরিষ্কারভাবে যায় কি না।') },
        { table: {
          head: [l('Aspect', 'দিক'), l('Named volume', 'নেমড ভলিউম'), l('Bind mount', 'বাইন্ড মাউন্ট')],
          rows: [
            [l('Managed by', 'পরিচালনা করে'), l('Docker, in an area it controls', 'ডকার, তার নিয়ন্ত্রিত একটি জায়গায়'), l('You — any path you choose on the host', 'আপনি—হোস্টে যেকোনো বেছে নেওয়া path')],
            [l('You specify', 'আপনি যা দেন'), l('A name: -v data:/path', 'একটি নাম: -v data:/path'), l('A host path: -v /host/path:/path', 'একটি হোস্ট path: -v /host/path:/path')],
            [l('Portability', 'পোর্টেবিলিটি'), l('Portable; no dependency on host layout', 'পোর্টেবল; হোস্ট বিন্যাসের ওপর নির্ভরতা নেই'), l('Tied to the exact host path', 'নির্দিষ্ট হোস্ট path-এর সঙ্গে বাঁধা')],
            [l('Best for', 'কার জন্য'), l('Databases and production data', 'ডেটাবেস ও production ডেটা'), l('Live-editing source in development', 'development-এ সোর্স লাইভ-এডিট')],
            [l('If the target already has image files', 'target-এ আগেই ইমেজ ফাইল থাকলে'), l('An empty volume is seeded from the image', 'খালি ভলিউম ইমেজ থেকে ভরা হয়'), l('The host directory hides the image files', 'হোস্ট ডিরেক্টরি ইমেজ ফাইল ঢেকে দেয়')],
          ],
        } },
      ],
    },
    {
      h: l('When and where to use a volume', 'কখন ও কোথায় ভলিউম ব্যবহার করবেন'),
      blocks: [
        { p: l('Reach for a named volume for any data that must survive the container: database files, user uploads, caches you want to keep warm, application state. It is the default choice in production because Docker manages the location, it is portable across hosts (nothing depends on a specific host path), and it is easy to back up and to share between containers. Create it explicitly with docker volume create when you want it to exist before the container, or simply name it in -v and Docker creates it on first use. The one habit to build is treating the container as disposable and the volume as the real home of your data.', 'কন্টেইনার টিকে যেতে হবে এমন যেকোনো ডেটার জন্য নেমড ভলিউম নিন: ডেটাবেস ফাইল, user upload, গরম রাখতে চাওয়া cache, অ্যাপ্লিকেশন state। production-এ এটি ডিফল্ট পছন্দ কারণ ডকার জায়গাটি পরিচালনা করে, এটি হোস্টজুড়ে পোর্টেবল (কোনো নির্দিষ্ট হোস্ট path-এর ওপর নির্ভর করে না), এবং ব্যাকআপ ও কন্টেইনারের মধ্যে শেয়ার করা সহজ। কন্টেইনারের আগে থাকুক চাইলে docker volume create দিয়ে স্পষ্টভাবে তৈরি করুন, নয়তো শুধু -v-তে নাম দিন, ডকার প্রথম ব্যবহারে তৈরি করে। একটি অভ্যাস গড়ুন: কন্টেইনারকে ফেলে-দেওয়ার মতো ও ভলিউমকে আপনার ডেটার আসল ঘর হিসেবে ভাবা।') },
        { p: l('A handful of commands make volumes easy to live with day to day. docker volume ls shows everything that exists, docker volume inspect data reveals where it physically lives on the host and which containers reference it, and because a single volume can be mounted into several containers at once, they can share state through it. Backups follow the same pattern you use for anything else: run a throwaway container that mounts the volume read-only alongside a host directory, and write a compressed archive out to the host — the data never has to leave the Docker-managed world uncontrolled.', 'কয়েকটি কমান্ড ভলিউম প্রতিদিন সামলানো সহজ করে। docker volume ls যা আছে সব দেখায়, docker volume inspect data দেখায় এটি হোস্টে শারীরিকভাবে কোথায় থাকে ও কোন কন্টেইনার একে ব্যবহার করে, আর একটি ভলিউম একসঙ্গে কয়েকটি কন্টেইনারে মাউন্ট করা যায় বলে তারা এর মাধ্যমে state শেয়ার করতে পারে। ব্যাকআপ একই প্যাটার্ন অনুসরণ করে: একটি ফেলে-দেওয়া কন্টেইনার চালান যা ভলিউমটি একটি হোস্ট ডিরেক্টরির পাশে read-only মাউন্ট করে ও হোস্টে একটি কম্প্রেসড archive লেখে—ডেটা কখনো ডকার-পরিচালিত জগৎ ছেড়ে অনিয়ন্ত্রিতভাবে যায় না।') },
      ],
    },
    {
      h: l('Common mistakes', 'সাধারণ ভুল'),
      blocks: [
        { list: [
          l('Storing database data in the container instead of a volume, then losing everything when the container is replaced.', 'ভলিউমের বদলে কন্টেইনারে ডেটাবেস ডেটা রাখা, তারপর কন্টেইনার বদলালে সব হারানো।'),
          l('Assuming docker rm deletes the data too — volumes persist after the container is gone and must be removed separately with docker volume rm.', 'ধরে নেওয়া docker rm ডেটাও মোছে—ভলিউম কন্টেইনার যাওয়ার পরও থাকে ও আলাদাভাবে docker volume rm দিয়ে রিমুভ করতে হয়।'),
          l('Letting anonymous and unused volumes quietly pile up and eat disk; prune them deliberately with docker volume prune, which permanently deletes unused volumes.', 'anonymous ও অব্যবহৃত ভলিউম নীরবে জমে ডিস্ক খেতে দেওয়া; docker volume prune দিয়ে ইচ্ছাকৃতভাবে সাফ করুন, যা অব্যবহৃত ভলিউম স্থায়ীভাবে মোছে।'),
          l('Mounting a volume over a directory the image already populated and being surprised: an empty named volume is initialised from the image, but a non-empty one hides those files.', 'ইমেজ যে ডিরেক্টরি আগেই ভরেছে তার ওপর ভলিউম মাউন্ট করে অবাক হওয়া: খালি নেমড ভলিউম ইমেজ থেকে শুরু হয়, তবে অ-খালিটি সেই ফাইল ঢেকে দেয়।'),
        ] },
      ],
    },
    {
      h: l('Remember in one line', 'এক লাইনে মনে রাখুন'),
      blocks: [
        { list: [
          l('A named volume is Docker-managed storage that lives outside the container, so data survives restart and removal.', 'নেমড ভলিউম হলো ডকার-পরিচালিত স্টোরেজ যা কন্টেইনারের বাইরে থাকে, তাই ডেটা রিস্টার্ট ও রিমুভে টিকে থাকে।'),
          l('Mount it with -v name:/path for databases and anything you must keep between runs.', 'ডেটাবেস ও রানের মধ্যে রাখতে হওয়া যেকোনো কিছুর জন্য -v name:/path দিয়ে মাউন্ট করুন।'),
          l('Volumes do not disappear with docker rm — clean up unused ones on purpose so they do not pile up.', 'ভলিউম docker rm-এ মুছে যায় না—জমে যাওয়া এড়াতে অব্যবহৃতগুলো ইচ্ছাকৃতভাবে পরিষ্কার করুন।'),
        ] },
      ],
    },
  ],

  // ── dk-bind-mounts · Bind mounts ──────────────────────────────────────────
  'dk-bind-mounts': [
    {
      h: l('What is a bind mount?', 'বাইন্ড মাউন্ট কী?'),
      blocks: [
        { p: l('A bind mount maps a directory (or a single file) from the host machine straight into a container. You point it at an absolute host path, choose where it appears inside the container, and from then on both sides see the exact same files in real time. Edit a file on the host and the change is instantly visible inside the container; write a file from the container and it appears on the host. Nothing is copied — it is the same directory, mounted in two places.', 'বাইন্ড মাউন্ট হোস্ট মেশিনের একটি ডিরেক্টরি (বা একটি ফাইল) সরাসরি কন্টেইনারে ম্যাপ করে। আপনি একটি absolute হোস্ট path-এ নির্দেশ করেন, কন্টেইনারের ভেতরে কোথায় দেখাবে বেছে নেন, আর তারপর থেকে দুই পক্ষই real time-এ হুবহু একই ফাইল দেখে। হোস্টে একটি ফাইল এডিট করলে কন্টেইনারের ভেতরে সঙ্গে সঙ্গে দেখা যায়; কন্টেইনার থেকে একটি ফাইল লিখলে তা হোস্টে দেখা যায়। কিছুই কপি হয় না—এটি একই ডিরেক্টরি, দুই জায়গায় মাউন্ট করা।') },
        { p: l('The problem this solves is the slow edit-build-run loop in development. Without a bind mount, changing one line of source means rebuilding the image and recreating the container to see the effect. With your source directory bind-mounted into the container, the running app sees your edits immediately, so hot-reload and file watchers work just as they do on your laptop. It turns a container from a frozen snapshot into a live development environment.', 'এটি যে সমস্যা সমাধান করে তা হলো development-এ ধীর edit-build-run চক্র। বাইন্ড মাউন্ট ছাড়া সোর্সের একটি লাইন বদলানো মানে ফল দেখতে ইমেজ রিবিল্ড ও কন্টেইনার পুনঃতৈরি করা। আপনার সোর্স ডিরেক্টরি কন্টেইনারে বাইন্ড-মাউন্ট করলে চলমান অ্যাপ আপনার এডিট সঙ্গে সঙ্গে দেখে, তাই hot-reload ও file watcher ঠিক ল্যাপটপের মতোই কাজ করে। এটি কন্টেইনারকে একটি জমাট snapshot থেকে একটি লাইভ development পরিবেশে বদলে দেয়।') },
        { note: l('Think of a shared folder between two computers — edit on one side and it changes instantly on the other. The host and the container share one folder.', 'দুটি কম্পিউটারের মধ্যে একটি শেয়ার্ড ফোল্ডার ভাবুন—এক পাশে এডিট করলে অন্য পাশে সঙ্গে সঙ্গে বদলায়। হোস্ট ও কন্টেইনার একটি ফোল্ডার ভাগ করে।'), kind: 'tip' },
      ],
    },
    {
      h: l('How bind mounts work', 'বাইন্ড মাউন্ট কীভাবে কাজ করে'),
      blocks: [
        { steps: [
          l('You choose a host directory (often your project folder) and a path inside the container.', 'আপনি একটি হোস্ট ডিরেক্টরি (প্রায়ই আপনার প্রকল্প ফোল্ডার) ও কন্টেইনারের ভেতরে একটি path বেছে নেন।'),
          l('You start the container with -v /host/path:/container/path (or -v "$PWD":/app for the current directory).', '-v /host/path:/container/path (বা বর্তমান ডিরেক্টরির জন্য -v "$PWD":/app) দিয়ে কন্টেইনার চালু করেন।'),
          l('Docker mounts the host directory over that path inside the container — the two are now the same files.', 'ডকার হোস্ট ডিরেক্টরিটি কন্টেইনারের ভেতরের সেই path-এর ওপর মাউন্ট করে—দুটি এখন একই ফাইল।'),
          l('The app inside runs against your live source, so a save on the host triggers its reloader.', 'ভেতরের অ্যাপ আপনার লাইভ সোর্সে চলে, তাই হোস্টে একটি save তার reloader চালায়।'),
          l('Stop the container and the files are still on the host, exactly where they always were — they were never inside the container to begin with.', 'কন্টেইনার থামান, ফাইলগুলো তখনো হোস্টে, ঠিক যেখানে সবসময় ছিল—এগুলো আসলে কখনো কন্টেইনারের ভেতরে ছিলই না।'),
        ] },
        { code: `# changes on the host appear instantly inside the container
docker run -d --name dev \\
  -p 3000:3000 \\
  -v "$PWD":/app \\
  -w /app \\
  node:20 npm run dev`, caption: l('The current host directory is mounted at /app, so saving a file triggers the app to reload.', 'বর্তমান হোস্ট ডিরেক্টরি /app-এ মাউন্ট, তাই একটি ফাইল সেভ করলে অ্যাপ রিলোড হয়।') },
      ],
    },
    {
      h: l('Bind mounts vs named volumes', 'বাইন্ড মাউন্ট বনাম নেমড ভলিউম'),
      blocks: [
        { p: l('The two mount types look similar on the command line but serve opposite purposes. A bind mount gives you a live window onto host files — ideal for development. A named volume gives Docker-managed, portable storage — ideal for production data. Choosing the wrong one is the most common storage mistake in Docker.', 'দুই ধরনের মাউন্ট কমান্ড লাইনে একরকম দেখালেও উল্টো উদ্দেশ্যে কাজ করে। বাইন্ড মাউন্ট হোস্ট ফাইলে একটি লাইভ জানালা দেয়—development-এ আদর্শ। নেমড ভলিউম ডকার-পরিচালিত, পোর্টেবল স্টোরেজ দেয়—production ডেটায় আদর্শ। ভুলটি বাছা ডকারে সবচেয়ে সাধারণ স্টোরেজ ভুল।') },
        { table: {
          head: [l('Aspect', 'দিক'), l('Bind mount', 'বাইন্ড মাউন্ট'), l('Named volume', 'নেমড ভলিউম')],
          rows: [
            [l('Managed by', 'পরিচালনা করে'), l('You — any path you choose on the host', 'আপনি—হোস্টে যেকোনো বেছে নেওয়া path'), l('Docker, in an area it controls', 'ডকার, তার নিয়ন্ত্রিত একটি জায়গায়')],
            [l('You specify', 'আপনি যা দেন'), l('A host path: -v /host/path:/path', 'একটি হোস্ট path: -v /host/path:/path'), l('A name: -v data:/path', 'একটি নাম: -v data:/path')],
            [l('Portability', 'পোর্টেবিলিটি'), l('Tied to the exact host path', 'নির্দিষ্ট হোস্ট path-এর সঙ্গে বাঁধা'), l('Portable; no dependency on host layout', 'পোর্টেবল; হোস্ট বিন্যাসের ওপর নির্ভরতা নেই')],
            [l('Best for', 'কার জন্য'), l('Live-editing source in development', 'development-এ সোর্স লাইভ-এডিট'), l('Databases and production data', 'ডেটাবেস ও production ডেটা')],
            [l('If the target already has image files', 'target-এ আগেই ইমেজ ফাইল থাকলে'), l('The host directory hides the image files', 'হোস্ট ডিরেক্টরি ইমেজ ফাইল ঢেকে দেয়'), l('An empty volume is seeded from the image', 'খালি ভলিউম ইমেজ থেকে ভরা হয়')],
          ],
        } },
      ],
    },
    {
      h: l('Useful bind-mount syntax', 'কাজের বাইন্ড-মাউন্ট সিনট্যাক্স'),
      blocks: [
        { table: {
          head: [l('Goal', 'লক্ষ্য'), l('Syntax', 'সিনট্যাক্স')],
          rows: [
            [l('Mount the current directory', 'বর্তমান ডিরেক্টরি মাউন্ট'), l('-v "$PWD":/app', '-v "$PWD":/app')],
            [l('Mount an absolute host path', 'absolute হোস্ট path মাউন্ট'), l('-v /home/me/app:/app', '-v /home/me/app:/app')],
            [l('Make it read-only', 'read-only করুন'), l('-v /etc/config:/app/config:ro', '-v /etc/config:/app/config:ro')],
            [l('Verbose --mount form', 'বিস্তারিত --mount রূপ'), l('--mount type=bind,source="$PWD",target=/app', '--mount type=bind,source="$PWD",target=/app')],
          ],
        } },
        { note: l('Add :ro to mount a bind read-only when the container should see host files but never change them — for example a config file or certificates.', 'কন্টেইনার হোস্ট ফাইল দেখবে কিন্তু কখনো বদলাবে না এমন হলে বাইন্ডকে read-only করতে :ro যোগ করুন—যেমন একটি config ফাইল বা certificate।'), kind: 'tip' },
      ],
    },
    {
      h: l('When and where to use a bind mount', 'কখন ও কোথায় বাইন্ড মাউন্ট ব্যবহার করবেন'),
      blocks: [
        { p: l('Use a bind mount in development, where you want the container to run your live code and config from the host: mount your source for hot-reload, mount a single config file, or mount a directory of test fixtures. It is also handy for one-off tasks that need host files — for example the backup pattern where a throwaway container bind-mounts the current directory to write an archive into it. Avoid bind-mounting application code in production: it ties the container to a specific host layout, breaks portability, and can silently replace or expose the image own files. In production, prefer named volumes for data and let the image carry the code.', 'development-এ বাইন্ড মাউন্ট ব্যবহার করুন, যেখানে কন্টেইনার হোস্ট থেকে আপনার লাইভ কোড ও config চালাক চান: hot-reload-এর জন্য সোর্স মাউন্ট করুন, একটি config ফাইল মাউন্ট করুন, বা test fixture-এর একটি ডিরেক্টরি মাউন্ট করুন। হোস্ট ফাইল দরকার এমন একবারের কাজেও এটি কাজের—যেমন ব্যাকআপ প্যাটার্ন যেখানে একটি ফেলে-দেওয়া কন্টেইনার বর্তমান ডিরেক্টরি বাইন্ড-মাউন্ট করে তাতে একটি archive লেখে। production-এ অ্যাপ্লিকেশন কোড বাইন্ড-মাউন্ট এড়ান: এটি কন্টেইনারকে একটি নির্দিষ্ট হোস্ট বিন্যাসে বাঁধে, পোর্টেবিলিটি ভাঙে, এবং নীরবে ইমেজের নিজের ফাইল বদলে বা ফাঁস করতে পারে। production-এ ডেটায় নেমড ভলিউম নিন ও কোড ইমেজেই বহন করতে দিন।') },
        { p: l('A useful middle ground during development is to bind-mount only your source directory while keeping the installed dependencies inside the image or in an anonymous volume layered on top. That way you get instant code reloads without your host directory overwriting the node_modules (or vendored packages) that were installed when the image was built — the classic cause of a container that runs fine until you add a bind mount and then cannot find its own dependencies.', 'development-এ একটি কাজের মাঝামাঝি পথ হলো শুধু আপনার সোর্স ডিরেক্টরি বাইন্ড-মাউন্ট করা, আর ইনস্টল করা dependency ইমেজের ভেতরে বা ওপরে বসানো একটি anonymous ভলিউমে রাখা। তাতে আপনি সঙ্গে সঙ্গে কোড রিলোড পান অথচ আপনার হোস্ট ডিরেক্টরি ইমেজ বিল্ডের সময় ইনস্টল করা node_modules (বা vendored package) override করে না—এটিই সেই ক্লাসিক কারণ যেখানে একটি কন্টেইনার ঠিক চলে যতক্ষণ না বাইন্ড মাউন্ট যোগ করেন, তারপর নিজের dependency খুঁজে পায় না।') },
        { note: l('Bind-mounting a host directory over the app code in production can expose or break the running image — the host files simply override whatever the image shipped at that path.', 'production-এ অ্যাপ কোডের ওপর একটি হোস্ট ডিরেক্টরি বাইন্ড-মাউন্ট করলে চলমান ইমেজ ফাঁস বা ভাঙতে পারে—হোস্ট ফাইল সেই path-এ ইমেজ যা পাঠিয়েছিল তা override করে।'), kind: 'warn' },
      ],
    },
    {
      h: l('Common mistakes', 'সাধারণ ভুল'),
      blocks: [
        { list: [
          l('Bind-mounting a host directory over the app code in production, exposing or breaking the running image.', 'production-এ অ্যাপের কোডের ওপর একটি হোস্ট ডিরেক্টরি বাইন্ড-মাউন্ট করা, চলমান ইমেজ ফাঁস বা ভাঙা।'),
          l('Expecting a bind mount to be portable — it depends on an exact host path that will not exist on another machine or in CI.', 'বাইন্ড মাউন্টকে পোর্টেবল ভাবা—এটি একটি নির্দিষ্ট হোস্ট path-এর ওপর নির্ভর করে যা অন্য মেশিনে বা CI-তে থাকবে না।'),
          l('Mounting your project over /app and clobbering the image node_modules, so the app cannot find its dependencies — a common fix is an anonymous volume for that subdirectory.', 'আপনার প্রকল্প /app-এর ওপর মাউন্ট করে ইমেজের node_modules চাপা দেওয়া, ফলে অ্যাপ তার dependency খুঁজে পায় না—একটি সাধারণ সমাধান সেই সাবডিরেক্টরির জন্য একটি anonymous ভলিউম।'),
          l('Forgetting that a bind mount is two-way: a destructive command inside the container can delete or overwrite the real files on your host.', 'ভুলে যাওয়া যে বাইন্ড মাউন্ট দ্বিমুখী: কন্টেইনারের ভেতরে একটি ধ্বংসাত্মক কমান্ড আপনার হোস্টের আসল ফাইল মুছতে বা override করতে পারে।'),
        ] },
      ],
    },
    {
      h: l('Remember in one line', 'এক লাইনে মনে রাখুন'),
      blocks: [
        { list: [
          l('A bind mount maps a host directory straight into the container; both sides share the same live files.', 'বাইন্ড মাউন্ট একটি হোস্ট ডিরেক্টরি সরাসরি কন্টেইনারে ম্যাপ করে; দুই পক্ষ একই লাইভ ফাইল ভাগ করে।'),
          l('It is the go-to for local development and hot-reload — edits on the host appear instantly inside.', 'লোকাল development ও hot-reload-এর প্রধান পছন্দ—হোস্টের এডিট ভেতরে সঙ্গে সঙ্গে দেখা যায়।'),
          l('It depends on host paths and is less portable than a named volume, so keep it out of production code.', 'এটি হোস্ট path-এর ওপর নির্ভর করে ও নেমড ভলিউমের চেয়ে কম পোর্টেবল, তাই production কোড থেকে দূরে রাখুন।'),
        ] },
      ],
    },
  ],
}
