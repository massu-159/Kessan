import {
  CreditCardIcon,
  ArrowLongDownIcon,
  ArrowLongUpIcon,
} from '@heroicons/react/24/solid'
import { Button, Card, CardBody, CardFooter, Typography } from '../common'
import Link from 'next/link'
import { financePath } from '../../_common/constants/path'
import { Colors } from '../../_common/constants/Colors'

type Props = {
  account: {
    name: string | null
    usage: string | null
    Asset: {
      date: string | null
      amount: number | null
    }[]
  }
  index: number
}

/**
 * アカウントカード
 * @param account
 * @param index
 */
const AccountCard = ({ account, index }: Props) => {
  // 直近の資産残高
  const currentAmount = account.Asset[0].amount
  if (!currentAmount) return null

  // 配色
  const colorIndex = Math.floor(index % Colors.length)
  // 前月の資産残高
  const previousAmount = account.Asset[1]?.amount ? account.Asset[1].amount : 0
  // 増減率を計算
  const calcRate = (amount: number, previousAmount: number) => {
    if (previousAmount === 0) return 0
    return Math.floor(((amount - previousAmount) / previousAmount) * 100)
  }
  // 直近の増減率
  const rate = calcRate(currentAmount, previousAmount)

  return (
    <Card>
      <CardBody className='w-full h-fit'>
        <div className='flex gap-4 items-center'>
          <CreditCardIcon
            fill={Colors[colorIndex]}
            className='w-10 h-10'
          ></CreditCardIcon>
          <Typography variant='h5' color='blue-gray' className=''>
            {account.name}
          </Typography>
        </div>

        <Typography>{account.usage}</Typography>
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
        <Link href={financePath}>
          <Button color='cyan' variant='text'>
            view all →
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}

export default AccountCard
