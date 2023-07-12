import TotalBarChart from './total-bar-chart'
import { Card, CardBody, CardFooter, Button } from './common'
import TotalPieChart from './total-pie-chart'


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
    </div>
  )
}

export default Dashboard