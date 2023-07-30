'use client'
import { TrashIcon, XMarkIcon } from '@heroicons/react/24/solid'
import {
  Card,
  CardBody,
  CardFooter,
  Input,
  Button,
  Typography,
} from '../../common'
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
  financeInstitution: z.string().min(1, {
    message: '金融機関を入力してください。',
  }),
  usage: z.number().min(1, {
    message: '使い方を入力してください。',
  }),
})

type Goal = {
  amount: number
  created_at: string
  goal: string
  id: string
  user_id: string
}

export default function GoalEditForm({
  open,
  setOpen,
  goal,
}: {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  goal: Goal | null
}) {
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
    defaultValues: {
      user_id: goal?.user_id,
      goal: goal ? goal.goal : '',
      amount: goal ? goal.amount : 0,
    },
    // 入力値の検証
    resolver: zodResolver(schema),
  })

  // 更新データを送信
  const onSubmit: SubmitHandler<Schema> = async (data) => {
    setLoading(true)

    try {
      // 目標が登録済みチェック
      const { data: Goal, error: errorGoal } = await supabase
        .from('Goal')
        .select('id')
        .eq('goal', data.goal)
        .single()

      // 目標が登録済みの場合
      if (Goal) {
        // 登録済みの目標を更新
        const { data: updateGoal, error: errorUpdateGoal } = await supabase
          .from('Goal')
          .update({
            goal: data.goal,
            amount: data.amount,
          })
          .eq('id', goal?.id)
          .single()

        // 更新に失敗した場合
        if (errorUpdateGoal) {
          setMessage('エラーが発生しました。' + errorUpdateGoal)
          return
        }
      } else {
        // 目標が未登録の場合
        // 目標を登録
        const { data: createGoal, error: errorCreateGoal } = await supabase
          .from('Goal')
          .insert([
            {
              user_id: data.user_id,
              goal: data.goal,
              amount: data.amount,
            },
          ])
          .single()

        // 登録に失敗した場合
        if (errorCreateGoal) {
          setMessage('エラーが発生しました。' + errorCreateGoal)
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

  // 目標を削除
  const handleDelete = async () => {
    setLoading(true)

    try {
      // 目標を削除
      const { data: deleteGoal, error: errorDeleteGoal } = await supabase
        .from('Goal')
        .delete()
        .eq('id', goal?.id)
        .single()

      // 削除に失敗した場合
      if (errorDeleteGoal) {
        setMessage('エラーが発生しました。' + errorDeleteGoal)
        return
      }

      // 入力フォームクリア
      reset()
      setMessage('削除が完了しました。')
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
              目標入力
            </Typography>
            <Typography color='gray' className='mt-1 font-normal'>
              Enter your goal to edit
            </Typography>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className='mt-8 mb-2 w-80 max-w-screen-lg sm:w-96'
            >
              <div className='mb-4 flex flex-col gap-6'>
                <Input
                  type='text'
                  size='lg'
                  label='目標'
                  {...register('goal', { required: true })}
                />
                <div className='text-center text-sm text-red-500'>
                  {errors.goal?.message}
                </div>
                <Input
                  type='number'
                  size='lg'
                  label='金額'
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
