'use client'

import { IconButton, Button, Input } from './common'
import {
  BellIcon,
  Cog6ToothIcon,
  MagnifyingGlassIcon,
} from '@heroicons/react/24/solid'
import Link from 'next/link'
import Image from 'next/image'
import { Database } from '../../lib/database.types'
import { emailPath, profilePath } from '../_common/constants/path'
import { Suspense } from 'react'
import Loading from '../(routes)/loading'
type ProfileType = Database['public']['Tables']['profiles']['Row']

// ナビゲーション
const Navigation = ({ profile }: { profile: ProfileType | null }) => {
  return (
    <nav className='block fixed max-w-[calc(100vw-16rem)] bg-[#f4fcfc] bg-opacity-5 text-white mx-auto w-screen px-4 py-3 rounded-none shadow-none backdrop-blur-sm z-30'>
      <div className='flex flex-wrap items-center justify-between gap-y-4 text-blue-gray-900'>
        <div className='relative flex w-full gap-2 md:w-max'>
          <Input
            type='search'
            label='Type here...'
            className='pr-20'
            containerProps={{
              className: 'min-w-[480px]',
            }}
          />
          <Button
            size='sm'
            color='cyan'
            className='!absolute right-1 top-1 rounded'
          >
            <MagnifyingGlassIcon className='w-4 h-4' />
          </Button>
        </div>
        <div className='ml-auto flex gap-3 md:mr-4'>
          <Suspense fallback={<Loading />}>
            <Link href={emailPath}>
              <IconButton variant='text' color='cyan'>
                <Cog6ToothIcon className='h-7 w-7' />
              </IconButton>
            </Link>
            <IconButton variant='text' color='cyan'>
              <BellIcon className='h-7 w-7' />
            </IconButton>
            <Link href={profilePath}>
              <div className='relative w-10 h-10'>
                <Image
                  src={
                    profile && profile.avatar_url
                      ? profile.avatar_url
                      : '/default.png'
                  }
                  className='rounded-full object-cover'
                  alt='avatar'
                  fill
                  sizes='100vw'
                />
              </div>
            </Link>
          </Suspense>
        </div>
      </div>
    </nav>
  )
}

export default Navigation
