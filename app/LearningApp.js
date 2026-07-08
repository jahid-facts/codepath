'use client'

import { useEffect, useMemo, useState } from 'react'
import { l, ui } from './data'
import { siteName } from './site'
import { courses, availableCourses, allTopics, allLabs, getCourse, courseForTopic, courseForLab, DEFAULT_COURSE_ID } from './course-registry'
import { CourseContext, useCourse } from './course-context'
import SiteFooter from './components/SiteFooter'
import { calculateSimulation, sameAnswers } from './logic'
import { defaults, loadProgress, STORAGE_KEY, todayKey } from './progress'
import Onboarding from './components/Onboarding'
import AnalyticsConsent from './components/AnalyticsConsent'
import CourseDiagram from './components/CourseDiagram'
import ProfilePanel from './components/ProfilePanel'
import { learningStats } from './learning-stats'
import ClientObservability from './components/ClientObservability'

const t = (value, lang) => value?.[lang] ?? value?.en ?? value ?? ''

// Primary docs-style sections shown in the top navigation bar. `requires` hides a
// section for courses that have no content for it (e.g. DSA has no case studies).
const SECTIONS = [
  { id: 'curriculum', path: '/learn', icon: 'learn', label: { en: 'Learn', bn: 'শিখুন' }, match: ['curriculum', 'lesson', 'exam'] },
  { id: 'cases', path: '/case-studies', icon: 'cases', label: { en: 'Case studies', bn: 'কেস স্টাডি' }, match: ['cases'], requires: (course) => course.topics?.some((topic) => topic.difficulty === 'Case study') },
  { id: 'tools', path: '/tools', icon: 'simulator', label: { en: 'Tools', bn: 'টুলস' }, match: ['tools', 'simulator', 'labs'] },
  { id: 'interview', path: '/interview', icon: 'interview', label: { en: 'Interview', bn: 'ইন্টারভিউ' }, match: ['interview'] },
  { id: 'cheatsheet', path: '/cheatsheet', icon: 'cheatsheet', label: { en: 'Cheatsheet', bn: 'চিটশিট' }, match: ['cheatsheet'] },
  { id: 'glossary', path: '/glossary', icon: 'glossary', label: { en: 'Glossary', bn: 'শব্দকোষ' }, match: ['glossary'] },
]

const sectionsForCourse = (course) => SECTIONS.filter((section) => !section.requires || section.requires(course))

// Views that render inside the docs layout with the collapsible category sidebar.
const SIDEBAR_VIEWS = ['curriculum', 'lesson', 'exam']

function viewFromLocation() {
  if (typeof window === 'undefined') return { name: 'dashboard' }
  const legacy = window.location.hash.replace(/^#\/?/, '').split('/')
  if (legacy[0]) {
    if (legacy[0] === 'lesson' && allTopics.some((topic) => topic.id === legacy[1])) return { name: 'lesson', topicId: legacy[1] }
    if (legacy[0] === 'exam' && allTopics.some((topic) => topic.id === legacy[1])) return { name: 'exam', topicId: legacy[1] }
    if (['curriculum', 'labs', 'simulator', 'review'].includes(legacy[0])) return { name: legacy[0] }
  }
  const [, section, id] = window.location.pathname.split('/')
  if (section === 'lessons' && allTopics.some((topic) => topic.id === id)) return { name: 'lesson', topicId: id }
  if (section === 'exams' && allTopics.some((topic) => topic.id === id)) return { name: 'exam', topicId: id }
  if (section === 'labs') return { name: 'labs', labId: allLabs.some((lab) => lab.id === id) ? id : undefined }
  if (section === 'learn') return { name: 'curriculum' }
  if (section === 'courses') return { name: 'catalog' }
  if (section === 'case-studies') return { name: 'cases' }
  if (['tools', 'interview', 'cheatsheet', 'glossary', 'simulator', 'review'].includes(section)) return { name: section }
  return { name: 'dashboard' }
}

function pathForView(name, data = {}) {
  if (name === 'dashboard') return '/'
  if (name === 'curriculum') return '/learn'
  if (name === 'catalog') return '/courses'
  if (name === 'lesson' && data.topicId) return `/lessons/${data.topicId}`
  if (name === 'exam' && data.topicId) return `/exams/${data.topicId}`
  if (name === 'labs') return data.labId ? `/labs/${data.labId}` : '/labs'
  if (name === 'cases') return '/case-studies'
  return `/${name}`
}

function Icon({ name }) {
  const icons = {
    dashboard: '⌂', learn: '▤', labs: '◇', simulator: '⌁', check: '✓', bookmark: '◆', clock: '◷', arrow: '→', back: '←', spark: '✦',
    cases: '◱', interview: '◈', cheatsheet: '☰', glossary: '𝐀', home: '⌂', chevron: '⌄', book: '▤',
  }
  return <span aria-hidden="true">{icons[name] || '•'}</span>
}

export default function LearningApp({ initialView = { name: 'dashboard' } }) {
  const [progress, setProgress] = useState(defaults)
  const [ready, setReady] = useState(false)
  const [view, setView] = useState(initialView)
  const [searchOpen, setSearchOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)

  useEffect(() => {
    const stored = loadProgress()
    const today = todayKey()
    setProgress({ ...stored, activityDates: [...new Set([...(stored.activityDates || []), today])].slice(-120) })
    setView(viewFromLocation())
    setReady(true)
  }, [])

  useEffect(() => {
    if (ready) {
      try { window.localStorage.setItem(STORAGE_KEY, JSON.stringify(progress)) } catch { /* Keep the learning experience usable if storage is unavailable. */ }
    }
  }, [progress, ready])

  useEffect(() => {
    document.documentElement.lang = progress.language === 'bn' ? 'bn' : 'en'
  }, [progress.language])

  useEffect(() => {
    const handleLocation = () => setView(viewFromLocation())
    const handleShortcut = (event) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') { event.preventDefault(); setSearchOpen(true) }
      if (event.key === '/' && !['INPUT', 'TEXTAREA'].includes(document.activeElement?.tagName)) { event.preventDefault(); setSearchOpen(true) }
      if (event.key === 'Escape') { setSearchOpen(false); setProfileOpen(false) }
    }
    window.addEventListener('popstate', handleLocation)
    window.addEventListener('keydown', handleShortcut)
    return () => { window.removeEventListener('popstate', handleLocation); window.removeEventListener('keydown', handleShortcut) }
  }, [])

  const lang = progress.language
  const text = (value) => t(value, lang)
  const navigate = (name, data = {}) => {
    setView({ name, ...data })
    window.history.pushState({}, '', pathForView(name, data))
    window.scrollTo({ top: 0, behavior: 'smooth' })
    window.requestAnimationFrame(() => document.getElementById('main-content')?.focus({ preventScroll: true }))
  }
  const openTopic = (topicId) => {
    setProgress((p) => ({ ...p, recents: [topicId, ...p.recents.filter((id) => id !== topicId)].slice(0, 5) }))
    navigate('lesson', { topicId })
  }
  const update = (patch) => setProgress((p) => ({ ...p, ...patch }))

  // Resolve the active course: the topic/lab in view wins, else the last chosen course.
  const activeCourseId = useMemo(() => {
    if (view.topicId) return courseForTopic(view.topicId)?.id || progress.activeCourse || DEFAULT_COURSE_ID
    if (view.name === 'labs' && view.labId) return courseForLab(view.labId)?.id || progress.activeCourse || DEFAULT_COURSE_ID
    return progress.activeCourse || DEFAULT_COURSE_ID
  }, [view, progress.activeCourse])
  const course = getCourse(activeCourseId) || getCourse(DEFAULT_COURSE_ID)
  const switchCourse = (courseId, target = 'dashboard') => {
    setProgress((p) => ({ ...p, activeCourse: courseId }))
    navigate(target)
  }
  const courseValue = { course, courses, availableCourses, activeCourseId, switchCourse, topics: course.topics, modules: course.modules, labs: course.labs }

  const completedCount = course.topics.filter((topic) => progress.completed.includes(topic.id)).length
  const needsOnboarding = ready && activeCourseId === DEFAULT_COURSE_ID && !progress.onboarding.completed && (progress.onboarding.retake || (progress.completed.length === 0 && Object.values(progress.attempts).flat().length === 0))

  const withSidebar = SIDEBAR_VIEWS.includes(view.name)
  return (
    <CourseContext.Provider value={courseValue}>
    <div className={`app-frame docs-shell ${withSidebar ? 'has-sidebar' : 'full-width'}`}>
      <a className="skip-link" href="#main-content">{lang === 'bn' ? 'মূল বিষয়বস্তুতে যান' : 'Skip to main content'}</a>
      <div className="sr-only" role="status" aria-live="polite">{lang === 'bn' ? 'বর্তমান পৃষ্ঠা' : 'Current page'}: {view.name}</div>
      <VisitTracker disabled={!ready || progress.analyticsOptOut || progress.analyticsConsent !== 'granted'} />
      <ClientObservability enabled={ready && progress.analyticsConsent === 'granted' && !progress.analyticsOptOut} />
      <ReadingProgress active={view.name === 'lesson'} />

      <TopNav
        view={view}
        lang={lang}
        course={course}
        courses={courses}
        switchCourse={switchCourse}
        completedCount={completedCount}
        navigate={navigate}
        onSearch={() => setSearchOpen(true)}
        onProfile={() => setProfileOpen(true)}
        onToggleLang={() => update({ language: lang === 'en' ? 'bn' : 'en' })}
      />

      <div className="docs-body">
        {withSidebar && <DocsSidebar view={view} progress={progress} lang={lang} openTopic={openTopic} navigate={navigate} completedCount={completedCount} />}
        <div className="main-column">
          <main className="content" id="main-content" tabIndex="-1">
            {view.name === 'catalog' && <Catalog progress={progress} lang={lang} switchCourse={switchCourse} activeCourseId={activeCourseId} />}
            {view.name === 'dashboard' && <Dashboard progress={progress} lang={lang} openTopic={openTopic} navigate={navigate} />}
            {view.name === 'curriculum' && <Curriculum progress={progress} lang={lang} openTopic={openTopic} />}
            {view.name === 'lesson' && <Lesson topicId={view.topicId} progress={progress} setProgress={setProgress} lang={lang} openTopic={openTopic} navigate={navigate} />}
            {view.name === 'exam' && <Exam topicId={view.topicId} progress={progress} setProgress={setProgress} lang={lang} navigate={navigate} openTopic={openTopic} />}
            {view.name === 'labs' && <Labs progress={progress} setProgress={setProgress} lang={lang} initialLabId={view.labId} navigate={navigate} />}
            {view.name === 'simulator' && <Simulator progress={progress} setProgress={setProgress} lang={lang} />}
            {view.name === 'review' && <ReviewCenter progress={progress} lang={lang} openTopic={openTopic} navigate={navigate} />}
            {view.name === 'tools' && <Tools progress={progress} lang={lang} navigate={navigate} />}
            {view.name === 'cases' && <CaseStudies progress={progress} lang={lang} openTopic={openTopic} />}
            {view.name === 'interview' && <Interview progress={progress} lang={lang} openTopic={openTopic} navigate={navigate} />}
            {view.name === 'cheatsheet' && <Cheatsheet progress={progress} lang={lang} openTopic={openTopic} />}
            {view.name === 'glossary' && <Glossary lang={lang} openTopic={openTopic} />}
          </main>
          <SiteFooter lang={lang} navigate={navigate} />
        </div>
      </div>

      <nav className="mobile-nav" aria-label="Mobile navigation">
        <NavButton active={view.name === 'dashboard'} icon="home" label={lang === 'bn' ? 'হোম' : 'Home'} onClick={() => navigate('dashboard')} />
        <NavButton active={['curriculum', 'lesson', 'exam'].includes(view.name)} icon="learn" label={text(ui.learn)} onClick={() => navigate('curriculum')} />
        {course.topics.some((topic) => topic.difficulty === 'Case study')
          ? <NavButton active={view.name === 'cases'} icon="cases" label={lang === 'bn' ? 'কেস' : 'Cases'} onClick={() => navigate('cases')} />
          : <NavButton active={view.name === 'catalog'} icon="book" label={lang === 'bn' ? 'কোর্স' : 'Courses'} onClick={() => navigate('catalog')} />}
        <NavButton active={['tools', 'simulator', 'labs'].includes(view.name)} icon="simulator" label={lang === 'bn' ? 'টুলস' : 'Tools'} onClick={() => navigate('tools')} />
        <NavButton active={view.name === 'interview'} icon="interview" label={lang === 'bn' ? 'ইন্টারভিউ' : 'Interview'} onClick={() => navigate('interview')} />
      </nav>
      {searchOpen && <SearchPalette lang={lang} progress={progress} onClose={() => setSearchOpen(false)} openTopic={(id) => { setSearchOpen(false); openTopic(id) }} />}
      {profileOpen && <ProfilePanel progress={progress} setProgress={setProgress} lang={lang} onClose={() => setProfileOpen(false)} />}
      {needsOnboarding && <Onboarding lang={lang} onFinish={(onboarding, startTopic) => { setProgress((current) => ({ ...current, onboarding: { ...onboarding, completed: true, retake: false } })); if (startTopic) openTopic(onboarding.recommendedTopic) }} />}
      {(searchOpen || profileOpen || needsOnboarding) && <DialogFocusManager selector={needsOnboarding ? '.onboarding' : profileOpen ? '.profile-panel' : '.search-palette'} />}
      {ready && progress.analyticsConsent === 'unset' && !needsOnboarding && <AnalyticsConsent lang={lang} onAccept={() => setProgress((current) => ({ ...current, analyticsConsent: 'granted', analyticsOptOut: false }))} onDecline={() => setProgress((current) => ({ ...current, analyticsConsent: 'denied', analyticsOptOut: true }))} />}
      <FocusTimer lang={lang} />
    </div>
    </CourseContext.Provider>
  )
}

