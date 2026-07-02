import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { ADMIN_COOKIE, verifyAdminSession } from '../../../../lib/admin-auth'
import { deleteManagedLesson, getContentAudit, listLessonVersions, listManagedLessons, rollbackManagedLesson, saveManagedLesson } from '../../../../lib/content-store'

export const runtime = 'nodejs'
async function authorized(){const store=await cookies();return verifyAdminSession(store.get(ADMIN_COOKIE)?.value)}

export async function GET(request){
  if(!await authorized())return NextResponse.json({error:'Unauthorized'},{status:401})
  const slug=new URL(request.url).searchParams.get('slug')
  return NextResponse.json(slug?{versions:listLessonVersions(slug),audit:getContentAudit(slug)}:{lessons:listManagedLessons()},{headers:{'Cache-Control':'no-store'}})
}

export async function POST(request){
  if(!await authorized())return NextResponse.json({error:'Unauthorized'},{status:401})
  try{
    const body=await request.json()
    const result=body.action==='rollback'?rollbackManagedLesson(body.slug,body.version):saveManagedLesson(body)
    return NextResponse.json(result)
  }catch(error){return NextResponse.json({error:error.message||'Unable to save lesson',validation:error.validation||null},{status:400})}
}

export async function DELETE(request){
  if(!await authorized())return NextResponse.json({error:'Unauthorized'},{status:401})
  const slug=new URL(request.url).searchParams.get('slug')||''
  return NextResponse.json({deleted:deleteManagedLesson(slug)})
}
