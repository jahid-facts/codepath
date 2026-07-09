// Deep, bilingual (English / Bangla) teaching guides for the Docker course —
// Foundations & working with images. Shape mirrors app/course-guides.js and
// app/guides/git/a.js: each guide is an array of sections { h, blocks }, rendered
// by GuideBlock in app/LearningApp.js. Block types: { p }, { list }, { steps },
// { table:{head,rows} }, { note, kind }, { code, caption }.
// Facts (definitions, analogies, commands, trade-offs, mistakes) come from app/courses/docker.js.

const l = (en, bn) => ({ en, bn })

export default {
  // ── dk-what · What is Docker? ─────────────────────────────────────────────
  'dk-what': [
    {
      h: l('What is Docker?', 'ডকার কী?'),
      blocks: [
        { p: l('Docker is a tool that packages an application together with everything it needs to run — the code, the runtime, the system libraries, and the settings — into a single sealed unit called a container. That container then runs the exact same way on your laptop, on a teammate’s machine, in a test pipeline, and on a production server. Nothing about the surrounding computer has to match, because everything the app depends on travels inside the container with it.', 'ডকার হলো একটি টুল যা একটি অ্যাপ্লিকেশনকে তার চলার জন্য প্রয়োজনীয় সবকিছুসহ—কোড, রানটাইম, সিস্টেম লাইব্রেরি ও সেটিংস—একটি সিল করা এককে প্যাকেজ করে, যাকে container বলে। সেই container আপনার ল্যাপটপে, টিমমেটের মেশিনে, টেস্ট পাইপলাইনে ও প্রোডাকশন সার্ভারে ঠিক একইভাবে চলে। চারপাশের কম্পিউটারের কিছুই মিলতে হয় না, কারণ অ্যাপ যা যা দরকার তার সব container-এর ভেতরে সঙ্গে যায়।') },
        { p: l('The core problem Docker solves is the oldest excuse in software: "but it works on my machine." Software behaves differently across computers because they have different operating systems, different versions of a language, a missing library, or a slightly different config. Docker removes that whole class of surprises by shipping the environment along with the app. You no longer install and configure the app on each machine by hand; you build one image once and run it as a container anywhere.', 'ডকার যে মূল সমস্যা সমাধান করে তা সফটওয়্যারের সবচেয়ে পুরনো অজুহাত: "কিন্তু আমার মেশিনে তো চলে।" কম্পিউটারভেদে সফটওয়্যার আলাদা আচরণ করে কারণ তাদের OS আলাদা, একটি ভাষার ভার্সন আলাদা, একটি লাইব্রেরি নেই, বা কনফিগ একটু ভিন্ন। ডকার পুরো এই ধরনের চমক দূর করে অ্যাপের সঙ্গে এনভায়রনমেন্টটাও পাঠিয়ে। আপনি আর প্রতিটি মেশিনে হাতে অ্যাপ ইনস্টল ও কনফিগার করেন না; একবার একটি image বিল্ড করেন ও যেকোনো জায়গায় container হিসেবে চালান।') },
        { note: l('Think of a shipping container. Before them, loading a ship meant repacking every odd-shaped crate by hand. The standard steel container changed that: the same sealed box loads onto any truck, ship, or crane without repacking. A Docker container does the same for software — one sealed box that any Docker-capable machine can run without special handling.', 'একটি শিপিং container ভাবুন। এর আগে জাহাজ বোঝাই মানে ছিল প্রতিটি অদ্ভুত-আকারের ক্রেট হাতে পুনরায় প্যাক করা। প্রমিত ইস্পাত container তা বদলে দিল: একই সিল করা বাক্স যেকোনো ট্রাক, জাহাজ বা ক্রেনে ওঠে, পুনরায় প্যাক ছাড়াই। ডকার container সফটওয়্যারের জন্য একই কাজ করে—একটি সিল করা বাক্স যা যেকোনো ডকার-সক্ষম মেশিন বিশেষ যত্ন ছাড়াই চালাতে পারে।'), kind: 'tip' },
      ],
    },
    {
      h: l('How Docker works, step by step', 'ডকার কীভাবে কাজ করে, ধাপে ধাপে'),
      blocks: [
        { p: l('Docker follows one simple loop: you describe an environment, Docker builds it into an image, and you run that image as a container. The very first thing to internalize is the difference between the image (a read-only template on disk) and the container (a live, running instance of it). Everything below is that loop in practice.', 'ডকার একটি সরল চক্র অনুসরণ করে: আপনি একটি এনভায়রনমেন্ট বর্ণনা করেন, ডকার তা একটি image-এ বিল্ড করে, ও আপনি সেই image-কে container হিসেবে চালান। প্রথমেই যা মাথায় গাঁথতে হবে তা হলো image (ডিস্কে একটি রিড-অনলি টেমপ্লেট) ও container (তার একটি চলমান ইনস্ট্যান্স)-এর পার্থক্য। নিচের সব সেই চক্রেরই বাস্তব রূপ।') },
        { steps: [
          l('You (or someone else) define an app’s environment in a Dockerfile, or you grab a ready-made image such as nginx from a registry like Docker Hub.', 'আপনি (বা অন্য কেউ) একটি Dockerfile-এ অ্যাপের এনভায়রনমেন্ট সংজ্ঞায়িত করেন, অথবা Docker Hub-এর মতো registry থেকে nginx-এর মতো একটি তৈরি image নেন।'),
          l('Docker turns that into an image — a read-only, layered snapshot of a filesystem plus instructions for what to run.', 'ডকার তা একটি image-এ পরিণত করে—একটি রিড-অনলি, লেয়ারযুক্ত ফাইলসিস্টেম স্ন্যাপশট ও কী চালাতে হবে তার নির্দেশসহ।'),
          l('You run the image. Docker creates a container from it: an isolated process with its own filesystem view, running on top of your computer’s kernel.', 'আপনি image চালান। ডকার তা থেকে একটি container বানায়: একটি আলাদা প্রসেস যার নিজস্ব ফাইলসিস্টেম দৃশ্য, আপনার কম্পিউটারের kernel-এর ওপর চলছে।'),
          l('The container runs your app exactly as the image describes — same libraries, same versions — no matter which host it lands on.', 'container আপনার অ্যাপকে ঠিক image যেমন বর্ণনা করে তেমন চালায়—একই লাইব্রেরি, একই ভার্সন—যে হোস্টেই নামুক না কেন।'),
          l('When you are done, you stop and remove the container. The image stays on disk, ready to spin up a fresh, identical container any time.', 'শেষ হলে container থামিয়ে রিমুভ করেন। image ডিস্কে থাকে, যেকোনো সময় একটি নতুন, অভিন্ন container চালু করতে প্রস্তুত।'),
        ] },
        { code: `# 1. Confirm Docker is installed and the daemon is running
docker --version              # Docker version 27.x

# 2. Run your very first container (a friendly test image)
docker run hello-world        # pulls the image, then runs it once

# 3. Run a real web server in the background
docker run -d -p 8080:80 --name web nginx

# 4. See it running, then open http://localhost:8080 in a browser
docker ps`, caption: l('docker run pulls the image if it is missing, then starts a container from it. -d runs it in the background and -p maps a host port to a container port.', 'docker run image না থাকলে তা pull করে, তারপর তা থেকে একটি container চালু করে। -d একে ব্যাকগ্রাউন্ডে চালায় ও -p একটি হোস্ট পোর্টকে container পোর্টে ম্যাপ করে।') },
      ],
    },
    {
      h: l('The first commands you will use', 'যে কমান্ডগুলো প্রথমে ব্যবহার করবেন'),
      blocks: [
        { p: l('You can go a long way with a small handful of commands. These four cover the whole lifecycle of a single container — start it, look at it, and clean it up — and you will type them constantly.', 'ছোট কয়েকটি কমান্ড দিয়েই অনেকদূর যাওয়া যায়। এই চারটি একটি container-এর পুরো লাইফসাইকেল ঢাকে—চালু করুন, দেখুন, ও পরিষ্কার করুন—আর এগুলো আপনি বারবার টাইপ করবেন।') },
        { table: {
          head: [l('Goal', 'লক্ষ্য'), l('Command', 'কমান্ড')],
          rows: [
            [l('Check Docker is installed', 'ডকার ইনস্টল যাচাই'), l('docker --version', 'docker --version')],
            [l('Run a container from an image', 'ইমেজ থেকে container চালান'), l('docker run nginx', 'docker run nginx')],
            [l('List running containers', 'চলমান container দেখুন'), l('docker ps', 'docker ps')],
            [l('Stop a running container', 'চলমান container থামান'), l('docker stop web', 'docker stop web')],
          ],
        } },
        { note: l('docker run is really two steps in one: it creates a container and then starts it. That is why running the same image twice gives you two separate containers, not one — a detail that trips up many beginners.', 'docker run আসলে দুই ধাপ একসঙ্গে: এটি একটি container তৈরি করে তারপর চালু করে। এ কারণেই একই image দুবার চালালে দুটি আলাদা container পান, একটি নয়—এই খুঁটিনাটি অনেক নতুনকে বিভ্রান্ত করে।'), kind: 'tip' },
      ],
    },
    {
      h: l('When and where to use Docker', 'কখন ও কোথায় ডকার ব্যবহার করবেন'),
      blocks: [
        { p: l('Reach for Docker whenever "it must run the same everywhere" matters. That covers most real projects: shipping a web service to production, giving every developer on a team an identical setup, running a database or tool locally without polluting your machine, and running automated tests in a clean, repeatable environment in CI. Because a container is self-contained, onboarding a new teammate can shrink from a day of installing dependencies to a single docker run.', 'যেখানে "সর্বত্র একইভাবে চলতে হবে" গুরুত্বপূর্ণ সেখানেই ডকার নিন। এটি বেশিরভাগ বাস্তব প্রকল্প ঢাকে: প্রোডাকশনে একটি ওয়েব সার্ভিস পাঠানো, টিমের প্রতিটি ডেভেলপারকে অভিন্ন সেটআপ দেওয়া, নিজের মেশিন নোংরা না করে লোকালি একটি ডেটাবেস বা টুল চালানো, ও CI-তে একটি পরিষ্কার, পুনরাবৃত্তিযোগ্য এনভায়রনমেন্টে অটোমেটেড টেস্ট চালানো। container স্বয়ংসম্পূর্ণ বলে একজন নতুন টিমমেটের সেটআপ একদিন ডিপেন্ডেন্সি ইনস্টল থেকে একটি docker run-এ নেমে আসতে পারে।') },
        { p: l('Docker helps less, or adds needless weight, when a container gains you nothing: a tiny script you run once on your own machine, or a desktop GUI app that expects deep access to your operating system. It is also a trade-off, not free magic — you take on a build step, a new set of tools to learn, and image sizes to manage. For anything you intend to deploy, share, or reproduce, that cost pays for itself quickly; for a five-line throwaway, it may not.', 'যেখানে container কিছুই দেয় না সেখানে ডকার কম সাহায্য করে বা অকারণ ভার যোগ করে: নিজের মেশিনে একবার চালানো একটি ছোট স্ক্রিপ্ট, বা একটি ডেস্কটপ GUI অ্যাপ যা আপনার OS-এ গভীর অ্যাক্সেস আশা করে। এটি একটি ট্রেড-অফও, বিনা মূল্যের জাদু নয়—আপনি একটি বিল্ড ধাপ, শেখার নতুন টুল ও সামলানোর মতো image সাইজ নেন। যা ডিপ্লয়, শেয়ার বা পুনরুৎপাদন করতে চান তার জন্য এই খরচ দ্রুত পুষিয়ে যায়; পাঁচ-লাইনের ফেলে-দেওয়া কিছুর জন্য হয়তো নয়।') },
      ],
    },
    {
      h: l('Common mistakes', 'সাধারণ ভুল'),
      blocks: [
        { list: [
          l('Thinking a container is just a lightweight virtual machine. It is not a full machine at all — it shares your computer’s kernel and isolates only the process, which is why it starts in a second instead of a minute.', 'container-কে শুধু একটি হালকা virtual machine ভাবা। এটি মোটেই পূর্ণ মেশিন নয়—এটি আপনার কম্পিউটারের kernel শেয়ার করে ও শুধু প্রসেস আলাদা করে, এ কারণেই এটি এক মিনিটের বদলে এক সেকেন্ডে চালু হয়।'),
          l('Expecting one docker run to update itself. Each run makes a brand-new container; edits you make inside a running container disappear when it is recreated.', 'একটি docker run নিজে আপডেট হবে আশা করা। প্রতিটি run একটি একদম নতুন container বানায়; চলমান container-এর ভেতরে করা এডিট পুনঃতৈরিতে হারায়।'),
          l('Confusing an image with a container — building an image and then wondering why nothing is "running." An image is the template on disk; you must run it to get a container.', 'image ও container গুলিয়ে ফেলা—একটি image বিল্ড করে অবাক হওয়া কেন কিছুই "চলছে" না। image হলো ডিস্কে টেমপ্লেট; container পেতে আপনাকে তা run করতে হবে।'),
          l('Assuming Docker makes an app faster. It mainly makes it portable and consistent; the app runs at roughly native speed, not faster.', 'ধরে নেওয়া ডকার অ্যাপকে দ্রুত করে। এটি মূলত পোর্টেবল ও সামঞ্জস্যপূর্ণ করে; অ্যাপ প্রায় নেটিভ গতিতে চলে, দ্রুত নয়।'),
        ] },
      ],
    },
    {
      h: l('Remember in one line', 'এক লাইনে মনে রাখুন'),
      blocks: [
        { list: [
          l('Docker packages an app with everything it needs into a container that runs the same way anywhere.', 'ডকার একটি অ্যাপকে তার সব প্রয়োজনসহ একটি container-এ প্যাকেজ করে, যা সর্বত্র একইভাবে চলে।'),
          l('Build an image once; run it as a container as many times and in as many places as you like.', 'একবার একটি image বিল্ড করুন; যত খুশি বার ও যত জায়গায় খুশি তা container হিসেবে চালান।'),
          l('A container is an isolated process sharing the host kernel — not a full virtual machine.', 'container হলো হোস্ট kernel শেয়ার করা একটি আলাদা প্রসেস—পূর্ণ virtual machine নয়।'),
        ] },
      ],
    },
  ],

  // ── dk-vs-vm · Containers vs virtual machines ─────────────────────────────
  'dk-vs-vm': [
    {
      h: l('Containers vs virtual machines', 'কন্টেইনার বনাম ভার্চুয়াল মেশিন'),
      blocks: [
        { p: l('Both containers and virtual machines (VMs) solve the same broad goal — running software in an isolated, self-contained environment — but they do it at completely different levels. A virtual machine virtualizes an entire computer: it runs a full guest operating system, with its own kernel, on top of virtual hardware managed by a hypervisor. A container does far less: it shares the host machine’s kernel and isolates only your application’s process and its files. Understanding this one difference explains almost everything else about how they behave.', 'container ও virtual machine (VM) দুটোই একই বড় লক্ষ্য সমাধান করে—একটি আলাদা, স্বয়ংসম্পূর্ণ এনভায়রনমেন্টে সফটওয়্যার চালানো—তবে তারা তা করে সম্পূর্ণ ভিন্ন স্তরে। একটি virtual machine একটি পুরো কম্পিউটার ভার্চুয়ালাইজ করে: এটি একটি hypervisor-পরিচালিত ভার্চুয়াল হার্ডওয়্যারের ওপর নিজের kernel-সহ একটি পূর্ণ guest OS চালায়। container অনেক কম করে: এটি হোস্ট মেশিনের kernel শেয়ার করে ও শুধু আপনার অ্যাপের প্রসেস ও তার ফাইল আলাদা করে। এই একটি পার্থক্য বুঝলেই তাদের আচরণের প্রায় বাকি সব ব্যাখ্যা হয়ে যায়।') },
        { p: l('The problem this comparison settles is "how much isolation do I actually need, and what am I willing to pay for it?" A full VM gives you the strongest isolation and the freedom to run a completely different operating system, but each one carries the weight of a whole OS — gigabytes of disk, its own boot time, and a big slice of RAM. A container gives you just enough isolation to keep apps from stepping on each other, at a tiny fraction of the cost, which is why you can pack dozens of containers onto a server that would groan under a handful of VMs.', 'এই তুলনা যে প্রশ্নের মীমাংসা করে তা হলো "আমার আসলে কতটা আইসোলেশন দরকার, ও তার জন্য আমি কী দিতে রাজি?" একটি পূর্ণ VM সবচেয়ে শক্ত আইসোলেশন ও সম্পূর্ণ ভিন্ন OS চালানোর স্বাধীনতা দেয়, তবে প্রতিটি একটি পুরো OS-এর ভার বহন করে—গিগাবাইট ডিস্ক, নিজস্ব বুট টাইম ও বড় অংশ RAM। container অ্যাপগুলোকে একে অপরের ওপর পা না দিতে ঠিক যতটুকু আইসোলেশন দরকার ততটুকু দেয়, খরচের সামান্য ভগ্নাংশে, এ কারণেই একটি সার্ভারে কয়েকটি VM-এ যেখানে হাঁপিয়ে ওঠে সেখানে ডজন ডজন container রাখা যায়।') },
        { note: l('A VM is a whole separate house: its own foundation, plumbing, and walls, standing apart from everything around it. A container is a locked room inside a shared building — it has its own door and privacy, but it uses the building’s shared foundation and utilities, so adding another room is far lighter than building another house.', 'VM হলো একটি আলাদা পুরো বাড়ি: নিজের ভিত্তি, পাইপলাইন ও দেয়াল, চারপাশ থেকে আলাদা দাঁড়িয়ে। container হলো একটি শেয়ার্ড ভবনের ভেতরের একটি তালাবদ্ধ ঘর—এর নিজের দরজা ও গোপনীয়তা আছে, তবে এটি ভবনের শেয়ার্ড ভিত্তি ও সুবিধা ব্যবহার করে, তাই আরেকটি ঘর যোগ করা আরেকটি বাড়ি বানানোর চেয়ে অনেক হালকা।'), kind: 'tip' },
      ],
    },
    {
      h: l('How each one is built up', 'প্রতিটি কীভাবে গড়ে ওঠে'),
      blocks: [
        { p: l('The clearest way to see the difference is to picture the stack of layers under a running app in each model. Both sit on real hardware and a host OS, but the VM adds an entire guest OS per app, while containers share one kernel.', 'পার্থক্যটি সবচেয়ে স্পষ্ট দেখতে প্রতিটি মডেলে একটি চলমান অ্যাপের নিচের স্তরের স্তূপ কল্পনা করুন। দুটোই আসল হার্ডওয়্যার ও একটি হোস্ট OS-এর ওপর বসে, তবে VM প্রতি অ্যাপে একটি পুরো guest OS যোগ করে, আর container একটি kernel শেয়ার করে।') },
        { steps: [
          l('Virtual machine: hardware → host OS → hypervisor → a full guest OS (its own kernel) → your app. Every app you isolate drags a complete operating system along with it.', 'Virtual machine: হার্ডওয়্যার → হোস্ট OS → hypervisor → একটি পূর্ণ guest OS (নিজের kernel) → আপনার অ্যাপ। আপনি যত অ্যাপ আলাদা করেন প্রতিটি একটি সম্পূর্ণ OS টেনে আনে।'),
          l('Container: hardware → host OS and its single kernel → the Docker engine → your app in a container. The kernel is shared, so the container only carries your app and its libraries.', 'Container: হার্ডওয়্যার → হোস্ট OS ও তার একটিমাত্র kernel → ডকার ইঞ্জিন → container-এ আপনার অ্যাপ। kernel শেয়ার করা, তাই container শুধু আপনার অ্যাপ ও তার লাইব্রেরি বহন করে।'),
          l('Because the container skips the guest OS, it starts in about a second, measures in megabytes, and lets one host run many of them at once.', 'container guest OS বাদ দেয় বলে এটি প্রায় এক সেকেন্ডে চালু হয়, মেগাবাইটে মাপা যায়, ও একটি হোস্টকে একসঙ্গে অনেকগুলো চালাতে দেয়।'),
        ] },
        { code: `# A container starts in about a second — run one and time it
time docker run --rm alpine echo "hello from a container"

# The --rm flag deletes the container as soon as it exits.
# Booting a VM instead means starting a whole guest OS:
# tens of seconds and gigabytes of RAM before your app even runs.`, caption: l('The alpine image is only a few megabytes, so this whole command finishes almost instantly — a VM cannot come close to that startup cost.', 'alpine image মাত্র কয়েক মেগাবাইট, তাই পুরো কমান্ডটি প্রায় সঙ্গে সঙ্গে শেষ হয়—একটি VM সেই চালু-খরচের ধারেকাছেও আসতে পারে না।') },
      ],
    },
    {
      h: l('Containers vs VMs at a glance', 'কন্টেইনার বনাম VM এক নজরে'),
      blocks: [
        { table: {
          head: [l('Aspect', 'দিক'), l('Container', 'Container'), l('Virtual machine', 'Virtual machine')],
          rows: [
            [l('Operating system', 'অপারেটিং সিস্টেম'), l('Shares the host kernel', 'হোস্ট kernel শেয়ার করে'), l('Runs its own full guest OS', 'নিজের পূর্ণ guest OS চালায়')],
            [l('Startup time', 'চালু হওয়ার সময়'), l('About a second', 'প্রায় এক সেকেন্ড'), l('Tens of seconds (a full boot)', 'দশ সেকেন্ড (পূর্ণ বুট)')],
            [l('Size', 'সাইজ'), l('Megabytes', 'মেগাবাইট'), l('Gigabytes', 'গিগাবাইট')],
            [l('Density on one host', 'এক হোস্টে ঘনত্ব'), l('Many (dozens or more)', 'অনেক (ডজন বা বেশি)'), l('Few (heavy per instance)', 'কম (প্রতি ইনস্ট্যান্স ভারী)')],
            [l('Isolation', 'আইসোলেশন'), l('Process-level, weaker', 'প্রসেস-স্তর, দুর্বল'), l('Hardware-level, stronger', 'হার্ডওয়্যার-স্তর, শক্তিশালী')],
            [l('Best at', 'সেরা যেখানে'), l('Packaging and shipping apps', 'অ্যাপ প্যাকেজ ও শিপ করা'), l('Full OS isolation, other OSes', 'পূর্ণ OS আইসোলেশন, ভিন্ন OS')],
          ],
        } },
      ],
    },
    {
      h: l('When to use which', 'কখন কোনটা ব্যবহার করবেন'),
      blocks: [
        { p: l('Choose containers for the everyday job of packaging, shipping, and running applications, especially when you want many of them on one machine and you want them to start fast. This is the sweet spot for web services, APIs, background workers, and development environments — cases where every app runs on the same kind of Linux kernel and you just need them cleanly separated. Their speed and small size are exactly why containers, not VMs, became the default unit of modern deployment.', 'প্যাকেজিং, শিপিং ও অ্যাপ্লিকেশন চালানোর দৈনন্দিন কাজে container বাছুন, বিশেষত যখন একটি মেশিনে অনেকগুলো চান ও দ্রুত চালু চান। এটি ওয়েব সার্ভিস, API, ব্যাকগ্রাউন্ড ওয়ার্কার ও ডেভেলপমেন্ট এনভায়রনমেন্টের সেরা জায়গা—যেখানে প্রতিটি অ্যাপ একই ধরনের Linux kernel-এ চলে ও আপনার শুধু পরিষ্কার আলাদা করা দরকার। তাদের গতি ও ছোট সাইজই ঠিক সেই কারণ যে VM নয়, container আধুনিক ডিপ্লয়মেন্টের ডিফল্ট একক হয়ে উঠল।') },
        { p: l('Choose a VM when you need stronger isolation or a genuinely different operating system: running Windows software on a Linux server, keeping hostile or untrusted workloads walled off with a hardware boundary, or meeting a compliance rule that demands full separation. In practice the two are often layered together — cloud providers run your containers inside VMs — so it is rarely one versus the other, but the right tool for the level of isolation you actually need.', 'শক্ত আইসোলেশন বা সত্যিকারের ভিন্ন OS দরকার হলে VM বাছুন: একটি Linux সার্ভারে Windows সফটওয়্যার চালানো, প্রতিকূল বা অবিশ্বস্ত ওয়ার্কলোডকে একটি হার্ডওয়্যার সীমানায় আটকে রাখা, বা পূর্ণ পৃথকীকরণ দাবি করা একটি কমপ্লায়েন্স নিয়ম মানা। বাস্তবে দুটি প্রায়ই একসঙ্গে স্তরে সাজানো থাকে—ক্লাউড প্রোভাইডাররা আপনার container VM-এর ভেতরে চালায়—তাই এটি কদাচিৎ একটির বিরুদ্ধে আরেকটি, বরং আপনার দরকারি আইসোলেশন স্তরের জন্য সঠিক টুল।') },
      ],
    },
    {
      h: l('Common mistakes', 'সাধারণ ভুল'),
      blocks: [
        { list: [
          l('Assuming containers isolate as strongly as VMs. Because they share the host kernel, a kernel-level exploit can cross the container boundary in a way it cannot cross a VM’s hardware boundary.', 'ধরে নেওয়া container VM-এর মতো শক্ত আইসোলেশন দেয়। তারা হোস্ট kernel শেয়ার করে বলে একটি kernel-স্তরের এক্সপ্লয়েট container সীমানা পার করতে পারে, যা একটি VM-এর হার্ডওয়্যার সীমানা পার করতে পারে না।'),
          l('Calling a container "a lightweight VM." The phrase hides the key fact that a container has no OS of its own — it borrows the host’s kernel.', 'container-কে "একটি হালকা VM" বলা। এই কথাটি মূল সত্যটি লুকায় যে container-এর নিজের কোনো OS নেই—এটি হোস্টের kernel ধার করে।'),
          l('Trying to run a fundamentally different OS in a container — for example expecting a Windows app to run in a Linux container. Containers reuse the host kernel, so the kernel type has to match.', 'container-এ একটি মৌলিকভাবে ভিন্ন OS চালানোর চেষ্টা—যেমন একটি Windows অ্যাপ একটি Linux container-এ চলবে আশা করা। container হোস্ট kernel পুনঃব্যবহার করে, তাই kernel ধরন মিলতে হবে।'),
          l('Provisioning heavy VMs for stateless web apps that a handful of small containers would run faster and cheaper.', 'স্টেটলেস ওয়েব অ্যাপের জন্য ভারী VM নেওয়া, যা কয়েকটি ছোট container দ্রুত ও সস্তায় চালাত।'),
        ] },
      ],
    },
    {
      h: l('Remember in one line', 'এক লাইনে মনে রাখুন'),
      blocks: [
        { list: [
          l('A VM virtualizes whole hardware and runs its own OS; a container shares the host kernel and isolates just the process.', 'VM পুরো হার্ডওয়্যার ভার্চুয়ালাইজ করে ও নিজের OS চালায়; container হোস্ট kernel শেয়ার করে ও শুধু প্রসেস আলাদা করে।'),
          l('Containers start in seconds and use far less memory, but their isolation is weaker than a VM’s.', 'container সেকেন্ডে চালু হয় ও অনেক কম মেমরি নেয়, তবে তাদের আইসোলেশন VM-এর চেয়ে দুর্বল।'),
          l('Use containers to package and ship apps densely; use VMs when you need full OS isolation.', 'অ্যাপ ঘনভাবে প্যাকেজ ও শিপ করতে container নিন; পূর্ণ OS আইসোলেশন দরকার হলে VM নিন।'),
        ] },
      ],
    },
  ],

  // ── dk-images-containers · Images vs containers ───────────────────────────
  'dk-images-containers': [
    {
      h: l('Images vs containers', 'ইমেজ বনাম কন্টেইনার'),
      blocks: [
        { p: l('These are the two words you will say most often in Docker, and mixing them up is the number-one source of beginner confusion. An image is a read-only template: a frozen, layered snapshot of a filesystem plus the metadata that says what to run. A container is a running instance of an image, with a thin writable layer added on top so it can change files while it runs. The image is the blueprint on disk; the container is the live thing built from it.', 'ডকারে আপনি এই দুটি শব্দই সবচেয়ে বেশি বলবেন, আর এদের গুলিয়ে ফেলা নতুনদের বিভ্রান্তির এক নম্বর উৎস। image হলো একটি রিড-অনলি টেমপ্লেট: একটি জমাটবাঁধা, লেয়ারযুক্ত ফাইলসিস্টেম স্ন্যাপশট ও কী চালাতে হবে বলা মেটাডেটাসহ। container হলো একটি image-এর চলমান ইনস্ট্যান্স, ওপরে একটি পাতলা লেখনযোগ্য লেয়ার যোগ করা যাতে চলার সময় ফাইল বদলাতে পারে। image হলো ডিস্কে ব্লুপ্রিন্ট; container হলো তা থেকে বানানো জীবন্ত জিনিস।') },
        { p: l('The problem this split solves is reuse without duplication. You build or download an image once, and then you can launch many containers from that same image — each one identical at birth, each one independent afterward. Because the image itself never changes, all those containers can share its read-only layers on disk instead of each keeping a full copy. That is what makes starting a new container cheap: Docker is not copying gigabytes, it is just adding a small writable layer on top of layers that already exist.', 'এই বিভাজন যে সমস্যা সমাধান করে তা হলো নকল ছাড়াই পুনঃব্যবহার। আপনি একবার একটি image বিল্ড বা ডাউনলোড করেন, তারপর সেই একই image থেকে অনেক container চালু করতে পারেন—প্রতিটি জন্মে অভিন্ন, তারপর প্রতিটি স্বাধীন। image নিজে কখনো বদলায় না বলে এই সব container ডিস্কে তার রিড-অনলি লেয়ার শেয়ার করতে পারে, প্রতিটি একটি পূর্ণ কপি রাখার বদলে। এ কারণেই একটি নতুন container চালু করা সস্তা: ডকার গিগাবাইট কপি করছে না, শুধু আগে থেকেই থাকা লেয়ারের ওপর একটি ছোট লেখনযোগ্য লেয়ার যোগ করছে।') },
        { note: l('If you know a little programming, the cleanest analogy is: an image is a class and a container is an object. One class (blueprint) can create many objects (running instances), each with its own state, all sharing the same definition.', 'আপনি একটু প্রোগ্রামিং জানলে সবচেয়ে পরিষ্কার উপমা: image হলো একটি class ও container হলো একটি object। একটি class (ব্লুপ্রিন্ট) অনেক object (চলমান ইনস্ট্যান্স) বানাতে পারে, প্রতিটির নিজের state, সবাই একই সংজ্ঞা শেয়ার করে।'), kind: 'tip' },
      ],
    },
    {
      h: l('How a container is created from an image', 'একটি ইমেজ থেকে container কীভাবে তৈরি হয়'),
      blocks: [
        { steps: [
          l('You get an image onto your machine — either build it from a Dockerfile or pull it from a registry with docker pull.', 'আপনি একটি image মেশিনে আনেন—হয় একটি Dockerfile থেকে বিল্ড করেন বা docker pull দিয়ে একটি registry থেকে pull করেন।'),
          l('You run the image. Docker stacks a new, empty writable layer on top of the image’s read-only layers and starts the process — that combination is the container.', 'আপনি image চালান। ডকার image-এর রিড-অনলি লেয়ারের ওপর একটি নতুন, খালি লেখনযোগ্য লেয়ার বসিয়ে প্রসেস শুরু করে—সেই মিশ্রণই container।'),
          l('As the container runs, any file it writes or changes goes into its own writable layer, leaving the shared image untouched.', 'container চলার সময় এটি যে ফাইল লেখে বা বদলায় তা তার নিজের লেখনযোগ্য লেয়ারে যায়, শেয়ার্ড image অক্ষত রেখে।'),
          l('Run the same image again and you get a second container with its own separate writable layer — the two do not share their changes.', 'একই image আবার চালান, নিজের আলাদা লেখনযোগ্য লেয়ারসহ দ্বিতীয় একটি container পান—দুটি তাদের পরিবর্তন শেয়ার করে না।'),
          l('Remove a container and its writable layer is deleted with it. The image stays on disk, ready to create fresh containers again.', 'একটি container রিমুভ করুন, তার লেখনযোগ্য লেয়ারও সঙ্গে মোছে। image ডিস্কে থাকে, আবার নতুন container বানাতে প্রস্তুত।'),
        ] },
        { code: `# One image on disk...
docker pull nginx

# ...many independent containers created from it
docker run -d --name web1 nginx
docker run -d --name web2 nginx

# Two separate containers, each with its own writable layer,
# both sharing the single read-only nginx image underneath
docker ps`, caption: l('web1 and web2 are distinct containers from the same image. A change inside web1 never appears in web2, and neither changes the nginx image.', 'web1 ও web2 একই image থেকে আলাদা container। web1-এর ভেতরের পরিবর্তন web2-তে কখনো আসে না, ও কোনোটিই nginx image বদলায় না।') },
      ],
    },
    {
      h: l('Image vs container at a glance', 'ইমেজ বনাম container এক নজরে'),
      blocks: [
        { table: {
          head: [l('Aspect', 'দিক'), l('Image', 'Image'), l('Container', 'Container')],
          rows: [
            [l('What it is', 'কী'), l('A read-only template', 'একটি রিড-অনলি টেমপ্লেট'), l('A running instance of an image', 'একটি image-এর চলমান ইনস্ট্যান্স')],
            [l('State', 'অবস্থা'), l('Fixed; never changes once built', 'নির্দিষ্ট; বিল্ড হলে আর বদলায় না'), l('Live; has a writable layer', 'জীবন্ত; একটি লেখনযোগ্য লেয়ার আছে')],
            [l('How many', 'কতগুলো'), l('One, reused everywhere', 'একটি, সর্বত্র পুনঃব্যবহৃত'), l('Many from a single image', 'একটি image থেকে অনেক')],
            [l('Lives where', 'কোথায় থাকে'), l('On disk as layers', 'ডিস্কে লেয়ার হিসেবে'), l('In memory as a process', 'মেমরিতে একটি প্রসেস হিসেবে')],
            [l('Made by', 'বানানো হয়'), l('docker build or docker pull', 'docker build বা docker pull'), l('docker run', 'docker run')],
          ],
        } },
      ],
    },
    {
      h: l('The writable layer is temporary', 'লেখনযোগ্য লেয়ার অস্থায়ী'),
      blocks: [
        { p: l('The single most important consequence of this design is that a container’s writable layer is throwaway. Anything the container writes — an uploaded file, rows in a database, a log — lives only in that top layer, and that layer is destroyed the moment you run docker rm. Containers are meant to be disposable: you should be able to stop, delete, and recreate one at any time without a second thought. That is a feature, not a flaw, but it has a sharp edge.', 'এই নকশার সবচেয়ে গুরুত্বপূর্ণ পরিণতি হলো container-এর লেখনযোগ্য লেয়ার ফেলে-দেওয়ার মতো। container যা কিছু লেখে—একটি আপলোড করা ফাইল, একটি ডেটাবেসের রো, একটি লগ—তা শুধু সেই ওপরের লেয়ারে থাকে, ও docker rm চালানোর মুহূর্তে সেই লেয়ার ধ্বংস হয়। container ফেলে-দেওয়া-যোগ্য হওয়ার কথা: আপনি যেকোনো সময় একটিকে দ্বিধা ছাড়াই থামাতে, মুছতে ও পুনঃতৈরি করতে পারবেন। এটি একটি সুবিধা, ত্রুটি নয়, তবে এর একটি ধারালো দিক আছে।') },
        { note: l('Never keep data you care about in a container’s writable layer. For anything that must survive — a database, user uploads — mount a volume, which lives outside the container and persists across removal. Storing a database inside the container and then deleting it is a classic way to lose everything.', 'যে ডেটা আপনার দরকার তা কখনো container-এর লেখনযোগ্য লেয়ারে রাখবেন না। যা টিকে থাকতে হবে—একটি ডেটাবেস, ব্যবহারকারীর আপলোড—তার জন্য একটি volume মাউন্ট করুন, যা container-এর বাইরে থাকে ও রিমুভেও টিকে থাকে। container-এর ভেতরে ডেটাবেস রেখে তারপর তা মুছে ফেলা সব হারানোর একটি ক্লাসিক উপায়।'), kind: 'warn' },
      ],
    },
    {
      h: l('When and where this matters', 'কখন ও কোথায় এটি গুরুত্বপূর্ণ'),
      blocks: [
        { p: l('This mental model matters every time you deploy or scale. When traffic grows, you handle it by running more containers from the same image, not by making one container bigger — and because they all come from one tested image, every replica is identical. When you ship a new version, you build a new image and replace the containers, rather than logging in to patch a running one. Thinking "immutable image, disposable containers" is what makes rolling updates and rollbacks clean and predictable.', 'এই মানসিক মডেল প্রতিবার ডিপ্লয় বা স্কেল করার সময় গুরুত্বপূর্ণ। ট্রাফিক বাড়লে আপনি একটি container বড় করে নয়, একই image থেকে বেশি container চালিয়ে তা সামলান—আর সবগুলো একটি টেস্টেড image থেকে আসে বলে প্রতিটি রেপ্লিকা অভিন্ন। নতুন ভার্সন পাঠানোর সময় আপনি একটি চলমান container-এ লগইন করে প্যাচ না করে একটি নতুন image বিল্ড করে container-গুলো প্রতিস্থাপন করেন। "immutable image, disposable container" ভাবাই রোলিং আপডেট ও রোলব্যাককে পরিষ্কার ও পূর্বানুমেয় করে।') },
        { p: l('It also settles the everyday question of where your data should live. Design your apps so the container holds only running code, and all real state — databases, uploaded files, anything you would be upset to lose — goes into a volume outside the container. Once you internalize that the container is expendable and the image is the source of truth, most Docker workflows suddenly make sense.', 'এটি আপনার ডেটা কোথায় থাকবে সেই দৈনন্দিন প্রশ্নেরও মীমাংসা করে। অ্যাপ এমনভাবে ডিজাইন করুন যাতে container-এ শুধু চলমান কোড থাকে, আর সব আসল state—ডেটাবেস, আপলোড করা ফাইল, যা হারালে কষ্ট পাবেন—container-এর বাইরে একটি volume-এ যায়। container ব্যয়যোগ্য ও image সত্যের উৎস—এটি একবার মাথায় গেঁথে গেলে বেশিরভাগ ডকার ওয়ার্কফ্লো হঠাৎ অর্থবহ হয়ে ওঠে।') },
      ],
    },
    {
      h: l('Common mistakes', 'সাধারণ ভুল'),
      blocks: [
        { list: [
          l('Storing important data in a container’s writable layer instead of a volume, then losing all of it the moment the container is removed or recreated.', 'গুরুত্বপূর্ণ ডেটা একটি volume-এর বদলে container-এর লেখনযোগ্য লেয়ারে রাখা, তারপর container রিমুভ বা পুনঃতৈরির মুহূর্তে সব হারানো।'),
          l('Expecting changes in one container to show up in another started from the same image. Each container has its own separate writable layer.', 'একই image থেকে চালু করা এক container-এর পরিবর্তন অন্যটিতে দেখা যাবে আশা করা। প্রতিটি container-এর নিজের আলাদা লেখনযোগ্য লেয়ার আছে।'),
          l('Editing files inside a running container to "fix" something, then wondering why the fix is gone after a redeploy. The image did not change, so the next container starts fresh.', 'কিছু "ঠিক" করতে চলমান container-এর ভেতরে ফাইল এডিট করা, তারপর অবাক হওয়া কেন রিডিপ্লয়ের পর ফিক্স নেই। image বদলায়নি, তাই পরের container নতুন করে শুরু হয়।'),
          l('Confusing the two commands: docker build makes an image; docker run makes a container. Building alone starts nothing.', 'দুটি কমান্ড গুলিয়ে ফেলা: docker build একটি image বানায়; docker run একটি container বানায়। শুধু build কিছু চালু করে না।'),
        ] },
      ],
    },
    {
      h: l('Remember in one line', 'এক লাইনে মনে রাখুন'),
      blocks: [
        { list: [
          l('An image is a read-only template; a container is a running instance of it with a writable layer on top.', 'image হলো একটি রিড-অনলি টেমপ্লেট; container হলো তার একটি চলমান ইনস্ট্যান্স, ওপরে একটি লেখনযোগ্য লেয়ারসহ।'),
          l('Image is the class, container is the object — build or pull an image once, run many containers from it.', 'image হলো class, container হলো object—একবার image বিল্ড বা pull করুন, তা থেকে অনেক container চালান।'),
          l('The writable layer is thrown away on removal, so keep real data in a volume, never in the container.', 'লেখনযোগ্য লেয়ার রিমুভে ফেলে দেওয়া হয়, তাই আসল ডেটা একটি volume-এ রাখুন, কখনো container-এ নয়।'),
        ] },
      ],
    },
  ],

  // ── dk-engine · The Docker engine & CLI ───────────────────────────────────
  'dk-engine': [
    {
      h: l('What are the Docker engine and CLI?', 'ডকার ইঞ্জিন ও CLI কী?'),
      blocks: [
        { p: l('When you type a docker command, two separate programs are actually involved. The Docker daemon (a long-running background process called dockerd) is the engine that does the real work: it builds images, downloads them, and creates, starts, and stops containers. The docker CLI is the command-line client you type into; it does none of that work itself. Instead it packages your command as a request and sends it to the daemon over an API, then prints back whatever the daemon replies. Together the daemon plus its supporting pieces are what people mean by "the Docker engine."', 'আপনি একটি docker কমান্ড টাইপ করলে আসলে দুটি আলাদা প্রোগ্রাম জড়িত। Docker daemon (dockerd নামে একটি দীর্ঘ-চলমান ব্যাকগ্রাউন্ড প্রসেস) হলো সেই ইঞ্জিন যা আসল কাজ করে: এটি image বিল্ড করে, ডাউনলোড করে, ও container তৈরি, চালু ও থামায়। docker CLI হলো কমান্ড-লাইন ক্লায়েন্ট যাতে আপনি টাইপ করেন; এটি নিজে ওই কাজের কিছুই করে না। বরং এটি আপনার কমান্ডকে একটি রিকোয়েস্ট হিসেবে প্যাকেজ করে একটি API দিয়ে daemon-এ পাঠায়, তারপর daemon যা উত্তর দেয় তা ছাপে। daemon ও তার সহায়ক অংশগুলো একসঙ্গেই মানুষ যাকে "Docker engine" বলে।') },
        { p: l('The problem this client/server split solves is flexibility about where things run. Because the CLI only talks to the daemon over an API, the daemon does not have to be on the same machine — your local docker command could control a Docker engine on a remote server just as easily as the one on your laptop. It also cleanly separates the safe, unprivileged act of typing a command from the powerful, privileged act of actually creating containers, which the daemon performs with deep access to the host.', 'এই ক্লায়েন্ট/সার্ভার বিভাজন যে সমস্যা সমাধান করে তা হলো জিনিস কোথায় চলবে সে বিষয়ে নমনীয়তা। CLI শুধু একটি API দিয়ে daemon-এর সঙ্গে কথা বলে বলে daemon-কে একই মেশিনে থাকতে হয় না—আপনার লোকাল docker কমান্ড একটি রিমোট সার্ভারের Docker engine-কে ঠিক ততটাই সহজে নিয়ন্ত্রণ করতে পারত যতটা ল্যাপটপেরটিকে। এটি একটি কমান্ড টাইপ করার নিরাপদ, অ-বিশেষাধিকারযুক্ত কাজকে container তৈরির শক্তিশালী, বিশেষাধিকারযুক্ত কাজ থেকে পরিষ্কারভাবে আলাদা করে, যা daemon হোস্টে গভীর অ্যাক্সেস নিয়ে করে।') },
        { note: l('Think of a restaurant kitchen. You (the docker CLI) write down an order and hand it to the chef. The chef (the daemon) is the one who actually cooks, plates, and serves the food. You never touch the stove yourself — you just send clear orders and receive the result.', 'একটি রেস্তোরাঁর রান্নাঘর ভাবুন। আপনি (docker CLI) একটি অর্ডার লিখে শেফকে দেন। শেফ (daemon) হলেন যিনি আসলে রাঁধেন, প্লেটে সাজান ও পরিবেশন করেন। আপনি নিজে কখনো চুলা ছোঁন না—শুধু স্পষ্ট অর্ডার পাঠান ও ফলাফল পান।'), kind: 'tip' },
      ],
    },
    {
      h: l('How a command flows to the daemon', 'একটি কমান্ড কীভাবে daemon-এ যায়'),
      blocks: [
        { steps: [
          l('You type a command such as docker run nginx into the CLI and press enter.', 'আপনি CLI-তে docker run nginx-এর মতো একটি কমান্ড টাইপ করে এন্টার চাপেন।'),
          l('The CLI turns it into an API request and sends it to the daemon (locally over a socket, or over the network to a remote engine).', 'CLI একে একটি API রিকোয়েস্টে পরিণত করে daemon-এ পাঠায় (লোকালি একটি socket দিয়ে, বা নেটওয়ার্কে একটি রিমোট engine-এ)।'),
          l('The daemon does the work: it checks for the image, pulls it from a registry if missing, then creates and starts the container.', 'daemon কাজটি করে: এটি image আছে কি না দেখে, না থাকলে একটি registry থেকে pull করে, তারপর container তৈরি ও চালু করে।'),
          l('The daemon streams status and output back to the CLI, which prints it in your terminal.', 'daemon স্ট্যাটাস ও আউটপুট CLI-তে ফেরত স্ট্রিম করে, যা আপনার টার্মিনালে ছাপে।'),
          l('If the daemon is not running, the CLI has no one to talk to and you get "Cannot connect to the Docker daemon" — the tell-tale sign the engine is stopped.', 'daemon না চললে CLI-এর কথা বলার কেউ থাকে না ও আপনি পান "Cannot connect to the Docker daemon"—engine বন্ধ থাকার স্পষ্ট চিহ্ন।'),
        ] },
        { code: `# Ask the versions of both halves: Client (CLI) and Server (daemon)
docker version

# Ask the daemon to describe the whole system it manages
docker info

# If you ever see this, the daemon is not running:
# "Cannot connect to the Docker daemon at unix:///var/run/docker.sock"`, caption: l('docker version prints two sections — Client and Server — which is the clearest proof that the CLI and the daemon are separate programs.', 'docker version দুটি অংশ ছাপে—Client ও Server—যা CLI ও daemon আলাদা প্রোগ্রাম হওয়ার সবচেয়ে স্পষ্ট প্রমাণ।') },
      ],
    },
    {
      h: l('The pieces of the Docker engine', 'ডকার ইঞ্জিনের অংশগুলো'),
      blocks: [
        { p: l('"The engine" is not one program but a small stack that works together. Knowing the names helps you read error messages and understand what is running in the background.', '"engine" একটিমাত্র প্রোগ্রাম নয় বরং একসঙ্গে কাজ করা একটি ছোট স্তূপ। নাম জানলে error মেসেজ পড়তে ও ব্যাকগ্রাউন্ডে কী চলছে বুঝতে সাহায্য হয়।') },
        { table: {
          head: [l('Piece', 'অংশ'), l('Its job', 'কাজ')],
          rows: [
            [l('docker CLI', 'docker CLI'), l('The client you type into; sends your commands to the daemon.', 'যাতে আপনি টাইপ করেন সেই ক্লায়েন্ট; আপনার কমান্ড daemon-এ পাঠায়।')],
            [l('Docker daemon (dockerd)', 'Docker daemon (dockerd)'), l('The background engine that builds images and runs containers.', 'ব্যাকগ্রাউন্ড ইঞ্জিন যা image বিল্ড ও container চালায়।')],
            [l('REST API', 'REST API'), l('The interface the CLI uses to talk to the daemon.', 'CLI যে ইন্টারফেস দিয়ে daemon-এর সঙ্গে কথা বলে।')],
            [l('containerd / runc', 'containerd / runc'), l('Lower-level tools the daemon uses to actually start container processes.', 'নিচু-স্তরের টুল যা daemon container প্রসেস আসলে চালু করতে ব্যবহার করে।')],
            [l('Registry', 'Registry'), l('The remote store (e.g. Docker Hub) the daemon pulls images from and pushes to.', 'রিমোট স্টোর (যেমন Docker Hub) যেখান থেকে daemon image pull করে ও push করে।')],
          ],
        } },
      ],
    },
    {
      h: l('When and where this matters', 'কখন ও কোথায় এটি গুরুত্বপূর্ণ'),
      blocks: [
        { p: l('This model matters the first time something "does not work." If docker commands hang or refuse with a connection error, the fix is almost always to start the Docker daemon (or Docker Desktop) — the CLI is fine, but it has nothing to talk to. Knowing the daemon must be running before any build, pull, or run turns a baffling error into a one-step fix. The split also explains how CI systems and remote hosts work: your commands can drive a daemon on another machine entirely.', 'এই মডেল প্রথমবার কিছু "কাজ না করলে" গুরুত্বপূর্ণ। docker কমান্ড আটকে গেলে বা একটি connection error দিলে সমাধান প্রায় সবসময় Docker daemon (বা Docker Desktop) চালু করা—CLI ঠিক আছে, তবে তার কথা বলার কেউ নেই। যেকোনো build, pull বা run-এর আগে daemon চলতে হবে জানলে একটি বিভ্রান্তিকর error এক-ধাপের সমাধানে পরিণত হয়। এই বিভাজন CI সিস্টেম ও রিমোট হোস্ট কীভাবে কাজ করে তাও ব্যাখ্যা করে: আপনার কমান্ড সম্পূর্ণ অন্য মেশিনের একটি daemon চালাতে পারে।') },
        { p: l('It matters even more for security, and this is where beginners get burned. The daemon runs with root-level privileges on the host, and anyone who can send it commands effectively controls the host. On Linux, adding a user to the docker group so they can skip typing sudo silently grants that user root-equivalent power — a container can mount the host filesystem and take over the machine. Treat access to the Docker daemon as seriously as handing out the root password.', 'এটি নিরাপত্তার জন্য আরও বেশি গুরুত্বপূর্ণ, আর এখানেই নতুনরা পুড়ে যায়। daemon হোস্টে root-স্তরের বিশেষাধিকার নিয়ে চলে, ও যে কেউ এতে কমান্ড পাঠাতে পারে সে কার্যত হোস্ট নিয়ন্ত্রণ করে। Linux-এ sudo টাইপ এড়াতে একজন ব্যবহারকারীকে docker গ্রুপে যোগ করলে নীরবে সেই ব্যবহারকারীকে root-সমতুল্য ক্ষমতা দেওয়া হয়—একটি container হোস্ট ফাইলসিস্টেম মাউন্ট করে মেশিন দখল করতে পারে। Docker daemon-এ অ্যাক্সেসকে root পাসওয়ার্ড বিলানোর মতোই গুরুত্ব দিন।') },
      ],
    },
    {
      h: l('Common mistakes', 'সাধারণ ভুল'),
      blocks: [
        { list: [
          l('Running docker commands with the daemon stopped and being confused by "Cannot connect to the Docker daemon." Start the engine first.', 'daemon বন্ধ রেখে docker কমান্ড চালানো ও "Cannot connect to the Docker daemon" দেখে বিভ্রান্ত হওয়া। আগে engine চালু করুন।'),
          l('Adding a user to the docker group without realizing it grants effectively root-level access to the whole host.', 'না বুঝে একজন ব্যবহারকারীকে docker গ্রুপে যোগ করা যে এটি পুরো হোস্টে কার্যত root-স্তরের অ্যাক্সেস দেয়।'),
          l('Assuming the docker CLI does the work itself. It only sends requests; the daemon is what builds and runs everything.', 'ধরে নেওয়া docker CLI নিজেই কাজ করে। এটি শুধু রিকোয়েস্ট পাঠায়; daemon-ই সব বিল্ড ও রান করে।'),
          l('Exposing the daemon’s API over the network without TLS or authentication, handing anyone who finds it full control of the host.', 'TLS বা authentication ছাড়া daemon-এর API নেটওয়ার্কে খোলা রাখা, যে কেউ এটি খুঁজে পেলে তাকে হোস্টের পূর্ণ নিয়ন্ত্রণ দেওয়া।'),
        ] },
      ],
    },
    {
      h: l('Remember in one line', 'এক লাইনে মনে রাখুন'),
      blocks: [
        { list: [
          l('The Docker daemon builds and runs containers; the docker CLI just sends it commands over an API.', 'Docker daemon container বিল্ড ও রান করে; docker CLI শুধু একটি API দিয়ে তাকে কমান্ড পাঠায়।'),
          l('A daemon must be running before you can build, pull, or start anything — that is what a connection error means.', 'কিছু build, pull বা চালু করার আগে একটি daemon চলতে হবে—একটি connection error সেটাই বোঝায়।'),
          l('The daemon runs as root, so docker-group access is host root access — guard it carefully.', 'daemon root হিসেবে চলে, তাই docker-গ্রুপ অ্যাক্সেস হোস্ট root অ্যাক্সেস—সাবধানে পাহারা দিন।'),
        ] },
      ],
    },
  ],

  // ── dk-pull-run · Pulling & running images ────────────────────────────────
  'dk-pull-run': [
    {
      h: l('What are pull and run?', 'pull ও run কী?'),
      blocks: [
        { p: l('These two commands are how you get software running with Docker. docker pull downloads an image from a registry (by default Docker Hub) onto your machine, storing it locally as a set of layers. docker run takes an image and creates a container from it, then starts that container — actually launching the software. They are the download step and the launch step, and most of your day-to-day Docker use is built on top of these two verbs.', 'এই দুটি কমান্ড দিয়েই আপনি ডকারে সফটওয়্যার চালু করেন। docker pull একটি registry (ডিফল্টে Docker Hub) থেকে একটি image আপনার মেশিনে ডাউনলোড করে, লেয়ারের একটি সেট হিসেবে লোকালি রাখে। docker run একটি image নিয়ে তা থেকে একটি container তৈরি করে, তারপর সেই container চালু করে—আসলে সফটওয়্যারটি চালায়। এরা হলো ডাউনলোড ধাপ ও চালু ধাপ, আর আপনার দৈনন্দিন ডকার ব্যবহারের বেশিরভাগ এই দুটি ক্রিয়ার ওপর গড়া।') },
        { p: l('The problem they solve is turning "I want to run this software" into a single, repeatable step. Traditionally, running a tool meant hunting for an installer, satisfying its dependencies, and configuring it. With Docker you just name an image and run it. And you rarely need to pull by hand: docker run will automatically pull an image the first time it is missing, so the two commands blur into one for everyday use. You reach for docker pull explicitly mainly when you want to fetch or refresh an image ahead of time.', 'তারা যে সমস্যা সমাধান করে তা হলো "আমি এই সফটওয়্যার চালাতে চাই"-কে একটি একক, পুনরাবৃত্তিযোগ্য ধাপে পরিণত করা। ঐতিহ্যগতভাবে একটি টুল চালানো মানে ছিল একটি ইনস্টলার খোঁজা, তার ডিপেন্ডেন্সি মেটানো ও কনফিগার করা। ডকারে আপনি শুধু একটি image-এর নাম দিয়ে তা চালান। আর আপনাকে খুব কমই হাতে pull করতে হয়: docker run প্রথমবার image না থাকলে স্বয়ংক্রিয়ভাবে তা pull করবে, তাই দৈনন্দিন ব্যবহারে দুটি কমান্ড একটিতে মিশে যায়। আপনি স্পষ্টভাবে docker pull নেন মূলত যখন আগেভাগে একটি image আনতে বা রিফ্রেশ করতে চান।') },
        { note: l('Think of cooking a meal. docker pull is buying the ingredients and stocking your kitchen. docker run is actually cooking and serving a dish from them. You can buy ahead of time, but if you start cooking without an ingredient, Docker quietly runs to the store (pulls) for you first.', 'একটি খাবার রাঁধা ভাবুন। docker pull হলো উপকরণ কেনা ও রান্নাঘর ভরা। docker run হলো তা থেকে আসলে একটি ডিশ রাঁধা ও পরিবেশন। আপনি আগেভাগে কিনতে পারেন, তবে একটি উপকরণ ছাড়া রাঁধা শুরু করলে ডকার নীরবে আগে আপনার জন্য দোকানে ছোটে (pull করে)।'), kind: 'tip' },
      ],
    },
    {
      h: l('How pull and run work together', 'pull ও run কীভাবে একসঙ্গে কাজ করে'),
      blocks: [
        { steps: [
          l('You run docker run with an image name. Docker checks whether that image is already on your machine.', 'আপনি একটি image নাম দিয়ে docker run চালান। ডকার দেখে সেই image আগে থেকে আপনার মেশিনে আছে কি না।'),
          l('If the image is missing, Docker automatically pulls it from the registry — exactly as if you had run docker pull first.', 'image না থাকলে ডকার স্বয়ংক্রিয়ভাবে registry থেকে তা pull করে—ঠিক যেন আপনি আগে docker pull চালিয়েছিলেন।'),
          l('Docker creates a container from the image and starts it, running the image’s default command (for nginx, the web server).', 'ডকার image থেকে একটি container তৈরি করে চালু করে, image-এর ডিফল্ট কমান্ড চালিয়ে (nginx-এর জন্য, ওয়েব সার্ভার)।'),
          l('Add -d to detach and run it in the background; without it, the container holds your terminal and its logs stream there.', 'ব্যাকগ্রাউন্ডে ডিটাচ করে চালাতে -d যোগ করুন; ছাড়া, container আপনার টার্মিনাল ধরে রাখে ও এর লগ সেখানে স্ট্রিম হয়।'),
          l('Each docker run makes a new container. Run the same image five times and you have five containers, which is why cleanup matters.', 'প্রতিটি docker run একটি নতুন container বানায়। একই image পাঁচবার চালান, পাঁচটি container হয়, এ কারণেই পরিষ্কার করা গুরুত্বপূর্ণ।'),
        ] },
        { code: `# pull is automatic on first run — no need to run it separately
docker run -d -p 8080:80 --name web nginx

# check it is running, then open http://localhost:8080
docker ps`, caption: l('-d runs the container in the background; -p maps host port 8080 to the container’s port 80; --name gives it a friendly name instead of a random one.', '-d container-কে ব্যাকগ্রাউন্ডে চালায়; -p হোস্ট পোর্ট 8080-কে container-এর পোর্ট 80-এ ম্যাপ করে; --name একটি এলোমেলো নামের বদলে একটি সহজ নাম দেয়।') },
      ],
    },
    {
      h: l('Key commands', 'মূল কমান্ড'),
      blocks: [
        { table: {
          head: [l('Goal', 'লক্ষ্য'), l('Command', 'কমান্ড')],
          rows: [
            [l('Download an image', 'ইমেজ নামান'), l('docker pull nginx', 'docker pull nginx')],
            [l('Run a container', 'কন্টেইনার চালান'), l('docker run nginx', 'docker run nginx')],
            [l('Run in the background', 'ব্যাকগ্রাউন্ডে চালান'), l('docker run -d nginx', 'docker run -d nginx')],
            [l('List running containers', 'চলমান কন্টেইনার দেখুন'), l('docker ps', 'docker ps')],
          ],
        } },
        { note: l('docker pull nginx with no tag really means nginx:latest. To get a specific, reproducible version, pull or run a pinned tag such as nginx:1.25 instead of relying on latest.', 'ট্যাগ ছাড়া docker pull nginx আসলে nginx:latest বোঝায়। একটি নির্দিষ্ট, পুনরুৎপাদনযোগ্য ভার্সন পেতে latest-এ ভরসা না করে nginx:1.25-এর মতো একটি পিন করা ট্যাগ pull বা run করুন।'), kind: 'tip' },
      ],
    },
    {
      h: l('When and where to use them', 'কখন ও কোথায় ব্যবহার করবেন'),
      blocks: [
        { p: l('Use docker run whenever you want to launch software: spinning up a database for local development, trying a tool without installing it, or starting your own app in production. For long-running services like a web server or database, always add -d so it runs in the background and does not tie up your terminal, plus --name so you can refer to it later, and -p to expose the ports you need. For a quick one-off task you want to disappear when it finishes, add --rm so Docker deletes the container automatically on exit.', 'সফটওয়্যার চালু করতে চাইলেই docker run নিন: লোকাল ডেভেলপমেন্টের জন্য একটি ডেটাবেস চালু করা, ইনস্টল না করে একটি টুল দেখা, বা প্রোডাকশনে নিজের অ্যাপ শুরু করা। একটি ওয়েব সার্ভার বা ডেটাবেসের মতো দীর্ঘ-চলমান সার্ভিসে সবসময় -d যোগ করুন যাতে এটি ব্যাকগ্রাউন্ডে চলে ও টার্মিনাল আটকে না রাখে, সঙ্গে --name যাতে পরে রেফার করতে পারেন, ও -p দরকারি পোর্ট খুলতে। যে দ্রুত এককালীন কাজ শেষ হলে মিলিয়ে যেতে চান তাতে --rm যোগ করুন যাতে ডকার বেরোনোর সময় container স্বয়ংক্রিয়ভাবে মোছে।') },
        { p: l('Reach for docker pull explicitly when you want the image ready before you need it: pre-downloading images onto a server before a deploy so startup is instant, refreshing an image to the newest build with a repeat pull, or fetching images while you still have a good connection. On the flip side, remember that every plain docker run leaves a container behind even after it stops. On a busy machine these stopped containers and their images quietly accumulate and eat disk, so make docker ps -a, docker rm, and periodic cleanup part of your routine.', 'image দরকার হওয়ার আগে প্রস্তুত রাখতে চাইলে স্পষ্টভাবে docker pull নিন: একটি ডিপ্লয়ের আগে সার্ভারে image আগেভাগে ডাউনলোড করা যাতে চালু তাৎক্ষণিক হয়, একটি রিপিট pull দিয়ে image-কে নতুন বিল্ডে রিফ্রেশ করা, বা ভালো কানেকশন থাকতে image আনা। উল্টো দিকে, মনে রাখুন প্রতিটি সাধারণ docker run থামার পরও একটি container রেখে যায়। একটি ব্যস্ত মেশিনে এই থামানো container ও তাদের image নীরবে জমে ডিস্ক খায়, তাই docker ps -a, docker rm ও নিয়মিত পরিষ্কার আপনার রুটিনের অংশ করুন।') },
      ],
    },
    {
      h: l('Common mistakes', 'সাধারণ ভুল'),
      blocks: [
        { list: [
          l('Forgetting -d and blocking your terminal — the container runs in the foreground and you cannot type until you stop it.', '-d ভুলে টার্মিনাল আটকানো—container ফোরগ্রাউন্ডে চলে ও থামানো পর্যন্ত আপনি টাইপ করতে পারেন না।'),
          l('Running many containers without ever cleaning up, so stopped containers and unused images pile up and fill the disk. Use docker ps -a to find them and docker rm to remove them.', 'পরিষ্কার না করে অনেক container চালানো, ফলে থামানো container ও অব্যবহৃত image জমে ডিস্ক ভরে। এদের খুঁজতে docker ps -a ও মুছতে docker rm ব্যবহার করুন।'),
          l('Reversing the port mapping. -p reads as host:container, so -p 8080:80 exposes the container’s 80 on the host’s 8080; flipping it publishes the wrong port.', 'পোর্ট ম্যাপিং উল্টানো। -p host:container হিসেবে পড়ে, তাই -p 8080:80 container-এর 80-কে হোস্টের 8080-এ খোলে; উল্টালে ভুল পোর্ট পাবলিশ হয়।'),
          l('Expecting docker run to reuse a stopped container. It always creates a new one; use docker start <name> to restart an existing container.', 'ধরে নেওয়া docker run একটি থামানো container পুনঃব্যবহার করে। এটি সবসময় নতুন একটি বানায়; একটি বিদ্যমান container পুনরায় চালু করতে docker start <name> ব্যবহার করুন।'),
        ] },
      ],
    },
    {
      h: l('Remember in one line', 'এক লাইনে মনে রাখুন'),
      blocks: [
        { list: [
          l('docker pull downloads an image from a registry; docker run creates and starts a container from it.', 'docker pull একটি registry থেকে image নামায়; docker run তা থেকে একটি container তৈরি ও চালু করে।'),
          l('docker run pulls automatically if the image is missing, so you rarely pull by hand; add -d to run in the background.', 'image না থাকলে docker run স্বয়ংক্রিয় pull করে, তাই কমই হাতে pull করেন; ব্যাকগ্রাউন্ডে চালাতে -d যোগ করুন।'),
          l('Every run makes a new container — clean up stopped ones with docker rm so they do not fill the disk.', 'প্রতিটি run একটি নতুন container বানায়—docker rm দিয়ে থামানোগুলো পরিষ্কার করুন যাতে ডিস্ক না ভরে।'),
        ] },
      ],
    },
  ],

  // ── dk-layers · Image layers & the union filesystem ───────────────────────
  'dk-layers': [
    {
      h: l('What are image layers?', 'ইমেজ লেয়ার কী?'),
      blocks: [
        { p: l('A Docker image is not one solid block — it is a stack of read-only layers, one piled on top of the next. Each layer records the filesystem changes made by a single build instruction: adding files, installing a package, setting a config. Most instructions in a Dockerfile create exactly one new layer, so an image ends up as an ordered stack that reads like a history of how it was built, from a base operating system at the bottom up to your application at the top.', 'একটি Docker image একটি নিরেট ব্লক নয়—এটি রিড-অনলি লেয়ারের একটি স্তূপ, একটি আরেকটির ওপরে। প্রতিটি লেয়ার একটি একক বিল্ড নির্দেশের করা ফাইলসিস্টেম পরিবর্তন রেকর্ড করে: ফাইল যোগ, একটি প্যাকেজ ইনস্টল, একটি কনফিগ সেট। একটি Dockerfile-এর বেশিরভাগ নির্দেশ ঠিক একটি নতুন লেয়ার বানায়, তাই একটি image একটি ক্রমিক স্তূপে পরিণত হয় যা এটি কীভাবে বিল্ড হয়েছিল তার ইতিহাসের মতো পড়া যায়, নিচে একটি বেস OS থেকে ওপরে আপনার অ্যাপ্লিকেশন পর্যন্ত।') },
        { p: l('This layered design solves two problems at once: storage and speed. Because layers are read-only and content-addressed, Docker stores each unique layer only once and shares it across every image and container that uses it — pull ten images built on the same Ubuntu base and that base is stored a single time. And because Docker caches layers, rebuilding an image reuses every layer whose instruction and inputs have not changed, so a rebuild can finish in seconds instead of minutes. The whole system is designed so identical work is never done or stored twice.', 'এই লেয়ারযুক্ত নকশা একসঙ্গে দুটি সমস্যা সমাধান করে: স্টোরেজ ও গতি। লেয়ার রিড-অনলি ও কন্টেন্ট-অ্যাড্রেসড বলে ডকার প্রতিটি অনন্য লেয়ার শুধু একবার রাখে ও তা ব্যবহারকারী প্রতিটি image ও container-এ শেয়ার করে—একই Ubuntu বেসে বানানো দশটি image pull করুন, সেই বেস একবারই রাখা হয়। আর ডকার লেয়ার ক্যাশ করে বলে একটি image রিবিল্ড করলে যে লেয়ারের নির্দেশ ও ইনপুট বদলায়নি তার প্রতিটি পুনঃব্যবহৃত হয়, তাই একটি রিবিল্ড মিনিটের বদলে সেকেন্ডে শেষ হতে পারে। পুরো সিস্টেমটি এমনভাবে ডিজাইন করা যাতে অভিন্ন কাজ কখনো দুবার করা বা রাখা না হয়।') },
        { note: l('Picture a stack of transparent sheets, each drawn on, laid over one another so you see one combined picture from above. Shared base sheets (an OS, a language runtime) are reused under many different images, and you only add the few sheets on top that make your image unique.', 'একটি স্তূপ স্বচ্ছ শিট কল্পনা করুন, প্রতিটিতে আঁকা, একটির ওপর আরেকটি রাখা, যাতে ওপর থেকে একটি সম্মিলিত ছবি দেখেন। শেয়ার্ড বেস শিট (একটি OS, একটি ভাষার রানটাইম) অনেক ভিন্ন image-এর নিচে পুনঃব্যবহৃত হয়, ও আপনি শুধু ওপরে কয়েকটি শিট যোগ করেন যা আপনার image-কে অনন্য করে।'), kind: 'tip' },
      ],
    },
    {
      h: l('How layers are built and cached', 'লেয়ার কীভাবে বিল্ড ও ক্যাশ হয়'),
      blocks: [
        { steps: [
          l('Docker reads your Dockerfile top to bottom. Each instruction runs in order and its filesystem result becomes a new read-only layer stacked on the previous one.', 'ডকার আপনার Dockerfile ওপর থেকে নিচে পড়ে। প্রতিটি নির্দেশ ক্রমে চলে ও তার ফাইলসিস্টেম ফলাফল আগেরটির ওপর স্তূপীকৃত একটি নতুন রিড-অনলি লেয়ার হয়।'),
          l('For each instruction, Docker checks its cache: if that instruction and its inputs are unchanged since last time, it reuses the cached layer instead of rebuilding it.', 'প্রতিটি নির্দেশে ডকার তার ক্যাশ দেখে: যদি সেই নির্দেশ ও তার ইনপুট গতবার থেকে অপরিবর্তিত থাকে, এটি রিবিল্ড না করে ক্যাশড লেয়ার পুনঃব্যবহার করে।'),
          l('The moment one instruction’s inputs change, its cached layer is invalid — and so is every layer after it, because they were built on top of what just changed.', 'যে মুহূর্তে একটি নির্দেশের ইনপুট বদলায়, তার ক্যাশড লেয়ার অকার্যকর—ও তার পরের প্রতিটি লেয়ারও, কারণ সেগুলো এইমাত্র বদলানো জিনিসের ওপর বিল্ড হয়েছিল।'),
          l('That cascade is why ordering matters: put steps that rarely change (installing dependencies) early, and steps that change constantly (copying your source code) late.', 'এই ক্যাসকেডই কেন ক্রম গুরুত্বপূর্ণ: কম-বদলানো ধাপ (ডিপেন্ডেন্সি ইনস্টল) আগে রাখুন, ও ঘন-বদলানো ধাপ (সোর্স কোড কপি) পরে।'),
          l('At the end, the stack of layers is the image. When you run it, Docker adds one thin writable layer on top for the container to use.', 'শেষে, লেয়ারের স্তূপই image। আপনি এটি চালালে ডকার container-এর ব্যবহারের জন্য ওপরে একটি পাতলা লেখনযোগ্য লেয়ার যোগ করে।'),
        ] },
        { code: `# Cache-friendly order: dependencies first, source last
FROM node:20-slim
WORKDIR /app

# 1. copy only the dependency manifests, then install
COPY package*.json ./
RUN npm ci

# 2. copy the rest of the source LAST
COPY . .
CMD ["node", "server.js"]`, caption: l('Because the source is copied after npm ci, editing your code invalidates only the final COPY layer — the cached dependency layer is reused, so rebuilds stay fast.', 'সোর্স npm ci-এর পরে কপি হওয়ায় কোড এডিট শুধু শেষ COPY লেয়ার অকার্যকর করে—ক্যাশড ডিপেন্ডেন্সি লেয়ার পুনঃব্যবহৃত হয়, তাই রিবিল্ড দ্রুত থাকে।') },
      ],
    },
    {
      h: l('Commands for working with layers', 'লেয়ার নিয়ে কাজের কমান্ড'),
      blocks: [
        { table: {
          head: [l('Goal', 'লক্ষ্য'), l('Command', 'কমান্ড')],
          rows: [
            [l('Build an image from a Dockerfile', 'Dockerfile থেকে image বিল্ড'), l('docker build -t app .', 'docker build -t app .')],
            [l('Show an image’s layers and sizes', 'image-এর লেয়ার ও সাইজ দেখুন'), l('docker history app', 'docker history app')],
            [l('List local images and their sizes', 'লোকাল image ও সাইজ তালিকা'), l('docker images', 'docker images')],
            [l('Inspect an image in detail', 'image বিস্তারিত পরিদর্শন'), l('docker inspect app', 'docker inspect app')],
          ],
        } },
        { note: l('docker history <image> is the quickest way to see the layers your Dockerfile produced and how big each one is. A surprisingly large layer usually points to something you copied or installed that you did not need.', 'docker history <image> আপনার Dockerfile-এর তৈরি লেয়ার ও প্রতিটি কত বড় তা দেখার দ্রুততম উপায়। একটি অবাক করা বড় লেয়ার সাধারণত এমন কিছু বোঝায় যা আপনি কপি বা ইনস্টল করেছেন কিন্তু দরকার ছিল না।'), kind: 'tip' },
      ],
    },
    {
      h: l('The union filesystem: many layers, one view', 'ইউনিয়ন ফাইলসিস্টেম: অনেক লেয়ার, এক দৃশ্য'),
      blocks: [
        { p: l('A container does not see a pile of separate layers — it sees one normal filesystem. Docker achieves this with a union filesystem, which merges all the read-only image layers plus the container’s writable top layer into a single unified view. Layers higher in the stack win, so a file added in a later layer overrides the same path from an earlier one. This is how a stack built from many instructions presents itself to your app as an ordinary set of folders and files.', 'একটি container আলাদা লেয়ারের স্তূপ দেখে না—এটি একটি সাধারণ ফাইলসিস্টেম দেখে। ডকার এটি অর্জন করে একটি union filesystem দিয়ে, যা সব রিড-অনলি image লেয়ার ও container-এর লেখনযোগ্য ওপরের লেয়ারকে একটি একীভূত দৃশ্যে মেলায়। স্তূপে ওপরের লেয়ার জেতে, তাই একটি পরের লেয়ারে যোগ করা ফাইল একই পাথের আগের লেয়ারের ফাইলকে override করে। এভাবেই অনেক নির্দেশ থেকে বানানো একটি স্তূপ আপনার অ্যাপের কাছে সাধারণ ফোল্ডার ও ফাইলের সেট হিসেবে হাজির হয়।') },
        { p: l('When a running container modifies a file that lives in a read-only layer, the union filesystem uses copy-on-write: it copies that file up into the writable layer and changes the copy, leaving the underlying image layer untouched. That is exactly why the base image can be safely shared by many containers at once — none of them can alter the shared layers, only their own private top layer. It is also why those modifications vanish when the container is removed: they only ever existed in that disposable top layer.', 'একটি চলমান container যখন একটি রিড-অনলি লেয়ারে থাকা ফাইল পরিবর্তন করে, union filesystem copy-on-write ব্যবহার করে: এটি সেই ফাইলকে লেখনযোগ্য লেয়ারে কপি করে ও কপিটি বদলায়, নিচের image লেয়ার অক্ষত রেখে। এ কারণেই বেস image একসঙ্গে অনেক container নিরাপদে শেয়ার করতে পারে—কেউই শেয়ার্ড লেয়ার বদলাতে পারে না, শুধু নিজের ব্যক্তিগত ওপরের লেয়ার। এ কারণেই container রিমুভ করলে সেই পরিবর্তন মিলিয়ে যায়: সেগুলো শুধু সেই ফেলে-দেওয়া-যোগ্য ওপরের লেয়ারেই ছিল।') },
      ],
    },
    {
      h: l('When and where layer knowledge pays off', 'কখন ও কোথায় লেয়ার জ্ঞান কাজে লাগে'),
      blocks: [
        { p: l('You feel the difference every time you rebuild an image during development. With a well-ordered Dockerfile, changing a line of source code rebuilds only the final layers and finishes almost instantly, because the expensive dependency-install layer is served from cache. With a poorly ordered one — where you copy all your source before installing dependencies — the same tiny edit throws away the cache and reinstalls everything from scratch, turning a two-second rebuild into a two-minute one. Ordering instructions from least-changing to most-changing is the single highest-leverage habit in writing Dockerfiles.', 'ডেভেলপমেন্টের সময় প্রতিবার image রিবিল্ড করলে আপনি পার্থক্যটা অনুভব করেন। একটি সুসংগঠিত Dockerfile-এ এক লাইন সোর্স কোড বদলালে শুধু শেষ লেয়ারগুলো রিবিল্ড হয় ও প্রায় সঙ্গে সঙ্গে শেষ হয়, কারণ ব্যয়বহুল ডিপেন্ডেন্সি-ইনস্টল লেয়ার ক্যাশ থেকে আসে। একটি খারাপভাবে সাজানো Dockerfile-এ—যেখানে ডিপেন্ডেন্সি ইনস্টলের আগে সব সোর্স কপি করেন—একই ছোট এডিট ক্যাশ ফেলে দিয়ে সব নতুন করে ইনস্টল করে, একটি দুই-সেকেন্ডের রিবিল্ডকে দুই-মিনিটের বানায়। কম-বদলানো থেকে বেশি-বদলানো ক্রমে নির্দেশ সাজানো Dockerfile লেখার সবচেয়ে বেশি-লাভজনক অভ্যাস।') },
        { p: l('Layer sharing also pays off across your whole system, not just one build. When your images are built on a common base, pulling and storing them is cheaper because the shared base layers are downloaded and kept only once. This is why choosing a small, standard base image and reusing it across services is a real optimization: it shrinks total disk use, speeds up pulls on every host, and cuts how much data moves during a deploy. Understanding layers turns image size and build speed from mysteries into things you can deliberately control.', 'লেয়ার শেয়ারিং শুধু একটি বিল্ড নয়, আপনার পুরো সিস্টেমজুড়ে কাজে লাগে। আপনার image একটি সাধারণ বেসে বিল্ড হলে সেগুলো pull ও রাখা সস্তা কারণ শেয়ার্ড বেস লেয়ার একবারই ডাউনলোড ও রাখা হয়। এ কারণেই একটি ছোট, প্রমিত বেস image বাছা ও সার্ভিসজুড়ে পুনঃব্যবহার একটি আসল অপটিমাইজেশন: এটি মোট ডিস্ক ব্যবহার কমায়, প্রতিটি হোস্টে pull দ্রুত করে, ও একটি ডিপ্লয়ে কত ডেটা সরে তা কমায়। লেয়ার বোঝা image সাইজ ও বিল্ড গতিকে রহস্য থেকে ইচ্ছাকৃতভাবে নিয়ন্ত্রণযোগ্য জিনিসে পরিণত করে।') },
      ],
    },
    {
      h: l('Common mistakes', 'সাধারণ ভুল'),
      blocks: [
        { list: [
          l('Putting frequently-changing steps (like COPY . .) early in the Dockerfile, which busts the cache for every layer after them on each rebuild.', 'ঘন-বদলানো ধাপ (যেমন COPY . .) Dockerfile-এর শুরুতে রাখা, যা প্রতিটি রিবিল্ডে তার পরের প্রতিটি লেয়ারের ক্যাশ ভাঙে।'),
          l('Copying all your source before installing dependencies, so any code edit reinstalls every dependency from scratch.', 'ডিপেন্ডেন্সি ইনস্টলের আগে সব সোর্স কপি করা, ফলে যেকোনো কোড এডিট প্রতিটি ডিপেন্ডেন্সি নতুন করে ইনস্টল করে।'),
          l('Assuming deleting a file in a later layer shrinks the image. The file still exists in the earlier layer underneath, so the image stays large.', 'ধরে নেওয়া একটি পরের লেয়ারে একটি ফাইল মোছা image ছোট করে। ফাইলটি নিচের আগের লেয়ারে এখনো আছে, তাই image বড়ই থাকে।'),
          l('Storing data in the container’s writable layer and expecting it to persist — copy-on-write changes live only in the top layer and disappear on removal.', 'container-এর লেখনযোগ্য লেয়ারে ডেটা রেখে তা টিকে থাকবে আশা করা—copy-on-write পরিবর্তন শুধু ওপরের লেয়ারে থাকে ও রিমুভে মিলিয়ে যায়।'),
        ] },
      ],
    },
    {
      h: l('Remember in one line', 'এক লাইনে মনে রাখুন'),
      blocks: [
        { list: [
          l('An image is a stack of read-only layers; each Dockerfile instruction adds one, and layers are cached and shared.', 'image হলো রিড-অনলি লেয়ারের একটি স্তূপ; প্রতিটি Dockerfile নির্দেশ একটি যোগ করে, ও লেয়ার ক্যাশড ও শেয়ার্ড।'),
          l('Order Dockerfile steps from least-changing to most-changing so the cache is reused on every rebuild.', 'Dockerfile ধাপ কম-বদলানো থেকে বেশি-বদলানো ক্রমে সাজান যাতে প্রতিটি রিবিল্ডে ক্যাশ পুনঃব্যবহৃত হয়।'),
          l('A change low in the stack invalidates every layer above it — that cascade is the whole reason ordering matters.', 'স্তূপের নিচে একটি পরিবর্তন তার ওপরের প্রতিটি লেয়ার অকার্যকর করে—এই ক্যাসকেডই ক্রম গুরুত্বপূর্ণ হওয়ার পুরো কারণ।'),
        ] },
      ],
    },
  ],
}
