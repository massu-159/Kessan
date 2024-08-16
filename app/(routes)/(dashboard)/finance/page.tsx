import FinanceDashboard from '../../../_components/finance/dashboard'
import { redirect } from 'next/navigation'
import { loginPath } from '../../../_common/constants/path'
import { createClient } from '../../../../utils/supabase/server'

const FinancePage = async () => {
  const supabase = createClient()

  // セッションの取得
  const {
    data: { user },
  } = await supabase.auth.getUser()

  // 未認証の場合、リダイレクト
  if (!user) {
    redirect(loginPath)
  }

  return <FinanceDashboard />
}

export default FinancePage
