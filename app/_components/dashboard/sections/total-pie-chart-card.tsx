import Link from 'next/link'
import { totalAssetsPath } from '../../../_common/constants/path'
import { Button, CardBody, CardFooter } from '../../common'
import { CustomCard } from '../../ui/custom-card'
import TotalPieChart from '../parts/total-pie-chart'
import { Suspense } from 'react'
import Loading from '../../../(routes)/loading'
import { calcEachAssetPerDate } from '../../../_common/utils/calc'
import { getAssetPerDate } from '../../../api/asset/fetcher'
import { redirect } from 'next/navigation'
import { createClient } from '../../../../utils/supabase/server'
import PieChartNoDataCard from './pie-chart-no-data-card'

/**
 * 円グラフカード
 */
const TotalPieChartCard = async () => {
  const supabase = createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  const userId = user?.id
  // ユーザーが存在しない場合はログイン画面にリダイレクト
  if (!user || !userId) {
    return redirect('/login')
  }

  // 資産を取得
  const assetParDate = await getAssetPerDate(userId)
  // 資産を日付ごとに集計
  const eachAssetPerDate = calcEachAssetPerDate(assetParDate)
  return (
    <>
      {eachAssetPerDate.length > 1 ? (
        <CustomCard className='bg-opacity-0 shadow-none'>
          <Suspense fallback={<Loading />}>
            <CardBody className='w-full h-96 flex justify-center items-center'>
              <TotalPieChart data={eachAssetPerDate[0]}></TotalPieChart>
            </CardBody>
            <CardFooter className='pt-0 text-end'>
              <Link href={totalAssetsPath}>
                <Button color='white' variant='text'>
                  overview →
                </Button>
              </Link>
            </CardFooter>
          </Suspense>
        </CustomCard>
      ) : (
        <PieChartNoDataCard />
      )}
    </>
  )
}

export default TotalPieChartCard
