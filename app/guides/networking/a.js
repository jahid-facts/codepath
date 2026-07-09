// Deep, bilingual (English / Bangla) teaching guides for Networking foundations
// and the link layer. Shape mirrors app/course-guides.js and app/guides/dsa/a.js:
// each guide is an array of sections { h, blocks }, rendered by GuideBlock in
// app/LearningApp.js. Facts (definitions, analogies, trade-offs) are drawn from
// the rawTopics rows and reference tables in app/courses/networking.js.

const l = (en, bn) => ({ en, bn })

export default {
  // ── cn-what · What is a computer network? ─────────────────────────────────
  'cn-what': [
    {
      h: l('What is a computer network?', 'কম্পিউটার নেটওয়ার্ক কী?'),
      blocks: [
        { p: l('A computer network is two or more devices connected together so they can exchange data using a shared set of rules called protocols. Those devices — laptops, phones, servers, routers, even a smart bulb — are called hosts or nodes. The moment they can pass messages to one another over some medium (a cable, fibre, or radio waves), you have a network. The internet is simply the largest network of networks: billions of devices that all agree to speak the same core protocols.', 'কম্পিউটার নেটওয়ার্ক হলো দুই বা তার বেশি ডিভাইস একসঙ্গে যুক্ত, যাতে তারা protocol নামের সাধারণ নিয়ম দিয়ে ডেটা বিনিময় করতে পারে। এই ডিভাইসগুলো—ল্যাপটপ, ফোন, সার্ভার, router, এমনকি একটি স্মার্ট বাল্ব—কে host বা node বলে। যখনই এরা কোনো মাধ্যমে (কেবল, fibre বা রেডিও তরঙ্গ) একে অপরকে বার্তা পাঠাতে পারে, তখনই একটি নেটওয়ার্ক তৈরি হয়। ইন্টারনেট হলো কেবল নেটওয়ার্কের সবচেয়ে বড় নেটওয়ার্ক: শত কোটি ডিভাইস যারা একই মূল protocol-এ কথা বলতে রাজি।') },
        { p: l('The problem a network solves is that a single computer, however powerful, is an island. On its own it cannot fetch a web page, send a message, stream a video, or read a shared database. Networking is what lets distant machines cooperate: your phone in Dhaka can ask a server in Virginia for data and get an answer seconds later. But that cooperation is never free — every step between the two machines, called a hop, adds a little delay and one more place where data can be lost, delayed, or attacked.', 'নেটওয়ার্ক যে সমস্যা সমাধান করে তা হলো একটি একক কম্পিউটার, যত শক্তিশালীই হোক, একটি দ্বীপের মতো। একা এটি একটি web page আনতে, বার্তা পাঠাতে, ভিডিও stream করতে বা একটি shared database পড়তে পারে না। নেটওয়ার্কিং দূরের মেশিনগুলোকে সহযোগিতা করতে দেয়: ঢাকার আপনার ফোন Virginia-র একটি সার্ভারের কাছে ডেটা চাইতে পারে ও কয়েক সেকেন্ড পরে উত্তর পায়। তবে সেই সহযোগিতা কখনো বিনামূল্যে নয়—দুই মেশিনের মধ্যকার প্রতিটি ধাপ, যাকে hop বলে, একটু বিলম্ব এবং ডেটা হারানো, দেরি বা আক্রমণের আরও একটি সুযোগ যোগ করে।') },
        { note: l('A network is like a postal system. Addresses tell you where things go, envelopes hold the contents, and agreed delivery rules let anyone send a letter to anyone else — even people who have never met. Nobody has to know the whole route; each post office just has to know the next step. Networks work the same way.', 'একটি নেটওয়ার্ক একটি ডাক ব্যবস্থার মতো। ঠিকানা বলে জিনিস কোথায় যাবে, খাম ভেতরের জিনিস ধরে রাখে, আর সম্মত ডেলিভারি নিয়ম যে কাউকে যে কারো কাছে চিঠি পাঠাতে দেয়—এমনকি যারা কখনো দেখা করেনি। কারো পুরো পথ জানার দরকার নেই; প্রতিটি ডাকঘর শুধু পরের ধাপটি জানলেই হয়। নেটওয়ার্কও একইভাবে কাজ করে।'), kind: 'tip' },
      ],
    },
    {
      h: l('How data moves across a network', 'ডেটা নেটওয়ার্কে কীভাবে চলে'),
      blocks: [
        { p: l('Data does not travel as one big stream. It is chopped into small units called packets, each carrying a piece of the message plus addressing information, and each packet is forwarded hop by hop until it reaches the destination.', 'ডেটা একটি বড় ধারা হিসেবে যায় না। এটিকে packet নামের ছোট অংশে কাটা হয়, প্রতিটি বার্তার একটি টুকরা এবং ঠিকানার তথ্য বহন করে, আর প্রতিটি packet hop-by-hop এগিয়ে যায় যতক্ষণ না গন্তব্যে পৌঁছায়।') },
        { steps: [
          l('Your device splits the message into packets and labels each with a source and destination address.', 'আপনার ডিভাইস বার্তাকে packet-এ ভাগ করে এবং প্রতিটিতে একটি source ও destination ঠিকানা লাগায়।'),
          l('The packet leaves your device and reaches the first hop — usually your home router or Wi-Fi access point.', 'packet আপনার ডিভাইস ছেড়ে প্রথম hop-এ পৌঁছায়—সাধারণত আপনার বাড়ির router বা Wi-Fi access point।'),
          l('Each router along the way reads the destination address and forwards the packet one step closer, choosing the next hop.', 'পথের প্রতিটি router destination ঠিকানা পড়ে এবং packet-টিকে এক ধাপ কাছে পাঠায়, পরের hop বেছে নেয়।'),
          l('Packets may take different routes and arrive out of order; the destination reassembles them into the original message.', 'packet ভিন্ন পথে যেতে পারে ও ক্রমের বাইরে পৌঁছাতে পারে; গন্তব্য এগুলো মূল বার্তায় পুনর্গঠন করে।'),
          l('The receiver sends back a reply the same way, which is why we talk about a round trip, not a one-way trip.', 'গ্রাহক একই পথে একটি উত্তর ফেরত পাঠায়, এ কারণেই আমরা এক-মুখী নয়, round trip নিয়ে কথা বলি।'),
        ] },
        { code: `$ ping -c 3 example.com
PING example.com (93.184.216.34): 56 data bytes
64 bytes from 93.184.216.34: icmp_seq=0 ttl=56 time=2.41 ms
64 bytes from 93.184.216.34: icmp_seq=1 ttl=56 time=2.38 ms
64 bytes from 93.184.216.34: icmp_seq=2 ttl=56 time=2.55 ms

--- example.com ping statistics ---
3 packets transmitted, 3 packets received, 0.0% packet loss
round-trip min/avg/max = 2.38/2.44/2.55 ms`, caption: l('ping sends a few tiny packets and waits for them to come back. It proves the two machines can reach each other and shows the round-trip time — the most basic measurement of a network.', 'ping কয়েকটি ছোট packet পাঠায় ও ফেরত আসার অপেক্ষা করে। এটি প্রমাণ করে দুই মেশিন একে অপরের কাছে পৌঁছাতে পারে এবং round-trip time দেখায়—একটি নেটওয়ার্কের সবচেয়ে মৌলিক পরিমাপ।') },
      ],
    },
    {
      h: l('The pieces every network has', 'প্রতিটি নেটওয়ার্কে যা যা থাকে'),
      blocks: [
        { p: l('Almost every network, from your home Wi-Fi to the global internet, is built from the same handful of pieces. Knowing their names lets you describe exactly what is happening.', 'প্রায় প্রতিটি নেটওয়ার্ক, আপনার বাড়ির Wi-Fi থেকে গ্লোবাল ইন্টারনেট পর্যন্ত, একই কয়েকটি অংশ দিয়ে তৈরি। এদের নাম জানলে আপনি ঠিক কী ঘটছে তা বর্ণনা করতে পারবেন।') },
        { table: {
          head: [l('Piece', 'অংশ'), l('What it does', 'কাজ')],
          rows: [
            [l('Host / node', 'host / node'), l('Any device that sends or receives data — a phone, laptop, or server.', 'যেকোনো ডিভাইস যা ডেটা পাঠায় বা গ্রহণ করে—ফোন, ল্যাপটপ বা সার্ভার।')],
            [l('Medium / link', 'মাধ্যম / link'), l('The physical path the bits travel on: copper cable, fibre, or radio.', 'যে ভৌত পথে bit চলে: কপার কেবল, fibre বা রেডিও।')],
            [l('Protocol', 'protocol'), l('The agreed rules for how two parties format and exchange messages.', 'দুই পক্ষ কীভাবে বার্তা সাজায় ও বিনিময় করে তার সম্মত নিয়ম।')],
            [l('Address', 'ঠিকানা'), l('A label that identifies a device so packets can find it (IP, MAC).', 'একটি লেবেল যা ডিভাইস চেনায় যাতে packet তা খুঁজে পায় (IP, MAC)।')],
            [l('Switch / router', 'switch / router'), l('Devices that forward packets toward their destination.', 'যে ডিভাইস packet-কে গন্তব্যের দিকে এগিয়ে দেয়।')],
            [l('Packet', 'packet'), l('The small, self-describing unit that data is chopped into for delivery.', 'ছোট, স্ব-বর্ণনামূলক একক যাতে ডেটাকে ডেলিভারির জন্য কাটা হয়।')],
          ],
        } },
      ],
    },
    {
      h: l('Types of networks by size', 'আকার অনুযায়ী নেটওয়ার্কের ধরন'),
      blocks: [
        { p: l('Networks are often named by how much ground they cover. The same ideas apply at every size; only the distance and the number of devices change.', 'নেটওয়ার্ককে প্রায়ই তারা কতটা এলাকা ঢাকে তা দিয়ে নাম দেওয়া হয়। একই ধারণা প্রতিটি আকারে প্রযোজ্য; শুধু দূরত্ব ও ডিভাইসের সংখ্যা বদলায়।') },
        { list: [
          l('LAN (Local Area Network) — one home, office, or building, usually connected by a switch and Wi-Fi.', 'LAN (Local Area Network)—একটি বাড়ি, অফিস বা ভবন, সাধারণত switch ও Wi-Fi দিয়ে যুক্ত।'),
          l('WAN (Wide Area Network) — links LANs across cities or countries; the internet is the biggest WAN.', 'WAN (Wide Area Network)—শহর বা দেশজুড়ে LAN যুক্ত করে; ইন্টারনেট সবচেয়ে বড় WAN।'),
          l('The internet — a global WAN of networks, tied together by routers all speaking the IP protocol.', 'ইন্টারনেট—নেটওয়ার্কের একটি গ্লোবাল WAN, IP protocol-এ কথা বলা router দিয়ে একসঙ্গে বাঁধা।'),
        ] },
      ],
    },
    {
      h: l('When and where this matters', 'কখন ও কোথায় এটি গুরুত্বপূর্ণ'),
      blocks: [
        { p: l('Anytime your code talks to something not on the same machine — an API, a database, a payment provider, another microservice — a network sits in the middle. The most useful habit is to stop treating the network as invisible and instant, and instead ask: who is talking to whom, over what medium, and using which protocol at each step? That single question turns a mysterious "it is slow" or "it failed" into a specific hop you can actually investigate.', 'যখনই আপনার কোড একই মেশিনে না থাকা কিছুর সঙ্গে কথা বলে—একটি API, একটি database, একটি payment provider, আরেকটি microservice—তখন মাঝখানে একটি নেটওয়ার্ক থাকে। সবচেয়ে দরকারি অভ্যাস হলো নেটওয়ার্ককে অদৃশ্য ও তাৎক্ষণিক ভাবা বন্ধ করে বরং জিজ্ঞাসা করা: কে কার সঙ্গে, কোন মাধ্যমে, প্রতি ধাপে কোন protocol দিয়ে কথা বলে? এই একটি প্রশ্ন রহস্যময় "এটি ধীর" বা "এটি ব্যর্থ হলো"-কে একটি নির্দিষ্ট hop-এ পরিণত করে যা আপনি আসলে তদন্ত করতে পারেন।') },
        { note: l('Never assume the network is reliable, fast, or secure by default. Packets can be dropped, delayed, duplicated, or read by others. Good networked software plans for latency, timeouts, and failure — it does not act surprised when they happen.', 'নেটওয়ার্ক ডিফল্টভাবে নির্ভরযোগ্য, দ্রুত বা নিরাপদ ধরে নেবেন না। packet drop হতে, দেরি হতে, ডুপ্লিকেট হতে বা অন্যরা পড়তে পারে। ভালো নেটওয়ার্কড সফটওয়্যার latency, timeout ও ব্যর্থতার জন্য পরিকল্পনা করে—এগুলো ঘটলে অবাক হয় না।'), kind: 'warn' },
      ],
    },
    {
      h: l('Common mistakes', 'সাধারণ ভুল'),
      blocks: [
        { list: [
          l('Assuming the network is invisible and instant, then being surprised by latency, timeouts, and dropped connections in production.', 'নেটওয়ার্ককে অদৃশ্য ও তাৎক্ষণিক ধরে নেওয়া, তারপর production-এ latency, timeout ও drop হওয়া সংযোগে অবাক হওয়া।'),
          l('Treating every remote call as if it always succeeds, with no timeout or retry, so one slow hop freezes the whole app.', 'প্রতিটি remote call সবসময় সফল হয় ধরে নেওয়া, timeout বা retry ছাড়া, ফলে একটি ধীর hop পুরো অ্যাপ জমিয়ে দেয়।'),
          l('Confusing "connected" with "trusted" — being on a network says nothing about whether the other side is who it claims to be.', '"সংযুক্ত"-কে "বিশ্বস্ত" ভাবা—একটি নেটওয়ার্কে থাকা মানে এই নয় যে অন্য পাশ সে যা দাবি করে তাই।'),
          l('Debugging by guessing instead of following the path hop by hop with tools like ping and traceroute.', 'ping ও traceroute-এর মতো টুল দিয়ে hop-by-hop পথ অনুসরণ না করে অনুমানে ডিবাগ করা।'),
        ] },
      ],
    },
    {
      h: l('Remember in one line', 'এক লাইনে মনে রাখুন'),
      blocks: [
        { list: [
          l('A network is devices exchanging data by shared rules (protocols); the internet is the network of networks.', 'নেটওয়ার্ক হলো shared নিয়মে (protocol) ডেটা বিনিময় করা ডিভাইস; ইন্টারনেট হলো নেটওয়ার্কের নেটওয়ার্ক।'),
          l('Data travels as packets forwarded hop by hop, each hop adding latency and a chance of loss.', 'ডেটা packet হিসেবে hop-by-hop এগিয়ে যায়, প্রতিটি hop latency ও হারানোর সুযোগ যোগ করে।'),
          l('Think about who talks to whom, over what medium, using which protocol — and never assume the network is free or safe.', 'ভাবুন কে কার সঙ্গে, কোন মাধ্যমে, কোন protocol দিয়ে কথা বলে—আর কখনো ধরে নেবেন না নেটওয়ার্ক বিনামূল্যে বা নিরাপদ।'),
        ] },
      ],
    },
  ],

  // ── cn-layers · The OSI & TCP/IP models ───────────────────────────────────
  'cn-layers': [
    {
      h: l('What are the OSI & TCP/IP models?', 'OSI ও TCP/IP মডেল কী?'),
      blocks: [
        { p: l('Networking is far too complex to build as one giant program, so it is split into layers, each with a single, well-defined job. The OSI (Open Systems Interconnection) model describes 7 layers; the TCP/IP model, which the real internet actually runs on, groups the same work into 4. A key rule holds in both: each layer talks only to the layers directly next to it, and it does not need to know the details of the layers far above or below.', 'নেটওয়ার্কিং একটি বিশাল প্রোগ্রাম হিসেবে বানানোর মতো অত্যন্ত জটিল, তাই এটিকে স্তরে ভাগ করা হয়, প্রতিটির একটি সুনির্দিষ্ট কাজ। OSI (Open Systems Interconnection) মডেল ৭টি স্তর বর্ণনা করে; TCP/IP মডেল, যাতে বাস্তব ইন্টারনেট আসলে চলে, একই কাজকে ৪টিতে দলবদ্ধ করে। দুটিতেই একটি মূল নিয়ম: প্রতিটি স্তর শুধু তার ঠিক পাশের স্তরের সঙ্গে কথা বলে, আর অনেক ওপরের বা নিচের স্তরের বিস্তারিত জানার দরকার নেই।') },
        { p: l('The problem layering solves is complexity and change. By giving each layer one responsibility, any layer can be swapped without rewriting the others: Wi-Fi can replace Ethernet at the bottom, and HTTP can replace nothing at the top, yet everything in between keeps working. Layers also give engineers a shared vocabulary — instead of saying "the internet broke," you can pinpoint whether a problem lives at the application, transport, network, or link layer.', 'লেয়ারিং যে সমস্যা সমাধান করে তা হলো জটিলতা ও পরিবর্তন। প্রতিটি স্তরকে একটি দায়িত্ব দিয়ে, যেকোনো স্তর অন্যগুলো নতুন করে না লিখেই বদলানো যায়: নিচে Ethernet-এর জায়গায় Wi-Fi আসতে পারে, আর মাঝের সব কিছু কাজ করতেই থাকে। স্তর প্রকৌশলীদের একটি সাধারণ ভাষাও দেয়—"ইন্টারনেট ভেঙেছে" না বলে আপনি বলতে পারেন সমস্যাটি application, transport, network নাকি link স্তরে।') },
        { note: l('Think of a shipping company. Sales takes the order, packing boxes it up, trucking drives it, and the roads carry the truck. Each team does one job and hands off to the next without knowing the others details — sales does not care which road the truck takes. Network layers hand off the same way.', 'একটি শিপিং কোম্পানি ভাবুন। বিক্রয় অর্ডার নেয়, প্যাকিং বাক্সে ভরে, ট্রাকিং চালায়, আর রাস্তা ট্রাক বহন করে। প্রতিটি দল একটি কাজ করে ও পরের দলকে হস্তান্তর করে অন্যদের বিস্তারিত না জেনে—বিক্রয় ভাবে না ট্রাক কোন রাস্তা নেয়। নেটওয়ার্ক স্তর একইভাবে হস্তান্তর করে।'), kind: 'tip' },
      ],
    },
    {
      h: l('Why split networking into layers', 'নেটওয়ার্কিং কেন স্তরে ভাগ করা'),
      blocks: [
        { p: l('Splitting one enormous task into small, single-purpose layers is a classic engineering move, and it pays off in four concrete ways that you will feel every time you build or debug a networked system.', 'একটি বিশাল কাজকে ছোট, একক-উদ্দেশ্য স্তরে ভাগ করা একটি ক্লাসিক প্রকৌশল কৌশল, আর এটি চারটি সুনির্দিষ্ট উপায়ে ফল দেয় যা আপনি প্রতিবার একটি নেটওয়ার্কড সিস্টেম বানানো বা ডিবাগ করার সময় টের পাবেন।') },
        { list: [
          l('Simplicity — each layer solves one problem, so it is easier to build, test, and understand.', 'সরলতা—প্রতিটি স্তর একটি সমস্যা সমাধান করে, তাই বানানো, পরীক্ষা ও বোঝা সহজ।'),
          l('Swappability — you can change one layer (Wi-Fi for Ethernet) without touching the others.', 'বদলযোগ্যতা—আপনি একটি স্তর বদলাতে পারেন (Ethernet-এর জায়গায় Wi-Fi) অন্যগুলো না ছুঁয়ে।'),
          l('Shared language — engineers worldwide describe a protocol, device, or bug by its layer.', 'সাধারণ ভাষা—বিশ্বজুড়ে প্রকৌশলীরা একটি protocol, ডিভাইস বা bug-কে তার স্তর দিয়ে বর্ণনা করে।'),
          l('Faster troubleshooting — knowing the layer tells you where to look: a Layer 3 routing issue is not a Layer 7 application bug.', 'দ্রুত সমস্যা সমাধান—স্তর জানলে কোথায় দেখতে হবে তা বোঝা যায়: একটি Layer 3 routing সমস্যা Layer 7 application bug নয়।'),
        ] },
      ],
    },
    {
      h: l('The layers side by side', 'স্তরগুলো পাশাপাশি'),
      blocks: [
        { p: l('Here are the OSI layers from top (closest to the user) to bottom (closest to the wire), with the job of each and an example protocol. This is the reference to memorise.', 'এখানে OSI স্তরগুলো ওপর (ব্যবহারকারীর সবচেয়ে কাছে) থেকে নিচ (তারের সবচেয়ে কাছে) পর্যন্ত, প্রতিটির কাজ ও একটি উদাহরণ protocol সহ। এটাই মুখস্থ করার reference।') },
        { table: {
          head: [l('Layer', 'স্তর'), l('Its job', 'কাজ'), l('Example', 'উদাহরণ')],
          rows: [
            [l('7 · Application', '৭ · Application'), l('What apps and users interact with directly.', 'অ্যাপ ও ব্যবহারকারী সরাসরি যার সঙ্গে কাজ করে।'), l('HTTP, DNS, SMTP', 'HTTP, DNS, SMTP')],
            [l('4 · Transport', '৪ · Transport'), l('End-to-end delivery between apps using ports; reliability.', 'port দিয়ে অ্যাপের মধ্যে end-to-end ডেলিভারি; নির্ভরযোগ্যতা।'), l('TCP, UDP', 'TCP, UDP')],
            [l('3 · Network', '৩ · Network'), l('Addressing and routing between different networks.', 'ভিন্ন নেটওয়ার্কের মধ্যে ঠিকানা ও routing।'), l('IP, ICMP', 'IP, ICMP')],
            [l('2 · Data link', '২ · Data link'), l('Delivery within one local network via MAC addresses.', 'MAC ঠিকানা দিয়ে এক লোকাল নেটওয়ার্কের ভেতরে ডেলিভারি।'), l('Ethernet, Wi-Fi', 'Ethernet, Wi-Fi')],
            [l('1 · Physical', '১ · Physical'), l('Raw bits as electrical, optical, or radio signals.', 'বৈদ্যুতিক, অপটিক্যাল বা রেডিও সংকেত হিসেবে কাঁচা bit।'), l('Cables, fibre, radio', 'কেবল, fibre, রেডিও')],
          ],
        } },
        { note: l('Layers 5 and 6 (Session and Presentation) exist in OSI too — they handle sessions and formatting/encryption like TLS — but on the real internet their work is usually folded into the application layer.', 'OSI-তে Layer 5 ও 6 (Session ও Presentation)-ও আছে—এরা session ও ফরম্যাটিং/এনক্রিপশন যেমন TLS সামলায়—তবে বাস্তব ইন্টারনেটে এদের কাজ সাধারণত application স্তরে মিশে যায়।'), kind: 'tip' },
      ],
    },
    {
      h: l('Mapping OSI to TCP/IP', 'OSI থেকে TCP/IP-তে মিলানো'),
      blocks: [
        { p: l('OSI is the teaching model with 7 layers. The internet actually runs on the leaner 4-layer TCP/IP model, which bundles several OSI layers together. Both describe the same reality.', 'OSI হলো ৭ স্তরের শিক্ষণ মডেল। ইন্টারনেট আসলে হালকা ৪-স্তরের TCP/IP মডেলে চলে, যা কয়েকটি OSI স্তরকে একত্র করে। দুটিই একই বাস্তবতা বর্ণনা করে।') },
        { table: {
          head: [l('OSI (7 layers)', 'OSI (৭ স্তর)'), l('TCP/IP (4 layers)', 'TCP/IP (৪ স্তর)')],
          rows: [
            [l('Application + Presentation + Session', 'Application + Presentation + Session'), l('Application', 'Application')],
            [l('Transport', 'Transport'), l('Transport', 'Transport')],
            [l('Network', 'Network'), l('Internet', 'Internet')],
            [l('Data link + Physical', 'Data link + Physical'), l('Link (Network Access)', 'Link (Network Access)')],
          ],
        } },
      ],
    },
    {
      h: l('Following one request through the layers', 'একটি request-কে স্তরের মধ্য দিয়ে অনুসরণ'),
      blocks: [
        { p: l('When you load a web page, each layer adds its own contribution on the way out and reads it on the way back. Running curl with the verbose flag lets you watch several layers do their jobs in order.', 'আপনি একটি web page লোড করলে, প্রতিটি স্তর যাওয়ার পথে নিজের অবদান যোগ করে ও ফেরার পথে তা পড়ে। curl-কে verbose flag দিয়ে চালালে আপনি কয়েকটি স্তরকে ক্রমে কাজ করতে দেখতে পারেন।') },
        { steps: [
          l('Application (L7): your browser forms an HTTP request — GET / with headers.', 'Application (L7): আপনার browser একটি HTTP request তৈরি করে—header সহ GET /।'),
          l('Transport (L4): TCP opens a connection to port 443 and splits the data into segments.', 'Transport (L4): TCP port 443-এ একটি সংযোগ খোলে ও ডেটাকে segment-এ ভাগ করে।'),
          l('Network (L3): IP wraps each segment with source and destination IP addresses.', 'Network (L3): IP প্রতিটি segment-কে source ও destination IP ঠিকানা দিয়ে মোড়ায়।'),
          l('Data link (L2): each packet becomes a frame addressed to the next hop by MAC.', 'Data link (L2): প্রতিটি packet পরের hop-এর MAC দিয়ে ঠিকানা করা একটি frame হয়।'),
          l('The server reverses the whole process, then replies the same way back down and up.', 'সার্ভার পুরো প্রক্রিয়া উল্টো করে, তারপর একই পথে নিচে-ওপরে উত্তর দেয়।'),
        ] },
        { code: `$ curl -v https://example.com
*   Trying 93.184.216.34:443...        # L3: destination IP (Network)
* Connected to example.com port 443    # L4: TCP connection (Transport)
* TLS handshake, TLSv1.3               # encryption before the app data
> GET / HTTP/1.1                        # L7: HTTP request (Application)
> Host: example.com
< HTTP/1.1 200 OK                       # L7: HTTP response
< Content-Type: text/html`, caption: l('One command touches several layers: the IP address is Layer 3, the port-443 TCP connection is Layer 4, and the GET / request and 200 OK are Layer 7.', 'একটি command কয়েকটি স্তর স্পর্শ করে: IP ঠিকানা Layer 3, port-443 TCP সংযোগ Layer 4, আর GET / request ও 200 OK Layer 7।') },
      ],
    },
    {
      h: l('Common mistakes', 'সাধারণ ভুল'),
      blocks: [
        { list: [
          l('Mixing up the layers — for example blaming HTTP (Layer 7) for a problem that is really a TCP or IP (Layer 4/3) failure.', 'স্তর গুলিয়ে ফেলা—যেমন TCP বা IP (Layer 4/3) ব্যর্থতার জন্য HTTP (Layer 7)-কে দোষ দেওয়া।'),
          l('Believing the internet runs on OSI. It runs on TCP/IP; OSI is a conceptual model for teaching and troubleshooting.', 'ভাবা যে ইন্টারনেট OSI-তে চলে। এটি TCP/IP-তে চলে; OSI শেখা ও সমস্যা সমাধানের একটি ধারণাগত মডেল।'),
          l('Thinking the layers are independent. Each layer depends on the one below it; a broken Layer 1 cable makes every layer above it useless.', 'ভাবা যে স্তরগুলো স্বাধীন। প্রতিটি স্তর নিচেরটির ওপর নির্ভর করে; একটি ভাঙা Layer 1 কেবল ওপরের সব স্তর অকেজো করে।'),
          l('Assuming a device lives on exactly one layer — a switch is Layer 2, but load balancers and firewalls act across several.', 'ধরে নেওয়া একটি ডিভাইস ঠিক একটি স্তরে থাকে—switch Layer 2, তবে load balancer ও firewall কয়েকটি স্তর জুড়ে কাজ করে।'),
        ] },
      ],
    },
    {
      h: l('Remember in one line', 'এক লাইনে মনে রাখুন'),
      blocks: [
        { list: [
          l('OSI has 7 layers, TCP/IP has 4; each layer has one job and talks only to its neighbours.', 'OSI-তে ৭টি স্তর, TCP/IP-তে ৪টি; প্রতিটি স্তরের একটি কাজ ও শুধু প্রতিবেশীর সঙ্গে কথা বলে।'),
          l('Map any protocol to its layer: HTTP = application, TCP = transport, IP = network, Ethernet = link.', 'যেকোনো protocol-কে তার স্তরে বসান: HTTP = application, TCP = transport, IP = network, Ethernet = link।'),
          l('Layering keeps parts simple and swappable and tells you which layer to debug — at the cost of a little overhead per packet.', 'লেয়ারিং অংশগুলো সরল ও বদলযোগ্য রাখে এবং কোন স্তর ডিবাগ করতে হবে বলে—প্রতি packet-এ একটু overhead-এর বিনিময়ে।'),
        ] },
      ],
    },
  ],

  // ── cn-encapsulation · Encapsulation & headers ────────────────────────────
  'cn-encapsulation': [
    {
      h: l('What is encapsulation?', 'এনক্যাপসুলেশন কী?'),
      blocks: [
        { p: l('Encapsulation is how data is prepared for the network as it moves down the layers. At each layer, the data from the layer above is wrapped with that layer own header — a small block of control information — and sometimes a trailer. Your application data becomes a transport segment, then a network packet, then a link-layer frame, then finally raw bits on the wire. Each wrapper carries exactly the addressing and control that its matching layer on the other side needs to do its job.', 'এনক্যাপসুলেশন হলো ডেটা স্তরের মধ্য দিয়ে নিচে নামার সময় নেটওয়ার্কের জন্য কীভাবে প্রস্তুত হয়। প্রতিটি স্তরে, ওপরের স্তরের ডেটাকে সেই স্তরের নিজস্ব header দিয়ে মোড়ানো হয়—একটি ছোট নিয়ন্ত্রণ তথ্যের ব্লক—আর কখনো একটি trailer দিয়ে। আপনার application ডেটা একটি transport segment হয়, তারপর একটি network packet, তারপর একটি link-layer frame, তারপর অবশেষে তারে কাঁচা bit। প্রতিটি মোড়ক ঠিক সেই ঠিকানা ও নিয়ন্ত্রণ বহন করে যা অন্য পাশের মিলে যাওয়া স্তরের কাজ করতে দরকার।') },
        { p: l('The problem encapsulation solves is that each layer needs its own delivery information without disturbing the data it is carrying. By treating everything from the layer above as an opaque payload and adding only its own header, a layer stays independent: the network layer does not read your HTTP body, it just moves the packet. The cost is real but small — every header is extra bytes added to every single message.', 'এনক্যাপসুলেশন যে সমস্যা সমাধান করে তা হলো প্রতিটি স্তরের নিজস্ব ডেলিভারি তথ্য দরকার, কিন্তু বহন করা ডেটা নষ্ট না করে। ওপরের স্তরের সবকিছুকে একটি অস্বচ্ছ payload হিসেবে ধরে ও শুধু নিজের header যোগ করে, একটি স্তর স্বাধীন থাকে: network স্তর আপনার HTTP body পড়ে না, শুধু packet সরায়। খরচটি বাস্তব তবে ছোট—প্রতিটি header প্রতিটি বার্তায় যোগ হওয়া অতিরিক্ত byte।') },
        { note: l('Encapsulation is like posting a letter. You put the letter in an envelope with an address, drop that into a bigger courier envelope with its own label, and that goes into a mailbag routed to a city. Each wrapper adds the routing its own carrier needs, and none of them opens the letter inside.', 'এনক্যাপসুলেশন একটি চিঠি পাঠানোর মতো। আপনি চিঠিটি ঠিকানাসহ একটি খামে রাখেন, সেটি নিজের লেবেলসহ একটি বড় courier খামে ফেলেন, আর সেটি একটি শহরে routed একটি ডাকব্যাগে যায়। প্রতিটি মোড়ক নিজের বাহকের দরকারি routing যোগ করে, আর কেউই ভেতরের চিঠি খোলে না।'), kind: 'tip' },
      ],
    },
    {
      h: l('How data is wrapped going down', 'নিচে নামার সময় ডেটা কীভাবে মোড়ানো হয়'),
      blocks: [
        { p: l('On the sending machine, the message travels down the stack and picks up a new header at each layer. The order is fixed and worth memorising.', 'পাঠানো মেশিনে, বার্তা stack ধরে নিচে নামে ও প্রতিটি স্তরে একটি নতুন header তুলে নেয়। ক্রমটি নির্দিষ্ট ও মুখস্থ করার মতো।') },
        { steps: [
          l('Application: your data starts as an HTTP message (or any app-layer data).', 'Application: আপনার ডেটা একটি HTTP বার্তা (বা যেকোনো app-layer ডেটা) হিসেবে শুরু হয়।'),
          l('Transport: TCP adds a header with source and destination ports, turning it into a segment.', 'Transport: TCP source ও destination port সহ একটি header যোগ করে, একে একটি segment-এ পরিণত করে।'),
          l('Network: IP adds a header with source and destination IP addresses, making it a packet.', 'Network: IP source ও destination IP ঠিকানা সহ একটি header যোগ করে, একে একটি packet বানায়।'),
          l('Data link: Ethernet adds a header with MAC addresses and a trailer (FCS) for error checking, making a frame.', 'Data link: Ethernet MAC ঠিকানা সহ একটি header ও error যাচাইয়ের জন্য একটি trailer (FCS) যোগ করে, একটি frame বানায়।'),
          l('Physical: the frame is sent as bits — electrical, optical, or radio signals — on the wire.', 'Physical: frame bit হিসেবে পাঠানো হয়—বৈদ্যুতিক, অপটিক্যাল বা রেডিও সংকেত—তারে।'),
        ] },
        { code: `Going down the stack, headers wrap around the data:

  +---------------------------------------------------------------+
  | Eth hdr | IP hdr | TCP hdr |     HTTP data      | Eth trailer |   Frame  (L2)
  +---------------------------------------------------------------+
            |------------------------------------------|              Packet (L3)
                     |---------------------------------|              Segment(L4)
                               |--------------------|                 Data   (L7)

  MAC addr   IP addr   ports        your message      error check`, caption: l('The same bytes are a segment, a packet, and a frame at once — just wrapped in more headers as you look at lower layers. The HTTP data never changes; only the wrappers around it grow.', 'একই byte একসঙ্গে একটি segment, একটি packet ও একটি frame—শুধু নিচের স্তরে তাকালে আরও header-এ মোড়ানো। HTTP ডেটা কখনো বদলায় না; শুধু চারপাশের মোড়ক বাড়ে।') },
      ],
    },
    {
      h: l('Headers, PDU names, and addresses', 'header, PDU নাম ও ঠিকানা'),
      blocks: [
        { p: l('Each layer gives its wrapped unit a specific name (its PDU, or protocol data unit) and adds specific addressing. This table ties the names, headers, and addresses together.', 'প্রতিটি স্তর তার মোড়ানো এককটিকে একটি নির্দিষ্ট নাম দেয় (তার PDU বা protocol data unit) ও নির্দিষ্ট ঠিকানা যোগ করে। এই টেবিল নাম, header ও ঠিকানা একসঙ্গে বাঁধে।') },
        { table: {
          head: [l('Layer', 'স্তর'), l('Unit (PDU)', 'একক (PDU)'), l('Header adds', 'header যা যোগ করে')],
          rows: [
            [l('Application', 'Application'), l('Data / message', 'ডেটা / বার্তা'), l('App protocol info (e.g. HTTP headers)', 'app protocol তথ্য (যেমন HTTP header)')],
            [l('Transport', 'Transport'), l('Segment (TCP) / datagram (UDP)', 'Segment (TCP) / datagram (UDP)'), l('Source & destination ports', 'source ও destination port')],
            [l('Network', 'Network'), l('Packet', 'Packet'), l('Source & destination IP addresses', 'source ও destination IP ঠিকানা')],
            [l('Data link', 'Data link'), l('Frame', 'Frame'), l('Source & destination MAC + FCS trailer', 'source ও destination MAC + FCS trailer')],
            [l('Physical', 'Physical'), l('Bits / symbols', 'Bit / symbol'), l('Nothing — just signals on the medium', 'কিছুই না—শুধু মাধ্যমে সংকেত')],
          ],
        } },
      ],
    },
    {
      h: l('Decapsulation: unwrapping on the receiver', 'ডিক্যাপসুলেশন: গ্রাহকে খুলে ফেলা'),
      blocks: [
        { p: l('The receiver does the exact reverse, and this symmetry is the whole point. Bits arrive at the physical layer and go up the stack; the link layer reads and strips the Ethernet header, the network layer reads and strips the IP header, the transport layer reads and strips the TCP header, and finally the application gets back the original clean HTTP message. A header written by one layer on the way down is read only by the same layer on the way up — the IP layer reads the IP header, never the Ethernet one.', 'গ্রাহক ঠিক উল্টোটা করে, আর এই প্রতিসাম্যই আসল বিষয়। bit physical স্তরে পৌঁছায় ও stack-এ ওপরে ওঠে; link স্তর Ethernet header পড়ে ও খুলে ফেলে, network স্তর IP header পড়ে ও খুলে ফেলে, transport স্তর TCP header পড়ে ও খুলে ফেলে, আর অবশেষে application মূল পরিষ্কার HTTP বার্তা ফেরত পায়। নিচে নামার পথে এক স্তরের লেখা header শুধু ওপরে ওঠার পথে একই স্তর পড়ে—IP স্তর IP header পড়ে, কখনো Ethernet-টি নয়।') },
        { note: l('Because each layer only reads its own header, intermediate devices peek at just the layers they care about: a switch reads the frame MAC header, a router reads the packet IP header, and neither one opens your encrypted application data.', 'যেহেতু প্রতিটি স্তর শুধু নিজের header পড়ে, মধ্যবর্তী ডিভাইস শুধু যেসব স্তর নিয়ে তারা চিন্তিত সেগুলো দেখে: একটি switch frame-এর MAC header পড়ে, একটি router packet-এর IP header পড়ে, আর কেউই আপনার এনক্রিপ্ট করা application ডেটা খোলে না।'), kind: 'tip' },
      ],
    },
    {
      h: l('When and where this matters', 'কখন ও কোথায় এটি গুরুত্বপূর্ণ'),
      blocks: [
        { p: l('Encapsulation explains real, everyday effects. Header overhead is why sending millions of tiny messages is far less efficient than fewer big ones — every message pays the full header tax. It is also why there is a maximum useful payload size: Ethernet frames top out around a 1500-byte MTU, so larger data must be split into more packets, each with its own headers. And when you open a packet capture in a tool like Wireshark or tcpdump, encapsulation is exactly what you see: you click a frame, expand it, and find the IP packet inside, the TCP segment inside that, and your data at the core.', 'এনক্যাপসুলেশন বাস্তব, দৈনন্দিন প্রভাব ব্যাখ্যা করে। header overhead-ই কারণ কেন লক্ষ লক্ষ ছোট বার্তা পাঠানো কম বড় বার্তার চেয়ে অনেক কম দক্ষ—প্রতিটি বার্তা পুরো header কর দেয়। এটাই কারণ কেন একটি সর্বোচ্চ কার্যকর payload আকার আছে: Ethernet frame প্রায় ১৫০০-byte MTU-তে সীমাবদ্ধ, তাই বড় ডেটাকে আরও packet-এ ভাগ করতে হয়, প্রতিটির নিজস্ব header সহ। আর যখন আপনি Wireshark বা tcpdump-এর মতো টুলে একটি packet capture খোলেন, এনক্যাপসুলেশনই ঠিক যা দেখেন: আপনি একটি frame-এ ক্লিক করেন, খোলেন, ও ভেতরে IP packet, তার ভেতরে TCP segment, ও কেন্দ্রে আপনার ডেটা পান।') },
      ],
    },
    {
      h: l('Common mistakes', 'সাধারণ ভুল'),
      blocks: [
        { list: [
          l('Forgetting the receiver unwraps in reverse, so a header set by one layer must be read by the same layer — not a higher or lower one.', 'ভুলে যাওয়া যে গ্রাহক উল্টো ক্রমে খোলে, তাই এক স্তরের সেট করা header একই স্তরকেই পড়তে হয়—উঁচু বা নিচু নয়।'),
          l('Ignoring header overhead when designing chatty protocols; thousands of tiny packets waste bandwidth on headers alone.', 'chatty protocol ডিজাইনে header overhead উপেক্ষা করা; হাজার হাজার ছোট packet শুধু header-এ bandwidth নষ্ট করে।'),
          l('Confusing the PDU names — calling a frame a packet or a segment a packet — which hides which layer you are actually reasoning about.', 'PDU নাম গুলিয়ে ফেলা—একটি frame-কে packet বা একটি segment-কে packet বলা—যা লুকায় আপনি আসলে কোন স্তর নিয়ে ভাবছেন।'),
          l('Assuming data is encrypted just because it is wrapped in headers; encapsulation is packaging, not security. Encryption (TLS) is a separate step.', 'ধরে নেওয়া ডেটা এনক্রিপ্ট কারণ এটি header-এ মোড়ানো; এনক্যাপসুলেশন প্যাকেজিং, নিরাপত্তা নয়। এনক্রিপশন (TLS) আলাদা ধাপ।'),
        ] },
      ],
    },
    {
      h: l('Remember in one line', 'এক লাইনে মনে রাখুন'),
      blocks: [
        { list: [
          l('Going down the stack, each layer wraps the data in its own header: data → segment → packet → frame → bits.', 'stack-এ নিচে নামার সময় প্রতিটি স্তর ডেটাকে নিজের header-এ মোড়ায়: data → segment → packet → frame → bit।'),
          l('The receiver decapsulates in reverse; each header is read only by the matching layer that wrote it.', 'গ্রাহক উল্টোভাবে decapsulate করে; প্রতিটি header শুধু যে মিলে যাওয়া স্তর লিখেছে সে পড়ে।'),
          l('Headers make packets self-describing and routable, but add bytes of overhead to every single message.', 'header packet-কে স্ব-বর্ণনামূলক ও routable করে, তবে প্রতিটি বার্তায় byte-এর overhead যোগ করে।'),
        ] },
      ],
    },
  ],

  // ── cn-performance · Bandwidth, latency & throughput ──────────────────────
  'cn-performance': [
    {
      h: l('What are bandwidth, latency & throughput?', 'ব্যান্ডউইথ, latency ও throughput কী?'),
      blocks: [
        { p: l('Network speed is not one number — it has two independent parts, and confusing them is the single most common networking mistake. Bandwidth is how much data a link can carry per second (its capacity, measured in bits per second — Mbps, Gbps). Latency is how long a single bit takes to travel from one point to another (a delay, measured in milliseconds). Throughput is the third term: the data rate you actually achieve in practice, which is limited by both bandwidth and latency together, plus overhead and loss.', 'নেটওয়ার্ক গতি একটি সংখ্যা নয়—এর দুটি স্বাধীন অংশ আছে, আর এদের গুলিয়ে ফেলা সবচেয়ে সাধারণ নেটওয়ার্কিং ভুল। bandwidth হলো একটি link প্রতি সেকেন্ডে কত ডেটা বহন করতে পারে (এর ক্ষমতা, bit per second-এ মাপা—Mbps, Gbps)। latency হলো একটি একক bit-এর এক বিন্দু থেকে আরেক বিন্দুতে যেতে কত সময় লাগে (একটি বিলম্ব, millisecond-এ মাপা)। throughput তৃতীয় শব্দ: আপনি বাস্তবে যে ডেটা হার আসলে পান, যা bandwidth ও latency দুটি মিলে, plus overhead ও loss দিয়ে সীমিত।') },
        { p: l('The problem this distinction solves is knowing what to fix when something feels slow. A "slow" network can mean two totally different diseases: a narrow pipe (low bandwidth) that cannot move a big file quickly, or a long delay (high latency) that makes every small request feel sluggish even on a fat pipe. The cure is different for each, so you must first tell them apart.', 'এই পার্থক্য যে সমস্যা সমাধান করে তা হলো কিছু ধীর লাগলে কী ঠিক করতে হবে তা জানা। একটি "ধীর" নেটওয়ার্ক দুটি সম্পূর্ণ ভিন্ন রোগ বোঝাতে পারে: একটি সরু পাইপ (কম bandwidth) যা একটি বড় ফাইল দ্রুত সরাতে পারে না, অথবা একটি লম্বা বিলম্ব (বেশি latency) যা মোটা পাইপেও প্রতিটি ছোট request-কে ধীর করে তোলে। প্রতিটির নিরাময় ভিন্ন, তাই আপনাকে আগে এদের আলাদা করতে হবে।') },
        { note: l('Think of a highway. Bandwidth is how many lanes it has — more lanes move more cars at once. Latency is how long the drive takes end to end — adding lanes does nothing to shorten the distance. A 10-lane road still takes an hour to cross a big city; a short road with one lane crosses a small town in a minute.', 'একটি মহাসড়ক ভাবুন। bandwidth হলো এতে কত লেন—বেশি লেন একসঙ্গে বেশি গাড়ি সরায়। latency হলো এক প্রান্ত থেকে আরেক প্রান্তে চালাতে কত সময়—লেন যোগ করলে দূরত্ব কমে না। ১০-লেনের রাস্তা একটি বড় শহর পার হতে এখনো এক ঘণ্টা নেয়; এক লেনের একটি ছোট রাস্তা এক মিনিটে একটি ছোট শহর পার হয়।'), kind: 'tip' },
      ],
    },
    {
      h: l('How they combine into real speed', 'এরা কীভাবে মিলে আসল গতি হয়'),
      blocks: [
        { p: l('For a big download, bandwidth dominates: the file is large, so the width of the pipe sets the time. For a chatty request-response app, latency dominates: each round trip must complete before the next begins, so distance and the number of trips set the time — bandwidth barely matters.', 'একটি বড় download-এ, bandwidth প্রাধান্য পায়: ফাইল বড়, তাই পাইপের প্রস্থ সময় ঠিক করে। একটি chatty request-response অ্যাপে, latency প্রাধান্য পায়: পরেরটি শুরুর আগে প্রতিটি round trip শেষ হতে হয়, তাই দূরত্ব ও trip-এর সংখ্যা সময় ঠিক করে—bandwidth প্রায় গুরুত্বহীন।') },
        { steps: [
          l('Measure latency with ping: it reports the round-trip time for a tiny packet.', 'ping দিয়ে latency মাপুন: এটি একটি ছোট packet-এর round-trip time জানায়।'),
          l('Estimate transfer time for a big file: size in bits divided by bandwidth in bits per second.', 'একটি বড় ফাইলের transfer সময় আন্দাজ করুন: bit-এ আকার ভাগ bit per second-এ bandwidth।'),
          l('Count the round trips your app makes: each one costs at least one latency, no matter how wide the pipe.', 'আপনার অ্যাপ কতগুলো round trip করে গুনুন: পাইপ যত চওড়াই হোক, প্রতিটি অন্তত এক latency খরচ করে।'),
          l('To speed a big transfer, add bandwidth; to speed a chatty app, cut round trips and move closer to the user.', 'একটি বড় transfer দ্রুত করতে bandwidth যোগ করুন; একটি chatty অ্যাপ দ্রুত করতে round trip কমান ও ব্যবহারকারীর কাছে যান।'),
        ] },
        { code: `$ ping -c 4 8.8.8.8            # latency: round-trip time for one small packet
64 bytes from 8.8.8.8: icmp_seq=0 ttl=118 time=28.7 ms
64 bytes from 8.8.8.8: icmp_seq=1 ttl=118 time=28.1 ms
round-trip min/avg/max = 28.1/28.9/29.6 ms

# throughput: how long to send a 100 MB file over a 50 Mbps link?
#   100 MB  x  8      = 800 megabits
#   800 megabits / 50 = 16 seconds  (before overhead and loss)`, caption: l('ping measures latency directly (about 29 ms here). Transfer time for a big file is a separate calculation driven by bandwidth — the two answer different questions.', 'ping সরাসরি latency মাপে (এখানে প্রায় ২৯ ms)। একটি বড় ফাইলের transfer সময় bandwidth-চালিত একটি আলাদা হিসাব—দুটি ভিন্ন প্রশ্নের উত্তর দেয়।') },
      ],
    },
    {
      h: l('The three terms compared', 'তিনটি শব্দ তুলনা'),
      blocks: [
        { p: l('Bandwidth, latency, and throughput are easy to blur together, but they answer three different questions: how wide is the pipe, how long is the trip, and what do I actually get in the end? Keeping them separate is what lets you diagnose a slow network correctly instead of throwing money at the wrong fix.', 'bandwidth, latency ও throughput সহজেই মিলে যায়, তবে এরা তিনটি ভিন্ন প্রশ্নের উত্তর দেয়: পাইপ কত চওড়া, যাত্রা কত লম্বা, আর শেষে আমি আসলে কী পাই? এদের আলাদা রাখাই আপনাকে একটি ধীর নেটওয়ার্ক সঠিকভাবে নির্ণয় করতে দেয়, ভুল সমাধানে টাকা না ঢেলে।') },
        { table: {
          head: [l('Term', 'শব্দ'), l('What it measures', 'যা মাপে'), l('Typical unit', 'সাধারণ একক'), l('Highway analogy', 'মহাসড়ক উপমা')],
          rows: [
            [l('Bandwidth', 'Bandwidth'), l('Maximum capacity — data per second', 'সর্বোচ্চ ক্ষমতা—প্রতি সেকেন্ডে ডেটা'), l('Mbps, Gbps', 'Mbps, Gbps'), l('Number of lanes', 'লেনের সংখ্যা')],
            [l('Latency', 'Latency'), l('Delay for one trip (often round-trip)', 'একটি যাত্রার বিলম্ব (প্রায়ই round-trip)'), l('milliseconds (ms)', 'millisecond (ms)'), l('Time to drive the distance', 'দূরত্ব চালানোর সময়')],
            [l('Throughput', 'Throughput'), l('Actual data rate achieved in practice', 'বাস্তবে অর্জিত আসল ডেটা হার'), l('Mbps (real, not rated)', 'Mbps (আসল, rated নয়)'), l('Cars actually delivered per hour', 'প্রতি ঘণ্টায় আসলে পৌঁছানো গাড়ি')],
          ],
        } },
      ],
    },
    {
      h: l('Why round trips dominate', 'round trip কেন প্রাধান্য পায়'),
      blocks: [
        { p: l('Latency hurts most when an operation needs many sequential round trips, because each trip must finish before the next can start. Opening a fresh HTTPS connection, for example, spends a round trip on the TCP handshake and another on the TLS handshake before any real data flows. If your server is 200 ms away and a page makes ten sequential requests, that is two full seconds lost to latency alone — no amount of extra bandwidth removes it. This is exactly why techniques like reusing connections, batching requests, and putting a CDN closer to the user speed pages up more than a fatter pipe would.', 'একটি operation-এ যখন অনেক ধারাবাহিক round trip দরকার তখন latency সবচেয়ে বেশি ক্ষতি করে, কারণ পরেরটি শুরুর আগে প্রতিটি trip শেষ হতে হয়। যেমন একটি নতুন HTTPS সংযোগ খুলতে, আসল ডেটা যাওয়ার আগে TCP handshake-এ একটি round trip ও TLS handshake-এ আরেকটি খরচ হয়। আপনার সার্ভার ২০০ ms দূরে হলে ও একটি page দশটি ধারাবাহিক request করলে, শুধু latency-তে দুই পূর্ণ সেকেন্ড হারায়—কোনো পরিমাণ অতিরিক্ত bandwidth তা সরায় না। এ কারণেই সংযোগ পুনঃব্যবহার, request batch করা, ও ব্যবহারকারীর কাছে একটি CDN রাখার মতো কৌশল একটি মোটা পাইপের চেয়ে page বেশি দ্রুত করে।') },
        { note: l('More bandwidth does not fix latency. A far-away server stays slow to respond no matter how fat the pipe, because the delay is set by distance and the number of round trips, not by capacity.', 'বেশি bandwidth latency ঠিক করে না। একটি দূরের সার্ভার পাইপ যত মোটাই হোক রেসপন্সে ধীরই থাকে, কারণ বিলম্ব দূরত্ব ও round trip-এর সংখ্যা দিয়ে ঠিক হয়, ক্ষমতা দিয়ে নয়।'), kind: 'warn' },
      ],
    },
    {
      h: l('When to optimize which', 'কখন কোনটি অপটিমাইজ করবেন'),
      blocks: [
        { list: [
          l('Big transfers (video, backups, downloads) → optimize bandwidth; the pipe width sets the time.', 'বড় transfer (video, backup, download) → bandwidth অপটিমাইজ করুন; পাইপের প্রস্থ সময় ঠিক করে।'),
          l('Chatty request/response (APIs, page loads, games) → cut round trips to reduce the impact of latency.', 'chatty request/response (API, page load, game) → latency-এর প্রভাব কমাতে round trip কমান।'),
          l('Users far from your server → move content closer with a CDN or edge, since distance is the latency floor.', 'সার্ভার থেকে দূরের ব্যবহারকারী → CDN বা edge দিয়ে content কাছে আনুন, কারণ দূরত্বই latency-এর মেঝে।'),
          l('Reuse connections (keep-alive) instead of opening a new one per request, to skip repeated handshakes.', 'প্রতি request-এ নতুন না খুলে সংযোগ পুনঃব্যবহার করুন (keep-alive), যাতে বারবার handshake এড়ানো যায়।'),
        ] },
      ],
    },
    {
      h: l('Common mistakes', 'সাধারণ ভুল'),
      blocks: [
        { list: [
          l('Buying more bandwidth to fix a latency problem caused by distance or too many round trips — the pipe was never the bottleneck.', 'দূরত্ব বা বেশি round trip-জনিত latency সমস্যা ঠিক করতে বেশি bandwidth কেনা—পাইপ কখনো bottleneck ছিল না।'),
          l('Quoting the rated bandwidth as if it were throughput; real throughput is lower after overhead, congestion, and loss.', 'rated bandwidth-কে throughput ভেবে বলা; overhead, congestion ও loss-এর পর আসল throughput কম।'),
          l('Testing only on a local network where latency is near zero, then being shocked when a distant user sees seconds of delay.', 'শুধু একটি লোকাল নেটওয়ার্কে পরীক্ষা করা যেখানে latency প্রায় শূন্য, তারপর দূরের ব্যবহারকারী সেকেন্ডের বিলম্ব দেখলে চমকে যাওয়া।'),
          l('Making many small sequential requests when one batched request over a reused connection would pay the latency cost just once.', 'অনেক ছোট ধারাবাহিক request করা যখন একটি পুনঃব্যবহৃত সংযোগে একটি batch করা request latency খরচ একবারই দিত।'),
        ] },
      ],
    },
    {
      h: l('Remember in one line', 'এক লাইনে মনে রাখুন'),
      blocks: [
        { list: [
          l('Bandwidth = capacity (data per second); latency = delay for one trip; throughput = what you actually get.', 'bandwidth = ক্ষমতা (প্রতি সেকেন্ডে ডেটা); latency = এক যাত্রার বিলম্ব; throughput = আপনি আসলে যা পান।'),
          l('Optimize bandwidth for big transfers; cut round trips to beat latency for chatty apps.', 'বড় transfer-এ bandwidth অপটিমাইজ করুন; chatty অ্যাপে latency হারাতে round trip কমান।'),
          l('More bandwidth never fixes latency — a far server stays slow to respond no matter how fat the pipe.', 'বেশি bandwidth কখনো latency ঠিক করে না—দূরের সার্ভার পাইপ যত মোটাই হোক রেসপন্সে ধীরই থাকে।'),
        ] },
      ],
    },
  ],

  // ── cn-mac-ethernet · MAC addresses & Ethernet ────────────────────────────
  'cn-mac-ethernet': [
    {
      h: l('What are MAC addresses & Ethernet?', 'MAC ঠিকানা ও Ethernet কী?'),
      blocks: [
        { p: l('Ethernet is the dominant technology for moving data across a local network — one office, home, or data-centre rack. It carries data in units called frames, and it addresses those frames using MAC (Media Access Control) addresses. A MAC address is a unique identifier, usually burned into a device network card at the factory, written as six pairs of hex digits like 3c:52:82:1a:6b:d4. Every network interface — your laptop Wi-Fi, its Ethernet port, your phone — has its own MAC address, and that is how devices on the same local network tell each other apart.', 'Ethernet হলো একটি লোকাল নেটওয়ার্কে—একটি অফিস, বাড়ি বা data-centre rack—ডেটা সরানোর প্রধান প্রযুক্তি। এটি frame নামের এককে ডেটা বহন করে, আর সেই frame-গুলোকে MAC (Media Access Control) ঠিকানা দিয়ে ঠিকানা করে। একটি MAC ঠিকানা একটি ইউনিক শনাক্তকারী, সাধারণত কারখানায় একটি ডিভাইসের network card-এ পোড়ানো, ছয় জোড়া hex অঙ্ক হিসেবে লেখা যেমন 3c:52:82:1a:6b:d4। প্রতিটি network interface—আপনার ল্যাপটপের Wi-Fi, তার Ethernet port, আপনার ফোন—এর নিজস্ব MAC ঠিকানা আছে, আর এভাবেই একই লোকাল নেটওয়ার্কের ডিভাইসগুলো একে অপরকে আলাদা করে।') },
        { p: l('The problem MAC and Ethernet solve is local delivery: getting a frame from one device to another on the same physical network segment. When your laptop sends data to the router in your house, it addresses the frame to the router MAC address, and the switch or Wi-Fi hands it over directly. This works beautifully within one network — but a MAC address only has meaning locally, so the moment data must cross into another network, a higher-layer address (IP) is needed on top.', 'MAC ও Ethernet যে সমস্যা সমাধান করে তা হলো লোকাল ডেলিভারি: একই ভৌত নেটওয়ার্ক segment-এ এক ডিভাইস থেকে আরেক ডিভাইসে একটি frame পৌঁছানো। আপনার ল্যাপটপ যখন আপনার বাড়ির router-এ ডেটা পাঠায়, এটি frame-টিকে router-এর MAC ঠিকানায় ঠিকানা করে, আর switch বা Wi-Fi সরাসরি তা হস্তান্তর করে। এটি এক নেটওয়ার্কের ভেতরে চমৎকার কাজ করে—তবে একটি MAC ঠিকানার অর্থ শুধু লোকালি, তাই ডেটা যখনই আরেকটি নেটওয়ার্কে পার হতে হবে, ওপরে একটি উঁচু-স্তরের ঠিকানা (IP) দরকার।') },
        { note: l('A MAC address is like a device permanent serial number, and an Ethernet frame is a labelled package on the local conveyor belt. The label says which machine on this belt should pick the package up. It is perfect for the local warehouse but means nothing once the package leaves for another city.', 'MAC ঠিকানা একটি ডিভাইসের স্থায়ী সিরিয়াল নম্বরের মতো, আর একটি Ethernet frame হলো লোকাল কনভেয়র বেল্টের একটি লেবেলযুক্ত প্যাকেজ। লেবেল বলে এই বেল্টের কোন মেশিন প্যাকেজটি তুলবে। এটি লোকাল গুদামের জন্য নিখুঁত কিন্তু প্যাকেজ আরেকটি শহরে গেলে কিছুই বোঝায় না।'), kind: 'tip' },
      ],
    },
    {
      h: l('Anatomy of a MAC address', 'একটি MAC ঠিকানার গঠন'),
      blocks: [
        { p: l('A MAC address is 48 bits — six bytes — shown as hex. It splits into two halves: the first three bytes identify the manufacturer (the OUI, or Organizationally Unique Identifier), and the last three are a unique serial the maker assigns to that specific card. One special address, all ones (ff:ff:ff:ff:ff:ff), is the broadcast address, meaning "every device on this local network."', 'একটি MAC ঠিকানা ৪৮ bit—ছয় byte—hex হিসেবে দেখানো। এটি দুই ভাগে ভাগ হয়: প্রথম তিন byte নির্মাতা চেনায় (OUI বা Organizationally Unique Identifier), আর শেষ তিন byte নির্মাতার সেই নির্দিষ্ট card-কে দেওয়া একটি ইউনিক সিরিয়াল। একটি বিশেষ ঠিকানা, সব এক (ff:ff:ff:ff:ff:ff), হলো broadcast ঠিকানা, যার মানে "এই লোকাল নেটওয়ার্কের প্রতিটি ডিভাইস।"') },
        { code: `$ ip link show eth0
2: eth0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc fq_codel
    link/ether 3c:52:82:1a:6b:d4 brd ff:ff:ff:ff:ff:ff

#   link/ether  ->  3c:52:82 : 1a:6b:d4
#                   |------|   |------|
#                   maker      device serial   (this card's MAC)
#   brd ff:ff:ff:ff:ff:ff  ->  the broadcast address (everyone)
#   mtu 1500               ->  max payload bytes in one frame`, caption: l('ip link show prints an interface MAC after link/ether. The first half is the manufacturer; brd is the broadcast address that reaches every device on the segment.', 'ip link show একটি interface-এর MAC link/ether-এর পরে দেখায়। প্রথম অর্ধেক নির্মাতা; brd হলো broadcast ঠিকানা যা segment-এর প্রতিটি ডিভাইসে পৌঁছায়।') },
      ],
    },
    {
      h: l('MAC (Layer 2) vs IP (Layer 3)', 'MAC (Layer 2) বনাম IP (Layer 3)'),
      blocks: [
        { p: l('The clearest way to understand MAC addresses is to contrast them with IP addresses. They live at different layers and do different jobs, and real delivery uses both at once.', 'MAC ঠিকানা বোঝার সবচেয়ে পরিষ্কার উপায় হলো IP ঠিকানার সঙ্গে তুলনা করা। এরা ভিন্ন স্তরে থাকে ও ভিন্ন কাজ করে, আর আসল ডেলিভারি একসঙ্গে দুটিই ব্যবহার করে।') },
        { table: {
          head: [l('Aspect', 'দিক'), l('MAC address', 'MAC ঠিকানা'), l('IP address', 'IP ঠিকানা')],
          rows: [
            [l('Layer', 'স্তর'), l('2 · Data link', '২ · Data link'), l('3 · Network', '৩ · Network')],
            [l('Scope', 'পরিসর'), l('One local network only', 'শুধু এক লোকাল নেটওয়ার্ক'), l('Across networks, end to end', 'নেটওয়ার্ক জুড়ে, end to end')],
            [l('Assigned by', 'কে দেয়'), l('Manufacturer, fixed to the device', 'নির্মাতা, ডিভাইসে স্থির'), l('Network / DHCP, can change', 'নেটওয়ার্ক / DHCP, বদলাতে পারে')],
            [l('Used for', 'কীসে ব্যবহার'), l('Delivering a frame to the next hop', 'পরের hop-এ একটি frame পৌঁছানো'), l('Routing a packet to a distant host', 'দূরের host-এ packet routing')],
            [l('Changes en route?', 'পথে বদলায়?'), l('Yes — rewritten at every hop', 'হ্যাঁ—প্রতি hop-এ পুনর্লিখিত'), l('No — stays the same end to end', 'না—end to end একই থাকে')],
          ],
        } },
      ],
    },
    {
      h: l('How a frame is delivered on a LAN', 'একটি frame কীভাবে LAN-এ পৌঁছায়'),
      blocks: [
        { p: l('Within one local network, a switch is what actually moves frames, and it learns where each device is by watching the source MAC of frames that pass through it.', 'এক লোকাল নেটওয়ার্কের ভেতরে, একটি switch আসলে frame সরায়, আর এটি শেখে প্রতিটি ডিভাইস কোথায়, তার মধ্য দিয়ে যাওয়া frame-এর source MAC দেখে।') },
        { steps: [
          l('A device builds a frame with its own MAC as the source and the destination device MAC as the target.', 'একটি ডিভাইস নিজের MAC-কে source ও গন্তব্য ডিভাইসের MAC-কে target করে একটি frame বানায়।'),
          l('The switch reads the destination MAC and looks it up in its MAC address table.', 'switch গন্তব্য MAC পড়ে ও তার MAC address table-এ খোঁজে।'),
          l('If it knows which port that MAC is on, it forwards the frame only out that one port — not to everyone.', 'যদি জানে সেই MAC কোন port-এ, তবে frame-টি শুধু সেই একটি port দিয়ে পাঠায়—সবাইকে নয়।'),
          l('If the destination is unknown, it floods the frame to all ports and learns the answer from the reply.', 'গন্তব্য অজানা হলে, এটি frame-টি সব port-এ flood করে ও উত্তর থেকে জবাব শেখে।'),
          l('To cross into another network, the frame instead goes to the router MAC, which strips it and forwards the packet on by IP.', 'আরেকটি নেটওয়ার্কে পার হতে, frame-টি বদলে router-এর MAC-এ যায়, যা তা খুলে packet-টিকে IP দিয়ে এগিয়ে দেয়।'),
        ] },
      ],
    },
    {
      h: l('When and where MAC addresses matter', 'কখন ও কোথায় MAC ঠিকানা গুরুত্বপূর্ণ'),
      blocks: [
        { p: l('Use MAC addresses to reason about local delivery — anything happening within a single network segment. They are what a switch forwards on, what ARP resolves an IP to before a frame can be sent, and what DHCP servers and Wi-Fi access points use to recognise a returning device. Network access controls and MAC filtering also key off them. But the boundary is strict: a MAC address never leaves its local network. Every time a packet crosses a router into a new network, the router throws away the old Ethernet frame and builds a fresh one with new source and destination MACs for that next segment — while the IP addresses stay the same the whole way. That is the single most important fact to hold on to: MAC is local, IP is end to end.', 'লোকাল ডেলিভারি বুঝতে MAC ঠিকানা ব্যবহার করুন—একটি একক নেটওয়ার্ক segment-এর ভেতরে ঘটা যেকোনো কিছু। একটি switch এর ওপর forward করে, একটি frame পাঠানোর আগে ARP একটি IP-কে এতে resolve করে, আর DHCP সার্ভার ও Wi-Fi access point একটি ফিরে আসা ডিভাইস চিনতে এটি ব্যবহার করে। Network access control ও MAC filtering-ও এর ওপর নির্ভর করে। তবে সীমানা কঠোর: একটি MAC ঠিকানা কখনো তার লোকাল নেটওয়ার্ক ছাড়ে না। প্রতিবার একটি packet একটি router পার হয়ে একটি নতুন নেটওয়ার্কে যায়, router পুরনো Ethernet frame ফেলে দেয় ও সেই পরের segment-এর জন্য নতুন source ও destination MAC সহ একটি নতুন frame বানায়—যখন IP ঠিকানা পুরো পথ একই থাকে। এটাই ধরে রাখার সবচেয়ে গুরুত্বপূর্ণ তথ্য: MAC লোকাল, IP end to end।') },
      ],
    },
    {
      h: l('Common mistakes', 'সাধারণ ভুল'),
      blocks: [
        { list: [
          l('Expecting a MAC address to route across the internet — it never leaves the local network and is rewritten at every hop.', 'MAC ঠিকানা ইন্টারনেট জুড়ে route করবে আশা করা—এটি কখনো লোকাল নেটওয়ার্ক ছাড়ে না ও প্রতি hop-এ পুনর্লিখিত হয়।'),
          l('Confusing a switch (Layer 2, MAC-based) with a router (Layer 3, IP-based); they forward on different addresses.', 'একটি switch (Layer 2, MAC-ভিত্তিক) ও একটি router (Layer 3, IP-ভিত্তিক) গুলিয়ে ফেলা; এরা ভিন্ন ঠিকানায় forward করে।'),
          l('Thinking MAC addresses are secret or secure. They are visible to every device on the segment and can be spoofed in software.', 'ভাবা MAC ঠিকানা গোপন বা নিরাপদ। এগুলো segment-এর প্রতিটি ডিভাইসে দৃশ্যমান ও সফটওয়্যারে spoof করা যায়।'),
          l('Assuming the source MAC of an arriving packet is the original sender — it is only the last hop (usually your router).', 'ধরে নেওয়া একটি আসা packet-এর source MAC হলো মূল প্রেরক—এটি শুধু শেষ hop (সাধারণত আপনার router)।'),
        ] },
      ],
    },
    {
      h: l('Remember in one line', 'এক লাইনে মনে রাখুন'),
      blocks: [
        { list: [
          l('Ethernet moves data as frames on a local network, addressed by unique MAC addresses burned into each device.', 'Ethernet লোকাল নেটওয়ার্কে ডেটা frame হিসেবে সরায়, প্রতিটি ডিভাইসে পোড়ানো ইউনিক MAC ঠিকানায় ঠিকানা করা।'),
          l('MAC (Layer 2) handles delivery within one network; IP (Layer 3) is needed on top to cross between networks.', 'MAC (Layer 2) এক নেটওয়ার্কের ভেতরে ডেলিভারি সামলায়; নেটওয়ার্কের মধ্যে পার হতে ওপরে IP (Layer 3) দরকার।'),
          l('A MAC address is local and rewritten at every hop; the IP address stays the same end to end.', 'একটি MAC ঠিকানা লোকাল ও প্রতি hop-এ পুনর্লিখিত; IP ঠিকানা end to end একই থাকে।'),
        ] },
      ],
    },
  ],
}
