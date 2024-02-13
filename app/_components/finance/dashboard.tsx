import { Card } from '../common'
import AccountCard from './sections/account-card'
import AccountTable from './sections/account-table'
import AccountAddButton from './parts/account-add-button'
import AccountCardDefault from './sections/account-card-default'
import AccountCardNoDataDefault from './sections/account-card-no-data-default'
import AccountNoDataBarChart from './sections/account-no-data-bar-chart'
import FinanceBarChartCard from './sections/finance-bar-chart-card'
import { createClient } from '../../../utils/supabase/server'
import { getAssetPerFinancialInstitution } from '../../api/asset/fetcher'
import { getFinancialInstitution } from '../../api/financial-institution/fetcher'
import { redirect } from 'next/navigation'
import AccountNoDataTable from './sections/account-no-data-table'

/**
 * ファイナンスダッシュボード
 */
const FinanceDashboard = async () => {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  // ログインしていない場合はリダイレクト
  if (!user || !user.id) {
    return redirect('/login')
  }

  // 金融機関ごとの資産を取得
  const AssetParFinancialInstitution = await getAssetPerFinancialInstitution(
    user.id
  )

  // 金融機関のみを取得
  const FinancialInstitution = await getFinancialInstitution(user.id)

  return (
    <div className='grid grid-cols-8 gap-4'>
      {FinancialInstitution.length <= 0 &&
      AssetParFinancialInstitution.length < 0 ? (
        <>
          <div className='col-span-4 pb-2'>
            <AccountCardDefault />
            <AccountCardNoDataDefault />
          </div>
          <div className='col-span-4 pb-2 max-h-96'>
            {AssetParFinancialInstitution?.map((asset, i: number) => (
              <AccountTable
                tableRows={asset.Asset}
                name={asset.name}
                userId={user?.id}
                key={i}
              />
            ))}
          </div>
        </>
      ) : FinancialInstitution.length > 0 &&
        AssetParFinancialInstitution.length === 0 ? (
        <>
          {FinancialInstitution?.map((account, i: number) => (
            <div className='col-span-8 grid grid-cols-8 gap-4' key={i}>
              <div className='col-span-4 pb-2'>
                <AccountCard account={account} userId={user?.id} index={i} />
                <AccountNoDataBarChart />
              </div>
              <div className='col-span-4 pb-2 max-h-96'>
                <AccountNoDataTable />
              </div>
            </div>
          ))}
        </>
      ) : (
        <>
          {FinancialInstitution.length > 0 &&
            AssetParFinancialInstitution.length > 0 && (
              <>
                {FinancialInstitution?.map((acount, i: number) => {
                  // 金融機関名で絞り込み
                  const result = AssetParFinancialInstitution?.filter(
                    (item) => item.name === acount.name
                  )

                  return (
                    <>
                      <div className='col-span-4 pb-2' key={i}>
                        <AccountCard
                          account={acount}
                          userId={user?.id}
                          index={i}
                        />
                        {result && result.length > 0 ? (
                          result.map((asset) => (
                            <FinanceBarChartCard
                              key={asset.name}
                              data={asset.Asset}
                              index={i}
                            />
                          ))
                        ) : (
                          <AccountNoDataBarChart />
                        )}
                      </div>
                      <div className='col-span-4 pb-2 max-h-96'>
                        {result && result.length > 0 ? (
                          result.map((asset) => (
                            <AccountTable
                              tableRows={asset.Asset}
                              name={asset.name}
                              userId={user?.id}
                              key={asset.name}
                            />
                          ))
                        ) : (
                          <AccountNoDataTable />
                        )}
                      </div>
                    </>
                  )
                })}
              </>
            )}
        </>
      )}
      <div className='col-span-8'>
        <Card>
          <AccountAddButton userId={user?.id} />
        </Card>
      </div>
    </div>
  )
}

export default FinanceDashboard
