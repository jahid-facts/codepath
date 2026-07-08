'use client'

import { useEffect, useId, useState } from 'react'
import ArchitectureDiagram from './ArchitectureDiagram'

const t = (value, lang) => value?.[lang] ?? value?.en ?? value ?? ''
const tr = (lang, en, bn) => (lang === 'bn' ? bn : en)

// ── Small SVG primitives ────────────────────────────────────────────────────
const Cell = ({ x, y, w = 46, h = 46, label, sub, active, dim }) => (
  <g className={`dsa-g ${active ? 'active' : ''} ${dim ? 'dim' : ''}`}>
    <rect x={x} y={y} width={w} height={h} rx="8" className="dsa-cell" />
    <text x={x + w / 2} y={y + h / 2 + 5} textAnchor="middle" className="dsa-val">{label}</text>
    {sub != null && <text x={x + w / 2} y={y + h + 15} textAnchor="middle" className="dsa-idx">{sub}</text>}
  </g>
)
const Node = ({ cx, cy, r = 24, label, active, dim }) => (
  <g className={`dsa-g ${active ? 'active' : ''} ${dim ? 'dim' : ''}`}>
    <circle cx={cx} cy={cy} r={r} className="dsa-node" />
    <text x={cx} y={cy + 5} textAnchor="middle" className="dsa-val">{label}</text>
  </g>
)
const Edge = ({ x1, y1, x2, y2, active, label, arrow, id }) => (
  <g className={`dsa-g ${active ? 'active' : ''}`}>
    <line x1={x1} y1={y1} x2={x2} y2={y2} className="dsa-edge" markerEnd={arrow ? `url(#dsa-arrow-${id})` : undefined} />
    {label != null && <text x={(x1 + x2) / 2} y={(y1 + y2) / 2 - 5} textAnchor="middle" className="dsa-weight">{label}</text>}
  </g>
)

// Shared small tree used by tree / bst / traversal / heap / backtracking.
const TREE = {
  nodes: [[320, 42], [200, 112], [440, 112], [128, 182], [272, 182], [392, 182], [512, 182]],
  edges: [[0, 1], [0, 2], [1, 3], [1, 4], [2, 5], [2, 6]],
}
const treeSvg = (labels, highlight, prunedEdgesInput = []) => {
  const prunedEdges = prunedEdgesInput.filter((i) => TREE.edges[i])
  return (
    <>
      {TREE.edges.map(([a, b], i) => prunedEdges.includes(i) ? null : <Edge key={`e${i}`} x1={TREE.nodes[a][0]} y1={TREE.nodes[a][1]} x2={TREE.nodes[b][0]} y2={TREE.nodes[b][1]} />)}
      {prunedEdges.map((i) => { const [a, b] = TREE.edges[i]; return <line key={`p${i}`} x1={TREE.nodes[a][0]} y1={TREE.nodes[a][1]} x2={TREE.nodes[b][0]} y2={TREE.nodes[b][1]} className="dsa-edge pruned" /> })}
      {TREE.nodes.map(([x, y], i) => <Node key={i} cx={x} cy={y} label={labels[i]} active={highlight === i} dim={prunedEdges.some((e) => TREE.edges[e][1] === i)} />)}
    </>
  )
}

// Shared small graph used by graph / bfs / dfs / weighted.
const GRAPH = {
  nodes: { A: [110, 62], B: [300, 44], C: [500, 74], D: [190, 176], E: [410, 176] },
  edges: [['A', 'B', 4], ['A', 'D', 2], ['B', 'C', 5], ['B', 'E', 10], ['C', 'E', 3], ['D', 'E', 8]],
}
const graphSvg = (highlight = [], weighted = false, activeEdges = []) => (
  <>
    {GRAPH.edges.map(([a, b, w], i) => <Edge key={i} id="g" x1={GRAPH.nodes[a][0]} y1={GRAPH.nodes[a][1]} x2={GRAPH.nodes[b][0]} y2={GRAPH.nodes[b][1]} label={weighted ? w : undefined} active={activeEdges.includes(i)} />)}
    {Object.entries(GRAPH.nodes).map(([id, [x, y]]) => <Node key={id} cx={x} cy={y} r={22} label={id} active={highlight.includes(id)} />)}
  </>
)

