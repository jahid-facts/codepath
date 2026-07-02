import LearningApp from '../LearningApp'

export const metadata = { title: 'Architecture Simulator | SystemPath', description: 'Explore educational load, cache, replica, latency, and failure estimates.' }

export default function SimulatorPage() {
  return <LearningApp initialView={{ name: 'simulator' }} />
}
