import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { Database } from '../../../../lib/database.types'
import { cookies } from 'next/headers'
import AssetDashboard from '../../../components/matrix/assets/dashboard'
import { redirect } from 'next/navigation'

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
    redirect('/auth/login')
  }

  return <AssetDashboard></AssetDashboard>
}

export default AssetsPage
