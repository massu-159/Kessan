'use client'
import { PencilSquareIcon } from '@heroicons/react/24/solid'
import { Button } from '../common'
import { useState } from 'react'
import GoalEditForm from './goal-edit-form'
import { Database } from '../../../lib/database.types'

export default function GoalEditButton({
  goal,
  userId,
}: {
  goal: any
  userId: string | undefined
}) {
  const [open, setOpen] = useState<boolean>(false)

  // 金額入力ボタンを押したら、金額入力モーダルウィンドウを表示する
  const handleClick = () => {
    setOpen(true)
  }
  return (
    <>
      <Button
        variant='text'
        color='cyan'
        className='flex items-center justify-center'
        onClick={handleClick}
      >
        <PencilSquareIcon fill='#035f64' className='w-6 h-6'></PencilSquareIcon>
      </Button>
      <GoalEditForm
        open={open}
        setOpen={setOpen}
        goal={goal}
        userId={userId}
      ></GoalEditForm>
    </>
  )
}
