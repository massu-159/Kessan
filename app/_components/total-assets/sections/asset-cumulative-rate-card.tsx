import { Cumulative } from '../../../_common/types/Cumulative'
import AssetCumulativeRateNoData from '../parts/asset-cumulative-rate-no-data'
import AssetCumulativeRate from '../parts/asset-cumulative-rate'
import { createClient } from '../../../../utils/supabase/server'
import { redirect } from 'next/navigation'
import { getAssetPerDate } from '../../../api/asset/fetcher'
import {
  calcDifference,
  calcRate,
  calcTotalAmountParDate,
} from '../../../_common/utils/calc'

/**
 * 累積比較カード
 * @param cumulative 累積比較データ
 */
const AssetCumulativeRateCard = async () => {
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
  // 各日付ごとの資産合計を計算
  const totalAmountParDate = calcTotalAmountParDate(assetParDate)
  // 直近の合計額
  const recentAmount: number | null = totalAmountParDate[0]?.amount
  // 前回の合計額
  const previousAmount: number | null = totalAmountParDate[1]?.amount

  // 直近の合計額と増減率を取得
  const cumulative = {
    amount:
      totalAmountParDate.length > 1
        ? calcDifference(recentAmount, previousAmount)
        : totalAmountParDate.length === 1
        ? recentAmount
        : null,
    rate:
      totalAmountParDate.length > 1
        ? calcRate(recentAmount, previousAmount)
        : totalAmountParDate.length === 1
        ? 0
        : null,
  }

  return (
    <>
      {cumulative.amount === null && cumulative.rate === null ? (
        <AssetCumulativeRateNoData />
      ) : (
        <AssetCumulativeRate cumulative={cumulative} recentAmount={recentAmount} />
      )}
    </>
  )
}

export default AssetCumulativeRateCard
