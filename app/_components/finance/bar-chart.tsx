'use client'
import {
  BarChart,
  Bar,
  Line,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  ComposedChart,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'

type Data = {
  sort(arg0: (a: Data, b: Data) => number): unknown
  date: string
  amount: number
}

const FinanceBarChart = ({ data, index }: { data: Data; index: number }) => {
  // 配色
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']
  const colorIndex = Math.floor(index % COLORS.length)
  // チャートデータを日付でソート
  const chartData: any = data.sort((a: Data, b: Data) =>
    a.date.localeCompare(b.date)
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
        <XAxis dataKey='date' />
        <YAxis />
        <Tooltip />
        <Bar
          dataKey='amount'
          stackId='a'
          fill={COLORS[colorIndex]}
          unit='円'
          barSize={28}
        />
      </ComposedChart>
    </ResponsiveContainer>
  )
}

export default FinanceBarChart
