// Deep, bilingual (English / Bangla) teaching guides for the Computer Networking
// course — link-layer switching, ARP, and the internet layer (IP, subnetting,
// routing). Shape mirrors app/course-guides.js: each guide is an array of
// sections { h, blocks }, rendered by GuideBlock in app/LearningApp.js.
// Facts (definitions, analogies, trade-offs, reference tables) are drawn from
// app/courses/networking.js.

const l = (en, bn) => ({ en, bn })

export default {
  // ── cn-switching · Switches & the LAN ─────────────────────────────────────
  'cn-switching': [
    {
      h: l('What is a network switch?', 'নেটওয়ার্ক সুইচ কী?'),
      blocks: [
        { p: l('A network switch is the box that ties a LAN (Local Area Network) together. Every computer, printer, and wireless access point in a home or office plugs into a switch, and the switch has one job: move Ethernet frames from the device that sent them to the exact device they are addressed to. It works at Layer 2 (the data link layer) and makes every decision using MAC addresses — the permanent hardware addresses burned into each network card — never IP addresses.', 'নেটওয়ার্ক সুইচ হলো সেই যন্ত্র যা একটি LAN (Local Area Network)-কে একসঙ্গে বাঁধে। বাড়ি বা অফিসের প্রতিটি কম্পিউটার, প্রিন্টার ও wireless access point একটি সুইচে যুক্ত হয়, আর সুইচের একটাই কাজ: যে ডিভাইস frame পাঠিয়েছে সেখান থেকে যে ডিভাইসের ঠিকানায় পাঠানো হয়েছে ঠিক সেখানে Ethernet frame পৌঁছে দেওয়া। এটি Layer 2 (data link layer)-এ কাজ করে এবং প্রতিটি সিদ্ধান্ত নেয় MAC address দিয়ে—প্রতিটি network card-এ বসানো স্থায়ী hardware address—কখনো IP address দিয়ে নয়।') },
        { p: l('The problem a switch solves is delivering traffic without wasting the network. An older device called a hub simply copied every frame out of every port, so if ten machines shared a hub, all ten heard every conversation — slow, and anyone could eavesdrop. A switch is smarter: it learns where each device lives and sends each frame down only the one cable that reaches its destination, so the rest of the network stays quiet and private.', 'সুইচ যে সমস্যা সমাধান করে তা হলো নেটওয়ার্ক অপচয় না করে ট্রাফিক পৌঁছে দেওয়া। hub নামের পুরোনো একটি যন্ত্র প্রতিটি frame প্রতিটি port-এ কপি করে পাঠাত, তাই দশটি মেশিন একটি hub শেয়ার করলে দশটিই প্রতিটি কথোপকথন শুনত—ধীর, আর যে কেউ আড়ি পাততে পারত। সুইচ চতুর: এটি শেখে কোন ডিভাইস কোথায় আছে এবং প্রতিটি frame শুধু সেই একটি তারে পাঠায় যা তার গন্তব্যে পৌঁছায়, ফলে নেটওয়ার্কের বাকি অংশ শান্ত ও ব্যক্তিগত থাকে।') },
        { note: l('Think of a switch as a smart mail sorter in an office. At first it does not know who sits where, but every time a desk sends out a letter it notes "that person is at desk 4." Soon it can drop each letter straight on the right desk instead of shouting it across the whole floor.', 'সুইচকে একটি অফিসের স্মার্ট মেইল সর্টার ভাবুন। প্রথমে এটি জানে না কে কোথায় বসে, কিন্তু প্রতিবার কোনো ডেস্ক একটি চিঠি পাঠালে এটি টুকে রাখে "ওই ব্যক্তি ৪ নম্বর ডেস্কে।" শীঘ্রই এটি পুরো ফ্লোরে চিৎকার না করে প্রতিটি চিঠি সরাসরি সঠিক ডেস্কে রাখতে পারে।'), kind: 'tip' },
      ],
    },
    {
      h: l('How a switch learns: the MAC address table', 'সুইচ কীভাবে শেখে: MAC address table'),
      blocks: [
        { p: l('A switch is not configured by hand — it teaches itself by watching traffic. Every Ethernet frame carries a source MAC (who sent it) and a destination MAC (where it is going), and the switch reads both on every frame.', 'সুইচ হাতে কনফিগার করতে হয় না—এটি ট্রাফিক দেখে নিজেই শেখে। প্রতিটি Ethernet frame একটি source MAC (কে পাঠাল) ও একটি destination MAC (কোথায় যাচ্ছে) বহন করে, আর সুইচ প্রতিটি frame-এ দুটোই পড়ে।') },
        { steps: [
          l('A frame arrives on a port. The switch reads its source MAC and records "this MAC lives on this port" in its MAC address table (also called a CAM table).', 'একটি frame একটি port-এ আসে। সুইচ তার source MAC পড়ে এবং তার MAC address table (যাকে CAM table-ও বলে)-এ লিখে রাখে "এই MAC এই port-এ থাকে।"'),
          l('It then looks up the frame’s destination MAC in that same table.', 'তারপর সেই একই table-এ frame-এর destination MAC খোঁজে।'),
          l('If the destination is known, it forwards the frame out only that one port (a unicast) — no other device sees it.', 'destination জানা থাকলে এটি frame শুধু সেই একটি port-এ পাঠায় (একটি unicast)—আর কোনো ডিভাইস দেখে না।'),
          l('If the destination is unknown, it floods the frame out every port except the one it arrived on, then learns the location from wherever the reply comes back.', 'destination অজানা হলে যে port-এ এসেছে সেটি বাদে প্রতিটি port-এ frame ছড়ায় (flood), তারপর যেখান থেকে উত্তর ফিরে আসে সেখান থেকে অবস্থান শেখে।'),
          l('Broadcast frames (destination ff:ff:ff:ff:ff:ff) are always flooded to every port, because they are meant for everyone on the LAN.', 'broadcast frame (destination ff:ff:ff:ff:ff:ff) সবসময় প্রতিটি port-এ ছড়ানো হয়, কারণ এগুলো LAN-এর সবার জন্য।'),
        ] },
        { code: `# A switch's MAC address table (CAM table)
Port    MAC address           Type
-----   -------------------   -------
  1     aa:bb:cc:00:11:22     dynamic
  2     aa:bb:cc:00:33:44     dynamic
  3     aa:bb:cc:00:55:66     dynamic

# A frame for aa:bb:cc:00:33:44 is sent out Port 2 ONLY.
# An unknown or broadcast destination is flooded to all ports.

# Linux: view the bridge forwarding database
bridge fdb show`, caption: l('The switch fills this table itself by reading the source MAC of every frame. Entries age out after a timeout (often ~5 minutes) so the table follows devices that move or unplug.', 'সুইচ প্রতিটি frame-এর source MAC পড়ে এই table নিজেই ভরে। entry গুলো একটি timeout-এর পর মুছে যায় (প্রায়ই ~৫ মিনিট) যাতে ডিভাইস সরলে বা খুলে ফেললে table হালনাগাদ থাকে।') },
      ],
    },
    {
      h: l('Hub vs switch vs router', 'Hub বনাম switch বনাম router'),
      blocks: [
        { p: l('These three devices are constantly confused. The clearest way to tell them apart is to ask what each one looks at to make a decision, and where it sends the result.', 'এই তিনটি যন্ত্র প্রায়ই গুলিয়ে ফেলা হয়। এদের আলাদা করার সবচেয়ে স্পষ্ট উপায় হলো জিজ্ঞেস করা—সিদ্ধান্ত নিতে প্রতিটি কী দেখে, আর ফলাফল কোথায় পাঠায়।') },
        { table: {
          head: [l('Device', 'যন্ত্র'), l('Layer', 'Layer'), l('Decides by', 'কী দিয়ে ঠিক করে'), l('Sends a frame to', 'frame পাঠায়')],
          rows: [
            [l('Hub', 'Hub'), l('Layer 1', 'Layer 1'), l('Nothing — copies blindly', 'কিছুই না—অন্ধভাবে কপি'), l('Every port', 'প্রতিটি port')],
            [l('Switch', 'Switch'), l('Layer 2', 'Layer 2'), l('MAC address', 'MAC address'), l('Only the destination’s port', 'শুধু destination-এর port')],
            [l('Router', 'Router'), l('Layer 3', 'Layer 3'), l('IP address', 'IP address'), l('The next network / hop', 'পরবর্তী network / hop')],
          ],
        } },
      ],
    },
    {
      h: l('Collision domains and broadcast domains', 'Collision domain ও broadcast domain'),
      blocks: [
        { p: l('A switch gives every port its own collision domain, so two devices never have to wait for each other the way they did on a hub — each link can send and receive at the same time (full duplex) at full speed. But every port on a plain switch is still in one shared broadcast domain: a broadcast from any device reaches all of them. To split a network into separate broadcast domains you use VLANs (virtual LANs) on a managed switch, or a router.', 'সুইচ প্রতিটি port-কে নিজস্ব collision domain দেয়, তাই hub-এর মতো দুটি ডিভাইসকে একে অপরের জন্য অপেক্ষা করতে হয় না—প্রতিটি link একসঙ্গে পূর্ণ গতিতে পাঠাতে ও নিতে পারে (full duplex)। কিন্তু সাধারণ সুইচের প্রতিটি port তবু একটি শেয়ার্ড broadcast domain-এ থাকে: যেকোনো ডিভাইসের broadcast সবার কাছে পৌঁছায়। নেটওয়ার্ককে আলাদা broadcast domain-এ ভাগ করতে managed switch-এ VLAN (virtual LAN) বা একটি router ব্যবহার করুন।') },
      ],
    },
    {
      h: l('When and where to use a switch', 'কখন ও কোথায় সুইচ ব্যবহার করবেন'),
      blocks: [
        { p: l('Reach for a switch any time you need to connect multiple wired devices inside one network — a home, an office floor, or a rack of servers. It is the default building block of a LAN. Use a managed switch (with VLANs, port security, and monitoring) when you need to segment traffic or control which device may use which port; an unmanaged switch is fine for a simple home setup where you only need more ports.', 'একই নেটওয়ার্কের ভেতরে একাধিক তারযুক্ত ডিভাইস যুক্ত করতে হলেই সুইচ নিন—বাড়ি, অফিস ফ্লোর, বা সার্ভারের একটি rack। এটি LAN-এর মূল building block। ট্রাফিক আলাদা করতে বা কোন ডিভাইস কোন port ব্যবহার করবে নিয়ন্ত্রণে managed switch (VLAN, port security ও monitoring সহ) নিন; শুধু বেশি port দরকার এমন সাধারণ বাড়ির সেটআপে unmanaged switch-ই যথেষ্ট।') },
        { p: l('Do not reach for a switch when you need to connect two different networks or send traffic to the internet — that is a router’s job. A switch has no concept of an IP address or a default gateway; it cannot move a frame beyond the local network.', 'দুটি ভিন্ন নেটওয়ার্ক যুক্ত করতে বা ইন্টারনেটে ট্রাফিক পাঠাতে সুইচ নেবেন না—সেটা router-এর কাজ। সুইচ IP address বা default gateway কী তা জানে না; এটি frame-কে লোকাল নেটওয়ার্কের বাইরে নিতে পারে না।') },
      ],
    },
    {
      h: l('Common mistakes', 'সাধারণ ভুল'),
      blocks: [
        { list: [
          l('Confusing a switch (Layer 2, MAC-based) with a router (Layer 3, IP-based). A switch moves frames inside one LAN; a router moves packets between LANs.', 'সুইচ (Layer 2, MAC-ভিত্তিক) ও router (Layer 3, IP-ভিত্তিক) গুলিয়ে ফেলা। সুইচ এক LAN-এর ভেতরে frame সরায়; router LAN-এর মধ্যে packet সরায়।'),
          l('Expecting a switch to route to the internet. It only forwards within the local network; off-network traffic must go to the default gateway.', 'সুইচ ইন্টারনেটে route করবে আশা করা। এটি শুধু লোকাল নেটওয়ার্কের ভেতরে পাঠায়; অফ-নেটওয়ার্ক ট্রাফিক default gateway-তে যেতে হয়।'),
          l('Assuming a plain switch isolates broadcasts. All ports share one broadcast domain unless you add VLANs.', 'সাধারণ সুইচ broadcast আলাদা করে ধরে নেওয়া। VLAN যোগ না করলে সব port একটি broadcast domain শেয়ার করে।'),
          l('Cabling two switches into a loop without Spanning Tree Protocol (STP). Broadcasts then circle forever and flood the network — a "broadcast storm" that can take the whole LAN down.', 'Spanning Tree Protocol (STP) ছাড়া দুটি সুইচকে লুপে তার দিয়ে জোড়া। তখন broadcast চিরকাল ঘুরতে থাকে ও নেটওয়ার্ক প্লাবিত করে—একটি "broadcast storm" যা পুরো LAN ফেলে দিতে পারে।'),
        ] },
      ],
    },
    {
      h: l('Remember in one line', 'এক লাইনে মনে রাখুন'),
      blocks: [
        { list: [
          l('A switch forwards Ethernet frames by MAC address, sending each one only to the port where its destination lives.', 'সুইচ Ethernet frame MAC address দিয়ে পাঠায়, প্রতিটি শুধু সেই port-এ যেখানে তার destination থাকে।'),
          l('It learns device locations automatically by reading the source MAC of every frame; unknown or broadcast frames are flooded to all ports.', 'এটি প্রতিটি frame-এর source MAC পড়ে ডিভাইসের অবস্থান নিজে শেখে; অজানা বা broadcast frame সব port-এ ছড়ানো হয়।'),
          l('Switch = inside one LAN (Layer 2, MAC); router = between networks (Layer 3, IP).', 'Switch = এক LAN-এর ভেতরে (Layer 2, MAC); router = নেটওয়ার্কের মধ্যে (Layer 3, IP)।'),
        ] },
      ],
    },
  ],

  // ── cn-arp · ARP: IP to MAC ────────────────────────────────────────────────
  'cn-arp': [
    {
      h: l('What is ARP?', 'ARP কী?'),
      blocks: [
        { p: l('ARP (Address Resolution Protocol) answers one very specific question: "I know the IP address I want to reach on my local network — but what is its MAC address?" It exists because two different addressing systems have to cooperate on every LAN. Your applications and the IP layer think in IP addresses, but the switch and network card that actually put a frame on the wire only understand MAC addresses. ARP is the translator between Layer 3 (IP) and Layer 2 (MAC).', 'ARP (Address Resolution Protocol) একটি খুব নির্দিষ্ট প্রশ্নের উত্তর দেয়: "আমি জানি আমার লোকাল নেটওয়ার্কে কোন IP address-এ পৌঁছাতে চাই—কিন্তু তার MAC address কী?" এটি আছে কারণ প্রতিটি LAN-এ দুটি ভিন্ন addressing ব্যবস্থাকে সহযোগিতা করতে হয়। আপনার application ও IP layer IP address-এ ভাবে, কিন্তু যে switch ও network card আসলে তারে frame পাঠায় তারা শুধু MAC address বোঝে। ARP হলো Layer 3 (IP) ও Layer 2 (MAC)-এর মধ্যে অনুবাদক।') },
        { p: l('The problem is concrete: when your computer wants to send a packet to 192.168.1.20 on the same LAN, it already has the destination IP — but Ethernet cannot deliver anything without a destination MAC. ARP fills that gap: given an IP on the local link, it discovers the matching MAC so the frame can be built and actually delivered.', 'সমস্যাটি বাস্তব: আপনার কম্পিউটার একই LAN-এ 192.168.1.20-তে একটি packet পাঠাতে চাইলে destination IP তার কাছে আছে—কিন্তু destination MAC ছাড়া Ethernet কিছুই পৌঁছাতে পারে না। ARP এই ফাঁক পূরণ করে: লোকাল link-এ একটি IP দিলে এটি মিলে যাওয়া MAC খুঁজে বের করে, যাতে frame তৈরি করে আসলে পৌঁছানো যায়।') },
        { note: l('Imagine you walk into a room and call out, "Who has ID number 192.168.1.20?" Everyone hears you, but only the person with that ID raises a hand and says, "That’s me, and here is my badge (MAC)." Now you can hand your letter straight to them.', 'ভাবুন আপনি একটি ঘরে ঢুকে চিৎকার করলেন, "১৯২.১৬৮.১.২০ ID কার?" সবাই শোনে, কিন্তু শুধু সেই ID-র মালিক হাত তুলে বলে, "এটা আমি, আর এই আমার badge (MAC)।" এখন আপনি সরাসরি তার হাতে চিঠি দিতে পারেন।'), kind: 'tip' },
      ],
    },
    {
      h: l('How ARP works, step by step', 'ARP কীভাবে কাজ করে, ধাপে ধাপে'),
      blocks: [
        { steps: [
          l('Your host first checks its ARP cache — a short-lived table of IP→MAC pairs it already knows. If the answer is there, it skips straight to sending.', 'আপনার host প্রথমে তার ARP cache যাচাই করে—আগে থেকে জানা IP→MAC জোড়ার একটি স্বল্পস্থায়ী table। উত্তর থাকলে সরাসরি পাঠানোয় চলে যায়।'),
          l('If not, it broadcasts an ARP request to the whole LAN (destination ff:ff:ff:ff:ff:ff): "Who has 192.168.1.20? Tell 192.168.1.10."', 'না থাকলে এটি পুরো LAN-এ একটি ARP request broadcast করে (destination ff:ff:ff:ff:ff:ff): "১৯২.১৬৮.১.২০ কার? ১৯২.১৬৮.১.১০-কে বলো।"'),
          l('Every device sees the broadcast, but only the one that owns 192.168.1.20 replies.', 'প্রতিটি ডিভাইস broadcast দেখে, কিন্তু শুধু ১৯২.১৬৮.১.২০-এর মালিক উত্তর দেয়।'),
          l('That device sends a unicast ARP reply straight back: "192.168.1.20 is at aa:bb:cc:dd:ee:ff."', 'সেই ডিভাইস সরাসরি একটি unicast ARP reply ফেরত পাঠায়: "১৯২.১৬৮.১.২০ আছে aa:bb:cc:dd:ee:ff-এ।"'),
          l('Your host stores the pair in its ARP cache (typically for a few minutes) and finally sends the real frame to that MAC.', 'আপনার host জোড়াটি তার ARP cache-এ রাখে (সাধারণত কয়েক মিনিট) এবং শেষে আসল frame সেই MAC-এ পাঠায়।'),
        ] },
        { code: `# View your ARP cache (the IP -> MAC table your host has learned)
arp -a
# ? (192.168.1.20) at aa:bb:cc:dd:ee:ff [ether] on eth0
# ? (192.168.1.1)  at 11:22:33:44:55:66 [ether] on eth0   <- the gateway

# Modern Linux equivalent
ip neigh show
# 192.168.1.20 dev eth0 lladdr aa:bb:cc:dd:ee:ff REACHABLE`, caption: l('If the destination IP is on another network, ARP is used to find the MAC of the default gateway instead, and the packet is handed to the router to be routed onward.', 'destination IP অন্য নেটওয়ার্কে হলে ARP বদলে default gateway-এর MAC খুঁজতে ব্যবহৃত হয়, এবং packet router-কে দেওয়া হয় যাতে সেটি আরও route করে।') },
      ],
    },
    {
      h: l('ARP request vs ARP reply', 'ARP request বনাম ARP reply'),
      blocks: [
        { table: {
          head: [l('Aspect', 'দিক'), l('ARP request', 'ARP request'), l('ARP reply', 'ARP reply')],
          rows: [
            [l('Sent to', 'পাঠানো হয়'), l('Broadcast — every device on the LAN', 'Broadcast—LAN-এর প্রতিটি ডিভাইস'), l('Unicast — just the asker', 'Unicast—শুধু যে জিজ্ঞেস করেছে')],
            [l('Says', 'বলে'), l('"Who has this IP?"', '"এই IP কার?"'), l('"This IP is at this MAC."', '"এই IP এই MAC-এ।"')],
            [l('Who sends it', 'কে পাঠায়'), l('The device that needs the MAC', 'যে ডিভাইসের MAC দরকার'), l('The device that owns the IP', 'যে ডিভাইস IP-র মালিক')],
            [l('Carries', 'বহন করে'), l('Target IP, sender’s IP + MAC', 'target IP, প্রেরকের IP + MAC'), l('Target IP and its MAC', 'target IP ও তার MAC')],
          ],
        } },
        { p: l('The ARP cache is why ARP is fast: after the first exchange, all repeat traffic to the same host needs no broadcast at all. Entries expire after a short time so the table follows devices that move or change network cards. You can inspect it with arp -a (or ip neigh) and clear a stale entry when troubleshooting.', 'ARP cache-ই ARP-কে দ্রুত করে: প্রথম বিনিময়ের পর একই host-এ পরবর্তী সব ট্রাফিকে কোনো broadcast লাগে না। entry গুলো অল্প সময়ে মেয়াদ শেষ হয় যাতে ডিভাইস সরলে বা network card বদলালে table তা অনুসরণ করে। arp -a (বা ip neigh) দিয়ে দেখতে পারেন এবং troubleshooting-এ পুরোনো entry মুছতে পারেন।') },
      ],
    },
    {
      h: l('Same LAN vs another network', 'একই LAN বনাম অন্য নেটওয়ার্ক'),
      blocks: [
        { p: l('A subtle but crucial point: ARP only ever resolves addresses that live on your own local network — it cannot reach across a router. What your machine actually ARPs for depends entirely on where the destination IP sits.', 'একটি সূক্ষ্ম কিন্তু জরুরি বিষয়: ARP সবসময় শুধু আপনার নিজের লোকাল নেটওয়ার্কে থাকা ঠিকানা সমাধান করে—এটি একটি router পার হতে পারে না। আপনার মেশিন আসলে কীসের জন্য ARP করে তা পুরোপুরি নির্ভর করে destination IP কোথায় আছে তার ওপর।') },
        { list: [
          l('Destination on the same subnet → your host ARPs for the destination’s own IP, gets its MAC, and sends the frame straight to it.', 'Destination একই subnet-এ → আপনার host destination-এর নিজের IP-এর জন্য ARP করে, তার MAC পায়, ও সরাসরি frame পাঠায়।'),
          l('Destination on another network → your host cannot ARP for a remote IP (the broadcast would never reach it), so it ARPs for the default gateway’s IP instead, gets the router’s MAC, and sends the frame there. The router then forwards the packet onward.', 'Destination অন্য নেটওয়ার্কে → আপনার host একটি দূরের IP-এর জন্য ARP করতে পারে না (broadcast সেখানে কখনো পৌঁছাবে না), তাই এটি বদলে default gateway-এর IP-এর জন্য ARP করে, router-এর MAC পায়, ও সেখানে frame পাঠায়। তারপর router packet-টি আরও পাঠায়।'),
        ] },
        { p: l('This is why, along any path, the source and destination IP addresses stay the same end to end, but the MAC addresses are rewritten at every hop. ARP supplies the MAC for the next hop only — never for the far-away final destination.', 'এ কারণেই যেকোনো পথে source ও destination IP address end-to-end একই থাকে, কিন্তু MAC address প্রতি hop-এ নতুন করে লেখা হয়। ARP শুধু পরের hop-এর MAC দেয়—কখনো দূরের চূড়ান্ত destination-এর নয়।') },
      ],
    },
    {
      h: l('When and where ARP matters', 'কখন ও কোথায় ARP গুরুত্বপূর্ণ'),
      blocks: [
        { p: l('ARP runs constantly and invisibly on every IPv4 LAN — you rarely invoke it yourself, but it is happening under every ping, web request, and file copy on your local network. It becomes something you actively think about in two situations. First, troubleshooting: if a host on your LAN is unreachable, checking the ARP cache tells you whether the two machines have even discovered each other’s MAC. Second, security: because ARP blindly trusts any reply, an attacker can send forged replies and quietly redirect traffic.', 'ARP প্রতিটি IPv4 LAN-এ অবিরত ও অদৃশ্যভাবে চলে—আপনি নিজে একে কমই ডাকেন, কিন্তু আপনার লোকাল নেটওয়ার্কে প্রতিটি ping, web request ও file copy-র নিচে এটি ঘটছে। দুটি পরিস্থিতিতে এটি নিয়ে সক্রিয়ভাবে ভাবতে হয়। প্রথমত, troubleshooting: আপনার LAN-এ কোনো host-এ পৌঁছানো না গেলে ARP cache যাচাই বলে দেয় দুই মেশিন একে অপরের MAC আদৌ খুঁজে পেয়েছে কি না। দ্বিতীয়ত, নিরাপত্তা: ARP যেহেতু অন্ধভাবে যেকোনো reply বিশ্বাস করে, আক্রমণকারী জাল reply পাঠিয়ে নীরবে ট্রাফিক ঘুরিয়ে দিতে পারে।') },
        { note: l('ARP has no authentication. Any device can claim any IP, so on an untrusted network an attacker can poison ARP caches ("I am the gateway") to become a man-in-the-middle. Defences include Dynamic ARP Inspection on managed switches and always encrypting with TLS so intercepted traffic stays unreadable.', 'ARP-তে কোনো authentication নেই। যেকোনো ডিভাইস যেকোনো IP দাবি করতে পারে, তাই অবিশ্বস্ত নেটওয়ার্কে আক্রমণকারী ARP cache বিষিয়ে ("আমিই gateway") man-in-the-middle হতে পারে। প্রতিরক্ষায় আছে managed switch-এ Dynamic ARP Inspection এবং সবসময় TLS দিয়ে এনক্রিপ্ট করা যাতে আটকানো ট্রাফিকও অপাঠ্য থাকে।'), kind: 'warn' },
      ],
    },
    {
      h: l('Common mistakes', 'সাধারণ ভুল'),
      blocks: [
        { list: [
          l('Assuming ARP works across the internet. ARP only resolves addresses on the local link; for a remote host your machine ARPs for the gateway, not the destination.', 'ARP ইন্টারনেট জুড়ে কাজ করে ধরে নেওয়া। ARP শুধু লোকাল link-এ ঠিকানা সমাধান করে; দূরের host-এর জন্য আপনার মেশিন destination নয়, gateway-এর জন্য ARP করে।'),
          l('Forgetting ARP when debugging local connectivity — a wrong or stale ARP entry can make a perfectly healthy host look unreachable.', 'লোকাল সংযোগ debug করার সময় ARP ভুলে যাওয়া—একটি ভুল বা পুরোনো ARP entry একটি সম্পূর্ণ সুস্থ host-কে অপৌঁছনীয় দেখাতে পারে।'),
          l('Trusting ARP on a shared or public network. Because any reply is accepted, ARP spoofing is easy; never assume the LAN itself is safe.', 'শেয়ার্ড বা পাবলিক নেটওয়ার্কে ARP বিশ্বাস করা। যেকোনো reply গ্রহণ করা হয় বলে ARP spoofing সহজ; কখনো ধরে নেবেন না LAN নিজেই নিরাপদ।'),
          l('Confusing ARP with DNS. DNS maps names to IPs; ARP maps IPs to MACs. They live at different layers and solve different problems.', 'ARP ও DNS গুলিয়ে ফেলা। DNS নামকে IP-তে; ARP IP-কে MAC-এ মেলায়। এরা ভিন্ন layer-এ থাকে ও ভিন্ন সমস্যা সমাধান করে।'),
        ] },
      ],
    },
    {
      h: l('Remember in one line', 'এক লাইনে মনে রাখুন'),
      blocks: [
        { list: [
          l('ARP turns a known local IP into the MAC address needed to actually deliver an Ethernet frame.', 'ARP একটি জানা লোকাল IP-কে সেই MAC address-এ পরিণত করে যা Ethernet frame আসলে পৌঁছাতে দরকার।'),
          l('It works by broadcasting "who has this IP?" and caching the unicast reply for next time.', 'এটি "এই IP কার?" broadcast করে কাজ করে এবং পরের বারের জন্য unicast reply cache করে রাখে।'),
          l('ARP is local-only and unauthenticated (IPv4); IPv6 replaces it with NDP (Neighbor Discovery Protocol).', 'ARP শুধু লোকাল ও authentication-হীন (IPv4); IPv6 এর বদলে NDP (Neighbor Discovery Protocol) ব্যবহার করে।'),
        ] },
      ],
    },
  ],

  // ── cn-ip · IP addresses (IPv4 & IPv6) ─────────────────────────────────────
  'cn-ip': [
    {
      h: l('What is an IP address?', 'IP address কী?'),
      blocks: [
        { p: l('An IP (Internet Protocol) address is the number that identifies a device on a network so that packets can be routed to it. It is the addressing system of the internet layer (Layer 3), and it is what lets a packet leave your laptop and find its way across dozens of networks to a server on the other side of the planet. Where a MAC address is fixed to a network card and only works on the local link, an IP address is assigned to a device on a network and is what makes global routing possible.', 'IP (Internet Protocol) address হলো সেই সংখ্যা যা একটি নেটওয়ার্কে একটি ডিভাইস চেনায় যাতে packet তার কাছে route করা যায়। এটি internet layer (Layer 3)-এর addressing ব্যবস্থা, আর এটিই একটি packet-কে আপনার ল্যাপটপ ছেড়ে কয়েক ডজন নেটওয়ার্ক পেরিয়ে গ্রহের অন্য পাশের একটি সার্ভারে পথ খুঁজে দিতে দেয়। MAC address যেখানে একটি network card-এ স্থির ও শুধু লোকাল link-এ কাজ করে, IP address একটি নেটওয়ার্কে একটি ডিভাইসকে বরাদ্দ করা হয় এবং এটিই global routing সম্ভব করে।') },
        { p: l('The problem it solves is universal reachability. Without a common addressing scheme, machines on different networks could never find each other. IP gives every reachable device an address in a single, worldwide format, and makes that address routable — routers everywhere know how to move a packet one hop closer to any IP, no matter where it lives.', 'এটি যে সমস্যা সমাধান করে তা হলো সর্বজনীন পৌঁছানো। একটি সাধারণ addressing স্কিম ছাড়া ভিন্ন নেটওয়ার্কের মেশিন কখনো একে অপরকে খুঁজে পেত না। IP প্রতিটি পৌঁছনীয় ডিভাইসকে একটি একক, বিশ্বব্যাপী ফরম্যাটে ঠিকানা দেয় এবং সেই ঠিকানাকে routable করে—সর্বত্র router জানে যেকোনো IP-এর দিকে packet কীভাবে এক hop কাছে সরাতে হয়, সেটি যেখানেই থাকুক।') },
        { note: l('An IP address is like a postal address for your machine. Just as a letter needs house, street, city, and country to be delivered from anywhere, a packet needs an IP to be delivered across the internet. IPv4 is a short address; IPv6 is a much longer one, invented because the world ran out of short ones.', 'IP address আপনার মেশিনের একটি ডাক ঠিকানার মতো। যেকোনো জায়গা থেকে একটি চিঠি পৌঁছাতে যেমন বাড়ি, রাস্তা, শহর ও দেশ লাগে, তেমনি একটি packet ইন্টারনেট জুড়ে পৌঁছাতে একটি IP লাগে। IPv4 একটি ছোট ঠিকানা; IPv6 অনেক লম্বা, তৈরি হয়েছে কারণ পৃথিবীতে ছোটগুলো ফুরিয়ে গেছে।'), kind: 'tip' },
      ],
    },
    {
      h: l('IPv4 vs IPv6: how the addresses look', 'IPv4 বনাম IPv6: ঠিকানা দেখতে কেমন'),
      blocks: [
        { p: l('There are two versions in use. IPv4 uses 32 bits, written as four decimal numbers 0–255 separated by dots, e.g. 192.168.1.10. That gives about 4.3 billion addresses — which sounded infinite in the 1980s and is nearly exhausted today. IPv6 uses 128 bits, written as eight groups of hexadecimal separated by colons, e.g. 2001:db8:85a3::8a2e:370:7334, giving a practically unlimited number of addresses.', 'দুটি সংস্করণ ব্যবহারে আছে। IPv4 ৩২ বিট ব্যবহার করে, বিন্দু দিয়ে আলাদা চারটি দশমিক সংখ্যা ০–২৫৫ হিসেবে লেখা হয়, যেমন 192.168.1.10। এতে প্রায় ৪৩০ কোটি ঠিকানা হয়—যা ১৯৮০-র দশকে অসীম মনে হয়েছিল আর আজ প্রায় ফুরিয়ে গেছে। IPv6 ১২৮ বিট ব্যবহার করে, colon দিয়ে আলাদা আটটি hexadecimal গ্রুপ হিসেবে লেখা হয়, যেমন 2001:db8:85a3::8a2e:370:7334, যা কার্যত অসীম সংখ্যক ঠিকানা দেয়।') },
        { code: `IPv4  (32 bits)    192.168.1.10
                   \\_________/  \\__/
                    network      host   (the split is set by the subnet mask)

IPv6 (128 bits)    2001:db8:85a3::8a2e:370:7334
                   "::" is shorthand for one run of all-zero groups

# See your own addresses (Linux / macOS)
ip addr show          # older tools: ifconfig
# inet  192.168.1.10/24    <- IPv4 with its /24 subnet
# inet6 fe80::1a2b:3c4d/64 <- IPv6`, caption: l('The address alone does not say where the network part ends — the subnet mask (the /24 or /64) does. Same address, different mask, different meaning.', 'শুধু ঠিকানা বলে না network অংশ কোথায় শেষ—subnet mask (/24 বা /64) বলে। একই ঠিকানা, ভিন্ন mask, ভিন্ন অর্থ।') },
      ],
    },
    {
      h: l('Public vs private addresses', 'Public বনাম private ঠিকানা'),
      blocks: [
        { p: l('Not every IP is reachable from the whole internet. Certain ranges are reserved as private — usable only inside a local network, and never routed on the public internet. Your home devices almost all use private addresses and share one public address through NAT. Knowing these ranges on sight is an everyday skill.', 'প্রতিটি IP পুরো ইন্টারনেট থেকে পৌঁছনীয় নয়। কিছু range private হিসেবে সংরক্ষিত—শুধু একটি লোকাল নেটওয়ার্কের ভেতরে ব্যবহারযোগ্য, পাবলিক ইন্টারনেটে কখনো route হয় না। আপনার বাড়ির ডিভাইসের প্রায় সবই private ঠিকানা ব্যবহার করে এবং NAT-এর মাধ্যমে একটি public ঠিকানা শেয়ার করে। এই range গুলো দেখে চেনা রোজকার দক্ষতা।') },
        { table: {
          head: [l('Range / address', 'Range / ঠিকানা'), l('Type', 'ধরন'), l('Used for', 'কী কাজে')],
          rows: [
            [l('10.0.0.0/8', '10.0.0.0/8'), l('Private (class A)', 'Private (class A)'), l('Large private networks', 'বড় private নেটওয়ার্ক')],
            [l('172.16.0.0/12', '172.16.0.0/12'), l('Private (class B)', 'Private (class B)'), l('Medium private networks', 'মাঝারি private নেটওয়ার্ক')],
            [l('192.168.0.0/16', '192.168.0.0/16'), l('Private (class C)', 'Private (class C)'), l('Home & small-office LANs', 'বাড়ি ও ছোট অফিসের LAN')],
            [l('127.0.0.1', '127.0.0.1'), l('Loopback', 'Loopback'), l('The device talking to itself', 'ডিভাইস নিজের সঙ্গে কথা বলা')],
            [l('8.8.8.8 (example)', '8.8.8.8 (উদাহরণ)'), l('Public', 'Public'), l('Reachable across the internet', 'ইন্টারনেট জুড়ে পৌঁছনীয়')],
          ],
        } },
      ],
    },
    {
      h: l('How a device gets and uses an IP', 'একটি ডিভাইস কীভাবে IP পায় ও ব্যবহার করে'),
      blocks: [
        { p: l('A device usually receives its IP automatically from DHCP the moment it joins a network — along with a subnet mask, a default gateway, and DNS servers. After that, every packet it sends triggers one decision. Your machine compares the destination IP against its own subnet: if the target is on the same local network, it delivers directly (using ARP to find the MAC); if it is on a different network, it sends the packet to the default gateway to be routed onward. This "local or remote?" test happens on every single packet.', 'একটি ডিভাইস সাধারণত নেটওয়ার্কে যোগ দেওয়ার মুহূর্তে DHCP থেকে স্বয়ংক্রিয়ভাবে তার IP পায়—সঙ্গে subnet mask, default gateway ও DNS server। এরপর এটি পাঠানো প্রতিটি packet একটি সিদ্ধান্ত ট্রিগার করে। আপনার মেশিন destination IP-কে তার নিজের subnet-এর সঙ্গে তুলনা করে: target একই লোকাল নেটওয়ার্কে হলে সরাসরি পৌঁছায় (MAC খুঁজতে ARP দিয়ে); ভিন্ন নেটওয়ার্কে হলে packet default gateway-তে পাঠায় যাতে সেটি আরও route করে। এই "লোকাল না দূরের?" পরীক্ষা প্রতিটি packet-এ ঘটে।') },
      ],
    },
    {
      h: l('When to use IPv4 vs IPv6', 'কখন IPv4 বনাম IPv6 ব্যবহার করবেন'),
      blocks: [
        { p: l('For most work today you will use IPv4, because it is universal and everything supports it. Reach for IPv6 where address exhaustion genuinely bites — huge networks, mobile carriers, cloud providers, and IoT fleets with millions of devices. In practice many systems run dual-stack, speaking both at once, so a service is reachable over whichever version the client has. Learn the private ranges cold, because you will use them daily for internal networks — and remember that a private IP like 192.168.x.x can never be reached directly from the public internet.', 'আজ বেশিরভাগ কাজে আপনি IPv4 ব্যবহার করবেন, কারণ এটি সর্বজনীন ও সবকিছু সমর্থন করে। ঠিকানা ফুরানো যেখানে সত্যিই কামড় দেয় সেখানে IPv6 নিন—বিশাল নেটওয়ার্ক, mobile carrier, cloud provider, ও লক্ষ লক্ষ ডিভাইসের IoT বহর। বাস্তবে অনেক সিস্টেম dual-stack চালায়, একসঙ্গে দুটোই বলে, তাই client-এর যেটি আছে সেটি দিয়েই একটি service পৌঁছনীয় থাকে। private range গুলো ভালোভাবে শিখুন, কারণ অভ্যন্তরীণ নেটওয়ার্কে রোজ ব্যবহার করবেন—আর মনে রাখুন 192.168.x.x-এর মতো একটি private IP পাবলিক ইন্টারনেট থেকে কখনো সরাসরি পৌঁছানো যায় না।') },
      ],
    },
    {
      h: l('Common mistakes', 'সাধারণ ভুল'),
      blocks: [
        { list: [
          l('Exposing a private IP (like 192.168.1.10) and expecting it to be reachable from the public internet — private ranges are not routed globally; you need a public IP, NAT port forwarding, or a tunnel.', 'একটি private IP (যেমন 192.168.1.10) প্রকাশ করে পাবলিক ইন্টারনেট থেকে পৌঁছানো যাবে আশা করা—private range গ্লোবালি route হয় না; আপনার একটি public IP, NAT port forwarding, বা একটি tunnel লাগবে।'),
          l('Confusing an IP address with a MAC address. The IP is a routable, changeable network address; the MAC is a fixed local hardware address. Global routing uses IP; local delivery uses MAC.', 'IP address ও MAC address গুলিয়ে ফেলা। IP একটি routable, পরিবর্তনযোগ্য network ঠিকানা; MAC একটি স্থির লোকাল hardware ঠিকানা। global routing IP ব্যবহার করে; লোকাল delivery MAC ব্যবহার করে।'),
          l('Assuming IP addresses are permanent. A device’s IP can change (DHCP leases, moving networks), which is exactly why we use DNS names instead of hard-coding IPs.', 'IP address স্থায়ী ধরে নেওয়া। একটি ডিভাইসের IP বদলাতে পারে (DHCP lease, নেটওয়ার্ক বদল), ঠিক এ কারণেই আমরা IP হার্ড-কোড না করে DNS নাম ব্যবহার করি।'),
          l('Forgetting that the subnet mask — not the address alone — decides which part is network and which is host; the same address means different things under /24 vs /16.', 'ভুলে যাওয়া যে subnet mask—শুধু ঠিকানা নয়—ঠিক করে কোন অংশ network ও কোন অংশ host; একই ঠিকানা /24 আর /16-এ ভিন্ন অর্থ বহন করে।'),
        ] },
      ],
    },
    {
      h: l('Remember in one line', 'এক লাইনে মনে রাখুন'),
      blocks: [
        { list: [
          l('An IP address identifies a device at Layer 3 and makes it routable across the internet; a MAC only works on the local link.', 'IP address একটি ডিভাইসকে Layer 3-এ চেনায় ও ইন্টারনেট জুড়ে routable করে; MAC শুধু লোকাল link-এ কাজ করে।'),
          l('IPv4 is 32-bit and nearly exhausted; IPv6 is 128-bit and effectively unlimited.', 'IPv4 ৩২-বিট ও প্রায় ফুরানো; IPv6 ১২৮-বিট ও কার্যত সীমাহীন।'),
          l('Private ranges (10/8, 172.16/12, 192.168/16) stay inside a LAN and reach the internet only through NAT.', 'private range (10/8, 172.16/12, 192.168/16) LAN-এর ভেতরে থাকে ও শুধু NAT-এর মাধ্যমে ইন্টারনেটে পৌঁছায়।'),
        ] },
      ],
    },
  ],

  // ── cn-subnetting · Subnets & CIDR ─────────────────────────────────────────
  'cn-subnetting': [
    {
      h: l('What is subnetting & CIDR?', 'Subnetting ও CIDR কী?'),
      blocks: [
        { p: l('Subnetting is splitting an IP address into two parts — a network part that says which network the address belongs to, and a host part that identifies the individual device within it. A subnet mask, written in CIDR notation like /24, is what draws the line between the two. CIDR (Classless Inter-Domain Routing) is simply the modern way to write that mask: the number after the slash is how many bits, counted from the left, belong to the network.', 'Subnetting হলো একটি IP address-কে দুই অংশে ভাগ করা—একটি network অংশ যা বলে ঠিকানাটি কোন নেটওয়ার্কের, আর একটি host অংশ যা তার ভেতরের নির্দিষ্ট ডিভাইস চেনায়। একটি subnet mask, /24-এর মতো CIDR notation-এ লেখা, এই দুইয়ের মাঝে রেখা টানে। CIDR (Classless Inter-Domain Routing) হলো সেই mask লেখার আধুনিক উপায়: slash-এর পরের সংখ্যাটি বাঁ দিক থেকে গুনে কত বিট network-এর তা বলে।') },
        { p: l('Subnetting solves two problems at once. It lets a large address block be carved into smaller, self-contained networks — for departments, floors, or security zones — and it tells every device and router, for any given address, "is this on my network or somewhere else?" That single question drives every routing decision a machine ever makes.', 'Subnetting একসঙ্গে দুটি সমস্যা সমাধান করে। এটি একটি বড় address block-কে ছোট, স্বয়ংসম্পূর্ণ নেটওয়ার্কে কাটতে দেয়—বিভাগ, ফ্লোর, বা security zone-এর জন্য—এবং প্রতিটি ডিভাইস ও router-কে যেকোনো ঠিকানার জন্য বলে, "এটি কি আমার নেটওয়ার্কে নাকি অন্য কোথাও?" এই একটি প্রশ্নই একটি মেশিনের প্রতিটি routing সিদ্ধান্ত চালায়।') },
        { note: l('Think of an IP as a full postal address. The network part is the street name and the host part is the house number. The subnet mask just says how many leading digits are the street — everyone on the same street (subnet) is a neighbour you reach directly; anyone on another street you reach through the gateway.', 'একটি IP-কে একটি পূর্ণ ডাক ঠিকানা ভাবুন। network অংশ হলো রাস্তার নাম আর host অংশ বাড়ির নম্বর। subnet mask শুধু বলে কতটি শুরুর অঙ্ক রাস্তা—একই রাস্তার (subnet) সবাই এমন প্রতিবেশী যাদের সরাসরি পৌঁছান; অন্য রাস্তার যে কাউকে gateway-এর মাধ্যমে পৌঁছান।'), kind: 'tip' },
      ],
    },
    {
      h: l('Worked example: why a /24 gives 254 hosts', 'কষে দেখা: কেন /24 দেয় ২৫৪ হোস্ট'),
      blocks: [
        { p: l('A /24 means the first 24 of the 32 bits are the network, leaving the last 8 bits for hosts. Let’s work out, step by step, exactly why that yields 254 usable host addresses — not 256.', 'একটি /24 মানে ৩২ বিটের প্রথম ২৪টি network, বাকি শেষ ৮ বিট host-এর জন্য। ধাপে ধাপে বের করি ঠিক কেন এতে ২৫৪টি ব্যবহারযোগ্য host ঠিকানা হয়—২৫৬ নয়।') },
        { steps: [
          l('Start with the block 192.168.1.0/24. The /24 fixes the first 24 bits (192.168.1) as the network; the last 8 bits are free for hosts.', '192.168.1.0/24 block দিয়ে শুরু। /24 প্রথম ২৪ বিট (192.168.1)-কে network হিসেবে স্থির করে; শেষ ৮ বিট host-এর জন্য মুক্ত।'),
          l('8 free bits means 2^8 = 256 possible combinations — addresses 192.168.1.0 through 192.168.1.255.', '৮টি মুক্ত বিট মানে 2^8 = ২৫৬টি সম্ভাব্য সমন্বয়—192.168.1.0 থেকে 192.168.1.255 পর্যন্ত ঠিকানা।'),
          l('Subtract 2 reserved addresses: the first, 192.168.1.0, is the network address (it names the subnet itself), and the last, 192.168.1.255, is the broadcast address (it reaches everyone on the subnet). Neither can be given to a device.', '২টি সংরক্ষিত ঠিকানা বাদ দিন: প্রথমটি, 192.168.1.0, network address (এটি subnet-কেই নাম দেয়), আর শেষটি, 192.168.1.255, broadcast address (এটি subnet-এর সবার কাছে পৌঁছায়)। কোনোটিই কোনো ডিভাইসকে দেওয়া যায় না।'),
          l('256 − 2 = 254 usable host addresses, from 192.168.1.1 to 192.168.1.254.', '২৫৬ − ২ = ২৫৪টি ব্যবহারযোগ্য host ঠিকানা, 192.168.1.1 থেকে 192.168.1.254 পর্যন্ত।'),
          l('The general formula: usable hosts = 2^(host bits) − 2. For a /24 that is 2^8 − 2 = 254.', 'সাধারণ সূত্র: ব্যবহারযোগ্য host = 2^(host bit) − 2। /24-এর জন্য তা 2^8 − 2 = ২৫৪।'),
        ] },
        { code: `192.168.1.0 /24
11000000.10101000.00000001.00000000
\\____________ network _____/ \\_host__/
         24 network bits        8 host bits

host bits     = 32 - 24 = 8
usable hosts  = 2^8 - 2  = 254
network addr  = 192.168.1.0     (reserved)
first host    = 192.168.1.1
last host     = 192.168.1.254
broadcast     = 192.168.1.255   (reserved)`, caption: l('The mask sets where network ends and host begins; the two reserved addresses (network and broadcast) are why the count is 2^h − 2, never the full 2^h.', 'mask ঠিক করে network কোথায় শেষ ও host কোথায় শুরু; দুটি সংরক্ষিত ঠিকানা (network ও broadcast)-ই কারণ গণনা 2^h − 2, কখনো পুরো 2^h নয়।') },
      ],
    },
    {
      h: l('Mask & hosts reference table', 'Mask ও host রেফারেন্স টেবিল'),
      blocks: [
        { table: {
          head: [l('CIDR', 'CIDR'), l('Subnet mask', 'Subnet mask'), l('Host bits', 'Host bit'), l('Usable hosts', 'ব্যবহারযোগ্য host')],
          rows: [
            [l('/24', '/24'), l('255.255.255.0', '255.255.255.0'), l('8', '৮'), l('254', '২৫৪')],
            [l('/25', '/25'), l('255.255.255.128', '255.255.255.128'), l('7', '৭'), l('126', '১২৬')],
            [l('/26', '/26'), l('255.255.255.192', '255.255.255.192'), l('6', '৬'), l('62', '৬২')],
            [l('/27', '/27'), l('255.255.255.224', '255.255.255.224'), l('5', '৫'), l('30', '৩০')],
            [l('/30', '/30'), l('255.255.255.252', '255.255.255.252'), l('2', '২'), l('2', '২')],
          ],
        } },
        { note: l('A quick rule: every time you add 1 to the CIDR number you halve the hosts; every time you subtract 1 you double them. /24 = 254, /25 = 126, /26 = 62.', 'দ্রুত নিয়ম: CIDR সংখ্যায় ১ যোগ করলে host অর্ধেক হয়; ১ বিয়োগ করলে দ্বিগুণ হয়। /24 = ২৫৪, /25 = ১২৬, /26 = ৬২।'), kind: 'tip' },
      ],
    },
    {
      h: l('Choosing a subnet size', 'Subnet-এর আকার বাছাই'),
      blocks: [
        { p: l('To size a subnet, work backwards from how many devices it must hold, then pick the smallest mask that fits — remembering the 2 reserved addresses. A team of 50 machines fits comfortably in a /26 (62 hosts) with room to grow. A point-to-point link between two routers needs only 2 addresses, so a /30 is perfect and wastes nothing. The smaller the number after the slash, the bigger the network: /24 is 254 hosts, /16 is over 65,000, /8 is millions.', 'একটি subnet-এর আকার ঠিক করতে কতটি ডিভাইস ধরতে হবে তা থেকে উল্টো হিসাব করুন, তারপর মানানসই সবচেয়ে ছোট mask নিন—২টি সংরক্ষিত ঠিকানা মনে রেখে। ৫০ মেশিনের একটি দল /26 (৬২ host)-এ আরামে ধরে, বাড়ার জায়গাসহ। দুটি router-এর মধ্যে একটি point-to-point link-এ মাত্র ২টি ঠিকানা লাগে, তাই /30 নিখুঁত ও কিছুই অপচয় করে না। slash-এর পরের সংখ্যা যত ছোট, নেটওয়ার্ক তত বড়: /24 হলো ২৫৪ host, /16 ৬৫,০০০-এর বেশি, /8 লক্ষ লক্ষ।') },
      ],
    },
    {
      h: l('When and where to subnet', 'কখন ও কোথায় subnet করবেন'),
      blocks: [
        { p: l('Subnet whenever a network grows past a handful of devices or needs internal boundaries. Splitting one big flat network into subnets isolates traffic (a broadcast stays inside its subnet), improves security (you can firewall between subnets — servers, staff, and guest Wi-Fi each in their own), and keeps routing tidy. In cloud platforms like AWS you subnet a VPC into public and private subnets for exactly these reasons.', 'একটি নেটওয়ার্ক কয়েকটি ডিভাইসের বেশি বড় হলে বা অভ্যন্তরীণ সীমানা দরকার হলেই subnet করুন। একটি বড় flat নেটওয়ার্ককে subnet-এ ভাগ করলে ট্রাফিক আলাদা হয় (broadcast তার subnet-এর ভেতরে থাকে), নিরাপত্তা বাড়ে (subnet-এর মধ্যে firewall দেওয়া যায়—server, কর্মী ও guest Wi-Fi প্রত্যেকে নিজেরটায়), আর routing পরিপাটি থাকে। AWS-এর মতো cloud platform-এ ঠিক এই কারণেই একটি VPC-কে public ও private subnet-এ ভাগ করা হয়।') },
        { p: l('But do not over-do it. Too many tiny subnets waste addresses (every subnet loses 2 to network and broadcast) and add routing complexity. Match the subnet size to the real device count with a little headroom, and no more.', 'তবে বাড়াবাড়ি করবেন না। বহু ছোট subnet ঠিকানা অপচয় করে (প্রতিটি subnet network ও broadcast-এ ২টি হারায়) এবং routing জটিলতা বাড়ায়। subnet-এর আকার বাস্তব ডিভাইস সংখ্যার সঙ্গে সামান্য বাড়তি জায়গাসহ মেলান, তার বেশি নয়।') },
      ],
    },
    {
      h: l('Common mistakes', 'সাধারণ ভুল'),
      blocks: [
        { list: [
          l('Miscounting host bits — forgetting that the network and broadcast addresses are not usable hosts, so a /24 gives 254, not 256.', 'host bit ভুল গোনা—network ও broadcast ঠিকানা ব্যবহারযোগ্য host নয় তা ভুলে যাওয়া, তাই /24 দেয় ২৫৪, ২৫৬ নয়।'),
          l('Reading CIDR backwards — a bigger slash number means a smaller network (/26 is smaller than /24), which trips up beginners constantly.', 'CIDR উল্টো পড়া—বড় slash সংখ্যা মানে ছোট নেটওয়ার্ক (/26 হলো /24-এর চেয়ে ছোট), যা নতুনদের বারবার ভোগায়।'),
          l('Assigning the network or broadcast address to a device — 192.168.1.0 and 192.168.1.255 in a /24 are reserved and will not work as host addresses.', 'network বা broadcast ঠিকানা কোনো ডিভাইসকে দেওয়া—/24-এ 192.168.1.0 ও 192.168.1.255 সংরক্ষিত ও host ঠিকানা হিসেবে কাজ করবে না।'),
          l('Making every subnet a /24 out of habit — wasting hundreds of addresses on a link that needs two, or running out of room on a segment that needed more.', 'অভ্যাসবশত প্রতিটি subnet /24 করা—যে link-এ দুটি লাগে সেখানে শত শত ঠিকানা অপচয়, বা যে segment-এ বেশি দরকার সেখানে জায়গা ফুরানো।'),
        ] },
      ],
    },
    {
      h: l('Remember in one line', 'এক লাইনে মনে রাখুন'),
      blocks: [
        { list: [
          l('The subnet mask (CIDR /n) splits an IP into n network bits and (32−n) host bits.', 'subnet mask (CIDR /n) একটি IP-কে n network বিট ও (32−n) host বিটে ভাগ করে।'),
          l('Usable hosts = 2^(host bits) − 2, because the network and broadcast addresses are reserved — so /24 = 254.', 'ব্যবহারযোগ্য host = 2^(host bit) − 2, কারণ network ও broadcast ঠিকানা সংরক্ষিত—তাই /24 = ২৫৪।'),
          l('A bigger CIDR number means a smaller network; size the subnet to the device count with a little headroom.', 'বড় CIDR সংখ্যা মানে ছোট নেটওয়ার্ক; subnet-এর আকার ডিভাইস সংখ্যার সঙ্গে সামান্য বাড়তিসহ মেলান।'),
        ] },
      ],
    },
  ],

  // ── cn-routing · Routing & the default gateway ─────────────────────────────
  'cn-routing': [
    {
      h: l('What is routing?', 'Routing কী?'),
      blocks: [
        { p: l('Routing is how a packet finds its way across the internet from one network to another. A router is a device that connects different networks and forwards packets between them, and at every step it makes one decision: given this packet’s destination IP, what is the best next hop to send it toward? No single router knows the entire path to the destination — it only knows the next step, and it trusts the next router to know the step after that.', 'Routing হলো একটি packet কীভাবে এক নেটওয়ার্ক থেকে আরেকটিতে ইন্টারনেট জুড়ে পথ খুঁজে নেয়। router হলো এমন একটি যন্ত্র যা ভিন্ন নেটওয়ার্ক যুক্ত করে ও তাদের মধ্যে packet পাঠায়, এবং প্রতিটি ধাপে একটি সিদ্ধান্ত নেয়: এই packet-এর destination IP পেয়ে, তাকে কোন দিকে পাঠানোর সেরা next hop কোনটি? কোনো একটি router গন্তব্যের পুরো পথ জানে না—এটি শুধু পরের ধাপ জানে, আর বিশ্বাস করে পরের router তারপরের ধাপ জানে।') },
        { p: l('Within your local network, devices talk directly. But the moment a packet must reach a different network — any website, any server outside your LAN — something has to carry it across the boundary and choose a direction. That is routing, and the first router your traffic meets is your default gateway.', 'আপনার লোকাল নেটওয়ার্কের ভেতরে ডিভাইসগুলো সরাসরি কথা বলে। কিন্তু যখনই একটি packet-কে ভিন্ন নেটওয়ার্কে পৌঁছাতে হয়—যেকোনো ওয়েবসাইট, আপনার LAN-এর বাইরের যেকোনো সার্ভার—কিছু একটাকে সীমানা পার করে দিক বেছে নিতে হয়। সেটাই routing, আর আপনার ট্রাফিক প্রথম যে router-এর দেখা পায় সেটি আপনার default gateway।') },
        { note: l('Routing is like a road trip guided by signposts. No single sign shows the whole route to a distant address; each junction just has a sign pointing you one step closer. You follow signs hop by hop, trusting that each junction knows the next turn. Routers are those junctions.', 'Routing signpost দিয়ে চালানো একটি road trip-এর মতো। কোনো একটি sign দূরের ঠিকানার পুরো পথ দেখায় না; প্রতিটি মোড়ে শুধু একটি sign আপনাকে এক ধাপ কাছে দেখায়। আপনি hop-by-hop sign অনুসরণ করেন, বিশ্বাস করে যে প্রতিটি মোড় পরের বাঁক জানে। router-ই সেই মোড়গুলো।'), kind: 'tip' },
      ],
    },
    {
      h: l('The default gateway and the "local or remote?" test', 'Default gateway ও "লোকাল না দূরের?" পরীক্ষা'),
      blocks: [
        { p: l('Every device is configured with a default gateway — the IP of the router it should hand any off-network traffic to. When your machine has a packet to send, it runs a simple test using its subnet mask: is the destination on my own subnet, or not?', 'প্রতিটি ডিভাইসে একটি default gateway কনফিগার করা থাকে—যে router-কে অফ-নেটওয়ার্ক ট্রাফিক দেওয়া উচিত তার IP। আপনার মেশিনের একটি packet পাঠানোর থাকলে এটি তার subnet mask দিয়ে একটি সহজ পরীক্ষা চালায়: destination কি আমার নিজের subnet-এ, নাকি নয়?') },
        { steps: [
          l('Destination is on my subnet → deliver directly on the LAN (ARP for the destination’s MAC, then send the frame).', 'Destination আমার subnet-এ → সরাসরি LAN-এ পৌঁছাও (destination-এর MAC-এর জন্য ARP, তারপর frame পাঠাও)।'),
          l('Destination is on another network → send the packet to the default gateway’s MAC instead, and let it route onward.', 'Destination অন্য নেটওয়ার্কে → বদলে default gateway-এর MAC-এ packet পাঠাও, ও সেটিকে আরও route করতে দাও।'),
          l('The gateway receives the packet, looks up the destination in its routing table, and forwards it to the next hop toward that network.', 'gateway packet পায়, তার routing table-এ destination খোঁজে, ও সেই নেটওয়ার্কের দিকে next hop-এ পাঠায়।'),
          l('Each router along the way repeats the same lookup, moving the packet one hop closer, until it reaches the router attached to the destination’s network, which delivers it locally.', 'পথের প্রতিটি router একই lookup পুনরাবৃত্তি করে, packet-কে এক hop কাছে নেয়, যতক্ষণ না destination-এর নেটওয়ার্কে যুক্ত router-এ পৌঁছায়, যা এটি লোকালি পৌঁছে দেয়।'),
        ] },
        { code: `# See your routing table and default gateway (Linux)
ip route
# default via 192.168.1.1 dev eth0     <- the default gateway
# 192.168.1.0/24 dev eth0              <- local subnet, delivered directly

# Watch the hop-by-hop path to a destination
traceroute example.com
#  1  192.168.1.1     1 ms    <- your default gateway (first hop)
#  2  10.20.0.1       8 ms    <- ISP router
#  3  ...             ...     <- more hops, each one step closer`, caption: l('The "default" route (0.0.0.0/0) is the catch-all: anything not matched by a more specific entry is sent to the gateway. traceroute reveals each hop the packet actually takes.', '"default" route (0.0.0.0/0) হলো সর্বগ্রাসী: আরও নির্দিষ্ট কোনো entry-তে না মিললে সবকিছু gateway-তে পাঠানো হয়। traceroute দেখায় packet আসলে কোন hop গুলো নেয়।') },
      ],
    },
    {
      h: l('How a router decides: the routing table', 'router কীভাবে ঠিক করে: routing table'),
      blocks: [
        { p: l('A router chooses the next hop by consulting its routing table, a list of known networks and where to send traffic for each. It picks the most specific match — the longest prefix — and falls back to the default route (0.0.0.0/0) only when nothing else matches.', 'router তার routing table দেখে next hop বাছে, যা জানা নেটওয়ার্ক ও প্রতিটির জন্য ট্রাফিক কোথায় পাঠাতে হবে তার একটি তালিকা। এটি সবচেয়ে নির্দিষ্ট মিল—দীর্ঘতম prefix—বাছে, এবং আর কিছু না মিললে তবেই default route (0.0.0.0/0)-এ ফিরে যায়।') },
        { table: {
          head: [l('Destination network', 'Destination network'), l('Next hop / action', 'Next hop / কাজ'), l('Meaning', 'অর্থ')],
          rows: [
            [l('192.168.1.0/24', '192.168.1.0/24'), l('Directly connected (eth0)', 'সরাসরি যুক্ত (eth0)'), l('On my own network — deliver locally', 'আমার নিজের নেটওয়ার্কে—লোকালি পৌঁছাও')],
            [l('10.0.0.0/8', '10.0.0.0/8'), l('via 10.20.0.1', 'via 10.20.0.1'), l('Send to that router for this range', 'এই range-এর জন্য ওই router-এ পাঠাও')],
            [l('0.0.0.0/0', '0.0.0.0/0'), l('via 192.168.1.1', 'via 192.168.1.1'), l('Default route — anything not matched above goes here', 'default route—উপরে না মেলা সবকিছু এখানে যায়')],
          ],
        } },
      ],
    },
    {
      h: l('Longest-prefix match and how routes are learned', 'দীর্ঘতম-prefix মিল ও route কীভাবে শেখা হয়'),
      blocks: [
        { p: l('When several routes could match a destination, the router always uses the most specific one — the longest prefix. A packet for 10.1.2.3 prefers a 10.1.2.0/24 route over a broader 10.0.0.0/8 route, and only falls to 0.0.0.0/0 if nothing else fits. Routes enter the table in two ways: static routes typed in by an administrator, and dynamic routes learned automatically from neighbouring routers via routing protocols (like OSPF inside an organisation, or BGP between internet providers). Dynamic routing is what lets the internet reroute around a failed link without any human intervention.', 'একাধিক route একটি destination-এর সঙ্গে মিলতে পারলে router সবসময় সবচেয়ে নির্দিষ্টটি—দীর্ঘতম prefix—ব্যবহার করে। 10.1.2.3-এর জন্য একটি packet বিস্তৃত 10.0.0.0/8-এর চেয়ে 10.1.2.0/24 route পছন্দ করে, এবং আর কিছু না মিললে তবেই 0.0.0.0/0-তে নামে। route দুইভাবে table-এ আসে: administrator-এর টাইপ করা static route, এবং routing protocol-এর মাধ্যমে প্রতিবেশী router থেকে স্বয়ংক্রিয়ভাবে শেখা dynamic route (যেমন সংস্থার ভেতরে OSPF, বা internet provider-দের মধ্যে BGP)। dynamic routing-ই ইন্টারনেটকে কোনো মানুষের হস্তক্ষেপ ছাড়া একটি ব্যর্থ link ঘুরে নতুন পথ নিতে দেয়।') },
      ],
    },
    {
      h: l('When and where routing matters', 'কখন ও কোথায় routing গুরুত্বপূর্ণ'),
      blocks: [
        { p: l('Routing happens on every packet that leaves your local network, so understanding it pays off constantly — configuring a home or office network, setting up cloud route tables, or debugging "I can reach some sites but not others." The practical takeaways: make sure every device has a correct default gateway, and when traffic mysteriously fails, use traceroute to see exactly which hop it dies at. If the first hop (your gateway) fails, the problem is local; if a hop deep in the path fails, it is out of your hands.', 'আপনার লোকাল নেটওয়ার্ক ছাড়া প্রতিটি packet-এ routing ঘটে, তাই এটি বোঝা সবসময় কাজে লাগে—বাড়ি বা অফিসের নেটওয়ার্ক কনফিগার, cloud route table সেটআপ, বা "কিছু সাইটে পৌঁছাই কিন্তু কিছুতে পারি না" debug করা। বাস্তব শিক্ষা: প্রতিটি ডিভাইসে সঠিক default gateway নিশ্চিত করুন, আর ট্রাফিক রহস্যজনকভাবে ব্যর্থ হলে traceroute দিয়ে দেখুন ঠিক কোন hop-এ মরে যায়। প্রথম hop (আপনার gateway) ব্যর্থ হলে সমস্যা লোকাল; পথের গভীরের একটি hop ব্যর্থ হলে তা আপনার হাতের বাইরে।') },
        { p: l('You configure routing directly whenever you run a router, a firewall, or a cloud VPC — deciding which subnets may reach which, and where the default route points. For a single host you rarely touch it beyond the gateway your DHCP already handed you.', 'আপনি সরাসরি routing কনফিগার করেন যখনই একটি router, firewall, বা cloud VPC চালান—কোন subnet কোনটিতে পৌঁছাতে পারবে ও default route কোথায় দেখাবে তা ঠিক করে। একটি host-এর জন্য DHCP-র দেওয়া gateway-এর বাইরে এটি কমই স্পর্শ করেন।') },
      ],
    },
    {
      h: l('Common mistakes', 'সাধারণ ভুল'),
      blocks: [
        { list: [
          l('Assuming a packet takes one fixed path. Routes can change per packet as networks shift or links fail; two packets to the same host may travel differently.', 'একটি packet একটি নির্দিষ্ট পথ নেয় ধরে নেওয়া। নেটওয়ার্ক বদলালে বা link ব্যর্থ হলে প্রতি packet-এ route বদলাতে পারে; একই host-এ দুটি packet ভিন্নভাবে যেতে পারে।'),
          l('A wrong or missing default gateway — the classic "I can reach my LAN but not the internet." Local delivery works; anything off-network has nowhere to go.', 'একটি ভুল বা অনুপস্থিত default gateway—চিরাচরিত "আমার LAN-এ পৌঁছাই কিন্তু ইন্টারনেটে না।" লোকাল delivery চলে; অফ-নেটওয়ার্ক কিছুর যাওয়ার জায়গা নেই।'),
          l('Confusing routing (Layer 3, between networks, by IP) with switching (Layer 2, within one network, by MAC).', 'routing (Layer 3, নেটওয়ার্কের মধ্যে, IP দিয়ে) ও switching (Layer 2, এক নেটওয়ার্কের ভেতরে, MAC দিয়ে) গুলিয়ে ফেলা।'),
          l('Expecting one router to know the whole route. It only knows the next hop; end-to-end delivery is a chain of independent next-hop decisions.', 'একটি router পুরো route জানবে আশা করা। এটি শুধু next hop জানে; end-to-end delivery হলো স্বাধীন next-hop সিদ্ধান্তের একটি শৃঙ্খল।'),
        ] },
      ],
    },
    {
      h: l('Remember in one line', 'এক লাইনে মনে রাখুন'),
      blocks: [
        { list: [
          l('Routing moves packets between networks; each router chooses only the next hop toward the destination, using its routing table.', 'Routing নেটওয়ার্কের মধ্যে packet সরায়; প্রতিটি router তার routing table দিয়ে destination-এর দিকে শুধু next hop বাছে।'),
          l('Your default gateway is where all off-network traffic goes; the "local or remote?" test (via the subnet mask) decides direct delivery vs sending to the gateway.', 'আপনার default gateway-তে সব অফ-নেটওয়ার্ক ট্রাফিক যায়; "লোকাল না দূরের?" পরীক্ষা (subnet mask দিয়ে) সরাসরি delivery নাকি gateway-তে পাঠানো তা ঠিক করে।'),
          l('No router knows the full path — routers pick the longest-prefix match and fall back to the default route (0.0.0.0/0).', 'কোনো router পুরো পথ জানে না—router দীর্ঘতম-prefix মিল বাছে ও default route (0.0.0.0/0)-এ ফিরে যায়।'),
        ] },
      ],
    },
  ],
}
