// Deep, bilingual (English / Bangla) teaching guides for the Networking course —
// Security & operations, plus infrastructure security (part f), keyed by topic id.
// Shape mirrors app/course-guides.js: each guide is an array of sections { h, blocks },
// rendered by GuideBlock in app/LearningApp.js. Facts (definitions, analogies,
// trade-offs, reference tables) are drawn from app/courses/networking.js.

const l = (en, bn) => ({ en, bn })

export default {
  // ── cn-firewall · Firewalls & security groups ─────────────────────────────
  'cn-firewall': [
    {
      h: l('What is a firewall?', 'ফায়ারওয়াল কী?'),
      blocks: [
        { p: l('A firewall is a security device or piece of software that sits at a network boundary and decides which traffic may pass and which is blocked. It inspects every packet and matches it against a list of rules based on the source and destination IP address, the port number, the protocol (TCP, UDP, ICMP), and the direction of travel (inbound or outbound). If a packet matches an "allow" rule it is let through; otherwise it is dropped.', 'ফায়ারওয়াল হলো একটি নিরাপত্তা ডিভাইস বা সফটওয়্যার যা একটি নেটওয়ার্ক সীমানায় বসে এবং ঠিক করে কোন ট্রাফিক যেতে পারবে ও কোনটি ব্লক হবে। এটি প্রতিটি প্যাকেট পরীক্ষা করে এবং সোর্স ও গন্তব্য IP ঠিকানা, পোর্ট নম্বর, প্রোটোকল (TCP, UDP, ICMP) ও চলার দিক (inbound নাকি outbound) অনুযায়ী নিয়মের তালিকার সঙ্গে মেলায়। কোনো প্যাকেট "allow" নিয়মে মিললে তা যেতে দেয়; নইলে ফেলে দেয়।') },
        { p: l('The problem a firewall solves is exposure. Every open port on a server is a door an attacker can knock on. Without a firewall, any machine on the internet can try to reach any service you happen to be running — a database on port 5432, a forgotten admin panel, a half-finished API — whether or not you meant to expose it. Attackers constantly scan the whole internet looking for exactly these open doors. A firewall lets you keep every door shut by default and open only the few you truly need, shrinking the attack surface to the smallest possible size.', 'ফায়ারওয়াল যে সমস্যা সমাধান করে তা হলো exposure। একটি সার্ভারে প্রতিটি খোলা পোর্ট এমন একটি দরজা যেখানে আক্রমণকারী কড়া নাড়তে পারে। ফায়ারওয়াল ছাড়া ইন্টারনেটের যেকোনো মেশিন আপনার চালানো যেকোনো সার্ভিসে পৌঁছাতে চেষ্টা করতে পারে—পোর্ট 5432-এর একটি ডেটাবেস, ভুলে-যাওয়া admin panel, আধা-শেষ একটি API—আপনি প্রকাশ করতে চেয়েছেন কি না তা নির্বিশেষে। আক্রমণকারীরা এই খোলা দরজাগুলো খুঁজতে সারা ইন্টারনেট অবিরাম scan করে। ফায়ারওয়াল আপনাকে প্রতিটি দরজা ডিফল্টভাবে বন্ধ রাখতে ও শুধু সত্যিই দরকারি কয়েকটি খুলতে দেয়, যা attack surface সবচেয়ে ছোট করে।') },
        { note: l('Think of a firewall as the security desk in a building lobby. Everyone who wants in is checked against a guest list before the door opens — the right name and appointment gets through, everyone else is turned away. The building can be full of valuable offices, but the front desk decides who reaches them.', 'ফায়ারওয়ালকে একটি ভবনের লবির নিরাপত্তা ডেস্ক ভাবুন। ভেতরে ঢুকতে চাওয়া প্রত্যেককে দরজা খোলার আগে একটি অতিথি-তালিকার সঙ্গে মেলানো হয়—সঠিক নাম ও অ্যাপয়েন্টমেন্ট থাকলে ঢোকে, বাকি সবাইকে ফিরিয়ে দেওয়া হয়। ভবনে মূল্যবান অনেক অফিস থাকতে পারে, কিন্তু ফ্রন্ট ডেস্কই ঠিক করে কে সেগুলোতে পৌঁছাবে।'), kind: 'tip' },
      ],
    },
    {
      h: l('How a firewall decides', 'ফায়ারওয়াল কীভাবে সিদ্ধান্ত নেয়'),
      blocks: [
        { p: l('A firewall is really an ordered list of rules plus one default policy at the end. Understanding the order is the whole game, because the first matching rule wins.', 'ফায়ারওয়াল আসলে একটি ক্রমসাজানো নিয়মের তালিকা এবং শেষে একটি ডিফল্ট policy। ক্রম বোঝাই পুরো খেলা, কারণ প্রথম যে নিয়ম মেলে সেটিই জেতে।') },
        { steps: [
          l('A packet arrives carrying its source IP, destination IP, destination port, and protocol.', 'একটি প্যাকেট আসে, সঙ্গে থাকে তার সোর্স IP, গন্তব্য IP, গন্তব্য পোর্ট ও প্রোটোকল।'),
          l('The firewall walks its rule list from top to bottom, comparing the packet against each rule’s conditions.', 'ফায়ারওয়াল তার নিয়ম-তালিকা ওপর থেকে নিচে ধরে হাঁটে, প্রতিটি নিয়মের শর্তের সঙ্গে প্যাকেটকে মেলায়।'),
          l('The first rule that matches decides the packet’s fate — accept or drop — and no later rules are even checked.', 'যে নিয়ম প্রথম মেলে সেটিই প্যাকেটের ভাগ্য ঠিক করে—accept নাকি drop—আর পরের নিয়মগুলো আর দেখাই হয় না।'),
          l('A stateful firewall also remembers connections it already approved, so the return traffic of an allowed request is let back in automatically.', 'একটি stateful ফায়ারওয়াল আগে অনুমোদিত সংযোগগুলোও মনে রাখে, তাই একটি অনুমোদিত রিকোয়েস্টের ফিরতি ট্রাফিক স্বয়ংক্রিয়ভাবে ঢুকতে দেওয়া হয়।'),
          l('If no rule matches, the default policy decides — and a secure firewall defaults to deny.', 'কোনো নিয়ম না মিললে ডিফল্ট policy সিদ্ধান্ত নেয়—আর একটি নিরাপদ ফায়ারওয়ালের ডিফল্ট হলো deny।'),
        ] },
        { code: `# Start from a default-deny posture for anything coming in
sudo ufw default deny incoming
sudo ufw default allow outgoing

# Allow HTTPS from anyone, but SSH only from the office network
sudo ufw allow 443/tcp
sudo ufw allow from 203.0.113.0/24 to any port 22 proto tcp

# Turn it on and review the active rules
sudo ufw enable
sudo ufw status verbose`, caption: l('A minimal, safe rule set with ufw (Uncomplicated Firewall) on Linux: deny everything inbound, then open only 443 for the public and 22 for one trusted network.', 'Linux-এ ufw (Uncomplicated Firewall) দিয়ে একটি ন্যূনতম, নিরাপদ নিয়ম-সেট: সব inbound deny করুন, তারপর শুধু পাবলিকের জন্য 443 আর একটি বিশ্বস্ত নেটওয়ার্কের জন্য 22 খুলুন।') },
      ],
    },
    {
      h: l('Stateless, stateful, and application firewalls', 'stateless, stateful ও application ফায়ারওয়াল'),
      blocks: [
        { p: l('Firewalls differ in how much they understand about the traffic. The deeper they look, the more they can block — and the more work each packet costs.', 'ফায়ারওয়ালগুলো ট্রাফিক সম্পর্কে কতটা বোঝে তাতে ভিন্ন হয়। যত গভীরে দেখে, তত বেশি ব্লক করতে পারে—আর প্রতিটি প্যাকেট তত বেশি কাজ খরচ করে।') },
        { table: {
          head: [l('Type', 'ধরন'), l('Layer', 'স্তর'), l('What it inspects', 'কী পরীক্ষা করে'), l('Example', 'উদাহরণ')],
          rows: [
            [l('Packet filter (stateless)', 'packet filter (stateless)'), l('L3–L4', 'L3–L4'), l('Each packet in isolation: IP, port, protocol.', 'প্রতিটি প্যাকেট আলাদাভাবে: IP, পোর্ট, প্রোটোকল।'), l('Router ACL, cloud NACL', 'রাউটার ACL, cloud NACL')],
            [l('Stateful firewall', 'stateful ফায়ারওয়াল'), l('L3–L4', 'L3–L4'), l('Connection state plus IP/port, so replies are auto-allowed.', 'সংযোগের state এবং IP/পোর্ট, তাই উত্তর স্বয়ংক্রিয়ভাবে allow হয়।'), l('iptables/nftables, AWS security group', 'iptables/nftables, AWS security group')],
            [l('Application firewall (L7)', 'application ফায়ারওয়াল (L7)'), l('L7', 'L7'), l('The actual payload: HTTP requests, URLs, SQL patterns.', 'আসল payload: HTTP রিকোয়েস্ট, URL, SQL প্যাটার্ন।'), l('WAF, next-gen firewall', 'WAF, next-gen firewall')],
          ],
        } },
        { note: l('A stateless filter checks every packet on its own, so you must write rules for both directions. A stateful firewall tracks the whole conversation, so allowing the request automatically allows its response — simpler and safer for most servers.', 'একটি stateless filter প্রতিটি প্যাকেট নিজে-নিজে দেখে, তাই দুই দিকের জন্যই নিয়ম লিখতে হয়। একটি stateful ফায়ারওয়াল পুরো কথোপকথন ট্র্যাক করে, তাই রিকোয়েস্ট allow করলে তার উত্তরও স্বয়ংক্রিয়ভাবে allow হয়—বেশিরভাগ সার্ভারের জন্য সহজ ও নিরাপদ।'), kind: 'tip' },
      ],
    },
    {
      h: l('Where and when to use a firewall', 'কোথায় ও কখন ফায়ারওয়াল ব্যবহার করবেন'),
      blocks: [
        { p: l('The answer is essentially always, but at more than one place. Defense in depth means layering firewalls so that a mistake in one is caught by another.', 'উত্তর মূলত সবসময়, তবে একাধিক জায়গায়। defense in depth মানে ফায়ারওয়াল স্তরে স্তরে রাখা যাতে একটির ভুল আরেকটি ধরে ফেলে।') },
        { list: [
          l('Host firewall — on every individual server (ufw, iptables/nftables) so even a machine exposed by accident stays locked down.', 'host ফায়ারওয়াল—প্রতিটি সার্ভারে আলাদাভাবে (ufw, iptables/nftables) যাতে ভুলবশত প্রকাশ হওয়া মেশিনও বন্ধ থাকে।'),
          l('Network firewall — at the perimeter of an office or data centre, filtering all traffic entering or leaving the site.', 'network ফায়ারওয়াল—একটি অফিস বা data centre-এর সীমানায়, সাইটে ঢোকা-বেরোনো সব ট্রাফিক ফিল্টার করে।'),
          l('Cloud security groups — virtual, stateful firewalls attached to each cloud instance; default-deny inbound, and you allow only the ports each service needs.', 'cloud security group—প্রতিটি cloud instance-এ যুক্ত ভার্চুয়াল, stateful ফায়ারওয়াল; inbound ডিফল্ট-deny, আর প্রতিটি সার্ভিসের যে পোর্ট দরকার শুধু তাই allow করুন।'),
          l('Web application firewall (WAF) — in front of a public website to block application-layer attacks like SQL injection and cross-site scripting.', 'web application firewall (WAF)—একটি পাবলিক ওয়েবসাইটের সামনে, SQL injection ও cross-site scripting-এর মতো application-স্তরের আক্রমণ ব্লক করতে।'),
        ] },
        { p: l('The guiding rule for writing any of these is the same: default-deny inbound, allow only the ports you actually use, and restrict the source of sensitive ports (like SSH or a database) to trusted IP ranges rather than the whole internet.', 'এগুলোর যেকোনোটি লেখার মূল নিয়ম একই: inbound ডিফল্ট-deny, শুধু সত্যিই ব্যবহৃত পোর্ট allow, আর স্পর্শকাতর পোর্টের (যেমন SSH বা ডেটাবেস) সোর্স পুরো ইন্টারনেট নয়, বিশ্বস্ত IP রেঞ্জে সীমিত রাখুন।') },
      ],
    },
    {
      h: l('Common mistakes', 'সাধারণ ভুল'),
      blocks: [
        { list: [
          l('Opening a port to 0.0.0.0/0 (the whole internet) when only a few known sources ever need it — the classic way databases and admin panels get breached.', 'শুধু কয়েকটি জানা সোর্সের দরকার হলেও একটি পোর্ট 0.0.0.0/0 (পুরো ইন্টারনেট)-এ খোলা—এভাবেই ডেটাবেস ও admin panel সবচেয়ে বেশি breach হয়।'),
          l('Writing an "allow all" rule above your specific deny rules; since the first match wins, the deny never runs.', 'নির্দিষ্ট deny নিয়মের ওপরে একটি "allow all" নিয়ম লেখা; যেহেতু প্রথম মিল জেতে, deny কখনো চলে না।'),
          l('Forgetting the default policy. If it is not explicitly deny, anything you did not think to block gets through.', 'ডিফল্ট policy ভুলে যাওয়া। এটি স্পষ্টভাবে deny না হলে, যা ব্লক করার কথা ভাবেননি তা ঢুকে পড়ে।'),
          l('Treating the firewall as the only defence. It controls who can connect, not whether your app, TLS, or authentication is sound — those still matter.', 'ফায়ারওয়ালকে একমাত্র প্রতিরক্ষা ভাবা। এটি কে সংযোগ করতে পারবে তা নিয়ন্ত্রণ করে, আপনার অ্যাপ, TLS বা authentication ঠিক আছে কি না নয়—সেগুলোও গুরুত্বপূর্ণ।'),
          l('Making rules so strict they block legitimate traffic, then disabling the firewall in frustration instead of fixing the one rule.', 'নিয়ম এত কঠোর করা যে বৈধ ট্রাফিকও ব্লক হয়, তারপর একটি নিয়ম ঠিক না করে বিরক্ত হয়ে ফায়ারওয়াল বন্ধ করে দেওয়া।'),
        ] },
      ],
    },
    {
      h: l('Remember in one line', 'এক লাইনে মনে রাখুন'),
      blocks: [
        { list: [
          l('A firewall allows or blocks traffic by IP, port, protocol, and direction, matching rules top-to-bottom where the first match wins.', 'ফায়ারওয়াল IP, পোর্ট, প্রোটোকল ও দিক দিয়ে ট্রাফিক allow বা block করে, নিয়ম ওপর-থেকে-নিচে মেলায় যেখানে প্রথম মিল জেতে।'),
          l('Default-deny inbound, open only the ports you need, and restrict sensitive ports to trusted sources.', 'inbound ডিফল্ট-deny, শুধু দরকারি পোর্ট খুলুন, ও স্পর্শকাতর পোর্ট বিশ্বস্ত সোর্সে সীমিত রাখুন।'),
          l('Stateful firewalls track connections so replies flow automatically; layer host, network, and cloud firewalls for depth.', 'stateful ফায়ারওয়াল সংযোগ ট্র্যাক করে তাই উত্তর স্বয়ংক্রিয়ভাবে চলে; গভীরতার জন্য host, network ও cloud ফায়ারওয়াল স্তরে রাখুন।'),
        ] },
      ],
    },
  ],

  // ── cn-vpn · VPNs & tunnels ────────────────────────────────────────────────
  'cn-vpn': [
    {
      h: l('What is a VPN?', 'VPN কী?'),
      blocks: [
        { p: l('A VPN (Virtual Private Network) builds an encrypted tunnel across a public network like the internet, so that two endpoints can exchange data as if they were on the same private LAN. Your device and the VPN server first authenticate each other and agree on encryption keys; after that, every packet you send is encrypted, wrapped inside an outer packet addressed to the VPN server, carried across the public internet, decrypted at the server, and forwarded to its real destination. Anyone watching the public path sees only scrambled traffic going to the VPN server, not what is inside or where it is ultimately headed.', 'VPN (Virtual Private Network) ইন্টারনেটের মতো একটি পাবলিক নেটওয়ার্ক জুড়ে একটি এনক্রিপ্টেড tunnel বানায়, যাতে দুটি প্রান্ত এমনভাবে ডেটা বিনিময় করতে পারে যেন তারা একই প্রাইভেট LAN-এ আছে। আপনার ডিভাইস ও VPN সার্ভার প্রথমে একে অপরকে authenticate করে ও এনক্রিপশন key-তে সম্মত হয়; তারপর আপনার পাঠানো প্রতিটি প্যাকেট এনক্রিপ্ট হয়, VPN সার্ভারের ঠিকানায় একটি বাইরের প্যাকেটে মোড়ানো হয়, পাবলিক ইন্টারনেট পার হয়, সার্ভারে decrypt হয় ও তার আসল গন্তব্যে পাঠানো হয়। পাবলিক পথে যে দেখছে সে শুধু VPN সার্ভারে যাওয়া এলোমেলো ট্রাফিক দেখে, ভেতরে কী বা শেষ গন্তব্য কোথায় তা নয়।') },
        { p: l('The problem a VPN solves is that the public internet is untrusted. On open Wi-Fi at a café or airport, anyone nearby can potentially read unencrypted traffic; and a company’s internal servers should not be exposed directly to the internet at all. A VPN gives you a private, protected path over shared infrastructure: remote workers reach internal systems safely, and traffic on hostile networks stays confidential.', 'VPN যে সমস্যা সমাধান করে তা হলো পাবলিক ইন্টারনেট অবিশ্বস্ত। ক্যাফে বা এয়ারপোর্টের খোলা Wi-Fi-তে কাছের যে কেউ এনক্রিপ্ট-না-করা ট্রাফিক পড়তে পারে; আর একটি কোম্পানির অভ্যন্তরীণ সার্ভার ইন্টারনেটে সরাসরি প্রকাশ করাই উচিত নয়। VPN আপনাকে শেয়ার্ড অবকাঠামোর ওপর একটি প্রাইভেট, সুরক্ষিত পথ দেয়: remote কর্মীরা নিরাপদে অভ্যন্তরীণ সিস্টেমে পৌঁছায়, ও প্রতিকূল নেটওয়ার্কে ট্রাফিক গোপন থাকে।') },
        { note: l('Picture a private, armored courier lane running along ordinary public roads. Other drivers can see an armored van passing, but they cannot see what is inside it or open its doors. A VPN is that armored lane for your packets: the route is public, the contents are sealed.', 'সাধারণ পাবলিক রাস্তার পাশ দিয়ে চলা একটি ব্যক্তিগত, সাঁজোয়া কুরিয়ার লেন ভাবুন। অন্য চালকরা একটি সাঁজোয়া ভ্যান যেতে দেখে, কিন্তু ভেতরে কী তা দেখতে বা দরজা খুলতে পারে না। VPN হলো আপনার প্যাকেটের জন্য সেই সাঁজোয়া লেন: পথ পাবলিক, বিষয়বস্তু সিল করা।'), kind: 'tip' },
      ],
    },
    {
      h: l('How a VPN tunnel works', 'VPN tunnel কীভাবে কাজ করে'),
      blocks: [
        { p: l('The core trick is encapsulation: your real packet becomes the payload of a new, encrypted packet. This is why a VPN can make a device in one city behave as if it is plugged into a network in another.', 'মূল কৌশল হলো encapsulation: আপনার আসল প্যাকেট একটি নতুন, এনক্রিপ্টেড প্যাকেটের payload হয়ে যায়। এ কারণেই VPN এক শহরের একটি ডিভাইসকে অন্য শহরের নেটওয়ার্কে যুক্ত থাকার মতো আচরণ করাতে পারে।') },
        { steps: [
          l('The client connects to the VPN server and the two authenticate each other (by certificate, key, or password) so each side trusts the other.', 'client VPN সার্ভারে সংযোগ করে ও দুই পক্ষ একে অপরকে authenticate করে (certificate, key বা password দিয়ে) যাতে প্রতিটি পক্ষ অন্যকে বিশ্বাস করে।'),
          l('They negotiate encryption keys, establishing a secure tunnel between them.', 'তারা এনক্রিপশন key নেগোশিয়েট করে, নিজেদের মধ্যে একটি নিরাপদ tunnel স্থাপন করে।'),
          l('For each outgoing packet, the client encrypts the original packet and wraps it in a new outer packet addressed to the VPN server.', 'প্রতিটি outgoing প্যাকেটের জন্য client আসল প্যাকেটটি এনক্রিপ্ট করে ও VPN সার্ভারের ঠিকানায় একটি নতুন বাইরের প্যাকেটে মোড়ায়।'),
          l('The outer packet crosses the public internet; observers see only encrypted traffic between you and the VPN server.', 'বাইরের প্যাকেট পাবলিক ইন্টারনেট পার হয়; পর্যবেক্ষকরা শুধু আপনার ও VPN সার্ভারের মধ্যে এনক্রিপ্টেড ট্রাফিক দেখে।'),
          l('The server decrypts it, recovers the original packet, and forwards it to the real destination — which replies to the server, which tunnels it back to you.', 'সার্ভার তা decrypt করে, আসল প্যাকেট উদ্ধার করে ও আসল গন্তব্যে পাঠায়—যা সার্ভারকে উত্তর দেয়, সার্ভার তা আপনার কাছে tunnel করে ফেরত পাঠায়।'),
        ] },
        { code: `# Bring up a WireGuard tunnel defined in /etc/wireguard/wg0.conf
sudo wg-quick up wg0

# Check the tunnel: peers, latest handshake, bytes sent/received
sudo wg show

# Confirm your traffic now exits from the VPN server’s IP
curl https://ifconfig.me

# Tear the tunnel down when finished
sudo wg-quick down wg0`, caption: l('Bringing up and inspecting a WireGuard tunnel. After "up", your public IP (from ifconfig.me) becomes the VPN server’s, proving traffic is now tunnelled.', 'একটি WireGuard tunnel চালু ও পরিদর্শন। "up"-এর পর আপনার পাবলিক IP (ifconfig.me থেকে) VPN সার্ভারেরটি হয়ে যায়, যা প্রমাণ করে ট্রাফিক এখন tunnel হচ্ছে।') },
      ],
    },
    {
      h: l('Remote-access vs site-to-site, and common protocols', 'remote-access বনাম site-to-site, ও সাধারণ প্রোটোকল'),
      blocks: [
        { p: l('There are two shapes of VPN. A remote-access VPN connects a single device to a network (a laptop to the office). A site-to-site VPN connects two whole networks (an office to a cloud VPC, or two branch offices) so machines on each side reach the other as if local. The protocol underneath determines the speed, security, and how easy it is to run.', 'VPN-এর দুটি রূপ আছে। একটি remote-access VPN একটি ডিভাইসকে একটি নেটওয়ার্কে যুক্ত করে (একটি laptop অফিসে)। একটি site-to-site VPN দুটি পুরো নেটওয়ার্ককে যুক্ত করে (একটি অফিসকে cloud VPC-তে, বা দুটি শাখা অফিস) যাতে প্রতিটি পাশের মেশিন অন্য পাশে যেন লোকাল-এর মতো পৌঁছায়। নিচের প্রোটোকল গতি, নিরাপত্তা ও চালানো কতটা সহজ তা ঠিক করে।') },
        { table: {
          head: [l('Protocol', 'প্রোটোকল'), l('Character', 'বৈশিষ্ট্য'), l('Typical use', 'সাধারণ ব্যবহার')],
          rows: [
            [l('WireGuard', 'WireGuard'), l('Modern, very fast, tiny codebase; runs over UDP.', 'আধুনিক, খুব দ্রুত, ছোট codebase; UDP-তে চলে।'), l('New deployments, mobile, high performance.', 'নতুন deployment, mobile, উচ্চ পারফরম্যান্স।')],
            [l('OpenVPN', 'OpenVPN'), l('Mature and flexible, built on TLS; runs over UDP or TCP.', 'পরিণত ও নমনীয়, TLS-এর ওপর; UDP বা TCP-তে চলে।'), l('Broad compatibility, restrictive networks.', 'ব্যাপক সামঞ্জস্য, কড়া নেটওয়ার্ক।')],
            [l('IPsec / IKEv2', 'IPsec / IKEv2'), l('Standardized, built into most OSes; strong site-to-site support.', 'প্রমিত, বেশিরভাগ OS-এ নির্মিত; শক্ত site-to-site সমর্থন।'), l('Site-to-site links, mobile clients that roam.', 'site-to-site লিংক, ঘোরাফেরা করা mobile client।')],
          ],
        } },
        { note: l('Avoid PPTP and plain L2TP without IPsec — they are old and weak. Prefer WireGuard, OpenVPN, or IKEv2/IPsec for anything you actually rely on.', 'PPTP এবং IPsec ছাড়া সাধারণ L2TP এড়িয়ে চলুন—এগুলো পুরনো ও দুর্বল। যা সত্যিই ভরসা করেন তার জন্য WireGuard, OpenVPN বা IKEv2/IPsec নিন।'), kind: 'tip' },
      ],
    },
    {
      h: l('When and where to use a VPN', 'কখন ও কোথায় VPN ব্যবহার করবেন'),
      blocks: [
        { list: [
          l('Reach internal resources securely — let remote staff use internal databases, dashboards, and admin tools without exposing them to the public internet.', 'অভ্যন্তরীণ রিসোর্সে নিরাপদে পৌঁছান—remote কর্মীদের অভ্যন্তরীণ ডেটাবেস, dashboard ও admin tool ব্যবহার করতে দিন, পাবলিক ইন্টারনেটে প্রকাশ না করেই।'),
          l('Protect traffic on untrusted networks — on café or airport Wi-Fi, a VPN keeps your data confidential from others on the same network.', 'অবিশ্বস্ত নেটওয়ার্কে ট্রাফিক রক্ষা করুন—ক্যাফে বা এয়ারপোর্ট Wi-Fi-তে VPN আপনার ডেটা একই নেটওয়ার্কের অন্যদের থেকে গোপন রাখে।'),
          l('Connect networks together — a site-to-site VPN links offices or joins your data centre to a cloud VPC over the public internet.', 'নেটওয়ার্ক একসঙ্গে যুক্ত করুন—একটি site-to-site VPN অফিসগুলো লিংক করে বা পাবলিক ইন্টারনেটের ওপর আপনার data centre-কে একটি cloud VPC-তে যুক্ত করে।'),
          l('Do not treat a VPN as anonymity — it hides your traffic from the local network and changes your apparent IP, but the VPN provider can see everything you tunnel, so trust simply moves to them.', 'VPN-কে anonymity ভাববেন না—এটি আপনার ট্রাফিক লোকাল নেটওয়ার্ক থেকে লুকায় ও আপাত IP বদলায়, কিন্তু আপনি যা tunnel করেন VPN প্রদানকারী তার সব দেখতে পারে, তাই বিশ্বাস শুধু তাদের কাছে সরে যায়।'),
        ] },
      ],
    },
    {
      h: l('Common mistakes', 'সাধারণ ভুল'),
      blocks: [
        { list: [
          l('Believing a VPN makes you anonymous. It only shifts trust from your local network and ISP to the VPN provider, who now sees your traffic.', 'VPN আপনাকে বেনামি করে বিশ্বাস করা। এটি শুধু বিশ্বাস আপনার লোকাল নেটওয়ার্ক ও ISP থেকে VPN প্রদানকারীর কাছে সরায়, যে এখন আপনার ট্রাফিক দেখে।'),
          l('Forgetting the VPN server is a single chokepoint. If it goes down, remote access dies with it, so production VPNs need redundancy.', 'VPN সার্ভার একটি একক chokepoint তা ভুলে যাওয়া। এটি ডাউন হলে remote access-ও শেষ, তাই production VPN-এর redundancy দরকার।'),
          l('Ignoring the latency cost. Traffic now detours through the VPN server, so a badly located server can make everything feel slow.', 'latency খরচ উপেক্ষা করা। ট্রাফিক এখন VPN সার্ভার হয়ে ঘুরে যায়, তাই খারাপ জায়গার সার্ভার সবকিছু ধীর মনে করাতে পারে।'),
          l('Leaking DNS or IPv6 outside the tunnel, so your real location leaks even while the VPN is "on". Verify the tunnel actually carries all traffic.', 'tunnel-এর বাইরে DNS বা IPv6 leak করা, ফলে VPN "on" থাকা অবস্থাতেও আসল অবস্থান ফাঁস হয়। যাচাই করুন tunnel আসলেই সব ট্রাফিক বহন করছে।'),
        ] },
      ],
    },
    {
      h: l('Remember in one line', 'এক লাইনে মনে রাখুন'),
      blocks: [
        { list: [
          l('A VPN is an encrypted tunnel over a public network that makes remote devices act as if on a private LAN.', 'VPN হলো পাবলিক নেটওয়ার্কের ওপর একটি এনক্রিপ্টেড tunnel যা দূরের ডিভাইসকে প্রাইভেট LAN-এ থাকার মতো করে।'),
          l('It encapsulates and encrypts each packet to the VPN server, which decrypts and forwards it onward.', 'এটি প্রতিটি প্যাকেট VPN সার্ভারের কাছে encapsulate ও এনক্রিপ্ট করে, যা তা decrypt করে সামনে পাঠায়।'),
          l('It gives privacy and access but adds latency and shifts trust to the provider — a VPN is not anonymity.', 'এটি গোপনীয়তা ও অ্যাক্সেস দেয় কিন্তু latency যোগ করে ও বিশ্বাস প্রদানকারীর কাছে সরায়—VPN anonymity নয়।'),
        ] },
      ],
    },
  ],

  // ── cn-pki · TLS certificates & PKI ────────────────────────────────────────
  'cn-pki': [
    {
      h: l('What is PKI and a TLS certificate?', 'PKI ও TLS সার্টিফিকেট কী?'),
      blocks: [
        { p: l('Public-Key Infrastructure (PKI) is the whole system — certificate authorities, certificates, and keys — that lets you trust that a public key really belongs to who it claims to. A TLS certificate is a small signed document that binds a public key to an identity (a domain name like example.com) and is stamped by a trusted Certificate Authority (CA). When your browser connects over HTTPS, the server presents this certificate to prove "I really am example.com, and here is the public key to encrypt with."', 'Public-Key Infrastructure (PKI) হলো সেই পুরো সিস্টেম—certificate authority, certificate ও key—যা আপনাকে বিশ্বাস করতে দেয় যে একটি public key সত্যিই যার দাবি তারই। একটি TLS সার্টিফিকেট হলো একটি ছোট signed নথি যা একটি public key-কে একটি পরিচয়ের (example.com-এর মতো একটি domain name) সঙ্গে বাঁধে এবং একটি বিশ্বস্ত Certificate Authority (CA) সিল দেয়। আপনার ব্রাউজার HTTPS-এ সংযোগ করলে সার্ভার এই সার্টিফিকেট দেখিয়ে প্রমাণ করে "আমি সত্যিই example.com, আর এই হলো এনক্রিপ্ট করার public key।"') },
        { p: l('The problem PKI solves is impersonation. Encryption alone is not enough: if you encrypt data for a server without verifying who it is, an attacker in the middle could hand you their own key, decrypt everything, and pass it along — a man-in-the-middle attack. PKI answers the question "how do I know this public key belongs to the real bank, not an impostor?" by having a trusted third party vouch for it.', 'PKI যে সমস্যা সমাধান করে তা হলো impersonation। শুধু এনক্রিপশন যথেষ্ট নয়: সার্ভার কে তা যাচাই না করে ডেটা এনক্রিপ্ট করলে, মাঝখানের একজন আক্রমণকারী আপনাকে তার নিজের key দিতে পারে, সব decrypt করে সামনে পাঠাতে পারে—একটি man-in-the-middle আক্রমণ। PKI একটি বিশ্বস্ত তৃতীয় পক্ষকে জামিন করিয়ে "এই public key আসল ব্যাংকের, ছদ্মবেশীর নয় তা কীভাবে জানব?" প্রশ্নের উত্তর দেয়।') },
        { note: l('A certificate is like a passport. You trust a passport not because the holder says it is genuine, but because a recognized authority issued and signed it in a way that is hard to forge. Anyone can check the signature against the authority — that is what makes the identity believable.', 'একটি সার্টিফিকেট একটি পাসপোর্টের মতো। আপনি পাসপোর্ট বিশ্বাস করেন ধারক আসল বলেছে বলে নয়, বরং একটি স্বীকৃত কর্তৃপক্ষ তা এমনভাবে জারি ও সই করেছে যা জাল করা কঠিন। যে কেউ কর্তৃপক্ষের বিপরীতে সইটি যাচাই করতে পারে—এটিই পরিচয়কে বিশ্বাসযোগ্য করে।'), kind: 'tip' },
      ],
    },
    {
      h: l('The players: keys, certificates, and CAs', 'খেলোয়াড়: key, certificate ও CA'),
      blocks: [
        { p: l('A handful of pieces make PKI work. Knowing what each one is removes most of the mystery.', 'কয়েকটি অংশ PKI-কে কাজ করায়। প্রতিটি কী তা জানলে বেশিরভাগ রহস্য দূর হয়।') },
        { table: {
          head: [l('Piece', 'অংশ'), l('What it is', 'এটি কী')],
          rows: [
            [l('Private key', 'private key'), l('A secret the server keeps and never shares; it proves the server owns the certificate.', 'সার্ভার যে গোপন key রাখে ও কখনো শেয়ার করে না; এটি প্রমাণ করে সার্টিফিকেট সার্ভারেরই।')],
            [l('Public key', 'public key'), l('Shared openly inside the certificate; used to encrypt to, and verify, the server.', 'সার্টিফিকেটের ভেতরে খোলাখুলি শেয়ার করা; সার্ভারে এনক্রিপ্ট করতে ও যাচাই করতে ব্যবহৃত।')],
            [l('Certificate (X.509)', 'সার্টিফিকেট (X.509)'), l('The signed document binding a public key to a domain, with validity dates and the issuer.', 'একটি signed নথি যা public key-কে domain-এর সঙ্গে বাঁধে, সঙ্গে মেয়াদের তারিখ ও issuer।')],
            [l('Certificate Authority (CA)', 'Certificate Authority (CA)'), l('A trusted organization that verifies identity and signs certificates.', 'একটি বিশ্বস্ত সংস্থা যা পরিচয় যাচাই করে ও সার্টিফিকেট সই করে।')],
            [l('Root store', 'root store'), l('The list of root CAs your OS or browser already trusts, shipped with it.', 'আপনার OS বা ব্রাউজার আগে থেকেই বিশ্বাস করে এমন root CA-এর তালিকা, এর সঙ্গে আসে।')],
          ],
        } },
      ],
    },
    {
      h: l('The chain of trust, step by step', 'trust-এর chain, ধাপে ধাপে'),
      blocks: [
        { p: l('Browsers do not trust every server directly. Instead trust flows down a chain from a small number of root CAs. This is the heart of PKI.', 'ব্রাউজার প্রতিটি সার্ভারকে সরাসরি বিশ্বাস করে না। বরং বিশ্বাস অল্প কয়েকটি root CA থেকে একটি chain ধরে নিচে নামে। এটিই PKI-এর প্রাণ।') },
        { steps: [
          l('A root CA has a self-signed certificate whose private key is guarded offline; its public certificate is pre-installed in every browser and OS trust store.', 'একটি root CA-এর একটি self-signed সার্টিফিকেট থাকে যার private key offline পাহারা দেওয়া হয়; এর public সার্টিফিকেট প্রতিটি ব্রাউজার ও OS-এর trust store-এ আগে থেকে ইনস্টল থাকে।'),
          l('The root CA signs one or more intermediate CA certificates, so the precious root key is used rarely and stays protected.', 'root CA এক বা একাধিক intermediate CA সার্টিফিকেট সই করে, যাতে মূল্যবান root key কদাচিৎ ব্যবহৃত হয় ও সুরক্ষিত থাকে।'),
          l('An intermediate CA signs the server’s (leaf) certificate after checking the server controls the domain.', 'সার্ভার domain নিয়ন্ত্রণ করে তা যাচাইয়ের পর একটি intermediate CA সার্ভারের (leaf) সার্টিফিকেট সই করে।'),
          l('When you connect, the server sends its leaf certificate plus the intermediates — the chain up toward a root.', 'আপনি সংযোগ করলে সার্ভার তার leaf সার্টিফিকেট এবং intermediate-গুলো পাঠায়—একটি root-এর দিকে ওঠা chain।'),
          l('Your browser verifies each certificate was validly signed by the next one up, checks the dates and domain match, and follows the chain until it reaches a root it already trusts. If it does, the identity is accepted; if any link fails, you see a security warning.', 'আপনার ব্রাউজার যাচাই করে প্রতিটি সার্টিফিকেট বৈধভাবে পরেরটি দিয়ে সই করা, তারিখ ও domain মেলে কি না দেখে, এবং chain অনুসরণ করে যতক্ষণ না আগে থেকে বিশ্বাস করা একটি root-এ পৌঁছায়। পৌঁছালে পরিচয় গ্রহণ করা হয়; কোনো লিংক ব্যর্থ হলে আপনি একটি security সতর্কতা দেখেন।'),
        ] },
      ],
    },
    {
      h: l('How a certificate is issued and used', 'সার্টিফিকেট কীভাবে জারি ও ব্যবহৃত হয়'),
      blocks: [
        { p: l('Getting a certificate is a request-and-sign dance between you and a CA. Modern tooling automates all of it.', 'একটি সার্টিফিকেট পাওয়া আপনার ও একটি CA-এর মধ্যে একটি request-and-sign নাচ। আধুনিক tooling এর সবটাই অটোমেট করে।') },
        { steps: [
          l('Generate a key pair on your server, keeping the private key secret.', 'আপনার সার্ভারে একটি key pair তৈরি করুন, private key গোপন রেখে।'),
          l('Create a Certificate Signing Request (CSR) containing your public key and domain name.', 'আপনার public key ও domain name সহ একটি Certificate Signing Request (CSR) তৈরি করুন।'),
          l('The CA validates that you control the domain — for a DV (domain-validated) cert, by asking you to place a file or DNS record it can check.', 'CA যাচাই করে আপনি domain নিয়ন্ত্রণ করেন—একটি DV (domain-validated) cert-এর জন্য, একটি file বা DNS record রাখতে বলে যা এটি পরীক্ষা করতে পারে।'),
          l('The CA signs your certificate and returns it along with its intermediate chain.', 'CA আপনার সার্টিফিকেট সই করে ও এর intermediate chain সহ ফেরত দেয়।'),
          l('You install the leaf certificate and chain on your server; browsers can now verify you.', 'আপনি সার্ভারে leaf সার্টিফিকেট ও chain ইনস্টল করেন; ব্রাউজার এখন আপনাকে যাচাই করতে পারে।'),
        ] },
        { code: `# Inspect the live certificate chain a server presents
openssl s_client -connect example.com:443 -servername example.com

# Decode a certificate file into human-readable fields
openssl x509 -in cert.pem -noout -text

# Obtain and auto-renew a free certificate with certbot (Let’s Encrypt / ACME)
sudo certbot --nginx -d example.com -d www.example.com`, caption: l('openssl inspects certificates; certbot automates issuance and renewal from a free CA. Let’s Encrypt certs last 90 days, so automated renewal is essential.', 'openssl সার্টিফিকেট পরিদর্শন করে; certbot একটি ফ্রি CA থেকে issuance ও renewal অটোমেট করে। Let’s Encrypt সার্টিফিকেট 90 দিন টেকে, তাই স্বয়ংক্রিয় renewal অপরিহার্য।') },
      ],
    },
    {
      h: l('Validation levels', 'validation স্তর'),
      blocks: [
        { p: l('All valid certificates encrypt equally well; they differ in how thoroughly the CA checked who you are before signing.', 'সব বৈধ সার্টিফিকেট সমানভাবে এনক্রিপ্ট করে; সই করার আগে CA আপনি কে তা কতটা যাচাই করেছে তাতে এরা ভিন্ন।') },
        { table: {
          head: [l('Level', 'স্তর'), l('What the CA checks', 'CA কী যাচাই করে'), l('Typical use', 'সাধারণ ব্যবহার')],
          rows: [
            [l('DV (Domain Validated)', 'DV (Domain Validated)'), l('Only that you control the domain.', 'শুধু আপনি domain নিয়ন্ত্রণ করেন কি না।'), l('Most sites, blogs, APIs.', 'বেশিরভাগ সাইট, blog, API।')],
            [l('OV (Organization Validated)', 'OV (Organization Validated)'), l('Domain control plus that your organization is real.', 'domain নিয়ন্ত্রণ এবং আপনার সংস্থা আসল কি না।'), l('Business and corporate sites.', 'ব্যবসা ও corporate সাইট।')],
            [l('EV (Extended Validation)', 'EV (Extended Validation)'), l('A rigorous legal check of the organization.', 'সংস্থার একটি কঠোর আইনি যাচাই।'), l('Banks, high-trust services.', 'ব্যাংক, উচ্চ-বিশ্বাসের সার্ভিস।')],
          ],
        } },
      ],
    },
    {
      h: l('When and where PKI applies (best practices)', 'কখন ও কোথায় PKI প্রযোজ্য (সেরা চর্চা)'),
      blocks: [
        { list: [
          l('Serve every site over HTTPS with a certificate from a trusted CA — free ones like Let’s Encrypt make this the default, not a luxury.', 'প্রতিটি সাইট একটি বিশ্বস্ত CA-এর সার্টিফিকেট দিয়ে HTTPS-এ পরিবেশন করুন—Let’s Encrypt-এর মতো ফ্রি সার্টিফিকেট এটিকে বিলাসিতা নয়, ডিফল্ট করে।'),
          l('Guard the private key as your most sensitive secret; if it leaks, anyone can impersonate your server until the cert is revoked.', 'private key-কে আপনার সবচেয়ে স্পর্শকাতর গোপন হিসেবে পাহারা দিন; এটি ফাঁস হলে cert revoke না হওয়া পর্যন্ত যে কেউ আপনার সার্ভার নকল করতে পারে।'),
          l('Automate renewal before expiry — an expired certificate breaks HTTPS for every visitor at once, a very common and very visible outage.', 'মেয়াদ শেষের আগে renewal অটোমেট করুন—একটি মেয়াদোত্তীর্ণ সার্টিফিকেট একসঙ্গে প্রতিটি দর্শকের জন্য HTTPS ভাঙে, একটি খুব সাধারণ ও খুব দৃশ্যমান outage।'),
          l('The same PKI ideas secure more than websites: internal service-to-service mTLS, signed software, and VPN authentication all rely on it.', 'একই PKI ধারণা ওয়েবসাইটের বেশি কিছু নিরাপদ করে: অভ্যন্তরীণ service-to-service mTLS, signed software ও VPN authentication সবই এর ওপর নির্ভর করে।'),
        ] },
      ],
    },
    {
      h: l('Common mistakes', 'সাধারণ ভুল'),
      blocks: [
        { list: [
          l('Letting a certificate expire, taking the whole site down for everyone the moment it lapses.', 'একটি সার্টিফিকেট মেয়াদ শেষ হতে দেওয়া, লাপস হওয়ার মুহূর্তে সবার জন্য পুরো সাইট ডাউন করা।'),
          l('Forgetting to send the intermediate certificates, so some clients cannot build the chain to a trusted root.', 'intermediate সার্টিফিকেট পাঠাতে ভুলে যাওয়া, ফলে কিছু client একটি বিশ্বস্ত root পর্যন্ত chain বানাতে পারে না।'),
          l('Committing a private key to a Git repo or leaving it world-readable — an instant, total compromise.', 'একটি private key Git repo-তে commit করা বা world-readable রেখে দেওয়া—একটি তাৎক্ষণিক, সম্পূর্ণ compromise।'),
          l('Clicking through "your connection is not private" warnings, which are exactly PKI catching a broken or forged chain.', '"your connection is not private" সতর্কতা পেরিয়ে ক্লিক করা, যা ঠিক PKI-এর একটি ভাঙা বা জাল chain ধরা।'),
        ] },
      ],
    },
    {
      h: l('Remember in one line', 'এক লাইনে মনে রাখুন'),
      blocks: [
        { list: [
          l('A certificate binds a public key to an identity; a CA signs it so browsers can trust it.', 'একটি সার্টিফিকেট public key-কে একটি পরিচয়ের সঙ্গে বাঁধে; একটি CA তা সই করে যাতে ব্রাউজার বিশ্বাস করতে পারে।'),
          l('Trust flows down a chain: trusted root → intermediate → your server’s leaf certificate.', 'বিশ্বাস একটি chain ধরে নিচে নামে: বিশ্বস্ত root → intermediate → আপনার সার্ভারের leaf সার্টিফিকেট।'),
          l('Keep the private key secret and automate renewal — a leaked key or an expired cert breaks trust for everyone.', 'private key গোপন রাখুন ও renewal অটোমেট করুন—একটি ফাঁস key বা মেয়াদোত্তীর্ণ cert সবার জন্য বিশ্বাস ভাঙে।'),
        ] },
      ],
    },
  ],

  // ── cn-attacks · Common network attacks ────────────────────────────────────
  'cn-attacks': [
    {
      h: l('What are common network attacks?', 'সাধারণ নেটওয়ার্ক আক্রমণ কী?'),
      blocks: [
        { p: l('Network attacks are attempts to disrupt, intercept, or impersonate traffic on a network. Three of the most common shapes are DDoS (flooding a target so real users cannot reach it), man-in-the-middle or MITM (secretly sitting between two parties to read or alter their traffic), and spoofing (forging a source identity — a fake IP, MAC, or DNS answer — so a machine trusts something it should not). Understanding how each works tells you exactly which defence stops it.', 'নেটওয়ার্ক আক্রমণ হলো একটি নেটওয়ার্কের ট্রাফিক ব্যাহত, আটকানো বা নকল করার চেষ্টা। সবচেয়ে সাধারণ তিনটি রূপ হলো DDoS (একটি লক্ষ্যকে প্লাবিত করা যাতে আসল ব্যবহারকারী পৌঁছাতে না পারে), man-in-the-middle বা MITM (দুই পক্ষের মাঝে গোপনে বসে তাদের ট্রাফিক পড়া বা বদলানো), ও spoofing (একটি সোর্স পরিচয় জাল করা—একটি নকল IP, MAC বা DNS উত্তর—যাতে একটি মেশিন এমন কিছু বিশ্বাস করে যা করা উচিত নয়)। প্রতিটি কীভাবে কাজ করে তা বুঝলে ঠিক কোন প্রতিরক্ষা এটি থামায় তা জানা যায়।') },
        { note: l('The root risk is trust without proof. A network that does not authenticate senders or encrypt data will believe and forward anything it receives — so anyone on the path can read, alter, impersonate, or flood it. Encryption and authentication, not secrecy, are what actually stop these attacks.', 'মূল ঝুঁকি হলো প্রমাণ ছাড়া বিশ্বাস। যে নেটওয়ার্ক প্রেরককে authenticate বা ডেটা এনক্রিপ্ট করে না তা যা পায় তাই বিশ্বাস করে ও সামনে পাঠায়—তাই পথের যে কেউ তা পড়তে, বদলাতে, নকল করতে বা প্লাবিত করতে পারে। গোপনীয়তা নয়, এনক্রিপশন ও authentication-ই আসলে এই আক্রমণ থামায়।'), kind: 'warn' },
      ],
    },
    {
      h: l('DDoS: overwhelming the target', 'DDoS: লক্ষ্যকে অভিভূত করা'),
      blocks: [
        { p: l('A Distributed Denial of Service attack floods a target with more traffic or requests than it can handle, so legitimate users are denied service. "Distributed" means the flood comes from many machines at once — often a botnet of thousands of compromised devices — which makes it hard to just block one source.', 'একটি Distributed Denial of Service আক্রমণ একটি লক্ষ্যকে সে সামলাতে পারে তার চেয়ে বেশি ট্রাফিক বা রিকোয়েস্ট দিয়ে প্লাবিত করে, ফলে বৈধ ব্যবহারকারীরা সেবা পায় না। "Distributed" মানে প্লাবন একসঙ্গে অনেক মেশিন থেকে আসে—প্রায়ই হাজার হাজার compromised ডিভাইসের একটি botnet—যা শুধু একটি সোর্স ব্লক করা কঠিন করে।') },
        { steps: [
          l('An attacker builds or rents a botnet of many compromised machines.', 'একজন আক্রমণকারী অনেক compromised মেশিনের একটি botnet বানায় বা ভাড়া নেয়।'),
          l('On command, all of them send traffic at the target at once — a volumetric flood (raw bandwidth), a protocol flood (like a SYN flood exhausting the connection table), or an application flood (expensive HTTP requests).', 'নির্দেশে তারা সবাই একসঙ্গে লক্ষ্যে ট্রাফিক পাঠায়—একটি volumetric flood (কাঁচা bandwidth), একটি protocol flood (যেমন connection table নিঃশেষ করা SYN flood), বা একটি application flood (ব্যয়বহুল HTTP রিকোয়েস্ট)।'),
          l('The target’s bandwidth, connection table, or CPU is exhausted, and real requests are dropped.', 'লক্ষ্যের bandwidth, connection table বা CPU নিঃশেষ হয়, ও আসল রিকোয়েস্ট বাদ পড়ে।'),
          l('You mitigate by absorbing or filtering the flood upstream — a CDN/Anycast network spreads it, rate limits cap abusive sources, and scrubbing services drop attack traffic before it reaches you.', 'আপনি প্লাবন upstream-এ শোষণ বা ফিল্টার করে প্রশমিত করেন—একটি CDN/Anycast নেটওয়ার্ক তা ছড়ায়, rate limit অপমানজনক সোর্স সীমিত করে, ও scrubbing সার্ভিস আক্রমণ ট্রাফিক আপনার কাছে পৌঁছানোর আগে বাদ দেয়।'),
        ] },
        { code: `# Spot a possible SYN flood: count half-open connections
ss -ant state syn-recv | wc -l

# Rate-limit new inbound TCP connections to 25/sec with iptables
sudo iptables -A INPUT -p tcp --syn -m limit --limit 25/s -j ACCEPT

# Enable SYN cookies so the kernel survives a SYN flood
sudo sysctl -w net.ipv4.tcp_syncookies=1`, caption: l('First-line host defences against a SYN flood. Real volumetric DDoS also needs upstream help — a CDN or scrubbing provider — because it can exceed your link’s capacity entirely.', 'একটি SYN flood-এর বিরুদ্ধে প্রথম-সারির host প্রতিরক্ষা। আসল volumetric DDoS-এর upstream সাহায্যও দরকার—একটি CDN বা scrubbing প্রদানকারী—কারণ এটি আপনার লিংকের ক্ষমতা পুরোপুরি ছাড়িয়ে যেতে পারে।') },
      ],
    },
    {
      h: l('MITM and spoofing: intercepting and impersonating', 'MITM ও spoofing: আটকানো ও নকল করা'),
      blocks: [
        { p: l('A man-in-the-middle attacker secretly relays traffic between two parties who think they are talking directly, letting the attacker read or alter everything. On a LAN this often starts with ARP spoofing — sending forged "this IP is at my MAC" replies so traffic is routed through the attacker. Other vectors are a rogue "evil twin" Wi-Fi hotspot, DNS spoofing, or SSL stripping that downgrades HTTPS to HTTP.', 'একজন man-in-the-middle আক্রমণকারী গোপনে দুই পক্ষের মধ্যে ট্রাফিক relay করে যারা ভাবে তারা সরাসরি কথা বলছে, আক্রমণকারীকে সব পড়তে বা বদলাতে দেয়। একটি LAN-এ এটি প্রায়ই ARP spoofing দিয়ে শুরু হয়—জাল "এই IP আমার MAC-এ" উত্তর পাঠানো যাতে ট্রাফিক আক্রমণকারীর মধ্য দিয়ে যায়। অন্য পথ হলো একটি নকল "evil twin" Wi-Fi hotspot, DNS spoofing, বা HTTPS-কে HTTP-তে নামানো SSL stripping।') },
        { p: l('Spoofing is the broader trick of forging identity so a system trusts a lie. IP spoofing fakes the source address of packets (used to amplify DDoS and hide the attacker); ARP spoofing fakes the IP-to-MAC mapping on a LAN to enable MITM; DNS spoofing or cache poisoning feeds a resolver a false answer so a name points to the attacker’s server. The common thread is that the network accepts a claim without verifying it.', 'Spoofing হলো পরিচয় জাল করার বৃহত্তর কৌশল যাতে একটি সিস্টেম একটি মিথ্যা বিশ্বাস করে। IP spoofing প্যাকেটের সোর্স ঠিকানা নকল করে (DDoS বাড়াতে ও আক্রমণকারীকে লুকাতে ব্যবহৃত); ARP spoofing একটি LAN-এ IP-থেকে-MAC ম্যাপিং নকল করে MITM সম্ভব করতে; DNS spoofing বা cache poisoning একটি resolver-কে মিথ্যা উত্তর খাওয়ায় যাতে একটি নাম আক্রমণকারীর সার্ভারে নির্দেশ করে। সাধারণ সুতো হলো নেটওয়ার্ক একটি দাবি যাচাই না করেই মেনে নেয়।') },
        { p: l('This is exactly why TLS matters so much: by encrypting the traffic and proving the server’s identity with a certificate, it defeats both interception and impersonation at once. An attacker who reroutes your traffic through themselves still cannot read it or pretend to be the real server, because they lack the private key the certificate vouches for. Encryption plus authentication is the pair that turns "trust whatever arrives" into "trust only what is proven."', 'এ কারণেই TLS এত গুরুত্বপূর্ণ: ট্রাফিক এনক্রিপ্ট করে ও একটি certificate দিয়ে সার্ভারের পরিচয় প্রমাণ করে এটি একসঙ্গে আটকানো ও নকল করা দুটোই হারায়। যে আক্রমণকারী আপনার ট্রাফিক নিজের মধ্য দিয়ে ঘোরায় সে-ও তা পড়তে বা আসল সার্ভার হওয়ার ভান করতে পারে না, কারণ certificate যে private key-এর জামিন দেয় তা তার নেই। এনক্রিপশন এবং authentication হলো সেই জোড়া যা "যা আসে তাই বিশ্বাস করো"-কে "শুধু যা প্রমাণিত তাই বিশ্বাস করো"-তে পরিণত করে।') },
      ],
    },
    {
      h: l('Attack and defence at a glance', 'আক্রমণ ও প্রতিরক্ষা এক নজরে'),
      blocks: [
        { table: {
          head: [l('Attack', 'আক্রমণ'), l('How it works', 'কীভাবে কাজ করে'), l('Primary defence', 'প্রধান প্রতিরক্ষা')],
          rows: [
            [l('DDoS', 'DDoS'), l('Many machines flood the target with traffic.', 'অনেক মেশিন লক্ষ্যকে ট্রাফিক দিয়ে প্লাবিত করে।'), l('CDN/Anycast absorption, rate limiting, scrubbing, autoscale.', 'CDN/Anycast শোষণ, rate limiting, scrubbing, autoscale।')],
            [l('MITM', 'MITM'), l('Attacker relays traffic between two parties to read/alter it.', 'আক্রমণকারী দুই পক্ষের ট্রাফিক relay করে পড়তে/বদলাতে।'), l('TLS end-to-end, HSTS, certificate pinning, VPN on untrusted Wi-Fi.', 'TLS end-to-end, HSTS, certificate pinning, অবিশ্বস্ত Wi-Fi-তে VPN।')],
            [l('IP / ARP spoofing', 'IP / ARP spoofing'), l('Forged source address or IP-to-MAC mapping.', 'জাল সোর্স ঠিকানা বা IP-থেকে-MAC ম্যাপিং।'), l('Ingress filtering (BCP38), dynamic ARP inspection, port security.', 'ingress filtering (BCP38), dynamic ARP inspection, port security।')],
            [l('DNS spoofing', 'DNS spoofing'), l('False DNS answer points a name at the attacker.', 'মিথ্যা DNS উত্তর একটি নামকে আক্রমণকারীর দিকে নির্দেশ করে।'), l('DNSSEC, DNS over HTTPS/TLS, validating resolvers.', 'DNSSEC, DNS over HTTPS/TLS, যাচাইকারী resolver।')],
          ],
        } },
      ],
    },
    {
      h: l('Defence in depth: where protection lives', 'defense in depth: প্রতিরক্ষা কোথায় থাকে'),
      blocks: [
        { p: l('No single control stops every attack, so real security layers several so that a gap in one is covered by another. The trade-off is that layered defences add cost and complexity — but they leave no single point of failure.', 'কোনো একটি নিয়ন্ত্রণ প্রতিটি আক্রমণ থামায় না, তাই আসল নিরাপত্তা কয়েকটি স্তর রাখে যাতে একটির ফাঁক অন্যটি ঢেকে দেয়। ট্রেড-অফ হলো স্তরিত প্রতিরক্ষা খরচ ও জটিলতা যোগ করে—তবে এটি কোনো একক ব্যর্থতা-বিন্দু রাখে না।') },
        { list: [
          l('Encrypt everything with TLS so intercepted traffic is unreadable and altered traffic is detected — this alone defeats most MITM attempts.', 'সবকিছু TLS দিয়ে এনক্রিপ্ট করুন যাতে আটকানো ট্রাফিক অপাঠ্য ও বদলানো ট্রাফিক ধরা পড়ে—এটি একাই বেশিরভাগ MITM চেষ্টা হারায়।'),
          l('Authenticate identities — verify certificates, use strong logins, and never trust a source IP or ARP reply as proof of who someone is.', 'পরিচয় authenticate করুন—সার্টিফিকেট যাচাই করুন, শক্ত login ব্যবহার করুন, ও একটি সোর্স IP বা ARP উত্তরকে কেউ কে তার প্রমাণ হিসেবে কখনো বিশ্বাস করবেন না।'),
          l('Rate-limit and validate inputs so a flood or a malformed request cannot easily exhaust or exploit you.', 'rate-limit করুন ও input যাচাই করুন যাতে একটি flood বা বিকৃত রিকোয়েস্ট সহজে আপনাকে নিঃশেষ বা exploit করতে না পারে।'),
          l('Put DDoS protection upstream (a CDN or scrubbing provider) because a large volumetric flood can exceed your own link before your server even sees it.', 'DDoS সুরক্ষা upstream-এ রাখুন (একটি CDN বা scrubbing প্রদানকারী) কারণ একটি বড় volumetric flood আপনার সার্ভার দেখার আগেই আপনার নিজের লিংক ছাড়িয়ে যেতে পারে।'),
        ] },
      ],
    },
    {
      h: l('Common mistakes', 'সাধারণ ভুল'),
      blocks: [
        { list: [
          l('Relying on "no one knows our address" — security by obscurity. Attackers scan the entire internet; hiding is not protection.', '"আমাদের ঠিকানা কেউ জানে না"-তে নির্ভর করা—obscurity দিয়ে নিরাপত্তা। আক্রমণকারীরা পুরো ইন্টারনেট scan করে; লুকানো কোনো সুরক্ষা নয়।'),
          l('Serving login or payment pages over plain HTTP, handing any MITM your users’ credentials.', 'login বা payment পেজ সাধারণ HTTP-তে পরিবেশন করা, যেকোনো MITM-কে আপনার ব্যবহারকারীদের credential দেওয়া।'),
          l('Trusting a source IP or ARP reply for authentication — both are trivially spoofable.', 'authentication-এর জন্য একটি সোর্স IP বা ARP উত্তর বিশ্বাস করা—দুটোই সহজে spoof করা যায়।'),
          l('Assuming a firewall alone stops DDoS. A flood large enough saturates the link before the firewall’s rules ever apply.', 'ধরে নেওয়া যে শুধু একটি ফায়ারওয়াল DDoS থামায়। যথেষ্ট বড় একটি flood ফায়ারওয়ালের নিয়ম প্রয়োগের আগেই লিংক saturate করে।'),
        ] },
      ],
    },
    {
      h: l('Remember in one line', 'এক লাইনে মনে রাখুন'),
      blocks: [
        { list: [
          l('DDoS floods you, MITM intercepts you, spoofing impersonates — each exploits trust without proof.', 'DDoS আপনাকে প্লাবিত করে, MITM আটকায়, spoofing নকল করে—প্রতিটি প্রমাণ ছাড়া বিশ্বাসকে exploit করে।'),
          l('Encrypt with TLS, authenticate identities, rate-limit, and push DDoS protection upstream.', 'TLS দিয়ে এনক্রিপ্ট করুন, পরিচয় authenticate করুন, rate-limit করুন, ও DDoS সুরক্ষা upstream-এ ঠেলুন।'),
          l('No single control is enough — layer defences so there is no single point of failure, and never rely on obscurity.', 'কোনো একটি নিয়ন্ত্রণ যথেষ্ট নয়—প্রতিরক্ষা স্তরে রাখুন যাতে কোনো একক ব্যর্থতা-বিন্দু না থাকে, ও obscurity-তে কখনো নির্ভর করবেন না।'),
        ] },
      ],
    },
  ],

  // ── cn-tools · Troubleshooting tools ───────────────────────────────────────
  'cn-tools': [
    {
      h: l('What are network troubleshooting tools?', 'নেটওয়ার্ক troubleshooting টুল কী?'),
      blocks: [
        { p: l('When something "doesn’t work" on a network, the real skill is not guessing a fix but locating which layer is actually failing. A small set of command-line tools each answers one precise question: ping tests whether a host is reachable, traceroute shows the path packets take and where they stall, dig queries DNS to see how a name resolves, and curl makes a real HTTP request so you can inspect the service’s response. Used in order, they turn a vague "the site is down" into a specific, provable fault.', 'একটি নেটওয়ার্কে কিছু "কাজ করে না" হলে আসল দক্ষতা সমাধান অনুমান করা নয়, বরং কোন স্তর আসলে ব্যর্থ হচ্ছে তা খুঁজে বের করা। কয়েকটি command-line টুল প্রতিটি একটি নির্দিষ্ট প্রশ্নের উত্তর দেয়: ping যাচাই করে একটি host পৌঁছানো যায় কি না, traceroute দেখায় প্যাকেট কোন পথ নেয় ও কোথায় আটকায়, dig DNS কুয়েরি করে দেখে একটি নাম কীভাবে resolve হয়, ও curl একটি আসল HTTP রিকোয়েস্ট করে যাতে সার্ভিসের উত্তর পরিদর্শন করা যায়। ক্রমে ব্যবহার করলে এরা একটি অস্পষ্ট "সাইট ডাউন"-কে একটি নির্দিষ্ট, প্রমাণযোগ্য ত্রুটিতে পরিণত করে।') },
        { note: l('Think of a mechanic’s toolkit. Each instrument checks one system — compression here, spark there — so the fault is isolated fast instead of replacing random parts. These commands are your instruments for the network stack.', 'একজন মেকানিকের টুলকিট ভাবুন। প্রতিটি যন্ত্র একটি সিস্টেম যাচাই করে—এখানে compression, ওখানে spark—যাতে এলোমেলো যন্ত্রাংশ বদলানোর বদলে ত্রুটি দ্রুত আলাদা হয়। এই কমান্ডগুলো নেটওয়ার্ক stack-এর জন্য আপনার যন্ত্র।'), kind: 'tip' },
        { p: l('These tools are universal: they exist on almost every server and laptop, they are the same across cloud providers, and they cost nothing to run. Learning to read their output is one of the highest-leverage networking skills, because the alternative — restarting services, redeploying, or blaming the application — wastes hours and often fixes nothing. A single well-chosen command frequently proves in seconds whether the fault is yours or the network’s, and that answer decides who should be fixing it.', 'এই টুলগুলো সর্বজনীন: প্রায় প্রতিটি সার্ভার ও laptop-এ থাকে, cloud প্রদানকারী জুড়ে একই, ও চালাতে কিছু খরচ হয় না। এদের আউটপুট পড়তে শেখা সবচেয়ে বেশি-লাভজনক নেটওয়ার্কিং দক্ষতার একটি, কারণ বিকল্প—সার্ভিস restart, redeploy, বা application-কে দোষ দেওয়া—ঘণ্টার পর ঘণ্টা নষ্ট করে ও প্রায়ই কিছুই ঠিক করে না। একটি ভালোভাবে বাছা কমান্ড প্রায়ই কয়েক সেকেন্ডে প্রমাণ করে ত্রুটি আপনার নাকি নেটওয়ার্কের, আর সেই উত্তরই ঠিক করে কার এটি ঠিক করা উচিত।') },
      ],
    },
    {
      h: l('Work up the layers', 'স্তর ধরে ওপরে উঠুন'),
      blocks: [
        { p: l('The reliable method is to start low and climb. Each step assumes the ones below it passed, so the first step that fails tells you where the problem lives.', 'নির্ভরযোগ্য পদ্ধতি হলো নিচ থেকে শুরু করে ওপরে ওঠা। প্রতিটি ধাপ ধরে নেয় এর নিচেরগুলো পাস করেছে, তাই যে ধাপ প্রথম ব্যর্থ হয় সেটি বলে দেয় সমস্যা কোথায়।') },
        { steps: [
          l('Is the host reachable at all? Run ping. If replies come back, the network path and the host are basically alive.', 'host কি আদৌ পৌঁছানো যায়? ping চালান। উত্তর এলে নেটওয়ার্ক পথ ও host মূলত সচল।'),
          l('If not, where does the path break? Run traceroute to see each hop and the point where latency spikes or packets vanish.', 'না হলে, পথ কোথায় ভাঙে? প্রতিটি hop ও কোথায় latency বাড়ে বা প্যাকেট হারায় তা দেখতে traceroute চালান।'),
          l('Does the name resolve to the right address? Run dig. A wrong or missing DNS answer explains many "site down" reports.', 'নাম কি সঠিক ঠিকানায় resolve হয়? dig চালান। একটি ভুল বা অনুপস্থিত DNS উত্তর অনেক "সাইট ডাউন" রিপোর্ট ব্যাখ্যা করে।'),
          l('Is the port actually open? Test the TCP port (for example with nc) to separate a firewall or dead service from a network problem.', 'পোর্ট কি আসলে খোলা? TCP পোর্ট পরীক্ষা করুন (যেমন nc দিয়ে) যাতে একটি ফায়ারওয়াল বা মৃত সার্ভিসকে নেটওয়ার্ক সমস্যা থেকে আলাদা করা যায়।'),
          l('Does the service answer correctly? Run curl to make a real HTTP request and read the status code and headers.', 'সার্ভিস কি সঠিকভাবে উত্তর দেয়? একটি আসল HTTP রিকোয়েস্ট করতে ও status code ও header পড়তে curl চালান।'),
        ] },
        { code: `# 1. Reachability — send 4 pings and read the loss/latency summary
ping -c 4 example.com

# 2. Path — show every hop between you and the host
traceroute example.com

# 3. Name resolution — what address does DNS return?
dig +short example.com

# 4. Port open? — probe TCP 443 without sending data
nc -zv example.com 443

# 5. Service — request headers only and read the HTTP status
curl -I https://example.com`, caption: l('The same five checks as commands, run in order. The first one that fails points at the failing layer — reachability, routing, DNS, the port, or the application.', 'একই পাঁচটি যাচাই কমান্ড হিসেবে, ক্রমে চালানো। প্রথম যেটি ব্যর্থ হয় সেটি ব্যর্থ স্তরের দিকে নির্দেশ করে—reachability, routing, DNS, পোর্ট, বা application।') },
      ],
    },
    {
      h: l('Reading each tool’s output', 'প্রতিটি টুলের আউটপুট পড়া'),
      blocks: [
        { p: l('Beyond the basics, a few extra commands and flags cover most day-to-day debugging.', 'মৌলিকের বাইরে, কয়েকটি অতিরিক্ত কমান্ড ও flag বেশিরভাগ প্রতিদিনের debugging ঢাকে।') },
        { code: `# Query a specific DNS server, and check MX records
dig @8.8.8.8 example.com
dig example.com MX +short

# Follow redirects and print full request/response headers
curl -v -L https://example.com

# See what is listening on this machine (modern replacement for netstat)
ss -tulpn
netstat -tulpn   # older systems

# Continuous path + loss stats in one view
mtr example.com`, caption: l('dig can target a resolver and record type; curl -v shows the whole exchange; ss/netstat list local listeners; mtr combines ping and traceroute for intermittent issues.', 'dig একটি resolver ও record type লক্ষ্য করতে পারে; curl -v পুরো আদান-প্রদান দেখায়; ss/netstat লোকাল listener তালিকা করে; mtr মাঝেমধ্যের সমস্যার জন্য ping ও traceroute একত্র করে।') },
        { p: l('Interpretation matters as much as the command. ping showing loss can mean a bad link or just ICMP being rate-limited; traceroute stars (* * *) often mean a hop that silently drops ICMP, not a real break; and dig answers can come from a cache, so a stale result may not reflect the latest DNS change.', 'কমান্ডের মতোই ব্যাখ্যা গুরুত্বপূর্ণ। ping-এ loss দেখানো একটি খারাপ লিংক বোঝাতে পারে অথবা শুধু ICMP rate-limit হওয়া; traceroute-এর তারা (* * *) প্রায়ই এমন একটি hop বোঝায় যা নীরবে ICMP ফেলে দেয়, আসল ভাঙন নয়; আর dig-এর উত্তর একটি cache থেকে আসতে পারে, তাই একটি পুরনো ফল সর্বশেষ DNS পরিবর্তন নাও দেখাতে পারে।') },
      ],
    },
    {
      h: l('Goal → tool reference', 'লক্ষ্য → টুল রেফারেন্স'),
      blocks: [
        { table: {
          head: [l('Goal', 'লক্ষ্য'), l('Tool', 'টুল'), l('Example command', 'উদাহরণ কমান্ড')],
          rows: [
            [l('Test reachability', 'পৌঁছানো যাচাই'), l('ping', 'ping'), l('ping -c 4 8.8.8.8', 'ping -c 4 8.8.8.8')],
            [l('Trace the path', 'পথ ট্রেস'), l('traceroute / mtr', 'traceroute / mtr'), l('traceroute example.com', 'traceroute example.com')],
            [l('Look up DNS', 'DNS লুকআপ'), l('dig', 'dig'), l('dig +short example.com', 'dig +short example.com')],
            [l('Check a TCP port', 'TCP পোর্ট যাচাই'), l('nc', 'nc'), l('nc -zv example.com 443', 'nc -zv example.com 443')],
            [l('Make an HTTP request', 'HTTP রিকোয়েস্ট'), l('curl', 'curl'), l('curl -I https://example.com', 'curl -I https://example.com')],
            [l('List local connections', 'লোকাল সংযোগ তালিকা'), l('ss / netstat', 'ss / netstat'), l('ss -tulpn', 'ss -tulpn')],
          ],
        } },
      ],
    },
    {
      h: l('When and where to reach for them', 'কখন ও কোথায় এদের ধরবেন'),
      blocks: [
        { p: l('Use these tools any time a request fails or feels slow and you do not yet know why. The whole point is to localize the fault before changing anything: is it the host, the path, DNS, the port, or the application? Working bottom-up stops you from, say, rewriting application code when the real problem is a DNS record pointing at the wrong server.', 'এই টুল ব্যবহার করুন যখনই একটি রিকোয়েস্ট ব্যর্থ হয় বা ধীর মনে হয় ও আপনি এখনো জানেন না কেন। পুরো উদ্দেশ্য হলো কিছু বদলানোর আগে ত্রুটি স্থানীয় করা: এটি কি host, পথ, DNS, পোর্ট, নাকি application? নিচ-থেকে-ওপরে কাজ করা আপনাকে, ধরুন, application কোড আবার লেখা থেকে থামায় যখন আসল সমস্যা একটি DNS record ভুল সার্ভারে নির্দেশ করছে।') },
        { note: l('Silence is not proof of failure. Many networks block or rate-limit ICMP, so a failed ping or a traceroute full of stars can be perfectly healthy. Confirm with a second tool — for example, a successful curl to the port that matters — before concluding a host is down.', 'নীরবতা ব্যর্থতার প্রমাণ নয়। অনেক নেটওয়ার্ক ICMP ব্লক বা rate-limit করে, তাই একটি ব্যর্থ ping বা তারায় ভরা traceroute পুরোপুরি সুস্থ হতে পারে। একটি host ডাউন সিদ্ধান্তের আগে দ্বিতীয় একটি টুল দিয়ে নিশ্চিত করুন—যেমন, প্রয়োজনীয় পোর্টে একটি সফল curl।'), kind: 'warn' },
      ],
    },
    {
      h: l('Common mistakes', 'সাধারণ ভুল'),
      blocks: [
        { list: [
          l('Guessing at fixes instead of using the tools to isolate which layer actually fails first.', 'কোন স্তর আসলে আগে ব্যর্থ হয় তা টুল দিয়ে আলাদা না করে সমাধান অনুমান করা।'),
          l('Declaring a host "down" because ping fails, when ICMP is simply filtered — test the actual service port instead.', 'ping ব্যর্থ হওয়ায় একটি host "ডাউন" ঘোষণা করা, যখন ICMP শুধু ফিল্টার করা—বরং আসল সার্ভিস পোর্ট পরীক্ষা করুন।'),
          l('Trusting a cached dig result and missing a DNS change that has not propagated to your resolver yet.', 'একটি cached dig ফল বিশ্বাস করা ও একটি DNS পরিবর্তন মিস করা যা এখনো আপনার resolver-এ propagate হয়নি।'),
          l('Reading only the first line of curl or traceroute output and stopping before the detail that names the fault.', 'শুধু curl বা traceroute আউটপুটের প্রথম লাইন পড়া ও ত্রুটির নাম বলা বিস্তারিতের আগে থেমে যাওয়া।'),
        ] },
      ],
    },
    {
      h: l('Remember in one line', 'এক লাইনে মনে রাখুন'),
      blocks: [
        { list: [
          l('ping = reachable? traceroute = where does the path break? dig = does the name resolve? curl = does the service answer?', 'ping = পৌঁছানো যায়? traceroute = পথ কোথায় ভাঙে? dig = নাম resolve হয়? curl = সার্ভিস উত্তর দেয়?'),
          l('Work up the layers in order; the first check that fails names the failing layer.', 'ক্রমে স্তর ধরে ওপরে উঠুন; প্রথম যে যাচাই ব্যর্থ হয় সেটি ব্যর্থ স্তরের নাম বলে।'),
          l('Interpret carefully — blocked ICMP or a cached DNS answer can make a healthy system look broken.', 'সাবধানে ব্যাখ্যা করুন—ব্লক করা ICMP বা একটি cached DNS উত্তর একটি সুস্থ সিস্টেমকে ভাঙা দেখাতে পারে।'),
        ] },
      ],
    },
  ],

  // ── cn-observability · Monitoring & observability ──────────────────────────
  'cn-observability': [
    {
      h: l('What is monitoring and observability?', 'monitoring ও observability কী?'),
      blocks: [
        { p: l('Observability is the ability to understand what a system is doing internally purely from the data it emits — its metrics, logs, and traces. Monitoring is the narrower, related practice of watching known signals on dashboards and firing alerts when they cross a threshold. Put simply: monitoring tells you that something is wrong; observability lets you ask why, including questions you did not think to prepare for. For a network, this means capturing latency, error rates, throughput, and — for the hardest problems — actual packet traces, so you can see and explain its behaviour instead of guessing.', 'Observability হলো একটি সিস্টেম ভেতরে কী করছে তা কেবল এর emit করা ডেটা থেকে—এর metrics, logs ও traces—বোঝার ক্ষমতা। Monitoring হলো সংকীর্ণ, সম্পর্কিত চর্চা: dashboard-এ পরিচিত signal দেখা ও একটি threshold পার হলে alert দেওয়া। সহজভাবে: monitoring বলে কিছু একটা ভুল; observability আপনাকে কেন জিজ্ঞাসা করতে দেয়, এমন প্রশ্নসহ যার জন্য প্রস্তুত থাকার কথা ভাবেননি। একটি নেটওয়ার্কের জন্য এর মানে latency, error rate, throughput এবং—সবচেয়ে কঠিন সমস্যার জন্য—আসল packet trace ধরা, যাতে অনুমান না করে এর আচরণ দেখা ও ব্যাখ্যা করা যায়।') },
        { p: l('The problem it solves is blindness. A distributed system spans many machines, networks, and services; when a request is slow or failing, the cause could be anywhere. Without instrumentation you are debugging in the dark, reproducing issues by luck. Observability is what turns "users say it’s slow sometimes" into "the p99 latency to the database tripled at 14:03 when this deploy went out."', 'এটি যে সমস্যা সমাধান করে তা হলো অন্ধত্ব। একটি distributed সিস্টেম অনেক মেশিন, নেটওয়ার্ক ও সার্ভিস জুড়ে থাকে; একটি রিকোয়েস্ট ধীর বা ব্যর্থ হলে কারণ যেকোনো জায়গায় হতে পারে। instrumentation ছাড়া আপনি অন্ধকারে debug করছেন, ভাগ্যে সমস্যা পুনরুৎপাদন করছেন। Observability-ই "ব্যবহারকারীরা বলে মাঝেমধ্যে ধীর"-কে "14:03-এ এই deploy বেরোনোর সময় ডেটাবেসে p99 latency তিন গুণ হলো"-তে পরিণত করে।') },
        { note: l('Think of the cockpit of a plane: dashboard gauges show speed, altitude, and fuel in real time, while a black-box recorder keeps a detailed history for after an incident. You cannot fly safely, or explain a fault later, without both. A network needs the same live gauges and recorded history.', 'একটি বিমানের ককপিট ভাবুন: dashboard গজ রিয়েল-টাইমে গতি, উচ্চতা ও জ্বালানি দেখায়, আর একটি black-box রেকর্ডার একটি ঘটনার পরের জন্য বিস্তারিত ইতিহাস রাখে। দুটো ছাড়া নিরাপদে ওড়া, বা পরে একটি ত্রুটি ব্যাখ্যা করা যায় না। একটি নেটওয়ার্কের একই live গজ ও রেকর্ড করা ইতিহাস দরকার।'), kind: 'tip' },
      ],
    },
    {
      h: l('How observability works: the pillars', 'observability কীভাবে কাজ করে: স্তম্ভগুলো'),
      blocks: [
        { p: l('Observability is built from three kinds of data, often called the three pillars, plus packet capture for deep network issues. Each answers a different question.', 'Observability তিন ধরনের ডেটা দিয়ে তৈরি, যাকে প্রায়ই তিনটি স্তম্ভ বলা হয়, সঙ্গে গভীর নেটওয়ার্ক সমস্যার জন্য packet capture। প্রতিটি ভিন্ন একটি প্রশ্নের উত্তর দেয়।') },
        { steps: [
          l('Instrument — your services and network devices emit metrics, logs, and traces as they run.', 'Instrument—আপনার সার্ভিস ও নেটওয়ার্ক ডিভাইস চলার সময় metrics, logs ও traces emit করে।'),
          l('Collect and store — agents ship that data to a time-series database, a log store, and a tracing backend.', 'Collect ও store—agent সেই ডেটা একটি time-series ডেটাবেস, একটি log store ও একটি tracing backend-এ পাঠায়।'),
          l('Visualize and alert — dashboards chart the trends and alerts fire when a metric crosses a threshold.', 'Visualize ও alert—dashboard প্রবণতা চিত্রিত করে ও একটি metric threshold পার হলে alert দেয়।'),
          l('Investigate — when something breaks, you pivot from a metric spike to the logs and traces around it, and if needed capture packets to see the raw truth on the wire.', 'Investigate—কিছু ভাঙলে, আপনি একটি metric spike থেকে তার আশপাশের logs ও traces-এ যান, ও দরকার হলে তারে কাঁচা সত্য দেখতে packet capture করেন।'),
        ] },
        { code: `# Capture 100 packets to/from a host into a file for later analysis
sudo tcpdump -i any host example.com -c 100 -w capture.pcap

# Break down exactly where a request spends its time
curl -o /dev/null -s -w "dns:%{time_namelookup} connect:%{time_connect} tls:%{time_appconnect} total:%{time_total}\\n" https://example.com`, caption: l('tcpdump records raw packets for the hardest, intermittent problems; curl -w breaks one request into DNS, connect, TLS, and total time so you can see which stage is slow.', 'tcpdump সবচেয়ে কঠিন, মাঝেমধ্যের সমস্যার জন্য কাঁচা প্যাকেট রেকর্ড করে; curl -w একটি রিকোয়েস্টকে DNS, connect, TLS ও মোট সময়ে ভাঙে যাতে কোন ধাপ ধীর তা দেখা যায়।') },
      ],
    },
    {
      h: l('Metrics, logs, traces, and packet captures', 'metrics, logs, traces ও packet capture'),
      blocks: [
        { table: {
          head: [l('Data', 'ডেটা'), l('What it is', 'এটি কী'), l('Best for', 'কার জন্য')],
          rows: [
            [l('Metrics', 'metrics'), l('Numeric time series (latency, error rate, throughput).', 'সংখ্যাসূচক time series (latency, error rate, throughput)।'), l('Dashboards, alerting, spotting trends cheaply.', 'dashboard, alerting, সস্তায় প্রবণতা ধরা।')],
            [l('Logs', 'logs'), l('Timestamped records of discrete events.', 'ঘটনার timestamp-যুক্ত রেকর্ড।'), l('The detail of what happened at a moment.', 'একটি মুহূর্তে কী ঘটেছে তার বিস্তারিত।')],
            [l('Traces', 'traces'), l('One request’s path across many services.', 'একটি রিকোয়েস্টের অনেক সার্ভিস জুড়ে পথ।'), l('Finding which hop or service adds the latency.', 'কোন hop বা সার্ভিস latency যোগ করে তা খোঁজা।')],
            [l('Packet capture', 'packet capture'), l('The raw bytes on the wire (pcap).', 'তারে কাঁচা byte (pcap)।'), l('Deep, rare network faults metrics cannot explain.', 'গভীর, বিরল নেটওয়ার্ক ত্রুটি যা metrics ব্যাখ্যা করতে পারে না।')],
          ],
        } },
        { p: l('You reach for them roughly in that order: metrics tell you something changed, logs and traces narrow down where and what, and a packet capture is the last resort for problems nothing else explains.', 'আপনি মোটামুটি সেই ক্রমে এদের ধরেন: metrics বলে কিছু বদলেছে, logs ও traces সংকীর্ণ করে কোথায় ও কী, আর packet capture হলো এমন সমস্যার শেষ উপায় যা আর কিছুই ব্যাখ্যা করে না।') },
      ],
    },
    {
      h: l('The signals worth tracking', 'যে signal ট্র্যাক করা দরকার'),
      blocks: [
        { p: l('You cannot record everything affordably, so focus on the signals that reveal user-facing health. Google’s SRE practice highlights four "golden signals," which map neatly onto networks.', 'সবকিছু সাশ্রয়ীভাবে রেকর্ড করা যায় না, তাই ব্যবহারকারী-মুখী স্বাস্থ্য প্রকাশ করে এমন signal-এ মনোযোগ দিন। Google-এর SRE চর্চা চারটি "golden signal" তুলে ধরে, যা নেটওয়ার্কে সুন্দরভাবে মেলে।') },
        { list: [
          l('Latency — how long requests take, tracked at percentiles like p50 and p99, not just the average which hides the slow tail.', 'Latency—রিকোয়েস্টে কত সময় লাগে, p50 ও p99-এর মতো percentile-এ ট্র্যাক করা, শুধু গড় নয় যা ধীর লেজ লুকায়।'),
          l('Traffic / throughput — how much demand the system is handling (requests per second, bits per second).', 'Traffic / throughput—সিস্টেম কতটা চাহিদা সামলাচ্ছে (প্রতি সেকেন্ডে রিকোয়েস্ট, প্রতি সেকেন্ডে bit)।'),
          l('Errors — the rate of failed requests, dropped packets, timeouts, and retransmissions.', 'Errors—ব্যর্থ রিকোয়েস্ট, হারানো প্যাকেট, timeout ও retransmission-এর হার।'),
          l('Saturation — how full the resource is (link utilization, connection table, CPU) so you see trouble building before it breaks.', 'Saturation—রিসোর্স কতটা পূর্ণ (link utilization, connection table, CPU) যাতে ভাঙার আগেই সমস্যা তৈরি হতে দেখেন।'),
        ] },
      ],
    },
    {
      h: l('When and where to invest in it', 'কখন ও কোথায় এতে বিনিয়োগ করবেন'),
      blocks: [
        { p: l('Set up observability before you need it, not after. The trade-off is real: more telemetry speeds diagnosis, but capturing everything costs storage and processing and can raise privacy concerns, since packet captures and logs may contain personal data. So instrument the golden signals everywhere, keep logs and traces at a sensible retention, and reach for full packet capture selectively — on the hard, intermittent problems where cheaper data has run out of answers.', 'observability দরকারের আগে সেট আপ করুন, পরে নয়। ট্রেড-অফ আসল: বেশি telemetry নির্ণয় দ্রুত করে, কিন্তু সবকিছু ধরা storage ও processing খরচ করে ও গোপনীয়তার উদ্বেগ বাড়াতে পারে, কারণ packet capture ও log-এ ব্যক্তিগত ডেটা থাকতে পারে। তাই সব জায়গায় golden signal instrument করুন, logs ও traces একটি যুক্তিসঙ্গত retention-এ রাখুন, ও পূর্ণ packet capture বেছে বেছে ধরুন—কঠিন, মাঝেমধ্যের সমস্যায় যেখানে সস্তা ডেটার উত্তর ফুরিয়েছে।') },
        { note: l('The worst time to add monitoring is after an outage — because the one incident you most needed to see has already happened unrecorded. Instrument first so the next incident is captured.', 'monitoring যোগ করার সবচেয়ে খারাপ সময় একটি outage-এর পরে—কারণ যে একটি ঘটনা দেখা সবচেয়ে দরকার ছিল তা ইতিমধ্যে রেকর্ড ছাড়া ঘটে গেছে। আগে instrument করুন যাতে পরের ঘটনা ধরা পড়ে।'), kind: 'warn' },
      ],
    },
    {
      h: l('Common mistakes', 'সাধারণ ভুল'),
      blocks: [
        { list: [
          l('Only adding monitoring after an outage, so the incident you most needed to see went unrecorded.', 'শুধু outage-এর পরে monitoring যোগ করা, ফলে যে ঘটনা দেখা সবচেয়ে দরকার ছিল তা রেকর্ড হয়নি।'),
          l('Watching only averages. A healthy average can hide a terrible p99 that a slice of users feels on every request.', 'শুধু গড় দেখা। একটি সুস্থ গড় একটি ভয়ানক p99 লুকাতে পারে যা ব্যবহারকারীদের একটি অংশ প্রতিটি রিকোয়েস্টে অনুভব করে।'),
          l('Capturing so much that storage costs explode and real signals drown in noise — collect with intent, not everything.', 'এত বেশি ধরা যে storage খরচ বিস্ফোরিত হয় ও আসল signal শব্দে ডুবে যায়—সবকিছু নয়, উদ্দেশ্য নিয়ে সংগ্রহ করুন।'),
          l('Setting alerts that fire constantly, training the team to ignore them so the one real alert is missed too.', 'এমন alert সেট করা যা অবিরাম বাজে, দলকে সেগুলো উপেক্ষা করতে শেখায় যাতে একটি আসল alert-ও মিস হয়।'),
        ] },
      ],
    },
    {
      h: l('Remember in one line', 'এক লাইনে মনে রাখুন'),
      blocks: [
        { list: [
          l('Monitoring says something is wrong; observability lets you ask why, from metrics, logs, and traces.', 'monitoring বলে কিছু ভুল; observability আপনাকে metrics, logs ও traces থেকে কেন জিজ্ঞাসা করতে দেয়।'),
          l('Track the golden signals — latency, traffic, errors, saturation — and keep packet captures for the hard cases.', 'golden signal ট্র্যাক করুন—latency, traffic, errors, saturation—ও কঠিন কেসের জন্য packet capture রাখুন।'),
          l('Instrument before the outage, watch percentiles not averages, and collect with intent to control cost and privacy.', 'outage-এর আগে instrument করুন, গড় নয় percentile দেখুন, ও খরচ ও গোপনীয়তা নিয়ন্ত্রণে উদ্দেশ্য নিয়ে সংগ্রহ করুন।'),
        ] },
      ],
    },
  ],
}
