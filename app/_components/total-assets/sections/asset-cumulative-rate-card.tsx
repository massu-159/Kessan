import { Cumulative } from '../../../_common/types/Cumulative'
import AssetCumulativeRateNoData from '../parts/asset-cumulative-rate-no-data'
import AssetCumulativeRate from '../parts/asset-cumulative-rate'

type Props = {
  cumulative: Cumulative
}

/**
 * 累積比較カード
 * @param cumulative 累積比較データ
 */
const AssetCumulativeRateCard = ({ cumulative }: Props) => {
  return (
    <>
      {cumulative.amount === null && cumulative.rate === null ? (
        <AssetCumulativeRateNoData />
      ) : (
        <AssetCumulativeRate cumulative={cumulative} />
      )}
    </>
  )
}

export default AssetCumulativeRateCard
