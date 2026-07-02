'use client'

import { useState } from 'react'
import { topics } from '../data'

const diagnosticQuestions = [
  {
    id: 'rps',
    prompt: { en: 'A service receives 10 million requests per day. Roughly what is the average RPS?', bn: 'একটি সার্ভিস দিনে ১ কোটি রিকোয়েস্ট পায়। গড় RPS আনুমানিক কত?' },
    options: [{ id: 'a', en: '12 RPS', bn: '১২ RPS' }, { id: 'b', en: '116 RPS', bn: '১১৬ RPS' }, { id: 'c', en: '1,160 RPS', bn: '১,১৬০ RPS' }],
    correct: 'b',
  },
  {
    id: 'cache',
    prompt: { en: 'The same product record is read thousands of times and rarely changes. What is the best first optimization?', bn: 'একই পণ্যের রেকর্ড হাজারবার পড়া হয় এবং খুব কম বদলায়। প্রথম ভালো অপটিমাইজেশন কী?' },
    options: [{ id: 'a', en: 'Add a cache with a freshness policy', bn: 'ফ্রেশনেস নীতিসহ ক্যাশ যোগ করা' }, { id: 'b', en: 'Create a new database per request', bn: 'প্রতি রিকোয়েস্টে নতুন ডেটাবেস' }, { id: 'c', en: 'Retry every read three times', bn: 'প্রতি রিড তিনবার রিট্রাই' }],
    correct: 'a',
  },
  {
    id: 'partition',
    prompt: { en: 'During a network partition, a social feed may show slightly old posts but must remain usable. Which direction fits?', bn: 'নেটওয়ার্ক পার্টিশনে সোশ্যাল ফিড সামান্য পুরোনো পোস্ট দেখাতে পারে, তবে চালু থাকতে হবে। কোন দিকটি উপযুক্ত?' },
    options: [{ id: 'a', en: 'Availability with eventual consistency', bn: 'ইভেনচুয়াল কনসিস্টেন্সিসহ অ্যাভেইলেবিলিটি' }, { id: 'b', en: 'Stop every read globally', bn: 'সব রিড বিশ্বব্যাপী বন্ধ করা' }, { id: 'c', en: 'Remove replication', bn: 'রেপ্লিকেশন সরিয়ে দেওয়া' }],
    correct: 'a',
  },
]

