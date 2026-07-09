// Deep, bilingual (English / Bangla) teaching guides for a set of Kubernetes
// controller and networking topics. Shape mirrors app/course-guides.js and
// app/guides/git/f.js: each guide is an array of sections { h, blocks }, rendered
// by GuideBlock in app/LearningApp.js. Facts, commands, and YAML are drawn from
// the rawTopics + commands + examples in app/courses/kubernetes.js and kept exact.
// In { code } blocks the YAML/kubectl is written literally; there are no shell or
// Actions expansions here, so no dollar-sign-then-brace sequences appear.

const l = (en, bn) => ({ en, bn })

export default {
  // ── k8s-rollout · Rolling updates & rollbacks ─────────────────────────────
  'k8s-rollout': [
    {
      h: l('What is a rolling update?', 'রোলিং আপডেট কী?'),
      blocks: [
        { p: l('A rolling update is the way a Deployment ships a new version of your app without ever taking it offline. Instead of stopping every old pod and starting new ones all at once — which would cause downtime — Kubernetes replaces the old pods with new ones gradually, a few at a time, keeping the app available and allowing an instant rollback if the new version misbehaves.', 'একটি রোলিং আপডেট হলো সেই উপায় যেভাবে একটি Deployment আপনার অ্যাপের নতুন ভার্সন কখনো অফলাইনে না নিয়ে ছাড়ে। সব পুরনো পড একসঙ্গে থামিয়ে নতুন চালু করার বদলে—যা ডাউনটাইম ঘটাত—কুবারনেটিস পুরনো পডকে ধীরে ধীরে, কয়েকটি করে, নতুন দিয়ে প্রতিস্থাপন করে, অ্যাপ সচল রাখে ও নতুন ভার্সন গোলমাল করলে তাৎক্ষণিক রোলব্যাক দেয়।') },
        { p: l('The problem it solves is deployment risk. Every release is a chance to break production, and users do not forgive a site that goes dark during an upgrade. A rolling update turns a scary all-or-nothing switch into a controlled, reversible process: new pods must come up healthy before old ones are removed, and Kubernetes keeps the previous version on standby so undoing a bad release takes one command, not a frantic redeploy.', 'এটি যে সমস্যা সমাধান করে তা হলো ডিপ্লয়মেন্ট ঝুঁকি। প্রতিটি রিলিজ প্রোডাকশন ভাঙার একটি সুযোগ, আর আপগ্রেডের সময় অন্ধকার হয়ে যাওয়া সাইটকে ব্যবহারকারীরা ক্ষমা করে না। একটি রোলিং আপডেট একটি ভীতিকর সব-বা-কিছুই-নয় সুইচকে একটি নিয়ন্ত্রিত, রিভার্সযোগ্য প্রক্রিয়ায় পরিণত করে: পুরনো পড সরানোর আগে নতুন পড সুস্থভাবে উঠতে হবে, আর কুবারনেটিস আগের ভার্সন স্ট্যান্ডবাইতে রাখে যাতে একটি খারাপ রিলিজ ফেরানো একটি কমান্ডে হয়, একটি ব্যতিব্যস্ত রিডিপ্লয় নয়।') },
        { note: l('Think of replacing a delivery fleet’s tires one vehicle at a time so deliveries never stop. You never park the whole fleet at once; each truck is swapped, checked, and put back on the road before the next one is touched — so the service keeps running throughout.', 'একটি ডেলিভারি বহরের টায়ার একবারে একটি গাড়ি করে বদলানোর কথা ভাবুন যাতে ডেলিভারি কখনো না থামে। আপনি কখনো পুরো বহর একসঙ্গে পার্ক করেন না; পরেরটিতে হাত দেওয়ার আগে প্রতিটি ট্রাক বদলানো, যাচাই করা ও আবার রাস্তায় ফেরত দেওয়া হয়—তাই সেবা পুরো সময় চলতে থাকে।'), kind: 'tip' },
      ],
    },
    {
      h: l('How a rolling update works, step by step', 'একটি রোলিং আপডেট কীভাবে কাজ করে, ধাপে ধাপে'),
      blocks: [
        { steps: [
          l('You change the Deployment’s image — with kubectl set image, or by editing the manifest and re-applying it.', 'আপনি Deployment-এর ইমেজ বদলান—kubectl set image দিয়ে, অথবা ম্যানিফেস্ট এডিট করে পুনরায় apply করে।'),
          l('Kubernetes creates a new ReplicaSet for the new version and starts scaling it up while scaling the old one down, a few pods at a time.', 'কুবারনেটিস নতুন ভার্সনের জন্য একটি নতুন ReplicaSet তৈরি করে ও কয়েকটি পড করে সেটিকে বাড়াতে ও পুরনোটিকে কমাতে শুরু করে।'),
          l('Each new pod must pass its readiness probe before it receives traffic; only then does Kubernetes remove an old pod. This keeps capacity roughly constant.', 'প্রতিটি নতুন পডকে ট্রাফিক পাওয়ার আগে তার readiness প্রোব পাস করতে হয়; তবেই কুবারনেটিস একটি পুরনো পড সরায়। এটি ক্ষমতা প্রায় স্থির রাখে।'),
          l('You watch progress with kubectl rollout status, which blocks until the new pods are all healthy or reports that the roll is stuck.', 'আপনি kubectl rollout status দিয়ে অগ্রগতি দেখেন, যা নতুন পড সব সুস্থ না হওয়া পর্যন্ত অপেক্ষা করে বা জানায় রোল আটকে গেছে।'),
          l('If the new version is broken, kubectl rollout undo switches traffic back to the previous ReplicaSet, which Kubernetes kept on standby — so recovery is instant.', 'নতুন ভার্সন ভাঙা হলে kubectl rollout undo ট্রাফিক আগের ReplicaSet-এ ফিরিয়ে দেয়, যা কুবারনেটিস স্ট্যান্ডবাইতে রেখেছিল—তাই পুনরুদ্ধার তাৎক্ষণিক।'),
        ] },
        { code: `kubectl set image deploy/web web=nginx:1.26
kubectl rollout status deploy/web    # watch the rollout

# something broke? revert instantly
kubectl rollout undo deploy/web`, caption: l('Update the image, watch the roll to completion, and undo in one command if it goes wrong. Kubernetes replaces pods gradually and keeps the previous ReplicaSet, so undo is instant.', 'ইমেজ আপডেট করুন, রোল সম্পূর্ণ হওয়া পর্যন্ত দেখুন, ও ভুল হলে এক কমান্ডে undo করুন। কুবারনেটিস ধীরে পড বদলায় ও আগের ReplicaSet রাখে, তাই undo তাৎক্ষণিক।') },
      ],
    },
    {
      h: l('Key commands', 'মূল কমান্ড'),
      blocks: [
        { table: {
          head: [l('Goal', 'লক্ষ্য'), l('Command', 'কমান্ড')],
          rows: [
            [l('Update the image', 'ইমেজ আপডেট'), l('kubectl set image deploy/web nginx=nginx:1.25', 'kubectl set image deploy/web nginx=nginx:1.25')],
            [l('Check rollout status', 'রোলআউট স্ট্যাটাস'), l('kubectl rollout status deploy/web', 'kubectl rollout status deploy/web')],
            [l('Roll back to the previous version', 'আগের ভার্সনে রোলব্যাক'), l('kubectl rollout undo deploy/web', 'kubectl rollout undo deploy/web')],
            [l('Restart pods (re-pull, re-read config)', 'পড রিস্টার্ট (পুনঃপুল, কনফিগ পুনঃপাঠ)'), l('kubectl rollout restart deploy/web', 'kubectl rollout restart deploy/web')],
          ],
        } },
      ],
    },
    {
      h: l('The knobs: maxSurge and maxUnavailable', 'নব: maxSurge ও maxUnavailable'),
      blocks: [
        { p: l('You control how aggressive the roll is with two settings under the Deployment’s rolling-update strategy. maxSurge is how many extra pods above the desired count Kubernetes may create at once (faster roll, more temporary resource use). maxUnavailable is how many pods may be missing from the desired count during the roll (how much capacity you are willing to lose). The defaults, 25% each, are a sensible balance for most apps.', 'রোল কতটা আক্রমণাত্মক হবে তা আপনি Deployment-এর রোলিং-আপডেট কৌশলের দুটি সেটিং দিয়ে নিয়ন্ত্রণ করেন। maxSurge হলো কাঙ্ক্ষিত সংখ্যার ওপরে কুবারনেটিস একসঙ্গে কতটি অতিরিক্ত পড তৈরি করতে পারে (দ্রুত রোল, বেশি অস্থায়ী রিসোর্স ব্যবহার)। maxUnavailable হলো রোলের সময় কাঙ্ক্ষিত সংখ্যা থেকে কতটি পড অনুপস্থিত থাকতে পারে (আপনি কতটা ক্ষমতা হারাতে রাজি)। ডিফল্ট, প্রতিটি ২৫%, বেশিরভাগ অ্যাপের জন্য একটি যুক্তিসঙ্গত ভারসাম্য।') },
        { code: `spec:
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxSurge: 1
      maxUnavailable: 0
  minReadySeconds: 10`, caption: l('maxUnavailable: 0 with maxSurge: 1 means a new pod must come up healthy before any old pod leaves — the safest, slightly slower roll. minReadySeconds makes a pod wait before it counts as available.', 'maxSurge: 1 সহ maxUnavailable: 0 মানে কোনো পুরনো পড যাওয়ার আগে একটি নতুন পডকে সুস্থভাবে উঠতে হবে—সবচেয়ে নিরাপদ, একটু ধীর রোল। minReadySeconds একটি পডকে available গণ্য হওয়ার আগে অপেক্ষা করায়।') },
      ],
    },
    {
      h: l('When and where to use it', 'কখন ও কোথায় ব্যবহার করবেন'),
      blocks: [
        { p: l('Rolling updates are the default and right choice for almost every stateless web service, API, or worker managed by a Deployment. Any time you ship a new image and want zero downtime, this is the mechanism — you rarely have to enable it, you just re-apply the manifest and it happens. Update the Deployment’s image and watch kubectl rollout status; if it goes wrong, use rollout undo to revert instantly.', 'রোলিং আপডেট প্রায় প্রতিটি স্টেটলেস ওয়েব সার্ভিস, API বা Deployment-চালিত ওয়ার্কারের জন্য ডিফল্ট ও সঠিক পছন্দ। যখনই আপনি একটি নতুন ইমেজ ছাড়েন ও জিরো-ডাউনটাইম চান, এটিই সেই ব্যবস্থা—আপনাকে কমই এটি চালু করতে হয়, শুধু ম্যানিফেস্ট পুনরায় apply করেন আর এটি ঘটে। Deployment-এর ইমেজ আপডেট করে kubectl rollout status দেখুন; ভুল হলে তাৎক্ষণিক ফিরতে rollout undo ব্যবহার করুন।') },
        { p: l('The one thing to keep in mind is the trade-off: rolling updates give zero-downtime deploys, but during the roll two versions run at once, which your app must tolerate. If a new database schema or an incompatible API contract is part of the release, the old and new pods serving traffic side by side can break each other. For those cases you split the change into backward-compatible steps, or reach for a blue-green or canary strategy where the two versions are more strictly separated.', 'যা মনে রাখতে হবে তা হলো ট্রেড-অফ: রোলিং আপডেট জিরো-ডাউনটাইম ডিপ্লয় দেয়, তবে রোলের সময় দুই ভার্সন একসঙ্গে চলে, যা আপনার অ্যাপকে সহ্য করতে হয়। রিলিজে যদি একটি নতুন ডেটাবেস স্কিমা বা একটি অসামঞ্জস্যপূর্ণ API চুক্তি থাকে, তবে পাশাপাশি ট্রাফিক পরিবেশন করা পুরনো ও নতুন পড একে অপরকে ভাঙতে পারে। সেসব ক্ষেত্রে আপনি পরিবর্তনকে ব্যাকওয়ার্ড-সামঞ্জস্যপূর্ণ ধাপে ভাগ করেন, বা একটি blue-green বা canary কৌশল নেন যেখানে দুই ভার্সন আরও কঠোরভাবে আলাদা।') },
      ],
    },
    {
      h: l('Common mistakes', 'সাধারণ ভুল'),
      blocks: [
        { list: [
          l('Rolling out a change that is not backward compatible, breaking clients while both versions run together during the roll.', 'ব্যাকওয়ার্ড-সামঞ্জস্যহীন একটি পরিবর্তন রোল করা, রোলের সময় দুই ভার্সন একসঙ্গে চলাকালে ক্লায়েন্ট ভাঙা।'),
          l('Having no readiness probe, so Kubernetes sends traffic to new pods that are not actually ready, causing errors mid-roll.', 'কোনো readiness প্রোব না থাকা, ফলে কুবারনেটিস আসলে প্রস্তুত নয় এমন নতুন পডে ট্রাফিক পাঠায়, রোলের মাঝে ত্রুটি ঘটায়।'),
          l('Not watching kubectl rollout status, so a stuck roll (bad image, crash loop) goes unnoticed until users complain.', 'kubectl rollout status না দেখা, ফলে একটি আটকে যাওয়া রোল (খারাপ ইমেজ, ক্র্যাশ লুপ) ব্যবহারকারীরা অভিযোগ না করা পর্যন্ত অলক্ষিত থাকে।'),
          l('Forgetting that rollout undo exists and panicking with a manual redeploy when a release goes bad.', 'rollout undo আছে ভুলে যাওয়া ও একটি রিলিজ খারাপ হলে একটি ম্যানুয়াল রিডিপ্লয় দিয়ে আতঙ্কিত হওয়া।'),
          l('Setting maxUnavailable too high, so too much capacity disappears at once and the remaining pods get overloaded mid-roll.', 'maxUnavailable খুব বেশি সেট করা, ফলে একসঙ্গে অনেক ক্ষমতা হারিয়ে যায় ও বাকি পড রোলের মাঝে ওভারলোড হয়।'),
        ] },
      ],
    },
    {
      h: l('Remember in one line', 'এক লাইনে মনে রাখুন'),
      blocks: [
        { list: [
          l('A rolling update swaps old pods for new ones gradually, so the app stays up and rollback is instant.', 'একটি রোলিং আপডেট পুরনো পডকে ধীরে নতুন দিয়ে বদলায়, তাই অ্যাপ চালু থাকে ও রোলব্যাক তাৎক্ষণিক।'),
          l('set image to update, rollout status to watch, rollout undo to revert — that is the whole loop.', 'আপডেটে set image, দেখতে rollout status, ফিরতে rollout undo—এটাই পুরো লুপ।'),
          l('During the roll two versions run at once, so keep every change backward compatible.', 'রোলের সময় দুই ভার্সন একসঙ্গে চলে, তাই প্রতিটি পরিবর্তন ব্যাকওয়ার্ড-সামঞ্জস্যপূর্ণ রাখুন।'),
        ] },
      ],
    },
  ],

  // ── k8s-daemonset · DaemonSets ────────────────────────────────────────────
  'k8s-daemonset': [
    {
      h: l('What is a DaemonSet?', 'DaemonSet কী?'),
      blocks: [
        { p: l('A DaemonSet is a controller that runs exactly one copy of a pod on every node in your cluster. It is built for cluster-wide agents — log collectors, metrics collectors, and networking or storage daemons — the kind of tool that has to be present on each machine to do its job. As nodes are added, the DaemonSet automatically places a pod on them; as nodes are removed, their pods go away with them. You never manage a replica count; you declare "one per node" and Kubernetes keeps that true.', 'একটি DaemonSet হলো একটি কন্ট্রোলার যা আপনার ক্লাস্টারের প্রতিটি নোডে ঠিক একটি পড কপি চালায়। এটি ক্লাস্টার-ব্যাপী এজেন্টের জন্য তৈরি—লগ কালেক্টর, মেট্রিক্স কালেক্টর, ও নেটওয়ার্কিং বা স্টোরেজ ডিমন—এমন টুল যা তার কাজ করতে প্রতিটি মেশিনে উপস্থিত থাকতেই হবে। নোড যোগ হলে DaemonSet স্বয়ংক্রিয়ভাবে তাতে একটি পড বসায়; নোড সরানো হলে তাদের পড তাদের সঙ্গে চলে যায়। আপনি কখনো একটি রেপ্লিকা সংখ্যা সামলান না; আপনি "প্রতি নোডে একটি" ঘোষণা করেন আর কুবারনেটিস সেটি সত্য রাখে।') },
        { p: l('The problem it solves is per-node coverage that a Deployment cannot express. A Deployment runs N replicas placed wherever the scheduler likes; it has no concept of "one on each machine." But a log shipper that reads /var/log on the node it lives on, or a monitoring agent that measures that node’s CPU, is useless unless there is one on every node — no more, no less. That guarantee is exactly what a DaemonSet gives you.', 'এটি যে সমস্যা সমাধান করে তা হলো প্রতি-নোড কভারেজ যা একটি Deployment প্রকাশ করতে পারে না। একটি Deployment N রেপ্লিকা চালায় যা শিডিউলার যেখানে পছন্দ করে সেখানে বসে; এর "প্রতিটি মেশিনে একটি" এমন কোনো ধারণা নেই। কিন্তু একটি লগ শিপার যা তার বসবাসের নোডের /var/log পড়ে, বা একটি মনিটরিং এজেন্ট যা সেই নোডের CPU মাপে, তা অকেজো যদি না প্রতিটি নোডে একটি থাকে—বেশিও নয়, কমও নয়। সেই নিশ্চয়তাই একটি DaemonSet আপনাকে দেয়।') },
        { note: l('Think of a security guard posted at every entrance — one per door, automatically, no matter how many doors there are. Build a new entrance (add a node) and a guard shows up there without anyone assigning one; brick up a door (remove a node) and that guard is gone.', 'প্রতিটি প্রবেশপথে একজন নিরাপত্তা রক্ষী ভাবুন—প্রতি দরজায় একটি, স্বয়ংক্রিয়ভাবে, যত দরজাই থাকুক। একটি নতুন প্রবেশপথ বানান (একটি নোড যোগ করুন) আর কেউ বরাদ্দ না করেই সেখানে একজন রক্ষী হাজির হয়; একটি দরজা বন্ধ করে দিন (একটি নোড সরান) আর সেই রক্ষী চলে যায়।'), kind: 'tip' },
      ],
    },
    {
      h: l('How a DaemonSet works, step by step', 'একটি DaemonSet কীভাবে কাজ করে, ধাপে ধাপে'),
      blocks: [
        { steps: [
          l('You apply a DaemonSet manifest. It has a pod template and a label selector, but no replicas field — the node count is the replica count.', 'আপনি একটি DaemonSet ম্যানিফেস্ট apply করেন। এতে একটি পড টেমপ্লেট ও একটি লেবেল সিলেক্টর আছে, কিন্তু কোনো replicas ফিল্ড নেই—নোড সংখ্যাই রেপ্লিকা সংখ্যা।'),
          l('The DaemonSet controller looks at every eligible node and schedules one pod onto each, bypassing the usual replica-spreading logic.', 'DaemonSet কন্ট্রোলার প্রতিটি যোগ্য নোড দেখে ও প্রতিটিতে একটি করে পড শিডিউল করে, স্বাভাবিক রেপ্লিকা-ছড়ানো যুক্তি এড়িয়ে।'),
          l('When a new node joins the cluster, the controller immediately adds a matching pod to it — no manual step and no scaling command.', 'একটি নতুন নোড ক্লাস্টারে যুক্ত হলে কন্ট্রোলার সঙ্গে সঙ্গে তাতে একটি মেলা পড যোগ করে—কোনো ম্যানুয়াল ধাপ বা স্কেলিং কমান্ড নেই।'),
          l('When a node is drained or removed, its DaemonSet pod is removed with it, so coverage always matches the current node set.', 'একটি নোড drain বা সরানো হলে তার DaemonSet পড তার সঙ্গে সরে যায়, তাই কভারেজ সবসময় বর্তমান নোড সেটের সঙ্গে মেলে।'),
          l('Optional nodeSelector or tolerations let you target only some nodes — for example, an agent that should run only on GPU nodes, or that must run on control-plane nodes.', 'ঐচ্ছিক nodeSelector বা tolerations দিয়ে আপনি শুধু কিছু নোড লক্ষ্য করতে পারেন—যেমন একটি এজেন্ট যা শুধু GPU নোডে চলবে, বা যা control-plane নোডে চলতেই হবে।'),
        ] },
        { code: `apiVersion: apps/v1
kind: DaemonSet
metadata:
  name: fluent-bit
  namespace: logging
spec:
  selector:
    matchLabels:
      app: fluent-bit
  template:
    metadata:
      labels:
        app: fluent-bit
    spec:
      containers:
        - name: fluent-bit
          image: fluent/fluent-bit:2.2
          volumeMounts:
            - name: varlog
              mountPath: /var/log
      volumes:
        - name: varlog
          hostPath:
            path: /var/log`, caption: l('A log-shipping DaemonSet: one fluent-bit pod per node, each mounting that node’s /var/log via hostPath. Note there is no replicas field — the node count decides how many pods run.', 'একটি লগ-শিপিং DaemonSet: প্রতি নোডে একটি fluent-bit পড, প্রতিটি hostPath দিয়ে সেই নোডের /var/log মাউন্ট করে। খেয়াল করুন কোনো replicas ফিল্ড নেই—নোড সংখ্যাই কতটি পড চলবে ঠিক করে।') },
      ],
    },
    {
      h: l('Key commands', 'মূল কমান্ড'),
      blocks: [
        { table: {
          head: [l('Goal', 'লক্ষ্য'), l('Command', 'কমান্ড')],
          rows: [
            [l('List DaemonSets', 'DaemonSet তালিকা'), l('kubectl get ds', 'kubectl get ds')],
            [l('See per-node pods and status', 'প্রতি-নোড পড ও স্ট্যাটাস'), l('kubectl describe ds fluent-bit', 'kubectl describe ds fluent-bit')],
            [l('Watch a DaemonSet rollout', 'DaemonSet রোলআউট দেখুন'), l('kubectl rollout status ds/fluent-bit', 'kubectl rollout status ds/fluent-bit')],
            [l('See which node each pod runs on', 'প্রতিটি পড কোন নোডে দেখুন'), l('kubectl get pods -o wide', 'kubectl get pods -o wide')],
          ],
        } },
      ],
    },
    {
      h: l('When and where to use it', 'কখন ও কোথায় ব্যবহার করবেন'),
      blocks: [
        { p: l('Use a DaemonSet for node-level tools — logging, monitoring, networking — that must run on all nodes. The classic examples are a log collector like Fluent Bit that ships every node’s logs, a metrics agent like the Prometheus node-exporter that reports each node’s health, a CNI networking plugin that wires up pod networking on every machine, and a storage or security daemon that has to be present locally. The common thread is that the agent’s job is tied to the node it sits on.', 'নোড-স্তরের টুলে—লগিং, মনিটরিং, নেটওয়ার্কিং—DaemonSet ব্যবহার করুন যা সব নোডে চলতে হবে। ক্লাসিক উদাহরণ হলো Fluent Bit-এর মতো একটি লগ কালেক্টর যা প্রতিটি নোডের লগ পাঠায়, Prometheus node-exporter-এর মতো একটি মেট্রিক্স এজেন্ট যা প্রতিটি নোডের সুস্থতা জানায়, একটি CNI নেটওয়ার্কিং প্লাগইন যা প্রতিটি মেশিনে পড নেটওয়ার্কিং যুক্ত করে, ও একটি স্টোরেজ বা নিরাপত্তা ডিমন যা স্থানীয়ভাবে উপস্থিত থাকতে হবে। সাধারণ সুতোটি হলো এজেন্টের কাজ তার বসবাসের নোডের সঙ্গে বাঁধা।') },
        { p: l('The trade-off is cost: DaemonSets guarantee per-node coverage automatically, but they consume resources on every node, including new ones. Each pod takes CPU and memory on its host, so on a 500-node cluster a heavy DaemonSet is 500 running copies. Keep them lean, set modest resource requests and limits, and do not use a DaemonSet for anything that does not genuinely need to be on every machine — a fixed number of replicas is far cheaper for ordinary workloads.', 'ট্রেড-অফ হলো খরচ: DaemonSet স্বয়ংক্রিয়ভাবে প্রতি-নোড কভারেজ নিশ্চিত করে, তবে নতুনসহ প্রতিটি নোডে রিসোর্স খরচ করে। প্রতিটি পড তার হোস্টে CPU ও মেমরি নেয়, তাই একটি ৫০০-নোড ক্লাস্টারে একটি ভারী DaemonSet মানে ৫০০টি চলমান কপি। এগুলো হালকা রাখুন, মাঝারি রিসোর্স request ও limit সেট করুন, এবং এমন কিছুর জন্য DaemonSet ব্যবহার করবেন না যা সত্যিকারভাবে প্রতিটি মেশিনে থাকা লাগে না—সাধারণ ওয়ার্কলোডে একটি নির্দিষ্ট সংখ্যক রেপ্লিকা অনেক সস্তা।') },
        { p: l('Updating a DaemonSet works much like a Deployment rollout: change the pod template — a new image, say — and Kubernetes replaces the pod on each node one at a time under the default RollingUpdate strategy, so the agent stays present cluster-wide during the upgrade. You watch it with kubectl rollout status ds/name, and because every node hosts exactly one pod, the roll walks node by node rather than by a percentage of replicas. That makes DaemonSet upgrades predictable, but also means a bad agent image can degrade every node, so test the new version on a subset first with a nodeSelector when the agent is critical.', 'একটি DaemonSet আপডেট করা অনেকটা একটি Deployment রোলআউটের মতো: পড টেমপ্লেট বদলান—ধরুন একটি নতুন ইমেজ—আর কুবারনেটিস ডিফল্ট RollingUpdate কৌশলে প্রতিটি নোডের পড একবারে একটি করে প্রতিস্থাপন করে, তাই আপগ্রেডের সময় এজেন্ট ক্লাস্টার-ব্যাপী উপস্থিত থাকে। আপনি kubectl rollout status ds/name দিয়ে এটি দেখেন, ও যেহেতু প্রতিটি নোডে ঠিক একটি পড, রোল রেপ্লিকার শতাংশ নয়, নোড ধরে ধরে চলে। এটি DaemonSet আপগ্রেড পূর্বানুমেয় করে, তবে এর মানেও যে একটি খারাপ এজেন্ট ইমেজ প্রতিটি নোড দুর্বল করতে পারে, তাই এজেন্ট সংকটপূর্ণ হলে একটি nodeSelector দিয়ে আগে একটি উপসেটে নতুন ভার্সন পরীক্ষা করুন।') },
      ],
    },
    {
      h: l('Common mistakes', 'সাধারণ ভুল'),
      blocks: [
        { list: [
          l('Using a DaemonSet for a regular app, running needless copies on every node instead of setting a fixed replica count on a Deployment.', 'একটি সাধারণ অ্যাপে DaemonSet ব্যবহার, একটি Deployment-এ নির্দিষ্ট রেপ্লিকা সংখ্যা সেট করার বদলে প্রতি নোডে অপ্রয়োজনীয় কপি চালানো।'),
          l('Giving DaemonSet pods no resource limits, so a heavy agent quietly eats capacity on every node at once.', 'DaemonSet পডে কোনো রিসোর্স limit না দেওয়া, ফলে একটি ভারী এজেন্ট নীরবে একসঙ্গে প্রতিটি নোডে ক্ষমতা খায়।'),
          l('Forgetting tolerations, so the DaemonSet skips tainted nodes (like control-plane nodes) where the agent was actually needed.', 'tolerations ভুলে যাওয়া, ফলে DaemonSet tainted নোড (যেমন control-plane নোড) এড়ায় যেখানে এজেন্টটি আসলে দরকার ছিল।'),
          l('Expecting a replicas field to control the count — a DaemonSet has none; the node set is the count.', 'একটি replicas ফিল্ড সংখ্যা নিয়ন্ত্রণ করবে আশা করা—একটি DaemonSet-এ তা নেই; নোড সেটই সংখ্যা।'),
        ] },
      ],
    },
    {
      h: l('Remember in one line', 'এক লাইনে মনে রাখুন'),
      blocks: [
        { list: [
          l('A DaemonSet runs exactly one pod per node and adds or removes pods automatically as nodes come and go.', 'একটি DaemonSet প্রতি নোডে ঠিক একটি পড চালায় ও নোড আসা-যাওয়ার সঙ্গে স্বয়ংক্রিয়ভাবে পড যোগ বা সরায়।'),
          l('Use it for node-level agents (logging, metrics, networking), never for ordinary apps.', 'নোড-স্তরের এজেন্টে (লগিং, মেট্রিক্স, নেটওয়ার্কিং) ব্যবহার করুন, সাধারণ অ্যাপে কখনো নয়।'),
          l('There is no replicas field — the number of nodes decides how many pods run, so keep each pod lean.', 'কোনো replicas ফিল্ড নেই—নোডের সংখ্যাই কতটি পড চলবে ঠিক করে, তাই প্রতিটি পড হালকা রাখুন।'),
        ] },
      ],
    },
  ],

  // ── k8s-statefulset · StatefulSets ────────────────────────────────────────
  'k8s-statefulset': [
    {
      h: l('What is a StatefulSet?', 'StatefulSet কী?'),
      blocks: [
        { p: l('A StatefulSet is a controller that runs stateful pods with three guarantees a Deployment does not provide: stable, predictable names; ordered, one-at-a-time startup and shutdown; and each pod gets its own persistent storage that follows it across restarts. It is the tool for workloads that have identity — databases, message brokers, and clustered systems where "which member am I" actually matters.', 'একটি StatefulSet হলো একটি কন্ট্রোলার যা তিনটি নিশ্চয়তাসহ স্টেটফুল পড চালায় যা একটি Deployment দেয় না: স্থিতিশীল, পূর্বানুমেয় নাম; ক্রমিক, একবারে-একটি শুরু ও বন্ধ; এবং প্রতিটি পড তার নিজস্ব স্থায়ী স্টোরেজ পায় যা রিস্টার্টজুড়ে তাকে অনুসরণ করে। এটি সেসব ওয়ার্কলোডের টুল যাদের পরিচয় আছে—ডেটাবেস, মেসেজ ব্রোকার, ও ক্লাস্টার্ড সিস্টেম যেখানে "আমি কোন সদস্য" আসলেই গুরুত্বপূর্ণ।') },
        { p: l('The problem it solves is that a Deployment treats its pods as interchangeable and disposable, which is exactly wrong for stateful software. In a Deployment, pods get random names, start in any order, and share nothing personal — great for stateless web servers, disastrous for a database replica that must keep the same identity and the same disk every time it restarts. A StatefulSet gives each pod a stable name like postgres-0, postgres-1, postgres-2, and pins each to its own volume, so pod postgres-0 always comes back as postgres-0 with its own data.', 'এটি যে সমস্যা সমাধান করে তা হলো একটি Deployment তার পডকে বিনিময়যোগ্য ও নিষ্পত্তিযোগ্য হিসেবে দেখে, যা স্টেটফুল সফটওয়্যারের জন্য একদম ভুল। একটি Deployment-এ পড এলোমেলো নাম পায়, যেকোনো ক্রমে শুরু হয়, ও ব্যক্তিগত কিছু ভাগ করে না—স্টেটলেস ওয়েব সার্ভারে চমৎকার, একটি ডেটাবেস রেপ্লিকার জন্য বিপর্যয়কর যাকে প্রতিবার রিস্টার্টে একই পরিচয় ও একই ডিস্ক রাখতে হয়। একটি StatefulSet প্রতিটি পডকে postgres-0, postgres-1, postgres-2-এর মতো একটি স্থিতিশীল নাম দেয়, ও প্রতিটিকে তার নিজস্ব ভলিউমে পিন করে, তাই পড postgres-0 সবসময় নিজের ডেটাসহ postgres-0 হয়ে ফেরে।') },
        { note: l('Think of numbered lockers assigned to specific people — person 0 always gets locker 0 with their own belongings. Nobody is handed a random locker each day; your number, your locker, and your contents stay with you. A Deployment is more like a coat check that hands you whatever hook is free.', 'নির্দিষ্ট ব্যক্তিদের বরাদ্দ নম্বরযুক্ত লকার ভাবুন—ব্যক্তি ০ সবসময় নিজের জিনিসসহ লকার ০ পায়। কাউকে প্রতিদিন এলোমেলো লকার দেওয়া হয় না; আপনার নম্বর, আপনার লকার ও আপনার জিনিস আপনার সঙ্গে থাকে। একটি Deployment বরং একটি কোট-চেকের মতো যা আপনাকে যে হুক খালি তা-ই ধরিয়ে দেয়।'), kind: 'tip' },
      ],
    },
    {
      h: l('StatefulSet vs Deployment', 'StatefulSet বনাম Deployment'),
      blocks: [
        { p: l('The fastest way to understand a StatefulSet is to line it up against the Deployment you already know. They both manage a set of pods from a template, but almost every guarantee differs.', 'একটি StatefulSet বোঝার দ্রুততম উপায় হলো আপনার ইতিমধ্যে জানা Deployment-এর পাশে এটি সাজানো। দুটোই একটি টেমপ্লেট থেকে পডের একটি সেট সামলায়, কিন্তু প্রায় প্রতিটি নিশ্চয়তা আলাদা।') },
        { table: {
          head: [l('Aspect', 'দিক'), l('Deployment', 'Deployment'), l('StatefulSet', 'StatefulSet')],
          rows: [
            [l('Pod names', 'পড নাম'), l('Random suffix (web-a1b2c3)', 'এলোমেলো সাফিক্স (web-a1b2c3)'), l('Stable ordinal (db-0, db-1)', 'স্থিতিশীল ক্রমিক (db-0, db-1)')],
            [l('Startup / shutdown', 'শুরু / বন্ধ'), l('All at once, any order', 'একসঙ্গে, যেকোনো ক্রমে'), l('One at a time, in order', 'একবারে একটি, ক্রমে')],
            [l('Storage', 'স্টোরেজ'), l('Usually shared or none', 'সাধারণত শেয়ার্ড বা কিছুই নয়'), l('Own PVC per pod, sticks to it', 'প্রতি পডে নিজস্ব PVC, লেগে থাকে')],
            [l('Identity', 'পরিচয়'), l('Interchangeable, disposable', 'বিনিময়যোগ্য, নিষ্পত্তিযোগ্য'), l('Stable, personal', 'স্থিতিশীল, ব্যক্তিগত')],
            [l('Best for', 'কার জন্য'), l('Stateless apps, APIs', 'স্টেটলেস অ্যাপ, API'), l('Databases, clustered stores', 'ডেটাবেস, ক্লাস্টার্ড স্টোর')],
          ],
        } },
      ],
    },
    {
      h: l('How a StatefulSet works, step by step', 'একটি StatefulSet কীভাবে কাজ করে, ধাপে ধাপে'),
      blocks: [
        { steps: [
          l('You define a StatefulSet with a serviceName pointing at a headless Service, plus a volumeClaimTemplates block that describes the storage each pod should own.', 'আপনি একটি StatefulSet সংজ্ঞায়িত করেন একটি serviceName সহ যা একটি headless Service-এর দিকে নির্দেশ করে, প্লাস একটি volumeClaimTemplates ব্লক যা প্রতিটি পডের নিজস্ব স্টোরেজ বর্ণনা করে।'),
          l('Kubernetes creates pods in order — db-0 first, and only once it is Running and Ready does it create db-1, then db-2. Scaling down reverses this, removing the highest ordinal first.', 'কুবারনেটিস পড ক্রমে তৈরি করে—আগে db-0, ও এটি Running ও Ready হলেই db-1 তৈরি করে, তারপর db-2। স্কেল-ডাউন এটি উল্টায়, সবচেয়ে উঁচু ক্রমিক আগে সরায়।'),
          l('For each pod, Kubernetes creates a dedicated PersistentVolumeClaim from the template — data-db-0, data-db-1 — so every pod has its own disk.', 'প্রতিটি পডের জন্য কুবারনেটিস টেমপ্লেট থেকে একটি নিবেদিত PersistentVolumeClaim তৈরি করে—data-db-0, data-db-1—তাই প্রতিটি পডের নিজস্ব ডিস্ক থাকে।'),
          l('If db-1 dies, it is recreated with the same name and re-bound to the same PVC, so it comes back with exactly its old data.', 'db-1 মারা গেলে এটি একই নামে পুনঃতৈরি হয় ও একই PVC-তে পুনঃবাঁধা হয়, তাই এটি ঠিক তার পুরনো ডেটাসহ ফেরে।'),
          l('The headless Service gives each pod its own stable DNS name (db-0.db.default.svc), so peers can address one specific member — essential for leader election and replication.', 'headless Service প্রতিটি পডকে তার নিজস্ব স্থিতিশীল DNS নাম দেয় (db-0.db.default.svc), তাই peer একটি নির্দিষ্ট সদস্যকে ঠিকানা দিতে পারে—leader election ও রেপ্লিকেশনে অপরিহার্য।'),
        ] },
        { code: `apiVersion: apps/v1
kind: StatefulSet
metadata:
  name: postgres
spec:
  serviceName: postgres
  replicas: 3
  selector:
    matchLabels:
      app: postgres
  template:
    metadata:
      labels:
        app: postgres
    spec:
      containers:
        - name: postgres
          image: postgres:16
          ports:
            - containerPort: 5432
          volumeMounts:
            - name: data
              mountPath: /var/lib/postgresql/data
  volumeClaimTemplates:
    - metadata:
        name: data
      spec:
        accessModes: ["ReadWriteOnce"]
        resources:
          requests:
            storage: 10Gi`, caption: l('Three postgres pods named postgres-0, -1, -2. The volumeClaimTemplates block gives each its own 10Gi PVC (data-postgres-0, and so on) that follows it across restarts. serviceName wires each pod to a stable DNS name.', 'তিনটি postgres পড postgres-0, -1, -2 নামে। volumeClaimTemplates ব্লক প্রতিটিকে নিজস্ব 10Gi PVC (data-postgres-0, ইত্যাদি) দেয় যা রিস্টার্টজুড়ে তাকে অনুসরণ করে। serviceName প্রতিটি পডকে একটি স্থিতিশীল DNS নামে যুক্ত করে।') },
      ],
    },
    {
      h: l('When and where to use it', 'কখন ও কোথায় ব্যবহার করবেন'),
      blocks: [
        { p: l('Use a StatefulSet for databases and clustered systems that need stable identities and per-pod volumes. The clearest cases are databases (PostgreSQL, MySQL, MongoDB), distributed data stores and message systems (Cassandra, Elasticsearch, Kafka, ZooKeeper), and anything doing leader election or sharding where each member owns a slice of the data and must be reachable by a fixed name. If losing a pod means losing its data, or if the members are not interchangeable, that is a StatefulSet.', 'ডেটাবেস ও ক্লাস্টার্ড সিস্টেমে StatefulSet ব্যবহার করুন যাদের স্থিতিশীল পরিচয় ও প্রতি-পড ভলিউম দরকার। সবচেয়ে স্পষ্ট ক্ষেত্র হলো ডেটাবেস (PostgreSQL, MySQL, MongoDB), ডিস্ট্রিবিউটেড ডেটা স্টোর ও মেসেজ সিস্টেম (Cassandra, Elasticsearch, Kafka, ZooKeeper), ও leader election বা sharding করা যেকোনো কিছু যেখানে প্রতিটি সদস্য ডেটার একটি অংশের মালিক ও একটি নির্দিষ্ট নামে পৌঁছানো যেতে হবে। একটি পড হারানো মানে যদি তার ডেটা হারানো হয়, বা সদস্যরা বিনিময়যোগ্য না হয়, তবে সেটি একটি StatefulSet।') },
        { p: l('But use it only when you truly need those guarantees, because the trade-off is real: StatefulSets provide stable identity and storage, but they are more complex to scale and update than Deployments. Ordered rollouts are slower, storage adds operational weight, and scaling down leaves the PVCs behind on purpose so you do not lose data by accident. Reaching for a StatefulSet when your app is actually stateless just buys you complexity you will not use — a Deployment would be simpler. Many teams also run production databases as managed services and keep the cluster for stateless workloads entirely.', 'কিন্তু শুধু তখনই ব্যবহার করুন যখন আপনার সত্যিই সেই নিশ্চয়তাগুলো দরকার, কারণ ট্রেড-অফ বাস্তব: StatefulSet স্থিতিশীল পরিচয় ও স্টোরেজ দেয়, তবে Deployment-এর চেয়ে স্কেল ও আপডেট করা বেশি জটিল। ক্রমিক রোলআউট ধীর, স্টোরেজ অপারেশনাল ওজন যোগ করে, ও স্কেল-ডাউন ইচ্ছাকৃতভাবে PVC পেছনে রেখে দেয় যাতে আপনি দুর্ঘটনাক্রমে ডেটা না হারান। অ্যাপ আসলে স্টেটলেস হলে StatefulSet নেওয়া শুধু আপনাকে এমন জটিলতা কিনে দেয় যা আপনি ব্যবহার করবেন না—একটি Deployment সহজ হতো। অনেক টিম প্রোডাকশন ডেটাবেস ম্যানেজড সার্ভিস হিসেবেও চালায় ও ক্লাস্টারটি সম্পূর্ণ স্টেটলেস ওয়ার্কলোডের জন্য রাখে।') },
      ],
    },
    {
      h: l('Common mistakes', 'সাধারণ ভুল'),
      blocks: [
        { list: [
          l('Reaching for a StatefulSet when your app is actually stateless and a Deployment would be simpler and faster to operate.', 'অ্যাপ আসলে স্টেটলেস ও Deployment সহজ ও চালাতে দ্রুত হতো যেখানে StatefulSet ব্যবহার করা।'),
          l('Forgetting the headless Service (serviceName), so pods get no stable per-pod DNS names and clustering fails.', 'headless Service (serviceName) ভুলে যাওয়া, ফলে পড কোনো স্থিতিশীল প্রতি-পড DNS নাম পায় না ও ক্লাস্টারিং ব্যর্থ হয়।'),
          l('Assuming scaling down deletes the storage — the PVCs are kept on purpose, and you must remove them by hand if you really want the data gone.', 'ধরে নেওয়া স্কেল-ডাউন স্টোরেজ মোছে—PVC ইচ্ছাকৃতভাবে রাখা হয়, ও ডেটা সত্যিই মুছতে চাইলে হাতে সরাতে হবে।'),
          l('Sharing one volume across all pods instead of giving each its own via volumeClaimTemplates, which corrupts data for most stateful software.', 'volumeClaimTemplates দিয়ে প্রত্যেককে নিজস্ব দেওয়ার বদলে সব পডজুড়ে একটি ভলিউম শেয়ার করা, যা বেশিরভাগ স্টেটফুল সফটওয়্যারের ডেটা নষ্ট করে।'),
        ] },
      ],
    },
    {
      h: l('Remember in one line', 'এক লাইনে মনে রাখুন'),
      blocks: [
        { list: [
          l('A StatefulSet gives pods stable names, ordered startup, and each its own persistent storage — a Deployment gives none of these.', 'একটি StatefulSet পডকে স্থিতিশীল নাম, ক্রমিক শুরু ও প্রত্যেকের নিজস্ব স্থায়ী স্টোরেজ দেয়—একটি Deployment এর কোনোটিই দেয় না।'),
          l('Use it for databases and clustered stores where identity and disk must stick; use a Deployment for everything stateless.', 'ডেটাবেস ও ক্লাস্টার্ড স্টোরে ব্যবহার করুন যেখানে পরিচয় ও ডিস্ক লেগে থাকতে হবে; স্টেটলেস সবকিছুতে একটি Deployment নিন।'),
          l('It is more complex to scale and update, so pay that cost only when you genuinely need stable identity and per-pod storage.', 'এটি স্কেল ও আপডেট করা বেশি জটিল, তাই সেই খরচ শুধু তখনই দিন যখন সত্যিই স্থিতিশীল পরিচয় ও প্রতি-পড স্টোরেজ দরকার।'),
        ] },
      ],
    },
  ],

  // ── k8s-jobs · Jobs & CronJobs ────────────────────────────────────────────
  'k8s-jobs': [
    {
      h: l('What are Jobs and CronJobs?', 'Job ও CronJob কী?'),
      blocks: [
        { p: l('Most Kubernetes controllers keep pods running forever — a web server should never exit. But plenty of work is the opposite: run once, finish, and stop. A Job runs a pod to completion for a one-off task; a CronJob runs Jobs on a schedule. A Job starts one or more pods, waits for them to succeed, retries on failure, and then considers itself done. A CronJob sits on top and fires off a new Job at times you describe in cron format.', 'বেশিরভাগ কুবারনেটিস কন্ট্রোলার পডকে চিরকাল চালু রাখে—একটি ওয়েব সার্ভার কখনো বেরোনো উচিত নয়। কিন্তু অনেক কাজ ঠিক উল্টো: একবার চলো, শেষ করো, ও থামো। একটি Job একটি এককালীন কাজের জন্য একটি পড সম্পূর্ণ হওয়া পর্যন্ত চালায়; একটি CronJob শিডিউলে Job চালায়। একটি Job এক বা একাধিক পড শুরু করে, তাদের সফল হওয়ার অপেক্ষা করে, ব্যর্থতায় রিট্রাই করে, ও তারপর নিজেকে সম্পন্ন গণ্য করে। একটি CronJob এর ওপরে বসে ও cron ফরম্যাটে আপনার বর্ণনা করা সময়ে একটি নতুন Job চালু করে।') },
        { p: l('The problem they solve is running finite work reliably. A database migration, a nightly backup, a report generation, a cleanup script — these must run to completion exactly, retry if the machine dies mid-way, and not be restarted forever like a crashed server. Trying to model this with a Deployment is wrong: a Deployment would restart the "finished" pod again and again, because from its point of view a pod that exits has failed.', 'এগুলো যে সমস্যা সমাধান করে তা হলো সসীম কাজ নির্ভরযোগ্যভাবে চালানো। একটি ডেটাবেস মাইগ্রেশন, একটি রাত্রিকালীন ব্যাকআপ, একটি রিপোর্ট তৈরি, একটি ক্লিনআপ স্ক্রিপ্ট—এগুলো ঠিকঠাক সম্পূর্ণ হতে হবে, মাঝপথে মেশিন মরলে রিট্রাই করতে হবে, ও একটি ক্র্যাশ হওয়া সার্ভারের মতো চিরকাল রিস্টার্ট হবে না। একটি Deployment দিয়ে এটি মডেল করার চেষ্টা ভুল: একটি Deployment "সম্পন্ন" পডকে বারবার রিস্টার্ট করবে, কারণ তার দৃষ্টিতে একটি পড যা বেরিয়ে যায় তা ব্যর্থ হয়েছে।') },
        { note: l('A Job is a one-time errand; a CronJob is a recurring calendar reminder that fires the errand. "Go post this letter" is a Job — you do it once and you are done. "Every Monday at 9, water the plants" is a CronJob — the reminder keeps launching the errand on schedule.', 'একটি Job হলো এককালীন কাজ; একটি CronJob হলো একটি পুনরাবৃত্ত ক্যালেন্ডার রিমাইন্ডার যা কাজটি চালায়। "এই চিঠিটি পোস্ট করে এসো" একটি Job—একবার করলেই শেষ। "প্রতি সোমবার ৯টায় গাছে পানি দাও" একটি CronJob—রিমাইন্ডার শিডিউলে কাজটি চালাতে থাকে।'), kind: 'tip' },
      ],
    },
    {
      h: l('How they work, step by step', 'কীভাবে কাজ করে, ধাপে ধাপে'),
      blocks: [
        { steps: [
          l('A Job creates a pod and runs your container. When the container exits with success (exit code 0), the pod is marked Completed and the Job is done.', 'একটি Job একটি পড তৈরি করে ও আপনার কন্টেইনার চালায়। কন্টেইনার সফলভাবে (exit code 0) বেরোলে পড Completed চিহ্নিত হয় ও Job সম্পন্ন।'),
          l('If the container fails, the Job retries by starting a new pod, up to backoffLimit times, before giving up and marking the Job failed.', 'কন্টেইনার ব্যর্থ হলে Job একটি নতুন পড শুরু করে রিট্রাই করে, backoffLimit বার পর্যন্ত, তারপর হাল ছেড়ে Job-কে failed চিহ্নিত করে।'),
          l('The restartPolicy for Job pods is OnFailure or Never — never Always — so a finished pod is not resurrected like a server would be.', 'Job পডের restartPolicy হলো OnFailure বা Never—কখনো Always নয়—তাই একটি সম্পন্ন পড একটি সার্ভারের মতো পুনর্জীবিত হয় না।'),
          l('A CronJob holds a jobTemplate and a cron schedule; at each scheduled time it creates a fresh Job from that template.', 'একটি CronJob একটি jobTemplate ও একটি cron শিডিউল ধারণ করে; প্রতিটি নির্ধারিত সময়ে এটি সেই টেমপ্লেট থেকে একটি নতুন Job তৈরি করে।'),
          l('The schedule is standard cron: five fields for minute, hour, day-of-month, month, and day-of-week — so "0 2 * * *" means 02:00 every day.', 'শিডিউল হলো প্রমিত cron: মিনিট, ঘণ্টা, মাসের-দিন, মাস ও সপ্তাহের-দিনের জন্য পাঁচটি ফিল্ড—তাই "0 2 * * *" মানে প্রতিদিন ০২:০০।'),
          l('A plain Job can also fan out: set completions to how many successful runs you need and parallelism to how many pods may run at once, and Kubernetes tracks progress until the target count of pods has finished.', 'একটি সাধারণ Job ছড়িয়েও দিতে পারে: আপনার কতটি সফল রান দরকার তা completions-এ ও একসঙ্গে কতটি পড চলতে পারে তা parallelism-এ সেট করুন, আর কুবারনেটিস লক্ষ্য সংখ্যক পড শেষ না হওয়া পর্যন্ত অগ্রগতি ট্র্যাক করে।'),
        ] },
        { code: `apiVersion: batch/v1
kind: CronJob
metadata:
  name: nightly-backup
spec:
  schedule: "0 2 * * *"
  jobTemplate:
    spec:
      template:
        spec:
          restartPolicy: OnFailure
          containers:
            - name: backup
              image: myorg/backup:1.0`, caption: l('A CronJob that runs every night. The schedule uses standard cron syntax — here, 02:00 every day. Each run creates a new Job, which runs the backup container to completion with restartPolicy: OnFailure.', 'প্রতি রাতে চলা একটি CronJob। শিডিউল প্রমিত cron সিনট্যাক্স ব্যবহার করে—এখানে প্রতিদিন ০২:০০। প্রতিটি রান একটি নতুন Job তৈরি করে, যা restartPolicy: OnFailure সহ backup কন্টেইনারকে সম্পূর্ণ হওয়া পর্যন্ত চালায়।') },
      ],
    },
    {
      h: l('Key commands', 'মূল কমান্ড'),
      blocks: [
        { table: {
          head: [l('Goal', 'লক্ষ্য'), l('Command', 'কমান্ড')],
          rows: [
            [l('Create a job', 'জব তৈরি'), l('kubectl create job pi --image=busybox', 'kubectl create job pi --image=busybox')],
            [l('List jobs', 'জব তালিকা'), l('kubectl get jobs', 'kubectl get jobs')],
            [l('List cron jobs', 'ক্রন জব তালিকা'), l('kubectl get cronjobs', 'kubectl get cronjobs')],
            [l('Read a job’s logs', 'জব লগ পড়ুন'), l('kubectl logs job/pi', 'kubectl logs job/pi')],
          ],
        } },
      ],
    },
    {
      h: l('When and where to use them', 'কখন ও কোথায় ব্যবহার করবেন'),
      blocks: [
        { p: l('Use a Job for batch tasks (migrations, backups) and a CronJob for scheduled ones, with a schedule in cron format. Reach for a Job whenever the work is finite and should happen once: run a database migration during a deploy, generate a one-off report, process a batch of files, or seed some data. Reach for a CronJob when that finite work must repeat on a clock: back up a database every night, prune old records hourly, send a weekly digest, or refresh a cache on a schedule.', 'ব্যাচ কাজে (মাইগ্রেশন, ব্যাকআপ) Job ও শিডিউলড কাজে CronJob ব্যবহার করুন, cron ফরম্যাটে শিডিউলসহ। যখনই কাজ সসীম ও একবার হওয়া উচিত তখন একটি Job নিন: একটি ডিপ্লয়ের সময় একটি ডেটাবেস মাইগ্রেশন চালান, একটি এককালীন রিপোর্ট তৈরি করুন, একগুচ্ছ ফাইল প্রসেস করুন, বা কিছু ডেটা seed করুন। যখন সেই সসীম কাজ একটি ঘড়ি ধরে পুনরাবৃত্ত হতে হবে তখন একটি CronJob নিন: প্রতি রাতে একটি ডেটাবেস ব্যাকআপ, প্রতি ঘণ্টায় পুরনো রেকর্ড ছাঁটা, একটি সাপ্তাহিক ডাইজেস্ট পাঠানো, বা শিডিউলে একটি ক্যাশ রিফ্রেশ করা।') },
        { p: l('Keep the trade-off in mind: Jobs guarantee a task runs to completion with retries, but long or overlapping CronJobs can pile up if one runs slow. If a nightly job sometimes takes longer than a day, the next scheduled run can start before the last one finishes, and the copies stack up. Guard against this with the concurrencyPolicy field (Forbid or Replace instead of the default Allow), and set activeDeadlineSeconds so a runaway job is stopped rather than running forever. Finished Jobs and their pods also linger by default, cluttering kubectl get jobs over time; set ttlSecondsAfterFinished, and on a CronJob tune successfulJobsHistoryLimit and failedJobsHistoryLimit, so old runs are cleaned up automatically once you no longer need their logs.', 'ট্রেড-অফ মনে রাখুন: Job রিট্রাইসহ একটি কাজ সম্পূর্ণ চালানো নিশ্চিত করে, তবে দীর্ঘ বা ওভারল্যাপিং CronJob একটি ধীর হলে জমতে পারে। একটি রাত্রিকালীন job কখনো একদিনের বেশি সময় নিলে, শেষটি শেষ হওয়ার আগেই পরের নির্ধারিত রান শুরু হতে পারে, ও কপি জমতে থাকে। concurrencyPolicy ফিল্ড দিয়ে (ডিফল্ট Allow-এর বদলে Forbid বা Replace) এর বিরুদ্ধে রক্ষা করুন, ও activeDeadlineSeconds সেট করুন যাতে একটি বেপরোয়া job চিরকাল চলার বদলে থামে। সম্পন্ন Job ও তাদের পডও ডিফল্টে পড়ে থাকে, সময়ের সঙ্গে kubectl get jobs এলোমেলো করে; ttlSecondsAfterFinished সেট করুন, ও একটি CronJob-এ successfulJobsHistoryLimit ও failedJobsHistoryLimit টিউন করুন, যাতে লগ আর দরকার না থাকলে পুরনো রান স্বয়ংক্রিয়ভাবে পরিষ্কার হয়।') },
      ],
    },
    {
      h: l('Common mistakes', 'সাধারণ ভুল'),
      blocks: [
        { list: [
          l('Running a batch task as a long-lived Deployment that never exits instead of a Job that completes and stops.', 'সম্পন্ন হওয়া ও থামা Job-এর বদলে কখনো না-বেরোনো দীর্ঘজীবী Deployment হিসেবে একটি ব্যাচ কাজ চালানো।'),
          l('Setting restartPolicy: Always on a Job pod — it is invalid; a Job needs OnFailure or Never.', 'একটি Job পডে restartPolicy: Always সেট করা—এটি অবৈধ; একটি Job-এর OnFailure বা Never লাগে।'),
          l('Ignoring concurrencyPolicy, so a slow CronJob overlaps with its next run and the pods pile up.', 'concurrencyPolicy উপেক্ষা করা, ফলে একটি ধীর CronJob তার পরের রানের সঙ্গে ওভারল্যাপ করে ও পড জমে।'),
          l('Getting the cron schedule wrong (fields or timezone), so the job fires at the wrong hour or never at all.', 'cron শিডিউল ভুল করা (ফিল্ড বা টাইমজোন), ফলে job ভুল সময়ে চলে বা একেবারেই চলে না।'),
          l('Not reading the job’s logs after it fails, missing the exact error that stopped the batch task.', 'ব্যর্থ হওয়ার পর job-এর লগ না পড়া, ব্যাচ কাজটি থামানো সঠিক ত্রুটি মিস করা।'),
        ] },
      ],
    },
    {
      h: l('Remember in one line', 'এক লাইনে মনে রাখুন'),
      blocks: [
        { list: [
          l('A Job runs a pod to completion once; a CronJob launches a Job on a cron schedule.', 'একটি Job একবার একটি পড সম্পূর্ণ হওয়া পর্যন্ত চালায়; একটি CronJob একটি cron শিডিউলে একটি Job চালু করে।'),
          l('Use them for finite work (migrations, backups, reports) — never a Deployment, which would restart a finished pod forever.', 'সসীম কাজে (মাইগ্রেশন, ব্যাকআপ, রিপোর্ট) ব্যবহার করুন—কখনো Deployment নয়, যা একটি সম্পন্ন পড চিরকাল রিস্টার্ট করত।'),
          l('Jobs retry to completion; guard slow CronJobs against overlap with concurrencyPolicy.', 'Job সম্পূর্ণ হওয়া পর্যন্ত রিট্রাই করে; ধীর CronJob-কে concurrencyPolicy দিয়ে ওভারল্যাপ থেকে রক্ষা করুন।'),
        ] },
      ],
    },
  ],

  // ── k8s-service · Services ────────────────────────────────────────────────
  'k8s-service': [
    {
      h: l('What is a Service?', 'Service কী?'),
      blocks: [
        { p: l('A Service gives a stable virtual IP and DNS name that load-balances traffic across a changing set of pods. Pods are ephemeral — they are created, killed, rescheduled, and given new IP addresses constantly, so you can never rely on a pod’s IP. A Service sits in front of a group of pods and offers one fixed address that never changes, quietly spreading requests across whichever pods are healthy right now.', 'একটি Service একটি স্থিতিশীল ভার্চুয়াল IP ও DNS নাম দেয় যা বদলানো পড সেটজুড়ে ট্রাফিক লোড-ব্যালান্স করে। পড ক্ষণস্থায়ী—এগুলো ক্রমাগত তৈরি, বন্ধ, পুনঃশিডিউল ও নতুন IP ঠিকানা পায়, তাই আপনি কখনো একটি পডের IP-এর ওপর নির্ভর করতে পারেন না। একটি Service একদল পডের সামনে বসে ও একটি নির্দিষ্ট ঠিকানা দেয় যা কখনো বদলায় না, নীরবে এই মুহূর্তে যে পডগুলো সুস্থ সেগুলোজুড়ে রিকোয়েস্ট ছড়ায়।') },
        { p: l('The problem it solves is service discovery in a world where the backends keep moving. Without a Service, a frontend that wants to call the backend would have to track pod IPs that expire every time a pod restarts or the Deployment rolls — an impossible, brittle chase. A Service breaks that coupling: the frontend talks to one stable name, and Kubernetes keeps the list of live pods behind it up to date automatically.', 'এটি যে সমস্যা সমাধান করে তা হলো এমন একটি জগতে সার্ভিস ডিসকভারি যেখানে ব্যাকএন্ড ক্রমাগত সরতে থাকে। একটি Service ছাড়া, একটি ফ্রন্টএন্ড যে ব্যাকএন্ড কল করতে চায় তাকে পড IP ট্র্যাক করতে হতো যা প্রতিবার একটি পড রিস্টার্ট বা Deployment রোল করলে মেয়াদ ফুরায়—একটি অসম্ভব, ভঙ্গুর ধাওয়া। একটি Service সেই বন্ধন ভাঙে: ফ্রন্টএন্ড একটি স্থিতিশীল নামে কথা বলে, আর কুবারনেটিস তার পেছনের জীবন্ত পডের তালিকা স্বয়ংক্রিয়ভাবে হালনাগাদ রাখে।') },
        { note: l('Think of a front desk phone number that always works, even as the staff behind it change shifts. You dial one number; whoever is on duty answers. You never need to know the personal mobile number of today’s receptionist — the desk number is stable while the people behind it come and go.', 'একটি ফ্রন্ট ডেস্ক ফোন নম্বর ভাবুন যা সবসময় কাজ করে, পেছনের কর্মী শিফট বদলালেও। আপনি একটি নম্বরে ডায়াল করেন; যে ডিউটিতে আছে সে উত্তর দেয়। আজকের রিসেপশনিস্টের ব্যক্তিগত মোবাইল নম্বর জানার দরকার নেই—ডেস্ক নম্বর স্থিতিশীল থাকে যখন পেছনের মানুষ আসে ও যায়।'), kind: 'tip' },
      ],
    },
    {
      h: l('How a Service works, step by step', 'একটি Service কীভাবে কাজ করে, ধাপে ধাপে'),
      blocks: [
        { steps: [
          l('You create a Service with a selector — a set of labels. It matches every pod carrying those labels, no matter which node they run on.', 'আপনি একটি সিলেক্টর সহ একটি Service তৈরি করেন—একগুচ্ছ লেবেল। এটি সেই লেবেলযুক্ত প্রতিটি পডের সঙ্গে মেলে, তারা যে নোডেই চলুক।'),
          l('Kubernetes assigns the Service a stable ClusterIP and a DNS name, and continuously tracks the IPs of all matching pods as an endpoint list.', 'কুবারনেটিস Service-কে একটি স্থিতিশীল ClusterIP ও একটি DNS নাম বরাদ্দ করে, ও সব মেলা পডের IP একটি এন্ডপয়েন্ট তালিকা হিসেবে ক্রমাগত ট্র্যাক করে।'),
          l('When another pod connects to the Service’s name or IP, Kubernetes load-balances the connection to one of the healthy endpoint pods.', 'আরেকটি পড Service-এর নাম বা IP-তে সংযোগ করলে কুবারনেটিস সংযোগটিকে সুস্থ এন্ডপয়েন্ট পডগুলোর একটিতে লোড-ব্যালান্স করে।'),
          l('As pods come and go — a rollout, a crash, a scale-up — Kubernetes updates the endpoint list automatically, so the Service always points at live pods.', 'পড আসা-যাওয়ার সঙ্গে—একটি রোলআউট, একটি ক্র্যাশ, একটি স্কেল-আপ—কুবারনেটিস এন্ডপয়েন্ট তালিকা স্বয়ংক্রিয়ভাবে হালনাগাদ করে, তাই Service সবসময় জীবন্ত পডে নির্দেশ করে।'),
          l('Callers only ever use the stable name (for example web); they never learn or care about individual pod IPs.', 'কলাররা শুধু স্থিতিশীল নাম (যেমন web) ব্যবহার করে; তারা কখনো পৃথক পড IP জানে না বা পরোয়া করে না।'),
        ] },
        { code: `apiVersion: v1
kind: Service
metadata:
  name: web
spec:
  selector:
    app: web
  ports:
    - port: 80
      targetPort: 80`, caption: l('A ClusterIP Service for the web pods. The selector app: web makes this Service load-balance across every pod with that label. port is the Service’s own port; targetPort is the container port it forwards to.', 'web পডের জন্য একটি ClusterIP Service। সিলেক্টর app: web এই Service-কে সেই লেবেলের প্রতিটি পডে লোড-ব্যালান্স করায়। port হলো Service-এর নিজের পোর্ট; targetPort হলো যে কন্টেইনার পোর্টে এটি ফরোয়ার্ড করে।') },
      ],
    },
    {
      h: l('The selector is the whole trick', 'সিলেক্টরই পুরো কৌশল'),
      blocks: [
        { p: l('The single most important line in a Service is its selector. It is not a list of pod names or IPs — it is a label query. In the example above, selector: app: web tells the Service "your backends are every pod labelled app: web." Kubernetes evaluates that query live: any pod that has the label joins the Service’s endpoint list the moment it becomes ready, and any pod that loses the label or dies drops out. This is why a Deployment and its Service fit together so cleanly — the Deployment stamps app: web on every pod it creates, and the Service picks them up with the matching selector.', 'একটি Service-এর একক সবচেয়ে গুরুত্বপূর্ণ লাইন হলো তার সিলেক্টর। এটি পড নাম বা IP-এর তালিকা নয়—এটি একটি লেবেল কুয়েরি। ওপরের উদাহরণে selector: app: web Service-কে বলে "তোমার ব্যাকএন্ড হলো app: web লেবেলযুক্ত প্রতিটি পড।" কুবারনেটিস সেই কুয়েরি লাইভ মূল্যায়ন করে: লেবেলযুক্ত যেকোনো পড প্রস্তুত হওয়ার মুহূর্তে Service-এর এন্ডপয়েন্ট তালিকায় যোগ দেয়, ও লেবেল হারানো বা মরা যেকোনো পড বাদ পড়ে। এ কারণেই একটি Deployment ও তার Service এত পরিষ্কারভাবে খাপ খায়—Deployment তার তৈরি প্রতিটি পডে app: web ছাপে, ও Service মেলা সিলেক্টর দিয়ে সেগুলো তুলে নেয়।') },
        { note: l('If a Service selects nothing — because the labels are misspelled or do not match the pod template — you get a Service with an empty endpoint list. Connections just hang or refuse with no obvious error. When a Service "does not work," the first thing to check is that its selector exactly matches the pods’ labels.', 'একটি Service যদি কিছুই নির্বাচন না করে—কারণ লেবেল ভুল বানান বা পড টেমপ্লেটের সঙ্গে মেলে না—আপনি একটি খালি এন্ডপয়েন্ট তালিকাসহ একটি Service পান। সংযোগ শুধু ঝুলে থাকে বা কোনো স্পষ্ট ত্রুটি ছাড়া প্রত্যাখ্যাত হয়। একটি Service "কাজ না করলে" প্রথমে যা যাচাই করবেন তা হলো এর সিলেক্টর পডের লেবেলের সঙ্গে ঠিক মেলে কিনা।'), kind: 'warn' },
      ],
    },
    {
      h: l('Key commands', 'মূল কমান্ড'),
      blocks: [
        { table: {
          head: [l('Goal', 'লক্ষ্য'), l('Command', 'কমান্ড')],
          rows: [
            [l('Expose a deployment as a Service', 'ডিপ্লয়মেন্ট Service হিসেবে এক্সপোজ'), l('kubectl expose deploy web --port=80', 'kubectl expose deploy web --port=80')],
            [l('List services', 'সার্ভিস তালিকা'), l('kubectl get svc', 'kubectl get svc')],
            [l('Inspect a Service and its endpoints', 'Service ও এর এন্ডপয়েন্ট দেখুন'), l('kubectl describe svc web', 'kubectl describe svc web')],
            [l('Reach a Service locally for testing', 'টেস্টে লোকালি Service-এ পৌঁছান'), l('kubectl port-forward svc/web 8080:80', 'kubectl port-forward svc/web 8080:80')],
          ],
        } },
      ],
    },
    {
      h: l('When and where to use it', 'কখন ও কোথায় ব্যবহার করবেন'),
      blocks: [
        { p: l('Create a Service selecting your pods by label whenever anything needs to reach a Deployment reliably; other pods reach it by its stable name, not pod IPs. In practice that means: put a Service in front of essentially every Deployment that other components call. Your frontend pods talk to a backend Service by name; your backend talks to a database Service by name; a worker reads a queue Service by name. The Service name becomes the contract, and the pods behind it can be rolled, scaled, or replaced freely without any caller noticing.', 'যখনই কোনো কিছুর একটি Deployment-এ নির্ভরযোগ্যভাবে পৌঁছানো দরকার তখন লেবেল দিয়ে আপনার পড নির্বাচন করা একটি Service বানান; অন্য পড এটিকে স্থিতিশীল নামে পৌঁছায়, পড IP নয়। বাস্তবে এর মানে: অন্য উপাদান কল করে এমন মূলত প্রতিটি Deployment-এর সামনে একটি Service রাখুন। আপনার ফ্রন্টএন্ড পড একটি ব্যাকএন্ড Service-এ নামে কথা বলে; আপনার ব্যাকএন্ড একটি ডেটাবেস Service-এ নামে কথা বলে; একটি ওয়ার্কার একটি কিউ Service নামে পড়ে। Service নাম চুক্তিতে পরিণত হয়, ও এর পেছনের পড কোনো কলার লক্ষ্য না করেই অবাধে রোল, স্কেল বা প্রতিস্থাপন করা যায়।') },
        { p: l('Know the trade-off: Services decouple clients from ephemeral pods, but the default ClusterIP is only reachable inside the cluster. A ClusterIP Service is perfect for pod-to-pod traffic, but it is invisible to the outside world — a browser on the internet cannot reach it. To expose a Service externally you choose a different type (NodePort, LoadBalancer) or put an Ingress in front; the plain ClusterIP shown here is the right default for internal, service-to-service communication.', 'ট্রেড-অফ জানুন: Service ক্লায়েন্টকে ক্ষণস্থায়ী পড থেকে ডিকাপল করে, তবে ডিফল্ট ClusterIP শুধু ক্লাস্টারের ভেতরে পৌঁছানো যায়। একটি ClusterIP Service পড-থেকে-পড ট্রাফিকের জন্য নিখুঁত, কিন্তু বাইরের জগতের কাছে অদৃশ্য—ইন্টারনেটের একটি ব্রাউজার এতে পৌঁছাতে পারে না। একটি Service বাইরে এক্সপোজ করতে আপনি একটি ভিন্ন টাইপ (NodePort, LoadBalancer) বাছেন বা সামনে একটি Ingress রাখেন; এখানে দেখানো সাধারণ ClusterIP অভ্যন্তরীণ, সার্ভিস-থেকে-সার্ভিস যোগাযোগের সঠিক ডিফল্ট।') },
      ],
    },
    {
      h: l('Common mistakes', 'সাধারণ ভুল'),
      blocks: [
        { list: [
          l('Expecting a ClusterIP Service to be reachable from outside the cluster, which it is not — you need NodePort, LoadBalancer, or an Ingress.', 'একটি ClusterIP Service ক্লাস্টারের বাইরে থেকে পৌঁছানো যাবে আশা করা, যা যায় না—আপনার NodePort, LoadBalancer বা একটি Ingress লাগে।'),
          l('A selector that does not match the pods’ labels, giving a Service with no endpoints, so connections silently hang.', 'পডের লেবেলের সঙ্গে না-মেলা একটি সিলেক্টর, ফলে এন্ডপয়েন্টহীন একটি Service, ও সংযোগ নীরবে ঝুলে থাকে।'),
          l('Confusing port and targetPort — port is the Service’s port, targetPort is the container port it forwards to.', 'port ও targetPort গুলিয়ে ফেলা—port হলো Service-এর পোর্ট, targetPort হলো যে কন্টেইনার পোর্টে এটি ফরোয়ার্ড করে।'),
          l('Hard-coding a Service’s ClusterIP instead of using its DNS name, which breaks the moment the Service is recreated.', 'একটি Service-এর DNS নামের বদলে ClusterIP হার্ড-কোড করা, যা Service পুনঃতৈরির মুহূর্তে ভাঙে।'),
        ] },
      ],
    },
    {
      h: l('Remember in one line', 'এক লাইনে মনে রাখুন'),
      blocks: [
        { list: [
          l('A Service is a stable IP and DNS name that load-balances traffic across the pods its selector matches.', 'একটি Service একটি স্থিতিশীল IP ও DNS নাম যা তার সিলেক্টরের মেলা পডজুড়ে ট্রাফিক লোড-ব্যালান্স করে।'),
          l('The selector is a live label query — match it to your pods’ labels or the Service has no endpoints.', 'সিলেক্টর একটি লাইভ লেবেল কুয়েরি—আপনার পডের লেবেলের সঙ্গে মেলান নইলে Service-এর কোনো এন্ডপয়েন্ট থাকে না।'),
          l('The default ClusterIP is internal only; use NodePort, LoadBalancer, or Ingress to reach it from outside.', 'ডিফল্ট ClusterIP শুধু অভ্যন্তরীণ; বাইরে থেকে পৌঁছাতে NodePort, LoadBalancer বা Ingress ব্যবহার করুন।'),
        ] },
      ],
    },
  ],
}
