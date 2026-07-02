import LearningApp from '../LearningApp'

export const metadata = {
  title: 'Case studies | SystemPath',
  description: 'Interview-ready system architectures—URL shorteners, chat, feeds, streaming, payments and more—explained through scale, APIs, data, and failure modes.',
}

export default function CaseStudiesPage() {
  return <LearningApp initialView={{ name: 'cases' }} />
}
