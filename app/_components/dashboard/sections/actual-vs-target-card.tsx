import Link from 'next/link'
import { Database } from '../../../../lib/database.types'
import { Button, CardBody, CardFooter, Typography } from '../../common'
import { CustomCard } from '../../ui/custom-card'
import { CurrencyYenIcon } from '@heroicons/react/24/solid'
import { totalAssetsPath } from '../../../_common/constants/path'
import { Suspense } from 'react'
import { createClient } from '../../../../utils/supabase/server'
import { getGoal } from '../../../api/goal/fetcher'
import { redirect } from 'next/navigation'
import { getAssetPerDate } from '../../../api/asset/fetcher'
import {
  calcDifference,
  calcTargetAchievementRate,
  calcTotalAmountParDate,
} from '../../../_common/utils/calc'
import ActualVsTargetNoDataCard from '../parts/actual-vs-target-no-data-card'
import CardSkeletonS from '../../ui/card-skeleton-s'

/**
 * 目標達成率カード
 */
const ActualVsTargetCard = async () => {
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
    return <ActualVsTargetNoDataCard />
  }

  // 目標と実績の差分
  const difference = calcDifference(goal.amount, totalAmountParDate[0].amount)
  // 目標達成率
  const rate = calcTargetAchievementRate(
    goal.amount,
    totalAmountParDate[0].amount
  )

  return (
    <Suspense fallback={<CardSkeletonS />}>
      <CustomCard>
        <CardBody className='w-full h-fit'>
          <div className='flex gap-4 items-center'>
            <div>
              <Typography variant='h5' className='text-sm font-normal'>
                actual vs target
              </Typography>
              <Typography variant='lead' className='text-2xl font-bold'>
                あと {difference.toLocaleString()} 円
              </Typography>
            </div>
            <CurrencyYenIcon
              fill='#00C49F'
              className='w-10 h-10'
            ></CurrencyYenIcon>
          </div>

          <div className='flex justify-center items-center gap-6'>
            <div>{totalAmountParDate[0].date} 現在</div>
            <Typography
              variant='lead'
              className='text-blue-600 font-bold flex justify-center items-center'
            >
              {rate}%
            </Typography>
          </div>
          <Typography variant='small'>Target achievement rate</Typography>
        </CardBody>
        <CardFooter className='pt-0 pb-2 text-end'>
          <Link href={totalAssetsPath}>
            <Button color='cyan' variant='text'>
              view all →
            </Button>
          </Link>
        </CardFooter>
      </CustomCard>
    </Suspense>
  )
}

export default ActualVsTargetCard
