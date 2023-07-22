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


const FinanceBarChart = ({ data }: {data:any}) => {
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
        <XAxis dataKey='name' />
        <YAxis />
        <Tooltip />
        <Bar
          dataKey='ゆうちょ銀行'
          stackId='a'
          fill='#0088FE'
          unit='円'
          barSize={20}
        />
        <Bar
          dataKey='三菱UFJ銀行'
          stackId='a'
          fill='#00C49F'
          unit='円'
          barSize={20}
        />
        <Bar
          dataKey='楽天銀行'
          stackId='a'
          fill='#FFBB28'
          unit='円'
          barSize={20}
        />
        <Bar
          dataKey='楽天証券'
          stackId='a'
          fill='#FF8042'
          unit='円'
          barSize={20}
        />
      </ComposedChart>
    </ResponsiveContainer>
  )
}

export default FinanceBarChart
