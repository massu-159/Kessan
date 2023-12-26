import Link from "next/link"
import { totalAssetsPath } from "../../../_common/constants/path"
import { Button, CardBody, CardFooter } from "../../common"
import { CustomCard } from "../../ui/custom-card"
import TotalBarChart from "../parts/total-bar-chart"
import { ProcessedData } from "../../../_common/types/ProcessedData"

type Props = {
  accountData: ProcessedData[]
}

/**
 * 棒グラフカード
 * @param accountData 資産データ
 */
const TotalBarChartCard = ({accountData}:Props) => {
  return (
    <div>
      <CustomCard>
        <CardBody className='w-11/12 h-96'>
          <TotalBarChart data={accountData}></TotalBarChart>
        </CardBody>
        <CardFooter className='pt-0 text-end'>
          <Link href={totalAssetsPath}>
            <Button color='cyan' variant='text'>
              overview →
            </Button>
          </Link>
        </CardFooter>
      </CustomCard>
    </div>
  )
}

export default TotalBarChartCard