import test from 'node:test'
import assert from 'node:assert/strict'
import { labs, modules, topics } from '../app/data.js'
import { calculateSimulation, calculateStreak, sameAnswers } from '../app/logic.js'
import { parseUserAgent } from '../lib/user-agent.js'
import { createProgressEnvelope, resolveProgressConflict } from '../app/services/progress-sync.js'
import { quizTemplate, validateManagedLesson } from '../lib/content-validation.js'

test('curriculum has forty unique topics across six modules', () => {
  assert.equal(modules.length, 6)
  assert.equal(topics.length, 40)
  assert.equal(new Set(topics.map((topic) => topic.id)).size, 40)
  for (const module of modules) assert.ok(topics.some((topic) => topic.moduleId === module.id))
})

test('every topic has bilingual content and fifteen valid questions', () => {
  for (const topic of topics) {
    for (const field of ['title', 'insight', 'analogy', 'action', 'tradeoff', 'mistake', 'advantages', 'interview']) {
      assert.ok(topic[field].en.trim(), `${topic.id}.${field}.en is required`)
      assert.ok(topic[field].bn.trim(), `${topic.id}.${field}.bn is required`)
    }
    assert.equal(topic.objectives.length, 3)
    assert.equal(topic.exam.length, 15)
    assert.equal(new Set(topic.exam.map((question) => question.id)).size, 15)
    for (const question of topic.exam) {
      assert.ok(question.prompt.en && question.prompt.bn)
      assert.ok(question.explanation.en && question.explanation.bn)
      assert.ok(question.correct.length >= 1)
      assert.ok(question.correct.every((id) => question.options.some((option) => option.id === id)))
      assert.ok(question.options.every((option) => option.text.en && option.text.bn))
    }
  }
})

test('ten flagship lessons contain authored scale, contract, failure, and decision material', () => {
  const flagship = topics.filter((topic) => topic.deepDive)
  assert.equal(flagship.length, 10)
  for (const topic of flagship) {
    assert.equal(topic.deepDive.calculations.length, 3)
    assert.ok(topic.deepDive.apis.length >= 3)
    assert.ok(topic.deepDive.schema.length >= 4)
    assert.equal(topic.deepDive.failures.length, 3)
    assert.equal(topic.deepDive.decisions.length, 3)
    for (const item of [...topic.deepDive.scenario.assumptions, ...topic.deepDive.checklist]) assert.ok(item.en && item.bn)
  }
})

test('flagship lessons keep fifty unique authored scenario questions inside their expanded exams', () => {
  const flagship = topics.filter((topic) => topic.deepDive)
  for (const topic of flagship) assert.equal(topic.exam.length, 15, `${topic.id} should have fifteen questions`)
  const authored = flagship.flatMap((topic) => topic.exam.filter((question) => question.authored))
  assert.equal(authored.length, 50)
  assert.ok(authored.every((question) => question.authored === true))
  assert.equal(new Set(authored.map((question) => question.prompt.en)).size, 50)
  assert.ok(authored.every((question) => question.prompt.bn && question.explanation.bn))
})

test('guided labs have bilingual decisions and valid expert choices', () => {
  assert.equal(labs.length, 8)
  for (const lab of labs) {
    assert.ok(lab.title.en && lab.title.bn)
    assert.ok(lab.stages.length >= 4)
    for (const stage of lab.stages) {
      assert.ok(stage.question.en && stage.question.bn)
      assert.ok(stage.options[stage.correct])
    }
  }
})

test('flagship design labs contain deeper end-to-end decision stages', () => {
  for (const id of ['url-lab', 'chat-lab', 'feed-lab', 'video-lab', 'payments-lab']) {
    const lab = labs.find((item) => item.id === id)
    assert.ok(lab, `missing ${id}`)
    assert.ok(lab.stages.length >= 8, `${id} needs at least eight stages`)
  }
})

test('answer comparison is order-independent and exact', () => {
  assert.equal(sameAnswers(['a', 'c'], ['c', 'a']), true)
  assert.equal(sameAnswers(['a'], ['a', 'c']), false)
  assert.equal(sameAnswers(['b'], ['a']), false)
})

test('simulator is deterministic and exposes overloads', () => {
  const inputs = { rps: 1200, reads: 85, payload: 12, cacheHit: 70, replicas: 4, dbCapacity: 500, replication: 2, failure: false }
  const normal = calculateSimulation(inputs)
  assert.deepEqual(normal, calculateSimulation(inputs))
  assert.equal(normal.overloaded, false)
  const overloaded = calculateSimulation({ rps: 10000, reads: 90, payload: 64, cacheHit: 0, replicas: 1, dbCapacity: 100, replication: 1, failure: true })
  assert.equal(overloaded.overloaded, true)
  assert.ok(overloaded.latency > normal.latency)
})

test('learning streak counts consecutive days and tolerates one inactive current day', () => {
  const now = new Date('2026-06-30T12:00:00Z')
  assert.equal(calculateStreak(['2026-06-28', '2026-06-29', '2026-06-30'], now), 3)
  assert.equal(calculateStreak(['2026-06-27', '2026-06-28', '2026-06-29'], now), 3)
  assert.equal(calculateStreak(['2026-06-27'], now), 0)
})

test('exam answers are distributed across all option positions', () => {
  const positions = new Set(topics.flatMap((topic) => topic.exam.filter((question) => question.type === 'single').map((question) => question.correct[0])))
  assert.deepEqual([...positions].sort(), ['a', 'b', 'c', 'd'])
})

test('visitor user agents are classified into useful admin dimensions', () => {
  const mobile = parseUserAgent('Mozilla/5.0 (Linux; Android 14; Pixel 8) AppleWebKit/537.36 Chrome/124.0 Mobile Safari/537.36')
  assert.equal(mobile.browser, 'Chrome')
  assert.equal(mobile.operatingSystem, 'Android')
  assert.equal(mobile.deviceType, 'Mobile')
  const desktop = parseUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Edg/124.0')
  assert.equal(desktop.browser, 'Edge')
  assert.equal(desktop.deviceName, 'Windows PC')
})

test('cloud progress boundary preserves the newest revision deterministically', () => {
  const local = createProgressEnvelope({ completed: ['system-design'] }, 2)
  const remote = { ...createProgressEnvelope({ completed: ['system-design', 'requirements'] }, 3), updatedAt: '2026-06-30T12:00:00.000Z' }
  assert.equal(resolveProgressConflict(local, remote), remote)
})

test('managed publication requires bilingual content, five valid questions, and human approvals', () => {
  const base = { slug:'new-lesson',moduleId:'foundations',titleEn:'New lesson',titleBn:'নতুন পাঠ',summaryEn:'Summary',summaryBn:'সারাংশ',bodyEn:'x'.repeat(250),bodyBn:'ক'.repeat(250),status:'published',diagramKind:'request',quizJson:JSON.stringify(quizTemplate),banglaReviewed:true,technicalReviewed:true }
  assert.equal(validateManagedLesson(base).valid,true)
  const rejected = validateManagedLesson({ ...base, banglaReviewed:false, quizJson:'[]' })
  assert.equal(rejected.valid,false)
  assert.ok(rejected.errors.some((error)=>error.includes('Bangla')))
  assert.ok(rejected.errors.some((error)=>error.includes('five')))
})