function NavButton({ active, icon, label, onClick, badge }) {
  return <button className={`nav-button ${active ? 'active' : ''}`} aria-current={active ? 'page' : undefined} onClick={onClick}><Icon name={icon} /><span>{label}</span>{badge && <small>{badge}</small>}</button>
}

function TopNav({ view, lang, course, courses, switchCourse, navigate, onSearch, onProfile, onToggleLang }) {
  const text = (v) => t(v, lang)
  return (
    <header className="top-nav">
      <button className="app-wordmark" onClick={() => navigate('dashboard')} aria-label={siteName}>{siteName}</button>
      <CourseSwitcher course={course} courses={courses} lang={lang} switchCourse={switchCourse} navigate={navigate} />
      <nav className="top-nav-links" aria-label="Primary navigation">
        {sectionsForCourse(course).map((section) => {
          const active = section.match.includes(view.name)
          return (
            <button key={section.id} className={`top-nav-link ${active ? 'active' : ''}`} aria-current={active ? 'page' : undefined} onClick={() => navigate(section.id)}>
              <Icon name={section.icon} /><span>{text(section.label)}</span>
            </button>
          )
        })}
      </nav>
      <div className="top-nav-actions">
        <button className="search-trigger" onClick={onSearch} aria-label={lang === 'bn' ? 'পাঠ খুঁজুন' : 'Search lessons'}><span>⌕</span><b>{lang === 'bn' ? 'খুঁজুন' : 'Search'}</b><kbd>⌘K</kbd></button>
        <button className="language-toggle" onClick={onToggleLang} aria-label="Switch language">
          <span className={lang === 'bn' ? 'active' : ''}>বাং</span><span className={lang === 'en' ? 'active' : ''}>EN</span>
        </button>
        <button className="avatar" onClick={onProfile} aria-label="Local learner profile">LP</button>
      </div>
    </header>
  )
}

function CourseSwitcher({ course, courses, lang, switchCourse, navigate }) {
  const [open, setOpen] = useState(false)
  const text = (v) => t(v, lang)
  useEffect(() => {
    if (!open) return
    const close = (event) => { if (!event.target.closest('.course-switcher')) setOpen(false) }
    window.addEventListener('click', close)
    return () => window.removeEventListener('click', close)
  }, [open])
  return (
    <div className="course-switcher">
      <button className="course-switcher-trigger" aria-expanded={open} aria-haspopup="menu" onClick={() => setOpen((value) => !value)}>
        <span className="brand-mark" style={{ background: `linear-gradient(145deg, ${course.color}, ${course.color})` }}>{course.mark}</span>
        <span className="brand-text"><strong>{text(course.tagline)}</strong><small>{lang === 'bn' ? 'কোর্স বদলান' : 'Switch course'}</small></span>
        <span className="course-switcher-chevron" aria-hidden="true">⌄</span>
      </button>
      {open && (
        <div className="course-menu" role="menu">
          <p className="course-menu-label">{lang === 'bn' ? 'কোর্স' : 'Courses'}</p>
          {courses.map((item) => (
            <button
              key={item.id}
              role="menuitem"
              disabled={!item.available}
              className={`course-menu-item ${item.id === course.id ? 'active' : ''} ${item.available ? '' : 'soon'}`}
              onClick={() => { if (item.available) { setOpen(false); switchCourse(item.id) } }}
            >
              <span className="course-menu-mark" style={{ background: item.accent, color: item.color }}>{item.mark}</span>
              <span className="course-menu-copy"><strong>{text(item.title)}</strong><small>{item.available ? text(item.tagline) : (lang === 'bn' ? 'শীঘ্রই আসছে' : 'Coming soon')}</small></span>
              {item.id === course.id && item.available && <b aria-hidden="true">✓</b>}
            </button>
          ))}
          <button className="course-menu-all" role="menuitem" onClick={() => { setOpen(false); navigate('catalog') }}>{lang === 'bn' ? 'সব কোর্স দেখুন' : 'Browse all courses'} <Icon name="arrow" /></button>
        </div>
      )}
    </div>
  )
}

function DocsSidebar({ view, progress, lang, openTopic, navigate, completedCount }) {
  const { topics, modules } = useCourse()
  const text = (v) => t(v, lang)
  const activeTopicId = view.topicId
  const activeModuleId = topics.find((topic) => topic.id === activeTopicId)?.moduleId
  const [open, setOpen] = useState(() => Object.fromEntries(modules.map((module) => [module.id, activeModuleId ? module.id === activeModuleId : true])))
  useEffect(() => { if (activeModuleId) setOpen((prev) => ({ ...prev, [activeModuleId]: true })) }, [activeModuleId])
  const pct = Math.round(completedCount / topics.length * 100)
  return (
    <aside className="docs-sidebar" aria-label={lang === 'bn' ? 'পাঠ্যক্রম' : 'Curriculum'}>
      <div className="docs-sidebar-inner">
        <button className={`docs-overview ${view.name === 'curriculum' ? 'active' : ''}`} onClick={() => navigate('curriculum')}>
          <Icon name="book" /><span>{lang === 'bn' ? 'সম্পূর্ণ পাঠ্যক্রম' : 'Full curriculum'}</span><small>{completedCount}/{topics.length}</small>
        </button>
        <div className="docs-tree">
          {modules.map((module) => {
            const list = topics.filter((topic) => topic.moduleId === module.id)
            const done = list.filter((topic) => progress.completed.includes(topic.id)).length
            const isOpen = open[module.id]
            return (
              <section className={`docs-group ${isOpen ? 'open' : ''}`} key={module.id} style={{ '--module-color': module.color }}>
                <button className="docs-group-head" aria-expanded={isOpen} onClick={() => setOpen((prev) => ({ ...prev, [module.id]: !prev[module.id] }))}>
                  <span className="docs-group-num">{module.number}</span>
                  <span className="docs-group-title">{text(module.title)}</span>
                  <span className="docs-group-count">{done}/{list.length}</span>
                  <span className="docs-chevron"><Icon name="chevron" /></span>
                </button>
                {isOpen && (
                  <ul className="docs-links">
                    {list.map((topic) => {
                      const complete = progress.completed.includes(topic.id)
                      const active = topic.id === activeTopicId
                      return (
                        <li key={topic.id}>
                          <button className={`docs-link ${active ? 'active' : ''} ${complete ? 'complete' : ''}`} aria-current={active ? 'page' : undefined} onClick={() => openTopic(topic.id)}>
                            <span className="docs-link-dot">{complete ? <Icon name="check" /> : String(topic.order).padStart(2, '0')}</span>
                            <span className="docs-link-title">{text(topic.title)}</span>
                          </button>
                        </li>
                      )
                    })}
                  </ul>
                )}
              </section>
            )
          })}
        </div>
        <div className="docs-sidebar-progress">
          <div className="progress-ring" style={{ '--progress': `${pct}deg` }}><strong>{pct}%</strong></div>
          <div><strong>{lang === 'bn' ? 'আপনার অগ্রগতি' : 'Your progress'}</strong><small>{completedCount} {lang === 'bn' ? 'টি সম্পন্ন' : 'complete'}</small></div>
        </div>
      </div>
    </aside>
  )
}

function DialogFocusManager({ selector }) {
  useEffect(() => {
    const previous = document.activeElement
    const dialog = document.querySelector(selector)
    const focusableSelector = 'button:not(:disabled), a[href], input:not(:disabled), textarea:not(:disabled), select:not(:disabled), [tabindex]:not([tabindex="-1"])'
    const focusable = () => [...(dialog?.querySelectorAll(focusableSelector) || [])].filter((element) => !element.hidden)
    focusable()[0]?.focus()
    const trap = (event) => {
      if (event.key !== 'Tab') return
      const items = focusable()
      if (!items.length) return
      const first = items[0]
      const last = items[items.length - 1]
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus() }
      if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus() }
    }
    document.addEventListener('keydown', trap)
    return () => { document.removeEventListener('keydown', trap); previous?.focus?.() }
  }, [selector])
  return null
}

function PageIntro({ eyebrow, title, description, action }) {
  return <div className="page-intro"><div><span className="eyebrow">{eyebrow}</span><h1>{title}</h1><p>{description}</p></div>{action}</div>
}

function VisitTracker({ disabled }) {
  useEffect(() => {
    try {
      if (disabled || navigator.doNotTrack === '1' || sessionStorage.getItem('systempath_visit_recorded')) return
      const visitorKey = 'systempath_visitor_id'
      const sessionKey = 'systempath_session_id'
      let visitorId = localStorage.getItem(visitorKey)
      let sessionId = sessionStorage.getItem(sessionKey)
      if (!visitorId) { visitorId = crypto.randomUUID(); localStorage.setItem(visitorKey, visitorId) }
      if (!sessionId) { sessionId = crypto.randomUUID(); sessionStorage.setItem(sessionKey, sessionId) }
      const payload = {
        visitorId,
        sessionId,
        deviceName: navigator.userAgentData?.platform || '',
        language: navigator.language || 'Unknown',
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || 'Unknown',
        screenSize: `${window.screen.width}×${window.screen.height}`,
        path: `${window.location.pathname}${window.location.hash}`,
        referrer: document.referrer || 'Direct',
      }
      fetch('/api/analytics/visit', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload), keepalive: true })
        .then((response) => { if (response.ok) sessionStorage.setItem('systempath_visit_recorded', '1') })
        .catch(() => {})
    } catch { /* Analytics must never interrupt learning in restricted browsers. */ }
  }, [disabled])
  return null
}

