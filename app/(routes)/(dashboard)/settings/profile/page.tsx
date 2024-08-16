import { redirect } from 'next/navigation'
import Profile from '../../../../_components/settings/profile'
import { loginPath } from '../../../../_common/constants/path'
import { createClient } from '../../../../../utils/supabase/server'

const ProfilePage = async () => {
  const supabase = createClient()

  // セッションの取得
  const {
    data: { user },
  } = await supabase.auth.getUser()

  // 未認証の場合、リダイレクト
  if (!user) {
    redirect(loginPath)
  }

  return <Profile />
}

export default ProfilePage
