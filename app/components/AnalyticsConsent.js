'use client'

export default function AnalyticsConsent({ lang, onAccept, onDecline }) {
  const bn = lang === 'bn'
  return (
    <section className="consent-banner" role="region" aria-label={bn ? 'অ্যানালিটিক্স সম্মতি' : 'Analytics consent'}>
      <span aria-hidden="true">◎</span>
      <div>
        <strong>{bn ? 'আপনার গোপনীয়তা, আপনার সিদ্ধান্ত' : 'Your privacy, your choice'}</strong>
        <p>{bn ? 'শেখার ডেটা এই ব্রাউজারেই থাকে। অনুমতি দিলে আমরা সেবা উন্নত করতে প্রতি সেশনে সীমিত টেকনিক্যাল ভিজিট তথ্য রাখি।' : 'Learning data stays in this browser. With permission, we store limited technical visit data once per session to improve the service.'}</p>
        <a href="/privacy">{bn ? 'গোপনীয়তা নীতি পড়ুন' : 'Read the privacy policy'}</a>
      </div>
      <div className="consent-actions"><button onClick={onDecline}>{bn ? 'প্রত্যাখ্যান' : 'Decline'}</button><button onClick={onAccept}>{bn ? 'অনুমতি দিন' : 'Allow analytics'}</button></div>
    </section>
  )
}
