import LearningApp from '../LearningApp'

export const metadata = {
  title: 'System Design Curriculum | SystemPath',
  description: 'Explore forty bilingual system-design lessons from foundations through production architecture.',
}

export default function LearnPage() {
  return <LearningApp initialView={{ name: 'curriculum' }} />
}
