import Link from 'next/link'
import { Button, CardBody, CardFooter, Typography } from '../../common'
import { CustomCard } from '../../ui/custom-card'
import { CurrencyYenIcon } from '@heroicons/react/24/solid'
import { totalAssetsPath } from '../../../_common/constants/path'

/**
 * 目標達成率カード
 */
const ActualVsTargetNoDataCard = async () => {
  return (
    <CustomCard>
      <CardBody className='w-full h-fit'>
        <div className='flex gap-4 items-center'>
          <div>
            <Typography variant='h5' className='text-sm font-normal'>
              actual vs target
            </Typography>
            <Typography variant='lead' className='text-2xl font-bold'>
              目標が未設定です
            </Typography>
          </div>
          <CurrencyYenIcon fill='#00C49F' className='w-10 h-10' />
        </div>

        <div className='flex justify-center items-center gap-6'>
          <div>現在</div>
          <Typography
            variant='lead'
            className='text-blue-600 font-bold flex justify-center items-center'
          >
            0 %
          </Typography>
        </div>
        <Typography variant='small'>Target achievement rate</Typography>
      </CardBody>
      <CardFooter className='pt-0 pb-2 text-center'>
        <Link href={totalAssetsPath}>
          <Button color='cyan' variant='gradient'>
            登録する →
          </Button>
        </Link>
      </CardFooter>
    </CustomCard>
  )
}

export default ActualVsTargetNoDataCard
