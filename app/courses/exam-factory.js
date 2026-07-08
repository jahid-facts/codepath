// Shared exam factory — builds 15 bilingual MCQs per topic from its authored fields.
// Every course (System Design, DSA, Git) calls buildExam so exams stay consistent.
//
// A topic supplies: insight, action, tradeoff, advantages, interview, analogy, mistake
// (all bilingual { en, bn }), and optionally a `complexity` array of { op, value } rows
// (DSA complexities / Git commands) that add subject-specific questions.

const l = (en, bn) => ({ en, bn })

// Plausible wrong values for reference-row questions, per subject.
const VALUE_POOLS = {
  dsa: ['O(1)', 'O(log n)', 'O(n)', 'O(n log n)', 'O(n²)', 'O(V + E)', 'O(n + k)'],
  git: ['git status', 'git add -A', 'git commit --amend', 'git push --force-with-lease', 'git switch -c <name>', 'git merge <branch>', 'git rebase main', 'git reset --hard HEAD~1', 'git stash pop', 'git log --oneline --graph', 'git remote -v', 'git revert <sha>'],
  linux: ['ls -la', 'cd ~', 'pwd', 'cp -r a b', 'mv a b', 'rm -rf dir', 'grep -i pattern', 'chmod 644 file', 'ps aux', 'kill -9 <pid>', 'systemctl status x', 'df -h', 'tail -f file', 'apt install pkg'],
  networking: [],
  'system-design': [],
}
// Subjects whose reference rows carry a concrete value (command/fact) rather than a Big-O cost.
const VALUE_SUBJECTS = new Set(['git', 'linux', 'networking'])

const EXPL = {
  interview: l('Interviewers value a clear mechanism, the key decision, and an explicit trade-off over memorized syntax.', 'ইন্টারভিউয়ার মুখস্থ সিনট্যাক্সের চেয়ে স্পষ্ট প্রক্রিয়া, মূল সিদ্ধান্ত ও স্পষ্ট ট্রেড-অফকে বেশি মূল্য দেন।'),
  sound: l('A sound answer states both what it does and the cost it accepts.', 'সঠিক উত্তরে এটি কী করে এবং কী খরচ মেনে নেয়—দুটিই থাকে।'),
  good: l('Good practice pairs the right action with the benefit it delivers.', 'ভালো চর্চা সঠিক পদক্ষেপকে তার সুফলের সঙ্গে মেলায়।'),
  accurate: l('Both accurate points describe the mechanism, not a shortcut or an assumption.', 'দুটি সঠিক পয়েন্টই প্রক্রিয়া বর্ণনা করে, কোনো শর্টকাট বা অনুমান নয়।'),
}

const avoidExpl = (bad) => l(`Avoid this: ${bad.en}`, `এটি এড়িয়ে চলুন: ${bad.bn}`)
const pickThree = (arr, seed) => {
  const out = []
  for (let i = 0; i < arr.length && out.length < 3; i += 1) out.push(arr[(seed + i) % arr.length])
  while (out.length < 3) out.push(arr[out.length % arr.length])
  return out
}

// Build one single-answer question, rotating the correct option's position for spread.
function single(topic, qi, prompt, answer, wrongs, explanation, badAt) {
  const w = wrongs.slice(0, 3)
  let k = qi + 11
  while (w.length < 3) { w.push(badAt(k)); k += 1 }
  const idx = (topic.order + qi) % 4
  const four = w.slice(0, 3)
  four.splice(idx, 0, answer)
  const pos = four.indexOf(answer)
  return {
    id: `q${qi}`, type: 'single', concept: topic.title, prompt,
    options: four.map((text, i) => ({ id: String.fromCharCode(97 + i), text })),
    correct: [String.fromCharCode(97 + pos)],
    explanation,
  }
}

// Build one multi-answer question with two correct options at a and c.
function multi(topic, qi, prompt, corrects, wrongs, explanation) {
  const opts = [corrects[0], wrongs[0], corrects[1], wrongs[1]]
  return {
    id: `q${qi}`, type: 'multi', concept: topic.title, prompt,
    options: opts.map((text, i) => ({ id: String.fromCharCode(97 + i), text })),
    correct: ['a', 'c'],
    explanation,
  }
}

