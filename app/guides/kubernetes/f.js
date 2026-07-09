// Deep, bilingual (English / Bangla) teaching guides for the Kubernetes
// storage, scaling, and operations topics. Shape mirrors app/course-guides.js
// and app/guides/git/f.js: each guide is an array of sections { h, blocks },
// rendered by GuideBlock in app/LearningApp.js. Facts, YAML, and commands are
// drawn from the rawTopics + commands + examples in app/courses/kubernetes.js.
// Kubernetes has no Actions-style expressions, so { code } blocks are plain
// YAML / kubectl with no dollar-brace substitution anywhere.

const l = (en, bn) => ({ en, bn })

export default {
  // ── k8s-pv-pvc · PersistentVolumes & Claims ───────────────────────────────
  'k8s-pv-pvc': [
    {
      h: l('What are PersistentVolumes and Claims?', 'PersistentVolume ও Claim কী?'),
      blocks: [
        { p: l('A PersistentVolume (PV) is a piece of storage in the cluster — a cloud disk, an NFS share, a local SSD — that has been made available to Kubernetes as a first-class object. A PersistentVolumeClaim (PVC) is a pod’s request to use some of that storage: "I need 10Gi that I can read and write." The two are deliberately kept apart. The PV is the supply of storage; the PVC is the demand for it. A pod never points at a PV directly — it references a PVC by name, and Kubernetes matches that claim to a suitable volume behind the scenes.', 'একটি PersistentVolume (PV) হলো ক্লাস্টারের একটি স্টোরেজ অংশ — একটি ক্লাউড ডিস্ক, একটি NFS শেয়ার, একটি লোকাল SSD — যা কুবারনেটিসে একটি ফার্স্ট-ক্লাস অবজেক্ট হিসেবে উপলব্ধ করা হয়েছে। একটি PersistentVolumeClaim (PVC) হলো সেই স্টোরেজের কিছু ব্যবহারের জন্য পডের অনুরোধ: "আমার ১০Gi লাগবে যা পড়তে-লিখতে পারব।" দুটিকে ইচ্ছাকৃতভাবে আলাদা রাখা হয়। PV হলো স্টোরেজের সরবরাহ; PVC হলো তার চাহিদা। একটি পড কখনো সরাসরি একটি PV-কে নির্দেশ করে না — এটি নাম দিয়ে একটি PVC রেফার করে, আর কুবারনেটিস সেই ক্লেইমকে পর্দার আড়ালে একটি উপযুক্ত ভলিউমে মেলায়।') },
        { p: l('The problem this split solves is that pods are disposable but data is not. When a pod is rescheduled to another node, upgraded, or simply crashes, its container filesystem and any emptyDir volume vanish with it. A database’s files, an uploads folder, or a write-ahead log cannot survive that. By putting the real storage in a PV that lives independently of any pod, and letting pods claim it through a PVC, your data outlives every pod that ever mounts it. The claim, not the pod, owns the storage.', 'এই বিভাজন যে সমস্যা সমাধান করে তা হলো পড ফেলে-দেওয়ার যোগ্য কিন্তু ডেটা নয়। যখন একটি পড অন্য নোডে পুনঃশিডিউল হয়, আপগ্রেড হয়, বা কেবল ক্র্যাশ করে, তখন তার কন্টেইনার ফাইলসিস্টেম ও যেকোনো emptyDir ভলিউম তার সঙ্গে হারিয়ে যায়। একটি ডেটাবেসের ফাইল, একটি আপলোড ফোল্ডার, বা একটি write-ahead log এটি সহ্য করতে পারে না। আসল স্টোরেজকে একটি PV-তে রেখে যা যেকোনো পড থেকে স্বাধীনভাবে বাঁচে, আর পডকে একটি PVC দিয়ে তা ক্লেইম করতে দিয়ে, আপনার ডেটা তাকে মাউন্ট করা প্রতিটি পডের চেয়ে বেশি টেকে। স্টোরেজের মালিক পড নয়, ক্লেইম।') },
        { note: l('Think of a warehouse full of storage units — those are the PVs. A PVC is you renting one unit for your belongings: you state the size and the kind of access you need, and the warehouse hands you a key to a matching unit. You keep your things even after you leave and come back later as a new pod — the unit and its contents were never the pod’s to lose.', 'একটি গুদাম কল্পনা করুন যা স্টোরেজ ইউনিটে ভরা — সেগুলোই PV। একটি PVC হলো আপনার জিনিসের জন্য একটি ইউনিট ভাড়া নেওয়া: আপনি সাইজ ও প্রয়োজনীয় অ্যাক্সেসের ধরন বলেন, আর গুদাম আপনাকে একটি মেলা ইউনিটের চাবি দেয়। আপনি বেরিয়ে গিয়ে পরে একটি নতুন পড হিসেবে ফিরে এলেও আপনার জিনিস থেকে যায় — ইউনিট ও তার ভেতরের জিনিস কখনো পডের হারানোর ছিল না।'), kind: 'tip' },
      ],
    },
    {
      h: l('How binding works, step by step', 'বাইন্ডিং কীভাবে কাজ করে, ধাপে ধাপে'),
      blocks: [
        { steps: [
          l('Storage is provided — an admin creates PVs by hand, or a StorageClass creates them automatically on demand. Each PV advertises a capacity and a set of accessModes.', 'স্টোরেজ সরবরাহ হয় — একজন অ্যাডমিন হাতে PV তৈরি করেন, বা একটি StorageClass চাহিদা অনুযায়ী স্বয়ংক্রিয়ভাবে তৈরি করে। প্রতিটি PV একটি capacity ও একগুচ্ছ accessModes ঘোষণা করে।'),
          l('You write a PVC that asks for a size and accessModes (and optionally a storageClassName). It starts life in the Pending phase until it is satisfied.', 'আপনি একটি PVC লেখেন যা একটি সাইজ ও accessModes (এবং ঐচ্ছিকভাবে একটি storageClassName) চায়। এটি সন্তুষ্ট না হওয়া পর্যন্ত Pending দশায় শুরু হয়।'),
          l('Kubernetes finds a PV that satisfies the request and binds the PVC to it. Binding is one-to-one and exclusive — that PV now belongs to that one claim and nothing else can take it.', 'কুবারনেটিস একটি PV খুঁজে পায় যা অনুরোধ পূরণ করে ও PVC-কে তার সঙ্গে বাঁধে। বাইন্ডিং one-to-one ও এক্সক্লুসিভ — সেই PV এখন সেই একটি ক্লেইমের, আর কিছুই তা নিতে পারে না।'),
          l('A pod references the PVC by name under volumes and mounts it into a container with volumeMounts. Inside the container it looks like an ordinary directory backed by durable storage.', 'একটি পড volumes-এর নিচে নাম দিয়ে PVC রেফার করে ও volumeMounts দিয়ে একটি কন্টেইনারে মাউন্ট করে। কন্টেইনারের ভেতরে এটি টেকসই স্টোরেজ-সমর্থিত একটি সাধারণ ডিরেক্টরির মতো দেখায়।'),
          l('When the PVC is deleted, the bound PV’s reclaim policy decides the fate of the data — it is either kept (Retain) or destroyed (Delete).', 'যখন PVC মোছা হয়, বাঁধা PV-এর reclaim policy ডেটার ভাগ্য ঠিক করে — এটি হয় রাখা হয় (Retain) বা ধ্বংস হয় (Delete)।'),
        ] },
        { code: `apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: data
spec:
  accessModes:
    - ReadWriteOnce
  resources:
    requests:
      storage: 10Gi`, caption: l('A minimal PVC: it asks for 10Gi of ReadWriteOnce storage (mountable read-write by one node). A pod mounts this claim by name; Kubernetes binds it to a matching PV so the data outlives the pod.', 'একটি ন্যূনতম PVC: এটি ১০Gi ReadWriteOnce স্টোরেজ চায় (একটি নোড পড়তে-লিখতে মাউন্ট করতে পারে)। একটি পড নাম দিয়ে এই ক্লেইম মাউন্ট করে; কুবারনেটিস একটি মেলা PV-তে বাঁধে যাতে ডেটা পডের চেয়ে বেশি টেকে।') },
      ],
    },
    {
      h: l('Mounting a claim and the reclaim policy', 'একটি ক্লেইম মাউন্ট ও reclaim policy'),
      blocks: [
        { p: l('A statically created PV declares where the real storage is and, crucially, what happens to it when its claim goes away. The persistentVolumeReclaimPolicy field is the single most important — and most dangerous — setting here. Retain keeps the underlying disk and its data after the PVC is deleted (the PV moves to a Released state and waits for an admin), while Delete throws the real volume away with the claim. The pod side is simple: name the PVC under volumes and mount it into the container.', 'একটি স্ট্যাটিকভাবে তৈরি PV ঘোষণা করে আসল স্টোরেজ কোথায় এবং, গুরুত্বপূর্ণভাবে, তার ক্লেইম চলে গেলে তার কী হবে। persistentVolumeReclaimPolicy ফিল্ডটি এখানে সবচেয়ে গুরুত্বপূর্ণ — ও সবচেয়ে বিপজ্জনক — সেটিং। Retain PVC মোছার পরেও অন্তর্নিহিত ডিস্ক ও তার ডেটা রাখে (PV একটি Released অবস্থায় যায় ও একজন অ্যাডমিনের জন্য অপেক্ষা করে), আর Delete আসল ভলিউমকে ক্লেইমের সঙ্গে ফেলে দেয়। পড দিকটি সরল: volumes-এর নিচে PVC-এর নাম দিন ও কন্টেইনারে মাউন্ট করুন।') },
        { code: `apiVersion: v1
kind: PersistentVolume
metadata:
  name: pv-data
spec:
  capacity:
    storage: 10Gi
  accessModes:
    - ReadWriteOnce
  persistentVolumeReclaimPolicy: Retain
  hostPath:
    path: /mnt/data
---
apiVersion: v1
kind: Pod
metadata:
  name: db
spec:
  containers:
    - name: postgres
      image: postgres:16
      volumeMounts:
        - name: store
          mountPath: /var/lib/postgresql/data
  volumes:
    - name: store
      persistentVolumeClaim:
        claimName: data`, caption: l('The PV supplies 10Gi with Retain, so deleting the claim keeps the data. The pod mounts the PVC named data at the database’s data directory — the claim binds to the PV and the two are matched by size and accessModes.', 'PV Retain সহ ১০Gi সরবরাহ করে, তাই ক্লেইম মুছলেও ডেটা থাকে। পড data নামের PVC-কে ডেটাবেসের ডেটা ডিরেক্টরিতে মাউন্ট করে — ক্লেইম PV-তে বাঁধে ও দুটি সাইজ ও accessModes দিয়ে মেলে।') },
        { note: l('A Delete reclaim policy on important data is a data-loss trap: the moment someone deletes the PVC — even by accident during a cleanup — the underlying disk is wiped and cannot be recovered. For any stateful workload you care about (databases, user uploads), set the PV or StorageClass to Retain, so a deleted claim leaves the data intact for you to reattach.', 'গুরুত্বপূর্ণ ডেটায় একটি Delete reclaim policy একটি ডেটা-লস ফাঁদ: যেই মুহূর্তে কেউ PVC মোছে — এমনকি একটি ক্লিনআপের সময় ভুলবশত — অন্তর্নিহিত ডিস্ক মুছে যায় ও পুনরুদ্ধার করা যায় না। আপনার গুরুত্বপূর্ণ যেকোনো স্টেটফুল ওয়ার্কলোডে (ডেটাবেস, ইউজার আপলোড) PV বা StorageClass-কে Retain-এ সেট করুন, যাতে একটি মোছা ক্লেইম ডেটা অক্ষত রেখে যায় ও আপনি পুনরায় যুক্ত করতে পারেন।'), kind: 'warn' },
      ],
    },
    {
      h: l('Key commands', 'মূল কমান্ড'),
      blocks: [
        { table: {
          head: [l('Goal', 'লক্ষ্য'), l('Command', 'কমান্ড')],
          rows: [
            [l('List volumes (cluster-wide)', 'ভলিউম তালিকা (ক্লাস্টার-জুড়ে)'), l('kubectl get pv', 'kubectl get pv')],
            [l('List claims (per namespace)', 'ক্লেইম তালিকা (প্রতি নেমস্পেস)'), l('kubectl get pvc', 'kubectl get pvc')],
            [l('Inspect a claim and its binding', 'একটি ক্লেইম ও তার বাইন্ডিং দেখুন'), l('kubectl describe pvc data', 'kubectl describe pvc data')],
            [l('Create or update a claim', 'একটি ক্লেইম তৈরি বা আপডেট'), l('kubectl apply -f pvc.yaml', 'kubectl apply -f pvc.yaml')],
          ],
        } },
        { note: l('A PVC stuck in Pending almost always means no PV satisfies it — the size is too large, the accessModes do not match any volume, or the named StorageClass does not exist. kubectl describe pvc shows the reason in its Events.', 'Pending-এ আটকে থাকা একটি PVC প্রায় সবসময় বোঝায় কোনো PV তা পূরণ করে না — সাইজ খুব বড়, accessModes কোনো ভলিউমের সঙ্গে মেলে না, বা নামযুক্ত StorageClass নেই। kubectl describe pvc তার Events-এ কারণ দেখায়।'), kind: 'tip' },
      ],
    },
    {
      h: l('When and where to use PV/PVC', 'PV/PVC কখন ও কোথায় ব্যবহার করবেন'),
      blocks: [
        { p: l('Reach for a PVC any time a pod must keep data that has to survive the pod itself: a database’s data directory, a message broker’s queue, a user-uploads folder, a build cache, or anything you would be upset to lose on a restart. The accessMode you pick matters — ReadWriteOnce (RWO) is right for a single writer like a database and is the most widely supported; ReadWriteMany (RWX) lets many pods write at once but needs a networked filesystem (NFS, CephFS) that supports it. Choose the smallest set of permissions your workload genuinely needs.', 'যখনই একটি পডকে এমন ডেটা রাখতে হবে যা পড নিজে টিকে থাকার চেয়ে বেশি টিকতে হবে তখনই একটি PVC নিন: একটি ডেটাবেসের ডেটা ডিরেক্টরি, একটি মেসেজ ব্রোকারের কিউ, একটি ইউজার-আপলোড ফোল্ডার, একটি বিল্ড ক্যাশ, বা এমন যেকিছু যা রিস্টার্টে হারালে আপনি বিরক্ত হবেন। আপনি যে accessMode বাছেন তা গুরুত্বপূর্ণ — ReadWriteOnce (RWO) একটি ডেটাবেসের মতো একক লেখকের জন্য ঠিক ও সবচেয়ে বেশি সমর্থিত; ReadWriteMany (RWX) অনেক পডকে একসঙ্গে লিখতে দেয় কিন্তু এমন একটি নেটওয়ার্কড ফাইলসিস্টেম (NFS, CephFS) লাগে যা তা সমর্থন করে। আপনার ওয়ার্কলোডের সত্যিকার দরকারি সবচেয়ে ছোট অনুমতি-সেটটি বাছুন।') },
        { p: l('You do not need a PVC for data that is genuinely temporary — scratch space, a local cache that can be rebuilt, or a scratch dir shared between containers in one pod. For those, an emptyDir is simpler and cheaper because it is meant to die with the pod. The rule of thumb: if losing the directory on a reschedule would be a bug, it belongs in a PVC; if it would be harmless, an emptyDir is the honest choice.', 'সত্যিকারভাবে অস্থায়ী ডেটার জন্য আপনার PVC লাগে না — স্ক্র্যাচ স্পেস, একটি লোকাল ক্যাশ যা আবার বানানো যায়, বা এক পডের কন্টেইনারগুলোর মধ্যে শেয়ার করা একটি স্ক্র্যাচ ডিরেক্টরি। এগুলোর জন্য একটি emptyDir সরল ও সস্তা কারণ এটি পডের সঙ্গে মরার জন্যই। মোটামুটি নিয়ম: পুনঃশিডিউলে ডিরেক্টরি হারানো যদি একটি বাগ হতো, তবে এটি একটি PVC-তে থাকে; যদি তা ক্ষতিহীন হতো, একটি emptyDir সৎ পছন্দ।') },
      ],
    },
    {
      h: l('Common mistakes', 'সাধারণ ভুল'),
      blocks: [
        { list: [
          l('Using an emptyDir for data you must keep, then losing all of it the moment the pod is rescheduled to another node.', 'রাখতে-হওয়া ডেটায় emptyDir ব্যবহার করা, তারপর পড অন্য নোডে পুনঃশিডিউল হওয়ার মুহূর্তে তার সবটা হারানো।'),
          l('Leaving a Delete reclaim policy on important data, so releasing or accidentally deleting the claim wipes the underlying volume for good.', 'গুরুত্বপূর্ণ ডেটায় Delete reclaim policy রেখে দেওয়া, ফলে ক্লেইম ছাড়লে বা ভুলে মুছলে অন্তর্নিহিত ভলিউম চিরতরে মুছে যায়।'),
          l('Requesting an accessMode the storage cannot provide — asking for ReadWriteMany on a plain cloud block disk that only supports ReadWriteOnce, so the PVC never binds.', 'স্টোরেজ দিতে পারে না এমন accessMode চাওয়া — শুধু ReadWriteOnce সমর্থন করা একটি সাধারণ ক্লাউড ব্লক ডিস্কে ReadWriteMany চাওয়া, ফলে PVC কখনো বাঁধে না।'),
          l('Expecting a PVC to bind with no matching PV and no StorageClass, then wondering why it sits in Pending forever.', 'কোনো মেলা PV ও কোনো StorageClass ছাড়া একটি PVC বাঁধবে আশা করা, তারপর ভাবা কেন এটি চিরকাল Pending-এ বসে থাকে।'),
        ] },
      ],
    },
    {
      h: l('Remember in one line', 'এক লাইনে মনে রাখুন'),
      blocks: [
        { list: [
          l('PV = a piece of cluster storage; PVC = a pod’s request for some of it — pods reference the claim, never the volume.', 'PV = ক্লাস্টার স্টোরেজের একটি অংশ; PVC = তার কিছুর জন্য পডের অনুরোধ — পড ক্লেইম রেফার করে, ভলিউম কখনো নয়।'),
          l('Binding is one-to-one; the data outlives every pod that mounts the claim.', 'বাইন্ডিং one-to-one; ক্লেইম মাউন্ট করা প্রতিটি পডের চেয়ে ডেটা বেশি টেকে।'),
          l('Set the reclaim policy to Retain for anything you cannot afford to lose — Delete destroys the volume with the claim.', 'যা হারানো চলবে না তার জন্য reclaim policy Retain-এ দিন — Delete ভলিউমকে ক্লেইমের সঙ্গে ধ্বংস করে।'),
        ] },
      ],
    },
  ],

  // ── k8s-storageclass · StorageClasses & provisioning ──────────────────────
  'k8s-storageclass': [
    {
      h: l('What is a StorageClass?', 'StorageClass কী?'),
      blocks: [
        { p: l('A StorageClass defines a type of storage and lets Kubernetes create PersistentVolumes on demand, automatically, the moment a claim asks for them. Instead of an admin pre-creating disks by hand, the StorageClass names a provisioner (the driver that talks to your cloud or storage system) and the parameters for the volumes it should make — the disk type, the filesystem, the performance tier. A PVC simply says "give me 20Gi from the fast-ssd class," and the matching disk is created and bound for you within seconds.', 'একটি StorageClass এক ধরনের স্টোরেজ সংজ্ঞায়িত করে ও একটি ক্লেইম চাওয়ার মুহূর্তে কুবারনেটিসকে স্বয়ংক্রিয়ভাবে চাহিদা অনুযায়ী PersistentVolume তৈরি করতে দেয়। একজন অ্যাডমিন হাতে আগেভাগে ডিস্ক তৈরি করার বদলে, StorageClass একটি provisioner (যে ড্রাইভার আপনার ক্লাউড বা স্টোরেজ সিস্টেমের সঙ্গে কথা বলে) ও তার বানানো ভলিউমের parameters নাম দেয় — ডিস্কের ধরন, ফাইলসিস্টেম, পারফরম্যান্স টিয়ার। একটি PVC কেবল বলে "fast-ssd ক্লাস থেকে আমাকে ২০Gi দাও," আর মেলা ডিস্ক কয়েক সেকেন্ডে আপনার জন্য তৈরি ও বাঁধা হয়।') },
        { p: l('This is called dynamic provisioning, and it is how nearly every managed cluster (EKS, GKE, AKS) handles storage. The problem it solves is the tedium and bottleneck of static provisioning: without it, a human has to anticipate every volume, size it, and create the PV before any pod can use it. With a StorageClass, storage becomes self-service — developers request what they need and the cluster fulfils it, with no ticket to an operations team in between.', 'একে dynamic provisioning বলে, আর এভাবেই প্রায় প্রতিটি ম্যানেজড ক্লাস্টার (EKS, GKE, AKS) স্টোরেজ সামলায়। এটি যে সমস্যা সমাধান করে তা হলো static provisioning-এর একঘেয়েমি ও বটলনেক: এটি ছাড়া, একজন মানুষকে প্রতিটি ভলিউম আন্দাজ করতে, সাইজ দিতে ও কোনো পড ব্যবহারের আগে PV তৈরি করতে হয়। একটি StorageClass দিয়ে স্টোরেজ সেলফ-সার্ভিস হয় — ডেভেলপাররা যা দরকার চায় ও ক্লাস্টার তা পূরণ করে, মাঝে কোনো অপারেশন টিমের টিকিট ছাড়াই।') },
        { note: l('Choosing a StorageClass is like choosing "standard" or "express" shipping at checkout. You do not arrange the truck yourself — you pick the tier by name, and the system provisions the right thing behind the scenes. A "fast-ssd" class delivers a quick SSD; a "cheap-hdd" class delivers slow bulk storage.', 'একটি StorageClass বাছা চেকআউটে "স্ট্যান্ডার্ড" বা "এক্সপ্রেস" শিপিং বাছার মতো। আপনি নিজে ট্রাক ঠিক করেন না — নাম দিয়ে টিয়ার বাছেন, আর সিস্টেম পর্দার আড়ালে সঠিক জিনিস প্রভিশন করে। একটি "fast-ssd" ক্লাস একটি দ্রুত SSD দেয়; একটি "cheap-hdd" ক্লাস ধীর বাল্ক স্টোরেজ দেয়।'), kind: 'tip' },
      ],
    },
    {
      h: l('How dynamic provisioning works, step by step', 'ডায়নামিক প্রভিশনিং কীভাবে কাজ করে, ধাপে ধাপে'),
      blocks: [
        { steps: [
          l('A StorageClass is defined once (often by the cluster provider) naming a provisioner, parameters like disk type, a reclaimPolicy, and a volumeBindingMode.', 'একটি StorageClass একবার সংজ্ঞায়িত হয় (প্রায়ই ক্লাস্টার প্রদানকারীর দ্বারা) একটি provisioner, ডিস্ক টাইপের মতো parameters, একটি reclaimPolicy ও একটি volumeBindingMode নাম দিয়ে।'),
          l('You write a PVC that sets storageClassName to that class and requests a size and accessModes.', 'আপনি একটি PVC লেখেন যা storageClassName-কে সেই ক্লাসে সেট করে ও একটি সাইজ ও accessModes চায়।'),
          l('The provisioner sees the pending claim and calls the cloud or storage API to create a brand-new disk of the requested size and type.', 'provisioner পেন্ডিং ক্লেইমটি দেখে ও অনুরোধ করা সাইজ ও ধরনের একটি একদম নতুন ডিস্ক তৈরি করতে ক্লাউড বা স্টোরেজ API কল করে।'),
          l('Kubernetes wraps that new disk in a PV and binds it to your PVC automatically — no admin ever touched a PV object.', 'কুবারনেটিস সেই নতুন ডিস্ককে একটি PV-তে মোড়ায় ও স্বয়ংক্রিয়ভাবে আপনার PVC-তে বাঁধে — কোনো অ্যাডমিন কখনো একটি PV অবজেক্ট স্পর্শ করেনি।'),
          l('With volumeBindingMode WaitForFirstConsumer, the disk is created only once a pod actually schedules, so it lands in the same zone as the pod.', 'volumeBindingMode WaitForFirstConsumer দিয়ে, ডিস্ক শুধু তখনই তৈরি হয় যখন একটি পড আসলে শিডিউল হয়, তাই এটি পডের একই জোনে পড়ে।'),
        ] },
        { code: `apiVersion: storage.k8s.io/v1
kind: StorageClass
metadata:
  name: fast-ssd
provisioner: kubernetes.io/aws-ebs
parameters:
  type: gp3
reclaimPolicy: Delete
volumeBindingMode: WaitForFirstConsumer
---
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: data
spec:
  storageClassName: fast-ssd
  accessModes:
    - ReadWriteOnce
  resources:
    requests:
      storage: 20Gi`, caption: l('The StorageClass describes how to make gp3 SSD disks; the PVC just names fast-ssd and asks for 20Gi. Kubernetes provisions a matching disk and binds it — no PV is written by hand.', 'StorageClass বর্ণনা করে কীভাবে gp3 SSD ডিস্ক বানাতে হয়; PVC কেবল fast-ssd নাম দেয় ও ২০Gi চায়। কুবারনেটিস একটি মেলা ডিস্ক প্রভিশন করে ও বাঁধে — হাতে কোনো PV লেখা হয় না।') },
      ],
    },
    {
      h: l('StorageClass vs static PVs', 'StorageClass বনাম স্ট্যাটিক PV'),
      blocks: [
        { table: {
          head: [l('Aspect', 'দিক'), l('Static PVs', 'স্ট্যাটিক PV'), l('StorageClass (dynamic)', 'StorageClass (ডায়নামিক)')],
          rows: [
            [l('Who creates the volume', 'ভলিউম কে তৈরি করে'), l('An admin, by hand, ahead of time', 'একজন অ্যাডমিন, হাতে, আগেভাগে'), l('The provisioner, automatically on claim', 'provisioner, ক্লেইমে স্বয়ংক্রিয়ভাবে')],
            [l('Speed to get storage', 'স্টোরেজ পেতে গতি'), l('Slow — waits for a human', 'ধীর — একজন মানুষের অপেক্ষা'), l('Seconds — self-service', 'সেকেন্ড — সেলফ-সার্ভিস')],
            [l('Best for', 'কার জন্য'), l('Pre-existing disks, special hardware, NFS', 'বিদ্যমান ডিস্ক, বিশেষ হার্ডওয়্যার, NFS'), l('Cloud clusters, most everyday workloads', 'ক্লাউড ক্লাস্টার, বেশিরভাগ প্রতিদিনের ওয়ার্কলোড')],
            [l('Tier / performance choice', 'টিয়ার / পারফরম্যান্স বাছাই'), l('Fixed per volume you made', 'আপনার বানানো প্রতি ভলিউমে নির্দিষ্ট'), l('Pick a class by name (ssd, hdd)', 'নাম দিয়ে একটি ক্লাস বাছুন (ssd, hdd)')],
          ],
        } },
      ],
    },
    {
      h: l('Key commands', 'মূল কমান্ড'),
      blocks: [
        { table: {
          head: [l('Goal', 'লক্ষ্য'), l('Command', 'কমান্ড')],
          rows: [
            [l('List storage classes (default is marked)', 'স্টোরেজ ক্লাস তালিকা (ডিফল্ট চিহ্নিত)'), l('kubectl get storageclass', 'kubectl get storageclass')],
            [l('Inspect a class (provisioner, params)', 'একটি ক্লাস দেখুন (provisioner, params)'), l('kubectl describe sc fast-ssd', 'kubectl describe sc fast-ssd')],
            [l('See which class a claim used', 'একটি ক্লেইম কোন ক্লাস ব্যবহার করল দেখুন'), l('kubectl get pvc data', 'kubectl get pvc data')],
            [l('List the volumes it provisioned', 'এটি যে ভলিউম প্রভিশন করল তালিকা'), l('kubectl get pv', 'kubectl get pv')],
          ],
        } },
        { note: l('In kubectl get storageclass, the class with (default) after its name is used whenever a PVC names no storageClassName. Know your cluster’s default before relying on it — it is often a general-purpose tier, not the fastest one.', 'kubectl get storageclass-এ, নামের পরে (default) থাকা ক্লাসটি ব্যবহৃত হয় যখনই একটি PVC কোনো storageClassName দেয় না। এটির ওপর নির্ভর করার আগে আপনার ক্লাস্টারের ডিফল্ট জানুন — এটি প্রায়ই একটি সাধারণ-উদ্দেশ্য টিয়ার, দ্রুততম নয়।'), kind: 'tip' },
      ],
    },
    {
      h: l('When and where to use StorageClasses', 'StorageClass কখন ও কোথায় ব্যবহার করবেন'),
      blocks: [
        { p: l('On any cloud or managed cluster, dynamic provisioning through a StorageClass is the default and best choice for almost everything — it removes an entire category of manual work and lets each workload get exactly the storage it asks for. The important decision is which class to name. Match the class to the workload: a latency-sensitive database wants a fast SSD-backed class; a log archive or backup target is fine on a cheap, slower, high-capacity class. Many clusters ship a default class that is applied when a PVC names none, which is convenient but rarely optimal for demanding apps.', 'যেকোনো ক্লাউড বা ম্যানেজড ক্লাস্টারে, একটি StorageClass দিয়ে ডায়নামিক প্রভিশনিং প্রায় সবকিছুর জন্য ডিফল্ট ও সেরা পছন্দ — এটি একটি পুরো শ্রেণির ম্যানুয়াল কাজ সরায় ও প্রতিটি ওয়ার্কলোডকে ঠিক যা চায় সেই স্টোরেজ পেতে দেয়। গুরুত্বপূর্ণ সিদ্ধান্ত হলো কোন ক্লাসের নাম দেবেন। ক্লাসকে ওয়ার্কলোডের সঙ্গে মেলান: একটি latency-সংবেদনশীল ডেটাবেস একটি দ্রুত SSD-সমর্থিত ক্লাস চায়; একটি লগ আর্কাইভ বা ব্যাকআপ টার্গেট একটি সস্তা, ধীর, উচ্চ-ক্ষমতার ক্লাসে ঠিক আছে। অনেক ক্লাস্টার একটি ডিফল্ট ক্লাস দেয় যা PVC কোনোটির নাম না দিলে প্রয়োগ হয়, যা সুবিধাজনক কিন্তু চাহিদাসম্পন্ন অ্যাপের জন্য কমই আদর্শ।') },
        { p: l('Prefer a StorageClass over hand-made PVs unless you have a specific reason — a pre-existing disk that already holds data, exotic hardware, or a shared NFS export that no provisioner manages. In those cases a static PV pointed at the exact resource is the right tool. Otherwise, let the class do the work.', 'একটি নির্দিষ্ট কারণ না থাকলে হাতে-বানানো PV-এর চেয়ে একটি StorageClass নিন — একটি বিদ্যমান ডিস্ক যাতে ইতিমধ্যে ডেটা আছে, বিরল হার্ডওয়্যার, বা কোনো provisioner সামলায় না এমন একটি শেয়ার্ড NFS এক্সপোর্ট। সেসব ক্ষেত্রে ঠিক রিসোর্সে নির্দেশিত একটি স্ট্যাটিক PV সঠিক টুল। নইলে, ক্লাসকেই কাজটি করতে দিন।') },
      ],
    },
    {
      h: l('Common mistakes', 'সাধারণ ভুল'),
      blocks: [
        { list: [
          l('Leaving storage on a slow default class for a database that needs a fast SSD-backed volume, then blaming the app for poor performance.', 'দ্রুত SSD-সমর্থিত ভলিউম দরকার এমন ডেটাবেসে ধীর ডিফল্ট ক্লাসে স্টোরেজ রেখে দেওয়া, তারপর খারাপ পারফরম্যান্সের জন্য অ্যাপকে দোষ দেওয়া।'),
          l('Naming a storageClassName in a PVC that does not exist in the cluster, so the claim stays Pending with no volume ever provisioned.', 'একটি PVC-তে এমন একটি storageClassName দেওয়া যা ক্লাস্টারে নেই, ফলে ক্লেইম Pending থাকে ও কোনো ভলিউম কখনো প্রভিশন হয় না।'),
          l('Forgetting that a Delete reclaim policy on the class means deleting the PVC also deletes the freshly provisioned disk and its data.', 'ভুলে যাওয়া যে ক্লাসে একটি Delete reclaim policy মানে PVC মুছলে সদ্য প্রভিশন করা ডিস্ক ও তার ডেটাও মোছে।'),
          l('Assuming every class supports ReadWriteMany — most cloud block-storage classes are ReadWriteOnce only, so a multi-writer PVC will not bind.', 'ধরে নেওয়া প্রতিটি ক্লাস ReadWriteMany সমর্থন করে — বেশিরভাগ ক্লাউড ব্লক-স্টোরেজ ক্লাস শুধু ReadWriteOnce, তাই একটি মাল্টি-রাইটার PVC বাঁধবে না।'),
        ] },
      ],
    },
    {
      h: l('Remember in one line', 'এক লাইনে মনে রাখুন'),
      blocks: [
        { list: [
          l('A StorageClass is a named recipe for creating PersistentVolumes on demand — a PVC just references the class.', 'একটি StorageClass হলো চাহিদা অনুযায়ী PersistentVolume তৈরির একটি নামযুক্ত রেসিপি — একটি PVC কেবল ক্লাসটি রেফার করে।'),
          l('Dynamic provisioning replaces hand-made PVs and is the default on cloud clusters.', 'ডায়নামিক প্রভিশনিং হাতে-বানানো PV প্রতিস্থাপন করে ও ক্লাউড ক্লাস্টারে ডিফল্ট।'),
          l('Match the class to the workload — fast SSD for databases, cheap bulk for archives — and mind its reclaim policy.', 'ক্লাসকে ওয়ার্কলোডের সঙ্গে মেলান — ডেটাবেসে দ্রুত SSD, আর্কাইভে সস্তা বাল্ক — আর তার reclaim policy খেয়াল রাখুন।'),
        ] },
      ],
    },
  ],

  // ── k8s-scaling · Scaling deployments ─────────────────────────────────────
  'k8s-scaling': [
    {
      h: l('What is scaling a deployment?', 'ডিপ্লয়মেন্ট স্কেলিং কী?'),
      blocks: [
        { p: l('Scaling a Deployment means changing how many identical copies — replicas — of your pod are running. Set replicas to 5 and Kubernetes runs five copies of the same container behind one Service; the load balancer spreads incoming requests across all five. This is horizontal scaling: you add more instances rather than making one instance bigger. More replicas do two things at once — they share the load so each pod does less work, and they add redundancy so the failure of one pod barely dents the whole.', 'একটি Deployment স্কেল করা মানে আপনার পডের কতগুলো অভিন্ন কপি — replica — চলছে তা বদলানো। replicas ৫ সেট করুন ও কুবারনেটিস একটি Service-এর পেছনে একই কন্টেইনারের পাঁচটি কপি চালায়; লোড ব্যালান্সার আসা রিকোয়েস্ট পাঁচটির মধ্যে ছড়ায়। এটি horizontal scaling: আপনি একটি ইনস্ট্যান্সকে বড় করার বদলে বেশি ইনস্ট্যান্স যোগ করেন। বেশি replica একসঙ্গে দুটি কাজ করে — এরা লোড ভাগ করে যাতে প্রতিটি পড কম কাজ করে, ও রিডানডেন্সি যোগ করে যাতে একটি পডের ব্যর্থতা পুরোটায় সামান্যই আঁচড় কাটে।') },
        { p: l('The Deployment’s job is to make reality match the number you asked for. It records replicas as the desired state and continuously reconciles toward it: if a pod dies, it starts a replacement; if you raise the number, it creates more; if you lower it, it removes the extras. You declare the "how many," and the controller does the constant work of keeping it true — you never start or stop individual pods by hand.', 'Deployment-এর কাজ হলো বাস্তবতাকে আপনার চাওয়া সংখ্যার সঙ্গে মেলানো। এটি replicas-কে desired state হিসেবে রেকর্ড করে ও অবিরত তার দিকে reconcile করে: একটি পড মরলে, এটি একটি প্রতিস্থাপন শুরু করে; সংখ্যা বাড়ালে, এটি আরও তৈরি করে; কমালে, এটি অতিরিক্তগুলো সরায়। আপনি "কতগুলো" ঘোষণা করেন, আর কন্ট্রোলার তা সত্য রাখার নিরন্তর কাজ করে — আপনি কখনো হাতে আলাদা পড শুরু বা বন্ধ করেন না।') },
        { note: l('Scaling is like opening and closing checkout lanes in a shop. When the queue grows you open more lanes (add replicas) so customers are served faster; when it shrinks you close some (remove replicas) so you are not paying idle cashiers. The shop is the same — you are just adjusting how many identical counters are open.', 'স্কেলিং একটি দোকানে চেকআউট লেন খোলা ও বন্ধ করার মতো। কিউ বাড়লে আপনি বেশি লেন খোলেন (replica যোগ) যাতে গ্রাহক দ্রুত সেবা পায়; কমলে কিছু বন্ধ করেন (replica সরান) যাতে অলস ক্যাশিয়ারের বেতন না দিতে হয়। দোকান একই — আপনি কেবল কতগুলো অভিন্ন কাউন্টার খোলা তা সমন্বয় করছেন।'), kind: 'tip' },
      ],
    },
    {
      h: l('How to scale, step by step', 'কীভাবে স্কেল করবেন, ধাপে ধাপে'),
      blocks: [
        { steps: [
          l('Decide the target replica count from the load — enough pods to serve peak traffic with headroom, not so many that they sit idle.', 'লোড থেকে টার্গেট replica সংখ্যা ঠিক করুন — পিক ট্রাফিক হেডরুমসহ সামলাতে যথেষ্ট পড, এত বেশি নয় যে তারা অলস বসে থাকে।'),
          l('Scale imperatively for a quick change with kubectl scale, or change the replicas field in the manifest for a permanent, version-controlled change.', 'একটি দ্রুত পরিবর্তনে kubectl scale দিয়ে ইম্পারেটিভভাবে স্কেল করুন, বা একটি স্থায়ী, ভার্সন-কন্ট্রোলড পরিবর্তনে ম্যানিফেস্টে replicas ফিল্ড বদলান।'),
          l('The Deployment controller compares desired vs actual and creates or deletes pods to close the gap.', 'Deployment কন্ট্রোলার desired বনাম actual তুলনা করে ও ফাঁক বন্ধ করতে পড তৈরি বা মোছে।'),
          l('New pods are scheduled onto nodes with spare CPU and memory; if the cluster is full, extra pods stay Pending until room appears.', 'নতুন পড অতিরিক্ত CPU ও মেমরিযুক্ত নোডে শিডিউল হয়; ক্লাস্টার ভরা থাকলে অতিরিক্ত পড জায়গা না আসা পর্যন্ত Pending থাকে।'),
          l('The Service automatically starts routing traffic to healthy new pods and stops sending it to ones being removed.', 'Service স্বয়ংক্রিয়ভাবে সুস্থ নতুন পডে ট্রাফিক রাউট করা শুরু করে ও সরানো-হওয়া পডে পাঠানো বন্ধ করে।'),
        ] },
        { code: `# imperative: change the running count right now
kubectl scale deploy web --replicas=5
kubectl get deploy web          # READY should climb to 5/5
kubectl get pods -w             # watch pods appear in real time

# declarative: set it in the manifest so it survives re-applies
# spec:
#   replicas: 5
kubectl apply -f deploy.yaml`, caption: l('kubectl scale is fast but a later apply of the manifest will overwrite it — for a lasting change, edit replicas in the file and apply. Use kubectl get pods -w to watch the new pods come up.', 'kubectl scale দ্রুত কিন্তু পরে ম্যানিফেস্ট apply করলে তা মুছে যাবে — একটি স্থায়ী পরিবর্তনে ফাইলে replicas এডিট করে apply করুন। নতুন পড উঠতে দেখতে kubectl get pods -w ব্যবহার করুন।') },
      ],
    },
    {
      h: l('Key commands', 'মূল কমান্ড'),
      blocks: [
        { table: {
          head: [l('Goal', 'লক্ষ্য'), l('Command', 'কমান্ড')],
          rows: [
            [l('Scale to a fixed count now', 'এখন একটি নির্দিষ্ট সংখ্যায় স্কেল'), l('kubectl scale deploy web --replicas=5', 'kubectl scale deploy web --replicas=5')],
            [l('Check current vs desired replicas', 'বর্তমান বনাম desired replica দেখুন'), l('kubectl get deploy web', 'kubectl get deploy web')],
            [l('Hand scaling over to an autoscaler', 'অটোস্কেলারকে স্কেলিং দিন'), l('kubectl autoscale deploy web --min=2 --max=10', 'kubectl autoscale deploy web --min=2 --max=10')],
            [l('Watch pods start or stop live', 'পড শুরু বা বন্ধ লাইভ দেখুন'), l('kubectl get pods -w', 'kubectl get pods -w')],
          ],
        } },
      ],
    },
    {
      h: l('When and where to scale', 'কখন ও কোথায় স্কেল করবেন'),
      blocks: [
        { p: l('Scale out when a single set of pods can no longer keep up with traffic, or when you need redundancy so a node or pod failure does not take the service down. For a stateless web or API tier — where any replica can handle any request because no request-specific data lives on the pod — horizontal scaling is almost free and is the first lever you reach for under load. Keep at least two replicas in production for anything that must stay available, so a rolling update or a crashed pod never leaves you at zero.', 'যখন একটি পড-সেট আর ট্রাফিকের সঙ্গে তাল মেলাতে পারে না, বা যখন রিডানডেন্সি দরকার যাতে একটি নোড বা পড ব্যর্থতা সার্ভিস নামিয়ে না দেয় তখন স্কেল আউট করুন। একটি স্টেটলেস ওয়েব বা API টিয়ারে — যেখানে যেকোনো replica যেকোনো রিকোয়েস্ট সামলাতে পারে কারণ পডে কোনো রিকোয়েস্ট-নির্দিষ্ট ডেটা থাকে না — horizontal scaling প্রায় বিনামূল্যে ও লোডে আপনার প্রথম লিভার। প্রোডাকশনে সচল থাকতে-হওয়া যেকোনো কিছুতে অন্তত দুটি replica রাখুন, যাতে একটি rolling update বা একটি ক্র্যাশ করা পড আপনাকে কখনো শূন্যে না ফেলে।') },
        { p: l('Two conditions must hold for scaling to actually help. First, the app must be stateless — if a pod keeps per-user state in memory or assumes it is the only writer, extra replicas cause duplicate work, data races, or lost sessions. Second, the cluster must have spare CPU and memory; adding replicas to a full cluster just produces Pending pods that never run. When those hold, scale freely. When they do not, fix the statefulness (move state to a database or cache) or add nodes first.', 'স্কেলিং আসলে সাহায্য করতে দুটি শর্ত থাকতে হবে। প্রথমত, অ্যাপ স্টেটলেস হতে হবে — একটি পড যদি মেমরিতে প্রতি-ইউজার স্টেট রাখে বা ধরে নেয় এটিই একমাত্র লেখক, তবে অতিরিক্ত replica ডুপ্লিকেট কাজ, ডেটা রেস বা হারানো সেশন ঘটায়। দ্বিতীয়ত, ক্লাস্টারে অতিরিক্ত CPU ও মেমরি থাকতে হবে; একটি ভরা ক্লাস্টারে replica যোগ করলে কেবল Pending পড হয় যা কখনো চলে না। এই শর্ত থাকলে অবাধে স্কেল করুন। না থাকলে, আগে statefulness ঠিক করুন (স্টেট একটি ডেটাবেস বা ক্যাশে সরান) বা নোড যোগ করুন।') },
      ],
    },
    {
      h: l('Manual scaling vs autoscaling', 'ম্যানুয়াল স্কেলিং বনাম অটোস্কেলিং'),
      blocks: [
        { p: l('Setting replicas by hand is the right tool when the load is predictable or you are deliberately pinning capacity — a known launch, a batch window, a fixed baseline. But when traffic rises and falls on its own, hand-tuning the number becomes a chore and you end up either over-provisioned and wasteful or under-provisioned and fragile. That is exactly the gap the Horizontal Pod Autoscaler fills: you hand the replica count over to a controller that raises and lowers it from live metrics. Manual scaling and autoscaling are two ends of the same dial — one you turn yourself, one that turns itself.', 'হাতে replicas সেট করা সঠিক টুল যখন লোড পূর্বানুমেয় বা আপনি ইচ্ছাকৃতভাবে ক্ষমতা পিন করছেন — একটি জানা লঞ্চ, একটি ব্যাচ উইন্ডো, একটি নির্দিষ্ট বেসলাইন। কিন্তু যখন ট্রাফিক নিজে থেকে ওঠে-নামে, সংখ্যা হাতে-টিউন করা একটি ঝক্কি হয় ও আপনি হয় অতি-প্রভিশনড ও অপচয়ী বা কম-প্রভিশনড ও ভঙ্গুর হন। এটাই ঠিক সেই ফাঁক যা হরাইজন্টাল পড অটোস্কেলার ভরে: আপনি replica সংখ্যা একটি কন্ট্রোলারকে দেন যা লাইভ মেট্রিক থেকে তা ওঠায়-নামায়। ম্যানুয়াল স্কেলিং ও অটোস্কেলিং একই ডায়ালের দুই প্রান্ত — একটি আপনি নিজে ঘোরান, একটি নিজে ঘোরে।') },
        { note: l('Do not fight an autoscaler by hand. Once an HPA manages a Deployment, it owns the replica count — a manual kubectl scale is overwritten at the next reconcile. Choose one owner for the number: you, or the HPA.', 'একটি অটোস্কেলারের সঙ্গে হাতে লড়বেন না। একবার একটি HPA একটি Deployment সামলালে, এটি replica সংখ্যার মালিক — একটি ম্যানুয়াল kubectl scale পরের reconcile-এ মুছে যায়। সংখ্যাটির একজন মালিক বাছুন: আপনি, বা HPA।'), kind: 'warn' },
      ],
    },
    {
      h: l('Common mistakes', 'সাধারণ ভুল'),
      blocks: [
        { list: [
          l('Scaling up a stateful app that assumes a single instance, causing data races, duplicate processing, or corrupted state.', 'একক ইনস্ট্যান্স ধরে নেওয়া একটি স্টেটফুল অ্যাপ স্কেল আপ করা, ডেটা রেস, ডুপ্লিকেট প্রসেসিং বা নষ্ট স্টেট ঘটানো।'),
          l('Using kubectl scale for a permanent change, then having the next kubectl apply silently reset the count back to the manifest value.', 'একটি স্থায়ী পরিবর্তনে kubectl scale ব্যবহার করা, তারপর পরের kubectl apply নীরবে সংখ্যাকে ম্যানিফেস্ট মানে ফিরিয়ে দেওয়া।'),
          l('Adding replicas to a cluster with no spare capacity, so the new pods sit Pending and nothing actually improves.', 'অতিরিক্ত ক্ষমতাহীন একটি ক্লাস্টারে replica যোগ করা, ফলে নতুন পড Pending বসে থাকে ও আসলে কিছুই উন্নত হয় না।'),
          l('Running a single replica for a critical service, so one crash or one rolling update means downtime.', 'একটি গুরুত্বপূর্ণ সার্ভিসে একটি মাত্র replica চালানো, ফলে একটি ক্র্যাশ বা একটি rolling update মানে ডাউনটাইম।'),
        ] },
      ],
    },
    {
      h: l('Remember in one line', 'এক লাইনে মনে রাখুন'),
      blocks: [
        { list: [
          l('Scaling changes the replica count; more replicas share load and add redundancy.', 'স্কেলিং replica সংখ্যা বদলায়; বেশি replica লোড ভাগ করে ও রিডানডেন্সি যোগ করে।'),
          l('Edit replicas in the manifest for a lasting change; kubectl scale is a quick, temporary override.', 'একটি স্থায়ী পরিবর্তনে ম্যানিফেস্টে replicas এডিট করুন; kubectl scale একটি দ্রুত, অস্থায়ী ওভাররাইড।'),
          l('It only helps if the app is stateless and the cluster has room to grow.', 'এটি শুধু তখনই সাহায্য করে যখন অ্যাপ স্টেটলেস ও ক্লাস্টারে বাড়ার জায়গা আছে।'),
        ] },
      ],
    },
  ],

  // ── k8s-hpa · Horizontal Pod Autoscaler ───────────────────────────────────
  'k8s-hpa': [
    {
      h: l('What is the Horizontal Pod Autoscaler?', 'হরাইজন্টাল পড অটোস্কেলার কী?'),
      blocks: [
        { p: l('The Horizontal Pod Autoscaler (HPA) adds or removes pod replicas automatically, based on live metrics like CPU or memory usage. Where plain scaling means you choose the replica count by hand, an HPA watches how busy the pods are and adjusts that count for you — up when traffic surges, down when it quiets. You give it a target (say, keep average CPU near 70%) and a range (min 2, max 10 replicas), and it does the rest, continuously, without anyone paged at 3 a.m.', 'হরাইজন্টাল পড অটোস্কেলার (HPA) CPU বা মেমরি ব্যবহারের মতো লাইভ মেট্রিকের ভিত্তিতে স্বয়ংক্রিয়ভাবে পড replica যোগ বা সরায়। সাধারণ স্কেলিংয়ে যেখানে আপনি হাতে replica সংখ্যা বাছেন, একটি HPA পড কতটা ব্যস্ত তা দেখে ও সংখ্যাটি আপনার জন্য সমন্বয় করে — ট্রাফিক বাড়লে ওপরে, শান্ত হলে নিচে। আপনি এটিকে একটি টার্গেট দেন (ধরুন, গড় CPU ৭০%-এর কাছে রাখো) ও একটি পরিসর (min ২, max ১০ replica), আর এটি বাকিটা করে, অবিরত, রাত ৩টায় কাউকে না ডেকে।') },
        { p: l('The problem it solves is that traffic is rarely flat. A store is busy at lunchtime and quiet at midnight; a news site spikes when a story breaks. Sizing for the peak wastes money the other twenty hours of the day, and sizing for the average falls over during the rush. An HPA tracks demand as it changes and matches capacity to it, so you pay for what you actually use and still survive the busy hour. It is the difference between a fixed number of cashiers and a manager who opens and closes lanes as the queue moves.', 'এটি যে সমস্যা সমাধান করে তা হলো ট্রাফিক কমই সমতল। একটি দোকান দুপুরে ব্যস্ত ও মধ্যরাতে শান্ত; একটি সংবাদ সাইট একটি খবর ভাঙলে বাড়ে। পিকের জন্য সাইজ করলে দিনের বাকি বিশ ঘণ্টা টাকা নষ্ট হয়, আর গড়ের জন্য সাইজ করলে ভিড়ে ভেঙে পড়ে। একটি HPA চাহিদা বদলানোর সঙ্গে ট্র্যাক করে ও ক্ষমতা তার সঙ্গে মেলায়, তাই আপনি যা আসলে ব্যবহার করেন তার জন্য দেন ও তবু ব্যস্ত ঘণ্টায় টিকে থাকেন। এটি একটি নির্দিষ্ট সংখ্যক ক্যাশিয়ার ও একজন ম্যানেজারের মধ্যে পার্থক্য যিনি কিউ নড়লে লেন খোলেন ও বন্ধ করেন।') },
        { note: l('An HPA is a thermostat for capacity. You set the target temperature (70% CPU), and when the room heats up (load rises) it automatically brings more radiators online (adds pods); when it cools, it switches some off (removes pods). You never touch the radiators yourself — you just set the target.', 'একটি HPA ক্ষমতার জন্য একটি থার্মোস্ট্যাট। আপনি টার্গেট তাপমাত্রা সেট করেন (৭০% CPU), আর ঘর গরম হলে (লোড বাড়লে) এটি স্বয়ংক্রিয়ভাবে বেশি রেডিয়েটর অনলাইনে আনে (পড যোগ); ঠান্ডা হলে কিছু বন্ধ করে (পড সরায়)। আপনি কখনো নিজে রেডিয়েটর ছোঁন না — কেবল টার্গেট সেট করেন।'), kind: 'tip' },
      ],
    },
    {
      h: l('How the HPA works, step by step', 'HPA কীভাবে কাজ করে, ধাপে ধাপে'),
      blocks: [
        { steps: [
          l('The metrics-server collects live CPU and memory usage from every pod and makes it queryable in the cluster.', 'metrics-server প্রতিটি পড থেকে লাইভ CPU ও মেমরি ব্যবহার সংগ্রহ করে ও ক্লাস্টারে তা কুয়েরিযোগ্য করে।'),
          l('Every 15 seconds the HPA controller reads the current metric and compares it to your target, for example 70% average CPU.', 'প্রতি ১৫ সেকেন্ডে HPA কন্ট্রোলার বর্তমান মেট্রিক পড়ে ও আপনার টার্গেটের সঙ্গে তুলনা করে, যেমন ৭০% গড় CPU।'),
          l('It computes the desired replicas from a simple ratio: current usage divided by the target, times the current count.', 'এটি একটি সরল অনুপাত থেকে desired replica হিসাব করে: বর্তমান ব্যবহার ভাগ টার্গেট, গুণ বর্তমান সংখ্যা।'),
          l('It changes the Deployment’s replica count within your minReplicas and maxReplicas bounds — never below the floor, never above the ceiling.', 'এটি আপনার minReplicas ও maxReplicas সীমার মধ্যে Deployment-এর replica সংখ্যা বদলায় — কখনো মেঝের নিচে নয়, কখনো ছাদের ওপরে নয়।'),
          l('To avoid flapping, it scales up quickly but scales down slowly, waiting through a stabilization window before removing pods.', 'ফ্ল্যাপিং এড়াতে এটি দ্রুত স্কেল আপ কিন্তু ধীরে স্কেল ডাউন করে, পড সরানোর আগে একটি stabilization উইন্ডো অপেক্ষা করে।'),
        ] },
        { code: `apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: web
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: web
  minReplicas: 2
  maxReplicas: 10
  metrics:
    - type: Resource
      resource:
        name: cpu
        target:
          type: Utilization
          averageUtilization: 70`, caption: l('This HPA targets the web Deployment and keeps average CPU near 70%, adding pods under load and removing them when idle, always between 2 and 10 replicas. Utilization is a percentage of each pod’s CPU request — which is why requests must be set.', 'এই HPA web Deployment-কে টার্গেট করে ও গড় CPU ৭০%-এর কাছে রাখে, লোডে পড যোগ ও অলস হলে সরায়, সবসময় ২ ও ১০ replica-র মধ্যে। Utilization হলো প্রতিটি পডের CPU request-এর শতাংশ — এ কারণেই request সেট থাকা লাগে।') },
      ],
    },
    {
      h: l('The one requirement: resource requests', 'একটি শর্ত: রিসোর্স request'),
      blocks: [
        { p: l('A CPU-based HPA does nothing useful unless every pod it targets has a CPU request set. The reason is arithmetic: averageUtilization is measured as a percentage of the pod’s request, not of the whole node. "70% CPU" means "70% of the 250m this pod requested." With no request, there is no denominator, so the HPA cannot compute utilization at all — it reports unknown and never scales. This is the single most common reason an HPA silently sits idle while pods are on fire.', 'একটি CPU-ভিত্তিক HPA কোনো কাজের কিছু করে না যদি না এটি টার্গেট করা প্রতিটি পডে একটি CPU request সেট থাকে। কারণটি গাণিতিক: averageUtilization পডের request-এর শতাংশ হিসেবে মাপা হয়, পুরো নোডের নয়। "৭০% CPU" মানে "এই পড যে 250m চেয়েছে তার ৭০%।" request ছাড়া, কোনো হর নেই, তাই HPA আদৌ utilization হিসাব করতে পারে না — এটি unknown রিপোর্ট করে ও কখনো স্কেল করে না। পড জ্বলতে থাকলেও একটি HPA নীরবে অলস বসে থাকার এটিই সবচেয়ে সাধারণ কারণ।') },
        { code: `# every targeted pod's container needs this
resources:
  requests:
    cpu: "250m"      # the HPA measures CPU as a % of this
    memory: "256Mi"
  limits:
    cpu: "500m"
    memory: "512Mi"`, caption: l('Set a CPU request on the Deployment’s container. averageUtilization: 70 then means 70% of 250m. Without the request, the HPA has no baseline and does nothing.', 'Deployment-এর কন্টেইনারে একটি CPU request সেট করুন। তখন averageUtilization: 70 মানে 250m-এর ৭০%। request ছাড়া, HPA-র কোনো বেসলাইন নেই ও কিছু করে না।') },
        { note: l('Check an HPA with kubectl get hpa. If the TARGETS column shows <unknown>/70%, the pods are missing CPU requests or the metrics-server is not installed — fix that first, before touching thresholds.', 'kubectl get hpa দিয়ে একটি HPA যাচাই করুন। TARGETS কলাম <unknown>/70% দেখালে, পডে CPU request নেই বা metrics-server ইনস্টল নেই — থ্রেশহোল্ড ছোঁয়ার আগে সেটি আগে ঠিক করুন।'), kind: 'warn' },
      ],
    },
    {
      h: l('When and where to use an HPA', 'HPA কখন ও কোথায় ব্যবহার করবেন'),
      blocks: [
        { p: l('Use an HPA for stateless workloads whose load varies over time — a web frontend, an API, a queue worker whose backlog rises and falls. These are exactly the cases where a fixed replica count is either wasteful or fragile, and where adding a pod genuinely relieves pressure. Pair it with a min that covers your quietest realistic traffic (for redundancy, at least 2) and a max that respects your cluster’s and budget’s limits. For workloads driven by something other than CPU — requests per second, queue depth — the autoscaling/v2 API supports custom and external metrics too.', 'একটি HPA ব্যবহার করুন স্টেটলেস ওয়ার্কলোডের জন্য যাদের লোড সময়ের সঙ্গে বদলায় — একটি ওয়েব ফ্রন্টএন্ড, একটি API, একটি কিউ ওয়ার্কার যার ব্যাকলগ ওঠে-নামে। এগুলোই ঠিক সেই ক্ষেত্র যেখানে একটি নির্দিষ্ট replica সংখ্যা হয় অপচয়ী বা ভঙ্গুর, ও যেখানে একটি পড যোগ সত্যিই চাপ কমায়। এটিকে একটি min-এর সঙ্গে জোড়া দিন যা আপনার সবচেয়ে শান্ত বাস্তব ট্রাফিক ঢাকে (রিডানডেন্সির জন্য অন্তত ২) ও একটি max যা আপনার ক্লাস্টার ও বাজেটের সীমা মানে। CPU ছাড়া অন্য কিছু দিয়ে চালিত ওয়ার্কলোডের জন্য — প্রতি সেকেন্ডে রিকোয়েস্ট, কিউ গভীরতা — autoscaling/v2 API custom ও external মেট্রিকও সমর্থন করে।') },
        { p: l('Do not expect an HPA to be instant or magic. It reacts with a lag — it takes a few metric cycles to notice a spike and a stabilization window to scale back — so a sudden burst may briefly overwhelm the current pods before help arrives. And it can only add replicas the cluster has room for; if every node is full, the new pods stay Pending. For that, pair the HPA with a cluster autoscaler that adds nodes, so pod-level and node-level scaling work together.', 'একটি HPA-কে তাৎক্ষণিক বা জাদু ভাববেন না। এটি দেরিতে সাড়া দেয় — একটি স্পাইক খেয়াল করতে কয়েকটি মেট্রিক চক্র ও ফিরে স্কেল করতে একটি stabilization উইন্ডো লাগে — তাই একটি আকস্মিক বার্স্ট সাহায্য আসার আগে বর্তমান পডকে সংক্ষেপে চাপে ফেলতে পারে। আর এটি শুধু সেই replica যোগ করতে পারে যার জন্য ক্লাস্টারে জায়গা আছে; প্রতিটি নোড ভরা থাকলে নতুন পড Pending থাকে। এর জন্য, HPA-কে একটি cluster autoscaler-এর সঙ্গে জোড়া দিন যা নোড যোগ করে, যাতে পড-স্তর ও নোড-স্তর স্কেলিং একসঙ্গে কাজ করে।') },
      ],
    },
    {
      h: l('Common mistakes', 'সাধারণ ভুল'),
      blocks: [
        { list: [
          l('Configuring an HPA without CPU resource requests, so it has no baseline to scale against and quietly does nothing.', 'CPU রিসোর্স request ছাড়া একটি HPA কনফিগার করা, ফলে স্কেল করার কোনো বেসলাইন নেই ও এটি নীরবে কিছুই করে না।'),
          l('Forgetting to install the metrics-server, so the HPA reports <unknown> and can never read utilization.', 'metrics-server ইনস্টল করতে ভুলে যাওয়া, ফলে HPA <unknown> রিপোর্ট করে ও কখনো utilization পড়তে পারে না।'),
          l('Setting minReplicas to 1, so during a quiet period a single pod handles everything and there is no redundancy.', 'minReplicas ১ সেট করা, ফলে একটি শান্ত সময়ে একটি পড সব সামলায় ও কোনো রিডানডেন্সি নেই।'),
          l('Manually editing replicas on a Deployment that has an HPA — the HPA owns that number and will overwrite your change.', 'একটি HPA-যুক্ত Deployment-এ হাতে replicas এডিট করা — HPA সেই সংখ্যার মালিক ও আপনার পরিবর্তন মুছে দেবে।'),
        ] },
      ],
    },
    {
      h: l('Remember in one line', 'এক লাইনে মনে রাখুন'),
      blocks: [
        { list: [
          l('An HPA adjusts replicas automatically from live metrics, between a min and a max you set.', 'একটি HPA আপনার সেট করা min ও max-এর মধ্যে লাইভ মেট্রিক থেকে স্বয়ংক্রিয়ভাবে replica সমন্বয় করে।'),
          l('CPU utilization is a percentage of the pod’s request — no request means the HPA does nothing.', 'CPU utilization হলো পডের request-এর শতাংশ — কোনো request না মানে HPA কিছুই করে না।'),
          l('It reacts with a lag and cannot grow past a full cluster — pair it with a node autoscaler.', 'এটি দেরিতে সাড়া দেয় ও একটি ভরা ক্লাস্টার ছাড়িয়ে বাড়তে পারে না — একটি নোড অটোস্কেলারের সঙ্গে জোড়া দিন।'),
        ] },
      ],
    },
  ],

  // ── k8s-debug · Debugging pods ────────────────────────────────────────────
  'k8s-debug': [
    {
      h: l('What does debugging a pod mean?', 'একটি পড ডিবাগ করা মানে কী?'),
      blocks: [
        { p: l('Debugging a pod is the work of finding out why it will not start, keeps crashing, or misbehaves — using three core kubectl tools that answer three different questions. kubectl describe tells you what Kubernetes thinks is happening (its events and current state). kubectl logs shows what the application itself printed (its stdout and stderr). kubectl exec drops you into a shell inside the running container so you can look around from the inside. Master these three and you can localize the large majority of pod problems in minutes.', 'একটি পড ডিবাগ করা হলো এটি কেন চালু হবে না, বারবার ক্র্যাশ করে, বা ভুল আচরণ করে তা খুঁজে বের করার কাজ — তিনটি মূল kubectl টুল দিয়ে যা তিনটি ভিন্ন প্রশ্নের উত্তর দেয়। kubectl describe বলে কুবারনেটিস কী ঘটছে বলে মনে করে (তার ইভেন্ট ও বর্তমান স্টেট)। kubectl logs দেখায় অ্যাপ্লিকেশন নিজে কী প্রিন্ট করল (তার stdout ও stderr)। kubectl exec আপনাকে চলমান কন্টেইনারের ভেতরে একটি শেলে নামায় যাতে আপনি ভেতর থেকে চারপাশ দেখতে পারেন। এই তিনটি আয়ত্ত করুন ও আপনি বেশিরভাগ পড সমস্যা মিনিটে স্থানীয় করতে পারবেন।') },
        { p: l('The reason to learn a deliberate order is that pods fail in two very different ways, and each tool sees only one of them. A pod that never starts — stuck Pending, ImagePullBackOff, CrashLoopBackOff — has produced no application logs yet, so logs is empty and only describe explains it. A pod that starts but then behaves wrongly needs its logs, and sometimes a shell inside. Reaching for the wrong tool first is the most common way people waste time.', 'একটি ইচ্ছাকৃত ক্রম শেখার কারণ হলো পড দুটি খুব ভিন্নভাবে ব্যর্থ হয়, আর প্রতিটি টুল শুধু একটি দেখে। একটি পড যা কখনো চালু হয় না — Pending, ImagePullBackOff, CrashLoopBackOff-এ আটকে — এখনো কোনো অ্যাপ্লিকেশন লগ তৈরি করেনি, তাই logs খালি ও শুধু describe এটি ব্যাখ্যা করে। একটি পড যা চালু হয় কিন্তু তারপর ভুল আচরণ করে তার logs লাগে, আর কখনো ভেতরে একটি শেল। প্রথমে ভুল টুল নেওয়াই মানুষের সময় নষ্টের সবচেয়ে সাধারণ উপায়।') },
        { note: l('It mirrors a doctor’s workflow. First read the chart and history (describe — the events that led here), then check the vital signs the patient is reporting (logs — what the app is saying), and only then examine directly if you still need to (exec — a hands-on look inside).', 'এটি একজন ডাক্তারের ওয়ার্কফ্লোর প্রতিচ্ছবি। প্রথমে চার্ট ও ইতিহাস পড়ুন (describe — যে ইভেন্ট এখানে এনেছে), তারপর রোগীর জানানো ভাইটাল সাইন দেখুন (logs — অ্যাপ কী বলছে), আর তবেই সরাসরি পরীক্ষা করুন যদি এখনো দরকার হয় (exec — ভেতরে হাতে-কলমে দেখা)।'), kind: 'tip' },
      ],
    },
    {
      h: l('How to debug, step by step', 'কীভাবে ডিবাগ করবেন, ধাপে ধাপে'),
      blocks: [
        { steps: [
          l('Start with kubectl describe pod and scroll to the Events section at the bottom — it usually names the problem outright.', 'kubectl describe pod দিয়ে শুরু করুন ও নিচের Events অংশে যান — এটি সাধারণত সমস্যাটি সরাসরি নাম দেয়।'),
          l('If the pod did start, read kubectl logs to see what the application printed; add --previous to see the logs of a container that already crashed.', 'পড চালু হয়ে থাকলে, অ্যাপ্লিকেশন কী প্রিন্ট করল দেখতে kubectl logs পড়ুন; ইতিমধ্যে ক্র্যাশ করা একটি কন্টেইনারের লগ দেখতে --previous যোগ করুন।'),
          l('Follow the output live with kubectl logs -f while you reproduce the issue to watch it happen.', 'সমস্যা পুনরুৎপাদন করার সময় তা ঘটতে দেখতে kubectl logs -f দিয়ে আউটপুট লাইভ follow করুন।'),
          l('Still stuck? Use kubectl exec -it to open a shell inside the container and check config files, env vars, DNS, or connectivity from the pod’s point of view.', 'এখনো আটকে? কন্টেইনারের ভেতরে একটি শেল খুলতে ও পডের দৃষ্টিকোণ থেকে কনফিগ ফাইল, env ভ্যার, DNS বা সংযোগ যাচাই করতে kubectl exec -it ব্যবহার করুন।'),
          l('Fix the root cause in the manifest and re-apply — never leave the fix as a live edit inside the container.', 'ম্যানিফেস্টে মূল কারণ ঠিক করে পুনরায় apply করুন — ফিক্সটি কখনো কন্টেইনারের ভেতরে একটি লাইভ এডিট হিসেবে রাখবেন না।'),
        ] },
        { code: `# 1. describe first — the Events section usually names the problem
kubectl describe pod web-xyz
...
Events:
  Type     Reason     Age   From               Message
  ----     ------     ----  ----               -------
  Normal   Scheduled  2m    default-scheduler  Successfully assigned default/web-xyz to node-1
  Normal   Pulling    2m    kubelet            Pulling image "nginx:1.29"
  Warning  Failed     90s   kubelet            Failed to pull image "nginx:1.29": not found
  Warning  BackOff    30s   kubelet            Back-off pulling image "nginx:1.29"

# 2. then read what the container printed
kubectl logs web-xyz
kubectl logs -f web-xyz            # follow live output
kubectl logs web-xyz --previous   # logs from the last crashed container

# 3. still unclear? open a shell inside the running container
kubectl exec -it web-xyz -- sh`, caption: l('The Events at the bottom of describe point straight at the cause — here a bad image tag (ImagePullBackOff). Read Events before anything else; logs and exec come after, and logs is empty for a pod that never started.', 'describe-এর নিচের Events সরাসরি কারণ দেখায় — এখানে একটি ভুল image tag (ImagePullBackOff)। যেকোনো কিছুর আগে Events পড়ুন; logs ও exec পরে আসে, আর যে পড কখনো চালু হয়নি তার logs খালি।') },
      ],
    },
    {
      h: l('Key commands', 'মূল কমান্ড'),
      blocks: [
        { table: {
          head: [l('Goal', 'লক্ষ্য'), l('Command', 'কমান্ড')],
          rows: [
            [l('See events and state (start here)', 'ইভেন্ট ও স্টেট দেখুন (এখানে শুরু)'), l('kubectl describe pod x', 'kubectl describe pod x')],
            [l('Read the container’s output', 'কন্টেইনারের আউটপুট পড়ুন'), l('kubectl logs x', 'kubectl logs x')],
            [l('Follow logs live', 'লগ লাইভ follow করুন'), l('kubectl logs -f x', 'kubectl logs -f x')],
            [l('Open a shell inside the pod', 'পডের ভেতরে একটি শেল খুলুন'), l('kubectl exec -it x -- sh', 'kubectl exec -it x -- sh')],
          ],
        } },
      ],
    },
    {
      h: l('Reading the common failure states', 'সাধারণ ব্যর্থতা স্টেট পড়া'),
      blocks: [
        { p: l('The status a pod is stuck in tells you which tool to reach for and roughly where the fault lies. Learning to read these few states turns debugging from guesswork into a lookup.', 'একটি পড যে স্ট্যাটাসে আটকে তা বলে দেয় কোন টুল নিতে হবে ও দোষ মোটামুটি কোথায়। এই কয়েকটি স্টেট পড়া শেখা ডিবাগিংকে আন্দাজ থেকে একটি লুকআপে পরিণত করে।') },
        { table: {
          head: [l('Status', 'স্ট্যাটাস'), l('Usual cause', 'সাধারণ কারণ'), l('Look with', 'যা দিয়ে দেখুন')],
          rows: [
            [l('Pending', 'Pending'), l('No node has room, or a PVC is unbound', 'কোনো নোডে জায়গা নেই, বা একটি PVC আনবাউন্ড'), l('describe (Events)', 'describe (Events)')],
            [l('ImagePullBackOff', 'ImagePullBackOff'), l('Wrong image name/tag or missing registry auth', 'ভুল image নাম/tag বা রেজিস্ট্রি auth নেই'), l('describe (Events)', 'describe (Events)')],
            [l('CrashLoopBackOff', 'CrashLoopBackOff'), l('The app starts, then exits with an error', 'অ্যাপ চালু হয়, তারপর একটি এররে বেরোয়'), l('logs --previous', 'logs --previous')],
            [l('Running but wrong', 'Running কিন্তু ভুল'), l('Bad config, missing env var, bad dependency', 'খারাপ কনফিগ, নেই env ভ্যার, খারাপ ডিপেন্ডেন্সি'), l('logs, then exec', 'logs, তারপর exec')],
          ],
        } },
      ],
    },
    {
      h: l('When and where these tools help', 'এই টুল কখন ও কোথায় সাহায্য করে'),
      blocks: [
        { p: l('Reach for describe, logs, and exec whenever a pod is not doing what its manifest promised — during a failed rollout, after a deploy that turned red, or when a Service returns errors and you need to know which pod and why. They localize most problems fast because between them they cover the whole lifecycle: scheduling and image pulls (describe), application behaviour (logs), and the live runtime environment (exec). For a deeper look at a distroless or crashed container that has no shell, kubectl debug can attach an ephemeral container with tools, but the three basics solve the majority of cases.', 'যখনই একটি পড তার ম্যানিফেস্টের প্রতিশ্রুতি করছে না — একটি ব্যর্থ rollout-এর সময়, একটি deploy লাল হওয়ার পর, বা একটি Service এরর দিলে ও আপনাকে কোন পড ও কেন জানতে হবে — তখন describe, logs ও exec নিন। এরা বেশিরভাগ সমস্যা দ্রুত স্থানীয় করে কারণ এদের মধ্যে পুরো লাইফসাইকেল ঢাকে: শিডিউলিং ও image pull (describe), অ্যাপ্লিকেশন আচরণ (logs), ও লাইভ রানটাইম পরিবেশ (exec)। শেল নেই এমন একটি distroless বা ক্র্যাশ করা কন্টেইনারের গভীর দৃষ্টির জন্য, kubectl debug টুলসহ একটি ephemeral কন্টেইনার যুক্ত করতে পারে, তবে তিনটি মৌলিক বেশিরভাগ কেস সমাধান করে।') },
        { p: l('The one rule to keep is that these tools are for diagnosis, not for permanent fixes. Anything you change with exec — editing a file, installing a package, restarting a process inside the container — is lost the instant the pod restarts, because the pod is rebuilt from its image and manifest every time. So use exec to understand the problem, then fix the real cause in the manifest, image, or config and re-apply. A fix that does not live in version control is not a fix.', 'একটি নিয়ম রাখতে হবে তা হলো এই টুল নির্ণয়ের জন্য, স্থায়ী ফিক্সের জন্য নয়। exec দিয়ে আপনি যা বদলান — একটি ফাইল এডিট, একটি প্যাকেজ ইনস্টল, কন্টেইনারের ভেতরে একটি প্রসেস রিস্টার্ট — পড রিস্টার্ট হওয়ার মুহূর্তে হারায়, কারণ পড প্রতিবার তার image ও ম্যানিফেস্ট থেকে আবার তৈরি হয়। তাই সমস্যা বুঝতে exec ব্যবহার করুন, তারপর ম্যানিফেস্ট, image বা কনফিগে আসল কারণ ঠিক করে পুনরায় apply করুন। যে ফিক্স ভার্সন কন্ট্রোলে থাকে না তা ফিক্স নয়।') },
      ],
    },
    {
      h: l('Common mistakes', 'সাধারণ ভুল'),
      blocks: [
        { list: [
          l('Ignoring the Events section of kubectl describe, which usually explains outright why a pod will not schedule or start.', 'kubectl describe-এর Events অংশ উপেক্ষা করা, যা সাধারণত একটি পড কেন শিডিউল বা চালু হবে না সরাসরি ব্যাখ্যা করে।'),
          l('Running kubectl logs on a pod that never started and concluding "no error," when the pod produced no logs at all — describe was the right tool.', 'কখনো চালু না-হওয়া একটি পডে kubectl logs চালিয়ে "কোনো এরর নেই" ভাবা, যখন পড আদৌ কোনো লগ তৈরি করেনি — describe ছিল সঠিক টুল।'),
          l('Forgetting --previous on a CrashLoopBackOff pod, so you read the empty logs of the newest attempt instead of the crashed one.', 'একটি CrashLoopBackOff পডে --previous ভুলে যাওয়া, ফলে ক্র্যাশ করাটির বদলে নতুন চেষ্টার খালি লগ পড়া।'),
          l('Fixing the problem live with exec and moving on — the change vanishes on the next restart and the bug returns.', 'exec দিয়ে সমস্যা লাইভ ঠিক করে এগিয়ে যাওয়া — পরিবর্তন পরের রিস্টার্টে মিলিয়ে যায় ও বাগ ফিরে আসে।'),
        ] },
      ],
    },
    {
      h: l('Remember in one line', 'এক লাইনে মনে রাখুন'),
      blocks: [
        { list: [
          l('describe for events and state, logs for what the app printed, exec for a shell inside — in that order.', 'ইভেন্ট ও স্টেটে describe, অ্যাপ কী প্রিন্ট করল তাতে logs, ভেতরে শেলে exec — এই ক্রমে।'),
          l('Always read the Events section first; for a pod that never started, logs is empty and only describe explains it.', 'সবসময় আগে Events অংশ পড়ুন; কখনো চালু না-হওয়া পডের logs খালি ও শুধু describe এটি ব্যাখ্যা করে।'),
          l('exec changes are lost on restart — diagnose live, but fix the manifest, not the running pod.', 'exec পরিবর্তন রিস্টার্টে হারায় — লাইভ নির্ণয় করুন, কিন্তু লাইভ পড নয়, ম্যানিফেস্ট ঠিক করুন।'),
        ] },
      ],
    },
  ],

  // ── k8s-rbac · RBAC & access control ──────────────────────────────────────
  'k8s-rbac': [
    {
      h: l('What is RBAC?', 'RBAC কী?'),
      blocks: [
        { p: l('RBAC (Role-Based Access Control) is how Kubernetes decides who is allowed to do what in the cluster. It is built from two kinds of object working as a pair. A Role is a list of permissions — "may get, list, and watch pods in the dev namespace" — but it grants nothing on its own. A RoleBinding attaches that Role to a subject: a user, a group, or a service account (the identity a pod runs as). Permissions live in the Role; the binding decides who receives them. Nothing is allowed by default, so access exists only where a binding explicitly grants it.', 'RBAC (Role-Based Access Control) হলো কুবারনেটিস কীভাবে ঠিক করে ক্লাস্টারে কে কী করার অনুমতি পায়। এটি জোড়ায় কাজ করা দুই ধরনের অবজেক্ট দিয়ে তৈরি। একটি Role হলো অনুমতির একটি তালিকা — "dev নেমস্পেসে পড get, list ও watch করতে পারে" — কিন্তু এটি নিজে কিছুই দেয় না। একটি RoleBinding সেই Role-কে একটি subject-এ যুক্ত করে: একটি user, একটি group, বা একটি service account (যে পরিচয়ে একটি পড চলে)। অনুমতি থাকে Role-এ; বাইন্ডিং ঠিক করে কে তা পায়। ডিফল্টে কিছুই অনুমোদিত নয়, তাই অ্যাক্সেস শুধু সেখানেই থাকে যেখানে একটি বাইন্ডিং স্পষ্টভাবে তা দেয়।') },
        { p: l('The problem RBAC solves is blast radius — how much damage a single mistake, leaked token, or compromised pod can do. Without it, every user and every workload would have the run of the whole cluster, and one stolen credential could delete everything. RBAC lets you hand out exactly the permissions each person or app truly needs and nothing more, so a compromise is contained. There is a namespaced pair (Role + RoleBinding) for permissions scoped to one namespace, and a cluster-wide pair (ClusterRole + ClusterRoleBinding) for cluster-scoped resources like nodes.', 'RBAC যে সমস্যা সমাধান করে তা হলো blast radius — একটি একক ভুল, ফাঁস হওয়া টোকেন, বা আপসকৃত পড কতটা ক্ষতি করতে পারে। এটি ছাড়া, প্রতিটি user ও প্রতিটি ওয়ার্কলোডের পুরো ক্লাস্টারে অবাধ চলাচল থাকত, আর একটি চুরি হওয়া ক্রেডেনশিয়াল সবকিছু মুছতে পারত। RBAC আপনাকে প্রতিটি ব্যক্তি বা অ্যাপের সত্যিকার দরকারি ঠিক অনুমতিটুকু দিতে দেয়, তার বেশি নয়, যাতে একটি আপস সীমাবদ্ধ থাকে। একটি নেমস্পেসড জোড়া (Role + RoleBinding) আছে এক নেমস্পেসে সীমিত অনুমতির জন্য, ও একটি ক্লাস্টার-জুড়ে জোড়া (ClusterRole + ClusterRoleBinding) নোডের মতো ক্লাস্টার-স্কোপড রিসোর্সের জন্য।') },
        { note: l('Think of keycards with access levels in an office building. A Role is a permission level — "may enter the second-floor lab." A RoleBinding is programming that level onto a specific person’s card. The card opens only the doors its level allows, and no door opens for someone who was never issued a card.', 'একটি অফিস ভবনে অ্যাক্সেস-স্তরসহ কীকার্ড ভাবুন। একটি Role হলো একটি অনুমতি-স্তর — "দোতলার ল্যাবে ঢুকতে পারে।" একটি RoleBinding হলো সেই স্তর একটি নির্দিষ্ট ব্যক্তির কার্ডে প্রোগ্রাম করা। কার্ড শুধু সেই দরজা খোলে যা তার স্তর অনুমতি দেয়, আর যাকে কখনো কার্ড দেওয়া হয়নি তার জন্য কোনো দরজা খোলে না।'), kind: 'tip' },
      ],
    },
    {
      h: l('How Role and RoleBinding fit together', 'Role ও RoleBinding কীভাবে একসঙ্গে বসে'),
      blocks: [
        { steps: [
          l('Write a Role that lists apiGroups, resources, and verbs — the exact actions allowed, scoped to one namespace.', 'একটি Role লেখেন যা apiGroups, resources ও verbs তালিকা করে — অনুমোদিত ঠিক ক্রিয়া, এক নেমস্পেসে সীমিত।'),
          l('Write a RoleBinding whose subjects name the user or service account, and whose roleRef points at that Role.', 'একটি RoleBinding লেখেন যার subjects user বা service account-এর নাম দেয়, ও যার roleRef সেই Role-কে নির্দেশ করে।'),
          l('The identity now has exactly those permissions in that namespace — and none anywhere else.', 'পরিচয়টির এখন সেই নেমস্পেসে ঠিক সেই অনুমতিগুলো আছে — আর অন্য কোথাও কিছুই নেই।'),
          l('When that identity makes an API request, the API server checks the bindings and allows only what a Role grants.', 'সেই পরিচয় একটি API রিকোয়েস্ট করলে, API সার্ভার বাইন্ডিং যাচাই করে ও শুধু একটি Role যা দেয় তাই অনুমতি দেয়।'),
          l('Verify before you trust it with kubectl auth can-i — it answers yes or no for a specific action.', 'ভরসা করার আগে kubectl auth can-i দিয়ে যাচাই করুন — এটি একটি নির্দিষ্ট ক্রিয়ায় হ্যাঁ বা না উত্তর দেয়।'),
        ] },
        { code: `apiVersion: rbac.authorization.k8s.io/v1
kind: Role
metadata:
  namespace: dev
  name: pod-reader
rules:
  - apiGroups: [""]
    resources: ["pods"]
    verbs: ["get", "list", "watch"]
---
apiVersion: rbac.authorization.k8s.io/v1
kind: RoleBinding
metadata:
  namespace: dev
  name: read-pods
subjects:
  - kind: User
    name: jahid
    apiGroup: rbac.authorization.k8s.io
roleRef:
  kind: Role
  name: pod-reader
  apiGroup: rbac.authorization.k8s.io`, caption: l('The Role grants read-only access to pods in the dev namespace; the RoleBinding gives that Role to the user jahid. Together they mean "jahid may look at pods in dev, and do nothing else."', 'Role dev নেমস্পেসে পডে শুধু-পড়ার অ্যাক্সেস দেয়; RoleBinding সেই Role ইউজার jahid-কে দেয়। একসঙ্গে এরা মানে "jahid dev-এ পড দেখতে পারে, আর কিছুই করতে পারে না।"') },
      ],
    },
    {
      h: l('Key commands', 'মূল কমান্ড'),
      blocks: [
        { table: {
          head: [l('Goal', 'লক্ষ্য'), l('Command', 'কমান্ড')],
          rows: [
            [l('List Roles in a namespace', 'একটি নেমস্পেসে Role তালিকা'), l('kubectl get roles', 'kubectl get roles')],
            [l('List RoleBindings', 'RoleBinding তালিকা'), l('kubectl get rolebindings', 'kubectl get rolebindings')],
            [l('Test whether an action is allowed', 'একটি ক্রিয়া অনুমোদিত কিনা পরীক্ষা'), l('kubectl auth can-i create pods', 'kubectl auth can-i create pods')],
            [l('Inspect a Role’s exact rules', 'একটি Role-এর ঠিক নিয়ম দেখুন'), l('kubectl describe role dev', 'kubectl describe role dev')],
          ],
        } },
        { note: l('kubectl auth can-i is your fastest check. Add --as=system:serviceaccount:dev:my-app to ask "can this pod’s service account do X?" — a great way to confirm least privilege before shipping.', 'kubectl auth can-i আপনার দ্রুততম চেক। "এই পডের service account কি X করতে পারে?" জিজ্ঞাসা করতে --as=system:serviceaccount:dev:my-app যোগ করুন — শিপিংয়ের আগে least privilege নিশ্চিত করার একটি চমৎকার উপায়।'), kind: 'tip' },
      ],
    },
    {
      h: l('Least privilege: when and where', 'ন্যূনতম অধিকার: কখন ও কোথায়'),
      blocks: [
        { p: l('The governing principle for all RBAC is least privilege: grant each user and each workload only the permissions it genuinely needs, scoped as narrowly as possible, and nothing more. In practice that means preferring a namespaced Role over a cluster-wide ClusterRole, listing specific resources and verbs instead of wildcards, and giving each application its own service account rather than sharing one powerful account across many pods. A build pipeline that only needs to update one Deployment should not be able to read every Secret in the cluster.', 'সব RBAC-এর মূল নীতি হলো least privilege: প্রতিটি user ও প্রতিটি ওয়ার্কলোডকে শুধু তার সত্যিকার দরকারি অনুমতি দিন, যতটা সংকীর্ণভাবে সম্ভব স্কোপ করে, তার বেশি নয়। বাস্তবে এর মানে একটি ক্লাস্টার-জুড়ে ClusterRole-এর চেয়ে একটি নেমস্পেসড Role নেওয়া, wildcard-এর বদলে নির্দিষ্ট resources ও verbs তালিকা করা, ও অনেক পডে একটি শক্তিশালী অ্যাকাউন্ট শেয়ার না করে প্রতিটি অ্যাপ্লিকেশনকে তার নিজের service account দেওয়া। একটি বিল্ড পাইপলাইন যার শুধু একটি Deployment আপডেট দরকার তার ক্লাস্টারের প্রতিটি Secret পড়তে পারা উচিত নয়।') },
        { p: l('Apply RBAC everywhere real people and automated systems touch the cluster: developers who should see their own namespace but not production, CI systems that deploy but must not read secrets they do not own, and every app whose pod has a service account. Start each grant from zero and add only what a task requires — it is far easier to widen a too-narrow Role when something legitimately needs more than it is to notice and claw back a too-broad one that has quietly become a security hole.', 'বাস্তব মানুষ ও স্বয়ংক্রিয় সিস্টেম ক্লাস্টার স্পর্শ করে সর্বত্র RBAC প্রয়োগ করুন: ডেভেলপার যাদের নিজের নেমস্পেস দেখা উচিত কিন্তু প্রোডাকশন নয়, CI সিস্টেম যা deploy করে কিন্তু নিজের নয় এমন secret পড়া উচিত নয়, ও প্রতিটি অ্যাপ যার পডে একটি service account আছে। প্রতিটি grant শূন্য থেকে শুরু করুন ও শুধু একটি কাজের যা দরকার তাই যোগ করুন — কিছুর বৈধভাবে বেশি দরকার হলে একটি খুব-সংকীর্ণ Role চওড়া করা অনেক সহজ, একটি খুব-প্রশস্ত Role খেয়াল করে ফিরিয়ে নেওয়ার চেয়ে যা নীরবে একটি নিরাপত্তা ছিদ্র হয়ে গেছে।') },
        { note: l('Never bind cluster-admin to an application’s service account for convenience. cluster-admin can do anything in the entire cluster, so a single compromised pod with that binding hands an attacker the whole cluster — every namespace, every secret, every node. If a pod truly needs elevated access, write a tight Role listing the exact resources and verbs, and bind only that.', 'সুবিধার জন্য কখনো একটি অ্যাপ্লিকেশনের service account-এ cluster-admin বাঁধবেন না। cluster-admin পুরো ক্লাস্টারে যেকোনো কিছু করতে পারে, তাই সেই বাইন্ডিংসহ একটি আপসকৃত পড একজন আক্রমণকারীকে পুরো ক্লাস্টার তুলে দেয় — প্রতিটি নেমস্পেস, প্রতিটি secret, প্রতিটি নোড। একটি পডের সত্যিই উঁচু অ্যাক্সেস দরকার হলে, ঠিক resources ও verbs তালিকা করা একটি আঁটসাঁট Role লিখুন, ও শুধু তাই বাঁধুন।'), kind: 'warn' },
      ],
    },
    {
      h: l('Common mistakes', 'সাধারণ ভুল'),
      blocks: [
        { list: [
          l('Granting cluster-admin to an app’s service account for convenience, massively widening the blast radius of any compromise.', 'সুবিধার জন্য একটি অ্যাপের service account-এ cluster-admin দেওয়া, যেকোনো আপসের blast radius ব্যাপকভাবে বাড়ানো।'),
          l('Using wildcards (resources: ["*"], verbs: ["*"]) in a Role, so it quietly grants far more than the task ever needs.', 'একটি Role-এ wildcard (resources: ["*"], verbs: ["*"]) ব্যবহার করা, ফলে এটি নীরবে কাজের যা দরকার তার চেয়ে অনেক বেশি দেয়।'),
          l('Reaching for a ClusterRole/ClusterRoleBinding when a namespaced Role would do, spreading permissions across the whole cluster.', 'যেখানে একটি নেমস্পেসড Role-ই যথেষ্ট সেখানে একটি ClusterRole/ClusterRoleBinding নেওয়া, পুরো ক্লাস্টারজুড়ে অনুমতি ছড়ানো।'),
          l('Never verifying with kubectl auth can-i, so an over-broad or missing grant goes unnoticed until it causes an incident.', 'kubectl auth can-i দিয়ে কখনো যাচাই না করা, ফলে একটি অতি-প্রশস্ত বা অনুপস্থিত grant একটি ঘটনা ঘটানোর আগে অলক্ষিত থাকে।'),
        ] },
      ],
    },
    {
      h: l('Remember in one line', 'এক লাইনে মনে রাখুন'),
      blocks: [
        { list: [
          l('A Role lists permissions; a RoleBinding attaches that Role to a user or service account — nothing is allowed by default.', 'একটি Role অনুমতি তালিকা করে; একটি RoleBinding সেই Role একটি user বা service account-এ যুক্ত করে — ডিফল্টে কিছুই অনুমোদিত নয়।'),
          l('Grant least privilege: narrow scope, specific verbs, one service account per app.', 'ন্যূনতম অধিকার দিন: সংকীর্ণ স্কোপ, নির্দিষ্ট verbs, প্রতি অ্যাপে একটি service account।'),
          l('Never hand cluster-admin to a pod — one broad binding can quietly give away the whole cluster.', 'একটি পডকে কখনো cluster-admin দেবেন না — একটি প্রশস্ত বাইন্ডিং নীরবে পুরো ক্লাস্টার দিয়ে দিতে পারে।'),
        ] },
      ],
    },
  ],
}
