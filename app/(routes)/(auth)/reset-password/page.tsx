import { cookies } from 'next/headers'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { redirect } from 'next/navigation'
import ResetPassword from '../../../_components/auth/reset-password'
import type { Database } from '../../../../lib/database.types'
import { dashboardPath } from '../../../_common/constants/path'

// パスワードリセットページ
const ResetPasswordPage = async () => {
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

  return <ResetPassword />
}

export default ResetPasswordPage
