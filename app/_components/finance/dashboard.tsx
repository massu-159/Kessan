import FinanceBarChart from './bar-chart'
import { Card, CardBody, CardFooter, Button, Typography } from '../common'
import AcountCard from './acount-card'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { Database } from '../../../lib/database.types'
import AcountTable from './acount-table'
import AcountAddButton from './acount-add-button'
import AcountCardDefault from './acount-card-default'

const FinanceDashboard = async () => {
  const supabase = createServerComponentClient<Database>({ cookies })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  let financialAcounts: any[] = []
  let Assets: any[] = []

  if (session) {
    // 金融機関・資産を取得
    const { data: AssetParFinancialInstitution }: { data: any | null } =
      await supabase
        .from('FinancialInstitution')
        .select(`name, usage, Asset!inner(date, amount)`)
        .eq('user_id', session.user.id)
        .order('date', {
          foreignTable: 'Asset',
          ascending: false,
        })

    // 金融機関のみ取得
    const { data: FinancialInstitution }: { data: any | null } = await supabase
      .from('FinancialInstitution')
      .select(`name, usage`)
      .eq('user_id', session.user.id)
      .order('created_at', { ascending: false })

    Assets = AssetParFinancialInstitution
    financialAcounts = FinancialInstitution
  }

  return (
    <div className='grid grid-cols-8 gap-4'>
      {financialAcounts?.length === 0 && Assets.length === 0 ? (
        <>
          <div className='col-span-4 pb-2'>
            <AcountCardDefault />
            <Card className='bg-opacity-0 shadow-none bg-[url(/acount-bar-chart-blur.png)] bg-center bg-cover'>
              <CardBody className='w-full h-60 flex justify-center items-center'>
                <Typography
                  variant='h5'
                  className='text-blue-gray-800 font-bold text-6xl'
                >
                  No Data
                </Typography>
              </CardBody>
            </Card>
          </div>
          <div className='col-span-4 pb-2 max-h-96'>
            {Assets.map((asset: any, i: number) => (
              <AcountTable
                tableRows={asset.Asset}
                name={asset.name}
                userId={session?.user.id}
                key={i}
              ></AcountTable>
            ))}
          </div>
        </>
      ) : financialAcounts?.length > 0 && Assets.length === 0 ? (
        <>
          {financialAcounts?.map((acount: any, i: number) => (
            <>
              <div className='col-span-4 pb-2' key={i}>
                <AcountCard
                  acount={acount}
                  userId={session?.user.id}
                  index={i}
                />
                <Card className='bg-opacity-0 shadow-none bg-[url(/acount-bar-chart-blur.png)] bg-center bg-cover'>
                  <CardBody className='w-full h-60 flex justify-center items-center'>
                    <Typography
                      variant='h5'
                      className='text-blue-gray-800 font-bold text-6xl'
                    >
                      No Data
                    </Typography>
                  </CardBody>
                </Card>
              </div>
              <div className='col-span-4 pb-2 max-h-96'></div>
            </>
          ))}
        </>
      ) : (
        <>
          {financialAcounts?.length > 0 && Assets.length > 0 && (
            <>
              {financialAcounts?.map((acount: any, i: number) => {
                // 金融機関名で絞り込み
                const result = Assets?.filter(
                  (item: any) => item.name === acount.name
                )

                return (
                  <>
                    <div className='col-span-4 pb-2' key={i}>
                      <AcountCard
                        acount={acount}
                        userId={session?.user.id}
                        index={i}
                      />
                      {result.length > 0 ? (
                        result.map((asset: any) => (
                          <Card
                            className='bg-opacity-0 shadow-none'
                            key={asset.name}
                          >
                            <CardBody className='w-full h-60'>
                              <FinanceBarChart
                                data={asset.Asset}
                                index={i}
                              ></FinanceBarChart>
                            </CardBody>
                          </Card>
                        ))
                      ) : (
                        <Card className='bg-opacity-0 shadow-none bg-[url(/acount-bar-chart-blur.png)] bg-center bg-cover'>
                          <CardBody className='w-full h-60 flex justify-center items-center'>
                            <Typography
                              variant='h5'
                              className='text-blue-gray-800 font-bold text-6xl'
                            >
                              No Data
                            </Typography>
                          </CardBody>
                        </Card>
                      )}
                    </div>
                    <div className='col-span-4 pb-2 max-h-96'>
                      {result.length > 0
                        ? result.map((asset: any) => (
                            <AcountTable
                              tableRows={asset.Asset}
                              name={asset.name}
                              userId={session?.user.id}
                              key={asset.name}
                            ></AcountTable>
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
          <AcountAddButton userId={session?.user.id}></AcountAddButton>
        </Card>
      </div>
    </div>
  )
}

export default FinanceDashboard
