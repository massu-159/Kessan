import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { Database } from "../lib/database.types"
import {cookies} from 'next/headers'
import LoginPage from "./auth/login/page"
import Dashboard from "./components/dashboard"
import Navigation from "./components/navigation"
import Content from "./components/content"

const Home = async () => {
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
    <div>
      {session && (
        <div className='flex flex-col flex-1 w-full'>
          <Navigation profile={profile}></Navigation>
          <Content>
            <Dashboard></Dashboard>
          </Content>
        </div>
      )}
      {!session && <LoginPage></LoginPage>}
    </div>
  )
}

export default Home