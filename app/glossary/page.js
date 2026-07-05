import LearningApp from '../LearningApp'

export const metadata = {
  title: 'Glossary | CodePath',
  description: 'Every core system-design term and concept in one searchable place.',
}

export default function GlossaryPage() {
  return <LearningApp initialView={{ name: 'glossary' }} />
}
