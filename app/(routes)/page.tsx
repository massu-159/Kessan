import { redirect } from 'next/navigation'
import LoginPage from './(auth)/login/page'
import DashboardPage from './(dashboard)/dashboard/page'
import { dashboardPath } from '../_common/constants/path'
import { createClient } from '../../utils/supabase/server'

const Home = async () => {
  const supabase = createClient()

  // セッションの取得
  const {
    data: { user },
  } = await supabase.auth.getUser()

  // 認証している場合、リダイレクト
  if (user) {
    redirect(dashboardPath)
  }

  return <div>{user ? <DashboardPage /> : <LoginPage />}</div>
}

export default Home
