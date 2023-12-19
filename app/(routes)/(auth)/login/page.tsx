import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { Database } from '../../../../lib/database.types'
import { redirect } from 'next/navigation'
import Login from '../../../_components/login'
import { dashboardPath } from '../../../_common/constants/path'

const LoginPage = async () => {
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
  return <Login />
}

export default LoginPage
