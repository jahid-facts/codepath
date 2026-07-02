'use client'

import { useState } from 'react'
import { learningStats } from '../learning-stats'
import { defaults, normalizeProgress, todayKey } from '../progress'

function Arrow(){ return <span aria-hidden="true">→</span> }

export default function ProfilePanel({ progress, setProgress, lang, onClose }) {
  const [status, setStatus] = useState('')
  const stats = learningStats(progress)
  const copy = (en, bn) => lang === 'bn' ? bn : en

  const exportProgress = () => {
    const blob = new Blob([JSON.stringify(progress, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `systempath-progress-${todayKey()}.json`
    link.click()
    URL.revokeObjectURL(url)
    setStatus(copy('Progress backup downloaded.', 'ব্যাকআপ ডাউনলোড হয়েছে।'))
  }

  const importProgress = async (event) => {
    const file = event.target.files?.[0]
    if (!file) return
    try {
      const incoming = JSON.parse(await file.text())
      if (incoming.version !== 1 || !Array.isArray(incoming.completed)) throw new Error('Invalid backup')
      setProgress(normalizeProgress(incoming))
      setStatus(copy('Progress restored successfully.', 'অগ্রগতি সফলভাবে ফিরেছে।'))
    } catch {
      setStatus(copy('That backup file is not valid.', 'এই ব্যাকআপ ফাইলটি বৈধ নয়।'))
    }
    event.target.value = ''
  }

  const reset = () => {
    if (window.confirm(copy('Permanently clear all local learning progress?', 'সব স্থানীয় অগ্রগতি স্থায়ীভাবে মুছবেন?'))) {
      setProgress({ ...defaults, language: progress.language, activityDates: [todayKey()], analyticsConsent: progress.analyticsConsent, analyticsOptOut: progress.analyticsOptOut })
      setStatus(copy('Progress has been reset.', 'অগ্রগতি রিসেট হয়েছে।'))
    }
  }

  const toggleAnalytics = () => {
    setProgress((current) => ({ ...current, analyticsOptOut: !current.analyticsOptOut, analyticsConsent: current.analyticsOptOut ? 'granted' : 'denied' }))
    setStatus(progress.analyticsOptOut
      ? copy('Anonymous visit analytics enabled.', 'বেনামী ভিজিট অ্যানালিটিক্স চালু হয়েছে।')
      : copy('Analytics disabled for future visits.', 'ভবিষ্যৎ ভিজিটের অ্যানালিটিক্স বন্ধ হয়েছে।'))
  }

  const deleteAnalytics = async () => {
    const visitorId = window.localStorage.getItem('systempath_visitor_id')
    try {
      if (visitorId) {
        const response = await fetch('/api/analytics/delete', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ visitorId }),
        })
        if (!response.ok) throw new Error('Delete failed')
      }
      window.localStorage.removeItem('systempath_visitor_id')
      window.sessionStorage.removeItem('systempath_session_id')
      window.sessionStorage.removeItem('systempath_visit_recorded')
      setProgress((current) => ({ ...current, analyticsOptOut: true, analyticsConsent: 'denied' }))
      setStatus(copy('Analytics records deleted and future collection disabled.', 'অ্যানালিটিক্স রেকর্ড মুছে ভবিষ্যৎ সংগ্রহ বন্ধ করা হয়েছে।'))
    } catch {
      setStatus(copy('Could not delete analytics right now. Please try again.', 'এখন অ্যানালিটিক্স মোছা যায়নি। আবার চেষ্টা করুন।'))
    }
  }

  const editLearningPath = () => {
    setProgress((current) => ({ ...current, onboarding: { ...current.onboarding, completed: false, retake: true } }))
    onClose()
  }

  return (
    <div className="drawer-backdrop" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <aside className="profile-panel" role="dialog" aria-modal="true" aria-label={copy('Learner profile', 'শিক্ষার্থী প্রোফাইল')}>
        <header>
          <div className="profile-avatar">LP</div>
          <div><span>{copy('Local learner', 'স্থানীয় শিক্ষার্থী')}</span><strong>{copy('Your learning data', 'আপনার শেখার ডেটা')}</strong></div>
          <button onClick={onClose} aria-label="Close">×</button>
        </header>

        <section className="profile-level">
          <div><small>{copy('Current level', 'বর্তমান লেভেল')}</small><strong>{stats.level}</strong></div>
          <span><i style={{ width: `${stats.xp % 300 / 3}%` }} /></span>
          <p><b>{stats.xp} XP</b><small>{300 - stats.xp % 300} XP {copy('to next level', 'পরের লেভেলে')}</small></p>
        </section>

        <div className="profile-mini-stats">
          <span><strong>{progress.completed.length}</strong><small>{copy('Lessons', 'পাঠ')}</small></span>
          <span><strong>{stats.attempts.length}</strong><small>{copy('Attempts', 'চেষ্টা')}</small></span>
          <span><strong>{stats.streak}</strong><small>{copy('Streak', 'স্ট্রিক')}</small></span>
        </div>

        <section className="data-controls">
          <span className="eyebrow">{copy('Learning controls', 'শেখার নিয়ন্ত্রণ')}</span>
          <p>{copy('Progress stays in this browser. You can change your learning path or move a backup to another device.', 'অগ্রগতি এই ব্রাউজারে থাকে। শেখার পথ বদলাতে বা অন্য ডিভাইসে ব্যাকআপ নিতে পারেন।')}</p>
          <button onClick={editLearningPath}><span>✦</span><div><strong>{copy('Update learning path', 'শেখার পথ আপডেট')}</strong><small>{copy('Goal, experience, diagnostic and pace', 'লক্ষ্য, অভিজ্ঞতা, ডায়াগনস্টিক ও গতি')}</small></div><Arrow /></button>
          <button onClick={exportProgress}><span>⇩</span><div><strong>{copy('Download progress', 'অগ্রগতি ডাউনলোড')}</strong><small>JSON backup</small></div><Arrow /></button>
          <label><span>⇧</span><div><strong>{copy('Restore backup', 'ব্যাকআপ ফিরিয়ে আনুন')}</strong><small>SystemPath JSON</small></div><Arrow /><input type="file" accept="application/json" onChange={importProgress} /></label>
        </section>

        <section className="data-controls privacy-controls">
          <span className="eyebrow">{copy('Privacy controls', 'গোপনীয়তা নিয়ন্ত্রণ')}</span>
          <p>{copy('Learning progress is local. With consent, the server stores one technical visit per session, including IP and device details, for aggregate operations.', 'শেখার অগ্রগতি স্থানীয়। সম্মতিতে সার্ভার সমষ্টিগত পরিচালনার জন্য প্রতি সেশনে IP ও ডিভাইসসহ একটি টেকনিক্যাল ভিজিট রাখে।')}</p>
          <button className="analytics-choice" onClick={toggleAnalytics} aria-pressed={!progress.analyticsOptOut}>
            <span>{progress.analyticsOptOut ? '○' : '●'}</span>
            <div><strong>{copy('Anonymous visit analytics', 'বেনামী ভিজিট অ্যানালিটিক্স')}</strong><small>{progress.analyticsOptOut ? copy('Off', 'বন্ধ') : copy('On', 'চালু')}</small></div>
            <i className={progress.analyticsOptOut ? '' : 'active'} aria-hidden="true" />
          </button>
          <button className="danger-control" onClick={deleteAnalytics}><span>⌫</span><div><strong>{copy('Delete my analytics', 'আমার অ্যানালিটিক্স মুছুন')}</strong><small>{copy('Also opts this browser out', 'এই ব্রাউজারে সংগ্রহও বন্ধ করবে')}</small></div></button>
          <button className="danger-control" onClick={reset}><span>×</span><div><strong>{copy('Reset all progress', 'সব অগ্রগতি মুছুন')}</strong><small>{copy('Cannot be undone', 'ফেরানো যাবে না')}</small></div></button>
          {status && <div className="profile-status" role="status">{status}</div>}
        </section>
        <footer>SystemPath · <a href="/privacy">{copy('Privacy policy', 'গোপনীয়তা নীতি')}</a> · {copy('No account required', 'অ্যাকাউন্ট প্রয়োজন নেই')}</footer>
      </aside>
    </div>
  )
}

