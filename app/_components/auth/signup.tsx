'use client'

import { useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'
import { useForm, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import Loading from '../../(routes)/loading'
import * as z from 'zod'
import type { Database } from '../../../lib/database.types'
type Schema = z.infer<typeof schema>
import Image from 'next/image'
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Button,
} from '../common'
import { callbackPath, loginPath } from '../../_common/constants/path'

// 入力データの検証ルールを定義
const schema = z.object({
  name: z.string().min(2, { message: '2文字以上入力する必要があります。' }),
  email: z.string().email({ message: 'メールアドレスの形式ではありません。' }),
  password: z.string().min(8, { message: '8文字以上入力する必要があります。' }),
})

// サインアップページ
const Signup = () => {
  const router = useRouter()
  const supabase = createClientComponentClient<Database>()
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    // 初期値
    defaultValues: { name: '', email: '', password: '' },
    // 入力値の検証
    resolver: zodResolver(schema),
  })

  // 送信
  const onSubmit: SubmitHandler<Schema> = async (data) => {
    setLoading(true)

    try {
      // サインアップ
      const { error: errorSignup } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          emailRedirectTo: `${location.origin}${callbackPath}`,
        },
      })

      // エラーチェック
      if (errorSignup) {
        setMessage('エラーが発生しました。' + errorSignup.message)
        return
      }

      // プロフィールの名前を更新
      const { error: updateError } = await supabase
        .from('profiles')
        .update({ name: data.name })
        .eq('email', data.email)

      // エラーチェック
      if (updateError) {
        setMessage('エラーが発生しました。' + updateError.message)
        return
      }

      // 入力フォームクリア
      reset()
      setMessage(
        '本登録用のURLを記載したメールを送信しました。メールをご確認の上、メール本文中のURLをクリックして、本登録を行ってください。'
      )
    } catch (error) {
      setMessage('エラーが発生しました。' + error)
      return
    } finally {
      setLoading(false)
      router.refresh()
    }
  }

  return (
    <div className='grid grid-cols-2 w-screen bg-[url(/wave.svg)] bg-bottom bg-no-repeat'>
      <div className='h-screen flex justify-center items-center'>
        <Card className='w-96'>
          <form onSubmit={handleSubmit(onSubmit)}>
            <CardHeader
              variant='gradient'
              color='blue'
              className='mb-4 grid h-28 place-items-center'
            >
              <Typography variant='h3' color='white'>
                Sign Up
              </Typography>
            </CardHeader>
            <CardBody className='flex flex-col gap-4'>
              <Input
                type='name'
                label='名前'
                size='lg'
                id='name'
                {...register('name', { required: true })}
                disabled
              />
              <div className='text-center text-sm text-red-500'>
                {errors.name?.message}
              </div>
              <Input
                type='email'
                label='メールアドレス'
                size='lg'
                id='email'
                {...register('email', { required: true })}
                disabled
              />
              <div className='text-center text-sm text-red-500'>
                {errors.email?.message}
              </div>
              <Input
                type='password'
                label='パスワード'
                size='lg'
                id='password'
                {...register('password', { required: true })}
                disabled
              />
              <div className='text-center text-sm text-red-500'>
                {errors.password?.message}
              </div>
            </CardBody>
            <CardFooter className='pt-0'>
              {loading ? (
                <Loading />
              ) : (
                <Button type='submit' variant='gradient' fullWidth disabled>
                  Sign Up
                </Button>
              )}
              {message && (
                <div className='my-5 text-center text-sm text-red-500'>
                  {message}
                </div>
              )}
              <Typography variant='small' className='mt-6 flex justify-center'>
                すでにアカウントをお持ちですか？
                <Typography
                  as='a'
                  href={loginPath}
                  variant='small'
                  color='blue'
                  className='ml-1 font-bold'
                >
                  Sign in
                </Typography>
              </Typography>
            </CardFooter>
          </form>
        </Card>
      </div>
      <div className='relative flex juxtify-center items-center bg-[url(/top-wave.svg)] bg-left-top bg-no-repeat'>
        <Image
          src='/start-image.png'
          alt='blob'
          width='700'
          height='500'
          className='z-30 mx-auto'
        ></Image>
      </div>
    </div>
  )
}

export default Signup
