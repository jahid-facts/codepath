// Deep, bilingual (English / Bangla) teaching guides for Kubernetes configuration
// and storage topics. Shape mirrors app/course-guides.js and app/guides/git/f.js:
// each guide is an array of sections { h, blocks }, rendered by GuideBlock in
// app/LearningApp.js. Facts, YAML, and kubectl commands are drawn from the
// rawTopics + commands + examples in app/courses/kubernetes.js. In { code } blocks
// the YAML is written literally; there is never a dollar sign followed by an
// opening curly brace.

const l = (en, bn) => ({ en, bn })

export default {
  // ── k8s-secret · Secrets ──────────────────────────────────────────────────
  'k8s-secret': [
    {
      h: l('What is a Secret?', 'Secret কী?'),
      blocks: [
        { p: l('A Secret is a Kubernetes object that holds a small piece of sensitive data — a database password, an API token, a TLS private key — and hands it to your pods at runtime, kept deliberately separate from ordinary configuration. It is the sibling of a ConfigMap: a ConfigMap carries non-secret settings like a log level, while a Secret carries the things you would never want printed in a log or pasted into a chat. Your application code stays the same across every environment; only the Secret it reads changes.', 'Secret হলো একটি Kubernetes অবজেক্ট যা একটি ছোট স্পর্শকাতর ডেটা রাখে—একটি ডেটাবেস পাসওয়ার্ড, একটি API টোকেন, একটি TLS প্রাইভেট কী—এবং রানটাইমে তা আপনার পডে দেয়, সাধারণ কনফিগারেশন থেকে ইচ্ছাকৃতভাবে আলাদা রাখা। এটি ConfigMap-এর সহোদর: ConfigMap লগ লেভেলের মতো নন-সিক্রেট সেটিং বহন করে, আর Secret সেই জিনিস বহন করে যা আপনি কখনো লগে ছাপা বা চ্যাটে পেস্ট করতে চাইবেন না। আপনার অ্যাপ্লিকেশন কোড প্রতিটি এনভায়রনমেন্টে একই থাকে; শুধু এটি যে Secret পড়ে সেটি বদলায়।') },
        { p: l('The problem a Secret solves is keeping credentials out of two dangerous places: your container image and your source code. If you bake a password into the image, anyone who can pull the image has the password, and rotating it means rebuilding and redeploying. If you commit it to git, it lives forever in the history even after you delete it. A Secret lets the same image run in dev, staging, and production, each fed a different credential that lives in the cluster, not in your repository.', 'Secret যে সমস্যা সমাধান করে তা হলো ক্রেডেনশিয়ালকে দুটি বিপজ্জনক জায়গা থেকে দূরে রাখা: আপনার container image ও আপনার সোর্স কোড। যদি আপনি image-এ একটি পাসওয়ার্ড বেক করেন, image টানতে পারা যে কারো কাছে পাসওয়ার্ড থাকে, আর তা রোটেট করা মানে রিবিল্ড ও রিডিপ্লয়। যদি git-এ কমিট করেন, মুছে ফেলার পরও তা ইতিহাসে চিরকাল থাকে। Secret একই image-কে dev, staging ও production-এ চালাতে দেয়, প্রতিটিকে একটি ভিন্ন ক্রেডেনশিয়াল খাওয়ানো হয় যা ক্লাস্টারে থাকে, আপনার repository-তে নয়।') },
        { note: l('Think of a Secret as a locked drawer for valuables, handed to the app only when it needs them. The receptionist (kubectl) can put things in the drawer, but only the specific pod you authorised gets to open it — and it opens it privately, at the moment of use, not in the doorway where everyone can see.', 'Secret-কে মূল্যবান জিনিসের জন্য একটি তালাবদ্ধ ড্রয়ার ভাবুন, শুধু দরকারে অ্যাপকে দেওয়া হয়। রিসেপশনিস্ট (kubectl) ড্রয়ারে জিনিস রাখতে পারে, কিন্তু শুধু আপনার অনুমোদিত নির্দিষ্ট পডই তা খুলতে পারে—আর সে তা ব্যক্তিগতভাবে খোলে, ব্যবহারের মুহূর্তে, দরজায় নয় যেখানে সবাই দেখে।'), kind: 'tip' },
      ],
    },
    {
      h: l('How a Secret reaches your pod, step by step', 'একটি Secret কীভাবে আপনার পডে পৌঁছায়, ধাপে ধাপে'),
      blocks: [
        { steps: [
          l('You create the Secret once — from a literal on the command line, from a file, or from a YAML manifest. Kubernetes stores it in the cluster, scoped to a namespace.', 'আপনি একবার Secret তৈরি করেন—কমান্ড লাইনে একটি literal থেকে, একটি ফাইল থেকে, বা একটি YAML manifest থেকে। Kubernetes এটি ক্লাস্টারে সংরক্ষণ করে, একটি namespace-এ স্কোপ করা।'),
          l('In your pod (or Deployment) spec you reference the Secret by name and by the key inside it — you never paste the raw value into the pod spec.', 'আপনার পড (বা Deployment) spec-এ আপনি Secret-কে তার নাম ও ভেতরের key দিয়ে রেফার করেন—কাঁচা মানটি পড spec-এ কখনো পেস্ট করেন না।'),
          l('When the pod is scheduled, the kubelet fetches the Secret and injects the value — either as an environment variable, or as a file inside a mounted volume.', 'পড schedule হলে kubelet Secret আনে ও মানটি inject করে—হয় একটি environment variable হিসেবে, নয়তো একটি মাউন্টেড volume-এর ভেতরে একটি ফাইল হিসেবে।'),
          l('Your application reads the env var or file exactly as it would any other config, unaware of where it came from. The credential exists only in the running container’s memory or a tmpfs mount.', 'আপনার অ্যাপ্লিকেশন env var বা ফাইলটি অন্য যেকোনো config-এর মতোই পড়ে, কোথা থেকে এলো তা না জেনে। ক্রেডেনশিয়ালটি শুধু চলমান container-এর মেমরিতে বা একটি tmpfs mount-এ থাকে।'),
          l('To rotate the credential you update the Secret and restart (or roll) the pods — the image never changes.', 'ক্রেডেনশিয়াল রোটেট করতে আপনি Secret আপডেট করেন ও পড রিস্টার্ট (বা roll) করেন—image কখনো বদলায় না।'),
        ] },
        { code: `env:
  - name: DB_PASSWORD
    valueFrom:
      secretKeyRef:
        name: db
        key: pw`, caption: l('The container gets a DB_PASSWORD environment variable whose value is read from key "pw" of the Secret named "db". The password itself never appears in this manifest — only a reference to it does.', 'container একটি DB_PASSWORD environment variable পায় যার মান "db" নামের Secret-এর "pw" key থেকে পড়া হয়। পাসওয়ার্ডটি নিজে এই manifest-এ কখনো দেখা যায় না—শুধু তার একটি রেফারেন্স দেখা যায়।') },
      ],
    },
    {
      h: l('base64 is encoding, not encryption', 'base64 এনকোডিং, এনক্রিপশন নয়'),
      blocks: [
        { p: l('When you look at a Secret with kubectl, the values appear as base64 strings, and this fools many newcomers into thinking they are protected. They are not. base64 is a reversible encoding whose only purpose is to let arbitrary bytes (including binary keys) travel safely as text — anyone can decode it instantly with a single command. A Secret is only "secret" because of who is allowed to read the object, not because the value is scrambled.', 'যখন আপনি kubectl দিয়ে একটি Secret দেখেন, মানগুলো base64 string হিসেবে দেখায়, আর এটি অনেক নতুন লোককে ভাবায় যে এগুলো সুরক্ষিত। এগুলো নয়। base64 একটি উল্টানো-যায় এমন এনকোডিং যার একমাত্র উদ্দেশ্য যেকোনো বাইট (বাইনারি কী সহ) টেক্সট হিসেবে নিরাপদে চলতে দেওয়া—যে কেউ একটি কমান্ডেই তা সঙ্গে সঙ্গে ডিকোড করতে পারে। একটি Secret শুধু এ কারণেই "secret" যে কে অবজেক্টটি পড়তে পারবে, মানটি এলোমেলো বলে নয়।') },
        { p: l('Real protection comes from three other things you must add: RBAC that limits who and what can read Secrets, encryption at rest so the etcd datastore does not hold the values in plain text on disk, and never committing Secret manifests to version control. Treat base64 as packaging tape, not a lock.', 'আসল সুরক্ষা আসে অন্য তিনটি জিনিস থেকে যা আপনাকে যোগ করতে হয়: RBAC যা কে ও কী Secret পড়তে পারবে সীমিত করে, encryption at rest যাতে etcd datastore মানগুলো ডিস্কে সাধারণ টেক্সটে না রাখে, এবং Secret manifest কখনো version control-এ কমিট না করা। base64-কে প্যাকেজিং টেপ ভাবুন, তালা নয়।') },
        { note: l('base64 is NOT encryption. "kubectl get secret db -o yaml" plus one "base64 --decode" reveals the password to anyone with read access. Restrict access with RBAC, enable encryption at rest for etcd, and keep Secret YAML out of git.', 'base64 এনক্রিপশন নয়। "kubectl get secret db -o yaml" আর একটি "base64 --decode" পড়ার অ্যাক্সেস আছে এমন যে কারো কাছে পাসওয়ার্ড ফাঁস করে। RBAC দিয়ে অ্যাক্সেস সীমিত করুন, etcd-তে encryption at rest চালু করুন, ও Secret YAML git থেকে দূরে রাখুন।'), kind: 'warn' },
      ],
    },
    {
      h: l('Key commands', 'মূল কমান্ড'),
      blocks: [
        { table: {
          head: [l('Goal', 'লক্ষ্য'), l('Command', 'কমান্ড')],
          rows: [
            [l('Create a Secret from a literal', 'literal থেকে Secret তৈরি'), l('kubectl create secret generic db --from-literal=pw=secret', 'kubectl create secret generic db --from-literal=pw=secret')],
            [l('List Secrets', 'Secret তালিকা'), l('kubectl get secrets', 'kubectl get secrets')],
            [l('View a Secret’s metadata', 'একটি Secret-এর metadata দেখুন'), l('kubectl describe secret db', 'kubectl describe secret db')],
            [l('Apply a Secret manifest', 'একটি Secret manifest অ্যাপ্লাই'), l('kubectl apply -f secret.yaml', 'kubectl apply -f secret.yaml')],
          ],
        } },
        { note: l('kubectl describe deliberately hides the values and shows only the key names and sizes — that is a feature, not a bug. Use create with --from-literal or --from-file so the raw value is typed once and never stored in a tracked file.', 'kubectl describe ইচ্ছাকৃতভাবে মান লুকায় ও শুধু key নাম ও সাইজ দেখায়—এটি একটি ফিচার, বাগ নয়। create-এ --from-literal বা --from-file ব্যবহার করুন যাতে কাঁচা মান একবার টাইপ হয় ও কোনো ট্র্যাক-করা ফাইলে কখনো সংরক্ষিত না হয়।'), kind: 'tip' },
      ],
    },
    {
      h: l('When and where to use Secrets', 'কখন ও কোথায় Secret ব্যবহার করবেন'),
      blocks: [
        { p: l('Reach for a Secret for anything that would cause harm if it leaked: database and cache passwords, third-party API keys, OAuth client secrets, TLS certificates and private keys, SSH keys, and image-registry pull credentials. Whenever you are about to type a credential into a ConfigMap or a plain env value, stop — that is exactly the case a Secret exists for. Prefer referencing a Secret as a mounted file over an env var for large or highly sensitive values, because env vars are easier to leak accidentally (they show up in "kubectl describe pod", child processes inherit them, and crash dumps can capture them).', 'যা ফাঁস হলে ক্ষতি হবে তার জন্য Secret নিন: ডেটাবেস ও cache পাসওয়ার্ড, থার্ড-পার্টি API কী, OAuth client secret, TLS সার্টিফিকেট ও প্রাইভেট কী, SSH কী, ও image-registry pull ক্রেডেনশিয়াল। যখনই একটি ConfigMap বা একটি সাধারণ env মানে একটি ক্রেডেনশিয়াল টাইপ করতে যাচ্ছেন, থামুন—Secret ঠিক সেই ক্ষেত্রের জন্যই আছে। বড় বা অতি-স্পর্শকাতর মানে env var-এর চেয়ে একটি মাউন্টেড ফাইল হিসেবে Secret রেফার করা ভালো, কারণ env var দুর্ঘটনাবশত ফাঁস করা সহজ (এগুলো "kubectl describe pod"-এ দেখায়, child process এগুলো inherit করে, ও crash dump এগুলো ধরতে পারে)।') },
        { p: l('For teams that need stronger guarantees, the built-in Secret is the floor, not the ceiling. Beyond it sit tools like external secret managers (Vault, cloud KMS-backed stores) and encryption-at-rest configuration, which keep the value encrypted until the moment a pod needs it. Start with native Secrets and RBAC, and graduate to an external manager when compliance or scale demands it.', 'যেসব টিমের শক্ত গ্যারান্টি দরকার, তাদের জন্য বিল্ট-ইন Secret হলো মেঝে, ছাদ নয়। এর বাইরে আছে external secret manager (Vault, cloud KMS-ভিত্তিক store) ও encryption-at-rest কনফিগারেশনের মতো টুল, যা একটি পডের দরকার পড়ার মুহূর্ত পর্যন্ত মানটি এনক্রিপ্টেড রাখে। native Secret ও RBAC দিয়ে শুরু করুন, আর compliance বা scale চাইলে একটি external manager-এ উন্নীত হোন।') },
      ],
    },
    {
      h: l('Common mistakes', 'সাধারণ ভুল'),
      blocks: [
        { list: [
          l('Assuming base64 is encryption — it is trivially reversible, so a Secret only protects data through access control, not the encoding.', 'base64-কে এনক্রিপশন ভাবা—এটি সহজেই উল্টানো যায়, তাই একটি Secret শুধু অ্যাক্সেস কন্ট্রোল দিয়ে ডেটা রক্ষা করে, এনকোডিং দিয়ে নয়।'),
          l('Committing Secret manifests to git, leaking the credentials into history where they live forever even after deletion.', 'Secret manifest git-এ কমিট করা, ক্রেডেনশিয়াল ইতিহাসে ফাঁস যেখানে মুছে ফেলার পরও তা চিরকাল থাকে।'),
          l('Putting passwords in a ConfigMap instead of a Secret, so they sit in plain text for anyone with read access.', 'পাসওয়ার্ড Secret-এর বদলে একটি ConfigMap-এ রাখা, ফলে পড়ার অ্যাক্সেস আছে এমন যে কারো জন্য সেগুলো সাধারণ টেক্সটে বসে থাকে।'),
          l('Granting broad RBAC so every service account can read every Secret, defeating the point of separating them.', 'বিস্তৃত RBAC দেওয়া যাতে প্রতিটি service account প্রতিটি Secret পড়তে পারে, এদের আলাদা রাখার উদ্দেশ্যই নষ্ট করে।'),
          l('Forgetting to roll the pods after updating a Secret consumed as an env var — env values are read only once, at container start.', 'env var হিসেবে ব্যবহৃত একটি Secret আপডেটের পর পড roll করতে ভুলে যাওয়া—env মান শুধু একবার, container শুরুতে পড়া হয়।'),
        ] },
      ],
    },
    {
      h: l('Remember in one line', 'এক লাইনে মনে রাখুন'),
      blocks: [
        { list: [
          l('A Secret holds sensitive data and injects it into pods as an env var or mounted file, keeping credentials out of your image and git.', 'একটি Secret স্পর্শকাতর ডেটা রাখে ও পডে একটি env var বা মাউন্টেড ফাইল হিসেবে inject করে, ক্রেডেনশিয়ালকে image ও git থেকে দূরে রাখে।'),
          l('Reference it with secretKeyRef by name and key — the raw value never appears in the pod manifest.', 'secretKeyRef দিয়ে নাম ও key ধরে রেফার করুন—কাঁচা মান পড manifest-এ কখনো দেখা যায় না।'),
          l('base64 is encoding, not encryption: real safety comes from RBAC, encryption at rest, and keeping Secret YAML out of version control.', 'base64 এনকোডিং, এনক্রিপশন নয়: আসল নিরাপত্তা আসে RBAC, encryption at rest, ও Secret YAML version control থেকে দূরে রাখা থেকে।'),
        ] },
      ],
    },
  ],

  // ── k8s-env · Config injection ────────────────────────────────────────────
  'k8s-env': [
    {
      h: l('What is config injection?', 'কনফিগ ইনজেকশন কী?'),
      blocks: [
        { p: l('Config injection is how a pod receives its settings from outside the container image, at the moment it runs. A container is a frozen, immutable package — the same bytes everywhere — yet the same image must behave differently in development, staging, and production: a different database URL, a different log level, a different feature flag. Kubernetes solves this by feeding configuration into the container from the cluster, either as environment variables or as files mounted into the filesystem.', 'কনফিগ ইনজেকশন হলো একটি পড কীভাবে container image-এর বাইরে থেকে, চলার মুহূর্তে তার সেটিং পায়। একটি container একটি জমাট, অপরিবর্তনীয় প্যাকেজ—সর্বত্র একই বাইট—তবু একই image-কে development, staging ও production-এ ভিন্নভাবে আচরণ করতে হয়: একটি ভিন্ন ডেটাবেস URL, একটি ভিন্ন লগ লেভেল, একটি ভিন্ন feature flag। Kubernetes এটি সমাধান করে ক্লাস্টার থেকে container-এ কনফিগারেশন খাইয়ে, হয় environment variable হিসেবে নয়তো filesystem-এ মাউন্ট করা ফাইল হিসেবে।') },
        { p: l('The value can come from three sources: a literal typed directly into the pod spec, a ConfigMap (for non-secret settings), or a Secret (for sensitive ones). The application code reads an env var or opens a file exactly as it always would, with no idea that Kubernetes supplied the value. This is the practical payoff of "build once, run anywhere" — one image, many environments, no rebuilds.', 'মানটি তিনটি উৎস থেকে আসতে পারে: পড spec-এ সরাসরি টাইপ করা একটি literal, একটি ConfigMap (নন-সিক্রেট সেটিংয়ের জন্য), বা একটি Secret (স্পর্শকাতরগুলোর জন্য)। অ্যাপ্লিকেশন কোড একটি env var পড়ে বা একটি ফাইল খোলে ঠিক যেমন সবসময় করত, Kubernetes যে মানটি দিয়েছে তা না জেনে। এটিই "একবার বিল্ড করো, যেকোনো জায়গায় চালাও"-এর ব্যবহারিক লাভ—এক image, বহু এনভায়রনমেন্ট, কোনো রিবিল্ড নেই।') },
        { note: l('Picture a machine with dials and a slot for a settings card. The machine (your image) is identical in every factory; you turn the dials (env vars) and slide in the right card (a ConfigMap or Secret) to make the same appliance behave correctly at each site.', 'ডায়াল ও একটি সেটিংস কার্ডের স্লটসহ একটি মেশিন ভাবুন। মেশিনটি (আপনার image) প্রতিটি কারখানায় একই; আপনি ডায়াল ঘোরান (env var) ও সঠিক কার্ড ঢোকান (একটি ConfigMap বা Secret) যাতে একই যন্ত্র প্রতিটি সাইটে সঠিকভাবে আচরণ করে।'), kind: 'tip' },
      ],
    },
    {
      h: l('How config injection works, step by step', 'কনফিগ ইনজেকশন কীভাবে কাজ করে, ধাপে ধাপে'),
      blocks: [
        { steps: [
          l('You store settings outside the image: literals in the pod spec, non-secret data in a ConfigMap, secret data in a Secret.', 'আপনি সেটিং image-এর বাইরে রাখেন: পড spec-এ literal, ConfigMap-এ নন-সিক্রেট ডেটা, Secret-এ সিক্রেট ডেটা।'),
          l('In the container spec you declare how each value arrives — one env var at a time with env, a whole source at once with envFrom, or a file via a mounted volume.', 'container spec-এ আপনি ঘোষণা করেন প্রতিটি মান কীভাবে আসে—env দিয়ে একবারে একটি env var, envFrom দিয়ে একবারে পুরো একটি উৎস, বা একটি মাউন্টেড volume দিয়ে একটি ফাইল।'),
          l('When the pod starts, the kubelet resolves each reference, reads the current value from the ConfigMap or Secret, and sets it in the container.', 'পড শুরু হলে kubelet প্রতিটি রেফারেন্স রিজলভ করে, ConfigMap বা Secret থেকে বর্তমান মান পড়ে, ও container-এ সেট করে।'),
          l('Env vars are read once at container start, so changing a ConfigMap does not update a running pod’s env — you roll the pods to pick up new values. Mounted files, by contrast, are updated in place over time.', 'env var container শুরুতে একবার পড়া হয়, তাই একটি ConfigMap বদলালে একটি চলমান পডের env আপডেট হয় না—নতুন মান নিতে পড roll করেন। বিপরীতে, মাউন্টেড ফাইল সময়ের সঙ্গে জায়গায় আপডেট হয়।'),
          l('The app reads the env var or file and configures itself — the same image now runs correctly in this environment.', 'অ্যাপ env var বা ফাইলটি পড়ে ও নিজেকে কনফিগার করে—একই image এখন এই এনভায়রনমেন্টে সঠিকভাবে চলে।'),
        ] },
        { code: `env:
  - name: LOG_LEVEL
    valueFrom:
      configMapKeyRef:
        name: app-config
        key: LOG_LEVEL
  - name: DB_PASSWORD
    valueFrom:
      secretKeyRef:
        name: db
        key: pw
envFrom:
  - configMapRef:
      name: app-config`, caption: l('Two styles side by side: env picks single keys (LOG_LEVEL from a ConfigMap, DB_PASSWORD from a Secret), while envFrom imports every key of app-config at once as environment variables.', 'পাশাপাশি দুটি ধরন: env একক key নেয় (ConfigMap থেকে LOG_LEVEL, Secret থেকে DB_PASSWORD), আর envFrom app-config-এর প্রতিটি key একবারে environment variable হিসেবে import করে।') },
      ],
    },
    {
      h: l('Four ways to inject config, compared', 'কনফিগ inject করার চার উপায়, তুলনা'),
      blocks: [
        { table: {
          head: [l('Method', 'পদ্ধতি'), l('What it does', 'যা করে'), l('Best for', 'কার জন্য')],
          rows: [
            [l('env with a literal value', 'literal মানসহ env'), l('Hard-codes one value directly in the pod spec.', 'পড spec-এ সরাসরি একটি মান হার্ড-কোড করে।'), l('Trivial, non-secret constants that rarely change.', 'তুচ্ছ, নন-সিক্রেট ধ্রুবক যা কমই বদলায়।')],
            [l('env with valueFrom', 'valueFrom সহ env'), l('Pulls one named key from a ConfigMap or Secret.', 'একটি ConfigMap বা Secret থেকে একটি নামযুক্ত key টানে।'), l('Picking a few specific settings, renaming keys.', 'কয়েকটি নির্দিষ্ট সেটিং বাছা, key নাম বদলানো।')],
            [l('envFrom', 'envFrom'), l('Imports every key of a ConfigMap/Secret as env vars.', 'একটি ConfigMap/Secret-এর প্রতিটি key env var হিসেবে import করে।'), l('Many related settings you want in bulk.', 'একগুচ্ছ সম্পর্কিত সেটিং যা একসঙ্গে চান।')],
            [l('Mounted volume', 'মাউন্টেড volume'), l('Presents the data as files on disk in the container.', 'ডেটাকে container-এ ডিস্কের ফাইল হিসেবে দেখায়।'), l('Apps that expect a config file; large or updatable data.', 'যে অ্যাপ একটি config ফাইল প্রত্যাশা করে; বড় বা আপডেটযোগ্য ডেটা।')],
          ],
        } },
      ],
    },
    {
      h: l('When and where to use each', 'কখন ও কোথায় কোনটি ব্যবহার করবেন'),
      blocks: [
        { p: l('Use environment variables for small, flat settings — a log level, a hostname, a feature flag — because almost every language reads env vars trivially and they are visible at a glance. Use envFrom when a component has a whole cluster of related knobs and you would rather not list them one by one. Reach for a mounted volume when the application expects an actual configuration file (an nginx.conf, a JSON or YAML config, a certificate), when the value is large, or when you want updates to reach the pod without a restart, since mounted ConfigMap and Secret files are refreshed over time while env vars are frozen at start.', 'ছোট, সমতল সেটিংয়ের জন্য environment variable নিন—একটি লগ লেভেল, একটি hostname, একটি feature flag—কারণ প্রায় প্রতিটি ভাষা env var সহজে পড়ে ও এগুলো এক নজরে দেখা যায়। একটি component-এর যখন একগুচ্ছ সম্পর্কিত knob থাকে ও আপনি একটি একটি করে তালিকা করতে চান না, তখন envFrom নিন। একটি মাউন্টেড volume নিন যখন অ্যাপ্লিকেশন একটি আসল কনফিগারেশন ফাইল প্রত্যাশা করে (একটি nginx.conf, একটি JSON বা YAML config, একটি সার্টিফিকেট), যখন মান বড়, বা যখন আপনি চান আপডেট রিস্টার্ট ছাড়াই পডে পৌঁছাক, কারণ মাউন্টেড ConfigMap ও Secret ফাইল সময়ের সঙ্গে রিফ্রেশ হয় আর env var শুরুতে জমাট থাকে।') },
        { p: l('Always split by sensitivity: non-secret settings belong in a ConfigMap, credentials in a Secret, and never the reverse. And keep it disciplined — a handful of clear env vars per component is readable, but hundreds of them scattered across many specs become impossible to track. When config grows, consolidate it into a ConfigMap and inject with envFrom or a mounted file instead of a long, repeated env list.', 'সবসময় স্পর্শকাতরতা অনুযায়ী ভাগ করুন: নন-সিক্রেট সেটিং ConfigMap-এ, ক্রেডেনশিয়াল Secret-এ, কখনো উল্টো নয়। আর সুশৃঙ্খল রাখুন—প্রতি component-এ কয়েকটি স্পষ্ট env var পাঠযোগ্য, কিন্তু বহু spec-জুড়ে ছড়ানো শত শত env var ট্র্যাক করা অসম্ভব হয়ে ওঠে। config বড় হলে একটি ConfigMap-এ একত্র করুন ও একটি দীর্ঘ, পুনরাবৃত্ত env তালিকার বদলে envFrom বা একটি মাউন্টেড ফাইল দিয়ে inject করুন।') },
      ],
    },
    {
      h: l('Common mistakes', 'সাধারণ ভুল'),
      blocks: [
        { list: [
          l('Hard-coding config in the image, so you must rebuild and repush for every environment change instead of just editing a ConfigMap.', 'image-এ config হার্ড-কোড করা, ফলে শুধু একটি ConfigMap এডিটের বদলে প্রতিটি এনভায়রনমেন্ট পরিবর্তনে রিবিল্ড ও রিপুশ লাগে।'),
          l('Scattering too many env vars across many specs, until no one can tell which setting lives where.', 'বহু spec-জুড়ে অতিরিক্ত env var ছড়ানো, যতক্ষণ না কেউ বলতে পারে কোন সেটিং কোথায় থাকে।'),
          l('Editing a ConfigMap and expecting running pods to pick it up — env vars are read only once at start, so you must roll the pods.', 'একটি ConfigMap এডিট করে আশা করা যে চলমান পড তা নেবে—env var শুরুতে একবারই পড়া হয়, তাই পড roll করতে হবে।'),
          l('Putting secret values in a ConfigMap because it is convenient, exposing them in plain text.', 'সুবিধার জন্য সিক্রেট মান একটি ConfigMap-এ রাখা, সাধারণ টেক্সটে প্রকাশ করা।'),
          l('Referencing a ConfigMap or Secret key that does not exist, so the pod fails to start with a hard-to-read error.', 'এমন একটি ConfigMap বা Secret key রেফার করা যা নেই, ফলে পড একটি কঠিন-পড়া ত্রুটিতে শুরু হতে ব্যর্থ হয়।'),
        ] },
      ],
    },
    {
      h: l('Remember in one line', 'এক লাইনে মনে রাখুন'),
      blocks: [
        { list: [
          l('Config injection feeds settings into a container at runtime, so one image runs everywhere with no rebuilds.', 'কনফিগ ইনজেকশন রানটাইমে একটি container-এ সেটিং খাওয়ায়, তাই এক image রিবিল্ড ছাড়াই সর্বত্র চলে।'),
          l('Inject with env (from ConfigMaps/Secrets) for small settings, or a mounted volume when the app expects a file.', 'ছোট সেটিংয়ে env দিয়ে (ConfigMap/Secret থেকে) inject করুন, বা অ্যাপ একটি ফাইল প্রত্যাশা করলে একটি মাউন্টেড volume দিয়ে।'),
          l('Non-secret in a ConfigMap, secret in a Secret; env vars freeze at start, mounted files can refresh.', 'নন-সিক্রেট ConfigMap-এ, সিক্রেট Secret-এ; env var শুরুতে জমাট, মাউন্টেড ফাইল রিফ্রেশ হতে পারে।'),
        ] },
      ],
    },
  ],

  // ── k8s-resources · Resource requests & limits ────────────────────────────
  'k8s-resources': [
    {
      h: l('What are requests and limits?', 'request ও limit কী?'),
      blocks: [
        { p: l('Every container can declare two numbers for each resource (CPU and memory): a request and a limit. The request is the amount the container is guaranteed — Kubernetes reserves it and will only place the pod on a node that has that much free. The limit is the ceiling — the container may burst up to it, but no further. Together they tell the scheduler how to pack pods onto nodes and tell the kubelet how to keep a single pod from taking down its neighbours.', 'প্রতিটি container প্রতিটি resource-এর (CPU ও memory) জন্য দুটি সংখ্যা ঘোষণা করতে পারে: একটি request ও একটি limit। request হলো container যতটা নিশ্চিতভাবে পায়—Kubernetes তা রিজার্ভ করে ও শুধু এমন একটি node-এ পডটি রাখে যেখানে ততটা ফাঁকা আছে। limit হলো ছাদ—container এ পর্যন্ত burst করতে পারে, তার বেশি নয়। একসঙ্গে এরা scheduler-কে বলে কীভাবে পড node-এ প্যাক করতে হয় ও kubelet-কে বলে কীভাবে একটি পডকে তার প্রতিবেশীদের ফেলে দেওয়া থেকে ঠেকাতে হয়।') },
        { p: l('CPU is measured in cores or millicores: "250m" means 250 milli-cores, a quarter of one CPU core, and "1" means one full core. Memory is measured in bytes with binary suffixes: "256Mi" is 256 mebibytes, "512Mi" is 512. The two resources behave very differently under pressure, which is the single most important thing to understand about limits — CPU is throttled, but memory kills.', 'CPU মাপা হয় core বা millicore-এ: "250m" মানে 250 milli-core, এক CPU core-এর এক-চতুর্থাংশ, আর "1" মানে একটি পূর্ণ core। Memory মাপা হয় বাইটে বাইনারি suffix দিয়ে: "256Mi" হলো 256 mebibyte, "512Mi" হলো 512। দুই resource চাপের নিচে খুব ভিন্নভাবে আচরণ করে, যা limit সম্পর্কে বোঝার সবচেয়ে গুরুত্বপূর্ণ বিষয়—CPU throttle হয়, কিন্তু memory মেরে ফেলে।') },
        { note: l('Think of a request as a reserved table at a restaurant and a limit as a spending cap. The reservation guarantees you a seat (the scheduler always finds room for your request), but the cap means you cannot order the whole kitchen — you get your table, not the entire restaurant.', 'request-কে একটি রেস্তোরাঁয় একটি রিজার্ভড টেবিল ও limit-কে একটি খরচ সীমা ভাবুন। রিজার্ভেশন আপনাকে একটি আসন নিশ্চিত করে (scheduler সবসময় আপনার request-এর জন্য জায়গা খুঁজে দেয়), কিন্তু সীমা মানে আপনি পুরো রান্নাঘর অর্ডার করতে পারবেন না—আপনি আপনার টেবিল পান, পুরো রেস্তোরাঁ নয়।'), kind: 'tip' },
      ],
    },
    {
      h: l('How the scheduler and kubelet use them, step by step', 'scheduler ও kubelet কীভাবে ব্যবহার করে, ধাপে ধাপে'),
      blocks: [
        { steps: [
          l('You set requests and limits on each container in the pod spec.', 'আপনি পড spec-এ প্রতিটি container-এ request ও limit সেট করেন।'),
          l('The scheduler reads the requests and finds a node whose remaining allocatable capacity can fit them. The sum of all pods’ requests on a node can never exceed the node’s capacity.', 'scheduler request পড়ে ও এমন একটি node খুঁজে পায় যার অবশিষ্ট allocatable ক্ষমতা এগুলো ধরতে পারে। একটি node-এ সব পডের request-এর যোগফল কখনো node-এর ক্ষমতা ছাড়াতে পারে না।'),
          l('Once placed, the container is guaranteed its requested CPU and memory, and may burst above the request toward the limit if the node has spare capacity.', 'রাখা হলে, container তার অনুরোধ করা CPU ও memory নিশ্চিতভাবে পায়, এবং node-এ অতিরিক্ত ক্ষমতা থাকলে request-এর উপরে limit-এর দিকে burst করতে পারে।'),
          l('If it tries to use more CPU than its limit, the kernel throttles it — the container is slowed, not killed. It simply gets fewer CPU time-slices.', 'যদি এটি তার limit-এর চেয়ে বেশি CPU ব্যবহার করতে চায়, kernel একে throttle করে—container ধীর হয়, মরে না। এটি শুধু কম CPU time-slice পায়।'),
          l('If it tries to use more memory than its limit, there is no way to throttle memory, so the kernel kills the container with an OOMKilled status and the kubelet restarts it.', 'যদি এটি তার limit-এর চেয়ে বেশি memory ব্যবহার করতে চায়, memory throttle করার উপায় নেই, তাই kernel container-কে একটি OOMKilled status দিয়ে মেরে ফেলে ও kubelet রিস্টার্ট করে।'),
        ] },
        { code: `resources:
  requests:
    cpu: "250m"
    memory: "256Mi"
  limits:
    cpu: "500m"
    memory: "512Mi"`, caption: l('This container is guaranteed a quarter core and 256Mi, and may burst up to half a core and 512Mi. Exceed the CPU limit and it is throttled; exceed the memory limit and it is OOMKilled and restarted.', 'এই container একটি quarter core ও 256Mi নিশ্চিতভাবে পায়, এবং একটি half core ও 512Mi পর্যন্ত burst করতে পারে। CPU limit ছাড়ালে এটি throttle হয়; memory limit ছাড়ালে এটি OOMKilled হয় ও রিস্টার্ট হয়।') },
      ],
    },
    {
      h: l('At the limit: OOMKilled vs CPU throttling', 'limit-এ: OOMKilled বনাম CPU throttling'),
      blocks: [
        { p: l('This is the heart of the topic. CPU is a "compressible" resource: if a container wants more than its limit, the scheduler simply gives it fewer slices of CPU time, so it runs slower but keeps running. You see this as latency and slow responses, not crashes. Memory is "incompressible": you cannot give a process 90% of a byte. So when a container reaches its memory limit and asks for more, the kernel’s out-of-memory killer terminates it, kubectl shows the container’s last state as OOMKilled, and the kubelet restarts it — often into a crash loop if the limit is genuinely too small.', 'এটিই topic-টির হৃদয়। CPU একটি "compressible" resource: একটি container তার limit-এর চেয়ে বেশি চাইলে scheduler শুধু তাকে কম CPU time-slice দেয়, তাই এটি ধীরে চলে কিন্তু চলতে থাকে। আপনি এটি latency ও ধীর রেসপন্স হিসেবে দেখেন, ক্র্যাশ নয়। Memory "incompressible": আপনি একটি process-কে একটি বাইটের 90% দিতে পারেন না। তাই একটি container তার memory limit-এ পৌঁছে আরও চাইলে kernel-এর out-of-memory killer একে terminate করে, kubectl container-এর last state OOMKilled দেখায়, ও kubelet রিস্টার্ট করে—limit সত্যিই খুব ছোট হলে প্রায়ই একটি crash loop-এ।') },
        { table: {
          head: [l('At the limit', 'limit-এ'), l('CPU', 'CPU'), l('Memory', 'Memory')],
          rows: [
            [l('Resource type', 'resource ধরন'), l('Compressible', 'Compressible'), l('Incompressible', 'Incompressible')],
            [l('What happens', 'যা ঘটে'), l('Throttled — runs slower', 'Throttle — ধীরে চলে'), l('OOMKilled — terminated and restarted', 'OOMKilled — terminate ও রিস্টার্ট')],
            [l('Symptom you see', 'যে উপসর্গ দেখেন'), l('High latency, slow responses', 'উচ্চ latency, ধীর রেসপন্স'), l('Restarts, CrashLoopBackOff', 'রিস্টার্ট, CrashLoopBackOff')],
            [l('If limit too low', 'limit খুব কম হলে'), l('Chronic slowness under load', 'লোডে দীর্ঘস্থায়ী ধীরতা'), l('Repeated kills, never stays up', 'বারবার kill, কখনো টেকে না')],
          ],
        } },
        { note: l('If a pod keeps restarting with reason OOMKilled, its memory limit is too low for what it actually uses — raise the limit (and the request) rather than fighting the symptom. If a pod is mysteriously slow but never crashes, suspect CPU throttling against a limit set too tight.', 'একটি পড যদি OOMKilled কারণে বারবার রিস্টার্ট করে, এটি আসলে যতটা ব্যবহার করে তার জন্য এর memory limit খুব কম—উপসর্গের সঙ্গে লড়ার বদলে limit (ও request) বাড়ান। একটি পড যদি রহস্যজনকভাবে ধীর কিন্তু কখনো ক্র্যাশ না করে, খুব আঁটসাঁট একটি limit-এর বিরুদ্ধে CPU throttling সন্দেহ করুন।'), kind: 'warn' },
      ],
    },
    {
      h: l('QoS classes and when to use requests vs limits', 'QoS class ও কখন request বনাম limit'),
      blocks: [
        { p: l('The relationship between a pod’s requests and limits decides its Quality of Service class, which controls who gets evicted first when a node runs low on memory. If every container sets requests equal to limits, the pod is Guaranteed and is the last to be evicted. If requests are lower than limits, it is Burstable — it can use spare capacity but is a candidate for eviction under pressure. If it sets neither, it is BestEffort and is killed first. Setting realistic requests is therefore not optional busywork; it is what protects your most important pods.', 'একটি পডের request ও limit-এর সম্পর্ক তার Quality of Service class ঠিক করে, যা নিয়ন্ত্রণ করে একটি node-এ memory কমে গেলে কে আগে evict হয়। যদি প্রতিটি container request-কে limit-এর সমান সেট করে, পডটি Guaranteed ও সবার শেষে evict হয়। যদি request limit-এর চেয়ে কম হয়, এটি Burstable—এটি অতিরিক্ত ক্ষমতা ব্যবহার করতে পারে কিন্তু চাপে eviction-এর প্রার্থী। যদি কোনোটিই সেট না করে, এটি BestEffort ও আগে kill হয়। তাই বাস্তব request সেট করা ঐচ্ছিক অপচয় নয়; এটিই আপনার সবচেয়ে গুরুত্বপূর্ণ পডকে রক্ষা করে।') },
        { p: l('In practice: always set a request for CPU and memory so the scheduler can pack nodes well and your pod gets a fair share. Set a memory limit to protect the node from a leaking container, but choose it from real measured usage plus headroom. Be cautious with CPU limits — many teams set requests but leave CPU limits off, so pods can use idle CPU freely and are only bounded by their requests during contention, avoiding needless throttling. For a critical, latency-sensitive service, make requests equal limits to earn Guaranteed QoS and steady performance.', 'বাস্তবে: সবসময় CPU ও memory-র জন্য একটি request সেট করুন যাতে scheduler node ভালোভাবে প্যাক করতে পারে ও আপনার পড ন্যায্য অংশ পায়। একটি লিক করা container থেকে node রক্ষা করতে একটি memory limit সেট করুন, তবে তা আসল মাপা ব্যবহার ও কিছু headroom থেকে বাছুন। CPU limit-এ সতর্ক থাকুন—অনেক টিম request সেট করে কিন্তু CPU limit বাদ রাখে, যাতে পড অলস CPU অবাধে ব্যবহার করতে পারে ও শুধু contention-এর সময় তাদের request দিয়ে সীমিত হয়, অপ্রয়োজনীয় throttling এড়িয়ে। একটি গুরুত্বপূর্ণ, latency-সংবেদনশীল সার্ভিসে request-কে limit-এর সমান করুন যাতে Guaranteed QoS ও স্থির পারফরম্যান্স পান।') },
      ],
    },
    {
      h: l('Common mistakes', 'সাধারণ ভুল'),
      blocks: [
        { list: [
          l('Running pods with no requests at all, so the scheduler cannot pack nodes well and one greedy pod can hog everything on the node.', 'একদম request ছাড়া পড চালানো, ফলে scheduler node ভালোভাবে প্যাক করতে পারে না ও একটি লোভী পড node-এর সব দখল করতে পারে।'),
          l('Setting a memory limit too low, so the container is OOMKilled and restarts forever in a crash loop.', 'একটি memory limit খুব কম সেট করা, ফলে container OOMKilled হয় ও চিরকাল একটি crash loop-এ রিস্টার্ট করে।'),
          l('Setting a CPU limit far below real need, causing chronic throttling and slow responses that look like a code bug.', 'CPU limit আসল দরকারের অনেক নিচে সেট করা, দীর্ঘস্থায়ী throttling ও ধীর রেসপন্স ঘটায় যা একটি কোড বাগের মতো দেখায়।'),
          l('Copying the same requests and limits onto every workload instead of measuring each one’s real usage.', 'প্রতিটি workload-এর আসল ব্যবহার না মেপে সব workload-এ একই request ও limit কপি করা।'),
          l('Confusing the two resources: throttling CPU is harmless slowdown, but hitting the memory limit is a hard kill.', 'দুই resource গুলিয়ে ফেলা: CPU throttle করা নিরীহ ধীরতা, কিন্তু memory limit-এ পৌঁছানো একটি কঠিন kill।'),
        ] },
      ],
    },
    {
      h: l('Remember in one line', 'এক লাইনে মনে রাখুন'),
      blocks: [
        { list: [
          l('Request = guaranteed reservation the scheduler uses to place the pod; limit = the ceiling it may burst to.', 'Request = নিশ্চিত রিজার্ভেশন যা scheduler পড রাখতে ব্যবহার করে; limit = যে ছাদ পর্যন্ত burst করতে পারে।'),
          l('CPU over the limit is throttled (slower); memory over the limit is OOMKilled (terminated and restarted).', 'limit-এর উপরে CPU throttle হয় (ধীর); limit-এর উপরে memory OOMKilled হয় (terminate ও রিস্টার্ট)।'),
          l('Always set realistic requests so nodes pack well; size limits from measured usage plus headroom.', 'সবসময় বাস্তব request সেট করুন যাতে node ভালোভাবে প্যাক হয়; মাপা ব্যবহার ও headroom থেকে limit ঠিক করুন।'),
        ] },
      ],
    },
  ],

  // ── k8s-probes · Liveness & readiness probes ──────────────────────────────
  'k8s-probes': [
    {
      h: l('What are liveness and readiness probes?', 'liveness ও readiness প্রোব কী?'),
      blocks: [
        { p: l('A probe is a periodic health check the kubelet runs against your container. There are two you will use constantly, and confusing them is one of the most common Kubernetes mistakes. A liveness probe answers "is this container still alive, or has it hung?" — if it fails, Kubernetes restarts the container. A readiness probe answers a different question: "is this container ready to receive traffic right now?" — if it fails, Kubernetes stops sending it requests but leaves it running.', 'একটি probe হলো একটি পর্যায়ক্রমিক health check যা kubelet আপনার container-এর বিরুদ্ধে চালায়। দুটি আপনি অবিরত ব্যবহার করবেন, আর এদের গুলিয়ে ফেলা সবচেয়ে সাধারণ Kubernetes ভুলের একটি। একটি liveness probe উত্তর দেয় "এই container কি এখনও জীবিত, নাকি ঝুলে গেছে?"—ব্যর্থ হলে Kubernetes container রিস্টার্ট করে। একটি readiness probe একটি ভিন্ন প্রশ্নের উত্তর দেয়: "এই container কি এখন ট্রাফিক নিতে প্রস্তুত?"—ব্যর্থ হলে Kubernetes একে রিকোয়েস্ট পাঠানো থামায় কিন্তু চালু রাখে।') },
        { p: l('The distinction matters because the two failures need opposite responses. A container that has deadlocked needs a restart, and only liveness delivers that. A container that is merely busy — warming a cache, waiting for a slow dependency, or handling a traffic spike — must not be restarted; it just needs to be taken out of rotation until it recovers, which is exactly what readiness does. Use the wrong one and you either keep sending users to a broken pod, or you kill healthy pods that were only briefly busy.', 'পার্থক্যটি গুরুত্বপূর্ণ কারণ দুই ব্যর্থতার বিপরীত প্রতিক্রিয়া দরকার। একটি deadlock-এ পড়া container-এর একটি রিস্টার্ট দরকার, আর শুধু liveness তা দেয়। একটি container যা শুধু ব্যস্ত—একটি cache গরম করছে, একটি ধীর dependency-র জন্য অপেক্ষা করছে, বা একটি traffic spike সামলাচ্ছে—তাকে রিস্টার্ট করা যাবে না; এটি শুধু সেরে না ওঠা পর্যন্ত rotation থেকে বের করা দরকার, যা ঠিক readiness করে। ভুলটি ব্যবহার করুন আর হয় আপনি ব্যবহারকারীদের একটি ভাঙা পডে পাঠাতে থাকবেন, নয়তো শুধু ক্ষণিক ব্যস্ত সুস্থ পড মেরে ফেলবেন।') },
        { note: l('A liveness probe is a pulse check; a readiness probe is an "open for business" sign. If the pulse stops, you resuscitate (restart). If the sign flips to "closed," you simply stop sending customers in — the shop is fine, just not ready this minute.', 'একটি liveness probe হলো একটি পালস চেক; একটি readiness probe হলো একটি "খোলা" সাইন। পালস থামলে আপনি পুনরুজ্জীবিত করেন (রিস্টার্ট)। সাইন "বন্ধ"-এ গেলে আপনি শুধু ক্রেতা পাঠানো থামান—দোকান ঠিক আছে, শুধু এই মুহূর্তে প্রস্তুত নয়।'), kind: 'tip' },
      ],
    },
    {
      h: l('How probes work, step by step', 'প্রোব কীভাবে কাজ করে, ধাপে ধাপে'),
      blocks: [
        { steps: [
          l('You define one or both probes on the container, choosing a check mechanism: an HTTP GET on a path, a TCP socket connection, or a shell command that must exit zero.', 'আপনি container-এ একটি বা উভয় probe সংজ্ঞায়িত করেন, একটি check mechanism বাছেন: একটি path-এ HTTP GET, একটি TCP socket সংযোগ, বা একটি shell command যা zero exit করতে হবে।'),
          l('After initialDelaySeconds, the kubelet begins probing every periodSeconds.', 'initialDelaySeconds-এর পর kubelet প্রতি periodSeconds-এ probe শুরু করে।'),
          l('The readiness probe controls Service endpoints: while it passes, the pod is listed as an endpoint and receives traffic; when it fails, the pod is removed from the Service so no new requests arrive — but the container keeps running.', 'readiness probe Service endpoint নিয়ন্ত্রণ করে: যতক্ষণ পাস করে, পডটি একটি endpoint হিসেবে তালিকাভুক্ত ও ট্রাফিক পায়; ব্যর্থ হলে পড Service থেকে সরানো হয় যাতে কোনো নতুন রিকোয়েস্ট না আসে—কিন্তু container চলতে থাকে।'),
          l('The liveness probe controls restarts: after failureThreshold consecutive failures, the kubelet kills and restarts the container.', 'liveness probe রিস্টার্ট নিয়ন্ত্রণ করে: failureThreshold সংখ্যক পরপর ব্যর্থতার পর kubelet container-কে kill ও রিস্টার্ট করে।'),
          l('An optional startupProbe protects slow-booting apps: liveness and readiness are held off until the startup probe first succeeds, so a long startup is not mistaken for a hang.', 'একটি ঐচ্ছিক startupProbe ধীরে-বুট হওয়া অ্যাপ রক্ষা করে: startup probe প্রথম সফল না হওয়া পর্যন্ত liveness ও readiness আটকে রাখা হয়, তাই একটি দীর্ঘ startup-কে hang ভাবা হয় না।'),
        ] },
        { code: `readinessProbe:
  httpGet:
    path: /ready
    port: 8080
  initialDelaySeconds: 5
livenessProbe:
  httpGet:
    path: /health
    port: 8080
  periodSeconds: 10`, caption: l('Readiness hits /ready starting 5s after boot and gates traffic; liveness hits /health every 10s and restarts the container if it hangs. Point them at different endpoints so "ready to serve" and "still alive" can differ.', 'readiness বুটের 5s পর থেকে /ready-এ যায় ও ট্রাফিক গেট করে; liveness প্রতি 10s-এ /health-এ যায় ও ঝুলে গেলে container রিস্টার্ট করে। এদের ভিন্ন endpoint-এ নির্দেশ করুন যাতে "পরিবেশনে প্রস্তুত" ও "এখনও জীবিত" আলাদা হতে পারে।') },
      ],
    },
    {
      h: l('Liveness vs readiness — the crucial difference', 'liveness বনাম readiness — গুরুত্বপূর্ণ পার্থক্য'),
      blocks: [
        { table: {
          head: [l('Aspect', 'দিক'), l('Liveness probe', 'Liveness probe'), l('Readiness probe', 'Readiness probe')],
          rows: [
            [l('Question it answers', 'যে প্রশ্নের উত্তর'), l('Is the container hung and beyond recovery?', 'container কি ঝুলে গেছে ও পুনরুদ্ধারের বাইরে?'), l('Can it serve traffic right now?', 'এটি কি এখন ট্রাফিক পরিবেশন করতে পারে?')],
            [l('Action on failure', 'ব্যর্থতায় ক্রিয়া'), l('Restart the container', 'container রিস্টার্ট করে'), l('Remove from Service endpoints', 'Service endpoint থেকে সরায়')],
            [l('Container keeps running?', 'container চলতে থাকে?'), l('No — it is killed and restarted', 'না—kill ও রিস্টার্ট হয়'), l('Yes — just no traffic', 'হ্যাঁ—শুধু ট্রাফিক নেই')],
            [l('Recovers automatically?', 'নিজে সেরে ওঠে?'), l('Only via restart', 'শুধু রিস্টার্টে'), l('Yes — traffic returns when it passes again', 'হ্যাঁ—আবার পাস করলে ট্রাফিক ফেরে')],
            [l('Good endpoint', 'ভালো endpoint'), l('A cheap /health that only checks the process', 'একটি সস্তা /health যা শুধু process যাচাই করে'), l('A /ready that checks dependencies are up', 'একটি /ready যা dependency চালু কিনা যাচাই করে')],
          ],
        } },
      ],
    },
    {
      h: l('When and where to use each', 'কখন ও কোথায় কোনটি ব্যবহার করবেন'),
      blocks: [
        { p: l('Add a readiness probe to almost every service that receives traffic — it is what makes rolling updates safe, because Kubernetes waits for a new pod to report ready before shifting traffic to it and retiring the old one. A good readiness endpoint checks that the app can actually do its job: the server is listening and its critical dependencies (database, cache) are reachable. That way a pod that has lost its database is quietly taken out of rotation instead of returning errors to users.', 'ট্রাফিক পাওয়া প্রায় প্রতিটি সার্ভিসে একটি readiness probe যোগ করুন—এটিই rolling update নিরাপদ করে, কারণ Kubernetes একটি নতুন পড ready রিপোর্ট করা পর্যন্ত অপেক্ষা করে তারপর ট্রাফিক সরায় ও পুরনোটি অবসর দেয়। একটি ভালো readiness endpoint যাচাই করে অ্যাপ আসলে তার কাজ করতে পারে কিনা: server শুনছে ও এর গুরুত্বপূর্ণ dependency (database, cache) পৌঁছানো যায়। এভাবে database হারানো একটি পড ব্যবহারকারীদের error ফেরানোর বদলে নীরবে rotation থেকে বের হয়।') },
        { p: l('Add a liveness probe more carefully, and point it at a cheap endpoint that reflects only the process being alive — not one that calls slow dependencies. The classic failure is a liveness probe on a heavy endpoint: under load the endpoint slows past the probe timeout, the kubelet thinks the pod is dead and restarts it, which drops in-flight requests and makes the overload worse — a self-inflicted crash loop. Give liveness generous timeouts and failure thresholds, and for slow-starting apps use a startupProbe so a long boot is never mistaken for a hang.', 'একটি liveness probe আরও সাবধানে যোগ করুন, ও এটিকে এমন একটি সস্তা endpoint-এ নির্দেশ করুন যা শুধু process জীবিত থাকা প্রতিফলিত করে—ধীর dependency ডাকে এমন নয়। ক্লাসিক ব্যর্থতা হলো একটি ভারী endpoint-এ liveness probe: লোডে endpoint probe timeout ছাড়িয়ে ধীর হয়, kubelet ভাবে পড মৃত ও রিস্টার্ট করে, যা চলমান রিকোয়েস্ট ফেলে দেয় ও overload আরও খারাপ করে—একটি নিজে-ডেকে-আনা crash loop। liveness-কে উদার timeout ও failure threshold দিন, আর ধীরে-শুরু হওয়া অ্যাপে একটি startupProbe ব্যবহার করুন যাতে একটি দীর্ঘ boot কখনো hang না ভাবা হয়।') },
      ],
    },
    {
      h: l('Common mistakes', 'সাধারণ ভুল'),
      blocks: [
        { list: [
          l('Pointing a liveness probe at a slow or dependency-heavy endpoint, so heavy load triggers needless restarts and a crash loop.', 'একটি liveness probe ধীর বা dependency-ভারী endpoint-এ নির্দেশ করা, ফলে ভারী লোড অপ্রয়োজনীয় রিস্টার্ট ও crash loop ঘটায়।'),
          l('Using a liveness probe where you meant readiness, restarting pods that were only briefly busy instead of just pausing their traffic.', 'readiness-এর জায়গায় liveness ব্যবহার করা, শুধু ট্রাফিক থামানোর বদলে ক্ষণিক ব্যস্ত পড রিস্টার্ট করা।'),
          l('Omitting a readiness probe, so a rolling update sends traffic to pods that have not finished starting and users see errors.', 'একটি readiness probe বাদ দেওয়া, ফলে একটি rolling update শুরু শেষ না-করা পডে ট্রাফিক পাঠায় ও ব্যবহারকারীরা error দেখে।'),
          l('Setting initialDelaySeconds too short for a slow-booting app, so it is killed before it ever finishes starting — use a startupProbe instead.', 'ধীরে-বুট হওয়া অ্যাপে initialDelaySeconds খুব ছোট সেট করা, ফলে শুরু শেষ করার আগেই এটি kill হয়—বদলে একটি startupProbe ব্যবহার করুন।'),
          l('Making liveness and readiness hit the exact same endpoint, losing the ability to distinguish "hung" from "not ready yet."', 'liveness ও readiness-কে ঠিক একই endpoint-এ যাওয়ানো, "ঝুলে গেছে" ও "এখনও প্রস্তুত নয়" আলাদা করার ক্ষমতা হারানো।'),
        ] },
      ],
    },
    {
      h: l('Remember in one line', 'এক লাইনে মনে রাখুন'),
      blocks: [
        { list: [
          l('Liveness restarts a hung container; readiness stops traffic to a pod that is not ready but keeps it running.', 'Liveness একটি ঝুলে থাকা container রিস্টার্ট করে; readiness একটি অপ্রস্তুত পডে ট্রাফিক থামায় কিন্তু চালু রাখে।'),
          l('Readiness gates traffic (and safe rollouts); liveness is a last-resort restart — keep its endpoint cheap.', 'Readiness ট্রাফিক (ও নিরাপদ rollout) গেট করে; liveness একটি শেষ-অবলম্বন রিস্টার্ট—এর endpoint সস্তা রাখুন।'),
          l('Point them at different endpoints, and use a startupProbe for slow-booting apps.', 'এদের ভিন্ন endpoint-এ নির্দেশ করুন, ও ধীরে-বুট হওয়া অ্যাপে একটি startupProbe ব্যবহার করুন।'),
        ] },
      ],
    },
  ],

  // ── k8s-volumes · Volumes ─────────────────────────────────────────────────
  'k8s-volumes': [
    {
      h: l('What is a volume?', 'ভলিউম কী?'),
      blocks: [
        { p: l('A volume gives a pod storage that is mounted into its containers at a path and that outlives the containers’ restarts. This matters because a container’s own filesystem is ephemeral: anything written inside a container is lost the instant that container restarts. A volume sits at the pod level, so when a crashed container is replaced by a fresh one, the data on the volume is still there, and two containers in the same pod can share it by mounting the same volume.', 'একটি volume একটি পডকে স্টোরেজ দেয় যা একটি path-এ তার container-এ মাউন্ট করা হয় ও container-এর রিস্টার্টের চেয়ে বেশি টেকে। এটি গুরুত্বপূর্ণ কারণ একটি container-এর নিজের filesystem ক্ষণস্থায়ী: একটি container-এর ভেতরে লেখা যা কিছু সেই container রিস্টার্ট হওয়ার মুহূর্তে হারিয়ে যায়। একটি volume পড স্তরে বসে, তাই একটি ক্র্যাশ করা container যখন একটি টাটকা container দিয়ে বদলানো হয়, volume-এর ডেটা তখনও সেখানে থাকে, ও একই পডের দুটি container একই volume মাউন্ট করে তা শেয়ার করতে পারে।') },
        { p: l('But there is a crucial boundary: most volume types are tied to the pod, not to the cluster. An emptyDir volume, the simplest kind, is created when the pod is scheduled to a node and deleted the moment the pod is removed. So a volume protects data across container restarts, but plain pod volumes do not protect data across the pod itself being deleted or rescheduled. For data that must truly persist, you need a PersistentVolume, referenced through a PersistentVolumeClaim.', 'কিন্তু একটি গুরুত্বপূর্ণ সীমানা আছে: বেশিরভাগ volume টাইপ পডের সঙ্গে বাঁধা, ক্লাস্টারের সঙ্গে নয়। একটি emptyDir volume, সরলতম ধরন, পড একটি node-এ schedule হলে তৈরি হয় ও পড সরানোর মুহূর্তে মুছে যায়। তাই একটি volume container রিস্টার্টজুড়ে ডেটা রক্ষা করে, কিন্তু সাধারণ পড volume পড নিজে ডিলিট বা পুনঃশিডিউল হওয়াজুড়ে ডেটা রক্ষা করে না। যে ডেটা সত্যিই টিকতে হবে তার জন্য আপনার একটি PersistentVolume দরকার, একটি PersistentVolumeClaim-এর মাধ্যমে রেফার করা।') },
        { note: l('Think of an emptyDir volume as a shared scratch pad inside the pod. Both containers can write on it and it survives a container restart — but throw the pod away and the scratch pad goes in the bin with it. Keep nothing on it you cannot afford to lose.', 'একটি emptyDir volume-কে পডের ভেতরে একটি শেয়ার্ড স্ক্র্যাচ প্যাড ভাবুন। দুই container-ই এতে লিখতে পারে ও এটি একটি container রিস্টার্ট টেকে—কিন্তু পড ফেলে দিন আর স্ক্র্যাচ প্যাড তার সঙ্গে ঝুড়িতে যায়। এতে এমন কিছু রাখবেন না যা হারানোর সামর্থ্য আপনার নেই।'), kind: 'tip' },
      ],
    },
    {
      h: l('How a volume works, step by step', 'একটি ভলিউম কীভাবে কাজ করে, ধাপে ধাপে'),
      blocks: [
        { steps: [
          l('You declare a volume once in the pod spec under volumes, giving it a name and a type (for example emptyDir).', 'আপনি পড spec-এ volumes-এর নিচে একবার একটি volume ঘোষণা করেন, একটি নাম ও একটি টাইপ দিয়ে (যেমন emptyDir)।'),
          l('Each container that wants it lists a volumeMount referencing that name and a mountPath where it should appear in the container’s filesystem.', 'যে প্রতিটি container এটি চায় সে একটি volumeMount তালিকা করে সেই নাম ও একটি mountPath রেফার করে যেখানে এটি container-এর filesystem-এ দেখা উচিত।'),
          l('When the pod is scheduled, Kubernetes provisions the volume on the node and mounts it into each container at its chosen path.', 'পড schedule হলে Kubernetes node-এ volume provision করে ও প্রতিটি container-এ তার বাছাই করা path-এ মাউন্ট করে।'),
          l('Containers read and write the mount path like an ordinary directory. Because the volume is at the pod level, a container that restarts finds the data intact, and sibling containers see each other’s writes.', 'container mount path-কে একটি সাধারণ ডিরেক্টরির মতো পড়ে ও লেখে। volume পড স্তরে থাকায়, একটি container যা রিস্টার্ট করে ডেটা অক্ষত পায়, ও সহোদর container একে অন্যের লেখা দেখে।'),
          l('When the pod is deleted, an emptyDir and most pod-scoped volumes are deleted with it. Only a PersistentVolume, bound via a claim, lives on independently.', 'পড ডিলিট হলে একটি emptyDir ও বেশিরভাগ পড-স্কোপড volume এর সঙ্গে ডিলিট হয়। শুধু একটি claim-এর মাধ্যমে বাঁধা PersistentVolume স্বাধীনভাবে টিকে থাকে।'),
        ] },
        { code: `apiVersion: v1
kind: Pod
metadata:
  name: web
spec:
  containers:
    - name: app
      image: myorg/app:1.0
      volumeMounts:
        - name: cache
          mountPath: /var/cache/app
  volumes:
    - name: cache
      emptyDir: {}`, caption: l('The volume "cache" is declared once under volumes and mounted into the app container at /var/cache/app. It survives a restart of the app container but is deleted when the pod is removed.', 'volume "cache" volumes-এর নিচে একবার ঘোষণা করা ও app container-এ /var/cache/app-এ মাউন্ট করা। এটি app container-এর একটি রিস্টার্ট টেকে কিন্তু পড সরানো হলে ডিলিট হয়।') },
      ],
    },
    {
      h: l('Volume types compared', 'ভলিউম টাইপ তুলনা'),
      blocks: [
        { table: {
          head: [l('Type', 'ধরন'), l('Lifetime', 'আয়ু'), l('Use it for', 'যার জন্য')],
          rows: [
            [l('emptyDir', 'emptyDir'), l('Created with the pod, deleted with the pod.', 'পডের সঙ্গে তৈরি, পডের সঙ্গে ডিলিট।'), l('Scratch space and sharing files between a pod’s containers.', 'স্ক্র্যাচ স্পেস ও একটি পডের container-এর মধ্যে ফাইল শেয়ার।')],
            [l('configMap / secret', 'configMap / secret'), l('Lives as long as the pod; content from a ConfigMap/Secret.', 'পড যতক্ষণ থাকে; বিষয়বস্তু একটি ConfigMap/Secret থেকে।'), l('Injecting config files or credentials as files.', 'config ফাইল বা ক্রেডেনশিয়াল ফাইল হিসেবে inject করা।')],
            [l('hostPath', 'hostPath'), l('A path on the node; tied to that specific node.', 'node-এর একটি path; সেই নির্দিষ্ট node-এর সঙ্গে বাঁধা।'), l('Node-level agents; rarely for app data (not portable).', 'node-স্তরের agent; অ্যাপ ডেটায় কদাচিৎ (portable নয়)।')],
            [l('PersistentVolumeClaim', 'PersistentVolumeClaim'), l('Independent of any pod — data truly persists.', 'যেকোনো পড থেকে স্বাধীন—ডেটা সত্যিই টেকে।'), l('Databases and any data that must outlive the pod.', 'database ও যেকোনো ডেটা যা পডের চেয়ে বেশি টিকতে হবে।')],
          ],
        } },
      ],
    },
    {
      h: l('When and where to use each', 'কখন ও কোথায় কোনটি ব্যবহার করবেন'),
      blocks: [
        { p: l('Reach for an emptyDir when the data is disposable: a scratch cache, a place for a build step to drop intermediate files, or a shared directory so a sidecar can read the files the main container writes (a log shipper reading an app’s logs is the classic case). It is fast, simple, and needs no external storage — but treat it as temporary by definition, because it vanishes with the pod. Use configMap and secret volumes when an application expects its configuration or certificates as files on disk rather than environment variables.', 'ডেটা যখন ফেলে-দেওয়ার মতো তখন একটি emptyDir নিন: একটি স্ক্র্যাচ cache, একটি build step-এর মধ্যবর্তী ফাইল ফেলার জায়গা, বা একটি শেয়ার্ড ডিরেক্টরি যাতে একটি sidecar মূল container-এর লেখা ফাইল পড়তে পারে (একটি log shipper একটি অ্যাপের লগ পড়া ক্লাসিক ক্ষেত্র)। এটি দ্রুত, সরল ও কোনো external storage লাগে না—কিন্তু একে সংজ্ঞা অনুসারে অস্থায়ী ধরুন, কারণ এটি পডের সঙ্গে মিলিয়ে যায়। configMap ও secret volume ব্যবহার করুন যখন একটি অ্যাপ্লিকেশন তার কনফিগারেশন বা সার্টিফিকেট environment variable-এর বদলে ডিস্কের ফাইল হিসেবে প্রত্যাশা করে।') },
        { p: l('The moment data must survive a pod being deleted, rescheduled to another node, or scaled down, an emptyDir is the wrong tool — you need a PersistentVolume through a PersistentVolumeClaim, which decouples the storage from the pod’s lifetime. This is the line beginners cross by accident: using an emptyDir for a database and then wondering why every row vanished when the pod moved. A stateful workload like a database should almost always be a StatefulSet backed by PVCs, so each replica keeps its own durable storage across reschedules. The rule of thumb is simple: if you cannot afford to lose it, it belongs on a PVC, not a pod-scoped volume.', 'যেই মুহূর্তে ডেটাকে একটি পড ডিলিট, অন্য node-এ পুনঃশিডিউল, বা scale down হওয়াজুড়ে টিকতে হবে, একটি emptyDir ভুল টুল—আপনার একটি PersistentVolumeClaim-এর মাধ্যমে একটি PersistentVolume দরকার, যা স্টোরেজকে পডের আয়ু থেকে আলাদা করে। এই সীমানা নতুনরা দুর্ঘটনাবশত পার হয়: একটি database-এর জন্য একটি emptyDir ব্যবহার করে তারপর ভাবে পড সরলে প্রতিটি row কেন উধাও হলো। একটি database-এর মতো stateful workload প্রায় সবসময় PVC-সমর্থিত একটি StatefulSet হওয়া উচিত, যাতে প্রতিটি replica পুনঃশিডিউলজুড়ে নিজের টেকসই স্টোরেজ রাখে। সহজ নিয়ম: যদি হারানোর সামর্থ্য না থাকে, এটি একটি PVC-তে থাকে, একটি পড-স্কোপড volume-এ নয়।') },
      ],
    },
    {
      h: l('Common mistakes', 'সাধারণ ভুল'),
      blocks: [
        { list: [
          l('Using an emptyDir for data you must keep, then losing all of it the moment the pod is rescheduled or deleted.', 'রাখতে-হওয়া ডেটায় একটি emptyDir ব্যবহার, তারপর পড পুনঃশিডিউল বা ডিলিট হওয়ার মুহূর্তে তার সব হারানো।'),
          l('Expecting an emptyDir to survive the pod — it survives container restarts only, not the pod’s deletion.', 'আশা করা যে একটি emptyDir পডকে টিকিয়ে রাখবে—এটি শুধু container রিস্টার্ট টেকে, পডের ডিলিট নয়।'),
          l('Relying on hostPath for app data, which pins the pod to one node and breaks the moment it is scheduled elsewhere.', 'অ্যাপ ডেটায় hostPath-এর উপর নির্ভর করা, যা পডকে এক node-এ পিন করে ও অন্যত্র schedule হওয়ার মুহূর্তে ভাঙে।'),
          l('Forgetting to add a volumeMount, so the volume is declared but never actually appears inside the container.', 'একটি volumeMount যোগ করতে ভুলে যাওয়া, ফলে volume ঘোষিত কিন্তু container-এর ভেতরে কখনো দেখা যায় না।'),
          l('Reaching for a full PersistentVolume when disposable scratch space was all that was needed, adding needless complexity.', 'ফেলে-দেওয়া স্ক্র্যাচ স্পেসই যথেষ্ট ছিল যখন, তখন একটি পূর্ণ PersistentVolume নেওয়া, বিনা প্রয়োজনে জটিলতা যোগ।'),
        ] },
      ],
    },
    {
      h: l('Remember in one line', 'এক লাইনে মনে রাখুন'),
      blocks: [
        { list: [
          l('A volume is pod-level storage mounted into containers; it survives container restarts and lets a pod’s containers share files.', 'একটি volume হলো পড-স্তরের স্টোরেজ যা container-এ মাউন্ট করা; এটি container রিস্টার্ট টেকে ও একটি পডের container-কে ফাইল শেয়ার করতে দেয়।'),
          l('emptyDir is disposable scratch space that dies with the pod; use a PVC for anything that must persist.', 'emptyDir হলো ফেলে-দেওয়া স্ক্র্যাচ স্পেস যা পডের সঙ্গে মরে; যা টিকতে হবে তার জন্য একটি PVC নিন।'),
          l('Declare the volume once under volumes and mount it with a volumeMount at a path in each container.', 'volumes-এর নিচে একবার volume ঘোষণা করুন ও প্রতিটি container-এ একটি path-এ একটি volumeMount দিয়ে মাউন্ট করুন।'),
        ] },
      ],
    },
  ],
}
