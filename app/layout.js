import './globals.css'

export const metadata = {
  applicationName: 'SystemPath',
  title: 'SystemPath | System Design in Bangla & English',
  description:
    'Learn system design from fundamentals to practical interview architectures with bilingual lessons, diagrams, exams, labs, and a simulator.',
  keywords: ['system design', 'architecture', 'interview prep', 'bangla', 'scalability', 'distributed systems'],
  manifest: '/manifest.webmanifest',
  robots: { index: true, follow: true },
  openGraph: {
    title: 'SystemPath | Learn system design visually',
    description:
      'Forty bilingual lessons with visual architecture diagrams, exams, guided labs, and an interactive capacity simulator.',
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
