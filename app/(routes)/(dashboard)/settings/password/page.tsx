import { redirect } from 'next/navigation'
import Password from '../../../../_components/settings/password'
import { loginPath } from '../../../../_common/constants/path'
import { createClient } from '../../../../../utils/supabase/server'

// パスワード変更ページ
const PasswordPage = async () => {
  const supabase = createClient()

  // セッションの取得
  const {
    data: { user },
  } = await supabase.auth.getUser()

  // 未認証の場合、リダイレクト
  if (!user) {
    redirect(loginPath)
  }

  return <Password />
}

export default PasswordPage
