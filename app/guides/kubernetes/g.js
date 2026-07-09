// Deep, bilingual (English / Bangla) teaching guides for the Kubernetes
// "Production & ecosystem" topics. Shape mirrors app/course-guides.js and
// app/guides/git/f.js: each guide is an array of sections { h, blocks }, rendered
// by GuideBlock in app/LearningApp.js. Facts are drawn from the rawTopics rows and
// the commands table in app/courses/kubernetes.js. In { code } blocks the content
// is a plain backtick literal; Helm template markers use double curly braces
// ({{ ... }}) and never a dollar sign followed by an opening brace.

const l = (en, bn) => ({ en, bn })

export default {
  // ── k8s-helm · Helm: package manager ──────────────────────────────────────
  'k8s-helm': [
    {
      h: l('What is Helm?', 'Helm কী?'),
      blocks: [
        { p: l('Helm is a package manager for Kubernetes: charts bundle templated manifests you install and upgrade as one unit. Instead of hand-writing and applying a dozen separate YAML files — a Deployment, a Service, a ConfigMap, a Secret, an Ingress, an HPA — you install a single chart and Kubernetes gets the whole set at once. A chart is a folder of manifest templates plus a values file that fills in the blanks, and each time you install one you create a named "release" that Helm tracks and can upgrade or roll back later.', 'Helm হলো কুবারনেটিসের একটি প্যাকেজ ম্যানেজার: চার্ট টেমপ্লেটেড ম্যানিফেস্ট বান্ডেল করে যা আপনি এক এককে ইনস্টল ও আপগ্রেড করেন। এক ডজন আলাদা YAML ফাইল—একটি Deployment, একটি Service, একটি ConfigMap, একটি Secret, একটি Ingress, একটি HPA—হাতে লিখে apply করার বদলে আপনি একটি চার্ট ইনস্টল করেন আর কুবারনেটিস পুরো সেটটি একসঙ্গে পায়। একটি chart হলো ম্যানিফেস্ট টেমপ্লেটের একটি ফোল্ডার ও একটি values ফাইল যা ফাঁকা জায়গা ভরে, আর প্রতিবার একটি ইনস্টল করলে আপনি একটি নামযুক্ত "release" তৈরি করেন যা Helm ট্র্যাক করে ও পরে আপগ্রেড বা রোলব্যাক করতে পারে।') },
        { p: l('The problem Helm solves is repetition and configuration drift. Deploying the same application to dev, staging, and production means the same manifests with only a few differences — a replica count, an image tag, a hostname. Copy-pasting YAML for each environment is error-prone and quickly gets out of sync. A chart captures the shared structure once and lets each environment supply its own small values file, so one tested package installs consistently everywhere and every difference between environments is visible in one place.', 'Helm যে সমস্যা সমাধান করে তা হলো পুনরাবৃত্তি ও কনফিগারেশন drift। একই অ্যাপ্লিকেশন dev, staging ও production-এ ডিপ্লয় করা মানে একই ম্যানিফেস্ট, শুধু কয়েকটি পার্থক্য—একটি replica সংখ্যা, একটি image tag, একটি hostname। প্রতিটি এনভায়রনমেন্টের জন্য YAML কপি-পেস্ট করা ভুলপ্রবণ ও দ্রুত বেমানান হয়ে যায়। একটি chart শেয়ার্ড গঠনটি একবার ধরে রাখে ও প্রতিটি এনভায়রনমেন্টকে তার নিজের ছোট values ফাইল দিতে দেয়, তাই একটি পরীক্ষিত প্যাকেজ সর্বত্র সামঞ্জস্যপূর্ণভাবে ইনস্টল হয় ও এনভায়রনমেন্টগুলোর প্রতিটি পার্থক্য এক জায়গায় দৃশ্যমান থাকে।') },
        { note: l('Think of Helm as an app installer for the cluster — one command sets up a whole application with its config filled in. It is to Kubernetes what apt or npm is to a machine: you name a package, it pulls the pieces and wires them together, and it remembers what it installed so it can update or remove it cleanly.', 'Helm-কে ক্লাস্টারের জন্য একটি অ্যাপ ইনস্টলার ভাবুন—এক কমান্ড একটি পুরো অ্যাপ্লিকেশন তার কনফিগসহ সেট করে। কুবারনেটিসে Helm যা, একটি মেশিনে apt বা npm তা-ই: আপনি একটি প্যাকেজের নাম বলেন, এটি অংশগুলো টেনে এনে জোড়া লাগায়, আর কী ইনস্টল করেছে তা মনে রাখে যাতে পরিষ্কারভাবে আপডেট বা মুছতে পারে।'), kind: 'tip' },
      ],
    },
    {
      h: l('How Helm works, step by step', 'Helm কীভাবে কাজ করে, ধাপে ধাপে'),
      blocks: [
        { steps: [
          l('You add a chart repository — a hosted index of packaged charts — so Helm knows where to fetch charts from.', 'আপনি একটি chart repository যোগ করেন—প্যাকেজড চার্টের একটি হোস্টেড ইনডেক্স—যাতে Helm জানে কোথা থেকে চার্ট আনতে হবে।'),
          l('You install a chart under a release name. Helm renders every template with the chart’s default values merged with any values you override, producing final Kubernetes manifests.', 'আপনি একটি release নামে একটি চার্ট ইনস্টল করেন। Helm প্রতিটি টেমপ্লেটকে চার্টের ডিফল্ট values ও আপনার ওভাররাইড করা যেকোনো values মিশিয়ে রেন্ডার করে, চূড়ান্ত কুবারনেটিস ম্যানিফেস্ট তৈরি করে।'),
          l('Helm sends those rendered manifests to the API server, which creates the Deployment, Service, and the rest — exactly as if you had run kubectl apply on each.', 'Helm সেই রেন্ডার করা ম্যানিফেস্ট API সার্ভারে পাঠায়, যা Deployment, Service ও বাকিগুলো তৈরি করে—ঠিক যেন আপনি প্রতিটিতে kubectl apply চালিয়েছেন।'),
          l('The result is recorded as a release with a revision number, so Helm always knows the current and previous states of what it deployed.', 'ফলাফল একটি revision নম্বরসহ একটি release হিসেবে রেকর্ড হয়, তাই Helm সবসময় জানে এটি যা ডিপ্লয় করেছে তার বর্তমান ও আগের অবস্থা।'),
          l('When you change values or move to a newer chart version, helm upgrade renders again and applies only the differences, bumping the revision. If it breaks, helm rollback returns to a previous revision instantly.', 'আপনি values বদলালে বা নতুন chart ভার্সনে গেলে helm upgrade আবার রেন্ডার করে ও শুধু পার্থক্যগুলো apply করে, revision বাড়ায়। ভাঙলে helm rollback তাৎক্ষণিকভাবে আগের একটি revision-এ ফেরে।'),
        ] },
        { code: `# add a chart repository, then refresh its index
helm repo add bitnami https://charts.bitnami.com/bitnami
helm repo update

# install a chart as a named release
helm install web bitnami/nginx

# change a value and roll the release forward
helm upgrade web bitnami/nginx --set replicaCount=3

# see releases, and undo the last change if it broke
helm list
helm rollback web 1`, caption: l('add fetches the catalogue, install creates a release named "web", upgrade applies new values as a fresh revision, and rollback reverts to an earlier one.', 'add ক্যাটালগ আনে, install "web" নামে একটি release তৈরি করে, upgrade নতুন values একটি নতুন revision হিসেবে apply করে, আর rollback আগের একটিতে ফেরত যায়।') },
      ],
    },
    {
      h: l('Anatomy of a chart: templates + values', 'একটি চার্টের গঠন: টেমপ্লেট + values'),
      blocks: [
        { p: l('A chart is a directory. Chart.yaml holds its name and version; the templates/ folder holds manifest templates with placeholders; and values.yaml holds the default configuration those placeholders read from. A template is ordinary YAML with template markers written in double curly braces — for example replicas: followed by a marker pulling .Values.replicaCount. At install time Helm substitutes the value and emits a plain manifest. This is what "templated manifests" means: the YAML is generated, not written by hand, so one chart can produce different-but-consistent output for every environment.', 'একটি chart হলো একটি ডিরেক্টরি। Chart.yaml তার নাম ও ভার্সন রাখে; templates/ ফোল্ডার প্লেসহোল্ডারসহ ম্যানিফেস্ট টেমপ্লেট রাখে; আর values.yaml সেই প্লেসহোল্ডার যেখান থেকে পড়ে সেই ডিফল্ট কনফিগারেশন রাখে। একটি টেমপ্লেট হলো সাধারণ YAML, ডাবল কার্লি ব্রেসে লেখা template marker সহ—যেমন replicas:-এর পরে .Values.replicaCount টানা একটি marker। ইনস্টলের সময় Helm value বসিয়ে একটি সাধারণ ম্যানিফেস্ট বের করে। "templated manifests" মানে এটাই: YAML হাতে লেখা নয়, তৈরি করা, তাই একটি chart প্রতিটি এনভায়রনমেন্টের জন্য ভিন্ন-কিন্তু-সামঞ্জস্যপূর্ণ আউটপুট দিতে পারে।') },
        { code: `# values.yaml — the knobs the chart exposes
replicaCount: 3
image:
  repository: nginx
  tag: "1.25"

# templates/deployment.yaml — a template that reads those values
apiVersion: apps/v1
kind: Deployment
metadata:
  name: {{ .Release.Name }}
spec:
  replicas: {{ .Values.replicaCount }}
  template:
    spec:
      containers:
        - name: web
          image: "{{ .Values.image.repository }}:{{ .Values.image.tag }}"`, caption: l('The markers in double curly braces are filled from values.yaml at install time. Override them per environment with --set key=value or -f prod-values.yaml.', 'ডাবল কার্লি ব্রেসের marker গুলো ইনস্টলের সময় values.yaml থেকে ভরা হয়। প্রতি এনভায়রনমেন্টে --set key=value বা -f prod-values.yaml দিয়ে এগুলো ওভাররাইড করুন।') },
        { note: l('Before applying anything to a real cluster, run helm template or helm install --dry-run to render the chart and read the exact manifests it will create. This turns Helm’s indirection from a mystery into a reviewable diff.', 'একটি আসল ক্লাস্টারে কিছু apply করার আগে helm template বা helm install --dry-run চালিয়ে চার্টটি রেন্ডার করুন ও এটি যে ঠিক ম্যানিফেস্টগুলো তৈরি করবে তা পড়ুন। এতে Helm-এর ইনডাইরেকশন একটি রহস্য থেকে একটি রিভিউযোগ্য diff-এ পরিণত হয়।'), kind: 'tip' },
      ],
    },
    {
      h: l('Key Helm commands', 'মূল Helm কমান্ড'),
      blocks: [
        { table: {
          head: [l('Goal', 'লক্ষ্য'), l('Command', 'কমান্ড')],
          rows: [
            [l('Add a repo', 'রেপো যোগ'), l('helm repo add repo <url>', 'helm repo add repo <url>')],
            [l('Install a chart', 'চার্ট ইনস্টল'), l('helm install web repo/nginx', 'helm install web repo/nginx')],
            [l('List releases', 'রিলিজ তালিকা'), l('helm list', 'helm list')],
            [l('Upgrade a release', 'রিলিজ আপগ্রেড'), l('helm upgrade web repo/nginx', 'helm upgrade web repo/nginx')],
          ],
        } },
        { p: l('Beyond these four, remember helm rollback web <revision> to revert a bad upgrade, helm uninstall web to remove a release and everything it created, and helm install --dry-run --debug to preview the rendered manifests before touching the cluster.', 'এই চারটির বাইরে মনে রাখুন helm rollback web <revision> একটি খারাপ আপগ্রেড ফেরাতে, helm uninstall web একটি release ও এটি যা তৈরি করেছে সব সরাতে, আর helm install --dry-run --debug ক্লাস্টারে হাত দেওয়ার আগে রেন্ডার করা ম্যানিফেস্ট প্রিভিউ করতে।') },
      ],
    },
    {
      h: l('When and where to use Helm', 'কখন ও কোথায় Helm ব্যবহার করবেন'),
      blocks: [
        { p: l('Use Helm charts to install complex apps, override values per environment, and upgrade or roll back releases. It shines in two situations. First, when you consume third-party software — Prometheus, Grafana, cert-manager, ingress-nginx, a database operator — the maintainers publish an official chart, and helm install gives you a working, best-practice deployment in one command instead of assembling dozens of manifests yourself. Second, when you ship your own application to several environments, a chart lets dev, staging, and production share one package and differ only by a small values file each.', 'জটিল অ্যাপ ইনস্টল, প্রতি এনভায়রনমেন্টে ভ্যালু ওভাররাইড, ও রিলিজ আপগ্রেড বা রোলব্যাকে Helm চার্ট ব্যবহার করুন। এটি দুই পরিস্থিতিতে উজ্জ্বল। প্রথমত, যখন আপনি থার্ড-পার্টি সফটওয়্যার ব্যবহার করেন—Prometheus, Grafana, cert-manager, ingress-nginx, একটি database operator—রক্ষণাবেক্ষণকারীরা একটি অফিসিয়াল chart প্রকাশ করে, আর helm install নিজে কয়েক ডজন ম্যানিফেস্ট জোড়া লাগানোর বদলে এক কমান্ডে একটি কার্যকর, best-practice ডিপ্লয়মেন্ট দেয়। দ্বিতীয়ত, যখন আপনি নিজের অ্যাপ্লিকেশন কয়েকটি এনভায়রনমেন্টে পাঠান, একটি chart dev, staging ও production-কে একটি প্যাকেজ ভাগ করতে দেয় ও প্রতিটি শুধু একটি ছোট values ফাইলে আলাদা হয়।') },
        { p: l('You can skip Helm when your app is a single Deployment and Service that never varies between environments — plain kubectl apply on a couple of files, or a lighter templating tool like Kustomize, is simpler and hides nothing. The trade-off is real: Helm makes complex deploys repeatable and configurable, but templated YAML adds indirection that can obscure what deploys. If you never look at the rendered output, a chart can quietly install something you did not intend.', 'Helm বাদ দিতে পারেন যখন আপনার অ্যাপ একটি একক Deployment ও Service যা এনভায়রনমেন্টের মধ্যে কখনো বদলায় না—কয়েকটি ফাইলে সাধারণ kubectl apply, বা Kustomize-এর মতো একটি হালকা টেমপ্লেটিং টুল সরল ও কিছুই লুকায় না। ট্রেড-অফটি বাস্তব: Helm জটিল ডিপ্লয় পুনরাবৃত্তিযোগ্য ও কনফিগারযোগ্য করে, তবে টেমপ্লেটেড YAML একটি ইনডাইরেকশন যোগ করে যা কী ডিপ্লয় হয় অস্পষ্ট করতে পারে। রেন্ডার করা আউটপুট কখনো না দেখলে একটি chart নীরবে এমন কিছু ইনস্টল করতে পারে যা আপনি চাননি।') },
      ],
    },
    {
      h: l('Common mistakes', 'সাধারণ ভুল'),
      blocks: [
        { list: [
          l('Installing a third-party chart with default values in production without reviewing what it actually creates — the defaults may expose a service, skip resource limits, or turn on features you do not want.', 'এটি আসলে কী বানায় না দেখে প্রোডাকশনে ডিফল্ট ভ্যালুসহ একটি থার্ড-পার্টি চার্ট ইনস্টল করা—ডিফল্ট একটি সার্ভিস এক্সপোজ করতে পারে, resource limit বাদ দিতে পারে, বা আপনার অনিচ্ছুক ফিচার চালু করতে পারে।'),
          l('Editing live resources with kubectl after installing them via Helm, so the next helm upgrade overwrites your manual change and it silently vanishes.', 'Helm দিয়ে ইনস্টলের পর kubectl দিয়ে লাইভ রিসোর্স এডিট করা, ফলে পরবর্তী helm upgrade আপনার ম্যানুয়াল পরিবর্তন ওভাররাইট করে ও তা নীরবে হারিয়ে যায়।'),
          l('Not pinning the chart version, so a later helm upgrade pulls a newer, incompatible chart and changes behaviour you did not ask for.', 'chart ভার্সন পিন না করা, ফলে পরের helm upgrade একটি নতুন, অসঙ্গত chart টানে ও আপনি না চাওয়া আচরণ বদলায়।'),
          l('Putting secrets as plain values in a chart or values file committed to git, leaking credentials to anyone with repo access.', 'git-এ কমিট করা একটি chart বা values ফাইলে গোপন তথ্য প্লেইন value হিসেবে রাখা, রিপো অ্যাক্সেস আছে এমন যে কারো কাছে credential ফাঁস করা।'),
          l('Forgetting to run helm repo update, so you install an old cached version of a chart instead of the latest.', 'helm repo update চালাতে ভুলে যাওয়া, ফলে সর্বশেষের বদলে একটি chart-এর পুরনো cached ভার্সন ইনস্টল করা।'),
        ] },
      ],
    },
    {
      h: l('Remember in one line', 'এক লাইনে মনে রাখুন'),
      blocks: [
        { list: [
          l('Helm is the package manager for Kubernetes: a chart bundles templated manifests, and you install it as a named, versioned release.', 'Helm হলো কুবারনেটিসের প্যাকেজ ম্যানেজার: একটি chart টেমপ্লেটেড ম্যানিফেস্ট বান্ডেল করে, আর আপনি এটিকে একটি নামযুক্ত, ভার্সনড release হিসেবে ইনস্টল করেন।'),
          l('repo add → install → upgrade → rollback is the core loop; override behaviour with values, not by hand-editing live objects.', 'repo add → install → upgrade → rollback হলো মূল লুপ; আচরণ ওভাররাইড করুন values দিয়ে, লাইভ অবজেক্ট হাতে এডিট করে নয়।'),
          l('Always review the rendered manifests (--dry-run) and pin the chart version before trusting a chart in production.', 'প্রোডাকশনে একটি chart বিশ্বাস করার আগে সবসময় রেন্ডার করা ম্যানিফেস্ট দেখুন (--dry-run) ও chart ভার্সন পিন করুন।'),
        ] },
      ],
    },
  ],

  // ── k8s-observability · Monitoring & observability ────────────────────────
  'k8s-observability': [
    {
      h: l('What is observability?', 'অবজার্ভেবিলিটি কী?'),
      blocks: [
        { p: l('Observability is the ability to understand what is happening inside a running cluster from the outside, using the signals it emits. You observe a cluster with metrics (Prometheus), dashboards (Grafana), centralized logs, and traces to see what is happening. Monitoring is the narrower, older idea — watching known numbers and alerting when they cross a line — while observability is the broader goal of being able to ask new questions about a system you did not anticipate, and get answers from data you were already collecting.', 'অবজার্ভেবিলিটি হলো একটি চলমান ক্লাস্টারের ভেতরে কী ঘটছে তা বাইরে থেকে বোঝার ক্ষমতা, এটি যে সংকেত ছাড়ে তা ব্যবহার করে। একটি ক্লাস্টার মেট্রিক (Prometheus), ড্যাশবোর্ড (Grafana), কেন্দ্রীভূত লগ ও ট্রেস দিয়ে পর্যবেক্ষণ করুন যাতে কী ঘটছে দেখা যায়। মনিটরিং হলো সংকীর্ণতর, পুরনো ধারণা—পরিচিত সংখ্যা দেখা ও একটি সীমা পার হলে অ্যালার্ট দেওয়া—আর অবজার্ভেবিলিটি হলো বৃহত্তর লক্ষ্য: একটি সিস্টেম সম্পর্কে যেসব নতুন প্রশ্ন আপনি আগে ভাবেননি তা জিজ্ঞাসা করতে পারা, ও ইতিমধ্যে সংগ্রহ করা ডেটা থেকে উত্তর পাওয়া।') },
        { p: l('Kubernetes makes this both essential and harder. A single app may run as many identical pods that come and go as the cluster scales and reschedules them, spread across many nodes. When a pod dies, its container and its logs vanish with it. Without a system that continuously scrapes numbers, ships logs off the node, and stitches requests together, a failure leaves almost no trace to investigate. Observability is what turns "the site is slow and we have no idea why" into a specific, answerable question.', 'কুবারনেটিস এটিকে একইসঙ্গে অপরিহার্য ও কঠিন করে। একটি অ্যাপ অনেকগুলো অভিন্ন pod হিসেবে চলতে পারে যা ক্লাস্টার স্কেল ও reschedule করার সঙ্গে আসে-যায়, অনেক নোডে ছড়ানো। একটি pod মরলে তার container ও লগ তার সঙ্গে মিলিয়ে যায়। এমন একটি সিস্টেম ছাড়া যা অবিরত সংখ্যা scrape করে, নোড থেকে লগ পাঠায়, ও রিকোয়েস্ট জোড়া লাগায়, একটি ব্যর্থতা তদন্তের জন্য প্রায় কোনো চিহ্ন রাখে না। অবজার্ভেবিলিটি "সাইট ধীর আর কেন জানি না"-কে একটি নির্দিষ্ট, উত্তরযোগ্য প্রশ্নে পরিণত করে।') },
        { note: l('Think of a cockpit of gauges and recorders — you cannot safely fly a fleet you cannot see. Metrics are the live gauges, logs are the flight recorder’s detailed transcript, and traces are the flight path showing which leg of the journey took the time.', 'গজ ও রেকর্ডারের একটি ককপিট ভাবুন—যে বহর দেখতে পান না তা নিরাপদে ওড়াতে পারেন না। মেট্রিক হলো লাইভ গজ, লগ হলো ফ্লাইট রেকর্ডারের বিস্তারিত প্রতিলিপি, আর ট্রেস হলো ফ্লাইট পথ যা দেখায় যাত্রার কোন অংশ সময় নিয়েছে।'), kind: 'tip' },
      ],
    },
    {
      h: l('How the pieces fit together', 'অংশগুলো কীভাবে একসঙ্গে বসে'),
      blocks: [
        { steps: [
          l('Each pod and node exposes metrics — small numeric counters and gauges like request count, error count, CPU, and memory — on an HTTP endpoint.', 'প্রতিটি pod ও নোড একটি HTTP endpoint-এ মেট্রিক প্রকাশ করে—request count, error count, CPU ও memory-র মতো ছোট সংখ্যাসূচক counter ও gauge।'),
          l('Prometheus runs in the cluster and scrapes those endpoints on an interval, storing every sample as a time series it can query with PromQL.', 'Prometheus ক্লাস্টারে চলে ও একটি ব্যবধানে সেই endpoint scrape করে, প্রতিটি sample একটি time series হিসেবে সংরক্ষণ করে যা PromQL দিয়ে query করা যায়।'),
          l('Grafana connects to Prometheus (and other sources) and draws dashboards — graphs of latency, error rate, and saturation that a human can read at a glance.', 'Grafana Prometheus (ও অন্য উৎস)-এর সঙ্গে যুক্ত হয় ও ড্যাশবোর্ড আঁকে—latency, error rate ও saturation-এর গ্রাফ যা একজন মানুষ এক নজরে পড়তে পারে।'),
          l('A log agent on every node (Fluent Bit, Promtail) collects each container’s stdout and ships it to a central store (Loki or Elasticsearch) so logs survive after the pod is gone.', 'প্রতিটি নোডে একটি log agent (Fluent Bit, Promtail) প্রতিটি container-এর stdout সংগ্রহ করে ও একটি কেন্দ্রীয় স্টোরে (Loki বা Elasticsearch) পাঠায় যাতে pod চলে যাওয়ার পরও লগ টিকে থাকে।'),
          l('Alertmanager watches the metrics and, when a rule fires (say error rate above a threshold for five minutes), pages the on-call engineer. Traces, when enabled, tie one request’s path across services together to show where the time went.', 'Alertmanager মেট্রিক দেখে ও একটি নিয়ম চালু হলে (ধরুন পাঁচ মিনিট ধরে error rate একটি সীমার ওপরে) on-call ইঞ্জিনিয়ারকে page করে। ট্রেস, চালু থাকলে, একটি রিকোয়েস্টের পথ সার্ভিসজুড়ে জোড়া লাগিয়ে দেখায় সময় কোথায় গেছে।'),
        ] },
        { code: `# a Prometheus scrape target lives in a ConfigMap like this
scrape_configs:
  - job_name: web
    kubernetes_sd_configs:
      - role: pod
    metric_relabel_configs: []

# a Grafana dashboard is just a query against the scraped data, e.g. PromQL:
# rate(http_requests_total{status="500"}[5m])   -> errors per second over 5m`, caption: l('Prometheus discovers pods and scrapes their /metrics endpoints; Grafana turns the stored time series into graphs with PromQL queries like this one.', 'Prometheus pod খুঁজে তাদের /metrics endpoint scrape করে; Grafana সংরক্ষিত time series-কে এই ধরনের PromQL query দিয়ে গ্রাফে পরিণত করে।') },
      ],
    },
    {
      h: l('The three pillars: metrics, logs, traces', 'তিন স্তম্ভ: metrics, logs, traces'),
      blocks: [
        { table: {
          head: [l('Signal', 'সংকেত'), l('Question it answers', 'যে প্রশ্নের উত্তর দেয়'), l('Typical tool', 'সাধারণ টুল')],
          rows: [
            [l('Metrics', 'Metrics'), l('Is it healthy, and how much? Numeric trends over time — latency, error rate, CPU, memory.', 'এটি কি সুস্থ, আর কতটা? সময়ের সঙ্গে সংখ্যাসূচক প্রবণতা—latency, error rate, CPU, memory।'), l('Prometheus', 'Prometheus')],
            [l('Dashboards', 'ড্যাশবোর্ড'), l('What do all those numbers look like together, right now and historically?', 'সব সংখ্যা একসঙ্গে এখন ও ঐতিহাসিকভাবে দেখতে কেমন?'), l('Grafana', 'Grafana')],
            [l('Logs', 'Logs'), l('What exactly happened in this one request or crash? The detailed text record.', 'এই একটি রিকোয়েস্ট বা ক্র্যাশে ঠিক কী ঘটেছে? বিস্তারিত টেক্সট রেকর্ড।'), l('Loki / ELK', 'Loki / ELK')],
            [l('Traces', 'Traces'), l('Across many services, where did the time go for one request?', 'অনেক সার্ভিসজুড়ে, একটি রিকোয়েস্টে সময় কোথায় গেল?'), l('Jaeger / Tempo', 'Jaeger / Tempo')],
          ],
        } },
        { p: l('You use them together: a metric alert tells you something is wrong and roughly where, a dashboard shows the shape and timing of the problem, logs give the exact error message, and a trace shows which downstream service caused the slowdown. Alert on symptoms users feel — high error rate, high latency, and saturation (a resource nearing its limit) — rather than on every internal number, or you will drown in noise.', 'এগুলো একসঙ্গে ব্যবহার করুন: একটি metric অ্যালার্ট বলে কিছু ভুল ও মোটামুটি কোথায়, একটি ড্যাশবোর্ড সমস্যার আকার ও সময় দেখায়, লগ ঠিক error message দেয়, আর একটি trace দেখায় কোন downstream সার্ভিস ধীরগতি ঘটিয়েছে। ব্যবহারকারী যা অনুভব করে সেই উপসর্গে অ্যালার্ট দিন—উচ্চ error rate, উচ্চ latency, ও saturation (একটি রিসোর্স তার সীমার কাছে)—প্রতিটি অভ্যন্তরীণ সংখ্যায় নয়, নইলে গোলমালে ডুবে যাবেন।') },
      ],
    },
    {
      h: l('When and where to invest in observability', 'কখন ও কোথায় অবজার্ভেবিলিটিতে বিনিয়োগ করবেন'),
      blocks: [
        { p: l('Collect pod and node metrics, ship logs centrally, and alert on symptoms like error rate and saturation from the very first day a workload matters. The most important rule is timing: set up monitoring before you have an outage, not after. If you only add monitoring after an outage, the incident you needed to understand went unrecorded, and you have learned nothing from the very failure that hurt you. A small, always-on stack that captures metrics and logs continuously pays for itself the first time something breaks at 3 a.m.', 'একটি ওয়ার্কলোড গুরুত্বপূর্ণ হওয়ার প্রথম দিন থেকেই pod ও নোড মেট্রিক সংগ্রহ করুন, লগ কেন্দ্রীয়ভাবে পাঠান, ও error rate ও saturation-এর মতো উপসর্গে অ্যালার্ট দিন। সবচেয়ে গুরুত্বপূর্ণ নিয়ম হলো সময়: একটি আউটেজের আগে মনিটরিং সেট করুন, পরে নয়। আউটেজের পরই শুধু মনিটরিং যোগ করলে, যে ঘটনা বুঝতে দরকার ছিল তা রেকর্ড হয়নি, আর যে ব্যর্থতা আপনাকে আঘাত করেছে তা থেকেই কিছু শেখেননি। একটি ছোট, সর্বদা-চালু stack যা অবিরত মেট্রিক ও লগ ধরে রাখে, রাত ৩টায় প্রথমবার কিছু ভাঙলেই তার খরচ তুলে আনে।') },
        { p: l('Balance that against cost. Good observability makes incidents fast to diagnose, but collecting everything costs storage, compute, and tuning. High-cardinality metrics (a label per user or per request id) can explode Prometheus’ memory; keeping every log line forever fills disks. So set sensible scrape intervals and retention, drop labels you never query, and sample verbose logs. Start with the golden signals — latency, traffic, errors, saturation — and add more only when a real question demands it.', 'সেটির বিপরীতে খরচ ভারসাম্য করুন। ভালো অবজার্ভেবিলিটি ঘটনা দ্রুত নির্ণয় করে, তবে সবকিছু সংগ্রহ স্টোরেজ, কম্পিউট ও টিউনিং খরচ করে। উচ্চ-cardinality মেট্রিক (প্রতি user বা প্রতি request id-তে একটি label) Prometheus-এর memory বিস্ফোরিত করতে পারে; প্রতিটি log line চিরকাল রাখা ডিস্ক ভরায়। তাই যুক্তিসঙ্গত scrape interval ও retention সেট করুন, যেসব label কখনো query করেন না তা বাদ দিন, ও ভার্বোস লগ sample করুন। golden signal দিয়ে শুরু করুন—latency, traffic, errors, saturation—ও একটি সত্যিকারের প্রশ্ন দাবি করলেই কেবল আরও যোগ করুন।') },
      ],
    },
    {
      h: l('Common mistakes', 'সাধারণ ভুল'),
      blocks: [
        { list: [
          l('Only adding monitoring after an outage, so the incident you needed to understand went unrecorded and cannot be diagnosed in hindsight.', 'আউটেজের পরই শুধু মনিটরিং যোগ করা, ফলে যে ঘটনা বুঝতে দরকার ছিল তা রেকর্ড হয়নি ও পরে নির্ণয় করা যায় না।'),
          l('Writing logs only to a file inside the container instead of stdout, so the log agent never collects them and they die with the pod.', 'stdout-এর বদলে শুধু container-এর ভেতরের একটি ফাইলে লগ লেখা, ফলে log agent কখনো সংগ্রহ করে না ও এগুলো pod-এর সঙ্গে মরে।'),
          l('Alerting on every internal metric instead of user-facing symptoms, creating so much noise that real alerts get ignored (alert fatigue).', 'ব্যবহারকারী-মুখী উপসর্গের বদলে প্রতিটি অভ্যন্তরীণ মেট্রিকে অ্যালার্ট দেওয়া, এত গোলমাল তৈরি করা যে আসল অ্যালার্ট উপেক্ষিত হয় (alert fatigue)।'),
          l('Using high-cardinality labels (user id, request id) on metrics, blowing up Prometheus memory and cost.', 'মেট্রিকে উচ্চ-cardinality label (user id, request id) ব্যবহার করা, Prometheus-এর memory ও খরচ ফুলিয়ে তোলা।'),
          l('Building beautiful dashboards but no alerts, so nobody knows there is a problem until a user reports it.', 'সুন্দর ড্যাশবোর্ড বানানো কিন্তু কোনো অ্যালার্ট নয়, ফলে একজন ব্যবহারকারী না জানানো পর্যন্ত কেউ সমস্যা জানে না।'),
        ] },
      ],
    },
    {
      h: l('Remember in one line', 'এক লাইনে মনে রাখুন'),
      blocks: [
        { list: [
          l('Observe a cluster with metrics (Prometheus), dashboards (Grafana), centralized logs, and traces — three pillars that answer different questions.', 'একটি ক্লাস্টার মেট্রিক (Prometheus), ড্যাশবোর্ড (Grafana), কেন্দ্রীভূত লগ ও ট্রেস দিয়ে পর্যবেক্ষণ করুন—তিন স্তম্ভ যা ভিন্ন প্রশ্নের উত্তর দেয়।'),
          l('Set it up before the outage, alert on user-facing symptoms, and ship logs off the node so they survive the pod.', 'আউটেজের আগে সেট করুন, ব্যবহারকারী-মুখী উপসর্গে অ্যালার্ট দিন, ও লগ নোড থেকে পাঠান যাতে pod-এর পরও টিকে থাকে।'),
          l('Collect enough to diagnose, but not so much that storage, cardinality, and noise become the new problem.', 'নির্ণয়ের মতো যথেষ্ট সংগ্রহ করুন, তবে এত নয় যে স্টোরেজ, cardinality ও গোলমাল নতুন সমস্যা হয়ে ওঠে।'),
        ] },
      ],
    },
  ],

  // ── k8s-security · Cluster security ────────────────────────────────────────
  'k8s-security': [
    {
      h: l('What is cluster security?', 'ক্লাস্টার নিরাপত্তা কী?'),
      blocks: [
        { p: l('Cluster security means hardening a Kubernetes cluster in layers so that no single mistake or breach hands over everything. You secure a cluster with RBAC, least-privilege pods (non-root, dropped capabilities), network policies, and scanned images. Each of these is a different defence: RBAC controls who and what may talk to the API server; pod security controls what a container may do on its node; NetworkPolicies control which pods may talk to each other; and image scanning controls what code you allow to run at all. Together they form defence in depth.', 'ক্লাস্টার নিরাপত্তা মানে একটি কুবারনেটিস ক্লাস্টারকে স্তরে স্তরে কঠোর করা যাতে একটিমাত্র ভুল বা আপস সবকিছু তুলে না দেয়। একটি ক্লাস্টার RBAC, ন্যূনতম-অধিকার পড (নন-রুট, বাদ দেওয়া ক্ষমতা), নেটওয়ার্ক পলিসি ও স্ক্যান করা ইমেজ দিয়ে নিরাপদ করুন। এদের প্রতিটি ভিন্ন প্রতিরক্ষা: RBAC নিয়ন্ত্রণ করে কে ও কী API সার্ভারের সঙ্গে কথা বলতে পারে; pod security নিয়ন্ত্রণ করে একটি container তার নোডে কী করতে পারে; NetworkPolicy নিয়ন্ত্রণ করে কোন pod একে অন্যের সঙ্গে কথা বলতে পারে; আর image scanning নিয়ন্ত্রণ করে আপনি আদৌ কোন কোড চালাতে দেন। একসঙ্গে এগুলো গভীর প্রতিরক্ষা গড়ে।') },
        { p: l('The reason layering matters is that a cluster has a large attack surface: the API server, the nodes, the network between pods, and every container image you pull from the internet. If any one of these is wide open, an attacker who gets a foothold can move sideways and take over the rest. Security is not a single switch; it is a set of independent controls, each of which limits how far a compromise can spread — the "blast radius" — so that breaking in one place does not mean owning the whole cluster.', 'স্তরায়ন কেন গুরুত্বপূর্ণ তার কারণ একটি ক্লাস্টারের বিশাল আক্রমণ পৃষ্ঠ আছে: API সার্ভার, নোড, pod-এর মধ্যকার নেটওয়ার্ক, ও ইন্টারনেট থেকে টানা প্রতিটি container image। এদের যেকোনো একটি খোলা থাকলে, পা রাখা একজন আক্রমণকারী পাশে সরে বাকিটা দখল করতে পারে। নিরাপত্তা একটি একক সুইচ নয়; এটি স্বাধীন নিয়ন্ত্রণের একটি সেট, প্রতিটি সীমিত করে একটি আপস কতদূর ছড়াতে পারে—"blast radius"—যাতে এক জায়গায় ঢুকে পড়া মানে পুরো ক্লাস্টার দখল না হয়।') },
        { note: l('Running everything as root cluster-admin for convenience means one compromised pod owns the whole cluster. A single container escape or leaked token then becomes a full takeover — least privilege at every layer is what stops one crack from breaking the dam.', 'সুবিধার জন্য সবকিছু root cluster-admin হিসেবে চালানো মানে একটি আপসকৃত pod পুরো ক্লাস্টার দখল করে। তখন একটি container escape বা ফাঁস হওয়া token একটি পূর্ণ দখলে পরিণত হয়—প্রতিটি স্তরে least privilege-ই একটি ফাটলকে বাঁধ ভাঙা থেকে থামায়।'), kind: 'warn' },
      ],
    },
    {
      h: l('How the layers work together', 'স্তরগুলো কীভাবে একসঙ্গে কাজ করে'),
      blocks: [
        { steps: [
          l('RBAC (Role-Based Access Control): grant each user and each pod’s service account only the specific verbs and resources it needs — get pods in one namespace, not cluster-admin everywhere.', 'RBAC (Role-Based Access Control): প্রতিটি user ও প্রতিটি pod-এর service account-কে শুধু প্রয়োজনীয় নির্দিষ্ট verb ও resource দিন—একটি namespace-এ get pods, সর্বত্র cluster-admin নয়।'),
          l('Pod security: run containers as a non-root user, make the root filesystem read-only, and drop Linux capabilities so a breached process can do little on the node.', 'Pod security: container-কে একটি non-root user হিসেবে চালান, root filesystem read-only করুন, ও Linux capability বাদ দিন যাতে একটি আপসকৃত process নোডে সামান্যই করতে পারে।'),
          l('NetworkPolicies: by default any pod can reach any other pod; a NetworkPolicy switches a namespace to deny-by-default and allows only the specific pod-to-pod traffic you name.', 'NetworkPolicy: ডিফল্টে যেকোনো pod অন্য যেকোনো pod-এ পৌঁছাতে পারে; একটি NetworkPolicy একটি namespace-কে deny-by-default করে ও শুধু আপনার বলা নির্দিষ্ট pod-থেকে-pod ট্রাফিক অনুমতি দেয়।'),
          l('Scanned images: scan every image for known vulnerabilities before it runs, pull only from trusted registries, and pin images by digest so the content cannot change under you.', 'Scanned images: প্রতিটি image চালানোর আগে পরিচিত দুর্বলতার জন্য scan করুন, শুধু বিশ্বস্ত registry থেকে টানুন, ও digest দিয়ে image পিন করুন যাতে বিষয়বস্তু আপনার অজান্তে বদলাতে না পারে।'),
          l('Secrets and the API: keep Secrets out of git, restrict who can read them via RBAC, and never expose the API server or dashboard to the public internet without authentication.', 'Secrets ও API: Secret git-এর বাইরে রাখুন, RBAC দিয়ে কে পড়তে পারে সীমিত করুন, ও authentication ছাড়া কখনো API সার্ভার বা dashboard পাবলিক ইন্টারনেটে খুলবেন না।'),
        ] },
        { code: `# a hardened pod: non-root, no privilege escalation, dropped capabilities
apiVersion: v1
kind: Pod
metadata:
  name: web
spec:
  securityContext:
    runAsNonRoot: true
    runAsUser: 1000
  containers:
    - name: web
      image: myorg/web@sha256:abc123   # pinned by digest, scanned before use
      securityContext:
        allowPrivilegeEscalation: false
        readOnlyRootFilesystem: true
        capabilities:
          drop: ["ALL"]`, caption: l('This pod cannot run as root, cannot gain new privileges, cannot write to its root filesystem, and holds no Linux capabilities — so a breach inside it has very little to work with.', 'এই pod root হিসেবে চলতে পারে না, নতুন privilege পেতে পারে না, তার root filesystem-এ লিখতে পারে না, ও কোনো Linux capability রাখে না—তাই এর ভেতরের একটি আপসের কাজে লাগানোর মতো খুব কমই থাকে।') },
      ],
    },
    {
      h: l('The security layers at a glance', 'নিরাপত্তা স্তরগুলো এক নজরে'),
      blocks: [
        { table: {
          head: [l('Layer', 'স্তর'), l('What it controls', 'যা নিয়ন্ত্রণ করে'), l('Building analogy', 'ভবন উপমা')],
          rows: [
            [l('RBAC', 'RBAC'), l('Who and what may call the API, and with which verbs.', 'কে ও কী API কল করতে পারে, ও কোন verb দিয়ে।'), l('ID badges that open only certain doors.', 'আইডি ব্যাজ যা শুধু নির্দিষ্ট দরজা খোলে।')],
            [l('Pod security (non-root)', 'Pod security (non-root)'), l('What a container may do on its node.', 'একটি container তার নোডে কী করতে পারে।'), l('Locked rooms that limit what a visitor can touch.', 'তালাবদ্ধ ঘর যা একজন অতিথি কী ছুঁতে পারে সীমিত করে।')],
            [l('NetworkPolicy', 'NetworkPolicy'), l('Which pods may send traffic to which pods.', 'কোন pod কোন pod-এ ট্রাফিক পাঠাতে পারে।'), l('Restricted hallways between departments.', 'বিভাগগুলোর মধ্যে সীমিত করিডোর।')],
            [l('Scanned images', 'Scanned images'), l('What code is allowed to run in the first place.', 'প্রথমেই কোন কোড চালানোর অনুমতি।'), l('Inspected deliveries at the loading dock.', 'লোডিং ডকে পরিদর্শিত ডেলিভারি।')],
          ],
        } },
        { p: l('This is defense in depth for a building — ID badges, locked rooms, restricted hallways, and inspected deliveries. No single control is enough on its own, but together they mean an attacker must defeat several independent barriers, and each one they clear still leaves them boxed into a small area.', 'এটি একটি ভবনে গভীর প্রতিরক্ষা—আইডি ব্যাজ, তালাবদ্ধ ঘর, সীমিত করিডোর ও পরিদর্শিত ডেলিভারি। কোনো একক নিয়ন্ত্রণ নিজে যথেষ্ট নয়, তবে একসঙ্গে এদের মানে একজন আক্রমণকারীকে কয়েকটি স্বাধীন বাধা পার হতে হবে, আর তারা যেটি পার হয় তাও তাদের একটি ছোট এলাকায় বন্দি রাখে।') },
      ],
    },
    {
      h: l('When and where to apply each control', 'কখন ও কোথায় প্রতিটি নিয়ন্ত্রণ প্রয়োগ করবেন'),
      blocks: [
        { p: l('Run pods as non-root with minimal privileges, restrict traffic with NetworkPolicies, and scope RBAC tightly from the start of every project — retrofitting security onto a running system is far harder than building it in. Non-root and dropped capabilities cost nothing and should be the default for every workload. Image scanning belongs in your CI pipeline, so a vulnerable image is caught before it ever reaches the cluster. RBAC should follow least privilege: start from zero access and grant exactly what each service needs, rather than starting from cluster-admin and trying to take permissions away.', 'প্রতিটি প্রকল্পের শুরু থেকে পড নন-রুট ন্যূনতম সুবিধায় চালান, NetworkPolicy দিয়ে ট্রাফিক সীমিত করুন, ও RBAC কড়াভাবে স্কোপ করুন—একটি চলমান সিস্টেমে পরে নিরাপত্তা বসানো তা শুরুতেই গড়ার চেয়ে অনেক কঠিন। non-root ও বাদ দেওয়া capability কিছুই খরচ করে না ও প্রতিটি ওয়ার্কলোডের ডিফল্ট হওয়া উচিত। image scanning আপনার CI পাইপলাইনে থাকা উচিত, যাতে একটি দুর্বল image ক্লাস্টারে পৌঁছানোর আগেই ধরা পড়ে। RBAC least privilege অনুসরণ করা উচিত: শূন্য অ্যাক্সেস থেকে শুরু করে প্রতিটি সার্ভিসের ঠিক যা দরকার তা দিন, cluster-admin থেকে শুরু করে অনুমতি কেড়ে নেওয়ার চেষ্টা নয়।') },
        { p: l('The trade-off is real: layered hardening greatly cuts risk, but each control adds configuration and can block legitimate workloads if misapplied. A too-strict NetworkPolicy can silently break a service that needs to reach the database; a read-only filesystem breaks an app that writes temp files; a missing RBAC grant makes a controller fail. So roll controls out deliberately — test in a non-production namespace, watch for denied requests, and widen a rule only as far as a real need requires. The goal is the tightest configuration that still lets the app work.', 'ট্রেড-অফটি বাস্তব: স্তরিত কঠোরতা ঝুঁকি অনেক কমায়, তবে প্রতিটি নিয়ন্ত্রণ কনফিগারেশন যোগ করে ও ভুল প্রয়োগে বৈধ ওয়ার্কলোড ব্লক করতে পারে। একটি অতি-কড়া NetworkPolicy database-এ পৌঁছাতে হওয়া একটি সার্ভিস নীরবে ভাঙতে পারে; একটি read-only filesystem temp ফাইল লেখা একটি অ্যাপ ভাঙে; একটি অনুপস্থিত RBAC grant একটি controller ব্যর্থ করে। তাই নিয়ন্ত্রণ সচেতনভাবে ছাড়ুন—একটি non-production namespace-এ টেস্ট করুন, denied রিকোয়েস্ট দেখুন, ও একটি নিয়ম শুধু একটি সত্যিকারের প্রয়োজন যতটা দাবি করে ততটাই প্রশস্ত করুন। লক্ষ্য হলো সবচেয়ে কড়া কনফিগারেশন যা এখনো অ্যাপ চলতে দেয়।') },
      ],
    },
    {
      h: l('Common mistakes', 'সাধারণ ভুল'),
      blocks: [
        { list: [
          l('Running everything as root cluster-admin for convenience, so one compromised pod owns the whole cluster.', 'সুবিধার জন্য সবকিছু root cluster-admin হিসেবে চালানো, ফলে একটি আপসকৃত পড পুরো ক্লাস্টার দখল করে।'),
          l('Granting cluster-admin to an app’s service account for convenience, massively widening the blast radius when that pod is breached.', 'সুবিধার জন্য একটি অ্যাপের service account-এ cluster-admin দেওয়া, সেই pod আপস হলে blast radius ব্যাপকভাবে বাড়ানো।'),
          l('Leaving the cluster flat with no NetworkPolicies, so a single breached pod can reach the database and every other service unimpeded.', 'ক্লাস্টার কোনো NetworkPolicy ছাড়া সমতল রাখা, ফলে একটি আপসকৃত pod বিনা বাধায় database ও প্রতিটি সার্ভিসে পৌঁছাতে পারে।'),
          l('Running unscanned images or the :latest tag, so you have no idea what version — or which known vulnerabilities — you are actually running.', 'unscanned image বা :latest tag চালানো, ফলে আসলে কোন ভার্সন—বা কোন পরিচিত দুর্বলতা—চালাচ্ছেন তার কোনো ধারণা নেই।'),
          l('Committing Secrets to git or exposing the API server / dashboard publicly, handing attackers the keys directly.', 'git-এ Secret কমিট করা বা API সার্ভার / dashboard পাবলিকভাবে খোলা, আক্রমণকারীর হাতে সরাসরি চাবি তুলে দেওয়া।'),
        ] },
      ],
    },
    {
      h: l('Remember in one line', 'এক লাইনে মনে রাখুন'),
      blocks: [
        { list: [
          l('Secure a cluster in layers: RBAC, non-root least-privilege pods, NetworkPolicies, and scanned images — defense in depth.', 'একটি ক্লাস্টার স্তরে নিরাপদ করুন: RBAC, non-root least-privilege pod, NetworkPolicy, ও scanned image—গভীর প্রতিরক্ষা।'),
          l('Least privilege everywhere: start from zero and grant only what is needed, so one breach cannot spread.', 'সর্বত্র least privilege: শূন্য থেকে শুরু করে শুধু প্রয়োজনীয়টা দিন, যাতে একটি আপস ছড়াতে না পারে।'),
          l('Never run app pods as cluster-admin or root — that turns any single compromise into a full cluster takeover.', 'অ্যাপ pod কখনো cluster-admin বা root হিসেবে চালাবেন না—তা যেকোনো একটি আপসকে পূর্ণ ক্লাস্টার দখলে পরিণত করে।'),
        ] },
      ],
    },
  ],

  // ── k8s-gitops · GitOps & declarative deploys ─────────────────────────────
  'k8s-gitops': [
    {
      h: l('What is GitOps?', 'GitOps কী?'),
      blocks: [
        { p: l('GitOps makes a git repository the single source of truth; a tool continuously syncs the cluster to match the committed manifests. Instead of engineers running kubectl apply from their laptops to change the cluster, you commit the desired state — your Deployments, Services, and config — to a git repo, and an in-cluster agent (Argo CD or Flux) watches that repo and makes the live cluster match it. Every change to production is therefore a git commit: reviewed in a pull request, recorded in history, and reversible by reverting a commit.', 'GitOps একটি git রিপোজিটরিকে সত্যের একক উৎস করে; একটি টুল অবিরত ক্লাস্টারকে কমিট করা ম্যানিফেস্টের সঙ্গে সিংক করে। ইঞ্জিনিয়াররা ল্যাপটপ থেকে kubectl apply চালিয়ে ক্লাস্টার বদলানোর বদলে, আপনি কাঙ্ক্ষিত অবস্থা—আপনার Deployment, Service ও config—একটি git রিপোতে কমিট করেন, আর একটি in-cluster agent (Argo CD বা Flux) সেই রিপো দেখে ও লাইভ ক্লাস্টারকে তার সঙ্গে মেলায়। তাই প্রোডাকশনে প্রতিটি পরিবর্তন একটি git commit: একটি pull request-এ রিভিউ করা, ইতিহাসে রেকর্ড করা, ও একটি commit revert করে ফেরানোযোগ্য।') },
        { p: l('This builds directly on Kubernetes being declarative. You already describe the desired state in YAML and let the cluster reconcile toward it; GitOps simply moves the authoritative copy of that YAML out of the cluster and into git, and puts a robot in charge of applying it. The problem it solves is the chaos of manual, undocumented changes: when anyone can run kubectl edit against production, nobody knows the true current configuration, changes are unreviewed, and rebuilding the cluster after a disaster means guessing. With GitOps, the repo is the configuration, and the cluster is just its running reflection.', 'এটি সরাসরি কুবারনেটিসের declarative হওয়ার ওপর গড়ে। আপনি ইতিমধ্যে YAML-এ কাঙ্ক্ষিত অবস্থা বর্ণনা করেন ও ক্লাস্টারকে তার দিকে reconcile করতে দেন; GitOps শুধু সেই YAML-এর প্রামাণিক কপি ক্লাস্টারের বাইরে git-এ সরায় ও এটি apply করার দায়িত্বে একটি রোবট বসায়। এটি যে সমস্যা সমাধান করে তা হলো ম্যানুয়াল, নথিহীন পরিবর্তনের বিশৃঙ্খলা: যখন যে কেউ প্রোডাকশনে kubectl edit চালাতে পারে, তখন কেউ প্রকৃত বর্তমান কনফিগারেশন জানে না, পরিবর্তন রিভিউহীন, আর একটি বিপর্যয়ের পর ক্লাস্টার পুনর্গঠন মানে অনুমান। GitOps-এ রিপোই কনফিগারেশন, আর ক্লাস্টার শুধু তার চলমান প্রতিফলন।') },
        { note: l('GitOps is a self-correcting autopilot that always flies the route written in the flight plan (git), correcting any drift. If someone nudges the controls by hand, the autopilot notices and steers back to the plan — so the written route and the actual path never diverge for long.', 'GitOps একটি স্ব-সংশোধনী অটোপাইলট যা সবসময় ফ্লাইট প্ল্যানে (git) লেখা রুটে ওড়ে, যেকোনো drift সংশোধন করে। কেউ হাতে কন্ট্রোল নাড়ালে অটোপাইলট টের পায় ও পরিকল্পনায় ফিরে চালায়—তাই লেখা রুট ও প্রকৃত পথ বেশিক্ষণ আলাদা থাকে না।'), kind: 'tip' },
      ],
    },
    {
      h: l('How GitOps reconciliation works', 'GitOps reconciliation কীভাবে কাজ করে'),
      blocks: [
        { steps: [
          l('You store all manifests in git — a repo (or a folder per environment) that holds every Deployment, Service, ConfigMap, and Helm values file that defines your desired state.', 'সব ম্যানিফেস্ট git-এ রাখুন—একটি রিপো (বা প্রতি এনভায়রনমেন্টে একটি ফোল্ডার) যা প্রতিটি Deployment, Service, ConfigMap ও Helm values ফাইল রাখে যা আপনার কাঙ্ক্ষিত অবস্থা সংজ্ঞায়িত করে।'),
          l('An agent installed in the cluster (Argo CD or Flux) is pointed at that repo and given credentials to change the cluster.', 'ক্লাস্টারে ইনস্টল করা একটি agent (Argo CD বা Flux)-কে সেই রিপোর দিকে তাক করা হয় ও ক্লাস্টার বদলানোর credential দেওয়া হয়।'),
          l('The agent continuously compares two things: the desired state in git and the actual state in the cluster. Any difference is called drift.', 'agent অবিরত দুটি জিনিস তুলনা করে: git-এ কাঙ্ক্ষিত অবস্থা ও ক্লাস্টারে প্রকৃত অবস্থা। যেকোনো পার্থক্যকে drift বলে।'),
          l('When you merge a commit that changes a manifest, the agent detects the new desired state and applies it — this is the deploy, triggered by git, not by a person running kubectl.', 'আপনি একটি ম্যানিফেস্ট বদলানো commit মার্জ করলে, agent নতুন কাঙ্ক্ষিত অবস্থা শনাক্ত করে ও তা apply করে—এটাই deploy, git দ্বারা ট্রিগার, একজন মানুষ kubectl চালিয়ে নয়।'),
          l('If someone changes the cluster out of band (a manual kubectl edit), the agent sees the drift and reverts it back to what git says — so git and the cluster stay in sync automatically.', 'কেউ ক্লাস্টার আউট-অফ-ব্যান্ড বদলালে (একটি ম্যানুয়াল kubectl edit), agent drift দেখে ও git যা বলে তাতে ফিরিয়ে দেয়—তাই git ও ক্লাস্টার স্বয়ংক্রিয়ভাবে সিংকে থাকে।'),
        ] },
        { code: `# GitOps deploy = a normal git workflow, no kubectl against prod
git checkout -b bump-web-image
# edit deploy.yaml: image nginx:1.25 -> nginx:1.26
git commit -am "web: upgrade to nginx 1.26"
git push        # open a pull request, get it reviewed, merge

# no kubectl apply here — Argo CD / Flux sees the merged commit and
# reconciles the cluster to match. To undo, revert the commit:
git revert HEAD && git push`, caption: l('The engineer only ever touches git. The in-cluster agent turns each merged commit into a deploy, and a reverted commit into a rollback.', 'ইঞ্জিনিয়ার শুধু git-এ হাত দেয়। in-cluster agent প্রতিটি মার্জ করা commit-কে একটি deploy-এ, আর একটি revert করা commit-কে একটি rollback-এ পরিণত করে।') },
      ],
    },
    {
      h: l('Core pieces of a GitOps setup', 'একটি GitOps সেটআপের মূল অংশ'),
      blocks: [
        { table: {
          head: [l('Piece', 'অংশ'), l('Its job', 'কাজ')],
          rows: [
            [l('Git repository', 'Git repository'), l('The single source of truth — holds the desired state as committed manifests.', 'সত্যের একক উৎস—কমিট করা ম্যানিফেস্ট হিসেবে কাঙ্ক্ষিত অবস্থা রাখে।')],
            [l('Agent (Argo CD / Flux)', 'Agent (Argo CD / Flux)'), l('Runs in the cluster, watches the repo, and applies changes.', 'ক্লাস্টারে চলে, রিপো দেখে, ও পরিবর্তন apply করে।')],
            [l('Reconcile loop', 'Reconcile loop'), l('Continuously compares git vs cluster and closes the gap.', 'অবিরত git বনাম ক্লাস্টার তুলনা করে ও ব্যবধান বন্ধ করে।')],
            [l('Drift correction', 'Drift correction'), l('Reverts out-of-band changes so the cluster always matches git.', 'আউট-অফ-ব্যান্ড পরিবর্তন ফিরিয়ে দেয় যাতে ক্লাস্টার সবসময় git-এর সঙ্গে মেলে।')],
          ],
        } },
        { p: l('Note the direction: the agent pulls from git rather than a CI pipeline pushing to the cluster. That means the cluster credentials never leave the cluster — CI does not need them — which is more secure, and the agent can keep reconciling even when your pipeline is idle. Argo CD adds a web UI that shows, per app, whether it is in sync or drifting; Flux is more controller-driven and CLI-first, but both implement the same pull-and-reconcile model.', 'দিকটি খেয়াল করুন: agent git থেকে টানে, একটি CI পাইপলাইন ক্লাস্টারে push করার বদলে। এর মানে ক্লাস্টার credential কখনো ক্লাস্টার ছাড়ে না—CI-এর সেগুলো দরকার নেই—যা বেশি নিরাপদ, আর আপনার পাইপলাইন নিষ্ক্রিয় থাকলেও agent reconcile চালিয়ে যেতে পারে। Argo CD একটি web UI যোগ করে যা প্রতি অ্যাপে দেখায় এটি সিংকে না drift করছে; Flux বেশি controller-চালিত ও CLI-first, তবে দুটোই একই pull-and-reconcile মডেল বাস্তবায়ন করে।') },
      ],
    },
    {
      h: l('When and where to use GitOps', 'কখন ও কোথায় GitOps ব্যবহার করবেন'),
      blocks: [
        { p: l('Store all manifests in git and let a GitOps tool (Argo CD, Flux) apply and reconcile them automatically once you have more than a toy cluster or more than one person touching it. GitOps gives auditable, reversible deploys: every production change is a reviewed commit, git log is a complete history of who changed what and when, and rolling back is git revert rather than a frantic manual fix. It also makes disaster recovery straightforward — point the agent at the repo against a fresh cluster and the entire environment rebuilds itself. Teams running several environments, or needing compliance and audit trails, benefit the most.', 'একটি খেলনা ক্লাস্টারের বেশি বা একজনের বেশি মানুষ এতে হাত দিলে সব ম্যানিফেস্ট git-এ রাখুন ও একটি GitOps টুল (Argo CD, Flux)-কে স্বয়ংক্রিয়ভাবে apply ও reconcile করতে দিন। GitOps অডিটযোগ্য, রিভার্সিবল ডিপ্লয় দেয়: প্রতিটি প্রোডাকশন পরিবর্তন একটি রিভিউ করা commit, git log হলো কে কী কখন বদলেছে তার সম্পূর্ণ ইতিহাস, আর রোলব্যাক হলো একটি উদ্বিগ্ন ম্যানুয়াল ফিক্সের বদলে git revert। এটি disaster recovery-ও সহজ করে—একটি টাটকা ক্লাস্টারে agent-কে রিপোর দিকে তাক করুন আর পুরো এনভায়রনমেন্ট নিজেকে পুনর্গঠন করে। কয়েকটি এনভায়রনমেন্ট চালানো, বা compliance ও audit trail দরকার এমন টিম সবচেয়ে বেশি উপকৃত হয়।') },
        { p: l('The catch is discipline: GitOps requires that git be the only way to change the cluster, because out-of-band kubectl changes get reverted by the sync. If your team is used to quick manual fixes in production, GitOps will feel restrictive at first — but that restriction is the whole point, since it is what keeps git and reality identical. For a tiny throwaway cluster or fast local experimentation, the setup cost may not be worth it; there, plain kubectl or Helm is fine. GitOps pays off precisely when consistency, review, and recoverability matter.', 'বাধাটি হলো শৃঙ্খলা: GitOps দাবি করে git-ই ক্লাস্টার বদলানোর একমাত্র উপায় হোক, কারণ আউট-অফ-ব্যান্ড kubectl পরিবর্তন সিংক ফিরিয়ে দেয়। আপনার টিম যদি প্রোডাকশনে দ্রুত ম্যানুয়াল ফিক্সে অভ্যস্ত হয়, GitOps প্রথমে সীমাবদ্ধ মনে হবে—কিন্তু সেই সীমাবদ্ধতাই মূল উদ্দেশ্য, কারণ এটাই git ও বাস্তবকে অভিন্ন রাখে। একটি ছোট ফেলে-দেওয়া ক্লাস্টার বা দ্রুত লোকাল পরীক্ষার জন্য সেটআপ খরচ যথার্থ না-ও হতে পারে; সেখানে সাধারণ kubectl বা Helm ঠিক আছে। GitOps ঠিক তখনই লাভজনক যখন সামঞ্জস্য, রিভিউ ও পুনরুদ্ধারযোগ্যতা গুরুত্বপূর্ণ।') },
      ],
    },
    {
      h: l('Common mistakes', 'সাধারণ ভুল'),
      blocks: [
        { list: [
          l('Mixing manual kubectl edits with GitOps, then being confused when the tool reverts your live changes — in GitOps the fix belongs in git, not the cluster.', 'GitOps-এর সঙ্গে ম্যানুয়াল kubectl এডিট মেশানো, তারপর টুল আপনার লাইভ পরিবর্তন ফেরালে বিভ্রান্ত হওয়া—GitOps-এ সমাধান git-এ, ক্লাস্টারে নয়।'),
          l('Committing plaintext Secrets to the git repo, since the repo is now the source of truth and leaks everything it holds; use sealed/encrypted secrets instead.', 'git রিপোতে plaintext Secret কমিট করা, যেহেতু রিপো এখন সত্যের উৎস ও যা রাখে সব ফাঁস করে; বদলে sealed/encrypted secret ব্যবহার করুন।'),
          l('Disabling auto-sync or ignoring drift alerts, which quietly reintroduces the very manual-drift problem GitOps was meant to eliminate.', 'auto-sync বন্ধ করা বা drift অ্যালার্ট উপেক্ষা করা, যা নীরবে ঠিক সেই ম্যানুয়াল-drift সমস্যা ফিরিয়ে আনে যা GitOps দূর করার কথা ছিল।'),
          l('Putting environment-specific values in the wrong place, so dev config accidentally reconciles into production.', 'এনভায়রনমেন্ট-নির্দিষ্ট value ভুল জায়গায় রাখা, ফলে dev config ভুলবশত প্রোডাকশনে reconcile হয়।'),
        ] },
      ],
    },
    {
      h: l('Remember in one line', 'এক লাইনে মনে রাখুন'),
      blocks: [
        { list: [
          l('GitOps makes git the single source of truth; an in-cluster agent (Argo CD / Flux) continuously reconciles the cluster to match it.', 'GitOps git-কে সত্যের একক উৎস করে; একটি in-cluster agent (Argo CD / Flux) অবিরত ক্লাস্টারকে তার সঙ্গে reconcile করে।'),
          l('Deploy by merging a commit, roll back by reverting one — every change is reviewed, audited, and reversible.', 'একটি commit মার্জ করে deploy, একটি revert করে rollback—প্রতিটি পরিবর্তন রিভিউ করা, অডিট করা ও ফেরানোযোগ্য।'),
          l('Never edit the cluster by hand under GitOps; the sync will revert you — put the change in git instead.', 'GitOps-এ কখনো হাতে ক্লাস্টার এডিট করবেন না; সিংক আপনাকে ফেরাবে—বদলে পরিবর্তনটি git-এ রাখুন।'),
        ] },
      ],
    },
  ],

  // ── k8s-managed · Managed Kubernetes ──────────────────────────────────────
  'k8s-managed': [
    {
      h: l('What is managed Kubernetes?', 'ম্যানেজড কুবারনেটিস কী?'),
      blocks: [
        { p: l('Managed Kubernetes (EKS, GKE, AKS) runs the control plane for you, so you only manage worker nodes and workloads. A Kubernetes cluster has two halves: the control plane — the API server, scheduler, controller manager, and the etcd database that stores all cluster state — and the worker nodes that actually run your pods. Operating the control plane yourself means installing, securing, upgrading, and backing up all of those components, and keeping etcd healthy, highly available, and never corrupted. A managed service hands that entire half to a cloud provider, who runs it as a reliable, always-on service behind a single API endpoint you talk to.', 'ম্যানেজড কুবারনেটিস (EKS, GKE, AKS) আপনার জন্য কন্ট্রোল প্লেন চালায়, তাই আপনি শুধু ওয়ার্কার নোড ও ওয়ার্কলোড সামলান। একটি কুবারনেটিস ক্লাস্টারের দুটি অর্ধ আছে: কন্ট্রোল প্লেন—API সার্ভার, scheduler, controller manager, ও সব ক্লাস্টার state রাখা etcd ডেটাবেস—এবং ওয়ার্কার নোড যা আসলে আপনার pod চালায়। কন্ট্রোল প্লেন নিজে চালানো মানে সেই সব উপাদান ইনস্টল, নিরাপদ, আপগ্রেড ও ব্যাকআপ করা, আর etcd-কে সুস্থ, highly available ও কখনো নষ্ট না-হওয়া রাখা। একটি ম্যানেজড সার্ভিস সেই পুরো অর্ধটি একটি ক্লাউড প্রদানকারীকে দেয়, যে এটিকে একটি নির্ভরযোগ্য, সর্বদা-চালু সার্ভিস হিসেবে একটি একক API endpoint-এর পেছনে চালায় যার সঙ্গে আপনি কথা বলেন।') },
        { p: l('The problem this solves is operational burden. Running a production-grade control plane — multi-node etcd with backups, certificate rotation, secure upgrades with no downtime — is genuinely hard, full-time work that has nothing to do with your actual application. Managed Kubernetes lets a small team run production clusters without a dedicated platform team: use a managed service to skip control-plane upgrades and etcd operations, and focus on your apps. You still get a standard, conformant Kubernetes; you just do not babysit its most fragile internals.', 'এটি যে সমস্যা সমাধান করে তা হলো অপারেশনাল বোঝা। একটি production-grade কন্ট্রোল প্লেন চালানো—ব্যাকআপসহ multi-node etcd, certificate rotation, ডাউনটাইম ছাড়া নিরাপদ আপগ্রেড—সত্যিই কঠিন, পূর্ণ-সময়ের কাজ যার আপনার আসল অ্যাপ্লিকেশনের সঙ্গে কোনো সম্পর্ক নেই। ম্যানেজড কুবারনেটিস একটি ছোট টিমকে একটি নিবেদিত platform টিম ছাড়াই production ক্লাস্টার চালাতে দেয়: কন্ট্রোল-প্লেন আপগ্রেড ও etcd অপারেশন এড়াতে ও অ্যাপে মনোযোগ দিতে একটি ম্যানেজড সার্ভিস ব্যবহার করুন। আপনি এখনো একটি প্রমিত, conformant কুবারনেটিস পান; শুধু এর সবচেয়ে ভঙ্গুর অভ্যন্তরটি সামলাতে হয় না।') },
        { note: l('Managed Kubernetes is like renting a fully staffed venue instead of building and running the whole building yourself. The provider handles the plumbing, wiring, and structural upkeep (the control plane), and you focus on the event you are hosting (your workloads) — but you still arrange your own furniture, guest list, and security.', 'ম্যানেজড কুবারনেটিস হলো পুরো ভবন নিজে বানিয়ে চালানোর বদলে একটি সম্পূর্ণ-স্টাফড ভেন্যু ভাড়া নেওয়ার মতো। প্রদানকারী নলপথ, তার ও কাঠামোগত রক্ষণাবেক্ষণ (কন্ট্রোল প্লেন) সামলায়, আর আপনি আপনার আয়োজন করা অনুষ্ঠানে (আপনার ওয়ার্কলোড) মনোযোগ দেন—তবে আপনি এখনো নিজের আসবাব, অতিথি তালিকা ও নিরাপত্তা সাজান।'), kind: 'tip' },
      ],
    },
    {
      h: l('How a managed cluster works', 'একটি ম্যানেজড ক্লাস্টার কীভাবে কাজ করে'),
      blocks: [
        { steps: [
          l('You ask the provider to create a cluster. It provisions and runs the control plane (API server, scheduler, etcd) on infrastructure you never see or log into.', 'আপনি প্রদানকারীকে একটি ক্লাস্টার তৈরি করতে বলেন। এটি কন্ট্রোল প্লেন (API সার্ভার, scheduler, etcd) এমন infrastructure-এ provision ও চালায় যা আপনি কখনো দেখেন না বা লগইন করেন না।'),
          l('You add worker nodes — usually as a managed node group or an autoscaling pool of VMs — which join the control plane and run your pods.', 'আপনি ওয়ার্কার নোড যোগ করেন—সাধারণত একটি managed node group বা VM-এর একটি autoscaling pool হিসেবে—যা কন্ট্রোল প্লেনে যোগ দেয় ও আপনার pod চালায়।'),
          l('You get a kubeconfig and use kubectl and Helm exactly as on any cluster; the API server just happens to be the provider’s managed one.', 'আপনি একটি kubeconfig পান ও যেকোনো ক্লাস্টারের মতোই kubectl ও Helm ব্যবহার করেন; API সার্ভার শুধু প্রদানকারীর ম্যানেজড-টা হয়ে যায়।'),
          l('When a new Kubernetes version ships, you trigger the control-plane upgrade with one action and the provider performs it safely; you then upgrade your node groups on your own schedule.', 'একটি নতুন কুবারনেটিস ভার্সন এলে, আপনি এক ক্রিয়ায় কন্ট্রোল-প্লেন আপগ্রেড ট্রিগার করেন ও প্রদানকারী তা নিরাপদে করে; তারপর আপনি নিজের সময়সূচিতে আপনার node group আপগ্রেড করেন।'),
          l('The provider integrates cloud extras — load balancers, block storage, IAM identity for pods — so a Service of type LoadBalancer or a PersistentVolumeClaim provisions real cloud resources automatically.', 'প্রদানকারী ক্লাউড অতিরিক্ত জিনিস একীভূত করে—load balancer, block storage, pod-এর জন্য IAM identity—যাতে type LoadBalancer-এর একটি Service বা একটি PersistentVolumeClaim স্বয়ংক্রিয়ভাবে আসল ক্লাউড রিসোর্স provision করে।'),
        ] },
        { code: `# create a managed cluster and node pool (provider CLIs differ slightly)
gcloud container clusters create prod --num-nodes=3        # GKE
eksctl create cluster --name prod --nodes 3                # EKS
az aks create -g rg -n prod --node-count 3                 # AKS

# from here it is a normal cluster — the control plane is the provider's
kubectl get nodes            # your worker nodes; control plane is hidden
helm install web repo/nginx  # deploy exactly as anywhere else`, caption: l('One command provisions the managed control plane plus worker nodes. After that, kubectl and Helm behave identically to any other cluster — you simply never touch etcd or the API server hosts.', 'এক কমান্ড ম্যানেজড কন্ট্রোল প্লেন ও ওয়ার্কার নোড provision করে। তারপর kubectl ও Helm যেকোনো ক্লাস্টারের মতোই আচরণ করে—আপনি শুধু etcd বা API সার্ভার হোস্ট কখনো ছোঁন না।') },
      ],
    },
    {
      h: l('Who does what: the shared responsibility', 'কে কী করে: ভাগ করা দায়িত্ব'),
      blocks: [
        { table: {
          head: [l('Responsibility', 'দায়িত্ব'), l('Managed by provider', 'প্রদানকারী সামলায়'), l('Still yours', 'এখনো আপনার')],
          rows: [
            [l('Control plane (API server, etcd, scheduler)', 'কন্ট্রোল প্লেন (API server, etcd, scheduler)'), l('Yes — provisioned, patched, backed up, kept available.', 'হ্যাঁ—provision, patch, backup ও available রাখা।'), l('No', 'না')],
            [l('Control-plane upgrades', 'কন্ট্রোল-প্লেন আপগ্রেড'), l('Performed for you (you choose when).', 'আপনার জন্য করা হয় (কখন আপনি বাছেন)।'), l('Trigger / timing', 'ট্রিগার / সময়')],
            [l('Worker nodes & sizing', 'ওয়ার্কার নোড ও sizing'), l('Infrastructure only', 'শুধু infrastructure'), l('You pick counts, sizes, autoscaling, node upgrades.', 'আপনি সংখ্যা, আকার, autoscaling, নোড আপগ্রেড বাছেন।')],
            [l('Workloads, RBAC, network policy, cost', 'ওয়ার্কলোড, RBAC, network policy, খরচ'), l('No', 'না'), l('Entirely yours to design and secure.', 'সম্পূর্ণ আপনার ডিজাইন ও নিরাপদ করার।')],
          ],
        } },
        { note: l('Assuming managed means hands-off is the classic trap: you still own node sizing, workload upgrades, security, and cost. The provider keeps the control plane alive — it does not right-size your nodes, write your NetworkPolicies, patch your images, or stop you overspending.', 'ধরে নেওয়া ম্যানেজড মানে হাত-ছাড়া—এটাই ক্লাসিক ফাঁদ: আপনি এখনো নোড সাইজিং, ওয়ার্কলোড আপগ্রেড, নিরাপত্তা ও খরচের মালিক। প্রদানকারী কন্ট্রোল প্লেন সচল রাখে—এটি আপনার নোড right-size করে না, আপনার NetworkPolicy লেখে না, আপনার image patch করে না, বা আপনাকে অতিরিক্ত খরচ থেকে থামায় না।'), kind: 'warn' },
      ],
    },
    {
      h: l('When and where to use it', 'কখন ও কোথায় ব্যবহার করবেন'),
      blocks: [
        { p: l('Reach for managed Kubernetes for almost any production workload on a cloud, especially when your team is small or has no dedicated platform engineers. Managed clusters remove huge operational burden, letting a handful of developers run reliable, upgradeable, highly available clusters that would otherwise need a full-time team to keep the control plane and etcd healthy. If you are already on AWS, Google Cloud, or Azure, EKS, GKE, or AKS is usually the default and lowest-risk way to run Kubernetes, and it integrates cleanly with that cloud’s load balancers, storage, and identity.', 'একটি ক্লাউডে প্রায় যেকোনো production ওয়ার্কলোডের জন্য ম্যানেজড কুবারনেটিস নিন, বিশেষত যখন আপনার টিম ছোট বা কোনো নিবেদিত platform ইঞ্জিনিয়ার নেই। ম্যানেজড ক্লাস্টার বিশাল অপারেশনাল বোঝা সরায়, মুষ্টিমেয় ডেভেলপারকে নির্ভরযোগ্য, আপগ্রেডযোগ্য, highly available ক্লাস্টার চালাতে দেয় যা নাহলে কন্ট্রোল প্লেন ও etcd সুস্থ রাখতে একটি পূর্ণ-সময়ের টিম লাগত। আপনি ইতিমধ্যে AWS, Google Cloud বা Azure-এ থাকলে, EKS, GKE বা AKS সাধারণত কুবারনেটিস চালানোর ডিফল্ট ও সবচেয়ে কম-ঝুঁকির উপায়, ও এটি সেই ক্লাউডের load balancer, storage ও identity-র সঙ্গে পরিষ্কারভাবে একীভূত হয়।') },
        { p: l('Consider self-managing (or a distribution like kubeadm, k3s, or on-prem) only when you have specific reasons: strict data-residency or air-gapped requirements, a need to run on your own hardware, or an existing platform team that wants full control over every component. The trade-off is that managed clusters remove huge operational burden, but you trade some control and pay the provider’s premium. You cannot tweak the API server flags, you are limited to the versions the provider offers, and the managed control plane carries a per-cluster fee on top of the nodes. For most teams that trade is well worth it; the exception is when control or locality is a hard requirement.', 'নিজে-সামলানো (বা kubeadm, k3s-এর মতো একটি distribution, বা on-prem) শুধু তখনই বিবেচনা করুন যখন নির্দিষ্ট কারণ আছে: কড়া data-residency বা air-gapped প্রয়োজন, নিজের hardware-এ চালানোর দরকার, বা একটি বিদ্যমান platform টিম যে প্রতিটি উপাদানের ওপর পূর্ণ নিয়ন্ত্রণ চায়। ট্রেড-অফ হলো ম্যানেজড ক্লাস্টার বিশাল অপারেশনাল বোঝা সরায়, তবে কিছু নিয়ন্ত্রণ ছাড়েন ও প্রদানকারীর প্রিমিয়াম দেন। আপনি API সার্ভার flag টিউন করতে পারেন না, প্রদানকারীর দেওয়া ভার্সনে সীমিত, আর ম্যানেজড কন্ট্রোল প্লেন নোডের ওপর একটি per-cluster fee বহন করে। বেশিরভাগ টিমের জন্য সেই ট্রেড ভালোভাবেই যথার্থ; ব্যতিক্রম হলো যখন নিয়ন্ত্রণ বা locality একটি কঠিন প্রয়োজন।') },
      ],
    },
    {
      h: l('Common mistakes', 'সাধারণ ভুল'),
      blocks: [
        { list: [
          l('Assuming managed means hands-off; you still own node sizing, workload upgrades, security, and cost.', 'ধরে নেওয়া ম্যানেজড মানে হাত-ছাড়া; আপনি এখনো নোড সাইজিং, ওয়ার্কলোড আপগ্রেড, নিরাপত্তা ও খরচের মালিক।'),
          l('Never upgrading node groups after the control plane upgrades, letting nodes drift far behind and eventually fall out of the supported version skew.', 'কন্ট্রোল প্লেন আপগ্রেডের পর node group কখনো আপগ্রেড না করা, নোডকে অনেক পিছিয়ে পড়তে ও শেষে সমর্থিত ভার্সন skew-এর বাইরে যেতে দেওয়া।'),
          l('Over-provisioning nodes and forgetting autoscaling, so you pay for idle capacity — the provider will not right-size for you.', 'নোড over-provision করা ও autoscaling ভুলে যাওয়া, ফলে idle ক্ষমতার জন্য টাকা দেন—প্রদানকারী আপনার জন্য right-size করবে না।'),
          l('Relying on the provider for security and skipping RBAC, NetworkPolicies, and image scanning, which remain entirely your responsibility.', 'নিরাপত্তার জন্য প্রদানকারীর ওপর নির্ভর করা ও RBAC, NetworkPolicy ও image scanning বাদ দেওয়া, যা সম্পূর্ণ আপনার দায়িত্ব থাকে।'),
          l('Not backing up your own application data, assuming a managed control plane also protects your databases and volumes — it does not.', 'নিজের অ্যাপ্লিকেশন ডেটা ব্যাকআপ না করা, ধরে নেওয়া একটি ম্যানেজড কন্ট্রোল প্লেন আপনার database ও volume-ও রক্ষা করে—তা করে না।'),
        ] },
      ],
    },
    {
      h: l('Remember in one line', 'এক লাইনে মনে রাখুন'),
      blocks: [
        { list: [
          l('Managed Kubernetes (EKS, GKE, AKS) runs the control plane for you; you manage worker nodes and workloads.', 'ম্যানেজড কুবারনেটিস (EKS, GKE, AKS) আপনার জন্য কন্ট্রোল প্লেন চালায়; আপনি ওয়ার্কার নোড ও ওয়ার্কলোড সামলান।'),
          l('It removes the etcd and control-plane operational burden, but you trade some control and pay a premium.', 'এটি etcd ও কন্ট্রোল-প্লেন অপারেশনাল বোঝা সরায়, তবে কিছু নিয়ন্ত্রণ ছাড়েন ও একটি প্রিমিয়াম দেন।'),
          l('Managed is not hands-off: node sizing, upgrades, security, and cost are still entirely yours.', 'ম্যানেজড হাত-ছাড়া নয়: নোড সাইজিং, আপগ্রেড, নিরাপত্তা ও খরচ এখনো সম্পূর্ণ আপনার।'),
        ] },
      ],
    },
  ],
}
