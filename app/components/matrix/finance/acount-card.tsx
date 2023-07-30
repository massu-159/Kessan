'use client'
import { CreditCardIcon, PencilSquareIcon } from '@heroicons/react/24/solid'
import { Card, CardBody, CardFooter, Typography, Button } from '../../common'
import { useState } from 'react'
import PopUpForm from './finance-form'
import AcountEditForm from './acount-edit-form'


const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']

const AcountCard = ({
  acount,
  userId,
  index,
}: {
  acount: any
  userId: string | undefined
  index: number
}) => {
  const [open, setOpen] = useState(false)
  const [show, setShow] = useState(false)
  // 配色
  const colorIndex = Math.floor(index % COLORS.length)
  // 金額入力ボタンを押したら、金額入力モーダルウィンドウを表示する
  const handleClick = () => {
    setOpen(true)
  }
  // 編集ボタンを押したら、編集モーダルウィンドウを表示する
  const handleClickEdit = () => {
    setShow(true)
  }

  return (
    <Card className='bg-opacity-50'>
      <CardBody className='w-full h-fit pb-0'>
        <div className='flex gap-4 items-center justify-between'>
          <div className='flex gap-4 items-center'>
            <CreditCardIcon
              fill={COLORS[colorIndex]}
              className='w-10 h-10'
            ></CreditCardIcon>
            <Typography variant='h5' color='blue-gray'>
              {acount.name}
            </Typography>
          </div>
          <Button variant='text' color='cyan' onClick={handleClickEdit}>
            <PencilSquareIcon
              fill='#035f64'
              className='w-6 h-6'
            ></PencilSquareIcon>
          </Button>
          <AcountEditForm
            show={show}
            setShow={setShow}
            acount={acount}
            id={userId}
          ></AcountEditForm>
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