// ── Per-kind renderers: (step, lang) -> { view, body, caption } ──────────────
const renderers = {
  'algo-flow': (step, lang) => {
    const nodes = [tr(lang, 'Input', 'ইনপুট'), tr(lang, 'Algorithm', 'অ্যালগরিদম'), tr(lang, 'Data structure', 'ডেটা স্ট্রাকচার'), tr(lang, 'Output', 'আউটপুট')]
    return {
      view: [640, 150],
      body: <>
        {nodes.slice(0, -1).map((_, i) => <Edge key={i} id="flow" x1={40 + i * 160 + 118} y1={70} x2={40 + (i + 1) * 160} y2={70} arrow active={step > i} />)}
        {nodes.map((label, i) => <g key={i} transform={`translate(${40 + i * 160} 40)`}><rect width="118" height="60" rx="12" className={`dsa-cell ${step === i ? 'active' : ''}`} /><text x="59" y="35" textAnchor="middle" className="dsa-val">{label}</text></g>)}
      </>,
      caption: { en: 'Data flows from input through an algorithm and its structure to output.', bn: 'ডেটা ইনপুট থেকে অ্যালগরিদম ও তার স্ট্রাকচার হয়ে আউটপুটে যায়।' },
    }
  },
  array: (step) => ({
    view: [560, 110],
    body: <>{[5, 8, 2, 9, 4, 7, 1, 6].map((v, i) => <Cell key={i} x={40 + i * 60} y={26} label={v} sub={i} active={i === step % 8} />)}</>,
    caption: { en: 'Contiguous cells addressed by index — O(1) to read cell i.', bn: 'ইনডেক্স দিয়ে ঠিকানা করা পাশাপাশি সেল—সেল i পড়া O(1)।' },
  }),
  // ── Git-flavoured renderers ────────────────────────────────────────────────
  'git-areas': (step, lang) => {
    const boxes = [tr(lang, 'Working dir', 'ওয়ার্কিং ডিরেক্টরি'), tr(lang, 'Staging area', 'স্টেজিং এরিয়া'), tr(lang, 'Repository', 'রিপোজিটরি')]
    const ops = ['git add', 'git commit']
    const active = step % 4
    return {
      view: [660, 150],
      body: <>
        {ops.map((op, i) => <g key={i}>
          <Edge id="flow" x1={40 + i * 220 + 150} y1={70} x2={40 + (i + 1) * 220} y2={70} arrow active={active > i} />
          <text x={40 + i * 220 + 185} y={56} textAnchor="middle" className="dsa-weight">{op}</text>
        </g>)}
        {boxes.map((label, i) => <g key={i} transform={`translate(${40 + i * 220} 40)`}><rect width="150" height="60" rx="12" className={`dsa-cell ${active === i || (active === 3 && i === 2) ? 'active' : ''}`} /><text x="75" y="35" textAnchor="middle" className="dsa-val">{label}</text></g>)}
      </>,
      caption: { en: 'Edits move Working dir → Staging (git add) → Repository (git commit).', bn: 'পরিবর্তন যায় ওয়ার্কিং ডিরেক্টরি → স্টেজিং (git add) → রিপোজিটরি (git commit)।' },
    }
  },
  'git-branch': (step, lang) => {
    const N = [[70, 120], [180, 120], [330, 58], [450, 58], [330, 120], [560, 120]]
    const E = [[0, 1], [1, 2], [2, 3], [1, 4], [3, 5], [4, 5]]
    const shown = step % 6
    return {
      view: [640, 170],
      body: <>
        {E.map(([a, b], i) => (a <= shown && b <= shown) ? <Edge key={i} x1={N[a][0]} y1={N[a][1]} x2={N[b][0]} y2={N[b][1]} active={b === shown} /> : null)}
        {N.map(([x, y], i) => i <= shown ? <Node key={i} cx={x} cy={y} r={16} label={i === 5 ? 'M' : ''} active={i === shown} /> : null)}
        <text x={70} y={155} textAnchor="middle" className="dsa-idx">main</text>
        <text x={390} y={40} textAnchor="middle" className="dsa-idx">feature</text>
      </>,
      caption: { en: 'A feature branch diverges, gains commits, then merges back into main.', bn: 'একটি ফিচার ব্রাঞ্চ আলাদা হয়, কমিট পায়, তারপর main-এ মার্জ (M) হয়।' },
    }
  },
  'git-remote': (step, lang) => {
    const push = step % 2 === 0
    return {
      view: [660, 180],
      body: <>
        <g transform="translate(50 50)"><rect width="200" height="80" rx="12" className={`dsa-cell ${push ? 'active' : ''}`} /><text x="100" y="38" textAnchor="middle" className="dsa-val">{tr(lang, 'Local repo', 'লোকাল রিপো')}</text><text x="100" y="60" textAnchor="middle" className="dsa-idx">git commit</text></g>
        <g transform="translate(410 50)"><rect width="200" height="80" rx="12" className={`dsa-cell ${push ? '' : 'active'}`} /><text x="100" y="38" textAnchor="middle" className="dsa-val">{tr(lang, 'Remote (GitHub)', 'রিমোট (GitHub)')}</text><text x="100" y="60" textAnchor="middle" className="dsa-idx">origin</text></g>
        <Edge id="flow" x1={255} y1={78} x2={405} y2={78} arrow active={push} />
        <text x={330} y={64} textAnchor="middle" className="dsa-weight">{push ? 'git push' : ''}</text>
        <Edge id="flow" x1={405} y1={112} x2={255} y2={112} arrow active={!push} />
        <text x={330} y={135} textAnchor="middle" className="dsa-weight">{push ? '' : 'git pull / fetch'}</text>
      </>,
      caption: { en: 'push sends local commits to the remote; pull/fetch brings remote work back.', bn: 'push লোকাল কমিট রিমোটে পাঠায়; pull/fetch রিমোটের কাজ ফেরত আনে।' },
    }
  },
  'git-flow': (step, lang) => {
    const stages = [tr(lang, 'Branch', 'ব্রাঞ্চ'), tr(lang, 'Commit', 'কমিট'), tr(lang, 'Push', 'পুশ'), tr(lang, 'PR', 'পিআর'), tr(lang, 'Review', 'রিভিউ'), tr(lang, 'Merge', 'মার্জ')]
    const cur = step % stages.length
    return {
      view: [740, 110],
      body: <>
        {stages.slice(0, -1).map((_, i) => <Edge key={i} id="flow" x1={30 + i * 116 + 104} y1={55} x2={30 + (i + 1) * 116} y2={55} arrow active={cur > i} />)}
        {stages.map((label, i) => <g key={i} transform={`translate(${30 + i * 116} 30)`}><rect width="104" height="50" rx="10" className={`dsa-cell ${cur === i ? 'active' : ''}`} /><text x="52" y="30" textAnchor="middle" className="dsa-val">{label}</text></g>)}
      </>,
      caption: { en: 'GitHub Flow: branch, commit, push, open a PR, review, then merge.', bn: 'GitHub Flow: ব্রাঞ্চ, কমিট, পুশ, PR খুলুন, রিভিউ, তারপর মার্জ।' },
    }
  },
  // ── Linear structures ──────────────────────────────────────────────────────
  stack: (step, lang) => {
    const items = [3, 7, 5, 9]
    const n = 2 + (step % 3)
    return {
      view: [360, 250],
      body: <>
        {items.slice(0, n).map((v, i) => { const y = 196 - i * 44; return <g key={i}><rect x={120} y={y} width={110} height={40} rx="8" className={`dsa-cell ${i === n - 1 ? 'active' : ''}`} /><text x={175} y={y + 25} textAnchor="middle" className="dsa-val">{v}</text></g> })}
        <text x={248} y={196 - (n - 1) * 44 + 24} className="dsa-ptr">← top</text>
        <text x={175} y={232} textAnchor="middle" className="dsa-idx">{tr(lang, 'push / pop at the top only', 'শুধু ওপরে push / pop')}</text>
      </>,
      caption: { en: 'LIFO: you only ever push to or pop from the top.', bn: 'LIFO: শুধু ওপরে push বা ওপর থেকে pop।' },
    }
  },
  queue: (step, lang) => {
    const items = [4, 8, 1, 6, 3]
    const front = step % 3
    return {
      view: [520, 140],
      body: <>
        {items.map((v, i) => <Cell key={i} x={30 + i * 92} y={44} w={72} h={50} label={v} active={i === front} dim={i < front} />)}
        <text x={30 + front * 92 + 36} y={32} textAnchor="middle" className="dsa-ptr">{tr(lang, 'front', 'front')}</text>
        <text x={30 + (items.length - 1) * 92 + 36} y={118} textAnchor="middle" className="dsa-ptr">{tr(lang, 'rear', 'rear')}</text>
      </>,
      caption: { en: 'FIFO: enqueue at the rear, dequeue from the front.', bn: 'FIFO: পিছনে enqueue, সামনে থেকে dequeue।' },
    }
  },
  sorting: (step) => {
    const heights = [5, 2, 8, 1, 9, 3, 7, 4]
    const sorted = [1, 2, 3, 4, 5, 7, 8, 9]
    const k = step % (heights.length + 1)
    const arr = [...sorted.slice(0, k), ...heights.slice(k)]
    return {
      view: [520, 180],
      body: <>{arr.map((v, i) => { const h = v / 9 * 128; return <g key={i}><rect x={40 + i * 58} y={150 - h} width={44} height={h} rx="6" className={`dsa-cell ${i < k ? 'dim' : i === k ? 'active' : ''}`} /><text x={40 + i * 58 + 22} y={168} textAnchor="middle" className="dsa-idx">{v}</text></g> })}</>,
      caption: { en: 'Sorting rearranges items into order; the settled prefix grows left to right.', bn: 'সর্টিং আইটেম ক্রমে সাজায়; স্থির প্রিফিক্স বাম থেকে ডানে বাড়ে।' },
    }
  },
  recursion: (step, lang) => {
    const frames = ['f(4)', 'f(3)', 'f(2)', 'f(1)']
    const depth = step % 4 + 1
    return {
      view: [400, 250],
      body: <>
        {frames.slice(0, depth).map((lab, i) => <g key={i}><rect x={80 + i * 12} y={30 + i * 46} width={210} height={40} rx="8" className={`dsa-cell ${i === depth - 1 ? 'active' : ''}`} /><text x={185 + i * 12} y={55 + i * 46} textAnchor="middle" className="dsa-val">{lab}</text></g>)}
        <text x={190} y={238} textAnchor="middle" className="dsa-idx">{tr(lang, 'each call adds a stack frame', 'প্রতিটি কল একটি স্ট্যাক ফ্রেম যোগ করে')}</text>
      </>,
      caption: { en: 'Each recursive call stacks a new frame until the base case unwinds it.', bn: 'বেস কেস না আসা পর্যন্ত প্রতিটি রিকার্সিভ কল নতুন ফ্রেম জমায়।' },
    }
  },
  // ── Trees ──────────────────────────────────────────────────────────────────
  bst: (step) => {
    const labels = [50, 30, 70, 20, 40, 60, 80]
    const path = [0, 2, 5]
    return { view: [600, 220], body: treeSvg(labels, path[step % path.length]), caption: { en: 'A BST keeps smaller keys left, larger right — search follows one path down.', bn: 'BST ছোট কী বামে, বড় ডানে রাখে—সার্চ একটি পথ ধরে নিচে নামে।' } }
  },
  heap: (step) => {
    const labels = [90, 70, 80, 40, 60, 75, 50]
    const path = [0, 2, 5]
    return { view: [600, 220], body: treeSvg(labels, path[step % path.length]), caption: { en: 'A max-heap keeps every parent ≥ its children, so the maximum sits at the root.', bn: 'ম্যাক্স-হিপে প্রতিটি প্যারেন্ট ≥ চাইল্ড, তাই সর্বোচ্চ রুটে থাকে।' } }
  },
  traversal: (step) => {
    const labels = ['F', 'B', 'G', 'A', 'D', 'C', 'I']
    const order = [3, 1, 4, 0, 5, 2, 6]
    return { view: [600, 220], body: treeSvg(labels, order[step % order.length]), caption: { en: 'A traversal visits every node in a fixed order — shown here in-order (A B D F C G I).', bn: 'ট্রাভার্সাল প্রতিটি নোড নির্দিষ্ট ক্রমে দেখে—এখানে ইন-অর্ডার (A B D F C G I)।' } }
  },
  backtracking: (step, lang) => {
    const pruned = step % 2 === 0 ? [3, 5] : [2, 4]
    return {
      view: [600, 230],
      body: <>{treeSvg(['', '', '', '', '', '', ''], -1, pruned)}<text x={300} y={218} textAnchor="middle" className="dsa-idx">{tr(lang, 'dead-end branches are pruned', 'ডেড-এন্ড শাখা ছেঁটে ফেলা হয়')}</text></>,
      caption: { en: 'Backtracking abandons (prunes) branches that cannot lead to a valid solution.', bn: 'ব্যাকট্র্যাকিং যেসব শাখা বৈধ সমাধানে পৌঁছাতে পারে না তা ছেড়ে (ছেঁটে) দেয়।' },
    }
  },
  trie: (step, lang) => {
    const N = [[200, 34, '•'], [200, 96, 't'], [120, 166, 'o'], [280, 166, 'e'], [230, 228, 'a'], [330, 228, 'n']]
    const E = [[0, 1], [1, 2], [1, 3], [3, 4], [3, 5]]
    const shown = step % 6
    return {
      view: [440, 262],
      body: <>
        {E.map(([a, b], i) => b <= shown ? <Edge key={i} x1={N[a][0]} y1={N[a][1]} x2={N[b][0]} y2={N[b][1]} active={b === shown} /> : null)}
        {N.map(([x, y, lab], i) => i <= shown ? <Node key={i} cx={x} cy={y} r={18} label={lab} active={i === shown} /> : null)}
        <text x={220} y={256} textAnchor="middle" className="dsa-idx">{tr(lang, 'to · tea · ten share the prefix “t”', 'to · tea · ten “t” প্রিফিক্স শেয়ার করে')}</text>
      </>,
      caption: { en: 'A trie stores strings by shared prefixes, so common starts are stored once.', bn: 'ট্রাই শেয়ার্ড প্রিফিক্স দিয়ে স্ট্রিং রাখে, তাই একই শুরু একবারই থাকে।' },
    }
  },
  // ── Graphs ─────────────────────────────────────────────────────────────────
  graph: (step) => ({
    view: [600, 210],
    body: graphSvg([Object.keys(GRAPH.nodes)[step % 5]]),
    caption: { en: 'A graph is nodes joined by edges — stored as an adjacency list or matrix.', bn: 'গ্রাফ হলো এজ দিয়ে যুক্ত নোড—অ্যাডজেসেন্সি লিস্ট বা ম্যাট্রিক্স হিসেবে রাখা।' },
  }),
  bfs: (step, lang) => {
    const levels = [['A'], ['A', 'B', 'D'], ['A', 'B', 'D', 'C', 'E']]
    return { view: [600, 210], body: graphSvg(levels[step % 3]), caption: { en: 'BFS explores level by level with a queue — nearest nodes first.', bn: 'BFS কিউ দিয়ে স্তর-ধরে খোঁজে—আগে সবচেয়ে কাছের নোড।' } }
  },
  dfs: (step) => {
    const order = ['A', 'B', 'C', 'E', 'D']
    return { view: [600, 210], body: graphSvg(order.slice(0, step % 5 + 1)), caption: { en: 'DFS follows one path as deep as possible before backtracking.', bn: 'DFS ব্যাকট্র্যাকের আগে একটি পথ যতটা সম্ভব গভীরে অনুসরণ করে।' } }
  },
  greedy: (step, lang) => {
    const coins = [25, 10, 5, 1]
    const pick = step % coins.length
    return {
      view: [500, 160],
      body: <>
        {coins.map((v, i) => <Node key={i} cx={90 + i * 108} cy={70} r={34} label={v} active={i === pick} dim={i < pick} />)}
        <text x={250} y={140} textAnchor="middle" className="dsa-idx">{tr(lang, 'take the best local choice each step', 'প্রতি ধাপে সেরা স্থানীয় পছন্দ নিন')}</text>
      </>,
      caption: { en: 'A greedy algorithm takes the best local choice at each step.', bn: 'গ্রিডি অ্যালগরিদম প্রতি ধাপে সেরা স্থানীয় পছন্দ নেয়।' },
    }
  },
  complexity: (step, lang) => {
    const x0 = 54, y0 = 168, xw = 430, yh = 150
    const curves = [
      { label: 'O(1)', f: () => 0.04 },
      { label: 'O(log n)', f: (x) => Math.log2(1 + x * 24) / Math.log2(25) * 0.45 },
      { label: 'O(n)', f: (x) => x },
      { label: 'O(n log n)', f: (x) => Math.min(x * Math.log2(1 + x * 24) / Math.log2(25), 1) },
      { label: 'O(n²)', f: (x) => x * x },
    ]
    const hi = step % curves.length
    const pts = (f) => Array.from({ length: 25 }, (_, i) => { const x = i / 24; const y = Math.min(f(x), 1); return `${x0 + x * xw},${y0 - y * yh}` }).join(' ')
    return {
      view: [520, 200],
      body: <>
        <line x1={x0} y1={y0} x2={x0 + xw} y2={y0} className="dsa-edge" />
        <line x1={x0} y1={y0} x2={x0} y2={y0 - yh} className="dsa-edge" />
        {curves.map((c, i) => <polyline key={i} points={pts(c.f)} className={`dsa-edge ${i === hi ? 'active' : ''}`} style={{ fill: 'none', strokeWidth: i === hi ? 3.5 : 1.3, opacity: i === hi ? 1 : 0.45 }} />)}
        <text x={x0 + xw} y={y0 + 20} textAnchor="end" className="dsa-idx">{tr(lang, 'input size n →', 'ইনপুট n →')}</text>
        <text x={x0 + 8} y={y0 - yh + 6} className="dsa-val">{curves[hi].label}</text>
      </>,
      caption: { en: 'Big-O compares how cost grows with input size — the gap explodes as n rises.', bn: 'বিগ-ও ইনপুট বাড়লে খরচ কীভাবে বাড়ে তা তুলনা করে—n বাড়লে পার্থক্য বিস্ফোরিত হয়।' },
    }
  },
  // ── Networking renderers ───────────────────────────────────────────────────
  'net-stack': (step, lang) => {
    const layers = [tr(lang, 'Application', 'অ্যাপ্লিকেশন'), tr(lang, 'Transport', 'ট্রান্সপোর্ট'), tr(lang, 'Internet', 'ইন্টারনেট'), tr(lang, 'Link', 'লিংক')]
    const cur = step % layers.length
    return {
      view: [420, 262],
      body: <>
        {layers.slice(0, -1).map((_, i) => <Edge key={i} id="flow" x1={210} y1={30 + i * 54 + 44} x2={210} y2={30 + (i + 1) * 54} arrow active={cur > i} />)}
        {layers.map((lab, i) => <g key={i}><rect x={80} y={30 + i * 54} width={260} height={44} rx="8" className={`dsa-cell ${i === cur ? 'active' : ''}`} /><text x={210} y={57 + i * 54} textAnchor="middle" className="dsa-val">{lab}</text></g>)}
        <text x={210} y={250} textAnchor="middle" className="dsa-idx">{tr(lang, 'each layer adds its header on the way down', 'নিচে নামার পথে প্রতিটি স্তর হেডার যোগ করে')}</text>
      </>,
      caption: { en: 'Data moves down the layered stack to be sent; each layer adds its own header.', bn: 'পাঠাতে ডেটা স্তরিত স্ট্যাক ধরে নিচে নামে; প্রতিটি স্তর নিজের হেডার যোগ করে।' },
    }
  },
  'net-handshake': (step, lang) => {
    const msgs = [{ label: 'SYN', dir: 1 }, { label: 'SYN-ACK', dir: -1 }, { label: 'ACK', dir: 1 }]
    const shown = step % 4
    return {
      view: [560, 230],
      body: <>
        <g transform="translate(40 40)"><rect width="120" height="150" rx="10" className="dsa-cell" /><text x="60" y="80" textAnchor="middle" className="dsa-val">{tr(lang, 'Client', 'ক্লায়েন্ট')}</text></g>
        <g transform="translate(400 40)"><rect width="120" height="150" rx="10" className="dsa-cell" /><text x="60" y="80" textAnchor="middle" className="dsa-val">{tr(lang, 'Server', 'সার্ভার')}</text></g>
        {msgs.map((m, i) => i < shown ? <g key={i}>
          <Edge id="flow" x1={m.dir > 0 ? 160 : 400} y1={80 + i * 40} x2={m.dir > 0 ? 400 : 160} y2={80 + i * 40} arrow active />
          <text x={280} y={72 + i * 40} textAnchor="middle" className="dsa-weight">{m.label}</text>
        </g> : null)}
        <text x={280} y={216} textAnchor="middle" className="dsa-idx">SYN → SYN-ACK → ACK</text>
      </>,
      caption: { en: 'TCP opens a connection with a three-way handshake: SYN, SYN-ACK, ACK.', bn: 'TCP তিন-ধাপ হ্যান্ডশেকে সংযোগ খোলে: SYN, SYN-ACK, ACK।' },
    }
  },
  'net-hops': (step, lang) => {
    const nodes = ['PC', 'R1', 'R2', 'WWW']
    const cx = (i) => 70 + i * 175
    const cur = step % nodes.length
    return {
      view: [640, 160],
      body: <>
        {nodes.slice(0, -1).map((_, i) => <Edge key={i} id="flow" x1={cx(i) + 34} y1={70} x2={cx(i + 1) - 34} y2={70} arrow active={cur > i} />)}
        {nodes.map((lab, i) => <Node key={i} cx={cx(i)} cy={70} r={34} label={lab} active={i === cur} dim={i < cur} />)}
        <text x={320} y={140} textAnchor="middle" className="dsa-idx">{tr(lang, 'each router forwards the packet one hop closer', 'প্রতিটি রাউটার প্যাকেটকে এক হপ কাছে পাঠায়')}</text>
      </>,
      caption: { en: 'Routers forward each packet hop by hop toward its destination network.', bn: 'রাউটার প্রতিটি প্যাকেট হপ-বাই-হপ গন্তব্য নেটওয়ার্কের দিকে পাঠায়।' },
    }
  },
  'net-request': (step, lang) => {
    const reqPhase = step % 2 === 0
    return {
      view: [620, 180],
      body: <>
        <g transform="translate(50 50)"><rect width="190" height="80" rx="12" className={`dsa-cell ${reqPhase ? 'active' : ''}`} /><text x="95" y="46" textAnchor="middle" className="dsa-val">{tr(lang, 'Client', 'ক্লায়েন্ট')}</text></g>
        <g transform="translate(380 50)"><rect width="190" height="80" rx="12" className={`dsa-cell ${reqPhase ? '' : 'active'}`} /><text x="95" y="46" textAnchor="middle" className="dsa-val">{tr(lang, 'Server', 'সার্ভার')}</text></g>
        <Edge id="flow" x1={240} y1={78} x2={380} y2={78} arrow active={reqPhase} />
        <text x={310} y={66} textAnchor="middle" className="dsa-weight">{reqPhase ? tr(lang, 'request', 'রিকোয়েস্ট') : ''}</text>
        <Edge id="flow" x1={380} y1={112} x2={240} y2={112} arrow active={!reqPhase} />
        <text x={310} y={135} textAnchor="middle" className="dsa-weight">{reqPhase ? '' : tr(lang, 'response', 'রেসপন্স')}</text>
      </>,
      caption: { en: 'The client sends a request; the server processes it and returns a response.', bn: 'ক্লায়েন্ট একটি রিকোয়েস্ট পাঠায়; সার্ভার তা প্রসেস করে রেসপন্স ফেরত দেয়।' },
    }
  },
  'net-address': (step, lang) => {
    const octets = ['192', '168', '1', '42']
    const netCount = 3
    return {
      view: [560, 170],
      body: <>
        <text x={280} y={34} textAnchor="middle" className="dsa-weight">192.168.1.42 / 24</text>
        {octets.map((o, i) => <g key={i}><rect x={40 + i * 130} y={50} width={110} height={50} rx="8" className={`dsa-cell ${i < netCount ? 'active' : ''}`} /><text x={40 + i * 130 + 55} y={82} textAnchor="middle" className="dsa-val">{o}</text></g>)}
        <text x={40 + netCount * 130 / 2} y={130} textAnchor="middle" className="dsa-idx">{tr(lang, 'network', 'নেটওয়ার্ক')}</text>
        <text x={40 + netCount * 130 + 55} y={130} textAnchor="middle" className="dsa-idx">{tr(lang, 'host', 'হোস্ট')}</text>
      </>,
      caption: { en: 'A subnet mask (/24) splits an IP into a network part and a host part.', bn: 'একটি সাবনেট মাস্ক (/24) IP-কে নেটওয়ার্ক অংশ ও হোস্ট অংশে ভাগ করে।' },
    }
  },
  'binary-search': (step, lang) => {
    const arr = [1, 3, 5, 7, 9, 11, 13, 15]
    const states = [[0, 3, 7], [4, 5, 7], [6, 6, 7]]
    const [lo, mid, hi] = states[step % states.length]
    return {
      view: [560, 130],
      body: <>
        {arr.map((v, i) => <Cell key={i} x={40 + i * 60} y={30} label={v} sub={i} active={i === mid} dim={i < lo || i > hi} />)}
        <text x={40 + lo * 60 + 23} y={20} textAnchor="middle" className="dsa-ptr">{tr(lang, 'lo', 'lo')}</text>
        <text x={40 + hi * 60 + 23} y={20} textAnchor="middle" className="dsa-ptr">{tr(lang, 'hi', 'hi')}</text>
        <text x={40 + mid * 60 + 23} y={110} textAnchor="middle" className="dsa-ptr">{tr(lang, 'mid', 'mid')}</text>
      </>,
      caption: { en: 'Each step checks the middle and discards half the range — O(log n).', bn: 'প্রতি ধাপে মাঝ যাচাই করে অর্ধেক রেঞ্জ বাদ দেয়—O(log n)।' },
    }
  },
  'two-pointer': (step, lang) => {
    const arr = [2, 3, 5, 7, 8, 11, 15]
    const l = step % 3, r = arr.length - 1 - (step % 3)
    return {
      view: [500, 130],
      body: <>
        {arr.map((v, i) => <Cell key={i} x={30 + i * 62} y={30} label={v} active={i === l || i === r} dim={i > l && i < r} />)}
        <text x={30 + l * 62 + 23} y={20} textAnchor="middle" className="dsa-ptr">L →</text>
        <text x={30 + r * 62 + 23} y={20} textAnchor="middle" className="dsa-ptr">← R</text>
      </>,
      caption: { en: 'Two indices move inward from both ends — a linear O(n) scan.', bn: 'দুই ইনডেক্স দুই প্রান্ত থেকে ভেতরে আসে—লিনিয়ার O(n) স্ক্যান।' },
    }
  },
  'sliding-window': (step, lang) => {
    const arr = [4, 2, 7, 1, 8, 3, 6], k = 3, start = step % (arr.length - k + 1)
    return {
      view: [500, 120],
      body: <>
        <rect x={30 + start * 62 - 4} y={22} width={k * 62 - 4} height={54} rx="10" className="dsa-window" />
        {arr.map((v, i) => <Cell key={i} x={30 + i * 62} y={26} label={v} active={i >= start && i < start + k} />)}
      </>,
      caption: { en: 'A fixed-width window slides one step at a time — O(n) total.', bn: 'নির্দিষ্ট-প্রস্থ উইন্ডো একবারে এক ধাপ সরে—মোট O(n)।' },
    }
  },
  'linked-list': (step, lang) => {
    const arr = [7, 3, 9, 4]
    return {
      view: [600, 120],
      body: <>
        {arr.map((v, i) => <g key={i}>
          <rect x={30 + i * 135} y={36} width="86" height="48" rx="9" className={`dsa-cell ${i === step % arr.length ? 'active' : ''}`} />
          <line x1={30 + i * 135 + 58} y1={36} x2={30 + i * 135 + 58} y2={84} className="dsa-edge thin" />
          <text x={30 + i * 135 + 29} y={65} textAnchor="middle" className="dsa-val">{v}</text>
          <text x={30 + i * 135 + 72} y={65} textAnchor="middle" className="dsa-idx">•</text>
          {i < arr.length - 1 ? <Edge id="ll" x1={30 + i * 135 + 86} y1={60} x2={30 + (i + 1) * 135} y2={60} arrow /> : <text x={30 + i * 135 + 120} y={65} className="dsa-ptr">null</text>}
        </g>)}
      </>,
      caption: { en: 'Nodes chained by next pointers — O(1) splice, O(n) to index.', bn: 'next পয়েন্টার দিয়ে যুক্ত নোড—O(1) স্প্লাইস, ইনডেক্সে O(n)।' },
    }
  },
  stack: (step, lang) => {
    const arr = ['d', 'c', 'b', 'a']
    return {
      view: [420, 210],
      body: <>
        {arr.map((v, i) => <g key={i}><rect x={150} y={26 + i * 42} width="120" height="38" rx="7" className={`dsa-cell ${i === 0 ? 'active' : ''}`} /><text x={210} y={50 + i * 42} textAnchor="middle" className="dsa-val">{v}</text></g>)}
        <text x={300} y={49} className="dsa-ptr">← {tr(lang, 'top (push / pop)', 'টপ (পুশ / পপ)')}</text>
      </>,
      caption: { en: 'Last-in, first-out — push and pop only at the top, O(1).', bn: 'লাস্ট-ইন ফার্স্ট-আউট—শুধু টপে পুশ ও পপ, O(1)।' },
    }
  },
  queue: (step, lang) => {
    const arr = [1, 2, 3, 4, 5]
    return {
      view: [560, 130],
      body: <>
        {arr.map((v, i) => <Cell key={i} x={70 + i * 82} y={40} w={70} h={46} label={v} active={i === 0 || i === arr.length - 1} />)}
        <text x={105} y={30} textAnchor="middle" className="dsa-ptr">{tr(lang, 'front (dequeue)', 'ফ্রন্ট (ডিকিউ)')}</text>
        <text x={70 + (arr.length - 1) * 82 + 35} y={110} textAnchor="middle" className="dsa-ptr">{tr(lang, 'rear (enqueue)', 'রিয়ার (এনকিউ)')}</text>
      </>,
      caption: { en: 'First-in, first-out — enqueue at the rear, dequeue at the front.', bn: 'ফার্স্ট-ইন ফার্স্ট-আউট—রিয়ারে এনকিউ, ফ্রন্টে ডিকিউ।' },
    }
  },
  'hash-table': (step, lang) => {
    const buckets = [['tim'], [], ['ann', 'sam'], ['ben'], []]
    return {
      view: [560, 210],
      body: <>
        <text x={70} y={20} textAnchor="middle" className="dsa-idx">{tr(lang, 'buckets', 'বাকেট')}</text>
        {buckets.map((chain, i) => <g key={i}>
          <rect x={40} y={30 + i * 36} width="60" height="30" rx="6" className={`dsa-cell ${i === step % buckets.length ? 'active' : ''}`} /><text x={70} y={50 + i * 36} textAnchor="middle" className="dsa-val">{i}</text>
          {chain.map((key, j) => <g key={j}><Edge id="h" x1={100 + j * 110} y1={45 + i * 36} x2={120 + j * 110} y2={45 + i * 36} arrow /><rect x={120 + j * 110} y={30 + i * 36} width="86" height="30" rx="6" className="dsa-cell" /><text x={163 + j * 110} y={50 + i * 36} textAnchor="middle" className="dsa-val small">{key}</text></g>)}
        </g>)}
      </>,
      caption: { en: 'A hash maps each key to a bucket; collisions chain — average O(1).', bn: 'হ্যাশ প্রতিটি কী-কে বাকেটে ম্যাপ করে; কলিশন চেইন হয়—গড় O(1)।' },
    }
  },
  sorting: (step) => {
    const bars = [3, 6, 2, 7, 4, 8, 1, 5]
    const sorted = [...bars].sort((a, b) => a - b)
    const k = (step % (bars.length + 1))
    const shown = sorted.slice(0, k).concat(bars.slice(k))
    return {
      view: [520, 170],
      body: <>{shown.map((v, i) => <g key={i}><rect x={40 + i * 58} y={140 - v * 15} width="42" height={v * 15} rx="5" className={`dsa-bar ${i < k ? 'active' : ''}`} /><text x={61 + i * 58} y={158} textAnchor="middle" className="dsa-idx">{v}</text></g>)}</>,
      caption: { en: 'Bars settle into order; the sorted prefix grows each pass.', bn: 'বার ক্রমে সাজে; প্রতি পাসে সাজানো অংশ বাড়ে।' },
    }
  },
  greedy: (step, lang) => {
    const coins = [25, 10, 5, 1]
    return {
      view: [520, 150],
      body: <>
        {coins.map((c, i) => <g key={i}><circle cx={70 + i * 120} cy={70} r={30} className={`dsa-node ${i === Math.min(step, coins.length - 1) ? 'active' : ''}`} /><text x={70 + i * 120} y={76} textAnchor="middle" className="dsa-val">{c}</text></g>)}
        <text x={260} y={130} textAnchor="middle" className="dsa-ptr">{tr(lang, 'take the largest that still fits', 'যেটি এখনো মানায় তার সবচেয়ে বড়টি নিন')}</text>
      </>,
      caption: { en: 'At each step, take the best local choice — fast, but prove it is optimal.', bn: 'প্রতি ধাপে সেরা স্থানীয় পছন্দ নিন—দ্রুত, তবে অপটিমাম প্রমাণ করুন।' },
    }
  },
  recursion: (step, lang) => {
    const frames = ['f(4)', 'f(3)', 'f(2)', 'f(1)']
    return {
      view: [520, 210],
      body: <>
        {frames.map((f, i) => <g key={i}><rect x={110 + i * 18} y={26 + i * 42} width="200" height="34" rx="7" className={`dsa-cell ${i === step % frames.length ? 'active' : ''}`} /><text x={210 + i * 18} y={48 + i * 42} textAnchor="middle" className="dsa-val small">{f}{i === frames.length - 1 ? ` ← ${tr(lang, 'base case', 'বেস কেস')}` : ''}</text></g>)}
      </>,
      caption: { en: 'Each call adds a stack frame until the base case returns.', bn: 'বেস কেস রিটার্ন করা পর্যন্ত প্রতিটি কল একটি স্ট্যাক ফ্রেম যোগ করে।' },
    }
  },
  'binary-tree': (step) => ({
    view: [640, 220], body: treeSvg(['A', 'B', 'C', 'D', 'E', 'F', 'G'], step % 7),
    caption: { en: 'One root branching into at most two children per node.', bn: 'এক রুট, প্রতিটি নোডে সর্বোচ্চ দুই চাইল্ড।' },
  }),
  bst: (step) => ({
    view: [640, 220], body: treeSvg([8, 4, 12, 2, 6, 10, 14], step % 7),
    caption: { en: 'Smaller keys go left, larger go right — O(log n) search when balanced.', bn: 'ছোট কী বামে, বড় ডানে—ভারসাম্য থাকলে O(log n) সার্চ।' },
  }),
  traversal: (step) => {
    const order = [3, 1, 4, 0, 5, 2, 6] // in-order over TREE
    return { view: [640, 220], body: treeSvg(['A', 'B', 'C', 'D', 'E', 'F', 'G'], order[step % order.length]),
      caption: { en: 'In-order traversal visits left, node, right → D B E A F C G.', bn: 'ইন-অর্ডার ট্রাভার্সাল বাম, নোড, ডান দেখে → D B E A F C G।' } }
  },
  heap: (step) => ({
    view: [640, 220], body: treeSvg([9, 7, 8, 3, 5, 6, 4], step % 7),
    caption: { en: 'A complete tree where every parent beats its children — peek in O(1).', bn: 'সম্পূর্ণ ট্রি যেখানে প্রতিটি প্যারেন্ট চাইল্ডকে হারায়—পিক O(1)।' },
  }),
  backtracking: (step) => ({
    view: [640, 220], body: treeSvg(['·', 'a', 'b', 'x', 'y', '✗', '✗'], step % 2 === 0 ? 3 : 4, [4, 5]),
    caption: { en: 'Invalid branches are pruned early to shrink the search tree.', bn: 'সার্চ ট্রি ছোট করতে অবৈধ শাখা আগেই ছেঁটে ফেলা হয়।' },
  }),
  trie: (step) => {
    // root -> t -> o(to), e -> a(tea), n(ten)
    const N = { root: [300, 40], t: [300, 100], o: [200, 160], e: [400, 160], a: [340, 220], n: [460, 220] }
    const order = ['root', 't', 'o', 'e', 'a', 'n']
    const cur = order[step % order.length]
    return {
      view: [600, 250],
      body: <>
        <Edge id="tr" x1={300} y1={52} x2={300} y2={88} /><text x={315} y={78} className="dsa-weight">t</text>
        <Edge id="tr" x1={295} y1={112} x2={205} y2={150} /><text x={235} y={132} className="dsa-weight">o</text>
        <Edge id="tr" x1={305} y1={112} x2={395} y2={150} /><text x={370} y={132} className="dsa-weight">e</text>
        <Edge id="tr" x1={393} y1={172} x2={347} y2={210} /><text x={358} y={196} className="dsa-weight">a</text>
        <Edge id="tr" x1={407} y1={172} x2={453} y2={210} /><text x={445} y={196} className="dsa-weight">n</text>
        {Object.entries(N).map(([k, [x, y]]) => <Node key={k} cx={x} cy={y} r={18} label={k === 'root' ? '•' : (['o', 'a', 'n'].includes(k) ? '★' : k)} active={k === cur} />)}
      </>,
      caption: { en: 'Words share prefixes: to, tea, ten — prefix search in O(length).', bn: 'শব্দ প্রিফিক্স ভাগ করে: to, tea, ten—প্রিফিক্স সার্চ O(length)।' },
    }
  },
  graph: (step) => ({
    view: [600, 220], body: graphSvg([['A', 'B', 'C', 'D', 'E'][step % 5]]),
    caption: { en: 'Nodes joined by edges; store as an adjacency list or matrix.', bn: 'এজ দিয়ে যুক্ত নোড; অ্যাডজেসেন্সি লিস্ট বা ম্যাট্রিক্স হিসেবে রাখুন।' },
  }),
  bfs: (step) => {
    const levels = [['A'], ['A', 'B', 'D'], ['A', 'B', 'D', 'C', 'E']]
    return { view: [600, 220], body: graphSvg(levels[step % levels.length]),
      caption: { en: 'BFS expands level by level from the source using a queue.', bn: 'BFS কিউ দিয়ে সোর্স থেকে স্তর-ধরে ছড়ায়।' } }
  },
  dfs: (step) => {
    const path = [['A'], ['A', 'B'], ['A', 'B', 'C'], ['A', 'B', 'C', 'E'], ['A', 'B', 'C', 'E', 'D']]
    return { view: [600, 220], body: graphSvg(path[step % path.length]),
      caption: { en: 'DFS follows one path as deep as possible, then backtracks.', bn: 'DFS একটি পথ যতটা সম্ভব গভীরে যায়, তারপর ব্যাকট্র্যাক করে।' } }
  },
  'weighted-graph': (step) => {
    const tree = [[1, 0], [1, 3], [1, 4], [1, 5]]
    return { view: [600, 220], body: graphSvg(['A', 'B', 'C', 'D', 'E'].slice(0, 1 + (step % 5)), true, tree[step % tree.length]),
      caption: { en: 'Dijkstra expands the closest node first, relaxing edge weights.', bn: 'ডাইক্সট্রা সবচেয়ে কাছের নোড আগে বাড়ায়, এজ ওজন রিল্যাক্স করে।' } }
  },
  complexity: (step, lang) => {
    // growth curves on shared axes
    const W = 520, H = 180, ox = 50, oy = 150, pw = 440, ph = 120
    const fx = (n) => ox + (n / 10) * pw
    const fy = (v) => oy - Math.min(v, 100) / 100 * ph
    const curve = (fn) => Array.from({ length: 41 }, (_, i) => { const n = i / 4; return `${fx(n)},${fy(fn(n))}` }).join(' ')
    const lines = [
      { d: (n) => 4, label: 'O(1)', c: 'c1' },
      { d: (n) => 10 * Math.log2(n + 1), label: 'O(log n)', c: 'c2' },
      { d: (n) => n * 10, label: 'O(n)', c: 'c3' },
      { d: (n) => n * Math.log2(n + 1) * 3, label: 'O(n log n)', c: 'c4' },
      { d: (n) => n * n, label: 'O(n²)', c: 'c5' },
    ]
    const active = step % lines.length
    return {
      view: [W, H],
      body: <>
        <line x1={ox} y1={oy} x2={ox + pw} y2={oy} className="dsa-axis" /><line x1={ox} y1={oy} x2={ox} y2={oy - ph - 6} className="dsa-axis" />
        <text x={ox + pw} y={oy + 16} textAnchor="end" className="dsa-idx">{tr(lang, 'input size n', 'ইনপুট n')}</text>
        {lines.map((l, i) => <polyline key={i} points={curve(l.d)} className={`dsa-curve ${l.c} ${i === active ? 'active' : ''}`} />)}
        {lines.map((l, i) => <text key={i} x={ox + pw - 4} y={26 + i * 18} textAnchor="end" className={`dsa-curve-label ${l.c} ${i === active ? 'active' : ''}`}>{l.label}</text>)}
      </>,
      caption: { en: 'How cost grows with input size — from flat O(1) to steep O(n²).', bn: 'ইনপুট বাড়লে খরচ কীভাবে বাড়ে—সমতল O(1) থেকে খাড়া O(n²)।' },
    }
  },
  dp: (step, lang) => {
    const rows = 3, cols = 5, cell = 46, ox = 60, oy = 30
    const filled = step % (rows * cols + 1)
    return {
      view: [ox + cols * cell + 40, oy + rows * cell + 30],
      body: <>
        {Array.from({ length: rows }).map((_, r) => Array.from({ length: cols }).map((_, c) => { const idx = r * cols + c; return <g key={idx}><rect x={ox + c * cell} y={oy + r * cell} width={cell - 4} height={cell - 4} rx="6" className={`dsa-cell ${idx < filled ? 'active' : ''} ${idx === filled ? 'next' : ''}`} /><text x={ox + c * cell + (cell - 4) / 2} y={oy + r * cell + 27} textAnchor="middle" className="dsa-idx">{idx < filled ? (r + c) : ''}</text></g> }))}
        <text x={ox - 10} y={oy + rows * cell + 20} className="dsa-idx">{tr(lang, 'each cell reuses solved neighbours', 'প্রতিটি সেল সমাধান করা প্রতিবেশী পুনঃব্যবহার করে')}</text>
      </>,
      caption: { en: 'Fill a table once; each cell reuses smaller solved subproblems.', bn: 'টেবিল একবার ভরুন; প্রতিটি সেল ছোট সমাধান করা সাবপ্রবলেম পুনঃব্যবহার করে।' },
    }
  },
}

