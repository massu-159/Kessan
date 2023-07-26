import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { Database } from '../../../../lib/database.types'
import { cookies } from 'next/headers'
import FinanceDashboard from '../../../components/matrix/finance/dashboard'
import { redirect } from 'next/navigation'

const FinancePage = async () => {
  const supabase = createServerComponentClient<Database>({
    cookies,
  })

  // セッションの取得
  const {
    data: { session },
  } = await supabase.auth.getSession()

  // 未認証の場合、リダイレクト
  if (!session) {
    redirect('/auth/login')
  }

  return <FinanceDashboard></FinanceDashboard>
}

export default FinancePage
