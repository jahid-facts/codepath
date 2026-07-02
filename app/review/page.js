import LearningApp from '../LearningApp'

export const metadata = { title: 'Smart Review | SystemPath', robots: { index: false, follow: true } }

export default function ReviewPage() {
  return <LearningApp initialView={{ name: 'review' }} />
}
