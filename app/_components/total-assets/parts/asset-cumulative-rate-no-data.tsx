import Link from 'next/link'
import { Button, CardBody, CardFooter, Typography } from '../../common'
import { financePath } from '../../../_common/constants/path'
import { CustomCard } from '../../ui/custom-card'

/**
 * 累積比較カード
 * @param cumulative 累積比較データ
 */
const AssetCumulativeRateNoData = () => {
  return (
    <CustomCard className=''>
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
        <Link href={financePath}>
          <Button color='cyan' variant='gradient'>
            登録する →
          </Button>
        </Link>
      </CardFooter>
    </CustomCard>
  )
}

export default AssetCumulativeRateNoData
