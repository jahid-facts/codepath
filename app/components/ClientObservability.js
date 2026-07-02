'use client'

import { useEffect } from 'react'

const rating=(name,value)=>{const limits={LCP:[2500,4000],CLS:[.1,.25],FCP:[1800,3000],TTFB:[800,1800]};const[good,poor]=limits[name]||[Infinity,Infinity];return value<=good?'good':value<=poor?'needs-improvement':'poor'}

export default function ClientObservability({enabled}){
  useEffect(()=>{if(!enabled)return
    const send=(payload)=>fetch('/api/monitoring/event',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({...payload,path:`${location.pathname}${location.search}`}),keepalive:true}).catch(()=>{})
    const error=(event)=>send({kind:'error',name:event.error?.name||'WindowError',message:event.message||'Unknown client error',stack:event.error?.stack||''})
    const rejection=(event)=>send({kind:'error',name:event.reason?.name||'UnhandledRejection',message:event.reason?.message||String(event.reason||'Unhandled promise rejection'),stack:event.reason?.stack||''})
    window.addEventListener('error',error);window.addEventListener('unhandledrejection',rejection)
    let cls=0,lcp=0;const observers=[]
    try{const layout=new PerformanceObserver((list)=>{for(const entry of list.getEntries())if(!entry.hadRecentInput)cls+=entry.value});layout.observe({type:'layout-shift',buffered:true});observers.push(layout)}catch{}
    try{const largest=new PerformanceObserver((list)=>{lcp=list.getEntries().at(-1)?.startTime||lcp});largest.observe({type:'largest-contentful-paint',buffered:true});observers.push(largest)}catch{}
    const timer=setTimeout(()=>{const navigation=performance.getEntriesByType('navigation')[0],paint=performance.getEntriesByName('first-contentful-paint')[0];for(const[name,value]of[['TTFB',navigation?.responseStart||0],['FCP',paint?.startTime||0],['LCP',lcp],['CLS',cls]])if(value>0||name==='CLS')send({kind:'vital',name,value:Number(value.toFixed(3)),rating:rating(name,value)})},3000)
    return()=>{clearTimeout(timer);observers.forEach((observer)=>observer.disconnect());window.removeEventListener('error',error);window.removeEventListener('unhandledrejection',rejection)}
  },[enabled])
  return null
}
