import { CardBody, CardFooter, Typography } from '../../common'
import { CurrencyYenIcon } from '@heroicons/react/24/solid'
import GoalEditButton from '../parts/goal-edit-button'
import { AmountRecord } from '../../../_common/types/AmountRecord'
import { CustomCard } from '../../ui/custom-card'
import { Suspense } from 'react'
import Loading from '../../../(routes)/loading'

type Props = {
  goal: any
  record: AmountRecord | null
  userId: string | undefined
}

/**
 * 実績と目標の比較カード
 * @param goal 目標
 * @param record 実績
 * @param userId ユーザーID
 */
const AssetActualVsTarget = ({ goal, record, userId }: Props) => {
  let difference = 0
  let rate = 0
  if (goal && record && goal.amount && record.amount) {
    // 目標と実績の差分
    difference = goal.amount - record.amount
    // 目標達成率
    rate = Math.round((record.amount / goal.amount) * 100)
  }
  return (
    <CustomCard className='bg-opacity-0 text-white'>
      <Suspense fallback={<Loading />}>
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
              className='text-blue-100 font-bold flex justify-center items-center'
            >
              {rate}%
            </Typography>
          </div>
          <Typography variant='small'>Target achievement rate</Typography>
        </CardBody>
        <CardFooter className='pt-0 pb-2'>
          <Typography className='text-base font-bold'>
            目標金額 {goal?.amount ? goal?.amount?.toLocaleString() : 0}円
          </Typography>
          <Typography className='text-2xl font-bold'>{goal?.goal}</Typography>
        </CardFooter>
      </Suspense>
    </CustomCard>
  )
}

export default AssetActualVsTarget
