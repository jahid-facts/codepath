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

const STEPS = { 'algo-flow': 4, array: 8, 'binary-search': 3, 'two-pointer': 3, 'sliding-window': 5, 'linked-list': 4, stack: 1, queue: 1, 'hash-table': 5, sorting: 9, greedy: 4, recursion: 4, 'binary-tree': 7, bst: 7, traversal: 7, heap: 7, backtracking: 2, trie: 6, graph: 5, bfs: 3, dfs: 5, 'weighted-graph': 5, complexity: 5, dp: 16 }

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
  if (courseId === 'dsa' || renderers[kind]) return <DsaDiagram kind={kind} lang={lang} title={title} />
  if (SD_FLOW_KINDS.has(kind) || !kind) return <ArchitectureDiagram kind={kind} lang={lang} title={title} />
  return <ArchitectureDiagram kind={kind} lang={lang} title={title} />
}
