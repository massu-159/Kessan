import { Database } from '../../../../lib/database.types'
import { Button, Card, CardBody, CardFooter, Typography } from '../../common'
import { CurrencyYenIcon } from '@heroicons/react/24/solid'
import GoalEditButton from './goal-edit-button'
type GoalType = Database['public']['Tables']['Goal']['Row']

type Record = {
  amount: number
  date: string
}

const AssetActualVsTarget = ({
  goal,
  record,
  userId,
}: {
  goal: GoalType | null
  record: Record | null
  userId: string | undefined
}) => {
  let difference = 0
  let rate = 0
  if (goal && record && goal.amount && record.amount) {
    // 目標と実績の差分
    difference = goal.amount - record.amount
    // 目標達成率
    rate = Math.round((record.amount / goal.amount) * 100)
  }
  return (
    <Card>
      <CardBody className='w-full h-fit'>
        <div className='flex gap-4 items-center justify-between'>
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
          <GoalEditButton goal={goal} userId={userId}></GoalEditButton>
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
      <CardFooter className='pt-0 pb-2'>
        <Typography className='text-base font-bold'>
          目標金額 {goal?.amount?.toLocaleString()}円
        </Typography>
        <Typography className='text-2xl font-bold'>{goal?.goal}</Typography>
      </CardFooter>
    </Card>
  )
}

export default AssetActualVsTarget
