'use client'

import { PlusCircleIcon } from '@heroicons/react/24/solid'
import { Button, Typography } from '../../common'
import AccountAddForm from './account-add-form'
import { useState } from 'react'

type Props = {
  userId: string | undefined
}

/**
 * 金融機関追加ボタン
 * @param userId ユーザーID
 */
export default function AccountAddButton({ userId }: Props) {
  const [open, setOpen] = useState<boolean>(false)

  // 金融機関追加ボタンを押したら、金融機関追加モーダルウィンドウを表示する
  const handleClick = () => {
    setOpen(true)
  }
  return (
    <>
      <Button
        variant='gradient'
        color='cyan'
        className='flex items-center justify-center'
        onClick={handleClick}
      >
        <Typography>金融機関 追加</Typography>
        <PlusCircleIcon fill='white' className='h-8 w-8'></PlusCircleIcon>
      </Button>
      <AccountAddForm
        open={open}
        setOpen={setOpen}
        id={userId}
      ></AccountAddForm>
    </>
  )
}
