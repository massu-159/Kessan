import Link from 'next/link'
import { Button, CardBody, CardFooter, Typography } from '../../common'
import { CustomCard } from '../../ui/custom-card'
import {
  ArrowLongUpIcon,
  ArrowLongDownIcon,
  CurrencyYenIcon,
} from '@heroicons/react/24/solid'
import { totalAssetsPath } from '../../../_common/constants/path'
import { Cumulative } from '../../../_common/types/Cumulative'
import CumulativeRateNoDataCard from './cumulative-rate-no-data-card'
import Loading from '../../../(routes)/loading'
import { Suspense } from 'react'

type Props = {
  cumulative: Cumulative
}

/**
 * 累積比較カード
 * @param cumulative 累積比較
 */
const CumulativeRateCard = ({ cumulative }: Props) => {
  return (
    <>
      {cumulative.amount === null && cumulative.rate === null ? (
        <CumulativeRateNoDataCard />
      ) : (
        <CustomCard>
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
            <CardFooter className='pt-0 pb-2 text-end'>
              <Link href={totalAssetsPath}>
                <Button color='cyan' variant='text'>
                  view all →
                </Button>
              </Link>
            </CardFooter>
          </Suspense>
        </CustomCard>
      )}
    </>
  )
}

export default CumulativeRateCard
