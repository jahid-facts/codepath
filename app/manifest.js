export default function manifest() {
  return {
    name: 'SystemPath — System Design Learning',
    short_name: 'SystemPath',
    description: 'Bilingual visual system-design lessons, exams, labs, and architecture simulator.',
    start_url: '/',
    display: 'standalone',
    background_color: '#fbfaf7',
    theme_color: '#6757df',
    lang: 'en',
    categories: ['education', 'productivity'],
    icons: [{ src: '/favicon.svg', sizes: 'any', type: 'image/svg+xml', purpose: 'any' }],
  }
}
