// Deep System Design teaching guides (bilingual) — Core components, part b.
// Keyed by topic id: dns-proxy, load-balancing, api-protocols, caching, sql-nosql.
// Same block schema as course-guides.js, rendered by GuideBlock/LessonGuide.

const l = (en, bn) => ({ en, bn })

export default {
  // ── dns-proxy · DNS, proxies & reverse proxies ────────────────────────────
  'dns-proxy': [
    {
      h: l('What is DNS, and what is a proxy?', 'DNS কী, আর প্রক্সি কী?'),
      blocks: [
        { p: l('DNS (Domain Name System) is the internet’s address book. People remember names like google.com, but machines only talk to numeric IP addresses like 142.250.190.14. DNS is the service that translates the human name into the machine address, every single time you open a site.', 'DNS (Domain Name System) হলো ইন্টারনেটের ঠিকানার বই। মানুষ google.com-এর মতো নাম মনে রাখে, কিন্তু মেশিন শুধু 142.250.190.14-এর মতো সংখ্যাসূচক IP ঠিকানায় কথা বলে। আপনি যতবার একটি সাইট খোলেন, DNS প্রতিবার সেই মানুষের নামকে মেশিন ঠিকানায় অনুবাদ করে।') },
        { p: l('A proxy is a middleman that sits between a client and a server so the two never talk directly. Everything flows through the proxy, which lets you add one controlled point for caching, filtering, security, TLS, and load balancing. Which side the proxy stands in front of decides its job: a forward proxy hides the clients, a reverse proxy hides the servers.', 'একটি প্রক্সি হলো ক্লায়েন্ট ও সার্ভারের মাঝের একজন মধ্যস্থ যাতে দুজন সরাসরি কথা না বলে। সবকিছু প্রক্সির মধ্য দিয়ে যায়, ফলে caching, filtering, নিরাপত্তা, TLS ও load balancing-এর জন্য একটি নিয়ন্ত্রিত বিন্দু যোগ করা যায়। প্রক্সি কোন পাশের সামনে দাঁড়ায় তা এর কাজ ঠিক করে: forward proxy ক্লায়েন্টকে আড়াল করে, reverse proxy সার্ভারকে আড়াল করে।') },
        { note: l('DNS is like a phone book: you look up a name to get a number. A reverse proxy is like a building’s reception desk: every visitor arrives at one front door, and reception quietly routes them to the right office inside.', 'DNS একটি ফোনবুকের মতো: নাম খুঁজে নম্বর পান। reverse proxy একটি ভবনের রিসেপশন ডেস্কের মতো: প্রতিটি দর্শনার্থী একটি সামনের দরজায় আসে, আর রিসেপশন নীরবে তাদের ভেতরের সঠিক অফিসে পাঠায়।'), kind: 'tip' },
      ],
    },
    {
      h: l('How a DNS lookup works, step by step', 'একটি DNS লুকআপ কীভাবে কাজ করে, ধাপে ধাপে'),
      blocks: [
        { p: l('DNS is a distributed hierarchy, not one giant server. A lookup walks down the hierarchy, but caching at every level means most lookups finish in a few milliseconds without reaching the top.', 'DNS একটি বিতরণকৃত শ্রেণিবিন্যাস, একটি বিশাল সার্ভার নয়। একটি লুকআপ এই শ্রেণিবিন্যাস বেয়ে নামে, কিন্তু প্রতিটি স্তরে caching থাকায় বেশিরভাগ লুকআপ শীর্ষে না পৌঁছেই কয়েক মিলিসেকেন্ডে শেষ হয়।') },
        { steps: [
          l('Your device asks a recursive resolver (usually run by your ISP or a public one like 8.8.8.8) to find the IP for example.com.', 'আপনার ডিভাইস একটি recursive resolver-কে (সাধারণত আপনার ISP বা 8.8.8.8-এর মতো পাবলিক একটি) example.com-এর IP খুঁজতে বলে।'),
          l('If the resolver already has a fresh answer in its cache, it returns it immediately — no further work.', 'resolver-এর cache-এ আগে থেকেই একটি টাটকা উত্তর থাকলে তা সঙ্গে সঙ্গে ফেরত দেয়—আর কোনো কাজ নেই।'),
          l('Otherwise it asks a root server, which points it to the .com TLD (top-level domain) servers.', 'না থাকলে এটি একটি root সার্ভারকে জিজ্ঞাসা করে, যা .com TLD (top-level domain) সার্ভারের দিকে নির্দেশ করে।'),
          l('The TLD server points to the authoritative name server for example.com — the server that holds the real records.', 'TLD সার্ভার example.com-এর authoritative name server-এর দিকে নির্দেশ করে—যে সার্ভার আসল রেকর্ড রাখে।'),
          l('The authoritative server returns the A record (the IP). The resolver caches it for the record’s TTL and hands it back to you.', 'authoritative সার্ভার A record (IP) ফেরত দেয়। resolver তা record-এর TTL-এর জন্য cache করে ও আপনাকে ফেরত দেয়।'),
        ] },
        { p: l('Different record types answer different questions. Here is a simplified zone for example.com; the number in each row is the TTL (time-to-live) in seconds — how long anyone may cache that answer.', 'ভিন্ন record type ভিন্ন প্রশ্নের উত্তর দেয়। example.com-এর একটি সরলীকৃত zone নিচে দেওয়া হলো; প্রতিটি সারির সংখ্যাটি সেকেন্ডে TTL (time-to-live)—কেউ কতক্ষণ সেই উত্তর cache করতে পারবে।') },
        { code: `; DNS records for example.com (a simplified zone file)
example.com.      3600  IN  A      93.184.216.34         ; IPv4 address, cacheable for 3600s
example.com.      3600  IN  AAAA   2606:2800:220:1:248:1893:25c8:1946   ; IPv6 address
www.example.com.  3600  IN  CNAME  example.com.          ; www is an alias of the root
example.com.      3600  IN  MX     10 mail.example.com.  ; where email should be delivered
api.example.com.  60    IN  A      93.184.216.9          ; short TTL: easy to move fast`, caption: l('A short TTL (api, 60s) lets you re-point traffic quickly; a long TTL (3600s) cuts lookups but slows changes. TTL is the dial between speed and flexibility.', 'ছোট TTL (api, 60s) দ্রুত ট্রাফিক পুনঃনির্দেশ করতে দেয়; বড় TTL (3600s) লুকআপ কমায় কিন্তু পরিবর্তন ধীর করে। TTL হলো গতি ও নমনীয়তার মধ্যে ডায়াল।') },
      ],
    },
    {
      h: l('Forward proxy vs reverse proxy', 'Forward proxy বনাম reverse proxy'),
      blocks: [
        { p: l('Both are proxies, but they face opposite directions. A forward proxy acts on behalf of clients (it sits in front of users); a reverse proxy acts on behalf of servers (it sits in front of your backend). In system design you will almost always be adding a reverse proxy.', 'দুটোই প্রক্সি, তবে বিপরীত দিকে মুখ করে। forward proxy ক্লায়েন্টের পক্ষে কাজ করে (ব্যবহারকারীর সামনে বসে); reverse proxy সার্ভারের পক্ষে কাজ করে (আপনার backend-এর সামনে বসে)। সিস্টেম ডিজাইনে আপনি প্রায় সবসময় একটি reverse proxy যোগ করবেন।') },
        { table: {
          head: [l('Aspect', 'দিক'), l('Forward proxy', 'Forward proxy'), l('Reverse proxy', 'Reverse proxy')],
          rows: [
            [l('Stands in front of', 'কার সামনে দাঁড়ায়'), l('The clients / users', 'ক্লায়েন্ট / ব্যবহারকারী'), l('The servers / backend', 'সার্ভার / backend')],
            [l('Whom it hides', 'কাকে আড়াল করে'), l('Hides the client from the server', 'সার্ভার থেকে ক্লায়েন্টকে আড়াল করে'), l('Hides the servers from the client', 'ক্লায়েন্ট থেকে সার্ভারকে আড়াল করে')],
            [l('Typical uses', 'সাধারণ ব্যবহার'), l('Filtering, access control, anonymity, corporate caching', 'filtering, access control, anonymity, corporate caching'), l('TLS termination, routing, caching, load balancing, hiding topology', 'TLS termination, রাউটিং, caching, load balancing, টপোলজি আড়াল')],
            [l('Examples', 'উদাহরণ'), l('Corporate web filter, a VPN egress', 'কর্পোরেট web filter, VPN egress'), l('nginx, HAProxy, Envoy, every CDN', 'nginx, HAProxy, Envoy, প্রতিটি CDN')],
          ],
        } },
        { p: l('A reverse proxy is your one entry point. Because clients only ever see it, you can add, remove, or move backend services without changing the address users depend on — and centralize TLS, security, and caching in one place instead of rebuilding them in every service.', 'reverse proxy হলো আপনার একমাত্র প্রবেশদ্বার। ক্লায়েন্ট শুধু একেই দেখে বলে, ব্যবহারকারীর নির্ভরশীল ঠিকানা না বদলে আপনি backend সেবা যোগ, বাদ বা সরাতে পারেন—আর TLS, নিরাপত্তা ও caching প্রতিটি সেবায় আবার না বানিয়ে এক জায়গায় কেন্দ্রীভূত করতে পারেন।') },
      ],
    },
    {
      h: l('Where and when to use them', 'কোথায় ও কখন ব্যবহার করবেন'),
      blocks: [
        { p: l('Every internet system uses DNS — you rarely "decide" to use it, but you do decide TTLs. Pick a short TTL (30–60s) for records you may need to move fast, such as during a failover or a blue-green deploy, and a long TTL (hours) for stable records to cut lookup traffic. Plan any IP change in advance: lower the TTL first, wait for old caches to expire, then make the change.', 'প্রতিটি ইন্টারনেট সিস্টেম DNS ব্যবহার করে—আপনি কমই "সিদ্ধান্ত" নেন ব্যবহার করবেন কিনা, তবে TTL ঠিক করেন। যে record দ্রুত সরাতে হতে পারে (যেমন failover বা blue-green deploy-এ) তার জন্য ছোট TTL (৩০–৬০s) নিন, আর স্থিতিশীল record-এ লুকআপ ট্রাফিক কমাতে বড় TTL (ঘণ্টা) নিন। যেকোনো IP পরিবর্তন আগেভাগে পরিকল্পনা করুন: আগে TTL কমান, পুরনো cache মেয়াদ শেষের অপেক্ষা করুন, তারপর পরিবর্তন করুন।') },
        { p: l('Put a reverse proxy in front of virtually any production web system. It is the natural home for TLS termination (decrypt HTTPS once at a controlled edge), path- and host-based routing, gzip/brotli compression, rate limiting, and load balancing. A forward proxy is a narrower tool: reach for it when an organization must filter, log, or anonymize outbound traffic.', 'কার্যত যেকোনো প্রোডাকশন web সিস্টেমের সামনে একটি reverse proxy রাখুন। এটি TLS termination (একটি নিয়ন্ত্রিত এজে একবার HTTPS ডিক্রিপ্ট), path- ও host-ভিত্তিক রাউটিং, gzip/brotli compression, rate limiting ও load balancing-এর স্বাভাবিক ঘর। forward proxy একটি সংকীর্ণ টুল: যখন কোনো প্রতিষ্ঠানকে outbound ট্রাফিক filter, log বা anonymize করতে হয় তখন এটি নিন।') },
      ],
    },
    {
      h: l('Common mistakes', 'সাধারণ ভুল'),
      blocks: [
        { list: [
          l('Assuming a DNS change is instantaneous everywhere. Resolvers cache the old answer until its TTL expires, so a fraction of users can hit the old IP for minutes or hours after you "changed" it.', 'DNS পরিবর্তন সর্বত্র তাৎক্ষণিক ধরে নেওয়া। resolver পুরনো উত্তর TTL শেষ না হওয়া পর্যন্ত cache করে, তাই "বদলানোর" পরও কিছু ব্যবহারকারী মিনিট বা ঘণ্টা ধরে পুরনো IP-তে যেতে পারে।'),
          l('Setting a high TTL on a record you may need to move in an emergency — then being stuck waiting for caches to expire during an outage.', 'যে record জরুরি অবস্থায় সরাতে হতে পারে তাতে বড় TTL দেওয়া—তারপর একটি outage-এ cache মেয়াদ শেষের অপেক্ষায় আটকে থাকা।'),
          l('Caching private responses at a shared reverse proxy, leaking one user’s data to the next — the same danger as a CDN.', 'শেয়ার্ড reverse proxy-তে প্রাইভেট রেসপন্স cache করা, এক ব্যবহারকারীর ডেটা পরেরজনকে ফাঁস করা—CDN-এর মতোই বিপদ।'),
          l('Treating a reverse proxy as "just nginx config" and forgetting it is a single point of failure — it needs redundancy and health checks like anything else.', 'reverse proxy-কে "শুধু nginx config" ভেবে ভুলে যাওয়া যে এটি একটি single point of failure—অন্য সবকিছুর মতো এরও রিডানডেন্সি ও health check দরকার।'),
        ] },
      ],
    },
    {
      h: l('Remember in one line', 'এক লাইনে মনে রাখুন'),
      blocks: [
        { list: [
          l('DNS turns names into IP addresses through a cached hierarchy; TTL is the dial between fast lookups and fast changes.', 'DNS একটি cached শ্রেণিবিন্যাসের মাধ্যমে নামকে IP ঠিকানায় পরিণত করে; TTL হলো দ্রুত লুকআপ ও দ্রুত পরিবর্তনের মধ্যে ডায়াল।'),
          l('Forward proxy hides clients; reverse proxy hides servers and is your one entry point for TLS, routing, and caching.', 'forward proxy ক্লায়েন্ট আড়াল করে; reverse proxy সার্ভার আড়াল করে ও TLS, রাউটিং ও caching-এর জন্য আপনার একমাত্র প্রবেশদ্বার।'),
          l('A DNS change is never instant — lower the TTL first, wait, then move the IP.', 'DNS পরিবর্তন কখনো তাৎক্ষণিক নয়—আগে TTL কমান, অপেক্ষা করুন, তারপর IP সরান।'),
        ] },
      ],
    },
  ],

  // ── load-balancing · Load balancing & service discovery ───────────────────
  'load-balancing': [
    {
      h: l('What is load balancing?', 'লোড ব্যালান্সিং কী?'),
      blocks: [
        { p: l('A load balancer is a component that sits in front of a pool of identical servers and spreads incoming requests across them. It solves two problems at once: a single server can only handle so much traffic, and a single server is a single point of failure — if it dies, everything is down.', 'একটি load balancer একগুচ্ছ একরকম সার্ভারের সামনে বসে ও আসা রিকোয়েস্ট তাদের মধ্যে ছড়ায়। এটি একসঙ্গে দুটি সমস্যা সমাধান করে: একটি সার্ভার সীমিত ট্রাফিকই সামলাতে পারে, আর একটি সার্ভার একটি single point of failure—সেটি মরে গেলে সবকিছু বন্ধ।') },
        { p: l('By distributing work across many servers, a load balancer lets you scale horizontally (add more boxes to handle more traffic) and stay available (route around any box that fails). Its partner, service discovery, keeps an up-to-date list of which server instances currently exist and are healthy — because in the cloud, instances are constantly created and destroyed.', 'অনেক সার্ভারে কাজ ভাগ করে load balancer আপনাকে horizontally scale করতে দেয় (বেশি ট্রাফিক সামলাতে আরও বক্স যোগ করা) ও available রাখে (যে বক্স ব্যর্থ হয় তা এড়িয়ে রাউট)। এর সঙ্গী service discovery বর্তমানে কোন সার্ভার ইনস্ট্যান্স আছে ও সুস্থ তার হালনাগাদ তালিকা রাখে—কারণ ক্লাউডে ইনস্ট্যান্স ক্রমাগত তৈরি ও ধ্বংস হয়।') },
        { note: l('A load balancer is like a traffic officer at a busy junction. To do the job well the officer needs two things: routing rules (which lane gets the next car) and a current list of which roads are actually open. That second thing is service discovery.', 'load balancer একটি ব্যস্ত মোড়ের ট্রাফিক পুলিশের মতো। কাজটি ভালো করতে পুলিশের দুটি জিনিস দরকার: রাউটিং নিয়ম (পরের গাড়ি কোন লেনে) ও কোন রাস্তা আসলে খোলা তার বর্তমান তালিকা। সেই দ্বিতীয়টি হলো service discovery।'), kind: 'tip' },
      ],
    },
    {
      h: l('How a load balancer handles a request', 'একটি load balancer কীভাবে একটি রিকোয়েস্ট সামলায়'),
      blocks: [
        { steps: [
          l('A request arrives at the load balancer’s single public address (clients never see the individual servers).', 'একটি রিকোয়েস্ট load balancer-এর একটিমাত্র পাবলিক ঠিকানায় আসে (ক্লায়েন্ট আলাদা সার্ভার কখনো দেখে না)।'),
          l('The load balancer consults its list of healthy servers — instances that recently passed a health check.', 'load balancer তার সুস্থ সার্ভারের তালিকা দেখে—যেসব ইনস্ট্যান্স সম্প্রতি একটি health check পাস করেছে।'),
          l('It picks one server using its algorithm (round robin, least connections, and so on).', 'এটি তার অ্যালগরিদম দিয়ে (round robin, least connections ইত্যাদি) একটি সার্ভার বাছে।'),
          l('It forwards the request, waits for the response, and returns it to the client.', 'এটি রিকোয়েস্টটি পাঠায়, রেসপন্সের অপেক্ষা করে ও ক্লায়েন্টকে ফেরত দেয়।'),
          l('If the chosen server times out or errors, a well-configured balancer retries on another healthy server.', 'বাছাই করা সার্ভার timeout বা error করলে একটি ভালোভাবে কনফিগার করা balancer অন্য একটি সুস্থ সার্ভারে আবার চেষ্টা করে।'),
        ] },
        { p: l('Configuration makes this concrete. Below, nginx balances one public HTTPS endpoint across three app servers, weights a bigger box more heavily, keeps one as a backup, and terminates TLS at the edge.', 'কনফিগারেশন এটি বাস্তব করে। নিচে nginx একটি পাবলিক HTTPS endpoint তিনটি অ্যাপ সার্ভারে ভাগ করে, একটি বড় বক্সকে বেশি weight দেয়, একটিকে backup রাখে ও এজে TLS শেষ করে।') },
        { code: `# nginx: one public load balancer in front of three app servers
upstream app_servers {
    least_conn;                       # send each request to the server with the fewest active connections
    server 10.0.0.11:8080 weight=2;   # a bigger box gets twice the share
    server 10.0.0.12:8080;
    server 10.0.0.13:8080 backup;     # only used when the others are down
}

server {
    listen 443 ssl;                   # TLS terminates here, at the edge
    location / {
        proxy_pass http://app_servers;
        proxy_next_upstream error timeout http_502;  # on failure, retry another server
    }
}`, caption: l('The load balancer is also a reverse proxy: one door, many hidden backends, TLS handled once. "backup" and proxy_next_upstream are how it routes around failure.', 'load balancer একটি reverse proxy-ও: একটি দরজা, অনেক লুকানো backend, TLS একবারে সামলানো। "backup" ও proxy_next_upstream দিয়েই এটি ব্যর্থতা এড়িয়ে রাউট করে।') },
      ],
    },
    {
      h: l('Load balancing algorithms', 'লোড ব্যালান্সিং অ্যালগরিদম'),
      blocks: [
        { p: l('The algorithm decides which server gets the next request. There is no universally best choice — each fits a different traffic shape.', 'অ্যালগরিদম ঠিক করে পরের রিকোয়েস্ট কোন সার্ভার পায়। সর্বজনীন সেরা পছন্দ নেই—প্রতিটি ভিন্ন ট্রাফিক ধরনে খাপ খায়।') },
        { table: {
          head: [l('Algorithm', 'অ্যালগরিদম'), l('How it picks', 'কীভাবে বাছে'), l('Best when', 'কখন সেরা')],
          rows: [
            [l('Round robin', 'Round robin'), l('Each server in turn, one after another.', 'প্রতিটি সার্ভার পালাক্রমে, একের পর এক।'), l('Servers are equal and requests cost about the same.', 'সার্ভার সমান ও রিকোয়েস্টের খরচ প্রায় একরকম।')],
            [l('Least connections', 'Least connections'), l('The server with the fewest active connections right now.', 'এই মুহূর্তে সবচেয়ে কম active connection-যুক্ত সার্ভার।'), l('Requests vary in duration (some slow, some fast).', 'রিকোয়েস্টের সময়কাল ভিন্ন (কিছু ধীর, কিছু দ্রুত)।')],
            [l('Weighted', 'Weighted'), l('Bigger servers get a larger share, set by weight.', 'বড় সার্ভার weight অনুযায়ী বেশি ভাগ পায়।'), l('The pool is a mix of large and small machines.', 'পুলে বড় ও ছোট মেশিন মেশানো।')],
            [l('IP hash', 'IP hash'), l('Hash of the client IP always maps to the same server.', 'ক্লায়েন্ট IP-এর hash সবসময় একই সার্ভারে যায়।'), l('You need a client pinned to one server (sticky sessions).', 'একটি ক্লায়েন্টকে এক সার্ভারে আটকাতে হবে (sticky session)।')],
          ],
        } },
      ],
    },
    {
      h: l('L4 vs L7, and service discovery', 'L4 বনাম L7, ও service discovery'),
      blocks: [
        { p: l('Load balancers work at one of two layers. A Layer 4 (transport) balancer routes by IP and port only — it is fast and protocol-agnostic but cannot see inside the request. A Layer 7 (application) balancer reads the HTTP request, so it can route by URL path, hostname, or headers (for example, send /api to one pool and /images to another) at a small CPU cost.', 'load balancer দুটি স্তরের একটিতে কাজ করে। একটি Layer 4 (transport) balancer শুধু IP ও port দিয়ে রাউট করে—দ্রুত ও protocol-নিরপেক্ষ কিন্তু রিকোয়েস্টের ভেতর দেখতে পারে না। একটি Layer 7 (application) balancer HTTP রিকোয়েস্ট পড়ে, তাই URL path, hostname বা header দিয়ে রাউট করতে পারে (যেমন /api এক পুলে ও /images অন্য পুলে) সামান্য CPU খরচে।') },
        { p: l('Service discovery answers "which instances exist right now?" Older systems used a static list. Modern systems register each instance in a registry (Consul, etcd, or the cloud provider’s own) as it boots and deregister it when it dies, and the load balancer reads that registry so it always targets live, healthy instances.', 'service discovery উত্তর দেয় "এখন কোন ইনস্ট্যান্স আছে?" পুরনো সিস্টেম একটি স্থির তালিকা ব্যবহার করত। আধুনিক সিস্টেম প্রতিটি ইনস্ট্যান্স চালু হওয়ার সময় একটি registry-তে (Consul, etcd বা ক্লাউড প্রোভাইডারের নিজস্ব) নিবন্ধন করে ও মরে গেলে বাতিল করে, আর load balancer সেই registry পড়ে যাতে সবসময় জীবিত, সুস্থ ইনস্ট্যান্সে যায়।') },
      ],
    },
    {
      h: l('When and where to use it, and the trade-offs', 'কোথায় ও কখন ব্যবহার, ও ট্রেড-অফ'),
      blocks: [
        { p: l('Use a load balancer the moment you run more than one server, or the moment a single server’s failure is unacceptable — which is nearly every production system. Pair it with meaningful health checks: a shallow check ("does the port answer?") can keep sending traffic to a server whose database connection is dead. A deep check hits a real endpoint that exercises dependencies.', 'একের বেশি সার্ভার চালানোর মুহূর্তেই, বা একটি সার্ভারের ব্যর্থতা অগ্রহণযোগ্য হওয়ার মুহূর্তেই load balancer নিন—যা প্রায় প্রতিটি প্রোডাকশন সিস্টেম। এর সঙ্গে অর্থপূর্ণ health check জুড়ুন: একটি অগভীর check ("port কি উত্তর দেয়?") এমন সার্ভারেও ট্রাফিক পাঠাতে থাকে যার ডেটাবেস connection মৃত। একটি গভীর check একটি আসল endpoint-এ যায় যা নির্ভরতাগুলো যাচাই করে।') },
        { p: l('The main trade-off is sticky sessions. Pinning a user to one server (via IP hash or a cookie) is convenient when that server holds their session in memory — but it weakens even distribution and hurts failover, because when that server dies the user loses their session. The cleaner fix is to make servers stateless and keep session state in a shared store (like Redis), so any server can handle any request. Also use connection draining: when you remove a server, let it finish in-flight requests before shutting down.', 'প্রধান ট্রেড-অফ হলো sticky session। একজন ব্যবহারকারীকে এক সার্ভারে আটকানো (IP hash বা cookie দিয়ে) সুবিধাজনক যখন সেই সার্ভার তাদের session মেমরিতে রাখে—কিন্তু এটি সমবণ্টন দুর্বল করে ও failover-এ ক্ষতি করে, কারণ সেই সার্ভার মরলে ব্যবহারকারী তাদের session হারায়। পরিষ্কার সমাধান হলো সার্ভারকে stateless করা ও session state একটি শেয়ার্ড store-এ (যেমন Redis) রাখা, যাতে যেকোনো সার্ভার যেকোনো রিকোয়েস্ট সামলাতে পারে। connection draining-ও ব্যবহার করুন: একটি সার্ভার সরানোর সময় বন্ধের আগে চলমান রিকোয়েস্ট শেষ করতে দিন।') },
      ],
    },
    {
      h: l('Common mistakes', 'সাধারণ ভুল'),
      blocks: [
        { list: [
          l('Health checks that are too shallow, so traffic keeps flowing to an instance that is up but broken (dead DB connection, full disk).', 'অতি অগভীর health check, ফলে চালু কিন্তু নষ্ট (মৃত DB connection, ভরা ডিস্ক) ইনস্ট্যান্সেও ট্রাফিক যেতে থাকে।'),
          l('Relying on sticky sessions instead of making servers stateless — one server failure then logs users out.', 'সার্ভার stateless না করে sticky session-এর ওপর নির্ভর করা—একটি সার্ভার ব্যর্থতায় ব্যবহারকারীরা logout হয়ে যায়।'),
          l('Making the load balancer itself a single point of failure. Run it redundantly (an active-passive pair or a managed cloud LB).', 'load balancer-কেই single point of failure বানানো। একে রিডানডেন্টলি চালান (active-passive জোড়া বা একটি managed cloud LB)।'),
          l('Skipping connection draining, so a deploy or scale-down abruptly kills in-flight requests and returns errors.', 'connection draining বাদ দেওয়া, ফলে একটি deploy বা scale-down চলমান রিকোয়েস্ট হঠাৎ মেরে error ফেরায়।'),
        ] },
      ],
    },
    {
      h: l('Remember in one line', 'এক লাইনে মনে রাখুন'),
      blocks: [
        { list: [
          l('A load balancer spreads traffic across many servers so you can scale out and survive any single failure.', 'load balancer অনেক সার্ভারে ট্রাফিক ছড়ায় যাতে আপনি scale out করতে ও যেকোনো একক ব্যর্থতা টিকে থাকতে পারেন।'),
          l('Pick the algorithm for your traffic shape; back it with deep health checks and service discovery.', 'আপনার ট্রাফিক ধরনের জন্য অ্যালগরিদম বাছুন; গভীর health check ও service discovery দিয়ে সমর্থন দিন।'),
          l('Prefer stateless servers with shared session storage over sticky sessions, and always drain connections on removal.', 'sticky session-এর চেয়ে শেয়ার্ড session storage-সহ stateless সার্ভার নিন, আর সরানোর সময় সবসময় connection drain করুন।'),
        ] },
      ],
    },
  ],

  // ── api-protocols · REST, GraphQL, gRPC & WebSockets ───────────────────────
  'api-protocols': [
    {
      h: l('What is an API protocol?', 'API প্রোটোকল কী?'),
      blocks: [
        { p: l('An API protocol is the communication style two programs use to talk over a network — the shape of the request, the shape of the response, and the rules for errors, versioning, and connection lifetime. A browser talking to a server, or one microservice calling another, both need an agreed style, and the four common ones are REST, GraphQL, gRPC, and WebSockets.', 'একটি API প্রোটোকল হলো দুটি প্রোগ্রাম নেটওয়ার্কে কথা বলতে যে যোগাযোগ পদ্ধতি ব্যবহার করে—রিকোয়েস্টের গঠন, রেসপন্সের গঠন, এবং error, versioning ও connection-এর আয়ুর নিয়ম। একটি browser সার্ভারের সঙ্গে, বা একটি microservice আরেকটিকে ডাকা—দুটোরই একটি সম্মত পদ্ধতি দরকার, আর সাধারণ চারটি হলো REST, GraphQL, gRPC ও WebSockets।') },
        { p: l('The problem each solves is the same at heart — move structured data between two systems — but they differ in who initiates, how much control the client has over the response, how efficient the wire format is, and whether the connection is one-shot or long-lived. Picking well means matching the protocol to the interaction, not the fashion.', 'প্রতিটি যে সমস্যা সমাধান করে তা মূলে একই—দুটি সিস্টেমের মধ্যে গঠিত ডেটা সরানো—কিন্তু কে শুরু করে, রেসপন্সের ওপর ক্লায়েন্টের কতটা নিয়ন্ত্রণ, wire format কতটা দক্ষ, ও connection এক-শটের নাকি দীর্ঘস্থায়ী—এতে তারা ভিন্ন। ভালো বাছাই মানে প্রোটোকলকে ইন্টারঅ্যাকশনের সঙ্গে মেলানো, প্রচলনের সঙ্গে নয়।') },
        { note: l('Think of ways to communicate: a letter (REST — a standard envelope, one exchange), a custom order form where you list exactly the fields you want (GraphQL), a fast phone call in a private shorthand (gRPC), and an always-open radio channel where either side can speak anytime (WebSockets).', 'যোগাযোগের উপায় ভাবুন: একটি চিঠি (REST—একটি প্রমিত খাম, একটি বিনিময়), একটি কাস্টম অর্ডার ফর্ম যেখানে আপনি ঠিক যে ফিল্ড চান তা লেখেন (GraphQL), একটি ব্যক্তিগত সংক্ষিপ্ত ভাষায় দ্রুত ফোনকল (gRPC), ও একটি সবসময় খোলা রেডিও চ্যানেল যেখানে যেকোনো পক্ষ যেকোনো সময় বলতে পারে (WebSockets)।'), kind: 'tip' },
      ],
    },
    {
      h: l('How REST works', 'REST কীভাবে কাজ করে'),
      blocks: [
        { p: l('REST (Representational State Transfer) is the default of the web. It models everything as resources addressed by URLs, and uses standard HTTP verbs to act on them: GET to read, POST to create, PUT/PATCH to update, DELETE to remove. It is stateless — every request carries everything the server needs — which makes it easy to cache and scale.', 'REST (Representational State Transfer) হলো ওয়েবের ডিফল্ট। এটি সবকিছুকে URL দিয়ে ঠিকানাকৃত resource হিসেবে মডেল করে ও তাদের ওপর কাজ করতে প্রমিত HTTP verb ব্যবহার করে: পড়তে GET, তৈরিতে POST, আপডেটে PUT/PATCH, মুছতে DELETE। এটি stateless—প্রতিটি রিকোয়েস্ট সার্ভারের দরকারি সব বহন করে—যা cache ও scale সহজ করে।') },
        { steps: [
          l('The client sends an HTTP request to a resource URL with a verb, for example GET /users/42.', 'ক্লায়েন্ট একটি verb-সহ resource URL-এ একটি HTTP রিকোয়েস্ট পাঠায়, যেমন GET /users/42।'),
          l('The server acts and replies with a status code (200 OK, 404 Not Found, 500 error) and a body, usually JSON.', 'সার্ভার কাজ করে ও একটি status code (200 OK, 404 Not Found, 500 error) ও একটি body, সাধারণত JSON, দিয়ে উত্তর দেয়।'),
          l('The response has a fixed shape decided by the server; the client takes what it is given.', 'রেসপন্সের একটি স্থির গঠন সার্ভার ঠিক করে; ক্লায়েন্ট যা দেওয়া হয় তাই নেয়।'),
        ] },
        { p: l('That fixed shape is REST’s main weakness for rich UIs: you often over-fetch (get fields you do not need) or under-fetch (must make several calls to assemble one screen). GraphQL was designed to fix exactly that — the client asks for precisely the fields it wants in a single request.', 'সেই স্থির গঠনই সমৃদ্ধ UI-এর জন্য REST-এর প্রধান দুর্বলতা: আপনি প্রায়ই over-fetch করেন (অপ্রয়োজনীয় ফিল্ড পান) বা under-fetch করেন (একটি স্ক্রিন সাজাতে কয়েকটি call করতে হয়)। GraphQL ঠিক সেটাই ঠিক করতে ডিজাইন করা—ক্লায়েন্ট একটি রিকোয়েস্টে ঠিক যে ফিল্ড চায় তা চায়।') },
        { code: `# REST: three round trips, each returns a fixed shape (some fields unused)
GET /users/42          -> { id, name, email, address, phone, ... }
GET /users/42/orders   -> [ { id, total, status, ... }, ... ]
GET /orders/99/items   -> [ { sku, qty, price, ... }, ... ]

# GraphQL: ONE request asks for exactly the fields the screen needs
POST /graphql
query {
  user(id: 42) {
    name
    orders(last: 3) { total }
  }
}`, caption: l('REST returns whole resources and may need several calls; GraphQL lets the client shape one response. gRPC and WebSockets solve different problems again.', 'REST পুরো resource ফেরায় ও কয়েকটি call লাগতে পারে; GraphQL ক্লায়েন্টকে একটি রেসপন্স গড়তে দেয়। gRPC ও WebSockets আবার ভিন্ন সমস্যা সমাধান করে।') },
      ],
    },
    {
      h: l('The four styles compared', 'চারটি পদ্ধতির তুলনা'),
      blocks: [
        { p: l('gRPC uses a compact binary format (Protocol Buffers) over HTTP/2, which makes it very fast and strongly typed — ideal for internal service-to-service calls, though not natively browser-friendly. WebSockets keep a single connection open for two-way, real-time streaming. Here is how the four line up.', 'gRPC HTTP/2-এর ওপর একটি সংক্ষিপ্ত binary format (Protocol Buffers) ব্যবহার করে, যা একে খুব দ্রুত ও strongly typed করে—internal service-to-service call-এর জন্য আদর্শ, যদিও নেটিভভাবে browser-বান্ধব নয়। WebSockets দুই-মুখী, real-time streaming-এর জন্য একটি connection খোলা রাখে। চারটি কীভাবে সাজে তা নিচে।') },
        { p: l('A key difference hiding in the table is the connection model. REST, GraphQL, and unary gRPC are request/response: the client asks, the server answers, and only the client can start the conversation. WebSockets are different — once the connection is open, the server can push data to the client at any moment without being asked. That is why real-time features (a new chat message arriving, a live score updating) need WebSockets rather than a client that must keep polling "anything new yet?" over and over.', 'table-এ লুকানো একটি মূল পার্থক্য হলো connection মডেল। REST, GraphQL ও unary gRPC হলো request/response: ক্লায়েন্ট জিজ্ঞাসা করে, সার্ভার উত্তর দেয়, আর শুধু ক্লায়েন্ট কথোপকথন শুরু করতে পারে। WebSockets ভিন্ন—connection খোলা হলে সার্ভার যেকোনো মুহূর্তে না চাইতেই ক্লায়েন্টে ডেটা push করতে পারে। এ কারণেই real-time ফিচার (একটি নতুন chat message আসা, একটি লাইভ স্কোর আপডেট) বারবার "নতুন কিছু আছে?" poll করা ক্লায়েন্টের বদলে WebSockets চায়।') },
        { table: {
          head: [l('Protocol', 'প্রোটোকল'), l('Shape', 'গঠন'), l('Format', 'ফরম্যাট'), l('Best for', 'কার জন্য')],
          rows: [
            [l('REST', 'REST'), l('Request/response, resource URLs', 'রিকোয়েস্ট/রেসপন্স, resource URL'), l('JSON (text)', 'JSON (টেক্সট)'), l('Public APIs, CRUD, cacheable reads', 'পাবলিক API, CRUD, cache-যোগ্য read')],
            [l('GraphQL', 'GraphQL'), l('Client-shaped queries, one endpoint', 'ক্লায়েন্ট-গঠিত query, একটি endpoint'), l('JSON (text)', 'JSON (টেক্সট)'), l('Rich UIs with varied, nested data needs', 'বৈচিত্র্যময়, nested ডেটা দরকার এমন সমৃদ্ধ UI')],
            [l('gRPC', 'gRPC'), l('Request/response + streaming, typed', 'রিকোয়েস্ট/রেসপন্স + streaming, typed'), l('Protobuf (binary)', 'Protobuf (binary)'), l('Fast internal microservice calls', 'দ্রুত internal microservice call')],
            [l('WebSockets', 'WebSockets'), l('Persistent, bidirectional stream', 'স্থায়ী, দ্বিমুখী stream'), l('Any (often JSON)', 'যেকোনো (প্রায়ই JSON)'), l('Live chat, notifications, presence, games', 'লাইভ chat, notification, presence, গেম')],
          ],
        } },
      ],
    },
    {
      h: l('When and where to use which', 'কোথায় ও কখন কোনটা'),
      blocks: [
        { list: [
          l('REST — a public API, standard CRUD, or anything where HTTP caching and universal client support matter most.', 'REST—একটি পাবলিক API, প্রমিত CRUD, বা যেখানে HTTP caching ও সর্বজনীন ক্লায়েন্ট সমর্থন সবচেয়ে গুরুত্বপূর্ণ।'),
          l('GraphQL — mobile and web front-ends that need many different, nested slices of data and want to avoid over-/under-fetching.', 'GraphQL—মোবাইল ও web front-end যাদের বহু ভিন্ন, nested ডেটা টুকরো দরকার ও over-/under-fetch এড়াতে চায়।'),
          l('gRPC — high-throughput, low-latency communication between your own backend services, where you control both ends.', 'gRPC—আপনার নিজের backend সেবার মধ্যে high-throughput, low-latency যোগাযোগ, যেখানে দুই প্রান্তই আপনার নিয়ন্ত্রণে।'),
          l('WebSockets — genuine real-time, server-initiated updates: chat, live scores, collaborative editing, multiplayer games.', 'WebSockets—আসল real-time, সার্ভার-শুরু আপডেট: chat, লাইভ স্কোর, collaborative editing, multiplayer গেম।'),
        ] },
        { p: l('The core trade-off is efficiency versus reach. gRPC’s binary Protobuf is compact and fast but not natively usable from a browser and harder to debug by eye; REST’s text JSON is universal and human-readable but heavier on the wire. Whatever you choose, define the contract explicitly — timeouts, error formats, pagination, and how you will evolve it without breaking existing clients (versioning).', 'মূল ট্রেড-অফ হলো দক্ষতা বনাম নাগাল। gRPC-এর binary Protobuf সংক্ষিপ্ত ও দ্রুত কিন্তু browser থেকে নেটিভভাবে ব্যবহারযোগ্য নয় ও চোখে debug করা কঠিন; REST-এর text JSON সর্বজনীন ও মানুষ-পাঠযোগ্য কিন্তু wire-এ ভারী। যাই বাছুন, contract স্পষ্ট করুন—timeout, error format, pagination, ও বিদ্যমান ক্লায়েন্ট না ভেঙে কীভাবে একে বিকশিত করবেন (versioning)।') },
      ],
    },
    {
      h: l('Common mistakes', 'সাধারণ ভুল'),
      blocks: [
        { list: [
          l('Choosing WebSockets for data that changes only a few times a day — you pay for a persistent connection when a simple poll or a REST call would do.', 'দিনে কয়েকবার বদলানো ডেটার জন্য WebSockets বাছা—একটি সরল poll বা REST call যথেষ্ট হলে আপনি একটি স্থায়ী connection-এর খরচ দেন।'),
          l('Misusing HTTP verbs, like GET that changes data or POST that only reads — breaking caching, safety, and idempotency expectations.', 'HTTP verb-এর অপব্যবহার, যেমন ডেটা বদলানো GET বা শুধু পড়া POST—caching, safety ও idempotency প্রত্যাশা ভাঙা।'),
          l('Exposing gRPC directly to browsers instead of putting a gateway (REST/JSON or gRPC-Web) in front.', 'একটি gateway (REST/JSON বা gRPC-Web) সামনে না রেখে gRPC সরাসরি browser-এ উন্মুক্ত করা।'),
          l('Shipping an API with no versioning plan, then breaking every client the day you add a field or rename one.', 'কোনো versioning পরিকল্পনা ছাড়া API ছাড়া, তারপর একটি ফিল্ড যোগ বা নাম বদলানোর দিন প্রতিটি ক্লায়েন্ট ভাঙা।'),
        ] },
      ],
    },
    {
      h: l('Remember in one line', 'এক লাইনে মনে রাখুন'),
      blocks: [
        { list: [
          l('REST for public CRUD and caching; GraphQL for client-shaped, nested data; gRPC for fast internal calls; WebSockets for real-time two-way streams.', 'পাবলিক CRUD ও caching-এ REST; ক্লায়েন্ট-গঠিত, nested ডেটায় GraphQL; দ্রুত internal call-এ gRPC; real-time দ্বিমুখী stream-এ WebSockets।'),
          l('Match the protocol to the interaction shape, not to what is trendy.', 'প্রোটোকলকে ইন্টারঅ্যাকশনের গঠনের সঙ্গে মেলান, ট্রেন্ডের সঙ্গে নয়।'),
          l('Binary (gRPC) buys speed but loses browser reach; always define contracts, errors, and a versioning plan up front.', 'binary (gRPC) গতি দেয় কিন্তু browser নাগাল হারায়; সবসময় আগেভাগে contract, error ও versioning পরিকল্পনা ঠিক করুন।'),
        ] },
      ],
    },
  ],

  // ── caching · Caching strategies ──────────────────────────────────────────
  caching: [
    {
      h: l('What is caching?', 'ক্যাশিং কী?'),
      blocks: [
        { p: l('A cache is a small, fast layer that stores the results of expensive work so you can reuse them instead of redoing them. Reading from a database on disk might take 10 milliseconds; reading the same value from an in-memory cache like Redis takes well under a millisecond. When the same data is requested again and again, caching turns repeated slow work into repeated fast lookups.', 'একটি cache হলো একটি ছোট, দ্রুত স্তর যা ব্যয়বহুল কাজের ফল জমিয়ে রাখে যাতে আবার না করে পুনঃব্যবহার করা যায়। ডিস্কের ডেটাবেস থেকে পড়তে ১০ মিলিসেকেন্ড লাগতে পারে; Redis-এর মতো in-memory cache থেকে একই মান পড়তে এক মিলিসেকেন্ডেরও অনেক কম। একই ডেটা বারবার চাওয়া হলে caching পুনরাবৃত্ত ধীর কাজকে পুনরাবৃত্ত দ্রুত লুকআপে পরিণত করে।') },
        { p: l('Caching does two things for a system: it cuts latency (users get answers faster) and it cuts load (the database and services do far less work, so they scale further and cost less). The catch is that a cached copy can become stale — the real data changes but the cache still holds the old value — which is why caching is really a discipline of deciding what to store, for how long, and how to invalidate it.', 'caching একটি সিস্টেমের জন্য দুটি কাজ করে: latency কমায় (ব্যবহারকারী দ্রুত উত্তর পায়) ও load কমায় (ডেটাবেস ও সেবা অনেক কম কাজ করে, তাই বেশি scale করে ও কম খরচ হয়)। ধরা হলো একটি cached কপি stale হতে পারে—আসল ডেটা বদলায় কিন্তু cache এখনো পুরনো মান রাখে—এ কারণেই caching আসলে কী জমাবেন, কতক্ষণ ও কীভাবে invalidate করবেন তা ঠিক করার একটি শৃঙ্খলা।') },
        { note: l('Caching is like keeping the ingredients you use every day on the kitchen counter instead of walking to the pantry each time. Fast — as long as what is on the counter still matches what is in the pantry.', 'caching হলো প্রতিদিন ব্যবহার করা উপকরণ প্রতিবার প্যান্ট্রিতে না গিয়ে রান্নাঘরের কাউন্টারে রাখার মতো। দ্রুত—যতক্ষণ কাউন্টারের জিনিস প্যান্ট্রির সঙ্গে মেলে।'), kind: 'tip' },
      ],
    },
    {
      h: l('How cache-aside reads work', 'cache-aside read কীভাবে কাজ করে'),
      blocks: [
        { p: l('The most common pattern is cache-aside (also called lazy loading): the application checks the cache first and only touches the database on a miss. The cache fills itself on demand, so only data that is actually requested ever gets cached.', 'সবচেয়ে সাধারণ প্যাটার্ন হলো cache-aside (lazy loading-ও বলা হয়): অ্যাপ্লিকেশন আগে cache দেখে ও শুধু miss-এ ডেটাবেস স্পর্শ করে। cache নিজেকে চাহিদামতো ভরায়, তাই শুধু যে ডেটা আসলে চাওয়া হয় তাই cache হয়।') },
        { steps: [
          l('Look in the cache for the key. If present (a cache hit), return it — done in microseconds.', 'key-এর জন্য cache দেখুন। থাকলে (cache hit) তা ফেরত দিন—মাইক্রোসেকেন্ডে শেষ।'),
          l('If absent (a cache miss), read from the database — the slower path.', 'না থাকলে (cache miss) ডেটাবেস থেকে পড়ুন—ধীর পথ।'),
          l('Store that value in the cache with a TTL, so the next request for it is a hit.', 'সেই মান একটি TTL-সহ cache-এ জমান, যাতে এর পরের রিকোয়েস্ট একটি hit হয়।'),
          l('Return the value to the caller.', 'কলারকে মান ফেরত দিন।'),
        ] },
        { code: `function getUser(id):
    key = "user:" + id
    user = cache.get(key)                 # 1. look in the fast layer first
    if user is not None:
        return user                       #    cache HIT -> microseconds

    user = db.query(                       # 2. cache MISS -> slower read
        "SELECT * FROM users WHERE id = ?", id)
    cache.set(key, user, ttl=300)          # 3. store it for the next 5 minutes
    return user                            # 4. hand it back`, caption: l('Cache-aside keeps the app in control: it decides what to cache and when. On a write, you also update or delete the key so the next read does not serve a stale value.', 'cache-aside অ্যাপকে নিয়ন্ত্রণে রাখে: কী ও কখন cache হবে তা এটি ঠিক করে। একটি write-এ আপনি key-ও আপডেট বা delete করেন যাতে পরের read পুরনো মান না দেয়।') },
      ],
    },
    {
      h: l('Caching strategies compared', 'ক্যাশিং কৌশলের তুলনা'),
      blocks: [
        { p: l('Reads are usually cache-aside. The interesting choices are about writes — where the write goes and when, which trades freshness against speed and durability.', 'read সাধারণত cache-aside। মজার পছন্দগুলো write নিয়ে—write কোথায় ও কখন যায়, যা ফ্রেশনেসকে গতি ও durability-র বিপরীতে বিনিময় করে।') },
        { table: {
          head: [l('Strategy', 'কৌশল'), l('How writes work', 'write কীভাবে কাজ করে'), l('Trade-off', 'ট্রেড-অফ')],
          rows: [
            [l('Cache-aside', 'Cache-aside'), l('App reads via cache; on write it updates the DB and invalidates the key.', 'অ্যাপ cache দিয়ে পড়ে; write-এ DB আপডেট করে ও key invalidate করে।'), l('Simple and resilient, but the first read after a miss is slow.', 'সরল ও সহনশীল, তবে miss-এর পর প্রথম read ধীর।')],
            [l('Write-through', 'Write-through'), l('Every write goes to the cache and the DB together, synchronously.', 'প্রতিটি write একসঙ্গে, synchronously cache ও DB-তে যায়।'), l('Cache is always fresh, but writes are a bit slower.', 'cache সবসময় টাটকা, তবে write একটু ধীর।')],
            [l('Write-back', 'Write-back'), l('Write hits the cache and returns; the DB is updated later, async.', 'write cache-এ লাগে ও ফেরে; DB পরে, async আপডেট হয়।'), l('Very fast writes, but risk data loss if the cache dies first.', 'খুব দ্রুত write, তবে cache আগে মরলে ডেটা হারানোর ঝুঁকি।')],
            [l('Write-around', 'Write-around'), l('Writes go straight to the DB, skipping the cache.', 'write সরাসরি DB-তে যায়, cache এড়িয়ে।'), l('Avoids caching write-once data, but recent writes miss the cache.', 'একবার-লেখা ডেটা cache এড়ায়, তবে সাম্প্রতিক write cache miss করে।')],
          ],
        } },
      ],
    },
    {
      h: l('Eviction, TTLs, and invalidation', 'Eviction, TTL ও invalidation'),
      blocks: [
        { p: l('A cache is small on purpose, so it must decide what to throw out when full. The common eviction policy is LRU (Least Recently Used): drop whatever has not been touched in the longest time. LFU (Least Frequently Used) drops the rarely-hit keys instead. A TTL (time-to-live) is the other lever: it expires each entry after a set time so the cache re-reads fresh data periodically, bounding how stale any value can get.', 'একটি cache ইচ্ছাকৃতভাবে ছোট, তাই ভরে গেলে কী ফেলবে তা ঠিক করতে হয়। সাধারণ eviction policy হলো LRU (Least Recently Used): সবচেয়ে বেশি সময় ধরে অস্পর্শিত যা তা ফেলে দিন। LFU (Least Frequently Used) বরং কম-hit key ফেলে। TTL (time-to-live) অন্য লিভার: এটি প্রতিটি entry নির্দিষ্ট সময় পর expire করে যাতে cache পর্যায়ক্রমে টাটকা ডেটা আবার পড়ে, কোনো মান কতটা stale হতে পারে তা সীমিত করে।') },
        { p: l('Invalidation is the genuinely hard part. When the underlying data changes, the cached copy must be updated or deleted, or users see stale results. Two honest options: expire by TTL and accept a small staleness window, or actively delete the key on every write. The right balance depends on how much staleness your feature can tolerate — a stock price needs seconds, a user’s profile photo can be minutes.', 'invalidation সত্যিই কঠিন অংশ। মূল ডেটা বদলালে cached কপি আপডেট বা delete করতে হয়, নইলে ব্যবহারকারী পুরনো ফল দেখে। দুটি সৎ উপায়: TTL দিয়ে expire করে ছোট একটি staleness সময় মেনে নিন, অথবা প্রতিটি write-এ সক্রিয়ভাবে key delete করুন। সঠিক ভারসাম্য নির্ভর করে আপনার ফিচার কতটা staleness সহ্য করতে পারে—একটি stock price-এর সেকেন্ড দরকার, একজন ব্যবহারকারীর profile photo মিনিট হতে পারে।') },
      ],
    },
    {
      h: l('When and where to cache', 'কোথায় ও কখন cache করবেন'),
      blocks: [
        { p: l('Cache when reads greatly outnumber writes and the same data is requested repeatedly — hot database rows, rendered pages, API responses, session data, and computed results. The higher the read-to-write ratio and the more expensive the work, the bigger the win. Caching layers stack: the browser, a CDN, a reverse proxy, an application cache (Redis/Memcached), and the database’s own buffer cache each catch requests before the one below.', 'যখন read, write-এর চেয়ে অনেক বেশি ও একই ডেটা বারবার চাওয়া হয় তখন cache করুন—হট ডেটাবেস row, রেন্ডার করা পেজ, API রেসপন্স, session ডেটা ও গণনা করা ফল। read-to-write অনুপাত যত বেশি ও কাজ যত ব্যয়বহুল, লাভ তত বড়। caching স্তর সাজানো থাকে: browser, একটি CDN, একটি reverse proxy, একটি application cache (Redis/Memcached) ও ডেটাবেসের নিজস্ব buffer cache—প্রতিটি নিচেরটির আগে রিকোয়েস্ট ধরে।') },
        { p: l('Avoid caching write-heavy data that changes on nearly every request, and never cache per-user private data in a shared cache without a user-specific key — you risk serving one person’s data to another. The trade-off is always the same: caching buys latency and load reduction at the price of invalidation and consistency work.', 'প্রায় প্রতিটি রিকোয়েস্টে বদলানো write-ভারী ডেটা cache করবেন না, আর একটি শেয়ার্ড cache-এ প্রতি-ব্যবহারকারী প্রাইভেট ডেটা user-নির্দিষ্ট key ছাড়া কখনো cache করবেন না—এক ব্যক্তির ডেটা অন্যকে দেওয়ার ঝুঁকি। ট্রেড-অফ সবসময় একই: caching latency ও load কমানো কেনে invalidation ও consistency-র কাজের বিনিময়ে।') },
      ],
    },
    {
      h: l('Common mistakes', 'সাধারণ ভুল'),
      blocks: [
        { list: [
          l('The cache stampede: many keys expire at once, and every request misses and hammers the same expensive query together. Fix it with jittered TTLs, a lock so only one request rebuilds, or serving stale while refreshing.', 'cache stampede: অনেক key একসঙ্গে expire করে, ও প্রতিটি রিকোয়েস্ট miss করে একই ব্যয়বহুল query-তে একসঙ্গে আঘাত করে। jitter-যুক্ত TTL, একটি lock যাতে শুধু একটি রিকোয়েস্ট পুনর্গঠন করে, বা refresh করার সময় stale পরিবেশন করে ঠিক করুন।'),
          l('Caching without a TTL or an invalidation plan, so stale data lingers indefinitely and no one knows why.', 'TTL বা invalidation পরিকল্পনা ছাড়া cache করা, ফলে পুরনো ডেটা অনির্দিষ্টকাল থেকে যায় ও কেউ জানে না কেন।'),
          l('Caching private, per-user data in a shared cache under a non-user-specific key, leaking data between users.', 'শেয়ার্ড cache-এ প্রাইভেট, প্রতি-ব্যবহারকারী ডেটা user-নির্দিষ্ট নয় এমন key-তে cache করা, ব্যবহারকারীদের মধ্যে ডেটা ফাঁস করা।'),
          l('Treating the cache as a source of truth. It is a copy; if it disappears, the system must still work by reading the database.', 'cache-কে সত্যের উৎস ভাবা। এটি একটি কপি; উধাও হলে সিস্টেমকে ডেটাবেস পড়ে চলতেই হবে।'),
        ] },
      ],
    },
    {
      h: l('Remember in one line', 'এক লাইনে মনে রাখুন'),
      blocks: [
        { list: [
          l('A cache serves reusable data from a faster layer to cut latency and load — best when reads far outnumber writes.', 'cache একটি দ্রুত স্তর থেকে পুনঃব্যবহারযোগ্য ডেটা দিয়ে latency ও load কমায়—যখন read, write-এর চেয়ে অনেক বেশি তখন সেরা।'),
          l('Choose the write strategy (cache-aside, write-through, write-back, write-around) from your freshness and write needs.', 'আপনার ফ্রেশনেস ও write প্রয়োজন থেকে write কৌশল (cache-aside, write-through, write-back, write-around) বাছুন।'),
          l('The hard part is invalidation: use TTLs, plan for stampedes, and never share private data under a common key.', 'কঠিন অংশ invalidation: TTL ব্যবহার করুন, stampede-এর জন্য পরিকল্পনা করুন, ও সাধারণ key-তে প্রাইভেট ডেটা কখনো শেয়ার করবেন না।'),
        ] },
      ],
    },
  ],

  // ── sql-nosql · SQL versus NoSQL ──────────────────────────────────────────
  'sql-nosql': [
    {
      h: l('What are SQL and NoSQL?', 'SQL ও NoSQL কী?'),
      blocks: [
        { p: l('SQL databases (also called relational databases — PostgreSQL, MySQL, SQL Server) store data in tables of rows and columns with a fixed schema, and relationships between tables are enforced by the database itself. NoSQL is an umbrella term for everything else: databases that trade the strict relational model for flexibility or scale, storing data as documents, key-value pairs, wide columns, or graphs.', 'SQL ডেটাবেস (relational database-ও বলা হয়—PostgreSQL, MySQL, SQL Server) ডেটাকে একটি স্থির schema-সহ row ও column-এর table-এ রাখে, আর table-এর মধ্যে সম্পর্ক ডেটাবেস নিজেই প্রয়োগ করে। NoSQL হলো বাকি সবকিছুর ছাতা-শব্দ: যেসব ডেটাবেস কঠোর relational মডেলকে নমনীয়তা বা scale-এর বিনিময়ে ছাড়ে, ডেটাকে document, key-value জোড়া, wide column বা graph হিসেবে রাখে।') },
        { p: l('The real question is never "which is better" but "which fits my data and my queries." The choice should fall out of your access patterns — how you read and write — your need for relationships and transactions, and your scale. Picking by fashion (or by what you used last time) is how teams end up fighting their database.', 'আসল প্রশ্ন কখনো "কোনটা ভালো" নয়, বরং "কোনটা আমার ডেটা ও query-তে খাপ খায়।" পছন্দ আপনার access pattern থেকে বেরিয়ে আসা উচিত—আপনি কীভাবে read ও write করেন—সম্পর্ক ও transaction-এর প্রয়োজন, এবং আপনার scale থেকে। প্রচলন দিয়ে (বা গতবার যা ব্যবহার করেছেন তা দিয়ে) বাছাই করাই দল যেভাবে তাদের ডেটাবেসের সঙ্গে লড়ে।') },
        { note: l('Choosing storage is like choosing a filing system by what you retrieve, not by the cabinet’s color. If you constantly cross-reference records, you want a system built for relationships; if you fetch one self-contained document at a time, you want one built for that.', 'স্টোরেজ বাছা হলো ক্যাবিনেটের রং নয়, কী খুঁজবেন তার ভিত্তিতে ফাইলিং সিস্টেম বাছার মতো। বারবার record cross-reference করলে সম্পর্কের জন্য তৈরি সিস্টেম চান; একবারে একটি স্বয়ংসম্পূর্ণ document আনলে সেটির জন্য তৈরিটি চান।'), kind: 'tip' },
      ],
    },
    {
      h: l('How SQL models data', 'SQL কীভাবে ডেটা মডেল করে'),
      blocks: [
        { p: l('SQL splits data into normalized tables, each holding one kind of entity, and links them with keys. The database enforces the schema and the relationships, and it guarantees ACID transactions — a group of changes either all commit or all roll back, so you never see half-finished state. That is why banks and orders live in SQL.', 'SQL ডেটাকে normalized table-এ ভাগ করে, প্রতিটি এক ধরনের entity রাখে, ও key দিয়ে যুক্ত করে। ডেটাবেস schema ও সম্পর্ক প্রয়োগ করে, এবং ACID transaction নিশ্চিত করে—একগুচ্ছ পরিবর্তন হয় সব commit হয় নয় সব roll back, তাই আপনি কখনো অর্ধ-সমাপ্ত অবস্থা দেখেন না। এ কারণেই ব্যাংক ও order SQL-এ থাকে।') },
        { code: `-- SQL: a fixed schema, with a relationship the database enforces
CREATE TABLE users (
  id     BIGINT PRIMARY KEY,
  email  TEXT UNIQUE NOT NULL
);
CREATE TABLE orders (
  id       BIGINT PRIMARY KEY,
  user_id  BIGINT REFERENCES users(id),   -- foreign key: every order has a real user
  total    NUMERIC NOT NULL
);

-- One query JOINs both tables and sums spend per user
SELECT u.email, SUM(o.total) AS spent
FROM users u
JOIN orders o ON o.user_id = u.id
GROUP BY u.email;`, caption: l('The JOIN and the foreign key are the point of SQL: relationships and ad-hoc queries are the database’s job, not yours. A document database would make you assemble this in application code.', 'JOIN ও foreign key-ই SQL-এর মূল কথা: সম্পর্ক ও ad-hoc query ডেটাবেসের কাজ, আপনার নয়। একটি document ডেটাবেস আপনাকে এটি application কোডে জোড়া লাগাতে বাধ্য করত।') },
        { p: l('The strengths are strong consistency, powerful ad-hoc queries via JOINs, and integrity guaranteed by the schema. The classic limit is scale: a single relational server has a ceiling, and while you can scale reads with replicas, scaling writes (sharding) is harder because JOINs and transactions across shards are expensive.', 'শক্তি হলো শক্ত consistency, JOIN দিয়ে শক্তিশালী ad-hoc query, ও schema দিয়ে নিশ্চিত integrity। ক্লাসিক সীমা হলো scale: একটি relational সার্ভারের একটি সীমা আছে, আর replica দিয়ে read scale করলেও write scale (sharding) কঠিন কারণ shard জুড়ে JOIN ও transaction ব্যয়বহুল।') },
      ],
    },
    {
      h: l('The NoSQL families', 'NoSQL পরিবার'),
      blocks: [
        { p: l('"NoSQL" is not one thing — it is four broad families, each shaped for a different access pattern.', '"NoSQL" একটি জিনিস নয়—এটি চারটি বিস্তৃত পরিবার, প্রতিটি ভিন্ন access pattern-এর জন্য গঠিত।') },
        { list: [
          l('Document (MongoDB, DynamoDB) — stores self-contained JSON-like documents. Great when each record is read and written whole, with a flexible shape.', 'Document (MongoDB, DynamoDB)—স্বয়ংসম্পূর্ণ JSON-এর মতো document রাখে। প্রতিটি record পুরোটা read ও write হলে, নমনীয় গঠনে দারুণ।'),
          l('Key-value (Redis, DynamoDB) — a giant dictionary: one key maps to one value. Extremely fast lookups; ideal for caches, sessions, and counters.', 'Key-value (Redis, DynamoDB)—একটি বিশাল dictionary: একটি key একটি value-তে যায়। অত্যন্ত দ্রুত লুকআপ; cache, session ও counter-এর জন্য আদর্শ।'),
          l('Wide-column (Cassandra, HBase) — rows with flexible columns, built to spread across many machines for huge write volumes.', 'Wide-column (Cassandra, HBase)—নমনীয় column-সহ row, বিশাল write আয়তনের জন্য বহু মেশিনে ছড়াতে তৈরি।'),
          l('Graph (Neo4j) — stores nodes and relationships directly; best when the connections between data are the main thing you query.', 'Graph (Neo4j)—node ও সম্পর্ক সরাসরি রাখে; ডেটার মধ্যের সংযোগই যখন প্রধান query তখন সেরা।'),
        ] },
        { p: l('Many NoSQL databases scale horizontally with ease and let each record have a different shape, but they usually give you weaker consistency (BASE, "eventually consistent") and push guarantees like uniqueness or multi-record transactions into your application code.', 'অনেক NoSQL ডেটাবেস সহজে horizontally scale করে ও প্রতিটি record ভিন্ন গঠনের হতে দেয়, তবে সাধারণত দুর্বল consistency দেয় (BASE, "eventually consistent") ও uniqueness বা multi-record transaction-এর মতো গ্যারান্টি আপনার application কোডে ঠেলে দেয়।') },
      ],
    },
    {
      h: l('SQL vs NoSQL at a glance', 'SQL বনাম NoSQL এক নজরে'),
      blocks: [
        { table: {
          head: [l('Aspect', 'দিক'), l('SQL (relational)', 'SQL (relational)'), l('NoSQL', 'NoSQL')],
          rows: [
            [l('Schema', 'Schema'), l('Fixed, enforced up front', 'স্থির, আগেভাগে প্রয়োগ করা'), l('Flexible, per-record', 'নমনীয়, প্রতি-record')],
            [l('Relationships', 'সম্পর্ক'), l('JOINs, foreign keys in the DB', 'DB-তে JOIN, foreign key'), l('Usually handled in app code', 'সাধারণত app কোডে সামলানো')],
            [l('Transactions', 'Transaction'), l('Strong ACID across rows/tables', 'row/table জুড়ে শক্ত ACID'), l('Limited; often single-record', 'সীমিত; প্রায়ই single-record')],
            [l('Scaling', 'Scaling'), l('Reads scale easily; writes harder (shard)', 'read সহজে scale; write কঠিন (shard)'), l('Horizontal scaling is a core strength', 'horizontal scaling একটি মূল শক্তি')],
            [l('Best for', 'কার জন্য'), l('Relationships, integrity, ad-hoc queries', 'সম্পর্ক, integrity, ad-hoc query'), l('Huge scale, flexible or simple-access data', 'বিশাল scale, নমনীয় বা সরল-access ডেটা')],
          ],
        } },
      ],
    },
    {
      h: l('When and where to use which', 'কোথায় ও কখন কোনটা'),
      blocks: [
        { p: l('Reach for SQL when your data is relational and correctness matters: payments, orders, inventory, bookings, anything with money or multi-step transactions, and any app where you will run varied, unpredictable queries. The schema and ACID guarantees do real work for you, and a single Postgres instance comfortably serves most applications for years.', 'যখন আপনার ডেটা relational ও সঠিকতা গুরুত্বপূর্ণ তখন SQL নিন: payment, order, inventory, booking, টাকা বা multi-step transaction-যুক্ত যেকোনো কিছু, এবং যে অ্যাপে আপনি বৈচিত্র্যময়, অননুমেয় query চালাবেন। schema ও ACID গ্যারান্টি আপনার জন্য আসল কাজ করে, আর একটি Postgres instance বেশিরভাগ অ্যাপ্লিকেশন বছরের পর বছর স্বচ্ছন্দে চালায়।') },
        { p: l('Reach for NoSQL when a specific pattern demands it: massive write throughput that outgrows one server (wide-column), a simple key-to-value access with a flexible or evolving shape (document/key-value), or heavily connected data (graph). The trade-off is that flexible schemas move guarantees you used to get for free — uniqueness, referential integrity, cross-record atomicity — into your own application logic. In practice, large systems often use both: SQL for the core transactional data and NoSQL for caching, sessions, feeds, or analytics.', 'যখন একটি নির্দিষ্ট pattern দাবি করে তখন NoSQL নিন: একটি সার্ভার ছাড়িয়ে যাওয়া বিশাল write throughput (wide-column), নমনীয় বা বিবর্তনশীল গঠনে একটি সরল key-to-value access (document/key-value), বা প্রচুর সংযুক্ত ডেটা (graph)। ট্রেড-অফ হলো নমনীয় schema আগে বিনামূল্যে পাওয়া গ্যারান্টি—uniqueness, referential integrity, cross-record atomicity—আপনার নিজের application লজিকে সরিয়ে দেয়। বাস্তবে বড় সিস্টেম প্রায়ই দুটোই ব্যবহার করে: মূল transactional ডেটায় SQL ও caching, session, feed বা analytics-এ NoSQL।') },
      ],
    },
    {
      h: l('Common mistakes', 'সাধারণ ভুল'),
      blocks: [
        { list: [
          l('Treating "NoSQL" as a synonym for "automatically scalable." NoSQL scales when your access pattern matches its model; a bad data model scales badly in any database.', '"NoSQL"-কে "স্বয়ংক্রিয়ভাবে scalable"-এর সমার্থক ধরা। access pattern তার মডেলের সঙ্গে মিললে NoSQL scale করে; খারাপ ডেটা মডেল যেকোনো ডেটাবেসে খারাপ scale করে।'),
          l('Choosing the database before writing the dominant queries. Design the queries and consistency rules first, then pick the store that serves them.', 'প্রধান query লেখার আগে ডেটাবেস বাছা। আগে query ও consistency নিয়ম ডিজাইন করুন, তারপর যে store সেগুলো সেবা দেয় তা বাছুন।'),
          l('Forcing relational, transactional data into a document store, then rebuilding JOINs and integrity by hand in application code.', 'relational, transactional ডেটাকে একটি document store-এ জোর করা, তারপর JOIN ও integrity হাতে application কোডে আবার বানানো।'),
          l('Reaching for a huge distributed NoSQL cluster at small scale, when one well-indexed SQL database would be simpler and faster.', 'ছোট scale-এ একটি বিশাল distributed NoSQL cluster নেওয়া, যখন একটি ভালো-indexed SQL ডেটাবেস সরল ও দ্রুত হতো।'),
        ] },
      ],
    },
    {
      h: l('Remember in one line', 'এক লাইনে মনে রাখুন'),
      blocks: [
        { list: [
          l('SQL = fixed schema, relationships, and ACID; NoSQL = flexible shape and horizontal scale, with guarantees pushed into your app.', 'SQL = স্থির schema, সম্পর্ক ও ACID; NoSQL = নমনীয় গঠন ও horizontal scale, গ্যারান্টি আপনার অ্যাপে ঠেলে দেওয়া।'),
          l('Pick from access patterns, relationships, transactions, and scale — never from fashion.', 'access pattern, সম্পর্ক, transaction ও scale থেকে বাছুন—কখনো প্রচলন থেকে নয়।'),
          l('Write your dominant queries first; large systems often use both SQL and NoSQL together.', 'আগে আপনার প্রধান query লিখুন; বড় সিস্টেম প্রায়ই SQL ও NoSQL একসঙ্গে ব্যবহার করে।'),
        ] },
      ],
    },
  ],
}
