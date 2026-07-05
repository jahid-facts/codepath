import { cookies } from 'next/headers'
import { notFound, redirect } from 'next/navigation'
import { ADMIN_COOKIE, verifyAdminSession } from '../../../../../lib/admin-auth'
import { getManagedLesson } from '../../../../../lib/content-store'
import ManagedLesson from '../../../../managed-lessons/[slug]/ManagedLesson'

export const dynamic='force-dynamic';export const runtime='nodejs'
export const metadata={title:'Content preview | CodePath Admin',robots:{index:false,follow:false}}
export default async function PreviewPage({params}){const store=await cookies();if(!verifyAdminSession(store.get(ADMIN_COOKIE)?.value))redirect('/admin/login');const{slug}=await params;const lesson=getManagedLesson(slug,{includeDraft:true});if(!lesson)notFound();return <><div className="preview-banner">Private preview · Version {lesson.version} · {lesson.status}</div><ManagedLesson lesson={lesson}/></>}
