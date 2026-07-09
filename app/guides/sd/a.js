// Deep, bilingual (English / Bangla) teaching guides for the System Design
// "Networking basics" module, keyed by topic id. Shape mirrors
// app/course-guides.js and app/guides/networking/a.js: each guide is an array of
// sections { h, blocks }, rendered by GuideBlock in app/LearningApp.js.
// Facts (definitions, analogies, trade-offs, mistakes) are drawn from the
// rawTopics rows in app/courses/system-design-networking.js.

const l = (en, bn) => ({ en, bn })

export default {
  // ── net-ip · IP addresses & subnets ───────────────────────────────────────
  'net-ip': [
    {
      h: l('What is an IP address?', 'IP অ্যাড্রেস কী?'),
      blocks: [
        { p: l('An IP (Internet Protocol) address is the number that identifies one host on a network so packets can be delivered to it. Every device that speaks to the internet — your phone, a server, a router — has at least one IP address, and it is what Layer 3 (the network layer) uses to move data between different networks. Without addresses there would be no way to say where a packet should go, just as a letter with no address on the envelope has nowhere to be delivered.', 'IP (Internet Protocol) অ্যাড্রেস হলো সেই সংখ্যা যা একটি নেটওয়ার্কে একটি host শনাক্ত করে যাতে packet তার কাছে পৌঁছানো যায়। ইন্টারনেটে কথা বলা প্রতিটি ডিভাইস—আপনার ফোন, একটি সার্ভার, একটি router—এর অন্তত একটি IP অ্যাড্রেস থাকে, আর Layer 3 (network layer) ভিন্ন নেটওয়ার্কের মধ্যে ডেটা সরাতে এটিই ব্যবহার করে। অ্যাড্রেস না থাকলে একটি packet কোথায় যাবে তা বলার উপায় থাকত না, ঠিক যেমন খামে ঠিকানা না থাকা একটি চিঠির যাওয়ার জায়গা নেই।') },
        { p: l('The core problem IP solves is reaching a machine that lives on a completely different network, possibly on the other side of the planet, through a chain of routers that have never heard of it before. No single router knows the whole route. Each one only needs to know one thing: which neighbour is one step closer to the destination network. Packets are forwarded hop by hop, router to router, until they reach the network the destination host is on, and finally that host.', 'IP যে মূল সমস্যা সমাধান করে তা হলো একটি সম্পূর্ণ ভিন্ন নেটওয়ার্কে থাকা মেশিনে পৌঁছানো, হয়তো পৃথিবীর অন্য প্রান্তে, এমন router-এর শৃঙ্খলের মধ্য দিয়ে যারা আগে কখনো এটির নাম শোনেনি। কোনো একক router পুরো পথ জানে না। প্রতিটি শুধু একটি জিনিস জানলেই হয়: কোন প্রতিবেশী গন্তব্য নেটওয়ার্কের দিকে এক ধাপ কাছে। Packet hop-এ-hop, router থেকে router, ফরওয়ার্ড হয় যতক্ষণ না গন্তব্য host যে নেটওয়ার্কে সেখানে পৌঁছায়, এবং শেষে সেই host-এ।') },
        { note: l('An IP address works like a street address. The country, city, and area route a letter most of the way — that coarse part is like the subnet — and only at the very end does the exact house number deliver it to one door. Routers care about the "area" to move a packet close, then the final network delivers it to the exact host.', 'একটি IP অ্যাড্রেস একটি ঠিকানার মতো কাজ করে। দেশ, শহর ও এলাকা একটি চিঠিকে বেশিরভাগ পথ পৌঁছায়—সেই মোটা অংশটি subnet-এর মতো—আর একদম শেষে গিয়ে সঠিক বাড়ির নম্বর এটিকে এক দরজায় ডেলিভার করে। Router "এলাকা" নিয়ে ভাবে packet-কে কাছে আনতে, তারপর চূড়ান্ত নেটওয়ার্ক এটিকে সঠিক host-এ ডেলিভার করে।'), kind: 'tip' },
      ],
    },
    {
      h: l('How a packet is routed, hop by hop', 'একটি packet কীভাবে রাউট হয়, hop-এ-hop'),
      blocks: [
        { p: l('When your machine sends a packet, it does not open a channel all the way to the destination. It writes the destination IP into the packet header and hands it to its default gateway (usually your router). From there the packet is passed forward one router at a time.', 'আপনার মেশিন একটি packet পাঠালে এটি গন্তব্য পর্যন্ত পুরো পথে একটি চ্যানেল খোলে না। এটি গন্তব্য IP packet header-এ লেখে ও তা তার default gateway (সাধারণত আপনার router)-এ তুলে দেয়। সেখান থেকে packet একবারে একটি router করে সামনে পাঠানো হয়।') },
        { steps: [
          l('Your host checks: is the destination on my own local network? If not, send the packet to the default gateway (the router).', 'আপনার host যাচাই করে: গন্তব্য কি আমার নিজের local নেটওয়ার্কে? না হলে packet-টি default gateway (router)-এ পাঠান।'),
          l('Each router reads the destination IP, looks it up in its routing table, and forwards the packet to the next router that is closer to that network.', 'প্রতিটি router গন্তব্য IP পড়ে, তার routing table-এ খোঁজে, ও packet-কে সেই নেটওয়ার্কের কাছের পরবর্তী router-এ ফরওয়ার্ড করে।'),
          l('The packet repeats this hop after hop; a "TTL" (time-to-live) field is decreased by one at every hop so a lost packet cannot loop forever.', 'packet এই hop-এর পর hop পুনরাবৃত্তি করে; প্রতি hop-এ একটি "TTL" (time-to-live) ফিল্ড এক কমে যাতে একটি হারানো packet চিরকাল লুপ না করে।'),
          l('When the packet reaches the destination network, the last router delivers it to the exact host by its address.', 'packet গন্তব্য নেটওয়ার্কে পৌঁছালে শেষ router এটিকে তার অ্যাড্রেস দিয়ে সঠিক host-এ ডেলিভার করে।'),
        ] },
        { p: l('The tool traceroute shows this chain: each line is one router (one hop) the packet passed through on the way to the destination.', 'traceroute টুল এই শৃঙ্খল দেখায়: প্রতিটি লাইন একটি router (একটি hop) যার মধ্য দিয়ে packet গন্তব্যের পথে গেছে।') },
        { code: `traceroute www.example.com

 1  192.168.0.1        1 ms     (your home router)
 2  10.32.0.1          8 ms     (ISP edge)
 3  103.15.6.9        14 ms     (ISP core)
 4  72.14.200.1       92 ms     (transit provider)
 5  93.184.216.34    121 ms     (destination host)`, caption: l('Each hop is a router forwarding the packet one step closer. No single router knew the full path — each only knew the next step.', 'প্রতিটি hop একটি router যা packet-কে এক ধাপ কাছে ফরওয়ার্ড করে। কোনো একক router পুরো পথ জানত না—প্রতিটি শুধু পরের ধাপ জানত।') },
      ],
    },
    {
      h: l('IPv4 vs IPv6', 'IPv4 বনাম IPv6'),
      blocks: [
        { p: l('There are two versions of IP addresses in use. IPv4 is the classic 32-bit format most people recognise; IPv6 is the newer, vastly larger 128-bit format created because the world ran out of IPv4 addresses.', 'ব্যবহারে দুটি সংস্করণের IP অ্যাড্রেস আছে। IPv4 হলো ক্লাসিক 32-bit ফরম্যাট যা বেশিরভাগ মানুষ চেনে; IPv6 হলো নতুন, বহুগুণ বড় 128-bit ফরম্যাট যা তৈরি হয়েছে কারণ বিশ্বে IPv4 অ্যাড্রেস ফুরিয়ে গেছে।') },
        { table: {
          head: [l('Aspect', 'দিক'), l('IPv4', 'IPv4'), l('IPv6', 'IPv6')],
          rows: [
            [l('Size', 'আকার'), l('32 bits', '32 bit'), l('128 bits', '128 bit')],
            [l('Format', 'ফরম্যাট'), l('Four decimals: 192.168.1.10', 'চারটি দশমিক: 192.168.1.10'), l('Eight hex groups: 2001:db8::1', 'আটটি hex গ্রুপ: 2001:db8::1')],
            [l('Total addresses', 'মোট অ্যাড্রেস'), l('~4.3 billion', '~৪৩০ কোটি'), l('~340 undecillion (effectively unlimited)', '~340 undecillion (কার্যত সীমাহীন)')],
            [l('Address exhaustion', 'অ্যাড্রেস ফুরানো'), l('Yes — already ran out; needs NAT', 'হ্যাঁ—ইতিমধ্যে ফুরিয়েছে; NAT দরকার'), l('No — enough for every device', 'না—প্রতিটি ডিভাইসের জন্য যথেষ্ট')],
            [l('NAT usually needed', 'NAT সাধারণত দরকার'), l('Yes', 'হ্যাঁ'), l('No', 'না')],
          ],
        } },
        { note: l('The 4.3 billion IPv4 addresses sound like a lot, but there are more phones, laptops, servers, and IoT devices than that. That scarcity is the single biggest reason NAT exists — many devices sharing a few public addresses.', '৪৩০ কোটি IPv4 অ্যাড্রেস অনেক শোনায়, কিন্তু এর চেয়ে বেশি ফোন, ল্যাপটপ, সার্ভার ও IoT ডিভাইস আছে। সেই অভাবই NAT থাকার একক সবচেয়ে বড় কারণ—অনেক ডিভাইস কয়েকটি পাবলিক অ্যাড্রেস ভাগ করে।'), kind: 'tip' },
      ],
    },
    {
      h: l('Public, private ranges & subnets', 'পাবলিক, প্রাইভেট রেঞ্জ ও subnet'),
      blocks: [
        { p: l('Not every IP address is reachable from the open internet. Certain ranges are reserved as private: they are reused inside millions of homes and offices and are never routed on the public internet. The rest are public and globally unique. A subnet mask (written as a "/N" suffix, called CIDR notation) decides how many leading bits of an address name the network and how many are left for hosts inside it.', 'প্রতিটি IP অ্যাড্রেস খোলা ইন্টারনেট থেকে পৌঁছানো যায় না। কিছু রেঞ্জ প্রাইভেট হিসেবে সংরক্ষিত: এগুলো লক্ষ লক্ষ বাড়ি ও অফিসে পুনঃব্যবহৃত হয় ও পাবলিক ইন্টারনেটে কখনো রাউট হয় না। বাকিগুলো পাবলিক ও বিশ্বব্যাপী ইউনিক। একটি subnet mask (একটি "/N" সাফিক্স হিসেবে লেখা, যাকে CIDR notation বলে) ঠিক করে অ্যাড্রেসের কত অগ্রণী bit নেটওয়ার্কের নাম দেয় ও কতগুলো এর ভেতরের host-এর জন্য থাকে।') },
        { code: `Network:   192.168.10.0/24
  /24   →  first 24 bits = network, last 8 bits = hosts
  Hosts:   192.168.10.1  –  192.168.10.254   (254 usable)
  Broadcast: 192.168.10.255

Private ranges (never routed on the public internet):
  10.0.0.0/8        10.0.0.0    –  10.255.255.255
  172.16.0.0/12     172.16.0.0  –  172.31.255.255
  192.168.0.0/16    192.168.0.0 –  192.168.255.255`, caption: l('A smaller /N (like /8) means more host bits and a bigger network; a larger /N (like /24) means fewer hosts. The mask is where "which part is the network" is decided.', 'ছোট /N (যেমন /8) মানে বেশি host bit ও বড় নেটওয়ার্ক; বড় /N (যেমন /24) মানে কম host। mask-ই সেই জায়গা যেখানে "কোন অংশ নেটওয়ার্ক" ঠিক হয়।') },
        { p: l('This is why the same address like 192.168.1.5 exists in millions of homes at once: it is private, so it only has meaning inside one local network. To reach the internet, those private addresses are translated to a shared public one by NAT (Network Address Translation) at the router.', 'এ কারণেই 192.168.1.5-এর মতো একই অ্যাড্রেস একসঙ্গে লক্ষ লক্ষ বাড়িতে থাকে: এটি প্রাইভেট, তাই এর অর্থ শুধু এক local নেটওয়ার্কের ভেতরে। ইন্টারনেটে পৌঁছাতে router-এ NAT (Network Address Translation) সেই প্রাইভেট অ্যাড্রেসগুলোকে একটি ভাগ করা পাবলিক অ্যাড্রেসে রূপান্তর করে।') },
      ],
    },
    {
      h: l('When and where addressing matters in design', 'ডিজাইনে অ্যাড্রেসিং কখন ও কোথায় জরুরি'),
      blocks: [
        { p: l('Public addressing is what gives the internet its global reach — anyone can address anyone. But because IPv4 addresses are scarce, most clients sit behind NAT, and that shapes real design decisions. NAT means many users can share one public IP, and a single user’s public IP can change between requests (mobile networks rotate them constantly). So an IP is a routing fact, not a stable identity.', 'পাবলিক অ্যাড্রেসিং ইন্টারনেটকে তার বিশ্বব্যাপী নাগাল দেয়—যে কেউ যে কাউকে অ্যাড্রেস করতে পারে। কিন্তু IPv4 অ্যাড্রেস অপ্রতুল বলে বেশিরভাগ client NAT-এর পেছনে বসে, ও তা বাস্তব ডিজাইন সিদ্ধান্ত গঠন করে। NAT মানে অনেক ব্যবহারকারী একটি পাবলিক IP ভাগ করতে পারে, আর একজন ব্যবহারকারীর পাবলিক IP রিকোয়েস্টের মাঝে বদলাতে পারে (মোবাইল নেটওয়ার্ক অবিরত ঘোরায়)। তাই একটি IP একটি রাউটিং তথ্য, স্থায়ী পরিচয় নয়।') },
        { list: [
          l('For rate limiting or abuse blocking by IP: remember that one IP behind NAT may represent a whole office or campus, so blocking it can hit innocent users.', 'IP দিয়ে rate limit বা অপব্যবহার ব্লক করতে: মনে রাখুন NAT-এর পেছনে একটি IP পুরো একটি অফিস বা ক্যাম্পাস হতে পারে, তাই এটি ব্লক করলে নির্দোষ ব্যবহারকারীরা আঘাত পেতে পারে।'),
          l('For identifying a user or session: never rely on the client IP — use a cookie or token, because the IP can be shared and can change.', 'একজন ব্যবহারকারী বা session শনাক্ত করতে: কখনো client IP-র ওপর নির্ভর করবেন না—একটি cookie বা token ব্যবহার করুন, কারণ IP ভাগ হতে পারে ও বদলাতে পারে।'),
          l('For internal services: use private ranges and a VPC/subnet layout so services talk to each other without ever being exposed to the public internet.', 'অভ্যন্তরীণ সার্ভিসের জন্য: প্রাইভেট রেঞ্জ ও একটি VPC/subnet বিন্যাস ব্যবহার করুন যাতে সার্ভিসগুলো পাবলিক ইন্টারনেটে উন্মুক্ত না হয়েই একে অপরের সঙ্গে কথা বলে।'),
        ] },
      ],
    },
    {
      h: l('Common mistakes', 'সাধারণ ভুল'),
      blocks: [
        { list: [
          l('Assuming a client’s IP is stable or unique. Behind NAT and on mobile networks, addresses are shared and rotate — one IP is not one user.', 'client-এর IP স্থায়ী বা ইউনিক ধরে নেওয়া। NAT-এর পেছনে ও মোবাইল নেটওয়ার্কে অ্যাড্রেস ভাগ ও বদল হয়—একটি IP মানে একজন ব্যবহারকারী নয়।'),
          l('Using the IP address as an identity for authentication or sessions instead of a token or cookie.', 'authentication বা session-এর জন্য একটি token বা cookie-র বদলে IP অ্যাড্রেসকে পরিচয় হিসেবে ব্যবহার করা।'),
          l('Confusing private and public ranges — trying to reach a 192.168.x.x address from the internet, which is never routable.', 'প্রাইভেট ও পাবলিক রেঞ্জ গুলিয়ে ফেলা—ইন্টারনেট থেকে একটি 192.168.x.x অ্যাড্রেসে পৌঁছানোর চেষ্টা, যা কখনো রাউটেবল নয়।'),
          l('Forgetting the subnet mask: an address like 10.0.5.7 is meaningless for routing without knowing whether it is a /8, /16, or /24.', 'subnet mask ভুলে যাওয়া: 10.0.5.7-এর মতো একটি অ্যাড্রেস এটি /8, /16 নাকি /24 তা না জেনে রাউটিংয়ের জন্য অর্থহীন।'),
        ] },
      ],
    },
    {
      h: l('Remember in one line', 'এক লাইনে মনে রাখুন'),
      blocks: [
        { list: [
          l('An IP address names a host; routers forward packets hop by hop toward the destination network, each knowing only the next step.', 'একটি IP অ্যাড্রেস একটি host-এর নাম দেয়; router গন্তব্য নেটওয়ার্কের দিকে hop-এ-hop packet ফরওয়ার্ড করে, প্রতিটি শুধু পরের ধাপ জানে।'),
          l('The subnet mask (/N) splits an address into network bits and host bits — routing works on the network part.', 'subnet mask (/N) একটি অ্যাড্রেসকে network bit ও host bit-এ ভাগ করে—রাউটিং network অংশে কাজ করে।'),
          l('IPv4 is scarce, so NAT is everywhere: treat a client IP as a routing hint, never as a stable, unique identity.', 'IPv4 অপ্রতুল, তাই NAT সর্বত্র: client IP-কে একটি রাউটিং ইঙ্গিত ভাবুন, কখনো স্থায়ী, ইউনিক পরিচয় নয়।'),
        ] },
      ],
    },
  ],

  // ── net-http · HTTP & HTTPS ────────────────────────────────────────────────
  'net-http': [
    {
      h: l('What is HTTP?', 'HTTP কী?'),
      blocks: [
        { p: l('HTTP (HyperText Transfer Protocol) is the application-layer protocol the web is built on. It defines a simple pattern: a client sends a request, and a server sends back one response. Every web page, API call, image, and download you fetch is an HTTP request/response pair. HTTPS is the same protocol wrapped in TLS, so the connection is encrypted and the server’s identity is verified — but the request/response rules are identical.', 'HTTP (HyperText Transfer Protocol) হলো application-layer protocol যার ওপর ওয়েব তৈরি। এটি একটি সরল প্যাটার্ন সংজ্ঞায়িত করে: একটি client একটি request পাঠায়, ও একটি server একটি response ফেরত পাঠায়। আপনি যে প্রতিটি web page, API কল, ছবি ও ডাউনলোড আনেন তা একটি HTTP request/response জোড়া। HTTPS একই protocol যা TLS-এ মোড়া, তাই কানেকশন এনক্রিপ্টেড ও server-এর পরিচয় যাচাই করা—কিন্তু request/response নিয়ম অভিন্ন।') },
        { p: l('The defining property of HTTP is that it is stateless: each request is independent and the server does not, by the protocol itself, remember anything about the previous one. A request must carry everything the server needs to handle it. Any "memory" — who you are logged in as, what is in your cart — lives outside the protocol, in cookies or tokens the client re-sends every time.', 'HTTP-র সংজ্ঞায়ক বৈশিষ্ট্য হলো এটি stateless: প্রতিটি request স্বাধীন এবং server, protocol নিজে থেকে, আগেরটি সম্পর্কে কিছু মনে রাখে না। একটি request-কে server-এর প্রয়োজনীয় সবকিছু বহন করতে হয়। যেকোনো "স্মৃতি"—আপনি কার হিসেবে লগইন, আপনার কার্টে কী আছে—protocol-এর বাইরে থাকে, cookie বা token-এ যা client প্রতিবার আবার পাঠায়।') },
        { note: l('HTTP is like ordering at a takeaway counter. Each order (request) stands on its own, and the receipt (response) comes back independently. The counter does not remember your last visit — if it needs to know you, you show a loyalty card (a cookie or token) each time.', 'HTTP একটি takeaway কাউন্টারে অর্ডার করার মতো। প্রতিটি অর্ডার (request) নিজে দাঁড়ায়, ও রিসিট (response) স্বাধীনভাবে ফেরে। কাউন্টার আপনার গত সফর মনে রাখে না—আপনাকে চিনতে হলে আপনি প্রতিবার একটি লয়ালটি কার্ড (একটি cookie বা token) দেখান।'), kind: 'tip' },
      ],
    },
    {
      h: l('Anatomy of a request and response', 'একটি request ও response-এর গঠন'),
      blocks: [
        { p: l('Every HTTP message has the same shape: a start line, some headers, a blank line, and an optional body. The request start line carries a method (the verb, what you want to do) and a path; the response start line carries a status code (how it went).', 'প্রতিটি HTTP বার্তার একই আকার: একটি start line, কিছু header, একটি ফাঁকা লাইন, ও একটি ঐচ্ছিক body। request start line একটি method (verb, আপনি কী করতে চান) ও একটি path বহন করে; response start line একটি status code (কেমন গেল) বহন করে।') },
        { code: `GET /articles/42 HTTP/1.1
Host: blog.example.com
Accept: application/json
Cookie: session=8f3ac91b

HTTP/1.1 200 OK
Content-Type: application/json
Cache-Control: max-age=60
Content-Length: 48

{ "id": 42, "title": "Networking basics" }`, caption: l('Top: the request (method GET, path, and headers including the Cookie that carries state). Bottom: the response (status 200, headers, then the body). The blank line separates headers from body.', 'উপরে: request (method GET, path, ও state বহনকারী Cookie সহ header)। নিচে: response (status 200, header, তারপর body)। ফাঁকা লাইন header ও body আলাদা করে।') },
        { steps: [
          l('The client opens a connection (a TCP connection, and for HTTPS a TLS handshake first) to the server.', 'client server-এ একটি কানেকশন খোলে (একটি TCP কানেকশন, ও HTTPS-এর জন্য আগে একটি TLS handshake)।'),
          l('It sends a request: a method and path, headers describing the request, and an optional body (for POST/PUT).', 'এটি একটি request পাঠায়: একটি method ও path, request বর্ণনাকারী header, ও একটি ঐচ্ছিক body (POST/PUT-এর জন্য)।'),
          l('The server processes it and returns a response: a status code, response headers, and usually a body (HTML, JSON, an image).', 'server এটি প্রক্রিয়া করে ও একটি response ফেরত দেয়: একটি status code, response header, ও সাধারণত একটি body (HTML, JSON, একটি ছবি)।'),
          l('The connection may be reused for more requests (keep-alive) or closed. Either way, the next request is treated as brand new.', 'কানেকশনটি আরও request-এর জন্য পুনঃব্যবহৃত (keep-alive) বা বন্ধ হতে পারে। যেভাবেই হোক, পরবর্তী request একেবারে নতুন হিসেবে গণ্য হয়।'),
        ] },
      ],
    },
    {
      h: l('Methods and status codes', 'method ও status code'),
      blocks: [
        { p: l('Two vocabularies do most of the work. Methods say what the client wants; status codes say how the server responded. Knowing the common ones lets you read any API at a glance.', 'দুটি শব্দভাণ্ডার বেশিরভাগ কাজ করে। method বলে client কী চায়; status code বলে server কীভাবে সাড়া দিল। সাধারণগুলো জানলে যেকোনো API এক নজরে পড়তে পারবেন।') },
        { table: {
          head: [l('Code / Method', 'কোড / method'), l('Meaning', 'অর্থ')],
          rows: [
            [l('GET', 'GET'), l('Read a resource; should not change anything on the server.', 'একটি resource পড়ুন; server-এ কিছু বদলানো উচিত নয়।')],
            [l('POST', 'POST'), l('Create a resource or submit data; not safe to blindly repeat.', 'একটি resource তৈরি বা ডেটা জমা; অন্ধভাবে পুনরাবৃত্তি নিরাপদ নয়।')],
            [l('PUT / DELETE', 'PUT / DELETE'), l('Replace or remove a resource; repeating gives the same result (idempotent).', 'একটি resource প্রতিস্থাপন বা মুছুন; পুনরাবৃত্তিতে একই ফল (idempotent)।')],
            [l('2xx (200, 201)', '2xx (200, 201)'), l('Success — the request worked.', 'সফল—request কাজ করেছে।')],
            [l('3xx (301, 304)', '3xx (301, 304)'), l('Redirect or "use your cache" — go somewhere else or reuse a stored copy.', 'redirect বা "আপনার cache ব্যবহার করুন"—অন্য কোথাও যান বা রাখা কপি পুনঃব্যবহার করুন।')],
            [l('4xx (400, 401, 404)', '4xx (400, 401, 404)'), l('Client error — bad request, not authenticated, or not found.', 'client ত্রুটি—খারাপ request, authenticate নয়, বা পাওয়া যায়নি।')],
            [l('5xx (500, 503)', '5xx (500, 503)'), l('Server error — the server failed or is unavailable.', 'server ত্রুটি—server ব্যর্থ বা অনুপলব্ধ।')],
          ],
        } },
      ],
    },
    {
      h: l('When statelessness helps (and its cost)', 'stateless কখন সাহায্য করে (ও এর খরচ)'),
      blocks: [
        { p: l('Statelessness is the property that makes HTTP scale so well. Because no server has to remember a client between requests, any server behind a load balancer can handle any request. You can add ten more servers during a traffic spike and remove them afterwards, and no request cares which server it lands on. This is horizontal scaling, and HTTP’s statelessness is what makes it almost free.', 'stateless বৈশিষ্ট্যই HTTP-কে এত ভালো স্কেল করায়। কোনো server-কে request-এর মাঝে একটি client মনে রাখতে হয় না বলে, একটি load balancer-এর পেছনে যেকোনো server যেকোনো request সামলাতে পারে। ট্রাফিক স্পাইকের সময় আপনি আরও দশটি server যোগ করে পরে সরাতে পারেন, ও কোনো request-এর পরোয়া নেই এটি কোন server-এ পড়ে। এটি horizontal scaling, ও HTTP-র stateless-নেসই এটিকে প্রায় বিনামূল্যে করে।') },
        { p: l('The trade-off is that every request must re-send the context it needs. There is no free "remembering," so each call carries its cookies, auth token, and any parameters again. That means slightly larger requests and the job of storing shared state (sessions, carts) somewhere both servers can reach — a database or a cache — rather than in one server’s memory.', 'ট্রেড-অফ হলো প্রতিটি request-কে তার প্রয়োজনীয় প্রসঙ্গ আবার পাঠাতে হয়। বিনামূল্যে "মনে রাখা" নেই, তাই প্রতিটি কল তার cookie, auth token ও যেকোনো parameter আবার বহন করে। মানে সামান্য বড় request ও ভাগ করা state (session, cart) এমন জায়গায় রাখার কাজ যেখানে দুই server পৌঁছাতে পারে—একটি database বা cache—এক server-এর মেমরিতে নয়।') },
        { note: l('Because state lives in cookies and tokens the client sends, never trust that data blindly. Anyone can edit a header or cookie. Always validate and re-check permissions on the server for every request.', 'যেহেতু state client-এর পাঠানো cookie ও token-এ থাকে, সেই ডেটা কখনো অন্ধভাবে বিশ্বাস করবেন না। যে কেউ একটি header বা cookie সম্পাদনা করতে পারে। প্রতিটি request-এ server-এ সবসময় যাচাই ও permission পুনঃপরীক্ষা করুন।'), kind: 'warn' },
      ],
    },
    {
      h: l('When to use HTTPS (always)', 'কখন HTTPS ব্যবহার করবেন (সবসময়)'),
      blocks: [
        { p: l('The practical answer to "HTTP or HTTPS?" is: always HTTPS. Plain HTTP sends everything — passwords, tokens, page content — as readable text that anyone on the network path can read or modify. HTTPS wraps the same HTTP in TLS, giving you encryption (nobody can read it), integrity (nobody can tamper with it), and authentication (you are talking to the real server). Modern browsers now warn users on plain HTTP, and features like HTTP/2 effectively require it.', '"HTTP নাকি HTTPS?"-এর ব্যবহারিক উত্তর: সবসময় HTTPS। সাধারণ HTTP সবকিছু—পাসওয়ার্ড, token, পেজ কন্টেন্ট—পাঠযোগ্য টেক্সট হিসেবে পাঠায় যা নেটওয়ার্ক পথের যে কেউ পড়তে বা বদলাতে পারে। HTTPS একই HTTP-কে TLS-এ মোড়ায়, আপনাকে দেয় এনক্রিপশন (কেউ পড়তে পারে না), integrity (কেউ কারচুপি করতে পারে না) ও authentication (আপনি আসল server-এর সঙ্গে কথা বলছেন)। আধুনিক ব্রাউজার এখন সাধারণ HTTP-তে ব্যবহারকারীদের সতর্ক করে, ও HTTP/2-র মতো ফিচার কার্যত এটি দাবি করে।') },
      ],
    },
    {
      h: l('Common mistakes', 'সাধারণ ভুল'),
      blocks: [
        { list: [
          l('Treating HTTP as stateful — assuming the server "remembers" a previous request. It does not; state must ride in cookies or tokens.', 'HTTP-কে stateful ভাবা—ধরে নেওয়া server আগের request "মনে রাখে"। রাখে না; state cookie বা token-এ চলতে হবে।'),
          l('Trusting client-supplied headers or cookies without validating them on the server — they can be forged by anyone.', 'server-এ যাচাই ছাড়া client-সরবরাহকৃত header বা cookie বিশ্বাস করা—এগুলো যে কেউ জাল করতে পারে।'),
          l('Sending passwords or tokens over plain HTTP instead of HTTPS, exposing them to anyone on the path.', 'HTTPS-এর বদলে সাধারণ HTTP-তে পাসওয়ার্ড বা token পাঠানো, পথের যে কারো কাছে উন্মুক্ত করা।'),
          l('Using GET for actions that change data, so a crawler or a retry can trigger the change unexpectedly.', 'ডেটা বদলায় এমন কাজের জন্য GET ব্যবহার করা, যাতে একটি crawler বা retry অপ্রত্যাশিতভাবে বদল ঘটাতে পারে।'),
        ] },
      ],
    },
    {
      h: l('Remember in one line', 'এক লাইনে মনে রাখুন'),
      blocks: [
        { list: [
          l('HTTP is a stateless request/response protocol; state lives in cookies and tokens, not the protocol.', 'HTTP একটি stateless request/response protocol; state cookie ও token-এ থাকে, protocol-এ নয়।'),
          l('Statelessness makes horizontal scaling easy, but every request must re-send the context it needs.', 'stateless-নেস horizontal scaling সহজ করে, তবে প্রতিটি request-কে প্রয়োজনীয় প্রসঙ্গ আবার পাঠাতে হয়।'),
          l('Always use HTTPS, and always re-validate client-supplied headers and cookies on the server.', 'সবসময় HTTPS ব্যবহার করুন, ও server-এ সবসময় client-সরবরাহকৃত header ও cookie পুনরায় যাচাই করুন।'),
        ] },
      ],
    },
  ],

  // ── net-tls · TLS & the handshake ──────────────────────────────────────────
  'net-tls': [
    {
      h: l('What is TLS?', 'TLS কী?'),
      blocks: [
        { p: l('TLS (Transport Layer Security) is the protocol that turns an ordinary, readable connection into a private, trusted one. It does two jobs at the start of a connection: it authenticates the server (proves the machine you reached really is example.com and not an impostor) and it negotiates encryption keys so that everything sent afterwards is scrambled. The "S" in HTTPS is TLS; the same layer secures email, databases, and APIs. TLS is the modern successor to the older, now-insecure SSL, though people still loosely say "SSL".', 'TLS (Transport Layer Security) হলো সেই protocol যা একটি সাধারণ, পাঠযোগ্য কানেকশনকে একটি ব্যক্তিগত, বিশ্বস্ত কানেকশনে পরিণত করে। এটি কানেকশনের শুরুতে দুটি কাজ করে: এটি server যাচাই করে (প্রমাণ করে আপনি যে মেশিনে পৌঁছেছেন তা সত্যিই example.com, কোনো ছদ্মবেশী নয়) ও এনক্রিপশন key নেগোশিয়েট করে যাতে এরপর পাঠানো সবকিছু এলোমেলো হয়। HTTPS-এর "S" হলো TLS; একই স্তর ইমেইল, database ও API নিরাপদ করে। TLS হলো পুরনো, এখন-অনিরাপদ SSL-এর আধুনিক উত্তরসূরি, যদিও মানুষ এখনো ঢিলেঢালাভাবে "SSL" বলে।') },
        { p: l('The problem TLS solves is that the internet is a public path. A packet from your laptop passes through your router, your ISP, several transit networks, and finally the server — any of which could read or alter it. Without TLS, a password typed on a login page travels as plain text that any of those hops can see. TLS makes the data unreadable to everyone except the two endpoints, and proves the far endpoint is who it claims to be.', 'TLS যে সমস্যা সমাধান করে তা হলো ইন্টারনেট একটি পাবলিক পথ। আপনার ল্যাপটপ থেকে একটি packet আপনার router, আপনার ISP, কয়েকটি transit নেটওয়ার্ক ও শেষে server-এর মধ্য দিয়ে যায়—যার যেকোনোটি এটি পড়তে বা বদলাতে পারত। TLS ছাড়া, একটি লগইন পেজে টাইপ করা পাসওয়ার্ড সাধারণ টেক্সট হিসেবে যায় যা সেই যেকোনো hop দেখতে পারে। TLS ডেটাকে দুই endpoint ছাড়া সবার কাছে অপাঠ্য করে, ও প্রমাণ করে দূরের endpoint যা দাবি করে তাই।') },
        { note: l('TLS is like showing ID and agreeing on a secret code before a private conversation begins. First you verify the other person is really who they say (the certificate), then you both settle on a code only the two of you know (the session keys), and only then do you speak freely.', 'TLS একটি ব্যক্তিগত কথোপকথন শুরুর আগে পরিচয়পত্র দেখানো ও একটি গোপন কোডে সম্মত হওয়ার মতো। প্রথমে আপনি যাচাই করেন অন্য ব্যক্তি সত্যিই যা বলছে তাই (certificate), তারপর আপনারা দুজন এমন একটি কোডে বসেন যা শুধু আপনাদের দুজনের জানা (session key), ও তবেই খোলাখুলি কথা বলেন।'), kind: 'tip' },
      ],
    },
    {
      h: l('The TLS handshake, step by step', 'TLS handshake, ধাপে ধাপে'),
      blocks: [
        { p: l('Before any encrypted data flows, the client and server run a short negotiation called the handshake. Its goal is to agree on a cipher, verify the server’s certificate, and end up with a shared session key that both sides know but no eavesdropper can.', 'কোনো এনক্রিপ্টেড ডেটা যাওয়ার আগে client ও server একটি সংক্ষিপ্ত নেগোশিয়েশন চালায় যাকে handshake বলে। এর লক্ষ্য একটি cipher-এ সম্মত হওয়া, server-এর certificate যাচাই করা, ও একটি ভাগ করা session key-তে পৌঁছানো যা দুই পক্ষ জানে কিন্তু কোনো আড়িপাতা জানতে পারে না।') },
        { steps: [
          l('ClientHello — the client offers the TLS versions and cipher suites it supports, plus a random number.', 'ClientHello—client তার সমর্থিত TLS সংস্করণ ও cipher suite, সঙ্গে একটি random সংখ্যা প্রস্তাব করে।'),
          l('ServerHello + Certificate — the server picks a cipher, sends its own random, and presents its certificate (which contains its public key).', 'ServerHello + Certificate—server একটি cipher বাছে, নিজের random পাঠায়, ও তার certificate (যাতে তার public key আছে) উপস্থাপন করে।'),
          l('The client verifies the certificate chain up to a trusted CA. If it does not check out, the connection is aborted with a warning.', 'client certificate chain একটি বিশ্বস্ত CA পর্যন্ত যাচাই করে। মিলে না গেলে কানেকশন একটি সতর্কবার্তাসহ বাতিল হয়।'),
          l('Key exchange — using the certificate and the exchanged randoms, both sides independently derive the same secret session keys.', 'Key exchange—certificate ও বিনিময় করা random ব্যবহার করে দুই পক্ষ স্বাধীনভাবে একই গোপন session key তৈরি করে।'),
          l('Finished — both send an encrypted "Finished" message. From here, all application data (your HTTP requests) is encrypted with the session key.', 'Finished—দুই পক্ষ একটি এনক্রিপ্টেড "Finished" বার্তা পাঠায়। এখান থেকে সব application ডেটা (আপনার HTTP request) session key দিয়ে এনক্রিপ্টেড।'),
        ] },
        { code: `Client  →  ClientHello     (TLS versions, cipher suites, random)
Client  ←  ServerHello     (chosen cipher, random)
Client  ←  Certificate     (server's cert chain, public key)
        ...  client verifies the chain against a trusted CA  ...
Client  ↔  Key exchange    (both derive the SAME session keys)
Client  →  Finished        (encrypted)
Client  ←  Finished        (encrypted)
        ===  application data now flows encrypted  ===`, caption: l('Notice the asymmetry: certificates and public-key math are used only to agree on a shared session key. The bulk data is then encrypted with fast symmetric keys.', 'অসমতা লক্ষ করুন: certificate ও public-key গণিত শুধু একটি ভাগ করা session key-তে সম্মত হতে ব্যবহৃত হয়। এরপর মূল ডেটা দ্রুত symmetric key দিয়ে এনক্রিপ্ট হয়।') },
      ],
    },
    {
      h: l('The certificate chain and CAs', 'certificate chain ও CA'),
      blocks: [
        { p: l('A certificate is only trustworthy because someone you already trust vouched for it. Your browser and OS ship with a list of trusted root Certificate Authorities (CAs). A server’s certificate is signed by an intermediate CA, which is signed by a root CA. Verifying this chain up to a trusted root is how the client knows the certificate is genuine and not forged.', 'একটি certificate শুধু বিশ্বাসযোগ্য কারণ আপনি ইতিমধ্যে বিশ্বাস করেন এমন কেউ এর জন্য জামিন দিয়েছে। আপনার ব্রাউজার ও OS একটি বিশ্বস্ত root Certificate Authority (CA)-র তালিকাসহ আসে। একটি server-এর certificate একটি intermediate CA দ্বারা সই করা, যা একটি root CA দ্বারা সই করা। এই chain একটি বিশ্বস্ত root পর্যন্ত যাচাই করাই client-এর জানার উপায় certificate আসল, জাল নয়।') },
        { table: {
          head: [l('Link in the chain', 'chain-এর ধাপ'), l('Role', 'ভূমিকা')],
          rows: [
            [l('Root CA', 'Root CA'), l('Pre-trusted by your browser/OS; the anchor of trust. Its key is guarded very carefully.', 'আপনার ব্রাউজার/OS দ্বারা পূর্ব-বিশ্বস্ত; বিশ্বাসের নোঙর। এর key খুব সাবধানে রক্ষিত।')],
            [l('Intermediate CA', 'Intermediate CA'), l('Signed by the root; it issues the actual server certificates day to day.', 'root দ্বারা সই করা; এটি প্রতিদিন আসল server certificate ইস্যু করে।')],
            [l('Server (leaf) certificate', 'Server (leaf) certificate'), l('The one for example.com, containing its public key and validity dates.', 'example.com-এর জন্যটি, যাতে তার public key ও মেয়াদের তারিখ আছে।')],
            [l('Client verification', 'Client যাচাই'), l('Walks leaf → intermediate → root; if it reaches a trusted root and nothing expired, trust is established.', 'leaf → intermediate → root হাঁটে; একটি বিশ্বস্ত root-এ পৌঁছালে ও কিছু মেয়াদোত্তীর্ণ না হলে বিশ্বাস স্থাপিত।')],
          ],
        } },
        { p: l('Certificates also expire — usually every 90 days to 1 year — which is why an expired certificate is such a common outage. Session resumption lets a returning client skip most of the handshake by reusing keys from a recent session, avoiding a full round-trip cost on every connection.', 'certificate-ও মেয়াদোত্তীর্ণ হয়—সাধারণত প্রতি ৯০ দিন থেকে ১ বছরে—এ কারণেই একটি মেয়াদোত্তীর্ণ certificate এত সাধারণ একটি outage। session resumption একটি ফিরে আসা client-কে সাম্প্রতিক session-এর key পুনঃব্যবহার করে বেশিরভাগ handshake এড়াতে দেয়, প্রতি কানেকশনে একটি পূর্ণ round-trip খরচ এড়িয়ে।') },
      ],
    },
    {
      h: l('When and where TLS matters (and its cost)', 'TLS কখন ও কোথায় জরুরি (ও এর খরচ)'),
      blocks: [
        { p: l('Use TLS on every connection that leaves your machine — which today means essentially everywhere: public websites, internal APIs, database links, and service-to-service calls. Encryption protects confidentiality (nobody reads your data) and integrity (nobody alters it in transit), and the certificate proves identity. Those three guarantees are the foundation of a secure system.', 'আপনার মেশিন ছেড়ে যাওয়া প্রতিটি কানেকশনে TLS ব্যবহার করুন—যা আজ কার্যত সর্বত্র মানে: পাবলিক ওয়েবসাইট, অভ্যন্তরীণ API, database লিংক, ও service-to-service কল। এনক্রিপশন গোপনীয়তা (কেউ আপনার ডেটা পড়ে না) ও integrity (কেউ পথে বদলায় না) রক্ষা করে, ও certificate পরিচয় প্রমাণ করে। এই তিন গ্যারান্টি একটি নিরাপদ সিস্টেমের ভিত্তি।') },
        { p: l('The cost is real but usually worth it. The handshake adds round-trips before the first byte of real data (TLS 1.3 cut this to a single round-trip, and resumption to zero), and encryption uses CPU. At scale this is why teams terminate TLS at a load balancer or CDN edge, reuse connections with keep-alive, and enable session resumption — so the handshake cost is paid rarely, not on every request.', 'খরচ বাস্তব তবে সাধারণত এর যোগ্য। handshake আসল ডেটার প্রথম বাইটের আগে round-trip যোগ করে (TLS 1.3 এটিকে একটি round-trip-এ, ও resumption শূন্যে নামিয়েছে), ও এনক্রিপশন CPU ব্যবহার করে। স্কেলে এ কারণেই টিম একটি load balancer বা CDN edge-এ TLS terminate করে, keep-alive দিয়ে কানেকশন পুনঃব্যবহার করে, ও session resumption চালু করে—যাতে handshake খরচ কদাচিৎ দিতে হয়, প্রতিটি request-এ নয়।') },
      ],
    },
    {
      h: l('Common mistakes', 'সাধারণ ভুল'),
      blocks: [
        { list: [
          l('Assuming HTTPS alone makes a system "secure." TLS protects data in transit; it does nothing about weak passwords, SQL injection, or a leaky database.', 'শুধু HTTPS একটি সিস্টেমকে "নিরাপদ" করে ধরে নেওয়া। TLS পথে ডেটা রক্ষা করে; দুর্বল পাসওয়ার্ড, SQL injection বা ফাঁস হওয়া database নিয়ে কিছু করে না।'),
          l('Ignoring certificate expiry — a lapsed certificate takes the whole site down and shows every user a scary warning. Automate renewal.', 'certificate মেয়াদ উপেক্ষা করা—একটি মেয়াদোত্তীর্ণ certificate পুরো সাইট নামিয়ে দেয় ও প্রতিটি ব্যবহারকারীকে একটি ভীতিকর সতর্কবার্তা দেখায়। নবায়ন স্বয়ংক্রিয় করুন।'),
          l('Disabling certificate validation "to make it work" in code — this silently removes the authentication guarantee and invites man-in-the-middle attacks.', 'কোডে "কাজ করাতে" certificate যাচাই বন্ধ করা—এটি নীরবে authentication গ্যারান্টি সরায় ও man-in-the-middle আক্রমণ ডেকে আনে।'),
          l('Treating old SSL/early TLS versions as fine — outdated protocol versions and weak ciphers have known breaks and should be disabled.', 'পুরনো SSL/প্রাথমিক TLS সংস্করণকে ঠিক ভাবা—সেকেলে protocol সংস্করণ ও দুর্বল cipher-এর জানা দুর্বলতা আছে ও বন্ধ রাখা উচিত।'),
        ] },
      ],
    },
    {
      h: l('Remember in one line', 'এক লাইনে মনে রাখুন'),
      blocks: [
        { list: [
          l('TLS authenticates the server with a certificate, then negotiates keys so the rest of the connection is encrypted.', 'TLS একটি certificate দিয়ে server যাচাই করে, তারপর key নেগোশিয়েট করে যাতে বাকি কানেকশন এনক্রিপ্টেড।'),
          l('Trust flows through a certificate chain up to a CA your browser already trusts; session keys avoid re-handshaking.', 'বিশ্বাস একটি certificate chain দিয়ে আপনার ব্রাউজার ইতিমধ্যে বিশ্বাস করা একটি CA পর্যন্ত যায়; session key বারবার handshake এড়ায়।'),
          l('HTTPS is necessary, not sufficient — mind certificate expiry, validation, and everything above the transport.', 'HTTPS প্রয়োজনীয়, যথেষ্ট নয়—certificate মেয়াদ, যাচাই ও transport-এর ওপরের সবকিছু খেয়াল রাখুন।'),
        ] },
      ],
    },
  ],

  // ── net-dns · DNS resolution ───────────────────────────────────────────────
  'net-dns': [
    {
      h: l('What is DNS?', 'DNS কী?'),
      blocks: [
        { p: l('DNS (Domain Name System) is the internet’s directory: it translates a human-friendly name like www.example.com into the IP address a machine actually needs to connect, such as 93.184.216.34. People remember names; routers and sockets only understand numbers. DNS is the lookup layer that bridges the two, and it runs before almost every connection you make — you cannot open a web page, send an email, or call an API by name until DNS has resolved that name to an address.', 'DNS (Domain Name System) হলো ইন্টারনেটের ডিরেক্টরি: এটি www.example.com-এর মতো একটি মানুষ-বান্ধব নামকে একটি মেশিনের সংযোগে আসলে প্রয়োজনীয় IP অ্যাড্রেসে, যেমন 93.184.216.34, রূপান্তর করে। মানুষ নাম মনে রাখে; router ও socket শুধু সংখ্যা বোঝে। DNS হলো সেই lookup স্তর যা দুটিকে সেতুবদ্ধ করে, ও এটি আপনার প্রায় প্রতিটি সংযোগের আগে চলে—DNS সেই নামকে একটি অ্যাড্রেসে রিজলভ না করা পর্যন্ত আপনি নাম দিয়ে একটি web page খুলতে, একটি ইমেইল পাঠাতে বা একটি API কল করতে পারবেন না।') },
        { p: l('The problem DNS solves is twofold. First, humans cannot memorise IP addresses for every site. Second — and more importantly for design — the mapping from name to address must be changeable: a company can move its site to new servers, add more of them, or fail over to a backup, all by updating DNS, without anyone having to learn a new address. DNS turns a stable name into a flexible pointer.', 'DNS যে সমস্যা সমাধান করে তা দ্বিমুখী। প্রথমত, মানুষ প্রতিটি সাইটের IP অ্যাড্রেস মুখস্থ রাখতে পারে না। দ্বিতীয়ত—ও ডিজাইনের জন্য আরও গুরুত্বপূর্ণ—নাম থেকে অ্যাড্রেসের ম্যাপিং পরিবর্তনযোগ্য হতে হবে: একটি কোম্পানি তার সাইট নতুন server-এ সরাতে, আরও যোগ করতে বা একটি backup-এ fail over করতে পারে, সবই DNS আপডেট করে, কাউকে নতুন অ্যাড্রেস শিখতে না হয়ে। DNS একটি স্থায়ী নামকে একটি নমনীয় pointer-এ পরিণত করে।') },
        { note: l('DNS is like asking directory enquiries for a phone number. You know the name of the business, you ask, and you get back the exact number to dial. You never memorise the number — you just remember the name and look it up when you need it.', 'DNS একটি ফোন নম্বরের জন্য ডিরেক্টরি অনুসন্ধানে জিজ্ঞেস করার মতো। আপনি ব্যবসার নাম জানেন, জিজ্ঞেস করেন, ও ডায়াল করার সঠিক নম্বর ফেরত পান। আপনি নম্বর মুখস্থ করেন না—শুধু নাম মনে রাখেন ও দরকারে খুঁজে নেন।'), kind: 'tip' },
      ],
    },
    {
      h: l('How a lookup travels the hierarchy', 'একটি lookup কীভাবে শ্রেণিবিন্যাসে যায়'),
      blocks: [
        { p: l('DNS is not one giant server; it is a hierarchy of servers, each responsible for one part of the name, read right to left. A lookup for www.example.com is answered by walking down from the root, to the .com servers, to the servers that own example.com. Your machine does not do this itself — it asks a resolver (usually run by your ISP or a service like 8.8.8.8) to do the walking and return the final answer.', 'DNS একটি বিশাল server নয়; এটি server-এর একটি শ্রেণিবিন্যাস, প্রতিটি নামের এক অংশের জন্য দায়ী, ডান থেকে বাম পড়া। www.example.com-এর একটি lookup root থেকে নিচে, .com server-এ, example.com-এর মালিক server-এ হেঁটে উত্তর দেওয়া হয়। আপনার মেশিন এটি নিজে করে না—এটি একটি resolver (সাধারণত আপনার ISP বা 8.8.8.8-এর মতো একটি সেবা দ্বারা চালিত)-কে হাঁটা ও চূড়ান্ত উত্তর ফেরত দিতে বলে।') },
        { steps: [
          l('Your machine asks its configured resolver: "what is the IP for www.example.com?"', 'আপনার মেশিন তার কনফিগার করা resolver-কে জিজ্ঞেস করে: "www.example.com-এর IP কী?"'),
          l('If the resolver has the answer cached and still fresh, it replies instantly and the walk below is skipped.', 'resolver-এর কাছে উত্তর cache-এ ও এখনো টাটকা থাকলে, এটি সঙ্গে সঙ্গে উত্তর দেয় ও নিচের হাঁটা এড়ানো হয়।'),
          l('Otherwise it asks a root server, which does not know the answer but says "ask the .com servers."', 'নইলে এটি একটি root server-কে জিজ্ঞেস করে, যা উত্তর জানে না কিন্তু বলে ".com server-কে জিজ্ঞেস করুন।"'),
          l('It asks a .com TLD server, which replies "the authoritative server for example.com is over here."', 'এটি একটি .com TLD server-কে জিজ্ঞেস করে, যা উত্তর দেয় "example.com-এর authoritative server এখানে।"'),
          l('It asks that authoritative server, which owns the record and returns the real IP address, plus a TTL saying how long to cache it.', 'এটি সেই authoritative server-কে জিজ্ঞেস করে, যা record-এর মালিক ও আসল IP অ্যাড্রেস ফেরত দেয়, সঙ্গে কতক্ষণ cache করতে হবে বলা একটি TTL।'),
          l('The resolver caches the answer, hands the IP to your machine, and the connection can finally begin.', 'resolver উত্তর cache করে, IP আপনার মেশিনে দেয়, ও সংযোগ অবশেষে শুরু হতে পারে।'),
        ] },
        { code: `dig www.example.com

QUESTION:
  www.example.com.    IN  A

RESOLUTION PATH:
  resolver  →  root server       "ask the .com servers"
  resolver  →  .com TLD server   "ask ns1.example.com"
  resolver  →  authoritative ns  "www.example.com = 93.184.216.34"

ANSWER:
  www.example.com.  300  IN  A  93.184.216.34
                    ^TTL: cache this for 300 seconds`, caption: l('The "300" is the TTL in seconds. Every layer that saw this answer may reuse it for 300 seconds before asking again — which is exactly why DNS changes are not instant.', '"300" হলো সেকেন্ডে TTL। এই উত্তর দেখা প্রতিটি স্তর আবার জিজ্ঞেস করার আগে ৩০০ সেকেন্ড এটি পুনঃব্যবহার করতে পারে—ঠিক এ কারণেই DNS পরিবর্তন তাৎক্ষণিক নয়।') },
      ],
    },
    {
      h: l('Common record types', 'সাধারণ record ধরন'),
      blocks: [
        { p: l('A DNS answer is a record, and the record’s type says what kind of answer it is. A handful cover almost everything you will meet.', 'একটি DNS উত্তর একটি record, ও record-এর type বলে এটি কী ধরনের উত্তর। মুষ্টিমেয় কয়েকটি আপনার দেখা প্রায় সবকিছু ঢাকে।') },
        { table: {
          head: [l('Record', 'record'), l('What it maps to', 'কীসে ম্যাপ করে')],
          rows: [
            [l('A', 'A'), l('A name to an IPv4 address (example.com → 93.184.216.34).', 'একটি নাম একটি IPv4 অ্যাড্রেসে (example.com → 93.184.216.34)।')],
            [l('AAAA', 'AAAA'), l('A name to an IPv6 address.', 'একটি নাম একটি IPv6 অ্যাড্রেসে।')],
            [l('CNAME', 'CNAME'), l('A name to another name (an alias), e.g. www → example.com.', 'একটি নাম আরেকটি নামে (একটি alias), যেমন www → example.com।')],
            [l('MX', 'MX'), l('A domain to its mail servers, so email knows where to go.', 'একটি domain তার mail server-এ, যাতে ইমেইল জানে কোথায় যাবে।')],
            [l('NS', 'NS'), l('A domain to its authoritative name servers.', 'একটি domain তার authoritative name server-এ।')],
            [l('TXT', 'TXT'), l('Arbitrary text, often used for domain verification and email anti-spoofing.', 'যেকোনো টেক্সট, প্রায়ই domain যাচাই ও ইমেইল anti-spoofing-এ ব্যবহৃত।')],
          ],
        } },
      ],
    },
    {
      h: l('TTL, caching, and the freshness trade-off', 'TTL, caching ও freshness ট্রেড-অফ'),
      blocks: [
        { p: l('The reason DNS is fast despite this multi-step hierarchy is caching. Every answer carries a TTL (time-to-live) — a number of seconds it may be reused. Your browser caches it, your operating system caches it, and the resolver caches it. Once warmed, most lookups are answered from a nearby cache in microseconds, and the root and TLD servers are spared billions of repeat questions.', 'এই বহু-ধাপ শ্রেণিবিন্যাস সত্ত্বেও DNS দ্রুত হওয়ার কারণ caching। প্রতিটি উত্তর একটি TTL (time-to-live) বহন করে—কত সেকেন্ড এটি পুনঃব্যবহার করা যায়। আপনার ব্রাউজার এটি cache করে, আপনার operating system এটি cache করে, ও resolver এটি cache করে। একবার গরম হলে, বেশিরভাগ lookup একটি কাছের cache থেকে microsecond-এ উত্তর পায়, ও root ও TLD server শত কোটি পুনরাবৃত্ত প্রশ্ন থেকে রেহাই পায়।') },
        { p: l('The trade-off is freshness. That same caching means a change does not take effect everywhere at once. If a record has a TTL of one hour and you change the IP, caches that already stored the old value keep serving it for up to an hour. This is DNS propagation: the reason a domain move or a failover is not instant. Teams lower the TTL to a few minutes before a planned change, then raise it again afterwards for efficiency.', 'ট্রেড-অফ হলো freshness। সেই একই caching মানে একটি পরিবর্তন সর্বত্র একসঙ্গে কার্যকর হয় না। একটি record-এর TTL এক ঘণ্টা হলে ও আপনি IP বদলালে, পুরনো মান ইতিমধ্যে রাখা cache এক ঘণ্টা পর্যন্ত তা পরিবেশন করতে থাকে। এটি DNS propagation: একটি domain সরানো বা failover তাৎক্ষণিক না হওয়ার কারণ। টিম একটি পরিকল্পিত পরিবর্তনের আগে TTL কয়েক মিনিটে নামায়, তারপর দক্ষতার জন্য আবার বাড়ায়।') },
        { note: l('Plan any IP or DNS change around the TTL. Lower the TTL well in advance (at least one old TTL period before), make the change, confirm it propagated, then restore a longer TTL. Never assume "I updated DNS, so everyone sees it now."', 'যেকোনো IP বা DNS পরিবর্তন TTL ঘিরে পরিকল্পনা করুন। আগেভাগে TTL কমান (অন্তত এক পুরনো TTL সময় আগে), পরিবর্তন করুন, propagate হয়েছে নিশ্চিত করুন, তারপর একটি দীর্ঘ TTL ফেরান। কখনো ধরে নেবেন না "আমি DNS আপডেট করেছি, তাই এখন সবাই দেখছে।"'), kind: 'warn' },
      ],
    },
    {
      h: l('When and where DNS matters in design', 'ডিজাইনে DNS কখন ও কোথায় জরুরি'),
      blocks: [
        { p: l('DNS is more than a phone book — it is a control point for how traffic reaches your system. Because a name maps to an address you control, DNS is where you point users at a CDN, distribute load across regions (geo-DNS returns a nearby server’s IP), and perform failover (swing the record to a healthy server when one dies). Many CDNs and load balancers work precisely by owning your DNS answers.', 'DNS একটি ফোন বইয়ের চেয়ে বেশি—এটি আপনার সিস্টেমে ট্রাফিক কীভাবে পৌঁছায় তার একটি নিয়ন্ত্রণ বিন্দু। একটি নাম আপনার নিয়ন্ত্রিত একটি অ্যাড্রেসে ম্যাপ করে বলে, DNS হলো যেখানে আপনি ব্যবহারকারীদের একটি CDN-এ নির্দেশ করেন, region জুড়ে load বণ্টন করেন (geo-DNS একটি কাছের server-এর IP ফেরায়), ও failover করেন (একটি মরলে record একটি সুস্থ server-এ ঘোরান)। অনেক CDN ও load balancer ঠিক আপনার DNS উত্তরের মালিক হয়েই কাজ করে।') },
        { p: l('Because so much depends on it, DNS is also a critical dependency. If your DNS provider goes down, users cannot resolve your name and your site is effectively offline even though your servers are fine. That is why serious systems use multiple, geographically redundant DNS providers and monitor resolution as closely as they monitor the servers themselves.', 'এত কিছু এর ওপর নির্ভর করে বলে, DNS একটি সংকটপূর্ণ নির্ভরতাও। আপনার DNS provider পড়ে গেলে ব্যবহারকারীরা আপনার নাম রিজলভ করতে পারে না ও আপনার server ঠিক থাকলেও আপনার সাইট কার্যত অফলাইন। এ কারণেই গুরুত্বপূর্ণ সিস্টেম একাধিক, ভৌগোলিকভাবে redundant DNS provider ব্যবহার করে ও server-এর মতোই resolution নিবিড়ভাবে পর্যবেক্ষণ করে।') },
      ],
    },
    {
      h: l('Common mistakes', 'সাধারণ ভুল'),
      blocks: [
        { list: [
          l('Assuming a DNS change is instant everywhere. Layered caches and TTLs mean old answers linger for as long as the TTL — sometimes hours.', 'একটি DNS পরিবর্তন সর্বত্র তাৎক্ষণিক ধরে নেওয়া। স্তরভিত্তিক cache ও TTL মানে পুরনো উত্তর TTL-এর সমান সময়—কখনো ঘণ্টার পর ঘণ্টা—থেকে যায়।'),
          l('Setting a very long TTL on records you may need to change quickly, making a failover or migration slow.', 'দ্রুত বদলাতে হতে পারে এমন record-এ খুব দীর্ঘ TTL সেট করা, একটি failover বা migration ধীর করে।'),
          l('Forgetting DNS is a dependency — treating an outage as a "server problem" when the name simply is not resolving.', 'DNS একটি নির্ভরতা তা ভুলে যাওয়া—একটি outage-কে "server সমস্যা" ভাবা যখন নামটি কেবল রিজলভ হচ্ছে না।'),
          l('Testing from one machine and trusting it globally — your local cache may show the new value while the rest of the world still sees the old one.', 'এক মেশিন থেকে পরীক্ষা করে বিশ্বব্যাপী বিশ্বাস করা—আপনার local cache নতুন মান দেখাতে পারে যখন বাকি বিশ্ব এখনো পুরনোটি দেখে।'),
        ] },
      ],
    },
    {
      h: l('Remember in one line', 'এক লাইনে মনে রাখুন'),
      blocks: [
        { list: [
          l('DNS turns a name into an IP by walking a hierarchy: resolver → root → TLD → authoritative server.', 'DNS একটি শ্রেণিবিন্যাস হেঁটে একটি নামকে একটি IP-তে পরিণত করে: resolver → root → TLD → authoritative server।'),
          l('TTL-based caching at every layer trades freshness for speed — which makes lookups fast but changes slow to propagate.', 'প্রতিটি স্তরে TTL-ভিত্তিক caching গতির জন্য freshness ছাড়ে—যা lookup দ্রুত করে কিন্তু পরিবর্তন ছড়াতে ধীর।'),
          l('DNS is a control point and a critical dependency: use it for CDN, geo-routing, and failover, and keep it redundant.', 'DNS একটি নিয়ন্ত্রণ বিন্দু ও একটি সংকটপূর্ণ নির্ভরতা: CDN, geo-routing ও failover-এ ব্যবহার করুন, ও redundant রাখুন।'),
        ] },
      ],
    },
  ],
}
