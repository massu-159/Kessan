'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import Loading from '../../(routes)/loading'
import * as z from 'zod'
import { CardBody, Button } from '../common'
import { loginPath } from '../../_common/constants/path'
import { CustomCard } from '../ui/custom-card'
import { createClient } from '../../../utils/supabase/client'
type Schema = z.infer<typeof schema>

// 入力データの検証ルールを定義
const schema = z.object({
  email: z.string().email({ message: 'メールアドレスの形式ではありません。' }),
})

// メールアドレス変更
const Email = ({ email }: { email: string }) => {
  const router = useRouter()
  const supabase = createClient()
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    // 初期値
    defaultValues: { email: '' },
    // 入力値の検証
    resolver: zodResolver(schema),
  })

  // 送信
  const onSubmit: SubmitHandler<Schema> = async (data) => {
    setLoading(true)
    setMessage('')

    try {
      // メールアドレス変更メールを送信
      const { error: updateUserError } = await supabase.auth.updateUser(
        { email: data.email },
        { emailRedirectTo: `${location.origin}${loginPath}` }
      )

      // エラーチェック
      if (updateUserError) {
        setMessage('エラーが発生しました。' + updateUserError.message)
        return
      }

      setMessage('確認用のURLを記載したメールを送信しました。')

      // ログアウト
      const { error: signOutError } = await supabase.auth.signOut()

      // エラーチェック
      if (signOutError) {
        setMessage('エラーが発生しました。' + signOutError.message)

        return
      }

      router.push(loginPath)
    } catch (error) {
      setMessage('エラーが発生しました。' + error)
      return
    } finally {
      setLoading(false)
      router.refresh()
    }
  }

  return (
    <CustomCard>
      <CardBody>
        <div className='text-center font-bold text-xl mb-10'>
          メールアドレス変更
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* 現在のメールアドレス */}
          <div className='mb-5'>
            <div className='text-sm mb-1 font-bold'>現在のメールアドレス</div>
            <div>{email}</div>
          </div>

          {/* 新しいメールアドレス */}
          <div className='mb-5'>
            <div className='text-sm mb-1 font-bold'>新しいメールアドレス</div>
            <input
              type='email'
              className='border rounded-md w-full py-2 px-3 focus:outline-none focus:border-sky-500'
              placeholder='新しいメールアドレス'
              id='email'
              {...register('email', { required: true })}
            />
            <div className='my-3 text-center text-sm text-red-500'>
              {errors.email?.message}
            </div>
          </div>

          {/* 変更ボタン */}
          <div className='mb-5'>
            {loading ? (
              <Loading />
            ) : (
              <Button
                type='submit'
                variant='gradient'
                color='cyan'
                fullWidth
                disabled
              >
                変更
              </Button>
            )}
          </div>
        </form>

        {message && (
          <div className='my-5 text-center text-sm text-red-500'>{message}</div>
        )}
      </CardBody>
    </CustomCard>
  )
}

export default Email
