// Deep, bilingual (English / Bangla) teaching guides for networking infrastructure
// & real-time delivery topics, keyed by topic id. Shape mirrors app/course-guides.js:
// each guide is an array of sections { h, blocks }, rendered by GuideBlock in
// app/LearningApp.js. Facts (definitions, analogies, trade-offs, mistakes) are drawn
// from the rawTopics rows in app/courses/networking.js.

const l = (en, bn) => ({ en, bn })

export default {
  // ── cn-dhcp · DHCP: automatic addressing ──────────────────────────────────
  'cn-dhcp': [
    {
      h: l('What is DHCP?', 'DHCP কী?'),
      blocks: [
        { p: l('DHCP (Dynamic Host Configuration Protocol) is the service that automatically hands a device everything it needs to speak on a network the moment it joins: an IP address, a subnet mask, a default gateway, and DNS server addresses. Without it, a human would have to type those four settings into every laptop, phone, printer, and server by hand.', 'DHCP (Dynamic Host Configuration Protocol) হলো সেই সেবা যা একটি ডিভাইস নেটওয়ার্কে যোগ দেওয়ার সঙ্গে সঙ্গে নেটওয়ার্কে কথা বলার জন্য দরকারি সবকিছু স্বয়ংক্রিয়ভাবে দিয়ে দেয়: একটি IP ঠিকানা, একটি subnet mask, একটি default gateway, ও DNS সার্ভারের ঠিকানা। এটি ছাড়া প্রতিটি ল্যাপটপ, ফোন, প্রিন্টার ও সার্ভারে এই চারটি সেটিং একজন মানুষকে হাতে টাইপ করতে হতো।') },
        { p: l('The problem DHCP solves is that manual addressing does not scale and breaks easily. On a network of thousands of devices — a campus, an office, a coffee shop where phones come and go all day — hand-configuring addresses would be slow, and two people picking the same IP by accident would knock each other offline. DHCP makes addressing automatic, conflict-free, and self-healing: a device asks, a server answers, and the whole thing takes milliseconds.', 'DHCP যে সমস্যা সমাধান করে তা হলো ম্যানুয়াল অ্যাড্রেসিং স্কেল করে না ও সহজে ভাঙে। হাজার হাজার ডিভাইসের নেটওয়ার্কে—একটি ক্যাম্পাস, অফিস, বা কফি শপ যেখানে সারাদিন ফোন আসে-যায়—হাতে ঠিকানা কনফিগার করা ধীর হতো, আর দুজন ভুলবশত একই IP নিলে একে অপরকে অফলাইন করে দিত। DHCP অ্যাড্রেসিংকে স্বয়ংক্রিয়, সংঘর্ষহীন ও স্ব-নিরাময়যোগ্য করে: একটি ডিভাইস চায়, একটি সার্ভার উত্তর দেয়, আর পুরো ব্যাপারটা মিলিসেকেন্ডে ঘটে।') },
        { note: l('DHCP is like a hotel front desk. The moment you check in, the desk hands you a room key and a map — you do not pick your own room or draw your own map. When you check out, the room goes back in the pool for the next guest. A DHCP server hands out addresses the same way, on a time-limited lease.', 'DHCP একটি হোটেল ফ্রন্ট ডেস্কের মতো। চেক-ইনের মুহূর্তে ডেস্ক আপনাকে একটি রুম কী ও একটি ম্যাপ দেয়—আপনি নিজের রুম বাছেন না বা নিজের ম্যাপ আঁকেন না। চেক-আউটের সময় রুমটি পরের অতিথির জন্য পুলে ফিরে যায়। একটি DHCP সার্ভার একইভাবে সময়-সীমিত lease-এ ঠিকানা বিতরণ করে।'), kind: 'tip' },
      ],
    },
    {
      h: l('How DHCP works: the DORA exchange', 'DHCP কীভাবে কাজ করে: DORA বিনিময়'),
      blocks: [
        { p: l('When a fresh device joins a network it has no IP address yet, so it cannot address anyone directly. DHCP solves this with four broadcast messages known by the acronym DORA — Discover, Offer, Request, Acknowledge. The whole exchange runs over UDP: the server listens on port 67 and the client on port 68.', 'একটি নতুন ডিভাইস নেটওয়ার্কে যোগ দিলে তার এখনো কোনো IP ঠিকানা থাকে না, তাই এটি কাউকে সরাসরি অ্যাড্রেস করতে পারে না। DHCP এটি সমাধান করে DORA নামে পরিচিত চারটি broadcast বার্তা দিয়ে—Discover, Offer, Request, Acknowledge। পুরো বিনিময় UDP-তে চলে: সার্ভার port 67-এ ও ক্লায়েন্ট port 68-এ শোনে।') },
        { steps: [
          l('DISCOVER — the client broadcasts a DHCPDISCOVER to the whole local network (from source 0.0.0.0, since it has no address yet) asking "is there any DHCP server out there?"', 'DISCOVER—ক্লায়েন্ট পুরো লোকাল নেটওয়ার্কে একটি DHCPDISCOVER broadcast করে (source 0.0.0.0 থেকে, কারণ তার এখনো ঠিকানা নেই) জিজ্ঞাসা করে "কোনো DHCP সার্ভার আছে কি?"'),
          l('OFFER — one or more DHCP servers reply with a DHCPOFFER, proposing a specific address plus the subnet mask, gateway, DNS, and a lease time.', 'OFFER—এক বা একাধিক DHCP সার্ভার একটি DHCPOFFER দিয়ে উত্তর দেয়, একটি নির্দিষ্ট ঠিকানার সঙ্গে subnet mask, gateway, DNS ও একটি lease সময় প্রস্তাব করে।'),
          l('REQUEST — the client broadcasts a DHCPREQUEST formally accepting one offer. Broadcasting (not unicasting) tells any other servers that their offers were declined.', 'REQUEST—ক্লায়েন্ট একটি DHCPREQUEST broadcast করে আনুষ্ঠানিকভাবে একটি offer গ্রহণ করে। broadcast করায় (unicast নয়) অন্য সার্ভারগুলো বুঝতে পারে তাদের offer প্রত্যাখ্যাত হয়েছে।'),
          l('ACK — the chosen server sends a DHCPACK confirming the lease. Only now does the client configure the address and start using the network.', 'ACK—বাছাই করা সার্ভার একটি DHCPACK পাঠিয়ে lease নিশ্চিত করে। এখনই কেবল ক্লায়েন্ট ঠিকানা কনফিগার করে ও নেটওয়ার্ক ব্যবহার শুরু করে।'),
        ] },
        { code: `# DHCP DORA exchange  (UDP: server = port 67, client = port 68)
CLIENT --> 255.255.255.255  DHCPDISCOVER  "Any DHCP server? I have no IP (src 0.0.0.0)."
SERVER --> CLIENT           DHCPOFFER     "Take 192.168.1.50 /24, gw 192.168.1.1,
                                           DNS 8.8.8.8, lease 24h."
CLIENT --> 255.255.255.255  DHCPREQUEST   "I accept 192.168.1.50 from that server."
SERVER --> CLIENT           DHCPACK       "Confirmed. 192.168.1.50 is yours for 24h."`, caption: l('Four broadcast messages and the device is fully configured — no human types a single address.', 'চারটি broadcast বার্তা আর ডিভাইসটি পুরোপুরি কনফিগার হয়ে যায়—কোনো মানুষ একটি ঠিকানাও টাইপ করে না।') },
      ],
    },
    {
      h: l('What a DHCP lease hands you', 'একটি DHCP lease আপনাকে যা দেয়'),
      blocks: [
        { p: l('An address alone is not enough to reach the internet. DHCP delivers a small bundle of settings, and each one has a distinct job.', 'শুধু একটি ঠিকানা ইন্টারনেটে পৌঁছাতে যথেষ্ট নয়। DHCP সেটিংয়ের একটি ছোট বান্ডল দেয়, আর প্রতিটির আলাদা কাজ আছে।') },
        { table: {
          head: [l('Setting', 'সেটিং'), l('What it is', 'এটি কী'), l('Why the device needs it', 'কেন ডিভাইসের দরকার')],
          rows: [
            [l('IP address', 'IP ঠিকানা'), l('The device’s own address on this network.', 'এই নেটওয়ার্কে ডিভাইসের নিজের ঠিকানা।'), l('So others can send replies back to it.', 'যাতে অন্যরা তাকে উত্তর ফেরত পাঠাতে পারে।')],
            [l('Subnet mask', 'Subnet mask'), l('Marks which part of the IP is the local network.', 'IP-এর কোন অংশ লোকাল নেটওয়ার্ক তা চিহ্নিত করে।'), l('To tell "on my network" from "route via the gateway".', '"আমার নেটওয়ার্কে" আর "gateway দিয়ে রুট" আলাদা করতে।')],
            [l('Default gateway', 'Default gateway'), l('The router that leads off the local network.', 'যে router লোকাল নেটওয়ার্কের বাইরে নিয়ে যায়।'), l('To reach anything on the wider internet.', 'বিস্তৃত ইন্টারনেটের কিছুতে পৌঁছাতে।')],
            [l('DNS servers', 'DNS সার্ভার'), l('Addresses that resolve names to IPs.', 'যে ঠিকানা নামকে IP-তে রিজলভ করে।'), l('To turn google.com into an address it can dial.', 'google.com-কে ডায়াল করার মতো ঠিকানায় বদলাতে।')],
            [l('Lease time', 'Lease সময়'), l('How long this address is reserved for the device.', 'ঠিকানাটি ডিভাইসের জন্য কতক্ষণ সংরক্ষিত।'), l('So idle addresses return to the pool for reuse.', 'যাতে অব্যবহৃত ঠিকানা পুনঃব্যবহারের জন্য পুলে ফেরে।')],
          ],
        } },
        { note: l('A lease is temporary. Around halfway through it, the client quietly unicasts a DHCPREQUEST to renew — usually keeping the same address — so devices that stay connected rarely notice their lease exists at all.', 'একটি lease অস্থায়ী। এর প্রায় অর্ধেক সময়ে ক্লায়েন্ট নীরবে একটি DHCPREQUEST unicast করে renew করে—সাধারণত একই ঠিকানা রেখে—তাই সংযুক্ত থাকা ডিভাইস তাদের lease আছে কিনা তা প্রায়ই টেরই পায় না।'), kind: 'tip' },
      ],
    },
    {
      h: l('When and where to use DHCP', 'কখন ও কোথায় DHCP ব্যবহার করবেন'),
      blocks: [
        { p: l('Use DHCP for essentially all client devices — laptops, phones, tablets, IoT gadgets, guest Wi-Fi — anything that connects, disconnects, and moves between networks. For these, automatic, temporary addressing is exactly right, and it is what every home router and enterprise network does by default.', 'কার্যত সব ক্লায়েন্ট ডিভাইসের জন্য DHCP ব্যবহার করুন—ল্যাপটপ, ফোন, ট্যাবলেট, IoT গ্যাজেট, guest Wi-Fi—যা কিছু সংযুক্ত হয়, বিচ্ছিন্ন হয় ও নেটওয়ার্কের মধ্যে চলাচল করে। এদের জন্য স্বয়ংক্রিয়, অস্থায়ী অ্যাড্রেসিং ঠিক উপযুক্ত, আর প্রতিটি হোম রাউটার ও এন্টারপ্রাইজ নেটওয়ার্ক ডিফল্টভাবে এটাই করে।') },
        { p: l('Reach for a static (fixed) IP instead when a machine must always be found at the same address: servers, routers, printers, and network infrastructure. A common middle ground is a DHCP reservation — the DHCP server always hands a specific device the same address based on its MAC, giving you the stability of a static IP with the central management of DHCP.', 'বদলে একটি static (স্থির) IP নিন যখন একটি মেশিন সবসময় একই ঠিকানায় পাওয়া যেতে হবে: সার্ভার, রাউটার, প্রিন্টার ও নেটওয়ার্ক অবকাঠামো। একটি সাধারণ মাঝামাঝি পথ হলো DHCP reservation—DHCP সার্ভার একটি নির্দিষ্ট ডিভাইসকে তার MAC-এর ভিত্তিতে সবসময় একই ঠিকানা দেয়, যা static IP-এর স্থিতিশীলতা ও DHCP-এর কেন্দ্রীয় ব্যবস্থাপনা দুটোই দেয়।') },
      ],
    },
    {
      h: l('Common mistakes', 'সাধারণ ভুল'),
      blocks: [
        { list: [
          l('Running two DHCP servers on the same network by accident (for example a rogue home router plugged into an office LAN), so devices get conflicting addresses and connectivity flaps.', 'একই নেটওয়ার্কে ভুলবশত দুটি DHCP সার্ভার চালানো (যেমন একটি অফিস LAN-এ প্লাগ করা একটি অননুমোদিত হোম রাউটার), ফলে ডিভাইস সাংঘর্ষিক ঠিকানা পায় ও সংযোগ ওঠানামা করে।'),
          l('Sizing the address pool too small, so on a busy day new devices get no offer and simply cannot join the network.', 'ঠিকানা পুল খুব ছোট রাখা, ফলে ব্যস্ত দিনে নতুন ডিভাইস কোনো offer পায় না ও নেটওয়ার্কে যোগই দিতে পারে না।'),
          l('Giving a server a DHCP address instead of a static IP or reservation, so its address can change on renewal and everything pointing at it breaks.', 'একটি সার্ভারকে static IP বা reservation-এর বদলে DHCP ঠিকানা দেওয়া, ফলে renew-এ তার ঠিকানা বদলে যেতে পারে ও তার দিকে নির্দেশ করা সব ভেঙে যায়।'),
          l('Running a single DHCP server with no backup, so if it goes down no new device can get on the network.', 'কোনো ব্যাকআপ ছাড়া একটিমাত্র DHCP সার্ভার চালানো, ফলে এটি বন্ধ হলে কোনো নতুন ডিভাইস নেটওয়ার্কে উঠতে পারে না।'),
        ] },
      ],
    },
    {
      h: l('Remember in one line', 'এক লাইনে মনে রাখুন'),
      blocks: [
        { list: [
          l('DHCP auto-assigns IP, subnet mask, gateway, and DNS to a device the instant it joins a network.', 'DHCP একটি ডিভাইস নেটওয়ার্কে যোগ দেওয়ার সঙ্গে সঙ্গে IP, subnet mask, gateway ও DNS স্বয়ংক্রিয়ভাবে বরাদ্দ করে।'),
          l('The handshake is DORA: Discover → Offer → Request → Acknowledge, over UDP ports 67/68.', 'handshake হলো DORA: Discover → Offer → Request → Acknowledge, UDP port 67/68-এ।'),
          l('Use DHCP for clients; use static IPs or reservations for servers and infrastructure.', 'ক্লায়েন্টের জন্য DHCP; সার্ভার ও অবকাঠামোর জন্য static IP বা reservation।'),
        ] },
      ],
    },
  ],

  // ── cn-websocket · WebSockets & real-time ─────────────────────────────────
  'cn-websocket': [
    {
      h: l('What is a WebSocket?', 'WebSocket কী?'),
      blocks: [
        { p: l('A WebSocket is a persistent, two-way (full-duplex) communication channel between a browser and a server, opened over a single long-lived TCP connection. Once it is established, either side can send a message to the other at any moment, without waiting to be asked — which ordinary HTTP cannot do.', 'WebSocket হলো একটি ব্রাউজার ও সার্ভারের মধ্যে একটি স্থায়ী, দ্বিমুখী (full-duplex) যোগাযোগ চ্যানেল, যা একটি একক দীর্ঘস্থায়ী TCP সংযোগের ওপর খোলা হয়। একবার স্থাপিত হলে যেকোনো পক্ষ যেকোনো মুহূর্তে অন্যকে বার্তা পাঠাতে পারে, জিজ্ঞাসার অপেক্ষা না করেই—যা সাধারণ HTTP পারে না।') },
        { p: l('The problem WebSockets solve is real-time updates. Plain HTTP is request/response: the client asks and the server answers, and the server can never speak first. To fake live data over HTTP you have to poll — ask "anything new?" every second or two — which wastes bandwidth, adds latency, and hammers the server with mostly-empty replies. A WebSocket replaces all that polling with one open channel the server can push down the instant something changes.', 'WebSocket যে সমস্যা সমাধান করে তা হলো রিয়েল-টাইম আপডেট। সাধারণ HTTP হলো request/response: ক্লায়েন্ট জিজ্ঞাসা করে ও সার্ভার উত্তর দেয়, সার্ভার কখনো আগে কথা বলতে পারে না। HTTP-তে লাইভ ডেটা নকল করতে হলে poll করতে হয়—প্রতি এক-দুই সেকেন্ডে জিজ্ঞাসা "নতুন কিছু আছে?"—যা bandwidth অপচয় করে, latency যোগ করে ও বেশিরভাগ খালি উত্তর দিয়ে সার্ভারে চাপ দেয়। WebSocket সেই সব polling-কে একটি খোলা চ্যানেল দিয়ে বদলে দেয় যেখানে কিছু বদলানোর সঙ্গে সঙ্গে সার্ভার push করতে পারে।') },
        { note: l('HTTP polling is like mailing a letter every minute asking "any news yet?" A WebSocket is like keeping an open phone line: nobody re-dials, and either person can just start talking the moment there is something to say.', 'HTTP polling প্রতি মিনিটে একটি চিঠি পাঠিয়ে জিজ্ঞাসা করার মতো "কোনো খবর আছে?" WebSocket একটি খোলা ফোন লাইন রাখার মতো: কেউ আবার ডায়াল করে না, আর কিছু বলার থাকলেই যেকোনো একজন কথা বলা শুরু করতে পারে।'), kind: 'tip' },
      ],
    },
    {
      h: l('How the WebSocket upgrade works', 'WebSocket upgrade কীভাবে কাজ করে'),
      blocks: [
        { p: l('A WebSocket does not start as a WebSocket — it starts as an ordinary HTTP request that asks to be "upgraded." This lets it reuse the same ports (80 for ws://, 443 for wss://) and pass through firewalls and proxies that already allow web traffic.', 'একটি WebSocket WebSocket হিসেবে শুরু হয় না—এটি একটি সাধারণ HTTP রিকোয়েস্ট হিসেবে শুরু হয় যা "upgrade" হতে চায়। এতে এটি একই port পুনঃব্যবহার করতে পারে (ws:// এর জন্য 80, wss:// এর জন্য 443) ও ইতিমধ্যে web ট্রাফিক অনুমোদন করা firewall ও proxy-এর মধ্য দিয়ে যেতে পারে।') },
        { steps: [
          l('The client sends an HTTP GET carrying Upgrade: websocket, Connection: Upgrade, and a random Sec-WebSocket-Key.', 'ক্লায়েন্ট একটি HTTP GET পাঠায় যাতে থাকে Upgrade: websocket, Connection: Upgrade ও একটি এলোমেলো Sec-WebSocket-Key।'),
          l('If the server supports WebSockets, it replies 101 Switching Protocols and a Sec-WebSocket-Accept derived from the client’s key (proof it understood the request).', 'সার্ভার WebSocket সমর্থন করলে এটি 101 Switching Protocols ও ক্লায়েন্টের key থেকে উদ্ভূত একটি Sec-WebSocket-Accept দিয়ে উত্তর দেয় (প্রমাণ যে এটি রিকোয়েস্ট বুঝেছে)।'),
          l('From that point the same TCP socket stops speaking HTTP and becomes a WebSocket. Both sides now exchange lightweight "frames" of text or binary data.', 'সেই মুহূর্ত থেকে একই TCP socket HTTP বলা বন্ধ করে WebSocket হয়ে যায়। এখন দুই পক্ষ টেক্সট বা বাইনারি ডেটার হালকা "frame" বিনিময় করে।'),
          l('The connection stays open until either side closes it; periodic ping/pong frames keep it alive and detect a dead peer.', 'সংযোগটি খোলা থাকে যতক্ষণ না কোনো পক্ষ এটি বন্ধ করে; পর্যায়ক্রমিক ping/pong frame এটিকে সজীব রাখে ও মৃত peer শনাক্ত করে।'),
        ] },
        { code: `# 1) Client asks HTTP to upgrade this connection to a WebSocket
GET /chat HTTP/1.1
Host: example.com
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Key: dGhlIHNhbXBsZSBub25jZQ==
Sec-WebSocket-Version: 13

# 2) Server agrees and switches protocols
HTTP/1.1 101 Switching Protocols
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Accept: s3pPLMBiTxaQ9kYGzzhZRbK+xOo=

# 3) Same TCP socket is now two-way -- either side sends frames anytime
CLIENT --> SERVER   {"type":"msg","text":"hi"}
SERVER --> CLIENT   {"type":"msg","text":"a new order just arrived"}`, caption: l('One HTTP request "upgrades" into a lasting two-way channel; after the 101 there is no more request/response ceremony.', 'একটি HTTP রিকোয়েস্ট একটি স্থায়ী দ্বিমুখী চ্যানেলে "upgrade" হয়; 101-এর পর আর কোনো request/response আনুষ্ঠানিকতা নেই।') },
      ],
    },
    {
      h: l('WebSockets vs the polling alternatives', 'WebSocket বনাম polling বিকল্প'),
      blocks: [
        { p: l('WebSockets are one of several ways to get "live" data to a browser. Knowing the alternatives tells you when a WebSocket is worth its extra complexity.', 'WebSocket ব্রাউজারে "লাইভ" ডেটা আনার কয়েকটি উপায়ের একটি। বিকল্পগুলো জানলে বোঝা যায় কখন WebSocket-এর অতিরিক্ত জটিলতা মূল্যবান।') },
        { table: {
          head: [l('Technique', 'কৌশল'), l('How it works', 'কীভাবে কাজ করে'), l('Direction', 'দিক'), l('Best for', 'কার জন্য')],
          rows: [
            [l('Short polling', 'Short polling'), l('Client re-requests on a fixed timer.', 'ক্লায়েন্ট নির্দিষ্ট টাইমারে বারবার রিকোয়েস্ট করে।'), l('Client → server only', 'শুধু ক্লায়েন্ট → সার্ভার'), l('Rare, non-urgent updates.', 'বিরল, অজরুরি আপডেট।')],
            [l('Long polling', 'Long polling'), l('Server holds the request open until it has news.', 'খবর না আসা পর্যন্ত সার্ভার রিকোয়েস্ট খোলা রাখে।'), l('Server → client (delayed)', 'সার্ভার → ক্লায়েন্ট (বিলম্বিত)'), l('Near-real-time with plain HTTP.', 'সাধারণ HTTP-তে প্রায়-রিয়েল-টাইম।')],
            [l('SSE (Server-Sent Events)', 'SSE (Server-Sent Events)'), l('One long-lived HTTP stream from server.', 'সার্ভার থেকে একটি দীর্ঘস্থায়ী HTTP স্ট্রিম।'), l('Server → client only', 'শুধু সার্ভার → ক্লায়েন্ট'), l('Feeds, notifications, live scores.', 'feed, notification, লাইভ স্কোর।')],
            [l('WebSocket', 'WebSocket'), l('One socket, framed messages both ways.', 'একটি socket, দুই দিকে framed বার্তা।'), l('Full-duplex (both ways)', 'Full-duplex (দুই দিকে)'), l('Chat, games, collaborative editing.', 'চ্যাট, গেম, সহযোগী এডিটিং।')],
          ],
        } },
      ],
    },
    {
      h: l('When and where to use WebSockets', 'কখন ও কোথায় WebSocket ব্যবহার করবেন'),
      blocks: [
        { p: l('Reach for WebSockets when you need low-latency, two-way, frequent updates: chat and messaging, multiplayer games, live dashboards and trading screens, collaborative editors where several people type at once, and live location tracking. The defining trait is that the server needs to push, and it needs to push often.', 'WebSocket নিন যখন আপনার কম-latency, দ্বিমুখী, ঘন ঘন আপডেট দরকার: চ্যাট ও মেসেজিং, মাল্টিপ্লেয়ার গেম, লাইভ ড্যাশবোর্ড ও ট্রেডিং স্ক্রিন, সহযোগী এডিটর যেখানে একসঙ্গে কয়েকজন টাইপ করে, ও লাইভ লোকেশন ট্র্যাকিং। মূল বৈশিষ্ট্য হলো সার্ভারকে push করতে হবে, আর ঘন ঘন push করতে হবে।') },
        { p: l('Skip WebSockets when data changes rarely or the flow is one-directional. If the server only ever pushes (a notification feed), Server-Sent Events are simpler; if the client just fetches occasionally, a normal request is fine. A WebSocket is a stateful, long-lived connection, so paying for one to deliver an update every ten minutes is wasted overhead.', 'WebSocket এড়িয়ে যান যখন ডেটা কদাচিৎ বদলায় বা প্রবাহ একমুখী। সার্ভার শুধু push করলে (একটি notification feed) Server-Sent Events সহজতর; ক্লায়েন্ট শুধু মাঝে মাঝে fetch করলে একটি সাধারণ রিকোয়েস্টই ঠিক। একটি WebSocket একটি stateful, দীর্ঘস্থায়ী সংযোগ, তাই প্রতি দশ মিনিটে একটি আপডেট দিতে এর খরচ দেওয়া অপচয়।') },
      ],
    },
    {
      h: l('Operating WebSockets at scale', 'স্কেলে WebSocket পরিচালনা'),
      blocks: [
        { p: l('WebSockets remove polling overhead and give instant push, but the trade-off is that long-lived connections are harder to scale and load-balance than stateless HTTP. Each open socket is state living on one specific server, so you cannot freely spread a user’s messages across a fleet.', 'WebSocket polling ওভারহেড সরায় ও তাৎক্ষণিক push দেয়, তবে ট্রেড-অফ হলো দীর্ঘস্থায়ী সংযোগ stateless HTTP-এর চেয়ে স্কেল ও load-balance করা কঠিন। প্রতিটি খোলা socket একটি নির্দিষ্ট সার্ভারে থাকা state, তাই আপনি একজন ব্যবহারকারীর বার্তা অবাধে একটি fleet জুড়ে ছড়াতে পারেন না।') },
        { list: [
          l('The load balancer must understand WebSockets and keep each connection pinned to the server that owns it (sticky, connection-aware routing).', 'load balancer-কে WebSocket বুঝতে হবে ও প্রতিটি সংযোগ তার মালিক সার্ভারে আটকে রাখতে হবে (sticky, connection-aware রাউটিং)।'),
          l('To broadcast to users spread across many servers, add a pub/sub layer (like Redis) so one server’s message reaches sockets on the others.', 'অনেক সার্ভারে ছড়ানো ব্যবহারকারীদের কাছে broadcast করতে একটি pub/sub স্তর যোগ করুন (যেমন Redis) যাতে এক সার্ভারের বার্তা অন্যদের socket-এ পৌঁছায়।'),
          l('Handle reconnection on the client: connections drop when a phone changes network, so retry with backoff and resume state.', 'ক্লায়েন্টে reconnection সামলান: ফোন নেটওয়ার্ক বদলালে সংযোগ পড়ে যায়, তাই backoff-সহ retry করুন ও state পুনরায় শুরু করুন।'),
          l('Send periodic pings; idle connections are silently dropped by proxies and load balancers after a timeout.', 'পর্যায়ক্রমিক ping পাঠান; নিষ্ক্রিয় সংযোগ একটি timeout-এর পর proxy ও load balancer নীরবে ফেলে দেয়।'),
        ] },
      ],
    },
    {
      h: l('Common mistakes', 'সাধারণ ভুল'),
      blocks: [
        { list: [
          l('Opening a WebSocket for data that changes rarely, where a single request or SSE would do the job with far less overhead.', 'কদাচিৎ বদলানো ডেটার জন্য WebSocket খোলা, যেখানে একটি সাধারণ রিকোয়েস্ট বা SSE অনেক কম ওভারহেডে কাজটি করত।'),
          l('Assuming the connection is permanent — real networks drop sockets constantly, and code with no reconnection logic silently stops updating.', 'ধরে নেওয়া যে সংযোগ স্থায়ী—বাস্তব নেটওয়ার্ক ক্রমাগত socket ফেলে দেয়, আর reconnection লজিকহীন কোড নীরবে আপডেট থামিয়ে দেয়।'),
          l('Using ws:// on a page served over HTTPS — mixed content is blocked. Always use wss:// (TLS) in production.', 'HTTPS-এ পরিবেশিত পেজে ws:// ব্যবহার—mixed content ব্লক হয়। প্রোডাকশনে সবসময় wss:// (TLS) ব্যবহার করুন।'),
          l('Putting a plain HTTP load balancer in front that does not support Upgrade, so the 101 handshake never completes.', 'সামনে একটি সাধারণ HTTP load balancer রাখা যা Upgrade সমর্থন করে না, ফলে 101 handshake কখনো সম্পূর্ণ হয় না।'),
        ] },
      ],
    },
    {
      h: l('Remember in one line', 'এক লাইনে মনে রাখুন'),
      blocks: [
        { list: [
          l('A WebSocket is one long-lived TCP connection that lets client and server push messages both ways in real time.', 'WebSocket একটি দীর্ঘস্থায়ী TCP সংযোগ যা ক্লায়েন্ট ও সার্ভারকে রিয়েল-টাইমে দুই দিকে বার্তা push করতে দেয়।'),
          l('It begins as an HTTP request that returns 101 Switching Protocols, then stays open as a two-way frame channel.', 'এটি একটি HTTP রিকোয়েস্ট হিসেবে শুরু হয়ে 101 Switching Protocols ফেরত দেয়, তারপর একটি দ্বিমুখী frame চ্যানেল হিসেবে খোলা থাকে।'),
          l('Use it for chat, games, and live dashboards; skip it for rare or one-way updates, and plan for reconnects and sticky routing.', 'চ্যাট, গেম ও লাইভ ড্যাশবোর্ডে ব্যবহার করুন; বিরল বা একমুখী আপডেটে এড়িয়ে যান, আর reconnect ও sticky রাউটিং পরিকল্পনা করুন।'),
        ] },
      ],
    },
  ],

  // ── cn-loadbalancer · Load balancers ──────────────────────────────────────
  'cn-loadbalancer': [
    {
      h: l('What is a load balancer?', 'লোড ব্যালান্সার কী?'),
      blocks: [
        { p: l('A load balancer is a component that sits in front of a group of servers and spreads incoming requests across them, so no single server is overwhelmed while others sit idle. To the outside world it looks like one address; behind it, many identical servers share the work.', 'লোড ব্যালান্সার হলো একটি উপাদান যা একদল সার্ভারের সামনে বসে ও আসা রিকোয়েস্ট তাদের মধ্যে ছড়ায়, যাতে কোনো একটি সার্ভার অতিরিক্ত চাপে না পড়ে যখন অন্যরা অলস বসে থাকে। বাইরের জগতের কাছে এটি একটি ঠিকানার মতো দেখায়; এর পেছনে অনেকগুলো একই রকম সার্ভার কাজ ভাগ করে নেয়।') },
        { p: l('The problem it solves is that one server can only handle so much traffic, and if it dies, everything behind that address goes down with it. A load balancer fixes both: it lets you scale horizontally (add more servers to handle more load) and it provides failover (if one server fails a health check, traffic simply routes to the healthy ones). It is the foundation of almost every system that must stay fast and available under real traffic.', 'যে সমস্যা এটি সমাধান করে তা হলো একটি সার্ভার সীমিত ট্রাফিক সামলাতে পারে, আর এটি মরে গেলে সেই ঠিকানার পেছনের সবকিছু এর সঙ্গে বন্ধ হয়ে যায়। লোড ব্যালান্সার দুটোই ঠিক করে: এটি আপনাকে horizontally স্কেল করতে দেয় (বেশি লোড সামলাতে আরও সার্ভার যোগ) ও failover দেয় (একটি সার্ভার health check ফেল করলে ট্রাফিক সুস্থগুলোতে রুট হয়)। বাস্তব ট্রাফিকে দ্রুত ও সচল থাকা প্রায় প্রতিটি সিস্টেমের ভিত্তি এটি।') },
        { note: l('A load balancer is like the host at a busy restaurant. Guests arrive at one door, and the host seats them evenly across the waiters so no single waiter is swamped while another stands around. If a waiter goes on break, the host simply stops sending them tables.', 'লোড ব্যালান্সার একটি ব্যস্ত রেস্তোরাঁর হোস্টের মতো। অতিথিরা একটি দরজায় আসে, আর হোস্ট তাদের ওয়েটারদের মধ্যে সমানভাবে বসায় যাতে একজন ওয়েটার চাপে না পড়ে যখন আরেকজন দাঁড়িয়ে থাকে। একজন ওয়েটার বিরতিতে গেলে হোস্ট শুধু তাকে টেবিল পাঠানো বন্ধ করে।'), kind: 'tip' },
      ],
    },
    {
      h: l('How a load balancer works', 'লোড ব্যালান্সার কীভাবে কাজ করে'),
      blocks: [
        { steps: [
          l('A client resolves your domain and connects to the load balancer’s address — it never talks to a backend server directly.', 'একটি ক্লায়েন্ট আপনার domain রিজলভ করে ও load balancer-এর ঠিকানায় সংযুক্ত হয়—এটি কখনো সরাসরি একটি backend সার্ভারের সঙ্গে কথা বলে না।'),
          l('The load balancer looks at its pool of backends and the results of its health checks, keeping only the healthy ones as candidates.', 'load balancer তার backend-এর পুল ও তার health check-এর ফলাফল দেখে, শুধু সুস্থগুলোকে প্রার্থী হিসেবে রাখে।'),
          l('It applies a balancing algorithm (round-robin, least-connections, and so on) to choose one backend.', 'এটি একটি balancing অ্যালগরিদম প্রয়োগ করে (round-robin, least-connections ইত্যাদি) একটি backend বাছতে।'),
          l('It forwards the request to that backend, gets the response, and returns it to the client — often adding a header like X-Forwarded-For so the backend knows the real client IP.', 'এটি সেই backend-এ রিকোয়েস্ট পাঠায়, রেসপন্স নেয় ও ক্লায়েন্টকে ফেরত দেয়—প্রায়ই X-Forwarded-For-এর মতো একটি header যোগ করে যাতে backend আসল ক্লায়েন্ট IP জানে।'),
          l('A background health check keeps probing each backend; one that fails is pulled from rotation until it recovers.', 'একটি background health check প্রতিটি backend যাচাই করতে থাকে; যেটি ফেল করে তা সুস্থ না হওয়া পর্যন্ত rotation থেকে বাদ যায়।'),
        ] },
        { code: `# nginx as an L7 load balancer with health checks
upstream app_servers {
    least_conn;                                   # pick the backend with fewest active connections
    server 10.0.0.11:8080 max_fails=3 fail_timeout=30s;
    server 10.0.0.12:8080 max_fails=3 fail_timeout=30s;
    server 10.0.0.13:8080 backup;                 # only used when the others are down
}

server {
    listen 443 ssl;                               # TLS terminates on the load balancer
    location / {
        proxy_pass http://app_servers;            # forward each request to a healthy backend
        proxy_set_header X-Forwarded-For $remote_addr;
    }
}`, caption: l('One public address, three backends, and a rule for choosing between them — add a fourth server and it joins the pool.', 'একটি পাবলিক ঠিকানা, তিনটি backend ও তাদের মধ্যে বাছার একটি নিয়ম—একটি চতুর্থ সার্ভার যোগ করলে তা পুলে যোগ দেয়।') },
      ],
    },
    {
      h: l('L4 vs L7 load balancing', 'L4 বনাম L7 লোড ব্যালান্সিং'),
      blocks: [
        { p: l('Load balancers operate at one of two layers of the network stack, and the layer decides how much they can "see" about a request.', 'লোড ব্যালান্সার নেটওয়ার্ক স্ট্যাকের দুটি স্তরের একটিতে কাজ করে, আর স্তরটি ঠিক করে তারা একটি রিকোয়েস্ট সম্পর্কে কতটা "দেখতে" পারে।') },
        { table: {
          head: [l('Aspect', 'দিক'), l('L4 (Transport)', 'L4 (Transport)'), l('L7 (Application)', 'L7 (Application)')],
          rows: [
            [l('Works on', 'কাজ করে'), l('TCP/UDP connections, IPs and ports', 'TCP/UDP সংযোগ, IP ও port'), l('HTTP requests — URLs, headers, cookies', 'HTTP রিকোয়েস্ট—URL, header, cookie')],
            [l('Can route by', 'রুট করে যা দিয়ে'), l('Just source/destination address and port', 'শুধু source/destination ঠিকানা ও port'), l('Path, hostname, cookie, header content', 'path, hostname, cookie, header বিষয়বস্তু')],
            [l('Overhead', 'ওভারহেড'), l('Very low — it does not read the payload', 'খুব কম—এটি payload পড়ে না'), l('Higher — it parses each request', 'বেশি—এটি প্রতিটি রিকোয়েস্ট পার্স করে')],
            [l('TLS', 'TLS'), l('Passes encrypted traffic straight through', 'এনক্রিপ্টেড ট্রাফিক সরাসরি পার করে দেয়'), l('Can terminate TLS and inspect content', 'TLS terminate করে বিষয়বস্তু দেখতে পারে')],
            [l('Use when', 'কখন ব্যবহার'), l('Raw speed, any protocol, simple spreading', 'কাঁচা গতি, যেকোনো protocol, সরল ছড়ানো'), l('Smart routing, one entry for many services', 'স্মার্ট রাউটিং, অনেক সেবার এক প্রবেশদ্বার')],
          ],
        } },
      ],
    },
    {
      h: l('Common balancing algorithms', 'সাধারণ balancing অ্যালগরিদম'),
      blocks: [
        { p: l('Once the healthy backends are known, an algorithm decides which one gets the next request. The right choice depends on how uniform your servers and requests are.', 'সুস্থ backend জানা হলে একটি অ্যালগরিদম ঠিক করে পরের রিকোয়েস্ট কোনটি পাবে। সঠিক পছন্দ নির্ভর করে আপনার সার্ভার ও রিকোয়েস্ট কতটা একরকম তার ওপর।') },
        { table: {
          head: [l('Algorithm', 'অ্যালগরিদম'), l('How it picks a backend', 'কীভাবে backend বাছে'), l('Best when', 'কখন সেরা')],
          rows: [
            [l('Round-robin', 'Round-robin'), l('Each new request goes to the next server in order, cycling around.', 'প্রতিটি নতুন রিকোয়েস্ট ক্রমে পরের সার্ভারে যায়, চক্রাকারে।'), l('Servers and requests are roughly equal.', 'সার্ভার ও রিকোয়েস্ট মোটামুটি সমান।')],
            [l('Weighted round-robin', 'Weighted round-robin'), l('Like round-robin, but stronger servers get a bigger share.', 'round-robin-এর মতো, তবে শক্তিশালী সার্ভার বেশি ভাগ পায়।'), l('Servers have different capacities.', 'সার্ভারের ক্ষমতা ভিন্ন।')],
            [l('Least connections', 'Least connections'), l('Sends to the server currently handling the fewest active connections.', 'বর্তমানে সবচেয়ে কম active সংযোগ সামলানো সার্ভারে পাঠায়।'), l('Requests vary a lot in duration.', 'রিকোয়েস্টের সময়কাল অনেক ভিন্ন।')],
            [l('IP hash', 'IP hash'), l('Hashes the client IP so one client keeps hitting the same server.', 'ক্লায়েন্ট IP hash করে যাতে এক ক্লায়েন্ট একই সার্ভারে যায়।'), l('You need session stickiness.', 'session stickiness দরকার।')],
            [l('Least response time', 'Least response time'), l('Favours the server answering fastest right now.', 'এখন সবচেয়ে দ্রুত উত্তর দেওয়া সার্ভারকে অগ্রাধিকার দেয়।'), l('Latency matters and servers vary.', 'latency গুরুত্বপূর্ণ ও সার্ভার ভিন্ন।')],
          ],
        } },
      ],
    },
    {
      h: l('When and where to use a load balancer', 'কখন ও কোথায় লোড ব্যালান্সার ব্যবহার করবেন'),
      blocks: [
        { p: l('Put a load balancer in front of any service that runs on more than one server, or that you ever intend to. It is what lets you add capacity without changing the address clients use, roll out new versions by draining and replacing servers one at a time, and survive a single server failing at 3 a.m. Use health checks so it automatically skips instances that are unhealthy.', 'একাধিক সার্ভারে চলা—বা কখনো চালানোর ইচ্ছা আছে এমন—যেকোনো সেবার সামনে একটি লোড ব্যালান্সার রাখুন। এটাই আপনাকে ক্লায়েন্টের ব্যবহৃত ঠিকানা না বদলে ক্ষমতা যোগ করতে, একে একে সার্ভার drain ও প্রতিস্থাপন করে নতুন সংস্করণ ছাড়তে, ও রাত ৩টায় একটি সার্ভার ফেল হলেও টিকে থাকতে দেয়। health check ব্যবহার করুন যাতে এটি স্বয়ংক্রিয়ভাবে অসুস্থ ইনস্ট্যান্স এড়ায়।') },
        { p: l('The trade-off is that the load balancer itself becomes a critical component — if it goes down, everything behind it is unreachable, even if every backend is healthy. So in production you run it in a redundant pair (active/passive or active/active) rather than as a lone box, keeping it from becoming a single point of failure.', 'ট্রেড-অফ হলো লোড ব্যালান্সার নিজেই একটি সংকটপূর্ণ উপাদান হয়ে ওঠে—এটি বন্ধ হলে প্রতিটি backend সুস্থ থাকলেও এর পেছনের সবকিছু অপৌঁছনীয়। তাই প্রোডাকশনে একে একক বাক্স হিসেবে না চালিয়ে একটি redundant জোড়ায় (active/passive বা active/active) চালান, যাতে এটি একক ব্যর্থতা-বিন্দু না হয়।') },
      ],
    },
    {
      h: l('Common mistakes', 'সাধারণ ভুল'),
      blocks: [
        { list: [
          l('Treating the load balancer as a single point of failure with no backup — one box down takes the whole service offline.', 'লোড ব্যালান্সারকে ব্যাকআপ ছাড়া একক ব্যর্থতা-বিন্দু হিসেবে রাখা—একটি বাক্স বন্ধ হলে পুরো সেবা অফলাইন।'),
          l('Skipping or misconfiguring health checks, so the balancer keeps sending traffic to a dead or broken backend.', 'health check বাদ দেওয়া বা ভুল কনফিগার করা, ফলে balancer একটি মৃত বা ভাঙা backend-এ ট্রাফিক পাঠাতে থাকে।'),
          l('Storing session state on individual servers without stickiness or shared storage, so a user logged in on server A breaks when routed to server B.', 'stickiness বা shared storage ছাড়া আলাদা সার্ভারে session state রাখা, ফলে সার্ভার A-তে লগইন করা ব্যবহারকারী সার্ভার B-তে রুট হলে ভেঙে যায়।'),
          l('Picking the wrong algorithm — plain round-robin across servers with very uneven request durations piles slow requests onto one box.', 'ভুল অ্যালগরিদম বাছা—অত্যন্ত অসম রিকোয়েস্ট-সময়কালের সার্ভারে সাধারণ round-robin ধীর রিকোয়েস্ট এক বাক্সে জমায়।'),
        ] },
      ],
    },
    {
      h: l('Remember in one line', 'এক লাইনে মনে রাখুন'),
      blocks: [
        { list: [
          l('A load balancer spreads requests across many servers, giving you scale and failover behind one address.', 'লোড ব্যালান্সার অনেক সার্ভারে রিকোয়েস্ট ছড়ায়, এক ঠিকানার পেছনে স্কেল ও failover দেয়।'),
          l('L4 balances fast on IPs/ports; L7 reads HTTP and routes by path, host, or cookie.', 'L4 IP/port-এ দ্রুত ব্যালান্স করে; L7 HTTP পড়ে ও path, host বা cookie দিয়ে রুট করে।'),
          l('Choose an algorithm (round-robin, least-connections), use health checks, and never run just one.', 'একটি অ্যালগরিদম বাছুন (round-robin, least-connections), health check ব্যবহার করুন, আর কখনো শুধু একটি চালাবেন না।'),
        ] },
      ],
    },
  ],

  // ── cn-cdn · CDNs & edge caching ──────────────────────────────────────────
  'cn-cdn': [
    {
      h: l('What is a CDN?', 'CDN কী?'),
      blocks: [
        { p: l('A CDN (Content Delivery Network) is a network of servers spread across many geographic locations that keep cached copies of your static content — images, scripts, stylesheets, video — close to your users. A request is answered by a nearby "edge" server instead of travelling all the way to your single origin server.', 'CDN (Content Delivery Network) হলো বহু ভৌগোলিক স্থানে ছড়ানো সার্ভারের একটি নেটওয়ার্ক যা আপনার স্ট্যাটিক কন্টেন্টের—ছবি, স্ক্রিপ্ট, স্টাইলশিট, ভিডিও—ক্যাশড কপি ব্যবহারকারীর কাছে রাখে। একটি রিকোয়েস্টের উত্তর দেয় কাছের একটি "edge" সার্ভার, আপনার একমাত্র origin সার্ভার পর্যন্ত না গিয়ে।') },
        { p: l('The problem a CDN solves is distance and load. Data cannot travel faster than light, so a user in Dhaka fetching a file from a server in Virginia waits for a round trip halfway around the world — often 200ms or more, multiplied by every asset on the page. On top of that, every one of those requests hammering your single origin ties up its bandwidth and CPU. A CDN cuts the latency by serving from nearby and shields the origin by absorbing most of the traffic at the edge.', 'CDN যে সমস্যা সমাধান করে তা হলো দূরত্ব ও লোড। ডেটা আলোর চেয়ে দ্রুত যেতে পারে না, তাই ঢাকার একজন ব্যবহারকারী ভার্জিনিয়ার সার্ভার থেকে একটি ফাইল আনলে অর্ধেক পৃথিবী ঘুরে একটি round trip-এর জন্য অপেক্ষা করে—প্রায়ই ২০০ms বা বেশি, পেজের প্রতিটি অ্যাসেট দিয়ে গুণিত। এর ওপর সেই প্রতিটি রিকোয়েস্ট আপনার একমাত্র origin-এ আঘাত করে তার bandwidth ও CPU আটকে রাখে। CDN কাছ থেকে পরিবেশন করে latency কমায় ও edge-এ বেশিরভাগ ট্রাফিক শুষে নিয়ে origin-কে রক্ষা করে।') },
        { note: l('A CDN is like a chain of local warehouses. Instead of shipping every popular item from one central factory, a company stocks it in a warehouse in each region, so customers get next-day delivery instead of a week-long wait. The edge server is your neighbourhood warehouse for content.', 'CDN স্থানীয় গুদামের একটি শৃঙ্খলের মতো। প্রতিটি জনপ্রিয় পণ্য একটি কেন্দ্রীয় কারখানা থেকে না পাঠিয়ে একটি কোম্পানি প্রতিটি অঞ্চলের গুদামে তা মজুত করে, তাই গ্রাহক এক সপ্তাহের অপেক্ষার বদলে পরদিন ডেলিভারি পায়। edge সার্ভার হলো কন্টেন্টের জন্য আপনার পাড়ার গুদাম।'), kind: 'tip' },
      ],
    },
    {
      h: l('How a CDN serves a request', 'CDN কীভাবে একটি রিকোয়েস্ট পরিবেশন করে'),
      blocks: [
        { steps: [
          l('DNS resolves the CDN’s hostname to the IP of the edge server closest to the user (often via anycast, where the same IP is announced from many locations).', 'DNS CDN-এর hostname-কে ব্যবহারকারীর সবচেয়ে কাছের edge সার্ভারের IP-তে রিজলভ করে (প্রায়ই anycast দিয়ে, যেখানে একই IP বহু স্থান থেকে ঘোষণা করা হয়)।'),
          l('The request reaches that nearby edge, not your origin.', 'রিকোয়েস্টটি সেই কাছের edge-এ পৌঁছায়, আপনার origin-এ নয়।'),
          l('The edge checks its cache. On a cache HIT it returns the copy immediately — the fast path.', 'edge তার cache যাচাই করে। cache HIT-এ এটি সঙ্গে সঙ্গে কপি ফেরত দেয়—দ্রুত পথ।'),
          l('On a cache MISS (nothing cached, or the copy expired) the edge fetches once from the origin, returns it, and stores it for the next visitor.', 'cache MISS-এ (কিছু cache নেই, বা কপির মেয়াদ শেষ) edge একবার origin থেকে আনে, ফেরত দেয় ও পরের দর্শকের জন্য রেখে দেয়।'),
          l('Every later user in that region is served straight from the edge until the content’s TTL (time-to-live) expires.', 'সেই অঞ্চলের পরবর্তী প্রতিটি ব্যবহারকারী কন্টেন্টের TTL (time-to-live) শেষ না হওয়া পর্যন্ত সরাসরি edge থেকে পরিবেশিত হয়।'),
        ] },
        { code: `# Tell the CDN how long an asset may be cached
# (a versioned filename can be cached effectively forever)
Cache-Control: public, max-age=31536000, immutable

# Inspect what the edge actually did with a request
$ curl -I https://cdn.example.com/app.9f2c.js
HTTP/2 200
cache-control: public, max-age=31536000, immutable
age: 842            # seconds this copy has already lived on the edge
x-cache: HIT        # served from the edge cache -- the origin was never touched`, caption: l('The Cache-Control header sets the rules; the x-cache: HIT / MISS response header tells you whether the edge or the origin answered.', 'Cache-Control header নিয়ম ঠিক করে; x-cache: HIT / MISS রেসপন্স header বলে edge নাকি origin উত্তর দিয়েছে।') },
      ],
    },
    {
      h: l('Key CDN terms', 'মূল CDN পরিভাষা'),
      blocks: [
        { table: {
          head: [l('Term', 'পরিভাষা'), l('What it means', 'অর্থ')],
          rows: [
            [l('Origin', 'Origin'), l('Your own server — the single source of truth the CDN pulls from.', 'আপনার নিজের সার্ভার—একমাত্র সত্যের উৎস যা থেকে CDN টানে।')],
            [l('Edge / PoP', 'Edge / PoP'), l('A CDN server near users (a Point of Presence) that holds cached copies.', 'ব্যবহারকারীর কাছের একটি CDN সার্ভার (Point of Presence) যা ক্যাশড কপি রাখে।')],
            [l('Cache hit', 'Cache hit'), l('The edge already had a fresh copy and served it — fast, origin untouched.', 'edge-এর কাছে ইতিমধ্যে টাটকা কপি ছিল ও পরিবেশন করল—দ্রুত, origin অস্পর্শিত।')],
            [l('Cache miss', 'Cache miss'), l('The edge had no fresh copy and had to fetch from the origin once.', 'edge-এর টাটকা কপি ছিল না ও একবার origin থেকে আনতে হলো।')],
            [l('TTL', 'TTL'), l('How long a cached copy is considered fresh before it must be re-fetched.', 'একটি ক্যাশড কপি পুনরায় আনার আগে কতক্ষণ টাটকা ধরা হয়।')],
            [l('Purge / invalidate', 'Purge / invalidate'), l('Forcibly deleting cached copies so the edge re-fetches — slow and global.', 'ক্যাশড কপি জোর করে মুছে ফেলা যাতে edge পুনরায় আনে—ধীর ও গ্লোবাল।')],
          ],
        } },
      ],
    },
    {
      h: l('What to cache — and what never to', 'কী cache করবেন—আর কী কখনো নয়'),
      blocks: [
        { list: [
          l('Cache static assets — images, video, CSS, JS, fonts, downloads. They are identical for every user and change rarely, so they are ideal edge content.', 'স্ট্যাটিক অ্যাসেট cache করুন—ছবি, ভিডিও, CSS, JS, ফন্ট, ডাউনলোড। এরা প্রতিটি ব্যবহারকারীর জন্য একই ও কদাচিৎ বদলায়, তাই আদর্শ edge কন্টেন্ট।'),
          l('Cache semi-dynamic responses that are the same for everyone (a public product listing) for a short TTL.', 'সবার জন্য একই এমন সেমি-ডাইনামিক রেসপন্স (একটি পাবলিক প্রোডাক্ট তালিকা) অল্প TTL-এ cache করুন।'),
          l('Never cache private, user-specific pages on the shared edge — a logged-in dashboard, an account page, anything personalized.', 'শেয়ার্ড edge-এ প্রাইভেট, ব্যবহারকারী-নির্দিষ্ট পেজ কখনো cache করবেন না—একটি লগইন ড্যাশবোর্ড, অ্যাকাউন্ট পেজ, যেকোনো পার্সোনালাইজড কিছু।'),
          l('Version your asset URLs (app.9f2c.js) so a new deploy is a new filename — the CDN treats it as brand-new and you never serve a stale file.', 'অ্যাসেট URL-এ ভার্সন দিন (app.9f2c.js) যাতে একটি নতুন deploy একটি নতুন ফাইলনাম হয়—CDN একে নতুন ধরে ও আপনি কখনো পুরনো ফাইল দেন না।'),
        ] },
        { note: l('Caching a personalized page on a shared CDN can serve one user’s data to the next visitor. Mark private responses with Cache-Control: private or no-store so the edge never keeps them.', 'শেয়ার্ড CDN-এ একটি পার্সোনালাইজড পেজ cache করলে এক ব্যবহারকারীর ডেটা পরের দর্শককে দেওয়া হতে পারে। প্রাইভেট রেসপন্সে Cache-Control: private বা no-store দিন যাতে edge কখনো তা না রাখে।'), kind: 'warn' },
      ],
    },
    {
      h: l('When and where to use a CDN', 'কখন ও কোথায় CDN ব্যবহার করবেন'),
      blocks: [
        { p: l('Use a CDN whenever you serve static assets to users spread across regions, deliver images or video, expect traffic spikes, or want to offload and protect your origin. Serve images, scripts, and video from the CDN and set explicit cache headers so the edge can hold content longer. Modern CDNs also absorb DDoS attacks and offer TLS at the edge, so even small sites benefit.', 'CDN ব্যবহার করুন যখন আপনি অঞ্চলজুড়ে ছড়ানো ব্যবহারকারীদের স্ট্যাটিক অ্যাসেট দেন, ছবি বা ভিডিও দেন, ট্রাফিক স্পাইক আশা করেন, অথবা origin-কে হালকা ও রক্ষা করতে চান। ছবি, স্ক্রিপ্ট ও ভিডিও CDN থেকে পরিবেশন করুন ও স্পষ্ট cache header সেট করুন যাতে edge কন্টেন্ট বেশিক্ষণ রাখে। আধুনিক CDN DDoS আক্রমণও শুষে নেয় ও edge-এ TLS দেয়, তাই ছোট সাইটও উপকৃত হয়।') },
        { p: l('A CDN helps less when almost every response is dynamic and personalized, or all your users sit in one city near your origin — there is little shareable content to cache. Even then, the truly static assets (logo, CSS, JS bundle) still benefit, so a CDN is rarely a bad idea; it is just less impactful.', 'CDN কম সাহায্য করে যখন প্রায় প্রতিটি রেসপন্স ডাইনামিক ও পার্সোনালাইজড, বা আপনার সব ব্যবহারকারী origin-এর কাছে এক শহরে—cache করার মতো শেয়ারযোগ্য কন্টেন্ট কম। তবুও সত্যিকারের স্ট্যাটিক অ্যাসেট (লোগো, CSS, JS bundle) উপকৃত হয়, তাই CDN কদাচিৎ খারাপ সিদ্ধান্ত; শুধু কম প্রভাবশালী।') },
      ],
    },
    {
      h: l('Common mistakes', 'সাধারণ ভুল'),
      blocks: [
        { list: [
          l('Caching dynamic, user-specific pages on a CDN and serving one user’s private data to another — the most dangerous CDN mistake.', 'ডাইনামিক, ব্যবহারকারী-নির্দিষ্ট পেজ CDN-এ cache করে এক ব্যবহারকারীর প্রাইভেট ডেটা অন্যকে দেওয়া—সবচেয়ে বিপজ্জনক CDN ভুল।'),
          l('Shipping assets without versioned URLs, so after every deploy you fight stale caches and users see old files.', 'ভার্সনড URL ছাড়া অ্যাসেট পাঠানো, ফলে প্রতিটি deploy-এর পর পুরনো cache-এর সঙ্গে লড়তে হয় ও ব্যবহারকারী পুরনো ফাইল দেখে।'),
          l('Relying on purge/invalidation as a routine tool — it is slow and global; prefer versioning and let old files simply expire.', 'purge/invalidation-কে নিয়মিত হাতিয়ার হিসেবে ভরসা করা—এটি ধীর ও গ্লোবাল; versioning নিন ও পুরনো ফাইল এমনিতেই মেয়াদ শেষ হতে দিন।'),
          l('Expecting a CDN to speed up everything — it only speeds cacheable static content; a slow database query or personalized page stays slow.', 'CDN সবকিছু দ্রুত করবে এমন আশা করা—এটি শুধু cache-যোগ্য স্ট্যাটিক কন্টেন্ট দ্রুত করে; একটি ধীর ডেটাবেস কুয়েরি বা পার্সোনালাইজড পেজ ধীরই থাকে।'),
        ] },
      ],
    },
    {
      h: l('Remember in one line', 'এক লাইনে মনে রাখুন'),
      blocks: [
        { list: [
          l('A CDN caches static content on edge servers near users, cutting latency and shielding your origin from load.', 'CDN স্ট্যাটিক কন্টেন্ট ব্যবহারকারীর কাছের edge সার্ভারে cache করে, latency কমায় ও origin-কে লোড থেকে রক্ষা করে।'),
          l('Cache hit = served fast from the edge; cache miss = one fetch from origin, then cached for the TTL.', 'cache hit = edge থেকে দ্রুত পরিবেশিত; cache miss = origin থেকে একবার আনা, তারপর TTL পর্যন্ত cached।'),
          l('Cache static assets and version your URLs; never cache private, per-user data on the shared edge.', 'স্ট্যাটিক অ্যাসেট cache করুন ও URL-এ ভার্সন দিন; শেয়ার্ড edge-এ প্রাইভেট, প্রতি-ব্যবহারকারী ডেটা কখনো নয়।'),
        ] },
      ],
    },
  ],

  // ── cn-proxy · Proxies & reverse proxies ──────────────────────────────────
  'cn-proxy': [
    {
      h: l('What is a proxy?', 'প্রক্সি কী?'),
      blocks: [
        { p: l('A proxy is a server that sits in the middle of a conversation between clients and servers, forwarding requests and responses on someone’s behalf. The key question for any proxy is whose behalf: a forward proxy fronts the clients (it represents the users), while a reverse proxy fronts the servers (it represents the backend).', 'প্রক্সি হলো একটি সার্ভার যা ক্লায়েন্ট ও সার্ভারের কথোপকথনের মাঝে বসে, কারো পক্ষে রিকোয়েস্ট ও রেসপন্স ফরোয়ার্ড করে। যেকোনো প্রক্সির মূল প্রশ্ন হলো কার পক্ষে: একটি forward proxy ক্লায়েন্টের সামনে থাকে (এটি ব্যবহারকারীদের প্রতিনিধি), আর একটি reverse proxy সার্ভারের সামনে থাকে (এটি backend-এর প্রতিনিধি)।') },
        { p: l('The problem proxies solve is that you often want a controlled middle point rather than letting clients and servers talk directly. That middle point is where you can add caching, filtering, security, load balancing, TLS, and logging in one place — instead of building all of it into every client or every backend. Which side the proxy stands in front of decides what job it does.', 'প্রক্সি যে সমস্যা সমাধান করে তা হলো ক্লায়েন্ট ও সার্ভারকে সরাসরি কথা বলতে না দিয়ে প্রায়ই একটি নিয়ন্ত্রিত মধ্যবিন্দু চান। সেই মধ্যবিন্দুতেই আপনি caching, filtering, নিরাপত্তা, load balancing, TLS ও logging এক জায়গায় যোগ করতে পারেন—প্রতিটি ক্লায়েন্ট বা প্রতিটি backend-এ তা না বানিয়ে। প্রক্সি কোন পাশের সামনে দাঁড়ায় তা ঠিক করে এটি কী কাজ করে।') },
        { note: l('A reverse proxy is like a receptionist at a company. Every visitor talks to the receptionist, who decides which office (backend) handles each request, fetches the answer, and hands it back. Outsiders never see the offices behind the desk — they only ever meet the receptionist.', 'একটি reverse proxy একটি কোম্পানির রিসেপশনিস্টের মতো। প্রতিটি দর্শক রিসেপশনিস্টের সঙ্গে কথা বলে, যিনি ঠিক করেন কোন অফিস (backend) প্রতিটি অনুরোধ সামলাবে, উত্তর আনেন ও ফেরত দেন। বাইরের লোক ডেস্কের পেছনের অফিস কখনো দেখে না—তারা শুধু রিসেপশনিস্টের সঙ্গেই দেখা করে।'), kind: 'tip' },
      ],
    },
    {
      h: l('Forward proxy vs reverse proxy', 'Forward proxy বনাম reverse proxy'),
      blocks: [
        { p: l('The two look similar on a diagram — a box in the middle — but they face opposite directions and serve opposite owners. This is the single most confused point about proxies, so it is worth pinning down.', 'দুটি একটি ডায়াগ্রামে একই রকম দেখায়—মাঝে একটি বাক্স—তবে এরা বিপরীত দিকে মুখ করে ও বিপরীত মালিকদের সেবা করে। প্রক্সি নিয়ে এটাই সবচেয়ে বিভ্রান্তিকর বিন্দু, তাই এটি স্পষ্ট করা জরুরি।') },
        { table: {
          head: [l('Aspect', 'দিক'), l('Forward proxy', 'Forward proxy'), l('Reverse proxy', 'Reverse proxy')],
          rows: [
            [l('Stands in front of', 'যার সামনে দাঁড়ায়'), l('The clients', 'ক্লায়েন্ট'), l('The servers', 'সার্ভার')],
            [l('Acts on behalf of', 'যার পক্ষে কাজ করে'), l('The user making the request', 'রিকোয়েস্ট করা ব্যবহারকারী'), l('The backend answering it', 'উত্তর দেওয়া backend')],
            [l('The server sees', 'সার্ভার যা দেখে'), l('The proxy’s IP, not the real client', 'প্রক্সির IP, আসল ক্লায়েন্ট নয়'), l('The proxy is the server, to the client', 'ক্লায়েন্টের কাছে প্রক্সিই সার্ভার')],
            [l('Typical uses', 'সাধারণ ব্যবহার'), l('Filtering, access control, anonymity, caching for a group', 'filtering, access control, anonymity, একটি গ্রুপের জন্য caching'), l('TLS termination, routing, caching, hiding backends, load balancing', 'TLS termination, রাউটিং, caching, backend লুকানো, load balancing')],
            [l('Example', 'উদাহরণ'), l('A corporate/school web filter', 'একটি কর্পোরেট/স্কুল web filter'), l('nginx or a CDN in front of your app', 'আপনার অ্যাপের সামনে nginx বা একটি CDN')],
          ],
        } },
      ],
    },
    {
      h: l('How a reverse proxy handles a request', 'reverse proxy কীভাবে একটি রিকোয়েস্ট সামলায়'),
      blocks: [
        { p: l('Because the reverse proxy is the only thing clients ever connect to, it can do real work on the request before, and after, it reaches a backend. Follow one request through it and every job a reverse proxy performs falls out naturally.', 'যেহেতু reverse proxy-ই একমাত্র জিনিস যার সঙ্গে ক্লায়েন্ট সংযুক্ত হয়, এটি একটি backend-এ পৌঁছানোর আগে ও পরে রিকোয়েস্টে আসল কাজ করতে পারে। এর মধ্য দিয়ে একটি রিকোয়েস্ট অনুসরণ করুন আর reverse proxy যে প্রতিটি কাজ করে তা স্বাভাবিকভাবেই বেরিয়ে আসে।') },
        { steps: [
          l('The client connects to the reverse proxy’s public address, believing it is talking to the application itself.', 'ক্লায়েন্ট reverse proxy-এর পাবলিক ঠিকানায় সংযুক্ত হয়, ভেবে যে এটি অ্যাপ্লিকেশনের সঙ্গেই কথা বলছে।'),
          l('The proxy terminates TLS (decrypts HTTPS here) so the backends can speak plain HTTP internally.', 'প্রক্সি TLS terminate করে (এখানে HTTPS ডিক্রিপ্ট করে) যাতে backend-গুলো অভ্যন্তরীণভাবে সাধারণ HTTP বলতে পারে।'),
          l('It inspects the request (path, host, headers) and applies rules — caching, rate limits, routing.', 'এটি রিকোয়েস্ট (path, host, header) পরীক্ষা করে ও নিয়ম প্রয়োগ করে—caching, rate limit, রাউটিং।'),
          l('It forwards the request to the right backend service, chosen by URL or hostname.', 'এটি URL বা hostname দিয়ে বাছাই করা সঠিক backend সেবায় রিকোয়েস্ট ফরোয়ার্ড করে।'),
          l('It relays the backend’s response to the client — which never learns which backend, or how many, answered.', 'এটি backend-এর রেসপন্স ক্লায়েন্টকে পাঠায়—যে কখনো জানে না কোন backend, বা কতগুলো, উত্তর দিয়েছে।'),
        ] },
        { code: `# nginx as a reverse proxy: one public door, many hidden backends
server {
    listen 443 ssl;                            # TLS terminates here, not on the apps
    server_name shop.example.com;

    location /api/ {
        proxy_pass http://10.0.0.21:9000;      # route /api requests to the API service
    }
    location /images/ {
        proxy_pass http://10.0.0.22:8080;      # route /images to the media service
        proxy_cache assets;                    # and cache the responses here
    }
    location / {
        proxy_pass http://10.0.0.23:3000;      # everything else to the web app
    }
}`, caption: l('One hostname and TLS cert out front; three separate backend services hidden behind it, split by URL path.', 'সামনে একটি hostname ও TLS cert; এর পেছনে URL path দিয়ে ভাগ করা তিনটি আলাদা backend সেবা লুকানো।') },
      ],
    },
    {
      h: l('What a reverse proxy gives you', 'reverse proxy আপনাকে যা দেয়'),
      blocks: [
        { list: [
          l('TLS termination — handle HTTPS and certificates in one place instead of on every backend.', 'TLS termination—প্রতিটি backend-এ না করে HTTPS ও সার্টিফিকেট এক জায়গায় সামলান।'),
          l('Routing — send /api to one service and /images to another, presenting many services as one site.', 'রাউটিং—/api এক সেবায় ও /images আরেকটিতে পাঠান, অনেক সেবাকে একটি সাইট হিসেবে দেখান।'),
          l('Caching and compression — store and gzip common responses at the edge of your system to cut backend work.', 'caching ও compression—backend-এর কাজ কমাতে সাধারণ রেসপন্স আপনার সিস্টেমের প্রান্তে জমান ও gzip করুন।'),
          l('Load balancing — spread requests across a pool of identical backends (a reverse proxy is often the load balancer).', 'load balancing—একটি পুলের একই backend-এ রিকোয়েস্ট ছড়ান (reverse proxy প্রায়ই load balancer)।'),
          l('Security and hiding topology — a single hardened entry point that shields backend addresses and applies rate limits and filtering.', 'নিরাপত্তা ও টপোলজি লুকানো—একটি শক্ত প্রবেশদ্বার যা backend ঠিকানা আড়াল করে ও rate limit ও filtering প্রয়োগ করে।'),
        ] },
      ],
    },
    {
      h: l('When and where to use each', 'কখন ও কোথায় কোনটি ব্যবহার করবেন'),
      blocks: [
        { p: l('Use a reverse proxy in front of virtually any production web system. It centralizes cross-cutting concerns — TLS, routing, caching, security — so each backend can stay simple and focused, and you can add or move services without changing the address clients use. nginx, HAProxy, Envoy, and every CDN are reverse proxies.', 'কার্যত যেকোনো প্রোডাকশন web সিস্টেমের সামনে একটি reverse proxy ব্যবহার করুন। এটি ক্রস-কাটিং বিষয়—TLS, রাউটিং, caching, নিরাপত্তা—কেন্দ্রীভূত করে, যাতে প্রতিটি backend সরল ও নিবদ্ধ থাকতে পারে, আর ক্লায়েন্টের ব্যবহৃত ঠিকানা না বদলে আপনি সেবা যোগ বা সরাতে পারেন। nginx, HAProxy, Envoy ও প্রতিটি CDN হলো reverse proxy।') },
        { p: l('Use a forward proxy when the goal is on the client side: a company or school routing all employee traffic through one filter for access control and monitoring, a cache shared by many users, or a tool that gives clients anonymity toward the servers they reach. The trade-off for either kind is the same — the proxy adds a network hop and one more component you must run reliably.', 'একটি forward proxy ব্যবহার করুন যখন লক্ষ্য ক্লায়েন্ট পাশে: একটি কোম্পানি বা স্কুল access control ও পর্যবেক্ষণের জন্য সব কর্মীর ট্রাফিক এক filter দিয়ে রুট করছে, অনেক ব্যবহারকারীর শেয়ার করা একটি cache, বা এমন একটি টুল যা ক্লায়েন্টদের সার্ভারের কাছে anonymity দেয়। যেকোনো ধরনের ট্রেড-অফ একই—প্রক্সি একটি network hop ও নির্ভরযোগ্যভাবে চালাতে হবে এমন আরেকটি উপাদান যোগ করে।') },
        { p: l('A helpful memory trick: a forward proxy hides the client from the server, and a reverse proxy hides the server from the client. Note also that a CDN is really a globally distributed reverse proxy — it fronts your origin, caches responses, terminates TLS, and hides your backend, which is exactly the reverse-proxy job list done at the edge.', 'একটি সহায়ক মনে রাখার কৌশল: forward proxy সার্ভার থেকে ক্লায়েন্টকে লুকায়, আর reverse proxy ক্লায়েন্ট থেকে সার্ভারকে লুকায়। এটাও খেয়াল করুন যে একটি CDN আসলে একটি গ্লোবালি বিতরণ করা reverse proxy—এটি আপনার origin-এর সামনে থাকে, রেসপন্স cache করে, TLS terminate করে ও আপনার backend লুকায়, যা edge-এ করা ঠিক reverse-proxy কাজের তালিকা।') },
      ],
    },
    {
      h: l('Common mistakes', 'সাধারণ ভুল'),
      blocks: [
        { list: [
          l('Confusing a forward proxy (represents clients) with a reverse proxy (represents servers) — they face opposite directions.', 'একটি forward proxy (ক্লায়েন্টের প্রতিনিধি) ও একটি reverse proxy (সার্ভারের প্রতিনিধি) গুলিয়ে ফেলা—এরা বিপরীত দিকে মুখ করে।'),
          l('Forgetting to forward the real client IP (X-Forwarded-For), so every backend log shows the proxy’s address instead of the user’s.', 'আসল ক্লায়েন্ট IP (X-Forwarded-For) ফরোয়ার্ড করতে ভুলে যাওয়া, ফলে প্রতিটি backend log ব্যবহারকারীর বদলে প্রক্সির ঠিকানা দেখায়।'),
          l('Running a single reverse proxy with no redundancy, turning your one entry point into a single point of failure.', 'কোনো redundancy ছাড়া একটিমাত্র reverse proxy চালানো, আপনার একমাত্র প্রবেশদ্বারকে একক ব্যর্থতা-বিন্দুতে পরিণত করা।'),
          l('Caching at the proxy without thinking about private responses, leaking one user’s data to another — the same danger as with a CDN.', 'প্রাইভেট রেসপন্স না ভেবে প্রক্সিতে caching, এক ব্যবহারকারীর ডেটা অন্যকে ফাঁস করা—CDN-এর মতোই বিপদ।'),
        ] },
      ],
    },
    {
      h: l('Remember in one line', 'এক লাইনে মনে রাখুন'),
      blocks: [
        { list: [
          l('A proxy is a middleman: a forward proxy fronts clients, a reverse proxy fronts servers.', 'প্রক্সি একটি মধ্যস্থ: forward proxy ক্লায়েন্টের সামনে, reverse proxy সার্ভারের সামনে।'),
          l('A reverse proxy is your one entry point for TLS, routing, caching, security, and load balancing.', 'reverse proxy হলো TLS, রাউটিং, caching, নিরাপত্তা ও load balancing-এর জন্য আপনার একমাত্র প্রবেশদ্বার।'),
          l('It centralizes cross-cutting concerns but adds a hop and a component — run it redundantly.', 'এটি ক্রস-কাটিং বিষয় কেন্দ্রীভূত করে তবে একটি hop ও একটি উপাদান যোগ করে—redundant-ভাবে চালান।'),
        ] },
      ],
    },
  ],
}