function ReadingProgress({ active }) {
  const [percent, setPercent] = useState(0)
  useEffect(() => {
    if (!active) { setPercent(0); return }
    const update = () => {
      const available = document.documentElement.scrollHeight - window.innerHeight
      setPercent(available > 0 ? Math.min(100, Math.round(window.scrollY / available * 100)) : 0)
    }
    update()
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [active])
  return active ? <div className="reading-progress" aria-hidden="true"><i style={{ width: `${percent}%` }} /></div> : null
}

function FocusTimer({ lang }) {
  const [seconds, setSeconds] = useState(25 * 60)
  const [running, setRunning] = useState(false)
  const [open, setOpen] = useState(false)
  useEffect(() => {
    if (!running || seconds <= 0) return
    const timer = window.setInterval(() => setSeconds((value) => Math.max(0, value - 1)), 1000)
    return () => window.clearInterval(timer)
  }, [running, seconds])
  useEffect(() => { if (seconds === 0) setRunning(false) }, [seconds])
  const minutes = String(Math.floor(seconds / 60)).padStart(2, '0')
  const remaining = String(seconds % 60).padStart(2, '0')
  const toggleTimer = () => { if (seconds === 0) setSeconds(25 * 60); setRunning(!running) }
  return <aside className={`focus-timer ${open ? 'open' : ''}`} aria-live="polite"><button className="focus-toggle" onClick={() => setOpen(!open)} aria-label={lang === 'bn' ? 'ফোকাস টাইমার' : 'Focus timer'}><span>{running ? '◉' : '◷'}</span>{running && <i />}</button>{open && <div><header><span>✦</span><div><strong>{lang === 'bn' ? 'ফোকাস স্প্রিন্ট' : 'Focus sprint'}</strong><small>{lang === 'bn' ? 'বিক্ষেপহীন শেখা' : 'Distraction-free learning'}</small></div><button onClick={() => setOpen(false)}>×</button></header><b>{minutes}:{remaining}</b><div className="timer-bar"><i style={{ width: `${seconds / (25 * 60) * 100}%` }} /></div><footer><button onClick={toggleTimer}>{running ? (lang === 'bn' ? 'বিরতি' : 'Pause') : (seconds === 0 ? (lang === 'bn' ? 'আবার' : 'Again') : (lang === 'bn' ? 'শুরু' : 'Start'))}</button><button onClick={() => { setRunning(false); setSeconds(25 * 60) }}>{lang === 'bn' ? 'রিসেট' : 'Reset'}</button></footer></div>}</aside>
}

function Dashboard({ progress, lang, openTopic, navigate }) {
  const { course, topics, modules } = useCourse()
  const text = (v) => t(v, lang)
  const next = topics.find((topic) => !progress.completed.includes(topic.id)) || topics[0]
  const done = topics.filter((topic) => progress.completed.includes(topic.id)).length
  const scores = Object.values(progress.attempts).flat().map((a) => Math.round(a.score / a.total * 100))
  const average = scores.length ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : 0
  const recentTopics = progress.recents.map((id) => topics.find((item) => item.id === id)).filter(Boolean)
  const orbit = course.id === 'dsa' ? ['Array', 'Tree', 'Graph', 'Hash'] : ['API', 'DB', 'CDN', 'Queue']

  return <>
    <section className="hero-dashboard" style={{ '--module-color': course.color }}>
      <div className="hero-copy">
        <span className="eyebrow">{done ? (lang === 'bn' ? 'শেখা আবার শুরু করুন' : 'Continue your journey') : (lang === 'bn' ? 'আপনার শেখার যাত্রা শুরু করুন' : 'Start your learning journey')}</span>
        {course.id === 'system-design'
          ? <h1>{lang === 'bn' ? <>আর্কিটেকচার ভাবুন,<br /><em>আত্মবিশ্বাসে ডিজাইন করুন।</em></> : <>Think in architecture.<br /><em>Design with confidence.</em></>}</h1>
          : <h1>{text(course.title)}</h1>}
        <p>{course.id === 'system-design' ? (lang === 'bn' ? 'ভিজ্যুয়াল ব্যাখ্যা, ইন্টারঅ্যাক্টিভ ডায়াগ্রাম ও বাস্তব ডিজাইন চ্যালেঞ্জে জটিল সিস্টেম সহজ করুন।' : 'Make complex systems feel simple with visual explanations, interactive diagrams, and real design challenges.') : text(course.summary)}</p>
        <div className="hero-buttons"><button className="primary-button" onClick={() => openTopic(next.id)}>{done ? (lang === 'bn' ? 'শেখা চালিয়ে যান' : 'Continue learning') : (lang === 'bn' ? 'প্রথম পাঠ শুরু করুন' : 'Start first lesson')} <Icon name="arrow" /></button><button className="surprise-button" onClick={() => openTopic(topics[Math.floor(Math.random() * topics.length)].id)}>✦ {lang === 'bn' ? 'আমাকে চমকে দিন' : 'Surprise me'}</button></div>
      </div>
      <div className="hero-visual" aria-hidden="true">
        <div className="orbit orbit-one"><span>{orbit[0]}</span><span>{orbit[1]}</span></div>
        <div className="orbit orbit-two"><span>{orbit[2]}</span><span>{orbit[3]}</span></div>
        <div className="hero-core"><strong>{done}</strong><small>/ {topics.length}</small><span>{lang === 'bn' ? 'সম্পন্ন' : 'complete'}</span></div>
      </div>
    </section>

    <section className="stats-grid" aria-label="Learning statistics">
      <Stat icon="learn" value={`${done}/${topics.length}`} label={lang === 'bn' ? 'টপিক সম্পন্ন' : 'Topics completed'} tone="violet" />
      <Stat icon="check" value={`${average}%`} label={lang === 'bn' ? 'গড় পরীক্ষার স্কোর' : 'Average exam score'} tone="mint" />
      <Stat icon="bookmark" value={progress.bookmarks.length} label={lang === 'bn' ? 'বুকমার্ক' : 'Saved lessons'} tone="amber" />
      <Stat icon="labs" value={Object.keys(progress.labProgress || {}).length} label={lang === 'bn' ? 'ল্যাব শুরু' : 'Labs explored'} tone="blue" />
    </section>

    <section className="dashboard-grid">
      <div className="section-block">
        <div className="section-heading"><div><span className="eyebrow">{lang === 'bn' ? 'আপনার পথ' : 'Your learning path'}</span><h2>{lang === 'bn' ? 'মডিউল ধরে এগিয়ে যান' : 'Build knowledge layer by layer'}</h2></div><button className="text-button" onClick={() => navigate('curriculum')}>{lang === 'bn' ? 'সব দেখুন' : 'View all'} <Icon name="arrow" /></button></div>
        <div className="module-list">
          {modules.map((module) => {
            const list = topics.filter((topic) => topic.moduleId === module.id)
            const done = list.filter((topic) => progress.completed.includes(topic.id)).length
            return <button className="module-row" key={module.id} onClick={() => openTopic(list.find((topic) => !progress.completed.includes(topic.id))?.id || list[0].id)}>
              <span className="module-number" style={{ '--module-color': module.color }}>{module.number}</span>
              <span className="module-name"><strong>{text(module.title)}</strong><small>{text(module.description)}</small></span>
              <span className="module-completion"><span><i style={{ width: `${done / list.length * 100}%`, background: module.color }} /></span><small>{done}/{list.length}</small></span>
              <Icon name="arrow" />
            </button>
          })}
        </div>
      </div>
      <aside className="activity-panel">
        <span className="eyebrow">{lang === 'bn' ? 'দ্রুত প্রবেশ' : 'Quick practice'}</span>
        <h2>{lang === 'bn' ? 'করে শিখুন' : 'Learn by doing'}</h2>
        <button className="quick-card simulator-card" onClick={() => navigate('simulator')}><span>⌁</span><div><strong>{lang === 'bn' ? 'আর্কিটেকচার সিমুলেটর' : 'Architecture simulator'}</strong><small>{lang === 'bn' ? 'লোড ও ব্যর্থতা পরীক্ষা করুন' : 'Test load and failures'}</small></div><Icon name="arrow" /></button>
        <button className="quick-card lab-card" onClick={() => navigate('labs')}><span>◇</span><div><strong>{lang === 'bn' ? 'গাইডেড ডিজাইন ল্যাব' : 'Guided design labs'}</strong><small>{lang === 'bn' ? 'সিদ্ধান্ত নিন, ফল দেখুন' : 'Decide, compare, improve'}</small></div><Icon name="arrow" /></button>
        <a className="quick-card library-card" href="/library"><span>▤</span><div><strong>{lang === 'bn' ? 'নতুন প্রকাশিত পাঠ' : 'Published lesson library'}</strong><small>{lang === 'bn' ? 'অ্যাডমিন-লিখিত নতুন পাঠ দেখুন' : 'Explore newly authored lessons'}</small></div><Icon name="arrow" /></a>
        <div className="recent-list"><strong>{lang === 'bn' ? 'সাম্প্রতিক' : 'Recently viewed'}</strong>{recentTopics.length ? recentTopics.slice(0, 3).map((topic) => <button key={topic.id} onClick={() => openTopic(topic.id)}><span>{topic.order}</span><div>{text(topic.title)}<small>{topic.minutes} min</small></div></button>) : <p>{lang === 'bn' ? 'একটি পাঠ খুললে এখানে দেখা যাবে।' : 'Open a lesson and it will appear here.'}</p>}</div>
      </aside>
    </section>

  </>
}

function Stat({ icon, value, label, tone }) {
  return <article className={`stat-card ${tone}`}><span><Icon name={icon} /></span><div><strong>{value}</strong><small>{label}</small></div></article>
}

function Curriculum({ progress, lang, openTopic }) {
  const { course, topics, modules } = useCourse()
  const text = (v) => t(v, lang)
  return <>
    <PageIntro eyebrow={lang === 'bn' ? `${topics.length}টি সম্পূর্ণ পাঠ` : `${topics.length} complete lessons`} title={text(course.title)} description={text(course.summary)} />
    <div className="curriculum-stack">
      {modules.map((module) => {
        const list = topics.filter((topic) => topic.moduleId === module.id)
        const done = list.filter((topic) => progress.completed.includes(topic.id)).length
        return <section className="curriculum-module" key={module.id} style={{ '--module-color': module.color }}>
          <header><span className="module-number">{module.number}</span><div><h2>{text(module.title)}</h2><p>{text(module.description)}</p></div><strong>{done}/{list.length}</strong></header>
          <div className="topic-grid">{list.map((topic) => <TopicCard key={topic.id} topic={topic} lang={lang} complete={progress.completed.includes(topic.id)} bookmarked={progress.bookmarks.includes(topic.id)} score={bestScore(progress.attempts[topic.id])} onClick={() => openTopic(topic.id)} />)}</div>
        </section>
      })}
    </div>
  </>
}

function TopicCard({ topic, lang, complete, bookmarked, score, onClick }) {
  return <button className={`topic-card ${complete ? 'complete' : ''}`} onClick={onClick}>
    <span className="topic-order">{complete ? <Icon name="check" /> : String(topic.order).padStart(2, '0')}</span>
    <span className="topic-card-copy"><strong>{t(topic.title, lang)}</strong><small><Icon name="clock" /> {topic.minutes} min · {topic.difficulty}</small></span>
    <span className="topic-card-meta">{bookmarked && <Icon name="bookmark" />}{score !== null && <b>{score}%</b>}<Icon name="arrow" /></span>
  </button>
}

function bestScore(attempts) {
  if (!Array.isArray(attempts) || !attempts.length) return null
  return Math.max(...attempts.map((a) => Math.round(a.score / a.total * 100)))
}

function Lesson({ topicId, progress, setProgress, lang, openTopic, navigate }) {
  const { course, topics, modules } = useCourse()
  const topic = topics.find((item) => item.id === topicId) || topics[0]
  const module = modules.find((item) => item.id === topic.moduleId)
  const text = (v) => t(v, lang)
  const index = topics.indexOf(topic)
  const bookmarked = progress.bookmarks.includes(topic.id)
  const complete = progress.completed.includes(topic.id)
  const toggleBookmark = () => setProgress((p) => ({ ...p, bookmarks: bookmarked ? p.bookmarks.filter((id) => id !== topic.id) : [...p.bookmarks, topic.id] }))
  const toggleComplete = () => setProgress((p) => ({ ...p, completed: complete ? p.completed.filter((id) => id !== topic.id) : [...new Set([...p.completed, topic.id])] }))

  return <article className="lesson-page">
    <button className="back-button" onClick={() => navigate('curriculum')}><Icon name="back" /> {lang === 'bn' ? 'শেখার পথে ফিরুন' : 'Back to learning path'}</button>
    <header className="lesson-header" style={{ '--module-color': module.color }}>
      <div><span className="lesson-module">{module.number} · {text(module.title)}</span><h1>{text(topic.title)}</h1><p>{text(topic.insight)}</p><div className="lesson-meta"><span><Icon name="clock" /> {topic.minutes} min</span><span>{topic.difficulty}</span><span>{lang === 'bn' ? `পাঠ ${topic.order}/${topics.length}` : `Lesson ${topic.order}/${topics.length}`}</span></div></div>
      <div className="lesson-actions"><button className={bookmarked ? 'selected' : ''} onClick={toggleBookmark}><Icon name="bookmark" /> {lang === 'bn' ? 'সংরক্ষণ' : 'Save'}</button><button className={complete ? 'selected success' : ''} onClick={toggleComplete}><Icon name="check" /> {complete ? (lang === 'bn' ? 'সম্পন্ন' : 'Completed') : (lang === 'bn' ? 'সম্পন্ন করুন' : 'Mark complete')}</button></div>
    </header>

    <div className="lesson-layout">
      <div className="lesson-content">
        <LessonSection number="01" label={lang === 'bn' ? 'শেখার লক্ষ্য' : 'Learning objectives'}><ul className="check-list">{topic.objectives.map((item, i) => <li key={i}><Icon name="check" /> {text(item)}</li>)}</ul></LessonSection>
        <LessonSection number="02" label={lang === 'bn' ? 'সহজভাবে ভাবুন' : 'Start with an analogy'}><div className="analogy-card"><span>💡</span><p>{text(topic.analogy)}</p></div></LessonSection>
        <LessonSection number="03" label={lang === 'bn' ? 'মূল ধারণা' : 'Core idea'}><p className="lead-paragraph">{text(topic.insight)}</p><div className="principle-card"><strong>{lang === 'bn' ? 'মূল নীতি' : 'Design principle'}</strong><p>{text(topic.action)}</p></div></LessonSection>
        <LessonSection number="04" label={course.id === 'system-design' ? (lang === 'bn' ? 'ভিজ্যুয়াল ফ্লো' : 'Visual request flow') : (lang === 'bn' ? 'ভিজ্যুয়াল ব্যাখ্যা' : 'Visual walkthrough')}><CourseDiagram kind={topic.diagram} courseId={course.id} lang={lang} title={topic.title} /></LessonSection>
        <LessonSection number="05" label={course.id === 'system-design' ? (lang === 'bn' ? 'অনুরোধের পথ' : 'Walk through the flow') : (lang === 'bn' ? 'ধাপে ধাপে' : 'Step by step')}><ol className="flow-steps"><li><b>1</b><span>{text(topic.insight)}</span></li><li><b>2</b><span>{text(topic.action)}</span></li><li><b>3</b><span>{course.id === 'system-design' ? (lang === 'bn' ? 'সিস্টেম ফল দেয় এবং লেটেন্সি, এরর ও ক্ষমতা পরিমাপ করে।' : 'The system returns a result and measures latency, errors, and capacity.') : (lang === 'bn' ? 'খরচ ও ট্রেড-অফ যাচাই করে সেরা বিকল্পটি বাছুন।' : 'Weigh the cost and trade-off, then choose the best alternative.')}</span></li></ol></LessonSection>
        {topic.complexity?.length > 0 && <LessonSection number="•" label={course.id === 'git' ? (lang === 'bn' ? 'জরুরি কমান্ড' : 'Key commands') : (lang === 'bn' ? 'জটিলতা' : 'Complexity')}><ComplexityTable rows={topic.complexity} lang={lang} courseId={course.id} /></LessonSection>}
        {topic.deepDive && <FlagshipDeepDive key={topic.id} content={topic.deepDive} lang={lang} />}
        <LessonSection number="06" label={lang === 'bn' ? 'ট্রেড-অফ' : 'Trade-offs'}><div className="pros-cons"><div><strong>＋ {lang === 'bn' ? 'কেন কার্যকর' : 'Why it helps'}</strong><p>{text(topic.advantages)}</p></div><div><strong>△ {lang === 'bn' ? 'মূল মূল্য' : 'The cost'}</strong><p>{text(topic.tradeoff)}</p></div></div></LessonSection>
        <DecisionCheckpoint key={topic.id} topic={topic} lang={lang} />
        <LessonSection number="07" label={lang === 'bn' ? 'ভুল ও ইন্টারভিউ টিপস' : 'Mistakes & interview tips'}><div className="warning-card"><strong>{lang === 'bn' ? 'এড়িয়ে চলুন' : 'Avoid this'}</strong><p>{text(topic.mistake)}</p></div><div className="interview-card"><strong>✦ {lang === 'bn' ? 'ইন্টারভিউ নোট' : 'Interview note'}</strong><p>{text(topic.interview)}</p></div></LessonSection>
        <LessonSection number="08" label={lang === 'bn' ? 'শব্দকোষ ও রিক্যাপ' : 'Glossary & recap'}><div className="glossary-grid">{topic.glossary.map((item, i) => <div key={i}><strong>{text(item.term)}</strong><p>{text(item.definition)}</p></div>)}</div><div className="recap-card"><span>✓</span><div><strong>{lang === 'bn' ? 'এক বাক্যে মনে রাখুন' : 'Remember in one sentence'}</strong><p>{text(topic.insight)}</p></div></div></LessonSection>
        <LessonSection number="09" label={lang === 'bn' ? 'নিজের নোট' : 'Personal notes'}><LessonNotes topic={topic} progress={progress} setProgress={setProgress} lang={lang} /></LessonSection>

        <div className="exam-cta"><div><span className="eyebrow">{lang === 'bn' ? 'জ্ঞান যাচাই' : 'Knowledge check'}</span><h2>{lang === 'bn' ? 'পাঁচ প্রশ্নের পরীক্ষার জন্য প্রস্তুত?' : 'Ready for the five-question exam?'}</h2><p>{lang === 'bn' ? 'সাবমিট করার পর প্রতিটি উত্তরের ব্যাখ্যা দেখুন।' : 'Submit all answers, then review an explanation for each one.'}</p></div><button className="primary-button" onClick={() => navigate('exam', { topicId: topic.id })}>{lang === 'bn' ? 'পরীক্ষা শুরু করুন' : 'Start exam'} <Icon name="arrow" /></button></div>
      </div>
      <aside className="lesson-rail"><strong>{lang === 'bn' ? 'এই পাঠে' : 'In this lesson'}</strong>{['Objectives', 'Analogy', 'Core idea', 'Diagram', 'Request flow', 'Trade-offs', 'Interview tips', 'Recap', 'Notes'].map((label, i) => <span key={label}><b>{String(i + 1).padStart(2, '0')}</b>{lang === 'bn' ? ['লক্ষ্য', 'উপমা', 'মূল ধারণা', 'ডায়াগ্রাম', 'রিকোয়েস্ট ফ্লো', 'ট্রেড-অফ', 'ইন্টারভিউ টিপস', 'রিক্যাপ', 'নোট'][i] : label}</span>)}</aside>
    </div>
    <footer className="lesson-pagination"><button disabled={!topics[index - 1]} onClick={() => topics[index - 1] && openTopic(topics[index - 1].id)}><Icon name="back" /><span><small>{lang === 'bn' ? 'আগের পাঠ' : 'Previous lesson'}</small>{topics[index - 1] ? text(topics[index - 1].title) : '—'}</span></button><button disabled={!topics[index + 1]} onClick={() => topics[index + 1] && openTopic(topics[index + 1].id)}><span><small>{lang === 'bn' ? 'পরের পাঠ' : 'Next lesson'}</small>{topics[index + 1] ? text(topics[index + 1].title) : '—'}</span><Icon name="arrow" /></button></footer>
  </article>
}

function LessonSection({ number, label, children }) {
  return <section className="lesson-section"><header><span>{number}</span><h2>{label}</h2></header>{children}</section>
}

function ComplexityTable({ rows, lang, courseId }) {
  const isGit = courseId === 'git'
  const head = isGit ? (lang === 'bn' ? ['লক্ষ্য', 'কমান্ড'] : ['Goal', 'Command']) : (lang === 'bn' ? ['অপারেশন', 'জটিলতা'] : ['Operation', 'Complexity'])
  return <div className="complexity-table"><div className="complexity-head"><span>{head[0]}</span><span>{head[1]}</span></div>{rows.map((row, index) => <div className="complexity-row" key={index}><span>{t(row.op, lang)}</span><code>{row.value}</code></div>)}</div>
}

function FlagshipDeepDive({ content, lang }) {
  const [tab, setTab] = useState('scale')
  const text = (value) => t(value, lang)
  const labels = {
    scale: lang === 'bn' ? 'স্কেল ও হিসাব' : 'Scale & math',
    contracts: lang === 'bn' ? 'API ও ডেটা' : 'API & data',
    failures: lang === 'bn' ? 'ব্যর্থতা' : 'Failure lab',
    decisions: lang === 'bn' ? 'সিদ্ধান্ত' : 'Decisions',
  }
  return <section className="deep-dive">
    <header className="deep-dive-header"><div><span className="eyebrow">✦ {lang === 'bn' ? 'ফ্ল্যাগশিপ ডিপ ডাইভ' : 'Flagship deep dive'}</span><h2>{text(content.scenario.title)}</h2><p>{text(content.scenario.context)}</p></div><aside>{content.scenario.assumptions.map((assumption, index) => <span key={index}>✓ {text(assumption)}</span>)}</aside></header>
    <div className="deep-tabs" role="tablist" aria-label={lang === 'bn' ? 'ডিপ ডাইভ বিভাগ' : 'Deep-dive sections'}>{Object.entries(labels).map(([id, label]) => <button role="tab" aria-selected={tab === id} className={tab === id ? 'active' : ''} key={id} onClick={() => setTab(id)}><span>{id === 'scale' ? '∑' : id === 'contracts' ? '{ }' : id === 'failures' ? '⚡' : '◇'}</span>{label}</button>)}</div>
    <div className="deep-panel" role="tabpanel">
      {tab === 'scale' && <div className="calculation-grid">{content.calculations.map((item, index) => <article key={index}><header><span>0{index + 1}</span><strong>{text(item.label)}</strong></header><code>{item.formula}</code><b>{item.result}</b><p>{text(item.meaning)}</p></article>)}</div>}
      {tab === 'contracts' && <div className="contract-layout"><div><h3>{lang === 'bn' ? 'API / ইভেন্ট কনট্র্যাক্ট' : 'API / event contracts'}</h3><div className="api-table">{content.apis.map((item, index) => <div key={index}><code className={`method-${item.method.toLowerCase()}`}>{item.method}</code><strong>{item.path}</strong><p>{text(item.purpose)}</p></div>)}</div></div><div><h3>{lang === 'bn' ? 'মূল ডেটা মডেল' : 'Core data model'}</h3><div className="schema-table">{content.schema.map((item, index) => <div key={index}><strong>{item.name}</strong><code>{item.type}</code><p>{text(item.note)}</p></div>)}</div></div></div>}
      {tab === 'failures' && <div className="failure-grid">{content.failures.map((item, index) => <article key={index}><header><span>!</span><strong>{text(item.signal)}</strong></header><div><small>{lang === 'bn' ? 'মূল কারণ' : 'Likely cause'}</small><p>{text(item.cause)}</p></div><div><small>{lang === 'bn' ? 'ডিজাইন প্রতিক্রিয়া' : 'Design response'}</small><p>{text(item.mitigation)}</p></div></article>)}</div>}
      {tab === 'decisions' && <div><div className="decision-table"><header><span>{lang === 'bn' ? 'যখন' : 'When'}</span><span>{lang === 'bn' ? 'বাছুন' : 'Choose'}</span><span>{lang === 'bn' ? 'কারণ' : 'Because'}</span></header>{content.decisions.map((item, index) => <div key={index}><p>{text(item.when)}</p><strong>{text(item.choose)}</strong><p>{text(item.reason)}</p></div>)}</div><div className="deep-checklist"><strong>{lang === 'bn' ? 'ইন্টারভিউ চেকলিস্ট' : 'Interview checklist'}</strong>{content.checklist.map((item, index) => <span key={index}>✓ {text(item)}</span>)}</div></div>}
    </div>
  </section>
}

function LessonNotes({ topic, progress, setProgress, lang }) {
  const note = progress.notes?.[topic.id] || ''
  const save = (value) => setProgress((current) => ({ ...current, notes: { ...(current.notes || {}), [topic.id]: value.slice(0, 2000) } }))
  return <div className="notes-card"><div className="notes-top"><span>✎</span><div><strong>{lang === 'bn' ? 'এই পাঠ থেকে কী মনে রাখতে চান?' : 'What do you want to remember?'}</strong><small>{lang === 'bn' ? 'টাইপ করলেই এই ব্রাউজারে সংরক্ষিত হবে।' : 'Saved automatically in this browser as you type.'}</small></div><b>{note.length}/2000</b></div><textarea value={note} maxLength={2000} onChange={(event) => save(event.target.value)} placeholder={lang === 'bn' ? 'নিজের ভাষায় ধারণা, প্রশ্ন বা ইন্টারভিউ উত্তর লিখুন…' : 'Write the concept, a question, or an interview answer in your own words…'} /></div>
}

function DecisionCheckpoint({ topic, lang }) {
  const [choice, setChoice] = useState(null)
  const correctFirst = topic.order % 2 === 0
  const choices = correctFirst ? [{ correct: true, text: topic.action }, { correct: false, text: topic.mistake }] : [{ correct: false, text: topic.mistake }, { correct: true, text: topic.action }]
  return <section className="decision-checkpoint"><header><span>⚡</span><div><small>{lang === 'bn' ? '৩০ সেকেন্ড চেকপয়েন্ট' : '30-second checkpoint'}</small><h2>{lang === 'bn' ? 'আপনি কোন সিদ্ধান্তটি নেবেন?' : 'Which design decision would you make?'}</h2></div></header><div>{choices.map((option, index) => <button key={index} className={choice === index ? (option.correct ? 'correct' : 'incorrect') : ''} onClick={() => setChoice(index)}><span>{String.fromCharCode(65 + index)}</span>{t(option.text, lang)}{choice === index && <b>{option.correct ? '✓' : '!'}</b>}</button>)}</div>{choice !== null && <p className={choices[choice].correct ? 'correct' : 'incorrect'}>{choices[choice].correct ? (lang === 'bn' ? 'চমৎকার—এই সিদ্ধান্তটি স্কেল ও নির্ভরযোগ্যতার সঙ্গে মেলে।' : 'Nice—this decision aligns with the scale and reliability goal.') : (lang === 'bn' ? 'আরেকবার ভাবুন: এটি পাঠের সাধারণ ভুলগুলোর একটি।' : 'Think again: this is one of the lesson’s common mistakes.')}</p>}</section>
}


function Confetti() {
  return <div className="confetti" aria-hidden="true">{Array.from({ length: 18 }, (_, index) => <i key={index} style={{ '--x': `${(index * 37) % 100}%`, '--delay': `${(index % 6) * 0.08}s`, '--color': ['#6757df', '#18a77a', '#e7952b', '#e34b87'][index % 4] }} />)}</div>
}

function Exam({ topicId, progress, setProgress, lang, navigate, openTopic }) {
  const { topics } = useCourse()
  const topic = topics.find((item) => item.id === topicId) || topics[0]
  const [answers, setAnswers] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')
  const text = (v) => t(v, lang)
  const attempts = progress.attempts[topic.id] || []
  const score = topic.exam.filter((q) => sameAnswers(answers[q.id], q.correct)).length
  const answered = Object.keys(answers).filter((id) => answers[id]?.length).length
  const choose = (question, optionId) => {
    if (submitted) return
    setError('')
    setAnswers((current) => {
      if (question.type === 'single') return { ...current, [question.id]: [optionId] }
      const selected = current[question.id] || []
      return { ...current, [question.id]: selected.includes(optionId) ? selected.filter((id) => id !== optionId) : [...selected, optionId] }
    })
  }
  const submit = () => {
    if (answered !== topic.exam.length) { setError(lang === 'bn' ? 'সাবমিট করার আগে সব প্রশ্নের উত্তর দিন।' : 'Answer every question before submitting.'); return }
    const attempt = { timestamp: new Date().toISOString(), score, total: topic.exam.length, answers, incorrect: topic.exam.filter((q) => !sameAnswers(answers[q.id], q.correct)).map((q) => text(q.concept)) }
    setProgress((p) => ({ ...p, completed: [...new Set([...p.completed, topic.id])], attempts: { ...p.attempts, [topic.id]: [...(p.attempts[topic.id] || []), attempt] } }))
    setSubmitted(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
  const retry = () => { setAnswers({}); setSubmitted(false); setError(''); window.scrollTo({ top: 0, behavior: 'smooth' }) }
  const percent = Math.round(score / topic.exam.length * 100)
  const next = topics[topic.order]

  return <div className="exam-page">
    <button className="back-button" onClick={() => openTopic(topic.id)}><Icon name="back" /> {lang === 'bn' ? 'পাঠে ফিরুন' : 'Back to lesson'}</button>
    {!submitted ? <>
      <PageIntro eyebrow={`${lang === 'bn' ? 'টপিক পরীক্ষা' : 'Topic exam'} · ${String(topic.order).padStart(2, '0')}`} title={text(topic.title)} description={lang === 'bn' ? 'সব পাঁচটি প্রশ্নের উত্তর দিন। সাবমিটের পর উত্তর ও ব্যাখ্যা প্রকাশ পাবে।' : 'Answer all five questions. Answers and explanations appear only after submission.'} action={<div className="exam-progress"><strong>{answered}/5</strong><small>{lang === 'bn' ? 'উত্তর দেওয়া' : 'answered'}</small></div>} />
      <div className="exam-questions">{topic.exam.map((question, index) => <Question key={question.id} question={question} index={index} answers={answers} choose={choose} lang={lang} />)}</div>
      {error && <div className="form-error" role="alert">! {error}</div>}
      <div className="exam-submit"><div><strong>{answered}/5</strong><span><i style={{ width: `${answered / 5 * 100}%` }} /></span></div><button className="primary-button" onClick={submit}>{lang === 'bn' ? 'উত্তর সাবমিট করুন' : 'Submit answers'} <Icon name="arrow" /></button></div>
    </> : <>
      <section className={`result-hero ${percent >= 60 ? 'pass' : 'retry'}`}>{percent === 100 && <Confetti />}<div className="result-score"><strong>{percent}</strong><span>%</span></div><div><span className="eyebrow">{percent >= 60 ? (lang === 'bn' ? 'দারুণ—আপনি পাস করেছেন' : 'Nicely done—you passed') : (lang === 'bn' ? 'আরেকবার দেখুন' : 'Review and try again')}</span><h1>{text(topic.title)}</h1><p>{lang === 'bn' ? `আপনি ৫টির মধ্যে ${score}টি সঠিক করেছেন। ব্যাখ্যাগুলো দেখে দুর্বল ধারণা ঠিক করুন।` : `You answered ${score} of 5 correctly. Use the explanations to strengthen weak concepts.`}</p><div className="result-actions"><button className="secondary-button" onClick={retry}>{lang === 'bn' ? 'আবার চেষ্টা করুন' : 'Retry exam'}</button>{next && <button className="primary-button" onClick={() => openTopic(next.id)}>{lang === 'bn' ? 'পরের পাঠ' : 'Next lesson'} <Icon name="arrow" /></button>}</div></div><aside><span>{lang === 'bn' ? 'সেরা স্কোর' : 'Best score'}<strong>{Math.max(percent, bestScore(attempts) || 0)}%</strong></span><span>{lang === 'bn' ? 'চেষ্টা' : 'Attempts'}<strong>{attempts.length + 1}</strong></span></aside></section>
      <div className="review-heading"><span className="eyebrow">{lang === 'bn' ? 'উত্তর পর্যালোচনা' : 'Answer review'}</span><h2>{lang === 'bn' ? 'প্রতিটি সিদ্ধান্তের কারণ বুঝুন' : 'Understand the reason behind each decision'}</h2></div>
      <div className="exam-questions review">{topic.exam.map((question, index) => <Question key={question.id} question={question} index={index} answers={answers} choose={() => {}} lang={lang} submitted />)}</div>
    </>}
  </div>
}

function Question({ question, index, answers, choose, lang, submitted = false }) {
  const selected = answers[question.id] || []
  const correct = sameAnswers(selected, question.correct)
  return <section className={`question-card ${submitted ? (correct ? 'correct' : 'incorrect') : ''}`}>
    <header><span>{String(index + 1).padStart(2, '0')}</span><div><small>{question.type === 'multi' ? (lang === 'bn' ? 'একাধিক উত্তর' : 'Select two answers') : (lang === 'bn' ? 'একটি উত্তর' : 'Single answer')}</small><h2>{t(question.prompt, lang)}</h2></div>{submitted && <b>{correct ? '✓' : '×'}</b>}</header>
    <div className="options">{question.options.map((option) => {
      const isSelected = selected.includes(option.id)
      const isCorrect = question.correct.includes(option.id)
      return <button key={option.id} className={`${isSelected ? 'selected' : ''} ${submitted && isCorrect ? 'right-answer' : ''} ${submitted && isSelected && !isCorrect ? 'wrong-answer' : ''}`} onClick={() => choose(question, option.id)}><span>{question.type === 'multi' ? (isSelected ? '✓' : '') : option.id.toUpperCase()}</span><p>{t(option.text, lang)}</p>{submitted && isCorrect && <b>✓</b>}</button>
    })}</div>
    {submitted && <div className="explanation"><strong>{lang === 'bn' ? 'কেন?' : 'Why?'}</strong><p>{t(question.explanation, lang)}</p></div>}
  </section>
}

function ReviewCenter({ progress, lang, openTopic, navigate }) {
  const { topics, labs } = useCourse()
  const [cardIndex, setCardIndex] = useState(0)
  const [revealed, setRevealed] = useState(false)
  const stats = learningStats(progress)
  const text = (v) => t(v, lang)
  const scored = topics.map((topic) => {
    const attempts = progress.attempts?.[topic.id] || []
    const latest = attempts.at(-1)
    return { topic, latest, score: latest ? Math.round(latest.score / latest.total * 100) : null }
  })
  const weak = scored.filter((item) => item.score !== null && item.score < 80).sort((a, b) => a.score - b.score)
  const reviewQueue = (weak.length ? weak : scored.filter((item) => !progress.completed.includes(item.topic.id))).slice(0, 6)
  const flashcards = (weak.length ? weak.map((item) => item.topic) : topics.filter((topic) => progress.completed.includes(topic.id))).slice(0, 12)
  const dayNumber = Math.floor(Date.now() / 86400000)
  const daily = topics[dayNumber % topics.length]
  const currentCard = flashcards[cardIndex % Math.max(flashcards.length, 1)]
  const achievements = [
    { icon: '↗', name: lang === 'bn' ? 'প্রথম পদক্ষেপ' : 'First step', detail: lang === 'bn' ? 'প্রথম পাঠ সম্পন্ন' : 'Complete one lesson', unlocked: progress.completed.length >= 1 },
    { icon: '✓', name: lang === 'bn' ? 'দক্ষ শিক্ষার্থী' : 'Knowledge builder', detail: lang === 'bn' ? '১০টি পাঠ সম্পন্ন' : 'Complete 10 lessons', unlocked: progress.completed.length >= 10 },
    { icon: '◇', name: lang === 'bn' ? 'ল্যাব এক্সপ্লোরার' : 'Lab explorer', detail: lang === 'bn' ? 'একটি ল্যাব শেষ' : 'Finish a design lab', unlocked: Object.keys(progress.labProgress || {}).some((id) => Object.keys(progress.labProgress[id] || {}).length === labs.find((lab) => lab.id === id)?.stages.length) },
    { icon: '◎', name: lang === 'bn' ? 'নিখুঁত স্কোর' : 'Perfect score', detail: lang === 'bn' ? 'পরীক্ষায় ১০০%' : 'Score 100% on an exam', unlocked: stats.attempts.some((a) => a.score === a.total) },
    { icon: '◆', name: lang === 'bn' ? 'কিউরেটর' : 'Curator', detail: lang === 'bn' ? '৫টি পাঠ সংরক্ষণ' : 'Save 5 lessons', unlocked: progress.bookmarks.length >= 5 },
    { icon: '⌁', name: lang === 'bn' ? 'আর্কিটেক্ট' : 'System architect', detail: lang === 'bn' ? `সব ${topics.length}টি পাঠ সম্পন্ন` : `Complete all ${topics.length} lessons`, unlocked: progress.completed.length === topics.length },
  ]

  return <>
    <PageIntro eyebrow={lang === 'bn' ? 'আপনার ব্যক্তিগত কোচ' : 'Your personal learning coach'} title={lang === 'bn' ? 'রিভিউ ও দক্ষতা কেন্দ্র' : 'Review & mastery center'} description={lang === 'bn' ? 'দুর্বল ধারণা পুনরায় দেখুন, ফ্ল্যাশকার্ডে মনে করুন এবং প্রতিদিন একটি ছোট চ্যালেঞ্জ নিন।' : 'Revisit weak concepts, recall with flashcards, and take one focused challenge every day.'} action={<div className="level-pill"><span>✦</span><div><small>{lang === 'bn' ? 'লেভেল' : 'Level'} {stats.level}</small><strong>{stats.xp} XP</strong></div></div>} />

    <section className="mastery-stats">
      <Stat icon="spark" value={`${stats.streak} 🔥`} label={lang === 'bn' ? 'দিনের স্ট্রিক' : 'Day learning streak'} tone="amber" />
      <Stat icon="check" value={stats.passed} label={lang === 'bn' ? 'পরীক্ষা পাস' : 'Exams passed'} tone="mint" />
      <Stat icon="learn" value={progress.completed.length} label={lang === 'bn' ? 'আয়ত্ত করা টপিক' : 'Topics mastered'} tone="violet" />
      <Stat icon="bookmark" value={Object.values(progress.notes || {}).filter(Boolean).length} label={lang === 'bn' ? 'নিজের নোট' : 'Personal notes'} tone="blue" />
    </section>

    <section className="daily-challenge">
      <div className="daily-orb"><span>{String(daily.order).padStart(2, '0')}</span><i /></div>
      <div><span className="eyebrow">{lang === 'bn' ? 'আজকের ১০ মিনিট' : 'Today’s 10-minute challenge'}</span><h2>{text(daily.title)}</h2><p>{text(daily.insight)}</p><button className="primary-button" onClick={() => openTopic(daily.id)}>{lang === 'bn' ? 'চ্যালেঞ্জ শুরু করুন' : 'Start daily challenge'} <Icon name="arrow" /></button></div>
      <aside><small>{lang === 'bn' ? 'পুরস্কার' : 'Reward'}</small><strong>+50 XP</strong><span>{lang === 'bn' ? 'পাঠ + পরীক্ষা' : 'Lesson + exam'}</span></aside>
    </section>

    <div className="review-layout">
      <section className="review-queue"><div className="section-heading"><div><span className="eyebrow">{lang === 'bn' ? 'স্মার্ট রিভিউ' : 'Smart review queue'}</span><h2>{lang === 'bn' ? 'পরবর্তী কোন ধারণা দেখবেন' : 'What to strengthen next'}</h2></div></div>{reviewQueue.length ? reviewQueue.map(({ topic, score }) => <button key={topic.id} onClick={() => openTopic(topic.id)}><span className="review-topic-number">{String(topic.order).padStart(2, '0')}</span><div><strong>{text(topic.title)}</strong><small>{score === null ? (lang === 'bn' ? 'এখনও শুরু হয়নি' : 'Not started yet') : `${lang === 'bn' ? 'সর্বশেষ স্কোর' : 'Latest score'} ${score}%`}</small></div><span className={`mastery-dot ${score !== null && score < 60 ? 'low' : 'medium'}`} /><Icon name="arrow" /></button>) : <div className="empty-success">✓ {lang === 'bn' ? 'সব টপিক শক্তিশালী—নতুন পাঠ চালিয়ে যান!' : 'Everything looks strong—keep learning!'}</div>}</section>

      <section className="flashcard-panel"><span className="eyebrow">{lang === 'bn' ? 'অ্যাকটিভ রিকল' : 'Active recall'}</span><h2>{lang === 'bn' ? 'একটি ধারণা মনে করুন' : 'Recall one idea'}</h2>{currentCard ? <><button className={`flashcard ${revealed ? 'revealed' : ''}`} onClick={() => setRevealed(!revealed)}><div className="flash-front"><small>{lang === 'bn' ? 'ব্যাখ্যা করুন' : 'Explain from memory'}</small><strong>{text(currentCard.title)}</strong><span>{lang === 'bn' ? 'উত্তর দেখতে চাপুন' : 'Tap to reveal'}</span></div><div className="flash-back"><small>{lang === 'bn' ? 'মূল ধারণা' : 'Core idea'}</small><p>{text(currentCard.insight)}</p><span>{text(currentCard.tradeoff)}</span></div></button><div className="flash-controls"><button onClick={() => { setCardIndex((cardIndex - 1 + flashcards.length) % flashcards.length); setRevealed(false) }}><Icon name="back" /></button><span>{cardIndex + 1}/{flashcards.length}</span><button onClick={() => { setCardIndex((cardIndex + 1) % flashcards.length); setRevealed(false) }}><Icon name="arrow" /></button></div></> : <p className="empty-copy">{lang === 'bn' ? 'একটি পাঠ সম্পন্ন করলে ফ্ল্যাশকার্ড তৈরি হবে।' : 'Complete a lesson to create your flashcard deck.'}</p>}</section>
    </div>

    <section className="achievements"><div className="section-heading"><div><span className="eyebrow">{lang === 'bn' ? 'মাইলস্টোন' : 'Milestones'}</span><h2>{lang === 'bn' ? 'আপনার অর্জন' : 'Achievements'}</h2></div><small>{achievements.filter((a) => a.unlocked).length}/{achievements.length} {lang === 'bn' ? 'আনলক' : 'unlocked'}</small></div><div className="achievement-grid">{achievements.map((achievement) => <article className={achievement.unlocked ? 'unlocked' : ''} key={achievement.name}><span>{achievement.unlocked ? achievement.icon : '⌾'}</span><div><strong>{achievement.name}</strong><small>{achievement.detail}</small></div>{achievement.unlocked && <b>✓</b>}</article>)}</div></section>
  </>
}

function SearchPalette({ lang, progress, onClose, openTopic }) {
  const { topics, modules } = useCourse()
  const [query, setQuery] = useState('')
  const normalized = query.trim().toLowerCase()
  const results = topics.filter((topic) => !normalized || [topic.title.en, topic.title.bn, topic.insight.en, topic.insight.bn].some((value) => value.toLowerCase().includes(normalized))).slice(0, 8)
  return <div className="modal-backdrop" onMouseDown={(event) => event.target === event.currentTarget && onClose()} role="presentation"><section className="search-palette" role="dialog" aria-modal="true" aria-label={lang === 'bn' ? 'পাঠ খুঁজুন' : 'Search lessons'}><header><span>⌕</span><input autoFocus value={query} onChange={(event) => setQuery(event.target.value)} onKeyDown={(event) => event.key === 'Enter' && results[0] && openTopic(results[0].id)} placeholder={lang === 'bn' ? 'টপিক, ধারণা বা প্রযুক্তি লিখুন…' : 'Search a topic, concept, or technology…'} /><kbd>ESC</kbd></header><div className="search-results">{results.map((topic) => <button key={topic.id} onClick={() => openTopic(topic.id)}><span className={progress.completed.includes(topic.id) ? 'done' : ''}>{progress.completed.includes(topic.id) ? '✓' : String(topic.order).padStart(2, '0')}</span><div><strong>{t(topic.title, lang)}</strong><small>{t(modules.find((module) => module.id === topic.moduleId)?.title, lang)} · {topic.minutes} min</small></div>{progress.bookmarks.includes(topic.id) && <b>◆</b>}<Icon name="arrow" /></button>)}{!results.length && <div className="search-empty"><span>⌕</span><strong>{lang === 'bn' ? 'কোনো পাঠ পাওয়া যায়নি' : 'No lesson found'}</strong><small>{lang === 'bn' ? 'আরেকটি শব্দ চেষ্টা করুন।' : 'Try another keyword.'}</small></div>}</div><footer><span><kbd>↵</kbd> {lang === 'bn' ? 'খুলুন' : 'open'}</span><span><kbd>esc</kbd> {lang === 'bn' ? 'বন্ধ' : 'close'}</span><small>{results.length} {lang === 'bn' ? 'টি ফল' : 'results'}</small></footer></section></div>
}


function Labs({ progress, setProgress, lang, initialLabId, navigate }) {
  const { labs } = useCourse()
  const [active, setActive] = useState(initialLabId || null)
  const [answers, setAnswers] = useState({})
  useEffect(() => {
    setActive(initialLabId || null)
    if (initialLabId) setAnswers(progress.labProgress?.[initialLabId] || {})
  }, [initialLabId, progress.labProgress])
  const lab = labs.find((item) => item.id === active)
  const text = (v) => t(v, lang)
  if (!lab) return <>
    <PageIntro eyebrow={lang === 'bn' ? 'সিদ্ধান্ত দিয়ে শিখুন' : 'Learn through decisions'} title={lang === 'bn' ? 'গাইডেড ডিজাইন ল্যাব' : 'Guided design labs'} description={lang === 'bn' ? 'একটি বাস্তব সিস্টেম ভাঙুন, প্রতিটি ধাপে সিদ্ধান্ত নিন এবং বিশেষজ্ঞ সমাধানের সঙ্গে তুলনা করুন।' : 'Break down a real system, make one decision at a time, and compare your path with an expert design.'} />
    <div className="lab-grid">{labs.map((item, index) => <button className="lab-tile" key={item.id} onClick={() => { setAnswers(progress.labProgress?.[item.id] || {}); navigate('labs', { labId: item.id }) }}><span className="lab-index">0{index + 1}</span><div className="lab-icon">{item.icon}</div><h2>{text(item.title)}</h2><p>{text(item.subtitle)}</p><div><span>{item.stages.length} {lang === 'bn' ? 'টি সিদ্ধান্ত' : 'decisions'}</span><b>{progress.labProgress?.[item.id] ? (lang === 'bn' ? 'চালিয়ে যান' : 'Continue') : (lang === 'bn' ? 'শুরু করুন' : 'Start lab')} <Icon name="arrow" /></b></div></button>)}</div>
    <section className="lab-method"><div><span className="eyebrow">{lang === 'bn' ? 'প্রতিটি ল্যাবে' : 'In every lab'}</span><h2>{lang === 'bn' ? 'একই নির্ভরযোগ্য ফ্রেমওয়ার্ক' : 'One reliable design framework'}</h2></div>{['Requirements', 'Scale', 'API & data', 'Architecture', 'Failures', 'Trade-offs'].map((item, i) => <span key={item}><b>0{i + 1}</b>{lang === 'bn' ? ['রিকোয়ারমেন্ট', 'স্কেল', 'API ও ডেটা', 'আর্কিটেকচার', 'ব্যর্থতা', 'ট্রেড-অফ'][i] : item}</span>)}</section>
  </>

  const answered = Object.keys(answers).length
  const complete = answered === lab.stages.length
  const saveAnswer = (stage, option) => {
    const next = { ...answers, [stage.id]: option }
    setAnswers(next)
    setProgress((p) => ({ ...p, labProgress: { ...(p.labProgress || {}), [lab.id]: next } }))
  }
  return <div className="active-lab">
    <button className="back-button" onClick={() => navigate('labs')}><Icon name="back" /> {lang === 'bn' ? 'সব ল্যাব' : 'All labs'}</button>
    <PageIntro eyebrow={`${lang === 'bn' ? 'ডিজাইন ল্যাব' : 'Design lab'} · ${answered}/${lab.stages.length}`} title={text(lab.title)} description={text(lab.subtitle)} action={<div className="lab-big-icon">{lab.icon}</div>} />
    <div className="lab-progress"><i style={{ width: `${answered / lab.stages.length * 100}%` }} /></div>
    <div className="lab-stage-list">{lab.stages.map((stage, index) => {
      const selected = answers[stage.id]
      return <section className={`lab-stage ${selected !== undefined ? 'answered' : ''}`} key={stage.id}><header><span>{String(index + 1).padStart(2, '0')}</span><div><small>{text(stage.title)}</small><h2>{text(stage.question)}</h2></div></header><div className="lab-options">{stage.options.map((option, optionIndex) => <button key={optionIndex} className={selected === optionIndex ? 'selected' : ''} onClick={() => saveAnswer(stage, optionIndex)}><span>{String.fromCharCode(65 + optionIndex)}</span>{text(option)}{selected === optionIndex && <b>{optionIndex === stage.correct ? '✓' : '!'}</b>}</button>)}</div>{selected !== undefined && <div className={`lab-feedback ${selected === stage.correct ? 'good' : 'consider'}`}><strong>{selected === stage.correct ? (lang === 'bn' ? 'ভালো সিদ্ধান্ত' : 'Sound decision') : (lang === 'bn' ? 'ট্রেড-অফটি ভাবুন' : 'Consider the trade-off')}</strong><p>{text(stage.feedback)}</p></div>}</section>
    })}</div>
    {complete && <section className="expert-result"><span>✦</span><div><span className="eyebrow">{lang === 'bn' ? 'বিশেষজ্ঞের সারাংশ' : 'Expert summary'}</span><h2>{lang === 'bn' ? 'আপনার ডিজাইনের গল্পটি বলুন' : 'Tell the story of your design'}</h2><p>{lang === 'bn' ? 'প্রথমে স্কেল ও সীমাবদ্ধতা বলুন, তারপর প্রতিটি কম্পোনেন্ট কোন সমস্যা সমাধান করে তা ব্যাখ্যা করুন। শেষে ব্যর্থতা ও ট্রেড-অফ স্বীকার করুন।' : 'Lead with scale and constraints, explain the problem each component solves, then close by acknowledging failures and trade-offs.'}</p></div></section>}
  </div>
}

function Simulator({ progress, setProgress, lang }) {
  const values = progress.simulator
  const set = (key, value) => setProgress((p) => ({ ...p, simulator: { ...p.simulator, [key]: value } }))
  const calculations = useMemo(() => calculateSimulation(values), [values])
  return <>
    <PageIntro eyebrow={lang === 'bn' ? 'পরিমাপ করে বুঝুন' : 'Build intuition with numbers'} title={lang === 'bn' ? 'আর্কিটেকচার সিমুলেটর' : 'Architecture simulator'} description={lang === 'bn' ? 'ট্রাফিক, ক্যাশ ও রেপ্লিকা বদলে দেখুন কোথায় বটলনেক তৈরি হয়।' : 'Change traffic, caching, and replicas to see where bottlenecks emerge.'} action={<span className="estimate-badge">{lang === 'bn' ? 'শিক্ষামূলক অনুমান' : 'Educational estimate'}</span>} />
    <div className="simulator-layout">
      <section className="controls-panel"><h2>{lang === 'bn' ? 'ওয়ার্কলোড' : 'Workload controls'}</h2>
        <Range label={lang === 'bn' ? 'রিকোয়েস্ট / সেকেন্ড' : 'Requests / second'} value={values.rps} min={100} max={10000} step={100} suffix=" RPS" onChange={(v) => set('rps', v)} />
        <Range label={lang === 'bn' ? 'রিড অনুপাত' : 'Read traffic'} value={values.reads} min={10} max={99} suffix="%" onChange={(v) => set('reads', v)} />
        <Range label={lang === 'bn' ? 'পেলোড আকার' : 'Payload size'} value={values.payload} min={1} max={256} suffix=" KB" onChange={(v) => set('payload', v)} />
        <Range label={lang === 'bn' ? 'ক্যাশ হিট রেট' : 'Cache hit rate'} value={values.cacheHit} min={0} max={99} suffix="%" onChange={(v) => set('cacheHit', v)} />
        <div className="control-pair"><NumberControl label={lang === 'bn' ? 'অ্যাপ রেপ্লিকা' : 'App replicas'} value={values.replicas} min={1} max={20} onChange={(v) => set('replicas', v)} /><NumberControl label={lang === 'bn' ? 'DB রেপ্লিকা' : 'DB replicas'} value={values.replication} min={1} max={8} onChange={(v) => set('replication', v)} /></div>
        <Range label={lang === 'bn' ? 'প্রতি DB ক্ষমতা' : 'Capacity per DB'} value={values.dbCapacity} min={100} max={3000} step={100} suffix=" ops/s" onChange={(v) => set('dbCapacity', v)} />
        <label className="failure-toggle"><span><strong>{lang === 'bn' ? 'একটি অ্যাপ সার্ভার ব্যর্থ' : 'Fail one app server'}</strong><small>{lang === 'bn' ? 'ফেইলওভার প্রভাব দেখুন' : 'See the failover impact'}</small></span><input type="checkbox" checked={values.failure} onChange={(e) => set('failure', e.target.checked)} /><i /></label>
      </section>
      <section className="simulation-output">
        <div className={`health-banner ${calculations.overloaded ? 'danger' : 'healthy'}`}><span>{calculations.overloaded ? '!' : '✓'}</span><div><strong>{calculations.overloaded ? (lang === 'bn' ? 'ক্ষমতার ঝুঁকি আছে' : 'Capacity at risk') : (lang === 'bn' ? 'সিস্টেম সুস্থ' : 'System looks healthy')}</strong><p>{calculations.overloaded ? (lang === 'bn' ? 'লাল মেট্রিকের ক্ষমতা বাড়ান বা লোড কমান।' : 'Increase capacity or reduce the load behind red metrics.') : (lang === 'bn' ? 'বর্তমান শিক্ষামূলক সীমার মধ্যে যথেষ্ট হেডরুম আছে।' : 'There is useful headroom under these educational limits.')}</p></div></div>
        <CourseDiagram kind="cache" courseId="system-design" lang={lang} title={{ en: 'Simulated cache-aside system', bn: 'সিমুলেটেড ক্যাশ-অ্যাসাইড সিস্টেম' }} />
        <div className="metric-grid"><Metric label={lang === 'bn' ? 'প্রতি অ্যাপ লোড' : 'Load / app'} value={calculations.appPerNode} unit="RPS" danger={calculations.appPerNode > 700} /><Metric label={lang === 'bn' ? 'ডেটাবেস লোড' : 'Database load'} value={calculations.dbLoad} unit="ops/s" danger={calculations.utilization > 80} /><Metric label={lang === 'bn' ? 'আনুমানিক লেটেন্সি' : 'Est. latency'} value={calculations.latency} unit="ms" danger={calculations.latency > 120} /><Metric label={lang === 'bn' ? 'ব্যান্ডউইডথ' : 'Bandwidth'} value={calculations.bandwidth} unit="MB/s" /></div>
        <div className="recommendation"><span>✦</span><div><strong>{lang === 'bn' ? 'পরবর্তী সিদ্ধান্ত' : 'Recommended next decision'}</strong><p>{calculations.utilization > 80 ? (lang === 'bn' ? 'ডেটাবেস স্যাচুরেট হচ্ছে—ক্যাশ হিট রেট, DB ক্ষমতা বা রেপ্লিকা বাড়ান।' : 'The database is saturating—increase cache hit rate, DB capacity, or replicas.') : calculations.appPerNode > 700 ? (lang === 'bn' ? 'অ্যাপ স্তরে আরও রেপ্লিকা যোগ করুন।' : 'Add more replicas at the application tier.') : values.failure ? (lang === 'bn' ? 'ফেইলওভারের পর অবশিষ্ট রেপ্লিকার হেডরুম যাচাই করুন।' : 'Verify remaining replica headroom after failover.') : (lang === 'bn' ? 'এখন ব্যর্থতা চালু করে রেজিলিয়েন্স পরীক্ষা করুন।' : 'Now enable a failure and test the resilience margin.')}</p></div></div>
      </section>
    </div>
    <p className="simulator-disclaimer">{lang === 'bn' ? 'এই ফলগুলো শেখার জন্য সরলীকৃত অনুমান; প্রোডাকশন ক্যাপাসিটি পরিকল্পনার বিকল্প নয়।' : 'These results are simplified learning estimates, not a substitute for production capacity planning.'}</p>
  </>
}

function Range({ label, value, min, max, step = 1, suffix, onChange }) {
  return <label className="range-control"><span><strong>{label}</strong><b>{value.toLocaleString()}{suffix}</b></span><input type="range" value={value} min={min} max={max} step={step} onChange={(e) => onChange(Number(e.target.value))} style={{ '--range': `${(value - min) / (max - min) * 100}%` }} /></label>
}

function NumberControl({ label, value, min, max, onChange }) {
  return <div className="number-control"><label>{label}</label><div><button onClick={() => onChange(Math.max(min, value - 1))}>−</button><strong>{value}</strong><button onClick={() => onChange(Math.min(max, value + 1))}>＋</button></div></div>
}

function Metric({ label, value, unit, danger }) {
  return <div className={`metric-card ${danger ? 'danger' : ''}`}><small>{label}</small><strong>{value}</strong><span>{unit}</span></div>
}

function Tools({ lang, navigate }) {
  const { course, labs } = useCourse()
  const text = (v) => t(v, lang)
  const tools = [
    course.id === 'system-design' && { key: 'simulator', icon: '⌁', tone: 'tool-violet', title: l('Architecture simulator', 'আর্কিটেকচার সিমুলেটর'), desc: l('Tune traffic, caching, and replicas and watch bottlenecks appear in real time.', 'ট্রাফিক, ক্যাশ ও রেপ্লিকা বদলে সরাসরি বটলনেক দেখুন।'), meta: l('Interactive', 'ইন্টারঅ্যাক্টিভ') },
    labs.length > 0 && { key: 'labs', icon: '◇', tone: 'tool-mint', title: l('Guided design labs', 'গাইডেড ডিজাইন ল্যাব'), desc: l('Make one decision at a time, then compare with an expert path.', 'ধাপে ধাপে সিদ্ধান্ত নিন ও বিশেষজ্ঞ পথের সঙ্গে মিলান।'), meta: l(`${labs.length} labs`, `${labs.length}টি ল্যাব`) },
    { key: 'review', icon: '✦', tone: 'tool-amber', title: l('Review & mastery', 'রিভিউ ও মাস্টারি'), desc: l('Flashcards, a daily challenge, and a smart queue that targets your weak spots.', 'ফ্ল্যাশকার্ড, দৈনিক চ্যালেঞ্জ ও দুর্বল জায়গা লক্ষ্য করা স্মার্ট কিউ।'), meta: l('Personalized', 'ব্যক্তিগত') },
  ].filter(Boolean)
  return <>
    <PageIntro eyebrow={lang === 'bn' ? 'হাতে-কলমে অনুশীলন' : 'Practice hands-on'} title={lang === 'bn' ? 'টুলস' : 'Tools'} description={lang === 'bn' ? 'পড়ার পাশাপাশি এই ইন্টারঅ্যাক্টিভ টুল দিয়ে ডিজাইন অনুশীলন করুন।' : 'Go beyond reading—practice designing with these interactive tools.'} />
    <div className="tool-grid">
      {tools.map((tool) => (
        <button className={`tool-card ${tool.tone}`} key={tool.key} onClick={() => navigate(tool.key)}>
          <span className="tool-icon">{tool.icon}</span>
          <span className="tool-badge">{text(tool.meta)}</span>
          <strong>{text(tool.title)}</strong>
          <p>{text(tool.desc)}</p>
          <b>{lang === 'bn' ? 'চালু করুন' : 'Open'} <Icon name="arrow" /></b>
        </button>
      ))}
    </div>
  </>
}

function CaseStudies({ progress, lang, openTopic }) {
  const { topics, modules } = useCourse()
  const text = (v) => t(v, lang)
  const cases = topics.filter((topic) => topic.difficulty === 'Case study')
  return <>
    <PageIntro eyebrow={lang === 'bn' ? `${cases.length}টি বাস্তব সিস্টেম` : `${cases.length} real systems`} title={lang === 'bn' ? 'কেস স্টাডি' : 'Case studies'} description={lang === 'bn' ? 'ইন্টারভিউ-উপযোগী আর্কিটেকচার—প্রতিটি স্কেল, API, ডেটা ও ব্যর্থতার দৃষ্টিকোণে ব্যাখ্যা করা।' : 'Interview-ready architectures, each explained through scale, APIs, data, and failure modes.'} />
    <div className="case-grid">
      {cases.map((topic) => {
        const module = modules.find((item) => item.id === topic.moduleId)
        const complete = progress.completed.includes(topic.id)
        return (
          <button className={`case-card ${complete ? 'complete' : ''}`} key={topic.id} style={{ '--module-color': module.color }} onClick={() => openTopic(topic.id)}>
            <header><span className="case-tag">{text(module.title)}</span>{complete && <b><Icon name="check" /></b>}</header>
            <strong>{text(topic.title)}</strong>
            <p>{text(topic.insight)}</p>
            <footer><span><Icon name="clock" /> {topic.minutes} min</span><span className="case-open">{lang === 'bn' ? 'কেস খুলুন' : 'Open case'} <Icon name="arrow" /></span></footer>
          </button>
        )
      })}
    </div>
  </>
}

function Interview({ lang, openTopic, navigate }) {
  const { course, topics, modules } = useCourse()
  const text = (v) => t(v, lang)
  const framework = course.id === 'dsa'
    ? (lang === 'bn'
      ? ['প্রশ্ন স্পষ্ট করুন', 'উদাহরণ ও এজ কেস', 'ব্রুট ফোর্স', 'সঠিক স্ট্রাকচারে অপটিমাইজ', 'জটিলতা বিশ্লেষণ', 'কোড ও টেস্ট']
      : ['Clarify the problem', 'Examples & edge cases', 'Brute force first', 'Optimize with the right structure', 'Analyze complexity', 'Code & test'])
    : (lang === 'bn'
      ? ['রিকোয়ারমেন্ট', 'স্কেল হিসাব', 'API ও ডেটা', 'আর্কিটেকচার', 'ব্যর্থতা', 'ট্রেড-অফ']
      : ['Requirements', 'Scale math', 'API & data', 'Architecture', 'Failure modes', 'Trade-offs'])
  return <>
    <PageIntro eyebrow={lang === 'bn' ? 'ইন্টারভিউয়ের জন্য প্রস্তুতি' : 'Prepare for the room'} title={lang === 'bn' ? 'ইন্টারভিউ প্রস্তুতি' : 'Interview prep'} description={lang === 'bn' ? 'প্রতিটি টপিকের জন্য: কীভাবে উত্তর সাজাবেন, কোন ভুল এড়াবেন এবং নিজেকে যাচাই করতে দ্রুত পরীক্ষা।' : 'For each topic: how to frame the answer, the trap to avoid, and a quick exam to test yourself.'} />
    <section className="interview-framework">
      <div><span className="eyebrow">{lang === 'bn' ? 'প্রতিটি প্রশ্নে একই কাঠামো' : 'One structure for every prompt'}</span><h2>{lang === 'bn' ? '৬ ধাপের উত্তর কাঠামো' : 'The six-step answer framework'}</h2></div>
      <ol>{framework.map((step, i) => <li key={i}><b>{String(i + 1).padStart(2, '0')}</b>{step}</li>)}</ol>
    </section>
    <div className="interview-modules">
      {modules.map((module) => {
        const list = topics.filter((topic) => topic.moduleId === module.id)
        return (
          <section className="interview-module" key={module.id} style={{ '--module-color': module.color }}>
            <header><span className="module-number">{module.number}</span><h2>{text(module.title)}</h2></header>
            <div className="interview-cards">
              {list.map((topic) => (
                <article className="interview-item" key={topic.id}>
                  <h3>{text(topic.title)}</h3>
                  <div className="interview-note"><small>{lang === 'bn' ? 'যেভাবে উত্তর দেবেন' : 'How to answer'}</small><p>{text(topic.interview)}</p></div>
                  <div className="interview-trap"><small>{lang === 'bn' ? 'যে ভুল এড়াবেন' : 'Trap to avoid'}</small><p>{text(topic.mistake)}</p></div>
                  <div className="interview-actions">
                    <button onClick={() => openTopic(topic.id)}>{lang === 'bn' ? 'পাঠ' : 'Lesson'}</button>
                    <button className="primary" onClick={() => navigate('exam', { topicId: topic.id })}>{lang === 'bn' ? 'পরীক্ষা' : 'Exam'} <Icon name="arrow" /></button>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )
      })}
    </div>
  </>
}

function Cheatsheet({ lang, openTopic }) {
  const { topics, modules } = useCourse()
  const text = (v) => t(v, lang)
  return <>
    <PageIntro eyebrow={lang === 'bn' ? 'দ্রুত রিভিশন' : 'Rapid revision'} title={lang === 'bn' ? 'চিটশিট' : 'Cheatsheet'} description={lang === 'bn' ? 'প্রতিটি ধারণা সংক্ষেপে: সংজ্ঞা, মূল নীতি, ট্রেড-অফ ও সাধারণ ভুল।' : 'Every idea in brief: the definition, the design principle, the trade-off, and the common mistake.'} />
    <div className="cheatsheet-stack">
      {modules.map((module) => {
        const list = topics.filter((topic) => topic.moduleId === module.id)
        return (
          <section className="cheat-module" key={module.id} style={{ '--module-color': module.color }}>
            <header><span className="module-number">{module.number}</span><h2>{text(module.title)}</h2></header>
            <div className="cheat-rows">
              {list.map((topic) => (
                <button className="cheat-row" key={topic.id} onClick={() => openTopic(topic.id)}>
                  <strong>{text(topic.title)}</strong>
                  <p className="cheat-def">{text(topic.insight)}</p>
                  <span className="cheat-tag cheat-principle"><b>{lang === 'bn' ? 'নীতি' : 'Principle'}</b> {text(topic.action)}</span>
                  <span className="cheat-tag cheat-cost"><b>{lang === 'bn' ? 'খরচ' : 'Cost'}</b> {text(topic.tradeoff)}</span>
                  <span className="cheat-tag cheat-avoid"><b>{lang === 'bn' ? 'এড়ান' : 'Avoid'}</b> {text(topic.mistake)}</span>
                </button>
              ))}
            </div>
          </section>
        )
      })}
    </div>
  </>
}

function Glossary({ lang, openTopic }) {
  const { topics } = useCourse()
  const text = (v) => t(v, lang)
  const [query, setQuery] = useState('')
  const entries = useMemo(() => topics
    .map((topic) => ({ id: topic.id, term: text(topic.title), def: text(topic.insight) }))
    .sort((a, b) => a.term.localeCompare(b.term, lang === 'bn' ? 'bn' : 'en')), [lang, topics])
  const normalized = query.trim().toLowerCase()
  const filtered = entries.filter((entry) => !normalized || entry.term.toLowerCase().includes(normalized) || entry.def.toLowerCase().includes(normalized))
  return <>
    <PageIntro eyebrow={lang === 'bn' ? `${entries.length}টি ধারণা` : `${entries.length} concepts`} title={lang === 'bn' ? 'শব্দকোষ' : 'Glossary'} description={lang === 'bn' ? 'এই কোর্সের মূল শব্দ ও ধারণা—এক জায়গায়, খুঁজে নিন।' : 'Every core term and concept from this course in one searchable place.'} />
    <div className="glossary-search"><span aria-hidden="true">⌕</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={lang === 'bn' ? 'ধারণা খুঁজুন…' : 'Search a concept…'} aria-label={lang === 'bn' ? 'শব্দকোষ খুঁজুন' : 'Search glossary'} /></div>
    <div className="glossary-list">
      {filtered.map((entry) => (
        <button className="glossary-entry" key={entry.id} onClick={() => openTopic(entry.id)}>
          <strong>{entry.term}</strong>
          <p>{entry.def}</p>
          <span className="glossary-open">{lang === 'bn' ? 'পড়ুন' : 'Read'} <Icon name="arrow" /></span>
        </button>
      ))}
      {!filtered.length && <div className="glossary-empty">{lang === 'bn' ? 'কিছু পাওয়া যায়নি।' : 'Nothing found.'}</div>}
    </div>
  </>
}

function Catalog({ progress, lang, switchCourse, activeCourseId }) {
  const text = (v) => t(v, lang)
  return <>
    <PageIntro eyebrow={lang === 'bn' ? 'শেখার প্ল্যাটফর্ম' : 'Learning platform'} title={lang === 'bn' ? 'কোর্স ক্যাটালগ' : 'Course catalog'} description={lang === 'bn' ? 'একটি কোর্স বেছে নিয়ে শেখা শুরু করুন। নতুন কোর্স নিয়মিত যোগ হচ্ছে।' : 'Pick a course and start learning. New courses are added regularly.'} />
    <div className="catalog-grid">
      {courses.map((item) => {
        const done = item.topics ? item.topics.filter((topic) => progress.completed.includes(topic.id)).length : 0
        const total = item.topics?.length || 0
        const isActive = item.available && item.id === activeCourseId
        return (
          <button
            key={item.id}
            className={`catalog-card ${item.available ? '' : 'soon'} ${isActive ? 'active' : ''}`}
            style={{ '--module-color': item.color, '--course-accent': item.accent }}
            disabled={!item.available}
            onClick={() => item.available && switchCourse(item.id)}
          >
            <header>
              <span className="catalog-mark">{item.mark}</span>
              {item.available ? (total ? <b className="catalog-progress">{done}/{total}</b> : null) : <b className="catalog-soon">{lang === 'bn' ? 'শীঘ্রই' : 'Soon'}</b>}
            </header>
            <strong>{text(item.title)}</strong>
            <p>{text(item.summary)}</p>
            <footer>
              {item.available
                ? <><span>{total} {lang === 'bn' ? 'টি টপিক' : 'topics'}</span><span className="catalog-open">{done ? (lang === 'bn' ? 'চালিয়ে যান' : 'Continue') : (lang === 'bn' ? 'শুরু করুন' : 'Start')} <Icon name="arrow" /></span></>
                : <span>{lang === 'bn' ? 'তৈরি হচ্ছে' : 'In development'}</span>}
            </footer>
          </button>
        )
      })}
    </div>
  </>
}
