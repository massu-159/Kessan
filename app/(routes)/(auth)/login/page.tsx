import { redirect } from 'next/navigation'
import Login from '../../../_components/auth/login'
import { dashboardPath } from '../../../_common/constants/path'
import { createClient } from '../../../../utils/supabase/server'

const LoginPage = async () => {
  const supabase = createClient()

  // セッションの取得
  const {
    data: { user },
  } = await supabase.auth.getUser()

  // 認証している場合、リダイレクト
  if (user) {
    redirect(dashboardPath)
  }
  return <Login />
}

export default LoginPage
