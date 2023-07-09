'use client'

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { useRouter } from "next/navigation"
import { useState } from "react"
import * as z from "zod"
import type { Database } from "../../lib/database.types"
import { SubmitHandler, useForm } from "react-hook-form"
import Loading from "../loading"
import Link from "next/link"
import { zodResolver } from "@hookform/resolvers/zod"
type Schema = z.infer<typeof schema>

const schema = z.object({
  email: z.string().email({ message: 'メールアドレスの形式で入力してください。' }),
  password: z.string().min(8, { message: '8文字以上で入力してください。' }),
})

const Login = () => { 
  const router = useRouter()
  const supabase = createClientComponentClient<Database>()
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const { register, handleSubmit, formState: { errors } } = useForm({
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
    <div>
      <div>ログイン</div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <input type="email" id="email" placeholder="メールアドレス" {...register('email', {required: true})} />
          <div>{ errors.email?.message}</div>
        </div>
        <div>
          <input type="password" id="password" placeholder="パスワード" {...register('password', {required: true})} />
          <div>{ errors.password?.message}</div>
        </div>
        <div>
          {loading ? (<Loading />) : (
            <button type="submit">ログイン</button>
          )}
        </div>
      </form>
      {message && (
        <div>{message}</div>
      )}
      <div>
        <Link href="/auth/reset-password">
          パスワードを忘れた方はこちら
        </Link>
      </div>
      <div>
        <Link href="/auth/signup">
          アカウントを作成する
        </Link>
      </div>
    </div>
  )
}

export default Login