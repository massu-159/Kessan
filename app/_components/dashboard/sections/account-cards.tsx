import { createClient } from '../../../../utils/supabase/server'
import AccountCard from '../parts/account-card'

/**
 * アカウントカード
 */
const AccountCards = async () => {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  let assetsParAcount = null
  if (user) {
    // 金融機関・資産を取得
    const { data: AssetParFinancialInstitution } = await supabase
      .from('FinancialInstitution')
      .select(`name, usage, Asset!inner(date, amount)`)
      .eq('user_id', user.id)
      .order('date', {
        referencedTable: 'Asset',
        ascending: false,
      })

    assetsParAcount = AssetParFinancialInstitution
  }

  return (
    <>
      {assetsParAcount?.map((account, i) => (
        <div className='col-span-2' key={account.name}>
          <AccountCard account={account} index={i} />
        </div>
      ))}
    </>
  )
}

export default AccountCards
