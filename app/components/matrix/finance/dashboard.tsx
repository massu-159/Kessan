import FinanceBarChart from './bar-chart'
import { Card, CardBody, CardFooter, Button } from '../../common'
import AcountCard from '../../dashboard/acount-card'

const acountData = [
  {
    id: 1,
    name: 'ゆうちょ銀行',
    role: '生活防衛',
    rate: 12,
  },
  {
    id: 2,
    name: '三菱UFJ銀行',
    role: '給与受取',
    rate: 0,
  },
  {
    id: 3,
    name: '楽天銀行',
    role: '普段使い',
    rate: -3,
  },
  {
    id: 4,
    name: '楽天証券',
    role: '資産運用',
    rate: 15,
  },
]

const assets: any = [
  {
    data: [
      {
        name: '2023/1',
        ゆうちょ銀行: 4000,
        amt: 24000,
      },
      {
        name: '2023/2',
        ゆうちょ銀行: 3000,
        amt: 22100,
      },
      {
        name: '2023/3',
        ゆうちょ銀行: 2000,
        amt: 22900,
      },
      {
        name: '2023/4',
        ゆうちょ銀行: 2780,
        amt: 20000,
      },
      {
        name: '2023/5',
        ゆうちょ銀行: 1890,
        amt: 21810,
      },
      {
        name: '2023/6',
        ゆうちょ銀行: 2390,
        amt: 25000,
      },
      {
        name: '2023/7',
        ゆうちょ銀行: 3490,
        amt: 21000,
      },
    ]
  },
  {
    data: [
      {
        name: '2023/1',
        三菱UFJ銀行: 2400,
        amt: 24000,
      },
      {
        name: '2023/2',
        三菱UFJ銀行: 1398,
        amt: 22100,
      },
      {
        name: '2023/3',
        三菱UFJ銀行: 9800,
        amt: 22900,
      },
      {
        name: '2023/4',
        三菱UFJ銀行: 3908,
        amt: 20000,
      },
      {
        name: '2023/5',
        三菱UFJ銀行: 4800,
        amt: 21810,
      },
      {
        name: '2023/6',
        三菱UFJ銀行: 3800,
        amt: 25000,
      },
      {
        name: '2023/7',
        三菱UFJ銀行: 4300,
        amt: 21000,
      },
    ]
  },
  {
    data: [
      {
        name: '2023/1',
        楽天銀行: 1200,
        amt: 24000,
      },
      {
        name: '2023/2',
        楽天銀行: 5698,
        amt: 22100,
      },
      {
        name: '2023/3',
        楽天銀行: 7700,
        amt: 22900,
      },
      {
        name: '2023/4',
        楽天銀行: 1208,
        amt: 20000,
      },
      {
        name: '2023/5',
        楽天銀行: 7800,
        amt: 21810,
      },
      {
        name: '2023/6',
        楽天銀行: 3800,
        amt: 25000,
      },
      {
        name: '2023/7',
        楽天銀行: 4300,
        amt: 21000,
      },
    ]
  },
  {
    data: [
      {
        name: '2023/1',
        楽天証券: 4800,
        amt: 24000,
      },
      {
        name: '2023/2',
        楽天証券: 998,
        amt: 22100,
      },
      {
        name: '2023/3',
        楽天証券: 1100,
        amt: 22900,
      },
      {
        name: '2023/4',
        楽天証券: 4508,
        amt: 20000,
      },
      {
        name: '2023/5',
        楽天証券: 4300,
        amt: 21810,
      },
      {
        name: '2023/6',
        楽天証券: 3800,
        amt: 25000,
      },
      {
        name: '2023/7',
        楽天証券: 4300,
        amt: 21000,
      },
    ]
  },
]

const Dashboard = () => {
  return (
    <div className='grid grid-cols-8 gap-6'>
      {assets.map((data: any) => (
      <div className='col-span-4 pb-2' key={data.data.id}>
        <Card className=''>
          <CardBody className='w-11/12 h-96'>
            <FinanceBarChart data={data.data} ></FinanceBarChart>
          </CardBody>
        </Card>
      </div>
      ))}
      {acountData.map((acount) => (
        <div className='col-span-2' key={acount.id}>
          <AcountCard acount={acount} />
        </div>
      ))}
    </div>
  )
}

export default Dashboard
