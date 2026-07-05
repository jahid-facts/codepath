export default function manifest() {
  return {
    name: 'CodePath — System Design, DSA & more',
    short_name: 'CodePath',
    description: 'Bilingual visual lessons, exams, and labs for system design, data structures & algorithms, and more.',
    start_url: '/',
    display: 'standalone',
    background_color: '#fbfaf7',
    theme_color: '#6757df',
    lang: 'en',
    categories: ['education', 'productivity'],
    icons: [{ src: '/favicon.svg', sizes: 'any', type: 'image/svg+xml', purpose: 'any' }],
  }
}
