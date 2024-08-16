import TotalAssetDashboard from '../../../_components/total-assets/dashboard'
import { redirect } from 'next/navigation'
import { loginPath } from '../../../_common/constants/path'
import { createClient } from '../../../../utils/supabase/server'

const AssetsPage = async () => {
  const supabase = createClient()

  // セッションの取得
  const {
    data: { user },
  } = await supabase.auth.getUser()

  // 未認証の場合、リダイレクト
  if (!user) {
    redirect(loginPath)
  }

  return <TotalAssetDashboard />
}

export default AssetsPage