export function buildExam(topic, { distractors, subject = 'system-design' } = {}) {
  const t = topic
  const pool = distractors && distractors.length >= 4 ? distractors : [
    l('Pick the flashiest option without measuring the real problem.', 'আসল সমস্যা না মেপে সবচেয়ে জমকালো অপশন বেছে নিন।'),
    l('Assume nothing ever fails and skip every safeguard.', 'ধরে নিন কিছুই কখনো ব্যর্থ হয় না এবং সব সুরক্ষা বাদ দিন।'),
    l('Optimize tiny details before the approach even works.', 'পদ্ধতি কাজ করার আগেই ছোট খুঁটিনাটি অপটিমাইজ করুন।'),
    l('Ignore the trade-off and hope the worst case never arrives.', 'ট্রেড-অফ উপেক্ষা করুন আর আশা করুন ওয়ার্স্ট কেস কখনো আসবে না।'),
  ]
  const badAt = (i) => pool[((i % pool.length) + pool.length) % pool.length]

  // Reference rows usable as questions (skip non-metric DSA rows like "Stable: Yes",
  // and rows without at least 3 distinct alternative values to form clean distractors).
  const rows = Array.isArray(t.complexity) ? t.complexity : []
  const valuePool = [...new Set([...(VALUE_POOLS[subject] || []), ...rows.map((r) => String(r.value))])]
  const usableRows = rows.filter((r) => {
    const typeOk = VALUE_SUBJECTS.has(subject) ? true : /^O\(/.test(String(r.value))
    const enoughDistractors = valuePool.filter((v) => v !== String(r.value)).length >= 3
    return typeOk && enoughDistractors
  })

  const rowQuestion = (qi, row) => {
    const value = String(row.value)
    const answer = l(value, value)
    const others = valuePool.filter((v) => v !== value)
    const wrongs = pickThree(others.length ? others : ['—', '≈', '?'], t.order + qi).map((v) => l(v, v))
    const prompt = subject === 'git' || subject === 'linux'
      ? l(`Which command matches this goal: ${row.op.en}?`, `এই লক্ষ্যের সঙ্গে কোন কমান্ড মেলে: ${row.op.bn}?`)
      : subject === 'networking'
        ? l(`What is the standard value for: ${row.op.en}?`, `এর প্রমিত মান কী: ${row.op.bn}?`)
        : l(`What is the typical cost of “${row.op.en}”?`, `“${row.op.bn}”-এর সাধারণ খরচ কত?`)
    const explanation = l(`${row.op.en} → ${value}`, `${row.op.bn} → ${value}`)
    return single(t, qi, prompt, answer, wrongs, explanation, badAt)
  }

  const q = [
    single(t, 1, l(`What is the central idea of ${t.title.en}?`, `${t.title.bn}-এর মূল ধারণা কী?`), t.insight, [badAt(0), badAt(1), badAt(2)], t.insight, badAt),
    single(t, 2, l('Which is the strongest first decision or habit here?', 'এখানে কোন প্রথম সিদ্ধান্ত বা অভ্যাসটি সবচেয়ে শক্তিশালী?'), t.action, [badAt(1), badAt(2), badAt(3)], t.action, badAt),
    single(t, 3, l('Which statement best captures the main trade-off?', 'মূল ট্রেড-অফ কোন বক্তব্যে সবচেয়ে ভালো ফুটে ওঠে?'), t.tradeoff, [badAt(2), badAt(3), badAt(4)], t.tradeoff, badAt),
    single(t, 4, l('Why is this useful — what does it give you?', 'এটি কেন উপকারী—কী দেয়?'), t.advantages, [badAt(3), badAt(4), badAt(5)], t.advantages, badAt),
    single(t, 5, l('What should a strong interview answer include?', 'একটি ভালো ইন্টারভিউ উত্তরে কী থাকা উচিত?'), t.interview, [badAt(4), badAt(5), badAt(6)], EXPL.interview, badAt),
    single(t, 6, l('Which analogy is the best mental model?', 'কোন উপমাটি সেরা মানসিক মডেল?'), t.analogy, [badAt(5), badAt(6), badAt(7)], t.analogy, badAt),
    single(t, 7, l('Which of these is a common mistake?', 'কোনটি সাধারণ ভুল?'), t.mistake, [t.insight, t.action, t.tradeoff], avoidExpl(t.mistake), badAt),
    single(t, 8, l('Which practice should you avoid?', 'কোন চর্চা এড়ানো উচিত?'), badAt(0), [t.action, t.advantages, t.analogy], avoidExpl(badAt(0)), badAt),
    single(t, 9, l('Which statement is an anti-pattern?', 'কোন বক্তব্যটি অ্যান্টি-প্যাটার্ন?'), badAt(3), [t.insight, t.tradeoff, t.interview], avoidExpl(badAt(3)), badAt),
    multi(t, 10, l('Select the two statements that show sound reasoning.', 'সঠিক যুক্তি দেখায়—এমন দুটি বক্তব্য বাছুন।'), [t.insight, t.tradeoff], [badAt(1), badAt(4)], EXPL.sound),
    multi(t, 11, l('Select the two good practices.', 'দুটি ভালো চর্চা বাছুন।'), [t.action, t.advantages], [badAt(2), badAt(5)], EXPL.good),
    multi(t, 12, l('Select the two accurate points.', 'দুটি সঠিক পয়েন্ট বাছুন।'), [t.insight, t.action], [t.mistake, badAt(6)], EXPL.accurate),
    single(t, 13, l('Which of these would be an error in practice?', 'কোনটি বাস্তবে একটি ভুল হবে?'), badAt(1), [t.tradeoff, t.advantages, t.analogy], avoidExpl(badAt(1)), badAt),
    single(t, 14, l('What do you accept in order to gain the benefit?', 'সুফল পেতে আপনি কী মেনে নেন?'), t.tradeoff, [badAt(2), badAt(5), badAt(7)], t.tradeoff, badAt),
    single(t, 15, l('What is the recommended way to apply this?', 'এটি প্রয়োগের প্রস্তাবিত উপায় কী?'), t.action, [badAt(3), badAt(6), badAt(0)], t.action, badAt),
  ]

  // Swap in subject-specific reference-row questions where available, for real variety.
  usableRows.slice(0, 3).forEach((row, i) => { q[14 - i] = rowQuestion(15 - i, row) })

  return q.map((question, i) => ({ ...question, id: `q${i + 1}`, concept: t.title }))
}
