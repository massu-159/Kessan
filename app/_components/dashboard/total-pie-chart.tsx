'use client'

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts'
import { Colors } from '../../_common/constants/Colors'
import { ProcessedData } from '../../_common/types/ProcessedData'

type Props = {
  data: ProcessedData
}

/**
 * 直近の資産円グラフ
 * @param data 直近の資産
 */
const TotalPieChart = ({ data }: Props) => {
  // 直近のデータを取得(date,total以外)
  const record = Object.entries(data)
    .slice(2)
    .map(([name, value]) => ({ name, value }))

  return (
    <ResponsiveContainer width='100%' height='100%'>
      <PieChart width={400} height={400}>
        <Pie
          data={record}
          cx='50%'
          cy='50%'
          innerRadius={60}
          outerRadius={100}
          fill='#8884d8'
          paddingAngle={1}
          dataKey='value'
          label
        >
          {record.map((_, index) => (
            <Cell key={`cell-${index}`} fill={Colors[index % Colors.length]} />
          ))}
        </Pie>
        <Tooltip></Tooltip>
      </PieChart>
    </ResponsiveContainer>
  )
}

export default TotalPieChart
