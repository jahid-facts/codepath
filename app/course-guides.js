// Deep, structured teaching guides (bilingual) keyed by topic id.
// Each guide is an array of sections; each section has a heading (h) and ordered
// content blocks: { p } paragraph, { list } bullets, { steps } numbered,
// { table } {head, rows}, or { note, kind } callout. Rendered by LessonGuide.
//
// This file is authored incrementally — a topic without a guide simply falls back
// to its short summary sections, so adding guides here is safe and additive.

const l = (en, bn) => ({ en, bn })

export const guides = {
  // ── CDN (System Design) ───────────────────────────────────────────────────
  cdn: [
    {
      h: l('What is a CDN?', 'CDN কী?'),
      blocks: [
        { p: l('A CDN (Content Delivery Network) is a globally distributed network of servers that keep cached copies of your content close to users. When someone requests an asset, it is served from a nearby "edge" server instead of travelling all the way to your single origin server.', 'CDN (Content Delivery Network) হলো বিশ্বজুড়ে ছড়ানো সার্ভারের একটি নেটওয়ার্ক যা আপনার কন্টেন্টের ক্যাশড কপি ব্যবহারকারীর কাছে রাখে। কেউ কোনো অ্যাসেট চাইলে তা আপনার একমাত্র origin সার্ভার পর্যন্ত না গিয়ে কাছের একটি "edge" সার্ভার থেকে পরিবেশিত হয়।') },
        { p: l('The core problem a CDN solves is distance. Data cannot travel faster than light, so a user in Dhaka fetching an image from a server in Virginia waits for a round trip halfway around the world — often 200ms or more per request. Multiply that by the dozens of images, scripts, and stylesheets on one page and the site feels slow, no matter how fast your server is.', 'CDN যে মূল সমস্যা সমাধান করে তা হলো দূরত্ব। ডেটা আলোর চেয়ে দ্রুত যেতে পারে না, তাই ঢাকার একজন ব্যবহারকারী ভার্জিনিয়ার সার্ভার থেকে একটি ছবি আনলে অর্ধেক পৃথিবী ঘুরে একটি round trip-এর জন্য অপেক্ষা করে—প্রায়ই প্রতি রিকোয়েস্টে ২০০ms বা তার বেশি। একটি পেজে থাকা কয়েক ডজন ছবি, স্ক্রিপ্ট ও স্টাইলশিট দিয়ে গুণ করুন—সার্ভার যতই দ্রুত হোক, সাইট ধীর মনে হবে।') },
        { note: l('Think of a global pizza chain. Instead of shipping every pizza from one central kitchen, Domino’s puts a branch in every neighbourhood so delivery takes 30 minutes, not 3 days. A CDN puts a "branch" (edge server) near every user.', 'একটি গ্লোবাল পিৎজা চেইন ভাবুন। প্রতিটি পিৎজা একটি কেন্দ্রীয় রান্নাঘর থেকে না পাঠিয়ে ডমিনো’স প্রতিটি এলাকায় একটি ব্রাঞ্চ রাখে, তাই ডেলিভারি ৩ দিন নয়, ৩০ মিনিটে হয়। CDN প্রতিটি ব্যবহারকারীর কাছে একটি "ব্রাঞ্চ" (edge সার্ভার) রাখে।'), kind: 'tip' },
      ],
    },
    {
      h: l('How a CDN works, step by step', 'CDN কীভাবে কাজ করে, ধাপে ধাপে'),
      blocks: [
        { steps: [
          l('A user requests an asset (say logo.png). DNS resolves the CDN hostname to the IP of the edge server geographically closest to that user.', 'একজন ব্যবহারকারী একটি অ্যাসেট (ধরুন logo.png) চায়। DNS CDN হোস্টনামকে সেই ব্যবহারকারীর ভৌগোলিকভাবে সবচেয়ে কাছের edge সার্ভারের IP-তে রিজলভ করে।'),
          l('The request reaches that nearby edge server — not your origin.', 'রিকোয়েস্টটি সেই কাছের edge সার্ভারে পৌঁছায়—আপনার origin-এ নয়।'),
          l('The edge checks its cache. If it has a fresh copy (a "cache hit"), it returns it immediately. This is the fast path.', 'edge তার cache যাচাই করে। একটি টাটকা কপি থাকলে ("cache hit") তা সঙ্গে সঙ্গে ফেরত দেয়। এটাই দ্রুত পথ।'),
          l('If it has no copy or the copy is stale (a "cache miss"), the edge fetches it from your origin once, returns it to the user, and stores a copy for the next visitor.', 'কোনো কপি না থাকলে বা কপি পুরনো হলে ("cache miss") edge একবার আপনার origin থেকে তা আনে, ব্যবহারকারীকে দেয় এবং পরের দর্শকের জন্য একটি কপি রেখে দেয়।'),
          l('Every following user in that region is served straight from the edge cache, so your origin is hit only rarely.', 'সেই অঞ্চলের পরবর্তী প্রতিটি ব্যবহারকারী সরাসরি edge cache থেকে পরিবেশিত হয়, তাই আপনার origin খুব কমই আঘাত পায়।'),
        ] },
        { p: l('This is why the very first request in a region can be a little slower (it "warms" the cache), while every request after it is fast.', 'এ কারণেই কোনো অঞ্চলে একদম প্রথম রিকোয়েস্ট একটু ধীর হতে পারে (এটি cache "গরম" করে), আর তার পরের প্রতিটি রিকোয়েস্ট দ্রুত।') },
      ],
    },
    {
      h: l('Push vs Pull CDNs', 'Push বনাম Pull CDN'),
      blocks: [
        { p: l('There are two ways content gets onto the edge servers. Most teams use a pull CDN and rarely think about it.', 'কন্টেন্ট edge সার্ভারে ওঠার দুটি উপায় আছে। বেশিরভাগ টিম pull CDN ব্যবহার করে ও এ নিয়ে কমই ভাবে।') },
        { table: {
          head: [l('Type', 'ধরন'), l('How it fills', 'কীভাবে ভরে'), l('Best for', 'কার জন্য')],
          rows: [
            [l('Pull CDN', 'Pull CDN'), l('Edge fetches from origin on the first miss, then caches it automatically.', 'প্রথম miss-এ edge origin থেকে আনে, তারপর স্বয়ংক্রিয়ভাবে cache করে।'), l('Most websites; content with a long tail of rarely-used files.', 'বেশিরভাগ ওয়েবসাইট; কম-ব্যবহৃত ফাইলের লম্বা লেজযুক্ত কন্টেন্ট।')],
            [l('Push CDN', 'Push CDN'), l('You upload (push) content to the CDN ahead of time.', 'আপনি আগেভাগে কন্টেন্ট CDN-এ আপলোড (push) করেন।'), l('Large files, video libraries, predictable heavy assets.', 'বড় ফাইল, ভিডিও লাইব্রেরি, পূর্বানুমেয় ভারী অ্যাসেট।')],
          ],
        } },
      ],
    },
    {
      h: l('What should you cache?', 'কী cache করবেন?'),
      blocks: [
        { list: [
          l('Static assets — images, video, CSS, JS, fonts, downloads. These are ideal: they are identical for every user and rarely change.', 'স্ট্যাটিক অ্যাসেট—ছবি, ভিডিও, CSS, JS, ফন্ট, ডাউনলোড। এগুলো আদর্শ: প্রতিটি ব্যবহারকারীর জন্য একই ও কদাচিৎ বদলায়।'),
          l('Semi-dynamic — API responses that are the same for everyone can be cached at the edge for a short TTL (time-to-live).', 'সেমি-ডাইনামিক—সবার জন্য একই এমন API রেসপন্স অল্প TTL (time-to-live)-এ edge-এ cache করা যায়।'),
          l('Never cache at the shared edge: user-specific or private pages, like a logged-in dashboard — or you risk serving one user’s data to another.', 'শেয়ার্ড edge-এ কখনো cache করবেন না: ব্যবহারকারী-নির্দিষ্ট বা প্রাইভেট পেজ, যেমন লগইন-করা ড্যাশবোর্ড—নইলে এক ব্যবহারকারীর ডেটা অন্যকে দেওয়ার ঝুঁকি।'),
        ] },
        { note: l('Caching a personalized page on a shared CDN can leak one user’s data to the next visitor. Mark private responses with Cache-Control: private or no-store.', 'শেয়ার্ড CDN-এ একটি পার্সোনালাইজড পেজ cache করলে এক ব্যবহারকারীর ডেটা পরের দর্শকের কাছে ফাঁস হতে পারে। প্রাইভেট রেসপন্সে Cache-Control: private বা no-store দিন।'), kind: 'warn' },
      ],
    },
    {
      h: l('Where and when to use a CDN', 'কোথায় ও কখন CDN ব্যবহার করবেন'),
      blocks: [
        { p: l('Use a CDN when you serve static assets, have users spread across regions or countries, deliver images or video, expect traffic spikes, or want to offload and protect your origin server from load and attacks.', 'CDN ব্যবহার করুন যখন আপনি স্ট্যাটিক অ্যাসেট পরিবেশন করেন, অঞ্চল/দেশজুড়ে ব্যবহারকারী আছে, ছবি বা ভিডিও দেন, ট্রাফিক স্পাইক আশা করেন, অথবা লোড ও আক্রমণ থেকে origin সার্ভারকে হালকা ও রক্ষা করতে চান।') },
        { p: l('A CDN helps less when your app is tiny, your users are all in one city, and nearly every page is dynamic and personalized — there are few shareable assets to cache. Even then, the static assets (logo, CSS, JS) still benefit.', 'CDN কম সাহায্য করে যখন অ্যাপ ছোট, সব ব্যবহারকারী এক শহরে, আর প্রায় প্রতিটি পেজ ডাইনামিক ও পার্সোনালাইজড—cache করার মতো শেয়ারযোগ্য অ্যাসেট কম। তবুও স্ট্যাটিক অ্যাসেট (লোগো, CSS, JS) উপকৃত হয়।') },
      ],
    },
    {
      h: l('Benefits and trade-offs', 'সুবিধা ও ট্রেড-অফ'),
      blocks: [
        { list: [
          l('Benefit — much lower latency: content is served from nearby, not across the world.', 'সুবিধা—অনেক কম latency: কন্টেন্ট পৃথিবীর ওপার থেকে নয়, কাছ থেকে পরিবেশিত হয়।'),
          l('Benefit — less origin load and lower bandwidth cost: the edge absorbs most requests.', 'সুবিধা—কম origin লোড ও কম bandwidth খরচ: বেশিরভাগ রিকোয়েস্ট edge শুষে নেয়।'),
          l('Benefit — higher availability and DDoS absorption: the global network soaks up spikes and attacks.', 'সুবিধা—বেশি availability ও DDoS শোষণ: গ্লোবাল নেটওয়ার্ক স্পাইক ও আক্রমণ শুষে নেয়।'),
          l('Trade-off — cache invalidation is genuinely hard: stale content can linger until caches expire.', 'ট্রেড-অফ—cache invalidation সত্যিই কঠিন: cache মেয়াদ শেষ না হওয়া পর্যন্ত পুরনো কন্টেন্ট থেকে যেতে পারে।'),
          l('Trade-off — another moving part, vendor, and cost, and harder debugging (which edge served what?).', 'ট্রেড-অফ—আরেকটি অংশ, ভেন্ডর ও খরচ, এবং ডিবাগিং কঠিন (কোন edge কী পরিবেশন করল?)।'),
        ] },
      ],
    },
    {
      h: l('Cache invalidation and best practices', 'Cache invalidation ও সেরা চর্চা'),
      blocks: [
        { list: [
          l('Version your asset URLs (for example app.9f2c.js). A new deploy produces a new filename, so the CDN treats it as brand-new content and you never serve a stale file.', 'অ্যাসেট URL-এ ভার্সন দিন (যেমন app.9f2c.js)। নতুন deploy নতুন ফাইলনাম তৈরি করে, তাই CDN একে নতুন কন্টেন্ট ধরে ও আপনি কখনো পুরনো ফাইল দেন না।'),
          l('Set explicit Cache-Control headers: long max-age for versioned assets, short for things that change often.', 'স্পষ্ট Cache-Control হেডার দিন: ভার্সনড অ্যাসেটে লম্বা max-age, ঘন-বদলানো জিনিসে ছোট।'),
          l('Prefer versioning over purging. Use the CDN’s purge/invalidation API only for emergencies — it is slow and global.', 'purge-এর চেয়ে versioning নিন। CDN-এর purge/invalidation API শুধু জরুরি অবস্থায় ব্যবহার করুন—এটি ধীর ও গ্লোবাল।'),
          l('Enable compression (gzip/brotli) and modern image formats at the edge to shrink transfers further.', 'ট্রান্সফার আরও ছোট করতে edge-এ compression (gzip/brotli) ও আধুনিক ইমেজ ফরম্যাট চালু করুন।'),
        ] },
      ],
    },
    {
      h: l('Common misconceptions', 'সাধারণ ভুল ধারণা'),
      blocks: [
        { list: [
          l('"A CDN speeds up everything." — It mainly speeds cacheable, static content. A slow database query or a personalized page stays slow.', '"CDN সবকিছু দ্রুত করে।"—এটি মূলত cache-যোগ্য, স্ট্যাটিক কন্টেন্ট দ্রুত করে। একটি ধীর ডেটাবেস কুয়েরি বা পার্সোনালাইজড পেজ ধীরই থাকে।'),
          l('"I don’t need versioned URLs." — Without them you fight stale caches after every deploy.', '"আমার ভার্সনড URL লাগে না।"—এগুলো ছাড়া প্রতিটি deploy-এর পর পুরনো cache-এর সঙ্গে লড়তে হয়।'),
          l('"A CDN is only for big companies." — Modern CDNs have cheap and free tiers and help any site with a global audience.', '"CDN শুধু বড় কোম্পানির জন্য।"—আধুনিক CDN-এ সস্তা ও ফ্রি টিয়ার আছে এবং গ্লোবাল দর্শকযুক্ত যেকোনো সাইটকে সাহায্য করে।'),
        ] },
      ],
    },
    {
      h: l('Remember in one line', 'এক লাইনে মনে রাখুন'),
      blocks: [
        { list: [
          l('A CDN keeps cached copies of your content near users and serves from the nearest edge.', 'CDN আপনার কন্টেন্টের ক্যাশড কপি ব্যবহারকারীর কাছে রাখে ও কাছের edge থেকে পরিবেশন করে।'),
          l('Cache hit = fast; cache miss = one fetch from origin, then cached.', 'cache hit = দ্রুত; cache miss = origin থেকে একবার আনা, তারপর cached।'),
          l('Cache static assets, never private per-user data; version your URLs to avoid stale content.', 'স্ট্যাটিক অ্যাসেট cache করুন, প্রতি-ব্যবহারকারী প্রাইভেট ডেটা কখনো নয়; পুরনো কন্টেন্ট এড়াতে URL-এ ভার্সন দিন।'),
        ] },
      ],
    },
  ],

  // ── OSI model (System Design / Networking) ────────────────────────────────
  'net-model': [
    {
      h: l('What is the OSI model?', 'OSI মডেল কী?'),
      blocks: [
        { p: l('The OSI (Open Systems Interconnection) model is a conceptual framework that splits everything a network does into 7 stacked layers, each with a single job. It gives engineers a shared vocabulary: instead of "the internet is magic," you can say exactly which layer a protocol, a device, or a problem lives at.', 'OSI (Open Systems Interconnection) মডেল হলো একটি ধারণাগত কাঠামো যা একটি নেটওয়ার্ক যা করে তার সবকিছুকে ৭টি স্তূপীকৃত স্তরে ভাগ করে, প্রতিটির একটি কাজ। এটি প্রকৌশলীদের একটি সাধারণ ভাষা দেয়: "ইন্টারনেট জাদু" না বলে আপনি ঠিক বলতে পারেন কোন প্রোটোকল, ডিভাইস বা সমস্যা কোন স্তরে থাকে।') },
        { note: l('Sending data across a network is like mailing a letter from Dhaka to New York. You write it (application), seal it in an addressed envelope (network), the post office sorts and routes it, and planes and trucks carry it (physical). At the other end it is opened in reverse. Each stage has exactly one responsibility.', 'নেটওয়ার্কে ডেটা পাঠানো ঢাকা থেকে নিউইয়র্কে একটি চিঠি পাঠানোর মতো। আপনি লেখেন (application), ঠিকানাসহ খামে সিল করেন (network), ডাকঘর বাছাই ও রুট করে, আর প্লেন-ট্রাক বহন করে (physical)। অন্য প্রান্তে উল্টো ক্রমে খোলা হয়। প্রতিটি ধাপের ঠিক একটি দায়িত্ব।'), kind: 'tip' },
      ],
    },
    {
      h: l('Why the OSI model matters', 'OSI মডেল কেন গুরুত্বপূর্ণ'),
      blocks: [
        { list: [
          l('It is a shared language: engineers worldwide describe network behaviour by layer number.', 'এটি একটি সাধারণ ভাষা: বিশ্বজুড়ে প্রকৌশলীরা নেটওয়ার্ক আচরণ স্তর নম্বর দিয়ে বর্ণনা করেন।'),
          l('It makes troubleshooting faster: is this a Layer 3 routing issue, or a Layer 7 application bug? The answer tells you where to look.', 'এটি সমস্যা সমাধান দ্রুত করে: এটি কি Layer 3 রাউটিং সমস্যা, নাকি Layer 7 অ্যাপ্লিকেশন বাগ? উত্তর বলে দেয় কোথায় দেখতে হবে।'),
          l('It tells you where devices operate: a switch is Layer 2, a router is Layer 3, a load balancer can be Layer 4 or Layer 7, and firewalls filter across Layers 3–7.', 'এটি বলে ডিভাইস কোথায় কাজ করে: switch Layer 2, router Layer 3, load balancer Layer 4 বা 7, আর firewall Layer 3–7 জুড়ে ফিল্টার করে।'),
        ] },
      ],
    },
    {
      h: l('The 7 layers in detail', '৭টি স্তর বিস্তারিত'),
      blocks: [
        { table: {
          head: [l('Layer', 'স্তর'), l('Its job', 'কাজ'), l('Examples', 'উদাহরণ')],
          rows: [
            [l('7 · Application', '৭ · Application'), l('What the user and apps interact with directly.', 'ব্যবহারকারী ও অ্যাপ সরাসরি যার সঙ্গে কাজ করে।'), l('HTTP, HTTPS, DNS, SMTP, FTP', 'HTTP, HTTPS, DNS, SMTP, FTP')],
            [l('6 · Presentation', '৬ · Presentation'), l('Formatting, encryption, compression.', 'ফরম্যাটিং, এনক্রিপশন, কম্প্রেশন।'), l('TLS/SSL, JPEG, UTF-8', 'TLS/SSL, JPEG, UTF-8')],
            [l('5 · Session', '৫ · Session'), l('Opens, maintains, and closes conversations.', 'কথোপকথন খোলে, রাখে ও বন্ধ করে।'), l('RPC, sockets', 'RPC, sockets')],
            [l('4 · Transport', '৪ · Transport'), l('End-to-end delivery between apps, using ports; reliability.', 'পোর্ট দিয়ে অ্যাপের মধ্যে এন্ড-টু-এন্ড ডেলিভারি; নির্ভরযোগ্যতা।'), l('TCP, UDP', 'TCP, UDP')],
            [l('3 · Network', '৩ · Network'), l('Addressing and routing between different networks.', 'ভিন্ন নেটওয়ার্কের মধ্যে ঠিকানা ও রাউটিং।'), l('IP, ICMP, routers', 'IP, ICMP, রাউটার')],
            [l('2 · Data Link', '২ · Data Link'), l('Delivery within one local network via MAC addresses.', 'MAC ঠিকানা দিয়ে এক লোকাল নেটওয়ার্কের ভেতরে ডেলিভারি।'), l('Ethernet, Wi-Fi, switches', 'Ethernet, Wi-Fi, switch')],
            [l('1 · Physical', '১ · Physical'), l('Raw bits as electrical, optical, or radio signals.', 'বৈদ্যুতিক, অপটিক্যাল বা রেডিও সংকেত হিসেবে কাঁচা বিট।'), l('Cables, fiber, radio', 'কেবল, ফাইবার, রেডিও')],
          ],
        } },
        { note: l('A classic way to remember Layer 7 down to 1: "All People Seem To Need Data Processing".', 'Layer 7 থেকে 1 মনে রাখার একটি ক্লাসিক উপায়: "All People Seem To Need Data Processing"।'), kind: 'tip' },
      ],
    },
    {
      h: l('How data flows: encapsulation & decapsulation', 'ডেটা কীভাবে যায়: encapsulation ও decapsulation'),
      blocks: [
        { p: l('When you open google.com, your request travels down all 7 layers on your machine, then back up all 7 layers on Google’s server.', 'আপনি google.com খুললে, আপনার রিকোয়েস্ট আপনার মেশিনে ৭টি স্তর নিচে নামে, তারপর গুগলের সার্ভারে আবার ৭টি স্তর ওপরে ওঠে।') },
        { steps: [
          l('Layer 7: your browser forms an HTTP request for the page.', 'Layer 7: আপনার ব্রাউজার পেজের জন্য একটি HTTP রিকোয়েস্ট তৈরি করে।'),
          l('Layers 6–5: it is encrypted with TLS and a session is managed.', 'Layer 6–5: এটি TLS দিয়ে এনক্রিপ্ট হয় ও একটি session সামলানো হয়।'),
          l('Layer 4: TCP splits it into segments and adds port numbers.', 'Layer 4: TCP একে segment-এ ভাগ করে ও পোর্ট নম্বর যোগ করে।'),
          l('Layer 3: IP wraps each segment in a packet with source and destination IP addresses.', 'Layer 3: IP প্রতিটি segment-কে সোর্স ও গন্তব্য IP ঠিকানাসহ একটি packet-এ মোড়ায়।'),
          l('Layer 2: each packet becomes a frame with MAC addresses for the next hop.', 'Layer 2: প্রতিটি packet পরবর্তী হপের MAC ঠিকানাসহ একটি frame হয়।'),
          l('Layer 1: the frame is transmitted as electrical, optical, or radio signals.', 'Layer 1: frame বৈদ্যুতিক, অপটিক্যাল বা রেডিও সংকেত হিসেবে পাঠানো হয়।'),
          l('At Google’s server the whole process runs in reverse, layer 1 back up to layer 7.', 'গুগলের সার্ভারে পুরো প্রক্রিয়া উল্টো চলে, layer 1 থেকে আবার layer 7।'),
        ] },
        { p: l('Adding a header at each layer on the way down is called encapsulation; stripping those headers on the way up is decapsulation.', 'নিচে নামার পথে প্রতিটি স্তরে একটি হেডার যোগ করাকে encapsulation বলে; ওপরে ওঠার পথে সেই হেডার খুলে ফেলাকে decapsulation বলে।') },
      ],
    },
    {
      h: l('OSI vs the TCP/IP model', 'OSI বনাম TCP/IP মডেল'),
      blocks: [
        { p: l('OSI is the teaching model with 7 layers. The real internet runs on the simpler 4-layer TCP/IP model, which groups several OSI layers together.', 'OSI হলো ৭ স্তরের শিক্ষণ মডেল। বাস্তব ইন্টারনেট সরল ৪-স্তরের TCP/IP মডেলে চলে, যা কয়েকটি OSI স্তরকে একত্র করে।') },
        { table: {
          head: [l('OSI (7 layers)', 'OSI (৭ স্তর)'), l('TCP/IP (4 layers)', 'TCP/IP (৪ স্তর)')],
          rows: [
            [l('Application + Presentation + Session', 'Application + Presentation + Session'), l('Application', 'Application')],
            [l('Transport', 'Transport'), l('Transport', 'Transport')],
            [l('Network', 'Network'), l('Internet', 'Internet')],
            [l('Data Link + Physical', 'Data Link + Physical'), l('Link (Network Access)', 'Link (Network Access)')],
          ],
        } },
      ],
    },
    {
      h: l('Real-world: which layer is this?', 'বাস্তব: এটি কোন স্তর?'),
      blocks: [
        { list: [
          l('A switch forwarding frames by MAC address → Layer 2.', 'MAC ঠিকানা দিয়ে frame পাঠানো switch → Layer 2।'),
          l('A router choosing a path by IP address → Layer 3.', 'IP ঠিকানা দিয়ে পথ বাছা router → Layer 3।'),
          l('A load balancer spreading TCP connections → Layer 4; routing by URL or hostname → Layer 7.', 'TCP সংযোগ ছড়ানো load balancer → Layer 4; URL বা হোস্টনামে রাউট → Layer 7।'),
          l('TLS encryption → Layer 6; the HTTP request itself → Layer 7.', 'TLS এনক্রিপশন → Layer 6; HTTP রিকোয়েস্ট নিজে → Layer 7।'),
        ] },
      ],
    },
    {
      h: l('Common misconceptions', 'সাধারণ ভুল ধারণা'),
      blocks: [
        { list: [
          l('"The internet uses OSI." — No; it runs on TCP/IP. OSI is a conceptual model for teaching and troubleshooting.', '"ইন্টারনেট OSI ব্যবহার করে।"—না; এটি TCP/IP-তে চলে। OSI শেখা ও সমস্যা সমাধানের একটি ধারণাগত মডেল।'),
          l('"The layers are independent." — Each layer depends on the one below it; higher layers use lower-layer services.', '"স্তরগুলো স্বাধীন।"—প্রতিটি স্তর তার নিচেরটির ওপর নির্ভর করে; উঁচু স্তর নিচু স্তরের সেবা ব্যবহার করে।'),
          l('"A switch is always Layer 2." — Basic switches are Layer 2, but Layer 3 switches exist that also route.', '"switch সবসময় Layer 2।"—সাধারণ switch Layer 2, তবে Layer 3 switch-ও আছে যা রাউটও করে।'),
        ] },
      ],
    },
    {
      h: l('Remember in one line', 'এক লাইনে মনে রাখুন'),
      blocks: [
        { list: [
          l('7 layers, one job each, from Application (7) down to Physical (1).', '৭টি স্তর, প্রতিটির একটি কাজ, Application (৭) থেকে Physical (১) পর্যন্ত।'),
          l('Data is encapsulated going down and decapsulated going up.', 'ডেটা নিচে নামার সময় encapsulate ও ওপরে ওঠার সময় decapsulate হয়।'),
          l('The internet actually runs on the 4-layer TCP/IP model; OSI tells you where to debug and which device operates where.', 'ইন্টারনেট আসলে ৪-স্তরের TCP/IP-তে চলে; OSI বলে কোথায় ডিবাগ করতে হবে ও কোন ডিভাইস কোথায় কাজ করে।'),
        ] },
      ],
    },
  ],

  // ── TCP vs UDP (System Design / Networking) ───────────────────────────────
  'net-transport': [
    {
      h: l('The transport layer’s job', 'ট্রান্সপোর্ট স্তরের কাজ'),
      blocks: [
        { p: l('The transport layer (Layer 4) delivers data between applications on two hosts, using port numbers to know which app the data belongs to. Its two protocols are TCP and UDP, and choosing between them is one of the most common decisions in networking and system design.', 'ট্রান্সপোর্ট স্তর (Layer 4) দুটি হোস্টের অ্যাপ্লিকেশনের মধ্যে ডেটা পৌঁছায়, ডেটা কোন অ্যাপের তা জানতে পোর্ট নম্বর ব্যবহার করে। এর দুটি প্রোটোকল TCP ও UDP, এবং এদের মধ্যে বাছাই নেটওয়ার্কিং ও সিস্টেম ডিজাইনের সবচেয়ে সাধারণ সিদ্ধান্তগুলোর একটি।') },
      ],
    },
    {
      h: l('TCP: reliable and connection-oriented', 'TCP: নির্ভরযোগ্য ও connection-oriented'),
      blocks: [
        { p: l('TCP (Transmission Control Protocol) guarantees that every byte arrives, in the right order, without duplication or corruption. It is "connection-oriented": both sides establish a connection before any data is sent.', 'TCP (Transmission Control Protocol) নিশ্চিত করে প্রতিটি বাইট সঠিক ক্রমে, ডুপ্লিকেশন বা নষ্ট ছাড়া পৌঁছায়। এটি "connection-oriented": ডেটা পাঠানোর আগে দুই পক্ষ একটি সংযোগ স্থাপন করে।') },
        { list: [
          l('Reliable delivery — lost segments are detected and retransmitted automatically.', 'নির্ভরযোগ্য ডেলিভারি—হারানো segment শনাক্ত ও স্বয়ংক্রিয়ভাবে পুনরায় পাঠানো হয়।'),
          l('Ordering — segments are numbered and reassembled in the correct order at the receiver.', 'ক্রম—segment নম্বরযুক্ত ও গ্রাহকের কাছে সঠিক ক্রমে পুনর্গঠিত হয়।'),
          l('Flow control — the sender slows down so it does not overwhelm a slower receiver.', 'flow control—প্রেরক ধীর হয় যাতে ধীর গ্রাহককে চাপে না ফেলে।'),
          l('Congestion control — TCP backs off when the network is busy, keeping the whole internet stable.', 'congestion control—নেটওয়ার্ক ব্যস্ত হলে TCP গতি কমায়, পুরো ইন্টারনেট স্থিতিশীল রাখে।'),
        ] },
        { note: l('TCP is like registered mail with tracking: the sender gets confirmation each piece arrived, and anything lost is resent.', 'TCP ট্র্যাকিংসহ রেজিস্টার্ড ডাকের মতো: প্রেরক নিশ্চিতকরণ পায় প্রতিটি অংশ পৌঁছেছে, আর হারানো কিছু আবার পাঠানো হয়।'), kind: 'tip' },
      ],
    },
    {
      h: l('The TCP three-way handshake', 'TCP তিন-ধাপ handshake'),
      blocks: [
        { p: l('Before any data flows, TCP opens a connection in three steps so both sides agree they are ready and on the starting sequence numbers.', 'কোনো ডেটা যাওয়ার আগে TCP তিন ধাপে সংযোগ খোলে যাতে দুই পক্ষ প্রস্তুত ও শুরুর সিকোয়েন্স নম্বরে একমত হয়।') },
        { steps: [
          l('SYN — the client says "I want to talk; here is my starting sequence number."', 'SYN—ক্লায়েন্ট বলে "আমি কথা বলতে চাই; এই আমার শুরুর সিকোয়েন্স নম্বর।"'),
          l('SYN-ACK — the server replies "OK, I heard you; here is mine."', 'SYN-ACK—সার্ভার উত্তর দেয় "ঠিক আছে, শুনেছি; এই আমারটি।"'),
          l('ACK — the client confirms "Got it." Now real data can flow.', 'ACK—ক্লায়েন্ট নিশ্চিত করে "পেয়েছি।" এখন আসল ডেটা যেতে পারে।'),
        ] },
        { p: l('This costs one full round trip before the first byte of real data — worth remembering when your app opens many short-lived connections instead of reusing one.', 'এটি আসল ডেটার প্রথম বাইটের আগে একটি পূর্ণ round trip খরচ করে—আপনার অ্যাপ একটি সংযোগ পুনঃব্যবহার না করে অনেক স্বল্পস্থায়ী সংযোগ খুললে এটি মনে রাখা জরুরি।') },
      ],
    },
    {
      h: l('Where TCP is used', 'TCP কোথায় ব্যবহৃত হয়'),
      blocks: [
        { p: l('Use TCP wherever correctness and order matter more than a few milliseconds: web pages (HTTP/HTTPS), email (SMTP/IMAP), file transfer (FTP), SSH, and database connections. If a missing or scrambled byte would break things, you want TCP.', 'যেখানে কয়েক মিলিসেকেন্ডের চেয়ে সঠিকতা ও ক্রম বেশি গুরুত্বপূর্ণ সেখানে TCP নিন: ওয়েব পেজ (HTTP/HTTPS), ইমেইল (SMTP/IMAP), ফাইল ট্রান্সফার (FTP), SSH ও ডেটাবেস সংযোগ। একটি হারানো বা এলোমেলো বাইট যদি সব ভাঙে, আপনি TCP চান।') },
      ],
    },
    {
      h: l('UDP: fast and connectionless', 'UDP: দ্রুত ও connectionless'),
      blocks: [
        { p: l('UDP (User Datagram Protocol) simply sends datagrams with no handshake, no ordering, and no delivery guarantee. Its header is tiny (8 bytes), so there is almost no overhead and no setup delay.', 'UDP (User Datagram Protocol) কোনো handshake, ক্রম বা ডেলিভারি গ্যারান্টি ছাড়াই datagram পাঠায়। এর হেডার ক্ষুদ্র (৮ বাইট), তাই প্রায় কোনো ওভারহেড ও সেটআপ বিলম্ব নেই।') },
        { list: [
          l('No connection setup — it starts sending immediately.', 'কোনো সংযোগ সেটআপ নেই—সঙ্গে সঙ্গে পাঠানো শুরু করে।'),
          l('No retransmission — lost data simply stays lost.', 'কোনো পুনঃপ্রেরণ নেই—হারানো ডেটা হারানোই থাকে।'),
          l('No ordering — datagrams may arrive in any order.', 'কোনো ক্রম নেই—datagram যেকোনো ক্রমে আসতে পারে।'),
          l('It does include a checksum, so it detects corruption — it just will not fix it.', 'এতে একটি checksum আছে, তাই এটি নষ্ট শনাক্ত করে—শুধু ঠিক করে না।'),
        ] },
        { note: l('UDP is like ordinary post: fast and cheap, but you never get confirmation it arrived.', 'UDP সাধারণ ডাকের মতো: দ্রুত ও সস্তা, তবে পৌঁছেছে এমন নিশ্চিতকরণ কখনো পান না।'), kind: 'tip' },
      ],
    },
    {
      h: l('Where UDP is used', 'UDP কোথায় ব্যবহৃত হয়'),
      blocks: [
        { p: l('Use UDP where speed beats perfection and a late packet is useless: live video and audio (YouTube Live, Twitch), video calls (Zoom, WhatsApp), online gaming, DNS lookups, and VoIP. A single dropped video frame is barely noticed; waiting to resend it would cause a freeze.', 'যেখানে গতি নিখুঁততার চেয়ে বেশি ও দেরিতে-আসা প্যাকেট অকেজো সেখানে UDP নিন: লাইভ ভিডিও ও অডিও (YouTube Live, Twitch), ভিডিও কল (Zoom, WhatsApp), অনলাইন গেমিং, DNS লুকআপ ও VoIP। একটি হারানো ভিডিও ফ্রেম প্রায় অলক্ষিত; তা আবার পাঠাতে অপেক্ষা করলে ফ্রিজ হতো।') },
      ],
    },
    {
      h: l('TCP vs UDP at a glance', 'TCP বনাম UDP এক নজরে'),
      blocks: [
        { table: {
          head: [l('Aspect', 'দিক'), l('TCP', 'TCP'), l('UDP', 'UDP')],
          rows: [
            [l('Connection', 'সংযোগ'), l('Connection-oriented (handshake first)', 'connection-oriented (আগে handshake)'), l('Connectionless', 'connectionless')],
            [l('Reliability', 'নির্ভরযোগ্যতা'), l('Guaranteed delivery', 'নিশ্চিত ডেলিভারি'), l('No guarantee', 'কোনো গ্যারান্টি নেই')],
            [l('Ordering', 'ক্রম'), l('Delivered in order', 'ক্রমে পৌঁছায়'), l('May arrive out of order', 'ক্রমের বাইরে আসতে পারে')],
            [l('Speed', 'গতি'), l('Slower (more overhead)', 'ধীর (বেশি ওভারহেড)'), l('Faster (minimal overhead)', 'দ্রুত (ন্যূনতম ওভারহেড)')],
            [l('Header size', 'হেডার সাইজ'), l('20+ bytes', '২০+ বাইট'), l('8 bytes', '৮ বাইট')],
            [l('Use when', 'কখন ব্যবহার'), l('Correctness matters', 'সঠিকতা গুরুত্বপূর্ণ'), l('Latency matters', 'latency গুরুত্বপূর্ণ')],
          ],
        } },
      ],
    },
    {
      h: l('When to use which', 'কখন কোনটা ব্যবহার করবেন'),
      blocks: [
        { list: [
          l('Choose TCP when every byte must arrive correctly: payments, file transfers, web pages, APIs.', 'যখন প্রতিটি বাইট সঠিকভাবে পৌঁছাতে হবে তখন TCP নিন: পেমেন্ট, ফাইল ট্রান্সফার, ওয়েব পেজ, API।'),
          l('Choose UDP when speed matters more than perfection and a lost packet is acceptable: live media, gaming, VoIP.', 'যখন গতি নিখুঁততার চেয়ে বেশি ও একটি হারানো প্যাকেট গ্রহণযোগ্য তখন UDP নিন: লাইভ মিডিয়া, গেমিং, VoIP।'),
          l('Use UDP for many tiny requests where a handshake per request would be wasteful, like DNS.', 'অনেক ছোট রিকোয়েস্টে UDP নিন যেখানে প্রতি রিকোয়েস্টে handshake অপচয় হতো, যেমন DNS।'),
          l('Note: HTTP/3 (QUIC) actually runs over UDP and rebuilds the reliability it needs on top — proof that UDP is not "worse," just lower-level.', 'নোট: HTTP/3 (QUIC) আসলে UDP-এর ওপর চলে ও দরকারি নির্ভরযোগ্যতা ওপরে আবার বানায়—প্রমাণ যে UDP "খারাপ" নয়, শুধু নিচু-স্তরের।'),
        ] },
      ],
    },
    {
      h: l('Common misconceptions', 'সাধারণ ভুল ধারণা'),
      blocks: [
        { list: [
          l('"TCP is always better." — For a video call, TCP’s retransmissions cause freezes; UDP’s dropped frame is barely noticed.', '"TCP সবসময় ভালো।"—ভিডিও কলে TCP-এর পুনঃপ্রেরণ ফ্রিজ ঘটায়; UDP-এর হারানো ফ্রেম প্রায় অলক্ষিত।'),
          l('"UDP has no error checking." — It has a checksum to detect corruption; it simply does not retransmit.', '"UDP-তে error checking নেই।"—নষ্ট শনাক্তে এর checksum আছে; শুধু পুনঃপ্রেরণ করে না।'),
          l('"UDP is unreliable, so it is bad." — It is a deliberate trade-off; apps that need reliability build it on top of UDP.', '"UDP অনির্ভরযোগ্য, তাই খারাপ।"—এটি একটি ইচ্ছাকৃত ট্রেড-অফ; যেসব অ্যাপের নির্ভরযোগ্যতা দরকার তারা UDP-এর ওপর তা বানায়।'),
        ] },
      ],
    },
    {
      h: l('Remember in one line', 'এক লাইনে মনে রাখুন'),
      blocks: [
        { list: [
          l('TCP = reliable, ordered, connection-oriented, a bit slower; UDP = fast, connectionless, best-effort.', 'TCP = নির্ভরযোগ্য, ক্রমিক, connection-oriented, একটু ধীর; UDP = দ্রুত, connectionless, best-effort।'),
          l('TCP for correctness (web, files, payments); UDP for real-time (video, games, DNS).', 'সঠিকতায় TCP (ওয়েব, ফাইল, পেমেন্ট); রিয়েল-টাইমে UDP (ভিডিও, গেম, DNS)।'),
          l('Pick based on one question: is a late-but-perfect packet still useful?', 'একটি প্রশ্নে বাছুন: দেরিতে-আসা কিন্তু নিখুঁত প্যাকেট কি এখনো কাজের?'),
        ] },
      ],
    },
  ],

  // ── System Design · Foundations ───────────────────────────────────────────
  'system-design': [
    {
      h: l('What is system design?', 'সিস্টেম ডিজাইন কী?'),
      blocks: [
        { p: l('System design is the process of deciding how the pieces of a software system — servers, databases, caches, queues, networks — fit together to meet a set of requirements at a given scale, reliability, and cost. Writing code that works on your laptop is one skill; designing a system that stays fast and available for millions of users is a different one, and that is what system design is about.', 'সিস্টেম ডিজাইন হলো একটি সফটওয়্যার সিস্টেমের অংশগুলো—সার্ভার, ডেটাবেস, ক্যাশ, কিউ, নেটওয়ার্ক—কীভাবে একসঙ্গে কাজ করে নির্দিষ্ট স্কেল, নির্ভরযোগ্যতা ও খরচে প্রয়োজন মেটাবে তা ঠিক করার প্রক্রিয়া। ল্যাপটপে চলা কোড লেখা এক দক্ষতা; লক্ষ লক্ষ ব্যবহারকারীর জন্য দ্রুত ও সচল থাকা সিস্টেম ডিজাইন করা ভিন্ন দক্ষতা—সিস্টেম ডিজাইন সেটাই।') },
        { p: l('There is rarely a single "correct" design. Instead there are trade-offs: make reads faster and writes may get slower; add a cache and you gain speed but risk stale data; choose strong consistency and you may lose some availability. A good design is the one whose trade-offs best fit the specific requirements in front of you.', 'একটিমাত্র "সঠিক" ডিজাইন কমই থাকে। বরং থাকে ট্রেড-অফ: পড়া দ্রুত করলে লেখা ধীর হতে পারে; ক্যাশ যোগ করলে গতি বাড়ে কিন্তু পুরনো ডেটার ঝুঁকি; শক্ত consistency নিলে কিছু availability হারাতে পারেন। ভালো ডিজাইন সেটাই যার ট্রেড-অফ সামনের নির্দিষ্ট প্রয়োজনের সঙ্গে সবচেয়ে ভালো মেলে।') },
      ],
    },
    {
      h: l('A repeatable framework', 'একটি পুনরাবৃত্তিযোগ্য কাঠামো'),
      blocks: [
        { p: l('Whether in an interview or on the job, approach any system the same way. Do not jump to a database or a technology first — start with what the system must do and how much of it.', 'ইন্টারভিউতে হোক বা কাজে, যেকোনো সিস্টেমে একইভাবে এগোন। প্রথমেই ডেটাবেস বা টেকনোলজিতে লাফ দেবেন না—শুরু করুন সিস্টেমকে কী করতে হবে ও কতটা করতে হবে তা দিয়ে।') },
        { steps: [
          l('Clarify requirements — what features (functional) and what scale, latency, and availability targets (non-functional).', 'প্রয়োজন স্পষ্ট করুন—কোন ফিচার (functional) এবং কী স্কেল, latency ও availability লক্ষ্য (non-functional)।'),
          l('Estimate the scale — rough numbers for users, requests per second, storage, and bandwidth. These numbers decide the design.', 'স্কেল আন্দাজ করুন—ব্যবহারকারী, প্রতি সেকেন্ডে রিকোয়েস্ট, স্টোরেজ ও ব্যান্ডউইথের মোটামুটি সংখ্যা। এই সংখ্যাই ডিজাইন ঠিক করে।'),
          l('Draw the high-level design — client, load balancer, app servers, cache, database, and any queues or storage, and how a request flows through them.', 'হাই-লেভেল ডিজাইন আঁকুন—ক্লায়েন্ট, লোড ব্যালান্সার, অ্যাপ সার্ভার, ক্যাশ, ডেটাবেস, ও যেকোনো কিউ বা স্টোরেজ, এবং একটি রিকোয়েস্ট কীভাবে এদের মধ্য দিয়ে যায়।'),
          l('Deep-dive the hard parts — the data model, the hottest read/write path, and the one or two components that will break first under load.', 'কঠিন অংশে গভীরে যান—ডেটা মডেল, সবচেয়ে ব্যস্ত পড়া/লেখা পথ, ও লোডে প্রথমে ভাঙবে এমন এক-দুটি উপাদান।'),
          l('Find the bottlenecks and scale them — add caching, replication, sharding, or async processing where the numbers demand it.', 'বটলনেক খুঁজে স্কেল করুন—যেখানে সংখ্যা দাবি করে সেখানে ক্যাশিং, রেপ্লিকেশন, শার্ডিং বা অ্যাসিঙ্ক প্রসেসিং যোগ করুন।'),
          l('State the trade-offs — say out loud what you optimized for and what you gave up.', 'ট্রেড-অফ বলুন—কী অপটিমাইজ করলেন ও কী ছাড়লেন তা স্পষ্ট বলুন।'),
        ] },
      ],
    },
    {
      h: l('The building blocks you compose', 'যে উপাদানগুলো দিয়ে গড়েন'),
      blocks: [
        { p: l('Almost every large system is built from the same handful of components. Learning what each one does — and its cost — lets you assemble a design quickly.', 'প্রায় প্রতিটি বড় সিস্টেম একই কয়েকটি উপাদান দিয়ে তৈরি। প্রতিটি কী করে—ও তার খরচ—জানলে দ্রুত একটি ডিজাইন সাজাতে পারেন।') },
        { table: {
          head: [l('Component', 'উপাদান'), l('Its job', 'কাজ')],
          rows: [
            [l('Load balancer', 'লোড ব্যালান্সার'), l('Spreads requests across many app servers and skips unhealthy ones.', 'অনেক অ্যাপ সার্ভারে রিকোয়েস্ট ছড়ায় ও অসুস্থগুলো এড়ায়।')],
            [l('Cache', 'ক্যাশ'), l('Stores hot data in memory so reads avoid the slow database.', 'হট ডেটা মেমরিতে রাখে যাতে পড়া ধীর ডেটাবেস এড়ায়।')],
            [l('Database', 'ডেটাবেস'), l('The durable source of truth — SQL for relations, NoSQL for scale/flexibility.', 'টেকসই সত্যের উৎস—সম্পর্কে SQL, স্কেল/নমনীয়তায় NoSQL।')],
            [l('Queue', 'কিউ'), l('Decouples producers from consumers so slow work happens asynchronously.', 'প্রোডিউসারকে কনজিউমার থেকে আলাদা করে যাতে ধীর কাজ অ্যাসিঙ্ক হয়।')],
            [l('CDN', 'CDN'), l('Serves static content from edges near users to cut latency.', 'latency কমাতে ব্যবহারকারীর কাছের edge থেকে স্ট্যাটিক কন্টেন্ট দেয়।')],
            [l('Blob store', 'ব্লব স্টোর'), l('Cheap, durable storage for large files, images, and video.', 'বড় ফাইল, ছবি ও ভিডিওর জন্য সস্তা, টেকসই স্টোরেজ।')],
          ],
        } },
      ],
    },
    {
      h: l('Non-functional requirements drive the design', 'নন-ফাংশনাল প্রয়োজন ডিজাইন চালায়'),
      blocks: [
        { p: l('Two apps with identical features can need completely different designs because of their non-functional requirements — scale, latency, availability, consistency, and cost. A note-taking app for 100 users and a chat app for 100 million users both "send messages," but almost nothing else about them is the same.', 'একই ফিচারযুক্ত দুটি অ্যাপের ডিজাইন সম্পূর্ণ ভিন্ন হতে পারে তাদের নন-ফাংশনাল প্রয়োজনের কারণে—স্কেল, latency, availability, consistency ও খরচ। ১০০ ব্যবহারকারীর নোট অ্যাপ ও ১০ কোটি ব্যবহারকারীর চ্যাট অ্যাপ দুটোই "মেসেজ পাঠায়," কিন্তু আর প্রায় কিছুই এক নয়।') },
        { p: l('So always pin the numbers early: how many users, how many requests per second, how much data, how fast must a response be (p99), and how much downtime is acceptable. Those answers, not your favourite technology, decide the architecture.', 'তাই সবসময় আগেভাগে সংখ্যা ঠিক করুন: কত ব্যবহারকারী, প্রতি সেকেন্ডে কত রিকোয়েস্ট, কত ডেটা, রেসপন্স কত দ্রুত হতে হবে (p99), ও কতটা ডাউনটাইম গ্রহণযোগ্য। সেই উত্তরই—আপনার প্রিয় টেকনোলজি নয়—আর্কিটেকচার ঠিক করে।') },
      ],
    },
    {
      h: l('Common mistakes', 'সাধারণ ভুল'),
      blocks: [
        { list: [
          l('Jumping to a specific database or framework before understanding the requirements and scale.', 'প্রয়োজন ও স্কেল বোঝার আগে একটি নির্দিষ্ট ডেটাবেস বা ফ্রেমওয়ার্কে লাফ দেওয়া।'),
          l('Over-engineering for a scale you will never reach — a single server handles far more than beginners expect.', 'যে স্কেলে কখনো পৌঁছাবেন না তার জন্য অতি-ইঞ্জিনিয়ারিং—একটি সার্ভার নতুনদের ধারণার চেয়ে অনেক বেশি সামলায়।'),
          l('Designing for the average case and ignoring peak load and failures, which are what actually break systems.', 'গড়-কেসের জন্য ডিজাইন করে পিক লোড ও ব্যর্থতা উপেক্ষা করা, যা আসলে সিস্টেম ভাঙে।'),
        ] },
      ],
    },
    {
      h: l('Remember in one line', 'এক লাইনে মনে রাখুন'),
      blocks: [
        { list: [
          l('System design = fitting standard building blocks together to meet requirements at scale, reliably, and affordably.', 'সিস্টেম ডিজাইন = স্কেলে, নির্ভরযোগ্যভাবে ও সাশ্রয়ীভাবে প্রয়োজন মেটাতে প্রমিত উপাদান একত্র করা।'),
          l('Always go requirements → estimation → high-level design → deep dives → bottlenecks → trade-offs.', 'সবসময় যান প্রয়োজন → আন্দাজ → হাই-লেভেল ডিজাইন → গভীর ডাইভ → বটলনেক → ট্রেড-অফ।'),
          l('There is no perfect design, only trade-offs that fit the numbers in front of you.', 'নিখুঁত ডিজাইন নেই, শুধু ট্রেড-অফ যা সামনের সংখ্যার সঙ্গে মেলে।'),
        ] },
      ],
    },
  ],

  'request-lifecycle': [
    {
      h: l('Why trace a single request?', 'কেন একটি রিকোয়েস্ট ট্রেস করবেন?'),
      blocks: [
        { p: l('The best way to understand a whole system is to follow one request from the moment a user acts to the moment they see a result. Every component you will ever design — DNS, load balancers, caches, databases — sits somewhere on this path. Trace it once and the pieces stop being abstract.', 'একটি পুরো সিস্টেম বোঝার সেরা উপায় হলো ব্যবহারকারীর একটি ক্রিয়া থেকে ফল দেখা পর্যন্ত একটি রিকোয়েস্ট অনুসরণ করা। আপনি যত উপাদান ডিজাইন করবেন—DNS, লোড ব্যালান্সার, ক্যাশ, ডেটাবেস—সব এই পথের কোথাও বসে। একবার ট্রেস করলে অংশগুলো আর বিমূর্ত থাকে না।') },
      ],
    },
    {
      h: l('What happens when you open a URL', 'একটি URL খুললে কী ঘটে'),
      blocks: [
        { steps: [
          l('DNS lookup — the browser turns the domain (example.com) into an IP address, often answered from a cache in milliseconds.', 'DNS লুকআপ—ব্রাউজার ডোমেইন (example.com)-কে একটি IP ঠিকানায় পরিণত করে, প্রায়ই ক্যাশ থেকে মিলিসেকেন্ডে।'),
          l('TCP + TLS — the browser opens a connection to the server (a three-way handshake) and, for HTTPS, negotiates encryption. This costs one or two round trips.', 'TCP + TLS—ব্রাউজার সার্ভারে একটি সংযোগ খোলে (তিন-ধাপ handshake) এবং HTTPS-এ এনক্রিপশন ঠিক করে। এতে এক-দুই round trip লাগে।'),
          l('HTTP request — the browser sends "GET /" with headers and cookies to the server’s IP.', 'HTTP রিকোয়েস্ট—ব্রাউজার হেডার ও কুকিসহ "GET /" সার্ভারের IP-তে পাঠায়।'),
          l('Load balancer — the request usually hits a load balancer first, which forwards it to one healthy app server out of many.', 'লোড ব্যালান্সার—রিকোয়েস্ট সাধারণত আগে একটি লোড ব্যালান্সারে পৌঁছায়, যা অনেকের মধ্যে একটি সুস্থ অ্যাপ সার্ভারে পাঠায়।'),
          l('App server — the server runs your code: checks auth, reads a cache, and if needed queries the database.', 'অ্যাপ সার্ভার—সার্ভার আপনার কোড চালায়: auth যাচাই, ক্যাশ পড়ে, দরকার হলে ডেটাবেস কুয়েরি করে।'),
          l('Cache or database — a cache hit returns in microseconds; a cache miss reads from the database, which is slower.', 'ক্যাশ বা ডেটাবেস—cache hit মাইক্রোসেকেন্ডে ফেরে; cache miss ডেটাবেস থেকে পড়ে, যা ধীর।'),
          l('Response — the server builds a response (HTML or JSON), which travels back through the load balancer to the browser, which renders it.', 'রেসপন্স—সার্ভার একটি রেসপন্স (HTML বা JSON) বানায়, যা লোড ব্যালান্সার হয়ে ব্রাউজারে ফিরে আসে ও রেন্ডার হয়।'),
        ] },
      ],
    },
    {
      h: l('Where the time actually goes', 'সময় আসলে কোথায় যায়'),
      blocks: [
        { p: l('On a typical request most of the wall-clock time is network and connection setup, not your server code. This is why cutting round trips (keep-alive connections, CDNs, fewer requests) often speeds a page up more than optimizing the server.', 'একটি সাধারণ রিকোয়েস্টে বেশিরভাগ সময় নেটওয়ার্ক ও সংযোগ সেটআপ, আপনার সার্ভার কোড নয়। এ কারণেই round trip কমানো (keep-alive সংযোগ, CDN, কম রিকোয়েস্ট) সার্ভার অপটিমাইজের চেয়ে প্রায়ই পেজ বেশি দ্রুত করে।') },
        { table: {
          head: [l('Stage', 'ধাপ'), l('Typical cost', 'সাধারণ খরচ')],
          rows: [
            [l('DNS lookup (cached)', 'DNS লুকআপ (cached)'), l('~1–20 ms', '~১–২০ ms')],
            [l('TCP + TLS handshake', 'TCP + TLS handshake'), l('~50–150 ms (one round trip each)', '~৫০–১৫০ ms (প্রতিটি এক round trip)')],
            [l('Server processing (cache hit)', 'সার্ভার প্রসেসিং (cache hit)'), l('~1–10 ms', '~১–১০ ms')],
            [l('Server processing (DB query)', 'সার্ভার প্রসেসিং (DB কুয়েরি)'), l('~10–100 ms+', '~১০–১০০ ms+')],
            [l('Response transfer', 'রেসপন্স ট্রান্সফার'), l('depends on size and distance', 'সাইজ ও দূরত্বের ওপর নির্ভর')],
          ],
        } },
      ],
    },
    {
      h: l('Caching happens at every layer', 'প্রতিটি স্তরে ক্যাশিং ঘটে'),
      blocks: [
        { list: [
          l('Browser cache — the user’s own machine reuses assets it already downloaded.', 'ব্রাউজার ক্যাশ—ব্যবহারকারীর মেশিন আগে ডাউনলোড করা অ্যাসেট পুনঃব্যবহার করে।'),
          l('CDN cache — an edge server near the user returns static content without touching your origin.', 'CDN ক্যাশ—ব্যবহারকারীর কাছের edge সার্ভার আপনার origin না ছুঁয়ে স্ট্যাটিক কন্টেন্ট দেয়।'),
          l('Application cache — an in-memory cache (like Redis) returns hot data without a database read.', 'অ্যাপ্লিকেশন ক্যাশ—একটি ইন-মেমরি ক্যাশ (যেমন Redis) ডেটাবেস না পড়েই হট ডেটা দেয়।'),
          l('Database cache — the database itself caches recent queries and pages in memory.', 'ডেটাবেস ক্যাশ—ডেটাবেস নিজেই সাম্প্রতিক কুয়েরি ও পেজ মেমরিতে ক্যাশ করে।'),
        ] },
      ],
    },
    {
      h: l('What can go wrong at each hop', 'প্রতিটি হপে কী ভুল হতে পারে'),
      blocks: [
        { list: [
          l('DNS misconfigured or slow → the site is unreachable even though the server is healthy.', 'DNS ভুল কনফিগার বা ধীর → সার্ভার সুস্থ হলেও সাইটে পৌঁছানো যায় না।'),
          l('Expired TLS certificate → every browser refuses to connect at once.', 'মেয়াদোত্তীর্ণ TLS সার্টিফিকেট → প্রতিটি ব্রাউজার একসঙ্গে সংযোগে অস্বীকার করে।'),
          l('One overloaded app server → the load balancer’s health checks should route around it.', 'একটি ওভারলোডেড অ্যাপ সার্ভার → লোড ব্যালান্সারের হেলথ চেক একে এড়িয়ে রাউট করবে।'),
          l('A slow database query → shows up as high tail latency for a subset of users.', 'একটি ধীর ডেটাবেস কুয়েরি → কিছু ব্যবহারকারীর জন্য উচ্চ tail latency হিসেবে দেখা যায়।'),
        ] },
      ],
    },
    {
      h: l('Remember in one line', 'এক লাইনে মনে রাখুন'),
      blocks: [
        { list: [
          l('A request flows: DNS → TCP/TLS → HTTP → load balancer → app server → cache/DB → response → render.', 'একটি রিকোয়েস্ট যায়: DNS → TCP/TLS → HTTP → লোড ব্যালান্সার → অ্যাপ সার্ভার → ক্যাশ/DB → রেসপন্স → রেন্ডার।'),
          l('Most latency is network and round trips, not server code — so cut round trips and cache aggressively.', 'বেশিরভাগ latency নেটওয়ার্ক ও round trip, সার্ভার কোড নয়—তাই round trip কমান ও আক্রমণাত্মকভাবে ক্যাশ করুন।'),
          l('Every component you design lives somewhere on this path.', 'আপনার ডিজাইন করা প্রতিটি উপাদান এই পথের কোথাও থাকে।'),
        ] },
      ],
    },
  ],

  'requirements': [
    {
      h: l('Why requirements come first', 'কেন প্রয়োজন আগে আসে'),
      blocks: [
        { p: l('Every design decision is an answer to a requirement. If you do not know the requirements, you are guessing — and you will either build far too much or the wrong thing entirely. Spending a few minutes clarifying what the system must do, and for how many users, saves you from redesigning everything later.', 'প্রতিটি ডিজাইন সিদ্ধান্ত একটি প্রয়োজনের উত্তর। প্রয়োজন না জানলে আপনি অনুমান করছেন—আর হয় অনেক বেশি বানাবেন, নয়তো সম্পূর্ণ ভুল জিনিস। সিস্টেমকে কী করতে হবে ও কতজন ব্যবহারকারীর জন্য তা স্পষ্ট করতে কয়েক মিনিট খরচ পরে সব নতুন করে ডিজাইনের হাত থেকে বাঁচায়।') },
      ],
    },
    {
      h: l('Functional requirements: what it does', 'ফাংশনাল প্রয়োজন: এটি কী করে'),
      blocks: [
        { p: l('Functional requirements are the features — the concrete things a user can do. For a URL shortener: create a short link, redirect a short link to the original, and maybe show click analytics. Keep this list small and explicit; a clear, minimal feature set keeps the whole design focused.', 'ফাংশনাল প্রয়োজন হলো ফিচার—ব্যবহারকারী যা যা করতে পারে সেই মূর্ত জিনিস। একটি URL শর্টেনারে: একটি ছোট লিংক তৈরি, ছোট লিংককে মূলটিতে রিডাইরেক্ট, ও হয়তো ক্লিক analytics দেখানো। এই তালিকা ছোট ও স্পষ্ট রাখুন; পরিষ্কার, ন্যূনতম ফিচার সেট পুরো ডিজাইন মনোযোগী রাখে।') },
      ],
    },
    {
      h: l('Non-functional requirements: how well', 'নন-ফাংশনাল প্রয়োজন: কতটা ভালো'),
      blocks: [
        { p: l('Non-functional requirements describe the qualities the system must have. These, more than the features, decide the architecture.', 'নন-ফাংশনাল প্রয়োজন সিস্টেমের যে গুণ থাকতে হবে তা বর্ণনা করে। ফিচারের চেয়ে এগুলোই আর্কিটেকচার ঠিক করে।') },
        { table: {
          head: [l('Requirement', 'প্রয়োজন'), l('The question it answers', 'যে প্রশ্নের উত্তর দেয়')],
          rows: [
            [l('Scalability', 'স্কেলেবিলিটি'), l('How many users and requests per second must it handle, now and later?', 'এখন ও পরে কত ব্যবহারকারী ও প্রতি সেকেন্ডে রিকোয়েস্ট সামলাতে হবে?')],
            [l('Latency', 'latency'), l('How fast must a response be, especially at the p99 (slowest 1%)?', 'রেসপন্স কত দ্রুত হতে হবে, বিশেষত p99-এ (সবচেয়ে ধীর ১%)?')],
            [l('Availability', 'availability'), l('How much downtime is acceptable — 99.9%? 99.99%?', 'কতটা ডাউনটাইম গ্রহণযোগ্য—৯৯.৯%? ৯৯.৯৯%?')],
            [l('Consistency', 'consistency'), l('Must every user see the same data instantly, or is a short delay fine?', 'প্রতিটি ব্যবহারকারীকে কি তাৎক্ষণিক একই ডেটা দেখতে হবে, নাকি সামান্য বিলম্ব ঠিক আছে?')],
            [l('Durability', 'durability'), l('Can we ever lose data? (Usually no for payments, maybe for logs.)', 'ডেটা কি কখনো হারাতে পারি? (পেমেন্টে সাধারণত না, লগে হয়তো।)')],
            [l('Cost', 'খরচ'), l('What is the budget — this bounds every other choice.', 'বাজেট কী—এটি প্রতিটি সিদ্ধান্ত সীমিত করে।')],
          ],
        } },
      ],
    },
    {
      h: l('How to gather requirements', 'প্রয়োজন কীভাবে সংগ্রহ করবেন'),
      blocks: [
        { p: l('Ask focused questions before you design. In an interview this shows maturity; on the job it prevents rework.', 'ডিজাইনের আগে মনোযোগী প্রশ্ন করুন। ইন্টারভিউতে এটি পরিপক্বতা দেখায়; কাজে এটি পুনঃকাজ ঠেকায়।') },
        { list: [
          l('Who uses it and what are the top 2–3 things they do? (Find the core, ignore the rest for now.)', 'কে ব্যবহার করে ও তারা শীর্ষ ২–৩টি কী করে? (মূলটি খুঁজুন, বাকিটা আপাতত ছাড়ুন।)'),
          l('How many users, and how active? (Daily active users → requests per second.)', 'কত ব্যবহারকারী, ও কতটা সক্রিয়? (দৈনিক সক্রিয় ব্যবহারকারী → প্রতি সেকেন্ডে রিকোয়েস্ট।)'),
          l('Read-heavy or write-heavy? (A feed is read-heavy; a logging system is write-heavy — they need different designs.)', 'পড়া-বেশি নাকি লেখা-বেশি? (ফিড পড়া-বেশি; লগিং লেখা-বেশি—ভিন্ন ডিজাইন লাগে।)'),
          l('What is out of scope? (Say it explicitly so you do not design for it.)', 'কী স্কোপের বাইরে? (স্পষ্ট বলুন যাতে তার জন্য ডিজাইন না করেন।)'),
        ] },
      ],
    },
    {
      h: l('From requirements to numbers', 'প্রয়োজন থেকে সংখ্যায়'),
      blocks: [
        { p: l('Requirements are only useful once they become numbers. "Popular" is not a design input; "50 million daily users, 80% reads, 200ms p99" is. Turning vague requirements into concrete scale estimates is the bridge to the actual design — which is the next topic, estimation.', 'প্রয়োজন সংখ্যায় পরিণত হলেই কাজে লাগে। "জনপ্রিয়" ডিজাইন ইনপুট নয়; "৫ কোটি দৈনিক ব্যবহারকারী, ৮০% পড়া, ২০০ms p99" হলো ইনপুট। অস্পষ্ট প্রয়োজনকে মূর্ত স্কেল আন্দাজে পরিণত করা আসল ডিজাইনের সেতু—যা পরের টপিক, estimation।') },
      ],
    },
    {
      h: l('Remember in one line', 'এক লাইনে মনে রাখুন'),
      blocks: [
        { list: [
          l('Functional = what it does; non-functional = how well (scale, latency, availability, consistency, cost).', 'ফাংশনাল = কী করে; নন-ফাংশনাল = কতটা ভালো (স্কেল, latency, availability, consistency, খরচ)।'),
          l('Non-functional requirements, not features, decide the architecture.', 'ফিচার নয়, নন-ফাংশনাল প্রয়োজনই আর্কিটেকচার ঠিক করে।'),
          l('Turn every requirement into a number before you draw a single box.', 'একটি বক্স আঁকার আগে প্রতিটি প্রয়োজনকে সংখ্যায় পরিণত করুন।'),
        ] },
      ],
    },
  ],

  'estimation': [
    {
      h: l('Why estimate at all?', 'কেন আন্দাজ করবেন?'),
      blocks: [
        { p: l('Back-of-the-envelope estimation turns vague requirements into the numbers that decide your design. A system serving 100 requests per second and one serving 1 million look nothing alike, and a rough estimate tells you which world you are in — so you neither over-build nor under-build. You are not aiming for accuracy; you are aiming for the right order of magnitude.', 'ব্যাক-অফ-দ্য-এনভেলপ estimation অস্পষ্ট প্রয়োজনকে সেই সংখ্যায় পরিণত করে যা আপনার ডিজাইন ঠিক করে। প্রতি সেকেন্ডে ১০০ রিকোয়েস্ট ও ১০ লক্ষ রিকোয়েস্টের সিস্টেম একদম আলাদা, আর একটি মোটামুটি আন্দাজ বলে দেয় আপনি কোন জগতে—তাই অতি-বেশি বা কম বানান না। লক্ষ্য নির্ভুলতা নয়; লক্ষ্য সঠিক অর্ডার অফ ম্যাগনিটিউড।') },
      ],
    },
    {
      h: l('The numbers worth memorizing', 'যে সংখ্যাগুলো মুখস্থ রাখা মূল্যবান'),
      blocks: [
        { p: l('A few anchor numbers make estimation fast. The single most useful one: there are about 100,000 seconds in a day (86,400, round to 10⁵).', 'কয়েকটি অ্যাংকর সংখ্যা estimation দ্রুত করে। সবচেয়ে দরকারিটি: এক দিনে প্রায় ১,০০,০০০ সেকেন্ড (৮৬,৪০০, গোল করে ১০⁵)।') },
        { table: {
          head: [l('Fact', 'তথ্য'), l('Value', 'মান')],
          rows: [
            [l('Seconds in a day', 'দিনে সেকেন্ড'), l('~86,400 ≈ 10⁵', '~৮৬,৪০০ ≈ ১০⁵')],
            [l('Read from memory', 'মেমরি থেকে পড়া'), l('~100 ns', '~১০০ ns')],
            [l('Read from SSD', 'SSD থেকে পড়া'), l('~100 µs (1,000× slower than memory)', '~১০০ µs (মেমরির চেয়ে ১,০০০× ধীর)')],
            [l('Round trip within a region', 'একটি অঞ্চলে round trip'), l('~0.5–1 ms', '~০.৫–১ ms')],
            [l('Round trip across the world', 'পৃথিবীজুড়ে round trip'), l('~100–150 ms', '~১০০–১৫০ ms')],
            [l('1 char ≈ 1 byte; a KB=10³, MB=10⁶, GB=10⁹', '১ অক্ষর ≈ ১ বাইট; KB=10³, MB=10⁶, GB=10⁹'), l('use powers of 10', 'দশের ঘাত ব্যবহার করুন')],
          ],
        } },
      ],
    },
    {
      h: l('A repeatable method', 'একটি পুনরাবৃত্তিযোগ্য পদ্ধতি'),
      blocks: [
        { p: l('Estimate in a fixed order — users, then queries per second, then storage, then bandwidth — and show the arithmetic. Here is a worked example for a Twitter-like feed.', 'একটি নির্দিষ্ট ক্রমে আন্দাজ করুন—ব্যবহারকারী, তারপর প্রতি সেকেন্ডে কুয়েরি, তারপর স্টোরেজ, তারপর ব্যান্ডউইথ—আর হিসাব দেখান। এই যে একটি টুইটার-সদৃশ ফিডের কাজ-করা উদাহরণ।') },
        { code: 'Assumptions\n  Daily active users (DAU) = 300 million = 3 × 10^8\n  Each user posts 2 tweets/day\n\nWrite QPS\n  writes/day = 3e8 × 2 = 6 × 10^8\n  avg QPS   = 6e8 / 1e5 (secs/day) = 6,000 writes/sec\n  peak QPS  = avg × 3            ≈ 18,000 writes/sec\n\nStorage (5 years)\n  tweet size ≈ 300 bytes\n  tweets/day = 6e8\n  per day    = 6e8 × 300 = 1.8 × 10^11 B ≈ 180 GB/day\n  5 years    = 180 GB × 365 × 5 ≈ 330 TB', caption: l('Notice: we never used a calculator. Round to powers of 10, multiply, and read off the order of magnitude.', 'লক্ষ করুন: আমরা ক্যালকুলেটর ব্যবহার করিনি। দশের ঘাতে গোল করুন, গুণ করুন, ও অর্ডার অফ ম্যাগনিটিউড পড়ুন।') },
      ],
    },
    {
      h: l('Reads dominate — and peak beats average', 'পড়া প্রধান—আর পিক গড়কে হারায়'),
      blocks: [
        { p: l('Most consumer systems are read-heavy: users read far more than they write (a feed might be 100:1 reads to writes). Estimate reads separately, and always multiply the average by a peak factor (often 2–10×) — systems must survive the busy hour, not the average one.', 'বেশিরভাগ কনজিউমার সিস্টেম পড়া-বেশি: ব্যবহারকারী লেখার চেয়ে অনেক বেশি পড়ে (একটি ফিড হয়তো ১০০:১ পড়া বনাম লেখা)। পড়া আলাদা আন্দাজ করুন, ও গড়কে সবসময় একটি পিক ফ্যাক্টর দিয়ে গুণ করুন (প্রায়ই ২–১০×)—সিস্টেমকে ব্যস্ত ঘণ্টায় টিকতে হয়, গড় ঘণ্টায় নয়।') },
      ],
    },
    {
      h: l('Sanity-check and round', 'যাচাই ও গোল করুন'),
      blocks: [
        { list: [
          l('Always round to one significant figure — 6,000 QPS, not 5,834. Precision is fake here.', 'সবসময় এক সার্থক অঙ্কে গোল করুন—৬,০০০ QPS, ৫,৮৩৪ নয়। এখানে নির্ভুলতা মিথ্যা।'),
          l('Ask "does this feel right?" 18,000 writes/sec is a lot but plausible for global Twitter; 18 million would be wrong.', 'জিজ্ঞাসা করুন "এটা কি ঠিক মনে হয়?" ১৮,০০০ লেখা/সেকেন্ড অনেক তবে গ্লোবাল টুইটারে যুক্তিসঙ্গত; ১ কোটি ৮০ লক্ষ ভুল হতো।'),
          l('The estimate’s purpose is a decision: does one database suffice, or do we need caching, sharding, and a queue?', 'আন্দাজের উদ্দেশ্য একটি সিদ্ধান্ত: একটি ডেটাবেস যথেষ্ট, নাকি ক্যাশিং, শার্ডিং ও কিউ লাগবে?'),
        ] },
      ],
    },
    {
      h: l('Remember in one line', 'এক লাইনে মনে রাখুন'),
      blocks: [
        { list: [
          l('Estimate in order: users → QPS → storage → bandwidth, using powers of 10.', 'ক্রমে আন্দাজ: ব্যবহারকারী → QPS → স্টোরেজ → ব্যান্ডউইথ, দশের ঘাত দিয়ে।'),
          l('~10⁵ seconds in a day is the key constant; QPS = daily actions ÷ 10⁵.', 'দিনে ~১০⁵ সেকেন্ড মূল ধ্রুবক; QPS = দৈনিক ক্রিয়া ÷ ১০⁵।'),
          l('Aim for the right order of magnitude, multiply average by a peak factor, and round hard.', 'সঠিক অর্ডার অফ ম্যাগনিটিউড লক্ষ্য করুন, গড়কে পিক ফ্যাক্টরে গুণ করুন, ও জোরে গোল করুন।'),
        ] },
      ],
    },
  ],

  'performance': [
    {
      h: l('Latency and throughput are different', 'latency ও throughput ভিন্ন'),
      blocks: [
        { p: l('Two words get confused constantly. Latency is how long one operation takes (a single request in 50 ms). Throughput is how many operations complete per second (10,000 requests/sec). They are related but independent: a system can be low-latency and low-throughput, or high-throughput with high latency. You optimize them with different techniques.', 'দুটি শব্দ অবিরত গুলিয়ে যায়। Latency হলো একটি অপারেশনে কত সময় লাগে (একটি রিকোয়েস্ট ৫০ ms-এ)। Throughput হলো প্রতি সেকেন্ডে কতগুলো অপারেশন শেষ হয় (১০,০০০ রিকোয়েস্ট/সেকেন্ড)। এরা সম্পর্কিত তবু স্বাধীন: একটি সিস্টেম কম-latency ও কম-throughput হতে পারে, বা উচ্চ-throughput ও উচ্চ-latency। এদের ভিন্ন কৌশলে অপটিমাইজ করেন।') },
        { note: l('A highway analogy: latency is how long your car takes to drive the route; throughput is how many cars per hour the road carries. Adding lanes (throughput) does not make your single drive faster (latency).', 'মহাসড়ক উপমা: latency হলো আপনার গাড়ির পথ চালাতে কত সময়; throughput হলো ঘণ্টায় রাস্তা কত গাড়ি বহন করে। লেন যোগ করলে (throughput) আপনার একটি যাত্রা দ্রুত হয় না (latency)।'), kind: 'tip' },
      ],
    },
    {
      h: l('Latency numbers you should feel', 'যে latency সংখ্যা অনুভব করা উচিত'),
      blocks: [
        { p: l('Good design comes from an intuition for how slow each layer is relative to the others. Each step down this table is roughly 1,000× slower.', 'ভালো ডিজাইন আসে প্রতিটি স্তর অন্যদের তুলনায় কতটা ধীর তার অন্তর্দৃষ্টি থেকে। এই টেবিলে প্রতিটি ধাপ প্রায় ১,০০০× ধীর।') },
        { table: {
          head: [l('Operation', 'অপারেশন'), l('Approx latency', 'আনুমানিক latency')],
          rows: [
            [l('Read from RAM', 'RAM থেকে পড়া'), l('~100 nanoseconds', '~১০০ ন্যানোসেকেন্ড')],
            [l('Read from SSD', 'SSD থেকে পড়া'), l('~100 microseconds', '~১০০ মাইক্রোসেকেন্ড')],
            [l('Same-datacenter round trip', 'একই ডেটাসেন্টার round trip'), l('~0.5 milliseconds', '~০.৫ মিলিসেকেন্ড')],
            [l('Read from spinning disk', 'ঘূর্ণায়মান ডিস্ক থেকে পড়া'), l('~10 milliseconds', '~১০ মিলিসেকেন্ড')],
            [l('Cross-continent round trip', 'মহাদেশ-জুড়ে round trip'), l('~100+ milliseconds', '~১০০+ মিলিসেকেন্ড')],
          ],
        } },
      ],
    },
    {
      h: l('Tail latency: why averages lie', 'tail latency: কেন গড় মিথ্যা বলে'),
      blocks: [
        { p: l('Never trust the average response time. A p50 (median) of 20 ms sounds great, but if the p99 is 2 seconds, then 1 in 100 requests is painfully slow — and a page that makes 100 calls will almost always hit at least one of them. That is why teams track percentiles: p50, p95, p99, and even p999.', 'গড় রেসপন্স সময়ে কখনো ভরসা করবেন না। ২০ ms-এর p50 (মধ্যক) দারুণ শোনায়, কিন্তু p99 যদি ২ সেকেন্ড হয়, তবে প্রতি ১০০টির ১টি রিকোয়েস্ট যন্ত্রণাদায়ক ধীর—আর ১০০টি কল করা একটি পেজ প্রায় সবসময় অন্তত একটিতে পড়বে। এ কারণেই টিম percentile ট্র্যাক করে: p50, p95, p99, এমনকি p999।') },
        { p: l('Tail latency matters because real users experience the slowest calls, not the average one. Optimizing the p99 (timeouts, retries, removing slow dependencies) often matters more than shaving the median.', 'Tail latency গুরুত্বপূর্ণ কারণ বাস্তব ব্যবহারকারী গড় নয়, সবচেয়ে ধীর কল অনুভব করে। p99 অপটিমাইজ (টাইমআউট, রিট্রাই, ধীর নির্ভরতা সরানো) প্রায়ই মধ্যক কমানোর চেয়ে বেশি গুরুত্বপূর্ণ।') },
      ],
    },
    {
      h: l('How to cut latency', 'latency কীভাবে কমাবেন'),
      blocks: [
        { list: [
          l('Cache hot data in memory so you skip the slow database or disk.', 'হট ডেটা মেমরিতে ক্যাশ করুন যাতে ধীর ডেটাবেস বা ডিস্ক এড়ান।'),
          l('Move data closer to users with a CDN or regional replicas — distance is latency.', 'CDN বা আঞ্চলিক রেপ্লিকা দিয়ে ডেটা ব্যবহারকারীর কাছে আনুন—দূরত্বই latency।'),
          l('Reduce round trips: batch requests, use connection keep-alive, and denormalize so one query answers a page.', 'round trip কমান: রিকোয়েস্ট ব্যাচ করুন, keep-alive ব্যবহার করুন, ও denormalize করুন যাতে এক কুয়েরি একটি পেজ দেয়।'),
          l('Add an index so a database query does not scan the whole table.', 'একটি index যোগ করুন যাতে ডেটাবেস কুয়েরি পুরো টেবিল স্ক্যান না করে।'),
          l('Do slow work asynchronously with a queue, so the user’s request returns immediately.', 'ধীর কাজ একটি কিউ দিয়ে অ্যাসিঙ্ক করুন, যাতে ব্যবহারকারীর রিকোয়েস্ট সঙ্গে সঙ্গে ফেরে।'),
        ] },
      ],
    },
    {
      h: l('The trade-offs', 'ট্রেড-অফ'),
      blocks: [
        { p: l('Speed is never free. Caching trades freshness for latency. Denormalizing trades write complexity and storage for read speed. Adding replicas closer to users trades cost and consistency for lower latency. Always know which you are trading — the "fastest" design is usually the most expensive and the hardest to keep consistent.', 'গতি কখনো বিনামূল্যে নয়। ক্যাশিং latency-র জন্য টাটকাত্ব ছাড়ে। Denormalize পড়ার গতির জন্য লেখার জটিলতা ও স্টোরেজ ছাড়ে। ব্যবহারকারীর কাছে রেপ্লিকা কম latency-র জন্য খরচ ও consistency ছাড়ে। সবসময় জানুন কী ছাড়ছেন—"দ্রুততম" ডিজাইন সাধারণত সবচেয়ে ব্যয়বহুল ও consistent রাখা কঠিন।') },
      ],
    },
    {
      h: l('Remember in one line', 'এক লাইনে মনে রাখুন'),
      blocks: [
        { list: [
          l('Latency = time for one operation; throughput = operations per second. Different problems, different fixes.', 'Latency = একটি অপারেশনের সময়; throughput = প্রতি সেকেন্ডে অপারেশন। ভিন্ন সমস্যা, ভিন্ন সমাধান।'),
          l('Track the p99, not the average — real users feel the tail.', 'গড় নয়, p99 ট্র্যাক করুন—বাস্তব ব্যবহারকারী লেজ অনুভব করে।'),
          l('Cut latency by caching, moving data closer, fewer round trips, indexes, and async work — each with a trade-off.', 'ক্যাশিং, ডেটা কাছে আনা, কম round trip, index ও অ্যাসিঙ্ক কাজ দিয়ে latency কমান—প্রতিটির একটি ট্রেড-অফ।'),
        ] },
      ],
    },
  ],

  'reliability': [
    {
      h: l('What reliability really means', 'নির্ভরযোগ্যতা আসলে কী'),
      blocks: [
        { p: l('Reliability is the promise that your system keeps working correctly, even when things go wrong. Its most-quoted measure is availability — the percentage of time the system is up and serving. Because at scale something is always failing (a disk, a server, a network link), reliability is not about preventing failure; it is about surviving it without the user noticing.', 'নির্ভরযোগ্যতা হলো এই প্রতিশ্রুতি যে জিনিস ভুল হলেও আপনার সিস্টেম সঠিকভাবে কাজ করতে থাকে। এর সবচেয়ে উদ্ধৃত পরিমাপ availability—সিস্টেম যত শতাংশ সময় সচল ও পরিবেশনরত। স্কেলে সবসময় কিছু না কিছু ব্যর্থ হয় (একটি ডিস্ক, সার্ভার, নেটওয়ার্ক লিংক) বলে নির্ভরযোগ্যতা ব্যর্থতা ঠেকানো নয়; ব্যবহারকারী টের না পেয়ে তা থেকে টিকে থাকা।') },
      ],
    },
    {
      h: l('The "nines" of availability', 'availability-র "নাইনস"'),
      blocks: [
        { p: l('Availability is written as a number of nines, and each extra nine is roughly 10× harder and more expensive. Know what they mean in real downtime.', 'Availability লেখা হয় কয়টি নাইন দিয়ে, ও প্রতিটি বাড়তি নাইন প্রায় ১০× কঠিন ও ব্যয়বহুল। বাস্তব ডাউনটাইমে এদের অর্থ জানুন।') },
        { table: {
          head: [l('Availability', 'availability'), l('Downtime per year', 'বছরে ডাউনটাইম')],
          rows: [
            [l('99% (two nines)', '৯৯% (দুই নাইন)'), l('~3.65 days', '~৩.৬৫ দিন')],
            [l('99.9% (three nines)', '৯৯.৯% (তিন নাইন)'), l('~8.7 hours', '~৮.৭ ঘণ্টা')],
            [l('99.99% (four nines)', '৯৯.৯৯% (চার নাইন)'), l('~52 minutes', '~৫২ মিনিট')],
            [l('99.999% (five nines)', '৯৯.৯৯৯% (পাঁচ নাইন)'), l('~5 minutes', '~৫ মিনিট')],
          ],
        } },
      ],
    },
    {
      h: l('Design assuming everything fails', 'ধরে নিন সবকিছু ব্যর্থ হবে'),
      blocks: [
        { p: l('The core principle of reliability is to remove single points of failure. If any one server, disk, or data center going down can take the whole system with it, you are not reliable. The fix is redundancy: run multiple copies of every critical component so that losing one changes nothing for the user.', 'নির্ভরযোগ্যতার মূল নীতি হলো একক ব্যর্থতা-বিন্দু সরানো। যদি কোনো একটি সার্ভার, ডিস্ক বা ডেটা সেন্টার পড়ে পুরো সিস্টেম নিয়ে যেতে পারে, আপনি নির্ভরযোগ্য নন। সমাধান redundancy: প্রতিটি সংকটপূর্ণ উপাদানের একাধিক কপি চালান যাতে একটি হারালে ব্যবহারকারীর কিছু না বদলায়।') },
        { list: [
          l('Run several app servers behind a load balancer, so one crash just reduces capacity.', 'একটি লোড ব্যালান্সারের পেছনে কয়েকটি অ্যাপ সার্ভার চালান, যাতে একটি ক্র্যাশ শুধু ক্ষমতা কমায়।'),
          l('Replicate the database so a copy can take over if the primary dies.', 'ডেটাবেস রেপ্লিকেট করুন যাতে primary মরলে একটি কপি দায়িত্ব নেয়।'),
          l('Spread across availability zones or regions so one data-center outage is survivable.', 'availability zone বা region-জুড়ে ছড়ান যাতে একটি ডেটা-সেন্টার আউটেজ টিকিয়ে রাখা যায়।'),
        ] },
      ],
    },
    {
      h: l('Detecting and handling failure', 'ব্যর্থতা শনাক্ত ও সামলানো'),
      blocks: [
        { p: l('Redundancy only helps if the system notices a failure and routes around it automatically.', 'Redundancy তখনই কাজে লাগে যখন সিস্টেম একটি ব্যর্থতা লক্ষ করে ও স্বয়ংক্রিয়ভাবে তা এড়িয়ে রাউট করে।') },
        { list: [
          l('Health checks — the load balancer stops sending traffic to an unhealthy server.', 'হেলথ চেক—লোড ব্যালান্সার অসুস্থ সার্ভারে ট্রাফিক পাঠানো বন্ধ করে।'),
          l('Failover — a standby replica is promoted when the primary fails.', 'ফেলওভার—primary ব্যর্থ হলে একটি স্ট্যান্ডবাই রেপ্লিকা প্রমোট হয়।'),
          l('Timeouts and retries — do not wait forever on a slow dependency; retry briefly, then give up gracefully.', 'টাইমআউট ও রিট্রাই—ধীর নির্ভরতায় চিরকাল অপেক্ষা নয়; একটু রিট্রাই, তারপর সুন্দরভাবে ছাড়ুন।'),
          l('Circuit breakers — stop calling a failing service for a while so it can recover and you do not pile on.', 'সার্কিট ব্রেকার—ব্যর্থ সার্ভিসে কিছুক্ষণ কল থামান যাতে এটি সেরে ওঠে ও আপনি চাপ না বাড়ান।'),
        ] },
      ],
    },
    {
      h: l('Availability vs consistency', 'availability বনাম consistency'),
      blocks: [
        { p: l('Reliability has a famous tension with consistency. When a network splits, a system must choose: keep serving with possibly-stale data (stay available), or refuse to answer to avoid being wrong (stay consistent). This is the CAP theorem, and the right choice depends on the product — a bank favours consistency, a social feed favours availability.', 'নির্ভরযোগ্যতার সঙ্গে consistency-র একটি বিখ্যাত টানাপোড়েন আছে। নেটওয়ার্ক ভাগ হলে সিস্টেমকে বাছতে হয়: সম্ভবত-পুরনো ডেটা দিয়ে পরিবেশন চালিয়ে যাওয়া (available থাকা), নাকি ভুল এড়াতে উত্তর না দেওয়া (consistent থাকা)। এটি CAP থিওরেম, ও সঠিক পছন্দ পণ্যের ওপর নির্ভর করে—ব্যাংক consistency, সোশ্যাল ফিড availability পছন্দ করে।') },
      ],
    },
    {
      h: l('SLA, SLO, and SLI', 'SLA, SLO ও SLI'),
      blocks: [
        { table: {
          head: [l('Term', 'শব্দ'), l('Meaning', 'অর্থ')],
          rows: [
            [l('SLI', 'SLI'), l('Indicator — the actual measured number (e.g., 99.95% of requests succeeded).', 'সূচক—আসল মাপা সংখ্যা (যেমন ৯৯.৯৫% রিকোয়েস্ট সফল)।')],
            [l('SLO', 'SLO'), l('Objective — the internal target you aim for (e.g., 99.9% availability).', 'লক্ষ্য—আপনার অভ্যন্তরীণ লক্ষ্য (যেমন ৯৯.৯% availability)।')],
            [l('SLA', 'SLA'), l('Agreement — the promise to customers, with penalties if you miss it.', 'চুক্তি—গ্রাহকের কাছে প্রতিশ্রুতি, মিস করলে জরিমানাসহ।')],
          ],
        } },
      ],
    },
    {
      h: l('Remember in one line', 'এক লাইনে মনে রাখুন'),
      blocks: [
        { list: [
          l('Reliability = staying correct and available while things fail; measured in nines of availability.', 'নির্ভরযোগ্যতা = জিনিস ব্যর্থ হওয়ার সময়ও সঠিক ও available থাকা; availability-র নাইনসে মাপা।'),
          l('Remove single points of failure with redundancy, then detect and route around failures automatically.', 'redundancy দিয়ে একক ব্যর্থতা-বিন্দু সরান, তারপর স্বয়ংক্রিয়ভাবে ব্যর্থতা শনাক্ত ও এড়িয়ে রাউট করুন।'),
          l('Each extra nine is ~10× harder; and under a network split you trade consistency for availability.', 'প্রতিটি বাড়তি নাইন ~১০× কঠিন; আর নেটওয়ার্ক স্প্লিটে consistency-র বিনিময়ে availability নেন।'),
        ] },
      ],
    },
  ],
}
