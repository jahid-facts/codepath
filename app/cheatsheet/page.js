import LearningApp from '../LearningApp'

export const metadata = {
  title: 'Cheatsheet | SystemPath',
  description: 'Every system-design idea in brief: the definition, the design principle, the trade-off, and the common mistake.',
}

export default function CheatsheetPage() {
  return <LearningApp initialView={{ name: 'cheatsheet' }} />
}
