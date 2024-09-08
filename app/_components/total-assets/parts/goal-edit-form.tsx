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
import Loading from '../../../(routes)/loading'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { Goal } from '../../../_common/types/Goal'
import { createClient } from '../../../../utils/supabase/client'
type Schema = z.infer<typeof schema>

// 入力データの検証ルールを定義
const schema = z.object({
  goal: z.string().min(1, {
    message: '目標を入力してください。',
  }),
  amount: z
    .number({
      required_error: '金額を入力してください。',
      invalid_type_error: '金額は数値で入力してください。',
    })
    .min(1, {
      message: '金額を入力してください。',
    }),
})

type Props = {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  goal: Goal | null
  userId: string | undefined
}

/**
 * 目標入力フォーム
 * @param open モーダルウィンドウの表示状態
 * @param setOpen モーダルウィンドウの表示状態を変更する関数
 * @param goal 目標
 * @param userId ユーザーID
 */
export default function GoalEditForm({ open, setOpen, goal, userId }: Props) {
  const router = useRouter()
  const supabase = createClient()
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const handleClose = () => {
    setOpen(false)
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
        .eq('user_id', userId)
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
          .insert({
            user_id: userId,
            goal: data.goal,
            amount: data.amount,
          })
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
      handleClose()
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
      handleClose()
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
                onClick={handleClose}
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
