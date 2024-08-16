import { redirect } from 'next/navigation'
import Logout from '../../../../_components/settings/logout'
import { loginPath } from '../../../../_common/constants/path'
import { createClient } from '../../../../../utils/supabase/server'

// ログアウトページ
const LogoutPage = async () => {
  const supabase = createClient()

  // セッションの取得
  const {
    data: { user },
  } = await supabase.auth.getUser()

  // 未認証の場合、リダイレクト
  if (!user) {
    redirect(loginPath)
  }

  return <Logout />
}

export default LogoutPage
