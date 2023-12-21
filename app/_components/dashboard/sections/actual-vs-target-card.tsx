import Link from 'next/link'
import { Database } from '../../../../lib/database.types'
import { Button, CardBody, CardFooter, Typography } from '../../common'
import { CustomCard } from '../../ui/custom-card'
import { CurrencyYenIcon } from '@heroicons/react/24/solid'
import { totalAssetsPath } from '../../../_common/constants/path'
import { Record } from '../../../_common/types/Record'
type GoalType = Database['public']['Tables']['Goal']['Row']

type Props = {
  goal: GoalType | null
  record: Record
}

/**
 * 目標達成率カード
 * @param goal 目標
 * @param record 直近の資産残高
 */
const ActualVsTargetCard = ({ goal, record }: Props) => {
  let difference = 0
  let rate = 0
  if (goal && goal.amount) {
    // 目標と実績の差分
    difference = goal.amount - record.amount
    // 目標達成率
    rate = Math.round((record.amount / goal.amount) * 100)
  }
  return (
    <CustomCard>
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
          <Link href={totalAssetsPath}>
            <Button color='cyan' variant='text'>
              view all →
            </Button>
          </Link>
        </CardFooter>
      ) : (
        <CardFooter className='pt-0 pb-2 text-center'>
          <Link href={totalAssetsPath}>
            <Button color='cyan' variant='gradient'>
              登録する →
            </Button>
          </Link>
        </CardFooter>
      )}
    </CustomCard>
  )
}

export default ActualVsTargetCard
