import { Suspense } from 'react'
import Loading from '../../../(routes)/loading'
import { ProcessedData } from '../../../_common/types/ProcessedData'
import { CardBody } from '../../common'
import { CustomCard } from '../../ui/custom-card'
import AssetTotalPieChart from '../parts/asset-total-pie-chart'

type Props = {
  data: ProcessedData
}

/**
 * 資産円グラフ
 */
const AssetTotalPieChartCard = ({ data }: Props) => {
  return (
    <CustomCard>
      <CardBody className='w-full h-96 flex justify-center items-center'>
        <Suspense fallback={<Loading />}>
          <AssetTotalPieChart data={data}></AssetTotalPieChart>
        </Suspense>
      </CardBody>
    </CustomCard>
  )
}

export default AssetTotalPieChartCard
