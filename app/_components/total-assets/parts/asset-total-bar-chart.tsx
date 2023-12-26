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
import { colors } from '../../../_common/constants/colors'
import { ProcessedData } from '../../../_common/types/ProcessedData'

type Props = {
  data: ProcessedData[]
}

/**
 * 資産推移の棒グラフ
 * @param data 資産推移データ
 */
const AssetTotalBarChart = ({ data }: Props) => {
  // dataを日付昇順にソート
  data.sort((a: any, b: any) => {
    if (a.date < b.date) {
      return -1
    } else {
      return 1
    }
  })

  // 金融機関の配列を取得
  const set = new Set(
    data.flatMap((item: {}) =>
      Object.keys(item).filter((key) => key !== 'date' && key !== 'total')
    )
  )
  const financeInstitutions = Array.from(set)

  return (
    <ResponsiveContainer width='100%' height='100%'>
      <ComposedChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray='3 3' />
        <XAxis dataKey='date' />
        <YAxis />
        <Tooltip />
        <Legend />
        {financeInstitutions.map((item: any, index) => (
          <Bar
            dataKey={item}
            stackId='a'
            fill={colors[Math.floor(index % colors.length)]}
            unit='円'
            barSize={28}
            key={item}
          />
        ))}
        <Line type='monotone' dataKey='total' stroke='#8884d8' unit='円'></Line>
      </ComposedChart>
    </ResponsiveContainer>
  )
}

export default AssetTotalBarChart
