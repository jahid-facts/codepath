'use client'

import { useMemo, useState } from 'react'
import { MANAGED_DIAGRAMS, quizTemplate, validateManagedLesson } from '../../../lib/content-validation'
import styles from '../admin.module.css'

const empty={slug:'',moduleId:'foundations',titleEn:'',titleBn:'',summaryEn:'',summaryBn:'',bodyEn:'',bodyBn:'',status:'draft',diagramKind:'request',quizJson:JSON.stringify(quizTemplate,null,2),banglaReviewed:false,technicalReviewed:false}
const fromRow=(row)=>({slug:row.slug,moduleId:row.module_id,titleEn:row.title_en,titleBn:row.title_bn,summaryEn:row.summary_en,summaryBn:row.summary_bn,bodyEn:row.body_en,bodyBn:row.body_bn,status:row.status,diagramKind:row.diagram_kind||'request',quizJson:row.quiz_json||'[]',banglaReviewed:Boolean(row.bangla_reviewed),technicalReviewed:Boolean(row.technical_reviewed)})

export default function ContentEditor({initialLessons}){
  const[lessons,setLessons]=useState(initialLessons)
  const[form,setForm]=useState(empty)
  const[message,setMessage]=useState('')
  const[versions,setVersions]=useState([])
  const[audit,setAudit]=useState([])
  const set=(key,value)=>setForm((current)=>({...current,[key]:value}))
  const validation=useMemo(()=>validateManagedLesson(form),[form])
  const exists=lessons.some((item)=>item.slug===form.slug)

  const loadHistory=async(slug)=>{
    if(!slug){setVersions([]);setAudit([]);return}
    const response=await fetch(`/api/admin/content?slug=${encodeURIComponent(slug)}`,{cache:'no-store'})
    if(response.ok){const result=await response.json();setVersions(result.versions||[]);setAudit(result.audit||[])}
  }
  const choose=(lesson)=>{setForm(fromRow(lesson));setMessage('');loadHistory(lesson.slug)}
  const save=async(event)=>{
    event.preventDefault();setMessage('Saving…')
    const response=await fetch('/api/admin/content',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(form)})
    const result=await response.json()
    if(!response.ok){setMessage(result.error||'Unable to save.');return}
    setLessons((current)=>[result.lesson,...current.filter((item)=>item.slug!==result.lesson.slug)])
    setForm(fromRow(result.lesson));setMessage(`Saved version ${result.lesson.version}.`);loadHistory(result.lesson.slug)
  }
  const rollback=async(version)=>{
    if(!window.confirm(`Create a new version from version ${version}?`))return
    const response=await fetch('/api/admin/content',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({action:'rollback',slug:form.slug,version})})
    const result=await response.json()
    if(!response.ok){setMessage(result.error||'Rollback failed.');return}
    setLessons((current)=>[result.lesson,...current.filter((item)=>item.slug!==result.lesson.slug)])
    setForm(fromRow(result.lesson));setMessage(`Rolled back into version ${result.lesson.version}.`);loadHistory(result.lesson.slug)
  }
  const remove=async(slug)=>{if(!window.confirm(`Delete ${slug}? Version history remains in the audit database.`))return;const response=await fetch(`/api/admin/content?slug=${encodeURIComponent(slug)}`,{method:'DELETE'});if(response.ok){setLessons((current)=>current.filter((item)=>item.slug!==slug));setForm(empty);setVersions([]);setAudit([])}}

  return <main className={styles.contentEditorPage}>
    <header className={styles.contentEditorHeader}><a href="/admin">← Analytics</a><div><span className={styles.eyebrow}>Versioned course operations</span><h1>Content editor</h1><p>Author, validate, preview, review, publish, and roll back bilingual supplemental lessons.</p></div><button onClick={()=>{setForm(empty);setMessage('');setVersions([]);setAudit([])}}>+ New lesson</button></header>
    <div className={styles.contentEditorLayout}>
      <aside><strong>Managed lessons</strong>{lessons.map((lesson)=><button key={lesson.slug} onClick={()=>choose(lesson)}><span>{lesson.status==='published'?'●':'○'}</span><div><b>{lesson.title_en}</b><small>{lesson.slug} · v{lesson.version||0} · {lesson.status}</small></div></button>)}{!lessons.length&&<p>No managed lessons yet.</p>}</aside>
      <form onSubmit={save} className={styles.contentForm}>
        <div className={styles.formPair}><label>Slug<input required pattern="[a-z0-9]+(?:-[a-z0-9]+)*" value={form.slug} onChange={(event)=>set('slug',event.target.value)}/></label><label>Module<select value={form.moduleId} onChange={(event)=>set('moduleId',event.target.value)}>{['foundations','components','distributed','production','practical','mastery'].map((id)=><option key={id}>{id}</option>)}</select></label></div>
        <div className={styles.formPair}><label>English title<input required value={form.titleEn} onChange={(event)=>set('titleEn',event.target.value)}/></label><label>বাংলা শিরোনাম<input required lang="bn" value={form.titleBn} onChange={(event)=>set('titleBn',event.target.value)}/></label></div>
        <div className={styles.formPair}><label>English summary<textarea value={form.summaryEn} onChange={(event)=>set('summaryEn',event.target.value)}/></label><label>বাংলা সারাংশ<textarea lang="bn" value={form.summaryBn} onChange={(event)=>set('summaryBn',event.target.value)}/></label></div>
        <div className={styles.formPair}><label>English lesson body<textarea className={styles.bodyField} required value={form.bodyEn} onChange={(event)=>set('bodyEn',event.target.value)}/></label><label>বাংলা পাঠ<textarea className={styles.bodyField} required lang="bn" value={form.bodyBn} onChange={(event)=>set('bodyBn',event.target.value)}/></label></div>
        <div className={styles.formPair}><label>Architecture diagram<select value={form.diagramKind} onChange={(event)=>set('diagramKind',event.target.value)}>{MANAGED_DIAGRAMS.map((kind)=><option key={kind}>{kind}</option>)}</select></label><label>Publication status<select value={form.status} onChange={(event)=>set('status',event.target.value)}><option value="draft">Draft</option><option value="published">Published</option></select></label></div>
        <label>Five-question bilingual exam JSON<textarea className={styles.quizField} value={form.quizJson} spellCheck="false" onChange={(event)=>set('quizJson',event.target.value)}/></label>
        <section className={styles.reviewChecklist}><strong>Human publication approvals</strong><label><input type="checkbox" checked={form.banglaReviewed} onChange={(event)=>set('banglaReviewed',event.target.checked)}/> Bangla language reviewed by a fluent human editor</label><label><input type="checkbox" checked={form.technicalReviewed} onChange={(event)=>set('technicalReviewed',event.target.checked)}/> Technical accuracy reviewed by a system-design practitioner</label></section>
        <section className={validation.valid?styles.validationGood:styles.validationErrors}><strong>{validation.valid?'Ready to save':'Validation findings'}</strong>{validation.errors.map((error)=><p key={error}>! {error}</p>)}{validation.warnings.map((warning)=><p key={warning}>◇ {warning}</p>)}</section>
        <footer><span role="status">{message}</span>{exists&&<button type="button" className={styles.deleteContent} onClick={()=>remove(form.slug)}>Delete</button>}<button type="submit">Save version</button></footer>
        {exists&&<div className={styles.editorLinks}><a href={`/admin/content/preview/${form.slug}`} target="_blank">Private preview ↗</a>{form.status==='published'&&<a href={`/managed-lessons/${form.slug}`} target="_blank">Published page ↗</a>}</div>}
        {exists&&<section className={styles.versionPanel}><div><strong>Version history</strong>{versions.map((version)=><button type="button" key={version.id} onClick={()=>rollback(version.version)}>v{version.version} · {version.action}<small>{new Date(version.created_at).toLocaleString()}</small></button>)}</div><div><strong>Audit history</strong>{audit.map((entry)=><span key={entry.id}>{entry.action}<small>{new Date(entry.created_at).toLocaleString()}</small></span>)}</div></section>}
      </form>
    </div>
  </main>
}
