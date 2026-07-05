import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { ADMIN_COOKIE, verifyAdminSession } from '../../lib/admin-auth'
import { getAnalyticsDashboard } from '../../lib/analytics'
import AdminDashboard from './AdminDashboard'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'
export const metadata = { title: 'Analytics | CodePath Admin', robots: { index: false, follow: false } }

export default async function AdminPage() {
  const cookieStore = await cookies()
  if (!verifyAdminSession(cookieStore.get(ADMIN_COOKIE)?.value)) redirect('/admin/login')
  return <AdminDashboard data={getAnalyticsDashboard()} />
}
