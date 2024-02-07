import { ReactNode, Suspense } from 'react'
import Navigation from '../../_components/navigation'
import Content from '../../_components/content'
import SupabaseListener from '../../_components/supabase-listener'
import Loading from '../loading'
import { createClient } from '../../../utils/supabase/server'

export default async function Dashboardlayout({
  children,
}: {
  children: ReactNode
}) {
  const supabase = createClient()

  // セッションの取得
  const {
    data: { user },
  } = await supabase.auth.getUser()

  // プロフィールの取得
  let profile = null

  if (user) {
    const { data: currentProfile } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single()

    profile = currentProfile

    // メールアドレスを変更した場合、プロフィールを更新
    if (currentProfile && currentProfile.email !== user.email) {
      // 表示するメールアドレスを更新
      const { data: updatedProfile } = await supabase
        .from('profiles')
        .update({ email: user.email })
        .match({ id: user.id })
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
          poster='/bg.webp'
          className='fixed inset-0 -z-10 w-screen h-screen object-cover blur-xl'
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
