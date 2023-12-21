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
import { Colors } from '../../../_common/constants/Colors'
import { ProcessedData } from '../../../_common/types/ProcessedData'

type Props = {
  data: ProcessedData[]
}

/**
 * 直近の資産棒グラフ
 * @param data 直近の資産
 */
const TotalBarChart = ({ data }: Props) => {
  // dataを日付昇順にソート
  data.sort((a, b) => {
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
        {financeInstitutions.map((item, index) => (
          <Bar
            dataKey={item}
            stackId='a'
            fill={Colors[Math.floor(index % Colors.length)]}
            unit='円'
            barSize={28}
            key={item}
          />
        ))}
        <Line
          type='monotone'
          dataKey='total'
          stroke='#8884d8'
          unit='円'
          key='total'
        />
      </ComposedChart>
    </ResponsiveContainer>
  )
}

export default TotalBarChart
