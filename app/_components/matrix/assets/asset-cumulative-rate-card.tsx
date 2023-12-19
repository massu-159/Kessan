import Link from 'next/link'
import { Button, Card, CardBody, CardFooter, Typography } from '../../common'
import {
  ArrowLongUpIcon,
  ArrowLongDownIcon,
  CurrencyYenIcon,
} from '@heroicons/react/24/solid'

interface Cumulative {
  amount: number | null
  rate: number | null
}

const AssetCumulativeRateCard = ({
  cumulative,
}: {
  cumulative: Cumulative
}) => {
  return (
    <>
      {cumulative.amount === null && cumulative.rate === null ? (
        <Card className=''>
          <CardBody className='flex flex-col justify-center pb-4'>
            <Typography variant='h5' className='text-sm font-normal mb-4'>
              cumulative rate
            </Typography>
            <Typography
              variant='h5'
              className='text-cyan-500 font-bold text-center'
            >
              まだ比較するデータが
              <br />
              登録されていません。
            </Typography>
          </CardBody>
          <CardFooter className='pb-2 text-center'>
            <Link href='/dashboard/matrix/finance'>
              <Button color='cyan' variant='gradient'>
                登録する →
              </Button>
            </Link>
          </CardFooter>
        </Card>
      ) : (
        <Card>
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
        </Card>
      )}
    </>
  )
}

export default AssetCumulativeRateCard
