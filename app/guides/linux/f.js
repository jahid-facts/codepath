// Deep, bilingual (English / Bangla) teaching guides for the Linux course —
// Shell config, remote access, storage, scripting, and troubleshooting. Shape mirrors
// app/course-guides.js and app/guides/git/a.js: each guide is an array of sections
// { h, blocks }, rendered by GuideBlock in app/LearningApp.js. Block types:
// { p }, { list }, { steps }, { table:{head,rows} }, { note, kind }, { code, caption }.
// Facts (definitions, analogies, commands, trade-offs, mistakes) come from app/courses/linux.js.

const l = (en, bn) => ({ en, bn })

export default {
  // ── lx-shell-config · Shell config & aliases ──────────────────────────────
  'lx-shell-config': [
    {
      h: l('What is shell configuration?', 'শেল কনফিগারেশন কী?'),
      blocks: [
        { p: l('Every time you open a terminal, the shell — on most Linux systems this is bash — reads one or more startup files before it shows you a prompt. These startup files, chiefly ~/.bashrc in your home directory, are plain text files full of ordinary shell commands. Whatever you put in them runs automatically at the start of the session: your prompt style, your shortcuts (aliases), your environment variables, and additions to your PATH. Configuration is simply the act of editing these files so that your shell opens the way you want it, every single time.', 'আপনি যখনই একটি টার্মিনাল খোলেন, শেল—বেশিরভাগ Linux সিস্টেমে এটি bash—প্রম্পট দেখানোর আগে এক বা একাধিক স্টার্টআপ ফাইল পড়ে। এই স্টার্টআপ ফাইল, প্রধানত আপনার home ডিরেক্টরির ~/.bashrc, সাধারণ শেল কমান্ডে ভরা সাদামাটা টেক্সট ফাইল। এতে যা রাখেন তা সেশনের শুরুতে স্বয়ংক্রিয়ভাবে চলে: আপনার prompt-এর ধরন, শর্টকাট (alias), environment variable ও PATH-এ যোগ। কনফিগারেশন মানে শুধু এই ফাইলগুলো এডিট করা যাতে আপনার শেল প্রতিবার আপনার পছন্দমতো খোলে।') },
        { p: l('The problem this solves is repetition. Without config files, any customization you make — a handy shortcut, an environment variable a tool needs, a directory added to PATH — would vanish the moment you closed the terminal, and you would have to type it all again in the next session. By writing those settings into ~/.bashrc once, you make them permanent and portable: copy that one file to a new machine and your familiar setup comes with it. This is why experienced users treat their dotfiles as a prized possession worth backing up.', 'এটি যে সমস্যা সমাধান করে তা হলো পুনরাবৃত্তি। কনফিগ ফাইল ছাড়া আপনার করা যেকোনো কাস্টমাইজেশন—একটি কাজের শর্টকাট, একটি টুলের দরকারি environment variable, PATH-এ যোগ করা একটি ডিরেক্টরি—টার্মিনাল বন্ধ করার সঙ্গে সঙ্গে হারিয়ে যেত, আর পরের সেশনে সব আবার টাইপ করতে হতো। এই সেটিংগুলো একবার ~/.bashrc-এ লিখে রাখলে সেগুলো স্থায়ী ও পোর্টেবল হয়: সেই একটি ফাইল নতুন মেশিনে কপি করলে আপনার চেনা সেটআপও সঙ্গে আসে। এ কারণেই অভিজ্ঞ ব্যবহারকারীরা তাঁদের dotfiles ব্যাকআপ করার মতো মূল্যবান সম্পদ ভাবেন।') },
        { note: l('Think of ~/.bashrc as a startup checklist your shell reads every time it opens. Just as a barista sets out the cups, grinds the beans, and warms the machine before the first order, your shell runs this checklist to arrange your workspace exactly how you like it before you type a single command.', '~/.bashrc-কে ভাবুন একটি স্টার্টআপ চেকলিস্ট হিসেবে যা আপনার শেল প্রতিবার খোলার সময় পড়ে। একজন barista যেমন প্রথম অর্ডারের আগে কাপ সাজায়, বিন গুঁড়ো করে ও মেশিন গরম করে, তেমনি আপনার শেল একটি কমান্ড টাইপ করার আগেই এই চেকলিস্ট চালিয়ে আপনার কর্মস্থল ঠিক আপনার পছন্দমতো সাজায়।'), kind: 'tip' },
      ],
    },
    {
      h: l('Which file runs when', 'কোন ফাইল কখন চলে'),
      blocks: [
        { p: l('Bash reads different files depending on how the shell was started, and this trips up nearly every beginner at some point. The two situations that matter are an interactive non-login shell (a normal terminal window you open on the desktop) and a login shell (an SSH session, or logging in at a text console). Knowing which file is read in each case tells you where to put a setting so it actually takes effect.', 'শেল কীভাবে শুরু হয়েছে তার ওপর নির্ভর করে bash ভিন্ন ভিন্ন ফাইল পড়ে, আর এটি প্রায় প্রতিটি নতুন ব্যবহারকারীকে কোনো না কোনো সময় বিভ্রান্ত করে। যে দুটি পরিস্থিতি গুরুত্বপূর্ণ তা হলো interactive non-login shell (ডেস্কটপে খোলা একটি সাধারণ টার্মিনাল উইন্ডো) ও login shell (একটি SSH সেশন, বা টেক্সট কনসোলে লগইন)। কোন ক্ষেত্রে কোন ফাইল পড়া হয় জানলে বুঝবেন একটি সেটিং কোথায় রাখলে তা আসলে কার্যকর হয়।') },
        { table: {
          head: [l('File', 'ফাইল'), l('When it runs', 'কখন চলে')],
          rows: [
            [l('~/.bashrc', '~/.bashrc'), l('Every interactive non-login shell — most terminal windows. Put aliases and prompt tweaks here.', 'প্রতিটি interactive non-login shell—বেশিরভাগ টার্মিনাল উইন্ডো। alias ও prompt পরিবর্তন এখানে রাখুন।')],
            [l('~/.bash_profile or ~/.profile', '~/.bash_profile বা ~/.profile'), l('Login shells — SSH sessions and console login. Often just sources ~/.bashrc.', 'login shell—SSH সেশন ও কনসোল লগইন। প্রায়ই শুধু ~/.bashrc সোর্স করে।')],
            [l('/etc/profile, /etc/bash.bashrc', '/etc/profile, /etc/bash.bashrc'), l('System-wide, applied to every user on the machine.', 'সিস্টেম-ওয়াইড, মেশিনের প্রতিটি user-এ প্রযোজ্য।')],
            [l('~/.bash_logout', '~/.bash_logout'), l('Runs once when a login shell exits — handy for cleanup.', 'একটি login shell বন্ধ হলে একবার চলে—পরিষ্কারের জন্য সুবিধাজনক।')],
          ],
        } },
        { note: l('If a setting works in your desktop terminal but is missing over SSH, it is probably in ~/.bashrc while the login shell reads ~/.bash_profile. The common fix is to make ~/.bash_profile source ~/.bashrc so both paths load the same settings.', 'একটি সেটিং ডেস্কটপ টার্মিনালে কাজ করে কিন্তু SSH-এ নেই হলে, সম্ভবত তা ~/.bashrc-এ আছে অথচ login shell ~/.bash_profile পড়ে। সাধারণ সমাধান হলো ~/.bash_profile-কে ~/.bashrc সোর্স করানো যাতে দুই পথই একই সেটিং লোড করে।'), kind: 'tip' },
      ],
    },
    {
      h: l('How to configure your shell', 'কীভাবে শেল কনফিগার করবেন'),
      blocks: [
        { steps: [
          l('Open ~/.bashrc in a text editor such as nano or vim. It already has content — add your lines at the bottom so you do not disturb what is there.', 'nano বা vim-এর মতো একটি এডিটরে ~/.bashrc খুলুন। এতে আগে থেকেই কিছু আছে—নিচে আপনার লাইন যোগ করুন যাতে যা আছে তা নষ্ট না হয়।'),
          l('Add an alias to shorten a command you type often, for example ll for a long, human-readable listing.', 'বারবার টাইপ করা একটি কমান্ড ছোট করতে একটি alias যোগ করুন, যেমন লম্বা, পাঠযোগ্য তালিকার জন্য ll।'),
          l('Add an export line for any environment variable you want set in every session, and to extend your PATH.', 'প্রতিটি সেশনে সেট করতে চাওয়া যেকোনো environment variable-এর জন্য এবং PATH বাড়াতে একটি export লাইন যোগ করুন।'),
          l('Save the file. Nothing has changed yet — the running shell has not re-read the file.', 'ফাইল সেভ করুন। এখনো কিছু বদলায়নি—চলমান শেল ফাইলটি আবার পড়েনি।'),
          l('Run source ~/.bashrc to apply the changes to the current shell immediately, without opening a new terminal.', 'নতুন টার্মিনাল না খুলে বর্তমান শেলে পরিবর্তন সঙ্গে সঙ্গে প্রয়োগ করতে source ~/.bashrc চালান।'),
        ] },
        { code: `# Open your bashrc and add a few lines at the bottom
nano ~/.bashrc

# --- lines to add inside ~/.bashrc ---
alias ll="ls -alh"            # a shorter command for a long, readable listing
alias gs="git status"         # save keystrokes on commands you run all day
export EDITOR=nano            # tools that open an editor will now use nano
export PATH="$HOME/bin:$PATH" # add your own bin/ folder to the search path

# Back in the terminal: apply the changes without reopening it
source ~/.bashrc
ll                            # your new alias works right away`, caption: l('source re-runs the file in your current shell, so new aliases and variables take effect at once. Opening a fresh terminal would do the same, because it reads ~/.bashrc on startup.', 'source ফাইলটি আপনার বর্তমান শেলে আবার চালায়, তাই নতুন alias ও variable সঙ্গে সঙ্গে কার্যকর হয়। নতুন টার্মিনাল খুললেও তাই হতো, কারণ এটি শুরুতে ~/.bashrc পড়ে।') },
      ],
    },
    {
      h: l('Key commands', 'মূল কমান্ড'),
      blocks: [
        { table: {
          head: [l('Goal', 'লক্ষ্য'), l('Command', 'কমান্ড')],
          rows: [
            [l('Edit your config', 'কনফিগ এডিট করুন'), l('nano ~/.bashrc', 'nano ~/.bashrc')],
            [l('Apply changes now', 'এখনই পরিবর্তন প্রয়োগ'), l('source ~/.bashrc', 'source ~/.bashrc')],
            [l('Make an alias', 'একটি alias বানান'), l('alias ll="ls -alh"', 'alias ll="ls -alh"')],
            [l('Set a persistent variable', 'স্থায়ী variable সেট'), l('export EDITOR=nano', 'export EDITOR=nano')],
            [l('List your current aliases', 'বর্তমান alias দেখুন'), l('alias', 'alias')],
          ],
        } },
      ],
    },
    {
      h: l('When and where to use it', 'কখন ও কোথায় ব্যবহার করবেন'),
      blocks: [
        { p: l('Reach for shell configuration the moment you notice yourself repeating something. Typed the same long ls flags for the tenth time today? Make it an alias. A build tool keeps asking you to set an environment variable? Export it in ~/.bashrc once. Installed a program into a custom folder that the shell cannot find? Add that folder to PATH. The rule of thumb is simple: if a setting should survive closing the terminal, it belongs in a config file; if you only need it for the next command, set it inline instead.', 'নিজেকে কিছু পুনরাবৃত্তি করতে দেখলেই শেল কনফিগারেশনে হাত দিন। আজ দশমবার একই লম্বা ls ফ্ল্যাগ টাইপ করলেন? একটি alias বানান। একটি build টুল বারবার একটি environment variable সেট করতে বলছে? একবার ~/.bashrc-এ export করুন। একটি কাস্টম ফোল্ডারে প্রোগ্রাম ইনস্টল করেছেন যা শেল খুঁজে পায় না? সেই ফোল্ডার PATH-এ যোগ করুন। সহজ নিয়ম: একটি সেটিং যদি টার্মিনাল বন্ধ করার পরও টিকতে হয়, তা কনফিগ ফাইলে যায়; শুধু পরের কমান্ডের জন্য দরকার হলে বরং inline সেট করুন।') },
        { p: l('Where to put things also matters. Personal preferences — your aliases, prompt, and editor — go in your own ~/.bashrc so they follow only you. Settings that every user on a shared server needs go in the system-wide files under /etc, which usually require root to edit. And on a machine you do not fully trust, remember that anything in these files runs automatically, so never paste config lines from a stranger without reading them first.', 'কোথায় রাখবেন তাও গুরুত্বপূর্ণ। ব্যক্তিগত পছন্দ—আপনার alias, prompt ও editor—আপনার নিজের ~/.bashrc-এ যায় যাতে শুধু আপনাকেই অনুসরণ করে। একটি শেয়ার্ড সার্ভারে প্রতিটি user-এর দরকারি সেটিং /etc-এর সিস্টেম-ওয়াইড ফাইলে যায়, যা এডিট করতে সাধারণত root লাগে। আর যে মেশিনে পুরোপুরি বিশ্বাস নেই সেখানে মনে রাখুন এই ফাইলের যেকোনো কিছু স্বয়ংক্রিয়ভাবে চলে, তাই অচেনা কারো কনফিগ লাইন না পড়ে কখনো পেস্ট করবেন না।') },
      ],
    },
    {
      h: l('Common mistakes', 'সাধারণ ভুল'),
      blocks: [
        { list: [
          l('Editing ~/.bashrc, saving, and expecting the change to appear on its own — you must run source ~/.bashrc or open a new terminal for it to take effect.', '~/.bashrc এডিট ও সেভ করে আশা করা পরিবর্তন নিজে থেকেই আসবে—কার্যকর হতে source ~/.bashrc চালাতে বা নতুন টার্মিনাল খুলতে হবে।'),
          l('Breaking the file with a bad line, so every new terminal opens with an error. Keep the old file backed up and read errors carefully — they usually name the offending line.', 'একটি খারাপ লাইনে ফাইল ভাঙা, ফলে প্রতিটি নতুন টার্মিনাল এররসহ খোলে। পুরনো ফাইল ব্যাকআপ রাখুন ও এরর মন দিয়ে পড়ুন—সাধারণত দোষী লাইনের নাম বলে।'),
          l('Putting an alias in ~/.bashrc but expecting it to work over SSH, where the login shell reads ~/.profile instead.', '~/.bashrc-এ একটি alias রেখে আশা করা তা SSH-এ কাজ করবে, যেখানে login shell বদলে ~/.profile পড়ে।'),
          l('Adding a folder to PATH with a typo, or overwriting PATH instead of extending it — write export PATH="new:$PATH", never export PATH="new".', 'একটি টাইপোসহ PATH-এ ফোল্ডার যোগ করা, বা PATH বাড়ানোর বদলে চাপা দেওয়া—লিখুন export PATH="new:$PATH", কখনো export PATH="new" নয়।'),
        ] },
      ],
    },
    {
      h: l('Remember in one line', 'এক লাইনে মনে রাখুন'),
      blocks: [
        { list: [
          l('~/.bashrc runs at every terminal startup and sets your aliases, environment, and PATH.', '~/.bashrc প্রতি টার্মিনাল শুরুতে চলে ও আপনার alias, environment ও PATH সেট করে।'),
          l('After editing it, run source ~/.bashrc to apply changes without reopening the shell.', 'এডিটের পর শেল না খুলে পরিবর্তন প্রয়োগ করতে source ~/.bashrc চালান।'),
          l('Config makes your setup permanent and portable — but one broken line can stop new shells from opening cleanly.', 'কনফিগ আপনার সেটআপ স্থায়ী ও পোর্টেবল করে—তবে একটি ভাঙা লাইন নতুন শেল পরিষ্কারভাবে খোলা থামাতে পারে।'),
        ] },
      ],
    },
  ],

  // ── lx-ssh · SSH & remote access ──────────────────────────────────────────
  'lx-ssh': [
    {
      h: l('What is SSH?', 'SSH কী?'),
      blocks: [
        { p: l('SSH (Secure Shell) gives you an encrypted command-line session on another computer, as if you had sat down at its keyboard. You run ssh from your local machine, name the remote host, and after authenticating you land in that machine’s shell — every command you type runs there, and its output comes back to you. Because SSH is the standard way to administer servers, and almost every server in the world sits in a data centre you will never physically touch, SSH is the single most important tool for remote work on Linux.', 'SSH (Secure Shell) আপনাকে অন্য একটি কম্পিউটারে একটি এনক্রিপ্টেড কমান্ড-লাইন সেশন দেয়, যেন আপনি তার কীবোর্ডের সামনে বসেছেন। আপনি নিজের লোকাল মেশিন থেকে ssh চালান, রিমোট হোস্টের নাম দেন, আর যাচাইয়ের পর সেই মেশিনের শেলে পৌঁছান—আপনার টাইপ করা প্রতিটি কমান্ড সেখানে চলে, আর তার আউটপুট আপনার কাছে ফিরে আসে। SSH যেহেতু সার্ভার পরিচালনার প্রমিত উপায়, আর পৃথিবীর প্রায় প্রতিটি সার্ভার এমন একটি ডেটা সেন্টারে থাকে যা আপনি কখনো ছোঁবেন না, তাই Linux-এ রিমোট কাজের জন্য SSH একক সবচেয়ে গুরুত্বপূর্ণ টুল।') },
        { p: l('The problem SSH solves is doing this securely. Older tools like telnet sent everything — including your password — as plain text across the network, so anyone in between could read it. SSH encrypts the entire session end to end, so even on a hostile network the traffic is unreadable to eavesdroppers. It also verifies you are talking to the real server (via its host key) and proves who you are, either with a password or, far better, with a cryptographic key pair.', 'SSH যে সমস্যা সমাধান করে তা হলো এটি নিরাপদে করা। telnet-এর মতো পুরনো টুল সবকিছু—আপনার পাসওয়ার্ডসহ—নেটওয়ার্কজুড়ে প্লেইন টেক্সট হিসেবে পাঠাত, তাই মাঝের যে কেউ পড়তে পারত। SSH পুরো সেশন প্রান্ত-থেকে-প্রান্ত এনক্রিপ্ট করে, তাই একটি বৈরী নেটওয়ার্কেও ট্রাফিক আড়িপাতাকারীর কাছে অপাঠ্য। এটি যাচাইও করে যে আপনি আসল সার্ভারের সঙ্গে কথা বলছেন (তার host key দিয়ে) এবং প্রমাণ করে আপনি কে, হয় পাসওয়ার্ড দিয়ে অথবা অনেক ভালোভাবে একটি cryptographic key pair দিয়ে।') },
        { note: l('SSH is like a secure phone line into a distant computer. The words you speak (your commands) and the replies you hear (the output) are scrambled the whole way, so even if someone taps the line, all they get is noise.', 'SSH একটি দূরের কম্পিউটারে একটি নিরাপদ ফোন লাইনের মতো। আপনার বলা কথা (কমান্ড) ও শোনা উত্তর (আউটপুট) পুরো পথ জুড়ে এলোমেলো করা থাকে, তাই কেউ লাইনে আড়ি পাতলেও সে শুধু শব্দ-গোলমাল পায়।'), kind: 'tip' },
      ],
    },
    {
      h: l('How a connection works', 'একটি সংযোগ কীভাবে কাজ করে'),
      blocks: [
        { steps: [
          l('You run ssh user@host. The client contacts the server on port 22 and they negotiate encryption keys for the session.', 'আপনি ssh user@host চালান। ক্লায়েন্ট port 22-তে সার্ভারের সঙ্গে যোগাযোগ করে ও সেশনের জন্য এনক্রিপশন কী ঠিক করে।'),
          l('The first time, SSH shows the server’s host key fingerprint and asks you to confirm it — this proves you are reaching the real machine, not an impostor.', 'প্রথমবার SSH সার্ভারের host key fingerprint দেখায় ও নিশ্চিত করতে বলে—এটি প্রমাণ করে আপনি আসল মেশিনে পৌঁছাচ্ছেন, কোনো ভানকারীতে নয়।'),
          l('You authenticate: either by typing your password, or automatically with a key pair if you have set one up.', 'আপনি যাচাই করেন: হয় পাসওয়ার্ড টাইপ করে, অথবা key pair সেট করা থাকলে স্বয়ংক্রিয়ভাবে।'),
          l('You are now in the remote shell. Commands run on the server; the prompt usually shows its hostname so you know where you are.', 'আপনি এখন রিমোট শেলে। কমান্ড সার্ভারে চলে; prompt সাধারণত তার hostname দেখায় যাতে বোঝেন কোথায় আছেন।'),
          l('You type exit (or press Ctrl-D) to close the session and return to your own machine.', 'সেশন বন্ধ করে নিজের মেশিনে ফিরতে exit টাইপ করেন (বা Ctrl-D চাপেন)।'),
        ] },
        { code: `# Log in to a remote server — you land in its shell
ssh alice@203.0.113.10
# alice@webserver:~$   <- you are now on the remote machine
exit                              # return to your local shell

# Run a single command remotely without staying logged in
ssh alice@203.0.113.10 "uptime"
#  14:22:05 up 30 days,  3:11,  1 user,  load average: 0.04, 0.09, 0.10

# Connect on a non-standard port with -p
ssh -p 2222 alice@203.0.113.10`, caption: l('The user@host form names who you log in as and which machine. Adding a command in quotes runs it and exits immediately — perfect for scripts and quick checks.', 'user@host রূপ বলে আপনি কে হিসেবে লগইন করছেন ও কোন মেশিনে। কোটে একটি কমান্ড যোগ করলে তা চালিয়ে সঙ্গে সঙ্গে বেরিয়ে আসে—স্ক্রিপ্ট ও দ্রুত যাচাইয়ের জন্য আদর্শ।') },
      ],
    },
    {
      h: l('Key-based authentication', 'কী-ভিত্তিক যাচাই'),
      blocks: [
        { p: l('Passwords are weak: they can be guessed, brute-forced, or reused across sites. Key-based auth replaces them with a pair of files. The private key stays secret on your laptop; the matching public key is copied to the server. When you connect, the two prove to each other they belong together without ever sending the secret across the wire. The result is both more secure and more convenient — you log in with no password prompt at all.', 'পাসওয়ার্ড দুর্বল: এগুলো অনুমান, brute-force বা একাধিক সাইটে পুনঃব্যবহার করা যায়। কী-ভিত্তিক auth এদের বদলে একজোড়া ফাইল ব্যবহার করে। private key আপনার ল্যাপটপে গোপন থাকে; মিলে যাওয়া public key সার্ভারে কপি করা হয়। সংযোগের সময় দুটি একে অপরকে প্রমাণ করে যে তারা একসঙ্গে, গোপন জিনিসটি কখনো তারে না পাঠিয়ে। ফল—আরও নিরাপদ ও আরও সুবিধাজনক, আপনি কোনো পাসওয়ার্ড প্রম্পট ছাড়াই লগইন করেন।') },
        { code: `# 1. Generate a modern key pair (private + public)
ssh-keygen -t ed25519 -C "alice@laptop"
# creates ~/.ssh/id_ed25519      (private — never share this)
#     and ~/.ssh/id_ed25519.pub  (public  — safe to copy anywhere)

# 2. Copy the PUBLIC key onto the server's authorized_keys list
ssh-copy-id alice@203.0.113.10

# 3. From now on you log in with no password prompt
ssh alice@203.0.113.10`, caption: l('Guard the private key like a house key: anyone who copies it can log in as you. The .pub file is the lock you hand out freely.', 'private key-কে বাড়ির চাবির মতো পাহারা দিন: যে এটি কপি করে সে আপনার হিসেবে লগইন করতে পারে। .pub ফাইলটি সেই তালা যা আপনি অবাধে বিলি করেন।') },
        { note: l('On a public server, disable password login and root SSH once key auth works. That single hardening step shuts down the endless brute-force attempts every internet-facing server receives.', 'একটি পাবলিক সার্ভারে key auth কাজ করলে password login ও root SSH বন্ধ করুন। সেই একটি hardening ধাপ প্রতিটি ইন্টারনেট-মুখী সার্ভারের পাওয়া অন্তহীন brute-force চেষ্টা থামিয়ে দেয়।'), kind: 'warn' },
      ],
    },
    {
      h: l('Key commands', 'মূল কমান্ড'),
      blocks: [
        { table: {
          head: [l('Goal', 'লক্ষ্য'), l('Command', 'কমান্ড')],
          rows: [
            [l('Connect to a host', 'হোস্টে সংযোগ'), l('ssh user@host', 'ssh user@host')],
            [l('Run one remote command', 'একটি রিমোট কমান্ড চালান'), l('ssh host "uptime"', 'ssh host "uptime"')],
            [l('Copy a file over', 'ফাইল কপি করুন'), l('scp file user@host:', 'scp file user@host:')],
            [l('Generate a key pair', 'কী পেয়ার তৈরি করুন'), l('ssh-keygen -t ed25519', 'ssh-keygen -t ed25519')],
            [l('Install your key on a server', 'সার্ভারে কী বসান'), l('ssh-copy-id user@host', 'ssh-copy-id user@host')],
          ],
        } },
      ],
    },
    {
      h: l('When and where to use it', 'কখন ও কোথায় ব্যবহার করবেন'),
      blocks: [
        { p: l('Use SSH whenever the machine you need is not the one in front of you: administering a cloud server, deploying a website, checking logs on a production box, or working on a powerful build machine from a light laptop. It is also the transport under many everyday tools — git push over SSH, file sync with rsync, and scp for copying files all ride on the same secure channel. If you work with servers at all, SSH is a daily companion, not an occasional one.', 'যখনই দরকারি মেশিনটি আপনার সামনেরটি নয় তখন SSH ব্যবহার করুন: একটি cloud সার্ভার পরিচালনা, একটি ওয়েবসাইট deploy, একটি production মেশিনে লগ যাচাই, বা একটি হালকা ল্যাপটপ থেকে শক্তিশালী build মেশিনে কাজ। এটি অনেক দৈনন্দিন টুলের নিচের পরিবহনও—SSH-এর ওপর git push, rsync দিয়ে ফাইল সিঙ্ক, ও ফাইল কপি করতে scp সবই একই নিরাপদ চ্যানেলে চলে। আপনি সার্ভার নিয়ে কাজ করলে SSH প্রতিদিনের সঙ্গী, মাঝেমধ্যের নয়।') },
        { p: l('Set key-based auth up on any host you use more than once, and keep a tidy ~/.ssh/config file with short nicknames for your servers so you can type ssh web instead of a long user-and-address string. For a machine on the public internet, treat security as part of setup: keys only, no root login, and ideally a non-standard port to cut down on automated scans. On a private network you may relax some of this, but the habits above cost little and save you from the most common intrusions.', 'যে হোস্ট একবারের বেশি ব্যবহার করেন সেখানে key-ভিত্তিক auth সেট করুন, আর একটি পরিপাটি ~/.ssh/config ফাইলে সার্ভারগুলোর ছোট ডাকনাম রাখুন যাতে লম্বা user-ও-ঠিকানার বদলে ssh web টাইপ করতে পারেন। পাবলিক ইন্টারনেটের একটি মেশিনে নিরাপত্তাকে সেটআপের অংশ ভাবুন: শুধু key, root login নয়, ও আদর্শভাবে স্বয়ংক্রিয় স্ক্যান কমাতে একটি non-standard port। প্রাইভেট নেটওয়ার্কে কিছুটা শিথিল হতে পারেন, তবে ওপরের অভ্যাসগুলোর খরচ কম আর এরা সবচেয়ে সাধারণ অনুপ্রবেশ থেকে বাঁচায়।') },
      ],
    },
    {
      h: l('Common mistakes', 'সাধারণ ভুল'),
      blocks: [
        { list: [
          l('Leaving password login and root SSH enabled on a public server, which invites the constant brute-force attacks every internet host receives.', 'একটি পাবলিক সার্ভারে password login ও root SSH চালু রাখা, যা প্রতিটি ইন্টারনেট হোস্টের পাওয়া অবিরাম brute-force আক্রমণ ডেকে আনে।'),
          l('Committing or emailing a private key, or copying it to a server. Only the .pub (public) file should ever leave your machine.', 'একটি private key commit বা ইমেইল করা, বা সার্ভারে কপি করা। শুধু .pub (public) ফাইলটিই আপনার মেশিন ছাড়তে পারে।'),
          l('Blindly typing yes to the host-key fingerprint prompt without checking it — that prompt is your one chance to catch a man-in-the-middle.', 'host-key fingerprint প্রম্পটে না দেখে অন্ধভাবে yes টাইপ করা—সেই প্রম্পটই man-in-the-middle ধরার আপনার একটি সুযোগ।'),
          l('Wrong permissions on ~/.ssh: keys must be readable only by you (chmod 600), or SSH refuses to use them for safety.', '~/.ssh-এ ভুল permission: key শুধু আপনার পড়ার যোগ্য হতে হবে (chmod 600), নইলে SSH নিরাপত্তার জন্য সেগুলো ব্যবহার করতে অস্বীকার করে।'),
        ] },
      ],
    },
    {
      h: l('Remember in one line', 'এক লাইনে মনে রাখুন'),
      blocks: [
        { list: [
          l('ssh user@host opens an encrypted shell on a remote machine; add a quoted command to run it and exit.', 'ssh user@host একটি রিমোট মেশিনে এনক্রিপ্টেড শেল খোলে; চালিয়ে বেরোতে একটি কোটেড কমান্ড যোগ করুন।'),
          l('Prefer key pairs over passwords: keep the private key secret, copy the public key to the server with ssh-copy-id.', 'পাসওয়ার্ডের চেয়ে key pair নিন: private key গোপন রাখুন, ssh-copy-id দিয়ে public key সার্ভারে কপি করুন।'),
          l('On public servers, disable password and root login — a leaked private key hands over full access.', 'পাবলিক সার্ভারে password ও root login বন্ধ করুন—ফাঁস হওয়া private key পূর্ণ অ্যাক্সেস তুলে দেয়।'),
        ] },
      ],
    },
  ],

  // ── lx-disks · Disks & mounting ───────────────────────────────────────────
  'lx-disks': [
    {
      h: l('What are disks and mounting?', 'ডিস্ক ও মাউন্টিং কী?'),
      blocks: [
        { p: l('On Linux, every piece of physical storage — an internal SSD, a USB stick, a second hard drive — appears as a block device, a special file under /dev with a name like /dev/sda or /dev/nvme0n1. A disk is usually split into partitions (/dev/sda1, /dev/sda2), and each partition holds a filesystem: the structure that organizes bytes into files and folders. But a raw filesystem is not yet usable; you have to mount it, which means attaching it to a directory in the single unified file tree. After mounting /dev/sdb1 onto /mnt/data, the files on that disk appear inside /mnt/data.', 'Linux-এ প্রতিটি ভৌত স্টোরেজ—একটি অভ্যন্তরীণ SSD, একটি USB স্টিক, একটি দ্বিতীয় হার্ড ড্রাইভ—একটি block device হিসেবে আসে, /dev-এর নিচে /dev/sda বা /dev/nvme0n1-এর মতো নামের একটি বিশেষ ফাইল। একটি ডিস্ক সাধারণত partition-এ ভাগ হয় (/dev/sda1, /dev/sda2), আর প্রতিটি partition একটি filesystem ধরে: যে কাঠামো বাইটকে ফাইল ও ফোল্ডারে সাজায়। কিন্তু একটি raw filesystem এখনো ব্যবহারযোগ্য নয়; আপনাকে এটি mount করতে হয়, মানে একক একীভূত ফাইল-গাছের একটি ডিরেক্টরিতে যুক্ত করতে হয়। /dev/sdb1-কে /mnt/data-তে mount করার পর সেই ডিস্কের ফাইলগুলো /mnt/data-এর ভেতরে দেখা যায়।') },
        { p: l('The problem mounting solves is that Linux has no drive letters like C: or D:. Instead of separate lettered drives, everything lives in one tree rooted at /, and mounting is how you graft additional storage onto that tree wherever you choose. This is powerful: you can mount a fast disk at /var/lib/database, a big cheap disk at /home, and a network share at /mnt/backup, all invisible to applications that just read and write paths as usual.', 'মাউন্টিং যে সমস্যা সমাধান করে তা হলো Linux-এ C: বা D:-এর মতো ড্রাইভ লেটার নেই। আলাদা অক্ষর-দেওয়া ড্রাইভের বদলে সবকিছু /-এ শিকড়যুক্ত একটি গাছে থাকে, আর মাউন্টিং হলো আপনার বেছে নেওয়া যেকোনো জায়গায় সেই গাছে বাড়তি স্টোরেজ জোড়া লাগানোর উপায়। এটি শক্তিশালী: আপনি /var/lib/database-এ একটি দ্রুত ডিস্ক, /home-এ একটি বড় সস্তা ডিস্ক, ও /mnt/backup-এ একটি নেটওয়ার্ক শেয়ার মাউন্ট করতে পারেন, সবই সেই অ্যাপ্লিকেশনের কাছে অদৃশ্য যারা শুধু যথারীতি path পড়ে ও লেখে।') },
        { note: l('Mounting is like plugging a drive into a spot on the file tree. The mount point — say /mnt/data — is the doorway: walk through that directory and you are actually on the mounted disk. Unmount it and the doorway leads back to an empty folder.', 'মাউন্টিং ফাইল-গাছের একটি জায়গায় একটি ড্রাইভ যুক্ত করার মতো। mount point—ধরুন /mnt/data—হলো দরজা: সেই ডিরেক্টরিতে ঢুকলে আপনি আসলে মাউন্ট করা ডিস্কে। এটি unmount করলে দরজা আবার একটি খালি ফোল্ডারে নিয়ে যায়।'), kind: 'tip' },
      ],
    },
    {
      h: l('How mounting works', 'মাউন্টিং কীভাবে কাজ করে'),
      blocks: [
        { steps: [
          l('Run lsblk to list every block device and see which partitions already have a mount point and which are free.', 'প্রতিটি block device তালিকা করতে ও কোন partition-এর আগে থেকে mount point আছে ও কোনটি ফাঁকা দেখতে lsblk চালান।'),
          l('Pick or create an empty directory to serve as the mount point, for example /mnt/data.', 'mount point হিসেবে কাজ করতে একটি খালি ডিরেক্টরি বাছুন বা বানান, যেমন /mnt/data।'),
          l('Run sudo mount to attach the partition to that directory. Its files now appear under the mount point.', 'partition-কে সেই ডিরেক্টরিতে যুক্ত করতে sudo mount চালান। এর ফাইল এখন mount point-এর নিচে দেখা যায়।'),
          l('Use df -h to confirm it mounted and to check how much space it has.', 'এটি mount হয়েছে নিশ্চিত করতে ও কত জায়গা আছে দেখতে df -h ব্যবহার করুন।'),
          l('When finished, run sudo umount — but only once nothing is reading or writing the disk, or you risk corruption.', 'শেষ হলে sudo umount চালান—তবে কেবল কিছু ডিস্কটি পড়া বা লেখা বন্ধ হলে, নইলে corruption-এর ঝুঁকি।'),
        ] },
        { code: `# 1. See what block devices and partitions exist
lsblk
# NAME   SIZE TYPE MOUNTPOINTS
# sda    238G disk
# └─sda1 238G part /
# sdb     32G disk
# └─sdb1  32G part            <- unmounted, we will mount this

# 2. Create a mount point and attach the partition to it
sudo mkdir -p /mnt/data
sudo mount /dev/sdb1 /mnt/data

# 3. Confirm it mounted and check free space
df -h /mnt/data
# Filesystem  Size  Used Avail Use% Mounted on
# /dev/sdb1    32G   12G   19G  39% /mnt/data

# 4. Safely detach it (make sure nothing is using it first)
sudo umount /mnt/data`, caption: l('lsblk shows the layout, mount attaches a disk to a directory, df -h confirms the result. umount reverses it — cd out of the directory first so the disk is not busy.', 'lsblk বিন্যাস দেখায়, mount একটি ডিস্ককে ডিরেক্টরিতে যুক্ত করে, df -h ফল নিশ্চিত করে। umount উল্টো করে—আগে ডিরেক্টরি থেকে cd করে বেরোন যাতে ডিস্ক ব্যস্ত না থাকে।') },
      ],
    },
    {
      h: l('Key commands', 'মূল কমান্ড'),
      blocks: [
        { table: {
          head: [l('Goal', 'লক্ষ্য'), l('Command', 'কমান্ড')],
          rows: [
            [l('List block devices', 'block device তালিকা'), l('lsblk', 'lsblk')],
            [l('Mount a partition', 'একটি partition মাউন্ট'), l('sudo mount /dev/sdb1 /mnt/data', 'sudo mount /dev/sdb1 /mnt/data')],
            [l('Unmount it safely', 'নিরাপদে আনমাউন্ট'), l('sudo umount /mnt/data', 'sudo umount /mnt/data')],
            [l('Show free space', 'ফ্রি স্পেস দেখুন'), l('df -h', 'df -h')],
            [l('Find a partition’s UUID/type', 'partition-এর UUID/type'), l('sudo blkid /dev/sdb1', 'sudo blkid /dev/sdb1')],
          ],
        } },
      ],
    },
    {
      h: l('Mounting automatically at boot with /etc/fstab', '/etc/fstab দিয়ে বুটে স্বয়ংক্রিয় মাউন্ট'),
      blocks: [
        { p: l('A mount made with the mount command lasts only until the next reboot. To make a disk mount automatically every time the system starts, you add a line to /etc/fstab — the filesystem table the boot process reads. Each line names the partition (best identified by its stable UUID, since device names like /dev/sdb can change), the mount point, the filesystem type, and options. Because this file runs at boot, a mistake in it can stop the whole system from starting, so always test a new entry before you trust it.', 'mount কমান্ড দিয়ে করা একটি মাউন্ট শুধু পরের reboot পর্যন্ত টেকে। প্রতিবার সিস্টেম চালু হলে একটি ডিস্ক স্বয়ংক্রিয়ভাবে মাউন্ট করতে /etc/fstab-এ একটি লাইন যোগ করেন—যে filesystem টেবিল বুট প্রক্রিয়া পড়ে। প্রতিটি লাইন নাম দেয় partition (তার স্থিতিশীল UUID দিয়ে চেনা ভালো, কারণ /dev/sdb-এর মতো device নাম বদলাতে পারে), mount point, filesystem type ও option। এই ফাইল বুটে চলে বলে এতে একটি ভুল পুরো সিস্টেম চালু হওয়া থামাতে পারে, তাই নতুন এন্ট্রিতে ভরসা করার আগে সবসময় পরীক্ষা করুন।') },
        { code: `# Find the stable UUID and filesystem type of the partition
sudo blkid /dev/sdb1
# /dev/sdb1: UUID="1a2b3c4d-5e6f" TYPE="ext4"

# Add a line like this to /etc/fstab (device  mountpoint  type  options  dump  pass)
# UUID=1a2b3c4d-5e6f  /mnt/data  ext4  defaults  0  2

# Test the new fstab entry WITHOUT rebooting — it mounts everything in fstab
sudo mount -a
df -h /mnt/data                 # confirm it mounted with no errors`, caption: l('Using UUID instead of /dev/sdb1 keeps the entry correct even if the kernel numbers the disks differently on the next boot.', '/dev/sdb1-এর বদলে UUID ব্যবহার করলে পরের বুটে kernel ডিস্কগুলো ভিন্নভাবে নম্বর দিলেও এন্ট্রি ঠিক থাকে।') },
        { note: l('A bad /etc/fstab entry can leave the machine unable to boot, dropping it into an emergency shell. Always run sudo mount -a after editing fstab; if it errors, fix the line before you reboot.', 'একটি খারাপ /etc/fstab এন্ট্রি মেশিনকে বুট করতে অক্ষম করে একটি emergency shell-এ ফেলতে পারে। fstab এডিটের পর সবসময় sudo mount -a চালান; এরর দিলে reboot-এর আগে লাইনটি ঠিক করুন।'), kind: 'warn' },
      ],
    },
    {
      h: l('When and where to use it', 'কখন ও কোথায় ব্যবহার করবেন'),
      blocks: [
        { p: l('You mount disks whenever you add storage: attaching a new drive to a server, accessing a USB stick, giving a database its own fast volume, or mounting a network share. For a one-off — copying files off a USB stick — a temporary mount with the mount command is fine, and many desktop environments do it for you automatically. For anything the system should always have — the disk that holds /home, or a data volume a service depends on — add it to /etc/fstab so it survives reboots without anyone remembering to remount it.', 'আপনি ডিস্ক মাউন্ট করেন যখনই স্টোরেজ যোগ করেন: একটি সার্ভারে নতুন ড্রাইভ যুক্ত করা, একটি USB স্টিক অ্যাক্সেস, একটি ডেটাবেসকে নিজের দ্রুত volume দেওয়া, বা একটি নেটওয়ার্ক শেয়ার মাউন্ট। এককালীন কাজে—একটি USB স্টিক থেকে ফাইল কপি—mount কমান্ড দিয়ে একটি অস্থায়ী মাউন্ট যথেষ্ট, আর অনেক ডেস্কটপ পরিবেশ আপনার হয়ে স্বয়ংক্রিয়ভাবে করে। সিস্টেমের সবসময় থাকা উচিত এমন কিছুতে—/home ধরা ডিস্ক, বা একটি সার্ভিসের নির্ভরশীল data volume—/etc/fstab-এ যোগ করুন যাতে কেউ আবার মাউন্ট করার কথা মনে না রেখেও তা reboot-এ টেকে।') },
        { p: l('Before you unmount or physically unplug anything, make sure no process is still using it. Data is often held in a memory cache and written to disk a moment later, so pulling a drive too early can lose or corrupt the most recent writes. The safe sequence is: stop any program using the disk, cd out of the mount point, run umount, and only then remove the device. If umount reports the target is busy, the tools lsof and fuser will tell you which process is holding it open.', 'কিছু unmount বা ভৌতভাবে খোলার আগে নিশ্চিত করুন কোনো process তা তখনো ব্যবহার করছে না। ডেটা প্রায়ই একটি মেমরি cache-এ থাকে ও একটু পরে ডিস্কে লেখা হয়, তাই একটি ড্রাইভ খুব তাড়াতাড়ি টানলে সবচেয়ে সাম্প্রতিক লেখা হারাতে বা নষ্ট হতে পারে। নিরাপদ ক্রম: ডিস্ক ব্যবহারকারী যেকোনো প্রোগ্রাম থামান, mount point থেকে cd করে বেরোন, umount চালান, তারপরই device সরান। umount বললে target busy, lsof ও fuser টুল বলে দেবে কোন process এটি খোলা রেখেছে।') },
      ],
    },
    {
      h: l('Common mistakes', 'সাধারণ ভুল'),
      blocks: [
        l => l,
        { list: [
          l('Unplugging or unmounting a disk while it is still being written to, corrupting its filesystem. Always umount cleanly first.', 'একটি ডিস্ক এখনো লেখা হচ্ছে এমন অবস্থায় খুলে ফেলা বা unmount করা, তার filesystem নষ্ট করা। সবসময় আগে পরিষ্কারভাবে umount করুন।'),
          l('Writing a broken /etc/fstab entry and rebooting without testing, leaving the machine stuck at boot. Run sudo mount -a first.', 'একটি ভাঙা /etc/fstab এন্ট্রি লিখে পরীক্ষা ছাড়া reboot করা, মেশিনকে বুটে আটকে ফেলা। আগে sudo mount -a চালান।'),
          l('Mounting onto a directory that already has files — they become hidden (not deleted) until you unmount, which looks alarming.', 'আগে থেকেই ফাইল আছে এমন একটি ডিরেক্টরিতে মাউন্ট করা—unmount না করা পর্যন্ত সেগুলো লুকিয়ে যায় (মুছে যায় না), যা ভয় ধরায়।'),
          l('Using unstable /dev/sdb names in fstab instead of a UUID, so the entry breaks when disks are detected in a different order.', 'fstab-এ UUID-এর বদলে অস্থিতিশীল /dev/sdb নাম ব্যবহার করা, ফলে ডিস্ক ভিন্ন ক্রমে শনাক্ত হলে এন্ট্রি ভাঙে।'),
        ] },
      ],
    },
    {
      h: l('Remember in one line', 'এক লাইনে মনে রাখুন'),
      blocks: [
        { list: [
          l('Storage appears as block devices (/dev/sda); a filesystem is usable only once you mount it onto a directory.', 'স্টোরেজ block device (/dev/sda) হিসেবে আসে; একটি filesystem শুধু একটি ডিরেক্টরিতে mount করার পরই ব্যবহারযোগ্য।'),
          l('lsblk lists devices, mount attaches one, df -h shows space, umount detaches it safely.', 'lsblk device তালিকা করে, mount একটি যুক্ত করে, df -h জায়গা দেখায়, umount নিরাপদে খোলে।'),
          l('Use /etc/fstab (with UUIDs) for permanent mounts — but a bad entry can stop the system booting.', 'স্থায়ী মাউন্টে /etc/fstab (UUID সহ) ব্যবহার করুন—তবে একটি খারাপ এন্ট্রি সিস্টেম বুট থামাতে পারে।'),
        ] },
      ],
    },
  ],

  // ── lx-diskusage · Disk usage (df, du) ────────────────────────────────────
  'lx-diskusage': [
    {
      h: l('What are df and du?', 'df ও du কী?'),
      blocks: [
        { p: l('df ("disk free") and du ("disk usage") are the two commands you use to answer the everyday question "where did my disk space go?" They look similar but measure different things. df reports free and used space for whole filesystems — it answers "how full is this disk?" du measures how much space specific files and directories occupy — it answers "what inside this disk is taking up the room?" You almost always use them together: df to spot which disk is full, then du to hunt down the directories responsible.', 'df ("disk free") ও du ("disk usage") হলো সেই দুটি কমান্ড যা দিয়ে আপনি প্রতিদিনের প্রশ্ন "আমার ডিস্কের জায়গা কোথায় গেল?"-এর উত্তর দেন। এরা দেখতে একই রকম কিন্তু ভিন্ন জিনিস মাপে। df পুরো filesystem-এর ফ্রি ও ব্যবহৃত জায়গা জানায়—উত্তর দেয় "এই ডিস্ক কতটা পূর্ণ?" du নির্দিষ্ট ফাইল ও ডিরেক্টরি কত জায়গা নেয় মাপে—উত্তর দেয় "এই ডিস্কের ভেতরে কী জায়গা নিচ্ছে?" আপনি প্রায় সবসময় এদের একসঙ্গে ব্যবহার করেন: কোন ডিস্ক পূর্ণ ধরতে df, তারপর দায়ী ডিরেক্টরি খুঁজতে du।') },
        { p: l('The problem they solve is one of the most common on any running system: a disk fills up, and suddenly programs cannot write files, databases refuse new records, and logs stop. When that happens you cannot guess your way out — you need to measure. df tells you which filesystem hit 100%, and du walks that filesystem and weighs its contents so you can see, in plain numbers, exactly which folders to clean up rather than deleting things at random and hoping.', 'এরা যে সমস্যা সমাধান করে তা যেকোনো চলমান সিস্টেমের সবচেয়ে সাধারণগুলোর একটি: একটি ডিস্ক পূর্ণ হয়ে যায়, আর হঠাৎ প্রোগ্রাম ফাইল লিখতে পারে না, ডেটাবেস নতুন রেকর্ড নেয় না, লগ থামে। তখন অনুমানে বেরোতে পারবেন না—মাপতে হবে। df বলে কোন filesystem ১০০%-এ পৌঁছেছে, আর du সেই filesystem হাঁটে ও তার ভেতরের ওজন করে যাতে এলোমেলোভাবে জিনিস মুছে আশা করার বদলে ঠিক কোন ফোল্ডার পরিষ্কার করবেন তা স্পষ্ট সংখ্যায় দেখতে পান।') },
        { note: l('df is the fuel gauge on the dashboard — it tells you at a glance how full the tank is. du is weighing each bag in the boot to find out which one is heavy. You read the gauge first, then start weighing.', 'df হলো ড্যাশবোর্ডের জ্বালানি গজ—এক নজরে বলে ট্যাংক কতটা পূর্ণ। du হলো বুটের প্রতিটি ব্যাগ ওজন করে দেখা কোনটি ভারী। আগে গজ পড়েন, তারপর ওজন করা শুরু করেন।'), kind: 'tip' },
      ],
    },
    {
      h: l('How to find what is eating your space', 'কী আপনার জায়গা খাচ্ছে কীভাবে খুঁজবেন'),
      blocks: [
        { steps: [
          l('Run df -h to see every filesystem and its Use% column. Find the one that is nearly or completely full.', 'প্রতিটি filesystem ও তার Use% কলাম দেখতে df -h চালান। প্রায় বা পুরোপুরি পূর্ণটি খুঁজুন।'),
          l('Move into that filesystem and run du to measure its top-level directories, sorting so the biggest float to the bottom.', 'সেই filesystem-এ ঢুকুন ও তার শীর্ষ-স্তরের ডিরেক্টরি মাপতে du চালান, সাজান যাতে বড়গুলো নিচে ভেসে ওঠে।'),
          l('Drill into the biggest directory and repeat, following the trail of large folders down to the actual culprit.', 'সবচেয়ে বড় ডিরেক্টরিতে ঢুকে পুনরাবৃত্তি করুন, বড় ফোল্ডারের পথ ধরে আসল দোষী পর্যন্ত নামুন।'),
          l('Delete or archive what you safely can — old logs, caches, and temporary files are usual suspects — then run df -h again to confirm space was freed.', 'যা নিরাপদে পারেন মুছুন বা archive করুন—পুরনো লগ, cache ও অস্থায়ী ফাইল সাধারণ সন্দেহভাজন—তারপর জায়গা মুক্ত হয়েছে নিশ্চিত করতে আবার df -h চালান।'),
        ] },
        { code: `# 1. Which filesystem is full? (fast — reads the filesystem's own counters)
df -h
# Filesystem  Size  Used Avail Use% Mounted on
# /dev/sda1   238G  226G  0.6G  99% /          <- the problem

# 2. Inside the full filesystem, find the biggest top-level directories
sudo du -sh /var/* | sort -h | tail -5
#  1.2G  /var/cache
#  8.4G  /var/log       <- suspicious

# 3. Drill into the worst offender to find the exact files
sudo du -sh /var/log/* | sort -h | tail -5
#  6.9G  /var/log/journal

# 4. After cleaning up, confirm the space came back
df -h /`, caption: l('du -sh gives a summarized, human-readable size per item; piping through sort -h orders them by size so tail shows the largest. -s means summary, -h means human-readable.', 'du -sh প্রতিটি আইটেমের একটি সারসংক্ষেপিত, পাঠযোগ্য সাইজ দেয়; sort -h দিয়ে পাইপ করলে সাইজ অনুযায়ী সাজায় যাতে tail সবচেয়ে বড়গুলো দেখায়। -s মানে summary, -h মানে human-readable।') },
      ],
    },
    {
      h: l('Key commands', 'মূল কমান্ড'),
      blocks: [
        { table: {
          head: [l('Goal', 'লক্ষ্য'), l('Command', 'কমান্ড')],
          rows: [
            [l('Free space per filesystem', 'প্রতি filesystem ফ্রি স্পেস'), l('df -h', 'df -h')],
            [l('Size of one directory', 'একটি ডিরেক্টরির সাইজ'), l('du -sh /var/log', 'du -sh /var/log')],
            [l('Biggest items here, sorted', 'এখানকার বড় আইটেম, সাজানো'), l('du -sh * | sort -h', 'du -sh * | sort -h')],
            [l('List block devices', 'block device তালিকা'), l('lsblk', 'lsblk')],
            [l('Find files over 500 MB', '৫০০ MB-র বড় ফাইল খুঁজুন'), l('find / -size +500M', 'find / -size +500M')],
          ],
        } },
      ],
    },
    {
      h: l('df vs du — two different questions', 'df বনাম du—দুটি ভিন্ন প্রশ্ন'),
      blocks: [
        { p: l('It helps to hold the difference clearly, because their numbers do not always match — and that surprises people. df reads a filesystem’s own bookkeeping and answers instantly, no matter how many files there are. du actually walks the directory tree, adding up file sizes, so on a folder with millions of files it can take a while. They can also disagree: a deleted file still held open by a running process no longer shows in du, but its space is not freed until the process exits, so df still counts it.', 'পার্থক্যটি স্পষ্ট রাখা সাহায্য করে, কারণ এদের সংখ্যা সবসময় মেলে না—আর এটি মানুষকে অবাক করে। df একটি filesystem-এর নিজস্ব হিসাব পড়ে ও তাৎক্ষণিক উত্তর দেয়, যত ফাইলই থাকুক। du আসলে ডিরেক্টরি গাছ হাঁটে, ফাইল সাইজ যোগ করে, তাই লাখো ফাইলের ফোল্ডারে সময় নিতে পারে। এরা মতভেদও করতে পারে: একটি চলমান process খোলা রাখা একটি মোছা ফাইল আর du-তে দেখায় না, কিন্তু process বেরোনো পর্যন্ত তার জায়গা মুক্ত হয় না, তাই df তখনো গোনে।') },
        { table: {
          head: [l('Aspect', 'দিক'), l('df', 'df'), l('du', 'du')],
          rows: [
            [l('Measures', 'মাপে'), l('Free/used space of whole filesystems', 'পুরো filesystem-এর ফ্রি/ব্যবহৃত জায়গা'), l('Space used by specific files and directories', 'নির্দিষ্ট ফাইল ও ডিরেক্টরির ব্যবহৃত জায়গা')],
            [l('Speed', 'গতি'), l('Instant — reads counters', 'তাৎক্ষণিক—counter পড়ে'), l('Slower — walks the tree', 'ধীর—গাছ হাঁটে')],
            [l('Best question', 'সেরা প্রশ্ন'), l('Is a disk full?', 'একটি ডিস্ক কি পূর্ণ?'), l('What is filling it up?', 'কী এটি ভরছে?')],
          ],
        } },
      ],
    },
    {
      h: l('When and where to use it', 'কখন ও কোথায় ব্যবহার করবেন'),
      blocks: [
        { p: l('Make df -h your first move whenever a program complains it cannot write, a deploy fails, or a server acts strangely — a full disk is behind an astonishing number of vague failures. Because df is instant and harmless, it is safe to run any time, and many people check it as a habit when logging into a server. Once df has shown you the full filesystem, reach for du to investigate, always starting broad (top-level directories) and narrowing down, so you do not waste time weighing folders that turn out to be small.', 'যখনই একটি প্রোগ্রাম লিখতে পারছে না বলে অভিযোগ করে, একটি deploy ব্যর্থ হয়, বা একটি সার্ভার অদ্ভুত আচরণ করে তখন df -h-কে আপনার প্রথম পদক্ষেপ করুন—একটি পূর্ণ ডিস্ক অবাক করা সংখ্যক অস্পষ্ট ব্যর্থতার পেছনে থাকে। df তাৎক্ষণিক ও নিরীহ বলে যেকোনো সময় চালানো নিরাপদ, আর অনেকে সার্ভারে লগইন করলে অভ্যাসবশত এটি দেখে। df পূর্ণ filesystem দেখানোর পর তদন্তে du নিন, সবসময় বড় থেকে শুরু করে (শীর্ষ-স্তরের ডিরেক্টরি) সরু করুন, যাতে ছোট বলে প্রমাণিত ফোল্ডার ওজনে সময় নষ্ট না হয়।') },
        { p: l('A few practical notes make du far more useful. On a large tree, running du as root avoids "permission denied" gaps that would make totals wrong. Piping du -sh * | sort -h is the single most useful incantation, because it ranks the current directory’s contents by size. And when a disk shows full in df but du finds nothing, suspect a large deleted-but-still-open file (common with log files) — restarting the process that holds it releases the space.', 'কয়েকটি ব্যবহারিক নোট du-কে অনেক বেশি কাজের করে। একটি বড় গাছে du-কে root হিসেবে চালালে "permission denied" ফাঁক এড়ানো যায় যা মোট ভুল করত। du -sh * | sort -h পাইপ করা সবচেয়ে কাজের মন্ত্র, কারণ এটি বর্তমান ডিরেক্টরির ভেতর সাইজ অনুযায়ী সাজায়। আর df-তে ডিস্ক পূর্ণ কিন্তু du কিছু না পেলে, একটি বড় মোছা-কিন্তু-এখনো-খোলা ফাইল সন্দেহ করুন (log ফাইলে সাধারণ)—এটি ধরে রাখা process রিস্টার্ট করলে জায়গা মুক্ত হয়।') },
      ],
    },
    {
      h: l('Common mistakes', 'সাধারণ ভুল'),
      blocks: [
        { list: [
          l('Seeing a full disk in df but deleting the wrong files, because you never ran du to find the real culprit.', 'df-তে পূর্ণ ডিস্ক দেখা কিন্তু ভুল ফাইল মোছা, কারণ আসল দোষী খুঁজতে du কখনো চালাননি।'),
          l('Forgetting -h, so sizes print as huge raw block counts that are hard to compare at a glance.', '-h ভুলে যাওয়া, ফলে সাইজ বিশাল raw block সংখ্যায় ছাপে যা এক নজরে তুলনা করা কঠিন।'),
          l('Running du across a giant tree as a normal user and getting wrong totals from "permission denied" on folders you cannot read.', 'একটি বিশাল গাছে সাধারণ user হিসেবে du চালিয়ে পড়তে-না-পারা ফোল্ডারে "permission denied" থেকে ভুল মোট পাওয়া।'),
          l('Panicking when df and du disagree, instead of realizing a deleted-but-open file (or a different mount) explains the gap.', 'df ও du না মিললে আতঙ্কিত হওয়া, বদলে বোঝা যে একটি মোছা-কিন্তু-খোলা ফাইল (বা ভিন্ন mount) ফাঁকটি ব্যাখ্যা করে।'),
        ] },
      ],
    },
    {
      h: l('Remember in one line', 'এক লাইনে মনে রাখুন'),
      blocks: [
        { list: [
          l('df -h answers "is a disk full?" per filesystem; du -sh answers "what is filling it?" per directory.', 'df -h প্রতি filesystem-এ "ডিস্ক কি পূর্ণ?" জানায়; du -sh প্রতি ডিরেক্টরিতে "কী ভরছে?" জানায়।'),
          l('The workflow is df first to find the full disk, then du -sh * | sort -h to hunt down the biggest folders.', 'কর্মপ্রবাহ: পূর্ণ ডিস্ক খুঁজতে আগে df, তারপর সবচেয়ে বড় ফোল্ডার খুঁজতে du -sh * | sort -h।'),
          l('df is instant; du walks the tree and is slow on directories with millions of files.', 'df তাৎক্ষণিক; du গাছ হাঁটে ও লাখো ফাইলের ডিরেক্টরিতে ধীর।'),
        ] },
      ],
    },
  ],

  // ── lx-scripting · Bash scripting basics ──────────────────────────────────
  'lx-scripting': [
    {
      h: l('What is a bash script?', 'bash স্ক্রিপ্ট কী?'),
      blocks: [
        { p: l('A bash script is simply a text file containing the same commands you would type at the terminal, saved so you can run them all at once. The first line, called the shebang, is #!/bin/bash — it tells the system which interpreter should run the file. After that, each line is an ordinary command, executed top to bottom. Because a script can also use variables, conditionals (if), and loops (for, while), it is not just a list of commands but a small program that can make decisions and repeat work.', 'একটি bash স্ক্রিপ্ট হলো কেবল একটি টেক্সট ফাইল যাতে টার্মিনালে যে কমান্ড টাইপ করতেন সেগুলোই থাকে, সেভ করা যাতে একবারে সব চালাতে পারেন। প্রথম লাইন, যাকে shebang বলে, হলো #!/bin/bash—এটি সিস্টেমকে বলে কোন interpreter ফাইলটি চালাবে। এরপর প্রতিটি লাইন একটি সাধারণ কমান্ড, ওপর থেকে নিচে চলে। একটি স্ক্রিপ্ট variable, শর্ত (if) ও লুপ (for, while)-ও ব্যবহার করতে পারে বলে এটি শুধু কমান্ডের তালিকা নয়, বরং একটি ছোট প্রোগ্রাম যা সিদ্ধান্ত নিতে ও কাজ পুনরাবৃত্তি করতে পারে।') },
        { p: l('The problem scripting solves is repetition and human error. Any task you find yourself doing more than a couple of times — backing up a folder, deploying an app, processing a batch of files — is a candidate for a script. Once written, the script runs the exact same steps every time, in the same order, with no forgotten command and no typo at 2am. It can be scheduled to run unattended, shared with teammates, and kept in version control, turning a fragile manual routine into something reliable and repeatable.', 'স্ক্রিপ্টিং যে সমস্যা সমাধান করে তা হলো পুনরাবৃত্তি ও মানবিক ভুল। যে কাজ নিজেকে কয়েকবারের বেশি করতে দেখেন—একটি ফোল্ডার ব্যাকআপ, একটি অ্যাপ deploy, একগুচ্ছ ফাইল প্রসেস—তা একটি স্ক্রিপ্টের প্রার্থী। একবার লেখা হলে স্ক্রিপ্ট প্রতিবার ঠিক একই ধাপ একই ক্রমে চালায়, কোনো ভুলে-যাওয়া কমান্ড ও রাত ২টায় কোনো টাইপো ছাড়া। এটি অলক্ষ্যে চলতে schedule করা যায়, টিমমেটের সঙ্গে শেয়ার করা যায়, ও version control-এ রাখা যায়, একটি ভঙ্গুর ম্যানুয়াল রুটিনকে নির্ভরযোগ্য ও পুনরাবৃত্তিযোগ্য কিছুতে বদলে দেয়।') },
        { note: l('A script is like writing down a recipe once. Instead of remembering every step and measurement each time you cook, you follow the card — and so can anyone else, or an automated schedule, getting the same result every time.', 'একটি স্ক্রিপ্ট একবার একটি রেসিপি লিখে রাখার মতো। প্রতিবার রান্নার সময় প্রতিটি ধাপ ও পরিমাপ মনে রাখার বদলে আপনি কার্ডটি অনুসরণ করেন—আর অন্য যে কেউ, বা একটি স্বয়ংক্রিয় schedule, তাই করতে পারে, প্রতিবার একই ফল পেয়ে।'), kind: 'tip' },
      ],
    },
    {
      h: l('Anatomy of a script', 'একটি স্ক্রিপ্টের গঠন'),
      blocks: [
        { steps: [
          l('Start the file with the shebang #!/bin/bash so the system knows to run it with bash.', 'ফাইলটি shebang #!/bin/bash দিয়ে শুরু করুন যাতে সিস্টেম জানে এটি bash দিয়ে চালাতে হবে।'),
          l('Read inputs into variables — $1 is the first argument passed on the command line; assign your own with name="value".', 'ইনপুট variable-এ পড়ুন—$1 হলো কমান্ড লাইনে দেওয়া প্রথম argument; নিজেরটা name="value" দিয়ে দিন।'),
          l('Guard against bad input with an if test, and exit with a nonzero code if something is wrong.', 'একটি if টেস্ট দিয়ে খারাপ ইনপুট থেকে রক্ষা করুন, আর কিছু ভুল হলে nonzero কোডে exit করুন।'),
          l('Do the repetitive work in a loop, quoting every variable ("$var") so spaces and special characters are safe.', 'পুনরাবৃত্ত কাজ একটি লুপে করুন, প্রতিটি variable কোট করে ("$var") যাতে স্পেস ও বিশেষ অক্ষর নিরাপদ থাকে।'),
          l('Save the file, make it executable with chmod +x, and run it with ./script.sh arguments.', 'ফাইল সেভ করুন, chmod +x দিয়ে executable করুন, ও ./script.sh arguments দিয়ে চালান।'),
        ] },
        { code: `#!/bin/bash
# backup.sh — archive every .log file in a directory given as an argument

target="$1"                 # first argument: the directory to back up
stamp=$(date +%Y-%m-%d)     # today's date, e.g. 2026-07-09

# Guard: was an argument given, and is it really a directory?
if [ -z "$target" ]; then
  echo "Usage: ./backup.sh <directory>"
  exit 1
fi
if [ ! -d "$target" ]; then
  echo "Error: $target is not a directory"
  exit 1
fi

# Loop over each .log file and copy it with a dated name
count=0
for file in "$target"/*.log; do
  echo "Backing up $file"
  cp "$file" "/backup/$stamp-$(basename "$file")"
  count=$((count + 1))      # arithmetic goes inside $(( ))
done

echo "Done: backed up $count log files."`, caption: l('Note the shebang, the variable target, the if guards, and the for loop. Every variable is quoted ("$target", "$file") so a path with spaces will not break the script.', 'লক্ষ্য করুন shebang, variable target, if গার্ড, ও for লুপ। প্রতিটি variable কোট করা ("$target", "$file") যাতে স্পেসসহ একটি path স্ক্রিপ্ট না ভাঙে।') },
      ],
    },
    {
      h: l('Key building blocks', 'মূল উপাদান'),
      blocks: [
        { table: {
          head: [l('Goal', 'লক্ষ্য'), l('Snippet', 'স্নিপেট')],
          rows: [
            [l('Declare the interpreter', 'interpreter ঘোষণা'), l('#!/bin/bash', '#!/bin/bash')],
            [l('Make the script runnable', 'স্ক্রিপ্ট চালানো যোগ্য করুন'), l('chmod +x script.sh', 'chmod +x script.sh')],
            [l('Run it with an argument', 'একটি argument দিয়ে চালান'), l('./script.sh /var/log', './script.sh /var/log')],
            [l('Set and use a variable', 'variable সেট ও ব্যবহার'), l('name="Ada"; echo "$name"', 'name="Ada"; echo "$name"')],
            [l('Test a condition', 'একটি শর্ত পরীক্ষা'), l('if [ -f "$file" ]; then ... fi', 'if [ -f "$file" ]; then ... fi')],
            [l('Loop over files', 'ফাইলের ওপর লুপ'), l('for f in *.txt; do ... done', 'for f in *.txt; do ... done')],
          ],
        } },
      ],
    },
    {
      h: l('Variables, conditions, and loops', 'variable, শর্ত ও লুপ'),
      blocks: [
        { p: l('Three constructs turn a plain list of commands into a real program. A variable stores a value you refer to later — you set it with name=value (no spaces around the =) and read it back with a dollar sign as $name, or more safely as "$name" in quotes. A conditional runs commands only when a test passes: if [ -f "$file" ] checks whether a file exists. A loop repeats commands for each item: for f in *.txt does the body once per matching file. Master these three and you can automate almost anything you do by hand.', 'তিনটি গঠন একটি সাদামাটা কমান্ড তালিকাকে একটি সত্যিকার প্রোগ্রামে বদলে দেয়। একটি variable একটি মান রাখে যা পরে উল্লেখ করেন—name=value দিয়ে সেট করেন (= এর দুপাশে স্পেস নয়) ও একটি dollar চিহ্ন দিয়ে $name হিসেবে পড়েন, বা আরও নিরাপদে কোটে "$name"। একটি শর্ত শুধু একটি টেস্ট পাস করলে কমান্ড চালায়: if [ -f "$file" ] দেখে একটি ফাইল আছে কিনা। একটি লুপ প্রতিটি আইটেমের জন্য কমান্ড পুনরাবৃত্তি করে: for f in *.txt প্রতিটি মেলা ফাইলে একবার body চালায়। এই তিনটি আয়ত্ত করলে হাতে করা প্রায় সবকিছু অটোমেট করতে পারবেন।') },
        { code: `#!/bin/bash
# A tiny script showing all three constructs together

greeting="Hello"            # a variable (no spaces around =)
echo "$greeting, world"     # always quote when you use a variable

# A loop that counts .txt files, with a condition inside
count=0
for f in *.txt; do
  if [ -f "$f" ]; then      # -f tests "is this an existing file?"
    count=$((count + 1))
  fi
done
echo "Found $count text files"`, caption: l('Quoting "$f" matters: without the quotes a file named "my notes.txt" would be split into two arguments, "my" and "notes.txt", and the script would misbehave.', '"$f" কোট করা জরুরি: কোট ছাড়া "my notes.txt" নামের একটি ফাইল দুটি argument-এ ভাগ হতো, "my" ও "notes.txt", আর স্ক্রিপ্ট ভুল আচরণ করত।') },
        { note: l('The single most common scripting bug is an unquoted variable. Get in the habit of writing "$var" every time — a filename or input with a space or a * in it will otherwise break your script in confusing ways.', 'সবচেয়ে সাধারণ স্ক্রিপ্টিং বাগ হলো একটি আন-কোটেড variable। প্রতিবার "$var" লেখার অভ্যাস করুন—নইলে স্পেস বা * থাকা একটি ফাইলনাম বা ইনপুট আপনার স্ক্রিপ্টকে বিভ্রান্তিকরভাবে ভাঙবে।'), kind: 'warn' },
      ],
    },
    {
      h: l('When and where to use it', 'কখন ও কোথায় ব্যবহার করবেন'),
      blocks: [
        { p: l('Write a script the second or third time you catch yourself running the same sequence of commands. Backups, deployments, log rotation, bulk file renaming, setting up a new machine, and health checks are all classic uses. Scripts also shine inside automation: a cron job runs one every night, a systemd service starts one at boot, and CI pipelines are largely shell scripts. If a task is repetitive, has clear steps, and should run the same way every time, it belongs in a script.', 'একই ক্রমে কমান্ড চালাতে নিজেকে দ্বিতীয় বা তৃতীয়বার ধরলেই একটি স্ক্রিপ্ট লিখুন। ব্যাকআপ, deployment, log rotation, একগুচ্ছ ফাইল নাম বদল, একটি নতুন মেশিন সেটআপ ও health check সবই ক্লাসিক ব্যবহার। স্ক্রিপ্ট অটোমেশনের ভেতরেও উজ্জ্বল: একটি cron job প্রতি রাতে একটি চালায়, একটি systemd সার্ভিস বুটে একটি শুরু করে, আর CI pipeline মূলত shell স্ক্রিপ্ট। একটি কাজ পুনরাবৃত্ত হলে, স্পষ্ট ধাপ থাকলে, ও প্রতিবার একইভাবে চলা উচিত হলে তা একটি স্ক্রিপ্টে যায়।') },
        { p: l('Bash is ideal for gluing commands together, but know its limits. For anything with real data structures, complex math, or heavy text parsing, a language like Python is easier and more maintainable — a good rule is that once a bash script grows past roughly a hundred lines or sprouts nested logic, it is trying to become a program and should probably move to Python. For safety, start non-trivial scripts with set -euo pipefail so they stop on the first error instead of charging ahead after something failed.', 'কমান্ড জোড়া লাগাতে bash আদর্শ, তবে এর সীমা জানুন। সত্যিকার ডেটা স্ট্রাকচার, জটিল গণিত বা ভারী টেক্সট পার্সিং থাকা কিছুতে Python-এর মতো ভাষা সহজ ও বেশি maintainable—একটি ভালো নিয়ম: একটি bash স্ক্রিপ্ট মোটামুটি একশো লাইন পেরোলে বা nested লজিক গজালে, তা একটি প্রোগ্রাম হতে চাইছে ও সম্ভবত Python-এ যাওয়া উচিত। নিরাপত্তার জন্য উল্লেখযোগ্য স্ক্রিপ্ট set -euo pipefail দিয়ে শুরু করুন যাতে কিছু ব্যর্থ হওয়ার পর এগিয়ে যাওয়ার বদলে প্রথম এররেই থামে।') },
      ],
    },
    {
      h: l('Common mistakes', 'সাধারণ ভুল'),
      blocks: [
        { list: [
          l('Not quoting variables ("$var"), so a filename with spaces or a glob character breaks the script in surprising ways.', 'variable কোট না করা ("$var"), ফলে স্পেস বা glob অক্ষরসহ একটি ফাইলনাম স্ক্রিপ্টকে অপ্রত্যাশিতভাবে ভাঙে।'),
          l('Putting spaces around the = in an assignment: name = value fails, it must be name=value.', 'একটি assignment-এ = এর দুপাশে স্পেস দেওয়া: name = value ব্যর্থ, হতে হবে name=value।'),
          l('Forgetting the shebang or chmod +x, then being confused when ./script.sh will not run.', 'shebang বা chmod +x ভুলে যাওয়া, তারপর ./script.sh না চললে বিভ্রান্ত হওয়া।'),
          l('Not checking for errors — a script that keeps going after a failed step can do real damage; use set -e or test the exit status.', 'এরর যাচাই না করা—একটি ব্যর্থ ধাপের পরও চলা স্ক্রিপ্ট আসল ক্ষতি করতে পারে; set -e ব্যবহার করুন বা exit status পরীক্ষা করুন।'),
        ] },
      ],
    },
    {
      h: l('Remember in one line', 'এক লাইনে মনে রাখুন'),
      blocks: [
        { list: [
          l('A bash script starts with #!/bin/bash, needs chmod +x to run, and automates a sequence you would otherwise type.', 'একটি bash স্ক্রিপ্ট #!/bin/bash দিয়ে শুরু হয়, চলতে chmod +x লাগে, ও যা টাইপ করতেন তা অটোমেট করে।'),
          l('Read arguments as $1, set variables with name=value, and add logic with if and for.', 'argument $1 হিসেবে পড়ুন, name=value দিয়ে variable সেট করুন, ও if ও for দিয়ে লজিক যোগ করুন।'),
          l('Always quote your variables ("$var") — an unquoted value with a space is the classic scripting bug.', 'সবসময় variable কোট করুন ("$var")—স্পেসসহ একটি আন-কোটেড মান ক্লাসিক স্ক্রিপ্টিং বাগ।'),
        ] },
      ],
    },
  ],

  // ── lx-troubleshooting · Logs & troubleshooting ───────────────────────────
  'lx-troubleshooting': [
    {
      h: l('What is troubleshooting with logs?', 'লগ দিয়ে ট্রাবলশুটিং কী?'),
      blocks: [
        { p: l('When something on a Linux system breaks — a service will not start, a website returns errors, the machine is slow — the answer is almost always written down somewhere in the logs. Logs are timestamped records that programs and the kernel continuously write, describing what they did and what went wrong. Troubleshooting with logs means going to those records and reading them, rather than guessing. The three places you look are journalctl (the systemd journal, covering most services), the plain-text files under /var/log, and dmesg (the kernel’s messages about hardware and drivers).', 'Linux সিস্টেমে কিছু ভাঙলে—একটি সার্ভিস চালু হয় না, একটি ওয়েবসাইট এরর দেয়, মেশিন ধীর—উত্তর প্রায় সবসময় লগের কোথাও লেখা থাকে। লগ হলো টাইমস্ট্যাম্পযুক্ত রেকর্ড যা প্রোগ্রাম ও kernel অবিরাম লেখে, বর্ণনা করে তারা কী করল ও কী ভুল হলো। লগ দিয়ে ট্রাবলশুটিং মানে অনুমান না করে সেই রেকর্ডে গিয়ে পড়া। যে তিন জায়গায় দেখেন: journalctl (systemd journal, বেশিরভাগ সার্ভিস ঢাকে), /var/log-এর প্লেইন-টেক্সট ফাইল, ও dmesg (হার্ডওয়্যার ও driver নিয়ে kernel-এর বার্তা)।') },
        { p: l('The problem this solves is the temptation to guess. Faced with a broken service, a beginner often starts randomly restarting things, changing config, or reinstalling — sometimes making the situation worse and rarely understanding the cause. Logs cut through that: a failing service usually prints the exact reason it failed (a missing file, a permission denied, a port already in use, a syntax error in its config) along with the precise time. Reading the log first turns a blind guess into a targeted fix.', 'এটি যে সমস্যা সমাধান করে তা হলো অনুমানের প্রলোভন। একটি ভাঙা সার্ভিসের মুখে একজন নতুন প্রায়ই এলোমেলোভাবে জিনিস রিস্টার্ট করা, config বদলানো বা পুনরায় ইনস্টল করা শুরু করে—কখনো অবস্থা আরও খারাপ করে ও কদাচিৎ কারণ বোঝে। লগ তা কেটে দেয়: একটি ব্যর্থ সার্ভিস সাধারণত ব্যর্থ হওয়ার ঠিক কারণ ছাপে (একটি অনুপস্থিত ফাইল, permission denied, একটি port আগে থেকেই ব্যবহৃত, তার config-এ একটি syntax error) সঠিক সময়সহ। আগে লগ পড়লে একটি অন্ধ অনুমান একটি লক্ষ্যভেদী সমাধানে বদলায়।') },
        { note: l('Logs are a flight recorder for your system. When something goes wrong you do not have to reconstruct events from memory — you replay the recording and see exactly what happened, in what order, and at what time.', 'লগ আপনার সিস্টেমের একটি ফ্লাইট রেকর্ডার। কিছু ভুল হলে স্মৃতি থেকে ঘটনা পুনর্গঠন করতে হয় না—আপনি রেকর্ডিং রিপ্লে করে ঠিক কী ঘটল, কোন ক্রমে, ও কখন দেখেন।'), kind: 'tip' },
      ],
    },
    {
      h: l('A troubleshooting workflow', 'একটি ট্রাবলশুটিং কর্মপ্রবাহ'),
      blocks: [
        { steps: [
          l('Ask systemd what state the service is in with systemctl status — it shows whether it is running or failed and prints the last few log lines.', 'systemctl status দিয়ে systemd-কে জিজ্ঞাসা করুন সার্ভিসটি কোন অবস্থায়—এটি দেখায় চলছে না ব্যর্থ ও শেষ কয়েকটি লগ লাইন ছাপে।'),
          l('Read that service’s full recent logs with journalctl -u <name> to see the actual error message.', 'সেই সার্ভিসের পূর্ণ সাম্প্রতিক লগ journalctl -u <name> দিয়ে পড়ে আসল এরর বার্তা দেখুন।'),
          l('If you need to watch it happen, follow the logs live with -f while you reproduce the problem.', 'ঘটতে দেখতে চাইলে সমস্যা পুনরায় তৈরির সময় -f দিয়ে লগ live follow করুন।'),
          l('For hardware, driver, or boot issues, check the kernel messages with dmesg.', 'হার্ডওয়্যার, driver বা বুট সমস্যায় dmesg দিয়ে kernel বার্তা দেখুন।'),
          l('Grep the classic text logs under /var/log for the error text and its timestamp to pin down when it started.', 'কখন শুরু হলো ঠিক করতে /var/log-এর ক্লাসিক টেক্সট লগে এরর টেক্সট ও তার টাইমস্ট্যাম্প grep করুন।'),
        ] },
        { code: `# 1. A service won't start — ask systemd for its state
systemctl status nginx
#  Active: failed (Result: exit-code)
#  nginx: [emerg] bind() to 0.0.0.0:80 failed (98: Address already in use)

# 2. Read the service's full recent logs
journalctl -u nginx --since "10 min ago"

# 3. Follow the logs live while you reproduce the issue
journalctl -u nginx -f

# 4. Hardware or boot problem? Check the kernel ring buffer
dmesg --level=err,warn | tail -20

# 5. Grep the text logs for an error and its timestamp
sudo grep -i "error" /var/log/syslog | tail -20`, caption: l('Here the very first command already reveals the cause: port 80 is "Address already in use". The fix is to find and stop whatever is holding the port — no guessing needed.', 'এখানে প্রথম কমান্ডই কারণ প্রকাশ করে: port 80 "Address already in use"। সমাধান হলো port ধরে রাখা জিনিসটি খুঁজে থামানো—কোনো অনুমান লাগে না।') },
      ],
    },
    {
      h: l('Where the logs live', 'লগ কোথায় থাকে'),
      blocks: [
        { table: {
          head: [l('You want', 'যা চান'), l('Where to look', 'কোথায় দেখবেন')],
          rows: [
            [l('Logs for one service', 'একটি সার্ভিসের লগ'), l('journalctl -u <name>', 'journalctl -u <name>')],
            [l('Everything since last boot', 'শেষ বুটের পর সব'), l('journalctl -b', 'journalctl -b')],
            [l('General system log', 'সাধারণ সিস্টেম লগ'), l('/var/log/syslog', '/var/log/syslog')],
            [l('Login, sudo, and SSH attempts', 'login, sudo ও SSH চেষ্টা'), l('/var/log/auth.log', '/var/log/auth.log')],
            [l('Kernel & hardware messages', 'kernel ও হার্ডওয়্যার বার্তা'), l('dmesg  (or journalctl -k)', 'dmesg  (বা journalctl -k)')],
          ],
        } },
      ],
    },
    {
      h: l('Reading journalctl effectively', 'কার্যকরভাবে journalctl পড়া'),
      blocks: [
        { p: l('journalctl is the front door to logs on any modern systemd-based Linux, and a few flags make it far more powerful than scrolling endlessly. -u limits output to one service. -f follows the log live, printing new lines as they appear — ideal while you trigger the bug. -b shows only this boot, so you are not distracted by last week’s messages. -p filters by priority, so -p err hides the routine chatter and shows only errors and worse. And --since / --until narrow the window to the exact time range you care about.', 'journalctl হলো যেকোনো আধুনিক systemd-ভিত্তিক Linux-এ লগের সদর দরজা, আর কয়েকটি ফ্ল্যাগ একে অন্তহীন স্ক্রল করার চেয়ে অনেক শক্তিশালী করে। -u আউটপুট এক সার্ভিসে সীমিত করে। -f লগ live follow করে, নতুন লাইন আসামাত্র ছাপে—বাগ ট্রিগার করার সময় আদর্শ। -b শুধু এই বুট দেখায়, তাই গত সপ্তাহের বার্তায় বিভ্রান্ত হন না। -p priority দিয়ে ফিল্টার করে, তাই -p err রুটিন বকবক লুকিয়ে শুধু error ও তার চেয়ে খারাপ দেখায়। আর --since / --until আপনার দরকারি ঠিক সময়-পরিসরে জানালা সরু করে।') },
        { code: `journalctl -u ssh -f          # follow one service live
journalctl -b                 # only messages since the last boot
journalctl -p err             # only priority "error" and worse
journalctl -k                 # kernel messages (like dmesg)
journalctl --since "2026-07-09 09:00" --until "2026-07-09 10:00"`, caption: l('Combine flags freely: journalctl -u nginx -p err --since "1 hour ago" shows only nginx errors from the last hour — a precise slice instead of a wall of text.', 'ফ্ল্যাগ অবাধে মেশান: journalctl -u nginx -p err --since "1 hour ago" শুধু গত এক ঘণ্টার nginx error দেখায়—টেক্সটের দেয়ালের বদলে একটি নিখুঁত অংশ।') },
      ],
    },
    {
      h: l('When and where to use it', 'কখন ও কোথায় ব্যবহার করবেন'),
      blocks: [
        { p: l('Reach for the logs as your very first step whenever something misbehaves, before changing a single setting. A service that failed, a request returning 500, a machine that rebooted unexpectedly, a disk or network that dropped out — every one of these leaves a trail. The discipline that separates confident operators from flailing ones is simple: read the error first, form a hypothesis from what it actually says, then act. Nine times out of ten the log names the failing component and even the fix.', 'কিছু বিগড়ালেই একটি সেটিং বদলানোর আগে প্রথম পদক্ষেপ হিসেবে লগে যান। একটি ব্যর্থ সার্ভিস, 500 ফেরত দেওয়া একটি request, অপ্রত্যাশিতভাবে reboot হওয়া একটি মেশিন, বাদ পড়া একটি ডিস্ক বা নেটওয়ার্ক—প্রতিটি একটি ছাপ রেখে যায়। আত্মবিশ্বাসী অপারেটরকে হাতড়ানো অপারেটর থেকে যা আলাদা করে তা সহজ: আগে এরর পড়ুন, তা আসলে যা বলে তা থেকে একটি অনুমান গড়ুন, তারপর কাজ করুন। দশবারের নয়বার লগ ব্যর্থ উপাদানের নাম, এমনকি সমাধানও বলে।') },
        { p: l('On a busy system the challenge is not too little information but too much — the real signal is buried in routine noise. That is where filtering earns its keep: narrow by service with -u, by time with --since, by severity with -p err, and search the text logs with grep -i for the keyword you expect. When you finally find the error line, note its exact timestamp and look at what happened just before it, because the true cause often precedes the visible symptom by a few lines. And if a disk is full or logs are enormous, remember that log files themselves can be the problem you are hunting.', 'একটি ব্যস্ত সিস্টেমে চ্যালেঞ্জ খুব কম তথ্য নয় বরং খুব বেশি—আসল সংকেত রুটিন শব্দে চাপা পড়ে। এখানেই ফিল্টারিং কাজে আসে: -u দিয়ে সার্ভিসে, --since দিয়ে সময়ে, -p err দিয়ে তীব্রতায় সরু করুন, ও প্রত্যাশিত keyword-এ grep -i দিয়ে টেক্সট লগ খুঁজুন। অবশেষে এরর লাইন পেলে তার ঠিক টাইমস্ট্যাম্প নোট করুন ও তার ঠিক আগে কী ঘটল দেখুন, কারণ আসল কারণ প্রায়ই দৃশ্যমান লক্ষণের কয়েক লাইন আগে থাকে। আর একটি ডিস্ক পূর্ণ বা লগ বিশাল হলে মনে রাখুন লগ ফাইল নিজেই আপনার খোঁজা সমস্যা হতে পারে।') },
      ],
    },
    {
      h: l('Common mistakes', 'সাধারণ ভুল'),
      blocks: [
        { list: [
          l('Guessing at a fix without ever reading the logs, which usually name the exact failing component and reason.', 'কখনো লগ না পড়ে অনুমানে ঠিক করা, যা সাধারণত ঠিক ব্যর্থ উপাদান ও কারণের নাম বলে।'),
          l('Reading a mountain of log output unfiltered, instead of narrowing by service (-u), time (--since), or priority (-p).', 'সার্ভিস (-u), সময় (--since) বা priority (-p) দিয়ে সরু না করে একটি পাহাড় লগ আউটপুট ফিল্টার ছাড়া পড়া।'),
          l('Ignoring the timestamp — the fix depends on knowing when the error started and what came right before it.', 'টাইমস্ট্যাম্প উপেক্ষা করা—সমাধান নির্ভর করে এরর কখন শুরু হলো ও তার ঠিক আগে কী এলো জানার ওপর।'),
          l('Restarting or changing things at random, sometimes hiding the evidence and making the true cause harder to find.', 'এলোমেলোভাবে রিস্টার্ট বা জিনিস বদলানো, কখনো প্রমাণ লুকিয়ে আসল কারণ খোঁজা কঠিন করা।'),
        ] },
      ],
    },
    {
      h: l('Remember in one line', 'এক লাইনে মনে রাখুন'),
      blocks: [
        { list: [
          l('When something breaks, read the logs first: journalctl for services, /var/log for text logs, dmesg for the kernel.', 'কিছু ভাঙলে আগে লগ পড়ুন: সার্ভিসে journalctl, টেক্সট লগে /var/log, kernel-এ dmesg।'),
          l('Start with systemctl status, then journalctl -u <name>; follow live with -f and filter with -p and --since.', 'systemctl status দিয়ে শুরু করুন, তারপর journalctl -u <name>; -f দিয়ে live follow ও -p ও --since দিয়ে ফিল্টার করুন।'),
          l('The log usually names the failing component — read the error and its timestamp before you change anything.', 'লগ সাধারণত ব্যর্থ উপাদানের নাম বলে—কিছু বদলানোর আগে এরর ও তার টাইমস্ট্যাম্প পড়ুন।'),
        ] },
      ],
    },
  ],
}
