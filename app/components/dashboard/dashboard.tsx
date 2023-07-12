import TotalBarChart from './total-bar-chart'
import { Card, CardBody, CardFooter, Button } from '../common'
import TotalPieChart from './total-pie-chart'
import AcountCard from './acount-card'

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
          <CardBody className='w-full h-96'>
            <TotalPieChart></TotalPieChart>
          </CardBody>
          <CardFooter className='pt-0 text-end'>
            <Button color='cyan' variant='text'>
              overview →
            </Button>
          </CardFooter>
        </Card>
      </div>
      {
        acountData.map((acount) => (
        <div className="col-span-2" key={acount.id}>
          <AcountCard acount={acount} />
        </div>
        ))
      }
    </div>
  )
}

export default Dashboard
