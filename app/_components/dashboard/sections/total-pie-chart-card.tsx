import Link from 'next/link'
import { totalAssetsPath } from '../../../_common/constants/path'
import { Button, CardBody, CardFooter } from '../../common'
import { CustomCard } from '../../ui/custom-card'
import { ProcessedData } from '../../../_common/types/ProcessedData'
import TotalPieChart from '../parts/total-pie-chart'
import { Suspense } from 'react'
import Loading from '../../../(routes)/loading'

type Props = {
  accountData: ProcessedData[]
}

/**
 * 棒グラフカード
 * @param accountData 資産データ
 */
const TotalPieChartCard = ({ accountData }: Props) => {
  return (
    <CustomCard className='bg-opacity-0 shadow-none'>
      <Suspense fallback={<Loading />}>
        <CardBody className='w-full h-96 flex justify-center items-center'>
          <TotalPieChart data={accountData[0]}></TotalPieChart>
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
  )
}

export default TotalPieChartCard
