import AccountCard from './sections/account-card'
import CumulativeRateCard from './sections/cumulative-rate-card'
import ActualVsTargetCard from './sections/actual-vs-target-card'
import TotalBarChartCard from './sections/total-bar-chart-card'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { Database } from '../../../lib/database.types'
import { Assets } from '../../_common/types/Assets'
import { ProcessedData } from '../../_common/types/ProcessedData'
import BarChartNoDataCard from './sections/bar-chart-no-data-card'
import PieChartNoDataCard from './sections/pie-chart-no-data-card'
import BannerCard from './sections/banner-card'
import TotalPieChartCard from './sections/total-pie-chart-card'

/**
 * ダッシュボード
 */
const Dashboard = async () => {
  const supabase = createServerComponentClient<Database>({ cookies })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  let Assets = null
  let goal = null
  let assetsParAcount = null
  if (session) {
    // 資産を取得
    const { data: AssetParDate } = await supabase
      .from('Asset')
      .select(`date, amount, FinancialInstitution!inner (name, usage)`)
      .eq('user_id', session.user.id)
      .order('date', { ascending: false })

    // 目標を取得
    const { data: currentGoal } = await supabase
      .from('Goal')
      .select('*')
      .eq('user_id', session.user.id)
      .order('created_at', { ascending: false })
      .single()

    // 金融機関・資産を取得
    const { data: AssetParFinancialInstitution } = await supabase
      .from('FinancialInstitution')
      .select(`name, usage, Asset!inner(date, amount)`)
      .eq('user_id', session.user.id)
      .order('date', {
        foreignTable: 'Asset',
        ascending: false,
      })

    goal = currentGoal
    Assets = AssetParDate
    assetsParAcount = AssetParFinancialInstitution
  }

  // 資産を日付ごとに整理
  const processData = (data: Assets[] | null) => {
    if (!data) {
      return []
    }
    const processedData: Record<string, ProcessedData> = {}
    data.forEach((item: Assets) => {
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

  const accountData = processData(Assets)

  // 各日付ごとの資産合計を計算する関数
  const calcTotalAmountParDate = (Assets: Assets[] | null) => {
    if (!Assets) {
      return []
    }
    const totalAmountParDate: {
      date: string
      amount: number
    }[] = []

    Assets.forEach((as: Assets) => {
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
    <div className='grid grid-cols-8 gap-4'>
      <div className='col-span-3'>
        <CumulativeRateCard cumulative={cumulative} />
      </div>
      <div className='col-span-3'>
        <ActualVsTargetCard goal={goal} record={totalAmountParDate[0]} />
      </div>
      <div className='col-span-2 relative'>
        <BannerCard />
      </div>
      <div className='col-span-5 pb-2'>
        {Assets && accountData.length > 1 ? (
          <TotalBarChartCard accountData={accountData} />
        ) : (
          <BarChartNoDataCard />
        )}
      </div>
      <div className='col-span-3 pb-2'>
        {Assets && accountData.length > 1 ? (
          <TotalPieChartCard accountData={accountData} />
        ) : (
          <PieChartNoDataCard />
        )}
      </div>
      {assetsParAcount?.map((account, i) => (
        <div className='col-span-2' key={account.name}>
          <AccountCard account={account} index={i} />
        </div>
      ))}
    </div>
  )
}

export default Dashboard
