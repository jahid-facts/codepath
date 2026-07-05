'use client'

import { useEffect, useId, useState } from 'react'

const t = (value, lang) => value?.[lang] ?? value?.en ?? value ?? ''

const diagramPresets = {
  request: ['Client', 'DNS', 'API', 'Database'], loadbalancer: ['Client', 'Load balancer', 'Servers', 'Database'], cdn: ['User', 'Edge CDN', 'Origin', 'Storage'], cache: ['App', 'Cache', 'Database', 'Result'], database: ['App', 'Primary DB', 'Replica', 'Backup'], queue: ['Producer', 'Queue', 'Workers', 'Storage'], sharding: ['Client', 'Router', 'Shard A/B', 'Result'], url: ['Short URL', 'Edge cache', 'Redirect API', 'URL store'], chat: ['Clients', 'Gateway', 'Message queue', 'History'], feed: ['Creators', 'Fan-out', 'User inbox', 'Ranker'], video: ['Upload', 'Object store', 'Transcode queue', 'CDN'],
  osi: ['Application', 'Transport', 'Network', 'Link'], ip: ['Host A', 'Router', 'Router', 'Host B'], tcp: ['SYN', 'SYN-ACK', 'ACK', 'Data'], http: ['Request', 'TCP', 'TLS', 'Response'], tls: ['ClientHello', 'Certificate', 'Key exchange', 'Encrypted'], dns: ['Browser', 'Resolver', 'TLD server', 'Auth server'],
}
const diagramBn = { Client: 'ক্লায়েন্ট', DNS: 'DNS', API: 'API', Database: 'ডেটাবেস', 'Load balancer': 'লোড ব্যালান্সার', Servers: 'সার্ভার', User: 'ব্যবহারকারী', 'Edge CDN': 'এজ CDN', Origin: 'অরিজিন', Storage: 'স্টোরেজ', App: 'অ্যাপ', Cache: 'ক্যাশ', Result: 'ফল', 'Primary DB': 'প্রাইমারি DB', Replica: 'রেপ্লিকা', Backup: 'ব্যাকআপ', Producer: 'প্রোডিউসার', Queue: 'কিউ', Workers: 'ওয়ার্কার', Router: 'রাউটার', 'Shard A/B': 'শার্ড A/B', 'Short URL': 'শর্ট URL', 'Edge cache': 'এজ ক্যাশ', 'Redirect API': 'রিডাইরেক্ট API', 'URL store': 'URL স্টোর', Clients: 'ক্লায়েন্ট', Gateway: 'গেটওয়ে', 'Message queue': 'মেসেজ কিউ', History: 'ইতিহাস', Creators: 'ক্রিয়েটর', 'Fan-out': 'ফ্যান-আউট', 'User inbox': 'ইউজার ইনবক্স', Ranker: 'র‍্যাঙ্কার', Upload: 'আপলোড', 'Object store': 'অবজেক্ট স্টোর', 'Transcode queue': 'ট্রান্সকোড কিউ', CDN: 'CDN', Application: 'অ্যাপ্লিকেশন', Transport: 'ট্রান্সপোর্ট', Network: 'নেটওয়ার্ক', Link: 'লিংক', 'Host A': 'হোস্ট A', 'Host B': 'হোস্ট B', Data: 'ডেটা', Request: 'রিকোয়েস্ট', Response: 'রেসপন্স', Certificate: 'সার্টিফিকেট', 'Key exchange': 'কী এক্সচেঞ্জ', Encrypted: 'এনক্রিপ্টেড', Browser: 'ব্রাউজার', Resolver: 'রিজলভার', 'TLD server': 'TLD সার্ভার', 'Auth server': 'অথ সার্ভার' }

export default function ArchitectureDiagram({ kind, lang, title }) {
  const nodes = diagramPresets[kind] || diagramPresets.request
  const [step, setStep] = useState(0)
  const diagramId = useId().replace(/:/g, '')
  useEffect(() => {
    const timer = window.setInterval(() => setStep((value) => (value + 1) % nodes.length), 1400)
    return () => window.clearInterval(timer)
  }, [nodes.length])
  return <figure className="architecture-figure">
    <div className="diagram-toolbar"><span><i /> {lang === 'bn' ? 'লাইভ ফ্লো' : 'Live flow'}</span><button onClick={() => setStep((step + 1) % nodes.length)}>{lang === 'bn' ? 'পরের ধাপ' : 'Next step'} <span aria-hidden="true">→</span></button></div>
    <svg viewBox="0 0 760 210" role="group" aria-labelledby={`${diagramId}-title ${diagramId}-desc`}>
      <title id={`${diagramId}-title`}>{t(title, lang)} architecture</title><desc id={`${diagramId}-desc`}>{lang === 'bn' ? `রিকোয়েস্ট প্রবাহ: ${nodes.map((n) => diagramBn[n] || n).join(' থেকে ')}` : `Request flows from ${nodes.join(' to ')}.`}</desc>
      <defs><marker id={`arrow-${kind}`} viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" /></marker><filter id="soft"><feDropShadow dx="0" dy="4" stdDeviation="5" floodOpacity=".12" /></filter></defs>
      {nodes.slice(0, -1).map((_, i) => <line key={i} x1={145 + i * 180} y1="100" x2={205 + i * 180} y2="100" className={step > i ? 'active' : ''} markerEnd={`url(#arrow-${kind})`} />)}
      {nodes.map((node, i) => <g key={node} transform={`translate(${25 + i * 180} 55)`} className={step === i ? 'active-node' : ''} onClick={() => setStep(i)} onKeyDown={(event) => (event.key === 'Enter' || event.key === ' ') && setStep(i)} role="button" tabIndex="0"><rect width="120" height="90" rx="18" filter="url(#soft)" /><circle cx="60" cy="28" r="12" /><text x="60" y="62" textAnchor="middle">{lang === 'bn' ? (diagramBn[node] || node) : node}</text><text className="node-step" x="60" y="79" textAnchor="middle">0{i + 1}</text></g>)}
    </svg>
    <div className="mobile-flow" role="group" aria-label={lang === 'bn' ? `রিকোয়েস্ট প্রবাহ: ${nodes.map((node) => diagramBn[node] || node).join(' থেকে ')}` : `Request flow: ${nodes.join(' to ')}`}>
      {nodes.map((node, index) => <div key={node}><button className={step === index ? 'active' : ''} onClick={() => setStep(index)}><span>0{index + 1}</span><i /><strong>{lang === 'bn' ? (diagramBn[node] || node) : node}</strong></button>{index < nodes.length - 1 && <b aria-hidden="true">↓</b>}</div>)}
    </div>
    <figcaption>{lang === 'bn' ? `${nodes.length} ধাপের প্রবাহ—সক্রিয় কম্পোনেন্টটি উজ্জ্বল দেখানো হয়েছে।` : `${nodes.length}-step flow—the active component is highlighted.`}</figcaption>
  </figure>
}
