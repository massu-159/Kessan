import { redirect } from 'next/navigation'
import ResetPassword from '../../../_components/auth/reset-password'
import { dashboardPath } from '../../../_common/constants/path'
import { createClient } from '../../../../utils/supabase/server'

// パスワードリセットページ
const ResetPasswordPage = async () => {
  const supabase = createClient()

  // セッションの取得
  const {
    data: { user },
  } = await supabase.auth.getUser()

  // 認証している場合、リダイレクト
  if (user) {
    redirect(dashboardPath)
  }

  return <ResetPassword />
}

export default ResetPasswordPage
