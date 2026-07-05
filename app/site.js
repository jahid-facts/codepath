import { l } from './data.js'

// Global site identity + author/creator profile shown in the footer.
// Replace the placeholder values below with your real details (and drop a photo
// at public/author.jpg, then set `avatar: '/author.jpg'`).
export const siteName = 'CodePath'

export const author = {
  name: 'Jahid',
  role: l('Creator & Educator', 'নির্মাতা ও শিক্ষক'),
  bio: l('Building free, bilingual, visual courses that make computer science click.', 'বিনামূল্যে দ্বিভাষিক, ভিজ্যুয়াল কোর্স তৈরি করি—যাতে কম্পিউটার সায়েন্স সহজ হয়।'),
  avatar: null,          // e.g. '/author.jpg' — falls back to initials when null
  initials: 'J',
  // Set url to '' to hide a link. id must match an icon in SiteFooter's iconMap.
  links: [
    { id: 'github', label: 'GitHub', url: 'https://github.com/your-username' },
    { id: 'linkedin', label: 'LinkedIn', url: 'https://www.linkedin.com/in/your-username' },
    { id: 'facebook', label: 'Facebook', url: 'https://www.facebook.com/your-username' },
    { id: 'whatsapp', label: 'WhatsApp', url: 'https://wa.me/8801XXXXXXXXX' },
    { id: 'email', label: 'Email', url: 'mailto:4khoop@gmail.com' },
  ],
}
