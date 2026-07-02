# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: operations.spec.js >> admin can publish, version, preview, roll back, and delete validated bilingual content
- Location: e2e/operations.spec.js:7:1

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: 200
Received: 401
```

# Test source

```ts
  1 | import { expect, test } from '@playwright/test'
  2 | import { quizTemplate } from '../lib/content-validation.js'
  3 | 
  4 | test('readiness health checks all persistent subsystems without leaking counts',async({request})=>{const response=await request.get('/api/health');expect(response.status()).toBe(200);const body=await response.json();expect(body.status).toBe('ok');expect(body.checks).toEqual({analytics:{ok:true},content:{ok:true},monitoring:{ok:true}});expect(JSON.stringify(body)).not.toContain('managedLessons');expect(JSON.stringify(body)).not.toContain('recentErrors')})
  5 | test('monitoring ingestion rejects unrecognized event types',async({request})=>{const response=await request.post('/api/monitoring/event',{data:{kind:'advertising',name:'not-allowed'}});expect(response.status()).toBe(400)})
  6 | test('content-management API and draft previews require admin authentication',async({request})=>{expect((await request.get('/api/admin/content')).status()).toBe(401);const preview=await request.get('/admin/content/preview/private-draft');expect(preview.status()).toBe(200);expect(await preview.text()).toContain('Admin access')})
> 7 | test('admin can publish, version, preview, roll back, and delete validated bilingual content',async({request})=>{const login=await request.post('/api/admin/login',{data:{password:'systempath-e2e-admin-password'}});expect(login.status()).toBe(200);const slug=`e2e-managed-${Date.now()}`,lesson={slug,moduleId:'foundations',titleEn:'E2E managed architecture lesson',titleBn:'ইটু ই ম্যানেজড আর্কিটেকচার পাঠ',summaryEn:'Validated publishing test.',summaryBn:'যাচাইকৃত প্রকাশনা পরীক্ষা।',bodyEn:'A production architecture lesson must explain assumptions, request flow, scaling decisions, failure modes, recovery, and explicit trade-offs. '.repeat(3),bodyBn:'একটি প্রোডাকশন আর্কিটেকচার পাঠে অনুমান, রিকোয়েস্ট প্রবাহ, স্কেলিং সিদ্ধান্ত, ব্যর্থতা, পুনরুদ্ধার এবং স্পষ্ট ট্রেড-অফ ব্যাখ্যা করতে হবে। '.repeat(3),status:'published',diagramKind:'request',quizJson:JSON.stringify(quizTemplate),banglaReviewed:true,technicalReviewed:true};const created=await request.post('/api/admin/content',{data:lesson});expect(created.status()).toBe(200);const first=await created.json();expect(first.lesson.version).toBe(1);expect((await request.get(`/managed-lessons/${slug}`)).status()).toBe(200);const updated=await request.post('/api/admin/content',{data:{...lesson,titleEn:'Updated managed architecture lesson'}});expect((await updated.json()).lesson.version).toBe(2);const history=await(await request.get(`/api/admin/content?slug=${slug}`)).json();expect(history.versions).toHaveLength(2);const rollback=await request.post('/api/admin/content',{data:{action:'rollback',slug,version:1}});expect((await rollback.json()).lesson.version).toBe(3);expect((await request.get(`/admin/content/preview/${slug}`)).status()).toBe(200);expect((await request.delete(`/api/admin/content?slug=${slug}`)).status()).toBe(200)})
    |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             ^ Error: expect(received).toBe(expected) // Object.is equality
  8 | 
```