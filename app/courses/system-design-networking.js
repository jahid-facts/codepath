import { l } from '../data.js'

// "Networking basics" — a supplemental module merged into the System Design course.
// Kept out of data.js so the test suite's fixed 40-topic core stays intact.

export const networkingModule = {
  id: 'networking-basics', number: '02',
  title: l('Networking basics', 'নেটওয়ার্কিং বেসিক'),
  description: l('The internet fundamentals every system design depends on — layers, IP, TCP/UDP, HTTP, TLS, and DNS.', 'প্রতিটি সিস্টেম ডিজাইন যে ইন্টারনেট ভিত্তির ওপর দাঁড়ায়—লেয়ার, IP, TCP/UDP, HTTP, TLS ও DNS।'),
  color: '#0891b2',
}

const rawTopics = [
  ['net-model', 'networking-basics', 'Network layers (OSI & TCP/IP)', 'নেটওয়ার্ক লেয়ার (OSI ও TCP/IP)', 'Beginner', 14, 'osi',
    'Networking is split into layers so each level solves one job and hides the layer below it.', 'নেটওয়ার্কিং লেয়ারে ভাগ করা হয় যাতে প্রতিটি স্তর একটি কাজ করে এবং নিচের স্তর আড়াল করে।',
    'A postal system: you write a letter (app) without knowing the trucks, planes, and roads (lower layers) that carry it.', 'একটি ডাক ব্যবস্থা: আপনি চিঠি লেখেন (অ্যাপ), কিন্তু বহনকারী ট্রাক, প্লেন ও রাস্তা (নিচের স্তর) জানেন না।',
    'Map any protocol to its layer — HTTP (app), TCP/UDP (transport), IP (network), Ethernet/Wi-Fi (link).', 'যেকোনো প্রোটোকলকে তার স্তরে বসান—HTTP (অ্যাপ), TCP/UDP (ট্রান্সপোর্ট), IP (নেটওয়ার্ক), ইথারনেট/ওয়াই-ফাই (লিংক)।',
    'Layering keeps each part replaceable and simple, but adds encapsulation overhead at every hop.', 'লেয়ারিং প্রতিটি অংশ প্রতিস্থাপনযোগ্য ও সরল রাখে, তবে প্রতি হপে এনক্যাপসুলেশন ওভারহেড যোগ করে।',
    'Mixing layers up — for example blaming the app for what is really a transport or network problem.', 'স্তর গুলিয়ে ফেলা—যেমন ট্রান্সপোর্ট বা নেটওয়ার্ক সমস্যাকে অ্যাপের দোষ ভাবা।'],
  ['net-ip', 'networking-basics', 'IP addresses & subnets', 'IP অ্যাড্রেস ও সাবনেট', 'Beginner', 15, 'ip',
    'Every host has an IP address; routers forward packets hop by hop toward the destination network.', 'প্রতিটি হোস্টের একটি IP অ্যাড্রেস থাকে; রাউটার গন্তব্য নেটওয়ার্কের দিকে হপে-হপে প্যাকেট ফরওয়ার্ড করে।',
    'A street address: the city and area (subnet) route the letter close, then the house number delivers it.', 'একটি ঠিকানা: শহর ও এলাকা (সাবনেট) চিঠি কাছে পৌঁছায়, তারপর বাড়ির নম্বর ডেলিভার করে।',
    'Know IPv4 vs IPv6, private vs public ranges, and how a subnet mask splits network from host bits.', 'IPv4 বনাম IPv6, প্রাইভেট বনাম পাবলিক রেঞ্জ এবং সাবনেট মাস্ক কীভাবে নেটওয়ার্ক ও হোস্ট বিট আলাদা করে তা জানুন।',
    'Public addressing enables global reach, but scarcity of IPv4 forces NAT, which complicates connectivity.', 'পাবলিক অ্যাড্রেসিং বিশ্বব্যাপী পৌঁছাতে দেয়, তবে IPv4-এর অভাবে NAT দরকার হয়, যা কানেক্টিভিটি জটিল করে।',
    'Assuming a client’s IP is stable or unique when NAT and mobile networks share and rotate addresses.', 'NAT ও মোবাইল নেটওয়ার্ক অ্যাড্রেস ভাগ ও বদল করলেও ক্লায়েন্টের IP স্থায়ী বা ইউনিক ধরে নেওয়া।'],
  ['net-transport', 'networking-basics', 'TCP vs UDP', 'TCP বনাম UDP', 'Beginner', 16, 'tcp',
    'TCP gives an ordered, reliable connection with handshakes and retransmits; UDP is fast, connectionless, and best-effort.', 'TCP হ্যান্ডশেক ও রিট্রান্সমিটসহ সাজানো, নির্ভরযোগ্য কানেকশন দেয়; UDP দ্রুত, কানেকশনহীন ও বেস্ট-এফোর্ট।',
    'TCP is a phone call that confirms every word; UDP is shouting across a field — fast, but words can be lost.', 'TCP প্রতিটি শব্দ নিশ্চিত করা ফোনকল; UDP মাঠের ওপারে চিৎকার—দ্রুত, তবে শব্দ হারাতে পারে।',
    'Choose TCP for correctness (APIs, files) and UDP for latency-tolerant streams (video, games, DNS).', 'শুদ্ধতার জন্য TCP (API, ফাইল) এবং লেটেন্সি-সংবেদনশীল স্ট্রিমের জন্য UDP (ভিডিও, গেম, DNS) বাছুন।',
    'TCP guarantees delivery and order but adds handshake and head-of-line latency UDP avoids.', 'TCP ডেলিভারি ও ক্রম নিশ্চিত করে, তবে হ্যান্ডশেক ও হেড-অব-লাইন লেটেন্সি যোগ করে যা UDP এড়ায়।',
    'Using TCP for real-time media where a late-but-correct packet is useless, or UDP where loss is unacceptable.', 'রিয়েল-টাইম মিডিয়ায় TCP ব্যবহার যেখানে দেরিতে-আসা সঠিক প্যাকেট অকেজো, বা যেখানে লস অগ্রহণযোগ্য সেখানে UDP।'],
  ['net-http', 'networking-basics', 'HTTP & HTTPS', 'HTTP ও HTTPS', 'Beginner', 15, 'http',
    'HTTP is a stateless request/response protocol; HTTPS is HTTP wrapped in TLS for encryption and identity.', 'HTTP একটি স্টেটলেস রিকোয়েস্ট/রেসপন্স প্রোটোকল; HTTPS হলো এনক্রিপশন ও পরিচয়ের জন্য TLS-এ মোড়া HTTP।',
    'Ordering at a counter: each order (request) is independent, and the receipt (response) comes back on its own.', 'কাউন্টারে অর্ডার: প্রতিটি অর্ডার (রিকোয়েস্ট) স্বাধীন, আর রিসিট (রেসপন্স) আলাদাভাবে ফেরে।',
    'Know methods, status codes, headers, and that state lives in cookies/tokens, not the protocol itself.', 'মেথড, স্ট্যাটাস কোড, হেডার জানুন এবং মনে রাখুন স্টেট থাকে কুকি/টোকেনে, প্রোটোকলে নয়।',
    'Statelessness scales horizontally with ease, but every request must re-send the context it needs.', 'স্টেটলেসনেস সহজে অনুভূমিক স্কেল করে, তবে প্রতিটি রিকোয়েস্টে প্রয়োজনীয় প্রসঙ্গ আবার পাঠাতে হয়।',
    'Treating HTTP as stateful or trusting client-supplied headers without validating them on the server.', 'HTTP-কে স্টেটফুল ধরা বা সার্ভারে যাচাই ছাড়া ক্লায়েন্ট-পাঠানো হেডার বিশ্বাস করা।'],
  ['net-tls', 'networking-basics', 'TLS & the handshake', 'TLS ও হ্যান্ডশেক', 'Intermediate', 16, 'tls',
    'TLS authenticates the server with a certificate and negotiates keys so the rest of the connection is encrypted.', 'TLS সার্টিফিকেট দিয়ে সার্ভার যাচাই করে এবং কী নেগোশিয়েট করে যাতে বাকি কানেকশন এনক্রিপ্টেড থাকে।',
    'Showing ID and agreeing on a secret code before a private conversation begins.', 'ব্যক্তিগত কথোপকথনের আগে পরিচয় দেখানো ও একটি গোপন কোডে সম্মত হওয়া।',
    'Understand the certificate chain, why a trusted CA matters, and how session keys avoid re-handshaking.', 'সার্টিফিকেট চেইন, বিশ্বস্ত CA কেন জরুরি এবং সেশন কী কীভাবে বারবার হ্যান্ডশেক এড়ায় তা বুঝুন।',
    'Encryption protects confidentiality and integrity, but the handshake adds round-trips and CPU cost.', 'এনক্রিপশন গোপনীয়তা ও অখণ্ডতা রক্ষা করে, তবে হ্যান্ডশেক রাউন্ড-ট্রিপ ও CPU খরচ যোগ করে।',
    'Assuming HTTPS alone makes a system secure, or ignoring certificate expiry and validation.', 'শুধু HTTPS সিস্টেমকে নিরাপদ করে ধরে নেওয়া, বা সার্টিফিকেট মেয়াদ ও যাচাই উপেক্ষা করা।'],
  ['net-dns', 'networking-basics', 'DNS resolution', 'DNS রিজলিউশন', 'Beginner', 14, 'dns',
    'DNS translates a human name into an IP address by asking resolvers, root, TLD, and authoritative servers.', 'DNS রিজলভার, রুট, TLD ও অথরিটেটিভ সার্ভারকে জিজ্ঞেস করে মানুষের নামকে IP অ্যাড্রেসে রূপান্তর করে।',
    'A directory service: you ask for a name and get back the exact address to reach it.', 'একটি ডিরেক্টরি সেবা: আপনি নাম চান এবং পৌঁছানোর সঠিক ঠিকানা ফেরত পান।',
    'Know the resolver hierarchy and how TTL-based caching trades freshness for speed at every level.', 'রিজলভার শ্রেণিবিন্যাস এবং TTL-ভিত্তিক ক্যাশ কীভাবে প্রতিটি স্তরে গতি বনাম ফ্রেশনেস বিনিময় করে তা জানুন।',
    'Caching makes lookups fast and cheap, but stale records slow the propagation of address changes.', 'ক্যাশ লুকআপ দ্রুত ও সস্তা করে, তবে পুরোনো রেকর্ড অ্যাড্রেস পরিবর্তন ছড়াতে দেরি করায়।',
    'Assuming a DNS change is instant everywhere, ignoring TTLs and layered caches.', 'TTL ও স্তরভিত্তিক ক্যাশ উপেক্ষা করে DNS পরিবর্তন সর্বত্র তাৎক্ষণিক ধরে নেওয়া।'],
]

