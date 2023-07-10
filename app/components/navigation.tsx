'use client'

import {
  Navbar,
  Typography,
  IconButton,
  Button,
  Input,
} from './common'
import { BellIcon, Cog6ToothIcon, MagnifyingGlassIcon } from '@heroicons/react/24/solid'
import Link from 'next/link'
import Image from 'next/image'
import { Database } from '../../lib/database.types'
type ProfileType = Database['public']['Tables']['profiles']['Row']

// ナビゲーション
const Navigation = ({ profile }: { profile: ProfileType | null }) => {
  return (
    <nav className='block max-w-[calc(100vw-16rem)] bg-white bg-opacity-70 text-white mx-auto w-screen px-4 py-3 rounded-none shadow-none backdrop-blur-sm'>
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
          <IconButton variant='text' color='blue-gray'>
            <Cog6ToothIcon className='h-6 w-6' />
          </IconButton>
          <IconButton variant='text' color='blue-gray'>
            <BellIcon className='h-6 w-6' />
          </IconButton>
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
                fill
              />
            </div>
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Navigation
