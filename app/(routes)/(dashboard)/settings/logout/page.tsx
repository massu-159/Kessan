import { cookies } from 'next/headers'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { redirect } from 'next/navigation'
import Logout from '../../../../_components/settings/logout'
import type { Database } from '../../../../../lib/database.types'
import { loginPath } from '../../../../_common/constants/path'

// ログアウトページ
const LogoutPage = async () => {
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

  return <Logout />
}

export default LogoutPage
