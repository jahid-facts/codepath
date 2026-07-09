// Deep, bilingual (English / Bangla) teaching guides for the Linux Fundamentals course —
// Files & navigation (paths, file operations, finding, wildcards) plus viewing files.
// Shape mirrors app/course-guides.js and app/guides/git/a.js: each guide is an array of
// sections { h, blocks }, rendered by GuideBlock in app/LearningApp.js. Block types:
// { p }, { list }, { steps }, { table:{head,rows} }, { note, kind }, { code, caption }.
// Facts (definitions, analogies, commands, trade-offs, mistakes) come from app/courses/linux.js.

const l = (en, bn) => ({ en, bn })

export default {
  // ── lx-paths · Absolute vs relative paths ─────────────────────────────────
  'lx-paths': [
    {
      h: l('What are absolute and relative paths?', 'অ্যাবসোলিউট ও রিলেটিভ পাথ কী?'),
      blocks: [
        { p: l('A path is the address of a file or directory inside the Linux filesystem tree — the single tree that starts at the root, written as a lone slash /. There are exactly two ways to write that address. An absolute path spells out the full route from the root, so it always begins with /: for example /home/ada/notes.txt names one specific file no matter where you happen to be standing. A relative path spells out the route from your current location — the directory you are "in" right now — so it never begins with /: for example notes.txt or ./docs/notes.txt is read starting from wherever you currently are.', 'পাথ হলো লিনাক্স ফাইলসিস্টেম গাছের ভেতরে একটি ফাইল বা ডিরেক্টরির ঠিকানা—সেই একক গাছ যা রুট থেকে শুরু হয়, একটিমাত্র স্ল্যাশ / দিয়ে লেখা। সেই ঠিকানা লেখার ঠিক দুটি উপায় আছে। অ্যাবসোলিউট পাথ রুট থেকে পুরো পথ বলে দেয়, তাই এটি সবসময় / দিয়ে শুরু হয়: যেমন /home/ada/notes.txt আপনি যেখানেই থাকুন একটি নির্দিষ্ট ফাইলকেই বোঝায়। রিলেটিভ পাথ আপনার বর্তমান অবস্থান—আপনি এখন যে ডিরেক্টরিতে "আছেন"—সেখান থেকে পথ বলে, তাই এটি কখনো / দিয়ে শুরু হয় না: যেমন notes.txt বা ./docs/notes.txt আপনি এখন যেখানে আছেন সেখান থেকে পড়া হয়।') },
        { p: l('The problem paths solve is precision. Almost every command you run — cd, ls, cp, rm, cat — has to be told exactly which file or folder to act on, and the filesystem may hold millions of them. An absolute path removes all doubt because it is anchored to the root and means the same thing from anywhere. A relative path trades that certainty for brevity: it is shorter to type and moves cleanly with you as you work, but its meaning depends entirely on your current directory, which you can check any time with pwd (print working directory).', 'পাথ যে সমস্যা সমাধান করে তা হলো নির্ভুলতা। আপনি যত কমান্ড চালান—cd, ls, cp, rm, cat—প্রায় প্রতিটিকে ঠিক কোন ফাইল বা ফোল্ডারে কাজ করতে হবে বলে দিতে হয়, আর ফাইলসিস্টেমে লাখ লাখ থাকতে পারে। অ্যাবসোলিউট পাথ সব সন্দেহ দূর করে কারণ এটি রুটে নোঙর করা ও সর্বত্র একই অর্থ বহন করে। রিলেটিভ পাথ সেই নিশ্চয়তার বদলে সংক্ষিপ্ততা দেয়: টাইপ করা ছোট ও কাজের সঙ্গে সঙ্গে আপনার সঙ্গে সরে, তবে এর অর্থ পুরোপুরি আপনার বর্তমান ডিরেক্টরির ওপর নির্ভর করে, যা আপনি যেকোনো সময় pwd (print working directory) দিয়ে দেখতে পারেন।') },
        { note: l('An absolute path is like a full postal address — "House 12, Road 3, Dhanmondi, Dhaka" finds the house from anywhere in the world. A relative path is like directions from where you are standing: "two doors down on the left." Perfectly clear if the listener knows where you are — useless if they do not.', 'অ্যাবসোলিউট পাথ পুরো ডাক ঠিকানার মতো—"বাসা ১২, রোড ৩, ধানমন্ডি, ঢাকা" পৃথিবীর যেকোনো জায়গা থেকে বাড়িটি খুঁজে দেয়। রিলেটিভ পাথ আপনি যেখানে দাঁড়িয়ে আছেন সেখান থেকে নির্দেশনার মতো: "বাঁয়ে দুই দরজা পরে।" শ্রোতা যদি জানে আপনি কোথায় তবে একদম স্পষ্ট—না জানলে অকেজো।'), kind: 'tip' },
      ],
    },
    {
      h: l('How the shell resolves a path', 'শেল কীভাবে একটি পাথ সমাধান করে'),
      blocks: [
        { p: l('When you hand a path to a command, the shell turns it into one concrete location before the command ever runs. The rule it follows is simple and worth memorising.', 'আপনি একটি কমান্ডে একটি পাথ দিলে, কমান্ড চলার আগেই শেল একে একটি সুনির্দিষ্ট অবস্থানে রূপ দেয়। এটি যে নিয়ম মানে তা সরল ও মনে রাখার মতো।') },
        { steps: [
          l('If the path starts with /, it is absolute: the shell reads it from the root and your current directory is ignored entirely.', 'পাথ / দিয়ে শুরু হলে এটি অ্যাবসোলিউট: শেল একে রুট থেকে পড়ে ও আপনার বর্তমান ডিরেক্টরি সম্পূর্ণ উপেক্ষা করে।'),
          l('Otherwise it is relative: the shell joins it onto your current directory ($PWD) to build the full location.', 'নইলে এটি রিলেটিভ: শেল একে আপনার বর্তমান ডিরেক্টরির ($PWD) সঙ্গে জুড়ে পূর্ণ অবস্থান বানায়।'),
          l('Along the way it expands the shortcuts: . means "this directory", .. means "the parent directory", and ~ means your home directory.', 'পথে এটি শর্টকাট প্রসারিত করে: . মানে "এই ডিরেক্টরি", .. মানে "প্যারেন্ট ডিরেক্টরি", আর ~ মানে আপনার হোম ডিরেক্টরি।'),
          l('The result is one final absolute location, which the command then acts on — so relative and absolute paths always end up pointing somewhere exact.', 'ফল হলো একটি চূড়ান্ত অ্যাবসোলিউট অবস্থান, যাতে কমান্ড কাজ করে—তাই রিলেটিভ ও অ্যাবসোলিউট পাথ সবসময় কোনো সুনির্দিষ্ট জায়গায় গিয়ে দাঁড়ায়।'),
        ] },
        { code: `# Where am I right now?
pwd
/home/ada

# A relative path is read from here (/home/ada)
cd docs            # now in /home/ada/docs
cat notes.txt      # means /home/ada/docs/notes.txt

# The same absolute path works from anywhere
cat /home/ada/docs/notes.txt

# Shortcuts: . (here)  .. (parent)  ~ (home)  - (previous dir)
cd ..              # up to /home/ada
cd ~               # jump straight home, wherever you were
cd -               # back to the directory you just left`, caption: l('pwd is your compass: it always answers "where am I?", which is exactly the information a relative path depends on.', 'pwd আপনার কম্পাস: এটি সবসময় "আমি কোথায়?" উত্তর দেয়, যা ঠিক সেই তথ্য যার ওপর একটি রিলেটিভ পাথ নির্ভর করে।') },
      ],
    },
    {
      h: l('Path symbols you must know', 'যে পাথ চিহ্নগুলো জানতেই হবে'),
      blocks: [
        { table: {
          head: [l('Symbol', 'চিহ্ন'), l('Means', 'অর্থ'), l('Example', 'উদাহরণ')],
          rows: [
            [l('/', '/'), l('The root of the whole filesystem (also a separator between names).', 'পুরো ফাইলসিস্টেমের রুট (নামের মধ্যে বিভাজকও)।'), l('/etc/hosts', '/etc/hosts')],
            [l('.', '.'), l('The current directory you are in.', 'আপনি যে বর্তমান ডিরেক্টরিতে আছেন।'), l('./run.sh', './run.sh')],
            [l('..', '..'), l('The parent directory, one level up.', 'প্যারেন্ট ডিরেক্টরি, এক ধাপ ওপরে।'), l('cd ../logs', 'cd ../logs')],
            [l('~', '~'), l('Your home directory (/home/you).', 'আপনার হোম ডিরেক্টরি (/home/you)।'), l('cd ~/docs', 'cd ~/docs')],
            [l('-', '-'), l('With cd, the previous directory you were in.', 'cd-এর সঙ্গে, আপনি আগে যে ডিরেক্টরিতে ছিলেন।'), l('cd -', 'cd -')],
            [l('name', 'name'), l('A relative path: read from the current directory.', 'একটি রিলেটিভ পাথ: বর্তমান ডিরেক্টরি থেকে পড়া।'), l('cat notes.txt', 'cat notes.txt')],
          ],
        } },
        { note: l('. and ./ are the same idea. You rarely need ./ before a filename for cat or cp, but you do need it to run a script in the current directory — ./deploy.sh — because the shell will not search the current directory for programs unless you say so.', '. ও ./ একই ধারণা। cat বা cp-এর জন্য ফাইলনামের আগে ./ কমই লাগে, তবে বর্তমান ডিরেক্টরির একটি স্ক্রিপ্ট চালাতে এটি লাগে—./deploy.sh—কারণ আপনি না বললে শেল প্রোগ্রামের জন্য বর্তমান ডিরেক্টরি খোঁজে না।'), kind: 'tip' },
      ],
    },
    {
      h: l('Absolute vs relative — at a glance', 'অ্যাবসোলিউট বনাম রিলেটিভ—এক নজরে'),
      blocks: [
        { table: {
          head: [l('Aspect', 'দিক'), l('Absolute path', 'অ্যাবসোলিউট পাথ'), l('Relative path', 'রিলেটিভ পাথ')],
          rows: [
            [l('Starts with', 'শুরু হয়'), l('/ (the root)', '/ (রুট)'), l('A name, ., .., or ~', 'একটি নাম, ., .. বা ~')],
            [l('Depends on where you are?', 'আপনি কোথায় তার ওপর নির্ভর করে?'), l('No — same meaning everywhere', 'না—সর্বত্র একই অর্থ'), l('Yes — read from the current directory', 'হ্যাঁ—বর্তমান ডিরেক্টরি থেকে পড়া')],
            [l('Length', 'দৈর্ঘ্য'), l('Longer, fully spelled out', 'লম্বা, পুরো লেখা'), l('Shorter, often just a name', 'ছোট, প্রায়ই শুধু একটি নাম')],
            [l('Best for', 'কার জন্য'), l('Scripts, cron jobs, config, anything unattended', 'স্ক্রিপ্ট, cron জব, কনফিগ, যেকোনো নিরীক্ষণহীন কাজ'), l('Quick interactive work near your files', 'ফাইলের কাছে দ্রুত ইন্টারেক্টিভ কাজ')],
          ],
        } },
      ],
    },
    {
      h: l('When to use each', 'কখন কোনটি ব্যবহার করবেন'),
      blocks: [
        { p: l('Reach for relative paths during ordinary interactive work, when you are already sitting in or near the folder you care about. Typing cat notes.txt or cd ../images is faster and reads naturally, and if you move the whole project folder elsewhere, relative paths inside it keep working because everything shifts together. This is why relative paths are the everyday default at the terminal.', 'সাধারণ ইন্টারেক্টিভ কাজে রিলেটিভ পাথ নিন, যখন আপনি ইতিমধ্যে দরকারি ফোল্ডারে বা তার কাছে বসে আছেন। cat notes.txt বা cd ../images টাইপ করা দ্রুত ও স্বাভাবিক পড়ে, আর পুরো প্রকল্প ফোল্ডার অন্য জায়গায় সরালেও এর ভেতরের রিলেটিভ পাথ কাজ করে যায় কারণ সব একসঙ্গে সরে। এ কারণেই টার্মিনালে রিলেটিভ পাথ প্রতিদিনের ডিফল্ট।') },
        { p: l('Reach for absolute paths the moment something must run without a human watching, or must be unambiguous. Inside a bash script, a cron job, a systemd service, or a config file, you cannot be sure which directory the command will start in — so a relative path is a bug waiting to happen. An absolute path like /var/backups/db.sql or /home/ada/app means exactly one thing regardless of the working directory, which is precisely the guarantee unattended jobs need. Absolute paths are also the safer choice for any destructive command: if you are about to run rm, spelling out the full path forces you to look at exactly what you are deleting.', 'কোনো কিছু মানুষ না দেখে চলতে হবে, বা দ্ব্যর্থহীন হতে হবে—তখনই অ্যাবসোলিউট পাথ নিন। একটি bash স্ক্রিপ্ট, cron জব, systemd সার্ভিস বা কনফিগ ফাইলের ভেতরে কমান্ডটি কোন ডিরেক্টরিতে শুরু হবে তা নিশ্চিত নয়—তাই রিলেটিভ পাথ একটি অপেক্ষমাণ বাগ। /var/backups/db.sql বা /home/ada/app-এর মতো অ্যাবসোলিউট পাথ ওয়ার্কিং ডিরেক্টরি যাই হোক ঠিক একটি জিনিস বোঝায়, যা নিরীক্ষণহীন জবের ঠিক দরকারি নিশ্চয়তা। যেকোনো ধ্বংসাত্মক কমান্ডেও অ্যাবসোলিউট পাথ নিরাপদ: rm চালানোর আগে পুরো পাথ লিখলে ঠিক কী মুছছেন তা দেখতে বাধ্য হন।') },
      ],
    },
    {
      h: l('Common mistakes', 'সাধারণ ভুল'),
      blocks: [
        { list: [
          l('Using a relative path in a cron job or script, then being baffled when it works by hand but fails on schedule — cron often starts in your home directory, not where you tested. Use absolute paths, or cd to a known directory first.', 'একটি cron জব বা স্ক্রিপ্টে রিলেটিভ পাথ ব্যবহার করা, তারপর হাতে চললেও শিডিউলে ব্যর্থ হলে হতভম্ব হওয়া—cron প্রায়ই আপনার হোম ডিরেক্টরিতে শুরু হয়, আপনি যেখানে টেস্ট করেছেন সেখানে নয়। অ্যাবসোলিউট পাথ নিন, বা আগে একটি জানা ডিরেক্টরিতে cd করুন।'),
          l('Losing track of your current directory and running a destructive command in the wrong place. Always run pwd (or glance at your prompt) before rm or mv with relative paths.', 'বর্তমান ডিরেক্টরির হিসাব হারিয়ে ভুল জায়গায় একটি ধ্বংসাত্মক কমান্ড চালানো। রিলেটিভ পাথসহ rm বা mv-এর আগে সবসময় pwd চালান (বা প্রম্পটে চোখ বুলান)।'),
          l('Assuming ~ is expanded everywhere. The shell expands ~ for you, but inside quotes or in some config files it is treated as a literal tilde, not your home directory.', 'ধরে নেওয়া ~ সর্বত্র প্রসারিত হয়। শেল আপনার জন্য ~ প্রসারিত করে, তবে কোটের ভেতরে বা কিছু কনফিগ ফাইলে এটিকে আক্ষরিক টিল্ডা ধরা হয়, আপনার হোম ডিরেক্টরি নয়।'),
          l('Forgetting ./ when running a script in the current directory. deploy.sh gives "command not found"; ./deploy.sh runs it, because the current directory is not on your PATH by default.', 'বর্তমান ডিরেক্টরির একটি স্ক্রিপ্ট চালানোর সময় ./ ভুলে যাওয়া। deploy.sh দেয় "command not found"; ./deploy.sh চালায়, কারণ বর্তমান ডিরেক্টরি ডিফল্টে আপনার PATH-এ নেই।'),
        ] },
      ],
    },
    {
      h: l('Remember in one line', 'এক লাইনে মনে রাখুন'),
      blocks: [
        { list: [
          l('Absolute paths start at the root / and mean the same thing everywhere; relative paths start from your current directory.', 'অ্যাবসোলিউট পাথ রুট / থেকে শুরু ও সর্বত্র একই অর্থ; রিলেটিভ পাথ আপনার বর্তমান ডিরেক্টরি থেকে শুরু।'),
          l('. = here, .. = up one, ~ = home, cd - = previous directory; pwd tells you where you actually are.', '. = এখানে, .. = এক ধাপ ওপরে, ~ = হোম, cd - = আগের ডিরেক্টরি; pwd বলে আপনি আসলে কোথায়।'),
          l('Relative for quick interactive work; absolute for scripts, cron, and anything that must be unambiguous.', 'দ্রুত ইন্টারেক্টিভ কাজে রিলেটিভ; স্ক্রিপ্ট, cron ও দ্ব্যর্থহীন যেকোনো কিছুতে অ্যাবসোলিউট।'),
        ] },
      ],
    },
  ],

  // ── lx-file-ops · Creating & managing files ───────────────────────────────
  'lx-file-ops': [
    {
      h: l('What are the file management commands?', 'ফাইল ব্যবস্থাপনার কমান্ডগুলো কী?'),
      blocks: [
        { p: l('Everyday work in Linux means constantly making, copying, moving, and deleting files, and there is one small command for each verb. touch creates a new empty file (or updates the timestamp of one that already exists). mkdir makes a new directory. cp copies a file or folder to a second location, leaving the original where it was. mv moves a file or folder to a new location — and because renaming is just moving within the same folder, mv is also how you rename things. rm removes (deletes) a file, and with the right flag, whole directories. Together these five verbs cover almost all of the housekeeping you will ever do.', 'লিনাক্সে প্রতিদিনের কাজ মানে অনবরত ফাইল তৈরি, কপি, সরানো ও মোছা, আর প্রতিটি ক্রিয়ার জন্য একটি ছোট কমান্ড আছে। touch একটি নতুন খালি ফাইল তৈরি করে (বা আগে থেকে থাকা একটির টাইমস্ট্যাম্প আপডেট করে)। mkdir একটি নতুন ডিরেক্টরি বানায়। cp একটি ফাইল বা ফোল্ডার দ্বিতীয় জায়গায় কপি করে, মূলটি যেখানে ছিল সেখানে রেখে। mv একটি ফাইল বা ফোল্ডার নতুন জায়গায় সরায়—আর নাম বদলানো মানে একই ফোল্ডারের ভেতরে সরানো বলে, mv দিয়েই নাম বদলান। rm একটি ফাইল রিমুভ (মুছে) করে, আর সঠিক ফ্ল্যাগ দিয়ে পুরো ডিরেক্টরিও। এই পাঁচটি ক্রিয়া মিলে আপনার প্রায় সব গোছানোর কাজ ঢেকে ফেলে।') },
        { p: l('The reason these are separate, sharp tools rather than one big "file manager" is the Unix philosophy: each command does exactly one thing, so you can combine them freely and predictably. The cost of that sharpness is that the tools do precisely what you say with no confirmation and no undo. There is no recycle bin: when rm removes a file, the file is gone. That single fact shapes every safe habit in this lesson.', 'এগুলো একটি বড় "ফাইল ম্যানেজার" না হয়ে আলাদা, ধারালো টুল হওয়ার কারণ ইউনিক্স দর্শন: প্রতিটি কমান্ড ঠিক একটি কাজ করে, তাই আপনি এদের স্বাধীনভাবে ও পূর্বানুমেয়ভাবে মেলাতে পারেন। সেই ধারের মূল্য হলো টুলগুলো কোনো নিশ্চিতকরণ ও আনডু ছাড়া ঠিক যা বলেন তাই করে। কোনো রিসাইকেল বিন নেই: rm একটি ফাইল রিমুভ করলে ফাইলটি হারিয়ে যায়। এই একটি সত্যই এই পাঠের প্রতিটি নিরাপদ অভ্যাস গড়ে দেয়।') },
        { note: l('Think of these as the basic verbs of tidying a room: touch/mkdir put a new box on the shelf, cp photocopies a box, mv slides a box to another shelf or relabels it, and rm throws a box away — except this bin is emptied the instant you drop something in. There is no fishing it back out.', 'এগুলোকে একটি ঘর গোছানোর মৌলিক ক্রিয়া ভাবুন: touch/mkdir তাকে একটি নতুন বাক্স রাখে, cp একটি বাক্স ফটোকপি করে, mv একটি বাক্স অন্য তাকে সরায় বা নতুন লেবেল দেয়, আর rm একটি বাক্স ফেলে দেয়—শুধু এই বিন কিছু ফেলার সঙ্গে সঙ্গেই খালি হয়ে যায়। আর ফিরে তোলা যায় না।'), kind: 'tip' },
      ],
    },
    {
      h: l('How a typical file session flows', 'একটি সাধারণ ফাইল সেশন কীভাবে চলে'),
      blocks: [
        { steps: [
          l('Make a place for your work with mkdir, using -p to create any missing parent directories in one shot.', 'mkdir দিয়ে কাজের একটি জায়গা বানান, -p দিয়ে একবারে যেকোনো অনুপস্থিত প্যারেন্ট ডিরেক্টরি তৈরি করে।'),
          l('Create files with touch (or let an editor create them), then check the result with ls.', 'touch দিয়ে ফাইল তৈরি করুন (বা একটি এডিটরকে বানাতে দিন), তারপর ls দিয়ে ফল দেখুন।'),
          l('Duplicate what you want to keep safe with cp; add -r to copy an entire directory and its contents.', 'যা নিরাপদে রাখতে চান তা cp দিয়ে ডুপ্লিকেট করুন; পুরো একটি ডিরেক্টরি ও তার ভেতরের সব কপি করতে -r যোগ করুন।'),
          l('Reorganise or rename with mv, which both moves files between folders and renames them in place.', 'mv দিয়ে পুনর্বিন্যাস বা নাম বদলান, যা ফাইল ফোল্ডারের মধ্যে সরায় ও একই জায়গায় নাম বদলায়।'),
          l('Clean up with rm, reading the path carefully first — deletion is immediate and permanent.', 'rm দিয়ে পরিষ্কার করুন, আগে পাথ ভালো করে পড়ে—মোছা তাৎক্ষণিক ও স্থায়ী।'),
        ] },
        { code: `# Make a project folder (and any missing parents) at once
mkdir -p project/src
cd project

# Create files and confirm they exist
touch src/app.js README.md
ls -l                 # src/  README.md

# Copy a file, then copy a whole directory with -r
cp README.md README.bak
cp -r src src-backup

# Rename (mv within a folder) and move (mv into another folder)
mv README.md README.old      # rename in place
mv README.bak src/           # move the backup into src/

# Delete a file, then a directory with -r
rm README.old
rm -r src-backup             # removes the folder and everything in it`, caption: l('Run ls between steps to confirm each change did what you expected before moving on — especially before any rm.', 'পরবর্তীতে যাওয়ার আগে প্রতিটি পরিবর্তন প্রত্যাশামতো হয়েছে কিনা নিশ্চিত করতে ধাপগুলোর মাঝে ls চালান—বিশেষ করে যেকোনো rm-এর আগে।') },
      ],
    },
    {
      h: l('Key commands', 'মূল কমান্ড'),
      blocks: [
        { table: {
          head: [l('Goal', 'লক্ষ্য'), l('Command', 'কমান্ড')],
          rows: [
            [l('Create an empty file', 'খালি ফাইল তৈরি'), l('touch file', 'touch file')],
            [l('Make a directory (with parents)', 'ডিরেক্টরি তৈরি (প্যারেন্টসহ)'), l('mkdir -p dir', 'mkdir -p dir')],
            [l('Copy a directory (recursive)', 'ডিরেক্টরি কপি (রিকার্সিভ)'), l('cp -r a b', 'cp -r a b')],
            [l('Move or rename', 'সরান বা নাম বদল'), l('mv a b', 'mv a b')],
            [l('Delete a file', 'ফাইল মুছুন'), l('rm file', 'rm file')],
          ],
        } },
        { note: l('The interactive flag -i asks before overwriting or deleting: rm -i, cp -i, and mv -i all pause for a y/n. Many people alias rm to rm -i so a slip prompts instead of destroying. It is a cheap safety net worth turning on early.', 'ইন্টারেক্টিভ ফ্ল্যাগ -i ওভাররাইট বা মোছার আগে জিজ্ঞাসা করে: rm -i, cp -i ও mv -i সবই y/n-এর জন্য থামে। অনেকে rm-কে rm -i alias করে যাতে একটি ভুল ধ্বংস না করে প্রম্পট করে। এটি একটি সস্তা সেফটি-নেট যা আগেভাগে চালু করা মূল্যবান।'), kind: 'tip' },
      ],
    },
    {
      h: l('Understanding the important flags', 'গুরুত্বপূর্ণ ফ্ল্যাগগুলো বোঝা'),
      blocks: [
        { p: l('A few flags change these commands from "handy" to "essential", and knowing exactly what each does prevents most accidents.', 'কয়েকটি ফ্ল্যাগ এই কমান্ডগুলোকে "সুবিধাজনক" থেকে "অপরিহার্য" করে, আর প্রতিটি ঠিক কী করে জানলে বেশিরভাগ দুর্ঘটনা এড়ানো যায়।') },
        { table: {
          head: [l('Flag', 'ফ্ল্যাগ'), l('Command', 'কমান্ড'), l('What it does', 'কী করে')],
          rows: [
            [l('-p', '-p'), l('mkdir', 'mkdir'), l('Create parent directories as needed, and do not error if it already exists.', 'দরকারমতো প্যারেন্ট ডিরেক্টরি বানায়, ও আগে থেকে থাকলে এরর দেয় না।')],
            [l('-r (or -R)', '-r (বা -R)'), l('cp, rm', 'cp, rm'), l('Recursive — act on a directory and everything inside it. Required to copy or delete a folder.', 'রিকার্সিভ—একটি ডিরেক্টরি ও তার ভেতরের সবকিছুতে কাজ করে। একটি ফোল্ডার কপি বা মুছতে দরকার।')],
            [l('-i', '-i'), l('cp, mv, rm', 'cp, mv, rm'), l('Interactive — prompt before overwriting or deleting anything.', 'ইন্টারেক্টিভ—কিছু ওভাররাইট বা মোছার আগে প্রম্পট করে।')],
            [l('-f', '-f'), l('rm', 'rm'), l('Force — never prompt, ignore missing files. Powerful and dangerous; combine with -r only when sure.', 'ফোর্স—কখনো প্রম্পট করে না, অনুপস্থিত ফাইল উপেক্ষা করে। শক্তিশালী ও বিপজ্জনক; নিশ্চিত হলে তবেই -r-এর সঙ্গে মেলান।')],
          ],
        } },
        { note: l('rm -rf is the most dangerous everyday command in Linux: it forcibly deletes a directory and everything under it with no prompt and no recovery. Never run it on a path you have not read twice, and never on a variable like rm -rf $DIR/ without checking $DIR is set — an empty variable turns it into rm -rf /.', 'rm -rf লিনাক্সের প্রতিদিনের সবচেয়ে বিপজ্জনক কমান্ড: এটি কোনো প্রম্পট ও পুনরুদ্ধার ছাড়াই একটি ডিরেক্টরি ও তার নিচের সব জোর করে মোছে। দুবার না পড়া পাথে কখনো চালাবেন না, আর rm -rf $DIR/-এর মতো ভ্যারিয়েবলে $DIR সেট আছে কিনা যাচাই না করে কখনো নয়—একটি খালি ভ্যারিয়েবল একে rm -rf / বানিয়ে দেয়।'), kind: 'warn' },
      ],
    },
    {
      h: l('When and where to use them', 'কখন ও কোথায় ব্যবহার করবেন'),
      blocks: [
        { p: l('These commands come up in almost every terminal session, so the skill is less about when to use them and more about using them safely. Use mkdir -p whenever you set up a new project or need a nested folder path — it never complains about existing folders, which makes it safe in scripts. Use cp before any risky change as a cheap backup: cp config.yml config.yml.bak takes a second and can save an hour. Use mv both to organise files and to rename them, remembering there is no separate rename command in Linux.', 'এই কমান্ডগুলো প্রায় প্রতিটি টার্মিনাল সেশনে আসে, তাই দক্ষতা কখন ব্যবহার করবেন তার চেয়ে নিরাপদে ব্যবহার করা নিয়ে বেশি। নতুন প্রকল্প সেট করার সময় বা নেস্টেড ফোল্ডার পাথ দরকার হলে mkdir -p নিন—এটি বিদ্যমান ফোল্ডার নিয়ে কখনো অভিযোগ করে না, যা স্ক্রিপ্টে নিরাপদ করে। যেকোনো ঝুঁকিপূর্ণ পরিবর্তনের আগে সস্তা ব্যাকআপ হিসেবে cp নিন: cp config.yml config.yml.bak এক সেকেন্ড নেয় ও এক ঘণ্টা বাঁচাতে পারে। ফাইল গোছাতে ও নাম বদলাতে mv নিন, মনে রেখে লিনাক্সে আলাদা কোনো rename কমান্ড নেই।') },
        { p: l('Save rm for when you are certain, and build habits that make certainty easy: list the target with ls first, prefer spelling out names over sweeping patterns, and lean on the recycle-bin-free reality by keeping backups. On a shared server or as root, treat every rm and every mv that could overwrite as a moment to slow down, because there is no one to undo it for you. The best engineers are not the ones who never make mistakes — they are the ones whose habits keep a mistake from being catastrophic.', 'rm রাখুন যখন আপনি নিশ্চিত, আর নিশ্চয়তা সহজ করে এমন অভ্যাস গড়ুন: আগে ls দিয়ে টার্গেট দেখুন, প্রশস্ত প্যাটার্নের চেয়ে নাম লিখে দিন, আর রিসাইকেল-বিন-হীন বাস্তবতায় ব্যাকআপ রেখে ভরসা করুন। একটি শেয়ার্ড সার্ভারে বা root হিসেবে, প্রতিটি rm ও ওভাররাইট করতে পারে এমন প্রতিটি mv-কে থামার মুহূর্ত ভাবুন, কারণ আপনার হয়ে আনডু করার কেউ নেই। সেরা প্রকৌশলীরা তারা নন যারা কখনো ভুল করেন না—তারা তারাই যাদের অভ্যাস একটি ভুলকে বিপর্যয় হতে দেয় না।') },
      ],
    },
    {
      h: l('Common mistakes', 'সাধারণ ভুল'),
      blocks: [
        { list: [
          l('Running rm -rf on the wrong path and permanently deleting data with no recovery. Read the full path, run ls on it first, and never rush an rm -rf.', 'ভুল পাথে rm -rf চালিয়ে পুনরুদ্ধার ছাড়াই স্থায়ীভাবে ডেটা মোছা। পুরো পাথ পড়ুন, আগে তাতে ls চালান, আর rm -rf কখনো তাড়াহুড়ো করবেন না।'),
          l('Deleting with rm expecting a recycle bin. There is none — a removed file is gone, so keep backups of anything you cannot afford to lose.', 'রিসাইকেল বিন আশা করে rm দিয়ে মোছা। কোনোটি নেই—রিমুভ করা ফাইল হারায়, তাই যা হারানোর সাধ্য নেই তার ব্যাকআপ রাখুন।'),
          l('Forgetting -r, so cp or rm silently skips or errors on a directory: cp src dest copies nothing useful without -r.', '-r ভুলে যাওয়া, ফলে cp বা rm একটি ডিরেক্টরিতে নীরবে এড়ায় বা এরর দেয়: cp src dest -r ছাড়া কাজের কিছু কপি করে না।'),
          l('Overwriting a file by accident: cp a.txt b.txt or mv a.txt b.txt silently replaces b.txt if it exists. Use -i to be asked first.', 'ভুলবশত একটি ফাইল ওভাররাইট করা: cp a.txt b.txt বা mv a.txt b.txt b.txt থাকলে নীরবে বদলে দেয়। আগে জিজ্ঞাসা পেতে -i নিন।'),
          l('Trusting an unset variable in a path, like rm -rf $DIR/build when $DIR is empty — it expands to rm -rf /build. Always confirm variables are set.', 'পাথে একটি সেট-না-করা ভ্যারিয়েবলে ভরসা, যেমন $DIR খালি হলে rm -rf $DIR/build—এটি rm -rf /build হয়ে যায়। সবসময় নিশ্চিত করুন ভ্যারিয়েবল সেট আছে।'),
        ] },
      ],
    },
    {
      h: l('Remember in one line', 'এক লাইনে মনে রাখুন'),
      blocks: [
        { list: [
          l('touch makes files, mkdir makes directories, cp copies, mv moves/renames, rm deletes.', 'touch ফাইল বানায়, mkdir ডিরেক্টরি বানায়, cp কপি করে, mv সরায়/নাম বদলায়, rm মোছে।'),
          l('Use -p for nested directories and -r to copy or delete whole folders.', 'নেস্টেড ডিরেক্টরিতে -p ও পুরো ফোল্ডার কপি বা মুছতে -r নিন।'),
          l('rm has no undo and no trash can — read the path, prefer -i, and keep backups.', 'rm-এর কোনো আনডু বা ট্র্যাশ নেই—পাথ পড়ুন, -i নিন ও ব্যাকআপ রাখুন।'),
        ] },
      ],
    },
  ],

  // ── lx-find · Finding files ───────────────────────────────────────────────
  'lx-find': [
    {
      h: l('What are find, locate, and which?', 'find, locate ও which কী?'),
      blocks: [
        { p: l('Sooner or later you will know a file exists but not remember where it lives, and Linux gives you three different tools for three different kinds of search. find walks the filesystem tree live, right now, looking for files that match conditions you set — a name, a size, a modification time, a type. locate answers almost instantly by consulting a prebuilt index (a database of filenames) instead of scanning the disk. which is narrower: it tells you where an executable command lives by searching the directories on your PATH, answering "which program runs when I type this?"', 'আজ হোক কাল হোক আপনি জানবেন একটি ফাইল আছে কিন্তু কোথায় মনে থাকবে না, আর লিনাক্স তিন ধরনের সার্চের জন্য তিনটি ভিন্ন টুল দেয়। find এখনই, লাইভ, ফাইলসিস্টেম গাছ হাঁটে, আপনার সেট করা শর্তে মেলা ফাইল খুঁজে—একটি নাম, সাইজ, পরিবর্তনের সময়, ধরন। locate ডিস্ক স্ক্যান না করে একটি প্রি-বিল্ট ইনডেক্স (ফাইলনামের একটি ডেটাবেস) দেখে প্রায় তাৎক্ষণিক উত্তর দেয়। which সংকীর্ণ: এটি আপনার PATH-এর ডিরেক্টরি খুঁজে একটি এক্সিকিউটেবল কমান্ড কোথায় থাকে বলে, "আমি এটি টাইপ করলে কোন প্রোগ্রাম চলে?" উত্তর দিয়ে।') },
        { p: l('The problem all three solve is the same — "where is it?" — but they make different trade-offs. find is always accurate and up to the second because it looks in real time, but on a huge tree it can be slow. locate is dazzlingly fast but only as fresh as its last index rebuild, so a file created moments ago may not appear yet. which does not search your data at all; it answers a specific, common question about commands. Knowing which tool fits which question is the whole skill.', 'তিনটিই একই সমস্যা সমাধান করে—"এটি কোথায়?"—তবে ভিন্ন ট্রেড-অফ করে। find সবসময় নিখুঁত ও সেকেন্ড-পর্যন্ত হালনাগাদ কারণ এটি রিয়েল-টাইমে দেখে, তবে বড় গাছে ধীর হতে পারে। locate চোখ ধাঁধানো দ্রুত কিন্তু শুধু তার শেষ ইনডেক্স রিবিল্ড পর্যন্ত তাজা, তাই মুহূর্ত আগে তৈরি একটি ফাইল এখনো নাও দেখাতে পারে। which আপনার ডেটা মোটেও খোঁজে না; এটি কমান্ড নিয়ে একটি নির্দিষ্ট, প্রচলিত প্রশ্নের উত্তর দেয়। কোন টুল কোন প্রশ্নে মানায় জানাই পুরো দক্ষতা।') },
        { note: l('find is searching every room of the building by hand — thorough and current, but it takes time. locate is checking a printed catalogue someone made last night — instant, but it misses anything added since. which just asks the receptionist, "where is the tool called grep kept?"', 'find হলো ভবনের প্রতিটি ঘর হাতে খোঁজা—পুঙ্খানুপুঙ্খ ও হালনাগাদ, তবে সময় লাগে। locate হলো কেউ গতরাতে বানানো একটি ছাপানো ক্যাটালগ দেখা—তাৎক্ষণিক, তবে এরপর যোগ হওয়া কিছু মিস করে। which শুধু রিসেপশনিস্টকে জিজ্ঞাসা করে, "grep নামের টুলটি কোথায় রাখা?"'), kind: 'tip' },
      ],
    },
    {
      h: l('How find works, step by step', 'find কীভাবে কাজ করে, ধাপে ধাপে'),
      blocks: [
        { p: l('find reads left to right: first where to look, then the conditions to match, then optionally what to do with each match. Once you see that structure, its dense syntax becomes readable.', 'find বাঁ থেকে ডানে পড়ে: প্রথমে কোথায় দেখতে হবে, তারপর মেলানোর শর্ত, তারপর ঐচ্ছিকভাবে প্রতিটি ম্যাচ নিয়ে কী করতে হবে। এই কাঠামো একবার দেখলে এর ঘন সিনট্যাক্স পাঠযোগ্য হয়।') },
        { steps: [
          l('Give a starting directory — find . searches the current directory and everything below it; find /var/log starts there.', 'একটি শুরুর ডিরেক্টরি দিন—find . বর্তমান ডিরেক্টরি ও তার নিচের সব খোঁজে; find /var/log সেখানে শুরু করে।'),
          l('Add tests that files must pass: -name "*.log" for a name pattern, -type f for files only, -type d for directories.', 'ফাইলকে যে টেস্ট পাস করতে হবে তা যোগ করুন: নামের প্যাটার্নে -name "*.log", শুধু ফাইলে -type f, ডিরেক্টরিতে -type d।'),
          l('Narrow further with size or time if you like: -size +100M for large files, -mtime -7 for files changed in the last 7 days.', 'চাইলে সাইজ বা সময়ে আরও সংকীর্ণ করুন: বড় ফাইলে -size +100M, শেষ ৭ দিনে বদলানো ফাইলে -mtime -7।'),
          l('Optionally act on each match: -delete removes them, or -exec runs a command on each one. Print first to see what would be affected.', 'ঐচ্ছিকভাবে প্রতিটি ম্যাচে কাজ করুন: -delete এদের মোছে, বা -exec প্রতিটিতে একটি কমান্ড চালায়। কী প্রভাবিত হবে দেখতে আগে প্রিন্ট করুন।'),
        ] },
        { code: `# Find all .log files under the current directory
find . -name "*.log"
./app.log
./logs/error.log

# Only files (not directories) named exactly config.yml
find /etc -type f -name "config.yml"

# Files larger than 100 MB, and files changed in the last 7 days
find . -type f -size +100M
find . -type f -mtime -7

# Always PRINT before you DELETE — check the list first...
find . -name "*.tmp"
# ...then, only if the list looks right, remove them
find . -name "*.tmp" -delete`, caption: l('The quotes around "*.log" are essential: they hand the pattern to find intact, instead of letting the shell expand it first (see the wildcards lesson).', '"*.log"-এর চারপাশে কোট অপরিহার্য: এটি প্যাটার্নটি অক্ষত অবস্থায় find-কে দেয়, শেলকে আগে প্রসারিত করতে না দিয়ে (ওয়াইল্ডকার্ড পাঠ দেখুন)।') },
      ],
    },
    {
      h: l('Key commands', 'মূল কমান্ড'),
      blocks: [
        { table: {
          head: [l('Goal', 'লক্ষ্য'), l('Command', 'কমান্ড')],
          rows: [
            [l('Find by name pattern', 'নামের প্যাটার্নে খুঁজুন'), l('find . -name "*.log"', 'find . -name "*.log"')],
            [l('Find only files', 'শুধু ফাইল খুঁজুন'), l('find . -type f', 'find . -type f')],
            [l('Look up quickly via index', 'ইনডেক্সে দ্রুত খুঁজুন'), l('locate file', 'locate file')],
            [l('Where is a command?', 'একটি কমান্ড কোথায়?'), l('which ls', 'which ls')],
          ],
        } },
        { note: l('locate reads a database that a background job (updatedb) refreshes periodically, often once a day. If locate cannot find a file you just made, the index is simply stale — run sudo updatedb to rebuild it, or fall back to find, which never goes stale.', 'locate একটি ডেটাবেস পড়ে যা একটি ব্যাকগ্রাউন্ড জব (updatedb) নিয়মিত, প্রায়ই দিনে একবার, রিফ্রেশ করে। মাত্র বানানো একটি ফাইল locate খুঁজে না পেলে ইনডেক্সটি স্রেফ পুরনো—রিবিল্ড করতে sudo updatedb চালান, বা find-এ ফিরুন, যা কখনো পুরনো হয় না।'), kind: 'tip' },
      ],
    },
    {
      h: l('Which search tool for which job', 'কোন সার্চ টুল কোন কাজে'),
      blocks: [
        { table: {
          head: [l('Tool', 'টুল'), l('Searches', 'খোঁজে'), l('Speed & freshness', 'গতি ও তাজা'), l('Reach for it when', 'কখন নেবেন')],
          rows: [
            [l('find', 'find'), l('The live filesystem tree', 'জীবন্ত ফাইলসিস্টেম গাছ'), l('Slower, but always current', 'ধীর, তবে সবসময় হালনাগাদ'), l('You need accuracy, or to match by size/time/type, or to act on results.', 'নিখুঁততা লাগে, বা সাইজ/সময়/ধরনে মেলাতে, বা ফলে কাজ করতে হয়।')],
            [l('locate', 'locate'), l('A prebuilt filename index', 'একটি প্রি-বিল্ট ফাইলনাম ইনডেক্স'), l('Instant, but can be stale', 'তাৎক্ষণিক, তবে পুরনো হতে পারে'), l('You want a fast name lookup and the file is not brand-new.', 'দ্রুত নাম খোঁজা চান ও ফাইলটি একদম নতুন নয়।')],
            [l('which', 'which'), l('Directories on your PATH', 'আপনার PATH-এর ডিরেক্টরি'), l('Instant', 'তাৎক্ষণিক'), l('You want to know which executable a command name runs.', 'একটি কমান্ড নাম কোন এক্সিকিউটেবল চালায় জানতে চান।')],
          ],
        } },
      ],
    },
    {
      h: l('When and where to use each', 'কখন ও কোথায় কোনটি ব্যবহার করবেন'),
      blocks: [
        { p: l('Choose find whenever the answer must be exact or the search is about more than a name. It is the only one of the three that can match on size, modification time, permissions, or type, and the only one that can act on what it finds — deleting old logs, changing permissions in bulk, or feeding results to another command. Because it reads the disk live, it is also the right choice for anything created recently, or on a machine where the locate index is not maintained. The price is speed: pointing find at the whole root of a large server can take a while, so start it as deep in the tree as you can.', 'উত্তর নিখুঁত হতে হবে বা সার্চ নামের চেয়ে বেশি কিছু নিয়ে হলে find বাছুন। তিনটির মধ্যে একমাত্র এটিই সাইজ, পরিবর্তনের সময়, পারমিশন বা ধরনে মেলাতে পারে, আর একমাত্র এটিই যা খুঁজে পায় তাতে কাজ করতে পারে—পুরনো লগ মোছা, একসঙ্গে পারমিশন বদলানো, বা অন্য কমান্ডে ফল দেওয়া। এটি ডিস্ক লাইভ পড়ে বলে সম্প্রতি তৈরি কিছুর জন্য, বা locate ইনডেক্স রক্ষণাবেক্ষণ হয় না এমন মেশিনে এটিই সঠিক। মূল্য হলো গতি: একটি বড় সার্ভারের পুরো রুটে find দিলে সময় লাগতে পারে, তাই গাছের যত গভীরে পারেন সেখান থেকে শুরু করুন।') },
        { p: l('Reach for locate when you simply want to find a file by name and you value speed — "where did that nginx.conf end up?" on a system whose index is fresh. It is perfect for exploring an unfamiliar machine quickly, as long as you remember it can miss very new files. Reach for which in a completely different situation: when a command behaves unexpectedly and you want to know exactly which binary is running — for instance whether python is the system one at /usr/bin/python or a version inside a virtual environment. That single answer often explains a confusing bug.', 'নাম দিয়ে একটি ফাইল খুঁজতে চান ও গতি মূল্যবান হলে locate নিন—একটি তাজা ইনডেক্সের সিস্টেমে "সেই nginx.conf কোথায় গেল?"। একটি অচেনা মেশিন দ্রুত ঘুরে দেখতে এটি নিখুঁত, যতক্ষণ মনে রাখেন এটি খুব নতুন ফাইল মিস করতে পারে। একদম ভিন্ন পরিস্থিতিতে which নিন: যখন একটি কমান্ড অপ্রত্যাশিত আচরণ করে ও আপনি জানতে চান ঠিক কোন বাইনারি চলছে—যেমন python কি /usr/bin/python-এর সিস্টেমেরটি নাকি একটি ভার্চুয়াল এনভায়রনমেন্টের একটি সংস্করণ। সেই একটি উত্তরই প্রায়ই একটি বিভ্রান্তিকর বাগ ব্যাখ্যা করে।') },
      ],
    },
    {
      h: l('Common mistakes', 'সাধারণ ভুল'),
      blocks: [
        { list: [
          l('Trusting locate for a file created seconds ago, before its index has been updated. If it is not found, run find or sudo updatedb instead of assuming the file is gone.', 'ইনডেক্স আপডেটের আগে সেকেন্ড আগে তৈরি ফাইলের জন্য locate-এ ভরসা করা। খুঁজে না পেলে ফাইল হারিয়েছে ভাবার বদলে find বা sudo updatedb চালান।'),
          l('Forgetting to quote the pattern in find . -name *.log. Without quotes the shell may expand *.log first, and find then sees the wrong argument. Always quote it: -name "*.log".', 'find . -name *.log-এ প্যাটার্ন কোট করতে ভুলে যাওয়া। কোট ছাড়া শেল হয়তো আগে *.log প্রসারিত করবে, আর find তখন ভুল আর্গুমেন্ট দেখে। সবসময় কোট করুন: -name "*.log"।'),
          l('Running find . -name "*.tmp" -delete without printing the matches first. Always list what will be deleted before adding -delete — the removal is immediate and permanent.', 'আগে ম্যাচ প্রিন্ট না করে find . -name "*.tmp" -delete চালানো। -delete যোগের আগে সবসময় কী মুছবে তা তালিকা করুন—মোছা তাৎক্ষণিক ও স্থায়ী।'),
          l('Pointing find at / on a big server and waiting forever. Start from the most specific directory you can, and add -maxdepth to limit how deep it descends.', 'একটি বড় সার্ভারে / থেকে find চালিয়ে অনন্তকাল অপেক্ষা করা। যত নির্দিষ্ট ডিরেক্টরি পারেন সেখান থেকে শুরু করুন, ও কত গভীরে নামবে সীমিত করতে -maxdepth যোগ করুন।'),
        ] },
      ],
    },
    {
      h: l('Remember in one line', 'এক লাইনে মনে রাখুন'),
      blocks: [
        { list: [
          l('find scans the tree live (accurate, slower); locate reads an index (instant, can be stale); which finds a command on your PATH.', 'find গাছ লাইভ স্ক্যান করে (নিখুঁত, ধীর); locate একটি ইনডেক্স পড়ে (তাৎক্ষণিক, পুরনো হতে পারে); which আপনার PATH-এ একটি কমান্ড খুঁজে।'),
          l('Use find when accuracy or size/time/type filters matter or you need to act on results.', 'নিখুঁততা বা সাইজ/সময়/ধরন ফিল্টার লাগলে বা ফলে কাজ করতে হলে find নিন।'),
          l('Always quote name patterns, and always print before you -delete.', 'সবসময় নামের প্যাটার্ন কোট করুন, আর -delete-এর আগে সবসময় প্রিন্ট করুন।'),
        ] },
      ],
    },
  ],

  // ── lx-wildcards · Wildcards & globbing ───────────────────────────────────
  'lx-wildcards': [
    {
      h: l('What are wildcards and globbing?', 'ওয়াইল্ডকার্ড ও গ্লবিং কী?'),
      blocks: [
        { p: l('A wildcard is a special character that stands in for other characters in a filename, and globbing is the process the shell uses to expand those wildcards into a list of matching files. The crucial idea — the one that surprises every beginner — is that this expansion happens in the shell, before your command ever runs. When you type rm *.log, the command rm never sees the star. The shell first looks in the current directory, replaces *.log with the actual matching filenames, and only then hands rm a plain list like app.log error.log. The wildcard is a shorthand the shell fills in for you.', 'ওয়াইল্ডকার্ড হলো একটি বিশেষ অক্ষর যা একটি ফাইলনামে অন্য অক্ষরের বদলে দাঁড়ায়, আর গ্লবিং হলো সেই প্রক্রিয়া যা দিয়ে শেল সেই ওয়াইল্ডকার্ডকে মেলা ফাইলের তালিকায় প্রসারিত করে। গুরুত্বপূর্ণ ধারণা—যা প্রতিটি নতুনকে অবাক করে—এই প্রসারণ শেলে ঘটে, আপনার কমান্ড চলার আগে। আপনি rm *.log টাইপ করলে, rm কমান্ড তারকাটি কখনো দেখে না। শেল আগে বর্তমান ডিরেক্টরি দেখে, *.log-কে আসল মেলা ফাইলনাম দিয়ে বদলায়, তারপরই rm-কে app.log error.log-এর মতো একটি সাধারণ তালিকা দেয়। ওয়াইল্ডকার্ড একটি শর্টহ্যান্ড যা শেল আপনার জন্য ভরে দেয়।') },
        { p: l('The problem globbing solves is repetition. Without it, deleting fifty log files or copying every image would mean typing fifty names, and acting on "all files ending in .jpg" would be impossible to express. Wildcards let a single short pattern stand for many files at once, which is a huge saving — and, because that same pattern can quietly match far more than you intended, a real source of danger with destructive commands. Understanding exactly what a pattern expands to before you run it is the whole safety story of this lesson.', 'গ্লবিং যে সমস্যা সমাধান করে তা হলো পুনরাবৃত্তি। এটি ছাড়া পঞ্চাশটি লগ ফাইল মোছা বা প্রতিটি ছবি কপি করা মানে পঞ্চাশটি নাম টাইপ করা, আর ".jpg-তে শেষ হওয়া সব ফাইল"-এ কাজ করা প্রকাশই করা যেত না। ওয়াইল্ডকার্ড একটি ছোট প্যাটার্নকে একসঙ্গে অনেক ফাইলের বদলে দাঁড় করায়, যা বিশাল সাশ্রয়—আর, সেই একই প্যাটার্ন উদ্দেশ্যের চেয়ে অনেক বেশি নীরবে মেলাতে পারে বলে, ধ্বংসাত্মক কমান্ডে সত্যিকার বিপদের উৎস। চালানোর আগে একটি প্যাটার্ন ঠিক কীসে প্রসারিত হয় বোঝাই এই পাঠের পুরো নিরাপত্তা-কাহিনি।') },
        { note: l('A wildcard is like telling a helper "bring me every folder labelled with a date." You never list the folders yourself — the helper reads the shelf and gathers whatever matches. The catch: if you describe the label too loosely, the helper may cheerfully bring back far more than you meant.', 'ওয়াইল্ডকার্ড একজন সহকারীকে বলার মতো "তারিখ লেখা প্রতিটি ফোল্ডার এনে দাও।" আপনি নিজে ফোল্ডার তালিকা করেন না—সহকারী তাক দেখে যা মেলে জড়ো করে। ফাঁক: লেবেলটি খুব ঢিলাভাবে বললে সহকারী হাসিমুখে উদ্দেশ্যের চেয়ে অনেক বেশি এনে দিতে পারে।'), kind: 'tip' },
      ],
    },
    {
      h: l('The glob patterns and what they match', 'গ্লব প্যাটার্ন ও এরা কী মেলায়'),
      blocks: [
        { p: l('There are only a few wildcard characters, and together they cover almost every match you will need. Learn what each one means and you can describe files with precision.', 'ওয়াইল্ডকার্ড অক্ষর মাত্র কয়েকটি, আর এরা মিলে আপনার দরকারি প্রায় প্রতিটি ম্যাচ ঢাকে। প্রতিটির অর্থ শিখলে আপনি নির্ভুলভাবে ফাইল বর্ণনা করতে পারেন।') },
        { table: {
          head: [l('Pattern', 'প্যাটার্ন'), l('Matches', 'মেলায়'), l('Example → what it selects', 'উদাহরণ → যা বাছে')],
          rows: [
            [l('*', '*'), l('Any run of characters, including none.', 'যেকোনো অক্ষরের সারি, শূন্যসহ।'), l('*.txt → every name ending in .txt', '*.txt → .txt-তে শেষ হওয়া প্রতিটি নাম')],
            [l('?', '?'), l('Exactly one character.', 'ঠিক একটি অক্ষর।'), l('file?.txt → file1.txt, fileA.txt (not file10.txt)', 'file?.txt → file1.txt, fileA.txt (file10.txt নয়)')],
            [l('[abc]', '[abc]'), l('Any one character from the set.', 'সেট থেকে যেকোনো একটি অক্ষর।'), l('[abc].log → a.log, b.log, c.log', '[abc].log → a.log, b.log, c.log')],
            [l('[a-z] / [0-9]', '[a-z] / [0-9]'), l('Any one character in the range.', 'রেঞ্জের যেকোনো একটি অক্ষর।'), l('img[0-9].png → img0.png … img9.png', 'img[0-9].png → img0.png … img9.png')],
            [l('[!abc]', '[!abc]'), l('Any one character NOT in the set.', 'সেটে নেই এমন যেকোনো একটি অক্ষর।'), l('[!0-9]* → names not starting with a digit', '[!0-9]* → অঙ্ক দিয়ে শুরু না হওয়া নাম')],
          ],
        } },
        { code: `# Say the directory holds these files:
#   a.txt  b.txt  notes.md  img1.png  img2.png  img10.png

ls *.txt          # a.txt  b.txt          (* = any characters)
ls img?.png       # img1.png  img2.png    (? = exactly ONE char, so img10 is skipped)
ls img[0-9].png   # img1.png  img2.png    (a single digit 0-9)
ls [ab].txt       # a.txt  b.txt          (one char from the set a or b)

# A wildcard that matches nothing is normally left as-is by bash:
ls *.pdf          # ls: cannot access '*.pdf': No such file or directory`, caption: l('* is greedy and matches any length, while ? matches a single character — that is why img?.png selects img1.png but not img10.png.', '* লোভী ও যেকোনো দৈর্ঘ্য মেলায়, আর ? একটি অক্ষর মেলায়—এ কারণেই img?.png img1.png বাছে কিন্তু img10.png নয়।') },
      ],
    },
    {
      h: l('How globbing happens (shell first, command second)', 'গ্লবিং কীভাবে ঘটে (আগে শেল, পরে কমান্ড)'),
      blocks: [
        { steps: [
          l('You type a command containing a wildcard, for example ls *.png, and press Enter.', 'আপনি একটি ওয়াইল্ডকার্ডসহ কমান্ড টাইপ করেন, যেমন ls *.png, ও Enter চাপেন।'),
          l('The shell scans the current directory and replaces *.png with the matching filenames, sorted alphabetically.', 'শেল বর্তমান ডিরেক্টরি স্ক্যান করে ও *.png-কে মেলা ফাইলনাম দিয়ে বদলায়, বর্ণানুক্রমে সাজানো।'),
          l('The command actually runs with the expanded list — ls img1.png img2.png — so the command never sees the star at all.', 'কমান্ডটি আসলে প্রসারিত তালিকা দিয়ে চলে—ls img1.png img2.png—তাই কমান্ড তারকাটি মোটেও দেখে না।'),
          l('If nothing matches, bash by default leaves the pattern unchanged and passes the literal text through, which can surprise you.', 'কিছু না মিললে, bash ডিফল্টে প্যাটার্ন অপরিবর্তিত রাখে ও আক্ষরিক টেক্সট পাস করে, যা আপনাকে অবাক করতে পারে।'),
        ] },
        { note: l('This is exactly why you quote a pattern when you want the command, not the shell, to expand it. find . -name "*.log" quotes the star so find receives it whole and does its own matching across subdirectories; without quotes the shell would expand it against the current directory first and hand find the wrong thing.', 'এ কারণেই আপনি শেলকে নয়, কমান্ডকে প্রসারণ করাতে চাইলে একটি প্যাটার্ন কোট করেন। find . -name "*.log" তারকাটি কোট করে যাতে find একে অক্ষত পায় ও সাবডিরেক্টরিজুড়ে নিজের মতো মেলায়; কোট ছাড়া শেল আগে একে বর্তমান ডিরেক্টরির সঙ্গে প্রসারিত করে find-কে ভুল জিনিস দিত।'), kind: 'tip' },
      ],
    },
    {
      h: l('The danger: wildcards with rm', 'বিপদ: rm-এর সঙ্গে ওয়াইল্ডকার্ড'),
      blocks: [
        { p: l('Because a wildcard can match many files silently, combining one with a destructive command like rm is where careless globbing turns into lost data. The habit that saves you is trivial: preview the pattern with ls or echo first, read the list, and only then swap in rm. If ls *.tmp shows exactly the files you meant, rm *.tmp is safe; if it shows surprises, you just avoided a disaster.', 'একটি ওয়াইল্ডকার্ড নীরবে অনেক ফাইল মেলাতে পারে বলে, rm-এর মতো ধ্বংসাত্মক কমান্ডের সঙ্গে একে মেলানোই সেই জায়গা যেখানে অসাবধান গ্লবিং হারানো ডেটায় পরিণত হয়। যে অভ্যাস আপনাকে বাঁচায় তা তুচ্ছ: আগে ls বা echo দিয়ে প্যাটার্নটি প্রিভিউ করুন, তালিকা পড়ুন, তারপরই rm বসান। ls *.tmp ঠিক যে ফাইলগুলো চেয়েছিলেন দেখালে rm *.tmp নিরাপদ; অবাক করা কিছু দেখালে আপনি একটি বিপর্যয় এড়ালেন।') },
        { code: `# ALWAYS preview a destructive glob before running it
ls *.tmp          # read this list carefully first
# build.tmp  cache.tmp

# Only if the list is exactly what you meant:
rm *.tmp

# The classic catastrophe: an accidental space turns one command into two
rm * .tmp         # this is 'rm *' (delete EVERYTHING) then 'rm .tmp'
# There is no undo. Slow down and re-read before pressing Enter.`, caption: l('rm * .tmp with a stray space means "delete everything here" — a single typo away from rm *.tmp. Previewing with ls first would have caught it.', 'একটি ভুল স্পেসসহ rm * .tmp মানে "এখানকার সব মুছুন"—rm *.tmp থেকে একটিমাত্র টাইপো দূরে। আগে ls দিয়ে প্রিভিউ করলে এটি ধরা পড়ত।') },
        { note: l('rm * in the wrong directory deletes everything the glob expands to, with no confirmation and no recycle bin. Note that * does not match hidden files (names starting with a dot) by default, so it will not remove .env or .git — but it will remove every visible file in the folder. Run pwd and ls before any rm with a wildcard.', 'ভুল ডিরেক্টরিতে rm * গ্লব যা প্রসারিত করে তার সব মোছে, কোনো নিশ্চিতকরণ ও রিসাইকেল বিন ছাড়া। খেয়াল করুন * ডিফল্টে লুকানো ফাইল (ডট দিয়ে শুরু নাম) মেলায় না, তাই এটি .env বা .git মুছবে না—তবে ফোল্ডারের প্রতিটি দৃশ্যমান ফাইল মুছবে। ওয়াইল্ডকার্ডসহ যেকোনো rm-এর আগে pwd ও ls চালান।'), kind: 'warn' },
      ],
    },
    {
      h: l('When and where to use wildcards', 'কখন ও কোথায় ওয়াইল্ডকার্ড ব্যবহার করবেন'),
      blocks: [
        { p: l('Wildcards shine whenever you want to act on a group of files that share a naming pattern, which is constantly. Use * to select all files of a type — cp *.png images/ to gather every PNG, or ls *.log to see every log at a glance. Use ? and [ ] when you need finer control, such as picking report[1-3].csv but not report4.csv, or matching a fixed-width name where a single character varies. In interactive work these save enormous amounts of typing and let one line do what would otherwise be many.', 'একটি নামকরণ প্যাটার্ন শেয়ার করা ফাইলের দলে কাজ করতে চাইলেই ওয়াইল্ডকার্ড জ্বলে ওঠে, যা অনবরত ঘটে। একটি ধরনের সব ফাইল বাছতে * নিন—প্রতিটি PNG জড়ো করতে cp *.png images/, বা প্রতিটি লগ এক নজরে দেখতে ls *.log। সূক্ষ্ম নিয়ন্ত্রণ দরকার হলে ? ও [ ] নিন, যেমন report4.csv নয় বরং report[1-3].csv বাছা, বা একটি নির্দিষ্ট-প্রস্থ নাম মেলানো যেখানে একটিমাত্র অক্ষর বদলায়। ইন্টারেক্টিভ কাজে এগুলো বিপুল টাইপিং বাঁচায় ও এক লাইনে তা করায় যা নইলে অনেক হতো।') },
        { p: l('Quote a pattern instead of letting the shell expand it in two situations: when you want a command like find or grep to do the matching itself (find . -name "*.log"), and when you deliberately want the literal characters passed through. And whenever the command is destructive — rm, mv over existing files, or anything with -r — treat the wildcard as loaded: expand it first with ls, confirm the list, and only then run the real command. The same feature that saves you fifty keystrokes can, unread, delete fifty files.', 'দুটি পরিস্থিতিতে শেলকে প্রসারিত করতে না দিয়ে একটি প্যাটার্ন কোট করুন: যখন find বা grep-এর মতো একটি কমান্ডকে নিজেই মেলাতে চান (find . -name "*.log"), আর যখন ইচ্ছাকৃতভাবে আক্ষরিক অক্ষর পাস করাতে চান। আর কমান্ডটি ধ্বংসাত্মক হলেই—rm, বিদ্যমান ফাইলে mv, বা -r সহ কিছু—ওয়াইল্ডকার্ডকে লোড করা ভাবুন: আগে ls দিয়ে প্রসারিত করুন, তালিকা নিশ্চিত করুন, তারপরই আসল কমান্ড চালান। যে ফিচার আপনাকে পঞ্চাশটি কীস্ট্রোক বাঁচায়, না পড়ে তা পঞ্চাশটি ফাইল মুছতে পারে।') },
      ],
    },
    {
      h: l('Common mistakes', 'সাধারণ ভুল'),
      blocks: [
        { list: [
          l('Running rm * in the wrong directory and deleting everything the glob expanded to. Run pwd and preview with ls *first*; there is no undo.', 'ভুল ডিরেক্টরিতে rm * চালিয়ে গ্লব যা প্রসারিত করল তার সব মোছা। *আগে* pwd চালান ও ls দিয়ে প্রিভিউ করুন; কোনো আনডু নেই।'),
          l('A stray space in a destructive glob: rm * .tmp is read as rm * (delete everything) followed by rm .tmp. Re-read the whole line before Enter.', 'একটি ধ্বংসাত্মক গ্লবে একটি ভুল স্পেস: rm * .tmp পড়া হয় rm * (সব মুছুন) তারপর rm .tmp হিসেবে। Enter-এর আগে পুরো লাইনটি আবার পড়ুন।'),
          l('Expecting * to match hidden files. By default it does not match names starting with a dot, so .env and .gitignore are skipped — which surprises people both ways.', 'আশা করা * লুকানো ফাইল মেলাবে। ডিফল্টে এটি ডট দিয়ে শুরু নাম মেলায় না, তাই .env ও .gitignore বাদ পড়ে—যা মানুষকে দুই দিকেই অবাক করে।'),
          l('Forgetting to quote a pattern meant for find or grep, so the shell expands it against the current directory first and the command receives the wrong argument.', 'find বা grep-এর জন্য একটি প্যাটার্ন কোট করতে ভুলে যাওয়া, ফলে শেল আগে একে বর্তমান ডিরেক্টরির সঙ্গে প্রসারিত করে ও কমান্ড ভুল আর্গুমেন্ট পায়।'),
          l('Assuming a pattern that matches nothing is harmless. In default bash it is passed through literally, so a command may run on a file whose name is the pattern itself.', 'ধরে নেওয়া কিছু না মেলা প্যাটার্ন ক্ষতিহীন। ডিফল্ট bash-এ এটি আক্ষরিকভাবে পাস হয়, তাই একটি কমান্ড এমন ফাইলে চলতে পারে যার নাম প্যাটার্নটিই।'),
        ] },
      ],
    },
    {
      h: l('Remember in one line', 'এক লাইনে মনে রাখুন'),
      blocks: [
        { list: [
          l('The shell expands wildcards before the command runs: * = any characters, ? = one character, [abc] = one from a set.', 'কমান্ড চলার আগে শেল ওয়াইল্ডকার্ড প্রসারিত করে: * = যেকোনো অক্ষর, ? = একটি অক্ষর, [abc] = সেট থেকে একটি।'),
          l('Quote the pattern when you want find or grep — not the shell — to do the matching.', 'শেল নয়, find বা grep-কে মেলাতে চাইলে প্যাটার্ন কোট করুন।'),
          l('Before any rm with a wildcard, preview with ls and check pwd — a broad glob deletes far more than you meant, with no undo.', 'ওয়াইল্ডকার্ডসহ যেকোনো rm-এর আগে ls দিয়ে প্রিভিউ করুন ও pwd দেখুন—একটি প্রশস্ত গ্লব উদ্দেশ্যের চেয়ে অনেক বেশি মোছে, কোনো আনডু ছাড়া।'),
        ] },
      ],
    },
  ],

  // ── lx-view · Viewing files ───────────────────────────────────────────────
  'lx-view': [
    {
      h: l('What are cat, less, head, and tail?', 'cat, less, head ও tail কী?'),
      blocks: [
        { p: l('Much of Linux work is reading files — configs, logs, data, source code — and there are four core tools for it, each suited to a different size and purpose. cat prints an entire file straight to the terminal in one go. less opens a file in an interactive pager you can scroll, search, and page through without loading it all at once. head shows just the first lines of a file (ten by default), and tail shows just the last lines — and tail can also "follow" a file, printing new lines live as they are written. Between them, these four cover reading anything from a two-line note to a gigabyte log.', 'লিনাক্স কাজের অনেকটাই ফাইল পড়া—কনফিগ, লগ, ডেটা, সোর্স কোড—আর এর জন্য চারটি মূল টুল আছে, প্রতিটি ভিন্ন সাইজ ও উদ্দেশ্যে মানানসই। cat একটি পুরো ফাইল একবারে সরাসরি টার্মিনালে ছাপে। less একটি ফাইল একটি ইন্টারেক্টিভ পেজারে খোলে যা আপনি স্ক্রল, সার্চ ও পৃষ্ঠা ধরে দেখতে পারেন পুরোটা একসঙ্গে লোড না করে। head শুধু একটি ফাইলের প্রথম লাইন দেখায় (ডিফল্টে দশটি), আর tail শুধু শেষ লাইন দেখায়—আর tail একটি ফাইল "follow"-ও করতে পারে, লেখার সঙ্গে সঙ্গে নতুন লাইন লাইভ ছেপে। এরা মিলে দুই-লাইনের নোট থেকে এক-গিগাবাইট লগ পর্যন্ত যেকোনো কিছু পড়া ঢাকে।') },
        { p: l('The problem they solve together is matching the tool to the file. Dumping a huge file to the screen with cat is slow and useless — the top scrolls away before you can read it — while opening a two-line file in an interactive pager is overkill. Choosing the right viewer means you see what you need quickly: the whole of a small file, a controlled window into a big one, or just the newest lines of a log that is still growing. Picking wrongly, especially cat on something enormous or binary, can flood or even scramble your terminal.', 'এরা একসঙ্গে যে সমস্যা সমাধান করে তা হলো ফাইলের সঙ্গে টুল মেলানো। cat দিয়ে একটি বিশাল ফাইল স্ক্রিনে ঢালা ধীর ও অকেজো—পড়ার আগেই ওপর স্ক্রল হয়ে যায়—আর একটি দুই-লাইনের ফাইল একটি ইন্টারেক্টিভ পেজারে খোলা বাড়াবাড়ি। সঠিক ভিউয়ার বাছা মানে যা দরকার তা দ্রুত দেখা: একটি ছোট ফাইলের পুরোটা, একটি বড়টিতে নিয়ন্ত্রিত জানালা, বা এখনো বাড়তে থাকা একটি লগের শুধু নতুন লাইন। ভুল বাছা, বিশেষ করে বিশাল বা বাইনারি কিছুতে cat, আপনার টার্মিনাল প্লাবিত বা এমনকি এলোমেলো করতে পারে।') },
        { note: l('Think of reading a book. cat photocopies every page and hands you the stack at once. less lets you flip through calmly, one screen at a time, and search for a word. head reads only the introduction; tail reads only the final chapter — and tail -f keeps watching the last page as the author writes more.', 'একটি বই পড়া ভাবুন। cat প্রতিটি পৃষ্ঠা ফটোকপি করে পুরো তাড়া একবারে হাতে দেয়। less শান্তভাবে ওল্টাতে দেয়, একবারে এক স্ক্রিন, ও একটি শব্দ খুঁজতে দেয়। head শুধু ভূমিকা পড়ে; tail শুধু শেষ অধ্যায় পড়ে—আর tail -f লেখক আরও লিখলে শেষ পৃষ্ঠাটি দেখতে থাকে।'), kind: 'tip' },
      ],
    },
    {
      h: l('How to pick and use a viewer', 'একটি ভিউয়ার কীভাবে বাছবেন ও ব্যবহার করবেন'),
      blocks: [
        { steps: [
          l('For a short file you want to see all of, use cat — it prints everything at once, which is perfect for small configs and notes.', 'একটি ছোট ফাইলের পুরোটা দেখতে চাইলে cat নিন—এটি সব একবারে ছাপে, যা ছোট কনফিগ ও নোটে নিখুঁত।'),
          l('For a large file, open it with less and scroll: arrow keys or Space to move, / to search, q to quit. Nothing floods the screen.', 'একটি বড় ফাইলের জন্য less দিয়ে খুলুন ও স্ক্রল করুন: সরতে অ্যারো কী বা Space, খুঁজতে /, বেরোতে q। কিছুই স্ক্রিন প্লাবিত করে না।'),
          l('To sample the start of a file, use head; to sample the end, use tail. Add -n N to choose how many lines.', 'একটি ফাইলের শুরু নমুনায় head; শেষ নমুনায় tail নিন। কত লাইন তা বাছতে -n N যোগ করুন।'),
          l('To watch a log update live, use tail -f — it prints new lines as they arrive until you press Ctrl+C.', 'একটি লগ লাইভ আপডেট দেখতে tail -f নিন—Ctrl+C না চাপা পর্যন্ত এটি নতুন লাইন আসতেই ছাপে।'),
        ] },
        { code: `# See a whole small file at once
cat /etc/hostname

# Page calmly through a big file (q quits, / searches, Space pages down)
less /var/log/syslog

# Peek at just the top or bottom
head /etc/passwd            # first 10 lines (the default)
head -n 20 access.log       # first 20 lines
tail -n 50 access.log       # last 50 lines

# Follow a log live as new lines are written; Ctrl+C to stop
tail -f /var/log/nginx/access.log`, caption: l('tail -f is the everyday way to watch a service log while you reproduce a problem — the new lines appear the instant they are logged.', 'tail -f হলো একটি সমস্যা পুনরুৎপাদনের সময় একটি সার্ভিস লগ দেখার প্রতিদিনের উপায়—লগ হওয়ার সঙ্গে সঙ্গেই নতুন লাইন দেখা যায়।') },
      ],
    },
    {
      h: l('Key commands', 'মূল কমান্ড'),
      blocks: [
        { table: {
          head: [l('Goal', 'লক্ষ্য'), l('Command', 'কমান্ড')],
          rows: [
            [l('Show a whole (small) file', 'পুরো (ছোট) ফাইল দেখান'), l('cat file', 'cat file')],
            [l('Page through a big file', 'বড় ফাইল পৃষ্ঠা ধরে দেখুন'), l('less file', 'less file')],
            [l('Show the first lines', 'প্রথম লাইন দেখান'), l('head -n 20 file', 'head -n 20 file')],
            [l('Show / follow the last lines', 'শেষ লাইন দেখান / follow'), l('tail -f file', 'tail -f file')],
          ],
        } },
        { note: l('Inside less, a few keys do most of the work: Space and b page down and up, / searches forward (n for the next hit), G jumps to the end, g to the start, and q quits. Because less never loads the whole file into memory, it opens a multi-gigabyte log instantly.', 'less-এর ভেতরে কয়েকটি কী বেশিরভাগ কাজ করে: Space ও b নিচে-ওপরে পৃষ্ঠা যায়, / সামনে খোঁজে (পরের হিটে n), G শেষে লাফায়, g শুরুতে, আর q বেরোয়। less পুরো ফাইল মেমরিতে লোড করে না বলে এটি একটি মাল্টি-গিগাবাইট লগ তাৎক্ষণিক খোলে।'), kind: 'tip' },
      ],
    },
    {
      h: l('Which viewer for which file', 'কোন ফাইলে কোন ভিউয়ার'),
      blocks: [
        { table: {
          head: [l('Situation', 'পরিস্থিতি'), l('Use', 'ব্যবহার'), l('Why', 'কেন')],
          rows: [
            [l('Small file, want all of it', 'ছোট ফাইল, পুরোটা চান'), l('cat', 'cat'), l('Instant and simple; also feeds output into pipes and scripts.', 'তাৎক্ষণিক ও সরল; পাইপ ও স্ক্রিপ্টেও আউটপুট দেয়।')],
            [l('Large file, want to browse', 'বড় ফাইল, ঘুরে দেখতে চান'), l('less', 'less'), l('Scroll and search without flooding the terminal or loading it all.', 'টার্মিনাল প্লাবিত না করে বা পুরোটা লোড না করে স্ক্রল ও সার্চ।')],
            [l('Just the top (headers, first rows)', 'শুধু ওপর (হেডার, প্রথম সারি)'), l('head', 'head'), l('Quickly check the beginning without opening the whole file.', 'পুরো ফাইল না খুলে দ্রুত শুরুটা দেখা।')],
            [l('Just the end, or a live log', 'শুধু শেষ, বা একটি লাইভ লগ'), l('tail / tail -f', 'tail / tail -f'), l('The newest lines are usually what matter in logs; -f streams them live.', 'লগে সাধারণত নতুন লাইনই গুরুত্বপূর্ণ; -f এদের লাইভ স্ট্রিম করে।')],
          ],
        } },
      ],
    },
    {
      h: l('When and where to use each', 'কখন ও কোথায় কোনটি ব্যবহার করবেন'),
      blocks: [
        { p: l('Use cat for small files you want in full, and remember its second job: because it writes to standard output, it is the natural way to feed a file into a pipe, as in cat access.log | grep error. For anything large or unfamiliar, default to less — it protects your terminal, lets you search with /, and costs nothing to back out of with q. A good rule of thumb is that if you are not sure how big a file is, open it with less rather than cat, so a surprise gigabyte does not scroll past for a minute.', 'পুরোটা চান এমন ছোট ফাইলে cat নিন, ও এর দ্বিতীয় কাজটি মনে রাখুন: এটি স্ট্যান্ডার্ড আউটপুটে লেখে বলে একটি ফাইলকে পাইপে দেওয়ার স্বাভাবিক উপায়, যেমন cat access.log | grep error। বড় বা অচেনা যেকোনো কিছুতে ডিফল্ট less নিন—এটি আপনার টার্মিনাল রক্ষা করে, / দিয়ে সার্চ করতে দেয়, আর q দিয়ে বেরোতে কিছু খরচ নেই। একটি ভালো নিয়ম হলো একটি ফাইল কত বড় নিশ্চিত না হলে cat নয় less দিয়ে খুলুন, যাতে একটি অপ্রত্যাশিত গিগাবাইট এক মিনিট ধরে স্ক্রল না হয়।') },
        { p: l('head and tail come into their own with logs and large data files. Use head to glance at the column names of a CSV or the top of a config without opening it fully, and tail to read the most recent events in a log, which is almost always where the interesting action is. The real workhorse is tail -f: run it on a service log, then trigger the behaviour you are debugging in another window, and watch the errors appear in real time. It is the single most useful command for troubleshooting a running system, and it pairs naturally with journalctl -f for systemd services.', 'লগ ও বড় ডেটা ফাইলে head ও tail তাদের আসল রূপ পায়। একটি CSV-র কলাম নাম বা একটি কনফিগের ওপর পুরো না খুলে দেখতে head, আর একটি লগের সবচেয়ে সাম্প্রতিক ঘটনা পড়তে tail নিন, যেখানে প্রায় সবসময় আকর্ষণীয় কাজ থাকে। আসল পরিশ্রমী হলো tail -f: একটি সার্ভিস লগে চালান, তারপর আরেকটি উইন্ডোতে যে আচরণ ডিবাগ করছেন তা ট্রিগার করুন, ও এররগুলো রিয়েল-টাইমে আসতে দেখুন। একটি চলমান সিস্টেম ট্রাবলশুট করার সবচেয়ে কাজের কমান্ড এটি, আর systemd সার্ভিসে journalctl -f-এর সঙ্গে স্বাভাবিকভাবে মেলে।') },
      ],
    },
    {
      h: l('Common mistakes', 'সাধারণ ভুল'),
      blocks: [
        { list: [
          l('Running cat on a huge file and freezing your terminal as thousands of lines scroll past uselessly. Use less for anything you are not sure is small.', 'একটি বিশাল ফাইলে cat চালিয়ে হাজার হাজার লাইন অকেজোভাবে স্ক্রল হতে হতে টার্মিনাল জমিয়ে ফেলা। ছোট কিনা নিশ্চিত নন এমন কিছুতে less নিন।'),
          l('cat on a binary file (an image, an executable), which prints control characters that can garble or lock up your terminal. If it happens, run reset to restore it.', 'একটি বাইনারি ফাইলে (ছবি, এক্সিকিউটেবল) cat, যা কন্ট্রোল অক্ষর ছাপে যা টার্মিনাল এলোমেলো বা জমিয়ে দিতে পারে। ঘটলে ঠিক করতে reset চালান।'),
          l('Forgetting how to leave less and closing the whole terminal in a panic. The exit key is simply q.', 'less থেকে কীভাবে বেরোবেন ভুলে গিয়ে আতঙ্কে পুরো টার্মিনাল বন্ধ করা। বেরোনোর কী স্রেফ q।'),
          l('Using cat to read a log that is still being written and getting a frozen snapshot. To watch it update, use tail -f instead.', 'এখনো লেখা হচ্ছে এমন একটি লগ পড়তে cat ব্যবহার করে একটি জমে-থাকা স্ন্যাপশট পাওয়া। আপডেট দেখতে বদলে tail -f নিন।'),
        ] },
      ],
    },
    {
      h: l('Remember in one line', 'এক লাইনে মনে রাখুন'),
      blocks: [
        { list: [
          l('cat dumps a whole file, less pages through it interactively, head shows the top, tail shows or follows the end.', 'cat পুরো ফাইল ঢালে, less ইন্টারেক্টিভভাবে পৃষ্ঠা ধরে দেখায়, head ওপর দেখায়, tail শেষ দেখায় বা follow করে।'),
          l('Default to less for big or unknown files; keep cat for small files and for feeding pipes.', 'বড় বা অজানা ফাইলে ডিফল্ট less; ছোট ফাইল ও পাইপে দেওয়ার জন্য cat রাখুন।'),
          l('tail -f is the go-to for watching a log live; press q to leave less and Ctrl+C to stop tail -f.', 'একটি লগ লাইভ দেখতে tail -f-ই ভরসা; less থেকে বেরোতে q ও tail -f থামাতে Ctrl+C চাপুন।'),
        ] },
      ],
    },
  ],
}
