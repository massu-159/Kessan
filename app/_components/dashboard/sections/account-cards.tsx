import { redirect } from 'next/navigation'
import { createClient } from '../../../../utils/supabase/server'
import { getAssetPerFinancialInstitution } from '../../../api/asset/fetcher'
import AccountCard from '../parts/account-card'

/**
 * アカウントカード
 */
const AccountCards = async () => {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  // ログインしていない場合はリダイレクト
  if (!user || !user.id) {
    return redirect('/login')
  }

  // 金融機関ごとの資産を取得
  const AssetParFinancialInstitution = await getAssetPerFinancialInstitution(user.id)

  return (
    <>
      {AssetParFinancialInstitution?.map((account, i) => (
        <div className='col-span-2' key={account.name}>
          <AccountCard account={account} index={i} />
        </div>
      ))}
    </>
  )
}

export default AccountCards
