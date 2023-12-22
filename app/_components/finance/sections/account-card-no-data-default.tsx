import { Card, CardBody, Typography } from '../../common'

/**
 * 金融機関カード
 */
const AccountCardNoDataDefault = () => {
  return (
    <Card className='bg-opacity-0 shadow-none bg-[url(/acount-bar-chart-blur.png)] bg-center bg-cover'>
      <CardBody className='w-full h-60 flex justify-center items-center'>
        <Typography
          variant='h5'
          className='text-blue-gray-800 font-bold text-6xl'
        >
          No Data
        </Typography>
      </CardBody>
    </Card>
  )
}

export default AccountCardNoDataDefault
