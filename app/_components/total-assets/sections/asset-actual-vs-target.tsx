import { CardBody, CardFooter, Typography } from '../../common'
import { CurrencyYenIcon } from '@heroicons/react/24/solid'
import GoalEditButton from '../parts/goal-edit-button'
import { CustomCard } from '../../ui/custom-card'
import { Suspense } from 'react'
import Loading from '../../../(routes)/loading'
import { createClient } from '../../../../utils/supabase/server'
import { getGoal } from '../../../api/goal/fetcher'
import { getAssetPerDate } from '../../../api/asset/fetcher'
import {
  calcDifference,
  calcTargetAchievementRate,
  calcTotalAmountParDate,
} from '../../../_common/utils/calc'
import { redirect } from 'next/navigation'

/**
 * 実績と目標の比較カード
 */
const AssetActualVsTarget = async () => {
  const supabase = createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  const userId = user?.id
  // ユーザーが存在しない場合はログイン画面にリダイレクト
  if (!user || !userId) {
    return redirect('/login')
  }

  // 資産を取得
  const assetParDate = await getAssetPerDate(userId)
  // 各日付ごとの資産合計を計算
  const totalAmountParDate = calcTotalAmountParDate(assetParDate)

  // 目標を取得
  const goal = await getGoal(userId)
  if (!goal || !totalAmountParDate[0]) {
    // TODO: 目標未設定のコンポーネントを作る
    return <Loading />
  }

  // 目標と実績の差分
  const difference = calcDifference(goal.amount, totalAmountParDate[0].amount)
  // 目標達成率
  const rate = calcTargetAchievementRate(
    goal.amount,
    totalAmountParDate[0].amount
  )

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
            <div>{totalAmountParDate[0]?.date} 現在</div>
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
