import { notFound } from 'next/navigation'
import LearningApp from '../../LearningApp'
import { topics } from '../../data'

export function generateStaticParams() {
  return topics.map((topic) => ({ topicId: topic.id }))
}

export async function generateMetadata({ params }) {
  const { topicId } = await params
  const topic = topics.find((item) => item.id === topicId)
  return topic ? { title: `${topic.title.en} Exam | SystemPath`, robots: { index: false, follow: true } } : {}
}

export default async function ExamRoute({ params }) {
  const { topicId } = await params
  if (!topics.some((topic) => topic.id === topicId)) notFound()
  return <LearningApp initialView={{ name: 'exam', topicId }} />
}
