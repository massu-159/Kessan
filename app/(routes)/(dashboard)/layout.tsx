import { ReactNode, Suspense } from 'react'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { Database } from '../../../lib/database.types'
import { cookies } from 'next/headers'
import Navigation from '../../_components/navigation'
import Content from '../../_components/content'
import SupabaseListener from '../../_components/supabase-listener'
import Loading from '../loading'

export default async function Dashboardlayout({
  children,
}: {
  children: ReactNode
}) {
  const supabase = createServerComponentClient<Database>({
    cookies,
  })

  // セッションの取得
  const {
    data: { session },
  } = await supabase.auth.getSession()

  // プロフィールの取得
  let profile = null

  if (session) {
    const { data: currentProfile } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', session.user.id)
      .single()

    profile = currentProfile

    // メールアドレスを変更した場合、プロフィールを更新
    if (currentProfile && currentProfile.email !== session.user.email) {
      // 表示するメールアドレスを更新
      const { data: updatedProfile } = await supabase
        .from('profiles')
        .update({ email: session.user.email })
        .match({ id: session.user.id })
        .select('*')
        .single()

      profile = updatedProfile
    }
  }
  return (
    <div className='flex'>
      <div className='flex-[1_1_22%] max-w-[16rem]'>
        <Suspense fallback={<Loading />}>
          <SupabaseListener />
        </Suspense>
      </div>
      <div className='flex-[1_1_78%] bg-opacity-0 w-screen'>
        <video
          src='/bg.mp4'
          className='fixed inset-0 -z-10 w-screen h-screen object-cover'
          loop
          autoPlay
          muted
        ></video>
        <div className='flex flex-col h-full'>
          <Navigation profile={profile}></Navigation>
          <Content>{children}</Content>
        </div>
      </div>
    </div>
  )
}
