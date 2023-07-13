import {
  CreditCardIcon,
  ArrowLongDownIcon,
  ArrowLongUpIcon,
  ArrowLongRightIcon,
} from '@heroicons/react/24/solid'
import { Button, Card, CardBody, CardFooter, Typography } from '../common'

interface Acount {
  id: number
  name: string
  role: string
  rate: number
}

const AcountCard = ({ acount }: { acount: Acount }) => {
  return (
    <Card>
      <CardBody className='w-full h-fit'>
        <div className='flex gap-4 items-center'>
          <CreditCardIcon fill='#00bcd4' className='w-10 h-10'></CreditCardIcon>
          <Typography variant='h5' color='blue-gray' className=''>
            {acount.name}
          </Typography>
        </div>

        <Typography>{acount.role}</Typography>
        <div className='flex justify-center items-center'>
          {acount.rate > 0 ? (
            <>
              <ArrowLongUpIcon
                fill='#1e88e5'
                className='w-8 h-8'
              ></ArrowLongUpIcon>
              <Typography
                variant='lead'
                className='text-blue-600 font-bold flex justify-center items-center'
              >
                {acount.rate}%
              </Typography>
            </>
          ) : acount.rate < 0 ? (
            <>
              <ArrowLongDownIcon
                fill='#e53834'
                className='w-8 h-8'
              ></ArrowLongDownIcon>
              <Typography
                variant='lead'
                className='text-red-600 font-bold flex justify-center items-center'
              >
                {acount.rate * -1}%
              </Typography>
            </>
          ) : (
            <>
              <Typography
                variant='lead'
                className='font-bold flex justify-center items-center'
              >
                ±{acount.rate}%
              </Typography>
            </>
          )}
        </div>
        <Typography variant='small'>Since last month</Typography>
      </CardBody>
      <CardFooter className='pt-0 pb-2 text-end'>
        <Button color='cyan' variant='text'>
          view all →
        </Button>
      </CardFooter>
    </Card>
  )
}

export default AcountCard
