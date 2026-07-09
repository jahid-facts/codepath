// Deep, bilingual (English / Bangla) teaching guides for the Kubernetes
// "Pods & workloads" and early "Controllers" topics. Shape mirrors
// app/course-guides.js and app/guides/git/f.js: each guide is an array of
// sections { h, blocks }, rendered by GuideBlock in app/LearningApp.js. Facts,
// YAML, and kubectl commands are drawn from rawTopics + commands + examples in
// app/courses/kubernetes.js. In { code } blocks the content is a plain backtick
// literal — never a dollar sign followed by an opening brace.

const l = (en, bn) => ({ en, bn })

export default {
  // ── k8s-multicontainer · Multi-container pods & sidecars ──────────────────
  'k8s-multicontainer': [
    {
      h: l('What is a multi-container pod?', 'মাল্টি-কন্টেইনার পড কী?'),
      blocks: [
        { p: l('A pod is Kubernetes’ smallest deployable unit, and although most pods hold a single container, a pod can hold several. When it does, all the containers in that pod share the same network namespace (one IP, so they reach each other over localhost) and can share the same volumes. They are always scheduled together onto one node, started together, and stopped together. The extra container that assists the main application is called a sidecar.', 'পড হলো কুবারনেটিসের ক্ষুদ্রতম ডিপ্লয়যোগ্য একক, আর বেশিরভাগ পডে একটি কন্টেইনার থাকলেও একটি পড একাধিক কন্টেইনার রাখতে পারে। যখন রাখে, সেই পডের সব কন্টেইনার একই নেটওয়ার্ক namespace শেয়ার করে (একটি IP, তাই তারা localhost দিয়ে একে অপরকে পায়) এবং একই ভলিউম শেয়ার করতে পারে। এদের সবসময় একসঙ্গে একটি নোডে শিডিউল করা হয়, একসঙ্গে চালু ও একসঙ্গে বন্ধ করা হয়। মূল অ্যাপ্লিকেশনকে সাহায্য করা অতিরিক্ত কন্টেইনারটিকে sidecar বলে।') },
        { p: l('The problem this solves is separating a cross-cutting concern from your application without merging it into the same image or the same process. A sidecar for logging, a proxy, a metrics exporter, or a file-syncer runs beside the app, shares its localhost and disk, yet is built, versioned, and reasoned about on its own. Your application image stays focused on business logic, and the helper is a small, reusable container you can drop next to any workload.', 'এটি যে সমস্যা সমাধান করে তা হলো একটি ক্রস-কাটিং বিষয়কে আপনার অ্যাপ্লিকেশন থেকে আলাদা করা—সেটিকে একই ইমেজ বা একই প্রসেসে না মিশিয়ে। লগিং, একটি প্রক্সি, একটি মেট্রিক্স এক্সপোর্টার বা একটি ফাইল-সিঙ্কারের জন্য একটি sidecar অ্যাপের পাশে চলে, তার localhost ও ডিস্ক শেয়ার করে, তবু নিজে আলাদাভাবে তৈরি, ভার্সন ও বিবেচনা করা হয়। আপনার অ্যাপ্লিকেশন ইমেজ ব্যবসায়িক যুক্তিতে মনোযোগী থাকে, আর সহায়কটি একটি ছোট, পুনঃব্যবহারযোগ্য কন্টেইনার যা আপনি যেকোনো ওয়ার্কলোডের পাশে বসাতে পারেন।') },
        { note: l('Think of a main worker with a helper at the same desk, sharing the same phone line and filing cabinet. The helper can pick up the same calls and read the same files, but if the desk is cleared away, both people leave at once. That shared fate is the whole point of putting them in one pod instead of two.', 'একই ডেস্কে একজন প্রধান কর্মী ও একজন সহায়ক ভাবুন, যারা একই ফোন লাইন ও ফাইলিং ক্যাবিনেট শেয়ার করে। সহায়ক একই কল ধরতে ও একই ফাইল পড়তে পারে, কিন্তু ডেস্কটি সরিয়ে ফেললে দুজনই একসঙ্গে চলে যায়। এই শেয়ার্ড ভাগ্যই দুটির বদলে এক পডে রাখার আসল উদ্দেশ্য।'), kind: 'tip' },
      ],
    },
    {
      h: l('How it works, step by step', 'কীভাবে কাজ করে, ধাপে ধাপে'),
      blocks: [
        { steps: [
          l('You list two or more containers under a single pod’s spec.containers, each with its own name and image.', 'আপনি একটি পডের spec.containers-এর নিচে দুই বা তার বেশি কন্টেইনার তালিকা করেন, প্রতিটির নিজের name ও image সহ।'),
          l('Kubernetes places the whole pod on one node and gives it a single IP; every container listens on that shared network, so they talk over localhost.', 'কুবারনেটিস পুরো পডটি একটি নোডে রাখে ও একটি একক IP দেয়; প্রতিটি কন্টেইনার সেই শেয়ার্ড নেটওয়ার্কে শোনে, তাই তারা localhost দিয়ে কথা বলে।'),
          l('If you declare a volume in the pod, each container can mount it, so the sidecar reads or writes the same files as the app.', 'পডে একটি ভলিউম ঘোষণা করলে প্রতিটি কন্টেইনার তা মাউন্ট করতে পারে, তাই sidecar অ্যাপের মতো একই ফাইল পড়ে বা লেখে।'),
          l('All containers start together; the pod is only Running once each has started, and the pod is replaced as one unit.', 'সব কন্টেইনার একসঙ্গে শুরু হয়; প্রতিটি শুরু হলেই কেবল পড Running হয়, আর পডকে একটি এককে প্রতিস্থাপন করা হয়।'),
          l('When the pod is deleted or rescheduled, every container inside it goes away together — they share the pod’s fate.', 'পড ডিলিট বা পুনঃশিডিউল হলে এর ভেতরের প্রতিটি কন্টেইনার একসঙ্গে চলে যায়—তারা পডের ভাগ্য শেয়ার করে।'),
        ] },
        { code: `spec:
  containers:
    - name: app
      image: myorg/app:1.0
    - name: log-shipper
      image: fluent/fluent-bit
      # both share the pod network and can mount the same volume`, caption: l('Two containers in one pod: the app and a fluent-bit logging sidecar. They share localhost and can mount the same volume, so the sidecar can read the app’s logs and ship them elsewhere.', 'এক পডে দুটি কন্টেইনার: অ্যাপ ও একটি fluent-bit লগিং sidecar। তারা localhost শেয়ার করে ও একই ভলিউম মাউন্ট করতে পারে, তাই sidecar অ্যাপের লগ পড়ে অন্যত্র পাঠাতে পারে।') },
      ],
    },
    {
      h: l('Common multi-container patterns', 'সাধারণ মাল্টি-কন্টেইনার প্যাটার্ন'),
      blocks: [
        { table: {
          head: [l('Pattern', 'প্যাটার্ন'), l('What the helper does', 'সহায়ক যা করে')],
          rows: [
            [l('Sidecar', 'Sidecar'), l('Adds a capability beside the app — ships logs, syncs files, or refreshes certificates.', 'অ্যাপের পাশে একটি ক্ষমতা যোগ করে—লগ পাঠায়, ফাইল সিঙ্ক করে, বা সার্টিফিকেট রিফ্রেশ করে।')],
            [l('Ambassador', 'Ambassador'), l('A local proxy the app talks to over localhost; it handles the real remote connection.', 'একটি লোকাল প্রক্সি যার সঙ্গে অ্যাপ localhost দিয়ে কথা বলে; এটি আসল রিমোট সংযোগ সামলায়।')],
            [l('Adapter', 'Adapter'), l('Reshapes the app’s output into a standard format, e.g. exposing metrics for Prometheus.', 'অ্যাপের আউটপুটকে একটি প্রমিত ফরম্যাটে বদলায়, যেমন Prometheus-এর জন্য মেট্রিক্স প্রকাশ।')],
            [l('Init container', 'Init container'), l('Runs to completion before the app starts — sets up files, waits for a dependency, migrates a schema.', 'অ্যাপ শুরুর আগে সম্পূর্ণ হয়ে চলে—ফাইল সেটআপ, একটি ডিপেন্ডেন্সির জন্য অপেক্ষা, বা স্কিমা মাইগ্রেট করে।')],
          ],
        } },
        { note: l('An init container is a special case: it runs and finishes before the main containers start, and if it fails the pod restarts it. Use it for one-time setup; use a sidecar for something that must keep running alongside the app.', 'একটি init container একটি বিশেষ ঘটনা: এটি মূল কন্টেইনার শুরুর আগে চলে ও শেষ হয়, আর ব্যর্থ হলে পড এটি রিস্টার্ট করে। এককালীন সেটআপে এটি ব্যবহার করুন; অ্যাপের পাশে চলতে-থাকা কিছুর জন্য একটি sidecar নিন।'), kind: 'tip' },
      ],
    },
    {
      h: l('When and where to use it', 'কখন ও কোথায় ব্যবহার করবেন'),
      blocks: [
        { p: l('Reach for a second container only when the helper genuinely needs to share the main container’s network or filesystem, or must live and die with it. Classic good fits are a logging sidecar that tails the app’s log files, a service-mesh proxy (like Envoy) that intercepts the pod’s traffic, an init container that waits for a database to be ready before the app boots, or a small sync container that pulls fresh content into a shared volume the web server reads from.', 'দ্বিতীয় একটি কন্টেইনার তখনই নিন যখন সহায়কটির সত্যিই মূল কন্টেইনারের নেটওয়ার্ক বা ফাইলসিস্টেম শেয়ার করা দরকার, অথবা এর সঙ্গেই বাঁচতে-মরতে হবে। ক্লাসিক ভালো মিল হলো একটি লগিং sidecar যা অ্যাপের লগ ফাইল টেইল করে, একটি service-mesh প্রক্সি (যেমন Envoy) যা পডের ট্রাফিক আটকায়, একটি init container যা অ্যাপ বুট হওয়ার আগে একটি ডেটাবেস প্রস্তুত হওয়ার জন্য অপেক্ষা করে, বা একটি ছোট sync কন্টেইনার যা একটি শেয়ার্ড ভলিউমে টাটকা কন্টেন্ট টানে যা ওয়েব সার্ভার পড়ে।') },
        { p: l('Do not use a multi-container pod just to run two services together. If the two pieces have different scaling needs, different lifecycles, or no need to share localhost and disk, they belong in separate pods connected by a Service. The rule of thumb: containers share a pod only when they must share fate and resources — otherwise keep one container per pod so each can be scaled, updated, and restarted on its own.', 'শুধু দুটি সার্ভিস একসঙ্গে চালাতে একটি মাল্টি-কন্টেইনার পড ব্যবহার করবেন না। যদি দুটি অংশের স্কেলিং চাহিদা ভিন্ন হয়, লাইফসাইকেল ভিন্ন হয়, বা localhost ও ডিস্ক শেয়ার করার দরকার না থাকে, তবে তারা একটি Service দিয়ে যুক্ত আলাদা পডে থাকে। মূল নিয়ম: কন্টেইনার তখনই একটি পড শেয়ার করে যখন তাদের ভাগ্য ও রিসোর্স শেয়ার করতেই হবে—নইলে প্রতি পডে একটি কন্টেইনার রাখুন যাতে প্রতিটি আলাদাভাবে স্কেল, আপডেট ও রিস্টার্ট করা যায়।') },
      ],
    },
    {
      h: l('Common mistakes', 'সাধারণ ভুল'),
      blocks: [
        { list: [
          l('Cramming unrelated services into one pod, coupling their scaling and lifecycle unnecessarily — scale one and you are forced to scale the other.', 'অসম্পর্কিত সার্ভিস এক পডে ঠাসা, অপ্রয়োজনে তাদের স্কেলিং ও লাইফসাইকেল যুক্ত করা—একটি স্কেল করলে অন্যটিও বাধ্য হয়ে স্কেল হয়।'),
          l('Forgetting that all containers share the pod’s fate: if the pod dies, every container in it goes, sidecar and all.', 'ভুলে যাওয়া যে সব কন্টেইনার পডের ভাগ্য শেয়ার করে: পড মরলে এর প্রতিটি কন্টেইনার যায়, sidecar সহ সব।'),
          l('Two containers in one pod both trying to bind the same port — they share one network namespace, so the port clashes.', 'এক পডের দুই কন্টেইনার একই পোর্ট বাইন্ড করার চেষ্টা করা—তারা একটি নেটওয়ার্ক namespace শেয়ার করে, তাই পোর্ট সংঘর্ষ করে।'),
          l('Expecting a sidecar and app to share files without declaring a volume both containers mount — a shared network does not mean a shared disk.', 'একটি ভলিউম না ঘোষণা করে দুই কন্টেইনার মাউন্ট করবে ধরে নিয়ে sidecar ও অ্যাপ ফাইল শেয়ার করবে আশা করা—শেয়ার্ড নেটওয়ার্ক মানে শেয়ার্ড ডিস্ক নয়।'),
          l('Using a long-running sidecar where an init container fits (one-time setup), so the helper never exits and muddies pod readiness.', 'যেখানে একটি init container মানানসই (এককালীন সেটআপ) সেখানে একটি দীর্ঘজীবী sidecar ব্যবহার করা, ফলে সহায়ক কখনো বেরোয় না ও পড readiness ঘোলাটে করে।'),
        ] },
      ],
    },
    {
      h: l('Remember in one line', 'এক লাইনে মনে রাখুন'),
      blocks: [
        { list: [
          l('A pod can hold several containers that share one IP (localhost), can share volumes, and always share the pod’s fate.', 'একটি পড একাধিক কন্টেইনার রাখতে পারে যারা একটি IP (localhost) শেয়ার করে, ভলিউম শেয়ার করতে পারে, ও সবসময় পডের ভাগ্য শেয়ার করে।'),
          l('Use a sidecar (or init container) for a helper that must live beside the app — logging, proxy, setup — not for two independent services.', 'অ্যাপের পাশে থাকতে-হওয়া সহায়কে একটি sidecar (বা init container) নিন—লগিং, প্রক্সি, সেটআপ—দুটি স্বাধীন সার্ভিসে নয়।'),
          l('If the pieces can scale or restart independently, give them separate pods and wire them with a Service.', 'অংশগুলো স্বাধীনভাবে স্কেল বা রিস্টার্ট করতে পারলে আলাদা পড দিন ও একটি Service দিয়ে যুক্ত করুন।'),
        ] },
      ],
    },
  ],

  // ── k8s-labels · Labels & selectors ───────────────────────────────────────
  'k8s-labels': [
    {
      h: l('What are labels & selectors?', 'লেবেল ও সিলেক্টর কী?'),
      blocks: [
        { p: l('Labels are simple key-value tags you attach to Kubernetes objects — pods, Services, Deployments, almost anything. A pod might carry app: web, tier: frontend, and env: prod. A selector is the matching query on the other side: it names a set of label key-values, and Kubernetes returns every object whose labels satisfy them. Together they are how objects find and group each other, without anyone hard-coding a list of pod names or IP addresses.', 'লেবেল হলো সরল কী-ভ্যালু ট্যাগ যা আপনি কুবারনেটিস অবজেক্টে লাগান—পড, Service, Deployment, প্রায় সবকিছুতে। একটি পড app: web, tier: frontend ও env: prod বহন করতে পারে। সিলেক্টর হলো অন্য পাশের মেলানো কুয়েরি: এটি কিছু লেবেল কী-ভ্যালুর নাম দেয়, আর কুবারনেটিস এমন প্রতিটি অবজেক্ট ফেরত দেয় যার লেবেল সেগুলো পূরণ করে। একসঙ্গে এরা হলো অবজেক্টের একে অপরকে খুঁজে পাওয়া ও দলবদ্ধ করার উপায়, কাউকে পড নাম বা IP ঠিকানার তালিকা হার্ড-কোড না করেই।') },
        { p: l('The problem they solve is identifying a changing set of things by meaning rather than by name. Pods are ephemeral — they come and go, and their names and IPs change — so a Service cannot point at a fixed pod. Instead the Service says "send traffic to anything labelled app: web," and whichever pods happen to carry that label right now are the targets. A Deployment uses the same trick to know which pods it owns. Labels turn a moving target into a stable query.', 'এরা যে সমস্যা সমাধান করে তা হলো একটি বদলানো জিনিসের সেটকে নামের বদলে অর্থ দিয়ে শনাক্ত করা। পড ক্ষণস্থায়ী—এরা আসে-যায়, আর এদের নাম ও IP বদলায়—তাই একটি Service একটি নির্দিষ্ট পডে নির্দেশ করতে পারে না। বরং Service বলে "app: web লেবেলযুক্ত যেকোনো কিছুতে ট্রাফিক পাঠাও," আর এই মুহূর্তে যে পডগুলো সেই লেবেল বহন করে সেগুলোই লক্ষ্য। একটি Deployment একই কৌশলে জানে কোন পড তার। লেবেল একটি চলমান লক্ষ্যকে একটি স্থিতিশীল কুয়েরিতে বদলায়।') },
        { note: l('Labels are like coloured stickers on files: "find all the red ones" instantly selects a whole group, no matter how many files there are or how often they change. You never list the files by name — you describe the property you want, and the group updates itself.', 'লেবেল হলো ফাইলে রঙিন স্টিকারের মতো: "সব লাল খুঁজুন" তাৎক্ষণিক একটি পুরো দল বাছে, যত ফাইলই থাকুক বা যত বার বদলাক। আপনি কখনো ফাইলগুলো নাম ধরে তালিকা করেন না—আপনি চাওয়া বৈশিষ্ট্যটি বর্ণনা করেন, আর দলটি নিজেই আপডেট হয়।'), kind: 'tip' },
      ],
    },
    {
      h: l('How it works, step by step', 'কীভাবে কাজ করে, ধাপে ধাপে'),
      blocks: [
        { steps: [
          l('You add labels under metadata.labels on your pods (or on the pod template a Deployment stamps onto every pod it creates).', 'আপনি আপনার পডে metadata.labels-এর নিচে লেবেল যোগ করেন (বা Deployment যে পড টেমপ্লেট প্রতিটি তৈরি পডে ছাপে সেখানে)।'),
          l('A Service or controller declares a selector listing the labels it cares about, such as app: web.', 'একটি Service বা কন্ট্রোলার একটি সিলেক্টর ঘোষণা করে যা তার দরকারি লেবেল তালিকা করে, যেমন app: web।'),
          l('Kubernetes continuously matches: every object whose labels are a superset of the selector is included in the set.', 'কুবারনেটিস অবিরত মেলায়: এমন প্রতিটি অবজেক্ট যার লেবেল সিলেক্টরের একটি সুপারসেট তা সেটে অন্তর্ভুক্ত হয়।'),
          l('As pods are created or deleted, the matching set updates automatically — the Service’s endpoints follow the labels in real time.', 'পড তৈরি বা ডিলিট হওয়ার সঙ্গে মেলানো সেট স্বয়ংক্রিয়ভাবে আপডেট হয়—Service-এর এন্ডপয়েন্ট রিয়েল-টাইমে লেবেল অনুসরণ করে।'),
          l('You can query the same way from the CLI with kubectl get ... -l to see exactly which objects a selector would match.', 'আপনি CLI থেকে kubectl get ... -l দিয়ে একইভাবে কুয়েরি করে ঠিক কোন অবজেক্ট একটি সিলেক্টর মেলাবে তা দেখতে পারেন।'),
        ] },
        { code: `apiVersion: v1
kind: Pod
metadata:
  name: web-1
  labels:
    app: web
    tier: frontend
    env: prod
spec:
  containers:
    - name: nginx
      image: nginx:1.25`, caption: l('A pod carrying three labels. Any Service or controller with a selector like app: web will pick this pod up; adding tier or env lets you target narrower groups.', 'তিনটি লেবেল বহন করা একটি পড। app: web-এর মতো সিলেক্টরযুক্ত যেকোনো Service বা কন্ট্রোলার এই পডটি নেবে; tier বা env যোগ করলে আরও সংকীর্ণ দল টার্গেট করতে পারেন।') },
        { code: `# a Service (or controller) targets pods by label
selector:
  app: web
  tier: frontend

# query the same set from the CLI
kubectl get pods -l app=web
kubectl get pods -l 'env in (prod,staging)'
kubectl label pod web-1 release=canary`, caption: l('The selector matches every pod carrying both app: web and tier: frontend. kubectl -l runs the same match by hand, and kubectl label adds or changes a label on a live object.', 'সিলেক্টর app: web ও tier: frontend দুটোই বহন করা প্রতিটি পড মেলায়। kubectl -l একই মেলানো হাতে চালায়, আর kubectl label একটি লাইভ অবজেক্টে লেবেল যোগ বা বদলায়।') },
      ],
    },
    {
      h: l('Common label keys and how to use them', 'সাধারণ লেবেল কী ও ব্যবহার'),
      blocks: [
        { table: {
          head: [l('Label', 'লেবেল'), l('What it expresses', 'যা প্রকাশ করে')],
          rows: [
            [l('app: web', 'app: web'), l('Which application the object belongs to — the most common selector key.', 'অবজেক্টটি কোন অ্যাপ্লিকেশনের—সবচেয়ে সাধারণ সিলেক্টর কী।')],
            [l('tier: frontend', 'tier: frontend'), l('Which layer of the app (frontend, backend, cache) so you can target one tier.', 'অ্যাপের কোন স্তর (frontend, backend, cache) যাতে একটি স্তর টার্গেট করা যায়।')],
            [l('env: prod', 'env: prod'), l('Which environment (dev, staging, prod) the object runs in.', 'অবজেক্টটি কোন এনভায়রনমেন্টে (dev, staging, prod) চলে।')],
            [l('release: canary', 'release: canary'), l('Which rollout variant, so a Service can shift traffic between stable and canary pods.', 'কোন রোলআউট ভ্যারিয়েন্ট, যাতে একটি Service stable ও canary পডের মধ্যে ট্রাফিক সরাতে পারে।')],
          ],
        } },
        { note: l('Keep labels consistent across a project — agree on a small set of keys (app, tier, env) and use them everywhere. A Service selector and its pods must use identical key-values; even a capitalization difference (Web vs web) means they will not match.', 'একটি প্রকল্পজুড়ে লেবেল ধারাবাহিক রাখুন—কয়েকটি কী (app, tier, env)-এর একটি ছোট সেটে একমত হন ও সর্বত্র সেগুলো ব্যবহার করুন। একটি Service সিলেক্টর ও তার পডকে অভিন্ন কী-ভ্যালু ব্যবহার করতে হবে; এমনকি একটি বড়-হাতের পার্থক্যও (Web বনাম web) মানে তারা মিলবে না।'), kind: 'warn' },
      ],
    },
    {
      h: l('When and where to use them', 'কখন ও কোথায় ব্যবহার করবেন'),
      blocks: [
        { p: l('Label everything from the start, not as an afterthought. The moment you have more than a handful of pods, you will want to select them: a Service needs a selector to know its backends, a Deployment needs one to know its pods, and you will constantly want to run kubectl get, logs, or delete against a group rather than one object at a time. A consistent app / tier / env scheme lets you say "all the prod backend pods" in one short selector.', 'শুরু থেকেই সবকিছু লেবেল করুন, পরে ভাবার বিষয় হিসেবে নয়। যেই মুহূর্তে আপনার কয়েকটির বেশি পড হবে, আপনি এগুলো বাছতে চাইবেন: একটি Service তার ব্যাকএন্ড জানতে একটি সিলেক্টর চায়, একটি Deployment তার পড জানতে একটি চায়, আর আপনি অবিরত একটি একটি অবজেক্টের বদলে একটি দলের বিপরীতে kubectl get, logs বা delete চালাতে চাইবেন। একটি ধারাবাহিক app / tier / env স্কিম আপনাকে একটি ছোট সিলেক্টরে "সব prod backend পড" বলতে দেয়।') },
        { p: l('Use richer selectors when you need to slice groups: env in (prod, staging) matches two environments at once, and adding a release: canary label is exactly how canary and blue-green deploys shift a fraction of traffic to a new version by relabelling pods rather than rewiring anything. Because labels are cheap and decoupled, they cost nothing to add and pay off every time you need to address a set of objects by meaning.', 'দলকে টুকরো করতে হলে ধনী সিলেক্টর ব্যবহার করুন: env in (prod, staging) একসঙ্গে দুটি এনভায়রনমেন্ট মেলায়, আর একটি release: canary লেবেল যোগ করাই ঠিক সেই উপায় যাতে canary ও blue-green ডিপ্লয় পড রিলেবেল করে—কিছু পুনঃসংযোগ না করে—একটি নতুন ভার্সনে ট্রাফিকের একটি ভগ্নাংশ সরায়। যেহেতু লেবেল সস্তা ও ডিকাপলড, এগুলো যোগ করতে কিছুই লাগে না আর যতবার অর্থ দিয়ে অবজেক্টের একটি সেট ঠিকানা দিতে হয় ততবার লাভ দেয়।') },
      ],
    },
    {
      h: l('Common mistakes', 'সাধারণ ভুল'),
      blocks: [
        { list: [
          l('A Service selector that does not match the pods’ labels, so it routes to zero endpoints and the app looks "down" for no obvious reason.', 'একটি Service সিলেক্টর যা পডের লেবেলের সঙ্গে মেলে না, ফলে শূন্য এন্ডপয়েন্টে রাউট করে ও অ্যাপ স্পষ্ট কারণ ছাড়াই "ডাউন" দেখায়।'),
          l('A typo or case mismatch (app: Web vs app: web) that silently matches nothing — selectors fail quietly, never with an error.', 'একটি টাইপো বা কেস অমিল (app: Web বনাম app: web) যা নীরবে কিছুই মেলায় না—সিলেক্টর নীরবে ব্যর্থ হয়, কখনো একটি এরর দিয়ে নয়।'),
          l('Editing a Deployment’s selector after creation — the selector is immutable, and mismatched labels orphan the old pods.', 'তৈরির পর একটি Deployment-এর সিলেক্টর এডিট করা—সিলেক্টর অপরিবর্তনীয়, আর অমিল লেবেল পুরনো পডকে অনাথ করে।'),
          l('Overlapping labels across two Deployments, so both think they own the same pods and fight over the replica count.', 'দুটি Deployment জুড়ে ওভারল্যাপিং লেবেল, ফলে দুটোই ভাবে তারা একই পডের মালিক ও রেপ্লিকা সংখ্যা নিয়ে লড়ে।'),
          l('Putting volatile data (a build hash, a timestamp) in a selector label, so the set churns and nothing stays matched.', 'একটি সিলেক্টর লেবেলে অস্থির ডেটা (একটি বিল্ড হ্যাশ, একটি টাইমস্ট্যাম্প) রাখা, ফলে সেট ঘোলাটে হয় ও কিছুই মিলে থাকে না।'),
        ] },
      ],
    },
    {
      h: l('Remember in one line', 'এক লাইনে মনে রাখুন'),
      blocks: [
        { list: [
          l('Labels are key-value tags on objects; selectors query those tags to group and target a changing set of pods.', 'লেবেল হলো অবজেক্টে কী-ভ্যালু ট্যাগ; সিলেক্টর সেই ট্যাগ কুয়েরি করে একটি বদলানো পড সেট দলবদ্ধ ও টার্গেট করে।'),
          l('Services and Deployments find their pods by selector, so the selector and the pod labels must match exactly.', 'Service ও Deployment সিলেক্টর দিয়ে তাদের পড খোঁজে, তাই সিলেক্টর ও পড লেবেল ঠিকঠাক মিলতে হবে।'),
          l('Label consistently (app, tier, env) from day one — a mismatched selector fails silently with zero endpoints.', 'প্রথম দিন থেকে ধারাবাহিকভাবে লেবেল দিন (app, tier, env)—একটি অমিল সিলেক্টর শূন্য এন্ডপয়েন্টে নীরবে ব্যর্থ হয়।'),
        ] },
      ],
    },
  ],

  // ── k8s-namespaces · Namespaces ───────────────────────────────────────────
  'k8s-namespaces': [
    {
      h: l('What is a namespace?', 'নেমস্পেস কী?'),
      blocks: [
        { p: l('A namespace partitions one physical cluster into several virtual sub-clusters. Names, quotas, and access controls are scoped inside a namespace, so you can run a "dev", a "staging", and a "prod" version of the same app in one cluster without their objects colliding. Two pods called web can coexist as long as they live in different namespaces, and you can grant a team permission to touch only their own namespace.', 'একটি নেমস্পেস একটি ফিজিক্যাল ক্লাস্টারকে কয়েকটি ভার্চুয়াল সাব-ক্লাস্টারে ভাগ করে। নাম, কোটা ও অ্যাক্সেস নিয়ন্ত্রণ একটি নেমস্পেসের ভেতরে স্কোপড, তাই আপনি একই অ্যাপের একটি "dev", একটি "staging" ও একটি "prod" ভার্সন এক ক্লাস্টারে চালাতে পারেন তাদের অবজেক্ট সংঘর্ষ ছাড়াই। web নামের দুটি পড সহাবস্থান করতে পারে যতক্ষণ তারা ভিন্ন নেমস্পেসে থাকে, আর আপনি একটি দলকে শুধু তাদের নিজের নেমস্পেসে হাত দেওয়ার অনুমতি দিতে পারেন।') },
        { p: l('The problem namespaces solve is sharing one cluster among many teams and environments without chaos. Rather than spinning up a separate cluster for every group — which is expensive and slow — you give each group a namespace. Resource quotas cap how much CPU and memory a namespace may use so one team cannot starve another, and RBAC roles bound to a namespace keep each team inside its own lane. It is organization and isolation, layered on top of the same underlying machines.', 'নেমস্পেস যে সমস্যা সমাধান করে তা হলো এক ক্লাস্টার অনেক দল ও এনভায়রনমেন্টের মধ্যে বিশৃঙ্খলা ছাড়া ভাগ করা। প্রতিটি দলের জন্য একটি আলাদা ক্লাস্টার চালু করার বদলে—যা ব্যয়বহুল ও ধীর—আপনি প্রতিটি দলকে একটি নেমস্পেস দেন। রিসোর্স কোটা একটি নেমস্পেস কতটা CPU ও মেমরি ব্যবহার করতে পারে তা সীমিত করে যাতে এক দল অন্যকে অভুক্ত না করে, আর একটি নেমস্পেসে বাঁধা RBAC রোল প্রতিটি দলকে নিজের লেনে রাখে। এটি একই অন্তর্নিহিত মেশিনের ওপরে স্তরিত সংগঠন ও আইসোলেশন।') },
        { note: l('A namespace is like a separate floor in one building: each team gets its own space and can name their rooms freely without bumping into the others. But it is still one building — the plumbing, the foundation, and the machines are shared, so a namespace does not give a team its own nodes.', 'একটি নেমস্পেস হলো এক ভবনে আলাদা একটি তলার মতো: প্রতিটি দল নিজের জায়গা পায় ও অন্যদের সঙ্গে ধাক্কা না খেয়ে অবাধে ঘরের নাম দিতে পারে। কিন্তু এটি এখনো একটি ভবন—পাইপলাইন, ভিত্তি ও মেশিন শেয়ার করা, তাই একটি নেমস্পেস একটি দলকে নিজের নোড দেয় না।'), kind: 'tip' },
      ],
    },
    {
      h: l('How it works, step by step', 'কীভাবে কাজ করে, ধাপে ধাপে'),
      blocks: [
        { steps: [
          l('You create a namespace once — for example dev — and it becomes a scope that objects can be placed into.', 'আপনি একবার একটি নেমস্পেস তৈরি করেন—যেমন dev—আর এটি একটি স্কোপ হয় যেখানে অবজেক্ট রাখা যায়।'),
          l('You apply resources into it with -n dev, or set metadata.namespace in the manifest, and they live inside that namespace.', 'আপনি -n dev দিয়ে এতে রিসোর্স apply করেন, বা ম্যানিফেস্টে metadata.namespace সেট করেন, আর এগুলো সেই নেমস্পেসের ভেতরে থাকে।'),
          l('Object names must be unique within a namespace, but the same name can be reused in another namespace.', 'একটি নেমস্পেসের ভেতরে অবজেক্ট নাম অনন্য হতে হবে, তবে একই নাম অন্য একটি নেমস্পেসে পুনঃব্যবহার করা যায়।'),
          l('kubectl commands are namespaced: without -n they target your current default namespace, so you must say where you mean.', 'kubectl কমান্ড নেমস্পেসড: -n ছাড়া এগুলো আপনার বর্তমান ডিফল্ট নেমস্পেসকে টার্গেট করে, তাই আপনি কোথায় বোঝাচ্ছেন তা বলতে হবে।'),
          l('To stop typing -n on every command, set the default namespace for your context once with kubectl config set-context.', 'প্রতিটি কমান্ডে -n টাইপ করা থামাতে, kubectl config set-context দিয়ে একবার আপনার কনটেক্সটের ডিফল্ট নেমস্পেস সেট করুন।'),
        ] },
        { code: `kubectl create namespace dev
kubectl apply -f app.yaml -n dev
kubectl get pods -n dev

# make dev the default for this context
kubectl config set-context --current --namespace=dev`, caption: l('Create the namespace, deploy into it with -n dev, list what is there, then set dev as the default so you can drop -n on later commands.', 'নেমস্পেস তৈরি করুন, -n dev দিয়ে এতে ডিপ্লয় করুন, কী আছে তালিকা করুন, তারপর dev-কে ডিফল্ট সেট করুন যাতে পরের কমান্ডে -n বাদ দিতে পারেন।') },
      ],
    },
    {
      h: l('Key commands', 'মূল কমান্ড'),
      blocks: [
        { table: {
          head: [l('Goal', 'লক্ষ্য'), l('Command', 'কমান্ড')],
          rows: [
            [l('List namespaces', 'নেমস্পেস তালিকা'), l('kubectl get ns', 'kubectl get ns')],
            [l('Create a namespace', 'নেমস্পেস তৈরি'), l('kubectl create ns dev', 'kubectl create ns dev')],
            [l('List pods across all namespaces', 'সব নেমস্পেসজুড়ে পড তালিকা'), l('kubectl get pods -A', 'kubectl get pods -A')],
            [l('Set the default namespace', 'ডিফল্ট নেমস্পেস সেট'), l('kubectl config set-context --current --namespace=dev', 'kubectl config set-context --current --namespace=dev')],
          ],
        } },
        { note: l('ns is just the short name for namespace, and -A (or --all-namespaces) is how you see across every namespace at once — invaluable when you cannot find a pod because it is running somewhere you did not expect.', 'ns হলো namespace-এর সংক্ষিপ্ত নাম, আর -A (বা --all-namespaces) হলো একবারে প্রতিটি নেমস্পেস দেখার উপায়—যখন একটি পড খুঁজে পাচ্ছেন না কারণ এটি আপনার অপ্রত্যাশিত কোথাও চলছে, তখন অমূল্য।'), kind: 'tip' },
      ],
    },
    {
      h: l('When and where to use them', 'কখন ও কোথায় ব্যবহার করবেন'),
      blocks: [
        { p: l('Use namespaces to separate environments (dev, staging, prod) or teams that share a cluster, so their names do not collide and each can have its own quota and access rules. They are also the natural boundary for applying a ResourceQuota (cap total CPU/memory) or LimitRange, and for scoping RBAC so a team’s credentials work only inside their namespace. For any cluster used by more than one person or project, namespaces are the first organizing tool you reach for.', 'একটি ক্লাস্টার শেয়ার করা এনভায়রনমেন্ট (dev, staging, prod) বা দল আলাদা করতে নেমস্পেস ব্যবহার করুন, যাতে তাদের নাম সংঘর্ষ না করে ও প্রতিটির নিজের কোটা ও অ্যাক্সেস নিয়ম থাকতে পারে। এগুলো একটি ResourceQuota (মোট CPU/মেমরি সীমা) বা LimitRange প্রয়োগের, এবং RBAC স্কোপ করার স্বাভাবিক সীমানাও, যাতে একটি দলের ক্রেডেনশিয়াল শুধু তাদের নেমস্পেসের ভেতরে কাজ করে। একজনের বেশি মানুষ বা প্রকল্পে ব্যবহৃত যেকোনো ক্লাস্টারে, নেমস্পেস হলো আপনার প্রথম সংগঠক টুল।') },
        { p: l('Know their limit: a namespace is a logical boundary, not a physical one. Workloads in different namespaces still run on the same nodes and share the same kernel, so a namespace does not isolate you at the hardware level — for that you need separate node pools or separate clusters, and NetworkPolicies to stop cross-namespace traffic. Do not over-partition either: a tiny single-team cluster rarely needs more than the default namespace, and too many namespaces just adds bookkeeping.', 'এদের সীমা জানুন: একটি নেমস্পেস একটি যৌক্তিক সীমানা, ফিজিক্যাল নয়। ভিন্ন নেমস্পেসের ওয়ার্কলোড এখনো একই নোডে চলে ও একই kernel শেয়ার করে, তাই একটি নেমস্পেস আপনাকে হার্ডওয়্যার স্তরে আলাদা করে না—তার জন্য আলাদা node pool বা আলাদা ক্লাস্টার লাগে, আর ক্রস-নেমস্পেস ট্রাফিক থামাতে NetworkPolicy লাগে। অতি-ভাগও করবেন না: একটি ছোট একক-দলের ক্লাস্টারে ডিফল্ট নেমস্পেসের বেশি কমই লাগে, আর বেশি নেমস্পেস শুধু হিসাব-রক্ষা যোগ করে।') },
        { p: l('One more thing worth knowing: a handful of namespaces exist from the moment a cluster is born. default is where objects land when you do not specify one, kube-system holds the control-plane and core add-on components, and kube-public carries data readable by everyone. You should keep your own workloads out of kube-system and create purpose-named namespaces (dev, payments, team-a) for them instead. When a Service in one namespace needs to reach a Service in another, it must use the fully qualified DNS name — service.namespace.svc — because the short name only resolves within the caller’s own namespace.', 'আরও একটি জানার মতো বিষয়: একটি ক্লাস্টার জন্মানোর মুহূর্ত থেকেই কয়েকটি নেমস্পেস থাকে। default হলো যেখানে অবজেক্ট নামে যখন আপনি একটি নির্দিষ্ট করেন না, kube-system কন্ট্রোল-প্লেন ও মূল add-on উপাদান ধরে রাখে, আর kube-public সবার পঠনযোগ্য ডেটা বহন করে। আপনার নিজের ওয়ার্কলোড kube-system-এর বাইরে রাখুন ও এদের জন্য উদ্দেশ্য-নামযুক্ত নেমস্পেস (dev, payments, team-a) বানান। এক নেমস্পেসের একটি Service অন্য নেমস্পেসের একটি Service-এ পৌঁছাতে হলে তাকে পূর্ণ-যোগ্য DNS নাম—service.namespace.svc—ব্যবহার করতে হবে, কারণ সংক্ষিপ্ত নাম শুধু কলারের নিজের নেমস্পেসের ভেতরে রিজলভ হয়।') },
      ],
    },
    {
      h: l('Common mistakes', 'সাধারণ ভুল'),
      blocks: [
        { list: [
          l('Forgetting which namespace you are in and deleting or editing resources in the wrong environment — say, wiping prod thinking it was dev.', 'কোন নেমস্পেসে আছেন ভুলে গিয়ে ভুল এনভায়রনমেন্টে রিসোর্স ডিলিট বা এডিট করা—যেমন dev ভেবে prod মুছে ফেলা।'),
          l('Assuming a namespace isolates nodes; workloads still share the same machines, kernel, and network by default.', 'ধরে নেওয়া একটি নেমস্পেস নোড আলাদা করে; ওয়ার্কলোড এখনো ডিফল্টে একই মেশিন, kernel ও নেটওয়ার্ক শেয়ার করে।'),
          l('Running a command without -n and hitting the default namespace instead of the one you meant.', '-n ছাড়া একটি কমান্ড চালিয়ে আপনি যেটি বোঝাতে চেয়েছিলেন তার বদলে ডিফল্ট নেমস্পেসে আঘাত করা।'),
          l('Expecting a Service in one namespace to be found by its short name from another — cross-namespace calls need the full svc.namespace name.', 'এক নেমস্পেসের একটি Service অন্য থেকে তার সংক্ষিপ্ত নামে খুঁজে পাওয়া আশা করা—ক্রস-নেমস্পেস কলে পূর্ণ svc.namespace নাম লাগে।'),
          l('Creating dozens of namespaces for a one-person cluster, adding overhead with no real isolation benefit.', 'একজনের ক্লাস্টারে ডজন ডজন নেমস্পেস বানানো, কোনো আসল আইসোলেশন সুবিধা ছাড়াই ওভারহেড যোগ করা।'),
        ] },
      ],
    },
    {
      h: l('Remember in one line', 'এক লাইনে মনে রাখুন'),
      blocks: [
        { list: [
          l('A namespace is a virtual sub-cluster that scopes names, quotas, and access — great for separating teams and environments.', 'একটি নেমস্পেস হলো একটি ভার্চুয়াল সাব-ক্লাস্টার যা নাম, কোটা ও অ্যাক্সেস স্কোপ করে—দল ও এনভায়রনমেন্ট আলাদা করতে দারুণ।'),
          l('Create one with kubectl create ns, target it with -n, and set a default with kubectl config set-context to stop typing -n.', 'kubectl create ns দিয়ে একটি বানান, -n দিয়ে টার্গেট করুন, ও -n টাইপ থামাতে kubectl config set-context দিয়ে একটি ডিফল্ট সেট করুন।'),
          l('Namespaces isolate names and access, not nodes — the machines and kernel are still shared underneath.', 'নেমস্পেস নাম ও অ্যাক্সেস আলাদা করে, নোড নয়—মেশিন ও kernel এখনো নিচে শেয়ার করা।'),
        ] },
      ],
    },
  ],

  // ── k8s-pod-lifecycle · Pod lifecycle & restarts ──────────────────────────
  'k8s-pod-lifecycle': [
    {
      h: l('What is the pod lifecycle?', 'পড লাইফসাইকেল কী?'),
      blocks: [
        { p: l('Every pod moves through a small set of phases from birth to death. It starts Pending while Kubernetes finds a node and pulls images, becomes Running once its containers are up, and ends as Succeeded (all containers exited cleanly) or Failed (at least one exited with an error). Inside the pod, each container also has its own state — Waiting, Running, or Terminated — and the kubelet, the agent on each node, restarts containers according to the pod’s restartPolicy.', 'প্রতিটি পড জন্ম থেকে মৃত্যু পর্যন্ত কয়েকটি ফেজের একটি ছোট সেটের মধ্য দিয়ে যায়। এটি Pending-এ শুরু হয় যখন কুবারনেটিস একটি নোড খোঁজে ও ইমেজ টানে, কন্টেইনার চালু হলে Running হয়, আর Succeeded (সব কন্টেইনার পরিষ্কারভাবে বেরিয়েছে) বা Failed (অন্তত একটি এরর দিয়ে বেরিয়েছে) হিসেবে শেষ হয়। পডের ভেতরে প্রতিটি কন্টেইনারেরও নিজের স্টেট আছে—Waiting, Running বা Terminated—আর kubelet, প্রতিটি নোডের এজেন্ট, পডের restartPolicy অনুযায়ী কন্টেইনার রিস্টার্ট করে।') },
        { p: l('Understanding this matters because "my pod is not working" is almost always a specific phase or container state with a specific cause. A pod stuck in Pending usually means the scheduler cannot find a node with enough resources; a container in CrashLoopBackOff means it keeps starting and crashing, and Kubernetes is waiting longer between each retry. Reading the phase and the events tells you exactly which of these is happening, which turns a vague "it is broken" into a concrete fix.', 'এটি বোঝা গুরুত্বপূর্ণ কারণ "আমার পড কাজ করছে না" প্রায় সবসময়ই একটি নির্দিষ্ট ফেজ বা কন্টেইনার স্টেট, একটি নির্দিষ্ট কারণসহ। Pending-এ আটকে থাকা একটি পড সাধারণত মানে শিডিউলার যথেষ্ট রিসোর্সসহ একটি নোড খুঁজে পাচ্ছে না; CrashLoopBackOff-এ থাকা একটি কন্টেইনার মানে এটি বারবার শুরু হয় ও ক্র্যাশ করে, আর কুবারনেটিস প্রতিটি রিট্রাইয়ের মধ্যে বেশি অপেক্ষা করছে। ফেজ ও ইভেন্ট পড়লে ঠিক কোনটি ঘটছে তা জানা যায়, যা একটি অস্পষ্ট "এটি ভাঙা"-কে একটি সুনির্দিষ্ট সমাধানে বদলায়।') },
        { note: l('Picture a task on a board moving from queued (Pending) to in-progress (Running) to done or failed, with automatic retries. When a task is stuck in the queue, you do not blame the worker — you check whether there is any free desk to put it on. A Pending pod is the same: often there is simply no node with room, not a bug.', 'একটি বোর্ডে একটি কাজ কিউড (Pending) থেকে চলমান (Running) থেকে সম্পন্ন বা ব্যর্থ-এ সরছে, স্বয়ংক্রিয় রিট্রাইসহ—এমন ভাবুন। একটি কাজ কিউতে আটকে থাকলে আপনি কর্মীকে দোষ দেন না—দেখেন এটি রাখার মতো কোনো খালি ডেস্ক আছে কিনা। একটি Pending পড একই: প্রায়ই কেবল জায়গাসহ কোনো নোড নেই, একটি বাগ নয়।'), kind: 'tip' },
      ],
    },
    {
      h: l('How it works, step by step', 'কীভাবে কাজ করে, ধাপে ধাপে'),
      blocks: [
        { steps: [
          l('Pending: the pod is accepted but not yet running — the scheduler is placing it and the node is pulling images.', 'Pending: পড গৃহীত কিন্তু এখনো চলছে না—শিডিউলার এটি রাখছে ও নোড ইমেজ টানছে।'),
          l('Running: the pod is bound to a node and at least one container is up (or starting/restarting).', 'Running: পড একটি নোডে বাঁধা ও অন্তত একটি কন্টেইনার চালু (বা শুরু/রিস্টার্ট হচ্ছে)।'),
          l('The kubelet applies the restartPolicy: Always (the default, for long-running apps), OnFailure, or Never.', 'kubelet restartPolicy প্রয়োগ করে: Always (ডিফল্ট, দীর্ঘজীবী অ্যাপে), OnFailure, বা Never।'),
          l('If a container keeps crashing, Kubernetes backs off — waiting longer between restarts — and reports CrashLoopBackOff.', 'একটি কন্টেইনার বারবার ক্র্যাশ করলে কুবারনেটিস পিছিয়ে আসে—রিস্টার্টের মধ্যে বেশি অপেক্ষা করে—ও CrashLoopBackOff জানায়।'),
          l('Succeeded or Failed: for run-to-completion pods (Jobs), the pod ends once its containers exit — cleanly or with an error.', 'Succeeded বা Failed: run-to-completion পডে (Job), কন্টেইনার বেরোলেই পড শেষ হয়—পরিষ্কারভাবে বা একটি এরর দিয়ে।'),
        ] },
        { code: `spec:
  restartPolicy: Always   # Always | OnFailure | Never
  containers:
    - name: app
      image: myorg/app:1.0`, caption: l('restartPolicy controls how the kubelet reacts when a container exits. Always suits long-running apps; OnFailure suits Jobs that should retry only on error; Never leaves a stopped container stopped.', 'restartPolicy নিয়ন্ত্রণ করে একটি কন্টেইনার বেরোলে kubelet কীভাবে সাড়া দেয়। Always দীর্ঘজীবী অ্যাপে মানানসই; OnFailure এমন Job-এ যা শুধু এররে রিট্রাই করবে; Never একটি থামা কন্টেইনার থামানোই রাখে।') },
      ],
    },
    {
      h: l('Pod phases and container states', 'পড ফেজ ও কন্টেইনার স্টেট'),
      blocks: [
        { table: {
          head: [l('State', 'স্টেট'), l('What it means', 'যা বোঝায়')],
          rows: [
            [l('Pending', 'Pending'), l('Accepted but not running yet — scheduling or pulling images; often waiting for node resources.', 'গৃহীত কিন্তু এখনো চলছে না—শিডিউলিং বা ইমেজ টানা; প্রায়ই নোড রিসোর্সের জন্য অপেক্ষা।')],
            [l('Running', 'Running'), l('Bound to a node with at least one container up.', 'একটি নোডে বাঁধা, অন্তত একটি কন্টেইনার চালু।')],
            [l('Succeeded / Failed', 'Succeeded / Failed'), l('All containers exited — cleanly (Succeeded) or with an error (Failed).', 'সব কন্টেইনার বেরিয়েছে—পরিষ্কারভাবে (Succeeded) বা একটি এরর দিয়ে (Failed)।')],
            [l('CrashLoopBackOff', 'CrashLoopBackOff'), l('A container starts, crashes, and restarts repeatedly; Kubernetes waits longer between each attempt.', 'একটি কন্টেইনার শুরু হয়, ক্র্যাশ করে ও বারবার রিস্টার্ট হয়; কুবারনেটিস প্রতিটি চেষ্টার মধ্যে বেশি অপেক্ষা করে।')],
          ],
        } },
        { code: `kubectl get pod web -o wide     # see the phase: Pending / Running
kubectl describe pod web        # Events explain why it is stuck
kubectl logs web --previous     # logs from the last crashed container`, caption: l('get shows the current phase, describe’s Events section explains why a pod will not schedule or start, and logs --previous recovers the output of a container that already crashed.', 'get বর্তমান ফেজ দেখায়, describe-এর Events অংশ ব্যাখ্যা করে কেন পড শিডিউল বা চালু হবে না, আর logs --previous ইতিমধ্যে ক্র্যাশ করা একটি কন্টেইনারের আউটপুট ফিরিয়ে আনে।') },
      ],
    },
    {
      h: l('When and where this matters', 'এটি কখন ও কোথায় গুরুত্বপূর্ণ'),
      blocks: [
        { p: l('You lean on the lifecycle every time you debug. When a pod will not come up, the first move is kubectl describe pod to read its phase and, crucially, the Events at the bottom — they usually name the exact reason, such as "0/3 nodes are available: insufficient memory" for a Pending pod, or an image-pull error. When a container is in CrashLoopBackOff, kubectl logs (and logs --previous for the crashed instance) shows the error that is killing it. The lifecycle is the map that tells you which tool to reach for.', 'আপনি প্রতিবার ডিবাগ করার সময় লাইফসাইকেলের ওপর নির্ভর করেন। একটি পড চালু না হলে প্রথম পদক্ষেপ kubectl describe pod—এর ফেজ ও, গুরুত্বপূর্ণভাবে, নিচের Events পড়া—এগুলো সাধারণত সঠিক কারণটির নাম দেয়, যেমন একটি Pending পডে "0/3 nodes are available: insufficient memory", বা একটি image-pull এরর। একটি কন্টেইনার CrashLoopBackOff-এ থাকলে kubectl logs (ও ক্র্যাশ করা ইনস্ট্যান্সে logs --previous) এটিকে মারা এররটি দেখায়। লাইফসাইকেল হলো সেই মানচিত্র যা বলে কোন টুল নিতে হবে।') },
        { p: l('It also guides design. Because pods are ephemeral and can be restarted or replaced at any time, your app must start cleanly, tolerate being killed, and not depend on state held only in its own container. Choosing the right restartPolicy — Always for a web server, OnFailure for a batch Job — and adding readiness and liveness probes lets Kubernetes drive the lifecycle correctly instead of flapping healthy pods or sending traffic to ones that are not ready.', 'এটি ডিজাইনও নির্দেশ করে। যেহেতু পড ক্ষণস্থায়ী ও যেকোনো সময় রিস্টার্ট বা প্রতিস্থাপিত হতে পারে, আপনার অ্যাপকে পরিষ্কারভাবে শুরু হতে হবে, মারা যাওয়া সহ্য করতে হবে, ও শুধু নিজের কন্টেইনারে রাখা স্টেটের ওপর নির্ভর করা যাবে না। সঠিক restartPolicy বাছা—একটি ওয়েব সার্ভারে Always, একটি ব্যাচ Job-এ OnFailure—ও readiness ও liveness প্রোব যোগ করা কুবারনেটিসকে লাইফসাইকেল সঠিকভাবে চালাতে দেয়, সুস্থ পড ঝাঁকানো বা প্রস্তুত-নয় পডে ট্রাফিক পাঠানোর বদলে।') },
      ],
    },
    {
      h: l('Common mistakes', 'সাধারণ ভুল'),
      blocks: [
        { list: [
          l('Assuming a Pending pod is a bug when it is often just no node with enough resources — read the Events before you dig into code.', 'একটি Pending পডকে বাগ ভাবা যখন প্রায়ই কেবল যথেষ্ট রিসোর্সসহ নোড নেই—কোডে ঢোকার আগে Events পড়ুন।'),
          l('Ignoring CrashLoopBackOff and just deleting the pod; the replacement crashes the same way because the root cause is unchanged.', 'CrashLoopBackOff উপেক্ষা করে শুধু পড ডিলিট করা; প্রতিস্থাপনটি একইভাবে ক্র্যাশ করে কারণ মূল কারণ অপরিবর্তিত।'),
          l('Forgetting logs --previous, so you read the fresh (already-restarted) container and miss the error that actually killed it.', 'logs --previous ভুলে যাওয়া, ফলে আপনি টাটকা (ইতিমধ্যে রিস্টার্ট করা) কন্টেইনার পড়েন ও যে এরর আসলে এটিকে মেরেছে তা মিস করেন।'),
          l('Setting restartPolicy: Never on a Job that should retry, so a single transient failure leaves the work undone.', 'রিট্রাই করা উচিত এমন একটি Job-এ restartPolicy: Never সেট করা, ফলে একটি ক্ষণস্থায়ী ব্যর্থতা কাজটি অসম্পূর্ণ রাখে।'),
          l('Storing important data inside a pod and losing it when the pod is replaced — pods are cattle, not pets; durable data needs a volume.', 'একটি পডের ভেতরে গুরুত্বপূর্ণ ডেটা রাখা ও পড প্রতিস্থাপিত হলে তা হারানো—পড গবাদি, পোষা নয়; টেকসই ডেটায় একটি ভলিউম লাগে।'),
        ] },
      ],
    },
    {
      h: l('Remember in one line', 'এক লাইনে মনে রাখুন'),
      blocks: [
        { list: [
          l('Pods go Pending → Running → Succeeded or Failed; the kubelet restarts containers per the restartPolicy.', 'পড যায় Pending → Running → Succeeded বা Failed; kubelet restartPolicy অনুযায়ী কন্টেইনার রিস্টার্ট করে।'),
          l('Pending usually means no room to schedule; CrashLoopBackOff means it keeps crashing — kubectl describe and logs tell you which.', 'Pending সাধারণত মানে শিডিউল করার জায়গা নেই; CrashLoopBackOff মানে এটি বারবার ক্র্যাশ করছে—kubectl describe ও logs বলে দেয় কোনটি।'),
          l('Treat pods as replaceable: start cleanly, tolerate restarts, and keep durable data in volumes, not the container.', 'পডকে প্রতিস্থাপনযোগ্য ভাবুন: পরিষ্কারভাবে শুরু করুন, রিস্টার্ট সহ্য করুন, ও টেকসই ডেটা কন্টেইনারে নয়, ভলিউমে রাখুন।'),
        ] },
      ],
    },
  ],

  // ── k8s-replicaset · ReplicaSets ──────────────────────────────────────────
  'k8s-replicaset': [
    {
      h: l('What is a ReplicaSet?', 'ReplicaSet কী?'),
      blocks: [
        { p: l('A ReplicaSet is a controller whose one job is to keep a specified number of identical pods running at all times. You tell it "I want 3 replicas of this pod," and it counts the pods that match its selector, then creates or deletes pods until the count is exactly right. If a pod crashes, is deleted, or its node dies, the ReplicaSet notices the shortfall and creates a replacement — this is the self-healing you get from the declarative model.', 'একটি ReplicaSet হলো একটি কন্ট্রোলার যার একমাত্র কাজ হলো সবসময় নির্দিষ্ট সংখ্যক অভিন্ন পড চালু রাখা। আপনি এটিকে বলেন "আমি এই পডের ৩টি রেপ্লিকা চাই," আর এটি তার সিলেক্টরের সঙ্গে মেলা পড গোনে, তারপর সংখ্যা ঠিক না হওয়া পর্যন্ত পড তৈরি বা ডিলিট করে। একটি পড ক্র্যাশ করলে, ডিলিট হলে বা তার নোড মরলে, ReplicaSet ঘাটতি লক্ষ্য করে ও একটি প্রতিস্থাপন তৈরি করে—এটাই ডিক্লারেটিভ মডেল থেকে পাওয়া স্ব-নিরাময়।') },
        { p: l('The problem it solves is availability and scale for stateless pods. A single pod is fragile: if it dies, your app is down until something recreates it, and one pod cannot handle much traffic. A ReplicaSet guarantees N copies are always up, spreading load and surviving individual failures. In practice you almost never create a ReplicaSet directly — you create a Deployment, and it creates and manages ReplicaSets for you — but understanding the ReplicaSet is what makes Deployments make sense.', 'এটি যে সমস্যা সমাধান করে তা হলো স্টেটলেস পডের availability ও স্কেল। একটি একক পড ভঙ্গুর: এটি মরলে কিছু একটি পুনঃতৈরি না করা পর্যন্ত আপনার অ্যাপ ডাউন, আর একটি পড বেশি ট্রাফিক সামলাতে পারে না। একটি ReplicaSet নিশ্চিত করে N কপি সবসময় চালু, লোড ছড়ায় ও একক ব্যর্থতা টেকে। বাস্তবে আপনি প্রায় কখনো সরাসরি একটি ReplicaSet বানান না—আপনি একটি Deployment বানান, আর এটি আপনার জন্য ReplicaSet তৈরি ও পরিচালনা করে—তবে ReplicaSet বোঝাই Deployment-কে অর্থপূর্ণ করে।') },
        { note: l('A ReplicaSet is like a supervisor who ensures exactly five workers are always on the floor: if one leaves, another is called in; if six show up, one is sent home. The supervisor does not care which specific workers — only that the count is right — which is exactly why pods must be interchangeable and stateless.', 'একটি ReplicaSet হলো একজন সুপারভাইজারের মতো যিনি নিশ্চিত করেন সবসময় ঠিক পাঁচজন কর্মী মেঝেতে: একজন গেলে আরেকজনকে ডাকা হয়; ছয়জন এলে একজনকে বাড়ি পাঠানো হয়। সুপারভাইজার নির্দিষ্ট কোন কর্মী তা নিয়ে ভাবেন না—শুধু সংখ্যা ঠিক কিনা—আর এ কারণেই পড বিনিময়যোগ্য ও স্টেটলেস হতে হবে।'), kind: 'tip' },
      ],
    },
    {
      h: l('How it works, step by step', 'কীভাবে কাজ করে, ধাপে ধাপে'),
      blocks: [
        { steps: [
          l('You declare a ReplicaSet with a replica count, a selector, and a pod template describing the pods it should run.', 'আপনি একটি রেপ্লিকা সংখ্যা, একটি সিলেক্টর ও একটি পড টেমপ্লেটসহ একটি ReplicaSet ঘোষণা করেন যা বর্ণনা করে এটি কোন পড চালাবে।'),
          l('The controller lists all pods matching its selector and compares that count to the desired replicas.', 'কন্ট্রোলার তার সিলেক্টরের সঙ্গে মেলা সব পড তালিকা করে ও সেই সংখ্যা কাঙ্ক্ষিত রেপ্লিকার সঙ্গে তুলনা করে।'),
          l('If there are too few, it creates new pods from the template; if too many, it deletes the extras.', 'খুব কম হলে এটি টেমপ্লেট থেকে নতুন পড তৈরি করে; খুব বেশি হলে অতিরিক্তগুলো ডিলিট করে।'),
          l('It keeps watching: whenever a pod disappears (crash, eviction, node failure), the count drops and it recreates one.', 'এটি নজর রাখতে থাকে: যখনই একটি পড হারায় (ক্র্যাশ, উচ্ছেদ, নোড ব্যর্থতা), সংখ্যা কমে ও এটি একটি পুনঃতৈরি করে।'),
          l('The selector must match the template’s labels, or the ReplicaSet cannot recognize the pods it creates and loops.', 'সিলেক্টর টেমপ্লেটের লেবেলের সঙ্গে মিলতে হবে, নইলে ReplicaSet তার তৈরি করা পড চিনতে পারে না ও লুপ করে।'),
        ] },
        { code: `apiVersion: apps/v1
kind: ReplicaSet
metadata:
  name: web
spec:
  replicas: 3
  selector:
    matchLabels:
      app: web
  template:
    metadata:
      labels:
        app: web
    spec:
      containers:
        - name: web
          image: nginx:1.25`, caption: l('A ReplicaSet keeping 3 pods labelled app: web. Note the selector.matchLabels and the template’s labels are identical — they must match, or the ReplicaSet will not manage the pods it creates.', 'app: web লেবেলের ৩টি পড রাখা একটি ReplicaSet। খেয়াল করুন selector.matchLabels ও টেমপ্লেটের labels অভিন্ন—এগুলো মিলতে হবে, নইলে ReplicaSet তার তৈরি করা পড পরিচালনা করবে না।') },
      ],
    },
    {
      h: l('ReplicaSet vs Deployment', 'ReplicaSet বনাম Deployment'),
      blocks: [
        { table: {
          head: [l('Aspect', 'দিক'), l('ReplicaSet', 'ReplicaSet'), l('Deployment', 'Deployment')],
          rows: [
            [l('Keeps N pods running', 'N পড চালু রাখে'), l('Yes — this is its whole job.', 'হ্যাঁ—এটাই এর পুরো কাজ।'), l('Yes, by creating a ReplicaSet.', 'হ্যাঁ, একটি ReplicaSet বানিয়ে।')],
            [l('Rolling updates', 'রোলিং আপডেট'), l('No — it cannot move between versions on its own.', 'না—এটি একা ভার্সনের মধ্যে যেতে পারে না।'), l('Yes — gradual, zero-downtime rollouts.', 'হ্যাঁ—ধীর, জিরো-ডাউনটাইম রোলআউট।')],
            [l('Rollback', 'রোলব্যাক'), l('No history of previous versions.', 'আগের ভার্সনের কোনো ইতিহাস নেই।'), l('Yes — keeps old ReplicaSets to undo.', 'হ্যাঁ—undo করতে পুরনো ReplicaSet রাখে।')],
            [l('You create it directly?', 'সরাসরি বানান?'), l('Rarely — usually managed by a Deployment.', 'কমই—সাধারণত একটি Deployment দ্বারা পরিচালিত।'), l('Yes — this is what you actually write.', 'হ্যাঁ—এটাই আপনি আসলে লেখেন।')],
          ],
        } },
        { note: l('A Deployment is a ReplicaSet plus version management. It creates one ReplicaSet per version and shifts pods from old to new during a rollout, which is why you write Deployments and let them own the ReplicaSets underneath.', 'একটি Deployment হলো একটি ReplicaSet প্লাস ভার্সন ব্যবস্থাপনা। এটি প্রতি ভার্সনে একটি ReplicaSet বানায় ও একটি রোলআউটের সময় পডকে পুরনো থেকে নতুনে সরায়, এ কারণেই আপনি Deployment লেখেন ও তাদের নিচের ReplicaSet-এর মালিক হতে দেন।'), kind: 'tip' },
      ],
    },
    {
      h: l('When and where to use it', 'কখন ও কোথায় ব্যবহার করবেন'),
      blocks: [
        { p: l('In everyday work you should almost always use a Deployment, not a bare ReplicaSet. The Deployment gives you everything a ReplicaSet does — a guaranteed pod count and self-healing — plus rolling updates and rollbacks, which you will need the first time you ship a new image. Creating ReplicaSets by hand means you get the replica guarantee but have to orchestrate version changes yourself, which is precisely the tedious work a Deployment automates.', 'প্রতিদিনের কাজে আপনার প্রায় সবসময় একটি Deployment ব্যবহার করা উচিত, একটি খালি ReplicaSet নয়। Deployment আপনাকে একটি ReplicaSet যা করে সব দেয়—একটি নিশ্চিত পড সংখ্যা ও স্ব-নিরাময়—প্লাস রোলিং আপডেট ও রোলব্যাক, যা আপনার একটি নতুন ইমেজ পাঠানোর প্রথম বারেই দরকার হবে। হাতে ReplicaSet বানানো মানে আপনি রেপ্লিকা গ্যারান্টি পান কিন্তু ভার্সন পরিবর্তন নিজে অর্কেস্ট্রেট করতে হয়, যা ঠিক সেই ক্লান্তিকর কাজ যা একটি Deployment স্বয়ংক্রিয় করে।') },
        { p: l('So where does the ReplicaSet fit? It is the mechanism, not the interface. You should understand it because it explains what a Deployment is doing — when you run kubectl get rs you will see the ReplicaSets a Deployment created, one per revision — and because debugging a stuck rollout often means reading which ReplicaSet has how many pods. Reach for a standalone ReplicaSet only in the rare case where you want a fixed pod count with truly no update strategy at all.', 'তাহলে ReplicaSet কোথায় খাপ খায়? এটি প্রক্রিয়া, ইন্টারফেস নয়। আপনার এটি বোঝা উচিত কারণ এটি ব্যাখ্যা করে একটি Deployment কী করছে—kubectl get rs চালালে আপনি একটি Deployment তৈরি করা ReplicaSet দেখবেন, প্রতি revision-এ একটি—আর কারণ একটি আটকে থাকা রোলআউট ডিবাগ করা প্রায়ই মানে কোন ReplicaSet-এ কতটি পড আছে তা পড়া। একটি স্ট্যান্ডঅ্যালোন ReplicaSet শুধু সেই বিরল ক্ষেত্রে নিন যেখানে আপনি সত্যিই কোনো আপডেট কৌশল ছাড়াই একটি নির্দিষ্ট পড সংখ্যা চান।') },
      ],
    },
    {
      h: l('Common mistakes', 'সাধারণ ভুল'),
      blocks: [
        { list: [
          l('Managing ReplicaSets by hand for updates instead of letting a Deployment orchestrate them — you reinvent rolling updates the hard way.', 'আপডেটে একটি Deployment-কে অর্কেস্ট্রেট করতে না দিয়ে হাতে ReplicaSet সামলানো—আপনি কঠিন উপায়ে রোলিং আপডেট নতুন করে বানান।'),
          l('Expecting a ReplicaSet to roll out a new version; change the template image and it just recreates pods, with no gradual, safe rollout.', 'একটি ReplicaSet একটি নতুন ভার্সন রোল করবে আশা করা; টেমপ্লেট ইমেজ বদলান ও এটি শুধু পড পুনঃতৈরি করে, কোনো ধীর, নিরাপদ রোলআউট ছাড়াই।'),
          l('A selector that does not match the pod template labels, so the ReplicaSet cannot own its pods and keeps creating more.', 'একটি সিলেক্টর যা পড টেমপ্লেট লেবেলের সঙ্গে মেলে না, ফলে ReplicaSet তার পডের মালিক হতে পারে না ও আরও বানাতে থাকে।'),
          l('Using a ReplicaSet for a stateful app; identical, interchangeable pods do not fit databases that need stable identity.', 'একটি স্টেটফুল অ্যাপে ReplicaSet ব্যবহার; অভিন্ন, বিনিময়যোগ্য পড এমন ডেটাবেসে খাপ খায় না যাদের স্থিতিশীল পরিচয় দরকার।'),
          l('Deleting pods owned by a ReplicaSet and being surprised they come back — that is the controller doing its job.', 'একটি ReplicaSet-এর মালিকানাধীন পড ডিলিট করে অবাক হওয়া যে এরা ফিরে আসে—এটি কন্ট্রোলার তার কাজ করছে।'),
        ] },
      ],
    },
    {
      h: l('Remember in one line', 'এক লাইনে মনে রাখুন'),
      blocks: [
        { list: [
          l('A ReplicaSet keeps a fixed number of identical pods running, recreating any that die — self-healing by counting.', 'একটি ReplicaSet নির্দিষ্ট সংখ্যক অভিন্ন পড চালু রাখে, মরে যাওয়াগুলো পুনঃতৈরি করে—গুনে স্ব-নিরাময়।'),
          l('It cannot do rolling updates or rollbacks on its own — that is why a Deployment wraps it.', 'এটি একা রোলিং আপডেট বা রোলব্যাক করতে পারে না—এ কারণেই একটি Deployment একে মোড়ায়।'),
          l('Rarely create one directly; write a Deployment and let it manage the ReplicaSets for you.', 'সরাসরি একটি কমই বানান; একটি Deployment লিখুন ও এটিকে আপনার জন্য ReplicaSet সামলাতে দিন।'),
        ] },
      ],
    },
  ],

  // ── k8s-deployment · Deployments ──────────────────────────────────────────
  'k8s-deployment': [
    {
      h: l('What is a Deployment?', 'Deployment কী?'),
      blocks: [
        { p: l('A Deployment is the controller you use to run and update a stateless application. You declare the desired state — how many replicas and what the pods look like — and the Deployment makes it happen by creating and managing a ReplicaSet underneath. Its real value is version management: when you change the pod template (say, a new image), the Deployment performs a rolling update, gradually replacing old pods with new ones, and keeps the previous ReplicaSet so you can roll back instantly if the new version misbehaves.', 'একটি Deployment হলো সেই কন্ট্রোলার যা আপনি একটি স্টেটলেস অ্যাপ্লিকেশন চালাতে ও আপডেট করতে ব্যবহার করেন। আপনি কাঙ্ক্ষিত অবস্থা ঘোষণা করেন—কতটি রেপ্লিকা ও পড দেখতে কেমন—আর Deployment নিচে একটি ReplicaSet তৈরি ও পরিচালনা করে তা ঘটায়। এর আসল মূল্য হলো ভার্সন ব্যবস্থাপনা: আপনি পড টেমপ্লেট বদলালে (ধরুন, একটি নতুন ইমেজ), Deployment একটি রোলিং আপডেট করে, ধীরে পুরনো পড নতুন দিয়ে বদলায়, ও আগের ReplicaSet রাখে যাতে নতুন ভার্সন খারাপ আচরণ করলে আপনি তাৎক্ষণিক রোলব্যাক করতে পারেন।') },
        { p: l('The problem it solves is deploying changes without downtime or risk. Updating an app by hand — stop the old pods, start the new ones — causes an outage and has no easy undo. A Deployment turns "ship a new version" into a safe, declarative operation: edit the image and re-apply, and Kubernetes rolls the change out one slice at a time, keeps the app serving throughout, and remembers how to reverse it. This is the object you write for almost every ordinary web service or API.', 'এটি যে সমস্যা সমাধান করে তা হলো ডাউনটাইম বা ঝুঁকি ছাড়া পরিবর্তন ডিপ্লয় করা। হাতে একটি অ্যাপ আপডেট করা—পুরনো পড থামান, নতুনগুলো চালু করুন—একটি আউটেজ ঘটায় ও সহজ undo নেই। একটি Deployment "একটি নতুন ভার্সন পাঠাও"-কে একটি নিরাপদ, ডিক্লারেটিভ অপারেশনে বদলায়: ইমেজ এডিট করে পুনরায় apply করুন, আর কুবারনেটিস একবারে একটি স্লাইস করে পরিবর্তন রোল করে, পুরো সময় অ্যাপ চালু রাখে, ও কীভাবে উল্টাতে হয় মনে রাখে। প্রায় প্রতিটি সাধারণ ওয়েব সার্ভিস বা API-এর জন্য এটাই সেই অবজেক্ট যা আপনি লেখেন।') },
        { note: l('Think of a project manager who swaps the team to a new plan gradually, keeping the work going the whole time, and can revert to the old plan if the new one fails. The manager never stops all work at once — that is the zero-downtime rolling update — and always keeps the previous plan on file for an instant rollback.', 'একজন প্রজেক্ট ম্যানেজার ভাবুন যিনি দলকে ধীরে একটি নতুন পরিকল্পনায় বদলান, পুরো সময় কাজ চালু রাখেন, ও নতুনটি ব্যর্থ হলে পুরনো পরিকল্পনায় ফিরতে পারেন। ম্যানেজার কখনো একসঙ্গে সব কাজ থামান না—এটাই জিরো-ডাউনটাইম রোলিং আপডেট—আর সবসময় একটি তাৎক্ষণিক রোলব্যাকের জন্য আগের পরিকল্পনা ফাইলে রাখেন।'), kind: 'tip' },
      ],
    },
    {
      h: l('How it works, step by step', 'কীভাবে কাজ করে, ধাপে ধাপে'),
      blocks: [
        { steps: [
          l('You write a Deployment with spec.replicas, a selector, and a pod template, then kubectl apply -f it.', 'আপনি spec.replicas, একটি সিলেক্টর ও একটি পড টেমপ্লেটসহ একটি Deployment লেখেন, তারপর kubectl apply -f করেন।'),
          l('The Deployment creates a ReplicaSet, which creates the pods; your app is now running at the desired replica count.', 'Deployment একটি ReplicaSet তৈরি করে, যা পড তৈরি করে; আপনার অ্যাপ এখন কাঙ্ক্ষিত রেপ্লিকা সংখ্যায় চলছে।'),
          l('To update, you change the pod template (usually the image) and re-apply, or run kubectl set image.', 'আপডেট করতে আপনি পড টেমপ্লেট (সাধারণত ইমেজ) বদলে পুনরায় apply করেন, বা kubectl set image চালান।'),
          l('The Deployment creates a new ReplicaSet and shifts pods over gradually — new ones up, old ones down — keeping the app available.', 'Deployment একটি নতুন ReplicaSet তৈরি করে ও ধীরে পড সরায়—নতুনগুলো ওঠে, পুরনোগুলো নামে—অ্যাপ সচল রেখে।'),
          l('The old ReplicaSet is kept (scaled to zero) so kubectl rollout undo can flip back to it instantly if needed.', 'পুরনো ReplicaSet রাখা হয় (শূন্যে স্কেল) যাতে দরকারে kubectl rollout undo তাৎক্ষণিক এতে ফিরতে পারে।'),
        ] },
        { code: `apiVersion: apps/v1
kind: Deployment
metadata:
  name: web
spec:
  replicas: 3
  selector:
    matchLabels:
      app: web
  template:
    metadata:
      labels:
        app: web
    spec:
      containers:
        - name: web
          image: nginx:1.25`, caption: l('A Deployment running three replicas of nginx. Changing image to nginx:1.26 and re-applying triggers a rolling update; the previous ReplicaSet is retained for an instant rollback.', 'nginx-এর তিন রেপ্লিকা চালানো একটি Deployment। image nginx:1.26-এ বদলে পুনরায় apply করলে একটি রোলিং আপডেট শুরু হয়; আগের ReplicaSet একটি তাৎক্ষণিক রোলব্যাকের জন্য রাখা হয়।') },
        { note: l('The selector must match the pod template’s labels. spec.selector.matchLabels (app: web) and template.metadata.labels (app: web) have to be identical, or the Deployment manages zero pods — and unlike other fields, the selector is immutable after creation.', 'সিলেক্টর পড টেমপ্লেটের লেবেলের সঙ্গে মিলতে হবে। spec.selector.matchLabels (app: web) ও template.metadata.labels (app: web) অভিন্ন হতে হবে, নইলে Deployment শূন্য পড সামলায়—আর অন্য ফিল্ডের বিপরীতে, তৈরির পর সিলেক্টর অপরিবর্তনীয়।'), kind: 'warn' },
      ],
    },
    {
      h: l('Key commands', 'মূল কমান্ড'),
      blocks: [
        { table: {
          head: [l('Goal', 'লক্ষ্য'), l('Command', 'কমান্ড')],
          rows: [
            [l('Create a deployment', 'ডিপ্লয়মেন্ট তৈরি'), l('kubectl create deploy web --image=nginx', 'kubectl create deploy web --image=nginx')],
            [l('List deployments', 'ডিপ্লয়মেন্ট তালিকা'), l('kubectl get deploy', 'kubectl get deploy')],
            [l('Scale it', 'স্কেল'), l('kubectl scale deploy web --replicas=3', 'kubectl scale deploy web --replicas=3')],
            [l('Apply a manifest', 'ম্যানিফেস্ট অ্যাপ্লাই'), l('kubectl apply -f deploy.yaml', 'kubectl apply -f deploy.yaml')],
          ],
        } },
        { note: l('kubectl create deploy is handy for a quick start, but for anything real, write a YAML manifest and use kubectl apply -f so the desired state lives in git, not just in your shell history.', 'kubectl create deploy দ্রুত শুরুতে সুবিধাজনক, তবে বাস্তব কিছুর জন্য একটি YAML ম্যানিফেস্ট লিখে kubectl apply -f ব্যবহার করুন যাতে কাঙ্ক্ষিত অবস্থা শুধু আপনার শেল ইতিহাসে নয়, git-এ থাকে।'), kind: 'tip' },
      ],
    },
    {
      h: l('When and where to use it', 'কখন ও কোথায় ব্যবহার করবেন'),
      blocks: [
        { p: l('Use a Deployment for any stateless workload — web servers, APIs, workers, most microservices — where the pods are interchangeable and can be created or destroyed in any order. This covers the large majority of what people run on Kubernetes. Define the replica count and pod template once, keep the manifest in git, and every future change (a new image, more replicas, a tweaked env var) is just an edit-and-apply that rolls out safely. It is the default, go-to controller you should reach for first.', 'যেকোনো স্টেটলেস ওয়ার্কলোডে একটি Deployment ব্যবহার করুন—ওয়েব সার্ভার, API, worker, বেশিরভাগ মাইক্রোসার্ভিস—যেখানে পড বিনিময়যোগ্য ও যেকোনো ক্রমে তৈরি বা ধ্বংস করা যায়। এটি মানুষ কুবারনেটিসে যা চালায় তার বড় সংখ্যাগরিষ্ঠ ঢাকে। রেপ্লিকা সংখ্যা ও পড টেমপ্লেট একবার সংজ্ঞায়িত করুন, ম্যানিফেস্ট git-এ রাখুন, আর প্রতিটি ভবিষ্যৎ পরিবর্তন (একটি নতুন ইমেজ, বেশি রেপ্লিকা, একটি টুইক করা env ভ্যার) শুধু একটি edit-and-apply যা নিরাপদে রোল করে। এটি ডিফল্ট, প্রথমে নেওয়ার কন্ট্রোলার।') },
        { p: l('Do not use a Deployment for stateful, identity-bound workloads. A database, a message broker, or any app whose pods need stable network names and their own persistent storage does not fit the "interchangeable pods" model — those belong in a StatefulSet, which gives each pod a stable identity and volume. Likewise, a per-node agent belongs in a DaemonSet and a run-to-completion task in a Job. Reach for a Deployment when the pods are truly stateless clones; reach for a different controller when they are not.', 'স্টেটফুল, পরিচয়-বদ্ধ ওয়ার্কলোডে একটি Deployment ব্যবহার করবেন না। একটি ডেটাবেস, একটি মেসেজ ব্রোকার, বা এমন যেকোনো অ্যাপ যার পডের স্থিতিশীল নেটওয়ার্ক নাম ও নিজের স্থায়ী স্টোরেজ দরকার তা "বিনিময়যোগ্য পড" মডেলে খাপ খায় না—এগুলো একটি StatefulSet-এ থাকে, যা প্রতিটি পডকে একটি স্থিতিশীল পরিচয় ও ভলিউম দেয়। একইভাবে, একটি প্রতি-নোড এজেন্ট একটি DaemonSet-এ ও একটি run-to-completion কাজ একটি Job-এ থাকে। পড সত্যিই স্টেটলেস ক্লোন হলে Deployment নিন; না হলে একটি ভিন্ন কন্ট্রোলার নিন।') },
      ],
    },
    {
      h: l('Common mistakes', 'সাধারণ ভুল'),
      blocks: [
        { list: [
          l('Using a Deployment for a database that needs stable identity and storage, where a StatefulSet fits — you get data loss and race conditions.', 'একটি ডেটাবেসে Deployment ব্যবহার যা স্থিতিশীল পরিচয় ও স্টোরেজ চায়, যেখানে StatefulSet মানানসই—আপনি ডেটা হারান ও রেস কন্ডিশন পান।'),
          l('A selector that does not match the pod template labels, so the Deployment manages zero pods and nothing runs.', 'একটি সিলেক্টর যা পড টেমপ্লেট লেবেলের সঙ্গে মেলে না, ফলে Deployment শূন্য পড সামলায় ও কিছুই চলে না।'),
          l('Rolling out an image change that is not backward compatible, breaking clients while both versions run at once during the roll.', 'ব্যাকওয়ার্ড-সামঞ্জস্যহীন একটি ইমেজ পরিবর্তন রোল করা, রোলের সময় দুই ভার্সন একসঙ্গে চলাকালে ক্লায়েন্ট ভাঙা।'),
          l('Making imperative kubectl edit or set image changes and never reflecting them back into the YAML in git, so the next apply reverts them.', 'ইম্পারেটিভ kubectl edit বা set image পরিবর্তন করা ও কখনো git-এর YAML-এ তা না ফেরানো, ফলে পরের apply সেগুলো ফিরিয়ে দেয়।'),
          l('Deploying without readiness probes, so the rollout sends traffic to pods that are up but not yet ready to serve.', 'readiness প্রোব ছাড়া ডিপ্লয় করা, ফলে রোলআউট এমন পডে ট্রাফিক পাঠায় যেগুলো চালু কিন্তু এখনো পরিবেশনের জন্য প্রস্তুত নয়।'),
        ] },
      ],
    },
    {
      h: l('Remember in one line', 'এক লাইনে মনে রাখুন'),
      blocks: [
        { list: [
          l('A Deployment runs and updates a stateless app by managing ReplicaSets, giving rolling updates and instant rollbacks.', 'একটি Deployment ReplicaSet পরিচালনা করে একটি স্টেটলেস অ্যাপ চালায় ও আপডেট করে, রোলিং আপডেট ও তাৎক্ষণিক রোলব্যাক দিয়ে।'),
          l('The selector must match the pod template labels, or it manages zero pods — and the selector is immutable after creation.', 'সিলেক্টর পড টেমপ্লেট লেবেলের সঙ্গে মিলতে হবে, নইলে এটি শূন্য পড সামলায়—আর তৈরির পর সিলেক্টর অপরিবর্তনীয়।'),
          l('It is the default for stateless workloads; use a StatefulSet, DaemonSet, or Job when pods are not interchangeable clones.', 'এটি স্টেটলেস ওয়ার্কলোডের ডিফল্ট; পড বিনিময়যোগ্য ক্লোন না হলে একটি StatefulSet, DaemonSet বা Job নিন।'),
        ] },
      ],
    },
  ],
}
