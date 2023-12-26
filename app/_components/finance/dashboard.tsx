import FinanceBarChart from './parts/bar-chart'
import { Card, CardBody, Typography } from '../common'
import AccountCard from './sections/account-card'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { Database } from '../../../lib/database.types'
import AccountTable from './sections/account-table'
import AccountAddButton from './parts/account-add-button'
import AccountCardDefault from './sections/account-card-default'
import { FinancialInstitution } from '../../_common/types/FinancialInstitution'
import { AssetParFinancialInstitution } from '../../_common/types/AssetParFinancialInstitution'
import AccountCardNoDataDefault from './sections/account-card-no-data-default'
import AccountNoDataBarChart from './sections/account-no-data-bar-chart'
import FinanceBarChartCard from './sections/finance-bar-chart-card'

/**
 * ファイナンスダッシュボード
 */
const FinanceDashboard = async () => {
  const supabase = createServerComponentClient<Database>({ cookies })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  let financialAcounts: FinancialInstitution[] | null = []
  let Assets: AssetParFinancialInstitution[] | null = []

  if (session) {
    // 金融機関・資産を取得
    const { data: AssetParFinancialInstitution } = await supabase
      .from('FinancialInstitution')
      .select(`name, usage, Asset!inner(date, amount)`)
      .eq('user_id', session.user.id)
      .order('date', {
        foreignTable: 'Asset',
        ascending: false,
      })

    // 金融機関のみ取得
    const { data: FinancialInstitution } = await supabase
      .from('FinancialInstitution')
      .select(`name, usage`)
      .eq('user_id', session.user.id)
      .order('created_at', { ascending: false })

    Assets = AssetParFinancialInstitution
    financialAcounts = FinancialInstitution
  }

  // TODO null の時と空の時の処理を追加する

  return (
    <div className='grid grid-cols-8 gap-4'>
      {(!financialAcounts || financialAcounts?.length < 0) &&
      (!Assets || Assets?.length < 0) ? (
        <>
          <div className='col-span-4 pb-2'>
            <AccountCardDefault />
            <AccountCardNoDataDefault />
          </div>
          <div className='col-span-4 pb-2 max-h-96'>
            {Assets?.map((asset, i: number) => (
              <AccountTable
                tableRows={asset.Asset}
                name={asset.name}
                userId={session?.user.id}
                key={i}
              />
            ))}
          </div>
        </>
      ) : financialAcounts?.length === 0 && Assets?.length === 0 ? (
        <>
          {financialAcounts?.map((account, i: number) => (
            <>
              <div className='col-span-4 pb-2' key={i}>
                <AccountCard
                  account={account}
                  userId={session?.user.id}
                  index={i}
                />
                <AccountNoDataBarChart />
              </div>
              <div className='col-span-4 pb-2 max-h-96'></div>
            </>
          ))}
        </>
      ) : (
        <>
          {financialAcounts &&
            financialAcounts.length > 0 &&
            Assets &&
            Assets.length > 0 && (
              <>
                {financialAcounts?.map((acount, i: number) => {
                  // 金融機関名で絞り込み
                  const result = Assets?.filter(
                    (item) => item.name === acount.name
                  )

                  return (
                    <>
                      <div className='col-span-4 pb-2' key={i}>
                        <AccountCard
                          account={acount}
                          userId={session?.user.id}
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
                        {result && result.length > 0
                          ? result.map((asset) => (
                              <AccountTable
                                tableRows={asset.Asset}
                                name={asset.name}
                                userId={session?.user.id}
                                key={asset.name}
                              />
                            ))
                          : null}
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
          <AccountAddButton userId={session?.user.id} />
        </Card>
      </div>
    </div>
  )
}

export default FinanceDashboard