const STEPS = { 'algo-flow': 4, array: 8, 'binary-search': 3, 'two-pointer': 3, 'sliding-window': 5, 'linked-list': 4, stack: 3, queue: 3, 'hash-table': 5, sorting: 9, greedy: 4, recursion: 4, 'binary-tree': 7, bst: 3, traversal: 7, heap: 3, backtracking: 2, trie: 6, graph: 5, bfs: 3, dfs: 5, 'weighted-graph': 5, complexity: 5, dp: 16, 'git-areas': 4, 'git-branch': 6, 'git-remote': 2, 'git-flow': 6, 'net-stack': 4, 'net-handshake': 4, 'net-hops': 4, 'net-request': 2, 'net-address': 1 }

function DsaDiagram({ kind, lang, title }) {
  const renderer = renderers[kind] || renderers['algo-flow']
  const steps = STEPS[kind] || 4
  const [step, setStep] = useState(0)
  const diagramId = useId().replace(/:/g, '')
  useEffect(() => {
    if (steps <= 1) return undefined
    const timer = window.setInterval(() => setStep((value) => (value + 1) % steps), 1600)
    return () => window.clearInterval(timer)
  }, [steps])
  const { view, body, caption } = renderer(step, lang)
  return (
    <figure className="dsa-figure">
      <div className="dsa-toolbar">
        <span><i />{lang === 'bn' ? 'লাইভ ভিউ' : 'Live view'}</span>
        {steps > 1 && <button type="button" onClick={() => setStep((value) => (value + 1) % steps)}>{lang === 'bn' ? 'পরের ধাপ' : 'Next step'} <span aria-hidden="true">→</span></button>}
      </div>
      <svg viewBox={`0 0 ${view[0]} ${view[1]}`} role="img" aria-label={`${t(title, lang)} — ${t(caption, lang)}`} preserveAspectRatio="xMidYMid meet">
        <defs>
          {['flow', 'll', 'h', 'g', 'tr'].map((id) => <marker key={id} id={`dsa-arrow-${id}`} viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" /></marker>)}
        </defs>
        {body}
      </svg>
      <figcaption>{t(caption, lang)}</figcaption>
    </figure>
  )
}

const SD_FLOW_KINDS = new Set(['request', 'loadbalancer', 'cdn', 'cache', 'database', 'queue', 'sharding', 'url', 'chat', 'feed', 'video'])

export default function CourseDiagram({ kind, courseId, lang, title }) {
  if (courseId === 'dsa' || courseId === 'git' || courseId === 'networking' || renderers[kind]) return <DsaDiagram kind={kind} lang={lang} title={title} />
  if (SD_FLOW_KINDS.has(kind) || !kind) return <ArchitectureDiagram kind={kind} lang={lang} title={title} />
  return <ArchitectureDiagram kind={kind} lang={lang} title={title} />
}
