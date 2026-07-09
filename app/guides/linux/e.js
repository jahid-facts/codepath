// Deep, bilingual (English / Bangla) teaching guides for the Linux course —
// Jobs & background, services with systemd, scheduling with cron, package
// managers, and environment variables & PATH. Shape mirrors app/course-guides.js
// and app/guides/git/a.js: each guide is an array of sections { h, blocks },
// rendered by GuideBlock in app/LearningApp.js. Block types: { p }, { list },
// { steps }, { table:{head,rows} }, { note, kind }, { code, caption }.
// Facts (definitions, analogies, commands, trade-offs, mistakes) come from
// app/courses/linux.js.

const l = (en, bn) => ({ en, bn })

export default {
  // ── lx-jobs · Jobs & background ───────────────────────────────────────────
  'lx-jobs': [
    {
      h: l('What are jobs and background processes?', 'জব ও ব্যাকগ্রাউন্ড প্রসেস কী?'),
      blocks: [
        { p: l('When you type a command in a terminal, the shell normally runs it in the foreground: it hands the terminal over to that command, and you cannot type anything else until the command finishes. That is fine for something quick like ls, but it is painful for a task that runs for minutes or hours — a big download, a backup script, a running server. Job control is the shell feature that solves this. A job is simply a command (or pipeline) that the shell is keeping track of, and the shell lets you push a job into the background so it keeps running while your terminal stays free for the next command.', 'টার্মিনালে একটি কমান্ড টাইপ করলে শেল সাধারণত সেটি foreground-এ চালায়: এটি টার্মিনালটি সেই কমান্ডের হাতে তুলে দেয়, আর কমান্ড শেষ না হওয়া পর্যন্ত আপনি আর কিছু টাইপ করতে পারেন না। ls-এর মতো দ্রুত কিছুর জন্য এটি ঠিক আছে, কিন্তু মিনিট বা ঘণ্টা ধরে চলা কাজের জন্য কষ্টকর—একটি বড় ডাউনলোড, একটি ব্যাকআপ স্ক্রিপ্ট, একটি চলমান সার্ভার। job control হলো শেলের সেই ফিচার যা এটি সমাধান করে। একটি job মানে শুধু একটি কমান্ড (বা pipeline) যা শেল হিসাব রাখছে, আর শেল আপনাকে একটি job background-এ পাঠাতে দেয় যাতে সেটি চলতে থাকে আর আপনার টার্মিনাল পরের কমান্ডের জন্য মুক্ত থাকে।') },
        { p: l('You put a command in the background by adding an ampersand (&) to the end of the line. The shell prints a job number in square brackets and a process id (PID), then immediately gives you a fresh prompt. From there you can list your jobs, pull one back to the foreground, or leave it running. The one catch, which we will return to, is that a plain background job is still tied to your terminal — close the terminal and, by default, the job is told to stop. The nohup command is how you cut that tie.', 'একটি কমান্ড background-এ পাঠাতে লাইনের শেষে একটি অ্যাম্পারস্যান্ড (&) যোগ করুন। শেল বর্গাকার বন্ধনীতে একটি job নম্বর ও একটি process id (PID) ছাপে, তারপর সঙ্গে সঙ্গে আপনাকে নতুন একটি prompt দেয়। সেখান থেকে আপনি job তালিকা করতে, একটিকে foreground-এ ফেরত আনতে, বা চলতে রাখতে পারেন। একটি ব্যাপার—যেটিতে আমরা ফিরব—তা হলো একটি সাধারণ background job এখনো আপনার টার্মিনালের সঙ্গে বাঁধা: টার্মিনাল বন্ধ করলে ডিফল্টভাবে job-টিকে থামতে বলা হয়। nohup কমান্ড দিয়ে সেই বাঁধন কাটা যায়।') },
        { note: l('Think of cooking. The foreground job is the pan you are actively stirring — it has your full attention. Putting a task on a back burner with & lets it simmer on its own while you keep cooking up front; jobs, fg, and bg let you check on it or swap it back to the front burner whenever you like.', 'রান্নার কথা ভাবুন। foreground job হলো সেই কড়াই যা আপনি সক্রিয়ভাবে নাড়ছেন—এতে আপনার পূর্ণ মনোযোগ। & দিয়ে একটি কাজ পেছনের চুলায় রাখলে সেটি নিজে নিজে সিদ্ধ হয় আর আপনি সামনে রান্না চালিয়ে যান; jobs, fg ও bg দিয়ে আপনি যখন খুশি তা দেখতে বা সামনের চুলায় ফিরিয়ে আনতে পারেন।'), kind: 'tip' },
      ],
    },
    {
      h: l('How job control works', 'job control কীভাবে কাজ করে'),
      blocks: [
        { steps: [
          l('Add & to the end of a command to start it in the background. The shell prints its job number, like [1], and its PID, and returns your prompt right away.', 'একটি কমান্ডের শেষে & যোগ করে background-এ শুরু করুন। শেল তার job নম্বর যেমন [1] ও তার PID ছাপে, এবং সঙ্গে সঙ্গে আপনার prompt ফেরত দেয়।'),
          l('Already started a command in the foreground? Press Ctrl+Z to suspend (pause) it. The shell stops the job and hands the terminal back to you.', 'একটি কমান্ড foreground-এ শুরু করে ফেলেছেন? Ctrl+Z চেপে সেটিকে suspend (থামান)। শেল job থামিয়ে টার্মিনাল আপনাকে ফেরত দেয়।'),
          l('Run bg to resume the suspended job in the background, or fg to resume it in the foreground.', 'suspend করা job-টিকে background-এ চালাতে bg চালান, বা foreground-এ ফেরাতে fg চালান।'),
          l('Type jobs at any time to list every job this shell is tracking, each with its number and current state (Running or Stopped).', 'যেকোনো সময় jobs টাইপ করে এই শেল যে সব job ট্র্যাক করছে তার তালিকা দেখুন, প্রতিটির নম্বর ও বর্তমান অবস্থা (Running বা Stopped) সহ।'),
          l('Refer to a specific job by number with a percent sign: fg %2 brings job 2 forward; bg %1 resumes job 1 in the background.', 'একটি নির্দিষ্ট job-কে শতকরা চিহ্ন দিয়ে নম্বরে নির্দেশ করুন: fg %2 job 2-কে সামনে আনে; bg %1 job 1-কে background-এ চালায়।'),
          l('To keep a job alive after you log out, launch it with nohup and & so a closing terminal cannot kill it.', 'লগআউটের পরও একটি job জীবিত রাখতে nohup ও & দিয়ে চালু করুন যাতে বন্ধ হওয়া টার্মিনাল একে মারতে না পারে।'),
        ] },
        { code: `# Start a long task in the background with &
sleep 300 &
[1] 48213                     # job [1], PID 48213 — prompt returns instantly

# Suspend a foreground program with Ctrl+Z, then push it to the background
ping example.com
# (press Ctrl+Z)
[2]+  Stopped     ping example.com
bg %2                         # resume job 2 in the background

jobs                          # list this shell's jobs
[1]-  Running   sleep 300 &
[2]+  Running   ping example.com &

fg %1                         # bring job 1 back to the foreground

# Survive logout: nohup detaches the job from the terminal
nohup ./backup.sh > backup.log 2>&1 &
[3] 48260                     # keeps running even after you close the shell`, caption: l('& backgrounds a command, Ctrl+Z suspends the foreground one, and jobs/fg/bg move work between foreground and background. nohup is what lets a job outlive the terminal.', '& একটি কমান্ড background করে, Ctrl+Z foreground-এরটি suspend করে, আর jobs/fg/bg কাজকে foreground ও background-এর মধ্যে সরায়। nohup-ই একটি job-কে টার্মিনালের চেয়ে বেশি সময় বাঁচতে দেয়।') },
      ],
    },
    {
      h: l('Key commands', 'মূল কমান্ড'),
      blocks: [
        { table: {
          head: [l('Goal', 'লক্ষ্য'), l('Command', 'কমান্ড')],
          rows: [
            [l('Run a command in the background', 'কমান্ড background-এ চালান'), l('command &', 'command &')],
            [l('Suspend the foreground job', 'foreground job থামান'), l('Ctrl+Z', 'Ctrl+Z')],
            [l('List this shell’s jobs', 'এই শেলের job তালিকা'), l('jobs', 'jobs')],
            [l('Bring a job to the foreground', 'job foreground-এ আনুন'), l('fg %1', 'fg %1')],
            [l('Resume a job in the background', 'job background-এ চালান'), l('bg %1', 'bg %1')],
            [l('Keep a job running after logout', 'লগআউটের পরও job চালু রাখুন'), l('nohup command &', 'nohup command &')],
            [l('Detach a running job from the shell', 'চলমান job শেল থেকে আলাদা করুন'), l('disown %1', 'disown %1')],
          ],
        } },
        { note: l('The %n syntax names a job, not a process. %1 means "the shell job numbered 1", which is different from a PID. Use jobs to see the numbers and ps or top to see PIDs.', '%n সিনট্যাক্স একটি job-কে নাম দেয়, প্রসেস নয়। %1 মানে "1 নম্বর শেল job", যা একটি PID থেকে আলাদা। নম্বর দেখতে jobs, আর PID দেখতে ps বা top ব্যবহার করুন।'), kind: 'tip' },
      ],
    },
    {
      h: l('Why background jobs die — and how nohup saves them', 'কেন background job মারা যায়—আর nohup কীভাবে বাঁচায়'),
      blocks: [
        { p: l('A plain background job started with & is still a child of your shell, and it is attached to your terminal session. When that session ends — you close the terminal window, or your SSH connection drops — the shell sends a "hang-up" signal (SIGHUP) to its jobs, and most programs stop when they receive it. This is why a long download you started with & can vanish the moment your laptop sleeps and the SSH link breaks. The job did nothing wrong; it was simply told to hang up along with the terminal.', '& দিয়ে শুরু করা একটি সাধারণ background job এখনো আপনার শেলের সন্তান, এবং এটি আপনার টার্মিনাল সেশনের সঙ্গে যুক্ত। সেই সেশন শেষ হলে—আপনি টার্মিনাল উইন্ডো বন্ধ করলে, বা আপনার SSH সংযোগ গেলে—শেল তার job-গুলোতে একটি "hang-up" সিগন্যাল (SIGHUP) পাঠায়, আর বেশিরভাগ প্রোগ্রাম তা পেলে থেমে যায়। এ কারণেই & দিয়ে শুরু করা একটি দীর্ঘ ডাউনলোড আপনার ল্যাপটপ ঘুমিয়ে গিয়ে SSH লিঙ্ক ভাঙলেই উধাও হতে পারে। job কোনো ভুল করেনি; একে শুধু টার্মিনালের সঙ্গে hang up করতে বলা হয়েছিল।') },
        { p: l('nohup — short for "no hang-up" — starts a command so that it ignores SIGHUP, so a closing terminal cannot kill it. Because the terminal is going away, you also redirect its output to a file (nohup does this automatically to nohup.out if you do not). If a job is already running and you forgot nohup, disown removes it from the shell’s job table so the shell will not signal it on exit. For anything that must truly survive across logins, though, a systemd service is the sturdier answer.', 'nohup—"no hang-up"-এর সংক্ষিপ্ত—একটি কমান্ড এমনভাবে শুরু করে যাতে সেটি SIGHUP উপেক্ষা করে, তাই বন্ধ হওয়া টার্মিনাল একে মারতে পারে না। টার্মিনাল চলে যাচ্ছে বলে আপনি এর output-ও একটি ফাইলে রিডাইরেক্ট করেন (আপনি না করলে nohup নিজে nohup.out-এ করে দেয়)। কোনো job আগেই চলছে ও nohup ভুলে গেছেন? disown সেটিকে শেলের job টেবিল থেকে সরায় যাতে বেরোনোর সময় শেল একে সিগন্যাল না পাঠায়। তবে যা সত্যিই লগইনের পরও টিকতে হবে, তার জন্য একটি systemd সার্ভিসই বেশি মজবুত উত্তর।') },
        { note: l('If you start a long job over SSH without nohup and your connection drops, the job is usually killed. Reach for nohup, disown, or a terminal multiplexer like tmux before you walk away.', 'nohup ছাড়া SSH-এ দীর্ঘ job শুরু করে সংযোগ ভাঙলে job সাধারণত মারা যায়। চলে যাওয়ার আগে nohup, disown, বা tmux-এর মতো একটি টার্মিনাল মাল্টিপ্লেক্সার ব্যবহার করুন।'), kind: 'warn' },
      ],
    },
    {
      h: l('When and where to use it', 'কখন ও কোথায় ব্যবহার করবেন'),
      blocks: [
        { p: l('Use the background (&) whenever a command will run long enough that waiting for it would waste your time: compiling a large project, running a test suite, downloading a big file, or starting a dev server you want to keep talking to. Suspend-and-background (Ctrl+Z then bg) is the rescue move for the common case where you started something in the foreground and only then realised it will take a while — you do not have to cancel and retype it. Use fg to reconnect to a background job when you need to interact with it, for example to answer a prompt or read its live output.', 'background (&) ব্যবহার করুন যখনই একটি কমান্ড এত দীর্ঘ চলবে যে অপেক্ষা করা সময়ের অপচয়: একটি বড় প্রকল্প compile করা, একটি test suite চালানো, একটি বড় ফাইল ডাউনলোড, বা একটি dev server চালু রাখা যার সঙ্গে কথা বলতে চান। suspend-করে-background (Ctrl+Z তারপর bg) হলো সেই সাধারণ ক্ষেত্রের উদ্ধার-কৌশল যেখানে আপনি foreground-এ কিছু শুরু করে তবেই বুঝলেন সময় লাগবে—বাতিল করে আবার টাইপ করতে হয় না। background job-এর সঙ্গে যোগাযোগ দরকার হলে fg দিয়ে আবার যুক্ত হন, যেমন একটি prompt-এর উত্তর দিতে বা তার live output পড়তে।') },
        { p: l('Reach for nohup, disown, or tmux/screen when the job must outlive your session — a remote server task you kick off over SSH and then log out from. But once a task needs to run all the time, restart itself after a crash, or start on boot, job control is the wrong tool: that is exactly what systemd services exist for, and moving such work into a proper service is much more reliable than a detached background job.', 'nohup, disown, বা tmux/screen ব্যবহার করুন যখন job-কে আপনার সেশনের চেয়ে বেশি সময় বাঁচতে হবে—একটি রিমোট সার্ভার কাজ যা SSH-এ শুরু করে তারপর লগআউট করেন। তবে কোনো কাজ যখন সবসময় চলতে হবে, ক্র্যাশের পর নিজে রিস্টার্ট হতে হবে, বা বুটে চালু হতে হবে, তখন job control ভুল টুল: সেটাই systemd সার্ভিসের জন্য, আর এমন কাজ একটি সঠিক সার্ভিসে সরানো একটি detached background job-এর চেয়ে অনেক নির্ভরযোগ্য।') },
      ],
    },
    {
      h: l('Common mistakes', 'সাধারণ ভুল'),
      blocks: [
        { list: [
          l('Starting a long job in the background with just & over SSH, then losing it when the session drops because you did not use nohup or disown.', 'SSH-এ শুধু & দিয়ে একটি দীর্ঘ job background-এ শুরু করা, তারপর সেশন গেলে তা হারানো কারণ nohup বা disown ব্যবহার করেননি।'),
          l('Forgetting that jobs and %1 are per-shell. Open a new terminal and jobs is empty — that other shell cannot see the first shell’s jobs.', 'ভুলে যাওয়া যে jobs ও %1 প্রতি-শেল। নতুন টার্মিনাল খুললে jobs খালি—সেই অন্য শেল প্রথম শেলের job দেখতে পায় না।'),
          l('Backgrounding a program that still writes to the terminal, so its output keeps interrupting your prompt. Redirect output to a file with > log.txt 2>&1.', 'এমন একটি প্রোগ্রাম background করা যা এখনো টার্মিনালে লেখে, ফলে তার output বারবার আপনার prompt-এ বাধা দেয়। > log.txt 2>&1 দিয়ে output ফাইলে রিডাইরেক্ট করুন।'),
          l('Using a detached background job for something that really needs to always run and auto-restart — that job is fragile; use a systemd service instead.', 'যা সত্যিই সবসময় চলা ও নিজে রিস্টার্ট হওয়া দরকার তার জন্য একটি detached background job ব্যবহার—সেই job ভঙ্গুর; বদলে একটি systemd সার্ভিস নিন।'),
        ] },
      ],
    },
    {
      h: l('Remember in one line', 'এক লাইনে মনে রাখুন'),
      blocks: [
        { list: [
          l('Append & to run in the background; Ctrl+Z suspends, and jobs, fg, bg move work between foreground and background.', 'background-এ চালাতে & যোগ করুন; Ctrl+Z থামায়, আর jobs, fg, bg কাজকে foreground ও background-এ সরায়।'),
          l('A plain background job dies when the shell closes — use nohup (or disown) to keep it alive.', 'একটি সাধারণ background job শেল বন্ধ হলে মারা যায়—জীবিত রাখতে nohup (বা disown) ব্যবহার করুন।'),
          l('For work that must always run and restart on its own, use a systemd service, not job control.', 'যে কাজ সবসময় চলতে ও নিজে রিস্টার্ট হতে হবে, তার জন্য job control নয়, একটি systemd সার্ভিস নিন।'),
        ] },
      ],
    },
  ],

  // ── lx-systemd · Services with systemd ────────────────────────────────────
  'lx-systemd': [
    {
      h: l('What is systemd?', 'systemd কী?'),
      blocks: [
        { p: l('systemd is the software that boots most modern Linux systems and then manages their long-running services. A service (also called a daemon) is a program meant to run continuously in the background rather than being launched by hand — a web server like nginx, a database like postgresql, the SSH server sshd. systemd starts these at boot in the right order, keeps track of whether each one is healthy, restarts them if they crash, and collects their logs. You talk to it mainly through one command, systemctl, and read service logs through another, journalctl.', 'systemd হলো সেই সফটওয়্যার যা বেশিরভাগ আধুনিক Linux সিস্টেম boot করে ও তারপর তাদের দীর্ঘ-চলমান সার্ভিস সামলায়। একটি service (daemon-ও বলে) হলো এমন একটি প্রোগ্রাম যা হাতে চালানোর বদলে background-এ একটানা চলার জন্য তৈরি—nginx-এর মতো ওয়েব সার্ভার, postgresql-এর মতো ডেটাবেস, SSH সার্ভার sshd। systemd এগুলো boot-এ সঠিক ক্রমে চালু করে, প্রতিটি সুস্থ কিনা হিসাব রাখে, ক্র্যাশ করলে রিস্টার্ট করে, ও তাদের লগ জমা করে। আপনি মূলত একটি কমান্ড systemctl দিয়ে এর সঙ্গে কথা বলেন, আর সার্ভিস লগ পড়েন আরেকটি journalctl দিয়ে।') },
        { p: l('The problem systemd solves is consistency. Before it, every distribution had its own pile of shell scripts to start and stop services, and there was no standard way to say "start this on boot" or "show me why it failed". systemd gives every service the same lifecycle and the same handful of commands, so the skills you learn on one Linux machine transfer to nearly all of them. Each service is described by a small unit file (for example nginx.service) that tells systemd how to start it, what it depends on, and whether to restart it on failure.', 'systemd যে সমস্যা সমাধান করে তা হলো সামঞ্জস্য। এর আগে প্রতিটি ডিস্ট্রিবিউশনের সার্ভিস চালু ও বন্ধ করার নিজস্ব শেল স্ক্রিপ্টের স্তূপ ছিল, আর "এটি boot-এ চালু করো" বা "কেন ব্যর্থ হলো দেখাও" বলার কোনো প্রমিত উপায় ছিল না। systemd প্রতিটি সার্ভিসকে একই lifecycle ও একই কয়েকটি কমান্ড দেয়, তাই একটি Linux মেশিনে শেখা দক্ষতা প্রায় সব মেশিনে কাজে লাগে। প্রতিটি সার্ভিস একটি ছোট unit file (যেমন nginx.service) দিয়ে বর্ণিত, যা systemd-কে বলে কীভাবে চালু করতে হবে, কীসের উপর নির্ভর করে, ও ব্যর্থ হলে রিস্টার্ট করবে কিনা।') },
        { note: l('Think of systemd as a building manager. Every morning it turns the lifts and lights on in the right order (boot), it restarts a lift that breaks down (auto-restart on failure), and it keeps a logbook of what happened and when (the journal you read with journalctl).', 'systemd-কে একজন ভবন ম্যানেজার ভাবুন। প্রতিদিন সকালে এটি সঠিক ক্রমে লিফট ও বাতি চালু করে (boot), একটি ভাঙা লিফট রিস্টার্ট করে (ব্যর্থতায় auto-restart), আর কী ও কখন ঘটল তার একটি লগবই রাখে (journalctl দিয়ে পড়া journal)।'), kind: 'tip' },
      ],
    },
    {
      h: l('How systemd manages a service', 'systemd কীভাবে একটি সার্ভিস সামলায়'),
      blocks: [
        { steps: [
          l('Start the service now with systemctl start <name>. This launches it for the current session only; it does not decide anything about the next boot.', 'systemctl start <name> দিয়ে এখনই সার্ভিস চালু করুন। এটি শুধু বর্তমান সেশনের জন্য চালু করে; পরের boot নিয়ে কিছু ঠিক করে না।'),
          l('Check it with systemctl status <name>. Look for "active (running)" in green, plus the PID and the last few log lines.', 'systemctl status <name> দিয়ে যাচাই করুন। সবুজে "active (running)", সঙ্গে PID ও শেষ কয়েকটি লগ লাইন খুঁজুন।'),
          l('Make it permanent with systemctl enable <name>. This creates a symlink so systemd starts the service automatically on every boot.', 'systemctl enable <name> দিয়ে স্থায়ী করুন। এটি একটি symlink বানায় যাতে systemd প্রতিটি boot-এ সার্ভিসটি স্বয়ংক্রিয়ভাবে চালু করে।'),
          l('Read its logs with journalctl -u <name>. Add -f to follow new lines live, like tail -f, while you reproduce a problem.', 'journalctl -u <name> দিয়ে এর লগ পড়ুন। একটি সমস্যা পুনরায় ঘটানোর সময় নতুন লাইন live দেখতে -f যোগ করুন, tail -f-এর মতো।'),
          l('Stop or restart it with systemctl stop <name> or systemctl restart <name> when you change its configuration.', 'কনফিগ বদলালে systemctl stop <name> বা systemctl restart <name> দিয়ে থামান বা রিস্টার্ট করুন।'),
        ] },
        { code: `# Start the nginx web server right now (this boot only)
sudo systemctl start nginx

# Is it running? Shows state, PID, and recent log lines
systemctl status nginx
# ● nginx.service - A high performance web server
#      Active: active (running) since Thu 2026-07-09 10:12:04 UTC
#    Main PID: 1042 (nginx)

# Make it start automatically on every future boot
sudo systemctl enable nginx
# Created symlink /etc/systemd/system/multi-user.target.wants/nginx.service

# Read this service's own logs; -f follows new lines live
journalctl -u nginx -f

# Do both at once: start now AND enable at boot
sudo systemctl enable --now nginx`, caption: l('start affects only this boot; enable decides future boots. They are independent, and enable --now does both in one step.', 'start শুধু এই boot-কে প্রভাবিত করে; enable ভবিষ্যতের boot ঠিক করে। এরা স্বাধীন, আর enable --now এক ধাপে দুটোই করে।') },
      ],
    },
    {
      h: l('start vs enable — the distinction that trips everyone', 'start বনাম enable—যে পার্থক্য সবাইকে বিভ্রান্ত করে'),
      blocks: [
        { p: l('These two verbs sound similar but do completely different things, and mixing them up is the single most common systemd mistake. start runs the service right now, in the current boot, and says nothing about the future. enable does not start anything now; it registers the service to be launched automatically on the next boot. A service can be running but not enabled (it will be gone after a reboot), or enabled but not running (it will come up next boot but is off right now). Almost always you want both, which is why systemctl enable --now exists.', 'এই দুটি ক্রিয়া শুনতে একরকম কিন্তু সম্পূর্ণ ভিন্ন কাজ করে, আর এদের গুলিয়ে ফেলা systemd-এর সবচেয়ে সাধারণ ভুল। start সার্ভিসটি এখনই, বর্তমান boot-এ চালায়, ভবিষ্যৎ নিয়ে কিছু বলে না। enable এখন কিছু চালু করে না; এটি সার্ভিসটিকে পরের boot-এ স্বয়ংক্রিয়ভাবে চালু হওয়ার জন্য নিবন্ধন করে। একটি সার্ভিস running কিন্তু enabled নয় হতে পারে (রিবুটের পর চলে যাবে), বা enabled কিন্তু running নয় (পরের boot-এ উঠবে কিন্তু এখন বন্ধ)। প্রায় সবসময় আপনি দুটোই চান, এ কারণেই systemctl enable --now আছে।') },
        { table: {
          head: [l('Command', 'কমান্ড'), l('Right now?', 'এখনই?'), l('After reboot?', 'রিবুটের পর?')],
          rows: [
            [l('systemctl start x', 'systemctl start x'), l('Starts it now', 'এখন চালু করে'), l('No — it will not come back', 'না—ফিরে আসবে না')],
            [l('systemctl enable x', 'systemctl enable x'), l('No — stays as-is now', 'না—এখন যেমন আছে তেমন'), l('Yes — starts on boot', 'হ্যাঁ—boot-এ চালু হয়')],
            [l('systemctl enable --now x', 'systemctl enable --now x'), l('Starts it now', 'এখন চালু করে'), l('Yes — starts on boot', 'হ্যাঁ—boot-এ চালু হয়')],
          ],
        } },
        { note: l('Symmetry helps: stop is the opposite of start (stop it now), and disable is the opposite of enable (do not start it at boot). Stopping a service does not disable it, and disabling it does not stop it.', 'সমতা মনে রাখুন: stop হলো start-এর উল্টো (এখন থামাও), আর disable হলো enable-এর উল্টো (boot-এ চালু কোরো না)। একটি সার্ভিস stop করলে তা disable হয় না, আর disable করলে তা stop হয় না।'), kind: 'tip' },
      ],
    },
    {
      h: l('Key commands', 'মূল কমান্ড'),
      blocks: [
        { table: {
          head: [l('Goal', 'লক্ষ্য'), l('Command', 'কমান্ড')],
          rows: [
            [l('Start a service now', 'সার্ভিস এখন চালু'), l('systemctl start x', 'systemctl start x')],
            [l('Stop a service now', 'সার্ভিস এখন বন্ধ'), l('systemctl stop x', 'systemctl stop x')],
            [l('Enable at boot', 'বুটে চালু'), l('systemctl enable x', 'systemctl enable x')],
            [l('Check status', 'স্ট্যাটাস দেখুন'), l('systemctl status x', 'systemctl status x')],
            [l('Restart after a config change', 'কনফিগ বদলের পর রিস্টার্ট'), l('systemctl restart x', 'systemctl restart x')],
            [l('View a service’s logs', 'সার্ভিসের লগ দেখুন'), l('journalctl -u x', 'journalctl -u x')],
          ],
        } },
        { note: l('Most systemctl actions change system state and so need root — prefix them with sudo. Read-only commands like systemctl status and journalctl usually work without it.', 'বেশিরভাগ systemctl অ্যাকশন সিস্টেম স্টেট বদলায় তাই root লাগে—এদের আগে sudo দিন। systemctl status ও journalctl-এর মতো read-only কমান্ড সাধারণত sudo ছাড়াই চলে।'), kind: 'tip' },
      ],
    },
    {
      h: l('When and where to use it', 'কখন ও কোথায় ব্যবহার করবেন'),
      blocks: [
        { p: l('Use systemd whenever a program needs to run as a service: a web or API server, a database, a message broker, a background worker, or your own long-running script on a server. The moment you find yourself keeping something alive with nohup and hoping it does not die, that is the signal to write a small unit file and let systemd own it instead — you gain automatic restart on crash, automatic start on boot, ordering relative to other services, and a searchable log. On a personal laptop you mostly use systemctl to control services other software installed (Docker, a database, a VPN); on a server you also write your own unit files for your applications.', 'systemd ব্যবহার করুন যখনই একটি প্রোগ্রামকে সার্ভিস হিসেবে চলতে হবে: একটি ওয়েব বা API সার্ভার, একটি ডেটাবেস, একটি message broker, একটি background worker, বা সার্ভারে আপনার নিজের দীর্ঘ-চলমান স্ক্রিপ্ট। যখনই দেখবেন nohup দিয়ে কিছু জীবিত রেখে আশা করছেন সেটি মরবে না, সেটাই সংকেত—একটি ছোট unit file লিখে systemd-কে তার মালিকানা দিন: ক্র্যাশে auto-restart, boot-এ auto-start, অন্য সার্ভিসের সাপেক্ষে ক্রম, ও একটি খোঁজযোগ্য লগ পাবেন। ব্যক্তিগত ল্যাপটপে আপনি বেশিরভাগ systemctl দিয়ে অন্য সফটওয়্যারের ইনস্টল করা সার্ভিস (Docker, একটি ডেটাবেস, একটি VPN) নিয়ন্ত্রণ করেন; সার্ভারে নিজের অ্যাপের জন্য নিজের unit file-ও লেখেন।') },
        { p: l('Use journalctl every time a service misbehaves. The pattern is simple: systemctl status <name> tells you if it is running and shows the last handful of log lines, and journalctl -u <name> shows the full history. When a service refuses to start, this is where the actual error message lives — a missing file, a port already in use, a bad config line. Reading it turns guessing into a two-minute fix.', 'একটি সার্ভিস বিগড়ালে প্রতিবার journalctl ব্যবহার করুন। ধরনটি সহজ: systemctl status <name> বলে এটি চলছে কিনা ও শেষ কয়েকটি লগ লাইন দেখায়, আর journalctl -u <name> পূর্ণ ইতিহাস দেখায়। একটি সার্ভিস চালু হতে অস্বীকার করলে, আসল এরর বার্তা এখানেই থাকে—একটি অনুপস্থিত ফাইল, ইতিমধ্যে ব্যবহৃত একটি port, একটি খারাপ কনফিগ লাইন। এটি পড়া অনুমানকে দুই-মিনিটের সমাধানে বদলে দেয়।') },
      ],
    },
    {
      h: l('Common mistakes', 'সাধারণ ভুল'),
      blocks: [
        { list: [
          l('Starting a service manually but forgetting to enable it, so it works today and mysteriously does not come back after a reboot.', 'একটি সার্ভিস ম্যানুয়ালি চালু করে enable করতে ভুলে যাওয়া, ফলে আজ কাজ করে কিন্তু রিবুটের পর রহস্যজনকভাবে ফিরে আসে না।'),
          l('Editing a service’s config file and expecting the change to take effect without a systemctl restart (or reload).', 'একটি সার্ভিসের কনফিগ ফাইল এডিট করে systemctl restart (বা reload) ছাড়াই পরিবর্তন কার্যকর হবে আশা করা।'),
          l('Changing a unit file but not running systemctl daemon-reload, so systemd keeps using the old definition.', 'একটি unit file বদলে systemctl daemon-reload না চালানো, ফলে systemd পুরনো সংজ্ঞাই ব্যবহার করতে থাকে।'),
          l('Guessing why a service failed instead of reading systemctl status and journalctl -u, which usually state the exact cause.', 'systemctl status ও journalctl -u না পড়ে সার্ভিস কেন ব্যর্থ হলো অনুমান করা, যেগুলো সাধারণত ঠিক কারণ বলে দেয়।'),
        ] },
      ],
    },
    {
      h: l('Remember in one line', 'এক লাইনে মনে রাখুন'),
      blocks: [
        { list: [
          l('systemd manages long-running services; systemctl start/stop/status/restart controls them and journalctl -u reads their logs.', 'systemd দীর্ঘ-চলমান সার্ভিস সামলায়; systemctl start/stop/status/restart এদের নিয়ন্ত্রণ করে ও journalctl -u এদের লগ পড়ে।'),
          l('start runs it now; enable makes it start on boot — you almost always want both (enable --now).', 'start এখন চালায়; enable boot-এ চালু করে—আপনি প্রায় সবসময় দুটোই চান (enable --now)।'),
          l('When a service fails, do not guess — read journalctl -u <name> for the real error.', 'একটি সার্ভিস ব্যর্থ হলে অনুমান নয়—আসল এররের জন্য journalctl -u <name> পড়ুন।'),
        ] },
      ],
    },
  ],

  // ── lx-cron · Scheduling with cron ────────────────────────────────────────
  'lx-cron': [
    {
      h: l('What is cron?', 'cron কী?'),
      blocks: [
        { p: l('cron is the classic Linux tool for running commands automatically on a schedule. A background service called the cron daemon (crond) wakes up every minute, checks a set of tables called crontabs, and runs any command whose scheduled time has arrived. You never launch these tasks by hand; you write the schedule once and cron takes care of running it forever — every night at 2am, every Monday morning, every 15 minutes, whatever you specify. Each user has their own crontab, and there are system-wide ones too.', 'cron হলো একটি শিডিউলে স্বয়ংক্রিয়ভাবে কমান্ড চালানোর ক্লাসিক Linux টুল। cron daemon (crond) নামের একটি background সার্ভিস প্রতি মিনিটে জেগে ওঠে, crontab নামের কিছু টেবিল যাচাই করে, ও যে কমান্ডের নির্ধারিত সময় এসেছে তা চালায়। আপনি এই কাজগুলো কখনো হাতে চালান না; একবার শিডিউল লেখেন আর cron চিরকাল তা চালানোর দায়িত্ব নেয়—প্রতি রাত ২টায়, প্রতি সোমবার সকালে, প্রতি ১৫ মিনিটে, আপনি যা বলবেন। প্রতিটি user-এর নিজের crontab আছে, আর সিস্টেম-ব্যাপী crontab-ও আছে।') },
        { p: l('The problem cron solves is the boring but critical category of recurring work: backups, log rotation, sending a nightly report, clearing a cache, renewing a certificate, pulling in fresh data. A human will forget, sleep through 2am, or be on holiday; cron never does. You describe when in five simple time fields, then the command to run, and the machine does it reliably for as long as it is powered on.', 'cron যে সমস্যা সমাধান করে তা হলো নিয়মিত কাজের নীরস কিন্তু জরুরি শ্রেণি: ব্যাকআপ, log rotation, রাত্রিকালীন রিপোর্ট পাঠানো, একটি cache পরিষ্কার, একটি সার্টিফিকেট নবায়ন, তাজা ডেটা টানা। একজন মানুষ ভুলে যাবে, রাত ২টায় ঘুমিয়ে থাকবে, বা ছুটিতে থাকবে; cron কখনো তা করে না। আপনি পাঁচটি সরল সময় ফিল্ডে "কখন" বর্ণনা করেন, তারপর চালানোর কমান্ড, আর মেশিন যতক্ষণ চালু থাকে ততক্ষণ নির্ভরযোগ্যভাবে তা করে।') },
        { note: l('cron is an automatic alarm clock for tasks. Instead of "wake me at 7am" it says "every day at 2am, run the backup" — and unlike a person, it never oversleeps or forgets.', 'cron হলো কাজের জন্য একটি স্বয়ংক্রিয় অ্যালার্ম ঘড়ি। "সকাল ৭টায় জাগাও"-এর বদলে এটি বলে "প্রতিদিন রাত ২টায় ব্যাকআপ চালাও"—আর মানুষের মতো নয়, এটি কখনো বেশি ঘুমায় না বা ভোলে না।'), kind: 'tip' },
      ],
    },
    {
      h: l('How cron works', 'cron কীভাবে কাজ করে'),
      blocks: [
        { steps: [
          l('Open your personal crontab for editing with crontab -e. The first time, it asks which editor to use.', 'crontab -e দিয়ে আপনার ব্যক্তিগত crontab এডিট করতে খুলুন। প্রথমবার এটি জিজ্ঞেস করে কোন এডিটর ব্যবহার করবেন।'),
          l('Add one line per job: five time fields that say when, followed by the command to run.', 'প্রতি job-এ একটি লাইন যোগ করুন: কখন তা বলা পাঁচটি সময় ফিল্ড, তারপর চালানোর কমান্ড।'),
          l('Save and close the editor. cron validates the file and installs it; there is no separate "apply" step.', 'সেভ করে এডিটর বন্ধ করুন। cron ফাইলটি যাচাই করে ইনস্টল করে; আলাদা কোনো "apply" ধাপ নেই।'),
          l('The cron daemon checks the schedule every minute and runs each command at its appointed time, as your user.', 'cron daemon প্রতি মিনিটে শিডিউল যাচাই করে ও প্রতিটি কমান্ড তার নির্ধারিত সময়ে আপনার user হিসেবে চালায়।'),
          l('List what you have scheduled with crontab -l, and always test the command by hand first so cron runs something you know works.', 'crontab -l দিয়ে কী শিডিউল করেছেন দেখুন, এবং সবসময় আগে কমান্ডটি হাতে টেস্ট করুন যাতে cron এমন কিছু চালায় যা কাজ করে বলে আপনি জানেন।'),
        ] },
        { code: `# Edit your personal crontab
crontab -e

# Each line is: minute hour day-of-month month day-of-week  command
# min hour dom mon dow  command
   30   2   *   *   *   /home/ada/backup.sh          # every day at 02:30
   0    9   *   *   1   /home/ada/report.sh          # every Monday at 09:00
  */15  *   *   *   *   /usr/bin/php /var/www/ping.php # every 15 minutes
   0    0   1   *   *   /home/ada/monthly.sh         # 00:00 on the 1st

# List the jobs you have scheduled
crontab -l

# Log output so you can see what happened (cron does not print to a terminal)
   30   3   *   *   *   /home/ada/backup.sh >> /home/ada/backup.log 2>&1`, caption: l('Five time fields describe when; the rest of the line is the command. * means "every". Redirect output to a log file because cron has no terminal to print to.', 'পাঁচটি সময় ফিল্ড "কখন" বলে; লাইনের বাকিটা কমান্ড। * মানে "প্রতিটি"। output একটি লগ ফাইলে রিডাইরেক্ট করুন কারণ cron-এর ছাপার জন্য কোনো টার্মিনাল নেই।') },
      ],
    },
    {
      h: l('The five time fields', 'পাঁচটি সময় ফিল্ড'),
      blocks: [
        { p: l('Every cron line begins with five fields, always in the same order, that together answer "when should this run?" Each field can be a single number, a star (*) meaning "every value", a list like 1,15, a range like 1-5, or a step like */10 meaning "every 10". The command runs only when all five fields match the current time.', 'প্রতিটি cron লাইন শুরু হয় পাঁচটি ফিল্ড দিয়ে, সবসময় একই ক্রমে, যা একসঙ্গে উত্তর দেয় "এটি কখন চলবে?" প্রতিটি ফিল্ড হতে পারে একটি একক সংখ্যা, একটি star (*) মানে "প্রতিটি মান", 1,15-এর মতো একটি তালিকা, 1-5-এর মতো একটি পরিসর, বা */10-এর মতো একটি step মানে "প্রতি ১০"। পাঁচটি ফিল্ড বর্তমান সময়ের সঙ্গে মিললেই কেবল কমান্ড চলে।') },
        { table: {
          head: [l('Position', 'অবস্থান'), l('Field', 'ফিল্ড'), l('Range', 'পরিসর')],
          rows: [
            [l('1st', '১ম'), l('Minute', 'মিনিট'), l('0–59', '0–59')],
            [l('2nd', '২য়'), l('Hour (24-hour clock)', 'ঘণ্টা (২৪-ঘণ্টা)'), l('0–23', '0–23')],
            [l('3rd', '৩য়'), l('Day of month', 'মাসের দিন'), l('1–31', '1–31')],
            [l('4th', '৪র্থ'), l('Month', 'মাস'), l('1–12 (or Jan–Dec)', '1–12 (বা Jan–Dec)')],
            [l('5th', '৫ম'), l('Day of week', 'সপ্তাহের দিন'), l('0–7 (0 and 7 = Sunday)', '0–7 (0 ও 7 = রবিবার)')],
          ],
        } },
        { note: l('Read 30 2 * * * as "at minute 30 of hour 2, on every day, every month, every weekday" — that is 02:30 daily. If you ever get stuck, an online crontab explainer will translate a line into plain English.', '30 2 * * * পড়ুন "2 নম্বর ঘণ্টার 30 মিনিটে, প্রতিটি দিন, প্রতিটি মাস, প্রতিটি সপ্তাহের দিন"—অর্থাৎ প্রতিদিন 02:30। আটকে গেলে একটি অনলাইন crontab explainer একটি লাইনকে সরল ভাষায় অনুবাদ করে দেবে।'), kind: 'tip' },
      ],
    },
    {
      h: l('Key commands', 'মূল কমান্ড'),
      blocks: [
        { table: {
          head: [l('Goal', 'লক্ষ্য'), l('Command', 'কমান্ড')],
          rows: [
            [l('Edit your crontab', 'আপনার crontab এডিট করুন'), l('crontab -e', 'crontab -e')],
            [l('List your crontab', 'আপনার crontab দেখুন'), l('crontab -l', 'crontab -l')],
            [l('Remove your whole crontab', 'পুরো crontab মুছুন'), l('crontab -r', 'crontab -r')],
            [l('Edit another user’s crontab (root)', 'অন্য user-এর crontab এডিট (root)'), l('sudo crontab -u name -e', 'sudo crontab -u name -e')],
            [l('System-wide scheduled jobs', 'সিস্টেম-ব্যাপী শিডিউল job'), l('/etc/crontab and /etc/cron.d/', '/etc/crontab ও /etc/cron.d/')],
          ],
        } },
        { note: l('crontab -r deletes your entire crontab with no confirmation, and it sits right next to -e on the keyboard. Prefer crontab -e and delete the one line you mean to remove.', 'crontab -r কোনো নিশ্চিতকরণ ছাড়াই আপনার পুরো crontab মুছে দেয়, আর কীবোর্ডে এটি -e-এর ঠিক পাশে। বরং crontab -e ব্যবহার করে যে লাইনটি মুছতে চান শুধু সেটি মুছুন।'), kind: 'warn' },
      ],
    },
    {
      h: l('When and where to use it — and the environment trap', 'কখন ও কোথায় ব্যবহার করবেন—আর এনভায়রনমেন্ট ফাঁদ'),
      blocks: [
        { p: l('Reach for cron for any task that must repeat on a fixed schedule and does not need to react to events: nightly database backups, rotating and compressing logs, emailing a daily summary, cleaning temporary files, refreshing cached data, or renewing TLS certificates. It is perfect for "every X, do Y". It is the wrong tool when timing must be exact to the second, when a task should trigger on an event rather than a clock, or when jobs have complex dependencies on each other — for those, systemd timers or a real scheduler fit better. Note too that classic cron only runs while the machine is on; if a laptop is asleep at 2am, that job is simply skipped (anacron or systemd timers can catch up missed runs).', 'যে কাজ একটি নির্দিষ্ট শিডিউলে পুনরাবৃত্তি হতে হবে ও ইভেন্টে সাড়া দিতে হয় না তার জন্য cron নিন: রাত্রিকালীন ডেটাবেস ব্যাকআপ, log ঘোরানো ও কম্প্রেস করা, দৈনিক সারাংশ ইমেইল করা, অস্থায়ী ফাইল পরিষ্কার, cached ডেটা রিফ্রেশ, বা TLS সার্টিফিকেট নবায়ন। "প্রতি X-এ, Y করো"-এর জন্য এটি নিখুঁত। এটি ভুল টুল যখন সময় সেকেন্ড পর্যন্ত নিখুঁত হতে হবে, যখন একটি কাজ ঘড়ির বদলে একটি ইভেন্টে চালু হওয়া উচিত, বা যখন job-গুলোর একে অপরের উপর জটিল নির্ভরতা—এসবের জন্য systemd timer বা একটি সত্যিকার scheduler ভালো। আরও খেয়াল রাখুন, ক্লাসিক cron শুধু মেশিন চালু থাকলে চলে; ল্যাপটপ রাত ২টায় ঘুমালে সেই job শুধু বাদ পড়ে (anacron বা systemd timer বাদ পড়া run পূরণ করতে পারে)।') },
        { p: l('The single biggest surprise with cron is the environment. A cron job does not run inside your normal shell, so it does not have the PATH, aliases, or variables your interactive terminal has. A command that works perfectly when you type it can fail from cron with "command not found" because its directory is not on cron’s tiny PATH, or because it relied on a variable that is not set. The cures are simple: use absolute paths for every command and file (/usr/bin/python3, not python3), set any variables the job needs at the top of the crontab, and always redirect output to a log file so you can see the error instead of guessing.', 'cron-এর সবচেয়ে বড় চমক হলো এনভায়রনমেন্ট। একটি cron job আপনার স্বাভাবিক শেলে চলে না, তাই আপনার ইন্টার‌্যাকটিভ টার্মিনালের PATH, alias বা variable এর থাকে না। আপনি টাইপ করলে নিখুঁত চলা একটি কমান্ড cron থেকে "command not found" দিয়ে ব্যর্থ হতে পারে কারণ এর ডিরেক্টরি cron-এর ক্ষুদ্র PATH-এ নেই, বা কারণ এটি এমন একটি variable-এর উপর নির্ভর করেছিল যা সেট নয়। সমাধান সহজ: প্রতিটি কমান্ড ও ফাইলে absolute path ব্যবহার করুন (python3 নয়, /usr/bin/python3), job-এর দরকারি variable crontab-এর উপরে সেট করুন, এবং সবসময় output একটি লগ ফাইলে রিডাইরেক্ট করুন যাতে অনুমানের বদলে এররটি দেখতে পান।') },
      ],
    },
    {
      h: l('Common mistakes', 'সাধারণ ভুল'),
      blocks: [
        { list: [
          l('Assuming a cron job inherits your shell’s environment. It does not — jobs often fail because PATH or a variable they rely on is simply not set.', 'ধরে নেওয়া একটি cron job আপনার শেলের এনভায়রনমেন্ট পায়। পায় না—PATH বা তার নির্ভরের একটি variable সেট না থাকায় job প্রায়ই ব্যর্থ হয়।'),
          l('Using bare command names like python or ./script.sh. cron may not find them; use full absolute paths instead.', 'python বা ./script.sh-এর মতো খালি নাম ব্যবহার করা। cron এদের নাও খুঁজে পেতে পারে; বদলে পূর্ণ absolute path দিন।'),
          l('Writing a schedule without ever testing the command by hand first, so a broken command silently fails every night.', 'আগে কমান্ডটি হাতে টেস্ট না করেই শিডিউল লেখা, ফলে একটি ভাঙা কমান্ড প্রতি রাতে নীরবে ব্যর্থ হয়।'),
          l('Not redirecting output to a log, so when a job fails there is no message to explain why.', 'output একটি লগে রিডাইরেক্ট না করা, ফলে একটি job ব্যর্থ হলে কেন তা ব্যাখ্যা করার কোনো বার্তা থাকে না।'),
          l('Reaching for crontab -r (wipe everything) when you meant crontab -e (edit).', 'crontab -e (এডিট) বোঝাতে গিয়ে crontab -r (সব মুছে ফেলা) ব্যবহার করা।'),
        ] },
      ],
    },
    {
      h: l('Remember in one line', 'এক লাইনে মনে রাখুন'),
      blocks: [
        { list: [
          l('cron runs commands on a schedule set by five fields: minute, hour, day-of-month, month, day-of-week, then the command.', 'cron পাঁচটি ফিল্ডে সেট করা শিডিউলে কমান্ড চালায়: মিনিট, ঘণ্টা, মাসের দিন, মাস, সপ্তাহের দিন, তারপর কমান্ড।'),
          l('Edit with crontab -e, list with crontab -l; test the command by hand before you trust it to cron.', 'crontab -e দিয়ে এডিট, crontab -l দিয়ে দেখুন; cron-এ ভরসার আগে কমান্ডটি হাতে টেস্ট করুন।'),
          l('cron runs with a minimal environment — use absolute paths and log the output, or PATH will surprise you.', 'cron ন্যূনতম এনভায়রনমেন্টে চলে—absolute path ব্যবহার করুন ও output লগ করুন, নইলে PATH অবাক করবে।'),
        ] },
      ],
    },
  ],

  // ── lx-packages · Package managers ────────────────────────────────────────
  'lx-packages': [
    {
      h: l('What is a package manager?', 'প্যাকেজ ম্যানেজার কী?'),
      blocks: [
        { p: l('A package manager is the tool you use to install, update, and remove software on Linux. Instead of hunting for a download on a website and dragging it around, you run one command — apt install nginx — and the package manager fetches the software from a trusted repository, installs it in the right place, and, crucially, pulls in every other package it depends on. On Debian and Ubuntu that tool is apt; on Fedora and Red Hat it is dnf. They differ in commands but share the same core idea.', 'প্যাকেজ ম্যানেজার হলো সেই টুল যা দিয়ে আপনি Linux-এ সফটওয়্যার ইনস্টল, আপডেট ও রিমুভ করেন। একটি ওয়েবসাইটে ডাউনলোড খুঁজে টেনে আনার বদলে আপনি একটি কমান্ড চালান—apt install nginx—আর প্যাকেজ ম্যানেজার একটি বিশ্বস্ত repository থেকে সফটওয়্যারটি আনে, সঠিক জায়গায় ইনস্টল করে, এবং সবচেয়ে গুরুত্বপূর্ণ, এটি যে সব প্যাকেজের উপর নির্ভর করে সেগুলোও টেনে আনে। Debian ও Ubuntu-তে সেই টুল apt; Fedora ও Red Hat-এ এটি dnf। এদের কমান্ড আলাদা কিন্তু মূল ধারণা এক।') },
        { p: l('The problem it solves is dependencies. Real software is not one file: a program may need a dozen shared libraries, each of which needs others, forming a web. Installing all of that by hand — in the right versions, in the right order — is miserable and error-prone. A package manager keeps a database of what is installed and what each thing requires, so it can work out the whole set for you, install exactly what is missing, and later remove things cleanly. It also verifies packages come from a signed, trusted source, which is far safer than running a random installer from the web.', 'এটি যে সমস্যা সমাধান করে তা হলো নির্ভরতা। আসল সফটওয়্যার একটি ফাইল নয়: একটি প্রোগ্রামের এক ডজন shared library লাগতে পারে, যার প্রতিটির আবার অন্যগুলো লাগে, একটি জাল তৈরি করে। এই সব হাতে ইনস্টল করা—সঠিক সংস্করণে, সঠিক ক্রমে—কষ্টকর ও ভুলপ্রবণ। প্যাকেজ ম্যানেজার কী ইনস্টল আছে ও প্রতিটি কী চায় তার একটি ডেটাবেস রাখে, তাই এটি পুরো সেট বের করে ঠিক যা অনুপস্থিত তা ইনস্টল করতে পারে, ও পরে জিনিস পরিষ্কারভাবে সরাতে পারে। এটি প্যাকেজ একটি সই করা, বিশ্বস্ত উৎস থেকে আসে তাও যাচাই করে, যা ওয়েব থেকে এলোমেলো installer চালানোর চেয়ে অনেক নিরাপদ।') },
        { note: l('A package manager is an app store for the command line. But it does more than the phone kind: it also tracks and installs everything a program depends on, and can remove all of it cleanly when you are done.', 'প্যাকেজ ম্যানেজার হলো কমান্ড লাইনের একটি অ্যাপ স্টোর। তবে এটি ফোনের অ্যাপ স্টোরের চেয়ে বেশি করে: এটি একটি প্রোগ্রাম যা নির্ভর করে তা-ও ট্র্যাক ও ইনস্টল করে, এবং কাজ শেষে সব পরিষ্কারভাবে সরাতে পারে।'), kind: 'tip' },
      ],
    },
    {
      h: l('How installing a package works', 'একটি প্যাকেজ ইনস্টল কীভাবে কাজ করে'),
      blocks: [
        { steps: [
          l('Refresh the local index first with apt update. This downloads the latest list of available packages and versions from the repositories — it does not install or upgrade anything.', 'প্রথমে apt update দিয়ে লোকাল index রিফ্রেশ করুন। এটি repository থেকে উপলব্ধ প্যাকেজ ও সংস্করণের সর্বশেষ তালিকা নামায়—কিছু ইনস্টল বা আপগ্রেড করে না।'),
          l('Ask to install a package with apt install <name>. The manager works out its dependencies and shows you the full list of what will be installed.', 'apt install <name> দিয়ে একটি প্যাকেজ ইনস্টল করতে বলুন। ম্যানেজার এর নির্ভরতা বের করে ও কী কী ইনস্টল হবে তার পূর্ণ তালিকা দেখায়।'),
          l('Confirm, and it downloads the package plus every dependency, verifies their signatures, and installs them in the correct order.', 'নিশ্চিত করুন, আর এটি প্যাকেজ ও প্রতিটি নির্ভরতা নামায়, তাদের signature যাচাই করে, ও সঠিক ক্রমে ইনস্টল করে।'),
          l('Later, upgrade everything at once with apt upgrade, or remove a package you no longer need with apt remove.', 'পরে apt upgrade দিয়ে একবারে সব আপগ্রেড করুন, বা apt remove দিয়ে আর দরকার নেই এমন প্যাকেজ সরান।'),
        ] },
        { code: `# 1. Refresh the list of available packages (do this first)
sudo apt update

# 2. Install a package plus everything it depends on
sudo apt install nginx
# The following NEW packages will be installed:
#   nginx nginx-common nginx-core libnginx-mod-http-...
# Do you want to continue? [Y/n]

# 3. Upgrade all installed packages to their latest versions
sudo apt upgrade

# 4. Remove a package you no longer need
sudo apt remove nginx

# Search the repositories for something by keyword
apt search "web server"`, caption: l('apt update refreshes the index; apt install/upgrade/remove change what is installed. Installing needs root, so these use sudo; searching does not.', 'apt update index রিফ্রেশ করে; apt install/upgrade/remove কী ইনস্টল আছে তা বদলায়। ইনস্টলে root লাগে, তাই এগুলো sudo ব্যবহার করে; খোঁজায় লাগে না।') },
      ],
    },
    {
      h: l('Key commands', 'মূল কমান্ড'),
      blocks: [
        { table: {
          head: [l('Goal', 'লক্ষ্য'), l('Command', 'কমান্ড')],
          rows: [
            [l('Update the package index', 'প্যাকেজ index আপডেট'), l('apt update', 'apt update')],
            [l('Install a package', 'প্যাকেজ ইনস্টল'), l('apt install pkg', 'apt install pkg')],
            [l('Upgrade everything installed', 'সব ইনস্টল আপগ্রেড'), l('apt upgrade', 'apt upgrade')],
            [l('Remove a package', 'প্যাকেজ রিমুভ'), l('apt remove pkg', 'apt remove pkg')],
            [l('Search for a package', 'প্যাকেজ খুঁজুন'), l('apt search pkg', 'apt search pkg')],
          ],
        } },
        { note: l('update and upgrade are different words for different jobs: apt update only refreshes the list of what is available, while apt upgrade actually installs the newer versions. You almost always run update first, then upgrade.', 'update ও upgrade ভিন্ন কাজের ভিন্ন শব্দ: apt update শুধু কী উপলব্ধ তার তালিকা রিফ্রেশ করে, আর apt upgrade আসলে নতুন সংস্করণ ইনস্টল করে। আপনি প্রায় সবসময় আগে update, তারপর upgrade চালান।'), kind: 'tip' },
      ],
    },
    {
      h: l('Different families, same idea', 'ভিন্ন পরিবার, একই ধারণা'),
      blocks: [
        { p: l('Which package manager you use depends on your Linux distribution, but they all do the same job, so learning one makes the others easy to pick up. The commands below are near-equivalents across the big families.', 'আপনি কোন প্যাকেজ ম্যানেজার ব্যবহার করবেন তা আপনার Linux ডিস্ট্রিবিউশনের উপর নির্ভর করে, তবে সবাই একই কাজ করে, তাই একটি শিখলে অন্যগুলো সহজে তুলে নেওয়া যায়। নিচের কমান্ডগুলো বড় পরিবারগুলোতে প্রায়-সমতুল্য।') },
        { table: {
          head: [l('Task', 'কাজ'), l('Debian/Ubuntu (apt)', 'Debian/Ubuntu (apt)'), l('Fedora/RHEL (dnf)', 'Fedora/RHEL (dnf)')],
          rows: [
            [l('Refresh index', 'index রিফ্রেশ'), l('apt update', 'apt update'), l('dnf check-update', 'dnf check-update')],
            [l('Install', 'ইনস্টল'), l('apt install pkg', 'apt install pkg'), l('dnf install pkg', 'dnf install pkg')],
            [l('Upgrade all', 'সব আপগ্রেড'), l('apt upgrade', 'apt upgrade'), l('dnf upgrade', 'dnf upgrade')],
            [l('Remove', 'রিমুভ'), l('apt remove pkg', 'apt remove pkg'), l('dnf remove pkg', 'dnf remove pkg')],
          ],
        } },
        { note: l('You will also meet language-specific managers like pip (Python) and npm (Node). They install libraries for one language, not system-wide software, and live alongside apt or dnf rather than replacing them.', 'আপনি pip (Python) ও npm (Node)-এর মতো ভাষা-নির্দিষ্ট ম্যানেজারও পাবেন। এরা এক ভাষার library ইনস্টল করে, সিস্টেম-ব্যাপী সফটওয়্যার নয়, এবং apt বা dnf-কে প্রতিস্থাপন না করে তাদের পাশাপাশি থাকে।'), kind: 'tip' },
      ],
    },
    {
      h: l('When and where to use it', 'কখন ও কোথায় ব্যবহার করবেন'),
      blocks: [
        { p: l('Make the package manager your default and first choice for installing anything on Linux — a language runtime, a database, a command-line tool, a web server. It is the safe, reversible, up-to-date path: packages come signed from a trusted repository, dependencies are handled for you, and a later apt remove or apt upgrade keeps everything tidy. Always run apt update before apt install so you fetch current versions rather than whatever was current the last time the index was refreshed, which could be weeks ago.', 'Linux-এ যেকোনো কিছু ইনস্টলের জন্য প্যাকেজ ম্যানেজারকে আপনার ডিফল্ট ও প্রথম পছন্দ করুন—একটি language runtime, একটি ডেটাবেস, একটি কমান্ড-লাইন টুল, একটি ওয়েব সার্ভার। এটি নিরাপদ, ফেরানো-যায় ও হালনাগাদ পথ: প্যাকেজ একটি বিশ্বস্ত repository থেকে সই করা আসে, নির্ভরতা আপনার জন্য সামলানো হয়, ও পরে apt remove বা apt upgrade সব পরিপাটি রাখে। সবসময় apt install-এর আগে apt update চালান যাতে বর্তমান সংস্করণ পান, index সর্বশেষ যখন রিফ্রেশ হয়েছিল তখনকারটি নয়—যা কয়েক সপ্তাহ আগের হতে পারে।') },
        { p: l('Go outside the package manager only when you must — software newer than the repositories carry, or a vendor that ships its own installer. Even then, the clean way is to add that vendor’s official repository so their package manager still tracks updates for you, rather than dropping a loose binary the manager knows nothing about. The one thing to avoid is piping a random script straight into a root shell (curl … | sudo bash): you are running unreviewed code as the most powerful user, with none of the checks a real package gives you.', 'প্যাকেজ ম্যানেজারের বাইরে যান শুধু যখন যেতেই হবে—repository যা বহন করে তার চেয়ে নতুন সফটওয়্যার, বা এমন একটি vendor যে নিজের installer দেয়। তখনও পরিষ্কার উপায় হলো সেই vendor-এর অফিসিয়াল repository যোগ করা যাতে তাদের প্যাকেজ ম্যানেজার এখনো আপনার জন্য আপডেট ট্র্যাক করে, ম্যানেজার কিছু জানে না এমন একটি আলগা binary ফেলার বদলে। যে জিনিসটি এড়াবেন তা হলো একটি এলোমেলো স্ক্রিপ্ট সরাসরি একটি root শেলে পাইপ করা (curl … | sudo bash): আপনি সবচেয়ে ক্ষমতাধর user হিসেবে অ-পর্যালোচিত কোড চালাচ্ছেন, একটি আসল প্যাকেজের কোনো যাচাই ছাড়াই।') },
      ],
    },
    {
      h: l('Common mistakes', 'সাধারণ ভুল'),
      blocks: [
        { list: [
          l('Running apt install without apt update first, then getting an old version or a "package not found" for something that actually exists.', 'আগে apt update ছাড়া apt install চালানো, তারপর একটি পুরনো সংস্করণ বা আসলে থাকা কিছুর জন্য "package not found" পাওয়া।'),
          l('Confusing apt update (refresh the list) with apt upgrade (actually install newer versions) — they are not the same.', 'apt update (তালিকা রিফ্রেশ) ও apt upgrade (আসলে নতুন সংস্করণ ইনস্টল) গুলিয়ে ফেলা—এরা এক নয়।'),
          l('Installing software by piping a random script to sudo bash instead of using the package manager or a trusted repository.', 'প্যাকেজ ম্যানেজার বা বিশ্বস্ত repository ব্যবহার না করে একটি এলোমেলো স্ক্রিপ্ট sudo bash-এ পাইপ করে সফটওয়্যার ইনস্টল করা।'),
          l('Mixing hand-installed binaries with managed packages, which can break the dependency graph the manager relies on.', 'হাতে-ইনস্টল করা binary ম্যানেজ করা প্যাকেজের সঙ্গে মেশানো, যা ম্যানেজারের নির্ভর করা dependency graph ভাঙতে পারে।'),
        ] },
      ],
    },
    {
      h: l('Remember in one line', 'এক লাইনে মনে রাখুন'),
      blocks: [
        { list: [
          l('A package manager installs, updates, and removes software along with all its dependencies from trusted repositories.', 'প্যাকেজ ম্যানেজার বিশ্বস্ত repository থেকে সব নির্ভরতাসহ সফটওয়্যার ইনস্টল, আপডেট ও রিমুভ করে।'),
          l('Run apt update to refresh the list, then apt install / apt upgrade / apt remove to change what is installed.', 'তালিকা রিফ্রেশে apt update চালান, তারপর কী ইনস্টল আছে বদলাতে apt install / apt upgrade / apt remove।'),
          l('Prefer the package manager over hand-installs and random curl-to-bash scripts — it is safer and reversible.', 'হাতে-ইনস্টল ও এলোমেলো curl-to-bash স্ক্রিপ্টের চেয়ে প্যাকেজ ম্যানেজার নিন—এটি নিরাপদ ও ফেরানো-যায়।'),
        ] },
      ],
    },
  ],

  // ── lx-env · Environment variables & PATH ─────────────────────────────────
  'lx-env': [
    {
      h: l('What are environment variables?', 'এনভায়রনমেন্ট ভ্যারিয়েবল কী?'),
      blocks: [
        { p: l('An environment variable is a named value that lives in your shell session and is passed along to the programs you run. Programs read these variables to learn about their surroundings and how you want them to behave: HOME is the path to your home directory, USER is your username, EDITOR names your preferred text editor, LANG sets your language and character encoding, and PATH lists where to find commands. You set a variable with NAME=value and read it back by putting a dollar sign in front of the name, like $HOME.', 'এনভায়রনমেন্ট ভ্যারিয়েবল হলো একটি নামযুক্ত মান যা আপনার শেল সেশনে থাকে ও আপনি যে প্রোগ্রাম চালান তাদের কাছে পৌঁছে দেওয়া হয়। প্রোগ্রাম এই ভ্যারিয়েবল পড়ে তাদের পরিবেশ ও আপনি কীভাবে তাদের আচরণ চান তা জানে: HOME হলো আপনার home ডিরেক্টরির পাথ, USER আপনার ইউজারনেম, EDITOR আপনার পছন্দের টেক্সট এডিটর, LANG আপনার ভাষা ও character encoding সেট করে, আর PATH বলে কমান্ড কোথায় খুঁজতে হবে। আপনি NAME=value দিয়ে একটি ভ্যারিয়েবল সেট করেন এবং নামের সামনে একটি ডলার চিহ্ন বসিয়ে পড়েন, যেমন $HOME।') },
        { p: l('The problem environment variables solve is configuration without editing code. The same program should behave differently on your laptop and on a production server — a different database URL, a different log level, a different secret key — and you do not want to change the program itself for each place. Environment variables let the surroundings carry that configuration in. This is why they are everywhere in modern development: they keep settings and secrets out of your source code, and they are how tools, containers, and cloud platforms hand configuration to your app.', 'এনভায়রনমেন্ট ভ্যারিয়েবল যে সমস্যা সমাধান করে তা হলো কোড না এডিট করে কনফিগারেশন। একই প্রোগ্রামের আপনার ল্যাপটপে ও একটি production সার্ভারে ভিন্ন আচরণ করা উচিত—একটি ভিন্ন database URL, একটি ভিন্ন log level, একটি ভিন্ন secret key—আর আপনি প্রতিটি জায়গার জন্য প্রোগ্রামটি নিজে বদলাতে চান না। এনভায়রনমেন্ট ভ্যারিয়েবল পরিবেশকে সেই কনফিগারেশন বহন করতে দেয়। এ কারণেই এরা আধুনিক ডেভেলপমেন্টে সর্বত্র: এরা সেটিং ও secret আপনার সোর্স কোডের বাইরে রাখে, এবং tool, container ও cloud platform এভাবেই আপনার অ্যাপে কনফিগারেশন তুলে দেয়।') },
        { note: l('Think of the environment as a shared notepad that every program you launch can read. PATH is one special note on it: the list of aisles the shell walks, in order, to find the tool you asked for by name.', 'এনভায়রনমেন্টকে একটি শেয়ার্ড নোটপ্যাড ভাবুন যা আপনার চালানো প্রতিটি প্রোগ্রাম পড়তে পারে। PATH হলো তাতে একটি বিশেষ নোট: শেল আপনার নাম-ধরে চাওয়া টুল খুঁজতে যে আইলগুলো ক্রমে হাঁটে তার তালিকা।'), kind: 'tip' },
      ],
    },
    {
      h: l('How variables and PATH work', 'ভ্যারিয়েবল ও PATH কীভাবে কাজ করে'),
      blocks: [
        { steps: [
          l('Set a variable for the current shell by writing NAME=value with no spaces around the = sign.', '= চিহ্নের চারপাশে স্পেস ছাড়া NAME=value লিখে বর্তমান শেলের জন্য একটি ভ্যারিয়েবল সেট করুন।'),
          l('Read it back with a dollar sign in front: echo $NAME. This works inside commands too.', 'সামনে একটি ডলার চিহ্ন দিয়ে পড়ুন: echo $NAME। এটি কমান্ডের ভেতরেও কাজ করে।'),
          l('A plain variable is visible only to your shell. Run export NAME to promote it to the environment so programs you launch inherit it.', 'একটি সাধারণ ভ্যারিয়েবল শুধু আপনার শেল দেখে। আপনি চালানো প্রোগ্রাম যাতে পায় তার জন্য export NAME দিয়ে একে এনভায়রনমেন্টে তুলুন।'),
          l('To set a variable for just one command, put it in front of that command: NAME=value some-command.', 'শুধু একটি কমান্ডের জন্য একটি ভ্যারিয়েবল সেট করতে, সেই কমান্ডের সামনে বসান: NAME=value some-command।'),
          l('When you type a command, the shell searches each directory in PATH, left to right, and runs the first matching program it finds.', 'একটি কমান্ড টাইপ করলে শেল PATH-এর প্রতিটি ডিরেক্টরি বাঁ-থেকে-ডান খোঁজে, ও প্রথম মেলা প্রোগ্রামটি চালায়।'),
        ] },
        { code: `# Show every environment variable
printenv | head

# Set a variable for THIS command only
DEBUG=1 ./run.sh

# Set a variable for this shell; children do NOT see it yet
GREETING=hello
echo $GREETING              # hello

# export promotes it to the environment for programs you launch
export GREETING
export EDITOR=nano          # set and export in one line

# PATH is a colon-separated list of directories the shell searches
echo $PATH
# /usr/local/bin:/usr/bin:/bin:/home/ada/.local/bin

# Add your own bin folder to the FRONT of PATH (searched first)
export PATH="$HOME/bin:$PATH"`, caption: l('NAME=value sets a shell variable; export shares it with programs; $NAME reads it. PATH is just a variable — a list of folders the shell searches for commands.', 'NAME=value একটি শেল ভ্যারিয়েবল সেট করে; export তা প্রোগ্রামের সঙ্গে ভাগ করে; $NAME পড়ে। PATH শুধু একটি ভ্যারিয়েবল—শেল কমান্ড খোঁজে এমন ফোল্ডারের তালিকা।') },
      ],
    },
    {
      h: l('Key commands', 'মূল কমান্ড'),
      blocks: [
        { table: {
          head: [l('Goal', 'লক্ষ্য'), l('Command', 'কমান্ড')],
          rows: [
            [l('Show all variables', 'সব ভ্যারিয়েবল দেখুন'), l('printenv', 'printenv')],
            [l('Set for one command only', 'শুধু এক কমান্ডে সেট'), l('VAR=1 cmd', 'VAR=1 cmd')],
            [l('Export a variable', 'ভ্যারিয়েবল export করুন'), l('export VAR=1', 'export VAR=1')],
            [l('Read one variable', 'একটি ভ্যারিয়েবল পড়ুন'), l('echo $VAR', 'echo $VAR')],
            [l('Show the PATH', 'PATH দেখুন'), l('echo $PATH', 'echo $PATH')],
          ],
        } },
        { note: l('Use $VAR (or $PATH) to read a variable — the dollar sign tells the shell to substitute its value. Without the dollar sign, PATH is just the literal word "PATH".', 'একটি ভ্যারিয়েবল পড়তে $VAR (বা $PATH) ব্যবহার করুন—ডলার চিহ্ন শেলকে তার মান বসাতে বলে। ডলার চিহ্ন ছাড়া PATH শুধু আক্ষরিক শব্দ "PATH"।'), kind: 'tip' },
      ],
    },
    {
      h: l('How the shell finds a command with PATH', 'PATH দিয়ে শেল কীভাবে একটি কমান্ড খোঁজে'),
      blocks: [
        { p: l('PATH is the single most important environment variable to understand, because it explains a question every beginner eventually asks: "I installed it, so why does the shell say command not found?" When you type python3, the shell does not search your whole disk. It walks the directories listed in PATH, in order from left to right, and runs the first program with that name it finds. If the program lives in a directory that is not on PATH, the shell never sees it — even though it is right there on disk.', 'PATH হলো বোঝার জন্য সবচেয়ে গুরুত্বপূর্ণ একক এনভায়রনমেন্ট ভ্যারিয়েবল, কারণ এটি প্রতিটি নতুন শিক্ষার্থীর শেষমেশ করা একটি প্রশ্ন ব্যাখ্যা করে: "আমি তো ইনস্টল করলাম, তবু শেল কেন command not found বলে?" আপনি python3 টাইপ করলে শেল আপনার পুরো ডিস্ক খোঁজে না। এটি PATH-এ তালিকাভুক্ত ডিরেক্টরিগুলো বাঁ-থেকে-ডান ক্রমে হাঁটে, ও সেই নামের প্রথম প্রোগ্রামটি চালায়। প্রোগ্রামটি যদি এমন একটি ডিরেক্টরিতে থাকে যা PATH-এ নেই, শেল একে কখনো দেখে না—যদিও এটি ডিস্কে ঠিক সেখানেই আছে।') },
        { p: l('Two consequences follow. First, order matters: because the shell stops at the first match, a directory earlier in PATH can shadow a program of the same name later on — this is how putting $HOME/bin at the front lets your own version win. Second, to make a newly installed tool runnable by name, its directory must be on PATH; that is why installers so often tell you to add a folder to it. You can ask the shell which copy it would run with which python3, and see the whole search list with echo $PATH.', 'দুটি ফল আসে। প্রথমত, ক্রম গুরুত্বপূর্ণ: শেল প্রথম মিলেই থামে বলে PATH-এ আগের একটি ডিরেক্টরি পরের একই নামের প্রোগ্রামকে ঢেকে দিতে পারে—এভাবেই $HOME/bin সামনে রাখলে আপনার নিজের সংস্করণ জেতে। দ্বিতীয়ত, একটি নতুন ইনস্টল করা টুলকে নাম দিয়ে চালানো-যোগ্য করতে হলে তার ডিরেক্টরি PATH-এ থাকতে হবে; এ কারণেই installer প্রায়ই আপনাকে একটি ফোল্ডার যোগ করতে বলে। শেল কোন কপি চালাবে তা which python3 দিয়ে জিজ্ঞেস করতে পারেন, ও পুরো খোঁজ তালিকা echo $PATH দিয়ে দেখতে পারেন।') },
      ],
    },
    {
      h: l('Shell-local, exported, and persistent', 'শেল-লোকাল, export করা ও স্থায়ী'),
      blocks: [
        { p: l('There are three levels to keep straight, and confusing them causes most environment-variable surprises. A shell-local variable (NAME=value) exists only in the shell you typed it in; the programs you launch from that shell do not see it. Exporting it (export NAME) promotes it to the environment, so every program that shell starts inherits a copy. But even an exported variable is temporary — it lives only as long as that shell session. Open a new terminal, or reboot, and it is gone.', 'সোজা রাখার তিনটি স্তর আছে, আর এগুলো গুলিয়ে ফেলা বেশিরভাগ এনভায়রনমেন্ট-ভ্যারিয়েবল চমকের কারণ। একটি শেল-লোকাল ভ্যারিয়েবল (NAME=value) শুধু আপনি যে শেলে টাইপ করেছেন সেখানে থাকে; সেই শেল থেকে চালানো প্রোগ্রাম একে দেখে না। export করা (export NAME) একে এনভায়রনমেন্টে তোলে, তাই সেই শেলের চালু করা প্রতিটি প্রোগ্রাম একটি কপি পায়। কিন্তু export করা ভ্যারিয়েবলও অস্থায়ী—এটি শুধু সেই শেল সেশন যতক্ষণ ততক্ষণ থাকে। নতুন টার্মিনাল খুলুন, বা রিবুট করুন, আর এটি নেই।') },
        { p: l('To make a variable stick, you write the export line into a shell startup file that runs every time a shell opens — commonly ~/.bashrc (or ~/.zshrc for zsh, or ~/.profile for login shells). Then every new terminal reads that file and sets the variable for you. This is exactly how a permanent PATH addition is done: you add export PATH="$HOME/bin:$PATH" to ~/.bashrc, and from then on every session finds your tools. After editing the file, run source ~/.bashrc to apply it to the current shell without opening a new one.', 'একটি ভ্যারিয়েবল টিকিয়ে রাখতে, export লাইনটি এমন একটি শেল startup ফাইলে লেখেন যা প্রতিবার শেল খোলার সময় চলে—সাধারণত ~/.bashrc (বা zsh-এর জন্য ~/.zshrc, বা login শেলের জন্য ~/.profile)। তখন প্রতিটি নতুন টার্মিনাল সেই ফাইল পড়ে আপনার জন্য ভ্যারিয়েবল সেট করে। একটি স্থায়ী PATH সংযোজন ঠিক এভাবেই হয়: আপনি ~/.bashrc-এ export PATH="$HOME/bin:$PATH" যোগ করেন, আর তখন থেকে প্রতিটি সেশন আপনার টুল খুঁজে পায়। ফাইল এডিটের পর, নতুন একটি না খুলে বর্তমান শেলে প্রয়োগ করতে source ~/.bashrc চালান।') },
        { note: l('If a variable disappears when you open a new terminal, it was never persisted. Put the export line in ~/.bashrc (or your shell’s startup file) to make it survive across sessions.', 'নতুন টার্মিনাল খুললে একটি ভ্যারিয়েবল উধাও হলে, এটি কখনো স্থায়ী হয়নি। সেশনের পরও টিকতে export লাইনটি ~/.bashrc (বা আপনার শেলের startup ফাইলে) রাখুন।'), kind: 'warn' },
      ],
    },
    {
      h: l('When and where to use it', 'কখন ও কোথায় ব্যবহার করবেন'),
      blocks: [
        { p: l('Use environment variables to configure a program from the outside instead of hard-coding settings: a database URL, an API key, a feature flag, a log level. This is the standard way to keep the same code working across your laptop, a teammate’s machine, and production, and to keep secrets out of source control. Use the one-off form NAME=value command when you only need a setting for a single run — for example DEBUG=1 ./run.sh to turn on verbose logging just this once, without changing anything permanently. Reach for export when a value should apply to everything you launch in the current session.', 'সেটিং hard-code না করে বাইরে থেকে একটি প্রোগ্রাম কনফিগার করতে এনভায়রনমেন্ট ভ্যারিয়েবল ব্যবহার করুন: একটি database URL, একটি API key, একটি feature flag, একটি log level। একই কোড আপনার ল্যাপটপ, একজন টিমমেটের মেশিন ও production-এ চালু রাখার এবং secret সোর্স কন্ট্রোলের বাইরে রাখার এটি প্রমিত উপায়। শুধু একটি run-এর জন্য একটি সেটিং দরকার হলে এককালীন রূপ NAME=value command ব্যবহার করুন—যেমন শুধু এইবার verbose logging চালু করতে DEBUG=1 ./run.sh, স্থায়ীভাবে কিছু না বদলে। একটি মান বর্তমান সেশনে চালানো সবকিছুতে প্রযোজ্য হওয়া উচিত হলে export নিন।') },
        { p: l('Edit PATH when you install a tool the shell cannot find by name — add its directory, put it at the front if you want your copy to take priority, and make it permanent in ~/.bashrc. Be conservative, though: keep secrets in files with tight permissions or a secrets manager rather than plain exports in your history, and never overwrite PATH with a bare value — always include the old $PATH (export PATH="$HOME/bin:$PATH"), or you will wipe out the system directories and suddenly nothing works.', 'শেল নাম দিয়ে খুঁজে পায় না এমন একটি টুল ইনস্টল করলে PATH এডিট করুন—তার ডিরেক্টরি যোগ করুন, আপনার কপি অগ্রাধিকার পেলে সামনে বসান, ও ~/.bashrc-এ স্থায়ী করুন। তবে সংযমী হন: secret আপনার history-তে সাধারণ export-এর বদলে কড়া পারমিশনযুক্ত ফাইলে বা একটি secrets manager-এ রাখুন, এবং PATH কখনো একটি খালি মান দিয়ে overwrite করবেন না—সবসময় পুরনো $PATH অন্তর্ভুক্ত করুন (export PATH="$HOME/bin:$PATH"), নইলে সিস্টেম ডিরেক্টরি মুছে যাবে ও হঠাৎ কিছুই কাজ করবে না।') },
      ],
    },
    {
      h: l('Common mistakes', 'সাধারণ ভুল'),
      blocks: [
        { list: [
          l('Setting a variable in one shell and wondering why another shell, a new terminal, or a fresh session cannot see it — it was never exported or persisted.', 'এক শেলে একটি ভ্যারিয়েবল সেট করে অবাক হওয়া কেন অন্য শেল, নতুন টার্মিনাল বা নতুন সেশন তা দেখে না—এটি কখনো export বা স্থায়ী হয়নি।'),
          l('Putting spaces around the equals sign. NAME = value fails; it must be NAME=value with no spaces.', 'সমান চিহ্নের চারপাশে স্পেস দেওয়া। NAME = value ব্যর্থ হয়; এটি স্পেস ছাড়া NAME=value হতে হবে।'),
          l('Overwriting PATH instead of extending it: export PATH="$HOME/bin" wipes the system directories, so common commands stop working. Always keep the old $PATH.', 'PATH বাড়ানোর বদলে overwrite করা: export PATH="$HOME/bin" সিস্টেম ডিরেক্টরি মুছে দেয়, তাই সাধারণ কমান্ড কাজ বন্ধ করে। সবসময় পুরনো $PATH রাখুন।'),
          l('Forgetting the dollar sign when reading a variable — echo PATH just prints the word, while echo $PATH prints its value.', 'একটি ভ্যারিয়েবল পড়ার সময় ডলার চিহ্ন ভুলে যাওয়া—echo PATH শুধু শব্দটি ছাপে, আর echo $PATH তার মান ছাপে।'),
        ] },
      ],
    },
    {
      h: l('Remember in one line', 'এক লাইনে মনে রাখুন'),
      blocks: [
        { list: [
          l('Environment variables carry settings to programs; set with NAME=value, read with $NAME, share with export.', 'এনভায়রনমেন্ট ভ্যারিয়েবল প্রোগ্রামে সেটিং বহন করে; NAME=value দিয়ে সেট, $NAME দিয়ে পড়ুন, export দিয়ে ভাগ করুন।'),
          l('PATH is the list of directories the shell searches for commands; "command not found" usually means the directory is not on $PATH.', 'PATH হলো শেল কমান্ড খোঁজে এমন ডিরেক্টরির তালিকা; "command not found" সাধারণত মানে ডিরেক্টরিটি $PATH-এ নেই।'),
          l('Variables vanish when the shell closes — put export lines in ~/.bashrc to make them persist.', 'শেল বন্ধ হলে ভ্যারিয়েবল উধাও হয়—স্থায়ী করতে export লাইন ~/.bashrc-এ রাখুন।'),
        ] },
      ],
    },
  ],
}
