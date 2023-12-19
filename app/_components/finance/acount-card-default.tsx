'use client'
import { CreditCardIcon, PencilSquareIcon } from '@heroicons/react/24/solid'
import { Card, CardBody, CardFooter, Typography, Button } from '../common'
import { useState } from 'react'
import PopUpForm from './finance-form'
import AcountEditForm from './acount-edit-form'

const AcountCardDefault = () => {
  return (
    <Card className='bg-opacity-50'>
      <CardBody className='w-full h-fit pb-0'>
        <div className='flex gap-4 items-center'>
          <CreditCardIcon fill='#0088FE' className='w-10 h-10'></CreditCardIcon>
          <Typography variant='h5' color='blue-gray'>
            Kessan 銀行
          </Typography>
        </div>
        <Typography color='cyan'>まだ登録されていません</Typography>
        <div className='text-end'>
          <Button color='cyan' disabled>
            金額入力
          </Button>
        </div>
      </CardBody>
      <CardFooter className='pt-0 pb-2'>
        <Typography variant='small'>shelter and nurture my wealth</Typography>
      </CardFooter>
    </Card>
  )
}

export default AcountCardDefault
