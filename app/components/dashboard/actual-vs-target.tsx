import { Database } from '../../../lib/database.types'
import { Button, Card, CardBody, CardFooter, Typography } from '../common'
import {
  ArrowLongUpIcon,
  ArrowLongDownIcon,
  CurrencyYenIcon,
} from '@heroicons/react/24/solid'
type GoalType = Database['public']['Tables']['Goal']['Row']

type Record = {
  amount: number
}

const ActualVsTarget = ({ goal, record }: { goal: GoalType | null, record: Record }) => {
  let difference = 0
  let rate = 0
  if (goal && goal.amount) {
    // 目標と実績の差分
    difference = goal.amount - record.amount
    // 目標達成率
    rate = Math.round((record.amount / goal.amount) * 100)
  }
  return (
    <Card>
      <CardBody className='w-full h-fit'>
        <div className='flex gap-4 items-center'>
          <div>
            <Typography variant='h5' className='text-sm font-normal'>
              actual vs target
            </Typography>
            {goal && goal.amount ? (
              <Typography variant='lead' className='text-2xl font-bold'>
                {difference.toLocaleString()} 円
              </Typography>
            ) : (
              <Typography variant='lead' className='text-2xl font-bold'>
                目標が未設定です
              </Typography>
            )}
          </div>
          <CurrencyYenIcon
            fill='#00C49F'
            className='w-10 h-10'
          ></CurrencyYenIcon>
        </div>

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
                {rate}%
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
                {rate * -1}%
              </Typography>
            </>
          ) : (
            <>
              <Typography
                variant='lead'
                className='font-bold flex justify-center items-center'
              >
                ±{rate}%
              </Typography>
            </>
          )}
        </div>
        <Typography variant='small'>Target achievement rate</Typography>
      </CardBody>
      <CardFooter className='pt-0 pb-2 text-end'>
        <Button color='cyan' variant='text'>
          view all →
        </Button>
      </CardFooter>
    </Card>
  )
}

export default ActualVsTarget
