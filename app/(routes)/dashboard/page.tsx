import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import Dashboard from '../../_components/dashboard/dashboard'
import { Database } from '../../../lib/database.types'
import { loginPath } from '../../_common/constants/path'

const DashboardPage = async () => {
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

  return <Dashboard />
}

export default DashboardPage
