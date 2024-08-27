import { CardBody, CardFooter, Typography } from '../../common'
import {
  ArrowLongUpIcon,
  ArrowLongDownIcon,
  CurrencyYenIcon,
} from '@heroicons/react/24/solid'
import { Cumulative } from '../../../_common/types/Cumulative'
import { CustomCard } from '../../ui/custom-card'
import { Suspense } from 'react'
import Loading from '../../../(routes)/loading'

type Props = {
  cumulative: Cumulative
  recentAmount: number
}

/**
 * 累積比較カード
 * @param cumulative 累積比較データ
 */
const AssetCumulativeRate = ({ cumulative, recentAmount }: Props) => {
  return (
    <CustomCard className='bg-opacity-0 text-white'>
      <Suspense fallback={<Loading />}>
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
        <CardFooter className='pt-6 pb-2'>
          <Typography className='text-2xl font-bold'>
            資産合計 {recentAmount?.toLocaleString() ?? 0}円
          </Typography>
        </CardFooter>
      </Suspense>
    </CustomCard>
  )
}

export default AssetCumulativeRate
