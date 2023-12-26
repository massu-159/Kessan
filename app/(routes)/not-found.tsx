'use client'

import { Button } from '@material-tailwind/react'
import Link from 'next/link'
import { loginPath } from '../_common/constants/path'

const NotFound = () => {
  return (
    <div className='italic h-screen flex flex-col justify-center items-center'>
      <div className='text-6xl text-cyan-600'>404</div>
      <div>Not Found</div>
      <div className='mb-4'>ページが見つかりません。</div>
      <Button type='submit' variant='gradient' color='cyan'>
        <Link href={loginPath}>トップページ へ</Link>
      </Button>
    </div>
  )
}

export default NotFound
