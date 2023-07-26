import { CreditCardIcon } from '@heroicons/react/24/solid'
import { Card, CardBody, CardFooter, Typography } from '../../common'

interface Acount {
  id: string
  name: string
  usage: string
}

const AcountCard = ({ acount }: { acount: Acount }) => {
  return (
    <Card className='bg-opacity-50'>
      <CardBody className='w-full h-fit'>
        <div className='flex gap-4 items-center'>
          <CreditCardIcon fill='#00bcd4' className='w-10 h-10'></CreditCardIcon>
          <Typography variant='h5' color='blue-gray' className=''>
            {acount.name}
          </Typography>
        </div>
        <Typography>{acount.usage}</Typography>
      </CardBody>
      <CardFooter>
        <Typography variant='small'>shelter and nurture my wealth</Typography>
      </CardFooter>
    </Card>
  )
}

export default AcountCard
