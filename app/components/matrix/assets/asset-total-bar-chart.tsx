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


// 配色
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']

const AssetTotalBarChart = ({ data }: any) => {
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
      Object.keys(item).filter((key) => key !== 'date')
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
            fill={COLORS[Math.floor(index % COLORS.length)]}
            unit='円'
            barSize={28}
            key={item}
          />
        ))}
      </ComposedChart>
    </ResponsiveContainer>
  )
}

export default AssetTotalBarChart
