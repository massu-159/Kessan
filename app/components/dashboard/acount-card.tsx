import {
  CreditCardIcon,
  ArrowLongDownIcon,
  ArrowLongUpIcon,
  ArrowLongRightIcon,
} from '@heroicons/react/24/solid'
import { Button, Card, CardBody, CardFooter, Typography } from '../common'
import Link from 'next/link'

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']

const AcountCard = ({ acount, index }: any) => {
  // 配色
  const colorIndex = Math.floor(index % COLORS.length)
  // 増減率を計算
  const calcRate = (amount: number, previousAmount: number) => {
    if (previousAmount === 0) return 0
    return Math.floor(((amount - previousAmount) / previousAmount) * 100)
  }
  // 直近の増減率
  const rate = calcRate(acount.Asset[0].amount, acount.Asset[1].amount) 

  // 増減額を計算
  const calcDifference = (amount: number, previousAmount: number) => {
    return amount - previousAmount
  }
  // 直近の増減額
  const difference = calcDifference(acount.Asset[0].amount, acount.Asset[1].amount)

  return (
    <Card>
      <CardBody className='w-full h-fit'>
        <div className='flex gap-4 items-center'>
          <CreditCardIcon
            fill={COLORS[colorIndex]}
            className='w-10 h-10'
          ></CreditCardIcon>
          <Typography variant='h5' color='blue-gray' className=''>
            {acount.name}
          </Typography>
        </div>

        <Typography>{acount.usage}</Typography>
        <div className='flex justify-center items-center'>
          {rate > 0 ? (
            <>
              <ArrowLongUpIcon
                fill='#1e88e5'
                className='w-8 h-8'
              ></ArrowLongUpIcon>
              <Typography
                variant='lead'
                className='text-blue-600 font-bold flex justify-center items-center'
              >
                {rate} %
              </Typography>
            </>
          ) : rate < 0 ? (
            <>
              <ArrowLongDownIcon
                fill='#e53834'
                className='w-8 h-8'
              ></ArrowLongDownIcon>
              <Typography
                variant='lead'
                className='text-red-600 font-bold flex justify-center items-center'
              >
                {rate * -1} %
              </Typography>
            </>
          ) : (
            <>
              <Typography
                variant='lead'
                className='font-bold flex justify-center items-center'
              >
                ±0 %
              </Typography>
            </>
          )}
        </div>
        <Typography variant='small'>Since last month</Typography>
      </CardBody>
      <CardFooter className='pt-0 pb-2 text-end'>
        <Link href="dashboard/matrix/finance">
          <Button color='cyan' variant='text'>
            view all →
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}

export default AcountCard
