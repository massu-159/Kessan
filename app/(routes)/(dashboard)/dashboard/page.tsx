import { redirect } from 'next/navigation'
import Dashboard from '../../../_components/dashboard/dashboard'
import { loginPath } from '../../../_common/constants/path'
import { createClient } from '../../../../utils/supabase/server'

const DashboardPage = async () => {
  const supabase = createClient()

  // セッションの取得
  const {
    data: { user },
  } = await supabase.auth.getUser()

  // 未認証の場合、リダイレクト
  if (!user) {
    redirect(loginPath)
  }

  return <Dashboard />
}

export default DashboardPage
