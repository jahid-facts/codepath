'use client'

import { useState } from 'react'
import ArchitectureDiagram from '../../components/ArchitectureDiagram'

const same=(left=[],right=[])=>[...left].sort().join(',')===[...right].sort().join(',')

function ManagedQuiz({quiz,lang}){
  const[answers,setAnswers]=useState({}),[submitted,setSubmitted]=useState(false)
  const bn=lang==='bn'
  const choose=(question,index,choice)=>setAnswers((current)=>{const previous=current[index]||[];return{...current,[index]:question.type==='multi'?(previous.includes(choice)?previous.filter((item)=>item!==choice):[...previous,choice]):[choice]}})
  const complete=quiz.every((_,index)=>(answers[index]||[]).length)
  const score=quiz.filter((question,index)=>same(answers[index],question.correct)).length
  return <section className="managed-quiz"><span className="eyebrow">{bn?'পাঠ পরীক্ষা':'Lesson exam'}</span><h2>{bn?'পাঁচটি সিদ্ধান্ত যাচাই করুন':'Check five design decisions'}</h2>{quiz.map((question,index)=><section className="managed-question" key={index}><h3>{index+1}. {question.prompt[lang]}</h3><div>{question.options.map((option,optionIndex)=>{const selected=(answers[index]||[]).includes(optionIndex),correct=question.correct.includes(optionIndex);return <button type="button" disabled={submitted} className={`${selected?'selected':''} ${submitted&&correct?'correct':''}`} onClick={()=>choose(question,index,optionIndex)} key={optionIndex}>{String.fromCharCode(65+optionIndex)}. {option[lang]}</button>})}</div>{submitted&&<p><strong>{bn?'ব্যাখ্যা:':'Explanation:'}</strong> {question.explanation[lang]}</p>}</section>)}{!submitted?<button className="primary-button" disabled={!complete} onClick={()=>setSubmitted(true)}>{bn?'উত্তর যাচাই করুন':'Check answers'}</button>:<div className="managed-score">{bn?`স্কোর: ${score}/${quiz.length}`:`Score: ${score}/${quiz.length}`}</div>}</section>
}

export default function ManagedLesson({lesson}){
  const[lang,setLang]=useState('en')
  const bn=lang==='bn',body=bn?lesson.body_bn:lesson.body_en
  let quiz=[]
  try{quiz=JSON.parse(lesson.quiz_json||'[]')}catch{/* Published content is validated; retain a safe empty fallback. */}
  return <main className="managed-lesson" lang={lang}><header><a href="/learn">← {bn?'কোর্সে ফিরুন':'Back to course'}</a><button onClick={()=>setLang(bn?'en':'bn')}>{bn?'English':'বাংলা'}</button></header><span className="eyebrow">{lesson.module_id} · {bn?'ম্যানেজড পাঠ':'Managed lesson'} · v{lesson.version}</span><h1>{bn?lesson.title_bn:lesson.title_en}</h1>{(bn?lesson.summary_bn:lesson.summary_en)&&<p className="managed-summary">{bn?lesson.summary_bn:lesson.summary_en}</p>}<article>{body.split(/\n{2,}/).map((paragraph,index)=><p key={index}>{paragraph}</p>)}</article><section className="managed-architecture"><ArchitectureDiagram kind={lesson.diagram_kind||'request'} lang={lang} title={{en:lesson.title_en,bn:lesson.title_bn}}/></section>{quiz.length===5&&<ManagedQuiz quiz={quiz} lang={lang}/>}<footer><a href="/privacy">{bn?'গোপনীয়তা':'Privacy'}</a><span>CodePath</span></footer></main>
}
