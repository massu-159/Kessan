'use client'
import { CreditCardIcon } from '@heroicons/react/24/solid'
import { Card, CardBody, CardFooter, Typography, Button } from '../../common'
import { useState } from 'react'
import PopUpForm from './finance-form'

type Acount ={
  id: string;
  name: string;
  usage: string;
}

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']
  
  const AcountCard = ({ acount, userId, index }: { acount: Acount, userId:string, index:number}) => {
  const [open, setOpen] = useState(false)
  // 配色
  const colorIndex = Math.floor(index % COLORS.length)
  // 金額入力ボタンを押したら、金額入力モーダルウィンドウを表示する
  const handleClick = () => {
    setOpen(true)
  }

  return (
    <Card className='bg-opacity-50'>
      <CardBody className='w-full h-fit pb-0'>
        <div className='flex gap-4 items-center'>
          <CreditCardIcon fill={COLORS[colorIndex]} className='w-10 h-10'></CreditCardIcon>
          <Typography variant='h5' color='blue-gray'>
            {acount.name}
          </Typography>
        </div>
        <Typography>{acount.usage}</Typography>
        <div className='text-end'>
          <Button color='cyan' onClick={handleClick}>
            金額入力
          </Button>
          <PopUpForm
            open={open}
            setOpen={setOpen}
            name={acount.name}
            id={userId}
          ></PopUpForm>
        </div>
      </CardBody>
      <CardFooter className='pt-0 pb-2'>
        <Typography variant='small'>shelter and nurture my wealth</Typography>
      </CardFooter>
    </Card>
  )
}

export default AcountCard
