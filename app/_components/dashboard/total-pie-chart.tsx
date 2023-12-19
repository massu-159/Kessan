'use client'
import { PieChart, Pie, Sector, Cell, ResponsiveContainer, Tooltip } from 'recharts'

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']

const TotalPieChart = ({ data }: any) => {
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
          {record.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip></Tooltip>
      </PieChart>
    </ResponsiveContainer>
  )
}

export default TotalPieChart
