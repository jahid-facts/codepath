// Deep, bilingual (English / Bangla) teaching guides for networking topics.
// Shape mirrors app/course-guides.js and app/guides/dsa/*.js: each guide is an
// array of sections { h, blocks }, rendered by GuideBlock in app/LearningApp.js.
// Facts (ports, DNS records, HTTP methods, TLS steps) are drawn from
// app/courses/networking.js — the rawTopics rows and the reference tables.

const l = (en, bn) => ({ en, bn })

export default {
  // ── cn-ports · Ports & sockets ────────────────────────────────────────────
  'cn-ports': [
    {
      h: l('What is a port?', 'পোর্ট কী?'),
      blocks: [
        { p: l('A port is a 16-bit number (0 to 65535) that labels which application or service on a host a piece of network traffic belongs to. An IP address does one job: it gets data to the right machine. A port does the next job: it gets that data to the right program running on that machine. Together, an IP address plus a port point at exactly one conversation.', 'পোর্ট হলো একটি ১৬-বিট সংখ্যা (০ থেকে ৬৫৫৩৫) যা বলে দেয় একটি হোস্টের কোন অ্যাপ্লিকেশন বা সার্ভিসের সঙ্গে নেটওয়ার্ক ট্রাফিকের একটি অংশ সম্পর্কিত। IP ঠিকানার একটি কাজ: ডেটাকে সঠিক মেশিনে পৌঁছানো। পোর্টের পরের কাজ: সেই ডেটাকে ওই মেশিনে চলা সঠিক প্রোগ্রামে পৌঁছানো। একসঙ্গে, একটি IP ঠিকানা ও একটি পোর্ট ঠিক একটি কথোপকথনকে নির্দেশ করে।') },
        { p: l('The problem ports solve is sharing. A single server with one IP address routinely runs many services at once — a web server on one port, an SSH daemon on another, a database, maybe a mail server. When a packet arrives, the operating system must know which of these should receive it. Without ports, one IP address could host exactly one service, and the internet as we know it could not exist.', 'পোর্ট যে সমস্যা সমাধান করে তা হলো শেয়ারিং। একটি IP ঠিকানাযুক্ত একটি সার্ভার সাধারণত একসঙ্গে অনেক সার্ভিস চালায়—একটি পোর্টে web server, আরেকটিতে SSH daemon, একটি database, হয়তো একটি mail server। একটি প্যাকেট এলে অপারেটিং সিস্টেমকে জানতে হবে এদের মধ্যে কে এটি পাবে। পোর্ট ছাড়া একটি IP ঠিকানা ঠিক একটি সার্ভিস হোস্ট করতে পারত, আর আমরা যেমন ইন্টারনেট চিনি তা থাকতে পারত না।') },
        { note: l('Think of an apartment building. The IP address is the street address that gets a letter to the right building; the port is the specific apartment number that gets it to the right door inside. The postal carrier (IP routing) delivers to the building, and the apartment number (port) finishes the last step.', 'একটি অ্যাপার্টমেন্ট ভবন ভাবুন। IP ঠিকানা হলো রাস্তার ঠিকানা যা একটি চিঠিকে সঠিক ভবনে পৌঁছায়; পোর্ট হলো নির্দিষ্ট অ্যাপার্টমেন্ট নম্বর যা ভেতরের সঠিক দরজায় পৌঁছায়। ডাক পিয়ন (IP routing) ভবন পর্যন্ত পৌঁছে দেয়, আর অ্যাপার্টমেন্ট নম্বর (পোর্ট) শেষ ধাপটি সারে।'), kind: 'tip' },
      ],
    },
    {
      h: l('Ports and sockets: how they fit together', 'পোর্ট ও সকেট: এরা কীভাবে মেলে'),
      blocks: [
        { p: l('A socket is the combination of an IP address and a port (plus the protocol, TCP or UDP). A server "binds" to a socket and listens there — for example, a web server listens on 0.0.0.0:443. A single TCP connection is uniquely identified not by one port but by a four-part tuple: source IP, source port, destination IP, and destination port.', 'সকেট হলো একটি IP ঠিকানা ও একটি পোর্টের সমন্বয় (সঙ্গে প্রোটোকল, TCP বা UDP)। একটি সার্ভার একটি সকেটে "bind" করে ও সেখানে listen করে—যেমন একটি web server 0.0.0.0:443-এ listen করে। একটি TCP সংযোগ একটি পোর্ট দিয়ে নয়, বরং চার-অংশের একটি tuple দিয়ে অনন্যভাবে চিহ্নিত: source IP, source port, destination IP ও destination port।') },
        { p: l('This four-tuple is why thousands of browser tabs can all talk to port 443 on the same server without confusion. Each connection leaves your machine from a different high-numbered "ephemeral" port that the operating system picks automatically, so every tuple is unique even though the destination port is always 443. Ports come in three ranges: the well-known ports 0–1023 (which usually need administrator privilege to bind), the registered ports 1024–49151, and the dynamic or ephemeral ports 49152–65535 that clients grab for outbound connections.', 'এই চার-tuple-ই কারণ কেন হাজার হাজার browser tab একই সার্ভারের পোর্ট ৪৪৩-এ বিভ্রান্তি ছাড়াই কথা বলতে পারে। প্রতিটি সংযোগ আপনার মেশিন থেকে একটি ভিন্ন উঁচু-নম্বরের "ephemeral" পোর্ট দিয়ে বের হয় যা অপারেটিং সিস্টেম স্বয়ংক্রিয়ভাবে বাছে, তাই destination port সবসময় ৪৪৩ হলেও প্রতিটি tuple অনন্য। পোর্ট তিনটি রেঞ্জে আসে: well-known পোর্ট ০–১০২৩ (যা bind করতে সাধারণত administrator অনুমতি লাগে), registered পোর্ট ১০২৪–৪৯১৫১, আর dynamic বা ephemeral পোর্ট ৪৯১৫২–৬৫৫৩৫ যা ক্লায়েন্ট outbound সংযোগের জন্য নেয়।') },
      ],
    },
    {
      h: l('How a port routes traffic, step by step', 'পোর্ট কীভাবে ট্রাফিক রুট করে, ধাপে ধাপে'),
      blocks: [
        { steps: [
          l('A service starts up and binds to a fixed port — for example the web server binds to port 443 and begins listening for connections.', 'একটি সার্ভিস চালু হয়ে একটি নির্দিষ্ট পোর্টে bind করে—যেমন web server পোর্ট ৪৪৩-এ bind করে সংযোগের জন্য listen শুরু করে।'),
          l('A client (your browser) opens a connection to the server’s IP on port 443, using a random ephemeral source port on its own side.', 'একটি ক্লায়েন্ট (আপনার browser) নিজের দিকে একটি র‍্যান্ডম ephemeral source port ব্যবহার করে সার্ভারের IP-এর পোর্ট ৪৪৩-এ সংযোগ খোলে।'),
          l('Packets arrive at the server. The operating system reads the destination port (443) and hands the data to the process listening there.', 'প্যাকেট সার্ভারে পৌঁছায়। অপারেটিং সিস্টেম destination port (৪৪৩) পড়ে ও সেখানে listen করা প্রসেসকে ডেটা দেয়।'),
          l('The server replies, swapping source and destination so the answer flows back to your browser’s ephemeral port.', 'সার্ভার উত্তর দেয়, source ও destination বদলে যাতে উত্তরটি আপনার browser-এর ephemeral port-এ ফিরে যায়।'),
          l('Because the full four-tuple differs for every tab, the OS keeps hundreds of parallel conversations to the same port perfectly separate.', 'যেহেতু প্রতিটি tab-এর জন্য পূর্ণ চার-tuple ভিন্ন, OS একই পোর্টে চলা শত শত সমান্তরাল কথোপকথন নিখুঁতভাবে আলাদা রাখে।'),
        ] },
        { code: `$ ss -tuln
Netid  State    Local Address:Port
tcp    LISTEN   0.0.0.0:22        # SSH waiting for connections
tcp    LISTEN   0.0.0.0:80        # HTTP  web server
tcp    LISTEN   0.0.0.0:443       # HTTPS web server
udp    UNCONN   0.0.0.0:53        # DNS resolver`, caption: l('ss -tuln (or netstat -tuln) lists which ports a host is listening on. Each open port is one door a service is waiting behind — and one door a firewall may need to guard.', 'ss -tuln (বা netstat -tuln) দেখায় একটি হোস্ট কোন পোর্টে listen করছে। প্রতিটি খোলা পোর্ট হলো একটি দরজা যার পেছনে একটি সার্ভিস অপেক্ষা করছে—আর একটি দরজা যা firewall-কে পাহারা দিতে হতে পারে।') },
      ],
    },
    {
      h: l('Well-known ports to remember', 'মনে রাখার মতো well-known পোর্ট'),
      blocks: [
        { table: {
          head: [l('Service', 'সার্ভিস'), l('Port', 'পোর্ট'), l('Transport', 'ট্রান্সপোর্ট')],
          rows: [
            [l('HTTP (plain web)', 'HTTP (সাধারণ web)'), l('80', '৮০'), l('TCP', 'TCP')],
            [l('HTTPS (secure web)', 'HTTPS (নিরাপদ web)'), l('443', '৪৪৩'), l('TCP', 'TCP')],
            [l('SSH (remote shell)', 'SSH (রিমোট শেল)'), l('22', '২২'), l('TCP', 'TCP')],
            [l('DNS (name lookup)', 'DNS (নাম লুকআপ)'), l('53', '৫৩'), l('UDP (and TCP)', 'UDP (ও TCP)')],
            [l('SMTP (mail sending)', 'SMTP (মেইল পাঠানো)'), l('25', '২৫'), l('TCP', 'TCP')],
          ],
        } },
        { note: l('Knowing that 443 means HTTPS and 22 means SSH lets you read a firewall rule, a URL, or a connection log at a glance. When a URL has no port, the browser assumes the default for the scheme — 80 for http:// and 443 for https://.', '৪৪৩ মানে HTTPS আর ২২ মানে SSH জানলে আপনি একটি firewall নিয়ম, একটি URL বা একটি সংযোগ লগ এক নজরে পড়তে পারেন। একটি URL-এ পোর্ট না থাকলে browser scheme-এর ডিফল্ট ধরে নেয়—http:// এর জন্য ৮০ ও https:// এর জন্য ৪৪৩।'), kind: 'tip' },
      ],
    },
    {
      h: l('When and where you deal with ports', 'কখন ও কোথায় পোর্ট নিয়ে কাজ করবেন'),
      blocks: [
        { p: l('You meet ports whenever you run or connect to a service. You bind an app to a port when you start a server (a Node app on 3000, a database on 5432). You open a port in a firewall or cloud security group so clients can reach it. You forward a port on a home router so an inside device is reachable from outside. And you read ports when debugging: if a service "isn’t responding," checking that it is actually listening on the expected port is often the first useful step.', 'আপনি পোর্টের মুখোমুখি হন যখনই কোনো সার্ভিস চালান বা তাতে সংযোগ করেন। একটি সার্ভার চালু করার সময় একটি অ্যাপকে পোর্টে bind করেন (Node অ্যাপ ৩০০০-এ, database ৫৪৩২-এ)। একটি firewall বা cloud security group-এ একটি পোর্ট খোলেন যাতে ক্লায়েন্ট পৌঁছাতে পারে। একটি home router-এ পোর্ট forward করেন যাতে ভেতরের একটি ডিভাইস বাইরে থেকে পৌঁছানো যায়। আর ডিবাগিংয়ে পোর্ট পড়েন: একটি সার্ভিস "সাড়া দিচ্ছে না" হলে, এটি আসলে প্রত্যাশিত পোর্টে listen করছে কি না যাচাই করা প্রায়ই প্রথম কাজের ধাপ।') },
        { p: l('Bind services to the ports people expect, and keep everything else closed. Every open port is part of your attack surface — a door an intruder can rattle. A good server exposes only the ports it truly needs (say 443 for HTTPS and 22 for SSH) and blocks the rest at the firewall.', 'সার্ভিসগুলোকে মানুষ যে পোর্ট প্রত্যাশা করে সেখানে bind করুন, আর বাকি সব বন্ধ রাখুন। প্রতিটি খোলা পোর্ট আপনার attack surface-এর অংশ—একটি দরজা যা অনুপ্রবেশকারী নাড়াতে পারে। একটি ভালো সার্ভার শুধু সত্যিকারের দরকারি পোর্ট (যেমন HTTPS-এর জন্য ৪৪৩ ও SSH-এর জন্য ২২) খোলা রাখে ও বাকিগুলো firewall-এ ব্লক করে।') },
      ],
    },
    {
      h: l('Common mistakes', 'সাধারণ ভুল'),
      blocks: [
        { list: [
          l('Leaving unused ports open to the whole internet, widening the attack surface for no reason — default-deny and open only what you serve.', 'ব্যবহার-না-করা পোর্ট পুরো ইন্টারনেটে খোলা রাখা, বিনা কারণে attack surface বাড়ানো—default-deny করুন ও শুধু যা পরিবেশন করেন তা খুলুন।'),
          l('Confusing the port (which app) with the IP (which machine) — a "connection refused" usually means nothing is listening on that port, not that the host is unreachable.', 'পোর্ট (কোন অ্যাপ) ও IP (কোন মেশিন) গুলিয়ে ফেলা—"connection refused" সাধারণত মানে ওই পোর্টে কিছু listen করছে না, হোস্ট অপৌঁছনীয় নয়।'),
          l('Assuming a URL with no port is "port 0" — it actually uses the scheme default (80 for http, 443 for https).', 'পোর্টহীন URL-কে "পোর্ট ০" ধরে নেওয়া—এটি আসলে scheme-এর ডিফল্ট ব্যবহার করে (http-এ ৮০, https-এ ৪৪৩)।'),
          l('Trying to bind two services to the same port on the same interface — only one process can own a listening port at a time.', 'একই interface-এ একই পোর্টে দুটি সার্ভিস bind করার চেষ্টা—একবারে একটি প্রসেসই একটি listening পোর্টের মালিক হতে পারে।'),
        ] },
      ],
    },
    {
      h: l('Remember in one line', 'এক লাইনে মনে রাখুন'),
      blocks: [
        { list: [
          l('IP address = which machine; port = which app on that machine.', 'IP ঠিকানা = কোন মেশিন; পোর্ট = সেই মেশিনের কোন অ্যাপ।'),
          l('A connection is identified by the four-tuple (source IP, source port, destination IP, destination port), so many clients share one server port.', 'একটি সংযোগ চার-tuple (source IP, source port, destination IP, destination port) দিয়ে চিহ্নিত, তাই অনেক ক্লায়েন্ট একটি সার্ভার পোর্ট শেয়ার করে।'),
          l('Know the defaults — 80 HTTP, 443 HTTPS, 22 SSH, 53 DNS, 25 SMTP — and keep every other port closed.', 'ডিফল্ট জানুন—৮০ HTTP, ৪৪৩ HTTPS, ২২ SSH, ৫৩ DNS, ২৫ SMTP—আর বাকি প্রতিটি পোর্ট বন্ধ রাখুন।'),
        ] },
      ],
    },
  ],

  // ── cn-congestion · Flow & congestion control ─────────────────────────────
  'cn-congestion': [
    {
      h: l('What are flow and congestion control?', 'ফ্লো ও কনজেশন কন্ট্রোল কী?'),
      blocks: [
        { p: l('Flow control and congestion control are the two mechanisms TCP uses to decide how fast it is allowed to send. They answer two different questions. Flow control asks, "Can the receiver keep up?" Congestion control asks, "Can the network in between keep up?" TCP obeys both at once, and the slower of the two sets the pace.', 'ফ্লো কন্ট্রোল ও কনজেশন কন্ট্রোল হলো দুটি ব্যবস্থা যা TCP ব্যবহার করে কত দ্রুত পাঠানোর অনুমতি আছে তা ঠিক করতে। এরা দুটি ভিন্ন প্রশ্নের উত্তর দেয়। ফ্লো কন্ট্রোল জিজ্ঞেস করে, "গ্রাহক কি তাল মিলাতে পারছে?" কনজেশন কন্ট্রোল জিজ্ঞেস করে, "মাঝের নেটওয়ার্ক কি তাল মিলাতে পারছে?" TCP একসঙ্গে দুটোই মানে, আর দুটোর মধ্যে ধীরটি গতি ঠিক করে।') },
        { p: l('The problem is that TCP could, in principle, blast data at full line rate the instant a connection opens. But two things downstream may not be able to absorb it: a slow receiver whose memory buffer overflows, and a shared network whose routers and links overflow and start dropping packets. Either one causes loss, retransmissions, and — if every sender ignored it — a network-wide collapse where everyone retransmits and nothing gets through. Flow and congestion control prevent both.', 'সমস্যা হলো TCP নীতিগতভাবে সংযোগ খোলার মুহূর্তেই পূর্ণ line rate-এ ডেটা ছুঁড়তে পারত। কিন্তু নিচের দিকে দুটি জিনিস তা শুষে নিতে না-ও পারে: একটি ধীর গ্রাহক যার memory buffer উপচে পড়ে, আর একটি শেয়ার্ড নেটওয়ার্ক যার router ও link উপচে গিয়ে প্যাকেট ফেলতে শুরু করে। যেকোনো একটি লস, retransmission ঘটায়—আর প্রতিটি প্রেরক একে উপেক্ষা করলে একটি নেটওয়ার্ক-জোড়া ধস, যেখানে সবাই retransmit করে ও কিছুই যায় না। ফ্লো ও কনজেশন কন্ট্রোল দুটোই ঠেকায়।') },
        { note: l('Think of merging onto a busy highway. You do not floor the accelerator instantly — you speed up gradually to match traffic, and the moment you see brake lights ahead you back off. TCP does the same: it ramps its speed up slowly and slows down the instant it sees signs of congestion (dropped packets).', 'একটি ব্যস্ত মহাসড়কে মেশা ভাবুন। আপনি সঙ্গে সঙ্গে অ্যাক্সিলারেটর চাপেন না—ট্রাফিকের সঙ্গে মিলিয়ে ধীরে গতি বাড়ান, আর সামনে ব্রেক-লাইট দেখলেই কমান। TCP একই কাজ করে: এটি ধীরে গতি বাড়ায় ও কনজেশনের লক্ষণ (হারানো প্যাকেট) দেখলেই ধীর হয়।'), kind: 'tip' },
      ],
    },
    {
      h: l('Flow control: matching the receiver', 'ফ্লো কন্ট্রোল: গ্রাহকের সঙ্গে মেলানো'),
      blocks: [
        { p: l('Flow control protects the receiver from being overwhelmed. Every TCP receiver has a buffer where incoming data waits to be read by the application. In every acknowledgement it sends back, the receiver advertises a receive window (rwnd) — the amount of free buffer space it currently has. The sender is not allowed to have more unacknowledged data "in flight" than that window.', 'ফ্লো কন্ট্রোল গ্রাহককে চাপে পড়া থেকে রক্ষা করে। প্রতিটি TCP গ্রাহকের একটি buffer থাকে যেখানে আসা ডেটা অ্যাপ্লিকেশনের পড়ার অপেক্ষায় থাকে। প্রতিটি acknowledgement-এ গ্রাহক একটি receive window (rwnd) জানায়—এই মুহূর্তে তার কত খালি buffer জায়গা আছে। প্রেরক সেই window-এর চেয়ে বেশি unacknowledged ডেটা "in flight" রাখতে পারে না।') },
        { p: l('If the application is reading slowly and the buffer fills, the receiver advertises a smaller and smaller window, right down to zero, which tells the sender to pause. The sender then periodically sends tiny "window probes" until the receiver signals free space again. This is a purely end-to-end negotiation between the two hosts; the network in the middle plays no part in it.', 'অ্যাপ্লিকেশন ধীরে পড়লে ও buffer ভরলে গ্রাহক ছোট থেকে ছোট window জানায়, একদম শূন্য পর্যন্ত, যা প্রেরককে থামতে বলে। এরপর প্রেরক পর্যায়ক্রমে ছোট "window probe" পাঠায় যতক্ষণ না গ্রাহক আবার খালি জায়গার সংকেত দেয়। এটি সম্পূর্ণভাবে দুই হোস্টের মধ্যে end-to-end আলোচনা; মাঝের নেটওয়ার্কের এতে কোনো ভূমিকা নেই।') },
      ],
    },
    {
      h: l('Congestion control: matching the network, step by step', 'কনজেশন কন্ট্রোল: নেটওয়ার্কের সঙ্গে মেলানো, ধাপে ধাপে'),
      blocks: [
        { p: l('Congestion control protects the shared network. Alongside the receiver’s window, the sender keeps its own private limit called the congestion window (cwnd), which is never advertised — the sender estimates it from how the network behaves. The amount TCP may actually send is the smaller of the two windows: min(rwnd, cwnd). Here is how cwnd changes over time.', 'কনজেশন কন্ট্রোল শেয়ার্ড নেটওয়ার্ককে রক্ষা করে। গ্রাহকের window-এর পাশাপাশি প্রেরক নিজের একটি ব্যক্তিগত সীমা রাখে যাকে বলে congestion window (cwnd), যা কখনো জানানো হয় না—নেটওয়ার্ক কেমন আচরণ করে তা থেকে প্রেরক এটি আন্দাজ করে। TCP আসলে যতটা পাঠাতে পারে তা হলো দুই window-এর ছোটটি: min(rwnd, cwnd)। cwnd সময়ের সঙ্গে যেভাবে বদলায় তা এই।') },
        { steps: [
          l('Slow start: the connection opens with a small cwnd and doubles it every round trip (exponential growth), quickly probing for how much the path can carry.', 'Slow start: সংযোগ একটি ছোট cwnd দিয়ে খোলে ও প্রতি round trip-এ দ্বিগুণ করে (exponential বৃদ্ধি), দ্রুত যাচাই করে পথ কতটা বহন করতে পারে।'),
          l('Congestion avoidance: once cwnd passes a threshold (ssthresh), growth switches from doubling to adding just one segment per round trip — a cautious, linear climb.', 'Congestion avoidance: cwnd একটি সীমা (ssthresh) পার করলে বৃদ্ধি দ্বিগুণ থেকে বদলে প্রতি round trip-এ মাত্র একটি segment যোগ করায় পরিণত হয়—সতর্ক, রৈখিক আরোহণ।'),
          l('On mild loss (three duplicate ACKs): TCP fast-retransmits the missing segment and roughly halves cwnd — the "multiplicative decrease".', 'হালকা লসে (তিনটি duplicate ACK): TCP হারানো segment fast-retransmit করে ও cwnd মোটামুটি অর্ধেক করে—"multiplicative decrease"।'),
          l('On severe loss (a timeout): TCP assumes the path is badly congested, drops cwnd back to the minimum, and re-enters slow start.', 'তীব্র লসে (একটি timeout): TCP ধরে নেয় পথ ভীষণ congested, cwnd ন্যূনতমে নামিয়ে আবার slow start-এ ঢোকে।'),
        ] },
        { code: `# TCP congestion window (cwnd) over successive round trips
RTT 1   cwnd =  1 MSS    slow start (doubles each RTT)
RTT 2   cwnd =  2 MSS
RTT 3   cwnd =  4 MSS
RTT 4   cwnd =  8 MSS    -> reaches ssthresh, switch to linear
RTT 5   cwnd =  9 MSS    congestion avoidance (+1 MSS each RTT)
RTT 6   cwnd = 10 MSS
        ...  3 duplicate ACKs = mild packet loss
RTT 7   cwnd =  5 MSS    multiplicative decrease (halved)`, caption: l('This additive-increase / multiplicative-decrease (AIMD) sawtooth is why a big download starts slow, ramps up, dips on loss, and climbs again — TCP is constantly searching for the fastest safe speed.', 'এই additive-increase / multiplicative-decrease (AIMD) করাত-দাঁত প্যাটার্নই কারণ কেন একটি বড় download ধীরে শুরু হয়, গতি বাড়ে, লসে নামে ও আবার ওঠে—TCP সবসময় সবচেয়ে দ্রুত নিরাপদ গতি খুঁজছে।') },
      ],
    },
    {
      h: l('Flow control vs congestion control', 'ফ্লো কন্ট্রোল বনাম কনজেশন কন্ট্রোল'),
      blocks: [
        { table: {
          head: [l('Aspect', 'দিক'), l('Flow control', 'ফ্লো কন্ট্রোল'), l('Congestion control', 'কনজেশন কন্ট্রোল')],
          rows: [
            [l('Protects', 'রক্ষা করে'), l('The receiver', 'গ্রাহককে'), l('The network path', 'নেটওয়ার্ক পথকে')],
            [l('Window used', 'যে window'), l('Receive window (rwnd), set by the receiver', 'Receive window (rwnd), গ্রাহক ঠিক করে'), l('Congestion window (cwnd), estimated by the sender', 'Congestion window (cwnd), প্রেরক আন্দাজ করে')],
            [l('Signal it reacts to', 'যে সংকেতে সাড়া'), l('Advertised free buffer space', 'জানানো খালি buffer জায়গা'), l('Packet loss, delay, or ECN marks', 'প্যাকেট লস, বিলম্ব বা ECN mark')],
            [l('Question answered', 'যে প্রশ্নের উত্তর'), l('Can the receiver keep up?', 'গ্রাহক কি তাল মিলাতে পারছে?'), l('Can the network keep up?', 'নেটওয়ার্ক কি তাল মিলাতে পারছে?')],
            [l('Actual send limit', 'আসল প্রেরণ সীমা'), l('Both apply together: TCP sends at most min(rwnd, cwnd)', 'দুটোই একসঙ্গে খাটে: TCP সর্বোচ্চ min(rwnd, cwnd) পাঠায়'), l('Both apply together: TCP sends at most min(rwnd, cwnd)', 'দুটোই একসঙ্গে খাটে: TCP সর্বোচ্চ min(rwnd, cwnd) পাঠায়')],
          ],
        } },
      ],
    },
    {
      h: l('When and where it matters', 'কখন ও কোথায় গুরুত্বপূর্ণ'),
      blocks: [
        { p: l('You almost never configure this by hand — it runs automatically inside the operating system’s TCP stack for every connection. But understanding it explains real behaviour you will see constantly. It is why a large transfer takes a moment to reach full speed (slow start warming up), why throughput on a lossy Wi-Fi or mobile link is jittery (every loss halves the window), and why a saturated link makes even small requests feel sluggish.', 'আপনি এটি প্রায় কখনো হাতে কনফিগার করেন না—এটি প্রতিটি সংযোগের জন্য অপারেটিং সিস্টেমের TCP stack-এর ভেতরে স্বয়ংক্রিয়ভাবে চলে। কিন্তু এটি বোঝা আপনি সবসময় যে বাস্তব আচরণ দেখবেন তা ব্যাখ্যা করে। এ কারণেই একটি বড় transfer পূর্ণ গতিতে পৌঁছাতে একটু সময় নেয় (slow start গরম হচ্ছে), এ কারণেই একটি lossy Wi-Fi বা mobile link-এ throughput অসম (প্রতিটি লস window অর্ধেক করে), আর এ কারণেই একটি saturated link ছোট রিকোয়েস্টও ধীর মনে করায়।') },
        { p: l('It matters most when you tune high-throughput servers or long-distance transfers. That is when engineers choose a congestion-control algorithm on purpose: classic Reno, CUBIC (the Linux default, tuned for high-speed links), or BBR (Google’s model-based algorithm that estimates bandwidth and delay instead of waiting for loss). Design your systems to tolerate variable throughput — do not assume a connection delivers a flat, constant speed.', 'এটি সবচেয়ে বেশি গুরুত্বপূর্ণ যখন আপনি high-throughput সার্ভার বা দূর-দূরত্বের transfer টিউন করেন। তখনই ইঞ্জিনিয়াররা ইচ্ছাকৃতভাবে একটি congestion-control অ্যালগরিদম বাছেন: ক্লাসিক Reno, CUBIC (Linux ডিফল্ট, high-speed link-এর জন্য টিউন করা), বা BBR (Google-এর model-ভিত্তিক অ্যালগরিদম যা লসের অপেক্ষা না করে bandwidth ও delay আন্দাজ করে)। আপনার সিস্টেমকে পরিবর্তনশীল throughput সহ্য করার মতো করে ডিজাইন করুন—ধরে নেবেন না একটি সংযোগ সমান, ধ্রুব গতি দেয়।') },
      ],
    },
    {
      h: l('Common mistakes', 'সাধারণ ভুল'),
      blocks: [
        { list: [
          l('Blaming the server for slowness that is really packet loss triggering congestion backoff on the path in between.', 'ধীরগতির জন্য সার্ভারকে দোষ দেওয়া যা আসলে মাঝের পথে প্যাকেট লস দিয়ে congestion backoff ঘটাচ্ছে।'),
          l('Confusing the two controls: a full receive window (flow control) is a slow reader; loss-driven backoff (congestion control) is a busy network. They are different problems.', 'দুটি নিয়ন্ত্রণ গুলিয়ে ফেলা: পূর্ণ receive window (ফ্লো কন্ট্রোল) মানে ধীর reader; লস-চালিত backoff (কনজেশন কন্ট্রোল) মানে ব্যস্ত নেটওয়ার্ক। এরা ভিন্ন সমস্যা।'),
          l('Expecting a fresh connection to reach full speed instantly — slow start deliberately begins small and ramps up over several round trips.', 'একটি নতুন সংযোগ সঙ্গে সঙ্গে পূর্ণ গতিতে পৌঁছাবে আশা করা—slow start ইচ্ছাকৃতভাবে ছোট শুরু করে ও কয়েক round trip ধরে গতি বাড়ায়।'),
          l('Opening many short connections instead of reusing one, so every transfer pays the slow-start warm-up over and over.', 'একটি সংযোগ পুনঃব্যবহার না করে অনেক ছোট সংযোগ খোলা, ফলে প্রতিটি transfer বারবার slow-start গরম হওয়ার মূল্য দেয়।'),
        ] },
      ],
    },
    {
      h: l('Remember in one line', 'এক লাইনে মনে রাখুন'),
      blocks: [
        { list: [
          l('Flow control protects the receiver (rwnd); congestion control protects the network (cwnd); TCP obeys the smaller of the two.', 'ফ্লো কন্ট্রোল গ্রাহককে রক্ষা করে (rwnd); কনজেশন কন্ট্রোল নেটওয়ার্ককে রক্ষা করে (cwnd); TCP দুটোর ছোটটি মানে।'),
          l('Congestion control is AIMD: ramp up gradually, cut sharply on loss — the sawtooth you see in every transfer.', 'কনজেশন কন্ট্রোল হলো AIMD: ধীরে গতি বাড়াও, লসে তীব্রভাবে কমাও—প্রতিটি transfer-এ দেখা করাত-দাঁত।'),
          l('It is automatic and keeps the whole internet fair and stable, but it will deliberately slow you when links get busy.', 'এটি স্বয়ংক্রিয় ও পুরো ইন্টারনেটকে ন্যায্য ও স্থিতিশীল রাখে, তবে link ব্যস্ত হলে ইচ্ছাকৃতভাবে আপনাকে ধীর করবে।'),
        ] },
      ],
    },
  ],

  // ── cn-dns · DNS: names to addresses ──────────────────────────────────────
  'cn-dns': [
    {
      h: l('What is DNS?', 'DNS কী?'),
      blocks: [
        { p: l('DNS (the Domain Name System) is the internet’s naming service. It translates human-friendly names like example.com into the numeric IP addresses that machines actually route packets to. Every time you open a website, send an email, or call an API by name, DNS quietly runs first to find out where that name lives.', 'DNS (Domain Name System) হলো ইন্টারনেটের নামকরণ সেবা। এটি example.com-এর মতো মানুষ-বান্ধব নামকে সেই সংখ্যাসূচক IP ঠিকানায় অনুবাদ করে যেখানে মেশিন আসলে প্যাকেট রুট করে। আপনি যখনই একটি ওয়েবসাইট খোলেন, ইমেইল পাঠান বা নাম দিয়ে একটি API কল করেন, DNS নীরবে আগে চলে জানতে যে নামটি কোথায় থাকে।') },
        { p: l('The problem DNS solves is that people remember names while computers route to numbers. Hard-coding IP addresses would be miserable: addresses change when you move servers, one name may map to dozens of machines behind a load balancer, and nobody could memorise 2606:2800:220:1:248:1893:25c8:1946. DNS is a single, shared, distributed database that lets a name stay stable even as the address behind it changes.', 'DNS যে সমস্যা সমাধান করে তা হলো মানুষ নাম মনে রাখে আর কম্পিউটার সংখ্যায় রুট করে। IP ঠিকানা হার্ড-কোড করা কষ্টকর হতো: সার্ভার সরালে ঠিকানা বদলায়, একটি নাম একটি load balancer-এর পেছনে কয়েক ডজন মেশিনে ম্যাপ করতে পারে, আর 2606:2800:220:1:248:1893:25c8:1946 কেউ মুখস্থ রাখতে পারত না। DNS হলো একটি একক, শেয়ার্ড, বিতরণকৃত database যা একটি নামকে স্থির রাখতে দেয় এমনকি পেছনের ঠিকানা বদলালেও।') },
        { note: l('Think of DNS as the phone book, or the contacts app, for the internet. You know the name of who you want to reach; DNS gives you the number to dial. You never memorise the number — you look up the name every time.', 'DNS-কে ইন্টারনেটের ফোন বই বা contacts অ্যাপ ভাবুন। আপনি কাকে পেতে চান তার নাম জানেন; DNS আপনাকে ডায়াল করার নম্বর দেয়। আপনি কখনো নম্বর মুখস্থ করেন না—প্রতিবার নামটি খোঁজেন।'), kind: 'tip' },
      ],
    },
    {
      h: l('How DNS resolution works, step by step', 'DNS রেজলিউশন কীভাবে কাজ করে, ধাপে ধাপে'),
      blocks: [
        { p: l('No single server knows every name on the internet. Instead, DNS is a hierarchy, and answering a query means walking down that hierarchy from the top. The walk is done by a recursive resolver on your behalf.', 'ইন্টারনেটের প্রতিটি নাম কোনো একটি সার্ভার জানে না। বরং DNS একটি শ্রেণিবিন্যাস, আর একটি query-এর উত্তর মানে সেই শ্রেণিবিন্যাসের ওপর থেকে নিচে নামা। এই নামা আপনার হয়ে একটি recursive resolver করে।') },
        { steps: [
          l('Your device asks its configured recursive resolver (your ISP’s, or a public one like 8.8.8.8 or 1.1.1.1): "What is the IP of www.example.com?"', 'আপনার ডিভাইস তার কনফিগার করা recursive resolver-কে (আপনার ISP-এর, বা 8.8.8.8 বা 1.1.1.1-এর মতো একটি public) জিজ্ঞেস করে: "www.example.com-এর IP কী?"'),
          l('If the resolver already has the answer cached and still within its TTL, it replies instantly and the walk stops here.', 'resolver-এর কাছে উত্তর আগে থেকে cache করা ও এখনো TTL-এর ভেতরে থাকলে এটি সঙ্গে সঙ্গে উত্তর দেয় ও নামা এখানেই থামে।'),
          l('Otherwise it asks a root nameserver. The root does not know example.com, but it knows who runs .com, and returns the .com TLD nameservers.', 'নইলে এটি একটি root nameserver-কে জিজ্ঞেস করে। root example.com জানে না, কিন্তু জানে .com কে চালায়, আর .com TLD nameserver-গুলো ফেরত দেয়।'),
          l('It asks a .com TLD nameserver. That does not know the IP either, but it knows the authoritative nameservers for example.com, and returns those (the NS records).', 'এটি একটি .com TLD nameserver-কে জিজ্ঞেস করে। সেটিও IP জানে না, কিন্তু example.com-এর authoritative nameserver জানে, আর সেগুলো (NS record) ফেরত দেয়।'),
          l('It asks example.com’s authoritative nameserver — the server that actually holds the domain’s records — which returns the A record: the real IPv4 address.', 'এটি example.com-এর authoritative nameserver-কে জিজ্ঞেস করে—যে সার্ভার আসলে ডোমেইনের record রাখে—যা A record ফেরত দেয়: আসল IPv4 ঠিকানা।'),
          l('The resolver caches that answer for its TTL and hands the IP back to your device. Now the browser can finally open a connection.', 'resolver সেই উত্তর তার TTL-এর জন্য cache করে ও IP আপনার ডিভাইসে ফেরত দেয়। এখন browser অবশেষে একটি সংযোগ খুলতে পারে।'),
        ] },
        { note: l('This full walk happens only on a cache miss. In practice most lookups are answered from a cache — your OS, your browser, and your resolver all cache results — so a typical DNS answer comes back in a few milliseconds.', 'এই পুরো নামা শুধু cache miss-এ ঘটে। বাস্তবে বেশিরভাগ লুকআপ একটি cache থেকে উত্তর পায়—আপনার OS, browser ও resolver সবাই ফলাফল cache করে—তাই একটি সাধারণ DNS উত্তর কয়েক মিলিসেকেন্ডে ফেরে।'), kind: 'tip' },
      ],
    },
    {
      h: l('Looking it up yourself with dig', 'dig দিয়ে নিজে খুঁজে দেখা'),
      blocks: [
        { p: l('The dig command asks DNS a question directly and prints the raw answer, which is the best way to see records and TTLs with your own eyes.', 'dig কমান্ড DNS-কে সরাসরি একটি প্রশ্ন করে ও কাঁচা উত্তর ছাপে, যা record ও TTL নিজের চোখে দেখার সেরা উপায়।') },
        { code: `$ dig www.example.com A +short
93.184.216.34

$ dig www.example.com
;; QUESTION SECTION:
;www.example.com.        IN   A

;; ANSWER SECTION:
www.example.com.  3600   IN   A   93.184.216.34

;; Query time: 12 msec`, caption: l('The answer line reads: the name www.example.com has an A record pointing to 93.184.216.34, cacheable for 3600 seconds (one hour) — that number is the TTL.', 'উত্তরের লাইনটি পড়ে: www.example.com নামের একটি A record আছে যা 93.184.216.34-কে নির্দেশ করে, ৩৬০০ সেকেন্ড (এক ঘণ্টা) cache করা যায়—ওই সংখ্যাটি TTL।') },
      ],
    },
    {
      h: l('DNS record types', 'DNS record টাইপ'),
      blocks: [
        { p: l('A DNS zone holds several kinds of records, each answering a different question about the domain. These are the five you will meet most.', 'একটি DNS zone কয়েক ধরনের record রাখে, প্রতিটি ডোমেইন সম্পর্কে ভিন্ন প্রশ্নের উত্তর দেয়। এই পাঁচটি আপনি সবচেয়ে বেশি দেখবেন।') },
        { table: {
          head: [l('Record', 'Record'), l('What it maps', 'যা ম্যাপ করে'), l('Example', 'উদাহরণ')],
          rows: [
            [l('A', 'A'), l('A name to an IPv4 address', 'একটি নামকে একটি IPv4 ঠিকানায়'), l('example.com → 93.184.216.34', 'example.com → 93.184.216.34')],
            [l('AAAA', 'AAAA'), l('A name to an IPv6 address', 'একটি নামকে একটি IPv6 ঠিকানায়'), l('example.com → 2606:2800:220:1::1946', 'example.com → 2606:2800:220:1::1946')],
            [l('CNAME', 'CNAME'), l('An alias from one name to another canonical name', 'এক নাম থেকে আরেকটি canonical নামে উপনাম'), l('www.example.com → example.com', 'www.example.com → example.com')],
            [l('MX', 'MX'), l('A domain to its mail server(s), with a priority', 'একটি ডোমেইনকে তার mail server-এ, priority সহ'), l('example.com → 10 mail.example.com', 'example.com → 10 mail.example.com')],
            [l('NS', 'NS'), l('A domain to its authoritative nameservers', 'একটি ডোমেইনকে তার authoritative nameserver-এ'), l('example.com → ns1.example.com', 'example.com → ns1.example.com')],
          ],
        } },
      ],
    },
    {
      h: l('TTL, caching, and propagation', 'TTL, caching ও propagation'),
      blocks: [
        { p: l('Every record carries a TTL (time-to-live) in seconds that tells caches how long they may reuse the answer before asking again. This caching is what makes DNS fast: the vast majority of lookups never travel past a nearby cache. The trade-off is freshness. When you change a record — say, moving your site to a new IP — old caches keep serving the previous answer until their TTL expires. That lag is what people call "DNS propagation," though nothing is really propagating; caches are simply timing out.', 'প্রতিটি record সেকেন্ডে একটি TTL (time-to-live) বহন করে যা cache-কে বলে আবার জিজ্ঞেস করার আগে কতক্ষণ উত্তরটি পুনঃব্যবহার করা যাবে। এই caching-ই DNS-কে দ্রুত করে: বেশিরভাগ লুকআপ কখনো কাছের cache পার হয় না। ট্রেড-অফ হলো টাটকা থাকা। আপনি একটি record বদলালে—ধরুন সাইটকে নতুন IP-তে সরালে—পুরনো cache তাদের TTL শেষ না হওয়া পর্যন্ত আগের উত্তর দিতে থাকে। এই দেরিকে মানুষ "DNS propagation" বলে, যদিও আসলে কিছুই propagate করছে না; cache শুধু timeout হচ্ছে।') },
        { p: l('The practical lesson: before a planned migration, lower the record’s TTL a day or two ahead (to, say, 300 seconds) so caches turn over quickly when you flip the address, then raise it again afterwards for efficiency.', 'বাস্তব শিক্ষা: একটি পরিকল্পিত migration-এর আগে, record-এর TTL এক-দুই দিন আগে কমান (যেমন ৩০০ সেকেন্ডে) যাতে ঠিকানা বদলানোর সময় cache দ্রুত ঘোরে, তারপর দক্ষতার জন্য পরে আবার বাড়ান।') },
      ],
    },
    {
      h: l('When and where DNS shows up', 'কখন ও কোথায় DNS আসে'),
      blocks: [
        { p: l('DNS runs at the very start of almost every network interaction, so it is often the hidden cause when "the site won’t load." It also does more than plain lookups: DNS-based routing sends users to the nearest CDN edge or a healthy data centre, and MX records decide where a domain’s email is delivered. DNS mostly travels over UDP on port 53 for speed, falling back to TCP for large answers and zone transfers.', 'DNS প্রায় প্রতিটি নেটওয়ার্ক ক্রিয়ার একদম শুরুতে চলে, তাই "সাইট লোড হয় না" হলে এটি প্রায়ই লুকানো কারণ। এটি সাধারণ লুকআপের চেয়েও বেশি করে: DNS-ভিত্তিক routing ব্যবহারকারীকে কাছের CDN edge বা একটি সুস্থ data centre-এ পাঠায়, আর MX record ঠিক করে একটি ডোমেইনের ইমেইল কোথায় ডেলিভার হবে। DNS গতির জন্য বেশিরভাগ পোর্ট ৫৩-এ UDP-তে চলে, বড় উত্তর ও zone transfer-এর জন্য TCP-তে ফিরে যায়।') },
      ],
    },
    {
      h: l('Common mistakes', 'সাধারণ ভুল'),
      blocks: [
        { list: [
          l('Blaming the app when a site "doesn’t load" that is really a DNS resolution or propagation problem — always test the name with dig first.', 'সাইট "লোড হয় না" হলে অ্যাপকে দোষ দেওয়া যা আসলে DNS রেজলিউশন বা propagation সমস্যা—সবসময় আগে dig দিয়ে নাম যাচাই করুন।'),
          l('Setting a very high TTL right before a migration, then waiting hours for old caches to expire.', 'একটি migration-এর ঠিক আগে খুব বেশি TTL সেট করা, তারপর পুরনো cache শেষ হওয়ার জন্য ঘণ্টার পর ঘণ্টা অপেক্ষা করা।'),
          l('Pointing a CNAME at a name that itself changes, or putting a CNAME on the root/apex domain where many providers forbid it.', 'একটি CNAME এমন নামে নির্দেশ করা যা নিজেই বদলায়, বা root/apex ডোমেইনে CNAME বসানো যেখানে অনেক provider তা নিষেধ করে।'),
          l('Assuming a change is "not working" seconds after making it, when a cache is simply still holding the old record until its TTL runs out.', 'একটি পরিবর্তন করার সেকেন্ড পরেই "কাজ করছে না" ধরে নেওয়া, যখন একটি cache শুধু TTL শেষ না হওয়া পর্যন্ত পুরনো record ধরে রেখেছে।'),
        ] },
      ],
    },
    {
      h: l('Remember in one line', 'এক লাইনে মনে রাখুন'),
      blocks: [
        { list: [
          l('DNS turns names into IP addresses by walking a hierarchy: resolver → root → TLD → authoritative.', 'DNS একটি শ্রেণিবিন্যাস ধরে নেমে নামকে IP ঠিকানায় পরিণত করে: resolver → root → TLD → authoritative।'),
          l('Caching and TTLs make it fast; the price is that changes take up to one TTL to appear everywhere.', 'caching ও TTL একে দ্রুত করে; মূল্য হলো পরিবর্তন সব জায়গায় দেখাতে এক TTL পর্যন্ত লাগে।'),
          l('Know your records: A and AAAA for addresses, CNAME for aliases, MX for mail, NS for nameservers.', 'আপনার record জানুন: ঠিকানায় A ও AAAA, উপনামে CNAME, মেইলে MX, nameserver-এ NS।'),
        ] },
      ],
    },
  ],

  // ── cn-http · HTTP & the request/response model ───────────────────────────
  'cn-http': [
    {
      h: l('What is HTTP?', 'HTTP কী?'),
      blocks: [
        { p: l('HTTP (HyperText Transfer Protocol) is the request/response protocol of the web. A client sends a request that names a method (what to do) and a path (what to do it to); the server sends back a response with a status code (how it went) and usually a body (the content). Every web page, image, and API call you use rides on this one simple pattern.', 'HTTP (HyperText Transfer Protocol) হলো ওয়েবের request/response প্রোটোকল। একটি ক্লায়েন্ট একটি request পাঠায় যা একটি method (কী করতে হবে) ও একটি path (কার ওপর করতে হবে) নাম দেয়; সার্ভার একটি status code (কেমন হলো) ও সাধারণত একটি body (কন্টেন্ট) সহ একটি response ফেরত দেয়। আপনি যে প্রতিটি ওয়েব পেজ, ছবি ও API কল ব্যবহার করেন তা এই একটি সরল প্যাটার্নে চলে।') },
        { p: l('The problem HTTP solves is agreement. A browser and a server are written by different people, in different languages, on different machines — they need a shared, text-based contract for asking for and returning resources. HTTP is that contract: simple enough to read by eye, universal enough that every language and device speaks it.', 'HTTP যে সমস্যা সমাধান করে তা হলো সম্মতি। একটি browser ও একটি সার্ভার ভিন্ন মানুষ, ভিন্ন ভাষায়, ভিন্ন মেশিনে লেখা—রিসোর্স চাওয়া ও ফেরত দেওয়ার জন্য তাদের একটি শেয়ার্ড, text-ভিত্তিক চুক্তি দরকার। HTTP হলো সেই চুক্তি: চোখে পড়ার মতো যথেষ্ট সরল, আর যথেষ্ট সর্বজনীন যাতে প্রতিটি ভাষা ও ডিভাইস এটি বলে।') },
        { note: l('Think of ordering at a counter. You state what you want ("GET /menu"), and they hand it back with a receipt code stamped on it ("200 OK" means here you go; "404" means we don’t have that). The method is your request; the status code is their reply.', 'একটি কাউন্টারে অর্ডার ভাবুন। আপনি কী চান বলেন ("GET /menu"), আর তারা তার ওপর একটি রসিদ কোড ছাপিয়ে ফেরত দেয় ("200 OK" মানে এই নিন; "404" মানে আমাদের কাছে নেই)। method হলো আপনার request; status code হলো তাদের উত্তর।'), kind: 'tip' },
      ],
    },
    {
      h: l('The anatomy of a request and response', 'একটি request ও response-এর গঠন'),
      blocks: [
        { steps: [
          l('The client opens a connection to the server (TCP, plus TLS for HTTPS on port 443).', 'ক্লায়েন্ট সার্ভারে একটি সংযোগ খোলে (TCP, সঙ্গে পোর্ট ৪৪৩-এ HTTPS-এর জন্য TLS)।'),
          l('It sends a request line — method, path, and version like "GET /users/42 HTTP/1.1" — followed by headers (Host, Accept, cookies), a blank line, and an optional body.', 'এটি একটি request line পাঠায়—method, path ও version যেমন "GET /users/42 HTTP/1.1"—তারপর header (Host, Accept, cookies), একটি ফাঁকা লাইন ও একটি ঐচ্ছিক body।'),
          l('The server processes the request: routes it, checks auth, reads data, and builds an answer.', 'সার্ভার request প্রসেস করে: রুট করে, auth যাচাই করে, ডেটা পড়ে ও একটি উত্তর তৈরি করে।'),
          l('It returns a status line — version and status like "HTTP/1.1 200 OK" — then response headers (Content-Type, Content-Length, Set-Cookie), a blank line, and the body.', 'এটি একটি status line ফেরত দেয়—version ও status যেমন "HTTP/1.1 200 OK"—তারপর response header (Content-Type, Content-Length, Set-Cookie), একটি ফাঁকা লাইন ও body।'),
          l('The client reads the status code to know what happened, then uses the body (HTML, JSON, an image, and so on).', 'ক্লায়েন্ট কী ঘটল জানতে status code পড়ে, তারপর body (HTML, JSON, একটি ছবি ইত্যাদি) ব্যবহার করে।'),
        ] },
        { code: `$ curl -i https://api.example.com/users/42

> GET /users/42 HTTP/1.1
> Host: api.example.com
> Accept: application/json

< HTTP/1.1 200 OK
< Content-Type: application/json
< Content-Length: 39
<
{ "id": 42, "name": "Ada Lovelace" }`, caption: l('Lines marked > are the request the client sent; lines marked < are the server’s response. The request names a method and path; the response leads with a status code (200 OK) and returns a JSON body.', '> চিহ্নিত লাইনগুলো ক্লায়েন্টের পাঠানো request; < চিহ্নিত লাইনগুলো সার্ভারের response। request একটি method ও path নাম দেয়; response একটি status code (200 OK) দিয়ে শুরু হয় ও একটি JSON body ফেরত দেয়।') },
      ],
    },
    {
      h: l('HTTP methods', 'HTTP method'),
      blocks: [
        { p: l('The method states your intent. Two properties matter: a method is "safe" if it does not change anything on the server, and "idempotent" if doing it many times has the same effect as doing it once. These properties are what let the web cache, retry, and pre-fetch safely.', 'method আপনার উদ্দেশ্য জানায়। দুটি বৈশিষ্ট্য গুরুত্বপূর্ণ: একটি method "safe" যদি এটি সার্ভারে কিছু না বদলায়, আর "idempotent" যদি বহুবার করা একবার করার মতোই ফল দেয়। এই বৈশিষ্ট্যগুলোই ওয়েবকে নিরাপদে cache, retry ও pre-fetch করতে দেয়।') },
        { table: {
          head: [l('Method', 'Method'), l('Purpose', 'কাজ'), l('Safe / Idempotent', 'Safe / Idempotent')],
          rows: [
            [l('GET', 'GET'), l('Read a resource', 'একটি রিসোর্স পড়া'), l('Safe and idempotent', 'Safe ও idempotent')],
            [l('POST', 'POST'), l('Create a resource or submit data', 'একটি রিসোর্স তৈরি বা ডেটা জমা'), l('Neither (repeating may duplicate)', 'কোনোটিই নয় (বারবার করলে ডুপ্লিকেট হতে পারে)')],
            [l('PUT', 'PUT'), l('Replace a resource entirely', 'একটি রিসোর্স সম্পূর্ণ প্রতিস্থাপন'), l('Idempotent, not safe', 'Idempotent, safe নয়')],
            [l('PATCH', 'PATCH'), l('Partially update a resource', 'একটি রিসোর্স আংশিক আপডেট'), l('Not guaranteed idempotent', 'idempotent নিশ্চিত নয়')],
            [l('DELETE', 'DELETE'), l('Delete a resource', 'একটি রিসোর্স মুছুন'), l('Idempotent, not safe', 'Idempotent, safe নয়')],
          ],
        } },
      ],
    },
    {
      h: l('Reading the status code', 'status code পড়া'),
      blocks: [
        { p: l('The first digit of the status code tells you the category at a glance, so you know instantly whether the request worked, was redirected, or failed — and whose fault it was.', 'status code-এর প্রথম অঙ্কটি এক নজরে শ্রেণি বলে দেয়, তাই আপনি সঙ্গে সঙ্গে জানেন request কাজ করল, redirect হলো, নাকি ব্যর্থ হলো—আর তা কার দোষ।') },
        { list: [
          l('2xx success — 200 OK (here is your answer), 201 Created (a new resource was made), 204 No Content (done, nothing to return).', '2xx সফল—200 OK (এই আপনার উত্তর), 201 Created (একটি নতুন রিসোর্স তৈরি হলো), 204 No Content (হয়ে গেছে, ফেরত দেওয়ার কিছু নেই)।'),
          l('3xx redirection — 301 Moved Permanently, 302 Found (go look somewhere else), 304 Not Modified (use your cached copy).', '3xx redirect—301 Moved Permanently, 302 Found (অন্য কোথাও দেখুন), 304 Not Modified (আপনার cache করা কপি ব্যবহার করুন)।'),
          l('4xx client error (your request is wrong) — 400 Bad Request, 401 Unauthorized, 403 Forbidden, 404 Not Found, 429 Too Many Requests.', '4xx ক্লায়েন্ট এরর (আপনার request ভুল)—400 Bad Request, 401 Unauthorized, 403 Forbidden, 404 Not Found, 429 Too Many Requests।'),
          l('5xx server error (the server broke) — 500 Internal Server Error, 502 Bad Gateway, 503 Service Unavailable.', '5xx সার্ভার এরর (সার্ভার ভাঙল)—500 Internal Server Error, 502 Bad Gateway, 503 Service Unavailable।'),
        ] },
      ],
    },
    {
      h: l('When and where the method choice matters', 'কখন ও কোথায় method বাছাই গুরুত্বপূর্ণ'),
      blocks: [
        { p: l('You choose methods and status codes every time you design or call an API. The rule is to match the method to the intent so the rest of the web can behave correctly: GET must be safe, because browsers, proxies, and crawlers freely cache and pre-fetch GETs — if a GET changed data, a crawler could silently delete things. Use POST to create, PUT or PATCH to update, DELETE to remove, and return an honest status code so callers can react (retry a 503, fix a 400, re-authenticate on a 401).', 'আপনি প্রতিবার একটি API ডিজাইন বা কল করার সময় method ও status code বাছেন। নিয়ম হলো method-কে উদ্দেশ্যের সঙ্গে মেলানো যাতে বাকি ওয়েব সঠিকভাবে আচরণ করতে পারে: GET অবশ্যই safe হতে হবে, কারণ browser, proxy ও crawler অবাধে GET cache ও pre-fetch করে—একটি GET ডেটা বদলালে একটি crawler নীরবে জিনিস মুছে ফেলতে পারত। তৈরিতে POST, আপডেটে PUT বা PATCH, মুছতে DELETE ব্যবহার করুন, আর একটি সৎ status code ফেরত দিন যাতে caller সাড়া দিতে পারে (একটি 503 retry, একটি 400 ঠিক, একটি 401-এ পুনরায় auth)।') },
        { p: l('HTTP is also stateless: each request stands alone, and the server keeps no memory between them. That is what lets any server in a pool handle any request, which is why the web scales so well — but it means a logged-in session must be carried on every request, usually as a cookie or a token. Over the years the wire protocol has evolved (HTTP/1.1 keep-alive, HTTP/2 multiplexing many requests over one connection, HTTP/3 running over QUIC on UDP), but this same request/response model has stayed the same.', 'HTTP আবার stateless: প্রতিটি request একা দাঁড়ায়, আর সার্ভার এদের মধ্যে কোনো স্মৃতি রাখে না। এটিই একটি pool-এর যেকোনো সার্ভারকে যেকোনো request সামলাতে দেয়, যে কারণে ওয়েব এত ভালো scale করে—কিন্তু এর মানে একটি লগইন সেশনকে প্রতিটি request-এ বহন করতে হয়, সাধারণত একটি cookie বা token হিসেবে। বছরের পর বছর wire প্রোটোকল বিবর্তিত হয়েছে (HTTP/1.1 keep-alive, HTTP/2 এক সংযোগে অনেক request multiplex, HTTP/3 UDP-তে QUIC-এর ওপর), কিন্তু এই একই request/response মডেল একই থেকেছে।') },
      ],
    },
    {
      h: l('Common mistakes', 'সাধারণ ভুল'),
      blocks: [
        { list: [
          l('Using GET to change data, or POST just to read — this breaks caching, safety, and idempotency expectations across the whole web.', 'ডেটা বদলাতে GET, বা শুধু পড়তে POST ব্যবহার—এটি পুরো ওয়েব জুড়ে caching, safety ও idempotency প্রত্যাশা ভাঙে।'),
          l('Returning 200 OK for an error and hiding the real problem in the body, so clients cannot tell success from failure.', 'একটি এররে 200 OK ফেরত দিয়ে আসল সমস্যা body-তে লুকানো, ফলে ক্লায়েন্ট সফল ও ব্যর্থতা আলাদা করতে পারে না।'),
          l('Assuming the server remembers you between requests — without a cookie or token, every request is a stranger.', 'সার্ভার request-এর মধ্যে আপনাকে মনে রাখে ধরে নেওয়া—cookie বা token ছাড়া প্রতিটি request একজন অচেনা।'),
          l('Confusing 401 Unauthorized (you are not authenticated) with 403 Forbidden (you are authenticated but not allowed).', '401 Unauthorized (আপনি authenticated নন) ও 403 Forbidden (আপনি authenticated কিন্তু অনুমতি নেই) গুলিয়ে ফেলা।'),
        ] },
      ],
    },
    {
      h: l('Remember in one line', 'এক লাইনে মনে রাখুন'),
      blocks: [
        { list: [
          l('HTTP is request (method + path) → response (status code + body); simple, text-based, and universal.', 'HTTP হলো request (method + path) → response (status code + body); সরল, text-ভিত্তিক ও সর্বজনীন।'),
          l('Match the method to intent (GET read, POST create, PUT/PATCH update, DELETE delete) and read the status class (2xx/3xx/4xx/5xx).', 'method-কে উদ্দেশ্যের সঙ্গে মেলান (GET পড়া, POST তৈরি, PUT/PATCH আপডেট, DELETE মুছুন) ও status শ্রেণি পড়ুন (2xx/3xx/4xx/5xx)।'),
          l('HTTP is stateless, so sessions ride on cookies or tokens carried with every request.', 'HTTP stateless, তাই সেশন প্রতিটি request-এর সঙ্গে বহন করা cookie বা token-এ চলে।'),
        ] },
      ],
    },
  ],

  // ── cn-https-tls · HTTPS & TLS ────────────────────────────────────────────
  'cn-https-tls': [
    {
      h: l('What are HTTPS and TLS?', 'HTTPS ও TLS কী?'),
      blocks: [
        { p: l('HTTPS is plain HTTP running inside a TLS-encrypted connection, on port 443. TLS (Transport Layer Security) does three jobs at once: it encrypts the traffic so no one can read it (confidentiality), it detects any tampering in transit (integrity), and it proves the server really is who it claims to be, using a certificate (authentication). HTTPS is simply HTTP that has gained all three.', 'HTTPS হলো সাধারণ HTTP যা পোর্ট ৪৪৩-এ একটি TLS-encrypted সংযোগের ভেতরে চলে। TLS (Transport Layer Security) একসঙ্গে তিনটি কাজ করে: এটি ট্রাফিক encrypt করে যাতে কেউ পড়তে না পারে (confidentiality), যাত্রাপথে যেকোনো কারচুপি শনাক্ত করে (integrity), আর একটি certificate দিয়ে প্রমাণ করে সার্ভার সত্যিই যা দাবি করে তা-ই (authentication)। HTTPS হলো সহজভাবে সেই HTTP যা তিনটিই পেয়েছে।') },
        { p: l('The problem is that plain HTTP is sent in cleartext. Anyone sitting on the path — a café Wi-Fi hotspot, an internet provider, a compromised router — can read every byte, quietly change it, or even impersonate the site entirely. Passwords, session cookies, credit-card numbers, and private messages would all be exposed. TLS closes that gap so the conversation is private and verifiably genuine, even across a hostile network.', 'সমস্যা হলো সাধারণ HTTP cleartext-এ পাঠানো হয়। পথে বসা যে কেউ—একটি ক্যাফে Wi-Fi hotspot, একটি ইন্টারনেট provider, একটি compromised router—প্রতিটি বাইট পড়তে, নীরবে বদলাতে, এমনকি পুরো সাইট impersonate করতে পারে। পাসওয়ার্ড, session cookie, ক্রেডিট-কার্ড নম্বর ও ব্যক্তিগত বার্তা সব ফাঁস হতো। TLS সেই ফাঁক বন্ধ করে যাতে কথোপকথন ব্যক্তিগত ও যাচাইযোগ্যভাবে খাঁটি হয়, এমনকি একটি বৈরী নেটওয়ার্ক জুড়েও।') },
        { note: l('Think of a sealed, tamper-evident envelope sent by someone whose ID has already been checked by a trusted authority. You can be sure nobody read it, nobody altered it, and it truly came from who it says — that is exactly what TLS gives an HTTP message.', 'একটি সিল করা, কারচুপি-প্রকাশক খাম ভাবুন যা এমন কেউ পাঠিয়েছে যার পরিচয় একটি বিশ্বস্ত কর্তৃপক্ষ আগেই যাচাই করেছে। আপনি নিশ্চিত হতে পারেন কেউ পড়েনি, কেউ বদলায়নি, আর এটি সত্যিই যার নাম বলা তার কাছ থেকেই এসেছে—TLS একটি HTTP বার্তাকে ঠিক এটাই দেয়।'), kind: 'tip' },
      ],
    },
    {
      h: l('The TLS handshake, step by step', 'TLS handshake, ধাপে ধাপে'),
      blocks: [
        { p: l('Before any HTTP data flows, TLS runs a short handshake to verify the server and agree on a secret key. Here is what happens.', 'কোনো HTTP ডেটা যাওয়ার আগে TLS একটি সংক্ষিপ্ত handshake চালায় সার্ভার যাচাই ও একটি গোপন key-তে একমত হতে। যা ঘটে তা এই।') },
        { steps: [
          l('ClientHello — the client lists the TLS versions and cipher suites it supports and sends a random number.', 'ClientHello—ক্লায়েন্ট যে TLS version ও cipher suite সমর্থন করে তার তালিকা দেয় ও একটি random সংখ্যা পাঠায়।'),
          l('ServerHello + Certificate — the server picks a version and cipher, sends its own random, and presents its certificate, which contains its public key and its domain name and is signed by a Certificate Authority (CA).', 'ServerHello + Certificate—সার্ভার একটি version ও cipher বাছে, নিজের random পাঠায়, ও তার certificate দেখায়, যাতে তার public key ও domain নাম থাকে এবং যা একটি Certificate Authority (CA) সই করেছে।'),
          l('Certificate check — the client verifies the certificate against its list of trusted CAs: is it signed by a CA I trust, still valid (not expired), and issued for this exact domain? If not, the browser shows a security warning and stops.', 'Certificate check—ক্লায়েন্ট তার বিশ্বস্ত CA-তালিকার বিপরীতে certificate যাচাই করে: এটি কি আমার বিশ্বাস করা একটি CA সই করেছে, এখনো বৈধ (মেয়াদ শেষ নয়), ও ঠিক এই domain-এর জন্য জারি? না হলে browser একটি নিরাপত্তা সতর্কতা দেখায় ও থামে।'),
          l('Key exchange — client and server use asymmetric cryptography (typically ephemeral Diffie-Hellman, ECDHE) to agree on a shared symmetric session key that a passive eavesdropper cannot derive.', 'Key exchange—ক্লায়েন্ট ও সার্ভার asymmetric cryptography (সাধারণত ephemeral Diffie-Hellman, ECDHE) ব্যবহার করে একটি শেয়ার্ড symmetric session key-তে একমত হয় যা একজন নিষ্ক্রিয় আড়িপাতাকারী বের করতে পারে না।'),
          l('Finished — both sides switch to that session key. From here every HTTP request and response is encrypted with fast symmetric encryption (such as AES-GCM or ChaCha20).', 'Finished—দুই পক্ষ সেই session key-তে বদলায়। এখান থেকে প্রতিটি HTTP request ও response দ্রুত symmetric encryption (যেমন AES-GCM বা ChaCha20) দিয়ে encrypt হয়।'),
        ] },
        { code: `Client                                        Server
  |  ClientHello  (TLS versions, ciphers)  ---->  |
  |  <----  ServerHello  (chosen cipher)          |
  |  <----  Certificate  (public key, CA-signed)  |
  |  ... client verifies cert against trusted CAs |
  |  Key exchange (ECDHE)  <-------------------->  |
  |  Finished (switch to session key)  <-------->  |
  |  ====  encrypted HTTP data now flows  ====     |`, caption: l('The handshake costs a round trip or two before the first byte of real data, but only happens once per connection. TLS 1.3 streamlines it into a single round trip, and can resume even faster.', 'handshake আসল ডেটার প্রথম বাইটের আগে এক-দুই round trip খরচ করে, তবে প্রতি সংযোগে একবারই ঘটে। TLS 1.3 একে একটি round trip-এ সরল করে, আর আরও দ্রুত resume করতে পারে।') },
      ],
    },
    {
      h: l('Why HTTPS matters', 'HTTPS কেন গুরুত্বপূর্ণ'),
      blocks: [
        { list: [
          l('Confidentiality — passwords, cookies, and payment details cannot be read by anyone on the network path.', 'Confidentiality—পাসওয়ার্ড, cookie ও পেমেন্ট তথ্য নেটওয়ার্ক পথের কেউ পড়তে পারে না।'),
          l('Integrity — no one can inject ads or malware or silently alter the page in transit; tampering is detected.', 'Integrity—কেউ যাত্রাপথে বিজ্ঞাপন বা malware ঢোকাতে বা নীরবে পেজ বদলাতে পারে না; কারচুপি ধরা পড়ে।'),
          l('Authentication — the certificate proves you are really talking to the bank, not an impostor who intercepted you.', 'Authentication—certificate প্রমাণ করে আপনি সত্যিই ব্যাংকের সঙ্গে কথা বলছেন, আপনাকে আটকানো কোনো ছদ্মবেশীর সঙ্গে নয়।'),
          l('Trust and reach — browsers mark plain HTTP as "Not Secure," and modern features (HTTP/2 and HTTP/3, service workers, geolocation) only work over HTTPS.', 'Trust ও reach—browser সাধারণ HTTP-কে "Not Secure" চিহ্নিত করে, আর আধুনিক ফিচার (HTTP/2 ও HTTP/3, service worker, geolocation) শুধু HTTPS-এ কাজ করে।'),
        ] },
      ],
    },
    {
      h: l('Two kinds of encryption, working together', 'দুই ধরনের encryption, একসঙ্গে কাজ করে'),
      blocks: [
        { p: l('The clever part of TLS is that it uses two forms of cryptography, each for what it is good at. Asymmetric (public/private key) crypto is used only briefly, during the handshake, to verify identity and agree on a key — it is secure but slow. Then everything switches to fast symmetric crypto (one shared key) for the actual data.', 'TLS-এর চতুর দিক হলো এটি দুই ধরনের cryptography ব্যবহার করে, প্রতিটি যা ভালো পারে তার জন্য। Asymmetric (public/private key) crypto শুধু handshake-এর সময় সংক্ষিপ্তভাবে ব্যবহৃত হয়, পরিচয় যাচাই ও একটি key-তে একমত হতে—এটি নিরাপদ কিন্তু ধীর। তারপর সবকিছু আসল ডেটার জন্য দ্রুত symmetric crypto (একটি শেয়ার্ড key)-তে বদলায়।') },
        { table: {
          head: [l('Aspect', 'দিক'), l('Asymmetric (handshake)', 'Asymmetric (handshake)'), l('Symmetric (data)', 'Symmetric (ডেটা)')],
          rows: [
            [l('Used for', 'যার জন্য'), l('Verifying identity, agreeing on a key', 'পরিচয় যাচাই, একটি key-তে একমত হওয়া'), l('Encrypting the actual HTTP bytes', 'আসল HTTP বাইট encrypt করা')],
            [l('Keys', 'Key'), l('A public/private key pair', 'একটি public/private key জোড়া'), l('One shared session key', 'একটি শেয়ার্ড session key')],
            [l('Speed', 'গতি'), l('Slow (expensive math)', 'ধীর (ব্যয়বহুল গণিত)'), l('Fast', 'দ্রুত')],
            [l('When', 'কখন'), l('Only during the handshake', 'শুধু handshake-এর সময়'), l('For the whole session afterwards', 'পরে পুরো session জুড়ে')],
          ],
        } },
      ],
    },
    {
      h: l('When and where to use HTTPS', 'কখন ও কোথায় HTTPS ব্যবহার করবেন'),
      blocks: [
        { p: l('The modern answer is: everywhere, always. There is no longer a good reason to serve any page over plain HTTP — free automated certificates (for example from Let’s Encrypt) and cheap CPUs have removed the old excuses about cost and speed. Serve the whole site over HTTPS, and use HSTS to tell browsers never to try the insecure version again.', 'আধুনিক উত্তর হলো: সব জায়গায়, সবসময়। যেকোনো পেজ সাধারণ HTTP-তে পরিবেশন করার আর ভালো কারণ নেই—ফ্রি স্বয়ংক্রিয় certificate (যেমন Let’s Encrypt থেকে) ও সস্তা CPU খরচ ও গতির পুরনো অজুহাত সরিয়ে দিয়েছে। পুরো সাইট HTTPS-এ পরিবেশন করুন, আর HSTS ব্যবহার করে browser-কে বলুন আর কখনো অনিরাপদ সংস্করণ চেষ্টা না করতে।') },
        { p: l('In practice TLS is often "terminated" at the edge — a load balancer or CDN handles the handshake and certificate, then forwards plain HTTP to your app servers inside a trusted network. Wherever the certificate lives, it has an expiry date, so automate renewal: a lapsed certificate breaks HTTPS for every visitor at once.', 'বাস্তবে TLS প্রায়ই edge-এ "terminate" হয়—একটি load balancer বা CDN handshake ও certificate সামলায়, তারপর একটি বিশ্বস্ত নেটওয়ার্কের ভেতরে আপনার অ্যাপ সার্ভারে সাধারণ HTTP পাঠায়। certificate যেখানেই থাকুক, এর একটি মেয়াদ শেষের তারিখ আছে, তাই নবায়ন অটোমেট করুন: একটি মেয়াদোত্তীর্ণ certificate একসঙ্গে প্রতিটি দর্শকের জন্য HTTPS ভাঙে।') },
      ],
    },
    {
      h: l('Common mistakes', 'সাধারণ ভুল'),
      blocks: [
        { list: [
          l('Serving login or payment pages over plain HTTP, exposing credentials to anyone on the path.', 'লগইন বা পেমেন্ট পেজ সাধারণ HTTP-তে পরিবেশন, পথের যে কারো কাছে ক্রেডেনশিয়াল ফাঁস।'),
          l('Letting a certificate expire, which breaks HTTPS for every visitor at once — always automate renewal.', 'একটি certificate মেয়াদ শেষ হতে দেওয়া, যা একসঙ্গে প্রতিটি দর্শকের জন্য HTTPS ভাঙে—সবসময় নবায়ন অটোমেট করুন।'),
          l('Thinking HTTPS makes a site "safe" overall — it secures data in transit, but not a vulnerable app, weak passwords, or a hacked server.', 'HTTPS একটি সাইটকে সার্বিকভাবে "নিরাপদ" করে ভাবা—এটি যাত্রাপথের ডেটা রক্ষা করে, কিন্তু একটি দুর্বল অ্যাপ, দুর্বল পাসওয়ার্ড বা hack হওয়া সার্ভার নয়।'),
          l('Clicking through browser certificate warnings instead of treating them as the genuine man-in-the-middle alarms they are.', 'browser-এর certificate সতর্কতা উপেক্ষা করে ক্লিক করে এগোনো, যেগুলো আসলে সত্যিকারের man-in-the-middle সতর্কবার্তা তা না ভেবে।'),
        ] },
      ],
    },
    {
      h: l('Remember in one line', 'এক লাইনে মনে রাখুন'),
      blocks: [
        { list: [
          l('HTTPS = HTTP inside TLS, giving confidentiality, integrity, and authentication on port 443.', 'HTTPS = TLS-এর ভেতরে HTTP, পোর্ট ৪৪৩-এ confidentiality, integrity ও authentication দেয়।'),
          l('The TLS handshake verifies the certificate and agrees on a session key before any data flows.', 'TLS handshake কোনো ডেটা যাওয়ার আগে certificate যাচাই করে ও একটি session key-তে একমত হয়।'),
          l('Asymmetric crypto sets up the key; fast symmetric crypto protects the data. Use HTTPS everywhere and never let the certificate expire.', 'Asymmetric crypto key সাজায়; দ্রুত symmetric crypto ডেটা রক্ষা করে। সব জায়গায় HTTPS ব্যবহার করুন ও certificate কখনো মেয়াদ শেষ হতে দেবেন না।'),
        ] },
      ],
    },
  ],
}
