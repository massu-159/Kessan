import TotalBarChart from '../../dashboard/total-bar-chart'
import { Card, CardBody, CardFooter, Button } from '../../common'
import TotalPieChart from '../../dashboard/total-pie-chart'
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

const cumulative = {
  amount: 600000,
  rate: 12,
}

const record = {
  amount: 2300000,
  rate: 8,
}

const Dashboard = () => {
  return (
    <div className='grid grid-cols-8 gap-6'>
      <div className='col-span-5 pb-2'>
        <Card className=''>
          <CardBody className='w-11/12 h-96'>
            <TotalBarChart></TotalBarChart>
          </CardBody>
          <CardFooter className='pt-0 text-end'>
            <Button color='cyan' variant='text'>
              overview →
            </Button>
          </CardFooter>
        </Card>
      </div>
      <div className='col-span-3 pb-2'>
        <Card>
          <CardBody className='w-full h-96 flex justify-center items-center'>
            <TotalPieChart></TotalPieChart>
          </CardBody>
          <CardFooter className='pt-0 text-end'>
            <Button color='cyan' variant='text'>
              overview →
            </Button>
          </CardFooter>
        </Card>
      </div>
      {acountData.map((acount) => (
        <div className='col-span-2' key={acount.id}>
          <AcountCard acount={acount} />
        </div>
      ))}
    </div>
  )
}

export default Dashboard
