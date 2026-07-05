import './globals.css'

export const metadata = {
  applicationName: 'CodePath',
  title: 'CodePath | System Design, DSA & more in Bangla & English',
  description:
    'Learn system design and data structures & algorithms with bilingual lessons, visual diagrams, exams, and guided labs — more courses on the way.',
  keywords: ['system design', 'data structures', 'algorithms', 'dsa', 'architecture', 'interview prep', 'bangla', 'scalability', 'distributed systems'],
  manifest: '/manifest.webmanifest',
  robots: { index: true, follow: true },
  openGraph: {
    title: 'CodePath | Learn system design & DSA visually',
    description:
      'Bilingual lessons with visual diagrams, exams, and guided labs across System Design and Data Structures & Algorithms.',
    type: 'website',
  },
}

export const viewport = {
  themeColor: '#6757df',
  colorScheme: 'light',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      {/* Browser extensions (Grammarly, WOT, etc.) inject attributes onto <body>
          before React hydrates, causing a benign hydration warning. This ignores
          attribute diffs on <body> only — real mismatches inside the app still warn. */}
      <body suppressHydrationWarning>{children}</body>
    </html>
  )
}
