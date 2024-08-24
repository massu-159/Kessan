import { Suspense } from 'react'
import { ProcessedData } from '../../../_common/types/ProcessedData'
import { CardBody } from '../../common'
import { CustomCard } from '../../ui/custom-card'
import AssetTotalBarChart from '../parts/asset-total-bar-chart'
import Loading from '../../../(routes)/loading'

type Props = {
  data: ProcessedData[]
}

/**
 * 資産棒グラフ
 */
const AssetTotalBarChartCard = ({ data }: Props) => {
  return (
    <CustomCard>
      <CardBody className='w-11/12 h-96 mx-auto'>
        <Suspense fallback={<Loading />}>
          <AssetTotalBarChart data={data}></AssetTotalBarChart>
        </Suspense>
      </CardBody>
    </CustomCard>
  )
}

export default AssetTotalBarChartCard
