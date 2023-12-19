import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { Database } from '../../lib/database.types'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import LoginPage from './(auth)/login/page'
import DashboardPage from './dashboard/page'
import { dashboardPath } from '../_common/constants/path'

const Home = async () => {
  const supabase = createServerComponentClient<Database>({
    cookies,
  })

  // セッションの取得
  const {
    data: { session },
  } = await supabase.auth.getSession()

  // 認証している場合、リダイレクト
  if (session) {
    redirect(dashboardPath)
  }

  return <div>{session ? <DashboardPage /> : <LoginPage />}</div>
}

export default Home
