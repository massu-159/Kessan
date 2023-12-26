import { ProcessedData } from '../../../_common/types/ProcessedData'
import { CardBody } from '../../common'
import { CustomCard } from '../../ui/custom-card'
import AssetTotalBarChart from '../parts/asset-total-bar-chart'

type Props = {
  data: ProcessedData[]
}

/**
 * 資産棒グラフ
 */
const AssetTotalBarChartCard = ({ data }: Props) => {
  return (
    <CustomCard>
      <CardBody className='w-11/12 h-96'>
        <AssetTotalBarChart data={data}></AssetTotalBarChart>
      </CardBody>
    </CustomCard>
  )
}

export default AssetTotalBarChartCard
