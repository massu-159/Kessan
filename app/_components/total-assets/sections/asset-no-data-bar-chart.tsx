import Link from 'next/link'
import { Button, CardBody, CardFooter, Typography } from '../../common'
import { CustomCard } from '../../ui/custom-card'
import { financePath } from '../../../_common/constants/path'

/**
 * 資産棒グラフ
 */
const AssetNoDataBarChart = () => {
  return (
    <CustomCard>
      <CardBody className='h-96 flex justify-center items-center bg-[url(/total-bar-chart-blur.png)] bg-center bg-cover'>
        <Typography
          variant='h5'
          className='text-blue-gray-800 font-bold text-7xl'
        >
          No Data
        </Typography>
      </CardBody>
      <CardFooter className='pt-0 text-center'>
        <Link href={financePath}>
          <Button color='cyan' variant='gradient'>
            登録する →
          </Button>
        </Link>
      </CardFooter>
    </CustomCard>
  )
}

export default AssetNoDataBarChart
