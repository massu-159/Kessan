'use client'

import { XMarkIcon } from '@heroicons/react/24/solid'
import { Card, CardBody, Input, Button, Typography } from '../../common'
import { Dispatch, SetStateAction, useState } from 'react'
import { z } from 'zod'
import Loading from '../../../(routes)/loading'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Database } from '../../../../lib/database.types'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
type Schema = z.infer<typeof schema>

// 入力データの検証ルールを定義
const schema = z.object({
  financeInstitution: z.string().min(1, {
    message: '金融機関を入力してください。',
  }),
  usage: z.string().min(1, {
    message: '使い方を入力してください。',
  }),
})

type Props = {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  id: string | undefined
}

/**
 *　金融機関登録フォーム
 * @param open モーダルウィンドウの表示状態
 * @param setOpen モーダルウィンドウの表示状態を変更する関数
 * @param id ユーザーID
 */
export default function AccountAddForm({ open, setOpen, id }: Props) {
  const router = useRouter()
  const supabase = createClientComponentClient<Database>()
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  // 入力フォームの設定
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    // 初期値
    defaultValues: { financeInstitution: '', usage: '' },
    // 入力値の検証
    resolver: zodResolver(schema),
  })

  // 送信
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
      // 登録済みの場合、メッセージ表示
      if (FinancialInstitution !== null) {
        setMessage('既に登録されています。')
        return
      }
      if (FinancialInstitution === null) {
        // 金融機関登録
        const { error: errorInputFinancialInstitution } = await supabase
          .from('FinancialInstitution')
          .insert({
            user_id: id,
            name: data.financeInstitution,
            usage: data.usage,
          })
          .eq('user_id', id)

        // エラーチェック
        if (errorInputFinancialInstitution) {
          setMessage(
            'エラーが発生しました。' + errorInputFinancialInstitution.message
          )
          return
        }
      }

      // 入力フォームクリア
      reset()
      setMessage('登録が完了しました。')
    } catch (error) {
      setMessage('エラーが発生しました。' + error)
      return
    } finally {
      setLoading(false)
    }
  }

  const handleClose = () => {
    setOpen(false)
    router.refresh()
  }

  // 金額入力モーダルウィンドウを閉じる
  if (!open) {
    return null
  }

  return (
    <div className='fixed inset-0 z-40 overflow-y-auto w-screen h-screen bg-cyan-100 bg-opacity-25'>
      <div className='flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center'>
        <Card>
          <CardBody>
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
              金融機関登録
            </Typography>
            <Typography color='gray' className='mt-1 font-normal'>
              Enter your financial institution to register
            </Typography>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className='mt-8 mb-2 w-80 max-w-screen-lg sm:w-96'
            >
              <div className='mb-4 flex flex-col gap-6'>
                <Input
                  size='lg'
                  label='金融機関'
                  type='text'
                  {...register('financeInstitution', { required: true })}
                />
                <div className='text-center text-sm text-red-500'>
                  {errors.financeInstitution?.message}
                </div>
                <Input
                  size='lg'
                  label='使い方'
                  type='text'
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
                  Register
                </Button>
              )}
              {message && (
                <div className='my-5 text-center text-sm text-red-500'>
                  {message}
                </div>
              )}
            </form>
          </CardBody>
        </Card>
      </div>
    </div>
  )
}
