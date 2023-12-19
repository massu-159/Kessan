import TotalBarChart from './total-bar-chart'
import { Card, CardBody, CardFooter, Button, Typography } from '../common'
import TotalPieChart from './total-pie-chart'
import AcountCard from './acount-card'
import CumulativeRateCard from './cumulative-rate-card'
import ActualVsTarget from './actual-vs-target'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { Database } from '../../../lib/database.types'
import Link from 'next/link'
import { Key } from 'react'
import { financePath, totalAssetsPath } from '../../_common/constants/path'

type Assets = {
  date: string | null
  amount: number | null
  FinancialInstitution: {
    name: string | null
    usage: string | null
  }
}

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
    const { data: AssetParFinancialInstitution }: any = await supabase
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
  const processData = (data: any) => {
    const processedData: any = {}
    data.forEach((item: Assets) => {
      const { date, amount, FinancialInstitution } = item
      if (date === null || FinancialInstitution.name === null) {
        return
      }
      if (!processedData[date]) {
        processedData[date] = { date }
      }
      processedData[date].total = (processedData[date].total || 0) + amount
      processedData[date][FinancialInstitution.name] = amount
    })
    return Object.values(processedData)
  }

  const acountData = processData(Assets)

  // 各日付ごとの資産合計を計算する関数
  const calcTotalAmountParDate = (Assets: any) => {
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
        <ActualVsTarget goal={goal} record={totalAmountParDate[0]} />
      </div>
      <Card className='col-span-2 bg-[url(/sneaker.jpg)] bg-cover'>
        <CardBody className='h-fit flex justify-center items-center'>
          <Typography variant='h5' className='text-cyan-500 font-bold text-7xl'>
            JUST DO IT
          </Typography>
        </CardBody>
      </Card>
      <div className='col-span-5 pb-2'>
        {Assets && acountData.length > 1 ? (
          <Card className=''>
            <CardBody className='w-11/12 h-96'>
              <TotalBarChart data={acountData}></TotalBarChart>
            </CardBody>
            <CardFooter className='pt-0 text-end'>
              <Link href={totalAssetsPath}>
                <Button color='cyan' variant='text'>
                  overview →
                </Button>
              </Link>
            </CardFooter>
          </Card>
        ) : (
          <Card className=''>
            <CardBody className='h-96 flex justify-center items-center bg-[url(/total-bar-chart-blur.png)] bg-center bg-cover'>
              <Typography
                variant='h5'
                className='text-blue-gray-800 font-bold text-7xl'
              >
                No Data
              </Typography>
            </CardBody>
            <CardFooter className='pt-0 text-center'>
              <Link href={financePath}>
                <Button color='cyan' variant='gradient'>
                  登録する →
                </Button>
              </Link>
            </CardFooter>
          </Card>
        )}
      </div>
      <div className='col-span-3 pb-2'>
        {Assets && acountData.length > 1 ? (
          <Card>
            <CardBody className='w-full h-96 flex justify-center items-center'>
              <TotalPieChart data={acountData[0]}></TotalPieChart>
            </CardBody>
            <CardFooter className='pt-0 text-end'>
              <Link href={totalAssetsPath}>
                <Button color='cyan' variant='text'>
                  overview →
                </Button>
              </Link>
            </CardFooter>
          </Card>
        ) : (
          <Card className=''>
            <CardBody className='h-96 flex justify-center items-center bg-[url(/pie-chart-blur.png)] bg-center bg-cover'>
              <Typography
                variant='h5'
                className='text-blue-gray-800 font-bold text-7xl'
              >
                No Data
              </Typography>
            </CardBody>
            <CardFooter className='pt-0 text-center'>
              <Link href={financePath}>
                <Button color='cyan' variant='gradient'>
                  登録する →
                </Button>
              </Link>
            </CardFooter>
          </Card>
        )}
      </div>
      {assetsParAcount?.map(
        (acount: { id: Key | null | undefined }, i: any) => (
          <div className='col-span-2' key={acount.id}>
            <AcountCard acount={acount} index={i} />
          </div>
        )
      )}
    </div>
  )
}

export default Dashboard
