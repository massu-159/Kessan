import AssetsTable from './sections/total-table'
import AssetCumulativeRateCard from './sections/asset-cumulative-rate-card'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { Database } from '../../../lib/database.types'
import AssetActualVsTarget from './sections/asset-actual-vs-target'
import BannerCard from './sections/banner-card'
import AssetNoDataPieChart from './sections/asset-no-data-pie-chart'
import AssetTotalPieChartCard from './sections/asset-total-pie-chart-card'
import AssetNoDataBarChart from './sections/asset-no-data-bar-chart'
import AssetTotalBarChartCard from './sections/asset-total-bar-chart-card'
import { ProcessedData } from '../../_common/types/ProcessedData'
import { AssetsWithoutUsage } from '../../_common/types/AssetsWithoutUsage'
import { ParFinancialInstitutionAsset } from '../../_common/types/AssetParFinancialInstitution'

/**
 * 資産ダッシュボード
 */
const TotalAssetDashboard = async () => {
  const supabase = createServerComponentClient<Database>({ cookies })
  const {
    data: { session },
  } = await supabase.auth.getSession()

  let Assets = null
  let goal = null
  if (session) {
    // 資産を取得
    const { data: AssetParDate } = await supabase
      .from('Asset')
      .select(`date, amount, FinancialInstitution!inner(name)`)
      .eq('user_id', session.user.id)
      .order('date', { ascending: false })

    // 目標を取得
    const { data: currentGoal } = await supabase
      .from('Goal')
      .select('*')
      .eq('user_id', session.user.id)
      .order('created_at', { ascending: false })
      .single()

    goal = currentGoal
    Assets = AssetParDate
  }

  const processData = (data: AssetsWithoutUsage[] | null) => {
    if (!data) {
      return []
    }
    const processedData: Record<string, ProcessedData> = {}
    data.forEach((item: AssetsWithoutUsage) => {
      const { date, amount, FinancialInstitution } = item
      if (
        date === null ||
        amount === null ||
        FinancialInstitution === null ||
        FinancialInstitution.name === null
      ) {
        return
      }
      if (!processedData[date]) {
        processedData[date] = { date, total: 0 }
      }
      processedData[date].total = (processedData[date].total || 0) + amount
      processedData[date][FinancialInstitution.name] = amount
    })
    return Object.values(processedData)
  }

  const acountData = processData(Assets)

  // 各日付ごとの資産合計を計算する関数
  const calcTotalAmountParDate = (
    Assets: ParFinancialInstitutionAsset[] | null
  ) => {
    if (!Assets) {
      return []
    }
    const totalAmountParDate: {
      date: string
      amount: number
    }[] = []

    Assets.forEach((as: ParFinancialInstitutionAsset) => {
      // 日付がない場合は計算しない
      if (!as.date) {
        return
      }
      // 金額がない場合は0として計算する
      const validAmount = as.amount ? as.amount : 0

      const existingRecord = totalAmountParDate.find(
        (record) => record.date === as.date
      )
      if (existingRecord) {
        existingRecord.amount += validAmount
      } else {
        totalAmountParDate.push({
          date: as.date,
          amount: validAmount,
        })
      }
    })
    return totalAmountParDate
  }
  const totalAmountParDate = calcTotalAmountParDate(Assets)

  // 直近の合計額と増減率を取得
  const cumulative = {
    amount:
      Assets && totalAmountParDate.length > 1
        ? totalAmountParDate[0]?.amount - totalAmountParDate[1]?.amount
        : Assets && totalAmountParDate.length === 1
        ? totalAmountParDate[0]?.amount
        : null,
    rate:
      Assets && totalAmountParDate.length > 1
        ? Math.floor(
            ((totalAmountParDate[0]?.amount - totalAmountParDate[1]?.amount) /
              totalAmountParDate[1]?.amount) *
              100
          )
        : Assets && totalAmountParDate.length === 1
        ? 0
        : null,
  }

  return (
    <div className='grid grid-cols-8 gap-6'>
      <div className='col-span-3'>
        <AssetCumulativeRateCard cumulative={cumulative} />
      </div>
      <div className='col-span-3'>
        {!goal || goal.amount === null ? (
          <></>
        ) : (
          <AssetActualVsTarget
            record={totalAmountParDate[0]}
            goal={goal}
            userId={session?.user.id}
          />
        )}
      </div>
      <div className='col-span-2 relative'>
        <BannerCard />
      </div>
      <div className='col-span-3 pb-2'>
        {Assets && acountData.length > 1 ? (
          <AssetTotalPieChartCard data={acountData[0]} />
        ) : (
          <AssetNoDataPieChart />
        )}
      </div>
      <div className='col-span-5 pb-2'>
        {Assets && acountData.length > 1 ? (
          <AssetTotalBarChartCard data={acountData} />
        ) : (
          <AssetNoDataBarChart />
        )}
      </div>

      <div className='col-span-8'>
        <AssetsTable totalAmountParDate={totalAmountParDate} />
      </div>
    </div>
  )
}

export default TotalAssetDashboard
