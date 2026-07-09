// Deep, bilingual (English / Bangla) teaching guides for the Kubernetes
// networking and configuration topics. Shape mirrors app/course-guides.js and
// app/guides/git/f.js: each guide is an array of sections { h, blocks }, rendered
// by GuideBlock in app/LearningApp.js. Facts, commands, and YAML are drawn from
// the rawTopics + commands + examples in app/courses/kubernetes.js and kept exact
// where a real example exists. In { code } blocks the YAML is written literally;
// there is never a dollar sign followed by an opening brace.

const l = (en, bn) => ({ en, bn })

export default {
  // ── k8s-service-types · ClusterIP vs NodePort vs LoadBalancer ──────────────
  'k8s-service-types': [
    {
      h: l('What are Service types?', 'সার্ভিস টাইপ কী?'),
      blocks: [
        { p: l('A Kubernetes Service always does the same core job: it gives a stable name and a virtual IP that load-balances traffic across a changing set of pods. The Service *type* decides one extra thing — who is allowed to reach that Service. There are three types you use every day: ClusterIP is internal-only, NodePort opens a port on every node, and LoadBalancer provisions an external cloud load balancer. Same selector, same load balancing underneath; only the reach changes.', 'একটি Kubernetes Service সবসময় একই মূল কাজ করে: এটি একটি স্থিতিশীল নাম ও একটি ভার্চুয়াল IP দেয় যা বদলাতে থাকা পড সেটজুড়ে ট্রাফিক লোড-ব্যালান্স করে। Service-এর *type* শুধু একটি অতিরিক্ত বিষয় ঠিক করে — কে সেই Service-এ পৌঁছাতে পারবে। প্রতিদিন ব্যবহার করা তিনটি টাইপ আছে: ClusterIP শুধু অভ্যন্তরীণ, NodePort প্রতিটি নোডে একটি পোর্ট খোলে, ও LoadBalancer একটি বাহ্যিক ক্লাউড লোড ব্যালান্সার দেয়। নিচে একই selector, একই লোড-ব্যালান্সিং; শুধু নাগাল বদলায়।') },
        { p: l('The problem the types solve is a single question: how far out does this traffic need to reach? Most services only ever talk to other pods inside the cluster, so they should stay private with ClusterIP. A few must be reachable from outside — from the internet or a company network — and those need NodePort or LoadBalancer. Choosing the narrowest type that still works keeps your cluster more secure and your cloud bill smaller, because every extra step of exposure is a new attack surface and, for LoadBalancer, real money.', 'টাইপগুলো একটি প্রশ্নের সমাধান করে: এই ট্রাফিক কতদূর পর্যন্ত পৌঁছাতে হবে? বেশিরভাগ সার্ভিস শুধু ক্লাস্টারের ভেতরের অন্য পডের সঙ্গে কথা বলে, তাই সেগুলো ClusterIP দিয়ে প্রাইভেট থাকাই উচিত। অল্প কিছু সার্ভিসকে বাইরে থেকে পৌঁছাতে হয় — ইন্টারনেট বা কোম্পানি নেটওয়ার্ক থেকে — আর সেগুলোর জন্য NodePort বা LoadBalancer লাগে। যে সবচেয়ে সংকীর্ণ টাইপে কাজ চলে সেটাই বাছলে ক্লাস্টার বেশি নিরাপদ থাকে ও ক্লাউড বিল ছোট থাকে, কারণ প্রতিটি বাড়তি এক্সপোজার একটি নতুন attack surface, আর LoadBalancer-এর ক্ষেত্রে তা আসল টাকা।') },
        { note: l('Think of one backend deployment reachable three ways: an internal office extension only staff can dial (ClusterIP), a numbered side door on every building (NodePort), or a public street address on the main road (LoadBalancer). Behind all three sits the very same team.', 'একই backend deployment তিনভাবে পৌঁছানো যায় ভাবুন: শুধু কর্মীরা ডায়াল করতে পারে এমন একটি অভ্যন্তরীণ অফিস এক্সটেনশন (ClusterIP), প্রতিটি ভবনে নম্বরযুক্ত একটি পাশের দরজা (NodePort), বা মূল রাস্তায় একটি পাবলিক ঠিকানা (LoadBalancer)। তিনটির পেছনেই বসে ঠিক একই টিম।'), kind: 'tip' },
      ],
    },
    {
      h: l('How each type builds on the last', 'প্রতিটি টাইপ কীভাবে আগেরটির ওপর গড়ে'),
      blocks: [
        { p: l('The three types are layered — each one adds exposure on top of the type below it, rather than replacing it. Understanding this stacking is the fastest way to remember what each does.', 'তিনটি টাইপ স্তরে সাজানো — প্রতিটি নিচের টাইপকে প্রতিস্থাপন না করে তার ওপর এক্সপোজার যোগ করে। এই স্তূপীকরণ বোঝাই প্রতিটি কী করে তা মনে রাখার দ্রুততম উপায়।') },
        { steps: [
          l('ClusterIP (the default) allocates a virtual IP that only exists inside the cluster. kube-proxy programs rules on every node so that IP transparently load-balances to the pods your selector matches.', 'ClusterIP (ডিফল্ট) একটি ভার্চুয়াল IP বরাদ্দ করে যা শুধু ক্লাস্টারের ভেতরে থাকে। kube-proxy প্রতিটি নোডে নিয়ম বসায় যাতে সেই IP আপনার selector-এ মেলা পডগুলোতে স্বচ্ছভাবে লোড-ব্যালান্স করে।'),
          l('NodePort takes that ClusterIP Service and additionally opens one port (by default from the 30000–32767 range) on the real IP of every node, so nodeIP:nodePort now reaches the Service from outside the cluster.', 'NodePort সেই ClusterIP Service নেয় ও অতিরিক্তভাবে প্রতিটি নোডের আসল IP-তে একটি পোর্ট (ডিফল্টে 30000–32767 রেঞ্জ থেকে) খোলে, তাই nodeIP:nodePort এখন ক্লাস্টারের বাইরে থেকে Service-এ পৌঁছায়।'),
          l('LoadBalancer takes that NodePort Service and asks your cloud provider to create an external load balancer with a public IP that forwards incoming traffic to those node ports.', 'LoadBalancer সেই NodePort Service নেয় ও আপনার ক্লাউড প্রোভাইডারকে বলে একটি বাহ্যিক লোড ব্যালান্সার তৈরি করতে যার একটি পাবলিক IP আছে ও যা আসা ট্রাফিক সেই node port-গুলোতে পাঠায়।'),
          l('Because each type includes the one below it, a LoadBalancer Service still quietly has a NodePort and a ClusterIP underneath — the layers are cumulative.', 'যেহেতু প্রতিটি টাইপ নিচেরটিকে ধারণ করে, একটি LoadBalancer Service-এর নিচে চুপচাপ একটি NodePort ও একটি ClusterIP-ও থাকে — স্তরগুলো ক্রমযোজিত।'),
        ] },
        { code: `# ClusterIP is the default — reachable only inside the cluster
apiVersion: v1
kind: Service
metadata:
  name: web
spec:
  selector:
    app: web
  ports:
    - port: 80
      targetPort: 80
---
# NodePort — also opens 30080 on every node's IP
apiVersion: v1
kind: Service
metadata:
  name: web-np
spec:
  type: NodePort
  selector:
    app: web
  ports:
    - port: 80
      targetPort: 80
      nodePort: 30080
---
# LoadBalancer — asks the cloud for an external public IP
apiVersion: v1
kind: Service
metadata:
  name: web-lb
spec:
  type: LoadBalancer
  selector:
    app: web
  ports:
    - port: 80
      targetPort: 80`, caption: l('The same pods (selector app: web) exposed three ways. Note only the type field and, for NodePort, the extra nodePort change — the selector and ports stay identical.', 'একই পড (selector app: web) তিনভাবে এক্সপোজ করা। খেয়াল করুন শুধু type ফিল্ড আর NodePort-এর জন্য বাড়তি nodePort বদলায় — selector ও ports একই থাকে।') },
      ],
    },
    {
      h: l('ClusterIP vs NodePort vs LoadBalancer', 'ClusterIP বনাম NodePort বনাম LoadBalancer'),
      blocks: [
        { table: {
          head: [l('Type', 'টাইপ'), l('Reachable from', 'কোথা থেকে পৌঁছানো যায়'), l('External IP?', 'বাহ্যিক IP?'), l('Best for', 'কার জন্য')],
          rows: [
            [l('ClusterIP', 'ClusterIP'), l('Inside the cluster only', 'শুধু ক্লাস্টারের ভেতরে'), l('No', 'না'), l('Internal service-to-service traffic (the default)', 'অভ্যন্তরীণ সার্ভিস-থেকে-সার্ভিস ট্রাফিক (ডিফল্ট)')],
            [l('NodePort', 'NodePort'), l('nodeIP:port on every node (30000–32767)', 'প্রতিটি নোডে nodeIP:port (30000–32767)'), l('Uses node IPs; not a managed IP', 'নোড IP ব্যবহার করে; কোনো ম্যানেজড IP নয়'), l('Dev/testing, on-prem, or behind your own load balancer', 'ডেভ/টেস্টিং, on-prem, বা নিজের লোড ব্যালান্সারের পেছনে')],
            [l('LoadBalancer', 'LoadBalancer'), l('A cloud load balancer’s public IP', 'একটি ক্লাউড লোড ব্যালান্সারের পাবলিক IP'), l('Yes — one provisioned per Service', 'হ্যাঁ — প্রতি Service-এ একটি করে'), l('Public-facing services on a cloud provider', 'ক্লাউড প্রোভাইডারে পাবলিক-মুখী সার্ভিস')],
          ],
        } },
        { note: l('NodePort by itself is rarely a good public entry point: the port numbers are high and ugly, there is no built-in TLS, and clients must know a node’s IP. It is most useful for quick testing or as the target that an external load balancer or Ingress controller sits in front of.', 'NodePort নিজে কমই ভালো পাবলিক প্রবেশপথ: পোর্ট নম্বরগুলো উঁচু ও দৃষ্টিকটু, কোনো বিল্ট-ইন TLS নেই, আর ক্লায়েন্টকে একটি নোডের IP জানতে হয়। এটি দ্রুত টেস্টিং বা এমন target হিসেবে সবচেয়ে কাজের যার সামনে একটি বাহ্যিক লোড ব্যালান্সার বা Ingress কন্ট্রোলার বসে।'), kind: 'tip' },
      ],
    },
    {
      h: l('When and where to use each', 'কখন ও কোথায় কোনটি ব্যবহার করবেন'),
      blocks: [
        { p: l('Default to ClusterIP. The large majority of Services in any real cluster — an API talking to a database, a frontend calling a backend, a cache — only ever receive traffic from other pods, so they should stay internal. Reach for LoadBalancer when a service genuinely needs to be reachable from the public internet and you are on a cloud that can provision one. Use NodePort in the narrow cases where you have no cloud load balancer: local clusters, bare-metal, or when your own external load balancer will forward to the node ports.', 'ডিফল্টে ClusterIP নিন। যেকোনো বাস্তব ক্লাস্টারে বেশিরভাগ Service — একটি API ডেটাবেসের সঙ্গে কথা বলছে, একটি frontend একটি backend কল করছে, একটি cache — শুধু অন্য পড থেকে ট্রাফিক পায়, তাই সেগুলো অভ্যন্তরীণ থাকা উচিত। LoadBalancer নিন যখন কোনো সার্ভিসকে সত্যিই পাবলিক ইন্টারনেট থেকে পৌঁছাতে হয় ও আপনি এমন ক্লাউডে আছেন যা একটি দিতে পারে। NodePort নিন সেই সংকীর্ণ ক্ষেত্রে যেখানে কোনো ক্লাউড লোড ব্যালান্সার নেই: লোকাল ক্লাস্টার, bare-metal, বা যখন আপনার নিজের বাহ্যিক লোড ব্যালান্সার node port-এ পাঠাবে।') },
        { p: l('The important trade-off: LoadBalancer is the easy public path, but creating one per service gets expensive fast, because each provisions a separate paid cloud load balancer with its own IP. When you have many HTTP services to expose, the better pattern is a single Ingress — one LoadBalancer in front of an ingress controller that fans out to many internal ClusterIP Services by host and path. That consolidates cost, TLS, and routing at one entry point instead of paying for a load balancer per microservice.', 'গুরুত্বপূর্ণ ট্রেড-অফ: LoadBalancer সহজ পাবলিক পথ, কিন্তু প্রতি সার্ভিসে একটি বানানো দ্রুত ব্যয়বহুল হয়, কারণ প্রতিটি নিজস্ব IP-সহ একটি আলাদা পেইড ক্লাউড লোড ব্যালান্সার দেয়। যখন এক্সপোজ করার মতো অনেক HTTP সার্ভিস থাকে, তখন ভালো প্যাটার্ন হলো একটি Ingress — একটি ingress কন্ট্রোলারের সামনে একটি LoadBalancer, যা host ও path অনুযায়ী অনেক অভ্যন্তরীণ ClusterIP Service-এ ছড়িয়ে দেয়। এটি খরচ, TLS ও রাউটিং প্রতি মাইক্রোসার্ভিসে লোড ব্যালান্সার না কিনে এক প্রবেশপথে একত্র করে।') },
      ],
    },
    {
      h: l('Common mistakes', 'সাধারণ ভুল'),
      blocks: [
        { list: [
          l('Creating a LoadBalancer per microservice and running up a large, unnecessary cloud bill — use one Ingress to share a single entry point across many HTTP services instead.', 'প্রতি মাইক্রোসার্ভিসে একটি LoadBalancer বানিয়ে একটি বড়, অপ্রয়োজনীয় ক্লাউড বিল তোলা — বদলে অনেক HTTP সার্ভিসজুড়ে একটি প্রবেশপথ শেয়ার করতে একটি Ingress ব্যবহার করুন।'),
          l('Expecting a ClusterIP Service to be reachable from outside the cluster, which it is not — from your laptop you must port-forward, use a NodePort/LoadBalancer, or go through an Ingress.', 'একটি ClusterIP Service ক্লাস্টারের বাইরে থেকে পৌঁছানো যাবে আশা করা, যা যায় না — ল্যাপটপ থেকে আপনাকে port-forward করতে, একটি NodePort/LoadBalancer নিতে, বা একটি Ingress দিয়ে যেতে হবে।'),
          l('Using a raw NodePort as your production public endpoint — high port numbers, no TLS, and clients tied to specific node IPs make it fragile.', 'একটি কাঁচা NodePort-কে প্রোডাকশন পাবলিক এন্ডপয়েন্ট বানানো — উঁচু পোর্ট নম্বর, TLS নেই, ও নির্দিষ্ট নোড IP-তে বাঁধা ক্লায়েন্ট একে ভঙ্গুর করে।'),
          l('Setting a Service type but forgetting the selector must match the pod labels — with no matching pods the Service has no endpoints and silently serves nothing.', 'একটি Service type সেট করে ভুলে যাওয়া যে selector পড লেবেলের সঙ্গে মিলতে হবে — মেলা পড না থাকলে Service-এর কোনো endpoint থাকে না ও নীরবে কিছুই পরিবেশন করে না।'),
        ] },
      ],
    },
    {
      h: l('Remember in one line', 'এক লাইনে মনে রাখুন'),
      blocks: [
        { list: [
          l('ClusterIP = internal only; NodePort = a port on every node; LoadBalancer = an external cloud IP — each layer adds reach on top of the last.', 'ClusterIP = শুধু অভ্যন্তরীণ; NodePort = প্রতিটি নোডে একটি পোর্ট; LoadBalancer = একটি বাহ্যিক ক্লাউড IP — প্রতিটি স্তর আগেরটির ওপর নাগাল যোগ করে।'),
          l('Default to ClusterIP; use LoadBalancer for public services, but consolidate many HTTP services behind one Ingress to save cost.', 'ডিফল্টে ClusterIP নিন; পাবলিক সার্ভিসে LoadBalancer নিন, তবে খরচ বাঁচাতে অনেক HTTP সার্ভিস একটি Ingress-এর পেছনে একত্র করুন।'),
          l('Same selector, same load balancing — the type only changes who can reach the Service.', 'একই selector, একই লোড-ব্যালান্সিং — type শুধু বদলায় কে Service-এ পৌঁছাতে পারবে।'),
        ] },
      ],
    },
  ],

  // ── k8s-dns · Cluster DNS & service discovery ──────────────────────────────
  'k8s-dns': [
    {
      h: l('What is cluster DNS?', 'ক্লাস্টার DNS কী?'),
      blocks: [
        { p: l('Cluster DNS is the built-in service-discovery system of Kubernetes. It gives every Service a predictable name — of the form service.namespace.svc — so pods find each other by name instead of by IP. This matters because pod IPs are ephemeral: a pod can be rescheduled, replaced, or scaled at any moment, and its IP changes with it. A Service’s name and virtual IP are stable, and DNS is what lets your code say "connect to payments" and have that resolve to whatever pods are currently healthy.', 'ক্লাস্টার DNS হলো Kubernetes-এর বিল্ট-ইন সার্ভিস-ডিসকভারি সিস্টেম। এটি প্রতিটি Service-কে একটি অনুমেয় নাম দেয় — service.namespace.svc আকারে — যাতে পড IP নয়, নাম দিয়ে একে অপরকে খুঁজে পায়। এটি জরুরি কারণ পড IP ক্ষণস্থায়ী: একটি পড যেকোনো মুহূর্তে পুনঃশিডিউল, প্রতিস্থাপিত বা স্কেল হতে পারে, ও তার সঙ্গে IP বদলায়। একটি Service-এর নাম ও ভার্চুয়াল IP স্থিতিশীল, আর DNS-ই আপনার কোডকে "connect to payments" বলতে দেয় এবং তা বর্তমানে যে পডগুলো সুস্থ তাদের দিকে রিজলভ করে।') },
        { p: l('In every modern cluster this is served by CoreDNS, a small DNS server running as pods in the kube-system namespace and fronted by a Service (usually called kube-dns). The kubelet configures every application pod to send its DNS queries to that server. So service discovery is not something you install or wire up per app — it is already there, and using it is simply a matter of using the right name.', 'প্রতিটি আধুনিক ক্লাস্টারে এটি CoreDNS দিয়ে পরিবেশিত হয়, একটি ছোট DNS সার্ভার যা kube-system নেমস্পেসে পড হিসেবে চলে ও একটি Service (সাধারণত kube-dns নামে) দিয়ে সামনে থাকে। kubelet প্রতিটি অ্যাপ্লিকেশন পডকে সেই সার্ভারে DNS কুয়েরি পাঠাতে কনফিগার করে। তাই সার্ভিস ডিসকভারি প্রতি অ্যাপে ইনস্টল বা যুক্ত করার কিছু নয় — এটি আগে থেকেই আছে, আর এটি ব্যবহার করা মানে শুধু সঠিক নাম ব্যবহার করা।') },
        { note: l('Cluster DNS is a phone directory for the cluster: you dial "database" by name and it connects you to the right service, no matter which extension (pod IP) is actually staffed right now. Numbers change; the name in the directory does not.', 'ক্লাস্টার DNS হলো ক্লাস্টারের একটি ফোন ডিরেক্টরি: আপনি নাম দিয়ে "database" ডায়াল করেন আর এটি আপনাকে সঠিক সার্ভিসে যুক্ত করে, এখন আসলে কোন এক্সটেনশন (পড IP) সক্রিয় তা যাই হোক। নম্বর বদলায়; ডিরেক্টরির নাম বদলায় না।'), kind: 'tip' },
      ],
    },
    {
      h: l('The naming scheme: service.namespace.svc.cluster.local', 'নেমিং স্কিম: service.namespace.svc.cluster.local'),
      blocks: [
        { p: l('Every Service gets a fully-qualified DNS name built from four parts: the Service name, its namespace, the literal svc (marking it as a Service record), and the cluster domain, which is cluster.local by default. So a Service named payments in the namespace shop is reachable at payments.shop.svc.cluster.local. You rarely type the whole thing, because pods are configured with DNS search domains that fill in the tail for you — but knowing the full form explains why the short names work.', 'প্রতিটি Service একটি পূর্ণ-যোগ্য DNS নাম পায় যা চারটি অংশ দিয়ে গঠিত: Service নাম, তার namespace, আক্ষরিক svc (এটিকে একটি Service রেকর্ড হিসেবে চিহ্নিত করে), ও cluster domain, যা ডিফল্টে cluster.local। তাই shop নেমস্পেসে payments নামের একটি Service payments.shop.svc.cluster.local-এ পৌঁছানো যায়। আপনি পুরোটা কমই টাইপ করেন, কারণ পডগুলো DNS search domain দিয়ে কনফিগার করা থাকে যা আপনার জন্য লেজটুকু ভরে — তবে পূর্ণ রূপ জানলে বোঝা যায় সংক্ষিপ্ত নাম কেন কাজ করে।') },
        { table: {
          head: [l('Name you write', 'যে নাম লেখেন'), l('Resolves to', 'যা রিজলভ করে'), l('Use when', 'কখন ব্যবহার')],
          rows: [
            [l('payments', 'payments'), l('The Service "payments" in the caller’s own namespace', 'কলারের নিজের নেমস্পেসের "payments" Service'), l('Calling a Service in the same namespace', 'একই নেমস্পেসে একটি Service কল করা')],
            [l('payments.shop', 'payments.shop'), l('The Service "payments" in namespace "shop"', '"shop" নেমস্পেসের "payments" Service'), l('Calling a Service in another namespace', 'অন্য নেমস্পেসে একটি Service কল করা')],
            [l('payments.shop.svc.cluster.local', 'payments.shop.svc.cluster.local'), l('The same Service, fully qualified', 'একই Service, পূর্ণ-যোগ্য'), l('Config files, or to skip the search list', 'কনফিগ ফাইল, বা search তালিকা এড়াতে')],
            [l('db-0.postgres.shop.svc.cluster.local', 'db-0.postgres.shop.svc.cluster.local'), l('One specific pod behind a headless Service', 'একটি headless Service-এর পেছনে নির্দিষ্ট একটি পড'), l('StatefulSets needing a stable per-pod name', 'প্রতি-পড স্থিতিশীল নাম দরকার এমন StatefulSet')],
          ],
        } },
      ],
    },
    {
      h: l('How resolution works, step by step', 'রিজলিউশন কীভাবে কাজ করে, ধাপে ধাপে'),
      blocks: [
        { steps: [
          l('You create a Service; the control plane records its name and ClusterIP, and CoreDNS learns an A record mapping the Service’s DNS name to that ClusterIP.', 'আপনি একটি Service বানান; control plane তার নাম ও ClusterIP রেকর্ড করে, আর CoreDNS একটি A রেকর্ড শেখে যা Service-এর DNS নামকে সেই ClusterIP-তে ম্যাপ করে।'),
          l('Your app in a pod calls a short name like payments. The pod’s /etc/resolv.conf points its resolver at the CoreDNS ClusterIP and lists search domains such as shop.svc.cluster.local.', 'একটি পডে আপনার অ্যাপ payments-এর মতো একটি সংক্ষিপ্ত নাম কল করে। পডের /etc/resolv.conf তার resolver-কে CoreDNS ClusterIP-এ নির্দেশ করে ও shop.svc.cluster.local-এর মতো search domain তালিকাভুক্ত করে।'),
          l('The resolver appends each search domain in turn — payments.shop.svc.cluster.local — and asks CoreDNS, which answers with the Service’s ClusterIP.', 'resolver প্রতিটি search domain একে একে জোড়ে — payments.shop.svc.cluster.local — ও CoreDNS-কে জিজ্ঞাসা করে, যা Service-এর ClusterIP দিয়ে উত্তর দেয়।'),
          l('Your app connects to that ClusterIP, and kube-proxy on the node load-balances the connection to one of the healthy pods behind the Service.', 'আপনার অ্যাপ সেই ClusterIP-তে সংযোগ করে, ও নোডের kube-proxy সংযোগটি Service-এর পেছনের সুস্থ পডগুলোর একটিতে লোড-ব্যালান্স করে।'),
          l('When pods come and go, the Service’s ClusterIP stays the same, so the DNS answer stays valid — only the endpoints behind it change.', 'পড আসা-যাওয়া করলে Service-এর ClusterIP একই থাকে, তাই DNS উত্তর বৈধ থাকে — শুধু তার পেছনের endpoint বদলায়।'),
        ] },
        { code: `# A pod in namespace "shop" calling the "payments" Service:
curl http://payments                            # same namespace
curl http://payments.shop                        # explicit namespace
curl http://payments.shop.svc.cluster.local      # fully qualified

# Why the short names work — inside a pod's /etc/resolv.conf:
# nameserver 10.96.0.10       <- the CoreDNS ClusterIP
# search shop.svc.cluster.local svc.cluster.local cluster.local
# options ndots:5`, caption: l('The search domains let a bare "payments" expand to the full name automatically. The nameserver line is the CoreDNS Service IP that every pod queries.', 'search domain একটি খালি "payments"-কে স্বয়ংক্রিয়ভাবে পূর্ণ নামে প্রসারিত করে। nameserver লাইনটি হলো CoreDNS Service IP যা প্রতিটি পড কুয়েরি করে।') },
      ],
    },
    {
      h: l('Same namespace vs across namespaces', 'একই নেমস্পেস বনাম নেমস্পেসজুড়ে'),
      blocks: [
        { p: l('Within one namespace, the short Service name is all you need — payments resolves to the payments Service in your own namespace because the first search domain (yournamespace.svc.cluster.local) is tried first. This keeps app configuration clean and portable: the same manifest deployed to a dev namespace and a prod namespace resolves to the right neighbours in each, with no change.', 'একটি নেমস্পেসের ভেতরে সংক্ষিপ্ত Service নামই যথেষ্ট — payments আপনার নিজের নেমস্পেসের payments Service-এ রিজলভ করে কারণ প্রথম search domain (yournamespace.svc.cluster.local) আগে চেষ্টা করা হয়। এটি অ্যাপ কনফিগ পরিষ্কার ও পোর্টেবল রাখে: একই manifest একটি dev নেমস্পেস ও একটি prod নেমস্পেসে ডিপ্লয় করলে প্রতিটিতে সঠিক প্রতিবেশীতে রিজলভ করে, কোনো পরিবর্তন ছাড়াই।') },
        { p: l('To reach a Service in a different namespace, you must qualify the name with that namespace: payments.shop, or the full payments.shop.svc.cluster.local. This is a deliberate boundary — a bare name never silently crosses namespaces, so a monitoring Service and a payments Service that happen to share a short name in two namespaces will not collide. When in doubt, or in a config file that might be read from anywhere, use the fully-qualified name.', 'ভিন্ন নেমস্পেসের একটি Service-এ পৌঁছাতে হলে নামটিকে সেই নেমস্পেস দিয়ে যোগ্য করতে হবে: payments.shop, বা পূর্ণ payments.shop.svc.cluster.local। এটি একটি ইচ্ছাকৃত সীমানা — একটি খালি নাম কখনো নীরবে নেমস্পেস অতিক্রম করে না, তাই দুটি নেমস্পেসে সংক্ষিপ্ত নাম ভাগ করা একটি monitoring Service ও একটি payments Service সংঘর্ষ করবে না। সন্দেহ হলে, বা যেকোনো জায়গা থেকে পড়া হতে পারে এমন কনফিগ ফাইলে, পূর্ণ-যোগ্য নাম ব্যবহার করুন।') },
      ],
    },
    {
      h: l('When and where DNS discovery matters', 'DNS ডিসকভারি কখন ও কোথায় গুরুত্বপূর্ণ'),
      blocks: [
        { p: l('Use Service DNS names for every in-cluster connection — an app reaching its database, a gateway calling a backend, one microservice invoking another. This is the whole point of Services: your code depends on a stable name, and Kubernetes handles the shifting pods behind it. It is the difference between configuration that survives a redeploy and configuration that breaks the next time a pod restarts.', 'প্রতিটি ক্লাস্টার-অভ্যন্তরীণ সংযোগে Service DNS নাম ব্যবহার করুন — একটি অ্যাপ তার ডেটাবেসে পৌঁছাচ্ছে, একটি gateway একটি backend কল করছে, একটি মাইক্রোসার্ভিস আরেকটিকে ডাকছে। এটাই Service-এর পুরো উদ্দেশ্য: আপনার কোড একটি স্থিতিশীল নামের ওপর নির্ভর করে, আর Kubernetes এর পেছনের বদলাতে থাকা পড সামলায়। এটি এমন কনফিগের পার্থক্য যা redeploy টিকে যায় বনাম যা পরের বার পড রিস্টার্ট করলে ভাঙে।') },
        { p: l('The trade-off to keep in mind is DNS caching. DNS discovery is stable and simple, but some applications and language runtimes cache DNS answers aggressively and can be slow to pick up endpoint changes after a scale-up or failover. If you see traffic still heading to an old set of pods, suspect a stale resolver cache in the client, not Kubernetes itself. A related gotcha is the default ndots:5 setting, which makes short external names go through several failed cluster lookups first — worth tuning if outbound DNS to the internet feels slow.', 'মনে রাখার ট্রেড-অফ হলো DNS ক্যাশিং। DNS ডিসকভারি স্থিতিশীল ও সরল, তবে কিছু অ্যাপ্লিকেশন ও ভাষা রানটাইম DNS উত্তর আক্রমণাত্মকভাবে cache করে ও একটি scale-up বা failover-এর পর endpoint পরিবর্তন নিতে ধীর হতে পারে। ট্রাফিক এখনো পুরনো পড সেটে যেতে দেখলে ক্লায়েন্টে পুরনো resolver cache সন্দেহ করুন, Kubernetes নিজে নয়। সম্পর্কিত একটি ফাঁদ হলো ডিফল্ট ndots:5 সেটিং, যা সংক্ষিপ্ত বাহ্যিক নামকে আগে কয়েকটি ব্যর্থ ক্লাস্টার lookup-এর মধ্য দিয়ে নেয় — ইন্টারনেটে outbound DNS ধীর মনে হলে টিউন করার মতো।') },
      ],
    },
    {
      h: l('Common mistakes', 'সাধারণ ভুল'),
      blocks: [
        { list: [
          l('Hard-coding a Service’s cluster IP instead of its DNS name — the IP changes when the Service is recreated, and the connection breaks, whereas the name is stable.', 'একটি Service-এর DNS নামের বদলে ক্লাস্টার IP হার্ড-কোড করা — Service পুনঃতৈরিতে IP বদলায় ও সংযোগ ভাঙে, অথচ নাম স্থিতিশীল।'),
          l('Using a bare Service name to reach another namespace — a short name stays within your own namespace, so cross-namespace calls need service.namespace.', 'অন্য নেমস্পেসে পৌঁছাতে একটি খালি Service নাম ব্যবহার — সংক্ষিপ্ত নাম আপনার নিজের নেমস্পেসেই থাকে, তাই নেমস্পেস-জুড়ে কলে service.namespace লাগে।'),
          l('Blaming Kubernetes when a client keeps hitting old pods — the cause is usually the app’s own DNS cache holding a stale answer.', 'ক্লায়েন্ট বারবার পুরনো পডে গেলে Kubernetes-কে দোষ দেওয়া — কারণ সাধারণত অ্যাপের নিজের DNS cache একটি পুরনো উত্তর ধরে রাখা।'),
          l('Expecting a plain ClusterIP Service to give per-pod DNS — for stable individual pod names (as StatefulSets need) you must use a headless Service (clusterIP: None).', 'একটি সাধারণ ClusterIP Service থেকে প্রতি-পড DNS আশা করা — স্থিতিশীল পৃথক পড নামের জন্য (StatefulSet-এর যেমন লাগে) একটি headless Service (clusterIP: None) ব্যবহার করতে হবে।'),
        ] },
      ],
    },
    {
      h: l('Remember in one line', 'এক লাইনে মনে রাখুন'),
      blocks: [
        { list: [
          l('Every Service gets a DNS name service.namespace.svc.cluster.local, served by CoreDNS — always connect by name, never by pod IP.', 'প্রতিটি Service একটি DNS নাম পায় service.namespace.svc.cluster.local, CoreDNS দিয়ে পরিবেশিত — সবসময় নাম দিয়ে সংযোগ করুন, পড IP দিয়ে কখনো নয়।'),
          l('Same namespace: use the short name; different namespace: use service.namespace or the full name.', 'একই নেমস্পেস: সংক্ষিপ্ত নাম নিন; ভিন্ন নেমস্পেস: service.namespace বা পূর্ণ নাম নিন।'),
          l('The name and ClusterIP are stable while pods churn — that stability is exactly what discovery buys you.', 'পড বদলালেও নাম ও ClusterIP স্থিতিশীল থাকে — সেই স্থিতিশীলতাই ডিসকভারি আপনাকে দেয়।'),
        ] },
      ],
    },
  ],

  // ── k8s-ingress · Ingress & HTTP routing ───────────────────────────────────
  'k8s-ingress': [
    {
      h: l('What is an Ingress?', 'Ingress কী?'),
      blocks: [
        { p: l('An Ingress is a Kubernetes object that routes external HTTP and HTTPS traffic to internal Services by host and path, all through a single entry point. Instead of giving every service its own public load balancer, you put one entry point in front of the cluster and write rules like "requests for api.example.com go to the api Service, and example.com/blog goes to the blog Service." It is Layer-7 routing: it understands hostnames, URL paths, and TLS, not just raw ports.', 'একটি Ingress হলো একটি Kubernetes অবজেক্ট যা বাহ্যিক HTTP ও HTTPS ট্রাফিক host ও path অনুযায়ী অভ্যন্তরীণ Service-এ পাঠায়, সবকিছু একটি প্রবেশপথ দিয়ে। প্রতিটি সার্ভিসকে নিজের পাবলিক লোড ব্যালান্সার না দিয়ে, আপনি ক্লাস্টারের সামনে একটি প্রবেশপথ বসান ও এমন নিয়ম লেখেন যেমন "api.example.com-এর রিকোয়েস্ট api Service-এ যাক, আর example.com/blog blog Service-এ যাক।" এটি Layer-7 রাউটিং: এটি hostname, URL path ও TLS বোঝে, শুধু কাঁচা পোর্ট নয়।') },
        { p: l('The problem it solves is exposing many HTTP services affordably and cleanly. The naive approach — a LoadBalancer Service per app — means a separate paid cloud load balancer and IP for every service, plus TLS configured in many places. An Ingress consolidates all of that: one external load balancer, one place for certificates, and one readable set of routing rules. This is why almost every production cluster serving web traffic uses an Ingress rather than a wall of LoadBalancer Services.', 'এটি যে সমস্যা সমাধান করে তা হলো অনেক HTTP সার্ভিস সাশ্রয়ীভাবে ও পরিচ্ছন্নভাবে এক্সপোজ করা। সরল পদ্ধতি — প্রতি অ্যাপে একটি LoadBalancer Service — মানে প্রতিটি সার্ভিসে একটি আলাদা পেইড ক্লাউড লোড ব্যালান্সার ও IP, সঙ্গে অনেক জায়গায় TLS কনফিগার। একটি Ingress এসব একত্র করে: একটি বাহ্যিক লোড ব্যালান্সার, সার্টিফিকেটের জন্য একটি জায়গা, ও একটি পাঠযোগ্য রাউটিং নিয়মের সেট। এ কারণেই ওয়েব ট্রাফিক পরিবেশন করা প্রায় প্রতিটি প্রোডাকশন ক্লাস্টার LoadBalancer Service-এর দেয়ালের বদলে একটি Ingress ব্যবহার করে।') },
        { note: l('An Ingress is a building receptionist: every visitor arrives at one front desk, says who they are there to see (the host and path), and is directed to the right department (Service). One entrance, many destinations, and the receptionist also checks credentials at the door (TLS).', 'একটি Ingress হলো একজন ভবন রিসেপশনিস্ট: প্রতিটি দর্শক একটি ফ্রন্ট ডেস্কে আসে, বলে তারা কার কাছে এসেছে (host ও path), ও সঠিক বিভাগে (Service) পাঠানো হয়। একটি প্রবেশপথ, অনেক গন্তব্য, আর রিসেপশনিস্ট দরজায় পরিচয়ও যাচাই করে (TLS)।'), kind: 'tip' },
      ],
    },
    {
      h: l('How an Ingress works, step by step', 'একটি Ingress কীভাবে কাজ করে, ধাপে ধাপে'),
      blocks: [
        { steps: [
          l('You deploy an ingress controller (such as nginx-ingress) into the cluster; it runs as pods and is itself exposed by a single LoadBalancer or NodePort Service.', 'আপনি ক্লাস্টারে একটি ingress কন্ট্রোলার (যেমন nginx-ingress) ডিপ্লয় করেন; এটি পড হিসেবে চলে ও নিজে একটি LoadBalancer বা NodePort Service দিয়ে এক্সপোজ হয়।'),
          l('You create Ingress objects that declare rules: which host and path should map to which internal Service and port.', 'আপনি Ingress অবজেক্ট বানান যা নিয়ম ঘোষণা করে: কোন host ও path কোন অভ্যন্তরীণ Service ও port-এ ম্যাপ হবে।'),
          l('The controller watches the Ingress objects and continuously reconfigures itself (its nginx config, for example) to match those rules.', 'কন্ট্রোলার Ingress অবজেক্ট নজরে রাখে ও নিজেকে (যেমন তার nginx কনফিগ) সেই নিয়মের সঙ্গে মেলাতে ক্রমাগত পুনঃকনফিগার করে।'),
          l('External traffic hits the controller’s single public IP. The controller reads the Host header and URL path and forwards each request to the matching internal ClusterIP Service.', 'বাহ্যিক ট্রাফিক কন্ট্রোলারের একটি পাবলিক IP-তে আসে। কন্ট্রোলার Host header ও URL path পড়ে ও প্রতিটি রিকোয়েস্ট মেলা অভ্যন্তরীণ ClusterIP Service-এ পাঠায়।'),
          l('If TLS is configured, the controller terminates HTTPS at the edge using a certificate stored in a Kubernetes Secret, so your backend Services can speak plain HTTP internally.', 'TLS কনফিগার থাকলে কন্ট্রোলার একটি Kubernetes Secret-এ রাখা সার্টিফিকেট দিয়ে edge-এ HTTPS terminate করে, তাই আপনার backend Service ভেতরে সাধারণ HTTP-তে কথা বলতে পারে।'),
        ] },
        { code: `apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: site
spec:
  rules:
    - host: example.com
      http:
        paths:
          - path: /api
            pathType: Prefix
            backend:
              service:
                name: api
                port:
                  number: 80`, caption: l('An Ingress routing by path: requests to example.com/api are sent to the api Service on port 80. Add more paths or hosts to route many Services through this one object.', 'পাথ অনুযায়ী রাউট করা একটি Ingress: example.com/api-এর রিকোয়েস্ট port 80-এ api Service-এ পাঠানো হয়। আরও path বা host যোগ করে এই এক অবজেক্ট দিয়ে অনেক Service রাউট করুন।') },
        { note: l('You also need an ingress controller (like nginx-ingress) running for these rules to take effect. The Ingress object is only a set of instructions; without a controller reading and enforcing them, creating an Ingress does absolutely nothing.', 'এই নিয়ম কার্যকর হতে একটি ingress কন্ট্রোলার (যেমন nginx-ingress) চলাও দরকার। Ingress অবজেক্ট শুধু নির্দেশের একটি সেট; এগুলো পড়ে ও কার্যকর করা একটি কন্ট্রোলার ছাড়া একটি Ingress বানালে একেবারেই কিছু হয় না।'), kind: 'warn' },
      ],
    },
    {
      h: l('Ingress vs a LoadBalancer per service', 'Ingress বনাম প্রতি সার্ভিসে LoadBalancer'),
      blocks: [
        { table: {
          head: [l('Aspect', 'দিক'), l('LoadBalancer per service', 'প্রতি সার্ভিসে LoadBalancer'), l('One Ingress', 'একটি Ingress')],
          rows: [
            [l('Layer', 'স্তর'), l('L4 — raw TCP/UDP ports', 'L4 — কাঁচা TCP/UDP পোর্ট'), l('L7 — host + path + TLS', 'L7 — host + path + TLS')],
            [l('Cloud load balancers', 'ক্লাউড লোড ব্যালান্সার'), l('One paid LB per service', 'প্রতি সার্ভিসে একটি পেইড LB'), l('One LB shared by all services', 'সব সার্ভিসে ভাগ করা একটি LB')],
            [l('TLS certificates', 'TLS সার্টিফিকেট'), l('Configured per service', 'প্রতি সার্ভিসে কনফিগার'), l('Centralized at the Ingress', 'Ingress-এ কেন্দ্রীভূত')],
            [l('Best for', 'কার জন্য'), l('Non-HTTP or a single public service', 'নন-HTTP বা একটি পাবলিক সার্ভিস'), l('Many HTTP/HTTPS services', 'অনেক HTTP/HTTPS সার্ভিস')],
          ],
        } },
        { p: l('The short version: use a LoadBalancer Service when you have one thing to expose or the traffic is not HTTP (a database, a game server, raw TCP). Use an Ingress when you have several HTTP/HTTPS services and want to share one entry point, one set of certificates, and one place to reason about routing.', 'সংক্ষেপে: একটি জিনিস এক্সপোজ করার থাকলে বা ট্রাফিক HTTP না হলে (একটি ডেটাবেস, একটি গেম সার্ভার, কাঁচা TCP) একটি LoadBalancer Service নিন। কয়েকটি HTTP/HTTPS সার্ভিস থাকলে ও একটি প্রবেশপথ, একটি সার্টিফিকেট সেট, ও রাউটিং নিয়ে ভাবার একটি জায়গা শেয়ার করতে চাইলে একটি Ingress নিন।') },
      ],
    },
    {
      h: l('Host routing, path routing, and TLS', 'Host রাউটিং, path রাউটিং ও TLS'),
      blocks: [
        { p: l('Ingress rules match on two things. Host routing sends traffic to different Services by domain name — api.example.com to one Service, shop.example.com to another. Path routing sends traffic by URL prefix — /api to the API, /blog to the blog. The pathType (usually Prefix) tells the controller how to match: Prefix matches any path that starts with the value, Exact matches only that exact path. You can combine both to route, say, api.example.com/v1 precisely.', 'Ingress নিয়ম দুটি জিনিসে মেলে। Host রাউটিং ডোমেইন নাম অনুযায়ী ভিন্ন Service-এ ট্রাফিক পাঠায় — api.example.com একটি Service-এ, shop.example.com আরেকটিতে। Path রাউটিং URL prefix অনুযায়ী ট্রাফিক পাঠায় — /api API-তে, /blog blog-এ। pathType (সাধারণত Prefix) কন্ট্রোলারকে বলে কীভাবে মেলাতে হবে: Prefix সেই মান দিয়ে শুরু হওয়া যেকোনো path মেলায়, Exact শুধু ঠিক সেই path মেলায়। দুটি মিলিয়ে আপনি ধরুন api.example.com/v1 নিখুঁতভাবে রাউট করতে পারেন।') },
        { p: l('TLS is added with a tls block that names the hosts to secure and the Secret holding the certificate and key. The controller then terminates HTTPS at the edge — decrypting once, at the entry point — so your internal Services can stay on plain HTTP. Centralizing certificates here (often issued automatically by cert-manager) is far simpler than managing them in every service.', 'TLS একটি tls ব্লক দিয়ে যোগ হয় যা নিরাপদ করার host ও সার্টিফিকেট-কী ধারণকারী Secret নাম দেয়। কন্ট্রোলার তখন edge-এ HTTPS terminate করে — একবার, প্রবেশপথে ডিক্রিপ্ট করে — তাই আপনার অভ্যন্তরীণ Service সাধারণ HTTP-তে থাকতে পারে। এখানে সার্টিফিকেট কেন্দ্রীভূত করা (প্রায়ই cert-manager স্বয়ংক্রিয়ভাবে ইস্যু করে) প্রতিটি সার্ভিসে সামলানোর চেয়ে অনেক সরল।') },
        { code: `apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: site
spec:
  tls:
    - hosts:
        - example.com
      secretName: example-tls
  rules:
    - host: example.com
      http:
        paths:
          - path: /
            pathType: Prefix
            backend:
              service:
                name: web
                port:
                  number: 80`, caption: l('The tls block terminates HTTPS for example.com using the certificate in the example-tls Secret, then forwards decrypted requests to the web Service.', 'tls ব্লক example-tls Secret-এর সার্টিফিকেট দিয়ে example.com-এর জন্য HTTPS terminate করে, তারপর ডিক্রিপ্ট করা রিকোয়েস্ট web Service-এ পাঠায়।') },
      ],
    },
    {
      h: l('When and where to use an Ingress', 'কখন ও কোথায় Ingress ব্যবহার করবেন'),
      blocks: [
        { p: l('Reach for an Ingress the moment you have more than one HTTP service to expose, or a single one that needs TLS and clean host/path routing. Define Ingress rules mapping hostnames and paths to Services, and run an ingress controller to enforce them. It is the standard front door for web traffic in Kubernetes, and it keeps cost and configuration under control as the number of services grows.', 'একটির বেশি HTTP সার্ভিস এক্সপোজ করার থাকলেই, বা একটি সার্ভিসেরও TLS ও পরিচ্ছন্ন host/path রাউটিং লাগলেই একটি Ingress নিন। hostname ও path-কে Service-এ ম্যাপ করা Ingress নিয়ম সংজ্ঞায়িত করুন, ও এদের কার্যকর করতে একটি ingress কন্ট্রোলার চালান। এটি Kubernetes-এ ওয়েব ট্রাফিকের প্রমিত সদর দরজা, ও সার্ভিসের সংখ্যা বাড়লেও খরচ ও কনফিগ নিয়ন্ত্রণে রাখে।') },
        { p: l('Two cautions. First, an Ingress only handles HTTP/HTTPS — for raw TCP/UDP (a database, a message broker) you still need a LoadBalancer or NodePort Service. Second, Ingress consolidates routing and TLS at one point, but that makes the ingress controller a critical shared component: if it goes down, everything behind it is unreachable at once. Run it with multiple replicas and monitor it as the important piece of infrastructure it is.', 'দুটি সতর্কতা। প্রথমত, একটি Ingress শুধু HTTP/HTTPS সামলায় — কাঁচা TCP/UDP-এর জন্য (একটি ডেটাবেস, একটি message broker) এখনো একটি LoadBalancer বা NodePort Service লাগে। দ্বিতীয়ত, Ingress রাউটিং ও TLS এক বিন্দুতে একত্র করে, তবে তা ingress কন্ট্রোলারকে একটি সংকটপূর্ণ শেয়ার্ড উপাদান করে: এটি ডাউন হলে এর পেছনের সবকিছু একসঙ্গে পৌঁছানো যায় না। এটিকে একাধিক replica দিয়ে চালান ও যে গুরুত্বপূর্ণ অবকাঠামো তা হিসেবে নজরে রাখুন।') },
      ],
    },
    {
      h: l('Common mistakes', 'সাধারণ ভুল'),
      blocks: [
        { list: [
          l('Creating Ingress rules without deploying an ingress controller, so nothing actually routes the traffic — the object exists but no software is reading it.', 'একটি ingress কন্ট্রোলার ডিপ্লয় না করে Ingress নিয়ম বানানো, ফলে কিছুই আসলে ট্রাফিক রাউট করে না — অবজেক্টটি আছে কিন্তু কোনো সফটওয়্যার তা পড়ছে না।'),
          l('Pointing an Ingress at a Service that does not exist, has no matching pods, or uses a different port than the backend declares.', 'এমন একটি Service-এর দিকে Ingress তাক করা যা নেই, যার মেলা পড নেই, বা যা backend-এর ঘোষিত থেকে ভিন্ন port ব্যবহার করে।'),
          l('Trying to route non-HTTP traffic (raw TCP/UDP) through an Ingress — it only understands HTTP/HTTPS; use a Service for the rest.', 'একটি Ingress দিয়ে নন-HTTP ট্রাফিক (কাঁচা TCP/UDP) রাউট করার চেষ্টা — এটি শুধু HTTP/HTTPS বোঝে; বাকিটার জন্য একটি Service নিন।'),
          l('Forgetting the TLS Secret (or referencing the wrong one), so HTTPS fails or the browser warns about an invalid certificate.', 'TLS Secret ভুলে যাওয়া (বা ভুলটি রেফার করা), ফলে HTTPS ব্যর্থ হয় বা ব্রাউজার একটি অবৈধ সার্টিফিকেট নিয়ে সতর্ক করে।'),
        ] },
      ],
    },
    {
      h: l('Remember in one line', 'এক লাইনে মনে রাখুন'),
      blocks: [
        { list: [
          l('An Ingress routes external HTTP/HTTPS to internal Services by host and path through one shared entry point.', 'একটি Ingress বাহ্যিক HTTP/HTTPS একটি শেয়ার্ড প্রবেশপথ দিয়ে host ও path অনুযায়ী অভ্যন্তরীণ Service-এ পাঠায়।'),
          l('The Ingress object is just rules — you must run an ingress controller for anything to happen.', 'Ingress অবজেক্ট শুধু নিয়ম — কিছু ঘটাতে আপনাকে একটি ingress কন্ট্রোলার চালাতে হবে।'),
          l('Use it to expose many HTTP services cheaply and terminate TLS in one place; use a plain Service for non-HTTP traffic.', 'অনেক HTTP সার্ভিস সস্তায় এক্সপোজ ও এক জায়গায় TLS terminate করতে এটি নিন; নন-HTTP ট্রাফিকে একটি সাধারণ Service নিন।'),
        ] },
      ],
    },
  ],

  // ── k8s-networkpolicy · Network policies ───────────────────────────────────
  'k8s-networkpolicy': [
    {
      h: l('What is a NetworkPolicy?', 'NetworkPolicy কী?'),
      blocks: [
        { p: l('By default, every pod in a Kubernetes cluster can open a network connection to every other pod — the cluster network is completely flat and open. A NetworkPolicy changes that: it is a firewall for pod-to-pod traffic that restricts which pods may connect to which, based on labels. You write rules like "only pods labelled app: web may talk to pods labelled app: db, on port 5432," and everything not explicitly allowed to those pods is dropped.', 'ডিফল্টে, একটি Kubernetes ক্লাস্টারের প্রতিটি পড অন্য প্রতিটি পডে একটি নেটওয়ার্ক সংযোগ খুলতে পারে — ক্লাস্টার নেটওয়ার্ক সম্পূর্ণ সমতল ও খোলা। একটি NetworkPolicy তা বদলায়: এটি পড-থেকে-পড ট্রাফিকের একটি ফায়ারওয়াল যা লেবেলের ভিত্তিতে কোন পড কোনটিতে সংযোগ করতে পারবে তা সীমিত করে। আপনি এমন নিয়ম লেখেন যেমন "শুধু app: web লেবেলের পড app: db লেবেলের পডে port 5432-এ কথা বলতে পারবে," ও সেই পডগুলোতে স্পষ্টভাবে অনুমোদিত নয় এমন সবকিছু ফেলে দেওয়া হয়।') },
        { p: l('The problem this solves is lateral movement. In a flat network, if an attacker compromises one low-value pod — say a public-facing web frontend — they can then reach every other pod, including your database and internal services, unhindered. NetworkPolicies let you segment the cluster so a breach in one place cannot freely spread, which is a core part of a defense-in-depth, zero-trust posture.', 'এটি যে সমস্যা সমাধান করে তা হলো lateral movement। একটি সমতল নেটওয়ার্কে, কোনো আক্রমণকারী একটি কম-মূল্যের পড দখল করলে — ধরুন একটি পাবলিক-মুখী web frontend — তারা তখন আপনার ডেটাবেস ও অভ্যন্তরীণ সার্ভিসসহ অন্য প্রতিটি পডে বিনা বাধায় পৌঁছাতে পারে। NetworkPolicy আপনাকে ক্লাস্টার segment করতে দেয় যাতে এক জায়গার একটি breach অবাধে ছড়াতে না পারে, যা defense-in-depth, zero-trust ভঙ্গির একটি মূল অংশ।') },
        { note: l('Think of access rules between departments in a company. By default anyone can walk into any office. A NetworkPolicy is the badge system: only the people (pods) you explicitly authorize can enter a given department, and everyone else is turned away at the door.', 'একটি কোম্পানির বিভাগগুলোর মধ্যে অ্যাক্সেস নিয়ম ভাবুন। ডিফল্টে যে কেউ যেকোনো অফিসে ঢুকতে পারে। একটি NetworkPolicy হলো ব্যাজ সিস্টেম: শুধু যাদের (পড) আপনি স্পষ্টভাবে অনুমোদন দেন তারাই একটি নির্দিষ্ট বিভাগে ঢুকতে পারে, বাকি সবাইকে দরজায় ফিরিয়ে দেওয়া হয়।'), kind: 'tip' },
      ],
    },
    {
      h: l('How a NetworkPolicy works, step by step', 'একটি NetworkPolicy কীভাবে কাজ করে, ধাপে ধাপে'),
      blocks: [
        { steps: [
          l('A NetworkPolicy is namespaced and uses a podSelector to choose which pods it applies to — for example, all pods labelled app: db in the shop namespace.', 'একটি NetworkPolicy namespaced ও একটি podSelector দিয়ে কোন পডে প্রযোজ্য তা বাছে — যেমন shop নেমস্পেসে app: db লেবেলের সব পড।'),
          l('The moment any policy selects a pod, that pod becomes "isolated" for the chosen direction: only traffic that some policy explicitly allows is permitted; everything else is denied.', 'যেই মুহূর্তে কোনো policy একটি পড বাছে, সেই পড বাছাই করা দিকের জন্য "isolated" হয়ে যায়: শুধু কোনো policy স্পষ্টভাবে অনুমোদন করা ট্রাফিক অনুমোদিত; বাকি সব ডিনাই।'),
          l('An ingress rule lists allowed sources (via podSelector, namespaceSelector, or ipBlock) and optionally the ports they may use; egress rules do the same for outbound traffic.', 'একটি ingress নিয়ম অনুমোদিত উৎস (podSelector, namespaceSelector, বা ipBlock দিয়ে) ও ঐচ্ছিকভাবে তারা যে port ব্যবহার করতে পারে তা তালিকাভুক্ত করে; egress নিয়ম outbound ট্রাফিকের জন্য একই করে।'),
          l('Policies are additive — with several policies selecting a pod, a connection is allowed if any one of them permits it. There is no "deny" rule; you allow, and everything else is implicitly denied.', 'Policy ক্রমযোজিত — একটি পড বাছা কয়েকটি policy থাকলে, তাদের যেকোনো একটি অনুমতি দিলেই একটি সংযোগ অনুমোদিত। কোনো "deny" নিয়ম নেই; আপনি allow করেন, বাকি সব অন্তর্নিহিতভাবে ডিনাই।'),
          l('A CNI plugin that supports NetworkPolicy (Calico, Cilium, Weave) actually enforces the rules in the node’s networking layer. Without such a plugin, the policies are accepted but do nothing.', 'NetworkPolicy সমর্থন করা একটি CNI প্লাগইন (Calico, Cilium, Weave) আসলে নোডের নেটওয়ার্কিং স্তরে নিয়ম কার্যকর করে। এমন প্লাগইন ছাড়া policy গৃহীত হয় কিন্তু কিছুই করে না।'),
        ] },
        { code: `apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: db-allow-web
  namespace: shop
spec:
  podSelector:
    matchLabels:
      app: db
  policyTypes:
    - Ingress
  ingress:
    - from:
        - podSelector:
            matchLabels:
              app: web
      ports:
        - protocol: TCP
          port: 5432`, caption: l('This policy selects the db pods and allows inbound traffic only from web pods, only on TCP 5432. Once it exists, every other source to the db pods is blocked.', 'এই policy db পড বাছে ও শুধু web পড থেকে, শুধু TCP 5432-এ inbound ট্রাফিক অনুমোদন করে। এটি থাকলে db পডে অন্য প্রতিটি উৎস ব্লক হয়।') },
      ],
    },
    {
      h: l('Ingress, egress, and default-deny', 'Ingress, egress ও default-deny'),
      blocks: [
        { p: l('A policy governs a direction: ingress controls connections coming into the selected pods, egress controls connections they make going out. The policyTypes field says which directions this policy covers. A powerful and common pattern is default-deny: a policy that selects all pods (an empty podSelector) and lists no allowed traffic, which isolates every pod in the namespace. You then layer specific allow-policies on top for the connections you actually need. This "deny everything, then allow the few required paths" approach is the safe default for a sensitive namespace.', 'একটি policy একটি দিক নিয়ন্ত্রণ করে: ingress বাছাই করা পডে আসা সংযোগ নিয়ন্ত্রণ করে, egress তাদের বাইরে করা সংযোগ নিয়ন্ত্রণ করে। policyTypes ফিল্ড বলে এই policy কোন দিক ঢাকে। একটি শক্তিশালী ও সাধারণ প্যাটার্ন হলো default-deny: একটি policy যা সব পড বাছে (একটি খালি podSelector) ও কোনো অনুমোদিত ট্রাফিক তালিকা করে না, যা নেমস্পেসের প্রতিটি পড isolate করে। তারপর আপনি আসলে যে সংযোগ দরকার তার জন্য নির্দিষ্ট allow-policy ওপরে স্তরে বসান। এই "সব ডিনাই করো, তারপর দরকারি অল্প কিছু পথ allow করো" পদ্ধতি একটি স্পর্শকাতর নেমস্পেসের নিরাপদ ডিফল্ট।') },
        { code: `apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: default-deny-ingress
  namespace: shop
spec:
  podSelector: {}
  policyTypes:
    - Ingress`, caption: l('An empty podSelector selects every pod in the shop namespace; with policyTypes Ingress and no ingress rules, all inbound pod traffic is denied until you add explicit allow-policies.', 'একটি খালি podSelector shop নেমস্পেসের প্রতিটি পড বাছে; policyTypes Ingress ও কোনো ingress নিয়ম না থাকায়, স্পষ্ট allow-policy যোগ না করা পর্যন্ত সব inbound পড ট্রাফিক ডিনাই।') },
      ],
    },
    {
      h: l('Key fields of a NetworkPolicy', 'একটি NetworkPolicy-এর মূল ফিল্ড'),
      blocks: [
        { table: {
          head: [l('Field', 'ফিল্ড'), l('What it does', 'যা করে')],
          rows: [
            [l('podSelector', 'podSelector'), l('Chooses which pods the policy applies to; an empty {} means every pod in the namespace.', 'কোন পডে policy প্রযোজ্য তা বাছে; খালি {} মানে নেমস্পেসের প্রতিটি পড।')],
            [l('policyTypes', 'policyTypes'), l('Whether this policy governs Ingress, Egress, or both.', 'এই policy Ingress, Egress, নাকি দুটোই নিয়ন্ত্রণ করে।')],
            [l('ingress.from', 'ingress.from'), l('Allowed sources — by podSelector, namespaceSelector, or ipBlock.', 'অনুমোদিত উৎস — podSelector, namespaceSelector, বা ipBlock দিয়ে।')],
            [l('egress.to', 'egress.to'), l('Allowed destinations for outbound connections.', 'outbound সংযোগের অনুমোদিত গন্তব্য।')],
            [l('ports', 'ports'), l('Which protocol and port the allowed traffic may use.', 'অনুমোদিত ট্রাফিক কোন protocol ও port ব্যবহার করতে পারে।')],
          ],
        } },
        { note: l('Selectors are additive within a namespace but bounded by it: a podSelector only sees pods in the policy’s own namespace. To allow traffic from another namespace you must add a namespaceSelector, or the connection is denied.', 'Selector একটি নেমস্পেসের মধ্যে ক্রমযোজিত কিন্তু তা দিয়েই সীমাবদ্ধ: একটি podSelector শুধু policy-র নিজের নেমস্পেসের পড দেখে। অন্য নেমস্পেস থেকে ট্রাফিক অনুমোদন করতে একটি namespaceSelector যোগ করতে হবে, নইলে সংযোগ ডিনাই।'), kind: 'tip' },
      ],
    },
    {
      h: l('When and where to use NetworkPolicies', 'কখন ও কোথায় NetworkPolicy ব্যবহার করবেন'),
      blocks: [
        { p: l('Apply NetworkPolicies to allow only the traffic your architecture actually needs — web to db, api to cache — and deny the rest by default. They are most valuable in multi-tenant clusters, in namespaces that hold sensitive data, and around any pod that is exposed to the outside world and therefore a likely first target. A good starting point is a default-deny policy per sensitive namespace, followed by narrow allow-rules mapping the real dependencies between your services.', 'শুধু আপনার আর্কিটেকচারের আসলে দরকারি ট্রাফিক অনুমোদন করতে NetworkPolicy প্রয়োগ করুন — web থেকে db, api থেকে cache — ও বাকিটা ডিফল্টে ডিনাই করুন। এগুলো multi-tenant ক্লাস্টারে, স্পর্শকাতর ডেটা রাখা নেমস্পেসে, ও বাইরের জগতে এক্সপোজড এবং তাই সম্ভাব্য প্রথম target এমন যেকোনো পডের চারপাশে সবচেয়ে মূল্যবান। একটি ভালো শুরু হলো প্রতি স্পর্শকাতর নেমস্পেসে একটি default-deny policy, তারপর আপনার সার্ভিসের আসল নির্ভরতা ম্যাপ করা সংকীর্ণ allow-নিয়ম।') },
        { p: l('The trade-off is real: NetworkPolicies greatly reduce lateral-movement risk, but they require a supporting CNI plugin and careful, tested rules. On a cluster whose CNI does not enforce policies (plain Flannel, for instance), your rules are silently ignored — a dangerous false sense of security. And overly strict rules cause connections to fail in confusing ways, so introduce them incrementally, verify each path still works, and prefer explicit allow-rules that document your service dependencies as a bonus.', 'ট্রেড-অফ বাস্তব: NetworkPolicy lateral-movement ঝুঁকি অনেক কমায়, তবে একটি সমর্থক CNI প্লাগইন ও সতর্ক, পরীক্ষিত নিয়ম লাগে। যে ক্লাস্টারের CNI policy কার্যকর করে না (যেমন সাধারণ Flannel), সেখানে আপনার নিয়ম নীরবে উপেক্ষিত হয় — নিরাপত্তার একটি বিপজ্জনক মিথ্যা অনুভূতি। আর অতিরিক্ত কঠোর নিয়ম বিভ্রান্তিকরভাবে সংযোগ ব্যর্থ করায়, তাই এগুলো ধাপে ধাপে আনুন, প্রতিটি পথ এখনো কাজ করে যাচাই করুন, ও এমন স্পষ্ট allow-নিয়ম নিন যা বোনাস হিসেবে আপনার সার্ভিস নির্ভরতা নথিভুক্ত করে।') },
      ],
    },
    {
      h: l('Common mistakes', 'সাধারণ ভুল'),
      blocks: [
        { list: [
          l('Assuming pods are isolated by default — without a NetworkPolicy every pod can reach every other pod, so an unprotected cluster is fully open internally.', 'ধরে নেওয়া পড ডিফল্টে আলাদা — একটি NetworkPolicy ছাড়া প্রতিটি পড প্রতিটি অন্য পডে পৌঁছাতে পারে, তাই একটি অরক্ষিত ক্লাস্টার ভেতরে সম্পূর্ণ খোলা।'),
          l('Writing policies on a cluster whose CNI plugin does not enforce them, so the rules are silently ignored and give a false sense of security.', 'এমন ক্লাস্টারে policy লেখা যার CNI প্লাগইন সেগুলো কার্যকর করে না, ফলে নিয়ম নীরবে উপেক্ষিত হয় ও নিরাপত্তার মিথ্যা অনুভূতি দেয়।'),
          l('Forgetting a namespaceSelector when the source pod is in another namespace, so legitimate cross-namespace traffic is unexpectedly blocked.', 'উৎস পড অন্য নেমস্পেসে থাকলে একটি namespaceSelector ভুলে যাওয়া, ফলে বৈধ নেমস্পেস-জুড়ে ট্রাফিক অপ্রত্যাশিতভাবে ব্লক হয়।'),
          l('Adding a default-deny policy but forgetting to also allow DNS (egress to kube-dns on port 53), which quietly breaks name resolution for every pod.', 'একটি default-deny policy যোগ করে DNS-ও (port 53-এ kube-dns-এ egress) অনুমোদন করতে ভুলে যাওয়া, যা নীরবে প্রতিটি পডের নাম রিজলিউশন ভাঙে।'),
        ] },
      ],
    },
    {
      h: l('Remember in one line', 'এক লাইনে মনে রাখুন'),
      blocks: [
        { list: [
          l('Pods are wide open by default; a NetworkPolicy is a label-based firewall that allows only the connections you name.', 'পড ডিফল্টে সম্পূর্ণ খোলা; একটি NetworkPolicy হলো একটি লেবেল-ভিত্তিক ফায়ারওয়াল যা শুধু আপনার নামানো সংযোগ অনুমোদন করে।'),
          l('Selecting a pod isolates it for that direction; policies only allow, and everything not allowed is denied.', 'একটি পড বাছলে তা সেই দিকের জন্য isolate হয়; policy শুধু allow করে, ও যা allow নয় তা ডিনাই।'),
          l('Policies need a CNI plugin that enforces them — Calico or Cilium — or your rules do nothing at all.', 'Policy-র একটি CNI প্লাগইন লাগে যা এগুলো কার্যকর করে — Calico বা Cilium — নইলে আপনার নিয়ম কিছুই করে না।'),
        ] },
      ],
    },
  ],

  // ── k8s-configmap · ConfigMaps ─────────────────────────────────────────────
  'k8s-configmap': [
    {
      h: l('What is a ConfigMap?', 'ConfigMap কী?'),
      blocks: [
        { p: l('A ConfigMap is a Kubernetes object that stores non-secret configuration as key-value data, which you then inject into pods as environment variables or files. It is how you keep configuration — log levels, feature flags, service URLs, timeouts — out of your container image and separate from your code. The same image can then run in dev, staging, and production, with only the ConfigMap changing between them.', 'একটি ConfigMap হলো একটি Kubernetes অবজেক্ট যা নন-সিক্রেট কনফিগারেশন কী-ভ্যালু ডেটা হিসেবে রাখে, যা আপনি তারপর env ভ্যারিয়েবল বা ফাইল হিসেবে পডে দেন। এটিই আপনার কনফিগারেশন — log level, feature flag, service URL, timeout — কন্টেইনার ইমেজের বাইরে ও কোড থেকে আলাদা রাখার উপায়। একই ইমেজ তখন dev, staging ও production-এ চলতে পারে, শুধু ConfigMap তাদের মধ্যে বদলায়।') },
        { p: l('The problem it solves is the temptation to bake configuration into the image or hard-code it in the app. When settings live in the image, changing a single value means rebuilding and redeploying the whole image; and one image can no longer be promoted unchanged from test to production. A ConfigMap decouples configuration from the image, so you change settings by editing an object and restarting pods — no rebuild required.', 'এটি যে সমস্যা সমাধান করে তা হলো কনফিগারেশন ইমেজে ঢুকিয়ে দেওয়া বা অ্যাপে হার্ড-কোড করার প্রলোভন। সেটিং ইমেজে থাকলে একটিমাত্র মান বদলানো মানে পুরো ইমেজ পুনর্নির্মাণ ও পুনঃডিপ্লয়; আর একটি ইমেজ আর অপরিবর্তিতভাবে test থেকে production-এ তোলা যায় না। একটি ConfigMap কনফিগকে ইমেজ থেকে ডিকাপল করে, তাই আপনি একটি অবজেক্ট এডিট করে ও পড রিস্টার্ট করে সেটিং বদলান — কোনো পুনর্নির্মাণ লাগে না।') },
        { note: l('A ConfigMap is a settings file the app reads at startup: you change the settings without rebuilding the app. Ship one binary, then hand it a different settings file in each environment.', 'একটি ConfigMap হলো একটি সেটিংস ফাইল যা অ্যাপ শুরুতে পড়ে: আপনি অ্যাপ পুনর্নির্মাণ ছাড়াই সেটিং বদলান। একটি binary পাঠান, তারপর প্রতিটি এনভায়রনমেন্টে তাকে একটি ভিন্ন সেটিংস ফাইল দিন।'), kind: 'tip' },
      ],
    },
    {
      h: l('How it works, step by step', 'কীভাবে কাজ করে, ধাপে ধাপে'),
      blocks: [
        { steps: [
          l('You create a ConfigMap holding your configuration as key-value pairs under a data field — for example LOG_LEVEL: info and FEATURE_X: "true".', 'আপনি একটি ConfigMap বানান যা আপনার কনফিগ data ফিল্ডের নিচে কী-ভ্যালু জোড়া হিসেবে রাখে — যেমন LOG_LEVEL: info ও FEATURE_X: "true"।'),
          l('In your pod spec you reference the ConfigMap — via envFrom to load every key, via a single valueFrom for one key, or as a mounted volume to turn keys into files.', 'আপনার পড স্পেকে আপনি ConfigMap রেফার করেন — প্রতিটি কী লোড করতে envFrom দিয়ে, একটি কী-এর জন্য একটি valueFrom দিয়ে, বা কী-কে ফাইলে পরিণত করতে একটি mounted volume হিসেবে।'),
          l('When the pod starts, the kubelet reads the ConfigMap and injects the values, so the container sees them as environment variables or files.', 'পড শুরু হলে kubelet ConfigMap পড়ে ও মান inject করে, তাই কন্টেইনার এদের env ভ্যারিয়েবল বা ফাইল হিসেবে দেখে।'),
          l('To change configuration you edit the ConfigMap and re-apply it. Env vars are read once at container start, so pods must be restarted to pick up the new values; mounted files update automatically after a short delay.', 'কনফিগ বদলাতে আপনি ConfigMap এডিট করে পুনরায় apply করেন। Env ভ্যার কন্টেইনার শুরুতে একবার পড়া হয়, তাই নতুন মান নিতে পড রিস্টার্ট করতে হয়; mounted ফাইল অল্প বিলম্বের পর স্বয়ংক্রিয়ভাবে আপডেট হয়।'),
        ] },
        { code: `apiVersion: v1
kind: ConfigMap
metadata:
  name: app-config
data:
  LOG_LEVEL: info
  FEATURE_X: "true"
---
# in the pod spec:
envFrom:
  - configMapRef:
      name: app-config`, caption: l('A ConfigMap injected as env vars. envFrom turns every key in the ConfigMap into an environment variable in the container — here the container gets LOG_LEVEL and FEATURE_X.', 'env ভ্যার হিসেবে দেওয়া একটি ConfigMap। envFrom ConfigMap-এর প্রতিটি কী-কে কন্টেইনারে একটি এনভায়রনমেন্ট ভ্যারিয়েবল করে — এখানে কন্টেইনার LOG_LEVEL ও FEATURE_X পায়।') },
      ],
    },
    {
      h: l('Three ways to consume a ConfigMap', 'একটি ConfigMap ব্যবহারের তিন উপায়'),
      blocks: [
        { p: l('There is more than one way to get a ConfigMap’s data into a container, and the right choice depends on the shape of the config. Use envFrom to pull every key in as an environment variable at once; use a single valueFrom: configMapKeyRef when you want just one specific key under a name you choose; and mount the ConfigMap as a volume when your app expects a real configuration file on disk (an nginx.conf, an application.yaml). Mounting is also the one option whose values update in a running pod without a restart.', 'একটি ConfigMap-এর ডেটা কন্টেইনারে নেওয়ার একাধিক উপায় আছে, ও সঠিক পছন্দ কনফিগের আকারের ওপর নির্ভর করে। প্রতিটি কী একসঙ্গে env ভ্যারিয়েবল হিসেবে টানতে envFrom নিন; নিজের বাছা একটি নামের নিচে শুধু একটি নির্দিষ্ট কী চাইলে একটি valueFrom: configMapKeyRef নিন; আর আপনার অ্যাপ ডিস্কে একটি আসল কনফিগ ফাইল আশা করলে (একটি nginx.conf, একটি application.yaml) ConfigMap-কে একটি volume হিসেবে mount করুন। Mount করাই একমাত্র উপায় যার মান রিস্টার্ট ছাড়া একটি চলমান পডে আপডেট হয়।') },
        { code: `# 1. every key as an environment variable
envFrom:
  - configMapRef:
      name: app-config

# 2. one specific key as a named environment variable
env:
  - name: LOG_LEVEL
    valueFrom:
      configMapKeyRef:
        name: app-config
        key: LOG_LEVEL

# 3. mount the whole ConfigMap as files (one file per key)
volumes:
  - name: config
    configMap:
      name: app-config`, caption: l('envFrom loads all keys, configMapKeyRef picks one, and the volume form writes each key as a file — pick the shape your app expects.', 'envFrom সব কী লোড করে, configMapKeyRef একটি বাছে, ও volume রূপ প্রতিটি কী একটি ফাইল হিসেবে লেখে — আপনার অ্যাপ যা আশা করে সেই আকার নিন।') },
      ],
    },
    {
      h: l('Key commands', 'মূল কমান্ড'),
      blocks: [
        { table: {
          head: [l('Goal', 'লক্ষ্য'), l('Command', 'কমান্ড')],
          rows: [
            [l('Create from literals', 'লিটারাল থেকে তৈরি'), l('kubectl create cm app --from-literal=KEY=val', 'kubectl create cm app --from-literal=KEY=val')],
            [l('List config maps', 'কনফিগম্যাপ তালিকা'), l('kubectl get cm', 'kubectl get cm')],
            [l('View a config map', 'কনফিগম্যাপ দেখুন'), l('kubectl describe cm app', 'kubectl describe cm app')],
            [l('Apply a manifest', 'ম্যানিফেস্ট অ্যাপ্লাই'), l('kubectl apply -f cm.yaml', 'kubectl apply -f cm.yaml')],
          ],
        } },
        { note: l('cm is just the short alias for configmap, so kubectl get cm and kubectl get configmaps are the same. You can also build a ConfigMap from a whole file with --from-file=app.conf.', 'cm হলো configmap-এর সংক্ষিপ্ত alias, তাই kubectl get cm ও kubectl get configmaps একই। আপনি --from-file=app.conf দিয়ে একটি পুরো ফাইল থেকেও একটি ConfigMap বানাতে পারেন।'), kind: 'tip' },
      ],
    },
    {
      h: l('When and where to use a ConfigMap', 'কখন ও কোথায় ConfigMap ব্যবহার করবেন'),
      blocks: [
        { p: l('Put environment-specific, non-sensitive configuration in a ConfigMap and reference it from the pod spec. Good candidates are log levels, feature flags, timeouts, the URL of a downstream service, or a whole configuration file that differs between environments. The test is simple: if the value is something you would be comfortable printing in a log or committing to a repo, and it changes between dev and prod, it belongs in a ConfigMap.', 'এনভায়রনমেন্ট-নির্দিষ্ট, স্পর্শকাতর-নয় কনফিগারেশন একটি ConfigMap-এ রাখুন ও পড স্পেক থেকে রেফার করুন। ভালো প্রার্থী হলো log level, feature flag, timeout, একটি downstream সার্ভিসের URL, বা এনভায়রনমেন্টের মধ্যে ভিন্ন একটি পুরো কনফিগ ফাইল। পরীক্ষা সহজ: মানটি যদি এমন কিছু হয় যা আপনি একটি লগে ছাপতে বা একটি রিপোতে কমিট করতে স্বচ্ছন্দ, ও তা dev ও prod-এর মধ্যে বদলায়, তবে তা একটি ConfigMap-এ থাকে।') },
        { p: l('The critical trade-off: ConfigMaps decouple config from images, but they are plain text — never put passwords, tokens, or keys in them. A ConfigMap’s data is readable by anyone with access to the object, in plain sight, with no encoding or protection. Sensitive values belong in a Secret instead, which is kept separate for exactly this reason. Treat "is this sensitive?" as the single question that decides ConfigMap versus Secret.', 'সংকটপূর্ণ ট্রেড-অফ: ConfigMap কনফিগকে ইমেজ থেকে ডিকাপল করে, তবে এগুলো সাধারণ টেক্সট — কখনো পাসওয়ার্ড, টোকেন বা কী রাখবেন না। একটি ConfigMap-এর ডেটা অবজেক্টে অ্যাক্সেস থাকা যে কারো কাছে সাধারণ দৃষ্টিতে পাঠযোগ্য, কোনো encoding বা সুরক্ষা ছাড়া। স্পর্শকাতর মান বরং একটি Secret-এ থাকে, যা ঠিক এই কারণেই আলাদা রাখা হয়। "এটি কি স্পর্শকাতর?" — এই একটি প্রশ্নকেই ConfigMap বনাম Secret ঠিক করার নির্ণায়ক ধরুন।') },
      ],
    },
    {
      h: l('Common mistakes', 'সাধারণ ভুল'),
      blocks: [
        { list: [
          l('Storing secrets in a ConfigMap, exposing them in plain text to anyone who can read the object — use a Secret for passwords, tokens, and keys instead.', 'একটি ConfigMap-এ সিক্রেট রাখা, অবজেক্ট পড়তে পারা যে কারো কাছে সাধারণ টেক্সটে ফাঁস — পাসওয়ার্ড, টোকেন ও কী-এর জন্য বরং একটি Secret নিন।'),
          l('Editing a ConfigMap and expecting running pods to see the change — env vars are read once at start, so pods consuming config as env vars must be restarted.', 'একটি ConfigMap এডিট করে চলমান পড পরিবর্তন দেখবে আশা করা — env ভ্যার শুরুতে একবার পড়া হয়, তাই env ভ্যার হিসেবে কনফিগ ব্যবহার করা পড রিস্টার্ট করতে হয়।'),
          l('Quoting mistakes in values — a bare true or 123 may be read as a boolean or number; wrap them in quotes ("true") when the app expects a string.', 'মানে quote-এর ভুল — একটি খালি true বা 123 একটি boolean বা number হিসেবে পড়া হতে পারে; অ্যাপ একটি string আশা করলে এদের quote-এ মোড়ান ("true")।'),
          l('Referencing a ConfigMap or key that does not exist, or one in a different namespace — a ConfigMap is namespaced and must live in the same namespace as the pod.', 'এমন একটি ConfigMap বা কী রেফার করা যা নেই, বা একটি ভিন্ন নেমস্পেসে আছে — একটি ConfigMap namespaced ও পডের একই নেমস্পেসে থাকতে হবে।'),
        ] },
      ],
    },
    {
      h: l('Remember in one line', 'এক লাইনে মনে রাখুন'),
      blocks: [
        { list: [
          l('A ConfigMap holds non-secret key-value config and injects it into pods as env vars or files, keeping settings out of the image.', 'একটি ConfigMap নন-সিক্রেট কী-ভ্যালু কনফিগ রাখে ও env ভ্যার বা ফাইল হিসেবে পডে দেয়, সেটিং ইমেজের বাইরে রেখে।'),
          l('envFrom loads every key as an env var; configMapKeyRef picks one; a volume mount writes each key as a file.', 'envFrom প্রতিটি কী env ভ্যার হিসেবে লোড করে; configMapKeyRef একটি বাছে; একটি volume mount প্রতিটি কী একটি ফাইল হিসেবে লেখে।'),
          l('ConfigMaps are plain text — never store passwords or keys in them; use a Secret for anything sensitive.', 'ConfigMap সাধারণ টেক্সট — কখনো পাসওয়ার্ড বা কী রাখবেন না; স্পর্শকাতর কিছুর জন্য একটি Secret নিন।'),
        ] },
      ],
    },
  ],
}
