'use client'
import {
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ComposedChart,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import { colors } from '../../../_common/constants/colors'
import { ParFinancialInstitutionAsset } from '../../../_common/types/AssetParFinancialInstitution'

type Props = {
  data: ParFinancialInstitutionAsset[]
  index: number
}

/**
 * 金融機関別の残高推移グラフ
 * @param data グラフデータ
 * @param index グラフの色を決めるためのインデックス
 */
const FinanceBarChart = ({ data, index }: Props) => {
  const colorIndex = Math.floor(index % colors.length)
  // チャートデータを日付でソート
  const chartData = data.sort((a, b) =>
    a.date && b.date ? a.date?.localeCompare(b.date) : 0
  )

  return (
    <ResponsiveContainer width='100%' height='100%'>
      <ComposedChart
        width={500}
        height={300}
        data={chartData}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray='3 3' />
        <XAxis dataKey='date' tick={{ fill: '#fff' }} />
        <YAxis tick={{ fill: '#fff' }} />
        <Tooltip />
        <Bar
          dataKey='amount'
          stackId='a'
          fill={colors[colorIndex]}
          unit='円'
          barSize={28}
        />
      </ComposedChart>
    </ResponsiveContainer>
  )
}

export default FinanceBarChart
