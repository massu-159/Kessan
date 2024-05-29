'use client'

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts'
import { colors } from '../../../_common/constants/colorList'
import { ProcessedData } from '../../../_common/types/ProcessedData'
import { TotalPieChartLabel } from './total-pie-chart-label'

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

  // 日本円表示
  const currencyFormatter = (value: number) => {
    return `${value.toLocaleString()}円`
  }

  return (
    <ResponsiveContainer width='100%' height='100%'>
      <PieChart width={400} height={400}>
        <Pie
          data={record}
          cx='50%'
          cy='50%'
          innerRadius={50}
          outerRadius={80}
          fill='#8884d8'
          paddingAngle={1}
          dataKey='value'
          label={TotalPieChartLabel}
        >
          {record.map((_, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
          ))}
        </Pie>
        <Tooltip formatter={currencyFormatter}></Tooltip>
      </PieChart>
    </ResponsiveContainer>
  )
}

export default TotalPieChart
