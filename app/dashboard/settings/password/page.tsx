import { cookies } from 'next/headers'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { redirect } from 'next/navigation'
import Password from '../../../_components/password'
import type { Database } from '../../../../lib/database.types'
import { loginPath } from '../../../_common/constants/path'

// パスワード変更ページ
const PasswordPage = async () => {
  const supabase = createServerComponentClient<Database>({
    cookies,
  })

  // セッションの取得
  const {
    data: { session },
  } = await supabase.auth.getSession()

  // 未認証の場合、リダイレクト
  if (!session) {
    redirect(loginPath)
  }

  return <Password />
}

export default PasswordPage
