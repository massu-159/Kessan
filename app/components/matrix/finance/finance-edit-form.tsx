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
type Schema = z.infer<typeof schema>

// 入力データの検証ルールを定義
const schema = z.object({
  financeInstitution: z.string({
    required_error: '金融機関を入力してください。',
  }),
  date: z
    .date({
      required_error: '日付を入力してください。',
      invalid_type_error: "日付は'yyyy/mm/dd'の形式で入力してください。",
    })
    .transform((val) => val.toISOString().slice(0, 10)),
  amount: z.number({
    required_error: '金額を入力してください。',
    invalid_type_error: '金額は数値で入力してください。',
  }),
})

export default function PopUpEditForm({
  open,
  setOpen,
  name,
  id,
  amount,
  date,
}: {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  name: string
  id: string | undefined
  amount: number
  date: string
}) {
  const supabase = createClientComponentClient<Database>()
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')


  // 入力フォームの設定
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    // 初期値
    defaultValues: {
      financeInstitution: name,
      date: date,
      amount: amount,
    },
    // 入力値の検証
    resolver: zodResolver(schema),
  })

  // 更新データを送信
  const onSubmit: SubmitHandler<Schema> = async (data) => {
    setLoading(true)

    try {
      // 金融機関ID取得
      const { data: FinancialInstitution } = await supabase
        .from('FinancialInstitution')
        .select('id')
        .eq('name', data.financeInstitution)
        .single()
      if (FinancialInstitution === null) {
        setMessage('入力した金融機関が見つかりません。')
        return
      }
      // 金額登録済みチェック
      const { data: Asset } = await supabase
        .from('Asset')
        .select('date')
        .eq('user_id', id)
        .eq('financial_institution_id', FinancialInstitution.id)
        .eq('date', data.date)
        .single()
      if (Asset !== null) {
        // 金額更新
        const { error: errorUpdateAmount } = await supabase
          .from('Asset')
          .update({ amount: data.amount })
          .eq('user_id', id)
          .eq('financial_institution_id', FinancialInstitution.id)
          .eq('date', data.date)

        // エラーチェック
        if (errorUpdateAmount) {
          setMessage('エラーが発生しました。' + errorUpdateAmount.message)
          return
        }
      }

      setMessage('登録が完了しました。')
      setOpen(false)
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
      // 金融機関ID取得
      const { data: FinancialInstitution } = await supabase
        .from('FinancialInstitution')
        .select('id')
        .eq('name', name)
        .single()
      if (FinancialInstitution === null) {
        setMessage('入力した金融機関が見つかりません。')
        return
      }

      // 金額削除
      const { error: errorDeleteAmount } = await supabase
        .from('Asset')
        .delete()
        .eq('user_id', id)
        .eq('financial_institution_id', FinancialInstitution.id)
        .eq('date', date)

      // エラーチェック
      if (errorDeleteAmount) {
        setMessage('エラーが発生しました。' + errorDeleteAmount.message)
        return
      }

      setMessage('削除が完了しました。')
      setOpen(false)
    } catch (error) {
      setMessage('エラーが発生しました。' + error)
      return
    } finally {
      setLoading(false)
    }
  }

  // 金額入力モーダルウィンドウを閉じる
  if (!open) {
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
                onClick={() => setOpen(false)}
              >
                <XMarkIcon className='h-8 w-8'></XMarkIcon>
              </Button>
            </div>
            <Typography variant='h4' color='blue-gray'>
              金額変更
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
                  size='lg'
                  label='金融機関'
                  {...register('financeInstitution', { required: true })}
                  readOnly
                />
                <div className='text-center text-sm text-red-500'>
                  {errors.financeInstitution?.message}
                </div>
                <Input
                  type='date'
                  size='lg'
                  label='日付'
                  {...register('date', { required: true, valueAsDate: true })}
                />
                <div className='text-center text-sm text-red-500'>
                  {errors.date?.message}
                </div>
                <Input
                  type='number'
                  size='lg'
                  label='金額 : 円'
                  {...register('amount', {
                    required: true,
                    valueAsNumber: true,
                  })}
                />
                <div className='text-center text-sm text-red-500'>
                  {errors.amount?.message}
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
            <Button onClick={handleDelete} color='red' className='flex items-center justify-center gap-3' fullWidth>
              <TrashIcon fill='white' className='h-5 w-5'></TrashIcon>
              Delete
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
