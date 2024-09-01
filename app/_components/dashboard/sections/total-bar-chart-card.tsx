import Link from 'next/link'
import { totalAssetsPath } from '../../../_common/constants/path'
import { Button, CardBody, CardFooter } from '../../common'
import { CustomCard } from '../../ui/custom-card'
import TotalBarChart from '../parts/total-bar-chart'
import { Suspense } from 'react'
import Loading from '../../../(routes)/loading'
import { createClient } from '../../../../utils/supabase/server'
import { redirect } from 'next/navigation'
import { getAssetPerDate } from '../../../api/asset/fetcher'
import { calcEachAssetPerDate } from '../../../_common/utils/calc'
import BarChartNoDataCard from './bar-chart-no-data-card'

/**
 * 棒グラフカード
 * @param accountData 資産データ
 */
const TotalBarChartCard = async () => {
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
        <div>
          <CustomCard>
            <Suspense fallback={<Loading />}>
              <CardBody className='w-11/12 h-96 mx-auto'>
                <TotalBarChart data={eachAssetPerDate}></TotalBarChart>
              </CardBody>
              <CardFooter className='pt-0 text-end'>
                <Link href={totalAssetsPath}>
                  <Button color='cyan' variant='text'>
                    overview →
                  </Button>
                </Link>
              </CardFooter>
            </Suspense>
          </CustomCard>
        </div>
      ) : (
        <BarChartNoDataCard />
      )}
    </>
  )
}

export default TotalBarChartCard
