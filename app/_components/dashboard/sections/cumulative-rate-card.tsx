import Link from 'next/link'
import { Button, CardBody, CardFooter, Typography } from '../../common'
import { CustomCard } from '../../ui/custom-card'
import {
  ArrowLongUpIcon,
  ArrowLongDownIcon,
  CurrencyYenIcon,
} from '@heroicons/react/24/solid'
import { totalAssetsPath } from '../../../_common/constants/path'
import CumulativeRateNoDataCard from './cumulative-rate-no-data-card'
import { Suspense } from 'react'
import { createClient } from '../../../../utils/supabase/server'
import { redirect } from 'next/navigation'
import { getAssetPerDate } from '../../../api/asset/fetcher'
import {
  calcDifference,
  calcRate,
  calcTotalAmountParDate,
} from '../../../_common/utils/calc'
import CardSkeletonS from '../../ui/card-skeleton-s'

/**
 * 累積比較カード
 */
const CumulativeRateCard = async () => {
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
  // 直近の合計額
  const recentAmount: number | null = totalAmountParDate[0]?.amount
  // 前回の合計額
  const previousAmount: number | null = totalAmountParDate[1]?.amount

  // 直近の合計額と増減率を取得
  const cumulative = {
    amount:
      totalAmountParDate.length > 1
        ? calcDifference(recentAmount, previousAmount)
        : totalAmountParDate.length === 1
        ? recentAmount
        : null,
    rate:
      totalAmountParDate.length > 1
        ? calcRate(recentAmount, previousAmount)
        : totalAmountParDate.length === 1
        ? 0
        : null,
  }
  return (
    <Suspense fallback={<CardSkeletonS />}>
      {cumulative.amount === null && cumulative.rate === null ? (
        <CumulativeRateNoDataCard />
      ) : (
        <CustomCard>
          <CardBody className='w-full h-fit'>
            <div className='flex gap-4 items-center'>
              <div>
                <Typography variant='h5' className='text-sm font-normal'>
                  cumulative rate
                </Typography>
                <Typography variant='lead' className='text-2xl font-bold'>
                  {cumulative.amount?.toLocaleString()} 円
                </Typography>
              </div>
              <CurrencyYenIcon
                fill='#FF8042'
                className='w-10 h-10'
              ></CurrencyYenIcon>
            </div>

            <div className='flex justify-center items-center'>
              {cumulative.rate && cumulative.rate > 0 ? (
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
              ) : cumulative.rate && cumulative.rate < 0 ? (
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
            <Link href={totalAssetsPath}>
              <Button color='cyan' variant='text'>
                view all →
              </Button>
            </Link>
          </CardFooter>
        </CustomCard>
      )}
    </Suspense>
  )
}

export default CumulativeRateCard
