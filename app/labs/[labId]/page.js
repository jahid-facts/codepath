import { notFound } from 'next/navigation'
import LearningApp from '../../LearningApp'
import { labs } from '../../data'

export function generateStaticParams() {
  return labs.map((lab) => ({ labId: lab.id }))
}

export async function generateMetadata({ params }) {
  const { labId } = await params
  const lab = labs.find((item) => item.id === labId)
  return lab ? { title: `${lab.title.en} | SystemPath`, description: lab.subtitle.en } : {}
}

export default async function LabRoute({ params }) {
  const { labId } = await params
  if (!labs.some((lab) => lab.id === labId)) notFound()
  return <LearningApp initialView={{ name: 'labs', labId }} />
}
