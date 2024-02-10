import { Suspense } from 'react'
import { CardBody } from '../../common'
import { CustomCard } from '../../ui/custom-card'
import AssetTotalBarChart from '../parts/asset-total-bar-chart'
import { createClient } from '../../../../utils/supabase/server'
import { redirect } from 'next/navigation'
import { getAssetPerDate } from '../../../api/asset/fetcher'
import { calcEachAssetPerDate } from '../../../_common/utils/calc'
import AssetNoDataBarChart from './asset-no-data-bar-chart'
import CardSkeletonM from '../../ui/card-skeleton-m'

/**
 * 資産棒グラフ
 */
const AssetTotalBarChartCard = async () => {
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
    <Suspense fallback={<CardSkeletonM />}>
      {eachAssetPerDate.length > 1 ? (
        <CustomCard>
          <CardBody className='w-11/12 h-96 mx-auto'>
            <AssetTotalBarChart data={eachAssetPerDate}></AssetTotalBarChart>
          </CardBody>
        </CustomCard>
      ) : (
        <AssetNoDataBarChart />
      )}
    </Suspense>
  )
}

export default AssetTotalBarChartCard
