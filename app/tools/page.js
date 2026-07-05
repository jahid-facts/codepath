import LearningApp from '../LearningApp'

export const metadata = {
  title: 'Tools | CodePath',
  description: 'Practice system design with an interactive architecture simulator, guided design labs, and a personalized review center.',
}

export default function ToolsPage() {
  return <LearningApp initialView={{ name: 'tools' }} />
}
