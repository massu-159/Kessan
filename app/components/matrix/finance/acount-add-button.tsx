'use client'
import { PlusCircleIcon } from "@heroicons/react/24/solid";
import { Button } from "../../common";
import AcountAddForm from "./acount-add-form";
import { useState } from "react";

export default function AcountAddButton({ userId }: any) {
  const [open, setOpen] = useState<boolean>(false)

  // 金額入力ボタンを押したら、金額入力モーダルウィンドウを表示する
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
        <PlusCircleIcon fill='white' className='h-8 w-8'></PlusCircleIcon>
      </Button>
      <AcountAddForm open={open} setOpen={setOpen} id={userId.userId}></AcountAddForm>
    </>
  )
}