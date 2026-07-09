// Deep, bilingual (English / Bangla) teaching guides for the Linux Fundamentals
// course — the Foundations module and the first navigation lesson. Shape mirrors
// app/course-guides.js and app/guides/git/a.js: each guide is an array of sections
// { h, blocks }, rendered by GuideBlock in app/LearningApp.js. Block types:
// { p }, { list }, { steps }, { table:{head,rows} }, { note, kind }, { code, caption }.
// Facts (definitions, analogies, commands, trade-offs, mistakes) come from app/courses/linux.js.

const l = (en, bn) => ({ en, bn })

export default {
  // ── lx-what · What is Linux? ──────────────────────────────────────────────
  'lx-what': [
    {
      h: l('What is Linux?', 'লিনাক্স কী?'),
      blocks: [
        { p: l('Linux is, at its core, an operating system kernel — the low-level program that sits between your hardware and everything else, managing the CPU, memory, storage, and devices so your applications do not have to. Strictly speaking, "Linux" is just that kernel, first released by Linus Torvalds in 1991 and still open-source today. What most people call "Linux" in daily life is a full operating system: the kernel plus a shell, system tools, libraries, and applications, packaged together into a distribution such as Ubuntu, Debian, or Fedora.', 'লিনাক্স মূলত একটি অপারেটিং সিস্টেম kernel — নিচু-স্তরের একটি প্রোগ্রাম যা আপনার hardware ও বাকি সবকিছুর মাঝে বসে CPU, memory, storage ও device সামলায়, যাতে আপনার application-কে তা করতে না হয়। কড়াভাবে বললে "Linux" বলতে শুধু সেই kernel বোঝায়, যা ১৯৯১ সালে Linus Torvalds প্রথম প্রকাশ করেন ও যা আজও open-source। দৈনন্দিন জীবনে বেশিরভাগ মানুষ যাকে "Linux" বলে তা একটি পূর্ণ অপারেটিং সিস্টেম: kernel-এর সঙ্গে shell, সিস্টেম টুল, library ও application, সব একসঙ্গে Ubuntu, Debian বা Fedora-এর মতো একটি distribution-এ প্যাকেজ করা।') },
        { p: l('The problem Linux solves is control and cost. Proprietary systems lock you into one vendor, one licence, and one way of doing things; Linux is free to run, inspect, modify, and copy onto as many machines as you like. That is exactly why it powers the vast majority of web servers, cloud platforms, Android phones, supercomputers, and embedded devices. Learning Linux is therefore less about one product and more about a shared foundation the whole industry stands on.', 'Linux যে সমস্যা সমাধান করে তা হলো নিয়ন্ত্রণ ও খরচ। মালিকানাধীন সিস্টেম আপনাকে এক vendor, এক licence ও এক কাজের ধারায় আটকে রাখে; Linux চালানো, দেখা, পরিবর্তন করা ও যত খুশি মেশিনে কপি করা ফ্রি। এ কারণেই এটি বেশিরভাগ web server, cloud প্ল্যাটফর্ম, Android ফোন, supercomputer ও embedded device চালায়। তাই Linux শেখা মানে একটি পণ্য শেখা নয়, বরং পুরো ইন্ডাস্ট্রি যে সাধারণ ভিত্তির ওপর দাঁড়িয়ে তা শেখা।') },
        { note: l('The kernel is the engine; a distribution is the whole car built around it — seats, dashboard, and controls. Two cars can share the same engine yet feel completely different to drive, and in the same way Ubuntu and Fedora share the Linux kernel while packaging it with different tools on top.', 'kernel হলো ইঞ্জিন; distribution হলো তার চারপাশে গড়া সিট, ড্যাশবোর্ড ও নিয়ন্ত্রণসহ পুরো গাড়ি। দুটি গাড়ি একই ইঞ্জিন শেয়ার করেও চালাতে সম্পূর্ণ ভিন্ন লাগতে পারে, ঠিক তেমনি Ubuntu ও Fedora একই Linux kernel শেয়ার করে কিন্তু ওপরে ভিন্ন টুল দিয়ে প্যাকেজ করে।'), kind: 'tip' },
      ],
    },
    {
      h: l('Kernel, distribution, and the shell', 'kernel, distribution ও shell'),
      blocks: [
        { p: l('When people say a Linux "distro," they mean a specific bundle: the Linux kernel, a package manager to install software, a default shell (usually bash), a set of core command-line tools (the GNU utilities), and often a desktop environment. Because the kernel and core tools are shared, a command you learn on Ubuntu almost always works the same on Debian, Fedora, or Amazon Linux.', 'কেউ যখন Linux "distro" বলে, তখন তারা একটি নির্দিষ্ট বান্ডেল বোঝায়: Linux kernel, software ইনস্টলের জন্য একটি package manager, একটি default shell (সাধারণত bash), মূল command-line টুলের একটি সেট (GNU utilities), আর প্রায়ই একটি desktop environment। kernel ও মূল টুল শেয়ার করা বলে, Ubuntu-তে শেখা একটি কমান্ড প্রায় সবসময় Debian, Fedora বা Amazon Linux-এও একইভাবে কাজ করে।') },
        { steps: [
          l('The kernel boots and takes charge of the hardware — CPU scheduling, memory, disks, and networking.', 'kernel boot হয়ে hardware-এর দায়িত্ব নেয় — CPU scheduling, memory, disk ও networking।'),
          l('Core system programs and services start up on top of the kernel.', 'kernel-এর ওপরে মূল সিস্টেম প্রোগ্রাম ও service চালু হয়।'),
          l('A shell (such as bash) gives you a text prompt to type commands into.', 'একটি shell (যেমন bash) আপনাকে কমান্ড টাইপ করার একটি text prompt দেয়।'),
          l('You run commands; the shell asks the kernel to carry them out and shows you the result.', 'আপনি কমান্ড চালান; shell kernel-কে তা করতে বলে ও ফল দেখায়।'),
          l('The same kernel and core tools appear across almost every distribution, so your skills transfer.', 'প্রায় প্রতিটি distribution-এ একই kernel ও মূল টুল থাকে, তাই আপনার দক্ষতা এক জায়গা থেকে অন্যত্র কাজে লাগে।'),
        ] },
        { code: `# Which kernel is running, and on what hardware?
uname -a
# Linux server 6.8.0-31-generic #31-Ubuntu SMP x86_64 GNU/Linux

# Which distribution and version is this?
cat /etc/os-release
# NAME="Ubuntu"
# VERSION="24.04 LTS (Noble Numbat)"

# Just the kernel version on its own
uname -r
# 6.8.0-31-generic`, caption: l('uname reports the shared kernel; /etc/os-release names the distribution wrapped around it.', 'uname শেয়ার করা kernel জানায়; /etc/os-release তার চারপাশে মোড়ানো distribution-এর নাম দেয়।') },
      ],
    },
    {
      h: l('Key commands — identify your system', 'মূল কমান্ড — নিজের সিস্টেম চিনুন'),
      blocks: [
        { table: {
          head: [l('Goal', 'লক্ষ্য'), l('Command', 'কমান্ড')],
          rows: [
            [l('See kernel and system info', 'kernel ও সিস্টেম তথ্য দেখুন'), l('uname -a', 'uname -a')],
            [l('Kernel version only', 'শুধু kernel version'), l('uname -r', 'uname -r')],
            [l('Distribution name and version', 'distribution নাম ও version'), l('cat /etc/os-release', 'cat /etc/os-release')],
            [l('OS, kernel and hostname together', 'OS, kernel ও hostname একসঙ্গে'), l('hostnamectl', 'hostnamectl')],
          ],
        } },
      ],
    },
    {
      h: l('The major distribution families', 'প্রধান distribution পরিবারগুলো'),
      blocks: [
        { p: l('There are hundreds of distributions, but they cluster into a few families that share a package manager and philosophy. Knowing which family you are on tells you how to install software and where things live.', 'শত শত distribution আছে, তবে সেগুলো কয়েকটি পরিবারে ভাগ হয় যারা একটি package manager ও দর্শন শেয়ার করে। আপনি কোন পরিবারে আছেন তা জানলে বুঝবেন কীভাবে software ইনস্টল করতে হয় ও জিনিস কোথায় থাকে।') },
        { table: {
          head: [l('Family', 'পরিবার'), l('Examples', 'উদাহরণ'), l('Install command', 'ইনস্টল কমান্ড')],
          rows: [
            [l('Debian / Ubuntu', 'Debian / Ubuntu'), l('Debian, Ubuntu, Mint', 'Debian, Ubuntu, Mint'), l('apt install pkg', 'apt install pkg')],
            [l('Red Hat', 'Red Hat'), l('RHEL, Fedora, CentOS, Rocky', 'RHEL, Fedora, CentOS, Rocky'), l('dnf install pkg', 'dnf install pkg')],
            [l('Arch', 'Arch'), l('Arch, Manjaro', 'Arch, Manjaro'), l('pacman -S pkg', 'pacman -S pkg')],
            [l('SUSE', 'SUSE'), l('openSUSE, SLES', 'openSUSE, SLES'), l('zypper install pkg', 'zypper install pkg')],
          ],
        } },
        { note: l('For servers and the cloud, the Debian/Ubuntu and Red Hat families dominate. Pick one, learn its package manager, and the rest of Linux is nearly identical across all of them.', 'server ও cloud-এর জন্য Debian/Ubuntu ও Red Hat পরিবার প্রাধান্য বিস্তার করে। একটি বেছে নিন, তার package manager শিখুন, আর Linux-এর বাকি সব প্রায় সব জায়গায় একই রকম।'), kind: 'tip' },
      ],
    },
    {
      h: l('When and where to use Linux', 'কখন ও কোথায় Linux ব্যবহার করবেন'),
      blocks: [
        { list: [
          l('Servers and the cloud — the default for web servers, databases, and virtually every cloud VM you will rent.', 'server ও cloud — web server, database ও প্রায় প্রতিটি ভাড়া নেওয়া cloud VM-এর ডিফল্ট।'),
          l('Containers and DevOps — Docker images and Kubernetes nodes are Linux underneath, so the shell you learn is the shell you deploy with.', 'container ও DevOps — Docker image ও Kubernetes node ভেতরে Linux, তাই যে shell শেখেন সেই shell দিয়েই deploy করেন।'),
          l('Development — many languages and tools are built Linux-first; matching your dev machine to your server avoids surprises.', 'development — অনেক ভাষা ও টুল প্রথমে Linux-এর জন্য বানানো; dev মেশিনকে server-এর সঙ্গে মেলালে অপ্রত্যাশিত সমস্যা এড়ানো যায়।'),
          l('Embedded and mobile — routers, smart TVs, cars, and Android all run a Linux kernel.', 'embedded ও mobile — router, smart TV, গাড়ি ও Android সবই একটি Linux kernel চালায়।'),
          l('Where it fits less naturally — some proprietary desktop software (certain design or office suites) is Windows/macOS-only, though alternatives usually exist.', 'যেখানে কম মানানসই — কিছু মালিকানাধীন desktop software (নির্দিষ্ট design বা office suite) শুধু Windows/macOS-এ চলে, যদিও সাধারণত বিকল্প থাকে।'),
        ] },
      ],
    },
    {
      h: l('Common mistakes', 'সাধারণ ভুল'),
      blocks: [
        { list: [
          l('Assuming every distro is a completely different world. Most share the same kernel, the same bash shell, and the same core commands — the biggest differences are the package manager and default versions.', 'ধরে নেওয়া প্রতিটি distro একদম আলাদা জগৎ। বেশিরভাগ একই kernel, একই bash shell ও একই মূল কমান্ড শেয়ার করে — সবচেয়ে বড় পার্থক্য package manager ও ডিফল্ট version।'),
          l('Chasing the "best" distro before learning the fundamentals. The shell skills you build transfer everywhere, so any mainstream distro (Ubuntu is a safe start) is fine.', 'ভিত্তি শেখার আগে "সেরা" distro-র পেছনে ছোটা। আপনার গড়া shell দক্ষতা সর্বত্র কাজে লাগে, তাই যেকোনো মূলধারার distro (শুরুতে Ubuntu নিরাপদ) চলবে।'),
          l('Running everything as the root superuser to avoid permission errors. Root can delete or overwrite anything with no warning; use a normal user and sudo only when needed.', 'permission error এড়াতে সবকিছু root superuser হিসেবে চালানো। root কোনো সতর্কতা ছাড়াই যেকোনো কিছু মুছতে বা overwrite করতে পারে; সাধারণ user ব্যবহার করুন ও প্রয়োজনেই কেবল sudo নিন।'),
          l('Expecting Windows software to run natively. Linux uses different formats and package managers; look for the Linux-native equivalent instead of forcing a Windows installer.', 'Windows software সরাসরি চলবে আশা করা। Linux ভিন্ন ফরম্যাট ও package manager ব্যবহার করে; Windows installer জোর না করে Linux-নেটিভ বিকল্প খুঁজুন।'),
        ] },
      ],
    },
    {
      h: l('Remember in one line', 'এক লাইনে মনে রাখুন'),
      blocks: [
        { list: [
          l('Linux is really just the kernel; a distribution bundles that kernel with a shell and tools into a usable system.', 'Linux আসলে শুধু kernel; একটি distribution সেই kernel-কে shell ও টুলসহ একটি ব্যবহারযোগ্য সিস্টেমে বান্ডেল করে।'),
          l('Distros differ mostly in their package manager and defaults — the kernel, shell, and core commands are shared, so your skills carry over.', 'distro-গুলো মূলত package manager ও ডিফল্টে আলাদা — kernel, shell ও মূল কমান্ড শেয়ার করা, তাই দক্ষতা এক জায়গা থেকে অন্যত্র যায়।'),
          l('Choose a mainstream distro (Ubuntu/Debian for servers), learn the common core, and do not run as root out of habit.', 'একটি মূলধারার distro বাছুন (server-এ Ubuntu/Debian), সাধারণ মূল অংশ শিখুন, আর অভ্যাসবশত root হিসেবে চালাবেন না।'),
        ] },
      ],
    },
  ],

  // ── lx-shell · The shell & terminal ───────────────────────────────────────
  'lx-shell': [
    {
      h: l('What is the shell (and the terminal)?', 'shell (ও terminal) কী?'),
      blocks: [
        { p: l('The shell is a program whose whole job is to read the commands you type, work out what you meant, and ask the operating system to carry them out. When you open a "terminal" and see a prompt waiting for input, the program reading that input is a shell — most commonly bash (the Bourne Again SHell), though zsh and others are popular too. Every command you will ever learn in Linux is typed into, and interpreted by, a shell.', 'shell হলো এমন একটি প্রোগ্রাম যার পুরো কাজ আপনার টাইপ করা কমান্ড পড়া, আপনি কী বোঝাতে চেয়েছেন তা বের করা, ও অপারেটিং সিস্টেমকে তা করতে বলা। আপনি যখন একটি "terminal" খোলেন ও ইনপুটের অপেক্ষায় একটি prompt দেখেন, সেই ইনপুট পড়া প্রোগ্রামটিই একটি shell — সবচেয়ে প্রচলিত bash (Bourne Again SHell), যদিও zsh ও অন্যগুলোও জনপ্রিয়। Linux-এ আপনি যত কমান্ড শিখবেন সব একটি shell-এ টাইপ করা ও তার দ্বারা ব্যাখ্যা করা হয়।') },
        { p: l('It helps to separate two things people often blur. The terminal (or "terminal emulator") is the window — it draws the text, handles the keyboard, and shows the output. The shell is the actual program running inside that window that understands commands. The terminal is the screen and keyboard; the shell is the brain behind them. The problem the shell solves is turning short human instructions like ls -la into the precise, low-level requests the kernel needs to list a directory.', 'মানুষ প্রায়ই যে দুটি জিনিস গুলিয়ে ফেলে তা আলাদা করা দরকার। terminal (বা "terminal emulator") হলো জানালা — এটি text আঁকে, keyboard সামলায় ও output দেখায়। shell হলো সেই জানালার ভেতরে চলা আসল প্রোগ্রাম যা কমান্ড বোঝে। terminal হলো পর্দা ও keyboard; shell হলো তাদের পেছনের মস্তিষ্ক। shell যে সমস্যা সমাধান করে তা হলো ls -la-এর মতো ছোট মানবিক নির্দেশকে kernel-এর দরকারি নিখুঁত, নিচু-স্তরের অনুরোধে পরিণত করা।') },
        { note: l('The shell is a translator between you and the machine. You speak in commands; it relays them in a language the operating system understands, then translates the reply back into text you can read.', 'shell হলো আপনার ও মেশিনের মধ্যে একজন অনুবাদক। আপনি কমান্ডে বলেন; এটি তা অপারেটিং সিস্টেমের বোঝার ভাষায় পৌঁছায়, তারপর উত্তর আবার আপনার পড়ার মতো text-এ অনুবাদ করে।'), kind: 'tip' },
      ],
    },
    {
      h: l('How the shell runs a command', 'shell কীভাবে একটি কমান্ড চালায়'),
      blocks: [
        { p: l('Every time you press Enter, the shell runs a small, repeatable cycle. Understanding it demystifies errors like "command not found" (the shell searched your PATH and found nothing) and explains why some commands, like cd, behave specially.', 'প্রতিবার Enter চাপলে shell একটি ছোট, পুনরাবৃত্তিযোগ্য চক্র চালায়। এটি বুঝলে "command not found"-এর মতো error স্পষ্ট হয় (shell আপনার PATH খুঁজে কিছু পায়নি) এবং কেন cd-এর মতো কিছু কমান্ড বিশেষভাবে আচরণ করে তা বোঝা যায়।') },
        { steps: [
          l('Read — the shell reads the whole line you typed until you press Enter.', 'Read — আপনি Enter না চাপা পর্যন্ত shell পুরো লাইনটি পড়ে।'),
          l('Expand and parse — it splits the line into a command and arguments and expands things like *, ~, and $HOME.', 'Expand ও parse — এটি লাইনকে একটি কমান্ড ও argument-এ ভাগ করে এবং *, ~ ও $HOME-এর মতো জিনিস expand করে।'),
          l('Locate — for an external command it searches each directory in your PATH for a matching program.', 'Locate — একটি external কমান্ডের জন্য এটি PATH-এর প্রতিটি ডিরেক্টরিতে মেলানো প্রোগ্রাম খোঁজে।'),
          l('Execute — it asks the kernel to start that program as a new process, passing along your arguments.', 'Execute — এটি kernel-কে সেই প্রোগ্রামটি একটি নতুন process হিসেবে চালু করতে বলে, আপনার argument সঙ্গে দিয়ে।'),
          l('Report — it shows you the program output, then prints a fresh prompt, ready for the next command.', 'Report — এটি প্রোগ্রামের output দেখায়, তারপর পরের কমান্ডের জন্য প্রস্তুত একটি নতুন prompt ছাপে।'),
        ] },
        { code: `# The prompt is printed by the shell, waiting for you
whoami
# ada

# ls is an external program the shell finds on your PATH
ls -la

# Some commands (cd, echo, export) are built into the shell itself
type cd
# cd is a shell builtin
type ls
# ls is /usr/bin/ls

# $SHELL holds the path to your current shell
echo $SHELL
# /bin/bash`, caption: l('type tells you whether a name is a shell builtin or an external program the shell finds on PATH.', 'type জানায় একটি নাম shell builtin নাকি PATH-এ shell যে external প্রোগ্রাম পায় তা।') },
      ],
    },
    {
      h: l('Key commands — know your shell', 'মূল কমান্ড — নিজের shell জানুন'),
      blocks: [
        { table: {
          head: [l('Goal', 'লক্ষ্য'), l('Command', 'কমান্ড')],
          rows: [
            [l('See your current shell', 'বর্তমান shell দেখুন'), l('echo $SHELL', 'echo $SHELL')],
            [l('List installed shells', 'ইনস্টল করা shell তালিকা'), l('cat /etc/shells', 'cat /etc/shells')],
            [l('Check the bash version', 'bash version দেখুন'), l('bash --version', 'bash --version')],
            [l('See recent commands', 'সাম্প্রতিক কমান্ড দেখুন'), l('history', 'history')],
          ],
        } },
      ],
    },
    {
      h: l('Moving fast in the shell', 'shell-এ দ্রুত চলা'),
      blocks: [
        { p: l('The shell rewards a handful of keyboard habits. These are the difference between typing slowly and flying, so build them early — the prompt, tab-completion, and the history keys are what make an expert look fast.', 'shell কয়েকটি keyboard অভ্যাসের পুরস্কার দেয়। এগুলোই ধীরে টাইপ করা ও উড়ে চলার মধ্যে পার্থক্য, তাই শুরুতেই গড়ে তুলুন — prompt, tab-completion ও history কী-ই একজন বিশেষজ্ঞকে দ্রুত দেখায়।') },
        { list: [
          l('Tab completion — start a command or path and press Tab; the shell finishes it, or shows the options. It prevents typos in long paths.', 'Tab completion — একটি কমান্ড বা path শুরু করে Tab চাপুন; shell তা শেষ করে বা বিকল্প দেখায়। এটি লম্বা path-এ টাইপো ঠেকায়।'),
          l('Command history — press the Up arrow to recall previous commands, or Ctrl+R to search history for a command you ran before.', 'Command history — আগের কমান্ড ফিরে পেতে Up arrow চাপুন, বা আগে চালানো কমান্ড খুঁজতে Ctrl+R চাপুন।'),
          l('Ctrl+C — cancels the command currently running, getting you back to a prompt.', 'Ctrl+C — বর্তমানে চলা কমান্ড বাতিল করে আপনাকে prompt-এ ফেরায়।'),
          l('Ctrl+A / Ctrl+E — jump to the start / end of the line without holding the arrow key.', 'Ctrl+A / Ctrl+E — arrow কী চেপে না রেখে লাইনের শুরু / শেষে লাফ দিন।'),
          l('Ctrl+L — clears the screen, the same as the clear command.', 'Ctrl+L — পর্দা পরিষ্কার করে, clear কমান্ডের মতোই।'),
        ] },
        { note: l('Tab-completion is also a safety check: if a path does not auto-complete, it probably does not exist — better to find that out before you run rm on it.', 'Tab-completion একটি নিরাপত্তা যাচাইও: একটি path যদি auto-complete না হয়, সম্ভবত তা নেই — rm চালানোর আগে সেটা জেনে নেওয়া ভালো।'), kind: 'tip' },
      ],
    },
    {
      h: l('When and where you use the shell', 'কখন ও কোথায় shell ব্যবহার করবেন'),
      blocks: [
        { p: l('You reach for the shell any time a graphical click is slow, unavailable, or not repeatable. On a remote server reached over SSH there is often no desktop at all — the shell is the only interface. It shines when you need to do the same thing to hundreds of files, chain tools together with pipes, or capture the exact steps in a script so they run identically next time. On your own laptop a file manager is fine for casual work, but the moment a task is repetitive or must run on a server, the shell wins.', 'graphical ক্লিক যখন ধীর, অনুপলব্ধ বা পুনরাবৃত্তিযোগ্য নয়, তখনই আপনি shell-এর দিকে যান। SSH দিয়ে পৌঁছানো একটি remote server-এ প্রায়ই কোনো desktop-ই থাকে না — shell-ই একমাত্র interface। এটি জ্বলে ওঠে যখন শত শত ফাইলে একই কাজ করতে হয়, pipe দিয়ে টুল জোড়া লাগাতে হয়, বা একটি script-এ ঠিক ধাপগুলো ধরে রাখতে হয় যাতে পরেরবার হুবহু চলে। নিজের laptop-এ সাধারণ কাজে file manager ঠিক আছে, কিন্তু কাজটি পুনরাবৃত্ত হলে বা server-এ চালাতে হলে shell জেতে।') },
      ],
    },
    {
      h: l('Common mistakes', 'সাধারণ ভুল'),
      blocks: [
        { list: [
          l('Running a powerful command — especially rm, mv, or dd — without reading it carefully first. The shell does exactly what you said, instantly, and there is no undo.', 'একটি শক্তিশালী কমান্ড — বিশেষত rm, mv বা dd — মন দিয়ে না পড়ে চালানো। shell ঠিক যা বলেছেন তা-ই সঙ্গে সঙ্গে করে, আর কোনো undo নেই।'),
          l('Forgetting there is no recycle bin. rm -rf deletes a directory and everything inside it permanently; always check the path before pressing Enter.', 'ভুলে যাওয়া যে কোনো recycle bin নেই। rm -rf একটি ডিরেক্টরি ও তার ভেতরের সব স্থায়ীভাবে মুছে দেয়; Enter চাপার আগে সবসময় path যাচাই করুন।'),
          l('Confusing the terminal with the shell, then being surprised the same commands work in a different terminal app — the shell underneath is what matters.', 'terminal ও shell গুলিয়ে ফেলা, তারপর অন্য terminal অ্যাপে একই কমান্ড কাজ করলে অবাক হওয়া — ভেতরের shell-ই আসল।'),
          l('Retyping long commands by hand instead of using history and tab-completion, which is both slower and more error-prone.', 'history ও tab-completion ব্যবহার না করে লম্বা কমান্ড হাতে আবার টাইপ করা, যা ধীর ও বেশি ভুলপ্রবণ।'),
          l('Assuming a failed command did nothing. Read the error message; "command not found" means a typo or missing program, not that Linux is broken.', 'ধরে নেওয়া ব্যর্থ কমান্ড কিছুই করেনি। error বার্তা পড়ুন; "command not found" মানে টাইপো বা অনুপস্থিত প্রোগ্রাম, Linux ভেঙে গেছে তা নয়।'),
        ] },
      ],
    },
    {
      h: l('Remember in one line', 'এক লাইনে মনে রাখুন'),
      blocks: [
        { list: [
          l('The shell reads your commands and asks the kernel to run them; the terminal is just the window it runs in.', 'shell আপনার কমান্ড পড়ে ও kernel-কে চালাতে বলে; terminal শুধু সেই জানালা যেখানে এটি চলে।'),
          l('Learn tab-completion, history (Up / Ctrl+R), and Ctrl+C early — they make you fast and help avoid mistakes.', 'শুরুতেই tab-completion, history (Up / Ctrl+R) ও Ctrl+C শিখুন — এগুলো আপনাকে দ্রুত করে ও ভুল এড়াতে সাহায্য করে।'),
          l('The shell has no undo, so read powerful commands like rm -rf before you press Enter.', 'shell-এ কোনো undo নেই, তাই Enter চাপার আগে rm -rf-এর মতো শক্তিশালী কমান্ড পড়ুন।'),
        ] },
      ],
    },
  ],

  // ── lx-filesystem · The filesystem hierarchy ──────────────────────────────
  'lx-filesystem': [
    {
      h: l('What is the filesystem hierarchy?', 'filesystem hierarchy কী?'),
      blocks: [
        { p: l('In Linux, every file and directory lives in one single tree that starts at the root, written as a single forward slash /. There are no drive letters like C: or D:; a second disk, a USB stick, or a network share is simply mounted onto a directory somewhere inside that one tree. This layout follows a shared convention called the Filesystem Hierarchy Standard (FHS), which is why /etc, /home, and /var mean the same thing on almost every distribution.', 'Linux-এ প্রতিটি ফাইল ও ডিরেক্টরি একটি একক গাছে থাকে যা root থেকে শুরু হয়, লেখা হয় একটি forward slash / দিয়ে। C: বা D:-এর মতো কোনো drive letter নেই; দ্বিতীয় একটি disk, একটি USB stick বা একটি network share শুধু সেই এক গাছের ভেতরে কোনো ডিরেক্টরিতে mount করা হয়। এই বিন্যাস Filesystem Hierarchy Standard (FHS) নামে একটি সাধারণ রীতি অনুসরণ করে, এ কারণেই /etc, /home ও /var প্রায় প্রতিটি distribution-এ একই অর্থ বহন করে।') },
        { p: l('The problem this solves is predictability. Because every system agrees that configuration lives in /etc, logs live in /var/log, and user files live in /home, you — and any script — can find things without guessing. One well-known structure makes the whole system navigable and automatable, whether you are on your laptop or a server you have never logged into before.', 'এটি যে সমস্যা সমাধান করে তা হলো পূর্বানুমেয়তা। প্রতিটি সিস্টেম একমত যে configuration থাকে /etc-এ, log থাকে /var/log-এ, আর user ফাইল থাকে /home-এ, তাই আপনি — ও যেকোনো script — অনুমান ছাড়াই জিনিস খুঁজে পান। একটি সুপরিচিত কাঠামো পুরো সিস্টেমকে চলাচলযোগ্য ও automate-যোগ্য করে, আপনি নিজের laptop-এ থাকুন বা আগে কখনো login না করা একটি server-এ।') },
        { note: l('Think of the whole system as one filing cabinet where every drawer has a fixed, labelled purpose: one drawer for personal files, one for settings, one for logs, one for installed programs. You never dump papers randomly; you learn which drawer holds what.', 'পুরো সিস্টেমকে একটি ফাইলিং ক্যাবিনেট ভাবুন যেখানে প্রতিটি ড্রয়ারের একটি নির্দিষ্ট, লেবেলযুক্ত উদ্দেশ্য: একটি ড্রয়ার ব্যক্তিগত ফাইলের, একটি সেটিংয়ের, একটি log-এর, একটি ইনস্টল করা প্রোগ্রামের। আপনি কখনো এলোমেলোভাবে কাগজ ফেলেন না; কোন ড্রয়ারে কী থাকে তা শেখেন।'), kind: 'tip' },
      ],
    },
    {
      h: l('Walking the tree from the root', 'root থেকে গাছে হাঁটা'),
      blocks: [
        { p: l('The fastest way to learn the layout is to stand at the root and look around. Everything branches out from /.', 'বিন্যাস শেখার দ্রুততম উপায় হলো root-এ দাঁড়িয়ে চারপাশ দেখা। সবকিছু / থেকে শাখা মেলে।') },
        { steps: [
          l('Go to the very top of the tree with cd /.', 'cd / দিয়ে গাছের একদম চূড়ায় যান।'),
          l('List what is there with ls; you will see the standard top-level directories.', 'ls দিয়ে সেখানে কী আছে তালিকা করুন; আপনি প্রমিত শীর্ষ-স্তরের ডিরেক্টরি দেখবেন।'),
          l('Step into one, like cd /etc, and list it to see configuration files.', 'একটিতে ঢুকুন, যেমন cd /etc, ও তালিকা করে configuration ফাইল দেখুন।'),
          l('Use pwd at any time to confirm exactly where in the tree you are.', 'গাছের ঠিক কোথায় আছেন নিশ্চিত হতে যেকোনো সময় pwd ব্যবহার করুন।'),
          l('Return to your own home directory with cd ~ when you are done exploring.', 'ঘোরা শেষ হলে cd ~ দিয়ে নিজের home ডিরেক্টরিতে ফিরুন।'),
        ] },
        { code: `cd /
ls
# bin  boot  dev  etc  home  lib  proc  root  tmp  usr  var

# Configuration for the whole system lives here
ls /etc | head -n 3
# hostname
# hosts
# passwd

# Your personal files live under /home/<you>
echo $HOME
# /home/ada`, caption: l('One root, then a handful of standard directories beneath it — the same on nearly every Linux machine.', 'একটি root, তারপর তার নিচে কয়েকটি প্রমিত ডিরেক্টরি — প্রায় প্রতিটি Linux মেশিনে একই।') },
      ],
    },
    {
      h: l('The standard directories', 'প্রমিত ডিরেক্টরিগুলো'),
      blocks: [
        { table: {
          head: [l('Directory', 'ডিরেক্টরি'), l('What it holds', 'কী থাকে')],
          rows: [
            [l('/', '/'), l('The root of the entire tree; everything hangs off it.', 'পুরো গাছের root; সবকিছু এর নিচে ঝোলে।')],
            [l('/home', '/home'), l('Personal files, one folder per user (e.g. /home/ada).', 'ব্যক্তিগত ফাইল, প্রতি user-এ একটি ফোল্ডার (যেমন /home/ada)।')],
            [l('/root', '/root'), l('The home directory of the root (administrator) user.', 'root (প্রশাসক) user-এর home ডিরেক্টরি।')],
            [l('/etc', '/etc'), l('System-wide configuration files, all plain text.', 'পুরো সিস্টেমের configuration ফাইল, সব plain text।')],
            [l('/var', '/var'), l('Variable data that changes as the system runs — logs, mail, caches.', 'সিস্টেম চলার সঙ্গে বদলানো পরিবর্তনশীল data — log, mail, cache।')],
            [l('/var/log', '/var/log'), l('Log files; the first place to look when something breaks.', 'log ফাইল; কিছু ভাঙলে প্রথমে যেখানে দেখবেন।')],
            [l('/usr', '/usr'), l('Installed programs and their libraries (/usr/bin holds most commands).', 'ইনস্টল করা প্রোগ্রাম ও তাদের library (/usr/bin-এ বেশিরভাগ কমান্ড থাকে)।')],
            [l('/bin, /sbin', '/bin, /sbin'), l('Essential commands (often symlinked into /usr on modern systems).', 'অপরিহার্য কমান্ড (আধুনিক সিস্টেমে প্রায়ই /usr-এ symlink করা)।')],
            [l('/tmp', '/tmp'), l('Temporary files; usually cleared on reboot.', 'অস্থায়ী ফাইল; সাধারণত reboot-এ মুছে যায়।')],
            [l('/dev', '/dev'), l('Device files representing hardware (disks, terminals).', 'hardware প্রতিনিধিত্বকারী device ফাইল (disk, terminal)।')],
            [l('/proc', '/proc'), l('Virtual files exposing running processes and kernel info.', 'চলমান process ও kernel তথ্য দেখানো virtual ফাইল।')],
            [l('/boot', '/boot'), l('The kernel and files needed to start the system.', 'kernel ও সিস্টেম চালু করতে দরকারি ফাইল।')],
          ],
        } },
      ],
    },
    {
      h: l('Key commands — explore the hierarchy', 'মূল কমান্ড — hierarchy ঘুরে দেখুন'),
      blocks: [
        { table: {
          head: [l('Goal', 'লক্ষ্য'), l('Command', 'কমান্ড')],
          rows: [
            [l('List the root directory', 'root ডিরেক্টরি তালিকা'), l('ls /', 'ls /')],
            [l('See the tree one level deep', 'গাছ এক স্তর গভীর দেখুন'), l('tree -L 1 /', 'tree -L 1 /')],
            [l('Read the hierarchy manual', 'hierarchy manual পড়ুন'), l('man hier', 'man hier')],
            [l('Check disk space per filesystem', 'filesystem-প্রতি disk স্পেস'), l('df -h', 'df -h')],
          ],
        } },
        { note: l('tree is not always installed; add it with your package manager (e.g. apt install tree) or use ls to explore one level at a time.', 'tree সবসময় ইনস্টল থাকে না; package manager দিয়ে যোগ করুন (যেমন apt install tree) অথবা ls দিয়ে এক স্তর করে ঘুরে দেখুন।'), kind: 'tip' },
      ],
    },
    {
      h: l('When and where this matters', 'কখন ও কোথায় এটি গুরুত্বপূর্ণ'),
      blocks: [
        { p: l('Knowing the tree turns vague instructions into concrete actions. When a tutorial says "edit your web server config," you know to look in /etc (for example /etc/nginx). When a service misbehaves, you go straight to /var/log to read what happened. When you install software, its command lands in /usr/bin so the shell can find it on your PATH. And when you need to inspect the running system itself, /proc and /dev expose it as ordinary-looking files. The hierarchy is the map that makes all of this routine instead of a scavenger hunt.', 'গাছ জানা অস্পষ্ট নির্দেশকে সুনির্দিষ্ট কাজে পরিণত করে। একটি tutorial যখন বলে "আপনার web server config এডিট করুন," আপনি জানেন /etc-এ দেখতে হবে (যেমন /etc/nginx)। একটি service গোলমাল করলে আপনি সরাসরি /var/log-এ গিয়ে কী ঘটেছে পড়েন। software ইনস্টল করলে তার কমান্ড /usr/bin-এ নামে, তাই shell তা PATH-এ খুঁজে পায়। আর চলমান সিস্টেম নিজেই পরীক্ষা করতে চাইলে /proc ও /dev একে সাধারণ-দেখতে ফাইল হিসেবে দেখায়। hierarchy হলো সেই মানচিত্র যা এসব খোঁজাখুঁজির বদলে রুটিন কাজ বানায়।') },
      ],
    },
    {
      h: l('Common mistakes', 'সাধারণ ভুল'),
      blocks: [
        { list: [
          l('Editing files under /etc or /var without a backup, then breaking a service with no easy way back. Copy the file first (cp file file.bak) before changing it.', 'ব্যাকআপ ছাড়া /etc বা /var-এর ফাইল এডিট করা, তারপর সহজ ফেরার পথ ছাড়াই একটি service ভাঙা। বদলানোর আগে ফাইলটি আগে কপি করুন (cp file file.bak)।'),
          l('Running a destructive command against a system path. rm -rf / (or a stray space, as in rm -rf / tmp instead of rm -rf /tmp) can wipe the whole tree — always read the path.', 'একটি সিস্টেম path-এ ধ্বংসাত্মক কমান্ড চালানো। rm -rf / (বা একটি ভুল space, যেমন rm -rf /tmp-এর বদলে rm -rf / tmp) পুরো গাছ মুছে দিতে পারে — সবসময় path পড়ুন।'),
          l('Storing your own projects in system directories like /usr or /opt. Keep personal work under /home where you own the files and will not need sudo.', 'নিজের project-গুলো /usr বা /opt-এর মতো সিস্টেম ডিরেক্টরিতে রাখা। ব্যক্তিগত কাজ /home-এ রাখুন যেখানে ফাইলের মালিক আপনি ও sudo লাগবে না।'),
          l('Confusing / (the root of the tree) with ~ or /root (the root user home). They are three different things.', '/ (গাছের root), ~ ও /root (root user-এর home) গুলিয়ে ফেলা। এরা তিনটি ভিন্ন জিনিস।'),
          l('Assuming a USB drive gets a new "drive letter." In Linux it is mounted into the existing tree, often under /mnt or /media.', 'ধরে নেওয়া একটি USB drive নতুন "drive letter" পায়। Linux-এ এটি বিদ্যমান গাছে mount হয়, প্রায়ই /mnt বা /media-র নিচে।'),
        ] },
      ],
    },
    {
      h: l('Remember in one line', 'এক লাইনে মনে রাখুন'),
      blocks: [
        { list: [
          l('Everything lives under one root /, with no drive letters; other disks are mounted into the same tree.', 'সবকিছু একটি root /-এর নিচে থাকে, কোনো drive letter নেই; অন্য disk একই গাছে mount হয়।'),
          l('Learn the key drawers: /home (your files), /etc (config), /var/log (logs), /usr/bin (programs).', 'মূল ড্রয়ারগুলো শিখুন: /home (আপনার ফাইল), /etc (config), /var/log (log), /usr/bin (প্রোগ্রাম)।'),
          l('The layout is a shared standard (FHS), so paths mean the same thing across distributions — and one wrong path can hit a critical file.', 'বিন্যাসটি একটি সাধারণ standard (FHS), তাই path distribution জুড়ে একই অর্থ বহন করে — আর একটি ভুল path একটি সংকটপূর্ণ ফাইলে লাগতে পারে।'),
        ] },
      ],
    },
  ],

  // ── lx-everything-file · Everything is a file ─────────────────────────────
  'lx-everything-file': [
    {
      h: l('What does "everything is a file" mean?', '"সবকিছুই একটি ফাইল" মানে কী?'),
      blocks: [
        { p: l('One of Linux’s defining ideas is that almost everything is represented as a file. Obvious things — your documents and photos — are files, but so are directories, hardware devices like disks and keyboards, and even live information about the running system such as memory usage or a process’s details. They all appear at a path in the filesystem and respond to the same basic operations: open, read, write, close.', 'Linux-এর একটি স্বকীয় ধারণা হলো প্রায় সবকিছুই একটি ফাইল হিসেবে উপস্থাপিত হয়। স্পষ্ট জিনিস — আপনার document ও ছবি — ফাইল, কিন্তু ডিরেক্টরি, disk ও keyboard-এর মতো hardware device, এমনকি চলমান সিস্টেমের সরাসরি তথ্য যেমন memory ব্যবহার বা একটি process-এর বিবরণও ফাইল। এরা সবাই filesystem-এ একটি path-এ দেখা যায় ও একই মৌলিক অপারেশনে সাড়া দেয়: open, read, write, close।') },
        { p: l('The problem this design solves is having to learn a different tool for every kind of thing. Because a hard disk, a terminal, and a text document all look like files, the same small set of commands — cat, echo, cp, and redirection with > — works on all of them. A uniform interface means fewer special cases and enormous flexibility: you can pipe the output of one thing straight into another regardless of what they physically are. It is "almost" everything, though — a few things like network sockets are file-like without being real filesystem paths.', 'এই নকশা যে সমস্যা সমাধান করে তা হলো প্রতিটি ধরনের জিনিসের জন্য আলাদা টুল শেখা। একটি hard disk, একটি terminal ও একটি text document সবই ফাইলের মতো দেখায় বলে একই ছোট কমান্ড সেট — cat, echo, cp ও > দিয়ে redirection — সবকিছুতে কাজ করে। একটি অভিন্ন interface মানে কম বিশেষ ক্ষেত্র ও বিপুল নমনীয়তা: একটির output সরাসরি আরেকটিতে pipe করতে পারেন, তারা শারীরিকভাবে যা-ই হোক। তবে এটি "প্রায়" সবকিছু — network socket-এর মতো কিছু জিনিস ফাইলের মতো হলেও আসল filesystem path নয়।') },
        { note: l('It is like a universal socket. Because every appliance plugs in the same way — as a file — the same tools work on all of them, and you do not need a different adapter for the disk, the screen, and the document.', 'এটি একটি সর্বজনীন সকেটের মতো। প্রতিটি যন্ত্র একইভাবে — ফাইল হিসেবে — যুক্ত হয় বলে একই টুল সবকিছুতে কাজ করে, আর disk, পর্দা ও document-এর জন্য আলাদা adapter লাগে না।'), kind: 'tip' },
      ],
    },
    {
      h: l('The kinds of files', 'ফাইলের ধরনগুলো'),
      blocks: [
        { p: l('If everything is a file, how do you tell them apart? The very first character of ls -l output names the type, so you can read at a glance whether something is an ordinary file, a directory, or a device.', 'সবকিছুই যদি ফাইল হয়, তবে এদের আলাদা করবেন কীভাবে? ls -l output-এর একদম প্রথম অক্ষরটি ধরন জানায়, তাই এক নজরে পড়তে পারেন কিছু একটি সাধারণ ফাইল, ডিরেক্টরি নাকি device।') },
        { table: {
          head: [l('First char (ls -l)', 'প্রথম অক্ষর (ls -l)'), l('Type', 'ধরন'), l('Example', 'উদাহরণ')],
          rows: [
            [l('-', '-'), l('Regular file', 'সাধারণ ফাইল'), l('a text file, image, or program', 'একটি text ফাইল, ছবি বা প্রোগ্রাম')],
            [l('d', 'd'), l('Directory', 'ডিরেক্টরি'), l('/home, /etc', '/home, /etc')],
            [l('l', 'l'), l('Symbolic link', 'symbolic link'), l('a shortcut pointing elsewhere', 'অন্য কোথাও নির্দেশ করা একটি shortcut')],
            [l('c', 'c'), l('Character device', 'character device'), l('/dev/null, a terminal', '/dev/null, একটি terminal')],
            [l('b', 'b'), l('Block device', 'block device'), l('/dev/sda (a whole disk)', '/dev/sda (একটি পুরো disk)')],
            [l('s', 's'), l('Socket', 'socket'), l('a local inter-process channel', 'একটি লোকাল inter-process চ্যানেল')],
            [l('p', 'p'), l('Named pipe (FIFO)', 'named pipe (FIFO)'), l('a channel between commands', 'কমান্ডের মধ্যে একটি চ্যানেল')],
          ],
        } },
      ],
    },
    {
      h: l('How one interface serves many things', 'একটি interface কীভাবে অনেক কিছুর কাজ করে'),
      blocks: [
        { p: l('The payoff is that reading hardware or system state uses the very same commands as reading a document.', 'সুবিধাটি হলো hardware বা সিস্টেমের অবস্থা পড়া একটি document পড়ার হুবহু একই কমান্ড ব্যবহার করে।') },
        { steps: [
          l('Ask what a path actually is with file <path> — it tells you regular file, directory, device, and so on.', 'file <path> দিয়ে জিজ্ঞাসা করুন একটি path আসলে কী — এটি জানায় সাধারণ ফাইল, ডিরেক্টরি, device ইত্যাদি।'),
          l('Look at device files with ls -l /dev; the leading b or c marks them as block or character devices, not ordinary data.', 'ls -l /dev দিয়ে device ফাইল দেখুন; সামনের b বা c এদের block বা character device হিসেবে চিহ্নিত করে, সাধারণ data নয়।'),
          l('Read live kernel information straight out of /proc as if it were a text file, e.g. cat /proc/cpuinfo.', '/proc থেকে সরাসরি live kernel তথ্য পড়ুন যেন এটি একটি text ফাইল, যেমন cat /proc/cpuinfo।'),
          l('Inspect any file metadata (size, type, permissions, timestamps) with stat <path>.', 'stat <path> দিয়ে যেকোনো ফাইলের metadata (আকার, ধরন, permission, timestamp) পরীক্ষা করুন।'),
          l('Because these are all "files," you can redirect and pipe them with the same >, <, and | you use anywhere else.', 'যেহেতু এরা সবাই "ফাইল," আপনি এগুলোকে অন্য সব জায়গার মতো একই >, < ও | দিয়ে redirect ও pipe করতে পারেন।'),
        ] },
        { code: `# What kind of "file" is this really?
file /dev/sda
# /dev/sda: block special

file /etc/hostname
# /etc/hostname: ASCII text

# The kernel exposes hardware as readable files under /proc
cat /proc/cpuinfo | head -n 2
# processor : 0
# vendor_id : GenuineIntel

# /dev/null is a real device file that discards anything written to it
echo "goodbye" > /dev/null   # the text vanishes, on purpose`, caption: l('The same cat, echo, and > work on a disk, a kernel info file, and the "black hole" /dev/null.', 'একই cat, echo ও > একটি disk, একটি kernel-তথ্য ফাইল ও "black hole" /dev/null-এ কাজ করে।') },
      ],
    },
    {
      h: l('Key commands — inspecting files of every kind', 'মূল কমান্ড — সব ধরনের ফাইল পরীক্ষা'),
      blocks: [
        { table: {
          head: [l('Goal', 'লক্ষ্য'), l('Command', 'কমান্ড')],
          rows: [
            [l('Identify a file type', 'একটি ফাইলের ধরন চিহ্নিত করুন'), l('file <path>', 'file <path>')],
            [l('Show detailed metadata', 'বিস্তারিত metadata দেখুন'), l('stat <path>', 'stat <path>')],
            [l('List device files', 'device ফাইল তালিকা'), l('ls -l /dev', 'ls -l /dev')],
            [l('Read kernel/system info', 'kernel/সিস্টেম তথ্য পড়ুন'), l('cat /proc/cpuinfo', 'cat /proc/cpuinfo')],
          ],
        } },
      ],
    },
    {
      h: l('When and where this matters', 'কখন ও কোথায় এটি গুরুত্বপূর্ণ'),
      blocks: [
        { p: l('This idea quietly powers everyday work. Redirecting unwanted output to /dev/null relies on a device behaving like a file. Monitoring tools read /proc and /sys to report CPU, memory, and network stats — no special API, just files. Writing a disk image with a tool like dd targets a block device such as /dev/sdb as though it were a file. And because directories are files too, the same permissions model protects them. Once you see the pattern, large parts of Linux stop looking like separate systems and start looking like one filesystem you already know how to use.', 'এই ধারণা নীরবে দৈনন্দিন কাজ চালায়। অবাঞ্ছিত output /dev/null-এ redirect করা একটি device-এর ফাইলের মতো আচরণের ওপর নির্ভর করে। Monitoring টুল CPU, memory ও network পরিসংখ্যান জানাতে /proc ও /sys পড়ে — কোনো বিশেষ API নয়, শুধু ফাইল। dd-এর মতো টুল দিয়ে একটি disk image লেখা /dev/sdb-এর মতো একটি block device-কে ফাইলের মতো লক্ষ্য করে। আর ডিরেক্টরিও ফাইল বলে একই permission মডেল এদের রক্ষা করে। একবার প্যাটার্নটি দেখলে Linux-এর বড় অংশ আলাদা সিস্টেমের মতো দেখানো বন্ধ করে একটি filesystem-এর মতো দেখাতে শুরু করে যা আপনি আগেই ব্যবহার করতে জানেন।') },
      ],
    },
    {
      h: l('Common mistakes', 'সাধারণ ভুল'),
      blocks: [
        { list: [
          l('Treating a device file like an ordinary text file and writing to it carelessly. Commands like echo ... > /dev/sda or dd of=/dev/sda write straight to a raw disk and can destroy every file on it instantly — always double-check the device name.', 'একটি device ফাইলকে সাধারণ text ফাইলের মতো ধরে অসাবধানে লেখা। echo ... > /dev/sda বা dd of=/dev/sda-এর মতো কমান্ড সরাসরি raw disk-এ লেখে ও এর প্রতিটি ফাইল সঙ্গে সঙ্গে ধ্বংস করতে পারে — সবসময় device নাম দুবার যাচাই করুন।'),
          l('Confusing /dev/sda (a whole disk) with /dev/sda1 (a partition on it); writing to the wrong one wrecks data.', '/dev/sda (একটি পুরো disk) ও /dev/sda1 (এর ওপর একটি partition) গুলিয়ে ফেলা; ভুলটিতে লিখলে data নষ্ট হয়।'),
          l('Editing files under /proc or /sys expecting normal file behaviour. Many are virtual, generated on the fly, and changing them tweaks live kernel settings.', '/proc বা /sys-এর ফাইল সাধারণ ফাইল আচরণ আশা করে এডিট করা। অনেকগুলো virtual, তাৎক্ষণিকভাবে তৈরি, আর এগুলো বদলালে সরাসরি kernel সেটিং পরিবর্তন হয়।'),
          l('Thinking "everything is a file" is literally 100% true. It is a powerful model, but a few things (like network sockets) are file-like without being real paths.', 'ভাবা "সবকিছুই একটি ফাইল" আক্ষরিকভাবে ১০০% সত্য। এটি একটি শক্তিশালী মডেল, তবে কিছু জিনিস (যেমন network socket) ফাইলের মতো হলেও আসল path নয়।'),
          l('Running raw-device commands as root without reading them; there is no undo, and the tools assume you meant exactly what you typed.', 'raw-device কমান্ড root হিসেবে না পড়ে চালানো; কোনো undo নেই, আর টুলগুলো ধরে নেয় আপনি ঠিক যা টাইপ করেছেন তা-ই বুঝিয়েছেন।'),
        ] },
      ],
    },
    {
      h: l('Remember in one line', 'এক লাইনে মনে রাখুন'),
      blocks: [
        { list: [
          l('Almost everything in Linux — documents, directories, devices, even process info — is exposed as a file at a path.', 'Linux-এ প্রায় সবকিছু — document, ডিরেক্টরি, device, এমনকি process তথ্য — একটি path-এ ফাইল হিসেবে দেখা যায়।'),
          l('One uniform interface means the same tools (cat, echo, cp, >, |) work on documents, /dev devices, and /proc info alike.', 'একটি অভিন্ন interface মানে একই টুল (cat, echo, cp, >, |) document, /dev device ও /proc তথ্যে একইভাবে কাজ করে।'),
          l('That power cuts both ways: writing to the wrong device file (e.g. /dev/sda) can corrupt a disk, so check before you write.', 'সেই শক্তি দুদিকেই কাটে: ভুল device ফাইলে (যেমন /dev/sda) লিখলে একটি disk নষ্ট হতে পারে, তাই লেখার আগে যাচাই করুন।'),
        ] },
      ],
    },
  ],

  // ── lx-navigation · Navigating: pwd, cd, ls ───────────────────────────────
  'lx-navigation': [
    {
      h: l('What are pwd, cd, and ls?', 'pwd, cd ও ls কী?'),
      blocks: [
        { p: l('Three commands do the everyday work of moving around the filesystem, and you will type them more than any others. pwd (print working directory) tells you exactly where you are in the tree. ls (list) shows what is in the current directory — files and folders. cd (change directory) walks you from one directory to another. Together they answer the three questions you constantly ask at a command line: where am I, what is here, and how do I get somewhere else.', 'তিনটি কমান্ড filesystem-এ চলাফেরার দৈনন্দিন কাজ করে, আর এগুলো আপনি অন্য যেকোনোটির চেয়ে বেশি টাইপ করবেন। pwd (print working directory) জানায় আপনি গাছের ঠিক কোথায়। ls (list) দেখায় বর্তমান ডিরেক্টরিতে কী আছে — ফাইল ও ফোল্ডার। cd (change directory) আপনাকে এক ডিরেক্টরি থেকে অন্যটিতে হাঁটায়। একসঙ্গে এরা command line-এ আপনার বারবার করা তিনটি প্রশ্নের উত্তর দেয়: আমি কোথায়, এখানে কী, ও কীভাবে অন্য কোথাও যাব।') },
        { p: l('The problem they solve is orientation. A graphical file manager shows your location and contents visually; a shell shows only a prompt. Without these commands you would be moving blind. With them, you always know your position, can see your surroundings, and can navigate deliberately — which matters enormously right before you run any command that changes or deletes files.', 'এরা যে সমস্যা সমাধান করে তা হলো অবস্থান নির্ণয়। একটি graphical file manager আপনার অবস্থান ও বিষয়বস্তু দৃশ্যত দেখায়; একটি shell শুধু একটি prompt দেখায়। এই কমান্ড ছাড়া আপনি অন্ধভাবে চলতেন। এদের সঙ্গে আপনি সবসময় নিজের অবস্থান জানেন, চারপাশ দেখতে পারেন ও সচেতনভাবে চলতে পারেন — যা ফাইল বদলানো বা মোছা কোনো কমান্ড চালানোর ঠিক আগে ভীষণ গুরুত্বপূর্ণ।') },
        { note: l('Think of walking through a building. pwd answers "which room am I in?", ls answers "what is in this room?", and cd is walking to another room. You check the room and its contents before you move or touch anything.', 'একটি ভবনে হাঁটার কথা ভাবুন। pwd উত্তর দেয় "কোন ঘরে আছি?", ls উত্তর দেয় "এই ঘরে কী?", আর cd হলো অন্য ঘরে যাওয়া। কিছু সরানো বা স্পর্শ করার আগে আপনি ঘর ও তার বিষয়বস্তু যাচাই করেন।'), kind: 'tip' },
      ],
    },
    {
      h: l('How you move around', 'আপনি কীভাবে চলাফেরা করেন'),
      blocks: [
        { steps: [
          l('Run pwd to confirm your current location (it prints an absolute path like /home/ada).', 'pwd চালিয়ে বর্তমান অবস্থান নিশ্চিত করুন (এটি /home/ada-এর মতো একটি absolute path ছাপে)।'),
          l('Run ls (or ls -la) to see what the directory contains, including hidden files.', 'ls (বা ls -la) চালিয়ে দেখুন ডিরেক্টরিতে কী আছে, লুকানো ফাইলসহ।'),
          l('Use cd <dir> to step into a subdirectory, or cd .. to go up to the parent.', 'একটি subdirectory-তে ঢুকতে cd <dir>, বা parent-এ উঠতে cd .. ব্যবহার করুন।'),
          l('Run pwd again to confirm the move did what you expected.', 'আবার pwd চালিয়ে নিশ্চিত করুন সরানোটি আপনি যা চেয়েছিলেন তা-ই করেছে।'),
          l('Type cd on its own (or cd ~) at any time to jump straight back to your home directory.', 'যেকোনো সময় শুধু cd (বা cd ~) টাইপ করে সরাসরি নিজের home ডিরেক্টরিতে ফিরুন।'),
        ] },
        { code: `pwd
# /home/ada

ls
# Desktop  Documents  projects

cd projects
pwd
# /home/ada/projects

# .. means "the parent directory"; - means "the last directory I was in"
cd ..
cd -
# /home/ada/projects

# cd with no argument always returns home
cd
pwd
# /home/ada`, caption: l('pwd before and after a cd confirms you ended up where you intended.', 'cd-এর আগে ও পরে pwd নিশ্চিত করে আপনি যেখানে চেয়েছিলেন সেখানেই পৌঁছেছেন।') },
      ],
    },
    {
      h: l('Key commands', 'মূল কমান্ড'),
      blocks: [
        { table: {
          head: [l('Goal', 'লক্ষ্য'), l('Command', 'কমান্ড')],
          rows: [
            [l('Print working dir', 'বর্তমান ডিরেক্টরি'), l('pwd', 'pwd')],
            [l('List files (all, long)', 'ফাইল তালিকা (সব, লং)'), l('ls -la', 'ls -la')],
            [l('Change directory', 'ডিরেক্টরি বদল'), l('cd /path', 'cd /path')],
            [l('Go to home', 'হোমে যান'), l('cd ~', 'cd ~')],
          ],
        } },
      ],
    },
    {
      h: l('Reading ls and handy cd shortcuts', 'ls পড়া ও কাজের cd shortcut'),
      blocks: [
        { p: l('A few flags and shortcuts cover almost everything you will do. ls has options that change how much it shows, and cd has a handful of destinations worth memorising. Pair them with tab-completion and you move around effortlessly.', 'কয়েকটি flag ও shortcut আপনার প্রায় সব কাজ ঢাকে। ls-এর এমন option আছে যা কতটা দেখাবে তা বদলায়, আর cd-এর কয়েকটি গন্তব্য মনে রাখার মতো। tab-completion-এর সঙ্গে জুড়ে দিলে অনায়াসে চলাফেরা করবেন।') },
        { table: {
          head: [l('Command', 'কমান্ড'), l('What it does', 'কী করে')],
          rows: [
            [l('ls -l', 'ls -l'), l('Long format: permissions, owner, size, and date.', 'লং ফরম্যাট: permission, মালিক, আকার ও তারিখ।')],
            [l('ls -a', 'ls -a'), l('Show all files, including hidden ones starting with a dot.', 'সব ফাইল দেখায়, dot দিয়ে শুরু লুকানোগুলোসহ।')],
            [l('ls -la', 'ls -la'), l('Both together — the everyday "show me everything" command.', 'দুটো একসঙ্গে — দৈনন্দিন "সব দেখাও" কমান্ড।')],
            [l('ls -lh', 'ls -lh'), l('Long format with human-readable sizes (KB, MB).', 'মানুষ-পাঠযোগ্য আকারসহ লং ফরম্যাট (KB, MB)।')],
            [l('cd ~', 'cd ~'), l('Go to your home directory.', 'আপনার home ডিরেক্টরিতে যান।')],
            [l('cd ..', 'cd ..'), l('Go up one level to the parent directory.', 'এক স্তর ওপরে parent ডিরেক্টরিতে যান।')],
            [l('cd -', 'cd -'), l('Return to the directory you were in previously.', 'আগে যে ডিরেক্টরিতে ছিলেন সেখানে ফিরুন।')],
          ],
        } },
        { note: l('Press Tab after typing the first few letters of a folder name and the shell completes it for you — faster and free of typos, especially in deep paths.', 'একটি ফোল্ডার নামের প্রথম কয়েকটি অক্ষর টাইপ করে Tab চাপুন, shell তা আপনার জন্য শেষ করে — দ্রুত ও টাইপো-মুক্ত, বিশেষত গভীর path-এ।'), kind: 'tip' },
      ],
    },
    {
      h: l('When and where this matters', 'কখন ও কোথায় এটি গুরুত্বপূর্ণ'),
      blocks: [
        { p: l('You use these constantly, but they matter most as a safety habit right before anything destructive. Before you run rm, mv, or a wildcard like *, run pwd and ls to be certain you are in the directory you think you are and that the files you expect are there. Many painful accidents come from deleting or overwriting files in the wrong folder simply because the person lost track of where they were. On a huge directory, pair ls with a filter (ls | head, or ls *.log) so the output does not scroll off the screen. Orienting first costs two seconds and prevents disasters.', 'এগুলো আপনি অবিরাম ব্যবহার করেন, তবে সবচেয়ে বেশি কাজে লাগে যেকোনো ধ্বংসাত্মক কিছুর ঠিক আগে একটি নিরাপত্তা অভ্যাস হিসেবে। rm, mv বা *-এর মতো wildcard চালানোর আগে pwd ও ls চালিয়ে নিশ্চিত হোন আপনি যে ডিরেক্টরিতে ভাবছেন সেখানেই আছেন ও প্রত্যাশিত ফাইলগুলো সেখানে আছে। অনেক কষ্টকর দুর্ঘটনা ঘটে ভুল ফোল্ডারে ফাইল মোছা বা overwrite করা থেকে, শুধু কারণ ব্যক্তিটি কোথায় ছিল তার হিসাব হারিয়েছিল। বিশাল ডিরেক্টরিতে ls-কে একটি filter-এর সঙ্গে জুড়ুন (ls | head, বা ls *.log) যাতে output পর্দা ছাড়িয়ে না যায়। আগে অবস্থান নির্ণয় দুই সেকেন্ড খরচ করে ও বিপর্যয় ঠেকায়।') },
      ],
    },
    {
      h: l('Common mistakes', 'সাধারণ ভুল'),
      blocks: [
        { list: [
          l('Losing track of your current directory and running a destructive command in the wrong place. rm -rf * in the wrong folder deletes everything there with no recovery — run pwd first.', 'বর্তমান ডিরেক্টরির হিসাব হারিয়ে ভুল জায়গায় একটি ধ্বংসাত্মক কমান্ড চালানো। ভুল ফোল্ডারে rm -rf * সেখানকার সব পুনরুদ্ধার ছাড়াই মুছে দেয় — আগে pwd চালান।'),
          l('Forgetting hidden files exist. Plain ls hides dotfiles like .env and .git; use ls -a so you do not miss (or accidentally delete) them.', 'লুকানো ফাইল আছে ভুলে যাওয়া। সাধারণ ls, .env ও .git-এর মতো dotfile লুকায়; ls -a ব্যবহার করুন যাতে সেগুলো মিস না করেন (বা ভুলে না মোছেন)।'),
          l('Confusing cd .. (up one level) with cd . (stay put) — the single dot goes nowhere.', 'cd .. (এক স্তর ওপরে) ও cd . (একই জায়গায়) গুলিয়ে ফেলা — একক dot কোথাও যায় না।'),
          l('Running ls on an enormous directory and drowning in output; filter it with ls | head or a pattern instead.', 'একটি বিশাল ডিরেক্টরিতে ls চালিয়ে output-এ ডুবে যাওয়া; বরং ls | head বা একটি pattern দিয়ে filter করুন।'),
          l('Assuming a relative cd works the same from anywhere. cd projects only works if a projects folder exists in your current directory; when unsure, use an absolute path like cd /home/ada/projects.', 'ধরে নেওয়া একটি relative cd সব জায়গা থেকে একইভাবে কাজ করে। cd projects শুধু তখনই কাজ করে যদি বর্তমান ডিরেক্টরিতে একটি projects ফোল্ডার থাকে; সন্দেহ হলে cd /home/ada/projects-এর মতো একটি absolute path ব্যবহার করুন।'),
        ] },
      ],
    },
    {
      h: l('Remember in one line', 'এক লাইনে মনে রাখুন'),
      blocks: [
        { list: [
          l('pwd = where am I, ls = what is here, cd = go somewhere else — the three questions of navigation.', 'pwd = আমি কোথায়, ls = এখানে কী, cd = অন্য কোথাও যাও — নেভিগেশনের তিন প্রশ্ন।'),
          l('Use ls -la to reveal hidden files and details, and Tab-completion to move quickly and avoid typos.', 'লুকানো ফাইল ও বিস্তারিত দেখতে ls -la, আর দ্রুত চলতে ও টাইপো এড়াতে Tab-completion ব্যবহার করুন।'),
          l('Always pwd and ls to confirm your location before running anything destructive like rm.', 'rm-এর মতো ধ্বংসাত্মক কিছু চালানোর আগে সবসময় pwd ও ls দিয়ে অবস্থান নিশ্চিত করুন।'),
        ] },
      ],
    },
  ],
}
