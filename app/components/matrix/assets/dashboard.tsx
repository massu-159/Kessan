import AssetTotalBarChart from './asset-total-bar-chart'
import { Card, CardBody, CardFooter, Button, Typography } from '../../common'
import AssetTotalPieChart from './asset-total-pie-chart'
import AssetsTable from './total-table'
import ActualVsTarget from '../../dashboard/actual-vs-target'
import AssetCumulativeRateCard from './asset-cumulative-rate-card'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { Database } from '../../../../lib/database.types'


type Assets = {
  date: string | null
  amount: number | null
  FinancialInstitution: {
    name: string | null
  }
}

const AssetDashboard = async () => {
  const supabase = createServerComponentClient<Database>({ cookies })
  const {
    data: { session },
  } = await supabase.auth.getSession()

  let Assets = null
  if (session) {
    // 資産を取得
    const { data: AssetParDate } = await supabase
      .from('Asset')
      .select(`date, amount, FinancialInstitution!inner(name)`)
      .eq('user_id', session.user.id)
      .order('date', { ascending: false })

    Assets = AssetParDate
  }

  const processData = (data: Assets[]) => {
    const processedData:any = {}
    data.forEach((item: Assets) => {
      const { date, amount, FinancialInstitution } = item
      if (date === null || FinancialInstitution.name === null) {
        return
      }
      if (!processedData[date]) {
        processedData[date] = { date }
      }
      processedData[date][FinancialInstitution.name] = amount
    })
    return Object.values(processedData)
  }

  const acountData = processData(Assets)

  // 各日付ごとの資産を計算する関数
  const calcTotalAmountParDate = (Assets: Assets[]) => {
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
          amount: validAmount
        })
      }
    })
    return totalAmountParDate
  }
  const totalAmountParDate = calcTotalAmountParDate(Assets)

  // 直近の合計額と増減率を取得
  const cumulative = {
    amount: totalAmountParDate[0].amount - totalAmountParDate[1].amount,
    rate: Math.floor((totalAmountParDate[0].amount - totalAmountParDate[1].amount) / totalAmountParDate[1].amount * 100)
  }

  return (
    <div className='grid grid-cols-8 gap-6'>
      <div className='col-span-3'>
        <AssetCumulativeRateCard cumulative={cumulative} />
      </div>
      <div className='col-span-3'>
        {/* <ActualVsTarget record={null} goal={null} /> */}
      </div>
      <Card className='col-span-2 bg-[url(/glass-bowl.jpg)] bg-cover bg-center'>
        <CardBody className='h-fit flex justify-center items-center'>
          <Typography variant='h5' className='text-cyan-500 font-bold text-5xl'>
            NEVER GIVE UP
          </Typography>
        </CardBody>
      </Card>
      <div className='col-span-5 pb-2'>
        <Card className=''>
          <CardBody className='w-11/12 h-96'>
            <AssetTotalBarChart data={acountData}></AssetTotalBarChart>
          </CardBody>
        </Card>
      </div>
      <div className='col-span-3 pb-2'>
        <Card>
          <CardBody className='w-full h-96 flex justify-center items-center'>
            <AssetTotalPieChart data={acountData[0]}></AssetTotalPieChart>
          </CardBody>
        </Card>
      </div>
      <div className='col-span-8'>
        <AssetsTable totalAmountParDate={totalAmountParDate}></AssetsTable>
      </div>
    </div>
  )
}

export default AssetDashboard