const distractors = [
  l('Send raw bytes with no protocol and hope the other side understands.', 'কোনো প্রোটোকল ছাড়া কাঁচা বাইট পাঠান এবং আশা করুন অন্য পাশ বুঝবে।'),
  l('Assume every network is fast, reliable, and never drops a packet.', 'ধরে নিন প্রতিটি নেটওয়ার্ক দ্রুত, নির্ভরযোগ্য এবং কখনো প্যাকেট হারায় না।'),
  l('Trust any server without verifying its identity or encrypting traffic.', 'পরিচয় যাচাই বা ট্রাফিক এনক্রিপ্ট না করে যেকোনো সার্ভার বিশ্বাস করুন।'),
]

function makeExam(topic) {
  const correct = { purpose: topic.insight, action: topic.action, tradeoff: topic.tradeoff, mistake: topic.mistake }
  const optionSet = (answer, offset = 0) => {
    const answerIndex = offset % 4
    const values = [...distractors]
    values.splice(answerIndex, 0, answer)
    return { options: values.map((text, index) => ({ id: String.fromCharCode(97 + index), text })), correct: [String.fromCharCode(97 + answerIndex)] }
  }
  const purpose = optionSet(correct.purpose, topic.order)
  const action = optionSet(correct.action, topic.order + 1)
  const mistake = optionSet(correct.mistake, topic.order + 2)
  const interview = optionSet(l(`Name the layer and protocol, then explain this trade-off: ${topic.tradeoff.en}`, `স্তর ও প্রোটোকল বলুন, তারপর এই ট্রেড-অফ ব্যাখ্যা করুন: ${topic.tradeoff.bn}`), topic.order + 3)
  return [
    { id: 'q1', type: 'single', concept: topic.title, prompt: l(`What is the central idea of ${topic.title.en}?`, `${topic.title.bn}-এর মূল ধারণা কী?`), ...purpose, explanation: correct.purpose },
    { id: 'q2', type: 'single', concept: topic.title, prompt: l('Which approach is the strongest starting decision?', 'কোন পদ্ধতিটি সবচেয়ে শক্তিশালী শুরুর সিদ্ধান্ত?'), ...action, explanation: correct.action },
    { id: 'q3', type: 'multi', concept: topic.title, prompt: l('Select both statements that show sound networking reasoning.', 'সঠিক নেটওয়ার্কিং চিন্তা দেখায়—এমন দুটি বক্তব্য বাছুন।'), options: [
      { id: 'a', text: correct.purpose }, { id: 'b', text: distractors[0] }, { id: 'c', text: correct.tradeoff }, { id: 'd', text: distractors[1] },
    ], correct: ['a', 'c'], explanation: l(`A sound answer states both the mechanism and its trade-off: ${topic.tradeoff.en}`, `সঠিক উত্তরে প্রক্রিয়া ও ট্রেড-অফ দুটিই থাকে: ${topic.tradeoff.bn}`) },
    { id: 'q4', type: 'single', concept: topic.title, prompt: l('Which choice is a common mistake?', 'কোনটি সাধারণ ভুল?'), ...mistake, explanation: l(`Avoid this mistake: ${topic.mistake.en}`, `এই ভুল এড়িয়ে চলুন: ${topic.mistake.bn}`) },
    { id: 'q5', type: 'single', concept: topic.title, prompt: l('What should a strong interview answer include?', 'একটি ভালো ইন্টারভিউ উত্তরে কী থাকা উচিত?'), ...interview, explanation: l('Interviewers value naming the layer/protocol and stating an explicit trade-off.', 'ইন্টারভিউয়ার স্তর/প্রোটোকল উল্লেখ ও স্পষ্ট ট্রেড-অফ বলাকে মূল্য দেন।') },
  ]
}

