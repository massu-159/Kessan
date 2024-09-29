'use client'

import { FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation'
import Loading from '../../(routes)/loading'
import { CardBody, Button } from '../common'
import { CustomCard } from '../ui/custom-card'
import { createClient } from '../../../utils/supabase/client'

// ログアウト
const Logout = () => {
  const router = useRouter()
  const supabase = createClient()
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  // 送信
  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    try {
      // ログアウト
      const { error } = await supabase.auth.signOut()

      // エラーチェック
      if (error) {
        setMessage('エラーが発生しました。' + error.message)
        return
      }

      router.push('/')
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
        <div className='text-center mb-5'>ログアウトしますか？</div>
        {/* ログアウトボタン */}
        <form onSubmit={onSubmit}>
          <div className='mb-5'>
            {loading ? (
              <Loading />
            ) : (
              <Button type='submit' variant='gradient' color='red' fullWidth>
                ログアウト
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

export default Logout
