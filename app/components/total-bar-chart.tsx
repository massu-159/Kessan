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


const data:any = [
  {
    name: '2023/1',
    'ゆうちょ銀行': 4000,
    '三菱UFJ銀行': 2400,
    '楽天銀行': 1200,
    '楽天証券': 4800,
    amt: 24000,
  },
  {
    name: '2023/2',
    'ゆうちょ銀行': 3000,
    '三菱UFJ銀行': 1398,
    '楽天銀行': 5698,
    '楽天証券': 998,
    amt: 22100,
  },
  {
    name: '2023/3',
    'ゆうちょ銀行': 2000,
    '三菱UFJ銀行': 9800,
    '楽天銀行': 7700,
    '楽天証券': 1100,
    amt: 22900,
  },
  {
    name: '2023/4',
    'ゆうちょ銀行': 2780,
    '三菱UFJ銀行': 3908,
    '楽天銀行': 1208,
    '楽天証券': 4508,
    amt: 20000,
  },
  {
    name: '2023/5',
    'ゆうちょ銀行': 1890,
    '三菱UFJ銀行': 4800,
    '楽天銀行': 7800,
    '楽天証券': 4300,
    amt: 21810,
  },
  {
    name: '2023/6',
    'ゆうちょ銀行': 2390,
    '三菱UFJ銀行': 3800,
    '楽天銀行': 3800,
    '楽天証券': 3800,
    amt: 25000,
  },
  {
    name: '2023/7',
    'ゆうちょ銀行': 3490,
    '三菱UFJ銀行': 4300,
    '楽天銀行': 4300,
    '楽天証券': 4300,
    amt: 21000,
  },
]

const TotalBarChart = () => {
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
        <Legend />
        <Bar
          dataKey='ゆうちょ銀行'
          stackId='a'
          fill='#F79009'
          unit='円'
          barSize={20}
        />
        <Bar dataKey='三菱UFJ銀行' stackId='a' fill='#0088FE' unit='円' />
        <Bar dataKey='楽天銀行' stackId='a' fill='#00C49F' unit='円' />
        <Bar dataKey='楽天証券' stackId='a' fill='#FFBB28' unit='円' />
        <Line type='monotone' dataKey='amt' stroke='#FF8042' unit='円' />
      </ComposedChart>
    </ResponsiveContainer>
  )
}

export default TotalBarChart
