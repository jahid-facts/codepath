import test from 'node:test'
import assert from 'node:assert/strict'
import { dsaModules, dsaTopics, dsaLabs } from '../app/courses/dsa.js'

test('DSA curriculum has six modules, each with at least one topic', () => {
  assert.equal(dsaModules.length, 6)
  assert.equal(new Set(dsaModules.map((module) => module.id)).size, 6)
  for (const module of dsaModules) {
    assert.ok(module.title.en.trim() && module.title.bn.trim(), `${module.id} needs a bilingual title`)
    assert.ok(dsaTopics.some((topic) => topic.moduleId === module.id), `${module.id} has no topics`)
  }
})

test('DSA topics are unique, ordered, and every topic maps to a real module', () => {
  const moduleIds = new Set(dsaModules.map((module) => module.id))
  assert.equal(new Set(dsaTopics.map((topic) => topic.id)).size, dsaTopics.length)
  dsaTopics.forEach((topic, index) => {
    assert.equal(topic.order, index + 1, `${topic.id} order must match its position for lesson navigation`)
    assert.ok(moduleIds.has(topic.moduleId), `${topic.id} points at unknown module ${topic.moduleId}`)
  })
})

test('every DSA topic has bilingual content, objectives, and five valid questions', () => {
  for (const topic of dsaTopics) {
    for (const field of ['title', 'insight', 'analogy', 'action', 'tradeoff', 'mistake', 'advantages', 'interview']) {
      assert.ok(topic[field].en.trim(), `${topic.id}.${field}.en is required`)
      assert.ok(topic[field].bn.trim(), `${topic.id}.${field}.bn is required`)
    }
    assert.equal(topic.objectives.length, 3)
    assert.equal(topic.exam.length, 5)
    for (const question of topic.exam) {
      assert.ok(question.prompt.en && question.prompt.bn, `${topic.id} question prompt must be bilingual`)
      assert.ok(question.explanation.en && question.explanation.bn, `${topic.id} explanation must be bilingual`)
      assert.ok(question.correct.length >= 1)
      assert.ok(question.correct.every((id) => question.options.some((option) => option.id === id)), `${topic.id} has a correct id with no matching option`)
      assert.ok(question.options.every((option) => option.text.en && option.text.bn), `${topic.id} options must be bilingual`)
    }
  }
})

test('DSA complexity tables are bilingual and carry a value', () => {
  for (const topic of dsaTopics) {
    for (const row of topic.complexity) {
      assert.ok(row.op.en && row.op.bn, `${topic.id} complexity op must be bilingual`)
      assert.ok(String(row.value).trim(), `${topic.id} complexity row must state a value`)
    }
  }
})

test('DSA single-answer exams distribute the correct option across all positions', () => {
  const positions = new Set(dsaTopics.flatMap((topic) => topic.exam.filter((question) => question.type === 'single').map((question) => question.correct[0])))
  assert.deepEqual([...positions].sort(), ['a', 'b', 'c', 'd'])
})

test('DSA guided labs are bilingual with a valid expert choice per stage', () => {
  assert.ok(dsaLabs.length >= 4)
  for (const lab of dsaLabs) {
    assert.ok(lab.title.en && lab.title.bn)
    assert.ok(lab.stages.length >= 4)
    for (const stage of lab.stages) {
      assert.ok(stage.question.en && stage.question.bn)
      assert.ok(stage.options.every((option) => option.en && option.bn))
      assert.ok(stage.options[stage.correct], `${stage.id} correct index is out of range`)
    }
  }
})
