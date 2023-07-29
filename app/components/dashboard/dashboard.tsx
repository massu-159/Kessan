import TotalBarChart from './total-bar-chart'
import { Card, CardBody, CardFooter, Button, Typography } from '../common'
import TotalPieChart from './total-pie-chart'
import AcountCard from './acount-card'
import CumulativeRateCard from './cumulative-rate-card'
import ActualVsTarget from './actual-vs-target'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { Database } from '../../../lib/database.types'

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
  amount: 1400000,
}

const Dashboard = async () => {
  const supabase = createServerComponentClient<Database>({ cookies })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  let goal = null
  if (session) {
    // 目標テーブルから取得
    const { data: currentGoal } = await supabase
      .from('Goal')
      .select('*')
      .eq('user_id', session.user.id)
      .order('created_at', { ascending: false })
      .single()

    goal = currentGoal
  }

  return (
    <div className='grid grid-cols-8 gap-6'>
      <div className='col-span-3'>
        <CumulativeRateCard cumulative={cumulative} />
      </div>
      <div className='col-span-3'>
        <ActualVsTarget goal={goal} record={record} />
      </div>
      <Card className='col-span-2 bg-[url(/sneaker.jpg)] bg-cover'>
        <CardBody className='h-fit flex justify-center items-center'>
          <Typography variant='h5' className='text-cyan-500 font-bold text-7xl'>
            JUST DO IT
          </Typography>
        </CardBody>
      </Card>
      <div className='col-span-5 pb-2'>
        <Card className=''>
          <CardBody className='w-11/12 h-96'>
            <TotalBarChart></TotalBarChart>
          </CardBody>
          <CardFooter className='pt-0 text-end'>
            <Button color='cyan' variant='text'>
              overview →
            </Button>
          </CardFooter>
        </Card>
      </div>
      <div className='col-span-3 pb-2'>
        <Card>
          <CardBody className='w-full h-96 flex justify-center items-center'>
            <TotalPieChart></TotalPieChart>
          </CardBody>
          <CardFooter className='pt-0 text-end'>
            <Button color='cyan' variant='text'>
              overview →
            </Button>
          </CardFooter>
        </Card>
      </div>
      {acountData.map((acount) => (
        <div className='col-span-2' key={acount.id}>
          <AcountCard acount={acount} />
        </div>
      ))}
    </div>
  )
}

export default Dashboard
