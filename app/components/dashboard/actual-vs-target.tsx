import Link from 'next/link'
import { Database } from '../../../lib/database.types'
import { Button, Card, CardBody, CardFooter, Typography } from '../common'
import { CurrencyYenIcon } from '@heroicons/react/24/solid'
type GoalType = Database['public']['Tables']['Goal']['Row']

type Record = {
  amount: number
  date: string
}

const ActualVsTarget = ({
  goal,
  record,
}: {
  goal: GoalType | null
  record: Record
}) => {
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
                あと {difference.toLocaleString()} 円
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

        <div className='flex justify-center items-center gap-6'>
          <div>{record?.date} 現在</div>
          <Typography
            variant='lead'
            className='text-blue-600 font-bold flex justify-center items-center'
          >
            {rate}%
          </Typography>
        </div>
        <Typography variant='small'>Target achievement rate</Typography>
      </CardBody>
      {goal && goal.amount ? (
        <CardFooter className='pt-0 pb-2 text-end'>
          <Link href='dashboard/matrix/assets'>
            <Button color='cyan' variant='text'>
              view all →
            </Button>
          </Link>
        </CardFooter>
      ) : (
        <CardFooter className='pt-0 pb-2 text-center'>
          <Link href='dashboard/matrix/assets'>
            <Button color='cyan' variant='gradient'>
              登録する →
            </Button>
          </Link>
        </CardFooter>
      )}
    </Card>
  )
}

export default ActualVsTarget
