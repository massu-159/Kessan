import Link from 'next/link'
import { Button, Card, CardBody, CardFooter, Typography } from '../common'
import {
  ArrowLongUpIcon,
  ArrowLongDownIcon,
  CurrencyYenIcon,
} from '@heroicons/react/24/solid'

interface Cumulative {
  amount: number
  rate: number
}

const CumulativeRateCard = ({ cumulative }: { cumulative: Cumulative }) => {
  return (
    <Card>
      <CardBody className='w-full h-fit'>
        <div className='flex gap-4 items-center'>
          <div>
            <Typography variant='h5' className='text-sm font-normal'>
              cumulative rate
            </Typography>
            <Typography variant='lead' className='text-2xl font-bold'>
              {cumulative.amount.toLocaleString()} 円
            </Typography>
          </div>
          <CurrencyYenIcon
            fill='#FF8042'
            className='w-10 h-10'
          ></CurrencyYenIcon>
        </div>

        <div className='flex justify-center items-center'>
          {cumulative.rate > 0 ? (
            <>
              <ArrowLongUpIcon
                fill='#1e88e5'
                className='w-8 h-8'
              ></ArrowLongUpIcon>
              <Typography
                variant='lead'
                className='text-blue-600 font-bold flex justify-center items-center'
              >
                {cumulative.rate}%
              </Typography>
            </>
          ) : cumulative.rate < 0 ? (
            <>
              <ArrowLongDownIcon
                fill='#e53834'
                className='w-8 h-8'
              ></ArrowLongDownIcon>
              <Typography
                variant='lead'
                className='text-red-600 font-bold flex justify-center items-center'
              >
                {cumulative.rate * -1}%
              </Typography>
            </>
          ) : (
            <>
              <Typography
                variant='lead'
                className='font-bold flex justify-center items-center'
              >
                ±{cumulative.rate}%
              </Typography>
            </>
          )}
        </div>
        <Typography variant='small'>Since last month</Typography>
      </CardBody>
      <CardFooter className='pt-0 pb-2 text-end'>
        <Link href='dashboard/matrix/assets'>
          <Button color='cyan' variant='text'>
            view all →
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}

export default CumulativeRateCard
