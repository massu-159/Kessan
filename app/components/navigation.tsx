'use client'

import { Session } from '@supabase/auth-helpers-nextjs'
import Link from 'next/link'
import useStore from '../../store'
import Image from 'next/image'
import type { Database } from '../../lib/database.types'
import { useEffect } from 'react'
type ProfileType = Database['public']['Tables']['profiles']['Row']

const Navigation = ({
  session,
  profile,
}: {
  session: Session | null
  profile: ProfileType | null
}) => {
  const { setUser } = useStore()
  // 状態管理にユーザー情報を保存
  useEffect(() => {
    setUser({
      id: session ? session.user.id : '',
      email: session ? session.user.email! : '',
      name: session && profile ? profile.name : '',
      introduce: session && profile ? profile.introduce : '',
      avatar_url: session && profile ? profile.avatar_url : '',
    })
  }, [session, setUser, profile])

  return (
    <header>
      <div>
        <Link href='/'>Kessan</Link>
      </div>
      <div>
        {session && (
          <div>
            <Link href='/settings/profile'>
              <div className='relative w-10 h-10'>
                <Image
                  src={
                    profile && profile.avatar_url
                      ? profile.avatar_url
                      : '/default.png'
                  }
                  className='rounded-full object-cover'
                  alt='avatar'
                  width={40}
                  height={40}
                />
              </div>
            </Link>
          </div>
        )}
        {!session && (
          <div>
            <Link href='/auth/login'>ログイン</Link>
            <Link href='/auth/signup'>サインアップ</Link>
          </div>
        )}
      </div>
    </header>
  )
}

export default Navigation
