import LearningApp from '../LearningApp'

export const metadata = {
  title: 'Course catalog | CodePath',
  description: 'Browse every course — System Design, Data Structures & Algorithms, and more on the way.',
}

export default function CoursesPage() {
  return <LearningApp initialView={{ name: 'catalog' }} />
}
