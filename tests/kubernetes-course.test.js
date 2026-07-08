import test from 'node:test'
import assert from 'node:assert/strict'
import { k8sModules, k8sTopics, k8sLabs } from '../app/courses/kubernetes.js'

test('Kubernetes curriculum has eight modules, each with at least one topic', () => {
  assert.equal(k8sModules.length, 8)
  assert.equal(new Set(k8sModules.map((module) => module.id)).size, 8)
  for (const module of k8sModules) {
    assert.ok(module.title.en.trim() && module.title.bn.trim(), `${module.id} needs a bilingual title`)
    assert.ok(k8sTopics.some((topic) => topic.moduleId === module.id), `${module.id} has no topics`)
  }
})

test('Kubernetes topics are unique, ordered, and every topic maps to a real module', () => {
  const moduleIds = new Set(k8sModules.map((module) => module.id))
  assert.ok(k8sTopics.length >= 36, 'the deep Kubernetes course should have at least 36 topics')
  assert.equal(new Set(k8sTopics.map((topic) => topic.id)).size, k8sTopics.length)
  k8sTopics.forEach((topic, index) => {
    assert.equal(topic.order, index + 1, `${topic.id} order must match its position for lesson navigation`)
    assert.ok(moduleIds.has(topic.moduleId), `${topic.id} points at unknown module ${topic.moduleId}`)
  })
})

test('every Kubernetes topic has bilingual content, objectives, and fifteen valid questions', () => {
  for (const topic of k8sTopics) {
    for (const field of ['title', 'insight', 'analogy', 'action', 'tradeoff', 'mistake', 'advantages', 'interview']) {
      assert.ok(topic[field].en.trim(), `${topic.id}.${field}.en is required`)
      assert.ok(topic[field].bn.trim(), `${topic.id}.${field}.bn is required`)
    }
    assert.equal(topic.objectives.length, 3)
    assert.equal(topic.exam.length, 15)
    assert.equal(new Set(topic.exam.map((question) => question.id)).size, 15)
    for (const question of topic.exam) {
      assert.ok(question.prompt.en && question.prompt.bn, `${topic.id} question prompt must be bilingual`)
      assert.ok(question.explanation.en && question.explanation.bn, `${topic.id} explanation must be bilingual`)
      assert.ok(question.correct.length >= 1)
      assert.ok(question.correct.every((id) => question.options.some((option) => option.id === id)), `${topic.id} has a correct id with no matching option`)
      assert.ok(question.options.every((option) => option.text.en && option.text.bn), `${topic.id} options must be bilingual`)
      assert.equal(new Set(question.options.map((option) => option.text.en)).size, question.options.length, `${topic.id}.${question.id} has duplicate options`)
    }
  }
})

test('Kubernetes command tables are bilingual and carry a command', () => {
  for (const topic of k8sTopics) {
    for (const row of topic.complexity) {
      assert.ok(row.op.en && row.op.bn, `${topic.id} command label must be bilingual`)
      assert.ok(String(row.value).trim(), `${topic.id} command row must state a command`)
    }
  }
})

test('Kubernetes hands-on examples are bilingual with real manifests', () => {
  const withExample = k8sTopics.filter((topic) => topic.example)
  assert.ok(withExample.length >= 12, 'the deep course should include many hands-on examples')
  for (const topic of withExample) {
    assert.ok(topic.example.title.en && topic.example.title.bn, `${topic.id} example needs a bilingual title`)
    assert.ok(typeof topic.example.code === 'string' && topic.example.code.trim().length > 0, `${topic.id} example needs code`)
    assert.ok(topic.example.note.en && topic.example.note.bn, `${topic.id} example needs a bilingual note`)
  }
})

test('Kubernetes single-answer exams distribute the correct option across all positions', () => {
  const positions = new Set(k8sTopics.flatMap((topic) => topic.exam.filter((question) => question.type === 'single').map((question) => question.correct[0])))
  assert.deepEqual([...positions].sort(), ['a', 'b', 'c', 'd'])
})

test('Kubernetes guided labs are bilingual with a valid expert choice per stage', () => {
  assert.ok(k8sLabs.length >= 6, 'the deep course should include at least six labs')
  for (const lab of k8sLabs) {
    assert.ok(lab.title.en && lab.title.bn)
    assert.ok(lab.stages.length >= 4)
    for (const stage of lab.stages) {
      assert.ok(stage.question.en && stage.question.bn)
      assert.ok(stage.options.every((option) => option.en && option.bn))
      assert.ok(stage.options[stage.correct], `${stage.id} correct index is out of range`)
    }
  }
})
