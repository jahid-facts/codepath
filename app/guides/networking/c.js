// Deep, bilingual (English / Bangla) teaching guides for the Computer Networking
// course — internet-layer and transport-layer topics, keyed by topic id.
// Shape mirrors app/course-guides.js and app/guides/dsa/a.js: each guide is an
// array of sections { h, blocks }, rendered by GuideBlock in app/LearningApp.js.
// Facts are drawn from the rawTopics rows in app/courses/networking.js.

const l = (en, bn) => ({ en, bn })

export default {
  // ── cn-nat · NAT & private addresses ──────────────────────────────────────
  'cn-nat': [
    {
      h: l('What is NAT?', 'NAT কী?'),
      blocks: [
        { p: l('NAT (Network Address Translation) lets many devices on a private network share a single public IP address. Your router sits on the boundary between your home or office network and the internet, and it rewrites the addresses (and ports) on every packet that crosses that boundary — replacing the private source address on the way out and restoring it on the way back.', 'NAT (Network Address Translation) অনেকগুলো প্রাইভেট ডিভাইসকে একটিমাত্র পাবলিক IP ঠিকানা শেয়ার করতে দেয়। আপনার router আপনার বাসা বা অফিস নেটওয়ার্ক ও ইন্টারনেটের সীমানায় বসে, আর সীমানা পার হওয়া প্রতিটি packet-এর ঠিকানা (ও port) পুনর্লিখন করে—বাইরে যাওয়ার সময় প্রাইভেট source ঠিকানা বদলে দেয়, ফেরার সময় আবার ফিরিয়ে দেয়।') },
        { p: l('The problem NAT solves is IPv4 exhaustion. There are only about 4.3 billion IPv4 addresses, far fewer than the number of phones, laptops, and servers in the world, so we cannot give every device a unique public one. The fix is to reserve a few private ranges (10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16) that any network can reuse internally, and let NAT translate them onto one shared public address whenever traffic actually needs to reach the internet.', 'NAT যে সমস্যা সমাধান করে তা হলো IPv4 ফুরিয়ে যাওয়া। মাত্র প্রায় ৪৩০ কোটি IPv4 ঠিকানা আছে, পৃথিবীর ফোন-ল্যাপটপ-সার্ভারের সংখ্যার চেয়ে অনেক কম, তাই প্রতিটি ডিভাইসকে একটি ইউনিক পাবলিক ঠিকানা দেওয়া যায় না। সমাধান হলো কিছু প্রাইভেট রেঞ্জ (10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16) সংরক্ষণ করা যা যেকোনো নেটওয়ার্ক ভেতরে পুনরায় ব্যবহার করতে পারে, আর ট্রাফিক যখন সত্যিই ইন্টারনেটে পৌঁছাতে হয় তখন NAT সেগুলোকে একটি শেয়ার্ড পাবলিক ঠিকানায় অনুবাদ করে।') },
        { note: l('Think of an office with one public phone number and many internal extensions. Outsiders only ever dial the one public number; the receptionist remembers which staff member placed each outgoing call and routes the reply back to the right extension. The public number is your one public IP; the extensions are your private devices; the receptionist is NAT.', 'একটি অফিস ভাবুন যার একটি পাবলিক ফোন নম্বর ও অনেক অভ্যন্তরীণ এক্সটেনশন আছে। বাইরের লোকেরা শুধু ওই একটি পাবলিক নম্বরেই ডায়াল করে; রিসেপশনিস্ট মনে রাখেন কোন কর্মী কোন কল করেছিলেন ও উত্তরটি সঠিক এক্সটেনশনে ফেরত পাঠান। পাবলিক নম্বরটি আপনার একটি পাবলিক IP; এক্সটেনশনগুলো আপনার প্রাইভেট ডিভাইস; রিসেপশনিস্টই NAT।'), kind: 'tip' },
      ],
    },
    {
      h: l('How NAT works, step by step', 'NAT কীভাবে কাজ করে, ধাপে ধাপে'),
      blocks: [
        { p: l('The common form on home routers is called PAT (Port Address Translation), or NAT overload. It uses port numbers so that many inside devices can share one outside address at the same time without their replies getting mixed up.', 'হোম router-এ প্রচলিত রূপটির নাম PAT (Port Address Translation), বা NAT overload। এটি port নম্বর ব্যবহার করে যাতে ভেতরের অনেক ডিভাইস একই সময়ে একটি বাইরের ঠিকানা শেয়ার করতে পারে ও তাদের উত্তর মিশে না যায়।') },
        { steps: [
          l('A device (say 192.168.1.10) sends a packet to a website. Its source is its private IP and a random source port; its destination is the public server.', 'একটি ডিভাইস (ধরুন 192.168.1.10) একটি ওয়েবসাইটে packet পাঠায়। এর source হলো তার প্রাইভেট IP ও একটি র‍্যান্ডম source port; গন্তব্য হলো পাবলিক সার্ভার।'),
          l('The router rewrites the source to its own public IP and a unique port it picks, and writes that mapping into a translation table.', 'router source-কে তার নিজের পাবলিক IP ও তার বাছা একটি ইউনিক port-এ পুনর্লিখন করে, এবং সেই ম্যাপিং একটি translation table-এ লিখে রাখে।'),
          l('The packet reaches the server, which sees only the router’s public IP and port — it never learns the private address behind it.', 'packet সার্ভারে পৌঁছায়, যা শুধু router-এর পাবলিক IP ও port দেখে—এর পেছনের প্রাইভেট ঠিকানা কখনো জানে না।'),
          l('The reply comes back to the router’s public IP on that same port. The router looks up the table, finds it belongs to 192.168.1.10, and rewrites the destination back to the private device.', 'উত্তরটি ওই একই port-এ router-এর পাবলিক IP-তে ফিরে আসে। router table দেখে বুঝে নেয় এটি 192.168.1.10-এর, ও গন্তব্য আবার প্রাইভেট ডিভাইসে পুনর্লিখন করে।'),
          l('The device receives the reply as if it had talked to the server directly. All of this is invisible to both ends.', 'ডিভাইসটি উত্তর পায় যেন সে সরাসরি সার্ভারের সঙ্গে কথা বলেছে। এই সবই দুই প্রান্তের কাছেই অদৃশ্য।'),
        ] },
        { code: `# The router's NAT (PAT) translation table
# Inside (private)      ->  Outside (public)          ->  Destination
192.168.1.10 : 51000    ->  203.0.113.7 : 40001       ->  142.250.72.14 : 443
192.168.1.11 : 51000    ->  203.0.113.7 : 40002       ->  142.250.72.14 : 443
192.168.1.12 : 6521     ->  203.0.113.7 : 40003       ->  93.184.216.34 : 80

# Two devices used the SAME private port (51000). NAT still keeps them
# apart because it gave each a DIFFERENT public port (40001 vs 40002).`, caption: l('One public IP (203.0.113.7) serves three private devices at once. The public port is the key that lets NAT route each reply home.', 'একটি পাবলিক IP (203.0.113.7) একসঙ্গে তিনটি প্রাইভেট ডিভাইসকে সেবা দেয়। পাবলিক port-ই সেই চাবি যা NAT-কে প্রতিটি উত্তর ঠিক জায়গায় ফেরাতে দেয়।') },
      ],
    },
    {
      h: l('Private address ranges to know', 'যে প্রাইভেট ঠিকানা রেঞ্জ জানা দরকার'),
      blocks: [
        { p: l('These ranges (defined in RFC 1918) are never routed on the public internet. If you see one, you are looking at a device behind NAT, not a public server.', 'এই রেঞ্জগুলো (RFC 1918-এ সংজ্ঞায়িত) কখনো পাবলিক ইন্টারনেটে রাউট হয় না। এদের একটি দেখলে বুঝবেন আপনি NAT-এর পেছনের একটি ডিভাইস দেখছেন, পাবলিক সার্ভার নয়।') },
        { table: {
          head: [l('Range', 'রেঞ্জ'), l('CIDR', 'CIDR'), l('Typical use', 'সাধারণ ব্যবহার')],
          rows: [
            [l('10.0.0.0 – 10.255.255.255', '10.0.0.0 – 10.255.255.255'), l('10.0.0.0/8', '10.0.0.0/8'), l('Large corporate and cloud networks (~16M addresses).', 'বড় কর্পোরেট ও cloud নেটওয়ার্ক (~১.৬ কোটি ঠিকানা)।')],
            [l('172.16.0.0 – 172.31.255.255', '172.16.0.0 – 172.31.255.255'), l('172.16.0.0/12', '172.16.0.0/12'), l('Mid-size networks; common default in Docker.', 'মাঝারি নেটওয়ার্ক; Docker-এ প্রচলিত ডিফল্ট।')],
            [l('192.168.0.0 – 192.168.255.255', '192.168.0.0 – 192.168.255.255'), l('192.168.0.0/16', '192.168.0.0/16'), l('Home and small-office routers (192.168.1.x).', 'বাসা ও ছোট-অফিস router (192.168.1.x)।')],
            [l('127.0.0.1', '127.0.0.1'), l('127.0.0.0/8', '127.0.0.0/8'), l('Loopback — the machine talking to itself, not NAT.', 'Loopback—মেশিন নিজের সঙ্গে কথা বলে, NAT নয়।')],
          ],
        } },
      ],
    },
    {
      h: l('The inbound problem and port forwarding', 'ইনবাউন্ড সমস্যা ও port forwarding'),
      blocks: [
        { p: l('NAT works effortlessly for connections your devices start (outbound), because the router creates the table entry at that moment. But an unsolicited connection arriving from the internet (inbound) has no table entry, so the router does not know which private device it is for — and drops it. This is why you cannot just host a game server or SSH into your laptop from outside without extra setup.', 'আপনার ডিভাইস যেসব সংযোগ শুরু করে (outbound) তাতে NAT অনায়াসে কাজ করে, কারণ router তখনই table entry বানায়। কিন্তু ইন্টারনেট থেকে না-চাওয়া একটি সংযোগ এলে (inbound) কোনো table entry থাকে না, তাই router জানে না এটি কোন প্রাইভেট ডিভাইসের জন্য—ও ফেলে দেয়। এ কারণেই বাড়তি সেটআপ ছাড়া আপনি বাইরে থেকে একটি game server host করতে বা ল্যাপটপে SSH করতে পারেন না।') },
        { list: [
          l('Port forwarding — you manually tell the router "traffic arriving on public port 2222 always goes to 192.168.1.10 port 22." Now inbound SSH works.', 'Port forwarding—আপনি router-কে ম্যানুয়ালি বলেন "পাবলিক port 2222-এ আসা ট্রাফিক সবসময় 192.168.1.10-এর port 22-এ যাবে।" এখন inbound SSH কাজ করে।'),
          l('Peer-to-peer apps (video calls, gaming) use NAT traversal tricks — STUN, TURN, and hole punching — to work around the same limitation automatically.', 'পিয়ার-টু-পিয়ার অ্যাপ (ভিডিও কল, গেমিং) একই সীমাবদ্ধতা এড়াতে NAT traversal কৌশল—STUN, TURN, ও hole punching—স্বয়ংক্রিয়ভাবে ব্যবহার করে।'),
          l('CGNAT (Carrier-Grade NAT) means your ISP also NATs you, so even your "public" IP is shared — port forwarding may not be possible at all.', 'CGNAT (Carrier-Grade NAT) মানে আপনার ISP-ও আপনাকে NAT করে, তাই আপনার "পাবলিক" IP-ও শেয়ার করা—port forwarding একেবারেই সম্ভব না-ও হতে পারে।'),
        ] },
      ],
    },
    {
      h: l('When and where NAT is used', 'NAT কোথায় ও কখন ব্যবহৃত হয়'),
      blocks: [
        { p: l('NAT is everywhere: almost every home router, office network, and cloud VPC uses it so that dozens or thousands of internal machines can reach the internet through a handful of public addresses. It also gives a mild side benefit — because inside hosts are not directly addressable, they are not directly reachable either, which acts as a crude first layer of isolation (though it is not a real firewall).', 'NAT সর্বত্র: প্রায় প্রতিটি হোম router, অফিস নেটওয়ার্ক ও cloud VPC এটি ব্যবহার করে যাতে ভেতরের কয়েক ডজন বা হাজার মেশিন কয়েকটি পাবলিক ঠিকানা দিয়ে ইন্টারনেটে পৌঁছাতে পারে। এটি একটি হালকা পার্শ্ব-সুবিধাও দেয়—ভেতরের হোস্ট সরাসরি ঠিকানাযোগ্য না হওয়ায় সরাসরি পৌঁছানোও যায় না, যা একটি মোটামুটি প্রথম স্তরের বিচ্ছিন্নতা হিসেবে কাজ করে (যদিও এটি আসল firewall নয়)।') },
        { p: l('You lean on NAT less when every device genuinely needs to be reachable, or on IPv6, whose address space is so vast that each device can have its own globally unique address and NAT becomes unnecessary. Until IPv6 is universal, though, NAT is the glue holding the IPv4 internet together.', 'NAT-এর ওপর কম নির্ভর করেন যখন প্রতিটি ডিভাইসকে সত্যিই পৌঁছানোযোগ্য হতে হয়, অথবা IPv6-তে, যার ঠিকানা-জায়গা এত বিশাল যে প্রতিটি ডিভাইস নিজের গ্লোবালি ইউনিক ঠিকানা পেতে পারে ও NAT অপ্রয়োজনীয় হয়। তবে IPv6 সর্বজনীন না হওয়া পর্যন্ত NAT-ই IPv4 ইন্টারনেটকে জোড়া দিয়ে রাখা আঠা।') },
      ],
    },
    {
      h: l('Common mistakes', 'সাধারণ ভুল'),
      blocks: [
        { list: [
          l('Expecting an inbound connection to reach a device behind NAT without port forwarding — outbound "just works," inbound does not.', 'port forwarding ছাড়াই NAT-এর পেছনের ডিভাইসে inbound সংযোগ পৌঁছাবে আশা করা—outbound "এমনিতেই চলে," inbound নয়।'),
          l('Treating NAT as a security firewall. It hides addresses, but it does not inspect or filter malicious traffic; you still need a real firewall.', 'NAT-কে নিরাপত্তা firewall ভাবা। এটি ঠিকানা লুকায়, তবে ক্ষতিকর ট্রাফিক পরিদর্শন বা ফিল্টার করে না; আসল firewall এখনো দরকার।'),
          l('Exposing a private IP (like 192.168.1.10) in a config and expecting the public internet to reach it — those addresses are not routable outside your LAN.', 'একটি config-এ প্রাইভেট IP (যেমন 192.168.1.10) প্রকাশ করে পাবলিক ইন্টারনেট থেকে পৌঁছানো আশা করা—এই ঠিকানাগুলো আপনার LAN-এর বাইরে রাউটেবল নয়।'),
          l('Overlapping private ranges between two networks you later need to connect (for example two 192.168.1.0/24 sites joined by a VPN) — the duplicate addresses collide.', 'পরে যুক্ত করতে হবে এমন দুটি নেটওয়ার্কের মধ্যে প্রাইভেট রেঞ্জ ওভারল্যাপ করা (যেমন VPN দিয়ে জোড়া দুটি 192.168.1.0/24 সাইট)—ডুপ্লিকেট ঠিকানা সংঘর্ষ করে।'),
        ] },
      ],
    },
    {
      h: l('Remember in one line', 'এক লাইনে মনে রাখুন'),
      blocks: [
        { list: [
          l('NAT rewrites private addresses onto one shared public IP (and port) at the router boundary, so many devices share few public addresses.', 'NAT router সীমানায় প্রাইভেট ঠিকানাগুলোকে একটি শেয়ার্ড পাবলিক IP (ও port)-এ পুনর্লিখন করে, তাই অনেক ডিভাইস কম পাবলিক ঠিকানা শেয়ার করে।'),
          l('Outbound connections work automatically; inbound needs port forwarding or NAT-traversal tricks.', 'outbound সংযোগ স্বয়ংক্রিয়ভাবে চলে; inbound-এ port forwarding বা NAT-traversal কৌশল লাগে।'),
          l('It buys time against IPv4 exhaustion but is not a firewall and breaks direct peer-to-peer reachability.', 'এটি IPv4 ফুরানোর বিরুদ্ধে সময় কেনে, তবে firewall নয় ও সরাসরি peer-to-peer পৌঁছানো ভাঙে।'),
        ] },
      ],
    },
  ],

  // ── cn-icmp · ICMP, ping & traceroute ─────────────────────────────────────
  'cn-icmp': [
    {
      h: l('What is ICMP?', 'ICMP কী?'),
      blocks: [
        { p: l('ICMP (Internet Control Message Protocol) is the network layer’s built-in messenger for errors and diagnostics. Plain IP just forwards packets and, if something goes wrong, silently drops them — it carries no way to say "that host is unreachable" or "your packet lived too long." ICMP is the small companion protocol that carries exactly those control and error messages back to the sender.', 'ICMP (Internet Control Message Protocol) হলো network layer-এর বিল্ট-ইন বার্তাবাহক, এরর ও ডায়াগনস্টিকের জন্য। সাধারণ IP শুধু packet ফরওয়ার্ড করে, আর কিছু ভুল হলে নীরবে ফেলে দেয়—"ওই হোস্টে পৌঁছানো যাচ্ছে না" বা "আপনার packet বেশিক্ষণ বাঁচল" বলার কোনো উপায় এর নেই। ICMP হলো সেই ছোট সঙ্গী প্রোটোকল যা ঠিক এই নিয়ন্ত্রণ ও এরর বার্তাগুলো প্রেরকের কাছে ফিরিয়ে আনে।') },
        { p: l('ICMP is not used to send your application data — no web page or file rides on it. Instead it is the network telling you about itself. The two most famous tools, ping and traceroute, are built entirely on ICMP, which is why network engineers reach for them first when something is broken.', 'ICMP আপনার অ্যাপ্লিকেশন ডেটা পাঠাতে ব্যবহৃত হয় না—কোনো ওয়েব পেজ বা ফাইল এতে চড়ে না। বরং এটি নেটওয়ার্কের নিজের সম্পর্কে আপনাকে জানানো। দুটি বিখ্যাত টুল, ping ও traceroute, পুরোপুরি ICMP-র ওপর তৈরি, এ কারণেই কিছু ভাঙলে নেটওয়ার্ক ইঞ্জিনিয়াররা প্রথমে এদের ধরেন।') },
        { note: l('Think of ICMP as the delivery-status notes the postal service slips back to you: "address unknown," "recipient moved," or "return to sender." The letter itself (your data) is IP; the little status note about what happened to it is ICMP.', 'ICMP-কে ডাক বিভাগের ফিরিয়ে দেওয়া ডেলিভারি-স্ট্যাটাস নোট ভাবুন: "ঠিকানা অজানা," "প্রাপক চলে গেছেন," বা "প্রেরকের কাছে ফেরত।" চিঠিটি নিজে (আপনার ডেটা) হলো IP; এর কী হলো সেই ছোট স্ট্যাটাস নোটটি হলো ICMP।'), kind: 'tip' },
      ],
    },
    {
      h: l('How ping works', 'ping কীভাবে কাজ করে'),
      blocks: [
        { p: l('Ping answers one question: "is this host reachable, and how long does a round trip take?" It does so with a matched pair of ICMP messages.', 'ping একটি প্রশ্নের উত্তর দেয়: "এই হোস্টে কি পৌঁছানো যায়, ও একটি round trip-এ কত সময় লাগে?" এটি ICMP বার্তার একটি জোড়া দিয়ে তা করে।') },
        { steps: [
          l('Your machine sends an ICMP Echo Request (type 8) to the target IP.', 'আপনার মেশিন লক্ষ্য IP-তে একটি ICMP Echo Request (type 8) পাঠায়।'),
          l('If the host is up and ICMP is allowed, it replies with an ICMP Echo Reply (type 0).', 'হোস্ট চালু থাকলে ও ICMP অনুমোদিত হলে সে একটি ICMP Echo Reply (type 0) দিয়ে উত্তর দেয়।'),
          l('Ping measures the time between sending and receiving — that is the round-trip time (RTT), shown in milliseconds.', 'ping পাঠানো ও পাওয়ার মধ্যের সময় মাপে—সেটিই round-trip time (RTT), মিলিসেকেন্ডে দেখানো হয়।'),
          l('It repeats this several times and reports how many replies came back, so you can spot packet loss and jitter.', 'এটি কয়েকবার এটি পুনরাবৃত্তি করে ও কতটি উত্তর ফিরল তা জানায়, যাতে আপনি packet loss ও jitter ধরতে পারেন।'),
        ] },
        { code: `$ ping -c 4 example.com
PING example.com (93.184.216.34): 56 data bytes
64 bytes from 93.184.216.34: icmp_seq=0 ttl=56 time=11.2 ms
64 bytes from 93.184.216.34: icmp_seq=1 ttl=56 time=10.9 ms
64 bytes from 93.184.216.34: icmp_seq=2 ttl=56 time=11.4 ms
64 bytes from 93.184.216.34: icmp_seq=3 ttl=56 time=10.8 ms

--- example.com ping statistics ---
4 packets transmitted, 4 packets received, 0.0% packet loss
round-trip min/avg/max = 10.8/11.0/11.4 ms`, caption: l('0% packet loss and a steady ~11 ms RTT means the path is healthy. Rising loss or wildly varying times point to congestion or a flaky link.', '0% packet loss ও স্থির ~11 ms RTT মানে পথটি সুস্থ। বাড়তে থাকা loss বা এলোমেলো সময় congestion বা দুর্বল link নির্দেশ করে।') },
      ],
    },
    {
      h: l('How traceroute works', 'traceroute কীভাবে কাজ করে'),
      blocks: [
        { p: l('Traceroute reveals every router (hop) between you and a destination, and how long each hop takes. It uses a clever trick with the TTL (Time To Live) field that every IP packet carries — a counter that each router decrements by one.', 'traceroute আপনি ও গন্তব্যের মধ্যে প্রতিটি router (hop) ও প্রতিটি hop-এ কত সময় লাগে তা দেখায়। এটি প্রতিটি IP packet-এ থাকা TTL (Time To Live) ফিল্ড দিয়ে একটি চতুর কৌশল ব্যবহার করে—একটি কাউন্টার যা প্রতিটি router এক করে কমায়।') },
        { steps: [
          l('Send a packet with TTL = 1. The first router decrements it to 0, discards it, and returns an ICMP Time Exceeded (type 11). Now you know hop 1.', 'TTL = 1 দিয়ে একটি packet পাঠান। প্রথম router একে 0-তে কমায়, ফেলে দেয়, ও একটি ICMP Time Exceeded (type 11) ফেরত দেয়। এখন আপনি hop 1 জানেন।'),
          l('Send TTL = 2. It survives the first router but the second one discards it and reports back. Now you know hop 2.', 'TTL = 2 পাঠান। এটি প্রথম router পার হয় কিন্তু দ্বিতীয়টি ফেলে দিয়ে জানায়। এখন আপনি hop 2 জানেন।'),
          l('Keep increasing the TTL by one. Each step forces the next router down the path to reveal itself.', 'TTL এক করে বাড়াতে থাকুন। প্রতিটি ধাপ পথের পরের router-কে নিজেকে প্রকাশ করতে বাধ্য করে।'),
          l('When the packet finally reaches the destination, it replies differently (an Echo Reply, or a Destination Unreachable / port-unreachable), which tells traceroute to stop.', 'packet অবশেষে গন্তব্যে পৌঁছালে সে ভিন্নভাবে উত্তর দেয় (একটি Echo Reply, বা Destination Unreachable / port-unreachable), যা traceroute-কে থামতে বলে।'),
        ] },
        { code: `$ traceroute example.com
traceroute to example.com (93.184.216.34), 30 hops max
 1  192.168.1.1        1.1 ms   0.9 ms   1.0 ms   # your home router
 2  100.64.0.1        11.8 ms  12.0 ms  11.6 ms   # ISP (CGNAT gateway)
 3  10.20.30.1        13.2 ms  13.0 ms  13.4 ms   # ISP core
 4  * * *                                          # this hop blocks ICMP
 5  93.184.216.34     30.5 ms  30.2 ms  30.9 ms   # destination reached`, caption: l('Each line is one router closer to the target. The row of asterisks (hop 4) is a router that silently drops ICMP — normal, not a failure.', 'প্রতিটি লাইন লক্ষ্যের এক router কাছে। তারা-চিহ্নের সারি (hop 4) একটি router যা নীরবে ICMP ফেলে দেয়—স্বাভাবিক, ব্যর্থতা নয়।') },
      ],
    },
    {
      h: l('Key ICMP message types', 'গুরুত্বপূর্ণ ICMP বার্তার ধরন'),
      blocks: [
        { table: {
          head: [l('Type', 'Type'), l('Name', 'নাম'), l('Meaning', 'অর্থ')],
          rows: [
            [l('8', '8'), l('Echo Request', 'Echo Request'), l('"Are you there?" — sent by ping.', '"তুমি কি আছ?"—ping পাঠায়।')],
            [l('0', '0'), l('Echo Reply', 'Echo Reply'), l('"Yes, I am here." — the ping response.', '"হ্যাঁ, আমি আছি।"—ping-এর উত্তর।')],
            [l('3', '3'), l('Destination Unreachable', 'Destination Unreachable'), l('No route, host down, or port closed (codes distinguish which).', 'কোনো route নেই, হোস্ট down, বা port বন্ধ (code বলে কোনটি)।')],
            [l('11', '11'), l('Time Exceeded', 'Time Exceeded'), l('TTL hit zero — the engine behind traceroute.', 'TTL শূন্য হলো—traceroute-এর পেছনের ইঞ্জিন।')],
            [l('5', '5'), l('Redirect', 'Redirect'), l('"Use a better router for this destination."', '"এই গন্তব্যে ভালো একটি router ব্যবহার করো।"')],
          ],
        } },
      ],
    },
    {
      h: l('When and where to use ICMP tools', 'ICMP টুল কোথায় ও কখন ব্যবহার করবেন'),
      blocks: [
        { p: l('Reach for ping first to answer "is it even reachable?" — it is the fastest way to separate "the network is down" from "the app is broken." Reach for traceroute when ping fails or is slow and you need to know where on the path the problem lives: a hop that suddenly jumps in latency or stops responding points you at the guilty link. Together they let you localize a fault to a specific segment instead of guessing.', '"এটি কি আদৌ পৌঁছানোযোগ্য?" জানতে প্রথমে ping ধরুন—"নেটওয়ার্ক down" আর "অ্যাপ ভাঙা" আলাদা করার দ্রুততম উপায় এটি। ping ব্যর্থ বা ধীর হলে ও পথের কোথায় সমস্যা তা জানতে traceroute ধরুন: হঠাৎ latency লাফানো বা উত্তর বন্ধ করা একটি hop আপনাকে দোষী link-এর দিকে দেখায়। একসঙ্গে এরা অনুমান না করে একটি নির্দিষ্ট অংশে ত্রুটি স্থানীয় করতে দেয়।') },
        { note: l('Many hosts, firewalls, and routers deliberately rate-limit or block ICMP. A failed ping or a row of asterisks in traceroute does NOT prove a host is down — it may simply be filtering ICMP while happily serving real traffic on port 443.', 'অনেক হোস্ট, firewall ও router ইচ্ছাকৃতভাবে ICMP rate-limit বা block করে। ব্যর্থ ping বা traceroute-এ তারার সারি হোস্ট down তা প্রমাণ করে না—এটি হয়তো শুধু ICMP ফিল্টার করছে অথচ port 443-এ দিব্যি আসল ট্রাফিক দিচ্ছে।'), kind: 'warn' },
      ],
    },
    {
      h: l('Common mistakes', 'সাধারণ ভুল'),
      blocks: [
        { list: [
          l('Concluding a host is down because ping fails — ICMP may simply be filtered while the service is fully up.', 'ping ব্যর্থ হওয়ায় হোস্ট down ভাবা—service পুরো চালু থাকলেও ICMP হয়তো শুধু ফিল্টার করা।'),
          l('Reading traceroute asterisks as a broken path. A middle hop can hide from ICMP yet still forward your data perfectly.', 'traceroute-এর তারাগুলোকে ভাঙা পথ ভাবা। একটি মাঝের hop ICMP থেকে লুকিয়ে থেকেও আপনার ডেটা নিখুঁতভাবে ফরওয়ার্ড করতে পারে।'),
          l('Trusting a single ping. One reply says little; several reveal packet loss and jitter, which matter more than one number.', 'একটিমাত্র ping-এ ভরসা করা। একটি উত্তর কম বলে; কয়েকটি packet loss ও jitter দেখায়, যা একটি সংখ্যার চেয়ে বেশি গুরুত্বপূর্ণ।'),
          l('Expecting the last traceroute hop’s latency to be the slow one — high latency at hop 3 that stays high afterward is where the delay is added.', 'traceroute-এর শেষ hop-এর latency-ই ধীর ধরে নেওয়া—hop 3-এ বেশি latency যা পরেও বেশি থাকে সেখানেই দেরি যোগ হয়।'),
        ] },
      ],
    },
    {
      h: l('Remember in one line', 'এক লাইনে মনে রাখুন'),
      blocks: [
        { list: [
          l('ICMP is the network’s error-and-diagnostics messenger, not a data-carrying protocol.', 'ICMP হলো নেটওয়ার্কের এরর-ও-ডায়াগনস্টিক বার্তাবাহক, ডেটা-বহনকারী প্রোটোকল নয়।'),
          l('Ping (Echo Request/Reply) tests reachability and RTT; traceroute uses the TTL trick and Time Exceeded to reveal each hop.', 'ping (Echo Request/Reply) পৌঁছানো ও RTT যাচাই করে; traceroute TTL কৌশল ও Time Exceeded দিয়ে প্রতিটি hop প্রকাশ করে।'),
          l('Silence is not proof of failure — ICMP is often rate-limited or blocked.', 'নীরবতা ব্যর্থতার প্রমাণ নয়—ICMP প্রায়ই rate-limit বা block করা থাকে।'),
        ] },
      ],
    },
  ],

  // ── cn-tcp · TCP: reliable delivery ───────────────────────────────────────
  'cn-tcp': [
    {
      h: l('What is TCP?', 'TCP কী?'),
      blocks: [
        { p: l('TCP (Transmission Control Protocol) is the transport-layer protocol that gives applications a reliable, ordered stream of bytes on top of an unreliable network. The IP layer beneath it makes no promises: packets can be lost, duplicated, corrupted, or arrive out of order. TCP hides all of that, so your program can treat a connection like a clean, in-order pipe where everything you send comes out the other end exactly once and in the same order.', 'TCP (Transmission Control Protocol) হলো transport-layer প্রোটোকল যা একটি অনির্ভরযোগ্য নেটওয়ার্কের ওপরে অ্যাপ্লিকেশনকে একটি নির্ভরযোগ্য, ক্রমিক byte-প্রবাহ দেয়। নিচের IP layer কোনো প্রতিশ্রুতি দেয় না: packet হারাতে, ডুপ্লিকেট হতে, নষ্ট হতে বা ক্রমের বাইরে আসতে পারে। TCP এই সব লুকায়, তাই আপনার প্রোগ্রাম একটি সংযোগকে একটি পরিষ্কার, ক্রমিক পাইপের মতো ধরতে পারে যেখানে আপনি যা পাঠান তা অন্য প্রান্তে ঠিক একবার ও একই ক্রমে বের হয়।') },
        { p: l('It does this by numbering every byte it sends, waiting for the receiver to acknowledge (ACK) what arrived, and re-sending anything that goes unacknowledged. TCP is "connection-oriented": before any data flows, the two sides perform a handshake to agree they are both ready and on the starting sequence numbers. That reliability is why the web (HTTP/HTTPS), email, file transfer, SSH, and database traffic all ride on TCP.', 'এটি করে প্রতিটি পাঠানো byte নম্বর দিয়ে, গ্রাহক কী পেল তা স্বীকার (ACK) করার অপেক্ষা করে, ও অস্বীকৃত কিছু আবার পাঠিয়ে। TCP "connection-oriented": কোনো ডেটা যাওয়ার আগে দুই পক্ষ একটি handshake করে সম্মত হয় যে তারা প্রস্তুত ও শুরুর sequence নম্বরে একমত। এই নির্ভরযোগ্যতার কারণেই ওয়েব (HTTP/HTTPS), ইমেইল, ফাইল ট্রান্সফার, SSH ও ডেটাবেস ট্রাফিক সবই TCP-তে চলে।') },
        { note: l('TCP is like registered mail with tracking and re-delivery. The sender gets a confirmation for each piece, and anything lost in transit is automatically sent again — nothing arrives out of order or vanishes silently.', 'TCP ট্র্যাকিং ও পুনঃডেলিভারিসহ রেজিস্টার্ড ডাকের মতো। প্রেরক প্রতিটি অংশের নিশ্চিতকরণ পায়, আর পথে হারানো কিছু স্বয়ংক্রিয়ভাবে আবার পাঠানো হয়—কিছুই ক্রমের বাইরে আসে না বা নীরবে হারায় না।'), kind: 'tip' },
      ],
    },
    {
      h: l('How TCP opens a connection: the three-way handshake', 'TCP কীভাবে সংযোগ খোলে: তিন-ধাপ handshake'),
      blocks: [
        { p: l('Before a single byte of your data moves, TCP performs a three-way handshake so both sides confirm they can send and receive, and exchange their starting sequence numbers (ISNs). It takes three packets and one full round trip.', 'আপনার ডেটার একটি byte সরার আগে TCP একটি তিন-ধাপ handshake করে যাতে দুই পক্ষ নিশ্চিত করে তারা পাঠাতে ও পেতে পারে, ও তাদের শুরুর sequence নম্বর (ISN) বিনিময় করে। এতে তিনটি packet ও একটি পূর্ণ round trip লাগে।') },
        { steps: [
          l('SYN — the client sends a packet with the SYN flag and its own initial sequence number (say seq=1000): "I want to talk; my numbering starts at 1000."', 'SYN—ক্লায়েন্ট SYN flag ও নিজের initial sequence number (ধরুন seq=1000) দিয়ে একটি packet পাঠায়: "আমি কথা বলতে চাই; আমার নম্বর শুরু 1000 থেকে।"'),
          l('SYN-ACK — the server replies with SYN plus ACK: its own sequence number (seq=5000) and an acknowledgement of the client’s (ack=1001): "OK, I heard you; my numbering starts at 5000."', 'SYN-ACK—সার্ভার SYN ও ACK দিয়ে উত্তর দেয়: নিজের sequence number (seq=5000) ও ক্লায়েন্টেরটির স্বীকৃতি (ack=1001): "ঠিক আছে, শুনেছি; আমার নম্বর শুরু 5000 থেকে।"'),
          l('ACK — the client acknowledges the server’s number (ack=5001). The connection is now established and real data can flow in both directions.', 'ACK—ক্লায়েন্ট সার্ভারের নম্বর স্বীকার করে (ack=5001)। সংযোগ এখন প্রতিষ্ঠিত ও আসল ডেটা দুই দিকেই যেতে পারে।'),
        ] },
        { code: `$ sudo tcpdump -n 'tcp port 443'
# Flags: [S]=SYN  [S.]=SYN-ACK  [.]=ACK  [P.]=PSH+ACK (data)
IP 192.168.1.10.51000 > 93.184.216.34.443: Flags [S],  seq 1000
IP 93.184.216.34.443 > 192.168.1.10.51000: Flags [S.], seq 5000, ack 1001
IP 192.168.1.10.51000 > 93.184.216.34.443: Flags [.],  ack 5001
IP 192.168.1.10.51000 > 93.184.216.34.443: Flags [P.], seq 1001  # first data`, caption: l('The first three lines are the handshake (SYN, SYN-ACK, ACK). Only on the fourth line does the client send actual data — proof the handshake costs a round trip up front.', 'প্রথম তিনটি লাইন হলো handshake (SYN, SYN-ACK, ACK)। শুধু চতুর্থ লাইনে ক্লায়েন্ট আসল ডেটা পাঠায়—প্রমাণ যে handshake আগেই একটি round trip খরচ করে।') },
      ],
    },
    {
      h: l('How TCP keeps data reliable and in order', 'TCP কীভাবে ডেটা নির্ভরযোগ্য ও ক্রমিক রাখে'),
      blocks: [
        { p: l('Once the connection is open, four mechanisms work together to turn a lossy network into a dependable stream.', 'সংযোগ খোলার পর চারটি কৌশল একসঙ্গে কাজ করে একটি ক্ষতিপ্রবণ নেটওয়ার্ককে একটি নির্ভরযোগ্য প্রবাহে পরিণত করে।') },
        { list: [
          l('Sequence numbers — every byte is numbered, so the receiver can reassemble segments in the correct order even if they arrive scrambled.', 'sequence number—প্রতিটি byte নম্বরযুক্ত, তাই segment এলোমেলো এলেও গ্রাহক সঠিক ক্রমে জোড়া লাগাতে পারে।'),
          l('Acknowledgements & retransmission — the receiver ACKs what it got; if the sender does not see an ACK within a timeout, it re-sends that data.', 'acknowledgement ও retransmission—গ্রাহক যা পেল তা ACK করে; প্রেরক timeout-এর মধ্যে ACK না দেখলে সেই ডেটা আবার পাঠায়।'),
          l('Flow control — a sliding "window" lets the receiver tell the sender to slow down so a fast sender never overwhelms a slow receiver.', 'flow control—একটি সরে-যাওয়া "window" গ্রাহককে প্রেরককে ধীর হতে বলতে দেয় যাতে দ্রুত প্রেরক ধীর গ্রাহককে চাপে না ফেলে।'),
          l('Congestion control — TCP ramps up slowly (slow start) and backs off when it detects loss, keeping the whole network stable and fair.', 'congestion control—TCP ধীরে গতি বাড়ায় (slow start) ও loss দেখলে কমায়, পুরো নেটওয়ার্ক স্থিতিশীল ও ন্যায্য রাখে।'),
        ] },
        { p: l('When it is done, TCP tears the connection down cleanly with FIN/ACK packets from each side, so both ends agree the conversation is over and no data is left stranded.', 'শেষ হলে TCP প্রতিটি পক্ষ থেকে FIN/ACK packet দিয়ে সংযোগ পরিষ্কারভাবে বন্ধ করে, যাতে দুই প্রান্ত একমত হয় কথোপকথন শেষ ও কোনো ডেটা আটকে থাকে না।') },
      ],
    },
    {
      h: l('TCP’s four jobs at a glance', 'TCP-র চারটি কাজ এক নজরে'),
      blocks: [
        { table: {
          head: [l('Mechanism', 'কৌশল'), l('Problem it solves', 'যে সমস্যা সমাধান করে')],
          rows: [
            [l('Sequence numbers', 'sequence number'), l('Packets that arrive out of order are reassembled correctly.', 'ক্রমের বাইরে আসা packet ঠিকভাবে জোড়া লাগে।')],
            [l('ACK + retransmission', 'ACK + retransmission'), l('Lost or corrupted packets are detected and re-sent.', 'হারানো বা নষ্ট packet শনাক্ত ও আবার পাঠানো হয়।')],
            [l('Flow control (window)', 'flow control (window)'), l('A fast sender does not overrun a slow receiver’s buffer.', 'দ্রুত প্রেরক ধীর গ্রাহকের buffer উপচে ফেলে না।')],
            [l('Congestion control', 'congestion control'), l('The sender slows down when the network is busy, avoiding collapse.', 'নেটওয়ার্ক ব্যস্ত হলে প্রেরক ধীর হয়, ধস এড়ায়।')],
          ],
        } },
      ],
    },
    {
      h: l('When and where to use TCP', 'TCP কোথায় ও কখন ব্যবহার করবেন'),
      blocks: [
        { p: l('Choose TCP whenever correctness and order matter more than shaving off a few milliseconds. If a single missing or scrambled byte would break the result — a web page, a JSON API response, a downloaded file, an SSH session, a database query — you want TCP. Nearly all of the everyday internet runs on it precisely because most applications cannot tolerate silent data loss.', 'যখনই সঠিকতা ও ক্রম কয়েক মিলিসেকেন্ড বাঁচানোর চেয়ে বেশি গুরুত্বপূর্ণ তখন TCP নিন। একটি হারানো বা এলোমেলো byte যদি ফল ভাঙে—একটি ওয়েব পেজ, একটি JSON API রেসপন্স, একটি ডাউনলোড করা ফাইল, একটি SSH session, একটি ডেটাবেস কুয়েরি—আপনি TCP চান। দৈনন্দিন ইন্টারনেটের প্রায় সবই এতে চলে ঠিক এ কারণেই যে বেশিরভাগ অ্যাপ্লিকেশন নীরব ডেটা-ক্ষতি সহ্য করতে পারে না।') },
        { p: l('TCP is the wrong choice for real-time media, where a packet that arrives late is worthless: TCP would stubbornly retransmit the lost piece and stall the whole stream to keep order, causing a freeze. For live video, voice, and gaming, UDP (which drops the late packet and moves on) is the better fit.', 'রিয়েল-টাইম মিডিয়ায় TCP ভুল পছন্দ, যেখানে দেরিতে-আসা packet মূল্যহীন: TCP জেদ ধরে হারানো অংশ retransmit করবে ও ক্রম রাখতে পুরো stream থামাবে, ফলে freeze হবে। লাইভ ভিডিও, ভয়েস ও গেমিংয়ে UDP (যা দেরির packet ফেলে এগিয়ে যায়) বেশি মানানসই।') },
      ],
    },
    {
      h: l('Common mistakes', 'সাধারণ ভুল'),
      blocks: [
        { list: [
          l('Using TCP for real-time media, where its retransmissions cause freezes instead of a barely-noticed dropped frame.', 'রিয়েল-টাইম মিডিয়ায় TCP ব্যবহার, যেখানে এর retransmission প্রায়-অলক্ষিত হারানো frame-এর বদলে freeze ঘটায়।'),
          l('Opening a fresh connection for every tiny request instead of reusing one — each handshake costs a full round trip of latency.', 'প্রতিটি ছোট রিকোয়েস্টে একটি নতুন সংযোগ খোলা, একটি পুনঃব্যবহারের বদলে—প্রতিটি handshake একটি পূর্ণ round trip latency খরচ করে।'),
          l('Assuming "TCP delivered it" means "the app processed it." TCP guarantees bytes reach the socket, not that your application handled them.', '"TCP পৌঁছে দিয়েছে" মানে "অ্যাপ প্রসেস করেছে" ধরে নেওয়া। TCP byte socket-এ পৌঁছানো নিশ্চিত করে, আপনার অ্যাপ সামলেছে তা নয়।'),
          l('Blaming the server for slowness that is really congestion control backing off after packet loss on the path.', 'ধীরগতির জন্য সার্ভারকে দোষ দেওয়া যা আসলে পথে packet loss-এর পর congestion control-এর গতি কমানো।'),
        ] },
      ],
    },
    {
      h: l('Remember in one line', 'এক লাইনে মনে রাখুন'),
      blocks: [
        { list: [
          l('TCP turns an unreliable network into a reliable, ordered byte stream using sequence numbers, ACKs, and retransmission.', 'TCP sequence number, ACK ও retransmission দিয়ে একটি অনির্ভরযোগ্য নেটওয়ার্ককে একটি নির্ভরযোগ্য, ক্রমিক byte-প্রবাহে পরিণত করে।'),
          l('It is connection-oriented: a three-way handshake (SYN, SYN-ACK, ACK) precedes any data.', 'এটি connection-oriented: যেকোনো ডেটার আগে একটি তিন-ধাপ handshake (SYN, SYN-ACK, ACK) হয়।'),
          l('Use it when every byte must arrive correctly (web, APIs, files, databases); avoid it for real-time media.', 'যখন প্রতিটি byte সঠিকভাবে পৌঁছাতে হবে তখন ব্যবহার করুন (ওয়েব, API, ফাইল, ডেটাবেস); রিয়েল-টাইম মিডিয়ায় এড়ান।'),
        ] },
      ],
    },
  ],

  // ── cn-udp · UDP: fast & connectionless ───────────────────────────────────
  'cn-udp': [
    {
      h: l('What is UDP?', 'UDP কী?'),
      blocks: [
        { p: l('UDP (User Datagram Protocol) is the transport-layer protocol for sending data fast, with almost no ceremony. It simply wraps your data in a tiny 8-byte header and hands each packet (a "datagram") to the network. There is no handshake to set up, no acknowledgements, no ordering, and no promise of delivery — UDP fires the datagram off and forgets about it.', 'UDP (User Datagram Protocol) হলো দ্রুত ডেটা পাঠানোর transport-layer প্রোটোকল, প্রায় কোনো আনুষ্ঠানিকতা ছাড়াই। এটি শুধু আপনার ডেটাকে একটি ক্ষুদ্র ৮-byte header-এ মোড়ায় ও প্রতিটি packet (একটি "datagram") নেটওয়ার্ককে দেয়। সেটআপের জন্য কোনো handshake নেই, কোনো acknowledgement নেই, কোনো ক্রম নেই, ও ডেলিভারির কোনো প্রতিশ্রুতি নেই—UDP datagram ছুড়ে দিয়ে ভুলে যায়।') },
        { p: l('That sounds reckless, but it is a deliberate trade: by throwing away TCP’s guarantees, UDP throws away TCP’s overhead and delay too. There is no setup round trip and no waiting to retransmit a lost packet, so UDP is lean and fast. If an application needs some reliability, it builds just the part it needs on top of UDP itself, rather than paying for all of TCP.', 'শুনতে বেপরোয়া, তবে এটি একটি ইচ্ছাকৃত বিনিময়: TCP-র গ্যারান্টি ফেলে দিয়ে UDP TCP-র ওভারহেড ও বিলম্বও ফেলে দেয়। কোনো সেটআপ round trip নেই ও হারানো packet retransmit-এর অপেক্ষা নেই, তাই UDP হালকা ও দ্রুত। কোনো অ্যাপ্লিকেশনের কিছু নির্ভরযোগ্যতা দরকার হলে সে TCP-র পুরোটার দাম না দিয়ে UDP-র ওপর ঠিক যতটুকু দরকার ততটুকু নিজে বানায়।') },
        { note: l('UDP is like shouting a quick message across a crowded room. It is fast and takes no setup, but you never get confirmation it was heard — if the noise swallowed it, you will not know, and you will not repeat it.', 'UDP একটি ভিড় ঘরের এপার থেকে দ্রুত একটি বার্তা বলার মতো। এটি দ্রুত ও কোনো সেটআপ লাগে না, তবে শোনা গেল এমন নিশ্চিতকরণ কখনো পান না—গোলমাল একে গিলে ফেললে জানবেন না, ও আবার বলবেনও না।'), kind: 'tip' },
      ],
    },
    {
      h: l('How UDP works', 'UDP কীভাবে কাজ করে'),
      blocks: [
        { p: l('There is not much to it — and that is the point. A UDP datagram carries only four small fields before your data, and the sender does not track what happens next.', 'এতে বেশি কিছু নেই—আর সেটাই মূল কথা। একটি UDP datagram আপনার ডেটার আগে শুধু চারটি ছোট ফিল্ড বহন করে, ও প্রেরক পরে কী ঘটে তা ট্র্যাক করে না।') },
        { steps: [
          l('The application hands its message to UDP with a destination IP and port.', 'অ্যাপ্লিকেশন একটি গন্তব্য IP ও port দিয়ে তার বার্তা UDP-কে দেয়।'),
          l('UDP prepends an 8-byte header: source port, destination port, length, and a checksum. That is the entire protocol.', 'UDP একটি ৮-byte header যোগ করে: source port, destination port, length ও একটি checksum। এটাই পুরো প্রোটোকল।'),
          l('The datagram is sent immediately — no connection, no waiting. The receiver’s port tells the OS which application it belongs to.', 'datagram সঙ্গে সঙ্গে পাঠানো হয়—কোনো সংযোগ নেই, অপেক্ষা নেই। গ্রাহকের port OS-কে বলে এটি কোন অ্যাপ্লিকেশনের।'),
          l('The checksum lets the receiver detect corruption and discard a damaged datagram — but UDP will not ask for it again. Loss recovery, if any, is the application’s job.', 'checksum গ্রাহককে নষ্ট শনাক্ত ও একটি ক্ষতিগ্রস্ত datagram ফেলে দিতে দেয়—তবে UDP আবার তা চাইবে না। ক্ষতি পুনরুদ্ধার, যদি লাগে, অ্যাপ্লিকেশনের কাজ।'),
        ] },
        { code: `# A UDP datagram is tiny: an 8-byte header, then your data.
+---------------------+---------------------+
|   Source Port (16)  | Dest. Port (16)     |
+---------------------+---------------------+
|    Length (16)      |   Checksum (16)     |
+---------------------+---------------------+
|            Application data ...           |
+------------------------------------------ +

# Compare: a TCP header is 20+ bytes and needs a handshake first.
# This is why one DNS lookup fits in a single UDP round trip.`, caption: l('The whole UDP header is 8 bytes with no sequence or acknowledgement fields — there is simply nothing there to track a connection with.', 'পুরো UDP header ৮ byte, কোনো sequence বা acknowledgement ফিল্ড ছাড়া—একটি সংযোগ ট্র্যাক করার মতো কিছুই এখানে নেই।') },
      ],
    },
    {
      h: l('TCP vs UDP at a glance', 'TCP বনাম UDP এক নজরে'),
      blocks: [
        { table: {
          head: [l('Aspect', 'দিক'), l('TCP', 'TCP'), l('UDP', 'UDP')],
          rows: [
            [l('Connection', 'সংযোগ'), l('Connection-oriented (handshake first)', 'connection-oriented (আগে handshake)'), l('Connectionless (just send)', 'connectionless (শুধু পাঠান)')],
            [l('Reliability', 'নির্ভরযোগ্যতা'), l('Guaranteed — lost data re-sent', 'নিশ্চিত—হারানো ডেটা আবার পাঠানো'), l('Best-effort — no guarantee', 'best-effort—কোনো গ্যারান্টি নেই')],
            [l('Ordering', 'ক্রম'), l('Delivered in order', 'ক্রমে পৌঁছায়'), l('May arrive out of order', 'ক্রমের বাইরে আসতে পারে')],
            [l('Speed / overhead', 'গতি / ওভারহেড'), l('Slower, more overhead', 'ধীর, বেশি ওভারহেড'), l('Faster, minimal overhead', 'দ্রুত, ন্যূনতম ওভারহেড')],
            [l('Header size', 'header সাইজ'), l('20+ bytes', '২০+ byte'), l('8 bytes', '৮ byte')],
            [l('Best for', 'কার জন্য'), l('Web, APIs, files, databases', 'ওয়েব, API, ফাইল, ডেটাবেস'), l('Live media, gaming, DNS, VoIP', 'লাইভ মিডিয়া, গেমিং, DNS, VoIP')],
          ],
        } },
      ],
    },
    {
      h: l('When and where to use UDP', 'UDP কোথায় ও কখন ব্যবহার করবেন'),
      blocks: [
        { p: l('Reach for UDP when speed beats perfection and a late packet is useless. In live video, voice calls, and online gaming, a frame or audio sample that arrives 300 ms late has nothing to add — you would rather skip it and show the next fresh one than freeze the stream waiting for a re-send. UDP’s "drop it and move on" behaviour is exactly right there.', 'যখন গতি নিখুঁততার চেয়ে বেশি ও দেরির packet অকেজো তখন UDP ধরুন। লাইভ ভিডিও, ভয়েস কল ও অনলাইন গেমিংয়ে ৩০০ ms দেরিতে আসা একটি frame বা অডিও sample-এর কিছু দেওয়ার নেই—retransmit-এর অপেক্ষায় stream freeze করার চেয়ে বরং তা বাদ দিয়ে পরের টাটকাটি দেখানো ভালো। UDP-র "ফেলে দিয়ে এগোও" আচরণ ঠিক সেখানেই সঠিক।') },
        { p: l('It is also ideal for many tiny, independent requests where a per-request handshake would be wasteful. DNS is the classic case: one small query, one small answer, no connection needed. UDP suits DHCP, VoIP, and telemetry for the same reason. And HTTP/3 (QUIC) runs over UDP, rebuilding just the reliability it wants on top — proof that UDP is not "worse" than TCP, only lower-level and more flexible.', 'অনেক ছোট, স্বাধীন রিকোয়েস্টেও এটি আদর্শ যেখানে প্রতি-রিকোয়েস্টে handshake অপচয় হতো। DNS ক্লাসিক উদাহরণ: একটি ছোট query, একটি ছোট উত্তর, কোনো সংযোগ লাগে না। একই কারণে UDP DHCP, VoIP ও telemetry-তে মানায়। আর HTTP/3 (QUIC) UDP-র ওপর চলে, ওপরে ঠিক যতটুকু নির্ভরযোগ্যতা চায় ততটুকু আবার বানিয়ে—প্রমাণ যে UDP TCP-র চেয়ে "খারাপ" নয়, শুধু নিচু-স্তরের ও বেশি নমনীয়।') },
      ],
    },
    {
      h: l('When UDP needs a little help', 'যখন UDP-র একটু সাহায্য দরকার'),
      blocks: [
        { p: l('UDP’s bareness is a starting point, not a limit. When an application wants some of TCP’s guarantees but not all of its cost, it adds exactly the missing pieces on top of UDP and nothing more. A game might number its own packets to detect loss yet deliberately ignore an old position update, because only the newest one matters. This "pick your own reliability" freedom is impossible with TCP, which forces the whole bundle on you.', 'UDP-র সরলতা একটি শুরুর বিন্দু, সীমা নয়। কোনো অ্যাপ্লিকেশন যখন TCP-র কিছু গ্যারান্টি চায় কিন্তু পুরো খরচ নয়, তখন সে UDP-র ওপর ঠিক অনুপস্থিত অংশগুলো যোগ করে, আর কিছু নয়। একটি গেম হয়তো loss ধরতে নিজের packet নম্বর দেয় অথচ একটি পুরনো position আপডেট ইচ্ছাকৃতভাবে উপেক্ষা করে, কারণ শুধু নতুনটিই গুরুত্বপূর্ণ। এই "নিজের নির্ভরযোগ্যতা বেছে নাও" স্বাধীনতা TCP-তে অসম্ভব, যা পুরো বান্ডিল আপনার ওপর চাপায়।') },
        { p: l('The most important modern example is QUIC, the protocol beneath HTTP/3. It runs over UDP yet rebuilds ordered, reliable, encrypted, multiplexed streams on top — getting TCP-like guarantees while avoiding some of TCP’s limitations, such as one lost packet stalling unrelated streams. QUIC is the clearest proof that UDP is not a lesser protocol but a flexible foundation others are built on.', 'সবচেয়ে গুরুত্বপূর্ণ আধুনিক উদাহরণ QUIC, HTTP/3-এর নিচের প্রোটোকল। এটি UDP-র ওপর চলে অথচ ওপরে ক্রমিক, নির্ভরযোগ্য, এনক্রিপ্টেড, multiplexed stream আবার বানায়—TCP-র মতো গ্যারান্টি পায় অথচ TCP-র কিছু সীমাবদ্ধতা এড়ায়, যেমন একটি হারানো packet সম্পর্কহীন stream থামানো। QUIC হলো স্পষ্টতম প্রমাণ যে UDP নিচু-মানের প্রোটোকল নয়, বরং একটি নমনীয় ভিত্তি যার ওপর অন্যরা তৈরি হয়।') },
      ],
    },
    {
      h: l('Common mistakes', 'সাধারণ ভুল'),
      blocks: [
        { list: [
          l('Using UDP for a file transfer and getting silently corrupted or missing data — that job needs TCP’s guarantees.', 'ফাইল ট্রান্সফারে UDP ব্যবহার করে নীরবে নষ্ট বা হারানো ডেটা পাওয়া—এই কাজে TCP-র গ্যারান্টি দরকার।'),
          l('Believing "UDP has no error checking." It has a checksum to detect corruption; it just does not retransmit.', '"UDP-তে error checking নেই" বিশ্বাস করা। নষ্ট শনাক্তে এর checksum আছে; শুধু retransmit করে না।'),
          l('Forgetting that with UDP your application must handle any loss, duplication, or reordering itself if it cares about them.', 'ভুলে যাওয়া যে UDP-তে loss, duplication বা reordering গুরুত্বপূর্ণ হলে আপনার অ্যাপ্লিকেশনকেই সামলাতে হয়।'),
          l('Sending very large messages over UDP without care — an oversized datagram gets fragmented and is more likely to be lost as a whole.', 'যত্ন ছাড়া UDP-তে খুব বড় বার্তা পাঠানো—একটি অতিরিক্ত-বড় datagram fragment হয় ও পুরোটা হারানোর সম্ভাবনা বেশি।'),
        ] },
      ],
    },
    {
      h: l('Remember in one line', 'এক লাইনে মনে রাখুন'),
      blocks: [
        { list: [
          l('UDP is connectionless and best-effort: no handshake, no ordering, no retransmission — just a tiny 8-byte header and speed.', 'UDP connectionless ও best-effort: কোনো handshake, ক্রম বা retransmission নেই—শুধু একটি ক্ষুদ্র ৮-byte header ও গতি।'),
          l('Choose UDP when a late packet is worthless: live media, gaming, DNS, VoIP, telemetry.', 'যখন দেরির packet মূল্যহীন তখন UDP নিন: লাইভ মিডিয়া, গেমিং, DNS, VoIP, telemetry।'),
          l('It is not "worse" than TCP — apps that need reliability (like QUIC/HTTP-3) build just enough of it on top.', 'এটি TCP-র চেয়ে "খারাপ" নয়—যেসব অ্যাপের নির্ভরযোগ্যতা দরকার (যেমন QUIC/HTTP-3) ওপরে ঠিক যতটুকু দরকার বানায়।'),
        ] },
      ],
    },
  ],

  // ── cn-handshake · The TCP three-way handshake ────────────────────────────
  'cn-handshake': [
    {
      h: l('What is the three-way handshake?', 'তিন-ধাপ handshake কী?'),
      blocks: [
        { p: l('The three-way handshake is how TCP opens a connection before any real data is sent. Because TCP promises reliable, ordered delivery, both sides must first agree they are ready and synchronize their starting sequence numbers — the byte-counting reference each side will use to number data and acknowledge what it receives. The handshake is that opening negotiation, and it takes exactly three packets: SYN, SYN-ACK, ACK.', 'তিন-ধাপ handshake হলো আসল ডেটা পাঠানোর আগে TCP কীভাবে একটি সংযোগ খোলে তা। যেহেতু TCP নির্ভরযোগ্য, ক্রমিক ডেলিভারির প্রতিশ্রুতি দেয়, দুই পক্ষকে প্রথমে সম্মত হতে হয় তারা প্রস্তুত ও তাদের শুরুর sequence নম্বর সিঙ্ক্রোনাইজ করতে হয়—প্রতিটি পক্ষ ডেটা নম্বর দিতে ও কী পেল তা স্বীকার করতে যে byte-গণনার রেফারেন্স ব্যবহার করবে। handshake হলো সেই সূচনা-দর-কষাকষি, ও এতে ঠিক তিনটি packet লাগে: SYN, SYN-ACK, ACK।') },
        { p: l('The problem it solves is that a network is unreliable and one-way "I sent it" is not enough. Before trusting a connection, each side needs proof that it can both send to and receive from the other. Three packets are the minimum that proves both directions work while exchanging both starting numbers.', 'এটি যে সমস্যা সমাধান করে তা হলো নেটওয়ার্ক অনির্ভরযোগ্য ও এক-মুখী "আমি পাঠিয়েছি" যথেষ্ট নয়। একটি সংযোগ বিশ্বাস করার আগে প্রতিটি পক্ষের প্রমাণ দরকার যে সে অন্যপক্ষে পাঠাতে ও তার কাছ থেকে পেতে—দুটোই—পারে। তিনটি packet হলো সেই ন্যূনতম যা দুই দিক কাজ করছে তা প্রমাণ করে ও দুটি শুরুর নম্বর বিনিময় করে।') },
        { note: l('It is like starting a phone call. "Can you hear me?" — "Yes, can you hear me?" — "Yes." After those three exchanges, both people know the line works in both directions, and only then do they start the real conversation.', 'এটি একটি ফোন কল শুরুর মতো। "শুনতে পাচ্ছেন?" — "হ্যাঁ, আপনি পাচ্ছেন?" — "হ্যাঁ।" এই তিন বিনিময়ের পর দুজনই জানে লাইন দুই দিকেই কাজ করে, ও কেবল তখনই তারা আসল কথা শুরু করে।'), kind: 'tip' },
      ],
    },
    {
      h: l('The three steps in detail', 'তিনটি ধাপ বিস্তারিত'),
      blocks: [
        { p: l('Each packet is identified by TCP flags. SYN means "synchronize" (I am opening a connection and here is my starting number), and ACK means "acknowledge" (I received up to this number). The middle packet carries both flags at once.', 'প্রতিটি packet TCP flag দিয়ে চেনা যায়। SYN মানে "synchronize" (আমি একটি সংযোগ খুলছি ও এই আমার শুরুর নম্বর), আর ACK মানে "acknowledge" (আমি এই নম্বর পর্যন্ত পেয়েছি)। মাঝের packet একসঙ্গে দুটি flag বহন করে।') },
        { steps: [
          l('SYN (client → server): the client picks an initial sequence number (ISN), say 1000, sets the SYN flag, and sends seq=1000. Meaning: "I want to open a connection; my bytes start numbering at 1000."', 'SYN (client → server): ক্লায়েন্ট একটি initial sequence number (ISN) বাছে, ধরুন 1000, SYN flag সেট করে ও seq=1000 পাঠায়। অর্থ: "আমি একটি সংযোগ খুলতে চাই; আমার byte নম্বর শুরু 1000 থেকে।"'),
          l('SYN-ACK (server → client): the server picks its own ISN, say 5000, and replies with SYN + ACK — seq=5000, ack=1001. The ack=1001 says "I got your 1000, I now expect 1001 next."', 'SYN-ACK (server → client): সার্ভার নিজের ISN বাছে, ধরুন 5000, ও SYN + ACK দিয়ে উত্তর দেয়—seq=5000, ack=1001। ack=1001 বলে "আমি তোমার 1000 পেয়েছি, এখন পরের হিসেবে 1001 আশা করছি।"'),
          l('ACK (client → server): the client acknowledges the server’s number with ack=5001 (and seq=1001). The connection is now ESTABLISHED and data can flow both ways.', 'ACK (client → server): ক্লায়েন্ট ack=5001 (ও seq=1001) দিয়ে সার্ভারের নম্বর স্বীকার করে। সংযোগ এখন ESTABLISHED ও ডেটা দুই দিকেই যেতে পারে।'),
        ] },
        { code: `Client                                              Server
  |                                                   |
  |----- SYN      seq=1000 -------------------------->|  "let's talk; my ISN=1000"
  |                                                   |
  |<---- SYN-ACK  seq=5000  ack=1001 -----------------|  "ok; my ISN=5000, want your 1001"
  |                                                   |
  |----- ACK      seq=1001  ack=5001 ---------------->|  "got it — now sending data"
  |                                                   |
  |===== application data flows both ways ===========>|
  |<================================================= |`, caption: l('One round trip of setup: the client can send its first real data in the same packet as (or right after) the final ACK, but never before the handshake completes.', 'একটি round trip সেটআপ: ক্লায়েন্ট শেষ ACK-এর সঙ্গে (বা ঠিক পরে) একই packet-এ প্রথম আসল ডেটা পাঠাতে পারে, তবে handshake শেষ হওয়ার আগে কখনো নয়।') },
      ],
    },
    {
      h: l('What each packet carries', 'প্রতিটি packet কী বহন করে'),
      blocks: [
        { table: {
          head: [l('Step', 'ধাপ'), l('Direction', 'দিক'), l('Flags', 'flag'), l('Purpose', 'উদ্দেশ্য')],
          rows: [
            [l('1', '১'), l('Client → Server', 'Client → Server'), l('SYN', 'SYN'), l('Request to connect; share the client’s starting sequence number.', 'সংযোগের অনুরোধ; ক্লায়েন্টের শুরুর sequence নম্বর জানানো।')],
            [l('2', '২'), l('Server → Client', 'Server → Client'), l('SYN + ACK', 'SYN + ACK'), l('Agree to connect; share the server’s number and ack the client’s.', 'সংযোগে সম্মতি; সার্ভারের নম্বর জানানো ও ক্লায়েন্টেরটি ack করা।')],
            [l('3', '৩'), l('Client → Server', 'Client → Server'), l('ACK', 'ACK'), l('Acknowledge the server’s number; connection established.', 'সার্ভারের নম্বর ack করা; সংযোগ প্রতিষ্ঠিত।')],
          ],
        } },
        { p: l('Closing the connection is a separate, four-step exchange using the FIN flag (FIN, ACK, FIN, ACK), so each side can finish sending independently. The opening handshake gets the attention, but a clean close matters just as much.', 'সংযোগ বন্ধ করা একটি আলাদা, চার-ধাপ বিনিময় FIN flag দিয়ে (FIN, ACK, FIN, ACK), যাতে প্রতিটি পক্ষ স্বাধীনভাবে পাঠানো শেষ করতে পারে। খোলার handshake মনোযোগ পায়, তবে পরিষ্কার বন্ধ হওয়াও সমান গুরুত্বপূর্ণ।') },
      ],
    },
    {
      h: l('Why the round trip matters', 'round trip কেন গুরুত্বপূর্ণ'),
      blocks: [
        { p: l('The handshake costs one full round trip before the first byte of useful data. On a fast local link that is negligible, but to a distant server with, say, 150 ms of latency, every new connection wastes 150 ms up front doing nothing but saying hello. Over HTTPS it is worse: TLS adds its own handshake on top (one extra round trip with TLS 1.3, two with older versions).', 'handshake দরকারি ডেটার প্রথম byte-এর আগে একটি পূর্ণ round trip খরচ করে। একটি দ্রুত লোকাল link-এ তা নগণ্য, তবে ধরুন ১৫০ ms latency-র একটি দূরের সার্ভারে প্রতিটি নতুন সংযোগ শুরুতেই ১৫০ ms অপচয় করে শুধু হ্যালো বলতে। HTTPS-এ আরও খারাপ: TLS ওপরে নিজের handshake যোগ করে (TLS 1.3-এ একটি বাড়তি round trip, পুরনো ভার্সনে দুটি)।') },
        { p: l('This is exactly why reusing connections is such a common optimization. HTTP keep-alive, connection pooling in database clients, and HTTP/2 multiplexing all exist to amortize this setup cost: pay for one handshake, then send many requests over the same connection instead of handshaking again for each. When you see advice to "reuse connections," this round trip is what it is saving.', 'ঠিক এ কারণেই সংযোগ পুনঃব্যবহার এত প্রচলিত একটি অপটিমাইজেশন। HTTP keep-alive, ডেটাবেস ক্লায়েন্টে connection pooling ও HTTP/2 multiplexing সবই এই সেটআপ খরচ ভাগ করতে আছে: একটি handshake-এর দাম দিন, তারপর প্রতিটির জন্য আবার handshake না করে একই সংযোগে অনেক রিকোয়েস্ট পাঠান। "সংযোগ পুনঃব্যবহার করুন" পরামর্শ দেখলে এই round trip-ই তা বাঁচায়।') },
      ],
    },
    {
      h: l('The handshake as an attack surface: SYN floods', 'handshake একটি আক্রমণ-পৃষ্ঠ হিসেবে: SYN flood'),
      blocks: [
        { p: l('Because the server commits resources the moment it receives a SYN — it records the half-open connection and sends a SYN-ACK while waiting for the final ACK — the handshake can be abused. In a SYN flood attack, an attacker sends a storm of SYN packets (often with spoofed source addresses) and never completes the third step. Each one leaves a half-open connection parked in the server’s table, and eventually the table fills, so legitimate users can no longer connect.', 'যেহেতু সার্ভার একটি SYN পাওয়ার মুহূর্তেই রিসোর্স ব্যয় করে—এটি half-open সংযোগটি রেকর্ড করে ও শেষ ACK-এর অপেক্ষায় একটি SYN-ACK পাঠায়—handshake-এর অপব্যবহার সম্ভব। একটি SYN flood আক্রমণে আক্রমণকারী SYN packet-এর ঝড় পাঠায় (প্রায়ই spoofed source ঠিকানাসহ) ও তৃতীয় ধাপ কখনো সম্পূর্ণ করে না। প্রতিটি সার্ভারের table-এ একটি half-open সংযোগ আটকে রাখে, ও শেষে table ভরে যায়, তাই বৈধ ব্যবহারকারীরা আর সংযোগ করতে পারে না।') },
        { p: l('The standard defence is SYN cookies: instead of storing state for every SYN, the server encodes the connection details into the sequence number it puts in the SYN-ACK, so it can reconstruct the connection from a returning ACK without having reserved a table slot. Understanding this shows why the handshake is not just plumbing — its resource commitment is a real security consideration.', 'প্রমিত প্রতিরক্ষা হলো SYN cookie: প্রতিটি SYN-এর জন্য state সংরক্ষণের বদলে সার্ভার সংযোগের বিবরণ SYN-ACK-এ রাখা sequence নম্বরে এনকোড করে, যাতে একটি table স্লট সংরক্ষণ না করেই একটি ফিরে-আসা ACK থেকে সংযোগ পুনর্গঠন করতে পারে। এটি বোঝা দেখায় কেন handshake শুধু নলকাঠামো নয়—এর রিসোর্স ব্যয় একটি আসল নিরাপত্তা বিবেচনা।') },
      ],
    },
    {
      h: l('Common mistakes', 'সাধারণ ভুল'),
      blocks: [
        { list: [
          l('Ignoring the handshake cost when opening many short-lived connections instead of reusing one — the setup round trip dominates the latency of tiny requests.', 'একটি পুনঃব্যবহার না করে অনেক স্বল্পস্থায়ী সংযোগ খোলার সময় handshake খরচ উপেক্ষা করা—ছোট রিকোয়েস্টের latency-তে সেটআপ round trip-ই প্রধান হয়ে ওঠে।'),
          l('Thinking data can go in the SYN packet. Under standard TCP, no real payload flows until the handshake completes.', 'SYN packet-এ ডেটা যেতে পারে ভাবা। সাধারণ TCP-তে handshake শেষ না হওয়া পর্যন্ত কোনো আসল payload যায় না।'),
          l('Forgetting TLS adds another handshake on top of TCP’s, so an HTTPS connection costs even more setup than a plain one.', 'ভুলে যাওয়া যে TLS TCP-র ওপর আরেকটি handshake যোগ করে, তাই একটি HTTPS সংযোগ একটি সাধারণটির চেয়েও বেশি সেটআপ খরচ করে।'),
          l('Confusing the three-way open with the close — connections open in three packets (SYN/SYN-ACK/ACK) but close in four (FIN/ACK each way).', 'তিন-ধাপ খোলা ও বন্ধ গুলিয়ে ফেলা—সংযোগ তিনটি packet-এ খোলে (SYN/SYN-ACK/ACK) কিন্তু চারটিতে বন্ধ হয় (দুই দিকে FIN/ACK)।'),
        ] },
      ],
    },
    {
      h: l('Remember in one line', 'এক লাইনে মনে রাখুন'),
      blocks: [
        { list: [
          l('The three-way handshake — SYN, SYN-ACK, ACK — opens every TCP connection and syncs both sides’ starting sequence numbers.', 'তিন-ধাপ handshake—SYN, SYN-ACK, ACK—প্রতিটি TCP সংযোগ খোলে ও দুই পক্ষের শুরুর sequence নম্বর সিঙ্ক করে।'),
          l('It proves both directions work before any data flows, at the cost of one round trip.', 'কোনো ডেটা যাওয়ার আগে এটি দুই দিক কাজ করে তা প্রমাণ করে, একটি round trip-এর বিনিময়ে।'),
          l('That round trip is why reusing connections (keep-alive, pooling) speeds up apps that make many requests.', 'সেই round trip-ই কারণ কেন সংযোগ পুনঃব্যবহার (keep-alive, pooling) অনেক রিকোয়েস্ট করা অ্যাপ দ্রুত করে।'),
        ] },
      ],
    },
  ],
}
