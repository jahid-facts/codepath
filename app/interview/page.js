import LearningApp from '../LearningApp'

export const metadata = {
  title: 'Interview prep | CodePath',
  description: 'A six-step answer framework plus how to frame each topic, the traps to avoid, and quick exams to test yourself.',
}

export default function InterviewPage() {
  return <LearningApp initialView={{ name: 'interview' }} />
}
