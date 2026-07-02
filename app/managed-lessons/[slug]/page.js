import { notFound } from 'next/navigation'
import { getManagedLesson } from '../../../lib/content-store'
import ManagedLesson from './ManagedLesson'
export const dynamic='force-dynamic';export const runtime='nodejs'
export async function generateMetadata({params}){const {slug}=await params;const lesson=getManagedLesson(slug);return lesson?{title:`${lesson.title_en} | SystemPath`,description:lesson.summary_en}:{}}
export default async function ManagedLessonPage({params}){const {slug}=await params;const lesson=getManagedLesson(slug);if(!lesson)notFound();return <ManagedLesson lesson={lesson}/>}
