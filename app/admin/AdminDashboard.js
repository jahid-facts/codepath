'use client'

import { useEffect, useMemo, useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import styles from './admin.module.css'

const colors = ['#6d5ce7', '#19a77b', '#e59a32', '#2995c7', '#e05283', '#7a879b']
const formatNumber = (value) => new Intl.NumberFormat('en-US').format(value || 0)
const formatDate = (value) => new Intl.DateTimeFormat('en', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' }).format(new Date(value))
const maskIp = (ip = '') => ip.includes(':') ? `${ip.split(':').slice(0, 3).join(':')}::•••` : ip.split('.').map((part, index) => index > 1 ? '•••' : part).join('.')

export default function AdminDashboard({ data }) {
  const router = useRouter()
  const [pending, startTransition] = useTransition()
  const [revealIps, setRevealIps] = useState(false)
  const [query, setQuery] = useState('')
  const [deviceFilter, setDeviceFilter] = useState('All')
  const [page, setPage] = useState(1)
  const pageSize = 12

  const refresh = () => startTransition(() => router.refresh())
  useEffect(() => {
    const timer = window.setInterval(refresh, 30_000)
    return () => window.clearInterval(timer)
  }, [])

  const filtered = useMemo(() => data.recent.filter((visit) => {
    const matchesDevice = deviceFilter === 'All' || visit.device_type === deviceFilter
    const haystack = `${visit.ip_address} ${visit.device_name} ${visit.browser} ${visit.operating_system} ${visit.path} ${visit.timezone}`.toLowerCase()
    return matchesDevice && haystack.includes(query.toLowerCase())
  }), [data.recent, deviceFilter, query])
  const pageCount = Math.max(1, Math.ceil(filtered.length / pageSize))
  const visible = filtered.slice((page - 1) * pageSize, page * pageSize)
  const maxTrend = Math.max(1, ...data.trend.map((item) => item.visits))
  const totalDevices = data.devices.reduce((sum, item) => sum + item.value, 0) || 1

  const exportCsv = () => {
    const header = ['Time', 'Visitor ID', 'IP address', 'Device', 'Type', 'Browser', 'OS', 'Language', 'Timezone', 'Screen', 'Path', 'Referrer']
    const quote = (value) => `"${String(value ?? '').replaceAll('"', '""')}"`
    const csv = [header, ...filtered.map((visit) => [visit.created_at, visit.visitor_id, visit.ip_address, visit.device_name, visit.device_type, visit.browser, visit.operating_system, visit.language, visit.timezone, visit.screen_size, visit.path, visit.referrer])].map((row) => row.map(quote).join(',')).join('\n')
    const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv' }))
    const link = document.createElement('a'); link.href = url; link.download = `systempath-visitors-${new Date().toISOString().slice(0, 10)}.csv`; link.click(); URL.revokeObjectURL(url)
  }
  const logout = async () => { await fetch('/api/admin/logout', { method: 'POST' }); window.location.replace('/admin/login') }

  return <div className={styles.adminShell}>
    <aside className={styles.adminSidebar}><a href="/admin" className={styles.adminBrand}><span>S</span><div><strong>SystemPath</strong><small>Operations console</small></div></a><nav><a className={styles.active} href="#overview"><span>⌂</span>Overview</a><a href="#visitors"><span>◎</span>Visitors</a><a href="#devices"><span>▣</span>Devices</a><a href="#traffic"><span>⌁</span>Traffic</a><a href="/admin/content"><span>✎</span>Content editor</a></nav><div className={styles.privacyNote}><span>⌾</span><strong>Private analytics</strong><p>IP and device data are visible only inside this protected area.</p></div><button className={styles.logout} onClick={logout}>← Sign out</button></aside>
    <main className={styles.adminMain}>
      <header className={styles.adminTopbar}><button className={styles.mobileAdminBrand}>S</button><div><small>Admin / Analytics</small><strong>Visitor intelligence</strong></div><span className={styles.live}><i />Live</span><a className={styles.refresh} href="/admin/content">✎ Content</a><button className={styles.refresh} onClick={refresh} disabled={pending}>{pending ? 'Refreshing…' : '↻ Refresh'}</button><button className={styles.adminAvatar}>AD</button></header>
      <div className={styles.adminContent}>
        <section className={styles.adminIntro} id="overview"><div><span className={styles.eyebrow}>Realtime overview</span><h1>Know your audience.</h1><p>Understand traffic, devices, and learning entry points without leaving your own infrastructure.</p></div><div><small>Last updated</small><strong>{formatDate(data.generatedAt)}</strong><span>Auto-refreshes every 30 seconds</span></div></section>
        <section className={styles.summaryGrid}>
          <SummaryCard icon="◎" label="Total visits" value={formatNumber(data.summary.totalVisits)} detail="All recorded sessions" tone="violet" />
          <SummaryCard icon="♙" label="Unique visitors" value={formatNumber(data.summary.uniqueVisitors)} detail="Browser visitor IDs" tone="blue" />
          <SummaryCard icon="◷" label="Today’s visits" value={formatNumber(data.summary.todayVisitors)} detail={`${data.summary.change >= 0 ? '+' : ''}${data.summary.change}% vs yesterday`} tone="mint" />
          <SummaryCard icon="●" label="Online now" value={formatNumber(data.summary.onlineNow)} detail="Active in last 5 minutes" tone="amber" />
        </section>

        <section className={styles.analyticsGrid} id="traffic">
          <article className={styles.chartCard}><CardHeader eyebrow="Last 7 days" title="Visitor trend" detail={`${formatNumber(data.summary.totalVisits)} total sessions`} /><div className={styles.barChart}>{data.trend.map((item) => <div key={item.day}><span className={styles.barValue}>{item.visits}</span><i style={{ height: `${Math.max(5, item.visits / maxTrend * 100)}%` }}><b style={{ height: `${item.uniqueVisitors / Math.max(item.visits, 1) * 100}%` }} /></i><small>{new Date(`${item.day}T00:00:00`).toLocaleDateString('en', { weekday: 'short' })}</small></div>)}</div></article>
          <article className={styles.chartCard} id="devices"><CardHeader eyebrow="Audience technology" title="Device mix" detail={`${data.devices.length} categories`} /><div className={styles.deviceChart}><div className={styles.donut} style={{ background: donutGradient(data.devices, totalDevices) }}><span><strong>{formatNumber(data.summary.totalVisits)}</strong><small>sessions</small></span></div><div className={styles.legend}>{data.devices.map((item, index) => <div key={item.name}><i style={{ background: colors[index % colors.length] }} /><span>{item.name}</span><strong>{Math.round(item.value / totalDevices * 100)}%</strong></div>)}</div></div></article>
        </section>

        <section className={styles.breakdownGrid}>
          <Breakdown title="Top browsers" items={data.browsers} total={data.summary.totalVisits} />
          <Breakdown title="Operating systems" items={data.operatingSystems} total={data.summary.totalVisits} />
          <Breakdown title="Top entry pages" items={data.topPages} total={data.summary.totalVisits} path />
        </section>

        <section className={styles.visitorCard} id="visitors"><div className={styles.visitorHeader}><div><span className={styles.eyebrow}>Session-level detail</span><h2>Recent visitors</h2><p>Device names are inferred from browser user-agent data; exact hardware models may be hidden by the browser.</p></div><div className={styles.headerActions}><button onClick={() => setRevealIps(!revealIps)}>{revealIps ? '◉ Hide IPs' : '◎ Reveal IPs'}</button><button onClick={exportCsv}>⇩ Export CSV</button></div></div><div className={styles.filters}><label><span>⌕</span><input value={query} onChange={(event) => { setQuery(event.target.value); setPage(1) }} placeholder="Search IP, device, browser, path…" /></label><select value={deviceFilter} onChange={(event) => { setDeviceFilter(event.target.value); setPage(1) }}><option>All</option><option>Desktop</option><option>Mobile</option><option>Tablet</option></select><small>{filtered.length} sessions</small></div><div className={styles.tableWrap}><table><thead><tr><th>Visitor</th><th>IP address</th><th>Device</th><th>Browser / OS</th><th>Location context</th><th>Entry path</th><th>Time</th></tr></thead><tbody>{visible.map((visit) => <tr key={visit.id}><td><span className={styles.visitorIcon}>{visit.device_type === 'Mobile' ? '▯' : visit.device_type === 'Tablet' ? '▤' : '▣'}</span><div><strong>{visit.visitor_id.slice(0, 8)}</strong><small>{visit.screen_size}</small></div></td><td><code>{revealIps ? visit.ip_address : maskIp(visit.ip_address)}</code></td><td><strong>{visit.device_name}</strong><small>{visit.device_type}</small></td><td><strong>{visit.browser}</strong><small>{visit.operating_system}</small></td><td><strong>{visit.timezone}</strong><small>{visit.language}</small></td><td><code>{visit.path}</code></td><td><strong>{formatDate(visit.created_at)}</strong><small>{visit.referrer === 'Direct' ? 'Direct visit' : 'Referred'}</small></td></tr>)}{!visible.length && <tr><td colSpan="7"><div className={styles.emptyTable}>No visitor sessions match these filters.</div></td></tr>}</tbody></table></div><footer className={styles.tableFooter}><span>Page {page} of {pageCount}</span><div><button disabled={page === 1} onClick={() => setPage(page - 1)}>←</button><button disabled={page === pageCount} onClick={() => setPage(page + 1)}>→</button></div></footer></section>
      </div>
    </main>
  </div>
}

function SummaryCard({ icon, label, value, detail, tone }) { return <article className={`${styles.summaryCard} ${styles[tone]}`}><span>{icon}</span><div><small>{label}</small><strong>{value}</strong><p>{detail}</p></div></article> }
function CardHeader({ eyebrow, title, detail }) { return <header className={styles.cardHeader}><div><span>{eyebrow}</span><h2>{title}</h2></div><small>{detail}</small></header> }
function donutGradient(items, total) { let cursor = 0; const stops = items.map((item, index) => { const start = cursor; cursor += item.value / total * 100; return `${colors[index % colors.length]} ${start}% ${cursor}%` }); return `conic-gradient(${stops.length ? stops.join(',') : '#eceaf3 0 100%'})` }
function Breakdown({ title, items, total, path }) { return <article className={styles.breakdownCard}><h3>{title}</h3>{items.length ? items.map((item, index) => <div key={item.name}><span><i style={{ background: colors[index % colors.length] }} />{path ? <code>{item.name}</code> : item.name}</span><b><i style={{ width: `${item.value / Math.max(total, 1) * 100}%`, background: colors[index % colors.length] }} /></b><strong>{item.value}</strong></div>) : <p>No data yet.</p>}</article> }