export default function Onboarding({ lang, onFinish }) {
  const [step, setStep] = useState(0)
  const [goal, setGoal] = useState('')
  const [experience, setExperience] = useState('')
  const [pace, setPace] = useState('')
  const [answers, setAnswers] = useState({})
  const bn = lang === 'bn'
  const score = diagnosticQuestions.filter((question) => answers[question.id] === question.correct).length
  const recommendedTopic = score >= 3 ? 'estimation' : score >= 2 || experience === 'working' ? 'requirements' : score >= 1 ? 'request-lifecycle' : 'system-design'
  const recommended = topics.find((topic) => topic.id === recommendedTopic) || topics[0]
  const complete = (startTopic) => onFinish({ goal, experience, pace: pace || 'steady', diagnosticScore: score, recommendedTopic }, startTopic)
  const canContinue = step === 0 ? Boolean(goal) : step === 1 ? Boolean(experience) : step === 2 ? Object.keys(answers).length === diagnosticQuestions.length : Boolean(pace)

  return <div className="onboarding-backdrop"><section className="onboarding" role="dialog" aria-modal="true" aria-labelledby="onboarding-title">
    <header><a className="onboarding-brand" href="/"><span>S</span><strong>SystemPath</strong></a><div className="onboarding-progress">{[0, 1, 2, 3].map((index) => <i className={index <= step ? 'active' : ''} key={index} />)}</div><button onClick={() => complete(false)}>{bn ? 'এড়িয়ে যান' : 'Skip for now'}</button></header>
    <div className="onboarding-body">
      {step === 0 && <div className="onboarding-step"><span className="onboarding-kicker">01 · {bn ? 'আপনার লক্ষ্য' : 'Your goal'}</span><h1 id="onboarding-title">{bn ? 'আপনি কেন সিস্টেম ডিজাইন শিখছেন?' : 'What are you learning system design for?'}</h1><p>{bn ? 'আপনার লক্ষ্য অনুযায়ী আমরা উদাহরণ, অনুশীলন ও পরবর্তী পাঠ সাজাব।' : 'We’ll use your goal to shape the examples, practice, and recommended next lesson.'}</p><div className="onboarding-choice-grid">{[
        ['interview', '◎', 'Interview preparation', 'ইন্টারভিউ প্রস্তুতি', 'Build a repeatable answer framework.', 'একটি নির্ভরযোগ্য উত্তর ফ্রেমওয়ার্ক তৈরি করুন।'],
        ['projects', '◇', 'Real-world projects', 'বাস্তব প্রজেক্ট', 'Make stronger production decisions.', 'আরও শক্তিশালী প্রোডাকশন সিদ্ধান্ত নিন।'],
        ['both', '✦', 'Both', 'দুটিই', 'Learn the concepts and apply them.', 'ধারণা শিখুন এবং প্রয়োগ করুন।'],
      ].map(([id, icon, en, bangla, detailEn, detailBn]) => <button className={goal === id ? 'selected' : ''} key={id} onClick={() => setGoal(id)}><span>{icon}</span><strong>{bn ? bangla : en}</strong><small>{bn ? detailBn : detailEn}</small><b>✓</b></button>)}</div></div>}

      {step === 1 && <div className="onboarding-step"><span className="onboarding-kicker">02 · {bn ? 'বর্তমান অভিজ্ঞতা' : 'Current experience'}</span><h1 id="onboarding-title">{bn ? 'আজ আপনি কোথা থেকে শুরু করছেন?' : 'Where are you starting today?'}</h1><p>{bn ? 'সঠিক বা ভুল উত্তর নেই—এটি শুধু আপনার শুরুর পথ নির্ধারণ করে।' : 'There is no right or wrong answer—this only helps us choose your starting path.'}</p><div className="experience-list">{[
        ['new', '01', 'New to backend architecture', 'ব্যাকএন্ড আর্কিটেকচারে নতুন', 'Start from client-server and requirements.', 'ক্লায়েন্ট-সার্ভার ও রিকোয়ারমেন্ট থেকে শুরু।'],
        ['working', '02', 'Working backend developer', 'কর্মরত ব্যাকএন্ড ডেভেলপার', 'Move faster through foundations.', 'ভিত্তি দ্রুত অতিক্রম করুন।'],
        ['interviewing', '03', 'Already preparing for interviews', 'ইন্টারভিউ প্রস্তুতি চলছে', 'Focus on estimation and trade-offs.', 'এস্টিমেশন ও ট্রেড-অফে ফোকাস করুন।'],
      ].map(([id, number, en, bangla, detailEn, detailBn]) => <button className={experience === id ? 'selected' : ''} key={id} onClick={() => setExperience(id)}><span>{number}</span><div><strong>{bn ? bangla : en}</strong><small>{bn ? detailBn : detailEn}</small></div><b>✓</b></button>)}</div></div>}

      {step === 2 && <div className="onboarding-step diagnostic-step"><span className="onboarding-kicker">03 · {bn ? 'দ্রুত ডায়াগনস্টিক' : 'Quick diagnostic'}</span><h1 id="onboarding-title">{bn ? 'তিনটি ছোট সিদ্ধান্ত নিন।' : 'Make three quick decisions.'}</h1><p>{bn ? 'স্কোর দেখানোর জন্য নয়—আপনার জন্য ভালো শুরুর পাঠ বাছাই করতে।' : 'This is not about passing; it helps us recommend the right starting lesson.'}</p><div className="diagnostic-list">{diagnosticQuestions.map((question, questionIndex) => <fieldset key={question.id}><legend><span>0{questionIndex + 1}</span>{question.prompt[lang]}</legend><div>{question.options.map((option) => <button type="button" className={answers[question.id] === option.id ? 'selected' : ''} key={option.id} onClick={() => setAnswers((current) => ({ ...current, [question.id]: option.id }))}><span>{option.id.toUpperCase()}</span>{option[lang]}<b>✓</b></button>)}</div></fieldset>)}</div></div>}

      {step === 3 && <div className="onboarding-step result-step"><span className="onboarding-kicker">04 · {bn ? 'আপনার পরিকল্পনা' : 'Your learning plan'}</span><div className="recommendation-mark">✦</div><h1 id="onboarding-title">{bn ? 'আপনার পথ প্রস্তুত।' : 'Your path is ready.'}</h1><p>{bn ? `ডায়াগনস্টিক ফল ${score}/3। আমরা এই পাঠ থেকে শুরু করার পরামর্শ দিচ্ছি:` : `Diagnostic result: ${score}/3. We recommend starting here:`}</p><button className="recommended-topic" onClick={() => {}}><span>{String(recommended.order).padStart(2, '0')}</span><div><small>{bn ? 'প্রস্তাবিত প্রথম পাঠ' : 'Recommended first lesson'}</small><strong>{recommended.title[lang]}</strong><p>{recommended.insight[lang]}</p></div></button><h2>{bn ? 'আপনার শেখার গতি' : 'Choose your study pace'}</h2><div className="pace-grid">{[
        ['casual', '10', 'Casual', 'হালকা', 'min/day', 'মিনিট/দিন'], ['steady', '25', 'Steady', 'নিয়মিত', 'min/day', 'মিনিট/দিন'], ['intensive', '45', 'Intensive', 'নিবিড়', 'min/day', 'মিনিট/দিন'],
      ].map(([id, time, en, bangla, unitEn, unitBn]) => <button className={pace === id ? 'selected' : ''} key={id} onClick={() => setPace(id)}><strong>{time}</strong><small>{bn ? unitBn : unitEn}</small><span>{bn ? bangla : en}</span></button>)}</div></div>}
    </div>
    <footer><button className="onboarding-back" disabled={step === 0} onClick={() => setStep(Math.max(0, step - 1))}>← {bn ? 'পেছনে' : 'Back'}</button><span>{step + 1} / 4</span>{step < 3 ? <button className="onboarding-next" disabled={!canContinue} onClick={() => setStep(step + 1)}>{bn ? 'চালিয়ে যান' : 'Continue'} →</button> : <button className="onboarding-next" disabled={!canContinue} onClick={() => complete(true)}>{bn ? 'আমার পথ শুরু করুন' : 'Start my path'} →</button>}</footer>
  </section></div>
}

