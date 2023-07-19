import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { Database } from '../../../lib/database.types'
import { cookies } from 'next/headers'
import Content from '../../components/content'
import Dashboard from '../../components/matrix/assets/dashboard'
import Navigation from '../../components/navigation'

const acountData = [
  {
    id: 1,
    name: 'ゆうちょ銀行',
    role: '生活防衛',
    rate: 12,
  },
  {
    id: 2,
    name: '三菱UFJ銀行',
    role: '給与受取',
    rate: 0,
  },
  {
    id: 3,
    name: '楽天銀行',
    role: '普段使い',
    rate: -3,
  },
  {
    id: 4,
    name: '楽天証券',
    role: '資産運用',
    rate: 15,
  },
]

const cumulative = {
  amount: 600000,
  rate: 12,
}

const record = {
  amount: 2300000,
  rate: 8,
}

const AssetsPage = async () => {
  const supabase = createServerComponentClient<Database>({
    cookies,
  })

  // セッションの取得
  const {
    data: { session },
  } = await supabase.auth.getSession()

  // プロフィールの取得
  let profile = null

  if (session) {
    const { data: currentProfile } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', session.user.id)
      .single()

    profile = currentProfile

    // メールアドレスを変更した場合、プロフィールを更新
    if (currentProfile && currentProfile.email !== session.user.email) {
      // 表示するメールアドレスを更新
      const { data: updatedProfile } = await supabase
        .from('profiles')
        .update({ email: session.user.email })
        .match({ id: session.user.id })
        .select('*')
        .single()

      profile = updatedProfile
    }
  }
  return (
    <div className='flex flex-col h-full'>
      <Navigation profile={profile}></Navigation>
      <Content>
        <Dashboard></Dashboard>
      </Content>
    </div>
  )
}

export default AssetsPage
