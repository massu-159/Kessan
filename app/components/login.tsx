'use client'

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import * as z from 'zod'
import type { Database } from '../../lib/database.types'
import { SubmitHandler, useForm } from 'react-hook-form'
import Loading from '../loading'
import { zodResolver } from '@hookform/resolvers/zod'
import Image from 'next/image'
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Button,
} from './common'
type Schema = z.infer<typeof schema>

const schema = z.object({
  email: z
    .string()
    .email({ message: 'メールアドレスの形式で入力してください。' }),
  password: z.string().min(8, { message: '8文字以上で入力してください。' }),
})

const Login = () => {
  const router = useRouter()
  const supabase = createClientComponentClient<Database>()
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: { email: '', password: '' },
    // 入力値の検証
    resolver: zodResolver(schema),
  })

  // 送信時の処理
  const onSubmit: SubmitHandler<Schema> = async (data) => {
    setLoading(true)
    try {
      // ログイン
      const { error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      })
      // ログインに失敗した場合
      if (error) {
        setMessage('ログインに失敗しました。' + error.message)
        return
      }
      router.push('/')
    } catch (error) {
      setMessage('エラーが発生しました' + error)
      return
    } finally {
      setLoading(false)
      router.refresh()
    }
  }
  return (
    <div className='grid grid-cols-2'>
      <div className='h-screen flex justify-center items-center'>
        <Card className='w-96'>
          <form onSubmit={handleSubmit(onSubmit)}>
            <CardHeader
              variant='gradient'
              color='blue'
              className='mb-4 grid h-28 place-items-center'
            >
              <Typography variant='h3' color='white'>
                Sign In
              </Typography>
            </CardHeader>
            <CardBody className='flex flex-col gap-4'>
              <Input
                type='email'
                label='メールアドレス'
                size='lg'
                id='email'
                {...register('email', { required: true })}
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
              />
              <div className='text-center text-sm text-red-500'>
                {errors.password?.message}
              </div>
            </CardBody>
            <CardFooter className='pt-0'>
              {loading ? (
                <Loading />
              ) : (
                <Button type='submit' variant='gradient' fullWidth>
                  Sign In
                </Button>
              )}
              {message && (
                <div className='my-5 text-center text-sm text-red-500'>
                  {message}
                </div>
              )}
              <Typography variant='small' className='mt-6 flex justify-center'>
                アカウントをお持ちではないですか？
                <Typography
                  as='a'
                  href='/auth/signup'
                  variant='small'
                  color='blue'
                  className='ml-1 font-bold'
                >
                  Sign up
                </Typography>
              </Typography>
              <Typography variant='small' className='mt-1 flex justify-center'>
                パスワードを忘れた方は
                <Typography
                  as='a'
                  href='/auth/signup'
                  variant='small'
                  color='blue'
                  className='ml-1 font-bold'
                >
                  こちら
                </Typography>
              </Typography>
            </CardFooter>
          </form>
        </Card>
      </div>
      <div className='relative bg-cyan-600  flex juxtify-center items-center'>
        <div className="absolute z-10">
        <Image src='/blobanimation.svg' alt='blob' width='600' height='600'></Image>
        </div>
        <Image src='/start.png' alt='blob' width='360' height='360' className='z-30 mx-auto'></Image>
      </div>
    </div>
  )
}

export default Login