export const networkingTopics = rawTopics.map((row, index) => {
  const [id, moduleId, en, bn, difficulty, minutes, diagram, insightEn, insightBn, analogyEn, analogyBn, actionEn, actionBn, tradeoffEn, tradeoffBn, mistakeEn, mistakeBn] = row
  const topic = {
    id, order: index + 1, moduleId, title: l(en, bn), difficulty, minutes, diagram, deepDive: null,
    insight: l(insightEn, insightBn), analogy: l(analogyEn, analogyBn), action: l(actionEn, actionBn), tradeoff: l(tradeoffEn, tradeoffBn), mistake: l(mistakeEn, mistakeBn),
    objectives: [
      l(`Explain ${en} in plain language.`, `সহজ ভাষায় ${bn} ব্যাখ্যা করতে পারবেন।`),
      l('Place it in the right network layer.', 'এটিকে সঠিক নেটওয়ার্ক স্তরে বসাতে পারবেন।'),
      l('Discuss its most important trade-off.', 'এর সবচেয়ে গুরুত্বপূর্ণ ট্রেড-অফ আলোচনা করতে পারবেন।'),
    ],
    advantages: l(`It gives a clear mental model of ${en.toLowerCase()} and how it underpins real systems.`, `এটি ${bn} ও বাস্তব সিস্টেমে এর ভিত্তি নিয়ে একটি পরিষ্কার ধারণা দেয়।`),
    interview: l(`Name the layer and protocol for ${en.toLowerCase()}, then explain when it is the right choice and its cost.`, `${bn}-এর স্তর ও প্রোটোকল বলুন, তারপর কখন এটি সঠিক পছন্দ ও এর খরচ ব্যাখ্যা করুন।`),
    glossary: [
      { term: l('Protocol', 'প্রোটোকল'), definition: l('An agreed set of rules for how two parties communicate.', 'দুই পক্ষ কীভাবে যোগাযোগ করবে তার সম্মত নিয়ম।') },
      { term: l('Trade-off', 'ট্রেড-অফ'), definition: l('Improving one quality by accepting a cost elsewhere.', 'অন্যদিকে খরচ মেনে একটি গুণ উন্নত করা।') },
    ],
  }
  topic.exam = makeExam(topic).map((question) => ({ ...question, concept: topic.title }))
  return topic
})
