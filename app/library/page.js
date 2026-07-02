import { listManagedLessons } from '../../lib/content-store'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'
export const metadata = { title: 'Published Lesson Library | SystemPath', description: 'Supplemental bilingual system-design lessons published by the SystemPath content team.' }

export default function LibraryPage() {
  const lessons = listManagedLessons({ publishedOnly: true })
  return <main className="library-page"><header><a className="legal-brand" href="/"><span>S</span><strong>SystemPath</strong></a><p className="eyebrow">Supplemental learning</p><h1>Published lesson library</h1><p>New bilingual lessons authored from the protected SystemPath content console.</p></header><div className="library-grid">{lessons.map((lesson) => <a key={lesson.slug} href={`/managed-lessons/${lesson.slug}`}><span>{lesson.module_id}</span><h2>{lesson.title_en}</h2><strong lang="bn">{lesson.title_bn}</strong><p>{lesson.summary_en}</p><b>Open lesson →</b></a>)}{!lessons.length && <section><strong>No supplemental lessons published yet.</strong><p>The complete forty-topic core course remains available in the curriculum.</p><a href="/learn">Explore the core course →</a></section>}</div></main>
}
