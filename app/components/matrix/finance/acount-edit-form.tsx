'use client'
import { TrashIcon, XMarkIcon } from '@heroicons/react/24/solid'
import { Card, CardBody, CardFooter, Input, Button, Typography } from '../../common'
import { Dispatch, SetStateAction, useState } from 'react'
import { z } from 'zod'
import Loading from '../../../loading'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Database } from '../../../../lib/database.types'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
type Schema = z.infer<typeof schema>

// 入力データの検証ルールを定義
const schema = z.object({
  financeInstitution: z.string().min(1,{
    message: '金融機関を入力してください。',
  }),
  usage: z.string().min(1, {
    message: '使い方を入力してください。',
  }),
})

type Acount = {
  id: number
  name: string
  usage: string
}

export default function AcountEditForm({
  show,
  setShow,
  acount,
  id,
}: {
  show: boolean
  setShow: Dispatch<SetStateAction<boolean>>
  acount: Acount
  id: string | undefined
  }) {
  const router = useRouter()
  const supabase = createClientComponentClient<Database>()
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const handleClose = () => {
    setShow(false)
    router.refresh()
  }

  // 入力フォームの設定
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    // 初期値
    defaultValues: {
      financeInstitution: acount.name,
      usage: acount.usage,
    },
    // 入力値の検証
    resolver: zodResolver(schema),
  })

  // 更新データを送信
  const onSubmit: SubmitHandler<Schema> = async (data) => {
    setLoading(true)

    try {
      // 金融機関登録済みチェック
      const { data: FinancialInstitution, error: errorFinancialInstitution } =
        await supabase
          .from('FinancialInstitution')
          .select('id')
          .eq('name', data.financeInstitution)
          .single()
      // 登録済みの場合、金融機関更新
      if (FinancialInstitution) {
        const { error: errorUpdateFinancialInstitution } = await supabase
          .from('FinancialInstitution')
          .update({ usage: data.usage })
          .eq('id', FinancialInstitution.id)
        // 未登録の場合、金融機関登録
      } else {
        const { error: errorInputFinancialInstitution } = await supabase
          .from('FinancialInstitution')
          .insert({
            user_id: id,
            name: data.financeInstitution,
            usage: data.usage
          })
      }

      // エラーチェック
      if (errorFinancialInstitution) {
        setMessage(
          'エラーが発生しました。' + errorFinancialInstitution.message
        )
        return
      }

      // 入力フォームクリア
      reset()
      setMessage('登録が完了しました。')
      handleClose()
    } catch (error) {
      setMessage('エラーが発生しました。' + error)
      return
    } finally {
      setLoading(false)
    }
  }

  // 金額削除
  const handleDelete = async () => {
    setLoading(true)

    try {
      // 金融機関削除
      const { error: errorDeleteFinancialInstitution } = await supabase
        .from('FinancialInstitution')
        .delete()
        .eq('user_id', id)
        .eq('name', acount.name)

      // エラーチェック
      if (errorDeleteFinancialInstitution) {
        setMessage(
          'エラーが発生しました。' + errorDeleteFinancialInstitution.message
        )
        return
      }

      // 入力フォームクリア
      reset()
      setMessage('削除が完了しました。')
      handleClose()
    }
    catch (error) {
      setMessage('エラーが発生しました。' + error)
      return
    }
    finally {
      setLoading(false)
    }
  }

  // 金額入力モーダルウィンドウを閉じる
  if (!show) {
    return null
  }

  return (
    <div className='fixed inset-0 z-40 overflow-y-auto w-screen h-screen bg-cyan-100 bg-opacity-25'>
      <div className='flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center'>
        <Card>
          <CardBody className='pb-1'>
            <div className='text-end'>
              <Button
                variant='text'
                className='rounded-full'
                color='cyan'
                onClick={handleClose}
              >
                <XMarkIcon className='h-8 w-8'></XMarkIcon>
              </Button>
            </div>
            <Typography variant='h4' color='blue-gray'>
              金融機関変更
            </Typography>
            <Typography color='gray' className='mt-1 font-normal'>
              Enter your amounts to update or delete
            </Typography>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className='mt-8 mb-2 w-80 max-w-screen-lg sm:w-96'
            >
              <div className='mb-4 flex flex-col gap-6'>
                <Input
                  type='text'
                  size='lg'
                  label='金融機関'
                  {...register('financeInstitution', { required: true })}
                  readOnly
                />
                <div className='text-center text-sm text-red-500'>
                  {errors.financeInstitution?.message}
                </div>
                <Input
                  type='text'
                  size='lg'
                  label='使い方'
                  {...register('usage', { required: true })}
                />
                <div className='text-center text-sm text-red-500'>
                  {errors.usage?.message}
                </div>
              </div>
              {loading ? (
                <Loading />
              ) : (
                <Button type='submit' color='cyan' className='mt-6' fullWidth>
                  Update
                </Button>
              )}
              {message && (
                <div className='my-5 text-center text-sm text-red-500'>
                  {message}
                </div>
              )}
            </form>
          </CardBody>
          <CardFooter className='pt-0'>
            <Button
              onClick={handleDelete}
              color='red'
              className='flex items-center justify-center gap-3'
              fullWidth
            >
              <TrashIcon fill='white' className='h-5 w-5'></TrashIcon>
              Delete
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
