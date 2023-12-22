import { ParFinancialInstitutionAsset } from '../../../_common/types/AssetParFinancialInstitution'
import { Card, CardBody } from '../../common'
import FinanceBarChart from '../parts/bar-chart'

type Props = {
  key: string | null
  data: ParFinancialInstitutionAsset[]
  index: number
}

/**
 * 金融機関別の残高推移グラフカード
 * @param key キー
 * @param data グラフデータ
 * @param index グラフの色を決めるためのインデックス
 */
const FinanceBarChartCard = ({ key, data, index }: Props) => {
  return (
    <Card className='bg-opacity-0 shadow-none' key={key}>
      <CardBody className='w-full h-60'>
        <FinanceBarChart data={data} index={index}></FinanceBarChart>
      </CardBody>
    </Card>
  )
}

export default FinanceBarChartCard
