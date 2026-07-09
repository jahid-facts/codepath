// Deep, bilingual (English / Bangla) teaching guides for the Kubernetes
// Foundations and Pods topics. Shape mirrors app/course-guides.js and
// app/guides/git/f.js: each guide is an array of sections { h, blocks }, rendered
// by GuideBlock in app/LearningApp.js. Facts (definition, analogy, action,
// trade-off, mistake), kubectl command tables, and YAML manifests are drawn from
// rawTopics, commands, and examples in app/courses/kubernetes.js. In { code }
// blocks the content is plain kubectl or YAML — no shell/Actions interpolation.

const l = (en, bn) => ({ en, bn })

export default {
  // ── k8s-what · What is Kubernetes? ────────────────────────────────────────
  'k8s-what': [
    {
      h: l('What is Kubernetes?', 'কুবারনেটিস কী?'),
      blocks: [
        { p: l('Kubernetes (often shortened to k8s) is a container orchestrator: software that runs and manages containers across a whole cluster of machines automatically. Instead of starting and babysitting each container by hand, you describe the state you want — say, "three healthy copies of my web app, reachable on port 80" — and Kubernetes decides which machine each container lands on, starts them, watches them, restarts any that crash, and moves them elsewhere if a machine dies. You stop managing individual containers and start managing a desired outcome.', 'কুবারনেটিস (সংক্ষেপে k8s) হলো একটি কন্টেইনার অর্কেস্ট্রেটর: এমন সফটওয়্যার যা একটি মেশিন ক্লাস্টারজুড়ে কন্টেইনার স্বয়ংক্রিয়ভাবে চালায় ও পরিচালনা করে। প্রতিটি কন্টেইনার হাতে চালু করে খেয়াল রাখার বদলে, আপনি কাঙ্ক্ষিত অবস্থা বর্ণনা করেন—যেমন, "আমার web অ্যাপের তিনটি সুস্থ কপি, port 80-এ পৌঁছানো যায়"—আর কুবারনেটিস ঠিক করে কোন কন্টেইনার কোন মেশিনে বসবে, সেগুলো চালু করে, নজর রাখে, ক্র্যাশ করলে রিস্টার্ট করে, আর কোনো মেশিন মরে গেলে অন্য মেশিনে সরিয়ে নেয়। আপনি আর আলাদা আলাদা কন্টেইনার নয়, একটি কাঙ্ক্ষিত ফলাফল পরিচালনা করেন।') },
        { p: l('The problem it solves is operating containers at scale. Running one container with docker run is easy; running dozens across many servers — keeping them alive through crashes and reboots, spreading load, rolling out new versions without downtime, and replacing failed machines — is a full-time job when done by hand. Kubernetes turns all of that into automation that runs continuously, so the system keeps itself in the shape you asked for even while you sleep.', 'এটি যে সমস্যা সমাধান করে তা হলো স্কেলে কন্টেইনার চালানো। docker run দিয়ে একটি কন্টেইনার চালানো সহজ; কিন্তু অনেক সার্ভারজুড়ে কয়েক ডজন চালানো—ক্র্যাশ ও রিবুটের মধ্যেও সেগুলো সচল রাখা, লোড ছড়ানো, ডাউনটাইম ছাড়া নতুন ভার্সন রোলআউট করা, ও ব্যর্থ মেশিন বদলানো—হাতে করলে এটি একটি পূর্ণকালীন কাজ। কুবারনেটিস এই সবকিছুকে এমন অটোমেশনে পরিণত করে যা অবিরত চলে, তাই আপনি ঘুমিয়ে থাকলেও সিস্টেম নিজেকে আপনার চাওয়া আকারে ধরে রাখে।') },
        { note: l('Think of an air-traffic controller for containers — deciding where each one runs, restarting crashes, and balancing the load. You do not tell each plane where to taxi; you set the rules and the controller keeps every flight moving safely.', 'কন্টেইনারের জন্য একজন এয়ার-ট্রাফিক কন্ট্রোলার ভাবুন—কোনটি কোথায় চলবে, ক্র্যাশ রিস্টার্ট ও লোড ভারসাম্য ঠিক করে। আপনি প্রতিটি প্লেনকে কোথায় যেতে হবে বলেন না; আপনি নিয়ম ঠিক করেন আর কন্ট্রোলার প্রতিটি ফ্লাইট নিরাপদে চালু রাখে।'), kind: 'tip' },
      ],
    },
    {
      h: l('How it works, step by step', 'কীভাবে কাজ করে, ধাপে ধাপে'),
      blocks: [
        { steps: [
          l('You describe the desired state — for example "run three replicas of nginx" — either as a YAML manifest or with a kubectl command.', 'আপনি কাঙ্ক্ষিত অবস্থা বর্ণনা করেন—যেমন "nginx-এর তিনটি রেপ্লিকা চালাও"—হয় একটি YAML ম্যানিফেস্ট হিসেবে বা একটি kubectl কমান্ড দিয়ে।'),
          l('Kubernetes stores that desired state and its scheduler picks which node each pod should run on, based on free CPU and memory.', 'কুবারনেটিস সেই কাঙ্ক্ষিত অবস্থা সংরক্ষণ করে ও এর scheduler ফাঁকা CPU ও memory দেখে ঠিক করে কোন pod কোন node-এ চলবে।'),
          l('The nodes pull the container images and start the containers, and Kubernetes records that they are now running.', 'node-গুলো কন্টেইনার image টেনে এনে কন্টেইনার চালু করে, আর কুবারনেটিস লিখে রাখে যে এগুলো এখন চলছে।'),
          l('A control loop constantly compares the real state to your desired state. If a container crashes or a node dies, the count drops below three.', 'একটি কন্ট্রোল লুপ অবিরত বাস্তব অবস্থাকে আপনার কাঙ্ক্ষিত অবস্থার সঙ্গে তুলনা করে। কোনো কন্টেইনার ক্র্যাশ করলে বা node মরে গেলে সংখ্যা তিনের নিচে নামে।'),
          l('Kubernetes notices the gap and creates a replacement automatically to bring reality back to three — this is self-healing, and it never stops running.', 'কুবারনেটিস পার্থক্যটি লক্ষ্য করে ও স্বয়ংক্রিয়ভাবে একটি প্রতিস্থাপন তৈরি করে বাস্তবকে আবার তিনে ফেরায়—এটাই self-healing, ও এটি কখনো থামে না।'),
        ] },
        { code: `# Tell Kubernetes the desired state: three replicas of nginx
kubectl create deployment web --image=nginx:1.25 --replicas=3

# Kubernetes places the pods across the cluster and keeps them running
kubectl get pods -o wide

# Delete one pod by hand to simulate a crash
kubectl delete pod web-6d9c-abcde

# Look again — Kubernetes has already created a fresh pod to replace it
kubectl get pods`, caption: l('You declare "three replicas", then delete one pod. Kubernetes detects that reality no longer matches your desired state and recreates the pod automatically — no human action needed.', 'আপনি "তিন রেপ্লিকা" ঘোষণা করেন, তারপর একটি pod মুছে ফেলেন। কুবারনেটিস বুঝে ফেলে যে বাস্তব আর আপনার কাঙ্ক্ষিত অবস্থার সঙ্গে মেলে না ও pod-টি স্বয়ংক্রিয়ভাবে আবার তৈরি করে—কোনো মানুষের হস্তক্ষেপ ছাড়াই।') },
      ],
    },
    {
      h: l('What Kubernetes actually does for you', 'কুবারনেটিস আপনার জন্য আসলে কী করে'),
      blocks: [
        { table: {
          head: [l('Capability', 'সক্ষমতা'), l('What it means for you', 'আপনার কাছে যা বোঝায়')],
          rows: [
            [l('Scheduling', 'শিডিউলিং'), l('Places each pod on a node with enough free CPU and memory, so machines are packed efficiently.', 'প্রতিটি pod-কে যথেষ্ট ফাঁকা CPU ও memory-যুক্ত একটি node-এ বসায়, যাতে মেশিন দক্ষভাবে ভরে।')],
            [l('Self-healing', 'স্ব-নিরাময়'), l('Restarts crashed containers and reschedules pods off dead nodes, with no human on call.', 'ক্র্যাশ করা কন্টেইনার রিস্টার্ট করে ও মরা node থেকে pod সরিয়ে পুনঃশিডিউল করে, কেউ অন-কল না থেকেও।')],
            [l('Scaling', 'স্কেলিং'), l('Adds or removes replicas on demand, manually or automatically as load rises and falls.', 'চাহিদা অনুযায়ী রেপ্লিকা যোগ বা সরায়, লোড বাড়া-কমার সঙ্গে হাতে বা স্বয়ংক্রিয়ভাবে।')],
            [l('Rollouts & rollback', 'রোলআউট ও রোলব্যাক'), l('Ships new versions gradually with zero downtime and reverts instantly if something breaks.', 'নতুন ভার্সন ধীরে ধীরে জিরো-ডাউনটাইমে পাঠায় ও কিছু ভাঙলে তাৎক্ষণিক ফিরিয়ে নেয়।')],
            [l('Service discovery & load balancing', 'সার্ভিস ডিসকভারি ও লোড ব্যালান্সিং'), l('Gives pods a stable name and spreads traffic across the healthy replicas behind it.', 'pod-দের একটি স্থিতিশীল নাম দেয় ও তার পেছনের সুস্থ রেপ্লিকাগুলোয় ট্রাফিক ছড়ায়।')],
            [l('Config & secrets', 'কনফিগ ও সিক্রেট'), l('Injects configuration and credentials into containers without baking them into the image.', 'image-এ না ঢুকিয়ে কন্টেইনারে কনফিগ ও credential দেয়।')],
          ],
        } },
      ],
    },
    {
      h: l('When and where to use it', 'কখন ও কোথায় ব্যবহার করবেন'),
      blocks: [
        { p: l('Reach for Kubernetes when you genuinely need resilient, scalable automation across more than one machine: many services that must stay up, traffic that rises and falls, teams shipping frequent releases, or a requirement to survive a server failing at 3 a.m. In those settings the automation earns its keep — the cluster reschedules, scales, and heals faster and more reliably than a human ever could. The right approach is to describe the state you want in YAML and let Kubernetes create, place, and heal the containers to match.', 'কুবারনেটিসের দিকে যান যখন আপনার সত্যিই একের বেশি মেশিনজুড়ে স্থিতিস্থাপক, স্কেলযোগ্য অটোমেশন দরকার: অনেক সার্ভিস যা সচল থাকতে হবে, ওঠানামা করা ট্রাফিক, ঘন ঘন রিলিজ পাঠানো দল, বা রাত ৩টায় একটি সার্ভার মরে গেলেও টিকে থাকার প্রয়োজন। এমন পরিস্থিতিতে অটোমেশন তার মূল্য তুলে আনে—ক্লাস্টার একজন মানুষের চেয়ে দ্রুত ও নির্ভরযোগ্যভাবে পুনঃশিডিউল, স্কেল ও নিরাময় করে। সঠিক পথ হলো YAML-এ কাঙ্ক্ষিত অবস্থা বর্ণনা করা এবং কুবারনেটিসকে মেলাতে কন্টেইনার তৈরি, স্থাপন ও নিরাময় করতে দেওয়া।') },
        { p: l('But Kubernetes gives that resilience at the cost of significant complexity you must learn and operate. For a tiny app that a single Docker host would run just fine, a cluster is overkill: you now maintain a control plane, networking, and YAML for something a docker run once solved. A good rule is to adopt Kubernetes when the pain of running things by hand is bigger than the pain of running a cluster — not before.', 'তবে কুবারনেটিস সেই স্থিতিস্থাপকতা দেয় উল্লেখযোগ্য জটিলতার বিনিময়ে, যা আপনাকে শিখতে ও পরিচালনা করতে হয়। একটি ছোট অ্যাপের জন্য যা একটি একক Docker হোস্টেই ভালো চলত, একটি ক্লাস্টার বাড়াবাড়ি: এখন আপনি একটি control plane, networking ও YAML রক্ষণাবেক্ষণ করেন এমন কিছুর জন্য যা একটি docker run একবারেই সমাধান করত। একটি ভালো নিয়ম হলো কুবারনেটিস তখনই নিন যখন হাতে জিনিস চালানোর যন্ত্রণা একটি ক্লাস্টার চালানোর যন্ত্রণার চেয়ে বড়—তার আগে নয়।') },
      ],
    },
    {
      h: l('Is Kubernetes the same as Docker?', 'কুবারনেটিস কি Docker-এর মতোই?'),
      blocks: [
        { p: l('A common beginner question is whether Kubernetes replaces Docker. It does not — they live at different layers and work together. Docker (or another container runtime) builds a container image and runs an individual container on one machine. Kubernetes sits above that: it takes your already-built images and orchestrates many containers across a cluster, deciding placement, restarting failures, scaling replicas, and wiring up networking. You still package your app as a container image; Kubernetes is what runs that image reliably on lots of machines at once.', 'একটি সাধারণ নতুন প্রশ্ন হলো কুবারনেটিস কি Docker-কে প্রতিস্থাপন করে। করে না—এরা ভিন্ন স্তরে থাকে ও একসঙ্গে কাজ করে। Docker (বা অন্য একটি কন্টেইনার রানটাইম) একটি কন্টেইনার image তৈরি করে ও এক মেশিনে একটি আলাদা কন্টেইনার চালায়। কুবারনেটিস তার ওপরে বসে: এটি আপনার ইতিমধ্যে-তৈরি image নেয় ও একটি ক্লাস্টারজুড়ে অনেক কন্টেইনার অর্কেস্ট্রেট করে, placement ঠিক করা, ব্যর্থতা রিস্টার্ট, রেপ্লিকা স্কেল ও networking সংযুক্ত করা। আপনি এখনো আপনার অ্যাপ একটি কন্টেইনার image হিসেবে প্যাকেজ করেন; কুবারনেটিস হলো যা সেই image একসঙ্গে অনেক মেশিনে নির্ভরযোগ্যভাবে চালায়।') },
        { note: l('Docker is the shipping container — a standard box for your app. Kubernetes is the port and the crane fleet that move thousands of those boxes reliably. You need both, at different layers.', 'Docker হলো শিপিং কন্টেইনার—আপনার অ্যাপের জন্য একটি প্রমিত বাক্স। কুবারনেটিস হলো সেই বন্দর ও ক্রেন বহর যা হাজারো বাক্স নির্ভরযোগ্যভাবে সরায়। আপনার দুটোই লাগে, ভিন্ন স্তরে।'), kind: 'tip' },
      ],
    },
    {
      h: l('Common mistakes', 'সাধারণ ভুল'),
      blocks: [
        { list: [
          l('Adopting Kubernetes for a tiny app that a single Docker host would run just fine — paying the complexity cost with none of the scale benefit.', 'একটি ছোট অ্যাপে কুবারনেটিস নেওয়া যা একটি একক Docker হোস্টেই ভালো চলত—স্কেলের সুবিধা ছাড়াই জটিলতার দাম দেওয়া।'),
          l('Thinking of Kubernetes as "just container hosting" and missing the point: its value is the continuous reconciliation loop, not merely running containers.', 'কুবারনেটিসকে "শুধু কন্টেইনার হোস্টিং" ভাবা ও আসল কথা মিস করা: এর মূল্য হলো অবিরত reconciliation লুপ, শুধু কন্টেইনার চালানো নয়।'),
          l('Expecting the cluster to hide every failure — it heals what it can, but a container that crashes on startup will just crash-loop forever until you fix the code.', 'ক্লাস্টার প্রতিটি ব্যর্থতা লুকাবে আশা করা—এটি যা পারে নিরাময় করে, কিন্তু চালু হওয়ার সময় ক্র্যাশ করা একটি কন্টেইনার আপনি কোড ঠিক না করা পর্যন্ত চিরকাল crash-loop করবে।'),
          l('Managing pods imperatively by hand instead of declaring desired state, which throws away the very automation you adopted Kubernetes for.', 'কাঙ্ক্ষিত অবস্থা ঘোষণার বদলে হাতে ইম্পারেটিভভাবে pod পরিচালনা করা, যা ঠিক সেই অটোমেশনই ফেলে দেয় যার জন্য আপনি কুবারনেটিস নিয়েছিলেন।'),
        ] },
      ],
    },
    {
      h: l('Remember in one line', 'এক লাইনে মনে রাখুন'),
      blocks: [
        { list: [
          l('Kubernetes is a container orchestrator that runs and manages containers across a cluster of machines automatically.', 'কুবারনেটিস একটি কন্টেইনার অর্কেস্ট্রেটর যা একটি মেশিন ক্লাস্টারজুড়ে কন্টেইনার স্বয়ংক্রিয়ভাবে চালায় ও পরিচালনা করে।'),
          l('You declare the desired state; a control loop keeps reality matching it by scheduling, scaling, and self-healing.', 'আপনি কাঙ্ক্ষিত অবস্থা ঘোষণা করেন; একটি কন্ট্রোল লুপ শিডিউল, স্কেল ও স্ব-নিরাময় করে বাস্তবকে তার সঙ্গে মিলিয়ে রাখে।'),
          l('It gives resilient, scalable automation — but only take it on when the scale justifies the complexity.', 'এটি স্থিতিস্থাপক, স্কেলযোগ্য অটোমেশন দেয়—তবে স্কেল জটিলতাকে যুক্তিযুক্ত করলে তবেই নিন।'),
        ] },
      ],
    },
  ],

  // ── k8s-why · Why orchestration? ──────────────────────────────────────────
  'k8s-why': [
    {
      h: l('Why orchestration?', 'কেন অর্কেস্ট্রেশন?'),
      blocks: [
        { p: l('Plain Docker runs containers on one host; Kubernetes adds scheduling, scaling, self-healing, and networking across many hosts. That single sentence is the whole reason orchestration exists. Docker is brilliant at packaging an app and running a container on the machine in front of you, but it stops at the edge of that machine. The moment you need several machines to cooperate — to share load, to cover for each other when one fails, and to talk over a network — you need a layer above Docker that thinks about the whole fleet, not one box.', 'সাধারণ Docker এক হোস্টে কন্টেইনার চালায়; কুবারনেটিস অনেক হোস্টজুড়ে শিডিউলিং, স্কেলিং, স্ব-নিরাময় ও নেটওয়ার্কিং যোগ করে। এই একটি বাক্যই অর্কেস্ট্রেশনের অস্তিত্বের পুরো কারণ। Docker একটি অ্যাপ প্যাকেজ করা ও আপনার সামনের মেশিনে একটি কন্টেইনার চালাতে দুর্দান্ত, কিন্তু এটি সেই মেশিনের সীমানায় থেমে যায়। যেই মুহূর্তে আপনার কয়েকটি মেশিনের সহযোগিতা দরকার—লোড ভাগ করতে, একটি ব্যর্থ হলে অন্যকে দিয়ে ঢাকতে, ও একটি নেটওয়ার্কে কথা বলতে—তখন Docker-এর ওপরে এমন একটি স্তর দরকার যা পুরো বহর নিয়ে ভাবে, একটি বাক্স নয়।') },
        { p: l('The problem orchestration solves is that manual multi-host operations do not scale. Picture running ten services by hand across five servers: you must decide which server has room for each container, restart anything that crashes, redistribute work when a server dies, and rewire the network every time an IP changes. Do it once and it is tedious; do it for a real product under changing load and it is impossible to keep up. Orchestration turns those human chores into rules the platform enforces continuously.', 'অর্কেস্ট্রেশন যে সমস্যা সমাধান করে তা হলো হাতে-করা মাল্টি-হোস্ট অপারেশন স্কেল করে না। পাঁচটি সার্ভারজুড়ে দশটি সার্ভিস হাতে চালানোর কথা ভাবুন: আপনাকে ঠিক করতে হবে কোন সার্ভারে কোন কন্টেইনারের জায়গা আছে, ক্র্যাশ করা যেকোনো কিছু রিস্টার্ট করতে হবে, একটি সার্ভার মরলে কাজ পুনর্বণ্টন করতে হবে, ও প্রতিবার IP বদলালে নেটওয়ার্ক আবার সংযুক্ত করতে হবে। একবার করলে ক্লান্তিকর; পরিবর্তনশীল লোডের নিচে একটি বাস্তব প্রোডাক্টের জন্য করলে তাল রাখা অসম্ভব। অর্কেস্ট্রেশন সেই মানুষের কাজগুলোকে এমন নিয়মে পরিণত করে যা প্ল্যাটফর্ম অবিরত প্রয়োগ করে।') },
        { note: l('One chef (Docker) cooks one kitchen; Kubernetes is the restaurant chain managing many kitchens at once — hiring, balancing orders across branches, and reopening a branch that closes unexpectedly.', 'একজন শেফ (Docker) এক রান্নাঘর সামলায়; কুবারনেটিস অনেক রান্নাঘর একসঙ্গে পরিচালনার রেস্তোরাঁ চেইন—কর্মী নেওয়া, শাখাজুড়ে অর্ডার ভারসাম্য, ও হঠাৎ বন্ধ হওয়া শাখা আবার খোলা।'), kind: 'tip' },
      ],
    },
    {
      h: l('What orchestration adds on top of Docker', 'অর্কেস্ট্রেশন Docker-এর ওপর যা যোগ করে'),
      blocks: [
        { steps: [
          l('Scheduling — instead of you choosing a server, the scheduler places each container on a node that has room, across the whole cluster.', 'শিডিউলিং—আপনি সার্ভার বাছার বদলে, scheduler প্রতিটি কন্টেইনারকে পুরো ক্লাস্টারজুড়ে জায়গা আছে এমন একটি node-এ বসায়।'),
          l('Scaling — you change one number and Kubernetes adds or removes replicas, spreading them across nodes automatically.', 'স্কেলিং—আপনি একটি সংখ্যা বদলান আর কুবারনেটিস রেপ্লিকা যোগ বা সরায়, node-জুড়ে স্বয়ংক্রিয়ভাবে ছড়িয়ে।'),
          l('Self-healing — a crashed container is restarted, and if a whole node dies its pods are recreated on healthy nodes.', 'স্ব-নিরাময়—ক্র্যাশ করা কন্টেইনার রিস্টার্ট হয়, আর একটি পুরো node মরলে তার pod সুস্থ node-এ আবার তৈরি হয়।'),
          l('Networking — every pod gets an address and services get stable names, so containers on different hosts can find and reach each other.', 'নেটওয়ার্কিং—প্রতিটি pod একটি ঠিকানা পায় ও service স্থিতিশীল নাম পায়, তাই ভিন্ন হোস্টের কন্টেইনার একে অপরকে খুঁজে পায় ও পৌঁছায়।'),
          l('Zero-downtime rollouts — new versions are rolled out gradually and can be rolled back instantly, so users never see an outage.', 'জিরো-ডাউনটাইম রোলআউট—নতুন ভার্সন ধীরে ধীরে রোলআউট হয় ও তাৎক্ষণিক রোলব্যাক করা যায়, তাই ব্যবহারকারী কখনো আউটেজ দেখে না।'),
        ] },
        { code: `# Plain Docker: one container on one host, gone for good if it crashes
docker run -d --name web nginx:1.25

# Kubernetes: declare replicas across the cluster, self-healed and scalable
kubectl create deployment web --image=nginx:1.25 --replicas=3

# Handle a traffic spike by changing a single number
kubectl scale deployment web --replicas=10

# Roll out a new version with no downtime, and undo instantly if it breaks
kubectl set image deployment/web nginx=nginx:1.26
kubectl rollout undo deployment/web`, caption: l('The docker run line runs one container on one machine. The kubectl lines declare a fleet that Kubernetes schedules, scales, upgrades, and heals across many machines for you.', 'docker run লাইনটি এক মেশিনে একটি কন্টেইনার চালায়। kubectl লাইনগুলো একটি বহর ঘোষণা করে যা কুবারনেটিস অনেক মেশিনজুড়ে আপনার জন্য শিডিউল, স্কেল, আপগ্রেড ও নিরাময় করে।') },
      ],
    },
    {
      h: l('Docker alone vs Kubernetes', 'একা Docker বনাম কুবারনেটিস'),
      blocks: [
        { table: {
          head: [l('Concern', 'বিষয়'), l('Plain Docker', 'সাধারণ Docker'), l('Kubernetes', 'কুবারনেটিস')],
          rows: [
            [l('Hosts', 'হোস্ট'), l('One machine', 'একটি মেশিন'), l('Many machines as one cluster', 'অনেক মেশিন একটি ক্লাস্টার হিসেবে')],
            [l('If a container crashes', 'কন্টেইনার ক্র্যাশ করলে'), l('Stays down until you restart it', 'আপনি রিস্টার্ট না করা পর্যন্ত বন্ধ থাকে'), l('Restarted automatically', 'স্বয়ংক্রিয়ভাবে রিস্টার্ট হয়')],
            [l('If a host dies', 'একটি হোস্ট মরলে'), l('Its containers are simply gone', 'তার কন্টেইনার কেবল হারিয়ে যায়'), l('Pods rescheduled onto healthy nodes', 'pod সুস্থ node-এ পুনঃশিডিউল হয়')],
            [l('Scaling', 'স্কেলিং'), l('Manual — start more by hand', 'হাতে—আরও চালু করুন'), l('One command or automatic', 'একটি কমান্ড বা স্বয়ংক্রিয়')],
            [l('Releases', 'রিলিজ'), l('Stop old, start new (downtime)', 'পুরনো বন্ধ, নতুন চালু (ডাউনটাইম)'), l('Gradual rollout with instant rollback', 'ধীরে রোলআউট, তাৎক্ষণিক রোলব্যাক')],
          ],
        } },
      ],
    },
    {
      h: l('When and where to make the move', 'কখন ও কোথায় সরবেন'),
      blocks: [
        { p: l('Move to Kubernetes when you need multi-host scale, automatic failover, and zero-downtime rollouts. Concretely, that is when a single server can no longer hold your traffic, when a machine failing must not take your product down with it, or when you deploy often enough that manual, downtime-y releases are a real cost. These are the signals that the fleet, not the single container, is now the thing you operate — and that is exactly what orchestration is built for.', 'কুবারনেটিসে যান যখন আপনার মাল্টি-হোস্ট স্কেল, স্বয়ংক্রিয় failover ও জিরো-ডাউনটাইম রোলআউট দরকার। বাস্তবে, সেটা তখন যখন একটি সার্ভার আর আপনার ট্রাফিক ধরে রাখতে পারে না, যখন একটি মেশিন ব্যর্থ হলে তা আপনার প্রোডাক্টকে সঙ্গে নিয়ে পড়ে যাওয়া চলবে না, বা যখন আপনি এত ঘন ঘন ডিপ্লয় করেন যে হাতে-করা, ডাউনটাইমযুক্ত রিলিজ একটি বাস্তব খরচ। এগুলোই সংকেত যে এখন একটি কন্টেইনার নয়, বহরটাই আপনি পরিচালনা করেন—আর অর্কেস্ট্রেশন ঠিক এর জন্যই তৈরি।') },
        { p: l('Orchestration unlocks resilience at scale, but running a cluster costs real operational and cognitive overhead — a control plane to keep alive, networking to reason about, and a large vocabulary to learn. So do not jump early. If one or two Docker hosts and a restart script comfortably meet your needs, that simpler setup is the right answer; the overhead of Kubernetes only pays off once the scale and reliability demands are genuinely there.', 'অর্কেস্ট্রেশন স্কেলে স্থিতিস্থাপকতা খোলে, তবে একটি ক্লাস্টার চালানো বাস্তব অপারেশনাল ও জ্ঞানীয় ওভারহেড খরচ করে—সচল রাখার একটি control plane, বুঝতে হবে এমন networking, ও শেখার একটি বড় শব্দভাণ্ডার। তাই আগেভাগে লাফ দেবেন না। একটি বা দুটি Docker হোস্ট ও একটি রিস্টার্ট স্ক্রিপ্ট যদি আরামে আপনার প্রয়োজন মেটায়, সেই সরল সেটআপই সঠিক উত্তর; কুবারনেটিসের ওভারহেড কেবল তখনই লাভজনক হয় যখন স্কেল ও নির্ভরযোগ্যতার চাহিদা সত্যিই থাকে।') },
      ],
    },
    {
      h: l('A node fails at 3 a.m.: by hand vs orchestrated', 'রাত ৩টায় একটি node ব্যর্থ: হাতে বনাম অর্কেস্ট্রেটেড'),
      blocks: [
        { p: l('The clearest way to feel why orchestration matters is to watch the same failure play out both ways. Imagine a server holding several of your containers dies in the middle of the night.', 'অর্কেস্ট্রেশন কেন গুরুত্বপূর্ণ তা অনুভব করার সবচেয়ে স্পষ্ট উপায় হলো একই ব্যর্থতা দুইভাবে ঘটতে দেখা। কল্পনা করুন আপনার কয়েকটি কন্টেইনার ধরে রাখা একটি সার্ভার মাঝরাতে মরে যায়।') },
        { steps: [
          l('By hand with plain Docker: an alert wakes someone up. They log in, notice the dead host, find a machine with spare capacity, start each container there, then update whatever pointed at the old server’s address — all under pressure, half-asleep.', 'সাধারণ Docker দিয়ে হাতে: একটি অ্যালার্ট কাউকে জাগায়। তারা লগইন করে, মরা হোস্ট দেখে, ফাঁকা ক্ষমতাযুক্ত একটি মেশিন খোঁজে, সেখানে প্রতিটি কন্টেইনার চালু করে, তারপর পুরনো সার্ভারের ঠিকানায় যা নির্দেশ করত তা আপডেট করে—সবটাই চাপে, আধা-ঘুমে।'),
          l('With Kubernetes: the control plane notices the node stopped reporting, marks its pods as lost, and the scheduler places replacements on healthy nodes within seconds. Services automatically route to the new pods.', 'কুবারনেটিস দিয়ে: control plane লক্ষ্য করে node রিপোর্ট করা বন্ধ করেছে, তার pod হারানো হিসেবে চিহ্নিত করে, ও scheduler কয়েক সেকেন্ডের মধ্যে সুস্থ node-এ প্রতিস্থাপন বসায়। Service স্বয়ংক্রিয়ভাবে নতুন pod-এ রাউট করে।'),
          l('The human wakes up to a recovered system and an event log, not an outage — the difference between orchestration and manual operations is exactly this loop running without anyone present.', 'মানুষ একটি আউটেজ নয়, একটি পুনরুদ্ধার হওয়া সিস্টেম ও একটি event লগ দেখে জাগে—অর্কেস্ট্রেশন ও হাতে-অপারেশনের পার্থক্য ঠিক এই লুপ কারো উপস্থিতি ছাড়া চলা।'),
        ] },
      ],
    },
    {
      h: l('Common mistakes', 'সাধারণ ভুল'),
      blocks: [
        { list: [
          l('Expecting Kubernetes to fix a bad app — it orchestrates containers, it does not fix broken code. A slow or buggy service stays slow and buggy, just spread across more nodes.', 'কুবারনেটিস একটি খারাপ অ্যাপ ঠিক করবে আশা করা—এটি কন্টেইনার অর্কেস্ট্রেট করে, ভাঙা কোড ঠিক করে না। একটি ধীর বা বাগযুক্ত সার্ভিস ধীর ও বাগযুক্তই থাকে, শুধু আরও node-এ ছড়ানো।'),
          l('Adopting orchestration when a single Docker host would do — taking on cluster overhead you do not yet need.', 'একটি একক Docker হোস্টই যথেষ্ট হলে অর্কেস্ট্রেশন নেওয়া—এমন ক্লাস্টার ওভারহেড নেওয়া যা এখনো দরকার নেই।'),
          l('Believing orchestration means only "auto-scaling" — self-healing, networking, and zero-downtime rollouts are usually the bigger day-to-day wins.', 'অর্কেস্ট্রেশন মানে শুধু "অটো-স্কেলিং" ভাবা—স্ব-নিরাময়, networking ও জিরো-ডাউনটাইম রোলআউট সাধারণত দৈনন্দিন বড় লাভ।'),
          l('Underestimating the operational cost of a cluster and having no one on the team who can debug it when the control plane misbehaves.', 'একটি ক্লাস্টারের অপারেশনাল খরচ কম ভাবা ও দলে এমন কেউ না থাকা যে control plane খারাপ আচরণ করলে তা ডিবাগ করতে পারে।'),
        ] },
      ],
    },
    {
      h: l('Remember in one line', 'এক লাইনে মনে রাখুন'),
      blocks: [
        { list: [
          l('Docker runs containers on one host; orchestration adds scheduling, scaling, self-healing, and networking across many.', 'Docker এক হোস্টে কন্টেইনার চালায়; অর্কেস্ট্রেশন অনেক হোস্টজুড়ে শিডিউলিং, স্কেলিং, স্ব-নিরাময় ও নেটওয়ার্কিং যোগ করে।'),
          l('Move when you need multi-host scale, automatic failover, and zero-downtime rollouts — not before.', 'যান যখন মাল্টি-হোস্ট স্কেল, স্বয়ংক্রিয় failover ও জিরো-ডাউনটাইম রোলআউট দরকার—তার আগে নয়।'),
          l('Orchestration organizes containers; it will never fix broken code.', 'অর্কেস্ট্রেশন কন্টেইনার সংগঠিত করে; এটি কখনো ভাঙা কোড ঠিক করবে না।'),
        ] },
      ],
    },
  ],

  // ── k8s-architecture · Cluster architecture ───────────────────────────────
  'k8s-architecture': [
    {
      h: l('What is cluster architecture?', 'ক্লাস্টার আর্কিটেকচার কী?'),
      blocks: [
        { p: l('A Kubernetes cluster has two kinds of machine with two very different jobs. A control plane (made of the API server, scheduler, etcd, and controllers) makes all the decisions, and worker nodes run the pods that are your actual application. The control plane is the brain that decides what should happen; the nodes are the muscle that make it happen. Every cluster, from a laptop test setup to a thousand-node production system, is built from this same split.', 'একটি কুবারনেটিস ক্লাস্টারে দুই ধরনের মেশিন থাকে যাদের দুটি খুব ভিন্ন কাজ। একটি control plane (API সার্ভার, scheduler, etcd ও controller দিয়ে তৈরি) সব সিদ্ধান্ত নেয়, আর worker node-গুলো সেই pod চালায় যা আপনার আসল অ্যাপ্লিকেশন। control plane হলো মস্তিষ্ক যা ঠিক করে কী হওয়া উচিত; node-গুলো হলো পেশি যা তা ঘটায়। প্রতিটি ক্লাস্টার, একটি ল্যাপটপ টেস্ট সেটআপ থেকে হাজার-node প্রোডাকশন সিস্টেম পর্যন্ত, এই একই বিভাজন দিয়ে তৈরি।') },
        { p: l('The problem this design solves is separating decision-making from execution so the system can scale and stay reliable. Because the brain is a small, protected set of components and the muscle is a large, replaceable pool of nodes, you can add or lose worker nodes freely without disturbing the cluster’s logic. The control plane records what you want and continuously drives the nodes toward it, while the nodes stay simple: run the containers they are told to run and report back.', 'এই ডিজাইন যে সমস্যা সমাধান করে তা হলো সিদ্ধান্ত-গ্রহণকে সম্পাদন থেকে আলাদা করা যাতে সিস্টেম স্কেল করতে ও নির্ভরযোগ্য থাকতে পারে। যেহেতু মস্তিষ্ক একটি ছোট, সুরক্ষিত উপাদানের সেট আর পেশি একটি বড়, প্রতিস্থাপনযোগ্য node-এর পুল, আপনি ক্লাস্টারের যুক্তিতে বিঘ্ন না ঘটিয়ে অবাধে worker node যোগ বা হারাতে পারেন। control plane লিখে রাখে আপনি কী চান ও অবিরত node-দের সেদিকে চালায়, আর node-গুলো সরল থাকে: তাদের যা চালাতে বলা হয় তা চালায় ও রিপোর্ট করে।') },
        { note: l('The control plane is the head office giving orders; the nodes are the branches doing the actual work. Head office never serves a customer directly — it sets targets and the branches deliver.', 'control plane হলো আদেশ দেওয়া প্রধান অফিস; node হলো আসল কাজ করা শাখা। প্রধান অফিস কখনো সরাসরি গ্রাহককে সেবা দেয় না—এটি লক্ষ্য ঠিক করে আর শাখাগুলো সরবরাহ করে।'), kind: 'tip' },
      ],
    },
    {
      h: l('How a request flows through the cluster', 'একটি অনুরোধ কীভাবে ক্লাস্টারের মধ্য দিয়ে যায়'),
      blocks: [
        { steps: [
          l('You run a kubectl command, which sends a request to the API server — the single front door to the control plane. Nothing bypasses it.', 'আপনি একটি kubectl কমান্ড চালান, যা API সার্ভারে একটি অনুরোধ পাঠায়—control plane-এর একমাত্র সদর দরজা। কিছুই এটি এড়িয়ে যায় না।'),
          l('The API server validates the request and writes the new desired state into etcd, the cluster’s key-value database and single source of truth.', 'API সার্ভার অনুরোধটি যাচাই করে ও নতুন কাঙ্ক্ষিত অবস্থা etcd-তে লেখে, যা ক্লাস্টারের key-value ডেটাবেস ও একমাত্র সত্যের উৎস।'),
          l('The scheduler notices a pod that has no node yet and picks the best node for it based on free CPU, memory, and constraints.', 'scheduler লক্ষ্য করে একটি pod যার এখনো কোনো node নেই ও ফাঁকা CPU, memory ও শর্ত দেখে তার জন্য সেরা node বাছে।'),
          l('The kubelet on that node sees the assignment, pulls the image, and starts the container, then continually reports the pod’s health back.', 'সেই node-এর kubelet কাজটি দেখে, image টানে ও কন্টেইনার চালু করে, তারপর অবিরত pod-এর স্বাস্থ্য রিপোর্ট করে।'),
          l('Controllers keep watching etcd versus reality; if a pod dies, a controller asks for a replacement and the loop runs again.', 'controller-গুলো etcd বনাম বাস্তব দেখতে থাকে; একটি pod মরলে একটি controller প্রতিস্থাপন চায় ও লুপটি আবার চলে।'),
        ] },
        { code: `# See the machines that make up the cluster (control-plane + workers)
kubectl get nodes

# Look at the control-plane components — they run as pods in kube-system
kubectl get pods -n kube-system

# Inspect one node: its capacity, the pods on it, and its conditions
kubectl describe node worker-1

# Everything you do goes through the API server; this is the URL it serves
kubectl cluster-info`, caption: l('kubectl get nodes lists the fleet; the kube-system pods are the control-plane parts (API server, scheduler, etcd, controllers). Notice every command talks to the API server — the one entry point to the control plane.', 'kubectl get nodes বহর তালিকা করে; kube-system pod-গুলো হলো control-plane অংশ (API সার্ভার, scheduler, etcd, controller)। খেয়াল করুন প্রতিটি কমান্ড API সার্ভারের সঙ্গে কথা বলে—control plane-এর একমাত্র প্রবেশপথ।') },
      ],
    },
    {
      h: l('The components and their roles', 'উপাদান ও তাদের ভূমিকা'),
      blocks: [
        { table: {
          head: [l('Component', 'উপাদান'), l('Where it lives', 'যেখানে থাকে'), l('Its job', 'কাজ')],
          rows: [
            [l('API server', 'API সার্ভার'), l('Control plane', 'Control plane'), l('The single front door: validates every request and reads/writes cluster state.', 'একমাত্র সদর দরজা: প্রতিটি অনুরোধ যাচাই করে ও ক্লাস্টার অবস্থা পড়ে/লেখে।')],
            [l('etcd', 'etcd'), l('Control plane', 'Control plane'), l('The key-value store holding the whole cluster’s desired and current state.', 'পুরো ক্লাস্টারের কাঙ্ক্ষিত ও বর্তমান অবস্থা ধরে রাখা key-value স্টোর।')],
            [l('Scheduler', 'Scheduler'), l('Control plane', 'Control plane'), l('Decides which node each new pod runs on, by resources and constraints.', 'রিসোর্স ও শর্ত দেখে প্রতিটি নতুন pod কোন node-এ চলবে ঠিক করে।')],
            [l('Controllers', 'Controller'), l('Control plane', 'Control plane'), l('Watch state and act to close the gap between desired and actual.', 'অবস্থা দেখে ও কাঙ্ক্ষিত-বাস্তবের ফাঁক বন্ধ করতে কাজ করে।')],
            [l('kubelet', 'kubelet'), l('Every node', 'প্রতিটি node'), l('The node’s agent: starts containers it is assigned and reports their health.', 'node-এর এজেন্ট: বরাদ্দ করা কন্টেইনার চালু করে ও তাদের স্বাস্থ্য রিপোর্ট করে।')],
            [l('kube-proxy', 'kube-proxy'), l('Every node', 'প্রতিটি node'), l('Wires up pod and service networking on the node.', 'node-এ pod ও service networking সংযুক্ত করে।')],
          ],
        } },
      ],
    },
    {
      h: l('When and where the architecture matters', 'আর্কিটেকচার কখন ও কোথায় গুরুত্বপূর্ণ'),
      blocks: [
        { p: l('In day-to-day use the right approach is simple: send all requests to the API server (via kubectl), let the scheduler place pods, and let the nodes run them. You almost never touch etcd or the scheduler directly — you declare what you want through the API server and trust the components to coordinate. Knowing the roles pays off most when something goes wrong: a pod stuck in Pending usually points at the scheduler finding no room, while errors reaching the cluster point at the API server or your kubeconfig.', 'দৈনন্দিন ব্যবহারে সঠিক পথ সরল: সব অনুরোধ API সার্ভারে (kubectl দিয়ে) পাঠান, scheduler-কে pod স্থাপন করতে দিন, ও node-কে চালাতে দিন। আপনি প্রায় কখনোই etcd বা scheduler-এ সরাসরি হাত দেন না—আপনি API সার্ভারের মাধ্যমে যা চান ঘোষণা করেন ও উপাদানগুলোকে সমন্বয় করতে বিশ্বাস করেন। ভূমিকা জানা সবচেয়ে কাজে দেয় যখন কিছু ভুল হয়: Pending-এ আটকে থাকা একটি pod সাধারণত scheduler কোনো জায়গা না পাওয়াকে নির্দেশ করে, আর ক্লাস্টারে পৌঁছাতে ত্রুটি API সার্ভার বা আপনার kubeconfig-কে নির্দেশ করে।') },
        { p: l('The split design is highly scalable and resilient, but etcd and the control plane are critical and need protection. If etcd is lost, the cluster forgets its entire desired state; if the API server is down, nothing new can be scheduled. That is why production clusters run multiple control-plane replicas and back up etcd, and why the control plane is kept separate from noisy application workloads. Where you run things matters: keep the brain protected and let the replaceable nodes absorb the load.', 'বিভক্ত ডিজাইন অত্যন্ত স্কেলযোগ্য ও স্থিতিস্থাপক, তবে etcd ও control plane সংকটপূর্ণ ও রক্ষা দরকার। etcd হারালে ক্লাস্টার তার পুরো কাঙ্ক্ষিত অবস্থা ভুলে যায়; API সার্ভার বন্ধ থাকলে নতুন কিছু শিডিউল হতে পারে না। এ কারণেই প্রোডাকশন ক্লাস্টার একাধিক control-plane রেপ্লিকা চালায় ও etcd ব্যাকআপ করে, আর এ কারণেই control plane-কে গোলমেলে অ্যাপ্লিকেশন ওয়ার্কলোড থেকে আলাদা রাখা হয়। কোথায় চালাচ্ছেন তা গুরুত্বপূর্ণ: মস্তিষ্ক সুরক্ষিত রাখুন ও প্রতিস্থাপনযোগ্য node-দের লোড শুষে নিতে দিন।') },
        { note: l('etcd is the cluster’s memory. Losing it means losing every record of what should be running — always back it up and run it with redundancy in production.', 'etcd হলো ক্লাস্টারের স্মৃতি। এটি হারানো মানে কী চলা উচিত তার প্রতিটি রেকর্ড হারানো—প্রোডাকশনে সবসময় এটি ব্যাকআপ করুন ও redundancy সহ চালান।'), kind: 'warn' },
      ],
    },
    {
      h: l('Reading the cluster when something breaks', 'কিছু ভাঙলে ক্লাস্টার পড়া'),
      blocks: [
        { p: l('Knowing the roles turns a vague "the cluster is broken" into a specific question about one component. Map the symptom to the part responsible, and you know where to look first.', 'ভূমিকা জানা একটি অস্পষ্ট "ক্লাস্টার ভেঙে গেছে"-কে একটি নির্দিষ্ট উপাদান নিয়ে সুনির্দিষ্ট প্রশ্নে পরিণত করে। উপসর্গকে দায়ী অংশের সঙ্গে মেলান, তাহলে জানবেন প্রথমে কোথায় দেখতে হবে।') },
        { list: [
          l('A pod stuck in Pending usually means the scheduler found no node with enough free CPU or memory — look at node capacity and requests.', 'Pending-এ আটকে থাকা একটি pod সাধারণত মানে scheduler যথেষ্ট ফাঁকা CPU বা memory-যুক্ত কোনো node পায়নি—node ক্ষমতা ও request দেখুন।'),
          l('kubectl commands hanging or refused point at the API server or your kubeconfig, not at your app.', 'kubectl কমান্ড ঝুলে থাকা বা প্রত্যাখ্যাত হওয়া API সার্ভার বা আপনার kubeconfig-কে নির্দেশ করে, আপনার অ্যাপকে নয়।'),
          l('A pod scheduled but stuck in ContainerCreating often means the kubelet on that node cannot pull the image or mount a volume.', 'শিডিউল হওয়া কিন্তু ContainerCreating-এ আটকে থাকা একটি pod প্রায়ই মানে সেই node-এর kubelet image টানতে বা একটি volume মাউন্ট করতে পারছে না।'),
          l('A whole node showing NotReady points at that node’s kubelet or its network, so its pods will be rescheduled elsewhere.', 'একটি পুরো node NotReady দেখানো সেই node-এর kubelet বা তার network-কে নির্দেশ করে, তাই তার pod অন্যত্র পুনঃশিডিউল হবে।'),
        ] },
      ],
    },
    {
      h: l('Common mistakes', 'সাধারণ ভুল'),
      blocks: [
        { list: [
          l('Running application workloads on the control-plane nodes, risking the brain of the cluster under app load — a spike in your app can starve the API server or etcd.', 'কন্ট্রোল-প্লেন node-এ অ্যাপ্লিকেশন ওয়ার্কলোড চালানো, অ্যাপ লোডে ক্লাস্টারের মস্তিষ্ক ঝুঁকিতে ফেলা—আপনার অ্যাপে একটি স্পাইক API সার্ভার বা etcd-কে অনাহারে ফেলতে পারে।'),
          l('Running a single control-plane node in production, so one machine failing takes the whole cluster’s brain offline.', 'প্রোডাকশনে একটি মাত্র control-plane node চালানো, ফলে একটি মেশিন ব্যর্থ হলে পুরো ক্লাস্টারের মস্তিষ্ক অফলাইন হয়।'),
          l('Never backing up etcd, so a disk failure erases the cluster’s entire record of desired state.', 'etcd কখনো ব্যাকআপ না করা, ফলে একটি ডিস্ক ব্যর্থতা ক্লাস্টারের কাঙ্ক্ষিত অবস্থার পুরো রেকর্ড মুছে দেয়।'),
          l('Trying to write to etcd or bypass the API server directly, instead of going through kubectl and the API as intended.', 'kubectl ও API-র মধ্য দিয়ে যাওয়ার বদলে etcd-তে সরাসরি লেখা বা API সার্ভার এড়ানোর চেষ্টা।'),
        ] },
      ],
    },
    {
      h: l('Remember in one line', 'এক লাইনে মনে রাখুন'),
      blocks: [
        { list: [
          l('The control plane (API server, scheduler, etcd, controllers) decides; worker nodes run the pods.', 'control plane (API সার্ভার, scheduler, etcd, controller) সিদ্ধান্ত নেয়; worker node pod চালায়।'),
          l('Everything goes through the API server; the scheduler places pods and the kubelet runs them.', 'সবকিছু API সার্ভারের মধ্য দিয়ে যায়; scheduler pod বসায় ও kubelet সেগুলো চালায়।'),
          l('The split is scalable and resilient — but protect etcd and the control plane; they are the cluster’s brain.', 'বিভাজন স্কেলযোগ্য ও স্থিতিস্থাপক—তবে etcd ও control plane রক্ষা করুন; এগুলো ক্লাস্টারের মস্তিষ্ক।'),
        ] },
      ],
    },
  ],

  // ── k8s-objects · Objects & the declarative model ─────────────────────────
  'k8s-objects': [
    {
      h: l('What are objects and the declarative model?', 'অবজেক্ট ও ডিক্লারেটিভ মডেল কী?'),
      blocks: [
        { p: l('In Kubernetes you declare objects — Pods, Deployments, Services, and more — as desired state, and controllers continuously work to make reality match. An object is a record of intent: a Deployment object says "I want three replicas of this image running," not "start a container now." You write that intent, hand it to the cluster, and a controller takes responsibility for making it true and keeping it true, forever, without you issuing another command.', 'কুবারনেটিসে আপনি অবজেক্ট—Pod, Deployment, Service ও আরও—কাঙ্ক্ষিত অবস্থা হিসেবে ঘোষণা করেন, আর controller অবিরত বাস্তবকে মেলাতে কাজ করে। একটি অবজেক্ট হলো অভিপ্রায়ের একটি রেকর্ড: একটি Deployment অবজেক্ট বলে "আমি এই image-এর তিনটি রেপ্লিকা চলা চাই," "এখন একটি কন্টেইনার চালাও" নয়। আপনি সেই অভিপ্রায় লেখেন, ক্লাস্টারে দেন, ও একটি controller তা সত্য করা ও সত্য রাখার দায়িত্ব নেয়, চিরকাল, আপনার আরেকটি কমান্ড ছাড়াই।') },
        { p: l('This is the difference between declarative and imperative. Imperative means giving step-by-step orders: "create this, then start that, then scale it." Declarative means describing the end result and letting the system figure out the steps. The problem the declarative model solves is drift and manual toil: because the desired state is written down and a controller enforces it non-stop, the cluster repairs itself after failures and always converges back to what you declared, instead of slowly wandering away from it.', 'এটাই ডিক্লারেটিভ ও ইম্পারেটিভের পার্থক্য। ইম্পারেটিভ মানে ধাপে ধাপে আদেশ: "এটি তৈরি করো, তারপর ওটা চালু করো, তারপর স্কেল করো।" ডিক্লারেটিভ মানে শেষ ফলাফল বর্ণনা করা ও সিস্টেমকে ধাপগুলো বের করতে দেওয়া। ডিক্লারেটিভ মডেল যে সমস্যা সমাধান করে তা হলো drift ও হাতে-খাটুনি: যেহেতু কাঙ্ক্ষিত অবস্থা লেখা থাকে ও একটি controller তা অবিরত প্রয়োগ করে, ক্লাস্টার ব্যর্থতার পর নিজেকে মেরামত করে ও সবসময় আপনার ঘোষিত অবস্থায় ফিরে আসে, ধীরে সেখান থেকে সরে না গিয়ে।') },
        { note: l('A thermostat: you set the target temperature and it constantly adjusts to reach and hold it. You never say "turn the heater on for four minutes" — you declare 22°C and it does whatever is needed, whenever it drifts.', 'একটি থার্মোস্ট্যাট: আপনি লক্ষ্য তাপমাত্রা সেট করেন আর এটি অবিরত তা পৌঁছাতে ও ধরে রাখতে সমন্বয় করে। আপনি কখনো বলেন না "চার মিনিট হিটার চালাও"—আপনি ২২°C ঘোষণা করেন ও যখনই সরে যায় এটি যা দরকার তাই করে।'), kind: 'tip' },
      ],
    },
    {
      h: l('How the reconciliation loop works', 'reconciliation লুপ কীভাবে কাজ করে'),
      blocks: [
        { steps: [
          l('You write declarative YAML describing an object — its kind and the spec (desired state) you want.', 'আপনি একটি অবজেক্ট বর্ণনা করে ডিক্লারেটিভ YAML লেখেন—এর kind ও আপনি যে spec (কাঙ্ক্ষিত অবস্থা) চান।'),
          l('You apply it with kubectl apply -f, which sends the object to the API server, which stores it in etcd.', 'আপনি kubectl apply -f দিয়ে অ্যাপ্লাই করেন, যা অবজেক্টটি API সার্ভারে পাঠায়, আর সেটি etcd-তে সংরক্ষণ করে।'),
          l('The matching controller wakes up, compares the desired spec with the current status, and sees a difference.', 'সংশ্লিষ্ট controller জেগে ওঠে, কাঙ্ক্ষিত spec-কে বর্তমান status-এর সঙ্গে তুলনা করে ও একটি পার্থক্য দেখে।'),
          l('It takes action to close that gap — creating, deleting, or updating whatever is needed to reach the desired state.', 'এটি সেই ফাঁক বন্ধ করতে ব্যবস্থা নেয়—কাঙ্ক্ষিত অবস্থায় পৌঁছাতে যা দরকার তাই তৈরি, ডিলিট বা আপডেট করে।'),
          l('The loop never stops: any later drift (a crash, a manual edit) is detected and corrected again, converging reality back to the spec.', 'লুপ কখনো থামে না: পরের যেকোনো drift (একটি ক্র্যাশ, একটি হাতের এডিট) শনাক্ত ও আবার সংশোধন হয়, বাস্তবকে spec-এ ফিরিয়ে আনে।'),
        ] },
        { code: `apiVersion: apps/v1      # which API group and version defines this object
kind: Deployment         # what kind of object you are declaring
metadata:
  name: web              # the object's name (and labels, annotations)
spec:                    # the DESIRED STATE you want the cluster to hold
  replicas: 3
  selector:
    matchLabels:
      app: web
  template:
    metadata:
      labels:
        app: web
    spec:
      containers:
        - name: web
          image: nginx:1.25`, caption: l('Every object shares this shape: apiVersion, kind, metadata, and a spec describing desired state. You apply it with kubectl apply -f web.yaml, then a controller keeps the real cluster matching this spec — recreating pods whenever the count drifts from three.', 'প্রতিটি অবজেক্ট এই আকার ভাগ করে: apiVersion, kind, metadata ও কাঙ্ক্ষিত অবস্থা বর্ণনা করা একটি spec। আপনি kubectl apply -f web.yaml দিয়ে অ্যাপ্লাই করেন, তারপর একটি controller বাস্তব ক্লাস্টারকে এই spec-এর সঙ্গে মিলিয়ে রাখে—সংখ্যা তিন থেকে সরলেই pod আবার তৈরি করে।') },
      ],
    },
    {
      h: l('The anatomy of every object', 'প্রতিটি অবজেক্টের গঠন'),
      blocks: [
        { table: {
          head: [l('Field', 'ফিল্ড'), l('What it declares', 'যা ঘোষণা করে')],
          rows: [
            [l('apiVersion', 'apiVersion'), l('Which API group and version defines this kind of object (for example v1 or apps/v1).', 'কোন API group ও version এই ধরনের অবজেক্ট সংজ্ঞায়িত করে (যেমন v1 বা apps/v1)।')],
            [l('kind', 'kind'), l('The type of object — Pod, Deployment, Service, ConfigMap, and so on.', 'অবজেক্টের ধরন—Pod, Deployment, Service, ConfigMap ইত্যাদি।')],
            [l('metadata', 'metadata'), l('Identity: the object’s name, namespace, labels, and annotations.', 'পরিচয়: অবজেক্টের নাম, namespace, label ও annotation।')],
            [l('spec', 'spec'), l('The desired state you declare — what you want to be true.', 'আপনার ঘোষিত কাঙ্ক্ষিত অবস্থা—আপনি যা সত্য চান।')],
            [l('status', 'status'), l('The current actual state, filled in and updated by Kubernetes, not by you.', 'বর্তমান বাস্তব অবস্থা, কুবারনেটিস দ্বারা পূরণ ও আপডেট করা, আপনি নন।')],
          ],
        } },
        { note: l('You write spec; Kubernetes writes status. A controller’s entire job is to keep dragging status toward spec — reading the gap between them is how you debug what the cluster is doing.', 'আপনি spec লেখেন; কুবারনেটিস status লেখে। একটি controller-এর পুরো কাজ হলো status-কে spec-এর দিকে টানতে থাকা—এদের মধ্যকার ফাঁক পড়াই হলো ক্লাস্টার কী করছে তা ডিবাগ করার উপায়।'), kind: 'tip' },
      ],
    },
    {
      h: l('When and where the model matters', 'মডেল কখন ও কোথায় গুরুত্বপূর্ণ'),
      blocks: [
        { p: l('The right way to work is to write declarative YAML for what you want, apply it, and let controllers reconcile the cluster to that state. Keep every object’s YAML in a git repository, review changes like code, and make apply the only way things change. This gives you a reproducible cluster: you can recreate the whole environment from the files, see exactly what changed and when, and let self-healing quietly fix crashes and lost nodes without anyone paging you. It is the single habit that separates a maintainable cluster from a fragile one.', 'কাজ করার সঠিক উপায় হলো যা চান তার ডিক্লারেটিভ YAML লেখা, অ্যাপ্লাই করা, ও controller-কে ক্লাস্টার সেই অবস্থায় মেলাতে দেওয়া। প্রতিটি অবজেক্টের YAML একটি git রিপোজিটরিতে রাখুন, কোডের মতো পরিবর্তন রিভিউ করুন, ও apply-কে জিনিস বদলানোর একমাত্র উপায় করুন। এটি আপনাকে একটি পুনরুৎপাদনযোগ্য ক্লাস্টার দেয়: আপনি ফাইল থেকে পুরো এনভায়রনমেন্ট আবার তৈরি করতে পারেন, ঠিক কী ও কখন বদলেছে দেখতে পারেন, ও স্ব-নিরাময়কে নীরবে ক্র্যাশ ও হারানো node ঠিক করতে দিতে পারেন কাউকে পেজ না করেই। এটাই সেই একক অভ্যাস যা একটি রক্ষণাবেক্ষণযোগ্য ক্লাস্টারকে একটি ভঙ্গুর ক্লাস্টার থেকে আলাদা করে।') },
        { p: l('Declarative state makes systems self-healing and reproducible, but you must think in terms of end state, not steps. That is the mental shift beginners find hardest: you do not tell Kubernetes how to get somewhere, you describe where it should be. If you want two more replicas, you do not "run a scale command and remember it" — you edit the number in the YAML to five and re-apply, so the file always reflects the truth. When the file is the source of truth, the cluster and your repository never disagree.', 'ডিক্লারেটিভ স্টেট সিস্টেমকে স্ব-নিরাময়ী ও পুনরুৎপাদনযোগ্য করে, তবে ধাপ নয়, শেষ-অবস্থায় ভাবতে হয়। এটাই সেই মানসিক পরিবর্তন যা নতুনরা সবচেয়ে কঠিন মনে করে: আপনি কুবারনেটিসকে কীভাবে কোথাও পৌঁছাবে তা বলেন না, আপনি বর্ণনা করেন এটি কোথায় থাকা উচিত। আরও দুটি রেপ্লিকা চাইলে আপনি "একটি scale কমান্ড চালিয়ে মনে রাখেন" না—আপনি YAML-এ সংখ্যাটি পাঁচে এডিট করেন ও আবার অ্যাপ্লাই করেন, যাতে ফাইল সবসময় সত্য প্রতিফলিত করে। যখন ফাইলটাই সত্যের উৎস, ক্লাস্টার ও আপনার রিপোজিটরি কখনো দ্বিমত হয় না।') },
      ],
    },
    {
      h: l('Imperative vs declarative, side by side', 'ইম্পারেটিভ বনাম ডিক্লারেটিভ, পাশাপাশি'),
      blocks: [
        { p: l('The same goal can be reached two ways, and the difference in habit is what makes a cluster maintainable or fragile. Both commands below scale to five replicas — but only one keeps your files honest.', 'একই লক্ষ্য দুইভাবে পৌঁছানো যায়, আর অভ্যাসের পার্থক্যই একটি ক্লাস্টারকে রক্ষণাবেক্ষণযোগ্য বা ভঙ্গুর করে। নিচের দুটি কমান্ডই পাঁচ রেপ্লিকায় স্কেল করে—কিন্তু শুধু একটি আপনার ফাইলকে সৎ রাখে।') },
          { table: {
          head: [l('Aspect', 'দিক'), l('Imperative', 'ইম্পারেটিভ'), l('Declarative', 'ডিক্লারেটিভ')],
          rows: [
            [l('You express', 'আপনি প্রকাশ করেন'), l('A step to perform now', 'এখন করার একটি ধাপ'), l('The end state you want', 'আপনি যে শেষ-অবস্থা চান')],
            [l('Example', 'উদাহরণ'), l('kubectl scale deploy web --replicas=5', 'kubectl scale deploy web --replicas=5'), l('replicas: 5 in YAML, then kubectl apply -f', 'YAML-এ replicas: 5, তারপর kubectl apply -f')],
            [l('Record of truth', 'সত্যের রেকর্ড'), l('Only the live cluster remembers', 'শুধু লাইভ ক্লাস্টার মনে রাখে'), l('The file in git is the record', 'git-এর ফাইলই রেকর্ড')],
            [l('Reproducible?', 'পুনরুৎপাদনযোগ্য?'), l('No — the command is lost after it runs', 'না—চলার পর কমান্ড হারিয়ে যায়'), l('Yes — re-apply the file anytime', 'হ্যাঁ—যেকোনো সময় ফাইল আবার অ্যাপ্লাই করুন')],
          ],
        } },
        { p: l('Use imperative commands for quick experiments and emergencies, but treat declarative apply as the default for anything you want to keep — because only the file-driven path survives a rebuild, a review, and the next engineer.', 'দ্রুত পরীক্ষা ও জরুরি অবস্থার জন্য ইম্পারেটিভ কমান্ড ব্যবহার করুন, কিন্তু রাখবেন এমন যেকোনো কিছুর জন্য ডিক্লারেটিভ apply-কে ডিফল্ট ধরুন—কারণ শুধু ফাইল-চালিত পথটাই একটি rebuild, একটি review ও পরের ইঞ্জিনিয়ারকে টিকে থাকে।') },
      ],
    },
    {
      h: l('Common mistakes', 'সাধারণ ভুল'),
      blocks: [
        { list: [
          l('Imperatively patching live objects by hand, so the next apply reverts your change and confuses everyone about the real state.', 'হাতে লাইভ অবজেক্ট ইম্পারেটিভলি প্যাচ করা, ফলে পরের apply আপনার পরিবর্তন ফিরিয়ে দেয় ও আসল অবস্থা নিয়ে সবাইকে বিভ্রান্ত করে।'),
          l('Thinking in steps instead of end state — trying to script "do this, then that" instead of declaring the final shape and letting controllers reconcile.', 'শেষ-অবস্থার বদলে ধাপে ভাবা—"এটা করো, তারপর ওটা" স্ক্রিপ্ট করার চেষ্টা, শেষ আকার ঘোষণা করে controller-কে মেলাতে দেওয়ার বদলে।'),
          l('Editing the cluster with kubectl edit but never updating the YAML in git, so the file and the cluster silently drift apart.', 'kubectl edit দিয়ে ক্লাস্টার এডিট করা কিন্তু git-এর YAML কখনো আপডেট না করা, ফলে ফাইল ও ক্লাস্টার নীরবে সরে যায়।'),
          l('Writing into the status field, which Kubernetes owns — you declare spec, the cluster reports status.', 'status ফিল্ডে লেখা, যা কুবারনেটিসের নিয়ন্ত্রণে—আপনি spec ঘোষণা করেন, ক্লাস্টার status রিপোর্ট করে।'),
        ] },
      ],
    },
    {
      h: l('Remember in one line', 'এক লাইনে মনে রাখুন'),
      blocks: [
        { list: [
          l('You declare objects as desired state; controllers continuously reconcile reality to match.', 'আপনি অবজেক্ট কাঙ্ক্ষিত অবস্থা হিসেবে ঘোষণা করেন; controller অবিরত বাস্তবকে মেলাতে reconcile করে।'),
          l('Every object is apiVersion + kind + metadata + spec (you write) + status (Kubernetes writes).', 'প্রতিটি অবজেক্ট = apiVersion + kind + metadata + spec (আপনি লেখেন) + status (কুবারনেটিস লেখে)।'),
          l('Keep the YAML in git and apply it; think in end state, never in steps, and never patch live by hand.', 'YAML git-এ রাখুন ও অ্যাপ্লাই করুন; ধাপে নয়, শেষ-অবস্থায় ভাবুন, ও কখনো হাতে লাইভ প্যাচ করবেন না।'),
        ] },
      ],
    },
  ],

  // ── k8s-kubectl · kubectl: the CLI ────────────────────────────────────────
  'k8s-kubectl': [
    {
      h: l('What is kubectl?', 'kubectl কী?'),
      blocks: [
        { p: l('kubectl is the command-line tool that talks to the API server to create, inspect, update, and delete cluster objects. It is how a human — and most scripts and CI pipelines — actually interact with Kubernetes. Every action you take, from listing pods to rolling out a new version, becomes an HTTP request that kubectl sends to the API server on your behalf. If the API server is the cluster’s front door, kubectl is the key you hold in your hand.', 'kubectl হলো সেই কমান্ড-লাইন টুল যা ক্লাস্টার অবজেক্ট তৈরি, পরিদর্শন, আপডেট ও ডিলিট করতে API সার্ভারের সঙ্গে কথা বলে। এটাই সেই উপায় যেভাবে একজন মানুষ—ও বেশিরভাগ স্ক্রিপ্ট ও CI পাইপলাইন—আসলে কুবারনেটিসের সঙ্গে কাজ করে। আপনার নেওয়া প্রতিটি ক্রিয়া, pod তালিকা করা থেকে একটি নতুন ভার্সন রোলআউট করা পর্যন্ত, একটি HTTP অনুরোধে পরিণত হয় যা kubectl আপনার হয়ে API সার্ভারে পাঠায়। API সার্ভার যদি ক্লাস্টারের সদর দরজা হয়, kubectl হলো আপনার হাতে ধরা চাবি।') },
        { p: l('The problem kubectl solves is giving you one consistent, scriptable interface to a very large system. Instead of learning a different tool for pods, deployments, services, and secrets, you use the same verbs — get, describe, apply, delete, logs — against every kind of object. Because it is just a CLI over an HTTP API, the same commands work from your laptop, a teammate’s machine, or an automated pipeline, which is why kubectl is the universal language of operating Kubernetes.', 'kubectl যে সমস্যা সমাধান করে তা হলো একটি খুব বড় সিস্টেমে আপনাকে একটি সামঞ্জস্যপূর্ণ, স্ক্রিপ্টযোগ্য ইন্টারফেস দেওয়া। pod, deployment, service ও secret-এর জন্য আলাদা টুল শেখার বদলে, আপনি প্রতিটি ধরনের অবজেক্টে একই verb ব্যবহার করেন—get, describe, apply, delete, logs। যেহেতু এটি একটি HTTP API-র ওপর কেবল একটি CLI, একই কমান্ড আপনার ল্যাপটপ, একজন সহকর্মীর মেশিন বা একটি স্বয়ংক্রিয় পাইপলাইন থেকে কাজ করে, এ কারণেই kubectl কুবারনেটিস পরিচালনার সর্বজনীন ভাষা।') },
        { note: l('kubectl is the remote control for your cluster — every button sends a request to the control plane. You never touch the machines directly; you press a button and the control plane makes it happen.', 'kubectl হলো আপনার ক্লাস্টারের রিমোট কন্ট্রোল—প্রতিটি বোতাম control plane-এ একটি অনুরোধ পাঠায়। আপনি কখনো সরাসরি মেশিনে হাত দেন না; আপনি একটি বোতাম চাপেন ও control plane তা ঘটায়।'), kind: 'tip' },
      ],
    },
    {
      h: l('How the everyday loop works', 'প্রতিদিনের লুপ কীভাবে কাজ করে'),
      blocks: [
        { steps: [
          l('Apply a manifest — kubectl apply -f sends your desired state to the API server, which creates or updates the objects.', 'একটি ম্যানিফেস্ট অ্যাপ্লাই করুন—kubectl apply -f আপনার কাঙ্ক্ষিত অবস্থা API সার্ভারে পাঠায়, যা অবজেক্ট তৈরি বা আপডেট করে।'),
          l('Get — kubectl get pods lists what is running so you can confirm the objects exist and see their status.', 'get—kubectl get pods কী চলছে তালিকা করে যাতে আপনি অবজেক্ট আছে তা নিশ্চিত করতে ও তাদের status দেখতে পারেন।'),
          l('Describe — kubectl describe shows the full detail and, crucially, the recent events that explain why a pod is unhealthy.', 'describe—kubectl describe পূর্ণ বিস্তারিত এবং গুরুত্বপূর্ণভাবে সাম্প্রতিক event দেখায় যা ব্যাখ্যা করে একটি pod কেন অসুস্থ।'),
          l('Logs — kubectl logs streams a container’s output so you can read what the application itself printed.', 'logs—kubectl logs একটি কন্টেইনারের আউটপুট স্ট্রিম করে যাতে আপনি অ্যাপ্লিকেশন নিজে যা প্রিন্ট করেছে তা পড়তে পারেন।'),
          l('Repeat — edit the file, apply again, and Kubernetes reconciles only the difference; the same four verbs cover almost all daily work.', 'পুনরাবৃত্তি—ফাইল এডিট করুন, আবার অ্যাপ্লাই করুন, ও কুবারনেটিস শুধু পার্থক্য মেলায়; এই একই চারটি verb প্রায় সব দৈনন্দিন কাজ ঢাকে।'),
        ] },
        { code: `kubectl apply -f app.yaml     # create or update from a manifest
kubectl get pods              # see what is running
kubectl describe pod web-xyz  # events and current state
kubectl logs -f web-xyz       # follow the container output`, caption: l('apply is declarative — run it again after editing the file and Kubernetes reconciles the difference. get, describe, and logs are the three lenses you use to inspect what the cluster is actually doing.', 'apply ডিক্লারেটিভ — ফাইল এডিটের পর আবার চালান, কুবারনেটিস পার্থক্য মেলায়। get, describe ও logs হলো সেই তিনটি লেন্স যা দিয়ে আপনি ক্লাস্টার আসলে কী করছে তা পরিদর্শন করেন।') },
      ],
    },
    {
      h: l('Key commands', 'মূল কমান্ড'),
      blocks: [
        { table: {
          head: [l('Goal', 'লক্ষ্য'), l('Command', 'কমান্ড')],
          rows: [
            [l('Show cluster nodes', 'নোড দেখুন'), l('kubectl get nodes', 'kubectl get nodes')],
            [l('List pods', 'পড তালিকা'), l('kubectl get pods', 'kubectl get pods')],
            [l('Describe a resource', 'রিসোর্স বর্ণনা'), l('kubectl describe pod x', 'kubectl describe pod x')],
            [l('Apply a manifest', 'ম্যানিফেস্ট অ্যাপ্লাই'), l('kubectl apply -f app.yaml', 'kubectl apply -f app.yaml')],
          ],
        } },
        { note: l('get gives you the quick list, describe gives you the full detail and events for one resource, and apply pushes your desired state. Learn these three verbs first and you can operate a cluster on day one.', 'get দ্রুত তালিকা দেয়, describe একটি রিসোর্সের পূর্ণ বিস্তারিত ও event দেয়, আর apply আপনার কাঙ্ক্ষিত অবস্থা পাঠায়। এই তিনটি verb আগে শিখুন, প্রথম দিন থেকেই একটি ক্লাস্টার চালাতে পারবেন।'), kind: 'tip' },
      ],
    },
    {
      h: l('When and where to use it', 'কখন ও কোথায় ব্যবহার করবেন'),
      blocks: [
        { p: l('The right habit is to use kubectl apply -f for changes and get/describe/logs to inspect what is happening. Reach for apply whenever you are changing what should run — creating objects, scaling, updating an image — because it is declarative: it reads a file and makes the cluster match, so the file stays the record of truth. Reach for the read-only verbs constantly: get to see the list, describe to read events when something is stuck, and logs to read what a container printed. Together, apply to change and get/describe/logs to observe cover the vast majority of real work.', 'সঠিক অভ্যাস হলো পরিবর্তনে kubectl apply -f ও কী ঘটছে দেখতে get/describe/logs ব্যবহার করা। apply-এর দিকে যান যখনই আপনি কী চলা উচিত তা বদলাচ্ছেন—অবজেক্ট তৈরি, স্কেলিং, একটি image আপডেট—কারণ এটি ডিক্লারেটিভ: এটি একটি ফাইল পড়ে ও ক্লাস্টারকে মেলায়, তাই ফাইলটি সত্যের রেকর্ড থাকে। read-only verb-গুলোর দিকে অবিরত যান: তালিকা দেখতে get, কিছু আটকে গেলে event পড়তে describe, ও একটি কন্টেইনার যা প্রিন্ট করেছে তা পড়তে logs। একসঙ্গে, বদলাতে apply ও পর্যবেক্ষণে get/describe/logs আসল কাজের বিশাল অংশ ঢাকে।') },
        { p: l('kubectl is powerful and scriptable, but imperative one-off commands drift from your version-controlled manifests. Commands like kubectl scale, kubectl set image, or kubectl edit change the live cluster directly, and if you never reflect them back into your YAML, the file and the cluster quietly disagree. They are fine for a quick experiment or an emergency, but for anything you want to keep, make the change in the manifest, commit it, and apply — so the next person (including future you) can trust the files. Where correctness and repeatability matter, prefer apply over imperative edits.', 'kubectl শক্তিশালী ও স্ক্রিপ্টযোগ্য, তবে ইম্পারেটিভ এককালীন কমান্ড আপনার ভার্সন-কন্ট্রোলড ম্যানিফেস্ট থেকে সরে যায়। kubectl scale, kubectl set image বা kubectl edit-এর মতো কমান্ড সরাসরি লাইভ ক্লাস্টার বদলায়, আর আপনি সেগুলো কখনো YAML-এ না ফেরালে ফাইল ও ক্লাস্টার নীরবে দ্বিমত হয়। একটি দ্রুত পরীক্ষা বা জরুরি অবস্থার জন্য এগুলো ঠিক আছে, কিন্তু আপনি যা রাখতে চান তার জন্য পরিবর্তনটি ম্যানিফেস্টে করুন, commit করুন ও apply করুন—যাতে পরের ব্যক্তি (ভবিষ্যতের আপনিসহ) ফাইলে বিশ্বাস করতে পারে। যেখানে সঠিকতা ও পুনরাবৃত্তিযোগ্যতা গুরুত্বপূর্ণ, সেখানে ইম্পারেটিভ এডিটের চেয়ে apply নিন।') },
      ],
    },
    {
      h: l('Reading kubectl output when debugging', 'ডিবাগিংয়ে kubectl আউটপুট পড়া'),
      blocks: [
        { p: l('Most of the time you spend with kubectl is not changing the cluster but reading it to understand a problem, and there is a reliable order to follow. Start wide and narrow down until the cluster tells you exactly what is wrong.', 'kubectl-এ আপনার বেশিরভাগ সময় ক্লাস্টার বদলানো নয়, বরং একটি সমস্যা বুঝতে এটি পড়া, আর অনুসরণ করার একটি নির্ভরযোগ্য ক্রম আছে। প্রশস্ত থেকে শুরু করুন ও সংকুচিত করুন যতক্ষণ না ক্লাস্টার ঠিক কী ভুল তা বলে।') },
        { steps: [
          l('kubectl get pods first — the STATUS column (Running, Pending, CrashLoopBackOff, ImagePullBackOff) already names the category of problem.', 'প্রথমে kubectl get pods—STATUS কলাম (Running, Pending, CrashLoopBackOff, ImagePullBackOff) ইতিমধ্যে সমস্যার শ্রেণি বলে দেয়।'),
          l('kubectl describe pod x next — scroll to the Events section at the bottom, which usually states the exact cause in plain language.', 'তারপর kubectl describe pod x—নিচের Events বিভাগে যান, যা সাধারণত সরল ভাষায় ঠিক কারণটি বলে।'),
          l('kubectl logs x last — if the container started but the app itself is failing, its own output is where the real error lives; add -f to follow it live.', 'শেষে kubectl logs x—কন্টেইনার চালু হয়েও অ্যাপ নিজে ব্যর্থ হলে তার নিজের আউটপুটেই আসল ত্রুটি থাকে; লাইভ follow করতে -f যোগ করুন।'),
        ] },
        { note: l('The habit get → describe → logs answers most "why is my pod not working?" questions in under a minute, without guessing.', 'get → describe → logs অভ্যাসটি বেশিরভাগ "আমার pod কেন কাজ করছে না?" প্রশ্নের উত্তর এক মিনিটেরও কম সময়ে দেয়, আন্দাজ ছাড়াই।'), kind: 'tip' },
      ],
    },
    {
      h: l('Common mistakes', 'সাধারণ ভুল'),
      blocks: [
        { list: [
          l('Making quick imperative edits with kubectl edit and never reflecting them back into your YAML in git, so the manifest lies about the real state.', 'kubectl edit দিয়ে দ্রুত ইম্পারেটিভ এডিট করা আর কখনো git-এর YAML-এ তা না ফেরানো, ফলে ম্যানিফেস্ট আসল অবস্থা নিয়ে মিথ্যা বলে।'),
          l('Skipping describe when a pod misbehaves — the events at the bottom usually name the exact cause (image pull error, failed schedule, crash loop).', 'একটি pod খারাপ আচরণ করলে describe এড়ানো—নিচের event সাধারণত ঠিক কারণটি বলে (image pull ত্রুটি, ব্যর্থ schedule, crash loop)।'),
          l('Using kubectl create or kubectl run for things you will keep, instead of apply, losing the declarative, re-runnable behaviour.', 'রাখবেন এমন জিনিসের জন্য apply-র বদলে kubectl create বা kubectl run ব্যবহার করা, ডিক্লারেটিভ, পুনঃচালানোযোগ্য আচরণ হারানো।'),
          l('Forgetting which cluster or namespace kubectl is pointing at, and running a command against the wrong environment.', 'kubectl কোন ক্লাস্টার বা namespace-এ নির্দেশ করছে ভুলে যাওয়া, ও ভুল এনভায়রনমেন্টে একটি কমান্ড চালানো।'),
        ] },
      ],
    },
    {
      h: l('Remember in one line', 'এক লাইনে মনে রাখুন'),
      blocks: [
        { list: [
          l('kubectl is the CLI that talks to the API server to create, inspect, update, and delete objects.', 'kubectl হলো সেই CLI যা অবজেক্ট তৈরি, পরিদর্শন, আপডেট ও ডিলিট করতে API সার্ভারের সঙ্গে কথা বলে।'),
          l('Use apply -f to change state declaratively; use get, describe, and logs to see what is happening.', 'অবস্থা ডিক্লারেটিভভাবে বদলাতে apply -f নিন; কী ঘটছে দেখতে get, describe ও logs নিন।'),
          l('Imperative one-off edits drift from your manifests — keep changes in YAML, commit, and apply.', 'ইম্পারেটিভ এককালীন এডিট আপনার ম্যানিফেস্ট থেকে সরে যায়—পরিবর্তন YAML-এ রাখুন, commit করুন ও apply করুন।'),
        ] },
      ],
    },
  ],

  // ── k8s-pods · Pods: the smallest unit ────────────────────────────────────
  'k8s-pods': [
    {
      h: l('What is a pod?', 'পড কী?'),
      blocks: [
        { p: l('A pod is the smallest deployable unit in Kubernetes — one or more containers that share a network address and storage. You never schedule a bare container; you schedule a pod, and Kubernetes runs the container(s) inside it together on the same node. Most pods hold exactly one container, but when a pod holds several, those containers are tightly coupled: they share the same IP address, the same localhost, and can share the same volumes, so they behave like one cooperating unit rather than independent programs.', 'একটি পড হলো কুবারনেটিসের ক্ষুদ্রতম ডিপ্লয়যোগ্য একক—এক বা একাধিক কন্টেইনার যারা একটি নেটওয়ার্ক ঠিকানা ও স্টোরেজ শেয়ার করে। আপনি কখনো একটি খালি কন্টেইনার শিডিউল করেন না; আপনি একটি পড শিডিউল করেন, ও কুবারনেটিস তার ভেতরের কন্টেইনার(গুলো) একই node-এ একসঙ্গে চালায়। বেশিরভাগ পডে ঠিক একটি কন্টেইনার থাকে, কিন্তু একটি পডে কয়েকটি থাকলে সেই কন্টেইনারগুলো শক্তভাবে যুক্ত: তারা একই IP ঠিকানা, একই localhost শেয়ার করে ও একই volume শেয়ার করতে পারে, তাই তারা স্বাধীন প্রোগ্রাম নয়, একটি সহযোগী একক হিসেবে আচরণ করে।') },
        { p: l('The problem the pod abstraction solves is giving containers a shared context. Sometimes an application needs a helper right beside it — a container that ships its logs, or a proxy that fronts its traffic — and those helpers need to reach the main container over localhost and see the same files. A pod is the box that guarantees this: everything in it lands on one node, comes up and goes away together, and shares one network identity, so tightly-coupled containers can rely on each other being present and local.', 'পড বিমূর্ততা যে সমস্যা সমাধান করে তা হলো কন্টেইনারকে একটি শেয়ার্ড কনটেক্সট দেওয়া। কখনো একটি অ্যাপ্লিকেশনের ঠিক পাশে একটি সহায়ক দরকার—একটি কন্টেইনার যা তার লগ পাঠায়, বা একটি প্রক্সি যা তার ট্রাফিকের সামনে থাকে—আর সেই সহায়কদের localhost দিয়ে মূল কন্টেইনারে পৌঁছাতে ও একই ফাইল দেখতে হয়। একটি পড হলো সেই বাক্স যা এটি নিশ্চিত করে: এর ভেতরের সবকিছু এক node-এ বসে, একসঙ্গে ওঠে ও যায়, ও একটি নেটওয়ার্ক পরিচয় শেয়ার করে, তাই শক্তভাবে যুক্ত কন্টেইনার একে অপরের উপস্থিতি ও স্থানীয়তার ওপর নির্ভর করতে পারে।') },
        { note: l('A pod is a shared apartment: the containers inside are roommates sharing one address and utilities. They have separate rooms (their own processes and images) but one front door, one street address, and a shared kitchen.', 'একটি পড হলো একটি শেয়ার্ড অ্যাপার্টমেন্ট: ভেতরের কন্টেইনার হলো একটি ঠিকানা ও ইউটিলিটি শেয়ার করা রুমমেট। তাদের আলাদা ঘর (নিজস্ব প্রসেস ও image) আছে কিন্তু একটি সদর দরজা, একটি রাস্তার ঠিকানা ও একটি শেয়ার্ড রান্নাঘর।'), kind: 'tip' },
      ],
    },
    {
      h: l('How a pod runs, step by step', 'একটি পড কীভাবে চলে, ধাপে ধাপে'),
      blocks: [
        { steps: [
          l('You define a pod in a manifest — its name, labels, and the container(s) with their images and ports.', 'আপনি একটি ম্যানিফেস্টে একটি পড সংজ্ঞায়িত করেন—এর নাম, label ও কন্টেইনার(গুলো) তাদের image ও port সহ।'),
          l('You apply it; the scheduler picks a node with enough room and assigns the whole pod to that single node.', 'আপনি অ্যাপ্লাই করেন; scheduler যথেষ্ট জায়গাযুক্ত একটি node বাছে ও পুরো পডটি সেই একটি node-এ বরাদ্দ করে।'),
          l('The kubelet on that node pulls the images and starts every container in the pod, sharing one network namespace.', 'সেই node-এর kubelet image টানে ও পডের প্রতিটি কন্টেইনার চালু করে, একটি নেটওয়ার্ক namespace শেয়ার করে।'),
          l('The pod gets its own IP address; containers inside reach each other over localhost, and the pod is reachable at that IP.', 'পডটি নিজের একটি IP ঠিকানা পায়; ভেতরের কন্টেইনার localhost দিয়ে একে অপরে পৌঁছায়, ও পডটি সেই IP-তে পৌঁছানো যায়।'),
          l('If the pod dies, Kubernetes does not repair it — it replaces the whole pod with a new one, which gets a new IP.', 'পড মরলে কুবারনেটিস এটি মেরামত করে না—এটি পুরো পডটিকে একটি নতুন পড দিয়ে প্রতিস্থাপন করে, যা একটি নতুন IP পায়।'),
        ] },
        { code: `apiVersion: v1
kind: Pod
metadata:
  name: web
  labels:
    app: web
spec:
  containers:
    - name: nginx
      image: nginx:1.25
      ports:
        - containerPort: 80`, caption: l('In practice you rarely create bare Pods — a Deployment manages them for you. This minimal manifest shows the core shape: one container named nginx, running the nginx:1.25 image, listening on port 80, labelled app: web so other objects can find it.', 'বাস্তবে খালি Pod কমই বানান — একটি Deployment আপনার জন্য এদের সামলায়। এই ন্যূনতম ম্যানিফেস্ট মূল আকার দেখায়: nginx নামের একটি কন্টেইনার, nginx:1.25 image চালায়, port 80-এ শোনে, app: web লেবেলযুক্ত যাতে অন্য অবজেক্ট এটি খুঁজে পায়।') },
      ],
    },
    {
      h: l('Key commands', 'মূল কমান্ড'),
      blocks: [
        { table: {
          head: [l('Goal', 'লক্ষ্য'), l('Command', 'কমান্ড')],
          rows: [
            [l('List pods', 'পড তালিকা'), l('kubectl get pods', 'kubectl get pods')],
            [l('Pod details', 'পড বিস্তারিত'), l('kubectl describe pod x', 'kubectl describe pod x')],
            [l('Pod logs', 'পড লগ'), l('kubectl logs x', 'kubectl logs x')],
            [l('Delete a pod', 'পড ডিলিট'), l('kubectl delete pod x', 'kubectl delete pod x')],
          ],
        } },
        { note: l('Deleting a pod that a Deployment manages does not remove it for good — the controller sees the count drop and creates a fresh replacement, which is exactly how a rolling restart works.', 'একটি Deployment যে পড সামলায় তা ডিলিট করলে সেটি চিরতরে যায় না—controller সংখ্যা কমতে দেখে ও একটি টাটকা প্রতিস্থাপন তৈরি করে, ঠিক এভাবেই একটি rolling restart কাজ করে।'), kind: 'tip' },
      ],
    },
    {
      h: l('When and where to use pods', 'কখন ও কোথায় পড ব্যবহার করবেন'),
      blocks: [
        { p: l('The practical guidance is to usually run one container per pod, and let Kubernetes schedule, restart, and replace pods as whole units. One container per pod is the default because it keeps each thing independently scalable and replaceable; add a second container only when it is a genuine helper that must live beside the main one and share its network and files — a logging sidecar or a proxy, not an unrelated service. Because the pod is the unit Kubernetes acts on, everything inside it scales together, restarts together, and moves together, so only put things in the same pod when you truly want them to share that fate.', 'ব্যবহারিক নির্দেশনা হলো সাধারণত প্রতি পডে একটি কন্টেইনার চালানো, ও কুবারনেটিসকে পডকে সম্পূর্ণ একক হিসেবে শিডিউল, রিস্টার্ট ও প্রতিস্থাপন করতে দেওয়া। প্রতি পডে একটি কন্টেইনার ডিফল্ট কারণ এটি প্রতিটি জিনিসকে স্বাধীনভাবে স্কেলযোগ্য ও প্রতিস্থাপনযোগ্য রাখে; দ্বিতীয় কন্টেইনার যোগ করুন শুধু তখনই যখন এটি একটি সত্যিকারের সহায়ক যা মূলটির পাশে থাকতে ও তার নেটওয়ার্ক ও ফাইল শেয়ার করতে হবে—একটি লগিং সাইডকার বা একটি প্রক্সি, একটি অসম্পর্কিত সার্ভিস নয়। যেহেতু পড হলো সেই একক যার ওপর কুবারনেটিস কাজ করে, এর ভেতরের সবকিছু একসঙ্গে স্কেল করে, একসঙ্গে রিস্টার্ট করে ও একসঙ্গে সরে, তাই একই পডে জিনিস রাখুন শুধু তখনই যখন আপনি সত্যিই চান তারা সেই ভাগ্য ভাগ করুক।') },
        { p: l('Pods give a simple shared context, but they are ephemeral — their IP changes and they are replaced, not repaired. This is the single most important thing to internalize: a pod is cattle, not a pet. When it crashes or its node dies, Kubernetes does not fix that pod; it throws it away and creates a new one, with a new name and a new IP. So you should almost never create bare pods for real work and never depend on a pod’s IP. Instead, run pods through a Deployment (so they are recreated automatically) and reach them through a Service (which gives a stable name in front of ever-changing pod IPs).', 'পড একটি সরল শেয়ার্ড কনটেক্সট দেয়, তবে ক্ষণস্থায়ী—তাদের IP বদলায় ও এদের মেরামত নয়, প্রতিস্থাপন করা হয়। এটাই সবচেয়ে গুরুত্বপূর্ণ যা আত্মস্থ করতে হবে: একটি পড গবাদি পশু, পোষা প্রাণী নয়। এটি ক্র্যাশ করলে বা তার node মরলে কুবারনেটিস সেই পডটি ঠিক করে না; এটি ফেলে দেয় ও একটি নতুন তৈরি করে, নতুন নাম ও নতুন IP সহ। তাই আপনার প্রায় কখনোই আসল কাজের জন্য খালি পড তৈরি করা উচিত নয় ও কখনো একটি পডের IP-র ওপর নির্ভর করা উচিত নয়। বরং, পড একটি Deployment-এর মাধ্যমে চালান (যাতে এগুলো স্বয়ংক্রিয়ভাবে আবার তৈরি হয়) ও একটি Service-এর মাধ্যমে পৌঁছান (যা অবিরত-বদলানো পড IP-র সামনে একটি স্থিতিশীল নাম দেয়)।') },
        { note: l('Never connect to a pod by its IP address — when the pod is rescheduled it comes back with a new one and your connection breaks. Put a Service in front to get a stable name and address.', 'কখনো একটি পডে তার IP ঠিকানা দিয়ে সংযোগ করবেন না—পডটি পুনঃশিডিউল হলে এটি একটি নতুন IP নিয়ে ফেরে ও আপনার সংযোগ ভাঙে। একটি স্থিতিশীল নাম ও ঠিকানা পেতে সামনে একটি Service রাখুন।'), kind: 'warn' },
      ],
    },
    {
      h: l('Common mistakes', 'সাধারণ ভুল'),
      blocks: [
        { list: [
          l('Connecting to a pod by its IP, then breaking when the pod is rescheduled with a new address — always go through a Service instead.', 'একটি পডে তার IP দিয়ে সংযোগ করা, তারপর পডটি নতুন ঠিকানায় পুনঃশিডিউল হলে ভাঙা—সবসময় বরং একটি Service-এর মধ্য দিয়ে যান।'),
          l('Creating bare pods for real workloads, so nothing recreates them after a crash — use a Deployment to get self-healing.', 'আসল ওয়ার্কলোডের জন্য খালি পড তৈরি করা, ফলে ক্র্যাশের পর কিছুই এগুলো আবার তৈরি করে না—self-healing পেতে একটি Deployment ব্যবহার করুন।'),
          l('Expecting a pod to be repaired in place or keep its state — a crashed pod is replaced by a brand-new one, losing anything not stored on a persistent volume.', 'একটি পড জায়গায় মেরামত হবে বা তার state রাখবে আশা করা—একটি ক্র্যাশ করা পড একটি একদম নতুন পড দিয়ে প্রতিস্থাপিত হয়, persistent volume-এ সংরক্ষিত নয় এমন কিছু হারায়।'),
          l('Cramming unrelated containers into one pod, coupling their lifecycle and scaling when they should be separate pods.', 'অসম্পর্কিত কন্টেইনার এক পডে ঠাসা, তাদের lifecycle ও scaling যুক্ত করা যখন তাদের আলাদা পড হওয়া উচিত।'),
        ] },
      ],
    },
    {
      h: l('Remember in one line', 'এক লাইনে মনে রাখুন'),
      blocks: [
        { list: [
          l('A pod is the smallest deployable unit — one or more containers sharing a network address and storage.', 'একটি পড হলো ক্ষুদ্রতম ডিপ্লয়যোগ্য একক—এক বা একাধিক কন্টেইনার যারা একটি নেটওয়ার্ক ঠিকানা ও স্টোরেজ শেয়ার করে।'),
          l('Usually one container per pod; Kubernetes schedules, restarts, and replaces pods as whole units.', 'সাধারণত প্রতি পডে একটি কন্টেইনার; কুবারনেটিস পডকে সম্পূর্ণ একক হিসেবে শিডিউল, রিস্টার্ট ও প্রতিস্থাপন করে।'),
          l('Pods are ephemeral — their IP changes and they are replaced, not repaired, so run them via a Deployment and reach them via a Service.', 'পড ক্ষণস্থায়ী—তাদের IP বদলায় ও এদের মেরামত নয়, প্রতিস্থাপন করা হয়, তাই একটি Deployment দিয়ে চালান ও একটি Service দিয়ে পৌঁছান।'),
        ] },
      ],
    },
  ],
}
