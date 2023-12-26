'use client'
import { CreditCardIcon, PencilSquareIcon } from '@heroicons/react/24/solid'
import { Card, CardBody, CardFooter, Typography, Button } from '../../common'
import { Suspense, useState } from 'react'
import PopUpForm from '../parts/finance-form'
import AccountEditForm from '../parts/account-edit-form'
import { colors } from '../../../_common/constants/colorList'
import Loading from '../../../(routes)/loading'

type Props = {
  account: any
  userId: string | undefined
  index: number
}

/**
 * 金融機関カード
 * @param account 金融機関
 * @param userId ユーザーID
 * @param index 金融機関のインデックス
 */
const AccountCard = ({ account, userId, index }: Props) => {
  const [open, setOpen] = useState(false)
  const [show, setShow] = useState(false)
  // 配色
  const colorIndex = Math.floor(index % colors.length)
  // 金額入力ボタンを押したら、金額入力モーダルウィンドウを表示する
  const handleClick = () => {
    setOpen(true)
  }
  // 編集ボタンを押したら、編集モーダルウィンドウを表示する
  const handleClickEdit = () => {
    setShow(true)
  }

  // 金融機関が登録されていない場合は、何も表示しない
  if (!account.name || !account.usage) return <></>

  return (
    <Card className='bg-opacity-50'>
      <Suspense fallback={<Loading />}>
        <CardBody className='w-full h-fit pb-0'>
          <div className='flex gap-4 items-center justify-between'>
            <div className='flex gap-4 items-center'>
              <CreditCardIcon
                fill={colors[colorIndex]}
                className='w-10 h-10'
              ></CreditCardIcon>
              <Typography variant='h5' color='blue-gray'>
                {account.name}
              </Typography>
            </div>
            <Button variant='text' color='cyan' onClick={handleClickEdit}>
              <PencilSquareIcon
                fill='#035f64'
                className='w-6 h-6'
              ></PencilSquareIcon>
            </Button>
            <AccountEditForm
              show={show}
              setShow={setShow}
              account={account}
              id={userId}
            ></AccountEditForm>
          </div>
          <Typography>{account.usage}</Typography>
          <div className='text-end'>
            <Button color='cyan' onClick={handleClick}>
              金額入力
            </Button>
            <PopUpForm
              open={open}
              setOpen={setOpen}
              name={account.name}
              id={userId}
            ></PopUpForm>
          </div>
        </CardBody>
        <CardFooter className='pt-0 pb-2'>
          <Typography variant='small'>shelter and nurture my wealth</Typography>
        </CardFooter>
      </Suspense>
    </Card>
  )
}

export default AccountCard
