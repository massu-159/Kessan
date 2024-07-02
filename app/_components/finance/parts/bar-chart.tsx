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
import { colors } from '../../../_common/constants/colorList'
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

  // 日本円のフォーマット
  const currencyFormatter = (value: number) => [
    `${value.toLocaleString()}円`, '残高'
  ]

  // 日付のフォーマット
  const DateFormatter = (dateString: string) => {
    const date = new Date(dateString)
    const year = date.getFullYear()
    const month = ('0' + (date.getMonth() + 1)).slice(-2)
    return `${year}/${month}`
  }

  return (
    <ResponsiveContainer width='100%' height='100%'>
      <ComposedChart
        width={500}
        height={300}
        data={chartData}
        margin={{
          top: 20,
          right: 30,
          left: 50,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray='3 3' />
        <XAxis
          dataKey='date'
          tick={{ fill: '#fff' }}
          tickFormatter={DateFormatter}
        />
        <YAxis
          tick={{ fill: '#fff' }}
          tickFormatter={(value) => `${value.toLocaleString()}円`}
        />
        <Tooltip formatter={currencyFormatter} />
        <Bar
          dataKey='amount'
          stackId='a'
          fill={colors[colorIndex]}
          barSize={28}
        />
      </ComposedChart>
    </ResponsiveContainer>
  )
}

export default FinanceBarChart
