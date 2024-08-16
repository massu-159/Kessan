import { redirect } from 'next/navigation'
import Email from '../../../../_components/settings/email'
import { loginPath } from '../../../../_common/constants/path'
import { createClient } from '../../../../../utils/supabase/server'

// メールアドレス変更ページ
const EmailPage = async () => {
  const supabase = createClient()

  // セッションの取得
  const {
    data: { user },
  } = await supabase.auth.getUser()

  // 未認証の場合、リダイレクト
  if (!user) {
    redirect(loginPath)
  }

  return <Email email={user.email!} />
}

export default EmailPage
