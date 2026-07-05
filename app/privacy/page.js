export const metadata = {
  title: 'Privacy Policy | CodePath',
  description: 'How CodePath stores local learning progress and optional technical visit analytics.',
}

export default function PrivacyPage() {
  return <main className="legal-page">
    <a className="legal-brand" href="/"><span>C</span><strong>CodePath</strong></a>
    <p className="eyebrow">Privacy · গোপনীয়তা</p>
    <h1>Privacy policy</h1>
    <p className="legal-lead">CodePath is designed for account-free learning. Your course progress stays on your device, and visit analytics are collected only after you choose to allow them.</p>

    <section><h2>Learning data stored locally</h2><p>Language, completed lessons, bookmarks, notes, exam attempts, lab decisions, onboarding preferences, and simulator settings are stored in your browser’s local storage. They are not sent to the analytics server. You can export or erase them from the learner profile.</p></section>
    <section><h2>Optional technical analytics</h2><p>If you allow analytics, CodePath records one visit per browser session. It may include the server-observed IP address, visitor and session identifiers, browser and operating system, inferred device category, language, timezone, screen size, entry path, referrer, and visit time. We use it for aggregate product operations and troubleshooting—not advertising or learner profiling.</p></section>
    <section><h2>Consent and deletion</h2><p>You may decline analytics without losing any course feature. Change the setting anytime from the learner profile. “Delete my analytics” removes records connected to that browser visitor identifier, clears analytics identifiers, and disables future collection. Browser Do Not Track is also respected.</p></section>
    <section><h2>Retention and security</h2><p>Visit records are retained for the server-configured period, 90 days by default. The analytics dashboard is protected by an HTTP-only signed administrator session. IP addresses are masked by default in the dashboard, and production deployments must use HTTPS and protected persistent storage.</p></section>
    <section><h2>Bangla summary</h2><p>আপনার পাঠের অগ্রগতি, নোট ও পরীক্ষার ফল শুধু ব্রাউজারে থাকে। আপনার অনুমতি ছাড়া টেকনিক্যাল ভিজিট অ্যানালিটিক্স সংগ্রহ করা হয় না। প্রোফাইল থেকে অ্যানালিটিক্স বন্ধ বা নিজের রেকর্ড মুছে দিতে পারবেন।</p></section>
    <p className="legal-updated">Effective: 30 June 2026 · This policy should be reviewed with qualified counsel before serving additional regulated jurisdictions.</p>
    <a className="primary-button" href="/">← Return to CodePath</a>
  </main>
}
