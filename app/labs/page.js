import LearningApp from '../LearningApp'

export const metadata = { title: 'System Design Labs | SystemPath', description: 'Practise architecture decisions in guided bilingual design labs.' }

export default function LabsPage() {
  return <LearningApp initialView={{ name: 'labs' }} />
}
