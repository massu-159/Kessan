import FinanceBarChart from './bar-chart'
import { Card, CardBody, CardFooter, Button } from '../../common'
import AcountCard from './acount-card'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { Database } from '../../../../lib/database.types'
import AcountTable from './total-table'

type Acount = {
  id: number
  name: string
  usage: string
  Asset: {
    date: string
    amount: number
  }[]
}

const FinanceDashboard = async () => {
  const supabase = createServerComponentClient<Database>({ cookies })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  let Assets = null

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

    Assets = AssetParFinancialInstitution
  }
  return (
    <div className='grid grid-cols-8 gap-6'>
      {Assets?.map((acount: Acount, i: number) => (
        <>
          <div className='col-span-4 pb-2' key={acount.id}>
            <AcountCard acount={acount} />
            <Card className='bg-opacity-0 shadow-none'>
              <CardBody className='w-full h-60'>
                <FinanceBarChart
                  data={acount.Asset}
                  index={i}
                ></FinanceBarChart>
              </CardBody>
            </Card>
          </div>
          <div className='col-span-4 pb-2 max-h-96'>
            <AcountTable tableRows={acount.Asset}></AcountTable>
          </div>
        </>
      ))}
    </div>
  )
}

export default FinanceDashboard
