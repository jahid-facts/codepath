import { notFound } from 'next/navigation'
import LearningApp from '../../LearningApp'
import { allTopics as topics } from '../../course-registry'

export function generateStaticParams() {
  return topics.map((topic) => ({ topicId: topic.id }))
}

export async function generateMetadata({ params }) {
  const { topicId } = await params
  const topic = topics.find((item) => item.id === topicId)
  if (!topic) return {}
  return { title: `${topic.title.en} | CodePath`, description: topic.insight.en }
}

export default async function LessonRoute({ params }) {
  const { topicId } = await params
  if (!topics.some((topic) => topic.id === topicId)) notFound()
  return <LearningApp initialView={{ name: 'lesson', topicId }} />
}
