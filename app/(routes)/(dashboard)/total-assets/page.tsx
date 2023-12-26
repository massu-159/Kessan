import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { Database } from '../../../../lib/database.types'
import { cookies } from 'next/headers'
import TotalAssetDashboard from '../../../_components/total-assets/dashboard'
import { redirect } from 'next/navigation'
import { loginPath } from '../../../_common/constants/path'

const AssetsPage = async () => {
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

  return <TotalAssetDashboard></TotalAssetDashboard>
}

export default AssetsPage
