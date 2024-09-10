'use client'
import {
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ComposedChart,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import { colors } from '../../../_common/constants/colorList'
import { EachAssetPerDate } from '../../../_common/types/EachAssetPerDate'

type Props = {
  data: EachAssetPerDate[]
}

/**
 * 資産推移の棒グラフ
 * @param data 資産推移データ
 */
const AssetTotalBarChart = ({ data }: Props) => {
  // dataを日付昇順にソート
  data.sort((a: EachAssetPerDate, b: EachAssetPerDate) => {
    if (a.date < b.date) {
      return -1
    } else {
      return 1
    }
  })

  // 金融機関の配列を取得
  const set = new Set(
    data.flatMap((item: EachAssetPerDate) =>
      Object.keys(item).filter((key) => key !== 'date' && key !== 'total')
    )
  )
  const financeInstitutions = Array.from(set)

  // 日本円のフォーマット
  const currencyFormatter = (value: number) => {
    return `${value.toLocaleString()}円`
  }

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
        data={data}
        margin={{
          top: 20,
          right: 30,
          left: 50,
          bottom: 5,
        }}
      >
        <CartesianGrid stroke='#eee' strokeDasharray='3 3' />
        <XAxis dataKey='date' tickFormatter={DateFormatter} />
        <YAxis tickFormatter={(value) => `${value.toLocaleString()}円`} />
        <Tooltip formatter={currencyFormatter} />
        <Legend />
        {financeInstitutions.map((item: string, index) => (
          <Bar
            dataKey={item}
            stackId='a'
            fill={colors[Math.floor(index % colors.length)]}
            barSize={28}
            key={item}
          />
        ))}
        <Line type='monotone' dataKey='total' stroke='#8884d8'></Line>
      </ComposedChart>
    </ResponsiveContainer>
  )
}

export default AssetTotalBarChart
