export const MANAGED_DIAGRAMS = ['request','loadbalancer','cdn','cache','database','queue','sharding','url','chat','feed','video']
export const COURSE_MODULES = ['foundations','components','distributed','production','practical','mastery']

const localized = (value) => value && typeof value.en === 'string' && value.en.trim() && typeof value.bn === 'string' && value.bn.trim()

export function parseQuiz(value) {
  if (Array.isArray(value)) return value
  if (typeof value !== 'string' || !value.trim()) return []
  try { const parsed = JSON.parse(value); return Array.isArray(parsed) ? parsed : [] } catch { return null }
}

export function validateManagedLesson(input) {
  const errors = []
  const warnings = []
  const publishing = input.status === 'published'
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(input.slug || '')) errors.push('Slug must use lowercase letters, numbers, and hyphens.')
  if (!COURSE_MODULES.includes(input.moduleId)) errors.push('Choose a valid course module.')
  for (const [label, value] of [['English title',input.titleEn],['Bangla title',input.titleBn],['English body',input.bodyEn],['Bangla body',input.bodyBn]]) if (!String(value || '').trim()) errors.push(`${label} is required.`)
  if (!MANAGED_DIAGRAMS.includes(input.diagramKind)) errors.push('Choose a supported architecture diagram.')
  if (publishing && String(input.bodyEn || '').trim().length < 200) errors.push('Published English content must contain at least 200 characters.')
  if (publishing && String(input.bodyBn || '').trim().length < 200) errors.push('Published Bangla content must contain at least 200 characters.')
  if (publishing && !input.banglaReviewed) errors.push('A human Bangla-language review is required before publishing.')
  if (publishing && !input.technicalReviewed) errors.push('A human technical review is required before publishing.')
  const quiz = parseQuiz(input.quizJson)
  if (quiz === null) errors.push('Exam JSON is not valid JSON.')
  if (publishing && quiz?.length !== 5) errors.push('Published lessons require exactly five exam questions.')
  for (const [index, question] of (quiz || []).entries()) {
    if (!localized(question.prompt)) errors.push(`Question ${index + 1} needs English and Bangla prompts.`)
    if (!localized(question.explanation)) errors.push(`Question ${index + 1} needs an English and Bangla explanation.`)
    if (!Array.isArray(question.options) || question.options.length < 2 || !question.options.every(localized)) errors.push(`Question ${index + 1} needs at least two bilingual options.`)
    const correct = Array.isArray(question.correct) ? question.correct : []
    if (!correct.length || correct.some((choice) => !Number.isInteger(choice) || choice < 0 || choice >= (question.options?.length || 0))) errors.push(`Question ${index + 1} has invalid correct-option indexes.`)
  }
  if (!String(input.summaryEn || '').trim() || !String(input.summaryBn || '').trim()) warnings.push('Add both summaries for stronger discovery and metadata.')
  return { valid: errors.length === 0, errors, warnings, quiz: quiz || [] }
}

export const quizTemplate = [1,2,3,4,5].map((number) => ({
  type: 'single',
  prompt: { en: `Question ${number}`, bn: `প্রশ্ন ${number}` },
  options: [{ en: 'Correct option', bn: 'সঠিক উত্তর' }, { en: 'Alternative option', bn: 'বিকল্প উত্তর' }],
  correct: [0],
  explanation: { en: 'Explain why this option is correct.', bn: 'এই উত্তরটি কেন সঠিক তা ব্যাখ্যা করুন।' },
}))
