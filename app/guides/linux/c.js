// Deep, bilingual (English / Bangla) teaching guides for the Linux course —
// Text processing (redirection, grep, sed/awk, sort & uniq) and the multi-user model.
// Shape mirrors app/course-guides.js and app/guides/git/a.js: each guide is an array of
// sections { h, blocks }, rendered by GuideBlock in app/LearningApp.js. Block types:
// { p }, { list }, { steps }, { table:{head,rows} }, { note, kind }, { code, caption }.
// Facts (definitions, analogies, commands, trade-offs, mistakes) come from app/courses/linux.js.

const l = (en, bn) => ({ en, bn })

export default {
  // ── lx-redirection · Redirection & pipes ──────────────────────────────────
  'lx-redirection': [
    {
      h: l('What are redirection and pipes?', 'রিডাইরেকশন ও পাইপ কী?'),
      blocks: [
        { p: l('Every command in Linux reads from an input and writes to an output. By default the input (called stdin) is your keyboard and the output (called stdout) is your terminal screen. Redirection and pipes let you rewire those connections: instead of typing into a command and reading its result on screen, you can send a command’s output straight into a file, feed a file into a command, or connect one command’s output to the next command’s input. This tiny idea is the reason the Linux command line feels so powerful.', 'লিনাক্সে প্রতিটি কমান্ড একটি ইনপুট থেকে পড়ে ও একটি আউটপুটে লেখে। ডিফল্টে ইনপুট (যাকে stdin বলে) আপনার কীবোর্ড আর আউটপুট (যাকে stdout বলে) আপনার টার্মিনাল স্ক্রিন। রিডাইরেকশন ও পাইপ এই সংযোগগুলো নতুন করে জোড়া লাগাতে দেয়: কমান্ডে টাইপ করে স্ক্রিনে ফল দেখার বদলে আপনি কমান্ডের আউটপুট সরাসরি একটি ফাইলে পাঠাতে পারেন, একটি ফাইল কমান্ডে দিতে পারেন, অথবা এক কমান্ডের আউটপুট পরের কমান্ডের ইনপুটে যুক্ত করতে পারেন। এই ছোট্ট ধারণাই লিনাক্স কমান্ড লাইনকে এত শক্তিশালী করে।') },
        { p: l('Redirection covers the file operators: > sends output into a file (overwriting it), >> appends output to the end of a file, and < feeds a file into a command as its input. A pipe, written |, is different — it connects two live commands so that whatever the first prints becomes the input of the second, without ever touching the disk. The problem all of this solves is combination: rather than one giant program that does everything, Linux gives you dozens of small tools and lets you chain them into exactly the workflow you need.', 'রিডাইরেকশন ফাইল অপারেটরগুলো ঢাকে: > আউটপুট একটি ফাইলে পাঠায় (ওভাররাইট করে), >> আউটপুট ফাইলের শেষে যোগ করে, আর < একটি ফাইলকে কমান্ডের ইনপুট হিসেবে দেয়। পাইপ, যা | দিয়ে লেখা হয়, ভিন্ন—এটি দুটি চলমান কমান্ড যুক্ত করে যাতে প্রথমটি যা ছাপে তা দ্বিতীয়টির ইনপুট হয়, ডিস্ক স্পর্শ না করেই। এসব যে সমস্যা সমাধান করে তা হলো সংমিশ্রণ: সবকিছু করা একটি বিশাল প্রোগ্রামের বদলে লিনাক্স আপনাকে অনেক ছোট টুল দেয় ও ঠিক যে ওয়ার্কফ্লো দরকার তাতে চেইন করতে দেয়।') },
        { note: l('Think of plumbing. A pipe connects one tool’s output hose to the next tool’s input, so water flows straight through. Redirection with > pours that water into a bucket (a file) instead, and < pumps water out of a bucket back into a tool.', 'পাইপলাইন ভাবুন। পাইপ এক টুলের আউটপুট নলকে পরের টুলের ইনপুট নলে যুক্ত করে, তাই পানি সোজা বয়ে যায়। > দিয়ে রিডাইরেকশন সেই পানি বদলে একটি বালতিতে (একটি ফাইলে) ঢালে, আর < বালতি থেকে পানি টেনে আবার টুলে দেয়।'), kind: 'tip' },
      ],
    },
    {
      h: l('The three standard streams', 'তিনটি স্ট্যান্ডার্ড স্ট্রিম'),
      blocks: [
        { p: l('To use redirection well, it helps to know that every command is wired with exactly three streams, each with a number. Normal results go out on stdout, error messages go out on a separate stream called stderr, and input arrives on stdin. Keeping stdout and stderr separate is deliberate: it means you can save real results to a file while still seeing errors on screen, or the other way round.', 'রিডাইরেকশন ভালোভাবে ব্যবহার করতে জানা দরকার যে প্রতিটি কমান্ড ঠিক তিনটি স্ট্রিম দিয়ে যুক্ত, প্রতিটির একটি নম্বর আছে। সাধারণ ফল যায় stdout-এ, এরর বার্তা যায় stderr নামের আলাদা স্ট্রিমে, আর ইনপুট আসে stdin-এ। stdout ও stderr আলাদা রাখা ইচ্ছাকৃত: এর মানে আপনি আসল ফল ফাইলে সেভ করতে করতেও স্ক্রিনে এরর দেখতে পারেন, বা উল্টোটা।') },
        { table: {
          head: [l('Stream', 'স্ট্রিম'), l('Number', 'নম্বর'), l('Default target', 'ডিফল্ট গন্তব্য')],
          rows: [
            [l('stdin', 'stdin'), l('0', '০'), l('Your keyboard — where input comes from.', 'আপনার কীবোর্ড—যেখান থেকে ইনপুট আসে।')],
            [l('stdout', 'stdout'), l('1', '১'), l('The screen — where normal output goes.', 'স্ক্রিন—যেখানে সাধারণ আউটপুট যায়।')],
            [l('stderr', 'stderr'), l('2', '২'), l('The screen — where error messages go.', 'স্ক্রিন—যেখানে এরর বার্তা যায়।')],
          ],
        } },
        { p: l('Because stderr has its own number (2), you can redirect it on its own with 2>, or merge it into stdout with 2>&1. That is how you write both results and errors into one log file, which is common when running a job unattended.', 'stderr-এর নিজস্ব নম্বর (২) থাকায় আপনি 2> দিয়ে একে আলাদাভাবে রিডাইরেক্ট করতে পারেন, বা 2>&1 দিয়ে stdout-এর সঙ্গে মেলাতে পারেন। এভাবেই ফল ও এরর দুটোই এক লগ ফাইলে লেখা হয়, যা কোনো কাজ অযত্নে চালানোর সময় সাধারণ।') },
      ],
    },
    {
      h: l('How redirection and pipes work', 'রিডাইরেকশন ও পাইপ কীভাবে কাজ করে'),
      blocks: [
        { steps: [
          l('Use > to capture a command’s output into a file. If the file exists, its contents are replaced entirely.', 'কমান্ডের আউটপুট একটি ফাইলে ধরতে > ব্যবহার করুন। ফাইল থাকলে তার সব বিষয়বস্তু পুরোপুরি বদলে যায়।'),
          l('Use >> instead when you want to add to a file without destroying what is already in it.', 'ফাইলে যা আছে তা নষ্ট না করে যোগ করতে চাইলে বদলে >> ব্যবহার করুন।'),
          l('Use < to hand a file to a command as its input, in place of typing at the keyboard.', 'কীবোর্ডে টাইপ করার বদলে একটি ফাইলকে কমান্ডের ইনপুট হিসেবে দিতে < ব্যবহার করুন।'),
          l('Use | to connect commands: the left command’s stdout becomes the right command’s stdin, and you can chain as many as you like.', 'কমান্ড যুক্ত করতে | ব্যবহার করুন: বাঁ কমান্ডের stdout ডান কমান্ডের stdin হয়, আর আপনি যত খুশি চেইন করতে পারেন।'),
          l('Combine them freely — pipe several tools together and redirect the final result into a file at the end.', 'অবাধে মেলান—কয়েকটি টুল একসঙ্গে পাইপ করে শেষে চূড়ান্ত ফল একটি ফাইলে রিডাইরেক্ট করুন।'),
        ] },
        { code: `# > sends stdout into a file, creating or OVERWRITING it
echo "hello" > greeting.txt
cat greeting.txt                 # hello

# >> appends, keeping whatever is already there
echo "world" >> greeting.txt
cat greeting.txt                 # hello / world (two lines)

# | (pipe) feeds one command's stdout into the next command's stdin
cat /etc/passwd | grep bash | wc -l      # count login shells

# < feeds a file into a command as its stdin
wc -l < greeting.txt             # 2

# Chain pipes, then redirect the final result into a file
cat access.log | grep 404 | sort | uniq -c > errors.txt

# 2> captures only errors; 2>&1 merges errors into the same place
find / -name "*.conf" 2> /dev/null > configs.txt`, caption: l('Read a pipeline left to right: each | passes the previous output onward, and a final > drops the result into a file.', 'একটি পাইপলাইন বাঁ থেকে ডানে পড়ুন: প্রতিটি | আগের আউটপুট পরে পাঠায়, আর শেষের > ফলটি একটি ফাইলে ফেলে।') },
      ],
    },
    {
      h: l('Key operators', 'মূল অপারেটর'),
      blocks: [
        { table: {
          head: [l('Goal', 'লক্ষ্য'), l('Command', 'কমান্ড')],
          rows: [
            [l('Save output to a file (overwrite)', 'আউটপুট ফাইলে সেভ (ওভাররাইট)'), l('command > file', 'command > file')],
            [l('Append output to a file', 'ফাইলে আউটপুট যোগ করুন'), l('command >> file', 'command >> file')],
            [l('Feed a file as input', 'ফাইলকে ইনপুট দিন'), l('command < file', 'command < file')],
            [l('Pipe output into another command', 'আউটপুট অন্য কমান্ডে পাইপ'), l('cmd1 | cmd2', 'cmd1 | cmd2')],
            [l('Redirect errors only', 'শুধু এরর রিডাইরেক্ট'), l('command 2> errors.log', 'command 2> errors.log')],
            [l('Merge errors into output', 'এরর আউটপুটে মেলান'), l('command > all.log 2>&1', 'command > all.log 2>&1')],
          ],
        } },
        { note: l('The > operator overwrites its target file the instant the command starts, before it even runs — silently, with no confirmation. Run mydata > mydata.txt on a file you cared about and its old contents are already gone. When in doubt, use >> to append, or write to a new filename first.', '> অপারেটর কমান্ড শুরু হওয়ার মুহূর্তেই, চলার আগেই, তার টার্গেট ফাইল ওভাররাইট করে—নীরবে, কোনো নিশ্চিতকরণ ছাড়াই। যে ফাইলের কথা ভাবছিলেন তাতে mydata > mydata.txt চালালে তার পুরনো বিষয়বস্তু আগেই চলে গেছে। সন্দেহ হলে যোগ করতে >> নিন, বা আগে একটি নতুন ফাইলনামে লিখুন।'), kind: 'warn' },
      ],
    },
    {
      h: l('When and where to use them', 'কখন ও কোথায় ব্যবহার করবেন'),
      blocks: [
        { p: l('Reach for redirection whenever you want to keep a command’s output instead of just glancing at it: saving a report, capturing a long list of files, or writing a program’s logs to disk. Use >> for anything that grows over time — a running log, a notes file, a results file you add to across many runs — because it never erases earlier entries. Use < mostly with older tools that expect input on stdin, though in practice pipes cover most of the same ground.', 'কমান্ডের আউটপুট শুধু একনজর দেখার বদলে রাখতে চাইলেই রিডাইরেকশন নিন: একটি রিপোর্ট সেভ, একটি লম্বা ফাইল তালিকা ধরা, বা একটি প্রোগ্রামের লগ ডিস্কে লেখা। সময়ের সঙ্গে যা বাড়ে তাতে >> নিন—একটি চলমান লগ, একটি নোট ফাইল, বহু রানে যোগ করা একটি ফল ফাইল—কারণ এটি আগের এন্ট্রি কখনো মোছে না। < বেশিরভাগ পুরনো টুলের সঙ্গে ব্যবহার করুন যারা stdin-এ ইনপুট আশা করে, যদিও বাস্তবে পাইপ প্রায় একই কাজ ঢাকে।') },
        { p: l('Pipes are the everyday workhorse. The moment you find yourself saving output to a temporary file just so the next command can read it, a pipe removes the middle step. Real pipelines look like cat access.log | grep 500 | wc -l (how many server errors?) or ps aux | grep node (is my app running?). Each tool does one small job, and the pipe glues them into an answer — this compose-small-tools habit is the heart of working productively in a shell.', 'পাইপ প্রতিদিনের কর্মী। যখনই দেখবেন শুধু পরের কমান্ডকে পড়ানোর জন্য আউটপুট একটি অস্থায়ী ফাইলে সেভ করছেন, একটি পাইপ মাঝের ধাপটি সরিয়ে দেয়। আসল পাইপলাইন দেখতে হয় cat access.log | grep 500 | wc -l (কতটি সার্ভার এরর?) বা ps aux | grep node (আমার অ্যাপ চলছে?)-এর মতো। প্রতিটি টুল একটি ছোট কাজ করে, আর পাইপ এদের একটি উত্তরে জোড়ে—ছোট-টুল-মেলানোর এই অভ্যাসই শেলে দক্ষভাবে কাজ করার প্রাণ।') },
      ],
    },
    {
      h: l('Common mistakes', 'সাধারণ ভুল'),
      blocks: [
        { list: [
          l('Using > when you meant >> and wiping out a file you intended to add to. Once overwritten, the old contents are gone — there is no undo.', '>>-এর বদলে > ব্যবহার করে যে ফাইলে যোগ করার কথা ছিল তা মুছে ফেলা। একবার ওভাররাইট হলে পুরনো বিষয়বস্তু চলে গেছে—কোনো undo নেই।'),
          l('Reading from and writing to the same file in one command, like sort file > file. The shell empties the file before sort reads it, so you lose the data. Write to a new name, then rename.', 'একই কমান্ডে একটি ফাইল থেকে পড়া ও তাতে লেখা, যেমন sort file > file। sort পড়ার আগেই শেল ফাইলটি খালি করে, তাই ডেটা হারায়। নতুন নামে লিখুন, তারপর নাম বদলান।'),
          l('Expecting > to capture error messages. It only captures stdout; errors keep printing to the screen until you add 2> or 2>&1.', '> এরর বার্তা ধরবে ভাবা। এটি শুধু stdout ধরে; 2> বা 2>&1 যোগ না করা পর্যন্ত এরর স্ক্রিনেই ছাপা হতে থাকে।'),
          l('Piping into a command that does not read stdin (like most uses of ls) and wondering why nothing happens. Not every command accepts piped input.', 'stdin না পড়া কমান্ডে (যেমন ls-এর বেশিরভাগ ব্যবহার) পাইপ করে ভাবা কেন কিছু হচ্ছে না। প্রতিটি কমান্ড পাইপ করা ইনপুট নেয় না।'),
        ] },
      ],
    },
    {
      h: l('Remember in one line', 'এক লাইনে মনে রাখুন'),
      blocks: [
        { list: [
          l('> overwrites a file, >> appends to it, < feeds a file in, and | connects one command’s output to the next.', '> ফাইল ওভাররাইট করে, >> যোগ করে, < ফাইল ইনপুট দেয়, আর | এক কমান্ডের আউটপুট পরেরটিতে যুক্ত করে।'),
          l('stdout (1) is normal output, stderr (2) is errors — redirect them separately or merge with 2>&1.', 'stdout (১) সাধারণ আউটপুট, stderr (২) এরর—আলাদা রিডাইরেক্ট করুন বা 2>&1 দিয়ে মেলান।'),
          l('Pipes let small tools combine into powerful workflows; just never point > at a file you cannot afford to lose.', 'পাইপ ছোট টুলকে শক্তিশালী ওয়ার্কফ্লোতে মেলায়; শুধু যে ফাইল হারানো যাবে না তাতে > তাক করবেন না।'),
        ] },
      ],
    },
  ],

  // ── lx-grep · Searching text with grep ────────────────────────────────────
  'lx-grep': [
    {
      h: l('What is grep?', 'grep কী?'),
      blocks: [
        { p: l('grep is a tool that searches text and prints only the lines that match a pattern. You give it something to look for and something to look through — a file, several files, or the output of another command — and it hands back just the matching lines, hiding everything else. The name comes from an old editor command, g/re/p (globally search a regular expression and print), which is exactly what it still does.', 'grep একটি টুল যা টেক্সট খোঁজে ও শুধু প্যাটার্নের সঙ্গে মেলা লাইনগুলো ছাপে। আপনি একে খোঁজার কিছু ও খোঁজার জায়গা দেন—একটি ফাইল, কয়েকটি ফাইল, বা অন্য কমান্ডের আউটপুট—আর এটি শুধু মেলা লাইনগুলো ফেরত দেয়, বাকি সব লুকিয়ে। নামটি এসেছে একটি পুরনো এডিটর কমান্ড g/re/p (globally search a regular expression and print) থেকে, যা আজও এটি ঠিক তাই করে।') },
        { p: l('The problem grep solves is finding the needle in the haystack. A log file can have a million lines, but you only care about the ten that mention an error. A codebase can have thousands of files, but you need the one place a function is defined. Scrolling by eye does not scale; grep answers these questions in a fraction of a second, and because it reads from stdin it slots straight into pipelines with a |.', 'grep যে সমস্যা সমাধান করে তা হলো খড়ের গাদায় সুঁই খোঁজা। একটি লগ ফাইলে দশ লক্ষ লাইন থাকতে পারে, কিন্তু আপনার দরকার শুধু এরর উল্লেখ করা দশটি। একটি কোডবেসে হাজারো ফাইল থাকতে পারে, কিন্তু আপনার দরকার যেখানে একটি ফাংশন সংজ্ঞায়িত সেই একটি জায়গা। চোখে স্ক্রল করা কুলোয় না; grep এসব প্রশ্নের উত্তর দেয় সেকেন্ডের ভগ্নাংশে, আর stdin থেকে পড়ে বলে | দিয়ে সরাসরি পাইপলাইনে বসে।') },
        { note: l('Think of grep as a highlighter for your terminal: run it over a pile of text and it keeps only the lines you care about, quietly setting the rest aside.', 'grep-কে ভাবুন আপনার টার্মিনালের একটি হাইলাইটার হিসেবে: একগাদা টেক্সটের ওপর চালান আর এটি শুধু আপনার দরকারি লাইন রাখে, বাকিটা নীরবে সরিয়ে রাখে।'), kind: 'tip' },
      ],
    },
    {
      h: l('How grep works', 'grep কীভাবে কাজ করে'),
      blocks: [
        { steps: [
          l('You give grep a pattern and a source: grep pattern file, or pipe another command’s output into it.', 'আপনি grep-কে একটি প্যাটার্ন ও একটি উৎস দেন: grep pattern file, বা অন্য কমান্ডের আউটপুট এতে পাইপ করেন।'),
          l('grep reads the input one line at a time and tests each line against your pattern.', 'grep ইনপুট একবারে এক লাইন করে পড়ে ও প্রতিটি লাইন আপনার প্যাটার্নের সঙ্গে যাচাই করে।'),
          l('Every line that matches is printed; every line that does not is skipped.', 'যে প্রতিটি লাইন মেলে তা ছাপা হয়; যেটি মেলে না তা বাদ পড়ে।'),
          l('Flags change the rules: -i ignores case, -v inverts the match, -r searches whole directories, -n adds line numbers, and -c prints a count.', 'ফ্ল্যাগ নিয়ম বদলায়: -i কেস উপেক্ষা করে, -v ম্যাচ উল্টায়, -r পুরো ডিরেক্টরি খোঁজে, -n লাইন নম্বর যোগ করে, আর -c গণনা ছাপে।'),
        ] },
        { code: `# Plain search: print lines that contain "error"
grep error app.log

# -i ignores case, so error, Error and ERROR all match
grep -i error app.log

# Pipe another command's output through grep to filter it live
cat /etc/passwd | grep -i bash

# -r searches recursively through every file under a directory
grep -r "TODO" ./src

# -v inverts the match: print the lines that do NOT match
grep -v "^#" /etc/ssh/sshd_config     # hide comment lines

# Flags combine: -c counts, so this counts case-insensitive warnings
grep -ic warning app.log`, caption: l('-i, -r and -v are the three flags you will reach for most; they stack freely with each other and with -n or -c.', '-i, -r ও -v হলো তিনটি ফ্ল্যাগ যা সবচেয়ে বেশি লাগবে; এরা একে অপরের সঙ্গে ও -n বা -c-এর সঙ্গে অবাধে মেলে।') },
      ],
    },
    {
      h: l('Key commands', 'মূল কমান্ড'),
      blocks: [
        { table: {
          head: [l('Goal', 'লক্ষ্য'), l('Command', 'কমান্ড')],
          rows: [
            [l('Search text in a file', 'ফাইলে টেক্সট খুঁজুন'), l('grep pattern file', 'grep pattern file')],
            [l('Ignore upper/lower case', 'ছোট/বড় হাতের উপেক্ষা'), l('grep -i pattern file', 'grep -i pattern file')],
            [l('Search a whole directory tree', 'পুরো ডিরেক্টরি ট্রি খুঁজুন'), l('grep -r pattern dir/', 'grep -r pattern dir/')],
            [l('Show lines that do NOT match', 'যে লাইন মেলে না তা দেখান'), l('grep -v pattern file', 'grep -v pattern file')],
            [l('Show matching line numbers', 'মেলা লাইন নম্বর দেখান'), l('grep -n pattern file', 'grep -n pattern file')],
            [l('Count how many lines match', 'কতটি লাইন মেলে গণনা'), l('grep -c pattern file', 'grep -c pattern file')],
          ],
        } },
        { note: l('Always quote patterns that contain spaces or special characters — grep -i "connection refused" app.log. Without quotes the shell splits or expands the pattern before grep ever sees it.', 'স্পেস বা বিশেষ অক্ষরযুক্ত প্যাটার্ন সবসময় কোট করুন—grep -i "connection refused" app.log। কোট ছাড়া grep দেখার আগেই শেল প্যাটার্ন ভাগ বা প্রসারিত করে।'), kind: 'tip' },
      ],
    },
    {
      h: l('When and where to use grep', 'grep কখন ও কোথায় ব্যবহার করবেন'),
      blocks: [
        { p: l('grep is the first tool you reach for whenever the question is "does this text contain…?" or "show me only the lines about…". Debugging a server, you pipe its log through grep to isolate errors: tail -n 500 app.log | grep -i error. Exploring an unfamiliar codebase, grep -rn "functionName" . tells you every place a name appears, with line numbers. Checking whether a process is up, ps aux | grep nginx filters a huge process list down to the one you care about.', 'যখনই প্রশ্ন "এই টেক্সটে কি … আছে?" বা "শুধু … নিয়ে লাইনগুলো দেখাও", তখন grep প্রথম হাতিয়ার। একটি সার্ভার ডিবাগ করার সময় এরর আলাদা করতে লগ grep-এ পাইপ করুন: tail -n 500 app.log | grep -i error। একটি অচেনা কোডবেস ঘাঁটার সময় grep -rn "functionName" . একটি নাম কোথায় কোথায় আছে লাইন নম্বরসহ বলে। একটি প্রসেস চলছে কিনা দেখতে ps aux | grep nginx বিশাল প্রসেস তালিকাকে আপনার দরকারিটিতে নামিয়ে আনে।') },
        { p: l('The flags decide how strict or loose the search is, and choosing well is the skill. Use -i when you do not know how a word was capitalised. Use -v to remove noise — grep -v "^#" strips comment lines from a config file so you see only the settings. Use -r to sweep an entire folder tree at once. A pattern that is too loose matches lines you did not want; one that is too strict misses variants — so start broad, look at the results, then tighten.', 'ফ্ল্যাগগুলো ঠিক করে সার্চ কতটা কঠোর বা ঢিলা, আর ভালো বাছাই করাই দক্ষতা। একটি শব্দ কীভাবে বড় হাতের লেখা জানা না থাকলে -i নিন। শব্দগোলমাল সরাতে -v নিন—grep -v "^#" একটি config ফাইল থেকে কমেন্ট লাইন ছেঁটে শুধু সেটিং দেখায়। একবারে পুরো ফোল্ডার ট্রি ঝাড়তে -r নিন। বেশি ঢিলা প্যাটার্ন অবাঞ্ছিত লাইন মেলায়; বেশি কঠোরটি ভ্যারিয়েন্ট মিস করে—তাই বড় দিয়ে শুরু করুন, ফল দেখুন, তারপর আঁটসাঁট করুন।') },
        { p: l('A few more flags are worth keeping in your back pocket once the basics feel natural. -n prefixes each result with its line number, which is invaluable when searching source code so you can jump straight to the spot. -w matches whole words only, so grep -w cat will not also match category or scatter. -l lists just the filenames that contain a match instead of the matching lines, perfect for "which files even mention this?". And -E turns on extended regular expressions, letting you write alternatives like grep -E "error|warning|fatal" to catch several patterns in one pass.', 'বেসিক স্বাভাবিক লাগলে আরও কয়েকটি ফ্ল্যাগ পকেটে রাখা মূল্যবান। -n প্রতিটি ফলের আগে তার লাইন নম্বর বসায়, যা সোর্স কোড খোঁজার সময় অমূল্য কারণ আপনি সোজা জায়গায় যেতে পারেন। -w শুধু পুরো শব্দ মেলায়, তাই grep -w cat, category বা scatter মেলাবে না। -l মেলা লাইনের বদলে শুধু যেসব ফাইলে ম্যাচ আছে তার নাম দেখায়, "কোন ফাইলে আদৌ এর উল্লেখ আছে?"-এর জন্য চমৎকার। আর -E extended regular expression চালু করে, grep -E "error|warning|fatal"-এর মতো বিকল্প লিখে এক পাসে কয়েকটি প্যাটার্ন ধরতে দেয়।') },
      ],
    },
    {
      h: l('Common mistakes', 'সাধারণ ভুল'),
      blocks: [
        { list: [
          l('Forgetting to quote a pattern with special characters like * or spaces, so the shell expands it before grep sees it. Wrap the pattern in single or double quotes.', '* বা স্পেসের মতো বিশেষ অক্ষরযুক্ত প্যাটার্ন কোট করতে ভুলে যাওয়া, ফলে grep দেখার আগেই শেল একে প্রসারিত করে। প্যাটার্নটি সিঙ্গেল বা ডাবল কোটে মোড়ান।'),
          l('Being surprised that a search is case-sensitive by default — grep error will not find ERROR. Add -i when case is unknown.', 'সার্চ ডিফল্টে কেস-সংবেদনশীল দেখে অবাক হওয়া—grep error ERROR খুঁজে পাবে না। কেস অজানা হলে -i যোগ করুন।'),
          l('Running plain grep on a directory and getting "Is a directory". You need -r to search inside a folder tree.', 'একটি ডিরেক্টরিতে সাধারণ grep চালিয়ে "Is a directory" পাওয়া। ফোল্ডার ট্রির ভেতরে খুঁজতে -r লাগে।'),
          l('Writing a pattern so loose it matches half the file, or so strict it matches nothing. Refine it by looking at the output rather than guessing.', 'এমন ঢিলা প্যাটার্ন লেখা যা অর্ধেক ফাইল মেলায়, বা এমন কঠোর যা কিছুই মেলায় না। আন্দাজ না করে আউটপুট দেখে একে ঠিক করুন।'),
        ] },
      ],
    },
    {
      h: l('Remember in one line', 'এক লাইনে মনে রাখুন'),
      blocks: [
        { list: [
          l('grep prints only the lines that match a pattern, in a file or in piped input.', 'grep শুধু প্যাটার্নের সঙ্গে মেলা লাইনগুলো ছাপে, ফাইলে বা পাইপ করা ইনপুটে।'),
          l('-i ignores case, -r recurses into directories, -v inverts the match — the three flags you will use daily.', '-i কেস উপেক্ষা করে, -r ডিরেক্টরিতে রিকার্স করে, -v ম্যাচ উল্টায়—প্রতিদিন ব্যবহারের তিন ফ্ল্যাগ।'),
          l('Quote your pattern, start broad then tighten, and pipe logs through grep to find what matters.', 'প্যাটার্ন কোট করুন, বড় দিয়ে শুরু করে আঁটসাঁট করুন, আর দরকারিটি খুঁজতে লগ grep-এ পাইপ করুন।'),
        ] },
      ],
    },
  ],

  // ── lx-sed-awk · Transforming text: sed & awk ─────────────────────────────
  'lx-sed-awk': [
    {
      h: l('What are sed and awk?', 'sed ও awk কী?'),
      blocks: [
        { p: l('sed and awk are two classic tools for transforming text as it streams past, line by line, without opening an editor. sed (the "stream editor") is built for find-and-replace and other line edits: it reads each line, applies a rule, and prints the result. awk is a tiny programming language built around columns: it splits every line into fields and lets you pick, filter, and compute on them. Where grep only decides whether to keep a line, sed and awk change what each line looks like.', 'sed ও awk হলো টেক্সট বয়ে যাওয়ার সময় লাইন-ধরে রূপান্তরের দুটি ক্লাসিক টুল, এডিটর না খুলেই। sed ("stream editor") খোঁজা-ও-বদল ও অন্যান্য লাইন এডিটের জন্য তৈরি: এটি প্রতিটি লাইন পড়ে, একটি নিয়ম প্রয়োগ করে, ও ফল ছাপে। awk কলাম ঘিরে গড়া একটি ছোট প্রোগ্রামিং ভাষা: এটি প্রতিটি লাইনকে ফিল্ডে ভাগ করে ও সেগুলো বাছতে, ফিল্টার করতে ও হিসাব করতে দেয়। grep যেখানে শুধু একটি লাইন রাখবে কিনা ঠিক করে, sed ও awk সেখানে প্রতিটি লাইন দেখতে কেমন তা বদলায়।') },
        { p: l('The problem they solve is bulk text editing that would be tedious or impossible by hand. Replace a hostname across a config file, strip a prefix from a thousand lines, pull the third column out of a CSV, or sum a number across a log — each is one short command instead of a manual slog. Because both read stdin and write stdout, they drop straight into pipelines alongside grep, sort, and the rest.', 'এরা যে সমস্যা সমাধান করে তা হলো হাতে করা ক্লান্তিকর বা অসম্ভব বাল্ক টেক্সট এডিটিং। একটি config ফাইল জুড়ে একটি hostname বদলান, হাজার লাইন থেকে একটি prefix ছাঁটুন, একটি CSV থেকে তৃতীয় কলাম টানুন, বা একটি লগ জুড়ে একটি সংখ্যা যোগ করুন—প্রতিটি হাতের খাটুনির বদলে একটি ছোট কমান্ড। দুটোই stdin পড়ে ও stdout লেখে বলে এরা grep, sort ও বাকিদের পাশে সরাসরি পাইপলাইনে বসে।') },
        { note: l('sed is find-and-replace on a conveyor belt: each line rolls past and gets the same edit. awk is a mini spreadsheet: it reads the columns of every line and lets you compute across them.', 'sed হলো কনভেয়র বেল্টে খোঁজা-ও-বদল: প্রতিটি লাইন গড়িয়ে যায় ও একই এডিট পায়। awk হলো একটি ছোট স্প্রেডশিট: এটি প্রতিটি লাইনের কলাম পড়ে ও সেগুলো নিয়ে হিসাব করতে দেয়।'), kind: 'tip' },
      ],
    },
    {
      h: l('How sed and awk work', 'sed ও awk কীভাবে কাজ করে'),
      blocks: [
        { steps: [
          l('sed reads a line, applies your command (most often a substitution s/old/new/), and prints the result — then moves to the next line.', 'sed একটি লাইন পড়ে, আপনার কমান্ড (প্রায়ই একটি প্রতিস্থাপন s/old/new/) প্রয়োগ করে, ও ফল ছাপে—তারপর পরের লাইনে যায়।'),
          l('The substitution s/old/new/ changes only the first match on each line; add a trailing g to change every match.', 'প্রতিস্থাপন s/old/new/ প্রতি লাইনে শুধু প্রথম ম্যাচ বদলায়; প্রতিটি ম্যাচ বদলাতে শেষে g যোগ করুন।'),
          l('awk splits each line into fields on whitespace (or on -F delimiter), naming them $1, $2, … and $NF for the last field.', 'awk প্রতিটি লাইনকে whitespace-এ (বা -F ডিলিমিটারে) ফিল্ডে ভাগ করে, এদের $1, $2, … ও শেষ ফিল্ডকে $NF নাম দেয়।'),
          l('An awk program is pattern { action }: the action runs for lines matching the pattern, and an END block runs once at the very end.', 'একটি awk প্রোগ্রাম হলো pattern { action }: প্যাটার্নের সঙ্গে মেলা লাইনে action চলে, ও একটি END ব্লক একদম শেষে একবার চলে।'),
        ] },
        { code: `# sed substitution: replace the first "cat" on each line with "dog"
echo "cat and cat" | sed 's/cat/dog/'       # dog and cat

# add the g flag to replace EVERY match on the line
echo "cat and cat" | sed 's/cat/dog/g'      # dog and dog

# edit a file in place, saving a .bak backup first
sed -i.bak 's/localhost/127.0.0.1/g' config.ini

# awk prints columns: $1 is the first field, $3 the third
echo "alice 42 dhaka" | awk '{ print $1, $3 }'    # alice dhaka

# -F sets the field separator; here split /etc/passwd on ':'
awk -F: '{ print $1, $NF }' /etc/passwd     # username and login shell

# awk can filter then compute: sum column 5 for lines whose $6 is "GET"
awk '$6 == "GET" { total += $5 } END { print total }' access.log`, caption: l('sed rewrites lines with s/old/new/; awk pulls out and computes on fields with $1, $2 … $NF.', 'sed s/old/new/ দিয়ে লাইন নতুন করে লেখে; awk $1, $2 … $NF দিয়ে ফিল্ড টানে ও হিসাব করে।') },
      ],
    },
    {
      h: l('Key commands', 'মূল কমান্ড'),
      blocks: [
        { table: {
          head: [l('Goal', 'লক্ষ্য'), l('Command', 'কমান্ড')],
          rows: [
            [l('Replace first match per line', 'প্রতি লাইনে প্রথম ম্যাচ বদল'), l('sed \'s/old/new/\' file', 'sed \'s/old/new/\' file')],
            [l('Replace every match per line', 'প্রতি লাইনে সব ম্যাচ বদল'), l('sed \'s/old/new/g\' file', 'sed \'s/old/new/g\' file')],
            [l('Edit a file in place (with backup)', 'ফাইল সরাসরি এডিট (ব্যাকআপসহ)'), l('sed -i.bak \'s/old/new/g\' file', 'sed -i.bak \'s/old/new/g\' file')],
            [l('Delete lines matching a pattern', 'প্যাটার্ন মেলা লাইন মুছুন'), l('sed \'/pattern/d\' file', 'sed \'/pattern/d\' file')],
            [l('Print a chosen column', 'বাছাই কলাম ছাপুন'), l('awk \'{ print $2 }\' file', 'awk \'{ print $2 }\' file')],
            [l('Split on a delimiter', 'ডিলিমিটারে ভাগ করুন'), l('awk -F: \'{ print $1 }\' file', 'awk -F: \'{ print $1 }\' file')],
          ],
        } },
        { note: l('sed -i edits the file in place, changing the original on disk. Always test the command without -i first (so it just prints), and pass -i.bak so sed keeps a .bak copy in case the pattern was wrong.', 'sed -i ফাইলটি সরাসরি এডিট করে, ডিস্কের আসলটি বদলায়। সবসময় আগে -i ছাড়া কমান্ডটি পরীক্ষা করুন (যাতে এটি শুধু ছাপে), ও -i.bak দিন যাতে প্যাটার্ন ভুল হলে sed একটি .bak কপি রাখে।'), kind: 'warn' },
      ],
    },
    {
      h: l('When and where to use them', 'কখন ও কোথায় ব্যবহার করবেন'),
      blocks: [
        { p: l('Reach for sed when the job is "change this text to that" across many lines or files: swapping a URL in a config, removing trailing whitespace, deleting every comment line, or renaming a symbol before a commit. Its in-place mode (sed -i) makes it a quick way to patch files from a script. Reach for awk when the data is columnar — logs, CSVs, the output of ps or df — and you need a specific field, a filtered subset, or a running total. awk shines at "print the usernames from /etc/passwd" or "add up the bytes in column 10 of the access log".', '"এই টেক্সট ওটাতে বদলাও" যখন অনেক লাইন বা ফাইল জুড়ে কাজ, তখন sed নিন: একটি config-এ URL বদল, ট্রেইলিং whitespace সরানো, প্রতিটি কমেন্ট লাইন মোছা, বা commit-এর আগে একটি symbol-এর নাম বদল। এর in-place মোড (sed -i) স্ক্রিপ্ট থেকে ফাইল প্যাচ করার দ্রুত উপায়। ডেটা কলামভিত্তিক হলে—লগ, CSV, ps বা df-এর আউটপুট—এবং একটি নির্দিষ্ট ফিল্ড, ফিল্টার করা অংশ বা চলমান যোগফল দরকার হলে awk নিন। awk "/etc/passwd থেকে username ছাপো" বা "access লগের ১০ নম্বর কলামের বাইট যোগ করো"-তে উজ্জ্বল।') },
        { p: l('A practical rule: grep finds lines, sed rewrites lines, and awk works with columns and arithmetic — chain them when a task needs more than one. A single pipeline like grep 500 access.log | awk \'{ print $7 }\' | sort | uniq -c finds server errors, extracts the URL column, and counts them per page. Both tools are terse but immensely powerful, and a little practice on real files pays off quickly.', 'একটি ব্যবহারিক নিয়ম: grep লাইন খোঁজে, sed লাইন নতুন করে লেখে, ও awk কলাম ও গণিত নিয়ে কাজ করে—একটি কাজে একাধিক লাগলে এদের চেইন করুন। grep 500 access.log | awk \'{ print $7 }\' | sort | uniq -c-এর মতো একটি পাইপলাইন সার্ভার এরর খোঁজে, URL কলাম টানে, ও প্রতি পেজে গোনে। দুটো টুলই সংক্ষিপ্ত কিন্তু বিপুল শক্তিশালী, আর আসল ফাইলে একটু অনুশীলন দ্রুত ফল দেয়।') },
      ],
    },
    {
      h: l('Common mistakes', 'সাধারণ ভুল'),
      blocks: [
        { list: [
          l('Reaching for a fragile sed/awk pipeline where a real parser is needed. For structured formats like JSON or XML use a proper tool (jq, a library) — line-based edits break the moment the layout shifts.', 'যেখানে আসল পার্সার দরকার সেখানে ভঙ্গুর sed/awk পাইপলাইন ব্যবহার করা। JSON বা XML-এর মতো কাঠামোবদ্ধ ফরম্যাটে ঠিক টুল (jq, একটি লাইব্রেরি) নিন—লেআউট একটু বদলালেই লাইন-ভিত্তিক এডিট ভাঙে।'),
          l('Forgetting the g flag and wondering why only the first match on each line changed. s/old/new/ replaces once per line; s/old/new/g replaces all.', 'g ফ্ল্যাগ ভুলে গিয়ে ভাবা কেন প্রতি লাইনে শুধু প্রথম ম্যাচ বদলাল। s/old/new/ প্রতি লাইনে একবার বদলায়; s/old/new/g সব বদলায়।'),
          l('Running sed -i on a live file with an untested pattern, then finding it mangled with no backup. Test first, and use -i.bak.', 'একটি চালু ফাইলে অপরীক্ষিত প্যাটার্নে sed -i চালিয়ে পরে দেখা তা নষ্ট, কোনো ব্যাকআপ নেই। আগে পরীক্ষা করুন, ও -i.bak নিন।'),
          l('Assuming awk splits on commas by default. It splits on whitespace unless you pass -F, so a CSV needs awk -F, to get the right columns.', 'ধরে নেওয়া awk ডিফল্টে কমায় ভাগ করে। -F না দিলে এটি whitespace-এ ভাগ করে, তাই CSV-তে সঠিক কলাম পেতে awk -F, লাগে।'),
        ] },
      ],
    },
    {
      h: l('Remember in one line', 'এক লাইনে মনে রাখুন'),
      blocks: [
        { list: [
          l('sed edits text line by line (s/old/new/g); awk splits lines into columns ($1, $2 … $NF) and computes.', 'sed টেক্সট লাইন-ধরে এডিট করে (s/old/new/g); awk লাইনকে কলামে ভাগ করে ($1, $2 … $NF) ও হিসাব করে।'),
          l('Use sed for find-and-replace, awk for pulling out and computing on columns of structured text.', 'খোঁজা-ও-বদলে sed, কাঠামোবদ্ধ টেক্সটের কলাম টেনে হিসাব করতে awk নিন।'),
          l('They are powerful one-liners, but reach for a real parser on structured formats like JSON.', 'এরা শক্তিশালী ওয়ান-লাইনার, তবে JSON-এর মতো কাঠামোবদ্ধ ফরম্যাটে আসল পার্সার নিন।'),
        ] },
      ],
    },
  ],

  // ── lx-sort-uniq · Sorting & counting ─────────────────────────────────────
  'lx-sort-uniq': [
    {
      h: l('What do sort, uniq, wc and cut do?', 'sort, uniq, wc ও cut কী করে?'),
      blocks: [
        { p: l('These four are the tidy-up crew of the command line, each doing one small job on lines of text. sort orders lines — alphabetically by default, or numerically with -n. uniq collapses duplicate lines into one, and with -c it also counts how many times each appeared. wc counts things: lines with -l, words with -w, characters with -c. cut slices a chosen column or field out of each line. On their own they seem trivial; chained together they turn a raw pile of text into a summary.', 'এই চারটি কমান্ড লাইনের গোছানো দল, প্রত্যেকে টেক্সট লাইনে একটি ছোট কাজ করে। sort লাইন সাজায়—ডিফল্টে বর্ণানুক্রমে, বা -n দিয়ে সংখ্যায়। uniq ডুপ্লিকেট লাইনকে একটিতে মেলায়, আর -c দিয়ে প্রতিটি কতবার এসেছে তাও গোনে। wc জিনিস গোনে: -l দিয়ে লাইন, -w দিয়ে শব্দ, -c দিয়ে অক্ষর। cut প্রতিটি লাইন থেকে একটি বাছাই কলাম বা ফিল্ড কেটে নেয়। একা এদের তুচ্ছ লাগে; একসঙ্গে চেইন করলে এরা কাঁচা টেক্সটের স্তূপকে একটি সারাংশে বদলায়।') },
        { p: l('The problem they solve together is "make sense of a list". How many unique visitors are in this log? Which error appears most often? How many lines match some condition? Answering by eye is hopeless on real data, but a short pipeline gives an exact answer in seconds. The catch — and the single most important fact here — is that uniq only compares neighbouring lines, so you almost always sort first.', 'এরা একসঙ্গে যে সমস্যা সমাধান করে তা হলো "একটি তালিকা বোঝা"। এই লগে কতজন ইউনিক ভিজিটর? কোন এরর সবচেয়ে বেশি আসে? কতটি লাইন কোনো শর্ত মেলায়? আসল ডেটায় চোখে উত্তর দেওয়া অসম্ভব, কিন্তু একটি ছোট পাইপলাইন সেকেন্ডে সঠিক উত্তর দেয়। মূল কথা—এবং এখানে সবচেয়ে গুরুত্বপূর্ণ তথ্য—uniq শুধু পাশাপাশি লাইন তুলনা করে, তাই আপনি প্রায় সবসময় আগে sort করেন।') },
        { note: l('Picture a tidy-up crew: sort lines everyone up, uniq merges the duplicates standing next to each other, wc counts heads, and cut keeps only the fields you asked for.', 'একটি গোছানো দল ভাবুন: sort সবাইকে সারিবদ্ধ করে, uniq পাশাপাশি দাঁড়ানো ডুপ্লিকেট মেলায়, wc মাথা গোনে, আর cut শুধু আপনার চাওয়া ফিল্ড রাখে।'), kind: 'tip' },
      ],
    },
    {
      h: l('How they work together', 'এরা কীভাবে একসঙ্গে কাজ করে'),
      blocks: [
        { steps: [
          l('sort brings identical lines next to each other — this is the setup step that makes uniq work.', 'sort একই লাইনগুলো পাশাপাশি আনে—এটি সেটআপ ধাপ যা uniq-কে কাজ করায়।'),
          l('uniq then collapses those adjacent duplicates; add -c to prefix each line with its count.', 'তারপর uniq সেই পাশাপাশি ডুপ্লিকেট মেলায়; প্রতিটি লাইনের আগে গণনা বসাতে -c যোগ করুন।'),
          l('A second sort -rn orders those counts from highest to lowest, giving you a ranked list.', 'দ্বিতীয় একটি sort -rn সেই গণনাগুলো সর্বোচ্চ থেকে সর্বনিম্নে সাজায়, একটি র‍্যাঙ্কড তালিকা দেয়।'),
          l('cut or awk pull out just the column you want, and wc -l tells you how many lines are left.', 'cut বা awk শুধু আপনার চাওয়া কলাম টানে, আর wc -l বলে কতটি লাইন বাকি।'),
        ] },
        { code: `# sort orders lines; add -n for numeric, -r for reverse
sort names.txt

# uniq collapses ADJACENT duplicates, so sort first
sort names.txt | uniq

# -c prefixes each line with how many times it occurred
sort names.txt | uniq -c

# the classic "top N" pipeline: count, then sort by count descending
sort access.log | uniq -c | sort -rn | head

# wc -l counts lines; cut -d, -f1 pulls the first CSV column
wc -l names.txt
cut -d, -f1 users.csv | sort | uniq -c`, caption: l('sort | uniq -c | sort -rn is the workhorse pipeline: it turns any list into "how many of each, most common first".', 'sort | uniq -c | sort -rn হলো কর্মী পাইপলাইন: এটি যেকোনো তালিকাকে "প্রতিটির কতটি, সবচেয়ে প্রচলিত আগে"-তে বদলায়।') },
      ],
    },
    {
      h: l('Key commands', 'মূল কমান্ড'),
      blocks: [
        { table: {
          head: [l('Goal', 'লক্ষ্য'), l('Command', 'কমান্ড')],
          rows: [
            [l('Sort lines alphabetically', 'লাইন বর্ণানুক্রমে সাজান'), l('sort file', 'sort file')],
            [l('Sort numerically, biggest first', 'সংখ্যায় সাজান, বড় আগে'), l('sort -rn file', 'sort -rn file')],
            [l('Collapse duplicates with counts', 'ডুপ্লিকেট গণনাসহ মেলান'), l('sort file | uniq -c', 'sort file | uniq -c')],
            [l('Count the number of lines', 'লাইন সংখ্যা গণনা'), l('wc -l file', 'wc -l file')],
            [l('Pick a column by field number', 'ফিল্ড নম্বরে কলাম বাছুন'), l('cut -f1 file', 'cut -f1 file')],
            [l('Pick a column by delimiter', 'ডিলিমিটারে কলাম বাছুন'), l('cut -d, -f2 file', 'cut -d, -f2 file')],
          ],
        } },
        { note: l('uniq only removes duplicates that are next to each other, so it is almost always paired as sort | uniq. Running uniq on unsorted data silently misses duplicates that are far apart in the file.', 'uniq শুধু পাশাপাশি থাকা ডুপ্লিকেট সরায়, তাই এটি প্রায় সবসময় sort | uniq হিসেবে জোড়া লাগে। অসাজানো ডেটায় uniq চালালে ফাইলে দূরে থাকা ডুপ্লিকেট নীরবে বাদ পড়ে।'), kind: 'warn' },
      ],
    },
    {
      h: l('When and where to use them', 'কখন ও কোথায় ব্যবহার করবেন'),
      blocks: [
        { p: l('These tools earn their keep the moment you have a list and a question about it. Analysing a web log, sort access.log | uniq -c | sort -rn | head tells you the most-requested URLs. Auditing a system, cut -d: -f1 /etc/passwd | sort lists every user account in order. Cleaning data, sort file | uniq removes exact duplicate lines. Quick sanity checks lean on wc -l — how many results did that grep return? — since counting by eye is unreliable past a handful.', 'একটি তালিকা ও তা নিয়ে একটি প্রশ্ন হলেই এই টুলগুলো কাজে লাগে। একটি web লগ বিশ্লেষণে sort access.log | uniq -c | sort -rn | head সবচেয়ে বেশি চাওয়া URL বলে। একটি সিস্টেম অডিটে cut -d: -f1 /etc/passwd | sort প্রতিটি user অ্যাকাউন্ট ক্রমে দেখায়। ডেটা পরিষ্কারে sort file | uniq হুবহু ডুপ্লিকেট লাইন সরায়। দ্রুত যাচাই wc -l-এ নির্ভর করে—সেই grep কতটি ফল দিল?—কারণ কয়েকটির বেশি চোখে গোনা অনির্ভরযোগ্য।') },
        { p: l('The guiding idea is composition: each tool does exactly one thing, so you assemble them like Lego to fit the question. Sort to group, uniq to dedupe or count, sort again to rank, cut or awk to isolate a column, wc to total. Because they all read stdin and write stdout, they slot behind grep, sed, and awk in a single pipeline — which is why so many real Linux one-liners end in | sort | uniq -c | sort -rn.', 'পরিচালক ধারণাটি হলো সংমিশ্রণ: প্রতিটি টুল ঠিক একটি কাজ করে, তাই প্রশ্নের সঙ্গে মেলাতে আপনি এদের লেগোর মতো সাজান। গ্রুপ করতে sort, ডিডুপ বা গণনায় uniq, র‍্যাঙ্কে আবার sort, একটি কলাম আলাদা করতে cut বা awk, মোট করতে wc। সবাই stdin পড়ে ও stdout লেখে বলে এরা একটি পাইপলাইনে grep, sed ও awk-এর পিছনে বসে—এ কারণেই এত আসল লিনাক্স ওয়ান-লাইনার | sort | uniq -c | sort -rn-এ শেষ হয়।') },
        { p: l('A handful of extra options make these tools sharper. sort -u sorts and removes duplicates in one step, saving a separate uniq when you do not need counts. sort -k2 sorts by the second column rather than the whole line, and sort -h understands human sizes like 4K or 2G — ideal for ranking du -h output. uniq -d shows only the lines that were duplicated, while uniq -u shows only the ones that were unique. Knowing these means you rarely have to reach outside this small toolkit to answer a question about a list.', 'কয়েকটি বাড়তি অপশন এই টুলগুলোকে আরও ধারালো করে। sort -u এক ধাপে সাজায় ও ডুপ্লিকেট সরায়, গণনা না লাগলে আলাদা uniq বাঁচায়। sort -k2 পুরো লাইনের বদলে দ্বিতীয় কলাম ধরে সাজায়, আর sort -h 4K বা 2G-এর মতো human সাইজ বোঝে—du -h আউটপুট র‍্যাঙ্ক করতে আদর্শ। uniq -d শুধু যেসব লাইন ডুপ্লিকেট হয়েছিল তা দেখায়, আর uniq -u শুধু যেগুলো ইউনিক ছিল তা দেখায়। এগুলো জানলে একটি তালিকা নিয়ে প্রশ্নের উত্তরে এই ছোট টুলকিটের বাইরে খুব কমই যেতে হয়।') },
      ],
    },
    {
      h: l('Common mistakes', 'সাধারণ ভুল'),
      blocks: [
        { list: [
          l('Running uniq on unsorted input and missing duplicates that are not next to each other. Always sort before uniq unless the data is already grouped.', 'অসাজানো ইনপুটে uniq চালিয়ে পাশাপাশি না থাকা ডুপ্লিকেট মিস করা। ডেটা আগে থেকে গ্রুপ না হলে uniq-এর আগে সবসময় sort করুন।'),
          l('Sorting numbers without -n, so 10 sorts before 9 because it is compared character by character. Use sort -n for numeric order.', '-n ছাড়া সংখ্যা সাজানো, ফলে 10, 9-এর আগে আসে কারণ অক্ষর-ধরে তুলনা হয়। সংখ্যার ক্রমে sort -n নিন।'),
          l('Expecting uniq to count occurrences on its own. It only deduplicates; you need uniq -c for counts.', 'uniq নিজে থেকে গণনা করবে ভাবা। এটি শুধু ডিডুপ করে; গণনায় uniq -c লাগে।'),
          l('Using cut with the wrong delimiter. cut defaults to tabs, so a comma- or colon-separated file needs -d, or -d: to split correctly.', 'ভুল ডিলিমিটারে cut ব্যবহার। cut ডিফল্টে tab ধরে, তাই কমা বা কোলন-বিভাজিত ফাইলে সঠিক ভাগে -d, বা -d: লাগে।'),
        ] },
      ],
    },
    {
      h: l('Remember in one line', 'এক লাইনে মনে রাখুন'),
      blocks: [
        { list: [
          l('sort orders lines, uniq collapses adjacent duplicates, wc counts, and cut picks columns.', 'sort লাইন সাজায়, uniq পাশাপাশি ডুপ্লিকেট মেলায়, wc গোনে, আর cut কলাম বাছে।'),
          l('uniq needs sorted input — the go-to combo is sort | uniq -c | sort -rn for top counts.', 'uniq-এর সাজানো ইনপুট লাগে—টপ গণনায় প্রচলিত কম্বো sort | uniq -c | sort -rn।'),
          l('Each tool does one thing; chain them correctly to turn a raw list into a summary.', 'প্রতিটি টুল একটি কাজ করে; কাঁচা তালিকাকে সারাংশে বদলাতে সঠিকভাবে চেইন করুন।'),
        ] },
      ],
    },
  ],

  // ── lx-users · Users & groups ─────────────────────────────────────────────
  'lx-users': [
    {
      h: l('What are users and groups?', 'ইউজার ও গ্রুপ কী?'),
      blocks: [
        { p: l('Linux is a multi-user system from the ground up: it was designed for many people to share one machine safely. Every file, every process, and every login belongs to a user, and each user can be a member of one or more groups. A user is an individual account (you, a teammate, or a service like www-data); a group is a named bundle of users that share access to something. This ownership is how Linux decides who is allowed to read, change, or run each thing on the system.', 'লিনাক্স গোড়া থেকেই মাল্টি-ইউজার সিস্টেম: এটি অনেক মানুষের এক মেশিন নিরাপদে শেয়ার করার জন্য নকশা করা। প্রতিটি ফাইল, প্রতিটি প্রসেস ও প্রতিটি লগইন একজন ব্যবহারকারীর, আর প্রতিটি ব্যবহারকারী এক বা একাধিক গ্রুপের সদস্য হতে পারে। একজন user হলো একটি ব্যক্তিগত অ্যাকাউন্ট (আপনি, একজন টিমমেট, বা www-data-এর মতো একটি সার্ভিস); একটি group হলো নামযুক্ত ব্যবহারকারীর একটি বান্ডিল যারা কিছুর অ্যাক্সেস শেয়ার করে। এই মালিকানা দিয়েই লিনাক্স ঠিক করে সিস্টেমের প্রতিটি জিনিস কে পড়তে, বদলাতে বা চালাতে পারবে।') },
        { p: l('Above all the ordinary accounts sits one special user: root, also called the superuser, with user ID 0. root can do anything — read any file, kill any process, change any setting — bypassing the normal permission checks entirely. This is powerful and dangerous in equal measure, which is why you log in as a normal user for daily work and only borrow root’s power briefly, with sudo, when a task genuinely needs it. The problem this whole model solves is safety and separation: one user’s mistake or one compromised service cannot quietly wreck everyone else’s files.', 'সব সাধারণ অ্যাকাউন্টের ওপরে বসে একটি বিশেষ user: root, যাকে superuser-ও বলে, যার user ID 0। root যেকোনো কিছু করতে পারে—যেকোনো ফাইল পড়া, যেকোনো প্রসেস kill, যেকোনো সেটিং বদল—সাধারণ পারমিশন যাচাই পুরোপুরি এড়িয়ে। এটি সমান মাত্রায় শক্তিশালী ও বিপজ্জনক, এ কারণেই প্রতিদিনের কাজে আপনি সাধারণ user হিসেবে লগইন করেন এবং কোনো কাজে সত্যিই দরকার হলেই sudo দিয়ে root-এর শক্তি অল্প সময়ের জন্য ধার নেন। এই পুরো মডেল যে সমস্যা সমাধান করে তা হলো নিরাপত্তা ও পৃথকীকরণ: একজন ব্যবহারকারীর ভুল বা একটি আপস করা সার্ভিস নীরবে বাকি সবার ফাইল ধ্বংস করতে পারে না।') },
        { note: l('Think of an office building with keycards. Each person’s card opens only their own areas, and groups are shared doors a whole team can enter. root is the building manager’s master key that opens every door — kept locked away and used sparingly.', 'কীকার্ডসহ একটি অফিস ভবন ভাবুন। প্রত্যেকের কার্ড শুধু নিজের এলাকা খোলে, আর গ্রুপ হলো শেয়ার্ড দরজা যেখানে পুরো একটি দল ঢুকতে পারে। root হলো ভবন ম্যানেজারের মাস্টার কী যা প্রতিটি দরজা খোলে—তালাবদ্ধ রাখা ও কম ব্যবহার করা।'), kind: 'tip' },
      ],
    },
    {
      h: l('How the user model works', 'ইউজার মডেল কীভাবে কাজ করে'),
      blocks: [
        { steps: [
          l('Every account has a numeric user ID (UID); root is UID 0, and normal users usually start at 1000.', 'প্রতিটি অ্যাকাউন্টের একটি সাংখ্যিক user ID (UID) আছে; root হলো UID 0, আর সাধারণ user সাধারণত 1000 থেকে শুরু।'),
          l('Each user has one primary group and can belong to several supplementary groups, listed by the id command.', 'প্রতিটি user-এর একটি primary group থাকে ও কয়েকটি supplementary group-এর সদস্য হতে পারে, যা id কমান্ড দেখায়।'),
          l('When you access a file, Linux checks whether you are its owner, in its group, or "everyone else", and applies the matching permissions.', 'একটি ফাইল অ্যাক্সেস করলে লিনাক্স দেখে আপনি তার owner, তার group-এ, নাকি "বাকি সবাই", ও মেলা পারমিশন প্রয়োগ করে।'),
          l('Creating users, groups, and adding members are admin actions, so they need root — you prefix them with sudo.', 'user, group তৈরি ও সদস্য যোগ করা admin কাজ, তাই এতে root লাগে—আপনি এদের আগে sudo বসান।'),
          l('For everyday work you stay a normal user and only escalate to root, briefly, with sudo for the one command that needs it.', 'প্রতিদিনের কাজে আপনি সাধারণ user থাকেন ও শুধু দরকারি সেই একটি কমান্ডে sudo দিয়ে অল্প সময়ের জন্য root-এ ওঠেন।'),
        ] },
        { code: `# Who am I, and which groups am I in?
whoami                 # jahid
id                     # uid=1000(jahid) gid=1000(jahid) groups=1000(jahid),27(sudo)
groups                 # jahid sudo docker

# Create a user and a group (admin actions, hence sudo)
sudo useradd -m -s /bin/bash alice     # -m makes a home dir, -s sets the shell
sudo passwd alice                      # set alice's password
sudo groupadd developers

# Add an existing user to a group — the -a (append) is essential
sudo usermod -aG developers alice

# Run one command as root, or switch into another account
sudo systemctl restart nginx
su - alice`, caption: l('whoami, id and groups answer "who am I?"; useradd, groupadd and usermod -aG are the root-only admin commands.', 'whoami, id ও groups "আমি কে?" জানায়; useradd, groupadd ও usermod -aG হলো শুধু-root admin কমান্ড।') },
      ],
    },
    {
      h: l('Key commands', 'মূল কমান্ড'),
      blocks: [
        { table: {
          head: [l('Goal', 'লক্ষ্য'), l('Command', 'কমান্ড')],
          rows: [
            [l('Show your username', 'আপনার username দেখুন'), l('whoami', 'whoami')],
            [l('Show your UID, GID and groups', 'UID, GID ও গ্রুপ দেখুন'), l('id', 'id')],
            [l('Add a new user (with home dir)', 'নতুন user যোগ (home dir সহ)'), l('sudo useradd -m alice', 'sudo useradd -m alice')],
            [l('Create a new group', 'নতুন group তৈরি'), l('sudo groupadd developers', 'sudo groupadd developers')],
            [l('Add a user to a group', 'user-কে group-এ যোগ'), l('sudo usermod -aG developers alice', 'sudo usermod -aG developers alice')],
            [l('Run one command as root', 'একটি কমান্ড root হিসেবে'), l('sudo <command>', 'sudo <command>')],
          ],
        } },
        { note: l('When adding someone to a group, always use both -a and -G together: usermod -aG group user. Using -G without -a replaces all of the user’s supplementary groups with just that one, silently removing them from every other group.', 'কাউকে group-এ যোগ করার সময় সবসময় -a ও -G দুটোই একসঙ্গে নিন: usermod -aG group user। -a ছাড়া -G ব্যবহার করলে user-এর সব supplementary group শুধু ওই একটি দিয়ে বদলে যায়, নীরবে বাকি সব group থেকে সরিয়ে।'), kind: 'warn' },
      ],
    },
    {
      h: l('When and where it matters', 'কখন ও কোথায় গুরুত্বপূর্ণ'),
      blocks: [
        { p: l('The user and group model matters most on any shared or server machine. When several developers share a server, you give each their own account for accountability — logs show exactly who did what — and put them in a shared group so they can all read and write a common project directory without handing anyone else access. Services run under their own dedicated, unprivileged accounts (nginx as www-data, databases as postgres) so that if one is broken into, the attacker is trapped inside that account’s limited permissions rather than owning the whole box.', 'ইউজার ও গ্রুপ মডেল যেকোনো শেয়ার্ড বা সার্ভার মেশিনে সবচেয়ে গুরুত্বপূর্ণ। কয়েকজন ডেভেলপার একটি সার্ভার শেয়ার করলে জবাবদিহির জন্য প্রত্যেককে নিজের অ্যাকাউন্ট দেন—লগ দেখায় ঠিক কে কী করেছে—এবং তাদের একটি শেয়ার্ড group-এ রাখেন যাতে সবাই অন্য কাউকে অ্যাক্সেস না দিয়েই একটি সাধারণ প্রকল্প ডিরেক্টরি পড়তে ও লিখতে পারে। সার্ভিস নিজেদের নির্দিষ্ট, অ-বিশেষাধিকারী অ্যাকাউন্টে চলে (nginx www-data হিসেবে, ডেটাবেস postgres হিসেবে) যাতে একটি ভাঙা হলে আক্রমণকারী পুরো মেশিনের বদলে সেই অ্যাকাউন্টের সীমিত পারমিশনে আটকা পড়ে।') },
        { p: l('The other place it matters is your own habits. Use groups to grant shared access rather than loosening a file for "everyone", and do day-to-day work as a normal user, escalating with sudo only for the specific command that needs it. Logging in as root all the time removes every safety net Linux gives you — a single mistyped command can then delete or overwrite system files with no barrier. Reserve root for the moment you truly need it, and prefer sudo over becoming root wholesale.', 'আরেকটি জায়গা যেখানে এটি গুরুত্বপূর্ণ তা আপনার নিজের অভ্যাস। একটি ফাইল "সবার" জন্য ঢিলা করার বদলে শেয়ার্ড অ্যাক্সেস দিতে group ব্যবহার করুন, ও প্রতিদিনের কাজ সাধারণ user হিসেবে করুন, শুধু দরকারি নির্দিষ্ট কমান্ডে sudo দিয়ে উঠুন। সবসময় root হিসেবে লগইন করলে লিনাক্সের দেওয়া প্রতিটি সেফটি-নেট চলে যায়—তখন একটি ভুল-টাইপ করা কমান্ড কোনো বাধা ছাড়াই সিস্টেম ফাইল মুছতে বা ওভাররাইট করতে পারে। সত্যিই দরকারের মুহূর্তের জন্য root রাখুন, ও পুরোপুরি root হওয়ার চেয়ে sudo নিন।') },
      ],
    },
    {
      h: l('Common mistakes', 'সাধারণ ভুল'),
      blocks: [
        { list: [
          l('Doing everything as root, so a single typo — a wrong rm, a bad redirect — can damage the entire system with nothing to stop it.', 'সবকিছু root হিসেবে করা, ফলে একটি টাইপো—ভুল rm, খারাপ রিডাইরেক্ট—কোনো বাধা ছাড়াই পুরো সিস্টেম ক্ষতি করতে পারে।'),
          l('Adding a user to a group with usermod -G but forgetting -a, which silently drops them from every other group they were in.', 'usermod -G দিয়ে user-কে group-এ যোগ করে -a ভুলে যাওয়া, যা নীরবে তাদের বাকি প্রতিটি group থেকে সরায়।'),
          l('Expecting a new group membership to take effect immediately. A user must log out and back in (or start a new session) before the change shows up.', 'নতুন group সদস্যপদ সঙ্গে সঙ্গে কার্যকর হবে ভাবা। পরিবর্তন দেখাতে user-কে লগআউট করে আবার লগইন (বা নতুন session শুরু) করতে হয়।'),
          l('Sharing one login among several people. Then logs and file ownership cannot tell who did what, defeating the whole point of separate accounts.', 'কয়েকজনের মধ্যে একটি লগইন শেয়ার করা। তখন লগ ও ফাইল মালিকানা বলতে পারে না কে কী করেছে, আলাদা অ্যাকাউন্টের পুরো উদ্দেশ্য ব্যর্থ করে।'),
        ] },
      ],
    },
    {
      h: l('Remember in one line', 'এক লাইনে মনে রাখুন'),
      blocks: [
        { list: [
          l('Linux is multi-user: every file and process belongs to a user and a group, and root (UID 0) is the all-powerful admin.', 'লিনাক্স মাল্টি-ইউজার: প্রতিটি ফাইল ও প্রসেস একজন user ও একটি group-এর, আর root (UID 0) সর্বশক্তিমান admin।'),
          l('Use groups to grant shared access, and check identity with whoami, id and groups.', 'শেয়ার্ড অ্যাক্সেস দিতে group ব্যবহার করুন, ও whoami, id ও groups দিয়ে পরিচয় যাচাই করুন।'),
          l('Work as a normal user and escalate with sudo only when needed — never live as root.', 'সাধারণ user হিসেবে কাজ করুন ও দরকারে শুধু sudo দিয়ে উঠুন—কখনো root হয়ে থাকবেন না।'),
        ] },
      ],
    },
  ],
}
