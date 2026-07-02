import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { ADMIN_COOKIE, verifyAdminSession } from '../../../lib/admin-auth'
import { listManagedLessons } from '../../../lib/content-store'
import ContentEditor from './ContentEditor'
export const dynamic='force-dynamic';export const runtime='nodejs'
export const metadata={title:'Content editor | SystemPath Admin',robots:{index:false,follow:false}}
export default async function ContentPage(){const store=await cookies();if(!verifyAdminSession(store.get(ADMIN_COOKIE)?.value))redirect('/admin/login');return <ContentEditor initialLessons={listManagedLessons()}/>}
